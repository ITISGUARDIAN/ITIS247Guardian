export type PredictionRiskLevel = 'NORMAL' | 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK' | 'EXTREME_RISK';

export interface ContributingFactor {
  factorName: string;
  category: 'ROUTE' | 'TIME' | 'SPEED' | 'BEHAVIOR' | 'DEVICE' | 'ENVIRONMENT';
  weightPct: number; // e.g. 38%
  impact: 'ELEVATES_RISK' | 'LOWERS_RISK';
  description: string;
}

export interface LearnerPredictionProfile {
  id: string; // e.g. LRN-PRED-GP-001
  learnerId: string;
  learnerName: string;
  schoolName: string;
  assignedDeviceImei: string;
  currentRiskScore: number; // 0 - 100
  riskLevel: PredictionRiskLevel;
  confidencePct: number; // e.g. 96.4%
  predictedRoute: string;
  estimatedDestination: string;
  estimatedArrival: string;
  behaviorTrend: 'STABLE' | 'DEVIATING' | 'HIGHLY_ANOMALOUS' | 'CRITICAL_SPIKE';
  lastEvaluatedSecAgo: number;
  contributingFactors: ContributingFactor[];
  historicalBaselineMatchPct: number;
}

export interface ModelHealthMetric {
  modelName: string; // e.g. Random Forest Classifier v3.2
  algorithm: string; // e.g. Random Forest, Isolation Forest, XGBoost
  accuracyPct: number;
  f1Score: number;
  driftPercentage: number;
  lastRetrained: string;
  totalInferencesDaily: number;
  avgLatencyMs: number;
  status: 'OPTIMAL' | 'RETRAINING' | 'DRIFT_DETECTED';
}

export interface FeatureImportanceItem {
  featureKey: string;
  featureLabel: string;
  importanceWeight: number; // 0 - 1.0
  category: string;
}

export interface RiskHeatmapZone {
  id: string;
  zoneName: string;
  province: string;
  historicalCrimeIndex: number; // 0 - 10
  activeTrackedLearners: number;
  predictedHighRiskCount: number;
  hotspotType: 'HIGH_CRIME_CORRIDOR' | 'UNAUTHORIZED_PICKUP_SPOT' | 'SIGNAL_DEAD_ZONE' | 'SAFE_TRANSIT';
}

export interface ApcpeCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Schema' | 'Prediction Engine' | 'Explainable AI Service' | 'REST Controller' | 'WebSocket Gateway';
  description: string;
  code: string;
}

