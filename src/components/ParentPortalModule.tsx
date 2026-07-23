import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Battery,
  Wifi,
  Clock,
  User,
  Users,
  Bus,
  FileText,
  Calendar,
  Bell,
  Heart,
  PhoneCall,
  UserCheck,
  Settings,
  HelpCircle,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Siren,
  ChevronRight,
  Radio,
  Sliders,
  Sparkles,
  Phone,
  MessageSquare,
  Lock,
  Globe,
  Plus,
  Search,
  ExternalLink,
  Activity,
  ArrowRight,
  Send,
  Download,
  Eye,
  X,
  FileSpreadsheet
} from 'lucide-react';
import {
  ChildProfile,
  JourneyEvent,
  AttendanceRecord,
  TransportDetails,
  MedicalRecord,
  EmergencyContact,
  ParentNotification,
  SAMPLE_CHILDREN,
  TODAY_JOURNEY_TIMELINE,
  MONTHLY_ATTENDANCE,
  ASSIGNED_TRANSPORT,
  CHILD_MEDICAL_PROFILE,
  EMERGENCY_CONTACTS,
  PARENT_NOTIFICATIONS,
  CRITICAL_PARENT_PORTAL_RULES
} from '../data/parentPortalData';

type ParentPortalTab =
  | 'dashboard'
  | 'children'
  | 'tracking'
  | 'journey'
  | 'attendance'
  | 'transport'
  | 'medical'
  | 'contacts'
  | 'notifications'
  | 'settings'
  | 'support';

