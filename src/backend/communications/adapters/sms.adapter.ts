// ITIS SMS Channel Adapter (Prompt 075 & 077)
// Production Adapter for Enterprise SMS Rail (BulkSMS, Vodacom/MTN Enterprise, Twilio, Infobip)
// Supports OTP, Emergency SMS, Attendance Notifications, Low Battery Alerts, Incident Alerts, Retry Queues & DLRs

import { AdapterSendResult, NotificationPriority } from '../communications.types';
import { SmsProviderFactory } from '../sms/sms-provider.factory';
import { SmsCategoryType, SmsProviderType } from '../sms/sms.types';

export class SmsAdapter {
  private static instance: SmsAdapter;
  private providerFactory = SmsProviderFactory.getInstance();

  private constructor() {}

  public static getInstance(): SmsAdapter {
    if (!SmsAdapter.instance) {
      SmsAdapter.instance = new SmsAdapter();
    }
    return SmsAdapter.instance;
  }

  /**
   * Dispatch SMS via Enterprise SMS Provider Factory & Router Engine
   */
  public async sendSms(
    phoneNumber: string,
    message?: string,
    priority: NotificationPriority = 'NORMAL',
    category?: SmsCategoryType,
    variables?: Record<string, any>,
    forcedProvider?: SmsProviderType
  ): Promise<AdapterSendResult> {
    if (!phoneNumber) {
      return {
        success: false,
        errorReason: 'Recipient phone number is required.',
        shouldRetry: false
      };
    }

    const dispatchResult = await this.providerFactory.dispatchSms(
      {
        phoneNumber,
        message,
        category,
        variables,
        priority,
        senderId: 'ITIS_GOV'
      },
      forcedProvider
    );

    return {
      success: dispatchResult.success,
      providerReference: dispatchResult.providerReference,
      errorReason: dispatchResult.errorReason,
      shouldRetry: dispatchResult.shouldRetry,
      metadata: {
        usedProviderType: dispatchResult.usedProviderType,
        partsCount: dispatchResult.partsCount,
        category: category || 'CUSTOM',
        priority,
        ...dispatchResult.metadata
      }
    };
  }
}
