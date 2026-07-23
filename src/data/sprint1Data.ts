import {
  ThreatLevel,
  UserStory,
  FunctionalRequirement,
  AcceptanceCriterion,
  Sprint1ModuleSpec,
  DatabaseTableSpec,
  RestApiSpec,
  RealtimeTopicSpec,
  ProcessFlowSpec,
  OperationalSpecSection
} from '../types/sprint1';

export const VISION_2035 = {
  title: "Vision 2035",
  quote: "To become Africa's most trusted learner safety platform, ensuring that every child protected by an ITIS GPS device can be located, monitored responsibly, and supported through coordinated emergency response whenever they are at risk.",
  focus: "Outcome-driven child protection across urban, rural, and cross-border South African and African educational routes."
};

// 1. SPRINT GOALS
export const SPRINT_GOALS = [
  "Enable complete registration & onboarding for schools, parents, learners, and IoT GPS wearable devices.",
  "Establish 1:1 cryptographic device-to-learner mapping and authentication.",
  "Ingest sub-second real-time GPS telemetry from IoT wearables over MQTT/TCP protocols.",
  "Render live learner positions and geofence safe zones on command centre maps and parent portals.",
  "Deploy the Child Safety Decision Engine to detect geofence deviations and SOS triggers.",
  "Implement multi-channel alerts (APNS/FCM push, SMS, Command Wall pop-ups) without notification floods.",
  "Coordinate emergency response dispatch with configured response partners.",
  "Maintain immutable SHA-256 sealed digital evidence audit logs for SAPS & evidentiary requirements."
];

// 2. USER STORIES
export const USER_STORIES: UserStory[] = [
  {
    id: 'US-01',
    role: 'School Administrator',
    want: 'register our school, define school geofences, and enroll learners',
    soThat: 'we can monitor learner arrivals, departures, and bus transit safety in real time.',
    priority: 'Must Have'
  },
  {
    id: 'US-02',
    role: 'Parent / Guardian',
    want: 'pair my child\'s ITIS GPS wearable to my phone and view live journey radar',
    soThat: 'I know my child arrived safely at school and receive instant alerts if they leave designated corridors.',
    priority: 'Must Have'
  },
  {
    id: 'US-03',
    role: 'Learner in Distress',
    want: 'press the physical SOS button on my wearable or send an "I\'m Safe" check-in',
    soThat: 'my parents and command centre operators are notified immediately with my accurate live location.',
    priority: 'Must Have'
  },
  {
    id: 'US-04',
    role: 'Command Centre Operator',
    want: 'a high-density tactical map displaying active threats prioritized by level (Red, Orange, Amber)',
    soThat: 'I can dispatch emergency response coordination partners within seconds of a critical event.',
    priority: 'Must Have'
  },
  {
    id: 'US-05',
    role: 'SAPS / Audit Officer',
    want: 'to download cryptographically sealed PDF/JSON evidence dockets',
    soThat: 'post-incident legal investigations have tamper-evident proof of location, time, and responder actions.',
    priority: 'Should Have'
  }
];

// 3. FUNCTIONAL REQUIREMENTS
export const FUNCTIONAL_REQUIREMENTS: FunctionalRequirement[] = [
  {
    id: 'FR-REG-01',
    category: 'Identity & Registration',
    title: 'School, Parent, & Learner Registration',
    description: 'System must support multi-tenant organization onboarding with POPIA-compliant data validation and OTP phone verification.'
  },
  {
    id: 'FR-MAP-02',
    category: 'Hardware Pairing',
    title: 'Cryptographic Device-to-Learner Binding',
    description: '1:1 mapping between IoT device IMEI/mTLS certificate and learner profile. Prevents duplicate or orphaned device bindings.'
  },
  {
    id: 'FR-TEL-03',
    category: 'Telemetry Ingestion',
    title: 'High-Throughput GPS Stream Ingestion',
    description: 'Ingest NMEA/JSON telemetry over MQTT QoS 1 and TCP sockets at up to 50,000 pings/sec with <50ms transport latency.'
  },
  {
    id: 'FR-GEO-04',
    category: 'Geofencing Engine',
    title: 'Dynamic Safe Corridor & Polygon Matching',
    description: 'Evaluate PostGIS spatial polygons for school grounds, transit corridors, and homes. Detect ENTER, EXIT, and DWELL events.'
  },
  {
    id: 'FR-SOS-05',
    category: 'SOS & Decision Engine',
    title: 'Child Safety Decision Engine Evaluation',
    description: 'Process telemetry through 5 validation stages (Device, Location, Movement, AI Risk, Decision) to determine Threat Level (Green, Amber, Orange, Red).'
  },
  {
    id: 'FR-NOT-06',
    category: 'Notification Engine',
    title: 'Multi-Stakeholder Emergency Alerting',
    description: 'Dispatch high-priority FCM/APNS push notifications, SMS fallback, and Command Wall pop-ups within 300ms of Level 4 Red classification.'
  },
  {
    id: 'FR-AUD-07',
    category: 'Forensic Audit',
    title: 'Tamper-Evident Evidence Ledger',
    description: 'Log every raw GPS point, decision score, operator keypress, and partner dispatch with SHA-256 cryptographic merkle digests.'
  }
];

