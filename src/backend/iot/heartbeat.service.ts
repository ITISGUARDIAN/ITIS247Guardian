// ITIS Enterprise Wearable Device Heartbeat Monitoring & Lifecycle Scheduler (Prompt 070)
// Manages device heartbeat schedules, online/offline state detection, weak signal monitoring,
// low battery alerts, tamper detection, OTA firmware requirements, and platform event generation.

import { AuditLogger } from '../common/audit.logger';
import { getPrismaClient } from '../database/prisma';
import { iotPlatformState } from './iot.controller';
import { liveState } from '../api.routes';

export interface HeartbeatEvaluationResult {
  deviceId: string;
  imei: string;
  previousState: string;
  currentState: string;
  lastSeenSecondsAgo: number;
  lastSeenFormatted: string;
  signalQuality: string;
  batteryPercent: number;
  isLowBattery: boolean;
  isWeakSignal: boolean;
  isTamperAlert: boolean;
  isFirmwareUpgradeRequired: boolean;
  eventsGenerated: string[];
}

export interface PlatformEvent {
  id: string;
  eventId: string;
  deviceId: string;
  imei: string;
  eventType: 'HEARTBEAT_ONLINE' | 'DEVICE_OFFLINE' | 'WEAK_SIGNAL' | 'LOW_BATTERY' | 'TAMPER_ALERT' | 'FIRMWARE_UPGRADE_REQUIRED' | 'HEALTH_CHECK';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  description: string;
  metadata: Record<string, any>;
  timestamp: string;
}

export class HeartbeatService {
  private prisma = getPrismaClient();
  private schedulerTimer: NodeJS.Timeout | null = null;
  private isRunning = false;
  private checkIntervalMs = 15000; // Check every 15 seconds
  private offlineThresholdSeconds = 180; // 3 minutes without heartbeat = OFFLINE
  private weakSignalDbmThreshold = -105; // -105 dBm or lower = WEAK_SIGNAL
  private lowBatteryThresholdPct = 15; // 15% or lower = LOW_BATTERY
  private latestTargetFirmware = 'v2.4.1-STABLE';

  private platformEvents: PlatformEvent[] = [];

  constructor() {
    // Auto-start scheduler in non-test runtime environments
    if (process.env.NODE_ENV !== 'test') {
      this.startScheduler();
    }
  }

  // 1. Heartbeat Scheduler Management
  public startScheduler(intervalMs?: number): void {
    if (intervalMs) {
      this.checkIntervalMs = intervalMs;
    }

    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
    }

    this.isRunning = true;
    this.schedulerTimer = setInterval(async () => {
      try {
        await this.runHeartbeatHealthCheck();
      } catch (err: any) {
        console.error('[HeartbeatService] Error during scheduled health check:', err.message);
      }
    }, this.checkIntervalMs);

