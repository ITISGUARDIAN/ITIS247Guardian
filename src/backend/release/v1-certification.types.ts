// ITIS Version 1.0 Production Launch & Release Certification Types
// Defines structures for RC3 -> v1.0 Promotion, Security/Database/Mobile/API/Performance Verification, Executive Sign-offs, Acceptance Certificates, & Launch Dashboards.

export type ReleaseCandidate = 'RC1' | 'RC2' | 'RC3' | 'VERSION_1_0_GA';

export type VerificationStatus = 'VERIFIED_PASSED' | 'IN_PROGRESS' | 'ATTENTION_REQUIRED' | 'FAILED';

export interface VerificationCheckItem {
  checkId: string;
  category: 'SECURITY' | 'DATABASE' | 'MOBILE_APP' | 'API_GATEWAY' | 'PERFORMANCE' | 'COMPLIANCE';
  name: string;
  description: string;
  status: VerificationStatus;
  benchmarkTarget: string;
  actualMetric: string;
  verifiedAt: string;
  verifiedBy: string;
}

export interface ExecutiveSignOff {
  signOffId: string;
  role: 'MEC_TRANSPORT' | 'SITA_CHIEF_ARCHITECT' | 'ITIS_CTO' | 'LEAD_CYBER_AUDITOR' | 'NATIONAL_TREASURY_REPRESENTATIVE';
  signatoryName: string;
  title: string;
  organization: string;
  approved: boolean;
  signedAt?: string;
  digitalSignatureHash?: string;
  comments?: string;
}

export interface ProductionAcceptanceCertificate {
  certificateId: string;
  certificateNumber: string; // e.g. PAC-ITIS-V1.0-2026
  releaseVersion: string; // "v1.0.0-GA"
  issuedTo: string; // "South African Provincial Departments of Transport & Education"
  issuedAt: string;
  validUntil: string;
  sha256ReleaseManifestHash: string;
  certifiedBySita: boolean;
  certifiedByAuditors: boolean;
  status: 'ISSUED_AND_ACTIVE' | 'REVOKED';
}

export interface ReleaseNoteSection {
  category: string; // e.g. "Core Fleet Telematics", "e-Gov SITA Portal", "Wearable Safety"
  highlights: string[];
}

export interface VersionArchiveItem {
  version: string;
  releaseDate: string;
  buildNumber: string;
  gitCommitSha: string;
  changelogSummary: string;
  manifestDownloadUrl: string;
  isCurrentProduction: boolean;
}

export interface LaunchDashboardOverview {
  currentReleaseCandidate: ReleaseCandidate;
  isVersion1Promoted: boolean;
  overallVerificationPassPercentage: number;
  totalChecksCount: number;
  passedChecksCount: number;
  executiveSignOffsCompletedCount: number;
  totalRequiredSignOffsCount: number;
  productionCertificateActive: boolean;
  systemCutoverStatus: 'HOT_STANDBY' | 'ZERO_DOWNTIME_CUTOVER_ACTIVE' | 'PROMOTED_V1_LIVE';
  activeTelemetryNodes: number;
}