// 4. THREAT LEVELS
export const THREAT_LEVELS: ThreatLevel[] = [
  {
    level: 'Green',
    code: 'LEVEL_1_NORMAL',
    scenario: 'Normal journey on designated route & schedule',
    action: 'Continue standard routine telemetry monitoring (5s interval)',
    colorClass: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300',
    badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    level: 'Amber',
    code: 'LEVEL_2_ADVISORY',
    scenario: 'Geofence deviation, minor route anomaly, unexpected delay',
    action: 'Notify parent via push notification; elevate telemetry sampling to 2s',
    colorClass: 'border-amber-500/50 bg-amber-950/30 text-amber-300',
    badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  {
    level: 'Orange',
    code: 'LEVEL_3_ELEVATED',
    scenario: 'Device offline in high-risk zone, prolonged speed anomaly, multi-sensor trigger',
    action: 'Alert Command Centre wall, trigger supervisor review, notify designated school contacts',
    colorClass: 'border-orange-500/50 bg-orange-950/30 text-orange-300',
    badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  },
  {
    level: 'Red',
    code: 'LEVEL_4_CRITICAL',
    scenario: 'SOS button press, high-confidence AI kidnapping model match, panic event',
    action: 'Highest-priority incident docket, continuous sub-second live GPS tracking, Emergency Response Coordination Layer dispatch',
    colorClass: 'border-red-500/50 bg-red-950/30 text-red-300',
    badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30'
  }
];

export const QUICK_STATUS_MESSAGES = [
  { id: 'SAFE', label: "I'm Safe", type: 'reassurance', desc: 'Sends quick GPS ping and green status to parent app.' },
  { id: 'LATE', label: "I'm Running Late", type: 'advisory', desc: 'Updates expected arrival window by +15 mins.' },
  { id: 'BUS_DELAY', label: "School Bus Delayed", type: 'advisory', desc: 'Correlates with school transport cluster data.' },
  { id: 'PICKUP_CHANGED', label: "Authorized Pickup Changed", type: 'verification', desc: 'Requires parent OTP or biometric approval.' }
];

export const EVIDENCE_CHAIN_FIELDS = [
  { field: 'GPS Coordinates & Altitude', type: 'WGS84 Lat/Lng/Alt', desc: 'Raw satellite and cellular trilateration fixes.' },
  { field: 'UTC Timestamp (NTP Sync)', type: 'ISO-8601 Nanoseconds', desc: 'Cryptographically timestamped server ingestion clock.' },
  { field: 'Device Hardware State', type: 'Hardware Hash / IMEI', desc: 'Battery %, signal RSSI, firmware version, tamper sensor flag.' },
  { field: 'AI Risk Score Snapshot', type: '0.00 - 100.00 Index', desc: 'Model version, spatial vector feature weights, confidence interval.' },
  { field: 'Geofence Context', type: 'Polygon GeoJSON UUID', desc: 'Distance to active safe zone boundary and route corridor.' },
  { field: 'Notification Audit Log', type: 'Push/SMS Dispatch ID', desc: 'Delivery receipts for APNS, FCM, and SMS gateways.' },
  { field: 'Command Operator Log', type: 'Operator ID & Keypress', desc: 'Timestamped supervisor notes, voice calls, and manual overrides.' },
  { field: 'Forensic Hash Digest', type: 'SHA-256 Sealed Hash', desc: 'Cryptographically sealed docket for SAPS & evidentiary court disclosure.' }
];

// 5. BACKEND MODULE BREAKDOWN
export const SPRINT1_BACKEND_MODULES: Sprint1ModuleSpec[] = [
  {
    id: 'MOD-BE-01',
    name: 'TelemetryIngestionService',
    type: 'Backend',
    description: 'High-throughput MQTT/TCP ingestion pipeline capable of parsing 50,000+ simultaneous wearable pings.',
    keyResponsibilities: [
      'Parse NMEA 0183 & custom binary IoT hardware protocols',
      'Validate device IMEI authentication tokens and mTLS certificates',
      'Publish validated raw telemetry to TimescaleDB and Redis Pub/Sub stream'
    ]
  },
  {
    id: 'MOD-BE-02',
    name: 'ChildSafetyDecisionEngine',
    type: 'Backend',
    description: 'The core operational brain of ITIS evaluating telemetry, geofences, and AI threat scores before triggering alerts.',
    keyResponsibilities: [
      'Sequential pipeline: Device Validation → Location Validation → Movement Analysis → AI Risk Assessment',
      'Classify threat levels: Green (Level 1), Amber (Level 2), Orange (Level 3), Red (Level 4)',
      'Manage deduplication windows and suppress false positive alert floods'
    ]
  },
  {
    id: 'MOD-BE-03',
    name: 'EmergencyResponseCoordinationLayer',
    type: 'Backend',
    description: 'Coordinates dispatch with verified emergency partners according to configured SLA agreements.',
    keyResponsibilities: [
      'Query spatial PostGIS index for closest active response vehicles',
      'Securely transmit encrypted incident payloads to partner API endpoints',
      'Stream live location updates and continuously recalculate arrival ETAs'
    ]
  },
  {
    id: 'MOD-BE-04',
    name: 'ForensicEvidenceEngine',
    type: 'Backend',
    description: 'Immutable ledger for recording every incident variable, telemetry point, operator action, and cryptographic hash.',
    keyResponsibilities: [
      'Generate SHA-256 merkle proof of incident telemetry history',
      'Export court-admissible PDF/JSON dockets for SAPS law enforcement',
      'Enforce POPIA data protection compliance and access token expiration'
    ]
  },
  {
    id: 'MOD-BE-05',
    name: 'IdentityManagementService',
    type: 'Backend',
    description: 'Multi-tenant RBAC service managing schools, parents, learners, and role-based JWT access tokens.',
    keyResponsibilities: [
      'Manage school organization hierarchy and parent/learner authorization',
      'Issue scoped JWT tokens for Web dashboards, Mobile apps, and IoT devices',
      'Handle POPIA consent flags and biometric key exchanges'
    ]
  },
  {
    id: 'MOD-BE-06',
    name: 'GeofenceSpatialService',
    type: 'Backend',
    description: 'PostGIS spatial geometry microservice managing dynamic polygon geofences and transit corridors.',
    keyResponsibilities: [
      'Perform ST_Contains and ST_DWithin spatial query evaluations',
      'Manage route corridors with dynamic buffer zones (e.g. 100m street boundary)',
      'Trigger ENTER, EXIT, and DWELL events for the Decision Engine'
    ]
  }
];

// 6. FRONTEND MODULE BREAKDOWN
export const SPRINT1_FRONTEND_MODULES: Sprint1ModuleSpec[] = [
  {
    id: 'MOD-FE-01',
    name: 'CommandCentreTacticalMap',
    type: 'Frontend',
    description: 'High-density WebGL tactical map rendering active learner markers, threat heatmaps, and responder units.',
    keyResponsibilities: [
      'Sub-second canvas updates using Mapbox GL / Deck.gl',
      'Filter view by threat level (Green, Amber, Orange, Red)',
      'One-click incident docket drawer opening and camera stream overlay'
    ]
  },
  {
    id: 'MOD-FE-02',
    name: 'IncidentDocketWorkspace',
    type: 'Frontend',
    description: 'Real-time incident management view for command centre operators handling active Level 3 & Level 4 threats.',
    keyResponsibilities: [
      'Live audio/video feed stream control',
      'Partner dispatch authorization panel with ETA timer',
      'Operator incident log with voice-to-text notes'
    ]
  },
  {
    id: 'MOD-FE-03',
    name: 'SchoolAdminPortal',
    type: 'Frontend',
    description: 'Web dashboard for school principals and transport coordinators to register learners and define school geofences.',
    keyResponsibilities: [
      'Visual polygon drawing tool for school boundaries and bus drop-off points',
      'Batch CSV import for learner enrollment and device serial binding',
      'Daily arrival/departure attendance safety ledger'
    ]
  }
];

// 7. FLUTTER MOBILE MODULE BREAKDOWN
export const SPRINT1_FLUTTER_MODULES: Sprint1ModuleSpec[] = [
  {
    id: 'MOD-MOB-01',
    name: 'ParentSafetyRadar (Flutter)',
    type: 'Mobile Flutter',
    description: 'Cross-platform iOS & Android mobile app for parents with real-time child radar and instant status check-ins.',
    keyResponsibilities: [
      'Live map radar with vector animation and heading indicator',
      'Push notification handler for high-priority APNS/FCM alerts with custom ringtones',
      'One-tap "I\'m Safe" and "Running Late" quick status sender'
    ]
  },
  {
    id: 'MOD-MOB-02',
    name: 'GuardEmergencyResponderApp (Flutter)',
    type: 'Mobile Flutter',
    description: 'Tactical mobile app for field security units and EMS partners receiving emergency dispatch coordinates.',
    keyResponsibilities: [
      'Turn-by-turn navigation stream to target learner coordinates',
      'Secure incident acceptance button and status toggle (En Route, On Scene, Learner Recovered)',
      'Biometric verification of child identity upon recovery'
    ]
  }
];

// 8. POSTGRESQL TABLES
export const SPRINT1_DATABASE_TABLES: DatabaseTableSpec[] = [
  {
    name: 'schools',
    description: 'Registered educational institutions with address and safety officer contact details.',
    primaryKey: 'id (UUID)',
    columns: ['id', 'emis_number', 'school_name', 'address', 'contact_email', 'contact_phone', 'created_at'],
    indexes: ['idx_schools_emis', 'idx_schools_name']
  },
  {
    name: 'parents',
    description: 'Parent/guardian profiles with verified phone numbers for APNS/FCM/SMS emergency alerts.',
    primaryKey: 'id (UUID)',
    columns: ['id', 'first_name', 'last_name', 'msisdn_phone', 'fcm_token', 'national_id', 'created_at'],
    indexes: ['idx_parents_phone', 'idx_parents_fcm']
  },
  {
    name: 'learners',
    description: 'Child digital profile containing emergency contacts, medical flags, and school assignment.',
    primaryKey: 'id (UUID)',
    columns: ['id', 'first_name', 'last_name', 'school_id', 'parent_user_id', 'blood_type', 'created_at'],
    indexes: ['idx_learners_school', 'idx_learners_parent']
  },
  {
    name: 'gps_devices',
    description: 'Physical IoT wearable registry, hardware cryptographic keys, and telemetry status.',
    primaryKey: 'id (UUID)',
    columns: ['id', 'imei', 'mtls_cert_fingerprint', 'battery_pct', 'firmware_ver', 'last_ping_at', 'status'],
    indexes: ['idx_devices_imei', 'idx_devices_status']
  },
  {
    name: 'device_learner_mappings',
    description: '1:1 active pairing history linking physical IoT wearable to learner profile.',
    primaryKey: 'id (UUID)',
    columns: ['id', 'device_id (FK)', 'learner_id (FK)', 'assigned_at', 'unassigned_at', 'is_active'],
    indexes: ['idx_dl_mapping_active (UNIQUE active)', 'idx_dl_learner']
  },
  {
    name: 'geofences',
    description: 'PostGIS spatial geometries for school zones, homes, transit corridors, and danger zones.',
    primaryKey: 'id (UUID)',
    columns: ['id', 'name', 'type (SCHOOL/HOME/CORRIDOR/DANGER)', 'boundary (GEOMETRY Polygon)', 'created_at'],
    indexes: ['idx_geofences_spatial (PostGIS GIST)', 'idx_geofences_type']
  },
  {
    name: 'telemetry_pings',
    description: 'TimescaleDB hypertable storing high-frequency GPS coordinate pings and sensor readings.',
    primaryKey: 'time (TIMESTAMPTZ), device_id (UUID)',
    columns: ['time', 'device_id', 'location (GEOMETRY Point)', 'speed_kmh', 'heading', 'accuracy_m', 'battery_pct', 'threat_score'],
    indexes: ['idx_telemetry_spatial (PostGIS GIST)', 'idx_telemetry_device_time']
  },
  {
    name: 'incidents',
    description: 'Active and resolved emergency dockets generated by the Child Safety Decision Engine.',
    primaryKey: 'id (UUID)',
    columns: ['id', 'learner_id', 'threat_level (ENUM Green/Amber/Orange/Red)', 'trigger_type', 'status', 'started_at', 'resolved_at', 'forensic_hash'],
    indexes: ['idx_incidents_learner', 'idx_incidents_status_level']
  },
  {
    name: 'evidence_audit_logs',
    description: 'Tamper-evident forensic ledger capturing every telemetry event, system alert, and operator action.',
    primaryKey: 'id (UUID)',
    columns: ['id', 'incident_id', 'timestamp', 'event_type', 'payload_json', 'sha256_digest', 'operator_id'],
    indexes: ['idx_evidence_incident', 'idx_evidence_hash']
  }
];

// 9. REST API ENDPOINTS
export const SPRINT1_REST_ENDPOINTS: RestApiSpec[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    summary: 'Authenticate user (School Admin, Parent, Operator) and issue JWT token.',
    auth: 'Public (Rate-limited)',
    requestBody: '{"phoneOrEmail": "+27821234567", "passwordOrOtp": "992014"}',
    responseBody: '{"token": "eyJhbGci...", "expiresIn": 86400, "role": "PARENT"}'
  },
  {
    method: 'POST',
    path: '/api/v1/devices/pair',
    summary: 'Pair physical GPS device IMEI with learner profile using activation PIN.',
    auth: 'Bearer ParentJWT / AdminJWT',
    requestBody: '{"imei": "860491001299812", "learnerId": "LRN-88120", "pairingPin": "4491"}',
    responseBody: '{"mappingId": "MAP-9001", "status": "BOUND_ACTIVE", "pairedAt": "2026-07-21T11:40:00Z"}'
  },
  {
    method: 'POST',
    path: '/api/v1/telemetry/ping',
    summary: 'Ingest hardware GPS telemetry payload from IoT gateway.',
    auth: 'Bearer DeviceJWT / mTLS',
    requestBody: '{"imei": "8604910012", "lat": -26.2041, "lng": 28.0473, "speed": 12.4, "battery": 92}',
    responseBody: '{"status": "ACCEPTED", "ackTimestamp": "2026-07-21T11:40:00.102Z", "nextPingSec": 5}'
  },
  {
    method: 'POST',
    path: '/api/v1/decision-engine/evaluate',
    summary: 'Execute sequential validation & threat classification on telemetry batch.',
    auth: 'Internal Service Token',
    requestBody: '{"deviceId": "DEV-881", "telemetryId": "TEL-99120"}',
    responseBody: '{"threatLevel": "Level 4 (Red)", "action": "COORDINATION_DISPATCH_TRIGGERED", "riskScore": 96.8}'
  },
  {
    method: 'GET',
    path: '/api/v1/incidents/:id/evidence-docket',
    summary: 'Fetch cryptographically sealed forensic audit trail docket for SAPS.',
    auth: 'Bearer OperatorJWT (SAPS / Command)',
    responseBody: '{"incidentId": "INC-2026-0941", "sha256Digest": "0x8f3b...e4a1", "evidenceCount": 142, "pdfUrl": "https://..."}'
  },
  {
    method: 'POST',
    path: '/api/v1/learner/quick-status',
    summary: "Publish learner quick check-in message (e.g. 'I\'m Safe', 'Running Late').",
    auth: 'Bearer LearnerAppJWT / DeviceKey',
    requestBody: '{"learnerId": "LRN-0012", "statusType": "SAFE", "customNote": "Arrived at library"}',
    responseBody: '{"status": "DELIVERED", "parentsNotified": 2}'
  }
];

