// ITIS EMIS Synchronization Conflict Resolver
// Manages Field-Level Conflict Detection between Local Database and National EMIS Master,
// Automatic Strategy Execution (EMIS_OVERRIDE, LOCAL_PRESERVE, MERGE_NEWEST), and Manual Resolution Queue

import { AuditLogger } from '../../common/audit.logger';
import {
  ConflictResolutionStrategy,
  EmisConflictRecord,
  EmisEntityType
} from './emis.types';

export class EmisConflictResolver {
  private static instance: EmisConflictResolver;

  private pendingConflicts: Map<string, EmisConflictRecord> = new Map();

  private constructor() {}

  public static getInstance(): EmisConflictResolver {
    if (!EmisConflictResolver.instance) {
      EmisConflictResolver.instance = new EmisConflictResolver();
    }
    return EmisConflictResolver.instance;
  }

  /**
   * Compare Local Entity vs EMIS Inbound Entity for Field Discrepancies
   */
  public detectConflicts(
    entityType: EmisEntityType,
    entityId: string,
    localData: Record<string, any>,
    emisData: Record<string, any>,
    ignoredFields: string[] = ['lastSyncedAt', 'createdAt', 'updatedAt']
  ): { hasConflict: boolean; fieldConflicts: { field: string; localValue: any; emisValue: any }[] } {
    const fieldConflicts: { field: string; localValue: any; emisValue: any }[] = [];

    const keys = new Set([...Object.keys(localData), ...Object.keys(emisData)]);

    for (const key of keys) {
      if (ignoredFields.includes(key)) continue;

      const localVal = localData[key];
      const emisVal = emisData[key];

      if (localVal !== undefined && emisVal !== undefined && localVal !== emisVal) {
        fieldConflicts.push({
          field: key,
          localValue: localVal,
          emisValue: emisVal
        });
      }
    }

    return {
      hasConflict: fieldConflicts.length > 0,
      fieldConflicts
    };
  }

  /**
   * Automatically resolve or queue conflict based on Conflict Strategy
   */
  public resolveOrQueueConflict(
    entityType: EmisEntityType,
    entityId: string,
    localData: Record<string, any>,
    emisData: Record<string, any>,
    fieldConflicts: { field: string; localValue: any; emisValue: any }[],
    strategy: ConflictResolutionStrategy = 'EMIS_OVERRIDE'
  ): { resolvedData: Record<string, any>; strategyApplied: ConflictResolutionStrategy; isQueuedForManual: boolean } {
    const now = new Date().toISOString();

    if (strategy === 'EMIS_OVERRIDE') {
      AuditLogger.log('INFO', `EMIS Conflict Auto-Resolved (${entityType}:${entityId}) via EMIS_OVERRIDE strategy.`);
      return {
        resolvedData: { ...localData, ...emisData, lastSyncedAt: now },
        strategyApplied: 'EMIS_OVERRIDE',
        isQueuedForManual: false
      };
    }

    if (strategy === 'LOCAL_PRESERVE') {
      AuditLogger.log('INFO', `EMIS Conflict Auto-Resolved (${entityType}:${entityId}) via LOCAL_PRESERVE strategy.`);
      return {
        resolvedData: { ...emisData, ...localData, lastSyncedAt: now },
        strategyApplied: 'LOCAL_PRESERVE',
        isQueuedForManual: false
      };
    }

    if (strategy === 'MERGE_NEWEST') {
      const localTime = new Date(localData.lastSyncedAt || localData.updatedAt || 0).getTime();
      const emisTime = new Date(emisData.lastSyncedAt || emisData.updatedAt || 0).getTime();

      const winner = emisTime >= localTime ? emisData : localData;
      AuditLogger.log('INFO', `EMIS Conflict Auto-Resolved (${entityType}:${entityId}) via MERGE_NEWEST strategy.`);
      return {
        resolvedData: { ...localData, ...winner, lastSyncedAt: now },
        strategyApplied: 'MERGE_NEWEST',
        isQueuedForManual: false
      };
    }

    // Manual Review strategy -> Enqueue into Conflict Review Queue
    const conflictId = `EMIS-CONF-${Date.now()}-${Math.floor(Math.random() * 89999 + 10000)}`;
    const conflictRecord: EmisConflictRecord = {
      conflictId,
      entityType,
      entityId,
      localData,
      emisData,
      fieldConflicts,
      resolutionStatus: 'PENDING',
      detectedAt: now
    };

    this.pendingConflicts.set(conflictId, conflictRecord);
    AuditLogger.log('WARN', `EMIS Data Conflict queued for MANUAL_REVIEW (Conflict ID: ${conflictId}).`);

    return {
      resolvedData: localData, // Preserve local until operator resolves
      strategyApplied: 'MANUAL_REVIEW',
      isQueuedForManual: true
    };
  }

  /**
   * Manual Operator Resolution of a Pending Conflict
   */
  public resolveManualConflict(
    conflictId: string,
    choice: 'EMIS' | 'LOCAL' | 'CUSTOM',
    operator: string,
    customOverrideData?: Record<string, any>
  ): { success: boolean; resolvedRecord?: EmisConflictRecord; finalData?: Record<string, any>; message?: string } {
    const conflict = this.pendingConflicts.get(conflictId);
    if (!conflict) {
      return { success: false, message: `Conflict '${conflictId}' not found.` };
    }

    const now = new Date().toISOString();
    let finalData: Record<string, any> = {};

    if (choice === 'EMIS') {
      finalData = { ...conflict.localData, ...conflict.emisData, lastSyncedAt: now };
      conflict.resolutionStatus = 'RESOLVED_EMIS';
    } else if (choice === 'LOCAL') {
      finalData = { ...conflict.emisData, ...conflict.localData, lastSyncedAt: now };
      conflict.resolutionStatus = 'RESOLVED_LOCAL';
    } else {
      finalData = { ...conflict.localData, ...conflict.emisData, ...(customOverrideData || {}), lastSyncedAt: now };
      conflict.resolutionStatus = 'RESOLVED_MANUAL';
    }

    conflict.resolvedAt = now;
    conflict.resolvedBy = operator;

    AuditLogger.recordAudit({
      action: 'EMIS_CONFLICT_MANUAL_RESOLVED',
      resource: `/api/v1/integrations/emis/conflicts/${conflictId}`,
      correlationId: conflictId,
      metadata: { choice, operator, entityType: conflict.entityType, entityId: conflict.entityId }
    });

    return {
      success: true,
      resolvedRecord: conflict,
      finalData
    };
  }

  public getPendingConflicts(): EmisConflictRecord[] {
    return Array.from(this.pendingConflicts.values()).filter((c) => c.resolutionStatus === 'PENDING');
  }

  public getAllConflicts(): EmisConflictRecord[] {
    return Array.from(this.pendingConflicts.values());
  }
}
