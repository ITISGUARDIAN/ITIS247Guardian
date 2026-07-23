export type EvidenceCategory =
  | 'GPS_TELEMETRY'
  | 'GEOFENCE_EVENT'
  | 'DEVICE_HARDWARE'
  | 'AI_PREDICTION'
  | 'DECISION_ENGINE'
  | 'INCIDENT_ORCHESTRATION'
  | 'DISPATCH_LOG'
  | 'NOTIFICATION_COMMUNICATION'
  | 'OPERATOR_AUDIT'
  | 'AUTHENTICATION_SECURITY';

export type IntegrityStatus = 'VERIFIED_INTACT' | 'CORRUPTED' | 'TAMPERED' | 'SEALED';

export interface ChainOfCustodyEntry {
  id: string;
  evidenceId: string;
  timestamp: string;
  collector: string;
  previousCustodian: string;
  currentCustodian: string;
  transferReason: string;
  sha256Hash: string;
  digitalSignature: string;
  verificationStatus: IntegrityStatus;
}

export interface EvidenceItem {
  id: string; // e.g. EVD-2026-GP-000088
  incidentId: string; // e.g. ITIS-2026-GP-00000045
  learnerId: string;
  learnerName: string;
  category: EvidenceCategory;
  collectorName: string;
  timestamp: string;
  description: string;
  sha256Hash: string;
  digitalSignature: string;
  merkleRootHash: string;
  integrityStatus: IntegrityStatus;
  storageLocation: string;
  custodyEntries: ChainOfCustodyEntry[];
}

export interface ForensicTimelinePoint {
  secondOffset: number; // e.g. 0, 15, 30, 45, 60...
  timestamp: string;
  lat: number;
  lng: number;
  speedKmh: number;
  headingDegrees: number;
  aiRiskScore: number;
  aiRiskLevel: string;
  eventType: string;
  eventDescription: string;
  operatorAction?: string;
  responderLocation?: string;
}

export interface InvestigationCase {
  id: string; // e.g. CASE-SAPS-2026-0045
  incidentId: string;
  learnerName: string;
  sapsCaseNumber: string;
  leadInvestigator: string;
  status: 'OPEN_INVESTIGATION' | 'COURT_READY' | 'SUBMITTED_TO_PROSECUTOR' | 'CLOSED_RESOLVED';
  createdDate: string;
  totalEvidenceCount: number;
  integrityVerifiedPct: number;
}

export interface DfcceCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Schema' | 'Chain of Custody Service' | 'Digital Signature & Merkle Engine' | 'REST Controller' | 'WebSocket Gateway';
  description: string;
  code: string;
}

// SAMPLE INVESTIGATION CASES
export const SAMPLE_CASES: InvestigationCase[] = [
  {
    id: 'CASE-SAPS-2026-0045',
    incidentId: 'ITIS-2026-GP-00000045',
    learnerName: 'Sipho Zulu',
    sapsCaseNumber: 'SAPS Soweto CAS 482/07/2026',
    leadInvestigator: 'Capt. M. Khumalo (SAPS FCS Unit)',
    status: 'COURT_READY',
    createdDate: '2026-07-21 18:35:00',
    totalEvidenceCount: 14,
    integrityVerifiedPct: 100.0,
  },
  {
    id: 'CASE-SAPS-2026-0046',
    incidentId: 'ITIS-2026-GP-00000046',
    learnerName: 'Kagiso Mokoena',
    sapsCaseNumber: 'SAPS Diepkloof CAS 118/07/2026',
    leadInvestigator: 'W/O T. Sithole (SAPS Detective Services)',
    status: 'OPEN_INVESTIGATION',
    createdDate: '2026-07-21 17:10:00',
    totalEvidenceCount: 8,
    integrityVerifiedPct: 100.0,
  },
];

