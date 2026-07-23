export interface BomComponentItem {
  designator: string;
  componentName: string;
  manufacturer: string;
  partNumber: string;
  category: 'MCU' | 'GNSS' | 'CELLULAR' | 'SECURITY' | 'SENSOR' | 'POWER' | 'PASSIVE';
  unitCostUsd: number;
  sourcingCountry: string;
  complianceCert: string;
}

export interface FactoryQaTestStationRecord {
  stationId: string; // e.g. QA-STATION-JHB-01
  stationType: 'RF_CALIBRATION' | 'GNSS_VALIDATION' | 'SECURE_ELEMENT_FLASH' | 'WATER_PRESSURE_IP68' | 'BATTERY_CYCLE_TEST';
  unitsTestedToday: number;
  passRatePct: number;
  calibratedOperator: string;
  status: 'ACTIVE_CALIBRATED' | 'MAINTENANCE_REQUIRED';
}

export interface DeviceManufacturingBatch {
  batchNumber: string; // e.g. BATCH-2026-ZA-01
  targetQuantity: number;
  assembledQuantity: number;
  passedQaQuantity: number;
  imeiRangeStart: string;
  imeiRangeEnd: string;
  manufacturingPlant: string;
  assemblyStatus: 'IN_PRODUCTION' | 'QA_VALIDATING' | 'SHIPPED_TO_WAREHOUSE';
}

export interface HwCertCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Hardware Schema' | 'NestJS Factory Flashing Service' | 'X.509 Provisioning API';
  description: string;
  code: string;
}

// SAMPLE BILL OF MATERIALS (BOM)
export const SAMPLE_BOM_ITEMS: BomComponentItem[] = [
  {
    designator: 'U1',
    componentName: 'Nordic nRF9160 SiP (Cellular LTE Cat-M1/NB-IoT + GPS)',
    manufacturer: 'Nordic Semiconductor',
    partNumber: 'nRF9160-SIAA-R7',
    category: 'CELLULAR',
    unitCostUsd: 12.50,
    sourcingCountry: 'Norway / Taiwan',
    complianceCert: 'CE, FCC, ICASA Approved',
  },
  {
    designator: 'U2',
    componentName: 'STMicroelectronics STSAFE-A110 High-Security Element',
    manufacturer: 'STMicroelectronics',
    partNumber: 'STSAFE-A110',
    category: 'SECURITY',
    unitCostUsd: 1.20,
    sourcingCountry: 'France',
    complianceCert: 'Common Criteria EAL5+',
  },
  {
    designator: 'U3',
    componentName: 'u-blox MAX-M10S GNSS Receiver (GPS, Galileo, GLONASS, BeiDou)',
    manufacturer: 'u-blox',
    partNumber: 'MAX-M10S-00B',
    category: 'GNSS',
    unitCostUsd: 4.80,
    sourcingCountry: 'Switzerland',
    complianceCert: 'ISO 16750, RoHS',
  },
  {
    designator: 'U4',
    componentName: 'Bosch BMA400 Ultra-Low Power 3-Axis Accelerometer',
    manufacturer: 'Bosch Sensortec',
    partNumber: 'BMA400',
    category: 'SENSOR',
    unitCostUsd: 0.85,
    sourcingCountry: 'Germany',
    complianceCert: 'RoHS, REACH',
  },
  {
    designator: 'BAT1',
    componentName: 'Custom 650mAh High-Density Li-Po Cell with PCM Circuit',
    manufacturer: 'Varta Microbattery',
    partNumber: 'LIP-650MAH-ZA',
    category: 'POWER',
    unitCostUsd: 2.10,
    sourcingCountry: 'South Africa / Germany',
    complianceCert: 'UN38.3, IEC 62133',
  },
];

// SAMPLE FACTORY QA STATIONS
export const SAMPLE_QA_STATIONS: FactoryQaTestStationRecord[] = [
  {
    stationId: 'QA-STATION-JHB-01',
    stationType: 'RF_CALIBRATION',
    unitsTestedToday: 1450,
    passRatePct: 99.8,
    calibratedOperator: 'Eng. David van der Merwe',
    status: 'ACTIVE_CALIBRATED',
  },
  {
    stationId: 'QA-STATION-JHB-02',
    stationType: 'SECURE_ELEMENT_FLASH',
    unitsTestedToday: 1420,
    passRatePct: 100.0,
    calibratedOperator: 'Tech. Thandi Nkosi',
    status: 'ACTIVE_CALIBRATED',
  },
  {
    stationId: 'QA-STATION-DURBAN-01',
    stationType: 'WATER_PRESSURE_IP68',
    unitsTestedToday: 980,
    passRatePct: 99.5,
    calibratedOperator: 'Eng. Rajesh Patel',
    status: 'ACTIVE_CALIBRATED',
  },
];

// SAMPLE BATCHES
export const SAMPLE_MANUFACTURING_BATCHES: DeviceManufacturingBatch[] = [
  {
    batchNumber: 'BATCH-2026-ZA-01',
    targetQuantity: 50000,
    assembledQuantity: 48500,
    passedQaQuantity: 48420,
    imeiRangeStart: '358901120000001',
    imeiRangeEnd: '358901120050000',
    manufacturingPlant: 'Gauteng Electronics Assembly Facility (Midrand)',
    assemblyStatus: 'SHIPPED_TO_WAREHOUSE',
  },
  {
    batchNumber: 'BATCH-2026-ZA-02',
    targetQuantity: 100000,
    assembledQuantity: 32000,
    passedQaQuantity: 31950,
    imeiRangeStart: '358901120050001',
    imeiRangeEnd: '358901120150000',
    manufacturingPlant: 'Durban Harbor Tech Manufacturing Plant',
    assemblyStatus: 'IN_PRODUCTION',
  },
];

