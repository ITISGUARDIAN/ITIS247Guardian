export interface DeviceRecord {
  id: string;
  serialNumber: string;
  qrCodePayload: string;
  deviceType: 'wearable_band' | 'ble_gateway' | 'fleet_tracker' | 'nfc_provisioner' | 'command_terminal';
  modelName: string;
  imei?: string;
  bleMac: string;
  nfcUid?: string;
  batchNumber: string;
  supplier: string;
  hardwareRev: string;
  firmwareVersion: string;
  warrantyExpiry: string;
  status: 'in_stock' | 'provisioned' | 'active' | 'under_repair' | 'faulty' | 'lost_stolen' | 'retired';
  assignedSchoolId?: string;
  assignedSchoolName?: string;
  assignedLearnerId?: string;
  assignedLearnerName?: string;
  technicianId?: string;
  technicianName?: string;
  health: {
    batteryPct: number;
    gpsStatus: '3D_FIX' | '2D_FIX' | 'SEARCHING' | 'NO_SIGNAL';
    gpsSatellites: number;
    bleRssiDbm: number;
    lteSignalDbm: number;
    motionSensorStatus: 'NORMAL' | 'IMPACT_DETECTED' | 'FALL_SUSPECTED' | 'STATIONARY';
    sosButtonState: 'IDLE' | 'TRIGGERED' | 'TEST_MODE';
    tamperDetected: boolean;
    lastPingTimestamp: string;
  };
  maintenanceHistory: {
    id: string;
    date: string;
    action: string;
    technician: string;
    notes: string;
  }[];
}

export interface ManufacturingBatch {
  batchNumber: string;
  supplier: string;
  manufactureDate: string;
  totalUnits: number;
  passedQaUnits: number;
  failedQaUnits: number;
  hardwareRev: string;
  icasaApprovalCode: string;
  ceFccStatus: string;
}

export interface FirmwarePackage {
  id: string;
  version: string;
  releaseDate: string;
  targetDeviceType: 'wearable_band' | 'ble_gateway' | 'fleet_tracker' | 'nfc_provisioner' | 'command_terminal';
  fileSizeBytes: number;
  digitalSignatureSha256: string;
  isCanaryActive: boolean;
  canaryPct: number;
  deploymentStatus: 'DRAFT' | 'CANARY' | 'GENERAL_AVAILABILITY' | 'DEPRECATED' | 'ROLLED_BACK';
  releaseNotes: string;
}

export interface RealWorldCertificationRequirement {
  id: string;
  category: 'manufacturing' | 'tooling' | 'pcba' | 'compliance' | 'telecom' | 'factory_security';
  title: string;
  specification: string;
  softwareStatus: 'COMPLETE' | 'SIMULATED_READY';
  hardwareStatus: 'PENDING_PARTNER' | 'IN_TOOLING' | 'PROTOTYPE_PASSED' | 'LAB_CERTIFIED' | 'PRODUCTION_APPROVED';
  details: string;
  responsibleEntity: string;
}

export const initialManufacturingBatches: ManufacturingBatch[] = [
  {
    batchNumber: 'BATCH-2026-Q1-CPT',
    supplier: 'Tshwane Precision Electronics & IoT',
    manufactureDate: '2026-02-15',
    totalUnits: 5000,
    passedQaUnits: 4982,
    failedQaUnits: 18,
    hardwareRev: 'REV-3.2b',
    icasaApprovalCode: 'ICASA-TA-2025/8912',
    ceFccStatus: 'CE RED & FCC Part 15 Certified'
  },
  {
    batchNumber: 'BATCH-2026-Q2-JHB',
    supplier: 'Defy Defence Systems & Microelectronics',
    manufactureDate: '2026-04-10',
    totalUnits: 10000,
    passedQaUnits: 9965,
    failedQaUnits: 35,
    hardwareRev: 'REV-3.3a',
    icasaApprovalCode: 'ICASA-TA-2026/0142',
    ceFccStatus: 'CE RED Compliant'
  },
  {
    batchNumber: 'BATCH-2026-GW-DBN',
    supplier: 'KZN Gateway Systems Assembly',
    manufactureDate: '2026-05-01',
    totalUnits: 1200,
    passedQaUnits: 1195,
    failedQaUnits: 5,
    hardwareRev: 'GW-REV-2.1',
    icasaApprovalCode: 'ICASA-TA-2025/7001',
    ceFccStatus: 'FCC Class B Approved'
  }
];