// 10. WEBSOCKET EVENTS
export const SPRINT1_WEBSOCKET_EVENTS: RealtimeTopicSpec[] = [
  {
    protocol: 'WebSocket',
    topicOrEvent: 'ws://itis.gov.za/ws/v1/command-centre/incidents',
    direction: 'Subscribe',
    description: 'Command centre map subscribes to live threat level updates & active dockets.',
    samplePayload: '{"event": "INCIDENT_ESCALATED", "incidentId": "INC-8812", "threatLevel": "Red", "lat": -26.204, "lng": 28.047}'
  },
  {
    protocol: 'WebSocket',
    topicOrEvent: 'ws://itis.gov.za/ws/v1/parents/{parentId}/radar',
    direction: 'Subscribe',
    description: 'Parent mobile application streams live child movement coordinates during active alerts.',
    samplePayload: '{"childName": "Sipho Khumalo", "threatLevel": "Amber", "etaMinutes": 6, "distanceKm": 1.2}'
  },
  {
    protocol: 'WebSocket',
    topicOrEvent: 'ws://itis.gov.za/ws/v1/responders/{unitId}/dispatch',
    direction: 'Subscribe',
    description: 'Field emergency responder app receives target coordinates and turn-by-turn stream.',
    samplePayload: '{"dispatchId": "DSP-401", "targetLat": -26.209, "targetLng": 28.051, "urgency": "RED_P1"}'
  }
];

