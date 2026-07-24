import React, { useState, useEffect } from 'react';
import { Footer } from './Footer';
import { itisWebSocketHub } from '../lib/websocket-hub';
import {
  Shield,
  Siren,
  MapPin,
  Radio,
  Activity,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Phone,
  User,
  School,
  Car,
  Database,
  Lock,
  Layers,
  Zap,
  Maximize2,
  Minimize2,
  Monitor,
  RefreshCw,
  Send,
  FileText,
  FileCheck2,
  Share2,
  Eye,
  Sliders,
  ChevronRight,
  TrendingUp,
  Award,
  Bell,
  Sparkles,
  Volume2,
  Cpu,
  Battery,
  Wifi,
  Navigation,
  Key,
  ShieldCheck,
  Building2,
  MessageSquare,
  Users
} from 'lucide-react';
import {
  RSA_PROVINCES,
  SAMPLE_C3_INCIDENTS,
  SAMPLE_RESPONDERS,
  SAMPLE_C3_TELEMETRY_STREAM,
  SAMPLE_C3_FLEET,
  SAMPLE_C3_AUDIT_LOGS,
  CRITICAL_C3_RULES,
  C3Incident,
  EmergencyResponder,
  C3TelemetryPacket,
  C3FleetDevice,
  C3AuditEntry,
  RsaProvince
} from '../data/c3CommandData';

