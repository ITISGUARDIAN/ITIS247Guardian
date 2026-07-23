export interface GovernmentTenant {
  id: string; // e.g. TENANT-ZA-DBE-NAT
  name: string;
  level: 'NATIONAL_GOVT' | 'PROVINCIAL_DEPT' | 'MUNICIPALITY' | 'ENTERPRISE_PARTNER';
  jurisdictionRegion: string; // e.g. "Republic of South Africa" or "Gauteng Province"
  activeLearnersProtected: number;
  registeredSchoolsCount: number;
  connectedAgenciesCount: number;
  complianceScorePct: number; // e.g. 99.8%
  popiaAuditStatus: 'FULLY_COMPLIANT' | 'AUDIT_PENDING' | 'REMEDIATION_REQUIRED';
  allocatedBudgetZar: string;
  dataSovereigntyZone: 'ZA_CENTRAL_JHB_CLOUD' | 'ZA_SOUTH_CPT_CLOUD';
  status: 'ACTIVE' | 'SUSPENDED' | 'PROVISIONING';
}

export interface TenantPolicyRule {
  id: string;
  ruleCategory: 'POPIA_DATA_PRIVACY' | 'CROSS_TENANT_ISOLATION' | 'ENCRYPTION_AT_REST' | 'DATA_RETENTION';
  description: string;
  enforcementMode: 'STRICT_BLOCK' | 'AUDIT_ONLY';
  lastEvaluated: string;
  passedCount: number;
}

export interface NamgpCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'NestJS Multi-Tenancy Guard' | 'POPIA Data Sovereignty Enforcer' | 'Cross-Tenant RBAC Security';
  description: string;
  code: string;
}

// SAMPLE TENANTS
export const SAMPLE_GOVT_TENANTS: GovernmentTenant[] = [
  {
    id: 'TENANT-ZA-DBE-NAT',
    name: 'National Department of Basic Education (DBE - RSA)',
    level: 'NATIONAL_GOVT',
    jurisdictionRegion: 'Republic of South Africa (National)',
    activeLearnersProtected: 12450000,
    registeredSchoolsCount: 24890,
    connectedAgenciesCount: 142,
    complianceScorePct: 100.0,
    popiaAuditStatus: 'FULLY_COMPLIANT',
    allocatedBudgetZar: 'R 1.25 Billion',
    dataSovereigntyZone: 'ZA_CENTRAL_JHB_CLOUD',
    status: 'ACTIVE',
  },
  {
    id: 'TENANT-GP-GDE-PROV',
    name: 'Gauteng Department of Education (GDE)',
    level: 'PROVINCIAL_DEPT',
    jurisdictionRegion: 'Gauteng Province (Johannesburg, Tshwane, Ekurhuleni)',
    activeLearnersProtected: 2150000,
    registeredSchoolsCount: 2210,
    connectedAgenciesCount: 38,
    complianceScorePct: 99.8,
    popiaAuditStatus: 'FULLY_COMPLIANT',
    allocatedBudgetZar: 'R 340 Million',
    dataSovereigntyZone: 'ZA_CENTRAL_JHB_CLOUD',
    status: 'ACTIVE',
  },
  {
    id: 'TENANT-KZN-KZNDE-PROV',
    name: 'KwaZulu-Natal Department of Education (KZNDE)',
    level: 'PROVINCIAL_DEPT',
    jurisdictionRegion: 'KwaZulu-Natal Province (eThekwini, uMgungundlovu)',
    activeLearnersProtected: 2800000,
    registeredSchoolsCount: 5800,
    connectedAgenciesCount: 42,
    complianceScorePct: 99.5,
    popiaAuditStatus: 'FULLY_COMPLIANT',
    allocatedBudgetZar: 'R 290 Million',
    dataSovereigntyZone: 'ZA_SOUTH_CPT_CLOUD',
    status: 'ACTIVE',
  },
  {
    id: 'TENANT-WC-WCED-PROV',
    name: 'Western Cape Education Department (WCED)',
    level: 'PROVINCIAL_DEPT',
    jurisdictionRegion: 'Western Cape Province (City of Cape Town, Winelands)',
    activeLearnersProtected: 1100000,
    registeredSchoolsCount: 1520,
    connectedAgenciesCount: 24,
    complianceScorePct: 100.0,
    popiaAuditStatus: 'FULLY_COMPLIANT',
    allocatedBudgetZar: 'R 180 Million',
    dataSovereigntyZone: 'ZA_SOUTH_CPT_CLOUD',
    status: 'ACTIVE',
  },
  {
    id: 'TENANT-JHB-COJ-MUN',
    name: 'City of Johannesburg Metropolitan Municipality (JMPD Safety)',
    level: 'MUNICIPALITY',
    jurisdictionRegion: 'City of Johannesburg Metro',
    activeLearnersProtected: 850000,
    registeredSchoolsCount: 940,
    connectedAgenciesCount: 12,
    complianceScorePct: 99.2,
    popiaAuditStatus: 'FULLY_COMPLIANT',
    allocatedBudgetZar: 'R 65 Million',
    dataSovereigntyZone: 'ZA_CENTRAL_JHB_CLOUD',
    status: 'ACTIVE',
  },
];

