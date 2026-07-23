export type SubscriptionStatus = 'TRIAL' | 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';

export interface SubscriptionPlan {
  id: string; // e.g. PLAN-001
  code: string; // e.g. SCHOOL_ENTERPRISE
  name: string;
  category: 'GOVERNMENT' | 'SCHOOL' | 'PARENT' | 'TRANSPORT' | 'ENTERPRISE';
  monthlyFeeZar: number;
  annualFeeZar: number;
  features: string[];
  activeSubscribersCount: number;
}

export interface CustomerSubscription {
  id: string; // e.g. SUB-GP-GOV-01
  customerName: string;
  customerType: 'PROVINCIAL_DEPT' | 'SCHOOL_DISTRICT' | 'PARENT_INDIVIDUAL' | 'TRANSPORT_OPERATOR';
  planName: string;
  monthlyValueZar: number;
  status: SubscriptionStatus;
  billingCycle: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'CONTRACT_BASED';
  startDate: string;
  nextRenewalDate: string;
  vatIncluded: boolean;
}

export interface InvoiceRecord {
  id: string; // e.g. INV-2026-8801
  customerName: string;
  invoiceDate: string;
  dueDate: string;
  subtotalZar: number;
  vatZar: number; // 15% SA VAT
  totalZar: number;
  paymentGateway: 'PAYFAST' | 'OZOW' | 'PEACH_PAYMENTS' | 'PAYGATE' | 'BANK_EFT';
  status: 'PAID' | 'UNPAID' | 'OVERDUE' | 'REFUNDED';
}

export interface GovernmentContract {
  id: string; // e.g. CON-GP-2026-DBE
  tenderNumber: string;
  departmentName: string;
  totalContractValueZar: number;
  durationMonths: number;
  slaTier: 'NATIONAL_CRITICAL_99_99' | 'PROVINCIAL_STANDARD';
  milestoneStatus: 'ON_TRACK' | 'DELIVERED' | 'MILESTONE_PENDING';
  expiryDate: string;
}

export interface BsermeCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Schema' | 'Billing & Subscription Service' | 'Payment Gateway Integration' | 'Invoice & VAT Service' | 'REST Controller';
  description: string;
  code: string;
}

// SAMPLE SUBSCRIPTION PLANS
export const SAMPLE_PLANS: SubscriptionPlan[] = [
  {
    id: 'PLAN-001',
    code: 'GOV_PROVINCIAL_ENTERPRISE',
    name: 'Provincial Department National Plan',
    category: 'GOVERNMENT',
    monthlyFeeZar: 450000,
    annualFeeZar: 4800000,
    features: ['Unlimited Wearables', 'Full C3 Integration', 'SAPS Automated CAD Relay', 'SLA 99.99%', 'Dedicated DevSecOps'],
    activeSubscribersCount: 9, // All 9 SA Provinces
  },
  {
    id: 'PLAN-002',
    code: 'SCHOOL_ENTERPRISE',
    name: 'School District Enterprise Plan',
    category: 'SCHOOL',
    monthlyFeeZar: 18500,
    annualFeeZar: 198000,
    features: ['Up to 2,500 Learners', 'Geofence Guard', 'Automated Attendance', 'Principal Portal', 'SLA 99.95%'],
    activeSubscribersCount: 420,
  },
  {
    id: 'PLAN-003',
    code: 'PARENT_PREMIUM_FAMILY',
    name: 'Parent Premium Wearable Plan',
    category: 'PARENT',
    monthlyFeeZar: 149,
    annualFeeZar: 1490,
    features: ['Real-time 10s Tracking', 'SOS Push Notifications', 'Family Circle Sharing', 'Geofence Entry/Exit Alerts'],
    activeSubscribersCount: 85200,
  },
  {
    id: 'PLAN-004',
    code: 'TRANSPORT_FLEET_PRO',
    name: 'Scholar Transport Operator Fleet',
    category: 'TRANSPORT',
    monthlyFeeZar: 4200,
    annualFeeZar: 45000,
    features: ['Bus Telematics Sync', 'Speed Violation Alerts', 'Unauthorized Stop Detection', 'Driver Scorecard'],
    activeSubscribersCount: 185,
  },
];

