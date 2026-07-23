export interface PilotPhaseMilestone {
  phaseId: string; // e.g. PHASE-1-GAUTENG-5
  phaseName: string;
  targetSchools: number;
  targetLearners: number;
  targetDevices: number;
  startDate: string;
  completionPct: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'SCHEDULED';
  oatSignoffStatus: 'SIGNED_OFF' | 'IN_OAT_TESTING' | 'PENDING';
}

export interface AssetDeploymentRecord {
  assetId: string; // e.g. WRB-GAU-00104
  assetType: 'WEARABLE_GPS_V4' | 'GATE_NFC_SCANNER' | 'SCHOOL_ADMIN_TABLET' | 'MTN_SAPS_APN_SIM';
  assignedSchool: string;
  serialNumber: string;
  batteryHealthPct: number;
  simStatus: 'ACTIVATED' | 'PROVISIONING';
  lifecycleState: 'DEPLOYED_ACTIVE' | 'IN_MAINTENANCE' | 'WAREHOUSE_RESERVE';
}

export interface StakeholderReadinessRecord {
  stakeholderGroup: 'DEPARTMENT_OF_BASIC_EDUCATION' | 'GAUTENG_DEPT_OF_EDUCATION' | 'SAPS_TACTICAL_UNITS' | 'PARENTS_COUNCIL' | 'SCHOLAR_TRANSPORT_ASSOC';
  contactPerson: string;
  trainingCompletionPct: number;
  oatAcceptanceSigned: boolean;
  readinessScorePct: number;
}

export interface PilotRiskRecord {
  riskId: string; // e.g. RSK-PILOT-001
  category: 'SUPPLY_CHAIN_CHIPS' | 'NETWORK_CELLULAR_DEAD_ZONES' | 'STAKEHOLDER_ADOPTION' | 'COMMUNITY_COMMUNICATION';
  description: string;
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  mitigationStrategy: string;
  riskOwner: string;
  residualRisk: 'ACCEPTED_LOW' | 'MANAGED';
}

export interface NpdoapmCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma PMO Schema' | 'NestJS Asset Tracking Service' | 'OAT Acceptance Controller';
  description: string;
  code: string;
}

// SAMPLE PILOT PHASES
export const SAMPLE_PILOT_PHASES: PilotPhaseMilestone[] = [
  {
    phaseId: 'PHASE-1-GAUTENG-PILOT',
    phaseName: 'Phase 1: Gauteng Initial Pilot (5 Core Schools)',
    targetSchools: 5,
    targetLearners: 2500,
    targetDevices: 2500,
    startDate: '2026-05-01',
    completionPct: 100,
    status: 'COMPLETED',
    oatSignoffStatus: 'SIGNED_OFF',
  },
  {
    phaseId: 'PHASE-2-GAUTENG-EXPANSION',
    phaseName: 'Phase 2: Gauteng Secondary Expansion (20 Schools)',
    targetSchools: 20,
    targetLearners: 10000,
    targetDevices: 10000,
    startDate: '2026-06-15',
    completionPct: 88,
    status: 'IN_PROGRESS',
    oatSignoffStatus: 'IN_OAT_TESTING',
  },
  {
    phaseId: 'PHASE-3-PROVINCIAL-METRO',
    phaseName: 'Phase 3: Gauteng Metro Expansion (100 Schools)',
    targetSchools: 100,
    targetLearners: 50000,
    targetDevices: 50000,
    startDate: '2026-09-01',
    completionPct: 15,
    status: 'SCHEDULED',
    oatSignoffStatus: 'PENDING',
  },
  {
    phaseId: 'PHASE-4-NATIONAL-9-PROVINCES',
    phaseName: 'Phase 4: Full National 9-Province Deployment (25,000 Schools)',
    targetSchools: 25000,
    targetLearners: 12000000,
    targetDevices: 12000000,
    startDate: '2027-01-15',
    completionPct: 0,
    status: 'SCHEDULED',
    oatSignoffStatus: 'PENDING',
  },
];

