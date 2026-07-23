export interface GovernanceCommitteeRecord {
  committeeId: string; // e.g. GOV-BOARD-01
  name: string;
  chairperson: string;
  membersCount: number;
  mandateArea: 'KING_IV_GOVERNANCE' | 'AUDIT_PFMA_RISK' | 'ETHICS_CHILD_SAFETY' | 'R_AND_D_INNOVATION' | 'GOVT_LIAISON';
  meetingCadence: 'MONTHLY' | 'QUARTERLY' | 'BI_ANNUAL';
  lastResolutionCode: string;
}

export interface EnterpriseRiskHeatmapItem {
  riskId: string; // e.g. ERM-2026-08
  category: 'STRATEGIC' | 'OPERATIONAL' | 'CYBERSECURITY' | 'REGULATORY_PFMA' | 'REPUTATIONAL';
  title: string;
  likelihoodScore: number; // 1-5
  impactScore: number; // 1-5
  residualRiskRating: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  ownerRole: string;
  mitigationPlan: string;
}

export interface InnovationPatentPipelineItem {
  id: string; // e.g. PAT-2026-ZA-004
  title: string;
  leadInventor: string;
  status: 'PROVISIONAL_FILED' | 'PCT_INTERNATIONAL_SEARCH' | 'GRANTED_CIPC';
  grantDateOrFilingDate: string;
  strategicObjective: string;
}

export interface EbocgcipCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Governance Schema' | 'NestJS King IV & PFMA Audit Service' | 'Board Resolution Cryptographic Ledger API';
  description: string;
  code: string;
}

// SAMPLE GOVERNANCE COMMITTEES
export const SAMPLE_GOVERNANCE_COMMITTEES: GovernanceCommitteeRecord[] = [
  {
    committeeId: 'GOV-BOARD-01',
    name: 'Board of Directors & Executive Management Committee',
    chairperson: 'Dr. Malebo Mokoena (Non-Exec Board Chair)',
    membersCount: 9,
    mandateArea: 'KING_IV_GOVERNANCE',
    meetingCadence: 'QUARTERLY',
    lastResolutionCode: 'RES-2026-Q2-081',
  },
  {
    committeeId: 'GOV-RISK-02',
    name: 'Audit, PFMA Compliance & ERM Risk Committee',
    chairperson: 'Adv. Johan van Zyl (Independent Audit Lead)',
    membersCount: 5,
    mandateArea: 'AUDIT_PFMA_RISK',
    meetingCadence: 'MONTHLY',
    lastResolutionCode: 'RES-2026-AUD-042',
  },
  {
    committeeId: 'GOV-ETHICS-03',
    name: 'Child Safety & POPIA Ethics Advisory Board',
    chairperson: 'Prof. Nthabiseng Khumalo (Child Rights Expert)',
    membersCount: 7,
    mandateArea: 'ETHICS_CHILD_SAFETY',
    meetingCadence: 'MONTHLY',
    lastResolutionCode: 'RES-2026-ETH-019',
  },
  {
    committeeId: 'GOV-INNOVATION-04',
    name: 'R&D, Hardware Patents & AI Technology Committee',
    chairperson: 'Dr. Kevin Naidoo (Chief Technology Officer)',
    membersCount: 6,
    mandateArea: 'R_AND_D_INNOVATION',
    meetingCadence: 'MONTHLY',
    lastResolutionCode: 'RES-2026-RD-014',
  },
];