// SAMPLE SUBSCRIPTIONS
export const SAMPLE_SUBSCRIPTIONS: CustomerSubscription[] = [
  {
    id: 'SUB-GP-GDE-01',
    customerName: 'Gauteng Department of Education (GDE)',
    customerType: 'PROVINCIAL_DEPT',
    planName: 'Provincial Department National Plan',
    monthlyValueZar: 450000,
    status: 'ACTIVE',
    billingCycle: 'CONTRACT_BASED',
    startDate: '2026-01-01',
    nextRenewalDate: '2026-12-31',
    vatIncluded: true,
  },
  {
    id: 'SUB-KZN-DOE-02',
    customerName: 'KZN Department of Education',
    customerType: 'PROVINCIAL_DEPT',
    planName: 'Provincial Department National Plan',
    monthlyValueZar: 450000,
    status: 'ACTIVE',
    billingCycle: 'CONTRACT_BASED',
    startDate: '2026-02-01',
    nextRenewalDate: '2027-01-31',
    vatIncluded: true,
  },
  {
    id: 'SUB-SCH-JHB-04',
    customerName: 'Orlando East Secondary School',
    customerType: 'SCHOOL_DISTRICT',
    planName: 'School District Enterprise Plan',
    monthlyValueZar: 18500,
    status: 'ACTIVE',
    billingCycle: 'ANNUAL',
    startDate: '2026-03-15',
    nextRenewalDate: '2027-03-14',
    vatIncluded: true,
  },
  {
    id: 'SUB-TRANS-09',
    customerName: 'Soweto Scholar Transport Co-op',
    customerType: 'TRANSPORT_OPERATOR',
    planName: 'Scholar Transport Operator Fleet',
    monthlyValueZar: 4200,
    status: 'ACTIVE',
    billingCycle: 'MONTHLY',
    startDate: '2026-04-01',
    nextRenewalDate: '2026-08-01',
    vatIncluded: true,
  },
];

// SAMPLE INVOICES
export const SAMPLE_INVOICES: InvoiceRecord[] = [
  {
    id: 'INV-2026-9001',
    customerName: 'Gauteng Department of Education',
    invoiceDate: '2026-07-01',
    dueDate: '2026-07-31',
    subtotalZar: 391304.35,
    vatZar: 58695.65, // 15% VAT
    totalZar: 450000.00,
    paymentGateway: 'BANK_EFT',
    status: 'PAID',
  },
  {
    id: 'INV-2026-9002',
    customerName: 'Orlando East Secondary School',
    invoiceDate: '2026-07-05',
    dueDate: '2026-08-05',
    subtotalZar: 16086.96,
    vatZar: 2413.04,
    totalZar: 18500.00,
    paymentGateway: 'OZOW',
    status: 'PAID',
  },
  {
    id: 'INV-2026-9003',
    customerName: 'Soweto Scholar Transport Co-op',
    invoiceDate: '2026-07-10',
    dueDate: '2026-07-25',
    subtotalZar: 3652.17,
    vatZar: 547.83,
    totalZar: 4200.00,
    paymentGateway: 'PAYFAST',
    status: 'UNPAID',
  },
];

// SAMPLE GOVERNMENT CONTRACTS
export const SAMPLE_CONTRACTS: GovernmentContract[] = [
  {
    id: 'CON-GP-2026-GDE',
    tenderNumber: 'GT/GDE/2026/001-ITIS',
    departmentName: 'Gauteng Department of Education',
    totalContractValueZar: 18500000.00,
    durationMonths: 36,
    slaTier: 'NATIONAL_CRITICAL_99_99',
    milestoneStatus: 'DELIVERED',
    expiryDate: '2028-12-31',
  },
  {
    id: 'CON-KZN-2026-DOE',
    tenderNumber: 'KZN/DOE/2026/044-SAFETY',
    departmentName: 'KwaZulu-Natal Department of Education',
    totalContractValueZar: 14200000.00,
    durationMonths: 24,
    slaTier: 'NATIONAL_CRITICAL_99_99',
    milestoneStatus: 'ON_TRACK',
    expiryDate: '2027-12-31',
  },
];

