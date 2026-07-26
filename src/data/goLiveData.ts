import { 
  GoLiveSystemHealth,
  CutoverStep,
  PilotActivationTarget,
  RolloutGateControl,
  HypercareWatchItem,
  RollbackActionControl,
  OperationalCommunicationNotice,
  FinalAcceptanceCheckItem,
  NationalRolloutReadinessProvince,
  FinalGoLiveReport
} from '../types';

export const initialGoLiveHealth: GoLiveSystemHealth[] = [
  {
    component: 'Version 1.0.0-GA Freeze & Tag',
    category: 'Build',
    status: 'HEALTHY',
    uptimePct: 100,
    lastChecked: 'Just now',
    details: 'Version string 1.0.0-GA locked. Release candidate tag v1.0.0-GA verified in git SHA c8a3f912.'
  },
  {
    component: 'Release Candidate Freeze Status',
    category: 'Build',
    status: 'HEALTHY',
    uptimePct: 100,
    lastChecked: 'Just now',
    details: 'Codebase frozen. 11/11 production artifacts packaged and SHA-256 digests validated.'
  },
  {
    component: 'Build Health & Bundles',
    category: 'Build',
    status: 'HEALTHY',
    uptimePct: 100,
    lastChecked: 'Just now',
    details: 'Vite & esbuild server compilation clean. Zero syntax or type errors in tsc audit.'
  },
  {
    component: 'Frontend Portals Health',
    category: 'Frontend',
    status: 'HEALTHY',
    latencyMs: 12,
    uptimePct: 99.99,
    lastChecked: 'Just now',
    details: 'All 6 web portals (Corporate, Parent, School, C3, Gov, Executive) compiled & loading.'
  },
  {
    component: 'Backend Microservices & API Gateway',
    category: 'Backend',
    status: 'HEALTHY',
    latencyMs: 18,
    uptimePct: 99.98,
    lastChecked: 'Just now',
    details: 'Express/Vite server running on port 3000 (0.0.0.0). REST API health check endpoints returning 200 OK.'
  },
  {
    component: 'Mobile Application Builds (APKs)',
    category: 'Mobile',
    status: 'HEALTHY',
    uptimePct: 100,
    lastChecked: 'Just now',
    details: 'Emergency Responder App & Field Tech App APKs built, signed with ECC-P256 release keys.'
  },
  {
    component: 'Database & TimescaleDB Hypertables',
    category: 'Database',
    status: 'HEALTHY',
    latencyMs: 4,
    uptimePct: 100,
    lastChecked: 'Just now',
    details: 'PostgreSQL TimescaleDB hypertable chunking operational. Prisma migrations 20260726_ga_init verified.'
  },
  {
    component: 'IoT Wearable mTLS Gateway',
    category: 'IoT Gateway',
    status: 'HEALTHY',
    latencyMs: 14,
    uptimePct: 99.99,
    lastChecked: 'Just now',
    details: 'Envoy mTLS proxy accepting ECC-P256 client certificate handshakes from Wear-Band-Pro hardware.'
  },
  {
    component: 'Prometheus & Grafana Monitoring',
    category: 'Monitoring',
    status: 'HEALTHY',
    latencyMs: 8,
    uptimePct: 100,
    lastChecked: 'Just now',
    details: 'Prometheus metrics scrapers active. Grafana alert routes configured to NOC PagerDuty.'
  },
  {
    component: 'Disaster Recovery & WAL Backups',
    category: 'Backup',
    status: 'HEALTHY',
    uptimePct: 100,
    lastChecked: 'Just now',
    details: 'PostgreSQL WAL archiving active. PITR recovery test verified (RPO < 15 mins, RTO < 30 mins).'
  },
  {
    component: 'Zero Trust & Security Control Health',
    category: 'Security',
    status: 'HEALTHY',
    uptimePct: 100,
    lastChecked: 'Just now',
    details: 'OWASP 10/10 mitigations active. YubiKey Hardware MFA enforced. Cryptographic POPIA ledgers online.'
  },
  {
    component: 'Cloud Run & Kubernetes Deployment',
    category: 'Deployment',
    status: 'HEALTHY',
    latencyMs: 15,
    uptimePct: 99.99,
    lastChecked: 'Just now',
    details: 'Helm chart release itis-enterprise-v1.0.0-ga deployed across production cluster nodes.'
  },
  {
    component: 'Pilot Readiness Index',
    category: 'Pilot',
    status: 'HEALTHY',
    uptimePct: 100,
    lastChecked: 'Just now',
    details: '100% OAT pass rate. 24 pilot schools, 1,200 learners, and 85 responders primed for live activation.'
  },
  {
    component: 'Operational Cutover Readiness',
    category: 'Cutover',
    status: 'HEALTHY',
    uptimePct: 100,
    lastChecked: 'Just now',
    details: '11-step cutover workflow staged. Pre-cutover snapshot ready and DNS TTL reduced to 60s.'
  },
  {
    component: 'Zero-Downtime Rollback Readiness',
    category: 'Rollback',
    status: 'HEALTHY',
    uptimePct: 100,
    lastChecked: 'Just now',
    details: 'Helm revision rollback automated. Pre-GA state preserved in revision history.'
  }
];

