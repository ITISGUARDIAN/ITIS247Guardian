// ITIS Enterprise Wearable IoT Telemetry Validation Engine (Prompt 070)
// Validates GPS accuracy, impossible speed, GPS spoofing, duplicate packets,
// invalid timestamps, replay attacks, and out-of-order packets.
import crypto from 'node:crypto';
import { AuditLogger } from '../common/audit.logger';
import { getPrismaClient } from '../database/prisma';
import { iotPlatformState } from './iot.controller';

export interface InboundTelemetryPacket {
  id?: string;
  deviceId: string;
  imei?: string;
  sequenceNumber?: number;
  latitude: number;
  longitude: number;
  altitude?: number;
  speed?: number; // in km/h
  accuracy?: number; // in meters
  satelliteCount?: number;
  timestamp: string | number; // ISO string or epoch ms
  nonce?: string;
  signature?: string;
  battery?: number;
  rawPayload?: string;
}

export interface TelemetryValidationResult {
  valid: boolean;
  rejectReason?: string;
  errorCode?:
    | 'INVALID_COORDINATES'
    | 'POOR_GPS_ACCURACY'
    | 'IMPOSSIBLE_SPEED'
    | 'GPS_SPOOFING_DETECTED'
    | 'DUPLICATE_PACKET'
    | 'INVALID_TIMESTAMP'
    | 'REPLAY_ATTACK_DETECTED'
    | 'OUT_OF_ORDER_PACKET';
  metrics?: {
    distanceMeters?: number;
    timeDeltaSeconds?: number;
    calculatedSpeedKmh?: number;
    accuracyMeters?: number;
    clockSkewSeconds?: number;
  };
  sanitizedPacket?: InboundTelemetryPacket;
}

export interface DeviceValidationState {
  lastTimestampMs: number;
  lastLatitude: number;
  lastLongitude: number;
  lastSequenceNumber?: number;
  processedHashes: Set<string>;
  usedNonces: Set<string>;
  recentPositions: Array<{ lat: number; lng: number; time: number }>;
}

export class TelemetryValidatorService {
  private prisma = getPrismaClient();

  // Thresholds & Validation Rules
  private maxAcceptableAccuracyMeters = 150.0; // GPS fixes > 150m rejected as poor accuracy
  private maxPossibleSpeedKmh = 200.0; // Max impossible speed for wearable/school bus
  private maxFutureClockSkewMs = 300000; // 5 minutes max future timestamp skew
  private maxPastAgeMs = 604800000; // 7 days max historical backfill
  private maxReplayWindowMs = 300000; // 5 minutes max replay window for nonced packets
  private hashDeduplicationWindowMs = 600000; // 10 minutes deduplication cache

  // In-memory per-device state tracking
  private deviceStates = new Map<string, DeviceValidationState>();
  private quarantineLog: Array<{
    deviceId: string;
    reason: string;
    errorCode: string;
    timestamp: string;
    packet: InboundTelemetryPacket;
  }> = [];

