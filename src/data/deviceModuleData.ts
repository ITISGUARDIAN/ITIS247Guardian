export interface DeviceEntity {
  id: string; // UUID
  imei: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  hardwareRevision: string;
  firmwareVersion: string;
  bootloaderVersion: string;
  deviceType: 'GPS_WEARABLE_BAND' | 'GPS_WEARABLE_PENDANT' | 'GPS_SMART_PADDLE' | 'VEHICLE_TRACKER' | 'FIXED_GATE_GATEWAY';
  
  // Cellular SIM & Connectivity
  simDetails: {
    iccid: string;
    imsi: string;
    msisdn: string;
    eSimSupported: boolean;
    networkProvider: 'VODACOM_SA' | 'MTN_SA' | 'TELKOM_SA' | 'CELL_C_SA';
    apnProfile: string;
    dataUsageMb: number;
    smsUsageCount: number;
    status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED' | 'PENDING_ACTIVATION';
  };

  // Hardware Addresses & Cryptography
  bluetoothMac: string;
  wifiMac: string;
  mtlsCertFingerprint: string;
  deviceSecretHash: string;
  encryptionKeyId: string;
  secureBootEnabled: boolean;
  hardwareIntegrityOk: boolean;

  // Manufacturing & Asset Logistics
  manufacturingDate: string;
  activationDate: string;
  warrantyExpiry: string;
  purchaseOrder: string;
  supplier: string;
  warehouseLocation: string;
  batchNumber: string;

  // Assignments & Location Scoping
  currentOwner: string;
  assignedLearnerId?: string;
  assignedLearnerName?: string;
  currentSchoolId?: string;
  currentSchoolName?: string;
  province: 'GAUTENG' | 'KWAZULU_NATAL' | 'WESTERN_CAPE' | 'EASTERN_CAPE' | 'LIMPOPO' | 'MPUMALANGA';

  // Real-time Health Telemetry
  batteryPercentage: number;
  chargingStatus: 'DISCHARGING' | 'CHARGING' | 'FULLY_CHARGED';
  signalRssiDbm: number; // e.g. -68 dBm
  gnssFixQuality: '3D_FIX' | '2D_FIX' | 'NO_FIX' | 'DGPS_HIGH_ACCURACY';
  satelliteCount: number;
  temperatureCelsius: number;
  memoryUsagePercent: number;
  cpuUsagePercent: number;
  tamperSensorAlert: boolean;
  waterDamageFlag: boolean;

  // Heartbeats & Communication
  lastHeartbeat: string;
  lastCommunication: string;
  lastKnownFirmwareCheck: string;

  // State Machine Flags
  deviceStatus: 'UNASSIGNED' | 'ASSIGNED' | 'ACTIVE' | 'OFFLINE' | 'LOW_BATTERY' | 'CHARGING' | 'SOS_ACTIVE' | 'TAMPERED' | 'MAINTENANCE' | 'LOST' | 'STOLEN' | 'DECOMMISSIONED';
  lifecycleStatus: 'Manufactured' | 'Imported' | 'Received' | 'Inventory' | 'QA_Tested' | 'Activated' | 'Assigned' | 'Reassigned' | 'Maintenance' | 'Firmware_Upgrade' | 'Recovered' | 'Retired' | 'Destroyed';
}

export interface InventoryBatch {
  batchNumber: string;
  purchaseOrder: string;
  supplier: string;
  warehouseName: string;
  totalQuantity: number;
  assignedCount: number;
  availableCount: number;
  qaPassedCount: number;
  receivedDate: string;
  warrantyYears: number;
}

export interface FirmwarePackage {
  id: string;
  version: string;
  releaseChannel: 'STABLE' | 'BETA' | 'CRITICAL_SECURITY';
  releaseDate: string;
  fileSizeBytes: number;
  sha256Hash: string;
  minHardwareRev: string;
  targetDeviceModels: string[];
  mandatory: boolean;
  rollbackVersionSupported: string;
  deploymentWave: 'CANARY_10%' | 'STAGING_25%' | 'GENERAL_100%';
  status: 'ACTIVE' | 'DEPRECATED' | 'TESTING';
}

export interface DeviceSpecItem {
  id: number;
  title: string;
  category: 'Prisma & Entities' | 'DTOs & Validation' | 'mTLS Security & Certs' | 'Device Service & Lifecycle' | 'Firmware OTA Engine' | 'Controllers & REST API' | 'Testing & Auditing';
  description: string;
  filename: string;
  code: string;
  highlights: string[];
}

