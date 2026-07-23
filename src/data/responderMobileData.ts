export interface DispatchMission {
  id: string;
  cadTicketNumber: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'SOS_PANIC' | 'UNAUTHORIZED_EXIT' | 'GEOFENCE_BREACH' | 'MEDICAL_EMERGENCY' | 'HARDWARE_TAMPER';
  learnerId: string;
  learnerName: string;
  learnerPhoto: string;
  learnerAge: number;
  learnerGrade: string;
  schoolName: string;
  incidentAddress: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  estimatedEtaMinutes: number;
  operatorAssigned: string;
  guardianName: string;
  guardianMobile: string;
  riskScore: number;
  aiExplanation: string;
  medicalInfo: {
    bloodGroup: string;
    allergies: string[];
    medications: string[];
    medicalConditions: string[];
    preferredHospital: string;
    medicalAidNumber: string;
  };
  missionState:
    | 'DISPATCH_RECEIVED'
    | 'ACCEPTED'
    | 'EN_ROUTE'
    | 'ARRIVED_ON_SCENE'
    | 'SEARCHING'
    | 'CHILD_LOCATED'
    | 'MEDICAL_ASSISTANCE'
    | 'CHILD_SAFE'
    | 'MISSION_COMPLETE'
    | 'EVIDENCE_SUBMITTED';
  timeline: Array<{ time: string; event: string; actor: string }>;
  evidenceCaptured: Array<{
    id: string;
    type: 'PHOTO' | 'AUDIO_NOTE' | 'SIGNATURE' | 'OFFICER_NOTE';
    timestamp: string;
    sha256Hash: string;
    syncStatus: 'SYNCED' | 'QUEUED_OFFLINE';
    urlOrText: string;
  }>;
}

export interface NearbyResponder {
  id: string;
  callsign: string;
  agency: 'SAPS_10111' | 'GAUTENG_EMS' | 'METRO_POLICE' | 'PRIVATE_SECURITY' | 'SCHOOL_SECURITY';
  distanceKm: number;
  status: 'AVAILABLE' | 'EN_ROUTE' | 'ON_SCENE';
  officerName: string;
  contactNumber: string;
}