// SAMPLE ERM HEATMAP RISKS
export const SAMPLE_ERM_RISKS: EnterpriseRiskHeatmapItem[] = [
  {
    riskId: 'ERM-2026-001',
    category: 'CYBERSECURITY',
    title: 'Zero-Day Hardware Tamper or Cryptographic Key Compromise',
    likelihoodScore: 2,
    impactScore: 5,
    residualRiskRating: 'MEDIUM',
    ownerRole: 'CISO & Secure Element Lead',
    mitigationPlan: 'STSAFE-A110 EAL5+ hardware isolation, daily zero-trust key rotation, and automated A/B FOTA rollback.',
  },
  {
    riskId: 'ERM-2026-002',
    category: 'REGULATORY_PFMA',
    title: 'Provincial Department Payment Delays Beyond 30-Day Treasury Limit',
    likelihoodScore: 3,
    impactScore: 4,
    residualRiskRating: 'HIGH',
    ownerRole: 'Chief Financial Officer (CFO)',
    mitigationPlan: 'Direct integration with National Treasury Safety Web and working capital liquidity reserve fund.',
  },
  {
    riskId: 'ERM-2026-003',
    category: 'OPERATIONAL',
    title: 'Cellular Tower Outages in Remote Rural Quintile 1 School Clusters',
    likelihoodScore: 3,
    impactScore: 3,
    residualRiskRating: 'MEDIUM',
    ownerRole: 'Chief Operations Officer (COO)',
    mitigationPlan: 'Multi-operator eSIM roaming failover (MTN, Vodacom, Telkom, Cell C) and satellite mesh fallback.',
  },
];

// SAMPLE PATENTS & INNOVATION PIPELINE
export const SAMPLE_PATENTS: InnovationPatentPipelineItem[] = [
  {
    id: 'PAT-2026-ZA-001',
    title: 'Dual-APN Low-Power Cellular Geo-Corridor Fallback Architecture',
    leadInventor: 'Dr. Kevin Naidoo (CTO)',
    status: 'GRANTED_CIPC',
    grantDateOrFilingDate: '2026-01-15',
    strategicObjective: 'Protect core ITIS GPS wearable IP across South Africa and SADC regions.',
  },
  {
    id: 'PAT-2026-ZA-002',
    title: 'Anti-Tamper Optical Mesh Fiber-Embedded Wristband Seal',
    leadInventor: 'Eng. David van der Merwe (Lead Mechanical Eng)',
    status: 'PCT_INTERNATIONAL_SEARCH',
    grantDateOrFilingDate: '2026-03-22',
    strategicObjective: 'Ensure immediate optical circuit rupture detection on forced removal.',
  },
  {
    id: 'PAT-2026-ZA-003',
    title: 'Sub-900ms Automated SAPS CAD Multi-Agency Emergency Dispatch Gateway',
    leadInventor: 'Thandi Nkosi (Principal AI Architect)',
    status: 'PROVISIONAL_FILED',
    grantDateOrFilingDate: '2026-05-10',
    strategicObjective: 'Real-time incident streaming to police flying squad vehicles with zero human delay.',
  },
];

// CODE SPECS
export const EBOCGCIP_CODE_SPECS: EbocgcipCodeSpec[] = [
  {
    id: 1,
    title: 'King IV & PFMA Corporate Governance Prisma Schema',
    filename: 'prisma/schema_governance.prisma',
    category: 'Prisma Governance Schema',
    description: 'Models board resolutions, ERM risk heatmaps, King IV compliance audits, employee security clearance records, and ESG indicators.',
    code: `model BoardResolution {
  resolutionCode      String   @id
  committeeId         String
  resolutionTitle     String
  approvedByChair     Boolean  @default(true)
  sha256ProofHash     String   @unique
  passedAt            DateTime @default(now())
  kingIvPrincipleCode String
  meeting             GovernanceCommittee @relation(fields: [committeeId], references: [committeeId])
}

model EnterpriseRisk {
  riskId              String   @id
  category            String
  likelihood          Int
  impact              Int
  residualRating      String
  mitigationPlan      String
  ownerRole           String
  lastReviewedAt      DateTime @default(now())
}`
  },
  {
    id: 2,
    title: 'NestJS King IV & PFMA Governance Audit Service',
    filename: 'src/modules/governance/services/governance_audit.service.ts',
    category: 'NestJS King IV & PFMA Audit Service',
    description: 'Verifies board resolution signatures, segregation of duties, and King IV Principle 1-17 compliance scores.',
    code: `import { Injectable, ForbiddenException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class GovernanceAuditService {
  async recordBoardResolution(committeeId: string, title: string, proposerRole: string, approverRole: string) {
    // 1. Mandatory Segregation of Duties Check
    if (proposerRole === approverRole) {
      throw new ForbiddenException('King IV Defect: Segregation of duties violation - Proposer cannot self-approve.');
    }

    // 2. Generate Cryptographic Proof
    const sha256Hash = crypto.createHash('sha256').update(\`\${committeeId}-\${title}-\${Date.now()}\`).digest('hex');

    return {
      resolutionCode: \`RES-\${Date.now()}\`,
      status: 'CRYPTOGRAPHICALLY_PASSED',
      sha256ProofHash: sha256Hash,
      pfmaSection38Validated: true,
      kingIvPrincipleCompliance: 'COMPLIANT_KING_IV',
    };
  }
}`
  },
  {
    id: 3,
    title: 'Immutable Board Resolution Cryptographic Ledger API',
    filename: 'src/modules/governance/controllers/board_resolution.controller.ts',
    category: 'Board Resolution Cryptographic Ledger API',
    description: 'REST controller providing immutable board decision tracking and Auditor-General inspection endpoints.',
    code: `import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ZeroTrustGuard } from '../../security/guards/zero_trust.guard';

@Controller('api/v1/governance/resolutions')
@UseGuards(ZeroTrustGuard)
export class BoardResolutionController {
  @Get('audit-trail')
  async getGovernanceAuditTrail() {
    return {
      governanceStatus: 'KING_IV_100%_COMPLIANT',
      pfmaComplianceStatus: 'CLEAN_AUDIT_OPINION',
      esgRating: 'AAA_EXCELLENT',
      totalResolutionsPassed: 184,
      lastAuditedAt: new Date().toISOString(),
    };
  }
}`
  }
];

