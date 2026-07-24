// ITIS SAPS (South African Police Service) Integration Adapter Types
// Supports Emergency Incident Creation, Lifecycle Status Updates, CAS Case References,
// SAPS Responder Acknowledgements, Digital Evidence References with Chain of Custody, & Audit Logging.

export type SapsIncidentCategory =
  | 'SCHOLAR_HIJACKING'
  | 'DRIVER_DURESS'
  | 'VEHICLE_ACCIDENT'
  | 'ARMED_ROBBERY'
  | 'KIDNAPPING_THREAT'
  | 'UNAUTHORIZED_ROUTE_DEVIATION';

export type SapsIncidentSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type SapsIncidentStatus =
  | 'REPORTED'
  | 'ACKNOWLEDGED'
  | 'DISPATCHED'
  | 'ON_SCENE'
  | 'INVESTIGATING'
  | 'RESOLVED'
  | 'CLOSED';

export type SapsEvidenceType =
  | 'DASHCAM_VIDEO'
  | 'TELEMATICS_GPS_LOG'
  | 'AUDIO_RECORDING'
  | 'PANIC_ALERT_SNAPSHOT'
  | 'VEHICLE_DIAGNOSTIC'
  | 'WITNESS_STATEMENT';

export interface SapsLocationCoordinate {
  latitude: number;
  longitude: number;
  altitudeMeters?: number;
  accuracyMeters?: number;
  streetAddress?: string;
  suburb?: string;
  policeStationPrecinct?: string;
}

export interface SapsCreateIncidentPayload {
  externalIncidentId: string;
  category: SapsIncidentCategory;
  severity: SapsIncidentSeverity;
  vehicleRegistrationNumber: string;
  driverIdNumber?: string;
  location: SapsLocationCoordinate;
  reportedAt: string;
  description: string;
  reporterContactPhone: string;
  affectedLearnersCount?: number;
}

export interface SapsIncidentResponse {
  sapsIncidentId: string;
  sapsCaseNumber: string; // e.g. CAS 412/07/2026
  commandCenterRef: string;
  status: SapsIncidentStatus;
  assignedStationPrecinct: string;
  assignedUnitsCount: number;
  estimatedEtaMinutes: number;
  createdAt: string;
}

export interface SapsStatusUpdatePayload {
  status: SapsIncidentStatus;
  statusUpdateNotes: string;
  updatedByOfficerOrSystem: string;
  updatedAt: string;
}

export interface SapsCaseReference {
  sapsCaseNumber: string;
  sapsIncidentId: string;
  investigatingOfficerName?: string;
  investigatingOfficerRank?: string;
  investigatingOfficerContact?: string;
  policeStationPrecinct: string;
  docketStatus: 'OPEN' | 'PENDING_COURT' | 'COMPLETED' | 'WITHDRAWN';
  openedDate: string;
  lastUpdatedDate: string;
}

export interface SapsResponderAcknowledgement {
  ackId: string;
  sapsIncidentId: string;
  responderCallsign: string; // e.g. TSHWANE-FLYINGSQUAD-04
  officerRank: string;
  officerBadgeNumber: string;
  vehicleUnitRegistration: string;
  acceptedAt: string;
  currentDistanceKm: number;
  estimatedArrivalTimestamp: string;
  dispatchAckNotes?: string;
}

export interface SapsEvidenceReference {
  evidenceId: string;
  sapsIncidentId: string;
  evidenceType: SapsEvidenceType;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  mediaUrlOrStorageUri: string;
  sha256ChainOfCustodyHash: string;
  uploadedAt: string;
  uploadedBy: string;
  verificationStatus: 'PENDING_VERIFICATION' | 'VERIFIED_AUTHENTIC' | 'TAMPERED_REJECTED';
}

export interface SapsAuditLog {
  auditId: string;
  sapsIncidentId: string;
  action: 'INCIDENT_CREATED' | 'STATUS_CHANGED' | 'RESPONDER_ACKNOWLEDGED' | 'EVIDENCE_ATTACHED' | 'CASE_LINKED';
  performedBy: string;
  timestamp: string;
  previousState?: string;
  newState?: string;
  hmacSignature: string;
  details: string;
}

export interface SapsAdapterConfig {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  apiKey: string;
  pkiCertThumbprint?: string;
  sandboxMode: boolean;
  timeoutMs: number;
}
