// ITIS EMIS Synchronization Express REST API Controller
// Exposes API routes for Schools, Learners, Teachers, Classrooms, Transfers, Graduations,
// Synchronization Audit Logs, and Conflict Resolution strategies.

import { Request, Response, Router } from 'express';
import { EmisConflictResolver } from './emis-conflict.resolver';
import { EmisSyncEngine } from './emis-sync.engine';

export const emisSyncRouter = Router();

const engine = EmisSyncEngine.getInstance();
const conflictResolver = EmisConflictResolver.getInstance();

/**
 * 1. EXECUTE EMIS SYNCHRONIZATION
 * POST /api/v1/integrations/emis/sync
 */
emisSyncRouter.post('/sync', async (req: Request, res: Response) => {
  try {
    const { entities, emisNumberFilter, conflictStrategy, academicYear, operator } = req.body;

    const summary = await engine.executeSynchronization(
      { entities, emisNumberFilter, conflictStrategy, academicYear },
      operator || req.headers['x-operator-email'] as string || 'ADMIN_OPERATOR'
    );

    return res.status(200).json({
      success: true,
      message: 'EMIS Master Synchronization Executed Successfully.',
      summary
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'EMIS_SYNC_FAILED', message: err.message });
  }
});

/**
 * 2. SCHOOLS ENDPOINTS
 * GET /api/v1/integrations/emis/schools
 * POST /api/v1/integrations/emis/schools
 */
emisSyncRouter.get('/schools', (req: Request, res: Response) => {
  const schools = engine.getSchools();
  return res.json({ success: true, count: schools.length, schools });
});

