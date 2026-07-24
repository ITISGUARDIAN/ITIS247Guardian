export interface ModuleSummaryRecord {
  promptCode?: string;
  title: string;
  purpose: string;
  dependencies: string[];
  keyApis: string[];
  securityControls: string;
  nationalKpis: string;
}

export interface NationalRolloutPhase {
  phaseName: string; // e.g. Phase 1: Metro Pilot & Safety Corridors
  timeframe: string; // e.g. Q3 2026 - Q4 2026
  targetProvinces: string[];
  targetLearnersCount: number;
  hardwareDevicesCount: number;
  capexAllocatedZar: number;
  opexAllocatedZar: number;
  keyMilestones: string[];
}

export interface TenYearFinancialProjection {
  year: number; // e.g. 2026, 2027... 2035
  activeLearnersCount: number;
  annualRevenueZar: number; // Tariff x learners x 12
  capexZar: number;
  opexZar: number;
  ebitdaZar: number;
  cumulativeCashFlowZar: number;
}

export interface MebimCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Capstone Master Schema' | 'NestJS Master Executive Intelligence Gateway' | 'National Cabinet Audit & Compliance Ledger API';
  description: string;
  code: string;
}

// SAMPLE CONSOLIDATED MODULES INDEX (P017 - P049)
export const CONSOLIDATED_MODULES_INDEX: ModuleSummaryRecord[] = [
  {
    promptCode: '',
    title: 'Identity & Access Management (IAM) & School Hierarchy',
    purpose: 'Zero-trust RBAC for DBE, SAPS, SITA, teachers, parents, and emergency response teams.',
    dependencies: ['SITA Sovereign Cloud', 'Firebase Auth'],
    keyApis: ['POST /api/v1/iam/roles/grant', 'GET /api/v1/iam/user/clearance'],
    securityControls: 'AES-256-GCM, mTLS, MFA via SAPS OTP',
    nationalKpis: '100% SSA cleared role grants across 24,000 schools',
  },
  {
    promptCode: '',
    title: 'Autonomous Real-Time GPS Wearable Telemetry & Geofencing Engine',
    purpose: 'Sub-900ms child location streaming, safe corridor boundary verification, and optical tamper alert routing.',
    dependencies: ['Nordic nRF9160 LTE-M', 'u-blox MAX-M10S GNSS'],
    keyApis: ['POST /api/v1/telemetry/ingest', 'GET /api/v1/geofence/corridors'],
    securityControls: 'STSAFE-A110 EAL5+ hardware crypto token signing',
    nationalKpis: '99.999% GPS corridor breach detection under 250ms',
  },
  {
    promptCode: '',
    title: 'SAPS CAD Multi-Agency Automated Dispatch Gateway',
    purpose: 'Direct API bridge to 10111 Flying Squad patrol vehicles, Metro Police, and armed private security units.',
    dependencies: ['SAPS C3 Gateway', 'SITA Government Bus'],
    keyApis: ['POST /api/v1/dispatch/cad/trigger', 'GET /api/v1/dispatch/patrols/nearby'],
    securityControls: 'State Security Agency (SSA) mTLS tunnel',
    nationalKpis: 'Sub-900ms SAPS vehicle CAD ticket generation',
  },
  {
    promptCode: '',
    title: 'Hardware Wearable Engineering & ICASA / NRCS Certification',
    purpose: '38x34x11.2mm IP68 child safety tracker with 48h battery, UN38.3 compliance, and ICASA Type Approval.',
    dependencies: ['Bosch BMA400', 'STSAFE-A110', 'nRF9160'],
    keyApis: ['POST /api/v1/hardware/factory/provision', 'GET /api/v1/hardware/tac/verify'],
    securityControls: 'Optical anti-tamper wristband mesh circuit',
    nationalKpis: '100k+ batch yield rate > 99.8% in Gauteng/Durban plants',
  },
  {
    promptCode: '',
    title: 'Commercial Launch & Government Procurement Package',
    purpose: 'R14.50 monthly tariff structure, DBE/SITA tender dossiers, and PFMA/MFMA Treasury approval models.',
    dependencies: ['National Treasury Safety Web', 'DBE SITA Bus'],
    keyApis: ['POST /api/v1/commercial/treasury/invoice', 'GET /api/v1/commercial/tender/audit'],
    securityControls: 'PFMA Section 38 cryptographic audit trail',
    nationalKpis: '100% PFMA compliance with Level 1 BBBEE contributorship',
  },
  {
    promptCode: '',
    title: 'Enterprise Business Operations & King IV Corporate Governance',
    purpose: 'Decadal enterprise operating model, King IV board committees, ERM risk heatmaps, CIPC patents, and ESG.',
    dependencies: ['CIPC Patent Registry', 'State Security Agency'],
    keyApis: ['POST /api/v1/governance/resolutions/sign', 'GET /api/v1/governance/erm/heatmap'],
    securityControls: 'Dual-approval segregation of duties & SHA-256 board ledger',
    nationalKpis: 'Zero non-conformances in ISO 27001, 22301, and 9001 audits',
  },
];

