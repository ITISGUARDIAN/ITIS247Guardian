// ITIS Legal, Compliance & Investor Data Room Service
// Handles Due Diligence Vault, Legal Docs, Patents, Trademarks, Govt Contracts, Board Resolutions, ISO/POPIA Evidence, & Audit Exports.

import { AuditLogger } from '../common/audit.logger';
import {
  BoardResolution,
  ComplianceEvidenceItem,
  DataRoomDocument,
  GovernmentContractItem,
  LegalDataRoomOverview,
  PatentItem,
  TrademarkItem
} from './legal.types';

export class LegalService {
  private static instance: LegalService;

  // In-Memory Vault Stores
  private documents: Map<string, DataRoomDocument> = new Map();
  private patents: Map<string, PatentItem> = new Map();
  private trademarks: Map<string, TrademarkItem> = new Map();
  private govtContracts: Map<string, GovernmentContractItem> = new Map();
  private boardResolutions: Map<string, BoardResolution> = new Map();
  private complianceEvidence: Map<string, ComplianceEvidenceItem> = new Map();

  private constructor() {
    this.seedInitialData();
  }

  public static getInstance(): LegalService {
    if (!LegalService.instance) {
      LegalService.instance = new LegalService();
    }
    return LegalService.instance;
  }

  private seedInitialData() {
    const now = new Date();
    const isoNow = now.toISOString();

    // 1. Seed Documents
    const doc1 = 'DOC-DD-001';
    this.documents.set(doc1, {
      docId: doc1,
      title: 'ITIS Group Series-B Investment Memorandum & Financial Model (2026-2030)',
      folderCategory: 'DUE_DILIGENCE',
      classification: 'RESTRICTED_INVESTOR_ONLY',
      fileFormat: 'PDF',
      fileSizeBytes: 14850000,
      uploadedAt: '2026-06-10T10:00:00Z',
      uploadedBy: 'Chief Financial Officer',
      hashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      version: 'v3.2-final',
      downloadCount: 42
    });

    const doc2 = 'DOC-GOV-002';
    this.documents.set(doc2, {
      docId: doc2,
      title: 'Gauteng Department of Education Master Scholar Transport Service Agreement',
      folderCategory: 'GOVT_CONTRACTS',
      classification: 'SECRET_GOVERNMENT',
      fileFormat: 'PDF',
      fileSizeBytes: 28400000,
      uploadedAt: '2025-04-01T00:00:00Z',
      uploadedBy: 'Legal Counsel',
      hashSha256: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284ddd200126d9069e',
      version: 'v1.0-executed',
      downloadCount: 18
    });

    // 2. Seed Patents
    const p1 = 'PAT-2026-01';
    this.patents.set(p1, {
      patentId: p1,
      patentNumber: 'ZA-2026/04812',
      title: 'Method & Edge IoT Architecture for Dual-Frequency RFID Scholar Boarding Verification on Buses',
      jurisdiction: 'CIPC South Africa & PCT WIPO International',
      status: 'GRANTED',
      filingDate: '2024-03-15T00:00:00Z',
      grantDate: '2026-01-20T00:00:00Z',
      abstract: 'Patent covering low-latency offline RFID tag verification with CAN bus telemetry sync in bandwidth-constrained rural corridors.'
    });

    // 3. Seed Trademarks
    const tm1 = 'TM-2026-01';
    this.trademarks.set(tm1, {
      trademarkId: tm1,
      registrationNumber: 'TM-2026-9012',
      markName: 'ITIS Transport Intelligence System™',
      classNumber: 'Class 9 (IoT Hardware) & Class 39 (Transport Telematics)',
      status: 'REGISTERED',
      renewalDate: '2036-02-15T00:00:00Z'
    });

    // 4. Seed Government Contracts
    const gc1 = 'GC-2025-GDE';
    this.govtContracts.set(gc1, {
      contractId: gc1,
      contractNumber: 'GDE-SCHOLAR-2025-01',
      procurementDepartment: 'Gauteng Department of Education',
      tenderValueZar: 48500000,
      signedDate: '2025-04-01T00:00:00Z',
      expiryDate: '2028-03-31T00:00:00Z',
      complianceStatus: 'FULLY_COMPLIANT',
      sitaApprovalRef: 'SITA-APPROVAL-2025-8812'
    });

    // 5. Seed Board Resolutions
    const br1 = 'RES-2026-01';
    this.boardResolutions.set(br1, {
      resolutionId: br1,
      resolutionNumber: 'RES-2026-04',
      title: 'Approval of SITA e-Government Integration Architecture & National Expansion',
      meetingDate: '2026-05-18T00:00:00Z',
      votesInFavor: 7,
      votesAgainst: 0,
      passed: true,
      signatoryChairperson: 'Dr. Masego Khumalo (Board Chair)'
    });

    // 6. Seed Compliance Evidence (ISO & POPIA)
    const ce1 = 'CE-POPIA-01';
    this.complianceEvidence.set(ce1, {
      evidenceId: ce1,
      framework: 'POPIA_ACT_2013',
      controlClause: 'Section 18 - Pupil Personal Data Encryption & Parental Opt-In Audit',
      status: 'AUDITED_PASSED',
      lastAuditedAt: '2026-06-30T00:00:00Z',
      auditorOrg: 'KPMG Cyber Assurance South Africa',
      evidenceDocRef: 'DOC-POPIA-AUDIT-2026.PDF'
    });

    const ce2 = 'CE-ISO-01';
    this.complianceEvidence.set(ce2, {
      evidenceId: ce2,
      framework: 'ISO_27001_2022',
      controlClause: 'Annex A.8.1 - Information Security for Cloud Edge Devices',
      status: 'AUDITED_PASSED',
      lastAuditedAt: '2026-05-15T00:00:00Z',
      auditorOrg: 'SABS (South African Bureau of Standards)',
      evidenceDocRef: 'ISO27001-SABS-CERT-2026.PDF'
    });
  }

