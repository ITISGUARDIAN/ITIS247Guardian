// ITIS Email Channel Adapter (Prompt 075 & 076)
// Production Abstraction for Standard SMTP, Microsoft 365, Google Workspace, and Mailgun with Failover & Template Compilation

import { AdapterSendResult, NotificationPriority } from '../communications.types';
import { EmailProviderFactory } from '../email/email-provider.factory';
import { EmailProviderType, EmailTemplateType } from '../email/email.types';

export class EmailAdapter {
  private static instance: EmailAdapter;
  private providerFactory = EmailProviderFactory.getInstance();

  private constructor() {}

  public static getInstance(): EmailAdapter {
    if (!EmailAdapter.instance) {
      EmailAdapter.instance = new EmailAdapter();
    }
    return EmailAdapter.instance;
  }

  /**
   * Dispatch HTML/Text Email through Enterprise Email Provider Factory
   */
  public async sendEmail(
    toEmail: string,
    subject: string,
    textBody: string,
    htmlBody?: string,
    priority: NotificationPriority = 'NORMAL',
    templateType?: EmailTemplateType,
    templateVariables?: Record<string, any>,
    forcedProvider?: EmailProviderType
  ): Promise<AdapterSendResult> {
    if (!toEmail || !toEmail.includes('@')) {
      return {
        success: false,
        errorReason: `Invalid recipient email address: ${toEmail}`,
        shouldRetry: false
      };
    }

    const dispatchResult = await this.providerFactory.dispatchEmail(
      {
        to: toEmail,
        subject,
        textBody,
        htmlBody,
        priority,
        templateType,
        templateVariables,
        trackOpens: true,
        trackClicks: true
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
        sender: 'notifications@itis.gov.za',
        hasHtml: Boolean(htmlBody || templateType),
        dkimVerified: true,
        priority,
        ...dispatchResult.metadata
      }
    };
  }
}
