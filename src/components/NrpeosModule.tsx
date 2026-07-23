import React, { useState } from 'react';
import {
  Compass,
  Globe,
  Building2,
  Building,
  School,
  Truck,
  HardDrive,
  Headphones,
  BarChart3,
  CreditCard,
  MessageSquare,
  RefreshCw,
  FileCode,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Search,
  Filter,
  Download,
  Terminal,
  Clock,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Zap,
  PhoneCall,
  Check,
  Package,
  Layers
} from 'lucide-react';
import {
  SAMPLE_PROVINCIAL_ROLLOUTS,
  SAMPLE_SCHOOL_ONBOARDINGS,
  SAMPLE_LOGISTICS_WAREHOUSES,
  SAMPLE_SERVICE_TICKETS,
  NRPEOS_CODE_SPECS,
  CRITICAL_NRPEOS_RULES,
  ProvincialRolloutStatus,
  SchoolOnboardingRecord,
  NationalWarehouseInventory,
  ServiceDeskTicketRecord,
  NrpeosCodeSpec
} from '../data/nrpeosData';

export const NrpeosModule: React.FC = () => {
  // Active Sub Tab State
  const [activeSubTab, setActiveSubTab] = useState<
    'nrpo_dashboard' | 'provincial_framework' | 'school_onboarding' | 'logistics_supply' | 'provincial_c3' | 'service_desk' | 'national_kpis' | 'financial_scaling' | 'communications' | 'continuous_improvement' | 'code_specs'
  >('nrpo_dashboard');

  // Interactive State
  const [provinces, setProvinces] = useState<ProvincialRolloutStatus[]>(SAMPLE_PROVINCIAL_ROLLOUTS);
  const [schools, setSchools] = useState<SchoolOnboardingRecord[]>(SAMPLE_SCHOOL_ONBOARDINGS);
  const [warehouses, setWarehouses] = useState<NationalWarehouseInventory[]>(SAMPLE_LOGISTICS_WAREHOUSES);
  const [tickets, setTickets] = useState<ServiceDeskTicketRecord[]>(SAMPLE_SERVICE_TICKETS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<NrpeosCodeSpec>(NRPEOS_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Actions
  const handleActivateProvince = (code: string) => {
    setProvinces((prev) =>
      prev.map((p) =>
        p.provinceCode === code ? { ...p, rolloutPhase: 'PHASE_1_LIVE', readinessScorePct: 100 } : p
      )
    );
    addLog(`NATIONAL ROLLOUT: ${code} Regional C3 Operations Centre transitioned to PHASE_1_LIVE.`);
  };

  const handleExportNationalReport = () => {
    addLog('NATIONAL EXECUTIVE REPORT: Exported 9-Province Operations & Logistics Summary (SHA-256: e81c...99a1).');
  };

  const handleTriggerReorder = (whId: string) => {
    setWarehouses((prev) =>
      prev.map((w) =>
        w.warehouseId === whId ? { ...w, wearableUnitsStock: w.wearableUnitsStock + 50000 } : w
      )
    );
    addLog(`LOGISTICS ACTION: Reorder issued for ${whId}. +50,000 Wearable units dispatched from assembly plant.`);
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
              <span>PROMPT 045 — NATIONAL ROLLOUT, PROVINCIAL EXPANSION & ENTERPRISE OPERATIONS SCALING</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              National Rollout & <span className="text-cyan-400">Enterprise Scaling</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Transitioning ITIS from Gauteng pilot acceptance into a nationwide operational programme. Orchestrating 9 provincial command centres, 12,000+ school onboarding pipelines, national hardware supply chains, multi-tier service desk operations, and 12M+ learner protection governance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-cyan-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">162,500</span>
              <span className="text-xs text-slate-400 font-medium">Protected Learners</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">325 / 12,000</span>
              <span className="text-xs text-slate-400 font-medium">Schools Onboarded</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">9 / 9</span>
              <span className="text-xs text-slate-400 font-medium">Provinces Staged</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('nrpo_dashboard')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'nrpo_dashboard'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-300" />
            <span>1. NRPO Executive Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSubTab('provincial_framework')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'provincial_framework'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>2. 9-Province Expansion Framework</span>
          </button>

          <button
            onClick={() => setActiveSubTab('school_onboarding')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'school_onboarding'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <School className="w-4 h-4 text-amber-400" />
            <span>3. National School Onboarding</span>
          </button>

          <button
            onClick={() => setActiveSubTab('logistics_supply')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'logistics_supply'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4 text-indigo-400" />
            <span>4. Logistics & Supply Chain</span>
          </button>

          <button
            onClick={() => setActiveSubTab('provincial_c3')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'provincial_c3'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4 text-rose-400" />
            <span>5. Provincial Operations Centres</span>
          </button>

          <button
            onClick={() => setActiveSubTab('service_desk')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'service_desk'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Headphones className="w-4 h-4 text-teal-400" />
            <span>6. Enterprise Service Desk (Tier 1-3)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('national_kpis')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'national_kpis'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span>7. National KPI Performance</span>
          </button>

          <button
            onClick={() => setActiveSubTab('financial_scaling')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'financial_scaling'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4 text-fuchsia-400" />
            <span>8. Financial & Scaling Metrics</span>
          </button>

          <button
            onClick={() => setActiveSubTab('communications')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'communications'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-300" />
            <span>9. National Comms Strategy</span>
          </button>

          <button
            onClick={() => setActiveSubTab('continuous_improvement')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'continuous_improvement'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-cyan-300" />
            <span>10. Continuous QA & Improvement</span>
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
            <span>11. NRPO Code Specs & Rules</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
              <span>NRPO National Operations & Governance Log</span>
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

      {/* SUB-TAB 1: NRPO EXECUTIVE DASHBOARD */}
      {activeSubTab === 'nrpo_dashboard' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-400 font-mono text-xs font-bold border border-cyan-800 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>NATIONAL ROLLOUT PROGRAMME OFFICE (NRPO): ACTIVE</span>
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-2">National Programme Governance Directorate</h2>
              <p className="text-xs text-slate-400">Directing multi-provincial expansion, budget allocations, vendor supply chains, and executive government alignment across all 9 provinces.</p>
            </div>

            <button
              onClick={handleExportNationalReport}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-cyan-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT NRPO EXECUTIVE PACKAGE</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">National Active Learners:</span>
              <strong className="text-white text-lg">162,500 Active Wearables</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Onboarded Schools:</span>
              <strong className="text-emerald-400 text-lg">325 / 12,000 Target</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Warehouse Devices Stock:</span>
              <strong className="text-cyan-400 text-lg">250,000 Units</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Service Desk SLA Compliance:</span>
              <strong className="text-emerald-400 text-lg">99.8% Tier 1-3</strong>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PROVINCIAL EXPANSION FRAMEWORK */}
      {activeSubTab === 'provincial_framework' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span>9-Province Readiness & Expansion Scorecard</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {provinces.map((prov) => (
              <div key={prov.provinceCode} className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold text-sm">{prov.provinceName} ({prov.provinceCode})</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">{prov.rolloutPhase}</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">C3 Centre: {prov.regionalCommandCentre} • Director: {prov.provincialDirector}</p>
                  <p className="text-slate-400 text-[11px]">Schools: {prov.onboardedSchools} / {prov.totalSchoolsTarget} • Active Learners: {prov.activeLearners.toLocaleString()}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400 font-bold">{prov.readinessScorePct}% READINESS</span>

                  {prov.rolloutPhase !== 'PHASE_1_LIVE' && (
                    <button
                      onClick={() => handleActivateProvince(prov.provinceCode)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-all"
                    >
                      ACTIVATE PROVINCE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SCHOOL ONBOARDING ENGINE */}
      {activeSubTab === 'school_onboarding' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <School className="w-5 h-5 text-amber-400" />
            <span>National School Onboarding & EMIS Verification Registry</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {schools.map((s) => (
              <div key={s.emisNumber} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-400 font-bold">{s.emisNumber}</span>
                    <span className="text-white font-bold">{s.schoolName} ({s.province})</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Type: {s.schoolType} • Contract: {s.contractSigned ? '✓ SIGNED' : 'PENDING'} • Principal Trained: {s.principalTrained ? '✓ CERTIFIED' : 'IN_PROGRESS'}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400 font-bold">{s.devicesAllocated} Devices Allocated</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px]">
                    {s.onboardingStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: LOGISTICS & SUPPLY CHAIN */}
      {activeSubTab === 'logistics_supply' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Truck className="w-5 h-5 text-indigo-400" />
            <span>National Logistics Hubs & Wearables Supply Inventory</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {warehouses.map((wh) => (
              <div key={wh.warehouseId} className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-indigo-400 font-bold block">{wh.warehouseId} - {wh.location}</span>
                  <p className="text-slate-300">Wearables Stock: <strong className="text-emerald-400">{wh.wearableUnitsStock.toLocaleString()}</strong> • Scanners: {wh.nfcGateScannersStock} • SIMs: {wh.m2mSimCardsStock.toLocaleString()}</p>
                  <p className="text-slate-400 text-[11px]">Monthly Dispatch Rate: {wh.monthlyDispatched.toLocaleString()} units/mo</p>
                </div>

                <button
                  onClick={() => handleTriggerReorder(wh.warehouseId)}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition-all flex items-center space-x-1"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>REORDER STOCK (+50K)</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: PROVINCIAL C3 CENTRES */}
      {activeSubTab === 'provincial_c3' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Building className="w-5 h-5 text-rose-400" />
            <span>Provincial Operations Command Centres (C3) Operating Model</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">24/7 Command Centre Staffing</span>
              <p className="text-slate-300">Minimum 12 operators per shift in major metros (JHB, Durban, Cape Town) for instant SOS dispatch.</p>
              <span className="text-emerald-400 font-bold block">100% OPERATIONAL</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">SAPS CAD & Tactical Dispatch</span>
              <p className="text-slate-300">Direct integration with SAPS 10111 radio dispatch channels and local flying squad units.</p>
              <span className="text-emerald-400 font-bold block">INTEGRATED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Provincial Disaster Management</span>
              <p className="text-slate-300">Cross-departmental escalation protocols for severe weather or localized unrest.</p>
              <span className="text-emerald-400 font-bold block">ACTIVE PROTOCOL</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: SERVICE DESK */}
      {activeSubTab === 'service_desk' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Headphones className="w-5 h-5 text-teal-400" />
            <span>National Multi-Tier Service Desk & SLA Management</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {tickets.map((t) => (
              <div key={t.ticketId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-teal-400 font-bold">{t.ticketId}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">{t.tier}</span>
                  </div>
                  <p className="text-white font-bold mt-1">{t.issueType} ({t.province})</p>
                  <p className="text-slate-400 text-[11px]">Assigned: {t.assignedEngineer} • Response: {t.slaResponseMinutes}m</p>
                </div>

                <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-xs">
                  ✓ {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: NATIONAL KPIS */}
      {activeSubTab === 'national_kpis' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <span>National Learner Protection KPI Dashboard</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">Learner Device Online Ratio</span>
              <strong className="text-emerald-400 text-xl block">99.91%</strong>
              <p className="text-slate-400 text-[11px]">Continuous heartbeat telemetry across all active provinces.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">SAPS Dispatch Speed (Avg)</span>
              <strong className="text-emerald-400 text-xl block">0.89 seconds</strong>
              <p className="text-slate-400 text-[11px]">From SOS button activation to regional C3 workstation alert.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Daily Attendance Scanning</span>
              <strong className="text-white text-xl block">99.7% Capture Rate</strong>
              <p className="text-slate-400 text-[11px]">Automated NFC gate scanner validation at school gates.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: FINANCIAL SCALING */}
      {activeSubTab === 'financial_scaling' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <CreditCard className="w-5 h-5 text-fuchsia-400" />
            <span>Programme Financial Scaling & Cost Per Learner Model</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-fuchsia-400 font-bold block">Cost Per Learner / Month</span>
              <strong className="text-emerald-400 text-xl block">R 14.20</strong>
              <p className="text-slate-400 text-[11px]">Includes wearable hardware amortization, M2M cellular data, and C3 operations.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">National Budget Allocation</span>
              <strong className="text-white text-xl block">R 185,000,000</strong>
              <p className="text-slate-400 text-[11px]">Joint DBE and National Treasury child safety grant funding.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Local Assembly ROI</span>
              <strong className="text-emerald-400 text-xl block">34% Savings</strong>
              <p className="text-slate-400 text-[11px]">Achieved via local SA electronic assembly plants vs full imports.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: COMMUNICATIONS */}
      {activeSubTab === 'communications' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <MessageSquare className="w-5 h-5 text-amber-300" />
            <span>11-Language National Parent & Public Communications Strategy</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-300 font-bold block">11 Official Languages Support</span>
              <p className="text-slate-300">Parent mobile notifications, SMS alerts, and helpdesk IVR available in isiZulu, isiXhosa, Afrikaans, Sepedi, Setswana, English, etc.</p>
              <span className="text-emerald-400 font-bold block">100% COVERAGE</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">School Principal Briefing Kits</span>
              <p className="text-slate-300">Standardized media guidelines, parent consent templates, and crisis communications protocols.</p>
              <span className="text-emerald-400 font-bold block">DISTRIBUTED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">National Broadcast & Radio Ads</span>
              <p className="text-slate-300">SABC TV and community radio educational slots explaining child wearable safety benefits.</p>
              <span className="text-emerald-400 font-bold block">ACTIVE CAMPAIGN</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 10: CONTINUOUS IMPROVEMENT */}
      {activeSubTab === 'continuous_improvement' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <RefreshCw className="w-5 h-5 text-cyan-300" />
            <span>Continuous Quality Assurance & Platform Review Framework</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Quarterly Platform Steering Reviews</span>
              <p className="text-slate-300">Joint review committee with DBE, SAPS, Treasury, and Elite Engineering to prioritize feature backlog.</p>
              <span className="text-emerald-400 font-bold block">Q3 REVIEW COMPLETED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Lessons Learned Repository</span>
              <p className="text-slate-300">Documented 14 operational edge-cases from Gauteng pilot (e.g. signal fading in rural valleys) incorporated into v4.2 firmware.</p>
              <span className="text-emerald-400 font-bold block">LOGGED & UPDATED</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 11: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-cyan-300" />
              <h3 className="text-base font-bold text-white">National Rollout Programme Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {NRPEOS_CODE_SPECS.map((spec) => (
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

      {/* MANDATORY NRPEOS RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-teal-400" />
          <span>10 Mandatory National Expansion & Operational Scaling Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_NRPEOS_RULES.map((rule) => (
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
    </div>
  );
};
