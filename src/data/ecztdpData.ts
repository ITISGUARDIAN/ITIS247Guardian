export interface ZeroTrustDevicePosture {
  deviceId: string; // e.g. WRB-V4-9910 or C3-WRK-04
  entityType: 'WEARABLE_IOT' | 'RESPONDER_HANDSET' | 'TECHS_HANDSET' | 'C3_WORKSTATION' | 'SERVER_NODE';
  trustScore: number; // 0-100
  postureStatus: 'TRUSTED' | 'ELEVATED_RISK' | 'ISOLATED_QUARANTINE';
  mTLSValid: boolean;
  biometricAttested: boolean;
  jailbreakRootStatus: 'CLEAN' | 'ROOTED_DETECTED';
  ipAddress: string;
  lastVerified: string;
}

export interface CertificateRecord {
  id: string; // e.g. CERT-X509-ROOT-01
  commonName: string;
  caType: 'ROOT_CA' | 'INTERMEDIATE_CA' | 'DEVICE_CLIENT_CERT' | 'API_SERVER_CERT';
  serialNumber: string;
  issuer: string;
  validUntil: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRING_SOON';
  keyType: 'RSA_4096' | 'ECDSA_P256';
  ocspStatus: 'GOOD' | 'REVOKED' | 'UNKNOWN';
}

export interface SecuritySecret {
  id: string; // e.g. SEC-JWT-HS512-KEY
  secretType: 'JWT_SIGNING_KEY' | 'AES_256_MASTER_KEY' | 'DATABASE_CREDENTIAL' | 'MTLS_PRIVATE_KEY';
  version: number;
  lastRotated: string;
  rotationPolicyDays: number;
  accessCount24h: number;
  status: 'ACTIVE' | 'ROTATION_PENDING';
}

export interface WafBlockEvent {
  id: string;
  timestamp: string;
  ipAddress: string;
  sourceGeo: string;
  attackVector: 'SQLI_ATTEMPT' | 'XSS_INJECTION' | 'CREDENTIAL_STUFFING' | 'REPLAY_ATTACK';
  targetEndpoint: string;
  actionTaken: 'BLOCKED_403' | 'RATE_LIMITED' | 'CHALLENGE_ISSUED';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export interface SocIncident {
  id: string; // e.g. SOC-INC-2026-9901
  title: string;
  threatCategory: 'UNAUTHORIZED_PII_ACCESS_ATTEMPT' | 'BRUTE_FORCE_IAM' | 'ANOMALOUS_TELEMETRY_INJECTION' | 'CERT_SPOOFING';
  severity: 'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM';
  mitreTechnique: string; // e.g. T1078 Valid Accounts
  status: 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED';
  mttdSeconds: number; // Mean Time to Detect
  mttrSeconds: number; // Mean Time to Respond
  assignedAnalyst: string;
}

export interface EcztdpCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Zero Trust Guard' | 'WAF & Rate Limiter' | 'AES-256 Envelope Encryption';
  description: string;
  code: string;
}

// SAMPLE ZERO TRUST POSITURES
export const SAMPLE_ZERO_TRUST_DEVICES: ZeroTrustDevicePosture[] = [
  {
    deviceId: 'WRB-V4-864209051820495',
    entityType: 'WEARABLE_IOT',
    trustScore: 98,
    postureStatus: 'TRUSTED',
    mTLSValid: true,
    biometricAttested: true,
    jailbreakRootStatus: 'CLEAN',
    ipAddress: '102.130.44.12 (MTN APN)',
    lastVerified: '5 seconds ago',
  },
  {
    deviceId: 'HANDSET-TACTICAL-SAPS-01',
    entityType: 'RESPONDER_HANDSET',
    trustScore: 95,
    postureStatus: 'TRUSTED',
    mTLSValid: true,
    biometricAttested: true,
    jailbreakRootStatus: 'CLEAN',
    ipAddress: '197.245.10.88 (SAPS APN)',
    lastVerified: '12 seconds ago',
  },
  {
    deviceId: 'C3-WORKSTATION-OP-04',
    entityType: 'C3_WORKSTATION',
    trustScore: 99,
    postureStatus: 'TRUSTED',
    mTLSValid: true,
    biometricAttested: true,
    jailbreakRootStatus: 'CLEAN',
    ipAddress: '10.200.4.15 (GDE Secure LAN)',
    lastVerified: '1 second ago',
  },
  {
    deviceId: 'UNKNOWN-API-CLIENT-990',
    entityType: 'SERVER_NODE',
    trustScore: 22,
    postureStatus: 'ISOLATED_QUARANTINE',
    mTLSValid: false,
    biometricAttested: false,
    jailbreakRootStatus: 'ROOTED_DETECTED',
    ipAddress: '45.142.120.9 (Suspicious Proxy)',
    lastVerified: 'Just now',
  },
];

