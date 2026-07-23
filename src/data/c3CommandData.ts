export interface RsaProvince {
  id: string;
  name: string;
  code: string;
  capital: string;
  totalSchools: number;
  totalLearners: number;
  activeDevicesOnline: number;
  activeIncidents: number;
  threatLevel: 'LOW' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
  sapsDistrictsCount: number;
  emsStationsCount: number;
  responseAvgMinutes: number;
}

export interface C3Incident {
  id: string;
  timestamp: string;
  provinceCode: string;
  district: string;
  schoolName: string;
  learnerId: string;
  learnerName: string;
  learnerPhoto: string;
  learnerAge: number;
  learnerGrade: string;
  wearableSerial: string;
  category: 'SOS_PANIC' | 'UNAUTHORIZED_EXIT' | 'GEOFENCE_BREACH' | 'MEDICAL_EMERGENCY' | 'HARDWARE_TAMPER' | 'SPEEDING_BUS';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'OPERATOR_ASSIGNED' | 'DISPATCHED' | 'ON_SCENE' | 'RESOLVED';
  slaCountdownSeconds: number;
  operatorAssigned: string | null;
  lat: number;
  lng: number;
  address: string;
  riskScore: number;
  decisionExplanation: string;
  medicalAlerts: string[];
  batteryLevel: number;
  signalDbm: number;
  speedKmh: number;
  parentContacted: boolean;
  schoolNotified: boolean;
  assignedResponders: string[];
  responderEtaMinutes: number;
  timeline: Array<{ time: string; event: string; actor: string }>;
  evidenceHash: string;
}

export interface EmergencyResponder {
  id: string;
  unitCode: string;
  agency: 'SAPS_10111' | 'GAUTENG_EMS' | 'METRO_POLICE' | 'PRIVATE_SECURITY' | 'SCHOOL_SECURITY';
  callsign: string;
  provinceCode: string;
  district: string;
  status: 'AVAILABLE' | 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE' | 'OFF_DUTY';
  vehicleType: string;
  currentLat: number;
  currentLng: number;
  assignedIncidentId: string | null;
  etaMinutes: number | null;
  officerInCharge: string;
  mobileNumber: string;
}

export interface C3TelemetryPacket {
  deviceId: string;
  learnerName: string;
  timestamp: string;
  lat: number;
  lng: number;
  heading: number;
  speedKmh: number;
  altitudeMeters: number;
  batteryPct: number;
  signalDbm: number;
  satellites: number;
  sosTriggered: boolean;
  tamperTriggered: boolean;
  packetLatencyMs: number;
}

export interface C3FleetDevice {
  id: string;
  serialNumber: string;
  assignedLearner: string;
  schoolName: string;
  province: string;
  batteryPct: number;
  status: 'ONLINE' | 'OFFLINE' | 'CHARGING' | 'LOW_BATTERY' | 'TAMPERED';
  firmwareVersion: string;
  simIccid: string;
  cellularOperator: 'MTN_RSA' | 'VODACOM_ZA' | 'TELKOM_SA' | 'CELL_C';
  lastPing: string;
}

export interface C3AuditEntry {
  id: string;
  timestamp: string;
  operatorId: string;
  operatorName: string;
  action: string;
  incidentId: string | null;
  details: string;
  ipAddress: string;
  hash: string;
}

