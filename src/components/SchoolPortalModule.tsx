import React, { useState, useEffect } from 'react';
import { Footer } from './Footer';
import { itisWebSocketHub } from '../lib/websocket-hub';
import {
  School,
  Building2,
  Users,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Clock,
  Bus,
  Cpu,
  Siren,
  UserCheck,
  Radio,
  FileText,
  BarChart3,
  HelpCircle,
  Settings,
  Search,
  Plus,
  RefreshCw,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ChevronRight,
  Send,
  Download,
  Phone,
  MessageSquare,
  Lock,
  Globe,
  Sliders,
  Sparkles,
  Eye,
  X,
  FileSpreadsheet,
  Activity,
  UserPlus,
  QrCode,
  LogOut,
  SlidersHorizontal,
  Zap,
  ArrowRight,
  Filter,
  Check,
  Shield,
  Layers,
  BatteryCharging
} from 'lucide-react';
import {
  SchoolCampus,
  SchoolLearner,
  NfcScanLog,
  TransportVehicle,
  WearableDevice,
  SchoolIncident,
  VisitorLog,
  EmergencyBroadcastRecord,
  SchoolAuditLog,
  SAMPLE_CAMPUSES,
  SAMPLE_SCHOOL_LEARNERS,
  SAMPLE_NFC_SCANS,
  SAMPLE_SCHOOL_VEHICLES,
  SAMPLE_WEARABLE_DEVICES,
  SAMPLE_SCHOOL_INCIDENTS,
  SAMPLE_VISITORS,
  SAMPLE_BROADCASTS,
  SAMPLE_SCHOOL_AUDIT_LOGS,
  CRITICAL_SCHOOL_PORTAL_RULES
} from '../data/schoolPortalData';

type SchoolPortalTab =
  | 'dashboard'
  | 'learners'
  | 'attendance'
  | 'map'
  | 'transport'
  | 'devices'
  | 'incidents'
  | 'visitors'
  | 'broadcast'
  | 'reports'
  | 'documents'
  | 'analytics'
  | 'support'
  | 'settings';