// SAMPLE NATIONAL 5-PHASE MASTER ROLLOUT PLAN
export const NATIONAL_ROLLOUT_MASTER_PLAN: NationalRolloutPhase[] = [
  {
    phaseName: 'Phase 1: High-Risk Metro Corridors & Factory Qualification',
    timeframe: 'Q3 2026 - Q4 2026',
    targetProvinces: ['Gauteng', 'KwaZulu-Natal', 'Western Cape'],
    targetLearnersCount: 500000,
    hardwareDevicesCount: 500000,
    capexAllocatedZar: 165000000, // R165M
    opexAllocatedZar: 43500000, // R43.5M
    keyMilestones: [
      'Commission Durban & Gauteng 100% solar manufacturing plants',
      'Deploy 500k wearables across Soweto, eThekwini, and Cape Flats schools',
      'Establish primary SAPS Flying Squad C3 CAD gateway link',
    ],
  },
  {
    phaseName: 'Phase 2: Provincial Expansion & Rural Quintile 1-3 Schools',
    timeframe: 'Q1 2027 - Q4 2027',
    targetProvinces: ['Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga'],
    targetLearnersCount: 3500000,
    hardwareDevicesCount: 3500000,
    capexAllocatedZar: 1155000000, // R1.155B
    opexAllocatedZar: 304500000, // R304.5M
    keyMilestones: [
      'Expand eSIM quad-operator roaming across MTN, Vodacom, Telkom, Cell C',
      'Integrate 12,000 rural primary schools with parent alert mesh',
      'Achieve 100% PFMA Treasury audit compliance across 7 provincial departments',
    ],
  },
  {
    phaseName: 'Phase 3: Full National Coverage & Pan-African SADC Readiness',
    timeframe: 'Q1 2028 - Q4 2029',
    targetProvinces: ['All 9 South African Provinces'],
    targetLearnersCount: 12400000,
    hardwareDevicesCount: 12400000,
    capexAllocatedZar: 2937000000, // R2.937B
    opexAllocatedZar: 1078800000, // R1.0788B
    keyMilestones: [
      'Protect 100% of 12.4M South African school learners',
      'Maintain sub-900ms emergency SAPS dispatch across 24,000 schools',
      'Initiate SADC regional child safety pilot in Namibia, Botswana, and Mozambique',
    ],
  },
];

