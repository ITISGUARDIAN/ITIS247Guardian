// ITIS Enterprise Email & SMTP Engine Types
// Supports Microsoft 365, Google Workspace, Standard SMTP, and Mailgun Adapters
// HTML Email Templates, OTP, Password Reset, Emergency Alerts, and Delivery Tracking

import { AdapterSendResult, NotificationPriority } from '../communications.types';

export type EmailProviderType = 'SMTP' | 'MICROSOFT_365' | 'GOOGLE_WORKSPACE' | 'MAILGUN';

export type EmailTemplateType =
  | 'PASSWORD_RESET'
  | 'OTP_VERIFICATION'
  | 'EMERGENCY_NOTIFICATION'
  | 'INVOICE_SETTLEMENT'
  | 'GENERIC_TRANSACTIONAL';

export interface EmailAttachment {
  filename: string;
  content: string | Buffer; // Base64 or utf-8
  contentType: string;
  contentId?: string; // For inline images/cid
}

export interface EmailDispatchOptions {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  fromName?: string;
  fromEmail?: string;
  replyTo?: string;
  subject: string;
  textBody: string;
  htmlBody?: string;
  templateType?: EmailTemplateType;
  templateVariables?: Record<string, any>;
  priority?: NotificationPriority;
  attachments?: EmailAttachment[];
  tags?: string[];
  metadata?: Record<string, any>;
  trackOpens?: boolean;
  trackClicks?: boolean;
}

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean; // true for 465, false for 587/25
  authUser?: string;
  authPassword?: string;
  tlsRequire?: boolean;
  connectionTimeoutMs?: number;
}

export interface M365Config {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  senderAddress: string;
  useGraphApi: boolean; // true for Graph API /v1.0/sendMail, false for Exchange SMTP
  graphEndpoint?: string;
}

export interface GoogleWorkspaceConfig {
  clientEmail: string;
  privateKey: string;
  impersonatedUser?: string;
  useGmailApi: boolean; // true for REST API, false for Gmail SMTP
  smtpHost?: string;
  smtpPort?: number;
}

export interface MailgunConfig {
  apiKey: string;
  domain: string;
  region: 'US' | 'EU';
  webhookSigningKey?: string;
  testMode?: boolean;
}

export interface IEmailProvider {
  getProviderType(): EmailProviderType;
  sendEmail(options: EmailDispatchOptions): Promise<AdapterSendResult>;
  healthCheck(): Promise<{ healthy: boolean; responseMs: number; details?: string }>;
}

export interface EmailTrackingEvent {
  eventId: string;
  deliveryId: string;
  recipientEmail: string;
  eventType: 'SENT' | 'DELIVERED' | 'OPENED' | 'CLICKED' | 'BOUNCED' | 'SPAM_COMPLAINT' | 'FAILED';
  providerType: EmailProviderType;
  providerRef: string;
  ipAddress?: string;
  userAgent?: string;
  clickUrl?: string;
  bounceReason?: string;
  timestamp: string;
}

export interface EmailSuppressionRecord {
  email: string;
  reason: 'HARD_BOUNCE' | 'SPAM_COMPLAINT' | 'MANUAL_UNSUBSCRIBE';
  createdAt: string;
}