// 11. MQTT TOPICS
export const SPRINT1_MQTT_TOPICS: RealtimeTopicSpec[] = [
  {
    protocol: 'MQTT',
    topicOrEvent: 'itis/telemetry/v1/{imei}/raw',
    direction: 'Publish',
    description: 'Hardware wearables publish binary/JSON telemetry pings.',
    samplePayload: '{"lat": -26.2041, "lng": 28.0473, "spd": 45, "bat": 88, "sos": 0}'
  },
  {
    protocol: 'MQTT',
    topicOrEvent: 'itis/devices/v1/{imei}/config',
    direction: 'Subscribe',
    description: 'Server sends remote configuration updates (e.g. increase ping frequency to 1s on SOS).',
    samplePayload: '{"pingIntervalSec": 1, "audioListenEnabled": true, "buzzerMode": "SILENT"}'
  },
  {
    protocol: 'MQTT',
    topicOrEvent: 'itis/devices/v1/{imei}/ota',
    direction: 'Subscribe',
    description: 'Firmware over-the-air update manifests and hash verification chunks.',
    samplePayload: '{"fwVersion": "v2.1.0-sec", "chunkIndex": 12, "totalChunks": 120, "sha256": "0xa1b2..."}'
  }
];

// 12. BACKGROUND WORKERS
export const BACKGROUND_WORKERS = [
  { name: 'TelemetryBatchIngestWorker', rate: 'Continuous (Stream)', desc: 'Reads Redis Pub/Sub stream, validates schema, inserts into TimescaleDB hypertable in 1,000-ping batches.' },
  { name: 'GeofenceBoundaryEvaluatorWorker', rate: 'Sub-second', desc: 'Runs spatial PostGIS checks on incoming pings against active learner safe corridors.' },
  { name: 'DecisionEngineEvaluatorWorker', rate: 'Real-time', desc: 'Processes telemetry through 5 validation stages to assign threat levels and trigger alerts.' },
  { name: 'EvidentiaryHashSealerWorker', rate: 'On Incident Close', desc: 'Calculates SHA-256 merkle root across all incident telemetry and produces sealed PDF dockets.' }
];