// SAMPLE EVIDENCE ITEMS
export const SAMPLE_EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'EVD-2026-GP-000088',
    incidentId: 'ITIS-2026-GP-00000045',
    learnerId: 'LRN-GP-001',
    learnerName: 'Sipho Zulu',
    category: 'GPS_TELEMETRY',
    collectorName: 'TelemetryIngestionWorker #4',
    timestamp: '2026-07-21 18:32:45.120',
    description: 'Hardware SOS Button Press + 1Hz High-Precision GPS Fix Packet (-26.2388, 27.8550)',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    digitalSignature: 'SIG-RSA4096-7a8f9021b3c4d5e6f7a8b9c0d1e2f3a4',
    merkleRootHash: 'mkl-root-88192a00f1c2d3e4b5a6c7d8e9f0',
    integrityStatus: 'SEALED',
    storageLocation: 's3://itis-evidence-vault-sa/2026/07/evd-000088.json.sealed',
    custodyEntries: [
      {
        id: 'COC-1001',
        evidenceId: 'EVD-2026-GP-000088',
        timestamp: '2026-07-21 18:32:45.150',
        collector: 'System Telemetry Collector Engine',
        previousCustodian: 'Wearable Hardware Buffer (IMEI 869402058192012)',
        currentCustodian: 'ITIS Immutable Evidence Vault',
        transferReason: 'Automated Real-Time Evidence Preservation',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        digitalSignature: 'SIG-AUTH-SYSTEM-9921',
        verificationStatus: 'SEALED',
      },
      {
        id: 'COC-1002',
        evidenceId: 'EVD-2026-GP-000088',
        timestamp: '2026-07-21 18:40:12.000',
        collector: 'C3 Command Operator J. Sithole',
        previousCustodian: 'ITIS Immutable Evidence Vault',
        currentCustodian: 'SAPS FCS Lead Investigator Capt. M. Khumalo',
        transferReason: 'SAPS Docket Request & Criminal Prosecution Export',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        digitalSignature: 'SIG-AUTH-OPERATOR-3312',
        verificationStatus: 'VERIFIED_INTACT',
      },
    ],
  },
  {
    id: 'EVD-2026-GP-000089',
    incidentId: 'ITIS-2026-GP-00000045',
    learnerId: 'LRN-GP-001',
    learnerName: 'Sipho Zulu',
    category: 'AI_PREDICTION',
    collectorName: 'APCPE PredictionEngineService',
    timestamp: '2026-07-21 18:32:46.012',
    description: 'AI Predictive Risk Assessment Output: 92/100 (EXTREME_RISK) SHAP Route Deviation Factor (+42%)',
    sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    digitalSignature: 'SIG-RSA4096-1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    merkleRootHash: 'mkl-root-88192a00f1c2d3e4b5a6c7d8e9f0',
    integrityStatus: 'SEALED',
    storageLocation: 's3://itis-evidence-vault-sa/2026/07/evd-000089.json.sealed',
    custodyEntries: [
      {
        id: 'COC-1003',
        evidenceId: 'EVD-2026-GP-000089',
        timestamp: '2026-07-21 18:32:46.040',
        collector: 'APCPE Model Pipeline',
        previousCustodian: 'Inference Memory Buffer',
        currentCustodian: 'ITIS Immutable Evidence Vault',
        transferReason: 'Automated ML Prediction Model Output Sealing',
        sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        digitalSignature: 'SIG-AUTH-APCPE-4410',
        verificationStatus: 'SEALED',
      },
    ],
  },
  {
    id: 'EVD-2026-GP-000090',
    incidentId: 'ITIS-2026-GP-00000045',
    learnerId: 'LRN-GP-001',
    learnerName: 'Sipho Zulu',
    category: 'DISPATCH_LOG',
    collectorName: 'ERCDE DispatchService',
    timestamp: '2026-07-21 18:32:48.890',
    description: 'SAPS Soweto Tactical Unit #4 Dispatch Acceptance & Transponder GPS Telemetry En Route',
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    digitalSignature: 'SIG-RSA4096-9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c',
    merkleRootHash: 'mkl-root-88192a00f1c2d3e4b5a6c7d8e9f0',
    integrityStatus: 'SEALED',
    storageLocation: 's3://itis-evidence-vault-sa/2026/07/evd-000090.json.sealed',
    custodyEntries: [
      {
        id: 'COC-1004',
        evidenceId: 'EVD-2026-GP-000090',
        timestamp: '2026-07-21 18:32:48.910',
        collector: 'ERCDE Dispatch Dispatcher',
        previousCustodian: 'Emergency Dispatch Transponder Feed',
        currentCustodian: 'ITIS Immutable Evidence Vault',
        transferReason: 'Automated Tactical Response Log Sealing',
        sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        digitalSignature: 'SIG-AUTH-ERCDE-1209',
        verificationStatus: 'SEALED',
      },
    ],
  },
];

