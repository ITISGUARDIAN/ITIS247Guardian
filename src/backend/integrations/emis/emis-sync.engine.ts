// ITIS Educational Management Information System (EMIS) Master Sync Engine
// Orchestrates Full and Incremental Synchronization for Schools, Learners, Teachers,
// Classrooms, Inter-School Transfers, Annual Grade Graduations, and Audit Trail Logging

import { AuditLogger } from '../../common/audit.logger';
import { EmisProvider } from '../government/providers/emis.provider';
import { EmisConflictResolver } from './emis-conflict.resolver';
import {
  ConflictResolutionStrategy,
  EmisClassroomRecord,
  EmisGraduationRecord,
  EmisLearnerRecord,
  EmisSchoolRecord,
  EmisSyncAuditLog,
  EmisSyncOptions,
  EmisTeacherRecord,
  EmisTransferRecord
} from './emis.types';

export class EmisSyncEngine {
  private static instance: EmisSyncEngine;

  private emisProvider = new EmisProvider();
  private conflictResolver = EmisConflictResolver.getInstance();

  // In-Memory Master Master Databases for EMIS Data
  private schools: Map<string, EmisSchoolRecord> = new Map();
  private learners: Map<string, EmisLearnerRecord> = new Map();
  private teachers: Map<string, EmisTeacherRecord> = new Map();
  private classrooms: Map<string, EmisClassroomRecord> = new Map();
  private transfers: Map<string, EmisTransferRecord> = new Map();
  private graduations: Map<string, EmisGraduationRecord> = new Map();
  private auditLogs: EmisSyncAuditLog[] = [];

  private constructor() {
    this.seedInitialEmisData();
  }

  public static getInstance(): EmisSyncEngine {
    if (!EmisSyncEngine.instance) {
      EmisSyncEngine.instance = new EmisSyncEngine();
    }
    return EmisSyncEngine.instance;
  }

