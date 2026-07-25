import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  Ticket,
  Clock,
  AlertTriangle,
  Calendar,
  BookOpen,
  Terminal,
  Activity,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  RefreshCw,
  ShieldCheck,
  Cpu,
  Wrench,
  Layers,
  Filter,
  Send,
  FileText,
  BarChart3,
  User,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  SupportTicket,
  MaintenanceWindow,
  OperationalIncident,
  KnowledgeArticle,
  DiagnosticProbeResult,
  SupportAnalyticsMetrics,
  TicketPriority,
  TicketStatus,
  TicketCategory
} from '../backend/operations/operations.types';

export const OperationsSupportCentreModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'ANALYTICS' | 'TICKETS' | 'SLA_ENGINE' | 'MAINTENANCE' | 'INCIDENTS' | 'KNOWLEDGE_BASE' | 'DIAGNOSTICS'
  >('ANALYTICS');

  // State Management
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [maintenanceWindows, setMaintenanceWindows] = useState<MaintenanceWindow[]>([]);
  const [incidents, setIncidents] = useState<OperationalIncident[]>([]);
  const [kbArticles, setKbArticles] = useState<KnowledgeArticle[]>([]);
  const [analytics, setAnalytics] = useState<SupportAnalyticsMetrics | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modals & Active Selections
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState<boolean>(false);
  const [showNewMWModal, setShowNewMWModal] = useState<boolean>(false);
  const [showNewIncidentModal, setShowNewIncidentModal] = useState<boolean>(false);

  // New Ticket Form State
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    category: 'TELEMATICS_DEVICE_FAILURE' as TicketCategory,
    priority: 'P2_HIGH' as TicketPriority,
    submitterName: 'Sipho Zulu (Tshwane Depot)',
    submitterEmail: 's.zulu@tshwanebus.co.za'
  });

  // Diagnostics Probe Form State
  const [probeTarget, setProbeTarget] = useState<string>('TELEMATICS_GATEWAY');
  const [probeType, setProbeType] = useState<string>('LATENCY_PING');
  const [probeRef, setProbeRef] = useState<string>('JHB-BUS-8819');
  const [probeRunning, setProbeRunning] = useState<boolean>(false);
  const [probeResult, setProbeResult] = useState<DiagnosticProbeResult | null>(null);

  // Load Data from Backend APIs
  const fetchOperationsData = async () => {
    setLoading(true);
    try {
      const [resT, resM, resI, resK, resA] = await Promise.all([
        fetch('/api/v1/operations/tickets').then((r) => r.json()),
        fetch('/api/v1/operations/maintenance-windows').then((r) => r.json()),
        fetch('/api/v1/operations/incidents').then((r) => r.json()),
        fetch('/api/v1/operations/kb').then((r) => r.json()),
        fetch('/api/v1/operations/analytics').then((r) => r.json())
      ]);

      if (resT.success) setTickets(resT.tickets);
      if (resM.success) setMaintenanceWindows(resM.maintenanceWindows);
      if (resI.success) setIncidents(resI.incidents);
      if (resK.success) setKbArticles(resK.articles);
      if (resA.success) setAnalytics(resA.metrics);
    } catch (err) {
      console.error('Failed to load Operations data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperationsData();
  }, []);

  // Handle Create Ticket
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/operations/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket)
      });
      const data = await res.json();
      if (data.success) {
        setShowNewTicketModal(false);
        setNewTicket({
          subject: '',
          description: '',
          category: 'TELEMATICS_DEVICE_FAILURE',
          priority: 'P2_HIGH',
          submitterName: 'Sipho Zulu (Tshwane Depot)',
          submitterEmail: 's.zulu@tshwanebus.co.za'
        });
        fetchOperationsData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Execute Remote Diagnostic Probe
  const handleRunProbe = async () => {
    setProbeRunning(true);
    setProbeResult(null);
    try {
      const res = await fetch('/api/v1/operations/diagnostics/probe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetSystem: probeTarget,
          deviceIdOrReference: probeRef,
          diagnosticType: probeType
        })
      });
      const data = await res.json();
      if (data.success) {
        setProbeResult(data.result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProbeRunning(false);
    }
  };

  // Priority Badge Helper
  const renderPriorityBadge = (p: TicketPriority) => {
    switch (p) {
      case 'P1_CRITICAL':
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">P1 CRITICAL (1h SLA)</span>;
      case 'P2_HIGH':
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">P2 HIGH (4h SLA)</span>;
      case 'P3_MEDIUM':
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">P3 MEDIUM (24h SLA)</span>;
      case 'P4_LOW':
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">P4 LOW (72h SLA)</span>;
    }
  };

  // Status Badge Helper
  const renderStatusBadge = (s: TicketStatus) => {
    switch (s) {
      case 'NEW':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">NEW</span>;
      case 'ASSIGNED':
      case 'IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">IN PROGRESS</span>;
      case 'RESOLVED':
      case 'CLOSED':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-600/30 text-slate-400 border border-slate-600/40">RESOLVED</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300">{s}</span>;
    }
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen p-4 md:p-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg text-white shadow-lg shadow-indigo-500/20">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                ITIS Operations, Monitoring & Support Centre
                <span className="text-xs px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono">
                  SLA Target 99.5%
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Help Desk Ticket Management • SLA Engine • Maintenance Windows • Major Incidents • Remote Diagnostics
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowNewTicketModal(true)}
            className="flex items-center space-x-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-xs transition shadow-md shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Create Support Ticket</span>
          </button>
          <button
            onClick={fetchOperationsData}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition"
            title="Refresh Operations Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Primary Module Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-2">
        {[
          { id: 'ANALYTICS', label: 'Support Analytics', icon: BarChart3 },
          { id: 'TICKETS', label: 'Ticket Management', icon: Ticket, badge: analytics?.openTicketsCount },
          { id: 'SLA_ENGINE', label: 'SLA Engine', icon: Clock },
          { id: 'MAINTENANCE', label: 'Maintenance Windows', icon: Calendar, badge: analytics?.activeMaintenanceWindowsCount },
          { id: 'INCIDENTS', label: 'Incident Management', icon: AlertTriangle, badge: analytics?.openIncidentsCount },
          { id: 'KNOWLEDGE_BASE', label: 'Knowledge Base & Manuals', icon: BookOpen },
          { id: 'DIAGNOSTICS', label: 'Remote Diagnostics', icon: Terminal }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 rounded-full font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SUPPORT ANALYTICS */}
      {activeTab === 'ANALYTICS' && (
        <div className="space-y-6">
          {/* Key KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Tickets</span>
                <Ticket className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">{analytics?.totalTicketsCount || 0}</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{analytics?.resolvedTodayCount || 0} Resolved Today</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>SLA Compliance Rate</span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                {analytics?.slaCompliancePercentage || 98.4}%
              </div>
              <div className="text-[11px] text-slate-400">Target SLA threshold: &gt; 95.0%</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active Incidents</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-amber-400 font-mono">{analytics?.openIncidentsCount || 0}</div>
              <div className="text-[11px] text-slate-400">SEV-1 / SEV-2 Response Active</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Avg Resolution Time</span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                {analytics?.averageResolutionTimeHours || 1.8} hrs
              </div>
              <div className="text-[11px] text-emerald-400">Down 22% vs previous week</div>
            </div>
          </div>

          {/* SLA & Category Distribution Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Support Ticket Category Breakdown
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Telematics Hardware & OBD', pct: 45, color: 'bg-indigo-500' },
                  { label: 'Driver App & RFID Tap', pct: 25, color: 'bg-cyan-500' },
                  { label: 'SAPS Emergency Alert CAD', pct: 15, color: 'bg-amber-500' },
                  { label: 'Parent Portal Access', pct: 10, color: 'bg-purple-500' },
                  { label: 'EMIS Student Data Sync', pct: 5, color: 'bg-emerald-500' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>{item.label}</span>
                      <span className="font-mono text-slate-400">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                SLA Tier Targets & Guardrails
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-950/60 border border-red-500/20 rounded-lg flex justify-between items-center">
                  <div>
                    <span className="font-bold text-red-400">P1 CRITICAL (Emergency / SAPS Link)</span>
                    <p className="text-slate-400 text-[11px]">SLA Target: 60 Minutes • Auto Escalation: 15 Mins</p>
                  </div>
                  <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded font-mono font-bold">100% SLA</span>
                </div>

                <div className="p-3 bg-slate-950/60 border border-amber-500/20 rounded-lg flex justify-between items-center">
                  <div>
                    <span className="font-bold text-amber-400">P2 HIGH (Telematics Dongle / GPS Loss)</span>
                    <p className="text-slate-400 text-[11px]">SLA Target: 4 Hours • Auto Escalation: 1 Hour</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded font-mono font-bold">97.8% SLA</span>
                </div>

                <div className="p-3 bg-slate-950/60 border border-blue-500/20 rounded-lg flex justify-between items-center">
                  <div>
                    <span className="font-bold text-blue-400">P3 MEDIUM (Account & Login Inquiries)</span>
                    <p className="text-slate-400 text-[11px]">SLA Target: 24 Hours • Auto Escalation: 6 Hours</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded font-mono font-bold">99.1% SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TICKET MANAGEMENT */}
      {activeTab === 'TICKETS' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400 ml-2" />
              <input
                type="text"
                placeholder="Search ticket number, subject, submitter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full sm:w-64"
              />
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 text-slate-300 border border-slate-800 rounded px-2.5 py-1.5 text-xs focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Ticket #</th>
                    <th className="px-4 py-3">Subject & Category</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Submitter</th>
                    <th className="px-4 py-3">Assigned Team</th>
                    <th className="px-4 py-3">SLA Timer</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {tickets
                    .filter((t) => {
                      if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
                      if (
                        searchQuery &&
                        !t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
                        !t.subject.toLowerCase().includes(searchQuery.toLowerCase())
                      ) {
                        return false;
                      }
                      return true;
                    })
                    .map((ticket) => (
                      <tr key={ticket.ticketId} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3.5 font-mono font-bold text-indigo-400">{ticket.ticketNumber}</td>
                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-white max-w-xs truncate">{ticket.subject}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{ticket.category}</div>
                        </td>
                        <td className="px-4 py-3.5">{renderPriorityBadge(ticket.priority)}</td>
                        <td className="px-4 py-3.5">{renderStatusBadge(ticket.status)}</td>
                        <td className="px-4 py-3.5">
                          <div className="text-slate-200">{ticket.submitterName}</div>
                          <div className="text-[10px] text-slate-400">{ticket.submitterEmail}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                            {ticket.assignedTeam}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-emerald-400">
                          {ticket.slaMinutesRemaining}m left
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => setSelectedTicket(ticket)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-xs font-medium transition"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SLA ENGINE */}
      {activeTab === 'SLA_ENGINE' && (
        <div className="space-y-6">
          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Automated SLA Target Matrix & Escalation Rules
            </h3>
            <p className="text-xs text-slate-400">
              ITIS SLA Engine computes resolution deadlines dynamically upon ticket creation and monitors countdown timers against breach thresholds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                { prio: 'P1 CRITICAL', sla: '60 Minutes', target: 'SAPS CAD, Panic Alerts, Rollover Accidents', bg: 'border-red-500/30' },
                { prio: 'P2 HIGH', sla: '4 Hours', target: 'Telematics Loss, Driver RFID Malfunction', bg: 'border-amber-500/30' },
                { prio: 'P3 MEDIUM', sla: '24 Hours', target: 'Parent Portal Login, Route Query', bg: 'border-blue-500/30' },
                { prio: 'P4 LOW', sla: '72 Hours', target: 'Feature Request, Non-Urgent Query', bg: 'border-slate-500/30' }
              ].map((item, idx) => (
                <div key={idx} className={`p-4 bg-slate-950 border ${item.bg} rounded-xl space-y-2`}>
                  <div className="text-xs font-bold text-white">{item.prio}</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">{item.sla}</div>
                  <div className="text-[11px] text-slate-400">{item.target}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MAINTENANCE WINDOWS */}
      {activeTab === 'MAINTENANCE' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-white">Scheduled Maintenance Windows</h3>
            <button
              onClick={() => setShowNewMWModal(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Window</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maintenanceWindows.map((mw) => (
              <div key={mw.windowId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-bold text-indigo-400 font-mono">{mw.windowId}</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{mw.title}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {mw.status}
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-500">Scope:</span> {mw.systemScope}
                </div>

                <div className="p-2.5 bg-slate-950 rounded-lg text-xs space-y-1 font-mono text-slate-400">
                  <div>Start: {new Date(mw.scheduledStart).toLocaleString()}</div>
                  <div>End: {new Date(mw.scheduledEnd).toLocaleString()}</div>
                </div>

                <div className="text-[11px] text-slate-400">Approved by: {mw.approvedBy}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INCIDENT MANAGEMENT */}
      {activeTab === 'INCIDENTS' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-white">Major Operational Incidents</h3>
            <button
              onClick={() => setShowNewIncidentModal(true)}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-medium flex items-center space-x-1"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Declare Major Incident</span>
            </button>
          </div>

          <div className="space-y-4">
            {incidents.map((inc) => (
              <div key={inc.incidentId} className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs font-bold font-mono">
                      {inc.severity}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{inc.title}</h4>
                      <div className="text-xs text-slate-400 font-mono">{inc.incidentNumber} • Region: {inc.affectedRegion}</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Status: {inc.status}
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-slate-400">Impact Summary:</span> {inc.impactSummary}
                </div>

                {inc.rootCauseAnalysis && (
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-amber-400">Root Cause Analysis (RCA)</div>
                    <div className="text-slate-300">{inc.rootCauseAnalysis}</div>
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Timeline Updates</div>
                  {inc.updates.map((up) => (
                    <div key={up.updateId} className="p-2.5 bg-slate-950/60 rounded border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Posted by: {up.postedBy}</span>
                        <span>{new Date(up.postedAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-slate-300">{up.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: KNOWLEDGE BASE */}
      {activeTab === 'KNOWLEDGE_BASE' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Operational Knowledge Base & Manuals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kbArticles.map((kb) => (
                <div key={kb.articleId} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-mono font-bold">
                      {kb.articleCode}
                    </span>
                    <span className="text-[11px] text-slate-500">{kb.viewCount} views</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{kb.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{kb.summary}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {kb.tags.map((tag, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: REMOTE DIAGNOSTICS */}
      {activeTab === 'DIAGNOSTICS' && (
        <div className="space-y-6">
          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Platform Remote Diagnostics & Telemetry Probe Console
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Target System / Component</label>
                <select
                  value={probeTarget}
                  onChange={(e) => setProbeTarget(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="TELEMATICS_GATEWAY">Telematics IoT Gateway</option>
                  <option value="SAPS_CAD_ADAPTER">SAPS 10111 CAD Adapter</option>
                  <option value="EMIS_DB">Gauteng EMIS PostgreSQL DB</option>
                  <option value="VEHICLE_OBD_DONGLE">Vehicle OBD Dongle</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Diagnostic Probe Type</label>
                <select
                  value={probeType}
                  onChange={(e) => setProbeType(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="LATENCY_PING">Latency & Ping Pulse</option>
                  <option value="TELEMETRY_TRACE">Telemetry Trace Packet Audit</option>
                  <option value="MEMORY_HEAP_DUMP">Node Heap Memory Check</option>
                  <option value="REMOTE_RESET">Soft-Reset Remote Reboot</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Target Reference / Bus IMEI</label>
                <input
                  type="text"
                  value={probeRef}
                  onChange={(e) => setProbeRef(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleRunProbe}
              disabled={probeRunning}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg text-xs flex items-center space-x-2 transition disabled:opacity-50"
            >
              <Cpu className={`w-4 h-4 ${probeRunning ? 'animate-spin' : ''}`} />
              <span>{probeRunning ? 'Running Remote Diagnostic...' : 'Execute Remote Diagnostic Probe'}</span>
            </button>

            {probeResult && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
                  <span>Probe ID: {probeResult.probeId}</span>
                  <span className="text-emerald-400 font-bold">STATUS: {probeResult.status}</span>
                </div>
                <div className="text-slate-300 whitespace-pre-wrap">{probeResult.diagnosticsOutput}</div>
                <div className="text-slate-400">Latency: {probeResult.latencyMs}ms • Packet Loss: {probeResult.packetLossPercentage}%</div>
                <div className="p-2 bg-slate-900 rounded text-cyan-300">
                  Recommended Action: {probeResult.recommendedAction}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INSPECT TICKET DETAIL MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold">{selectedTicket.ticketNumber}</span>
                <h3 className="text-base font-bold text-white">{selectedTicket.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
              {selectedTicket.description}
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Submitter:</span> {selectedTicket.submitterName}
              </div>
              <div>
                <span className="text-slate-500">Email:</span> {selectedTicket.submitterEmail}
              </div>
              <div>
                <span className="text-slate-500">Assigned Team:</span> {selectedTicket.assignedTeam}
              </div>
              <div>
                <span className="text-slate-500">SLA Target:</span> {selectedTicket.slaTargetMinutes} mins
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-300">Ticket Activity & Agent Comments</h4>
              {selectedTicket.comments.map((cmt) => (
                <div key={cmt.commentId} className="p-3 bg-slate-950 rounded-lg text-xs space-y-1 border border-slate-800">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span className="font-bold text-indigo-300">{cmt.authorName} ({cmt.authorRole})</span>
                    <span>{new Date(cmt.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-slate-200">{cmt.content}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW SUPPORT TICKET MODAL */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-indigo-400" />
                Submit Operations Support Ticket
              </h3>
              <button onClick={() => setShowNewTicketModal(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Subject / Issue Summary</label>
                <input
                  type="text"
                  required
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="e.g. Telematics OBD signal drop on JHB Route 12"
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as any })}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                  >
                    <option value="TELEMATICS_DEVICE_FAILURE">Telematics Device Failure</option>
                    <option value="DRIVER_APP_ISSUE">Driver App Issue</option>
                    <option value="SAPS_DISPATCH_ALERT">SAPS Emergency Dispatch</option>
                    <option value="PARENT_PORTAL_ACCESS">Parent Portal Access</option>
                    <option value="EMIS_STUDENT_SYNC">EMIS Data Sync</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Priority (SLA Target)</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                  >
                    <option value="P1_CRITICAL">P1 CRITICAL (1h SLA)</option>
                    <option value="P2_HIGH">P2 HIGH (4h SLA)</option>
                    <option value="P3_MEDIUM">P3 MEDIUM (24h SLA)</option>
                    <option value="P4_LOW">P4 LOW (72h SLA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Provide detailed technical background, vehicle registration, or error messages..."
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