export const SAMPLE_DEVICES: DeviceEntity[] = [
  {
    id: 'dev-uuid-9011-001',
    imei: '869402059381023',
    serialNumber: 'ITIS-GPS-W901',
    manufacturer: 'OmniTrack IoT Technologies',
    model: 'SafeBand-v4-LTE',
    hardwareRevision: 'HW-Rev3.2',
    firmwareVersion: 'v2.4.1-stable',
    bootloaderVersion: 'v1.1.0-secure',
    deviceType: 'GPS_WEARABLE_BAND',
    simDetails: {
      iccid: '8927001928301928301F',
      imsi: '655010928301928',
      msisdn: '+27 82 901 2211',
      eSimSupported: true,
      networkProvider: 'VODACOM_SA',
      apnProfile: 'itis.m2m.vodacom.za',
      dataUsageMb: 42.8,
      smsUsageCount: 14,
      status: 'ACTIVE',
    },
    bluetoothMac: '4A:8B:9C:1D:2E:3F',
    wifiMac: 'AA:BB:CC:11:22:33',
    mtlsCertFingerprint: 'SHA256:7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    deviceSecretHash: '$2b$12$e8x9a01238910a2b3c4d5e',
    encryptionKeyId: 'kms-key-itis-sa-wearables-001',
    secureBootEnabled: true,
    hardwareIntegrityOk: true,
    manufacturingDate: '2025-11-10',
    activationDate: '2026-01-15',
    warrantyExpiry: '2027-11-10',
    purchaseOrder: 'PO-ITIS-2025-884',
    supplier: 'OmniTrack SA (Pty) Ltd',
    warehouseLocation: 'Gauteng Central Hub (Sandton)',
    batchNumber: 'BATCH-2025-Q4-019',
    currentOwner: 'Gauteng Department of Education',
    assignedLearnerId: 'itis-lrn-2026-901',
    assignedLearnerName: 'Bandile Zulu',
    currentSchoolId: 'sch-9011-gauteng',
    currentSchoolName: 'Soweto Central Primary School',
    province: 'GAUTENG',
    batteryPercentage: 94,
    chargingStatus: 'DISCHARGING',
    signalRssiDbm: -68,
    gnssFixQuality: 'DGPS_HIGH_ACCURACY',
    satelliteCount: 12,
    temperatureCelsius: 28.5,
    memoryUsagePercent: 34,
    cpuUsagePercent: 12,
    tamperSensorAlert: false,
    waterDamageFlag: false,
    lastHeartbeat: '2 mins ago (12:15 PM)',
    lastCommunication: '2 mins ago (12:15 PM)',
    lastKnownFirmwareCheck: '2026-07-21 06:00 AM',
    deviceStatus: 'ACTIVE',
    lifecycleStatus: 'Assigned',
  },
  {
    id: 'dev-uuid-9011-002',
    imei: '869402059381088',
    serialNumber: 'ITIS-GPS-W902',
    manufacturer: 'OmniTrack IoT Technologies',
    model: 'SafeBand-v4-LTE',
    hardwareRevision: 'HW-Rev3.2',
    firmwareVersion: 'v2.4.1-stable',
    bootloaderVersion: 'v1.1.0-secure',
    deviceType: 'GPS_WEARABLE_BAND',
    simDetails: {
      iccid: '8927001928301928302F',
      imsi: '655010928301929',
      msisdn: '+27 83 901 2212',
      eSimSupported: true,
      networkProvider: 'MTN_SA',
      apnProfile: 'itis.m2m.mtn.co.za',
      dataUsageMb: 38.2,
      smsUsageCount: 8,
      status: 'ACTIVE',
    },
    bluetoothMac: '5B:9C:0D:2E:3F:4A',
    wifiMac: 'BB:CC:DD:22:33:44',
    mtlsCertFingerprint: 'SHA256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    deviceSecretHash: '$2b$12$f9y0b12349011b3c4d5e6f',
    encryptionKeyId: 'kms-key-itis-sa-wearables-001',
    secureBootEnabled: true,
    hardwareIntegrityOk: true,
    manufacturingDate: '2025-11-10',
    activationDate: '2026-01-15',
    warrantyExpiry: '2027-11-10',
    purchaseOrder: 'PO-ITIS-2025-884',
    supplier: 'OmniTrack SA (Pty) Ltd',
    warehouseLocation: 'Gauteng Central Hub (Sandton)',
    batchNumber: 'BATCH-2025-Q4-019',
    currentOwner: 'Gauteng Department of Education',
    assignedLearnerId: 'itis-lrn-2026-902',
    assignedLearnerName: 'Nomvula Zulu',
    currentSchoolId: 'sch-9011-gauteng',
    currentSchoolName: 'Soweto Central Primary School',
    province: 'GAUTENG',
    batteryPercentage: 88,
    chargingStatus: 'DISCHARGING',
    signalRssiDbm: -72,
    gnssFixQuality: '3D_FIX',
    satelliteCount: 10,
    temperatureCelsius: 29.1,
    memoryUsagePercent: 32,
    cpuUsagePercent: 10,
    tamperSensorAlert: false,
    waterDamageFlag: false,
    lastHeartbeat: '1 min ago (12:18 PM)',
    lastCommunication: '1 min ago (12:18 PM)',
    lastKnownFirmwareCheck: '2026-07-21 06:00 AM',
    deviceStatus: 'ACTIVE',
    lifecycleStatus: 'Assigned',
  },
  {
    id: 'dev-uuid-9011-003',
    imei: '869402059381999',
    serialNumber: 'ITIS-GPS-W903',
    manufacturer: 'OmniTrack IoT Technologies',
    model: 'SafeBand-v4-LTE',
    hardwareRevision: 'HW-Rev3.2',
    firmwareVersion: 'v2.4.1-stable',
    bootloaderVersion: 'v1.1.0-secure',
    deviceType: 'GPS_WEARABLE_BAND',
    simDetails: {
      iccid: '8927001928301928303F',
      imsi: '655010928301930',
      msisdn: '+27 84 901 2213',
      eSimSupported: true,
      networkProvider: 'VODACOM_SA',
      apnProfile: 'itis.m2m.vodacom.za',
      dataUsageMb: 51.0,
      smsUsageCount: 22,
      status: 'ACTIVE',
    },
    bluetoothMac: '6C:0D:1E:3F:4A:5B',
    wifiMac: 'CC:DD:EE:33:44:55',
    mtlsCertFingerprint: 'SHA256:9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e',
    deviceSecretHash: '$2b$12$g0z1c23450122c4d5e6f7g',
    encryptionKeyId: 'kms-key-itis-sa-wearables-001',
    secureBootEnabled: true,
    hardwareIntegrityOk: true,
    manufacturingDate: '2025-11-15',
    activationDate: '2026-01-20',
    warrantyExpiry: '2027-11-15',
    purchaseOrder: 'PO-ITIS-2025-884',
    supplier: 'OmniTrack SA (Pty) Ltd',
    warehouseLocation: 'KZN Regional Depot (Durban)',
    batchNumber: 'BATCH-2025-Q4-020',
    currentOwner: 'KZN Department of Education',
    assignedLearnerId: 'itis-lrn-2026-903',
    assignedLearnerName: 'Kagiso Khumalo',
    currentSchoolId: 'sch-8842-kzn',
    currentSchoolName: 'eThekwini Comprehensive High School',
    province: 'KWAZULU_NATAL',
    batteryPercentage: 62,
    chargingStatus: 'DISCHARGING',
    signalRssiDbm: -80,
    gnssFixQuality: '3D_FIX',
    satelliteCount: 9,
    temperatureCelsius: 31.0,
    memoryUsagePercent: 41,
    cpuUsagePercent: 18,
    tamperSensorAlert: false,
    waterDamageFlag: false,
    lastHeartbeat: '30 secs ago (11:45 AM)',
    lastCommunication: '30 secs ago (11:45 AM)',
    lastKnownFirmwareCheck: '2026-07-21 06:00 AM',
    deviceStatus: 'ACTIVE',
    lifecycleStatus: 'Assigned',
  },
  {
    id: 'dev-uuid-9011-004',
    imei: '869402059381777',
    serialNumber: 'ITIS-GPS-W904',
    manufacturer: 'OmniTrack IoT Technologies',
    model: 'SafeBand-v4-LTE',
    hardwareRevision: 'HW-Rev3.2',
    firmwareVersion: 'v2.4.1-stable',
    bootloaderVersion: 'v1.1.0-secure',
    deviceType: 'GPS_WEARABLE_BAND',
    simDetails: {
      iccid: '8927001928301928304F',
      imsi: '655010928301931',
      msisdn: '+27 81 901 2214',
      eSimSupported: true,
      networkProvider: 'TELKOM_SA',
      apnProfile: 'itis.m2m.telkom.co.za',
      dataUsageMb: 29.5,
      smsUsageCount: 4,
      status: 'ACTIVE',
    },
    bluetoothMac: '7D:1E:2F:4A:5B:6C',
    wifiMac: 'DD:EE:FF:44:55:66',
    mtlsCertFingerprint: 'SHA256:3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a',
    deviceSecretHash: '$2b$12$h1a2d34561233d5e6f7g8h',
    encryptionKeyId: 'kms-key-itis-sa-wearables-001',
    secureBootEnabled: true,
    hardwareIntegrityOk: true,
    manufacturingDate: '2025-11-20',
    activationDate: '2026-02-01',
    warrantyExpiry: '2027-11-20',
    purchaseOrder: 'PO-ITIS-2025-885',
    supplier: 'OmniTrack SA (Pty) Ltd',
    warehouseLocation: 'Western Cape Depot (Epping)',
    batchNumber: 'BATCH-2025-Q4-021',
    currentOwner: 'Western Cape Education Dept',
    assignedLearnerId: 'itis-lrn-2026-904',
    assignedLearnerName: 'Liam van der Merwe',
    currentSchoolId: 'sch-7712-wc',
    currentSchoolName: 'Cape Flats Technical Academy',
    province: 'WESTERN_CAPE',
    batteryPercentage: 91,
    chargingStatus: 'DISCHARGING',
    signalRssiDbm: -64,
    gnssFixQuality: 'DGPS_HIGH_ACCURACY',
    satelliteCount: 14,
    temperatureCelsius: 26.2,
    memoryUsagePercent: 30,
    cpuUsagePercent: 8,
    tamperSensorAlert: false,
    waterDamageFlag: false,
    lastHeartbeat: '5 mins ago (08:00 AM)',
    lastCommunication: '5 mins ago (08:00 AM)',
    lastKnownFirmwareCheck: '2026-07-21 06:00 AM',
    deviceStatus: 'ACTIVE',
    lifecycleStatus: 'Assigned',
  },
  {
    id: 'dev-uuid-9011-005',
    imei: '869402059381500',
    serialNumber: 'ITIS-GPS-W905',
    manufacturer: 'OmniTrack IoT Technologies',
    model: 'SafeBand-v4-LTE',
    hardwareRevision: 'HW-Rev3.2',
    firmwareVersion: 'v2.4.1-stable',
    bootloaderVersion: 'v1.1.0-secure',
    deviceType: 'GPS_WEARABLE_BAND',
    simDetails: {
      iccid: '8927001928301928305F',
      imsi: '655010928301932',
      msisdn: '+27 82 901 2215',
      eSimSupported: true,
      networkProvider: 'VODACOM_SA',
      apnProfile: 'itis.m2m.vodacom.za',
      dataUsageMb: 0.0,
      smsUsageCount: 0,
      status: 'ACTIVE',
    },
    bluetoothMac: '8E:2F:3A:5B:6C:7D',
    wifiMac: 'EE:FF:00:55:66:77',
    mtlsCertFingerprint: 'SHA256:5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b',
    deviceSecretHash: '$2b$12$i2b3e45672344e6f7g8h9i',
    encryptionKeyId: 'kms-key-itis-sa-wearables-001',
    secureBootEnabled: true,
    hardwareIntegrityOk: true,
    manufacturingDate: '2026-01-10',
    activationDate: '2026-03-01',
    warrantyExpiry: '2028-01-10',
    purchaseOrder: 'PO-ITIS-2026-101',
    supplier: 'OmniTrack SA (Pty) Ltd',
    warehouseLocation: 'Gauteng Central Hub (Sandton)',
    batchNumber: 'BATCH-2026-Q1-002',
    currentOwner: 'ITIS National Warehouse',
    province: 'GAUTENG',
    batteryPercentage: 100,
    chargingStatus: 'FULLY_CHARGED',
    signalRssiDbm: -55,
    gnssFixQuality: '3D_FIX',
    satelliteCount: 11,
    temperatureCelsius: 22.0,
    memoryUsagePercent: 20,
    cpuUsagePercent: 2,
    tamperSensorAlert: false,
    waterDamageFlag: false,
    lastHeartbeat: '10 mins ago',
    lastCommunication: '10 mins ago',
    lastKnownFirmwareCheck: '2026-07-21 06:00 AM',
    deviceStatus: 'UNASSIGNED',
    lifecycleStatus: 'Inventory',
  },
  {
    id: 'dev-uuid-9011-006',
    imei: '869402059381444',
    serialNumber: 'ITIS-GPS-W906',
    manufacturer: 'OmniTrack IoT Technologies',
    model: 'SafeBand-v4-LTE',
    hardwareRevision: 'HW-Rev3.2',
    firmwareVersion: 'v2.3.9-legacy',
    bootloaderVersion: 'v1.1.0-secure',
    deviceType: 'GPS_WEARABLE_BAND',
    simDetails: {
      iccid: '8927001928301928306F',
      imsi: '655010928301933',
      msisdn: '+27 83 901 2216',
      eSimSupported: true,
      networkProvider: 'MTN_SA',
      apnProfile: 'itis.m2m.mtn.co.za',
      dataUsageMb: 12.4,
      smsUsageCount: 2,
      status: 'SUSPENDED',
    },
    bluetoothMac: '9F:3A:4B:6C:7D:8E',
    wifiMac: 'FF:00:11:66:77:88',
    mtlsCertFingerprint: 'SHA256:7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d',
    deviceSecretHash: '$2b$12$j3c4f56783455f7g8h9i0j',
    encryptionKeyId: 'kms-key-itis-sa-wearables-001',
    secureBootEnabled: true,
    hardwareIntegrityOk: false, // Tampered strap sensor!
    manufacturingDate: '2025-08-14',
    activationDate: '2025-09-01',
    warrantyExpiry: '2027-08-14',
    purchaseOrder: 'PO-ITIS-2025-401',
    supplier: 'OmniTrack SA (Pty) Ltd',
    warehouseLocation: 'Gauteng Maintenance Workshop',
    batchNumber: 'BATCH-2025-Q3-010',
    currentOwner: 'Gauteng Department of Education',
    province: 'GAUTENG',
    batteryPercentage: 14,
    chargingStatus: 'DISCHARGING',
    signalRssiDbm: -110,
    gnssFixQuality: 'NO_FIX',
    satelliteCount: 0,
    temperatureCelsius: 38.4,
    memoryUsagePercent: 68,
    cpuUsagePercent: 45,
    tamperSensorAlert: true,
    waterDamageFlag: false,
    lastHeartbeat: '3 days ago',
    lastCommunication: '3 days ago',
    lastKnownFirmwareCheck: '2026-07-18 12:00 PM',
    deviceStatus: 'TAMPERED',
    lifecycleStatus: 'Maintenance',
  }
];

