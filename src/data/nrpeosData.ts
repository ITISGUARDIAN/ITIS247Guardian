export interface ProvincialRolloutStatus {
  provinceCode: 'GAU' | 'KZN' | 'WCP' | 'ECP' | 'FS' | 'LIM' | 'MPU' | 'NW' | 'NC';
  provinceName: string;
  regionalCommandCentre: string;
  onboardedSchools: number;
  totalSchoolsTarget: number;
  activeLearners: number;
  readinessScorePct: number;
  rolloutPhase: 'PHASE_1_LIVE' | 'PHASE_2_EXPANSION' | 'PHASE_3_STAGE' | 'PHASE_4_PREPARATION';
  provincialDirector: string;
}

export interface SchoolOnboardingRecord {
  emisNumber: string; // e.g. EMIS-70019283
  schoolName: string;
  province: string;
  schoolType: 'PUBLIC_PRIMARY' | 'PUBLIC_HIGH' | 'INDEPENDENT' | 'SPECIAL_NEEDS';
  contractSigned: boolean;
  principalTrained: boolean;
  devicesAllocated: number;
  onboardingStatus: 'GO_LIVE_CERTIFIED' | 'IN_TRAINING' | 'EMIS_VERIFICATION';
}

export interface NationalWarehouseInventory {
  warehouseId: string; // e.g. WH-JHB-CENTRAL
  location: string;
  wearableUnitsStock: number;
  nfcGateScannersStock: number;
  m2mSimCardsStock: number;
  monthlyDispatched: number;
  replenishmentStatus: 'OPTIMAL' | 'REORDER_TRIGGERED';
}

export interface ServiceDeskTicketRecord {
  ticketId: string; // e.g. TCK-2026-88102
  province: string;
  issueType: 'HARDWARE_REPLACEMENT' | 'GATE_SCANNER_OFFLINE' | 'PARENT_APP_AUTH' | 'CELLULAR_APN_DROPOUT';
  tier: 'TIER_1_DESK' | 'TIER_2_TECHNICAL' | 'TIER_3_ENGINEERING';
  severity: 'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW';
  slaResponseMinutes: number;
  status: 'RESOLVED' | 'IN_PROGRESS' | 'OPEN';
  assignedEngineer: string;
}

export interface NrpeosCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma NRPO Schema' | 'NestJS Logistics Inventory Service' | 'Enterprise Support Ticket API';
  description: string;
  code: string;
}

// SAMPLE PROVINCES STATUS
export const SAMPLE_PROVINCIAL_ROLLOUTS: ProvincialRolloutStatus[] = [
  {
    provinceCode: 'GAU',
    provinceName: 'Gauteng',
    regionalCommandCentre: 'Johannesburg Central C3 (Midrand)',
    onboardedSchools: 125,
    totalSchoolsTarget: 2200,
    activeLearners: 62500,
    readinessScorePct: 100,
    rolloutPhase: 'PHASE_1_LIVE',
    provincialDirector: 'Director Nomsa Dlamini',
  },
  {
    provinceCode: 'KZN',
    provinceName: 'KwaZulu-Natal',
    regionalCommandCentre: 'Durban Metro C3 (eThekwini)',
    onboardedSchools: 80,
    totalSchoolsTarget: 5800,
    activeLearners: 40000,
    readinessScorePct: 94,
    rolloutPhase: 'PHASE_2_EXPANSION',
    provincialDirector: 'Director Sipho Zondi',
  },
  {
    provinceCode: 'WCP',
    provinceName: 'Western Cape',
    regionalCommandCentre: 'Cape Town Metro C3 (Goodwood)',
    onboardedSchools: 60,
    totalSchoolsTarget: 1500,
    activeLearners: 30000,
    readinessScorePct: 92,
    rolloutPhase: 'PHASE_2_EXPANSION',
    provincialDirector: 'Director Jean-Luc Pieterse',
  },
  {
    provinceCode: 'ECP',
    provinceName: 'Eastern Cape',
    regionalCommandCentre: 'Gqeberha Regional C3',
    onboardedSchools: 35,
    totalSchoolsTarget: 5100,
    activeLearners: 17500,
    readinessScorePct: 88,
    rolloutPhase: 'PHASE_3_STAGE',
    provincialDirector: 'Director Vuyo Mabandla',
  },
  {
    provinceCode: 'LIM',
    provinceName: 'Limpopo',
    regionalCommandCentre: 'Polokwane Regional C3',
    onboardedSchools: 25,
    totalSchoolsTarget: 3800,
    activeLearners: 12500,
    readinessScorePct: 85,
    rolloutPhase: 'PHASE_3_STAGE',
    provincialDirector: 'Director Thabo Ramaphosa',
  },
];

