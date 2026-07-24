import React, { useState } from 'react';
import {
  Server,
  Cpu,
  ShieldCheck,
  Key,
  Terminal,
  FileCode,
  FolderTree,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Lock,
  Workflow,
  Container,
  Activity,
  Database,
  Search,
  Code,
  Box,
  Sparkles,
  ShieldAlert,
  ListCheck,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { FOUNDATION_ITEMS, NESTJS_FOLDER_STRUCTURE, FoundationItem } from '../data/nestjsFoundationData';

export const NestJsFoundation: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FoundationItem>(FOUNDATION_ITEMS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'inspector' | 'tree' | 'docker' | 'summary'>('inspector');

  const categories = ['All', 'Core Setup', 'Config & DB', 'Security & Auth', 'Base Patterns', 'Middleware & Logs', 'DevOps & Testing'];

  const filteredItems = FOUNDATION_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.filename.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center space-x-3 mb-3">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Server className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">
            NestJS Enterprise Foundation Layer
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          NestJS 10 + Node.js 20 Enterprise Backend Architecture
        </h2>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-4xl leading-relaxed">
          Production backend foundation providing all 27 enterprise requirements: modular folder hierarchy, Type-safe config, Prisma ORM, Winston logging, JWT + RBAC + Permissions guards, abstract Repository / Service / Controller patterns, audit middleware, OpenAPI Swagger, Docker Compose, and CI-ready GitHub Actions. Zero business modules loaded — ready for team review.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap gap-2.5 mt-4">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>27/27 Enterprise Foundation Items Complete</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            <span>JWT + RBAC + Granular Permissions</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Container className="w-3.5 h-3.5 text-cyan-400" />
            <span>Docker + PostGIS + Redis + MQTT</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Workflow className="w-3.5 h-3.5 text-amber-400" />
            <span>Abstract Generic Repository Pattern</span>
          </div>
        </div>

        {/* View Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveView('inspector')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'inspector'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Code Inspector ({FOUNDATION_ITEMS.length} Specs)</span>
          </button>

          <button
            onClick={() => setActiveView('tree')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'tree'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Folder Hierarchy</span>
          </button>

          <button
            onClick={() => setActiveView('docker')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'docker'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Container className="w-4 h-4" />
            <span>Docker & Services Stack</span>
          </button>

          <button
            onClick={() => setActiveView('summary')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'summary'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ListCheck className="w-4 h-4" />
            <span>Compliance Matrix (27 Items)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CODE INSPECTOR */}
      {activeView === 'inspector' && (
        <div className="space-y-6">
          {/* Controls: Category Pills & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
            {/* Category Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search specs or files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Master Detail Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Item Selector List */}
            <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
              {filteredItems.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold flex items-center justify-center">
                          {item.id}
                        </span>
                        <span className="text-xs font-bold text-white line-clamp-1">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.filename}</p>
                  </div>
                );
              })}
            </div>

            {/* Right Detailed Inspector Panel */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Requirement #{selectedItem.id}
                    </span>
                    <h3 className="text-lg font-bold text-white">{selectedItem.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{selectedItem.description}</p>
                  <p className="text-xs font-mono text-indigo-300 mt-1 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{selectedItem.filename}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleCopyCode(selectedItem.code, selectedItem.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700 whitespace-nowrap self-start md:self-auto"
                >
                  {copiedId === selectedItem.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedId === selectedItem.id ? 'Copied Code!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Code Highlights */}
              <div className="flex flex-wrap gap-2">
                {selectedItem.highlights.map((hl, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800 text-[11px] font-medium flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>

              {/* Code Block Container */}
              <pre className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed max-h-[500px]">
                {selectedItem.code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FOLDER HIERARCHY */}
      {activeView === 'tree' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-indigo-400" />
                CI-Ready Project Directory Hierarchy
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Modular architecture separating common base patterns, core configuration, Winston logging, health terminus, and passport strategies.
              </p>
            </div>
            <button
              onClick={() => handleCopyCode(NESTJS_FOLDER_STRUCTURE, 999)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
            >
              {copiedId === 999 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === 999 ? 'Copied Tree!' : 'Copy Tree'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
            {NESTJS_FOLDER_STRUCTURE}
          </pre>
        </div>
      )}

      {/* VIEW 3: DOCKER & SERVICES STACK */}
      {activeView === 'docker' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Container className="w-5 h-5 text-cyan-400" />
              Docker Container Orchestrator Stack
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Docker Compose provisions all 4 foundation containers required for the ITIS real-time safety ecosystem:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-indigo-400">
                  <span>itis-nestjs-api</span>
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/10">
                    Port 3000
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">NestJS 10 API engine running multi-stage Alpine build with non-root security.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-cyan-400">
                  <span>itis-postgres (PostGIS 16)</span>
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/10">
                    Port 5432
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">PostgreSQL 16 with PostGIS spatial geometry extensions & TimescaleDB support.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-red-400">
                  <span>itis-redis (Redis 7)</span>
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/10">
                    Port 6379
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Redis 7 cache, rate-limiting store, and PubSub queue broker.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-amber-400">
                  <span>itis-mosquitto (MQTT Broker)</span>
                  <span className="text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/10">
                    Port 1883 / 9001
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Eclipse Mosquitto MQTT broker for high-speed wearable IoT GPS telemetry ingest.</p>
              </div>
            </div>
          </div>

          {/* Dockerfile & Docker Compose Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                docker-compose.yml
              </h3>
              <button
                onClick={() => handleCopyCode(FOUNDATION_ITEMS[12].code, 12)}
                className="px-2.5 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-300 hover:bg-slate-700"
              >
                Copy Compose YML
              </button>
            </div>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-200 overflow-x-auto max-h-[420px]">
              {FOUNDATION_ITEMS[12].code}
            </pre>
          </div>
        </div>
      )}

      {/* VIEW 4: COMPLIANCE MATRIX */}
      {activeView === 'summary' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ListCheck className="w-5 h-5 text-emerald-400" />
              Full Requirements Verification (27/27)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Every item requested in has been generated with enterprise-grade TypeScript source code. Zero business modules (School, Learner, GPS, Telemetry, Incident) have been added.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {FOUNDATION_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setActiveView('inspector');
                }}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Item #{item.id}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{item.category}</span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] font-mono text-slate-400 line-clamp-1">{item.filename}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
