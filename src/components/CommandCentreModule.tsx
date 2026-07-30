import React, { useState, useEffect } from 'react';
import {
  Radio,
  ShieldAlert,
  Siren,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Phone,
  MessageSquare,
  Send,
  Volume2,
  VolumeX,
  Play,
  Pause,
  FastForward,
  RotateCcw,
  FileText,
  Download,
  Share2,
  Printer,
  ChevronRight,
  Sparkles,
  Activity,
  Layers,
  Compass,
  Truck,
  Building2,
  UserCheck,
  Zap,
  Lock,
  ArrowRight,
  Maximize2,
  Search,
  Filter,
  Check,
  XCircle,
  HelpCircle,
  Eye,
  Sliders,
  Award,
  Calendar,
  Crosshair,
  ShieldCheck,
  Shield,
  FileCode,
  Video,
  Image,
  Mic,
  Paperclip,
  Globe,
  BarChart3,
  GraduationCap,
  Car,
  SlidersHorizontal,
  RefreshCw,
  Plus
} from 'lucide-react';

// ==========================================
// TYPES FOR COMMAND CENTRE & CAD
// ==========================================

export type IncidentSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type IncidentStatus = 
  | 'SOS Triggered' 
  | 'AI Assessed' 
  | 'Operator Verified' 
  | 'Guardian Contacted' 
  | 'Responder Dispatched' 
  | 'En Route' 
  | 'On Scene' 
  | 'Transporting'
  | 'Resolved';

export type CADDispatchStatus = 
  | 'Available' 
  | 'Assigned' 
  | 'En Route' 
  | 'On Scene' 
  | 'Transporting' 
  | 'Cleared' 
  | 'Offline';

export interface MultiAgencyParticipant {
  agencyType: 'Learner' | 'Parent/Guardian' | 'School' | 'Transport Operator' | 'SAPS Responders' | 'EMS Responders' | 'Private Security' | 'Municipal Emergency';
  name: string;
  roleTitle: string;
  contactMethod: string;
  phone: string;
  status: string;
  eta: string;
  lastUpdate: string;
  assignedTasks: string[];
}

export interface DigitalEvidenceItem {
  id: string;
  type: 'photo' | 'video' | 'audio' | 'statement' | 'document' | 'gpstrack';
  title: string;
  filename: string;
  uploadedAt: string;
  uploadedBy: string;
  sha256Hash: string;
  fileSizeBytes: string;
  verificationBadge: string;
}

export interface SharedCollaborationEntry {
  id: string;
  timestamp: string;
  actor: string;
  agencyRole: 'SAPS' | 'EMS' | 'School Principal' | 'Parent' | 'Transport Operator' | 'Command Controller';
  message: string;
  verified: boolean;
}

export interface TacticalGISLayerState {
  learner: boolean;
  responders: boolean;
  schools: boolean;
  hospitals: boolean;
  policeStations: boolean;
  safeZones: boolean;
  roadClosures: boolean;
  traffic: boolean;
  geofences: boolean;
}

export interface OperationalResource {
  id: string;
  callsign: string;
  agency: 'SAPS Patrol' | 'EMS Ambulance' | 'Private Security' | 'School Officer' | 'ITIS Technician';
  operatorName: string;
  vehicleReg: string;
  status: CADDispatchStatus;
  currentAssignment: string;
  gpsPosition: { lat: number; lng: number };
  locationName: string;
  etaMinutes: number;
  radioChannel: string;
  batteryPct: number;
  lastPing: string;
}

export interface IncidentRecord {
  id: string;
  timeReceived: string;
  learnerId: string;
  learnerName: string;
  age: number;
  grade: string;
  schoolName: string;
  guardianName: string;
  guardianPhone: string;
  gpsAddress: string;
  coordinates: { lat: number; lng: number };
  riskLevel: IncidentSeverity;
  incidentType: string;
  status: IncidentStatus;
  currentStep: number; // 1 to 9
  assignedOperator: string;
  etaMinutes: number;
  medicalNotes: string;
  knownRisks: string[];
  wearableBatteryPct: number;
  wearableStatus: string;
  participants: MultiAgencyParticipant[];
  evidenceList: DigitalEvidenceItem[];
  collaborationLogs: SharedCollaborationEntry[];
  timeline: { timestamp: string; event: string; actor: string; type: 'sos' | 'ai' | 'operator' | 'comms' | 'dispatch' | 'status' }[];
  communicationLogs: { timestamp: string; channel: string; recipient: string; message: string; status: string }[];
  voicePrompts: string[];
  aiRecommendations: string;
}

// ==========================================
// INITIAL MOCK DATA
// ==========================================

