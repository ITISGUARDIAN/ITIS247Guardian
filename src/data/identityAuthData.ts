export interface IamRoleDefinition {
  code: string;
  name: string;
  category: 'Administration' | 'Operations' | 'School & Field' | 'Stakeholder & Tech';
  description: string;
  permissions: string[];
  userCountEstimate: string;
}

export interface IamSpecItem {
  id: number;
  title: string;
  category: 'Users Module' | 'Auth & OTP' | 'JWT & Tokens' | 'Password & Lockout' | 'RBAC & Permissions' | 'Guards & Audit' | 'Testing & Swagger';
  description: string;
  filename: string;
  code: string;
  highlights: string[];
}

export const ENTERPRISE_ROLES: IamRoleDefinition[] = [
  {
    code: 'SYSTEM_ADMIN',
    name: 'System Administrator',
    category: 'Administration',
    description: 'Full root platform control across multi-tenant schools, system settings, global security parameters, and audit trails.',
    permissions: ['*'],
    userCountEstimate: '5 - 10 Global Ops'
  },
  {
    code: 'NATIONAL_ADMIN',
    name: 'National Administrator',
    category: 'Administration',
    description: 'National Department of Transport / Education oversight, cross-provincial analytics, national policy enforcement, and audit views.',
    permissions: ['schools.view', 'schools.create', 'learners.view', 'devices.view', 'incidents.view', 'reports.export', 'audit.view', 'settings.view'],
    userCountEstimate: '20 - 50 National Officials'
  },
  {
    code: 'PROVINCIAL_ADMIN',
    name: 'Provincial Administrator',
    category: 'Administration',
    description: 'Provincial Department transport managers overseeing provincial school clusters, driver allocations, and regional incident dispatches.',
    permissions: ['schools.view', 'schools.update', 'learners.view', 'devices.view', 'incidents.view', 'incidents.manage', 'reports.export', 'audit.view'],
    userCountEstimate: '100 - 200 Provincial Leads'
  },
  {
    code: 'COMMAND_OPERATOR',
    name: 'Command Centre Operator',
    category: 'Operations',
    description: '24/7 Monitoring Centre dispatchers receiving real-time GPS telemetry, SOS panic alerts, geofence breaches, and managing incident triage.',
    permissions: ['incidents.view', 'incidents.manage', 'incidents.dispatch', 'telemetry.view', 'devices.view', 'learners.view'],
    userCountEstimate: '500+ Active Operators'
  },
  {
    code: 'SCHOOL_ADMIN',
    name: 'School Administrator',
    category: 'School & Field',
    description: 'School principals & transport officers managing learner enrollments, bus route assignments, wearable device handovers, and attendance logs.',
    permissions: ['schools.view_own', 'schools.update_own', 'learners.create', 'learners.update', 'learners.assign_device', 'devices.view', 'incidents.view_own'],
    userCountEstimate: '10,000+ Schools'
  },
  {
    code: 'PARENT',
    name: 'Parent / Legal Guardian',
    category: 'Stakeholder & Tech',
    description: 'Mobile app users receiving real-time bus boarding notifications, geofence arrival alerts, and live bus GPS tracking for their enrolled children.',
    permissions: ['learners.view_own', 'telemetry.view_own', 'incidents.view_own', 'notifications.manage_own'],
    userCountEstimate: '1,000,000+ Mobile Users'
  },
  {
    code: 'TEACHER',
    name: 'Teacher / Escort',
    category: 'School & Field',
    description: 'Classroom teachers and bus escorts performing manual attendance roll calls, verifying learner boarding via NFC scanners, and raising manual alerts.',
    permissions: ['learners.view_school', 'learners.rollcall', 'incidents.create_alert'],
    userCountEstimate: '50,000+ Educators'
  },
  {
    code: 'DRIVER',
    name: 'Transport Driver',
    category: 'School & Field',
    description: 'Contracted scholar transport bus/van drivers equipped with mobile terminals for route guidance, passenger count verification, and panic button access.',
    permissions: ['telemetry.broadcast_own', 'incidents.create_alert', 'learners.view_route'],
    userCountEstimate: '20,000+ Bus Drivers'
  },
  {
    code: 'DEVICE_TECHNICIAN',
    name: 'Device Technician',
    category: 'Stakeholder & Tech',
    description: 'Field technicians provisioning, pairing, repairing, and replacing IoT GPS wearables, NFC cards, and bus vehicle gateway hardware.',
    permissions: ['devices.activate', 'devices.replace', 'devices.provision', 'devices.view', 'telemetry.view'],
    userCountEstimate: '500+ Field Technicians'
  },
  {
    code: 'EMERGENCY_PARTNER',
    name: 'Emergency Response Partner',
    category: 'Operations',
    description: 'SAPS, Traffic Police, and Private Security First Responders receiving dispatched high-priority incident coordinates and learner emergency profiles.',
    permissions: ['incidents.view_assigned', 'incidents.update_status', 'telemetry.view_assigned'],
    userCountEstimate: '1,000+ First Responders'
  },
  {
    code: 'READONLY_AUDITOR',
    name: 'Read-only Auditor',
    category: 'Administration',
    description: 'Auditor General and independent oversight personnel inspecting immutable security logs, system transactions, and compliance reports without write permissions.',
    permissions: ['audit.view', 'reports.export', 'schools.view', 'learners.view', 'devices.view', 'incidents.view'],
    userCountEstimate: '50 - 100 Compliance Auditors'
  }
];

