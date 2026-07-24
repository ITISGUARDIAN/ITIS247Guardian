import React, { useState } from 'react';
import {
  Award,
  Building2,
  ShieldCheck,
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Terminal,
  Download,
  Brain,
  Globe,
  Activity,
  BarChart3,
  Lightbulb,
  BookOpen,
  FolderLock,
  Leaf,
  RefreshCw,
  FileCode,
  ShieldAlert,
  Sliders,
  Check,
  Landmark,
  CreditCard,
  PieChart,
  DollarSign,
  Users,
  Briefcase,
  Layers,
  Cpu,
  MapPin,
  Radio,
  Siren,
  Sparkles
} from 'lucide-react';
import {
  CONSOLIDATED_MODULES_INDEX,
  NATIONAL_ROLLOUT_MASTER_PLAN,
  TEN_YEAR_FINANCIAL_PROJECTIONS,
  MEBIM_CODE_SPECS,
  CRITICAL_MEBIM_RULES,
  ModuleSummaryRecord,
  NationalRolloutPhase,
  TenYearFinancialProjection,
  MebimCodeSpec
} from '../data/mebimData';

export const MebimModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    | 'executive_vision'
    | 'consolidated_modules'
    | 'rollout_plan'
    | 'financial_model'
    | 'risk_register'
    | 'govt_package'
    | 'investor_memo'
    | 'ops_readiness'
    | 'exec_dashboards'
    | 'code_specs'
  >('executive_vision');

  // State
  const [modules] = useState<ModuleSummaryRecord[]>(CONSOLIDATED_MODULES_INDEX);
  const [phases] = useState<NationalRolloutPhase[]>(NATIONAL_ROLLOUT_MASTER_PLAN);
  const [financials] = useState<TenYearFinancialProjection[]>(TEN_YEAR_FINANCIAL_PROJECTIONS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<MebimCodeSpec>(MEBIM_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const handleSimulateCabinetExport = () => {
    addLog('CAPSTONE BLUEPRINT: Generated Master Enterprise Blueprint & Cabinet Submission Package (SHA-256: f91a...300e).');
  };

  const handleSimulateInvestorDeck = () => {
    addLog('INVESTMENT MEMO: Exported 10-Year Financial Projections & Break-even Valuation Dossier for DFIs & Banks.');
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 rounded-2xl border border-amber-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/50 text-amber-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>— CAPSTONE MASTER ENTERPRISE BLUEPRINT & NATIONAL IMPLEMENTATION PLAN</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ITIS Master Enterprise Blueprint & <span className="text-amber-400">National Master Plan</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              The definitive capstone reference consolidating Prompts 017 through 049 into a single authoritative blueprint for Cabinet, DBE, National Treasury, SAPS, SITA, Provincial Governments, and Strategic Investors. Protecting 12.4M South African school learners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-amber-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">12.4M</span>
              <span className="text-xs text-slate-400 font-medium">Protected Learners</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">R2.15B</span>
              <span className="text-xs text-slate-400 font-medium">Annual Contract Value</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">33 Modules</span>
              <span className="text-xs text-slate-400 font-medium">Prompts 017–049 Integrated</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('executive_vision')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'executive_vision'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-amber-300" />
            <span>1. Executive Vision & Cabinet Strategy</span>
          </button>

          <button
            onClick={() => setActiveSubTab('consolidated_modules')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'consolidated_modules'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. Consolidated Architecture (33 Modules)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rollout_plan')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'rollout_plan'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. National 5-Phase Master Plan</span>
          </button>

          <button
            onClick={() => setActiveSubTab('financial_model')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'financial_model'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
            <span>4. 10-Year Financial Model & Projections</span>
          </button>

          <button
            onClick={() => setActiveSubTab('risk_register')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'risk_register'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>5. National Risk Register</span>
          </button>

          <button
            onClick={() => setActiveSubTab('govt_package')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'govt_package'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>6. Government Procurement Package</span>
          </button>

          <button
            onClick={() => setActiveSubTab('investor_memo')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'investor_memo'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <PieChart className="w-3.5 h-3.5 text-purple-400" />
            <span>7. Investment Memorandum</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ops_readiness')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'ops_readiness'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
            <span>8. Operational Readiness & BCP</span>
          </button>

          <button
            onClick={() => setActiveSubTab('exec_dashboards')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'exec_dashboards'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>9. Executive Intelligence Dashboards</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-amber-300" />
            <span>10. Capstone Schemas & APIs</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-amber-400" />
              <span>National Master Blueprint & Cabinet Audit Console</span>
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

      {/* SUB-TAB 1: EXECUTIVE VISION */}
      {activeSubTab === 'executive_vision' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Landmark className="w-5 h-5 text-amber-400" />
                <span>Executive Vision, Cabinet Mandate & National Child Safety Strategy</span>
              </h3>
              <p className="text-xs text-slate-400">Positioning ITIS as the sovereign national child safety platform for the Republic of South Africa (2026–2040).</p>
            </div>

            <button
              onClick={handleSimulateCabinetExport}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-amber-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT CABINET SUBMISSION DOSSIER</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Sovereign Mission</span>
              <p className="text-slate-300">To protect every single South African school learner between home and classroom through real-time GPS wearables, automated SAPS 10111 dispatch, and predictive AI.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">2030 National Strategy Goal</span>
              <p className="text-slate-300">Zero unassisted child abductions, sub-900ms emergency police dispatch latency, and 100% in-country data residency across all 9 provinces.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">2040 Pan-African Vision</span>
              <p className="text-slate-300">Exporting the proven ITIS sovereign child protection framework across SADC trading blocs to safeguard 140M+ Sub-Saharan African school children.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CONSOLIDATED MODULES */}
      {activeSubTab === 'consolidated_modules' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Consolidated Enterprise System Architecture</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {modules.map((m) => (
              <div key={m.title} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    {m.promptCode && <span className="text-amber-400 font-bold mr-2">{m.promptCode}</span>}
                    <h4 className="text-white font-bold inline">{m.title}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                    KPI: {m.nationalKpis}
                  </span>
                </div>

                <p className="text-slate-300">{m.purpose}</p>

                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 pt-1">
                  <span><strong>Dependencies:</strong> {m.dependencies.join(', ')}</span>
                  <span>|</span>
                  <span><strong>Security Controls:</strong> {m.securityControls}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ROLLOUT PLAN */}
      {activeSubTab === 'rollout_plan' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>National 5-Phase Master Implementation Plan</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {phases.map((p, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="text-emerald-400 font-bold text-sm">{p.phaseName}</h4>
                    <p className="text-slate-400 text-[11px]">Timeframe: {p.timeframe} | Target Provinces: {p.targetProvinces.join(', ')}</p>
                  </div>

                  <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                    {(p.targetLearnersCount / 1e6).toFixed(1)}M LEARNERS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                  <div>CAPEX Allocated: <strong>R {(p.capexAllocatedZar / 1e6).toFixed(1)} Million ZAR</strong></div>
                  <div>OPEX Allocated: <strong>R {(p.opexAllocatedZar / 1e6).toFixed(1)} Million ZAR</strong></div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block">Key Implementation Milestones:</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                    {p.keyMilestones.map((m, mIdx) => (
                      <li key={mIdx}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FINANCIAL MODEL */}
      {activeSubTab === 'financial_model' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-teal-300" />
                <span>10-Year Financial Projections & Break-Even Analysis</span>
              </h3>
              <p className="text-xs text-slate-400">R14.50 monthly tariff per protected learner funding model for National Treasury.</p>
            </div>

            <button
              onClick={handleSimulateInvestorDeck}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-teal-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT INVESTOR FINANCIAL MODEL</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 text-amber-400 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5">Active Learners</th>
                  <th className="p-2.5">Annual Revenue (ZAR)</th>
                  <th className="p-2.5">CAPEX (ZAR)</th>
                  <th className="p-2.5">OPEX (ZAR)</th>
                  <th className="p-2.5">EBITDA (ZAR)</th>
                  <th className="p-2.5">Cumulative Cash Flow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {financials.map((f) => (
                  <tr key={f.year} className="hover:bg-slate-800/50">
                    <td className="p-2.5 font-bold text-white">{f.year}</td>
                    <td className="p-2.5">{(f.activeLearnersCount / 1e6).toFixed(1)}M</td>
                    <td className="p-2.5 text-emerald-400 font-bold">R {(f.annualRevenueZar / 1e6).toFixed(1)}M</td>
                    <td className="p-2.5 text-rose-400">R {(f.capexZar / 1e6).toFixed(1)}M</td>
                    <td className="p-2.5 text-amber-400">R {(f.opexZar / 1e6).toFixed(1)}M</td>
                    <td className="p-2.5 text-teal-400 font-bold">R {(f.ebitdaZar / 1e6).toFixed(1)}M</td>
                    <td className={`p-2.5 font-bold ${f.cumulativeCashFlowZar >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      R {(f.cumulativeCashFlowZar / 1e6).toFixed(1)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: RISK REGISTER */}
      {activeSubTab === 'risk_register' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>National Risk Register & Contingency Mitigation Matrix</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">1. Supply Chain Component Shortage</span>
              <p className="text-slate-300">Risk of global LTE-M SiP module scarcity managed via 6-month buffer stock in Gauteng and dual-sourcing MAX-M10S GNSS modules.</p>
              <span className="text-emerald-400 font-bold block">✓ RESIDUAL RISK: LOW</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">2. Cellular Network Towers Power Loadshedding</span>
              <p className="text-slate-300">Managed via quad-operator eSIM roaming failover and satellite mesh fallback on remote towers.</p>
              <span className="text-emerald-400 font-bold block">✓ RESIDUAL RISK: MEDIUM</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: GOVT PACKAGE */}
      {activeSubTab === 'govt_package' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <span>Government Procurement Package (DBE, Treasury, SITA, SAPS)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">National Treasury Submission</span>
              <p className="text-slate-300">PFMA Section 38 compliant multi-year lease structure under Treasury Practice Note 8.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">SITA In-Country Hosting</span>
              <p className="text-slate-300">Dedicated sovereign cloud datacenter clusters in Johannesburg and Cape Town with zero foreign egress.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">SAPS Flying Squad CAD Integration</span>
              <p className="text-slate-300">Direct sub-900ms API link to 10111 command desks and patrol vehicle mobile terminals.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: INVESTOR MEMO */}
      {activeSubTab === 'investor_memo' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <PieChart className="w-5 h-5 text-purple-400" />
            <span>Investment Memorandum & Venture Commercial Valuation</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">Defensible Commercial Moat & IP Portfolio:</span>
              <p className="text-slate-300">14 registered CIPC hardware patents, sole ICASA/NRCS type approval for child safety LTE wearables, direct SAPS 10111 C3 CAD integration, and long-term 5-year provincial department contracts totaling R10.79 Billion over 5 years.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: OPS READINESS */}
      {activeSubTab === 'ops_readiness' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <RefreshCw className="w-5 h-5 text-sky-400" />
            <span>Operational Readiness, Command Centers & Business Continuity</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold block">24/7 National Command Centre</span>
              <p className="text-slate-300">SSA-cleared supervisors operating 24/7/365 with active video wall wallboard telemetry and automated incident escalation.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Disaster Recovery (BCP) Certification</span>
              <p className="text-slate-300">Bi-annual full-scale failover simulation certified under ISO 22301 standard with sub-120ms RTO/RPO.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: EXEC DASHBOARDS */}
      {activeSubTab === 'exec_dashboards' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <span>Executive Intelligence Dashboard Views</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Cabinet / Government View</span>
              <p className="text-slate-300">National protected learner coverage, provincial CAD response times, and PFMA budget audit ledgers.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold block">Investor / Board View</span>
              <p className="text-slate-300">Monthly Recurring Revenue (MRR), unit economics ($18.20 COGS), EBITDA margin, and valuation multiples.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">SAPS Command View</span>
              <p className="text-slate-300">Active geofence corridor status, real-time SOS alerts, and Flying Squad patrol vehicle dispatch latency.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 10: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-amber-300" />
              <h3 className="text-base font-bold text-white">Capstone Master Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {MEBIM_CODE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedCodeSpec(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCodeSpec.id === spec.id
                      ? 'bg-amber-600 text-white shadow-md'
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
              <span className="font-mono text-amber-300 font-bold">{selectedCodeSpec.filename}</span>
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

      {/* MANDATORY CAPSTONE GOVERNANCE & INVESTMENT RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-amber-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_MEBIM_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400">RULE #{rule.id}</span>
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
