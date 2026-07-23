export interface SchoolCampus {
  id: string;
  name: string;
  emisCode: string;
  province: string;
  circuit: string;
  principalName: string;
  totalLearners: number;
  totalTeachers: number;
  gateScannersOnline: number;
  safetyScore: number;
}

export interface SchoolLearner {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  classroom: string;
  emisNumber: string;
  wearableSerial: string;
  batteryLevel: number;
  deviceStatus: 'ONLINE' | 'OFFLINE' | 'TAMPER_ALERT' | 'LOW_BATTERY';
  attendanceToday: 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED';
  timeIn: string;
  guardianName: string;
  guardianPhone: string;
  authorizedPickups: string[];
  medicalAlerts: string[];
  transferredOut: boolean;
}

export interface NfcScanLog {
  id: string;
  learnerId: string;
  learnerName: string;
  grade: string;
  timestamp: string;
  gateLocation: string;
  readerSerial: string;
  scanStatus: 'VALID_ENTRY' | 'LATE_ENTRY' | 'UNAUTHORIZED_TAG' | 'RE-SCAN';
}

export interface TransportVehicle {
  id: string;
  registration: string;
  makeModel: string;
  driverName: string;
  driverPhone: string;
  routeCode: string;
  capacity: number;
  currentPassengers: number;
  speedKmh: number;
  speedLimitKmh: number;
  routeComplianceScore: number;
  maintenanceStatus: 'OPTIMAL' | 'SERVICE_DUE' | 'INSPECTION_REQUIRED';
}

export interface WearableDevice {
  id: string;
  serialNumber: string;
  assignedLearnerName: string;
  grade: string;
  batteryLevel: number;
  signalStrengthDbm: number;
  firmwareVersion: string;
  tamperDetected: boolean;
  isOnline: boolean;
  lastHeartbeat: string;
}

export interface SchoolIncident {
  id: string;
  timestamp: string;
  title: string;
  category: 'SOS_PANIC' | 'UNAUTHORIZED_EXIT' | 'GEOFENCE_BREACH' | 'MEDICAL_EMERGENCY' | 'TAMPER_ALERT';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  location: string;
  involvedLearner: string;
  status: 'OPEN' | 'RESPONDER_DISPATCHED' | 'UNDER_INVESTIGATION' | 'RESOLVED';
  assignedResponders: string[];
  operatorNotes: string;
}

export interface VisitorLog {
  id: string;
  visitorName: string;
  idPassportNumber: string;
  purpose: 'PARENT_MEETING' | 'DEPARTMENT_INSPECTOR' | 'CONTRACTOR' | 'DELIVERY' | 'OTHER';
  visitingPerson: string;
  qrCodeToken: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: 'ACTIVE_ON_CAMPUS' | 'CHECKED_OUT' | 'DENIED';
}

export interface EmergencyBroadcastRecord {
  id: string;
  timestamp: string;
  senderName: string;
  targetAudience: 'WHOLE_SCHOOL' | 'GRADE_6' | 'TEACHERS' | 'PARENTS' | 'STAFF';
  channels: ('SMS' | 'PUSH' | 'EMAIL' | 'VOICE')[];
  subject: string;
  messageBody: string;
  deliveredCount: number;
  totalRecipients: number;
  status: 'DELIVERED' | 'DISPATCHING' | 'QUEUED';
}

export interface SchoolAuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  role: string;
  action: string;
  ipAddress: string;
}

// SAMPLE SCHOOL CAMPUSES
export const SAMPLE_CAMPUSES: SchoolCampus[] = [
  {
    id: 'SCH-GP-201',
    name: 'Soweto Central Primary School (Main Campus)',
    emisCode: 'EMIS-700142',
    province: 'Gauteng (GP)',
    circuit: 'Johannesburg South Circuit 04',
    principalName: 'Dr. Thabo Dlamini',
    totalLearners: 1240,
    totalTeachers: 48,
    gateScannersOnline: 6,
    safetyScore: 98.6,
  },
  {
    id: 'SCH-GP-202',
    name: 'Soweto Central Primary (Junior Annex Wing)',
    emisCode: 'EMIS-700143',
    province: 'Gauteng (GP)',
    circuit: 'Johannesburg South Circuit 04',
    principalName: 'Mrs. Nomvula Sithole (Deputy Principal)',
    totalLearners: 420,
    totalTeachers: 18,
    gateScannersOnline: 3,
    safetyScore: 97.4,
  },
];

