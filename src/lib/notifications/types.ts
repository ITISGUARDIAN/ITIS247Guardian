export type NotificationChannel = 'sms' | 'email' | 'push' | 'in_app' | 'web';

export type NotificationStatus = 'queued' | 'sending' | 'delivered' | 'failed' | 'expired' | 'dlq';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'emergency';

export type SmsProviderType = 'twilio' | 'clickatell' | 'bulksms' | 'aws_sns' | 'simulator';
export type EmailProviderType = 'sendgrid' | 'ses' | 'smtp' | 'simulator';
export type PushProviderType = 'fcm' | 'simulator';

export interface ProviderConfig {
  smsProvider: SmsProviderType;
  smsApiKey?: string;
  smsSenderId?: string;
  
  emailProvider: EmailProviderType;
  emailApiKey?: string;
  emailFromAddress?: string;
  
  pushProvider: PushProviderType;
  fcmProjectKey?: string;

  simulationMode: boolean;
}

export interface NotificationTemplate {
  id: string;
  title: string;
  category: 'parent' | 'school' | 'responder' | 'government';
  channelSupport: NotificationChannel[];
  subjectTemplate: string;
  bodyTemplate: Record<string, string>; // Language code -> template text e.g., 'en', 'zu', 'af'
  defaultPriority: NotificationPriority;
  placeholders: string[];
}

export interface NotificationLog {
  id: string;
  recipientId: string;
  recipientRole: string;
  recipientContact: string; // Phone or Email
  channel: NotificationChannel;
  priority: NotificationPriority;
  templateId: string;
  title: string;
  body: string;
  status: NotificationStatus;
  provider: string;
  retryCount: number;
  maxRetries: number;
  deliveryLatencyMs: number;
  queuedAt: string;
  deliveredAt?: string;
  failedReason?: string;
  costZar: number;
}

export interface UserNotificationPreferences {
  userId: string;
  userName: string;
  userRole: 'parent' | 'school' | 'responder' | 'government';
  smsEnabled: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  emergencyOnly: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string; // '22:00'
  quietHoursEnd: string;   // '06:00'
  preferredLanguage: 'en' | 'zu' | 'af' | 'st' | 'xh';
}

export interface EmergencyBroadcastPayload {
  id: string;
  scope: 'school' | 'district' | 'province' | 'national' | 'responders';
  targetRegion: string;
  severity: 'high' | 'critical' | 'disaster';
  messageEn: string;
  messageZu: string;
  messageAf: string;
  recipientsCount: number;
  dispatchedAt: string;
  status: 'DISPATCHING' | 'DELIVERED' | 'FAILED';
  deliverySuccessRate: number;
}

export interface DeliveryAnalytics {
  notificationsToday: number;
  deliverySuccessRate: number;
  avgLatencyMs: number;
  totalCostZar: number;
  channelBreakdown: {
    sms: number;
    email: number;
    push: number;
    inApp: number;
  };
  providerUptime: {
    sms: number;
    email: number;
    push: number;
  };
  dlqCount: number;
}
