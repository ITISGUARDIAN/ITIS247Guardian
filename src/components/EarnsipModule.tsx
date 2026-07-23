import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Building2,
  Bus,
  Activity,
  FileSpreadsheet,
  Download,
  Search,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileText,
  PieChart,
  Brain,
  Sparkles,
  MapPin,
  Database,
  FileCode,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCheck,
  Send,
  Users,
  Smartphone,
  Award,
  Flame,
  Globe
} from 'lucide-react';
import {
  SAMPLE_KPIS,
  PROVINCIAL_SAFETY_STATS,
  SCHOOL_SAFETY_RANKINGS,
  TRANSPORT_CORRIDOR_RISKS,
  SAMPLE_FORECASTS,
  EARNSIP_CODE_SPECS,
  CRITICAL_EARNSIP_RULES,
  ExecutiveKpi,
  ProvincialSafetyStat,
  SchoolSafetyRanking,
  TransportCorridorRisk,
  ForecastProjection,
  EarnsipCodeSpec
} from '../data/earnsipData';

export const EarnsipModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'kpis' | 'regional' | 'schools' | 'transport' | 'forecast' | 'reports' | 'schema' | 'architecture'
  >('kpis');

  // Interactive States
  const [kpis] = useState<ExecutiveKpi[]>(SAMPLE_KPIS);
  const [provincialStats] = useState<ProvincialSafetyStat[]>(PROVINCIAL_SAFETY_STATS);
  const [selectedProvince, setSelectedProvince] = useState<ProvincialSafetyStat>(PROVINCIAL_SAFETY_STATS[0]);

  const [schoolRankings] = useState<SchoolSafetyRanking[]>(SCHOOL_SAFETY_RANKINGS);
  const [selectedSchool, setSelectedSchool] = useState<SchoolSafetyRanking>(SCHOOL_SAFETY_RANKINGS[0]);

  const [corridorRisks] = useState<TransportCorridorRisk[]>(TRANSPORT_CORRIDOR_RISKS);
  const [forecasts] = useState<ForecastProjection[]>(SAMPLE_FORECASTS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<EarnsipCodeSpec>(EARNSIP_CODE_SPECS[0]);

  // Report Generation State
  const [generatingReport, setGeneratingReport] = useState<boolean>(false);
  const [reportFormat, setReportFormat] = useState<'PDF' | 'EXCEL' | 'CSV'>('PDF');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const handleGenerateReport = (reportTitle: string) => {
    setGeneratingReport(true);
    addLog(`INITIATING REPORT COMPILATION for "${reportTitle}" [${reportFormat}]...`);

    setTimeout(() => {
      setGeneratingReport(false);
      addLog(`REPORT COMPILED & DIGITALLY SIGNED: ${reportTitle.toLowerCase().replace(/ /g, '-')}-${Date.now()}.${reportFormat.toLowerCase()} ready for download.`);
    }, 1600);
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 rounded-2xl border border-teal-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-700/50 text-teal-300 text-xs font-semibold">
              <BarChart3 className="w-3.5 h-3.5 animate-pulse text-teal-400" />
              <span>PROMPT 033 — ENTERPRISE ANALYTICS & NATIONAL SAFETY INTELLIGENCE (EARNSIP)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Analytics & <span className="text-teal-400">National Safety Intelligence</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Transforming operational child safety telemetry into strategic intelligence for the Department of Basic Education, SAPS, provincial authorities, school principals, and ITIS executive leadership.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-teal-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-teal-400">1,428,500</span>
              <span className="text-xs text-slate-400 font-medium">Protected Learners</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">99.98%</span>
              <span className="text-xs text-slate-400 font-medium">Recovery Rate</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">POPIA</span>
              <span className="text-xs text-slate-400 font-medium">100% Anonymised</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('kpis')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'kpis'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-teal-400" />
            <span>1. Executive KPI Overview</span>
          </button>

          <button
            onClick={() => setActiveSubTab('regional')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'regional'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>2. Provincial & District Intelligence</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schools')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schools'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>3. School Safety Scorecards</span>
          </button>

          <button
            onClick={() => setActiveSubTab('transport')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'transport'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Bus className="w-4 h-4 text-amber-400" />
            <span>4. Scholar Transport Corridors</span>
          </button>

          <button
            onClick={() => setActiveSubTab('forecast')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'forecast'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4 text-cyan-400" />
            <span>5. Predictive AI Forecasting</span>
          </button>

          <button
            onClick={() => setActiveSubTab('reports')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'reports'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
            <span>6. Report Builder & Export Centre</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-blue-400" />
            <span>7. Relational Prisma Schema</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'architecture'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>8. NestJS Services & Controllers</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-teal-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Activity className="w-4 h-4 animate-pulse text-teal-400" />
              <span>EARNSIP Analytics Audit Ledger</span>
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

      {/* SUB-TAB 1: EXECUTIVE KPI OVERVIEW */}
      {activeSubTab === 'kpis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.id}
                className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl hover:border-teal-500/50 transition-all"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">{kpi.label}</span>
                  <span className="px-2 py-0.5 rounded bg-teal-950 border border-teal-800 text-teal-400 text-[10px] font-bold">
                    {kpi.category}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-white tracking-tight">{kpi.value}</span>

                  <div
                    className={`flex items-center text-xs font-bold ${
                      kpi.changePct >= 0 ? 'text-emerald-400' : 'text-teal-300'
                    }`}
                  >
                    {kpi.changePct >= 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                    )}
                    <span>{Math.abs(kpi.changePct)}%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Target SLA: Met</span>
                  <span className="text-emerald-400 font-semibold">Status: {kpi.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PROVINCIAL & DISTRICT INTELLIGENCE */}
      {activeSubTab === 'regional' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PROVINCES LIST */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Provincial Child Safety Rankings ({provincialStats.length})
              </span>

              {provincialStats.map((p) => (
                <div
                  key={p.provinceCode}
                  onClick={() => setSelectedProvince(p)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedProvince.provinceCode === p.provinceCode
                      ? 'bg-slate-900 border-teal-500 shadow-xl shadow-teal-900/20 ring-1 ring-teal-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="px-2.5 py-1 rounded bg-teal-950 border border-teal-800 text-teal-400 text-xs font-mono font-bold">
                      {p.provinceCode} — {p.provinceName}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        p.riskLevel === 'LOW'
                          ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                          : p.riskLevel === 'MODERATE'
                          ? 'bg-amber-950 border-amber-800 text-amber-400'
                          : 'bg-rose-950 border-rose-800 text-rose-400'
                      }`}
                    >
                      RISK {p.riskLevel} ({p.riskScore}/100)
                    </span>
                  </div>

                  <div className="pt-3 space-y-1">
                    <p className="text-xs text-slate-300 font-semibold">
                      Protected Learners: {p.protectedLearnersCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">Monthly Incidents: {p.monthlyIncidents}</p>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-800 mt-3 font-mono">
                    <span>Active Wearables: {p.activeWearablesCount.toLocaleString()}</span>
                    <span className="text-emerald-400 font-bold">Recovery: {p.recoverySuccessRatePct}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTED PROVINCE DETAIL PANEL */}
            <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-teal-400" />
                  <span>Provincial Safety Profile: {selectedProvince.provinceName} ({selectedProvince.provinceCode})</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Detailed analytics for education districts, high-risk transport corridors, and emergency responder density.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-semibold">Protected Learners</span>
                  <span className="text-teal-400 font-bold text-base">
                    {selectedProvince.protectedLearnersCount.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-semibold">Monthly Incident Volume</span>
                  <span className="text-amber-400 font-bold text-base">{selectedProvince.monthlyIncidents}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-semibold">Recovery Rate</span>
                  <span className="text-emerald-400 font-bold text-base">
                    {selectedProvince.recoverySuccessRatePct}%
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-semibold">Overall Risk Score</span>
                  <span className="text-purple-400 font-bold text-base">{selectedProvince.riskScore}/100</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                  Highest-Risk Scholar Transport Corridor
                </span>
                <p className="text-xs font-mono text-teal-300 font-bold">{selectedProvince.topRiskCorridor}</p>
                <p className="text-xs text-slate-400">
                  Recommended action: Increase tactical security vehicle patrols during 06:30–08:00 and 14:00–16:00 commute hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SCHOOL SAFETY SCORECARDS */}
      {activeSubTab === 'schools' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Building2 className="w-5 h-5 text-purple-400" />
              <span>School Safety Scorecard & Geofence Compliance Rankings</span>
            </h3>

            <div className="space-y-3">
              {schoolRankings.map((sch) => (
                <div key={sch.schoolId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{sch.schoolName}</h4>
                      <p className="text-xs text-slate-400">{sch.district} • {sch.province}</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        sch.riskBadge === 'TOP_PERFORMER'
                          ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                          : sch.riskBadge === 'SAFE'
                          ? 'bg-teal-950 border-teal-800 text-teal-400'
                          : sch.riskBadge === 'ATTENTION_REQUIRED'
                          ? 'bg-amber-950 border-amber-800 text-amber-400'
                          : 'bg-rose-950 border-rose-800 text-rose-400'
                      }`}
                    >
                      Safety Score: {sch.safetyScore}/100
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Enrolled Learners</span>
                      <span className="text-slate-200 font-bold">{sch.enrolledLearners}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Arrival Punctuality</span>
                      <span className="text-teal-400 font-bold">{sch.arrivalPunctualityPct}%</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Geofence Compliance</span>
                      <span className="text-emerald-400 font-bold">{sch.geofenceCompliancePct}%</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Monthly SOS Alerts</span>
                      <span className="text-amber-400 font-bold">{sch.incidentsThisMonth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SCHOLAR TRANSPORT CORRIDORS */}
      {activeSubTab === 'transport' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Bus className="w-5 h-5 text-amber-400" />
              <span>Scholar Transport Fleet Corridors & Speed Violation Analytics</span>
            </h3>

            <div className="space-y-3">
              {corridorRisks.map((cor) => (
                <div key={cor.corridorId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{cor.corridorName}</h4>
                      <p className="text-xs text-slate-400">{cor.operatorName}</p>
                    </div>

                    <span className="text-xs font-mono font-bold text-amber-400">
                      Risk Index: {cor.riskScore}/100
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Daily Transported</span>
                      <span className="text-slate-200 font-bold">{cor.dailyLearnersTransported.toLocaleString()}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Route Compliance</span>
                      <span className="text-teal-400 font-bold">{cor.routeCompliancePct}%</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Speed Violations</span>
                      <span className="text-rose-400 font-bold">{cor.speedViolationsCount}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Unauthorized Stops</span>
                      <span className="text-amber-400 font-bold">{cor.unauthorizedStopsCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: PREDICTIVE AI FORECASTING */}
      {activeSubTab === 'forecast' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Brain className="w-5 h-5 text-cyan-400" />
              <span>Predictive AI Time-Series Forecasting & Capacity Planning</span>
            </h3>

            <div className="space-y-3">
              {forecasts.map((f, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-cyan-400">{f.month}</span>
                    <span className="text-[10px] text-slate-400 font-mono">AI Model Confidence: 96.5%</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Predicted Incidents</span>
                      <span className="text-amber-400 font-bold">{f.predictedIncidents}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Wearable Replacements</span>
                      <span className="text-teal-400 font-bold">{f.predictedDeviceReplacements}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Battery Degradation</span>
                      <span className="text-purple-400 font-bold">{f.predictedBatteryFailures}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Rec. Responders</span>
                      <span className="text-emerald-400 font-bold">{f.recommendedResponders} Units</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: REPORT BUILDER & EXPORT CENTRE */}
      {activeSubTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
                  <span>Automated Executive & Government Report Builder</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Generate cryptographically signed, POPIA-compliant reports for DBE, SAPS, and school governing bodies.
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold px-2">Export Format:</span>
                {(['PDF', 'EXCEL', 'CSV'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setReportFormat(fmt)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      reportFormat === fmt
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'National DBE Child Safety Monthly Report', desc: 'Full provincial breakdowns, geofence compliance, and transport corridor safety.' },
                { title: 'SAPS Law Enforcement Incident Briefing', desc: 'Critical SOS dispatch response times, recovery rates, and criminal hotspots.' },
                { title: 'School Principal Governance Report', desc: 'Daily learner punctuality, attendance, device fleet health, and geofence alerts.' },
              ].map((rpt, i) => (
                <div key={i} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white">{rpt.title}</h4>
                  <p className="text-xs text-slate-400">{rpt.desc}</p>
                  <button
                    onClick={() => handleGenerateReport(rpt.title)}
                    disabled={generatingReport}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{generatingReport ? 'Compiling...' : `Generate ${reportFormat}`}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: RELATIONAL PRISMA SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Prisma Relational Database Schema for EARNSIP</h3>
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold">
                Relational Model
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {EARNSIP_CODE_SPECS[0].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: NESTJS SERVICES & CONTROLLERS */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">NestJS Analytics Services & REST API</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {EARNSIP_CODE_SPECS.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedCodeSpec(spec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCodeSpec.id === spec.id
                        ? 'bg-orange-600 text-white shadow-md'
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
                <span className="font-mono text-amber-400 font-bold">{selectedCodeSpec.filename}</span>
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
        </div>
      )}

      {/* CRITICAL BUSINESS RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>10 Mandatory EARNSIP Analytics & Intelligence Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_EARNSIP_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-teal-400">RULE #{rule.id}</span>
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
    </div>
  );
};
