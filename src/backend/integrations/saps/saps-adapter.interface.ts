// ITIS SAPS Integration Adapter Interface Contract
// Defines the strictly typed adapter contract for communication with SAPS Emergency Command Control systems.

import {
  SapsAuditLog,
  SapsCaseReference,
  SapsCreateIncidentPayload,
  SapsEvidenceReference,
  SapsIncidentResponse,
  SapsIncidentStatus,
  SapsResponderAcknowledgement,
  SapsStatusUpdatePayload
} from './saps.types';

export interface ISapsAdapter {
  createIncident(payload: SapsCreateIncidentPayload): Promise<SapsIncidentResponse>;
  
  updateIncidentStatus(
    sapsIncidentId: string,
    update: SapsStatusUpdatePayload
  ): Promise<{ success: boolean; incident: SapsIncidentResponse; auditLog: SapsAuditLog }>;

  getCaseReference(sapsCaseNumber: string): Promise<SapsCaseReference | null>;

  acknowledgeResponder(
    sapsIncidentId: string,
    ack: Omit<SapsResponderAcknowledgement, 'ackId' | 'sapsIncidentId'>
  ): Promise<{ success: boolean; acknowledgement: SapsResponderAcknowledgement }>;

  attachEvidence(
    sapsIncidentId: string,
    evidence: Omit<SapsEvidenceReference, 'evidenceId' | 'sapsIncidentId' | 'sha256ChainOfCustodyHash' | 'uploadedAt' | 'verificationStatus'>
  ): Promise<{ success: boolean; evidenceRecord: SapsEvidenceReference }>;

  getIncidentAuditLogs(sapsIncidentId: string): Promise<SapsAuditLog[]>;

  checkHealth(): Promise<{ status: 'ONLINE' | 'SANDBOX_ACTIVE' | 'OFFLINE'; responseTimeMs: number; gatewayVersion: string }>;
}
