import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  Scale,
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
  TrendingUp,
  FileCode,
  ShieldAlert,
  Sliders,
  Check
} from 'lucide-react';
import {
  SAMPLE_GOVERNANCE_COMMITTEES,
  SAMPLE_ERM_RISKS,
  SAMPLE_PATENTS,
  EBOCGCIP_CODE_SPECS,
  CRITICAL_EBOCGCIP_RULES,
  GovernanceCommitteeRecord,
  EnterpriseRiskHeatmapItem,
  InnovationPatentPipelineItem,
  EbocgcipCodeSpec
} from '../data/ebocgcipData';

export const EbocgcipModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    | 'dashboard'
    | 'governance'
    | 'org_structure'
    | 'hcm_vetting'
    | 'erm_risk'
    | 'audit_compliance'
    | 'strategic_okrs'
    | 'innovation_patents'
    | 'knowledge_sops'
    | 'legal_contracts'
    | 'esg_sustainability'
    | 'bcp_disaster'
    | 'code_specs'
  >('dashboard');

  // State
  const [committees] = useState<GovernanceCommitteeRecord[]>(SAMPLE_GOVERNANCE_COMMITTEES);
  const [ermRisks] = useState<EnterpriseRiskHeatmapItem[]>(SAMPLE_ERM_RISKS);
  const [patents] = useState<InnovationPatentPipelineItem[]>(SAMPLE_PATENTS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<EbocgcipCodeSpec>(EBOCGCIP_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const handleSimulateBoardResolution = (code: string) => {
    addLog(`KING IV GOVERNANCE: Verified cryptographic signature for board resolution ${code}. SHA-256 ledger updated.`);
  };

  const handleExportEsgReport = () => {
    addLog('ESG SUSTAINABILITY: Exported 2026 Annual Corporate Sustainability & BBBEE Level 1 Audit Dossier.');
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 rounded-2xl border border-purple-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 animate-pulse text-purple-400" />
              <span>— ENTERPRISE BUSINESS OPERATIONS, CORPORATE GOVERNANCE & CONTINUOUS INNOVATION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Business Operations & <span className="text-purple-400">Corporate Governance Platform</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Decadal enterprise operating model governing ITIS as a national institution. Enforces King IV corporate governance, PFMA/MFMA compliance, SSA employee security vetting, ERM risk heatmaps, CIPC patent defense, ESG sustainability, and executive balanced scorecards.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-purple-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">King IV</span>
              <span className="text-xs text-slate-400 font-medium">100% Compliant</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">Level 1</span>
              <span className="text-xs text-slate-400 font-medium">BBBEE Contribution</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">ISO 27001</span>
              <span className="text-xs text-slate-400 font-medium">& ISO 22301 Certified</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'dashboard'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-purple-300" />
            <span>Executive Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSubTab('governance')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'governance'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Corporate Governance</span>
          </button>

          <button
            onClick={() => setActiveSubTab('org_structure')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'org_structure'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Org Structure & Leadership</span>
          </button>

          <button
            onClick={() => setActiveSubTab('hcm_vetting')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'hcm_vetting'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>HCM & SSA Vetting</span>
          </button>

          <button
            onClick={() => setActiveSubTab('erm_risk')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'erm_risk'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>ERM Risk Heatmaps</span>
          </button>

          <button
            onClick={() => setActiveSubTab('audit_compliance')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'audit_compliance'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit & ISO Compliance</span>
          </button>

          <button
            onClick={() => setActiveSubTab('strategic_okrs')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'strategic_okrs'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Strategic OKRs & Planning</span>
          </button>

          <button
            onClick={() => setActiveSubTab('innovation_patents')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'innovation_patents'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
            <span>Innovation & Patents</span>
          </button>

          <button
            onClick={() => setActiveSubTab('knowledge_sops')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'knowledge_sops'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Knowledge & SOPs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('legal_contracts')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'legal_contracts'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-cyan-300" />
            <span>Legal & Contracts</span>
          </button>

          <button
            onClick={() => setActiveSubTab('esg_sustainability')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'esg_sustainability'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-300" />
            <span>ESG & Sustainability</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bcp_disaster')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'bcp_disaster'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
            <span>Business Continuity (BCP)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-purple-300" />
            <span>Governance Code Specs</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-purple-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-purple-400" />
              <span>Enterprise Governance & Executive Audit Console</span>
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

      {/* SUB-TAB: DASHBOARD */}
      {activeSubTab === 'dashboard' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <span>Executive Intelligence Dashboard & Decadal Performance Scorecard</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">Protected Learners Target</span>
              <span className="text-2xl font-bold text-white">12.4M</span>
              <span className="text-[11px] text-emerald-400 block">✓ 100% SADC Coverage Goal</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold block">Clean Audit Opinion</span>
              <span className="text-2xl font-bold text-emerald-400">PFMA 100%</span>
              <span className="text-[11px] text-slate-400 block">Auditor-General Verified</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Enterprise Risk Rating</span>
              <span className="text-2xl font-bold text-emerald-400">LOW (1.8/5)</span>
              <span className="text-[11px] text-slate-400 block">Quarterly ERM Heatmap</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">CIPC Patent Portfolio</span>
              <span className="text-2xl font-bold text-purple-300">14 Registered</span>
              <span className="text-[11px] text-slate-400 block">Hardware & AI IP Secured</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: GOVERNANCE */}
      {activeSubTab === 'governance' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Building2 className="w-5 h-5 text-teal-400" />
            <span>King IV Board of Directors & Specialized Governance Committees</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {committees.map((c) => (
              <div key={c.committeeId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-purple-400 font-bold text-xs">{c.committeeId}</span>
                    <h4 className="text-white font-bold">{c.name}</h4>
                    <p className="text-slate-400 text-[11px]">Chairperson: {c.chairperson} ({c.membersCount} Board Members)</p>
                  </div>

                  <span className="px-3 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800 text-xs font-bold">
                    {c.meetingCadence} MEETINGS
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Last Resolution: <strong className="text-white">{c.lastResolutionCode}</strong></span>
                  <button
                    onClick={() => handleSimulateBoardResolution(c.lastResolutionCode)}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs transition-all"
                  >
                    VERIFY BOARD RESOLUTION LEDGER
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB: ORG STRUCTURE */}
      {activeSubTab === 'org_structure' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Users className="w-5 h-5 text-amber-400" />
            <span>Executive Leadership Tier & National Provincial Hierarchy</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Executive Committee (EXCO)</span>
              <p className="text-slate-300">CEO, COO, CTO, CIO, CISO, CFO, Chief AI Officer & Chief Medical/Safety Advisor.</p>
              <span className="text-emerald-400 font-bold block">✓ KING IV EXCO APPROVED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold block">Provincial Operations Directorate</span>
              <p className="text-slate-300">9 Provincial General Managers overseeing regional command centers and dispatch units.</p>
              <span className="text-emerald-400 font-bold block">✓ 9 PROVINCIAL UNITS</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Engineering & Safety Ops</span>
              <p className="text-slate-300">Hardware QA, Firmware DevSecOps, SAPS C3 Dispatch Controllers, and Customer Success.</p>
              <span className="text-emerald-400 font-bold block">✓ 24/7 ACTIVE TEAMS</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: HCM VETTING */}
      {activeSubTab === 'hcm_vetting' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>Human Capital Management & SSA Security Vetting Lifecycle</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">State Security Vetting</span>
              <p className="text-slate-300">Mandatory SSA Top Secret / Confidential vetting for all C3 controllers and database admins.</p>
              <span className="text-emerald-400 font-bold block">✓ 100% SSA CLEARED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Child Protection Register</span>
              <p className="text-slate-300">National Register for Sex Offenders (NRSO) clearance for all school field service personnel.</p>
              <span className="text-emerald-400 font-bold block">✓ NRSO CHECKED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Continuous Certification</span>
              <p className="text-slate-300">Annual re-certification on POPIA, child safety ethics, zero-trust security, and emergency CAD rules.</p>
              <span className="text-emerald-400 font-bold block">✓ ANNUAL RE-CERT</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: ERM RISK */}
      {activeSubTab === 'erm_risk' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>Enterprise Risk Management (ERM) Matrix & Mitigation Heatmaps</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {ermRisks.map((r) => (
              <div key={r.riskId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-rose-400 font-bold">{r.riskId} — [{r.category}]</span>
                    <h4 className="text-white font-bold">{r.title}</h4>
                    <p className="text-slate-400 text-[11px]">Owner: {r.ownerRole}</p>
                  </div>

                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    r.residualRiskRating === 'HIGH' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {r.residualRiskRating} RESIDUAL RISK
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed"><strong className="text-emerald-400">Mitigation:</strong> {r.mitigationPlan}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB: AUDIT & COMPLIANCE */}
      {activeSubTab === 'audit_compliance' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Internal Audit Repository & International ISO Certifications</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">ISO 27001:2022</span>
              <p className="text-slate-300">Information Security Management System (ISMS) certified with zero non-conformances.</p>
              <span className="text-emerald-400 font-bold block">✓ CERTIFIED 2026</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">ISO 22301:2019</span>
              <p className="text-slate-300">Business Continuity Management System (BCMS) certified for 24/7 disaster survival.</p>
              <span className="text-emerald-400 font-bold block">✓ CERTIFIED 2026</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">ISO 9001:2015</span>
              <p className="text-slate-300">Quality Management System (QMS) certified for Durban & Gauteng wearable assembly plants.</p>
              <span className="text-emerald-400 font-bold block">✓ CERTIFIED 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: STRATEGIC OKRs */}
      {activeSubTab === 'strategic_okrs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>Strategic Objectives, Quarterly OKRs & Balanced Scorecards</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">OKR 1: National Rollout Execution</span>
              <p className="text-slate-300">Deploy 3.8M wearables across Gauteng, KZN, and Western Cape by Q4 2026 with 99.99% CAD uptime.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">OKR 2: Zero Data & Child PII Leaks</span>
              <p className="text-slate-300">Maintain 100% POPIA and SITA in-country data residency with zero security incidents.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: INNOVATION PATENTS */}
      {activeSubTab === 'innovation_patents' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span>R&D Pipeline, CIPC Patent Defense & Intellectual Property</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {patents.map((p) => (
              <div key={p.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-yellow-400 font-bold">{p.id}</span>
                    <h4 className="text-white font-bold">{p.title}</h4>
                    <p className="text-slate-400 text-[11px]">Inventor: {p.leadInventor}</p>
                  </div>

                  <span className="px-3 py-1 rounded bg-yellow-950 text-yellow-300 border border-yellow-800 text-xs font-bold">
                    {p.status}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">{p.strategicObjective}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB: KNOWLEDGE SOPS */}
      {activeSubTab === 'knowledge_sops' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <BookOpen className="w-5 h-5 text-fuchsia-400" />
            <span>Knowledge Management, SOPs & Engineering Standards</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-fuchsia-400 font-bold block">SOP-ENG-047: Wearable Factory Calibration</span>
              <p className="text-slate-300">Standard operating procedure for automated LTE / GNSS / Secure Element provisioning at Durban plant.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">SOP-CAD-019: SAPS Flying Squad Dispatch Protocol</span>
              <p className="text-slate-300">Mandatory multi-agency escalation ladder for confirmed Panic SOS trigger events.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: LEGAL CONTRACTS */}
      {activeSubTab === 'legal_contracts' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Scale className="w-5 h-5 text-cyan-300" />
            <span>Legal Governance, Government Contracts & IP Protection</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-300 font-bold block">National Master Service Agreement (MSA)</span>
              <p className="text-slate-300">5-year binding contract with National DBE and Provincial Education Departments under Treasury Practice Note 8.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: ESG SUSTAINABILITY */}
      {activeSubTab === 'esg_sustainability' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-emerald-300" />
                <span>ESG, Carbon-Neutral Datacenters & Local Youth Employment</span>
              </h3>
              <p className="text-xs text-slate-400">Environmental sustainability, BBBEE Level 1 contributorship, and local assembly impact.</p>
            </div>

            <button
              onClick={handleExportEsgReport}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT ESG REPORT</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-300 font-bold block">100% Solar Powered Plants</span>
              <p className="text-slate-300">Gauteng and Durban manufacturing lines run on 100% rooftop solar array with zero carbon emissions.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold block">Local Youth Employment</span>
              <p className="text-slate-300">Over 450 local electronics assembly technician jobs created for TVET college graduates.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Recyclable Medical Silicone</span>
              <p className="text-slate-300">Zero-waste enclosure materials with ISO 10993 hypoallergenic medical silicone recycling loops.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: BCP DISASTER */}
      {activeSubTab === 'bcp_disaster' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <RefreshCw className="w-5 h-5 text-sky-400" />
            <span>Business Continuity Governance (BCP) & Disaster Recovery Exercises</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold block">Bi-Annual National Failover Simulation</span>
              <p className="text-slate-300">Simulates full loss of primary Johannesburg datacenter with zero packet drop auto-switchover to Cape Town failover cluster in under 120ms.</p>
              <span className="text-emerald-400 font-bold block">✓ PASSED JUNE 2026 EXERCISE</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-purple-300" />
              <h3 className="text-base font-bold text-white">Enterprise Corporate Governance Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {EBOCGCIP_CODE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedCodeSpec(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCodeSpec.id === spec.id
                      ? 'bg-purple-600 text-white shadow-md'
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
              <span className="font-mono text-purple-300 font-bold">{selectedCodeSpec.filename}</span>
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

      {/* MANDATORY GOVERNANCE RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-purple-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_EBOCGCIP_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-purple-400">RULE #{rule.id}</span>
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
