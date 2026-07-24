// ITIS Enterprise Communications Engine Service (Prompt 075)
// Multi-Channel Dispatch (SMS, Email, Push, WhatsApp), Pre-approved Templates, Multi-lingual SA Localization,
// Exponential Retry Queues, Delivery Tracking, and Audit Logging

import { AuditLogger } from '../common/audit.logger';
import { EmailAdapter } from './adapters/email.adapter';
import { PushAdapter } from './adapters/push.adapter';
import { SmsAdapter } from './adapters/sms.adapter';
import { WhatsAppAdapter } from './adapters/whatsapp.adapter';
import {
  AdapterSendResult,
  CommunicationChannel,
  CommunicationTemplate,
  DeliveryLogRecord,
  DeliveryStatus,
  DispatchRequest,
  NotificationPriority,
  RecipientProfile,
  RetryQueueItem,
  SupportedLocale,
  TemplateBinding
} from './communications.types';

export class CommunicationsService {
  private static instance: CommunicationsService;

  private templates: Map<string, CommunicationTemplate> = new Map();
  private deliveryLogs: Map<string, DeliveryLogRecord> = new Map();
  private retryQueue: Map<string, RetryQueueItem> = new Map();

  private smsAdapter = SmsAdapter.getInstance();
  private emailAdapter = EmailAdapter.getInstance();
  private pushAdapter = PushAdapter.getInstance();
  private whatsappAdapter = WhatsAppAdapter.getInstance();

  private constructor() {
    this.seedDefaultTemplates();
  }

  public static getInstance(): CommunicationsService {
    if (!CommunicationsService.instance) {
      CommunicationsService.instance = new CommunicationsService();
    }
    return CommunicationsService.instance;
  }

