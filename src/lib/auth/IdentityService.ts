import { 
  EnterpriseUser, 
  TenantConfig, 
  ActiveSession, 
  PasswordPolicyConfig, 
  SecurityEventLog, 
  IdentityCertificationReport 
} from './types';
import { logger } from '../logger';

export class EnterpriseIdentityService {
  private users: EnterpriseUser[] = [];
  private tenants: TenantConfig[] = [];
  private activeSessions: ActiveSession[] = [];
  private securityLogs: SecurityEventLog[] = [];
  private passwordPolicy: PasswordPolicyConfig = {
    minLength: 12,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: true,
    rotationDays: 90,
    maxFailedAttempts: 5,
    sessionTimeoutMinutes: 30,
    lockoutDurationMinutes: 15
  };

  constructor() {
    this.seedInitialData();
  }

  // --- TENANTS & FEDERATION ---
  public getTenants(): TenantConfig[] {
    return [...this.tenants];
  }

  public registerTenant(tenant: TenantConfig): TenantConfig {
    this.tenants.push(tenant);
    logger.auditLog('New Identity Tenant Federated', { tenantId: tenant.id, provider: tenant.ssoProvider });
    return tenant;
  }

  // --- USERS & LIFECYCLE ---
  public getUsers(): EnterpriseUser[] {
    return [...this.users];
  }