emisSyncRouter.post('/schools', (req: Request, res: Response) => {
  try {
    const school = req.body;
    if (!school.emisNumber || !school.schoolName) {
      return res.status(400).json({ success: false, error: 'EMIS number and school name are required.' });
    }
    school.lastSyncedAt = new Date().toISOString();
    engine.addSchool(school);
    return res.status(201).json({ success: true, message: 'School record added to EMIS master.', school });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 3. LEARNERS (LURITS) ENDPOINTS
 * GET /api/v1/integrations/emis/learners
 * POST /api/v1/integrations/emis/learners
 */
emisSyncRouter.get('/learners', (req: Request, res: Response) => {
  const learners = engine.getLearners();
  return res.json({ success: true, count: learners.length, learners });
});

emisSyncRouter.post('/learners', (req: Request, res: Response) => {
  try {
    const learner = req.body;
    if (!learner.luritsId || !learner.emisNumber || !learner.firstName) {
      return res.status(400).json({ success: false, error: 'LURITS ID, EMIS number, and First Name are required.' });
    }
    learner.lastSyncedAt = new Date().toISOString();
    engine.addLearner(learner);
    return res.status(201).json({ success: true, message: 'Learner LURITS record created/updated.', learner });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 4. TEACHERS (PERSAL / SACE) ENDPOINTS
 * GET /api/v1/integrations/emis/teachers
 * POST /api/v1/integrations/emis/teachers
 */
emisSyncRouter.get('/teachers', (req: Request, res: Response) => {
  const teachers = engine.getTeachers();
  return res.json({ success: true, count: teachers.length, teachers });
});

emisSyncRouter.post('/teachers', (req: Request, res: Response) => {
  try {
    const teacher = req.body;
    if (!teacher.persalNumber || !teacher.fullName) {
      return res.status(400).json({ success: false, error: 'PERSAL number and Full Name required.' });
    }
    teacher.lastSyncedAt = new Date().toISOString();
    engine.addTeacher(teacher);
    return res.status(201).json({ success: true, message: 'Educator PERSAL record created.', teacher });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 5. CLASSROOMS ENDPOINTS
 * GET /api/v1/integrations/emis/classrooms
 * POST /api/v1/integrations/emis/classrooms
 */
emisSyncRouter.get('/classrooms', (req: Request, res: Response) => {
  const classrooms = engine.getClassrooms();
  return res.json({ success: true, count: classrooms.length, classrooms });
});

emisSyncRouter.post('/classrooms', (req: Request, res: Response) => {
  try {
    const classroom = req.body;
    if (!classroom.classroomCode || !classroom.emisNumber) {
      return res.status(400).json({ success: false, error: 'Classroom code and EMIS number required.' });
    }
    classroom.lastSyncedAt = new Date().toISOString();
    engine.addClassroom(classroom);
    return res.status(201).json({ success: true, message: 'Classroom created/updated.', classroom });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 6. INTER-SCHOOL TRANSFERS ENDPOINTS
 * GET /api/v1/integrations/emis/transfers
 * POST /api/v1/integrations/emis/transfers/initiate
 * POST /api/v1/integrations/emis/transfers/approve
 */
emisSyncRouter.get('/transfers', (req: Request, res: Response) => {
  const transfers = engine.getTransfers();
  return res.json({ success: true, count: transfers.length, transfers });
});

emisSyncRouter.post('/transfers/initiate', async (req: Request, res: Response) => {
  try {
    const { learnerLuritsId, sourceEmisNumber, targetEmisNumber, initiatedByPersalNumber, reason } = req.body;
    const result = await engine.initiateLearnerTransfer({
      learnerLuritsId,
      sourceEmisNumber,
      targetEmisNumber,
      initiatedByPersalNumber,
      reason
    });
    return res.status(result.success ? 201 : 400).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

emisSyncRouter.post('/transfers/approve', async (req: Request, res: Response) => {
  try {
    const { transferId, approverPersal } = req.body;
    const result = await engine.approveLearnerTransfer(transferId, approverPersal || 'PROVINCIAL_EMIS_OFFICER');
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 7. ANNUAL GRADUATIONS ENDPOINTS
 * GET /api/v1/integrations/emis/graduations
 * POST /api/v1/integrations/emis/graduations/process
 */
emisSyncRouter.get('/graduations', (req: Request, res: Response) => {
  const graduations = engine.getGraduations();
  return res.json({ success: true, count: graduations.length, graduations });
});

emisSyncRouter.post('/graduations/process', async (req: Request, res: Response) => {
  try {
    const { emisNumber, academicYear, operatorPersal } = req.body;
    if (!emisNumber) {
      return res.status(400).json({ success: false, error: 'EMIS number is required.' });
    }
    const result = await engine.processAnnualGraduations({
      emisNumber,
      academicYear: Number(academicYear || new Date().getFullYear()),
      operatorPersal: operatorPersal || 'CIRCUIT_MANAGER'
    });
    return res.status(200).json({ success: true, message: 'Annual Grade Graduations Processed.', ...result });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 8. CONFLICT RESOLUTION ENDPOINTS
 * GET /api/v1/integrations/emis/conflicts
 * POST /api/v1/integrations/emis/conflicts/:conflictId/resolve
 */
emisSyncRouter.get('/conflicts', (req: Request, res: Response) => {
  const pending = conflictResolver.getPendingConflicts();
  const all = conflictResolver.getAllConflicts();
  return res.json({ success: true, pendingCount: pending.length, totalCount: all.length, conflicts: all });
});

emisSyncRouter.post('/conflicts/:conflictId/resolve', (req: Request, res: Response) => {
  try {
    const { conflictId } = req.params;
    const { choice, operator, customOverrideData } = req.body;

    const result = conflictResolver.resolveManualConflict(
      conflictId,
      choice || 'EMIS',
      operator || 'EMIS_DATA_ADMIN',
      customOverrideData
    );

    return res.status(result.success ? 200 : 400).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 9. SYNCHRONIZATION AUDIT LOGS
 * GET /api/v1/integrations/emis/audit-logs
 */
emisSyncRouter.get('/audit-logs', (req: Request, res: Response) => {
  const logs = engine.getAuditLogs();
  return res.json({ success: true, count: logs.length, auditLogs: logs });
});
