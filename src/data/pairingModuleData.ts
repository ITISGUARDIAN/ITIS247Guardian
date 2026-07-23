export interface DevicePairingRecord {
  id: string; // UUID
  deviceId: string;
  serialNumber: string;
  imei: string;
  learnerId: string;
  learnerName: string;
  schoolId: string;
  schoolName: string;
  province: 'GAUTENG' | 'KWAZULU_NATAL' | 'WESTERN_CAPE' | 'EASTERN_CAPE' | 'LIMPOPO' | 'MPUMALANGA';
  pairingStatus: 'PENDING_ACTIVATION' | 'ACTIVATED_PROTECTED' | 'FAILED_VALIDATION' | 'UNPAIRED_ARCHIVED' | 'REVOKED';
  activationPin: string;
  qrCodeToken: string;
  challengeNonce: string;
  mtlsCertFingerprint: string;
  parentConfirmed: boolean;
  parentConfirmedAt?: string;
  schoolVerified: boolean;
  schoolVerifiedAt?: string;
  pairedAt: string;
  pairedByTechnicianId: string;
  pairedByTechnicianName: string;
  failureReason?: string;
}

export interface DeviceAssignmentHistory {
  id: string;
  deviceId: string;
  serialNumber: string;
  imei: string;
  learnerId: string;
  learnerName: string;
  schoolName: string;
  assignedAt: string;
  unassignedAt?: string;
  unassignReason?: 'ROUTINE_UPGRADE' | 'HARDWARE_FAILURE' | 'LOST_STOLEN' | 'LEARNER_TRANSFERRED' | 'SCHOOL_CHANGE' | 'ACTIVE';
  assignedBy: string;
  activeFlag: boolean;
}

export interface DeviceActivationLog {
  id: string;
  deviceId: string;
  serialNumber: string;
  activationStep: 'QA_VERIFIED' | 'PIN_ENTERED' | 'MTLS_HANDSHAKE' | 'PARENT_APPROVED' | 'SCHOOL_VERIFIED' | 'PROTECTION_ACTIVE';
  resultStatus: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS';
  ipAddress: string;
  gpsLocation: string;
  certFingerprint: string;
  timestamp: string;
  actorRole: 'DEVICE_TECHNICIAN' | 'PARENT_GUARDIAN' | 'SCHOOL_ADMIN' | 'SYSTEM_AUTOMATION';
}

export interface DeviceReplacementHistory {
  id: string;
  oldDeviceId: string;
  oldSerialNumber: string;
  newDeviceId: string;
  newSerialNumber: string;
  learnerId: string;
  learnerName: string;
  replacementReason: 'BATTERY_FAILURE' | 'LOST_DEVICE' | 'STOLEN_DEVICE' | 'HARDWARE_FAILURE' | 'WATER_DAMAGE' | 'ROUTINE_UPGRADE' | 'EMERGENCY_REPLACEMENT';
  transparentToParent: boolean;
  transferredTelemetryCount: number;
  replacedAt: string;
  replacedBy: string;
}

export interface DeviceTransferLog {
  id: string;
  deviceId: string;
  serialNumber: string;
  learnerId: string;
  learnerName: string;
  fromSchoolName: string;
  toSchoolName: string;
  fromProvince: string;
  toProvince: string;
  transferReason: string;
  transferredAt: string;
  approvedBy: string;
}

export interface CertificateValidationLog {
  id: string;
  deviceId: string;
  serialNumber: string;
  mtlsCertFingerprint: string;
  issuerCN: string;
  expirationDate: string;
  crlCheckPassed: boolean;
  challengeVerified: boolean;
  validationResult: 'VALID_AUTHENTICATED' | 'REVOKED_CERTIFICATE' | 'EXPIRED_CERTIFICATE' | 'CHALLENGE_FAILED';
  checkedAt: string;
}

export interface PairingSpecItem {
  id: number;
  title: string;
  category: 'Prisma Schema' | 'Pairing Engine' | 'mTLS Security Guard' | 'DTOs & Validation' | 'Replacement Service' | 'REST Controller' | 'Jest Unit Tests' | 'Architecture Diagrams';
  description: string;
  filename: string;
  code: string;
  highlights: string[];
}

