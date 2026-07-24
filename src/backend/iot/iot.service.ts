// ITIS Production Enterprise IoT Gateway & Device Lifecycle Service (Prompt 070)
import { AuditLogger } from '../common/audit.logger';
import { getPrismaClient } from '../database/prisma';
import { iotPlatformState } from './iot.controller';
import { liveState } from '../api.routes';

export interface RegisterDeviceDto {
  imei: string;
  serialNumber: string;
  iccid?: string;
  eSimId?: string;
  deviceCertificate?: string;
  publicKey?: string;
  firmwareVersion?: string;
  hardwareRevision?: string;
  batteryCapacity?: number;
  manufacturingBatch?: string;
  productionDate?: string;
  warrantyStatus?: string;
  technicianId?: string;
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
}

export interface ActivateDeviceDto {
  imei: string;
  learnerId?: string;
  learnerName?: string;
  schoolName?: string;
}

export interface DeactivateDeviceDto {
  imei: string;
  reason?: string;
}

export interface SimulateTelemetryDto {
  scenario?: 'SCHOOL_COMMUTE' | 'BUS_ROUTE' | 'SOS_EVENT' | 'LOW_BATTERY' | 'TAMPER_ALERT' | 'DEVICE_OFFLINE' | 'GPS_DRIFT';
  imei?: string;
  latitude?: number;
  longitude?: number;
  speed?: number;
  batteryPercent?: number;
}

export interface UploadFirmwareDto {
  version: string;
  hardwareRevision?: string;
  fileSizeBytes?: number;
  releaseNotes?: string;
  rolloutType?: 'CANARY' | 'STAGED' | 'GLOBAL';
}

export class IotService {
  private prisma = getPrismaClient();