// 9 RSA PROVINCES DATA
export const RSA_PROVINCES: RsaProvince[] = [
  { id: 'GP', name: 'Gauteng', code: 'GP', capital: 'Johannesburg', totalSchools: 2210, totalLearners: 1240000, activeDevicesOnline: 1228500, activeIncidents: 3, threatLevel: 'ELEVATED', sapsDistrictsCount: 142, emsStationsCount: 88, responseAvgMinutes: 4.2 },
  { id: 'WC', name: 'Western Cape', code: 'WC', capital: 'Cape Town', totalSchools: 1450, totalLearners: 780000, activeDevicesOnline: 772000, activeIncidents: 1, threatLevel: 'LOW', sapsDistrictsCount: 98, emsStationsCount: 62, responseAvgMinutes: 3.8 },
  { id: 'KZN', name: 'KwaZulu-Natal', code: 'KZN', capital: 'Pietermaritzburg', totalSchools: 3100, totalLearners: 1580000, activeDevicesOnline: 1540000, activeIncidents: 4, threatLevel: 'HIGH', sapsDistrictsCount: 184, emsStationsCount: 110, responseAvgMinutes: 5.6 },
  { id: 'EC', name: 'Eastern Cape', code: 'EC', capital: 'Bhisho', totalSchools: 2800, totalLearners: 1120000, activeDevicesOnline: 1090000, activeIncidents: 2, threatLevel: 'ELEVATED', sapsDistrictsCount: 120, emsStationsCount: 74, responseAvgMinutes: 6.1 },
  { id: 'FS', name: 'Free State', code: 'FS', capital: 'Bloemfontein', totalSchools: 980, totalLearners: 520000, activeDevicesOnline: 515000, activeIncidents: 0, threatLevel: 'LOW', sapsDistrictsCount: 64, emsStationsCount: 42, responseAvgMinutes: 4.0 },
  { id: 'MP', name: 'Mpumalanga', code: 'MP', capital: 'Mbombela', totalSchools: 1210, totalLearners: 640000, activeDevicesOnline: 631000, activeIncidents: 1, threatLevel: 'LOW', sapsDistrictsCount: 78, emsStationsCount: 48, responseAvgMinutes: 4.8 },
  { id: 'LP', name: 'Limpopo', code: 'LP', capital: 'Polokwane', totalSchools: 2400, totalLearners: 1050000, activeDevicesOnline: 1025000, activeIncidents: 2, threatLevel: 'ELEVATED', sapsDistrictsCount: 112, emsStationsCount: 68, responseAvgMinutes: 5.9 },
  { id: 'NW', name: 'North West', code: 'NW', capital: 'Mahikeng', totalSchools: 1150, totalLearners: 580000, activeDevicesOnline: 571000, activeIncidents: 1, threatLevel: 'LOW', sapsDistrictsCount: 72, emsStationsCount: 45, responseAvgMinutes: 5.1 },
  { id: 'NC', name: 'Northern Cape', code: 'NC', capital: 'Kimberley', totalSchools: 540, totalLearners: 290000, activeDevicesOnline: 287000, activeIncidents: 0, threatLevel: 'LOW', sapsDistrictsCount: 40, emsStationsCount: 26, responseAvgMinutes: 4.5 },
];

