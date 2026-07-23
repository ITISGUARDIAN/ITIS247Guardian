export type ServiceStatus = 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE' | 'MAINTENANCE';

export interface ServiceHealth {
  id: string; // e.g. SVC-001
  name: string;
  category: 'DATABASE' | 'BROKER' | 'AI_ENGINE' | 'GATEWAY' | 'CORE_API' | 'DISPATCH';
  status: ServiceStatus;
  latencyMs: number;
  cpuUtilPct: number;
  memoryUtilPct: number;
  uptime90dPct: number;
  replicaCount: number;
  lastHealthCheck: string;
}

export interface PlatformAlert {
  id: string; // e.g. ALT-10082
  serviceName: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  message: string;
  triggeredAt: string;
  channelSent: 'PAGERDUTY' | 'SLACK' | 'SMS' | 'EMAIL';
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
}

export interface BackupJob {
  id: string; // e.g. BKP-2026-0091
  databaseName: string;
  type: 'POINT_IN_TIME' | 'FULL_SNAPSHOT' | 'CROSS_REGION_REPL';
  sizeGb: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'FAILED';
  encrypted: boolean;
  region: string;
  completedAt: string;
}

export interface FeatureFlag {
  id: string; // e.g. FF-001
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  updatedBy: string;
}

export interface EporeCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Schema' | 'Platform Health Service' | 'Alert Engine Service' | 'Disaster Recovery Service' | 'REST Controller';
  description: string;
  code: string;
}

// SAMPLE SERVICE HEALTH MONITORS
export const SAMPLE_SERVICES: ServiceHealth[] = [
  {
    id: 'SVC-PGSQL-001',
    name: 'PostgreSQL + PostGIS Geospatial DB',
    category: 'DATABASE',
    status: 'OPERATIONAL',
    latencyMs: 3.4,
    cpuUtilPct: 24.5,
    memoryUtilPct: 48.2,
    uptime90dPct: 99.99,
    replicaCount: 3,
    lastHealthCheck: '2 SEC AGO',
  },
  {
    id: 'SVC-MQTT-002',
    name: 'MQTT IoT Device Ingestion Cluster',
    category: 'BROKER',
    status: 'OPERATIONAL',
    latencyMs: 1.2,
    cpuUtilPct: 38.0,
    memoryUtilPct: 52.1,
    uptime90dPct: 100.0,
    replicaCount: 6,
    lastHealthCheck: '1 SEC AGO',
  },
  {
    id: 'SVC-REDIS-003',
    name: 'Redis In-Memory State Cache',
    category: 'DATABASE',
    status: 'OPERATIONAL',
    latencyMs: 0.8,
    cpuUtilPct: 18.2,
    memoryUtilPct: 64.0,
    uptime90dPct: 99.99,
    replicaCount: 4,
    lastHealthCheck: '1 SEC AGO',
  },
  {
    id: 'SVC-APCPE-004',
    name: 'APCPE Predictive AI Inference Engine',
    category: 'AI_ENGINE',
    status: 'OPERATIONAL',
    latencyMs: 12.4,
    cpuUtilPct: 42.8,
    memoryUtilPct: 71.5,
    uptime90dPct: 99.98,
    replicaCount: 8,
    lastHealthCheck: '2 SEC AGO',
  },
  {
    id: 'SVC-GATEWAY-005',
    name: 'EIEPG Enterprise Integration Gateway',
    category: 'GATEWAY',
    status: 'DEGRADED',
    latencyMs: 48.2,
    cpuUtilPct: 78.4,
    memoryUtilPct: 82.0,
    uptime90dPct: 99.95,
    replicaCount: 4,
    lastHealthCheck: '3 SEC AGO',
  },
  {
    id: 'SVC-C3-006',
    name: 'C3 Command Centre WebSocket Gateway',
    category: 'CORE_API',
    status: 'OPERATIONAL',
    latencyMs: 4.1,
    cpuUtilPct: 31.0,
    memoryUtilPct: 45.8,
    uptime90dPct: 99.99,
    replicaCount: 5,
    lastHealthCheck: '1 SEC AGO',
  },
];

// SAMPLE ACTIVE PLATFORM ALERTS
export const SAMPLE_ALERTS: PlatformAlert[] = [
  {
    id: 'ALT-10082',
    serviceName: 'EIEPG Enterprise Integration Gateway',
    severity: 'WARNING',
    title: 'High API Latency Spike (>45ms)',
    message: 'Gauteng EMS Dispatch endpoint experiencing upstream gateway timeouts.',
    triggeredAt: '2026-07-21 22:58:12',
    channelSent: 'PAGERDUTY',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-10081',
    serviceName: 'MQTT IoT Device Ingestion Cluster',
    severity: 'INFO',
    title: 'Autoscaling Event Triggered (+2 Replicas)',
    message: 'GPS pings exceeded 45,000 pings/sec during morning commute surge.',
    triggeredAt: '2026-07-21 21:15:00',
    channelSent: 'SLACK',
    status: 'ACKNOWLEDGED',
  },
];