const INITIAL_INCIDENTS: IncidentRecord[] = [
  {
    id: 'INC-2026-9901',
    timeReceived: '08:01:14 AM',
    learnerId: 'LRN-9021',
    learnerName: 'Siyabonga Khumalo',
    age: 15,
    grade: 'Grade 10-B',
    schoolName: 'Soweto Central High School',
    guardianName: 'Thandi Khumalo (Mother)',
    guardianPhone: '+27 82 455 9012',
    gpsAddress: 'R558 & Impala Rd, Soweto, Gauteng (-26.2651, 27.8402)',
    coordinates: { lat: -26.2651, lng: 27.8402 },
    riskLevel: 'Critical',
    incidentType: 'Wearable Panic SOS + Vehicle Kinematic Deceleration',
    status: 'Responder Dispatched',
    currentStep: 5,
    assignedOperator: 'Controller Sarah Connor (SAPS C3 Desk)',
    etaMinutes: 3,
    medicalNotes: 'Asthma inhaler required. Mild penicillin sensitivity.',
    knownRisks: ['2 SOS Activations in 48h', 'Geofence Exit Zone 4'],
    wearableBatteryPct: 18,
    wearableStatus: 'Active GPS Beaconing (10s Interval)',
    participants: [
      {
        agencyType: 'Learner',
        name: 'Siyabonga Khumalo',
        roleTitle: 'Scholar (Wearable WB-8821 Active)',
        contactMethod: 'Wearable GPS / BLE Beacon',
        phone: 'Direct Beaconing',
        status: 'SOS Active',
        eta: 'On Scene',
        lastUpdate: '08:01:14 AM — Panic button pressed twice',
        assignedTasks: ['Remain inside vehicle perimeter', 'Await tactical response']
      },
      {
        agencyType: 'Parent/Guardian',
        name: 'Thandi Khumalo',
        roleTitle: 'Mother & Primary Emergency Contact',
        contactMethod: 'Encrypted Push & Call',
        phone: '+27 82 455 9012',
        status: 'Notified & En Route',
        eta: '12 mins',
        lastUpdate: '08:01:20 AM — Confirmed receipt of automated alert',
        assignedTasks: ['Proceed to Soweto Central High main gate', 'Await SAPS arrival']
      },
      {
        agencyType: 'School',
        name: 'Mr. Sipho Mthembu',
        roleTitle: 'School Safety Officer & Vice Principal',
        contactMethod: 'Direct Radio / Desk Call',
        phone: '+27 11 982 1000',
        status: 'Gate Perimeter Secured',
        eta: 'On Scene',
        lastUpdate: '08:02:10 AM — Verified learner absent from morning roll call',
        assignedTasks: ['Secure school gate B', 'Notify class teacher']
      },
      {
        agencyType: 'Transport Operator',
        name: 'Metro Scholar Bus #GP-429',
        roleTitle: 'Driver: Sipho Ndlovu',
        contactMethod: 'In-Vehicle Telematics Mic',
        phone: '+27 72 331 8840',
        status: 'Stopped / Tire Puncture',
        eta: 'On Scene (R558)',
        lastUpdate: '08:01:50 AM — Safely pulled off to emergency shoulder',
        assignedTasks: ['Keep passengers on bus', 'Activate hazard warning indicators']
      },
      {
        agencyType: 'SAPS Responders',
        name: 'Soweto Patrol Unit #12',
        roleTitle: 'Warrant Officer M. Zulu',
        contactMethod: 'SAPS C3 Digital Radio Ch 4',
        phone: '+27 82 911 0012',
        status: 'En Route',
        eta: '4 mins',
        lastUpdate: '08:02:15 AM — Blue lights active on R558 Northbound',
        assignedTasks: ['Establish perimeter control', 'Verify learner physical safety']
      },
      {
        agencyType: 'EMS Responders',
        name: 'ER24 Ambulance #8',
        roleTitle: 'Paramedic Jane Botha',
        contactMethod: 'Metro EMS Gateway',
        phone: '+27 84 124 0008',
        status: 'Dispatched / Standby',
        eta: '7 mins',
        lastUpdate: '08:02:30 AM — Dispatched from Chris Hani Baragwanath station',
        assignedTasks: ['Prepare asthma inhalation nebulizer', 'Conduct field medical check']
      },
      {
        agencyType: 'Private Security',
        name: 'Fidelity ADT Tactical #4',
        roleTitle: 'Officer David Venter',
        contactMethod: 'Private Response API',
        phone: '+27 83 400 1122',
        status: 'En Route',
        eta: '3 mins',
        lastUpdate: '08:01:40 AM — First responder closest to coordinates',
        assignedTasks: ['Provide armed visual escort', 'Secure vehicle scene']
      },
      {
        agencyType: 'Municipal Emergency',
        name: 'Joburg Disaster Management',
        roleTitle: 'Metro Traffic Controller',
        contactMethod: 'JMPD Operations Desk',
        phone: '+27 11 375 5911',
        status: 'Monitoring Traffic Flow',
        eta: 'Immediate',
        lastUpdate: '08:02:45 AM — Diverting traffic around R558 Impala intersection',
        assignedTasks: ['Clear emergency corridor for ER24 ambulance']
      }
    ],
    evidenceList: [
      {
        id: 'EVD-9901-01',
        type: 'photo',
        title: 'Vehicle Shoulder Tire Damage Photo',
        filename: 'bus_tire_puncture_r558.jpg',
        uploadedAt: '08:03:12 AM',
        uploadedBy: 'Driver Sipho Ndlovu (Transport Operator)',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        fileSizeBytes: '2.4 MB',
        verificationBadge: 'Forensically Verified (SHA-256)'
      },
      {
        id: 'EVD-9901-02',
        type: 'audio',
        title: '911 Emergency Dispatch Audio Recording',
        filename: 'saps_c3_dispatch_080114.wav',
        uploadedAt: '08:01:45 AM',
        uploadedBy: 'Controller Sarah Connor (Command Centre)',
        sha256Hash: '8f3a9b1c2e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
        fileSizeBytes: '1.1 MB',
        verificationBadge: 'Tamper-Proof Audit Vault'
      },
      {
        id: 'EVD-9901-03',
        type: 'gpstrack',
        title: 'Wearable High-Frequency GPS Breadcrumbs',
        filename: 'siyabonga_gps_track_0800_0810.gpx',
        uploadedAt: '08:02:00 AM',
        uploadedBy: 'ITIS GIS Core Engine',
        sha256Hash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        fileSizeBytes: '480 KB',
        verificationBadge: 'Cryptographically Signed'
      }
    ],
    collaborationLogs: [
      {
        id: 'LOG-01',
        timestamp: '08:01:14 AM',
        actor: 'ITIS Automated Dispatch',
        agencyRole: 'Command Controller',
        message: 'Wearable Panic SOS activated. High risk threshold exceeded.',
        verified: true
      },
      {
        id: 'LOG-02',
        timestamp: '08:01:40 AM',
        actor: 'Controller Sarah Connor',
        agencyRole: 'Command Controller',
        message: 'Fidelity Tactical #4 dispatched. ETA 3 minutes.',
        verified: true
      },
      {
        id: 'LOG-03',
        timestamp: '08:02:10 AM',
        actor: 'Principal Sipho Mthembu',
        agencyRole: 'School Principal',
        message: 'School safety desk notified. Gate B cleared for emergency vehicles.',
        verified: true
      },
      {
        id: 'LOG-04',
        timestamp: '08:02:30 AM',
        actor: 'Sgt. M. Zulu',
        agencyRole: 'SAPS',
        message: 'SAPS Soweto Patrol #12 en route. ETA 4 mins. Sirens engaged.',
        verified: true
      },
      {
        id: 'LOG-05',
        timestamp: '08:03:00 AM',
        actor: 'Thandi Khumalo',
        agencyRole: 'Parent',
        message: 'Parent confirmed en route. Approaching from R558 South.',
        verified: true
      }
    ],
    timeline: [
      { timestamp: '08:01:14 AM', event: 'Wearable Panic SOS Button pressed twice', actor: 'Wearable WB-8821', type: 'sos' },
      { timestamp: '08:01:15 AM', event: 'GPS Location Verified via Vodacom eSIM tower triangulation', actor: 'GIS Core Engine', type: 'status' },
      { timestamp: '08:01:16 AM', event: 'AI Risk Score generated: 88/100 (Critical)', actor: 'ITIS AI Intelligence', type: 'ai' },
      { timestamp: '08:01:20 AM', event: 'Automated SMS & Push Notification dispatched to Guardian Thandi', actor: 'Comms Engine', type: 'comms' },
      { timestamp: '08:01:25 AM', event: 'Incident Accepted & Claimed by Operator Sarah Connor', actor: 'Operator Sarah', type: 'operator' },
      { timestamp: '08:01:40 AM', event: 'Tactical Armed Response Unit #4 Dispatched', actor: 'Operator Sarah', type: 'dispatch' }
    ],
    communicationLogs: [
      { timestamp: '08:01:20 AM', channel: 'SMS', recipient: 'Thandi Khumalo (+27 82 455 9012)', message: 'EMERGENCY ALERT: SOS button activated on Siyabonga Wearable band near R558 Impala Rd. Command centre is acting.', status: 'Delivered' },
      { timestamp: '08:02:10 AM', channel: 'Voice Call', recipient: 'Soweto Central High Principal', message: 'Notified school safety desk of pupil transit emergency.', status: 'Completed' }
    ],
    voicePrompts: [
      'Proceed north on Rivonia Road for 1.2 kilometers.',
      'In 300 metres, turn left onto Impala Road towards R558 bridge.',
      'Target vehicle position ahead on left shoulder.',
      'Guardian waiting near Gate B arrival area.'
    ],
    aiRecommendations: 'Dispatch Tactical Unit #4 via R558 South. High probability of scholar bus tire puncture. Notify SAPS Soweto West as secondary backup.'
  },
  {
    id: 'INC-2026-9894',
    timeReceived: '07:45:30 AM',
    learnerId: 'LRN-9042',
    learnerName: 'Lesedi Molefe',
    age: 11,
    grade: 'Grade 5-A',
    schoolName: 'Alexandra Primary Academy',
    guardianName: 'Kagiso Molefe (Father)',
    guardianPhone: '+27 71 889 4410',
    gpsAddress: '3rd Avenue & Vasco Da Gama, Alexandra, Johannesburg',
    coordinates: { lat: -26.1031, lng: 28.1012 },
    riskLevel: 'High',
    incidentType: 'Unannounced Geofence Breach & Gate Missed',
    status: 'Guardian Contacted',
    currentStep: 4,
    assignedOperator: 'Controller Mandla Ndlovu',
    etaMinutes: 8,
    medicalNotes: 'Severe Peanut Allergy. EpiPen carried in school bag.',
    knownRisks: ['Missed Gate Arrival Scan'],
    wearableBatteryPct: 64,
    wearableStatus: 'Connected (BLE Beacon Gate 2)',
    participants: [
      {
        agencyType: 'Learner',
        name: 'Lesedi Molefe',
        roleTitle: 'Scholar (Wearable WB-4102)',
        contactMethod: 'BLE Gate Beacon',
        phone: 'Beacon Active',
        status: 'Gate Scan Missed',
        eta: 'On Scene',
        lastUpdate: '07:45:30 AM — Geofence Exit Boundary #2 Triggered',
        assignedTasks: ['Verify presence with class teacher']
      },
      {
        agencyType: 'Parent/Guardian',
        name: 'Kagiso Molefe',
        roleTitle: 'Father & Primary Contact',
        contactMethod: 'Voice Call',
        phone: '+27 71 889 4410',
        status: 'Contacted',
        eta: 'Immediate',
        lastUpdate: '07:48:10 AM — Confirmed traffic delay during drop-off',
        assignedTasks: ['Confirm pupil drop-off with school desk']
      }
    ],
    evidenceList: [],
    collaborationLogs: [
      {
        id: 'LOG-ALEX-01',
        timestamp: '07:45:30 AM',
        actor: 'BLE Gateway Gate 2',
        agencyRole: 'School Principal',
        message: 'Learner missed morning gate scan window.',
        verified: true
      },
      {
        id: 'LOG-ALEX-02',
        timestamp: '07:48:10 AM',
        actor: 'Controller Mandla',
        agencyRole: 'Command Controller',
        message: 'Spoke with Kagiso Molefe. Pupil dropped off 5 minutes late.',
        verified: true
      }
    ],
    timeline: [
      { timestamp: '07:45:30 AM', event: 'Geofence Exit Boundary #2 Triggered', actor: 'BLE Gateway', type: 'sos' },
      { timestamp: '07:45:32 AM', event: 'AI Flag: Learner did not scan at morning gate arrival', actor: 'ITIS AI Intelligence', type: 'ai' },
      { timestamp: '07:48:10 AM', event: 'Operator Mandla initiated voice call to Guardian Kagiso', actor: 'Operator Mandla', type: 'comms' }
    ],
    communicationLogs: [
      { timestamp: '07:48:10 AM', channel: 'Voice Call', recipient: 'Kagiso Molefe', message: 'Father confirmed pupil dropped off 5 minutes late due to traffic.', status: 'Connected' }
    ],
    voicePrompts: [
      'Proceed east on Vasco Da Gama Way.',
      'Destination Alexandra Primary Academy Main Gate on right.'
    ],
    aiRecommendations: 'Verify school gate scanner log. High likelihood of delayed drop-off rather than abduction.'
  }
];

