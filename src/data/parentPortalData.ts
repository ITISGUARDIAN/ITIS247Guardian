export interface ChildProfile {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  schoolName: string;
  avatarUrl: string;
  wearableSerial: string;
  batteryLevel: number;
  signalStrengthDbm: number;
  protectionStatus: 'OPTIMAL_PROTECTION' | 'IN_TRANSIT' | 'GEOFENCE_WARNING' | 'EMERGENCY_SOS';
  schoolStatus: 'IN_CLASSROOM' | 'IN_TRANSIT' | 'AT_HOME' | 'ABSENT';
  journeyStatus: 'ON_SCHEDULE' | 'DELAYED' | 'ROUTE_DEVIATION' | 'ARRIVED';
  threatLevel: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
  lastSeenLocation: string;
  lastSeenTime: string;
  lat: number;
  lng: number;
  speedKmh: number;
  headingDeg: number;
  gpsAccuracyMeters: number;
}

export interface JourneyEvent {
  id: string;
  time: string;
  title: string;
  location: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  type: 'DEPARTURE' | 'BOARDING' | 'SCHOOL_ARRIVAL' | 'CLASSROOM_SCAN' | 'DISMISSAL' | 'HOME_ARRIVAL';
  icon: string;
}

export interface AttendanceRecord {
  date: string;
  dayOfWeek: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED';
  timeIn: string;
  timeOut: string;
  gateLocation: string;
  nfcScanId: string;
}

export interface TransportDetails {
  vehicleReg: string;
  vehicleMakeModel: string;
  driverName: string;
  driverMobile: string;
  driverLicenseGrade: string;
  routeCode: string;
  routeDescription: string;
  currentSpeedKmh: number;
  speedLimitKmh: number;
  estimatedArrivalMinutes: number;
  routeComplianceScore: number;
}

export interface MedicalRecord {
  bloodGroup: string;
  allergies: string[];
  medications: string[];
  medicalAidName: string;
  medicalAidNumber: string;
  preferredHospital: string;
  emergencyDoctorName: string;
  emergencyDoctorPhone: string;
  criticalNotes: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  canPickupChild: boolean;
  photoUrl: string;
}

export interface ParentNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  category: 'SOS' | 'GEOFENCE' | 'ARRIVAL' | 'DEPARTURE' | 'ATTENDANCE' | 'SYSTEM';
  severity: 'HIGH' | 'MEDIUM' | 'INFO';
  read: boolean;
}

// SAMPLE CHILDREN PROFILES
export const SAMPLE_CHILDREN: ChildProfile[] = [
  {
    id: 'CH-2026-001',
    firstName: 'Bulumko',
    lastName: 'Mkhize',
    grade: 'Grade 6B',
    schoolName: 'Soweto Central Primary School',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150',
    wearableSerial: 'ITIS-nRF9160-8842',
    batteryLevel: 92,
    signalStrengthDbm: -68,
    protectionStatus: 'OPTIMAL_PROTECTION',
    schoolStatus: 'IN_CLASSROOM',
    journeyStatus: 'ON_SCHEDULE',
    threatLevel: 'NORMAL',
    lastSeenLocation: 'Classroom 6B, Soweto Central Primary',
    lastSeenTime: 'Just now (08:14:22)',
    lat: -26.2485,
    lng: 27.854,
    speedKmh: 0,
    headingDeg: 120,
    gpsAccuracyMeters: 1.8,
  },
  {
    id: 'CH-2026-002',
    firstName: 'Thandolwethu',
    lastName: 'Mkhize',
    grade: 'Grade 2A',
    schoolName: 'Soweto Central Primary School',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    wearableSerial: 'ITIS-nRF9160-9104',
    batteryLevel: 88,
    signalStrengthDbm: -72,
    protectionStatus: 'OPTIMAL_PROTECTION',
    schoolStatus: 'IN_CLASSROOM',
    journeyStatus: 'ON_SCHEDULE',
    threatLevel: 'NORMAL',
    lastSeenLocation: 'Junior Wing Gate A, Soweto Central Primary',
    lastSeenTime: '2 mins ago (08:12:05)',
    lat: -26.2488,
    lng: 27.8542,
    speedKmh: 0,
    headingDeg: 45,
    gpsAccuracyMeters: 2.1,
  },
];