// TENANT POLICY RULES
export const SAMPLE_POLICY_RULES: TenantPolicyRule[] = [
  {
    id: 'POL-POPIA-01',
    ruleCategory: 'POPIA_DATA_PRIVACY',
    description: 'Guarantees child biometric & PII data is never leaked cross-tenant or exposed without explicit legal emergency authorization.',
    enforcementMode: 'STRICT_BLOCK',
    lastEvaluated: '10 mins ago',
    passedCount: 1420910,
  },
  {
    id: 'POL-SOVEREIGNTY-02',
    ruleCategory: 'CROSS_TENANT_ISOLATION',
    description: 'Enforces PostgreSQL Row Level Security (RLS) and Firestore tenant_id isolation for every database query.',
    enforcementMode: 'STRICT_BLOCK',
    lastEvaluated: '2 mins ago',
    passedCount: 8940210,
  },
  {
    id: 'POL-RETENTION-03',
    ruleCategory: 'DATA_RETENTION',
    description: 'Purges unflagged location telemetry logs older than 90 days per POPIA Section 14 statutory guidelines.',
    enforcementMode: 'STRICT_BLOCK',
    lastEvaluated: '1 hour ago',
    passedCount: 520491,
  },
];

// CODE SPECS
export const NAMGP_CODE_SPECS: NamgpCodeSpec[] = [
  {
    id: 1,
    title: 'NestJS Multi-Tenant Context Guard & RLS Isolator',
    filename: 'src/modules/governance/guards/tenant_context.guard.ts',
    category: 'NestJS Multi-Tenancy Guard',
    description: 'Extracts tenant_id from JWT claims, validates government administrative rights, and sets PostgreSQL Row Level Security context for every database query.',
    code: `import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class MultiTenantContextGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.tenantId) {
      throw new UnauthorizedException('MISSING_GOVERNMENT_TENANT_CLAIM');
    }

    // Attach tenant context to request for ORM RLS binding
    request.tenantContext = {
      tenantId: user.tenantId,
      governanceRole: user.role, // e.g. NATIONAL_SUPER_ADMIN, PROVINCIAL_AUDITOR
      jurisdiction: user.jurisdiction,
    };

    return true;
  }
}`
  },
  {
    id: 2,
    title: 'POPIA Data Sovereignty & Geographic Storage Router',
    filename: 'src/modules/governance/services/sovereignty_router.service.ts',
    category: 'POPIA Data Sovereignty Enforcer',
    description: 'Ensures data generated by provincial learners remains anchored in South African data centres (Johannesburg/Cape Town) with TLS 1.3 mTLS encryption.',
    code: `import { Injectable } from '@nestjs/common';

@Injectable()
export class DataSovereigntyService {
  validateDataSovereigntyZone(tenantRegion: string): string {
    const validRegions = ['ZA_CENTRAL_JHB_CLOUD', 'ZA_SOUTH_CPT_CLOUD'];

    if (!validRegions.includes(tenantRegion)) {
      throw new Error('CRITICAL POPIA VIOLATION: Cross-border cloud data routing strictly prohibited');
    }

    return \`Routing telemetry to in-country sovereign cluster: \${tenantRegion}\`;
  }
}`
  },
  {
    id: 3,
    title: 'Government Auditor Immutable Event Logger',
    filename: 'src/modules/governance/logging/popia_audit.logger.ts',
    category: 'Cross-Tenant RBAC Security',
    description: 'Creates tamper-proof cryptographic audit logs for every national and provincial administrative action.',
    code: `import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PopiaAuditLogger {
  async logGovernanceAction(adminId: string, tenantId: string, action: string) {
    const timestamp = new Date().toISOString();
    const rawEntry = \`\${timestamp}|\${adminId}|\${tenantId}|\${action}\`;
    const hash = crypto.createHash('sha256').update(rawEntry).digest('hex');

    // Persist immutable audit log record
    return {
      timestamp,
      adminId,
      tenantId,
      action,
      sha256Signature: hash,
    };
  }
}`
  }
];

