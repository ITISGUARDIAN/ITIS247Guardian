import React, { useState, useEffect } from 'react';
import {
  Shield,
  Activity,
  MapPin,
  Radio,
  AlertTriangle,
  Bell,
  Battery,
  Wifi,
  Server,
  Users,
  School,
  Bus,
  Cpu,
  Database,
  FileCode,
  Globe,
  Lock,
  Search,
  Zap,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  RefreshCw,
  Filter,
  Flame,
  ShieldAlert,
  ArrowUpRight,
  Maximize2,
  UserCheck
} from 'lucide-react';
import {
  SAMPLE_NATIONAL_KPIS,
  SAMPLE_MAP_MARKERS,
  SAMPLE_INCIDENT_WALL,
  SAMPLE_DEVICE_HEALTH,
  SAMPLE_SCHOOL_STATUS,
  SAMPLE_TRANSPORT_STATUS,
  SAMPLE_LIVE_EVENTS,
  C3_CODE_SPECS,
  CRITICAL_C3_RULES,
  LearnerGpsMarker,
  IncidentWallItem,
  DeviceHealthRecord,
  LiveStreamEvent,
  C3CodeSpec
} from '../data/c3ModuleData';

export const C3Module: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'cop' | 'incidentwall' | 'devicehealth' | 'schooltransport' | 'nationalkpis' | 'eventstream' | 'schema' | 'architecture'
  >('cop');

  // Interactive States
  const [selectedMarker, setSelectedMarker] = useState<LearnerGpsMarker>(SAMPLE_MAP_MARKERS[0]);
  const [incidentWall, setIncidentWall] = useState<IncidentWallItem[]>(SAMPLE_INCIDENT_WALL);
  const [deviceHealthList, setDeviceHealthList] = useState<DeviceHealthRecord[]>(SAMPLE_DEVICE_HEALTH);
  const [liveEvents, setLiveEvents] = useState<LiveStreamEvent[]>(SAMPLE_LIVE_EVENTS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<C3CodeSpec>(C3_CODE_SPECS[0]);

  // Command Tools States
  const [searchQuery, setSearchQuery] = useState('');
  const [streamPaused, setStreamPaused] = useState(false);
  const [workstationLocked, setWorkstationLocked] = useState(false);
  const [commandLog, setCommandLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setCommandLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 9)]);
  };

  // Simulate SLA Countdown timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setIncidentWall((prev) =>
        prev.map((inc) => ({
          ...inc,
          slaCountdownSec: inc.slaCountdownSec > 0 ? inc.slaCountdownSec - 1 : 0,
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Action: Escalate Incident
  const handleEscalateIncident = (id: string) => {
    setIncidentWall((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status: 'ESCALATED',
              priority: 'PRIORITY_1',
              assignedResponders: [...inc.assignedResponders, 'National SAPS Special Task Force'],
            }
          : inc
      )
    );
    addLog(`INCIDENT ESCALATED: ${id} -> National Special Task Force Assigned`);
  };

  // Action: Re-ping device
  const handlePingDevice = (id: string) => {
    setDeviceHealthList((prev) =>
      prev.map((dev) =>
        dev.id === id
          ? { ...dev, lastHeartbeat: '0s ago (Just Pinged)', batteryPct: Math.min(100, dev.batteryPct) }
          : dev
      )
    );
    addLog(`DEVICE PING DISPATCHED: ${id} -> ACK Received in 18ms`);
  };

  if (workstationLocked) {
    return (
      <div className="bg-slate-950 rounded-2xl border border-red-900/60 p-12 text-center space-y-6 max-w-xl mx-auto my-12 shadow-2xl">
        <div className="inline-flex p-4 rounded-full bg-red-950/80 border border-red-800 text-red-400 animate-pulse">
          <Lock className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">C3 Operator Workstation Locked</h2>
          <p className="text-xs text-slate-400">
            Workstation IP: <span className="font-mono text-red-400">10.240.12.88</span> — Session token suspended for mTLS compliance.
          </p>
        </div>
        <button
          onClick={() => {
            setWorkstationLocked(false);
            addLog('WORKSTATION UNLOCKED — Identity re-verified via CAC SmartCard');
          }}
          className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-600/30"
        >
          Unlock Workstation Session
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-2xl border border-blue-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-300 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-red-400" />
              <span>— ITIS COMMAND & CONTROL CENTRE (C3) PLATFORM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Command & Control <span className="text-blue-400">Operations Centre (C3)</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              24/7 Common Operational Picture (COP) monitoring protected learners, live GPS wearables, school safety statuses, scholar transport vehicles, and active emergency incident dispatches across South Africa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-blue-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-blue-400">254 890</span>
              <span className="text-xs text-slate-400 font-medium">Tracked Learners</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">97.34%</span>
              <span className="text-xs text-slate-400 font-medium">Wearables Online</span>
            </div>
            <button
              onClick={() => {
                setWorkstationLocked(true);
                addLog('WORKSTATION LOCKED manually by operator');
              }}
              className="flex items-center justify-center space-x-1 px-4 py-2 bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 rounded-lg text-xs font-bold transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Lock Workstation</span>
            </button>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('cop')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'cop'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span>1. Common Operational Picture (GIS Map)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('incidentwall')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'incidentwall'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>2. Operator Incident Wall ({incidentWall.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('devicehealth')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'devicehealth'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>3. Wearable Device Health Grid</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schooltransport')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schooltransport'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <School className="w-4 h-4 text-amber-400" />
            <span>4. School & Transport Ops</span>
          </button>

          <button
            onClick={() => setActiveSubTab('nationalkpis')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'nationalkpis'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-purple-400" />
            <span>5. Executive National KPIs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('eventstream')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'eventstream'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4 text-teal-400" />
            <span>6. Live Stream & Digital Twin</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-indigo-400" />
            <span>7. Prisma Schema</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'architecture'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>8. NestJS & WebSockets</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: COMMON OPERATIONAL PICTURE (GIS MAP) */}
      {activeSubTab === 'cop' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GIS MAP DISPLAY AREA */}
            <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-400 animate-pulse" />
                  <div>
                    <h3 className="text-base font-bold text-white">GIS Map Operational Layer</h3>
                    <p className="text-xs text-slate-400">Soweto / JHB Tactical Sector — Live Wearable Telemetry Stream</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-mono font-bold">
                    WS FEED: LIVE (18ms)
                  </span>
                </div>
              </div>

              {/* SIMULATED GIS MAP GRID */}
              <div className="relative w-full h-[380px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
                {/* Map Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

                {/* Safe Zone Geofence Circle Overlay */}
                <div className="absolute w-64 h-64 border-2 border-dashed border-emerald-500/40 bg-emerald-500/5 rounded-full flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-emerald-800">
                    GEOFENCE: Orlando West High Safe Radius
                  </span>
                </div>

                {/* INTERACTIVE LEARNER MAP MARKERS */}
                {SAMPLE_MAP_MARKERS.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMarker(m)}
                    style={{
                      top: `${25 + idx * 20}%`,
                      left: `${20 + idx * 22}%`,
                    }}
                    className={`absolute p-2.5 rounded-full transition-all transform hover:scale-125 focus:outline-none flex items-center justify-center ${
                      selectedMarker.id === m.id
                        ? 'ring-4 ring-white shadow-2xl z-20 scale-125'
                        : ''
                    } ${
                      m.threatLevel === 'CRITICAL'
                        ? 'bg-red-600 text-white animate-bounce shadow-lg shadow-red-600/50'
                        : m.threatLevel === 'HIGH'
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50'
                        : 'bg-blue-600 text-white shadow-md'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                    <span className="absolute -bottom-5 whitespace-nowrap bg-slate-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-700">
                      {m.learnerName}
                    </span>
                  </button>
                ))}

                <div className="absolute bottom-3 left-3 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-[10px] text-slate-300 space-y-1 font-mono">
                  <div className="font-bold text-white">MAP LEGEND:</div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                    <span>Emergency SOS (Critical)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>In Transit (High Risk)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span>Normal On Campus</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-mono text-center pt-2">
                Coordinates: -26.2388 S, 27.8550 E — Vector Tiles Loaded via WebGL GIS Layer
              </div>
            </div>

            {/* SELECTED MARKER DETAIL PANEL */}
            <div className="lg:col-span-1 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">Learner Live Telemetry</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono font-bold">
                  {selectedMarker.id}
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{selectedMarker.learnerName}</h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedMarker.threatLevel === 'CRITICAL'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-blue-950 text-blue-400 border border-blue-800'
                      }`}
                    >
                      {selectedMarker.threatLevel} THREAT
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedMarker.schoolName}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold block">Wearable Call Sign</span>
                    <span className="font-mono text-white font-bold">{selectedMarker.deviceCallSign}</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold block">Battery Status</span>
                    <span className="font-mono text-emerald-400 font-bold">{selectedMarker.batteryPct}%</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold block">GPS Heartbeat</span>
                    <span className="font-mono text-blue-400 font-bold">{selectedMarker.lastHeartbeatSecAgo}s ago</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold block">Operational Status</span>
                    <span className="font-mono text-amber-400 font-bold">{selectedMarker.status}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleEscalateIncident('ITIS-2026-GP-00000045');
                    setActiveSubTab('incidentwall');
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Open Active Emergency Incident Wall</span>
                </button>
              </div>

              {/* AUDIT COMMAND LOG */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Workstation Audit Activity Log
                </span>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 h-28 overflow-y-auto space-y-1">
                  {commandLog.length === 0 ? (
                    <span className="text-slate-600 italic">No operator actions logged in current session.</span>
                  ) : (
                    commandLog.map((log, idx) => (
                      <div key={idx} className="text-blue-400 border-b border-slate-900 pb-1">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: OPERATOR INCIDENT WALL */}
      {activeSubTab === 'incidentwall' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                  <span>24/7 Operator Active Incident Wall</span>
                </h3>
                <p className="text-xs text-slate-400">Real-time emergency incident list with SLA countdown timers and responder ETA.</p>
              </div>

              <span className="px-3 py-1 rounded bg-red-950 border border-red-800 text-red-400 text-xs font-mono font-bold">
                {incidentWall.length} ACTIVE INCIDENTS
              </span>
            </div>

            <div className="space-y-4">
              {incidentWall.map((inc) => (
                <div
                  key={inc.id}
                  className="p-5 rounded-xl border bg-slate-950/80 border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-2">
                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-1 rounded bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-mono font-bold">
                        {inc.id}
                      </span>
                      <span className="text-sm font-bold text-white">{inc.learnerName}</span>
                      <span className="text-xs text-slate-400">({inc.schoolName})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded bg-red-950 text-red-400 border border-red-800 text-xs font-mono font-bold flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>SLA: {inc.slaCountdownSec}s</span>
                      </span>

                      <span
                        className={`px-2.5 py-1 rounded text-xs font-bold ${
                          inc.status === 'ESCALATED'
                            ? 'bg-purple-950 text-purple-400 border border-purple-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {inc.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-500 font-semibold block">Parent / Guardian Contact</span>
                      <span className="text-slate-200 font-semibold">{inc.parentContact}</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-500 font-semibold block">Assigned Emergency Responders</span>
                      <span className="text-emerald-400 font-semibold">{inc.assignedResponders.join(', ')}</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-500 font-semibold block">Tactical Live ETA</span>
                      <span className="text-amber-400 font-bold">{inc.liveEtaSeconds} seconds</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-1">
                    <button
                      onClick={() => handleEscalateIncident(inc.id)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Escalate to National Command
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: WEARABLE DEVICE HEALTH GRID */}
      {activeSubTab === 'devicehealth' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>GPS Wearable Fleet Health Diagnostics</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deviceHealthList.map((dev) => (
                <div key={dev.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">{dev.id}</span>
                    <span className="text-xs font-bold text-white">{dev.learnerName}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Battery Level:</span>
                      <span className="font-mono text-emerald-400 font-bold">{dev.batteryPct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${dev.batteryPct}%` }} />
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-400">Cellular Signal:</span>
                      <span className="font-mono text-slate-200">{dev.signalDbm} dBm ({dev.cellularOperator})</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">GPS Fix Quality:</span>
                      <span className="font-mono text-blue-400 font-bold">{dev.gpsFixQuality}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Firmware:</span>
                      <span className="font-mono text-slate-400">{dev.firmwareVersion}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Last Heartbeat:</span>
                      <span className="font-mono text-amber-400 font-bold">{dev.lastHeartbeat}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePingDevice(dev.id)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg text-xs font-bold transition-all border border-slate-700 flex items-center justify-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ping Device Diagnostics</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SCHOOL & TRANSPORT OPERATIONS */}
      {activeSubTab === 'schooltransport' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SCHOOL STATUS VIEW */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <School className="w-5 h-5 text-amber-400" />
                <span>School Campus Safety Status</span>
              </h3>

              <div className="space-y-3">
                {SAMPLE_SCHOOL_STATUS.map((sch) => (
                  <div key={sch.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{sch.schoolName}</h4>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sch.emergencyStatus === 'DISPATCH_ACTIVE'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {sch.emergencyStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1">
                      <div>Enrolled: <span className="text-white font-mono font-bold">{sch.totalEnrolled}</span></div>
                      <div>On Campus: <span className="text-emerald-400 font-mono font-bold">{sch.presentOnCampus}</span></div>
                      <div>In Transit: <span className="text-amber-400 font-mono font-bold">{sch.inTransit}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TRANSPORT STATUS VIEW */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Bus className="w-5 h-5 text-purple-400" />
                <span>Scholar Transport Fleet Operations</span>
              </h3>

              <div className="space-y-3">
                {SAMPLE_TRANSPORT_STATUS.map((veh) => (
                  <div key={veh.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono font-bold">
                          {veh.registration}
                        </span>
                        <span className="text-xs font-bold text-white">{veh.driverName}</span>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          veh.status === 'DEVIATED'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {veh.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                      <div>Route Code: <span className="text-slate-200 font-mono">{veh.routeCode}</span></div>
                      <div>Compliance: <span className="text-emerald-400 font-mono font-bold">{veh.routeCompliancePct}%</span></div>
                      <div>Learners Aboard: <span className="text-white font-mono font-bold">{veh.assignedLearnersCount}</span></div>
                      <div>Speed: <span className="text-amber-400 font-mono font-bold">{veh.speedKmh} km/h</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: EXECUTIVE NATIONAL COMMAND KPIS */}
      {activeSubTab === 'nationalkpis' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Activity className="w-5 h-5 text-purple-400" />
              <span>National Executive Operational Key Performance Indicators</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Protected Learners</span>
                <span className="block text-3xl font-extrabold text-blue-400 font-mono">
                  {SAMPLE_NATIONAL_KPIS.protectedLearners.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">Across 9 Provinces</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Wearables Online</span>
                <span className="block text-3xl font-extrabold text-emerald-400 font-mono">
                  {SAMPLE_NATIONAL_KPIS.onlinePercentage}%
                </span>
                <span className="text-[10px] text-slate-500">248,120 Active GPS Heartbeats</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Avg Tactical Response Time</span>
                <span className="block text-3xl font-extrabold text-amber-400 font-mono">
                  {SAMPLE_NATIONAL_KPIS.avgResponseTimeSec}s
                </span>
                <span className="text-[10px] text-slate-500">3.5 Minutes National SLA</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Child Safety Decision Latency</span>
                <span className="block text-3xl font-extrabold text-teal-400 font-mono">
                  {SAMPLE_NATIONAL_KPIS.avgDecisionLatencyMs}ms
                </span>
                <span className="text-[10px] text-slate-500">Real-Time Rule Engine Evaluation</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: LIVE STREAM & DIGITAL TWIN */}
      {activeSubTab === 'eventstream' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-teal-400 animate-pulse" />
                  <span>Real-Time Operational Event Bus Stream</span>
                </h3>
                <p className="text-xs text-slate-400">Verified platform events consumed from previous modules in real time.</p>
              </div>

              <button
                onClick={() => setStreamPaused(!streamPaused)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  streamPaused ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {streamPaused ? 'Stream Paused' : 'Pause Live Feed'}
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-[380px] overflow-y-auto space-y-2 font-mono text-xs">
              {liveEvents.map((evt) => (
                <div
                  key={evt.id}
                  className={`p-3 rounded-lg border flex items-center justify-between gap-4 ${
                    evt.severity === 'CRITICAL'
                      ? 'bg-red-950/40 border-red-800 text-red-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-500 text-[10px]">{evt.timestamp}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 text-[10px] font-bold">
                      {evt.eventType}
                    </span>
                    <span className="font-bold text-white">{evt.learnerName}</span>
                    <span>{evt.description}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                    {evt.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: PRISMA SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Prisma Database Schema for C3 Platform</h3>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-bold">
                C3 Operational Tables
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {C3_CODE_SPECS[0].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: NESTJS & WEBSOCKET SPECS */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">NestJS Services, Gateway & REST Controllers</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {C3_CODE_SPECS.map((spec) => (
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

      {/* CRITICAL BUSINESS RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_C3_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-400">RULE #{rule.id}</span>
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
