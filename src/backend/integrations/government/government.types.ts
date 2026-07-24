// ITIS External Government Integration Gateway Types
// Defines Provider Interfaces, Department Models, Security Credentials, & Adapters
// Supports DBE, Provincial Education (PED), SAPS, SITA, National Treasury, & EMIS

export type GovDepartmentType =
  | 'DBE' // Department of Basic Education
  | 'PED' // Provincial Education Departments (GDE, WCED, KZNDOE, etc.)
  | 'SAPS' // South African Police Service
  | 'SITA' // State Information Technology Agency
  | 'NATIONAL_TREASURY' // National Treasury (CSD, PERSAL, SCOA)
  | 'EMIS'; // Educational Management Information System

export interface GovGatewayCredentials {
  department: GovDepartmentType;
  baseUrl: string;
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
  pkiCertThumbprint?: string;
  mtlsEnabled: boolean;
  timeoutMs: number;
}

export interface GovApiResponse<T = any> {
  success: boolean;
  department: GovDepartmentType;
  statusCode: number;
  transactionRef: string;
  timestamp: string;
  data?: T;
  errorCode?: string;
  errorMessage?: string;
  auditCorrelationId: string;
}

// ---------------------------------------------------------
// 1. DEPARTMENT OF BASIC EDUCATION (DBE) TYPES
// ---------------------------------------------------------
export interface DbeSchoolVerificationRequest {
  emisNumber: string;
  schoolName?: string;
  province: string;
}

export interface DbeSchoolVerificationResponse {
  emisNumber: string;
  schoolName: string;
  province: string;
  district: string;
  circuit: string;
  phase: 'PRIMARY' | 'SECONDARY' | 'COMBINED' | 'SPECIAL_NEEDS';
  status: 'ACTIVE' | 'DEREGISTERED' | 'PROVISIONAL';
  registeredLearnersCount: number;
  principalName: string;
  capsCurriculumCompliant: boolean;
}

export interface DbeNscResultVerificationRequest {
  nationalIdNumber: string;
  examYear: number;
}

export interface DbeNscResultVerificationResponse {
  nationalIdNumber: string;
  learnerFullName: string;
  certificateNumber: string;
  status: 'PASSED_BACHELORS' | 'PASSED_DIPLOMA' | 'PASSED_HIGHER_CERT' | 'FAILED';
  verificationHash: string;
}

export interface IDbeProvider {
  verifySchool(req: DbeSchoolVerificationRequest): Promise<GovApiResponse<DbeSchoolVerificationResponse>>;
  verifyNscResults(req: DbeNscResultVerificationRequest): Promise<GovApiResponse<DbeNscResultVerificationResponse>>;
}

// ---------------------------------------------------------
// 2. PROVINCIAL EDUCATION DEPARTMENTS (PED) TYPES
// ---------------------------------------------------------
export type PedProvinceCode = 'GP' | 'WC' | 'KZN' | 'EC' | 'FS' | 'MP' | 'NW' | 'LP' | 'NC';

export interface PedTransportSubsidyRequest {
  province: PedProvinceCode;
  learnerLuritsId: string;
  emisNumber: string;
  pickupDistanceKm: number;
}

export interface PedTransportSubsidyResponse {
  learnerLuritsId: string;
  province: PedProvinceCode;
  eligibleForSubsidy: boolean;
  subsidizedTariffPerKmZar: number;
  monthlyGrantAllowanceZar: number;
  approvedRouteCode: string;
  approvalReference: string;
}

export interface PedRouteAccreditationRequest {
  province: PedProvinceCode;
  operatorCsdNumber: string;
  routeCode: string;
  vehicleRegistrationNumber: string;
}

export interface IPedProvider {
  verifyTransportSubsidy(req: PedTransportSubsidyRequest): Promise<GovApiResponse<PedTransportSubsidyResponse>>;
  verifyRouteAccreditation(req: PedRouteAccreditationRequest): Promise<GovApiResponse<{ accredited: boolean; expiryDate: string; certRef: string }>>;
}

// ---------------------------------------------------------
// 3. SOUTH AFRICAN POLICE SERVICE (SAPS) TYPES
// ---------------------------------------------------------
export interface SapsDriverVettingRequest {
  idNumber: string;
  pdpLicenseNumber: string;
  fingerprintHash?: string;
}

