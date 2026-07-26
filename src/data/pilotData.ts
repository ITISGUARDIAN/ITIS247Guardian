import { 
  PilotModuleReadiness, 
  OatTestFlow, 
  PilotSchoolOnboarding, 
  TrainingUserCategory, 
  PilotDeviceReadiness, 
  PilotSupportReadiness, 
  PilotMetricsData, 
  PilotRolloutControl 
} from '../types';

export const initialPilotModuleReadiness: PilotModuleReadiness[] = [
  {
    id: 'MOD-01',
    moduleName: 'Parent Portal',
    category: 'User Portals',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'QA Lead - S. Ndlovu',
    lastChecked: '2026-07-26 01:00 UTC',
    notes: 'PWA responsive web, biometric SSO, and push notification streams verified.'
  },
  {
    id: 'MOD-02',
    moduleName: 'School Portal',
    category: 'User Portals',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'QA Lead - S. Ndlovu',
    lastChecked: '2026-07-26 01:00 UTC',
    notes: 'BLE attendance batch scanner and roster management OAT passed.'
  },
  {
    id: 'MOD-03',
    moduleName: 'National Command Centre (C3)',
    category: 'Core Platform',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'Ops Commander - M. Botha',
    lastChecked: '2026-07-26 01:05 UTC',
    notes: 'Multi-screen geospatial map, SOS dispatch queue, and responder dispatch validated.'
  },
  {
    id: 'MOD-04',
    moduleName: 'Emergency Responder App',
    category: 'User Portals',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'Field Test - Capt. K. Naidoo',
    lastChecked: '2026-07-26 01:10 UTC',
    notes: 'Flutter offline turn-by-turn routing, telemetry HUD, and tactical audio stream ready.'
  },
  {
    id: 'MOD-05',
    moduleName: 'Technician Provisioning App',
    category: 'User Portals',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'Hardware Lead - T. Patel',
    lastChecked: '2026-07-26 01:12 UTC',
    notes: 'BLE pairing, mTLS key injection, and firmware over-the-air (FOTA) verification passed.'
  },
  {
    id: 'MOD-06',
    moduleName: 'Government Portal',
    category: 'User Portals',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'Auditor - L. van der Merwe',
    lastChecked: '2026-07-26 01:15 UTC',
    notes: 'Multi-tenant analytics, POPIA compliance logs, and export pipelines verified.'
  },
  {
    id: 'MOD-07',
    moduleName: 'Executive Dashboard',
    category: 'User Portals',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'SRE - R. Mokoena',
    lastChecked: '2026-07-26 01:15 UTC',
    notes: 'Real-time KPI cards, SLA latency gauges, and heatmaps functioning at 60 FPS.'
  },
  {
    id: 'MOD-08',
    moduleName: 'Backend Microservices API',
    category: 'Core Platform',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'Principal Architect - D. Vance',
    lastChecked: '2026-07-26 01:18 UTC',
    notes: 'Rate-limited REST/gRPC endpoints with JWT RS256 token verification.'
  },
  {
    id: 'MOD-09',
    moduleName: 'PostgreSQL & TimescaleDB Database',
    category: 'Infrastructure & Ops',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'DBA - P. Pillay',
    lastChecked: '2026-07-26 01:20 UTC',
    notes: 'PostGIS spatial indexes and hypertable chunking verified with zero lock contention.'
  },
  {
    id: 'MOD-10',
    moduleName: 'IoT Wearable Gateway',
    category: 'Infrastructure & Ops',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'IoT Systems Eng - H. Muller',
    lastChecked: '2026-07-26 01:22 UTC',
    notes: 'mTLS handshake terminated at Envoy Proxy with 25,000 msg/sec buffer capacity.'
  },
  {
    id: 'MOD-11',
    moduleName: 'Emergency Notifications Engine',
    category: 'Core Platform',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'Infra Lead - J. Zulu',
    lastChecked: '2026-07-26 01:22 UTC',
    notes: 'FCM push notifications, SMS fallback gateway, and WebSocket fanout validated.'
  },
  {
    id: 'MOD-12',
    moduleName: 'Observability & Monitoring',
    category: 'Infrastructure & Ops',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'SRE Lead - R. Mokoena',
    lastChecked: '2026-07-26 01:25 UTC',
    notes: 'Prometheus metrics, OpenTelemetry traces, and Grafana alert thresholds active.'
  },
  {
    id: 'MOD-13',
    moduleName: 'CI/CD Deployment Pipeline',
    category: 'Infrastructure & Ops',
    readinessScore: 100,
    status: 'READY_FOR_PILOT',
    verifiedBy: 'DevOps Lead - A. Jacobs',
    lastChecked: '2026-07-26 01:25 UTC',
    notes: 'Helm chart zero-downtime rolling upgrades and automated rollback triggers validated.'
  }
];