// TODAY'S CHRONOLOGICAL JOURNEY TIMELINE
export const TODAY_JOURNEY_TIMELINE: JourneyEvent[] = [
  { id: 'EVT-01', time: '06:45 AM', title: 'Departed Safe Home Geofence', location: '142 Vilakazi St, Soweto', status: 'COMPLETED', type: 'DEPARTURE', icon: 'Home' },
  { id: 'EVT-02', time: '07:05 AM', title: 'Boarded Verified Transport Bus (GP 12 SA GP)', location: 'Bus Stop 4 - Soweto Highway', status: 'COMPLETED', type: 'BOARDING', icon: 'Bus' },
  { id: 'EVT-03', time: '07:38 AM', title: 'Arrived at School Geofence Corridor', location: 'Soweto Central Primary Outer Gate', status: 'COMPLETED', type: 'SCHOOL_ARRIVAL', icon: 'MapPin' },
  { id: 'EVT-04', time: '07:42 AM', title: 'Scanned Classroom Gate Reader', location: 'Classroom 6B NFC Reader', status: 'COMPLETED', type: 'CLASSROOM_SCAN', icon: 'CheckCircle2' },
  { id: 'EVT-05', time: '02:15 PM', title: 'Scheduled Afternoon School Dismissal', location: 'Main Quadrangle', status: 'PENDING', type: 'DISMISSAL', icon: 'Clock' },
  { id: 'EVT-06', time: '03:10 PM', title: 'Estimated Arrival at Safe Home', location: '142 Vilakazi St, Soweto', status: 'PENDING', type: 'HOME_ARRIVAL', icon: 'Home' },
];

// MONTHLY ATTENDANCE LOGS
export const MONTHLY_ATTENDANCE: AttendanceRecord[] = [
  { date: '2026-07-22', dayOfWeek: 'Wednesday', status: 'PRESENT', timeIn: '07:42 AM', timeOut: 'In Progress', gateLocation: 'Main Gate A', nfcScanId: 'NFC-8812-OK' },
  { date: '2026-07-21', dayOfWeek: 'Tuesday', status: 'PRESENT', timeIn: '07:38 AM', timeOut: '02:30 PM', gateLocation: 'Main Gate A', nfcScanId: 'NFC-8740-OK' },
  { date: '2026-07-20', dayOfWeek: 'Monday', status: 'LATE', timeIn: '08:05 AM', timeOut: '02:30 PM', gateLocation: 'Junior Gate B', nfcScanId: 'NFC-8622-LATE' },
  { date: '2026-07-17', dayOfWeek: 'Friday', status: 'PRESENT', timeIn: '07:35 AM', timeOut: '02:15 PM', gateLocation: 'Main Gate A', nfcScanId: 'NFC-8501-OK' },
  { date: '2026-07-16', dayOfWeek: 'Thursday', status: 'EXCUSED', timeIn: 'N/A (Medical)', timeOut: 'N/A', gateLocation: 'N/A', nfcScanId: 'EXCUSED-MED' },
];

// TRANSPORT & FLEET SPEC
export const ASSIGNED_TRANSPORT: TransportDetails = {
  vehicleReg: 'GP 12 SA GP',
  vehicleMakeModel: '2025 Toyota Quantum 16-Seater Scholar Bus',
  driverName: 'Sipho Zulu',
  driverMobile: '+27 72 345 6789',
  driverLicenseGrade: 'PrDP Public Transport Verified',
  routeCode: 'ROUTE-SOWETO-C04',
  routeDescription: 'Soweto East -> Diepkloof -> Soweto Central Primary',
  currentSpeedKmh: 0,
  speedLimitKmh: 60,
  estimatedArrivalMinutes: 0,
  routeComplianceScore: 99.4,
};

// MEDICAL RECORD SPEC
export const CHILD_MEDICAL_PROFILE: MedicalRecord = {
  bloodGroup: 'O Positive (O+)',
  allergies: ['Penicillin', 'Peanuts (Mild)'],
  medications: ['Salbutamol Inhaler (As needed for asthma)'],
  medicalAidName: 'Discovery Health Comprehensive',
  medicalAidNumber: '9021884102',
  preferredHospital: 'Chris Hani Baragwanath Academic Hospital',
  emergencyDoctorName: 'Dr. A. Patel (Pediatrician)',
  emergencyDoctorPhone: '+27 11 938 8000',
  criticalNotes: 'Child carries an asthma inhaler in school bag. School nurse has backup inhaler in administrative office.',
};