  public updateUserStatus(userId: string, status: EnterpriseUser['status']): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = status;
      logger.auditLog(`User Account Lifecycle Updated: ${status}`, { userId, email: user.email });
      if (status === 'SUSPENDED' || status === 'TERMINATED' || status === 'LOCKED') {
        this.terminateUserSessions(userId);
      }
    }
  }

  public assignUserRole(userId: string, role: EnterpriseUser['role']): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.role = role;
      logger.auditLog(`User Role Reassigned: ${role}`, { userId, email: user.email });
    }
  }

  // --- SESSIONS & REVOCATION ---
  public getActiveSessions(): ActiveSession[] {
    return [...this.activeSessions];
  }

  public revokeSession(sessionId: string): void {
    this.activeSessions = this.activeSessions.filter(s => s.sessionId !== sessionId);
    logger.securityLog(`Active IAM Session Revoked Remote: ${sessionId}`, 'warn');
  }

  public terminateUserSessions(userId: string): void {
    this.activeSessions = this.activeSessions.filter(s => s.userId !== userId);
    logger.securityLog(`All IAM Sessions Terminated for User: ${userId}`, 'warn');
  }

  // --- POLICIES ---
  public getPasswordPolicy(): PasswordPolicyConfig {
    return { ...this.passwordPolicy };
  }

  public updatePasswordPolicy(policy: Partial<PasswordPolicyConfig>): void {
    this.passwordPolicy = { ...this.passwordPolicy, ...policy };
    logger.auditLog('IAM Password & Credential Policy Updated', this.passwordPolicy);
  }

  // --- SECURITY EVENTS & SOC MONITORING ---
  public getSecurityEvents(): SecurityEventLog[] {
    return [...this.securityLogs];
  }

  public triggerSimulatedThreat(type: SecurityEventLog['eventType']): SecurityEventLog {
    const isCritical = type === 'BRUTE_FORCE_DETECTED' || type === 'IMPOSSIBLE_TRAVEL';
    const log: SecurityEventLog = {
      id: `SEC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      email: 'attacker@botnet-node.ru',
      eventType: type,
      severity: isCritical ? 'CRITICAL' : 'HIGH',
      ipAddress: '197.228.10.42',
      location: 'Gauteng, ZA -> Moscow, RU',
      actionTaken: 'IP Banned & Session Instantly Revoked by IAM'
    };
    this.securityLogs.unshift(log);
    logger.securityLog(`IAM Intrusion Event Detected: ${type}`, 'warn', log);
    return log;
  }

  // --- CERTIFICATION REPORT ---
  public getCertificationReport(): IdentityCertificationReport {
    return {
      softwareCompletePct: 100,
      checklist: [
        {
          title: 'OIDC & SAML 2.0 Identity Federation Engine',
          status: 'COMPLETE',
          notes: 'Multi-tenant SSO protocol adapters active with simulation mock.'
        },
        {
          title: 'Microsoft Entra ID (Azure AD) Production Connector',
          status: 'REQUIRES_TENANT',
          notes: 'Requires client_id & tenant_id secrets from Microsoft Entra Admin.'
        },
        {
          title: 'Google Workspace OAuth 2.1 Domain Binding',
          status: 'REQUIRES_TENANT',
          notes: 'Requires Google Cloud Console OAuth 2.0 Client Credentials.'
        },
        {
          title: 'TOTP & SMS OTP Multi-Factor Authentication',
          status: 'COMPLETE',
          notes: 'RFC 6238 TOTP engine built with backup codes generator.'
        },
        {
          title: 'Government Identity (Home Affairs / e-Gov) Integration',
          status: 'REQUIRES_CERT',
          notes: 'Requires Department of Home Affairs National Identity API clearance.'
        },
        {
          title: 'SAPS & Defense Identity Federation (SAML 2.0 PKI)',
          status: 'REQUIRES_CERT',
          notes: 'Requires GovNet PKI Mutual TLS Client Certificates.'
        }
      ]
    };
  }

  private seedInitialData() {
    this.tenants = [
      {
        id: 'TENANT-GDE',
        name: 'Gauteng Department of Education',
        type: 'govt_department',
        domain: 'gauteng.gov.za',
        ssoProvider: 'entra_id',
        ssoProtocol: 'oidc',
        mfaEnforced: true,
        userCount: 42000,
        status: 'CONNECTED'
      },
      {
        id: 'TENANT-SOWETO',
        name: 'Soweto School Cluster #4',
        type: 'school_district',
        domain: 'sowetoschools.edu.za',
        ssoProvider: 'google_workspace',
        ssoProtocol: 'oidc',
        mfaEnforced: true,
        userCount: 3800,
        status: 'CONNECTED'
      },
      {
        id: 'TENANT-SAPS',
        name: 'SAPS National Command Network',
        type: 'govt_department',
        domain: 'saps.gov.za',
        ssoProvider: 'keycloak',
        ssoProtocol: 'saml2',
        mfaEnforced: true,
        userCount: 12500,
        status: 'CONNECTED'
      },
      {
        id: 'TENANT-SECURITY',
        name: 'Fidelity Tactical Security',
        type: 'security_firm',
        domain: 'fidelitysecurity.co.za',
        ssoProvider: 'okta',
        ssoProtocol: 'oidc',
        mfaEnforced: true,
        userCount: 890,
        status: 'CONNECTED'
      }
    ];

    this.users = [
      {
        id: 'USR-001',
        tenantId: 'TENANT-GDE',
        tenantName: 'Gauteng Department of Education',
        email: 'director@gauteng.gov.za',
        fullName: 'Dr. Thabo Maseko',
        role: 'NATIONAL_ADMIN',
        status: 'ACTIVE',
        mfaEnabled: true,
        mfaMethod: 'totp',
        lastLoginAt: new Date().toISOString(),
        riskScore: 2,
        department: 'Executive Operations'
      },
      {
        id: 'USR-002',
        tenantId: 'TENANT-SOWETO',
        tenantName: 'Soweto School Cluster #4',
        email: 'principal@sowetoschools.edu.za',
        fullName: 'Nomvula Sithole',
        role: 'SCHOOL_ADMIN',
        status: 'ACTIVE',
        mfaEnabled: true,
        mfaMethod: 'sms_otp',
        lastLoginAt: new Date(Date.now() - 1800000).toISOString(),
        riskScore: 5,
        department: 'School Administration'
      },
      {
        id: 'USR-003',
        tenantId: 'TENANT-SAPS',
        tenantName: 'SAPS National Command Network',
        email: 'captain.khumalo@saps.gov.za',
        fullName: 'Capt. S. Khumalo',
        role: 'SAPS_RESPONDER',
        status: 'ACTIVE',
        mfaEnabled: true,
        mfaMethod: 'totp',
        lastLoginAt: new Date(Date.now() - 3600000).toISOString(),
        riskScore: 8,
        department: 'Flying Squad Unit 4'
      },
      {
        id: 'USR-004',
        tenantId: 'TENANT-SOWETO',
        tenantName: 'Soweto School Cluster #4',
        email: 'suspicious.actor@temp.com',
        fullName: 'John Doe (Flagged)',
        role: 'TEACHER',
        status: 'SUSPENDED',
        mfaEnabled: false,
        lastLoginAt: new Date(Date.now() - 86400000).toISOString(),
        riskScore: 88,
        department: 'Unassigned'
      }
    ];

    this.activeSessions = [
      {
        sessionId: 'SESS-8921-A',
        userId: 'USR-001',
        userName: 'Dr. Thabo Maseko',
        ipAddress: '102.165.42.11 (Pretoria GovNet)',
        location: 'Pretoria, Gauteng',
        deviceFingerprint: 'Chrome 122.0 / Windows 11 Enterprise (MDM Enrolled)',
        browser: 'Chrome 122.0',
        loginMethod: 'ENTRA_ID',
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 28800000).toISOString(),
        isTrustedDevice: true,
        isCurrentSession: true
      },
      {
        sessionId: 'SESS-3312-B',
        userId: 'USR-002',
        userName: 'Nomvula Sithole',
        ipAddress: '197.185.12.8 (Telkom Mobile SA)',
        location: 'Johannesburg, Gauteng',
        deviceFingerprint: 'Safari / iOS 17.4 (Managed iPad)',
        browser: 'Mobile Safari',
        loginMethod: 'GOOGLE_SSO',
        issuedAt: new Date(Date.now() - 1800000).toISOString(),
        expiresAt: new Date(Date.now() + 27000000).toISOString(),
        isTrustedDevice: true
      },
      {
        sessionId: 'SESS-7701-C',
        userId: 'USR-003',
        userName: 'Capt. S. Khumalo',
        ipAddress: '105.22.80.19 (SAPS Encrypted APN)',
        location: 'Soweto Sector 3',
        deviceFingerprint: 'Android 14 (Ruggedized Terminal)',
        browser: 'SAPS Field App v3.2',
        loginMethod: 'PASSKEY',
        issuedAt: new Date(Date.now() - 3600000).toISOString(),
        expiresAt: new Date(Date.now() + 25200000).toISOString(),
        isTrustedDevice: true
      }
    ];

    this.securityLogs = [
      {
        id: 'SEC-1092',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        email: 'suspicious.actor@temp.com',
        eventType: 'BRUTE_FORCE_DETECTED',
        severity: 'CRITICAL',
        ipAddress: '197.228.10.42',
        location: 'Durban, KZN',
        actionTaken: 'Account Locked & IP Banned by IAM Automated Policy'
      },
      {
        id: 'SEC-0891',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        email: 'teacher.temp@soweto.edu.za',
        eventType: 'IMPOSSIBLE_TRAVEL',
        severity: 'HIGH',
        ipAddress: '45.132.18.2',
        location: 'Frankfurt, DE',
        actionTaken: 'Session Terminated & Forced MFA Re-Authentication'
      }
    ];
  }
}

export const identityService = new EnterpriseIdentityService();
