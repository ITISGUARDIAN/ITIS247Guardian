export interface ProvincialInsight {
  code: string;
  name: string;
  capital: string;
  protectedLearners: number;
  schoolsCount: number;
  devicesOnline: number;
  avgResponseTimeMin: number;
  attendanceRatePercent: number;
  safetyScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  budgetSpentZar: number;
  budgetAllocatedZar: number;
}

export interface AiRiskForecast {
  id: string;
  zoneName: string;
  provinceCode: string;
  predictedIncidentType: string;
  probabilityPercent: number;
  timeframeWindow: string;
  mitigationRecommendation: string;
  confidenceScore: number;
}

export interface CabinetBriefingReport {
  id: string;
  title: string;
  classification: 'TOP_SECRET' | 'SECRET' | 'CABINET_CONFIDENTIAL' | 'GOVERNMENT_RESTRICTED';
  dateGenerated: string;
  authorDepartment: string;
  summary: string;
  keyActionItems: string[];
}

export const PROVINCIAL_INTELLIGENCE_DATA: ProvincialInsight[] = [
  { code: 'GP', name: 'Gauteng', capital: 'Johannesburg', protectedLearners: 380000, schoolsCount: 2850, devicesOnline: 368000, avgResponseTimeMin: 3.2, attendanceRatePercent: 97.4, safetyScore: 98, riskLevel: 'MEDIUM', budgetSpentZar: 118000000, budgetAllocatedZar: 120000000 },
  { code: 'KZN', name: 'KwaZulu-Natal', capital: 'Pietermaritzburg', protectedLearners: 410000, schoolsCount: 5900, devicesOnline: 385000, avgResponseTimeMin: 4.8, attendanceRatePercent: 95.1, safetyScore: 94, riskLevel: 'HIGH', budgetSpentZar: 125000000, budgetAllocatedZar: 130000000 },
  { code: 'WC', name: 'Western Cape', capital: 'Cape Town', protectedLearners: 190000, schoolsCount: 1520, devicesOnline: 184000, avgResponseTimeMin: 2.8, attendanceRatePercent: 98.2, safetyScore: 99, riskLevel: 'LOW', budgetSpentZar: 62000000, budgetAllocatedZar: 64000000 },
  { code: 'EC', name: 'Eastern Cape', capital: 'Bhisho', protectedLearners: 260000, schoolsCount: 5200, devicesOnline: 243000, avgResponseTimeMin: 6.1, attendanceRatePercent: 93.8, safetyScore: 91, riskLevel: 'MEDIUM', budgetSpentZar: 78000000, budgetAllocatedZar: 82000000 },
  { code: 'FS', name: 'Free State', capital: 'Bloemfontein', protectedLearners: 95000, schoolsCount: 1100, devicesOnline: 91000, avgResponseTimeMin: 4.1, attendanceRatePercent: 96.5, safetyScore: 96, riskLevel: 'LOW', budgetSpentZar: 31000000, budgetAllocatedZar: 32000000 },
  { code: 'MP', name: 'Mpumalanga', capital: 'Mbombela', protectedLearners: 110000, schoolsCount: 1650, devicesOnline: 104000, avgResponseTimeMin: 5.0, attendanceRatePercent: 94.9, safetyScore: 93, riskLevel: 'MEDIUM', budgetSpentZar: 36000000, budgetAllocatedZar: 38000000 },
  { code: 'NW', name: 'North West', capital: 'Mahikeng', protectedLearners: 88000, schoolsCount: 1300, devicesOnline: 82000, avgResponseTimeMin: 5.4, attendanceRatePercent: 94.2, safetyScore: 92, riskLevel: 'MEDIUM', budgetSpentZar: 28000000, budgetAllocatedZar: 30000000 },
  { code: 'LP', name: 'Limpopo', capital: 'Polokwane', protectedLearners: 210000, schoolsCount: 3800, devicesOnline: 198000, avgResponseTimeMin: 5.8, attendanceRatePercent: 95.6, safetyScore: 95, riskLevel: 'LOW', budgetSpentZar: 64000000, budgetAllocatedZar: 68000000 },
  { code: 'NC', name: 'Northern Cape', capital: 'Kimberley', protectedLearners: 42000, schoolsCount: 550, devicesOnline: 39500, avgResponseTimeMin: 4.5, attendanceRatePercent: 96.8, safetyScore: 97, riskLevel: 'LOW', budgetSpentZar: 14000000, budgetAllocatedZar: 15000000 },
];

export const AI_PREDICTIVE_INSIGHTS: AiRiskForecast[] = [
  {
    id: 'FC-001',
    zoneName: 'Soweto - Vilakazi St Safe Corridor',
    provinceCode: 'GP',
    predictedIncidentType: 'Unauthorized Corridor Exit during After-school Dismissal',
    probabilityPercent: 88,
    timeframeWindow: '14:30 - 15:15 Today',
    mitigationRecommendation: 'Pre-position JMPD Patrol Unit GP-04 at Vilakazi & Khumalo St intersection.',
    confidenceScore: 0.94,
  },
  {
    id: 'FC-002',
    zoneName: 'Umlazi V-Section Transport Hub',
    provinceCode: 'KZN',
    predictedIncidentType: 'Scholar Fleet Geofence Anomaly & Congestion',
    probabilityPercent: 74,
    timeframeWindow: '07:15 - 08:00 Tomorrow',
    mitigationRecommendation: 'Alert SAPS 10111 Dispatcher to monitor Route MR259 speed cameras.',
    confidenceScore: 0.89,
  },
  {
    id: 'FC-003',
    zoneName: 'Khayelitsha Central Bus Terminus',
    provinceCode: 'WC',
    predictedIncidentType: 'Optical Strap Buckle Tamper Cluster',
    probabilityPercent: 62,
    timeframeWindow: '15:00 - 16:00 Today',
    mitigationRecommendation: 'Notify Field Tech Team WC-02 to inspect physical buckle latches at Khayelitsha High.',
    confidenceScore: 0.85,
  },
];

export const EXECUTIVE_CABINET_BRIEFINGS: CabinetBriefingReport[] = [
  {
    id: 'REP-CAB-2026-Q3',
    title: 'National School Safety & Wearable Telemetry Security Briefing',
    classification: 'CABINET_CONFIDENTIAL',
    dateGenerated: '2026-07-22',
    authorDepartment: 'Ministry of Basic Education & SAPS National Secretariat',
    summary: 'Over 1.24 Million South African learners protected across 24,800 public schools with zero data breaches and sub-4 minute average emergency responder dispatch SLA.',
    keyActionItems: [
      'Approve Phase 4 rollout budget expansion for Eastern Cape & Limpopo rural circuits.',
      'Maintain SITA mTLS hardware security enclave certification.',
      'Present RT-57 contract performance metrics to Parliamentary Portfolio Committee.',
    ],
  },
];