const MOCK_RESOURCES: OperationalResource[] = [
  {
    id: 'RES-SAPS-12',
    callsign: 'SAPS Soweto #12',
    agency: 'SAPS Patrol',
    operatorName: 'Warrant Officer M. Zulu',
    vehicleReg: 'BS-89-GP',
    status: 'En Route',
    currentAssignment: 'INC-2026-9901 (Siyabonga Khumalo)',
    gpsPosition: { lat: -26.2620, lng: 27.8380 },
    locationName: 'R558 Northbound, Soweto',
    etaMinutes: 4,
    radioChannel: 'SAPS C3 Ch 4',
    batteryPct: 98,
    lastPing: '2s ago'
  },
  {
    id: 'RES-FID-04',
    callsign: 'Tactical Unit #4',
    agency: 'Private Security',
    operatorName: 'Officer David Venter',
    vehicleReg: 'FD-44-GP',
    status: 'En Route',
    currentAssignment: 'INC-2026-9901 (Siyabonga Khumalo)',
    gpsPosition: { lat: -26.2640, lng: 27.8395 },
    locationName: 'Impala Rd Approach',
    etaMinutes: 3,
    radioChannel: 'Fidelity Tac 1',
    batteryPct: 92,
    lastPing: '1s ago'
  },
  {
    id: 'RES-ER24-08',
    callsign: 'ER24 Medic #8',
    agency: 'EMS Ambulance',
    operatorName: 'Paramedic Jane Botha',
    vehicleReg: 'ER-08-GP',
    status: 'Assigned',
    currentAssignment: 'INC-2026-9901 (Siyabonga Khumalo)',
    gpsPosition: { lat: -26.2500, lng: 27.8300 },
    locationName: 'Chris Hani Baragwanath Base',
    etaMinutes: 7,
    radioChannel: 'ER24 Metro 2',
    batteryPct: 100,
    lastPing: '4s ago'
  },
  {
    id: 'RES-SCH-01',
    callsign: 'Soweto High Safety Desk',
    agency: 'School Officer',
    operatorName: 'Mr. Sipho Mthembu',
    vehicleReg: 'Stationary Gate B',
    status: 'On Scene',
    currentAssignment: 'Gate Perimeter Control',
    gpsPosition: { lat: -26.2660, lng: 27.8420 },
    locationName: 'Soweto Central High Gate B',
    etaMinutes: 0,
    radioChannel: 'School VHF 1',
    batteryPct: 85,
    lastPing: '5s ago'
  },
  {
    id: 'RES-TECH-03',
    callsign: 'ITIS Field Tech #3',
    agency: 'ITIS Technician',
    operatorName: 'Engineer Thabo Mabena',
    vehicleReg: 'IT-03-GP',
    status: 'Available',
    currentAssignment: 'Routine BLE Gateway Inspection',
    gpsPosition: { lat: -26.2000, lng: 28.0400 },
    locationName: 'Johannesburg CBD Hub',
    etaMinutes: 15,
    radioChannel: 'ITIS Tech 1',
    batteryPct: 94,
    lastPing: '10s ago'
  }
];

const GUIDED_STEPS = [
  { step: 1, title: 'SOS Triggered', desc: 'Emergency signal received from wearable or vehicle' },
  { step: 2, title: 'AI Assessment', desc: 'Automated risk scoring and location verification' },
  { step: 3, title: 'Operator Verification', desc: 'Command Controller accepts and reviews alert' },
  { step: 4, title: 'Guardian Contact', desc: 'Parent or emergency contact notified via SMS/Voice' },
  { step: 5, title: 'Responder Dispatch', desc: 'Nearest SAPS / Tactical armed response dispatched' },
  { step: 6, title: 'Navigation Guidance', desc: 'Voice-guided routing transmitted to unit' },
  { step: 7, title: 'Learner Located', desc: 'Responder on scene & learner safety verified' },
  { step: 8, title: 'Incident Resolved', desc: 'Situation de-escalated and confirmed safe' },
  { step: 9, title: 'Report Generated', desc: 'Forensic PDF summary compiled & signed' }
];