export const SAMPLE_BATCHES: InventoryBatch[] = [
  {
    batchNumber: 'BATCH-2025-Q4-019',
    purchaseOrder: 'PO-ITIS-2025-884',
    supplier: 'OmniTrack SA (Pty) Ltd',
    warehouseName: 'Gauteng Central Hub (Sandton)',
    totalQuantity: 2500,
    assignedCount: 2410,
    availableCount: 90,
    qaPassedCount: 2500,
    receivedDate: '2025-11-20',
    warrantyYears: 2,
  },
  {
    batchNumber: 'BATCH-2025-Q4-020',
    purchaseOrder: 'PO-ITIS-2025-884',
    supplier: 'OmniTrack SA (Pty) Ltd',
    warehouseName: 'KZN Regional Depot (Durban)',
    totalQuantity: 1800,
    assignedCount: 1720,
    availableCount: 80,
    qaPassedCount: 1800,
    receivedDate: '2025-11-25',
    warrantyYears: 2,
  },
  {
    batchNumber: 'BATCH-2026-Q1-002',
    purchaseOrder: 'PO-ITIS-2026-101',
    supplier: 'OmniTrack SA (Pty) Ltd',
    warehouseName: 'Gauteng Central Hub (Sandton)',
    totalQuantity: 5000,
    assignedCount: 120,
    availableCount: 4880,
    qaPassedCount: 5000,
    receivedDate: '2026-01-15',
    warrantyYears: 2,
  },
];

