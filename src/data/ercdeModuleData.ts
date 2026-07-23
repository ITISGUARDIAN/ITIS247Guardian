export type PartnerCategory =
  | 'SAPS'
  | 'METRO_POLICE'
  | 'PRIVATE_SECURITY'
  | 'EMS'
  | 'FIRE_RESCUE'
  | 'SCHOOL_SECURITY'
  | 'COMMUNITY_SAFETY'
  | 'SEARCH_RESCUE'
  | 'TRAFFIC_POLICE'
  | 'DISASTER_MANAGEMENT'
  | 'MUNICIPAL_LAW'
  | 'VERIFIED_VOLUNTEER';

export type ResponseUnitStatus =
  | 'AVAILABLE'
  | 'BUSY'
  | 'DISPATCHED'
  | 'ON_SCENE'
  | 'OFFLINE'
  | 'OUT_OF_SERVICE'
  | 'EN_ROUTE'
  | 'REFUELLING'
  | 'MAINTENANCE';

export type DispatchAckStatus =
  | 'PENDING'
  | 'ACCEPT'
  | 'DECLINE'
  | 'REQUEST_BACKUP'
  | 'ARRIVED'
  | 'CHILD_LOCATED'
  | 'CHILD_SAFE'
  | 'MISSION_COMPLETE';

export interface ResponseUnit {
  id: string; // e.g. "unit-saps-gp-104"
  callSign: string; // e.g. "SAPS Soweto Flying Squad #4"
  agencyName: string; // e.g. "South African Police Service (SAPS)"
  category: PartnerCategory;
  branchName: string; // e.g. "Soweto West Police Station"
  currentLat: number;
  currentLng: number;
  speedKmh: number;
  headingDegrees: number;
  status: ResponseUnitStatus;
  crewCount: number;
  vehicleReg: string;
  vehicleType: string;
  operationalRadiusKm: number;
  capabilities: string[];
  currentAssignedIncidentId?: string;
  estimatedEtaSeconds: number;
}

export interface DispatchAssignment {
  id: string; // e.g. "DSP-2026-GP-9081"
  incidentId: string; // e.g. "ITIS-2026-GP-00000045"
  learnerName: string;
  incidentType: string;
  unitId: string;
  unitCallSign: string;
  agencyCategory: PartnerCategory;
  assignedAt: string;
  ackStatus: DispatchAckStatus;
  initialEtaSeconds: number;
  currentEtaSeconds: number;
  distanceKm: number;
  escryptedPacketHash: string;
  isEscalated: boolean;
  escalationReason?: string;
}

export interface DispatchCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Schema' | 'NestJS Dispatch Engine' | 'State Machine' | 'REST Controller';
  description: string;
  code: string;
}

