// ITIS SMS Delivery Reports (DLR) Tracker, Retry Queue & Phone Opt-Out Ledger

import { AuditLogger } from '../../common/audit.logger';
import {
  SmsDeliveryReport,
  SmsDeliveryStatus,
  SmsDispatchOptions,
  SmsProviderType,
  SmsRetryQueueItem
} from './sms.types';

export class SmsDeliveryTracker {
  private static instance: SmsDeliveryTracker;

  private deliveryReports: Map<string, SmsDeliveryReport> = new Map();
  private optOutPhoneList: Set<string> = new Set();
  private retryQueue: Map<string, SmsRetryQueueItem> = new Map();

  private constructor() {}

  public static getInstance(): SmsDeliveryTracker {
    if (!SmsDeliveryTracker.instance) {
      SmsDeliveryTracker.instance = new SmsDeliveryTracker();
    }
    return SmsDeliveryTracker.instance;
  }

  /**
   * Phone Number Normalization
   */
  private cleanPhone(phone: string): string {
    let cleaned = phone.replace(/\s+/g, '').replace(/-/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '+27' + cleaned.substring(1);
    }
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }
    return cleaned;
  }

  /**
   * Opt-out / STOP handling
   */
  public isOptedOut(phoneNumber: string): boolean {
    return this.optOutPhoneList.has(this.cleanPhone(phoneNumber));
  }

  public addOptOut(phoneNumber: string) {
    const cleaned = this.cleanPhone(phoneNumber);
    this.optOutPhoneList.add(cleaned);
    AuditLogger.log('WARN', `Phone number ${cleaned} added to SMS STOP/Opt-Out list.`);
  }

  public removeOptOut(phoneNumber: string) {
    this.optOutPhoneList.delete(this.cleanPhone(phoneNumber));
  }

  public getOptOutList(): string[] {
    return Array.from(this.optOutPhoneList.values());
  }

  /**
   * Record Delivery Report (DLR)
   */
  public recordDlr(
    dispatchId: string,
    phoneNumber: string,
    providerType: SmsProviderType,
    providerRef: string,
    status: SmsDeliveryStatus,
    segmentCount: number = 1,
    errorCode?: string,
    errorMessage?: string
  ): SmsDeliveryReport {
    const dlrId = `DLR-${Date.now()}-${Math.floor(Math.random() * 89999 + 10000)}`;
    const now = new Date().toISOString();

    const report: SmsDeliveryReport = {
      dlrId,
      dispatchId,
      phoneNumber: this.cleanPhone(phoneNumber),
      providerType,
      providerRef,
      status,
      errorCode,
      errorMessage,
      segmentCount,
      deliveredAt: status === 'DELIVERED' ? now : undefined,
      timestamp: now
    };

    this.deliveryReports.set(dlrId, report);

    AuditLogger.recordAudit({
      action: `SMS_DLR_${status}`,
      resource: `/api/v1/communications/sms/dlr`,
      correlationId: `DLR-${dispatchId}`,
      metadata: { dispatchId, phoneNumber, providerType, status, errorCode }
    });

    return report;
  }

  /**
   * Retry Queue Management
   */
  public enqueueForRetry(options: SmsDispatchOptions, errorReason: string, maxAttempts: number = 3): SmsRetryQueueItem {
    const queueId = `RETRY-SMS-${Date.now()}-${Math.floor(Math.random() * 89999 + 10000)}`;
    const now = Date.now();

    const queueItem: SmsRetryQueueItem = {
      id: queueId,
      options,
      attemptCount: 1,
      maxAttempts: options.maxRetries || maxAttempts,
      nextAttemptAt: now + 5000, // Retry in 5 seconds
      lastError: errorReason,
      createdAt: new Date().toISOString()
    };

    this.retryQueue.set(queueId, queueItem);
    AuditLogger.log('WARN', `SMS to ${options.phoneNumber} queued for retry (ID: ${queueId}). Error: ${errorReason}`);
    return queueItem;
  }

  public getPendingRetryQueueItems(): SmsRetryQueueItem[] {
    const now = Date.now();
    return Array.from(this.retryQueue.values()).filter(
      (item) => item.attemptCount < item.maxAttempts && item.nextAttemptAt <= now
    );
  }

  public removeRetryQueueItem(queueId: string) {
    this.retryQueue.delete(queueId);
  }

  public updateRetryQueueAttempt(queueId: string, lastError: string) {
    const item = this.retryQueue.get(queueId);
    if (item) {
      item.attemptCount += 1;
      item.nextAttemptAt = Date.now() + Math.pow(2, item.attemptCount) * 5000; // Exponential backoff (10s, 20s, etc.)
      item.lastError = lastError;
      if (item.attemptCount >= item.maxAttempts) {
        AuditLogger.log('ERROR', `SMS retry queue item ${queueId} exhausted max attempts (${item.maxAttempts}).`);
      }
    }
  }

  /**
   * Getters
   */
  public getAllDlrs(): SmsDeliveryReport[] {
    return Array.from(this.deliveryReports.values());
  }

  public getDlrsForPhone(phoneNumber: string): SmsDeliveryReport[] {
    const cleaned = this.cleanPhone(phoneNumber);
    return Array.from(this.deliveryReports.values()).filter((r) => r.phoneNumber === cleaned);
  }

  public getRetryQueueItems(): SmsRetryQueueItem[] {
    return Array.from(this.retryQueue.values());
  }
}