// SAMPLE CERTIFICATES
export const SAMPLE_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'CERT-RSA-ROOT-ZA01',
    commonName: 'ITIS National Root CA (RSA 4096)',
    caType: 'ROOT_CA',
    serialNumber: '4091A82049182049182',
    issuer: 'South African Cyber Security Authority',
    validUntil: '2036-12-31',
    status: 'ACTIVE',
    keyType: 'RSA_4096',
    ocspStatus: 'GOOD',
  },
  {
    id: 'CERT-ECDSA-DEVICE-SUB',
    commonName: 'ITIS Wearable IoT Device CA (P-256)',
    caType: 'INTERMEDIATE_CA',
    serialNumber: '9901B4129481029412',
    issuer: 'ITIS National Root CA',
    validUntil: '2028-06-30',
    status: 'ACTIVE',
    keyType: 'ECDSA_P256',
    ocspStatus: 'GOOD',
  },
  {
    id: 'CERT-CLIENT-TECH-4091',
    commonName: 'Technician Client mTLS Badge #TECH-4091',
    caType: 'DEVICE_CLIENT_CERT',
    serialNumber: '1102C8294019284019',
    issuer: 'ITIS Wearable IoT Device CA',
    validUntil: '2027-01-15',
    status: 'ACTIVE',
    keyType: 'ECDSA_P256',
    ocspStatus: 'GOOD',
  },
];

// SAMPLE SECRETS
export const SAMPLE_SECRETS: SecuritySecret[] = [
  {
    id: 'SEC-JWT-HS512-MASTER',
    secretType: 'JWT_SIGNING_KEY',
    version: 4,
    lastRotated: '3 days ago',
    rotationPolicyDays: 30,
    accessCount24h: 184920,
    status: 'ACTIVE',
  },
  {
    id: 'SEC-AES-256-PII-MASTER',
    secretType: 'AES_256_MASTER_KEY',
    version: 12,
    lastRotated: '1 day ago',
    rotationPolicyDays: 14,
    accessCount24h: 94210,
    status: 'ACTIVE',
  },
  {
    id: 'SEC-DB-PG-MASTER-PASS',
    secretType: 'DATABASE_CREDENTIAL',
    version: 8,
    lastRotated: '12 hours ago',
    rotationPolicyDays: 7,
    accessCount24h: 520190,
    status: 'ACTIVE',
  },
];

// SAMPLE WAF EVENTS
export const SAMPLE_WAF_BLOCKS: WafBlockEvent[] = [
  {
    id: 'WAF-EV-9901',
    timestamp: '10:14:02 AM',
    ipAddress: '185.220.101.5',
    sourceGeo: 'External Tor Exit Node',
    attackVector: 'SQLI_ATTEMPT',
    targetEndpoint: '/api/v1/learners/search?query=SELECT*',
    actionTaken: 'BLOCKED_403',
    severity: 'CRITICAL',
  },
  {
    id: 'WAF-EV-9902',
    timestamp: '10:12:45 AM',
    ipAddress: '45.142.120.9',
    sourceGeo: 'Anonymized Proxy',
    attackVector: 'REPLAY_ATTACK',
    targetEndpoint: '/api/v1/telemetry/ingest',
    actionTaken: 'RATE_LIMITED',
    severity: 'HIGH',
  },
];

// SAMPLE SOC INCIDENTS
export const SAMPLE_SOC_INCIDENTS: SocIncident[] = [
  {
    id: 'SOC-INC-2026-9901',
    title: 'Anomalous Location Telemetry Payload Injection Detected',
    threatCategory: 'ANOMALOUS_TELEMETRY_INJECTION',
    severity: 'P1_CRITICAL',
    mitreTechnique: 'T1059 Command and Scripting Interpreter',
    status: 'INVESTIGATING',
    mttdSeconds: 1.2,
    mttrSeconds: 4.5,
    assignedAnalyst: 'Security Officer Sipho Dlamini',
  },
  {
    id: 'SOC-INC-2026-9902',
    title: 'Multiple Failed mTLS Handshakes from Unregistered IP Range',
    threatCategory: 'CERT_SPOOFING',
    severity: 'P2_HIGH',
    mitreTechnique: 'T1556 Modify Authentication Process',
    status: 'CONTAINED',
    mttdSeconds: 0.8,
    mttrSeconds: 2.1,
    assignedAnalyst: 'Automated EDR Bot Agent',
  },
];

