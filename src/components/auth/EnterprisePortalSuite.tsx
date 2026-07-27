import React, { useState } from 'react';
import {
  ShieldCheck,
  User,
  School,
  Building2,
  Radio,
  Wrench,
  BarChart3,
  Lock,
  LogOut,
  MapPin,
  PhoneCall,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Battery,
  Wifi,
  Search,
  Plus,
  QrCode,
  Smartphone,
  Bus,
  Users,
  Shield,
  FileText,
  Activity,
  Zap,
  Globe,
  Bell,
  ChevronRight,
  RefreshCw,
  Sliders,
  Send,
  Eye,
  Terminal,
  Award,
  HelpCircle,
  Database,
  Layers,
  ArrowRight,
  Cpu
} from 'lucide-react';

import { GisDashboard } from '../gis/GisDashboard';
import { HardwareShowcase } from '../HardwareShowcase';
import { DeviceLifecycleModule } from '../DeviceLifecycleModule';
import { CommercialCRMModule } from '../CommercialCRMModule';
import { CommercialCertificationReport } from '../CommercialCertificationReport';

export type UserRole =
  | 'PARENT'
  | 'SCHOOL_ADMIN'
  | 'GOVERNMENT_ADMIN'
  | 'COMMAND_OPERATOR'
  | 'TECHNICIAN'
  | 'EXECUTIVE'
  | 'SYSTEM_ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  organization: string;
  avatarUrl?: string;
  mfaSecured: boolean;
}

const DEMO_USERS: Record<UserRole, UserProfile> = {
  PARENT: {
    id: 'USR-PARENT-01',
    name: 'Nomalanga Mokoena',
    email: 'parent.mokoena@gmail.com',
    role: 'PARENT',
    title: 'Guardian / Parent',
    organization: 'Soweto Community Parent Committee',
    mfaSecured: true
  },
  SCHOOL_ADMIN: {
    id: 'USR-SCHOOL-01',
    name: 'Dr. Kagiso Khumalo',
    email: 'principal@sowetostem.edu.za',
    role: 'SCHOOL_ADMIN',
    title: 'Principal / Head of School',
    organization: 'Soweto STEM Academy',
    mfaSecured: true
  },
  GOVERNMENT_ADMIN: {
    id: 'USR-GOVT-01',
    name: 'Hon. Lindiwe Sisulu-Dlamini',
    email: 'gov.gauteng@education.gov.za',
    role: 'GOVERNMENT_ADMIN',
    title: 'Chief Director - School Safety',
    organization: 'Gauteng Department of Education',
    mfaSecured: true
  },
  COMMAND_OPERATOR: {
    id: 'USR-C3-01',
    name: 'Captain Brandon Marais',
    email: 'dispatch.c3@saps.gov.za',
    role: 'COMMAND_OPERATOR',
    title: 'Lead Dispatch Controller',
    organization: 'National SAPS & ITIS Command Centre',
    mfaSecured: true
  },
  TECHNICIAN: {
    id: 'USR-TECH-01',
    name: 'Sipho Zulu (Cert. #402)',
    email: 'tech.zulu@itis.gov.za',
    role: 'TECHNICIAN',
    title: 'Senior Field IoT Technician',
    organization: 'ITIS Field Operations & Provisioning',
    mfaSecured: true
  },
  EXECUTIVE: {
    id: 'USR-EXEC-01',
    name: 'Director Thabo Ndlovu',
    email: 'exec.ndlovu@itis.gov.za',
    role: 'EXECUTIVE',
    title: 'Managing Director & Founder',
    organization: 'ITIS Integrated Technology Intelligence & Safety',
    mfaSecured: true
  },
  SYSTEM_ADMIN: {
    id: 'USR-ADMIN-01',
    name: 'SRE Command Lead',
    email: 'admin.sre@itis.gov.za',
    role: 'SYSTEM_ADMIN',
    title: 'Enterprise DevOps & System Admin',
    organization: 'SITA Enclave & Cloud Systems',
    mfaSecured: true
  }
};

interface EnterprisePortalSuiteProps {
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onNavigateToTab?: (tab: string) => void;
  childrenComponents?: {
    gisDashboard?: React.ReactNode;
    deviceLifecycle?: React.ReactNode;
    commercialReport?: React.ReactNode;
    notifications?: React.ReactNode;
    commercialCrm?: React.ReactNode;
    financialModule?: React.ReactNode;
    aiIntelligenceModule?: React.ReactNode;
    commandCentreModule?: React.ReactNode;
  };
}

