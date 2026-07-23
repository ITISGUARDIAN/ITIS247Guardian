export interface FieldWorkOrder {
  id: string;
  orderType: 'NEW_INSTALLATION' | 'BATTERY_REPLACEMENT' | 'DEVICE_SWAP' | 'FIRMWARE_UPGRADE' | 'SIM_REPLACEMENT' | 'REPAIR_MAINTENANCE';
  priority: 'EMERGENCY' | 'HIGH' | 'NORMAL' | 'LOW';
  status: 'PENDING' | 'IN_PROGRESS' | 'DIAGNOSTICS_PASSED' | 'SIGN_OFF_REQUIRED' | 'COMPLETED';
  slaCountdownHours: number;
  schoolName: string;
  district: string;
  provinceCode: string;
  learnerId: string;
  learnerName: string;
  learnerGrade: string;
  guardianName: string;
  guardianContact: string;
  assignedTechnician: string;
  scheduledTime: string;
  deviceSerialToReplace?: string;
  newDeviceSerial?: string;
  notes: string;
}

export interface BleDiagnosticTest {
  id: string;
  name: string;
  component: 'GPS' | 'LTE_MODEM' | 'SIM' | 'BATTERY' | 'CHARGING' | 'SOS_BUTTON' | 'TAMPER_SENSOR' | 'ACCELEROMETER' | 'TEMP_SENSOR' | 'BLE' | 'NFC' | 'LEDS' | 'VIBRATION';
  status: 'NOT_TESTED' | 'TESTING' | 'PASS' | 'FAIL';
  metric: string;
  value: string;
}

export interface VehicleInventoryItem {
  id: string;
  itemType: 'WEARABLE_DEVICE' | 'SPARE_BATTERY' | 'STRAP_BAND' | 'CHARGING_DOCK' | 'MTN_SIM_CARD' | 'VODACOM_SIM_CARD' | 'TAMPER_SEAL';
  serialOrIccid: string;
  model: string;
  quantity: number;
  condition: 'NEW_IN_BOX' | 'REFURBISHED' | 'DEFECTIVE_RETURN';
}

export interface FirmwareRelease {
  version: string;
  releaseDate: string;
  fileSizeBytes: number;
  digitalSignatureSha256: string;
  releaseNotes: string[];
  isMandatory: boolean;
}

export const SAMPLE_WORK_ORDERS: FieldWorkOrder[] = [
  {
    id: 'WO-2026-8801',
    orderType: 'NEW_INSTALLATION',
    priority: 'EMERGENCY',
    status: 'IN_PROGRESS',
    slaCountdownHours: 2,
    schoolName: 'Soweto Central Primary School',
    district: 'Johannesburg South Circuit 04',
    provinceCode: 'GP',
    learnerId: 'LNR-001',
    learnerName: 'Bulumko Mkhize',
    learnerGrade: 'Grade 6B',
    guardianName: 'Nompumelelo Mkhize',
    guardianContact: '+27 82 555 0192',
    assignedTechnician: 'Tech. T. Mokoena (Cert #TECH-8820)',
    scheduledTime: '09:00 AM Today',
    notes: 'Initial 1:1 wearable pairing and optical strap size fitment. Priority emergency tag.',
  },
  {
    id: 'WO-2026-8802',
    orderType: 'BATTERY_REPLACEMENT',
    priority: 'HIGH',
    status: 'PENDING',
    slaCountdownHours: 6,
    schoolName: 'Umlazi Secondary School',
    district: 'eThekwini North Circuit 02',
    provinceCode: 'KZN',
    learnerId: 'LNR-KZN-442',
    learnerName: 'Siyabonga Dlamini',
    learnerGrade: 'Grade 10A',
    guardianName: 'Sibusiso Dlamini',
    guardianContact: '+27 83 444 8812',
    assignedTechnician: 'Tech. T. Mokoena (Cert #TECH-8820)',
    scheduledTime: '11:30 AM Today',
    deviceSerialToReplace: 'ITIS-nRF9160-4420',
    notes: 'Battery degradation alert <15% max capacity. Replace LiPo cell & tamper O-ring seal.',
  },
  {
    id: 'WO-2026-8803',
    orderType: 'DEVICE_SWAP',
    priority: 'NORMAL',
    status: 'PENDING',
    slaCountdownHours: 24,
    schoolName: 'Khayelitsha High School',
    district: 'Cape Town Metro East',
    provinceCode: 'WC',
    learnerId: 'LNR-WC-102',
    learnerName: 'Amahle Zondi',
    learnerGrade: 'Grade 9C',
    guardianName: 'Zandile Zondi',
    guardianContact: '+27 82 111 0022',
    assignedTechnician: 'Tech. C. September (Cert #TECH-4102)',
    scheduledTime: '02:00 PM Today',
    deviceSerialToReplace: 'ITIS-nRF9160-1029',
    notes: 'Hardware buckle tamper switch damaged during sport activity. Full unit swap.',
  },
];

