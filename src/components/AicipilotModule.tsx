import React, { useState } from 'react';
import {
  Compass,
  Bot,
  Brain,
  Sparkles,
  MessageSquare,
  Volume2,
  Globe,
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Download,
  Users,
  School,
  Building2,
  Siren,
  ShieldCheck,
  Send,
  Zap,
  Lock,
  RefreshCw,
  FileCode,
  Check,
  RotateCw,
  Layers,
  HelpCircle,
  FileUp,
  Cpu
} from 'lucide-react';
import {
  SAMPLE_COPILOT_QUERIES,
  SAMPLE_INCIDENT_AI_SUMMARIES,
  SAMPLE_KNOWLEDGE_DOCS,
  AICOPILOT_CODE_SPECS,
  CRITICAL_AICOPILOT_RULES,
  AiCopilotQuery,
  IncidentAiSummary,
  AiKnowledgeDocument,
  AiCopilotCodeSpec
} from '../data/aicipilotData';

export const AicipilotModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    | 'c3_assistant'
    | 'parent_assistant'
    | 'school_assistant'
    | 'exec_assistant'
    | 'incident_ai'
    | 'report_writer'
    | 'voice_lingual'
    | 'translation_engine'
    | 'knowledge_rag'
    | 'workflow_automation'
    | 'code_specs'
  >('c3_assistant');

  // Interactive Query State
  const [queries, setQueries] = useState<AiCopilotQuery[]>(SAMPLE_COPILOT_QUERIES);
  const [currentQueryInput, setCurrentQueryInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [selectedPersona, setSelectedPersona] = useState<
    'C3_OPERATOR' | 'PARENT' | 'SCHOOL_ADMIN' | 'GOVT_EXEC' | 'FIELD_TECH'
  >('C3_OPERATOR');

  // Interactive RAG Docs
  const [docs, setDocs] = useState<AiKnowledgeDocument[]>(SAMPLE_KNOWLEDGE_DOCS);
  const [ragSearchQuery, setRagSearchQuery] = useState('');

  // Selected Code Spec
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<AiCopilotCodeSpec>(AICOPILOT_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Submit Query Action
  const handleSendCopilotQuery = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQueryInput.trim()) return;

    addLog(`AI COPILOT: Processing query for [${selectedPersona}] in [${selectedLanguage}] via pgvector RAG...`);

    setTimeout(() => {
      const newQuery: AiCopilotQuery = {
        id: `QRY-${Date.now()}`,
        persona: selectedPersona,
        userQuery: currentQueryInput,
        aiResponse: `[AI Copilot Analysis - ${selectedLanguage}]: Synthesized real-time telemetry from C3 Command Centre. Verified zero SLA breaches for the requested parameters. All geofences active.`,
        language: selectedLanguage,
        retrievedSources: ['c3_telemetry_live', 'saps_cad_gateway', 'learner_profile_registry'],
        executionTimeMs: 128,
        humanApprovalRequired: selectedPersona === 'C3_OPERATOR' && currentQueryInput.toLowerCase().includes('dispatch'),
        approvalStatus: 'AUTO_EXECUTED',
      };

      setQueries((prev) => [newQuery, ...prev]);
      setCurrentQueryInput('');
      addLog(`AI COPILOT RESPONSE: Streaming tokens completed (128ms). 3 vector documents cited.`);
    }, 800);
  };

  // Human Approval Action
  const handleApproveAction = (queryId: string) => {
    setQueries((prev) =>
      prev.map((q) => (q.id === queryId ? { ...q, approvalStatus: 'APPROVED' } : q))
    );
    addLog(`HUMAN APPROVAL GATE: Operator cryptographically approved action for ${queryId}. Executed via MCP tool broker.`);
  };

  // Export AI Report Action
  const handleExportAiReport = () => {
    addLog('AI REPORT WRITER: Generated 12-page Parliamentary Treasury & Safety Briefing PDF (SHA-256: 9b2d...11c4).');
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
              <span>PROMPT 046 — ENTERPRISE AI COPILOT & AUTONOMOUS OPERATIONS PLATFORM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise AI Copilot & <span className="text-cyan-400">Autonomous Operations</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Assisting C3 operators, school principals, parents, and DBE executives with natural language intelligence across all 11 official South African languages. Features pgvector RAG knowledge retrieval, Model Context Protocol (MCP) tool calling, human-in-the-loop approval gates, and 1-click incident report generation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-cyan-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">11</span>
              <span className="text-xs text-slate-400 font-medium">SA Languages</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">sub-200ms</span>
              <span className="text-xs text-slate-400 font-medium">Streaming Token SLA</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">100%</span>
              <span className="text-xs text-slate-400 font-medium">Human-in-Loop Safe</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('c3_assistant')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'c3_assistant'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>1. C3 Operator AI Assistant</span>
          </button>

          <button
            onClick={() => setActiveSubTab('parent_assistant')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'parent_assistant'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>2. Parent Multilingual AI</span>
          </button>

          <button
            onClick={() => setActiveSubTab('school_assistant')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'school_assistant'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <School className="w-4 h-4 text-amber-400" />
            <span>3. School Principal AI</span>
          </button>

          <button
            onClick={() => setActiveSubTab('exec_assistant')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'exec_assistant'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>4. Govt Executive AI Briefings</span>
          </button>

          <button
            onClick={() => setActiveSubTab('incident_ai')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'incident_ai'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Siren className="w-4 h-4 text-rose-400" />
            <span>5. Incident AI & 1-Click Briefs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('report_writer')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'report_writer'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-400" />
            <span>6. AI PDF Report Generator</span>
          </button>

          <button
            onClick={() => setActiveSubTab('voice_lingual')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'voice_lingual'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Volume2 className="w-4 h-4 text-purple-400" />
            <span>7. AI Speech & Voice Assistant</span>
          </button>

          <button
            onClick={() => setActiveSubTab('translation_engine')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'translation_engine'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-fuchsia-400" />
            <span>8. 11-Language Translation</span>
          </button>

          <button
            onClick={() => setActiveSubTab('knowledge_rag')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'knowledge_rag'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4 text-amber-300" />
            <span>9. pgvector RAG Knowledge Base</span>
          </button>

          <button
            onClick={() => setActiveSubTab('workflow_automation')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'workflow_automation'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-300" />
            <span>10. MCP Workflow Automation</span>
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
            <span>11. AI Code Specs & Rules</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
              <span>ITIS AI Copilot Gateway Token Stream Log</span>
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

      {/* INTERACTIVE NATURAL LANGUAGE COPILOT CHAT BOX */}
      {(activeSubTab === 'c3_assistant' ||
        activeSubTab === 'parent_assistant' ||
        activeSubTab === 'school_assistant' ||
        activeSubTab === 'exec_assistant') && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-400 font-mono text-xs font-bold border border-cyan-800 inline-flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTERACTIVE AI COPILOT QUERY CONSOLE</span>
              </span>
              <h2 className="text-xl font-extrabold text-white mt-2">
                Ask ITIS AI Copilot ({activeSubTab.replace('_', ' ').toUpperCase()})
              </h2>
            </div>

            {/* Persona & Language Selectors */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono"
              >
                <option value="English">English</option>
                <option value="isiZulu">isiZulu</option>
                <option value="isiXhosa">isiXhosa</option>
                <option value="Afrikaans">Afrikaans</option>
                <option value="Sepedi">Sepedi</option>
                <option value="Setswana">Setswana</option>
              </select>

              <select
                value={selectedPersona}
                onChange={(e) =>
                  setSelectedPersona(
                    e.target.value as 'C3_OPERATOR' | 'PARENT' | 'SCHOOL_ADMIN' | 'GOVT_EXEC' | 'FIELD_TECH'
                  )
                }
                className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono"
              >
                <option value="C3_OPERATOR">C3 Command Operator</option>
                <option value="PARENT">Parent App User</option>
                <option value="SCHOOL_ADMIN">School Principal</option>
                <option value="GOVT_EXEC">DBE Executive</option>
                <option value="FIELD_TECH">Field Technician</option>
              </select>
            </div>
          </div>

          {/* QUERY INPUT FORM */}
          <form onSubmit={handleSendCopilotQuery} className="flex gap-2">
            <input
              type="text"
              value={currentQueryInput}
              onChange={(e) => setCurrentQueryInput(e.target.value)}
              placeholder={`Ask in ${selectedLanguage} (e.g. "Show all offline devices in Soweto", "Ingane yami ikuphi?", "Generate Q2 budget brief")...`}
              className="flex-1 bg-slate-950 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-cyan-600/30 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT QUERY</span>
            </button>
          </form>

          {/* RESPONSES FEED */}
          <div className="space-y-4 font-mono text-xs">
            {queries.map((q) => (
              <div key={q.id} className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">{q.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                      {q.persona}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px]">
                      {q.language}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[11px]">RAG Time: {q.executionTimeMs}ms</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block font-semibold">User Query:</span>
                  <p className="text-white font-bold">{q.userQuery}</p>
                </div>

                <div className="space-y-1 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 block font-semibold flex items-center space-x-1">
                    <Bot className="w-3.5 h-3.5" />
                    <span>AI Copilot Response:</span>
                  </span>
                  <p className="text-slate-200 leading-relaxed">{q.aiResponse}</p>

                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Cited Sources: {q.retrievedSources.join(', ')}</span>

                    {q.humanApprovalRequired && q.approvalStatus !== 'APPROVED' && (
                      <button
                        onClick={() => handleApproveAction(q.id)}
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs transition-all flex items-center space-x-1"
                      >
                        <Lock className="w-3 h-3" />
                        <span>APPROVE ACTION</span>
                      </button>
                    )}

                    {q.approvalStatus === 'APPROVED' && (
                      <span className="text-emerald-400 font-bold">✓ HUMAN APPROVED</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: INCIDENT AI */}
      {activeSubTab === 'incident_ai' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Siren className="w-5 h-5 text-rose-400" />
            <span>Incident AI Automated Multi-Agency Timeline & Dispatch Briefs</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {SAMPLE_INCIDENT_AI_SUMMARIES.map((inc) => (
              <div key={inc.incidentId} className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-bold text-sm">{inc.incidentId} - {inc.title}</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-xs">
                    Confidence: {inc.confidenceScorePct}%
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block">AI Synthesized Incident Timeline:</span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {inc.aiGeneratedTimeline.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold block">SAPS Flying Squad Auto-Generated Briefing:</span>
                  <p className="text-slate-200">{inc.sapsDispatchBrief}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: REPORT WRITER */}
      {activeSubTab === 'report_writer' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <span>AI Automated Report Writer & Briefing Generator</span>
              </h3>
              <p className="text-xs text-slate-400">Generates formal PDFs for Treasury, SAPS Generals, School Governing Bodies, and Parents.</p>
            </div>

            <button
              onClick={handleExportAiReport}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-teal-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>GENERATE PARLIAMENTARY BRIEFING PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold block">Parliamentary Child Safety Briefing</span>
              <p className="text-slate-300">Automated quarterly synthesis for National Assembly Portfolio Committee on Basic Education.</p>
              <span className="text-emerald-400 font-bold block">✓ READY TO EXPORT</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">School Governing Body (SGB) Monthly Report</span>
              <p className="text-slate-300">Summarizes attendance percentages, geofence breaches, and gate scanner uptime.</p>
              <span className="text-emerald-400 font-bold block">✓ READY TO EXPORT</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">SAPS Flying Squad Forensic Case File</span>
              <p className="text-slate-300">Compiles cryptographic device telemetry and GPS breadcrumbs for court evidence.</p>
              <span className="text-emerald-400 font-bold block">✓ READY TO EXPORT</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: VOICE & MULTI-LINGUAL */}
      {activeSubTab === 'voice_lingual' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Volume2 className="w-5 h-5 text-purple-400" />
            <span>AI Voice Speech Engine (11 Official South African Languages)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">isiZulu Voice Synthesis</span>
              <p className="text-slate-300">Natural voice guidance for parent phone queries and SOS emergency audio playback.</p>
              <span className="text-emerald-400 font-bold block">100% ACCURACY</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Afrikaans Command Voice Engine</span>
              <p className="text-slate-300">Optimized for Western Cape and Northern Cape regional dispatch centers.</p>
              <span className="text-emerald-400 font-bold block">100% ACCURACY</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Sepedi / Setswana Voice Engine</span>
              <p className="text-slate-300">Tailored for Limpopo and North West rural school community broadcasts.</p>
              <span className="text-emerald-400 font-bold block">100% ACCURACY</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: TRANSLATION ENGINE */}
      {activeSubTab === 'translation_engine' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Globe className="w-5 h-5 text-fuchsia-400" />
            <span>Real-time Operational Terminology Translation Engine</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-fuchsia-400 font-bold block">Emergency Terms Preservation:</span>
              <p className="text-slate-300">Translates "Geofence Safe Zone Breach" → "Ukuphuka kweSifunda esivikelwe" without losing tactical meaning.</p>
              <span className="text-emerald-400 font-bold block">✓ VERIFIED PRESERVATION</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: KNOWLEDGE RAG */}
      {activeSubTab === 'knowledge_rag' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Brain className="w-5 h-5 text-amber-300" />
            <span>pgvector Retrieval-Augmented Generation (RAG) Document Store</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {docs.map((d) => (
              <div key={d.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <span className="text-amber-300 font-bold block">{d.id} - {d.title}</span>
                  <p className="text-slate-400 text-[11px]">Vector ID: {d.vectorEmbeddingId} • Category: {d.category}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400 font-bold">{d.relevanceScorePct}% COSINE MATCH</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                    INDEXED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 10: WORKFLOW AUTOMATION */}
      {activeSubTab === 'workflow_automation' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Zap className="w-5 h-5 text-cyan-300" />
            <span>Model Context Protocol (MCP) Workflow Automation Engine</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Automated Field Tech Dispatch</span>
              <p className="text-slate-300">Triggered when battery health drops below 15% across 5+ wearables in a single school cluster.</p>
              <span className="text-emerald-400 font-bold block">MCP BROKER ACTIVE</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Parent Push & SMS Notification Queue</span>
              <p className="text-slate-300">Auto-schedules arrival/departure broadcast messages to parents upon NFC gate scans.</p>
              <span className="text-emerald-400 font-bold block">MCP BROKER ACTIVE</span>
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
              <h3 className="text-base font-bold text-white">Enterprise AI Copilot Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {AICOPILOT_CODE_SPECS.map((spec) => (
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

      {/* MANDATORY AICOPILOT RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-teal-400" />
          <span>10 Mandatory Enterprise AI Safety & Governance Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_AICOPILOT_RULES.map((rule) => (
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
