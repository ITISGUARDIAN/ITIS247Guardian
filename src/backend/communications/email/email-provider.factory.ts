// ITIS Email Provider Factory & Router Engine
// Dynamically creates, verifies, and routes email dispatch across Microsoft 365, Google Workspace, Standard SMTP, and Mailgun with Primary/Failover routing

import { AuditLogger } from '../../common/audit.logger';
import { AdapterSendResult } from '../communications.types';
import { EmailDeliveryTracker } from './email-delivery.tracker';
import { EmailTemplateEngine } from './email-template.engine';
import {
  EmailDispatchOptions,
  EmailProviderType,
  GoogleWorkspaceConfig,
  IEmailProvider,
  M365Config,
  MailgunConfig,
  SmtpConfig
} from './email.types';
import { GoogleWorkspaceEmailProvider } from './providers/google-workspace.provider';
import { Microsoft365EmailProvider } from './providers/m365.provider';
import { MailgunEmailProvider } from './providers/mailgun.provider';
import { StandardSmtpProvider } from './providers/smtp.provider';

export class EmailProviderFactory {
  private static instance: EmailProviderFactory;

  private primaryProviderType: EmailProviderType = 'SMTP';
  private failoverProviderTypes: EmailProviderType[] = ['MICROSOFT_365', 'GOOGLE_WORKSPACE', 'MAILGUN'];

  private providers: Map<EmailProviderType, IEmailProvider> = new Map();
  private templateEngine = EmailTemplateEngine.getInstance();
  private deliveryTracker = EmailDeliveryTracker.getInstance();

  private constructor() {
    this.initDefaultProviders();
  }

  public static getInstance(): EmailProviderFactory {
    if (!EmailProviderFactory.instance) {
      EmailProviderFactory.instance = new EmailProviderFactory();
    }
    return EmailProviderFactory.instance;
  }

  /**
   * Instantiate all 4 production providers with default enterprise configurations
   */
  private initDefaultProviders() {
    this.providers.set('SMTP', new StandardSmtpProvider());
    this.providers.set('MICROSOFT_365', new Microsoft365EmailProvider());
    this.providers.set('GOOGLE_WORKSPACE', new GoogleWorkspaceEmailProvider());
    this.providers.set('MAILGUN', new MailgunEmailProvider());

    // Allow override via env variable
    if (process.env.PRIMARY_EMAIL_PROVIDER && this.providers.has(process.env.PRIMARY_EMAIL_PROVIDER as any)) {
      this.primaryProviderType = process.env.PRIMARY_EMAIL_PROVIDER as EmailProviderType;
    }
  }

  /**
   * Configure or update specific provider setup
   */
  public configureProvider(
    type: 'SMTP', config: Partial<SmtpConfig>
  ): void;
  public configureProvider(
    type: 'MICROSOFT_365', config: Partial<M365Config>
  ): void;
  public configureProvider(
    type: 'GOOGLE_WORKSPACE', config: Partial<GoogleWorkspaceConfig>
  ): void;
  public configureProvider(
    type: 'MAILGUN', config: Partial<MailgunConfig>
  ): void;
  public configureProvider(type: EmailProviderType, config: any): void {
    switch (type) {
      case 'SMTP':
        this.providers.set('SMTP', new StandardSmtpProvider(config));
        break;
      case 'MICROSOFT_365':
        this.providers.set('MICROSOFT_365', new Microsoft365EmailProvider(config));
        break;
      case 'GOOGLE_WORKSPACE':
        this.providers.set('GOOGLE_WORKSPACE', new GoogleWorkspaceEmailProvider(config));
        break;
      case 'MAILGUN':
        this.providers.set('MAILGUN', new MailgunEmailProvider(config));
        break;
    }

    AuditLogger.log('INFO', `Configured Email Provider '${type}'`);
  }

  public setPrimaryProvider(type: EmailProviderType) {
    if (!this.providers.has(type)) {
      throw new Error(`Invalid provider type '${type}'. Must be SMTP, MICROSOFT_365, GOOGLE_WORKSPACE, or MAILGUN.`);
    }
    this.primaryProviderType = type;
    this.failoverProviderTypes = ['SMTP', 'MICROSOFT_365', 'GOOGLE_WORKSPACE', 'MAILGUN'].filter((t) => t !== type) as EmailProviderType[];
  }