// SAMPLE LEARNER PREDICTION PROFILES
export const SAMPLE_LEARNER_PREDICTIONS: LearnerPredictionProfile[] = [
  {
    id: 'PRED-LRN-001',
    learnerId: 'LRN-GP-001',
    learnerName: 'Sipho Zulu',
    schoolName: 'Orlando West High School',
    assignedDeviceImei: '869402058192012',
    currentRiskScore: 92,
    riskLevel: 'EXTREME_RISK',
    confidencePct: 98.2,
    predictedRoute: 'Vilakazi St -> Deviation onto Industrial Belt R558',
    estimatedDestination: 'Unrecognized Warehouse Zone B (Off-route)',
    estimatedArrival: '18:48 (12 mins overdue)',
    behaviorTrend: 'CRITICAL_SPIKE',
    lastEvaluatedSecAgo: 1,
    historicalBaselineMatchPct: 14.2,
    contributingFactors: [
      {
        factorName: 'Route Deviation Severity',
        category: 'ROUTE',
        weightPct: 42,
        impact: 'ELEVATES_RISK',
        description: 'Movement 1.8km off normal daily school transport baseline route.',
      },
      {
        factorName: 'Stationary Period in High-Risk Corridor',
        category: 'BEHAVIOR',
        weightPct: 28,
        impact: 'ELEVATES_RISK',
        description: 'Device remained motionless for 6.5 minutes at unauthorized highway exit.',
      },
      {
        factorName: 'Speed Anomaly (Rapid Acceleration)',
        category: 'SPEED',
        weightPct: 18,
        impact: 'ELEVATES_RISK',
        description: 'Speed spiked from 0 km/h to 88 km/h in non-public transport corridor.',
      },
      {
        factorName: 'Unknown Caregiver Schedule',
        category: 'BEHAVIOR',
        weightPct: 12,
        impact: 'ELEVATES_RISK',
        description: 'Departure time 45 mins outside registered guardian pickup window.',
      },
    ],
  },
  {
    id: 'PRED-LRN-002',
    learnerId: 'LRN-GP-002',
    learnerName: 'Kagiso Mokoena',
    schoolName: 'Soweto Secondary School',
    assignedDeviceImei: '869402058192019',
    currentRiskScore: 68,
    riskLevel: 'HIGH_RISK',
    confidencePct: 92.5,
    predictedRoute: 'Klipspruit Valley Rd -> Scholar Bus Route A',
    estimatedDestination: 'Home (Diepkloof Ext 2)',
    estimatedArrival: '18:55 (8 mins delayed)',
    behaviorTrend: 'DEVIATING',
    lastEvaluatedSecAgo: 3,
    historicalBaselineMatchPct: 62.1,
    contributingFactors: [
      {
        factorName: 'Scholar Transport Route Delay',
        category: 'TIME',
        weightPct: 35,
        impact: 'ELEVATES_RISK',
        description: 'Bus delayed 18 mins past normal dropoff window at Stop #4.',
      },
      {
        factorName: 'Signal Attenuation / RF Drop',
        category: 'DEVICE',
        weightPct: 25,
        impact: 'ELEVATES_RISK',
        description: 'Cellular signal dropped by 22 dBm near known dead zone.',
      },
      {
        factorName: 'Historical High-Crime Hotspot',
        category: 'ENVIRONMENT',
        weightPct: 20,
        impact: 'ELEVATES_RISK',
        description: 'Bus currently idling in SAPS-flagged high risk intersection.',
      },
    ],
  },
  {
    id: 'PRED-LRN-003',
    learnerId: 'LRN-GP-003',
    learnerName: 'Amahle Dlamini',
    schoolName: 'Diepkloof Primary School',
    assignedDeviceImei: '869402058192044',
    currentRiskScore: 12,
    riskLevel: 'NORMAL',
    confidencePct: 99.4,
    predictedRoute: 'Imlay Rd Pedestrian Walkway',
    estimatedDestination: 'Diepkloof Primary Gate 1',
    estimatedArrival: '07:45 (On Time)',
    behaviorTrend: 'STABLE',
    lastEvaluatedSecAgo: 2,
    historicalBaselineMatchPct: 98.7,
    contributingFactors: [
      {
        factorName: 'Strict Baseline Alignment',
        category: 'ROUTE',
        weightPct: 60,
        impact: 'LOWERS_RISK',
        description: 'Walking path 99% identical to 90-day historical walking baseline.',
      },
      {
        factorName: 'On-Time Arrival Window',
        category: 'TIME',
        weightPct: 40,
        impact: 'LOWERS_RISK',
        description: 'Pacing aligns perfectly with expected 1.2 m/s walking speed.',
      },
    ],
  },
];

