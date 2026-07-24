import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  CreditCard,
  TrendingUp,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Download,
  Users,
  Award,
  Globe,
  Lock,
  DollarSign,
  FileCode,
  PieChart,
  BadgePercent,
  Landmark,
  Briefcase,
  Check,
  Scale,
  Sparkles,
  BarChart3
} from 'lucide-react';
import {
  SAMPLE_FINANCIAL_METRICS,
  SAMPLE_GOVERNMENT_TENDERS,
  COMMPROCURE_CODE_SPECS,
  CRITICAL_COMMPROCURE_RULES,
  CommercialFinancialMetric,
  GovernmentTenderRequirement,
  CommProcureCodeSpec
} from '../data/commProcureData';

export const CommProcureModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    | 'financial_model'
    | 'investor_deck'
    | 'govt_tenders'
    | 'sovereignty_security'
    | 'sla_legal'
    | 'gtm_strategy'
    | 'ppp_structure'
    | 'code_specs'
  >('financial_model');

  // State
  const [metrics] = useState<CommercialFinancialMetric[]>(SAMPLE_FINANCIAL_METRICS);
  const [tenders] = useState<GovernmentTenderRequirement[]>(SAMPLE_GOVERNMENT_TENDERS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<CommProcureCodeSpec>(COMMPROCURE_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const handleSimulateInvoiceGen = (tenderCode: string) => {
    addLog(`TREASURY BILLING: Calculated monthly invoice for ${tenderCode} (R14.50/learner). PFMA compliance verified.`);
  };

  const handleExportInvestorPitch = () => {
    addLog('INVESTOR DECK: Exported 25-page Commercialization & Unit Economics Deck (SHA-256: e81a...900f).');
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 rounded-2xl border border-emerald-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>— COMMERCIAL LAUNCH, INVESTOR PLATFORM & GOVERNMENT PROCUREMENT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Commercial Launch & <span className="text-emerald-400">Government Procurement Package</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              National commercialization, Treasury tariff models, investor valuation decks, DBE/SITA tender packages, Public-Private Partnership (PPP) co-funding frameworks, and PFMA/MFMA regulatory compliance architecture for 12.4M South African learners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-emerald-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">R14.50</span>
              <span className="text-xs text-slate-400 font-medium">Monthly Tariff / Learner</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-teal-400">R10.79B</span>
              <span className="text-xs text-slate-400 font-medium">5-Yr Contract Value</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">PFMA</span>
              <span className="text-xs text-slate-400 font-medium">100% Compliant</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('financial_model')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'financial_model'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-300" />
            <span>1. Unit Economics & Financial Model</span>
          </button>

          <button
            onClick={() => setActiveSubTab('investor_deck')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'investor_deck'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <PieChart className="w-4 h-4 text-teal-400" />
            <span>2. Investor & Venture Deck</span>
          </button>

          <button
            onClick={() => setActiveSubTab('govt_tenders')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'govt_tenders'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>3. Government Tender Packages</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sovereignty_security')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'sovereignty_security'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>4. SITA Sovereign Security & POPIA</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sla_legal')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'sla_legal'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>5. Commercial SLA & Legal Framework</span>
          </button>

          <button
            onClick={() => setActiveSubTab('gtm_strategy')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'gtm_strategy'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-fuchsia-400" />
            <span>6. Go-To-Market & Provincial Phasing</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ppp_structure')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'ppp_structure'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4 text-rose-400" />
            <span>7. Public-Private Partnership (PPP)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-emerald-300" />
            <span>8. Commercial Schemas & Billing APIs</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-emerald-400" />
              <span>National Procurement & Treasury Audit Console</span>
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

      {/* SUB-TAB 1: FINANCIAL MODEL */}
      {activeSubTab === 'financial_model' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Unit Economics, National Tariff Structures & Revenue Projections</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-semibold block">{m.metricName}</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-emerald-400">{m.value}</span>
                  <span className="text-xs text-slate-400">{m.unit}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: INVESTOR DECK */}
      {activeSubTab === 'investor_deck' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-teal-400" />
                <span>Commercial Venture Presentation & Valuation Deck</span>
              </h3>
              <p className="text-xs text-slate-400">Total Addressable Market (TAM), regional expansion vectors, and investor return profile.</p>
            </div>

            <button
              onClick={handleExportInvestorPitch}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-teal-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT INVESTOR PITCH DECK</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold block">TAM: Sub-Saharan Africa</span>
              <p className="text-slate-300">140M+ primary and secondary school learners across SADC, East Africa, and West Africa trading blocs.</p>
              <span className="text-emerald-400 font-bold block">$2.4B USD TAM</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">SAM: South African Schools</span>
              <p className="text-slate-300">12.4M learners across 24,000+ public schools managed by national and provincial education departments.</p>
              <span className="text-emerald-400 font-bold block">R2.15B ZAR ARR</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">SOM: Phase 1 Key Provinces</span>
              <p className="text-slate-300">3.8M learners in priority crime-affected corridors (Gauteng, KZN, Western Cape).</p>
              <span className="text-emerald-400 font-bold block">R661M ZAR ARR</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: GOVT TENDERS */}
      {activeSubTab === 'govt_tenders' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Landmark className="w-5 h-5 text-amber-400" />
            <span>National Treasury, DBE & SITA Tender Procurement Dossiers</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {tenders.map((t) => (
              <div key={t.tenderCode} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-amber-400 font-bold text-sm">{t.tenderCode}</span>
                    <p className="text-white font-bold">{t.title}</p>
                    <p className="text-slate-400 text-[11px]">Issuing Authority: {t.issuingBody}</p>
                  </div>

                  <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                    {t.complianceScorePct}% COMPLIANCE
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300">
                  <span>Contract Value: <strong className="text-white">R {(t.procurementValueZar / 1e6).toFixed(0)} Million ZAR / yr</strong></span>
                  <button
                    onClick={() => handleSimulateInvoiceGen(t.tenderCode)}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs transition-all"
                  >
                    CALCULATE PROVINCIAL INVOICE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SOVEREIGNTY SECURITY */}
      {activeSubTab === 'sovereignty_security' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span>SITA Sovereign Cloud Security, SSA Vetting & POPIA Data Protection</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">In-Country Data Residency</span>
              <p className="text-slate-300">100% of encrypted learner GPS telemetry, PII, and incident video logs stored strictly inside RSA borders.</p>
              <span className="text-emerald-400 font-bold block">✓ SITA APPROVED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">SSA Top Secret Vetting</span>
              <p className="text-slate-300">Platform operational staff and C3 dispatch supervisors cleared by State Security Agency (SSA).</p>
              <span className="text-emerald-400 font-bold block">✓ SSA CLEARED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">POPIA Minor PII Compliance</span>
              <p className="text-slate-300">Strict end-to-end AES-256 encryption with zero commercial data sharing or advertising monetisation.</p>
              <span className="text-emerald-400 font-bold block">✓ POPIA AUDITED</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: SLA LEGAL */}
      {activeSubTab === 'sla_legal' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Scale className="w-5 h-5 text-cyan-400" />
            <span>Master Service Agreement (MSA) & Commercial SLA Guarantees</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">99.99% Platform Uptime SLA</span>
              <p className="text-slate-300">Guaranteed multi-region failover across Johannesburg and Cape Town datacenters with financial penalties for downtime.</p>
              <span className="text-emerald-400 font-bold block">✓ LIQUIDATED DAMAGES</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">sub-900ms SAPS CAD Response</span>
              <p className="text-slate-300">API response time guarantee for multi-agency dispatch feeds under SAPS Flying Squad SLA contract.</p>
              <span className="text-emerald-400 font-bold block">✓ sub-900ms SPEED SLA</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: GTM STRATEGY */}
      {activeSubTab === 'gtm_strategy' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Globe className="w-5 h-5 text-fuchsia-400" />
            <span>Go-To-Market (GTM) Provincial Rollout Schedule</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-fuchsia-400 font-bold block">Phase 1: Gauteng (GDE)</span>
              <p className="text-slate-300">1.8M learners across Johannesburg, Soweto, Pretoria & Ekurhuleni safe corridors.</p>
              <span className="text-emerald-400 font-bold block">Q3 2026 ROLLOUT</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Phase 2: KwaZulu-Natal (KZNDE)</span>
              <p className="text-slate-300">1.5M learners across eThekwini, Pietermaritzburg, and KZN coastal school districts.</p>
              <span className="text-emerald-400 font-bold block">Q4 2026 ROLLOUT</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Phase 3: Western Cape & National</span>
              <p className="text-slate-300">Remaining 9.1M learners across WC, EC, Free State, Limpopo, Mpumalanga, NW, and NC.</p>
              <span className="text-emerald-400 font-bold block">2027 NATIONAL COMPLETION</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: PPP STRUCTURE */}
      {activeSubTab === 'ppp_structure' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Briefcase className="w-5 h-5 text-rose-400" />
            <span>Public-Private Partnership (PPP) Co-Sponsorship Model</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">Corporate Social Investment (CSI) & Telecom Co-Funding:</span>
              <p className="text-slate-300">Private telecom operators (MTN, Vodacom) and insurance firms co-subsidize monthly tariffs in quintile 1-3 rural schools in exchange for ESG carbon and child safety credits.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-emerald-300" />
              <h3 className="text-base font-bold text-white">Commercial Billing & Procurement Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {COMMPROCURE_CODE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedCodeSpec(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCodeSpec.id === spec.id
                      ? 'bg-emerald-600 text-white shadow-md'
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
              <span className="font-mono text-emerald-300 font-bold">{selectedCodeSpec.filename}</span>
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

      {/* MANDATORY COMMERCIAL & PROCUREMENT RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-emerald-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_COMMPROCURE_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400">RULE #{rule.id}</span>
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