// MANDATORY NAMGP RULES
export const CRITICAL_NAMGP_RULES = [
  { id: 1, title: 'Absolute Multi-Tenancy RLS Data Isolation', ruleText: 'Strict database Row-Level Security (RLS) ensures no provincial or municipal tenant can access another tenant data.', badge: 'RLS ISOLATED' },
  { id: 2, title: '100% In-Country POPIA Data Sovereignty', ruleText: 'All learner PII, telemetry, and emergency logs are stored exclusively in South African cloud regions (JHB/CPT).', badge: '100% IN-COUNTRY' },
  { id: 3, title: 'National & Provincial Hierarchical Governance', ruleText: 'National DBE holds overall platform governance while Provincial Departments manage regional school quotas.', badge: 'HIERARCHICAL' },
  { id: 4, title: 'POPIA Section 18 Automated Compliance Auditing', ruleText: 'All administrative accesses to child records are cryptographically logged with mandatory justification tags.', badge: 'POPIA SEC 18' },
  { id: 5, title: 'Dynamic Feature Flagging per Jurisdiction', ruleText: 'Provinces can toggle specific regional features (e.g. Metro Police integration, custom school buses) independently.', badge: 'FEATURE FLAGS' },
  { id: 6, title: 'Zero Operational Monitoring in Governance View', ruleText: 'NAMGP focuses strictly on platform policy, SLAs, licensing, and compliance — leaving active incident handling to C3.', badge: 'GOVERNANCE ONLY' },
  { id: 7, title: 'ISO 27001 & SOC 2 Type II Compliance Oversight', ruleText: 'Automated continuous evaluation of security controls, certificate validity, and system uptime across all tenants.', badge: 'ISO 27001 / SOC2' },
  { id: 8, title: 'Tenant Licensing & Emergency Quota Allocation', ruleText: 'Manages allocation of wearable device quotas, network bandwidth, and SMS gateway allocations per municipality.', badge: 'QUOTA MANAGEMENT' },
  { id: 9, title: 'mTLS & Certificate Authority (CA) Root Governance', ruleText: 'Governance portal oversees root X.509 CA issuing keys for field technicians, wearables, and server nodes.', badge: 'ROOT CA GOV' },
  { id: 10, title: 'Core Mission: Sovereign Child Protection Engine', ruleText: 'Establishes a robust, transparent government governance umbrella protecting South Africa 12M+ learners.', badge: 'SOVEREIGN SAFETY' },
];
