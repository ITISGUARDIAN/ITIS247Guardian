// ITIS Push Notification Provider Factory & Router Engine
// Coordinates FCM (Android) & APNs (iOS) Providers, User Device Lookups,
// Topic Messaging, Regional Geofence Broadcasts, Emergency Priority Escalations, & Badge Counters

import { AuditLogger } from '../../common/audit.logger';
import { AdapterSendResult } from '../communications.types';
import { ApnsPushProvider } from './providers/apns.provider';
import { FcmPushProvider } from './providers/fcm.provider';
import { PushDeviceRegistry } from './push-device.registry';
import {
  ApnsConfig,
  FcmConfig,
  IPushProvider,
  PushDispatchOptions,
  PushHistoryRecord,
  PushPlatform
} from './push.types';

export class PushProviderFactory {
  private static instance: PushProviderFactory;

  private fcmProvider: FcmPushProvider;
  private apnsProvider: ApnsPushProvider;
  private registry = PushDeviceRegistry.getInstance();

  private constructor() {
    this.fcmProvider = new FcmPushProvider();
    this.apnsProvider = new ApnsPushProvider();
  }

  public static getInstance(): PushProviderFactory {
    if (!PushProviderFactory.instance) {
      PushProviderFactory.instance = new PushProviderFactory();
    }
    return PushProviderFactory.instance;
  }

  /**
   * Configure FCM / APNs credentials
   */
  public configureFcm(config: Partial<FcmConfig>) {
    this.fcmProvider = new FcmPushProvider(config);
    AuditLogger.log('INFO', 'Configured Android FCM Push Provider.');
  }

  public configureApns(config: Partial<ApnsConfig>) {
    this.apnsProvider = new ApnsPushProvider(config);
    AuditLogger.log('INFO', 'Configured iOS APNs Push Provider.');
  }

  public getProviderForPlatform(platform: PushPlatform): IPushProvider {
    if (platform === 'IOS') {
      return this.apnsProvider;
    }
    return this.fcmProvider;
  }

  /**
   * 1. Direct Push Dispatch to Single Device Token or Device ID
   */
  public async dispatchToDevice(
    tokenOrDeviceId: string,
    options: PushDispatchOptions
  ): Promise<AdapterSendResult> {
    const registeredDevice = this.registry.getDeviceByIdOrToken(tokenOrDeviceId);
    const token = registeredDevice?.pushToken || tokenOrDeviceId;
    const isApns = registeredDevice?.platform === 'IOS' || token.startsWith('apns_') || token.length === 64;

    const provider = isApns ? this.apnsProvider : this.fcmProvider;

    // Update badge count
    let updatedBadge = options.badge ?? 1;
    if (registeredDevice) {
      if (options.badgeStrategy === 'INCREMENT') {
        updatedBadge = this.registry.incrementBadgeCount(registeredDevice.deviceId, options.badge || 1);
      } else if (options.badge !== undefined) {
        updatedBadge = this.registry.updateBadgeCount(registeredDevice.deviceId, options.badge);
      }
    }

    const compiledOptions: PushDispatchOptions = {
      ...options,
      badge: updatedBadge
    };

    const result = await provider.sendToDevice(token, compiledOptions);

    this.registry.logHistoryRecord({
      targetType: 'DEVICE',
      target: tokenOrDeviceId,
      title: options.title,
      body: options.body,
      priority: options.priority || 'NORMAL',
      criticalInterruption: Boolean(options.criticalInterruption || options.priority === 'CRITICAL'),
      platform: isApns ? 'IOS' : 'ANDROID',
      badge: updatedBadge,
      dataPayload: options.dataPayload,
      successCount: result.success ? 1 : 0,
      failureCount: result.success ? 0 : 1,
      providerRefs: [result.providerReference || 'N/A']
    });

    return result;
  }

