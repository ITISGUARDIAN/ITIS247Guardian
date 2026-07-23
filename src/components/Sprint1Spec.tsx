import React, { useState } from 'react';
import {
  FileCode,
  Server,
  Layout,
  Database,
  Radio,
  CheckSquare,
  Code2,
  Lock,
  Target,
  Users,
  CheckCircle2,
  Workflow,
  ShieldCheck,
  Zap,
  Activity,
  Smartphone,
  Cpu,
  Clock,
  AlertOctagon,
  Flame,
  Shield,
  Layers,
  Terminal,
  Settings
} from 'lucide-react';
import {
  SPRINT_GOALS,
  USER_STORIES,
  FUNCTIONAL_REQUIREMENTS,
  SPRINT1_BACKEND_MODULES,
  SPRINT1_FRONTEND_MODULES,
  SPRINT1_FLUTTER_MODULES,
  SPRINT1_DATABASE_TABLES,
  SPRINT1_REST_ENDPOINTS,
  SPRINT1_WEBSOCKET_EVENTS,
  SPRINT1_MQTT_TOPICS,
  BACKGROUND_WORKERS,
  SCHEDULED_JOBS,
  PROCESS_FLOWS,
  ERROR_HANDLING_STRATEGY,
  SECURITY_REQUIREMENTS,
  TESTING_STRATEGY,
  DEPLOYMENT_CHECKLIST,
  DEFINITION_OF_DONE,
  SPRINT1_ACCEPTANCE_CRITERIA
} from '../data/sprint1Data';

