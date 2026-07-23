export interface NationalKpis {
  protectedLearners: number;
  activeDevicesOnline: number;
  onlinePercentage: number;
  activeSchools: number;
  todayIncidentsCount: number;
  avgResponseTimeSec: number;
  avgDispatchTimeSec: number;
  avgDecisionLatencyMs: number;
  systemUptimePercentage: number;
}

export interface LearnerGpsMarker {
  id: string;
  learnerName: string;
  schoolName: string;
  lat: number;
  lng: number;
  batteryPct: number;
  threatLevel: 'NORMAL' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
  status: 'IN_CLASS' | 'IN_TRANSIT' | 'SAFE_ZONE' | 'EMERGENCY_SOS';
  deviceCallSign: string;
  lastHeartbeatSecAgo: number;
}

export interface IncidentWallItem {
  id: string; // e.g. ITIS-2026-GP-00000045
  priority: 'PRIORITY_1' | 'PRIORITY_2' | 'PRIORITY_3';
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'LOW';
  learnerName: string;
  schoolName: string;
  parentContact: string;
  province: string;
  district: string;
  assignedResponders: string[];
  liveEtaSeconds: number;
  elapsedMinutes: number;
  status: 'ACTIVE' | 'DISPATCHED' | 'ON_SCENE' | 'RESOLVED' | 'ESCALATED';
  slaCountdownSec: number;
}

export interface DeviceHealthRecord {
  id: string;
  imei: string;
  learnerName: string;
  batteryPct: number;
  signalDbm: number;
  cellularOperator: 'Vodacom ZA' | 'MTN SA' | 'Telkom Mobile' | 'Cell C';
  lastHeartbeat: string;
  firmwareVersion: string;
  tamperState: 'NORMAL' | 'TAMPERED';
  chargingState: 'DISCHARGING' | 'CHARGING' | 'FULL';
  gpsFixQuality: '3D_FIX' | '2D_FIX' | 'NO_FIX';
  temperatureC: number;
  offlineDurationMinutes: number;
}

export interface SchoolOperationalStatus {
  id: string;
  schoolName: string;
  province: string;
  totalEnrolled: number;
  presentOnCampus: number;
  inTransit: number;
  activeAlertsCount: number;
  geofenceStatus: 'INTACT' | 'BREACHED';
  emergencyStatus: 'NORMAL' | 'LOCKDOWN' | 'DISPATCH_ACTIVE';
}

export interface TransportVehicleStatus {
  id: string;
  registration: string;
  driverName: string;
  routeCode: string;
  assignedLearnersCount: number;
  speedKmh: number;
  routeCompliancePct: number;
  status: 'ON_SCHEDULE' | 'DELAYED' | 'DEVIATED' | 'INCIDENT';
  nextStop: string;
  estimatedEtaNextStopMin: number;
}

export interface LiveStreamEvent {
  id: string;
  timestamp: string;
  eventType: string; // e.g. "telemetry.received", "geofence.exit", "sos.triggered"
  learnerName: string;
  description: string;
  severity: 'INFO' | 'WARN' | 'CRITICAL';
}

export interface C3CodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Schema' | 'NestJS WebSocket Gateway' | 'REST Controller' | 'GIS Engine';
  description: string;
  code: string;
}

// SAMPLE NATIONAL KPIS
export const SAMPLE_NATIONAL_KPIS: NationalKpis = {
  protectedLearners: 254890,
  activeDevicesOnline: 248120,
  onlinePercentage: 97.34,
  activeSchools: 1240,
  todayIncidentsCount: 14,
  avgResponseTimeSec: 210,
  avgDispatchTimeSec: 85,
  avgDecisionLatencyMs: 42,
  systemUptimePercentage: 99.99,
};

