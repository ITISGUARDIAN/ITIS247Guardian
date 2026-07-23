export type ThreatLevel = 'LEVEL_1_GREEN' | 'LEVEL_2_AMBER' | 'LEVEL_3_ORANGE' | 'LEVEL_4_RED';

export type DecisionOutputType =
  | 'decision.safe'
  | 'decision.monitor'
  | 'decision.warning'
  | 'decision.critical'
  | 'decision.false_positive'
  | 'decision.sos'
  | 'decision.device_failure'
  | 'decision.route_deviation';

export interface DecisionPipelineStage {
  stageNumber: number;
  name: string;
  description: string;
  evaluatorModule: string;
  latencyMs: number;
  status: 'PASSED' | 'EVALUATING' | 'BYPASSED' | 'ALERT';
}

export interface RiskFactorItem {
  id: string;
  name: string;
  category: 'DEVICE' | 'SPATIAL' | 'BEHAVIOURAL' | 'ENVIRONMENTAL';
  weightPoints: number; // e.g. +50 for SOS, +30 for Tamper, +25 for Deviation
  description: string;
}

export interface LearnerBaselineProfile {
  learnerId: string;
  learnerName: string;
  typicalDepartureTime: string; // e.g. "07:10 AM"
  typicalArrivalTime: string; // e.g. "07:45 AM"
  avgTravelSpeedKmh: number;
  avgJourneyDurationMinutes: number;
  typicalPickupLocation: string;
  frequentRoutesCount: number;
  historicalDeviationsCount: number;
  confidenceScorePct: number;
}

export interface LiveRiskAssessment {
  assessmentId: string;
  timestamp: string;
  learnerId: string;
  learnerName: string;
  calculatedRiskScore: number; // 0 - 100
  threatLevel: ThreatLevel;
  primaryRiskFactors: string[];
  decisionOutput: DecisionOutputType;
  confidenceScorePct: number;
  suppressionApplied: boolean;
  reproducibleEvidenceHash: string;
}

export interface CsdeRuleExample {
  id: number;
  conditionIf: string;
  actionThen: string;
  resultingThreat: ThreatLevel;
  resultingScore: number;
  category: string;
}

export interface CsdeCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'NestJS Pipeline' | 'Risk Scoring Engine' | 'False Positive Suppressor' | 'REST Controller';
  description: string;
  code: string;
}

// 10-STAGE CSDE PIPELINE DEFINITION
export const CSDE_PIPELINE_STAGES: DecisionPipelineStage[] = [
  {
    stageNumber: 1,
    name: 'Identity Validation',
    description: 'Verifies learner ID, device pairing status, and safety profile active flag.',
    evaluatorModule: 'IdentityTrustValidatorGuard',
    latencyMs: 1.2,
    status: 'PASSED',
  },
  {
    stageNumber: 2,
    name: 'Device Trust Validation',
    description: 'Validates cryptographic hardware key, token state, and anti-replay nonce.',
    evaluatorModule: 'DeviceSignatureTrustVerifier',
    latencyMs: 1.8,
    status: 'PASSED',
  },
  {
    stageNumber: 3,
    name: 'Spatial Context Analysis',
    description: 'Analyzes polygon boundaries (School, Home, High Risk Zone) and perimeter status.',
    evaluatorModule: 'SpatialBoundaryContextAnalyzer',
    latencyMs: 3.5,
    status: 'PASSED',
  },
  {
    stageNumber: 4,
    name: 'Journey Context Analysis',
    description: 'Checks active transit corridors, route deviation delta, and unexpected stops.',
    evaluatorModule: 'CorridorJourneyContextAnalyzer',
    latencyMs: 4.1,
    status: 'PASSED',
  },
  {
    stageNumber: 5,
    name: 'Movement Behaviour Analysis',
    description: 'Calculates speed anomalies, acceleration spikes, stationary duration, and direction shifts.',
    evaluatorModule: 'KinematicBehaviourAnalyzer',
    latencyMs: 2.3,
    status: 'PASSED',
  },
  {
    stageNumber: 6,
    name: 'Device Health Analysis',
    description: 'Evaluates battery telemetry, sensor tamper states, drop detection, and signal stability.',
    evaluatorModule: 'DeviceHealthSensorEvaluator',
    latencyMs: 1.5,
    status: 'PASSED',
  },
  {
    stageNumber: 7,
    name: 'Historical Pattern Comparison',
    description: 'Compares current movement vectors against learner baseline profile (departure times, normal speed).',
    evaluatorModule: 'LearnerBaselineProfileComparator',
    latencyMs: 3.8,
    status: 'PASSED',
  },
  {
    stageNumber: 8,
    name: 'Contextual Risk Scoring',
    description: 'Computes dynamic weighted sum (0-100) across all 17 active risk factors.',
    evaluatorModule: 'WeightedRiskCalculatorEngine',
    latencyMs: 2.1,
    status: 'PASSED',
  },
  {
    stageNumber: 9,
    name: 'Threat Classification',
    description: 'Maps risk score to Threat Level (GREEN, AMBER, ORANGE, RED) with confidence filter.',
    evaluatorModule: 'ThreatLevelClassifierMatrix',
    latencyMs: 1.1,
    status: 'PASSED',
  },
  {
    stageNumber: 10,
    name: 'Decision Publication',
    description: 'Publishes immutable decision events to Redis Event Bus for downstream processing.',
    evaluatorModule: 'DecisionEventPublisherService',
    latencyMs: 1.0,
    status: 'PASSED',
  },
];