  /**
   * Seed production multi-lingual templates across 5 South African official languages
   * Languages: English (en-ZA), isiZulu (zu-ZA), Afrikaans (af-ZA), isiXhosa (xh-ZA), Sesotho (st-ZA)
   */
  private seedDefaultTemplates() {
    // 1. EMERGENCY_SOS_ALERT
    const emergencyTemplate: CommunicationTemplate = {
      templateCode: 'EMERGENCY_SOS_ALERT',
      category: 'SAFETY',
      allowedChannels: ['PUSH', 'SMS', 'WHATSAPP', 'EMAIL'],
      localizations: {
        'en-ZA': {
          title: '🚨 CRITICAL SOS ALERT: {{learnerName}}',
          body: 'EMERGENCY: {{learnerName}} activated wearable Panic SOS at {{location}} at {{time}}. Live radar active.',
          htmlBody: '<h1 style="color:red;">CRITICAL SOS ALERT</h1><p>Emergency trigger recorded for <strong>{{learnerName}}</strong> at {{location}}.</p>',
          whatsappHsmTemplateName: 'itis_emergency_sos_v1'
        },
        'zu-ZA': {
          title: '🚨 ISIXWAYISO SOS ESIYINGOOZI: {{learnerName}}',
          body: 'INHOLELA: {{learnerName}} usebenzise inkinobho ye-SOS e-{{location}} ngo-{{time}}. Buyekeza imephu.',
          htmlBody: '<h1 style="color:red;">ISIXWAYISO SOS</h1><p>Inkinobho yosizo icindezelwe ngu-<strong>{{learnerName}}</strong> e-{{location}}.</p>',
          whatsappHsmTemplateName: 'itis_emergency_sos_zu'
        },
        'af-ZA': {
          title: '🚨 KRITIESE SOS NOODWAARSKUWING: {{learnerName}}',
          body: 'NOOD: {{learnerName}} het draagbare Paniek SOS geaktiveer by {{location}} om {{time}}. Regstreekse radar aktief.',
          htmlBody: '<h1 style="color:red;">KRITIESE SOS NOODWAARSKUWING</h1><p>Noodsein vir <strong>{{learnerName}}</strong> by {{location}}.</p>',
          whatsappHsmTemplateName: 'itis_emergency_sos_af'
        },
        'xh-ZA': {
          title: '🚨 ISILUMKISO SOS ESILELEYO: {{learnerName}}',
          body: 'I-EMERGENCY: U-{{learnerName}} uvule i-Panic SOS kwi-{{location}} nge-{{time}}. Landela imephu.',
          htmlBody: '<h1 style="color:red;">ISILUMKISO SOS ESILELEYO</h1><p>Ucedo lufunwa ngu-<strong>{{learnerName}}</strong> kwi-{{location}}.</p>',
          whatsappHsmTemplateName: 'itis_emergency_sos_xh'
        },
        'st-ZA': {
          title: '🚨 TEMOHISO E POTLAKILENG SOS: {{learnerName}}',
          body: 'TSEBISO: {{learnerName}} o tobile konopo ea SOS ho {{location}} ka {{time}}. Sheba mmapa.',
          htmlBody: '<h1 style="color:red;">TEMOHISO E POTLAKILENG SOS</h1><p>Thuso e batloa ke <strong>{{learnerName}}</strong> ho {{location}}.</p>',
          whatsappHsmTemplateName: 'itis_emergency_sos_st'
        }
      }
    };
    this.templates.set(emergencyTemplate.templateCode, emergencyTemplate);

    // 2. LEARNER_CHECKIN_SUCCESS
    const checkinTemplate: CommunicationTemplate = {
      templateCode: 'LEARNER_CHECKIN_SUCCESS',
      category: 'ATTENDANCE',
      allowedChannels: ['PUSH', 'WHATSAPP', 'SMS'],
      localizations: {
        'en-ZA': {
          title: '✅ Safe Arrival: {{learnerName}}',
          body: '{{learnerName}} arrived safely at {{schoolName}} at {{time}}. Attendance verified.',
          whatsappHsmTemplateName: 'itis_checkin_success_en'
        },
        'zu-ZA': {
          title: '✅ Ukufika Ngokuphepha: {{learnerName}}',
          body: 'U-{{learnerName}} ufike ngokuphepha e-{{schoolName}} ngo-{{time}}.',
          whatsappHsmTemplateName: 'itis_checkin_success_zu'
        },
        'af-ZA': {
          title: '✅ Veilige Aankoms: {{learnerName}}',
          body: '{{learnerName}} het veilig aangekom by {{schoolName}} om {{time}}.',
          whatsappHsmTemplateName: 'itis_checkin_success_af'
        },
        'xh-ZA': {
          title: '✅ Ukufika Ngokukhuselekileyo: {{learnerName}}',
          body: 'U-{{learnerName}} ufike ngokukhuselekileyo kwi-{{schoolName}} nge-{{time}}.',
          whatsappHsmTemplateName: 'itis_checkin_success_xh'
        },
        'st-ZA': {
          title: '✅ Ho Fihla Hantle: {{learnerName}}',
          body: '{{learnerName}} o fihlile hantle sekolong sa {{schoolName}} ka {{time}}.',
          whatsappHsmTemplateName: 'itis_checkin_success_st'
        }
      }
    };
    this.templates.set(checkinTemplate.templateCode, checkinTemplate);

    // 3. INVOICE_OVERDUE
    const invoiceTemplate: CommunicationTemplate = {
      templateCode: 'INVOICE_OVERDUE',
      category: 'BILLING',
      allowedChannels: ['EMAIL', 'SMS', 'WHATSAPP'],
      localizations: {
        'en-ZA': {
          title: '⚠️ Payment Overdue Notice: Invoice {{invoiceNumber}}',
          body: 'Dear {{customerName}}, your ITIS payment of R{{amount}} for Invoice {{invoiceNumber}} was due on {{dueDate}}. Pay now to avoid grace period expiry.',
          htmlBody: '<h2>Payment Overdue Notice</h2><p>Dear {{customerName}}, your account has an unpaid invoice <strong>{{invoiceNumber}}</strong> of <strong>R{{amount}}</strong>.</p>',
          whatsappHsmTemplateName: 'itis_invoice_overdue_en'
        },
        'zu-ZA': {
          title: '⚠️ Isaziso Inkokhelo Yephuzile: {{invoiceNumber}}',
          body: 'Sawubona {{customerName}}, inkokhelo yakho ye-R{{amount}} ye-Invoice {{invoiceNumber}} yasingedlule ngomhlaka {{dueDate}}.',
          whatsappHsmTemplateName: 'itis_invoice_overdue_zu'
        },
        'af-ZA': {
          title: '⚠️ Kennisgewing van Agterstallige Betaling: {{invoiceNumber}}',
          body: 'Beste {{customerName}}, u betaling van R{{amount}} vir Faktuuur {{invoiceNumber}} was verskuldig op {{dueDate}}.',
          whatsappHsmTemplateName: 'itis_invoice_overdue_af'
        },
        'xh-ZA': {
          title: '⚠️ Isaziso Sebhali Elingahlawulwanga: {{invoiceNumber}}',
          body: 'Molo {{customerName}}, iimfuno zakho ze-R{{amount}} ye-Invoice {{invoiceNumber}} ibilindeleke nge-{{dueDate}}.',
          whatsappHsmTemplateName: 'itis_invoice_overdue_xh'
        },
        'st-ZA': {
          title: '⚠️ Tsebiso e Sitisang ea Tefo: {{invoiceNumber}}',
          body: 'Lumedisa {{customerName}}, tefo ea hau ea R{{amount}} bakeng sa Bili {{invoiceNumber}} e ne e lokela ho lefshoa ka {{dueDate}}.',
          whatsappHsmTemplateName: 'itis_invoice_overdue_st'
        }
      }
    };
    this.templates.set(invoiceTemplate.templateCode, invoiceTemplate);
  }