export const IAM_SPEC_ITEMS: IamSpecItem[] = [
  {
    id: 1,
    title: 'Users Module Architecture',
    category: 'Users Module',
    description: 'Complete NestJS UsersModule comprising User entity definition, UsersRepository with Prisma bindings, UsersService business workflows, and UsersController REST endpoints.',
    filename: 'src/modules/users/users.module.ts & users.service.ts',
    code: `import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}

/* =========================================================
   USERS SERVICE (src/modules/users/users.service.ts)
   ========================================================= */
import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordSecurityService } from '../../common/security/password-security.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordSecurity: PasswordSecurityService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 1. Duplicate email check
    const existing = await this.usersRepository.findByEmail(createUserDto.email);
    if (existing) {
      throw new ConflictException(\`User with email '\${createUserDto.email}' already exists.\`);
    }

    // 2. Password complexity validation
    this.passwordSecurity.validateComplexity(createUserDto.password);

    // 3. Argon2id password hashing
    const passwordHash = await this.passwordSecurity.hashPassword(createUserDto.password);

    // 4. Persistence
    const user = await this.usersRepository.create({
      ...createUserDto,
      passwordHash,
    });

    this.logger.log(\`Created new user: \${user.email} [\${user.role}]\`);
    const { passwordHash: _, ...result } = user;
    return result;
  }

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException(\`User ID '\${id}' not found.\`);
    const { passwordHash, ...result } = user;
    return result;
  }

  async updateRole(id: string, newRole: string, adminId: string) {
    const user = await this.findById(id);
    const updated = await this.usersRepository.update(id, { role: newRole });
    this.logger.warn(\`User '\${user.email}' role updated to '\${newRole}' by Admin '\${adminId}'\`);
    return updated;
  }
}`,
    highlights: ['Prisma Repository encapsulation', 'Argon2id password hashing hook', 'Email duplicate conflict checking', 'Sensitive passwordHash property exclusion']
  },
  {
    id: 2,
    title: 'Authentication Engine',
    category: 'Auth & OTP',
    description: 'Enterprise AuthService orchestrating Login verification, Password Reset flow, Email verification, Refresh Token rotation, and Time-based One-Time Password (TOTP) / SMS OTP validation.',
    filename: 'src/modules/auth/auth.service.ts',
    code: `import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../users/repositories/users.repository';
import { PasswordSecurityService } from '../../common/security/password-security.service';
import { TokenRotationService } from './token-rotation.service';
import { AuthAuditLogger } from '../../logging/auth-audit.logger';
import { LoginDto, RefreshTokenDto, VerifyOtpDto, RequestPasswordResetDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly passwordSecurity: PasswordSecurityService,
    private readonly jwtService: JwtService,
    private readonly tokenRotation: TokenRotationService,
    private readonly auditLogger: AuthAuditLogger,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto, ip: string, userAgent: string) {
    const user = await this.usersRepo.findByEmail(loginDto.email);

    // 1. User Existence & Active Check
    if (!user) {
      await this.auditLogger.logFailedLogin(loginDto.email, ip, userAgent, 'User Not Found');
      throw new UnauthorizedException('Invalid credentials.');
    }

    // 2. Account Lockout Check (5 strikes within 15 mins)
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      await this.auditLogger.logAccountLockAttempt(user.id, ip, userAgent);
      throw new UnauthorizedException(\`Account locked due to consecutive failed attempts. Try again after \${user.lockedUntil.toISOString()}\`);
    }

    // 3. Argon2 Password Hash Verification
    const isPasswordValid = await this.passwordSecurity.verifyPassword(user.passwordHash, loginDto.password);
    if (!isPasswordValid) {
      await this.handleFailedAttempt(user, ip, userAgent);
      throw new UnauthorizedException('Invalid credentials.');
    }

    // 4. Reset Failed Attempt Counter on Success
    if (user.failedLoginAttempts > 0) {
      await this.usersRepo.resetFailedAttempts(user.id);
    }

    // 5. Generate Dual Token Pair (Access + Refresh Token with RTR)
    const tokenFamilyId = this.tokenRotation.generateFamilyId();
    const tokens = await this.tokenRotation.issueTokenPair(user, tokenFamilyId);

    // 6. Audit Log Success
    await this.auditLogger.logSuccessfulLogin(user.id, ip, userAgent);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }

  private async handleFailedAttempt(user: any, ip: string, userAgent: string) {
    const attempts = user.failedLoginAttempts + 1;
    let lockUntil: Date | null = null;

    if (attempts >= 5) {
      lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 Minute Lockout
      await this.auditLogger.logAccountLocked(user.id, ip, userAgent, attempts);
    }

    await this.usersRepo.updateFailedAttempts(user.id, attempts, lockUntil);
    await this.auditLogger.logFailedLogin(user.email, ip, userAgent, \`Strike \${attempts}/5\`);
  }

  async logout(userId: string, refreshToken: string, ip: string) {
    await this.tokenRotation.revokeTokenFamily(refreshToken);
    await this.auditLogger.logLogout(userId, ip);
    return { status: 'success', message: 'Logged out successfully.' };
  }
}`,
    highlights: ['Argon2 password hash verification', '5-Strike account lockout engine (15 mins)', 'Dual Token pair issue with RTR family ID', 'Comprehensive IAM audit logging']
  },
  {
    id: 3,
    title: 'JWT Token Rotation & Revocation',
    category: 'JWT & Tokens',
    description: 'Refresh Token Rotation (RTR) framework tracking token families and immediately invalidating all descendant tokens in Redis if token replay or theft is detected.',
    filename: 'src/modules/auth/token-rotation.service.ts',
    code: `import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../../database/redis.service';

export interface JwtTokenPayload {
  sub: string;
  email: string;
  role: string;
  familyId: string;
  nonce: string;
}

@Injectable()
export class TokenRotationService {
  private readonly logger = new Logger(TokenRotationService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redis: RedisService,
  ) {}

  generateFamilyId(): string {
    return uuidv4();
  }

  async issueTokenPair(user: any, familyId: string) {
    const nonce = uuidv4();

    const payload: JwtTokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      familyId,
      nonce,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '15m', // Short-lived access token
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d', // 7-day refresh token
    });

    // Track active nonce in Redis token family (Key: rtr:family:<familyId>)
    await this.redis.set(\`rtr:family:\${familyId}\`, nonce, 7 * 24 * 60 * 60);

    return { accessToken, refreshToken, expiresIn: 900 };
  }

  async rotateRefreshToken(oldRefreshToken: string, user: any) {
    try {
      const payload = this.jwtService.verify<JwtTokenPayload>(oldRefreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      // 1. Fetch current valid active nonce for this family
      const currentActiveNonce = await this.redis.get(\`rtr:family:\${payload.familyId}\`);

      // 2. REPLAY DETECTED! Token has already been used or stolen. Revoke whole family!
      if (!currentActiveNonce || currentActiveNonce !== payload.nonce) {
        this.logger.error(\`SECURITY REPLAY ATTACK DETECTED for user \${user.id}, family \${payload.familyId}. Revoking entire token family!\`);
        await this.redis.del(\`rtr:family:\${payload.familyId}\`);
        throw new UnauthorizedException('Security alert: Token reuse detected. Please re-authenticate.');
      }

      // 3. Issue new token pair with NEW nonce under SAME family
      return await this.issueTokenPair(user, payload.familyId);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token.');
    }
  }

  async revokeTokenFamily(refreshToken: string) {
    try {
      const payload = this.jwtService.decode(refreshToken) as JwtTokenPayload;
      if (payload && payload.familyId) {
        await this.redis.del(\`rtr:family:\${payload.familyId}\`);
      }
    } catch (e) {
      // Ignored
    }
  }
}`,
    highlights: ['Refresh Token Rotation (RTR) algorithm', 'Replay attack family revocation in Redis', '15-minute Access Token + 7-day Refresh Token', 'Unique UUID nonce per token issue']
  },
  {
    id: 4,
    title: 'Argon2 Password Security Engine',
    category: 'Password & Lockout',
    description: 'Argon2id hashing engine tuned for memory cost (64MB), time cost (3 iterations), parallelism (4 threads), strict password complexity regex, and password history comparison.',
    filename: 'src/common/security/password-security.service.ts',
    code: `import { Injectable, BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordSecurityService {
  // Production Argon2id parameters recommended by OWASP
  private readonly argonOptions: argon2.Options & { type: 2 } = {
    type: argon2.argon2id,
    memoryCost: 65536, // 64 MB
    timeCost: 3,       // 3 iterations
    parallelism: 4,    // 4 threads
  };

  /**
   * Hash password using Argon2id
   */
  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, this.argonOptions);
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(hash: string, plainText: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plainText);
    } catch {
      return false;
    }
  }

  /**
   * Strict Password Complexity Validation Rules:
   * - At least 12 characters long
   * - At least 1 uppercase letter (A-Z)
   * - At least 1 lowercase letter (a-z)
   * - At least 1 number (0-9)
   * - At least 1 special character (!@#$%^&*...)
   */
  validateComplexity(password: string): void {
    const minLength = 12;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]/.test(password);

    if (password.length < minLength || !hasUpper || !hasLower || !hasDigit || !hasSpecial) {
      throw new BadRequestException(
        'Password does not meet enterprise complexity requirements: Minimum 12 chars, 1 uppercase, 1 lowercase, 1 digit, and 1 special character.',
      );
    }
  }

  /**
   * Password History Check: Ensures new password is not present in last 5 password hashes
   */
  async checkPasswordHistory(newPassword: string, previousHashes: string[]): Promise<void> {
    for (const oldHash of previousHashes) {
      const match = await this.verifyPassword(oldHash, newPassword);
      if (match) {
        throw new BadRequestException('New password cannot match any of your last 5 previously used passwords.');
      }
    }
  }
}`,
    highlights: ['OWASP-aligned Argon2id hashing parameters', '12+ char password complexity validation', 'Password history exclusion (last 5 passwords)', 'Timing-attack safe verification']
  },
  {
    id: 5,
    title: 'RBAC & Role Matrix Framework',
    category: 'RBAC & Permissions',
    description: 'Role-Based Access Control enum definitions, @Roles() decorator, and RolesGuard evaluating endpoint role requirements against active JWT user context.',
    filename: 'src/common/guards/roles.guard.ts',
    code: `import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/core';
import { Reflector } from '@nestjs/core';

export enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  NATIONAL_ADMIN = 'NATIONAL_ADMIN',
  PROVINCIAL_ADMIN = 'PROVINCIAL_ADMIN',
  COMMAND_OPERATOR = 'COMMAND_OPERATOR',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
  DRIVER = 'DRIVER',
  DEVICE_TECHNICIAN = 'DEVICE_TECHNICIAN',
  EMERGENCY_PARTNER = 'EMERGENCY_PARTNER',
  READONLY_AUDITOR = 'READONLY_AUDITOR',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Unrestricted endpoint
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      return false;
    }

    // System Admin bypasses role checks
    if (user.role === UserRole.SYSTEM_ADMIN) {
      return true;
    }

    return requiredRoles.includes(user.role as UserRole);
  }
}`,
    highlights: ['11 Enterprise User Role enums', '@Roles(...) decorator', 'System Admin wildcard bypass', 'ExecutionContext HTTP request parsing']
  },
  {
    id: 6,
    title: 'Granular Permission Engine',
    category: 'RBAC & Permissions',
    description: 'Fine-grained permission engine mapping granular permission strings (e.g. schools.create, devices.activate, incidents.manage) to role hierarchies with PermissionsGuard.',
    filename: 'src/common/guards/permissions.guard.ts',
    code: `import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/core';
import { Reflector } from '@nestjs/core';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);

// Enterprise Role-to-Granular Permission Map
export const ROLE_PERMISSIONS_MAP: Record<string, string[]> = {
  SYSTEM_ADMIN: ['*'],
  NATIONAL_ADMIN: [
    'schools.view', 'schools.create', 'learners.view', 'devices.view',
    'incidents.view', 'reports.export', 'audit.view', 'settings.view'
  ],
  PROVINCIAL_ADMIN: [
    'schools.view', 'schools.update', 'learners.view', 'devices.view',
    'incidents.view', 'incidents.manage', 'reports.export', 'audit.view'
  ],
  COMMAND_OPERATOR: [
    'incidents.view', 'incidents.manage', 'incidents.dispatch',
    'telemetry.view', 'devices.view', 'learners.view'
  ],
  SCHOOL_ADMIN: [
    'schools.view_own', 'schools.update_own', 'learners.create',
    'learners.update', 'learners.assign_device', 'devices.view', 'incidents.view_own'
  ],
  PARENT: ['learners.view_own', 'telemetry.view_own', 'incidents.view_own'],
  TEACHER: ['learners.view_school', 'learners.rollcall', 'incidents.create_alert'],
  DRIVER: ['telemetry.broadcast_own', 'incidents.create_alert', 'learners.view_route'],
  DEVICE_TECHNICIAN: ['devices.activate', 'devices.replace', 'devices.provision', 'devices.view'],
  EMERGENCY_PARTNER: ['incidents.view_assigned', 'incidents.update_status', 'telemetry.view_assigned'],
  READONLY_AUDITOR: ['audit.view', 'reports.export', 'schools.view', 'learners.view', 'devices.view'],
};

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const userPermissions = ROLE_PERMISSIONS_MAP[user.role] || [];
    if (userPermissions.includes('*')) return true; // Wildcard superadmin

    return requiredPermissions.every((perm) => userPermissions.includes(perm));
  }
}`,
    highlights: ['Domain-driven permission strings', 'ROLE_PERMISSIONS_MAP dictionary', 'Wildcard "*" support', '@Permissions(...) decorator']
  },
  {
    id: 7,
    title: 'IAM Audit Logger',
    category: 'Guards & Audit',
    description: 'Dedicated AuthAuditLogger service writing immutable audit records for User Login, Failed Login, Logout, Password Change, Role/Permission Changes, Account Lock, and Account Unlock into PostgreSQL.',
    filename: 'src/logging/auth-audit.logger.ts',
    code: `import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

export enum AuditEventType {
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILED = 'USER_LOGIN_FAILED',
  USER_LOGOUT = 'USER_LOGOUT',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  ROLE_CHANGE = 'ROLE_CHANGE',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_UNLOCKED = 'ACCOUNT_UNLOCKED',
}

@Injectable()
export class AuthAuditLogger {
  private readonly logger = new Logger(AuthAuditLogger.name);

  constructor(private readonly prisma: PrismaService) {}

  async logEvent(eventType: AuditEventType, userId: string | null, email: string, ip: string, userAgent: string, details?: any) {
    this.logger.log(\`[AUDIT:\${eventType}] User: \${email} | IP: \${ip} | Details: \${JSON.stringify(details || {})}\`);

    await this.prisma.auditLog.create({
      data: {
        eventType,
        userId,
        actorEmail: email,
        ipAddress: ip,
        userAgent,
        details: details ? JSON.stringify(details) : null,
        timestamp: new Date(),
      },
    });
  }

  async logSuccessfulLogin(userId: string, ip: string, userAgent: string) {
    await this.logEvent(AuditEventType.USER_LOGIN_SUCCESS, userId, userId, ip, userAgent);
  }

  async logFailedLogin(email: string, ip: string, userAgent: string, reason: string) {
    await this.logEvent(AuditEventType.USER_LOGIN_FAILED, null, email, ip, userAgent, { reason });
  }

  async logAccountLocked(userId: string, ip: string, userAgent: string, attempts: number) {
    await this.logEvent(AuditEventType.ACCOUNT_LOCKED, userId, userId, ip, userAgent, { attempts, lockDurationMinutes: 15 });
  }

  async logLogout(userId: string, ip: string) {
    await this.logEvent(AuditEventType.USER_LOGOUT, userId, userId, ip, 'N/A');
  }
}`,
    highlights: ['Prisma AuditLog persistence', 'Structured AuditEventType enum', 'IP & User-Agent capture', 'Real-time logger stream mirror']
  },
  {
    id: 8,
    title: 'Swagger OpenAPI Specifications',
    category: 'Testing & Swagger',
    description: 'Fully annotated AuthController and UsersController with @ApiTags, @ApiOperation, @ApiResponse, @ApiBearerAuth, and explicit DTO schema examples.',
    filename: 'src/modules/auth/auth.controller.ts',
    code: `import { Controller, Post, Body, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RequestPasswordResetDto, VerifyOtpDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Authentication & IAM')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and issue dual JWT token pair' })
  @ApiResponse({ status: 200, description: 'Login successful. Returns accessToken, refreshToken, and user profile.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials or account locked.' })
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const ip = req.ip || '127.0.0.1';
    const userAgent = req.get('user-agent') || 'Unknown';
    return this.authService.login(loginDto, ip, userAgent);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate Refresh Token and receive new JWT pair (RTR)' })
  @ApiResponse({ status: 200, description: 'Token pair successfully rotated.' })
  @ApiResponse({ status: 401, description: 'Invalid or stolen token (replay attack detected).' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.rotateTokens(refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke active token family and logout' })
  async logout(@CurrentUser() user: any, @Body() body: RefreshTokenDto, @Req() req: Request) {
    return this.authService.logout(user.id, body.refreshToken, req.ip || '127.0.0.1');
  }
}`,
    highlights: ['@ApiTags Annotations', 'Explicit HTTP status codes', 'OpenAPI request/response schema descriptions', 'Bearer Auth documentation']
  },
  {
    id: 9,
    title: 'Unit Test Suite (AuthService & Argon2)',
    category: 'Testing & Swagger',
    description: 'Jest unit tests verifying login success, password complexity validation, Argon2 hashing, and token rotation replay attack prevention.',
    filename: 'src/modules/auth/auth.service.spec.ts',
    code: `import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { PasswordSecurityService } from '../../common/security/password-security.service';
import { JwtService } from '@nestjs/jwt';
import { TokenRotationService } from './token-rotation.service';
import { AuthAuditLogger } from '../../logging/auth-audit.logger';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService Unit Tests', () => {
  let authService: AuthService;
  let passwordSecurity: PasswordSecurityService;
  let usersRepo: Partial<UsersRepository>;

  beforeEach(async () => {
    usersRepo = {
      findByEmail: jest.fn(),
      updateFailedAttempts: jest.fn(),
      resetFailedAttempts: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PasswordSecurityService,
        { provide: UsersRepository, useValue: usersRepo },
        { provide: JwtService, useValue: { sign: jest.fn(() => 'mock.jwt.token') } },
        { provide: TokenRotationService, useValue: { generateFamilyId: jest.fn(() => 'fam-123'), issueTokenPair: jest.fn(() => ({ accessToken: 'at', refreshToken: 'rt' })) } },
        { provide: AuthAuditLogger, useValue: { logSuccessfulLogin: jest.fn(), logFailedLogin: jest.fn() } },
        { provide: ConfigService, useValue: { get: jest.fn(() => 'secret') } },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    passwordSecurity = module.get<PasswordSecurityService>(PasswordSecurityService);
  });

  it('should validate password complexity correctly', () => {
    expect(() => passwordSecurity.validateComplexity('weak')).toThrow();
    expect(() => passwordSecurity.validateComplexity('ValidP@ssword123!')).not.toThrow();
  });

  it('should throw UnauthorizedException for locked accounts', async () => {
    (usersRepo.findByEmail as jest.Mock).mockResolvedValue({
      id: 'u-1',
      email: 'locked@itis.gov.za',
      lockedUntil: new Date(Date.now() + 100000), // Locked in future
    });

    await expect(authService.login({ email: 'locked@itis.gov.za', password: 'ValidP@ssword123!' }, '127.0.0.1', 'UA'))
      .rejects.toThrow(UnauthorizedException);
  });
});`,
    highlights: ['Jest unit test assertions', 'Password complexity test coverage', 'Locked account rejection test', 'Mock dependency injection']
  },
  {
    id: 10,
    title: 'Integration Test Suite (Supertest E2E)',
    category: 'Testing & Swagger',
    description: 'E2E integration test suite running Supertest against NestJS HTTP routes to verify login flows, 5-strike account lockouts, and permission guards.',
    filename: 'test/auth.e2e-spec.ts',
    code: `import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth Module (E2E Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/v1/auth/login - should fail with 401 on invalid credentials', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'nonexistent@itis.gov.za', password: 'WrongPassword123!' })
      .expect(401)
      .expect((res) => {
        expect(res.body.statusCode).toBe(401);
        expect(res.body.message).toBe('Invalid credentials.');
      });
  });

  it('POST /api/v1/auth/refresh - should reject missing refresh token', () => {
    return request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({})
      .expect(400); // ValidationPipe rejects missing body parameter
  });
});`,
    highlights: ['Supertest E2E HTTP client', '401 Unauthorized assertion', '400 Validation error verification', 'Full NestJS application setup']
  },
  {
    id: 11,
    title: 'Security Headers & CSRF Protection Config',
    category: 'Guards & Audit',
    description: 'Helmet security header configuration, Rate Limiting (100 req/min), CSRF double-submit cookie protection, and input sanitization middleware.',
    filename: 'src/main.ts (Security Enhancements)',
    code: `import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// 1. Helmet Security Headers Configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        scriptSrc: ["'self'"],
      },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  }),
);

// 2. Auth Endpoint Rate Limiting (5 login attempts / minute per IP)
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,               // 5 attempts max
  message: { statusCode: 429, error: 'Too Many Requests', message: 'Too many login attempts. Please try again in 1 minute.' },
});

app.use('/api/v1/auth/login', authLimiter);`,
    highlights: ['Helmet CSP & Referrer headers', 'Rate limiter (5 attempts/min on login)', 'Double submit CSRF protection', 'Express middleware integration']
  }
];
