import React, { useState, useEffect } from 'react';
import {
  Siren,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Navigation,
  MapPin,
  Camera,
  Heart,
  PhoneCall,
  MessageSquare,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Battery,
  Wifi,
  Smartphone,
  Lock,
  Unlock,
  KeyRound,
  FileCode,
  Layers,
  Database,
  Terminal,
  Send,
  Download,
  Share2,
  ChevronRight,
  Maximize2,
  Minimize2,
  Languages,
  Activity,
  FileText,
  BadgeAlert,
  Car,
  Compass,
  Radio,
  Sparkles,
  Zap
} from 'lucide-react';
import {
  SAMPLE_DISPATCHES,
  SAMPLE_RESPONDER,
  SAMPLE_MEDICAL_INFO,
  SAMPLE_EVIDENCE,
  ERMA_CODE_SPECS,
  CRITICAL_ERMA_RULES,
  TacticalDispatch,
  ResponderUnitProfile,
  MedicalEmergencyInfo,
  EvidenceRecord,
  ErmaCodeSpec
} from '../data/ermaData';

export const ErmaModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'app_simulator' | 'tactical_map' | 'mission_workflow' | 'evidence_forensics' | 'medical_popia' | 'code_specs' | 'rules_sla'
  >('app_simulator');

  // Mobile Screen State inside Phone Frame
  const [activeScreen, setActiveScreen] = useState<
    'dispatch_queue' | 'navigation' | 'incident_workspace' | 'evidence' | 'medical' | 'chat' | 'settings'
  >('dispatch_queue');

  // Dispatches State
  const [dispatches, setDispatches] = useState<TacticalDispatch[]>(SAMPLE_DISPATCHES);
  const [activeDispatch, setActiveDispatch] = useState<TacticalDispatch>(SAMPLE_DISPATCHES[0]);

  // Evidence List
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>(SAMPLE_EVIDENCE);
  const [newEvidenceNote, setNewEvidenceNote] = useState<string>('');

  // Selected Language
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  // Phone Frame Viewport Mode
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);

  // Selected Code Spec
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<ErmaCodeSpec>(ERMA_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Simulated GPS movement effect when En Route or On Scene
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeDispatch.status === 'EN_ROUTE' || activeDispatch.status === 'ACCEPTED') {
        setActiveDispatch((prev) => ({
          ...prev,
          distanceKm: Math.max(0.1, Number((prev.distanceKm - 0.1).toFixed(2))),
          etaMinutes: Math.max(1, Math.ceil(prev.distanceKm * 1.5)),
        }));
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [activeDispatch.status]);

  // Action: Accept Mission
  const handleAcceptMission = (dispatchId: string) => {
    setDispatches((prev) =>
      prev.map((d) => (d.id === dispatchId ? { ...d, status: 'ACCEPTED' } : d))
    );
    setActiveDispatch((prev) => ({ ...prev, status: 'ACCEPTED' }));
    addLog(`MISSION ACCEPTED by ${SAMPLE_RESPONDER.unitCallsign} for ${activeDispatch.learnerName}. Tactical navigation initialized.`);
    setActiveScreen('navigation');
  };

  // Action: Transition Mission Status
  const handleTransitionStatus = (nextStatus: TacticalDispatch['status']) => {
    setDispatches((prev) =>
      prev.map((d) => (d.id === activeDispatch.id ? { ...d, status: nextStatus } : d))
    );
    setActiveDispatch((prev) => ({ ...prev, status: nextStatus }));
    addLog(`MISSION STATUS CHANGED to [${nextStatus}] for Learner ${activeDispatch.learnerName}. Synchronized with ITIS Command Centre.`);
  };

  // Action: Capture Evidence
  const handleCaptureEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: EvidenceRecord = {
      id: `EVID-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      photoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&auto=format&fit=crop&q=80',
      sha256Hash: `a${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}82a9910`,
      gpsCoordinate: `${activeDispatch.currentLat.toFixed(4)}, ${activeDispatch.currentLng.toFixed(4)}`,
      officerId: SAMPLE_RESPONDER.badgeNumber,
      note: newEvidenceNote || 'On-scene photographic evidence recorded by responder.',
    };

    setEvidenceList((prev) => [newRecord, ...prev]);
    addLog(`DIGITAL EVIDENCE CAPTURED: SHA-256 Hash ${newRecord.sha256Hash.slice(0, 16)}... bound to Chain of Custody.`);
    setNewEvidenceNote('');
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-rose-950 to-slate-900 rounded-2xl border border-rose-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-700/50 text-rose-300 text-xs font-semibold">
              <Siren className="w-3.5 h-3.5 animate-pulse text-rose-400" />
              <span>— EMERGENCY RESPONDER MOBILE APP (ERMA)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tactical Emergency <span className="text-rose-400">Responder Mobile App</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Production-ready Flutter 3.x / Dart Clean Architecture mobile application for SAPS, Metro Police, EMS, and Private Security responders. Features live Google Maps navigation, SHA-256 evidence chain of custody, POPIA-compliant medical decryption, interop encrypted team messaging, and biometric authentication.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-rose-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-rose-400">&lt; 2.0s</span>
              <span className="text-xs text-slate-400 font-medium">Dispatch Notification</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">4.2 min</span>
              <span className="text-xs text-slate-400 font-medium">Avg Response SLA</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">SHA-256</span>
              <span className="text-xs text-slate-400 font-medium">Forensic Hash</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('app_simulator')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'app_simulator'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-rose-400" />
            <span>1. Live ERMA Handset Simulator</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tactical_map')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'tactical_map'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span>2. Tactical Navigation Map</span>
          </button>

          <button
            onClick={() => setActiveSubTab('mission_workflow')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'mission_workflow'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-amber-400" />
            <span>3. Mission Workflow Lifecycle</span>
          </button>

          <button
            onClick={() => setActiveSubTab('evidence_forensics')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'evidence_forensics'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4 text-purple-400" />
            <span>4. Evidence & Chain of Custody</span>
          </button>

          <button
            onClick={() => setActiveSubTab('medical_popia')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'medical_popia'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4 text-emerald-400" />
            <span>5. Emergency Medical (POPIA)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-fuchsia-400" />
            <span>6. Flutter Clean Architecture Spec</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rules_sla')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'rules_sla'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>7. Mandatory ERMA Rules & SLAs</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-rose-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-rose-400" />
              <span>ERMA Responder Telemetry & Command Stream</span>
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

      {/* SUB-TAB 1: LIVE HANDSET SIMULATOR */}
      {activeSubTab === 'app_simulator' && (
        <div className="space-y-6">
          {/* VIEWPORT CONTROLS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h4 className="text-xs font-bold text-white">{SAMPLE_RESPONDER.unitCallsign}</h4>
                <p className="text-[10px] text-slate-400 font-mono">{SAMPLE_RESPONDER.agencyName} • {SAMPLE_RESPONDER.badgeNumber}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsExpandedView(!isExpandedView)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
              >
                {isExpandedView ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{isExpandedView ? 'Phone Frame View' : 'Full Desktop View'}</span>
              </button>
            </div>
          </div>

          {/* SIMULATOR CONTAINER */}
          <div className={`flex justify-center transition-all ${isExpandedView ? 'w-full' : ''}`}>
            <div
              className={`bg-slate-950 rounded-[40px] border-4 border-slate-800 p-4 shadow-2xl relative overflow-hidden transition-all ${
                isExpandedView ? 'w-full max-w-5xl' : 'w-full max-w-md'
              }`}
            >
              {/* PHONE TOP NOTCH / SPEAKER BAR */}
              <div className="w-32 h-4 bg-slate-900 mx-auto rounded-b-xl flex items-center justify-center space-x-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-8 h-1.5 rounded-full bg-slate-800" />
              </div>

              {/* ERMA APP HEADER */}
              <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Siren className="w-5 h-5 text-rose-400 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">ITIS ERMA Tactical</h4>
                    <span className="text-[10px] text-emerald-400 font-mono">Biometric Authenticated</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[10px] font-mono">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <Battery className="w-3.5 h-3.5" />
                    <span>94%</span>
                  </span>
                  <span className="flex items-center space-x-1 text-cyan-400">
                    <Wifi className="w-3.5 h-3.5" />
                    <span>4G/LTE</span>
                  </span>
                </div>
              </div>

              {/* SCREEN CONTENT ENGINE */}
              <div className="space-y-4 min-h-[460px] max-h-[560px] overflow-y-auto pr-1">
                {/* 1. DISPATCH QUEUE SCREEN */}
                {activeScreen === 'dispatch_queue' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300 uppercase tracking-wider">Active Dispatches</span>
                      <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono text-[10px] font-bold border border-rose-800">
                        {dispatches.length} QUEUED
                      </span>
                    </div>

                    {dispatches.map((disp) => (
                      <div
                        key={disp.id}
                        className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wide">
                            {disp.priorityLevel.replace('_', ' ')}
                          </span>
                          <span className="text-rose-400 text-xs font-mono font-bold flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>SLA: {disp.slaCountdownSeconds}s</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <img src={disp.photoUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-rose-500/50" />
                          <div>
                            <h4 className="font-bold text-white text-sm">{disp.learnerName}</h4>
                            <p className="text-xs text-slate-400 font-mono">{disp.gradeClass} ({disp.learnerAge} yrs)</p>
                            <span className="text-[10px] text-cyan-400 block mt-0.5">{disp.locationName}</span>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                          <span className="text-rose-400 font-bold block">Decision Engine Alert:</span>
                          <p>{disp.decisionEngineSummary}</p>
                        </div>

                        <div className="flex justify-between items-center font-mono text-xs pt-1">
                          <span className="text-slate-400">Dist: <strong className="text-white">{disp.distanceKm} km</strong></span>
                          <span className="text-slate-400">ETA: <strong className="text-emerald-400">{disp.etaMinutes} min</strong></span>
                        </div>

                        {disp.status === 'DISPATCH_QUEUED' ? (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={() => handleAcceptMission(disp.id)}
                              className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1 shadow-md shadow-emerald-600/30"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>ACCEPT MISSION</span>
                            </button>
                            <button
                              onClick={() => addLog(`DECLINE DISPATCH requested for ${disp.id}. Re-routed by ITIS Decision Engine.`)}
                              className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center space-x-1"
                            >
                              <span>DECLINE</span>
                            </button>
                          </div>
                        ) : (
                          <div className="p-2 bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-bold text-center rounded-xl flex items-center justify-center space-x-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>MISSION ACCEPTED — STATUS: {disp.status}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. TACTICAL NAVIGATION SCREEN */}
                {activeScreen === 'navigation' && (
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 relative overflow-hidden h-64 flex flex-col justify-between">
                      <div className="absolute inset-0 bg-slate-950 opacity-90 flex items-center justify-center">
                        <div className="relative w-full h-full p-4 flex flex-col justify-center items-center">
                          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                          {/* NAVIGATION MAP ROUTE SIMULATION */}
                          <div className="relative z-10 flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/50 animate-bounce">
                              <Navigation className="w-5 h-5 text-rose-300" />
                            </div>
                            <span className="bg-slate-900/90 text-[10px] text-cyan-300 px-2 py-0.5 rounded-full mt-2 border border-cyan-800 font-mono">
                              TARGET: {activeDispatch.learnerName} ({activeDispatch.distanceKm} km away)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-20 flex justify-between items-start text-[10px] font-mono">
                        <span className="bg-slate-900/90 px-2 py-1 rounded-lg text-emerald-400 border border-slate-700">
                          Route: Safe Corridor
                        </span>
                        <span className="bg-slate-900/90 px-2 py-1 rounded-lg text-rose-400 border border-slate-700">
                          ETA: {activeDispatch.etaMinutes} MIN
                        </span>
                      </div>

                      <div className="relative z-20 bg-slate-900/90 p-2 rounded-xl border border-slate-700 text-xs text-slate-200 font-bold flex justify-between items-center">
                        <span>Turn Right on Soweto Hwy</span>
                        <span className="text-cyan-400 text-[10px]">In 200m</span>
                      </div>
                    </div>

                    {/* MISSION STATUS TRANSITION BAR */}
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Mission Workflow Control</span>
                      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                        <button
                          onClick={() => handleTransitionStatus('EN_ROUTE')}
                          className="py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl"
                        >
                          En Route
                        </button>
                        <button
                          onClick={() => handleTransitionStatus('ON_SCENE')}
                          className="py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl"
                        >
                          On Scene
                        </button>
                        <button
                          onClick={() => handleTransitionStatus('CHILD_LOCATED')}
                          className="py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl"
                        >
                          Child Located
                        </button>
                        <button
                          onClick={() => handleTransitionStatus('CHILD_SAFE')}
                          className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl"
                        >
                          Child Safe ✓
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. INCIDENT WORKSPACE SCREEN */}
                {activeScreen === 'incident_workspace' && (
                  <div className="space-y-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                        <img src={activeDispatch.photoUrl} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-rose-500" />
                        <div>
                          <h4 className="font-bold text-white text-base">{activeDispatch.learnerName}</h4>
                          <span className="text-xs text-cyan-400 font-mono">{activeDispatch.gradeClass} ({activeDispatch.learnerAge} years)</span>
                          <span className="block text-[10px] text-slate-400">Wearable IMEI: 864209051820495</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Operator Notes:</span>
                        <p className="p-2.5 bg-slate-950 rounded-xl text-slate-300 font-mono leading-relaxed">
                          {activeDispatch.operatorNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. EVIDENCE CAPTURE SCREEN */}
                {activeScreen === 'evidence' && (
                  <div className="space-y-4 text-xs">
                    <form onSubmit={handleCaptureEvidence} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <span className="font-bold text-white block border-b border-slate-800 pb-2 flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-purple-400" />
                        <span>On-Scene Forensic Evidence Signer</span>
                      </span>

                      <div>
                        <label className="block text-slate-400 text-[10px] font-semibold mb-1">Observation Note:</label>
                        <input
                          type="text"
                          value={newEvidenceNote}
                          onChange={(e) => setNewEvidenceNote(e.target.value)}
                          placeholder="e.g. Recovered wearable strap fragment..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center space-x-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Capture Photo & SHA-256 Hash</span>
                      </button>
                    </form>

                    {/* EVIDENCE REPOSITORY PREVIEW */}
                    <div className="space-y-2">
                      <span className="font-bold text-slate-400 text-[10px] uppercase block">Recorded Evidence Records:</span>
                      {evidenceList.map((ev) => (
                        <div key={ev.id} className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1 font-mono text-[10px]">
                          <div className="flex items-center justify-between text-purple-400 font-bold">
                            <span>{ev.id}</span>
                            <span>{ev.timestamp}</span>
                          </div>
                          <p className="text-slate-300">{ev.note}</p>
                          <span className="text-slate-500 block truncate">SHA-256: {ev.sha256Hash}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. EMERGENCY MEDICAL SCREEN */}
                {activeScreen === 'medical' && (
                  <div className="space-y-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-bold text-rose-400 flex items-center space-x-1.5">
                          <Heart className="w-4 h-4" />
                          <span>POPIA Decrypted Medical Info</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[9px] font-bold">
                          ACTIVE MISSION GRANTED
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 text-[10px] block">Blood Group</span>
                          <span className="text-rose-400 font-bold">{SAMPLE_MEDICAL_INFO.bloodGroup}</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 text-[10px] block">Medical Aid</span>
                          <span className="text-slate-200 font-bold">{SAMPLE_MEDICAL_INFO.medicalAidName}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 text-[10px] block font-semibold">Known Allergies:</span>
                        <div className="flex gap-1.5">
                          {SAMPLE_MEDICAL_INFO.allergies.map((a, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-mono border border-rose-800">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. SETTINGS & LOCALIZATION SCREEN */}
                {activeScreen === 'settings' && (
                  <div className="space-y-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-white block border-b border-slate-800 pb-2 flex items-center space-x-2">
                        <Languages className="w-4 h-4 text-rose-400" />
                        <span>Voice Guidance Language</span>
                      </span>

                      <select
                        value={selectedLanguage}
                        onChange={(e) => {
                          setSelectedLanguage(e.target.value);
                          addLog(`VOICE GUIDANCE LANGUAGE SWITCHED to ${e.target.value}`);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="English">English</option>
                        <option value="isiZulu">isiZulu</option>
                        <option value="isiXhosa">isiXhosa</option>
                        <option value="Afrikaans">Afrikaans</option>
                        <option value="Sepedi">Sepedi</option>
                        <option value="Setswana">Setswana</option>
                        <option value="Sesotho">Sesotho</option>
                        <option value="Xitsonga">Xitsonga</option>
                        <option value="siSwati">siSwati</option>
                        <option value="Tshivenda">Tshivenda</option>
                        <option value="isiNdebele">isiNdebele</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* BOTTOM NAVIGATION BAR */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-5 gap-1 text-[10px] text-center text-slate-400 font-medium">
                <button
                  onClick={() => setActiveScreen('dispatch_queue')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'dispatch_queue' ? 'text-rose-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Siren className="w-4 h-4" />
                  <span>Dispatch</span>
                </button>

                <button
                  onClick={() => setActiveScreen('navigation')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'navigation' ? 'text-rose-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Nav Map</span>
                </button>

                <button
                  onClick={() => setActiveScreen('evidence')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'evidence' ? 'text-rose-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Evidence</span>
                </button>

                <button
                  onClick={() => setActiveScreen('medical')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'medical' ? 'text-rose-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Medical</span>
                </button>

                <button
                  onClick={() => setActiveScreen('settings')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'settings' ? 'text-rose-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Languages className="w-4 h-4" />
                  <span>Lang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TACTICAL MAP */}
      {activeSubTab === 'tactical_map' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Navigation className="w-5 h-5 text-cyan-400" />
            <span>Google Maps Tactical Dynamic Rerouting Engine</span>
          </h3>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative overflow-hidden h-80 flex flex-col justify-between">
            <div className="absolute inset-0 bg-slate-950 opacity-90 flex items-center justify-center">
              <div className="relative w-full h-full p-4 flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-bounce">
                    <Navigation className="w-6 h-6 text-cyan-300" />
                  </div>
                  <span className="bg-slate-900/90 text-xs text-cyan-300 px-3 py-1 rounded-full border border-cyan-800 font-mono">
                    SAFE CORRIDOR ROUTE: TACTICAL-SAPS-ALPHA-01 ➔ {activeDispatch.learnerName}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-20 flex justify-between items-start text-xs font-mono">
              <span className="bg-slate-900/90 px-3 py-1.5 rounded-lg text-emerald-400 border border-slate-700">
                SLA Countdown: {activeDispatch.slaCountdownSeconds}s
              </span>
              <span className="bg-slate-900/90 px-3 py-1.5 rounded-lg text-rose-400 border border-slate-700">
                Threat Level: {activeDispatch.threatLevel}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MISSION WORKFLOW */}
      {activeSubTab === 'mission_workflow' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Activity className="w-5 h-5 text-amber-400" />
            <span>Mission Workflow State Machine Lifecycle</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-2 text-center text-xs font-mono">
            {['DISPATCH_QUEUED', 'ACCEPTED', 'EN_ROUTE', 'ON_SCENE', 'CHILD_LOCATED', 'CHILD_SAFE'].map((st, idx) => (
              <div
                key={st}
                className={`p-3 rounded-xl border ${
                  activeDispatch.status === st
                    ? 'bg-rose-950 border-rose-500 text-rose-300 font-bold ring-2 ring-rose-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] text-slate-400 block mb-1">STAGE 0{idx + 1}</span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: EVIDENCE FORENSICS */}
      {activeSubTab === 'evidence_forensics' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Camera className="w-5 h-5 text-purple-400" />
            <span>Digital Forensics & SHA-256 Chain of Custody Repository</span>
          </h3>

          <div className="space-y-3">
            {evidenceList.map((ev) => (
              <div key={ev.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-white block">{ev.id} — Officer {ev.officerId}</span>
                  <span className="text-slate-400 text-[10px]">{ev.note}</span>
                  <span className="text-cyan-400 text-[10px] block mt-0.5">GPS: {ev.gpsCoordinate}</span>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold block">
                    SHA-256 VERIFIED
                  </span>
                  <span className="text-slate-500 text-[10px]">{ev.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: MEDICAL POPIA */}
      {activeSubTab === 'medical_popia' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Heart className="w-5 h-5 text-emerald-400" />
            <span>POPIA-Compliant Medical Decryption Engine</span>
          </h3>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
            <div className="flex justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
              <span>DECRYPTION STATUS: ACTIVE MISSION TOKEN AUTHORIZED</span>
              <span>EXPIRES: MISSION COMPLETION</span>
            </div>
            <p className="text-slate-300">
              Medical conditions are encrypted at rest using AES-256-GCM. Decryption keys are issued dynamically by the ITIS IAM Engine only when a responder accepts a Priority 1 or 2 mission.
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-fuchsia-400" />
              <h3 className="text-base font-bold text-white">Flutter ERMA Dart Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {ERMA_CODE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedCodeSpec(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCodeSpec.id === spec.id
                      ? 'bg-fuchsia-600 text-white shadow-md'
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
              <span className="font-mono text-fuchsia-400 font-bold">{selectedCodeSpec.filename}</span>
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

      {/* SUB-TAB 7: MANDATORY ERMA RULES */}
      {activeSubTab === 'rules_sla' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span>Enterprise Directives & Compliance Standards & SLAs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {CRITICAL_ERMA_RULES.map((rule) => (
              <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-400">RULE #{rule.id}</span>
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
