export type SsoProtocol = 'oidc' | 'saml2' | 'oauth2';

export type SsoProviderType = 'entra_id' | 'google_workspace' | 'okta' | 'keycloak' | 'auth0' | 'simulator';

export type MfaMethod = 'totp' | 'email_otp' | 'sms_otp' | 'backup_codes';

export type UserLifecycleStatus = 'INVITED' | 'ACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'LOCKED';

export interface TenantConfig {
  id: string;
  name: string;
  type: 'school_district' | 'govt_department' | 'municipality' | 'security_firm' | 'transport_operator';
  domain: string;
  ssoProvider: SsoProviderType;
  ssoProtocol: SsoProtocol;
  clientId?: string;
  issuerUrl?: string;
  mfaEnforced: boolean;
  allowedIpRanges?: string[];
  userCount: number;
  status: 'CONNECTED' | 'PENDING_CERT' | 'OFFLINE';
}

export interface EnterpriseUser {
  id: string;
  tenantId: string;
  tenantName: string;
  email: string;
  fullName: string;
  role: 'NATIONAL_ADMIN' | 'PROVINCIAL_COMMAND' | 'SCHOOL_ADMIN' | 'SAPS_RESPONDER' | 'PARENT' | 'TEACHER';
  status: UserLifecycleStatus;
  mfaEnabled: boolean;
  mfaMethod?: MfaMethod;
  lastLoginAt: string;
  riskScore: number; // 0 (safe) to 100 (critical risk)
  department?: string;
  phone?: string;
}

export interface ActiveSession {
  sessionId: string;
  userId: string;
  userName: string;
  ipAddress: string;
  location: string;
  deviceFingerprint: string;
  browser: string;
  loginMethod: 'ENTRA_ID' | 'GOOGLE_SSO' | 'MFA_TOTP' | 'PASSKEY';
  issuedAt: string;
  expiresAt: string;
  isTrustedDevice: boolean;
  isCurrentSession?: boolean;
}

export interface PasswordPolicyConfig {
  minLength: number;
  requireUppercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  rotationDays: number;
  maxFailedAttempts: number;
  sessionTimeoutMinutes: number;
  lockoutDurationMinutes: number;
}

export interface SecurityEventLog {
  id: string;
  timestamp: string;
  userId?: string;
  email?: string;
  eventType: 'FAILED_LOGIN' | 'BRUTE_FORCE_DETECTED' | 'IMPOSSIBLE_TRAVEL' | 'CREDENTIAL_STUFFING' | 'MFA_BYPASS_ATTEMPT' | 'PRIVILEGE_ESCALATION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  ipAddress: string;
  location: string;
  actionTaken: string;
}

export interface IdentityCertificationReport {
  softwareCompletePct: number;
  checklist: {
    title: string;
    status: 'COMPLETE' | 'REQUIRES_TENANT' | 'REQUIRES_CERT' | 'PENDING';
    notes: string;
  }[];
}