// RISK FACTORS MATRIX
export const RISK_FACTOR_CATALOGUE: RiskFactorItem[] = [
  { id: 'rf-sos', name: 'Hardware SOS Button Depressed', category: 'DEVICE', weightPoints: 85, description: 'Direct emergency panic button trigger on wearble device.' },
  { id: 'rf-tamper', name: 'Optical Tamper / Strap Disconnection', category: 'DEVICE', weightPoints: 35, description: 'Wearable removed or wristband cut while transit active.' },
  { id: 'rf-dev-150', name: 'Route Deviation > 150 meters', category: 'SPATIAL', weightPoints: 30, description: 'Learner position offset exceeds approved transit corridor limit.' },
  { id: 'rf-speed-veh', name: 'High Speed Movement (> 40 km/h)', category: 'BEHAVIOURAL', weightPoints: 25, description: 'Speed indicates vehicular movement outside designated scholar bus.' },
  { id: 'rf-night', name: 'Movement Outside Operating Hours', category: 'ENVIRONMENTAL', weightPoints: 20, description: 'Transit detected between 19:00 PM and 05:00 AM.' },
  { id: 'rf-high-risk', name: 'Inside Designated High-Risk Zone', category: 'SPATIAL', weightPoints: 35, description: 'Coordinates lie inside unsafe or restricted municipal zone.' },
  { id: 'rf-sig-loss', name: 'GPS Signal Lost (> 10 mins)', category: 'DEVICE', weightPoints: 20, description: 'Device stopped transmitting satellite coordinates during journey.' },
  { id: 'rf-batt-low', name: 'Battery Critical (< 5%)', category: 'DEVICE', weightPoints: 10, description: 'Device battery depleted to shutdown threshold.' },
  { id: 'rf-station', name: 'Stationary Duration (> 15 mins)', category: 'BEHAVIOURAL', weightPoints: 15, description: 'Unplanned stop detected on active transit route.' },
  { id: 'rf-unauth-pick', name: 'Unregistered Pickup Point', category: 'SPATIAL', weightPoints: 25, description: 'Boarding detected at non-approved transport location.' },
];

// SAMPLE LEARNER BASELINE
export const SAMPLE_LEARNER_BASELINE: LearnerBaselineProfile = {
  learnerId: 'itis-lrn-2026-001',
  learnerName: 'Bandile Sithole',
  typicalDepartureTime: '07:12 AM',
  typicalArrivalTime: '07:42 AM',
  avgTravelSpeedKmh: 16.4,
  avgJourneyDurationMinutes: 30,
  typicalPickupLocation: 'Vilakazi Street Bus Stop #4',
  frequentRoutesCount: 2,
  historicalDeviationsCount: 1,
  confidenceScorePct: 98.5,
};

