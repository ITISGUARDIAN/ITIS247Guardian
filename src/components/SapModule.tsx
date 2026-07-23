import React, { useState } from 'react';
import {
  School,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Users,
  UserCheck,
  UserX,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Bus,
  Cpu,
  Battery,
  Wifi,
  Search,
  Filter,
  FileText,
  Download,
  Send,
  Terminal,
  FileCode,
  Layers,
  Database,
  Radio,
  QrCode,
  Smartphone,
  ChevronRight,
  Zap,
  Lock,
  Eye,
  Bell,
  Settings,
  BarChart3,
  RefreshCw,
  Plus,
  PhoneCall,
  UserPlus
} from 'lucide-react';
import {
  SAMPLE_SCHOOL_METRICS,
  SAMPLE_SAP_LEARNERS,
  SAMPLE_SAP_INCIDENTS,
  SAMPLE_SAP_BUSES,
  SAMPLE_SAP_WEARABLES,
  SAP_CODE_SPECS,
  CRITICAL_SAP_RULES,
  SapLearnerRecord,
  SapIncidentRecord,
  SapBusFleetRecord,
  SapWearableInventory,
  SapCodeSpec
} from '../data/sapData';

export const SapModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'dashboard_live' | 'learner_registry' | 'attendance_nfc' | 'tracking_map' | 'transport_fleet' | 'device_inventory' | 'reports_analytics' | 'code_architecture' | 'rules_sla'
  >('dashboard_live');

  // Learners State
  const [learners, setLearners] = useState<SapLearnerRecord[]>(SAMPLE_SAP_LEARNERS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('ALL');

  // Incidents State
  const [incidents, setIncidents] = useState<SapIncidentRecord[]>(SAMPLE_SAP_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<SapIncidentRecord | null>(SAMPLE_SAP_INCIDENTS[0]);

  // Code Spec State
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<SapCodeSpec>(SAP_CODE_SPECS[0]);

  // Broadcast Alert Modal/Form
  const [broadcastText, setBroadcastText] = useState<string>('');
  const [broadcastTarget, setBroadcastTarget] = useState<string>('ALL_PARENTS');

  // Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // NFC Tap Simulator
  const handleSimulateNfcTap = (learnerId: string) => {
    setLearners((prev) =>
      prev.map((l) => {
        if (l.id === learnerId) {
          return {
            ...l,
            attendanceToday: 'PRESENT_NFC',
            checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            safetyStatus: 'SAFE_IN_CLASS',
          };
        }
        return l;
      })
    );
    addLog(`NFC GATE TAP PROCESSED: Learner ${learnerId} checked in. SMS parent notification queued.`);
  };

  // Broadcast Dispatch
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    addLog(`EMERGENCY SCHOOL BROADCAST DISPATCHED to [${broadcastTarget}]: "${broadcastText}"`);
    setBroadcastText('');
  };

  // Filtered Learners
  const filteredLearners = learners.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.wearableImei.includes(searchQuery);
    const matchesGrade = selectedGradeFilter === 'ALL' || l.gradeClass.startsWith(selectedGradeFilter);
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-900 rounded-2xl border border-cyan-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
              <School className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>PROMPT 037 — SCHOOL ADMINISTRATION PORTAL (SAP)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              School Administration & <span className="text-cyan-400">Learner Safety Portal</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Production-grade portal for Principals, Safety Officers, and Transport Coordinators. Features live NFC/QR gate attendance, Google Maps geofencing, real-time wearable telemetry, scholar transport monitoring, and instant parent emergency broadcasts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-cyan-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">1,850</span>
              <span className="text-xs text-slate-400 font-medium">Protected Learners</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">97.4%</span>
              <span className="text-xs text-slate-400 font-medium">Today Attendance</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">&lt; 250ms</span>
              <span className="text-xs text-slate-400 font-medium">Sync Latency</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('dashboard_live')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'dashboard_live'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <School className="w-4 h-4 text-cyan-400" />
            <span>1. Live School Overview</span>
          </button>

          <button
            onClick={() => setActiveSubTab('learner_registry')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'learner_registry'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>2. Learner Registry & Profiles</span>
          </button>

          <button
            onClick={() => setActiveSubTab('attendance_nfc')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'attendance_nfc'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4 text-purple-400" />
            <span>3. NFC Gate Attendance</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tracking_map')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'tracking_map'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>4. Geofence & Tracking Map</span>
          </button>

          <button
            onClick={() => setActiveSubTab('transport_fleet')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'transport_fleet'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Bus className="w-4 h-4 text-rose-400" />
            <span>5. Scholar Transport Fleet</span>
          </button>

          <button
            onClick={() => setActiveSubTab('device_inventory')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'device_inventory'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-teal-400" />
            <span>6. Wearable Device Inventory</span>
          </button>

          <button
            onClick={() => setActiveSubTab('reports_analytics')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'reports_analytics'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-sky-400" />
            <span>7. Safety Reports & Analytics</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_architecture'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-fuchsia-400" />
            <span>8. Next.js / NestJS Code Spec</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rules_sla')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'rules_sla'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>9. Mandatory SAP Rules & SLAs</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
              <span>School Admin Portal Event & Telemetry Log</span>
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

      {/* SUB-TAB 1: LIVE SCHOOL OVERVIEW */}
      {activeSubTab === 'dashboard_live' && (
        <div className="space-y-6">
          {/* TOP METRICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Learners Protected</span>
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-3xl font-extrabold text-white">{SAMPLE_SCHOOL_METRICS.totalLearnersProtected}</span>
              <span className="text-[11px] text-emerald-400 font-medium block">100% Enrolled in ITIS Safety</span>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wearables Online</span>
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-3xl font-extrabold text-white">{SAMPLE_SCHOOL_METRICS.wearablesOnlineCount}</span>
              <span className="text-[11px] text-slate-400 font-medium block">97.9% Active Signal Heartbeat</span>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today Attendance</span>
                <UserCheck className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-3xl font-extrabold text-white">{SAMPLE_SCHOOL_METRICS.todayAttendancePct}%</span>
              <span className="text-[11px] text-emerald-400 font-medium block">+1.2% vs District Average</span>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Incidents</span>
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <span className="text-3xl font-extrabold text-rose-400">{SAMPLE_SCHOOL_METRICS.activeIncidentsCount}</span>
              <span className="text-[11px] text-rose-300 font-medium block">Wearable Tamper (North Gate)</span>
            </div>
          </div>

          {/* MAIN DASHBOARD CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT 2 COLUMNS: INCIDENT MANAGEMENT & BROADCAST */}
            <div className="lg:col-span-2 space-y-6">
              {/* ACTIVE INCIDENTS */}
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
                    <h3 className="text-base font-bold text-white">Active School Incidents & Alerts</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold rounded-lg font-mono">
                    {incidents.filter((i) => i.status !== 'RESOLVED_SAFE').length} UNRESOLVED
                  </span>
                </div>

                <div className="space-y-3">
                  {incidents.map((inc) => (
                    <div
                      key={inc.id}
                      onClick={() => setSelectedIncident(inc)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                        selectedIncident?.id === inc.id
                          ? 'bg-slate-800 border-cyan-500 shadow-lg'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white">{inc.learnerName}</span>
                          <span className="text-slate-400 font-mono">({inc.gradeClass})</span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            inc.severity === 'HIGH_ORANGE'
                              ? 'bg-amber-950 border-amber-800 text-amber-300'
                              : 'bg-emerald-950 border-emerald-800 text-emerald-400'
                          }`}
                        >
                          {inc.severity}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300">{inc.schoolNotes}</p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 font-mono">
                        <span>Loc: {inc.location}</span>
                        <span>Officer: {inc.assignedOfficer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* EMERGENCY PARENT BROADCAST FORM */}
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Bell className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Broadcast Emergency Notice to Parents</h3>
                </div>

                <form onSubmit={handleSendBroadcast} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Target Audience:</label>
                      <select
                        value={broadcastTarget}
                        onChange={(e) => setBroadcastTarget(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="ALL_PARENTS">All School Parents (1,850)</option>
                        <option value="GRADE_5">Grade 5 Parents Only</option>
                        <option value="BUS_USERS">Scholar Transport Bus Parents</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Channel:</label>
                      <input
                        type="text"
                        disabled
                        value="SMS + Parent App Push Notification"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-semibold mb-1">Notice Message Body:</label>
                    <textarea
                      rows={2}
                      value={broadcastText}
                      onChange={(e) => setBroadcastText(e.target.value)}
                      placeholder="e.g. Orlando East Secondary: School sports day dismissed early at 13:00 due to weather. Scholar transport buses departing at 13:15."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-cyan-600/30 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Emergency Broadcast</span>
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: GATE ATTENDANCE & QUICK SIMULATOR */}
            <div className="space-y-6">
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-5 h-5 text-purple-400" />
                    <h3 className="text-base font-bold text-white">NFC Entrance Gate Taps</h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Gate A & B Active</span>
                </div>

                <p className="text-xs text-slate-400">
                  Simulate live learner wearable tag taps at Gate A. Generates immediate attendance records and queues parent SMS check-in alerts.
                </p>

                <div className="space-y-2">
                  {learners.slice(0, 4).map((l) => (
                    <div key={l.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-white text-xs">{l.fullName}</h5>
                        <span className="text-[10px] text-slate-400 font-mono">{l.gradeClass}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            l.attendanceToday === 'PRESENT_NFC'
                              ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                              : 'bg-amber-950 border-amber-800 text-amber-300'
                          }`}
                        >
                          {l.attendanceToday}
                        </span>
                        <button
                          onClick={() => handleSimulateNfcTap(l.id)}
                          className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-[10px] font-bold"
                        >
                          Tap NFC
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: LEARNER REGISTRY */}
      {activeSubTab === 'learner_registry' && (
        <div className="space-y-6">
          {/* SEARCH & FILTERS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search learner name, ID, or IMEI..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-400">Grade:</span>
              <select
                value={selectedGradeFilter}
                onChange={(e) => setSelectedGradeFilter(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="ALL">All Grades</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
              </select>
            </div>
          </div>

          {/* LEARNERS TABLE */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-4">Learner ID & Name</th>
                    <th className="p-4">Grade</th>
                    <th className="p-4">Wearable IMEI</th>
                    <th className="p-4">Attendance Today</th>
                    <th className="p-4">Safety Status</th>
                    <th className="p-4">Medical Alerts</th>
                    <th className="p-4">Guardian Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredLearners.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-800/40 transition-all">
                      <td className="p-4">
                        <span className="font-bold text-white block">{l.fullName}</span>
                        <span className="text-[10px] text-cyan-400 font-mono">{l.id}</span>
                      </td>
                      <td className="p-4 font-mono">{l.gradeClass}</td>
                      <td className="p-4 font-mono text-slate-400">{l.wearableImei}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                            l.attendanceToday === 'PRESENT_NFC' || l.attendanceToday === 'PRESENT_QR'
                              ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                              : 'bg-amber-950 border-amber-800 text-amber-300'
                          }`}
                        >
                          {l.attendanceToday} ({l.checkInTime})
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                            l.safetyStatus === 'SAFE_IN_CLASS'
                              ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                              : 'bg-rose-950 border-rose-800 text-rose-300'
                          }`}
                        >
                          {l.safetyStatus}
                        </span>
                      </td>
                      <td className="p-4 font-mono">
                        <div className="flex flex-wrap gap-1">
                          {l.medicalAlerts.map((m, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 text-[9px] border border-rose-800">
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-mono text-slate-400">
                        <span className="block font-bold text-slate-200">{l.guardianName}</span>
                        <span className="text-[10px] text-cyan-400">{l.guardianPhone}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: NFC GATE ATTENDANCE */}
      {activeSubTab === 'attendance_nfc' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <QrCode className="w-5 h-5 text-purple-400" />
              <span>NFC / QR Gate Scanner & Live Attendance Monitor</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-xs font-semibold block">Gate A (Main Entrance)</span>
                <span className="text-2xl font-bold text-emerald-400">1,240 Taps</span>
                <span className="text-[10px] text-slate-500 block">Active 06:30 - 08:30 AM</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-xs font-semibold block">Gate B (Scholar Transport)</span>
                <span className="text-2xl font-bold text-cyan-400">562 Taps</span>
                <span className="text-[10px] text-slate-500 block">Bus Arrival Bay</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-xs font-semibold block">Late Arrival Overrides</span>
                <span className="text-2xl font-bold text-amber-400">48 Learners</span>
                <span className="text-[10px] text-slate-500 block">Parent SMS Dispatched</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: GEOFENCE & TRACKING MAP */}
      {activeSubTab === 'tracking_map' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Live School Geofence & Perimeter Map</span>
            </h3>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative overflow-hidden h-80 flex flex-col justify-between">
              <div className="absolute inset-0 bg-slate-950 opacity-90 flex items-center justify-center">
                <div className="relative w-full h-full p-4 flex flex-col justify-center items-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                  {/* SCHOOL GEOFENCE BOX */}
                  <div className="w-64 h-44 rounded-2xl border-2 border-dashed border-cyan-400 bg-cyan-950/20 flex flex-col items-center justify-center p-3 relative shadow-2xl">
                    <span className="bg-cyan-900/90 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-700">
                      Orlando East Secondary School Geofence (Polygon)
                    </span>

                    <div className="mt-4 flex gap-4">
                      <div className="text-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto">
                          <Users className="w-3 h-3 text-emerald-300" />
                        </div>
                        <span className="text-[9px] text-emerald-400 font-mono block mt-1">1,812 Inside</span>
                      </div>

                      <div className="text-center">
                        <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center mx-auto animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-rose-300" />
                        </div>
                        <span className="text-[9px] text-rose-400 font-mono block mt-1">1 Perimeter Alert</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-20 flex justify-between items-start text-[10px] font-mono">
                <span className="bg-slate-900/90 px-3 py-1.5 rounded-lg text-cyan-400 border border-slate-700">
                  Geofence Radius: 450m
                </span>
                <span className="bg-slate-900/90 px-3 py-1.5 rounded-lg text-emerald-400 border border-slate-700">
                  Map Provider: Google Maps Platform API
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: SCHOLAR TRANSPORT */}
      {activeSubTab === 'transport_fleet' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Bus className="w-5 h-5 text-rose-400" />
              <span>Scholar Transport Fleet Operations</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_SAP_BUSES.map((bus) => (
                <div key={bus.busId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-xs">{bus.busId} — {bus.driverName}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold font-mono">
                      {bus.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-mono">{bus.routeCode}</p>

                  <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[9px] block">Onboard</span>
                      <span className="text-cyan-400 font-bold">{bus.learnersOnboard}/{bus.capacity}</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[9px] block">Speed</span>
                      <span className="text-emerald-400 font-bold">{bus.speedKmH} km/h</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[9px] block">Route Match</span>
                      <span className="text-purple-400 font-bold">{bus.routeCompliancePct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: DEVICE INVENTORY */}
      {activeSubTab === 'device_inventory' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Cpu className="w-5 h-5 text-teal-400" />
              <span>ITIS Wearable Device Inventory & Battery Diagnostics</span>
            </h3>

            <div className="space-y-3">
              {SAMPLE_SAP_WEARABLES.map((dev) => (
                <div key={dev.imei} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="font-bold text-white block">IMEI: {dev.imei}</span>
                    <span className="text-slate-400 text-[10px]">{dev.assignedLearner}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-emerald-400 font-bold">Battery: {dev.batteryPct}%</span>
                    <span className="text-cyan-400">Signal: {dev.signalDbm} dBm</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {dev.firmwareVersion}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: SAFETY REPORTS & ANALYTICS */}
      {activeSubTab === 'reports_analytics' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Daily Attendance & Incident Compliance Reports</h3>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => addLog('GENERATING PDF REPORT: Daily_Attendance_Register_Orlando_East.pdf')}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-2 text-cyan-400 font-bold">
                <span>ORLANDO EAST SECONDARY SCHOOL — DAILY SAFETY REPORT</span>
                <span>DATE: {new Date().toLocaleDateString()}</span>
              </div>
              <p className="text-slate-300">
                Official Department of Education daily register summary. All 1,850 enrolled learners audited against NFC gate logs and wearable telemetry heartbeats.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="p-2 bg-slate-900 rounded">
                  <span className="text-slate-500 text-[10px] block">Present Count</span>
                  <span className="text-emerald-400 font-bold">1,802</span>
                </div>
                <div className="p-2 bg-slate-900 rounded">
                  <span className="text-slate-500 text-[10px] block">Late Arrivals</span>
                  <span className="text-amber-400 font-bold">48</span>
                </div>
                <div className="p-2 bg-slate-900 rounded">
                  <span className="text-slate-500 text-[10px] block">Incidents Reported</span>
                  <span className="text-rose-400 font-bold">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: NEXT.JS / NESTJS CODE SPEC */}
      {activeSubTab === 'code_architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-fuchsia-400" />
                <h3 className="text-base font-bold text-white">Next.js 15 & NestJS School Architecture Specs</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {SAP_CODE_SPECS.map((spec) => (
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
        </div>
      )}

      {/* SUB-TAB 9: MANDATORY SAP RULES */}
      {activeSubTab === 'rules_sla' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>10 Mandatory SAP School Administration Portal Rules & SLAs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {CRITICAL_SAP_RULES.map((rule) => (
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
