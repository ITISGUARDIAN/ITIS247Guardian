import React, { useState, useEffect } from 'react';
import { itisWebSocketHub } from '../lib/websocket-hub';
import {
  Building2,
  ShieldCheck,
  Award,
  BarChart3,
  Globe,
  TrendingUp,
  Brain,
  ShieldAlert,
  FileText,
  DollarSign,
  PieChart,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  Printer,
  Eye,
  Maximize2,
  Lock,
  Sparkles,
  ChevronRight,
  Filter,
  Search,
  RefreshCw,
  Users,
  School,
  Cpu,
  Clock,
  Layers,
  Activity,
  Zap,
  Target,
  FileCheck2,
  Sliders,
  HelpCircle
} from 'lucide-react';
import {
  PROVINCIAL_INTELLIGENCE_DATA,
  AI_PREDICTIVE_INSIGHTS,
  EXECUTIVE_CABINET_BRIEFINGS,
  ProvincialInsight,
  AiRiskForecast,
  CabinetBriefingReport
} from '../data/executiveIntelligenceData';
import { SA_LANGUAGES } from '../data/responderMobileData';

export function ExecutiveCabinetModule() {
  // Navigation Tabs inside Executive Intelligence Dashboard
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'situation_room'
    | 'provincial_intel'
    | 'kpis'
    | 'financial_intel'
    | 'ai_insights'
    | 'reports'
    | 'scorecards'
  >('dashboard');

  // Presentation Mode Toggle
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);

  // Selected Province for Deep Dive
  const [selectedProvince, setSelectedProvince] = useState<ProvincialInsight>(
    PROVINCIAL_INTELLIGENCE_DATA[0]
  );

  // Live Telemetry Event Tally
  const [activeNationalIncidentsCount, setActiveNationalIncidentsCount] = useState<number>(3);
  const [lastEventTime, setLastEventTime] = useState<string>('08:14 AM');

  useEffect(() => {
    const unsubscribe = itisWebSocketHub.subscribe('incidents', (msg: any) => {
      if (msg.event === 'SOS_TRIGGERED') {
        setActiveNationalIncidentsCount((prev) => prev + 1);
        setLastEventTime(new Date().toLocaleTimeString());
      }
    });
    return () => unsubscribe();
  }, []);

  // Language Selector
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Watermark Watermark String
  const watermarkText = 'PRESIDENCY & CABINET CONFIDENTIAL • FOR EXECUTIVE USE ONLY';

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden ${
        isPresentationMode ? 'p-8 max-w-none border-none ring-0' : ''
      }`}
    >
      {/* WATERMARK OVERLAY IN PRESENTATION MODE */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center opacity-[0.03] select-none z-50">
        <p className="text-4xl sm:text-6xl font-black text-white transform -rotate-45 text-center font-mono tracking-widest uppercase">
          {watermarkText}
        </p>
      </div>

      {/* HEADER BANNER */}
      <div className="w-full max-w-7xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/50 rounded-2xl flex items-center justify-center text-amber-400 shadow-lg shadow-amber-900/30">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white tracking-wide">
                THE PRESIDENCY & CABINET • EXECUTIVE INTELLIGENCE PLATFORM
              </h1>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                NATIONAL CABINET
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                PROMPT 060
              </span>
            </div>
            <p className="text-xs text-slate-400">
              National Strategic Oversight, RT-57 Financial Intelligence, AI Predictive Hotspots & Cabinet Briefings
            </p>
          </div>
        </div>

        {/* Presentation & Global Controls */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <button
            onClick={() => setIsPresentationMode(!isPresentationMode)}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all ${
              isPresentationMode
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/40'
                : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
            <span>{isPresentationMode ? 'EXIT PRESENTATION MODE' : 'ENTER PRESENTATION MODE'}</span>
          </button>

          {/* Language Selector */}
          <div className="bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-1 text-slate-300">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none font-sans font-semibold cursor-pointer"
            >
              {SA_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* EXECUTIVE PLATFORM CONTAINER FRAME */}
      <div className="w-full max-w-7xl bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-5">
        {/* EXECUTIVE TOP KPI OVERVIEW */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 text-xs font-mono">
          <div>
            <div className="text-slate-400 text-[10px]">PROTECTED LEARNERS</div>
            <div className="text-xl font-black text-white mt-0.5">1,240,000</div>
            <div className="text-[9px] text-emerald-400 font-sans">100% Onboarded Target</div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px]">SCHOOLS COVERED</div>
            <div className="text-xl font-black text-white mt-0.5">24,800</div>
            <div className="text-[9px] text-emerald-400 font-sans">All 9 RSA Provinces</div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px]">RT-57 BUDGET UTILIZATION</div>
            <div className="text-xl font-black text-amber-400 mt-0.5">R 420.0M</div>
            <div className="text-[9px] text-amber-400 font-sans">R338 / Learner / Year</div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px]">NATIONAL RESPONDER SLA</div>
            <div className="text-xl font-black text-emerald-400 mt-0.5">3.8 Mins</div>
            <div className="text-[9px] text-emerald-400 font-sans">SAPS / EMS / Metro Dispatch</div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px]">NATIONAL COMPLIANCE</div>
            <div className="text-xl font-black text-emerald-400 mt-0.5">98.4%</div>
            <div className="text-[9px] text-emerald-400 font-sans">AGSA & POPIA Certified</div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Executive Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('situation_room')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'situation_room' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Cabinet Situation Room</span>
          </button>

          <button
            onClick={() => setActiveTab('provincial_intel')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'provincial_intel' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Provincial Intel</span>
          </button>

          <button
            onClick={() => setActiveTab('kpis')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'kpis' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>National KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab('financial_intel')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'financial_intel' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Financial Intel</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_insights')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'ai_insights' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>AI Predictive Intel</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'reports' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Cabinet Briefings</span>
          </button>

          <button
            onClick={() => setActiveTab('scorecards')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'scorecards' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Scorecards</span>
          </button>
        </div>

        {/* TAB 1: EXECUTIVE NATIONAL OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="font-bold text-white text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                  <span>NATIONAL COVERAGE BY PROVINCE</span>
                  <Globe className="w-4 h-4 text-amber-400" />
                </div>

                <div className="space-y-2">
                  {PROVINCIAL_INTELLIGENCE_DATA.slice(0, 5).map((p) => (
                    <div key={p.code} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{p.name} ({p.code})</div>
                        <div className="text-[10px] text-slate-400">{p.schoolsCount} Schools • {p.protectedLearners.toLocaleString()} Learners</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-bold">{p.safetyScore}% Safety</div>
                        <div className="text-[10px] text-slate-400">SLA: {p.avgResponseTimeMin}m</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="font-bold text-white text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                  <span>AI STRATEGIC RECOMMENDATIONS (GEMINI 2.5)</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>

                <div className="space-y-2 font-sans text-xs">
                  {AI_PREDICTIVE_INSIGHTS.map((insight) => (
                    <div key={insight.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-bold text-amber-400 text-[11px]">{insight.zoneName} ({insight.provinceCode})</span>
                        <span className="bg-amber-950 text-amber-400 px-2 py-0.5 rounded text-[9px] border border-amber-500/40">
                          {insight.probabilityPercent}% PROBABILITY
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{insight.mitigationRecommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CABINET SITUATION ROOM */}
        {activeTab === 'situation_room' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <span>NATIONAL CABINET SITUATION ROOM • LIVE OPERATIONAL STATUS</span>
                </h3>
                <p className="text-xs text-slate-400">Real-time threat level monitoring and inter-agency emergency readiness</p>
              </div>

              <span className="bg-emerald-950 text-emerald-400 px-3 py-1 rounded-xl border border-emerald-500/40 font-bold">
                NATIONAL ALERT LEVEL: GREEN (NORMAL OPERATIONS)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-slate-400 text-[10px]">ACTIVE SOS PANIC ALERTS</div>
                <div className="text-2xl font-black text-amber-400">3 INCIDENTS</div>
                <p className="text-slate-300 font-sans text-[11px]">SAPS & EMS dispatched with sub-3 min response time in Gauteng & KZN.</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-slate-400 text-[10px]">DISPATCHED RESPONDERS</div>
                <div className="text-2xl font-black text-emerald-400">14 PATROL UNITS</div>
                <p className="text-slate-300 font-sans text-[11px]">SAPS Highway Patrol, Metro Police & Netcare 911 active on site.</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-slate-400 text-[10px]">EVIDENCE CUSTODY LINK</div>
                <div className="text-2xl font-black text-blue-400">SHA-256 SECURED</div>
                <p className="text-slate-300 font-sans text-[11px]">Direct integration with SAPS National Crime Intelligence Ledger.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROVINCIAL INTELLIGENCE */}
        {activeTab === 'provincial_intel' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>PROVINCIAL COMPARATIVE INTELLIGENCE (ALL 9 PROVINCES)</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
              {PROVINCIAL_INTELLIGENCE_DATA.map((prov) => (
                <div
                  key={prov.code}
                  onClick={() => setSelectedProvince(prov)}
                  className={`cursor-pointer bg-slate-900 p-4 rounded-2xl border space-y-2 transition-all ${
                    selectedProvince.code === prov.code
                      ? 'border-amber-500 ring-1 ring-amber-500/50 shadow-lg shadow-amber-900/30'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{prov.name} ({prov.code})</span>
                    <span className="bg-slate-800 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                      {prov.riskLevel} RISK
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <div>Learners: <span className="text-white font-bold">{prov.protectedLearners.toLocaleString()}</span></div>
                    <div>Schools: <span className="text-white">{prov.schoolsCount.toLocaleString()}</span></div>
                    <div>SLA Time: <span className="text-emerald-400 font-bold">{prov.avgResponseTimeMin} mins</span></div>
                    <div>Budget Spent: <span className="text-amber-400">R {(prov.budgetSpentZar / 1000000).toFixed(1)}M</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CABINET BRIEFINGS & REPORTS */}
        {activeTab === 'reports' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>EXECUTIVE CABINET BRIEFINGS & PARLIAMENTARY REPORTS</span>
                </h3>
              </div>
            </div>

            <div className="space-y-3 font-mono">
              {EXECUTIVE_CABINET_BRIEFINGS.map((brief) => (
                <div key={brief.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{brief.title}</span>
                    <span className="bg-red-950 text-red-400 text-[10px] px-2.5 py-1 rounded border border-red-500/40 font-bold">
                      {brief.classification}
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs">{brief.summary}</p>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-amber-400 font-bold text-[11px]">KEY ACTION ITEMS FOR CABINET:</div>
                    <ul className="list-disc list-inside text-slate-300 text-[11px] font-sans space-y-0.5">
                      {brief.keyActionItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all">
                      <Download className="w-4 h-4" />
                      <span>EXPORT WATERMARKED CABINET PDF</span>
                    </button>
                    <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all">
                      EXPORT POWERPOINT PRESENTATION
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
