// ITIS Production Payment Webhook Engine (Prompt 074)
// Webhook Verification, Duplicate Prevention, Idempotency Ledger, Exponential Retries, Audit Logs, and Payment Status Synchronization

import { AuditLogger } from '../common/audit.logger';
import { BillingService } from '../billing/billing.service';
import { InvoiceService } from '../billing/invoice.service';
import { PaymentGatewayFactory } from './payment.factory';
import {
  PaymentProvider,
  PaymentStatus,
  WebhookIdempotencyRecord,
  WebhookVerificationRequest,
  WebhookVerificationResult
} from './payment.types';

export class PaymentWebhookService {
  private static instance: PaymentWebhookService;

  // Idempotency Ledger for Duplicate Prevention
  private idempotencyLedger: Map<string, WebhookIdempotencyRecord> = new Map();
  private failedWebhookQueue: Array<{
    id: string;
    provider: PaymentProvider;
    request: WebhookVerificationRequest;
    attemptCount: number;
    lastError: string;
    firstReceivedAt: string;
  }> = [];

  private constructor() {}

  public static getInstance(): PaymentWebhookService {
    if (!PaymentWebhookService.instance) {
      PaymentWebhookService.instance = new PaymentWebhookService();
    }
    return PaymentWebhookService.instance;
  }