// SAMPLE LIVE INCIDENTS
export const SAMPLE_C3_INCIDENTS: C3Incident[] = [
  {
    id: 'INC-RSA-2026-9001',
    timestamp: '08:14:02 AM Today',
    provinceCode: 'GP',
    district: 'Johannesburg South Circuit 04',
    schoolName: 'Soweto Central Primary School',
    learnerId: 'LNR-001',
    learnerName: 'Bulumko Mkhize',
    learnerPhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200',
    learnerAge: 12,
    learnerGrade: 'Grade 6B',
    wearableSerial: 'ITIS-nRF9160-8842',
    category: 'SOS_PANIC',
    severity: 'CRITICAL',
    status: 'DISPATCHED',
    slaCountdownSeconds: 180,
    operatorAssigned: 'Cmdr. J. van der Merwe (Op-01)',
    lat: -26.2485,
    lng: 27.9082,
    address: '142 Vilakazi St, Orlando West, Soweto, Johannesburg',
    riskScore: 96,
    decisionExplanation: 'Dual hardware button SOS panic triggered with optical strap pressure pulse. Automatic CAD ticket #CAD-9910 generated.',
    medicalAlerts: ['Penicillin Allergy', 'Asthma Inhaler in Backpack'],
    batteryLevel: 92,
    signalDbm: -68,
    speedKmh: 0,
    parentContacted: true,
    schoolNotified: true,
    assignedResponders: ['SAPS 10111 Flying Squad (Unit GP-FS-04)', 'Gauteng EMS Ambulance (Unit EMS-GP-12)'],
    responderEtaMinutes: 3,
    timeline: [
      { time: '08:14:02', event: 'SOS Button Hold (3.0s) Detected on wearable ITIS-nRF9160-8842', actor: 'WEARABLE_STSAFE' },
      { time: '08:14:03', event: 'CAD Engine created Incident #INC-RSA-2026-9001 with Critical Priority', actor: 'ITIS_CAD_AI' },
      { time: '08:14:05', event: 'SMS & Automated Voice call dispatched to Guardian Nompumelelo Mkhize', actor: 'COMMS_GATEWAY' },
      { time: '08:14:10', event: 'Dispatched SAPS Unit GP-FS-04 (Flying Squad) and Gauteng EMS-GP-12', actor: 'OPERATOR_OP01' },
    ],
    evidenceHash: '0x99a1f8c3e4b2d1009182374e',
  },
  {
    id: 'INC-RSA-2026-9002',
    timestamp: '08:02:15 AM Today',
    provinceCode: 'KZN',
    district: 'eThekwini North Circuit 02',
    schoolName: 'Umlazi Secondary School',
    learnerId: 'LNR-KZN-442',
    learnerName: 'Siyabonga Dlamini',
    learnerPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
    learnerAge: 15,
    learnerGrade: 'Grade 10A',
    wearableSerial: 'ITIS-nRF9160-4420',
    category: 'GEOFENCE_BREACH',
    severity: 'HIGH',
    status: 'OPERATOR_ASSIGNED',
    slaCountdownSeconds: 420,
    operatorAssigned: 'Op. Z. Khumalo (Op-04)',
    lat: -29.9632,
    lng: 30.8812,
    address: 'MR259 Road, Umlazi V-Section, Durban',
    riskScore: 78,
    decisionExplanation: 'Learner device exited designated safe school corridor at 08:02 AM during morning study hours.',
    medicalAlerts: ['Epilepsy Warning'],
    batteryLevel: 64,
    signalDbm: -74,
    speedKmh: 18,
    parentContacted: true,
    schoolNotified: true,
    assignedResponders: ['Metro Police Patrol (Unit KZN-MP-09)'],
    responderEtaMinutes: 6,
    timeline: [
      { time: '08:02:15', event: 'Geofence Exit Event logged at Umlazi Safe Zone B', actor: 'GEOFENCE_ENGINE' },
      { time: '08:03:00', event: 'Operator Z. Khumalo accepted ticket', actor: 'OPERATOR_OP04' },
    ],
    evidenceHash: '0x88f2e1a3b4c5d6e7f8',
  },
  {
    id: 'INC-RSA-2026-9003',
    timestamp: '07:45:30 AM Today',
    provinceCode: 'WC',
    district: 'Cape Town Metro East Circuit 01',
    schoolName: 'Khayelitsha High School',
    learnerId: 'LNR-WC-102',
    learnerName: 'Amahle Zondi',
    learnerPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    learnerAge: 14,
    learnerGrade: 'Grade 9C',
    wearableSerial: 'ITIS-nRF9160-1029',
    category: 'HARDWARE_TAMPER',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    slaCountdownSeconds: 0,
    operatorAssigned: 'Op. C. September (Op-02)',
    lat: -34.0381,
    lng: 18.6723,
    address: 'Spine Road, Khayelitsha, Cape Town',
    riskScore: 35,
    decisionExplanation: 'Optical strap buckle tamper sensor opened. Confirmed as accidental unbuckle by class teacher.',
    medicalAlerts: [],
    batteryLevel: 85,
    signalDbm: -82,
    speedKmh: 0,
    parentContacted: true,
    schoolNotified: true,
    assignedResponders: [],
    responderEtaMinutes: 0,
    timeline: [
      { time: '07:45:30', event: 'Optical Strap Tamper Switch Triggered', actor: 'WEARABLE_STSAFE' },
      { time: '07:48:10', event: 'Teacher verified learner safe in classroom. Incident marked resolved.', actor: 'OPERATOR_OP02' },
    ],
    evidenceHash: '0x77d3b2a1c0e9f8d7c6',
  },
];