    AuditLogger.recordAudit({
      action: 'HEARTBEAT_SCHEDULER_STARTED',
      resource: '/iot/heartbeat/scheduler',
      correlationId: `HB-SCHED-${Date.now()}`,
      metadata: { checkIntervalMs: this.checkIntervalMs, offlineThresholdSeconds: this.offlineThresholdSeconds }
    });
  }

  public stopScheduler(): void {
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.isRunning = false;

    AuditLogger.recordAudit({
      action: 'HEARTBEAT_SCHEDULER_STOPPED',
      resource: '/iot/heartbeat/scheduler',
      correlationId: `HB-SCHED-STOP-${Date.now()}`,
      metadata: { stoppedAt: new Date().toISOString() }
    });
  }

  public getSchedulerStatus() {
    return {
      isRunning: this.isRunning,
      checkIntervalMs: this.checkIntervalMs,
      offlineThresholdSeconds: this.offlineThresholdSeconds,
      totalTrackedDevices: iotPlatformState.devices.length,
      platformEventsCount: this.platformEvents.length
    };
  }

  // 2. Main Health Check Execution
  public async runHeartbeatHealthCheck(): Promise<HeartbeatEvaluationResult[]> {
    const results: HeartbeatEvaluationResult[] = [];

    for (const device of iotPlatformState.devices) {
      const evalResult = await this.evaluateDeviceHeartbeat(device);
      results.push(evalResult);
    }

    return results;
  }

  // 3. Single Device Heartbeat & Health Evaluator
  public async evaluateDeviceHeartbeat(device: any): Promise<HeartbeatEvaluationResult> {
    const now = new Date();
    const lastHeartbeatDate = device.deviceHealth?.lastHeartbeatAt
      ? new Date(device.deviceHealth.lastHeartbeatAt)
      : new Date(now.getTime() - 3600000); // 1 hour ago if missing

    const diffMs = now.getTime() - lastHeartbeatDate.getTime();
    const lastSeenSecondsAgo = Math.max(0, Math.floor(diffMs / 1000));
    const lastSeenFormatted = this.formatLastSeen(lastSeenSecondsAgo);

    const previousState = device.deviceHealth?.heartbeatState || 'UNKNOWN';
    let newState = previousState;
    const eventsGenerated: string[] = [];

    const batteryPct = device.deviceHealth?.batteryPercent ?? 100;
    const lteSignalDbm = device.deviceHealth?.lteSignalDbm ?? -70;

    // Condition Flags
    const isOffline = lastSeenSecondsAgo > this.offlineThresholdSeconds;
    const isWeakSignal = !isOffline && lteSignalDbm <= this.weakSignalDbmThreshold;
    const isLowBattery = batteryPct <= this.lowBatteryThresholdPct;
    const isTamperAlert = device.status === 'TAMPERED' || device.deviceHealth?.heartbeatState === 'TAMPER_ALERT';
    const isFirmwareUpgradeRequired = this.isFirmwareOutdated(device.firmwareVersion);

    // State Determination Hierarchy
    if (isTamperAlert) {
      newState = 'TAMPER_ALERT';
    } else if (isOffline) {
      newState = 'OFFLINE';
    } else if (isLowBattery) {
      newState = 'LOW_BATTERY';
    } else if (isWeakSignal) {
      newState = 'WEAK_SIGNAL';
    } else if (isFirmwareUpgradeRequired) {
      newState = 'FIRMWARE_UPGRADE_REQUIRED';
    } else {
      newState = 'ONLINE';
    }

    // Update Device Health State
    device.deviceHealth.heartbeatState = newState;

    // Detect State Changes & Trigger Platform Events
    if (previousState !== newState) {
      await this.handleStateTransition(device, previousState, newState, {
        lastSeenSecondsAgo,
        batteryPct,
        lteSignalDbm,
        isOffline,
        isWeakSignal,
        isLowBattery,
        isTamperAlert,
        isFirmwareUpgradeRequired
      }, eventsGenerated);
    }

    // Secondary Event Triggers (Battery & Tamper alerts even if state didn't flip)
    if (isLowBattery && previousState !== 'LOW_BATTERY' && !eventsGenerated.includes('LOW_BATTERY')) {
      await this.generatePlatformEvent({
        eventType: 'LOW_BATTERY',
        severity: 'WARNING',
        deviceId: device.deviceId,
        imei: device.imei,
        description: `Wearable device ${device.deviceId} battery dropped to critical ${batteryPct}%.`,
        metadata: { batteryPercent: batteryPct, learner: device.assignedLearner }
      });
      eventsGenerated.push('LOW_BATTERY');
    }

    if (isTamperAlert && previousState !== 'TAMPER_ALERT' && !eventsGenerated.includes('TAMPER_ALERT')) {
      await this.generatePlatformEvent({
        eventType: 'TAMPER_ALERT',
        severity: 'CRITICAL',
        deviceId: device.deviceId,
        imei: device.imei,
        description: `CRITICAL: Hardware tamper switch breach detected on device ${device.deviceId}.`,
        metadata: { learner: device.assignedLearner, status: device.status }
      });
      eventsGenerated.push('TAMPER_ALERT');
    }

    return {
      deviceId: device.deviceId,
      imei: device.imei,
      previousState,
      currentState: newState,
      lastSeenSecondsAgo,
      lastSeenFormatted,
      signalQuality: device.deviceHealth?.signalQuality || (lteSignalDbm > -85 ? 'EXCELLENT' : lteSignalDbm > -100 ? 'MODERATE' : 'POOR'),
      batteryPercent: batteryPct,
      isLowBattery,
      isWeakSignal,
      isTamperAlert,
      isFirmwareUpgradeRequired,
      eventsGenerated
    };
  }

  // 4. State Transition Handler
  private async handleStateTransition(
    device: any,
    fromState: string,
    toState: string,
    metrics: any,
    eventsTracker: string[]
  ): Promise<void> {
    const correlationId = `HB-TRANS-${device.deviceId}-${Date.now()}`;

    let eventType: PlatformEvent['eventType'] = 'HEALTH_CHECK';
    let severity: PlatformEvent['severity'] = 'INFO';
    let description = `Device ${device.deviceId} state changed from ${fromState} to ${toState}.`;

    switch (toState) {
      case 'OFFLINE':
        eventType = 'DEVICE_OFFLINE';
        severity = 'WARNING';
        description = `Device ${device.deviceId} is now OFFLINE. No heartbeat received for ${metrics.lastSeenSecondsAgo} seconds.`;
        break;
      case 'WEAK_SIGNAL':
        eventType = 'WEAK_SIGNAL';
        severity = 'WARNING';
        description = `Device ${device.deviceId} reported weak cellular signal: ${metrics.lteSignalDbm} dBm.`;
        break;
      case 'LOW_BATTERY':
        eventType = 'LOW_BATTERY';
        severity = 'WARNING';
        description = `Device ${device.deviceId} battery level low: ${metrics.batteryPct}%.`;
        break;
      case 'TAMPER_ALERT':
        eventType = 'TAMPER_ALERT';
        severity = 'CRITICAL';
        description = `CRITICAL TAMPER BREACH: Physical tamper event triggered on device ${device.deviceId}.`;
        break;
      case 'FIRMWARE_UPGRADE_REQUIRED':
        eventType = 'FIRMWARE_UPGRADE_REQUIRED';
        severity = 'INFO';
        description = `Device ${device.deviceId} requires mandatory OTA firmware update (Current: ${device.firmwareVersion}, Target: ${this.latestTargetFirmware}).`;
        break;
      case 'ONLINE':
        eventType = 'HEARTBEAT_ONLINE';
        severity = 'INFO';
        description = `Device ${device.deviceId} re-established telemetry connection and is now ONLINE.`;
        break;
      default:
        break;
    }

    await this.generatePlatformEvent({
      eventType,
      severity,
      deviceId: device.deviceId,
      imei: device.imei,
      description,
      metadata: { fromState, toState, metrics, learner: device.assignedLearner }
    });

    eventsTracker.push(eventType);

    // Audit Logger Recording
    await AuditLogger.recordAudit({
      action: `IOT_HEARTBEAT_STATE_${toState}`,
      resource: `/api/v1/iot/heartbeat/${device.deviceId}`,
      correlationId,
      metadata: { deviceId: device.deviceId, imei: device.imei, fromState, toState, metrics }
    });
  }

  // 5. Generate & Broadcast Platform Events
  public async generatePlatformEvent(params: {
    eventType: PlatformEvent['eventType'];
    severity: PlatformEvent['severity'];
    deviceId: string;
    imei: string;
    description: string;
    metadata?: Record<string, any>;
  }): Promise<PlatformEvent> {
    const eventId = `EVT-HB-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const event: PlatformEvent = {
      id: eventId,
      eventId,
      deviceId: params.deviceId,
      imei: params.imei,
      eventType: params.eventType,
      severity: params.severity,
      description: params.description,
      metadata: params.metadata || {},
      timestamp: new Date().toISOString()
    };

    this.platformEvents.unshift(event);
    if (this.platformEvents.length > 1000) {
      this.platformEvents.pop(); // Keep buffer bounded
    }

    // Add to device technician history if available
    const device = iotPlatformState.devices.find((d) => d.deviceId === params.deviceId || d.imei === params.imei);
    if (device) {
      device.technicianHistory.push({
        action: `SYSTEM_EVENT_${params.eventType}`,
        technician: 'Automated Heartbeat Monitor',
        timestamp: event.timestamp,
        notes: params.description
      });
    }

    // If TAMPER_ALERT or CRITICAL, push incident to liveState for emergency operators
    if (params.eventType === 'TAMPER_ALERT' || params.severity === 'CRITICAL') {
      liveState.incidents.unshift({
        id: `INC-TAMPER-${Date.now().toString().slice(-4)}`,
        incidentNumber: `TMP-${Date.now().toString().slice(-6)}`,
        learnerId: device?.assignedLearner?.learnerId || 'UNKNOWN_LEARNER',
        learnerName: device?.assignedLearner?.name || 'Unassigned Learner',
        schoolId: 'sch-1001',
        schoolName: device?.assignedLearner?.school || 'Unknown School',
        latitude: -26.2581,
        longitude: 27.8573,
        severity: 'CRITICAL',
        status: 'OPEN',
        dispatchedUnit: 'SAPS Rapid Response & Hardware Tamper Incident Team',
        responderEtaMinutes: 5,
        createdAt: event.timestamp
      });
    }

    return event;
  }

  // 6. Last Seen Calculations & Formatting
  public calculateLastSeen(lastHeartbeatIso?: string): { secondsAgo: number; formatted: string; isOnline: boolean } {
    if (!lastHeartbeatIso) {
      return { secondsAgo: 999999, formatted: 'Never seen', isOnline: false };
    }

    const now = Date.now();
    const heartbeatTime = new Date(lastHeartbeatIso).getTime();
    const secondsAgo = Math.max(0, Math.floor((now - heartbeatTime) / 1000));
    const isOnline = secondsAgo <= this.offlineThresholdSeconds;

    return {
      secondsAgo,
      formatted: this.formatLastSeen(secondsAgo),
      isOnline
    };
  }

  public formatLastSeen(secondsAgo: number): string {
    if (secondsAgo < 10) return 'Just now';
    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
    return `${Math.floor(secondsAgo / 86400)}d ago`;
  }

  // 7. Firmware Version Check Helper
  private isFirmwareOutdated(currentVersion?: string): boolean {
    if (!currentVersion) return true;
    if (currentVersion.includes('LEGACY')) return true;
    if (currentVersion < this.latestTargetFirmware && !currentVersion.includes('STABLE')) return true;
    return false;
  }

  // 8. Public Telemetry Heartbeat Update Endpoint
  public async receiveHeartbeat(imeiOrDeviceId: string, payload?: { batteryPercent?: number; lteSignalDbm?: number; firmwareVersion?: string }) {
    const device = iotPlatformState.devices.find((d) => d.imei === imeiOrDeviceId || d.deviceId === imeiOrDeviceId);
    if (!device) {
      throw new Error(`Device '${imeiOrDeviceId}' not found in IoT Platform state.`);
    }

    const nowIso = new Date().toISOString();
    device.deviceHealth.lastHeartbeatAt = nowIso;
    device.deviceHealth.heartbeatState = 'ONLINE';

    if (payload?.batteryPercent !== undefined) {
      device.deviceHealth.batteryPercent = payload.batteryPercent;
    }
    if (payload?.lteSignalDbm !== undefined) {
      device.deviceHealth.lteSignalDbm = payload.lteSignalDbm;
    }
    if (payload?.firmwareVersion) {
      device.firmwareVersion = payload.firmwareVersion;
    }

    // Re-evaluate health immediately
    const evalResult = await this.evaluateDeviceHeartbeat(device);

    return {
      success: true,
      deviceId: device.deviceId,
      receivedAt: nowIso,
      evaluation: evalResult
    };
  }

  // 9. Getters
  public getPlatformEvents(limit = 100): PlatformEvent[] {
    return this.platformEvents.slice(0, limit);
  }

  public setTargetFirmware(version: string): void {
    this.latestTargetFirmware = version;
  }
}

export const heartbeatService = new HeartbeatService();
