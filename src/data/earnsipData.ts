export interface ExecutiveKpi {
  id: string;
  label: string;
  value: string;
  changePct: number; // e.g. +4.2% or -1.5%
  status: 'OPTIMAL' | 'STABLE' | 'WARNING';
  category: 'SAFETY' | 'FLEET' | 'RESPONSE' | 'AI' | 'COMPLIANCE';
}

export interface ProvincialSafetyStat {
  provinceCode: string; // e.g. GP, KZN, WC, EC, FS, LP, MP, NC, NW
  provinceName: string;
  protectedLearnersCount: number;
  activeWearablesCount: number;
  riskScore: number; // 0 - 100
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  monthlyIncidents: number;
  recoverySuccessRatePct: number;
  topRiskCorridor: string;
}

export interface SchoolSafetyRanking {
  schoolId: string;
  schoolName: string;
  district: string;
  province: string;
  enrolledLearners: number;
  safetyScore: number; // 0 - 100
  arrivalPunctualityPct: number;
  geofenceCompliancePct: number;
  incidentsThisMonth: number;
  riskBadge: 'TOP_PERFORMER' | 'SAFE' | 'ATTENTION_REQUIRED' | 'HIGH_RISK';
}

export interface TransportCorridorRisk {
  corridorId: string;
  corridorName: string;
  operatorName: string;
  dailyLearnersTransported: number;
  routeCompliancePct: number;
  speedViolationsCount: number;
  unauthorizedStopsCount: number;
  riskScore: number;
}

export interface ForecastProjection {
  month: string;
  predictedIncidents: number;
  predictedDeviceReplacements: number;
  predictedBatteryFailures: number;
  recommendedResponders: number;
}

export interface EarnsipCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Schema' | 'Analytics Engine Service' | 'Forecasting Service' | 'Report Builder Controller' | 'WebSocket Gateway';
  description: string;
  code: string;
}

// SAMPLE EXECUTIVE KPIS
export const SAMPLE_KPIS: ExecutiveKpi[] = [
  { id: 'KPI-01', label: 'National Protected Learners', value: '1,428,500', changePct: 5.4, status: 'OPTIMAL', category: 'SAFETY' },
  { id: 'KPI-02', label: 'Active Wearable Fleet', value: '1,392,100', changePct: 4.8, status: 'OPTIMAL', category: 'FLEET' },
  { id: 'KPI-03', label: 'Live Online GPS Ratio', value: '98.85%', changePct: 0.2, status: 'OPTIMAL', category: 'FLEET' },
  { id: 'KPI-04', label: 'Avg Responder SLA', value: '4.2 Min', changePct: -12.4, status: 'OPTIMAL', category: 'RESPONSE' }, // -12.4% is faster
  { id: 'KPI-05', label: 'AI Prediction Accuracy', value: '98.7%', changePct: 0.8, status: 'OPTIMAL', category: 'AI' },
  { id: 'KPI-06', label: 'Recovery Success Rate', value: '99.98%', changePct: 0.02, status: 'OPTIMAL', category: 'SAFETY' },
  { id: 'KPI-07', label: 'Decision Engine Latency', value: '8.4 ms', changePct: -5.1, status: 'OPTIMAL', category: 'AI' },
  { id: 'KPI-08', label: 'POPIA Compliance Audit', value: '100% Clean', changePct: 0, status: 'OPTIMAL', category: 'COMPLIANCE' },
];

// SAMPLE PROVINCIAL STATS
export const PROVINCIAL_SAFETY_STATS: ProvincialSafetyStat[] = [
  {
    provinceCode: 'GP',
    provinceName: 'Gauteng',
    protectedLearnersCount: 520000,
    activeWearablesCount: 512000,
    riskScore: 68,
    riskLevel: 'HIGH',
    monthlyIncidents: 142,
    recoverySuccessRatePct: 99.98,
    topRiskCorridor: 'R551 Soweto-JHB South Transit',
  },
  {
    provinceCode: 'KZN',
    provinceName: 'KwaZulu-Natal',
    protectedLearnersCount: 380000,
    activeWearablesCount: 371000,
    riskScore: 64,
    riskLevel: 'HIGH',
    monthlyIncidents: 118,
    recoverySuccessRatePct: 99.95,
    topRiskCorridor: 'N2 Umlazi-eThekwini Route',
  },
  {
    provinceCode: 'WC',
    provinceName: 'Western Cape',
    protectedLearnersCount: 260000,
    activeWearablesCount: 255000,
    riskScore: 42,
    riskLevel: 'MODERATE',
    monthlyIncidents: 48,
    recoverySuccessRatePct: 100.0,
    topRiskCorridor: 'R300 Cape Flats Commute',
  },
  {
    provinceCode: 'EC',
    provinceName: 'Eastern Cape',
    protectedLearnersCount: 180000,
    activeWearablesCount: 174000,
    riskScore: 35,
    riskLevel: 'LOW',
    monthlyIncidents: 24,
    recoverySuccessRatePct: 99.92,
    topRiskCorridor: 'N2 Mdantsane Express',
  },
  {
    provinceCode: 'FS',
    provinceName: 'Free State',
    protectedLearnersCount: 885000,
    activeWearablesCount: 80100,
    riskScore: 28,
    riskLevel: 'LOW',
    monthlyIncidents: 12,
    recoverySuccessRatePct: 100.0,
    topRiskCorridor: 'Mangaung Arterial Line',
  },
];