export const initialOatTestFlows: OatTestFlow[] = [
  {
    id: 'OAT-FLOW-01',
    flowName: 'Parent Login & Child Lookup',
    personaRole: 'Parent',
    steps: [
      'Authenticate via Parent Portal with OTP / Biometric SSO',
      'Select linked learner profile (ID: LRN-99201)',
      'Query real-time bus geofence location and wear-band battery level',
      'Verify 100% data freshness and encrypted payload stream'
    ],
    status: 'PASSED',
    lastRunTimestamp: '2026-07-26 01:10 UTC',
    durationMs: 340,
    recordedBy: 'OAT Automated Harness',
    traceLogs: [
      '[OAT Trace] POST /api/v1/auth/parent-login -> 200 OK (14ms)',
      '[OAT Trace] GET /api/v1/learners/LRN-99201/telemetry -> 200 OK (18ms)',
      '[OAT Trace] Verified encrypted AES-256-GCM payload payload.'
    ]
  },
  {
    id: 'OAT-FLOW-02',
    flowName: 'School Attendance Scan & Learner Lookup',
    personaRole: 'School Admin / Teacher',
    steps: [
      'Open School Portal attendance scanning mode',
      'Ingest batch BLE beacon signals from 45 classroom wearable bands',
      'Cross-reference student roster in database hypertable',
      'Publish automated entry event notification to parent mobile app'
    ],
    status: 'PASSED',
    lastRunTimestamp: '2026-07-26 01:12 UTC',
    durationMs: 510,
    recordedBy: 'OAT Automated Harness',
    traceLogs: [
      '[OAT Trace] POST /api/v1/attendance/scan-batch -> 200 OK (45 records processed)',
      '[OAT Trace] SSE Event published: topic=attendance-updates -> 45 parents notified'
    ]
  },
  {
    id: 'OAT-FLOW-03',
    flowName: 'C3 Incident Creation & Tactical Dispatch',
    personaRole: 'C3 Operator',
    steps: [
      'Receive SOS distress trigger from Wearable Band (ID: ITIS-DEV-8842)',
      'Auto-generate critical incident ticket INC-2026-884',
      'Query PostGIS GIS engine for nearest available emergency responder unit',
      'Dispatch tactical mission payload to Responder mobile app'
    ],
    status: 'PASSED',
    lastRunTimestamp: '2026-07-26 01:15 UTC',
    durationMs: 280,
    recordedBy: 'OAT Automated Harness',
    traceLogs: [
      '[OAT Trace] WS Event: /ws/v1/dispatch-feed -> SOS Trigger Ingested',
      '[OAT Trace] PostGIS Query: ST_DWithin 5000m -> Unit RESP-04 Found (5.4ms)',
      '[OAT Trace] FCM Push Sent to Unit RESP-04 -> Delivered'
    ]
  },
  {
    id: 'OAT-FLOW-04',
    flowName: 'Responder Acceptance & Mission Status Update',
    personaRole: 'Emergency Responder',
    steps: [
      'Accept mission dispatch on Flutter Responder Tactical HUD',
      'Stream live GPS telemetry location back to C3 command map',
      'Arrive on scene and update incident state to MITIGATED',
      'Upload incident scene evidence with digital signature'
    ],
    status: 'PASSED',
    lastRunTimestamp: '2026-07-26 01:18 UTC',
    durationMs: 420,
    recordedBy: 'OAT Automated Harness',
    traceLogs: [
      '[OAT Trace] POST /api/v1/incidents/INC-2026-884/accept -> 200 OK',
      '[OAT Trace] Telemetry Stream: 5Hz GPS updates active',
      '[OAT Trace] PATCH /api/v1/incidents/INC-2026-884/status -> MITIGATED'
    ]
  },
  {
    id: 'OAT-FLOW-05',
    flowName: 'Technician Device Provisioning & Telemetry Handshake',
    personaRole: 'Technician',
    steps: [
      'Connect new ITIS-Band-Pro wearable device via BLE pairing',
      'Inject mTLS ECC-P256 client certificate & cryptographically sign device key',
      'Trigger 10s diagnostic heartbeat telemetry handshake',
      'Assign provisioned device to learner LRN-99205'
    ],
    status: 'PASSED',
    lastRunTimestamp: '2026-07-26 01:20 UTC',
    durationMs: 650,
    recordedBy: 'OAT Automated Harness',
    traceLogs: [
      '[OAT Trace] BLE Handshake: ECC Key Exchanged',
      '[OAT Trace] POST /api/v1/devices/provision -> mTLS Cert Issued',
      '[OAT Trace] DB Duplicate Assignment Check: PASSED (Unique MAC)'
    ]
  },
  {
    id: 'OAT-FLOW-06',
    flowName: 'Government Dashboard Access & POPIA Audit Reporting',
    personaRole: 'Gov Admin',
    steps: [
      'Authenticate with Gov Portal MFA credential',
      'Query national security posture & pilot school SLA compliance report',
      'Export anonymized audit ledger for Department of Basic Education audit',
      'Verify zero unencrypted PII leakage in compliance log stream'
    ],
    status: 'PASSED',
    lastRunTimestamp: '2026-07-26 01:22 UTC',
    durationMs: 310,
    recordedBy: 'OAT Automated Harness',
    traceLogs: [
      '[OAT Trace] GET /api/v1/gov/compliance-report -> 200 OK',
      '[OAT Trace] Cryptographic Audit Verification: 100% Integrity Verified'
    ]
  }
];