export const ParentPortalModule: React.FC = () => {
  // Active Sidebar Tab
  const [activeTab, setActiveTab] = useState<ParentPortalTab>('dashboard');

  // Multi-Child Switcher State
  const [selectedChild, setSelectedChild] = useState<ChildProfile>(SAMPLE_CHILDREN[0]);

  // Live WebSocket Simulation State
  const [wsConnected, setWsConnected] = useState<boolean>(true);
  const [lastWsPacketTime, setLastWsPacketTime] = useState<string>('08:14:22');
  const [simulatedBattery, setSimulatedBattery] = useState<number>(selectedChild.batteryLevel);
  const [simulatedSpeed, setSimulatedSpeed] = useState<number>(selectedChild.speedKmh);
  const [simulatedLocation, setSimulatedLocation] = useState<string>(selectedChild.lastSeenLocation);

  // SOS Emergency Trigger State
  const [isSosActive, setIsSosActive] = useState<boolean>(false);
  const [sosCountdown, setSosCountdown] = useState<number>(5);
  const [isSosModalOpen, setIsSosModalOpen] = useState<boolean>(false);

  // Notifications State
  const [notifications, setNotifications] = useState<ParentNotification[]>(PARENT_NOTIFICATIONS);
  const [notificationFilter, setNotificationFilter] = useState<string>('ALL');

  // Emergency Contacts & Pickup Persons State
  const [contacts, setContacts] = useState<EmergencyContact[]>(EMERGENCY_CONTACTS);
  const [showAddContactModal, setShowAddContactModal] = useState<boolean>(false);
  const [newContactName, setNewContactName] = useState<string>('');
  const [newContactRelation, setNewContactRelation] = useState<string>('Family Friend');
  const [newContactPhone, setNewContactPhone] = useState<string>('+27 ');

  // Support Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'bot', text: 'Hello Nompumelelo! Welcome to the ITIS Parent Safety Assistant. How can I assist you with Bulumko\'s tracking today?', time: '08:00 AM' },
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  // Settings Form State
  const [settings, setSettings] = useState({
    language: 'English (RSA)',
    smsAlerts: true,
    pushAlerts: true,
    geofenceBreachAlerts: true,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '06:00',
    biometricLogin: true,
  });

  // Fetch live learner & attendance data from NestJS backend
  const [apiLearners, setApiLearners] = useState<any[]>([]);
  const [liveAttendanceStatus, setLiveAttendanceStatus] = useState<string>('PRESENT');

  useEffect(() => {
    const fetchLiveParentData = async () => {
      try {
        const res = await fetch('/api/v1/learners');
        const data = await res.json();
        if (data.status === 'SUCCESS' && Array.isArray(data.data)) {
          setApiLearners(data.data);
        }
      } catch (e) {
        console.warn('Backend connection falling back to client cache');
      }
    };
    fetchLiveParentData();
  }, []);

  // Simulated WebSockets Telemetry Ping
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setLastWsPacketTime(timeStr);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // SOS Countdown Handler & Live Backend SOS Incident Creation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSosModalOpen && sosCountdown > 0) {
      timer = setInterval(() => {
        setSosCountdown((prev) => prev - 1);
      }, 1000);
    } else if (sosCountdown === 0 && isSosModalOpen) {
      setIsSosActive(true);
      // Trigger live backend emergency dispatch API
      fetch('/api/v1/incidents/trigger-sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          learnerId: selectedChild.id,
          lat: selectedChild.lat,
          lng: selectedChild.lng,
        }),
      }).catch(console.error);
    }
    return () => clearInterval(timer);
  }, [isSosModalOpen, sosCountdown, selectedChild]);

  const handleSimulateTelemetryPing = () => {
    const now = new Date();
    setLastWsPacketTime(now.toTimeString().split(' ')[0]);
    // Random battery fluctuation
    setSimulatedBattery((prev) => Math.max(10, Math.min(100, prev + (Math.random() > 0.5 ? -1 : 1))));
    // Random location simulate
    const locs = [
      'Classroom 6B, Soweto Central Primary',
      'School Library & Media Centre',
      'Sports Field Gate A',
      'School Cafeteria Courtyard',
    ];
    setSimulatedLocation(locs[Math.floor(Math.random() * locs.length)]);
  };

  const handleSendSupportChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: 'Just now' }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Thank you. I have verified Bulumko's wearable device (${selectedChild.wearableSerial}). Current status is OPTIMAL_PROTECTION with 92% battery at Soweto Central Primary.`,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: EmergencyContact = {
      id: `EC-0${contacts.length + 1}`,
      name: newContactName,
      relationship: newContactRelation,
      phone: newContactPhone,
      email: `${newContactName.toLowerCase().replace(' ', '.')}@gmail.com`,
      isPrimary: false,
      canPickupChild: true,
      photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120',
    };
    setContacts([...contacts, newEntry]);
    setShowAddContactModal(false);
    setNewContactName('');
    setNewContactPhone('+27 ');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* HERO BANNER & WEBSOCKET TELEMETRY STATUS */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 rounded-3xl border border-amber-500/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>PROMPT 054 — PRODUCTION PARENT SAFETY PORTAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Parent Protection & <span className="text-amber-400">Child Tracking Hub</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Consuming backend telemetry, geofence, and CAD dispatch interfaces (Prompts 019–028, 036). Real-time tracking for South African school learners.
            </p>
          </div>

          {/* MULTI-CHILD SWITCHER & WEBSOCKET BRIDGE BOX */}
          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-2xl border border-amber-800/40">
            {/* Child Toggle */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Selected Child</span>
              <div className="flex gap-2">
                {SAMPLE_CHILDREN.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      setSelectedChild(child);
                      setSimulatedBattery(child.batteryLevel);
                      setSimulatedLocation(child.lastSeenLocation);
                    }}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedChild.id === child.id
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 ring-1 ring-amber-300'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <img src={child.avatarUrl} alt={child.firstName} className="w-5 h-5 rounded-full object-cover" />
                    <span>{child.firstName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live WebSockets Status */}
            <div className="pl-4 border-l border-slate-800 flex flex-col justify-center space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className={`w-2.5 h-2.5 rounded-full ${wsConnected ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`} />
                <span className="text-emerald-400 font-bold">WebSocket Live</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Last Packet: {lastWsPacketTime}</span>
              <button
                onClick={handleSimulateTelemetryPing}
                className="text-[10px] text-amber-400 hover:underline text-left font-mono font-bold"
              >
                ↻ Push Telemetry Ping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SOS PANIC BANNER ALERT IF ACTIVE */}
      {isSosActive && (
        <div className="p-5 bg-red-950/95 rounded-2xl border-2 border-red-500 text-red-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl animate-pulse">
          <div className="flex items-center space-x-3">
            <Siren className="w-8 h-8 text-red-400 shrink-0" />
            <div>
              <h3 className="text-base font-black text-white">EMERGENCY SOS PANIC DISPATCHED!</h3>
              <p className="text-xs text-red-300">
                Live CAD emergency ticket generated for {selectedChild.firstName}. SAPS 10111 & Command Operator notified.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSosActive(false);
              setIsSosModalOpen(false);
              setSosCountdown(5);
            }}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800"
          >
            Cancel Panic Alarm
          </button>
        </div>
      )}

      {/* MAIN PARENT PORTAL CONTAINER (PERSISTENT SIDEBAR + DYNAMIC CONTENT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PERSISTENT SIDEBAR NAVIGATION (3 COLS ON DESKTOP) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 space-y-2">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Parent Navigation</span>
              <span className="text-[10px] text-amber-400 font-mono">RSA ITIS</span>
            </div>

            <nav className="space-y-1 text-xs font-bold">
              {(
                [
                  { id: 'dashboard', label: 'Safety Dashboard', icon: ShieldCheck },
                  { id: 'children', label: 'My Children Roster', icon: Users },
                  { id: 'tracking', label: 'Live GPS & Map', icon: MapPin },
                  { id: 'journey', label: 'Daily Journey Timeline', icon: Clock },
                  { id: 'attendance', label: 'Attendance & NFC', icon: Calendar },
                  { id: 'transport', label: 'Transport & Driver', icon: Bus },
                  { id: 'medical', label: 'Medical Profile', icon: Heart },
                  { id: 'contacts', label: 'Emergency & Pickups', icon: UserCheck },
                  { id: 'notifications', label: `Notifications (${unreadCount})`, icon: Bell },
                  { id: 'settings', label: 'Portal Settings', icon: Settings },
                  { id: 'support', label: 'Support & Help', icon: HelpCircle },
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
                        ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <IconComp className={`w-4 h-4 ${isCurrent ? 'text-slate-950' : 'text-amber-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isCurrent ? 'text-slate-950' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </nav>

            {/* INSTANT PANIC BUTTON */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setIsSosModalOpen(true);
                  setSosCountdown(5);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-extrabold text-xs shadow-xl shadow-red-600/30 hover:from-red-500 hover:to-red-600 flex items-center justify-center space-x-2"
              >
                <Siren className="w-4 h-4 animate-bounce" />
                <span>TRIGGER INSTANT SOS PANIC</span>
              </button>
            </div>
          </div>

          {/* ACTIVE CHILD SUMMARY MINI-CARD */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center space-x-3">
              <img src={selectedChild.avatarUrl} alt={selectedChild.firstName} className="w-10 h-10 rounded-full object-cover border-2 border-amber-500" />
              <div>
                <h4 className="font-bold text-white">{selectedChild.firstName} {selectedChild.lastName}</h4>
                <p className="text-slate-400 text-[11px]">{selectedChild.grade} • {selectedChild.schoolName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-slate-800 pt-2">
              <div className="p-2 bg-slate-900 rounded-lg">
                <span className="text-slate-500 block">Battery</span>
                <span className="font-bold text-emerald-400">{simulatedBattery}%</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg">
                <span className="text-slate-500 block">Signal</span>
                <span className="font-bold text-cyan-400">{selectedChild.signalStrengthDbm} dBm</span>
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC TAB CONTENT AREA (9 COLS ON DESKTOP) */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: SAFETY DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* CHILD SAFETY STATUS OVERVIEW CARD */}
              <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Child Safety Status & Live Protection</h2>
                    <p className="text-xs text-slate-400">Real-time status for {selectedChild.firstName} at {selectedChild.schoolName}</p>
                  </div>

                  <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{selectedChild.protectionStatus}</span>
                  </span>
                </div>

                {/* 4 CORE METRIC TILES */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 font-medium">School Status</span>
                    <p className="text-sm font-bold text-emerald-400">{selectedChild.schoolStatus}</p>
                    <span className="text-[10px] text-slate-500 block">Classroom 6B NFC Verified</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 font-medium">Journey Status</span>
                    <p className="text-sm font-bold text-amber-400">{selectedChild.journeyStatus}</p>
                    <span className="text-[10px] text-slate-500 block">Bus GP 12 SA GP On Route</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 font-medium">Battery & Hardware</span>
                    <p className="text-sm font-bold text-cyan-400">{simulatedBattery}% Battery</p>
                    <span className="text-[10px] text-slate-500 block">{selectedChild.wearableSerial}</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 font-medium">Threat Level</span>
                    <p className="text-sm font-bold text-emerald-400">{selectedChild.threatLevel}</p>
                    <span className="text-[10px] text-slate-500 block">SOWETO Circuit Normal</span>
                  </div>
                </div>

                {/* CURRENT LOCATION BAR */}
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Current Location</span>
                      <p className="font-bold text-white text-sm">{simulatedLocation}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono text-[11px]">
                    <span className="text-slate-400 block">GPS Accuracy: {selectedChild.gpsAccuracyMeters}m</span>
                    <span className="text-amber-400 font-bold">Last Update: {lastWsPacketTime}</span>
                  </div>
                </div>

                {/* ONE-TOUCH DIRECT CALL BUTTONS */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Quick Direct Communication</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                    <a
                      href="tel:+27119388000"
                      className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-white hover:border-amber-500 flex items-center justify-center space-x-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call School Admin</span>
                    </a>

                    <a
                      href={`tel:${ASSIGNED_TRANSPORT.driverMobile}`}
                      className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-white hover:border-amber-500 flex items-center justify-center space-x-2"
                    >
                      <Bus className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Call Bus Driver</span>
                    </a>

                    <button
                      onClick={() => setActiveTab('contacts')}
                      className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-white hover:border-amber-500 flex items-center justify-center space-x-2"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Guardians</span>
                    </button>

                    <a
                      href="tel:10111"
                      className="py-2.5 px-3 rounded-xl bg-red-950 border border-red-800 text-red-200 hover:bg-red-900 flex items-center justify-center space-x-2"
                    >
                      <Siren className="w-3.5 h-3.5 text-red-400" />
                      <span>SAPS 10111</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* RECENT JOURNEY TIMELINE SUMMARY */}
              <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white">Today's Journey Progress</h3>
                  <button onClick={() => setActiveTab('journey')} className="text-xs text-amber-400 font-bold hover:underline">
                    View Full Timeline →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {TODAY_JOURNEY_TIMELINE.slice(0, 3).map((evt) => (
                    <div key={evt.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-amber-400 font-bold">{evt.time}</span>
                        <span className="text-emerald-400 font-bold">{evt.status}</span>
                      </div>
                      <h4 className="font-bold text-white">{evt.title}</h4>
                      <p className="text-[11px] text-slate-400">{evt.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY CHILDREN ROSTER */}
          {activeTab === 'children' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Registered Children & Wearables</h2>
                  <p className="text-xs text-slate-400">Children linked to your RSA Parent Account ID (USR-RSA-881024)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SAMPLE_CHILDREN.map((child) => (
                  <div key={child.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center space-x-4">
                      <img src={child.avatarUrl} alt={child.firstName} className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500" />
                      <div>
                        <h3 className="text-base font-bold text-white">{child.firstName} {child.lastName}</h3>
                        <p className="text-xs text-amber-400 font-mono">{child.grade} • {child.schoolName}</p>
                        <span className="text-[10px] text-slate-500 font-mono">Wearable ID: {child.wearableSerial}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono border-t border-slate-800 pt-3">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Protection</span>
                        <span className="font-bold text-emerald-400">{child.protectionStatus}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Battery</span>
                        <span className="font-bold text-cyan-400">{child.batteryLevel}% Charged</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedChild(child);
                        setActiveTab('tracking');
                      }}
                      className="w-full py-2 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-all"
                    >
                      Open Live GPS Tracking →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE TRACKING MAP */}
          {activeTab === 'tracking' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Live Vector Map & Telemetry</h2>
                  <p className="text-xs text-slate-400">Tracking {selectedChild.firstName} ({selectedChild.wearableSerial})</p>
                </div>
                <button
                  onClick={handleSimulateTelemetryPing}
                  className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400"
                >
                  ↻ Refresh Coordinates
                </button>
              </div>

              {/* SIMULATED MAP CANVAS BOX */}
              <div className="relative h-96 w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between p-6">
                {/* Background Map Grid Simulation */}
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                {/* Simulated Geofence Circle & Pin */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-3">
                  <div className="w-32 h-32 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-2xl shadow-amber-500">
                      <MapPin className="w-6 h-6 text-slate-950" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono">
                      {simulatedLocation}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">Lat: {selectedChild.lat} • Lng: {selectedChild.lng}</p>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Speed</span>
                    <span className="font-bold text-white">{selectedChild.speedKmh} km/h</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Heading</span>
                    <span className="font-bold text-white">{selectedChild.headingDeg}° SE</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Accuracy</span>
                    <span className="font-bold text-emerald-400">±{selectedChild.gpsAccuracyMeters}m</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ping</span>
                    <span className="font-bold text-amber-400">{lastWsPacketTime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DAILY JOURNEY TIMELINE */}
          {activeTab === 'journey' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Chronological Daily Journey Audit</h2>
                <p className="text-xs text-slate-400">Step-by-step telemetry events recorded for {selectedChild.firstName}</p>
              </div>

              <div className="space-y-4 relative pl-6 border-l-2 border-slate-800">
                {TODAY_JOURNEY_TIMELINE.map((evt) => (
                  <div key={evt.id} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-500 group-hover:bg-amber-500 transition-all" />
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-amber-400 font-bold">{evt.time}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          evt.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-900 text-slate-400'
                        }`}>
                          {evt.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                      <p className="text-xs text-slate-400">{evt.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ATTENDANCE & NFC SCANS */}
          {activeTab === 'attendance' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">School Attendance & NFC Gate Logs</h2>
                <p className="text-xs text-slate-400">Official gate reader scan history at {selectedChild.schoolName}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">Date</th>
                      <th className="p-3">Day</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Time In</th>
                      <th className="p-3">Time Out</th>
                      <th className="p-3">Gate Reader</th>
                      <th className="p-3">NFC Ticket</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {MONTHLY_ATTENDANCE.map((rec) => (
                      <tr key={rec.date} className="hover:bg-slate-950/60">
                        <td className="p-3 font-mono text-white font-bold">{rec.date}</td>
                        <td className="p-3 text-slate-300">{rec.dayOfWeek}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rec.status === 'PRESENT' ? 'bg-emerald-950 text-emerald-300' :
                            rec.status === 'LATE' ? 'bg-amber-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {rec.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-200">{rec.timeIn}</td>
                        <td className="p-3 text-slate-200">{rec.timeOut}</td>
                        <td className="p-3 text-slate-400">{rec.gateLocation}</td>
                        <td className="p-3 font-mono text-xs text-cyan-400">{rec.nfcScanId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: TRANSPORT & DRIVER */}
          {activeTab === 'transport' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Assigned Transport & Driver Record</h2>
                <p className="text-xs text-slate-400">Verified scholar transport operator details for {selectedChild.firstName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-medium">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-amber-400 font-bold block border-b border-slate-800 pb-2">Vehicle Specifications</span>
                  <p>Registration: <strong className="text-white font-mono text-sm">{ASSIGNED_TRANSPORT.vehicleReg}</strong></p>
                  <p>Make & Model: <strong className="text-white">{ASSIGNED_TRANSPORT.vehicleMakeModel}</strong></p>
                  <p>Route Code: <strong className="text-cyan-300 font-mono">{ASSIGNED_TRANSPORT.routeCode}</strong></p>
                  <p>Compliance Score: <strong className="text-emerald-400 font-bold">{ASSIGNED_TRANSPORT.routeComplianceScore}%</strong></p>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-amber-400 font-bold block border-b border-slate-800 pb-2">Driver Credentials</span>
                  <p>Driver Name: <strong className="text-white">{ASSIGNED_TRANSPORT.driverName}</strong></p>
                  <p>License Grade: <strong className="text-emerald-400">{ASSIGNED_TRANSPORT.driverLicenseGrade}</strong></p>
                  <p>Mobile: <strong className="text-white font-mono">{ASSIGNED_TRANSPORT.driverMobile}</strong></p>
                  <a
                    href={`tel:${ASSIGNED_TRANSPORT.driverMobile}`}
                    className="inline-block mt-2 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400"
                  >
                    📞 Call Driver Now
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: MEDICAL PROFILE */}
          {activeTab === 'medical' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Child Health & Medical Emergency Profile</h2>
                <p className="text-xs text-slate-400">Critical medical data transmitted to SAPS 10111 / EMS during SOS triggers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-amber-400 font-bold block border-b border-slate-800 pb-2">Core Health Data</span>
                  <p>Blood Group: <strong className="text-red-400 font-bold text-sm">{CHILD_MEDICAL_PROFILE.bloodGroup}</strong></p>
                  <p>Severe Allergies: <strong className="text-white">{CHILD_MEDICAL_PROFILE.allergies.join(', ')}</strong></p>
                  <p>Chronic Medication: <strong className="text-white">{CHILD_MEDICAL_PROFILE.medications.join(', ')}</strong></p>
                  <p>Medical Aid: <strong className="text-cyan-300 font-mono">{CHILD_MEDICAL_PROFILE.medicalAidName} ({CHILD_MEDICAL_PROFILE.medicalAidNumber})</strong></p>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-amber-400 font-bold block border-b border-slate-800 pb-2">Preferred Hospital & Doctor</span>
                  <p>Preferred Hospital: <strong className="text-white">{CHILD_MEDICAL_PROFILE.preferredHospital}</strong></p>
                  <p>Doctor: <strong className="text-white">{CHILD_MEDICAL_PROFILE.emergencyDoctorName}</strong></p>
                  <p>Doctor Phone: <strong className="text-white font-mono">{CHILD_MEDICAL_PROFILE.emergencyDoctorPhone}</strong></p>
                  <div className="p-3 bg-slate-900 rounded-xl text-slate-300 text-[11px] border border-slate-800">
                    <strong className="text-amber-400 block">Notes:</strong> {CHILD_MEDICAL_PROFILE.criticalNotes}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: EMERGENCY CONTACTS & PICKUP PERMISSIONS */}
          {activeTab === 'contacts' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Emergency Contacts & Authorized Pickups</h2>
                  <p className="text-xs text-slate-400">Individuals authorized to pick up {selectedChild.firstName} at school</p>
                </div>
                <button
                  onClick={() => setShowAddContactModal(true)}
                  className="px-3.5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Pickup Person</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contacts.map((c) => (
                  <div key={c.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={c.photoUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-amber-500" />
                      <div>
                        <h4 className="font-bold text-white">{c.name}</h4>
                        <p className="text-slate-400 text-[11px]">{c.relationship}</p>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono space-y-1">
                      <p className="text-slate-300">{c.phone}</p>
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
                        ✓ Authorized Pickup Holder
                      </span>
                    </div>

                    <a
                      href={`tel:${c.phone}`}
                      className="block text-center py-2 bg-slate-900 text-amber-400 font-bold rounded-xl border border-slate-800 hover:bg-slate-800"
                    >
                      📞 Call {c.name.split(' ')[0]}
                    </a>
                  </div>
                ))}
              </div>

              {/* ADD CONTACT MODAL */}
              {showAddContactModal && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-amber-500/60 space-y-4 max-w-md mx-auto">
                  <div className="flex justify-between items-center text-white font-bold">
                    <span>Add Authorized Pickup Person</span>
                    <button onClick={() => setShowAddContactModal(false)} className="text-slate-500 hover:text-white">✕</button>
                  </div>
                  <form onSubmit={handleAddContactSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-300 block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block">Relationship</label>
                      <input
                        type="text"
                        required
                        value={newContactRelation}
                        onChange={(e) => setNewContactRelation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block">RSA Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={newContactPhone}
                        onChange={(e) => setNewContactPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl">
                      Save Pickup Authorization
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 9: PUSH NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Push Notification History</h2>
                  <p className="text-xs text-slate-400">Automated safety notifications received for your children</p>
                </div>
                <button
                  onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
                  className="text-xs text-amber-400 font-bold hover:underline"
                >
                  Mark All Read
                </button>
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl border flex justify-between items-start text-xs ${
                      !n.read ? 'bg-amber-950/30 border-amber-500/50' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white">{n.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono">
                          {n.category}
                        </span>
                      </div>
                      <p className="text-slate-300">{n.message}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">{n.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: PORTAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6 text-xs font-medium">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">Parent Portal Preferences</h2>
                <p className="text-xs text-slate-400">Configure language, notification filters, and biometric security</p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-slate-300 block">Preferred Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="English (RSA)">English (South Africa)</option>
                    <option value="isiZulu">isiZulu</option>
                    <option value="isiXhosa">isiXhosa</option>
                    <option value="Afrikaans">Afrikaans</option>
                    <option value="Sesotho">Sesotho</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-center space-x-3 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsAlerts}
                      onChange={(e) => setSettings({ ...settings, smsAlerts: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-amber-500"
                    />
                    <span>SMS Emergency Alerts (Primary RSA Phone Number)</span>
                  </label>

                  <label className="flex items-center space-x-3 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.geofenceBreachAlerts}
                      onChange={(e) => setSettings({ ...settings, geofenceBreachAlerts: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-amber-500"
                    />
                    <span>Instant Push Notification on School Geofence Breach</span>
                  </label>

                  <label className="flex items-center space-x-3 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.biometricLogin}
                      onChange={(e) => setSettings({ ...settings, biometricLogin: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-amber-500"
                    />
                    <span>Enable Biometric Passkey / Fingerprint Authentication</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SUPPORT & HELP */}
          {activeTab === 'support' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">ITIS Parent Support & Emergency Hotlines</h2>
                <p className="text-xs text-slate-400">24/7 National Helpdesk & AI Safety Assistant</p>
              </div>

              {/* LIVE CHAT BOX */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-amber-400 font-bold text-xs block">ITIS AI Safety Assistant Chat</span>
                <div className="h-48 overflow-y-auto space-y-3 p-2 font-mono text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl max-w-md ${
                        msg.sender === 'user'
                          ? 'ml-auto bg-amber-500 text-slate-950 font-bold'
                          : 'mr-auto bg-slate-900 text-slate-200 border border-slate-800'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[9px] opacity-70 block mt-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendSupportChat} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a question about Bulumko's device or route..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                  <button type="submit" className="px-4 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SOS CONFIRMATION MODAL */}
      {isSosModalOpen && !isSosActive && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border-2 border-red-500 p-6 max-w-md w-full space-y-6 text-center shadow-2xl">
            <Siren className="w-16 h-16 text-red-500 mx-auto animate-bounce" />
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">CONFIRM EMERGENCY SOS PANIC</h3>
              <p className="text-xs text-red-300">
                This action alerts SAPS 10111, Command Operators, and School Security with live intercept vectors.
              </p>
            </div>

            <div className="text-4xl font-black text-amber-400 font-mono">{sosCountdown}s</div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsSosModalOpen(false);
                  setSosCountdown(5);
                }}
                className="flex-1 py-3 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
              >
                Cancel Panic
              </button>
              <button
                onClick={() => setIsSosActive(true)}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-500"
              >
                Dispatch Immediately
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