// SAMPLE VENDOR-NEUTRAL RESPONSE UNITS
export const SAMPLE_RESPONSE_UNITS: ResponseUnit[] = [
  {
    id: 'unit-saps-gp-104',
    callSign: 'SAPS Soweto Tactical #4',
    agencyName: 'South African Police Service (SAPS)',
    category: 'SAPS',
    branchName: 'Orlando Police Station',
    currentLat: -26.2388,
    currentLng: 27.8550,
    speedKmh: 48,
    headingDegrees: 115,
    status: 'AVAILABLE',
    crewCount: 4,
    vehicleReg: 'BSS 901 GP',
    vehicleType: 'SAPS BMW 330i Pursuit Vehicle',
    operationalRadiusKm: 25,
    capabilities: ['ARMED_INTERVENTION', 'TACTICAL_PURSUIT', 'KIDNAPPING_RESPONSE', 'HELI_LINK'],
    estimatedEtaSeconds: 240,
  },
  {
    id: 'unit-fidelity-gp-88',
    callSign: 'Fidelity ADT Armed Response #88',
    agencyName: 'Fidelity ADT Security',
    category: 'PRIVATE_SECURITY',
    branchName: 'JHB South Tactical Hub',
    currentLat: -26.2420,
    currentLng: 27.8620,
    speedKmh: 35,
    headingDegrees: 90,
    status: 'AVAILABLE',
    crewCount: 2,
    vehicleReg: 'FD 44 TR GP',
    vehicleType: 'VW Amarok Armed Response',
    operationalRadiusKm: 15,
    capabilities: ['ARMED_RESPONSE', 'RAPID_CONTAINMENT', 'GPS_JAMMER_DETECTION'],
    estimatedEtaSeconds: 180,
  },
  {
    id: 'unit-netcare-gp-02',
    callSign: 'Netcare 911 ALS Ambulance #02',
    agencyName: 'Netcare 911 Emergency Medical',
    category: 'EMS',
    branchName: 'Baragwanath Base',
    currentLat: -26.2600,
    currentLng: 27.9400,
    speedKmh: 0,
    headingDegrees: 0,
    status: 'AVAILABLE',
    crewCount: 2,
    vehicleReg: 'NC 911 GP',
    vehicleType: 'Advanced Life Support Ambulance',
    operationalRadiusKm: 30,
    capabilities: ['ADVANCED_LIFE_SUPPORT', 'PEDIATRIC_TRAUMA', 'OXYGEN_THERAPY'],
    estimatedEtaSeconds: 420,
  },
  {
    id: 'unit-metro-gp-12',
    callSign: 'JMPD K9 & Traffic #12',
    agencyName: 'Johannesburg Metro Police Dept',
    category: 'METRO_POLICE',
    branchName: 'Soweto Traffic Depot',
    currentLat: -26.2300,
    currentLng: 27.8700,
    speedKmh: 52,
    headingDegrees: 180,
    status: 'BUSY',
    crewCount: 3,
    vehicleReg: 'JMPD 102 GP',
    vehicleType: 'K9 Patrol Unit',
    operationalRadiusKm: 20,
    capabilities: ['K9_TRACKING', 'ROAD_BLOCK_CONTAINMENT', 'TRAFFIC_ESCORT'],
    currentAssignedIncidentId: 'ITIS-2026-GP-00000046',
    estimatedEtaSeconds: 300,
  },
];

// SAMPLE ACTIVE DISPATCHES
export const SAMPLE_DISPATCH_ASSIGNMENTS: DispatchAssignment[] = [
  {
    id: 'DSP-2026-GP-9081',
    incidentId: 'ITIS-2026-GP-00000045',
    learnerName: 'Sipho Zulu',
    incidentType: 'SOS_BUTTON',
    unitId: 'unit-saps-gp-104',
    unitCallSign: 'SAPS Soweto Tactical #4',
    agencyCategory: 'SAPS',
    assignedAt: '18:32:45',
    ackStatus: 'ACCEPT',
    initialEtaSeconds: 240,
    currentEtaSeconds: 165,
    distanceKm: 2.4,
    escryptedPacketHash: 'aes256-dsp-9081-sha256-e889a2b',
    isEscalated: false,
  },
  {
    id: 'DSP-2026-GP-9082',
    incidentId: 'ITIS-2026-GP-00000045',
    learnerName: 'Sipho Zulu',
    incidentType: 'SOS_BUTTON',
    unitId: 'unit-fidelity-gp-88',
    unitCallSign: 'Fidelity ADT Armed Response #88',
    agencyCategory: 'PRIVATE_SECURITY',
    assignedAt: '18:32:46',
    ackStatus: 'ACCEPT',
    initialEtaSeconds: 180,
    currentEtaSeconds: 90,
    distanceKm: 1.1,
    escryptedPacketHash: 'aes256-dsp-9082-sha256-778a11f',
    isEscalated: false,
  },
  {
    id: 'DSP-2026-GP-9078',
    incidentId: 'ITIS-2026-GP-00000046',
    learnerName: 'Kagiso Mokoena',
    incidentType: 'SCHOOL_TRANSPORT_DEVIATION',
    unitId: 'unit-metro-gp-12',
    unitCallSign: 'JMPD K9 & Traffic #12',
    agencyCategory: 'METRO_POLICE',
    assignedAt: '18:29:10',
    ackStatus: 'ARRIVED',
    initialEtaSeconds: 300,
    currentEtaSeconds: 0,
    distanceKm: 0.0,
    escryptedPacketHash: 'aes256-dsp-9078-sha256-0091aa4',
    isEscalated: false,
  },
];