// SAMPLE LEARNERS
export const SAMPLE_SCHOOL_LEARNERS: SchoolLearner[] = [
  {
    id: 'LNR-001',
    firstName: 'Bulumko',
    lastName: 'Mkhize',
    grade: 'Grade 6B',
    classroom: 'Room 14 (Mrs. Khumalo)',
    emisNumber: 'EMIS-LNR-8842',
    wearableSerial: 'ITIS-nRF9160-8842',
    batteryLevel: 92,
    deviceStatus: 'ONLINE',
    attendanceToday: 'PRESENT',
    timeIn: '07:42 AM',
    guardianName: 'Nompumelelo Mkhize',
    guardianPhone: '+27 83 456 7890',
    authorizedPickups: ['Sibusiso Mkhize (Father)', 'Gogo Thandi Mkhize (Grandmother)'],
    medicalAlerts: ['Penicillin Allergy', 'Asthma Inhaler in Bag'],
    transferredOut: false,
  },
  {
    id: 'LNR-002',
    firstName: 'Thandolwethu',
    lastName: 'Mkhize',
    grade: 'Grade 2A',
    classroom: 'Room 04 (Mr. Naidoo)',
    emisNumber: 'EMIS-LNR-9104',
    wearableSerial: 'ITIS-nRF9160-9104',
    batteryLevel: 88,
    deviceStatus: 'ONLINE',
    attendanceToday: 'PRESENT',
    timeIn: '07:38 AM',
    guardianName: 'Nompumelelo Mkhize',
    guardianPhone: '+27 83 456 7890',
    authorizedPickups: ['Sibusiso Mkhize (Father)'],
    medicalAlerts: [],
    transferredOut: false,
  },
  {
    id: 'LNR-003',
    firstName: 'Kagiso',
    lastName: 'Mokoena',
    grade: 'Grade 6B',
    classroom: 'Room 14 (Mrs. Khumalo)',
    emisNumber: 'EMIS-LNR-7712',
    wearableSerial: 'ITIS-nRF9160-7712',
    batteryLevel: 14,
    deviceStatus: 'LOW_BATTERY',
    attendanceToday: 'LATE',
    timeIn: '08:12 AM',
    guardianName: 'Lerato Mokoena',
    guardianPhone: '+27 82 111 2233',
    authorizedPickups: ['Tshepo Mokoena (Uncle)'],
    medicalAlerts: ['Peanut Allergy'],
    transferredOut: false,
  },
  {
    id: 'LNR-004',
    firstName: 'Zinhle',
    lastName: 'Nkabinde',
    grade: 'Grade 7A',
    classroom: 'Room 18 (Mr. Botha)',
    emisNumber: 'EMIS-LNR-6601',
    wearableSerial: 'ITIS-nRF9160-6601',
    batteryLevel: 0,
    deviceStatus: 'OFFLINE',
    attendanceToday: 'ABSENT',
    timeIn: 'N/A',
    guardianName: 'Siphiwe Nkabinde',
    guardianPhone: '+27 71 888 9900',
    authorizedPickups: ['Siphiwe Nkabinde'],
    medicalAlerts: [],
    transferredOut: false,
  },
];

// SAMPLE GATE NFC SCAN LOGS
export const SAMPLE_NFC_SCANS: NfcScanLog[] = [
  { id: 'SCAN-8812', learnerId: 'LNR-001', learnerName: 'Bulumko Mkhize', grade: 'Grade 6B', timestamp: '07:42:15 AM', gateLocation: 'Main Entrance Gate A', readerSerial: 'RDR-NFC-01', scanStatus: 'VALID_ENTRY' },
  { id: 'SCAN-8811', learnerId: 'LNR-002', learnerName: 'Thandolwethu Mkhize', grade: 'Grade 2A', timestamp: '07:38:02 AM', gateLocation: 'Main Entrance Gate A', readerSerial: 'RDR-NFC-01', scanStatus: 'VALID_ENTRY' },
  { id: 'SCAN-8810', learnerId: 'LNR-003', learnerName: 'Kagiso Mokoena', grade: 'Grade 6B', timestamp: '08:12:44 AM', gateLocation: 'Junior Gate B', readerSerial: 'RDR-NFC-02', scanStatus: 'LATE_ENTRY' },
];

