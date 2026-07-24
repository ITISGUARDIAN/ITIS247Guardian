// ITIS External Government Gateway REST Controller
// Exposes API Endpoints for DBE, PED, SAPS, SITA, National Treasury, and EMIS integrations

import { Request, Response, Router } from 'express';
import { GovernmentGatewayFactory } from './government-gateway.factory';

export const governmentGatewayRouter = Router();

const gateway = GovernmentGatewayFactory.getInstance();

/**
 * 1. CHECK HEALTH OF ALL 6 GOVERNMENT INTEGRATION ADAPTERS
 * GET /api/v1/integrations/government/health
 */
governmentGatewayRouter.get('/health', async (req: Request, res: Response) => {
  try {
    const healthMap = await gateway.checkHealthAll();
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      departments: healthMap
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'GOV_HEALTH_CHECK_FAILED', message: err.message });
  }
});

// =========================================================
// 2. DEPARTMENT OF BASIC EDUCATION (DBE) ENDPOINTS
// =========================================================

/**
 * POST /api/v1/integrations/government/dbe/verify-school
 */
governmentGatewayRouter.post('/dbe/verify-school', async (req: Request, res: Response) => {
  try {
    const { emisNumber, schoolName, province } = req.body;
    const result = await gateway.getDbeProvider().verifySchool({ emisNumber, schoolName, province });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DBE_VERIFY_EXCEPTION', message: err.message });
  }
});

/**
 * POST /api/v1/integrations/government/dbe/verify-nsc
 */
governmentGatewayRouter.post('/dbe/verify-nsc', async (req: Request, res: Response) => {
  try {
    const { nationalIdNumber, examYear } = req.body;
    const result = await gateway.getDbeProvider().verifyNscResults({ nationalIdNumber, examYear });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DBE_NSC_EXCEPTION', message: err.message });
  }
});

// =========================================================
// 3. PROVINCIAL EDUCATION DEPARTMENTS (PED) ENDPOINTS
// =========================================================

/**
 * POST /api/v1/integrations/government/ped/subsidy-check
 */
governmentGatewayRouter.post('/ped/subsidy-check', async (req: Request, res: Response) => {
  try {
    const { province, learnerLuritsId, emisNumber, pickupDistanceKm } = req.body;
    const result = await gateway.getPedProvider().verifyTransportSubsidy({
      province,
      learnerLuritsId,
      emisNumber,
      pickupDistanceKm: Number(pickupDistanceKm || 3.5)
    });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'PED_SUBSIDY_EXCEPTION', message: err.message });
  }
});

/**
 * POST /api/v1/integrations/government/ped/route-accreditation
 */
governmentGatewayRouter.post('/ped/route-accreditation', async (req: Request, res: Response) => {
  try {
    const { province, operatorCsdNumber, routeCode, vehicleRegistrationNumber } = req.body;
    const result = await gateway.getPedProvider().verifyRouteAccreditation({
      province,
      operatorCsdNumber,
      routeCode,
      vehicleRegistrationNumber
    });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'PED_ROUTE_EXCEPTION', message: err.message });
  }
});

// =========================================================
// 4. SOUTH AFRICAN POLICE SERVICE (SAPS) ENDPOINTS
// =========================================================

/**
 * POST /api/v1/integrations/government/saps/vet-driver
 */
governmentGatewayRouter.post('/saps/vet-driver', async (req: Request, res: Response) => {
  try {
    const { idNumber, pdpLicenseNumber, fingerprintHash } = req.body;
    const result = await gateway.getSapsProvider().vetDriverPdp({ idNumber, pdpLicenseNumber, fingerprintHash });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SAPS_VETTING_EXCEPTION', message: err.message });
  }
});

/**
 * POST /api/v1/integrations/government/saps/dispatch-sos
 */