  /**
   * Render template with recipient's preferred locale and variable interpolation
   */
  public renderTemplate(
    templateCode: string,
    locale: SupportedLocale,
    variables: TemplateBinding
  ): { title: string; body: string; htmlBody?: string; whatsappHsmTemplateName?: string } {
    const template = this.templates.get(templateCode);
    if (!template) {
      throw new Error(`Communication Template '${templateCode}' not found.`);
    }

    const localized = template.localizations[locale] || template.localizations['en-ZA'];
    let renderedTitle = localized.title;
    let renderedBody = localized.body;
    let renderedHtml = localized.htmlBody;

    // Substitute {{key}} placeholders
    for (const [key, val] of Object.entries(variables)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      renderedTitle = renderedTitle.replace(regex, String(val));
      renderedBody = renderedBody.replace(regex, String(val));
      if (renderedHtml) {
        renderedHtml = renderedHtml.replace(regex, String(val));
      }
    }

    return {
      title: renderedTitle,
      body: renderedBody,
      htmlBody: renderedHtml,
      whatsappHsmTemplateName: localized.whatsappHsmTemplateName
    };
  }

  /**
   * 1. Dispatch Multi-Channel Communication
   */
  public async sendNotification(req: DispatchRequest): Promise<{
    dispatchId: string;
    deliveries: DeliveryLogRecord[];
  }> {
    const dispatchId = `DISP-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const correlationId = `COMM-${req.templateCode}-${dispatchId}`;
    const priority = req.priority || 'NORMAL';
    const recipient = req.recipient;

    // Determine target channels
    const template = this.templates.get(req.templateCode);
    const allowedChannels: CommunicationChannel[] = template ? template.allowedChannels : ['PUSH', 'SMS'];
    let channelsToUse: CommunicationChannel[] = req.channels && req.channels.length > 0 ? req.channels : allowedChannels;

    // Filter to recipient preferred channel if specified and supported
    if (recipient.preferredChannel && channelsToUse.includes(recipient.preferredChannel)) {
      channelsToUse = [recipient.preferredChannel];
    }

    // Render localized message
    const rendered = this.renderTemplate(req.templateCode, recipient.locale || 'en-ZA', req.variables);

    const deliveries: DeliveryLogRecord[] = [];
    const now = new Date().toISOString();

    for (const channel of channelsToUse) {
      const deliveryId = `DELIV-${channel}-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
      let destination = '';

      if (channel === 'SMS') destination = recipient.phone || '+27825550192';
      else if (channel === 'EMAIL') destination = recipient.email || 'parent@example.co.za';
      else if (channel === 'PUSH') destination = recipient.pushToken || 'apns_token_default_9901';
      else if (channel === 'WHATSAPP') destination = recipient.whatsappNumber || recipient.phone || '+27825550192';

      const logRecord: DeliveryLogRecord = {
        deliveryId,
        dispatchId,
        recipientId: recipient.recipientId,
        templateCode: req.templateCode,
        channel,
        locale: recipient.locale || 'en-ZA',
        priority,
        status: 'SENDING',
        destination,
        subjectTitle: rendered.title,
        renderedBody: rendered.body,
        attemptCount: 1,
        maxAttempts: priority === 'CRITICAL' ? 5 : 3,
        createdAt: now,
        updatedAt: now
      };

      this.deliveryLogs.set(deliveryId, logRecord);

      // Channel execution
      const adapterResult = await this.executeChannelAdapter(channel, destination, rendered, priority);

      if (adapterResult.success) {
        logRecord.status = 'DELIVERED';
        logRecord.providerReference = adapterResult.providerReference;
        logRecord.sentAt = now;
        logRecord.deliveredAt = now;
        logRecord.updatedAt = now;
      } else {
        logRecord.status = adapterResult.shouldRetry ? 'RETRYING' : 'FAILED';
        logRecord.errorReason = adapterResult.errorReason;
        logRecord.updatedAt = now;

        if (adapterResult.shouldRetry) {
          // Add to Retry Queue with Exponential Backoff
          this.addToRetryQueue(logRecord, recipient, rendered);
        }
      }

      deliveries.push(logRecord);
    }