// MANDATORY RULES
export const CRITICAL_EBOCGCIP_RULES = [
  { id: 1, title: 'King IV & Companies Act (RSA) Governance Alignment', ruleText: 'All corporate structures, board committees, and executive mandates strictly align with King IV Principles 1–17 and Companies Act 71 of 2008.', badge: 'KING IV COMPLIANT' },
  { id: 2, title: 'Strict Segregation of Duties & Dual Approval Gates', ruleText: 'Strategic financial, technical, or child safety decisions require dual non-executive and executive board member approval.', badge: 'DUAL APPROVAL' },
  { id: 3, title: 'Immutable SHA-256 Board Resolution Cryptographic Audit', ruleText: 'Every board resolution, policy change, and procurement contract is cryptographically signed and stored in an immutable audit ledger.', badge: 'SHA-256 RESOLUTION' },
  { id: 4, title: 'Annual Independent Auditor-General & ISO Audits', ruleText: 'Enforces mandatory annual external audits for ISO 27001, ISO 22301, ISO 9001, and Auditor-General PFMA reviews.', badge: 'INDEPENDENT AUDIT' },
  { id: 5, title: 'Quarterly Enterprise Risk Management (ERM) Heatmaps', ruleText: 'Risk Committee conducts mandatory quarterly ERM heat map reviews spanning cyber, financial, legal, and operational vectors.', badge: 'QUARTERLY ERM' },
  { id: 6, title: 'Continuous SITA, POPIA & Treasury Compliance Monitoring', ruleText: 'Automated compliance engines continuously verify zero international PII egress and 100% Treasury Practice Note compliance.', badge: 'CONTINUOUS COMPLIANCE' },
  { id: 7, title: 'Mandatory State Security Agency (SSA) Employee Vetting', ruleText: '100% of employees, C3 operators, and field technicians undergo mandatory background vetting and clearance.', badge: 'SSA VETTING' },
  { id: 8, title: 'R&D Patent Portfolio & CIPC Intellectual Property Defense', ruleText: 'All technical innovations, PCB designs, and AI dispatch algorithms are registered with CIPC and protected internationally.', badge: 'CIPC PATENTS' },
  { id: 9, title: 'Executive OKR Accountability & Balanced Scorecard', ruleText: 'Executive compensation and performance metrics are directly bound to learner safety SLAs, zero data breaches, and clean PFMA audits.', badge: 'SCORECARD BOUND' },
  { id: 10, title: 'ESG & Corporate Sustainability Commitment', ruleText: 'Dedicated to Level 1 BBBEE, 40%+ local SA manufacturing, youth employment, and carbon-neutral green datacenter operations.', badge: 'ESG LEVEL 1' },
];
