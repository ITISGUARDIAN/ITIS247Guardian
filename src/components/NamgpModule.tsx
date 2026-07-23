import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Building2,
  Globe,
  Layers,
  FileCode,
  Lock,
  KeyRound,
  Database,
  Terminal,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCw,
  Search,
  Filter,
  Plus,
  Server,
  Cpu,
  Radio,
  FileText,
  Sliders,
  Check,
  Zap,
  Users,
  Eye,
  Settings,
  HardDrive
} from 'lucide-react';
import {
  SAMPLE_GOVT_TENANTS,
  SAMPLE_POLICY_RULES,
  NAMGP_CODE_SPECS,
  CRITICAL_NAMGP_RULES,
  GovernmentTenant,
  TenantPolicyRule,
  NamgpCodeSpec
} from '../data/namgpData';

export const NamgpModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'tenants' | 'policies' | 'compliance' | 'feature_flags' | 'code_specs' | 'rules_sla'
  >('tenants');

  // Tenants State
  const [tenants, setTenants] = useState<GovernmentTenant[]>(SAMPLE_GOVT_TENANTS);
  const [selectedTenant, setSelectedTenant] = useState<GovernmentTenant>(SAMPLE_GOVT_TENANTS[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Policy Engine State
  const [policies, setPolicies] = useState<TenantPolicyRule[]>(SAMPLE_POLICY_RULES);

  // Feature Flags per Tenant State
  const [featureFlags, setFeatureFlags] = useState({
    enableEmergencySmsGateways: true,
    enableBiometricLivenessVerification: true,
    enableMetroPoliceDirectDispatch: true,
    enableCrossBoundaryTransportTracking: false,
    enableParentAppSelfServiceUnpairing: false,
    enableRealTimeAudioStreaming: true,
  });

  // Code Spec State
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<NamgpCodeSpec>(NAMGP_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Toggle Policy Enforcement Mode
  const handleTogglePolicyMode = (policyId: string) => {
    setPolicies((prev) =>
      prev.map((p) => {
        if (p.id === policyId) {
          const nextMode = p.enforcementMode === 'STRICT_BLOCK' ? 'AUDIT_ONLY' : 'STRICT_BLOCK';
          addLog(`POLICY UPDATED: ${p.id} enforcement mode changed to ${nextMode}`);
          return { ...p, enforcementMode: nextMode };
        }
        return p;
      })
    );
  };

  // Toggle Feature Flag
  const handleToggleFlag = (flagKey: keyof typeof featureFlags) => {
    setFeatureFlags((prev) => {
      const updated = { ...prev, [flagKey]: !prev[flagKey] };
      addLog(`FEATURE FLAG UPDATED for ${selectedTenant.name}: ${String(flagKey)} set to ${updated[flagKey]}`);
      return updated;
    });
  };

  // Provision New Tenant Simulation
  const handleProvisionNewTenant = () => {
    const newTenantId = `TENANT-NW-NWED-PROV`;
    const newTenant: GovernmentTenant = {
      id: newTenantId,
      name: 'North West Department of Education (NWED)',
      level: 'PROVINCIAL_DEPT',
      jurisdictionRegion: 'North West Province (Mahikeng, Rustenburg)',
      activeLearnersProtected: 950000,
      registeredSchoolsCount: 1410,
      connectedAgenciesCount: 18,
      complianceScorePct: 99.9,
      popiaAuditStatus: 'FULLY_COMPLIANT',
      allocatedBudgetZar: 'R 120 Million',
      dataSovereigntyZone: 'ZA_CENTRAL_JHB_CLOUD',
      status: 'ACTIVE',
    };

    setTenants((prev) => [newTenant, ...prev]);
    addLog(`TENANT PROVISIONED: Created & bound ${newTenant.id} with isolated PostgreSQL RLS schema.`);
  };

  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.jurisdictionRegion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 rounded-2xl border border-blue-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 animate-pulse text-blue-400" />
              <span>PROMPT 040 — NATIONAL ADMINISTRATION & MULTI-TENANCY PLATFORM (NAMGP)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              National Government & <span className="text-blue-400">Multi-Tenancy Governance</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Highest-level administrative control portal for the entire ITIS platform. Manages National & Provincial Departments of Education, Municipalities, and Enterprise Partners. Enforces POPIA Section 18 data sovereignty, PostgreSQL Row-Level Security (RLS), ISO 27001 audit oversight, dynamic jurisdiction feature flags, and tenant quotas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-blue-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-blue-400">12.45M+</span>
              <span className="text-xs text-slate-400 font-medium">Learners Protected</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">100%</span>
              <span className="text-xs text-slate-400 font-medium">POPIA Sovereignty</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">24,890</span>
              <span className="text-xs text-slate-400 font-medium">Governed Schools</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('tenants')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'tenants'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>1. National & Provincial Tenants</span>
          </button>

          <button
            onClick={() => setActiveSubTab('policies')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'policies'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>2. Multi-Tenancy Policy Engine</span>
          </button>

          <button
            onClick={() => setActiveSubTab('compliance')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'compliance'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>3. Audit & Regulatory Oversight</span>
          </button>

          <button
            onClick={() => setActiveSubTab('feature_flags')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'feature_flags'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4 text-purple-400" />
            <span>4. Global Flags & RBAC</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-fuchsia-400" />
            <span>5. NestJS Governance Architecture</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rules_sla')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'rules_sla'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-teal-400" />
            <span>6. Mandatory Governance Rules</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-blue-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-blue-400" />
              <span>NAMGP Government Audit & Administrative Log Stream</span>
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

      {/* SUB-TAB 1: NATIONAL & PROVINCIAL TENANTS */}
      {activeSubTab === 'tenants' && (
        <div className="space-y-6">
          {/* SEARCH & PROVISION CONTROLS */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Tenants, Regions, ID..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleProvisionNewTenant}
              className="w-full md:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>PROVISION NEW GOVERNMENT TENANT</span>
            </button>
          </div>

          {/* TENANTS GRID & DETAIL PANEL */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* TENANTS LIST */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Active Governed Tenants ({filteredTenants.length})
              </h3>

              {filteredTenants.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTenant(t);
                    addLog(`SELECTED TENANT: ${t.name} (${t.id})`);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    selectedTenant.id === t.id
                      ? 'bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-950/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-blue-400">{t.id}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] font-bold border border-blue-700">
                      {t.level.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.jurisdictionRegion}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block">Learners:</span>
                      <strong className="text-white">{t.activeLearnersProtected.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Compliance:</span>
                      <strong className="text-emerald-400">{t.complianceScorePct}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTED TENANT DETAIL */}
            <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 font-mono text-xs font-bold border border-blue-800">
                      {selectedTenant.id}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 font-mono text-xs font-bold border border-emerald-800">
                      {selectedTenant.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-2">{selectedTenant.name}</h2>
                  <p className="text-xs text-slate-400">{selectedTenant.jurisdictionRegion}</p>
                </div>

                <div className="text-right font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block">Annual Allocated Budget</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedTenant.allocatedBudgetZar}</span>
                </div>
              </div>

              {/* STATS MATRIX */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Learners Protected</span>
                  <span className="text-xl font-extrabold text-blue-400">
                    {selectedTenant.activeLearnersProtected.toLocaleString()}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Governed Schools</span>
                  <span className="text-xl font-extrabold text-cyan-400">
                    {selectedTenant.registeredSchoolsCount.toLocaleString()}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Connected Agencies</span>
                  <span className="text-xl font-extrabold text-purple-400">
                    {selectedTenant.connectedAgenciesCount}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Compliance Rating</span>
                  <span className="text-xl font-extrabold text-emerald-400">
                    {selectedTenant.complianceScorePct}%
                  </span>
                </div>
              </div>

              {/* DATA SOVEREIGNTY & STORAGE ZONE */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-blue-400 font-bold block flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-blue-400" />
                  <span>POPIA Data Sovereignty & Isolation Configuration</span>
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-slate-500">In-Country Cloud Data Zone:</span>
                    <p className="text-white font-bold">{selectedTenant.dataSovereigntyZone}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500">PostgreSQL RLS Schema Binding:</span>
                    <p className="text-emerald-400 font-bold">tenant_rls_{selectedTenant.id.toLowerCase().replace(/-/g, '_')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MULTI-TENANCY POLICY ENGINE */}
      {activeSubTab === 'policies' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>POPIA & Multi-Tenant Security Policy Engine</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enforces statutory compliance rules across all provincial and municipal government tenants.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {policies.map((pol) => (
              <div key={pol.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400 font-bold text-sm">{pol.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-bold text-[10px]">
                      {pol.ruleCategory}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">{pol.description}</p>
                  <div className="flex items-center space-x-4 text-[10px] text-slate-500">
                    <span>Evaluated: <strong className="text-white">{pol.lastEvaluated}</strong></span>
                    <span>Passed Invocations: <strong className="text-emerald-400">{pol.passedCount.toLocaleString()}</strong></span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    pol.enforcementMode === 'STRICT_BLOCK' ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {pol.enforcementMode}
                  </span>

                  <button
                    onClick={() => handleTogglePolicyMode(pol.id)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all"
                  >
                    Toggle Mode
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: REGULATORY OVERSIGHT */}
      {activeSubTab === 'compliance' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>National Regulatory Audit & ISO 27001 Oversight</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-cyan-400 font-bold block">ISO 27001 ISMS Certification</span>
              <p className="text-slate-300">Continuous vulnerability scanning & automated access control reviews active.</p>
              <span className="text-emerald-400 font-bold block">STATUS: PASSED (100%)</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-purple-400 font-bold block">SOC 2 Type II Audit Log</span>
              <p className="text-slate-300">Immutable Cryptographic SHA-256 audit logs active across all 9 provinces.</p>
              <span className="text-emerald-400 font-bold block">STATUS: VERIFIED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-amber-400 font-bold block">POPIA Section 18 Audit Trail</span>
              <p className="text-slate-300">Every PII lookup logged with mandatory justification tag and official badge ID.</p>
              <span className="text-emerald-400 font-bold block">STATUS: AUDITED</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FEATURE FLAGS & RBAC */}
      {activeSubTab === 'feature_flags' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-purple-400" />
              <span>Dynamic Jurisdiction Feature Flags for {selectedTenant.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Toggle specific platform capabilities on/off dynamically per government tenant without redeploying code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(featureFlags).map(([flagKey, isEnabled]) => (
              <div key={flagKey} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-white font-bold block">{flagKey.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-slate-500 text-[10px]">Scope: {selectedTenant.id}</span>
                </div>

                <button
                  onClick={() => handleToggleFlag(flagKey as keyof typeof featureFlags)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                    isEnabled
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {isEnabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-fuchsia-400" />
              <h3 className="text-base font-bold text-white">NestJS Governance Clean Architecture Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {NAMGP_CODE_SPECS.map((spec) => (
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

      {/* SUB-TAB 6: MANDATORY GOVERNANCE RULES */}
      {activeSubTab === 'rules_sla' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-teal-400" />
            <span>10 Mandatory Government Governance Rules & SLAs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {CRITICAL_NAMGP_RULES.map((rule) => (
              <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-400">RULE #{rule.id}</span>
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
