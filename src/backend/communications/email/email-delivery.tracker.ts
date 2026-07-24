// ITIS Email Delivery Tracker & Suppression Ledger
// Open Tracking Pixels, Click Redirect Tracking, Bounce/Spam Suppression List

import { AuditLogger } from '../../common/audit.logger';
import { EmailProviderType, EmailSuppressionRecord, EmailTrackingEvent } from './email.types';

export class EmailDeliveryTracker {
  private static instance: EmailDeliveryTracker;

  private trackingEvents: Map<string, EmailTrackingEvent> = new Map();
  private suppressionList: Map<string, EmailSuppressionRecord> = new Map();

  private constructor() {}

  public static getInstance(): EmailDeliveryTracker {
    if (!EmailDeliveryTracker.instance) {
      EmailDeliveryTracker.instance = new EmailDeliveryTracker();
    }
    return EmailDeliveryTracker.instance;
  }

  /**
   * Check if recipient is in Suppression List (Bounced or Unsubscribed)
   */
  public isSuppressed(email: string): boolean {
    const record = this.suppressionList.get(email.toLowerCase().trim());
    return Boolean(record);
  }

  /**
   * Add address to Suppression List
   */
  public addToSuppressionList(email: string, reason: EmailSuppressionRecord['reason']) {
    const cleanEmail = email.toLowerCase().trim();
    this.suppressionList.set(cleanEmail, {
      email: cleanEmail,
      reason,
      createdAt: new Date().toISOString()
    });

    AuditLogger.log('WARN', `Email ${cleanEmail} added to suppression list. Reason: ${reason}`);
  }

  /**
   * Remove address from Suppression List
   */
  public removeFromSuppressionList(email: string) {
    this.suppressionList.delete(email.toLowerCase().trim());
  }

  /**
   * Record Delivery Tracking Event (SENT, OPENED, CLICKED, BOUNCED, etc.)
   */
  public recordEvent(
    deliveryId: string,
    recipientEmail: string,
    eventType: EmailTrackingEvent['eventType'],
    providerType: EmailProviderType,
    providerRef: string,
    metadata?: { ipAddress?: string; userAgent?: string; clickUrl?: string; bounceReason?: string }
  ): EmailTrackingEvent {
    const eventId = `EVT-EMAIL-${Date.now()}-${Math.floor(Math.random() * 89999 + 10000)}`;
    const now = new Date().toISOString();

    const event: EmailTrackingEvent = {
      eventId,
      deliveryId,
      recipientEmail,
      eventType,
      providerType,
      providerRef,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      clickUrl: metadata?.clickUrl,
      bounceReason: metadata?.bounceReason,
      timestamp: now
    };

    this.trackingEvents.set(eventId, event);

    if (eventType === 'BOUNCED' || eventType === 'SPAM_COMPLAINT') {
      this.addToSuppressionList(recipientEmail, eventType === 'BOUNCED' ? 'HARD_BOUNCE' : 'SPAM_COMPLAINT');
    }

    AuditLogger.recordAudit({
      action: `EMAIL_EVENT_${eventType}`,
      resource: `/api/v1/communications/email/track`,
      correlationId: `TRACK-${deliveryId}`,
      metadata: { deliveryId, recipientEmail, eventType, providerType, providerRef }
    });

    return event;
  }

  /**
   * Inject 1x1 Transparent Open Tracking Pixel into HTML email
   */
  public injectOpenTrackingPixel(htmlBody: string, deliveryId: string, baseUrl: string = 'https://itis.gov.za'): string {
    const trackingPixelUrl = `${baseUrl}/api/v1/communications/email/track/open/${deliveryId}`;
    const pixelImgTag = `<img src="${trackingPixelUrl}" width="1" height="1" border="0" alt="" style="display:none; width:1px; height:1px; max-height:0px; max-width:0px; overflow:hidden;" />`;

    if (htmlBody.includes('</body>')) {
      return htmlBody.replace('</body>', `${pixelImgTag}</body>`);
    } else {
      return htmlBody + pixelImgTag;
    }
  }

  /**
   * Wrap links with Click Tracking Proxy URL
   */
  public wrapClickTrackingUrls(htmlBody: string, deliveryId: string, baseUrl: string = 'https://itis.gov.za'): string {
    const trackingBaseUrl = `${baseUrl}/api/v1/communications/email/track/click/${deliveryId}?url=`;

    // Regex to match href="https://..." links
    return htmlBody.replace(/href=["'](https?:\/\/[^"']+)["']/gi, (match, originalUrl) => {
      // Do not re-wrap tracking links
      if (originalUrl.includes('/api/v1/communications/email/track')) {
        return match;
      }
      const wrappedUrl = `${trackingBaseUrl}${encodeURIComponent(originalUrl)}`;
      return `href="${wrappedUrl}"`;
    });
  }

  /**
   * Getters
   */
  public getEventsForDelivery(deliveryId: string): EmailTrackingEvent[] {
    return Array.from(this.trackingEvents.values()).filter((e) => e.deliveryId === deliveryId);
  }

  public getAllTrackingEvents(): EmailTrackingEvent[] {
    return Array.from(this.trackingEvents.values());
  }

  public getSuppressionList(): EmailSuppressionRecord[] {
    return Array.from(this.suppressionList.values());
  }
}
