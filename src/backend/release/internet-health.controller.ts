// ITIS Enterprise Internet Health & Gateway Controller
// Exposes REST API endpoints for Phase D05 internet deployment health overview and domain inventory.

import { Request, Response, Router } from 'express';
import { InternetHealthService } from './internet-health.service';

export const internetHealthRouter = Router();
const internetService = InternetHealthService.getInstance();

/**
 * GET /api/v1/release/internet/overview
 */
internetHealthRouter.get('/overview', (req: Request, res: Response) => {
  try {
    const overview = internetService.getOverview();
    return res.json({ success: true, overview });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'INTERNET_OVERVIEW_FAILED', message: err.message });
  }
});

/**
 * GET /api/v1/release/internet/domains
 */
internetHealthRouter.get('/domains', (req: Request, res: Response) => {
  try {
    const domains = internetService.getDomainsList();
    return res.json({ success: true, count: domains.length, domains });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'INTERNET_DOMAINS_FAILED', message: err.message });
  }
});
