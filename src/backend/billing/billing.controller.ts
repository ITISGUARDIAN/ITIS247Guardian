// ITIS Production Billing & Subscription Controller (Prompt 072)
// REST API routes for managing Parent, School, Government, and Fleet subscriptions, invoices, VAT calculations, and suspensions

import { Request, Response, Router } from 'express';
import { BillingService } from './billing.service';
import { AccountType, BillingCycle, SubscriptionCreateRequest } from './billing.types';

export const billingRouter = Router();
const billingService = BillingService.getInstance();

/**
 * 1. CREATE SUBSCRIPTION
 * POST /api/v1/billing/subscriptions
 */
billingRouter.post('/subscriptions', async (req: Request, res: Response) => {
  try {
    const {
      accountId,
      accountType,
      accountName,
      contactEmail,
      contactPhone,
      taxRegistrationNumber,
      address,
      province,
      tierName,
      billingCycle,
      quantity,
      autoRenew,
      isTrial,
      trialDays
    } = req.body;

    if (!accountType || !['PARENT', 'SCHOOL', 'GOVERNMENT_CONTRACT', 'FLEET'].includes(accountType)) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_ACCOUNT_TYPE',
        message: 'Valid accountTypes: PARENT, SCHOOL, GOVERNMENT_CONTRACT, FLEET'
      });
    }

    if (!accountName || !contactEmail || !tierName || !billingCycle) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_REQUIRED_FIELDS',
        message: 'Required fields: accountName, contactEmail, tierName, billingCycle'
      });
    }

    const createReq: SubscriptionCreateRequest = {
      accountId,
      accountType: accountType as AccountType,
      accountName,
      contactEmail,
      contactPhone,
      taxRegistrationNumber,
      address,
      province,
      tierName,
      billingCycle: billingCycle as BillingCycle,
      quantity: quantity ? parseInt(quantity, 10) : 1,
      autoRenew: autoRenew !== undefined ? Boolean(autoRenew) : true,
      isTrial: Boolean(isTrial),
      trialDays: trialDays ? parseInt(trialDays, 10) : 14
    };

    const result = await billingService.createSubscription(createReq);

    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'SUBSCRIPTION_CREATION_FAILED',
      message: err.message
    });
  }
});

/**
 * 2. GET ALL SUBSCRIPTIONS
 * GET /api/v1/billing/subscriptions
 */
billingRouter.get('/subscriptions', (req: Request, res: Response) => {
  const subscriptions = billingService.getAllSubscriptions();
  return res.json({
    success: true,
    count: subscriptions.length,
    subscriptions
  });
});

/**
 * 3. GET SINGLE SUBSCRIPTION
 * GET /api/v1/billing/subscriptions/:id
 */
billingRouter.get('/subscriptions/:id', (req: Request, res: Response) => {
  const sub = billingService.getSubscription(req.params.id);
  if (!sub) {
    return res.status(404).json({ success: false, error: 'SUBSCRIPTION_NOT_FOUND' });
  }
  const account = billingService.getAccount(sub.accountId);
  const invoices = billingService.getInvoicesForAccount(sub.accountId);

  return res.json({
    success: true,
    subscription: sub,
    account,
    invoices
  });
});

/**
 * 4. TRIGGER PAYMENT FAILURE & SUSPENSION TEST
 * POST /api/v1/billing/subscriptions/:id/trigger-failure
 */
billingRouter.post('/subscriptions/:id/trigger-failure', async (req: Request, res: Response) => {
  try {
    const { reason } = req.body;
    const failureReason = reason || 'Insufficient funds / Debit order rejected by SA banking rail';

    const result = await billingService.handlePaymentFailure(req.params.id, failureReason);

    return res.json({
      success: true,
      message: `Payment failure recorded. Status transitioned to ${result.statusChangedTo}.`,
      data: result
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'PAYMENT_FAILURE_PROCESSING_ERROR',
      message: err.message
    });
  }
});

/**
 * 5. PROCESS AUTOMATIC RENEWALS
 * POST /api/v1/billing/process-renewals
 */
billingRouter.post('/process-renewals', async (req: Request, res: Response) => {
  try {
    const summary = await billingService.processAutomaticRenewals();
    return res.json({
      success: true,
      message: 'Automatic subscription renewal run completed.',
      summary
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'RENEWAL_PROCESSING_ERROR',
      message: err.message
    });
  }
});

/**
 * 6. GET ALL INVOICES
 * GET /api/v1/billing/invoices
 */
billingRouter.get('/invoices', (req: Request, res: Response) => {
  const invoices = billingService.getAllInvoices();
  return res.json({
    success: true,
    count: invoices.length,
    invoices
  });
});

/**
 * 7. GET INVOICE BY ID
 * GET /api/v1/billing/invoices/:id
 */
billingRouter.get('/invoices/:id', (req: Request, res: Response) => {
  const invoice = billingService.getInvoice(req.params.id);
  if (!invoice) {
    return res.status(404).json({ success: false, error: 'INVOICE_NOT_FOUND' });
  }
  return res.json({
    success: true,
    invoice
  });
});

/**
 * 8. PAY INVOICE & REACTIVATE ACCOUNT
 * POST /api/v1/billing/invoices/:id/pay
 */
billingRouter.post('/invoices/:id/pay', async (req: Request, res: Response) => {
  try {
    const { paymentMethod, paymentReference } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_PAYMENT_METHOD',
        message: 'Supported methods: PAYFAST, OZOW, PEACH_PAYMENTS, EFT_TREASURY, DEBIT_ORDER'
      });
    }

    const ref = paymentReference || `SETTLE-${Date.now()}`;
    const result = await billingService.payInvoice(req.params.id, paymentMethod, ref);

    return res.json({
      success: true,
      message: 'Invoice paid successfully. Account & subscription reactivated.',
      data: result
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'INVOICE_PAYMENT_FAILED',
      message: err.message
    });
  }
});

/**
 * 9. CALCULATE SA VAT BREAKDOWN UTILITY
 * POST /api/v1/billing/vat-calculator
 */
billingRouter.post('/vat-calculator', (req: Request, res: Response) => {
  const { amountExclVat } = req.body;
  if (amountExclVat === undefined || isNaN(Number(amountExclVat))) {
    return res.status(400).json({ success: false, error: 'INVALID_AMOUNT' });
  }

  const breakdown = billingService.calculateVatBreakdown(Number(amountExclVat));
  return res.json({
    success: true,
    breakdown
  });
});

/**
 * 10. GET SUSPENSION POLICY
 * GET /api/v1/billing/suspension-policy
 */
billingRouter.get('/suspension-policy', (req: Request, res: Response) => {
  const policy = billingService.getSuspensionPolicy();
  return res.json({
    success: true,
    policy
  });
});
