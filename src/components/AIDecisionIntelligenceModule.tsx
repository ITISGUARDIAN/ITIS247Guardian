import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  ShieldAlert,
  Activity,
  MapPin,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  Truck,
  Building2,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Eye,
  Sliders,
  Radio,
  Layers,
  BarChart3,
  PieChart,
  RefreshCw,
  Cpu,
  ChevronRight,
  Send,
  Lock,
  ThumbsUp,
  ThumbsDown,
  Info,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Compass,
  Siren,
  Wrench,
  Package,
  Check
} from 'lucide-react';

// ==========================================
// TYPES & MOCK DATA FOR PHASE E08
// ==========================================

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface LearnerRiskProfile {
  id: string;
  learnerName: string;
  schoolName: string;
  grade: string;
  province: string;
  currentRiskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  scoreChangeDelta: number; // e.g. +12
  explanation: string;
  contributingFactors: string[];
  batteryHealthPct: number;
  lastSosTimestamp: string;
  attendanceRatePct: number;
  frequentLateArrivals: number;
  geofenceExitsCount: number;
}

export interface TransportAnomalies {
  vehicleReg: string;
  routeName: string;
  driverName: string;
  schoolServed: string;
  speedingEventsCount: number;
  harshBrakingCount: number;
  unauthorizedStops: number;
  routeDeviationMiles: number;
  overcrowdingStatus: 'Normal' | 'Near Capacity' | 'Overcapacity (+6 Learners)';
  maintenanceAlert: string;
  aiRecommendation: string;
}

export interface EmergencyDecisionAdvice {
  incidentId: string;
  location: string;
  incidentType: string;
  learnerInvolved: string;
  confidenceScorePct: number;
  recommendedResponders: { name: string; type: string; etaMinutes: number; distanceKm: number }[];
  nearestHospital: { name: string; distanceKm: number; traumaLevel: string };
  alternativeRoute: string;
  suggestedEscalation: 'Level 1: Local Dispatch' | 'Level 2: SAPS + Metro Emergency' | 'Level 3: National Joint Ops';
  humanOperatorStatus: 'Awaiting Operator Approval' | 'Operator Approved' | 'Operator Overridden';
  operatorNotes: string;
}

export interface PredictiveForecast {
  category: string;
  timeframe: string;
  forecastValue: string;
  confidencePct: number;
  drivingFactors: string;
  recommendation: string;
}

export interface GovernanceAuditEntry {
  id: string;
  timestamp: string;
  modelName: string;
  modelVersion: string;
  recommendationType: string;
  confidencePct: number;
  humanOperator: string;
  operatorAction: 'Approved' | 'Overridden' | 'Pending Review';
  justification: string;
}

// Mock Learner Risk Profiles
const INITIAL_LEARNERS: LearnerRiskProfile[] = [
  {
    id: 'LRN-9021',
    learnerName: 'Siyabonga Khumalo',
    schoolName: 'Soweto Central High School',
    grade: 'Grade 10-B',
    province: 'Gauteng',
    currentRiskScore: 88,
    riskLevel: 'Critical',
    scoreChangeDelta: +24,
    explanation: 'Risk score elevated from 64 to 88 due to 2 SOS button presses in 48 hours, coupled with 3 unannounced geofence exits outside school hours and low wearable battery (14%).',
    contributingFactors: ['2 SOS Activations (48h)', 'Geofence Exit (Zone 4)', 'Battery Low (14%)', 'Late Arrival x3'],
    batteryHealthPct: 14,
    lastSosTimestamp: '2026-07-27 06:42 AM',
    attendanceRatePct: 82.5,
    frequentLateArrivals: 4,
    geofenceExitsCount: 5
  },
  {
    id: 'LRN-9042',
    learnerName: 'Lesedi Molefe',
    schoolName: 'Alexandra Primary Academy',
    grade: 'Grade 5-A',
    province: 'Gauteng',
    currentRiskScore: 68,
    riskLevel: 'High',
    scoreChangeDelta: +15,
    explanation: 'Risk score increased following repeated route deviations during afternoon scholar transit and a missed attendance scan at morning gate arrival.',
    contributingFactors: ['Missed Gate Scan', 'Transit Route Deviation', 'Wearable Offline (20 mins)'],
    batteryHealthPct: 58,
    lastSosTimestamp: 'None (Last 30 Days)',
    attendanceRatePct: 89.0,
    frequentLateArrivals: 2,
    geofenceExitsCount: 2
  },
  {
    id: 'LRN-8110',
    learnerName: 'Amahle Dlamini',
    schoolName: 'Cape Town Central Primary',
    grade: 'Grade 4-C',
    province: 'Western Cape',
    currentRiskScore: 32,
    riskLevel: 'Moderate',
    scoreChangeDelta: -5,
    explanation: 'Risk score improved after consistent 100% gate arrival scans this week, with normal battery charging habits and stable attendance.',
    contributingFactors: ['1 Late Arrival (Monday)', 'Battery Health Optimal'],
    batteryHealthPct: 92,
    lastSosTimestamp: 'None',
    attendanceRatePct: 96.0,
    frequentLateArrivals: 1,
    geofenceExitsCount: 0
  },
  {
    id: 'LRN-7729',
    learnerName: 'Ethan Naidoo',
    schoolName: 'Durban North High School',
    grade: 'Grade 11-A',
    province: 'KwaZulu-Natal',
    currentRiskScore: 12,
    riskLevel: 'Low',
    scoreChangeDelta: 0,
    explanation: 'Optimal safety profile. High attendance, regular battery charging cycle, zero SOS alerts, zero route deviations.',
    contributingFactors: ['100% On-Time Gate Scans', 'Consistent Charging', 'No Anomalies'],
    batteryHealthPct: 98,
    lastSosTimestamp: 'None',
    attendanceRatePct: 99.5,
    frequentLateArrivals: 0,
    geofenceExitsCount: 0
  }
];

