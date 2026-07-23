export type UserRole =
  | 'SYSTEM_ADMIN'
  | 'NATIONAL_ADMIN'
  | 'PROVINCIAL_ADMIN'
  | 'COMMAND_OPERATOR'
  | 'SCHOOL_ADMIN'
  | 'TEACHER'
  | 'PARENT'
  | 'DRIVER'
  | 'DEVICE_TECHNICIAN'
  | 'EMERGENCY_PARTNER'
  | 'READONLY_AUDITOR';

export type AuthScreenRoute =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'verify-email'
  | 'verify-otp'
  | 'mfa'
  | 'select-tenant'
  | 'profile'
  | 'access-denied'
  | 'session-expired';

export interface UserRoleRedirectSpec {
  role: UserRole;
  label: string;
  targetPortal: string;
  description: string;
  defaultPermissions: string[];
}

export interface UserTenantSpec {
  id: string;
  name: string;
  province: string;
  type: 'SCHOOL' | 'PROVINCIAL_COMMAND' | 'NATIONAL_DEPT' | 'SAPS_DISTRICT' | 'FLEET_OPERATOR';
  activeUsersCount: number;
}

export interface ActiveSessionSpec {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface RegisteredDeviceSpec {
  id: string;
  deviceName: string;
  type: 'MOBILE' | 'DESKTOP' | 'TABLET';
  mfaVerified: boolean;
  addedDate: string;
}

// SUPPORTED USER ROLES & RBAC REDIRECT MATRIX
export const USER_ROLE_REDIRECTS: Record<UserRole, UserRoleRedirectSpec> = {
  SYSTEM_ADMIN: {
    role: 'SYSTEM_ADMIN',
    label: 'System Administrator',
    targetPortal: 'National System Control & IAM Console',
    description: 'Full root authority over SITA cloud infrastructure, tenant isolation, and cryptographic keys.',
    defaultPermissions: ['*.*', 'iam.manage', 'keys.rotate', 'tenant.provision'],
  },
  NATIONAL_ADMIN: {
    role: 'NATIONAL_ADMIN',
    label: 'National DBE Admin',
    targetPortal: 'National Executive Dashboard & DBE Analytics',
    description: 'Overarching policy supervision across all 9 South African provinces and 23,000 schools.',
    defaultPermissions: ['dbe.read_all', 'reports.national', 'audit.view'],
  },
  PROVINCIAL_ADMIN: {
    role: 'PROVINCIAL_ADMIN',
    label: 'Provincial DBE Director',
    targetPortal: 'Provincial Transport & Safety Operations',
    description: 'Provincial supervision of school circuits, transport corridors, and regional emergency responses.',
    defaultPermissions: ['province.read', 'circuit.manage', 'alerts.override'],
  },
  COMMAND_OPERATOR: {
    role: 'COMMAND_OPERATOR',
    label: 'Command Centre Operator',
    targetPortal: 'ITIS National CAD & Emergency Command Centre',
    description: 'Real-time telemetry monitoring, sub-900ms alert processing, and emergency dispatch routing.',
    defaultPermissions: ['telemetry.live', 'cad.dispatch', 'saps.escalate'],
  },
  SCHOOL_ADMIN: {
    role: 'SCHOOL_ADMIN',
    label: 'School Principal / Admin',
    targetPortal: 'School Management Portal & SA-SAMS Sync',
    description: 'Learner roster management, gate reader access logs, and local parent communication.',
    defaultPermissions: ['school.roster', 'sams.sync', 'wearable.assign'],
  },
  TEACHER: {
    role: 'TEACHER',
    label: 'Classroom Teacher',
    targetPortal: 'School Portal — Classroom View',
    description: 'Classroom attendance check-ins, field trip geofence tracking, and parent broadcast messaging.',
    defaultPermissions: ['class.attendance', 'parent.notify'],
  },
  PARENT: {
    role: 'PARENT',
    label: 'Parent / Legal Guardian',
    targetPortal: 'ITIS Parent Mobile App Portal',
    description: 'Live learner tracking, transport bus arrival notifications, and instant SOS emergency panic trigger.',
    defaultPermissions: ['child.track', 'sos.trigger', 'geofence.view'],
  },
  DRIVER: {
    role: 'DRIVER',
    label: 'Learner Transport Driver',
    targetPortal: 'Transport Fleet Driver Portal',
    description: 'Vehicle BLE mesh route verification, student passenger manifest check, and driver safety logs.',
    defaultPermissions: ['route.active', 'passenger.verify', 'ble.broadcast'],
  },
  DEVICE_TECHNICIAN: {
    role: 'DEVICE_TECHNICIAN',
    label: 'Field Hardware Technician',
    targetPortal: 'Hardware Provisioning & BLE Technician App',
    description: 'nRF9160 optical band pairing, STSAFE cryptographic key flashing, and hardware diagnostics.',
    defaultPermissions: ['wearable.flash', 'ble.pair', 'diag.read'],
  },
  EMERGENCY_PARTNER: {
    role: 'EMERGENCY_PARTNER',
    label: 'SAPS 10111 / EMS First Responder',
    targetPortal: 'SAPS Emergency Dispatch Mobile Console',
    description: 'Direct CAD ticket receiving, live intercept vectoring, and suspect vehicle telemetry feeds.',
    defaultPermissions: ['cad.receive', 'gps.intercept', 'unit.status'],
  },
  READONLY_AUDITOR: {
    role: 'READONLY_AUDITOR',
    label: 'Governance & POPIA Auditor',
    targetPortal: 'Sovereign Audit & Compliance Console',
    description: 'Read-only access to immutable audit logs, POPIA consent history, and mTLS traffic metrics.',
    defaultPermissions: ['audit.read', 'popia.export', 'log.verify'],
  },
};

// SAMPLE TENANTS FOR MULTI-TENANT SELECTION
export const SAMPLE_TENANTS: UserTenantSpec[] = [
  { id: 'TNT-GP-001', name: 'Gauteng Department of Education — Johannesburg Central', province: 'Gauteng', type: 'PROVINCIAL_COMMAND', activeUsersCount: 1420 },
  { id: 'TNT-KZN-004', name: 'Umlazi Primary School Circuit (14 Schools)', province: 'KwaZulu-Natal', type: 'SCHOOL', activeUsersCount: 850 },
  { id: 'TNT-WC-002', name: 'Western Cape SAPS 10111 Flying Squad Command', province: 'Western Cape', type: 'SAPS_DISTRICT', activeUsersCount: 320 },
  { id: 'TNT-EC-008', name: 'Eastern Cape Scholar Transport Operator Co-op', province: 'Eastern Cape', type: 'FLEET_OPERATOR', activeUsersCount: 610 },
];

// SAMPLE ACTIVE SESSIONS
export const SAMPLE_ACTIVE_SESSIONS: ActiveSessionSpec[] = [
  { id: 'SES-9921', device: 'Apple MacBook Pro 16"', browser: 'Chrome 126.0 (macOS)', location: 'Pretoria, Gauteng, RSA', ipAddress: '102.165.48.12', lastActive: 'Just now', isCurrent: true },
  { id: 'SES-8810', device: 'Samsung Galaxy S24 Ultra', browser: 'ITIS Parent App v2.4 (Android 14)', location: 'Johannesburg, GP, RSA', ipAddress: '105.224.19.88', lastActive: '2 hours ago', isCurrent: false },
  { id: 'SES-7734', device: 'Dell Latitude 7440', browser: 'Edge 125.0 (Windows 11 Enterprise)', location: 'SITA Erasmuskloof, Pretoria', ipAddress: '196.25.255.1', lastActive: '1 day ago', isCurrent: false },
];

// SAMPLE REGISTERED DEVICES
export const SAMPLE_REGISTERED_DEVICES: RegisteredDeviceSpec[] = [
  { id: 'DEV-001', deviceName: 'MacBook Pro (SITA Enterprise Issued)', type: 'DESKTOP', mfaVerified: true, addedDate: '12 Jan 2026' },
  { id: 'DEV-002', deviceName: 'Galaxy S24 (Personal Parent Device)', type: 'MOBILE', mfaVerified: true, addedDate: '04 Mar 2026' },
];

// MANDATORY ENTERPRISE SECURITY RULES
export const CRITICAL_AUTH_RULES = [
  { id: 1, title: 'Prompt 017 IAM Contract Alignment', ruleText: 'Auth interfaces map directly to Prompt 017 NestJS OAuth2/OIDC JWT bearer token verification schemas.', badge: 'PROMPT 017 IAM' },
  { id: 2, title: 'Role-Based Automatic Redirection', ruleText: 'Post-login routing dynamically dispatches users to their designated portal based on strict RBAC matrix permissions.', badge: 'DYNAMIC RBAC' },
  { id: 3, title: 'POPIA & SITA Consent Compliance', ruleText: 'Self-registration requires explicit POPIA data handling consent and RSA identification validation.', badge: 'POPIA COMPLIANT' },
  { id: 4, title: 'Hardware MFA & 6-Digit PIN Verification', ruleText: 'Supports TOTP authenticator apps, SMS OTP fallbacks, and 8-character emergency backup code recovery.', badge: 'MFA REQUIRED' },
  { id: 5, title: 'Multi-Tenant Circuit Isolation', ruleText: 'Users with multi-jurisdiction privileges must explicitly select an active tenant session prior to entering operational views.', badge: 'MULTI-TENANT' },
  { id: 6, title: 'Brute-Force Rate Limiting & Account Lockout', ruleText: 'Provides visual feedback for failed login attempts, rate-limiting delays, and account suspension warnings.', badge: 'RATE LIMITED' },
  { id: 7, title: 'Real-Time Password Policy Meter', ruleText: 'Enforces 12+ char passwords with mandatory uppercase, lowercase, numbers, and special symbols.', badge: 'STRICT POLICIES' },
  { id: 8, title: 'Session Timeout & Device Revocation', ruleText: 'Active session management allowing users to inspect device IP addresses and remotely terminate stale sessions.', badge: 'SESSION SECURE' },
  { id: 9, title: 'Government SSO & Identity Federation', ruleText: 'Pre-configured UI placeholders for SITA GovSSO, Microsoft Entra ID (Azure AD), and Google Workspace integration.', badge: 'SSO READY' },
  { id: 10, title: 'WCAG AA Accessible Form Controls', ruleText: 'Features clear field validation, ARIA live region error announcements, keyboard focus traps, and high contrast.', badge: 'ACCESSIBLE' },
];