export const initialPilotSchools: PilotSchoolOnboarding[] = [
  {
    schoolId: 'SCH-GP-001',
    schoolName: 'Johannesburg High School for STEM',
    province: 'Gauteng',
    principalName: 'Dr. Thabo Mthembu',
    principalEmail: 'principal@jhbstem.edu.za',
    teachersCount: 42,
    learnersEnrolled: 1250,
    parentsInvited: 1180,
    devicesAssigned: 1210,
    attendanceReadiness: '100% VERIFIED',
    transportReadiness: 'ENABLED',
    emergencyContactsSet: true,
    onboardingStatus: 'ONBOARDED_ACTIVE'
  },
  {
    schoolId: 'SCH-WC-002',
    schoolName: 'Cape Town Central Primary School',
    province: 'Western Cape',
    principalName: 'Mrs. Sarah van Zyl',
    principalEmail: 'principal@ctprimary.co.za',
    teachersCount: 28,
    learnersEnrolled: 840,
    parentsInvited: 810,
    devicesAssigned: 825,
    attendanceReadiness: '100% VERIFIED',
    transportReadiness: 'ENABLED',
    emergencyContactsSet: true,
    onboardingStatus: 'ONBOARDED_ACTIVE'
  },
  {
    schoolId: 'SCH-KZN-003',
    schoolName: 'Durban Maritime & Technical Academy',
    province: 'KwaZulu-Natal',
    principalName: 'Mr. Sipho Dlamini',
    principalEmail: 'principal@durbantech.edu.za',
    teachersCount: 35,
    learnersEnrolled: 960,
    parentsInvited: 920,
    devicesAssigned: 940,
    attendanceReadiness: '95% READY',
    transportReadiness: 'CONFIGURED',
    emergencyContactsSet: true,
    onboardingStatus: 'STAGE_2_PROVISIONING'
  },
  {
    schoolId: 'SCH-GP-004',
    schoolName: 'Pretoria East Preparatory',
    province: 'Gauteng',
    principalName: 'Prof. Willem Coetzee',
    principalEmail: 'principal@pretoriaeast.co.za',
    teachersCount: 20,
    learnersEnrolled: 400,
    parentsInvited: 380,
    devicesAssigned: 390,
    attendanceReadiness: '100% VERIFIED',
    transportReadiness: 'ENABLED',
    emergencyContactsSet: true,
    onboardingStatus: 'ONBOARDED_ACTIVE'
  }
];

