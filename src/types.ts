export interface SecurityMetric {
  id: string;
  name: string;
  score: number;
  status: 'optimal' | 'warning' | 'critical';
  details: string;
}

export interface ThreatEvent {
  id: string;
  timestamp: string;
  category: 'Zero Trust' | 'API Security' | 'IoT Security' | 'Database' | 'File Storage' | 'Authentication' | 'Admin Action';
  severity: 'low' | 'medium' | 'high' | 'critical';
  sourceIp: string;
  tenantId: string;
  userEmail: string;
  action: string;
  status: 'blocked' | 'monitored' | 'mitigated' | 'flagged';
  details: string;
}

export interface ZeroTrustCheck {
  id: string;
  component: string;
  mechanism: string;
  status: 'VERIFIED' | 'HARDENED' | 'WARNING';
  lastValidated: string;
  complianceRule: string;
}

export interface ApiEndpointSecurity {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  authType: 'JWT RS256' | 'mTLS Certificate' | 'HMAC Signature';
  rbacRoleRequired: string;
  rateLimit: string;
  schemaValidation: boolean;
  sanitizationStatus: 'ACTIVE';
}

export interface WearableDeviceSecurity {
  deviceId: string;
  model: 'ITIS-Band-Pro' | 'ITIS-Vest-V2' | 'ITIS-Guardian-Pod';
  mTLSCertStatus: 'Valid' | 'Expiring' | 'Revoked';
  firmwareVersion: string;
  signatureStatus: 'Verified (ECDSA P-256)' | 'Invalid Signature';
  sosIntegrity: 'Cryptographically Signed' | 'Unverified';
  tamperState: 'Secure' | 'Tamper Alert';
  lastHeartbeat: string;
}

export interface OwaspMitigation {
  code: string;
  title: string;
  category: 'OWASP API Top 10' | 'OWASP Web Top 10';
  status: 'MITIGATED' | 'PROTECTED';
  implementationDetails: string;
  testVectorStatus: 'Passed Automated Probe';
}

export interface SecurityPosture {
  overallScore: number;
  zeroTrustScore: number;
  apiSecurityScore: number;
  ioTSecurityScore: number;
  databaseSecurityScore: number;
  fileStorageScore: number;
  activeThreatsCount: number;
  certificatesValidCount: number;
  certificatesTotal: number;
  failedLogins24h: number;
  rbacViolations24h: number;
}

// ==================== PERFORMANCE & SRE TYPES ====================

export interface LatencyMetric {
  endpoint: string;
  p50Ms: number;
  p95Ms: number;
  p99Ms: number;
  requestsPerSec: number;
  cacheHitRatioPercent: number;
  status: 'OPTIMAL' | 'DEGRADED' | 'TARGET_EXCEEDED';
}

export interface DatabaseQueryOptimization {
  queryId: string;
  table: string;
  operation: 'SELECT' | 'INSERT' | 'UPSERT' | 'JOIN / AGGREGATE';
  executionTimePreOptMs: number;
  executionTimePostOptMs: number;
  improvementMultiplier: string;
  indexApplied: string;
  notes: string;
}

export interface LoadTestScenario {
  id: string;
  name: string;
  targetUsersVUs: number;
  duration: string;
  targetRps: number;
  p95ThresholdMs: number;
  maxErrorRatePercent: number;
  lastRunStatus: 'PASSED' | 'RUNNING' | 'FAILED' | 'READY';
  summary: string;
}

export interface CircuitBreaker {
  serviceName: string;
  state: 'CLOSED (HEALTHY)' | 'OPEN (FALLBACK)' | 'HALF_OPEN';
  failureThreshold: number;
  currentFailures: number;
  fallbackStrategy: string;
  lastTrippedTime: string;
}

export interface CacheLayerMetrics {
  layerName: string;
  technology: 'In-Memory (LRU L1)' | 'Redis Cluster (L2)' | 'CDN Edge (L3)';
  hitRatioPercent: number;
  totalKeys: number;
  memoryUsageMb: number;
  evictionPolicy: string;
}

