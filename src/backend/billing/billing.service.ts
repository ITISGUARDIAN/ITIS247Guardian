// ITIS Production Billing Service Architecture (Prompt 072)
// Comprehensive Billing Engine for Multi-Tenant Subscriptions (Parent, School, Government Contracts, Fleet)

import { AuditLogger } from '../common/audit.logger';
import { PaymentService } from '../payment/payment.service';
import {
  AccountType,
  BillingAccount,
  BillingCycle,
  Invoice,
  InvoiceLineItem,
  InvoiceStatus,
  SA_VAT_RATE,
  Subscription,
  SubscriptionCreateRequest,
  SubscriptionStatus,
  SuspensionPolicyConfig
} from './billing.types';

export class BillingService {
  private static instance: BillingService;

  private accounts: Map<string, BillingAccount> = new Map();
  private subscriptions: Map<string, Subscription> = new Map();
  private invoices: Map<string, Invoice> = new Map();
  private invoiceCounter = 1000;

  private suspensionPolicy: SuspensionPolicyConfig = {
    maxFailedAttemptsBeforeGracePeriod: 1,
    gracePeriodDays: 7,
    maxGracePeriodDaysBeforeSuspension: 7,
    autoSuspendEmergencyService: false, // Maintain SOS alerts in suspended state for child safety
    notifyAdminOnSuspension: true,
    allowEmergencySOSInSuspendedState: true
  };

  private constructor() {
    this.seedInitialBillingData();
  }

  public static getInstance(): BillingService {
    if (!BillingService.instance) {
      BillingService.instance = new BillingService();
    }
    return BillingService.instance;
  }