  // 1. Main Validation Entry Point
  public async validateTelemetryPacket(packet: InboundTelemetryPacket): Promise<TelemetryValidationResult> {
    if (!packet || !packet.deviceId) {
      return {
        valid: false,
        rejectReason: 'Telemetry packet missing required deviceId identifier.',
        errorCode: 'INVALID_COORDINATES'
      };
    }

    const deviceId = packet.deviceId;
    const devState = this.getOrCreateDeviceState(deviceId);

    // Step A: Coordinate Bounds & Numeric Sanity
    const coordVal = this.validateCoordinates(packet.latitude, packet.longitude);
    if (!coordVal.valid) {
      await this.logQuarantine(packet, coordVal.reason!, 'INVALID_COORDINATES');
      return { valid: false, rejectReason: coordVal.reason, errorCode: 'INVALID_COORDINATES' };
    }

    // Step B: Timestamp Format, Future Skew & Age Validation
    const timestampMs = this.parseTimestampMs(packet.timestamp);
    if (timestampMs === null) {
      const reason = `Unparseable timestamp format: '${packet.timestamp}'. Must be valid ISO-8601 or epoch MS.`;
      await this.logQuarantine(packet, reason, 'INVALID_TIMESTAMP');
      return { valid: false, rejectReason: reason, errorCode: 'INVALID_TIMESTAMP' };
    }

    const now = Date.now();
    const clockSkewSeconds = Math.round((timestampMs - now) / 1000);

    if (timestampMs > now + this.maxFutureClockSkewMs) {
      const reason = `Timestamp is too far in the future (skew: ${clockSkewSeconds}s). Potential clock tampering.`;
      await this.logQuarantine(packet, reason, 'INVALID_TIMESTAMP');
      return {
        valid: false,
        rejectReason: reason,
        errorCode: 'INVALID_TIMESTAMP',
        metrics: { clockSkewSeconds }
      };
    }

    if (timestampMs < now - this.maxPastAgeMs) {
      const reason = `Timestamp is expired (> 7 days old). Telemetry stale.`;
      await this.logQuarantine(packet, reason, 'INVALID_TIMESTAMP');
      return { valid: false, rejectReason: reason, errorCode: 'INVALID_TIMESTAMP' };
    }

    // Step C: Duplicate Packet Detection (SHA-256 Payload Hash & Nonce Check)
    const packetHash = this.computePacketHash(packet, timestampMs);
    if (devState.processedHashes.has(packetHash)) {
      const reason = `Duplicate telemetry packet hash detected for device '${deviceId}'.`;
      await this.logQuarantine(packet, reason, 'DUPLICATE_PACKET');
      return { valid: false, rejectReason: reason, errorCode: 'DUPLICATE_PACKET' };
    }

    // Step D: Replay Attack Check
    if (packet.nonce) {
      if (devState.usedNonces.has(packet.nonce)) {
        const reason = `Replay attack detected: Nonce '${packet.nonce}' has already been processed.`;
        await this.logQuarantine(packet, reason, 'REPLAY_ATTACK_DETECTED');
        return { valid: false, rejectReason: reason, errorCode: 'REPLAY_ATTACK_DETECTED' };
      }
      if (Math.abs(now - timestampMs) > this.maxReplayWindowMs) {
        const reason = `Replay attack detected: Signed nonced packet falls outside the 5-minute replay window.`;
        await this.logQuarantine(packet, reason, 'REPLAY_ATTACK_DETECTED');
        return { valid: false, rejectReason: reason, errorCode: 'REPLAY_ATTACK_DETECTED' };
      }
    }

    // Step E: Out-of-Order Packet Check
    if (devState.lastTimestampMs > 0 && timestampMs < devState.lastTimestampMs) {
      const timeDeltaSec = Math.round((devState.lastTimestampMs - timestampMs) / 1000);
      const reason = `Out-of-order packet rejected: Timestamp is ${timeDeltaSec}s older than latest accepted packet.`;
      await this.logQuarantine(packet, reason, 'OUT_OF_ORDER_PACKET');
      return {
        valid: false,
        rejectReason: reason,
        errorCode: 'OUT_OF_ORDER_PACKET',
        metrics: { timeDeltaSeconds: -timeDeltaSec }
      };
    }

    // Step F: GPS Accuracy Check
    const accuracy = packet.accuracy !== undefined ? packet.accuracy : 5.0; // Default 5m if unpopulated
    if (accuracy > this.maxAcceptableAccuracyMeters) {
      const reason = `GPS accuracy radius (${accuracy}m) exceeds maximum acceptable threshold (${this.maxAcceptableAccuracyMeters}m).`;
      await this.logQuarantine(packet, reason, 'POOR_GPS_ACCURACY');
      return {
        valid: false,
        rejectReason: reason,
        errorCode: 'POOR_GPS_ACCURACY',
        metrics: { accuracyMeters: accuracy }
      };
    }

    // Step G: GPS Spoofing Detection (Inconsistent Satellites & Synthetic Fix Patterns)
    const spoofCheck = this.detectGpsSpoofing(packet, devState);
    if (spoofCheck.isSpoofed) {
      await this.logQuarantine(packet, spoofCheck.reason!, 'GPS_SPOOFING_DETECTED');
      return { valid: false, rejectReason: spoofCheck.reason, errorCode: 'GPS_SPOOFING_DETECTED' };
    }

    // Step H: Impossible Speed Calculation (Haversine Distance / Time Delta)
    if (devState.lastTimestampMs > 0 && devState.lastLatitude !== 0 && devState.lastLongitude !== 0) {
      const distanceMeters = this.calculateHaversineDistance(
        devState.lastLatitude,
        devState.lastLongitude,
        packet.latitude,
        packet.longitude
      );
      const timeDeltaSeconds = (timestampMs - devState.lastTimestampMs) / 1000.0;

      if (timeDeltaSeconds > 0) {
        const calculatedSpeedKmh = (distanceMeters / timeDeltaSeconds) * 3.6;

        if (calculatedSpeedKmh > this.maxPossibleSpeedKmh) {
          const reason = `Impossible speed detected: Moved ${Math.round(distanceMeters)}m in ${timeDeltaSeconds.toFixed(
            1
          )}s (${Math.round(calculatedSpeedKmh)} km/h exceeds maximum limit of ${this.maxPossibleSpeedKmh} km/h).`;
          await this.logQuarantine(packet, reason, 'IMPOSSIBLE_SPEED');
          return {
            valid: false,
            rejectReason: reason,
            errorCode: 'IMPOSSIBLE_SPEED',
            metrics: {
              distanceMeters: Math.round(distanceMeters),
              timeDeltaSeconds,
              calculatedSpeedKmh: Math.round(calculatedSpeedKmh)
            }
          };
        }
      }
    }

    // Validation Passed! Update Device State Cache
    devState.lastTimestampMs = timestampMs;
    devState.lastLatitude = packet.latitude;
    devState.lastLongitude = packet.longitude;
    if (packet.sequenceNumber !== undefined) {
      devState.lastSequenceNumber = packet.sequenceNumber;
    }
    devState.processedHashes.add(packetHash);
    if (packet.nonce) {
      devState.usedNonces.add(packet.nonce);
    }
    devState.recentPositions.unshift({ lat: packet.latitude, lng: packet.longitude, time: timestampMs });
    if (devState.recentPositions.length > 20) {
      devState.recentPositions.pop();
    }

    const sanitizedPacket: InboundTelemetryPacket = {
      ...packet,
      timestamp: new Date(timestampMs).toISOString(),
      accuracy,
      speed: packet.speed || 0
    };

    return {
      valid: true,
      sanitizedPacket
    };
  }

