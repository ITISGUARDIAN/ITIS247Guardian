import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileText,
  FileCode,
  Terminal,
  Cpu,
  Server,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2,
  Lock,
  GitBranch,
  Copy,
  Box,
  Share2,
  Workflow,
  Sparkles,
  Settings,
  Flame,
  Radio,
  Globe,
  Download,
  Code2
} from 'lucide-react';
import {
  WORKSPACE_TREE,
  INFRA_SERVICES,
  SHARED_PACKAGES,
  CRITICAL_WORKSPACE_RULES,
  WorkspaceFileNode,
  InfraServiceSpec,
  SharedPackageSpec
} from '../data/workspaceData';

export const WorkspaceModule: React.FC = () => {
  // Navigation Sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'tree_explorer' | 'infra_topology' | 'shared_packages' | 'standards_workflows'
  >('tree_explorer');

  // File Tree Selection State
  const [selectedFile, setSelectedFile] = useState<WorkspaceFileNode>(
    WORKSPACE_TREE.children![0].children![0] // backend/package.json
  );
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true,
    backend: true,
    website: true,
    'parent-app': true,
    'school-portal': true,
    'command-centre': true,
    shared: true,
    infrastructure: true,
    docs: true,
  });

  // Selected Shared Package State
  const [selectedPackage, setSelectedPackage] = useState<SharedPackageSpec>(SHARED_PACKAGES[0]);

  // Operational Audit Logs
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] WORKSPACE INITIALIZER: Loaded root directory 'itis/'.`,
    `[${new Date().toLocaleTimeString()}] DOCKER COMPOSE: Verified 5 core services (PostgreSQL, Redis, Kafka, MQTT, NGINX).`,
    `[${new Date().toLocaleTimeString()}] SHARED PACKAGES: Mounted @itis/shared-types, @itis/shared-auth, @itis/shared-ui, @itis/shared-api-client.`,
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const handleSelectFile = (node: WorkspaceFileNode) => {
    if (node.type === 'file') {
      setSelectedFile(node);
      addLog(`FILE INSPECTOR: Opened '${node.path}'.`);
    } else {
      toggleFolder(node.id);
    }
  };

  // Render recursive file tree
  const renderTree = (node: WorkspaceFileNode) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.id];
    const isSelected = selectedFile?.id === node.id;

    return (
      <div key={node.id} className="ml-3 select-none text-xs font-mono">
        <div
          onClick={() => handleSelectFile(node)}
          className={`flex items-center space-x-2 py-1 px-2 rounded cursor-pointer transition-all ${
            isSelected
              ? 'bg-amber-500/20 text-amber-300 font-bold border-l-2 border-amber-400'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
        >
          {isFolder ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-amber-500 shrink-0" />
            )
          ) : (
            <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
          )}
          <span className="truncate">{node.name}</span>
        </div>

        {isFolder && isExpanded && node.children && (
          <div className="border-l border-slate-800 ml-2 pl-1 space-y-0.5">
            {node.children.map((child) => renderTree(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 rounded-2xl border border-amber-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/50 text-amber-300 text-xs font-semibold">
              <Box className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>PHASE 2 — ITIS PRODUCTION IMPLEMENTATION WORKSPACE FOUNDATION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ITIS Monorepo <span className="text-amber-400">Production Workspace</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Standardized, compile-ready production implementation workspace for the ITIS ecosystem. Incorporates NestJS backend, Next.js 15 web applications, Flutter mobile apps, shared packages, and Docker Compose topology for PostgreSQL, Redis, Kafka, MQTT Mosquitto, and NGINX.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-amber-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">7 Apps</span>
              <span className="text-xs text-slate-400 font-medium">Core Workspace</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">4 Shared</span>
              <span className="text-xs text-slate-400 font-medium">Shared Packages</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">5 Services</span>
              <span className="text-xs text-slate-400 font-medium">Docker Services</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('tree_explorer')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'tree_explorer'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Folder className="w-3.5 h-3.5 text-amber-300" />
            <span>1. Production Directory & File Inspector</span>
          </button>

          <button
            onClick={() => setActiveSubTab('infra_topology')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'infra_topology'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. Container Infrastructure Topology</span>
          </button>

          <button
            onClick={() => setActiveSubTab('shared_packages')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'shared_packages'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Monorepo Shared Libraries</span>
          </button>

          <button
            onClick={() => setActiveSubTab('standards_workflows')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'standards_workflows'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Workflow className="w-3.5 h-3.5 text-purple-400" />
            <span>4. Engineering Standards & Git Workflow</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT CONSOLE */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-2">
          <span className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 animate-pulse text-amber-400" />
            <span>ITIS Production Workspace Build & Container Log</span>
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

      {/* SUB-TAB 1: PRODUCTION DIRECTORY & FILE INSPECTOR */}
      {activeSubTab === 'tree_explorer' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Folder className="w-5 h-5 text-amber-400" />
                <span>Production Workspace Directory & Config Viewer</span>
              </h3>
              <p className="text-xs text-slate-400">Inspect exact production configuration files, package declarations, and Dockerfiles.</p>
            </div>

            <div className="px-3 py-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-amber-300 font-semibold">
              Root: itis/
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FILE TREE SIDEBAR */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-y-auto max-h-96">
              <span className="text-amber-400 font-bold text-xs block mb-3 border-b border-slate-800 pb-1">
                Workspace Tree
              </span>
              {renderTree(WORKSPACE_TREE)}
            </div>

            {/* FILE CONTENT VIEWER */}
            <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-bold">{selectedFile.name}</span>
                  <span className="text-slate-500">({selectedFile.path})</span>
                </div>

                <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px]">
                  COMPILE READY
                </span>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto max-h-80">
                <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                  {selectedFile.content || '// Directory node selected'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CONTAINER INFRASTRUCTURE TOPOLOGY */}
      {activeSubTab === 'infra_topology' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Server className="w-5 h-5 text-cyan-400" />
            <span>Docker Compose Production Services & Infrastructure Topology</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {INFRA_SERVICES.map((srv, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-amber-400 font-bold text-xs">{srv.name}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px]">
                    HEALTHY
                  </span>
                </div>

                <div className="space-y-1 text-slate-300">
                  <p>Image: <strong className="text-cyan-300">{srv.image}</strong></p>
                  <p>Port Binding: <strong className="text-amber-300">{srv.port}</strong></p>
                  <p>Health Check: <strong className="text-slate-400 text-[10px]">{srv.healthCheck}</strong></p>
                </div>

                <p className="text-slate-400 text-[11px] leading-relaxed border-t border-slate-800/80 pt-2">
                  {srv.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SHARED PACKAGES */}
      {activeSubTab === 'shared_packages' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>Monorepo Shared Libraries (@itis/shared-packages)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="space-y-3">
              <span className="text-amber-400 font-bold block border-b border-slate-800 pb-2">Available Shared Packages</span>
              {SHARED_PACKAGES.map((pkg) => (
                <div
                  key={pkg.name}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    selectedPackage.name === pkg.name
                      ? 'bg-amber-950/60 border-amber-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{pkg.name}</span>
                    <span className="text-[10px] text-cyan-400">{pkg.folderPath}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{pkg.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-emerald-400 font-bold block border-b border-slate-800 pb-2">
                Exports & Code Sample: {selectedPackage.name}
              </span>

              <div className="space-y-1 text-slate-300 text-[11px]">
                <p>Dependencies: <strong className="text-amber-300">{selectedPackage.dependencies.join(', ')}</strong></p>
                <p>Exported Types/Services: <strong className="text-cyan-300">{selectedPackage.exports.join(', ')}</strong></p>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg overflow-x-auto">
                <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                  {selectedPackage.codeSample}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: STANDARDS & WORKFLOWS */}
      {activeSubTab === 'standards_workflows' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Workflow className="w-5 h-5 text-purple-400" />
            <span>Engineering Standards, Git Strategy & Release Workflow</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">1. Branching Strategy</span>
              <p className="text-slate-300">• <strong>main</strong>: Protected production release code.</p>
              <p className="text-slate-300">• <strong>staging</strong>: Staging cluster deployed via SITA CI/CD.</p>
              <p className="text-slate-300">• <strong>dev</strong>: Active engineering integration branch.</p>
              <p className="text-slate-300">• <strong>feature/PROMPT-XXX-title</strong>: Feature branches.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">2. Commit Message Standards</span>
              <p className="text-slate-300">• <strong>feat(backend)</strong>: Add Kafka consumer for CAD events.</p>
              <p className="text-slate-300">• <strong>fix(parent-app)</strong>: Resolve BLE reconnection delay.</p>
              <p className="text-slate-300">• <strong>docs(infra)</strong>: Update NGINX mTLS certificate guides.</p>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY PRODUCTION WORKSPACE RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-amber-400" />
          <span>10 Mandatory Production Implementation Workspace Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_WORKSPACE_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400">RULE #{rule.id}</span>
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
