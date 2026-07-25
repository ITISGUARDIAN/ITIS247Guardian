// ITIS Enterprise Mobile Health & Release Controller
// Exposes REST API endpoints for Phase D06 mobile build overview and app inventory.

import { Request, Response, Router } from 'express';
import { MobileHealthService } from './mobile-health.service';

export const mobileHealthRouter = Router();
const mobileService = MobileHealthService.getInstance();

/**
 * GET /api/v1/release/mobile/overview
 */
mobileHealthRouter.get('/overview', (req: Request, res: Response) => {
  try {
    const overview = mobileService.getOverview();
    return res.json({ success: true, overview });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'MOBILE_OVERVIEW_FAILED', message: err.message });
  }
});

/**
 * GET /api/v1/release/mobile/apps
 */
mobileHealthRouter.get('/apps', (req: Request, res: Response) => {
  try {
    const apps = mobileService.getAppsList();
    return res.json({ success: true, count: apps.length, apps });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'MOBILE_APPS_FAILED', message: err.message });
  }
});
