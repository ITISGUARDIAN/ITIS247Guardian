// ITIS Production Billing & Subscription Management Types (Prompt 072)
// Multi-Tier Subscription Engine (Parent, School, Government Contracts, Fleet)

export type AccountType = 'PARENT' | 'SCHOOL' | 'GOVERNMENT_CONTRACT' | 'FLEET';

export type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'TRIAL';

export type SubscriptionStatus =
  | 'TRIALING'
  | 'ACTIVE'
  | 'PAST_DUE'
  | 'GRACE_PERIOD'
  | 'SUSPENDED'
  | 'CANCELLED'
  | 'EXPIRED';

export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'OVERDUE' | 'VOID' | 'UNCOLLECTIBLE';

// South African Statutory VAT Rate (15.0%)
export const SA_VAT_RATE = 0.15;

export interface BillingAccount {
  accountId: string;
  accountType: AccountType;
  accountName: string;
  contactEmail: string;
  contactPhone?: string;
  taxRegistrationNumber?: string; // SA VAT / Tax ID
  address?: string;
  province?: 'GAUTENG' | 'KWAZULU_NATAL' | 'WESTERN_CAPE' | 'EASTERN_CAPE' | 'LIMPOPO' | 'MPUMALANGA' | 'FREE_STATE' | 'NORTH_WEST' | 'NORTHERN_CAPE';
  currency: 'ZAR';
  isSuspended: boolean;
  suspensionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  subscriptionId: string;
  accountId: string;
  accountType: AccountType;
  tierName: string; // e.g. "Parent Single Child Guard", "Gauteng DoE 50k Fleet Contract"
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  unitPriceExclVat: number; // Price per unit per cycle in ZAR
  quantity: number; // e.g. 1 learner, 500 school devices, 50,000 provincial contract units
  autoRenew: boolean;
  trialStartDate?: string;
  trialEndDate?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  gracePeriodEndsAt?: string;
  cancelledAt?: string;
  failedPaymentCount: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPriceExclVat: number;
  subtotalExclVat: number;
  vatAmount: number;
  totalAmountInclVat: number;
}

export interface Invoice {
  invoiceId: string;
  invoiceNumber: string; // e.g. "INV-2026-07-00101"
  subscriptionId: string;
  accountId: string;
  accountType: AccountType;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidAt?: string;
  subtotalExclVat: number;
  vatRatePercentage: number; // 15.0
  vatAmount: number;
  totalAmountInclVat: number;
  lineItems: InvoiceLineItem[];
  paymentMethod?: 'PAYFAST' | 'OZOW' | 'PEACH_PAYMENTS' | 'EFT_TREASURY' | 'DEBIT_ORDER';
  paymentReference?: string;
  notes?: string;
  createdAt: string;
}

export interface SuspensionPolicyConfig {
  maxFailedAttemptsBeforeGracePeriod: number; // e.g. 1
  gracePeriodDays: number; // e.g. 7 days
  maxGracePeriodDaysBeforeSuspension: number; // e.g. 7
  autoSuspendEmergencyService: boolean; // False for safety wearables, restrict non-critical features first
  notifyAdminOnSuspension: boolean;
  allowEmergencySOSInSuspendedState: boolean; // Lifesaving constraint: SOS alerts remain operational
}

export interface SubscriptionCreateRequest {
  accountId: string;
  accountType: AccountType;
  accountName: string;
  contactEmail: string;
  contactPhone?: string;
  taxRegistrationNumber?: string;
  address?: string;
  province?: string;
  tierName: string;
  billingCycle: BillingCycle;
  quantity?: number;
  autoRenew?: boolean;
  isTrial?: boolean;
  trialDays?: number;
}