  // 2. Coordinate Bounds & Numeric Sanity
  public validateCoordinates(lat: number, lng: number): { valid: boolean; reason?: string } {
    if (lat === undefined || lat === null || typeof lat !== 'number' || isNaN(lat)) {
      return { valid: false, reason: 'Latitude must be a valid numeric number.' };
    }
    if (lng === undefined || lng === null || typeof lng !== 'number' || isNaN(lng)) {
      return { valid: false, reason: 'Longitude must be a valid numeric number.' };
    }
    if (lat < -90.0 || lat > 90.0) {
      return { valid: false, reason: `Latitude '${lat}' out of valid physical bounds [-90, 90].` };
    }
    if (lng < -180.0 || lng > 180.0) {
      return { valid: false, reason: `Longitude '${lng}' out of valid physical bounds [-180, 180].` };
    }
    if (lat === 0.0 && lng === 0.0) {
      return { valid: false, reason: 'Null Island coordinates (0.0, 0.0) indicate uninitialized GNSS module.' };
    }
    return { valid: true };
  }

  // 3. GPS Spoofing & Synthetic Fix Detector
  public detectGpsSpoofing(packet: InboundTelemetryPacket, devState: DeviceValidationState): { isSpoofed: boolean; reason?: string } {
    // Rule 1: 0 Satellites reported with sub-2 meter precision
    if (packet.satelliteCount === 0 && packet.accuracy !== undefined && packet.accuracy < 2.0) {
      return {
        isSpoofed: true,
        reason: 'GPS Spoofing detected: 0 GNSS satellites tracked while claiming high accuracy fix (< 2.0m).'
      };
    }

    // Rule 2: Sudden Teleportation (> 50 km jump in < 10 seconds)
    if (devState.lastTimestampMs > 0 && devState.lastLatitude !== 0) {
      const distanceM = this.calculateHaversineDistance(devState.lastLatitude, devState.lastLongitude, packet.latitude, packet.longitude);
      const timestampMs = this.parseTimestampMs(packet.timestamp) || Date.now();
      const timeDeltaSec = (timestampMs - devState.lastTimestampMs) / 1000.0;

      if (timeDeltaSec > 0 && timeDeltaSec <= 10.0 && distanceM > 50000) {
        return {
          isSpoofed: true,
          reason: `GPS Spoofing / Teleportation detected: Location jumped ${Math.round(distanceM / 1000)} km in ${timeDeltaSec} seconds.`
        };
      }
    }

    // Rule 3: Exact Identical Floating-Point Coordinate Locks (Synthetic Jitter-Free Repeat)
    if (devState.recentPositions.length >= 10) {
      const matches = devState.recentPositions.filter((pos) => pos.lat === packet.latitude && pos.lng === packet.longitude);
      if (matches.length >= 10 && (packet.speed || 0) > 10.0) {
        return {
          isSpoofed: true,
          reason: 'GPS Spoofing detected: Static coordinate lock reported while device speed > 10 km/h.'
        };
      }
    }

    return { isSpoofed: false };
  }