// SAMPLE LEARNER MAP MARKERS
export const SAMPLE_MAP_MARKERS: LearnerGpsMarker[] = [
  {
    id: 'LRN-GP-001',
    learnerName: 'Sipho Zulu',
    schoolName: 'Orlando West High School',
    lat: -26.2388,
    lng: 27.855,
    batteryPct: 88,
    threatLevel: 'CRITICAL',
    status: 'EMERGENCY_SOS',
    deviceCallSign: 'WEARABLE-GP-8821',
    lastHeartbeatSecAgo: 2,
  },
  {
    id: 'LRN-GP-002',
    learnerName: 'Kagiso Mokoena',
    schoolName: 'Soweto Secondary School',
    lat: -26.242,
    lng: 27.862,
    batteryPct: 92,
    threatLevel: 'HIGH',
    status: 'IN_TRANSIT',
    deviceCallSign: 'WEARABLE-GP-9912',
    lastHeartbeatSecAgo: 4,
  },
  {
    id: 'LRN-GP-003',
    learnerName: 'Amahle Dlamini',
    schoolName: 'Diepkloof Primary School',
    lat: -26.251,
    lng: 27.91,
    batteryPct: 64,
    threatLevel: 'NORMAL',
    status: 'IN_CLASS',
    deviceCallSign: 'WEARABLE-GP-1044',
    lastHeartbeatSecAgo: 10,
  },
  {
    id: 'LRN-GP-004',
    learnerName: 'Thabo Ndlovu',
    schoolName: 'Alexandra High School',
    lat: -26.104,
    lng: 28.09,
    batteryPct: 18,
    threatLevel: 'ELEVATED',
    status: 'IN_TRANSIT',
    deviceCallSign: 'WEARABLE-GP-7721',
    lastHeartbeatSecAgo: 15,
  },
];

// SAMPLE INCIDENT WALL
export const SAMPLE_INCIDENT_WALL: IncidentWallItem[] = [
  {
    id: 'ITIS-2026-GP-00000045',
    priority: 'PRIORITY_1',
    threatLevel: 'CRITICAL',
    learnerName: 'Sipho Zulu',
    schoolName: 'Orlando West High',
    parentContact: 'Nomvula Zulu (+27 82 555 0192)',
    province: 'Gauteng',
    district: 'Johannesburg West (D12)',
    assignedResponders: ['SAPS Soweto Tactical #4', 'Fidelity ADT Armed #88'],
    liveEtaSeconds: 165,
    elapsedMinutes: 4,
    status: 'DISPATCHED',
    slaCountdownSec: 240,
  },
  {
    id: 'ITIS-2026-GP-00000046',
    priority: 'PRIORITY_2',
    threatLevel: 'HIGH',
    learnerName: 'Kagiso Mokoena',
    schoolName: 'Soweto Secondary',
    parentContact: 'Tshepo Mokoena (+27 83 444 8810)',
    province: 'Gauteng',
    district: 'Johannesburg West (D12)',
    assignedResponders: ['JMPD K9 & Traffic #12'],
    liveEtaSeconds: 0,
    elapsedMinutes: 12,
    status: 'ON_SCENE',
    slaCountdownSec: 0,
  },
];

// SAMPLE DEVICE HEALTH RECORDS
export const SAMPLE_DEVICE_HEALTH: DeviceHealthRecord[] = [
  {
    id: 'DEV-8821',
    imei: '869402058192012',
    learnerName: 'Sipho Zulu',
    batteryPct: 88,
    signalDbm: -68,
    cellularOperator: 'Vodacom ZA',
    lastHeartbeat: '2s ago',
    firmwareVersion: 'v2.4.12-itis-p029',
    tamperState: 'NORMAL',
    chargingState: 'DISCHARGING',
    gpsFixQuality: '3D_FIX',
    temperatureC: 32.4,
    offlineDurationMinutes: 0,
  },
  {
    id: 'DEV-9912',
    imei: '869402058192019',
    learnerName: 'Kagiso Mokoena',
    batteryPct: 92,
    signalDbm: -72,
    cellularOperator: 'MTN SA',
    lastHeartbeat: '4s ago',
    firmwareVersion: 'v2.4.12-itis-p029',
    tamperState: 'NORMAL',
    chargingState: 'DISCHARGING',
    gpsFixQuality: '3D_FIX',
    temperatureC: 31.8,
    offlineDurationMinutes: 0,
  },
  {
    id: 'DEV-7721',
    imei: '869402058192088',
    learnerName: 'Thabo Ndlovu',
    batteryPct: 14,
    signalDbm: -98,
    cellularOperator: 'Telkom Mobile',
    lastHeartbeat: '15s ago',
    firmwareVersion: 'v2.4.10-itis-p029',
    tamperState: 'NORMAL',
    chargingState: 'DISCHARGING',
    gpsFixQuality: '2D_FIX',
    temperatureC: 35.1,
    offlineDurationMinutes: 0,
  },
];

// SAMPLE SCHOOL STATUS
export const SAMPLE_SCHOOL_STATUS: SchoolOperationalStatus[] = [
  {
    id: 'SCH-001',
    schoolName: 'Orlando West High School',
    province: 'Gauteng',
    totalEnrolled: 1240,
    presentOnCampus: 1198,
    inTransit: 38,
    activeAlertsCount: 1,
    geofenceStatus: 'INTACT',
    emergencyStatus: 'DISPATCH_ACTIVE',
  },
  {
    id: 'SCH-002',
    schoolName: 'Soweto Secondary School',
    province: 'Gauteng',
    totalEnrolled: 980,
    presentOnCampus: 950,
    inTransit: 28,
    activeAlertsCount: 1,
    geofenceStatus: 'BREACHED',
    emergencyStatus: 'NORMAL',
  },
];