// SAMPLE SCHOOL ONBOARDING
export const SAMPLE_SCHOOL_ONBOARDINGS: SchoolOnboardingRecord[] = [
  {
    emisNumber: 'EMIS-70019283',
    schoolName: 'Soweto Comprehensive Secondary',
    province: 'Gauteng',
    schoolType: 'PUBLIC_HIGH',
    contractSigned: true,
    principalTrained: true,
    devicesAllocated: 1200,
    onboardingStatus: 'GO_LIVE_CERTIFIED',
  },
  {
    emisNumber: 'EMIS-70019904',
    schoolName: 'Umlazi Technical High School',
    province: 'KwaZulu-Natal',
    schoolType: 'PUBLIC_HIGH',
    contractSigned: true,
    principalTrained: true,
    devicesAllocated: 950,
    onboardingStatus: 'GO_LIVE_CERTIFIED',
  },
  {
    emisNumber: 'EMIS-80021049',
    schoolName: 'Khayelitsha Primary Academy',
    province: 'Western Cape',
    schoolType: 'PUBLIC_PRIMARY',
    contractSigned: true,
    principalTrained: false,
    devicesAllocated: 600,
    onboardingStatus: 'IN_TRAINING',
  },
];

// SAMPLE LOGISTICS
export const SAMPLE_LOGISTICS_WAREHOUSES: NationalWarehouseInventory[] = [
  {
    warehouseId: 'WH-GAU-JHB-CENTRAL',
    location: 'Midrand Central Distribution Hub (Gauteng)',
    wearableUnitsStock: 120000,
    nfcGateScannersStock: 1500,
    m2mSimCardsStock: 250000,
    monthlyDispatched: 45000,
    replenishmentStatus: 'OPTIMAL',
  },
  {
    warehouseId: 'WH-KZN-DURBAN-PORT',
    location: 'Durban Harbor Logistics Facility (KZN)',
    wearableUnitsStock: 85000,
    nfcGateScannersStock: 900,
    m2mSimCardsStock: 180000,
    monthlyDispatched: 32000,
    replenishmentStatus: 'OPTIMAL',
  },
  {
    warehouseId: 'WH-WCP-CAPE-TOWN',
    location: 'Epping Industrial Logistics Park (Western Cape)',
    wearableUnitsStock: 45000,
    nfcGateScannersStock: 600,
    m2mSimCardsStock: 95000,
    monthlyDispatched: 18000,
    replenishmentStatus: 'OPTIMAL',
  },
];

// SAMPLE TICKETS
export const SAMPLE_SERVICE_TICKETS: ServiceDeskTicketRecord[] = [
  {
    ticketId: 'TCK-2026-88102',
    province: 'Gauteng',
    issueType: 'GATE_SCANNER_OFFLINE',
    tier: 'TIER_2_TECHNICAL',
    severity: 'P2_HIGH',
    slaResponseMinutes: 12,
    status: 'RESOLVED',
    assignedEngineer: 'Field Tech Kgosi Mokoena',
  },
  {
    ticketId: 'TCK-2026-88103',
    province: 'KwaZulu-Natal',
    issueType: 'HARDWARE_REPLACEMENT',
    tier: 'TIER_1_DESK',
    severity: 'P3_MEDIUM',
    slaResponseMinutes: 4,
    status: 'RESOLVED',
    assignedEngineer: 'Helpdesk Agent Zanele Cele',
  },
];