export const initialFirmwarePackages: FirmwarePackage[] = [
  {
    id: 'FW-WB-321',
    version: 'v3.2.1-STABLE',
    releaseDate: '2026-06-01',
    targetDeviceType: 'wearable_band',
    fileSizeBytes: 485200,
    digitalSignatureSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    isCanaryActive: false,
    canaryPct: 100,
    deploymentStatus: 'GENERAL_AVAILABILITY',
    releaseNotes: 'Optimized accelerometer fall-detection threshold; ultra-low power BLE 5.2 sleep cycle tuning; added ECC-P256 hardware handshake.'
  },
  {
    id: 'FW-WB-330',
    version: 'v3.3.0-RC2',
    releaseDate: '2026-07-20',
    targetDeviceType: 'wearable_band',
    fileSizeBytes: 512400,
    digitalSignatureSha256: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    isCanaryActive: true,
    canaryPct: 15,
    deploymentStatus: 'CANARY',
    releaseNotes: 'Canary build introducing enhanced multi-path GNSS satellite tracking and dual-carrier SIM profile switching.'
  },
  {
    id: 'FW-GW-210',
    version: 'v2.1.0-GATEWAY',
    releaseDate: '2026-05-15',
    targetDeviceType: 'ble_gateway',
    fileSizeBytes: 2450000,
    digitalSignatureSha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    isCanaryActive: false,
    canaryPct: 100,
    deploymentStatus: 'GENERAL_AVAILABILITY',
    releaseNotes: 'High-density BLE beacon parsing engine supporting 120 concurrent learner wristbands per classroom gateway.'
  },
  {
    id: 'FW-TRK-500',
    version: 'v5.0.2-FLEET',
    releaseDate: '2026-05-28',
    targetDeviceType: 'fleet_tracker',
    fileSizeBytes: 1890000,
    digitalSignatureSha256: '9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e',
    isCanaryActive: false,
    canaryPct: 100,
    deploymentStatus: 'GENERAL_AVAILABILITY',
    releaseNotes: 'OBD-II telemetry polling acceleration and automatic SAPS C3 dispatch beacon triggers upon sudden deceleration.'
  }
];