// SAMPLE EMERGENCY RESPONDERS
export const SAMPLE_RESPONDERS: EmergencyResponder[] = [
  { id: 'RSP-GP-01', unitCode: 'GP-FS-04', agency: 'SAPS_10111', callsign: 'Flying Squad Soweto 4', provinceCode: 'GP', district: 'Johannesburg South', status: 'DISPATCHED', vehicleType: 'BMW 330i Patrol Cruiser', currentLat: -26.2450, currentLng: 27.9040, assignedIncidentId: 'INC-RSA-2026-9001', etaMinutes: 3, officerInCharge: 'Capt. D. Naidoo', mobileNumber: '+27 82 101 1104' },
  { id: 'RSP-GP-02', unitCode: 'EMS-GP-12', agency: 'GAUTENG_EMS', callsign: 'Gauteng ALS Ambulance 12', provinceCode: 'GP', district: 'Johannesburg South', status: 'EN_ROUTE', vehicleType: 'Mercedes Sprinter ALS Ambulance', currentLat: -26.2490, currentLng: 27.9100, assignedIncidentId: 'INC-RSA-2026-9001', etaMinutes: 4, officerInCharge: 'Paramedic S. Botha', mobileNumber: '+27 83 911 0012' },
  { id: 'RSP-KZN-01', unitCode: 'KZN-MP-09', agency: 'METRO_POLICE', callsign: 'Durban Metro Patrol 9', provinceCode: 'KZN', district: 'eThekwini North', status: 'DISPATCHED', vehicleType: 'Toyota Hilux 4x4 Unit', currentLat: -29.9600, currentLng: 30.8800, assignedIncidentId: 'INC-RSA-2026-9002', etaMinutes: 6, officerInCharge: 'Insp. T. Govender', mobileNumber: '+27 84 555 1022' },
  { id: 'RSP-GP-03', unitCode: 'GP-SEC-01', agency: 'PRIVATE_SECURITY', callsign: 'ADT Rapid Armed Response 1', provinceCode: 'GP', district: 'Soweto Central', status: 'AVAILABLE', vehicleType: 'VW Polo Response Unit', currentLat: -26.2410, currentLng: 27.9010, assignedIncidentId: null, etaMinutes: null, officerInCharge: 'Officer B. Sithole', mobileNumber: '+27 83 777 9900' },
];

// SAMPLE TELEMETRY PACKETS FOR STREAM
export const SAMPLE_C3_TELEMETRY_STREAM: C3TelemetryPacket[] = [
  { deviceId: 'ITIS-nRF9160-8842', learnerName: 'Bulumko Mkhize', timestamp: '08:14:22.102', lat: -26.2485, lng: 27.9082, heading: 142, speedKmh: 0, altitudeMeters: 1740, batteryPct: 92, signalDbm: -68, satellites: 11, sosTriggered: true, tamperTriggered: false, packetLatencyMs: 18 },
  { deviceId: 'ITIS-nRF9160-9104', learnerName: 'Thandolwethu Mkhize', timestamp: '08:14:21.990', lat: -26.2481, lng: 27.9080, heading: 90, speedKmh: 0, altitudeMeters: 1740, batteryPct: 88, signalDbm: -72, satellites: 10, sosTriggered: false, tamperTriggered: false, packetLatencyMs: 22 },
  { deviceId: 'ITIS-nRF9160-4420', learnerName: 'Siyabonga Dlamini', timestamp: '08:14:21.840', lat: -29.9632, lng: 30.8812, heading: 210, speedKmh: 18, altitudeMeters: 120, batteryPct: 64, signalDbm: -74, satellites: 9, sosTriggered: false, tamperTriggered: false, packetLatencyMs: 34 },
  { deviceId: 'ITIS-nRF9160-7712', learnerName: 'Kagiso Mokoena', timestamp: '08:14:21.512', lat: -26.2478, lng: 27.9085, heading: 0, speedKmh: 0, altitudeMeters: 1739, batteryPct: 14, signalDbm: -85, satellites: 8, sosTriggered: false, tamperTriggered: false, packetLatencyMs: 42 },
];