  /**
   * Seed realistic South African production billing accounts & contracts
   */
  private seedInitialBillingData() {
    // 1. Parent Subscription
    const parentAccount: BillingAccount = {
      accountId: 'ACC-PARENT-001',
      accountType: 'PARENT',
      accountName: 'Sipho Ndlovu (Parent)',
      contactEmail: 'sipho.ndlovu@example.co.za',
      contactPhone: '+27825550192',
      province: 'GAUTENG',
      currency: 'ZAR',
      isSuspended: false,
      createdAt: '2026-01-10T08:00:00Z',
      updatedAt: '2026-01-10T08:00:00Z'
    };
    this.accounts.set(parentAccount.accountId, parentAccount);

    const parentSub: Subscription = {
      subscriptionId: 'SUB-PAR-8801',
      accountId: parentAccount.accountId,
      accountType: 'PARENT',
      tierName: 'Parent Guardian Wearable Protection Plan',
      billingCycle: 'MONTHLY',
      status: 'ACTIVE',
      unitPriceExclVat: 129.57, // R129.57 + 15% VAT = R149.00
      quantity: 1,
      autoRenew: true,
      currentPeriodStart: '2026-07-01T00:00:00Z',
      currentPeriodEnd: '2026-08-01T00:00:00Z',
      failedPaymentCount: 0,
      createdAt: '2026-01-10T08:00:00Z',
      updatedAt: '2026-07-01T00:00:00Z'
    };
    this.subscriptions.set(parentSub.subscriptionId, parentSub);

    // 2. School Bulk Subscription
    const schoolAccount: BillingAccount = {
      accountId: 'ACC-SCH-042',
      accountType: 'SCHOOL',
      accountName: 'Soweto Central Primary School (EMIS: 700120042)',
      contactEmail: 'principal@sowetoprimary.edu.za',
      contactPhone: '+27119820011',
      taxRegistrationNumber: '4920192831',
      province: 'GAUTENG',
      currency: 'ZAR',
      isSuspended: false,
      createdAt: '2026-02-01T08:00:00Z',
      updatedAt: '2026-02-01T08:00:00Z'
    };
    this.accounts.set(schoolAccount.accountId, schoolAccount);

    const schoolSub: Subscription = {
      subscriptionId: 'SUB-SCH-9021',
      accountId: schoolAccount.accountId,
      accountType: 'SCHOOL',
      tierName: 'School Safety Campus Package (250 Learners)',
      billingCycle: 'QUARTERLY',
      status: 'ACTIVE',
      unitPriceExclVat: 10869.57, // R10,869.57 + 15% VAT = R12,500.00 / quarter
      quantity: 1,
      autoRenew: true,
      currentPeriodStart: '2026-07-01T00:00:00Z',
      currentPeriodEnd: '2026-10-01T00:00:00Z',
      failedPaymentCount: 0,
      createdAt: '2026-02-01T08:00:00Z',
      updatedAt: '2026-07-01T00:00:00Z'
    };
    this.subscriptions.set(schoolSub.subscriptionId, schoolSub);

    // 3. Government Provincial DoE Contract
    const govtAccount: BillingAccount = {
      accountId: 'ACC-GOVT-GP',
      accountType: 'GOVERNMENT_CONTRACT',
      accountName: 'Gauteng Department of Education (DoE Tender GDE-2026-ITIS)',
      contactEmail: 'procurement@gauteng.gov.za',
      contactPhone: '+27113550000',
      taxRegistrationNumber: '4010192834',
      province: 'GAUTENG',
      currency: 'ZAR',
      isSuspended: false,
      createdAt: '2025-11-15T08:00:00Z',
      updatedAt: '2025-11-15T08:00:00Z'
    };
    this.accounts.set(govtAccount.accountId, govtAccount);

    const govtSub: Subscription = {
      subscriptionId: 'SUB-GOVT-GP-2026',
      accountId: govtAccount.accountId,
      accountType: 'GOVERNMENT_CONTRACT',
      tierName: 'Provincial DoE Learner Safety SLA Contract (50,000 Wearables)',
      billingCycle: 'ANNUAL',
      status: 'ACTIVE',
      unitPriceExclVat: 5217391.3, // R5.217M + 15% VAT = R6.000M / annum
      quantity: 1,
      autoRenew: true,
      currentPeriodStart: '2026-01-01T00:00:00Z',
      currentPeriodEnd: '2027-01-01T00:00:00Z',
      failedPaymentCount: 0,
      metadata: {
        tenderReference: 'GDE-TENDER-2026-081',
        pfmaComplianceApproved: true,
        treasuryTariffCode: 'TR-SA-SAFETY-004'
      },
      createdAt: '2025-11-15T08:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z'
    };
    this.subscriptions.set(govtSub.subscriptionId, govtSub);

    // 4. Fleet Subscription (Responder & Installer Vehicles)
    const fleetAccount: BillingAccount = {
      accountId: 'ACC-FLEET-JHB',
      accountType: 'FLEET',
      accountName: 'Rapid Response Fleet Logistics (Gauteng Central)',
      contactEmail: 'fleet.ops@rapidresponse.co.za',
      contactPhone: '+27114400911',
      taxRegistrationNumber: '4820182736',
      province: 'GAUTENG',
      currency: 'ZAR',
      isSuspended: false,
      createdAt: '2026-03-01T08:00:00Z',
      updatedAt: '2026-03-01T08:00:00Z'
    };
    this.accounts.set(fleetAccount.accountId, fleetAccount);

    const fleetSub: Subscription = {
      subscriptionId: 'SUB-FLEET-302',
      accountId: fleetAccount.accountId,
      accountType: 'FLEET',
      tierName: 'Responder Emergency Fleet GPS & SIM Telemetry',
      billingCycle: 'MONTHLY',
      status: 'ACTIVE',
      unitPriceExclVat: 304.35, // R304.35 + 15% VAT = R350.00 / vehicle / month
      quantity: 15, // 15 vehicles
      autoRenew: true,
      currentPeriodStart: '2026-07-01T00:00:00Z',
      currentPeriodEnd: '2026-08-01T00:00:00Z',
      failedPaymentCount: 0,
      createdAt: '2026-03-01T08:00:00Z',
      updatedAt: '2026-07-01T00:00:00Z'
    };
    this.subscriptions.set(fleetSub.subscriptionId, fleetSub);

    // Generate initial sample invoice
    this.generateInvoiceForSubscription(parentSub.subscriptionId, 'PAID');
    this.generateInvoiceForSubscription(schoolSub.subscriptionId, 'PAID');
  }

  /**
   * Calculate South African 15% Statutory VAT Breakdown
   */
  public calculateVatBreakdown(subtotalExclVat: number): {
    subtotalExclVat: number;
    vatRatePercentage: number;
    vatAmount: number;
    totalAmountInclVat: number;
  } {
    const subtotal = Math.round(subtotalExclVat * 100) / 100;
    const vatAmount = Math.round(subtotal * SA_VAT_RATE * 100) / 100;
    const totalAmountInclVat = Math.round((subtotal + vatAmount) * 100) / 100;

    return {
      subtotalExclVat: subtotal,
      vatRatePercentage: 15.0,
      vatAmount,
      totalAmountInclVat
    };
  }

