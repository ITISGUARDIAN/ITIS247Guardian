import React, { useState } from 'react';
import {
  Shield,
  Siren,
  Truck,
  Flame,
  Radio,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lock,
  QrCode,
  FileCode,
  Layers,
  Database,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Activity,
  UserCheck,
  RotateCcw,
  Compass,
  PhoneCall,
  Check,
  XCircle,
  BarChart2
} from 'lucide-react';
import {
  SAMPLE_RESPONSE_UNITS,
  SAMPLE_DISPATCH_ASSIGNMENTS,
  ERCDE_CODE_SPECS,
  CRITICAL_ERCDE_RULES,
  PartnerCategory,
  ResponseUnitStatus,
  DispatchAckStatus,
  ResponseUnit,
  DispatchAssignment
} from '../data/ercdeModuleData';

export const ErcdeModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'dashboard' | 'units' | 'packet' | 'eta' | 'statemachine' | 'schema' | 'architecture'
  >('dashboard');

  const [units, setUnits] = useState<ResponseUnit[]>(SAMPLE_RESPONSE_UNITS);
  const [dispatches, setDispatches] = useState<DispatchAssignment[]>(SAMPLE_DISPATCH_ASSIGNMENTS);
  const [selectedUnit, setSelectedUnit] = useState<ResponseUnit>(SAMPLE_RESPONSE_UNITS[0]);
  const [selectedDispatch, setSelectedDispatch] = useState<DispatchAssignment>(SAMPLE_DISPATCH_ASSIGNMENTS[0]);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState(ERCDE_CODE_SPECS[0]);

  // Simulation State for Dispatching
  const [targetIncidentId, setTargetIncidentId] = useState('ITIS-2026-GP-00000045');
  const [targetLearnerName, setTargetLearnerName] = useState('Sipho Zulu');
  const [selectedAgencyCategory, setSelectedAgencyCategory] = useState<PartnerCategory>('PRIVATE_SECURITY');
  const [notificationLog, setNotificationLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setNotificationLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 9)]);
  };

  // Trigger dispatch to nearest unit
  const handleTriggerDispatch = () => {
    const candidate = units.find(
      (u) => u.category === selectedAgencyCategory && u.status === 'AVAILABLE'
    ) || units.find((u) => u.status === 'AVAILABLE');

    if (!candidate) {
      addLog(`CRITICAL: No available units for agency category ${selectedAgencyCategory}. Auto-escalating!`);
      return;
    }

    const newDispatchId = `DSP-2026-GP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDispatch: DispatchAssignment = {
      id: newDispatchId,
      incidentId: targetIncidentId,
      learnerName: targetLearnerName,
      incidentType: 'SOS_BUTTON_PRIORITY_1',
      unitId: candidate.id,
      unitCallSign: candidate.callSign,
      agencyCategory: candidate.category,
      assignedAt: new Date().toLocaleTimeString(),
      ackStatus: 'PENDING',
      initialEtaSeconds: candidate.estimatedEtaSeconds,
      currentEtaSeconds: candidate.estimatedEtaSeconds,
      distanceKm: 2.1,
      escryptedPacketHash: `aes256-dsp-${Math.floor(Math.random() * 100000)}`,
      isEscalated: false,
    };

    setDispatches([newDispatch, ...dispatches]);
    setUnits((prev) =>
      prev.map((u) => (u.id === candidate.id ? { ...u, status: 'DISPATCHED' } : u))
    );
    setSelectedDispatch(newDispatch);
    addLog(`DISPATCH CREATED: ${newDispatchId} assigned to ${candidate.callSign} (<100ms)`);
  };

  // Change Ack Status on state machine
  const handleAckUpdate = (dispatchId: string, newStatus: DispatchAckStatus) => {
    setDispatches((prev) =>
      prev.map((d) => {
        if (d.id === dispatchId) {
          const isComplete = newStatus === 'MISSION_COMPLETE' || newStatus === 'CHILD_SAFE';
          return {
            ...d,
            ackStatus: newStatus,
            currentEtaSeconds: isComplete ? 0 : Math.max(0, d.currentEtaSeconds - 60),
          };
        }
        return d;
      })
    );

    // Update corresponding unit status
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id === selectedDispatch.unitId) {
          if (newStatus === 'ACCEPT') return { ...u, status: 'EN_ROUTE' };
          if (newStatus === 'ARRIVED') return { ...u, status: 'ON_SCENE' };
          if (newStatus === 'DECLINE') return { ...u, status: 'AVAILABLE' };
          if (newStatus === 'MISSION_COMPLETE') return { ...u, status: 'AVAILABLE' };
        }
        return u;
      })
    );

    addLog(`ACKNOWLEDGEMENT UPDATED: ${dispatchId} -> ${newStatus}`);
  };

  // Trigger Escalation
  const handleEscalate = (dispatchId: string) => {
    setDispatches((prev) =>
      prev.map((d) =>
        d.id === dispatchId
          ? { ...d, isEscalated: true, escalationReason: 'SLA Breach (>120s without acknowledgement)' }
          : d
      )
    );
    addLog(`ESCALATION TRIGGERED: Dispatch ${dispatchId} escalated to Provincial Command!`);
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 rounded-2xl border border-red-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-semibold">
              <Siren className="w-3.5 h-3.5 animate-pulse text-red-400" />
              <span>PROMPT 027 — EMERGENCY RESPONSE COORDINATION & DISPATCH ENGINE (ERCDE)</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Emergency Response Coordination <span className="text-red-400">& Dispatch Engine</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              When the Incident Orchestration Engine creates a Priority 1 or 2 incident, ERCDE coordinates the closest available response resources across SAPS, Metro Police, EMS, Fire & Rescue, and Private Security while remaining vendor-neutral.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/80 p-4 rounded-xl border border-red-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-red-400">&lt;100 ms</span>
              <span className="text-xs text-slate-400 font-medium">Dispatch Time</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">&lt;50 ms</span>
              <span className="text-xs text-slate-400 font-medium">Ack Processing</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">12 Partner</span>
              <span className="text-xs text-slate-400 font-medium">Categories</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'dashboard'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Siren className="w-4 h-4 text-red-400" />
            <span>1. Live Command Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSubTab('units')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'units'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4 text-amber-400" />
            <span>2. Response Partners & Units</span>
          </button>

          <button
            onClick={() => setActiveSubTab('packet')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'packet'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-blue-400" />
            <span>3. Encrypted Dispatch Packet</span>
          </button>

          <button
            onClick={() => setActiveSubTab('eta')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'eta'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>4. Live ETA & Escalation</span>
          </button>

          <button
            onClick={() => setActiveSubTab('statemachine')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'statemachine'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-purple-400" />
            <span>5. Dispatch State Machine</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-teal-400" />
            <span>6. Relational Prisma Schema</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'architecture'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>7. NestJS Services & REST</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: LIVE COMMAND DASHBOARD */}
      {activeSubTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* DISPATCH CREATOR SIMULATOR */}
            <div className="lg:col-span-1 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-red-400" />
                  <h3 className="text-base font-bold text-white">Trigger Emergency Dispatch</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 text-xs font-mono font-bold border border-red-800">
                  PRIORITY_1
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Incident Reference</label>
                  <input
                    type="text"
                    value={targetIncidentId}
                    onChange={(e) => setTargetIncidentId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:ring-1 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400">Target Learner</label>
                  <input
                    type="text"
                    value={targetLearnerName}
                    onChange={(e) => setTargetLearnerName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:ring-1 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400">Response Partner Agency</label>
                  <select
                    value={selectedAgencyCategory}
                    onChange={(e) => setSelectedAgencyCategory(e.target.value as PartnerCategory)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:ring-1 focus:ring-red-500 outline-none"
                  >
                    <option value="PRIVATE_SECURITY">Private Security (Armed Response)</option>
                    <option value="SAPS">South African Police Service (SAPS)</option>
                    <option value="EMS">Emergency Medical Services (EMS)</option>
                    <option value="METRO_POLICE">Metro Police (JMPD / TMPD)</option>
                    <option value="FIRE_RESCUE">Fire & Rescue Services</option>
                  </select>
                </div>

                <button
                  onClick={handleTriggerDispatch}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
                >
                  <Siren className="w-4 h-4 animate-bounce" />
                  <span>Rank Units & Auto-Dispatch Now</span>
                </button>
              </div>

              {/* SIMULATION LOG */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Command Centre Event Stream
                </span>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 h-36 overflow-y-auto space-y-1">
                  {notificationLog.length === 0 ? (
                    <span className="text-slate-600 italic">No dispatch events recorded in session.</span>
                  ) : (
                    notificationLog.map((log, idx) => (
                      <div key={idx} className="text-emerald-400 border-b border-slate-900 pb-1">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* ACTIVE DISPATCHES LIST */}
            <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Siren className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Active Emergency Dispatches</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {dispatches.length} Active Assignments
                </span>
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {dispatches.map((dsp) => (
                  <div
                    key={dsp.id}
                    onClick={() => setSelectedDispatch(dsp)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedDispatch.id === dsp.id
                        ? 'bg-slate-800/90 border-red-500 shadow-md ring-1 ring-red-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-mono font-bold">
                          {dsp.id}
                        </span>
                        <span className="text-xs font-bold text-white">{dsp.unitCallSign}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                          {dsp.agencyCategory}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            dsp.ackStatus === 'ACCEPT' || dsp.ackStatus === 'CHILD_SAFE'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : dsp.ackStatus === 'ARRIVED'
                              ? 'bg-purple-950 text-purple-400 border border-purple-800'
                              : dsp.ackStatus === 'DECLINE'
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {dsp.ackStatus}
                        </span>
                        {dsp.isEscalated && (
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold animate-pulse">
                            ESCALATED
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 mt-2">
                      <div>
                        <span className="text-slate-500 text-[10px] block">Learner Name</span>
                        <span className="font-semibold text-slate-200">{dsp.learnerName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">ETA Countdown</span>
                        <span className="font-bold text-amber-400">{dsp.currentEtaSeconds} sec ({Math.round(dsp.currentEtaSeconds / 60)} min)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Distance</span>
                        <span className="font-semibold text-slate-200">{dsp.distanceKm} km</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Encrypted Packet</span>
                        <span className="font-mono text-[10px] text-blue-400 truncate block">{dsp.escryptedPacketHash}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CRITICAL BUSINESS RULES GRID */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-red-400" />
              <span>10 Mandatory Dispatch Architecture Business Rules</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {CRITICAL_ERCDE_RULES.map((rule) => (
                <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-red-400">RULE #{rule.id}</span>
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
      )}

      {/* SUB-TAB 2: RESPONSE PARTNERS & UNITS */}
      {activeSubTab === 'units' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-amber-400" />
                  <span>Multi-Agency Response Unit Inventory</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Vendor-neutral registry supporting SAPS, Metro Police, Private Security, EMS, Fire & Rescue.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold">
                  {units.filter((u) => u.status === 'AVAILABLE').length} Available
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-400 text-xs font-bold">
                  {units.filter((u) => u.status === 'DISPATCHED' || u.status === 'BUSY').length} Dispatched
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {units.map((unit) => (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    selectedUnit.id === unit.id
                      ? 'bg-slate-800/90 border-amber-500 ring-1 ring-amber-500/50 shadow-lg'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 font-bold text-xs">
                        {unit.category.substring(0, 3)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{unit.callSign}</h4>
                        <span className="text-[11px] text-slate-400 block">{unit.agencyName}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        unit.status === 'AVAILABLE'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : unit.status === 'BUSY'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-blue-950 text-blue-400 border border-blue-800'
                      }`}
                    >
                      {unit.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 mb-3">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Vehicle</span>
                      <span className="font-semibold text-slate-200">{unit.vehicleReg}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Crew Members</span>
                      <span className="font-semibold text-slate-200">{unit.crewCount} Personnel</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Op Radius</span>
                      <span className="font-semibold text-slate-200">{unit.operationalRadiusKm} km</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Speed / Heading</span>
                      <span className="font-semibold text-amber-400">{unit.speedKmh} km/h @ {unit.headingDegrees}°</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Branch</span>
                      <span className="font-semibold text-slate-200 truncate block">{unit.branchName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Est ETA</span>
                      <span className="font-bold text-emerald-400">{unit.estimatedEtaSeconds} sec</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">
                      Tactical Capabilities
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {unit.capabilities.map((cap, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ENCRYPTED DISPATCH PACKET */}
      {activeSubTab === 'packet' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PACKET GENERATOR & QR INSPECTOR */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">AES-256 Encrypted Dispatch Packet</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono">
                  mTLS Secured
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Dispatch ID:</span>
                  <span className="font-mono text-red-400 font-bold">{selectedDispatch.id}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Assigned Unit:</span>
                  <span className="font-bold text-white">{selectedDispatch.unitCallSign}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Digital Evidence Hash:</span>
                  <span className="font-mono text-emerald-400">{selectedDispatch.escryptedPacketHash}</span>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Packet Payload Contents</span>
                    <ul className="text-[11px] text-slate-300 space-y-0.5">
                      <li>• Learner Photo & Medical Alerts</li>
                      <li>• Guardian Contact Hashes</li>
                      <li>• Live GPS Navigation Stream Coordinates</li>
                      <li>• Threat Level & Assigned Route</li>
                    </ul>
                  </div>

                  <div className="w-24 h-24 bg-white p-2 rounded-xl flex flex-col items-center justify-center text-slate-900 shadow-lg">
                    <QrCode className="w-16 h-16 text-slate-900" />
                    <span className="text-[8px] font-mono font-bold mt-1">DISPATCH-QR</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-900/60 text-xs text-blue-200 space-y-1">
                <span className="font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>POPIA Data Minimization Policy</span>
                </span>
                <p className="text-[11px] text-blue-300/80">
                  Responders receive only role-appropriate information strictly necessary for locating and securing the learner. Unnecessary personal identity files are omitted.
                </p>
              </div>
            </div>

            {/* SECURITY & CERTIFICATE SPECIFICATIONS */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>Partner API Integration Security</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">1. Mutual TLS (mTLS) Authentication</span>
                  <p className="text-slate-400 text-[11px]">
                    Every partner branch connects via bilateral x509 client certificates issued by the ITIS PKI Authority.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">2. JWT Scoped Partner Tokens</span>
                  <p className="text-slate-400 text-[11px]">
                    Tokens expire every 60 minutes and restrict capabilities strictly to assigned geographical zones.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">3. Cryptographic Signature Validation</span>
                  <p className="text-slate-400 text-[11px]">
                    All dispatch acknowledgements require RSA-PSS signatures for non-repudiation in legal audits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: LIVE ETA & ESCALATION */}
      {activeSubTab === 'eta' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Real-Time ETA Engine & Auto-Escalation</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono">
                Recalculates &lt;5s
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dispatches.map((dsp) => (
                <div key={dsp.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{dsp.unitCallSign}</span>
                    <span className="text-[10px] font-mono text-red-400 font-bold">{dsp.id}</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Estimated Time of Arrival</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-extrabold text-amber-400">{dsp.currentEtaSeconds}s</span>
                      <span className="text-xs text-slate-400">({Math.round(dsp.currentEtaSeconds / 60)} minutes)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Remaining Distance:</span>
                    <span className="font-bold text-white">{dsp.distanceKm} km</span>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <button
                      onClick={() => handleEscalate(dsp.id)}
                      className="w-full py-2 bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Trigger SLA Escalation</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: DISPATCH STATE MACHINE */}
      {activeSubTab === 'statemachine' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Dispatch State Machine & Acknowledgement Lifecycle</h3>
              </div>
              <span className="text-xs font-mono text-purple-400 font-bold">
                Selected: {selectedDispatch.id}
              </span>
            </div>

            {/* LIFECYCLE STEPS */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {[
                { status: 'ACCEPT', label: '1. Accept', icon: Check, color: 'emerald' },
                { status: 'EN_ROUTE', label: '2. En Route', icon: Truck, color: 'blue' },
                { status: 'ARRIVED', label: '3. Arrived', icon: MapPin, color: 'purple' },
                { status: 'CHILD_LOCATED', label: '4. Child Located', icon: UserCheck, color: 'amber' },
                { status: 'CHILD_SAFE', label: '5. Child Safe', icon: ShieldCheck, color: 'teal' },
                { status: 'MISSION_COMPLETE', label: '6. Complete', icon: CheckCircle2, color: 'emerald' },
                { status: 'DECLINE', label: 'Decline / Reassign', icon: XCircle, color: 'red' },
              ].map((step) => (
                <button
                  key={step.status}
                  onClick={() => handleAckUpdate(selectedDispatch.id, step.status as DispatchAckStatus)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                    selectedDispatch.ackStatus === step.status
                      ? 'bg-purple-950 border-purple-500 ring-1 ring-purple-500 text-white'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-bold text-slate-400">{step.label}</span>
                  <span className="text-xs font-extrabold">{step.status}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: RELATIONAL PRISMA SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">Prisma Multi-Agency Database Schema</h3>
              </div>
              <span className="text-xs font-mono text-teal-400 font-bold">
                11 Production Tables
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {ERCDE_CODE_SPECS[0].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: NESTJS SERVICES & REST */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">NestJS Services & REST Specs</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {ERCDE_CODE_SPECS.map((spec) => (
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
    </div>
  );
};