// SAMPLE ASSETS
export const SAMPLE_ASSET_DEPLOYMENTS: AssetDeploymentRecord[] = [
  {
    assetId: 'AST-WRB-GAU-9901',
    assetType: 'WEARABLE_GPS_V4',
    assignedSchool: 'Soweto High School (Gauteng)',
    serialNumber: 'SN-WRB4-2026-09182',
    batteryHealthPct: 98,
    simStatus: 'ACTIVATED',
    lifecycleState: 'DEPLOYED_ACTIVE',
  },
  {
    assetId: 'AST-NFC-GATE-004',
    assetType: 'GATE_NFC_SCANNER',
    assignedSchool: 'Soweto High School (Gauteng)',
    serialNumber: 'SN-NFC-GATE-40912',
    batteryHealthPct: 100,
    simStatus: 'ACTIVATED',
    lifecycleState: 'DEPLOYED_ACTIVE',
  },
  {
    assetId: 'AST-TAB-ADMIN-012',
    assetType: 'SCHOOL_ADMIN_TABLET',
    assignedSchool: 'Pretoria West Primary',
    serialNumber: 'SN-TAB-SEC-11029',
    batteryHealthPct: 92,
    simStatus: 'ACTIVATED',
    lifecycleState: 'DEPLOYED_ACTIVE',
  },
];

// SAMPLE STAKEHOLDERS
export const SAMPLE_STAKEHOLDER_READINESS: StakeholderReadinessRecord[] = [
  {
    stakeholderGroup: 'DEPARTMENT_OF_BASIC_EDUCATION',
    contactPerson: 'Director-General Dr. Mkhize',
    trainingCompletionPct: 100,
    oatAcceptanceSigned: true,
    readinessScorePct: 98,
  },
  {
    stakeholderGroup: 'GAUTENG_DEPT_OF_EDUCATION',
    contactPerson: 'MEC Matome Chiloane',
    trainingCompletionPct: 100,
    oatAcceptanceSigned: true,
    readinessScorePct: 100,
  },
  {
    stakeholderGroup: 'SAPS_TACTICAL_UNITS',
    contactPerson: 'Brigadier General Ndlovu',
    trainingCompletionPct: 95,
    oatAcceptanceSigned: true,
    readinessScorePct: 96,
  },
  {
    stakeholderGroup: 'PARENTS_COUNCIL',
    contactPerson: 'SANPC Chairperson Mrs. Khumalo',
    trainingCompletionPct: 92,
    oatAcceptanceSigned: true,
    readinessScorePct: 94,
  },
];

// SAMPLE RISKS
export const SAMPLE_PILOT_RISKS: PilotRiskRecord[] = [
  {
    riskId: 'RSK-PILOT-001',
    category: 'NETWORK_CELLULAR_DEAD_ZONES',
    description: 'Cellular network coverage gaps in rural school perimeters during telemetry transmission',
    severity: 'HIGH',
    mitigationStrategy: 'Deploys dual e-SIM failover (MTN + Vodacom APN) + satellite telemetry backup',
    riskOwner: 'Telecommunications Lead Sipho Dlamini',
    residualRisk: 'MANAGED',
  },
  {
    riskId: 'RSK-PILOT-002',
    category: 'STAKEHOLDER_ADOPTION',
    description: 'Initial parent hesitation regarding wearable device battery charging discipline',
    severity: 'MEDIUM',
    mitigationStrategy: 'Automated SMS reminders & multi-device charging dock stations provided at schools',
    riskOwner: 'Community Relations Officer Lerato Sebele',
    residualRisk: 'ACCEPTED_LOW',
  },
];