export const INITIAL_BLE_DIAGNOSTICS: BleDiagnosticTest[] = [
  { id: 'TST-01', name: 'GNSS Satellite Receiver Lock', component: 'GPS', status: 'NOT_TESTED', metric: 'Satellites Locked', value: '--' },
  { id: 'TST-02', name: 'LTE-M / NB-IoT Modem Ping', component: 'LTE_MODEM', status: 'NOT_TESTED', metric: 'Signal Strength (RSRP)', value: '--' },
  { id: 'TST-03', name: 'MTN RSA SIM Identity (eUICC)', component: 'SIM', status: 'NOT_TESTED', metric: 'ICCID Verification', value: '--' },
  { id: 'TST-04', name: 'LiPo Battery Health & Temp', component: 'BATTERY', status: 'NOT_TESTED', metric: 'Voltage & Temp C', value: '--' },
  { id: 'TST-05', name: 'Inductive Magnetic Charger', component: 'CHARGING', status: 'NOT_TESTED', metric: 'Charge Rate (mA)', value: '--' },
  { id: 'TST-06', name: 'Dual Tactile SOS Panic Buttons', component: 'SOS_BUTTON', status: 'NOT_TESTED', metric: 'Switch Impedance', value: '--' },
  { id: 'TST-07', name: 'Optical Strap Buckle Tamper', component: 'TAMPER_SENSOR', status: 'NOT_TESTED', metric: 'IR Light Reflection', value: '--' },
  { id: 'TST-08', name: '3-Axis Accelerometer Motion', component: 'ACCELEROMETER', status: 'NOT_TESTED', metric: 'G-Force Delta', value: '--' },
  { id: 'TST-09', name: 'Skin Temperature Sensor', component: 'TEMP_SENSOR', status: 'NOT_TESTED', metric: 'Temperature °C', value: '--' },
  { id: 'TST-10', name: 'STSAFE-A110 Hardware Enclave', component: 'BLE', status: 'NOT_TESTED', metric: 'X.509 Cert SHA-256', value: '--' },
];

export const SAMPLE_VEHICLE_INVENTORY: VehicleInventoryItem[] = [
  { id: 'INV-101', itemType: 'WEARABLE_DEVICE', serialOrIccid: 'ITIS-nRF9160-8842', model: 'ITIS Smart Wearable v2.4 (Gauteng Issue)', quantity: 4, condition: 'NEW_IN_BOX' },
  { id: 'INV-102', itemType: 'WEARABLE_DEVICE', serialOrIccid: 'ITIS-nRF9160-9104', model: 'ITIS Smart Wearable v2.4 (KZN Issue)', quantity: 2, condition: 'NEW_IN_BOX' },
  { id: 'INV-103', itemType: 'SPARE_BATTERY', serialOrIccid: 'BAT-350MAH-901', model: '350mAh High-Density LiPo Cell', quantity: 12, condition: 'NEW_IN_BOX' },
  { id: 'INV-104', itemType: 'MTN_SIM_CARD', serialOrIccid: '8927010012938102', model: 'MTN RSA eSIM M2M LTE-M profile', quantity: 25, condition: 'NEW_IN_BOX' },
  { id: 'INV-105', itemType: 'STRAP_BAND', serialOrIccid: 'STRAP-HYPO-MED', model: 'Hypoallergenic Silicone Band (Medium)', quantity: 18, condition: 'NEW_IN_BOX' },
];

export const AVAILABLE_FIRMWARE_RELEASES: FirmwareRelease[] = [
  {
    version: 'v2.4.1-RSA-STSAFE',
    releaseDate: '2026-07-01',
    fileSizeBytes: 2480192,
    digitalSignatureSha256: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    releaseNotes: [
      'Enhanced STSAFE-A110 crypto chip attestation for 11 official SA languages voice synthesis.',
      'Optimized LTE-M power saving mode (PSM) extending battery lifecycle by 18%.',
      'Automated optical strap buckle chatter suppression algorithm.',
    ],
    isMandatory: true,
  },
  {
    version: 'v2.3.9-RSA',
    releaseDate: '2026-05-15',
    fileSizeBytes: 2310140,
    digitalSignatureSha256: '0x88f2a1c0b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8',
    releaseNotes: ['Base firmware release for 2026 school term rollouts.'],
    isMandatory: false,
  },
];
