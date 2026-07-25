// ITIS Legal, Compliance & Investor Data Room Types
// Structures for Due Diligence Vault, Patents, Trademarks, Govt Contracts, Procurement, Board Resolutions, ISO/POPIA Compliance & Audit Exports.

export type DocumentClassification = 'RESTRICTED_INVESTOR_ONLY' | 'SECRET_GOVERNMENT' | 'CONFIDENTIAL' | 'INTERNAL' | 'PUBLIC';

export type ComplianceFramework = 'POPIA_ACT_2013' | 'ISO_27001_2022' | 'ISO_9001_2015' | 'SITA_EGOV_FRAMEWORK' | 'PFMA_COMPLIANCE';

export interface DataRoomDocument {
  docId: string;
  title: string;
  folderCategory: 'DUE_DILIGENCE' | 'GOVT_CONTRACTS' | 'INTELLECTUAL_PROPERTY' | 'BOARD_GOVERNANCE' | 'COMPLIANCE_EVIDENCE' | 'PROCUREMENT';
  classification: DocumentClassification;
  fileFormat: 'PDF' | 'DOCX' | 'ZIP' | 'XLSX';
  fileSizeBytes: number;
  uploadedAt: string;
  uploadedBy: string;
  hashSha256: string;
  version: string;
  downloadCount: number;
}

export interface PatentItem {
  patentId: string;
  patentNumber: string; // e.g. ZA-2026/04812
  title: string;
  jurisdiction: string; // e.g. CIPC South Africa, WIPO PCT
  status: 'GRANTED' | 'PENDING_APPLICATION' | 'PROVISIONAL';
  filingDate: string;
  grantDate?: string;
  abstract: string;
}

export interface TrademarkItem {
  trademarkId: string;
  registrationNumber: string; // e.g. TM-2026-9012
  markName: string; // e.g. "ITIS Transport Intelligence System"
  classNumber: string; // e.g. Class 9 (Software/IoT), Class 39 (Transport)
  status: 'REGISTERED' | 'EXAMINATION';
  renewalDate: string;
}

export interface GovernmentContractItem {
  contractId: string;
  contractNumber: string; // e.g. GDE-SCHOLAR-2025-01
  procurementDepartment: string;
  tenderValueZar: number;
  signedDate: string;
  expiryDate: string;
  complianceStatus: 'FULLY_COMPLIANT' | 'AUDIT_PENDING';
  sitaApprovalRef: string;
}

export interface BoardResolution {
  resolutionId: string;
  resolutionNumber: string; // e.g. RES-2026-04
  title: string;
  meetingDate: string;
  votesInFavor: number;
  votesAgainst: number;
  passed: boolean;
  signatoryChairperson: string;
}

export interface ComplianceEvidenceItem {
  evidenceId: string;
  framework: ComplianceFramework;
  controlClause: string; // e.g. "ISO 27001 A.8.1 - User Endpoint Protection"
  status: 'AUDITED_PASSED' | 'IN_REVIEW' | 'REQUIRES_UPDATE';
  lastAuditedAt: string;
  auditorOrg: string; // e.g. KPMG Cyber Assurance / SABS
  evidenceDocRef: string;
}

export interface LegalDataRoomOverview {
  totalDataRoomDocuments: number;
  activePatentsCount: number;
  registeredTrademarksCount: number;
  activeGovernmentContractsValueZar: number;
  popiaComplianceScorePercentage: number;
  isoCertificationsCount: number;
  auditExportsGeneratedCount: number;
}
