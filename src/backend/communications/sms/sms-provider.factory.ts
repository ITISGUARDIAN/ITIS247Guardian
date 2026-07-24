// ITIS SMS Provider Factory & Primary/Failover Routing Engine
// Manages BulkSMS, Twilio, Infobip, and Vodacom/MTN Enterprise SMS Gateways
// Includes Template Compilation, Retry Queues, Opt-Out Enforcement, and Health Monitoring

import { AuditLogger } from '../../common/audit.logger';
import { AdapterSendResult } from '../communications.types';
import { BulkSmsProvider } from './providers/bulksms.provider';
import { InfobipSmsProvider } from './providers/infobip.provider';
import { TwilioSmsProvider } from './providers/twilio.provider';
import { VodacomEnterpriseSmsProvider } from './providers/vodacom.provider';
import { SmsDeliveryTracker } from './sms-delivery.tracker';
import { SmsTemplateEngine } from './sms-template.engine';
import {
  BulkSmsConfig,
  InfobipConfig,
  ISmsProvider,
  SmsDispatchOptions,
  SmsProviderType,
  TwilioConfig,
  VodacomConfig
} from './sms.types';

export class SmsProviderFactory {
  private static instance: SmsProviderFactory;

  private primaryProviderType: SmsProviderType = 'BULKSMS';
  private failoverProviderTypes: SmsProviderType[] = ['VODACOM_ENTERPRISE', 'TWILIO', 'INFOBIP'];

  private providers: Map<SmsProviderType, ISmsProvider> = new Map();
  private templateEngine = SmsTemplateEngine.getInstance();
  private deliveryTracker = SmsDeliveryTracker.getInstance();

  private constructor() {
    this.initDefaultProviders();
  }

  public static getInstance(): SmsProviderFactory {
    if (!SmsProviderFactory.instance) {
      SmsProviderFactory.instance = new SmsProviderFactory();
    }
    return SmsProviderFactory.instance;
  }

  /**
   * Initialize default instances for all 4 supported providers
   */
  private initDefaultProviders() {
    this.providers.set('BULKSMS', new BulkSmsProvider());
    this.providers.set('VODACOM_ENTERPRISE', new VodacomEnterpriseSmsProvider());
    this.providers.set('TWILIO', new TwilioSmsProvider());
    this.providers.set('INFOBIP', new InfobipSmsProvider());

    if (process.env.PRIMARY_SMS_PROVIDER && this.providers.has(process.env.PRIMARY_SMS_PROVIDER as any)) {
      this.primaryProviderType = process.env.PRIMARY_SMS_PROVIDER as SmsProviderType;
    }
  }

  /**
   * Configure specific provider parameters
   */
  public configureProvider(type: 'BULKSMS', config: Partial<BulkSmsConfig>): void;
  public configureProvider(type: 'TWILIO', config: Partial<TwilioConfig>): void;
  public configureProvider(type: 'INFOBIP', config: Partial<InfobipConfig>): void;
  public configureProvider(type: 'VODACOM_ENTERPRISE', config: Partial<VodacomConfig>): void;
  public configureProvider(type: SmsProviderType, config: any): void {
    switch (type) {
      case 'BULKSMS':
        this.providers.set('BULKSMS', new BulkSmsProvider(config));
        break;
      case 'TWILIO':
        this.providers.set('TWILIO', new TwilioSmsProvider(config));
        break;
      case 'INFOBIP':
        this.providers.set('INFOBIP', new InfobipSmsProvider(config));
        break;
      case 'VODACOM_ENTERPRISE':
        this.providers.set('VODACOM_ENTERPRISE', new VodacomEnterpriseSmsProvider(config));
        break;
    }

    AuditLogger.log('INFO', `Configured SMS Provider '${type}'`);
  }

  public setPrimaryProvider(type: SmsProviderType) {
    if (!this.providers.has(type)) {
      throw new Error(`Invalid SMS provider type '${type}'. Must be BULKSMS, TWILIO, INFOBIP, or VODACOM_ENTERPRISE.`);
    }
    this.primaryProviderType = type;
    this.failoverProviderTypes = ['BULKSMS', 'VODACOM_ENTERPRISE', 'TWILIO', 'INFOBIP'].filter((t) => t !== type) as SmsProviderType[];
  }

  public getPrimaryProviderType(): SmsProviderType {
    return this.primaryProviderType;
  }

  public getProvider(type: SmsProviderType): ISmsProvider {
    const provider = this.providers.get(type);
    if (!provider) {
      throw new Error(`SMS provider '${type}' not found.`);
    }
    return provider;
  }

