export interface CommercialFinancialMetric {
  metricName: string;
  value: string;
  unit: string;
  description: string;
  category: 'FINANCIAL' | 'UNIT_ECONOMICS' | 'TENDER_COMPLIANCE' | 'SECURITY_CERTIFICATION';
}

export interface GovernmentTenderRequirement {
  tenderCode: string; // e.g. TENDER-DBE-2026-ITIS-001
  issuingBody: string; // e.g. Department of Basic Education / SITA
  title: string;
  pfmaStatus: 'PFMA_COMPLIANT' | 'MFMA_APPROVED' | 'TREASURY_NOTE_SIGNED';
  procurementValueZar: number;
  complianceScorePct: number;
}

export interface CommProcureCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Commercial Schema' | 'NestJS Procurement Audit Ledger' | 'Treasury Tariff Billing API';
  description: string;
  code: string;
}

// SAMPLE FINANCIAL METRICS
export const SAMPLE_FINANCIAL_METRICS: CommercialFinancialMetric[] = [
  {
    metricName: 'Monthly Tariff per Protected Learner',
    value: 'R 14.50',
    unit: 'ZAR / learner / month',
    description: 'All-inclusive hardware lease, cellular LTE connectivity, C3 dispatch, and insurance backing.',
    category: 'UNIT_ECONOMICS',
  },
  {
    metricName: 'Target Serviceable Addressable Market (SAM)',
    value: '12.4M',
    unit: 'Learners',
    description: 'Total public and independent school learners across all 9 South African provinces.',
    category: 'FINANCIAL',
  },
  {
    metricName: '5-Year Projected Contract Value',
    value: 'R 10.79B',
    unit: 'ZAR',
    description: 'National multi-province contract execution under National Treasury Practice Note 8.',
    category: 'FINANCIAL',
  },
  {
    metricName: 'Hardware Manufacturing Unit Cost (COGS)',
    value: '$ 18.20',
    unit: 'USD / device',
    description: 'Full Bill of Materials, assembly, testing, packaging, and custom duty at volume scale (100k+ batches).',
    category: 'UNIT_ECONOMICS',
  },
  {
    metricName: 'BBBEE Procurement Level',
    value: 'Level 1',
    unit: 'Contributorship',
    description: '100% Black-owned, 51% Black Female-owned qualifying small enterprise (QSE) status for SA government tenders.',
    category: 'TENDER_COMPLIANCE',
  },
];

// SAMPLE TENDERS
export const SAMPLE_GOVERNMENT_TENDERS: GovernmentTenderRequirement[] = [
  {
    tenderCode: 'TENDER-DBE-2026-ITIS-001',
    issuingBody: 'National Department of Basic Education (DBE) & SITA',
    title: 'Provision of Integrated Wearable Safety System for 12.4M South African School Learners',
    pfmaStatus: 'PFMA_COMPLIANT',
    procurementValueZar: 2150000000, // R2.15 Billion per annum
    complianceScorePct: 100.0,
  },
  {
    tenderCode: 'TENDER-GDE-2026-SAFE-004',
    issuingBody: 'Gauteng Department of Education (GDE)',
    title: 'Priority School Safety Corridor Smart Tracking & C3 Command Integration',
    pfmaStatus: 'MFMA_APPROVED',
    procurementValueZar: 480000000, // R480 Million
    complianceScorePct: 99.8,
  },
  {
    tenderCode: 'TENDER-SAPS-2026-CAD-009',
    issuingBody: 'South African Police Service (SAPS) / C3 Gateway',
    title: 'Automated Emergency Dispatch Interoperability API & Digital Forensics System',
    pfmaStatus: 'TREASURY_NOTE_SIGNED',
    procurementValueZar: 190000000, // R190 Million
    complianceScorePct: 100.0,
  },
];

