import React, { useState, useEffect } from 'react';
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
  Users,
  Camera,
  Mic,
  FileSpreadsheet,
  Globe,
  WifiOff,
  Check,
  ChevronDown,
  Info,
  Heart,
  Fingerprint,
  QrCode,
  Compass,
  ArrowRight
} from 'lucide-react';
import {
  SAMPLE_DISPATCH_MISSIONS,
  SAMPLE_NEARBY_RESPONDERS,
  SA_LANGUAGES,
  RESPONDER_AGENCIES,
  DispatchMission,
  NearbyResponder
} from '../data/responderMobileData';

export function ResponderMobileModule() {
  // Authentication & Session State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [officerName, setOfficerName] = useState<string>('Capt. D. Naidoo');
  const [unitCallsign, setUnitCallsign] = useState<string>('GP-FS-04 (Flying Squad)');
  const [agency, setAgency] = useState<string>('SAPS_10111');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(true);
  const [mTlsVerified, setMTlsVerified] = useState<boolean>(true);

  // App Navigation Tabs inside Mobile View
  const [activeMobileTab, setActiveMobileTab] = useState<
    'queue' | 'mission' | 'navigation' | 'medical' | 'evidence' | 'team' | 'equipment' | 'settings'
  >('queue');

  // Mission States
  const [missions, setMissions] = useState<DispatchMission[]>(SAMPLE_DISPATCH_MISSIONS);
  const [activeMission, setActiveMission] = useState<DispatchMission>(SAMPLE_DISPATCH_MISSIONS[0]);
  const [nearbyResponders] = useState<NearbyResponder[]>(SAMPLE_NEARBY_RESPONDERS);

  // Offline & Security States
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [flagSecureActive, setFlagSecureActive] = useState<boolean>(true);
  const [sqliteQueueCount, setSqliteQueueCount] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Evidence Inputs
  const [evidenceNoteText, setEvidenceNoteText] = useState<string>('');
  const [photoCaptured, setPhotoCaptured] = useState<boolean>(false);
  const [signatureCaptured, setSignatureCaptured] = useState<boolean>(false);

  // Team Chat inside Mobile
  const [teamChatMessages, setTeamChatMessages] = useState<
    Array<{ sender: string; text: string; time: string; role: string }>
  >([
    { sender: 'C3 Dispatch', text: 'Unit GP-FS-04, proceed to 142 Vilakazi St, Orlando West.', time: '08:14:10', role: 'C3' },
    { sender: 'Paramedic S. Botha (EMS-12)', text: 'ALS Ambulance 12 backing you up. ETA 4 minutes.', time: '08:14:30', role: 'EMS' },
  ]);
  const [chatInputText, setChatInputText] = useState<string>('');

  // Voice Navigation Prompt simulation
  const [voicePromptText, setVoicePromptText] = useState<string>('In 300 meters, turn right onto Vilakazi Street. School corridor ahead.');

  // Handle Mission State Machine Progress
  const handleAdvanceMissionState = () => {
    const stateFlow: DispatchMission['missionState'][] = [
      'DISPATCH_RECEIVED',
      'ACCEPTED',
      'EN_ROUTE',
      'ARRIVED_ON_SCENE',
      'SEARCHING',
      'CHILD_LOCATED',
      'MEDICAL_ASSISTANCE',
      'CHILD_SAFE',
      'MISSION_COMPLETE',
      'EVIDENCE_SUBMITTED',
    ];

    const currentIndex = stateFlow.indexOf(activeMission.missionState);
    if (currentIndex < stateFlow.length - 1) {
      const nextState = stateFlow[currentIndex + 1];
      const nowStr = new Date().toLocaleTimeString('en-ZA', { hour12: false });

      const updatedMission: DispatchMission = {
        ...activeMission,
        missionState: nextState,
        timeline: [
          ...activeMission.timeline,
          {
            time: nowStr,
            event: `Mission status updated to: ${nextState.replace(/_/g, ' ')}`,
            actor: `${officerName} (${unitCallsign})`,
          },
        ],
      };

      setActiveMission(updatedMission);
      setMissions((prev) => prev.map((m) => (m.id === updatedMission.id ? updatedMission : m)));

      if (isOfflineMode) {
        setSqliteQueueCount((prev) => prev + 1);
      }
    }
  };

  // Handle Adding Evidence
  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceNoteText.trim() && !photoCaptured && !signatureCaptured) return;

    const nowStr = new Date().toLocaleTimeString('en-ZA', { hour12: false });
    const hash = '0x' + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);

    const newEvidence = {
      id: `EVD-${Math.floor(1000 + Math.random() * 8999)}`,
      type: photoCaptured ? ('PHOTO' as const) : ('OFFICER_NOTE' as const),
      timestamp: nowStr,
      sha256Hash: hash,
      syncStatus: isOfflineMode ? ('QUEUED_OFFLINE' as const) : ('SYNCED' as const),
      urlOrText: evidenceNoteText || 'Tactical Scene Photograph Captured with GPS & SHA-256 metadata.',
    };

    const updatedMission: DispatchMission = {
      ...activeMission,
      evidenceCaptured: [newEvidence, ...activeMission.evidenceCaptured],
      timeline: [
        ...activeMission.timeline,
        {
          time: nowStr,
          event: `Cryptographic Evidence #${newEvidence.id} attached (Hash: ${hash.substring(0, 10)}...)`,
          actor: officerName,
        },
      ],
    };

    setActiveMission(updatedMission);
    setMissions((prev) => prev.map((m) => (m.id === updatedMission.id ? updatedMission : m)));

    // Reset inputs
    setEvidenceNoteText('');
    setPhotoCaptured(false);
    setSignatureCaptured(false);

    if (isOfflineMode) {
      setSqliteQueueCount((prev) => prev + 1);
    }
  };

  // Handle Team Chat Send
  const handleSendTeamChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    const nowStr = new Date().toLocaleTimeString('en-ZA', { hour12: false });
    setTeamChatMessages((prev) => [
      ...prev,
      {
        sender: `${officerName} (${unitCallsign})`,
        text: chatInputText.trim(),
        time: nowStr,
        role: 'RESPONDER',
      },
    ]);
    setChatInputText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-6 flex flex-col items-center justify-center">
      {/* HEADER OVERVIEW BANNER */}
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-600/20 border border-red-500/50 rounded-2xl flex items-center justify-center text-red-400 shadow-lg shadow-red-900/30 animate-pulse">
            <Car className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white">EMERGENCY RESPONDER MOBILE</h1>
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                SAPS / EMS
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                PROMPT 057
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Tactical Field Dispatch, Live Turn-by-Turn Navigation & Cryptographic Chain of Custody
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          {/* Offline Mode Toggle */}
          <button
            onClick={() => {
              setIsOfflineMode(!isOfflineMode);
              if (isOfflineMode) {
                setSqliteQueueCount(0);
                setLastSyncTime('Just now');
              }
            }}
            className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
              isOfflineMode
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOfflineMode ? `OFFLINE CACHE (${sqliteQueueCount} QUEUED)` : 'ONLINE LIVE SYNC'}</span>
          </button>

          {/* Language Selector */}
          <div className="bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-1 text-slate-300">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
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

      {/* MOBILE DEVICE CONTAINER MOCKUP */}
      <div className="w-full max-w-sm sm:max-w-md bg-slate-900 border-4 border-slate-800 rounded-[3rem] p-3 sm:p-4 shadow-2xl relative overflow-hidden flex flex-col h-[850px]">
        {/* TOP DEVICE NOTCH & STATUS BAR */}
        <div className="flex items-center justify-between px-4 py-1 text-[11px] font-mono text-slate-400 border-b border-slate-800/80 mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">08:14</span>
            {mTlsVerified && (
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/40">
                mTLS STSAFE
              </span>
            )}
          </div>
          {/* Camera Notch */}
          <div className="w-16 h-3 bg-slate-950 rounded-full mx-auto" />
          <div className="flex items-center space-x-2">
            <span className="text-emerald-400 text-[10px]">5G LTE-M</span>
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* DEVICE TOP APP HEADER */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-red-600/20 border border-red-500/50 rounded-xl flex items-center justify-center text-red-400 font-black">
              SAPS
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center space-x-1">
                <span>{officerName}</span>
                <ShieldCheck className="w-3 h-3 text-blue-400" />
              </div>
              <div className="text-[10px] text-slate-400 font-mono">{unitCallsign}</div>
            </div>
          </div>
          <button
            onClick={() => setIsAuthenticated(!isAuthenticated)}
            className="text-[10px] text-slate-400 hover:text-white bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 font-mono"
          >
            {isAuthenticated ? 'LOCK' : 'LOGIN'}
          </button>
        </div>

        {/* MAIN BODY DEPENDING ON AUTH & TAB */}
        {!isAuthenticated ? (
          /* TACTICAL LOGIN SCREEN */
          <div className="flex-1 flex flex-col justify-between p-4 font-mono">
            <div className="space-y-6 text-center mt-8">
              <div className="w-16 h-16 bg-red-600/10 border border-red-500/40 rounded-2xl flex items-center justify-center mx-auto text-red-400 shadow-xl shadow-red-900/20 animate-pulse">
                <Siren className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">REPUBLIC OF SOUTH AFRICA</h2>
                <p className="text-xs text-red-400 font-sans mt-0.5">SAPS / EMS Emergency Responder Portal</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-left font-sans text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Agency & Callsign</label>
                  <select
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-xs font-semibold"
                  >
                    {RESPONDER_AGENCIES.map((ag) => (
                      <option key={ag.id} value={ag.id}>
                        {ag.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Officer Badge / PIN</label>
                  <input
                    type="password"
                    defaultValue="10111"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white font-mono text-center tracking-widest text-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => setIsAuthenticated(true)}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-sans font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
              >
                <Fingerprint className="w-5 h-5" />
                <span>BIOMETRIC AUTHENTICATE</span>
              </button>
            </div>

            <div className="text-[10px] text-slate-500 text-center font-sans">
              STSAFE-A110 Hardware Enclave Active • mTLS Certificate Validated
            </div>
          </div>
        ) : (
          /* ACTIVE RESPONDER WORKSPACE */
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 font-sans">
            {/* TAB 1: DISPATCH QUEUE */}
            {activeMobileTab === 'queue' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>DISPATCH QUEUE ({missions.length})</span>
                  <span className="text-[10px] text-emerald-400 font-mono">LIVE GPS RADIUS 10KM</span>
                </div>

                {missions.map((mission) => (
                  <div
                    key={mission.id}
                    onClick={() => {
                      setActiveMission(mission);
                      setActiveMobileTab('mission');
                    }}
                    className={`cursor-pointer bg-slate-950 border rounded-2xl p-3.5 transition-all space-y-2.5 ${
                      activeMission.id === mission.id
                        ? 'border-red-500/80 ring-1 ring-red-500/50 shadow-lg shadow-red-900/20'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-red-500/20 text-red-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-red-500/40 animate-pulse">
                        {mission.severity} • {mission.category.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{mission.timestamp}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <img
                        src={mission.learnerPhoto}
                        alt={mission.learnerName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">{mission.learnerName}</div>
                        <div className="text-xs text-slate-400">{mission.schoolName} ({mission.learnerGrade})</div>
                        <div className="text-[10px] text-amber-400 font-mono mt-0.5 flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{mission.distanceKm} km away • ETA {mission.estimatedEtaMinutes} mins</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                      <span className="truncate">{mission.incidentAddress}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: ACTIVE MISSION WORKSPACE */}
            {activeMobileTab === 'mission' && (
              <div className="space-y-3">
                {/* Mission Status Progress Bar */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-bold">MISSION STATE:</span>
                    <span className="text-amber-400 font-black font-mono">
                      {activeMission.missionState.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {/* Progress Step Button */}
                  <button
                    onClick={handleAdvanceMissionState}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/30"
                  >
                    <span>ADVANCE STATE →</span>
                  </button>
                </div>

                {/* Learner Card */}
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={activeMission.learnerPhoto}
                      alt={activeMission.learnerName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-base font-bold text-white">{activeMission.learnerName}</div>
                      <div className="text-xs text-slate-400">
                        Age {activeMission.learnerAge} • {activeMission.learnerGrade}
                      </div>
                      <div className="text-xs text-blue-400 mt-0.5">{activeMission.schoolName}</div>
                    </div>
                  </div>

                  {/* Immediate Action Contacts */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href={`tel:${activeMission.guardianMobile}`}
                      className="bg-slate-900 border border-slate-700 hover:bg-slate-800 p-2 rounded-xl text-center font-bold text-emerald-400 flex items-center justify-center space-x-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>CALL GUARDIAN</span>
                    </a>
                    <button
                      onClick={() => setActiveMobileTab('medical')}
                      className="bg-slate-900 border border-slate-700 hover:bg-slate-800 p-2 rounded-xl text-center font-bold text-red-400 flex items-center justify-center space-x-1"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>MEDICAL PROFILE</span>
                    </button>
                  </div>
                </div>

                {/* AI Explanation Card */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="text-amber-400 font-bold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI DECISION ENGINE ANALYSIS ({activeMission.riskScore}/100)</span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-mono leading-tight">{activeMission.aiExplanation}</p>
                </div>

                {/* Incident Timeline */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-400">MISSION TIMELINE</div>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    {activeMission.timeline.map((item, idx) => (
                      <div key={idx} className="border-l-2 border-red-500/50 pl-2 py-0.5">
                        <span className="text-slate-500">{item.time}</span> -{' '}
                        <span className="text-slate-200">{item.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TACTICAL TURN-BY-TURN NAVIGATION */}
            {activeMobileTab === 'navigation' && (
              <div className="space-y-3">
                {/* Simulated Tactical Map Frame */}
                <div className="relative bg-slate-950 border border-slate-800 rounded-2xl h-64 overflow-hidden flex flex-col justify-between p-3">
                  {/* Map Grid Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

                  {/* Route Indicator */}
                  <div className="relative z-10 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-2.5 flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-emerald-400 animate-bounce shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white font-mono">{voicePromptText}</div>
                      <div className="text-[10px] text-emerald-400 font-mono">Distance: 300m • Route Clear</div>
                    </div>
                  </div>

                  {/* Target Pin Marker */}
                  <div className="relative z-10 my-auto text-center">
                    <div className="inline-flex flex-col items-center">
                      <div className="bg-red-600 text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full shadow-lg shadow-red-600/50 animate-pulse">
                        INCIDENT LOCATION
                      </div>
                      <MapPin className="w-8 h-8 text-red-500 drop-shadow-md" />
                    </div>
                  </div>

                  {/* Bottom Nav Stats */}
                  <div className="relative z-10 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-2 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-slate-400">SPEED: </span>
                      <span className="text-emerald-400 font-bold">54 km/h</span>
                    </div>
                    <div>
                      <span className="text-slate-400">ETA: </span>
                      <span className="text-amber-400 font-bold">{activeMission.estimatedEtaMinutes} MINS</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                  <div className="text-emerald-400 font-bold">✓ Safe Corridor Safe-Zone Overlay Active</div>
                  <div>Gauteng Province District: Soweto Orlando West Circuit 04</div>
                </div>
              </div>
            )}

            {/* TAB 4: EMERGENCY MEDICAL PROFILE */}
            {activeMobileTab === 'medical' && (
              <div className="space-y-3 font-mono">
                <div className="bg-red-950/40 border border-red-500/40 p-3 rounded-2xl text-xs text-red-300 flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">PROTECTED MEDICAL ACCESS</span>
                    <p className="text-[10px] text-red-300/80 font-sans mt-0.5">
                      POPIA / HPCSA Compliant • Decrypted exclusively during active CAD dispatch ticket.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px]">BLOOD GROUP</span>
                    <div className="text-base font-black text-red-400">{activeMission.medicalInfo.bloodGroup}</div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px]">KNOWN ALLERGIES</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activeMission.medicalInfo.allergies.map((alg, i) => (
                        <span key={i} className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/40 text-[11px]">
                          {alg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px]">CURRENT MEDICATIONS</span>
                    <div className="text-slate-200 mt-0.5">{activeMission.medicalInfo.medications.join(', ')}</div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px]">PREFERRED EMS HOSPITAL</span>
                    <div className="text-emerald-400 font-bold mt-0.5">{activeMission.medicalInfo.preferredHospital}</div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px]">MEDICAL AID COVER</span>
                    <div className="text-slate-300 mt-0.5">{activeMission.medicalInfo.medicalAidNumber}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: EVIDENCE CAPTURE & CHAIN OF CUSTODY */}
            {activeMobileTab === 'evidence' && (
              <div className="space-y-3 font-sans">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-white flex items-center space-x-1">
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span>CAPTURE FIELD EVIDENCE (SHA-256)</span>
                  </div>

                  {/* Photo Simulation Button */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPhotoCaptured(!photoCaptured)}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                        photoCaptured
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{photoCaptured ? '✓ PHOTO CAPTURED' : 'TAKE PHOTO'}</span>
                    </button>

                    <button
                      onClick={() => setSignatureCaptured(!signatureCaptured)}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                        signatureCaptured
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>{signatureCaptured ? '✓ SIGNATURE OK' : 'SIGNATURE'}</span>
                    </button>
                  </div>

                  <form onSubmit={handleAddEvidence} className="space-y-2 mt-2">
                    <textarea
                      rows={2}
                      value={evidenceNoteText}
                      onChange={(e) => setEvidenceNoteText(e.target.value)}
                      placeholder="Enter officer notes, witness statements or medical observations..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs transition-all shadow-md shadow-blue-600/30"
                    >
                      GENERATE CRYPTOGRAPHIC EVIDENCE RECORD
                    </button>
                  </form>
                </div>

                {/* Captured Evidence List */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400">CAPTURED EVIDENCE ITEMS</div>
                  {activeMission.evidenceCaptured.length === 0 ? (
                    <div className="text-xs text-slate-500 italic p-3 text-center bg-slate-950 rounded-xl border border-slate-800">
                      No evidence recorded yet for this mission.
                    </div>
                  ) : (
                    activeMission.evidenceCaptured.map((ev) => (
                      <div key={ev.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-400 font-bold">{ev.id} • {ev.type}</span>
                          <span className="text-[10px] text-slate-500">{ev.timestamp}</span>
                        </div>
                        <div className="text-slate-300 text-[11px] font-sans">{ev.urlOrText}</div>
                        <div className="text-[9px] text-slate-500 truncate">SHA256: {ev.sha256Hash}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 6: TEAM & INTER-AGENCY COORDINATION */}
            {activeMobileTab === 'team' && (
              <div className="space-y-3 text-xs">
                {/* Nearby Responders */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-300">NEARBY RESPONDERS IN RADIUS</div>
                  <div className="space-y-2 font-mono">
                    {nearbyResponders.map((rsp) => (
                      <div key={rsp.id} className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">{rsp.callsign}</div>
                          <div className="text-[10px] text-slate-400">{rsp.officerName} • {rsp.distanceKm} km</div>
                        </div>
                        <a
                          href={`tel:${rsp.contactNumber}`}
                          className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold"
                        >
                          CALL
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Chat Box */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-300 flex items-center justify-between">
                    <span>ENCRYPTED RADIO CHAT</span>
                    <span className="text-[10px] text-emerald-400 font-mono">CHANNEL SAPS-10111</span>
                  </div>

                  <div className="h-28 overflow-y-auto space-y-1.5 bg-slate-900 p-2 rounded-xl border border-slate-800 font-mono text-[11px]">
                    {teamChatMessages.map((msg, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-[9px] text-slate-500">{msg.sender} ({msg.time})</div>
                        <div className="text-slate-200">{msg.text}</div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendTeamChat} className="flex space-x-1.5">
                    <input
                      type="text"
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      placeholder="Transmit tactical msg..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-xl font-bold"
                    >
                      SEND
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 7: EQUIPMENT DIAGNOSTICS */}
            {activeMobileTab === 'equipment' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="font-bold text-white">FIELD EQUIPMENT DIAGNOSTICS</div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">BATTERY HEALTH</span>
                    <span className="text-emerald-400 font-bold">98% (Charging)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">GPS ACCURACY</span>
                    <span className="text-emerald-400 font-bold">&lt; 1.2 meters</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">mTLS CERTIFICATE</span>
                    <span className="text-emerald-400 font-bold">VALID (RSA-STSAFE-A110)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">SQLITE CACHE DISPATCHES</span>
                    <span className="text-amber-400 font-bold">{sqliteQueueCount} Queued</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">SCREEN PROTECTION</span>
                    <span className="text-emerald-400 font-bold">FLAG_SECURE Active</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BOTTOM NAVIGATION TAB BAR */}
        {isAuthenticated && (
          <div className="bg-slate-950 border-t border-slate-800 p-1.5 rounded-2xl grid grid-cols-6 gap-1 text-[10px] font-mono text-center">
            <button
              onClick={() => setActiveMobileTab('queue')}
              className={`p-1.5 rounded-xl flex flex-col items-center justify-center space-y-0.5 ${
                activeMobileTab === 'queue' ? 'bg-red-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Siren className="w-4 h-4" />
              <span>Queue</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('mission')}
              className={`p-1.5 rounded-xl flex flex-col items-center justify-center space-y-0.5 ${
                activeMobileTab === 'mission' ? 'bg-red-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Mission</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('navigation')}
              className={`p-1.5 rounded-xl flex flex-col items-center justify-center space-y-0.5 ${
                activeMobileTab === 'navigation' ? 'bg-red-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>Nav</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('medical')}
              className={`p-1.5 rounded-xl flex flex-col items-center justify-center space-y-0.5 ${
                activeMobileTab === 'medical' ? 'bg-red-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Medical</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('evidence')}
              className={`p-1.5 rounded-xl flex flex-col items-center justify-center space-y-0.5 ${
                activeMobileTab === 'evidence' ? 'bg-red-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Evidence</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('team')}
              className={`p-1.5 rounded-xl flex flex-col items-center justify-center space-y-0.5 ${
                activeMobileTab === 'team' ? 'bg-red-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Team</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