export function C3CommandCentreModule() {
  // Navigation State
  const [selectedProvince, setSelectedProvince] = useState<string>('NATIONAL');
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'gis_map'
    | 'incidents'
    | 'dispatch'
    | 'telemetry'
    | 'fleet'
    | 'school_ops'
    | 'comms'
    | 'operator'
    | 'audit'
  >('dashboard');

  // Presentation & Security Modes
  const [isVideoWallMode, setIsVideoWallMode] = useState<boolean>(false);
  const [isMultiMonitorView, setIsMultiMonitorView] = useState<boolean>(false);
  const [isTacticalDark, setIsTacticalDark] = useState<boolean>(true);
  const [isScreenLocked, setIsScreenLocked] = useState<boolean>(false);
  const [unlockPin, setUnlockPin] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Data States
  const [incidents, setIncidents] = useState<C3Incident[]>(SAMPLE_C3_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<C3Incident>(SAMPLE_C3_INCIDENTS[0]);
  const [responders, setResponders] = useState<EmergencyResponder[]>(SAMPLE_RESPONDERS);
  const [telemetryPackets, setTelemetryPackets] = useState<C3TelemetryPacket[]>(SAMPLE_C3_TELEMETRY_STREAM);
  const [fleetDevices, setFleetDevices] = useState<C3FleetDevice[]>(SAMPLE_C3_FLEET);
  const [auditLogs, setAuditLogs] = useState<C3AuditEntry[]>(SAMPLE_C3_AUDIT_LOGS);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  // WebSocket Live Streaming Simulator
  const [wsConnected, setWsConnected] = useState<boolean>(true);
  const [wsPingMs, setWsPingMs] = useState<number>(18);
  const [livePacketsCount, setLivePacketsCount] = useState<number>(142980);

  // Live SAST Clock State
  const [sastTime, setSastTime] = useState<string>('');
  const [utcTime, setUtcTime] = useState<string>('');

  // Comms Chat State
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: string; channel: string; text: string; time: string; role: string }>
  >([
    { sender: 'SAPS 10111 Dispatch', channel: 'SAPS', text: 'Unit GP-FS-04 is 3 minutes away from Soweto Central Primary.', time: '08:14:15', role: 'SAPS' },
    { sender: 'Operator J. van der Merwe', channel: 'SAPS', text: 'Confirmed. Guardian Nompumelelo Mkhize contacted and informed.', time: '08:14:22', role: 'C3_OPERATOR' },
    { sender: 'Gauteng EMS Metro Control', channel: 'EMS', text: 'Ambulance EMS-GP-12 dispatched as backup ALS unit.', time: '08:14:30', role: 'EMS' },
  ]);
  const [newChatMessage, setNewChatMessage] = useState<string>('');
  const [selectedChatChannel, setSelectedChatChannel] = useState<'SAPS' | 'EMS' | 'SCHOOLS' | 'PARENTS'>('SAPS');

  // Operator Status
  const [operatorOnBreak, setOperatorOnBreak] = useState<boolean>(false);
  const [operatorSessionStart] = useState<string>('06:00:00 AM');

  // Video Wall Auto-Cycle timer
  const [videoWallCycleIndex, setVideoWallCycleIndex] = useState<number>(0);

  // Live Clock & Backend Polling effect
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setSastTime(now.toLocaleTimeString('en-ZA', { timeZone: 'Africa/Johannesburg', hour12: false }) + ' SAST');
      setUtcTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateClocks();
    const timer = setInterval(updateClocks, 1000);

    const fetchLiveIncidents = async () => {
      try {
        const res = await fetch('/api/v1/incidents');
        const data = await res.json();
        if (data.status === 'SUCCESS' && Array.isArray(data.activeIncidents) && data.activeIncidents.length > 0) {
          // Merge with current state
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchLiveIncidents();

    const unsubscribeIncidents = itisWebSocketHub.subscribe('incidents', (msg: any) => {
      if (msg.event === 'SOS_TRIGGERED' || msg.event === 'INCIDENT_UPDATED') {
        const payload = msg.payload;
        if (payload) {
          const newIncident: C3Incident = {
            id: payload.id || `INC-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            provinceCode: 'GP',
            district: 'Johannesburg South',
            schoolName: payload.schoolName || 'Diepkloof Primary School',
            learnerId: payload.learnerId || 'lrn-901',
            learnerName: payload.learnerName || 'Sipho Mokoena',
            learnerPhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150',
            learnerAge: 11,
            learnerGrade: 'Grade 6',
            wearableSerial: 'ITIS-WB-2026-9042',
            category: 'SOS_PANIC',
            severity: payload.severity || 'CRITICAL',
            status: payload.status || 'OPEN',
            slaCountdownSeconds: 300,
            operatorAssigned: 'Operator #142',
            lat: payload.latitude || -26.2483,
            lng: payload.longitude || 27.9322,
            address: 'Direct GPS Coordinates Signal Pinpoint',
            riskScore: 98,
            decisionExplanation: 'Live SOS activation received via wearable panic button',
            medicalAlerts: ['Asthma'],
            batteryLevel: 94,
            signalDbm: -72,
            speedKmh: 0,
            parentContacted: true,
            schoolNotified: true,
            assignedResponders: [payload.dispatchedUnit || 'SAPS Soweto Van #42'],
            responderEtaMinutes: payload.responderEtaMinutes || 5,
            timeline: [{ time: new Date().toLocaleTimeString(), event: 'SOS Panic Alert Broadcasted', actor: 'PATIENT_BAND' }],
            evidenceHash: '0xa1b2c3d4e5f67890'
          };
          setIncidents((prev) => [newIncident, ...prev.filter(i => i.id !== newIncident.id)]);
        }
      }
    });

    return () => {
      clearInterval(timer);
      unsubscribeIncidents();
    };
  }, []);

  // Live WebSocket Simulation effect (adds streaming telemetry packets)
  useEffect(() => {
    const wsInterval = setInterval(() => {
      if (!wsConnected) return;
      setWsPingMs(Math.floor(14 + Math.random() * 12));
      setLivePacketsCount((prev) => prev + 1);

      // Random jitter for selected incident battery/signal
      if (Math.random() > 0.6) {
        setTelemetryPackets((prev) => {
          const newPacket: C3TelemetryPacket = {
            deviceId: `ITIS-nRF9160-${Math.floor(1000 + Math.random() * 8999)}`,
            learnerName: ['Lethabo Dlamini', 'Kamogelo Sithole', 'Lindiwe Naidoo', 'Thabo Khumalo'][
              Math.floor(Math.random() * 4)
            ],
            timestamp: new Date().toLocaleTimeString('en-ZA', { hour12: false }) + '.' + Math.floor(Math.random() * 900),
            lat: -26.2485 + (Math.random() - 0.5) * 0.01,
            lng: 27.9082 + (Math.random() - 0.5) * 0.01,
            heading: Math.floor(Math.random() * 360),
            speedKmh: Math.random() > 0.8 ? Math.floor(Math.random() * 40) : 0,
            altitudeMeters: 1740 + Math.floor((Math.random() - 0.5) * 10),
            batteryPct: Math.floor(80 + Math.random() * 20),
            signalDbm: -60 - Math.floor(Math.random() * 25),
            satellites: Math.floor(8 + Math.random() * 6),
            sosTriggered: false,
            tamperTriggered: false,
            packetLatencyMs: Math.floor(12 + Math.random() * 20),
          };
          return [newPacket, ...prev.slice(0, 19)];
        });
      }
    }, 2000);
    return () => clearInterval(wsInterval);
  }, [wsConnected]);

  // Video Wall Auto-Cycle Effect
  useEffect(() => {
    if (!isVideoWallMode) return;
    const cycleTimer = setInterval(() => {
      setVideoWallCycleIndex((prev) => (prev + 1) % 4);
    }, 15000);
    return () => clearInterval(cycleTimer);
  }, [isVideoWallMode]);

  // SLA Countdown Interval effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIncidents((prev) =>
        prev.map((inc) => {
          if (inc.status === 'RESOLVED') return inc;
          return {
            ...inc,
            slaCountdownSeconds: Math.max(0, inc.slaCountdownSeconds - 1),
          };
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filtered Incidents
  const filteredIncidents = incidents.filter((inc) => {
    const matchesProvince = selectedProvince === 'NATIONAL' || inc.provinceCode === selectedProvince;
    const matchesSeverity = severityFilter === 'ALL' || inc.severity === severityFilter;
    const matchesSearch =
      inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProvince && matchesSeverity && matchesSearch;
  });

  // Action: Handle Operator Action on Incident
  const handleIncidentAction = (
    actionType: 'CONTACT_PARENT' | 'NOTIFY_SCHOOL' | 'DISPATCH_AGENCY' | 'RESOLVE'
  ) => {
    const updatedInc = { ...selectedIncident };
    const nowStr = new Date().toLocaleTimeString('en-ZA', { hour12: false });

    let newEventText = '';
    if (actionType === 'CONTACT_PARENT') {
      updatedInc.parentContacted = true;
      newEventText = `Operator contacted guardian regarding emergency status.`;
    } else if (actionType === 'NOTIFY_SCHOOL') {
      updatedInc.schoolNotified = true;
      newEventText = `School principal & gate security briefed on incident.`;
    } else if (actionType === 'DISPATCH_AGENCY') {
      updatedInc.status = 'DISPATCHED';
      newEventText = `SAPS 10111 Flying Squad unit dispatched to exact GPS coords.`;
    } else if (actionType === 'RESOLVE') {
      updatedInc.status = 'RESOLVED';
      newEventText = `Incident verified resolved by C3 Command operator and on-scene officers.`;
    }

    updatedInc.timeline = [...updatedInc.timeline, { time: nowStr, event: newEventText, actor: 'Cmdr. J. van der Merwe (Op-01)' }];

    // Update state
    setSelectedIncident(updatedInc);
    setIncidents((prev) => prev.map((item) => (item.id === updatedInc.id ? updatedInc : item)));

    // Append to Audit Log
    const newAudit: C3AuditEntry = {
      id: `AUD-C3-${Math.floor(100 + Math.random() * 899)}`,
      timestamp: nowStr,
      operatorId: 'OP-01',
      operatorName: 'Cmdr. J. van der Merwe',
      action: actionType,
      incidentId: updatedInc.id,
      details: newEventText,
      ipAddress: '10.200.4.12',
      hash: '0x' + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10),
    };
    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // Action: Handle Send Chat
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;
    const nowStr = new Date().toLocaleTimeString('en-ZA', { hour12: false });
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'Operator J. van der Merwe',
        channel: selectedChatChannel,
        text: newChatMessage.trim(),
        time: nowStr,
        role: 'C3_OPERATOR',
      },
    ]);
    setNewChatMessage('');
  };

  // Action: Handle Unlock Screen
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockPin === '10111' || unlockPin === '2026' || unlockPin === '1234') {
      setIsScreenLocked(false);
      setUnlockPin('');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Helper for severity styling
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  // Helper for status styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DISPATCHED':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
      case 'ON_SCENE':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'RESOLVED':
        return 'bg-slate-600/30 text-slate-400 border-slate-600/40';
      default:
        return 'bg-red-500/20 text-red-400 border-red-500/40';
    }
  };

  // IF SCREEN IS LOCKED
  if (isScreenLocked) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-white font-mono">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/40 rounded-2xl p-8 shadow-2xl shadow-red-900/30 text-center space-y-6">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/40 rounded-2xl flex items-center justify-center mx-auto text-red-400 animate-pulse">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wider text-slate-100">NATIONAL COMMAND CENTRE (C3)</h2>
            <p className="text-xs text-red-400 mt-1 uppercase tracking-widest font-sans">
              Tactical Screen Lock Active • Restricted Access
            </p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 text-left mb-1 font-sans">
                Enter Operator Security PIN (Default: 10111)
              </label>
              <input
                type="password"
                maxLength={6}
                value={unlockPin}
                onChange={(e) => setUnlockPin(e.target.value)}
                placeholder="• • • • •"
                className="w-full text-center text-2xl tracking-widest bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            {pinError && <p className="text-xs text-red-400 font-sans">Invalid PIN code. Access denied.</p>}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-sans font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>AUTHENTICATE & UNLOCK C3</span>
            </button>
          </form>
          <div className="text-[10px] text-slate-500 font-sans">
            RSA State Security Protocol • STSAFE-A110 Hardware Enclave Active
          </div>
        </div>
      </div>
    );
  }

  // IF VIDEO WALL MODE IS ACTIVE
  if (isVideoWallMode) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-mono flex flex-col justify-between select-none">
        {/* Top Header Video Wall */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600/20 border border-red-500/50 rounded-xl flex items-center justify-center text-red-400 animate-pulse">
              <Siren className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-black text-white tracking-wider">REPUBLIC OF SOUTH AFRICA • C3 VIDEO WALL</h1>
                <span className="bg-red-500 text-white text-xs font-bold font-sans px-2.5 py-0.5 rounded-full animate-pulse">
                  LIVE NOC DISPLAY
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                National Command & Control Center • Auto-Cycling Scene {videoWallCycleIndex + 1}/4
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-right">
            <div>
              <div className="text-xl font-black text-emerald-400">{sastTime}</div>
              <div className="text-xs text-slate-400">{utcTime}</div>
            </div>
            <button
              onClick={() => setIsVideoWallMode(false)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-sans font-bold border border-slate-700 flex items-center space-x-2"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Exit Video Wall</span>
            </button>
          </div>
        </div>

        {/* Dynamic Video Wall Screens based on cycle */}
        <div className="my-6 grid grid-cols-12 gap-6 flex-1">
          {videoWallCycleIndex === 0 && (
            <div className="col-span-12 grid grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-xs text-slate-400 font-sans uppercase">Active Emergency SOS</span>
                <span className="text-6xl font-black text-red-500 animate-pulse">03</span>
                <span className="text-xs text-red-400 font-sans">SAPS 10111 Dispatched</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-xs text-slate-400 font-sans uppercase">Learners Protected</span>
                <span className="text-6xl font-black text-blue-400">11.8M</span>
                <span className="text-xs text-blue-300 font-sans">Across 9 RSA Provinces</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-xs text-slate-400 font-sans uppercase">Devices Online</span>
                <span className="text-6xl font-black text-emerald-400">7.65M</span>
                <span className="text-xs text-emerald-300 font-sans">sub-250ms Ping</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-xs text-slate-400 font-sans uppercase">Average Response ETA</span>
                <span className="text-6xl font-black text-amber-400">4.2m</span>
                <span className="text-xs text-amber-300 font-sans">SAPS + EMS Composite</span>
              </div>

              <div className="col-span-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-sans flex items-center justify-between">
                  <span>9 RSA PROVINCIAL THREAT STATUS & LIVE INCIDENTS</span>
                  <span className="text-xs text-slate-400 font-mono">STSAFE HARDWARE VERIFIED</span>
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {RSA_PROVINCES.map((prov) => (
                    <div key={prov.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-100">{prov.name} ({prov.code})</div>
                        <div className="text-xs text-slate-400 font-sans">{prov.activeDevicesOnline.toLocaleString()} Devices • {prov.totalSchools} Schools</div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-sans font-bold ${prov.activeIncidents > 0 ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {prov.activeIncidents} Active Incidents
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {videoWallCycleIndex !== 0 && (
            <div className="col-span-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-red-400 font-sans uppercase font-bold tracking-widest">CRITICAL INCIDENT ACTIVE VIEW</span>
                  <h2 className="text-3xl font-black text-white mt-1">{selectedIncident.learnerName} ({selectedIncident.learnerGrade})</h2>
                  <p className="text-sm text-slate-300 font-sans mt-1">{selectedIncident.address} • {selectedIncident.schoolName}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-red-500">{selectedIncident.slaCountdownSeconds}s</div>
                  <div className="text-xs text-slate-400 font-sans">SLA COUNTDOWN TO ESCALATION</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 my-6 font-sans">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">ASSIGNED RESPONDERS</div>
                  <div className="font-bold text-white mt-1">{selectedIncident.assignedResponders.join(' & ')}</div>
                  <div className="text-sm text-emerald-400 mt-2 font-mono">ETA: {selectedIncident.responderEtaMinutes} Minutes</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">TELEMETRY DIAGNOSTICS</div>
                  <div className="text-sm text-slate-200 mt-1">Battery: <span className="text-emerald-400 font-mono">{selectedIncident.batteryLevel}%</span> | Signal: <span className="text-blue-400 font-mono">{selectedIncident.signalDbm} dBm</span></div>
                  <div className="text-sm text-slate-200 mt-1">Speed: <span className="font-mono">{selectedIncident.speedKmh} km/h</span> | Risk Score: <span className="text-red-400 font-bold">{selectedIncident.riskScore}/100</span></div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">GUARDIAN & SCHOOL STATUS</div>
                  <div className="text-xs text-emerald-400 mt-1 font-bold">✓ Guardian Contacted via Voice & SMS</div>
                  <div className="text-xs text-emerald-400 mt-1 font-bold">✓ School Gate Security Notified</div>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-sans">
                <span>Cryptographic Evidence Hash: <span className="font-mono text-slate-400">{selectedIncident.evidenceHash}</span></span>
                <span className="text-amber-400 font-bold">Operator: {selectedIncident.operatorAssigned}</span>
              </div>
            </div>
          )}
        </div>

        {/* Ticker Bottom */}
        <div className="bg-red-950/60 border border-red-500/30 rounded-xl p-3 flex items-center space-x-4">
          <span className="bg-red-600 text-white text-[10px] font-bold font-sans px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap animate-pulse">
            EMERGENCY TICKER
          </span>
          <div className="overflow-hidden whitespace-nowrap text-xs text-red-200 font-sans">
            • [GP SOWETO] SOS Panic Triggered at Soweto Central Primary — SAPS Flying Squad GP-FS-04 dispatched (ETA 3m) • [KZN UMLAZI] Geofence Breach — Metro Police Unit KZN-MP-09 on scene • [WC KHAYELITSHA] Optical Tamper Resolved by School Principal • [LIVE PACKETS] 142,980/sec sub-250ms LTE-M/NB-IoT Telemetry Ping •
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen text-slate-100 font-sans transition-colors duration-300 ${isTacticalDark ? 'bg-slate-950' : 'bg-slate-900'}`}>
      {/* 1. TOP C3 COMMAND BAR */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600/20 border border-red-500/50 rounded-xl flex items-center justify-center text-red-400 shadow-md shadow-red-900/30 animate-pulse">
              <Siren className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black tracking-tight text-white">NATIONAL COMMAND CENTRE</span>
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                  C3
                </span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                  </span>
              </div>
              <p className="text-xs text-slate-400">Integrated School Transport & Learner Safety Dispatch Command</p>
            </div>
          </div>

          {/* Live Clocks & WebSocket Status */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-white font-bold">{sastTime}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{utcTime}</span>
            </div>

            {/* WebSocket Stream Indicator */}
            <div
              onClick={() => setWsConnected(!wsConnected)}
              className="cursor-pointer bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-2 text-xs font-mono"
              title="Click to toggle simulated WebSocket connection"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${wsConnected ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`} />
              <span className={wsConnected ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {wsConnected ? `WS LIVE (${wsPingMs}ms)` : 'WS DISCONNECTED'}
              </span>
            </div>

            {/* Control Mode Buttons */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setIsVideoWallMode(true)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-lg border border-slate-700 text-xs font-semibold flex items-center space-x-1"
                title="Enter Large Display Video Wall Mode"
              >
                <Maximize2 className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Video Wall</span>
              </button>

              <button
                onClick={() => setIsMultiMonitorView(!isMultiMonitorView)}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center space-x-1 ${
                  isMultiMonitorView
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
                title="Toggle Quad Multi-Monitor View"
              >
                <Monitor className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">4-Monitor View</span>
              </button>

              <button
                onClick={() => setIsScreenLocked(true)}
                className="bg-red-950/60 hover:bg-red-900/80 text-red-200 p-2 rounded-lg border border-red-500/40 text-xs font-semibold flex items-center space-x-1"
                title="Lock C3 Operator Screen"
              >
                <Lock className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">Lock</span>
              </button>
            </div>
          </div>
        </div>

        {/* PROVINCE JURISDICTION & NAVIGATION TABS BAR */}
        <div className="bg-slate-950 border-t border-slate-800 px-4 sm:px-6 lg:px-8 py-2">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Province Scope Selector */}
            <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono whitespace-nowrap">
                Scope:
              </span>
              <button
                onClick={() => setSelectedProvince('NATIONAL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedProvince === 'NATIONAL'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                🇿🇦 REPUBLIC OF SOUTH AFRICA (ALL)
              </button>
              {RSA_PROVINCES.map((prov) => (
                <button
                  key={prov.id}
                  onClick={() => setSelectedProvince(prov.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center space-x-1 ${
                    selectedProvince === prov.code
                      ? 'bg-slate-800 text-amber-400 border border-amber-500/50 font-bold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{prov.code}</span>
                  {prov.activeIncidents > 0 && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Operator Availability Switch */}
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
              <span className="hidden lg:inline">Operator: Cmdr. J. van der Merwe (Op-01)</span>
              <button
                onClick={() => setOperatorOnBreak(!operatorOnBreak)}
                className={`px-2.5 py-1 rounded-lg font-bold ${
                  operatorOnBreak
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {operatorOnBreak ? '⏸️ ON BREAK' : '🟢 ACTIVE ON DUTY'}
              </button>
            </div>
          </div>
        </div>

        {/* MODULE VIEW TABS */}
        <div className="bg-slate-900 border-t border-slate-800 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>National Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('gis_map')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'gis_map'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>GIS Tactical Map</span>
            </button>

            <button
              onClick={() => setActiveTab('incidents')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'incidents'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Siren className="w-3.5 h-3.5 text-red-400" />
              <span>Incident Queue ({filteredIncidents.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('dispatch')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'dispatch'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-purple-400" />
              <span>Dispatch & Responders</span>
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Telemetry Stream</span>
            </button>

            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'fleet'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fleet Monitor</span>
            </button>

            <button
              onClick={() => setActiveTab('school_ops')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'school_ops'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <School className="w-3.5 h-3.5 text-indigo-400" />
              <span>School Operations</span>
            </button>

            <button
              onClick={() => setActiveTab('comms')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'comms'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
              <span>Comms Centre</span>
            </button>

            <button
              onClick={() => setActiveTab('operator')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'operator'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5 text-yellow-400" />
              <span>Operator Console</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                activeTab === 'audit'
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audit Ledger</span>
            </button>
          </div>
        </div>
      </header>

      {/* MULTI-MONITOR QUAD PREVIEW MODE (IF TOGGLED) */}
      {isMultiMonitorView && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
          <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-blue-400 font-mono font-bold">
              <span className="flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span>QUAD MULTI-MONITOR WORKSTATION SIMULATOR (DISPLAY 1 - 4)</span>
              </span>
              <button
                onClick={() => setIsMultiMonitorView(false)}
                className="text-slate-400 hover:text-white"
              >
                Close Quad View
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-48 flex flex-col justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono">MONITOR 1: NATIONAL GIS TACTICAL MAP</span>
                <div className="flex-1 bg-slate-900/80 rounded-lg my-2 border border-slate-800 flex items-center justify-center text-slate-500 text-xs font-mono">
                  [Interactive GIS Canvas Active • GPS Corridors Rendered]
                </div>
                <div className="text-[10px] text-slate-400">FPS: 60 • Markers: 12,840</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-48 flex flex-col justify-between">
                <span className="text-xs font-bold text-red-400 font-mono">MONITOR 2: CAD INCIDENT WORKSPACE</span>
                <div className="flex-1 bg-slate-900/80 rounded-lg my-2 border border-slate-800 p-2 text-xs font-mono text-slate-300">
                  Selected Incident: {selectedIncident.id} ({selectedIncident.learnerName})
                  <div className="text-[10px] text-red-400 mt-1">Status: {selectedIncident.status} | ETA: {selectedIncident.responderEtaMinutes}m</div>
                </div>
                <div className="text-[10px] text-slate-400">SLA Timer: {selectedIncident.slaCountdownSeconds}s</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-48 flex flex-col justify-between">
                <span className="text-xs font-bold text-purple-400 font-mono">MONITOR 3: DISPATCH & RESPONDERS</span>
                <div className="flex-1 bg-slate-900/80 rounded-lg my-2 border border-slate-800 p-2 text-xs font-mono text-slate-300">
                  Active Units: SAPS Flying Squad GP-FS-04, Gauteng EMS-GP-12
                </div>
                <div className="text-[10px] text-slate-400">Radio Channel: SAPS 10111 Encrypted</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-48 flex flex-col justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">MONITOR 4: TELEMETRY & PACKET STREAM</span>
                <div className="flex-1 bg-slate-900/80 rounded-lg my-2 border border-slate-800 p-2 text-xs font-mono text-slate-300">
                  Live Packets Received: {livePacketsCount.toLocaleString()} | WS Ping: {wsPingMs}ms
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">sub-250ms LTE-M Pipeline Active</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: NATIONAL DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>ACTIVE SOS</span>
                  <Siren className="w-4 h-4 text-red-500 animate-pulse" />
                </div>
                <div className="text-3xl font-black text-red-500 mt-2 font-mono">
                  03
                </div>
                <div className="text-[10px] text-red-400 mt-1 font-bold">CRITICAL CAD DISPATCH</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>LEARNERS PROTECTED</span>
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white mt-2 font-mono">
                  11.8M
                </div>
                <div className="text-[10px] text-slate-400 mt-1">9 RSA Provinces</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>DEVICES ONLINE</span>
                  <Wifi className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400 mt-2 font-mono">
                  7.65M
                </div>
                <div className="text-[10px] text-emerald-400/80 mt-1">98.4% Hardware Health</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>RESPONDERS ON SCENE</span>
                  <Car className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-black text-purple-400 mt-2 font-mono">
                  1,480
                </div>
                <div className="text-[10px] text-slate-400 mt-1">SAPS / EMS / Metro</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>AVG RESPONSE TIME</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-amber-400 mt-2 font-mono">
                  4.2m
                </div>
                <div className="text-[10px] text-amber-400/80 mt-1">Below 5m SLA Target</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>LIVE PACKET RATE</span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-cyan-400 mt-2 font-mono truncate">
                  {livePacketsCount.toLocaleString()}
                </div>
                <div className="text-[10px] text-cyan-300 mt-1 font-mono">{wsPingMs}ms Latency</div>
              </div>
            </div>

            {/* RSA Province Grid Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>PROVINCIAL COMMAND CENTRE JURISDICTION STATUS</span>
                  </h2>
                  <p className="text-xs text-slate-400">9 Republic of South Africa Regional Operations Breakdown</p>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  Jurisdiction Scope: {selectedProvince}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RSA_PROVINCES.map((prov) => (
                  <div
                    key={prov.id}
                    onClick={() => {
                      setSelectedProvince(prov.code);
                      setActiveTab('incidents');
                    }}
                    className={`cursor-pointer border rounded-2xl p-5 transition-all hover:scale-[1.01] ${
                      selectedProvince === prov.code
                        ? 'bg-slate-800 border-amber-500 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-black text-white">{prov.name}</span>
                        <span className="text-xs font-mono font-bold text-slate-400">({prov.code})</span>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold font-mono ${
                          prov.activeIncidents > 0
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {prov.activeIncidents} Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">SCHOOLS / LEARNERS</span>
                        <span className="text-slate-200 font-bold">{prov.totalSchools} / {(prov.totalLearners / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">AVG SAPS/EMS ETA</span>
                        <span className="text-amber-400 font-bold">{prov.responseAvgMinutes} min</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Capital: {prov.capital}</span>
                      <span className="text-blue-400 flex items-center space-x-1 font-semibold">
                        <span>Inspect Region</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Risk Prediction & Active Alerts Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 mb-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI CORRIDOR RISK PREDICTIONS & ANOMALIES</span>
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-amber-200 flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">High Density Transport Anomaly • Soweto Circuit 04</div>
                      <div className="text-[11px] text-amber-300/80 mt-0.5 font-sans">
                        AI detected 14 buses exceeding 80 km/h on Golden Highway. Automated speed warning issued to drivers and principals.
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-blue-200 flex items-start space-x-3">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold font-mono">Geofence Safe Corridor Integrity • 99.8%</div>
                      <div className="text-[11px] text-blue-300/80 mt-0.5 font-sans">
                        All morning transport drops at Umlazi V-Section verified complete with zero route deviation flags.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical Rules Reference */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 mb-4">
                  <Shield className="w-4 h-4 text-red-400" />
                  <span>NATIONAL C3 COMMAND CENTRE SPECIFICATIONS</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {CRITICAL_C3_RULES.slice(0, 4).map((rule) => (
                    <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider font-mono block">
                        {rule.badge}
                      </span>
                      <h4 className="text-xs font-bold text-slate-200 mt-1">{rule.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{rule.ruleText}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE GIS TACTICAL MAP */}
        {activeTab === 'gis_map' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    <span>NATIONAL GIS TACTICAL MAP • LIVE POSITIONING</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Real-time GPS tracking for 11.8M learners, transport fleet, schools, and emergency responders.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-mono">Map Layers:</span>
                  <button className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-lg text-xs font-bold">
                    ✓ Schools
                  </button>
                  <button className="bg-blue-600/20 text-blue-400 border border-blue-500/40 px-2.5 py-1 rounded-lg text-xs font-bold">
                    ✓ Learners
                  </button>
                  <button className="bg-red-600/20 text-red-400 border border-red-500/40 px-2.5 py-1 rounded-lg text-xs font-bold">
                    ✓ Responders
                  </button>
                </div>
              </div>

              {/* SIMULATED MAP STAGE */}
              <div className="relative w-full h-[500px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between p-6">
                {/* Background Map Grid & Visual Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                {/* Simulated Geofence Corridors */}
                <div className="absolute top-1/4 left-1/3 w-64 h-32 border-2 border-dashed border-emerald-500/40 bg-emerald-500/5 rounded-3xl flex items-center justify-center">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold bg-slate-950/80 px-2 py-1 rounded border border-emerald-500/30">
                    SAFE CORRIDOR: SOWETO CIRCUIT 04
                  </span>
                </div>

                {/* Simulated Incident Pin 1 */}
                <div
                  onClick={() => {
                    setSelectedIncident(SAMPLE_C3_INCIDENTS[0]);
                    setActiveTab('incidents');
                  }}
                  className="absolute top-1/3 left-1/2 transform -translate-x-1/2 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-red-600/30 border-2 border-red-500 animate-ping absolute" />
                    <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-xl shadow-red-600/50">
                      <Siren className="w-4 h-4 animate-bounce" />
                    </div>
                  </div>
                  <div className="mt-1 bg-slate-900 border border-red-500/60 p-2 rounded-xl text-center shadow-xl font-mono text-[11px] text-white">
                    <div className="font-bold text-red-400">SOS: Bulumko Mkhize</div>
                    <div className="text-[10px] text-slate-300">Soweto Central Primary</div>
                  </div>
                </div>

                {/* Simulated Responder Pin */}
                <div className="absolute top-1/3 left-1/2 transform translate-x-16 translate-y-12 cursor-pointer">
                  <div className="bg-purple-600 text-white px-2.5 py-1 rounded-lg border border-purple-400 font-mono text-[10px] font-bold flex items-center space-x-1 shadow-lg">
                    <Car className="w-3 h-3 text-purple-200" />
                    <span>SAPS Unit GP-FS-04 (ETA 3m)</span>
                  </div>
                </div>

                {/* Simulated Incident Pin 2 (KZN) */}
                <div
                  onClick={() => {
                    setSelectedIncident(SAMPLE_C3_INCIDENTS[1]);
                    setActiveTab('incidents');
                  }}
                  className="absolute bottom-1/4 right-1/4 cursor-pointer"
                >
                  <div className="bg-amber-600 text-white px-2.5 py-1 rounded-lg border border-amber-400 font-mono text-[10px] font-bold flex items-center space-x-1 shadow-lg">
                    <AlertTriangle className="w-3 h-3" />
                    <span>GEOFENCE: Siyabonga Dlamini (Umlazi)</span>
                  </div>
                </div>

                {/* Map HUD Overlay Top */}
                <div className="relative z-10 flex items-center justify-between bg-slate-900/90 backdrop-blur p-3 rounded-xl border border-slate-800 text-xs font-mono">
                  <div className="flex items-center space-x-4">
                    <span>GPS FIX: <span className="text-emerald-400 font-bold">11 SATELLITES</span></span>
                    <span>LATENCY: <span className="text-cyan-400 font-bold">18ms</span></span>
                    <span>PROVINCE: <span className="text-amber-400 font-bold">{selectedProvince}</span></span>
                  </div>
                  <div className="text-slate-400">Map Canvas Engine: MapLibre GL • Sub-250ms Vector Stream</div>
                </div>

                {/* Map HUD Overlay Bottom */}
                <div className="relative z-10 flex items-center justify-between bg-slate-900/90 backdrop-blur p-3 rounded-xl border border-slate-800 text-xs font-mono">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <span className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                      <span>SOS Emergency</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      <span>In Safe Corridor</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                      <span>SAPS / EMS Responder</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('incidents')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold px-3 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <span>Inspect CAD Incidents</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INCIDENT QUEUE & CAD WORKSPACE */}
        {activeTab === 'incidents' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Priority Queue (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Siren className="w-4 h-4 text-red-500" />
                    <span>PRIORITY INCIDENT QUEUE</span>
                  </h3>
                  <span className="bg-red-500/20 text-red-400 text-xs font-mono font-bold px-2 py-0.5 rounded border border-red-500/30">
                    {filteredIncidents.length} TICKETS
                  </span>
                </div>

                {/* Search & Severity Filters */}
                <div className="space-y-2 mb-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search learner, school, ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
                      <button
                        key={sev}
                        onClick={() => setSeverityFilter(sev)}
                        className={`flex-1 py-1 rounded-lg text-[10px] font-bold uppercase ${
                          severityFilter === sev
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Queue Cards */}
                <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
                  {filteredIncidents.map((inc) => (
                    <div
                      key={inc.id}
                      onClick={() => setSelectedIncident(inc)}
                      className={`cursor-pointer border rounded-xl p-3 transition-all ${
                        selectedIncident.id === inc.id
                          ? 'bg-slate-800 border-red-500/80 shadow-lg shadow-red-950/40 ring-1 ring-red-500/50'
                          : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-200">{inc.id}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border font-mono font-bold ${getSeverityBadge(
                            inc.severity
                          )}`}
                        >
                          {inc.severity}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <img
                          src={inc.learnerPhoto}
                          alt={inc.learnerName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-700"
                        />
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-white truncate">{inc.learnerName}</div>
                          <div className="text-[11px] text-slate-400 truncate">{inc.schoolName}</div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono border-t border-slate-800/60 pt-2">
                        <span className="text-slate-400">{inc.timestamp}</span>
                        <span className="text-red-400 font-bold">SLA: {inc.slaCountdownSeconds}s</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Tactical Incident Workspace (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-black text-white font-mono">{selectedIncident.id}</span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded border font-mono font-bold ${getSeverityBadge(
                          selectedIncident.severity
                        )}`}
                      >
                        {selectedIncident.severity} SEVERITY
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded border font-mono font-bold ${getStatusBadge(
                          selectedIncident.status
                        )}`}
                      >
                        {selectedIncident.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Province: {selectedIncident.provinceCode} • District: {selectedIncident.district}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-red-500 font-mono">
                      {selectedIncident.slaCountdownSeconds}s
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">SLA ESCALATION TIMER</div>
                  </div>
                </div>

                {/* Learner Profile & Tactical Telemetry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start space-x-4">
                    <img
                      src={selectedIncident.learnerPhoto}
                      alt={selectedIncident.learnerName}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-slate-700 shadow-md"
                    />
                    <div>
                      <h4 className="text-base font-bold text-white">{selectedIncident.learnerName}</h4>
                      <p className="text-xs text-slate-400">
                        Age {selectedIncident.learnerAge} • {selectedIncident.learnerGrade}
                      </p>
                      <p className="text-xs text-blue-400 font-mono mt-1">{selectedIncident.schoolName}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selectedIncident.medicalAlerts.map((alert, idx) => (
                          <span
                            key={idx}
                            className="bg-red-500/20 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/40"
                          >
                            ⚕️ {alert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Wearable Serial:</span>
                      <span className="text-white font-bold">{selectedIncident.wearableSerial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Battery Level:</span>
                      <span className="text-emerald-400 font-bold">{selectedIncident.batteryLevel}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cellular Signal:</span>
                      <span className="text-blue-400 font-bold">{selectedIncident.signalDbm} dBm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CAD Risk Score:</span>
                      <span className="text-red-400 font-bold">{selectedIncident.riskScore} / 100</span>
                    </div>
                  </div>
                </div>

                {/* CAD AI Decision Explanation */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-amber-400 font-mono flex items-center space-x-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CAD AUTOMATED DECISION REASONING</span>
                  </h4>
                  <p className="text-xs text-slate-300">{selectedIncident.decisionExplanation}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-2">
                    GPS Address: {selectedIncident.address} ({selectedIncident.lat.toFixed(4)}, {selectedIncident.lng.toFixed(4)})
                  </p>
                </div>

                {/* Incident Action Console */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white font-mono uppercase">Operator Dispatch Controls</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      onClick={() => handleIncidentAction('CONTACT_PARENT')}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center space-x-1 ${
                        selectedIncident.parentContacted
                          ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedIncident.parentContacted ? '✓ Guardian Contacted' : 'Call Guardian'}</span>
                    </button>

                    <button
                      onClick={() => handleIncidentAction('NOTIFY_SCHOOL')}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center space-x-1 ${
                        selectedIncident.schoolNotified
                          ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                      }`}
                    >
                      <School className="w-3.5 h-3.5" />
                      <span>{selectedIncident.schoolNotified ? '✓ School Briefed' : 'Notify Principal'}</span>
                    </button>

                    <button
                      onClick={() => handleIncidentAction('DISPATCH_AGENCY')}
                      className="p-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-1"
                    >
                      <Siren className="w-3.5 h-3.5" />
                      <span>Dispatch SAPS 10111</span>
                    </button>

                    <button
                      onClick={() => handleIncidentAction('RESOLVE')}
                      className="p-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 font-mono mb-3">INCIDENT AUDIT TIMELINE</h4>
                  <div className="space-y-2 font-mono text-xs">
                    {selectedIncident.timeline.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-slate-300 border-l-2 border-blue-500/50 pl-3">
                        <span className="text-slate-400 text-[10px] shrink-0 mt-0.5">{step.time}</span>
                        <div>
                          <div>{step.event}</div>
                          <div className="text-[10px] text-blue-400 font-sans">Actor: {step.actor}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DISPATCH MANAGEMENT & RESPONDERS */}
        {activeTab === 'dispatch' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Radio className="w-5 h-5 text-purple-400" />
                    <span>EMERGENCY DISPATCH MANAGEMENT & ACTIVE RESPONDERS</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    SAPS 10111 Flying Squad, Gauteng EMS, Metro Police, and Private Security Units
                  </p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-purple-600/30 flex items-center space-x-1.5">
                  <Siren className="w-4 h-4" />
                  <span>Broadcast SAPS Dispatch Signal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {responders.map((rsp) => (
                  <div key={rsp.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400">{rsp.unitCode}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          rsp.status === 'DISPATCHED'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {rsp.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{rsp.callsign}</h4>
                      <p className="text-xs text-slate-400">{rsp.vehicleType}</p>
                      <p className="text-xs text-slate-400 font-mono mt-1">Officer: {rsp.officerInCharge}</p>
                    </div>

                    <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                      <div>Assigned: {rsp.assignedIncidentId || 'None (Standing By)'}</div>
                      {rsp.etaMinutes && <div className="text-amber-400 font-bold mt-1">ETA: {rsp.etaMinutes} Minutes</div>}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                      <span className="text-slate-400 font-mono">{rsp.mobileNumber}</span>
                      <button className="text-blue-400 font-bold hover:underline">Direct Radio</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LIVE TELEMETRY STREAM */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>REAL-TIME WEARABLE TELEMETRY PACKET STREAM</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    sub-250ms streaming LTE-M / NB-IoT packets with STSAFE-A110 crypto integrity
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-emerald-400 font-bold">● Streaming Active</span>
                  <span className="text-slate-400">Packets: {livePacketsCount.toLocaleString()}</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <th className="p-3">TIMESTAMP</th>
                      <th className="p-3">DEVICE SERIAL</th>
                      <th className="p-3">LEARNER NAME</th>
                      <th className="p-3">GPS COORDS</th>
                      <th className="p-3">SPEED</th>
                      <th className="p-3">BATTERY</th>
                      <th className="p-3">SIGNAL</th>
                      <th className="p-3">SATS</th>
                      <th className="p-3">LATENCY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {telemetryPackets.map((pkt, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 text-slate-300">{pkt.timestamp}</td>
                        <td className="p-3 text-blue-400 font-bold">{pkt.deviceId}</td>
                        <td className="p-3 text-white font-sans font-bold">{pkt.learnerName}</td>
                        <td className="p-3 text-slate-400">
                          {pkt.lat.toFixed(4)}, {pkt.lng.toFixed(4)}
                        </td>
                        <td className="p-3 text-amber-400 font-bold">{pkt.speedKmh} km/h</td>
                        <td className="p-3 text-emerald-400 font-bold">{pkt.batteryPct}%</td>
                        <td className="p-3 text-slate-300">{pkt.signalDbm} dBm</td>
                        <td className="p-3 text-slate-400">{pkt.satellites}</td>
                        <td className="p-3 text-cyan-400 font-bold">{pkt.packetLatencyMs}ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FLEET MONITOR */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>WEARABLE HARDWARE FLEET & SIM INVENTORY</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Diagnostics, firmware versioning, battery state, and SIM ICCID operator health
                  </p>
                </div>
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-cyan-600/30 flex items-center space-x-1">
                  <RefreshCw className="w-4 h-4" />
                  <span>OTA Firmware Batch Push</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fleetDevices.map((dev) => (
                  <div key={dev.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">{dev.serialNumber}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          dev.status === 'ONLINE'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : dev.status === 'LOW_BATTERY'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {dev.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{dev.assignedLearner}</h4>
                      <p className="text-xs text-slate-400">{dev.schoolName}</p>
                    </div>

                    <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                      <div className="text-slate-300">SIM Operator: <span className="text-blue-400 font-bold">{dev.cellularOperator}</span></div>
                      <div className="text-slate-300">Firmware: <span className="text-slate-400">{dev.firmwareVersion}</span></div>
                      <div className="text-slate-300">Battery: <span className="text-emerald-400 font-bold">{dev.batteryPct}%</span></div>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono">Last ping: {dev.lastPing}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SCHOOL OPERATIONS */}
        {activeTab === 'school_ops' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2 mb-2">
                <School className="w-5 h-5 text-indigo-400" />
                <span>SCHOOL GATE ATTENDANCE & TRANSPORT FLEET MONITORING</span>
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Real-time NFC gate scan compliance across 2,210 Gauteng & 14,000 RSA schools.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 block font-sans font-bold">MORNING GATE SCANS</span>
                  <div className="text-3xl font-black text-emerald-400">99.2%</div>
                  <p className="text-[11px] text-slate-400 font-sans">Learners safely scanned into campus by 08:00 AM</p>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 block font-sans font-bold">SCHOLAR TRANSPORT BUSES</span>
                  <div className="text-3xl font-black text-blue-400">14,200</div>
                  <p className="text-[11px] text-slate-400 font-sans font-sans">Equipped with automated speed/route telemetry</p>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 block font-sans font-bold">GATE SCANNERS ACTIVE</span>
                  <div className="text-3xl font-black text-purple-400">28,400</div>
                  <p className="text-[11px] text-slate-400 font-sans">NFC Android/STMicroelectronics Terminals</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: COMMS CENTRE */}
        {activeTab === 'comms' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-teal-400" />
                    <span>INTER-AGENCY COMMAND COMMUNICATION CENTRE</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Direct radio/chat channel with SAPS 10111, EMS, School Principals, and Guardian Gateways
                  </p>
                </div>
                <div className="flex space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                  {(['SAPS', 'EMS', 'SCHOOLS', 'PARENTS'] as const).map((chan) => (
                    <button
                      key={chan}
                      onClick={() => setSelectedChatChannel(chan)}
                      className={`px-3 py-1.5 rounded-lg ${
                        selectedChatChannel === chan
                          ? 'bg-teal-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {chan}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Feed */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 h-[350px] overflow-y-auto space-y-3 font-mono text-xs">
                {chatMessages
                  .filter((m) => selectedChatChannel === 'SAPS' || m.channel === selectedChatChannel)
                  .map((msg, idx) => (
                    <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                        <span className="font-bold text-teal-400">{msg.sender} ({msg.channel})</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-slate-200 font-sans">{msg.text}</p>
                    </div>
                  ))}
              </div>

              {/* Send Chat */}
              <form onSubmit={handleSendChat} className="flex space-x-2">
                <input
                  type="text"
                  placeholder={`Send message on ${selectedChatChannel} command channel...`}
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-teal-600/30 flex items-center space-x-1"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 9: OPERATOR CONSOLE */}
        {activeTab === 'operator' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2 mb-2">
                <User className="w-5 h-5 text-yellow-400" />
                <span>OPERATOR WORKLOAD & SHIFT CONSOLE</span>
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Active Session Performance, SLA Compliance, and Shift Metrics
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 block font-sans font-bold">OPERATOR IDENTITY</span>
                  <div className="text-lg font-bold text-white">Cmdr. J. van der Merwe</div>
                  <div className="text-xs text-yellow-400">Operator ID: OP-01 • Gauteng C3 NOC</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">Shift Start: {operatorSessionStart}</div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 block font-sans font-bold">TICKETS HANDLED TODAY</span>
                  <div className="text-3xl font-black text-emerald-400">42</div>
                  <div className="text-[11px] text-emerald-400/80 font-sans">100% SLA Compliance Target</div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 block font-sans font-bold">AVERAGE RESOLUTION TIME</span>
                  <div className="text-3xl font-black text-blue-400">1m 42s</div>
                  <div className="text-[11px] text-slate-400 font-sans">Target: &lt; 3m 00s</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: AUDIT LEDGER */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <FileCheck2 className="w-5 h-5 text-emerald-400" />
                    <span>IMMUTABLE CRYPTOGRAPHIC AUDIT LEDGER</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    SHA-256 Hashed Event Log for Court Evidence & Legal Compliance
                  </p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>Export Cryptographic Audit PDF</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <th className="p-3">AUDIT ID</th>
                      <th className="p-3">TIMESTAMP</th>
                      <th className="p-3">OPERATOR</th>
                      <th className="p-3">ACTION</th>
                      <th className="p-3">INCIDENT</th>
                      <th className="p-3">DETAILS</th>
                      <th className="p-3">SHA-256 HASH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/50">
                        <td className="p-3 text-emerald-400 font-bold">{log.id}</td>
                        <td className="p-3 text-slate-300">{log.timestamp}</td>
                        <td className="p-3 text-white font-sans font-bold">{log.operatorName}</td>
                        <td className="p-3 text-amber-400 font-bold">{log.action}</td>
                        <td className="p-3 text-blue-400">{log.incidentId || 'N/A'}</td>
                        <td className="p-3 text-slate-300 font-sans">{log.details}</td>
                        <td className="p-3 text-slate-500 font-mono text-[10px]">{log.hash}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ENTERPRISE FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