export function EnterprisePortalSuite({
  currentUser,
  onLogin,
  onLogout,
  onNavigateToTab,
  childrenComponents
}: EnterprisePortalSuiteProps) {
  // Demo Mode Switcher State (Default true for demo/eval, togglable for production realism)
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Login Form Local State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [selectedDemoRole, setSelectedDemoRole] = useState<UserRole>('PARENT');

  // Parent Portal State
  const [activeParentTab, setActiveParentTab] = useState<'children' | 'timeline' | 'safezones' | 'sos'>('children');
  const [sosTriggered, setSosTriggered] = useState(false);
  const [sosSuccessMsg, setSosSuccessMsg] = useState('');

  // School Portal State
  const [schoolTab, setSchoolTab] = useState<'learners' | 'teachers' | 'attendance' | 'transport' | 'incidents'>('learners');

  // Government Portal State
  const [govtTab, setGovtTab] = useState<'provinces' | 'compliance' | 'schools' | 'reports'>('provinces');

  // System Admin Portal State
  const [adminTab, setAdminTab] = useState<'gis' | 'hardware' | 'lifecycle' | 'crm' | 'reports'>('gis');

  // Handle Login Submit
  const handleCustomLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError('Please enter a valid enterprise email address.');
      return;
    }
    // Match email to demo role if possible or default to selected role
    const matched = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (matched) {
      onLogin(matched);
    } else {
      onLogin({
        ...DEMO_USERS[selectedDemoRole],
        email: loginEmail
      });
    }
  };

  const handleTriggerSos = () => {
    setSosTriggered(true);
    setSosSuccessMsg('EMERGENCY SOS DISPATCHED: ITIS Command Centre and SAPS C3 units notified. Live GPS beacon broadcasting.');
    setTimeout(() => {
      setSosSuccessMsg('');
    }, 6000);
  };

  // IF NOT AUTHENTICATED: SHOW LOGIN GATEWAY
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Branding & Credentials Form */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Header Logo */}
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-gradient-to-br from-amber-500/20 via-blue-950/40 to-slate-950 border border-amber-500/40 rounded-xl shadow-md shrink-0">
                  <img
                    src="/itis-logo.png"
                    alt="ITIS Logo"
                    className="w-10 h-10 object-contain rounded-lg drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-white font-mono">ITIS</span>
                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-3xs font-mono font-bold rounded-full">
                      PORTAL GATEWAY
                    </span>
                  </div>
                  <span className="text-3xs text-slate-400 font-mono font-semibold block">
                    Integrated Technology Intelligence & Safety
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Enterprise Authentication
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Access restricted to authorized parents, school admins, government officials, command dispatchers, and field technicians.
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs rounded-xl flex items-center gap-2 font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleCustomLoginSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Enterprise Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. principal@sowetostem.edu.za"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setLoginError('');
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Account Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div className="flex items-center justify-between text-2xs text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span>Remember this session</span>
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-amber-400 hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-xs"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Portal</span>
                </button>
              </form>

            </div>

            {/* MFA Security Footer Indicator & Demo Toggle */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-3xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                MFA Enforced via SITA KeyVault X.509
              </span>
              <button
                type="button"
                onClick={() => setIsDemoMode(!isDemoMode)}
                className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>{isDemoMode ? '● Demo Mode ON' : '○ Demo Mode OFF'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quick Role Switcher for Demonstration (Visible only when Demo Mode is Enabled) */}
          {isDemoMode && (
            <div className="md:col-span-5 bg-slate-950 p-6 sm:p-8 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-2xs font-mono font-bold text-amber-400 uppercase">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Evaluation Mode Active</span>
                  </div>
                  <span className="text-3xs font-mono px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full">
                    Demo Switcher
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white font-mono">
                  Select Persona for Instant Demonstration
                </h3>
                <p className="text-2xs text-slate-400 leading-relaxed">
                  Click any role below to immediately enter the customized operational portal without password prompts.
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    { role: 'PARENT' as UserRole, label: 'Parent / Guardian Portal', icon: User, color: 'text-emerald-400' },
                    { role: 'SCHOOL_ADMIN' as UserRole, label: 'School Admin Portal', icon: School, color: 'text-cyan-400' },
                    { role: 'GOVERNMENT_ADMIN' as UserRole, label: 'Government Safety Portal', icon: Building2, color: 'text-amber-400' },
                    { role: 'COMMAND_OPERATOR' as UserRole, label: '24/7 Command Centre', icon: Radio, color: 'text-rose-400' },
                    { role: 'TECHNICIAN' as UserRole, label: 'Technician Field Portal', icon: Wrench, color: 'text-purple-400' },
                    { role: 'EXECUTIVE' as UserRole, label: 'Executive Dashboard', icon: BarChart3, color: 'text-blue-400' },
                    { role: 'SYSTEM_ADMIN' as UserRole, label: 'System Admin Enclave', icon: Terminal, color: 'text-slate-400' }
                  ].map((item) => {
                    const Icon = item.icon;
                    const profile = DEMO_USERS[item.role];
                    return (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => {
                          setLoginEmail(profile.email);
                          setSelectedDemoRole(item.role);
                          onLogin(profile);
                        }}
                        className="w-full p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl transition text-left flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 bg-slate-950 rounded-lg ${item.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white font-mono block group-hover:text-amber-300 transition">
                              {item.label}
                            </span>
                            <span className="text-3xs text-slate-400 font-sans block">
                              {profile.name} • {profile.organization}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-3xs font-mono text-slate-400 flex justify-between items-center">
                <span>Production Security: Lock Persona Switcher</span>
                <button
                  type="button"
                  onClick={() => setIsDemoMode(false)}
                  className="text-amber-400 font-bold hover:underline"
                >
                  Disable Demo Mode
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // AUTHENTICATED VIEW: ROUTE TO PORTAL BASED ON ROLE
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Top Portal Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="p-1 bg-gradient-to-br from-amber-500/20 via-blue-950/40 to-slate-950 border border-amber-500/40 rounded-xl shrink-0">
            <img
              src="/itis-logo.png"
              alt="ITIS Logo"
              className="w-8 h-8 object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-white font-mono">ITIS</span>
              <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-3xs font-mono font-bold rounded-full uppercase">
                {currentUser.role.replace('_', ' ')} PORTAL
              </span>
            </div>
            <span className="text-3xs text-slate-400 font-mono block">
              {currentUser.organization}
            </span>
          </div>
        </div>

        {/* User Account Bar & Role Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right text-xs font-mono">
            <span className="font-bold text-white">{currentUser.name}</span>
            <span className="text-3xs text-slate-400">{currentUser.email}</span>
          </div>

          {/* Switch Role Quick Dropdown (Hidden in Production unless Demo Mode or System Admin) */}
          {(isDemoMode || currentUser.role === 'SYSTEM_ADMIN') && (
            <select
              value={currentUser.role}
              onChange={(e) => onLogin(DEMO_USERS[e.target.value as UserRole])}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-2xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
            >
              <option value="PARENT">Switch to: Parent</option>
              <option value="SCHOOL_ADMIN">Switch to: School Admin</option>
              <option value="GOVERNMENT_ADMIN">Switch to: Government</option>
              <option value="COMMAND_OPERATOR">Switch to: Operations Centre</option>
              <option value="TECHNICIAN">Switch to: Technician</option>
              <option value="EXECUTIVE">Switch to: Executive</option>
              <option value="SYSTEM_ADMIN">Switch to: System Admin</option>
            </select>
          )}

          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Portal Body Content Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* ROLE 1: PARENT PORTAL */}
        {currentUser.role === 'PARENT' && (
          <div className="space-y-6">
            
            {sosSuccessMsg && (
              <div className="bg-rose-950 border-2 border-rose-500 text-rose-200 p-4 rounded-2xl shadow-2xl flex items-center gap-3 font-mono text-xs animate-bounce">
                <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
                <span>{sosSuccessMsg}</span>
              </div>
            )}

            {/* Parent Welcome Banner */}
            <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 border border-slate-800 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-3xs font-mono font-bold">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AUTHENTICATED PARENT GUARDIAN PORTAL</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Welcome, {currentUser.name}
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl">
                  Real-time location, journey timelines, school gate check-ins, and emergency SOS controls for your registered children.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTriggerSos}
                  className="px-5 py-3 bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black rounded-2xl transition flex items-center gap-2 shadow-xl shadow-rose-600/30 text-xs font-mono animate-pulse"
                >
                  <AlertTriangle className="w-5 h-5 text-white" />
                  <span>EMERGENCY SOS DISPATCH</span>
                </button>

                <a
                  href="tel:0624304906"
                  className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-2xl text-xs font-mono font-bold transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Call Command (062 430 4906)</span>
                </a>
              </div>
            </div>

            {/* Registered Children Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>My Registered Children (2)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Child 1: Thabo Mokoena */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative overflow-hidden shadow-lg">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center text-slate-950 font-black text-lg font-mono">
                        TM
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-sans">Thabo Mokoena</h4>
                        <span className="text-xs text-slate-400">Grade 7 • Soweto STEM Academy</span>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-3xs font-mono font-bold uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      SAFE AT SCHOOL
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono text-2xs">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">Last Gate Check-In:</span>
                      <span className="text-white font-bold">07:42 AM (BLE Gateway Admin Block)</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">Wearable Band Battery:</span>
                      <span className="text-emerald-300 font-bold">92% (14 Days Remaining)</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">Transport Bus Status:</span>
                      <span className="text-slate-200">Bus #4 (Driver: Mr. Khumalo)</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">GPS Wearable Serial:</span>
                      <span className="text-amber-400">ITIS-2026-WB8842</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between text-2xs font-mono text-slate-300">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      Location: Soweto STEM Campus, Vilakazi St
                    </span>
                    <button
                      onClick={() => onNavigateToTab && onNavigateToTab('gis')}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      View Live Map →
                    </button>
                  </div>
                </div>

                {/* Child 2: Lesedi Dlamini */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative overflow-hidden shadow-lg">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-slate-950 font-black text-lg font-mono">
                        LD
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-sans">Lesedi Dlamini</h4>
                        <span className="text-xs text-slate-400">Grade 4 • Soweto STEM Academy</span>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-3xs font-mono font-bold uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      SAFE AT SCHOOL
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono text-2xs">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">Last Gate Check-In:</span>
                      <span className="text-white font-bold">07:45 AM (Primary Gate 2)</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">Wearable Band Battery:</span>
                      <span className="text-emerald-300 font-bold">88% (12 Days Remaining)</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">Transport Bus Status:</span>
                      <span className="text-slate-200">Bus #4 (Driver: Mr. Khumalo)</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">GPS Wearable Serial:</span>
                      <span className="text-amber-400">ITIS-2026-WB8843</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between text-2xs font-mono text-slate-300">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      Location: Soweto STEM Campus, Classroom 4B
                    </span>
                    <button
                      onClick={() => onNavigateToTab && onNavigateToTab('gis')}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      View Live Map →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ROLE 2: SCHOOL ADMIN PORTAL */}
        {currentUser.role === 'SCHOOL_ADMIN' && (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 border border-slate-800 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-3xs font-mono font-bold">
                  <School className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SOWETO STEM ACADEMY • SCHOOL ADMINISTRATION PORTAL</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  School Safety & Learner Management
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl">
                  Enrolled Learners: <strong className="text-white">1,240</strong> • Active Wearables: <strong className="text-emerald-400">1,238</strong> • Classroom BLE Gateways: <strong className="text-amber-400">24</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigateToTab && onNavigateToTab('lifecycle')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs font-mono transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Assign New Wearable</span>
                </button>
              </div>
            </div>

            {/* School Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-2xs font-mono text-slate-400 uppercase">On-Campus Today</span>
                <div className="text-2xl font-black text-emerald-300 font-mono mt-1">1,212</div>
                <span className="text-3xs text-emerald-400 font-mono">97.7% Attendance</span>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-2xs font-mono text-slate-400 uppercase">School Bus Transit</span>
                <div className="text-2xl font-black text-cyan-300 font-mono mt-1">420</div>
                <span className="text-3xs text-cyan-400 font-mono">12 Buses Tracked</span>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-2xs font-mono text-slate-400 uppercase">Active Incidents</span>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">0</div>
                <span className="text-3xs text-emerald-400 font-mono">Perimeter Safe</span>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-2xs font-mono text-slate-400 uppercase">Registered Visitors</span>
                <div className="text-2xl font-black text-purple-300 font-mono mt-1">14</div>
                <span className="text-3xs text-purple-400 font-mono">NFC Badges Issued</span>
              </div>
            </div>

            {childrenComponents?.gisDashboard}
          </div>
        )}

        {/* ROLE 3: GOVERNMENT ADMIN PORTAL */}
        {currentUser.role === 'GOVERNMENT_ADMIN' && (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 border border-slate-800 rounded-3xl space-y-2 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-3xs font-mono font-bold">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>GAUTENG DEPARTMENT OF EDUCATION • PROVINCIAL EXECUTIVE OVERSIGHT</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Provincial Child Safety & School Safety Analytics
              </h2>
              <p className="text-xs text-slate-300 max-w-3xl">
                Oversight of 4 pilot school districts across Johannesburg, Pretoria, Soweto, and Tshwane. Fully compliant with POPIA and SITA security policies.
              </p>
            </div>

            {childrenComponents?.commercialReport}
          </div>
        )}

        {/* ROLE 4: COMMAND OPERATOR PORTAL */}
        {currentUser.role === 'COMMAND_OPERATOR' && (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-950 border border-rose-500/30 rounded-3xl space-y-2 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-300 text-3xs font-mono font-bold">
                <Radio className="w-3.5 h-3.5 text-rose-400" />
                <span>24/7 SAPS & NATIONAL COMMAND DISPATCH CENTRE</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                National GIS Telemetry & Rapid Response Dispatch
              </h2>
              <p className="text-xs text-slate-300 max-w-3xl">
                Real-time SOS panic alerts, vehicle collision decelerations, off-route bus alerts, and multi-agency SAPS/EMS responder dispatch.
              </p>
            </div>

            {childrenComponents?.commandCentreModule || childrenComponents?.gisDashboard}
          </div>
        )}

        {/* ROLE 5: TECHNICIAN PORTAL */}
        {currentUser.role === 'TECHNICIAN' && (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-950 border border-purple-500/30 rounded-3xl space-y-2 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-3xs font-mono font-bold">
                <Wrench className="w-3.5 h-3.5 text-purple-400" />
                <span>ITIS FIELD TECHNICIAN & PROVISIONING ENCLAVE</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Enrollments, Hardware Provisioning & Field Diagnostics
              </h2>
              <p className="text-xs text-slate-300 max-w-3xl">
                Enroll learners, parents, schools, staff, drivers, security responders, and police users. Provision wearable bands, BLE gateways, and fleet trackers with X.509 client certificate injection.
              </p>
            </div>

            {childrenComponents?.deviceLifecycle}
          </div>
        )}

        {/* ROLE 6: EXECUTIVE PORTAL */}
        {currentUser.role === 'EXECUTIVE' && (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 border border-slate-800 rounded-3xl space-y-2 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-3xs font-mono font-bold">
                <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                <span>ITIS EXECUTIVE DIRECTORATE & COMMERCIAL PIPELINE</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                National Growth KPIs & Pilot Expansion Readiness
              </h2>
              <p className="text-xs text-slate-300 max-w-3xl">
                Strategic financial models, national pilot rollout pipeline, ROI calculators, and investor readiness briefs.
              </p>
            </div>

            {childrenComponents?.aiIntelligenceModule}
            {childrenComponents?.financialModule}
            {childrenComponents?.commercialCrm}
            {childrenComponents?.commercialReport}
          </div>
        )}

        {/* ROLE 7: SYSTEM ADMINISTRATOR ENCLAVE */}
        {currentUser.role === 'SYSTEM_ADMIN' && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-3xs font-mono font-bold">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>SYSTEM ADMINISTRATOR & SRE COMMAND ENCLAVE</span>
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-2">
                    System Administration & Infrastructure Control
                  </h2>
                  <p className="text-xs text-slate-300 max-w-3xl mt-1">
                    Restricted administration view containing live GIS spatial telemetry, hardware device specifications, device lifecycle provisioning, and cloud operations.
                  </p>
                </div>

                {onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab('release')}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs font-mono transition shadow-lg shadow-emerald-500/20 shrink-0 flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>GA Release Console →</span>
                  </button>
                )}
              </div>

              {/* System Admin Sub-tabs */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 font-mono text-xs">
                {[
                  { id: 'gis', label: 'GIS Live Map', icon: MapPin },
                  { id: 'hardware', label: 'Hardware Specs', icon: Cpu },
                  { id: 'lifecycle', label: 'Device Lifecycle', icon: Wrench },
                  { id: 'crm', label: 'Enterprise Pipeline', icon: Building2 },
                  { id: 'reports', label: 'Compliance Reports', icon: FileText }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = adminTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id as any)}
                      className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Admin Active Tab View */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              {adminTab === 'gis' && (childrenComponents?.gisDashboard || <GisDashboard />)}
              {adminTab === 'hardware' && <HardwareShowcase />}
              {adminTab === 'lifecycle' && (childrenComponents?.deviceLifecycle || <DeviceLifecycleModule />)}
              {adminTab === 'crm' && (childrenComponents?.commercialCrm || <CommercialCRMModule />)}
              {adminTab === 'reports' && (childrenComponents?.commercialReport || <CommercialCertificationReport />)}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
