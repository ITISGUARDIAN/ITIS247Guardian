// ITIS Email Provider REST Controller
// Endpoints for Multi-Provider Management (M365, Google Workspace, SMTP, Mailgun),
// Template Email Generation (Password Reset, OTP, Emergency SOS), Open/Click Tracking Pixels, and Webhooks

import { Request, Response, Router } from 'express';
import { EmailDeliveryTracker } from './email-delivery.tracker';
import { EmailProviderFactory } from './email-provider.factory';
import { EmailTemplateEngine } from './email-template.engine';
import { EmailProviderType, EmailTemplateType } from './email.types';

export const emailProviderRouter = Router();

const providerFactory = EmailProviderFactory.getInstance();
const deliveryTracker = EmailDeliveryTracker.getInstance();
const templateEngine = EmailTemplateEngine.getInstance();

// 1x1 Transparent GIF Image Buffer for Open Tracking
const TRANSPARENT_GIF_BUFFER = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

/**
 * 1. CHECK HEALTH OF ALL EMAIL PROVIDERS
 * GET /api/v1/communications/email/health
 */
emailProviderRouter.get('/health', async (req: Request, res: Response) => {
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
 * 2. DISPATCH EMAIL USING PROVIDER STRATEGY & TEMPLATES
 * POST /api/v1/communications/email/send
 */
emailProviderRouter.post('/send', async (req: Request, res: Response) => {
  try {
    const { to, subject, textBody, htmlBody, templateType, templateVariables, providerType, priority } = req.body;

    if (!to) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_RECIPIENT',
        message: 'Recipient address "to" is required.'
      });
    }

    const result = await providerFactory.dispatchEmail(
      {
        to,
        subject: subject || '',
        textBody: textBody || '',
        htmlBody,
        templateType: templateType as EmailTemplateType,
        templateVariables,
        priority: priority || 'NORMAL',
        trackOpens: true,
        trackClicks: true
      },
      providerType as EmailProviderType
    );

    return res.status(result.success ? 200 : 400).json({
      success: result.success,
      providerReference: result.providerReference,
      usedProviderType: result.usedProviderType,
      errorReason: result.errorReason,
      metadata: result.metadata
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DISPATCH_EXCEPTION', message: err.message });
  }
});

/**
 * 3. PREVIEW COMPILED EMAIL TEMPLATES
 * POST /api/v1/communications/email/template-preview
 */
emailProviderRouter.post('/template-preview', (req: Request, res: Response) => {
  try {
    const { templateType, templateVariables } = req.body;
    if (!templateType) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_TEMPLATE_TYPE',
        message: 'Required: templateType (PASSWORD_RESET, OTP_VERIFICATION, EMERGENCY_NOTIFICATION, INVOICE_SETTLEMENT, GENERIC_TRANSACTIONAL)'
      });
    }

    const compiled = templateEngine.compileTemplate(
      templateType as EmailTemplateType,
      templateVariables || {}
    );

    return res.json({
      success: true,
      templateType,
      subject: compiled.subject,
      htmlBody: compiled.htmlBody,
      textBody: compiled.textBody
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'PREVIEW_FAILED', message: err.message });
  }
});

/**
 * 4. CONFIGURE PRIMARY PROVIDER & CREDENTIALS
 * POST /api/v1/communications/email/configure
 */
emailProviderRouter.post('/configure', (req: Request, res: Response) => {
  try {
    const { primaryProvider, providerConfig } = req.body;

    if (primaryProvider) {
      providerFactory.setPrimaryProvider(primaryProvider as EmailProviderType);
    }

    if (providerConfig && providerConfig.type) {
      providerFactory.configureProvider(providerConfig.type, providerConfig.config);
    }

    return res.json({
      success: true,
      message: `Email provider system updated. Primary provider: ${providerFactory.getPrimaryProviderType()}`
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: 'CONFIGURATION_FAILED', message: err.message });
  }
});

/**
 * 5. OPEN TRACKING PIXEL CALLBACK
 * GET /api/v1/communications/email/track/open/:deliveryId
 */