// 13. SCHEDULED JOBS
export const SCHEDULED_JOBS = [
  { name: 'DeviceHeartbeatHealthCheckJob', cron: 'Every 1 minute', desc: 'Identifies pings missing >30 seconds and raises Orange Level 3 offline warnings.' },
  { name: 'StaleIncidentAutoResolutionJob', cron: 'Every 15 minutes', desc: 'Reviews open Amber incidents where learner has safely returned to geofence.' },
  { name: 'DailyGeofenceSyncJob', cron: '0 0 * * * (Midnight)', desc: 'Re-indexes PostGIS spatial boundaries and updates school holiday schedules.' }
];

// 14. PROCESS FLOWS
export const PROCESS_FLOWS: ProcessFlowSpec[] = [
  {
    id: 'FLOW-01',
    title: 'GPS Telemetry Ingestion Flow',
    steps: [
      { step: 1, actor: 'Wearable Device', action: 'Transmits NMEA/JSON telemetry over MQTT QoS 1 to gateway', outcome: 'Gateway validates mTLS cert' },
      { step: 2, actor: 'MQTT Gateway', action: 'Pushes payload into Redis Stream ring buffer', outcome: 'Buffer holding stream (<5ms)' },
      { step: 3, actor: 'Ingestion Worker', action: 'Reads Redis stream and writes to TimescaleDB hypertable', outcome: 'Telemetry stored permanently' },
      { step: 4, actor: 'Spatial Microservice', action: 'Performs PostGIS geofence ST_Contains query', outcome: 'Geofence status updated' }
    ]
  },
  {
    id: 'FLOW-02',
    title: 'Incident Response & Decision Flow',
    steps: [
      { step: 1, actor: 'SOS / Anomaly Trigger', action: 'Wearable transmits panic press or AI detects sudden velocity vector spike', outcome: 'High priority flag raised' },
      { step: 2, actor: 'Decision Engine', action: 'Runs 5 validation stages and classifies as Threat Level Red', outcome: 'Incident docket created' },
      { step: 3, actor: 'Notification Engine', action: 'Fires WebSocket to Command Wall and APNS/FCM push to parents', outcome: 'Alerts delivered <300ms' },
      { step: 4, actor: 'Coordination Layer', action: 'Queries nearest response partners and transmits encrypted docket', outcome: 'Partner unit dispatched' },
      { step: 5, actor: 'Command Operator', action: 'Monitors live tracking stream until child safety verified', outcome: 'Incident closed & sealed' }
    ]
  },
  {
    id: 'FLOW-03',
    title: 'Parent Notification & Radar Flow',
    steps: [
      { step: 1, actor: 'Decision Engine', action: 'Classifies event (e.g. Amber Geofence Exit or Red SOS)', outcome: 'Parent alert job queued' },
      { step: 2, actor: 'Push Gateway', action: 'Pushes high-priority FCM/APNS payload with custom alert chime', outcome: 'Parent phone rings' },
      { step: 3, actor: 'Parent App (Flutter)', action: 'User taps push notification opening Live Radar screen', outcome: 'Live WebSocket stream active' },
      { step: 4, actor: 'Parent User', action: 'Views live movement vector or taps "Call Command Centre"', outcome: 'Reassurance established' }
    ]
  },
  {
    id: 'FLOW-04',
    title: 'Command Centre Operator Workflow',
    steps: [
      { step: 1, actor: 'Tactical Map UI', action: 'Flashes red border and chime on video wall for new Level 4 incident', outcome: 'Operator takes docket' },
      { step: 2, actor: 'Command Operator', action: 'Clicking docket opens live camera, audio stream, and child safety profile', outcome: 'Context verified' },
      { step: 3, actor: 'Response Coordinator', action: 'Confirms dispatch of closest emergency partner unit', outcome: 'ETA timer starts' },
      { step: 4, actor: 'Forensic Engine', action: 'Generates cryptographically signed SAPS evidence docket upon resolution', outcome: 'SHA-256 docket archived' }
    ]
  }
];

