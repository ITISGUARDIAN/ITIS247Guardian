import React, { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  MapPin,
  Layers,
  FileCode,
  Award,
  Database,
  Radio,
  Sliders,
  Check,
  Copy,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  QrCode,
  PhoneCall,
  UserCheck,
  Zap,
  Activity,
  FileText,
  Building,
  Truck,
  Shield,
  RefreshCw,
  GitMerge,
  Eye,
  Send,
  Lock
} from 'lucide-react';
import {
  IncidentState,
  IncidentPriority,
  IncidentRecord,
  SAMPLE_INCIDENTS,
  SAMPLE_RESPONSE_DOCKET,
  EIOE_SLA_METRICS,
  EIOE_CODE_SPECS,
  CRITICAL_EIOE_RULES
} from '../data/eioeModuleData';

export function EioeModule() {
  const [activeSubTab, setActiveSubTab] = useState<'console' | 'docket' | 'statemachine' | 'merge' | 'sla' | 'database' | 'nestjs'>('console');

  // Active Incidents State
  const [incidents, setIncidents] = useState<IncidentRecord[]>(SAMPLE_INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('ITIS-2026-GP-00000045');

  // Filter state
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [stateFilter, setStateFilter] = useState<string>('ALL');

  // Merge state simulator
  const [mergedSuccess, setMergedSuccess] = useState<boolean>(false);

  // New Note state
  const [noteText, setNoteText] = useState<string>('');

  // Spec Code State
  const [selectedSpecId, setSelectedSpecId] = useState<number>(1);
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // State Machine Transition Handler
  const handleTransitionState = (incidentId: string, nextState: IncidentState) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          const newEntry = {
            id: `tl-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            actor: 'Op. Command Centre',
            action: `TRANSITION_${nextState}`,
            details: `Manual status escalation to ${nextState} verified.`,
            evidenceHash: `sha256-${Math.random().toString(36).substring(2, 10)}`,
          };
          return {
            ...inc,
            state: nextState,
            timeline: [...inc.timeline, newEntry],
          };
        }
        return inc;
      })
    );
    showToast(`Incident ${incidentId} transitioned to ${nextState}`);
  };

  // Add Note Handler
  const handleAddNote = (incidentId: string) => {
    if (!noteText.trim()) return;
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          const newEntry = {
            id: `tl-note-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            actor: 'Op. J. Sithole',
            action: 'NOTE_ADDED',
            details: `Operator Note: ${noteText}`,
          };
          return { ...inc, timeline: [...inc.timeline, newEntry] };
        }
        return inc;
      })
    );
    setNoteText('');
    showToast(`Note logged to incident ${incidentId}`);
  };

  // Simulate Triggering a New CSDE Red Incident
  const handleTriggerNewRedIncident = () => {
    const newId = `ITIS-2026-GP-0000${Math.floor(1000 + Math.random() * 9000)}`;
    const newInc: IncidentRecord = {
      id: newId,
      learnerId: 'itis-lrn-2026-088',
      learnerName: 'Bongani Nkosi',
      schoolName: 'Alexandra High School',
      province: 'Gauteng (GP)',
      district: 'Johannesburg East',
      incidentType: 'SOS_BUTTON',
      priority: 'PRIORITY_1',
      state: 'NEW',
      decisionId: `csde-eval-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      riskScore: 98,
      threatLevel: 'LEVEL_4_RED',
      createdTimestamp: 'Just now',
      lastKnownLat: -26.1021,
      lastKnownLng: 28.0931,
      lastKnownHeadingSpeed: '18 km/h @ North-East',
      batteryPercent: 91,
      slaRemainingSeconds: 30,
      timeline: [
        {
          id: 'tl-init',
          timestamp: 'Just now',
          actor: 'CSDE Decision Engine',
          action: 'INCIDENT_CREATED',
          details: 'LEVEL_4_RED Decision Event received. Incident ticket auto-generated.',
          evidenceHash: `sha256-init-${Math.random().toString(36).substring(2, 8)}`,
        },
      ],
    };

    setIncidents([newInc, ...incidents]);
    setSelectedIncidentId(newId);
    showToast(`CRITICAL: New Emergency Incident ${newId} created automatically from CSDE RED Event!`);
  };

  // Handle Multi-Child Merging Simulator
  const handleSimulateMerge = () => {
    setMergedSuccess(true);
    showToast(`Successfully merged 3 child bus kidnapping incidents into Master Incident ITIS-2026-GP-00000045!`);
  };

  const selectedIncident = incidents.find((inc) => inc.id === selectedIncidentId) || incidents[0];
  const activeSpec = EIOE_CODE_SPECS.find((s) => s.id === selectedSpecId) || EIOE_CODE_SPECS[0];

  const filteredIncidents = incidents.filter((inc) => {
    if (priorityFilter !== 'ALL' && inc.priority !== priorityFilter) return false;
    if (stateFilter !== 'ALL' && inc.state !== stateFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-red-400/40 backdrop-blur-md flex items-center space-x-3 animate-bounce">
          <ShieldAlert className="w-5 h-5 text-red-200" />
          <span className="font-medium text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 border border-red-800/50 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs font-semibold rounded-full border border-red-500/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> PROMPT 026
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> Emergency Incident Orchestration Engine (EIOE)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Command Centre Incident Orchestration & Response Brain
            </h1>
            <p className="text-slate-300 max-w-3xl text-sm leading-relaxed">
              Consumes verified CSDE RED events to create, prioritize, escalate, docket, and coordinate rescue incidents across South Africa with 100% evidentiary integrity.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleTriggerNewRedIncident}
              className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-red-600/30 transition-all active:scale-95 animate-pulse"
            >
              <Zap className="w-4 h-4" />
              <span>Simulate CSDE RED Event</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Incident Creation</div>
            <div className="text-xl font-bold text-emerald-400 mt-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              &lt; 100 ms SLA
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Timeline Latency</div>
            <div className="text-xl font-bold text-indigo-400 mt-1 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              &lt; 20 ms SLA
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Lifecycle States</div>
            <div className="text-xl font-bold text-cyan-400 mt-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              11 Strict States
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Evidentiary Hash</div>
            <div className="text-xl font-bold text-amber-400 mt-1 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              SHA-256 Immutable
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
            <div className="text-xs text-slate-400 font-medium">Multi-Child Merging</div>
            <div className="text-xs font-bold text-slate-200 mt-1.5 flex items-center gap-1.5">
              <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
              Master & Linked Learners
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center space-x-1 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('console')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'console'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Command Centre Incident Queue</span>
        </button>

        <button
          onClick={() => setActiveSubTab('docket')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'docket'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Response Docket Packet</span>
        </button>

        <button
          onClick={() => setActiveSubTab('statemachine')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'statemachine'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>11-State Machine Visualizer</span>
        </button>

        <button
          onClick={() => setActiveSubTab('merge')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'merge'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <GitMerge className="w-4 h-4" />
          <span>Multi-Child Incident Merging</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sla')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'sla'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>SLA Clocks & Compliance</span>
        </button>

        <button
          onClick={() => setActiveSubTab('database')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'database'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>EIOE Database Schema</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nestjs')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'nestjs'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span>NestJS EIOE Specs</span>
        </button>
      </div>

      {/* SUBTAB 1: COMMAND CENTRE QUEUE */}
      {activeSubTab === 'console' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Incidents List Queue */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-400 animate-pulse" /> Active Emergency Queue ({filteredIncidents.length})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Real-time triage feed sorted by SLA and Priority</p>
              </div>
            </div>

            {/* Queue Filters */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-bold block mb-1">Priority Filter</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-1.5 text-xs focus:ring-red-500"
                >
                  <option value="ALL">All Priorities</option>
                  <option value="PRIORITY_1">PRIORITY_1 (Critical)</option>
                  <option value="PRIORITY_2">PRIORITY_2 (High)</option>
                  <option value="PRIORITY_3">PRIORITY_3 (Medium)</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold block mb-1">State Filter</span>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-1.5 text-xs focus:ring-red-500"
                >
                  <option value="ALL">All States</option>
                  <option value="NEW">NEW</option>
                  <option value="VALIDATED">VALIDATED</option>
                  <option value="DISPATCH_PENDING">DISPATCH_PENDING</option>
                  <option value="RESPONDER_EN_ROUTE">RESPONDER_EN_ROUTE</option>
                </select>
              </div>
            </div>

            {/* Incidents Stack */}
            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {filteredIncidents.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncidentId(inc.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedIncidentId === inc.id
                      ? 'bg-slate-800 border-red-500/80 ring-2 ring-red-500/30 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-red-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> {inc.id}
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inc.priority === 'PRIORITY_1'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {inc.priority}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <strong className="text-sm font-bold text-white block">{inc.learnerName}</strong>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-500" /> {inc.schoolName}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-900 font-mono text-indigo-300 font-bold">
                      {inc.state}
                    </span>

                    <span className="text-amber-400 font-mono font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> SLA: {inc.slaRemainingSeconds}s
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Incident Detail & Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-red-400">{selectedIncident.id}</span>
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-bold border border-red-500/30">
                      {selectedIncident.priority}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white mt-1">{selectedIncident.learnerName}</h2>
                  <p className="text-xs text-slate-400">{selectedIncident.schoolName} • {selectedIncident.province}</p>
                </div>

                {/* State Badge */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Current State</span>
                  <span className="text-sm font-mono font-extrabold text-emerald-400">{selectedIncident.state}</span>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">CSDE Decision ID</span>
                  <strong className="text-indigo-300 font-mono">{selectedIncident.decisionId}</strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Risk Score</span>
                  <strong className="text-red-400 font-extrabold">{selectedIncident.riskScore} / 100 ({selectedIncident.threatLevel})</strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Last Kinematics</span>
                  <strong className="text-slate-200">{selectedIncident.lastKnownHeadingSpeed}</strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Assigned Operator</span>
                  <strong className="text-slate-200">{selectedIncident.assignedOperator || 'Unassigned'}</strong>
                </div>
              </div>

              {/* Interactive State Transition Actions */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Execute State Transition:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => handleTransitionState(selectedIncident.id, 'VALIDATED')}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20"
                  >
                    Set VALIDATED
                  </button>

                  <button
                    onClick={() => handleTransitionState(selectedIncident.id, 'DISPATCH_PENDING')}
                    className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all shadow-md shadow-amber-600/20"
                  >
                    Set DISPATCH_PENDING
                  </button>

                  <button
                    onClick={() => handleTransitionState(selectedIncident.id, 'RESPONDER_EN_ROUTE')}
                    className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-md shadow-cyan-600/20"
                  >
                    Set RESPONDER_EN_ROUTE
                  </button>

                  <button
                    onClick={() => handleTransitionState(selectedIncident.id, 'CHILD_SAFE')}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-md shadow-emerald-600/20"
                  >
                    Set CHILD_SAFE
                  </button>

                  <button
                    onClick={() => handleTransitionState(selectedIncident.id, 'FALSE_ALARM')}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold border border-slate-700 transition-all"
                  >
                    Set FALSE_ALARM
                  </button>
                </div>
              </div>

              {/* Timeline Feed */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Immutable Evidentiary Timeline:</span>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedIncident.timeline.map((entry) => (
                    <div key={entry.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-mono text-indigo-400 font-bold">{entry.timestamp} • {entry.actor}</span>
                        <span className="px-2 py-0.5 bg-slate-800 text-[10px] rounded font-mono text-slate-300">{entry.action}</span>
                      </div>
                      <p className="text-slate-200">{entry.details}</p>
                      {entry.evidenceHash && (
                        <span className="text-[10px] font-mono text-indigo-400 block pt-0.5">{entry.evidenceHash}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Note Bar */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Enter operator note or dispatch observation..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-red-500"
                />
                <button
                  onClick={() => handleAddNote(selectedIncident.id)}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: RESPONSE DOCKET PACKET */}
      {activeSubTab === 'docket' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30">
                  AUTOMATED OPERATIONAL PACKET
                </span>
                <span className="text-xs font-mono text-slate-400">Incident: {SAMPLE_RESPONSE_DOCKET.incidentId}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-1">Operational Emergency Response Docket</h2>
              <p className="text-xs text-slate-400">Standardized packet auto-generated for emergency dispatch units and SAPS responders</p>
            </div>

            <button
              onClick={() => showToast('Response Docket PDF / Digital Packet Exported for SAPS Dispatcher')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <FileText className="w-4 h-4" />
              <span>Export Certified Docket</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Learner Profile & Photos */}
            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex items-center space-x-4">
                <img
                  src={SAMPLE_RESPONSE_DOCKET.learnerProfile.photoUrl}
                  alt="Learner"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-red-500/80 shadow-lg"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{SAMPLE_RESPONSE_DOCKET.learnerProfile.fullName}</h3>
                  <span className="text-xs text-slate-400 block">{SAMPLE_RESPONSE_DOCKET.learnerProfile.dateOfBirth}</span>
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-300 text-[10px] font-bold rounded mt-1 inline-block">
                    Blood Type: {SAMPLE_RESPONSE_DOCKET.learnerProfile.bloodType}
                  </span>
                </div>
              </div>

              {/* Medical Alerts */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Medical Alerts:</span>
                <div className="space-y-1">
                  {SAMPLE_RESPONSE_DOCKET.learnerProfile.medicalAlerts.map((alert, idx) => (
                    <div key={idx} className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs font-bold text-amber-200 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      {alert}
                    </div>
                  ))}
                </div>
              </div>

              {/* Guardian Contact Info */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <span className="font-bold text-slate-400 block uppercase tracking-wider">Guardian Contact:</span>
                <div className="p-3 bg-slate-900 rounded-xl space-y-1 text-slate-300">
                  <div><strong>Name:</strong> {SAMPLE_RESPONSE_DOCKET.learnerProfile.primaryGuardianName}</div>
                  <div><strong>Primary Phone:</strong> <span className="text-emerald-400 font-mono font-bold">{SAMPLE_RESPONSE_DOCKET.learnerProfile.primaryGuardianPhone}</span></div>
                  <div><strong>Secondary Phone:</strong> <span className="text-slate-400 font-mono">{SAMPLE_RESPONSE_DOCKET.learnerProfile.secondaryGuardianPhone}</span></div>
                </div>
              </div>

              {/* QR Code Validation */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Evidentiary QR Docket Hash</span>
                <img
                  src={SAMPLE_RESPONSE_DOCKET.docketQrCodeUrl}
                  alt="QR Code"
                  className="w-28 h-28 mx-auto rounded-xl border border-slate-700 bg-white p-1"
                />
                <span className="text-[10px] font-mono text-indigo-300 block truncate">
                  {SAMPLE_RESPONSE_DOCKET.decisionSnapshot.evidenceHash}
                </span>
              </div>
            </div>

            {/* Right: Transport, Telemetry & Decision Snapshots */}
            <div className="lg:col-span-8 space-y-6">
              {/* Transport Vehicle Snapshot */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-400" /> Transport Vehicle Profile
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Vehicle Reg</span>
                    <strong className="text-white font-mono">{SAMPLE_RESPONSE_DOCKET.transportVehicle?.regNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Vehicle Type</span>
                    <strong className="text-slate-300">{SAMPLE_RESPONSE_DOCKET.transportVehicle?.vehicleType}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Driver Name</span>
                    <strong className="text-slate-300">{SAMPLE_RESPONSE_DOCKET.transportVehicle?.driverName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Driver Phone</span>
                    <strong className="text-emerald-400 font-mono">{SAMPLE_RESPONSE_DOCKET.transportVehicle?.driverPhone}</strong>
                  </div>
                </div>
              </div>

              {/* Telemetry Snapshot */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400" /> Telemetry & GPS Snapshot
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Coordinates</span>
                    <strong className="text-emerald-400 font-mono">
                      {SAMPLE_RESPONSE_DOCKET.telemetrySnapshot.lat}, {SAMPLE_RESPONSE_DOCKET.telemetrySnapshot.lng}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Speed & Heading</span>
                    <strong className="text-white">
                      {SAMPLE_RESPONSE_DOCKET.telemetrySnapshot.speedKmh} km/h @ {SAMPLE_RESPONSE_DOCKET.telemetrySnapshot.headingDegrees}°
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Battery Status</span>
                    <strong className="text-emerald-400">{SAMPLE_RESPONSE_DOCKET.telemetrySnapshot.batteryLevelPercent}%</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Signal Quality</span>
                    <strong className="text-indigo-300">{SAMPLE_RESPONSE_DOCKET.telemetrySnapshot.signalQuality}</strong>
                  </div>
                </div>
              </div>

              {/* Decision Snapshot */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" /> CSDE Decision Engine Context
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Trigger Reason:</strong> {SAMPLE_RESPONSE_DOCKET.decisionSnapshot.threatReason}
                </p>
                <div className="pt-2 text-[10px] font-mono text-indigo-400">
                  CSDE Decision ID: {SAMPLE_RESPONSE_DOCKET.decisionSnapshot.decisionId} • Risk Score: {SAMPLE_RESPONSE_DOCKET.decisionSnapshot.riskScore}/100
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: 11-STATE MACHINE VISUALIZER */}
      {activeSubTab === 'statemachine' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> EIOE 11-State Machine Lifecycle
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Strict mathematical state transitions preventing illegal status hops. Every transition produces an immutable audit hash.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { state: 'NEW', desc: 'Auto-created from CSDE RED event', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
              { state: 'VALIDATED', desc: 'Operator verified event parameters', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
              { state: 'DISPATCH_PENDING', desc: 'Response Docket compiled, awaiting partner acceptance', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
              { state: 'RESPONDER_ASSIGNED', desc: 'Tactical unit or SAPS team assigned', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
              { state: 'RESPONDER_EN_ROUTE', desc: 'Responder in transit with live GPS tracking', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
              { state: 'RESPONDER_ON_SCENE', desc: 'Responder arrived at target coordinates', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
              { state: 'CHILD_LOCATED', desc: 'Child visually confirmed by responder', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
              { state: 'CHILD_SAFE', desc: 'Child secured and handed to guardian/school', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
              { state: 'CLOSED', desc: 'Final post-incident audit completed', badge: 'bg-slate-800 text-slate-300 border-slate-700' },
              { state: 'FALSE_ALARM', desc: 'Verified non-emergency equipment test or glitch', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
              { state: 'CANCELLED', desc: 'Cancelled by operator or parent prior to dispatch', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
            ].map((st, idx) => (
              <div key={st.state} className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">STATE #{idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${st.badge}`}>
                    {st.state}
                  </span>
                </div>
                <p className="text-xs text-slate-300 pt-1 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: MULTI-CHILD INCIDENT MERGING */}
      {activeSubTab === 'merge' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-amber-400" /> Multi-Child Incident Merging Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Supports complex multi-child scenarios (e.g., scholar transport hijacking or school bus deviation) by merging individual child alerts into 1 Master Incident.
            </p>
          </div>

          <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Scholar Bus Hijacking Scenario</h3>
                <p className="text-xs text-slate-400">3 Siblings / Learners on Toyota Quantum (Reg GP 88 YZ GP)</p>
              </div>

              <button
                onClick={handleSimulateMerge}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <GitMerge className="w-4 h-4" />
                <span>Merge into 1 Master Incident</span>
              </button>
            </div>

            {/* Child Incidents List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'ITIS-2026-GP-00000045', learner: 'Sipho Zulu', bus: 'Scholar Bus #4' },
                { id: 'ITIS-2026-GP-00000048', learner: 'Thabo Zulu', bus: 'Scholar Bus #4' },
                { id: 'ITIS-2026-GP-00000049', learner: 'Lindiwe Zulu', bus: 'Scholar Bus #4' },
              ].map((child) => (
                <div key={child.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-indigo-400">{child.id}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-red-500/20 text-red-300 font-bold rounded">RED</span>
                  </div>
                  <strong className="text-sm font-bold text-white block">{child.learner}</strong>
                  <span className="text-xs text-slate-400 block">{child.bus}</span>
                </div>
              ))}
            </div>

            {/* Merged Success Visual */}
            {mergedSuccess && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/80 rounded-xl text-xs text-emerald-200 space-y-2 animate-fadeIn">
                <strong className="text-sm font-bold block flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Master Incident Merged Successfully
                </strong>
                <p>
                  Master Incident <code className="font-mono font-bold text-white">ITIS-2026-GP-00000045</code> created with 3 linked learners. Single response docket compiled for emergency dispatch teams while retaining individual child telemetry logs.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 5: SLA CLOCKS & COMPLIANCE */}
      {activeSubTab === 'sla' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" /> SLA Clock Monitoring & Breach Detection
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Monitors time spent across every phase of an emergency response. Raises immediate supervisor alarms if SLAs are breached.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EIOE_SLA_METRICS.map((metric, idx) => (
              <div key={idx} className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{metric.metricName}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded">
                    {metric.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Target SLA</span>
                    <strong className="text-white">{metric.targetSeconds}s</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Avg Actual</span>
                    <strong className="text-emerald-400">{metric.avgActualSeconds}s</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>SLA Compliance Rate:</span>
                  <strong className="text-emerald-400 font-mono">{metric.complianceRatePct}%</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 6: DATABASE SCHEMA */}
      {activeSubTab === 'database' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-400" /> EIOE Database Tables
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Tables: <code className="text-indigo-300">incidents</code>, <code className="text-indigo-300">incident_timeline</code>, <code className="text-indigo-300">incident_notes</code>, <code className="text-indigo-300">incident_attachments</code>, <code className="text-indigo-300">response_dockets</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-indigo-300 space-y-2 overflow-x-auto">
            <p>// Example SQL Query: Fetch Master Incidents with Unbroken Timelines</p>
            <pre className="text-slate-300">{`SELECT 
  i.id AS incident_number,
  i.learner_id,
  i.priority,
  i.state,
  i.created_timestamp,
  t.action,
  t.evidence_hash
FROM incidents i
JOIN incident_timeline t ON t.incident_id = i.id
WHERE i.province_code = 'GP' AND i.priority = 'PRIORITY_1'
ORDER BY i.created_timestamp DESC;`}</pre>
          </div>
        </div>
      )}

      {/* SUBTAB 7: NESTJS SPECS */}
      {activeSubTab === 'nestjs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">EIOE Engineering Specs:</span>
            {EIOE_CODE_SPECS.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecId(spec.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedSpecId === spec.id
                    ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{spec.title}</span>
                  <FileCode className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="text-[10px] opacity-80 mt-1 font-mono truncate">{spec.filename}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{activeSpec.filename}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{activeSpec.title}</h3>
              </div>

              <button
                onClick={() => handleCopyCode(activeSpec.id, activeSpec.code)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5"
              >
                {copiedCodeId === activeSpec.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === activeSpec.id ? 'Copied' : 'Copy Spec'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">{activeSpec.description}</p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto max-h-96">
              <pre>{activeSpec.code}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