export const initialTrainingUserCategories: TrainingUserCategory[] = [
  {
    roleGroup: 'Parents',
    totalUsersTarget: 3290,
    completedTrainingCount: 3120,
    certifiedCount: 3050,
    untrainedCount: 170,
    materialsAccessedPercent: 96.2,
    certificationRatePercent: 94.8,
    status: 'TARGET_MET'
  },
  {
    roleGroup: 'School Administrators',
    totalUsersTarget: 24,
    completedTrainingCount: 24,
    certifiedCount: 24,
    untrainedCount: 0,
    materialsAccessedPercent: 100,
    certificationRatePercent: 100,
    status: 'FULLY_CERTIFIED'
  },
  {
    roleGroup: 'Teachers',
    totalUsersTarget: 125,
    completedTrainingCount: 125,
    certifiedCount: 125,
    untrainedCount: 0,
    materialsAccessedPercent: 100,
    certificationRatePercent: 100,
    status: 'FULLY_CERTIFIED'
  },
  {
    roleGroup: 'Command Center Operators',
    totalUsersTarget: 16,
    completedTrainingCount: 16,
    certifiedCount: 16,
    untrainedCount: 0,
    materialsAccessedPercent: 100,
    certificationRatePercent: 100,
    status: 'FULLY_CERTIFIED'
  },
  {
    roleGroup: 'Responders',
    totalUsersTarget: 48,
    completedTrainingCount: 48,
    certifiedCount: 48,
    untrainedCount: 0,
    materialsAccessedPercent: 100,
    certificationRatePercent: 100,
    status: 'FULLY_CERTIFIED'
  },
  {
    roleGroup: 'Field Technicians',
    totalUsersTarget: 12,
    completedTrainingCount: 12,
    certifiedCount: 12,
    untrainedCount: 0,
    materialsAccessedPercent: 100,
    certificationRatePercent: 100,
    status: 'FULLY_CERTIFIED'
  },
  {
    roleGroup: 'Gov Administrators',
    totalUsersTarget: 10,
    completedTrainingCount: 10,
    certifiedCount: 10,
    untrainedCount: 0,
    materialsAccessedPercent: 100,
    certificationRatePercent: 100,
    status: 'FULLY_CERTIFIED'
  }
];

export const initialPilotDevices: PilotDeviceReadiness[] = [
  {
    deviceId: 'ITIS-DEV-8841',
    model: 'ITIS-Band-Pro',
    activationState: 'ACTIVATED',
    batteryHealthPercent: 98,
    firmwareVersion: 'v3.2.0-pilot-release',
    gpsQualitySignal: 'EXCELLENT (12 Sats)',
    telemetryHandshake: 'ACTIVE_250ms',
    heartbeatState: 'SYNCHRONIZED',
    mTLSCertificateStatus: 'VALID_ECC_P256',
    assignedLearnerId: 'LRN-99201',
    duplicateProtectionStatus: 'PASS_UNIQUE_MAC'
  },
  {
    deviceId: 'ITIS-DEV-8842',
    model: 'ITIS-Band-Pro',
    activationState: 'ACTIVATED',
    batteryHealthPercent: 94,
    firmwareVersion: 'v3.2.0-pilot-release',
    gpsQualitySignal: 'EXCELLENT (12 Sats)',
    telemetryHandshake: 'ACTIVE_250ms',
    heartbeatState: 'SYNCHRONIZED',
    mTLSCertificateStatus: 'VALID_ECC_P256',
    assignedLearnerId: 'LRN-99202',
    duplicateProtectionStatus: 'PASS_UNIQUE_MAC'
  },
  {
    deviceId: 'ITIS-DEV-8843',
    model: 'ITIS-Guardian-Pod',
    activationState: 'ACTIVATED',
    batteryHealthPercent: 100,
    firmwareVersion: 'v3.2.0-pilot-release',
    gpsQualitySignal: 'EXCELLENT (12 Sats)',
    telemetryHandshake: 'ACTIVE_250ms',
    heartbeatState: 'SYNCHRONIZED',
    mTLSCertificateStatus: 'VALID_ECC_P256',
    assignedLearnerId: 'LRN-99203',
    duplicateProtectionStatus: 'PASS_UNIQUE_MAC'
  },
  {
    deviceId: 'ITIS-DEV-8844',
    model: 'ITIS-Vest-V2',
    activationState: 'ACTIVATED',
    batteryHealthPercent: 92,
    firmwareVersion: 'v3.2.0-pilot-release',
    gpsQualitySignal: 'GOOD (9 Sats)',
    telemetryHandshake: 'ACTIVE_500ms',
    heartbeatState: 'SYNCHRONIZED',
    mTLSCertificateStatus: 'VALID_ECC_P256',
    assignedLearnerId: 'LRN-99204',
    duplicateProtectionStatus: 'PASS_UNIQUE_MAC'
  },
  {
    deviceId: 'ITIS-DEV-8845',
    model: 'ITIS-Band-Pro',
    activationState: 'PROVISIONED',
    batteryHealthPercent: 100,
    firmwareVersion: 'v3.2.0-pilot-release',
    gpsQualitySignal: 'EXCELLENT (12 Sats)',
    telemetryHandshake: 'ACTIVE_250ms',
    heartbeatState: 'STANDBY',
    mTLSCertificateStatus: 'VALID_ECC_P256',
    assignedLearnerId: 'LRN-99205',
    duplicateProtectionStatus: 'PASS_UNIQUE_MAC'
  }
];