// SAMPLE TRANSPORT STATUS
export const SAMPLE_TRANSPORT_STATUS: TransportVehicleStatus[] = [
  {
    id: 'VEH-001',
    registration: 'GP 44 TR ZN',
    driverName: 'Mr P. Khumalo',
    routeCode: 'ROUTE-SOWETO-A',
    assignedLearnersCount: 22,
    speedKmh: 42,
    routeCompliancePct: 98.5,
    status: 'ON_SCHEDULE',
    nextStop: 'Orlando West High Gate 1',
    estimatedEtaNextStopMin: 4,
  },
  {
    id: 'VEH-002',
    registration: 'GP 88 BUS ZA',
    driverName: 'Mr S. Cele',
    routeCode: 'ROUTE-SOWETO-B',
    assignedLearnersCount: 35,
    speedKmh: 58,
    routeCompliancePct: 82.0,
    status: 'DEVIATED',
    nextStop: 'Diepkloof Ext 3',
    estimatedEtaNextStopMin: 9,
  },
];

// SAMPLE LIVE EVENT STREAM
export const SAMPLE_LIVE_EVENTS: LiveStreamEvent[] = [
  {
    id: 'EVT-9001',
    timestamp: '18:32:45',
    eventType: 'sos.triggered',
    learnerName: 'Sipho Zulu',
    description: 'Hardware SOS button held for 3.0 seconds near Vilakazi St.',
    severity: 'CRITICAL',
  },
  {
    id: 'EVT-9002',
    timestamp: '18:32:46',
    eventType: 'incident.created',
    learnerName: 'Sipho Zulu',
    description: 'Priority 1 Incident ITIS-2026-GP-00000045 created by CSDE & EIOE.',
    severity: 'CRITICAL',
  },
  {
    id: 'EVT-9003',
    timestamp: '18:32:48',
    eventType: 'dispatch.accepted',
    learnerName: 'Sipho Zulu',
    description: 'SAPS Soweto Tactical #4 accepted dispatch. En route.',
    severity: 'INFO',
  },
  {
    id: 'EVT-9004',
    timestamp: '18:33:10',
    eventType: 'telemetry.received',
    learnerName: 'Kagiso Mokoena',
    description: 'Heartbeat received via Vodacom LTE: Battery 92%, Speed 35 km/h.',
    severity: 'INFO',
  },
];

