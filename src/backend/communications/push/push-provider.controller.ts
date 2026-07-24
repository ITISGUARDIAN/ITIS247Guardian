// ITIS Push Notification Provider REST Controller
// Endpoints for Device Registrations, Direct & User Push, Topic Broadcasts, Regional Geofences,
// Emergency SOS Critical Alerts, Topic Subscriptions, Badge Counter Resets, & Push History Logs

import { Request, Response, Router } from 'express';
import { PushDeviceRegistry } from './push-device.registry';
import { PushProviderFactory } from './push-provider.factory';
import { PushPlatform, PushTargetType } from './push.types';

export const pushProviderRouter = Router();

const providerFactory = PushProviderFactory.getInstance();
const registry = PushDeviceRegistry.getInstance();

/**
 * 1. CHECK HEALTH OF FCM AND APNS PUSH PROVIDERS
 * GET /api/v1/communications/push/health
 */
pushProviderRouter.get('/health', async (req: Request, res: Response) => {
  try {
    const healthMap = await providerFactory.healthCheckAll();
    return res.json({
      success: true,
      providers: healthMap
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'HEALTH_CHECK_FAILED', message: err.message });
  }
});

/**
 * 2. REGISTER OR UPDATE MOBILE PUSH DEVICE TOKEN
 * POST /api/v1/communications/push/register-device
 */
pushProviderRouter.post('/register-device', (req: Request, res: Response) => {
  try {
    const { deviceId, userId, platform, pushToken, region, municipality, topics, badgeCount, appVersion } = req.body;

    if (!deviceId || !pushToken || !platform) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_FIELDS',
        message: 'Required parameters: deviceId, pushToken, platform (ANDROID | IOS | WEB).'
      });
    }

    const registration = registry.registerDevice({
      deviceId,
      userId,
      platform: platform as PushPlatform,
      pushToken,
      region,
      municipality,
      topics,
      badgeCount,
      appVersion
    });

    return res.json({
      success: true,
      message: `Device '${deviceId}' registered successfully for ${platform}.`,
      registration
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'REGISTRATION_FAILED', message: err.message });
  }
});

/**
 * 3. DISPATCH DIRECT PUSH TO DEVICE TOKEN OR USER ID
 * POST /api/v1/communications/push/send
 */
pushProviderRouter.post('/send', async (req: Request, res: Response) => {
  try {
    const { target, targetType, title, body, priority, badge, sound, dataPayload, clickActionUrl } = req.body;

    if (!target || !title || !body) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_FIELDS',
        message: 'Required parameters: target (token or userId), title, body.'
      });
    }

    const type: PushTargetType = targetType || (target.startsWith('USR-') || target.startsWith('USER-') ? 'USER' : 'DEVICE');

    let result;
    if (type === 'USER') {
      result = await providerFactory.dispatchToUser(target, {
        targetType: 'USER',
        target,
        title,
        body,
        priority: priority || 'NORMAL',
        badge,
        badgeStrategy: 'INCREMENT',
        sound,
        clickActionUrl,
        dataPayload
      });
    } else {
      result = await providerFactory.dispatchToDevice(target, {
        targetType: 'DEVICE',
        target,
        title,
        body,
        priority: priority || 'NORMAL',
        badge,
        badgeStrategy: 'INCREMENT',
        sound,
        clickActionUrl,
        dataPayload
      });
    }

    return res.status(result.success ? 200 : 400).json({
      success: result.success,
      providerReference: result.providerReference,
      errorReason: result.errorReason,
      metadata: result.metadata
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DISPATCH_EXCEPTION', message: err.message });
  }
});

/**
 * 4. BROADCAST PUSH TO TOPIC SUBSCRIPTION
 * POST /api/v1/communications/push/send-topic
 */
pushProviderRouter.post('/send-topic', async (req: Request, res: Response) => {
  try {
    const { topic, title, body, priority, sound, dataPayload } = req.body;

    if (!topic || !title || !body) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_FIELDS',
        message: 'Required parameters: topic, title, body.'
      });
    }

    const result = await providerFactory.dispatchToTopic(topic, {
      targetType: 'TOPIC',
      target: topic,
      title,
      body,
      priority: priority || 'NORMAL',
      sound,
      dataPayload
    });

    return res.json({
      success: result.success,
      topic: topic.replace(/^\/topics\//, ''),
      matchedSubscribersCount: result.matchedSubscribersCount,
      providerReference: result.providerReference,
      metadata: result.metadata
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'TOPIC_DISPATCH_FAILED', message: err.message });
  }
});

/**
 * 5. BROADCAST PUSH TO REGIONAL GEOFENCE
 * POST /api/v1/communications/push/send-regional
 */