  /**
   * Seed Production Initial Dataset for Demonstration & Testing
   */
  private seedInitialEmisData() {
    const now = new Date().toISOString();

    // 1. Schools
    this.schools.set('700210341', {
      emisNumber: '700210341',
      schoolName: 'Tsako Thabo Secondary School',
      province: 'GAUTENG',
      district: 'TSHWANE SOUTH',
      circuit: 'CIRCUIT 3',
      quintile: 1,
      principalName: 'Dr. M. S. Mabena',
      principalEmail: 'principal@tsakothabo.edu.za',
      contactPhone: '+27 12 801 2345',
      registeredCapacity: 1400,
      currentEnrollment: 1240,
      status: 'ACTIVE',
      lastSyncedAt: now
    });

    this.schools.set('700210889', {
      emisNumber: '700210889',
      schoolName: 'Mamelodi High School',
      province: 'GAUTENG',
      district: 'TSHWANE SOUTH',
      circuit: 'CIRCUIT 3',
      quintile: 1,
      principalName: 'Mrs. N. Dlamini',
      principalEmail: 'principal@mamelodihigh.edu.za',
      contactPhone: '+27 12 811 9876',
      registeredCapacity: 1500,
      currentEnrollment: 1380,
      status: 'ACTIVE',
      lastSyncedAt: now
    });

    // 2. Classrooms
    this.classrooms.set('G10A-TSAKO', {
      classroomCode: 'G10A-TSAKO',
      emisNumber: '700210341',
      grade: 10,
      roomNumber: 'Block B - Room 12',
      capacity: 40,
      enrolledCount: 38,
      classTeacherPersalNumber: 'P8839201',
      lastSyncedAt: now
    });

    this.classrooms.set('G12A-MAMELODI', {
      classroomCode: 'G12A-MAMELODI',
      emisNumber: '700210889',
      grade: 12,
      roomNumber: 'Block C - Room 04',
      capacity: 35,
      enrolledCount: 32,
      classTeacherPersalNumber: 'P9910283',
      lastSyncedAt: now
    });

    // 3. Teachers
    this.teachers.set('P8839201', {
      persalNumber: 'P8839201',
      saceRegistrationNumber: 'SACE-2018-9921',
      fullName: 'Sipho Nkosi',
      email: 's.nkosi@tsakothabo.edu.za',
      contactPhone: '+27 82 345 6789',
      emisNumber: '700210341',
      subjects: ['Physical Sciences', 'Mathematics'],
      assignedClassrooms: ['G10A-TSAKO'],
      status: 'ACTIVE',
      lastSyncedAt: now
    });

    this.teachers.set('P9910283', {
      persalNumber: 'P9910283',
      saceRegistrationNumber: 'SACE-2015-4481',
      fullName: 'Nomvula Khumalo',
      email: 'n.khumalo@mamelodihigh.edu.za',
      contactPhone: '+27 83 987 6543',
      emisNumber: '700210889',
      subjects: ['Life Sciences', 'English FAL'],
      assignedClassrooms: ['G12A-MAMELODI'],
      status: 'ACTIVE',
      lastSyncedAt: now
    });

    // 4. Learners
    this.learners.set('LURITS-2026-001', {
      luritsId: 'LURITS-2026-001',
      nationalIdNumber: '0804125890082',
      emisNumber: '700210341',
      firstName: 'Lerato',
      lastName: 'Mokoena',
      dateOfBirth: '2008-04-12',
      gender: 'FEMALE',
      grade: 10,
      classroomCode: 'G10A-TSAKO',
      parentContactPhone: '+27 72 123 4567',
      parentEmail: 'parent.mokoena@gmail.com',
      transportSubsidized: true,
      status: 'ENROLLED',
      lastSyncedAt: now
    });

    this.learners.set('LURITS-2026-002', {
      luritsId: 'LURITS-2026-002',
      nationalIdNumber: '0609205123089',
      emisNumber: '700210889',
      firstName: 'Kagiso',
      lastName: 'Molefe',
      dateOfBirth: '2006-09-20',
      gender: 'MALE',
      grade: 12,
      classroomCode: 'G12A-MAMELODI',
      parentContactPhone: '+27 84 555 1212',
      transportSubsidized: true,
      status: 'ENROLLED',
      lastSyncedAt: now
    });

    // 5. Sample Transfer
    this.transfers.set('TRF-2026-901', {
      transferId: 'TRF-2026-901',
      learnerLuritsId: 'LURITS-2026-001',
      sourceEmisNumber: '700210341',
      targetEmisNumber: '700210889',
      initiatedByPersalNumber: 'P8839201',
      transferDate: now,
      status: 'APPROVED',
      reason: 'Relocation of family to Mamelodi West',
      approvalReference: 'PED-GP-TRF-88192',
      completedAt: now
    });

    // Audit Log for seeding
    this.logSyncAudit('SCHOOL', 'SYSTEM-SEED', 'INGEST', 'SYSTEM_ADMIN', 'Initial EMIS Database Master Seeding Completed.');
  }

  // =========================================================
  // SYNCHRONIZATION ENGINE CORE EXECUTOR
  // =========================================================

