// ITIS Push Device Registry & Notification History Store
// Manages Device Token Registrations, Platform Mapping, Topic Subscriptions,
// Regional Geofence Targeting, Badge Counters, and Push History Audit Log

import { AuditLogger } from '../../common/audit.logger';
import { PushDeviceRegistration, PushHistoryRecord, PushPlatform, PushTargetType } from './push.types';

export class PushDeviceRegistry {
  private static instance: PushDeviceRegistry;

  private devices: Map<string, PushDeviceRegistration> = new Map(); // Key: deviceId or token
  private history: Map<string, PushHistoryRecord> = new Map();

  private constructor() {
    this.seedDefaultDevices();
  }

  public static getInstance(): PushDeviceRegistry {
    if (!PushDeviceRegistry.instance) {
      PushDeviceRegistry.instance = new PushDeviceRegistry();
    }
    return PushDeviceRegistry.instance;
  }

  /**
   * Seed initial active devices for testing & demonstration
   */
  private seedDefaultDevices() {
    this.registerDevice({
      deviceId: 'DEV-ANDROID-GP-001',
      userId: 'USR-PARENT-101',
      platform: 'ANDROID',
      pushToken: 'fcm_token_android_gauteng_parent_8829',
      region: 'GAUTENG',
      municipality: 'CITY_OF_TSHWANE',
      topics: ['EMERGENCY_ALERTS', 'GAUTENG_TRAFFIC', 'PARENT_NOTIFICATIONS'],
      badgeCount: 0
    });

    this.registerDevice({
      deviceId: 'DEV-IOS-WC-002',
      userId: 'USR-DRIVER-202',
      platform: 'IOS',
      pushToken: 'apns_token_ios_westerncape_driver_9941_32ch_hash_key_apns_64ch_len',
      region: 'WESTERN_CAPE',
      municipality: 'CITY_OF_CAPE_TOWN',
      topics: ['EMERGENCY_ALERTS', 'WESTERN_CAPE_TRAFFIC', 'DRIVER_DISPATCH'],
      badgeCount: 2
    });

    this.registerDevice({
      deviceId: 'DEV-ANDROID-KZN-003',
      userId: 'USR-OFFICER-303',
      platform: 'ANDROID',
      pushToken: 'fcm_token_android_kzn_traffic_officer_1029',
      region: 'KZN',
      municipality: 'ETHEKWINI',
      topics: ['EMERGENCY_ALERTS', 'KZN_SAFETY', 'ROAD_INCIDENTS'],
      badgeCount: 1
    });
  }

  /**
   * Register or Update Mobile Push Device Token
   */
  public registerDevice(params: {
    deviceId: string;
    userId?: string;
    platform: PushPlatform;
    pushToken: string;
    region?: string;
    municipality?: string;
    topics?: string[];
    badgeCount?: number;
    appVersion?: string;
  }): PushDeviceRegistration {
    const existing = this.devices.get(params.deviceId);
    const now = new Date().toISOString();

    const registration: PushDeviceRegistration = {
      deviceId: params.deviceId,
      userId: params.userId || existing?.userId,
      platform: params.platform,
      pushToken: params.pushToken,
      region: (params.region || existing?.region || 'GAUTENG').toUpperCase(),
      municipality: (params.municipality || existing?.municipality || 'GENERAL').toUpperCase(),
      topics: params.topics || existing?.topics || ['EMERGENCY_ALERTS'],
      badgeCount: params.badgeCount ?? existing?.badgeCount ?? 0,
      appVersion: params.appVersion || existing?.appVersion || '2.4.1',
      lastActiveAt: now,
      createdAt: existing?.createdAt || now
    };

    this.devices.set(params.deviceId, registration);
    // Also index by pushToken for direct lookup
    this.devices.set(params.pushToken, registration);

    AuditLogger.log('INFO', `Registered Push Device ${params.deviceId} (${params.platform}, Region: ${registration.region})`);
    return registration;
  }

  /**
   * Find Device Registrations
   */
  public getDeviceByIdOrToken(idOrToken: string): PushDeviceRegistration | undefined {
    return this.devices.get(idOrToken);
  }

  public getDevicesByUserId(userId: string): PushDeviceRegistration[] {
    const matched: PushDeviceRegistration[] = [];
    const seen = new Set<string>();

    for (const device of this.devices.values()) {
      if (device.userId === userId && !seen.has(device.deviceId)) {
        seen.add(device.deviceId);
        matched.push(device);
      }
    }
    return matched;
  }