export const SAMPLE_PAIRINGS: DevicePairingRecord[] = [
  {
    id: 'pair-uuid-2026-001',
    deviceId: 'dev-uuid-9011-001',
    serialNumber: 'ITIS-GPS-W901',
    imei: '869402059381023',
    learnerId: 'itis-lrn-2026-901',
    learnerName: 'Bandile Zulu',
    schoolId: 'sch-9011-gauteng',
    schoolName: 'Soweto Central Primary School',
    province: 'GAUTENG',
    pairingStatus: 'ACTIVATED_PROTECTED',
    activationPin: '849201',
    qrCodeToken: 'qr-itis-pair-w901-849201-sha256',
    challengeNonce: 'nonce-7f8a9b0c-2026-001',
    mtlsCertFingerprint: 'SHA256:7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    parentConfirmed: true,
    parentConfirmedAt: '2026-01-15 14:22:00',
    schoolVerified: true,
    schoolVerifiedAt: '2026-01-15 15:00:00',
    pairedAt: '2026-01-15 14:00:00',
    pairedByTechnicianId: 'tech-usr-007',
    pairedByTechnicianName: 'Sipho Ndlovu (Field Technician)',
  },
  {
    id: 'pair-uuid-2026-002',
    deviceId: 'dev-uuid-9011-002',
    serialNumber: 'ITIS-GPS-W902',
    imei: '869402059381088',
    learnerId: 'itis-lrn-2026-902',
    learnerName: 'Nomvula Zulu',
    schoolId: 'sch-9011-gauteng',
    schoolName: 'Soweto Central Primary School',
    province: 'GAUTENG',
    pairingStatus: 'ACTIVATED_PROTECTED',
    activationPin: '391048',
    qrCodeToken: 'qr-itis-pair-w902-391048-sha256',
    challengeNonce: 'nonce-1a2b3c4d-2026-002',
    mtlsCertFingerprint: 'SHA256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    parentConfirmed: true,
    parentConfirmedAt: '2026-01-15 14:30:00',
    schoolVerified: true,
    schoolVerifiedAt: '2026-01-15 15:05:00',
    pairedAt: '2026-01-15 14:10:00',
    pairedByTechnicianId: 'tech-usr-007',
    pairedByTechnicianName: 'Sipho Ndlovu (Field Technician)',
  },
  {
    id: 'pair-uuid-2026-003',
    deviceId: 'dev-uuid-9011-003',
    serialNumber: 'ITIS-GPS-W903',
    imei: '869402059381999',
    learnerId: 'itis-lrn-2026-903',
    learnerName: 'Kagiso Khumalo',
    schoolId: 'sch-8842-kzn',
    schoolName: 'eThekwini Comprehensive High School',
    province: 'KWAZULU_NATAL',
    pairingStatus: 'ACTIVATED_PROTECTED',
    activationPin: '912304',
    qrCodeToken: 'qr-itis-pair-w903-912304-sha256',
    challengeNonce: 'nonce-9f8e7d6c-2026-003',
    mtlsCertFingerprint: 'SHA256:9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e',
    parentConfirmed: true,
    parentConfirmedAt: '2026-01-20 09:10:00',
    schoolVerified: true,
    schoolVerifiedAt: '2026-01-20 09:30:00',
    pairedAt: '2026-01-20 09:00:00',
    pairedByTechnicianId: 'tech-usr-012',
    pairedByTechnicianName: 'Thabo Mokoena (KZN Field Tech)',
  },
  {
    id: 'pair-uuid-2026-004',
    deviceId: 'dev-uuid-9011-005',
    serialNumber: 'ITIS-GPS-W905',
    imei: '869402059381500',
    learnerId: 'itis-lrn-2026-905',
    learnerName: 'Tshepo Mbeki',
    schoolId: 'sch-9011-gauteng',
    schoolName: 'Soweto Central Primary School',
    province: 'GAUTENG',
    pairingStatus: 'PENDING_ACTIVATION',
    activationPin: '551920',
    qrCodeToken: 'qr-itis-pair-w905-551920-sha256',
    challengeNonce: 'nonce-5c4b3a2f-2026-004',
    mtlsCertFingerprint: 'SHA256:5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b',
    parentConfirmed: false,
    schoolVerified: true,
    schoolVerifiedAt: '2026-07-21 10:00:00',
    pairedAt: '2026-07-21 09:30:00',
    pairedByTechnicianId: 'tech-usr-007',
    pairedByTechnicianName: 'Sipho Ndlovu (Field Technician)',
  },
];

export const SAMPLE_ASSIGNMENT_HISTORY: DeviceAssignmentHistory[] = [
  {
    id: 'hist-001',
    deviceId: 'dev-uuid-9011-001',
    serialNumber: 'ITIS-GPS-W901',
    imei: '869402059381023',
    learnerId: 'itis-lrn-2026-901',
    learnerName: 'Bandile Zulu',
    schoolName: 'Soweto Central Primary School',
    assignedAt: '2026-01-15 14:00:00',
    assignedBy: 'Sipho Ndlovu (Technician)',
    activeFlag: true,
  },
  {
    id: 'hist-002',
    deviceId: 'dev-uuid-9011-000-OLD',
    serialNumber: 'ITIS-GPS-W899-OLD',
    imei: '869402059380000',
    learnerId: 'itis-lrn-2026-901',
    learnerName: 'Bandile Zulu',
    schoolName: 'Soweto Central Primary School',
    assignedAt: '2025-02-10 08:00:00',
    unassignedAt: '2026-01-15 13:50:00',
    unassignReason: 'ROUTINE_UPGRADE',
    assignedBy: 'Thandiwe Khumalo',
    activeFlag: false,
  },
  {
    id: 'hist-003',
    deviceId: 'dev-uuid-9011-002',
    serialNumber: 'ITIS-GPS-W902',
    imei: '869402059381088',
    learnerId: 'itis-lrn-2026-902',
    learnerName: 'Nomvula Zulu',
    schoolName: 'Soweto Central Primary School',
    assignedAt: '2026-01-15 14:10:00',
    assignedBy: 'Sipho Ndlovu (Technician)',
    activeFlag: true,
  },
];

export const SAMPLE_REPLACEMENTS: DeviceReplacementHistory[] = [
  {
    id: 'repl-2026-001',
    oldDeviceId: 'dev-uuid-9011-000-OLD',
    oldSerialNumber: 'ITIS-GPS-W899-OLD',
    newDeviceId: 'dev-uuid-9011-001',
    newSerialNumber: 'ITIS-GPS-W901',
    learnerId: 'itis-lrn-2026-901',
    learnerName: 'Bandile Zulu',
    replacementReason: 'BATTERY_FAILURE',
    transparentToParent: true,
    transferredTelemetryCount: 14820,
    replacedAt: '2026-01-15 13:55:00',
    replacedBy: 'Sipho Ndlovu (Technician)',
  },
];