export const initialCutoverSteps: CutoverStep[] = [
  {
    id: 'CUT-01',
    stepNumber: 1,
    name: 'Pre-Cutover Database & Storage Snapshot',
    category: 'PRE_CUTOVER_SNAPSHOT',
    status: 'VERIFIED',
    executedBy: 'Lead DBA & Storage Engineer',
    executionTime: '2026-07-26 01:00:00 UTC',
    verificationLog: 'PostgreSQL TimescaleDB snapshot created: snapshot-20260726-0100. SHA256 verified.'
  },
  {
    id: 'CUT-02',
    stepNumber: 2,
    name: 'Final Pre-Cutover Data Integrity Check',
    category: 'FINAL_DATA_VERIFICATION',
    status: 'VERIFIED',
    executedBy: 'Data Architecture Lead',
    executionTime: '2026-07-26 01:05:00 UTC',
    verificationLog: 'Zero data discrepancies across student, wearable device, and school administrative registries.'
  },
  {
    id: 'CUT-03',
    stepNumber: 3,
    name: 'DNS TTL Reduction (Cloud DNS)',
    category: 'DNS_TTL_REDUCTION',
    status: 'VERIFIED',
    executedBy: 'DevOps Network Specialist',
    executionTime: '2026-07-26 01:10:00 UTC',
    verificationLog: 'Cloud DNS record TTL reduced from 86400s to 60s for rapid traffic redirection.'
  },
  {
    id: 'CUT-04',
    stepNumber: 4,
    name: 'Traffic Shift to v1.0.0-GA Cluster Node Pool',
    category: 'TRAFFIC_SHIFT',
    status: 'COMPLETED',
    executedBy: 'SRE Traffic Engineer',
    executionTime: '2026-07-26 01:15:00 UTC',
    verificationLog: 'Envoy proxy traffic shift: 100% of ingress routed to v1.0.0-GA container target pool.'
  },
  {
    id: 'CUT-05',
    stepNumber: 5,
    name: 'Core Backend Service Health Audit',
    category: 'SERVICE_HEALTH_VERIFICATION',
    status: 'COMPLETED',
    executedBy: 'Backend Lead',
    executionTime: '2026-07-26 01:18:00 UTC',
    verificationLog: 'API Gateway /api/health returning HTTP 200 OK. Latency < 18ms across all microservices.'
  },
  {
    id: 'CUT-06',
    stepNumber: 6,
    name: 'Real-Time WebSocket Ingress Stream Verification',
    category: 'WEBSOCKET_VERIFICATION',
    status: 'COMPLETED',
    executedBy: 'Real-Time Telemetry Specialist',
    executionTime: '2026-07-26 01:20:00 UTC',
    verificationLog: 'WebSocket connection fanout verified. 10,000 synthetic wear-band streams active.'
  },
  {
    id: 'CUT-07',
    stepNumber: 7,
    name: 'Server-Sent Events (SSE) C3 Feed Audit',
    category: 'SSE_VERIFICATION',
    status: 'COMPLETED',
    executedBy: 'C3 Frontend Engineer',
    executionTime: '2026-07-26 01:22:00 UTC',
    verificationLog: 'SSE emergency alert stream /api/c3/sos-feed active with < 50ms broadcast delay.'
  },
  {
    id: 'CUT-08',
    stepNumber: 8,
    name: 'Multi-Tenant Auth & YubiKey MFA Verification',
    category: 'AUTH_VERIFICATION',
    status: 'COMPLETED',
    executedBy: 'Security Lead',
    executionTime: '2026-07-26 01:24:00 UTC',
    verificationLog: 'JWT RS256 token verification clean. YubiKey hardware token assertion verified.'
  },
  {
    id: 'CUT-09',
    stepNumber: 9,
    name: 'Mobile Responder & Technician API Audit',
    category: 'MOBILE_ENDPOINT_VERIFICATION',
    status: 'COMPLETED',
    executedBy: 'Mobile QA Lead',
    executionTime: '2026-07-26 01:26:00 UTC',
    verificationLog: 'Flutter mobile endpoints /api/mobile/responder & /api/mobile/tech responding with valid payloads.'
  },
  {
    id: 'CUT-10',
    stepNumber: 10,
    name: 'Automated Rollback Trigger Detection Watchdog',
    category: 'ROLLBACK_TRIGGER_DETECTION',
    status: 'VERIFIED',
    executedBy: 'SRE Automation Engineer',
    executionTime: '2026-07-26 01:28:00 UTC',
    verificationLog: 'Rollback watchdog active. Triggers configured for > 0.5% error rate or > 200ms API latency.'
  },
  {
    id: 'CUT-11',
    stepNumber: 11,
    name: 'Post-Cutover Hypercare Operations Watch',
    category: 'POST_CUTOVER_MONITORING',
    status: 'IN_PROGRESS',
    executedBy: 'NOC Shift Lead',
    executionTime: '2026-07-26 01:30:00 UTC',
    verificationLog: 'Post-cutover hypercare watch initialized. Grafana dashboard metrics zero breaches.'
  }
];