  /**
   * 2. Direct Push Dispatch to User ID (Dispatches to all active devices registered under User)
   */
  public async dispatchToUser(
    userId: string,
    options: PushDispatchOptions
  ): Promise<AdapterSendResult & { matchedDevicesCount: number }> {
    const devices = this.registry.getDevicesByUserId(userId);

    if (devices.length === 0) {
      AuditLogger.log('WARN', `No registered push devices found for user '${userId}'.`);
      return {
        success: false,
        errorReason: `No active push devices registered for user ID '${userId}'.`,
        shouldRetry: false,
        matchedDevicesCount: 0
      };
    }

    let successCount = 0;
    let failureCount = 0;
    const providerRefs: string[] = [];

    for (const dev of devices) {
      const isApns = dev.platform === 'IOS';
      const provider = isApns ? this.apnsProvider : this.fcmProvider;

      let badgeVal = options.badge ?? 1;
      if (options.badgeStrategy === 'INCREMENT') {
        badgeVal = this.registry.incrementBadgeCount(dev.deviceId, options.badge || 1);
      } else if (options.badge !== undefined) {
        badgeVal = this.registry.updateBadgeCount(dev.deviceId, options.badge);
      }

      const res = await provider.sendToDevice(dev.pushToken, { ...options, badge: badgeVal });
      if (res.success) {
        successCount++;
        providerRefs.push(res.providerReference || 'OK');
      } else {
        failureCount++;
      }
    }

    this.registry.logHistoryRecord({
      targetType: 'USER',
      target: userId,
      title: options.title,
      body: options.body,
      priority: options.priority || 'NORMAL',
      criticalInterruption: Boolean(options.criticalInterruption || options.priority === 'CRITICAL'),
      platform: 'MULTI_PLATFORM',
      badge: options.badge || 1,
      dataPayload: options.dataPayload,
      successCount,
      failureCount,
      providerRefs
    });

    return {
      success: successCount > 0,
      providerReference: providerRefs.join(', '),
      shouldRetry: failureCount > 0,
      matchedDevicesCount: devices.length,
      metadata: {
        userId,
        devicesTargeted: devices.length,
        successCount,
        failureCount
      }
    };
  }

