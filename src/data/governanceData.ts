export interface NationalTenant {
  id: string;
  name: string;
  code: string;
  level: 'NATIONAL' | 'PROVINCIAL' | 'DISTRICT' | 'MUNICIPALITY' | 'SCHOOL';
  provinceCode: string;
  schoolsCount: number;
  protectedLearnersCount: number;
  activeDevicesCount: number;
  complianceScorePercent: number;
  status: 'ACTIVE' | 'SUSPENDED' | 'PROVISIONING';
  storageQuotaGb: number;
  storageUsedGb: number;
}

export interface GovernmentUser {
  id: string;
  fullName: string;
  email: string;
  department: 'DBE' | 'PROVINCIAL_DEPT' | 'SITA' | 'NATIONAL_TREASURY' | 'AUDITOR_GENERAL' | 'SAPS_NATIONAL';
  role: 'NATIONAL_SUPER_ADMIN' | 'PROVINCIAL_ADMIN' | 'COMPLIANCE_AUDITOR' | 'FINANCIAL_CONTROLLER' | 'READ_ONLY_GOVERNANCE';
  provinceCode: string;
  lastActive: string;
  mfaEnabled: boolean;
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED';
}

export interface GovernmentContract {
  id: string;
  title: string;
  contractNumber: string;
  departmentName: string;
  totalValueZar: number;
  startDate: string;
  endDate: string;
  slaPerformancePercent: number;
  milestoneStatus: 'ON_TRACK' | 'REVIEW_REQUIRED' | 'DELIVERED';
}

export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabledNationally: boolean;
  enabledProvinces: string[];
  category: 'SECURITY' | 'EMERGENCY_MODE' | 'AI_FEATURES' | 'TELEMETRY_RATE';
}

export const SAMPLE_NATIONAL_TENANTS: NationalTenant[] = [
  { id: 'TNT-RSA-01', name: 'National Department of Basic Education', code: 'DBE-NAT', level: 'NATIONAL', provinceCode: 'ALL', schoolsCount: 24800, protectedLearnersCount: 1240000, activeDevicesCount: 1180000, complianceScorePercent: 98.4, status: 'ACTIVE', storageQuotaGb: 50000, storageUsedGb: 12400 },
  { id: 'TNT-GP-02', name: 'Gauteng Department of Education (GDE)', code: 'GDE-GP', level: 'PROVINCIAL', provinceCode: 'GP', schoolsCount: 2850, protectedLearnersCount: 380000, activeDevicesCount: 368000, complianceScorePercent: 99.1, status: 'ACTIVE', storageQuotaGb: 10000, storageUsedGb: 3100 },
  { id: 'TNT-KZN-03', name: 'KwaZulu-Natal Department of Education', code: 'KZNDE-KZN', level: 'PROVINCIAL', provinceCode: 'KZN', schoolsCount: 5900, protectedLearnersCount: 410000, activeDevicesCount: 385000, complianceScorePercent: 96.8, status: 'ACTIVE', storageQuotaGb: 12000, storageUsedGb: 4200 },
  { id: 'TNT-WC-04', name: 'Western Cape Education Department (WCED)', code: 'WCED-WC', level: 'PROVINCIAL', provinceCode: 'WC', schoolsCount: 1520, protectedLearnersCount: 190000, activeDevicesCount: 184000, complianceScorePercent: 99.6, status: 'ACTIVE', storageQuotaGb: 8000, storageUsedGb: 1950 },
  { id: 'TNT-EC-05', name: 'Eastern Cape Department of Education', code: 'ECDOE-EC', level: 'PROVINCIAL', provinceCode: 'EC', schoolsCount: 5200, protectedLearnersCount: 260000, activeDevicesCount: 243000, complianceScorePercent: 94.2, status: 'ACTIVE', storageQuotaGb: 10000, storageUsedGb: 2800 },
];

export const SAMPLE_GOVERNMENT_USERS: GovernmentUser[] = [
  { id: 'USR-GOV-001', fullName: 'Dr. M. Mthembu', email: 'mthembu.m@dbe.gov.za', department: 'DBE', role: 'NATIONAL_SUPER_ADMIN', provinceCode: 'ALL', lastActive: '2 mins ago', mfaEnabled: true, status: 'ACTIVE' },
  { id: 'USR-GOV-002', fullName: 'P. van Zyl, CA(SA)', email: 'vanzyl.p@treasury.gov.za', department: 'NATIONAL_TREASURY', role: 'FINANCIAL_CONTROLLER', provinceCode: 'ALL', lastActive: '14 mins ago', mfaEnabled: true, status: 'ACTIVE' },
  { id: 'USR-GOV-003', fullName: 'Brigadier S. Ndlovu', email: 'ndlovus@saps.gov.za', department: 'SAPS_NATIONAL', role: 'COMPLIANCE_AUDITOR', provinceCode: 'ALL', lastActive: '1 hour ago', mfaEnabled: true, status: 'ACTIVE' },
  { id: 'USR-GOV-004', fullName: 'K. Pillay', email: 'k.pillay@sita.co.za', department: 'SITA', role: 'NATIONAL_SUPER_ADMIN', provinceCode: 'ALL', lastActive: 'Yesterday', mfaEnabled: true, status: 'ACTIVE' },
];

export const SAMPLE_GOVERNMENT_CONTRACTS: GovernmentContract[] = [
  { id: 'CTR-2026-DBE-01', title: 'National Safe Schools Wearable & Telemetry Infrastructure', contractNumber: 'RT-57/2026 DBE', departmentName: 'Department of Basic Education', totalValueZar: 420000000, startDate: '2026-01-01', endDate: '2028-12-31', slaPerformancePercent: 99.8, milestoneStatus: 'DELIVERED' },
  { id: 'CTR-2026-SITA-04', title: 'SITA Cloud Security & Cryptographic Hardware Enclave Hosting', contractNumber: 'SITA-M2M-8820', departmentName: 'State Information Technology Agency (SITA)', totalValueZar: 115000000, startDate: '2026-03-15', endDate: '2027-03-14', slaPerformancePercent: 99.9, milestoneStatus: 'ON_TRACK' },
];

export const SAMPLE_FEATURE_FLAGS: FeatureFlag[] = [
  { key: 'FF_EMERGENCY_MASS_BROADCAST', name: 'National Mass SITA SMS Emergency Broadcast', description: 'Allows C3 commanders to push cellular broadcast alerts during active Amber alerts.', enabledNationally: true, enabledProvinces: ['GP', 'KZN', 'WC', 'EC', 'FS', 'MP', 'NW', 'LP', 'NC'], category: 'EMERGENCY_MODE' },
  { key: 'FF_AI_PREDICTIVE_CORRIDOR', name: 'AI Predictive Safe-Corridor Deviation Warnings', description: 'Gemini 2.5 Flash real-time trajectory pattern prediction for high-risk zones.', enabledNationally: true, enabledProvinces: ['GP', 'KZN', 'WC'], category: 'AI_FEATURES' },
  { key: 'FF_SUB_250MS_TELEMETRY', name: 'Ultra-Low Latency Telemetry Burst Mode', description: 'Increases wearable nRF9160 telemetry polling from 15s to 250ms during active SOS panic.', enabledNationally: true, enabledProvinces: ['GP', 'KZN', 'WC', 'EC', 'FS', 'MP', 'NW', 'LP', 'NC'], category: 'TELEMETRY_RATE' },
];