// SAMPLE 10-YEAR FINANCIAL MODEL
export const TEN_YEAR_FINANCIAL_PROJECTIONS: TenYearFinancialProjection[] = [
  { year: 2026, activeLearnersCount: 500000, annualRevenueZar: 87000000, capexZar: 165000000, opexZar: 43500000, ebitdaZar: 43500000, cumulativeCashFlowZar: -121500000 },
  { year: 2027, activeLearnersCount: 4000000, annualRevenueZar: 696000000, capexZar: 1155000000, opexZar: 304500000, ebitdaZar: 391500000, cumulativeCashFlowZar: -885000000 },
  { year: 2028, activeLearnersCount: 8500000, annualRevenueZar: 1479000000, capexZar: 1485000000, opexZar: 646000000, ebitdaZar: 833000000, cumulativeCashFlowZar: -1288000000 },
  { year: 2029, activeLearnersCount: 12400000, annualRevenueZar: 2157600000, capexZar: 1287000000, opexZar: 942400000, ebitdaZar: 1215200000, cumulativeCashFlowZar: -1359800000 },
  { year: 2030, activeLearnersCount: 12400000, annualRevenueZar: 2157600000, capexZar: 150000000, opexZar: 942400000, ebitdaZar: 1215200000, cumulativeCashFlowZar: -294600000 },
  { year: 2031, activeLearnersCount: 12400000, annualRevenueZar: 2157600000, capexZar: 150000000, opexZar: 942400000, ebitdaZar: 1215200000, cumulativeCashFlowZar: 920600000 }, // Break-even achieved & positive cash
  { year: 2032, activeLearnersCount: 12400000, annualRevenueZar: 2157600000, capexZar: 150000000, opexZar: 942400000, ebitdaZar: 1215200000, cumulativeCashFlowZar: 2135800000 },
];

// CODE SPECS
export const MEBIM_CODE_SPECS: MebimCodeSpec[] = [
  {
    id: 1,
    title: 'National Capstone Master Ecosystem Prisma Data Model',
    filename: 'prisma/schema_capstone_master.prisma',
    category: 'Prisma Capstone Master Schema',
    description: 'Unified capstone data layer consolidating learners, hardware IMEI, SAPS CAD tickets, provincial billing ledgers, and King IV board audit logs.',
    code: `model NationalLearnerSafetyRecord {
  learnerId           String   @id @default(uuid())
  saNationalId        String   @unique
  schoolEmisCode      String
  wearableImei        String   @unique
  currentStatus       String   @default("SAFE_AT_SCHOOL")
  lastKnownLat        Float?
  lastKnownLng        Float?
  lastTelemetryTime   DateTime
  provincialCode      String
  parentMobileNumber  String
  school              School   @relation(fields: [schoolEmisCode], references: [emisCode])
}

model NationalCadIncident {
  incidentTicketId    String   @id @default(uuid())
  learnerId           String
  sapsCadTicketRef    String   @unique
  triggerEvent        String   @default("PANIC_BUTTON_PRESSED")
  responderVehicleId  String?
  dispatchLatencyMs   Int
  resolvedAt          DateTime?
  evidenceHashSha256  String
}`
  },
  {
    id: 2,
    title: 'NestJS Executive Cabinet & Board Master Intelligence Service',
    filename: 'src/modules/capstone/services/master_executive.service.ts',
    category: 'NestJS Master Executive Intelligence Gateway',
    description: 'Consolidates real-time national statistics across 12.4M learners, 24,000 schools, sub-900ms CAD dispatch rates, and R2.15B ARR tariff streams.',
    code: `import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterExecutiveService {
  async getNationalCabinetDashboardSummary() {
    return {
      nationalTargetLearners: 12400000,
      activeProtectedLearners: 500000,
      registeredSchools: 24000,
      sapsCadDispatchUptimePct: 99.999,
      averageEmergencyDispatchMs: 640, // sub-900ms SLA
      monthlyTariffZar: 14.50,
      annualContractValueZar: 2157600000, // R2.157 Billion
      kingIvGovernanceRating: '100%_COMPLIANT',
      pfmaAuditOpinion: 'CLEAN_AUDIT',
      bbbeeLevel: 'LEVEL_1_CONTRIBUTOR',
      dataSovereigntyStatus: 'SOUTH_AFRICA_IN_COUNTRY_SITA_PASSED',
      timestamp: new Date().toISOString(),
    };
  }
}`
  },
  {
    id: 3,
    title: 'National Cabinet Audit & Compliance Ledger REST Controller',
    filename: 'src/modules/capstone/controllers/cabinet_audit.controller.ts',
    category: 'National Cabinet Audit & Compliance Ledger API',
    description: 'Auditor-General and Cabinet endpoint serving immutable verification proof for all 33 completed system modules.',
    code: `import { Controller, Get, UseGuards } from '@nestjs/common';
import { MasterExecutiveService } from '../services/master_executive.service';

@Controller('api/v1/capstone/cabinet-audit')
export class CabinetAuditController {
  constructor(private readonly masterExecService: MasterExecutiveService) {}

  @Get('full-dossier')
  async getMasterBlueprintDossier() {
    const summary = await this.masterExecService.getNationalCabinetDashboardSummary();
    return {
      title: 'ITIS Master Enterprise Blueprint & National Implementation Master Plan',
      governingAuthority: 'Republic of South Africa - Inter-Ministerial Child Safety Taskforce',
      moduleCoverage: 'Prompts 017 to 050 Complete',
      nationalKpiSummary: summary,
      securityClearanceLevel: 'TOP_SECRET_CABINET_APPROVED',
    };
  }
}`
  }
];

