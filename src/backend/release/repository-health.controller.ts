// ITIS Enterprise Repository Health & Investor Due Diligence Controller
// Exposes REST API endpoints for monorepo health metrics, quality gates, and investor due diligence reports.

import { Request, Response, Router } from 'express';
import { RepositoryHealthService } from './repository-health.service';

export const repositoryHealthRouter = Router();
const healthService = RepositoryHealthService.getInstance();

/**
 * GET /api/v1/release/health/overview
 */
repositoryHealthRouter.get('/overview', (req: Request, res: Response) => {
  try {
    const overview = healthService.getOverview();
    return res.json({ success: true, overview });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'HEALTH_OVERVIEW_FAILED', message: err.message });
  }
});

/**
 * GET /api/v1/release/health/quality-gates
 */
repositoryHealthRouter.get('/quality-gates', (req: Request, res: Response) => {
  try {
    const gates = healthService.getQualityGates();
    return res.json({ success: true, count: gates.length, qualityGates: gates });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'QUALITY_GATES_FAILED', message: err.message });
  }
});