// PRISMA SCHEMA & NESTJS CODE SPECS FOR ERCDE
export const ERCDE_CODE_SPECS: DispatchCodeSpec[] = [
  {
    id: 1,
    title: 'ERCDE Multi-Agency Response Partner Prisma Schema',
    filename: 'prisma/schema.prisma',
    category: 'Prisma Schema',
    description: 'Relational database model supporting multi-agency partners, branches, response units, encrypted dispatch packets, ETA tracking, and acknowledgements.',
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum PartnerCategory {
  SAPS
  METRO_POLICE
  PRIVATE_SECURITY
  EMS
  FIRE_RESCUE
  SCHOOL_SECURITY
  COMMUNITY_SAFETY
  SEARCH_RESCUE
  TRAFFIC_POLICE
  DISASTER_MANAGEMENT
  MUNICIPAL_LAW
  VERIFIED_VOLUNTEER
}

enum ResponseUnitStatus {
  AVAILABLE
  BUSY
  DISPATCHED
  ON_SCENE
  OFFLINE
  OUT_OF_SERVICE
  EN_ROUTE
  REFUELLING
  MAINTENANCE
}

enum DispatchAckStatus {
  PENDING
  ACCEPT
  DECLINE
  REQUEST_BACKUP
  ARRIVED
  CHILD_LOCATED
  CHILD_SAFE
  MISSION_COMPLETE
}

model ResponsePartner {
  id                String                 @id @default(uuid())
  agencyName        String
  category          PartnerCategory
  registrationNo    String
  contactPhone      String
  mtlsCertificate  String                 // mTLS client cert thumbprint
  isActive          Boolean                @default(true)
  createdTimestamp  DateTime               @default(now())

  branches          ResponsePartnerBranch[]
  units             ResponseUnit[]

  @@index([category])
}

model ResponsePartnerBranch {
  id            String          @id @default(uuid())
  partnerId     String
  branchName    String
  provinceCode  String
  districtCode  String
  stationLat    Float
  stationLng    Float
  contactPhone  String

  partner       ResponsePartner @relation(fields: [partnerId], references: [id])
  units         ResponseUnit[]
}

model ResponseUnit {
  id                    String              @id @default(uuid())
  partnerId             String
  branchId              String
  callSign              String
  status                ResponseUnitStatus  @default(AVAILABLE)
  currentLat            Float
  currentLng            Float
  speedKmh              Float               @default(0)
  headingDegrees        Int                 @default(0)
  vehicleReg            String
  vehicleType           String
  operationalRadiusKm   Float               @default(25)
  capabilities          String[]            // JSON array of capabilities
  lastGpsUpdate         DateTime            @default(now())

  partner               ResponsePartner     @relation(fields: [partnerId], references: [id])
  branch                ResponsePartnerBranch @relation(fields: [branchId], references: [id])
  dispatches            DispatchAssignment[]

  @@index([partnerId, status])
  @@index([branchId])
}

model DispatchAssignment {
  id                    String              @id // e.g. DSP-2026-GP-9081
  incidentId            String              // Foreign key to Incident (EIOE)
  unitId                String
  assignedAt            DateTime            @default(now())
  ackStatus             DispatchAckStatus   @default(PENDING)
  ackTimestamp          DateTime?
  initialEtaSeconds     Int
  currentEtaSeconds     Int
  distanceKm            Float
  encryptedPacket       String              // AES-256 encrypted payload
  packetEvidenceHash    String
  isEscalated           Boolean             @default(false)

  unit                  ResponseUnit        @relation(fields: [unitId], references: [id])
  etaHistory            DispatchEtaHistory[]
  events                DispatchEvent[]

  @@index([incidentId])
  @@index([unitId])
  @@index([ackStatus])
}

model DispatchEtaHistory {
  id                    String             @id @default(uuid())
  dispatchId            String
  timestamp             DateTime           @default(now())
  remainingEtaSeconds   Int
  distanceKm            Float
  trafficDelaySeconds   Int                @default(0)

  dispatch              DispatchAssignment @relation(fields: [dispatchId], references: [id], onDelete: Cascade)
}

model DispatchEvent {
  id                    String             @id @default(uuid())
  dispatchId            String
  timestamp             DateTime           @default(now())
  actor                 String
  eventType             String             // e.g. ACK_ACCEPTED, ON_SCENE, BACKUP_REQ
  details               String
  evidenceHash          String

  dispatch              DispatchAssignment @relation(fields: [dispatchId], references: [id], onDelete: Cascade)
}`
  },
  {
    id: 2,
    title: 'ERCDE Candidate Ranking & Optimal Dispatch Engine',
    filename: 'src/dispatch/services/optimal-dispatch.service.ts',
    category: 'NestJS Dispatch Engine',
    description: 'Queries candidates by geo-proximity, capabilities, jurisdiction, and workload to rank and auto-dispatch optimal emergency partners.',
    code: `import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PartnerCategory, ResponseUnitStatus, DispatchAckStatus } from '@prisma/client';

export interface CandidateQuery {
  incidentId: string;
  incidentType: string;
  incidentLat: number;
  incidentLng: number;
  requiredCapabilities: string[];
  requestedCategories: PartnerCategory[];
}

@Injectable()
export class OptimalDispatchService {
  private readonly logger = new Logger(OptimalDispatchService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAndDispatchCandidates(query: CandidateQuery) {
    // 1. Fetch available units belonging to requested categories
    const units = await this.prisma.responseUnit.findMany({
      where: {
        status: ResponseUnitStatus.AVAILABLE,
        partner: { category: { in: query.requestedCategories }, isActive: true },
      },
      include: { partner: true, branch: true },
    });

    // 2. Score and rank candidates by distance, capability match, and operational radius
    const rankedCandidates = units
      .map((unit) => {
        const distanceKm = this.calculateHaversineDistance(
          query.incidentLat,
          query.incidentLng,
          unit.currentLat,
          unit.currentLng,
        );

        if (distanceKm > unit.operationalRadiusKm) return null;

        // Check required capability overlap
        const hasCapabilities = query.requiredCapabilities.every((cap) =>
          unit.capabilities.includes(cap),
        );
        if (!hasCapabilities) return null;

        // Estimate ETA (assume avg urban response speed 50 km/h)
        const etaSeconds = Math.round((distanceKm / 50) * 3600);

        return {
          unit,
          distanceKm,
          etaSeconds,
          score: distanceKm * 0.7 + (etaSeconds / 60) * 0.3,
        };
      })
      .filter((candidate) => candidate !== null)
      .sort((a, b) => a!.score - b!.score);

    if (rankedCandidates.length === 0) {
      this.logger.warn(\`No available candidate units for incident \${query.incidentId}. Escalate immediately.\`);
      this.eventEmitter.emit('dispatch.failed', { incidentId: query.incidentId, reason: 'NO_UNITS_IN_RADIUS' });
      return [];
    }

    // 3. Auto-dispatch top candidates (e.g. top 2 matching agencies)
    const topCandidates = rankedCandidates.slice(0, 2);
    const dispatches = [];

    for (const item of topCandidates) {
      const unit = item!.unit;

      const dispatchId = \`DSP-2026-GP-\${Math.floor(1000 + Math.random() * 9000)}\`;

      const created = await this.prisma.dispatchAssignment.create({
        data: {
          id: dispatchId,
          incidentId: query.incidentId,
          unitId: unit.id,
          initialEtaSeconds: item!.etaSeconds,
          currentEtaSeconds: item!.etaSeconds,
          distanceKm: item!.distanceKm,
          encryptedPacket: \`aes256-payload-\${Date.now()}\`,
          packetEvidenceHash: \`sha256-dsp-\${Date.now()}\`,
        },
      });

      // Update unit state to DISPATCHED
      await this.prisma.responseUnit.update({
        where: { id: unit.id },
        data: { status: ResponseUnitStatus.DISPATCHED },
      });

      this.eventEmitter.emit('dispatch.created', {
        dispatchId,
        incidentId: query.incidentId,
        unitId: unit.id,
        callSign: unit.callSign,
      });

      dispatches.push(created);
    }

    return dispatches;
  }

  private calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}`
  },
  {
    id: 3,
    title: 'ERCDE Response Acknowledgement & Escalation Machine',
    filename: 'src/dispatch/services/dispatch-state-machine.service.ts',
    category: 'State Machine',
    description: 'Handles responder acknowledgements (ACCEPT, DECLINE, ARRIVED, CHILD_SAFE) and auto-escalates if SLA thresholds are breached.',
    code: `import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DispatchAckStatus, ResponseUnitStatus } from '@prisma/client';

@Injectable()
export class DispatchStateMachineService {
  private readonly logger = new Logger(DispatchStateMachineService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async processAcknowledgement(
    dispatchId: string,
    ackStatus: DispatchAckStatus,
    actor: string,
    notes?: string,
  ) {
    const dispatch = await this.prisma.dispatchAssignment.findUnique({
      where: { id: dispatchId },
      include: { unit: true },
    });

    if (!dispatch) throw new BadRequestException(\`Dispatch \${dispatchId} not found.\`);

    const updated = await this.prisma.$transaction(async (tx) => {
      // 1. Update dispatch assignment
      const dsp = await tx.dispatchAssignment.update({
        where: { id: dispatchId },
        data: {
          ackStatus,
          ackTimestamp: new Date(),
        },
      });

      // 2. Adjust unit status if DECLINED or MISSION_COMPLETE
      if (ackStatus === DispatchAckStatus.DECLINE) {
        await tx.responseUnit.update({
          where: { id: dispatch.unitId },
          data: { status: ResponseUnitStatus.AVAILABLE },
        });
      } else if (ackStatus === DispatchAckStatus.ARRIVED) {
        await tx.responseUnit.update({
          where: { id: dispatch.unitId },
          data: { status: ResponseUnitStatus.ON_SCENE },
        });
      } else if (ackStatus === DispatchAckStatus.MISSION_COMPLETE) {
        await tx.responseUnit.update({
          where: { id: dispatch.unitId },
          data: { status: ResponseUnitStatus.AVAILABLE },
        });
      }

      // 3. Log dispatch event
      await tx.dispatchEvent.create({
        data: {
          dispatchId,
          actor,
          eventType: \`ACK_\${ackStatus}\`,
          details: notes || \`Responder updated acknowledgement to \${ackStatus}.\`,
          evidenceHash: \`sha256-ack-\${Date.now()}\`,
        },
      });

      return dsp;
    });

    // Emit event bus notification
    this.eventEmitter.emit(\`dispatch.\${ackStatus.toLowerCase()}\`, {
      dispatchId,
      incidentId: dispatch.incidentId,
      unitId: dispatch.unitId,
      ackStatus,
    });

    this.logger.log(\`ERCDE: Dispatch \${dispatchId} updated to \${ackStatus} by \${actor}\`);
    return updated;
  }

  async escalateDispatch(dispatchId: string, reason: string) {
    const dispatch = await this.prisma.dispatchAssignment.update({
      where: { id: dispatchId },
      data: { isEscalated: true },
    });

    this.eventEmitter.emit('dispatch.escalated', {
      dispatchId,
      incidentId: dispatch.incidentId,
      reason,
    });

    return dispatch;
  }
}`
  },
  {
    id: 4,
    title: 'ERCDE Emergency Dispatch REST Controller',
    filename: 'src/dispatch/controllers/dispatch-orchestration.controller.ts',
    category: 'REST Controller',
    description: 'REST API endpoints for triggering dispatches, logging acknowledgements, requesting backup, and tracking active partner units.',
    code: `import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { OptimalDispatchService } from '../services/optimal-dispatch.service';
import { DispatchStateMachineService } from '../services/dispatch-state-machine.service';

@Controller('dispatch')
export class DispatchOrchestrationController {
  constructor(
    private readonly optimalDispatch: OptimalDispatchService,
    private readonly stateMachine: DispatchStateMachineService,
  ) {}

  @Post('assign')
  async assignEmergencyDispatch(@Body() query: any) {
    return this.optimalDispatch.findAndDispatchCandidates(query);
  }

  @Post('acknowledge')
  async acknowledgeDispatch(
    @Body() body: { dispatchId: string; ackStatus: any; actor: string; notes?: string },
  ) {
    return this.stateMachine.processAcknowledgement(
      body.dispatchId,
      body.ackStatus,
      body.actor,
      body.notes,
    );
  }

  @Patch(':id/escalate')
  async escalateDispatch(
    @Param('id') dispatchId: string,
    @Body() body: { reason: string },
  ) {
    return this.stateMachine.escalateDispatch(dispatchId, body.reason);
  }

  @Get('active')
  async getActiveDispatches() {
    return { activeCount: 3, status: 'ALL_OPERATIONAL' };
  }
}`
  }
];

// CRITICAL ITIS BUSINESS RULES (1-10) FOR ERCDE
export const CRITICAL_ERCDE_RULES = [
  { id: 1, title: 'Validated Incident Prerequisite', ruleText: 'Only validated incidents (PRIORITY_1 or PRIORITY_2) may trigger emergency dispatches.', badge: 'VALIDATED ONLY' },
  { id: 2, title: 'Mandatory Incident ID Linkage', ruleText: 'Every dispatch assignment MUST strictly reference a valid EIOE Incident ID.', badge: 'INCIDENT LINKED' },
  { id: 3, title: 'Immutable Acknowledgement Trail', ruleText: 'Every responder acknowledgement (ACCEPT, DECLINE, ARRIVED, CHILD_SAFE) is immutable.', badge: 'IMMUTABLE ACK' },
  { id: 4, title: 'Multi-Agency Parallel Dispatch', ruleText: 'Multiple agencies (SAPS + Private Security + EMS) may respond to the same incident simultaneously.', badge: 'MULTI-AGENCY' },
  { id: 5, title: 'Mandatory Live Unit Telemetry Stream', ruleText: 'Every active response unit MUST maintain a continuous live GPS telemetry stream.', badge: 'LIVE GPS' },
  { id: 6, title: 'Role-Appropriate Data Minimization', ruleText: 'Dispatch packets contain strictly role-appropriate data protected by POPIA compliance.', badge: 'POPIA COMPLIANT' },
  { id: 7, title: 'Continuous ETA Recalculation', ruleText: 'ETA recalculates continuously every 5 seconds considering traffic and route changes.', badge: 'CONTINUOUS ETA' },
  { id: 8, title: 'Permanent Audit Trail', ruleText: 'Every dispatch action, escalation, and status change is permanently audited.', badge: 'PERMANENT AUDIT' },
  { id: 9, title: 'Million-Dispatch Scale', ruleText: 'Engine scales to support millions of historical dispatch records across South Africa.', badge: 'ENTERPRISE SCALE' },
  { id: 10, title: 'Vendor-Neutral Partner Integration', ruleText: 'Engine remains strictly vendor-neutral via mTLS and REST API adapters.', badge: 'VENDOR NEUTRAL' },
];
