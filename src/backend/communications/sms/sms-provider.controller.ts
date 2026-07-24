// ITIS SMS Provider REST Controller
// Endpoints for Multi-Provider Management (BulkSMS, Vodacom Enterprise, Twilio, Infobip),
// Template SMS (OTP, Emergency SOS, Attendance, Low Battery, Incident Alerts), DLR Webhooks, Retry Queue & STOP Opt-Outs

import { Request, Response, Router } from 'express';
import { SmsDeliveryTracker } from './sms-delivery.tracker';
import { SmsProviderFactory } from './sms-provider.factory';
import { SmsTemplateEngine } from './sms-template.engine';
import { SmsCategoryType, SmsDeliveryStatus, SmsProviderType } from './sms.types';

export const smsProviderRouter = Router();

const providerFactory = SmsProviderFactory.getInstance();
const deliveryTracker = SmsDeliveryTracker.getInstance();
const templateEngine = SmsTemplateEngine.getInstance();

/**
 * 1. CHECK HEALTH OF ALL SMS PROVIDERS
 * GET /api/v1/communications/sms/health
 */
smsProviderRouter.get('/health', async (req: Request, res: Response) => {
  try {
    const healthMap = await providerFactory.healthCheckAll();
    return res.json({
      success: true,
      primaryProvider: providerFactory.getPrimaryProviderType(),
      providers: healthMap
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'HEALTH_CHECK_FAILED', message: err.message });
  }
});

/**
 * 2. DISPATCH SMS (OTP, EMERGENCY, ATTENDANCE, LOW BATTERY, INCIDENT ALERTS)
 * POST /api/v1/communications/sms/send
 */
smsProviderRouter.post('/send', async (req: Request, res: Response) => {
  try {
    const { phoneNumber, message, category, variables, providerType, priority } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_PHONE',
        message: 'Recipient phoneNumber is required.'
      });
    }

    const result = await providerFactory.dispatchSms(
      {
        phoneNumber,
        message,
        category: category as SmsCategoryType,
        variables,
        priority: priority || 'NORMAL'
      },
      providerType as SmsProviderType
    );

    return res.status(result.success ? 200 : 400).json({
      success: result.success,
      providerReference: result.providerReference,
      usedProviderType: result.usedProviderType,
      partsCount: result.partsCount,
      errorReason: result.errorReason,
      metadata: result.metadata
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DISPATCH_EXCEPTION', message: err.message });
  }
});

/**
 * 3. PREVIEW COMPILED SMS TEMPLATE & CHARACTER COUNT
 * POST /api/v1/communications/sms/template-preview
 */
smsProviderRouter.post('/template-preview', (req: Request, res: Response) => {
  try {
    const { category, variables } = req.body;
    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_CATEGORY',
        message: 'Required: category (OTP, EMERGENCY_SMS, ATTENDANCE_NOTIFICATION, LOW_BATTERY, INCIDENT_ALERT, GENERIC)'
      });
    }

    const compiled = templateEngine.compileTemplate(
      category as SmsCategoryType,
      variables || {}
    );

    return res.json({
      success: true,
      category,
      message: compiled.message,
      characterCount: compiled.message.length,
      partsCount: compiled.partsCount,
      encoding: 'GSM-7'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'PREVIEW_FAILED', message: err.message });
  }
});

/**
 * 4. CONFIGURE PRIMARY PROVIDER & CREDENTIALS
 * POST /api/v1/communications/sms/configure
 */
smsProviderRouter.post('/configure', (req: Request, res: Response) => {
  try {
    const { primaryProvider, providerConfig } = req.body;

    if (primaryProvider) {
      providerFactory.setPrimaryProvider(primaryProvider as SmsProviderType);
    }

    if (providerConfig && providerConfig.type) {
      providerFactory.configureProvider(providerConfig.type, providerConfig.config);
    }

    return res.json({
      success: true,
      message: `SMS provider routing updated. Primary provider: ${providerFactory.getPrimaryProviderType()}`
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: 'CONFIGURATION_FAILED', message: err.message });
  }
});