// FORENSIC REPLAY TIMELINE (SECOND BY SECOND)
export const FORENSIC_REPLAY_TIMELINE: ForensicTimelinePoint[] = [
  {
    secondOffset: 0,
    timestamp: '18:32:00',
    lat: -26.2370,
    lng: 27.8540,
    speedKmh: 4.2,
    headingDegrees: 180,
    aiRiskScore: 12,
    aiRiskLevel: 'NORMAL',
    eventType: 'telemetry.normal',
    eventDescription: 'Learner walking along normal school sidewalk (Vilakazi St).',
  },
  {
    secondOffset: 15,
    timestamp: '18:32:15',
    lat: -26.2378,
    lng: 27.8542,
    speedKmh: 4.0,
    headingDegrees: 182,
    aiRiskScore: 18,
    aiRiskLevel: 'NORMAL',
    eventType: 'telemetry.normal',
    eventDescription: 'Normal walking pace confirmed by wearable accelerometer.',
  },
  {
    secondOffset: 30,
    timestamp: '18:32:30',
    lat: -26.2385,
    lng: 27.8548,
    speedKmh: 0.0,
    headingDegrees: 90,
    aiRiskScore: 68,
    aiRiskLevel: 'HIGH_RISK',
    eventType: 'apcpe.risk_spike',
    eventDescription: 'Unscheduled stationary period at unauthorized vehicle pickup point.',
    operatorAction: 'APCPE flagged risk score spike from 18 to 68.',
  },
  {
    secondOffset: 45,
    timestamp: '18:32:45',
    lat: -26.2388,
    lng: 27.8550,
    speedKmh: 0.0,
    headingDegrees: 90,
    aiRiskScore: 92,
    aiRiskLevel: 'EXTREME_RISK',
    eventType: 'hardware.sos_triggered',
    eventDescription: 'Learner physically held SOS button on wearable for 3.0 seconds!',
    operatorAction: 'EIOE Incident ITIS-2026-GP-00000045 auto-generated in 42ms.',
  },
  {
    secondOffset: 60,
    timestamp: '18:33:00',
    lat: -26.2410,
    lng: 27.8580,
    speedKmh: 74.5,
    headingDegrees: 120,
    aiRiskScore: 98,
    aiRiskLevel: 'EXTREME_RISK',
    eventType: 'telemetry.rapid_acceleration',
    eventDescription: 'Rapid speed spike to 74.5 km/h along R558 highway exit.',
    responderLocation: 'SAPS Soweto Tactical #4 accepted dispatch (ETA 2.5 mins).',
  },
  {
    secondOffset: 90,
    timestamp: '18:33:30',
    lat: -26.2480,
    lng: 27.8650,
    speedKmh: 62.0,
    headingDegrees: 135,
    aiRiskScore: 98,
    aiRiskLevel: 'EXTREME_RISK',
    eventType: 'geofence.breached',
    eventDescription: 'Exit from Soweto Safe Zone Corridor confirmed by GIS layer.',
    operatorAction: 'PSNCE sent SMS alert to Mother (Nomvula Zulu).',
  },
  {
    secondOffset: 120,
    timestamp: '18:34:00',
    lat: -26.2510,
    lng: 27.8710,
    speedKmh: 0.0,
    headingDegrees: 135,
    aiRiskScore: 98,
    aiRiskLevel: 'EXTREME_RISK',
    eventType: 'responder.interception',
    eventDescription: 'Vehicle intercepted at R558 roadblock by SAPS Soweto Tactical #4.',
    responderLocation: 'SAPS Responders on scene. Child recovered safely.',
  },
];

