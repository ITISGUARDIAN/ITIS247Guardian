import { 
  SecurityPosture, 
  ThreatEvent, 
  ZeroTrustCheck, 
  ApiEndpointSecurity, 
  WearableDeviceSecurity, 
  OwaspMitigation 
} from '../types';

export const fontPosture: SecurityPosture = {
  overallScore: 98,
  zeroTrustScore: 99,
  apiSecurityScore: 97,
  ioTSecurityScore: 96,
  databaseSecurityScore: 100,
  fileStorageScore: 98,
  activeThreatsCount: 0,
  certificatesValidCount: 142,
  certificatesTotal: 142,
  failedLogins24h: 3,
  rbacViolations24h: 0,
};

export const initialThreatEvents: ThreatEvent[] = [
  {
    id: 'EVT-10941',
    timestamp: '2026-07-26T00:51:20Z',
    category: 'Zero Trust',
    severity: 'low',
    sourceIp: '192.168.10.45',
    tenantId: 'TNT-UK-NATIONAL-01',
    userEmail: 'gateway-eu-01@node.itis.gov',
    action: 'mTLS Client Certificate Revocation Check (CRL)',
    status: 'monitored',
    details: 'Automated CRL OCSP stapling validation passed for wearable gateway node.'
  },
  {
    id: 'EVT-10940',
    timestamp: '2026-07-26T00:44:12Z',
    category: 'API Security',
    severity: 'medium',
    sourceIp: '10.240.0.88',
    tenantId: 'TNT-MET-POLICE-04',
    userEmail: 'api-service-account@met.police.uk',
    action: 'Token Bucket Rate Limit Throttled',
    status: 'blocked',
    details: 'Excessive requests (180 req/min) on /api/v1/telemetry throttled at ingress envoy edge proxy.'
  },
  {
    id: 'EVT-10939',
    timestamp: '2026-07-26T00:32:05Z',
    category: 'IoT Security',
    severity: 'high',
    sourceIp: '172.16.4.12',
    tenantId: 'TNT-LONDON-AMB-02',
    userEmail: 'wearable-unit-8842@itis.iot',
    action: 'Firmware Signature Verification Failed',
    status: 'blocked',
    details: 'Wearable ID-8842 rejected OTA update due to non-matching ECDSA P-256 vendor signature.'
  },
  {
    id: 'EVT-10938',
    timestamp: '2026-07-26T00:15:30Z',
    category: 'Authentication',
    severity: 'medium',
    sourceIp: '198.51.100.24',
    tenantId: 'TNT-UK-NATIONAL-01',
    userEmail: 'secadmin-invalid@itis.gov.uk',
    action: 'Failed Login Attempt (Invalid Password)',
    status: 'blocked',
    details: 'Consecutive failed login attempt recorded. IP temporary jail penalty applied.'
  },
  {
    id: 'EVT-10937',
    timestamp: '2026-07-25T23:55:18Z',
    category: 'Database',
    severity: 'low',
    sourceIp: '10.0.4.12',
    tenantId: 'TNT-UK-NATIONAL-01',
    userEmail: 'prisma-worker@internal.cluster',
    action: 'Prepared Statement SQL Injection Defense Check',
    status: 'monitored',
    details: 'Prisma query engine verified 0 unparameterized SQL operations across all active DB workers.'
  },
  {
    id: 'EVT-10936',
    timestamp: '2026-07-25T23:20:00Z',
    category: 'File Storage',
    severity: 'low',
    sourceIp: '10.240.12.9',
    tenantId: 'TNT-GREATER-MANCHESTER-03',
    userEmail: 'evidence-collector@gmp.gov.uk',
    action: 'SHA-256 Checksum & Virus Scan Verification',
    status: 'monitored',
    details: 'Evidence PDF upload checksum validated; ClamAV virus scan placeholder returned clean pass.'
  }
];

