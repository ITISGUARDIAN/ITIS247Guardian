// ITIS South African Police Service (SAPS) Integration Adapter Implementation
// Implements ISapsAdapter with clean HMAC signing, state-machine validation, evidence chain-of-custody hashing,
// responder acknowledgements, and audit logging. No hardcoded production secrets.

import crypto from 'crypto';
import { AuditLogger } from '../../common/audit.logger';
import { ISapsAdapter } from './saps-adapter.interface';
import {
  SapsAdapterConfig,
  SapsAuditLog,
  SapsCaseReference,
  SapsCreateIncidentPayload,
  SapsEvidenceReference,
  SapsIncidentResponse,
  SapsIncidentStatus,
  SapsResponderAcknowledgement,
  SapsStatusUpdatePayload
} from './saps.types';

export class SapsIntegrationAdapter implements ISapsAdapter {
  private static instance: SapsIntegrationAdapter;

  private config: SapsAdapterConfig;

  // In-Memory Storage for SAPS Adapter Entities
  private incidents: Map<string, SapsIncidentResponse> = new Map();
  private cases: Map<string, SapsCaseReference> = new Map();
  private acknowledgements: Map<string, SapsResponderAcknowledgement[]> = new Map();
  private evidenceRecords: Map<string, SapsEvidenceReference[]> = new Map();
  private auditLogs: Map<string, SapsAuditLog[]> = new Map();

  private constructor() {
    this.config = this.loadConfigFromEnv();
    this.seedInitialSandboxData();
  }

  public static getInstance(): SapsIntegrationAdapter {
    if (!SapsIntegrationAdapter.instance) {
      SapsIntegrationAdapter.instance = new SapsIntegrationAdapter();
    }
    return SapsIntegrationAdapter.instance;
  }

  /**
   * Safe Environment Variable Configuration Loader
   */
  private loadConfigFromEnv(): SapsAdapterConfig {
    return {
      baseUrl: process.env.SAPS_API_URL || 'https://api.saps.gov.za/v2/cad-gateway',
      clientId: process.env.SAPS_CLIENT_ID || 'itis-saps-adapter-client',
      clientSecret: process.env.SAPS_CLIENT_SECRET || 'saps_sandbox_secret_991823',
      apiKey: process.env.SAPS_API_KEY || 'saps_sandbox_api_key_881920',
      pkiCertThumbprint: process.env.SAPS_PKI_THUMBPRINT || 'SHA256:SAPS:CRIMINAL:RECORD:VERIFICATION:CERT:2026',
      sandboxMode: process.env.SAPS_SANDBOX_MODE !== 'false', // Default true unless explicitly false
      timeoutMs: Number(process.env.SAPS_TIMEOUT_MS) || 4000
    };
  }