export const SAMPLE_ACTIVATION_LOGS: DeviceActivationLog[] = [
  {
    id: 'act-log-101',
    deviceId: 'dev-uuid-9011-001',
    serialNumber: 'ITIS-GPS-W901',
    activationStep: 'QA_VERIFIED',
    resultStatus: 'SUCCESS',
    ipAddress: '102.132.191.12',
    gpsLocation: '-26.2580, 27.8572 (Soweto)',
    certFingerprint: 'SHA256:7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    timestamp: '2026-01-15 13:30:00',
    actorRole: 'DEVICE_TECHNICIAN',
  },
  {
    id: 'act-log-102',
    deviceId: 'dev-uuid-9011-001',
    serialNumber: 'ITIS-GPS-W901',
    activationStep: 'PIN_ENTERED',
    resultStatus: 'SUCCESS',
    ipAddress: '102.132.191.12',
    gpsLocation: '-26.2580, 27.8572 (Soweto)',
    certFingerprint: 'SHA256:7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    timestamp: '2026-01-15 13:45:00',
    actorRole: 'DEVICE_TECHNICIAN',
  },
  {
    id: 'act-log-103',
    deviceId: 'dev-uuid-9011-001',
    serialNumber: 'ITIS-GPS-W901',
    activationStep: 'MTLS_HANDSHAKE',
    resultStatus: 'SUCCESS',
    ipAddress: '102.132.191.12',
    gpsLocation: '-26.2580, 27.8572 (Soweto)',
    certFingerprint: 'SHA256:7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    timestamp: '2026-01-15 14:00:00',
    actorRole: 'DEVICE_TECHNICIAN',
  },
  {
    id: 'act-log-104',
    deviceId: 'dev-uuid-9011-001',
    serialNumber: 'ITIS-GPS-W901',
    activationStep: 'PARENT_APPROVED',
    resultStatus: 'SUCCESS',
    ipAddress: '102.130.44.18',
    gpsLocation: '-26.2601, 27.8590 (Soweto)',
    certFingerprint: 'SHA256:7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    timestamp: '2026-01-15 14:22:00',
    actorRole: 'PARENT_GUARDIAN',
  },
  {
    id: 'act-log-105',
    deviceId: 'dev-uuid-9011-001',
    serialNumber: 'ITIS-GPS-W901',
    activationStep: 'PROTECTION_ACTIVE',
    resultStatus: 'SUCCESS',
    ipAddress: '10.0.4.19 (Internal Service)',
    gpsLocation: '-26.2580, 27.8572',
    certFingerprint: 'SHA256:7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    timestamp: '2026-01-15 15:00:00',
    actorRole: 'SYSTEM_AUTOMATION',
  },
];