// CODE SPECS FOR C3
export const C3_CODE_SPECS: C3CodeSpec[] = [
  {
    id: 1,
    title: 'C3 Command & Control Relational Prisma Schema',
    filename: 'prisma/schema.prisma',
    category: 'Prisma Schema',
    description: 'Relational schema for workstation sessions, live operational events, map layer configurations, national KPIs, and immutable operator audit logs.',
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum OperatorRole {
  NATIONAL_COMMANDER
  PROVINCIAL_LEAD
  DISTRICT_DISPATCHER
  C3_OPERATOR
  AUDITOR
}

model CommandCentreSession {
  id                String             @id @default(uuid())
  operatorId        String
  operatorName      String
  role              OperatorRole
  workstationIp     String
  startedAt         DateTime           @default(now())
  lastActiveAt      DateTime           @default(now())
  isLocked          Boolean            @default(false)

  activities        OperatorActivity[]
}

model OperatorActivity {
  id                String               @id @default(uuid())
  sessionId         String
  action            String               // e.g. ESCALATE_INCIDENT, BROADCAST_NOTICE
  targetId          String?
  details           String
  timestamp         DateTime             @default(now())

  session           CommandCentreSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
}

model LiveOperationalEvent {
  id                String             @id @default(uuid())
  eventType         String             // e.g. sos.triggered, geofence.exit
  learnerId         String?
  incidentId        String?
  severity          String             // INFO, WARN, CRITICAL
  description       String
  payloadJson       Json
  timestamp         DateTime           @default(now())

  @@index([timestamp])
  @@index([severity])
}

model SystemKpiSnapshot {
  id                String             @id @default(uuid())
  timestamp         DateTime           @default(now())
  protectedLearners Int
  activeDevices     Int
  onlinePct         Float
  avgResponseSec    Int
  avgDecisionMs     Int
}`
  },
  {
    id: 2,
    title: 'C3 Real-Time WebSocket Gateway for National COP',
    filename: 'src/command-center/gateways/operations.gateway.ts',
    category: 'NestJS WebSocket Gateway',
    description: 'NestJS WebSocket gateway handling live telemetry streams, incident wall updates, device heartbeats, and GIS map marker propagation (<250ms latency).',
    code: `import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/ws/operations',
})
export class OperationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(OperationsGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(\`C3 Workstation Connected: \${client.id}\`);
    client.join('cop-national-feed');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(\`C3 Workstation Disconnected: \${client.id}\`);
  }

  @SubscribeMessage('subscribe_learner_map')
  handleMapSubscribe(client: Socket, payload: { provinceCode: string }) {
    client.join(\`map-\${payload.provinceCode}\`);
    return { status: 'SUBSCRIBED', province: payload.provinceCode };
  }

  // Broadcast live telemetry update to all connected C3 operators
  broadcastTelemetryUpdate(marker: any) {
    this.server.to('cop-national-feed').emit('telemetry_marker_update', marker);
  }

  // Broadcast incident creation or escalation
  broadcastIncidentAlert(incident: any) {
    this.server.to('cop-national-feed').emit('incident_alert', incident);
  }
}`
  },
  {
    id: 3,
    title: 'C3 Operations & Workstation REST Controller',
    filename: 'src/command-center/controllers/operations.controller.ts',
    category: 'REST Controller',
    description: 'REST API endpoints for querying national KPIs, searching protected learners across GIS layers, locking operator workstations, and exporting incident summaries.',
    code: `import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('c3/operations')
export class OperationsController {

  @Get('kpis')
  async getNationalKpis() {
    return {
      protectedLearners: 254890,
      activeDevicesOnline: 248120,
      onlinePercentage: 97.34,
      avgResponseTimeSec: 210,
      avgDecisionLatencyMs: 42,
      systemUptimePercentage: 99.99,
    };
  }

  @Get('learners/search')
  async searchLearnerGps(@Query('query') query: string) {
    return {
      matchCount: 1,
      results: [
        {
          id: 'LRN-GP-001',
          learnerName: 'Sipho Zulu',
          lat: -26.2388,
          lng: 27.855,
          threatLevel: 'CRITICAL',
        },
      ],
    };
  }

  @Post('workstation/lock')
  async lockWorkstation(@Body() body: { sessionId: string }) {
    return { sessionId: body.sessionId, status: 'LOCKED', timestamp: new Date().toISOString() };
  }
}`
  }
];

// CRITICAL C3 MANDATORY RULES
export const CRITICAL_C3_RULES = [
  { id: 1, title: 'Real-Time Common Operational Picture (COP)', ruleText: 'All protected learners, devices, and incidents render in a single unified dashboard view.', badge: 'UNIFIED COP' },
  { id: 2, title: 'Sub-250ms WebSocket Broadcast', ruleText: 'Telemetry updates propagate across connected operator workstations via Socket.io with <250ms latency.', badge: 'SUB-250MS WS' },
  { id: 3, title: 'Immutable Operator Audit Logging', ruleText: 'Every action (escalation, search, lock, broadcast) is permanently recorded with workstation IP.', badge: 'PERMANENT AUDIT' },
  { id: 4, title: 'Role-Based Dashboard Views', ruleText: 'National Commanders, Provincial Leads, and District Dispatchers access tailored operational layers.', badge: 'RBAC SCOPED' },
  { id: 5, title: 'Screen Privacy & Workstation Lock', ruleText: 'Operators can lock workstations instantly with mTLS session resumption.', badge: 'WORKSTATION LOCK' },
  { id: 6, title: 'Live SLA Countdown Monitor', ruleText: 'Every active incident displays a real-time SLA countdown timer with visual alert thresholds.', badge: 'SLA TIMER' },
  { id: 7, title: 'Device Fleet Health Diagnostics', ruleText: 'Monitors battery %, cellular signal (dBm), GPS fix quality, and firmware version per wearable.', badge: 'FLEET HEALTH' },
  { id: 8, title: 'School & Transport Safety Synchronization', ruleText: 'Correlates school campus attendance with scholar transport vehicle route compliance.', badge: 'CAMPUS & FLEET' },
  { id: 9, title: '250,000+ Active Learner Scale', ruleText: 'Architected to render 250,000+ simultaneously tracked learners without browser lag.', badge: 'ENTERPRISE SCALE' },
  { id: 10, title: 'Digital Twin Infrastructure Synchronization', ruleText: 'Maintains a live digital twin of all physical wearables, vehicles, and safe zones.', badge: 'DIGITAL TWIN' },
];