  // 4. Haversine Distance Helper (Returns meters between 2 coordinates)
  public calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Earth radius in meters
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180.0);
  }

  // 5. Utility & Hash Helpers
  private parseTimestampMs(ts: string | number): number | null {
    if (typeof ts === 'number') {
      return isNaN(ts) ? null : ts;
    }
    if (typeof ts === 'string') {
      const parsed = Date.parse(ts);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  }

  private computePacketHash(packet: InboundTelemetryPacket, tsMs: number): string {
    const rawStr = `${packet.deviceId}:${packet.sequenceNumber || 0}:${tsMs}:${packet.latitude.toFixed(6)}:${packet.longitude.toFixed(6)}`;
    return crypto.createHash('sha256').update(rawStr).digest('hex');
  }

  private getOrCreateDeviceState(deviceId: string): DeviceValidationState {
    if (!this.deviceStates.has(deviceId)) {
      this.deviceStates.set(deviceId, {
        lastTimestampMs: 0,
        lastLatitude: 0,
        lastLongitude: 0,
        processedHashes: new Set<string>(),
        usedNonces: new Set<string>(),
        recentPositions: []
      });
    }
    return this.deviceStates.get(deviceId)!;
  }

  private async logQuarantine(packet: InboundTelemetryPacket, reason: string, errorCode: string): Promise<void> {
    const entry = {
      deviceId: packet.deviceId,
      reason,
      errorCode,
      timestamp: new Date().toISOString(),
      packet
    };

    this.quarantineLog.unshift(entry);
    if (this.quarantineLog.length > 500) {
      this.quarantineLog.pop();
    }

    await AuditLogger.recordAudit({
      action: `TELEMETRY_REJECTED_${errorCode}`,
      resource: `/api/v1/iot/telemetry/${packet.deviceId}`,
      correlationId: `TEL-REJECT-${Date.now()}`,
      metadata: { deviceId: packet.deviceId, reason, errorCode, packet }
    });
  }

  public getQuarantineLog(limit = 100) {
    return this.quarantineLog.slice(0, limit);
  }
}

export const telemetryValidatorService = new TelemetryValidatorService();