// EMERGENCY CONTACTS & AUTHORIZED PICKUPS
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { id: 'EC-01', name: 'Nompumelelo Mkhize', relationship: 'Mother / Primary Guardian', phone: '+27 83 456 7890', email: 'nompumelelo.mkhize@gmail.com', isPrimary: true, canPickupChild: true, photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120' },
  { id: 'EC-02', name: 'Sibusiso Mkhize', relationship: 'Father / Secondary Guardian', phone: '+27 82 987 6543', email: 'sibusiso.mkhize@gmail.com', isPrimary: false, canPickupChild: true, photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120' },
  { id: 'EC-03', name: 'Gogo Thandi Mkhize', relationship: 'Grandmother (Authorized Pickup)', phone: '+27 71 222 3333', email: 'thandi.mkhize@gmail.com', isPrimary: false, canPickupChild: true, photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120' },
];

// PUSH NOTIFICATIONS HISTORY
export const PARENT_NOTIFICATIONS: ParentNotification[] = [
  { id: 'NOTIF-001', timestamp: '07:42 AM Today', title: 'Safe Classroom Arrival Confirmed', message: 'Bulumko scanned into Classroom 6B at Soweto Central Primary.', category: 'ARRIVAL', severity: 'INFO', read: false },
  { id: 'NOTIF-002', timestamp: '07:05 AM Today', title: 'Boarded Authorized Scholar Bus', message: 'Bulumko boarded vehicle GP 12 SA GP with driver Sipho Zulu.', category: 'DEPARTURE', severity: 'INFO', read: true },
  { id: 'NOTIF-003', timestamp: '06:45 AM Today', title: 'Departed Safe Home Corridor', message: 'Bulumko exited 142 Vilakazi St safe home geofence boundary.', category: 'GEOFENCE', severity: 'INFO', read: true },
  { id: 'NOTIF-004', timestamp: '03:12 PM Yesterday', title: 'Returned Safe Home Arrival', message: 'Bulumko arrived safely at home geofence.', category: 'ARRIVAL', severity: 'INFO', read: true },
];

// MANDATORY PARENT PORTAL RULES
export const CRITICAL_PARENT_PORTAL_RULES = [
  { id: 1, title: 'Real-Time WebSockets Telemetry Bridge', ruleText: 'Consumes real-time device battery, GPS coordinates, and speed telemetry with sub-250ms update latency.', badge: 'LIVE WEBSOCKET' },
  { id: 2, title: 'No Duplicate Backend Business Logic', ruleText: 'Consumes backend APIs strictly designed in Prompts 019–028 and 036.', badge: 'PROMPT 019-036 CONSUMER' },
  { id: 3, title: 'Integrated Multi-Child Switcher', ruleText: 'Allows parents with multiple children in school to toggle telemetry and attendance with one click.', badge: 'MULTI-CHILD' },
  { id: 4, title: 'Instant Panic & One-Touch Call Buttons', ruleText: 'Features instant call buttons to primary guardians, school admin, driver, and emergency SAPS dispatch.', badge: 'ONE-TOUCH CALL' },
  { id: 5, title: 'Interactive Map Boundary & Safe Zones', ruleText: 'Renders Home, School, Transport Route, and Geofence Boundaries with accuracy radii and vehicle markers.', badge: 'GEOFENCE MAP' },
  { id: 6, title: 'Complete Child Health & Medical Card', ruleText: 'Contains blood group, severe allergies, chronic medication, medical aid number, and preferred hospital.', badge: 'MEDICAL CARD' },
  { id: 7, title: 'Pickup Person Authority & NFC Verifier', ruleText: 'Lists authorized guardians who hold pickup rights with biometric and photo verification tags.', badge: 'PICKUP VERIFIED' },
  { id: 8, title: 'Chronological Daily Journey Timeline', ruleText: 'Step-by-step audit log of home departure, bus boarding, school gate scan, classroom scan, and home return.', badge: 'JOURNEY TIMELINE' },
  { id: 9, title: 'Push Notification Category Filters', ruleText: 'Real-time alert history filtered by SOS, Geofence, Arrival, Departure, and Attendance categories.', badge: 'ALERTS FILTER' },
  { id: 10, title: 'WCAG AA Compliant Light/Dark Modes', ruleText: 'Ensures supreme legibility, responsive mobile navigation, and offline cache readiness.', badge: 'WCAG AA COMPLIANT' },
];