export const zeroTrustChecks: ZeroTrustCheck[] = [
  {
    id: 'ZT-01',
    component: 'JWT Verification Engine',
    mechanism: 'RS256 Public Key Verification with JTI revocation check',
    status: 'VERIFIED',
    lastValidated: '2026-07-26 00:50:00',
    complianceRule: 'NIST SP 800-207 Zero Trust Architecture'
  },
  {
    id: 'ZT-02',
    component: 'RBAC Authorization Middleware',
    mechanism: 'Fine-grained Role-Permission matrix bound to Tenant-ID context',
    status: 'VERIFIED',
    lastValidated: '2026-07-26 00:50:00',
    complianceRule: 'ISO/IEC 27001 Control A.9.4.1'
  },
  {
    id: 'ZT-03',
    component: 'Multi-Tenant Isolation',
    mechanism: 'Row-Level Security (RLS) & Prisma schema tenant filter injection',
    status: 'HARDENED',
    lastValidated: '2026-07-26 00:48:15',
    complianceRule: 'SOC 2 Type II Privacy & Isolation'
  },
  {
    id: 'ZT-04',
    component: 'WebSocket & SSE Authorization',
    mechanism: 'One-time Ticket Exchange with TLS 1.3 socket binding',
    status: 'VERIFIED',
    lastValidated: '2026-07-26 00:45:00',
    complianceRule: 'RFC 6455 WebSocket Protocol Security'
  },
  {
    id: 'ZT-05',
    component: 'mTLS Client Device Certificates',
    mechanism: 'Hardware Secure Element X.509 cert validation via OCSP',
    status: 'VERIFIED',
    lastValidated: '2026-07-26 00:51:20',
    complianceRule: 'FIPS 140-3 Hardware Authentication'
  },
  {
    id: 'ZT-06',
    component: 'Session Lifetime & Revocation',
    mechanism: 'Redis token blacklist with force-invalidation on role shift',
    status: 'VERIFIED',
    lastValidated: '2026-07-26 00:52:10',
    complianceRule: 'NIST SP 800-63B Digital Identity Guidelines'
  }
];

export const apiEndpointsSecurity: ApiEndpointSecurity[] = [
  {
    path: '/api/v1/auth/login',
    method: 'POST',
    authType: 'HMAC Signature',
    rbacRoleRequired: 'Public / Guest',
    rateLimit: '10 req/min (Brute-force jail)',
    schemaValidation: true,
    sanitizationStatus: 'ACTIVE'
  },
  {
    path: '/api/v1/telemetry/stream',
    method: 'POST',
    authType: 'mTLS Certificate',
    rbacRoleRequired: 'Wearable Unit',
    rateLimit: '120 req/min',
    schemaValidation: true,
    sanitizationStatus: 'ACTIVE'
  },
  {
    path: '/api/v1/incidents/sos',
    method: 'POST',
    authType: 'JWT RS256',
    rbacRoleRequired: 'Responder / First Responder',
    rateLimit: '300 req/min (High Priority Priority Queue)',
    schemaValidation: true,
    sanitizationStatus: 'ACTIVE'
  },
  {
    path: '/api/v1/admin/users',
    method: 'GET',
    authType: 'JWT RS256',
    rbacRoleRequired: 'System Administrator',
    rateLimit: '30 req/min',
    schemaValidation: true,
    sanitizationStatus: 'ACTIVE'
  },
  {
    path: '/api/v1/evidence/upload',
    method: 'POST',
    authType: 'JWT RS256',
    rbacRoleRequired: 'Evidence Auditor',
    rateLimit: '20 req/min (100MB max payload)',
    schemaValidation: true,
    sanitizationStatus: 'ACTIVE'
  }
];