export interface PerformancePosture {
  overallPerformanceScore: number;
  databaseEfficiencyScore: number;
  frontendPerformanceScore: number;
  mobilePerformanceScore: number;
  streamingPerformanceScore: number;
  loadTestReadinessScore: number;
  avgP95LatencyMs: number;
  globalCacheHitRatioPercent: number;
  sseThroughputEventsPerSec: number;
  wsConnectedSockets: number;
  mobileColdStartMs: number;
  mobileFrameDropPercent: number;
}

export interface PerformanceCertificationReport {
  generatedAt: string;
  certifiedBy: string;
  performanceReadinessScore: number;
  databaseEfficiencyScore: number;
  frontendPerformanceScore: number;
  mobilePerformanceScore: number;
  streamingPerformanceScore: number;
  loadTestReadinessScore: number;
  overallScore: number;
  filesModified: string[];
  filesCreated: string[];
  filesDeleted: string[];
  remainingManualTasks: string[];
}

// ==================== PHASE D13 PILOT READINESS & OAT TYPES ====================

export interface PilotModuleReadiness {
  id: string;
  moduleName: string;
  category: 'User Portals' | 'Core Platform' | 'Infrastructure & Ops';
  readinessScore: number;
  status: 'READY_FOR_PILOT' | 'QUALIFIED_WITH_GATES' | 'ACTION_REQUIRED';
  verifiedBy: string;
  lastChecked: string;
  notes: string;
}

export interface OatTestFlow {
  id: string;
  flowName: string;
  personaRole: 'Parent' | 'School Admin / Teacher' | 'C3 Operator' | 'Emergency Responder' | 'Technician' | 'Gov Admin';
  steps: string[];
  status: 'PASSED' | 'TESTING' | 'FAILED' | 'PENDING';
  lastRunTimestamp: string;
  durationMs: number;
  recordedBy: string;
  traceLogs: string[];
}

export interface PilotSchoolOnboarding {
  schoolId: string;
  schoolName: string;
  province: 'Gauteng' | 'Western Cape' | 'KwaZulu-Natal' | 'Eastern Cape';
  principalName: string;
  principalEmail: string;
  teachersCount: number;
  learnersEnrolled: number;
  parentsInvited: number;
  devicesAssigned: number;
  attendanceReadiness: '100% VERIFIED' | '95% READY' | 'PENDING';
  transportReadiness: 'ENABLED' | 'CONFIGURED' | 'PENDING';
  emergencyContactsSet: boolean;
  onboardingStatus: 'ONBOARDED_ACTIVE' | 'STAGE_2_PROVISIONING' | 'SCHEDULED';
}

export interface TrainingUserCategory {
  roleGroup: 'Parents' | 'School Administrators' | 'Teachers' | 'Command Center Operators' | 'Responders' | 'Field Technicians' | 'Gov Administrators';
  totalUsersTarget: number;
  completedTrainingCount: number;
  certifiedCount: number;
  untrainedCount: number;
  materialsAccessedPercent: number;
  certificationRatePercent: number;
  status: 'FULLY_CERTIFIED' | 'TARGET_MET' | 'IN_PROGRESS';
}

export interface PilotDeviceReadiness {
  deviceId: string;
  model: string;
  activationState: 'ACTIVATED' | 'PROVISIONED';
  batteryHealthPercent: number;
  firmwareVersion: string;
  gpsQualitySignal: 'EXCELLENT (12 Sats)' | 'GOOD (9 Sats)' | 'FAIR';
  telemetryHandshake: 'ACTIVE_250ms' | 'ACTIVE_500ms';
  heartbeatState: 'SYNCHRONIZED' | 'STANDBY';
  mTLSCertificateStatus: 'VALID_ECC_P256' | 'EXPIRING_30D';
  assignedLearnerId: string;
  duplicateProtectionStatus: 'PASS_UNIQUE_MAC';
}

export interface PilotSupportReadiness {
  deskAvailability: string;
  supportChannelPhone: string;
  supportChannelEmail: string;
  knowledgeBaseArticlesCount: number;
  onCallEngineersCount: number;
  avgTicketSlaResponseMin: number;
  escalationMatrixActive: boolean;
  incidentResponseContactsSet: boolean;
}