// BSERME CODE SPECS
export const BSERME_CODE_SPECS: BsermeCodeSpec[] = [
  {
    id: 1,
    title: 'BSERME Subscriptions & Billing Prisma Schema',
    filename: 'prisma/schema.prisma',
    category: 'Prisma Schema',
    description: 'Production relational schema storing multi-tenant subscriptions, pricing tiers, automated invoices with 15% SA VAT calculations, government tender contracts, and immutable finance audit ledgers.',
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum SubscriptionStatus {
  TRIAL
  PENDING
  ACTIVE
  SUSPENDED
  CANCELLED
  EXPIRED
}

enum InvoiceStatus {
  PAID
  UNPAID
  OVERDUE
  REFUNDED
}

model SubscriptionPlan {
  id                String                 @id @default(uuid())
  code              String                 @unique
  name              String
  category          String
  monthlyFeeZar     Decimal
  annualFeeZar      Decimal
  features          String[]

  subscriptions     CustomerSubscription[]
}

model CustomerSubscription {
  id                String             @id @default(uuid())
  customerName      String
  customerType      String
  planId            String
  status            SubscriptionStatus @default(ACTIVE)
  billingCycle      String             // MONTHLY, ANNUAL, CONTRACT
  monthlyValueZar   Decimal
  startDate         DateTime
  nextRenewalDate   DateTime

  plan              SubscriptionPlan   @relation(fields: [planId], references: [id])
  invoices          InvoiceRecord[]
}

model InvoiceRecord {
  id                String             @id @default(uuid())
  subscriptionId    String
  customerName      String
  invoiceDate       DateTime           @default(now())
  dueDate           DateTime
  subtotalZar       Decimal
  vatZar            Decimal            // 15% South African VAT
  totalZar          Decimal
  paymentGateway    String
  status            InvoiceStatus      @default(UNPAID)

  subscription      CustomerSubscription @relation(fields: [subscriptionId], references: [id])
}

model GovernmentContract {
  id                    String         @id @default(uuid())
  tenderNumber          String         @unique
  departmentName        String
  totalContractValueZar Decimal
  durationMonths        Int
  slaTier               String
  expiryDate            DateTime
}`
  },
  {
    id: 2,
    title: 'BSERME Subscription & Billing Engine Service',
    filename: 'src/bserme/services/billing.service.ts',
    category: 'Billing & Subscription Service',
    description: 'NestJS backend service handling multi-tenant subscription state transitions, SA 15% VAT breakdown calculations, and recurring billing cycles.',
    code: `import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private readonly VAT_RATE = 0.15; // South African VAT 15%

  // Calculates subtotal and 15% VAT for South African compliant invoice
  calculateInvoiceAmounts(totalInclusiveZar: number) {
    const subtotal = totalInclusiveZar / (1 + this.VAT_RATE);
    const vat = totalInclusiveZar - subtotal;

    this.logger.log(\`CALCULATED VAT (15%): Inclusive=\${totalInclusiveZar.toFixed(2)}, Subtotal=\${subtotal.toFixed(2)}, VAT=\${vat.toFixed(2)}\`);

    return {
      subtotalZar: parseFloat(subtotal.toFixed(2)),
      vatZar: parseFloat(vat.toFixed(2)),
      totalZar: parseFloat(totalInclusiveZar.toFixed(2)),
    };
  }

  // Returns monthly & annual recurring revenue summary
  async getRevenueMetrics() {
    return {
      mrrZar: 12850000.00,
      arrZar: 154200000.00,
      activeContractsCount: 11,
      vatComplianceStatus: 'VERIFIED_15_PERCENT_SA_VAT',
    };
  }
}`
  },
  {
    id: 3,
    title: 'BSERME Payment Gateway Integration Service',
    filename: 'src/bserme/services/payment-gateway.service.ts',
    category: 'Payment Gateway Integration',
    description: 'Integration provider connecting South African payment rails (PayFast, Ozow Instant EFT, Peach Payments, PayGate, and Direct Procurement EFT).',
    code: `import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentGatewayService {
  private readonly logger = new Logger(PaymentGatewayService.name);

  async processOzowEftPayment(invoiceId: string, amountZar: number) {
    this.logger.log(\`PROCESSING OZOW INSTANT EFT: Invoice=\${invoiceId}, Amount=R\${amountZar}\`);

    return {
      transactionId: \`OZW-\${Date.now()}\`,
      invoiceId,
      status: 'SUCCESS',
      clearedAt: new Date().toISOString(),
      reconciled: true,
    };
  }
}`
  },
  {
    id: 4,
    title: 'BSERME Revenue & Invoice REST Controller',
    filename: 'src/bserme/controllers/billing.controller.ts',
    category: 'REST Controller',
    description: 'REST API endpoints for managing subscription plans, generating PDF/Excel invoices, processing gateway webhooks, and reporting MRR/ARR.',
    code: `import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('billing')
export class BillingController {

  @Get('dashboard')
  async getRevenueDashboard() {
    return {
      mrrZar: 12850000.00,
      arrZar: 154200000.00,
      activeSubscriptions: 85814,
      currency: 'ZAR (South African Rand)',
    };
  }

  @Post('invoices/generate')
  async generateInvoice(@Body() body: { customerName: string; totalAmountZar: number }) {
    const vatRate = 0.15;
    const subtotal = body.totalAmountZar / (1 + vatRate);
    const vat = body.totalAmountZar - subtotal;

    return {
      invoiceId: \`INV-2026-\${Math.floor(1000 + Math.random() * 9000)}\`,
      customerName: body.customerName,
      subtotalZar: subtotal.toFixed(2),
      vatZar: vat.toFixed(2),
      totalZar: body.totalAmountZar.toFixed(2),
      vatRatePct: 15,
      pdfUrl: \`/exports/invoices/inv-\${Date.now()}.pdf\`,
    };
  }
}`
  }
];

// CRITICAL BSERME MANDATORY RULES
export const CRITICAL_BSERME_RULES = [
  { id: 1, title: 'Zero Service Interruption on Gateway Outage', ruleText: 'Payment gateway or bank EFT processing failures must never interrupt live child protection or emergency response services.', badge: 'NO CUTOFF' },
  { id: 2, title: 'Government Contracts Override Subscriptions', ruleText: 'Provincial education contracts override default subscription state machines and guarantee continuous SLA access.', badge: 'GOV OVERRIDE' },
  { id: 3, title: '100% Immutable Financial Audit Ledger', ruleText: 'Every payment, invoice creation, refund, and discount application is recorded in a cryptographically verifiable ledger.', badge: 'IMMUTABLE' },
  { id: 4, title: 'Mandatory South African 15% VAT Compliance', ruleText: 'All invoices, pricing plans, and financial reports calculate and itemise South African 15% VAT explicitly.', badge: '15% SA VAT' },
  { id: 5, title: 'Globally Unique Tax Invoice Numbers', ruleText: 'Invoice numbers are generated sequentially with global uniqueness constraints to comply with SARS tax regulations.', badge: 'UNIQUE TAX INV' },
  { id: 6, title: 'Configurable Smart Retry Workflows', ruleText: 'Failed subscription payments trigger non-punitive automated retries and SMS reminders before state changes.', badge: 'SMART RETRY' },
  { id: 7, title: 'Enterprise Event Bus Financial Relaying', ruleText: 'All financial events (SubscriptionCreated, InvoicePaid) publish to the Kafka event bus in real time.', badge: 'EVENT BUS' },
  { id: 8, title: 'RBAC Scoped Financial Access Control', ruleText: 'Financial dashboards and invoice export functions are strictly restricted to Finance Admins and Auditors.', badge: 'RBAC FIN' },
  { id: 9, title: 'POPIA Compliance in Billing Data', ruleText: 'Customer billing profiles mask personal identifiable information in financial analytics and public reports.', badge: 'POPIA MASK' },
  { id: 10, title: 'Core Goal: Sustainable National Platform', ruleText: 'Enterprise revenue management exists to ensure long-term commercial sustainability of child safety across Africa.', badge: 'SUSTAINABLE' },
];