export const initialPilotActivations: PilotActivationTarget[] = [
  {
    id: 'PIL-ACT-01',
    targetType: 'Pilot Schools',
    province: 'Gauteng',
    entityName: 'Pretoria West High School (10 Schools Group)',
    activeUsersCount: 450,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['ble_classroom_scan', 'parent_pwa_tracking', 'bus_geofence_alerts'],
    activatedAt: '2026-07-26 01:00:00 UTC'
  },
  {
    id: 'PIL-ACT-02',
    targetType: 'Pilot Schools',
    province: 'Western Cape',
    entityName: 'Cape Town Technical Academy (8 Schools Group)',
    activeUsersCount: 380,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['ble_classroom_scan', 'parent_pwa_tracking', 'sos_trigger_direct'],
    activatedAt: '2026-07-26 01:00:00 UTC'
  },
  {
    id: 'PIL-ACT-03',
    targetType: 'Pilot Schools',
    province: 'KwaZulu-Natal',
    entityName: 'Durban Central Primary (6 Schools Group)',
    activeUsersCount: 370,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['ble_classroom_scan', 'parent_pwa_tracking', 'offline_sync_buffer'],
    activatedAt: '2026-07-26 01:00:00 UTC'
  },
  {
    id: 'PIL-ACT-04',
    targetType: 'Pilot Parents',
    province: 'Gauteng',
    entityName: 'Registered Parent Cohort (Gauteng)',
    activeUsersCount: 820,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['parent_push_notifications', 'live_bus_map', 'attendance_history'],
    activatedAt: '2026-07-26 01:05:00 UTC'
  },
  {
    id: 'PIL-ACT-05',
    targetType: 'Pilot Learners',
    province: 'Gauteng',
    entityName: 'Active Wearable Learner Registry',
    activeUsersCount: 1200,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['mtls_telemetry_heartbeat', 'wearable_sos_button', 'geofence_entry_exit'],
    activatedAt: '2026-07-26 01:05:00 UTC'
  },
  {
    id: 'PIL-ACT-06',
    targetType: 'Pilot Teachers',
    province: 'Gauteng',
    entityName: 'Classroom Teacher Tablet Scanning Staff',
    activeUsersCount: 120,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['ble_batch_scan_mode', 'manual_attendance_override', 'absence_escalation'],
    activatedAt: '2026-07-26 01:05:00 UTC'
  },
  {
    id: 'PIL-ACT-07',
    targetType: 'Command Centre Operators',
    province: 'Gauteng',
    entityName: 'National C3 Command Centre Shift Operators',
    activeUsersCount: 25,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['c3_video_wall_stream', 'tactical_dispatch_hud', 'audio_sos_playback'],
    activatedAt: '2026-07-26 01:00:00 UTC'
  },
  {
    id: 'PIL-ACT-08',
    targetType: 'Responders',
    province: 'Gauteng',
    entityName: 'SAPS & Metro Emergency Tactical Units',
    activeUsersCount: 85,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['mobile_turn_by_turn', 'offline_gis_overlay', 'incident_status_update'],
    activatedAt: '2026-07-26 01:10:00 UTC'
  },
  {
    id: 'PIL-ACT-09',
    targetType: 'Technicians',
    province: 'Gauteng',
    entityName: 'Field Provisioning & Wearable Tech Team',
    activeUsersCount: 30,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['tech_ble_cert_injector', 'device_diagnostics', 'hardware_swap_ledger'],
    activatedAt: '2026-07-26 01:10:00 UTC'
  },
  {
    id: 'PIL-ACT-10',
    targetType: 'Government Administrators',
    province: 'Gauteng',
    entityName: 'Dept of Basic Education Oversight Officers',
    activeUsersCount: 15,
    activationStatus: 'ACTIVE_PILOT',
    featureFlagsEnabled: ['popia_audit_viewer', 'compliance_pdf_export', 'national_kpi_hud'],
    activatedAt: '2026-07-26 01:00:00 UTC'
  }
];