export const initialPilotSupportReadiness: PilotSupportReadiness = {
  deskAvailability: '24/7 Operations Duty Center',
  supportChannelPhone: '+27 62 430 4906',
  supportChannelEmail: 'itis.intergrated@gmail.com',
  knowledgeBaseArticlesCount: 48,
  onCallEngineersCount: 8,
  avgTicketSlaResponseMin: 5,
  escalationMatrixActive: true,
  incidentResponseContactsSet: true
};

export const initialPilotMetrics: PilotMetricsData = {
  activeLearners: 3450,
  activeSchools: 12,
  activeDevices: 3365,
  parentAdoptionRatePercent: 94.8,
  attendanceVerificationRatePercent: 99.2,
  telemetryUptimePercent: 99.98,
  avgIncidentResponseTimeMin: 3.8,
  deviceOfflineRatePercent: 0.4,
  pilotUserEngagementScore: 98.4,
  systemStabilityPercent: 99.9
};

export const initialPilotRolloutControl: PilotRolloutControl = {
  pilotGlobalEnabled: true,
  schoolActivationSchedule: [
    { schoolId: 'SCH-GP-001', schoolName: 'Johannesburg High STEM', activationDate: '2026-08-01', status: 'ACTIVE' },
    { schoolId: 'SCH-WC-002', schoolName: 'Cape Town Central Primary', activationDate: '2026-08-01', status: 'ACTIVE' },
    { schoolId: 'SCH-KZN-003', schoolName: 'Durban Maritime Academy', activationDate: '2026-08-05', status: 'SCHEDULED' },
    { schoolId: 'SCH-GP-004', schoolName: 'Pretoria East Preparatory', activationDate: '2026-08-01', status: 'ACTIVE' }
  ],
  activeProvinces: ['Gauteng', 'Western Cape', 'KwaZulu-Natal'],
  featureFlagGates: [
    { flagKey: 'FEATURE_FLAG_GEO_GEOFENCING', description: 'Real-time school & bus route geofencing alerts', enabled: true },
    { flagKey: 'FEATURE_FLAG_REALTIME_BLE_BEACON', description: 'BLE classroom attendance passive beaconing', enabled: true },
    { flagKey: 'FEATURE_FLAG_EMERGENCY_BROADCAST', description: 'National C3 multi-channel SOS emergency broadcast', enabled: true },
    { flagKey: 'FEATURE_FLAG_ANALYTICS_EXPORT', description: 'Government POPIA compliant audit reporting export', enabled: true }
  ],
  manualApprovalRequired: true,
  prePilotRollbackReady: true
};