    AuditLogger.recordAudit({
      action: 'COMMUNICATION_DISPATCHED',
      resource: `/api/v1/communications/send`,
      correlationId,
      metadata: {
        templateCode: req.templateCode,
        recipientId: recipient.recipientId,
        locale: recipient.locale,
        channels: channelsToUse,
        priority,
        deliveriesCount: deliveries.length
      }
    });

    return { dispatchId, deliveries };
  }

  /**
   * Helper to execute specific channel adapter
   */
  private async executeChannelAdapter(
    channel: CommunicationChannel,
    destination: string,
    rendered: { title: string; body: string; htmlBody?: string; whatsappHsmTemplateName?: string },
    priority: NotificationPriority
  ): Promise<AdapterSendResult> {
    switch (channel) {
      case 'SMS':
        return await this.smsAdapter.sendSms(destination, rendered.body, priority);
      case 'EMAIL':
        return await this.emailAdapter.sendEmail(destination, rendered.title, rendered.body, rendered.htmlBody, priority);
      case 'PUSH':
        return await this.pushAdapter.sendPushNotification(destination, rendered.title, rendered.body, priority);
      case 'WHATSAPP':
        return await this.whatsappAdapter.sendWhatsAppMessage(
          destination,
          rendered.body,
          rendered.whatsappHsmTemplateName,
          priority
        );
      default:
        return { success: false, errorReason: `Unsupported channel ${channel}`, shouldRetry: false };
    }
  }

  /**
   * Add failed delivery item to Exponential Backoff Retry Queue
   */
  private addToRetryQueue(
    logRecord: DeliveryLogRecord,
    recipient: RecipientProfile,
    rendered: { title: string; body: string; htmlBody?: string }
  ) {
    const nextDelayMs = Math.pow(2, logRecord.attemptCount) * 1000; // 2s, 4s, 8s, 16s...
    const nextRetryAt = new Date(Date.now() + nextDelayMs).toISOString();

    const queueItem: RetryQueueItem = {
      deliveryId: logRecord.deliveryId,
      channel: logRecord.channel,
      recipient,
      destination: logRecord.destination,
      renderedTitle: rendered.title,
      renderedBody: rendered.body,
      htmlBody: rendered.htmlBody,
      attemptCount: logRecord.attemptCount,
      maxAttempts: logRecord.maxAttempts,
      nextRetryAt,
      lastError: logRecord.errorReason || 'Initial attempt failed',
      priority: logRecord.priority
    };

    this.retryQueue.set(logRecord.deliveryId, queueItem);

    AuditLogger.log(
      'WARN',
      `Delivery ${logRecord.deliveryId} queued for retry in ${nextDelayMs}ms (Attempt ${logRecord.attemptCount}/${logRecord.maxAttempts}).`
    );
  }

  /**
   * 2. Process Retry Queue with Exponential Backoff
   */
  public async processRetryQueue(): Promise<{ processedCount: number; succeededCount: number }> {
    const now = new Date();
    let processedCount = 0;
    let succeededCount = 0;

    for (const [deliveryId, queueItem] of this.retryQueue.entries()) {
      if (now >= new Date(queueItem.nextRetryAt)) {
        processedCount++;
        queueItem.attemptCount += 1;

        const logRecord = this.deliveryLogs.get(deliveryId);
        if (logRecord) {
          logRecord.attemptCount = queueItem.attemptCount;
          logRecord.updatedAt = now.toISOString();
        }

        const adapterResult = await this.executeChannelAdapter(
          queueItem.channel,
          queueItem.destination,
          { title: queueItem.renderedTitle, body: queueItem.renderedBody, htmlBody: queueItem.htmlBody },
          queueItem.priority
        );

        if (adapterResult.success) {
          succeededCount++;
          if (logRecord) {
            logRecord.status = 'DELIVERED';
            logRecord.providerReference = adapterResult.providerReference;
            logRecord.deliveredAt = now.toISOString();
          }
          this.retryQueue.delete(deliveryId);
          AuditLogger.log('INFO', `Retry succeeded for delivery ${deliveryId} on channel ${queueItem.channel}.`);
        } else {
          if (queueItem.attemptCount >= queueItem.maxAttempts) {
            if (logRecord) {
              logRecord.status = 'FAILED';
              logRecord.errorReason = `Max retry attempts (${queueItem.maxAttempts}) exhausted: ${adapterResult.errorReason}`;
            }
            this.retryQueue.delete(deliveryId);
            AuditLogger.log('ERROR', `Delivery ${deliveryId} permanently FAILED after ${queueItem.maxAttempts} attempts.`);
          } else {
            // Re-schedule
            const nextDelayMs = Math.pow(2, queueItem.attemptCount) * 1000;
            queueItem.nextRetryAt = new Date(Date.now() + nextDelayMs).toISOString();
            queueItem.lastError = adapterResult.errorReason || 'Retry failed';
            if (logRecord) {
              logRecord.status = 'RETRYING';
              logRecord.errorReason = adapterResult.errorReason;
            }
          }
        }
      }
    }

    return { processedCount, succeededCount };
  }

  /**
   * 3. Handle External Channel Delivery Receipts / Webhooks
   */
  public updateDeliveryReceipt(
    deliveryId: string,
    channel: CommunicationChannel,
    status: DeliveryStatus,
    providerRef?: string,
    errorReason?: string
  ): DeliveryLogRecord {
    let logRecord = this.deliveryLogs.get(deliveryId);

    if (!logRecord) {
      // Find by provider reference
      for (const item of this.deliveryLogs.values()) {
        if (item.providerReference === providerRef) {
          logRecord = item;
          break;
        }
      }
    }

    if (!logRecord) {
      throw new Error(`Delivery record not found for deliveryId '${deliveryId}' or providerRef '${providerRef}'`);
    }

    const now = new Date().toISOString();
    logRecord.status = status;
    if (providerRef) logRecord.providerReference = providerRef;
    if (errorReason) logRecord.errorReason = errorReason;
    if (status === 'DELIVERED') logRecord.deliveredAt = now;
    logRecord.updatedAt = now;

    AuditLogger.recordAudit({
      action: 'DELIVERY_RECEIPT_UPDATED',
      resource: `/api/v1/communications/delivery-callback`,
      correlationId: `RECEIPT-${deliveryId}`,
      metadata: { deliveryId, channel, status, providerRef }
    });

    return logRecord;
  }

  /**
   * Getters
   */
  public getTemplates(): CommunicationTemplate[] {
    return Array.from(this.templates.values());
  }

  public getTemplateByCode(code: string): CommunicationTemplate | undefined {
    return this.templates.get(code);
  }

  public getDeliveryLogs(recipientId?: string): DeliveryLogRecord[] {
    const logs = Array.from(this.deliveryLogs.values());
    if (recipientId) {
      return logs.filter((l) => l.recipientId === recipientId);
    }
    return logs;
  }

  public getRetryQueue(): RetryQueueItem[] {
    return Array.from(this.retryQueue.values());
  }
}