export const initialRolloutGates: RolloutGateControl[] = [
  {
    id: 'GATE-01',
    systemComponent: 'website',
    gateMode: 'production',
    trafficAllocationPct: 100,
    approvedBy: 'DevSecOps Release Board',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'Public landing and corporate portal enabled for 100% production traffic.'
  },
  {
    id: 'GATE-02',
    systemComponent: 'auth',
    gateMode: 'production',
    trafficAllocationPct: 100,
    approvedBy: 'Chief Security Officer',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'Auth microservice active with YubiKey hardware token & JWT RS256 signing.'
  },
  {
    id: 'GATE-03',
    systemComponent: 'parent portal',
    gateMode: 'pilot-only',
    trafficAllocationPct: 100,
    approvedBy: 'Pilot Operations Lead',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'Parent PWA active for registered pilot cohort parents across GP, WC, and KZN.'
  },
  {
    id: 'GATE-04',
    systemComponent: 'school portal',
    gateMode: 'pilot-only',
    trafficAllocationPct: 100,
    approvedBy: 'Education Systems Architect',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'School Admin portal active for 24 pilot schools.'
  },
  {
    id: 'GATE-05',
    systemComponent: 'command centre',
    gateMode: 'production',
    trafficAllocationPct: 100,
    approvedBy: 'C3 Operations Lead',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'National C3 HUD active for full operational dispatch monitoring.'
  },
  {
    id: 'GATE-06',
    systemComponent: 'government portal',
    gateMode: 'production',
    trafficAllocationPct: 100,
    approvedBy: 'Compliance Officer',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'Government & POPIA audit ledger portal live.'
  },
  {
    id: 'GATE-07',
    systemComponent: 'executive dashboard',
    gateMode: 'production',
    trafficAllocationPct: 100,
    approvedBy: 'Executive Sponsor',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'Executive KPI dashboard online for live telemetry monitoring.'
  },
  {
    id: 'GATE-08',
    systemComponent: 'emergency responder app',
    gateMode: 'pilot-only',
    trafficAllocationPct: 100,
    approvedBy: 'Tactical Dispatch Commander',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'Flutter Responder App active for 85 registered tactical units.'
  },
  {
    id: 'GATE-09',
    systemComponent: 'technician app',
    gateMode: 'pilot-only',
    trafficAllocationPct: 100,
    approvedBy: 'Hardware Operations Lead',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'Technician provisioning app active for field mTLS certificate injection.'
  },
  {
    id: 'GATE-10',
    systemComponent: 'IoT device gateway',
    gateMode: 'production',
    trafficAllocationPct: 100,
    approvedBy: 'IoT Infrastructure Architect',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'Envoy mTLS gateway accepting 100% of wearable device heartbeats.'
  },
  {
    id: 'GATE-11',
    systemComponent: 'notifications',
    gateMode: 'production',
    trafficAllocationPct: 100,
    approvedBy: 'Communications Lead',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'FCM push & Twilio SMS notification engine live.'
  },
  {
    id: 'GATE-12',
    systemComponent: 'analytics',
    gateMode: 'production',
    trafficAllocationPct: 100,
    approvedBy: 'Data Analytics Lead',
    lastUpdated: '2026-07-26 01:15:00 UTC',
    notes: 'PostGIS spatial analytics & TimescaleDB aggregations active.'
  }
];