export const Sprint1Spec: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'goals_stories' | 'modules' | 'data_apis' | 'flows' | 'ops_qa'>('goals_stories');

  return (
    <div className="space-y-8 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center space-x-3 mb-3">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <FileCode className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">
            Prompt 014 Engineering Blueprint Contract
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Sprint 1 Engineering Implementation Specification
        </h2>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-4xl leading-relaxed">
          Comprehensive 23-point specification contract defining goals, user stories, backend/frontend/mobile modules, PostgreSQL/PostGIS schema, REST APIs, WebSockets, MQTT, background workers, process flows, security, testing, and definition of done.
        </p>

        {/* Navigation Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('goals_stories')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'goals_stories'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>1-4. Goals, Stories & FRs</span>
          </button>

          <button
            onClick={() => setActiveTab('modules')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'modules'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>5-7, 12-13. Modules & Workers</span>
          </button>

          <button
            onClick={() => setActiveTab('data_apis')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'data_apis'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>8-11. Database & APIs</span>
          </button>

          <button
            onClick={() => setActiveTab('flows')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'flows'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>14-18. Process Flows</span>
          </button>

          <button
            onClick={() => setActiveTab('ops_qa')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ops_qa'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>19-23. Ops, Security & DoD</span>
          </button>
        </div>
      </div>

      {/* TAB 1: GOALS, STORIES, & FUNCTIONAL REQUIREMENTS */}
      {activeTab === 'goals_stories' && (
        <div className="space-y-6">
          {/* Section 1: Sprint Goals */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-indigo-400" />
              1. Sprint 1 Objective & Core Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SPRINT_GOALS.map((goal, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{goal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: User Stories */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-cyan-400" />
              2. Sprint 1 User Stories
            </h3>
            <div className="space-y-3">
              {USER_STORIES.map((us) => (
                <div key={us.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {us.id}
                      </span>
                      <span className="text-xs font-bold text-white">As a {us.role},</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      I want to <span className="text-cyan-200 font-semibold">{us.want}</span>, <span className="italic text-slate-400">so that {us.soThat}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50 self-start md:self-center">
                    {us.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Functional Requirements */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-amber-400" />
              3. Functional Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FUNCTIONAL_REQUIREMENTS.map((fr) => (
                <div key={fr.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                      {fr.id}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-amber-400">{fr.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{fr.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{fr.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MODULES & WORKERS */}
      {activeTab === 'modules' && (
        <div className="space-y-6">
          {/* Section 5: Backend Modules */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-indigo-400" />
              5. Backend Microservices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPRINT1_BACKEND_MODULES.map((m) => (
                <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {m.id}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase">{m.type}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{m.name}</h4>
                  <p className="text-xs text-slate-400">{m.description}</p>
                  <ul className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-800/80">
                    {m.keyResponsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6 & 7: Frontend & Flutter Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Layout className="w-5 h-5 text-cyan-400" />
                6. Web Frontend Modules
              </h3>
              <div className="space-y-3">
                {SPRINT1_FRONTEND_MODULES.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-300">{m.id} - {m.name}</span>
                      <span className="text-[10px] font-bold text-cyan-400">{m.type}</span>
                    </div>
                    <p className="text-xs text-slate-400">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                7. Flutter Mobile Modules
              </h3>
              <div className="space-y-3">
                {SPRINT1_FLUTTER_MODULES.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-300">{m.id} - {m.name}</span>
                      <span className="text-[10px] font-bold text-emerald-400">{m.type}</span>
                    </div>
                    <p className="text-xs text-slate-400">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 12 & 13: Background Workers & Scheduled Jobs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                12. Background Queue Workers
              </h3>
              <div className="space-y-3">
                {BACKGROUND_WORKERS.map((w, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{w.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        {w.rate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-indigo-400" />
                13. Scheduled Cron Jobs
              </h3>
              <div className="space-y-3">
                {SCHEDULED_JOBS.map((j, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{j.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {j.cron}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{j.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DATABASE & APIS */}
      {activeTab === 'data_apis' && (
        <div className="space-y-6">
          {/* Section 8: PostgreSQL Tables */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-emerald-400" />
              8. PostgreSQL & PostGIS Tables Required
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SPRINT1_DATABASE_TABLES.map((tbl) => (
                <div key={tbl.name} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-emerald-400">{tbl.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {tbl.primaryKey}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{tbl.description}</p>
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Columns:</span>
                    <div className="flex flex-wrap gap-1">
                      {tbl.columns.map((c, i) => (
                        <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 9: REST API Endpoints */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-indigo-400" />
              9. REST API Endpoints
            </h3>
            <div className="space-y-3">
              {SPRINT1_REST_ENDPOINTS.map((api, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                        api.method === 'POST' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                      }`}>
                        {api.method}
                      </span>
                      <span className="text-xs font-bold font-mono text-white">{api.path}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{api.auth}</span>
                  </div>
                  <p className="text-xs text-slate-300">{api.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 10 & 11: WebSockets & MQTT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Radio className="w-5 h-5 text-cyan-400" />
                10. WebSocket Events
              </h3>
              <div className="space-y-3">
                {SPRINT1_WEBSOCKET_EVENTS.map((rt, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-bold font-mono text-cyan-300">{rt.topicOrEvent}</span>
                    <p className="text-xs text-slate-400">{rt.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Radio className="w-5 h-5 text-amber-400" />
                11. MQTT Topics
              </h3>
              <div className="space-y-3">
                {SPRINT1_MQTT_TOPICS.map((rt, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-bold font-mono text-amber-300">{rt.topicOrEvent}</span>
                    <p className="text-xs text-slate-400">{rt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PROCESS FLOWS */}
      {activeTab === 'flows' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Workflow className="w-5 h-5 text-indigo-400" />
              14-18. System Process Flows
            </h3>
            <div className="space-y-6">
              {PROCESS_FLOWS.map((flow) => (
                <div key={flow.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">{flow.id} - {flow.title}</span>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
                    {flow.steps.map((s) => (
                      <div key={s.step} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>Step 0{s.step}</span>
                          <span className="text-indigo-300 font-bold">{s.actor}</span>
                        </div>
                        <p className="text-xs font-bold text-white leading-snug">{s.action}</p>
                        <p className="text-[10px] text-emerald-400 pt-1 border-t border-slate-800">{s.outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: OPS, SECURITY & QA */}
      {activeTab === 'ops_qa' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <AlertOctagon className="w-5 h-5 text-red-400" />
                19. Error Handling Strategy
              </h3>
              <div className="space-y-3">
                {ERROR_HANDLING_STRATEGY.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-emerald-400" />
                20. Security Requirements
              </h3>
              <div className="space-y-3">
                {SECURITY_REQUIREMENTS.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <CheckSquare className="w-5 h-5 text-cyan-400" />
                21. Testing Strategy
              </h3>
              <div className="space-y-3">
                {TESTING_STRATEGY.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-amber-400" />
                22. Deployment Checklist
              </h3>
              <div className="space-y-3">
                {DEPLOYMENT_CHECKLIST.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Definition of Done & Acceptance Criteria */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                23. Definition of Done (DoD) & Acceptance Criteria
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEFINITION_OF_DONE.items.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-emerald-950 space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-6">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase text-slate-400 block">Sprint 1 Acceptance Criteria (AC-01 to AC-04)</span>
              <div className="space-y-3">
                {SPRINT1_ACCEPTANCE_CRITERIA.map((ac) => (
                  <div key={ac.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">{ac.id} - {ac.feature}</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                        <span className="font-bold text-amber-400">GIVEN: </span>
                        <span className="text-slate-300">{ac.given}</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                        <span className="font-bold text-indigo-400">WHEN: </span>
                        <span className="text-slate-300">{ac.when}</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                        <span className="font-bold text-emerald-400">THEN: </span>
                        <span className="text-slate-300">{ac.then}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