/**
 * 5. GET DELIVERY REPORTS (DLR)
 * GET /api/v1/communications/sms/delivery-reports
 */
smsProviderRouter.get('/delivery-reports', (req: Request, res: Response) => {
  const { phone } = req.query;
  const reports = phone
    ? deliveryTracker.getDlrsForPhone(phone as string)
    : deliveryTracker.getAllDlrs();

  return res.json({
    success: true,
    count: reports.length,
    deliveryReports: reports
  });
});

/**
 * 6. RETRY QUEUE STATUS & MANUAL TRIGGER
 * GET /api/v1/communications/sms/retry-queue
 */
smsProviderRouter.get('/retry-queue', (req: Request, res: Response) => {
  const retryItems = deliveryTracker.getRetryQueueItems();
  return res.json({
    success: true,
    pendingCount: retryItems.length,
    retryQueue: retryItems
  });
});

/**
 * POST /api/v1/communications/sms/retry-queue/process
 */
smsProviderRouter.post('/retry-queue/process', async (req: Request, res: Response) => {
  try {
    const result = await providerFactory.processRetryQueue();
    return res.json({
      success: true,
      processedCount: result.processedCount,
      succeededCount: result.succeededCount,
      message: `Processed ${result.processedCount} retry queue items; ${result.succeededCount} succeeded.`
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'RETRY_PROCESS_FAILED', message: err.message });
  }
});

/**
 * 7. GET & MANAGE STOP / OPT-OUT PHONE LIST
 * GET /api/v1/communications/sms/opt-out
 */
smsProviderRouter.get('/opt-out', (req: Request, res: Response) => {
  const optOutList = deliveryTracker.getOptOutList();
  return res.json({
    success: true,
    count: optOutList.length,
    optOutNumbers: optOutList
  });
});

/**
 * POST /api/v1/communications/sms/opt-out
 */
smsProviderRouter.post('/opt-out', (req: Request, res: Response) => {
  const { phoneNumber, action } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'phoneNumber required.' });
  }

  if (action === 'REMOVE') {
    deliveryTracker.removeOptOut(phoneNumber);
    return res.json({ success: true, message: `Phone '${phoneNumber}' removed from SMS STOP list.` });
  } else {
    deliveryTracker.addOptOut(phoneNumber);
    return res.json({ success: true, message: `Phone '${phoneNumber}' added to SMS STOP list.` });
  }
});

/**
 * 8. DLR WEBHOOK CALLBACK HANDLERS
 * POST /api/v1/communications/sms/webhooks/:provider
 */
smsProviderRouter.post('/webhooks/:provider', (req: Request, res: Response) => {
  const provider = (req.params.provider || '').toUpperCase() as SmsProviderType;
  const payload = req.body;

  let dispatchId = payload.dispatchId || payload.MessageSid || payload.bulkId || `DLR-${Date.now()}`;
  let phoneNumber = payload.phoneNumber || payload.To || payload.destination || '0821234567';
  let rawStatus = payload.status || payload.SmsStatus || payload.deliveryStatus || 'DELIVERED';

  let mappedStatus: SmsDeliveryStatus = 'DELIVERED';
  if (['FAILED', 'UNDELIVERED', 'rejected', 'failed'].includes(String(rawStatus).toLowerCase())) {
    mappedStatus = 'FAILED';
  } else if (['expired'].includes(String(rawStatus).toLowerCase())) {
    mappedStatus = 'EXPIRED';
  }

  // Record DLR event
  deliveryTracker.recordDlr(
    dispatchId,
    phoneNumber,
    provider || 'BULKSMS',
    payload.providerRef || dispatchId,
    mappedStatus,
    payload.partsCount || 1,
    payload.errorCode,
    payload.errorMessage
  );

  return res.status(200).send('OK');
});