// Mock Transport Telemetry Anomalies
const INITIAL_TRANSPORT_ANOMALIES: TransportAnomalies[] = [
  {
    vehicleReg: 'GP 429-SW Z',
    routeName: 'Route 14A — Soweto West to Central High',
    driverName: 'Mandla Zulu',
    schoolServed: 'Soweto Central High School',
    speedingEventsCount: 4,
    harshBrakingCount: 6,
    unauthorizedStops: 2,
    routeDeviationMiles: 3.4,
    overcrowdingStatus: 'Overcapacity (+6 Learners)',
    maintenanceAlert: 'Brake Pad Wear Indicator Warning (88% Depleted)',
    aiRecommendation: 'Flag fleet manager for urgent brake inspection & issue driver safety compliance warning.'
  },
  {
    vehicleReg: 'CA 881-902',
    routeName: 'Route 03B — Khayelitsha to Metro Primary',
    driverName: 'Sipho Biko',
    schoolServed: 'Cape Town Metro Primary',
    speedingEventsCount: 1,
    harshBrakingCount: 2,
    unauthorizedStops: 0,
    routeDeviationMiles: 0.8,
    overcrowdingStatus: 'Normal',
    maintenanceAlert: 'Regular Service Due in 1,200 km',
    aiRecommendation: 'Schedule routine oil change during upcoming school weekend window.'
  }
];

// Mock Emergency Incidents
const INITIAL_EMERGENCY_INCIDENTS: EmergencyDecisionAdvice[] = [
  {
    incidentId: 'INC-2026-8801',
    location: 'R558 & Impala Rd, Soweto (-26.2651, 27.8402)',
    incidentType: 'Wearable Panic SOS + Vehicle Sudden Deceleration',
    learnerInvolved: 'Siyabonga Khumalo (Grade 10-B)',
    confidenceScorePct: 96.8,
    recommendedResponders: [
      { name: 'National Tactical Response Unit #4', type: 'Armed Private Response', etaMinutes: 4, distanceKm: 2.1 },
      { name: 'SAPS Soweto West Police Vehicle #12', type: 'SAPS Patrol', etaMinutes: 7, distanceKm: 4.8 },
      { name: 'Gauteng EMS Ambulance #09', type: 'Paramedic Emergency', etaMinutes: 9, distanceKm: 6.2 }
    ],
    nearestHospital: { name: 'Chris Hani Baragwanath Academic Hospital', distanceKm: 7.4, traumaLevel: 'Level 1 Trauma Center' },
    alternativeRoute: 'Redirect dispatch along K43 South to avoid congestion on Impala Rd bridge.',
    suggestedEscalation: 'Level 2: SAPS + Metro Emergency',
    humanOperatorStatus: 'Awaiting Operator Approval',
    operatorNotes: ''
  }
];