// SAMPLE VEHICLES & TRANSPORT
export const SAMPLE_SCHOOL_VEHICLES: TransportVehicle[] = [
  { id: 'BUS-01', registration: 'GP 12 SA GP', makeModel: 'Toyota Quantum 16-Seater', driverName: 'Sipho Zulu', driverPhone: '+27 72 345 6789', routeCode: 'ROUTE-SOWETO-C04', capacity: 16, currentPassengers: 14, speedKmh: 42, speedLimitKmh: 60, routeComplianceScore: 99.4, maintenanceStatus: 'OPTIMAL' },
  { id: 'BUS-02', registration: 'GP 88 EC GP', makeModel: 'Mercedes-Benz Sprinter 22-Seater', driverName: 'Jabulani Khumalo', driverPhone: '+27 83 999 4455', routeCode: 'ROUTE-DIEPKLOOF-D02', capacity: 22, currentPassengers: 20, speedKmh: 0, speedLimitKmh: 60, routeComplianceScore: 98.1, maintenanceStatus: 'SERVICE_DUE' },
];

// SAMPLE WEARABLE DEVICES
export const SAMPLE_WEARABLE_DEVICES: WearableDevice[] = [
  { id: 'DEV-8842', serialNumber: 'ITIS-nRF9160-8842', assignedLearnerName: 'Bulumko Mkhize', grade: 'Grade 6B', batteryLevel: 92, signalStrengthDbm: -68, firmwareVersion: 'v2.4.1-RSA-STSAFE', tamperDetected: false, isOnline: true, lastHeartbeat: '10s ago' },
  { id: 'DEV-9104', serialNumber: 'ITIS-nRF9160-9104', assignedLearnerName: 'Thandolwethu Mkhize', grade: 'Grade 2A', batteryLevel: 88, signalStrengthDbm: -72, firmwareVersion: 'v2.4.1-RSA-STSAFE', tamperDetected: false, isOnline: true, lastHeartbeat: '22s ago' },
  { id: 'DEV-7712', serialNumber: 'ITIS-nRF9160-7712', assignedLearnerName: 'Kagiso Mokoena', grade: 'Grade 6B', batteryLevel: 14, signalStrengthDbm: -85, firmwareVersion: 'v2.3.9-RSA', tamperDetected: false, isOnline: true, lastHeartbeat: '1m ago' },
  { id: 'DEV-6601', serialNumber: 'ITIS-nRF9160-6601', assignedLearnerName: 'Zinhle Nkabinde', grade: 'Grade 7A', batteryLevel: 0, signalStrengthDbm: -110, firmwareVersion: 'v2.2.0-RSA', tamperDetected: true, isOnline: false, lastHeartbeat: '18h ago' },
];

// SAMPLE INCIDENTS
export const SAMPLE_SCHOOL_INCIDENTS: SchoolIncident[] = [
  { id: 'INC-2026-004', timestamp: '08:12 AM Today', title: 'Late Arrival Gate Scan Delay', category: 'UNAUTHORIZED_EXIT', severity: 'LOW', location: 'Junior Gate B', involvedLearner: 'Kagiso Mokoena (Grade 6B)', status: 'RESOLVED', assignedResponders: ['Security Officer Ndlovu'], operatorNotes: 'Learner entered via Gate B after morning assembly. Verified with guardian.' },
  { id: 'INC-2026-003', timestamp: 'Yesterday 02:45 PM', title: 'Hardware Tamper Alert Received', category: 'TAMPER_ALERT', severity: 'MEDIUM', location: 'Sports Pavilion', involvedLearner: 'Zinhle Nkabinde (Grade 7A)', status: 'UNDER_INVESTIGATION', assignedResponders: ['Technician van Zyl'], operatorNotes: 'Optical strap sensor unbuckled without guardian PIN authorization.' },
];

