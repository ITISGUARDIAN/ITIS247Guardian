export interface WorkOrderRecord {
  id: string; // e.g. WO-GP-8820
  orderType: 'NEW_INSTALLATION' | 'BATTERY_REPLACEMENT' | 'SIM_SWAP' | 'FIRMWARE_UPGRADE' | 'EMERGENCY_REPAIR' | 'DECOMMISSION';
  priority: 'CRITICAL_P1' | 'HIGH_P2' | 'MEDIUM_P3';
  schoolName: string;
  learnerName: string;
  assignedImei: string;
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'DIAGNOSTICS_PASSED' | 'PAIRED' | 'COMPLETED';
  slaCountdownHours: number;
  scheduledTime: string;
  technicianNotes: string;
}

export interface HardwareDiagnosticResult {
  sensorName: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  valueMeasured: string;
  benchmark: string;
}

export interface InventoryItem {
  id: string;
  itemType: 'ITIS_WEARABLE_V4' | 'SPARE_BATTERY_850MAH' | 'E-SIM_CHIP_MTN' | 'CHARGING_DOCK';
  serialOrImei: string;
  locationStock: 'VEHICLE_VAN_04' | 'SOWETO_WAREHOUSE' | 'JHB_CENTRAL_DEPOT';
  condition: 'NEW_SEALED' | 'REFURBISHED' | 'FAULTY_PENDING_QA';
}

export interface FtdpaCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Flutter Provisioning' | 'BLE Hardware Diagnostics' | 'NFC & QR Code Scanner' | 'mTLS Certificate Enrollment';
  description: string;
  code: string;
}

// SAMPLE WORK ORDERS
export const SAMPLE_WORK_ORDERS: WorkOrderRecord[] = [
  {
    id: 'WO-GP-8820',
    orderType: 'EMERGENCY_REPAIR',
    priority: 'CRITICAL_P1',
    schoolName: 'Orlando East Secondary School',
    learnerName: 'Bongani Ndlovu (Grade 9B)',
    assignedImei: '864209051820495',
    status: 'IN_PROGRESS',
    slaCountdownHours: 1.5,
    scheduledTime: '10:30 AM Today',
    technicianNotes: 'Strap capacitive loop tamper alert triggered. On-site inspect and replace strap assembly.',
  },
  {
    id: 'WO-GP-8821',
    orderType: 'NEW_INSTALLATION',
    priority: 'HIGH_P2',
    schoolName: 'Diepkloof Primary School',
    learnerName: 'Sipho Khumalo (Grade 1A)',
    assignedImei: '864209051820499',
    status: 'ASSIGNED',
    slaCountdownHours: 4.0,
    scheduledTime: '12:00 PM Today',
    technicianNotes: 'New learner enrollment pairing. Require guardian OTP verification and 1:1 binding.',
  },
  {
    id: 'WO-GP-8822',
    orderType: 'BATTERY_REPLACEMENT',
    priority: 'MEDIUM_P3',
    schoolName: 'Meadowlands High School',
    learnerName: 'Keletso Naidoo (Grade 7C)',
    assignedImei: '864209051820494',
    status: 'COMPLETED',
    slaCountdownHours: 0,
    scheduledTime: 'Yesterday 14:00 PM',
    technicianNotes: 'Battery degradation replaced with fresh 850mAhLi-Po unit. Diagnostics 100% pass.',
  },
];

// DIAGNOSTICS SUITE
export const SAMPLE_DIAGNOSTICS: HardwareDiagnosticResult[] = [
  { sensorName: 'GPS L1/L5 Dual Band Fix', status: 'PASS', valueMeasured: 'TTFF: 1.2s (8 Satellites)', benchmark: 'TTFF < 3.0s' },
  { sensorName: '4G LTE / NB-IoT Modem Signal', status: 'PASS', valueMeasured: '-68 dBm (RSRP Excellent)', benchmark: '> -95 dBm' },
  { sensorName: 'Battery Health & Charge Circuit', status: 'PASS', valueMeasured: '98% Capacity (3.82V)', benchmark: '> 80% Capacity' },
  { sensorName: 'Capacitive Strap Tamper Sensor', status: 'FAIL', valueMeasured: 'Loop Resistance Infinite (Open Loop)', benchmark: '12.4 kΩ ±5%' },
  { sensorName: 'Panic SOS Tactile Button', status: 'PASS', valueMeasured: '3.5s Hold Trigger Verified', benchmark: 'Hold 3.0s' },
  { sensorName: 'Accelerometer / Impact Sensor', status: 'PASS', valueMeasured: '3-Axis Calibration ±0.02G', benchmark: '3-Axis Zero Offset' },
];

// INVENTORY STOCK
export const SAMPLE_INVENTORY: InventoryItem[] = [
  { id: 'INV-GP-001', itemType: 'ITIS_WEARABLE_V4', serialOrImei: '864209051820499', locationStock: 'VEHICLE_VAN_04', condition: 'NEW_SEALED' },
  { id: 'INV-GP-002', itemType: 'SPARE_BATTERY_850MAH', serialOrImei: 'BAT-2026-9901', locationStock: 'VEHICLE_VAN_04', condition: 'NEW_SEALED' },
  { id: 'INV-GP-003', itemType: 'E-SIM_CHIP_MTN', serialOrImei: '8927010029104918201', locationStock: 'SOWETO_WAREHOUSE', condition: 'NEW_SEALED' },
  { id: 'INV-GP-004', itemType: 'ITIS_WEARABLE_V4', serialOrImei: '864209051820495', locationStock: 'VEHICLE_VAN_04', condition: 'FAULTY_PENDING_QA' },
];