export const SAMPLE_DISPATCH_MISSIONS: DispatchMission[] = [
  {
    id: 'MIS-2026-001',
    cadTicketNumber: 'CAD-SOWETO-9910',
    timestamp: '08:14:02 AM Today',
    severity: 'CRITICAL',
    category: 'SOS_PANIC',
    learnerId: 'LNR-001',
    learnerName: 'Bulumko Mkhize',
    learnerPhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200',
    learnerAge: 12,
    learnerGrade: 'Grade 6B',
    schoolName: 'Soweto Central Primary School',
    incidentAddress: '142 Vilakazi St, Orlando West, Soweto, Johannesburg',
    latitude: -26.2485,
    longitude: 27.9082,
    distanceKm: 1.8,
    estimatedEtaMinutes: 3,
    operatorAssigned: 'Cmdr. J. van der Merwe (Op-01)',
    guardianName: 'Nompumelelo Mkhize',
    guardianMobile: '+27 82 555 0192',
    riskScore: 96,
    aiExplanation: 'Dual hardware button SOS panic triggered on STSAFE-A110 wearable with optical strap pressure pulse. High priority CAD dispatch.',
    medicalInfo: {
      bloodGroup: 'O Positive (O+)',
      allergies: ['Penicillin', 'Peanuts'],
      medications: ['Salbutamol Inhaler (Asthma)'],
      medicalConditions: ['Asthma (Requires Inhaler during stress)'],
      preferredHospital: 'Chris Hani Baragwanath Academic Hospital',
      medicalAidNumber: 'Discovery Health #902184912',
    },
    missionState: 'ACCEPTED',
    timeline: [
      { time: '08:14:02', event: 'SOS Panic Signal Received from wearable ITIS-nRF9160-8842', actor: 'WEARABLE_STSAFE' },
      { time: '08:14:03', event: 'CAD Engine created Ticket #CAD-SOWETO-9910', actor: 'ITIS_CAD' },
      { time: '08:14:10', event: 'Dispatch accepted by SAPS Unit GP-FS-04 (Capt. D. Naidoo)', actor: 'OFFICER_NAIDOO' },
    ],
    evidenceCaptured: [],
  },
  {
    id: 'MIS-2026-002',
    cadTicketNumber: 'CAD-UMLAZI-4412',
    timestamp: '08:02:15 AM Today',
    severity: 'HIGH',
    category: 'GEOFENCE_BREACH',
    learnerId: 'LNR-KZN-442',
    learnerName: 'Siyabonga Dlamini',
    learnerPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
    learnerAge: 15,
    learnerGrade: 'Grade 10A',
    schoolName: 'Umlazi Secondary School',
    incidentAddress: 'MR259 Road, Umlazi V-Section, Durban',
    latitude: -29.9632,
    longitude: 30.8812,
    distanceKm: 4.2,
    estimatedEtaMinutes: 6,
    operatorAssigned: 'Op. Z. Khumalo (Op-04)',
    guardianName: 'Sibusiso Dlamini',
    guardianMobile: '+27 83 444 8812',
    riskScore: 78,
    aiExplanation: 'Learner exited designated safe school corridor during morning study hours. Vehicle speed 18 km/h.',
    medicalInfo: {
      bloodGroup: 'A Positive (A+)',
      allergies: ['None'],
      medications: ['Epilim 200mg (Epilepsy)'],
      medicalConditions: ['Epilepsy'],
      preferredHospital: 'King Edward VIII Hospital',
      medicalAidNumber: 'GEMS #44102910',
    },
    missionState: 'DISPATCH_RECEIVED',
    timeline: [
      { time: '08:02:15', event: 'Geofence Exit Event logged at Umlazi Safe Corridor B', actor: 'GEOFENCE_ENGINE' },
    ],
    evidenceCaptured: [],
  },
];

export const SAMPLE_NEARBY_RESPONDERS: NearbyResponder[] = [
  { id: 'RSP-01', callsign: 'Gauteng ALS Ambulance 12', agency: 'GAUTENG_EMS', distanceKm: 0.8, status: 'EN_ROUTE', officerName: 'Paramedic S. Botha', contactNumber: '+27 83 911 0012' },
  { id: 'RSP-02', callsign: 'ADT Armed Response 1', agency: 'PRIVATE_SECURITY', distanceKm: 1.2, status: 'AVAILABLE', officerName: 'Officer B. Sithole', contactNumber: '+27 83 777 9900' },
  { id: 'RSP-03', callsign: 'Durban Metro Patrol 9', agency: 'METRO_POLICE', distanceKm: 2.5, status: 'ON_SCENE', officerName: 'Insp. T. Govender', contactNumber: '+27 84 555 1022' },
];

export const SA_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'nso', name: 'Sepedi' },
  { code: 'tn', name: 'Setswana' },
  { code: 'st', name: 'Sesotho' },
  { code: 'ts', name: 'Xitsonga' },
  { code: 'ss', name: 'siSwati' },
  { code: 've', name: 'Tshivenda' },
  { code: 'nr', name: 'isiNdebele' },
];

export const RESPONDER_AGENCIES = [
  { id: 'SAPS', name: 'SAPS 10111 Flying Squad / Tactical', badge: 'SAPS' },
  { id: 'EMS', name: 'Provincial Emergency Medical Services (EMS)', badge: 'EMS' },
  { id: 'METRO', name: 'Metro Police Department (JMPD / TMPD / CPS)', badge: 'METRO POLICE' },
  { id: 'SECURITY', name: 'PSIRA Registered Armed Security', badge: 'PRIVATE SEC' },
  { id: 'FIRE', name: 'Municipal Fire & Rescue Services', badge: 'FIRE & RESCUE' },
  { id: 'COMMUNITY', name: 'Community Safety Patrols / CPF', badge: 'CPF PATROL' },
];