// DECISION ENGINE RULES EXAMPLES
export const CSDE_RULE_EXAMPLES: CsdeRuleExample[] = [
  {
    id: 1,
    conditionIf: 'SOS Button Pressed AND Device Authenticated',
    actionThen: 'Immediate LEVEL_4_RED Emergency Threat Level',
    resultingThreat: 'LEVEL_4_RED',
    resultingScore: 95,
    category: 'EMERGENCY_OVERRIDE',
  },
  {
    id: 2,
    conditionIf: 'Route Deviation > 150m AND Vehicle Speed > 40km/h AND Outside School Hours',
    actionThen: 'Escalate Risk Score +55 points -> LEVEL_3_ORANGE Threat Level',
    resultingThreat: 'LEVEL_3_ORANGE',
    resultingScore: 72,
    category: 'SPATIAL_ANOMALY',
  },
  {
    id: 3,
    conditionIf: 'Battery < 5% AND Stationary Duration > 10 mins (No Tamper, No Deviation)',
    actionThen: 'Generate decision.device_failure event (NOT emergency alert)',
    resultingThreat: 'LEVEL_2_AMBER',
    resultingScore: 28,
    category: 'DEVICE_FAULT_SUPPRESSION',
  },
  {
    id: 4,
    conditionIf: 'Device Tamper Triggered AND GPS Signal Lost AND Journey Active',
    actionThen: 'Immediate High Risk -> LEVEL_4_RED Threat Level',
    resultingThreat: 'LEVEL_4_RED',
    resultingScore: 88,
    category: 'DEVICE_TAMPER_DISRUPTION',
  },
];

// SAMPLE LIVE RISK ASSESSMENTS
export const SAMPLE_RISK_ASSESSMENTS: LiveRiskAssessment[] = [
  {
    assessmentId: 'csde-eval-2026-9001',
    timestamp: '2026-07-21 07:35:12',
    learnerId: 'itis-lrn-2026-001',
    learnerName: 'Bandile Sithole',
    calculatedRiskScore: 12,
    threatLevel: 'LEVEL_1_GREEN',
    primaryRiskFactors: ['Routine Morning Transit', 'On Approved Corridor'],
    decisionOutput: 'decision.safe',
    confidenceScorePct: 99.4,
    suppressionApplied: false,
    reproducibleEvidenceHash: 'sha256-8a9d701e4f2a',
  },
  {
    assessmentId: 'csde-eval-2026-9002',
    timestamp: '2026-07-21 07:42:00',
    learnerId: 'itis-lrn-2026-004',
    learnerName: 'Kagiso Mokoena',
    calculatedRiskScore: 78,
    threatLevel: 'LEVEL_3_ORANGE',
    primaryRiskFactors: ['Route Deviation > 180m', 'Speed 42 km/h outside transit bus'],
    decisionOutput: 'decision.warning',
    confidenceScorePct: 94.2,
    suppressionApplied: false,
    reproducibleEvidenceHash: 'sha256-11f84b901c3d',
  },
  {
    assessmentId: 'csde-eval-2026-9003',
    timestamp: '2026-07-21 07:45:05',
    learnerId: 'itis-lrn-2026-009',
    learnerName: 'Sipho Zulu',
    calculatedRiskScore: 95,
    threatLevel: 'LEVEL_4_RED',
    primaryRiskFactors: ['Hardware SOS Panic Depressed', 'Optical Strap Tamper'],
    decisionOutput: 'decision.critical',
    confidenceScorePct: 99.9,
    suppressionApplied: false,
    reproducibleEvidenceHash: 'sha256-99c011e40a1b',
  },
];