export const initialDeviceInventory: DeviceRecord[] = [
  {
    id: 'DEV-8842',
    serialNumber: 'ITIS-2026-WB8842',
    qrCodePayload: 'ITIS_PROV_PAYLOAD::DEV-8842::BATCH-2026-Q1-CPT::KEY_HASH_9912',
    deviceType: 'wearable_band',
    modelName: 'ITIS Learner Safety Band V3',
    imei: '864920048123456',
    bleMac: 'AA:BB:CC:88:42:01',
    nfcUid: '04:A2:3F:89:12:90',
    batchNumber: 'BATCH-2026-Q1-CPT',
    supplier: 'Tshwane Precision Electronics & IoT',
    hardwareRev: 'REV-3.2b',
    firmwareVersion: 'v3.2.1-STABLE',
    warrantyExpiry: '2028-02-15',
    status: 'active',
    assignedSchoolId: 'SCH-GP-001',
    assignedSchoolName: 'Soweto STEM Academy',
    assignedLearnerId: 'LNR-2026-001',
    assignedLearnerName: 'Thabo Mokoena',
    technicianId: 'TECH-042',
    technicianName: 'Sipho Zulu (Cert. #402)',
    health: {
      batteryPct: 92,
      gpsStatus: '3D_FIX',
      gpsSatellites: 12,
      bleRssiDbm: -58,
      lteSignalDbm: -72,
      motionSensorStatus: 'NORMAL',
      sosButtonState: 'IDLE',
      tamperDetected: false,
      lastPingTimestamp: '2026-07-26T16:12:00Z'
    },
    maintenanceHistory: [
      { id: 'MNT-001', date: '2026-02-20', action: 'Initial Factory QA & Certification', technician: 'QA Lab Tshwane', notes: 'Passed 1.5m drop test and IP68 water immersion test.' },
      { id: 'MNT-002', date: '2026-03-01', action: 'Provisioned & Assigned', technician: 'Sipho Zulu', notes: 'Pairing complete with Learner LNR-2026-001.' }
    ]
  },
  {
    id: 'DEV-8843',
    serialNumber: 'ITIS-2026-WB8843',
    qrCodePayload: 'ITIS_PROV_PAYLOAD::DEV-8843::BATCH-2026-Q1-CPT::KEY_HASH_9913',
    deviceType: 'wearable_band',
    modelName: 'ITIS Learner Safety Band V3',
    imei: '864920048123457',
    bleMac: 'AA:BB:CC:88:43:02',
    nfcUid: '04:A2:3F:89:12:91',
    batchNumber: 'BATCH-2026-Q1-CPT',
    supplier: 'Tshwane Precision Electronics & IoT',
    hardwareRev: 'REV-3.2b',
    firmwareVersion: 'v3.2.1-STABLE',
    warrantyExpiry: '2028-02-15',
    status: 'active',
    assignedSchoolId: 'SCH-GP-001',
    assignedSchoolName: 'Soweto STEM Academy',
    assignedLearnerId: 'LNR-2026-002',
    assignedLearnerName: 'Lesedi Dlamini',
    technicianId: 'TECH-042',
    technicianName: 'Sipho Zulu (Cert. #402)',
    health: {
      batteryPct: 88,
      gpsStatus: '3D_FIX',
      gpsSatellites: 11,
      bleRssiDbm: -62,
      lteSignalDbm: -76,
      motionSensorStatus: 'NORMAL',
      sosButtonState: 'IDLE',
      tamperDetected: false,
      lastPingTimestamp: '2026-07-26T16:10:45Z'
    },
    maintenanceHistory: [
      { id: 'MNT-003', date: '2026-03-02', action: 'Provisioned & Issued', technician: 'Sipho Zulu', notes: 'Paired to guardian profile +27 82 555 1234.' }
    ]
  },
  {
    id: 'DEV-GW01',
    serialNumber: 'ITIS-2026-GW1001',
    qrCodePayload: 'ITIS_PROV_PAYLOAD::DEV-GW01::BATCH-2026-GW-DBN::KEY_HASH_1001',
    deviceType: 'ble_gateway',
    modelName: 'ITIS Institutional BLE Gateway 100',
    bleMac: 'CC:DD:EE:11:00:01',
    batchNumber: 'BATCH-2026-GW-DBN',
    supplier: 'KZN Gateway Systems Assembly',
    hardwareRev: 'GW-REV-2.1',
    firmwareVersion: 'v2.1.0-GATEWAY',
    warrantyExpiry: '2029-05-01',
    status: 'active',
    assignedSchoolId: 'SCH-GP-001',
    assignedSchoolName: 'Soweto STEM Academy',
    technicianId: 'TECH-089',
    technicianName: 'Nomvula Mbatha',
    health: {
      batteryPct: 100,
      gpsStatus: '3D_FIX',
      gpsSatellites: 14,
      bleRssiDbm: -42,
      lteSignalDbm: -65,
      motionSensorStatus: 'STATIONARY',
      sosButtonState: 'IDLE',
      tamperDetected: false,
      lastPingTimestamp: '2026-07-26T16:12:30Z'
    },
    maintenanceHistory: [
      { id: 'MNT-004', date: '2026-05-10', action: 'Roof Mount Installation', technician: 'Nomvula Mbatha', notes: 'Mounted on Admin Block with POE surge protection.' }
    ]
  },
  {
    id: 'DEV-TRK01',
    serialNumber: 'ITIS-2026-TRK5001',
    qrCodePayload: 'ITIS_PROV_PAYLOAD::DEV-TRK01::BATCH-2026-Q2-JHB::KEY_HASH_5001',
    deviceType: 'fleet_tracker',
    modelName: 'ITIS Transport OBD Fleet Tracker 500',
    imei: '864920049900112',
    bleMac: 'EE:FF:11:22:33:01',
    batchNumber: 'BATCH-2026-Q2-JHB',
    supplier: 'Defy Defence Systems & Microelectronics',
    hardwareRev: 'REV-3.3a',
    firmwareVersion: 'v5.0.2-FLEET',
    warrantyExpiry: '2028-04-10',
    status: 'active',
    assignedSchoolId: 'SCH-GP-001',
    assignedSchoolName: 'Soweto STEM Academy Bus #4',
    technicianId: 'TECH-042',
    technicianName: 'Sipho Zulu',
    health: {
      batteryPct: 98,
      gpsStatus: '3D_FIX',
      gpsSatellites: 16,
      bleRssiDbm: -50,
      lteSignalDbm: -68,
      motionSensorStatus: 'NORMAL',
      sosButtonState: 'IDLE',
      tamperDetected: false,
      lastPingTimestamp: '2026-07-26T16:11:50Z'
    },
    maintenanceHistory: [
      { id: 'MNT-005', date: '2026-04-20', action: 'Vehicle CAN-Bus Wiring', technician: 'Sipho Zulu', notes: 'Connected to Mercedes Sprinter Bus Reg: GP 88-920.' }
    ]
  },
  {
    id: 'DEV-9901',
    serialNumber: 'ITIS-2026-WB9901',
    qrCodePayload: 'ITIS_PROV_PAYLOAD::DEV-9901::BATCH-2026-Q2-JHB::KEY_HASH_9901',
    deviceType: 'wearable_band',
    modelName: 'ITIS Learner Safety Band V3',
    imei: '864920048123999',
    bleMac: 'AA:BB:CC:99:01:FF',
    nfcUid: '04:A2:3F:89:99:99',
    batchNumber: 'BATCH-2026-Q2-JHB',
    supplier: 'Defy Defence Systems & Microelectronics',
    hardwareRev: 'REV-3.3a',
    firmwareVersion: 'v3.2.1-STABLE',
    warrantyExpiry: '2028-04-10',
    status: 'under_repair',
    assignedSchoolId: 'SCH-WC-002',
    assignedSchoolName: 'Cape Town Primary',
    technicianId: 'TECH-104',
    technicianName: 'David Hendricks',
    health: {
      batteryPct: 12,
      gpsStatus: 'NO_SIGNAL',
      gpsSatellites: 0,
      bleRssiDbm: -95,
      lteSignalDbm: -110,
      motionSensorStatus: 'STATIONARY',
      sosButtonState: 'IDLE',
      tamperDetected: true,
      lastPingTimestamp: '2026-07-24T09:30:00Z'
    },
    maintenanceHistory: [
      { id: 'MNT-006', date: '2026-07-24', action: 'RMA Work Order Created', technician: 'David Hendricks', notes: 'Learner reported strap latch physical crack. Returned for battery and casing swap.' }
    ]
  },
  {
    id: 'DEV-1002',
    serialNumber: 'ITIS-2026-WB1002',
    qrCodePayload: 'ITIS_PROV_PAYLOAD::DEV-1002::BATCH-2026-Q1-CPT::KEY_HASH_1002',
    deviceType: 'wearable_band',
    modelName: 'ITIS Learner Safety Band V3',
    imei: '864920048123002',
    bleMac: 'AA:BB:CC:10:02:10',
    nfcUid: '04:A2:3F:89:10:02',
    batchNumber: 'BATCH-2026-Q1-CPT',
    supplier: 'Tshwane Precision Electronics & IoT',
    hardwareRev: 'REV-3.2b',
    firmwareVersion: 'v3.2.1-STABLE',
    warrantyExpiry: '2028-02-15',
    status: 'in_stock',
    health: {
      batteryPct: 100,
      gpsStatus: '3D_FIX',
      gpsSatellites: 10,
      bleRssiDbm: -45,
      lteSignalDbm: -60,
      motionSensorStatus: 'STATIONARY',
      sosButtonState: 'IDLE',
      tamperDetected: false,
      lastPingTimestamp: '2026-07-25T12:00:00Z'
    },
    maintenanceHistory: [
      { id: 'MNT-007', date: '2026-02-18', action: 'Factory Calibration & Storage', technician: 'Tshwane Warehouse', notes: 'Ready for school enrollment dispatch.' }
    ]
  }
];