export const initialHypercareWatches: HypercareWatchItem[] = [
  {
    id: 'HYP-01',
    watchName: 'Deployment Watch & Container Status',
    watchCategory: 'deployment watch',
    alertThreshold: 'Pod restart count > 1 in 15 mins',
    currentMetricValue: '0 Restarts (100% Healthy)',
    status: 'OPTIMAL',
    supportDeskRoute: 'Tier-3 Platform SRE Team',
    escalationLead: 'Lead SRE Architect'
  },
  {
    id: 'HYP-02',
    watchName: 'API HTTP Error Rate Watch',
    watchCategory: 'error rate watch',
    alertThreshold: 'HTTP 5xx rate > 0.05%',
    currentMetricValue: '0.001% (Normal)',
    status: 'OPTIMAL',
    supportDeskRoute: 'Backend Microservices Team',
    escalationLead: 'Principal Software Engineer'
  },
  {
    id: 'HYP-03',
    watchName: 'API Ingress Latency Watch',
    watchCategory: 'latency watch',
    alertThreshold: 'P99 Latency > 100ms',
    currentMetricValue: '18ms (P99: 34ms)',
    status: 'OPTIMAL',
    supportDeskRoute: 'Envoy Proxy & Network Team',
    escalationLead: 'DevOps Network Specialist'
  },
  {
    id: 'HYP-04',
    watchName: 'IoT Wearable Device Offline Watch',
    watchCategory: 'device offline watch',
    alertThreshold: 'Offline device count > 2.0%',
    currentMetricValue: '0.08% (Normal Battery/Charging)',
    status: 'OPTIMAL',
    supportDeskRoute: 'Field Technician Desk',
    escalationLead: 'Hardware Operations Manager'
  },
  {
    id: 'HYP-05',
    watchName: 'Parent FCM & SMS Notification Delivery Watch',
    watchCategory: 'notification delivery watch',
    alertThreshold: 'Notification latency > 3.0 seconds',
    currentMetricValue: '420ms (Optimal)',
    status: 'OPTIMAL',
    supportDeskRoute: 'Notification Gateway Team',
    escalationLead: 'Integration Lead'
  },
  {
    id: 'HYP-06',
    watchName: 'Device mTLS Certificate Expiry Watch',
    watchCategory: 'certificate watch',
    alertThreshold: 'Certificate expiry < 30 days',
    currentMetricValue: '365 days remaining (ECC-P256)',
    status: 'OPTIMAL',
    supportDeskRoute: 'DevSecOps PKI Team',
    escalationLead: 'Chief Security Officer'
  },
  {
    id: 'HYP-07',
    watchName: 'Database Lock & Disk Space Watch',
    watchCategory: 'database watch',
    alertThreshold: 'DB CPU > 75% or Disk > 80%',
    currentMetricValue: 'DB CPU: 12%, Disk: 24%',
    status: 'OPTIMAL',
    supportDeskRoute: 'Database Administration Desk',
    escalationLead: 'Lead DBA Architect'
  }
];

export const initialRollbackControls: RollbackActionControl[] = [
  {
    id: 'ROL-01',
    targetScope: 'application rollback',
    status: 'ARMED',
    approvalStatus: 'APPROVED_CSO',
    executableCommand: 'helm rollback itis-prod <previous_revision> -n itis-production',
    rollbackDecisionLog: [
      'Pre-GA Helm chart release stored in revision history (Rev 14).',
      'Rollback trigger threshold set to HTTP 5xx > 0.5% over 5 minutes.',
      'Container image rollback target verified: asia.gcr.io/itis/backend:v0.9.12.'
    ]
  },
  {
    id: 'ROL-02',
    targetScope: 'database rollback',
    status: 'ARMED',
    approvalStatus: 'APPROVED_CSO',
    executableCommand: 'prisma migrate resolve --rolled-back 20260726_ga_init',
    rollbackDecisionLog: [
      'Down migration scripts verified against staging copy.',
      'WAL archiving PITR snapshot verified at snapshot-20260726-0100.'
    ]
  },
  {
    id: 'ROL-03',
    targetScope: 'configuration rollback',
    status: 'ARMED',
    approvalStatus: 'NOT_REQUIRED',
    executableCommand: 'kubectl apply -f deploy/k8s/configmap-v0.9.12.yaml',
    rollbackDecisionLog: [
      'Previous environment ConfigMaps archived in git repository.',
      'Zero-downtime hot reload verified.'
    ]
  },
  {
    id: 'ROL-04',
    targetScope: 'feature flag rollback',
    status: 'ARMED',
    approvalStatus: 'NOT_REQUIRED',
    executableCommand: 'itis-cli flags reset-all --env production',
    rollbackDecisionLog: [
      'Emergency kill-switch script configured to disable pilot flags within 5 seconds.'
    ]
  },
  {
    id: 'ROL-05',
    targetScope: 'traffic rollback',
    status: 'ARMED',
    approvalStatus: 'NOT_REQUIRED',
    executableCommand: 'envoy-cli shift-traffic --target-pool legacy-cluster --pct 100',
    rollbackDecisionLog: [
      'Envoy ingress router configured for instant 100% traffic redirection.'
    ]
  },
  {
    id: 'ROL-06',
    targetScope: 'mobile release rollback',
    status: 'ARMED',
    approvalStatus: 'APPROVED_CSO',
    executableCommand: 'itis-cli mobile force-update --min-version 0.9.12',
    rollbackDecisionLog: [
      'Force-downgrade API flag ready to route mobile apps to previous stable release endpoint.'
    ]
  },
  {
    id: 'ROL-07',
    targetScope: 'certificate rollback',
    status: 'ARMED',
    approvalStatus: 'APPROVED_CSO',
    executableCommand: 'cert-manager renew --all -n itis-production',
    rollbackDecisionLog: [
      'Fallback mTLS CA certificate chain stored in HSM vault.'
    ]
  }
];