  /**
   * Derive strict Idempotency Key per Payment Provider
   */
  private deriveIdempotencyKey(
    provider: PaymentProvider,
    payload: Record<string, any>
  ): string {
    switch (provider) {
      case 'PAYFAST': {
        const pfId = payload.pf_payment_id || payload.m_payment_id || 'UNKNOWN';
        const pfStatus = payload.payment_status || 'UNKNOWN';
        return `IDEM-PAYFAST-${pfId}-${pfStatus}`;
      }
      case 'OZOW': {
        const ozowTxId = payload.TransactionId || payload.TransactionReference || 'UNKNOWN';
        const status = payload.Status || payload.status || 'UNKNOWN';
        return `IDEM-OZOW-${ozowTxId}-${status}`;
      }
      case 'PEACH_PAYMENTS': {
        const peachId = payload.id || payload.checkoutId || payload.merchantTransactionId || 'UNKNOWN';
        const resultCode = payload.result?.code || 'SUCCESS';
        return `IDEM-PEACH-${peachId}-${resultCode}`;
      }
      default:
        return `IDEM-${provider}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    }
  }

  /**
   * Retry handler with Exponential Backoff for transient side-effect execution
   */
  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    initialDelayMs: number = 300,
    context: string = 'Webhook Side-Effect'
  ): Promise<{ result: T; attempts: number }> {
    let attempt = 0;
    let delay = initialDelayMs;

    while (attempt < maxRetries) {
      attempt++;
      try {
        const result = await operation();
        return { result, attempts: attempt };
      } catch (error: any) {
        AuditLogger.log('WARN', `[WEBHOOK_RETRY_${attempt}/${maxRetries}] ${context} failed: ${error.message}`);
        if (attempt >= maxRetries) {
          throw new Error(`[WEBHOOK_MAX_RETRIES_EXCEEDED] ${context} failed after ${maxRetries} attempts. ${error.message}`);
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }

    throw new Error('Unreachable state in webhook retry handler.');
  }

  /**
   * Process incoming Payment Provider Webhook with Verification, Duplicate Prevention, and Idempotency
   */
  public async processWebhook(
    provider: PaymentProvider,
    webhookReq: WebhookVerificationRequest
  ): Promise<WebhookVerificationResult> {
    const correlationId = `WH-PROC-${provider}-${Date.now()}`;
    const payload = webhookReq.payload || {};

    AuditLogger.recordAudit({
      action: 'PAYMENT_WEBHOOK_RECEIVED',
      resource: `/api/v1/payments/webhook/${provider}`,
      correlationId,
      metadata: { provider, rawPayloadKeys: Object.keys(payload) }
    });

    // Step 1: Gateway Signature Verification
    const gateway = PaymentGatewayFactory.getGateway(provider);
    let verificationResult: WebhookVerificationResult;

    try {
      verificationResult = await gateway.verifyWebhook(webhookReq);
    } catch (err: any) {
      AuditLogger.log('ERROR', `Webhook Verification Exception on ${provider}: ${err.message}`, { correlationId });
      
      // Queue for async retry if system error
      this.queueFailedWebhook(provider, webhookReq, err.message);

      return {
        isValid: false,
        transactionId: payload.m_payment_id || payload.TransactionReference || payload.merchantTransactionId || 'UNKNOWN',
        providerReference: 'UNKNOWN',
        status: 'FAILED',
        amount: 0,
        signatureVerified: false,
        errorMessage: `Gateway signature verification exception: ${err.message}`
      };
    }

    // Step 2: Handle Invalid Signatures
    if (!verificationResult.isValid || !verificationResult.signatureVerified) {
      AuditLogger.recordAudit({
        action: 'PAYMENT_WEBHOOK_SIGNATURE_FAILED',
        resource: `/api/v1/payments/webhook/${provider}`,
        correlationId,
        metadata: {
          provider,
          transactionId: verificationResult.transactionId,
          errorMessage: verificationResult.errorMessage
        }
      });

      return verificationResult;
    }

    // Step 3: Duplicate Prevention & Idempotency Check
    const idempotencyKey = this.deriveIdempotencyKey(provider, payload);
    const existingRecord = this.idempotencyLedger.get(idempotencyKey);

    if (existingRecord) {
      existingRecord.attemptCount += 1;
      existingRecord.isDuplicate = true;

      AuditLogger.recordAudit({
        action: 'PAYMENT_WEBHOOK_DUPLICATE_PREVENTED',
        resource: `/api/v1/payments/webhook/${provider}`,
        correlationId,
        metadata: {
          idempotencyKey,
          provider,
          transactionId: verificationResult.transactionId,
          status: verificationResult.status,
          attempts: existingRecord.attemptCount
        }
      });

      return {
        isValid: true,
        transactionId: verificationResult.transactionId,
        providerReference: verificationResult.providerReference,
        status: verificationResult.status,
        amount: verificationResult.amount,
        signatureVerified: true,
        isDuplicate: true,
        idempotencyKey,
        processedAt: existingRecord.processedAt,
        retryCount: existingRecord.attemptCount,
        metadata: verificationResult.metadata
      };
    }

    // Step 4: Execute Payment Status Synchronization & Invoice Settlement with Retries
    let retryAttempts = 1;
    try {
      const sideEffectResult = await this.executeWithRetry(
        async () => {
          return await this.synchronizePaymentStatus(
            provider,
            verificationResult.transactionId,
            verificationResult.providerReference,
            verificationResult.status,
            verificationResult.amount
          );
        },
        3,
        250,
        `Payment Status Sync (${provider})`
      );

      retryAttempts = sideEffectResult.attempts;
    } catch (syncErr: any) {
      AuditLogger.log('ERROR', `Failed to synchronize payment status downstream: ${syncErr.message}`, { correlationId });
      this.queueFailedWebhook(provider, webhookReq, syncErr.message);
    }

    // Step 5: Save Idempotency Record
    const now = new Date().toISOString();
    const idempotencyRecord: WebhookIdempotencyRecord = {
      idempotencyKey,
      provider,
      transactionId: verificationResult.transactionId,
      providerReference: verificationResult.providerReference,
      status: verificationResult.status,
      amount: verificationResult.amount,
      signatureVerified: true,
      isDuplicate: false,
      processedAt: now,
      attemptCount: retryAttempts,
      responsePayload: verificationResult.metadata
    };

    this.idempotencyLedger.set(idempotencyKey, idempotencyRecord);

    AuditLogger.recordAudit({
      action: 'PAYMENT_WEBHOOK_PROCESSED_SUCCESS',
      resource: `/api/v1/payments/webhook/${provider}`,
      correlationId,
      metadata: {
        idempotencyKey,
        transactionId: verificationResult.transactionId,
        providerReference: verificationResult.providerReference,
        status: verificationResult.status,
        amount: verificationResult.amount,
        retryAttempts
      }
    });

    return {
      isValid: true,
      transactionId: verificationResult.transactionId,
      providerReference: verificationResult.providerReference,
      status: verificationResult.status,
      amount: verificationResult.amount,
      signatureVerified: true,
      isDuplicate: false,
      idempotencyKey,
      processedAt: now,
      retryCount: retryAttempts,
      metadata: verificationResult.metadata
    };
  }

  /**
   * Synchronize Payment Status across Billing & Invoicing Domains
   */
  private async synchronizePaymentStatus(
    provider: PaymentProvider,
    transactionId: string,
    providerRef: string,
    status: PaymentStatus,
    amount: number
  ): Promise<{ settledInvoiceId?: string; reactivatedAccount?: boolean }> {
    const billingService = BillingService.getInstance();
    const invoiceService = InvoiceService.getInstance();

    let settledInvoiceId: string | undefined;
    let reactivatedAccount = false;

    // Check if there is an open invoice or subscription matching transactionId
    const invoices = invoiceService.getAllInvoices();
    const targetInvoice = invoices.find(
      (inv) => inv.invoiceId === transactionId || inv.invoiceNumber === transactionId || inv.accountId === transactionId
    );

    if (targetInvoice && status === 'SUCCESS') {
      // Settle invoice and reactivate billing account if suspended
      const settleResult = await billingService.payInvoice(
        targetInvoice.invoiceId,
        provider as any,
        providerRef
      );
      settledInvoiceId = settleResult.invoice.invoiceId;
      reactivatedAccount = !settleResult.account.isSuspended;

      AuditLogger.log(
        'INFO',
        `Webhook auto-settled invoice ${settledInvoiceId} via ${provider}. Account reactivated: ${reactivatedAccount}`
      );
    } else if (status === 'FAILED' || status === 'CANCELLED') {
      const sub = billingService.getAllSubscriptions().find(s => s.subscriptionId === transactionId || s.accountId === transactionId);
      if (sub) {
        await billingService.handlePaymentFailure(sub.subscriptionId, `Webhook reported payment ${status} on ${provider}.`);
      }
    }

    return { settledInvoiceId, reactivatedAccount };
  }

  /**
   * Queue failed webhooks for background retry
   */
  private queueFailedWebhook(provider: PaymentProvider, req: WebhookVerificationRequest, errorMsg: string) {
    this.failedWebhookQueue.push({
      id: `FAIL-WH-${Date.now()}`,
      provider,
      request: req,
      attemptCount: 1,
      lastError: errorMsg,
      firstReceivedAt: new Date().toISOString()
    });

    if (this.failedWebhookQueue.length > 200) {
      this.failedWebhookQueue.shift();
    }
  }

  /**
   * Re-process queued failed webhooks (Retry Engine)
   */
  public async retryFailedWebhooks(): Promise<{ processedCount: number; successCount: number }> {
    const queueToProcess = [...this.failedWebhookQueue];
    this.failedWebhookQueue = [];

    let successCount = 0;

    for (const item of queueToProcess) {
      try {
        const result = await this.processWebhook(item.provider, item.request);
        if (result.isValid && result.signatureVerified) {
          successCount++;
        } else {
          item.attemptCount++;
          item.lastError = result.errorMessage || 'Signature verification failed on retry';
          if (item.attemptCount < 5) {
            this.failedWebhookQueue.push(item);
          }
        }
      } catch (err: any) {
        item.attemptCount++;
        item.lastError = err.message;
        if (item.attemptCount < 5) {
          this.failedWebhookQueue.push(item);
        }
      }
    }

    return { processedCount: queueToProcess.length, successCount };
  }

  /**
   * Getters
   */
  public getIdempotencyLedger(): WebhookIdempotencyRecord[] {
    return Array.from(this.idempotencyLedger.values());
  }

  public getFailedWebhookQueueLength(): number {
    return this.failedWebhookQueue.length;
  }
}
