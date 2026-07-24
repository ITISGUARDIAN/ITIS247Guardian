// ITIS Production Payment Service Architecture (Prompt 071)
// Core orchestration for unified payment execution, timeout wrappers, exponential retries, and audit trails

import { AuditLogger } from '../common/audit.logger';
import { PaymentGatewayFactory } from './payment.factory';
import { PaymentWebhookService } from './webhook.service';
import {
  PaymentAuditRecord,
  PaymentGateway,
  PaymentProvider,
  PaymentRequest,
  PaymentStatus,
  UnifiedPaymentResponse,
  WebhookVerificationRequest,
  WebhookVerificationResult
} from './payment.types';

export class PaymentService {
  private static instance: PaymentService;
  private auditTrailLog: PaymentAuditRecord[] = [];
  private activeTransactions: Map<string, UnifiedPaymentResponse> = new Map();

  private constructor() {}

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  /**
   * Timeout execution wrapper enforcing a strict SLA on gateway responses (Default 8 seconds).
   */
  private async withTimeout<T>(
    promiseFn: () => Promise<T>,
    timeoutMs: number = 8000,
    contextName: string = 'Gateway Operation'
  ): Promise<T> {
    let timeoutHandle: NodeJS.Timeout;

    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutHandle = setTimeout(() => {
        reject(new Error(`[TIMEOUT_EXCEEDED] ${contextName} timed out after ${timeoutMs}ms SLA threshold.`));
      }, timeoutMs);
    });

    try {
      const result = await Promise.race([promiseFn(), timeoutPromise]);
      clearTimeout(timeoutHandle!);
      return result;
    } catch (err) {
      clearTimeout(timeoutHandle!);
      throw err;
    }
  }

  /**
   * Retry handler with Exponential Backoff for transient network issues or 5xx failures.
   */
  private async withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    initialDelayMs: number = 500,
    contextName: string = 'Payment Operation'
  ): Promise<{ result: T; attempts: number }> {
    let attempt = 0;
    let delay = initialDelayMs;

    while (attempt < maxRetries) {
      attempt++;
      try {
        const result = await fn();
        return { result, attempts: attempt };
      } catch (error: any) {
        AuditLogger.log(
          'WARN',
          `[RETRY_ATTEMPT_${attempt}/${maxRetries}] ${contextName} failed: ${error.message || error}`,
          { attempt, contextName }
        );

        if (attempt >= maxRetries) {
          throw new Error(
            `[MAX_RETRIES_EXCEEDED] ${contextName} failed after ${maxRetries} attempts. Root Error: ${error.message}`
          );
        }

        // Wait with exponential jittered backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }

    throw new Error(`[RETRY_FAILED] Unreachable state in retry handler.`);
  }

  /**
   * 1. Initialize Payment across specified Payment Gateway with Retry & Timeout SLA.
   */
  public async processPayment(
    provider: PaymentProvider,
    request: PaymentRequest
  ): Promise<UnifiedPaymentResponse> {
    const correlationId = `PAY-INIT-${request.transactionId}`;
    const gateway: PaymentGateway = PaymentGatewayFactory.getGateway(provider);

    AuditLogger.recordAudit({
      action: 'PAYMENT_INITIALIZATION_STARTED',
      resource: `/api/v1/payments/initialize/${provider}`,
      correlationId,
      metadata: {
        provider,
        transactionId: request.transactionId,
        amount: request.amount,
        customerEmail: request.customer.email
      }
    });

    try {
      // Execute with Retry and Timeout SLA
      const { result: response, attempts } = await this.withRetry(
        () => this.withTimeout(() => gateway.initializePayment(request), 8000, `Initialize Payment (${provider})`),
        3,
        400,
        `Payment Init ${provider}`
      );

      response.retryCount = attempts;
      this.activeTransactions.set(request.transactionId, response);

      // Record Audit Log
      this.recordAudit({
        id: `AUD-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        transactionId: request.transactionId,
        provider,
        action: 'INITIALIZATION',
        status: response.status,
        amount: request.amount,
        retryAttempts: attempts,
        timestamp: new Date().toISOString(),
        metadata: {
          redirectUrl: response.redirectUrl,
          providerReference: response.providerReference
        }
      });

      AuditLogger.recordAudit({
        action: 'PAYMENT_INITIALIZATION_SUCCESS',
        resource: `/api/v1/payments/initialize/${provider}`,
        correlationId,
        metadata: {
          provider,
          transactionId: request.transactionId,
          providerReference: response.providerReference,
          status: response.status,
          attempts
        }
      });

      return response;
    } catch (err: any) {
      AuditLogger.log('ERROR', `Payment Initialization Failed on ${provider}: ${err.message}`, { correlationId });

      // Fallback Gateway Execution if Primary Provider fails
      try {
        const fallbackGateway = PaymentGatewayFactory.getFallbackGateway(provider);
        AuditLogger.log('WARN', `Attempting Fallback Gateway (${fallbackGateway.providerName}) for ${request.transactionId}`, { correlationId });

        const fallbackResponse = await fallbackGateway.initializePayment(request);
        fallbackResponse.errorMessage = `Primary gateway ${provider} unavailable. Switched to fallback ${fallbackGateway.providerName}.`;
        this.activeTransactions.set(request.transactionId, fallbackResponse);

        this.recordAudit({
          id: `AUD-${Date.now()}-FB`,
          transactionId: request.transactionId,
          provider: fallbackGateway.providerName,
          action: 'INITIALIZATION',
          status: fallbackResponse.status,
          amount: request.amount,
          retryAttempts: 1,
          timestamp: new Date().toISOString(),
          errorMessage: err.message,
          metadata: { isFallback: true, primaryProvider: provider }
        });

        return fallbackResponse;
      } catch (fallbackErr: any) {
        const errorResponse: UnifiedPaymentResponse = {
          success: false,
          transactionId: request.transactionId,
          provider,
          providerReference: `FAILED-${request.transactionId}`,
          status: 'FAILED',
          amount: request.amount,
          currency: 'ZAR',
          errorMessage: `Payment initialization failed on both primary (${provider}) and fallback gateways: ${err.message}`,
          timestamp: new Date().toISOString()
        };

        this.recordAudit({
          id: `AUD-${Date.now()}-ERR`,
          transactionId: request.transactionId,
          provider,
          action: 'INITIALIZATION',
          status: 'FAILED',
          amount: request.amount,
          retryAttempts: 3,
          errorMessage: err.message,
          timestamp: new Date().toISOString()
        });

        return errorResponse;
      }
    }
  }

  /**
   * 2. Handle & Verify Incoming Gateway Webhook / IPN Notification via PaymentWebhookService
   */
  public async handleWebhook(
    provider: PaymentProvider,
    webhookReq: WebhookVerificationRequest
  ): Promise<WebhookVerificationResult> {
    const webhookService = PaymentWebhookService.getInstance();
    const result = await webhookService.processWebhook(provider, webhookReq);

    // Sync active transactions state
    if (result.isValid && result.transactionId) {
      const existingTx = this.activeTransactions.get(result.transactionId);
      if (existingTx) {
        existingTx.status = result.status;
        existingTx.providerReference = result.providerReference || existingTx.providerReference;
        this.activeTransactions.set(result.transactionId, existingTx);
      }
    }

    // Record internal audit
    this.recordAudit({
      id: `AUD-WH-${Date.now()}`,
      transactionId: result.transactionId || 'UNKNOWN',
      provider,
      action: 'WEBHOOK_RECEIVED',
      status: result.status,
      amount: result.amount,
      retryAttempts: result.retryCount || 1,
      signatureValid: result.signatureVerified,
      errorMessage: result.errorMessage,
      timestamp: new Date().toISOString(),
      metadata: {
        isDuplicate: result.isDuplicate,
        idempotencyKey: result.idempotencyKey,
        ...result.metadata
      }
    });

    return result;
  }

  /**
   * 3. Query Transaction Status from Gateway
   */
  public async verifyTransactionStatus(
    provider: PaymentProvider,
    transactionId: string,
    providerRef?: string
  ): Promise<UnifiedPaymentResponse> {
    const gateway = PaymentGatewayFactory.getGateway(provider);

    const cachedTx = this.activeTransactions.get(transactionId);
    if (cachedTx && cachedTx.status === 'SUCCESS') {
      return cachedTx;
    }

    const response = await gateway.queryTransactionStatus(transactionId, providerRef);
    if (cachedTx) {
      cachedTx.status = response.status;
      this.activeTransactions.set(transactionId, cachedTx);
    }

    this.recordAudit({
      id: `AUD-QRY-${Date.now()}`,
      transactionId,
      provider,
      action: 'STATUS_QUERY',
      status: response.status,
      amount: response.amount,
      retryAttempts: 1,
      timestamp: new Date().toISOString()
    });

    return response;
  }

  /**
   * 4. Retrieve Transaction Audit Log History
   */
  public getAuditTrail(limit: number = 50): PaymentAuditRecord[] {
    return this.auditTrailLog.slice(0, limit);
  }

  /**
   * Internal record helper
   */
  private recordAudit(record: PaymentAuditRecord) {
    this.auditTrailLog.unshift(record);
    if (this.auditTrailLog.length > 500) {
      this.auditTrailLog.pop();
    }
  }
}
