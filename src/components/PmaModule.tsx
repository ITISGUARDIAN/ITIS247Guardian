import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  MapPin,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Battery,
  Wifi,
  Navigation,
  Clock,
  User,
  Heart,
  PhoneCall,
  MessageSquare,
  Bus,
  Cpu,
  CreditCard,
  Settings,
  Lock,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Send,
  Terminal,
  FileCode,
  Layers,
  Database,
  Radio,
  Sparkles,
  RefreshCw,
  QrCode,
  ChevronRight,
  Zap,
  Volume2,
  Languages,
  Maximize2,
  Minimize2,
  Activity
} from 'lucide-react';
import {
  SAMPLE_LEARNERS,
  SAMPLE_JOURNEY,
  SAMPLE_SAFETY_PROFILE,
  SAMPLE_TRANSPORT,
  SAMPLE_CHAT_MESSAGES,
  FLUTTER_CODE_SPECS,
  CRITICAL_PMA_RULES,
  LearnerChild,
  JourneyEvent,
  DigitalSafetyProfile,
  TransportBusInfo,
  FamilyChatMessage,
  FlutterCodeSpec
} from '../data/pmaData';

export const PmaModule: React.FC = () => {
  // Mobile Simulator Navigation Screen State
  const [activeScreen, setActiveScreen] = useState<
    'dashboard' | 'tracking' | 'timeline' | 'profile' | 'incidents' | 'chat' | 'transport' | 'device' | 'settings'
  >('dashboard');

  const [activeSubTab, setActiveSubTab] = useState<'app_simulator' | 'flutter_architecture' | 'state_bloc' | 'websocket_sqlite' | 'rules'>('app_simulator');

  // Selected Child
  const [selectedChild, setSelectedChild] = useState<LearnerChild>(SAMPLE_LEARNERS[0]);
  const [children] = useState<LearnerChild[]>(SAMPLE_LEARNERS);

  // Chat State
  const [chatMessages, setChatMessages] = useState<FamilyChatMessage[]>(SAMPLE_CHAT_MESSAGES);
  const [newMsgText, setNewMsgText] = useState<string>('');

  // Emergency SOS State
  const [isSosActive, setIsSosActive] = useState<boolean>(false);
  const [isSafeChecked, setIsSafeChecked] = useState<boolean>(false);

  // Viewport mode: Phone Frame vs Expanded Full View
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);

  // Selected Code Spec
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<FlutterCodeSpec>(FLUTTER_CODE_SPECS[0]);

  // Selected Language
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Live GPS movement simulation effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedChild.safetyStatus === 'IN_TRANSIT') {
        setSelectedChild((prev) => ({
          ...prev,
          currentLat: prev.currentLat + (Math.random() - 0.5) * 0.0005,
          currentLng: prev.currentLng + (Math.random() - 0.5) * 0.0005,
          speedKmH: Math.floor(35 + Math.random() * 10),
        }));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedChild.safetyStatus]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;

    const userMsg: FamilyChatMessage = {
      id: `MSG-${Date.now()}`,
      senderName: 'Mrs. Thandi Dlamini (Parent)',
      senderRole: 'PARENT',
      messageText: newMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setNewMsgText('');
    addLog(`SECURE CHAT SENT: "${newMsgText}" to ITIS National Command Centre`);

    // Simulated Auto-Reply from Command Centre
    setTimeout(() => {
      const replyMsg: FamilyChatMessage = {
        id: `MSG-${Date.now() + 1}`,
        senderName: 'ITIS Operator (Command Centre)',
        senderRole: 'COMMAND_CENTRE',
        messageText: 'Message received and acknowledged by National Safety Dispatch. Child position confirmed safe.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
      };
      setChatMessages((prev) => [...prev, replyMsg]);
      addLog(`COMMAND CENTRE REPLY RECEIVED: Message acknowledged.`);
    }, 1800);
  };

  const handleTriggerSos = () => {
    setIsSosActive(true);
    setIsSafeChecked(false);
    addLog(`EMERGENCY SOS ACTIVATED FROM PARENT APP for ${selectedChild.fullName}! Telemetry & Tactical Responder dispatched.`);
  };

  const handleCheckSafe = () => {
    setIsSafeChecked(true);
    setIsSosActive(false);
    addLog(`"I'M SAFE" SIGNAL SENT for ${selectedChild.fullName}. Status updated across Command Centre & School.`);
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-900 rounded-2xl border border-cyan-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
              <Smartphone className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>— PARENT MOBILE APPLICATION (PMA)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Integrated Parent Mobile <span className="text-cyan-400">Child Protection App</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Production-ready Flutter 3.x / Dart Clean Architecture Parent Mobile App featuring live WebSocket GPS tracking, journey timeline events, digital safety & medical profiles, incident SOS escalation, scholar transport monitoring, and 11 South African languages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-cyan-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">&lt; 2.0s</span>
              <span className="text-xs text-slate-400 font-medium">Cold Start Boot</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">&lt; 250ms</span>
              <span className="text-xs text-slate-400 font-medium">Map Sync Latency</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">11 SA Lang</span>
              <span className="text-xs text-slate-400 font-medium">Localized UI</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('app_simulator')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'app_simulator'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>1. Live Flutter Parent App Simulator</span>
          </button>

          <button
            onClick={() => setActiveSubTab('flutter_architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'flutter_architecture'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-teal-400" />
            <span>2. Flutter Clean Architecture</span>
          </button>

          <button
            onClick={() => setActiveSubTab('state_bloc')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'state_bloc'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-purple-400" />
            <span>3. BLoC & Riverpod State Spec</span>
          </button>

          <button
            onClick={() => setActiveSubTab('websocket_sqlite')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'websocket_sqlite'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-amber-400" />
            <span>4. WebSockets & Offline SQLite</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rules')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'rules'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>5. PMA Directives & Compliance Standards</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
              <span>Parent App Telemetry & WebSocket Event Log</span>
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

      {/* SUB-TAB 1: LIVE FLUTTER PARENT APP SIMULATOR */}
      {activeSubTab === 'app_simulator' && (
        <div className="space-y-6">
          {/* CHILD SELECTOR & VIEWPORT TOGGLE */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Child:</span>
              <div className="flex gap-2">
                {children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      setSelectedChild(child);
                      addLog(`SWITCHED CHILD VIEW: ${child.fullName} (${child.grade})`);
                    }}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedChild.id === child.id
                        ? 'bg-cyan-600 text-white shadow-md ring-1 ring-cyan-400'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <img src={child.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                    <span>{child.fullName}</span>
                  </button>
                ))}
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

              {/* APP APPBAR */}
              <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <img src={selectedChild.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-cyan-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">{selectedChild.fullName}</h4>
                    <span className="text-[10px] text-cyan-400 font-mono">{selectedChild.schoolName}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[10px] font-mono">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <Battery className="w-3.5 h-3.5" />
                    <span>{selectedChild.wearableBatteryPct}%</span>
                  </span>
                  <span className="flex items-center space-x-1 text-cyan-400">
                    <Wifi className="w-3.5 h-3.5" />
                    <span>{selectedChild.wearableSignalDbm} dBm</span>
                  </span>
                </div>
              </div>

              {/* SCREEN CONTENT ENGINE */}
              <div className="space-y-4 min-h-[460px] max-h-[560px] overflow-y-auto pr-1">
                {/* 1. DASHBOARD SCREEN */}
                {activeScreen === 'dashboard' && (
                  <div className="space-y-4">
                    {/* STATUS CARD */}
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Status</span>
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                            selectedChild.safetyStatus === 'SAFE_IN_SCHOOL'
                              ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                              : 'bg-cyan-950 border-cyan-800 text-cyan-400'
                          }`}
                        >
                          {selectedChild.safetyStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 text-[10px] block">Today's Attendance</span>
                          <span className="text-emerald-400 font-bold">{selectedChild.todayAttendance}</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 text-[10px] block">ETA Home Departure</span>
                          <span className="text-cyan-400 font-bold">{selectedChild.etaHome}</span>
                        </div>
                      </div>
                    </div>

                    {/* QUICK ACTION SOS & I'M SAFE */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleTriggerSos}
                        className="p-3 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-rose-600/30 transition-all"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        <span>Trigger SOS</span>
                      </button>

                      <button
                        onClick={handleCheckSafe}
                        className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-600/30 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>I'm Safe Check-in</span>
                      </button>
                    </div>

                    {/* RECENT JOURNEY PREVIEW */}
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-300">Today's Journey Timeline</span>
                        <button onClick={() => setActiveScreen('timeline')} className="text-cyan-400 text-[10px] hover:underline">
                          View All
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        {SAMPLE_JOURNEY.slice(0, 3).map((j) => (
                          <div key={j.id} className="flex items-center justify-between p-2 bg-slate-950 rounded-xl">
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-slate-200 font-medium">{j.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{j.timestamp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. LIVE GPS TRACKING SCREEN */}
                {activeScreen === 'tracking' && (
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 relative overflow-hidden h-64 flex flex-col justify-between">
                      {/* SIMULATED MAP CANVAS */}
                      <div className="absolute inset-0 bg-slate-950 opacity-90 flex items-center justify-center">
                        <div className="relative w-full h-full p-4 flex flex-col justify-center items-center">
                          {/* MAP GRID SIMULATION */}
                          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                          {/* LIVE MARKER */}
                          <div className="relative z-10 flex flex-col items-center animate-bounce">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                              <MapPin className="w-4 h-4 text-cyan-300" />
                            </div>
                            <span className="bg-slate-900/90 text-[10px] text-cyan-300 px-2 py-0.5 rounded-full mt-1 border border-cyan-800 font-mono">
                              {selectedChild.fullName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* MAP OVERLAY STATS */}
                      <div className="relative z-20 flex justify-between items-start text-[10px] font-mono">
                        <span className="bg-slate-900/90 px-2 py-1 rounded-lg text-emerald-400 border border-slate-700">
                          GPS: {selectedChild.wearableGpsFix}
                        </span>
                        <span className="bg-slate-900/90 px-2 py-1 rounded-lg text-cyan-400 border border-slate-700">
                          Speed: {selectedChild.speedKmH} km/h
                        </span>
                      </div>

                      <div className="relative z-20 bg-slate-900/90 p-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono flex justify-between">
                        <span>Lat: {selectedChild.currentLat.toFixed(4)}</span>
                        <span>Lng: {selectedChild.currentLng.toFixed(4)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. JOURNEY TIMELINE SCREEN */}
                {activeScreen === 'timeline' && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Chronological Events</span>
                    {SAMPLE_JOURNEY.map((j) => (
                      <div key={j.id} className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{j.title}</span>
                          <span className="text-[10px] font-mono text-cyan-400">{j.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{j.description}</p>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px]">
                          <span className="text-slate-500">{j.locationName}</span>
                          {j.verifiedByDevice && <span className="text-emerald-400 font-bold">✓ Verified</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. DIGITAL SAFETY PROFILE SCREEN */}
                {activeScreen === 'profile' && (
                  <div className="space-y-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-rose-400 block border-b border-slate-800 pb-2">Medical Profile</span>
                      <div className="grid grid-cols-2 gap-2 font-mono">
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 text-[10px] block">Blood Group</span>
                          <span className="text-rose-400 font-bold">{SAMPLE_SAFETY_PROFILE.bloodGroup}</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 text-[10px] block">Medical Aid</span>
                          <span className="text-slate-200 font-bold">{SAMPLE_SAFETY_PROFILE.medicalAidName}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 text-[10px] block font-semibold">Known Allergies:</span>
                        <div className="flex gap-1.5 mt-1">
                          {SAMPLE_SAFETY_PROFILE.allergies.map((a, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] border border-rose-800 font-mono">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-cyan-400 block border-b border-slate-800 pb-2">Authorized Pickup Contacts</span>
                      <div className="space-y-2">
                        {SAMPLE_SAFETY_PROFILE.authorizedPickupPeople.map((p, i) => (
                          <div key={i} className="flex items-center space-x-3 p-2 bg-slate-950 rounded-xl">
                            <img src={p.photoUrl} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                            <div>
                              <h5 className="font-bold text-white text-xs">{p.name}</h5>
                              <p className="text-[10px] text-slate-400">{p.relation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. SECURE FAMILY CHAT SCREEN */}
                {activeScreen === 'chat' && (
                  <div className="space-y-3">
                    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-3 h-64 overflow-y-auto space-y-2.5">
                      {chatMessages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-2.5 rounded-xl text-xs max-w-[85%] space-y-1 ${
                            m.senderRole === 'PARENT'
                              ? 'ml-auto bg-cyan-600 text-white'
                              : 'bg-slate-950 border border-slate-800 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9px] opacity-80">
                            <span className="font-bold">{m.senderName}</span>
                            <span className="font-mono">{m.timestamp}</span>
                          </div>
                          <p className="text-[11px] leading-tight">{m.messageText}</p>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={newMsgText}
                        onChange={(e) => setNewMsgText(e.target.value)}
                        placeholder="Message Command Centre..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <button type="submit" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}

                {/* 6. SCHOLAR TRANSPORT SCREEN */}
                {activeScreen === 'transport' && (
                  <div className="space-y-3 text-xs">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-bold text-white">{SAMPLE_TRANSPORT.routeNumber}</span>
                        <span className="text-emerald-400 text-[10px] font-mono font-bold">Route Compliance: {SAMPLE_TRANSPORT.routeCompliancePct}%</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 text-[10px] block">Driver</span>
                          <span className="text-slate-200 font-bold">{SAMPLE_TRANSPORT.driverName}</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 text-[10px] block">Vehicle Plate</span>
                          <span className="text-cyan-400 font-bold">{SAMPLE_TRANSPORT.busPlate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. SETTINGS & LOCALIZATION SCREEN */}
                {activeScreen === 'settings' && (
                  <div className="space-y-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-white block border-b border-slate-800 pb-2 flex items-center space-x-2">
                        <Languages className="w-4 h-4 text-cyan-400" />
                        <span>Select South African Language</span>
                      </span>

                      <select
                        value={selectedLanguage}
                        onChange={(e) => {
                          setSelectedLanguage(e.target.value);
                          addLog(`LANGUAGE CHANGED: UI localized to ${e.target.value}`);
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

              {/* BOTTOM FLUTTER NAVIGATION BAR */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-5 gap-1 text-[10px] text-center text-slate-400 font-medium">
                <button
                  onClick={() => setActiveScreen('dashboard')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'dashboard' ? 'text-cyan-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => setActiveScreen('tracking')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'tracking' ? 'text-cyan-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>GPS Map</span>
                </button>

                <button
                  onClick={() => setActiveScreen('chat')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'chat' ? 'text-cyan-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </button>

                <button
                  onClick={() => setActiveScreen('profile')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'profile' ? 'text-cyan-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Medical</span>
                </button>

                <button
                  onClick={() => setActiveScreen('settings')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'settings' ? 'text-cyan-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: FLUTTER CLEAN ARCHITECTURE */}
      {activeSubTab === 'flutter_architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Layers className="w-5 h-5 text-teal-400" />
              <span>Flutter Clean Architecture Layer Separation</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold block">1. Presentation Layer</span>
                <p className="text-slate-300">Flutter Widgets, BLoC Event/State Handlers, Responsive Mobile Screens.</p>
                <span className="text-[10px] text-slate-500 block">lib/features/*/presentation/</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold block">2. Domain Layer</span>
                <p className="text-slate-300">Pure Dart UseCases, Entities, and Abstract Repository Interfaces.</p>
                <span className="text-[10px] text-slate-500 block">lib/features/*/domain/</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold block">3. Data Layer</span>
                <p className="text-slate-300">Data Sources (WebSockets, REST, SQLite) and Repository Implementations.</p>
                <span className="text-[10px] text-slate-500 block">lib/features/*/data/</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: BLOC & RIVERPOD STATE SPEC */}
      {activeSubTab === 'state_bloc' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Flutter BLoC & State Management Specs</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {FLUTTER_CODE_SPECS.map((spec) => (
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
                <span className="font-mono text-purple-400 font-bold">{selectedCodeSpec.filename}</span>
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

      {/* SUB-TAB 4: WEBSOCKETS & OFFLINE SQLITE */}
      {activeSubTab === 'websocket_sqlite' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Database className="w-5 h-5 text-amber-400" />
              <span>Offline-First SQLite Cache & Live WebSocket Telemetry</span>
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {FLUTTER_CODE_SPECS[3].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: MANDATORY PMA RULES */}
      {activeSubTab === 'rules' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Enterprise Directives & Compliance Standards & SLAs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {CRITICAL_PMA_RULES.map((rule) => (
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
      )}
    </div>
  );
};
