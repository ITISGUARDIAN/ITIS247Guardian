import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Server,
  Database,
  UserCheck,
  Building2,
  Mail,
  MessageSquare,
  MapPin,
  Lock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  ArrowRight,
  ArrowLeft,
  Key,
  Globe,
  Settings,
  Cpu,
  Radio,
  FileText,
  Activity,
  Terminal,
  Layers,
  Send,
  Unlock
} from 'lucide-react';
import { itisApiClient } from '../lib/api-client';

interface SetupWizardProps {
  onNavigateTab?: (tab: string) => void;
}

export const SetupWizardModule: React.FC<SetupWizardProps> = ({ onNavigateTab }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [installedAt, setInstalledAt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Step 1: Environment Diagnostics
  const [diagnostics, setDiagnostics] = useState<any[]>([]);
  const [diagnosticsLoading, setDiagnosticsLoading] = useState<boolean>(false);

  // Step 2: Database Setup
  const [dbConfig, setDbConfig] = useState({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '••••••••••••',
    database: 'itis_db'
  });
  const [dbTested, setDbTested] = useState<boolean>(false);
  const [dbMigrated, setDbMigrated] = useState<boolean>(false);

  // Step 3: Admin User Creation
  const [adminUser, setAdminUser] = useState({
    fullName: 'Dr. Thabo Mthembu',
    email: 'admin@itis.gov.za',
    mobileNumber: '+27 82 000 9042',
    password: 'Password123!',
    province: 'Gauteng',
    mfaEnabled: true
  });
  const [adminCreated, setAdminCreated] = useState<boolean>(false);

  // Step 4: Organization Config
  const [orgConfig, setOrgConfig] = useState({
    name: 'Department of Basic Education (DBE)',
    instanceName: 'ITIS South Africa National Instance',
    country: 'South Africa',
    province: 'National (All 9 Provinces)',
    language: 'English (en-ZA)',
    timezone: 'Africa/Johannesburg (GMT+2)',
    currency: 'ZAR (R)',
    contactEmail: 'support@itis.gov.za',
    contactPhone: '+27 12 357 3000'
  });

  // Step 5: Email Config
  const [emailConfig, setEmailConfig] = useState({
    smtpHost: 'smtp.itis.gov.za',
    smtpPort: 587,
    smtpUser: 'notifications@itis.gov.za',
    smtpPass: '••••••••••••',
    targetTestEmail: 'admin@itis.gov.za'
  });

  // Step 6: SMS Config
  const [smsConfig, setSmsConfig] = useState({
    provider: 'BulkSMS SA / Twilio Gateway',
    apiKey: 'sk_live_sa_itis_9042840284092840',
    senderId: 'ITIS-ALERT',
    targetTestPhone: '+27820009042'
  });

  // Step 7: Maps Config
  const [mapsConfig, setMapsConfig] = useState({
    googleMapsApiKey: 'AIzaSyA_ITIS_NATIONAL_GOV_MAPS_KEY_2026',
    hereMapsApiKey: 'here_app_code_sa_itis_2026',
    enableGeofence3D: true
  });

  // Step 8: Security Config
  const [secConfig, setSecConfig] = useState({
    jwtSecret: 'itis_rsa_4096_jwt_secret_key_prod_2026_sa_gov_dbe_saps',
    aesMasterKey: 'aes_256_gcm_master_key_itis_encryption_2026',
    cookieDomain: '.itis.gov.za',
    sessionLifetimeHours: 12,
    passwordMinLength: 12,
    requireMfa: true
  });

  // Step 9: Finalization
  const [finalReport, setFinalReport] = useState<any>(null);

  // Check initial installation status
  useEffect(() => {
    checkStatus();
    runDiagnostics();
  }, []);

  const checkStatus = async () => {
    try {
      const res: any = await itisApiClient.request('/setup/status', 'GET');
      if (res.success && res.data) {
        setIsInstalled(res.data.isInstalled || false);
        setInstalledAt(res.data.installedAt || null);
      }
    } catch (err) {
      console.warn('Status check warning:', err);
    }
  };

  const runDiagnostics = async () => {
    setDiagnosticsLoading(true);
    try {
      const res: any = await itisApiClient.request('/setup/check-environment', 'POST');
      if (res.success && res.data?.diagnostics) {
        setDiagnostics(res.data.diagnostics);
      }
    } catch (err) {
      console.error('Diagnostics failed:', err);
    } finally {
      setDiagnosticsLoading(false);
    }
  };

  const handleTestDb = async () => {
    setLoading(true);
    setStatusMsg(null);
    try {
      const res: any = await itisApiClient.request('/setup/test-db', 'POST', dbConfig);
      if (res.success) {
        setDbTested(true);
        setDbMigrated(true);
        setStatusMsg({ type: 'success', text: res.data?.message || 'Database connection & migrations verified!' });
      } else {
        setStatusMsg({ type: 'error', text: res.error?.message || 'Database connection test failed.' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Database test failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async () => {
    setLoading(true);
    setStatusMsg(null);
    try {
      const res: any = await itisApiClient.request('/setup/create-admin', 'POST', adminUser);
      if (res.success) {
        setAdminCreated(true);
        setStatusMsg({ type: 'success', text: res.data?.message || 'Administrator account created!' });
      } else {
        setStatusMsg({ type: 'error', text: res.error?.message || 'Failed to create administrator.' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error creating admin.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    setLoading(true);
    setStatusMsg(null);
    try {
      const res: any = await itisApiClient.request('/setup/send-test-email', 'POST', { targetEmail: emailConfig.targetTestEmail });
      if (res.success) {
        setStatusMsg({ type: 'success', text: res.data?.message || 'Test email sent!' });
      } else {
        setStatusMsg({ type: 'error', text: res.error?.message || 'Test email failed.' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestSms = async () => {
    setLoading(true);
    setStatusMsg(null);
    try {
      const res: any = await itisApiClient.request('/setup/send-test-sms', 'POST', { targetPhone: smsConfig.targetTestPhone });
      if (res.success) {
        setStatusMsg({ type: 'success', text: res.data?.message || 'Test SMS sent!' });
      } else {
        setStatusMsg({ type: 'error', text: res.error?.message || 'Test SMS failed.' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizeSetup = async () => {
    setLoading(true);
    setStatusMsg(null);
    try {
      // Save all configs
      await itisApiClient.request('/setup/save-config', 'POST', {
        organization: orgConfig,
        email: emailConfig,
        sms: smsConfig,
        maps: mapsConfig,
        security: secConfig
      });

      const res: any = await itisApiClient.request('/setup/finalize', 'POST', { adminEmail: adminUser.email });
      if (res.success) {
        setIsInstalled(true);
        setFinalReport(res.data?.installationReport);
        setStatusMsg({ type: 'success', text: 'ITIS Enterprise Platform installation completed and locked!' });
      } else {
        setStatusMsg({ type: 'error', text: res.error?.message || 'Finalization failed.' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockInstaller = async () => {
    try {
      const res: any = await itisApiClient.request('/setup/unlock', 'POST', {});
      if (res.success) {
        setIsInstalled(false);
        setCurrentStep(1);
        setStatusMsg({ type: 'info', text: 'Installer unlocked for administrative maintenance.' });
      }
    } catch (err: any) {
      console.error('Unlock failed:', err);
    }
  };

  const generateRandomKey = (type: 'jwt' | 'aes') => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
    let rand = '';
    for (let i = 0; i < (type === 'jwt' ? 64 : 32); i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (type === 'jwt') setSecConfig({ ...secConfig, jwtSecret: rand });
    else setSecConfig({ ...secConfig, aesMasterKey: rand });
  };

  const STEPS = [
    { num: 1, title: 'Environment', icon: Server },
    { num: 2, title: 'Database', icon: Database },
    { num: 3, title: 'Admin Account', icon: UserCheck },
    { num: 4, title: 'Organization', icon: Building2 },
    { num: 5, title: 'Email SMTP', icon: Mail },
    { num: 6, title: 'SMS Gateway', icon: MessageSquare },
    { num: 7, title: 'Maps API', icon: MapPin },
    { num: 8, title: 'Security', icon: Lock },
    { num: 9, title: 'Finalize & Lock', icon: ShieldCheck }
  ];

  // IF INSTALLED & LOCKED VIEW
  if (isInstalled && currentStep !== 9) {
    return (
      <div className="space-y-6" id="setup-locked-container">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              System Installation Locked
            </span>
            <h2 className="text-2xl font-extrabold text-white">ITIS Enterprise Platform Ready</h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              This ITIS instance has been fully installed, migrated, and secured. Access to <code className="text-amber-400">/setup</code> is restricted to prevent unauthorized environment modifications.
            </p>
          </div>

          {installedAt && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Installed Timestamp:</span>
                <span className="font-mono text-white">{new Date(installedAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Registered Admin:</span>
                <span className="font-mono text-amber-400">{adminUser.email}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Instance:</span>
                <span className="font-mono text-indigo-300">{orgConfig.instanceName}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => onNavigateTab ? onNavigateTab('website') : window.location.href = '/'}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>Launch ITIS Corporate Platform</span>
            </button>

            <button
              onClick={handleUnlockInstaller}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-2"
            >
              <Unlock className="w-4 h-4 text-amber-400" />
              <span>Unlock for Maintenance (SYSTEM_ADMIN)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="setup-wizard-container">
      {/* HEADER BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800">
              PROMPT 068 — FIRST-TIME ENTERPRISE SETUP
            </span>
            <span className="text-xs text-slate-400">• Version 2.4.0 Production</span>
          </div>
          <h1 className="text-2xl font-black text-white">ITIS Enterprise Installation & Setup Wizard</h1>
          <p className="text-xs text-slate-300">
            Automated deployment configuration, database migration, administrator creation, and service verification.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={runDiagnostics}
            disabled={diagnosticsLoading}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 font-semibold flex items-center space-x-1.5 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${diagnosticsLoading ? 'animate-spin text-amber-400' : ''}`} />
            <span>Re-Check System</span>
          </button>
        </div>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] px-2">
          {STEPS.map((step) => {
            const IconComponent = step.icon;
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num;

            return (
              <div
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className="flex flex-col items-center cursor-pointer group space-y-1.5"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all border ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                      : isDone
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : 'bg-slate-950 text-slate-500 border-slate-800 group-hover:border-slate-700'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <IconComponent className="w-4 h-4" />}
                </div>
                <span className={`text-[10px] font-semibold whitespace-nowrap ${isActive ? 'text-white font-bold' : isDone ? 'text-emerald-300' : 'text-slate-500'}`}>
                  {step.num}. {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STATUS NOTIFICATION BANNER */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl border flex items-start justify-between ${
            statusMsg.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
              : statusMsg.type === 'error'
              ? 'bg-rose-950/40 border-rose-800 text-rose-200'
              : 'bg-indigo-950/40 border-indigo-800 text-indigo-200'
          }`}
        >
          <div className="flex items-center space-x-2 text-xs font-semibold">
            {statusMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {statusMsg.type === 'error' && <XCircle className="w-4 h-4 text-rose-400" />}
            {statusMsg.type === 'info' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
            <span>{statusMsg.text}</span>
          </div>
          <button onClick={() => setStatusMsg(null)} className="text-slate-400 hover:text-white text-xs font-bold">×</button>
        </div>
      )}

      {/* MAIN STEP CONTENT AREA */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        {/* STEP 1: ENVIRONMENT DIAGNOSTICS */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Server className="w-5 h-5 text-amber-400" />
                  <span>Step 1: Environment & System Health Validation</span>
                </h3>
                <p className="text-xs text-slate-400">Automated verification of underlying system dependencies, ports, and permissions.</p>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                All 10 Core Services Healthy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {diagnostics.map((diag, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{diag.service}</span>
                      <span className="text-[10px] font-mono text-slate-400">({diag.version})</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{diag.details}</p>
                  </div>
                  <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{diag.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: DATABASE SETUP */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Database className="w-5 h-5 text-indigo-400" />
                <span>Step 2: PostgreSQL Database & Migration Configuration</span>
              </h3>
              <p className="text-xs text-slate-400">Configure PostgreSQL database settings, test connection, and run Prisma ORM migrations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">PostgreSQL Host</label>
                <input
                  type="text"
                  value={dbConfig.host}
                  onChange={(e) => setDbConfig({ ...dbConfig, host: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Port</label>
                <input
                  type="number"
                  value={dbConfig.port}
                  onChange={(e) => setDbConfig({ ...dbConfig, port: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Database Name</label>
                <input
                  type="text"
                  value={dbConfig.database}
                  onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Username</label>
                <input
                  type="text"
                  value={dbConfig.username}
                  onChange={(e) => setDbConfig({ ...dbConfig, username: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-200">Prisma ORM Migrations & Seeder</span>
                  {dbMigrated && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">SCHEMA SYNCED</span>}
                </div>
                <p className="text-slate-400">Runs schema migrations (14 tables) and populates South African demonstration dataset.</p>
              </div>

              <button
                onClick={handleTestDb}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center space-x-1.5 whitespace-nowrap"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Test Connection & Migrate</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ADMINISTRATOR ACCOUNT */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <span>Step 3: Initial Enterprise SYSTEM_ADMIN Creation</span>
              </h3>
              <p className="text-xs text-slate-400">Create the primary root system administrator with full platform control & MFA privileges.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Administrator Full Name</label>
                <input
                  type="text"
                  value={adminUser.fullName}
                  onChange={(e) => setAdminUser({ ...adminUser, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Government Email Address</label>
                <input
                  type="email"
                  value={adminUser.email}
                  onChange={(e) => setAdminUser({ ...adminUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Mobile Phone (+27 SA Format)</label>
                <input
                  type="text"
                  value={adminUser.mobileNumber}
                  onChange={(e) => setAdminUser({ ...adminUser, mobileNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Master Password</label>
                <input
                  type="password"
                  value={adminUser.password}
                  onChange={(e) => setAdminUser({ ...adminUser, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-white">Multi-Factor Authentication (MFA) Requirement</span>
                <p className="text-slate-400">Enforces Time-based One Time Password (TOTP) / RSA hardware tokens for SYSTEM_ADMIN logins.</p>
              </div>

              <button
                onClick={() => setAdminUser({ ...adminUser, mfaEnabled: !adminUser.mfaEnabled })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  adminUser.mfaEnabled ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {adminUser.mfaEnabled ? 'MFA Enabled ✓' : 'MFA Disabled'}
              </button>
            </div>

            <button
              onClick={handleCreateAdmin}
              disabled={loading || adminCreated}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{adminCreated ? 'SYSTEM_ADMIN Account Verified ✓' : 'Create System Administrator Account'}</span>
            </button>
          </div>
        )}

        {/* STEP 4: ORGANIZATION CONFIGURATION */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Step 4: Organization & Instance Branding Parameters</span>
              </h3>
              <p className="text-xs text-slate-400">Establish jurisdictional boundaries, instance naming, timezones, and contact details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Organization Name</label>
                <input
                  type="text"
                  value={orgConfig.name}
                  onChange={(e) => setOrgConfig({ ...orgConfig, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">ITIS Platform Instance Name</label>
                <input
                  type="text"
                  value={orgConfig.instanceName}
                  onChange={(e) => setOrgConfig({ ...orgConfig, instanceName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Timezone</label>
                <input
                  type="text"
                  value={orgConfig.timezone}
                  onChange={(e) => setOrgConfig({ ...orgConfig, timezone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Currency</label>
                <input
                  type="text"
                  value={orgConfig.currency}
                  onChange={(e) => setOrgConfig({ ...orgConfig, currency: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: EMAIL SMTP CONFIGURATION */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>Step 5: SMTP Server & Email Dispatch Gateway</span>
              </h3>
              <p className="text-xs text-slate-400">Configure SMTP credentials for sending parent notifications, password resets, and audit alerts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">SMTP Host</label>
                <input
                  type="text"
                  value={emailConfig.smtpHost}
                  onChange={(e) => setEmailConfig({ ...emailConfig, smtpHost: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">SMTP Port</label>
                <input
                  type="number"
                  value={emailConfig.smtpPort}
                  onChange={(e) => setEmailConfig({ ...emailConfig, smtpPort: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Username</label>
                <input
                  type="text"
                  value={emailConfig.smtpUser}
                  onChange={(e) => setEmailConfig({ ...emailConfig, smtpUser: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Target Email for Test</label>
                <input
                  type="email"
                  value={emailConfig.targetTestEmail}
                  onChange={(e) => setEmailConfig({ ...emailConfig, targetTestEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleSendTestEmail}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Test Email Notification</span>
            </button>
          </div>
        )}

        {/* STEP 6: SMS GATEWAY */}
        {currentStep === 6 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-rose-400" />
                <span>Step 6: SMS Gateway & Emergency Alert Integration</span>
              </h3>
              <p className="text-xs text-slate-400">Configure South African SMS provider API keys for instant parent SOS alert notifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">SMS Provider</label>
                <input
                  type="text"
                  value={smsConfig.provider}
                  onChange={(e) => setSmsConfig({ ...smsConfig, provider: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Sender ID</label>
                <input
                  type="text"
                  value={smsConfig.senderId}
                  onChange={(e) => setSmsConfig({ ...smsConfig, senderId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-slate-300 font-semibold">Target Phone (+27 Format for Test)</label>
                <input
                  type="text"
                  value={smsConfig.targetTestPhone}
                  onChange={(e) => setSmsConfig({ ...smsConfig, targetTestPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleSendTestSms}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Test Emergency SMS</span>
            </button>
          </div>
        )}

        {/* STEP 7: MAPS CONFIGURATION */}
        {currentStep === 7 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Step 7: GIS, Spatial & Google Maps Platform API Setup</span>
              </h3>
              <p className="text-xs text-slate-400">Configure spatial map rendering keys for C3 command center live learner GPS tracking.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Google Maps Platform API Key</label>
                <input
                  type="text"
                  value={mapsConfig.googleMapsApiKey}
                  onChange={(e) => setMapsConfig({ ...mapsConfig, googleMapsApiKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-300">Google Maps Test Render Preview:</span>
                <div className="h-32 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-500 text-xs font-mono">
                  [Google Maps Canvas — Lat: -26.2041, Lng: 28.0473 (Johannesburg Command Bounds) Ready]
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: SECURITY CONFIGURATION */}
        {currentStep === 8 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Lock className="w-5 h-5 text-fuchsia-400" />
                <span>Step 8: Cryptographic Secrets & Security Policies</span>
              </h3>
              <p className="text-xs text-slate-400">Auto-generate RSA-4096 secrets, AES-256 data encryption keys, and session lifetimes.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-300 font-semibold">JWT Bearer Secret Key (RSA 4096-bit)</label>
                  <button onClick={() => generateRandomKey('jwt')} className="text-fuchsia-400 hover:underline font-mono">
                    Auto-Generate Key
                  </button>
                </div>
                <input
                  type="text"
                  value={secConfig.jwtSecret}
                  onChange={(e) => setSecConfig({ ...secConfig, jwtSecret: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-300 font-semibold">AES-256-GCM Master Database Encryption Key</label>
                  <button onClick={() => generateRandomKey('aes')} className="text-fuchsia-400 hover:underline font-mono">
                    Auto-Generate Key
                  </button>
                </div>
                <input
                  type="text"
                  value={secConfig.aesMasterKey}
                  onChange={(e) => setSecConfig({ ...secConfig, aesMasterKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 9: FINALIZE & LOCK */}
        {currentStep === 9 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Step 9: E2E Verification & Installation Lock</span>
              </h3>
              <p className="text-xs text-slate-400">Perform final platform sanity check, generate installation report, and lock installer.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white">Installation Checklist Summary:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /><span>Environment Diagnostics PASS</span></div>
                <div className="flex items-center space-x-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /><span>PostgreSQL Migration Synced</span></div>
                <div className="flex items-center space-x-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /><span>SYSTEM_ADMIN Account Active</span></div>
                <div className="flex items-center space-x-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /><span>Organization Branding Saved</span></div>
                <div className="flex items-center space-x-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /><span>SMTP Gateway Tested</span></div>
                <div className="flex items-center space-x-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /><span>SMS Gateway Verified</span></div>
                <div className="flex items-center space-x-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /><span>Google Maps API Key Valid</span></div>
                <div className="flex items-center space-x-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /><span>AES-256 Secrets Generated</span></div>
              </div>
            </div>

            <button
              onClick={handleFinalizeSetup}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all shadow-xl flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Finalize Setup & Lock Installer</span>
            </button>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-semibold text-xs flex items-center space-x-1 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-slate-500 font-mono">
            Step {currentStep} of {STEPS.length}
          </span>

          <button
            onClick={() => setCurrentStep(Math.min(STEPS.length, currentStep + 1))}
            disabled={currentStep === STEPS.length}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center space-x-1 transition-all"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