emailProviderRouter.get('/track/open/:deliveryId', (req: Request, res: Response) => {
  const deliveryId = req.params.deliveryId;
  const ipAddress = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  deliveryTracker.recordEvent(
    deliveryId,
    'tracked_user@itis.gov.za',
    'OPENED',
    providerFactory.getPrimaryProviderType(),
    'PIXEL_TRACK',
    { ipAddress, userAgent }
  );

  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  return res.send(TRANSPARENT_GIF_BUFFER);
});

/**
 * 6. CLICK TRACKING PROXY REDIRECT
 * GET /api/v1/communications/email/track/click/:deliveryId
 */
emailProviderRouter.get('/track/click/:deliveryId', (req: Request, res: Response) => {
  const deliveryId = req.params.deliveryId;
  const redirectUrl = req.query.url as string;
  const ipAddress = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  deliveryTracker.recordEvent(
    deliveryId,
    'tracked_user@itis.gov.za',
    'CLICKED',
    providerFactory.getPrimaryProviderType(),
    'CLICK_TRACK',
    { ipAddress, userAgent, clickUrl: redirectUrl }
  );

  if (redirectUrl && redirectUrl.startsWith('http')) {
    return res.redirect(redirectUrl);
  } else {
    return res.redirect('https://itis.gov.za');
  }
});

/**
 * 7. GET TRACKING EVENT AUDIT TRAIL
 * GET /api/v1/communications/email/tracking-events
 */
emailProviderRouter.get('/tracking-events', (req: Request, res: Response) => {
  const events = deliveryTracker.getAllTrackingEvents();
  return res.json({
    success: true,
    count: events.length,
    events
  });
});

/**
 * 8. GET & MANAGE SUPPRESSION LIST
 * GET /api/v1/communications/email/suppression-list
 */
emailProviderRouter.get('/suppression-list', (req: Request, res: Response) => {
  const suppressionList = deliveryTracker.getSuppressionList();
  return res.json({
    success: true,
    count: suppressionList.length,
    suppressionList
  });
});

/**
 * POST /api/v1/communications/email/suppression-list
 */
emailProviderRouter.post('/suppression-list', (req: Request, res: Response) => {
  const { email, reason, action } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email parameter required.' });
  }

  if (action === 'REMOVE') {
    deliveryTracker.removeFromSuppressionList(email);
    return res.json({ success: true, message: `Email '${email}' removed from suppression list.` });
  } else {
    deliveryTracker.addToSuppressionList(email, reason || 'MANUAL_UNSUBSCRIBE');
    return res.json({ success: true, message: `Email '${email}' added to suppression list.` });
  }
});

/**
 * 9. MAILGUN WEBHOOK CALLBACK
 * POST /api/v1/communications/email/webhooks/mailgun
 */
emailProviderRouter.post('/webhooks/mailgun', (req: Request, res: Response) => {
  const eventData = req.body['event-data'] || req.body;
  const eventType = eventData.event; // delivered, opened, clicked, bounced, complained
  const recipient = eventData.recipient || eventData.message?.headers?.to;
  const messageId = eventData.message?.headers?.['message-id'] || 'MG-WH-UNKNOWN';

  if (eventType === 'bounced' || eventType === 'complained') {
    deliveryTracker.recordEvent(
      `DELIV-MG-${Date.now()}`,
      recipient || 'bounced@example.com',
      eventType === 'bounced' ? 'BOUNCED' : 'SPAM_COMPLAINT',
      'MAILGUN',
      messageId,
      { bounceReason: eventData['delivery-status']?.description || 'Mailgun Bounce Event' }
    );
  } else if (eventType === 'opened' || eventType === 'clicked') {
    deliveryTracker.recordEvent(
      `DELIV-MG-${Date.now()}`,
      recipient || 'user@example.com',
      eventType === 'opened' ? 'OPENED' : 'CLICKED',
      'MAILGUN',
      messageId
    );
  }

  return res.status(200).send('OK');
});