// SAMPLE DISASTER RECOVERY BACKUP JOBS
export const SAMPLE_BACKUPS: BackupJob[] = [
  {
    id: 'BKP-2026-0091',
    databaseName: 'PostgreSQL Main Production Cluster',
    type: 'POINT_IN_TIME',
    sizeGb: 482.5,
    status: 'COMPLETED',
    encrypted: true,
    region: 'af-south-1 (Cape Town Primary)',
    completedAt: '2026-07-21 22:00:00',
  },
  {
    id: 'BKP-2026-0090',
    databaseName: 'TimescaleDB Telemetry Timeseries',
    type: 'CROSS_REGION_REPL',
    sizeGb: 1240.8,
    status: 'COMPLETED',
    encrypted: true,
    region: 'eu-west-1 (Ireland Replica)',
    completedAt: '2026-07-21 21:30:00',
  },
];

// SAMPLE FEATURE FLAGS
export const SAMPLE_FEATURE_FLAGS: FeatureFlag[] = [
  {
    id: 'FF-001',
    key: 'ENABLE_MUTUAL_TLS_STRICT',
    name: 'Strict Mutual TLS Enforcer',
    description: 'Enforces x509 client cert validation on all third-party partner REST endpoints.',
    enabled: true,
    rolloutPercentage: 100,
    updatedBy: 'SRE_Lead_DevSecOps',
  },
  {
    id: 'FF-002',
    key: 'ENABLE_CANARY_AI_PREDICTION_V3',
    name: 'APCPE AI Risk Model v3.2 Canary',
    description: 'Routes 15% of live telemetry packets to experimental Transformer risk predictor.',
    enabled: true,
    rolloutPercentage: 15,
    updatedBy: 'AI_Platform_Principal',
  },
  {
    id: 'FF-003',
    key: 'ENABLE_AUTOMATED_SAPS_DISPATCH',
    name: 'Auto SAPS Dispatch for Priority 1 SOS',
    description: 'Automatically dispatches CAD incident packets to SAPS without manual operator approval if AI confidence >98%.',
    enabled: false,
    rolloutPercentage: 0,
    updatedBy: 'Safety_Operations_Director',
  },
];