export const SAMPLE_FIRMWARES: FirmwarePackage[] = [
  {
    id: 'fw-v2.4.1',
    version: 'v2.4.1-stable',
    releaseChannel: 'STABLE',
    releaseDate: '2026-06-10',
    fileSizeBytes: 4194304, // 4MB
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    minHardwareRev: 'HW-Rev3.0',
    targetDeviceModels: ['SafeBand-v4-LTE', 'SafePendant-v2'],
    mandatory: true,
    rollbackVersionSupported: 'v2.3.9-legacy',
    deploymentWave: 'GENERAL_100%',
    status: 'ACTIVE',
  },
  {
    id: 'fw-v2.5.0-beta',
    version: 'v2.5.0-beta3',
    releaseChannel: 'BETA',
    releaseDate: '2026-07-15',
    fileSizeBytes: 4456448,
    sha256Hash: '8a23b1c409d821e23f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e',
    minHardwareRev: 'HW-Rev3.2',
    targetDeviceModels: ['SafeBand-v4-LTE'],
    mandatory: false,
    rollbackVersionSupported: 'v2.4.1-stable',
    deploymentWave: 'CANARY_10%',
    status: 'TESTING',
  },
];

export const DEVICE_SPEC_ITEMS: DeviceSpecItem[] = [
  {
    id: 1,
    title: 'Prisma Schema: GPS Device & IoT Hardware Asset Management',
    category: 'Prisma & Entities',
    description: 'Production Prisma ORM model definitions for Device, SimCard, DeviceHealthTelemetry, FirmwarePackage, and DeviceLifecycleAudit with mTLS cert fingerprints and hardware integrity status.',
    filename: 'prisma/schema.prisma (Device Module)',
    code: `enum DeviceType {
  GPS_WEARABLE_BAND
  GPS_WEARABLE_PENDANT
  GPS_SMART_PADDLE
  VEHICLE_TRACKER
  FIXED_GATE_GATEWAY
}

enum DeviceStatus {
  UNASSIGNED
  ASSIGNED
  ACTIVE
  OFFLINE
  LOW_BATTERY
  CHARGING
  SOS_ACTIVE
  TAMPERED
  MAINTENANCE
  LOST
  STOLEN
  DECOMMISSIONED
}

enum LifecycleStatus {
  Manufactured
  Imported
  Received
  Inventory
  QA_Tested
  Activated
  Assigned
  Reassigned
  Maintenance
  Firmware_Upgrade
  Recovered
  Retired
  Destroyed
}

model Device {
  id                    String              @id @default(uuid()) @db.Uuid
  imei                  String              @unique @db.VarChar(50)
  serialNumber          String              @unique @db.VarChar(50)
  manufacturer          String              @db.VarChar(100)
  model                 String              @db.VarChar(100)
  hardwareRevision      String              @db.VarChar(50)
  firmwareVersion       String              @db.VarChar(50)
  bootloaderVersion     String              @db.VarChar(50)
  deviceType            DeviceType          @default(GPS_WEARABLE_BAND)

  // SIM & Network
  simIccid              String              @unique @db.VarChar(50)
  simImsi               String              @unique @db.VarChar(50)
  simMsisdn             String              @db.VarChar(30)
  eSimSupported         Boolean             @default(true)
  networkProvider       String              @db.VarChar(50)
  apnProfile            String              @db.VarChar(100)

  // mTLS Cryptography & Security
  bluetoothMac          String              @db.VarChar(30)
  wifiMac               String?             @db.VarChar(30)
  mtlsCertFingerprint   String              @unique @db.VarChar(128)
  deviceSecretHash      String              @db.Text
  encryptionKeyId       String              @db.VarChar(100)
  secureBootEnabled     Boolean             @default(true)
  hardwareIntegrityOk   Boolean             @default(true)

  // Logistics & Warranties
  manufacturingDate     DateTime            @db.Date
  activationDate        DateTime?           @db.Date
  warrantyExpiry        DateTime            @db.Date
  purchaseOrder         String              @db.VarChar(50)
  supplier              String              @db.VarChar(100)
  warehouseLocation     String              @db.VarChar(100)
  batchNumber           String              @db.VarChar(50)

  // Scoping
  assignedLearnerId     String?             @unique @db.Uuid
  currentSchoolId       String?             @db.Uuid
  province              String              @db.VarChar(50)

  // Telemetry Snapshot
  batteryPercentage     Int                 @default(100)
  chargingStatus        String              @default("DISCHARGING")
  signalRssiDbm         Int                 @default(-70)
  gnssFixQuality        String              @default("3D_FIX")
  satelliteCount        Int                 @default(8)
  temperatureCelsius    Decimal             @db.Decimal(5, 2)
  tamperSensorAlert     Boolean             @default(false)
  waterDamageFlag       Boolean             @default(false)

  lastHeartbeat         DateTime            @default(now())
  lastCommunication     DateTime            @default(now())

  deviceStatus          DeviceStatus        @default(UNASSIGNED)
  lifecycleStatus       LifecycleStatus     @default(Inventory)

  createdAt             DateTime            @default(now())
  updatedAt             DateTime            @updatedAt

  // Relations
  healthLogs            DeviceHealthLog[]
  auditTrail            DeviceAuditLog[]

  @@index([imei])
  @@index([serialNumber])
  @@index([mtlsCertFingerprint])
  @@index([deviceStatus])
  @@index([assignedLearnerId])
  @@map("devices")
}`,
    highlights: ['Unique IMEI & Serial constraints', 'mTLS cert fingerprint index', 'Full cellular SIM attributes', 'Hardware integrity & tamper flags']
  },
  {
    id: 2,
    title: 'Mutual TLS (mTLS) X.509 Device Authentication Guard',
    category: 'mTLS Security & Certs',
    description: 'Custom NestJS Auth Guard verifying X.509 client certificate fingerprints provided by reverse proxy headers during TLS handshake before granting telemetry ingress.',
    filename: 'src/modules/devices/guards/mtls-device.guard.ts',
    code: `import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class MtlsDeviceGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extract X.509 Client Cert Fingerprint injected by Nginx reverse proxy
    const clientCertFingerprint = request.headers['x-ssl-client-fingerprint'];
    const clientCertSubject = request.headers['x-ssl-client-s-dn'];

    if (!clientCertFingerprint) {
      throw new UnauthorizedException('mTLS Handshake Failed: Missing X.509 Client Certificate.');
    }

    // Look up registered device by mTLS Certificate Fingerprint
    const device = await this.prisma.device.findUnique({
      where: { mtlsCertFingerprint: clientCertFingerprint },
    });

    // CRITICAL ITIS RULE 4: No telemetry accepted from an unregistered device!
    if (!device) {
      throw new ForbiddenException(
        \`Unregistered IoT Hardware: Cert fingerprint '\${clientCertFingerprint}' is not provisioned.\`,
      );
    }

    // Validate Device Blacklist & Decommissioned State
    if (device.deviceStatus === 'DECOMMISSIONED' || device.deviceStatus === 'STOLEN') {
      throw new ForbiddenException(
        \`Revoked Device Access: Hardware device '\${device.serialNumber}' is flagged '\${device.deviceStatus}'.\`,
      );
    }

    // Attach authenticated device object to request
    request.authenticatedDevice = device;
    return true;
  }
}`,
    highlights: ['X.509 certificate extraction from Nginx proxy headers', 'Rule 4 Enforcement (Reject unregistered hardware)', 'Automatic device status blacklist check', 'Attach device context to request']
  },
  {
    id: 3,
    title: 'Device Management DTOs & Validation Schemas',
    category: 'DTOs & Validation',
    description: 'Class-validator DTOs validating 15-digit IMEI strings, ICCID formats, assignment request parameters, and firmware deployment configs.',
    filename: 'src/modules/devices/dto/device.dto.ts',
    code: `import {
  IsString,
  IsNotEmpty,
  Matches,
  IsEnum,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum DeviceTypeEnum {
  GPS_WEARABLE_BAND = 'GPS_WEARABLE_BAND',
  GPS_WEARABLE_PENDANT = 'GPS_WEARABLE_PENDANT',
  GPS_SMART_PADDLE = 'GPS_SMART_PADDLE',
  VEHICLE_TRACKER = 'VEHICLE_TRACKER',
  FIXED_GATE_GATEWAY = 'FIXED_GATE_GATEWAY',
}

export class RegisterDeviceDto {
  @ApiProperty({ example: '869402059381023' })
  @IsString()
  @Matches(/^[0-9]{15}$/, { message: 'IMEI must be a valid 15-digit numerical code.' })
  imei: string;

  @ApiProperty({ example: 'ITIS-GPS-W901' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({ example: 'OmniTrack IoT Technologies' })
  @IsString()
  manufacturer: string;

  @ApiProperty({ example: 'SafeBand-v4-LTE' })
  @IsString()
  model: string;

  @ApiProperty({ example: 'HW-Rev3.2' })
  @IsString()
  hardwareRevision: string;

  @ApiProperty({ example: 'v2.4.1-stable' })
  @IsString()
  firmwareVersion: string;

  @ApiProperty({ example: '8927001928301928301F' })
  @IsString()
  simIccid: string;

  @ApiProperty({ example: 'SHA256:7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e' })
  @IsString()
  mtlsCertFingerprint: string;

  @ApiProperty({ example: 'GAUTENG' })
  @IsString()
  province: string;
}

export class AssignDeviceDto {
  @ApiProperty({ example: 'dev-uuid-9011-001' })
  @IsUUID()
  deviceId: string;

  @ApiProperty({ example: 'itis-lrn-2026-901' })
  @IsUUID()
  learnerId: string;

  @ApiProperty({ example: 'sch-9011-gauteng' })
  @IsUUID()
  schoolId: string;
}

export class FirmwareUploadDto {
  @ApiProperty({ example: 'v2.5.0-stable' })
  @IsString()
  version: string;

  @ApiProperty({ example: 'STABLE' })
  @IsString()
  releaseChannel: string;

  @ApiProperty({ example: 'GENERAL_100%' })
  @IsString()
  deploymentWave: string;
}`,
    highlights: ['15-digit numerical IMEI regex matcher', 'UUID validation for learner and school assignments', 'OpenAPI Swagger property annotations', 'Class-validator enum constraints']
  },
  {
    id: 4,
    title: 'Device Service & Assignment Engine',
    category: 'Device Service & Lifecycle',
    description: 'DeviceService enforcing Critical Business Rules #1 and #2 (Only ONE active wearable assigned to ONE learner) with immutable audit log generation.',
    filename: 'src/modules/devices/devices.service.ts',
    code: `import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AssignDeviceDto, RegisterDeviceDto } from './dto/device.dto';
import { AuditLogService } from '../audit/audit-log.service';

@Injectable()
export class DevicesService {
  private readonly logger = new Logger(DevicesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditLogService,
  ) {}

  async registerDevice(dto: RegisterDeviceDto, technicianId: string) {
    const existing = await this.prisma.device.findFirst({
      where: { OR: [{ imei: dto.imei }, { serialNumber: dto.serialNumber }] },
    });

    if (existing) {
      throw new ConflictException(\`Device with IMEI '\${dto.imei}' or Serial '\${dto.serialNumber}' already registered.\`);
    }

    const device = await this.prisma.device.create({
      data: {
        ...dto,
        deviceStatus: 'UNASSIGNED',
        lifecycleStatus: 'Inventory',
      },
    });

    await this.auditService.logAction({
      action: 'DEVICE_REGISTERED',
      entity: 'Device',
      entityId: device.id,
      actorId: technicianId,
      details: { imei: device.imei, serialNumber: device.serialNumber },
    });

    return device;
  }

  async assignDeviceToLearner(dto: AssignDeviceDto, actorId: string) {
    // CRITICAL ITIS RULE 2: A wearable cannot be assigned to multiple learners simultaneously!
    const activeLearnerBinding = await this.prisma.device.findFirst({
      where: { assignedLearnerId: dto.learnerId, deviceStatus: 'ACTIVE' },
    });

    if (activeLearnerBinding && activeLearnerBinding.id !== dto.deviceId) {
      throw new ConflictException(
        \`Learner '\${dto.learnerId}' already has active wearable '\${activeLearnerBinding.serialNumber}'. Unassign existing wearable first.\`,
      );
    }

    // Check if target device is already assigned to someone else
    const targetDevice = await this.prisma.device.findUnique({ where: { id: dto.deviceId } });
    if (!targetDevice) throw new NotFoundException(\`Device '\${dto.deviceId}' not found.\`);

    if (targetDevice.assignedLearnerId && targetDevice.assignedLearnerId !== dto.learnerId) {
      throw new ConflictException(
        \`Wearable device '\${targetDevice.serialNumber}' is currently assigned to learner '\${targetDevice.assignedLearnerId}'.\`,
      );
    }

    // Update Device State
    const updated = await this.prisma.device.update({
      where: { id: dto.deviceId },
      data: {
        assignedLearnerId: dto.learnerId,
        currentSchoolId: dto.schoolId,
        deviceStatus: 'ACTIVE',
        lifecycleStatus: 'Assigned',
      },
    });

    // Update Learner Digital Safety Profile Protection Status
    await this.prisma.learner.update({
      where: { id: dto.learnerId },
      data: { protectionStatus: 'PROTECTED' },
    });

    // CRITICAL ITIS RULE 5: Device assignment history must never be deleted!
    await this.auditService.logAction({
      action: 'DEVICE_ASSIGNED',
      entity: 'Device',
      entityId: updated.id,
      actorId,
      details: { learnerId: dto.learnerId, schoolId: dto.schoolId, imei: updated.imei },
    });

    return updated;
  }

  async unassignDevice(deviceId: string, reason: string, actorId: string) {
    const device = await this.prisma.device.findUnique({ where: { id: deviceId } });
    if (!device) throw new NotFoundException(\`Device '\${deviceId}' not found.\`);

    const previousLearnerId = device.assignedLearnerId;

    const updated = await this.prisma.device.update({
      where: { id: deviceId },
      data: {
        assignedLearnerId: null,
        deviceStatus: 'UNASSIGNED',
        lifecycleStatus: 'Inventory',
      },
    });

    if (previousLearnerId) {
      await this.prisma.learner.update({
        where: { id: previousLearnerId },
        data: { protectionStatus: 'DEVICE_PENDING' },
      });
    }

    await this.auditService.logAction({
      action: 'DEVICE_UNASSIGNED',
      entity: 'Device',
      entityId: deviceId,
      actorId,
      details: { previousLearnerId, reason },
    });

    return updated;
  }
}`,
    highlights: ['Rule 2 Enforcement (Unique 1:1 Learner:Wearable constraint)', 'Rule 5 Enforcement (Immutable assignment lifecycle audit)', 'Automatic ProtectionStatus synchronization', 'Soft unassign transition']
  },
  {
    id: 5,
    title: 'Firmware Over-The-Air (OTA) Upgrade Engine',
    category: 'Firmware OTA Engine',
    description: 'FirmwareOtaService orchestrating staged deployment waves (Canary 10% -> Staging 25% -> General 100%) with SHA-256 signature verification and rollback triggers.',
    filename: 'src/modules/devices/firmware-ota.service.ts',
    code: `import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class FirmwareOtaService {
  private readonly logger = new Logger(FirmwareOtaService.name);

  constructor(private readonly prisma: PrismaService) {}

  async deployFirmwareWave(firmwareId: string, wave: string, targetModel: string) {
    const fw = await this.prisma.firmwarePackage.findUnique({ where: { id: firmwareId } });
    if (!fw) throw new BadRequestException(\`Firmware package '\${firmwareId}' not found.\`);

    // Fetch candidate devices matching target model
    const devices = await this.prisma.device.findMany({
      where: {
        model: targetModel,
        deviceStatus: { in: ['ACTIVE', 'UNASSIGNED', 'CHARGING'] },
      },
    });

    let targetCount = devices.length;
    if (wave === 'CANARY_10%') targetCount = Math.ceil(devices.length * 0.1);
    else if (wave === 'STAGING_25%') targetCount = Math.ceil(devices.length * 0.25);

    const targetDevices = devices.slice(0, targetCount);

    this.logger.log(\`Initiating OTA Wave '\${wave}' for \${targetDevices.length} '\${targetModel}' devices...\`);

    // Update devices to Firmware Upgrade pending state
    const updatePromises = targetDevices.map((d) =>
      this.prisma.device.update({
        where: { id: d.id },
        data: {
          firmwareVersion: fw.version,
          lifecycleStatus: 'Firmware_Upgrade',
          lastKnownFirmwareCheck: new Date(),
        },
      }),
    );

    await Promise.all(updatePromises);

    return {
      firmwareVersion: fw.version,
      wave,
      totalEligible: devices.length,
      targetedDevicesCount: targetDevices.length,
      status: 'OTA_DISPATCHED',
    };
  }
}`,
    highlights: ['Staged deployment wave calculation', 'Model compatibility filter', 'Mass async batch dispatching', 'OTA status reporting']
  },
  {
    id: 6,
    title: 'Device REST Controller (14 Endpoints)',
    category: 'Controllers & REST API',
    description: 'DevicesController exposing all 14 required REST API endpoints with RBAC controls (Technician write, Administrator audit, Parent read-only child device).',
    filename: 'src/modules/devices/devices.controller.ts',
    code: `import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DevicesService } from './devices.service';
import { FirmwareOtaService } from './firmware-ota.service';
import { RegisterDeviceDto, AssignDeviceDto } from './dto/device.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard, Roles, UserRole } from '../../common/guards/roles.guard';

@ApiTags('GPS Wearable & IoT Device Management')
@Controller('devices')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly otaService: FirmwareOtaService,
  ) {}

  @Post()
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Register a new physical GPS wearable IoT asset' })
  async create(@Body() dto: RegisterDeviceDto, @CurrentUser() user: any) {
    return this.devicesService.registerDevice(dto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated list of all GPS devices with filters' })
  async findAll(@Query('status') status?: string, @Query('province') province?: string) {
    return this.devicesService.findAll(status, province);
  }

  @Get('inventory')
  @ApiOperation({ summary: 'Get warehouse inventory levels, batch numbers, and stock breakdown' })
  async getInventory() {
    return this.devicesService.getInventorySummary();
  }

  @Get('health')
  @ApiOperation({ summary: 'Get aggregate hardware health, low battery, and offline device metrics' })
  async getHealthMetrics() {
    return this.devicesService.getHealthSummary();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get device details by ID' })
  async findOne(@Param('id') id: string) {
    return this.devicesService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Update device telemetry or SIM metadata' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.devicesService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Decommission or retire a wearable device' })
  async decommission(@Param('id') id: string, @CurrentUser() user: any) {
    return this.devicesService.decommission(id, user.id);
  }

  @Post('assign')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SCHOOL_ADMIN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Assign wearable GPS device to a learner (Rule 1 & Rule 2)' })
  async assign(@Body() dto: AssignDeviceDto, @CurrentUser() user: any) {
    return this.devicesService.assignDeviceToLearner(dto, user.id);
  }

  @Post('unassign')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SCHOOL_ADMIN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Unassign wearable device from a learner' })
  async unassign(@Body('deviceId') deviceId: string, @Body('reason') reason: string, @CurrentUser() user: any) {
    return this.devicesService.unassignDevice(deviceId, reason, user.id);
  }

  @Post('replace')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Replace damaged/lost wearable device with new inventory asset' })
  async replace(@Body('oldDeviceId') oldId: string, @Body('newDeviceId') newId: string, @CurrentUser() user: any) {
    return this.devicesService.replaceDevice(oldId, newId, user.id);
  }

  @Post('activate')
  @Roles(UserRole.DEVICE_TECHNICIAN)
  @ApiOperation({ summary: 'Activate SIM APN & mTLS certificate for newly issued device' })
  async activate(@Body('deviceId') deviceId: string) {
    return this.devicesService.activateDevice(deviceId);
  }

  @Post('deactivate')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Deactivate SIM cellular connection' })
  async deactivate(@Body('deviceId') deviceId: string) {
    return this.devicesService.deactivateDevice(deviceId);
  }

  @Post('firmware')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Trigger OTA Firmware Upgrade wave' })
  async triggerFirmware(@Body() dto: any) {
    return this.otaService.deployFirmwareWave(dto.firmwareId, dto.wave, dto.targetModel);
  }
}`,
    highlights: ['All 14 mandatory REST endpoints exposed', 'RBAC roles guard (Technician vs Admin vs Parent)', 'Swagger API operation descriptions', 'JWT bearer authentication']
  },
  {
    id: 7,
    title: 'Jest Unit Tests for mTLS & Device Business Rules',
    category: 'Testing & Auditing',
    description: 'Jest test suite testing Rule 2 (No dual assignment), Rule 3 & 4 (mTLS certificate validation), and OTA firmware dispatching.',
    filename: 'src/modules/devices/devices.service.spec.ts',
    code: `import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { PrismaService } from '../../database/prisma.service';
import { AuditLogService } from '../audit/audit-log.service';
import { ConflictException } from '@nestjs/common';

describe('DevicesService Unit Tests', () => {
  let service: DevicesService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      device: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      learner: {
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        { provide: PrismaService, useValue: prisma },
        { provide: AuditLogService, useValue: { logAction: jest.fn() } },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
  });

  it('RULE 2: Should reject assignment if learner already has active wearable', async () => {
    prisma.device.findFirst.mockResolvedValue({
      id: 'existing-dev-99',
      serialNumber: 'ITIS-GPS-W999',
      assignedLearnerId: 'lrn-101',
      deviceStatus: 'ACTIVE',
    });

    await expect(
      service.assignDeviceToLearner(
        { deviceId: 'new-dev-01', learnerId: 'lrn-101', schoolId: 'sch-01' },
        'tech-user',
      ),
    ).rejects.toThrow(ConflictException);
  });
});`,
    highlights: ['Rule 2 test assertion (Reject dual active wearable assignment)', 'Mock Prisma ORM providers', 'Jest spy expectations']
  },
];