// CODE SPECS
export const ECZTDP_CODE_SPECS: EcztdpCodeSpec[] = [
  {
    id: 1,
    title: 'NIST SP 800-207 Zero Trust Continuous Evaluation Guard',
    filename: 'src/modules/security/guards/zero_trust.guard.ts',
    category: 'Zero Trust Guard',
    description: 'Evaluates real-time device posture, mTLS certificate validity, biometric attestation, and IP reputation before granting API route access.',
    code: `import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ZeroTrustGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const clientCert = req.socket.getPeerCertificate();
    const trustScore = req.headers['x-trust-score'];

    // 1. Verify mTLS Client Certificate Signature
    if (!clientCert || !clientCert.raw) {
      throw new ForbiddenException('ZERO TRUST FAILURE: Missing mTLS X.509 Client Certificate');
    }

    // 2. Evaluate Dynamic Trust Score (Threshold > 80/100)
    if (parseInt(trustScore || '0', 10) < 80) {
      throw new ForbiddenException('ZERO TRUST FAILURE: Device posture trust score below threshold');
    }

    return true;
  }
}`
  },
  {
    id: 2,
    title: 'WAF & OWASP API Security Middleware',
    filename: 'src/modules/security/middleware/waf_protection.middleware.ts',
    category: 'WAF & Rate Limiter',
    description: 'Intercepts incoming requests to block SQL Injection, XSS, Path Traversal, and Replay Attacks before reaching NestJS controllers.',
    code: `import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class WafProtectionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const rawQuery = JSON.stringify(req.query) + JSON.stringify(req.body);

    // OWASP SQLi Detection Pattern
    const sqliPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b|--|;)/i;
    if (sqliPattern.test(rawQuery)) {
      return res.status(403).json({
        statusCode: 403,
        error: 'WAF_BLOCK',
        message: 'SQL Injection pattern detected and blocked by WAF Engine',
      });
    }

    next();
  }
}`
  },
  {
    id: 3,
    title: 'AES-256-GCM Envelope Encryption for PII Data',
    filename: 'src/modules/security/crypto/envelope_encryption.service.ts',
    category: 'AES-256 Envelope Encryption',
    description: 'Encrypts child PII data using AES-256-GCM with dynamic Data Encryption Keys (DEK) wrapped by a Master Key (KEK).',
    code: `import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EnvelopeEncryptionService {
  encryptField(plaintext: string, dekKey: Buffer): { ciphertext: string; iv: string; authTag: string } {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', dekKey, iv);

    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      ciphertext: encrypted,
      iv: iv.toString('hex'),
      authTag: cipher.getAuthTag().toString('hex'),
    };
  }
}`
  }
];

// MANDATORY RULES
export const CRITICAL_ECZTDP_RULES = [
  { id: 1, title: 'NIST SP 800-207 Zero Trust Rule', ruleText: 'Never Trust, Always Verify. Every request from user, device, or service must be authenticated and authorized continuously.', badge: 'ZERO TRUST' },
  { id: 2, title: 'Sub-1.5s SOC Threat Detection & Alerting', ruleText: 'Anomalous payloads or unauthorized PII access attempts trigger SOC alerts and EDR containment in <1.5s.', badge: '<1.5s SOC' },
  { id: 3, title: 'POPIA & ISO 27001 Cryptographic Safeguards', ruleText: 'Learner PII is encrypted at rest via AES-256-GCM envelope encryption and in transit via TLS 1.3 mTLS.', badge: 'AES-256 / mTLS' },
  { id: 4, title: 'WAF OWASP Top 10 Active Interception', ruleText: 'All public endpoints filter SQL Injection, XSS, and Replay attacks, returning HTTP 403 instantly.', badge: 'WAF OWASP' },
  { id: 5, title: 'X.509 PKI Automated Certificate Lifecycle', ruleText: 'Client and API certificates rotate automatically prior to expiry, with CRL & OCSP revocation checks.', badge: 'X.509 PKI' },
  { id: 6, title: 'Automated EDR Device Quarantine', ruleText: 'Devices detected with root/jailbreak or tampered firmware are isolated instantly without disrupting child emergency SOS.', badge: 'EDR ISOLATE' },
  { id: 7, title: 'Centralized Secrets Rotation & HSM Isolation', ruleText: 'JWT signing keys and DB credentials rotate automatically according to policy in HSM-grade key vaults.', badge: 'SECRETS ROTATE' },
  { id: 8, title: 'MITRE ATT&CK Ingestion & SIEM Correlation', ruleText: 'Security events are mapped to MITRE ATT&CK matrices and correlated in real time to prevent lateral threat movement.', badge: 'MITRE SIEM' },
  { id: 9, title: 'Immutable SHA-256 Security Audit Logging', ruleText: 'Every security event, containment action, and key access is cryptographically logged and non-repudiable.', badge: 'SHA-256 LOG' },
  { id: 10, title: 'Core Mission: Protect Child Data & Platform Safety', ruleText: 'Cybersecurity shields South Africa child protection infrastructure against state-level and rogue cyber threats.', badge: 'CHILDSAFE SEC' },
];