// SAMPLE FLEET DEVICES
export const SAMPLE_C3_FLEET: C3FleetDevice[] = [
  { id: 'FLEET-8842', serialNumber: 'ITIS-nRF9160-8842', assignedLearner: 'Bulumko Mkhize', schoolName: 'Soweto Central Primary', province: 'Gauteng', batteryPct: 92, status: 'ONLINE', firmwareVersion: 'v2.4.1-RSA-STSAFE', simIccid: '8927010012938102', cellularOperator: 'MTN_RSA', lastPing: '10s ago' },
  { id: 'FLEET-9104', serialNumber: 'ITIS-nRF9160-9104', assignedLearner: 'Thandolwethu Mkhize', schoolName: 'Soweto Central Primary', province: 'Gauteng', batteryPct: 88, status: 'ONLINE', firmwareVersion: 'v2.4.1-RSA-STSAFE', simIccid: '8927010012938103', cellularOperator: 'MTN_RSA', lastPing: '22s ago' },
  { id: 'FLEET-7712', serialNumber: 'ITIS-nRF9160-7712', assignedLearner: 'Kagiso Mokoena', schoolName: 'Soweto Central Primary', province: 'Gauteng', batteryPct: 14, status: 'LOW_BATTERY', firmwareVersion: 'v2.3.9-RSA', simIccid: '8927010012938104', cellularOperator: 'VODACOM_ZA', lastPing: '1m ago' },
  { id: 'FLEET-6601', serialNumber: 'ITIS-nRF9160-6601', assignedLearner: 'Zinhle Nkabinde', schoolName: 'Soweto Central Primary', province: 'Gauteng', batteryPct: 0, status: 'OFFLINE', firmwareVersion: 'v2.2.0-RSA', simIccid: '8927010012938105', cellularOperator: 'TELKOM_SA', lastPing: '18h ago' },
];

// SAMPLE AUDIT LOGS
export const SAMPLE_C3_AUDIT_LOGS: C3AuditEntry[] = [
  { id: 'AUD-C3-001', timestamp: '08:14:10 AM', operatorId: 'OP-01', operatorName: 'Cmdr. J. van der Merwe', action: 'DISPATCH_RESPONDER', incidentId: 'INC-RSA-2026-9001', details: 'Dispatched SAPS Unit GP-FS-04 & Gauteng EMS-GP-12 to Vilakazi St location.', ipAddress: '10.200.4.12', hash: '0x99a1f8c3e4b2d100' },
  { id: 'AUD-C3-002', timestamp: '08:14:03 AM', operatorId: 'SYS-AI', operatorName: 'ITIS CAD Engine', action: 'AUTO_CREATE_TICKET', incidentId: 'INC-RSA-2026-9001', details: 'Auto generated ticket from dual-button SOS hold event.', ipAddress: '10.200.0.1', hash: '0x88e1a2b3c4d5e6f7' },
];

// CRITICAL C3 COMMAND CENTRE RULES
export const CRITICAL_C3_RULES = [
  { id: 1, title: 'Government-Grade Tactical UI', ruleText: 'Ultra-low latency dashboard designed for 24/7 command center operators, air traffic control style.', badge: 'TACTICAL UI' },
  { id: 2, title: '9 RSA Province Scope Switching', ruleText: 'Seamless switching between National C3 view and 9 RSA provincial command centers with RBAC isolation.', badge: 'PROVINCE SCOPE' },
  { id: 3, title: 'Sub-250ms Live WebSockets Telemetry', ruleText: 'Streaming packet latency, satellite count, battery level, speed, and heading updates.', badge: 'SUB-250MS STREAM' },
  { id: 4, title: 'CAD Emergency Incident Queue & SLA Counter', ruleText: 'SLA countdown timers with automated CAD escalations for SAPS 10111 and Metro Police dispatch.', badge: 'CAD DISPATCH' },
  { id: 5, title: 'Tactical Multi-Monitor Layout Switcher', ruleText: 'Simulates multi-screen arrangements (Map, Incident Workspace, Dispatch Console, Event Ticker).', badge: 'MULTI-MONITOR' },
  { id: 6, title: 'Video Wall Auto-Cycling Presentation Mode', ruleText: 'Automated 120-second cycling view for large-screen command center video walls.', badge: 'VIDEO WALL' },
  { id: 7, title: 'Integrated Inter-Agency Command Chat', ruleText: 'Encrypted communication channel with SAPS, EMS, Metro Police, school principals, and guardians.', badge: 'COMMAND CHAT' },
  { id: 8, title: 'Immutable Cryptographic Audit Ledger', ruleText: 'Every dispatch action, note, and status change is hashed and logged for legal/court evidence.', badge: 'AUDIT LEDGER' },
];
