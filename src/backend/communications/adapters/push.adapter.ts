// ITIS Push Notification Channel Adapter (Prompt 075 & 078)
// Production Adapter for Apple APNs & Android Firebase Cloud Messaging (FCM)
// Supports Direct Tokens, User IDs, Topic Subscriptions, Regional Geofences, Emergency Escalations & Badges

import { AdapterSendResult, NotificationPriority } from '../communications.types';
import { PushProviderFactory } from '../push/push-provider.factory';
import { PushTargetType } from '../push/push.types';

export class PushAdapter {
  private static instance: PushAdapter;
  private providerFactory = PushProviderFactory.getInstance();

  private constructor() {}

  public static getInstance(): PushAdapter {
    if (!PushAdapter.instance) {
      PushAdapter.instance = new PushAdapter();
    }
    return PushAdapter.instance;
  }

  /**
   * Dispatch Mobile Push Notification to iOS (APNs) or Android (FCM)
   */
  public async sendPushNotification(
    pushTokenOrUserId: string,
    title: string,
    body: string,
    priority: NotificationPriority = 'NORMAL',
    customData?: Record<string, any>,
    targetType: PushTargetType = 'DEVICE'
  ): Promise<AdapterSendResult> {
    if (!pushTokenOrUserId || pushTokenOrUserId.trim().length === 0) {
      return {
        success: false,
        errorReason: 'Invalid or missing pushToken or userId for push dispatch.',
        shouldRetry: false
      };
    }

    if (targetType === 'USER' || pushTokenOrUserId.startsWith('USR-') || pushTokenOrUserId.startsWith('USER-')) {
      return this.providerFactory.dispatchToUser(pushTokenOrUserId, {
        targetType: 'USER',
        target: pushTokenOrUserId,
        title,
        body,
        priority,
        sound: priority === 'CRITICAL' ? 'emergency_siren.caf' : 'default',
        criticalInterruption: priority === 'CRITICAL',
        badgeStrategy: 'INCREMENT',
        badge: 1,
        dataPayload: customData
      });
    }

    return this.providerFactory.dispatchToDevice(pushTokenOrUserId, {
      targetType: 'DEVICE',
      target: pushTokenOrUserId,
      title,
      body,
      priority,
      sound: priority === 'CRITICAL' ? 'emergency_siren.caf' : 'default',
      criticalInterruption: priority === 'CRITICAL',
      badgeStrategy: 'INCREMENT',
      badge: 1,
      dataPayload: customData
    });
  }
}