// CODE SPECS
export const NPDOAPM_CODE_SPECS: NpdoapmCodeSpec[] = [
  {
    id: 1,
    title: 'Programme Management Office (PMO) Data Model',
    filename: 'prisma/schema_pmo.prisma',
    category: 'Prisma PMO Schema',
    description: 'Models pilot rollout milestones, asset custody lifecycles, stakeholder training certifications, and formal OAT sign-off records.',
    code: `model PilotPhase {
  id               String   @id @default(uuid())
  phaseName        String
  targetSchools    Int
  targetLearners   Int
  completionPct    Float
  oatSignedOff     Boolean  @default(false)
  signedOffBy      String?
  signedAt         DateTime?
  assetsDeployed   AssetDeployment[]
}

model AssetDeployment {
  id               String   @id @default(uuid())
  serialNumber     String   @unique
  assetType        String
  assignedSchool   String
  lifecycleState   String
  pilotPhaseId     String
  pilotPhase       PilotPhase @relation(fields: [pilotPhaseId], references: [id])
}`
  },
  {
    id: 2,
    title: 'Asset Lifecycle & Telemetry Provisioning Service',
    filename: 'src/modules/pmo/services/asset_tracker.service.ts',
    category: 'NestJS Asset Tracking Service',
    description: 'Tracks wearable device assignment, SIM APN binding, gate scanner battery health, and warranty audit histories.',
    code: `import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AssetTrackerService {
  async registerAssetDeployment(assetDto: any) {
    // 1. Verify mTLS SIM binding with MTN/Vodacom APN
    const simBinding = await this.verifyApnBinding(assetDto.serialNumber);
    if (!simBinding.active) {
      throw new Error('APN binding failed for asset deployment');
    }

    return {
      assetId: assetDto.assetId,
      assignedSchool: assetDto.assignedSchool,
      status: 'DEPLOYED_ACTIVE',
    };
  }

  private async verifyApnBinding(serialNumber: string) {
    return { active: true, apn: 'itis.gov.za.secure' };
  }
}`
  },
  {
    id: 3,
    title: 'Operational Acceptance Testing (OAT) Sign-Off API Controller',
    filename: 'src/modules/pmo/controllers/oat_signoff.controller.ts',
    category: 'OAT Acceptance Controller',
    description: 'Provides REST endpoints for government authorities and SAPS leadership to execute cryptographic OAT sign-offs.',
    code: `import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ZeroTrustGuard } from '../../security/guards/zero_trust.guard';

@Controller('api/v1/pmo/oat-signoff')
@UseGuards(ZeroTrustGuard)
export class OatSignoffController {
  @Post()
  async executeSignoff(@Body() payload: { phaseId: string; authority: string; signatureHash: string }) {
    return {
      phaseId: payload.phaseId,
      status: 'OAT_ACCEPTED_GO_FOR_EXPANSION',
      timestamp: new Date().toISOString(),
      cryptographicSeal: payload.signatureHash,
    };
  }
}`
  }
];

// MANDATORY RULES
export const CRITICAL_NPDOAPM_RULES = [
  { id: 1, title: 'No Expansion Without Formal OAT Sign-Off', ruleText: 'Expansion to subsequent pilot phases requires 100% formal Operational Acceptance Testing (OAT) sign-off by DBE, SAPS, and Provincial Education leadership.', badge: 'OAT MANDATORY' },
  { id: 2, title: '100% Asset Custody Lifecycle Traceability', ruleText: 'Every wearable device, SIM card, NFC gate scanner, and admin tablet is tracked from factory inventory to student assignment.', badge: 'ASSET TRACKING' },
  { id: 3, title: 'Role-Based Stakeholder Training Certification', ruleText: 'All school principals, teachers, parents, and C3 operators must complete competency training before school activation.', badge: 'TRAINING REQD' },
  { id: 4, title: 'Gauteng Pilot Phase 1 & 2 Validation Baseline', ruleText: 'Phase 1 (5 schools / 2,500 learners) and Phase 2 (20 schools / 10,000 learners) establish empirical SLAs for national expansion.', badge: 'GAUTENG BASELINE' },
  { id: 5, title: 'Sub-1.5s Emergency Response OAT Verification', ruleText: 'Live operational testing verifies panic SOS to SAPS vehicle dispatch within 1.5 seconds in real school conditions.', badge: 'OAT <1.5s' },
  { id: 6, title: 'Dual-APN Cellular & Satellite Coverage Failover', ruleText: 'Wearable devices enforce dual MTN/Vodacom private APNs to guarantee zero telemetry dropouts in low-signal areas.', badge: 'DUAL APN' },
  { id: 7, title: 'Comprehensive Risk Mitigation & Contingency', ruleText: 'All supply chain, cellular coverage, and adoption risks are assigned owners with active mitigation playbooks.', badge: 'RISK MANAGED' },
  { id: 8, title: 'Executive PMO Governance & Budget Auditability', ruleText: 'Weekly Steering Committee decision logs, budget allocations, and milestone completions are immutably audited.', badge: 'PMO AUDITED' },
  { id: 9, title: 'Provincial to National Expansion Blueprint', ruleText: 'Verified blueprint guides rollout from Gauteng to remaining 8 provinces (KZN, Western Cape, Eastern Cape, etc.).', badge: '9 PROVINCES' },
  { id: 10, title: 'Core Mission: Operational Excellence for Child Safety', ruleText: 'Ensures that national child protection infrastructure operates with zero operational failures during real emergencies.', badge: 'CHILDSAFE OPERATIONAL' },
];
