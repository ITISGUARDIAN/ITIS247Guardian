// ITIS Enterprise Infrastructure Health & Operational Certification Controller
// Exposes REST API endpoints for Phase D03 cloud infrastructure health, 11-category checklist, and topology overview.

import { Request, Response, Router } from 'express';
import { InfrastructureHealthService } from './infrastructure-health.service';

export const infrastructureHealthRouter = Router();
const infraService = InfrastructureHealthService.getInstance();

/**
 * GET /api/v1/release/infrastructure/overview
 */
infrastructureHealthRouter.get('/overview', (req: Request, res: Response) => {
  try {
    const overview = infraService.getOverview();
    return res.json({ success: true, overview });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'INFRASTRUCTURE_OVERVIEW_FAILED', message: err.message });
  }
});

/**
 * GET /api/v1/release/infrastructure/checklist
 */
infrastructureHealthRouter.get('/checklist', (req: Request, res: Response) => {
  try {
    const checklist = infraService.getChecklist();
    return res.json({ success: true, count: checklist.length, checklist });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'INFRASTRUCTURE_CHECKLIST_FAILED', message: err.message });
  }
});