// 19. ERROR HANDLING STRATEGY
export const ERROR_HANDLING_STRATEGY: OperationalSpecSection = {
  id: 'ERR-01',
  title: 'Error Handling & Resilience Strategy',
  items: [
    { title: 'Circuit Breaker Pattern', description: 'Isolates external SMS/Push gateways if failure rates exceed 5%, automatically switching to secondary backup providers.' },
    { title: 'MQTT QoS 1 Local Buffering', description: 'IoT wearables buffer up to 2,000 pings locally on flash memory during GSM signal dropouts and re-transmit in sequence upon reconnect.' },
    { title: 'Dead Letter Queues (DLQ)', description: 'Malformed telemetry or corrupted payloads are diverted to Redis DLQ for automated inspection without blocking the primary ingestion pipeline.' },
    { title: 'Graceful Degradation', description: 'If WebGL map rendering slows down, UI seamlessly drops heavy 3D buildings and maintains 60fps 2D tactical markers.' }
  ]
};

// 20. SECURITY REQUIREMENTS
export const SECURITY_REQUIREMENTS: OperationalSpecSection = {
  id: 'SEC-01',
  title: 'Enterprise Security & POPIA Compliance',
  items: [
    { title: 'Hardware mTLS Authentication', description: 'Every ITIS wearable carries an X.509 cryptographic certificate provisioned during factory setup to prevent device spoofing.' },
    { title: 'POPIA Compliance & Data Privacy', description: 'Learner personal identifiable information (PII) is encrypted at rest using AES-256 and masked in command centre maps unless an active Level 3/4 incident occurs.' },
    { title: 'Role-Based Access Control (RBAC)', description: 'Strict permission scopes for School Admins, Parents, Command Operators, and Emergency Responders managed via OAuth2/JWT.' },
    { title: 'Cryptographic Hash Seals', description: 'Every incident audit ledger is sealed with a SHA-256 Merkle tree digest ensuring zero tampering for court admissibility.' }
  ]
};