export const wearableDevicesSecurity: WearableDeviceSecurity[] = [
  {
    deviceId: 'ITIS-DEV-8842',
    model: 'ITIS-Band-Pro',
    mTLSCertStatus: 'Valid',
    firmwareVersion: 'v2.4.1-signed',
    signatureStatus: 'Verified (ECDSA P-256)',
    sosIntegrity: 'Cryptographically Signed',
    tamperState: 'Secure',
    lastHeartbeat: '2 seconds ago'
  },
  {
    deviceId: 'ITIS-DEV-9012',
    model: 'ITIS-Vest-V2',
    mTLSCertStatus: 'Valid',
    firmwareVersion: 'v2.4.1-signed',
    signatureStatus: 'Verified (ECDSA P-256)',
    sosIntegrity: 'Cryptographically Signed',
    tamperState: 'Secure',
    lastHeartbeat: '5 seconds ago'
  },
  {
    deviceId: 'ITIS-DEV-7104',
    model: 'ITIS-Guardian-Pod',
    mTLSCertStatus: 'Valid',
    firmwareVersion: 'v2.4.0-signed',
    signatureStatus: 'Verified (ECDSA P-256)',
    sosIntegrity: 'Cryptographically Signed',
    tamperState: 'Secure',
    lastHeartbeat: '12 seconds ago'
  },
  {
    deviceId: 'ITIS-DEV-3301',
    model: 'ITIS-Band-Pro',
    mTLSCertStatus: 'Expiring',
    firmwareVersion: 'v2.4.1-signed',
    signatureStatus: 'Verified (ECDSA P-256)',
    sosIntegrity: 'Cryptographically Signed',
    tamperState: 'Secure',
    lastHeartbeat: '1 minute ago'
  }
];

export const owaspMitigations: OwaspMitigation[] = [
  {
    code: 'API1:2023',
    title: 'Broken Object Level Authorization (BOLA)',
    category: 'OWASP API Top 10',
    status: 'MITIGATED',
    implementationDetails: 'Strict tenant context check on every database model query combined with user UUID ownership verification.',
    testVectorStatus: 'Passed Automated Probe'
  },
  {
    code: 'API2:2023',
    title: 'Broken Authentication',
    category: 'OWASP API Top 10',
    status: 'MITIGATED',
    implementationDetails: 'Mandatory Argon2id password hashing, enforced 2FA on admin roles, and JWT rotation with sliding sessions.',
    testVectorStatus: 'Passed Automated Probe'
  },
  {
    code: 'API3:2023',
    title: 'Broken Object Property Level Authorization',
    category: 'OWASP API Top 10',
    status: 'MITIGATED',
    implementationDetails: 'DTO schema validation stripping unpermitted fields prior to controller execution.',
    testVectorStatus: 'Passed Automated Probe'
  },
  {
    code: 'API4:2023',
    title: 'Unrestricted Resource Consumption (Rate Limiting)',
    category: 'OWASP API Top 10',
    status: 'MITIGATED',
    implementationDetails: 'Leaky bucket ingress rate limiters enforced at API Gateway with tiered IP/user limits.',
    testVectorStatus: 'Passed Automated Probe'
  },
  {
    code: 'API8:2023',
    title: 'Security Misconfiguration & Header Defenses',
    category: 'OWASP API Top 10',
    status: 'MITIGATED',
    implementationDetails: 'Strict Content-Security-Policy (CSP), HSTS, X-Content-Type-Options, and CORS origins configured.',
    testVectorStatus: 'Passed Automated Probe'
  },
  {
    code: 'A03:2021',
    title: 'Injection (SQLi / Command / XSS)',
    category: 'OWASP Web Top 10',
    status: 'MITIGATED',
    implementationDetails: '100% Prisma ORM parameterized queries with DOMPurify sanitization on rendered strings.',
    testVectorStatus: 'Passed Automated Probe'
  },
  {
    code: 'A05:2021',
    title: 'Security Misconfiguration (CSRF & SSRF)',
    category: 'OWASP Web Top 10',
    status: 'MITIGATED',
    implementationDetails: 'SameSite=Strict cookie flags with strict URL whitelist checking for outbound webhooks.',
    testVectorStatus: 'Passed Automated Probe'
  },
  {
    code: 'A01:2021',
    title: 'Broken Access Control & Escalation',
    category: 'OWASP Web Top 10',
    status: 'MITIGATED',
    implementationDetails: 'Immutable server-side RBAC token verification prohibiting privilege parameter tampering.',
    testVectorStatus: 'Passed Automated Probe'
  }
];