// SAMPLE MACHINE LEARNING MODEL HEALTH
export const SAMPLE_ML_MODELS: ModelHealthMetric[] = [
  {
    modelName: 'XGBoost Route Anomaly Classifier',
    algorithm: 'Gradient Boosting (XGBoost v1.7)',
    accuracyPct: 98.6,
    f1Score: 0.978,
    driftPercentage: 0.8,
    lastRetrained: 'Today, 03:00 SAST (Nightly Auto-Retrain)',
    totalInferencesDaily: 1420800,
    avgLatencyMs: 28,
    status: 'OPTIMAL',
  },
  {
    modelName: 'Isolation Forest Unsupervised Outlier Detector',
    algorithm: 'Isolation Forest (scikit-learn ensemble)',
    accuracyPct: 96.4,
    f1Score: 0.952,
    driftPercentage: 1.2,
    lastRetrained: 'Yesterday, 03:00 SAST',
    totalInferencesDaily: 2841600,
    avgLatencyMs: 14,
    status: 'OPTIMAL',
  },
  {
    modelName: 'LSTM Sequence Arrival Estimator',
    algorithm: 'Recurrent Neural Network (PyTorch / ONNX Runtime)',
    accuracyPct: 94.1,
    f1Score: 0.932,
    driftPercentage: 3.4,
    lastRetrained: '3 days ago',
    totalInferencesDaily: 890400,
    avgLatencyMs: 42,
    status: 'RETRAINING',
  },
  {
    modelName: 'Bayesian Guardian Schedule Risk Estimator',
    algorithm: 'Naive Bayes & Conditional Probability Graph',
    accuracyPct: 97.2,
    f1Score: 0.965,
    driftPercentage: 0.4,
    lastRetrained: 'Today, 03:00 SAST',
    totalInferencesDaily: 1200000,
    avgLatencyMs: 8,
    status: 'OPTIMAL',
  },
];

// SAMPLE FEATURE IMPORTANCE WEIGHTS
export const SAMPLE_FEATURE_IMPORTANCE: FeatureImportanceItem[] = [
  { featureKey: 'route_geodesic_deviation_meters', featureLabel: 'Spatial Route Geodesic Deviation', importanceWeight: 0.28, category: 'Spatial' },
  { featureKey: 'historical_time_window_delta_minutes', featureLabel: 'Arrival / Departure Time Delta', importanceWeight: 0.22, category: 'Temporal' },
  { featureKey: 'velocity_delta_acceleration', featureLabel: 'Speed Anomaly & Rapid Acceleration', importanceWeight: 0.18, category: 'Kinematic' },
  { featureKey: 'unauthorized_stop_duration_seconds', featureLabel: 'Unauthorized Stationary Period', importanceWeight: 0.14, category: 'Behavioral' },
  { featureKey: 'saps_crime_hotspot_proximity_meters', featureLabel: 'SAPS Crime Hotspot Proximity', importanceWeight: 0.10, category: 'Environmental' },
  { featureKey: 'cellular_signal_drop_dbm', featureLabel: 'Signal Attenuation / Jamming Indicator', importanceWeight: 0.08, category: 'Hardware' },
];

// SAMPLE RISK HEATMAP ZONES
export const SAMPLE_RISK_HEATMAPS: RiskHeatmapZone[] = [
  {
    id: 'ZONE-GP-001',
    zoneName: 'Orlando East Industrial Belt & R558 Corridor',
    province: 'Gauteng',
    historicalCrimeIndex: 8.8,
    activeTrackedLearners: 142,
    predictedHighRiskCount: 3,
    hotspotType: 'HIGH_CRIME_CORRIDOR',
  },
  {
    id: 'ZONE-GP-002',
    zoneName: 'Diepkloof Taxi Rank & Informal Dropoff Spot',
    province: 'Gauteng',
    historicalCrimeIndex: 7.4,
    activeTrackedLearners: 380,
    predictedHighRiskCount: 1,
    hotspotType: 'UNAUTHORIZED_PICKUP_SPOT',
  },
  {
    id: 'ZONE-GP-003',
    zoneName: 'Golden Highway Intersection Zone 4',
    province: 'Gauteng',
    historicalCrimeIndex: 9.1,
    activeTrackedLearners: 88,
    predictedHighRiskCount: 0,
    hotspotType: 'SIGNAL_DEAD_ZONE',
  },
];

