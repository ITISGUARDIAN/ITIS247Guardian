// ITIS SITA (State Information Technology Agency) Government Gateway Types
// Supports Federated eGov Authentication, X.509 PKI Certificate Validation,
// Inter-Departmental Government Routing, Immutable Audit Trails, & Connection SLA Monitoring.

export type SitaClearanceLevel = 'UNRESTRICTED' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';

export type SitaDepartmentCode =
  | 'DOT' // Department of Transport
  | 'DBE' // Department of Basic Education
  | 'SAPS' // South African Police Service
  | 'NATIONAL_TREASURY' // National Treasury
  | 'DHA' // Department of Home Affairs
  | 'PED_GAUTENG'
  | 'PED_WESTERN_CAPE'
  | 'PED_KZN';

export interface SitaGovUserToken {
  sitaGovToken: string;
  officialId: string;
  governmentEmail: string;
  departmentCode: SitaDepartmentCode;
  clearanceLevel: SitaClearanceLevel;
  issuedAt: string;
  expiresAt: string;
  pkiCertThumbprint: string;
}

export interface SitaPkiCertificate {
  thumbprint: string;
  subjectName: string;
  issuerName: string;
  validFrom: string;
  validTo: string;
  algorithm: 'RSA_4096' | 'ECDSA_P384' | 'ED25519';
  revocationStatus: 'VALID' | 'REVOKED' | 'EXPIRED' | 'SUSPENDED';
  keyUsage: string[];
}

export interface SitaCertificateValidationRequest {
  pkiCertThumbprint: string;
  pemCertificateString?: string;
  departmentCode: SitaDepartmentCode;
}

export interface SitaCertificateValidationResult {
  valid: boolean;
  thumbprint: string;
  subjectName: string;
  clearanceVerified: boolean;
  expiryDate: string;
  revocationCheckedAt: string;
  details: string;
}

export interface SitaRoutedMessagePayload {
  messageId: string;
  sourceDepartment: SitaDepartmentCode;
  targetDepartment: SitaDepartmentCode;
  serviceAction: string;
  clearanceRequired: SitaClearanceLevel;
  payloadData: Record<string, any>;
  priority: 'ROUTINE' | 'PRIORITY' | 'IMMEDIATE' | 'FLASH_EMERGENCY';
  senderGovEmail: string;
}

export interface SitaRoutedMessageResponse {
  messageId: string;
  status: 'DELIVERED' | 'QUEUED' | 'REJECTED_CLEARANCE' | 'ROUTING_FAILED';
  deliveryLatencyMs: number;
  targetEndpoint: string;
  sitaRoutingRef: string;
  timestamp: string;
}

export interface SitaAuditLogRecord {
  auditId: string;
  sitaLogId: string;
  systemModule: string;
  actionCode: string;
  operatorGovEmail: string;
  departmentCode: SitaDepartmentCode;
  payloadDigestSha256: string;
  hmacSignature: string;
  timestamp: string;
  ipAddress?: string;
  clientCertThumbprint?: string;
}

export interface SitaConnectionMetric {
  endpointName: string;
  departmentCode: SitaDepartmentCode;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  lastPingTimestamp: string;
  latencyMs: number;
  uptimePercentage: number;
  totalRequestsHandled: number;
  failedRequestsCount: number;
  circuitBreakerOpen: boolean;
}

export interface SitaGatewayConfig {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  sitaRootCaCertThumbprint: string;
  sandboxMode: boolean;
  timeoutMs: number;
}