  /**
   * Execute SMS Dispatch with Failover, Template Engine Compilation, STOP check, & DLR Tracking
   */
  public async dispatchSms(
    options: SmsDispatchOptions,
    forcedProviderType?: SmsProviderType
  ): Promise<AdapterSendResult & { usedProviderType: SmsProviderType; partsCount: number }> {
    // 1. Opt-out / STOP suppression check
    if (this.deliveryTracker.isOptedOut(options.phoneNumber)) {
      AuditLogger.log('WARN', `SMS dispatch blocked for ${options.phoneNumber}: Number opted out (STOP).`);
      return {
        success: false,
        errorReason: `Recipient '${options.phoneNumber}' has opted out of SMS notifications (STOP).`,
        shouldRetry: false,
        usedProviderType: forcedProviderType || this.primaryProviderType,
        partsCount: 0
      };
    }

    // 2. Compile Template if category specified or message omitted
    let finalMessage = options.message;
    let category = options.category;

    if (category || !finalMessage) {
      const compiled = this.templateEngine.compileTemplate(
        category || 'GENERIC',
        options.variables || {}
      );
      finalMessage = compiled.message;
    }

    const partsCount = this.templateEngine.calculateParts(finalMessage || '');
    const compiledOptions: SmsDispatchOptions = {
      ...options,
      message: finalMessage
    };

    const dispatchId = `DISPATCH-SMS-${Date.now()}-${Math.floor(Math.random() * 8999 + 1000)}`;

    // 3. Routing Order: Forced or Primary -> Failover sequence
    const routingOrder: SmsProviderType[] = forcedProviderType
      ? [forcedProviderType]
      : [this.primaryProviderType, ...this.failoverProviderTypes];

    let lastError = '';

    for (const providerType of routingOrder) {
      const provider = this.providers.get(providerType);
      if (!provider) continue;

      try {
        const result = await provider.sendSms(compiledOptions);
        if (result.success) {
          // Record initial SENT DLR
          this.deliveryTracker.recordDlr(
            dispatchId,
            options.phoneNumber,
            providerType,
            result.providerReference || 'N/A',
            'SENT',
            partsCount
          );

          return {
            ...result,
            usedProviderType: providerType,
            partsCount,
            metadata: {
              ...result.metadata,
              dispatchId,
              category: category || 'CUSTOM',
              partsCount
            }
          };
        } else {
          lastError = result.errorReason || `${providerType} SMS dispatch failed.`;
          AuditLogger.log('WARN', `SMS provider ${providerType} failed: ${lastError}. Attempting failover...`);
        }
      } catch (err: any) {
        lastError = err.message;
        AuditLogger.log('WARN', `Exception on SMS provider ${providerType}: ${lastError}. Attempting failover...`);
      }
    }

    // 4. All providers failed -> Queue for background retry if requested
    this.deliveryTracker.recordDlr(
      dispatchId,
      options.phoneNumber,
      routingOrder[0],
      'N/A',
      'FAILED',
      partsCount,
      'PROVIDER_DISPATCH_FAILURE',
      lastError
    );

    if (options.priority === 'CRITICAL' || options.category === 'EMERGENCY_SMS' || options.category === 'OTP') {
      // Enqueue in retry queue
      this.deliveryTracker.enqueueForRetry(compiledOptions, lastError, options.maxRetries || 3);
    }

    return {
      success: false,
      errorReason: `All SMS providers failed. Last error: ${lastError}`,
      shouldRetry: true,
      usedProviderType: routingOrder[0],
      partsCount
    };
  }

  /**
   * Process Pending Retry Queue Items
   */
  public async processRetryQueue(): Promise<{ processedCount: number; succeededCount: number }> {
    const pendingItems = this.deliveryTracker.getPendingRetryQueueItems();
    let succeededCount = 0;

    for (const item of pendingItems) {
      AuditLogger.log('INFO', `Retrying queued SMS ${item.id} (Attempt ${item.attemptCount + 1}/${item.maxAttempts})...`);
      const result = await this.dispatchSms(item.options);
      if (result.success) {
        succeededCount++;
        this.deliveryTracker.removeRetryQueueItem(item.id);
      } else {
        this.deliveryTracker.updateRetryQueueAttempt(item.id, result.errorReason || 'Retry failed');
      }
    }

    return {
      processedCount: pendingItems.length,
      succeededCount
    };
  }

  /**
   * Health Check across all 4 SMS Providers
   */
  public async healthCheckAll(): Promise<Record<SmsProviderType, { healthy: boolean; responseMs: number; details?: string }>> {
    const results: any = {};
    for (const [type, provider] of this.providers.entries()) {
      results[type] = await provider.healthCheck();
    }
    return results;
  }
}