  /**
   * 3. Broadcast Push Dispatch to Topic Subscription (e.g. `/topics/EMERGENCY_ALERTS`)
   */
  public async dispatchToTopic(
    topic: string,
    options: PushDispatchOptions
  ): Promise<AdapterSendResult & { matchedSubscribersCount: number }> {
    const subscribers = this.registry.getDevicesByTopic(topic);
    const cleanTopic = topic.replace(/^\/topics\//, '');

    // Execute topic broadcast via FCM / APNs
    const fcmRes = await this.fcmProvider.sendToTopic(cleanTopic, options);
    const apnsRes = await this.apnsProvider.sendToTopic(cleanTopic, options);

    // Also update badge counts for registered device subscribers
    for (const sub of subscribers) {
      this.registry.incrementBadgeCount(sub.deviceId, 1);
    }

    this.registry.logHistoryRecord({
      targetType: 'TOPIC',
      target: cleanTopic,
      title: options.title,
      body: options.body,
      priority: options.priority || 'NORMAL',
      criticalInterruption: Boolean(options.criticalInterruption || options.priority === 'CRITICAL'),
      platform: 'MULTI_PLATFORM',
      badge: 1,
      dataPayload: options.dataPayload,
      successCount: subscribers.length || 1,
      failureCount: 0,
      providerRefs: [fcmRes.providerReference || 'FCM-TOPIC', apnsRes.providerReference || 'APNS-TOPIC']
    });

    return {
      success: true,
      providerReference: `${fcmRes.providerReference}, ${apnsRes.providerReference}`,
      shouldRetry: true,
      matchedSubscribersCount: subscribers.length,
      metadata: {
        topic: cleanTopic,
        subscribersTargeted: subscribers.length,
        fcmRef: fcmRes.providerReference,
        apnsRef: apnsRes.providerReference
      }
    };
  }

  /**
   * 4. Regional Geofence Push Broadcast (e.g. Province: GAUTENG, WESTERN_CAPE, KZN)
   */
  public async dispatchToRegion(
    region: string,
    municipality: string | undefined,
    options: PushDispatchOptions
  ): Promise<AdapterSendResult & { targetedDevicesCount: number }> {
    const devicesInRegion = this.registry.getDevicesByRegion(region, municipality);

    if (devicesInRegion.length === 0) {
      AuditLogger.log('WARN', `No active push devices found in region '${region}' (Municipality: ${municipality || 'ANY'}).`);
      return {
        success: false,
        errorReason: `No active push devices registered in region '${region}'.`,
        shouldRetry: false,
        targetedDevicesCount: 0
      };
    }

    let successCount = 0;
    let failureCount = 0;
    const providerRefs: string[] = [];

    for (const dev of devicesInRegion) {
      const isApns = dev.platform === 'IOS';
      const provider = isApns ? this.apnsProvider : this.fcmProvider;

      const updatedBadge = this.registry.incrementBadgeCount(dev.deviceId, 1);
      const res = await provider.sendToDevice(dev.pushToken, {
        ...options,
        badge: updatedBadge,
        dataPayload: {
          ...(options.dataPayload || {}),
          targetedRegion: region,
          targetedMunicipality: municipality || 'ALL'
        }
      });

      if (res.success) {
        successCount++;
        providerRefs.push(res.providerReference || 'OK');
      } else {
        failureCount++;
      }
    }

    this.registry.logHistoryRecord({
      targetType: 'REGION',
      target: region,
      title: options.title,
      body: options.body,
      priority: options.priority || 'NORMAL',
      criticalInterruption: Boolean(options.criticalInterruption || options.priority === 'CRITICAL'),
      platform: 'MULTI_PLATFORM',
      badge: 1,
      dataPayload: { region, municipality, ...(options.dataPayload || {}) },
      successCount,
      failureCount,
      providerRefs
    });

    return {
      success: successCount > 0,
      providerReference: providerRefs.join(', '),
      shouldRetry: failureCount > 0,
      targetedDevicesCount: devicesInRegion.length,
      metadata: {
        region,
        municipality: municipality || 'ALL',
        devicesTargeted: devicesInRegion.length,
        successCount,
        failureCount
      }
    };
  }

  /**
   * 5. High-Priority Emergency SOS Broadcast (Overrides Silent Mode, High Priority sirens, Max Badge)
   */
  public async dispatchEmergencyAlert(params: {
    targetType: 'USER' | 'TOPIC' | 'REGION' | 'DEVICE';
    target: string;
    title: string;
    body: string;
    sosEventId?: string;
    learnerName?: string;
    location?: string;
  }): Promise<AdapterSendResult> {
    const emergencyOptions: PushDispatchOptions = {
      targetType: params.targetType,
      target: params.target,
      title: `🚨 ${params.title.toUpperCase()}`,
      body: params.body,
      priority: 'CRITICAL',
      criticalInterruption: true,
      sound: 'emergency_siren.caf',
      badgeStrategy: 'INCREMENT',
      badge: 1,
      timeToLiveSeconds: 86400,
      dataPayload: {
        isEmergencySos: 'true',
        sosEventId: params.sosEventId || `SOS-${Date.now()}`,
        learnerName: params.learnerName || 'Learner',
        location: params.location || 'Unknown Zone',
        timestamp: new Date().toISOString()
      }
    };

    switch (params.targetType) {
      case 'DEVICE':
        return this.dispatchToDevice(params.target, emergencyOptions);
      case 'USER':
        return this.dispatchToUser(params.target, emergencyOptions);
      case 'TOPIC':
        return this.dispatchToTopic(params.target, emergencyOptions);
      case 'REGION':
        return this.dispatchToRegion(params.target, undefined, emergencyOptions);
      default:
        return this.dispatchToTopic('EMERGENCY_ALERTS', emergencyOptions);
    }
  }

  /**
   * Run Health Checks across FCM and APNs Providers
   */
  public async healthCheckAll(): Promise<Record<string, { healthy: boolean; responseMs: number; details?: string }>> {
    const fcmHealth = await this.fcmProvider.healthCheck();
    const apnsHealth = await this.apnsProvider.healthCheck();

    return {
      ANDROID_FCM: fcmHealth,
      IOS_APNS: apnsHealth
    };
  }
}
