import React, { useState, useEffect } from 'react';
import {
  Shield,
  KeyRound,
  Lock,
  Mail,
  User,
  Phone,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Clock,
  Smartphone,
  Laptop,
  Globe,
  LogOut,
  Sliders,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Key,
  Users,
  Eye,
  EyeOff,
  Sparkles,
  Send,
  HelpCircle,
  XCircle,
  Copy,
  Check,
  FileText,
  Building,
  Radio,
  Layers,
  ChevronRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  UserRole,
  AuthScreenRoute,
  USER_ROLE_REDIRECTS,
  SAMPLE_TENANTS,
  SAMPLE_ACTIVE_SESSIONS,
  SAMPLE_REGISTERED_DEVICES,
  CRITICAL_AUTH_RULES,
  UserTenantSpec
} from '../data/authData';

export const AuthModule: React.FC = () => {
  // Current active Auth Screen
  const [activeRoute, setActiveRoute] = useState<AuthScreenRoute>('login');

  // Selected User Role for RBAC testing
  const [selectedRole, setSelectedRole] = useState<UserRole>('PARENT');

  // Form Loading & Submission states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);
  const [authErrorMsg, setAuthErrorMsg] = useState<string | null>(null);

  // LOGIN FORM STATE
  const [loginEmail, setLoginEmail] = useState<string>('parent.safety@itis.gov.za');
  const [loginPassword, setLoginPassword] = useState<string>('ItisSafety#2026!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [failedAttemptsCount, setFailedAttemptsCount] = useState<number>(0);
  const [isAccountLocked, setIsAccountLocked] = useState<boolean>(false);
  const [showSuspiciousWarning, setShowSuspiciousWarning] = useState<boolean>(false);

  // REGISTER FORM STATE (Parent self-registration)
  const [registerForm, setRegisterForm] = useState({
    firstName: 'Nompumelelo',
    lastName: 'Mkhize',
    email: 'nompumelelo.mkhize@gmail.com',
    mobile: '+27 83 456 7890',
    password: 'SecureParent#2026',
    confirmPassword: 'SecureParent#2026',
    province: 'Gauteng',
    acceptTerms: true,
    acceptPopia: true,
  });

  // OTP / MFA STATE
  const [otpDigits, setOtpDigits] = useState<string[]>(['8', '4', '2', '9', '1', '6']);
  const [otpTimer, setOtpTimer] = useState<number>(60);
  const [isBackupCodeModalOpen, setIsBackupCodeModalOpen] = useState<boolean>(false);

  // FORGOT / RESET PASSWORD STATE
  const [forgotEmail, setForgotEmail] = useState<string>('principal.dlamini@education.gov.za');
  const [resetPasswordNew, setResetPasswordNew] = useState<string>('Strong#Pass2026!');
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState<string>('Strong#Pass2026!');

  // PROFILE STATE
  const [profileTab, setProfileTab] = useState<'details' | 'security' | 'sessions' | 'devices'>('details');

  // TENANT SELECTION STATE
  const [selectedTenant, setSelectedTenant] = useState<UserTenantSpec>(SAMPLE_TENANTS[0]);

  // Timer countdown effect for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeRoute === 'mfa' || activeRoute === 'verify-otp') {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeRoute]);

  // Password Strength Validator
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // max 6
  };

  const passwordScore = calculatePasswordStrength(resetPasswordNew);

  const { login } = useAuth();

  // HANDLERS
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthErrorMsg(null);
    setAuthSuccessMsg(null);

    if (failedAttemptsCount >= 3) {
      setIsLoading(false);
      setIsAccountLocked(true);
      setAuthErrorMsg('ACCOUNT LOCKED: 3 consecutive invalid authentication failures detected. Security policy enforced.');
      return;
    }

    const res = await login(loginEmail, loginPassword);
    setIsLoading(false);

    if (res.success) {
      setAuthSuccessMsg(`AUTHENTICATION SUCCESSFUL: Verified identity for ${loginEmail}. Redirecting to portal...`);
      setTimeout(() => {
        setActiveRoute('mfa');
      }, 1000);
    } else {
      setAuthErrorMsg('AUTHENTICATION FAILED: Invalid credentials provided.');
    }
  };

  const handleSimulateFailedLogin = () => {
    const nextCount = failedAttemptsCount + 1;
    setFailedAttemptsCount(nextCount);
    if (nextCount >= 3) {
      setIsAccountLocked(true);
      setAuthErrorMsg('SECURITY ALERT: Account locked due to rate limit threshold exceeded (3 failed attempts).');
    } else {
      setAuthErrorMsg(`AUTHENTICATION FAILED: Invalid credentials. Attempt ${nextCount}/3 before account lockout.`);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveRoute('verify-email');
    }, 1000);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveRoute('select-tenant');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 rounded-3xl border border-amber-500/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>PHASE 2 — ENTERPRISE IDENTITY & AUTHENTICATION PORTAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ITIS Identity & <span className="text-amber-400">Access Management (IAM)</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Sovereign RSA single sign-on entry point connecting Parents, Schools, Command Operators, and Emergency Responders to the Prompt 017 NestJS authentication backend architecture.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-amber-800/40">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">11 Roles</span>
              <span className="text-xs text-slate-400 font-medium">RBAC Matrix</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">OAuth2</span>
              <span className="text-xs text-slate-400 font-medium">OIDC Bearer</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">TOTP/MFA</span>
              <span className="text-xs text-slate-400 font-medium">6-Digit Hardware</span>
            </div>
          </div>
        </div>

        {/* AUTH ROUTE NAVIGATION SUB-BAR */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-2 text-xs font-bold">
          {(
            [
              { id: 'login', label: '/login (Enterprise Sign In)', icon: KeyRound },
              { id: 'register', label: '/register (Parent Registration)', icon: UserCheck },
              { id: 'forgot-password', label: '/forgot-password', icon: Mail },
              { id: 'reset-password', label: '/reset-password', icon: Lock },
              { id: 'verify-email', label: '/verify-email', icon: Mail },
              { id: 'verify-otp', label: '/verify-otp & /mfa', icon: ShieldCheck },
              { id: 'select-tenant', label: '/select-tenant', icon: Building },
              { id: 'profile', label: '/profile (User Settings)', icon: User },
              { id: 'access-denied', label: '/access-denied', icon: ShieldAlert },
              { id: 'session-expired', label: '/session-expired', icon: Clock },
            ] as const
          ).map((route) => {
            const IconComp = route.icon;
            const isCurrent = activeRoute === route.id || (route.id === 'verify-otp' && activeRoute === 'mfa');
            return (
              <button
                key={route.id}
                onClick={() => setActiveRoute(route.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 ring-1 ring-amber-300'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <IconComp className="w-3.5 h-3.5 shrink-0" />
                <span>{route.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ROLE SELECTOR TOOLBAR FOR RBAC PREVIEW */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Active Role Context (RBAC Simulator)</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Target Destination: <strong className="text-amber-400">{USER_ROLE_REDIRECTS[selectedRole].targetPortal}</strong>
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {(Object.keys(USER_ROLE_REDIRECTS) as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-2.5 py-1 rounded-lg border font-mono transition-all ${
                selectedRole === r
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC SCREEN ROUTE CONTENT */}

      {/* ROUTE 1: /login */}
      {activeRoute === 'login' && (
        <div className="max-w-xl mx-auto bg-slate-900/95 rounded-3xl border border-amber-500/30 p-8 space-y-6 shadow-2xl relative">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
              <Shield className="w-7 h-7 text-slate-950" />
            </div>
            <h2 className="text-2xl font-black text-white">ITIS Enterprise Sign In</h2>
            <p className="text-xs text-slate-400">Sovereign Republic of South Africa Identity Portal</p>
          </div>

          {/* SUSPICIOUS LOGIN WARNING TRIGGER */}
          <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/60 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Simulate Suspicious Location Alert?</span>
            </div>
            <button
              onClick={() => setShowSuspiciousWarning(!showSuspiciousWarning)}
              className="px-2 py-0.5 rounded bg-amber-800 text-white font-bold hover:bg-amber-700"
            >
              {showSuspiciousWarning ? 'Hide Alert' : 'Trigger Alert'}
            </button>
          </div>

          {showSuspiciousWarning && (
            <div className="p-4 bg-red-950/80 rounded-2xl border border-red-600 text-xs text-red-200 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-red-400">
                <ShieldAlert className="w-4 h-4" />
                <span>SUSPICIOUS LOGIN ATTEMPT DETECTED</span>
              </div>
              <p>Unrecognized device or IP (41.160.88.2 - Cape Town) attempting access. Mandatory 2FA verification required.</p>
            </div>
          )}

          {/* ACCOUNT LOCKED ALERT */}
          {isAccountLocked && (
            <div className="p-4 bg-red-950/90 rounded-2xl border border-red-500 text-xs text-red-200 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-red-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>ACCOUNT TEMPORARILY LOCKED</span>
              </div>
              <p>Exceeded maximum 3 failed authentication attempts. Contact your SITA System Administrator or wait 15 minutes.</p>
              <button
                onClick={() => {
                  setIsAccountLocked(false);
                  setFailedAttemptsCount(0);
                  setAuthErrorMsg(null);
                }}
                className="px-3 py-1 bg-red-900 text-white rounded-lg text-[11px] font-bold hover:bg-red-800"
              >
                Reset Account Lock Simulation
              </button>
            </div>
          )}

          {authErrorMsg && !isAccountLocked && (
            <div className="p-3 bg-red-950/60 rounded-xl border border-red-800 text-xs text-red-300 flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authErrorMsg}</span>
            </div>
          )}

          {authSuccessMsg && (
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800 text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{authSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-medium">
            <div className="space-y-1">
              <label className="text-slate-300 flex justify-between">
                <span>Official Email / Username</span>
                <span className="text-amber-400 font-mono text-[10px]">Role: {selectedRole}</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  placeholder="user@itis.gov.za"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => setActiveRoute('forgot-password')}
                  className="text-amber-400 hover:underline text-[11px]"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                />
                <span>Remember this device</span>
              </label>

              <button
                type="button"
                onClick={handleSimulateFailedLogin}
                className="text-red-400 hover:underline text-[11px]"
              >
                Simulate Bad Password ({failedAttemptsCount}/3)
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || isAccountLocked}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Verifying RSA Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* THIRD PARTY GOVERNMENT FEDERATED SSO PLACEHOLDERS */}
          <div className="pt-4 border-t border-slate-800 space-y-3 text-center">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Or Sign In With Federated Identity
            </span>

            <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
              <button
                disabled
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center space-x-2 cursor-not-allowed opacity-60"
              >
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>Government SSO (SITA GovSSO RSA) — Disabled</span>
              </button>

              <button
                disabled
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center space-x-2 cursor-not-allowed opacity-60"
              >
                <Shield className="w-4 h-4 text-cyan-500" />
                <span>Microsoft Entra ID (Azure AD) — Disabled</span>
              </button>

              <button
                disabled
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center space-x-2 cursor-not-allowed opacity-60"
              >
                <Globe className="w-4 h-4 text-emerald-500" />
                <span>Google Workspace Enterprise — Disabled</span>
              </button>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-400">
            Parents looking to register?{' '}
            <button
              onClick={() => setActiveRoute('register')}
              className="text-amber-400 font-bold hover:underline"
            >
              Self-Register Parent Account
            </button>
          </p>
        </div>
      )}

      {/* ROUTE 2: /register (Parent Self-Registration Only) */}
      {activeRoute === 'register' && (
        <div className="max-w-2xl mx-auto bg-slate-900/95 rounded-3xl border border-amber-500/30 p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <UserCheck className="w-10 h-10 text-amber-400 mx-auto" />
            <h2 className="text-2xl font-black text-white">Parent & Guardian Registration</h2>
            <p className="text-xs text-slate-400">
              Note: School and Government users are created exclusively by System Administrators.
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-medium">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300">First Name *</label>
                <input
                  type="text"
                  required
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Last Name *</label>
                <input
                  type="text"
                  required
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">RSA Mobile Number (for SMS OTP) *</label>
                <input
                  type="tel"
                  required
                  value={registerForm.mobile}
                  onChange={(e) => setRegisterForm({ ...registerForm, mobile: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300">Password *</label>
                <input
                  type="password"
                  required
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Confirm Password *</label>
                <input
                  type="password"
                  required
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Province of Residence *</label>
              <select
                value={registerForm.province}
                onChange={(e) => setRegisterForm({ ...registerForm, province: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Gauteng">Gauteng</option>
                <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                <option value="Western Cape">Western Cape</option>
                <option value="Eastern Cape">Eastern Cape</option>
                <option value="Limpopo">Limpopo</option>
                <option value="Mpumalanga">Mpumalanga</option>
                <option value="Free State">Free State</option>
                <option value="North West">North West</option>
                <option value="Northern Cape">Northern Cape</option>
              </select>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={registerForm.acceptTerms}
                  onChange={(e) => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-amber-500"
                />
                <span>I accept the ITIS Terms of Service and End User License Agreement.</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={registerForm.acceptPopia}
                  onChange={(e) => setRegisterForm({ ...registerForm, acceptPopia: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-amber-500"
                />
                <span>POPIA Consent: I authorize processing of child emergency telemetry under RSA law.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin text-slate-950" /> : <span>Create Account & Send Verification Email</span>}
            </button>
          </form>
        </div>
      )}

      {/* ROUTE 3: /verify-email */}
      {activeRoute === 'verify-email' && (
        <div className="max-w-md mx-auto bg-slate-900/95 rounded-3xl border border-amber-500/30 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Check Your Email</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            We sent a verification link and 6-digit confirmation code to{' '}
            <strong className="text-amber-400">{registerForm.email}</strong>. Please check your inbox.
          </p>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono space-y-2">
            <span className="text-slate-400 block">Verification Code</span>
            <div className="text-2xl font-black text-emerald-400 tracking-widest">8 4 2 9 1 6</div>
          </div>

          <button
            onClick={() => setActiveRoute('verify-otp')}
            className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all"
          >
            Enter Verification Code
          </button>
        </div>
      )}

      {/* ROUTE 4: /verify-otp & /mfa */}
      {(activeRoute === 'verify-otp' || activeRoute === 'mfa') && (
        <div className="max-w-md mx-auto bg-slate-900/95 rounded-3xl border border-amber-500/30 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Multi-Factor Authentication</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Enter the 6-digit PIN sent via SMS or TOTP Authenticator app.
          </p>

          <form onSubmit={handleMfaSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newDigits = [...otpDigits];
                    newDigits[idx] = e.target.value;
                    setOtpDigits(newDigits);
                  }}
                  className="w-10 h-12 rounded-xl bg-slate-950 border border-slate-800 text-center text-lg font-black text-amber-400 focus:outline-none focus:border-amber-500"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Expires in: {otpTimer}s</span>
              </span>

              <button
                type="button"
                onClick={() => setOtpTimer(60)}
                className="text-amber-400 font-bold hover:underline"
              >
                Resend OTP
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin text-slate-950" /> : <span>Verify & Proceed</span>}
            </button>
          </form>

          <button
            onClick={() => setIsBackupCodeModalOpen(true)}
            className="text-xs text-slate-400 hover:text-slate-200 underline"
          >
            Use 8-Character Emergency Backup Code Instead
          </button>

          {/* BACKUP CODE MODAL */}
          {isBackupCodeModalOpen && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-amber-800/80 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-amber-400 font-bold">
                <span>Backup Security Code</span>
                <button onClick={() => setIsBackupCodeModalOpen(false)} className="text-slate-500 hover:text-white">✕</button>
              </div>
              <p className="text-slate-300">Enter your emergency 8-character recovery key:</p>
              <input
                type="text"
                placeholder="XXXX-XXXX"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-bold tracking-widest text-center"
              />
              <button
                onClick={() => {
                  setIsBackupCodeModalOpen(false);
                  setActiveRoute('select-tenant');
                }}
                className="w-full py-2 bg-amber-600 text-white rounded-lg font-bold"
              >
                Authenticate Recovery Code
              </button>
            </div>
          )}
        </div>
      )}

      {/* ROUTE 5: /forgot-password */}
      {activeRoute === 'forgot-password' && (
        <div className="max-w-md mx-auto bg-slate-900/95 rounded-3xl border border-amber-500/30 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Key className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Reset Your Password</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Enter your registered official email address. We will send you a secure password reset link.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setActiveRoute('reset-password');
            }}
            className="space-y-4 text-xs font-medium text-left"
          >
            <div className="space-y-1">
              <label className="text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all"
            >
              Send Secure Reset Link
            </button>
          </form>
        </div>
      )}

      {/* ROUTE 6: /reset-password */}
      {activeRoute === 'reset-password' && (
        <div className="max-w-md mx-auto bg-slate-900/95 rounded-3xl border border-amber-500/30 p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <Lock className="w-10 h-10 text-amber-400 mx-auto" />
            <h2 className="text-2xl font-black text-white">New Password Policy</h2>
            <p className="text-xs text-slate-400">Set a high-entropy password adhering to SITA security standards.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setActiveRoute('login');
            }}
            className="space-y-4 text-xs font-medium"
          >
            <div className="space-y-1">
              <label className="text-slate-300">New Password</label>
              <input
                type="password"
                required
                value={resetPasswordNew}
                onChange={(e) => setResetPasswordNew(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* LIVE PASSWORD STRENGTH METER */}
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Strength Meter:</span>
                <span className="font-bold text-amber-400">{passwordScore}/6 Requirements</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden flex">
                <div
                  className={`h-full transition-all ${
                    passwordScore < 3 ? 'bg-red-500' : passwordScore < 5 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${(passwordScore / 6) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400">
                <p className={resetPasswordNew.length >= 12 ? 'text-emerald-400' : ''}>✓ 12+ Characters</p>
                <p className={/[A-Z]/.test(resetPasswordNew) ? 'text-emerald-400' : ''}>✓ Uppercase Letter</p>
                <p className={/[a-z]/.test(resetPasswordNew) ? 'text-emerald-400' : ''}>✓ Lowercase Letter</p>
                <p className={/[0-9]/.test(resetPasswordNew) ? 'text-emerald-400' : ''}>✓ Number (0-9)</p>
                <p className={/[^A-Za-z0-9]/.test(resetPasswordNew) ? 'text-emerald-400' : ''}>✓ Special Symbol (!@#$)</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Confirm New Password</label>
              <input
                type="password"
                required
                value={resetPasswordConfirm}
                onChange={(e) => setResetPasswordConfirm(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all"
            >
              Update Password & Return to Login
            </button>
          </form>
        </div>
      )}

      {/* ROUTE 7: /select-tenant */}
      {activeRoute === 'select-tenant' && (
        <div className="max-w-3xl mx-auto bg-slate-900/95 rounded-3xl border border-amber-500/30 p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <Building className="w-10 h-10 text-amber-400 mx-auto" />
            <h2 className="text-2xl font-black text-white">Select Active Enterprise Tenant</h2>
            <p className="text-xs text-slate-400">
              Your account has access to multiple circuit jurisdictions. Choose your active session domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAMPLE_TENANTS.map((tenant) => (
              <div
                key={tenant.id}
                onClick={() => setSelectedTenant(tenant)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                  selectedTenant.id === tenant.id
                    ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    {tenant.id}
                  </span>
                  <span className="text-[10px] font-bold text-amber-400">{tenant.type}</span>
                </div>

                <h4 className="text-sm font-bold text-white">{tenant.name}</h4>
                <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>Province: <strong className="text-slate-200">{tenant.province}</strong></span>
                  <span>Active Users: <strong className="text-emerald-400">{tenant.activeUsersCount}</strong></span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveRoute('profile')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center space-x-2"
          >
            <span>Confirm Tenant ({selectedTenant.name}) & Enter Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ROUTE 8: /profile */}
      {activeRoute === 'profile' && (
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                NM
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Nompumelelo Mkhize</h2>
                <p className="text-xs text-amber-400 font-mono font-bold">Role: {selectedRole} | ID: USR-RSA-881024</p>
              </div>
            </div>

            {/* PROFILE NAVIGATION SUBTABS */}
            <div className="flex gap-2 font-mono text-xs">
              <button
                onClick={() => setProfileTab('details')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  profileTab === 'details' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Personal Details
              </button>

              <button
                onClick={() => setProfileTab('security')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  profileTab === 'security' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Security Settings
              </button>

              <button
                onClick={() => setProfileTab('sessions')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  profileTab === 'sessions' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Active Sessions
              </button>

              <button
                onClick={() => setProfileTab('devices')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  profileTab === 'devices' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Registered Devices
              </button>
            </div>
          </div>

          {/* PROFILE SUBTAB 1: DETAILS */}
          {profileTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-medium">
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-amber-400 font-bold block border-b border-slate-800 pb-2">User Identity & Jurisdiction</span>
                <p>Full Name: <strong className="text-white">Nompumelelo Mkhize</strong></p>
                <p>Email: <strong className="text-white">nompumelelo.mkhize@gmail.com</strong></p>
                <p>Mobile: <strong className="text-white">+27 83 456 7890</strong></p>
                <p>Province: <strong className="text-white">Gauteng (GP)</strong></p>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-amber-400 font-bold block border-b border-slate-800 pb-2">Active Circuit Tenant</span>
                <p>Tenant ID: <strong className="text-cyan-300">{selectedTenant.id}</strong></p>
                <p>Tenant Name: <strong className="text-white">{selectedTenant.name}</strong></p>
                <p>Target Portal: <strong className="text-emerald-400">{USER_ROLE_REDIRECTS[selectedRole].targetPortal}</strong></p>
              </div>
            </div>
          )}

          {/* PROFILE SUBTAB 2: SECURITY */}
          {profileTab === 'security' && (
            <div className="space-y-4 text-xs font-medium">
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white">Password & Multi-Factor Security</h4>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Hardware MFA Status: <strong className="text-emerald-400">ENABLED (SMS + TOTP)</strong></span>
                  <button className="px-3 py-1 bg-amber-600 text-white font-bold rounded-lg">Change MFA Device</button>
                </div>
                <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-slate-800">
                  <span>Password Last Changed: <strong className="text-slate-200">14 Days Ago</strong></span>
                  <button onClick={() => setActiveRoute('reset-password')} className="px-3 py-1 bg-slate-800 text-white font-bold rounded-lg">Change Password</button>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE SUBTAB 3: ACTIVE SESSIONS */}
          {profileTab === 'sessions' && (
            <div className="space-y-4 text-xs font-medium">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">Concurrent Active Sessions</span>
                <button className="px-3 py-1.5 bg-red-900 text-white font-bold rounded-xl hover:bg-red-800">
                  Sign Out Of All Other Devices
                </button>
              </div>

              <div className="space-y-3 font-mono">
                {SAMPLE_ACTIVE_SESSIONS.map((ses) => (
                  <div key={ses.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white">{ses.device}</span>
                        {ses.isCurrent && (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                            CURRENT SESSION
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{ses.browser} — {ses.location} ({ses.ipAddress})</p>
                    </div>
                    <span className="text-slate-400 text-[11px]">{ses.lastActive}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE SUBTAB 4: REGISTERED DEVICES */}
          {profileTab === 'devices' && (
            <div className="space-y-3 font-mono text-xs">
              {SAMPLE_REGISTERED_DEVICES.map((dev) => (
                <div key={dev.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white">{dev.deviceName}</h4>
                    <p className="text-slate-400 text-[11px]">Type: {dev.type} | MFA Verified: Yes | Added: {dev.addedDate}</p>
                  </div>
                  <button className="px-3 py-1 bg-slate-800 text-red-400 font-bold rounded-lg hover:bg-red-950">
                    Revoke Device
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ROUTE 9: /access-denied */}
      {activeRoute === 'access-denied' && (
        <div className="max-w-md mx-auto bg-slate-900/95 rounded-3xl border border-red-500/40 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">403 — Access Denied</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your active role <strong className="text-amber-400">{selectedRole}</strong> does not possess the required RBAC permissions to access this sovereign endpoint.
          </p>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400">
            Missing Permission: <strong className="text-red-400">cad.dispatch.override</strong>
          </div>

          <button
            onClick={() => setActiveRoute('login')}
            className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-xl hover:bg-amber-400"
          >
            Return to Login Screen
          </button>
        </div>
      )}

      {/* ROUTE 10: /session-expired */}
      {activeRoute === 'session-expired' && (
        <div className="max-w-md mx-auto bg-slate-900/95 rounded-3xl border border-amber-500/30 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Session Expired</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            For security compliance under SITA sovereign data rules, your session has timed out after 30 minutes of inactivity.
          </p>

          <button
            onClick={() => setActiveRoute('login')}
            className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-xl hover:bg-amber-400"
          >
            Re-Authenticate Session
          </button>
        </div>
      )}

      {/* MANDATORY AUTHENTICATION SECURITY RULES */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-amber-400" />
          <span>10 Mandatory Enterprise Authentication & Identity Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_AUTH_RULES.map((rule) => (
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