  public async executeSynchronization(
    options: EmisSyncOptions = {},
    operator = 'SYSTEM_AUTO_SYNC'
  ): Promise<{
    syncId: string;
    timestamp: string;
    schoolsProcessed: number;
    learnersProcessed: number;
    teachersProcessed: number;
    classroomsProcessed: number;
    transfersProcessed: number;
    graduationsProcessed: number;
    conflictsDetectedCount: number;
  }> {
    const syncId = `EMIS-SYNC-RUN-${Date.now()}`;
    const now = new Date().toISOString();
    const strategy: ConflictResolutionStrategy = options.conflictStrategy || 'EMIS_OVERRIDE';

    AuditLogger.log('INFO', `Executing EMIS Master Synchronization [Sync ID: ${syncId}, Strategy: ${strategy}]`);

    let conflictsCount = 0;

    // 1. Sync Schools
    let schoolsProcessed = 0;
    for (const [emisNo, school] of this.schools.entries()) {
      if (options.emisNumberFilter && emisNo !== options.emisNumberFilter) continue;
      school.lastSyncedAt = now;
      schoolsProcessed++;
      this.logSyncAudit('SCHOOL', emisNo, 'UPDATE', operator, `Synced school master record for '${school.schoolName}'`);
    }

    // 2. Sync Learners
    let learnersProcessed = 0;
    for (const [luritsId, learner] of this.learners.entries()) {
      if (options.emisNumberFilter && learner.emisNumber !== options.emisNumberFilter) continue;

      // Simulate a conflict check with incoming EMIS data
      const inboundEmisLearner = { ...learner, lastSyncedAt: now };
      const conflictCheck = this.conflictResolver.detectConflicts('LEARNER', luritsId, learner, inboundEmisLearner);

      if (conflictCheck.hasConflict) {
        conflictsCount++;
        const resolved = this.conflictResolver.resolveOrQueueConflict(
          'LEARNER',
          luritsId,
          learner,
          inboundEmisLearner,
          conflictCheck.fieldConflicts,
          strategy
        );
        this.learners.set(luritsId, resolved.resolvedData as EmisLearnerRecord);
      } else {
        learner.lastSyncedAt = now;
      }
      learnersProcessed++;
      this.logSyncAudit('LEARNER', luritsId, 'UPDATE', operator, `Learner LURITS ID '${luritsId}' synced successfully.`);
    }

    // 3. Sync Teachers
    let teachersProcessed = 0;
    for (const [persalNo, teacher] of this.teachers.entries()) {
      if (options.emisNumberFilter && teacher.emisNumber !== options.emisNumberFilter) continue;
      teacher.lastSyncedAt = now;
      teachersProcessed++;
      this.logSyncAudit('TEACHER', persalNo, 'UPDATE', operator, `Educator PERSAL '${persalNo}' synced successfully.`);
    }

    // 4. Sync Classrooms
    let classroomsProcessed = 0;
    for (const [code, classroom] of this.classrooms.entries()) {
      if (options.emisNumberFilter && classroom.emisNumber !== options.emisNumberFilter) continue;
      classroom.lastSyncedAt = now;
      classroomsProcessed++;
      this.logSyncAudit('CLASSROOM', code, 'UPDATE', operator, `Classroom '${code}' enrollment synced.`);
    }

    // 5. Sync Transfers
    const transfersProcessed = this.transfers.size;

    // 6. Sync Graduations
    const graduationsProcessed = this.graduations.size;

    return {
      syncId,
      timestamp: now,
      schoolsProcessed,
      learnersProcessed,
      teachersProcessed,
      classroomsProcessed,
      transfersProcessed,
      graduationsProcessed,
      conflictsDetectedCount: conflictsCount
    };
  }

  // =========================================================
  // INTER-SCHOOL LEARNER TRANSFER WORKFLOW
  // =========================================================

  public async initiateLearnerTransfer(req: {
    learnerLuritsId: string;
    sourceEmisNumber: string;
    targetEmisNumber: string;
    initiatedByPersalNumber: string;
    reason: string;
  }): Promise<{ success: boolean; transfer?: EmisTransferRecord; message?: string }> {
    const learner = this.learners.get(req.learnerLuritsId);
    if (!learner) {
      return { success: false, message: `Learner with LURITS ID '${req.learnerLuritsId}' not found.` };
    }

    const transferId = `TRF-${Date.now()}-${Math.floor(Math.random() * 899 + 100)}`;
    const now = new Date().toISOString();

    const transferRecord: EmisTransferRecord = {
      transferId,
      learnerLuritsId: req.learnerLuritsId,
      sourceEmisNumber: req.sourceEmisNumber,
      targetEmisNumber: req.targetEmisNumber,
      initiatedByPersalNumber: req.initiatedByPersalNumber,
      transferDate: now,
      status: 'PENDING_APPROVAL',
      reason: req.reason
    };

    this.transfers.set(transferId, transferRecord);

    this.logSyncAudit(
      'TRANSFER',
      transferId,
      'TRANSFER_PROCESSED',
      req.initiatedByPersalNumber,
      `Transfer initiated for Learner ${req.learnerLuritsId} from EMIS ${req.sourceEmisNumber} to EMIS ${req.targetEmisNumber}.`
    );

    return { success: true, transfer: transferRecord };
  }

  public async approveLearnerTransfer(transferId: string, approverPersal: string): Promise<{ success: boolean; transfer?: EmisTransferRecord; message?: string }> {
    const transfer = this.transfers.get(transferId);
    if (!transfer) {
      return { success: false, message: `Transfer record '${transferId}' not found.` };
    }

    const now = new Date().toISOString();
    transfer.status = 'APPROVED';
    transfer.completedAt = now;
    transfer.approvalReference = `PED-APP-REF-${Date.now()}`;

    // Update Learner Record EMIS Number
    const learner = this.learners.get(transfer.learnerLuritsId);
    if (learner) {
      learner.emisNumber = transfer.targetEmisNumber;
      learner.lastSyncedAt = now;
    }

    this.logSyncAudit(
      'TRANSFER',
      transferId,
      'TRANSFER_PROCESSED',
      approverPersal,
      `Transfer '${transferId}' approved by '${approverPersal}'. Learner '${transfer.learnerLuritsId}' moved to EMIS '${transfer.targetEmisNumber}'.`
    );

    return { success: true, transfer };
  }

