// ITIS Enterprise Communications Engine Types (Prompt 075)
// Multi-Channel Dispatch: SMS, Email, Push Notifications, WhatsApp Business
// Templates, South African Localization, Retry Queues, Delivery Tracking, Audit Logging

export type CommunicationChannel = 'SMS' | 'EMAIL' | 'PUSH' | 'WHATSAPP';

export type NotificationPriority = 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW';

export type DeliveryStatus =
  | 'QUEUED'
  | 'SENDING'
  | 'DELIVERED'
  | 'FAILED'
  | 'RETRYING'
  | 'BOUNCED'
  | 'EXPIRED';

export type SupportedLocale = 'en-ZA' | 'zu-ZA' | 'af-ZA' | 'xh-ZA' | 'st-ZA';

export interface RecipientProfile {
  recipientId: string;
  name: string;
  email?: string;
  phone?: string; // E.164 format e.g. "+27825550192"
  whatsappNumber?: string; // e.g. "+27825550192"
  pushToken?: string; // FCM/APNS token
  preferredChannel?: CommunicationChannel;
  locale: SupportedLocale;
  quietHoursEnabled?: boolean;
}

export interface TemplateBinding {
  [key: string]: string | number | boolean;
}

export interface CommunicationTemplate {
  templateCode: string; // e.g. "EMERGENCY_SOS_ALERT", "LEARNER_CHECKIN_SUCCESS", "INVOICE_OVERDUE"
  category: 'SAFETY' | 'ATTENDANCE' | 'BILLING' | 'SECURITY' | 'SYSTEM';
  allowedChannels: CommunicationChannel[];
  localizations: Record<
    SupportedLocale,
    {
      title: string; // Subject / Push Title
      body: string; // Text body with {{variable}} placeholders
      htmlBody?: string; // Email HTML template
      whatsappHsmTemplateName?: string; // WhatsApp Business pre-approved template name
    }
  >;
}

export interface DispatchRequest {
  templateCode: string;
  recipient: RecipientProfile;
  channels?: CommunicationChannel[]; // Overrides default channels if supplied
  variables: TemplateBinding;
  priority?: NotificationPriority;
  metadata?: Record<string, any>;
}

export interface DeliveryLogRecord {
  deliveryId: string;
  dispatchId: string;
  recipientId: string;
  templateCode: string;
  channel: CommunicationChannel;
  locale: SupportedLocale;
  priority: NotificationPriority;
  status: DeliveryStatus;
  destination: string; // Email address, Phone number, or Push Token
  subjectTitle: string;
  renderedBody: string;
  providerReference?: string;
  errorReason?: string;
  attemptCount: number;
  maxAttempts: number;
  nextRetryAt?: string;
  sentAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RetryQueueItem {
  deliveryId: string;
  channel: CommunicationChannel;
  recipient: RecipientProfile;
  destination: string;
  renderedTitle: string;
  renderedBody: string;
  htmlBody?: string;
  attemptCount: number;
  maxAttempts: number;
  nextRetryAt: string;
  lastError: string;
  priority: NotificationPriority;
  metadata?: Record<string, any>;
}

export interface AdapterSendResult {
  success: boolean;
  providerReference?: string;
  errorReason?: string;
  shouldRetry: boolean;
  metadata?: Record<string, any>;
}