export const SchoolPortalModule: React.FC = () => {
  // Active Sidebar Tab State
  const [activeTab, setActiveTab] = useState<SchoolPortalTab>('dashboard');

  // Multi-Campus Switcher State
  const [selectedCampus, setSelectedCampus] = useState<SchoolCampus>(SAMPLE_CAMPUSES[0]);

  // Telemetry & WebSockets Live Sim State
  const [wsConnected, setWsConnected] = useState<boolean>(true);
  const [lastWsPacketTime, setLastWsPacketTime] = useState<string>('08:14:22 AM');
  const [activeIncidentsCount, setActiveIncidentsCount] = useState<number>(SAMPLE_SCHOOL_INCIDENTS.filter(i => i.status !== 'RESOLVED').length);

  // Learners List & Modal State
  const [learners, setLearners] = useState<SchoolLearner[]>(SAMPLE_SCHOOL_LEARNERS);
  const [searchLearnerQuery, setSearchLearnerQuery] = useState<string>('');
  const [selectedLearnerModal, setSelectedLearnerModal] = useState<SchoolLearner | null>(null);
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);

  // Attendance Filters & Actions State
  const [attendanceLogs, setAttendanceLogs] = useState<NfcScanLog[]>(SAMPLE_NFC_SCANS);
  const [attendanceFilter, setAttendanceFilter] = useState<string>('ALL');
  const [showManualAttendanceModal, setShowManualAttendanceModal] = useState<boolean>(false);
  const [manualLearnerName, setManualLearnerName] = useState<string>('');

  // Visitors State
  const [visitors, setVisitors] = useState<VisitorLog[]>(SAMPLE_VISITORS);
  const [showRegisterVisitorModal, setShowRegisterVisitorModal] = useState<boolean>(false);
  const [newVisitorName, setNewVisitorName] = useState<string>('');
  const [newVisitorPurpose, setNewVisitorPurpose] = useState<VisitorLog['purpose']>('PARENT_MEETING');
  const [newVisitorHost, setNewVisitorHost] = useState<string>('Principal Office');

  // Emergency Broadcast Form State
  const [broadcasts, setBroadcasts] = useState<EmergencyBroadcastRecord[]>(SAMPLE_BROADCASTS);
  const [broadcastAudience, setBroadcastAudience] = useState<EmergencyBroadcastRecord['targetAudience']>('WHOLE_SCHOOL');
  const [broadcastSubject, setBroadcastSubject] = useState<string>('');
  const [broadcastMessage, setBroadcastMessage] = useState<string>('');
  const [broadcastChannels, setBroadcastChannels] = useState<{ sms: boolean; push: boolean; email: boolean; voice: boolean }>({
    sms: true,
    push: true,
    email: false,
    voice: false
  });
  const [broadcastSuccessNotice, setBroadcastSuccessNotice] = useState<string | null>(null);

  // Support AI Assistant Chat State
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: `Greetings Dr. Thabo Dlamini. I am your ITIS School AI Safety Assistant for ${selectedCampus.name}. How can I assist with EMIS reporting, attendance audits, or gate scanner diagnostics today?`,
      time: '08:00 AM'
    }
  ]);
  const [aiChatInput, setAiChatInput] = useState<string>('');

  // Settings State
  const [schoolSettings, setSchoolSettings] = useState({
    gateOpeningTime: '06:30 AM',
    gateClosingTime: '08:00 AM',
    geofenceRadiusMeters: 350,
    lateThresholdMinutes: 15,
    autoParentSmsOnLate: true,
    sapsEmergencyEscalation: true,
    darkTheme: true
  });

  // WebSockets Telemetry Ping & Live SSE Subscriptions
  useEffect(() => {
    const unsubscribe = itisWebSocketHub.subscribe('attendance', (msg: any) => {
      if (msg.event === 'NFC_CHECKIN_SUCCESS') {
        const payload = msg.payload;
        const newScan: NfcScanLog = {
          id: payload.id || `SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
          learnerId: payload.learnerId || 'LNR-001',
          learnerName: payload.learnerName || 'Bulumko Mkhize',
          grade: 'Grade 6B',
          timestamp: payload.nfcTime || new Date().toLocaleTimeString(),
          gateLocation: 'Main Entrance Gate A',
          readerSerial: 'RDR-NFC-01',
          scanStatus: 'VALID_ENTRY'
        };
        setAttendanceLogs((prev) => [newScan, ...prev]);
        setLastWsPacketTime(new Date().toLocaleTimeString());
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSimulateGateScan = async () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();

    try {
      await fetch('/api/v1/attendance/nfc-checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          learnerId: 'LNR-001',
          learnerName: 'Bulumko Mkhize',
          wearableSerial: 'RDR-NFC-01',
          schoolEmisCode: selectedCampus.emisCode,
          schoolName: selectedCampus.name,
        }),
      });
    } catch (err) {
      console.warn('Fallback offline scan');
      const newScan: NfcScanLog = {
        id: `SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
        learnerId: 'LNR-001',
        learnerName: 'Bulumko Mkhize',
        grade: 'Grade 6B',
        timestamp: timeStr,
        gateLocation: 'Main Entrance Gate A',
        readerSerial: 'RDR-NFC-01',
        scanStatus: 'VALID_ENTRY'
      };
      setAttendanceLogs([newScan, ...attendanceLogs]);
    }
    setLastWsPacketTime(timeStr);
  };

  const handleDispatchBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject.trim() || !broadcastMessage.trim()) return;

    const chosenChannels: ('SMS' | 'PUSH' | 'EMAIL' | 'VOICE')[] = [];
    if (broadcastChannels.sms) chosenChannels.push('SMS');
    if (broadcastChannels.push) chosenChannels.push('PUSH');
    if (broadcastChannels.email) chosenChannels.push('EMAIL');
    if (broadcastChannels.voice) chosenChannels.push('VOICE');

    const newRecord: EmergencyBroadcastRecord = {
      id: `BC-2026-0${broadcasts.length + 1}`,
      timestamp: 'Just now',
      senderName: 'Dr. Thabo Dlamini (Principal)',
      targetAudience: broadcastAudience,
      channels: chosenChannels,
      subject: broadcastSubject,
      messageBody: broadcastMessage,
      deliveredCount: selectedCampus.totalLearners,
      totalRecipients: selectedCampus.totalLearners,
      status: 'DELIVERED'
    };

    setBroadcasts([newRecord, ...broadcasts]);
    setBroadcastSubject('');
    setBroadcastMessage('');
    setBroadcastSuccessNotice(`Emergency Mass Broadcast successfully dispatched to ${selectedCampus.totalLearners} recipients via ${chosenChannels.join(', ')}!`);

    setTimeout(() => setBroadcastSuccessNotice(null), 5000);
  };

  const handleRegisterVisitorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVisitor: VisitorLog = {
      id: `VIS-${Math.floor(100 + Math.random() * 900)}`,
      visitorName: newVisitorName,
      idPassportNumber: '890311 5088 084',
      purpose: newVisitorPurpose,
      visitingPerson: newVisitorHost,
      qrCodeToken: `QR-SCH-${Math.floor(10000 + Math.random() * 90000)}`,
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      checkOutTime: null,
      status: 'ACTIVE_ON_CAMPUS'
    };
    setVisitors([newVisitor, ...visitors]);
    setShowRegisterVisitorModal(false);
    setNewVisitorName('');
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiChatInput.trim()) return;
    const userText = aiChatInput;
    setAiChatMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Just now' }]);
    setAiChatInput('');

    setTimeout(() => {
      setAiChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `Verified query against SA-SAMS Database (${selectedCampus.emisCode}). Today's attendance is at 98.2% with 6 gate scanners operational. All scholar buses (GP 12 SA GP & GP 88 EC GP) are currently within safe corridors.`,
          time: 'Just now'
        }
      ]);
    }, 900);
  };

  const filteredLearners = learners.filter(l =>
    `${l.firstName} ${l.lastName} ${l.grade} ${l.emisNumber} ${l.wearableSerial}`
      .toLowerCase()
      .includes(searchLearnerQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HERO BANNER & MULTI-CAMPUS SELECTOR */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-3xl border border-blue-500/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold">
              <Building2 className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>— PRODUCTION SCHOOL ADMINISTRATION PORTAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              School Safety & <span className="text-blue-400">Admin Control Centre</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Serving Principals, Administrators, & Security Staff. Consuming backend APIs 018–029, 036, 037 for real-time SA-SAMS learner tracking & gate security.
            </p>
          </div>

          {/* MULTI-CAMPUS SWITCHER & WEBSOCKET PACKET STATUS */}
          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-2xl border border-blue-800/40 shadow-xl">
            {/* Campus Switcher */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Selected Campus Jurisdiction</span>
              <select
                value={selectedCampus.id}
                onChange={(e) => {
                  const camp = SAMPLE_CAMPUSES.find(c => c.id === e.target.value);
                  if (camp) setSelectedCampus(camp);
                }}
                className="w-full sm:w-64 px-3 py-1.5 rounded-xl bg-slate-950 border border-blue-700/60 text-white text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SAMPLE_CAMPUSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-blue-300 font-mono block">EMIS: {selectedCampus.emisCode}</span>
            </div>

            {/* Live WebSockets Bridge Box */}
            <div className="pl-4 border-l border-slate-800 flex flex-col justify-center space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className={`w-2.5 h-2.5 rounded-full ${wsConnected ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`} />
                <span className="text-emerald-400 font-bold">Gate WebSocket Online</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Last Packet: {lastWsPacketTime}</span>
              <button
                onClick={handleSimulateGateScan}
                className="text-[10px] text-blue-400 hover:underline text-left font-mono font-bold"
              >
                ↻ Push Gate NFC Scan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER: PERSISTENT SIDEBAR + DYNAMIC CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PERSISTENT SIDEBAR NAVIGATION (3 COLS) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 space-y-2 shadow-xl">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Admin Sidebar</span>
              <span className="text-[10px] text-blue-400 font-mono">SA-SAMS</span>
            </div>

            <nav className="space-y-1 text-xs font-bold">
              {(
                [
                  { id: 'dashboard', label: 'Admin Dashboard', icon: School },
                  { id: 'learners', label: 'Learners Roster', icon: Users },
                  { id: 'attendance', label: 'NFC Gate Attendance', icon: Clock },
                  { id: 'map', label: 'GPS & Corridor Map', icon: MapPin },
                  { id: 'transport', label: 'Scholar Transport', icon: Bus },
                  { id: 'devices', label: 'Wearable Devices', icon: Cpu },
                  { id: 'incidents', label: `Incidents (${activeIncidentsCount})`, icon: Siren },
                  { id: 'visitors', label: 'Visitor Registration', icon: UserCheck },
                  { id: 'broadcast', label: 'Emergency Broadcast', icon: Radio },
                  { id: 'reports', label: 'Reports & Exports', icon: FileText },
                  { id: 'documents', label: 'SA-SAMS Policies', icon: Layers },
                  { id: 'analytics', label: 'Safety Analytics', icon: BarChart3 },
                  { id: 'support', label: 'AI Assistant & Support', icon: HelpCircle },
                  { id: 'settings', label: 'School Settings', icon: Settings },
                ] as const
              ).map((item) => {
                const IconComp = item.icon;
                const isCurrent = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white font-black shadow-lg shadow-blue-600/30 ring-1 ring-blue-300'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <IconComp className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-blue-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </nav>

            {/* INSTANT EMERGENCY BROADCAST SHORTCUT */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('broadcast')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-extrabold text-xs shadow-xl shadow-red-600/30 hover:from-red-500 hover:to-red-600 flex items-center justify-center space-x-2"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>DISPATCH EMERGENCY BROADCAST</span>
              </button>
            </div>
          </div>

          {/* ACTIVE SCHOOL PRINCIPAL PROFILE SUMMARY */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/30 border-2 border-blue-500 text-blue-300 font-black flex items-center justify-center text-sm">
                TD
              </div>
              <div>
                <h4 className="font-bold text-white">{selectedCampus.principalName}</h4>
                <p className="text-slate-400 text-[11px]">Principal Scope • EMIS Verified</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-slate-800 pt-2">
              <div className="p-2 bg-slate-900 rounded-lg">
                <span className="text-slate-500 block">Learners</span>
                <span className="font-bold text-blue-400">{selectedCampus.totalLearners}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg">
                <span className="text-slate-500 block">Scanners</span>
                <span className="font-bold text-emerald-400">{selectedCampus.gateScannersOnline} Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC TAB CONTENT AREA (9 COLS) */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: ADMIN DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* TOP METRIC TILES (9 TILES) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Today's Attendance</span>
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-black text-white">98.2%</p>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">1,218 / 1,240 Present</span>
                </div>

                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Protected Learners</span>
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-2xl font-black text-white">1,240</p>
                  <span className="text-[11px] text-blue-300 font-mono font-bold">Active nRF9160 Serials</span>
                </div>

                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Devices Online</span>
                    <Cpu className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-black text-white">1,228</p>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">Heartbeat &lt;30s</span>
                </div>

                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Devices Offline</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-2xl font-black text-white">12</p>
                  <span className="text-[11px] text-amber-400 font-mono font-bold">Depleted / Out of Range</span>
                </div>

                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Current Incidents</span>
                    <Siren className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-2xl font-black text-white">{activeIncidentsCount}</p>
                  <span className="text-[11px] text-red-400 font-mono font-bold">Open Investigations</span>
                </div>

                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Transport Active</span>
                    <Bus className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-2xl font-black text-white">2 Vehicles</p>
                  <span className="text-[11px] text-cyan-300 font-mono font-bold">On Scholar Routes</span>
                </div>
              </div>

              {/* SECOND ROW METRICS & QUICK ACTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">Avg Arrival Time</span>
                  <p className="text-xl font-bold text-white">07:34 AM</p>
                  <span className="text-[11px] text-slate-500 block">Peak gate scan rate: 07:25 AM - 07:45 AM</span>
                </div>

                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">Safety Compliance Score</span>
                  <p className="text-xl font-bold text-emerald-400">{selectedCampus.safetyScore}%</p>
                  <span className="text-[11px] text-slate-500 block">Gauteng Department of Education Verified</span>
                </div>

                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">Emergency Alerts</span>
                  <p className="text-xl font-bold text-blue-400">0 Active SOS</p>
                  <span className="text-[11px] text-slate-500 block">SAPS 10111 Dispatch Standby</span>
                </div>
              </div>

              {/* RECENT NFC GATE SCAN LOGS & ACTIVE VISITORS SUMMARY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gate Scans */}
                <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white">Recent NFC Gate Scans</h3>
                    <button onClick={() => setActiveTab('attendance')} className="text-xs text-blue-400 font-bold hover:underline">
                      View All →
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    {attendanceLogs.slice(0, 4).map((scan) => (
                      <div key={scan.id} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-white">{scan.learnerName}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{scan.grade} • {scan.gateLocation}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-amber-400 font-bold block">{scan.timestamp}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
                            {scan.scanStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Visitors */}
                <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white">Active On-Campus Visitors</h3>
                    <button onClick={() => setActiveTab('visitors')} className="text-xs text-blue-400 font-bold hover:underline">
                      Register Visitor →
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    {visitors.filter(v => v.status === 'ACTIVE_ON_CAMPUS').map((vis) => (
                      <div key={vis.id} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-white">{vis.visitorName}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{vis.purpose} • Host: {vis.visitingPerson}</span>
                        </div>
                        <div className="text-right font-mono">
                          <span className="text-cyan-400 font-bold block">{vis.checkInTime}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold">
                            QR VERIFIED
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEARNERS MANAGEMENT */}
          {activeTab === 'learners' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Learner Digital Safety Profiles</h2>
                  <p className="text-xs text-slate-400">SA-SAMS linked records for {selectedCampus.name}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search name, grade, EMIS..."
                      value={searchLearnerQuery}
                      onChange={(e) => setSearchLearnerQuery(e.target.value)}
                      className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs w-60 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => setShowTransferModal(true)}
                    className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-500"
                  >
                    Transfer / Deactivate Learner
                  </button>
                </div>
              </div>

              {/* LEARNERS TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">Learner Name</th>
                      <th className="p-3">Grade & Class</th>
                      <th className="p-3">EMIS ID</th>
                      <th className="p-3">Wearable Serial</th>
                      <th className="p-3">Battery</th>
                      <th className="p-3">Attendance</th>
                      <th className="p-3">Guardian</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredLearners.map((lnr) => (
                      <tr key={lnr.id} className="hover:bg-slate-950/60 transition-all">
                        <td className="p-3 font-bold text-white flex items-center space-x-2">
                          <span>{lnr.firstName} {lnr.lastName}</span>
                        </td>
                        <td className="p-3 text-slate-300 font-mono">{lnr.grade}</td>
                        <td className="p-3 text-slate-400 font-mono">{lnr.emisNumber}</td>
                        <td className="p-3 font-mono text-cyan-400 font-bold">{lnr.wearableSerial}</td>
                        <td className="p-3 font-mono">
                          <span className={lnr.batteryLevel < 20 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {lnr.batteryLevel}%
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            lnr.attendanceToday === 'PRESENT' ? 'bg-emerald-950 text-emerald-300' :
                            lnr.attendanceToday === 'LATE' ? 'bg-amber-950 text-amber-300' : 'bg-red-950 text-red-300'
                          }`}>
                            {lnr.attendanceToday}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300">{lnr.guardianName}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedLearnerModal(lnr)}
                            className="px-3 py-1 bg-slate-950 border border-slate-700 hover:border-blue-500 text-blue-400 font-bold rounded-lg text-[11px]"
                          >
                            View Safety Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* LEARNER DETAIL MODAL */}
              {selectedLearnerModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-blue-500/60 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl">
                    <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          Digital Safety Profile: {selectedLearnerModal.firstName} {selectedLearnerModal.lastName}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">{selectedLearnerModal.emisNumber} • {selectedLearnerModal.grade}</p>
                      </div>
                      <button onClick={() => setSelectedLearnerModal(null)} className="text-slate-500 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <span className="text-blue-400 font-bold block border-b border-slate-800 pb-1">Wearable Telemetry</span>
                        <p>Serial: <strong className="text-white font-mono">{selectedLearnerModal.wearableSerial}</strong></p>
                        <p>Battery: <strong className="text-emerald-400">{selectedLearnerModal.batteryLevel}%</strong></p>
                        <p>Status: <strong className="text-white">{selectedLearnerModal.deviceStatus}</strong></p>
                        <p>Time In Today: <strong className="text-cyan-300">{selectedLearnerModal.timeIn}</strong></p>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <span className="text-blue-400 font-bold block border-b border-slate-800 pb-1">Guardian & Authorized Pickups</span>
                        <p>Primary Guardian: <strong className="text-white">{selectedLearnerModal.guardianName}</strong></p>
                        <p>Guardian Phone: <strong className="text-white font-mono">{selectedLearnerModal.guardianPhone}</strong></p>
                        <p className="text-slate-400">Authorized Pickups:</p>
                        <ul className="list-disc list-inside text-slate-300">
                          {selectedLearnerModal.authorizedPickups.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-red-950/40 rounded-2xl border border-red-800/60 text-xs text-red-200 space-y-1">
                      <span className="font-bold text-red-400 block">Medical Emergency Alerts</span>
                      <p>{selectedLearnerModal.medicalAlerts.length > 0 ? selectedLearnerModal.medicalAlerts.join(' • ') : 'No medical allergies flagged.'}</p>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => setSelectedLearnerModal(null)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                      >
                        Close Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: NFC GATE ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">NFC Gate Reader Attendance Logs</h2>
                  <p className="text-xs text-slate-400">Sub-second gate scan synchronization with SA-SAMS ledger</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const csvContent = 'data:text/csv;charset=utf-8,ID,Learner,Grade,Time,Gate,Status\n' +
                        attendanceLogs.map(l => `${l.id},${l.learnerName},${l.grade},${l.timestamp},${l.gateLocation},${l.scanStatus}`).join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', `Attendance_Report_${selectedCampus.id}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-3.5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export SA-SAMS CSV</span>
                  </button>
                </div>
              </div>

              {/* LOGS TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">Scan ID</th>
                      <th className="p-3">Learner Name</th>
                      <th className="p-3">Grade</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Gate Reader</th>
                      <th className="p-3">Reader Serial</th>
                      <th className="p-3">Scan Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {attendanceLogs.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-950/60">
                        <td className="p-3 font-mono text-cyan-400 font-bold">{rec.id}</td>
                        <td className="p-3 text-white font-bold">{rec.learnerName}</td>
                        <td className="p-3 text-slate-300 font-mono">{rec.grade}</td>
                        <td className="p-3 font-mono text-amber-400 font-bold">{rec.timestamp}</td>
                        <td className="p-3 text-slate-300">{rec.gateLocation}</td>
                        <td className="p-3 font-mono text-slate-400">{rec.readerSerial}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rec.scanStatus === 'VALID_ENTRY' ? 'bg-emerald-950 text-emerald-300' :
                            rec.scanStatus === 'LATE_ENTRY' ? 'bg-amber-950 text-amber-300' : 'bg-red-950 text-red-300'
                          }`}>
                            {rec.scanStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: GPS LIVE MAP */}
          {activeTab === 'map' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">School Boundary & Live GPS Corridors</h2>
                  <p className="text-xs text-slate-400">Map view for {selectedCampus.name}</p>
                </div>
                <button
                  onClick={handleSimulateGateScan}
                  className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-500"
                >
                  ↻ Refresh Map Pins
                </button>
              </div>

              {/* SIMULATED MAP CANVAS */}
              <div className="relative h-96 w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between p-6">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />

                <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-3">
                  <div className="w-48 h-48 rounded-full border-2 border-blue-500/40 bg-blue-500/10 flex items-center justify-center animate-pulse">
                    <div className="p-4 bg-slate-900 border border-blue-400 rounded-2xl text-center space-y-1 shadow-2xl">
                      <School className="w-8 h-8 text-blue-400 mx-auto" />
                      <span className="font-bold text-white text-xs block">{selectedCampus.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">1,240 Learners Protected</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Boundary Radius</span>
                    <span className="font-bold text-white">{schoolSettings.geofenceRadiusMeters} meters</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Gate Reader A</span>
                    <span className="font-bold text-emerald-400">ONLINE</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Scholar Buses</span>
                    <span className="font-bold text-cyan-300">2 In Corridor</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Last Sync</span>
                    <span className="font-bold text-amber-400">{lastWsPacketTime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SCHOLAR TRANSPORT */}
          {activeTab === 'transport' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Scholar Transport Fleet & Route Compliance</h2>
                <p className="text-xs text-slate-400">Real-time telemetry and speed monitoring for registered school vehicles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SAMPLE_SCHOOL_VEHICLES.map((v) => (
                  <div key={v.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-bold text-white">{v.registration}</h3>
                        <p className="text-slate-400 text-[11px]">{v.makeModel}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[10px] font-bold">
                        {v.routeCode}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px] border-t border-slate-800 pt-3">
                      <div>
                        <span className="text-slate-500 block">Driver</span>
                        <strong className="text-white">{v.driverName} ({v.driverPhone})</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Passenger Count</span>
                        <strong className="text-emerald-400">{v.currentPassengers} / {v.capacity} Seats</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Current Speed</span>
                        <strong className={v.speedKmh > v.speedLimitKmh ? 'text-red-400 font-bold' : 'text-white'}>
                          {v.speedKmh} km/h (Limit: {v.speedLimitKmh})
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Route Compliance</span>
                        <strong className="text-emerald-400">{v.routeComplianceScore}%</strong>
                      </div>
                    </div>

                    <a
                      href={`tel:${v.driverPhone}`}
                      className="block text-center py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500"
                    >
                      📞 Call Driver {v.driverName.split(' ')[0]}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: WEARABLE DEVICES */}
          {activeTab === 'devices' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">nRF9160 Wearable Device Management</h2>
                <p className="text-xs text-slate-400">Battery levels, firmware versions, and STSAFE cryptographic token integrity</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">Device Serial</th>
                      <th className="p-3">Assigned Learner</th>
                      <th className="p-3">Grade</th>
                      <th className="p-3">Battery</th>
                      <th className="p-3">Signal (dBm)</th>
                      <th className="p-3">Firmware</th>
                      <th className="p-3">Tamper Status</th>
                      <th className="p-3">Heartbeat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {SAMPLE_WEARABLE_DEVICES.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-950/60">
                        <td className="p-3 font-mono text-cyan-400 font-bold">{d.serialNumber}</td>
                        <td className="p-3 text-white font-bold">{d.assignedLearnerName}</td>
                        <td className="p-3 text-slate-300 font-mono">{d.grade}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">{d.batteryLevel}%</td>
                        <td className="p-3 font-mono text-slate-300">{d.signalStrengthDbm} dBm</td>
                        <td className="p-3 font-mono text-slate-400">{d.firmwareVersion}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            !d.tamperDetected ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'
                          }`}>
                            {!d.tamperDetected ? 'SECURE' : 'TAMPER ALERT'}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-amber-400">{d.lastHeartbeat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: INCIDENTS */}
          {activeTab === 'incidents' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Incident Timeline & Safety Log</h2>
                <p className="text-xs text-slate-400">Recorded safety triggers, SOS alerts, and operator response notes</p>
              </div>

              <div className="space-y-4">
                {SAMPLE_SCHOOL_INCIDENTS.map((inc) => (
                  <div key={inc.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-amber-400 font-bold">{inc.id} • {inc.timestamp}</span>
                        <h4 className="text-base font-bold text-white mt-1">{inc.title}</h4>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inc.status === 'RESOLVED' ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'
                      }`}>
                        {inc.status}
                      </span>
                    </div>

                    <p className="text-slate-300">Involved Learner: <strong>{inc.involvedLearner}</strong></p>
                    <p className="text-slate-300">Location: <strong>{inc.location}</strong></p>
                    <p className="text-slate-400 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <strong>Operator Notes:</strong> {inc.operatorNotes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: VISITORS */}
          {activeTab === 'visitors' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Visitor Registration & Gate Access</h2>
                  <p className="text-xs text-slate-400">QR Code access passes for contractors, parents, and inspectors</p>
                </div>
                <button
                  onClick={() => setShowRegisterVisitorModal(true)}
                  className="px-3.5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-500 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Visitor Pass</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visitors.map((v) => (
                  <div key={v.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-sm">{v.visitorName}</h4>
                        <p className="text-slate-400 text-[11px] font-mono">ID: {v.idPassportNumber}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono text-[10px]">
                        {v.qrCodeToken}
                      </span>
                    </div>
                    <p className="text-slate-300">Purpose: <strong>{v.purpose}</strong></p>
                    <p className="text-slate-300">Visiting: <strong>{v.visitingPerson}</strong></p>
                    <p className="text-slate-400 font-mono text-[11px]">Check-in: {v.checkInTime} • Status: {v.status}</p>
                  </div>
                ))}
              </div>

              {/* REGISTER VISITOR MODAL */}
              {showRegisterVisitorModal && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-blue-500/60 space-y-4 max-w-md mx-auto">
                  <div className="flex justify-between items-center text-white font-bold">
                    <span>Register New On-Campus Visitor Pass</span>
                    <button onClick={() => setShowRegisterVisitorModal(false)} className="text-slate-500 hover:text-white">✕</button>
                  </div>
                  <form onSubmit={handleRegisterVisitorSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-300 block">Visitor Full Name</label>
                      <input
                        type="text"
                        required
                        value={newVisitorName}
                        onChange={(e) => setNewVisitorName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block">Visiting Person / Office</label>
                      <input
                        type="text"
                        required
                        value={newVisitorHost}
                        onChange={(e) => setNewVisitorHost(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl">
                      Issue QR Access Pass
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 9: EMERGENCY BROADCAST */}
          {activeTab === 'broadcast' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Emergency Multi-Channel Broadcast Center</h2>
                <p className="text-xs text-slate-400">Queue SMS, Push, Email, and Voice broadcasts to whole school or selected grades</p>
              </div>

              {broadcastSuccessNotice && (
                <div className="p-4 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-2xl text-xs font-bold animate-pulse">
                  {broadcastSuccessNotice}
                </div>
              )}

              <form onSubmit={handleDispatchBroadcast} className="space-y-4 text-xs font-medium">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 block mb-1">Target Audience</label>
                    <select
                      value={broadcastAudience}
                      onChange={(e) => setBroadcastAudience(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    >
                      <option value="WHOLE_SCHOOL">Whole School (All Guardians & Staff)</option>
                      <option value="GRADE_6">Grade 6 Parents & Guardians Only</option>
                      <option value="TEACHERS">Teaching Staff Only</option>
                      <option value="PARENTS">All Registered Parents</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Broadcast Channels</label>
                    <div className="flex items-center space-x-4 pt-2">
                      <label className="flex items-center space-x-1.5 text-white">
                        <input
                          type="checkbox"
                          checked={broadcastChannels.sms}
                          onChange={(e) => setBroadcastChannels({ ...broadcastChannels, sms: e.target.checked })}
                          className="rounded bg-slate-950 border-slate-800 text-blue-500"
                        />
                        <span>SMS</span>
                      </label>
                      <label className="flex items-center space-x-1.5 text-white">
                        <input
                          type="checkbox"
                          checked={broadcastChannels.push}
                          onChange={(e) => setBroadcastChannels({ ...broadcastChannels, push: e.target.checked })}
                          className="rounded bg-slate-950 border-slate-800 text-blue-500"
                        />
                        <span>App Push</span>
                      </label>
                      <label className="flex items-center space-x-1.5 text-white">
                        <input
                          type="checkbox"
                          checked={broadcastChannels.email}
                          onChange={(e) => setBroadcastChannels({ ...broadcastChannels, email: e.target.checked })}
                          className="rounded bg-slate-950 border-slate-800 text-blue-500"
                        />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Notice Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Urgent Safety Update / Early School Closure"
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Message Body</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter message body to be dispatched to parents..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold rounded-xl text-xs shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Mass Emergency Broadcast</span>
                </button>
              </form>

              {/* RECENT BROADCASTS HISTORY */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white">Dispatched Broadcast History</h3>
                {broadcasts.map((b) => (
                  <div key={b.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-blue-400 font-bold">{b.id} • {b.timestamp}</span>
                      <span className="text-emerald-400 font-bold">{b.deliveredCount} / {b.totalRecipients} Delivered</span>
                    </div>
                    <h4 className="font-bold text-white">{b.subject}</h4>
                    <p className="text-slate-300">{b.messageBody}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: REPORTS & EXPORTS */}
          {activeTab === 'reports' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">SA-SAMS & Departmental Reports Export</h2>
                <p className="text-xs text-slate-400">Generate compliance-ready PDF, Excel, and CSV audit reports</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-blue-400 font-bold block">Monthly Attendance Audit</span>
                  <p className="text-slate-400">Official gate scanner attendance ledger mapped to SA-SAMS codes.</p>
                  <button
                    onClick={() => alert('PDF Attendance Report Downloaded!')}
                    className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500"
                  >
                    📄 Download PDF Report
                  </button>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-blue-400 font-bold block">Safety & Incident Ledger</span>
                  <p className="text-slate-400">Complete incident timelines, SOS panics, and responder logs.</p>
                  <button
                    onClick={() => alert('Excel Incident Ledger Exported!')}
                    className="w-full py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500"
                  >
                    📊 Export Excel Sheet
                  </button>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-blue-400 font-bold block">Hardware Inventory & Health</span>
                  <p className="text-slate-400">nRF9160 battery status, firmware versions, and tamper flags.</p>
                  <button
                    onClick={() => alert('CSV Hardware Inventory Downloaded!')}
                    className="w-full py-2 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500"
                  >
                    💾 Export CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SA-SAMS DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Official School Safety & Regulatory Guidelines</h2>
                <p className="text-xs text-slate-400">South African School Act & ITIS Infrastructure Compliance Documentation</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                {CRITICAL_SCHOOL_PORTAL_RULES.map((rule) => (
                  <div key={rule.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono text-[10px] font-bold">
                      {rule.badge}
                    </span>
                    <h4 className="font-bold text-white text-sm">{rule.title}</h4>
                    <p className="text-slate-300 leading-relaxed">{rule.ruleText}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">School Safety Analytics & Trends</h2>
                <p className="text-xs text-slate-400">Gauteng Department of Education Safety Metrics for {selectedCampus.name}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-blue-400 font-bold block border-b border-slate-800 pb-2">Weekly Attendance Trend</span>
                  <div className="h-32 flex items-end justify-between px-4 pb-2 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[10px]">
                    <div className="flex flex-col items-center"><div className="w-8 bg-blue-500 rounded-t h-28" /><span className="mt-1 text-slate-400">Mon 98%</span></div>
                    <div className="flex flex-col items-center"><div className="w-8 bg-blue-500 rounded-t h-26" /><span className="mt-1 text-slate-400">Tue 97%</span></div>
                    <div className="flex flex-col items-center"><div className="w-8 bg-emerald-500 rounded-t h-28" /><span className="mt-1 text-slate-400">Wed 98.2%</span></div>
                    <div className="flex flex-col items-center"><div className="w-8 bg-blue-500 rounded-t h-24" /><span className="mt-1 text-slate-400">Thu</span></div>
                    <div className="flex flex-col items-center"><div className="w-8 bg-blue-500 rounded-t h-24" /><span className="mt-1 text-slate-400">Fri</span></div>
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-blue-400 font-bold block border-b border-slate-800 pb-2">Hardware Device Health Breakdown</span>
                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Optimal Battery (&gt;50%)</span>
                      <span className="text-emerald-400 font-bold">1,180 (95.1%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Low Battery (&lt;20%)</span>
                      <span className="text-amber-400 font-bold">48 (3.8%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Offline / Depleted</span>
                      <span className="text-red-400 font-bold">12 (1.1%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: SUPPORT & AI ASSISTANT */}
          {activeTab === 'support' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">AI School Safety Assistant & Helpdesk</h2>
                <p className="text-xs text-slate-400">Instant answers for SA-SAMS queries, attendance troubleshooting, and hardware support</p>
              </div>

              {/* CHAT BOX */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-blue-400 font-bold text-xs block">ITIS AI Assistant Chat (EMIS Integrated)</span>
                <div className="h-56 overflow-y-auto space-y-3 p-2 font-mono text-xs">
                  {aiChatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl max-w-lg ${
                        msg.sender === 'user' ? 'ml-auto bg-blue-600 text-white' : 'mr-auto bg-slate-900 text-slate-200 border border-slate-800'
                      }`}
                    >
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                      <span className="text-[9px] opacity-60 block mt-1 text-right">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendAiMessage} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Ask about attendance stats, gate scanners, or SA-SAMS export..."
                    value={aiChatInput}
                    onChange={(e) => setAiChatInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-500">
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 14: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6 text-xs font-medium">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">School Safety Configurations & Gate Thresholds</h2>
                <p className="text-xs text-slate-400">Manage gate scanner hours, geofence radii, and automated SMS alerts for {selectedCampus.name}</p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 block mb-1">Gate Opening Time</label>
                    <input
                      type="text"
                      value={schoolSettings.gateOpeningTime}
                      onChange={(e) => setSchoolSettings({ ...schoolSettings, gateOpeningTime: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Gate Closing Time</label>
                    <input
                      type="text"
                      value={schoolSettings.gateClosingTime}
                      onChange={(e) => setSchoolSettings({ ...schoolSettings, gateClosingTime: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">School Geofence Radius (Meters)</label>
                  <input
                    type="number"
                    value={schoolSettings.geofenceRadiusMeters}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, geofenceRadiusMeters: parseInt(e.target.value) || 350 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-center space-x-3 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schoolSettings.autoParentSmsOnLate}
                      onChange={(e) => setSchoolSettings({ ...schoolSettings, autoParentSmsOnLate: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-blue-500"
                    />
                    <span>Automated SMS Alert to Parent on Late Entry (&gt;15 min)</span>
                  </label>

                  <label className="flex items-center space-x-3 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schoolSettings.sapsEmergencyEscalation}
                      onChange={(e) => setSchoolSettings({ ...schoolSettings, sapsEmergencyEscalation: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-blue-500"
                    />
                    <span>Auto Escalation to SAPS 10111 on SOS Panic Trigger</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ENTERPRISE FOOTER */}
      <Footer />
    </div>
  );
};