// CODE SPECS
export const HWCERT_CODE_SPECS: HwCertCodeSpec[] = [
  {
    id: 1,
    title: 'Manufacturing Asset & IMEI Hardware Registry Schema',
    filename: 'prisma/schema_hardware.prisma',
    category: 'Prisma Hardware Schema',
    description: 'Models factory batches, unique device IMEIs, cryptographic X.509 cert fingerprints, and factory calibration records.',
    code: `model HardwareDevice {
  imei                 String   @id
  serialNumber         String   @unique
  x509CertFingerprint  String   @unique
  secureElementUid     String   @unique
  batchNumber          String
  rfCalibrationDb      Float
  gnssAccuracyMeters   Float
  ip68Passed           Boolean  @default(true)
  factoryQaStatus      String   @default("PASSED")
  manufacturedAt       DateTime @default(now())
  batch                DeviceBatch @relation(fields: [batchNumber], references: [batchNumber])
}

model DeviceBatch {
  batchNumber          String   @id
  plantLocation        String
  targetQuantity       Int
  shippedQuantity      Int
  devices              HardwareDevice[]
}`
  },
  {
    id: 2,
    title: 'Factory Acceptance Testing (FAT) & X.509 Certificate Provisioning Service',
    filename: 'src/modules/manufacturing/services/factory_provisioning.service.ts',
    category: 'NestJS Factory Flashing Service',
    description: 'Generates hardware-bound X.509 certificates and registers factory calibration data into the national ledger.',
    code: `import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class FactoryProvisioningService {
  async provisionNewDevice(factoryPayload: { imei: string; secureElementUid: string; rfDb: number; gnssAccuracy: number }) {
    // 1. Verify unique IMEI format (15 digits TAC compliance)
    if (!/^\d{15}$/.test(factoryPayload.imei)) {
      throw new BadRequestException('Invalid IMEI TAC format');
    }

    // 2. Issue hardware X.509 cert bound to Secure Element UID
    const certFingerprint = crypto.createHash('sha256').update(factoryPayload.secureElementUid + Date.now()).digest('hex');

    return {
      status: 'FACTORY_QA_PASSED',
      imei: factoryPayload.imei,
      x509CertFingerprint: certFingerprint,
      signedAttestation: '0x8f2a...91bc',
      qaGateApproved: true,
    };
  }
}`
  },
  {
    id: 3,
    title: 'Automated Factory Calibration Station API',
    filename: 'src/modules/manufacturing/controllers/factory_calibration.controller.ts',
    category: 'X.509 Provisioning API',
    description: 'REST API used by automated test fixtures on the assembly line to validate RF transmit power, GNSS fix speed, and IP68 pressure seals.',
    code: `import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ZeroTrustGuard } from '../../security/guards/zero_trust.guard';

@Controller('api/v1/factory/calibration')
@UseGuards(ZeroTrustGuard)
export class FactoryCalibrationController {
  @Post('record-test')
  async recordTestStationResult(@Body() testResult: any) {
    return {
      stationId: testResult.stationId,
      imei: testResult.imei,
      testStatus: testResult.rfPowerDb >= -105 && testResult.gnssFixSec <= 2.5 ? 'PASS' : 'FAIL',
      recordedAt: new Date().toISOString(),
    };
  }
}`
  }
];

// MANDATORY RULES
export const CRITICAL_HWCERT_RULES = [
  { id: 1, title: 'Globally Unique IMEI & TAC Code Assignment', ruleText: 'Every manufactured wearable possesses a GSMA-registered Type Allocation Code (TAC) and globally unique 15-digit IMEI.', badge: 'GSMA TAC OK' },
  { id: 2, title: 'Hardware Secure Element X.509 Key Pair Flashing', ruleText: 'Cryptographic identity is generated directly inside the STSAFE-A110 Secure Element during factory assembly; private keys never leave hardware.', badge: 'X.509 HARDWARE' },
  { id: 3, title: 'Zero Duplicate Certificate Fingerprints', ruleText: 'Factory certificate authority enforces cryptographic uniqueness for every device serial number.', badge: 'ZERO DUPLICATE' },
  { id: 4, title: 'Hardware-Enforced Secure Boot & Signed Firmware', ruleText: 'Nordic nRF9160 Arm TrustZone enforces RSA-2048/ECC signed image verification before executing bootloader.', badge: 'SECURE BOOT' },
  { id: 5, title: 'Digitally Signed Firmware Rollback Protection', ruleText: 'Firmware anti-rollback fuses prevent downgrading to legacy firmware versions with known vulnerabilities.', badge: 'ANTI-ROLLBACK' },
  { id: 6, title: '100% Factory Acceptance Testing (FAT) Gate Verification', ruleText: 'Every single unit passes automated RF power, GNSS cold-start (< 2.5s), and Bluetooth LE signal calibration before packaging.', badge: '100% FAT PASSED' },
  { id: 7, title: 'Immutable Factory Calibration Ledger', ruleText: 'All test fixture logs, battery capacity ratings, and antenna tuning curves are written to an immutable audit database.', badge: 'AUDIT LEDGER' },
  { id: 8, title: 'End-to-End Shipment Traceability', ruleText: 'Batch numbers and IMEI ranges are linked to specific delivery manifests and regional distribution warehouses.', badge: 'TRACEABLE' },
  { id: 9, title: 'RMA Forensic Evidence Preservation', ruleText: 'Returned damaged devices undergo forensic flash dump extraction before recycling or repair.', badge: 'RMA FORENSICS' },
  { id: 10, title: '20M+ Device National Scaling Architecture', ruleText: 'Manufacturing engineering pipeline and automated test station architecture designed for 20M+ unit global scaling.', badge: '20M SCALABLE' },
];