// CODE SPECS
export const NRPEOS_CODE_SPECS: NrpeosCodeSpec[] = [
  {
    id: 1,
    title: 'National Rollout Programme Office (NRPO) Schema',
    filename: 'prisma/schema_nrpo.prisma',
    category: 'Prisma NRPO Schema',
    description: 'Models 9-province rollout readiness, EMIS school onboarding workflows, warehouse logistics stock levels, and multi-tier support tickets.',
    code: `model ProvincialRollout {
  provinceCode         String   @id
  provinceName         String
  commandCentreName    String
  onboardedSchools     Int
  totalSchoolsTarget   Int
  activeLearners       Int
  readinessScorePct    Float
  rolloutPhase         String
  schools              SchoolOnboarding[]
}

model SchoolOnboarding {
  emisNumber           String   @id
  schoolName           String
  provinceCode         String
  schoolType           String
  contractSigned       Boolean  @default(false)
  principalTrained     Boolean  @default(false)
  devicesAllocated     Int
  onboardingStatus     String
  province             ProvincialRollout @relation(fields: [provinceCode], references: [provinceCode])
}`
  },
  {
    id: 2,
    title: 'National Logistics & Automated Inventory Replenishment Service',
    filename: 'src/modules/nrpo/services/logistics_replenishment.service.ts',
    category: 'NestJS Logistics Inventory Service',
    description: 'Calculates wearable device burn rates per province, triggering automated replenishment orders to local assembly plants.',
    code: `import { Injectable } from '@nestjs/common';

@Injectable()
export class LogisticsReplenishmentService {
  async evaluateWarehouseStock(warehouseId: string) {
    // 1. Fetch current stock and monthly dispatch velocity
    const stock = await this.getWarehouseBalance(warehouseId);
    
    // 2. Trigger auto-reorder if stock falls below 30-day burn rate
    if (stock.wearables < stock.monthlyVelocity * 1.2) {
      await this.triggerAssemblyReorder(warehouseId, stock.monthlyVelocity * 2);
      return { reorderTriggered: true, quantityOrdered: stock.monthlyVelocity * 2 };
    }

    return { reorderTriggered: false, status: 'OPTIMAL' };
  }

  private async getWarehouseBalance(id: string) {
    return { wearables: 120000, monthlyVelocity: 45000 };
  }

  private async triggerAssemblyReorder(id: string, qty: number) {
    // Dispatch purchase order to local assembly plant
  }
}`
  },
  {
    id: 3,
    title: 'National Service Desk Multi-Tier Ticket SLA Controller',
    filename: 'src/modules/nrpo/controllers/service_desk.controller.ts',
    category: 'Enterprise Support Ticket API',
    description: 'Manages Tier 1/2/3 incident escalations, field technician dispatching, and automated SLA breach warnings.',
    code: `import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ZeroTrustGuard } from '../../security/guards/zero_trust.guard';

@Controller('api/v1/nrpo/service-desk/tickets')
@UseGuards(ZeroTrustGuard)
export class ServiceDeskController {
  @Post()
  async createTicket(@Body() ticketDto: any) {
    return {
      ticketId: \`TCK-\${Date.now()}\`,
      province: ticketDto.province,
      assignedTier: ticketDto.severity === 'P1_CRITICAL' ? 'TIER_3_ENGINEERING' : 'TIER_1_DESK',
      slaTargetMinutes: ticketDto.severity === 'P1_CRITICAL' ? 15 : 60,
      status: 'OPEN_DISPATCHED',
    };
  }
}`
  }
];

// MANDATORY RULES
export const CRITICAL_NRPEOS_RULES = [
  { id: 1, title: '9-Province Standardized Command Centre Deployment', ruleText: 'Every South African province operates a dedicated 24/7 Regional Operations Command Centre (C3) compliant with national specs.', badge: '9 C3 CENTRES' },
  { id: 2, title: 'EMIS Registry Verification for School Onboarding', ruleText: 'All public, independent, and special needs schools must be verified against Department of Basic Education EMIS master database.', badge: 'EMIS VERIFIED' },
  { id: 3, title: '100% Asset Warehousing & Device Traceability', ruleText: 'Wearable devices, NFC gate scanners, and M2M SIM cards are tracked from manufacturing plant to student assignment.', badge: 'LOGISTICS OK' },
  { id: 4, title: 'Multi-Tier Service Desk SLA Enforcement', ruleText: 'Tier 1 (Helpdesk < 15m), Tier 2 (Technical < 30m), and Tier 3 (Engineering < 1h) response SLAs strictly enforced across all 9 provinces.', badge: 'SLA TIER 1-3' },
  { id: 5, title: 'National Protected Learner KPI Dashboard', ruleText: 'Real-time visibility into 12M+ protected learners, active attendance, device online ratios, and emergency response speeds.', badge: 'NATIONAL KPIS' },
  { id: 6, title: 'Cost Per Learner Financial Scaling Optimization', ruleText: 'Logistics and maintenance scaling achieves cost efficiency target of under R15 / learner / month for sustainable governance.', badge: 'R15 / LEARNER' },
  { id: 7, title: '11-Language National Parent & Public Communications', ruleText: 'Parent educational campaigns, SMS alerts, and app interfaces support all 11 official South African languages.', badge: '11 LANGUAGES' },
  { id: 8, title: 'Continuous Improvement Backlog & Quarterly Reviews', ruleText: 'Operational lessons learned, system enhancement requests, and security audits are reviewed quarterly by the Steering Committee.', badge: 'CONTINUOUS QA' },
  { id: 9, title: 'Zero Unplanned Downtime During School Hours', ruleText: 'System maintenance, software upgrades, and database failover drills must occur strictly outside active school hours (18:00 - 05:00).', badge: 'ZERO DOWNTIME' },
  { id: 10, title: 'Core Mission: Protect All 12M+ South African Learners', ruleText: 'Scale national infrastructure to provide uninterrupted, enterprise-grade safety protection for every learner in South Africa.', badge: 'CHILDSAFE NATION' },
];