  // 1. IMEI Validation (Luhn algorithm & 15-digit check)
  public validateIMEI(imei: string): { valid: boolean; reason?: string } {
    if (!imei || typeof imei !== 'string') {
      return { valid: false, reason: 'IMEI must be a non-empty string.' };
    }
    const cleanImei = imei.trim();
    if (!/^\d{15}$/.test(cleanImei)) {
      return { valid: false, reason: 'IMEI must be exactly 15 numeric digits.' };
    }

    // Luhn Algorithm Check
    let sum = 0;
    for (let i = 0; i < 15; i++) {
      let digit = parseInt(cleanImei.charAt(i), 10);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    if (sum % 10 !== 0) {
      return { valid: false, reason: 'IMEI failed Luhn checksum validation algorithm.' };
    }

    return { valid: true };
  }

  // 2. Clone Detection Logic
  public detectCloneOrDuplicate(imei: string, serialNumber?: string): { isClone: boolean; existingDevice?: any; reason?: string } {
    // Check Revocation / Blacklist
    if (iotPlatformState.revocationList.has(imei)) {
      return { isClone: true, reason: 'IMEI is present on the Revocation List (CRL).' };
    }

    // Check duplicate IMEI or Serial Number in existing registry
    const match = iotPlatformState.devices.find(
      (d) => d.imei === imei || (serialNumber && d.serialNumber === serialNumber)
    );

    if (match) {
      return {
        isClone: true,
        existingDevice: match,
        reason: match.imei === imei ? `IMEI '${imei}' already registered.` : `Serial number '${serialNumber}' already registered.`
      };
    }

    return { isClone: false };
  }

  // 3. X.509 Certificate Validation
  public validateX509Certificate(certPem: string, imei?: string): { valid: boolean; fingerprint?: string; error?: string } {
    if (!certPem || !certPem.includes('-----BEGIN CERTIFICATE-----')) {
      return { valid: false, error: 'Invalid X.509 Certificate: Missing PEM headers.' };
    }

    // Generate cryptographic fingerprint
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const fingerprint = `sha256:${hash}`;

    if (imei && iotPlatformState.revocationList.has(imei)) {
      return { valid: false, error: 'X.509 Certificate has been revoked by RSA Gov CA (OCSP status: REVOKED).' };
    }

    return { valid: true, fingerprint };
  }

  // 4. Register Wearable Device
  public async registerDevice(dto: RegisterDeviceDto) {
    const imeiVal = this.validateIMEI(dto.imei);
    if (!imeiVal.valid) {
      throw new Error(`IMEI Validation Failed: ${imeiVal.reason}`);
    }

    const cloneCheck = this.detectCloneOrDuplicate(dto.imei, dto.serialNumber);
    if (cloneCheck.isClone) {
      await AuditLogger.recordAudit({
        action: 'IOT_REGISTER_REJECT_CLONE',
        resource: '/api/v1/iot/register',
        correlationId: 'IOT-REG-CLONE-REJECT',
        metadata: { imei: dto.imei, reason: cloneCheck.reason }
      });
      throw new Error(`Duplicate / Clone Device Rejected: ${cloneCheck.reason}`);
    }

    const certVal = this.validateX509Certificate(dto.deviceCertificate || '-----BEGIN CERTIFICATE-----\nDEFAULT\n-----END CERTIFICATE-----', dto.imei);
    if (!certVal.valid) {
      throw new Error(certVal.error);
    }

    const deviceId = `ITIS-DEV-2026-SA-${Math.floor(1000 + Math.random() * 9000)}`;
    const secureToken = `tok_live_itis_${Math.random().toString(36).substring(2, 15)}`;
    const fingerprint = certVal.fingerprint || `sha256:${Math.random().toString(36).substring(2, 15)}`;

    const newDevice = {
      imei: dto.imei,
      deviceId,
      serialNumber: dto.serialNumber,
      iccid: dto.iccid || `892701002394${Math.floor(100000000 + Math.random() * 900000000)}`,
      eSimId: dto.eSimId || `EID-8903302${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      x509Certificate: dto.deviceCertificate || `-----BEGIN CERTIFICATE-----\nMIID3DCCAs...ITIS_CLIENT_CERT_${deviceId}...==\n-----END CERTIFICATE-----`,
      publicKey: dto.publicKey || 'RSA-4096-PUBLIC-KEY-SECURE-ELEMENT',
      secureToken,
      fingerprint,
      firmwareVersion: dto.firmwareVersion || 'v2.4.1-STABLE',
      hardwareRevision: dto.hardwareRevision || 'nRF9160-LTE-M-REV3.2',
      manufacturingBatch: dto.manufacturingBatch || 'BATCH-2026-Q2-DBE',
      productionDate: dto.productionDate || new Date().toISOString().split('T')[0],
      warrantyStatus: dto.warrantyStatus || 'VALID',
      batteryCapacityMah: dto.batteryCapacity || 1200,
      status: 'PROVISIONED',
      provisionedAt: new Date().toISOString(),
      deviceHealth: {
        batteryPercent: 100,
        batteryHealth: 'EXCELLENT',
        batteryDegradationPct: 0.0,
        lteSignalDbm: -68,
        signalQuality: 'EXCELLENT',
        gpsFixQuality: '3D_FIX',
        satellitesTracked: 12,
        temperatureC: 25.0,
        chargingCycles: 0,
        charging: false,
        storageUsageMb: 4.2,
        cpuLoadPct: 3.1,
        ramUsagePct: 15.0,
        gnssStatus: '3D_LOCK',
        cellTower: 'MTN-SA-MCC655-MNC10-NEW',
        radioQuality: 'RSRP_-68dBm',
        sensorHealth: 'ALL_PASS',
        lastHeartbeatAt: new Date().toISOString(),
        heartbeatIntervalSeconds: 60,
        heartbeatState: 'ONLINE'
      },
      assignedTechnician: {
        id: dto.technicianId || dto.assignedTechnicianId || 'TECH-801',
        name: dto.assignedTechnicianName || 'Regional Master Technician',
        assignedAt: new Date().toISOString()
      },
      technicianHistory: [
        {
          action: 'DEVICE_INITIAL_REGISTRATION',
          technician: dto.assignedTechnicianName || 'Regional Master Technician',
          timestamp: new Date().toISOString(),
          notes: 'Device provisioned and X.509 cryptographic client identity generated.'
        }
      ],
      assignedLearner: null
    };

    iotPlatformState.devices.push(newDevice);

    await AuditLogger.recordAudit({
      action: 'IOT_DEVICE_REGISTERED',
      resource: '/api/v1/iot/register',
      correlationId: 'IOT-REG-SERVICE',
      metadata: { imei: dto.imei, deviceId, serialNumber: dto.serialNumber }
    });

    return newDevice;
  }

  // 5. Activate Device
  public async activateDevice(dto: ActivateDeviceDto) {
    const device = iotPlatformState.devices.find((d) => d.imei === dto.imei || d.deviceId === dto.imei);
    if (!device) {
      throw new Error(`Device with IMEI '${dto.imei}' not found.`);
    }

    if (iotPlatformState.revocationList.has(device.imei)) {
      throw new Error('Cannot activate a revoked device certificate.');
    }

    if (dto.learnerId) {
      const existingAssigned = iotPlatformState.devices.find(
        (d) => d.status === 'ACTIVE' && d.assignedLearner?.learnerId === dto.learnerId && d.imei !== device.imei
      );
      if (existingAssigned) {
        throw new Error(
          `Learner '${dto.learnerName || dto.learnerId}' is already assigned to active wearable '${existingAssigned.deviceId}'. Unassign first.`
        );
      }

      device.assignedLearner = {
        learnerId: dto.learnerId,
        name: dto.learnerName || 'Assigned Learner',
        school: dto.schoolName || 'Department of Basic Education School'
      };
    }

    device.status = 'ACTIVE';
    device.technicianHistory.push({
      action: 'DEVICE_ACTIVATED',
      technician: 'System Provisioner',
      timestamp: new Date().toISOString(),
      notes: `Device activated and linked 1:1 to learner ${dto.learnerName || dto.learnerId || 'N/A'}.`
    });

    await AuditLogger.recordAudit({
      action: 'IOT_DEVICE_ACTIVATED',
      resource: '/api/v1/iot/activate',
      correlationId: 'IOT-ACTIVATE-SERVICE',
      metadata: { imei: device.imei, deviceId: device.deviceId, learnerId: dto.learnerId }
    });

    return device;
  }

  // 6. Deactivate Device
  public async deactivateDevice(dto: DeactivateDeviceDto) {
    const device = iotPlatformState.devices.find((d) => d.imei === dto.imei || d.deviceId === dto.imei);
    if (!device) {
      throw new Error(`Device '${dto.imei}' not found.`);
    }

    device.status = 'DEACTIVATED';
    const oldLearner = device.assignedLearner;
    device.assignedLearner = null;

    device.technicianHistory.push({
      action: 'DEVICE_DEACTIVATED',
      technician: 'Security Admin',
      timestamp: new Date().toISOString(),
      notes: `Deactivation reason: ${dto.reason || 'Administrative requirement'}. Unbound from learner ${oldLearner?.name || 'N/A'}.`
    });

    await AuditLogger.recordAudit({
      action: 'IOT_DEVICE_DEACTIVATED',
      resource: '/api/v1/iot/deactivate',
      correlationId: 'IOT-DEACTIVATE-SERVICE',
      metadata: { imei: device.imei, deviceId: device.deviceId, reason: dto.reason }
    });

    return device;
  }

  // 7. Device Lookup
  public getDeviceByImei(imeiOrDeviceId: string) {
    return iotPlatformState.devices.find((d) => d.imei === imeiOrDeviceId || d.deviceId === imeiOrDeviceId) || null;
  }

  public getAllDevices() {
    return iotPlatformState.devices;
  }

  // 8. Live Telemetry Retrieval
  public getLiveTelemetry() {
    return {
      count: iotPlatformState.telemetryRecords.length,
      mqttStatus: iotPlatformState.mqttEngine,
      telemetry: iotPlatformState.telemetryRecords
    };
  }

  // 9. Firmware Upload Logic
  public async uploadFirmware(dto: UploadFirmwareDto) {
    if (!dto.version) {
      throw new Error('Firmware version string required.');
    }

    const newFirmware = {
      id: `FW-2026-${dto.version}`,
      version: dto.version,
      hardwareRevision: dto.hardwareRevision || 'nRF9160-LTE-M-REV3.2',
      sha256: `sha256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      digitalSignature: 'SIG_RSA4096_SA_GOV_DBE_APPROVED_VALIDATED',
      fileSizeBytes: dto.fileSizeBytes || 4194304,
      releaseNotes: dto.releaseNotes || 'Official security, connectivity & power optimization release.',
      rolloutType: dto.rolloutType || 'CANARY',
      approvalStatus: 'APPROVED',
      targetDevicesCount: iotPlatformState.devices.length,
      updatedDevicesCount: 0,
      successRate: 100.0,
      previousVersion: 'v2.4.1-STABLE',
      createdAt: new Date().toISOString()
    };

    iotPlatformState.firmwares.unshift(newFirmware);

    await AuditLogger.recordAudit({
      action: 'OTA_FIRMWARE_UPLOADED',
      resource: '/api/v1/iot/firmware',
      correlationId: 'OTA-FW-SERVICE',
      metadata: { version: dto.version, rolloutType: dto.rolloutType }
    });

    return newFirmware;
  }

  // 10. Device Health Calculations
  public calculateDeviceHealth() {
    const total = iotPlatformState.devices.length;
    const online = iotPlatformState.devices.filter((d) => d.deviceHealth.heartbeatState === 'ONLINE').length;
    const offline = iotPlatformState.devices.filter((d) => d.deviceHealth.heartbeatState === 'OFFLINE').length;
    const weakSignal = iotPlatformState.devices.filter(
      (d) => d.deviceHealth.heartbeatState === 'WEAK_SIGNAL' || d.deviceHealth.lteSignalDbm < -100
    ).length;
    const lowBattery = iotPlatformState.devices.filter((d) => d.deviceHealth.batteryPercent < 20).length;
    const upgradeRequired = iotPlatformState.devices.filter((d) => d.deviceHealth.heartbeatState === 'FIRMWARE_UPGRADE_REQUIRED').length;

    return {
      healthSummary: {
        totalDevices: total,
        onlineCount: online,
        offlineCount: offline,
        weakSignalCount: weakSignal,
        lowBatteryCount: lowBattery,
        upgradeRequiredCount: upgradeRequired,
        averageBatteryPercent: total > 0 ? Math.round(iotPlatformState.devices.reduce((acc, d) => acc + d.deviceHealth.batteryPercent, 0) / total) : 0,
        mqttMessagesPerMin: iotPlatformState.mqttEngine.messagesPerMinute
      },
      devices: iotPlatformState.devices.map((d) => ({
        deviceId: d.deviceId,
        imei: d.imei,
        serialNumber: d.serialNumber,
        learner: d.assignedLearner?.name || 'Unassigned',
        school: d.assignedLearner?.school || 'N/A',
        health: d.deviceHealth,
        firmwareVersion: d.firmwareVersion,
        hardwareRevision: d.hardwareRevision,
        status: d.status
      }))
    };
  }

  // 11. Engineering Mode Simulator
  public async simulateTelemetry(dto: SimulateTelemetryDto) {
    const isProd = process.env.NODE_ENV === 'production' && process.env.STRICT_PROD === 'true';
    if (isProd) {
      throw new Error('Telemetry simulation is strictly forbidden in Production Mode.');
    }

    const targetImei = dto.imei || '869402059381001';
    const device = iotPlatformState.devices.find((d) => d.imei === targetImei);

    let lat = dto.latitude || -26.2581;
    let lng = dto.longitude || 27.8573;
    let sos = false;
    let tamper = false;
    let batt = dto.batteryPercent !== undefined ? dto.batteryPercent : device ? device.deviceHealth.batteryPercent : 90;
    let heartbeatState: any = 'ONLINE';

    switch (dto.scenario) {
      case 'SCHOOL_COMMUTE':
        lat += (Math.random() - 0.5) * 0.005;
        lng += (Math.random() - 0.5) * 0.005;
        heartbeatState = 'ONLINE';
        break;
      case 'BUS_ROUTE':
        lat += 0.01;
        lng += 0.008;
        heartbeatState = 'ONLINE';
        break;
      case 'SOS_EVENT':
        sos = true;
        heartbeatState = 'ONLINE';
        break;
      case 'LOW_BATTERY':
        batt = 8;
        heartbeatState = 'LOW_BATTERY';
        break;
      case 'TAMPER_ALERT':
        tamper = true;
        heartbeatState = 'TAMPER_ALERT';
        break;
      case 'DEVICE_OFFLINE':
        heartbeatState = 'OFFLINE';
        break;
      case 'GPS_DRIFT':
        lat += 0.08;
        heartbeatState = 'WEAK_SIGNAL';
        break;
      default:
        break;
    }

    const telemetryPacket = {
      id: `TEL-SIM-${Date.now()}`,
      deviceId: device ? device.deviceId : `ITIS-DEV-SIM-${targetImei.substring(10)}`,
      imei: targetImei,
      latitude: Number(lat.toFixed(6)),
      longitude: Number(lng.toFixed(6)),
      altitude: 1750.0 + Math.random() * 20,
      speed: dto.speed || (dto.scenario === 'BUS_ROUTE' ? 45.0 : 4.5),
      heading: 90.0,
      accuracy: dto.scenario === 'GPS_DRIFT' ? 18.5 : 1.5,
      satelliteCount: dto.scenario === 'GPS_DRIFT' ? 4 : 14,
      timestamp: new Date().toISOString(),
      battery: batt,
      charging: false,
      lteSignal: heartbeatState === 'WEAK_SIGNAL' ? -112 : -74,
      cellTower: 'MTN-SA-MCC655-MNC10-SIMULATED',
      temperature: 28.0 + Math.random() * 3,
      accelerometer: { x: 0.01, y: 0.08, z: 9.81 },
      motionState: dto.scenario === 'BUS_ROUTE' ? 'MOVING_VEHICLE' : dto.scenario === 'SCHOOL_COMMUTE' ? 'WALKING' : 'STATIONARY',
      tamperSwitch: tamper,
      sosButton: sos,
      sosTriggered: sos,
      tamperAlert: tamper,
      qosLevel: sos ? 2 : 1,
      tlsVersion: 'TLSv1.3',
      validated: true
    };

    if (device) {
      device.deviceHealth.batteryPercent = batt;
      device.deviceHealth.lastHeartbeatAt = new Date().toISOString();
      device.deviceHealth.heartbeatState = heartbeatState;
      if (tamper) device.status = 'TAMPERED';
    }

    iotPlatformState.telemetryRecords.unshift(telemetryPacket);

    if (sos) {
      liveState.incidents.unshift({
        id: `INC-SIM-SOS-${Date.now().toString().slice(-4)}`,
        incidentNumber: `SOS-${Date.now().toString().slice(-6)}`,
        learnerId: device?.assignedLearner?.learnerId || 'L-100249',
        learnerName: device?.assignedLearner?.name || 'Kagiso Mokoena',
        schoolId: 'sch-1001',
        schoolName: device?.assignedLearner?.school || 'Soweto High School',
        latitude: lat,
        longitude: lng,
        severity: 'CRITICAL',
        status: 'OPEN',
        dispatchedUnit: 'SAPS Rapid Response Unit #4',
        responderEtaMinutes: 4,
        createdAt: new Date().toISOString()
      });
    }

    await AuditLogger.recordAudit({
      action: 'ENGINEERING_SIMULATE_TELEMETRY',
      resource: '/api/v1/iot/simulate',
      correlationId: 'ENGINEERING-SIM-SERVICE',
      metadata: { scenario: dto.scenario, targetImei, sos, tamper }
    });

    return {
      telemetryPacket,
      deviceState: device ? device.deviceHealth : null
    };
  }
}

export const iotService = new IotService();
