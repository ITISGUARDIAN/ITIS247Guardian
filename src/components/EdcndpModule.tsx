import React, { useState } from 'react';
import {
  Cloud,
  Server,
  Cpu,
  Database,
  Activity,
  Terminal,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Zap,
  Globe,
  Layers,
  HardDrive,
  BarChart3,
  RefreshCw,
  GitBranch,
  Lock,
  ArrowUpRight,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';
import {
  SAMPLE_CLUSTER_NODES,
  SAMPLE_DEPLOYMENT_PIPELINES,
  SAMPLE_DB_CLUSTERS,
  EDCNDP_CODE_SPECS,
  CRITICAL_EDCNDP_RULES,
  ClusterNodeStatus,
  DeploymentPipeline,
  DatabaseClusterHealth,
  EdcndpCodeSpec
} from '../data/edcndpData';

export const EdcndpModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'cloud_k8s' | 'pipelines' | 'db_infra' | 'messaging' | 'dr_failover' | 'monitoring' | 'code_specs' | 'rules_sla'
  >('cloud_k8s');

  // Nodes state
  const [nodes, setNodes] = useState<ClusterNodeStatus[]>(SAMPLE_CLUSTER_NODES);

  // Pipelines state
  const [pipelines, setPipelines] = useState<DeploymentPipeline[]>(SAMPLE_DEPLOYMENT_PIPELINES);

  // DB Clusters state
  const [dbClusters, setDbClusters] = useState<DatabaseClusterHealth[]>(SAMPLE_DB_CLUSTERS);

  // Code Spec state
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<EdcndpCodeSpec>(EDCNDP_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Simulate Scale Up Node Pool
  const handleScaleUpCluster = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.nodeId === nodeId
          ? { ...n, podCount: n.podCount + 10, cpuUsagePct: Math.max(15, n.cpuUsagePct - 12), status: 'SCALING' }
          : n
      )
    );
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => (n.nodeId === nodeId ? { ...n, status: 'HEALTHY' } : n))
      );
    }, 1500);
    addLog(`K8S HPA EVENT: Autoscaled node pool ${nodeId}. Provisioned +10 pods for burst telemetry.`);
  };

  // Trigger Blue/Green Release Pipeline
  const handleTriggerRelease = (pipelineId: string) => {
    setPipelines((prev) =>
      prev.map((p) =>
        p.pipelineId === pipelineId
          ? { ...p, status: 'IN_PROGRESS', deployedAt: 'Deploying now...' }
          : p
      )
    );
    addLog(`DEVSECOPS DEPLOYMENT: Blue/Green release triggered for ${pipelineId}. Trivy SAST passed, Cosign signed.`);
    setTimeout(() => {
      setPipelines((prev) =>
        prev.map((p) =>
          p.pipelineId === pipelineId
            ? { ...p, status: 'SUCCESS', deployedAt: 'Just now' }
            : p
        )
      );
      addLog(`DEPLOYMENT SUCCESS: Traffic shifted to GREEN environment for ${pipelineId}. Health checks 100% OK.`);
    }, 2000);
  };

  // Simulate DR Failover
  const handleTriggerDrFailover = () => {
    setDbClusters((prev) =>
      prev.map((db) => {
        if (db.role === 'PRIMARY') return { ...db, role: 'READ_REPLICA' };
        if (db.role === 'CROSS_REGION_DR') return { ...db, role: 'PRIMARY', lagMs: 0 };
        return db;
      })
    );
    addLog(`DISASTER RECOVERY FAILOVER: Promoted Cape Town (CPT) standby cluster to PRIMARY. RPO = 0.8s, RTO = 12s.`);
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-900 rounded-2xl border border-cyan-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
              <Cloud className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>— ENTERPRISE DEVSECOPS & CLOUD DEPLOYMENT PLATFORM (EDCNDP)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise DevSecOps & <span className="text-cyan-400">National Deployment</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Production-grade cloud-native infrastructure powering 10M+ protected learners, 500k+ concurrent mobile connections, multi-region Kubernetes clusters (JHB/CPT), zero-downtime blue/green pipelines, and active-passive disaster recovery with RPO ≤ 1m and RTO ≤ 15m.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-cyan-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">99.99%</span>
              <span className="text-xs text-slate-400 font-medium">Uptime SLA</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">&lt; 10ms</span>
              <span className="text-xs text-slate-400 font-medium">Telemetry Ingest</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">1M+ /m</span>
              <span className="text-xs text-slate-400 font-medium">Event Scale</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('cloud_k8s')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'cloud_k8s'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4 text-cyan-400" />
            <span>1. Kubernetes Multi-Region Topology</span>
          </button>

          <button
            onClick={() => setActiveSubTab('pipelines')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'pipelines'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <GitBranch className="w-4 h-4 text-purple-400" />
            <span>2. CI/CD DevSecOps Pipelines</span>
          </button>

          <button
            onClick={() => setActiveSubTab('db_infra')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'db_infra'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>3. PostgreSQL HA + TimescaleDB</span>
          </button>

          <button
            onClick={() => setActiveSubTab('messaging')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'messaging'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-amber-400" />
            <span>4. Kafka & MQTT Event Messaging</span>
          </button>

          <button
            onClick={() => setActiveSubTab('dr_failover')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'dr_failover'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-rose-400" />
            <span>5. Disaster Recovery Failover</span>
          </button>

          <button
            onClick={() => setActiveSubTab('monitoring')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'monitoring'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-teal-400" />
            <span>6. Prometheus & Grafana Observability</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-fuchsia-400" />
            <span>7. Terraform & Helm Code Specs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rules_sla')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'rules_sla'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-teal-400" />
            <span>8. Mandatory DevSecOps Rules</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
              <span>EDCNDP Infrastructure & DevSecOps Log Stream</span>
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

      {/* SUB-TAB 1: KUBERNETES MULTI-REGION TOPOLOGY */}
      {activeSubTab === 'cloud_k8s' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Server className="w-5 h-5 text-cyan-400" />
                <span>Multi-Region Kubernetes (GKE/EKS) Cluster Topology</span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nodes.map((node) => (
              <div key={node.nodeId} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold text-xs truncate max-w-[180px]">{node.nodeId}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    node.status === 'HEALTHY' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {node.status}
                  </span>
                </div>

                <div className="space-y-1 text-slate-300">
                  <p>Zone: <strong className="text-white">{node.zone}</strong></p>
                  <p>Pods Active: <strong className="text-cyan-400">{node.podCount} pods</strong></p>
                  <p>CPU Utilization: <strong className="text-emerald-400">{node.cpuUsagePct}%</strong></p>
                  <p>Memory Usage: <strong className="text-purple-400">{node.memoryUsagePct}%</strong></p>
                </div>

                <button
                  onClick={() => handleScaleUpCluster(node.nodeId)}
                  className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>TRIGGER HPA AUTOSCALE</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CI/CD PIPELINES */}
      {activeSubTab === 'pipelines' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <GitBranch className="w-5 h-5 text-purple-400" />
                <span>DevSecOps Blue/Green & Canary Release Pipelines</span>
              </h3>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {pipelines.map((pipe) => (
              <div key={pipe.pipelineId} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400 font-bold text-sm">{pipe.pipelineId}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold text-[10px]">
                      {pipe.strategy}
                    </span>
                  </div>
                  <p className="text-white font-bold">{pipe.serviceName}</p>
                  <p className="text-slate-400 text-[11px]">Env: {pipe.environment} • Cosign Signed: {pipe.cosignSigned ? '✓ YES' : '✗ NO'} • Deployed: {pipe.deployedAt}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    pipe.status === 'SUCCESS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {pipe.status}
                  </span>

                  <button
                    onClick={() => handleTriggerRelease(pipe.pipelineId)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-all"
                  >
                    DEPLOY BLUE/GREEN
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: DATABASE INFRASTRUCTURE */}
      {activeSubTab === 'db_infra' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>PostgreSQL HA + PostGIS + TimescaleDB Replica Clusters</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {dbClusters.map((db) => (
              <div key={db.clusterName} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="truncate max-w-[180px]">{db.clusterName}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-white text-[10px]">
                    {db.role}
                  </span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <p>Replication Lag: <strong className="text-emerald-400">{db.lagMs} ms</strong></p>
                  <p>Active Conns: <strong className="text-cyan-400">{db.activeConnections}</strong></p>
                  <p>PITR RPO Status: <strong className="text-purple-400">{db.pitrBackupStatus}</strong></p>
                  <p>Storage Allocated: <strong className="text-white">{db.storageUsedGbp} GB</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MESSAGING INFRASTRUCTURE */}
      {activeSubTab === 'messaging' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Activity className="w-5 h-5 text-amber-400" />
            <span>Kafka, MQTT Cluster & Redis Streams Telemetry Queue</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Kafka GPS Telemetry Stream</span>
              <p className="text-slate-300">Partitioned by Learner Device UUID. Ingests 1M+ location ping packets per minute with zero data loss.</p>
              <span className="text-emerald-400 font-bold block">THROUGHPUT: 18,400 msg/sec</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">EMQX MQTT IoT Gateway</span>
              <p className="text-slate-300">Supports 100,000+ simultaneous persistent device sockets with TLS 1.3 mTLS security.</p>
              <span className="text-emerald-400 font-bold block">CONNECTED DEVICES: 98,420</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: DISASTER RECOVERY FAILOVER */}
      {activeSubTab === 'dr_failover' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-rose-400" />
                <span>Multi-Region Active-Passive Disaster Recovery Orchestrator</span>
              </h3>
            </div>

            <button
              onClick={handleTriggerDrFailover}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-rose-600/30 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>TEST AUTOMATED DR FAILOVER</span>
            </button>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
            <span className="text-rose-400 font-bold block">SLO RECOVERY TARGETS:</span>
            <p className="text-slate-300">
              Recovery Point Objective (RPO) ≤ 1 minute • Recovery Time Objective (RTO) ≤ 15 minutes.
              Continuous streaming replication mirrors database state from Johannesburg (JHB) to Cape Town (CPT).
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: MONITORING */}
      {activeSubTab === 'monitoring' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <BarChart3 className="w-5 h-5 text-teal-400" />
            <span>Prometheus & Grafana OpenTelemetry Golden Signal Dashboards</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">HTTP Request Latency (p99):</span>
              <strong className="text-emerald-400 text-lg">24 ms</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Telemetry Packet Ingestion:</span>
              <strong className="text-cyan-400 text-lg">8.2 ms</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">HTTP 5xx Error Rate:</span>
              <strong className="text-emerald-400 text-lg">0.001%</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Error Budget Remaining:</span>
              <strong className="text-purple-400 text-lg">99.8%</strong>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-fuchsia-400" />
              <h3 className="text-base font-bold text-white">Terraform & Helm Production Infrastructure Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {EDCNDP_CODE_SPECS.map((spec) => (
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
      )}

      {/* SUB-TAB 8: MANDATORY RULES */}
      {activeSubTab === 'rules_sla' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-teal-400" />
            <span>Enterprise Directives & Compliance Standards</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {CRITICAL_EDCNDP_RULES.map((rule) => (
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