  /**
   * 1. Create New Subscription across any Account Type (Parent, School, Government Contract, Fleet)
   */
  public async createSubscription(req: SubscriptionCreateRequest): Promise<{
    account: BillingAccount;
    subscription: Subscription;
    invoice: Invoice;
  }> {
    const correlationId = `BILL-SUB-CREATE-${Date.now()}`;

    // Ensure or create account
    let account = this.accounts.get(req.accountId);
    if (!account) {
      account = {
        accountId: req.accountId || `ACC-${req.accountType}-${Date.now().toString(36).toUpperCase()}`,
        accountType: req.accountType,
        accountName: req.accountName,
        contactEmail: req.contactEmail,
        contactPhone: req.contactPhone,
        taxRegistrationNumber: req.taxRegistrationNumber,
        address: req.address,
        province: (req.province as any) || 'GAUTENG',
        currency: 'ZAR',
        isSuspended: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.accounts.set(account.accountId, account);
    }

    // Determine default pricing based on tier and account type
    let unitPriceExclVat = 129.57; // Default Parent R149 incl VAT
    if (req.accountType === 'SCHOOL') {
      unitPriceExclVat = 10869.57; // R12,500 incl VAT
    } else if (req.accountType === 'GOVERNMENT_CONTRACT') {
      unitPriceExclVat = 5217391.3; // R6.0M incl VAT
    } else if (req.accountType === 'FLEET') {
      unitPriceExclVat = 304.35; // R350 incl VAT per unit
    }

    const quantity = req.quantity || 1;
    const isTrial = req.isTrial || req.billingCycle === 'TRIAL';
    const trialDays = req.trialDays || 14;

    const now = new Date();
    const periodStart = now.toISOString();

    // Calculate End Date based on Cycle
    const endDate = new Date(now);
    if (isTrial) {
      endDate.setDate(endDate.getDate() + trialDays);
    } else if (req.billingCycle === 'MONTHLY') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (req.billingCycle === 'QUARTERLY') {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (req.billingCycle === 'ANNUAL') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const subId = `SUB-${req.accountType.substring(0, 3)}-${Date.now().toString(36).toUpperCase()}`;

    const subscription: Subscription = {
      subscriptionId: subId,
      accountId: account.accountId,
      accountType: req.accountType,
      tierName: req.tierName,
      billingCycle: isTrial ? 'TRIAL' : req.billingCycle,
      status: isTrial ? 'TRIALING' : 'ACTIVE',
      unitPriceExclVat,
      quantity,
      autoRenew: req.autoRenew !== undefined ? req.autoRenew : true,
      trialStartDate: isTrial ? periodStart : undefined,
      trialEndDate: isTrial ? endDate.toISOString() : undefined,
      currentPeriodStart: periodStart,
      currentPeriodEnd: endDate.toISOString(),
      failedPaymentCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.subscriptions.set(subscription.subscriptionId, subscription);

    // Generate initial Invoice
    const invoice = this.generateInvoiceForSubscription(
      subscription.subscriptionId,
      isTrial ? 'PAID' : 'ISSUED'
    );

    AuditLogger.recordAudit({
      action: 'SUBSCRIPTION_CREATED',
      resource: `/api/v1/billing/subscriptions`,
      correlationId,
      metadata: {
        subscriptionId: subId,
        accountId: account.accountId,
        accountType: req.accountType,
        billingCycle: subscription.billingCycle,
        totalAmountInclVat: invoice.totalAmountInclVat
      }
    });

    return { account, subscription, invoice };
  }

  /**
   * 2. Generate Itemized Invoice with South African 15% Statutory VAT Breakdown
   */
  public generateInvoiceForSubscription(
    subscriptionId: string,
    initialStatus: InvoiceStatus = 'ISSUED'
  ): Invoice {
    const sub = this.subscriptions.get(subscriptionId);
    if (!sub) {
      throw new Error(`Subscription ${subscriptionId} not found.`);
    }

    const account = this.accounts.get(sub.accountId);
    if (!account) {
      throw new Error(`Billing account ${sub.accountId} not found.`);
    }

    this.invoiceCounter++;
    const now = new Date();
    const invoiceNumber = `INV-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${this.invoiceCounter}`;

    const subtotalExclVat = sub.unitPriceExclVat * sub.quantity;
    const vatCalc = this.calculateVatBreakdown(subtotalExclVat);

    const lineItems: InvoiceLineItem[] = [
      {
        id: `ITEM-1`,
        description: `${sub.tierName} (${sub.billingCycle} Cycle) - ${sub.quantity} unit(s)`,
        quantity: sub.quantity,
        unitPriceExclVat: sub.unitPriceExclVat,
        subtotalExclVat: vatCalc.subtotalExclVat,
        vatAmount: vatCalc.vatAmount,
        totalAmountInclVat: vatCalc.totalAmountInclVat
      }
    ];

    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + 14); // 14 days payment terms

    const invoice: Invoice = {
      invoiceId: `INV-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      invoiceNumber,
      subscriptionId: sub.subscriptionId,
      accountId: account.accountId,
      accountType: account.accountType,
      status: initialStatus,
      issueDate: now.toISOString(),
      dueDate: dueDate.toISOString(),
      paidAt: initialStatus === 'PAID' ? now.toISOString() : undefined,
      subtotalExclVat: vatCalc.subtotalExclVat,
      vatRatePercentage: 15.0,
      vatAmount: vatCalc.vatAmount,
      totalAmountInclVat: vatCalc.totalAmountInclVat,
      lineItems,
      paymentMethod: account.accountType === 'GOVERNMENT_CONTRACT' ? 'EFT_TREASURY' : 'PAYFAST',
      notes: `Public Finance Management Act (PFMA) compliant tax invoice. SA VAT Reg: ${account.taxRegistrationNumber || 'N/A'}.`,
      createdAt: now.toISOString()
    };

    this.invoices.set(invoice.invoiceId, invoice);
    return invoice;
  }

  /**
   * 3. Process Automatic Renewals and Transition Expired Trials / Period Ends
   */
  public async processAutomaticRenewals(): Promise<{
    renewedCount: number;
    failedCount: number;
    expiredTrialsCount: number;
  }> {
    const now = new Date();
    let renewedCount = 0;
    let failedCount = 0;
    let expiredTrialsCount = 0;

    for (const [subId, sub] of this.subscriptions.entries()) {
      const periodEnd = new Date(sub.currentPeriodEnd);

      // A. Trial Expiration Handling
      if (sub.status === 'TRIALING' && sub.trialEndDate) {
        const trialEnd = new Date(sub.trialEndDate);
        if (now >= trialEnd) {
          if (sub.autoRenew) {
            sub.status = 'ACTIVE';
            sub.billingCycle = 'MONTHLY'; // Transition from trial to active monthly
            sub.currentPeriodStart = now.toISOString();

            const nextEnd = new Date(now);
            nextEnd.setMonth(nextEnd.getMonth() + 1);
            sub.currentPeriodEnd = nextEnd.toISOString();

            this.generateInvoiceForSubscription(subId, 'ISSUED');
            renewedCount++;
            AuditLogger.log('INFO', `Subscription ${subId} transitioned automatically from TRIAL to ACTIVE.`);
          } else {
            sub.status = 'EXPIRED';
            expiredTrialsCount++;
            AuditLogger.log('INFO', `Trial expired for subscription ${subId}. Transitioned to EXPIRED.`);
          }
          sub.updatedAt = now.toISOString();
        }
      }

      // B. Automatic Renewal for Active Subscriptions reaching period end
      else if (sub.status === 'ACTIVE' && now >= periodEnd && sub.autoRenew) {
        const newStart = now.toISOString();
        const newEnd = new Date(now);

        if (sub.billingCycle === 'MONTHLY') newEnd.setMonth(newEnd.getMonth() + 1);
        else if (sub.billingCycle === 'QUARTERLY') newEnd.setMonth(newEnd.getMonth() + 3);
        else if (sub.billingCycle === 'ANNUAL') newEnd.setFullYear(newEnd.getFullYear() + 1);

        sub.currentPeriodStart = newStart;
        sub.currentPeriodEnd = newEnd.toISOString();
        sub.updatedAt = now.toISOString();

        // Issue renewal invoice
        this.generateInvoiceForSubscription(subId, 'ISSUED');
        renewedCount++;
      }
    }

    return { renewedCount, failedCount, expiredTrialsCount };
  }

  /**
   * 4. Handle Payment Failures & Enforce Account Suspension Policies
   */
  public async handlePaymentFailure(
    subscriptionId: string,
    failureReason: string
  ): Promise<{
    subscription: Subscription;
    account: BillingAccount;
    statusChangedTo: SubscriptionStatus;
    suspensionApplied: boolean;
  }> {
    const sub = this.subscriptions.get(subscriptionId);
    if (!sub) {
      throw new Error(`Subscription ${subscriptionId} not found.`);
    }

    const account = this.accounts.get(sub.accountId);
    if (!account) {
      throw new Error(`Billing account ${sub.accountId} not found.`);
    }

    sub.failedPaymentCount += 1;
    const now = new Date();

    let newStatus: SubscriptionStatus = sub.status;
    let suspensionApplied = false;

    // Step 1: Transition to PAST_DUE
    if (sub.failedPaymentCount >= this.suspensionPolicy.maxFailedAttemptsBeforeGracePeriod && sub.status === 'ACTIVE') {
      newStatus = 'PAST_DUE';

      // Grant 7-Day Grace Period
      const graceEnd = new Date(now);
      graceEnd.setDate(graceEnd.getDate() + this.suspensionPolicy.gracePeriodDays);
      sub.gracePeriodEndsAt = graceEnd.toISOString();
      newStatus = 'GRACE_PERIOD';

      AuditLogger.log('WARN', `Payment failed for ${sub.subscriptionId}. Entering ${this.suspensionPolicy.gracePeriodDays}-day GRACE PERIOD.`);
    }

    // Step 2: Transition to SUSPENDED if grace period exceeded or max failures hit
    if (sub.failedPaymentCount >= 3 || (sub.gracePeriodEndsAt && now > new Date(sub.gracePeriodEndsAt))) {
      newStatus = 'SUSPENDED';
      account.isSuspended = true;
      account.suspensionReason = `Account suspended due to ${sub.failedPaymentCount} consecutive payment failures. Reason: ${failureReason}`;
      suspensionApplied = true;

      AuditLogger.recordAudit({
        action: 'ACCOUNT_SUSPENDED_PAYMENT_FAILURE',
        resource: `/api/v1/billing/subscriptions/${subscriptionId}`,
        correlationId: `SUSPEND-${subscriptionId}`,
        metadata: {
          accountId: account.accountId,
          failedPaymentCount: sub.failedPaymentCount,
          allowEmergencySOSInSuspendedState: this.suspensionPolicy.allowEmergencySOSInSuspendedState
        }
      });
    }

    sub.status = newStatus;
    sub.updatedAt = now.toISOString();
    account.updatedAt = now.toISOString();

    return {
      subscription: sub,
      account,
      statusChangedTo: newStatus,
      suspensionApplied
    };
  }

  /**
   * 5. Settle Invoice & Reactivate Account
   */
  public async payInvoice(
    invoiceId: string,
    paymentMethod: 'PAYFAST' | 'OZOW' | 'PEACH_PAYMENTS' | 'EFT_TREASURY' | 'DEBIT_ORDER',
    paymentReference: string
  ): Promise<{ invoice: Invoice; subscription: Subscription; account: BillingAccount }> {
    const invoice = this.invoices.get(invoiceId);
    if (!invoice) {
      throw new Error(`Invoice ${invoiceId} not found.`);
    }

    const sub = this.subscriptions.get(invoice.subscriptionId);
    if (!sub) {
      throw new Error(`Subscription ${invoice.subscriptionId} not found.`);
    }

    const account = this.accounts.get(invoice.accountId);
    if (!account) {
      throw new Error(`Account ${invoice.accountId} not found.`);
    }

    const now = new Date().toISOString();

    // Mark Invoice as Paid
    invoice.status = 'PAID';
    invoice.paidAt = now;
    invoice.paymentMethod = paymentMethod;
    invoice.paymentReference = paymentReference;

    // Reactivate Subscription & Account
    sub.status = 'ACTIVE';
    sub.failedPaymentCount = 0;
    sub.gracePeriodEndsAt = undefined;
    sub.updatedAt = now;

    if (account.isSuspended) {
      account.isSuspended = false;
      account.suspensionReason = undefined;
      account.updatedAt = now;
      AuditLogger.log('INFO', `Account ${account.accountId} REACTIVATED following successful invoice payment ${invoiceId}.`);
    }

    AuditLogger.recordAudit({
      action: 'INVOICE_PAID_ACCOUNT_REACTIVATED',
      resource: `/api/v1/billing/invoices/${invoiceId}`,
      correlationId: `PAY-INV-${invoiceId}`,
      metadata: {
        invoiceId,
        paymentMethod,
        paymentReference,
        amountPaidInclVat: invoice.totalAmountInclVat
      }
    });

    return { invoice, subscription: sub, account };
  }

  /**
   * Getters
   */
  public getSubscription(subscriptionId: string): Subscription | undefined {
    return this.subscriptions.get(subscriptionId);
  }

  public getAccount(accountId: string): BillingAccount | undefined {
    return this.accounts.get(accountId);
  }

  public getInvoice(invoiceId: string): Invoice | undefined {
    return this.invoices.get(invoiceId);
  }

  public getInvoicesForAccount(accountId: string): Invoice[] {
    return Array.from(this.invoices.values()).filter((inv) => inv.accountId === accountId);
  }

  public getAllSubscriptions(): Subscription[] {
    return Array.from(this.subscriptions.values());
  }

  public getAllInvoices(): Invoice[] {
    return Array.from(this.invoices.values());
  }

  public getSuspensionPolicy(): SuspensionPolicyConfig {
    return { ...this.suspensionPolicy };
  }
}