export interface SapsDriverVettingResponse {
  idNumber: string;
  pdpLicenseValid: boolean;
  pdpExpiryDate: string;
  clearanceStatus: 'CLEARED' | 'FLAGGED' | 'REVOKED' | 'PENDING_VERIFICATION';
  criminalRecordCount: number;
  flaggedOffenses?: string[];
  sapsVettingCertificateRef: string;
  vettingTimestamp: string;
}

export interface SapsEmergencySosDispatch {
  sosEventId: string;
  latitude: number;
  longitude: number;
  vehicleRegistration: string;
  incidentType: 'SCHOLAR_HIJACKING' | 'DRIVER_DURESS' | 'VEHICLE_ACCIDENT' | 'ARMED_ROBBERY';
  nearestPoliceStation?: string;
  priority: 'CRITICAL';
  callerContactPhone: string;
}

export interface SapsEmergencySosResponse {
  sapsCaseNumber: string;
  assignedStation: string;
  dispatchUnitsCount: number;
  estimatedEtaMinutes: number;
  sapsCommandControlRef: string;
}

export interface ISapsProvider {
  vetDriverPdp(req: SapsDriverVettingRequest): Promise<GovApiResponse<SapsDriverVettingResponse>>;
  dispatchEmergencySos(req: SapsEmergencySosDispatch): Promise<GovApiResponse<SapsEmergencySosResponse>>;
}

// ---------------------------------------------------------
// 4. STATE INFORMATION TECHNOLOGY AGENCY (SITA) TYPES
// ---------------------------------------------------------
export interface SitaGovSsoVerificationRequest {
  sitaGovToken: string;
  requestedServiceRole: string;
}

export interface SitaGovSsoVerificationResponse {
  officialId: string;
  governmentEmail: string;
  departmentCode: string;
  clearanceLevel: 'SECRET' | 'TOP_SECRET' | 'RESTRICTED' | 'UNRESTRICTED';
  validUntil: string;
  pkiSignatureVerified: boolean;
}

export interface SitaAuditRegistryPayload {
  systemModule: string;
  actionCode: string;
  operatorGovEmail: string;
  payloadDigestSha256: string;
}

export interface ISitaProvider {
  verifyGovSsoToken(req: SitaGovSsoVerificationRequest): Promise<GovApiResponse<SitaGovSsoVerificationResponse>>;
  logToGovCloudAudit(payload: SitaAuditRegistryPayload): Promise<GovApiResponse<{ logged: boolean; sitaLogId: string }>>;
}

// ---------------------------------------------------------
// 5. NATIONAL TREASURY TYPES
// ---------------------------------------------------------
export interface TreasuryCsdVerificationRequest {
  csdSupplierNumber: string; // MAAA0000000
  taxClearancePin: string;
}

export interface TreasuryCsdVerificationResponse {
  csdSupplierNumber: string;
  legalEntityName: string;
  taxCompliant: boolean;
  bbbeeLevel: number;
  restrictedSupplierStatus: 'CLEARED' | 'BLACKLISTED';
  bankAccountVerified: boolean;
  bankName: string;
  maskedAccountNumber: string;
}

export interface TreasuryScoaBudgetVerificationRequest {
  voteNumber: string;
  costCenterCode: string;
  requestedAmountZar: number;
  financialYear: string;
}

export interface ITreasuryProvider {
  verifyCsdSupplier(req: TreasuryCsdVerificationRequest): Promise<GovApiResponse<TreasuryCsdVerificationResponse>>;
  verifyScoaBudgetAllocation(req: TreasuryScoaBudgetVerificationRequest): Promise<GovApiResponse<{ budgetApproved: boolean; availableFundsZar: number; reservationRef: string }>>;
}

// ---------------------------------------------------------
// 6. EDUCATIONAL MANAGEMENT INFORMATION SYSTEM (EMIS) TYPES
// ---------------------------------------------------------
export interface EmisSchoolSyncRequest {
  emisNumber: string;
}

export interface EmisAttendanceSyncRequest {
  emisNumber: string;
  academicDate: string; // YYYY-MM-DD
  totalBoardedTransport: number;
  totalSafelyArrived: number;
  absentLearnersCount: number;
}

export interface IEmisProvider {
  syncSchoolMaster(req: EmisSchoolSyncRequest): Promise<GovApiResponse<any>>;
  uploadAttendanceRecords(req: EmisAttendanceSyncRequest): Promise<GovApiResponse<{ batchId: string; recordsIngested: number; discrepanciesFlagged: number }>>;
}