// SAMPLE VISITORS
export const SAMPLE_VISITORS: VisitorLog[] = [
  { id: 'VIS-901', visitorName: 'Adv. Mfenyana', idPassportNumber: '820412 5092 088', purpose: 'DEPARTMENT_INSPECTOR', visitingPerson: 'Dr. Thabo Dlamini (Principal)', qrCodeToken: 'QR-DBE-99120', checkInTime: '08:30 AM', checkOutTime: null, status: 'ACTIVE_ON_CAMPUS' },
  { id: 'VIS-902', visitorName: 'Pieter van der Merwe', idPassportNumber: '780101 5011 082', purpose: 'CONTRACTOR', visitingPerson: 'Estate Manager', qrCodeToken: 'QR-CON-44102', checkInTime: '07:15 AM', checkOutTime: '10:00 AM', status: 'CHECKED_OUT' },
];

// SAMPLE EMERGENCY BROADCASTS
export const SAMPLE_BROADCASTS: EmergencyBroadcastRecord[] = [
  { id: 'BC-2026-01', timestamp: 'Today 07:00 AM', senderName: 'Principal Dr. T. Dlamini', targetAudience: 'WHOLE_SCHOOL', channels: ['SMS', 'PUSH'], subject: 'Early Dismissal Notice — Parent Teacher Conference', messageBody: 'Reminder: All classes conclude at 13:00 today for scheduled parent progress consultations.', deliveredCount: 1210, totalRecipients: 1240, status: 'DELIVERED' },
];

// AUDIT LOGS
export const SAMPLE_SCHOOL_AUDIT_LOGS: SchoolAuditLog[] = [
  { id: 'AUD-8801', timestamp: '08:14:22 AM', actorName: 'Dr. Thabo Dlamini', role: 'SCHOOL_ADMIN', action: 'Exported Daily Attendance PDF Report', ipAddress: '196.25.12.8' },
  { id: 'AUD-8802', timestamp: '08:00:10 AM', actorName: 'Security Gate A Console', role: 'SYSTEM', action: 'Synchronized NFC Gate Reader RDR-NFC-01', ipAddress: '10.0.4.12' },
];

// CRITICAL SCHOOL PORTAL RULES
export const CRITICAL_SCHOOL_PORTAL_RULES = [
  { id: 1, title: 'Multi-Campus Jurisdiction Isolation', ruleText: 'Supports seamless switching between main campus and satellite annexes under strict EMIS circuit scope.', badge: 'EMIS SCOPE' },
  { id: 2, title: 'NFC Gate Reader Real-Time Sync', ruleText: 'Synchronizes physical gate reader timestamps with sub-second attendance ledger entries.', badge: 'NFC GATE SYNC' },
  { id: 3, title: 'Integrated Learner Safety Profiles', ruleText: 'Exposes digital safety scores, assigned nRF9160 serials, medical alerts, and authorized pickup lists.', badge: 'SAFETY PROFILES' },
  { id: 4, title: 'Mass Multi-Channel Emergency Broadcast', ruleText: 'Dispatch SMS, App Push, Email, and Automated Voice alerts to entire school or specific grades under 500ms queueing.', badge: 'MASS BROADCAST' },
  { id: 5, title: 'Visitor QR Registration & Access Control', ruleText: 'QR token generation and real-time check-in logs for contractors, DBE inspectors, and parent meetings.', badge: 'VISITOR QR' },
  { id: 6, title: 'Scholar Transport Speed & Compliance Monitoring', ruleText: 'Real-time vehicle speed, passenger headcount, and route compliance scoring.', badge: 'FLEET COMPLIANCE' },
  { id: 7, title: 'Hardware Wearable Inventory & Tamper Alerts', ruleText: 'Tracks battery degradation, STSAFE key integrity, firmware releases, and physical strap tampering.', badge: 'HARDWARE TAMPER' },
  { id: 8, title: 'Incident Dispatch & Responders Log', ruleText: 'Log, escalate, and assign responders to SOS panic, geofence breaches, and medical incidents.', badge: 'CAD INCIDENTS' },
  { id: 9, title: 'Multi-Format Export & Compliance Reports', ruleText: 'Generate SA-SAMS and DBE compliant PDF, Excel, and CSV attendance and safety audit reports.', badge: 'PDF/EXCEL EXPORT' },
  { id: 10, title: 'WCAG AA Compliant Enterprise Interface', ruleText: 'Clean desktop and tablet optimized UI with dark/light themes, keyboard navigation, and fast loading.', badge: 'WCAG AA COMPLIANT' },
];