export const initialRealWorldCertifications: RealWorldCertificationRequirement[] = [
  {
    id: 'REQ-001',
    category: 'compliance',
    title: 'ICASA Telecommunications Type Approval',
    specification: 'Section 35 of Electronic Communications Act (ECA) compliance for 868MHz BLE, 1.8GHz LTE-M, and 13.56MHz NFC frequencies.',
    softwareStatus: 'COMPLETE',
    hardwareStatus: 'LAB_CERTIFIED',
    details: 'Sample units submitted to SABS & ICASA accredited test laboratory. Type Approval Certificate ICASA-TA-2025/8912 granted.',
    responsibleEntity: 'ICASA & SABS Telecommunication Labs'
  },
  {
    id: 'REQ-002',
    category: 'tooling',
    title: 'IP68 Enclosure Injection Moulding',
    specification: 'Ultrasonic welded PC+ABS biocompatible housing with double O-ring silicone seal resisting 1.5m water depth for 2 hours.',
    softwareStatus: 'COMPLETE',
    hardwareStatus: 'IN_TOOLING',
    details: 'Steel mould tooling undergoing T1 trial samples at Tshwane Precision Moulding Facility.',
    responsibleEntity: 'Tshwane Moulding Works (EMS Partner)'
  },
  {
    id: 'REQ-003',
    category: 'pcba',
    title: 'Automated SMT PCB Production Line',
    specification: '8-layer FR4 PCB with Nordic nRF52840 SoC, Quectel BG95 LTE-M modem, STMicroelectronics 3-axis accelerometer & NXP Secure Element.',
    softwareStatus: 'COMPLETE',
    hardwareStatus: 'PROTOTYPE_PASSED',
    details: 'Batch 1 pre-production run completed with 99.6% first-pass SMT yield rate.',
    responsibleEntity: 'Defy Defence Systems SMT Assembly'
  },
  {
    id: 'REQ-004',
    category: 'telecom',
    title: 'Production eSIM M2M Profiles (Vodacom / MTN / Telkom)',
    specification: 'SITA Government Private APN provisioning with GSMA RSP v2.2 specification for secure over-the-air profile switching.',
    softwareStatus: 'COMPLETE',
    hardwareStatus: 'PRODUCTION_APPROVED',
    details: 'Commercial agreements and dedicated IP subnets active across Vodacom & MTN South Africa networks.',
    responsibleEntity: 'Vodacom & MTN Business M2M Division'
  },
  {
    id: 'REQ-005',
    category: 'factory_security',
    title: 'Hardware Root-of-Trust X.509 Certificate Injection',
    specification: 'Provisioning factory HSM (Hardware Security Module) injecting RSA-4096 CA keys into NXP SE050 secure chip during assembly.',
    softwareStatus: 'COMPLETE',
    hardwareStatus: 'PRODUCTION_APPROVED',
    details: 'Secure HSM tunnel established between SITA Cyber Command and Assembly Line 2.',
    responsibleEntity: 'SITA Enclave Security Authority'
  }
];