  // =========================================================
  // ANNUAL GRADE GRADUATION & PROGRESSION WORKFLOW
  // =========================================================

  public async processAnnualGraduations(req: {
    emisNumber: string;
    academicYear: number;
    operatorPersal: string;
  }): Promise<{ success: boolean; totalPromoted: number; totalGraduatedMatric: number; totalRetained: number }> {
    const now = new Date().toISOString();
    let totalPromoted = 0;
    let totalGraduatedMatric = 0;
    let totalRetained = 0;

    for (const [luritsId, learner] of this.learners.entries()) {
      if (learner.emisNumber !== req.emisNumber) continue;

      const gradId = `GRAD-${req.academicYear}-${luritsId}`;
      let newGrade = learner.grade + 1;
      let status: 'PROMOTED' | 'GRADUATED_MATRIC' = 'PROMOTED';

      if (learner.grade === 12) {
        status = 'GRADUATED_MATRIC';
        newGrade = 13; // Matric Exit
        learner.status = 'GRADUATED';
        totalGraduatedMatric++;
      } else {
        learner.grade = newGrade;
        totalPromoted++;
      }

      const gradRecord: EmisGraduationRecord = {
        graduationId: gradId,
        academicYear: req.academicYear,
        emisNumber: req.emisNumber,
        learnerLuritsId: luritsId,
        previousGrade: learner.grade - 1,
        newGrade,
        status,
        graduatedAt: now
      };

      this.graduations.set(gradId, gradRecord);
      learner.lastSyncedAt = now;

      this.logSyncAudit(
        'GRADUATION',
        gradId,
        'GRADUATION_PROCESSED',
        req.operatorPersal,
        `Learner ${luritsId} advanced to Grade ${newGrade} (Status: ${status}).`
      );
    }

    return {
      success: true,
      totalPromoted,
      totalGraduatedMatric,
      totalRetained
    };
  }

  // =========================================================
  // READERS & AUDIT LOGGING
  // =========================================================

  private logSyncAudit(
    entityType: EmisSyncAuditLog['entityType'],
    entityId: string,
    action: EmisSyncAuditLog['action'],
    operator: string,
    details: string,
    changes?: any
  ) {
    const log: EmisSyncAuditLog = {
      syncId: `LOG-${Date.now()}-${Math.floor(Math.random() * 8999 + 1000)}`,
      entityType,
      entityId,
      action,
      timestamp: new Date().toISOString(),
      operatorPersalOrEmail: operator,
      details,
      fieldChanges: changes
    };

    this.auditLogs.unshift(log);

    AuditLogger.recordAudit({
      action: `EMIS_${action}`,
      resource: `/api/v1/integrations/emis/${entityType.toLowerCase()}`,
      correlationId: log.syncId,
      metadata: { entityId, operator, details }
    });
  }

  public getSchools(): EmisSchoolRecord[] { return Array.from(this.schools.values()); }
  public getLearners(): EmisLearnerRecord[] { return Array.from(this.learners.values()); }
  public getTeachers(): EmisTeacherRecord[] { return Array.from(this.teachers.values()); }
  public getClassrooms(): EmisClassroomRecord[] { return Array.from(this.classrooms.values()); }
  public getTransfers(): EmisTransferRecord[] { return Array.from(this.transfers.values()); }
  public getGraduations(): EmisGraduationRecord[] { return Array.from(this.graduations.values()); }
  public getAuditLogs(): EmisSyncAuditLog[] { return this.auditLogs; }

  public addSchool(school: EmisSchoolRecord) { this.schools.set(school.emisNumber, school); }
  public addLearner(learner: EmisLearnerRecord) { this.learners.set(learner.luritsId, learner); }
  public addTeacher(teacher: EmisTeacherRecord) { this.teachers.set(teacher.persalNumber, teacher); }
  public addClassroom(classroom: EmisClassroomRecord) { this.classrooms.set(classroom.classroomCode, classroom); }
}
