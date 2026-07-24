// ITIS Production Payment Gateway Controller (Prompt 071)
// REST API endpoints for initializing payments, processing webhooks, auditing transactions, and checking gateway health

import { Router, Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { PaymentWebhookService } from './webhook.service';
import { PaymentProvider, PaymentRequest } from './payment.types';
import { PaymentGatewayFactory } from './payment.factory';

export const paymentRouter = Router();
const paymentService = PaymentService.getInstance();
const webhookService = PaymentWebhookService.getInstance();

/**
 * 1. INITIALIZE PAYMENT
 * POST /api/v1/payments/initialize
 */
paymentRouter.post('/initialize', async (req: Request, res: Response) => {
  try {
    const { provider, request }: { provider: PaymentProvider; request: PaymentRequest } = req.body;

    if (!provider || !['PAYFAST', 'OZOW', 'PEACH_PAYMENTS'].includes(provider)) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_PROVIDER',
        message: 'Supported providers: PAYFAST, OZOW, PEACH_PAYMENTS'
      });
    }

    if (!request || !request.transactionId || !request.amount || !request.customer?.email) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_REQUEST_PAYLOAD',
        message: 'Missing required parameters: transactionId, amount, customer.email'
      });
    }

    const result = await paymentService.processPayment(provider, request);

    return res.json({
      success: result.success,
      data: result
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'PAYMENT_INITIALIZATION_ERROR',
      message: err.message || 'An unexpected error occurred during payment initialization.'
    });
  }
});

/**
 * 2. SECURE WEBHOOK / IPN CALLBACK VERIFICATION (PAYFAST, OZOW, PEACH)
 * POST /api/v1/payments/webhook/:provider
 */
paymentRouter.post('/webhook/:provider', async (req: Request, res: Response) => {
  try {
    const providerParam = (req.params.provider || '').toUpperCase() as PaymentProvider;

    if (!['PAYFAST', 'OZOW', 'PEACH_PAYMENTS'].includes(providerParam)) {
      return res.status(400).send('Invalid gateway provider');
    }

    const verificationResult = await paymentService.handleWebhook(providerParam, {
      payload: req.body || {},
      headers: req.headers,
      rawBody: typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
    });

    if (!verificationResult.isValid || !verificationResult.signatureVerified) {
      return res.status(400).json({
        status: 'FAILED',
        reason: verificationResult.errorMessage || 'Webhook signature verification failed'
      });
    }

    // Set idempotency response headers for auditability
    if (verificationResult.isDuplicate) {
      res.setHeader('X-Webhook-Duplicate', 'true');
      res.setHeader('X-Webhook-Idempotency-Key', verificationResult.idempotencyKey || '');
    }

    // Standard HTTP 200 response format expected by payment processors (PayFast/Ozow/Peach)
    return res.status(200).send('OK');
  } catch (err: any) {
    return res.status(500).send(`Webhook Exception: ${err.message}`);
  }
});

/**
 * 3. GET WEBHOOK IDEMPOTENCY LEDGER & DUPLICATE LOGS
 * GET /api/v1/payments/webhooks/idempotency-ledger
 */
paymentRouter.get('/webhooks/idempotency-ledger', (req: Request, res: Response) => {
  const ledger = webhookService.getIdempotencyLedger();
  const failedQueueLength = webhookService.getFailedWebhookQueueLength();

  return res.json({
    success: true,
    count: ledger.length,
    failedQueueLength,
    idempotencyLedger: ledger
  });
});

/**
 * 4. RETRY QUEUED FAILED WEBHOOKS
 * POST /api/v1/payments/webhooks/retry-queue
 */
paymentRouter.post('/webhooks/retry-queue', async (req: Request, res: Response) => {
  try {
    const summary = await webhookService.retryFailedWebhooks();
    return res.json({
      success: true,
      message: 'Failed webhook retry engine executed.',
      summary
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'WEBHOOK_RETRY_FAILED',
      message: err.message
    });
  }
});

/**
 * 3. QUERY TRANSACTION STATUS
 * GET /api/v1/payments/status/:provider/:transactionId
 */
paymentRouter.get('/status/:provider/:transactionId', async (req: Request, res: Response) => {
  try {
    const provider = req.params.provider.toUpperCase() as PaymentProvider;
    const transactionId = req.params.transactionId;
    const providerRef = req.query.providerRef as string;

    if (!['PAYFAST', 'OZOW', 'PEACH_PAYMENTS'].includes(provider)) {
      return res.status(400).json({ error: 'INVALID_PROVIDER' });
    }

    const result = await paymentService.verifyTransactionStatus(provider, transactionId, providerRef);
    return res.json({
      success: true,
      data: result
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'STATUS_QUERY_ERROR',
      message: err.message
    });
  }
});

/**
 * 4. GET TRANSACTION AUDIT TRAIL LOGS
 * GET /api/v1/payments/audit-logs
 */
paymentRouter.get('/audit-logs', (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;
  const logs = paymentService.getAuditTrail(limit);

  return res.json({
    success: true,
    count: logs.length,
    auditTrail: logs
  });
});

/**
 * 5. GET GATEWAYS STATUS & HEALTH
 * GET /api/v1/payments/gateways
 */
paymentRouter.get('/gateways', (req: Request, res: Response) => {
  const gateways = PaymentGatewayFactory.getAllGateways();
  const list = Array.from(gateways.entries()).map(([provider, gateway]) => ({
    provider,
    status: 'ONLINE',
    slaTargetMs: 8000,
    supportedMethods: provider === 'OZOW' ? ['Instant EFT'] : provider === 'PAYFAST' ? ['Credit Card', 'Masterpass', 'Debit', 'Mobicred'] : ['Visa', 'Mastercard', 'Apple Pay', 'EFT'],
    currency: 'ZAR',
    sandboxMode: true
  }));

  return res.json({
    success: true,
    gateways: list
  });
});