governmentGatewayRouter.post('/saps/dispatch-sos', async (req: Request, res: Response) => {
  try {
    const { sosEventId, latitude, longitude, vehicleRegistration, incidentType, nearestPoliceStation, callerContactPhone } = req.body;
    const result = await gateway.getSapsProvider().dispatchEmergencySos({
      sosEventId,
      latitude: Number(latitude),
      longitude: Number(longitude),
      vehicleRegistration,
      incidentType,
      nearestPoliceStation,
      priority: 'CRITICAL',
      callerContactPhone
    });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SAPS_SOS_EXCEPTION', message: err.message });
  }
});

// =========================================================
// 5. STATE INFORMATION TECHNOLOGY AGENCY (SITA) ENDPOINTS
// =========================================================

/**
 * POST /api/v1/integrations/government/sita/egov-sso-verify
 */
governmentGatewayRouter.post('/sita/egov-sso-verify', async (req: Request, res: Response) => {
  try {
    const { sitaGovToken, requestedServiceRole } = req.body;
    const result = await gateway.getSitaProvider().verifyGovSsoToken({ sitaGovToken, requestedServiceRole });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SITA_SSO_EXCEPTION', message: err.message });
  }
});

/**
 * POST /api/v1/integrations/government/sita/audit-log
 */
governmentGatewayRouter.post('/sita/audit-log', async (req: Request, res: Response) => {
  try {
    const { systemModule, actionCode, operatorGovEmail, payloadDigestSha256 } = req.body;
    const result = await gateway.getSitaProvider().logToGovCloudAudit({
      systemModule,
      actionCode,
      operatorGovEmail,
      payloadDigestSha256
    });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SITA_AUDIT_EXCEPTION', message: err.message });
  }
});

// =========================================================
// 6. NATIONAL TREASURY ENDPOINTS
// =========================================================

/**
 * POST /api/v1/integrations/government/treasury/verify-supplier
 */
governmentGatewayRouter.post('/treasury/verify-supplier', async (req: Request, res: Response) => {
  try {
    const { csdSupplierNumber, taxClearancePin } = req.body;
    const result = await gateway.getTreasuryProvider().verifyCsdSupplier({ csdSupplierNumber, taxClearancePin });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'TREASURY_CSD_EXCEPTION', message: err.message });
  }
});

/**
 * POST /api/v1/integrations/government/treasury/verify-scoa
 */
governmentGatewayRouter.post('/treasury/verify-scoa', async (req: Request, res: Response) => {
  try {
    const { voteNumber, costCenterCode, requestedAmountZar, financialYear } = req.body;
    const result = await gateway.getTreasuryProvider().verifyScoaBudgetAllocation({
      voteNumber,
      costCenterCode,
      requestedAmountZar: Number(requestedAmountZar),
      financialYear
    });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'TREASURY_SCOA_EXCEPTION', message: err.message });
  }
});

// =========================================================
// 7. EDUCATIONAL MANAGEMENT INFORMATION SYSTEM (EMIS) ENDPOINTS
// =========================================================

/**
 * POST /api/v1/integrations/government/emis/sync-school
 */
governmentGatewayRouter.post('/emis/sync-school', async (req: Request, res: Response) => {
  try {
    const { emisNumber } = req.body;
    const result = await gateway.getEmisProvider().syncSchoolMaster({ emisNumber });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'EMIS_SYNC_EXCEPTION', message: err.message });
  }
});

/**
 * POST /api/v1/integrations/government/emis/sync-attendance
 */
governmentGatewayRouter.post('/emis/sync-attendance', async (req: Request, res: Response) => {
  try {
    const { emisNumber, academicDate, totalBoardedTransport, totalSafelyArrived, absentLearnersCount } = req.body;
    const result = await gateway.getEmisProvider().uploadAttendanceRecords({
      emisNumber,
      academicDate,
      totalBoardedTransport: Number(totalBoardedTransport || 0),
      totalSafelyArrived: Number(totalSafelyArrived || 0),
      absentLearnersCount: Number(absentLearnersCount || 0)
    });
    return res.status(result.statusCode).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'EMIS_ATTENDANCE_EXCEPTION', message: err.message });
  }
});