// 21. TESTING STRATEGY
export const TESTING_STRATEGY: OperationalSpecSection = {
  id: 'TST-01',
  title: 'Sprint 1 QA & Automated Testing Strategy',
  items: [
    { title: 'Unit Testing (Decision Engine)', description: '100% test coverage on sequential validation rules (Device, Location, Movement, AI Risk, Decision).' },
    { title: 'Integration Testing (MQTT -> PostgreSQL)', description: 'Automated test suites simulating 10,000 concurrent MQTT connections verifying TimescaleDB row creation.' },
    { title: 'Load & Stress Testing (50k pings/sec)', description: 'k6 / Locust load testing pushing telemetry ingestion to 50,000 pings/sec while measuring sub-150ms SLA.' },
    { title: 'Chaos Engineering (Signal Dropout)', description: 'Simulated GSM network drops to verify wearable offline buffering and sequence re-ordering.' }
  ]
};

// 22. DEPLOYMENT CHECKLIST
export const DEPLOYMENT_CHECKLIST: OperationalSpecSection = {
  id: 'DEP-01',
  title: 'Sprint 1 Production Deployment Checklist',
  items: [
    { title: 'Cloud Infrastructure Provisioning', description: 'Deploy Cloud Run microservices, TimescaleDB PostgreSQL instance, and Redis Enterprise cluster.' },
    { title: 'PostGIS & Hypertable Initialization', description: 'Enable postgis and timescaledb extensions and apply spatial table migration scripts.' },
    { title: 'mTLS & SSL Gateway Certificates', description: 'Install TLS 1.3 certificates on EMQX MQTT broker and Nginx reverse proxy.' },
    { title: 'Monitoring & Alerting Setup', description: 'Configure Prometheus metrics and Grafana dashboards for sub-150ms telemetry SLA tracking.' }
  ]
};