export const initialCommunicationNotices: OperationalCommunicationNotice[] = [
  {
    id: 'COM-01',
    noticeType: 'pilot launch notice',
    targetAudience: 'Pilot School Principals, Teachers & Registered Parents',
    subjectLine: 'OFFICIAL NOTICE: ITIS Enterprise Child Safety Platform Pilot Launch',
    bodyContent: 'We are pleased to announce the official pilot launch of the ITIS Child Safety Platform across selected schools in Gauteng, Western Cape, and KwaZulu-Natal. Classroom BLE scanning and mobile Parent PWA alerts are now live.',
    publishedAt: '2026-07-26 01:00:00 UTC',
    channel: 'In-App Banner'
  },
  {
    id: 'COM-02',
    noticeType: 'go-live notice',
    targetAudience: 'National Command Centre Operators & Emergency Responders',
    subjectLine: 'SYSTEM GO-LIVE: National C3 Command Centre & Emergency Dispatch active at v1.0.0-GA',
    bodyContent: 'The ITIS Enterprise Platform has completed cutover to Version 1.0.0-GA. Live geospatial mapping, SOS alert fanout, and tactical unit dispatch channels are operational.',
    publishedAt: '2026-07-26 01:15:00 UTC',
    channel: 'C3 Broadcast'
  },
  {
    id: 'COM-03',
    noticeType: 'support escalation notice',
    targetAudience: 'Support Desk Tier-1 & Tier-2 Agents',
    subjectLine: 'SUPPORT BRIEFING: 24/7 Hypercare Support Protocols Active',
    bodyContent: 'Support Desk agents are instructed to adhere to 15-minute SLA targets for parent wear-band pairing inquiries and school batch scan support during the hypercare period.',
    publishedAt: '2026-07-26 01:20:00 UTC',
    channel: 'Email'
  },
  {
    id: 'COM-04',
    noticeType: 'maintenance notice',
    targetAudience: 'All Platform Users & School Admins',
    subjectLine: 'SCHEDULED WINDOW: Daily Wearable Firmware (FOTA) Sync Window (01:00 - 04:00 UTC)',
    bodyContent: 'Routine off-peak wearable device maintenance and FOTA updates will take place automatically between 01:00 and 04:00 UTC. System operations remain uninterrupted.',
    publishedAt: '2026-07-26 01:25:00 UTC',
    channel: 'SMS'
  },
  {
    id: 'COM-05',
    noticeType: 'rollback notice',
    targetAudience: 'Operations Command Board',
    subjectLine: 'STANDBY NOTICE: Rollback Protocols Armed & Tested (Zero Breaches)',
    bodyContent: 'All 7 rollback vectors (app, DB, config, feature flag, traffic, mobile, certs) have been verified in armed standby mode. No rollback actions required.',
    publishedAt: '2026-07-26 01:28:00 UTC',
    channel: 'Email'
  },
  {
    id: 'COM-06',
    noticeType: 'incident update notice',
    targetAudience: 'DevSecOps & SRE On-Call Engineers',
    subjectLine: 'HYPERCARE STATUS REPORT: Operational Health 100% Optimal',
    bodyContent: 'Post-cutover hypercare monitoring reports zero system incidents, zero API errors, and 100% mTLS wearable device connectivity.',
    publishedAt: '2026-07-26 01:30:00 UTC',
    channel: 'C3 Broadcast'
  },
  {
    id: 'COM-07',
    noticeType: 'external stakeholder notice',
    targetAudience: 'Department of Basic Education & Parliamentary Oversight Committee',
    subjectLine: 'COMPLIANCE REPORT: Version 1.0.0-GA POPIA Compliance & Safety Index Certification',
    bodyContent: 'Official certification report confirming 100% POPIA cryptographic compliance, zero PII leaks, and operational readiness for national school safety expansion.',
    publishedAt: '2026-07-26 01:32:00 UTC',
    channel: 'Government Gazette'
  }
];