// MANDATORY RULES
export const CRITICAL_MEBIM_RULES = [
  { id: 1, title: 'Consolidated Single Source of Truth Architecture', ruleText: 'Consolidates Prompts 017–050 into one unified national enterprise architecture with strict cross-module traceability.', badge: 'SINGLE TRUTH' },
  { id: 2, title: 'Architectural Consistency & End-to-End Traceability', ruleText: 'Guarantees seamless alignment between strategic Cabinet objectives, hardware BOM, NestJS APIs, and King IV governance.', badge: 'TRACEABLE' },
  { id: 3, title: 'Compliance with South African Law & King IV Standards', ruleText: 'Fully compliant with POPIA, PFMA Section 38, MFMA, Cybercrimes Act, Companies Act 71 of 2008, and King IV Principles.', badge: 'SA LAWS' },
  { id: 4, title: 'Clear 5-Phase National Implementation Milestones', ruleText: 'Enforces structured deployment phases with measurable KPIs for Gauteng, KZN, Western Cape, and all 9 RSA provinces.', badge: '5 PHASES' },
  { id: 5, title: 'Audience Separation across Strategic, Ops & Technical Tiers', ruleText: 'Maintains tailored views for Cabinet Ministers, SAPS Command Supervisors, Financial Investors, and DevSecOps Engineers.', badge: 'MULTI AUDIENCE' },
  { id: 6, title: 'Standardized Terminology & Data Schema Indexing', ruleText: 'Enforces unified naming conventions, EMIS school codes, IMEI device tags, and SAPS CAD ticket identifiers.', badge: 'STANDARDIZED' },
  { id: 7, title: 'Traceable Strategic Alignment to National Development Plan', ruleText: 'Directly advances the RSA National Development Plan 2030 goals for child safety, violence prevention, and youth job creation.', badge: 'NDP 2030' },
  { id: 8, title: 'Measurable National Child Safety Impact Metrics', ruleText: 'Targeting 90%+ reduction in school route abductions and sub-900ms emergency police dispatch for 12.4M learners.', badge: 'SUB-900MS CAD' },
  { id: 9, title: 'Cabinet & Investor Document Expansion Engine', ruleText: 'Outputs production-ready documentation structures suitable for immediate export into white papers and parliamentary filings.', badge: 'PARLIAMENT READY' },
  { id: 10, title: 'Scalable Pan-African & SADC Expansion Roadmap', ruleText: 'Architected as a resilient, sovereign child safety platform capable of rapid deployment across SADC and Sub-Saharan Africa.', badge: 'SADC READY' },
];
