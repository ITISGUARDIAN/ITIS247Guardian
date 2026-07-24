// ITIS Enterprise Push Notification Engine Types
// Supports Android (FCM v1), iOS (APNs HTTP/2), Topic Subscriptions, Regional Targeting,
// Emergency Priority Notifications, Badge Counts, and Notification History Tracking

import { AdapterSendResult, NotificationPriority } from '../communications.types';

export type PushPlatform = 'ANDROID' | 'IOS' | 'WEB';

export type PushTargetType = 'DEVICE' | 'USER' | 'TOPIC' | 'REGION';

export interface PushDeviceRegistration {
  deviceId: string;
  userId?: string;
  platform: PushPlatform;
  pushToken: string;
  region?: string; // e.g., 'GAUTENG', 'WESTERN_CAPE', 'KZN', 'TSHWANE'
  municipality?: string; // e.g. 'CITY_OF_TSHWANE', 'CITY_OF_JOHANNESBURG'
  topics: string[]; // List of subscribed topic strings e.g. ['EMERGENCY_ALERTS', 'GAUTENG_TRAFFIC']
  badgeCount: number;
  appVersion?: string;
  lastActiveAt: string;
  createdAt: string;
}

export interface PushDispatchOptions {
  targetType: PushTargetType;
  target?: string; // token, userId, topic name, or region name
  title: string;
  body: string;
  subtitle?: string;
  priority?: NotificationPriority;
  badge?: number; // Absolute badge count or relative increment if badgeStrategy is 'INCREMENT'
  badgeStrategy?: 'SET' | 'INCREMENT';
  sound?: string; // Custom sound file or 'default' / 'emergency_siren.caf'
  clickActionUrl?: string;
  dataPayload?: Record<string, any>;
  timeToLiveSeconds?: number;
  criticalInterruption?: boolean; // For iOS 15+ Critical Alerts / Android High Priority Channel
}

export interface FcmConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
  defaultChannelId?: string;
}

export interface ApnsConfig {
  keyId: string;
  teamId: string;
  bundleId: string; // e.g. za.gov.itis.app
  privateKey: string;
  production: boolean;
}

export interface IPushProvider {
  getPlatform(): PushPlatform;
  sendToDevice(token: string, options: PushDispatchOptions): Promise<AdapterSendResult>;
  sendToTopic(topic: string, options: PushDispatchOptions): Promise<AdapterSendResult>;
  healthCheck(): Promise<{ healthy: boolean; responseMs: number; details?: string }>;
}

export interface PushHistoryRecord {
  id: string;
  targetType: PushTargetType;
  target: string;
  title: string;
  body: string;
  priority: NotificationPriority;
  criticalInterruption: boolean;
  platform: PushPlatform | 'MULTI_PLATFORM';
  badge: number;
  dataPayload?: Record<string, any>;
  sentAt: string;
  successCount: number;
  failureCount: number;
  providerRefs: string[];
}

export interface TopicSubscriptionRequest {
  deviceIdOrToken: string;
  topic: string;
}

export interface RegionalTargetOptions {
  region: string; // Province code e.g. 'GAUTENG', 'WESTERN_CAPE'
  municipality?: string;
  minAppVersion?: string;
}