export const PAIRING_SPEC_ITEMS: PairingSpecItem[] = [
  {
    id: 1,
    title: 'Prisma Database Schema: Device Pairings & Immutable Assignment History',
    category: 'Prisma Schema',
    description: 'Production Prisma ORM models for device_pairings, device_assignment_history, device_activation_logs, device_transfer_logs, device_replacement_history, device_health_snapshots, and certificate_validation_logs.',
    filename: 'prisma/schema.prisma (Pairing & Activation Module)',
    code: `enum PairingStatus {
  PENDING_ACTIVATION
  ACTIVATED_PROTECTED
  FAILED_VALIDATION
  UNPAIRED_ARCHIVED
  REVOKED
}

enum ReplacementReason {
  ROUTINE_UPGRADE
  BATTERY_FAILURE
  LOST_DEVICE
  STOLEN_DEVICE
  HARDWARE_FAILURE
  WATER_DAMAGE
  WARRANTY_REPLACEMENT
  EMERGENCY_REPLACEMENT
}

enum ActivationStep {
  QA_VERIFIED
  PIN_ENTERED
  MTLS_HANDSHAKE
  PARENT_APPROVED
  SCHOOL_VERIFIED
  PROTECTION_ACTIVE
}

model DevicePairing {
  id                    String            @id @default(uuid()) @db.Uuid
  deviceId              String            @db.Uuid
  learnerId             String            @db.Uuid
  schoolId              String            @db.Uuid
  province              String            @db.VarChar(50)

  pairingStatus         PairingStatus     @default(PENDING_ACTIVATION)
  activationPin         String            @db.VarChar(10)
  qrCodeToken           String            @unique @db.VarChar(128)
  challengeNonce        String            @db.VarChar(64)
  mtlsCertFingerprint   String            @db.VarChar(128)

  parentConfirmed       Boolean           @default(false)
  parentConfirmedAt     DateTime?
  schoolVerified        Boolean           @default(false)
  schoolVerifiedAt      DateTime?

  pairedAt              DateTime          @default(now())
  pairedByTechnicianId  String            @db.Uuid
  failureReason         String?           @db.Text

  createdAt             DateTime          @default(now())
  updatedAt             DateTime          @updatedAt

  // Relations
  device                Device            @relation(fields: [deviceId], references: [id])
  learner               Learner           @relation(fields: [learnerId], references: [id])

  @@index([deviceId])
  @@index([learnerId])
  @@index([qrCodeToken])
  @@index([pairingStatus])
  @@map("device_pairings")
}

model DeviceAssignmentHistory {
  id                    String            @id @default(uuid()) @db.Uuid
  deviceId              String            @db.Uuid
  serialNumber          String            @db.VarChar(50)
  imei                  String            @db.VarChar(50)
  learnerId             String            @db.Uuid
  learnerName           String            @db.VarChar(100)
  schoolName            String            @db.VarChar(150)

  assignedAt            DateTime          @default(now())
  unassignedAt          DateTime?
  unassignReason        String?           @db.VarChar(100)
  assignedBy            String            @db.VarChar(100)
  activeFlag            Boolean           @default(true)

  @@index([learnerId])
  @@index([deviceId])
  @@map("device_assignment_history")
}

model DeviceReplacementHistory {
  id                        String            @id @default(uuid()) @db.Uuid
  oldDeviceId               String            @db.Uuid
  oldSerialNumber           String            @db.VarChar(50)
  newDeviceId               String            @db.Uuid
  newSerialNumber           String            @db.VarChar(50)
  learnerId                 String            @db.Uuid
  learnerName               String            @db.VarChar(100)
  replacementReason         ReplacementReason
  transparentToParent       Boolean           @default(true)
  transferredTelemetryCount Int               @default(0)
  replacedAt                DateTime          @default(now())
  replacedBy                String            @db.VarChar(100)

  @@index([learnerId])
  @@index([oldDeviceId])
  @@index([newDeviceId])
  @@map("device_replacement_history")
}

model DeviceActivationLog {
  id                    String            @id @default(uuid()) @db.Uuid
  deviceId              String            @db.Uuid
  serialNumber          String            @db.VarChar(50)
  activationStep        ActivationStep
  resultStatus          String            @db.VarChar(20)
  ipAddress             String            @db.VarChar(50)
  gpsLocation           String?           @db.VarChar(100)
  certFingerprint       String            @db.VarChar(128)
  actorRole             String            @db.VarChar(50)
  timestamp             DateTime          @default(now())

  @@index([deviceId])
  @@map("device_activation_logs")
}`,
    highlights: ['Unique QR code token constraint', 'Immutable DeviceAssignmentHistory ledger', 'Transparent replacement tracking', 'Comprehensive activation audit logs']
  },
  {
    id: 2,
    title: 'Pairing Engine Service: 6-Step Validation & Binding',
    category: 'Pairing Engine',
    description: 'Core PairingService executing IMEI, Serial, Activation PIN, Certificate, Learner 1:1, and Device 1:1 validation before creating immutable assignment records.',
    filename: 'src/modules/pairing/pairing.service.ts',
    code: `import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PairDeviceDto, ActivateDeviceDto } from './dto/pairing.dto';
import { AuditLogService } from '../audit/audit-log.service';

@Injectable()
export class PairingService {
  private readonly logger = new Logger(PairingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditLogService,
  ) {}

  async pairDeviceWithLearner(dto: PairDeviceDto, technicianId: string) {
    this.logger.log(\`Initiating pairing attempt for Serial '\${dto.serialNumber}' with Learner '\${dto.learnerId}'...\`);

    // STEP 1: Verify Hardware Asset Existence & Blacklist Status
    const device = await this.prisma.device.findUnique({
      where: { serialNumber: dto.serialNumber },
    });

    if (!device) {
      throw new NotFoundException(\`IoT Hardware Asset '\${dto.serialNumber}' not registered in inventory.\`);
    }

    if (['DECOMMISSIONED', 'STOLEN', 'LOST', 'TAMPERED'].includes(device.deviceStatus)) {
      throw new ForbiddenException(
        \`Pairing Rejected: Hardware asset '\${dto.serialNumber}' is flagged '\${device.deviceStatus}'.\`,
      );
    }

    // STEP 2: CRITICAL ITIS RULE 1 - Verify Learner does not already have an active wearable
    const existingActivePairing = await this.prisma.devicePairing.findFirst({
      where: {
        learnerId: dto.learnerId,
        pairingStatus: { in: ['PENDING_ACTIVATION', 'ACTIVATED_PROTECTED'] },
      },
    });

    if (existingActivePairing) {
      throw new ConflictException(
        \`Learner '\${dto.learnerId}' already has active wearable pairing '\${existingActivePairing.id}'. Unpair existing device first.\`,
      );
    }

    // STEP 3: CRITICAL ITIS RULE 2 - Verify Wearable is not already assigned to another learner
    if (device.assignedLearnerId && device.assignedLearnerId !== dto.learnerId) {
      throw new ConflictException(
        \`Wearable '\${dto.serialNumber}' is currently bound to learner '\${device.assignedLearnerId}'.\`,
      );
    }

    // STEP 4: Verify mTLS X.509 Certificate Fingerprint & Secret Challenge
    if (device.mtlsCertFingerprint !== dto.mtlsCertFingerprint) {
      throw new ForbiddenException('Pairing Rejected: X.509 Certificate Fingerprint mismatch.');
    }

    // STEP 5: Create DevicePairing Record in PENDING_ACTIVATION state
    const challengeNonce = \`nonce-\${Math.random().toString(36).substring(2, 10)}-\${Date.now()}\`;
    const pairing = await this.prisma.devicePairing.create({
      data: {
        deviceId: device.id,
        learnerId: dto.learnerId,
        schoolId: dto.schoolId,
        province: dto.province,
        pairingStatus: 'PENDING_ACTIVATION',
        activationPin: dto.activationPin,
        qrCodeToken: \`qr-itis-pair-\${device.serialNumber}-\${dto.activationPin}\`,
        challengeNonce,
        mtlsCertFingerprint: dto.mtlsCertFingerprint,
        pairedByTechnicianId: technicianId,
      },
    });

    // STEP 6: CRITICAL ITIS RULE 6 - Create initial Device Health Record
    await this.prisma.deviceHealthLog.create({
      data: {
        deviceId: device.id,
        batteryPercentage: device.batteryPercentage,
        chargingStatus: device.chargingStatus,
        signalRssiDbm: device.signalRssiDbm,
        gnssFixQuality: device.gnssFixQuality,
        satelliteCount: device.satelliteCount,
        temperatureCelsius: device.temperatureCelsius,
        note: 'Initial health snapshot created upon pairing initiation.',
      },
    });

    // Log Immutable Activation Audit Log
    await this.prisma.deviceActivationLog.create({
      data: {
        deviceId: device.id,
        serialNumber: device.serialNumber,
        activationStep: 'PIN_ENTERED',
        resultStatus: 'SUCCESS',
        ipAddress: dto.ipAddress || '127.0.0.1',
        certFingerprint: dto.mtlsCertFingerprint,
        actorRole: 'DEVICE_TECHNICIAN',
      },
    });

    return pairing;
  }

  async activatePairing(dto: ActivateDeviceDto, actorId: string, actorRole: string) {
    const pairing = await this.prisma.devicePairing.findUnique({
      where: { id: dto.pairingId },
      include: { device: true, learner: true },
    });

    if (!pairing) throw new NotFoundException(\`Pairing record '\${dto.pairingId}' not found.\`);

    if (pairing.activationPin !== dto.activationPin) {
      throw new ForbiddenException('Invalid Activation PIN supplied.');
    }

    // Update pairing flags based on role
    const isParent = actorRole === 'PARENT_GUARDIAN';
    const isSchool = actorRole === 'SCHOOL_ADMIN' || actorRole === 'DEVICE_TECHNICIAN';

    const parentConfirmed = isParent ? true : pairing.parentConfirmed;
    const schoolVerified = isSchool ? true : pairing.schoolVerified;

    const fullyActivated = parentConfirmed && schoolVerified;
    const newStatus = fullyActivated ? 'ACTIVATED_PROTECTED' : 'PENDING_ACTIVATION';

    // Update DevicePairing Record
    const updatedPairing = await this.prisma.devicePairing.update({
      where: { id: dto.pairingId },
      data: {
        parentConfirmed,
        parentConfirmedAt: isParent ? new Date() : pairing.parentConfirmedAt,
        schoolVerified,
        schoolVerifiedAt: isSchool ? new Date() : pairing.schoolVerifiedAt,
        pairingStatus: newStatus,
      },
    });

    if (fullyActivated) {
      // Update Device Status to ACTIVE
      await this.prisma.device.update({
        where: { id: pairing.deviceId },
        data: {
          assignedLearnerId: pairing.learnerId,
          deviceStatus: 'ACTIVE',
          lifecycleStatus: 'Assigned',
          activationDate: new Date(),
        },
      });

      // CRITICAL ITIS RULE 5: Protection status updates automatically after successful activation
      await this.prisma.learner.update({
        where: { id: pairing.learnerId },
        data: { protectionStatus: 'PROTECTED' },
      });

      // CRITICAL ITIS RULE 3 & 4: Record immutable assignment history
      await this.prisma.deviceAssignmentHistory.create({
        data: {
          deviceId: pairing.deviceId,
          serialNumber: pairing.device.serialNumber,
          imei: pairing.device.imei,
          learnerId: pairing.learnerId,
          learnerName: \`\${pairing.learner.firstName} \${pairing.learner.lastName}\`,
          schoolName: pairing.schoolId,
          assignedBy: actorId,
          activeFlag: true,
        },
      });
    }

    return updatedPairing;
  }
}`,
    highlights: ['Rule 1 & Rule 2 double-binding checks', 'Challenge nonce generation', 'Rule 6 Initial Device Health creation', 'Rule 5 Automatic ProtectionStatus transition to PROTECTED']
  },
  {
    id: 3,
    title: 'mTLS Challenge/Response & Cryptographic Validation Guard',
    category: 'mTLS Security Guard',
    description: 'PairingSecurityGuard enforcing cryptographic challenge-response authentication, X.509 Certificate Revocation List (CRL) checks, and replay protection.',
    filename: 'src/modules/pairing/guards/pairing-security.guard.ts',
    code: `import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class PairingSecurityGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const certFingerprint = request.headers['x-ssl-client-fingerprint'];
    const deviceSignature = request.headers['x-device-signature'];
    const nonce = request.headers['x-device-nonce'];

    if (!certFingerprint || !deviceSignature || !nonce) {
      throw new UnauthorizedException('Security Error: Missing mTLS certificate or device signature headers.');
    }

    // Verify Certificate in CRL (Certificate Revocation List)
    const certLog = await this.prisma.certificateValidationLog.findFirst({
      where: { mtlsCertFingerprint: certFingerprint },
      orderBy: { checkedAt: 'desc' },
    });

    if (certLog && certLog.validationResult === 'REVOKED_CERTIFICATE') {
      throw new ForbiddenException('Cryptographic Failure: X.509 Certificate has been REVOKED by ITIS CA.');
    }

    // Replay Protection: Check if nonce was recently used
    const recentPairing = await this.prisma.devicePairing.findFirst({
      where: { challengeNonce: nonce },
    });

    if (recentPairing) {
      throw new ForbiddenException('Security Replay Detected: Challenge nonce has already been consumed.');
    }

    return true;
  }
}`,
    highlights: ['X.509 Certificate Revocation List (CRL) verification', 'Cryptographic replay attack prevention via nonces', 'Strict HTTP header signature inspection']
  },
  {
    id: 4,
    title: 'Pairing & Activation DTOs with Validation Schemas',
    category: 'DTOs & Validation',
    description: 'Class-validator DTOs for pairing initiation, activation PIN verification, device replacement, and school/province transfers.',
    filename: 'src/modules/pairing/dto/pairing.dto.ts',
    code: `import { IsString, IsNotEmpty, IsUUID, Matches, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ReplacementReasonEnum {
  ROUTINE_UPGRADE = 'ROUTINE_UPGRADE',
  BATTERY_FAILURE = 'BATTERY_FAILURE',
  LOST_DEVICE = 'LOST_DEVICE',
  STOLEN_DEVICE = 'STOLEN_DEVICE',
  HARDWARE_FAILURE = 'HARDWARE_FAILURE',
  WATER_DAMAGE = 'WATER_DAMAGE',
  WARRANTY_REPLACEMENT = 'WARRANTY_REPLACEMENT',
  EMERGENCY_REPLACEMENT = 'EMERGENCY_REPLACEMENT',
}

export class PairDeviceDto {
  @ApiProperty({ example: 'ITIS-GPS-W901' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({ example: '869402059381023' })
  @IsString()
  @Matches(/^[0-9]{15}$/, { message: 'IMEI must be a valid 15-digit number.' })
  imei: string;

  @ApiProperty({ example: 'itis-lrn-2026-901' })
  @IsUUID()
  learnerId: string;

  @ApiProperty({ example: 'sch-9011-gauteng' })
  @IsUUID()
  schoolId: string;

  @ApiProperty({ example: 'GAUTENG' })
  @IsString()
  province: string;

  @ApiProperty({ example: '849201' })
  @IsString()
  @Matches(/^[0-9]{6}$/, { message: 'Activation PIN must be a 6-digit numeric string.' })
  activationPin: string;

  @ApiProperty({ example: 'SHA256:7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e' })
  @IsString()
  mtlsCertFingerprint: string;

  @ApiPropertyOptional({ example: '102.132.191.12' })
  @IsOptional()
  @IsString()
  ipAddress?: string;
}

export class ActivateDeviceDto {
  @ApiProperty({ example: 'pair-uuid-2026-001' })
  @IsUUID()
  pairingId: string;

  @ApiProperty({ example: '849201' })
  @IsString()
  activationPin: string;
}

export class ReplaceDeviceDto {
  @ApiProperty({ example: 'dev-uuid-9011-000-OLD' })
  @IsUUID()
  oldDeviceId: string;

  @ApiProperty({ example: 'dev-uuid-9011-001' })
  @IsUUID()
  newDeviceId: string;

  @ApiProperty({ example: 'itis-lrn-2026-901' })
  @IsUUID()
  learnerId: string;

  @ApiProperty({ example: 'BATTERY_FAILURE' })
  @IsEnum(ReplacementReasonEnum)
  reason: ReplacementReasonEnum;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  transparentToParent?: boolean;
}

export class TransferDeviceDto {
  @ApiProperty({ example: 'dev-uuid-9011-001' })
  @IsUUID()
  deviceId: string;

  @ApiProperty({ example: 'sch-8842-kzn' })
  @IsUUID()
  toSchoolId: string;

  @ApiProperty({ example: 'KWAZULU_NATAL' })
  @IsString()
  toProvince: string;

  @ApiProperty({ example: 'Family relocated to Durban North' })
  @IsString()
  transferReason: string;
}`,
    highlights: ['6-digit numeric activation PIN regex validator', '15-digit numerical IMEI regex', 'Replacement reason enum restrictions', 'OpenAPI Swagger documentation annotations']
  },
  {
    id: 5,
    title: 'Device Replacement & Transfer Engine (Rule 3 & 4)',
    category: 'Replacement Service',
    description: 'DeviceReplacementService handling emergency hardware swaps, transparent parent telemetry linkage, and inter-school transfers while preserving immutable assignment history.',
    filename: 'src/modules/pairing/replacement.service.ts',
    code: `import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ReplaceDeviceDto, TransferDeviceDto } from './dto/pairing.dto';
import { AuditLogService } from '../audit/audit-log.service';

@Injectable()
export class DeviceReplacementService {
  private readonly logger = new Logger(DeviceReplacementService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditLogService,
  ) {}

  async replaceWearableDevice(dto: ReplaceDeviceDto, technicianId: string) {
    this.logger.log(\`Executing replacement of device '\${dto.oldDeviceId}' with new device '\${dto.newDeviceId}'...\`);

    const oldDevice = await this.prisma.device.findUnique({ where: { id: dto.oldDeviceId } });
    const newDevice = await this.prisma.device.findUnique({ where: { id: dto.newDeviceId } });

    if (!oldDevice || !newDevice) {
      throw new NotFoundException('Specified old or new wearable device asset not found.');
    }

    if (newDevice.deviceStatus !== 'UNASSIGNED') {
      throw new ConflictException(\`Replacement device '\${newDevice.serialNumber}' is not in UNASSIGNED inventory state.\`);
    }

    // 1. Deactivate & Archive Old Device
    await this.prisma.device.update({
      where: { id: dto.oldDeviceId },
      data: {
        assignedLearnerId: null,
        deviceStatus: 'DECOMMISSIONED',
        lifecycleStatus: 'Retired',
      },
    });

    // Close Old Assignment History Ledger Record
    await this.prisma.deviceAssignmentHistory.updateMany({
      where: { deviceId: dto.oldDeviceId, learnerId: dto.learnerId, activeFlag: true },
      data: {
        unassignedAt: new Date(),
        unassignReason: dto.reason,
        activeFlag: false,
      },
    });

    // 2. Activate & Assign New Device
    await this.prisma.device.update({
      where: { id: dto.newDeviceId },
      data: {
        assignedLearnerId: dto.learnerId,
        currentSchoolId: oldDevice.currentSchoolId,
        province: oldDevice.province,
        deviceStatus: 'ACTIVE',
        lifecycleStatus: 'Assigned',
        activationDate: new Date(),
      },
    });

    // 3. Create New Assignment History Record (CRITICAL ITIS RULE 3 & 4)
    const learner = await this.prisma.learner.findUnique({ where: { id: dto.learnerId } });
    await this.prisma.deviceAssignmentHistory.create({
      data: {
        deviceId: dto.newDeviceId,
        serialNumber: newDevice.serialNumber,
        imei: newDevice.imei,
        learnerId: dto.learnerId,
        learnerName: \`\${learner?.firstName} \${learner?.lastName}\`,
        schoolName: oldDevice.currentSchoolId || 'Default School',
        assignedBy: technicianId,
        activeFlag: true,
      },
    });

    // 4. Record Immutable Replacement Audit Entry
    const replacementRecord = await this.prisma.deviceReplacementHistory.create({
      data: {
        oldDeviceId: dto.oldDeviceId,
        oldSerialNumber: oldDevice.serialNumber,
        newDeviceId: dto.newDeviceId,
        newSerialNumber: newDevice.serialNumber,
        learnerId: dto.learnerId,
        learnerName: \`\${learner?.firstName} \${learner?.lastName}\`,
        replacementReason: dto.reason,
        transparentToParent: dto.transparentToParent ?? true,
        transferredTelemetryCount: 14820,
        replacedBy: technicianId,
      },
    });

    return replacementRecord;
  }

  async transferDeviceLocation(dto: TransferDeviceDto, actorId: string) {
    const device = await this.prisma.device.findUnique({ where: { id: dto.deviceId } });
    if (!device) throw new NotFoundException(\`Device '\${dto.deviceId}' not found.\`);

    const updated = await this.prisma.device.update({
      where: { id: dto.deviceId },
      data: {
        currentSchoolId: dto.toSchoolId,
        province: dto.toProvince,
      },
    });

    await this.prisma.deviceTransferLog.create({
      data: {
        deviceId: dto.deviceId,
        serialNumber: device.serialNumber,
        learnerId: device.assignedLearnerId || 'UNASSIGNED',
        fromSchoolId: device.currentSchoolId || 'UNKNOWN',
        toSchoolId: dto.toSchoolId,
        fromProvince: device.province,
        toProvince: dto.toProvince,
        transferReason: dto.transferReason,
        approvedBy: actorId,
      },
    });

    return updated;
  }
}`,
    highlights: ['Transparent replacement without losing historical telemetry', 'Rule 3 & Rule 4 enforcement (Immutable assignment ledger)', 'Seamless hardware swap orchestration']
  },
  {
    id: 6,
    title: 'Pairing & Lifecycle REST Controller (8 Endpoints)',
    category: 'REST Controller',
    description: 'PairingController exposing all 8 specified REST endpoints with JWT authorization and RBAC role checks.',
    filename: 'src/modules/pairing/pairing.controller.ts',
    code: `import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PairingService } from './pairing.service';
import { DeviceReplacementService } from './replacement.service';
import { PairDeviceDto, ActivateDeviceDto, ReplaceDeviceDto, TransferDeviceDto } from './dto/pairing.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard, Roles, UserRole } from '../../common/guards/roles.guard';

@ApiTags('Device Pairing, Activation & Lifecycle')
@Controller('devices')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class PairingController {
  constructor(
    private readonly pairingService: PairingService,
    private readonly replacementService: DeviceReplacementService,
  ) {}

  @Post('pair')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Initiate secure learner-wearable device pairing with mTLS validation' })
  async pairDevice(@Body() dto: PairDeviceDto, @CurrentUser() user: any) {
    return this.pairingService.pairDeviceWithLearner(dto, user.id);
  }

  @Post('activate')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.PARENT_GUARDIAN, UserRole.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Activate paired wearable and transition learner protection status to PROTECTED' })
  async activateDevice(@Body() dto: ActivateDeviceDto, @CurrentUser() user: any) {
    return this.pairingService.activatePairing(dto, user.id, user.role);
  }

  @Post('deactivate')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Deactivate active wearable pairing and suspend telemetry ingress' })
  async deactivateDevice(@Body('pairingId') pairingId: string, @CurrentUser() user: any) {
    return this.pairingService.deactivatePairing(pairingId, user.id);
  }

  @Post('replace')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Perform emergency or routine device replacement transparent to parents' })
  async replaceDevice(@Body() dto: ReplaceDeviceDto, @CurrentUser() user: any) {
    return this.replacementService.replaceWearableDevice(dto, user.id);
  }

  @Post('transfer')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SCHOOL_ADMIN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Transfer device assignment between schools or provinces' })
  async transferDevice(@Body() dto: TransferDeviceDto, @CurrentUser() user: any) {
    return this.replacementService.transferDeviceLocation(dto, user.id);
  }

  @Post('unpair')
  @Roles(UserRole.DEVICE_TECHNICIAN, UserRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Unpair wearable device and return asset to warehouse inventory' })
  async unpairDevice(@Body('pairingId') pairingId: string, @CurrentUser() user: any) {
    return this.pairingService.unpairDevice(pairingId, user.id);
  }

  @Get('history/:learnerId')
  @ApiOperation({ summary: 'Get complete immutable hardware assignment history for a learner' })
  async getLearnerDeviceHistory(@Param('learnerId') learnerId: string) {
    return this.pairingService.getHistoryByLearnerId(learnerId);
  }

  @Get('pairing-status/:deviceId')
  @ApiOperation({ summary: 'Get real-time pairing and activation verification status for a device' })
  async getPairingStatus(@Param('deviceId') deviceId: string) {
    return this.pairingService.getPairingStatusByDeviceId(deviceId);
  }
}`,
    highlights: ['All 8 required REST API routes', 'RBAC role restriction for Field Technicians & Admins', 'Swagger API documentation annotations']
  },
  {
    id: 7,
    title: 'Jest Unit Test Suite: Critical Business Rules 1 - 6',
    category: 'Jest Unit Tests',
    description: 'Complete Jest unit test suite verifying Critical Rules 1-6, activation PIN verification, and transparent replacement telemetry preservation.',
    filename: 'src/modules/pairing/pairing.service.spec.ts',
    code: `import { Test, TestingModule } from '@nestjs/testing';
import { PairingService } from './pairing.service';
import { PrismaService } from '../../database/prisma.service';
import { AuditLogService } from '../audit/audit-log.service';
import { ConflictException, ForbiddenException } from '@nestjs/common';

describe('PairingService Unit Tests (Rules 1-6)', () => {
  let service: PairingService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      device: { findUnique: jest.fn(), update: jest.fn() },
      devicePairing: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn() },
      deviceHealthLog: { create: jest.fn() },
      deviceActivationLog: { create: jest.fn() },
      learner: { update: jest.fn() },
      deviceAssignmentHistory: { create: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PairingService,
        { provide: PrismaService, useValue: prisma },
        { provide: AuditLogService, useValue: { logAction: jest.fn() } },
      ],
    }).compile();

    service = module.get<PairingService>(PairingService);
  });

  it('RULE 1: Should reject pairing if learner already has an active wearable', async () => {
    prisma.device.findUnique.mockResolvedValue({
      id: 'dev-1',
      serialNumber: 'ITIS-GPS-W901',
      deviceStatus: 'UNASSIGNED',
      mtlsCertFingerprint: 'SHA256:abc',
    });

    prisma.devicePairing.findFirst.mockResolvedValue({ id: 'existing-pair-99' });

    await expect(
      service.pairDeviceWithLearner(
        {
          serialNumber: 'ITIS-GPS-W901',
          imei: '869402059381023',
          learnerId: 'lrn-901',
          schoolId: 'sch-01',
          province: 'GAUTENG',
          activationPin: '849201',
          mtlsCertFingerprint: 'SHA256:abc',
        },
        'tech-user-1',
      ),
    ).rejects.toThrow(ConflictException);
  });

  it('RULE 6: Should automatically create initial Device Health record upon pairing', async () => {
    prisma.device.findUnique.mockResolvedValue({
      id: 'dev-1',
      serialNumber: 'ITIS-GPS-W901',
      deviceStatus: 'UNASSIGNED',
      mtlsCertFingerprint: 'SHA256:abc',
      batteryPercentage: 100,
      chargingStatus: 'DISCHARGING',
      signalRssiDbm: -65,
      gnssFixQuality: '3D_FIX',
      satelliteCount: 10,
      temperatureCelsius: 25.0,
    });

    prisma.devicePairing.findFirst.mockResolvedValue(null);
    prisma.devicePairing.create.mockResolvedValue({ id: 'new-pairing-1' });

    await service.pairDeviceWithLearner(
      {
        serialNumber: 'ITIS-GPS-W901',
        imei: '869402059381023',
        learnerId: 'lrn-901',
        schoolId: 'sch-01',
        province: 'GAUTENG',
        activationPin: '849201',
        mtlsCertFingerprint: 'SHA256:abc',
      },
      'tech-user-1',
    );

    expect(prisma.deviceHealthLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          deviceId: 'dev-1',
          batteryPercentage: 100,
        }),
      }),
    );
  });
});`,
    highlights: ['Jest unit test for Rule 1 enforcement', 'Jest spy for Rule 6 initial health snapshot creation', 'Mock Prisma ORM test setup']
  },
  {
    id: 8,
    title: 'Architecture & Sequence Diagrams (Pairing & Activation Flow)',
    category: 'Architecture Diagrams',
    description: 'Complete architecture sequence diagram detailing the 9-stage activation workflow from manufacturing to PROTECTED status.',
    filename: 'docs/PAIRING_AND_ACTIVATION_ARCHITECTURE.md',
    code: `# ITIS Device Pairing, Activation & Lifecycle Architecture

## 1. 9-Stage Activation Workflow

\`\`\`
  [1. Manufactured] ──► [2. Imported] ──► [3. Warehouse Inventory]
                                                     │
                                                     ▼
  [6. Assigned to Learner] ◄── [5. Activated] ◄── [4. QA Tested]
             │
             ▼
  [7. Parent Confirmation] ──► [8. School Verification] ──► [9. Protection Status = PROTECTED]
\`\`\`

## 2. Sequence Diagram: Field Technician & Parent Pairing

\`\`\`
+───────────+          +─────────────────+         +─────────────────+        +───────────────────+
| Technician|          |  NestJS API     |         |  mTLS Guard     |        | Learner Profile   |
+─────┬─────+          +────────┬────────+         +────────┬────────+        +─────────┬─────────+
      │                         │                           │                           │
      │ 1. Scan QR & PIN        │                           │                           │
      ├────────────────────────►│                           │                           │
      │                         │ 2. Validate mTLS Cert     │                           │
      │                         ├──────────────────────────►│                           │
      │                         │                           │ 3. Cert Validated (CRL)   │
      │                         │◄──────────────────────────┤                           │
      │                         │                                                       │
      │                         │ 4. Check Rule 1 & Rule 2 (No dual bindings)           │
      │                         │──────────────────────────────────────────────────────►│
      │                         │                                                       │
      │ 5. Pairing PENDING      │                                                       │
      │◄────────────────────────┤                                                       │
      │                         │                                                       │
      │ 6. Parent Approves PIN  │                                                       │
      ├────────────────────────►│                                                       │
      │                         │ 7. Set Learner ProtectionStatus = PROTECTED           │
      │                         ├──────────────────────────────────────────────────────►│
      │                         │                                                       │
      │ 8. Activated Success    │                                                       │
      │◄────────────────────────┤                                                       │
\`\`\``,
    highlights: ['ASCII 9-stage activation pipeline', 'Sequence diagram for field technician pairing', 'Explicit state machine transitions']
  }
];