// CODE SPECS
export const FTDPA_CODE_SPECS: FtdpaCodeSpec[] = [
  {
    id: 1,
    title: 'BLE Hardware Diagnostic & Sensor Test Runner',
    filename: 'lib/features/diagnostics/ble_diagnostic_service.dart',
    category: 'BLE Hardware Diagnostics',
    description: 'Establishes encrypted Bluetooth Low Energy connection to wearable device to run automated 12-point hardware sensor diagnostics.',
    code: `import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';

class BleDiagnosticService {
  final FlutterReactiveBle _ble = FlutterReactiveBle();

  Stream<DiagnosticResult> runHardwareDiagnostics(String deviceMacAddress) async* {
    yield DiagnosticResult('BLE Connection', Status.IN_PROGRESS);

    // Encrypted GATT Handshake with Technician Auth Token
    final connection = _ble.connectToDevice(id: deviceMacAddress);

    yield DiagnosticResult('GPS L1/L5 Test', Status.PASS, value: 'TTFF 1.2s');
    yield DiagnosticResult('Capacitive Tamper Sensor', Status.FAIL, value: 'Open Circuit');
  }
}`
  },
  {
    id: 2,
    title: 'NFC & QR Code Provisioning Enrollment',
    filename: 'lib/features/provisioning/provisioning_repository.dart',
    category: 'NFC & QR Code Scanner',
    description: 'Scans device QR code, reads NFC X.509 device certificate, and registers serial/IMEI into ITIS Platform Assets.',
    code: `import 'package:nfc_manager/nfc_manager.dart';

class ProvisioningRepository {
  Future<DeviceMetadata> scanAndVerifyCertificate() async {
    bool isAvailable = await NfcManager.instance.isAvailable();
    if (!isAvailable) throw Exception('NFC hardware disabled');

    // Read X.509 Device Attestation Certificate from Wearable Tag
    final nfcData = await _readNfcPayload();
    final isCertValid = await _verifyX509Signature(nfcData.certBytes);

    if (!isCertValid) throw Exception('INVALID DEVICE CERTIFICATE: Potential Counterfeit Hardware');

    return DeviceMetadata(
      imei: nfcData.imei,
      firmwareVersion: nfcData.firmwareVersion,
    );
  }
}`
  },
  {
    id: 3,
    title: 'mTLS Client Certificate Device Registration',
    filename: 'lib/features/auth/mtls_http_client.dart',
    category: 'mTLS Certificate Enrollment',
    description: 'Uses Mutual TLS (mTLS) with technician hardware security module (HSM) tokens to register newly provisioned wearables to NestJS core backend.',
    code: `import 'dart:io';

class MtlsHttpClient {
  static HttpClient getSecurityPinnedClient() {
    SecurityContext context = SecurityContext(withTrustedRoots: true);

    // Bind Technician Client Certificate and Private Key
    context.useCertificateChainBytes(_getTechnicianCertBytes());
    context.usePrivateKeyBytes(_getTechnicianKeyBytes());

    HttpClient client = HttpClient(context: context);
    client.badCertificateCallback = (cert, host, port) => false; // Strict validation
    return client;
  }
}`
  }
];

// MANDATORY RULES
export const CRITICAL_FTDPA_RULES = [
  { id: 1, title: 'Sub-500ms QR / NFC Scan Recognition', ruleText: 'Technician scanning wearable QR or NFC tag verifies IMEI and X.509 cert in <500ms.', badge: '<500ms SCAN' },
  { id: 2, title: 'Sub-30s Automated Diagnostics Suite', ruleText: 'Comprehensive 12-point hardware test (GPS, LTE, Battery, Tamper, SOS) finishes in <30 seconds.', badge: '<30s DIAG' },
  { id: 3, title: 'Strict 1:1 Learner Device Binding', ruleText: 'The system strictly prohibits 1:N device assignment; each wearable can bind to exactly one learner ID.', badge: '1:1 BINDING' },
  { id: 4, title: 'Dual Factor OTP Guardian Verification', ruleText: 'Device pairing requires parent OTP confirmation sent to registered mobile number plus technician PIN.', badge: 'OTP VERIFY' },
  { id: 5, title: 'SHA-256 OTA Firmware Integrity Check', ruleText: 'Firmware updates are verified against official RSA signed manifest and SHA-256 hash prior to flashing.', badge: 'SHA-256 OTA' },
  { id: 6, title: 'Immutable Maintenance Audit Log', ruleText: 'Every strap repair, battery swap, and SIM change is cryptographically logged with technician badge ID.', badge: 'AUDIT LOG' },
  { id: 7, title: 'Offline SQLite Work Order Cache', ruleText: 'In remote school sites with zero cellular coverage, work orders and diagnostic logs cache locally in SQLite.', badge: 'OFFLINE SQLITE' },
  { id: 8, title: 'Secure Decommissioning & Cert Revocation', ruleText: 'Retired or broken devices undergo cryptographic wipe and immediate X.509 certificate revocation.', badge: 'SECURE WIPED' },
  { id: 9, title: 'Van & Regional Inventory Reconciliation', ruleText: 'Vehicle stock counts reconcile automatically at the start and end of every field maintenance shift.', badge: 'STOCK SYNC' },
  { id: 10, title: 'Core Mission: Zero Downtime Safety', ruleText: 'Field technicians ensure 100% wearable operational uptime to keep learners protected continuously.', badge: '100% UPTIME' },
];
