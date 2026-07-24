import React, { useState } from 'react';
import { Footer } from './Footer';
import {
  Building2,
  ShieldCheck,
  Users,
  FileText,
  BarChart3,
  Globe,
  Settings,
  ShieldAlert,
  Server,
  Key,
  Radio,
  Clock,
  Layers,
  Database,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Filter,
  Search,
  RefreshCw,
  Sliders,
  Cpu,
  FileCheck2,
  HardDrive,
  Activity,
  Award,
  ChevronRight,
  TrendingUp,
  Eye,
  UserCheck,
  School,
  Sparkles,
  Terminal,
  Zap,
  MapPin
} from 'lucide-react';
import {
  SAMPLE_NATIONAL_TENANTS,
  SAMPLE_GOVERNMENT_USERS,
  SAMPLE_GOVERNMENT_CONTRACTS,
  SAMPLE_FEATURE_FLAGS,
  NationalTenant,
  GovernmentUser,
  GovernmentContract,
  FeatureFlag
} from '../data/governanceData';
import { SA_LANGUAGES } from '../data/responderMobileData';

export function NationalGovernanceModule() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'tenants'
    | 'users'
    | 'compliance'
    | 'registry'
    | 'provinces'
    | 'contracts'
    | 'fleet'
    | 'audit'
    | 'feature_flags'
    | 'reports'
    | 'secops'
  >('dashboard');

  // Multi-Tenant State
  const [tenants, setTenants] = useState<NationalTenant[]>(SAMPLE_NATIONAL_TENANTS);
  const [selectedTenant, setSelectedTenant] = useState<NationalTenant>(SAMPLE_NATIONAL_TENANTS[0]);

  // Government Users State
  const [govUsers, setGovUsers] = useState<GovernmentUser[]>(SAMPLE_GOVERNMENT_USERS);

  // Feature Flags State
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(SAMPLE_FEATURE_FLAGS);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Toggle Feature Flag
  const handleToggleFlag = (key: string) => {
    setFeatureFlags((prev) =>
      prev.map((flag) =>
        flag.key === key ? { ...flag, enabledNationally: !flag.enabledNationally } : flag
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center justify-center">
      {/* HEADER BANNER */}
      <div className="w-full max-w-7xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/50 rounded-2xl flex items-center justify-center text-blue-400 shadow-lg shadow-blue-900/30">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white tracking-wide">
                REPUBLIC OF SOUTH AFRICA • NATIONAL GOVERNANCE PORTAL
              </h1>
              <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                SITA / DBE / TREASURY
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                </span>
            </div>
            <p className="text-xs text-slate-400">
              Multi-Tenant Hierarchy, POPIA Compliance Engine, EMIS Sync, National Fleet Governance & Audit Ledger
            </p>
          </div>
        </div>

        {/* Global Metadata Controls */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>POPIA & PAIA VERIFIED (ISO 27001)</span>
          </div>

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

      {/* PORTAL CONTAINER FRAME */}
      <div className="w-full max-w-7xl bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-5">
        {/* TOP STATUS ROW */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/40 rounded-xl flex items-center justify-center text-blue-400 font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center space-x-2">
                <span>Dr. M. Mthembu (National Director-General)</span>
                <span className="bg-blue-950 text-blue-400 px-2 py-0.5 rounded text-[10px] border border-blue-500/40">
                  NATIONAL SUPER ADMIN
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                Department of Basic Education • Pretoria HQ • Session mTLS Authenticated
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-slate-400 text-[10px]">PROTECTED LEARNERS</div>
              <div className="text-sm font-bold text-emerald-400">1,240,000 / 1.24M</div>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-[10px]">SCHOOLS ONBOARDED</div>
              <div className="text-sm font-bold text-white">24,800 Schools</div>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-[10px]">SYSTEM UPTIME</div>
              <div className="text-sm font-bold text-emerald-400">99.99%</div>
            </div>
          </div>
        </div>

        {/* NAVIGATION TAB BAR */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Exec Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('tenants')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'tenants' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tenants</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'users' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Gov Users</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'compliance' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>POPIA & ISO</span>
          </button>

          <button
            onClick={() => setActiveTab('registry')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'registry' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>EMIS Registry</span>
          </button>

          <button
            onClick={() => setActiveTab('provinces')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'provinces' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Provinces</span>
          </button>

          <button
            onClick={() => setActiveTab('contracts')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'contracts' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Contracts</span>
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'fleet' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Fleet</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'audit' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Audit Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('feature_flags')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'feature_flags' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Flags</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'reports' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('secops')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'secops' ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>SecOps</span>
          </button>
        </div>

        {/* TAB 1: EXECUTIVE NATIONAL DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-xs flex items-center justify-between">
                  <span>TOTAL NATIONAL BUDGET</span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">R 420,000,000</div>
                <div className="text-[10px] text-emerald-400">RT-57 Government Allocation (2026-2028)</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-xs flex items-center justify-between">
                  <span>ACTIVE WEARABLES</span>
                  <Cpu className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-black text-blue-400">1,180,000</div>
                <div className="text-[10px] text-slate-400">nRF9160 LTE-M Devices Online</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-xs flex items-center justify-between">
                  <span>SLA COMPLIANCE SCORE</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400">98.4%</div>
                <div className="text-[10px] text-emerald-400">Auditor-General Compliance Passed</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-xs flex items-center justify-between">
                  <span>ACTIVE INCIDENTS</span>
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-400">3 SOS Panic Alerts</div>
                <div className="text-[10px] text-amber-400 font-sans">Under C3 Command Dispatch</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="font-bold text-white text-sm flex items-center justify-between">
                  <span>PROVINCIAL BREAKDOWN & ONBOARDING</span>
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="font-bold text-white">Gauteng (GP)</span>
                    <span className="text-emerald-400 font-bold">380k Learners • 99.1% Compliance</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="font-bold text-white">KwaZulu-Natal (KZN)</span>
                    <span className="text-emerald-400 font-bold">410k Learners • 96.8% Compliance</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="font-bold text-white">Western Cape (WC)</span>
                    <span className="text-emerald-400 font-bold">190k Learners • 99.6% Compliance</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="font-bold text-white">Eastern Cape (EC)</span>
                    <span className="text-amber-400 font-bold">260k Learners • 94.2% Compliance</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="font-bold text-white text-sm flex items-center justify-between">
                  <span>GOVERNMENT INTER-AGENCY CONNECTIONS</span>
                  <Server className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span>SITA National Cloud Gateway</span>
                    <span className="text-emerald-400 font-bold">CONNECTED (4ms)</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span>DBE EMIS Database Pipeline</span>
                    <span className="text-emerald-400 font-bold">SYNCED (100%)</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span>National Treasury Payment Gateway</span>
                    <span className="text-emerald-400 font-bold">ONLINE</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span>SAPS National CAD Radio Dispatch</span>
                    <span className="text-emerald-400 font-bold">ACTIVE MTLS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MULTI-TENANT ADMINISTRATION */}
        {activeTab === 'tenants' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  <span>MULTI-TENANT HIERARCHY & ISOLATION MANAGEMENT</span>
                </h3>
                <p className="text-xs text-slate-400">National, Provincial, District, Municipal and School Isolation Quotas</p>
              </div>

              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all">
                + PROVISION NEW TENANT
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {tenants.map((t) => (
                <div key={t.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-sm flex items-center space-x-2">
                      <span>{t.name}</span>
                      <span className="bg-slate-800 text-blue-400 px-2 py-0.5 rounded text-[10px] border border-slate-700">
                        {t.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Level: {t.level} • Schools: {t.schoolsCount.toLocaleString()} • Protected Learners: {t.protectedLearnersCount.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-slate-400 text-[10px]">STORAGE QUOTA</div>
                      <div className="text-white font-bold">{t.storageUsedGb} GB / {t.storageQuotaGb} GB</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 text-[10px]">COMPLIANCE</div>
                      <div className="text-emerald-400 font-bold">{t.complianceScorePercent}%</div>
                    </div>
                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl border border-slate-700">
                      SETTINGS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GOVERNMENT USER ADMINISTRATION */}
        {activeTab === 'users' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>GOVERNMENT USER ADMINISTRATION & RBAC</span>
                </h3>
                <p className="text-xs text-slate-400">DBE, Treasury, SITA, SAPS & Auditor-General RBAC Matrix</p>
              </div>

              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl transition-all">
                + INVITE GOV USER
              </button>
            </div>

            <div className="space-y-2 font-mono">
              {govUsers.map((u) => (
                <div key={u.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{u.fullName} ({u.department})</div>
                    <div className="text-slate-400 text-[10px]">{u.email} • Role: {u.role.replace(/_/g, ' ')}</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] border border-emerald-500/40 font-bold">
                      MFA ENFORCED
                    </span>
                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-lg">
                      RESET CREDENTIALS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: POPIA & ISO COMPLIANCE */}
        {activeTab === 'compliance' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span>POPIA, PAIA & ISO 27001 COMPLIANCE CENTRE</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">POPIA DATA PRIVACY</div>
                <div className="text-emerald-400 font-bold text-lg">100% AUDITED</div>
                <p className="text-slate-400 text-[10px] font-sans">
                  Learner biometric & location data encrypted at rest with AES-256-GCM. Automatic 30-day telemetry purging enforced.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">PAIA MANUAL AUDIT</div>
                <div className="text-emerald-400 font-bold text-lg">COMPLIANT</div>
                <p className="text-slate-400 text-[10px] font-sans">
                  Public Access to Information Act Section 51 Manual registered with Information Regulator.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">ISO 27001 CONTROLS</div>
                <div className="text-blue-400 font-bold text-lg">CERTIFIED</div>
                <p className="text-slate-400 text-[10px] font-sans">
                  Hardware Security Module (STSAFE-A110) & SITA Cloud Enclave zero-trust architecture.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: FEATURE FLAGS */}
        {activeTab === 'feature_flags' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Sliders className="w-5 h-5 text-blue-400" />
                  <span>FEATURE FLAG & CONTROLLED ROLLOUT MANAGEMENT</span>
                </h3>
                <p className="text-xs text-slate-400">Emergency operational modes & province-specific feature rollouts</p>
              </div>
            </div>

            <div className="space-y-3 font-mono">
              {featureFlags.map((flag) => (
                <div key={flag.key} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{flag.name}</div>
                    <div className="text-slate-400 text-[11px] font-sans mt-0.5">{flag.description}</div>
                    <div className="text-[10px] text-blue-400 mt-1">Enabled Provinces: {flag.enabledProvinces.join(', ')}</div>
                  </div>

                  <button
                    onClick={() => handleToggleFlag(flag.key)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all ${
                      flag.enabledNationally
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {flag.enabledNationally ? 'ENABLED NATIONALLY' : 'DISABLED'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 11: REGULATORY REPORTING */}
        {activeTab === 'reports' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span>REGULATORY REPORT GENERATOR</span>
                </h3>
                <p className="text-xs text-slate-400">Export official DBE, National Treasury, SITA & Auditor-General filings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-white text-sm">AUDITOR-GENERAL SLA & COMPLIANCE REPORT</div>
                <p className="text-slate-400 text-[11px] font-sans">
                  Complete audit trail of hardware provisioning, emergency responder SLA response times, and budget expenditure.
                </p>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF EXPORT</span>
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-xl">
                    EXCEL / CSV
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-white text-sm">NATIONAL TREASURY RT-57 EXPENDITURE REPORT</div>
                <p className="text-slate-400 text-[11px] font-sans">
                  Milestone claims, vendor disbursements, hardware asset lifecycle tracking, and warranty utilization.
                </p>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF EXPORT</span>
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-xl">
                    EXCEL / CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ENTERPRISE FOOTER */}
      <Footer />
    </div>
  );
}