export interface PilotMetricsData {
  activeLearners: number;
  activeSchools: number;
  activeDevices: number;
  parentAdoptionRatePercent: number;
  attendanceVerificationRatePercent: number;
  telemetryUptimePercent: number;
  avgIncidentResponseTimeMin: number;
  deviceOfflineRatePercent: number;
  pilotUserEngagementScore: number;
  systemStabilityPercent: number;
}

export interface PilotRolloutControl {
  pilotGlobalEnabled: boolean;
  schoolActivationSchedule: {
    schoolId: string;
    schoolName: string;
    activationDate: string;
    status: 'ACTIVE' | 'SCHEDULED' | 'PAUSED';
  }[];
  activeProvinces: string[];
  featureFlagGates: {
    flagKey: string;
    description: string;
    enabled: boolean;
  }[];
  manualApprovalRequired: boolean;
  prePilotRollbackReady: boolean;
}

export interface PilotCertificationReport {
  generatedAt: string;
  certifiedBy: string;
  pilotReadinessScore: number;
  oatScore: number;
  trainingReadinessScore: number;
  supportReadinessScore: number;
  deviceReadinessScore: number;
  overallPilotScore: number;
  filesModified: string[];
  filesCreated: string[];
  filesDeleted: string[];
  outstandingManualTasks: string[];
}

// ==================== PHASE D14 GA RELEASE & HANDOVER TYPES ====================

export interface ReleaseMetadata {
  version: string;
  releaseName: string;
  buildNumber: string;
  gitSha: string;
  releaseDate: string;
  environmentTarget: string;
  checksumHashes: Record<string, string>;
  signingStatus: string;
}

export interface ReleaseArtifact {
  id: string;
  name: string;
  category: 'Web Application' | 'Mobile Application' | 'Backend Service' | 'Infrastructure Manifest' | 'Database Migration' | 'Documentation';
  targetPath: string;
  buildStatus: 'BUILT_VERIFIED' | 'PACKAGED' | 'SIGNED_STAGING';
  sha256Checksum: string;
  sizeBytes: string;
  verificationSigner: string;
}

export interface DeploymentHandbook {
  id: string;
  targetRole: 'Operations Team' | 'Support Team' | 'Cloud / DevOps Team' | 'School Administrators' | 'Parents' | 'Command Centre Operators' | 'Government Administrators' | 'Emergency Responders' | 'Field Technicians';
  title: string;
  summary: string;
  keyResponsibilities: string[];
  operationalSteps: string[];
  escalationPath: string;
  quickReferenceCommands: string[];
}

export interface ReleaseCertificationReport {
  generatedAt: string;
  releaseVersion: string;
  releaseName: string;
  certifiedBy: string;
  versionFreezeVerified: boolean;
  artifactPackagingScore: number;
  handoverReadinessScore: number;
  artifactReadinessScore: number;
  documentationReadinessScore: number;
  overallGaScore: number;
  filesModified: string[];
  filesCreated: string[];
  filesDeleted: string[];
  outstandingManualTasks: string[];
  signOffApproved: boolean;
}

// ==================== GO-LIVE, CUTOVER & PILOT ACTIVATION TYPES ====================

export interface GoLiveSystemHealth {
  component: string;
  category: 'Build' | 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'IoT Gateway' | 'Monitoring' | 'Backup' | 'Security' | 'Deployment' | 'Pilot' | 'Cutover' | 'Rollback';
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  latencyMs?: number;
  uptimePct?: number;
  lastChecked: string;
  details: string;
}

export interface CutoverStep {
  id: string;
  stepNumber: number;
  name: string;
  category: 'PRE_CUTOVER_SNAPSHOT' | 'FINAL_DATA_VERIFICATION' | 'DNS_TTL_REDUCTION' | 'TRAFFIC_SHIFT' | 'SERVICE_HEALTH_VERIFICATION' | 'WEBSOCKET_VERIFICATION' | 'SSE_VERIFICATION' | 'AUTH_VERIFICATION' | 'MOBILE_ENDPOINT_VERIFICATION' | 'ROLLBACK_TRIGGER_DETECTION' | 'POST_CUTOVER_MONITORING';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'VERIFIED' | 'FAILED';
  executedBy: string;
  executionTime?: string;
  verificationLog: string;
}