// EPORE CODE SPECS
export const EPORE_CODE_SPECS: EporeCodeSpec[] = [
  {
    id: 1,
    title: 'EPORE Platform Operations & Resilience Prisma Schema',
    filename: 'prisma/schema.prisma',
    category: 'Prisma Schema',
    description: 'Relational database schema storing service health heartbeats, distributed trace correlation logs, alert triggers, automated backup manifests, and feature flag states.',
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum ServiceStatus {
  OPERATIONAL
  DEGRADED
  OUTAGE
  MAINTENANCE
}

enum AlertSeverity {
  INFO
  WARNING
  CRITICAL
}

model ServiceHealth {
  id                String          @id @default(uuid())
  name              String          @unique
  category          String
  status            ServiceStatus   @default(OPERATIONAL)
  latencyMs         Float
  cpuUtilPct        Float
  memoryUtilPct     Float
  uptime90dPct      Float           @default(99.99)
  replicaCount      Int             @default(3)
  lastHealthCheck   DateTime        @default(now())

  alerts            PlatformAlert[]
}

model PlatformAlert {
  id                String          @id @default(uuid())
  serviceId         String
  severity          AlertSeverity   @default(WARNING)
  title             String
  message           String
  triggeredAt       DateTime        @default(now())
  status            String          @default("ACTIVE") // ACTIVE, RESOLVED

  service           ServiceHealth   @relation(fields: [serviceId], references: [id], onDelete: Cascade)
}

model BackupJob {
  id                String          @id @default(uuid())
  databaseName      String
  type              String          // POINT_IN_TIME, CROSS_REGION
  sizeGb            Float
  status            String          // COMPLETED, IN_PROGRESS
  encrypted         Boolean         @default(true)
  region            String
  completedAt       DateTime        @default(now())
}

model FeatureFlag {
  id                String          @id @default(uuid())
  key               String          @unique
  name              String
  description       String
  enabled           Boolean         @default(false)
  rolloutPercentage Int             @default(0)
  updatedBy         String
  updatedAt         DateTime        @updatedAt
}`
  },
  {
    id: 2,
    title: 'EPORE Real-Time Health & SRE Metrics Collector Service',
    filename: 'src/epore/services/platform-health.service.ts',
    category: 'Platform Health Service',
    description: 'NestJS Site Reliability Engineering service gathering 10-second heartbeat probes across PostgreSQL, Redis, MQTT brokers, and AI Inference Replicas.',
    code: `import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PlatformHealthService {
  private readonly logger = new Logger(PlatformHealthService.name);

  // Solicits synthetic heartbeat probes across core microservices
  async probeAllServices() {
    this.logger.log('EXECUTING SRE PLATFORM HEALTH SYNTHETIC PROBES...');

    return [
      { name: 'PostgreSQL + PostGIS', status: 'OPERATIONAL', latencyMs: 3.4, uptime: 99.99 },
      { name: 'MQTT IoT Device Ingestion', status: 'OPERATIONAL', latencyMs: 1.2, uptime: 100.0 },
      { name: 'Redis Cache Cluster', status: 'OPERATIONAL', latencyMs: 0.8, uptime: 99.99 },
      { name: 'APCPE AI Inference Engine', status: 'OPERATIONAL', latencyMs: 12.4, uptime: 99.98 },
      { name: 'EIEPG External Gateway', status: 'DEGRADED', latencyMs: 48.2, uptime: 99.95 },
    ];
  }

  // Returns overall system status
  getSystemHealthSummary() {
    return {
      globalStatus: 'OPERATIONAL',
      availabilityTarget: '99.99%',
      activeAlertsCount: 1,
      lastFullBackup: '22 MIN AGO',
    };
  }
}`
  },
  {
    id: 3,
    title: 'EPORE Automated Disaster Recovery & Backup Service',
    filename: 'src/epore/services/disaster-recovery.service.ts',
    category: 'Disaster Recovery Service',
    description: 'Manages automated AES-256 encrypted database snapshots, cross-region replication to secondary cloud zones, and point-in-time recovery (PITR) validation.',
    code: `import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DisasterRecoveryService {
  private readonly logger = new Logger(DisasterRecoveryService.name);

  async triggerPointInTimeBackup(databaseName: string) {
    const backupId = \`BKP-\${new Date().getFullYear()}-\${Math.floor(1000 + Math.random() * 9000)}\`;
    this.logger.log(\`TRIGGERING POINT-IN-TIME BACKUP: \${backupId} for DB \${databaseName}\`);

    return {
      backupId,
      databaseName,
      status: 'COMPLETED',
      sizeGb: 482.5,
      encrypted: true,
      encryptionAlgo: 'AES-256-GCM',
      destinationRegion: 'eu-west-1 (Ireland Replica)',
      completedAt: new Date().toISOString(),
    };
  }
}`
  },
  {
    id: 4,
    title: 'EPORE Operations & Alert Management REST Controller',
    filename: 'src/epore/controllers/platform-operations.controller.ts',
    category: 'REST Controller',
    description: 'REST endpoints for querying live SRE infrastructure metrics, resolving alerts, toggling feature flags, and triggering automated disaster recovery backups.',
    code: `import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('platform')
export class PlatformOperationsController {

  @Get('health')
  async getHealthStatus() {
    return {
      status: 'OPERATIONAL',
      activeReplicas: 30,
      systemUptime90d: 99.99,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('alerts/resolve/:id')
  async resolveAlert(@Param('id') alertId: string) {
    return {
      alertId,
      status: 'RESOLVED',
      resolvedAt: new Date().toISOString(),
    };
  }

  @Post('feature-flags/toggle')
  async toggleFeatureFlag(@Body() body: { key: string; enabled: boolean }) {
    return {
      key: body.key,
      enabled: body.enabled,
      updatedAt: new Date().toISOString(),
    };
  }
}`
  }
];

// CRITICAL EPORE MANDATORY RULES
export const CRITICAL_EPORE_RULES = [
  { id: 1, title: 'Zero Silent Interruption of Safety Services', ruleText: 'Platform infrastructure failures must never silently interrupt child protection services or emergency dispatching.', badge: 'ZERO SILENT FAIL' },
  { id: 2, title: '100% Immutable Operational Audit Trails', ruleText: 'Every operational deployment, configuration change, and alert resolution is permanently recorded in an immutable log.', badge: 'AUDIT ALL' },
  { id: 3, title: 'Actionable & Traceable Alert Notifications', ruleText: 'Every alert triggered contains clear root cause traces, severity metrics, and direct links to resolution runbooks.', badge: 'ACTIONABLE ALERT' },
  { id: 4, title: 'Encrypted & Continuously Validated Backups', ruleText: 'All database backups are encrypted with AES-256-GCM and validated with automated restore drills.', badge: 'AES-256 BACKUP' },
  { id: 5, title: 'Continuous Disaster Recovery Testing', ruleText: 'Point-in-time recovery and cross-region failover procedures undergo automated synthetic drills every week.', badge: 'DR DRILLS' },
  { id: 6, title: 'Version-Controlled Infrastructure & Configs', ruleText: 'All environment parameters, feature flags, and deployment manifests are version-controlled and signed.', badge: 'CONFIG AS CODE' },
  { id: 7, title: 'Centralized Security Anomaly Monitoring', ruleText: 'Failed logins, privilege escalations, and token replay attempts are monitored in real time by DevSecOps.', badge: 'SEC MON' },
  { id: 8, title: 'Read-Only Operational Dashboards for Safety', ruleText: 'Public and operational monitoring dashboards are read-only to prevent unauthorized system mutation.', badge: 'READ ONLY DASH' },
  { id: 9, title: 'Zero Exposure of Learner PII in SRE Metrics', ruleText: 'Observability stacks and telemetry logs strip all learner PII to remain 100% POPIA compliant.', badge: 'STRIP PII' },
  { id: 10, title: 'Single Purpose: Continuous Protection Availability', ruleText: 'The SRE platform exists to guarantee uninterrupted protection of every child carrying an ITIS GPS wearable.', badge: '99.99% UPTIME' },
];