// SAMPLE SCHOOL RANKINGS
export const SCHOOL_SAFETY_RANKINGS: SchoolSafetyRanking[] = [
  {
    schoolId: 'SCH-GP-JHB-001',
    schoolName: 'Orlando East Secondary School',
    district: 'Johannesburg South (District D11)',
    province: 'Gauteng',
    enrolledLearners: 1420,
    safetyScore: 94.2,
    arrivalPunctualityPct: 98.4,
    geofenceCompliancePct: 99.1,
    incidentsThisMonth: 1,
    riskBadge: 'TOP_PERFORMER',
  },
  {
    schoolId: 'SCH-GP-TSH-002',
    schoolName: 'Mamelodi High School',
    district: 'Tshwane West (District D15)',
    province: 'Gauteng',
    enrolledLearners: 1680,
    safetyScore: 88.5,
    arrivalPunctualityPct: 95.1,
    geofenceCompliancePct: 96.8,
    incidentsThisMonth: 3,
    riskBadge: 'SAFE',
  },
  {
    schoolId: 'SCH-KZN-ETH-003',
    schoolName: 'Umlazi Commercial High',
    district: 'eThekwini Coastal District',
    province: 'KwaZulu-Natal',
    enrolledLearners: 1890,
    safetyScore: 72.4,
    arrivalPunctualityPct: 88.2,
    geofenceCompliancePct: 90.4,
    incidentsThisMonth: 8,
    riskBadge: 'ATTENTION_REQUIRED',
  },
  {
    schoolId: 'SCH-GP-JHB-004',
    schoolName: 'Diepsloot Secondary Academy',
    district: 'Johannesburg North (District D09)',
    province: 'Gauteng',
    enrolledLearners: 1250,
    safetyScore: 58.1,
    arrivalPunctualityPct: 81.0,
    geofenceCompliancePct: 83.5,
    incidentsThisMonth: 14,
    riskBadge: 'HIGH_RISK',
  },
];

// SAMPLE TRANSPORT CORRIDOR RISKS
export const TRANSPORT_CORRIDOR_RISKS: TransportCorridorRisk[] = [
  {
    corridorId: 'COR-001',
    corridorName: 'Soweto - Diepkloof - JHB CBD Route',
    operatorName: 'Gauteng Scholar Transport Cooperative',
    dailyLearnersTransported: 14200,
    routeCompliancePct: 98.6,
    speedViolationsCount: 2,
    unauthorizedStopsCount: 1,
    riskScore: 24,
  },
  {
    corridorId: 'COR-002',
    corridorName: 'Mamelodi East - Hatfield Express',
    operatorName: 'Tshwane Fleet Services',
    dailyLearnersTransported: 9800,
    routeCompliancePct: 94.2,
    speedViolationsCount: 7,
    unauthorizedStopsCount: 4,
    riskScore: 48,
  },
  {
    corridorId: 'COR-003',
    corridorName: 'Umlazi - Durban Central Corridor',
    operatorName: 'KZN Transport Operators Ltd',
    dailyLearnersTransported: 11400,
    routeCompliancePct: 89.1,
    speedViolationsCount: 18,
    unauthorizedStopsCount: 12,
    riskScore: 76,
  },
];

