// ITIS Version 1.0 Production Launch & Release Certification Controller
// Exposes API endpoints for Version 1.0 GA Promotion, Release Checklist, Verification Suite, Executive Sign-offs, Acceptance Certificates, & Release Archive.

import { Request, Response, Router } from 'express';
import { V1CertificationService } from './v1-certification.service';

export const releaseCertificationRouter = Router();

const certService = V1CertificationService.getInstance();

/**
 * 1. GET LAUNCH OVERVIEW METRICS
 * GET /api/v1/release/certification/overview
 */
releaseCertificationRouter.get('/overview', async (req: Request, res: Response) => {
  try {
    const overview = await certService.getOverview();
    return res.json({
      success: true,
      overview
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'RELEASE_OVERVIEW_FAILED', message: err.message });
  }
});

/**
 * 2. GET VERIFICATION SUITE CHECKS (SECURITY, DB, MOBILE, API, PERF)
 * GET /api/v1/release/certification/verifications
 */
releaseCertificationRouter.get('/verifications', async (req: Request, res: Response) => {
  try {
    const verifications = await certService.getVerificationChecks();
    return res.json({
      success: true,
      count: verifications.length,
      verifications
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'VERIFICATIONS_FETCH_FAILED', message: err.message });
  }
});

/**
 * 3. GET EXECUTIVE SIGN-OFFS
 * GET /api/v1/release/certification/sign-offs
 */
releaseCertificationRouter.get('/sign-offs', async (req: Request, res: Response) => {
  try {
    const signOffs = await certService.getExecutiveSignOffs();
    return res.json({
      success: true,
      count: signOffs.length,
      signOffs
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SIGN_OFFS_FETCH_FAILED', message: err.message });
  }
});

/**
 * 4. GET PRODUCTION ACCEPTANCE CERTIFICATE
 * GET /api/v1/release/certification/certificate
 */
releaseCertificationRouter.get('/certificate', async (req: Request, res: Response) => {
  try {
    const certificate = await certService.getAcceptanceCertificate();
    return res.json({
      success: true,
      certificate
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'CERTIFICATE_FETCH_FAILED', message: err.message });
  }
});

/**
 * 5. GET RELEASE NOTES
 * GET /api/v1/release/certification/release-notes
 */
releaseCertificationRouter.get('/release-notes', async (req: Request, res: Response) => {
  try {
    const releaseNotes = await certService.getReleaseNotes();
    return res.json({
      success: true,
      releaseNotes
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'RELEASE_NOTES_FETCH_FAILED', message: err.message });
  }
});

/**
 * 6. GET VERSION ARCHIVE
 * GET /api/v1/release/certification/archive
 */
releaseCertificationRouter.get('/archive', async (req: Request, res: Response) => {
  try {
    const archive = await certService.getVersionArchive();
    return res.json({
      success: true,
      count: archive.length,
      archive
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'ARCHIVE_FETCH_FAILED', message: err.message });
  }
});

/**
 * 7. PROMOTE RC3 -> VERSION 1.0 GA
 * POST /api/v1/release/certification/promote
 */
releaseCertificationRouter.post('/promote', async (req: Request, res: Response) => {
  try {
    const result = await certService.promoteReleaseToVersion1();
    return res.json({
      success: true,
      ...result
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'PROMOTION_FAILED', message: err.message });
  }
});