  public getPrimaryProviderType(): EmailProviderType {
    return this.primaryProviderType;
  }

  public getProvider(type: EmailProviderType): IEmailProvider {
    const provider = this.providers.get(type);
    if (!provider) {
      throw new Error(`Email provider '${type}' not found.`);
    }
    return provider;
  }

  /**
   * Execute Email Dispatch with Primary/Failover Router, Template Compilation, Suppression Check, and Tracking Injection
   */
  public async dispatchEmail(
    options: EmailDispatchOptions,
    forcedProviderType?: EmailProviderType
  ): Promise<AdapterSendResult & { usedProviderType: EmailProviderType }> {
    const targetRecipient = Array.isArray(options.to) ? options.to[0] : options.to;

    // 1. Check Suppression List
    if (targetRecipient && this.deliveryTracker.isSuppressed(targetRecipient)) {
      AuditLogger.log('WARN', `Email dispatch blocked for ${targetRecipient}: Recipient in suppression list.`);
      return {
        success: false,
        errorReason: `Recipient '${targetRecipient}' is in suppression list due to previous hard bounce or spam complaint.`,
        shouldRetry: false,
        usedProviderType: forcedProviderType || this.primaryProviderType
      };
    }

    // 2. Compile HTML/Text Template if templateType specified
    let finalSubject = options.subject;
    let finalHtml = options.htmlBody;
    let finalText = options.textBody;

    if (options.templateType) {
      const compiled = this.templateEngine.compileTemplate(options.templateType, options.templateVariables || {});
      finalSubject = finalSubject || compiled.subject;
      finalHtml = compiled.htmlBody;
      finalText = compiled.textBody;
    }

    // 3. Inject Open & Click Tracking Pixels if enabled
    const deliveryId = `DELIV-EMAIL-${Date.now()}-${Math.floor(Math.random() * 8999 + 1000)}`;
    if (finalHtml && (options.trackOpens !== false)) {
      finalHtml = this.deliveryTracker.injectOpenTrackingPixel(finalHtml, deliveryId);
    }
    if (finalHtml && (options.trackClicks !== false)) {
      finalHtml = this.deliveryTracker.wrapClickTrackingUrls(finalHtml, deliveryId);
    }

    const compiledOptions: EmailDispatchOptions = {
      ...options,
      subject: finalSubject,
      htmlBody: finalHtml,
      textBody: finalText
    };

    // 4. Primary and Failover Execution Sequence
    const routingOrder: EmailProviderType[] = forcedProviderType
      ? [forcedProviderType]
      : [this.primaryProviderType, ...this.failoverProviderTypes];

    let lastError = '';

    for (const providerType of routingOrder) {
      const provider = this.providers.get(providerType);
      if (!provider) continue;

      try {
        const result = await provider.sendEmail(compiledOptions);
        if (result.success) {
          // Record tracking SENT event
          this.deliveryTracker.recordEvent(
            deliveryId,
            targetRecipient || 'unknown@itis.gov.za',
            'SENT',
            providerType,
            result.providerReference || 'N/A'
          );

          return {
            ...result,
            usedProviderType: providerType,
            metadata: {
              ...result.metadata,
              deliveryId,
              templateType: options.templateType || 'CUSTOM'
            }
          };
        } else {
          lastError = result.errorReason || `${providerType} dispatch failed.`;
          AuditLogger.log('WARN', `Email provider ${providerType} failed: ${lastError}. Attempting failover...`);
        }
      } catch (err: any) {
        lastError = err.message;
        AuditLogger.log('WARN', `Exception on email provider ${providerType}: ${lastError}. Attempting failover...`);
      }
    }

    // Record tracking FAILED event
    this.deliveryTracker.recordEvent(
      deliveryId,
      targetRecipient || 'unknown@itis.gov.za',
      'FAILED',
      routingOrder[0],
      'N/A',
      { bounceReason: lastError }
    );

    return {
      success: false,
      errorReason: `All email providers failed. Last error: ${lastError}`,
      shouldRetry: true,
      usedProviderType: routingOrder[0]
    };
  }

  /**
   * Run Health Checks across all 4 configured Providers
   */
  public async healthCheckAll(): Promise<Record<EmailProviderType, { healthy: boolean; responseMs: number; details?: string }>> {
    const results: any = {};
    for (const [type, provider] of this.providers.entries()) {
      results[type] = await provider.healthCheck();
    }
    return results;
  }
}
