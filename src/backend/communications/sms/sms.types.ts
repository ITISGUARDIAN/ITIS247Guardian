// ITIS Enterprise SMS Engine Types
// Supports BulkSMS, Twilio, Infobip, and Vodacom/MTN Enterprise SMS Gateways
// OTP, Emergency SMS, Attendance Notifications, Low Battery Alerts, Incident Alerts
// Retry Queues & Delivery Reports (DLR)

import { AdapterSendResult, NotificationPriority } from '../communications.types';

export type SmsProviderType = 'BULKSMS' | 'TWILIO' | 'INFOBIP' | 'VODACOM_ENTERPRISE';

export type SmsCategoryType =
  | 'OTP'
  | 'EMERGENCY_SMS'
  | 'ATTENDANCE_NOTIFICATION'
  | 'LOW_BATTERY'
  | 'INCIDENT_ALERT'
  | 'GENERIC';

export type SmsDeliveryStatus =
  | 'QUEUED'
  | 'SENT'
  | 'DELIVERED'
  | 'FAILED'
  | 'UNDELIVERED'
  | 'EXPIRED'
  | 'REJECTED';

export interface SmsDispatchOptions {
  phoneNumber: string; // E.164 format e.g. +27821234567 or local 0821234567
  message?: string;
  category?: SmsCategoryType;
  variables?: Record<string, any>;
  priority?: NotificationPriority;
  senderId?: string; // e.g. ITIS_GOV, ITIS_ALERT
  maxRetries?: number;
  metadata?: Record<string, any>;
}

export interface BulkSmsConfig {
  tokenId: string;
  tokenSecret: string;
  baseUrl?: string; // Default: https://api.bulksms.com/v1
  senderId?: string;
}

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
  messagingServiceSid?: string;
}

export interface InfobipConfig {
  apiKey: string;
  baseUrl: string; // e.g. https://xyz.api.infobip.com
  fromSender?: string;
}

export interface VodacomConfig {
  username: string;
  password: string;
  accountCode: string;
  gatewayHost?: string;
}

export interface ISmsProvider {
  getProviderType(): SmsProviderType;
  sendSms(options: SmsDispatchOptions): Promise<AdapterSendResult>;
  healthCheck(): Promise<{ healthy: boolean; responseMs: number; details?: string }>;
}

export interface SmsDeliveryReport {
  dlrId: string;
  dispatchId: string;
  phoneNumber: string;
  providerType: SmsProviderType;
  providerRef: string;
  status: SmsDeliveryStatus;
  errorCode?: string;
  errorMessage?: string;
  segmentCount: number;
  deliveredAt?: string;
  timestamp: string;
}

export interface SmsRetryQueueItem {
  id: string;
  options: SmsDispatchOptions;
  attemptCount: number;
  maxAttempts: number;
  nextAttemptAt: number;
  lastError?: string;
  createdAt: string;
}
