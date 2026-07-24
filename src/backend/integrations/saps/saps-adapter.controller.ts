// ITIS SAPS Integration Adapter REST Controller
// Exposes API endpoints for Incident Creation, Status Updates, Case References,
// Responder Acknowledgements, Evidence Attachment, and Audit Logging.

import { Request, Response, Router } from 'express';
import { SapsIntegrationAdapter } from './saps.adapter';

export const sapsAdapterRouter = Router();

const adapter = SapsIntegrationAdapter.getInstance();

/**
 * 1. CHECK SAPS ADAPTER HEALTH
 * GET /api/v1/integrations/saps/health
 */
sapsAdapterRouter.get('/health', async (req: Request, res: Response) => {
  try {
    const health = await adapter.checkHealth();
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      health
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SAPS_HEALTH_CHECK_FAILED', message: err.message });
  }
});

/**
 * 2. CREATE EMERGENCY INCIDENT
 * POST /api/v1/integrations/saps/incidents
 */
sapsAdapterRouter.post('/incidents', async (req: Request, res: Response) => {
  try {
    const {
      externalIncidentId,
      category,
      severity,
      vehicleRegistrationNumber,
      driverIdNumber,
      location,
      reportedAt,
      description,
      reporterContactPhone,
      affectedLearnersCount
    } = req.body;

    if (!category || !severity || !vehicleRegistrationNumber || !location || !reporterContactPhone) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_REQUIRED_FIELDS',
        message: 'Category, Severity, Vehicle Registration Number, Location, and Reporter Phone are required.'
      });
    }

    const incident = await adapter.createIncident({
      externalIncidentId: externalIncidentId || `EXT-INC-${Date.now()}`,
      category,
      severity,
      vehicleRegistrationNumber,
      driverIdNumber,
      location,
      reportedAt: reportedAt || new Date().toISOString(),
      description: description || 'Emergency scholar transport incident triggered.',
      reporterContactPhone,
      affectedLearnersCount: Number(affectedLearnersCount || 0)
    });

    return res.status(201).json({
      success: true,
      message: 'SAPS Emergency Incident Logged & CAD Dispatch Triggered.',
      incident
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SAPS_INCIDENT_CREATE_FAILED', message: err.message });
  }
});

/**
 * 3. UPDATE INCIDENT STATUS
 * PUT /api/v1/integrations/saps/incidents/:incidentId/status
 */
sapsAdapterRouter.put('/incidents/:incidentId/status', async (req: Request, res: Response) => {
  try {
    const { incidentId } = req.params;
    const { status, statusUpdateNotes, updatedByOfficerOrSystem } = req.body;

    if (!status || !updatedByOfficerOrSystem) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_STATUS_PARAMETERS',
        message: 'Status and updatedByOfficerOrSystem are required.'
      });
    }

    const result = await adapter.updateIncidentStatus(incidentId, {
      status,
      statusUpdateNotes: statusUpdateNotes || 'Status changed via SAPS CAD adapter.',
      updatedByOfficerOrSystem,
      updatedAt: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: `Incident status updated to '${status}'.`,
      ...result
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: 'SAPS_STATUS_UPDATE_FAILED', message: err.message });
  }
});

/**
 * 4. GET CASE DOCKET REFERENCE
 * GET /api/v1/integrations/saps/cases/:sapsCaseNumber
 */
sapsAdapterRouter.get('/cases/:sapsCaseNumber(*)', async (req: Request, res: Response) => {
  try {
    const { sapsCaseNumber } = req.params;
    const caseRef = await adapter.getCaseReference(sapsCaseNumber);

    if (!caseRef) {
      return res.status(404).json({
        success: false,
        error: 'CASE_NOT_FOUND',
        message: `SAPS Case Reference '${sapsCaseNumber}' not found.`
      });
    }

    return res.json({
      success: true,
      caseReference: caseRef
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SAPS_CASE_LOOKUP_FAILED', message: err.message });
  }
});

/**
 * 5. RESPONDER DISPATCH ACKNOWLEDGEMENT
 * POST /api/v1/integrations/saps/incidents/:incidentId/acknowledge
 */
sapsAdapterRouter.post('/incidents/:incidentId/acknowledge', async (req: Request, res: Response) => {
  try {
    const { incidentId } = req.params;
    const {
      responderCallsign,
      officerRank,
      officerBadgeNumber,
      vehicleUnitRegistration,
      acceptedAt,
      currentDistanceKm,
      estimatedArrivalTimestamp,
      dispatchAckNotes
    } = req.body;

    if (!responderCallsign || !officerBadgeNumber) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_ACK_FIELDS',
        message: 'Responder Callsign and Officer Badge Number are required.'
      });
    }

    const result = await adapter.acknowledgeResponder(incidentId, {
      responderCallsign,
      officerRank: officerRank || 'Constable',
      officerBadgeNumber,
      vehicleUnitRegistration: vehicleUnitRegistration || 'UNKNOWN',
      acceptedAt: acceptedAt || new Date().toISOString(),
      currentDistanceKm: Number(currentDistanceKm || 5.0),
      estimatedArrivalTimestamp: estimatedArrivalTimestamp || new Date(Date.now() + 10 * 60000).toISOString(),
      dispatchAckNotes
    });

    return res.status(201).json({
      success: true,
      message: 'Responder dispatch acknowledgement recorded.',
      ...result
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: 'SAPS_ACK_FAILED', message: err.message });
  }
});

/**
 * 6. ATTACH EVIDENCE (DIGITAL CHAIN OF CUSTODY)
 * POST /api/v1/integrations/saps/incidents/:incidentId/evidence
 */
sapsAdapterRouter.post('/incidents/:incidentId/evidence', async (req: Request, res: Response) => {
  try {
    const { incidentId } = req.params;
    const {
      evidenceType,
      fileName,
      fileSizeBytes,
      mimeType,
      mediaUrlOrStorageUri,
      uploadedBy
    } = req.body;

    if (!evidenceType || !fileName || !mediaUrlOrStorageUri) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_EVIDENCE_FIELDS',
        message: 'Evidence Type, File Name, and Media URL are required.'
      });
    }

    const result = await adapter.attachEvidence(incidentId, {
      evidenceType,
      fileName,
      fileSizeBytes: Number(fileSizeBytes || 1024),
      mimeType: mimeType || 'application/octet-stream',
      mediaUrlOrStorageUri,
      uploadedBy: uploadedBy || 'SYSTEM_UPLOADER'
    });

    return res.status(201).json({
      success: true,
      message: 'Evidence successfully linked with SHA-256 Chain of Custody Hash.',
      ...result
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: 'SAPS_EVIDENCE_FAILED', message: err.message });
  }
});

/**
 * 7. GET INCIDENT AUDIT LOGS
 * GET /api/v1/integrations/saps/incidents/:incidentId/audit-logs
 */
sapsAdapterRouter.get('/incidents/:incidentId/audit-logs', async (req: Request, res: Response) => {
  try {
    const { incidentId } = req.params;
    const auditLogs = await adapter.getIncidentAuditLogs(incidentId);

    return res.json({
      success: true,
      sapsIncidentId: incidentId,
      count: auditLogs.length,
      auditLogs
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SAPS_AUDIT_FETCH_FAILED', message: err.message });
  }
});