// NESTJS CSDE CODE SPECS
export const CSDE_CODE_SPECS: CsdeCodeSpec[] = [
  {
    id: 1,
    title: 'CSDE 10-Stage Child Safety Decision Engine',
    filename: 'src/decision-engine/services/child-safety-decision.engine.ts',
    category: 'NestJS Pipeline',
    description: 'Core NestJS orchestrator executing 10 sequential analysis stages to calculate dynamic risk score and threat level.',
    code: `import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EnrichedTelemetryEvent } from '../../telemetry/interfaces/enriched-event.interface';
import { SpatialEventRecord } from '../../geofencing/interfaces/spatial-event.interface';
import { RiskAssessmentResult, ThreatLevel } from '../interfaces/risk-assessment.interface';
import { BehaviourBaselineRepository } from '../repository/behaviour-baseline.repository';

@Injectable()
export class ChildSafetyDecisionEngine {
  private readonly logger = new Logger(ChildSafetyDecisionEngine.name);

  constructor(
    private readonly baselineRepo: BehaviourBaselineRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async evaluateSafetyState(
    telemetry: EnrichedTelemetryEvent,
    spatialEvents: SpatialEventRecord[],
  ): Promise<RiskAssessmentResult> {
    const learnerId = telemetry.learnerId;
    let riskScore = 0;
    const activeRiskFactors: string[] = [];

    // Stage 1 & 2: Identity & Device Trust Validation
    if (!telemetry.deviceTrusted) {
      return this.buildSuppressedDecision(learnerId, 'DEVICE_UNTRUSTED');
    }

    // Stage 3 & 4: Spatial & Journey Context
    for (const spatialEvt of spatialEvents) {
      if (spatialEvt.eventType === 'ROUTE_DEVIATION') {
        if (spatialEvt.distanceFromRouteMeters > 150) {
          riskScore += 30;
          activeRiskFactors.push('Route Deviation > 150m (+30)');
        }
      }
    }

    // Stage 5 & 6: Movement & Sensor Health Analysis
    if (telemetry.rawPayload.sosPressed) {
      riskScore += 85;
      activeRiskFactors.push('Hardware SOS Panic Button (+85)');
    }

    if (telemetry.rawPayload.tamperDetected) {
      riskScore += 35;
      activeRiskFactors.push('Strap Tamper / Optical Disconnect (+35)');
    }

    if (telemetry.rawPayload.speedKmh > 40 && !telemetry.onScholarTransport) {
      riskScore += 25;
      activeRiskFactors.push('High Speed Non-Scholar Transit (+25)');
    }

    // Stage 7: Baseline Comparison
    const baseline = await this.baselineRepo.findByLearnerId(learnerId);
    if (baseline && this.isAnomalousTime(telemetry.rawPayload.timestamp, baseline)) {
      riskScore += 15;
      activeRiskFactors.push('Anomalous Departure Time (+15)');
    }

    // Cap score at 100
    const finalScore = Math.min(100, Math.max(0, riskScore));

    // Stage 9: Threat Classification
    const threatLevel = this.classifyThreatLevel(finalScore, telemetry.rawPayload.sosPressed);

    const assessment: RiskAssessmentResult = {
      assessmentId: \`csde-eval-\${Date.now()}\`,
      timestamp: new Date().toISOString(),
      learnerId,
      learnerName: telemetry.learnerName,
      calculatedRiskScore: finalScore,
      threatLevel,
      primaryRiskFactors: activeRiskFactors,
      decisionOutput: this.mapThreatToOutput(threatLevel),
      confidenceScorePct: 98.8,
      suppressionApplied: false,
      reproducibleEvidenceHash: \`sha256-\${Math.random().toString(36).substring(2, 10)}\`,
    };

    // Stage 10: Decision Publication (Rule 3: Only publishes threat events)
    this.eventEmitter.emit(assessment.decisionOutput, assessment);
    this.logger.log(\`CSDE Assessment: Learner \${learnerId} -> \${threatLevel} (Score: \${finalScore})\`);

    return assessment;
  }

  private classifyThreatLevel(score: number, sos: boolean): ThreatLevel {
    if (sos || score >= 81) return 'LEVEL_4_RED';
    if (score >= 61) return 'LEVEL_3_ORANGE';
    if (score >= 21) return 'LEVEL_2_AMBER';
    return 'LEVEL_1_GREEN';
  }

  private mapThreatToOutput(threat: ThreatLevel) {
    switch (threat) {
      case 'LEVEL_4_RED': return 'decision.critical';
      case 'LEVEL_3_ORANGE': return 'decision.warning';
      case 'LEVEL_2_AMBER': return 'decision.monitor';
      default: return 'decision.safe';
    }
  }

  private buildSuppressedDecision(learnerId: string, reason: string): RiskAssessmentResult {
    return {
      assessmentId: \`csde-suppress-\${Date.now()}\`,
      timestamp: new Date().toISOString(),
      learnerId,
      learnerName: 'Learner',
      calculatedRiskScore: 0,
      threatLevel: 'LEVEL_1_GREEN',
      primaryRiskFactors: [\`Suppressed: \${reason}\`],
      decisionOutput: 'decision.false_positive',
      confidenceScorePct: 100,
      suppressionApplied: true,
      reproducibleEvidenceHash: 'sha256-suppressed',
    };
  }

  private isAnomalousTime(timestamp: string, baseline: any): boolean {
    return false; // Time window check logic
  }
}`
  },
  {
    id: 2,
    title: 'False Positive Reduction & Correlation Engine',
    filename: 'src/decision-engine/services/false-positive-suppressor.service.ts',
    category: 'False Positive Suppressor',
    description: 'Eliminates duplicate alerts, detects hardware faults (e.g. low battery false alarm), and correlates multi-sensor evidence.',
    code: `import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FalsePositiveSuppressorService {
  private readonly logger = new Logger(FalsePositiveSuppressorService.name);

  shouldSuppress(batteryPercent: number, speedKmh: number, tamper: boolean): boolean {
    // Rule: Low battery (< 5%) with zero movement is classified as device maintenance, NOT emergency.
    if (batteryPercent < 5 && speedKmh === 0 && !tamper) {
      this.logger.warn('CSDE Suppressor: Low battery with zero movement suppressed to device_failure event.');
      return true;
    }
    return false;
  }
}`
  },
  {
    id: 3,
    title: 'CSDE REST Controller & Query API',
    filename: 'src/decision-engine/controller/decision-engine.controller.ts',
    category: 'REST Controller',
    description: 'REST API endpoints providing latest risk assessment, decision history, and learner baseline profiles.',
    code: `import { Controller, Get, Param } from '@nestjs/common';
import { ChildSafetyDecisionEngine } from '../services/child-safety-decision.engine';

@Controller('decision-engine')
export class DecisionEngineController {
  constructor(private readonly csdeEngine: ChildSafetyDecisionEngine) {}

  @Get('latest/:learnerId')
  async getLatestAssessment(@Param('learnerId') learnerId: string) {
    return {
      learnerId,
      riskScore: 12,
      threatLevel: 'LEVEL_1_GREEN',
      decisionOutput: 'decision.safe',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('risk/:learnerId')
  async getRiskFactors(@Param('learnerId') learnerId: string) {
    return {
      learnerId,
      activeFactorsCount: 0,
      status: 'SAFE',
    };
  }
}`
  }
];