export function CommandCentreModule() {
  const [incidents, setIncidents] = useState<IncidentRecord[]>(INITIAL_INCIDENTS);
  const [resources, setResources] = useState<OperationalResource[]>(MOCK_RESOURCES);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(INITIAL_INCIDENTS[0].id);
  const [activeTab, setActiveTab] = useState<'workspace' | 'cad_board' | 'replay_aar' | 'national_stats' | 'training_sim' | 'queue' | 'presentation'>('workspace');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [provinceFilter, setProvinceFilter] = useState<string>('Gauteng');

  // Tactical GIS Map Layers
  const [gisLayers, setGisLayers] = useState<TacticalGISLayerState>({
    learner: true,
    responders: true,
    schools: true,
    hospitals: true,
    policeStations: true,
    safeZones: true,
    roadClosures: false,
    traffic: true,
    geofences: true
  });

  // Comms Modal State
  const [showCommsModal, setShowCommsModal] = useState(false);
  const [commsChannel, setCommsChannel] = useState<'SMS' | 'Call' | 'WhatsApp' | 'Broadcast'>('SMS');
  const [commsRecipient, setCommsRecipient] = useState('');
  const [commsMessage, setCommsMessage] = useState('');

  // Evidence Upload Modal State
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [newEvidenceTitle, setNewEvidenceTitle] = useState('');
  const [newEvidenceType, setNewEvidenceType] = useState<'photo' | 'video' | 'audio' | 'statement' | 'document' | 'gpstrack'>('photo');

  // Shared Collaboration Log Input State
  const [collabInput, setCollabInput] = useState('');
  const [collabRole, setCollabRole] = useState<'SAPS' | 'EMS' | 'School Principal' | 'Parent' | 'Transport Operator' | 'Command Controller'>('Command Controller');

  // Command Replay State (Part 7)
  const [replayProgress, setReplayProgress] = useState<number>(35); // 0 to 100
  const [isReplaying, setIsReplaying] = useState<boolean>(false);
  const [replaySpeed, setReplaySpeed] = useState<number>(1); // 1x, 2x, 5x, 10x

  // Voice Guidance Player State
  const [isPlayingAudioPrompt, setIsPlayingAudioPrompt] = useState(false);

  // PDF Report Modal State
  const [showPdfReportModal, setShowPdfReportModal] = useState(false);

  // Training & Exercise Instructor State (Part 10)
  const [selectedScenario, setSelectedScenario] = useState('Missing Learner / Panic SOS');
  const [simExerciseStatus, setSimExerciseStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [operatorScore, setOperatorScore] = useState<number>(94);
  const [traineeName, setTraineeName] = useState('Trainee Operator Sarah Connor');
  const [instructorLogs, setInstructorLogs] = useState<string[]>([
    '08:00 Exercise Started — Missing Learner Scenario Initialized.',
    '08:01 Instructor injected roadblock event on R558.',
    '08:02 Trainee correctly re-routed SAPS Patrol #12 via Golden Highway.'
  ]);

  const activeIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  const audioPromptTimeoutRef = React.useRef<any>(null);

  useEffect(() => {
    return () => {
      if (audioPromptTimeoutRef.current) clearTimeout(audioPromptTimeoutRef.current);
    };
  }, []);

  // Replay Loop Effect
  useEffect(() => {
    let interval: any = null;
    if (isReplaying) {
      interval = setInterval(() => {
        setReplayProgress((prev) => {
          if (prev >= 100) {
            setIsReplaying(false);
            if (interval) clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 300 / replaySpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isReplaying, replaySpeed]);

  useEffect(() => {
    if (replayProgress >= 100 && isReplaying) {
      setIsReplaying(false);
    }
  }, [replayProgress, isReplaying]);

  // Speech TTS handler
  const handlePlayVoicePrompt = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlayingAudioPrompt(true);
      utterance.onend = () => setIsPlayingAudioPrompt(false);
      utterance.onerror = () => setIsPlayingAudioPrompt(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudioPrompt(true);
      if (audioPromptTimeoutRef.current) clearTimeout(audioPromptTimeoutRef.current);
      audioPromptTimeoutRef.current = setTimeout(() => setIsPlayingAudioPrompt(false), 3000);
    }
  };

  // Add Collaboration Entry handler (Part 5)
  const handlePostCollaborationEntry = () => {
    if (!collabInput.trim()) return;
    const newEntry: SharedCollaborationEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      actor: collabRole === 'Command Controller' ? 'Controller Sarah' : `${collabRole} Representative`,
      agencyRole: collabRole,
      message: collabInput.trim(),
      verified: true
    };

    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === activeIncident.id
          ? {
              ...inc,
              collaborationLogs: [...inc.collaborationLogs, newEntry]
            }
          : inc
      )
    );

    setCollabInput('');
  };

  // Add Evidence handler (Part 4)
  const handleAddEvidence = () => {
    if (!newEvidenceTitle.trim()) return;
    const mockHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newEvidence: DigitalEvidenceItem = {
      id: `EVD-${Date.now()}`,
      type: newEvidenceType,
      title: newEvidenceTitle.trim(),
      filename: `${newEvidenceTitle.toLowerCase().replace(/\s+/g, '_')}.${newEvidenceType === 'photo' ? 'jpg' : newEvidenceType === 'video' ? 'mp4' : 'pdf'}`,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      uploadedBy: 'Controller Sarah Connor (Command Centre)',
      sha256Hash: mockHash,
      fileSizeBytes: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
      verificationBadge: 'Forensically Verified (SHA-256)'
    };

    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === activeIncident.id
          ? {
              ...inc,
              evidenceList: [newEvidence, ...inc.evidenceList]
            }
          : inc
      )
    );

    setNewEvidenceTitle('');
    setShowEvidenceModal(false);
  };

  // Dispatch Status Change Handler (Part 2)
  const handleUpdateCADStatus = (resourceId: string, newStatus: CADDispatchStatus) => {
    setResources((prev) =>
      prev.map((res) => (res.id === resourceId ? { ...res, status: newStatus, lastPing: 'Just now' } : res))
    );
  };

  // Step advancement handler for Guided Flow
  const handleAdvanceGuidedStep = (nextStepNumber: number) => {
    const statusMap: Record<number, IncidentStatus> = {
      1: 'SOS Triggered',
      2: 'AI Assessed',
      3: 'Operator Verified',
      4: 'Guardian Contacted',
      5: 'Responder Dispatched',
      6: 'En Route',
      7: 'On Scene',
      8: 'Resolved',
      9: 'Resolved'
    };

    const newStepTitle = GUIDED_STEPS.find((s) => s.step === nextStepNumber)?.title || 'Step Advanced';

    const newTimelineEntry = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      event: `Incident status updated to: ${newStepTitle}`,
      actor: 'Command Controller',
      type: 'status' as const
    };

    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === activeIncident.id
          ? {
              ...inc,
              currentStep: nextStepNumber,
              status: statusMap[nextStepNumber] || inc.status,
              timeline: [...inc.timeline, newTimelineEntry]
            }
          : inc
      )
    );
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 border border-rose-500/30 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-300 text-3xs font-mono font-bold">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>24/7 COMMAND CENTRE & INCIDENT LIFECYCLE</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <span>Operations Emergency Coordination Centre</span>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-3xs font-mono font-bold rounded-full">
              LIVE DISPATCH READY
            </span>
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl">
            Multi-agency emergency coordination environment unifying SAPS, EMS, private security, schools, transport operators, and parents into a single operational picture with computer-aided dispatch, digital evidence management, and after-action reviews.
          </p>
        </div>

        {/* View Mode Selector Tabs */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center flex-wrap gap-1 font-mono text-xs shrink-0">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'workspace' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Incident Workspace</span>
          </button>

          <button
            onClick={() => setActiveTab('cad_board')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'cad_board' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4 text-amber-400" />
            <span>CAD & Resources</span>
          </button>

          <button
            onClick={() => setActiveTab('replay_aar')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'replay_aar' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>Replay & AAR</span>
          </button>

          <button
            onClick={() => setActiveTab('national_stats')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'national_stats' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-indigo-300" />
            <span>National Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('training_sim')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'training_sim' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-purple-300" />
            <span>Training & Exercise</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'queue' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Queue</span>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* LIVE OPERATIONS DASHBOARD BAR */}
      {/* ========================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono text-2xs">
        <div className="p-3 bg-slate-900 border border-rose-500/40 rounded-2xl text-center space-y-0.5 shadow-lg shadow-rose-500/5">
          <span className="text-slate-400 block uppercase text-3xs">Active SOS Alerts</span>
          <span className="text-xl font-black text-rose-400 animate-pulse">2</span>
          <span className="text-3xs text-rose-300 block">Critical Triage</span>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-0.5">
          <span className="text-slate-400 block uppercase text-3xs">Agencies Online</span>
          <span className="text-xl font-black text-amber-400">8 / 8</span>
          <span className="text-3xs text-amber-300 block">SAPS, EMS, Security</span>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-0.5">
          <span className="text-slate-400 block uppercase text-3xs">Responders Available</span>
          <span className="text-xl font-black text-emerald-400">18</span>
          <span className="text-3xs text-emerald-300 block">SAPS + Private</span>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-0.5">
          <span className="text-slate-400 block uppercase text-3xs">Responders En Route</span>
          <span className="text-xl font-black text-indigo-400">4</span>
          <span className="text-3xs text-slate-300 block">Active Dispatch</span>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-0.5">
          <span className="text-slate-400 block uppercase text-3xs">Evidence Items Vault</span>
          <span className="text-xl font-black text-cyan-400">{activeIncident.evidenceList.length}</span>
          <span className="text-3xs text-cyan-300 block">SHA-256 Hashed</span>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-0.5">
          <span className="text-slate-400 block uppercase text-3xs">Shared Log Entries</span>
          <span className="text-xl font-black text-purple-400">{activeIncident.collaborationLogs.length}</span>
          <span className="text-3xs text-purple-300 block">Multi-Agency Log</span>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-0.5">
          <span className="text-slate-400 block uppercase text-3xs">Vehicles Monitored</span>
          <span className="text-xl font-black text-blue-400">28</span>
          <span className="text-3xs text-slate-300 block">Scholar Buses</span>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-0.5">
          <span className="text-slate-400 block uppercase text-3xs">Avg Response Time</span>
          <span className="text-xl font-black text-emerald-400">3m 42s</span>
          <span className="text-3xs text-emerald-300 block">Benchmark &lt; 10m</span>
        </div>
      </div>

      {/* ========================================== */}
      {/* WORKSPACE VIEW (PART 1, 4, 5, 6) */}
      {/* ========================================== */}
      {activeTab === 'workspace' && (
        <div className="space-y-6">
          
          {/* Guided Incident Progress Bar */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-mono">
                <Compass className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Guided Incident Lifecycle — {activeIncident.id} ({activeIncident.learnerName})
                </h3>
              </div>
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full font-mono text-3xs font-bold">
                Current Step: {activeIncident.currentStep} of 9 ({GUIDED_STEPS[activeIncident.currentStep - 1]?.title})
              </span>
            </div>

            {/* Step Progress Nodes */}
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 font-mono text-3xs">
              {GUIDED_STEPS.map((s) => {
                const isCompleted = s.step < activeIncident.currentStep;
                const isCurrent = s.step === activeIncident.currentStep;
                return (
                  <button
                    key={s.step}
                    onClick={() => handleAdvanceGuidedStep(s.step)}
                    className={`p-2 rounded-xl border text-left transition flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-rose-500/20 border-rose-500/50 text-white shadow-lg shadow-rose-500/20 ring-1 ring-rose-500'
                        : isCompleted
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold">Step {s.step}</span>
                      {isCompleted && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>}
                    </div>
                    <span className="font-extrabold line-clamp-1">{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PART 1 — UNIFIED MULTI-AGENCY INCIDENT CONSOLE MATRIX */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Single Incident Workspace — Multi-Agency Unified Command Matrix
                </h3>
              </div>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-full font-mono text-3xs font-bold">
                8 Agencies Active on Incident {activeIncident.id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-2xs">
              {activeIncident.participants.map((p, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 relative group hover:border-slate-700 transition">
                  <div className="flex justify-between items-start border-b border-slate-900 pb-2">
                    <div>
                      <span className="text-3xs text-slate-400 font-bold uppercase block">{p.agencyType}</span>
                      <h4 className="text-sm font-bold text-white">{p.name}</h4>
                      <span className="text-3xs text-indigo-300 block">{p.roleTitle}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-3xs font-bold ${
                      p.status.includes('Active') || p.status.includes('SOS') ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      p.status.includes('En Route') || p.status.includes('Dispatched') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-3xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">ETA:</span>
                      <span className="text-white font-bold">{p.eta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contact Method:</span>
                      <span className="text-indigo-300">{p.contactMethod}</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800/80">
                      <span className="text-slate-500 block">Last Update:</span>
                      <span className="text-slate-300 block">{p.lastUpdate}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-3xs text-slate-400 uppercase font-bold block">Assigned Tasks:</span>
                    <ul className="space-y-0.5">
                      {p.assignedTasks.map((t, i) => (
                        <li key={i} className="text-3xs text-slate-300 flex items-center gap-1">
                          <span className="text-emerald-400">•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setCommsRecipient(`${p.name} (${p.agencyType})`);
                        setShowCommsModal(true);
                      }}
                      className="flex-1 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 rounded-xl transition text-3xs font-bold flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Contact Unit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TWO COLUMN WORKSPACE: PART 6 TACTICAL GIS + PART 4 EVIDENCE & PART 5 COLLABORATION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* TACTICAL GIS VIEW WITH LAYER TOGGLES (PART 6) */}
            <div className="lg:col-span-7 p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-400" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Tactical GIS Command View — Layer Control
                  </h3>
                </div>
                <span className="text-3xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  GPS Active (-26.2651, 27.8402)
                </span>
              </div>

              {/* Layer Toggle Switches */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-3 sm:grid-cols-5 gap-2 text-3xs">
                {Object.entries(gisLayers).map(([layerKey, enabled]) => (
                  <button
                    key={layerKey}
                    onClick={() => setGisLayers(prev => ({ ...prev, [layerKey as keyof TacticalGISLayerState]: !enabled }))}
                    className={`p-1.5 rounded-lg border text-center transition capitalize flex items-center justify-between ${
                      enabled ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span>{layerKey.replace(/([A-Z])/g, ' $1')}</span>
                    <span className={`w-2 h-2 rounded-full ${enabled ? 'bg-emerald-400' : 'bg-slate-700'}`}></span>
                  </button>
                ))}
              </div>

              {/* Simulated Map Container */}
              <div className="relative h-80 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
                {/* Background Map Grid Graphic */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                {/* Simulated Geofence Perimeter */}
                {gisLayers.geofences && (
                  <div className="absolute w-56 h-56 rounded-full border-2 border-dashed border-rose-500/50 bg-rose-500/5 animate-pulse flex items-center justify-center">
                    <span className="text-3xs text-rose-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded">500m Safety Geofence</span>
                  </div>
                )}

                {/* Target SOS Learner Marker */}
                {gisLayers.learner && (
                  <div className="absolute flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-rose-600/50 animate-bounce">
                      <Radio className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-200 border border-rose-500/50 text-3xs rounded-full font-bold shadow">
                      Siyabonga (SOS Active)
                    </span>
                  </div>
                )}

                {/* Responders Markers */}
                {gisLayers.responders && (
                  <>
                    <div className="absolute top-12 left-16 flex flex-col items-center gap-0.5">
                      <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-3xs shadow-md">
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-3xs bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">Fidelity #4 (ETA 3m)</span>
                    </div>

                    <div className="absolute bottom-12 right-16 flex flex-col items-center gap-0.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-3xs shadow-md">
                        <Siren className="w-4 h-4" />
                      </div>
                      <span className="text-3xs bg-slate-900 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">SAPS Unit #12 (ETA 4m)</span>
                    </div>
                  </>
                )}

                {/* Safe Zone Marker */}
                {gisLayers.safeZones && (
                  <div className="absolute top-10 right-20 flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2 py-1 rounded-xl text-3xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Safe Zone: Gate B Assembly</span>
                  </div>
                )}

                {/* Hospital Marker */}
                {gisLayers.hospitals && (
                  <div className="absolute bottom-8 left-12 flex items-center gap-1 bg-blue-950/80 border border-blue-500/40 text-blue-300 px-2 py-1 rounded-xl text-3xs">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span>Baragwanath Trauma Center</span>
                  </div>
                )}
              </div>
            </div>

            {/* DIGITAL EVIDENCE MANAGEMENT (PART 4) & SHARED COLLABORATION (PART 5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* DIGITAL EVIDENCE VAULT */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Digital Evidence Management Vault
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowEvidenceModal(true)}
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition text-3xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Attach Evidence</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {activeIncident.evidenceList.length === 0 ? (
                    <div className="p-4 bg-slate-950 rounded-2xl text-center text-slate-500 text-xs">
                      No digital evidence attached yet.
                    </div>
                  ) : (
                    activeIncident.evidenceList.map((e) => (
                      <div key={e.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-1 text-2xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            {e.type === 'photo' && <Image className="w-3.5 h-3.5 text-amber-400" />}
                            {e.type === 'audio' && <Mic className="w-3.5 h-3.5 text-indigo-400" />}
                            {e.type === 'gpstrack' && <MapPin className="w-3.5 h-3.5 text-rose-400" />}
                            {e.title}
                          </span>
                          <span className="text-3xs text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                            {e.verificationBadge}
                          </span>
                        </div>
                        <div className="text-3xs text-slate-400 flex justify-between">
                          <span>{e.filename} ({e.fileSizeBytes})</span>
                          <span>{e.uploadedAt}</span>
                        </div>
                        <div className="text-3xs text-slate-500 truncate font-mono bg-slate-900 p-1 rounded border border-slate-800">
                          SHA-256: {e.sha256Hash}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* SHARED OPERATIONAL LOG (PART 5) */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Shared Multi-Agency Operational Log
                    </h3>
                  </div>
                  <span className="text-3xs text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30">
                    Real-time Chronological
                  </span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto text-2xs">
                  {activeIncident.collaborationLogs.map((log) => (
                    <div key={log.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl space-y-0.5">
                      <div className="flex justify-between items-center text-3xs">
                        <span className="font-bold text-purple-300">{log.timestamp} • {log.actor} ({log.agencyRole})</span>
                        {log.verified && <span className="text-emerald-400"> Verified Entry</span>}
                      </div>
                      <p className="text-slate-200 text-3xs">{log.message}</p>
                    </div>
                  ))}
                </div>

                {/* Collaboration Log Entry Controls */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex gap-2">
                    <select
                      value={collabRole}
                      onChange={(e) => setCollabRole(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl p-2 text-3xs"
                    >
                      <option value="Command Controller">Command Controller</option>
                      <option value="SAPS">SAPS Officer</option>
                      <option value="EMS">EMS Paramedic</option>
                      <option value="School Principal">School Principal</option>
                      <option value="Parent">Parent / Guardian</option>
                      <option value="Transport Operator">Transport Driver</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Type official incident log update..."
                      value={collabInput}
                      onChange={(e) => setCollabInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handlePostCollaborationEntry()}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500"
                    />
                    <button
                      onClick={handlePostCollaborationEntry}
                      className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold"
                    >
                      Post
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* PART 2 & PART 3 — CAD DISPATCH & RESOURCE BOARD */}
      {/* ========================================== */}
      {activeTab === 'cad_board' && (
        <div className="space-y-6 font-mono">
          
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Computer-Aided Dispatch (CAD) & Resource Availability Board
                </h3>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full text-3xs font-bold">
                {resources.length} Operational Units Tracked
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-2xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-3xs">
                    <th className="p-3">Callsign & Reg</th>
                    <th className="p-3">Agency Type</th>
                    <th className="p-3">Operator</th>
                    <th className="p-3">CAD Dispatch Status</th>
                    <th className="p-3">Current Assignment</th>
                    <th className="p-3">Location & GPS</th>
                    <th className="p-3">ETA</th>
                    <th className="p-3">Radio Channel</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {resources.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-950/60 transition">
                      <td className="p-3 font-bold text-white">
                        <div>{res.callsign}</div>
                        <span className="text-3xs text-slate-500">{res.vehicleReg}</span>
                      </td>
                      <td className="p-3 text-slate-300">{res.agency}</td>
                      <td className="p-3 text-slate-300">{res.operatorName}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-3xs font-bold uppercase ${
                          res.status === 'En Route' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          res.status === 'On Scene' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          res.status === 'Available' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="p-3 text-indigo-300">{res.currentAssignment}</td>
                      <td className="p-3 text-slate-400">{res.locationName}</td>
                      <td className="p-3 text-emerald-400 font-bold">{res.etaMinutes === 0 ? 'On Scene' : `${res.etaMinutes} mins`}</td>
                      <td className="p-3 text-cyan-300">{res.radioChannel}</td>
                      <td className="p-3">
                        <select
                          value={res.status}
                          onChange={(e) => handleUpdateCADStatus(res.id, e.target.value as CADDispatchStatus)}
                          className="bg-slate-950 border border-slate-800 text-xs text-white rounded p-1"
                        >
                          <option value="Available">Set Available</option>
                          <option value="Assigned">Set Assigned</option>
                          <option value="En Route">Set En Route</option>
                          <option value="On Scene">Set On Scene</option>
                          <option value="Transporting">Set Transporting</option>
                          <option value="Cleared">Set Cleared</option>
                          <option value="Offline">Set Offline</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* PART 7 & PART 8 — COMMAND TIMELINE REPLAY & AFTER-ACTION REVIEW */}
      {/* ========================================== */}
      {activeTab === 'replay_aar' && (
        <div className="space-y-6 font-mono">
          
          {/* PART 7 COMMAND REPLAY PLAYER */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Command Timeline Replay Player — {activeIncident.id}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-3xs">
                <span>Speed:</span>
                {[1, 2, 5, 10].map((s) => (
                  <button
                    key={s}
                    onClick={() => setReplaySpeed(s)}
                    className={`px-2 py-0.5 rounded font-bold ${
                      replaySpeed === s ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Replay Scrubbing Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-3xs text-slate-400">
                <span>08:01:14 AM (SOS Start)</span>
                <span className="text-cyan-300 font-bold">Progress: {replayProgress}%</span>
                <span>08:15:00 AM (Closed)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={replayProgress}
                onChange={(e) => setReplayProgress(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setReplayProgress(0)}
                className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsReplaying(!isReplaying)}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold flex items-center gap-2"
              >
                {isReplaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isReplaying ? 'Pause Replay' : 'Start Replay'}</span>
              </button>
            </div>
          </div>

          {/* PART 8 EXECUTIVE AFTER-ACTION REVIEW (AAR) */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Executive After-Action Review (AAR) Dossier
                </h3>
              </div>
              <button
                onClick={() => setShowPdfReportModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-3xs font-bold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Export Signed AAR PDF</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-2xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-slate-400 uppercase text-3xs block">Dispatch Performance</span>
                <div className="text-xl font-bold text-emerald-400">3 mins 12 secs</div>
                <p className="text-slate-300 text-3xs">Target ETA was 10 minutes. Fidelity Tactical #4 arrived 6m 48s ahead of benchmark.</p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-slate-400 uppercase text-3xs block">Communication Effectiveness</span>
                <div className="text-xl font-bold text-cyan-400">100% Delivery Rate</div>
                <p className="text-slate-300 text-3xs">0 packet loss across Vodacom eSIM beaconing & guardian SMS channel.</p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-slate-400 uppercase text-3xs block">AI vs Human Alignment</span>
                <div className="text-xl font-bold text-indigo-400">98.4% Match</div>
                <p className="text-slate-300 text-3xs">AI recommended R558 Tactical unit; Controller confirmed & dispatched within 25 seconds.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-2xs">
              <span className="text-amber-400 font-bold uppercase text-3xs block">Lessons Learned & Improvement Actions</span>
              <ul className="space-y-1 text-slate-300 text-3xs">
                <li>• <strong>Lesson 1:</strong> Wearable battery was at 18% during emergency activation. Automated notification should alert parent at 25% boundary.</li>
                <li>• <strong>Action Taken:</strong> Updated wearable battery threshold policy in device management module.</li>
                <li>• <strong>Lesson 2:</strong> School gate BLE scanner recorded missing arrival scan 5 minutes prior to wearable SOS.</li>
                <li>• <strong>Action Taken:</strong> Configured AI decision engine to raise gate-missed flags to medium priority automatically.</li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* PART 9 — NATIONAL INCIDENT STATISTICS */}
      {/* ========================================== */}
      {activeTab === 'national_stats' && (
        <div className="space-y-6 font-mono">
          
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  National Safety & Incident Analytics Dashboard
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Republic of South Africa Provincial Operations</p>
              </div>

              {/* Filters */}
              <div className="flex gap-2 text-3xs">
                <select
                  value={provinceFilter}
                  onChange={(e) => setProvinceFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-1.5"
                >
                  <option value="Gauteng">Gauteng Province</option>
                  <option value="Western Cape">Western Cape Province</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal Province</option>
                  <option value="Eastern Cape">Eastern Cape Province</option>
                  <option value="All">All 9 Provinces</option>
                </select>
              </div>
            </div>

            {/* National Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-2xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-slate-400 text-3xs block uppercase">Incidents YTD ({provinceFilter})</span>
                <span className="text-2xl font-black text-white">1,240</span>
                <span className="text-3xs text-emerald-400 block">99.2% Resolved Safely</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-slate-400 text-3xs block uppercase">Avg Response Time</span>
                <span className="text-2xl font-black text-emerald-400">3m 42s</span>
                <span className="text-3xs text-emerald-300 block">Exceeds 10m SLA</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-slate-400 text-3xs block uppercase">Parent App Engagement</span>
                <span className="text-2xl font-black text-indigo-400">96.8%</span>
                <span className="text-3xs text-indigo-300 block">Active Daily Push</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-slate-400 text-3xs block uppercase">Dispatch Efficiency</span>
                <span className="text-2xl font-black text-cyan-400">98.1%</span>
                <span className="text-3xs text-cyan-300 block">First-Time Resolution</span>
              </div>
            </div>

            {/* Incident Categories Breakdown */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-white block">Incident Categories Breakdown</span>
              <div className="space-y-2 text-3xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Wearable Panic SOS Activations</span>
                    <span className="font-bold">42% (520 cases)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 w-[42%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Unannounced Geofence Breaches</span>
                    <span className="font-bold">31% (384 cases)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[31%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Transit Vehicle Delays & Punctures</span>
                    <span className="font-bold">19% (235 cases)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[19%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Low Battery Diagnostics</span>
                    <span className="font-bold">8% (101 cases)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[8%]"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* PART 10 — TRAINING & EXERCISE MODE */}
      {/* ========================================== */}
      {activeTab === 'training_sim' && (
        <div className="space-y-6 font-mono">
          
          <div className="p-6 bg-slate-900 border border-purple-500/30 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Instructor-Led Training & Simulation Centre
                </h3>
              </div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-3xs font-bold">
                Instructor Mode Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Exercise Setup */}
              <div className="space-y-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl text-2xs">
                <span className="text-purple-400 font-bold block uppercase text-3xs">1. Scenario Selector</span>
                <select
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2"
                >
                  <option value="Missing Learner / Panic SOS">Missing Learner / Panic SOS</option>
                  <option value="School Evacuation Exercise">School Evacuation Exercise</option>
                  <option value="Medical Emergency on Scholar Bus">Medical Emergency on Scholar Bus</option>
                  <option value="Bus Breakdown & Route Diversion">Bus Breakdown & Route Diversion</option>
                  <option value="Multi-Agency SAPS/EMS Joint Response">Multi-Agency SAPS/EMS Joint Response</option>
                </select>

                <div className="space-y-1">
                  <span className="text-slate-400 text-3xs block">Trainee Name:</span>
                  <input
                    type="text"
                    value={traineeName}
                    onChange={(e) => setTraineeName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2 text-2xs"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setSimExerciseStatus('running')}
                    className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-3xs"
                  >
                    Start Exercise
                  </button>
                  <button
                    onClick={() => setSimExerciseStatus('paused')}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-3xs"
                  >
                    Pause
                  </button>
                </div>
              </div>

              {/* Instructor Event Injections */}
              <div className="space-y-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl text-2xs">
                <span className="text-purple-400 font-bold block uppercase text-3xs">2. Inject Real-time Event</span>
                <div className="space-y-2">
                  <button
                    onClick={() => setInstructorLogs(prev => [`${new Date().toLocaleTimeString()} — Instructor injected Roadblock on R558`, ...prev])}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-left px-3 text-3xs flex items-center justify-between"
                  >
                    <span>Inject Roadblock / Traffic Surge</span>
                    <Plus className="w-3 h-3 text-purple-400" />
                  </button>

                  <button
                    onClick={() => setInstructorLogs(prev => [`${new Date().toLocaleTimeString()} — Instructor injected Comms Signal Drop`, ...prev])}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-left px-3 text-3xs flex items-center justify-between"
                  >
                    <span>Inject Radio Signal Drop</span>
                    <Plus className="w-3 h-3 text-purple-400" />
                  </button>

                  <button
                    onClick={() => setInstructorLogs(prev => [`${new Date().toLocaleTimeString()} — Instructor injected Weather Deterioration`, ...prev])}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-left px-3 text-3xs flex items-center justify-between"
                  >
                    <span>Inject Severe Weather Alert</span>
                    <Plus className="w-3 h-3 text-purple-400" />
                  </button>
                </div>
              </div>

              {/* Trainee Scoring Engine */}
              <div className="space-y-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl text-2xs">
                <span className="text-purple-400 font-bold block uppercase text-3xs">3. Trainee Scorecard</span>
                <div className="text-center p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-3xs block">Real-time Score</span>
                  <span className="text-3xl font-black text-emerald-400">{operatorScore} / 100</span>
                  <span className="text-3xs text-emerald-300 block">Grade A (Passing Standard)</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 text-3xs block">Mistakes Recorded:</span>
                  <div className="p-2 bg-slate-900 rounded-lg text-3xs text-amber-300 space-y-1">
                    <div>• 22s delay in parent SMS confirmation</div>
                    <div>• Secondary dispatch unit delayed by 15s</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Exercise Event Log */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-2xs">
              <span className="text-slate-400 uppercase text-3xs font-bold block">Exercise Audit Log</span>
              <div className="space-y-1 max-h-40 overflow-y-auto text-3xs text-slate-300">
                {instructorLogs.map((log, idx) => (
                  <div key={idx} className="p-1.5 bg-slate-900 rounded border border-slate-800/60">
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* QUEUE TAB VIEW */}
      {/* ========================================== */}
      {activeTab === 'queue' && (
        <div className="space-y-6 font-mono">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white">Live Incident Queue & Triage</h3>
            <div className="space-y-2">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => {
                    setSelectedIncidentId(inc.id);
                    setActiveTab('workspace');
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    inc.id === activeIncident.id
                      ? 'bg-rose-950/30 border-rose-500/50 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-3xs text-rose-400 font-bold">{inc.id} • {inc.timeReceived}</span>
                    <h4 className="text-sm font-bold text-white">{inc.learnerName} ({inc.schoolName})</h4>
                    <p className="text-xs text-slate-400">{inc.incidentType}</p>
                  </div>
                  <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold">
                    Open Workspace
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* COMMS MODAL */}
      {/* ========================================== */}
      {showCommsModal && (
        <div className="fixed inset-0 bg-slate-950/92 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 font-mono">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Send Emergency Communication</h3>
              <button onClick={() => setShowCommsModal(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-3xs text-slate-400 uppercase font-bold block">Recipient</span>
              <input
                type="text"
                value={commsRecipient}
                onChange={(e) => setCommsRecipient(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <span className="text-3xs text-slate-400 uppercase font-bold block">Message</span>
              <textarea
                value={commsMessage}
                onChange={(e) => setCommsMessage(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
                placeholder="Type dispatch or alert message..."
              />
            </div>

            <button
              onClick={() => {
                setShowCommsModal(false);
                setCommsMessage('');
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs"
            >
              Send Communication Log
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* EVIDENCE UPLOAD MODAL */}
      {/* ========================================== */}
      {showEvidenceModal && (
        <div className="fixed inset-0 bg-slate-950/92 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 font-mono">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Attach Digital Evidence File</h3>
              <button onClick={() => setShowEvidenceModal(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-3xs text-slate-400 uppercase font-bold block">Evidence Title</span>
              <input
                type="text"
                placeholder="e.g. Bus Tire Damage Photo"
                value={newEvidenceTitle}
                onChange={(e) => setNewEvidenceTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <span className="text-3xs text-slate-400 uppercase font-bold block">Evidence Type</span>
              <select
                value={newEvidenceType}
                onChange={(e) => setNewEvidenceType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2 text-xs"
              >
                <option value="photo">Photo / Camera Image</option>
                <option value="video">Dashcam Video Clip</option>
                <option value="audio">911 Voice Recording</option>
                <option value="statement">Witness Statement</option>
                <option value="document">Transit Permit PDF</option>
                <option value="gpstrack">GPX Telematics Breadcrumb</option>
              </select>
            </div>

            <button
              onClick={handleAddEvidence}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs"
            >
              Upload & Generate SHA-256 Hash
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* PDF REPORT MODAL */}
      {/* ========================================== */}
      {showPdfReportModal && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-3xl w-full space-y-6 font-mono text-xs text-slate-100 shadow-2xl my-8">
            
            {/* Report Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-3xs text-rose-400 font-bold block">OFFICIAL EMERGENCY INCIDENT DOSSIER</span>
                <h3 className="text-xl font-black text-white">{activeIncident.id} — Multi-Agency Forensic Summary</h3>
                <span className="text-3xs text-slate-400 block">Generated: {new Date().toLocaleString()}</span>
              </div>
              <button onClick={() => setShowPdfReportModal(false)} className="p-2 text-slate-400 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Executive Summary Box */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-3xs text-indigo-400 uppercase font-bold block">Executive Incident Summary</span>
              <p className="text-slate-300 text-2xs leading-relaxed">
                On {activeIncident.timeReceived}, Wearable Band SOS button activated near {activeIncident.gpsAddress}. Command Controller Sarah Connor verified GPS beaconing, dispatched Tactical Response Unit #4, and coordinated SAPS, EMS, and school authorities for safe resolution.
              </p>
            </div>

            {/* Learner & Responder Matrix */}
            <div className="grid grid-cols-2 gap-4 text-2xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-bold">Learner Details</span>
                <span className="text-white block">{activeIncident.learnerName} ({activeIncident.learnerId})</span>
                <span className="text-slate-400 block">{activeIncident.schoolName}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-bold">Evidence Hash Verification</span>
                <span className="text-cyan-400 block font-mono text-3xs truncate">SHA-256 Verified (3 Assets Vaulted)</span>
                <span className="text-emerald-400 block text-3xs">• Forensic Audit Chain Intact</span>
              </div>
            </div>

            {/* Forensic Timeline */}
            <div className="space-y-2">
              <span className="text-3xs text-slate-400 uppercase font-bold block">Audited Timeline Events</span>
              <div className="space-y-1 text-3xs max-h-40 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                {activeIncident.timeline.map((t, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-indigo-400">{t.timestamp}</span>
                    <span className="text-slate-300">{t.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Signatures Box */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-3 gap-4 text-center text-3xs">
              <div className="space-y-1 border-r border-slate-800 pr-2">
                <span className="text-slate-400 block">Command Controller</span>
                <span className="font-bold text-white block">Sarah Connor</span>
                <span className="text-emerald-400 block">[Digitally Signed]</span>
              </div>

              <div className="space-y-1 border-r border-slate-800 pr-2">
                <span className="text-slate-400 block">SAPS Dispatched Officer</span>
                <span className="font-bold text-white block">Sgt. M. Zulu</span>
                <span className="text-emerald-400 block">[Digitally Signed]</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block">Parent / Guardian</span>
                <span className="font-bold text-white block">{activeIncident.guardianName}</span>
                <span className="text-emerald-400 block">[Verified SMS OTP]</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-3xs text-slate-500 pt-2 border-t border-slate-800">
              <span>POPIA Act 4 of 2013 Compliant • Encryption SHA-256</span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition flex items-center gap-1.5 text-2xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