// Mock Predictive Forecasts
const PREDICTIVE_FORECASTS: PredictiveForecast[] = [
  {
    category: 'Hardware Maintenance & Replacements',
    timeframe: 'Next 90 Days',
    forecastValue: '482 Wearable Batteries Required',
    confidencePct: 92.4,
    drivingFactors: 'Wearables in 2024 pilot batch approaching 500 charge cycles.',
    recommendation: 'Pre-order 500 replacement lithium polymer battery packs from Midrand Depot.'
  },
  {
    category: 'Fleet Service Windows',
    timeframe: 'Next 30 Days',
    forecastValue: '18 Scholar Buses Need Transmission Service',
    confidencePct: 89.1,
    drivingFactors: 'Heavy urban stop-start telematics data in Soweto & Alexandra routes.',
    recommendation: 'Stagger fleet maintenance across weekend shifts to prevent Monday route disruption.'
  },
  {
    category: 'Learner Growth & Wearable Demand',
    timeframe: '2027 Q1 Academic Term',
    forecastValue: '+18,500 New Learner Enrolments',
    confidencePct: 94.8,
    drivingFactors: '14 new school governing boards joining Gauteng safety pilot.',
    recommendation: 'Issue PO for 20,000 Wearable v4 units to Shenzhen OEM by September 2026.'
  },
  {
    category: 'Call Centre & Dispatch Workload',
    timeframe: 'Rainy Season (Nov - Jan)',
    forecastValue: '+38% Incident Escalation Volume',
    confidencePct: 87.5,
    drivingFactors: 'Historical weather data shows increased traffic accidents & route delays in rain.',
    recommendation: 'Ramp up 24/7 Command Centre operator staffing by 4 FTEs during shift peaks.'
  }
];

// Mock Governance Audit Entries
const GOVERNANCE_AUDIT_LOGS: GovernanceAuditEntry[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-07-27 06:45:12',
    modelName: 'ITIS-SafetyPredict-v3.4',
    modelVersion: 'v3.4.1',
    recommendationType: 'Emergency Dispatch Escalation',
    confidencePct: 96.8,
    humanOperator: 'Operator Sarah Connor (Command Controller)',
    operatorAction: 'Approved',
    justification: 'Approved dispatch of Private Armed Response #4 based on verified dual SOS signal.'
  },
  {
    id: 'AUD-898',
    timestamp: '2026-07-26 14:22:01',
    modelName: 'ITIS-RouteIntel-v2.1',
    modelVersion: 'v2.1.0',
    recommendationType: 'Fleet Route Re-allocation',
    confidencePct: 81.2,
    humanOperator: 'Manager Kagiso Ndlovu (Transport Sup)',
    operatorAction: 'Overridden',
    justification: 'Overrode automated route change because road maintenance on alternative path was already completed.'
  }
];