// CODE SPECS FOR DFCCE
export const DFCCE_CODE_SPECS: DfcceCodeSpec[] = [
  {
    id: 1,
    title: 'DFCCE Digital Forensics & Chain of Custody Prisma Schema',
    filename: 'prisma/schema.prisma',
    category: 'Prisma Schema',
    description: 'Relational Prisma schema for immutable forensic evidence items, SHA-256 integrity hash verification logs, Merkle tree nodes, chain of custody logs, and SAPS court dockets.',
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum EvidenceCategory {
  GPS_TELEMETRY
  GEOFENCE_EVENT
  DEVICE_HARDWARE
  AI_PREDICTION
  DECISION_ENGINE
  INCIDENT_ORCHESTRATION
  DISPATCH_LOG
  NOTIFICATION_COMMUNICATION
  OPERATOR_AUDIT
  AUTHENTICATION_SECURITY
}

enum IntegrityStatus {
  VERIFIED_INTACT
  CORRUPTED
  TAMPERED
  SEALED
}

model InvestigationCase {
  id                    String            @id @default(uuid())
  sapsCaseNumber        String            @unique
  incidentId            String
  learnerId             String
  leadInvestigator      String
  status                String            // OPEN_INVESTIGATION, COURT_READY, CLOSED
  createdAt             DateTime          @default(now())

  evidenceItems         EvidenceItem[]
}

model EvidenceItem {
  id                    String            @id @default(uuid())
  caseId                String
  incidentId            String
  learnerId             String
  category              EvidenceCategory
  collectorName         String
  timestamp             DateTime          @default(now())
  description           String
  sha256Hash            String
  digitalSignature      String
  merkleRootHash        String
  integrityStatus       IntegrityStatus   @default(SEALED)
  storageLocation       String

  case                  InvestigationCase @relation(fields: [caseId], references: [id], onDelete: Cascade)
  custodyEntries        ChainOfCustodyEntry[]
}

model ChainOfCustodyEntry {
  id                    String            @id @default(uuid())
  evidenceId            String
  timestamp             DateTime          @default(now())
  collector             String
  previousCustodian     String
  currentCustodian      String
  transferReason        String
  sha256Hash            String
  digitalSignature      String
  verificationStatus    IntegrityStatus   @default(SEALED)

  evidence              EvidenceItem      @relation(fields: [evidenceId], references: [id], onDelete: Cascade)
}`
  },
  {
    id: 2,
    title: 'DFCCE Cryptographic Integrity & Chain of Custody Service',
    filename: 'src/dfcce/services/chain-of-custody.service.ts',
    category: 'Chain of Custody Service',
    description: 'Core NestJS service computing SHA-256 hashes, digital signatures via RSA-4096 keys, recording immutable custody transfers, and verifying evidence integrity.',
    code: `import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface EvidencePayload {
  incidentId: string;
  learnerId: string;
  category: string;
  payloadData: any;
  collectorName: string;
}

@Injectable()
export class ChainOfCustodyService {
  private readonly logger = new Logger(ChainOfCustodyService.name);

  // Computes immutable SHA-256 hash of evidence payload
  calculateSha256(payload: any): string {
    const jsonString = JSON.stringify(payload);
    return crypto.createHash('sha256').update(jsonString).digest('hex');
  }

  // Generates digital signature for court admissibility
  generateDigitalSignature(sha256Hash: string, privateKeyPem: string): string {
    const sign = crypto.createSign('SHA256');
    sign.update(sha256Hash);
    sign.end();
    return sign.sign(privateKeyPem, 'base64');
  }

  // Verifies SHA-256 hash against current vault storage
  verifyEvidenceIntegrity(originalHash: string, currentPayload: any): boolean {
    const currentHash = this.calculateSha256(currentPayload);
    const isIntact = originalHash === currentHash;
    this.logger.log(\`Integrity Verification Check: Intact=\${isIntact}, Hash=\${currentHash}\`);
    return isIntact;
  }

  // Records custody transfer log
  async recordCustodyTransfer(
    evidenceId: string,
    previousCustodian: string,
    newCustodian: string,
    reason: string
  ) {
    this.logger.log(\`CUSTODY TRANSFERRED for \${evidenceId}: \${previousCustodian} -> \${newCustodian}\`);
    return {
      evidenceId,
      previousCustodian,
      newCustodian,
      transferReason: reason,
      transferredAt: new Date().toISOString(),
      status: 'VERIFIED_INTACT',
    };
  }
}`
  },
  {
    id: 3,
    title: 'DFCCE Merkle Tree & Verification Engine',
    filename: 'src/dfcce/services/merkle-verification.service.ts',
    category: 'Digital Signature & Merkle Engine',
    description: 'Constructs Merkle trees across incident evidence items to produce a single verifiable Merkle root hash for SAPS court dockets.',
    code: `import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class MerkleVerificationService {

  buildMerkleTree(hashes: string[]): { merkleRoot: string; layers: string[][] } {
    if (hashes.length === 0) return { merkleRoot: '', layers: [] };

    let currentLayer = [...hashes];
    const layers: string[][] = [currentLayer];

    while (currentLayer.length > 1) {
      const nextLayer: string[] = [];
      for (let i = 0; i < currentLayer.length; i += 2) {
        if (i + 1 < currentLayer.length) {
          const combined = currentLayer[i] + currentLayer[i + 1];
          const hash = crypto.createHash('sha256').update(combined).digest('hex');
          nextLayer.push(hash);
        } else {
          nextLayer.push(currentLayer[i]);
        }
      }
      layers.push(nextLayer);
      currentLayer = nextLayer;
    }

    return {
      merkleRoot: currentLayer[0],
      layers,
    };
  }
}`
  },
  {
    id: 4,
    title: 'DFCCE Forensic Investigation REST Controller',
    filename: 'src/dfcce/controllers/evidence.controller.ts',
    category: 'REST Controller',
    description: 'REST API endpoints for querying evidence items, verifying SHA-256 hashes, generating court-ready PDF dockets, and retrieving second-by-second forensic replays.',
    code: `import { Controller, Get, Post, Param, Body } from '@nestjs/common';

@Controller('forensics')
export class EvidenceController {

  @Get('cases/:incidentId')
  async getCaseForIncident(@Param('incidentId') incidentId: string) {
    return {
      incidentId,
      sapsCaseNumber: 'SAPS Soweto CAS 482/07/2026',
      totalEvidenceItems: 14,
      integrityVerified: true,
    };
  }

  @Post('evidence/verify')
  async verifyIntegrity(@Body() body: { evidenceId: string; sha256Hash: string }) {
    return {
      evidenceId: body.evidenceId,
      status: 'VERIFIED_INTACT',
      originalHash: body.sha256Hash,
      verificationTimestamp: new Date().toISOString(),
    };
  }

  @Get('timeline/replay/:incidentId')
  async getTimelineReplay(@Param('incidentId') incidentId: string) {
    return {
      incidentId,
      replayDurationSeconds: 120,
      pointsCount: 7,
      timeline: [
        { secondOffset: 0, eventType: 'telemetry.normal', speedKmh: 4.2 },
        { secondOffset: 45, eventType: 'hardware.sos_triggered', speedKmh: 0.0 },
      ],
    };
  }

  @Post('evidence/export/docket')
  async generateCourtDocket(@Body() body: { caseId: string }) {
    return {
      caseId: body.caseId,
      docketFileUrl: 's3://itis-evidence-vault-sa/dockets/saps-docket-0045.pdf',
      sha256Checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      generatedAt: new Date().toISOString(),
    };
  }
}`
  }
];

// CRITICAL DFCCE MANDATORY RULES
export const CRITICAL_DFCCE_RULES = [
  { id: 1, title: 'Evidence Can NEVER Be Deleted', ruleText: 'All evidence items, SHA-256 hashes, and telemetry logs are permanently stored in append-only immutable storage.', badge: 'NEVER DELETE' },
  { id: 2, title: 'Cryptographically Sealed Evidence', ruleText: 'Every evidence item is sealed with RSA-4096 digital signatures and SHA-256 hashing at ingestion time.', badge: 'CRYPTO SEALED' },
  { id: 3, title: 'Permanent Chain of Custody Logging', ruleText: 'Every view, transfer, or docket export creates an immutable chain of custody ledger entry with timestamps.', badge: 'CUSTODY LOG' },
  { id: 4, title: 'Automated Forensic Timeline Generation', ruleText: 'Every incident automatically synthesizes a second-by-second timeline connecting telemetry, decisions, and dispatches.', badge: 'AUTO TIMELINE' },
  { id: 5, title: 'Auditable & Verifiable Docket Exports', ruleText: 'Exported SAPS court dockets contain cryptographic checksum certificates for court admissibility.', badge: 'COURT DOCKET' },
  { id: 6, title: 'Reproducible Integrity Verification', ruleText: 'Any investigator can re-run SHA-256 verification against the vault at any time with <100ms latency.', badge: 'VERIFIABLE' },
  { id: 7, title: 'Admissible Legal Standards Compliance', ruleText: 'Complies with South African Law of Evidence Amendment Act and SAPS FCS digital evidence standards.', badge: 'LEGAL AA' },
  { id: 8, title: 'Read-Only Workspace By Default', ruleText: 'Investigation workspace is strictly read-only to prevent intentional or accidental evidence tampering.', badge: 'READ ONLY' },
  { id: 9, title: 'Linked to Learner Digital Safety Profile', ruleText: 'Every evidence docket maintains unbroken relational integrity back to the child wearing the ITIS GPS device.', badge: 'LEARNER LINKED' },
  { id: 10, title: 'Primary Purpose: Truth & Child Protection', ruleText: 'Provides indisputable legal evidence to convict perpetrators and ensure child safety.', badge: 'TRUTH & SAFETY' },
];