export interface PilotActivationTarget {
  id: string;
  targetType: 'Pilot Schools' | 'Pilot Parents' | 'Pilot Learners' | 'Pilot Teachers' | 'Command Centre Operators' | 'Responders' | 'Technicians' | 'Government Administrators';
  province: 'Gauteng' | 'Western Cape' | 'KwaZulu-Natal' | 'Eastern Cape' | 'Free State' | 'Limpopo' | 'Mpumalanga' | 'North West' | 'Northern Cape';
  entityName: string;
  activeUsersCount: number;
  activationStatus: 'NOT_ACTIVATED' | 'STAGED' | 'ACTIVE_PILOT' | 'PAUSED';
  featureFlagsEnabled: string[];
  activatedAt?: string;
}

export interface RolloutGateControl {
  id: string;
  systemComponent: 'website' | 'auth' | 'parent portal' | 'school portal' | 'command centre' | 'government portal' | 'executive dashboard' | 'emergency responder app' | 'technician app' | 'IoT device gateway' | 'notifications' | 'analytics';
  gateMode: 'enabled' | 'disabled' | 'pilot-only' | 'production' | 'rollback';
  trafficAllocationPct: number;
  approvedBy: string;
  lastUpdated: string;
  notes: string;
}

export interface HypercareWatchItem {
  id: string;
  watchName: string;
  watchCategory: 'deployment watch' | 'error rate watch' | 'latency watch' | 'device offline watch' | 'notification delivery watch' | 'certificate watch' | 'database watch';
  alertThreshold: string;
  currentMetricValue: string;
  status: 'OPTIMAL' | 'ELEVATED' | 'BREACH';
  supportDeskRoute: string;
  escalationLead: string;
}

export interface RollbackActionControl {
  id: string;
  targetScope: 'application rollback' | 'database rollback' | 'configuration rollback' | 'feature flag rollback' | 'traffic rollback' | 'mobile release rollback' | 'certificate rollback';
  status: 'STANDBY' | 'ARMED' | 'EXECUTING' | 'COMPLETED_ROLLBACK';
  rollbackDecisionLog: string[];
  approvalStatus: 'NOT_REQUIRED' | 'PENDING_APPROVAL' | 'APPROVED_CSO';
  executableCommand: string;
}

export interface OperationalCommunicationNotice {
  id: string;
  noticeType: 'pilot launch notice' | 'go-live notice' | 'support escalation notice' | 'maintenance notice' | 'rollback notice' | 'incident update notice' | 'external stakeholder notice';
  targetAudience: string;
  subjectLine: string;
  bodyContent: string;
  publishedAt: string;
  channel: 'Email' | 'SMS' | 'C3 Broadcast' | 'In-App Banner' | 'Government Gazette';
}

export interface FinalAcceptanceCheckItem {
  id: string;
  category: string;
  checkItem: string;
  targetVerification: string;
  status: 'PASSED' | 'PENDING';
  verifiedAt: string;
}

export interface NationalRolloutReadinessProvince {
  province: string;
  code: string;
  districtsCount: number;
  schoolsCount: number;
  provinceReadinessPct: number;
  districtReadinessPct: number;
  schoolReadinessPct: number;
  parentReadinessPct: number;
  deviceReadinessPct: number;
  supportReadinessPct: number;
  trainingReadinessPct: number;
  operationsReadinessPct: number;
  securityReadinessPct: number;
  commercialReadinessPct: number;
  overallStatus: 'READY_FOR_PILOT' | 'PILOT_EXPANSION' | 'NATIONAL_ROLLOUT_READY';
}

export interface FinalGoLiveReport {
  generatedAt: string;
  versionTag: string;
  certifiedBy: string;
  filesModified: string[];
  filesCreated: string[];
  filesDeleted: string[];
  goLiveReadinessScore: number;
  pilotActivationScore: number;
  cutoverReadinessScore: number;
  rollbackReadinessScore: number;
  operationalHandoverScore: number;
  nationalRolloutReadinessScore: number;
  remainingManualTasks: string[];
  goLiveApproved: boolean;
}