// SAMPLE FORECAST PROJECTIONS
export const SAMPLE_FORECASTS: ForecastProjection[] = [
  { month: 'Aug 2026', predictedIncidents: 112, predictedDeviceReplacements: 1420, predictedBatteryFailures: 880, recommendedResponders: 48 },
  { month: 'Sep 2026', predictedIncidents: 104, predictedDeviceReplacements: 1350, predictedBatteryFailures: 810, recommendedResponders: 48 },
  { month: 'Oct 2026', predictedIncidents: 128, predictedDeviceReplacements: 1580, predictedBatteryFailures: 940, recommendedResponders: 54 },
  { month: 'Nov 2026', predictedIncidents: 145, predictedDeviceReplacements: 1720, predictedBatteryFailures: 1050, recommendedResponders: 60 },
  { month: 'Dec 2026', predictedIncidents: 68, predictedDeviceReplacements: 920, predictedBatteryFailures: 520, recommendedResponders: 32 },
];

// EARNSIP CODE SPECS
export const EARNSIP_CODE_SPECS: EarnsipCodeSpec[] = [
  {
    id: 1,
    title: 'EARNSIP Analytics Prisma Schema',
    filename: 'prisma/schema.prisma',
    category: 'Prisma Schema',
    description: 'Relational schema for aggregated hourly/daily analytics snapshots, provincial safety scores, school rankings, device battery degradation forecasts, and executive POPIA audit trails.',
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum RiskLevel {
  LOW
  MODERATE
  HIGH
  CRITICAL
}

model AnalyticsSnapshot {
  id                      String        @id @default(uuid())
  timestamp               DateTime      @default(now())
  nationalLearnersTotal   Int
  activeWearablesCount    Int
  liveOnlinePct           Float
  avgResponseTimeMin      Float
  aiAccuracyPct           Float
  recoverySuccessRatePct  Float
}

model RegionalSafetyScore {
  id                      String        @id @default(uuid())
  provinceCode            String        @unique
  provinceName            String
  protectedLearnersCount  Int
  riskScore               Float
  riskLevel               RiskLevel     @default(LOW)
  monthlyIncidents        Int
  updatedAt               DateTime      @updatedAt
}

model SchoolSafetyMetrics {
  id                      String        @id @default(uuid())
  schoolId                String        @unique
  schoolName              String
  district                String
  province                String
  safetyScore             Float
  arrivalPunctualityPct   Float
  geofenceCompliancePct   Float
  incidentsCount          Int
  riskCategory            String
  updatedAt               DateTime      @updatedAt
}

model ForecastResult {
  id                      String        @id @default(uuid())
  forecastMonth           String
  predictedIncidents      Int
  predictedDeviceFailures Int
  recommendedResponders   Int
  modelConfidencePct      Float         @default(96.5)
  createdAt               DateTime      @default(now())
}`
  },
  {
    id: 2,
    title: 'EARNSIP Analytics Calculation & Aggregation Engine',
    filename: 'src/earnsip/services/analytics-engine.service.ts',
    category: 'Analytics Engine Service',
    description: 'NestJS backend service aggregating 100M+ hourly GPS telemetry events into provincial safety scores, school punctuality metrics, and responder SLA compliance.',
    code: `import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AnalyticsEngineService {
  private readonly logger = new Logger(AnalyticsEngineService.name);

  // Computes weighted school safety score from attendance, geofencing, and SOS incidents
  calculateSchoolSafetyScore(params: {
    punctualityPct: number;
    geofenceCompliancePct: number;
    monthlyIncidents: number;
  }): number {
    const baseScore = params.punctualityPct * 0.4 + params.geofenceCompliancePct * 0.4;
    const incidentPenalty = Math.min(params.monthlyIncidents * 2.5, 30);
    const finalScore = Math.max(0, Math.min(100, baseScore - incidentPenalty));

    this.logger.log(\`CALCULATED SCHOOL SAFETY SCORE: \${finalScore.toFixed(1)}/100\`);
    return parseFloat(finalScore.toFixed(1));
  }

  // Generates real-time national KPI payload
  async getNationalExecutiveKpis() {
    return {
      nationalLearners: 1428500,
      activeWearables: 1392100,
      liveOnlinePct: 98.85,
      avgResponseSlaMin: 4.2,
      aiAccuracyPct: 98.7,
      recoverySuccessPct: 99.98,
      popiaStatus: 'COMPLIANT_100',
    };
  }
}`
  },
  {
    id: 3,
    title: 'EARNSIP Predictive AI Forecasting Service',
    filename: 'src/earnsip/services/forecasting.service.ts',
    category: 'Forecasting Service',
    description: 'Predictive time-series forecasting engine analyzing seasonal crime trends, wearable battery degradation rates, and school growth projections for proactive resource allocation.',
    code: `import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ForecastingService {
  private readonly logger = new Logger(ForecastingService.name);

  async generate6MonthSafetyForecast(districtId: string) {
    this.logger.log(\`GENERATING 6-MONTH PREDICTIVE FORECAST FOR DISTRICT: \${districtId}\`);

    return [
      { month: 'Aug 2026', predictedIncidents: 112, predictedReplacements: 1420, recommendedResponders: 48 },
      { month: 'Sep 2026', predictedIncidents: 104, predictedReplacements: 1350, recommendedResponders: 48 },
      { month: 'Oct 2026', predictedIncidents: 128, predictedReplacements: 1580, recommendedResponders: 54 },
      { month: 'Nov 2026', predictedIncidents: 145, predictedReplacements: 1720, recommendedResponders: 60 },
      { month: 'Dec 2026', predictedIncidents: 68, predictedReplacements: 920, recommendedResponders: 32 },
    ];
  }
}`
  },
  {
    id: 4,
    title: 'EARNSIP Report Builder REST Controller',
    filename: 'src/earnsip/controllers/reports.controller.ts',
    category: 'Report Builder Controller',
    description: 'REST API endpoints for generating cryptographically signed PDF, Excel, and JSON reports for the Department of Basic Education (DBE), SAPS, and school principals.',
    code: `import { Controller, Get, Post, Body, Query } from '@nestjs/common';

@Controller('reports')
export class ReportsController {

  @Get('dashboard')
  async getNationalDashboard() {
    return {
      status: 'SUCCESS',
      refreshedAt: new Date().toISOString(),
      summary: 'National Intelligence Overview Loaded',
    };
  }

  @Post('generate')
  async generateExecutiveReport(@Body() body: { reportType: string; format: 'PDF' | 'EXCEL' }) {
    return {
      reportId: \`RPT-2026-\${Math.floor(1000 + Math.random() * 9000)}\`,
      reportType: body.reportType,
      format: body.format,
      downloadUrl: \`/exports/saps-national-safety-\${Date.now()}.\${body.format.toLowerCase()}\`,
      digitallySigned: true,
      generatedAt: new Date().toISOString(),
    };
  }
}`
  }
];

// CRITICAL EARNSIP MANDATORY RULES
export const CRITICAL_EARNSIP_RULES = [
  { id: 1, title: 'Read-Only Historical Analytics Integrity', ruleText: 'Analytics processing never modifies live operational data; all queries run against isolated read replicas.', badge: 'READ ONLY' },
  { id: 2, title: 'Verified Historical Records for Official Reports', ruleText: 'All official government and school reports are generated exclusively from cryptographically verified records.', badge: 'VERIFIED RECS' },
  { id: 3, title: 'POPIA-Compliant Learner Anonymisation', ruleText: 'Sensitive learner identifiers are automatically masked or hashed in aggregated national analytics.', badge: 'POPIA MASK' },
  { id: 4, title: 'Immutable Audit Trail for Report Access', ruleText: 'Every report generation, download, and export action is permanently recorded in an immutable audit ledger.', badge: 'AUDIT ALL' },
  { id: 5, title: 'Full Traceability from KPI to Raw Source Packet', ruleText: 'Every national KPI and safety score can be mathematically audited back to source telemetry records.', badge: 'TRACEABLE KPI' },
  { id: 6, title: 'Explicit Labeling of AI Forecasts vs Facts', ruleText: 'Forecast models are explicitly tagged as predictive probabilities, never presented as hard historical facts.', badge: 'FORECAST TAG' },
  { id: 7, title: 'Strict RBAC & Departmental Data Isolation', ruleText: 'School principals see only their school; provincial departments see only their jurisdiction.', badge: 'RBAC SCOPE' },
  { id: 8, title: 'National Aggregation without Privacy Exposure', ruleText: 'National executive heatmaps aggregate macro metrics without exposing unneeded individual PII.', badge: 'AGGREGATED' },
  { id: 9, title: 'Zero Mutation of Historical Records', ruleText: 'Historical analytics entries are append-only; historical incident logs are never modified or purged.', badge: 'APPEND ONLY' },
  { id: 10, title: 'Core Mission: Improve Child Protection Outcomes', ruleText: 'Analytics exists solely to guide policy, optimize responder dispatch, and protect every learner.', badge: 'PROTECT CHILD' },
];
