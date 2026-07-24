// ITIS Enterprise Communications Engine Controller (Prompt 075)
// REST endpoints for Multi-Channel Dispatch, Delivery Callbacks, Template Rendering, Localization, and Retry Queues

import { Request, Response, Router } from 'express';
import { CommunicationsService } from './communications.service';
import { CommunicationChannel, DeliveryStatus, DispatchRequest, SupportedLocale } from './communications.types';

export const communicationsRouter = Router();
const commsService = CommunicationsService.getInstance();

/**
 * 1. DISPATCH MULTI-CHANNEL COMMUNICATION
 * POST /api/v1/communications/send
 */
communicationsRouter.post('/send', async (req: Request, res: Response) => {
  try {
    const { templateCode, recipient, channels, variables, priority } = req.body;

    if (!templateCode || !recipient || !recipient.recipientId || !variables) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_REQUIRED_FIELDS',
        message: 'Required parameters: templateCode, recipient (recipientId, locale), variables'
      });
    }

    const dispatchReq: DispatchRequest = {
      templateCode,
      recipient: {
        recipientId: recipient.recipientId,
        name: recipient.name || 'Valued User',
        email: recipient.email,
        phone: recipient.phone,
        whatsappNumber: recipient.whatsappNumber,
        pushToken: recipient.pushToken,
        preferredChannel: recipient.preferredChannel as CommunicationChannel,
        locale: (recipient.locale as SupportedLocale) || 'en-ZA',
        quietHoursEnabled: Boolean(recipient.quietHoursEnabled)
      },
      channels: channels as CommunicationChannel[],
      variables,
      priority: priority || 'NORMAL'
    };

    const result = await commsService.sendNotification(dispatchReq);

    return res.status(201).json({
      success: true,
      message: `Notification dispatched successfully across ${result.deliveries.length} channel(s).`,
      data: result
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'DISPATCH_FAILED',
      message: err.message
    });
  }
});

/**
 * 2. CHANNEL DELIVERY RECEIPT / WEBHOOK CALLBACK
 * POST /api/v1/communications/delivery-callback
 */
communicationsRouter.post('/delivery-callback', (req: Request, res: Response) => {
  try {
    const { deliveryId, channel, status, providerReference, errorReason } = req.body;

    if (!channel || !status) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_CALLBACK_PAYLOAD',
        message: 'Required: channel, status (DELIVERED, FAILED, BOUNCED)'
      });
    }

    const updatedLog = commsService.updateDeliveryReceipt(
      deliveryId,
      channel as CommunicationChannel,
      status as DeliveryStatus,
      providerReference,
      errorReason
    );

    return res.json({
      success: true,
      message: 'Delivery receipt recorded.',
      deliveryLog: updatedLog
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'DELIVERY_CALLBACK_FAILED',
      message: err.message
    });
  }
});

/**
 * 3. GET ALL COMMUNICATION TEMPLATES & LOCALIZATIONS
 * GET /api/v1/communications/templates
 */
communicationsRouter.get('/templates', (req: Request, res: Response) => {
  const templates = commsService.getTemplates();
  return res.json({
    success: true,
    count: templates.length,
    templates
  });
});

/**
 * 4. PREVIEW / RENDER TEMPLATE WITH LOCALIZATION & VARIABLES
 * POST /api/v1/communications/templates/render
 */
communicationsRouter.post('/templates/render', (req: Request, res: Response) => {
  try {
    const { templateCode, locale, variables } = req.body;

    if (!templateCode || !variables) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_RENDER_PARMS',
        message: 'Required: templateCode, variables'
      });
    }

    const rendered = commsService.renderTemplate(templateCode, (locale as SupportedLocale) || 'en-ZA', variables);

    return res.json({
      success: true,
      templateCode,
      locale: locale || 'en-ZA',
      rendered
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'RENDER_FAILED',
      message: err.message
    });
  }
});

/**
 * 5. GET DELIVERY TRACKING LOGS
 * GET /api/v1/communications/delivery-logs/:recipientId?
 */
communicationsRouter.get('/delivery-logs/:recipientId?', (req: Request, res: Response) => {
  const logs = commsService.getDeliveryLogs(req.params.recipientId);
  return res.json({
    success: true,
    count: logs.length,
    deliveryLogs: logs
  });
});

/**
 * 6. GET RETRY QUEUE STATUS
 * GET /api/v1/communications/retry-queue
 */
communicationsRouter.get('/retry-queue', (req: Request, res: Response) => {
  const queue = commsService.getRetryQueue();
  return res.json({
    success: true,
    count: queue.length,
    retryQueue: queue
  });
});

/**
 * 7. PROCESS RETRY QUEUE MANUALLY
 * POST /api/v1/communications/process-retries
 */
communicationsRouter.post('/process-retries', async (req: Request, res: Response) => {
  try {
    const summary = await commsService.processRetryQueue();
    return res.json({
      success: true,
      message: 'Retry queue processing run completed.',
      summary
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'RETRY_PROCESSING_FAILED',
      message: err.message
    });
  }
});
