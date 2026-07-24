import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCw,
  Search,
  Filter,
  Plus,
  Server,
  Cpu,
  Radio,
  FileText,
  Sliders,
  Check,
  Zap,
  Users,
  Eye,
  Settings,
  HardDrive,
  EyeOff,
  Crosshair,
  Siren,
  Globe,
  Database,
  QrCode,
  ShieldCheck,
  ShieldAlert,
  Award,
  Activity,
  BarChart3,
  Terminal,
  FileCode,
  Lock,
  TrendingUp,
  Download,
  Flame,
  CheckSquare,
  Sparkles,
  Compass,
  MapPin,
  Clock,
  Layers,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import {
  SAMPLE_PILOT_PHASES,
  SAMPLE_ASSET_DEPLOYMENTS,
  SAMPLE_STAKEHOLDER_READINESS,
  SAMPLE_PILOT_RISKS,
  NPDOAPM_CODE_SPECS,
  CRITICAL_NPDOAPM_RULES,
  PilotPhaseMilestone,
  AssetDeploymentRecord,
  StakeholderReadinessRecord,
  PilotRiskRecord,
  NpdoapmCodeSpec
} from '../data/npdoapmData';

export const NpdoapmModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'pmo_dashboard' | 'gauteng_phases' | 'oat_testing' | 'stakeholder_readiness' | 'training' | 'asset_management' | 'success_kpis' | 'risk_register' | 'expansion_roadmap' | 'code_specs' | 'rules_pmo'
  >('pmo_dashboard');

  // Pilot Phases State
  const [phases, setPhases] = useState<PilotPhaseMilestone[]>(SAMPLE_PILOT_PHASES);

  // Assets State
  const [assets, setAssets] = useState<AssetDeploymentRecord[]>(SAMPLE_ASSET_DEPLOYMENTS);

  // Stakeholder Readiness State
  const [stakeholders, setStakeholders] = useState<StakeholderReadinessRecord[]>(SAMPLE_STAKEHOLDER_READINESS);

  // Risks State
  const [risks, setRisks] = useState<PilotRiskRecord[]>(SAMPLE_PILOT_RISKS);

  // Code Spec State
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<NpdoapmCodeSpec>(NPDOAPM_CODE_SPECS[0]);

  // Simulation State
  const [isSignoffExecuting, setIsSignoffExecuting] = useState(false);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Sign off Phase 2 OAT
  const handleExecuteOatSignoff = (phaseId: string) => {
    setIsSignoffExecuting(true);
    addLog(`PMO GOVERNANCE ACTION: Initiating cryptographically signed OAT acceptance for ${phaseId}...`);

    setTimeout(() => {
      setPhases((prev) =>
        prev.map((p) =>
          p.phaseId === phaseId
            ? { ...p, oatSignoffStatus: 'SIGNED_OFF', completionPct: 100, status: 'COMPLETED' }
            : p
        )
      );
      setIsSignoffExecuting(false);
      addLog(`OAT ACCEPTED: ${phaseId} signed off by DBE, SAPS, and Gauteng Education. Approved for Phase 3 Expansion.`);
    }, 1800);
  };

  // Export Executive PMO Report
  const handleExportPmoReport = () => {
    addLog('EXPORT PMO REPORT: National Pilot Rollout Executive Package exported (SHA-256: 7e2d90...4f12).');
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-900 rounded-2xl border border-cyan-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>— PILOT DEPLOYMENT, OPERATIONAL ACCEPTANCE & PROGRAMME MANAGEMENT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Gauteng Pilot Deployment & <span className="text-cyan-400">Programme Governance</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Orchestrating the first live operational deployment of ITIS within Gauteng Province. Features phased school onboarding (2,500 to 50,000 learners), Operational Acceptance Testing (OAT), 100% asset lifecycle tracking, stakeholder training certifications, and the 9-Province National Expansion Blueprint.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-cyan-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">12,500</span>
              <span className="text-xs text-slate-400 font-medium">Active Pilot Learners</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">25 / 25</span>
              <span className="text-xs text-slate-400 font-medium">Schools Onboarded</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">100% OAT</span>
              <span className="text-xs text-slate-400 font-medium">SLA Compliance</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('pmo_dashboard')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'pmo_dashboard'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>1. PMO Executive Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSubTab('gauteng_phases')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'gauteng_phases'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>2. Gauteng Phased Rollout Plan</span>
          </button>

          <button
            onClick={() => setActiveSubTab('oat_testing')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'oat_testing'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-amber-400" />
            <span>3. Operational Acceptance (OAT)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('stakeholder_readiness')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'stakeholder_readiness'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>4. Stakeholder Readiness Matrix</span>
          </button>

          <button
            onClick={() => setActiveSubTab('training')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'training'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-teal-400" />
            <span>5. Role-Based Training & Certs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('asset_management')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'asset_management'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <HardDrive className="w-4 h-4 text-fuchsia-400" />
            <span>6. Asset Lifecycle Deployment</span>
          </button>

          <button
            onClick={() => setActiveSubTab('success_kpis')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'success_kpis'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>7. Pilot Success Metrics & KPIs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('risk_register')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'risk_register'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>8. Programme Risk Register</span>
          </button>

          <button
            onClick={() => setActiveSubTab('expansion_roadmap')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'expansion_roadmap'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-amber-300" />
            <span>9. 9-Province National Blueprint</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-cyan-300" />
            <span>10. PMO Code Specs & Rules</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
              <span>NPDOAPM Programme Management Execution Stream</span>
            </span>
            <button onClick={() => setLogs([])} className="text-slate-500 hover:text-slate-300">
              Clear
            </button>
          </div>
          <div className="space-y-1">
            {logs.map((log, idx) => (
              <p key={idx} className="text-slate-300">
                {log}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 1: PMO EXECUTIVE DASHBOARD */}
      {activeSubTab === 'pmo_dashboard' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-400 font-mono text-xs font-bold border border-cyan-800 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>GAUTENG PILOT PHASE 1 & 2: ACTIVE & ON TRACK</span>
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-2">National Pilot Programme Management Office (PMO)</h2>
              <p className="text-xs text-slate-400">Directing pilot governance, school onboarding, asset distribution, and operational acceptance for South Africa's national child protection system.</p>
            </div>

            <button
              onClick={handleExportPmoReport}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-cyan-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT PMO REPORT</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Total Pilot Onboarded Schools:</span>
              <strong className="text-white text-lg">25 Schools (Soweto, Pretoria, JHB)</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Protected Pilot Learners:</span>
              <strong className="text-emerald-400 text-lg">12,500 Active Wearables</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Parent Mobile Adoption:</span>
              <strong className="text-cyan-400 text-lg">94.8% Registered</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">SAPS Panic Dispatch SLA:</span>
              <strong className="text-emerald-400 text-lg">0.94s (Target &lt; 1.5s)</strong>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: GAUTENG PHASED ROLLOUT */}
      {activeSubTab === 'gauteng_phases' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span>Gauteng Pilot Phased School & Learner Onboarding Roadmap</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {phases.map((ph) => (
              <div key={ph.phaseId} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-emerald-400 font-bold text-sm block">{ph.phaseName}</span>
                    <p className="text-slate-400 text-[11px]">Start Date: {ph.startDate} • Target: {ph.targetSchools} Schools / {ph.targetLearners.toLocaleString()} Learners</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      ph.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    }`}>
                      {ph.status} ({ph.completionPct}%)
                    </span>

                    {ph.oatSignoffStatus !== 'SIGNED_OFF' && (
                      <button
                        onClick={() => handleExecuteOatSignoff(ph.phaseId)}
                        disabled={isSignoffExecuting}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-all"
                      >
                        SIGN OFF OAT
                      </button>
                    )}
                  </div>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${ph.completionPct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: OPERATIONAL ACCEPTANCE */}
      {activeSubTab === 'oat_testing' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <CheckSquare className="w-5 h-5 text-amber-400" />
            <span>Live Field Operational Acceptance Testing (OAT) Verifications</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Live SOS Panic Button Dispatch Drill</span>
              <p className="text-slate-300">Verified panic press from learner wearable to Gauteng C3 Command Centre map rendering in 84ms.</p>
              <span className="text-emerald-400 font-bold block">✓ OAT ACCEPTED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Cellular Network Blackout Telemetry Store-and-Forward</span>
              <p className="text-slate-300">Verified local wearable flash memory buffering during 15-minute load shedding cell tower outages.</p>
              <span className="text-emerald-400 font-bold block">✓ OAT ACCEPTED</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: STAKEHOLDER READINESS */}
      {activeSubTab === 'stakeholder_readiness' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>Institutional Stakeholder Onboarding & Readiness Scorecard</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {stakeholders.map((st, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <span className="text-indigo-400 font-bold block">{st.stakeholderGroup}</span>
                  <p className="text-slate-400 text-[11px]">Primary Liaison: {st.contactPerson} • Training: {st.trainingCompletionPct}%</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400 font-bold">{st.readinessScorePct}% READINESS</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px]">
                    ✓ OAT SIGNED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: TRAINING */}
      {activeSubTab === 'training' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <UserCheck className="w-5 h-5 text-teal-400" />
            <span>Role-Based Competency Training & Certification Tracking</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold block">School Administrator SAP Portal Certification</span>
              <p className="text-slate-300">125 School Principals & Gate Marshals certified on attendance scanning and safe zones.</p>
              <span className="text-emerald-400 font-bold block">100% CERTIFIED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">C3 Operator Emergency Dispatch Certification</span>
              <p className="text-slate-300">45 Command Centre Operators certified on multi-agency tactical dispatch and SAPS CAD.</p>
              <span className="text-emerald-400 font-bold block">100% CERTIFIED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">Parent Mobile App Onboarding Workshops</span>
              <p className="text-slate-300">11,850 Parents onboarded via community workshops and localized video guides.</p>
              <span className="text-emerald-400 font-bold block">94.8% ONBOARDED</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: ASSETS */}
      {activeSubTab === 'asset_management' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <HardDrive className="w-5 h-5 text-fuchsia-400" />
            <span>Asset Lifecycle Tracking (Wearables, NFC Scanners, Tablets, SIMs)</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {assets.map((ast) => (
              <div key={ast.assetId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-fuchsia-400 font-bold">{ast.assetId}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">{ast.assetType}</span>
                  </div>
                  <p className="text-white font-bold mt-1">{ast.assignedSchool} • Serial: {ast.serialNumber}</p>
                  <p className="text-slate-400 text-[11px]">Battery: {ast.batteryHealthPct}% • SIM Status: {ast.simStatus}</p>
                </div>

                <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-xs">
                  {ast.lifecycleState}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: SUCCESS KPIS */}
      {activeSubTab === 'success_kpis' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span>Pilot Success Metrics & Operational KPI Dashboard</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">Wearable Hardware Uptime</span>
              <strong className="text-emerald-400 text-xl block">99.98%</strong>
              <p className="text-slate-400 text-[11px]">Zero unhandled battery drains or device crashes reported.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">False Positive Panic Rate</span>
              <strong className="text-emerald-400 text-xl block">&lt; 0.12%</strong>
              <p className="text-slate-400 text-[11px]">Filtered by 3-second hold press and AI anomaly verification.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Attendance Capture Efficiency</span>
              <strong className="text-white text-xl block">99.4% Automated</strong>
              <p className="text-slate-400 text-[11px]">Replaced manual paper registers with instant NFC gate scans.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: RISKS */}
      {activeSubTab === 'risk_register' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>Programme Risk Register & Contingency Mitigation Playbooks</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {risks.map((r) => (
              <div key={r.riskId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold">{r.riskId} - {r.category}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 text-[10px] font-bold">{r.severity}</span>
                </div>
                <p className="text-white font-bold">{r.description}</p>
                <p className="text-slate-300">Mitigation: {r.mitigationStrategy}</p>
                <p className="text-slate-500 text-[11px]">Owner: {r.riskOwner} • Residual Status: <strong className="text-emerald-400">{r.residualRisk}</strong></p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 9: EXPANSION ROADMAP */}
      {activeSubTab === 'expansion_roadmap' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Globe className="w-5 h-5 text-amber-300" />
            <span>9-Province South African National Expansion Blueprint</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {[
              { prov: 'Gauteng (Pilot Base)', status: 'ACTIVE (25 Schools)', learners: '12,500' },
              { prov: 'KwaZulu-Natal', status: 'PHASE 4 READY', learners: '2,800,000' },
              { prov: 'Western Cape', status: 'PHASE 4 READY', learners: '1,200,000' },
              { prov: 'Eastern Cape', status: 'PHASE 4 READY', learners: '1,900,000' },
              { prov: 'Limpopo', status: 'PHASE 4 READY', learners: '1,700,000' },
              { prov: 'Mpumalanga', status: 'PHASE 4 READY', learners: '1,100,000' },
              { prov: 'Free State', status: 'PHASE 4 READY', learners: '750,000' },
              { prov: 'North West', status: 'PHASE 4 READY', learners: '850,000' },
              { prov: 'Northern Cape', status: 'PHASE 4 READY', learners: '300,000' },
            ].map((p, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-amber-300 font-bold block">{p.prov}</span>
                <p className="text-slate-300">Target Learners: <strong className="text-white">{p.learners}</strong></p>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold block w-fit">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 10: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-cyan-300" />
              <h3 className="text-base font-bold text-white">Programme Management Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {NPDOAPM_CODE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedCodeSpec(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCodeSpec.id === spec.id
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {spec.title}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-cyan-300 font-bold">{selectedCodeSpec.filename}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                {selectedCodeSpec.category}
              </span>
            </div>
            <p className="text-xs text-slate-400">{selectedCodeSpec.description}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
            <pre className="font-mono text-xs text-slate-300 leading-relaxed">
              {selectedCodeSpec.code}
            </pre>
          </div>
        </div>
      )}

      {/* MANDATORY PMO RULES */}
      {activeSubTab === 'rules_pmo' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-teal-400" />
            <span>Enterprise Directives & Compliance Standards</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {CRITICAL_NPDOAPM_RULES.map((rule) => (
              <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400">RULE #{rule.id}</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-slate-300 font-semibold">
                    {rule.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{rule.title}</h4>
                <p className="text-[11px] text-slate-400 leading-tight">{rule.ruleText}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
