// ITIS Enterprise Deployment Health & Gateway Controller
// Exposes REST API endpoints for Phase D07 deployment health overview and production application builds inventory.

import { Request, Response, Router } from 'express';
import { DeploymentHealthService } from './deployment-health.service';

export const deploymentHealthRouter = Router();
const deploymentService = DeploymentHealthService.getInstance();

/**
 * GET /api/v1/release/deployment/overview
 */
deploymentHealthRouter.get('/overview', (req: Request, res: Response) => {
  try {
    const overview = deploymentService.getOverview();
    return res.json({ success: true, overview });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DEPLOYMENT_OVERVIEW_FAILED', message: err.message });
  }
});

/**
 * GET /api/v1/release/deployment/applications
 */
deploymentHealthRouter.get('/applications', (req: Request, res: Response) => {
  try {
    const apps = deploymentService.getApplicationsList();
    return res.json({ success: true, count: apps.length, applications: apps });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DEPLOYMENT_APPS_FAILED', message: err.message });
  }
});