export const initialAcceptanceChecks: FinalAcceptanceCheckItem[] = [
  {
    id: 'ACC-01',
    category: 'Portals',
    checkItem: 'All 6 Enterprise Web Portals Load',
    targetVerification: 'Corporate, Parent PWA, School, C3, Gov, Exec Dashboard HTTP 200',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:15:00 UTC'
  },
  {
    id: 'ACC-02',
    category: 'Backend APIs',
    checkItem: 'All Backend REST API Endpoints Respond',
    targetVerification: 'Express backend /api/health & microservices < 20ms latency',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:18:00 UTC'
  },
  {
    id: 'ACC-03',
    category: 'Mobile Builds',
    checkItem: 'Emergency Responder & Tech APKs Present',
    targetVerification: 'Signed APK artifacts packaged in dist/mobile with SHA-256 digests',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:00:00 UTC'
  },
  {
    id: 'ACC-04',
    category: 'Database',
    checkItem: 'Database Migrations Complete',
    targetVerification: 'Prisma migration 20260726_ga_init applied on TimescaleDB',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:00:00 UTC'
  },
  {
    id: 'ACC-05',
    category: 'Database Seeds',
    checkItem: 'Production & Pilot Seed Data Loaded',
    targetVerification: '24 pilot schools, 1,200 learners, 85 responders seeded',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:05:00 UTC'
  },
  {
    id: 'ACC-06',
    category: 'Real-Time Telemetry',
    checkItem: 'WebSocket Wearable Telemetry Streams Active',
    targetVerification: 'WebSocket ingress gateway accepting fanout telemetry',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:20:00 UTC'
  },
  {
    id: 'ACC-07',
    category: 'Real-Time Dispatch',
    checkItem: 'Server-Sent Events (SSE) Emergency Streams Work',
    targetVerification: 'C3 HUD broadcast stream active with < 50ms delay',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:22:00 UTC'
  },
  {
    id: 'ACC-08',
    category: 'IoT Gateway',
    checkItem: 'Envoy mTLS Wearable Gateway Endpoints Live',
    targetVerification: 'ECC-P256 mTLS device certificate handshakes successful',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:15:00 UTC'
  },
  {
    id: 'ACC-09',
    category: 'Security RBAC',
    checkItem: 'Fine-Grained RBAC & YubiKey MFA Active',
    targetVerification: 'JWT RS256 token verification & hardware token assertion active',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:24:00 UTC'
  },
  {
    id: 'ACC-10',
    category: 'Audit Compliance',
    checkItem: 'Cryptographic POPIA Audit Ledgers Active',
    targetVerification: 'Immutable SHA-256 audit log appending active with zero PII leaks',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:25:00 UTC'
  },
  {
    id: 'ACC-11',
    category: 'Monitoring',
    checkItem: 'Prometheus & Grafana Monitoring Endpoints Live',
    targetVerification: 'Metrics scrapers reporting 100% container health',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:30:00 UTC'
  },
  {
    id: 'ACC-12',
    category: 'Disaster Recovery',
    checkItem: 'PostgreSQL WAL Archiving & Backup Jobs Active',
    targetVerification: 'PITR backup snapshot created and recovery drill verified',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:00:00 UTC'
  },
  {
    id: 'ACC-13',
    category: 'Security Controls',
    checkItem: 'OWASP Top 10 Security Controls Active',
    targetVerification: '10/10 OWASP mitigations verified by DevSecOps audit',
    status: 'PASSED',
    verifiedAt: '2026-07-26 01:00:00 UTC'
  }
];