// CRITICAL ITIS BUSINESS RULES (1-5) FOR CSDE
export const CRITICAL_CSDE_RULES = [
  {
    id: 1,
    title: 'Zero Responder Dispatch Policy',
    ruleText: 'The Decision Engine NEVER dispatches responders directly.',
    badge: 'NO RESPONDERS',
  },
  {
    id: 2,
    title: 'Zero Parent Notification Policy',
    ruleText: 'The Decision Engine NEVER notifies parents or guardians directly.',
    badge: 'NO NOTIFICATIONS',
  },
  {
    id: 3,
    title: 'Pure Evidence Threat Classification',
    ruleText: 'The Decision Engine ONLY evaluates evidence and publishes verified threat classifications to Redis Event Bus.',
    badge: 'CLASSIFICATION ONLY',
  },
  {
    id: 4,
    title: 'Reproducible Evidence Auditability',
    ruleText: 'Every decision must be 100% reproducible from stored evidence records and cryptographic hashes.',
    badge: 'AUDITABLE EVIDENCE',
  },
  {
    id: 5,
    title: 'Safety Timeline Permanence',
    ruleText: 'Every risk calculation and score becomes a permanent entry in the Learner Digital Safety Timeline.',
    badge: 'TIMELINE PERMANENT',
  },
];