pushProviderRouter.post('/send-regional', async (req: Request, res: Response) => {
  try {
    const { region, municipality, title, body, priority, sound, dataPayload } = req.body;

    if (!region || !title || !body) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_FIELDS',
        message: 'Required parameters: region (e.g. GAUTENG, WESTERN_CAPE, KZN), title, body.'
      });
    }

    const result = await providerFactory.dispatchToRegion(region, municipality, {
      targetType: 'REGION',
      target: region,
      title,
      body,
      priority: priority || 'HIGH',
      sound: sound || 'regional_alert.caf',
      dataPayload
    });

    return res.status(result.success ? 200 : 400).json({
      success: result.success,
      region,
      municipality: municipality || 'ALL',
      targetedDevicesCount: result.targetedDevicesCount,
      providerReference: result.providerReference,
      errorReason: result.errorReason,
      metadata: result.metadata
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'REGIONAL_DISPATCH_FAILED', message: err.message });
  }
});

/**
 * 6. HIGH-PRIORITY EMERGENCY SOS CRITICAL ALERT PUSH
 * POST /api/v1/communications/push/send-emergency
 */
pushProviderRouter.post('/send-emergency', async (req: Request, res: Response) => {
  try {
    const { targetType, target, title, body, sosEventId, learnerName, location } = req.body;

    if (!target || !title || !body) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_FIELDS',
        message: 'Required parameters: target, title, body.'
      });
    }

    const result = await providerFactory.dispatchEmergencyAlert({
      targetType: targetType || 'USER',
      target,
      title,
      body,
      sosEventId,
      learnerName,
      location
    });

    return res.status(result.success ? 200 : 400).json({
      success: result.success,
      emergencyStatus: 'CRITICAL_ALERT_DISPATCHED',
      providerReference: result.providerReference,
      metadata: result.metadata
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'EMERGENCY_PUSH_FAILED', message: err.message });
  }
});

/**
 * 7. SUBSCRIBE DEVICE TO TOPIC
 * POST /api/v1/communications/push/topics/subscribe
 */
pushProviderRouter.post('/topics/subscribe', (req: Request, res: Response) => {
  const { deviceIdOrToken, topic } = req.body;

  if (!deviceIdOrToken || !topic) {
    return res.status(400).json({ success: false, message: 'deviceIdOrToken and topic required.' });
  }

  const ok = registry.subscribeToTopic(deviceIdOrToken, topic);
  return res.json({
    success: ok,
    message: ok
      ? `Device subscribed to topic '${topic}'.`
      : `Device '${deviceIdOrToken}' not found in registry.`
  });
});

/**
 * 8. UNSUBSCRIBE DEVICE FROM TOPIC
 * POST /api/v1/communications/push/topics/unsubscribe
 */
pushProviderRouter.post('/topics/unsubscribe', (req: Request, res: Response) => {
  const { deviceIdOrToken, topic } = req.body;

  if (!deviceIdOrToken || !topic) {
    return res.status(400).json({ success: false, message: 'deviceIdOrToken and topic required.' });
  }

  const ok = registry.unsubscribeFromTopic(deviceIdOrToken, topic);
  return res.json({
    success: ok,
    message: ok
      ? `Device unsubscribed from topic '${topic}'.`
      : `Device '${deviceIdOrToken}' not found in registry.`
  });
});

/**
 * 9. GET & RESET DEVICE BADGE COUNTERS
 * GET /api/v1/communications/push/badges/:deviceIdOrToken
 */
pushProviderRouter.get('/badges/:deviceIdOrToken', (req: Request, res: Response) => {
  const device = registry.getDeviceByIdOrToken(req.params.deviceIdOrToken);

  return res.json({
    success: Boolean(device),
    badgeCount: device ? device.badgeCount : 0,
    deviceId: device ? device.deviceId : req.params.deviceIdOrToken
  });
});

/**
 * POST /api/v1/communications/push/badges/reset
 */
pushProviderRouter.post('/badges/reset', (req: Request, res: Response) => {
  const { deviceIdOrToken } = req.body;

  if (!deviceIdOrToken) {
    return res.status(400).json({ success: false, message: 'deviceIdOrToken required.' });
  }

  const updatedBadge = registry.resetBadgeCount(deviceIdOrToken);
  return res.json({
    success: true,
    badgeCount: updatedBadge,
    message: `Badge count reset to 0 for '${deviceIdOrToken}'.`
  });
});

/**
 * 10. GET NOTIFICATION HISTORY LOGS
 * GET /api/v1/communications/push/history
 */
pushProviderRouter.get('/history', (req: Request, res: Response) => {
  const { targetType, target, region, limit } = req.query;

  const logs = registry.getHistory({
    targetType: targetType as PushTargetType,
    target: target as string,
    region: region as string,
    limit: limit ? Number(limit) : 50
  });

  return res.json({
    success: true,
    count: logs.length,
    history: logs
  });
});

/**
 * 11. LIST REGISTERED DEVICES
 * GET /api/v1/communications/push/devices
 */
pushProviderRouter.get('/devices', (req: Request, res: Response) => {
  const devices = registry.getAllDevices();
  return res.json({
    success: true,
    count: devices.length,
    devices
  });
});