// 23. DEFINITION OF DONE
export const DEFINITION_OF_DONE: OperationalSpecSection = {
  id: 'DOD-01',
  title: 'Sprint 1 Definition of Done (DoD)',
  items: [
    { title: 'Code Compilation & Clean Lint', description: 'TypeScript backend and React/Flutter frontends build cleanly with zero compilation errors or linter warnings.' },
    { title: 'Security Vulnerability Audit', description: 'Zero High or Critical vulnerabilities in npm/pubspec dependencies.' },
    { title: 'Acceptance Criteria Sign-off', description: 'All 4 Sprint 1 Acceptance Criteria (AC-01 through AC-04) verified green in automated CI/CD runs.' },
    { title: 'Latency SLA Verification', description: 'Telemetry ingestion to decision processing verified under 150ms at peak load.' },
    { title: 'Evidentiary Seal Validation', description: 'Generated PDF/JSON evidence dockets successfully verified against SHA-256 hash digests.' }
  ]
};

export const SPRINT1_ACCEPTANCE_CRITERIA: AcceptanceCriterion[] = [
  {
    id: 'AC-01',
    feature: 'Child Safety Decision Engine Evaluation Speed',
    given: 'A high-velocity raw telemetry ping is ingested from an IoT wearable',
    when: 'The ping passes sequentially through Device, Location, Movement, and AI Risk validation stages',
    then: 'The total decision processing latency must remain under 150ms before assigning a threat level.'
  },
  {
    id: 'AC-02',
    feature: 'Threat Level Escalation & Deduplication',
    given: 'An SOS panic trigger or high-confidence AI risk match occurs (Threat Level Red)',
    when: 'The Child Safety Decision Engine generates an emergency docket',
    then: 'Command centre walls, parent apps, and school portals receive WebSocket alerts within 300ms without duplicate notification floods.'
  },
  {
    id: 'AC-03',
    feature: 'Forensic Digital Evidence Chain Integrity',
    given: 'An emergency incident is marked closed by a command supervisor',
    when: 'The Forensic Evidence Engine generates the incident docket',
    then: 'A SHA-256 hash digest of all raw telemetry, timestamps, operator notes, and dispatch logs must be cryptographically sealed and downloadable as a PDF/JSON evidentiary record.'
  },
  {
    id: 'AC-04',
    feature: "Parent 'I\'m Safe' Quick Status Check-in",
    given: 'A learner or parent submits a quick status message ("I\'m Safe" or "Running Late")',
    when: 'The message is dispatched from the mobile app or IoT button sequence',
    then: 'The system updates the child status badge and notifies parents immediately, suppressing false positive geofence alarms.'
  }
];