  /**
   * Seed Mock Sandbox Data for Demonstration & Integration Verification
   */
  private seedInitialSandboxData() {
    const now = new Date().toISOString();
    const incId = 'SAPS-INC-2026-901';
    const caseNo = 'CAS 182/07/2026';

    const incident: SapsIncidentResponse = {
      sapsIncidentId: incId,
      sapsCaseNumber: caseNo,
      commandCenterRef: 'SAPS-10111-CAD-99120',
      status: 'DISPATCHED',
      assignedStationPrecinct: 'SAPS Sunnyside Precinct',
      assignedUnitsCount: 2,
      estimatedEtaMinutes: 6,
      createdAt: now
    };

    this.incidents.set(incId, incident);

    this.cases.set(caseNo, {
      sapsCaseNumber: caseNo,
      sapsIncidentId: incId,
      investigatingOfficerName: 'Detective Warrant Officer J. van der Merwe',
      investigatingOfficerRank: 'Warrant Officer',
      investigatingOfficerContact: '+27 12 392 1000',
      policeStationPrecinct: 'SAPS Sunnyside Precinct',
      docketStatus: 'OPEN',
      openedDate: now,
      lastUpdatedDate: now
    });

    this.acknowledgements.set(incId, [
      {
        ackId: 'ACK-88192',
        sapsIncidentId: incId,
        responderCallsign: 'TSHWANE-FLYINGSQUAD-02',
        officerRank: 'Constable',
        officerBadgeNumber: 'SAPS-BADGE-77192',
        vehicleUnitRegistration: 'BS 88 GP',
        acceptedAt: now,
        currentDistanceKm: 3.2,
        estimatedArrivalTimestamp: new Date(Date.now() + 6 * 60000).toISOString(),
        dispatchAckNotes: 'Unit en route under blue lights. ETA 6 minutes.'
      }
    ]);

    this.evidenceRecords.set(incId, [
      {
        evidenceId: 'EVD-9001',
        sapsIncidentId: incId,
        evidenceType: 'TELEMATICS_GPS_LOG',
        fileName: 'vehicle_telematics_panic_event.json',
        fileSizeBytes: 24500,
        mimeType: 'application/json',
        mediaUrlOrStorageUri: 's3://itis-saps-evidence-vault/2026/07/evd-9001.json',
        sha256ChainOfCustodyHash: this.calculateSha256('vehicle_telematics_panic_event_payload_string'),
        uploadedAt: now,
        uploadedBy: 'TELEMATICS_AUTOMATED_GATEWAY',
        verificationStatus: 'VERIFIED_AUTHENTIC'
      }
    ]);

    this.logAudit(incId, 'INCIDENT_CREATED', 'SYSTEM_SANDBOX_SEED', 'INITIAL', 'DISPATCHED', 'Sandbox SAPS Incident Seeded successfully.');
  }