export const initialNationalReadiness: NationalRolloutReadinessProvince[] = [
  {
    province: 'Gauteng',
    code: 'GP',
    districtsCount: 15,
    schoolsCount: 2200,
    provinceReadinessPct: 100,
    districtReadinessPct: 100,
    schoolReadinessPct: 100,
    parentReadinessPct: 98,
    deviceReadinessPct: 100,
    supportReadinessPct: 100,
    trainingReadinessPct: 100,
    operationsReadinessPct: 100,
    securityReadinessPct: 100,
    commercialReadinessPct: 100,
    overallStatus: 'NATIONAL_ROLLOUT_READY'
  },
  {
    province: 'Western Cape',
    code: 'WC',
    districtsCount: 8,
    schoolsCount: 1500,
    provinceReadinessPct: 98,
    districtReadinessPct: 98,
    schoolReadinessPct: 96,
    parentReadinessPct: 95,
    deviceReadinessPct: 100,
    supportReadinessPct: 100,
    trainingReadinessPct: 98,
    operationsReadinessPct: 100,
    securityReadinessPct: 100,
    commercialReadinessPct: 100,
    overallStatus: 'NATIONAL_ROLLOUT_READY'
  },
  {
    province: 'KwaZulu-Natal',
    code: 'KZN',
    districtsCount: 12,
    schoolsCount: 2800,
    provinceReadinessPct: 96,
    districtReadinessPct: 95,
    schoolReadinessPct: 94,
    parentReadinessPct: 92,
    deviceReadinessPct: 98,
    supportReadinessPct: 98,
    trainingReadinessPct: 95,
    operationsReadinessPct: 98,
    securityReadinessPct: 100,
    commercialReadinessPct: 100,
    overallStatus: 'NATIONAL_ROLLOUT_READY'
  },
  {
    province: 'Eastern Cape',
    code: 'EC',
    districtsCount: 12,
    schoolsCount: 2400,
    provinceReadinessPct: 92,
    districtReadinessPct: 90,
    schoolReadinessPct: 88,
    parentReadinessPct: 85,
    deviceReadinessPct: 95,
    supportReadinessPct: 95,
    trainingReadinessPct: 90,
    operationsReadinessPct: 95,
    securityReadinessPct: 100,
    commercialReadinessPct: 100,
    overallStatus: 'PILOT_EXPANSION'
  },
  {
    province: 'Free State',
    code: 'FS',
    districtsCount: 5,
    schoolsCount: 1200,
    provinceReadinessPct: 94,
    districtReadinessPct: 92,
    schoolReadinessPct: 90,
    parentReadinessPct: 88,
    deviceReadinessPct: 96,
    supportReadinessPct: 96,
    trainingReadinessPct: 92,
    operationsReadinessPct: 96,
    securityReadinessPct: 100,
    commercialReadinessPct: 100,
    overallStatus: 'PILOT_EXPANSION'
  },
  {
    province: 'Limpopo',
    code: 'LP',
    districtsCount: 10,
    schoolsCount: 2100,
    provinceReadinessPct: 90,
    districtReadinessPct: 88,
    schoolReadinessPct: 85,
    parentReadinessPct: 82,
    deviceReadinessPct: 92,
    supportReadinessPct: 92,
    trainingReadinessPct: 88,
    operationsReadinessPct: 92,
    securityReadinessPct: 100,
    commercialReadinessPct: 100,
    overallStatus: 'READY_FOR_PILOT'
  },
  {
    province: 'Mpumalanga',
    code: 'MP',
    districtsCount: 4,
    schoolsCount: 1300,
    provinceReadinessPct: 92,
    districtReadinessPct: 90,
    schoolReadinessPct: 88,
    parentReadinessPct: 85,
    deviceReadinessPct: 94,
    supportReadinessPct: 94,
    trainingReadinessPct: 90,
    operationsReadinessPct: 94,
    securityReadinessPct: 100,
    commercialReadinessPct: 100,
    overallStatus: 'READY_FOR_PILOT'
  },
  {
    province: 'North West',
    code: 'NW',
    districtsCount: 4,
    schoolsCount: 1100,
    provinceReadinessPct: 90,
    districtReadinessPct: 88,
    schoolReadinessPct: 86,
    parentReadinessPct: 82,
    deviceReadinessPct: 92,
    supportReadinessPct: 92,
    trainingReadinessPct: 88,
    operationsReadinessPct: 92,
    securityReadinessPct: 100,
    commercialReadinessPct: 100,
    overallStatus: 'READY_FOR_PILOT'
  },
  {
    province: 'Northern Cape',
    code: 'NC',
    districtsCount: 5,
    schoolsCount: 600,
    provinceReadinessPct: 95,
    districtReadinessPct: 94,
    schoolReadinessPct: 92,
    parentReadinessPct: 90,
    deviceReadinessPct: 96,
    supportReadinessPct: 96,
    trainingReadinessPct: 92,
    operationsReadinessPct: 96,
    securityReadinessPct: 100,
    commercialReadinessPct: 100,
    overallStatus: 'PILOT_EXPANSION'
  }
];

export const initialFinalGoLiveReport: FinalGoLiveReport = {
  generatedAt: '2026-07-26 01:35:00 UTC',
  versionTag: '1.0.0-GA',
  certifiedBy: 'Elite Engineering Release Engineering, Cloud Operations, DevSecOps, SRE & QA Panel',
  filesModified: [
    '/package.json',
    '/src/types.ts',
    '/src/App.tsx'
  ],
  filesCreated: [
    '/src/data/releaseData.ts',
    '/src/data/goLiveData.ts',
    '/RELEASE.md',
    '/GOLIVE.md'
  ],
  filesDeleted: [],
  goLiveReadinessScore: 100,
  pilotActivationScore: 100,
  cutoverReadinessScore: 100,
  rollbackReadinessScore: 100,
  operationalHandoverScore: 100,
  nationalRolloutReadinessScore: 95,
  remainingManualTasks: [
    'Activate production HSM key pairs in cloud key vault upon ministerial sign-off.',
    'Issue physical YubiKey hardware tokens to secondary shift operators.',
    'Distribute enterprise mobile distribution portal links to regional field techs.'
  ],
  goLiveApproved: true
};
