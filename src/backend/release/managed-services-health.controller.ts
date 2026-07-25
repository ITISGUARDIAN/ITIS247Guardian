// ITIS Enterprise Managed Services Controller
// Exposes REST API endpoints for Phase D04 managed services health overview and inventory.

import { Request, Response, Router } from 'express';
import { ManagedServicesHealthService } from './managed-services-health.service';

export const managedServicesHealthRouter = Router();
const managedServicesService = ManagedServicesHealthService.getInstance();

/**
 * GET /api/v1/release/managed-services/overview
 */
managedServicesHealthRouter.get('/overview', (req: Request, res: Response) => {
  try {
    const overview = managedServicesService.getOverview();
    return res.json({ success: true, overview });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'MANAGED_SERVICES_OVERVIEW_FAILED', message: err.message });
  }
});

/**
 * GET /api/v1/release/managed-services/list
 */
managedServicesHealthRouter.get('/list', (req: Request, res: Response) => {
  try {
    const services = managedServicesService.getServicesList();
    return res.json({ success: true, count: services.length, services });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'MANAGED_SERVICES_LIST_FAILED', message: err.message });
  }
});