  public getDevicesByTopic(topic: string): PushDeviceRegistration[] {
    const cleanTopic = topic.replace(/^\/topics\//, '').toUpperCase();
    const matched: PushDeviceRegistration[] = [];
    const seen = new Set<string>();

    for (const device of this.devices.values()) {
      const hasTopic = device.topics.some((t) => t.toUpperCase() === cleanTopic);
      if (hasTopic && !seen.has(device.deviceId)) {
        seen.add(device.deviceId);
        matched.push(device);
      }
    }
    return matched;
  }

  public getDevicesByRegion(region: string, municipality?: string): PushDeviceRegistration[] {
    const cleanRegion = region.toUpperCase();
    const cleanMuni = municipality?.toUpperCase();
    const matched: PushDeviceRegistration[] = [];
    const seen = new Set<string>();

    for (const device of this.devices.values()) {
      const regionMatch = device.region === cleanRegion;
      const muniMatch = !cleanMuni || device.municipality === cleanMuni;

      if (regionMatch && muniMatch && !seen.has(device.deviceId)) {
        seen.add(device.deviceId);
        matched.push(device);
      }
    }
    return matched;
  }

  public getAllDevices(): PushDeviceRegistration[] {
    const uniqueMap = new Map<string, PushDeviceRegistration>();
    for (const dev of this.devices.values()) {
      uniqueMap.set(dev.deviceId, dev);
    }
    return Array.from(uniqueMap.values());
  }

  /**
   * Topic Subscriptions
   */
  public subscribeToTopic(idOrToken: string, topic: string): boolean {
    const device = this.devices.get(idOrToken);
    if (!device) return false;

    const cleanTopic = topic.replace(/^\/topics\//, '').toUpperCase();
    if (!device.topics.includes(cleanTopic)) {
      device.topics.push(cleanTopic);
    }
    return true;
  }

  public unsubscribeFromTopic(idOrToken: string, topic: string): boolean {
    const device = this.devices.get(idOrToken);
    if (!device) return false;

    const cleanTopic = topic.replace(/^\/topics\//, '').toUpperCase();
    device.topics = device.topics.filter((t) => t.toUpperCase() !== cleanTopic);
    return true;
  }

  /**
   * Badge Counters
   */
  public updateBadgeCount(idOrToken: string, newBadge: number): number {
    const device = this.devices.get(idOrToken);
    if (device) {
      device.badgeCount = Math.max(0, newBadge);
      return device.badgeCount;
    }
    return 0;
  }

  public incrementBadgeCount(idOrToken: string, increment: number = 1): number {
    const device = this.devices.get(idOrToken);
    if (device) {
      device.badgeCount = Math.max(0, device.badgeCount + increment);
      return device.badgeCount;
    }
    return 0;
  }

  public resetBadgeCount(idOrToken: string): number {
    return this.updateBadgeCount(idOrToken, 0);
  }

  /**
   * Push Notification History Log
   */
  public logHistoryRecord(record: Omit<PushHistoryRecord, 'id' | 'sentAt'>): PushHistoryRecord {
    const historyId = `PUSH-HIST-${Date.now()}-${Math.floor(Math.random() * 89999 + 10000)}`;
    const fullRecord: PushHistoryRecord = {
      ...record,
      id: historyId,
      sentAt: new Date().toISOString()
    };

    this.history.set(historyId, fullRecord);

    AuditLogger.recordAudit({
      action: `PUSH_DISPATCH_${record.targetType}`,
      resource: `/api/v1/communications/push/send`,
      correlationId: historyId,
      metadata: { target: record.target, title: record.title, priority: record.priority }
    });

    return fullRecord;
  }

  public getHistory(filters?: {
    targetType?: PushTargetType;
    target?: string;
    userId?: string;
    region?: string;
    limit?: number;
  }): PushHistoryRecord[] {
    let items = Array.from(this.history.values());

    if (filters?.targetType) {
      items = items.filter((h) => h.targetType === filters.targetType);
    }
    if (filters?.target) {
      items = items.filter((h) => h.target === filters.target);
    }
    if (filters?.region) {
      items = items.filter((h) => h.target === filters.region || (h.dataPayload && h.dataPayload.region === filters.region));
    }

    items.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());

    if (filters?.limit) {
      return items.slice(0, filters.limit);
    }
    return items;
  }
}
