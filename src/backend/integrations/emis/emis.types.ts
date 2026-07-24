// ITIS Educational Management Information System (EMIS / LURITS) Synchronization Types
// Supports Schools, Learners (LURITS), Teachers (SACE/PERSAL), Classrooms,
// Inter-School Transfers, Annual Graduations, Audit Logs & Conflict Resolution Strategies

export type EmisEntityType =
  | 'SCHOOL'
  | 'LEARNER'
  | 'TEACHER'
  | 'CLASSROOM'
  | 'TRANSFER'
  | 'GRADUATION';

export type ConflictResolutionStrategy =
  | 'EMIS_OVERRIDE'   // EMIS master record overwrites local record
  | 'LOCAL_PRESERVE'  // Local record preserved, EMIS ignored
  | 'MERGE_NEWEST'    // Most recently updated timestamp wins
  | 'MANUAL_REVIEW';  // Flagged into manual conflict review queue

export interface EmisSchoolRecord {
  emisNumber: string;
  schoolName: string;
  province: string;
  district: string;
  circuit: string;
  quintile: number;
  principalName: string;
  principalEmail: string;
  contactPhone: string;
  registeredCapacity: number;
  currentEnrollment: number;
  status: 'ACTIVE' | 'PROVISIONAL' | 'DEREGISTERED';
  lastSyncedAt: string;
}

export interface EmisLearnerRecord {
  luritsId: string; // National Educational LURITS ID
  nationalIdNumber: string;
  emisNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  grade: number; // Grade 1 to 12
  classroomCode: string;
  parentContactPhone: string;
  parentEmail?: string;
  transportSubsidized: boolean;
  status: 'ENROLLED' | 'TRANSFERRED_OUT' | 'GRADUATED' | 'SUSPENDED' | 'DROPPED_OUT';
  lastSyncedAt: string;
}

export interface EmisTeacherRecord {
  persalNumber: string; // SITA / Government PERSAL Employee ID
  saceRegistrationNumber: string; // South African Council for Educators
  fullName: string;
  email: string;
  contactPhone: string;
  emisNumber: string;
  subjects: string[];
  assignedClassrooms: string[];
  status: 'ACTIVE' | 'SECONDED' | 'RESIGNED' | 'RETIRED';
  lastSyncedAt: string;
}

export interface EmisClassroomRecord {
  classroomCode: string; // e.g. G10A-TSAKO
  emisNumber: string;
  grade: number;
  roomNumber: string;
  capacity: number;
  enrolledCount: number;
  classTeacherPersalNumber: string;
  lastSyncedAt: string;
}

export interface EmisTransferRecord {
  transferId: string;
  learnerLuritsId: string;
  sourceEmisNumber: string;
  targetEmisNumber: string;
  initiatedByPersalNumber: string;
  transferDate: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  reason: string;
  approvalReference?: string;
  completedAt?: string;
}

export interface EmisGraduationRecord {
  graduationId: string;
  academicYear: number;
  emisNumber: string;
  learnerLuritsId: string;
  previousGrade: number;
  newGrade: number; // 13 indicates Matric Exit Graduation
  status: 'PROMOTED' | 'RETAINED' | 'GRADUATED_MATRIC';
  promotionRemarks?: string;
  graduatedAt: string;
}

export interface EmisSyncAuditLog {
  syncId: string;
  entityType: EmisEntityType;
  entityId: string;
  action: 'INGEST' | 'UPDATE' | 'TRANSFER_PROCESSED' | 'GRADUATION_PROCESSED' | 'CONFLICT_DETECTED' | 'CONFLICT_RESOLVED';
  conflictStrategyApplied?: ConflictResolutionStrategy;
  timestamp: string;
  operatorPersalOrEmail: string;
  details: string;
  fieldChanges?: { field: string; oldValue: any; newValue: any }[];
}

export interface EmisConflictRecord {
  conflictId: string;
  entityType: EmisEntityType;
  entityId: string;
  localData: Record<string, any>;
  emisData: Record<string, any>;
  fieldConflicts: { field: string; localValue: any; emisValue: any }[];
  resolutionStatus: 'PENDING' | 'RESOLVED_EMIS' | 'RESOLVED_LOCAL' | 'RESOLVED_MANUAL';
  detectedAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  notes?: string;
}

export interface EmisSyncOptions {
  entities?: EmisEntityType[];
  emisNumberFilter?: string;
  conflictStrategy?: ConflictResolutionStrategy;
  academicYear?: number;
}