// CODE SPECS
export const COMMPROCURE_CODE_SPECS: CommProcureCodeSpec[] = [
  {
    id: 1,
    title: 'Government Procurement & Investor Financial Ledger Schema',
    filename: 'prisma/schema_commercial.prisma',
    category: 'Prisma Commercial Schema',
    description: 'Models tender contracts, provincial billing ledgers, Treasury tariffs per learner, BBBEE audit scores, and investor revenue projections.',
    code: `model GovernmentContract {
  contractId           String   @id @default(uuid())
  tenderReference      String   @unique
  provincialDepartment String
  totalLearnersCovered Int
  monthlyTariffPerLearner ZarAmount
  annualValueZar       Float
  pfmaApprovalCode     String
  signedAt             DateTime
  expiresAt            DateTime
  contractLedgers      BillingLedger[]
}

model BillingLedger {
  id                   String   @id @default(uuid())
  contractId           String
  billingMonth         String
  activeWearablesCount Int
  totalInvoiceAmountZar Float
  treasuryPaymentStatus String   @default("PAID_TREASURY_EFT")
  contract             GovernmentContract @relation(fields: [contractId], references: [contractId])
}`
  },
  {
    id: 2,
    title: 'National Treasury PFMA Tariff Calculation & Billing Engine',
    filename: 'src/modules/commercial/services/treasury_billing.service.ts',
    category: 'Treasury Tariff Billing API',
    description: 'Calculates monthly billing per province based on verified active learner wear, applying volume discount brackets and SLA compliance credits.',
    code: `import { Injectable } from '@nestjs/common';

@Injectable()
export class TreasuryBillingService {
  async calculateProvincialInvoice(provincialCode: string, activeLearners: number, slaPenaltyDeductionsZar: number = 0) {
    const BASE_TARIFF_ZAR = 14.50; // R14.50 per learner per month
    
    // Apply volume discount bracket for > 1,000,000 learners
    let effectiveTariff = BASE_TARIFF_ZAR;
    if (activeLearners >= 1000000) {
      effectiveTariff = 13.80; // Discounted tariff
    }

    const grossAmount = activeLearners * effectiveTariff;
    const netAmount = Math.max(0, grossAmount - slaPenaltyDeductionsZar);

    return {
      provincialCode,
      billingCycle: '2026-07',
      activeLearners,
      effectiveTariffZar: effectiveTariff,
      grossInvoiceAmountZar: grossAmount,
      slaPenaltyDeductionsZar,
      netPayableTreasuryAmountZar: netAmount,
      pfmaComplianceChecksum: 'SHA256: 8f4a...110e',
    };
  }
}`
  },
  {
    id: 3,
    title: 'SITA / State Security Agency (SSA) Sovereign Cloud Compliance Audit Ledger',
    filename: 'src/modules/commercial/services/sovereign_compliance.service.ts',
    category: 'NestJS Procurement Audit Ledger',
    description: 'Verifies data residency within South African borders, zero international PII egress, and SSA security clearance logs for government tenders.',
    code: `import { Injectable } from '@nestjs/common';

@Injectable()
export class SovereignComplianceService {
  async verifySovereigntyAudit() {
    return {
      datacenterRegion: 'africa-south1 (Johannesburg)',
      dataResidencyPassed: true,
      popiaEgressBlocked: true,
      ssaVettingLevel: 'TOP_SECRET_GOVT_APPROVED',
      sitaTenderEligibility: 'ELIGIBLE_LEVEL_1',
      lastAuditedAt: new Date().toISOString(),
    };
  }
}`
  }
];

// MANDATORY RULES
export const CRITICAL_COMMPROCURE_RULES = [
  { id: 1, title: 'Public Finance Management Act (PFMA) Compliance', ruleText: 'All procurement contracts and billing structures strictly adhere to PFMA Section 38 and Treasury Regulation 16A.', badge: 'PFMA COMPLIANT' },
  { id: 2, title: 'Level 1 BBBEE Procurement & Local Content Mandate', ruleText: 'Guarantees Level 1 BBBEE status and minimum 40% local South African manufacturing and assembly content.', badge: 'BBBEE LEVEL 1' },
  { id: 3, title: 'SITA Sovereign Data Residency & SSA Security Vetting', ruleText: 'All cloud infrastructure and database nodes reside physically inside South African borders (Johannesburg/Cape Town) with SSA clearance.', badge: 'SA SOVEREIGN' },
  { id: 4, title: 'Transparent Tariff Structure per Learner per Month', ruleText: 'Standardized national tariff of R14.50/month covers hardware lease, dual-APN LTE connectivity, C3 dispatch, and maintenance.', badge: 'R14.50/MO TARIFF' },
  { id: 5, title: 'Strict Commercial Service Level Agreement (SLA) Guarantees', ruleText: 'Enforces 99.99% core platform availability and sub-900ms SAPS dispatch API response times, backed by liquid penalty clauses.', badge: 'SLA 99.99%' },
  { id: 6, title: 'POPIA & Minor PII Commercial Data Protection', ruleText: 'Prohibits any monetization, selling, or third-party advertising usage of learner location or personal data.', badge: 'POPIA PROTECTED' },
  { id: 7, title: 'Public-Private Partnership (PPP) Co-Funding Model', ruleText: 'Enables private corporate social investment (CSI) and insurance co-sponsorship to subsidize low-income school districts.', badge: 'PPP CO-FUNDED' },
  { id: 8, title: 'Audit-Ready Electronic Funds Transfer (EFT) Invoicing', ruleText: 'Integrates directly with National Treasury Safety Web and provincial SAP financial systems for transparent auditing.', badge: 'TREASURY LINKED' },
  { id: 9, title: 'Immutable Tender Audit Trail & Anti-Corruption Controls', ruleText: 'All procurement bids, scoring criteria, and contract amendments are recorded on immutable cryptographic audit ledgers.', badge: 'ANTI-CORRUPTION' },
  { id: 10, title: 'Pan-African & International Scalability Vision', ruleText: 'Commercial model designed for seamless expansion to SADC regions and Sub-Saharan African government school safety programs.', badge: 'PAN-AFRICAN Ready' },
];
