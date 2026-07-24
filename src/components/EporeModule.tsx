import React, { useState } from 'react';
import {
  Activity,
  ShieldCheck,
  Server,
  Database,
  Cpu,
  Radio,
  Bell,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Zap,
  Lock,
  Layers,
  FileCode,
  HardDrive,
  Terminal,
  Clock,
  ShieldAlert,
  Play,
  Sliders,
  Sparkles,
  CloudLightning,
  Workflow,
  KeyRound,
  ArrowUpRight,
  TrendingUp,
  Download,
  Power
} from 'lucide-react';
import {
  SAMPLE_SERVICES,
  SAMPLE_ALERTS,
  SAMPLE_BACKUPS,
  SAMPLE_FEATURE_FLAGS,
  EPORE_CODE_SPECS,
  CRITICAL_EPORE_RULES,
  ServiceHealth,
  PlatformAlert,
  BackupJob,
  FeatureFlag,
  EporeCodeSpec
} from '../data/eporeData';

export const EporeModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'health' | 'services' | 'alerts' | 'deployments' | 'backups' | 'flags' | 'schema' | 'architecture'
  >('health');

  // Interactive States
  const [services] = useState<ServiceHealth[]>(SAMPLE_SERVICES);
  const [alerts, setAlerts] = useState<PlatformAlert[]>(SAMPLE_ALERTS);
  const [backups, setBackups] = useState<BackupJob[]>(SAMPLE_BACKUPS);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(SAMPLE_FEATURE_FLAGS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<EporeCodeSpec>(EPORE_CODE_SPECS[0]);

  // Operational Simulation States
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, status: 'RESOLVED' } : a)));
    addLog(`ALERT RESOLVED: ${alertId} marked as RESOLVED by DevSecOps Operator.`);
  };

  const handleTriggerSyntheticAlert = () => {
    setIsSimulating(true);
    addLog(`TRIGGERING SYNTHETIC SRE ALERT TEST...`);

    setTimeout(() => {
      const newAlert: PlatformAlert = {
        id: `ALT-${Math.floor(10000 + Math.random() * 90000)}`,
        serviceName: 'APCPE AI Inference Engine',
        severity: 'WARNING',
        title: 'Synthetic Latency Test (>25ms Probe)',
        message: 'Simulated high load on Neural Inference Worker Pool #4.',
        triggeredAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        channelSent: 'PAGERDUTY',
        status: 'ACTIVE',
      };
      setAlerts((prev) => [newAlert, ...prev]);
      setIsSimulating(false);
      addLog(`SYNTHETIC ALERT DISPATCHED TO PAGERDUTY: ${newAlert.id}`);
    }, 1200);
  };

  const handleRunBackup = () => {
    setIsSimulating(true);
    addLog(`INITIATING AUTOMATED POINT-IN-TIME AES-256 BACKUP...`);

    setTimeout(() => {
      const newBackup: BackupJob = {
        id: `BKP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        databaseName: 'PostgreSQL Main Cluster (Manual PITR)',
        type: 'POINT_IN_TIME',
        sizeGb: 485.2,
        status: 'COMPLETED',
        encrypted: true,
        region: 'af-south-1 (Cape Town Primary)',
        completedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      };
      setBackups((prev) => [newBackup, ...prev]);
      setIsSimulating(false);
      addLog(`ENCRYPTED BACKUP COMPLETED: ${newBackup.id} [AES-256-GCM] Saved to af-south-1.`);
    }, 1500);
  };

  const handleToggleFlag = (flagId: string) => {
    setFeatureFlags((prev) =>
      prev.map((f) => {
        if (f.id === flagId) {
          const updated = !f.enabled;
          addLog(`FEATURE FLAG UPDATED: ${f.key} set to ${updated ? 'ENABLED' : 'DISABLED'}`);
          return { ...f, enabled: updated };
        }
        return f;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-900 rounded-2xl border border-cyan-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
              <Server className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>— ENTERPRISE PLATFORM OPERATIONS, OBSERVABILITY & RESILIENCE (EPORE)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Platform Operations, <span className="text-cyan-400">Observability & Resilience</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Guaranteeing 24/7/365 uninterrupted availability, high availability autoscaling, distributed tracing, automated encrypted backups, and Site Reliability Engineering for the national ITIS child protection platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-cyan-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">99.99%</span>
              <span className="text-xs text-slate-400 font-medium">Uptime Target</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">30</span>
              <span className="text-xs text-slate-400 font-medium">Active Replicas</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">AES-256</span>
              <span className="text-xs text-slate-400 font-medium">Encrypted DR</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('health')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'health'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>1. Platform Operations Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSubTab('services')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'services'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4 text-emerald-400" />
            <span>2. Service Dependency Map</span>
          </button>

          <button
            onClick={() => setActiveSubTab('alerts')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'alerts'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>3. Alerting Engine & Console</span>
          </button>

          <button
            onClick={() => setActiveSubTab('deployments')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'deployments'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Workflow className="w-4 h-4 text-purple-400" />
            <span>4. High Availability & Canary Releases</span>
          </button>

          <button
            onClick={() => setActiveSubTab('backups')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'backups'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <HardDrive className="w-4 h-4 text-indigo-400" />
            <span>5. Disaster Recovery & Encrypted Backups</span>
          </button>

          <button
            onClick={() => setActiveSubTab('flags')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'flags'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4 text-teal-400" />
            <span>6. Feature Flags & Config Control</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-blue-400" />
            <span>7. Relational Prisma Schema</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'architecture'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>8. NestJS Services & Controllers</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
              <span>SRE Operational Audit Trail</span>
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

      {/* SUB-TAB 1: PLATFORM OPERATIONS DASHBOARD */}
      {activeSubTab === 'health' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <span className="text-xs text-slate-400 font-semibold block">Global Infrastructure Status</span>
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-xl font-bold">OPERATIONAL</span>
              </div>
              <p className="text-[10px] text-slate-500">All 30 Core Replicas Active</p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <span className="text-xs text-slate-400 font-semibold block">90-Day System Availability</span>
              <div className="flex items-center space-x-2 text-cyan-400">
                <TrendingUp className="w-6 h-6" />
                <span className="text-xl font-bold">99.992%</span>
              </div>
              <p className="text-[10px] text-slate-500">Exceeds 99.99% Target SLA</p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <span className="text-xs text-slate-400 font-semibold block">Live MQTT Ingestion Rate</span>
              <div className="flex items-center space-x-2 text-amber-400">
                <Radio className="w-6 h-6 animate-pulse" />
                <span className="text-xl font-bold">48,250 pings/s</span>
              </div>
              <p className="text-[10px] text-slate-500">Avg Ingestion Latency: 1.2ms</p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <span className="text-xs text-slate-400 font-semibold block">Disaster Recovery Readiness</span>
              <div className="flex items-center space-x-2 text-purple-400">
                <HardDrive className="w-6 h-6" />
                <span className="text-xl font-bold">100% READY</span>
              </div>
              <p className="text-[10px] text-slate-500">Cross-Region Replication Synced</p>
            </div>
          </div>

          {/* LIVE SERVICES SUMMARY */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Server className="w-5 h-5 text-cyan-400" />
              <span>Core Platform Microservices Overview</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((svc) => (
                <div key={svc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{svc.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        svc.status === 'OPERATIONAL'
                          ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                          : 'bg-amber-950 border-amber-800 text-amber-400'
                      }`}
                    >
                      {svc.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-slate-900 p-2 rounded">
                      <span className="text-slate-500 text-[10px] block">Latency</span>
                      <span className="text-cyan-400 font-bold">{svc.latencyMs} ms</span>
                    </div>

                    <div className="bg-slate-900 p-2 rounded">
                      <span className="text-slate-500 text-[10px] block">CPU Util</span>
                      <span className="text-purple-400 font-bold">{svc.cpuUtilPct}%</span>
                    </div>

                    <div className="bg-slate-900 p-2 rounded">
                      <span className="text-slate-500 text-[10px] block">Memory</span>
                      <span className="text-amber-400 font-bold">{svc.memoryUtilPct}%</span>
                    </div>

                    <div className="bg-slate-900 p-2 rounded">
                      <span className="text-slate-500 text-[10px] block">Replicas</span>
                      <span className="text-emerald-400 font-bold">{svc.replicaCount} Units</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SERVICE DEPENDENCY MAP */}
      {activeSubTab === 'services' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Server className="w-5 h-5 text-emerald-400" />
              <span>Service Dependency Topography & Resource Profiling</span>
            </h3>

            <div className="space-y-3">
              {services.map((svc) => (
                <div key={svc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{svc.name}</h4>
                      <p className="text-xs text-slate-400">ID: {svc.id} • Category: {svc.category}</p>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Uptime: {svc.uptime90dPct}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Avg Response Latency</span>
                      <span className="text-cyan-400 font-bold">{svc.latencyMs} ms</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">CPU Load</span>
                      <span className="text-purple-400 font-bold">{svc.cpuUtilPct}%</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">RAM Load</span>
                      <span className="text-amber-400 font-bold">{svc.memoryUtilPct}%</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-500 text-[10px] block">Autoscaled Replicas</span>
                      <span className="text-emerald-400 font-bold">{svc.replicaCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ALERTING ENGINE & CONSOLE */}
      {activeSubTab === 'alerts' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-amber-400" />
                  <span>SRE Distributed Alert Console</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time notification triggers dispatches across PagerDuty, Slack, SMS, and Email channels.
                </p>
              </div>

              <button
                onClick={handleTriggerSyntheticAlert}
                disabled={isSimulating}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isSimulating ? 'Simulating...' : 'Trigger Synthetic Alert Test'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {alerts.map((alt) => (
                <div key={alt.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          alt.severity === 'CRITICAL'
                            ? 'bg-rose-950 border-rose-800 text-rose-400'
                            : alt.severity === 'WARNING'
                            ? 'bg-amber-950 border-amber-800 text-amber-400'
                            : 'bg-blue-950 border-blue-800 text-blue-400'
                        }`}
                      >
                        {alt.severity}
                      </span>
                      <h4 className="text-xs font-bold text-white">{alt.title}</h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                        Channel: {alt.channelSent}
                      </span>
                      {alt.status === 'ACTIVE' ? (
                        <button
                          onClick={() => handleResolveAlert(alt.id)}
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[10px] font-bold"
                        >
                          Resolve Alert
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          RESOLVED
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">{alt.message}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>Service: {alt.serviceName}</span>
                    <span>Triggered: {alt.triggeredAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: HIGH AVAILABILITY & CANARY RELEASES */}
      {activeSubTab === 'deployments' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Workflow className="w-5 h-5 text-purple-400" />
              <span>High Availability & Blue-Green Canary Deployment Pipeline</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold block">Active Cluster (Blue Release v4.8.2)</span>
                <p className="text-slate-300">Handling 100% of production MQTT ingestion and C3 Command Centre requests.</p>
                <div className="p-2 bg-slate-900 rounded text-[10px] text-emerald-400 font-bold">
                  Health Probe: 100% Passed (30 Replicas)
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold block">Staging Cluster (Green Release v4.9.0-rc1)</span>
                <p className="text-slate-300">Undergoing automated integration testing and synthetic load generation.</p>
                <div className="p-2 bg-slate-900 rounded text-[10px] text-cyan-400 font-bold">
                  Canary Status: Ready for 5% Traffic Shift
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: DISASTER RECOVERY & ENCRYPTED BACKUPS */}
      {activeSubTab === 'backups' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <HardDrive className="w-5 h-5 text-indigo-400" />
                  <span>Automated Disaster Recovery & Encrypted Snapshots</span>
                </h3>
                <p className="text-xs text-slate-400">
                  AES-256-GCM encrypted point-in-time recovery (PITR) with cross-region cloud replication.
                </p>
              </div>

              <button
                onClick={handleRunBackup}
                disabled={isSimulating}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>{isSimulating ? 'Executing...' : 'Trigger Manual PITR Backup'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {backups.map((bkp) => (
                <div key={bkp.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-indigo-400">{bkp.databaseName}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                      {bkp.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Backup Type</span>
                      <span className="text-slate-200 font-bold">{bkp.type}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Snapshot Size</span>
                      <span className="text-cyan-400 font-bold">{bkp.sizeGb} GB</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Encryption</span>
                      <span className="text-purple-400 font-bold">AES-256-GCM</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Region Replica</span>
                      <span className="text-teal-400 font-bold">{bkp.region}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: FEATURE FLAGS & CONFIG CONTROL */}
      {activeSubTab === 'flags' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sliders className="w-5 h-5 text-teal-400" />
              <span>Feature Flags & Dynamic Configuration Toggles</span>
            </h3>

            <div className="space-y-3">
              {featureFlags.map((ff) => (
                <div key={ff.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="text-xs font-bold text-white">{ff.name}</h4>
                      <p className="text-[10px] font-mono text-teal-400">{ff.key}</p>
                    </div>

                    <button
                      onClick={() => handleToggleFlag(ff.id)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                        ff.enabled
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{ff.enabled ? 'ENABLED' : 'DISABLED'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-400">{ff.description}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>Rollout: {ff.rolloutPercentage}% Traffic</span>
                    <span>Updated By: {ff.updatedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: RELATIONAL PRISMA SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Prisma Relational Database Schema for EPORE</h3>
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold">
                Relational Model
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {EPORE_CODE_SPECS[0].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: NESTJS SERVICES & CONTROLLERS */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">NestJS Platform Operations & SRE Services</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {EPORE_CODE_SPECS.map((spec) => (
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
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_EPORE_RULES.map((rule) => (
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
    </div>
  );
};