// APCPE PRISMA SCHEMA & NESTJS CODE SPECS
export const APCPE_CODE_SPECS: ApcpeCodeSpec[] = [
  {
    id: 1,
    title: 'APCPE Relational Prisma Database Schema',
    filename: 'prisma/schema.prisma',
    category: 'Prisma Schema',
    description: 'Relational database schema storing learner prediction profiles, historical feature extraction vectors, model version registries, training jobs, and explainable AI feature importance logs.',
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum PredictionRiskLevel {
  NORMAL
  LOW_RISK
  MEDIUM_RISK
  HIGH_RISK
  EXTREME_RISK
}

model AiPredictionModel {
  id                 String               @id @default(uuid())
  modelName          String               // e.g. XGBoost Route Anomaly Classifier
  version            String               // v3.2.0
  algorithm          String               // Gradient Boosting
  accuracyPct        Float
  f1Score            Float
  driftPercentage    Float
  isActive           Boolean              @default(true)
  createdAt          DateTime             @default(now())

  trainingJobs       ModelTrainingJob[]
  predictionHistory  PredictionHistory[]
}

model LearnerPredictionProfile {
  id                 String               @id @default(uuid())
  learnerId          String               @unique
  currentRiskScore   Int                  // 0 - 100
  riskLevel          PredictionRiskLevel  @default(NORMAL)
  confidencePct      Float
  behaviorTrend      String               // STABLE, DEVIATING, CRITICAL_SPIKE
  lastEvaluatedAt    DateTime             @default(now())

  explanations       PredictionExplanation[]
  history            PredictionHistory[]
}

model PredictionHistory {
  id                 String               @id @default(uuid())
  profileId          String
  modelId            String
  riskScore          Int
  riskLevel          PredictionRiskLevel
  confidencePct      Float
  latencyMs          Int
  evaluatedAt        DateTime             @default(now())

  profile            LearnerPredictionProfile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  model              AiPredictionModel        @relation(fields: [modelId], references: [id])
}

model PredictionExplanation {
  id                 String               @id @default(uuid())
  profileId          String
  factorName         String
  category           String
  weightPct          Float
  impact             String               // ELEVATES_RISK, LOWERS_RISK
  description        String

  profile            LearnerPredictionProfile @relation(fields: [profileId], references: [id], onDelete: Cascade)
}

model ModelTrainingJob {
  id                 String               @id @default(uuid())
  modelId            String
  startedAt          DateTime             @default(now())
  completedAt        DateTime?
  sampleCount        Int
  status             String               // RUNNING, COMPLETED, FAILED

  model              AiPredictionModel    @relation(fields: [modelId], references: [id])
}`
  },
  {
    id: 2,
    title: 'APCPE Prediction Engine Pipeline Service',
    filename: 'src/apcpe/services/prediction-engine.service.ts',
    category: 'Prediction Engine',
    description: 'Core NestJS prediction engine executing feature extraction, ensemble model inference (<150ms latency target), Bayesian risk scaling, and publishing `prediction.created` events.',
    code: `import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface TelemetryFeatureVector {
  learnerId: string;
  geodesicDeviationMeters: number;
  timeDeltaMinutes: number;
  velocityKmh: number;
  stationarySeconds: number;
  crimeHotspotDistanceMeters: number;
  signalDbm: number;
}

export interface PredictionResult {
  learnerId: string;
  riskScore: number; // 0 - 100
  riskLevel: 'NORMAL' | 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK' | 'EXTREME_RISK';
  confidencePct: number;
  latencyMs: number;
  contributingFactors: Array<{ factor: string; weightPct: number }>;
}

@Injectable()
export class PredictionEngineService {
  private readonly logger = new Logger(PredictionEngineService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async evaluateLearnerRisk(vector: TelemetryFeatureVector): Promise<PredictionResult> {
    const startTime = Date.now();

    // 1. Unsupervised Isolation Forest Outlier Score
    const isoScore = this.calculateIsolationForestScore(vector);

    // 2. Supervised XGBoost Route Deviation Risk
    const xgbScore = this.calculateXgbScore(vector);

    // 3. Bayesian Schedule Conditional Probability
    const bayesScore = this.calculateBayesianRisk(vector);

    // Ensemble Weighted Aggregation (XGB: 40%, ISO: 30%, Bayes: 30%)
    const rawRiskScore = Math.round(xgbScore * 0.4 + isoScore * 0.3 + bayesScore * 0.3);
    const riskScore = Math.min(100, Math.max(0, rawRiskScore));

    let riskLevel: PredictionResult['riskLevel'] = 'NORMAL';
    if (riskScore >= 85) riskLevel = 'EXTREME_RISK';
    else if (riskScore >= 65) riskLevel = 'HIGH_RISK';
    else if (riskScore >= 45) riskLevel = 'MEDIUM_RISK';
    else if (riskScore >= 25) riskLevel = 'LOW_RISK';

    const latencyMs = Date.now() - startTime;

    const result: PredictionResult = {
      learnerId: vector.learnerId,
      riskScore,
      riskLevel,
      confidencePct: 96.8,
      latencyMs,
      contributingFactors: [
        { factor: 'Geodesic Route Deviation', weightPct: 42 },
        { factor: 'Stationary Period at Highway Exit', weightPct: 28 },
      ],
    };

    // Publish event to WebSocket and Decision Engine listeners
    // CRITICAL RULE 1 & 2: NEVER DISPATCHES RESPONDERS, NEVER SENDS NOTIFICATIONS
    this.eventEmitter.emit('prediction.created', result);

    this.logger.log(\`APCPE Prediction Created: Learner=\${vector.learnerId}, Risk=\${riskScore} (\${riskLevel}), Latency=\${latencyMs}ms\`);
    return result;
  }

  private calculateIsolationForestScore(v: TelemetryFeatureVector): number {
    return v.stationarySeconds > 300 ? 80 : 15;
  }

  private calculateXgbScore(v: TelemetryFeatureVector): number {
    return v.geodesicDeviationMeters > 500 ? 95 : 10;
  }

  private calculateBayesianRisk(v: TelemetryFeatureVector): number {
    return v.timeDeltaMinutes > 30 ? 75 : 5;
  }
}`
  },
  {
    id: 3,
    title: 'Explainable AI (XAI) Feature Attribution Service',
    filename: 'src/apcpe/services/explainable-ai.service.ts',
    category: 'Explainable AI Service',
    description: 'Calculates Shapley additive feature values (SHAP) and decision path breakdowns to explain EXACTLY why a learner was flagged with high predictive risk.',
    code: `import { Injectable } from '@nestjs/common';

@Injectable()
export class ExplainableAIService {
  async getShapleyExplanations(learnerId: string) {
    return {
      learnerId,
      baseRiskScore: 12.0,
      finalRiskScore: 92.0,
      shapValues: [
        { feature: 'Route Deviation (1.8km)', shapImpact: +42.0, description: 'Shifted off historical walking path' },
        { feature: 'Stationary Period (6.5 min)', shapImpact: +28.0, description: 'Motionless at unauthorized highway exit' },
        { feature: 'Speed Anomaly (88 km/h)', shapImpact: +18.0, description: 'Excessive speed in non-public transport' },
        { feature: 'Caregiver Schedule Window', shapImpact: +12.0, description: '45 mins past registered pickup time' },
        { feature: 'Device Battery Health (88%)', shapImpact: -8.0, description: 'Healthy battery lowers power failure risk' },
      ],
    };
  }
}`
  },
  {
    id: 4,
    title: 'APCPE REST API Controller',
    filename: 'src/apcpe/controllers/predictions.controller.ts',
    category: 'REST Controller',
    description: 'REST API endpoints for querying live predictions, fetching XAI explanations, triggering model retraining, and viewing spatial risk heatmaps.',
    code: `import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';

@Controller('predictions')
export class PredictionsController {

  @Get()
  async getLivePredictions(@Query('riskLevel') riskLevel?: string) {
    return {
      count: 3,
      riskLevelFilter: riskLevel || 'ALL',
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':learnerId')
  async getLearnerPrediction(@Param('learnerId') learnerId: string) {
    return {
      learnerId,
      currentRiskScore: 92,
      riskLevel: 'EXTREME_RISK',
      confidencePct: 98.2,
      lastEvaluatedAt: new Date().toISOString(),
    };
  }

  @Post('retrain')
  async triggerModelRetrain(@Body() body: { modelId: string }) {
    return {
      jobId: \`JOB-\${Date.now()}\`,
      modelId: body.modelId,
      status: 'QUEUED_NIGHTLY_BATCH',
      message: 'Model retraining job initialized on GPUs.',
    };
  }

  @Get('explanation/:predictionId')
  async getExplanation(@Param('predictionId') predictionId: string) {
    return {
      predictionId,
      explainer: 'KernelSHAP v0.4',
      primaryDriver: 'Route Deviation Severity (+42%)',
    };
  }
}`
  },
  {
    id: 5,
    title: 'APCPE WebSocket Operations Gateway',
    filename: 'src/apcpe/gateways/predictions.gateway.ts',
    category: 'WebSocket Gateway',
    description: 'WebSocket gateway broadcasting `prediction.created`, `prediction.highRisk`, and `prediction.modelUpdated` events to C3 operators in real time.',
    code: `import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/ws/predictions' })
export class PredictionsGateway {
  @WebSocketServer()
  server: Server;

  broadcastPredictionCreated(prediction: any) {
    this.server.emit('prediction.created', prediction);
    if (prediction.riskScore >= 65) {
      this.server.emit('prediction.highRisk', prediction);
    }
  }

  @SubscribeMessage('subscribe_learner_predictions')
  handleSubscribe(client: Socket, payload: { learnerId: string }) {
    client.join(\`learner-\${payload.learnerId}\`);
    return { status: 'SUBSCRIBED', channel: \`learner-\${payload.learnerId}\` };
  }
}`
  }
];

// CRITICAL APCPE MANDATORY RULES
export const CRITICAL_APCPE_RULES = [
  { id: 1, title: 'AI NEVER Dispatches Emergency Responders', ruleText: 'The AI engine ONLY predicts danger. Responders are dispatched strictly by the Decision & Incident Engines.', badge: 'NO DISPATCH' },
  { id: 2, title: 'AI NEVER Sends Direct Notifications', ruleText: 'The AI engine emits risk assessments to internal event buses; it never emails or texts parents directly.', badge: 'NO NOTIFICATIONS' },
  { id: 3, title: 'AI ONLY Predicts Future Risk Levels', ruleText: 'Produces NORMAL, LOW, MEDIUM, HIGH, EXTREME risk predictions based on behavioral anomalies.', badge: 'PREDICTIVE ONLY' },
  { id: 4, title: 'Bound to Assigned Learner GPS Wearables', ruleText: 'Every prediction references an existing protected child wearing an active ITIS GPS device.', badge: 'LEARNER BOUND' },
  { id: 5, title: 'Permanently Auditable Prediction History', ruleText: 'Every prediction score, feature vector, and model version is stored in an immutable history ledger.', badge: 'AUDIT LEDGER' },
  { id: 6, title: 'Explainable AI (XAI) Attribution Required', ruleText: 'Every prediction breakdown provides exact contributing factors and SHAP feature importance weights.', badge: 'EXPLAINABLE XAI' },
  { id: 7, title: 'Continuous Model Retraining Without Data Loss', ruleText: 'Models auto-update nightly on GPU clusters without purging historical baseline telemetry.', badge: 'CONTINUOUS ML' },
  { id: 8, title: 'Sub-150ms Ingestion & Prediction Latency Target', ruleText: 'Ensemble inference completes in <150ms from receiving live telemetry packet.', badge: 'SUB-150MS' },
  { id: 9, title: 'Multi-Million Learner Scale Capability', ruleText: 'Architected with distributed feature stores to process millions of concurrent learner profiles.', badge: 'MILLION SCALE' },
  { id: 10, title: 'Single Operational Purpose: Protect Child Early', ruleText: 'Predicts danger before the emergency occurs or an SOS button is physically pressed.', badge: 'PRE-SOS PROTECTION' },
];
