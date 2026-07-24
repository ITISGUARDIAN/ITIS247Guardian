// ITIS Production Learners Controller
import { Router, Request, Response } from 'express';
import { liveState } from '../api.routes';
import { AuditLogger } from '../common/audit.logger';

export const learnerRouter = Router();

// GET /api/v1/learners
learnerRouter.get('/', async (req: Request, res: Response) => {
  const search = (req.query.search as string || '').toLowerCase();
  const schoolId = req.query.schoolId as string;

  let filtered = liveState.learners || [];
  if (schoolId) {
    filtered = filtered.filter(l => l.schoolId === schoolId);
  }
  if (search) {
    filtered = filtered.filter(l =>
      l.firstName.toLowerCase().includes(search) ||
      l.lastName.toLowerCase().includes(search) ||
      l.nationalId.includes(search) ||
      l.schoolName.toLowerCase().includes(search) ||
      l.wearableSerial.toLowerCase().includes(search)
    );
  }

  AuditLogger.recordAudit({
    action: 'FETCH_LEARNERS_LIST',
    resource: '/api/v1/learners',
    correlationId: (req as any).correlationId || 'SYS-LEARNERS',
    metadata: { count: filtered.length, search, schoolId }
  });

  return res.json({
    status: 'SUCCESS',
    data: filtered,
    total: filtered.length,
    timestamp: new Date().toISOString()
  });
});

// GET /api/v1/learners/:id
learnerRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const learner = (liveState.learners || []).find(l => l.id === id || l.nationalId === id);

  if (!learner) {
    return res.status(404).json({ status: 'ERROR', error: 'NOT_FOUND', message: `Learner record ${id} not found.` });
  }

  AuditLogger.recordAudit({
    action: 'VIEW_LEARNER_PROFILE',
    resource: `/api/v1/learners/${id}`,
    correlationId: (req as any).correlationId || 'SYS-LEARNERS',
    metadata: { learnerId: learner.id, nationalId: learner.nationalId }
  });

  return res.json({
    status: 'SUCCESS',
    learner: {
      ...learner,
      lastGpsFix: { lat: learner.lastLat, lng: learner.lastLng, timestamp: new Date().toISOString() }
    }
  });
});

