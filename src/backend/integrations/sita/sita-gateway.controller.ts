// ITIS SITA Gateway REST Controller
// Exposes API endpoints for Federated Authentication, Certificate Validation, Inter-Dept Routing,
// Immutable Audit Trails, and Connection SLA Monitoring.

import { Request, Response, Router } from 'express';
import { SitaGateway } from './sita.gateway';

export const sitaGatewayRouter = Router();

const sita = SitaGateway.getInstance();

/**
 * 1. CHECK SITA GATEWAY HEALTH
 * GET /api/v1/integrations/sita/health
 */
sitaGatewayRouter.get('/health', async (req: Request, res: Response) => {
  try {
    const health = await sita.checkHealth();
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      gatewayHealth: health
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SITA_HEALTH_FAILED', message: err.message });
  }
});

/**
 * 2. FEDERATED EGOV SSO AUTHENTICATION
 * POST /api/v1/integrations/sita/auth/verify-token
 */
sitaGatewayRouter.post('/auth/verify-token', async (req: Request, res: Response) => {
  try {
    const { sitaGovToken } = req.body;
    if (!sitaGovToken) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_TOKEN',
        message: 'SITA eGov Federated PKI Token is required.'
      });
    }

    const tokenInfo = await sita.verifyGovSsoToken(sitaGovToken);
    return res.json({
      success: true,
      message: 'SITA Federated eGov SSO Token Verified.',
      tokenInfo
    });
  } catch (err: any) {
    return res.status(401).json({ success: false, error: 'SITA_AUTH_FAILED', message: err.message });
  }
});

/**
 * 3. X.509 PKI CERTIFICATE VALIDATION
 * POST /api/v1/integrations/sita/certificates/validate
 */
sitaGatewayRouter.post('/certificates/validate', async (req: Request, res: Response) => {
  try {
    const { pkiCertThumbprint, pemCertificateString, departmentCode } = req.body;
    if (!pkiCertThumbprint) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_CERT_THUMBPRINT',
        message: 'PKI Certificate Thumbprint is required.'
      });
    }

    const result = await sita.validateCertificate({
      pkiCertThumbprint,
      pemCertificateString,
      departmentCode: departmentCode || 'DOT'
    });

    return res.json({
      success: true,
      result
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'CERT_VALIDATION_FAILED', message: err.message });
  }
});

/**
 * 4. SECURE INTER-DEPARTMENTAL GOVERNMENT ROUTING
 * POST /api/v1/integrations/sita/route-message
 */
sitaGatewayRouter.post('/route-message', async (req: Request, res: Response) => {
  try {
    const {
      sourceDepartment,
      targetDepartment,
      serviceAction,
      clearanceRequired,
      payloadData,
      priority,
      senderGovEmail
    } = req.body;

    if (!sourceDepartment || !targetDepartment || !serviceAction || !senderGovEmail) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_ROUTING_PARAMETERS',
        message: 'sourceDepartment, targetDepartment, serviceAction, and senderGovEmail are required.'
      });
    }

    const routingResponse = await sita.routeMessage({
      messageId: `SITA-MSG-${Date.now()}-${Math.floor(Math.random() * 8999 + 1000)}`,
      sourceDepartment,
      targetDepartment,
      serviceAction,
      clearanceRequired: clearanceRequired || 'UNRESTRICTED',
      payloadData: payloadData || {},
      priority: priority || 'ROUTINE',
      senderGovEmail
    });

    return res.json({
      success: true,
      message: 'Government Message Routing Processed.',
      routingResponse
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'MESSAGE_ROUTING_FAILED', message: err.message });
  }
});

/**
 * 5. IMMUTABLE AUDIT TRAIL LOGGING & FETCH
 * POST /api/v1/integrations/sita/audit-trail/log
 * GET /api/v1/integrations/sita/audit-trail/logs
 */
sitaGatewayRouter.post('/audit-trail/log', async (req: Request, res: Response) => {
  try {
    const { systemModule, actionCode, operatorGovEmail, departmentCode, payloadDigestSha256 } = req.body;

    const logRecord = sita.logAuditRecord({
      systemModule: systemModule || 'GENERAL_GATEWAY',
      actionCode: actionCode || 'AUDIT_LOG_ENTRY',
      operatorGovEmail: operatorGovEmail || 'system@govcloud.sita.co.za',
      departmentCode: departmentCode || 'DOT',
      payloadDigestSha256: payloadDigestSha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    });

    return res.status(201).json({
      success: true,
      message: 'Audit record appended to SITA G-Cloud Immutable Ledger.',
      logRecord
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'AUDIT_LOG_FAILED', message: err.message });
  }
});

sitaGatewayRouter.get('/audit-trail/logs', (req: Request, res: Response) => {
  const auditTrails = sita.getAuditTrails();
  return res.json({
    success: true,
    count: auditTrails.length,
    auditTrails
  });
});

/**
 * 6. CONNECTION MONITORING & SLA METRICS
 * GET /api/v1/integrations/sita/monitoring/metrics
 */
sitaGatewayRouter.get('/monitoring/metrics', async (req: Request, res: Response) => {
  try {
    const metrics = await sita.getConnectionMetrics();
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      departmentMetrics: metrics
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'MONITORING_FAILED', message: err.message });
  }
});