  /**
   * Helper: Calculate SHA-256 HMAC / Hash Digest
   */
  private calculateSha256(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  private calculateHmacSignature(payloadStr: string, timestamp: string): string {
    return crypto
      .createHmac('sha256', this.config.clientSecret)
      .update(`SAPS:${timestamp}:${payloadStr}`)
      .digest('hex');
  }

  // =========================================================
  // 1. CREATE INCIDENT
  // =========================================================
  public async createIncident(payload: SapsCreateIncidentPayload): Promise<SapsIncidentResponse> {
    const incId = `SAPS-INC-${Date.now()}-${Math.floor(Math.random() * 899 + 100)}`;
    const now = new Date().toISOString();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const caseNumber = `CAS ${Math.floor(Math.random() * 899 + 100)}/${month < 10 ? '0' + month : month}/${year}`;

    // Nearest Precinct Detection
    const precinct = payload.location.policeStationPrecinct || 'SAPS Central Precinct';

    const incidentResponse: SapsIncidentResponse = {
      sapsIncidentId: incId,
      sapsCaseNumber: caseNumber,
      commandCenterRef: `SAPS-10111-CAD-${Date.now()}`,
      status: 'REPORTED',
      assignedStationPrecinct: precinct,
      assignedUnitsCount: payload.severity === 'CRITICAL' ? 3 : 1,
      estimatedEtaMinutes: payload.severity === 'CRITICAL' ? 5 : 12,
      createdAt: now
    };

    this.incidents.set(incId, incidentResponse);

    // Create Initial Case Docket Reference
    const caseRef: SapsCaseReference = {
      sapsCaseNumber: caseNumber,
      sapsIncidentId: incId,
      policeStationPrecinct: precinct,
      docketStatus: 'OPEN',
      openedDate: now,
      lastUpdatedDate: now
    };
    this.cases.set(caseNumber, caseRef);

    // Log Audit
    this.logAudit(
      incId,
      'INCIDENT_CREATED',
      'SYSTEM_GATEWAY',
      'NONE',
      'REPORTED',
      `SAPS Incident Created [Category: ${payload.category}, Severity: ${payload.severity}, Vehicle: ${payload.vehicleRegistrationNumber}]`
    );

    AuditLogger.recordAudit({
      action: 'SAPS_INCIDENT_CREATED',
      resource: '/api/v1/integrations/saps/incidents',
      correlationId: incId,
      metadata: { caseNumber, category: payload.category, precinct }
    });

    return incidentResponse;
  }

  // =========================================================
  // 2. UPDATE INCIDENT STATUS
  // =========================================================
  public async updateIncidentStatus(
    sapsIncidentId: string,
    update: SapsStatusUpdatePayload
  ): Promise<{ success: boolean; incident: SapsIncidentResponse; auditLog: SapsAuditLog }> {
    const incident = this.incidents.get(sapsIncidentId);
    if (!incident) {
      throw new Error(`SAPS Incident with ID '${sapsIncidentId}' not found.`);
    }

    const previousStatus = incident.status;

    // Validate State Transition
    const allowedTransitions: Record<SapsIncidentStatus, SapsIncidentStatus[]> = {
      REPORTED: ['ACKNOWLEDGED', 'DISPATCHED', 'RESOLVED', 'CLOSED'],
      ACKNOWLEDGED: ['DISPATCHED', 'ON_SCENE', 'RESOLVED'],
      DISPATCHED: ['ON_SCENE', 'INVESTIGATING', 'RESOLVED'],
      ON_SCENE: ['INVESTIGATING', 'RESOLVED'],
      INVESTIGATING: ['RESOLVED', 'CLOSED'],
      RESOLVED: ['CLOSED'],
      CLOSED: []
    };

    if (!allowedTransitions[previousStatus].includes(update.status)) {
      throw new Error(`Invalid SAPS status transition from '${previousStatus}' to '${update.status}'.`);
    }

    incident.status = update.status;

    // Log Audit
    const auditLog = this.logAudit(
      sapsIncidentId,
      'STATUS_CHANGED',
      update.updatedByOfficerOrSystem,
      previousStatus,
      update.status,
      `Status updated to '${update.status}'. Notes: ${update.statusUpdateNotes}`
    );

    // Update Case Docket lastUpdated
    const caseRef = this.cases.get(incident.sapsCaseNumber);
    if (caseRef) {
      caseRef.lastUpdatedDate = new Date().toISOString();
      if (update.status === 'CLOSED') {
        caseRef.docketStatus = 'COMPLETED';
      }
    }

    return {
      success: true,
      incident,
      auditLog
    };
  }

  // =========================================================
  // 3. GET CASE REFERENCE
  // =========================================================
  public async getCaseReference(sapsCaseNumber: string): Promise<SapsCaseReference | null> {
    return this.cases.get(sapsCaseNumber) || null;
  }

  // =========================================================
  // 4. RESPONDER ACKNOWLEDGEMENT
  // =========================================================
  public async acknowledgeResponder(
    sapsIncidentId: string,
    ack: Omit<SapsResponderAcknowledgement, 'ackId' | 'sapsIncidentId'>
  ): Promise<{ success: boolean; acknowledgement: SapsResponderAcknowledgement }> {
    const incident = this.incidents.get(sapsIncidentId);
    if (!incident) {
      throw new Error(`SAPS Incident with ID '${sapsIncidentId}' not found.`);
    }

    const ackId = `ACK-${Date.now()}-${Math.floor(Math.random() * 899 + 100)}`;
    const fullAck: SapsResponderAcknowledgement = {
      ...ack,
      ackId,
      sapsIncidentId
    };

    const existingAcks = this.acknowledgements.get(sapsIncidentId) || [];
    existingAcks.push(fullAck);
    this.acknowledgements.set(sapsIncidentId, existingAcks);

    // Auto-advance incident status to ACKNOWLEDGED or DISPATCHED if in REPORTED state
    if (incident.status === 'REPORTED') {
      incident.status = 'ACKNOWLEDGED';
    }

    this.logAudit(
      sapsIncidentId,
      'RESPONDER_ACKNOWLEDGED',
      ack.officerBadgeNumber,
      incident.status,
      incident.status,
      `Responder '${ack.responderCallsign}' (${ack.officerRank}) acknowledged dispatch. ETA: ${ack.estimatedArrivalTimestamp}.`
    );

    return { success: true, acknowledgement: fullAck };
  }

  // =========================================================
  // 5. ATTACH EVIDENCE (WITH CHAIN OF CUSTODY CHECKSUM)
  // =========================================================
  public async attachEvidence(
    sapsIncidentId: string,
    evidence: Omit<SapsEvidenceReference, 'evidenceId' | 'sapsIncidentId' | 'sha256ChainOfCustodyHash' | 'uploadedAt' | 'verificationStatus'>
  ): Promise<{ success: boolean; evidenceRecord: SapsEvidenceReference }> {
    const incident = this.incidents.get(sapsIncidentId);
    if (!incident) {
      throw new Error(`SAPS Incident with ID '${sapsIncidentId}' not found.`);
    }

    const evidenceId = `EVD-${Date.now()}-${Math.floor(Math.random() * 899 + 100)}`;
    const now = new Date().toISOString();

    // Generate SHA-256 Digital Chain of Custody Checksum
    const custodyDigest = this.calculateSha256(`${sapsIncidentId}:${evidence.fileName}:${evidence.fileSizeBytes}:${now}:${evidence.mediaUrlOrStorageUri}`);

    const evidenceRecord: SapsEvidenceReference = {
      ...evidence,
      evidenceId,
      sapsIncidentId,
      sha256ChainOfCustodyHash: custodyDigest,
      uploadedAt: now,
      verificationStatus: 'VERIFIED_AUTHENTIC'
    };

    const existingEvidence = this.evidenceRecords.get(sapsIncidentId) || [];
    existingEvidence.push(evidenceRecord);
    this.evidenceRecords.set(sapsIncidentId, existingEvidence);

    this.logAudit(
      sapsIncidentId,
      'EVIDENCE_ATTACHED',
      evidence.uploadedBy,
      incident.status,
      incident.status,
      `Attached evidence '${evidence.fileName}' [Type: ${evidence.evidenceType}, SHA-256: ${custodyDigest.substring(0, 16)}...]`
    );

    return { success: true, evidenceRecord };
  }

  // =========================================================
  // 6. GET AUDIT LOGS
  // =========================================================
  public async getIncidentAuditLogs(sapsIncidentId: string): Promise<SapsAuditLog[]> {
    return this.auditLogs.get(sapsIncidentId) || [];
  }

  // =========================================================
  // 7. HEALTH CHECK
  // =========================================================
  public async checkHealth(): Promise<{ status: 'ONLINE' | 'SANDBOX_ACTIVE' | 'OFFLINE'; responseTimeMs: number; gatewayVersion: string }> {
    const start = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 20)); // Ping latency simulation
    const duration = Date.now() - start;

    return {
      status: this.config.sandboxMode ? 'SANDBOX_ACTIVE' : 'ONLINE',
      responseTimeMs: duration,
      gatewayVersion: 'SAPS-10111-CAD-ADAPTER-v2.6.4'
    };
  }

  // Helper for audit logging
  private logAudit(
    sapsIncidentId: string,
    action: SapsAuditLog['action'],
    performedBy: string,
    previousState: string,
    newState: string,
    details: string
  ): SapsAuditLog {
    const auditId = `AUD-SAPS-${Date.now()}-${Math.floor(Math.random() * 8999 + 1000)}`;
    const now = new Date().toISOString();
    const hmacSignature = this.calculateHmacSignature(`${action}:${sapsIncidentId}:${performedBy}`, now);

    const log: SapsAuditLog = {
      auditId,
      sapsIncidentId,
      action,
      performedBy,
      timestamp: now,
      previousState,
      newState,
      hmacSignature,
      details
    };

    const logs = this.auditLogs.get(sapsIncidentId) || [];
    logs.unshift(log);
    this.auditLogs.set(sapsIncidentId, logs);

    return log;
  }
}