export function AIDecisionIntelligenceModule() {
  const [activeTab, setActiveTab] = useState<
    'engine' | 'learner_risk' | 'transport' | 'school_intel' | 'emergency_support' | 'executive' | 'predictive' | 'summaries' | 'heatmaps' | 'governance'
  >('engine');

  // Filter State
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Emergency Action Simulation
  const [incidents, setIncidents] = useState<EmergencyDecisionAdvice[]>(INITIAL_EMERGENCY_INCIDENTS);

  // Learner Risk Data State
  const [learners, setLearners] = useState<LearnerRiskProfile[]>(INITIAL_LEARNERS);

  // AI Incident Summary Draft State
  const [draftIncidentSummary, setDraftIncidentSummary] = useState({
    title: 'Incident Summary: Siyabonga Khumalo (INC-2026-8801)',
    timeline: '06:40 AM - Wearable Band v4 battery check (14%).\n06:42 AM - SOS Panic Button pressed twice on R558.\n06:43 AM - Rapid deceleration recorded on Scholar Bus GP 429-SW Z.\n06:45 AM - AI Decision Engine generated dispatch advice (96.8% confidence).\n06:46 AM - Armed Response #4 dispatched by Operator Sarah.',
    devicesInvolved: 'Wearable Band v4 (#WB-88210) & GPS Tracker VT-900 (#VT-429)',
    respondersAssigned: 'National Tactical Response Unit #4 (ETA 4 mins)',
    actionsTaken: 'Dispatched closest response unit, notified parent via automated SMS, escalated to SAPS Soweto West.',
    outcome: 'Responders arrived on scene at 06:50 AM. Learner safe. Bus experienced minor tire puncture.',
    isApprovedByHuman: false
  });

  const handleApproveIncidentAdvice = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.incidentId === id ? { ...inc, humanOperatorStatus: 'Operator Approved' } : inc
      )
    );
  };

  const handleOverrideIncidentAdvice = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.incidentId === id ? { ...inc, humanOperatorStatus: 'Operator Overridden' } : inc
      )
    );
  };

  const filteredLearners = learners.filter((l) => {
    const matchesProvince = selectedProvince === 'All' || l.province === selectedProvince;
    const matchesRisk = riskFilter === 'All' || l.riskLevel === riskFilter;
    const matchesSearch =
      l.learnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvince && matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-8 text-slate-100 font-sans">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 border border-indigo-500/30 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-3xs font-mono font-bold">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI DECISION INTELLIGENCE & NATIONAL ANALYTICS</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <span>National Safety AI Intelligence Engine</span>
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-3xs font-mono font-bold rounded-full">
              HUMAN-IN-THE-LOOP OVERSIGHT
            </span>
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl">
            Centralized machine learning decision support analyzing learner telemetry, transport kinematics, geofence breaches, wearable health, and weather to predict risks, guide emergency dispatches, and optimize national child safety.
          </p>
        </div>

        {/* AI Engine Status Snapshot */}
        <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shrink-0 font-mono">
          <div className="text-right">
            <span className="text-3xs text-slate-400 uppercase block">Active Neural Node</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ITIS-Predict-v3.4
            </span>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div>
            <span className="text-3xs text-slate-400 uppercase block">Model Confidence</span>
            <span className="text-sm font-extrabold text-indigo-400">96.8% AVG</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-slate-950 p-2 border border-slate-800 rounded-2xl overflow-x-auto flex items-center gap-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {[
          { id: 'engine', label: '1. AI Engine Overview', icon: Brain },
          { id: 'learner_risk', label: '2. Learner Risk Scoring', icon: ShieldAlert },
          { id: 'transport', label: '3. Transport Intelligence', icon: Truck },
          { id: 'school_intel', label: '4. School Safety Analytics', icon: Building2 },
          { id: 'emergency_support', label: '5. Emergency Decision Advice', icon: Siren },
          { id: 'executive', label: '6. Executive Dashboard', icon: BarChart3 },
          { id: 'predictive', label: '7. Predictive Forecasts', icon: TrendingUp },
          { id: 'summaries', label: '8. AI Incident Summaries', icon: FileText },
          { id: 'heatmaps', label: '9. National Risk Heatmap', icon: Compass },
          { id: 'governance', label: '10. Responsible AI & Audit', icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition flex items-center gap-2 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================== */}
      {/* TAB 1: AI ENGINE OVERVIEW & ARCHITECTURE */}
      {/* ========================================== */}
      {activeTab === 'engine' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Input Data Streams Card */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Layers className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Multi-Stream Real-Time Ingestion</h3>
              </div>
              <p className="text-xs text-slate-400">
                The AI Decision Engine continuously ingests and cross-correlates 10 heterogeneous telemetry streams across South Africa:
              </p>
              <ul className="space-y-2 text-xs font-mono">
                {[
                  'Learner Gate & Bus Attendance Logs',
                  'Vehicle Telematics & Kinematics (Speed/G-force)',
                  'Wearable Band v4 Pulse & Battery Health',
                  'Dynamic Geofence Exit/Entry Events',
                  '24/7 Command SOS Button Presses',
                  'Fleet GPS Coordinates & Route Timings',
                  'SITA & SAPS Incident History Logs',
                  'South African Weather Service API (Rain/Fog)',
                  'Device Connectivity & eSIM Signal Strength',
                  'Parent & School Communication History'
                ].map((stream, idx) => (
                  <li key={idx} className="p-2 bg-slate-950 rounded-lg border border-slate-800/80 text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{stream}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Decision Pipeline Card */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Cpu className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Core Inference Pipeline</h3>
              </div>
              <p className="text-xs text-slate-400">
                Machine learning models generate real-time risk scores, operational alerts, and dispatch suggestions:
              </p>

              <div className="space-y-3 font-mono text-2xs">
                <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-1">
                  <div className="flex justify-between font-bold text-indigo-300">
                    <span>1. Learner Anomaly Model</span>
                    <span>v3.4.1</span>
                  </div>
                  <p className="text-slate-300">Calculates dynamic risk score (0-100) per child using Bayesian probability and historical baselines.</p>
                </div>

                <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl space-y-1">
                  <div className="flex justify-between font-bold text-blue-300">
                    <span>2. Transport Kinematics Model</span>
                    <span>v2.1.0</span>
                  </div>
                  <p className="text-slate-300">Detects dangerous driving, route deviations, and predicts fleet maintenance windows.</p>
                </div>

                <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl space-y-1">
                  <div className="flex justify-between font-bold text-amber-300">
                    <span>3. Emergency Dispatch Optimization</span>
                    <span>v4.0.2</span>
                  </div>
                  <p className="text-slate-300">Ranks nearest SAPS, private security, and medical responders by ETA and traffic.</p>
                </div>
              </div>
            </div>

            {/* Human Governance Guardrails */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Lock className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Human Oversight Mandate</h3>
              </div>
              
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2 text-xs font-mono">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  RESPONSIBLE AI POLICY
                </span>
                <p className="text-slate-300 leading-relaxed">
                  The ITIS AI Platform provides advisory recommendations only. Autonomous emergency dispatches or administrative punishments are strictly prohibited. All recommended actions require human review and authorization by an accredited controller or school official.
                </p>
              </div>

              <div className="space-y-2 font-mono text-2xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Total AI Suggestions Today:</span>
                  <span className="text-white font-bold">142</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Human Approval Rate:</span>
                  <span className="text-emerald-400 font-bold">94.2%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Human Override Rate:</span>
                  <span className="text-amber-400 font-bold">5.8%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: LEARNER SAFETY RISK SCORING */}
      {/* ========================================== */}
      {activeTab === 'learner_risk' && (
        <div className="space-y-6">
          
          {/* Controls and Filters */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-400" />
                <span className="text-slate-400">Province:</span>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Provinces</option>
                  <option value="Gauteng">Gauteng</option>
                  <option value="Western Cape">Western Cape</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Risk Tier:</span>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Tiers</option>
                  <option value="Critical">Critical (Score 80+)</option>
                  <option value="High">High (Score 60-79)</option>
                  <option value="Moderate">Moderate (Score 30-59)</option>
                  <option value="Low">Low (Score 0-29)</option>
                </select>
              </div>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search learner or school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Risk Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLearners.map((learner) => (
              <div
                key={learner.id}
                className={`p-6 bg-slate-900 border rounded-2xl space-y-4 transition ${
                  learner.riskLevel === 'Critical' ? 'border-rose-500/50 shadow-lg shadow-rose-500/10' :
                  learner.riskLevel === 'High' ? 'border-amber-500/50' :
                  'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xs font-mono text-slate-400 block">{learner.id} • {learner.province}</span>
                    <h4 className="text-lg font-bold text-white">{learner.learnerName}</h4>
                    <span className="text-xs text-slate-300 font-mono">{learner.schoolName} ({learner.grade})</span>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-3xs text-slate-400 uppercase block">Dynamic Risk Score</span>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className={`text-2xl font-black ${
                        learner.riskLevel === 'Critical' ? 'text-rose-400' :
                        learner.riskLevel === 'High' ? 'text-amber-400' :
                        learner.riskLevel === 'Moderate' ? 'text-blue-400' :
                        'text-emerald-400'
                      }`}>
                        {learner.currentRiskScore}
                      </span>
                      <span className="text-3xs text-slate-400">/ 100</span>
                      {learner.scoreChangeDelta > 0 ? (
                        <span className="text-3xs px-1.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded font-bold">
                          +{learner.scoreChangeDelta}
                        </span>
                      ) : (
                        <span className="text-3xs px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded font-bold">
                          {learner.scoreChangeDelta}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* AI Plain Language Explanation */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Plain-Language AI Explainability:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-2xs">
                    "{learner.explanation}"
                  </p>
                </div>

                {/* Key Contributing Factors Chips */}
                <div className="space-y-1.5">
                  <span className="text-3xs font-mono text-slate-400 uppercase block font-bold">Key Risk Contributors:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {learner.contributingFactors.map((factor, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 rounded-full text-3xs font-mono"
                      >
                        • {factor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Diagnostics Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center font-mono text-2xs">
                  <div className="p-2 bg-slate-950 rounded-lg">
                    <span className="text-slate-400 block">Wearable Battery</span>
                    <span className={`font-bold ${learner.batteryHealthPct < 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {learner.batteryHealthPct}%
                    </span>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-lg">
                    <span className="text-slate-400 block">Attendance Rate</span>
                    <span className="font-bold text-white">{learner.attendanceRatePct}%</span>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-lg">
                    <span className="text-slate-400 block">Geofence Exits</span>
                    <span className="font-bold text-amber-400">{learner.geofenceExitsCount}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: TRANSPORT INTELLIGENCE */}
      {/* ========================================== */}
      {activeTab === 'transport' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-400" />
              <span>Scholar Transport Telematics & Driver Behavior Intelligence</span>
            </h3>
            <p className="text-xs text-slate-400">
              Kinematics monitoring detecting speeding, harsh deceleration, route deviations, passenger overcrowding, and maintenance warnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_TRANSPORT_ANOMALIES.map((veh, idx) => (
              <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-indigo-500/40 transition">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-sm font-bold font-mono text-amber-400">{veh.vehicleReg}</span>
                    <h4 className="text-xs font-bold text-white">{veh.routeName}</h4>
                    <span className="text-3xs text-slate-400 font-mono">Driver: {veh.driverName} • {veh.schoolServed}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-3xs font-mono font-bold border ${
                    veh.overcrowdingStatus.includes('Overcapacity') ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {veh.overcrowdingStatus}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center font-mono text-2xs">
                  <div className="p-2 bg-slate-950 rounded-lg">
                    <span className="text-slate-400 block">Speeding</span>
                    <span className="font-extrabold text-amber-400">{veh.speedingEventsCount} events</span>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-lg">
                    <span className="text-slate-400 block">Harsh Braking</span>
                    <span className="font-extrabold text-rose-400">{veh.harshBrakingCount} events</span>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-lg">
                    <span className="text-slate-400 block">Unauth Stops</span>
                    <span className="font-extrabold text-slate-200">{veh.unauthorizedStops}</span>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-lg">
                    <span className="text-slate-400 block">Route Dev.</span>
                    <span className="font-extrabold text-indigo-300">{veh.routeDeviationMiles} km</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-2xs">
                  <span className="text-rose-400 font-bold block flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5" /> Maintenance Alert:
                  </span>
                  <p className="text-slate-300">{veh.maintenanceAlert}</p>
                </div>

                <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-1 font-mono text-2xs">
                  <span className="text-indigo-300 font-bold block flex items-center gap-1">
                    <Brain className="w-3.5 h-3.5 text-indigo-400" /> AI Fleet Recommendation:
                  </span>
                  <p className="text-slate-200">{veh.aiRecommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 4: SCHOOL SAFETY INTELLIGENCE */}
      {/* ========================================== */}
      {activeTab === 'school_intel' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              <span>School Safety & Emergency Preparedness Metrics</span>
            </h3>
            <p className="text-xs text-slate-400">
              Aggregated safety performance indicators across registered pilot schools in Gauteng, Western Cape, and KwaZulu-Natal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-3xs text-slate-400 uppercase block">On-Time Morning Attendance</span>
              <span className="text-2xl font-black text-emerald-400">94.8%</span>
              <span className="text-3xs text-emerald-300 block">+1.2% vs last month</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-3xs text-slate-400 uppercase block">Gate Scanner Gate Utilization</span>
              <span className="text-2xl font-black text-indigo-400">99.2%</span>
              <span className="text-3xs text-slate-400 block">42 BLE Scanners active</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-3xs text-slate-400 uppercase block">Emergency Drill Evacuation</span>
              <span className="text-2xl font-black text-amber-400">3m 42s</span>
              <span className="text-3xs text-amber-300 block">Target: &lt; 4m 00s</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-3xs text-slate-400 uppercase block">Visitor Access Verification</span>
              <span className="text-2xl font-black text-blue-400">100%</span>
              <span className="text-3xs text-slate-400 block">SA ID QR Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 5: EMERGENCY DECISION ADVICE */}
      {/* ========================================== */}
      {activeTab === 'emergency_support' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Siren className="w-5 h-5 text-rose-400" />
              <span>Real-Time Incident Decision Advice Engine</span>
            </h3>
            <p className="text-xs text-slate-400">
              When an SOS alert occurs, the AI ranks nearest armed security, SAPS patrols, medical ambulances, and calculates optimal traffic routing.
            </p>
          </div>

          <div className="space-y-6">
            {incidents.map((inc) => (
              <div key={inc.incidentId} className="p-6 bg-slate-900 border border-rose-500/40 rounded-3xl space-y-6 shadow-2xl">
                
                {/* Incident Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-3xs font-bold rounded-full animate-pulse">
                        LIVE CRITICAL ALERT
                      </span>
                      <span className="text-xs text-slate-400">{inc.incidentId}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{inc.incidentType}</h4>
                    <span className="text-xs text-slate-300 font-mono block">Learner: <strong className="text-white">{inc.learnerInvolved}</strong> • Location: {inc.location}</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right font-mono">
                    <span className="text-3xs text-slate-400 uppercase block">AI Decision Confidence</span>
                    <span className="text-xl font-black text-indigo-400">{inc.confidenceScorePct}%</span>
                  </div>
                </div>

                {/* Recommended Responders List */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Ranked Nearest Available Responders (AI Recommendation)</span>
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {inc.recommendedResponders.map((resp, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 font-mono text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-3xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded font-bold">
                            Rank #{idx + 1}
                          </span>
                          <span className="text-emerald-400 font-bold">{resp.etaMinutes} mins ETA</span>
                        </div>
                        <h6 className="font-bold text-white text-sm">{resp.name}</h6>
                        <span className="text-3xs text-slate-400 block">{resp.type} • {resp.distanceKm} km away</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearest Hospital & Safe Route Advice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                    <span className="text-3xs text-slate-400 uppercase block font-bold">Nearest Trauma Facility</span>
                    <span className="text-sm font-bold text-white block">{inc.nearestHospital.name}</span>
                    <span className="text-3xs text-slate-400 block">{inc.nearestHospital.traumaLevel} • {inc.nearestHospital.distanceKm} km distance</span>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                    <span className="text-3xs text-slate-400 uppercase block font-bold">Alternative Traffic Route</span>
                    <p className="text-slate-300 text-2xs">{inc.alternativeRoute}</p>
                  </div>
                </div>

                {/* Operator Approval Bar */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                  <div className="space-y-0.5">
                    <span className="text-3xs text-slate-400 uppercase block">Operator Authorization Status</span>
                    <span className={`text-sm font-bold ${
                      inc.humanOperatorStatus === 'Operator Approved' ? 'text-emerald-400' :
                      inc.humanOperatorStatus === 'Operator Overridden' ? 'text-amber-400' :
                      'text-rose-400'
                    }`}>
                      {inc.humanOperatorStatus}
                    </span>
                  </div>

                  {inc.humanOperatorStatus === 'Awaiting Operator Approval' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApproveIncidentAdvice(inc.incidentId)}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                      >
                        <Check className="w-4 h-4" />
                        <span>Authorize AI Dispatch Advice</span>
                      </button>
                      <button
                        onClick={() => handleOverrideIncidentAdvice(inc.incidentId)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Manual Override</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 6: EXECUTIVE DASHBOARD */}
      {/* ========================================== */}
      {activeTab === 'executive' && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <span>National Executive Safety & Commercial Dashboard</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-3xs text-slate-400 uppercase block">National Pilot Schools</span>
                <span className="text-xl font-black text-white">42 Schools</span>
                <span className="text-3xs text-emerald-400 block">+14 joining in Q4</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-3xs text-slate-400 uppercase block">Active Wearables Online</span>
                <span className="text-xl font-black text-indigo-400">38,420 Units</span>
                <span className="text-3xs text-slate-400 block">98.4% uptime</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-3xs text-slate-400 uppercase block">Avg SOS Resolution Time</span>
                <span className="text-xl font-black text-emerald-400">4m 12s</span>
                <span className="text-3xs text-emerald-300 block">SAPS benchmark &lt; 15m</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-3xs text-slate-400 uppercase block">Parent Engagement Rate</span>
                <span className="text-xl font-black text-amber-400">91.6%</span>
                <span className="text-3xs text-slate-400 block">Daily mobile app opens</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 7: PREDICTIVE FORECASTS */}
      {/* ========================================== */}
      {activeTab === 'predictive' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Predictive Growth & Maintenance Analytics</span>
            </h3>
            <p className="text-xs text-slate-400">
              Machine learning forecasting for hardware replacement windows, learner growth, inventory demand, and seasonal support workload.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PREDICTIVE_FORECASTS.map((fc, idx) => (
              <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-indigo-500/40 transition font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-indigo-300 uppercase">{fc.category}</span>
                  <span className="text-3xs px-2.5 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full font-bold">
                    Confidence: {fc.confidencePct}%
                  </span>
                </div>

                <div>
                  <span className="text-3xs text-slate-400 block uppercase">Timeframe: {fc.timeframe}</span>
                  <h4 className="text-lg font-black text-white mt-1">{fc.forecastValue}</h4>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-2xs">
                  <span className="text-slate-400 uppercase block font-bold">Driving Historical Factors:</span>
                  <p className="text-slate-300">{fc.drivingFactors}</p>
                </div>

                <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1 text-2xs">
                  <span className="text-amber-300 uppercase block font-bold">Recommended Strategic Action:</span>
                  <p className="text-slate-200">{fc.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 8: AI INCIDENT ASSISTANT */}
      {/* ========================================== */}
      {activeTab === 'summaries' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Automated AI Incident Report Assistant</span>
            </h3>
            <p className="text-xs text-slate-400">
              Generates draft incident chronologies and summaries for operator review before submitting official police and school governing body reports.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h4 className="text-sm font-bold text-white">{draftIncidentSummary.title}</h4>
              <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-3xs font-bold rounded-full">
                DRAFT - REQUIRES OPERATOR SIGN-OFF
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-3xs uppercase text-slate-400 block mb-1 font-bold">Incident Timeline:</label>
                <textarea
                  rows={5}
                  value={draftIncidentSummary.timeline}
                  onChange={(e) => setDraftIncidentSummary({ ...draftIncidentSummary, timeline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-3xs uppercase text-slate-400 block mb-1 font-bold">Devices Involved:</label>
                  <input
                    type="text"
                    value={draftIncidentSummary.devicesInvolved}
                    onChange={(e) => setDraftIncidentSummary({ ...draftIncidentSummary, devicesInvolved: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-3xs uppercase text-slate-400 block mb-1 font-bold">Responders Assigned:</label>
                  <input
                    type="text"
                    value={draftIncidentSummary.respondersAssigned}
                    onChange={(e) => setDraftIncidentSummary({ ...draftIncidentSummary, respondersAssigned: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-3xs uppercase text-slate-400 block mb-1 font-bold">Final Incident Outcome:</label>
                <input
                  type="text"
                  value={draftIncidentSummary.outcome}
                  onChange={(e) => setDraftIncidentSummary({ ...draftIncidentSummary, outcome: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-slate-400 text-3xs">
                Generated by ITIS-IncidentSummarizer-v1.2
              </span>
              <button
                onClick={() => setDraftIncidentSummary({ ...draftIncidentSummary, isApprovedByHuman: true })}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{draftIncidentSummary.isApprovedByHuman ? 'Report Approved & Archived' : 'Approve & File Official Incident Report'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 9: NATIONAL RISK HEATMAP */}
      {/* ========================================== */}
      {activeTab === 'heatmaps' && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 font-mono">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <span>National Safety Density & Incident Heatmap</span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive geographic visualization of high-risk school zones, vehicle density, SOS clusters, and pilot deployment density.
            </p>

            <div className="relative h-80 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center z-10">
                <span className="text-3xs px-2.5 py-1 bg-slate-900/90 text-amber-300 border border-slate-800 rounded-full font-bold">
                  ● Gauteng & KZN Safety Clusters Active
                </span>
                <div className="flex gap-2">
                  {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((view, idx) => (
                    <button key={idx} className={`px-2.5 py-1 text-3xs rounded-lg font-bold ${idx === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-auto text-center space-y-2 z-10">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 mx-auto flex items-center justify-center animate-pulse">
                  <MapPin className="w-8 h-8 text-indigo-400" />
                </div>
                <h4 className="text-sm font-bold text-white">GIS Spatial Layers Synthesized</h4>
                <p className="text-2xs text-slate-400 max-w-md mx-auto">
                  Overlays 12,450 active learner wearables across Soweto, Alexandra, Umlazi, and Khayelitsha.
                </p>
              </div>

              <div className="flex justify-between text-3xs text-slate-400 z-10 border-t border-slate-800/80 pt-2">
                <span>Low Risk (Green)</span>
                <span>Moderate Risk (Blue)</span>
                <span>High Alert (Amber)</span>
                <span className="text-rose-400 font-bold">Critical Hotspot (Red)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 10: RESPONSIBLE AI & GOVERNANCE */}
      {/* ========================================== */}
      {activeTab === 'governance' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              <span>AI Governance, Transparency & Audit Trail</span>
            </h3>
            <p className="text-xs text-slate-400">
              Immutable audit log recording every AI recommendation, confidence score, and human operator decision to ensure compliance with POPIA and SITA public sector standards.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 font-mono text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                    <th className="p-3">Audit ID</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Model & Version</th>
                    <th className="p-3">Recommendation Type</th>
                    <th className="p-3">Confidence</th>
                    <th className="p-3">Human Operator</th>
                    <th className="p-3">Operator Action</th>
                    <th className="p-3">Justification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {GOVERNANCE_AUDIT_LOGS.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-indigo-300">{log.id}</td>
                      <td className="p-3 text-slate-400 text-3xs">{log.timestamp}</td>
                      <td className="p-3 text-slate-200">{log.modelName} ({log.modelVersion})</td>
                      <td className="p-3 text-white font-bold">{log.recommendationType}</td>
                      <td className="p-3 text-indigo-400 font-bold">{log.confidencePct}%</td>
                      <td className="p-3 text-slate-300">{log.humanOperator}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-3xs font-bold border ${
                          log.operatorAction === 'Approved' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}>
                          {log.operatorAction}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300 text-2xs">{log.justification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