  // API Methods
  public async getOverview(): Promise<LegalDataRoomOverview> {
    const contractsList = Array.from(this.govtContracts.values());
    const totalContractVal = contractsList.reduce((acc, curr) => acc + curr.tenderValueZar, 0);

    return {
      totalDataRoomDocuments: this.documents.size,
      activePatentsCount: this.patents.size,
      registeredTrademarksCount: this.trademarks.size,
      activeGovernmentContractsValueZar: totalContractVal,
      popiaComplianceScorePercentage: 100,
      isoCertificationsCount: 2,
      auditExportsGeneratedCount: 38
    };
  }

  public async getDocuments(): Promise<DataRoomDocument[]> {
    return Array.from(this.documents.values());
  }

  public async uploadDocument(params: Omit<DataRoomDocument, 'docId' | 'uploadedAt' | 'hashSha256' | 'downloadCount'>): Promise<DataRoomDocument> {
    const docId = `DOC-${Math.floor(Math.random() * 8999 + 1000)}`;
    const doc: DataRoomDocument = {
      ...params,
      docId,
      uploadedAt: new Date().toISOString(),
      hashSha256: `0x${Math.random().toString(16).substring(2, 64)}`,
      downloadCount: 0
    };
    this.documents.set(docId, doc);

    AuditLogger.recordAudit({
      action: 'LEGAL_DATA_ROOM_DOC_UPLOADED',
      resource: '/api/v1/legal/documents',
      correlationId: docId,
      metadata: { title: doc.title, category: doc.folderCategory, classification: doc.classification }
    });

    return doc;
  }

  public async getPatents(): Promise<PatentItem[]> {
    return Array.from(this.patents.values());
  }

  public async getTrademarks(): Promise<TrademarkItem[]> {
    return Array.from(this.trademarks.values());
  }

  public async getGovtContracts(): Promise<GovernmentContractItem[]> {
    return Array.from(this.govtContracts.values());
  }

  public async getBoardResolutions(): Promise<BoardResolution[]> {
    return Array.from(this.boardResolutions.values());
  }

  public async getComplianceEvidence(): Promise<ComplianceEvidenceItem[]> {
    return Array.from(this.complianceEvidence.values());
  }
}
