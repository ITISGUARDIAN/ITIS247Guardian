import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Key, 
  Lock, 
  Laptop, 
  Building2, 
  UserPlus, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  Activity, 
  Sliders, 
  FileText, 
  Award, 
  Trash2, 
  UserX, 
  ShieldAlert, 
  Cpu, 
  Terminal, 
  KeyRound, 
  Layers, 
  Clock, 
  Fingerprint,
  Zap,
  Radio
} from 'lucide-react';
import { identityService } from '../../lib/auth/IdentityService';
import { 
  EnterpriseUser, 
  TenantConfig, 
  ActiveSession, 
  PasswordPolicyConfig, 
  SecurityEventLog, 
  IdentityCertificationReport 
} from '../../lib/auth/types';

export function IdentityDashboard() {
  const [activeTab, setActiveTab] = useState<'directory' | 'federation' | 'sessions' | 'policy' | 'soc' | 'report'>('directory');

  const [users, setUsers] = useState<EnterpriseUser[]>(identityService.getUsers());
  const [tenants, setTenants] = useState<TenantConfig[]>(identityService.getTenants());
  const [sessions, setSessions] = useState<ActiveSession[]>(identityService.getActiveSessions());
  const [policy, setPolicy] = useState<PasswordPolicyConfig>(identityService.getPasswordPolicy());
  const [secLogs, setSecLogs] = useState<SecurityEventLog[]>(identityService.getSecurityEvents());
  const [report] = useState<IdentityCertificationReport>(identityService.getCertificationReport());

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [threatStatusMsg, setThreatStatusMsg] = useState('');

  const refreshData = () => {
    setUsers(identityService.getUsers());
    setTenants(identityService.getTenants());
    setSessions(identityService.getActiveSessions());
    setPolicy(identityService.getPasswordPolicy());
    setSecLogs(identityService.getSecurityEvents());
  };

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  const handleUserStatusChange = (userId: string, newStatus: EnterpriseUser['status']) => {
    identityService.updateUserStatus(userId, newStatus);
    refreshData();
  };

  const handleRoleReassign = (userId: string, newRole: EnterpriseUser['role']) => {
    identityService.assignUserRole(userId, newRole);
    refreshData();
  };

  const handleRevokeSession = (sessionId: string) => {
    identityService.revokeSession(sessionId);
    refreshData();
  };

  const msgTimeoutRef = React.useRef<any>(null);

  useEffect(() => {
    return () => {
      if (msgTimeoutRef.current) clearTimeout(msgTimeoutRef.current);
    };
  }, []);

  const setStatus = (msg: string) => {
    setThreatStatusMsg(msg);
    if (msgTimeoutRef.current) clearTimeout(msgTimeoutRef.current);
    msgTimeoutRef.current = setTimeout(() => setThreatStatusMsg(''), 4000);
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    identityService.updatePasswordPolicy(policy);
    setStatus('Enterprise Password & Credential Policy updated successfully.');
  };

  const handleTriggerSimulatedThreat = (type: SecurityEventLog['eventType']) => {
    const event = identityService.triggerSimulatedThreat(type);
    setStatus(`Simulated Security Incident Triggered: ${event.eventType} (${event.severity})`);
    refreshData();
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.tenantName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ENTERPRISE IDENTITY & SSO FEDERATION</span>
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
                OIDC + SAML 2.0 MULTI-TENANT
              </span>
            </div>
            <h2 className="text-3xl font-black text-white font-sans tracking-tight">
              Enterprise Identity & SSO Administration Console
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl font-sans leading-relaxed">
              Centralized IAM orchestrator unifying Microsoft Entra ID, Google Workspace, SAPS PKI, and TOTP/SMS Multi-Factor Authentication across schools, government departments, and response agencies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="px-4 py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-mono font-bold text-xs rounded-xl transition shadow-lg shadow-purple-500/20 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Directory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin border-b border-slate-800">
        {[
          { id: 'directory', label: 'User Directory', icon: Users },
          { id: 'federation', label: 'SSO & Tenants', icon: Building2 },
          { id: 'sessions', label: `Active Sessions (${sessions.length})`, icon: Laptop },
          { id: 'policy', label: 'Password Policies & MFA', icon: Lock },
          { id: 'soc', label: 'SOC Security Monitoring', icon: ShieldAlert },
          { id: 'report', label: 'E03 Certification', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-purple-500 text-slate-950 font-bold shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: USER DIRECTORY & LIFECYCLE */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input 
                type="text"
                placeholder="Search name, email or tenant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white w-full md:w-72"
              />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              >
                <option value="ALL">All Enterprise Roles</option>
                <option value="NATIONAL_ADMIN">National Admin</option>
                <option value="PROVINCIAL_COMMAND">Provincial Command</option>
                <option value="SCHOOL_ADMIN">School Admin</option>
                <option value="SAPS_RESPONDER">SAPS Responder</option>
                <option value="TEACHER">Teacher</option>
                <option value="PARENT">Parent</option>
              </select>
            </div>
            <span className="text-slate-400 text-2xs">Showing {filteredUsers.length} of {users.length} authenticated enterprise identities</span>
          </div>

          {/* User Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-2xs">
                    <th className="pb-3">IDENTITY / EMAIL</th>
                    <th className="pb-3">ORGANIZATION / TENANT</th>
                    <th className="pb-3">ENTERPRISE ROLE</th>
                    <th className="pb-3">MFA STATUS</th>
                    <th className="pb-3">RISK SCORE</th>
                    <th className="pb-3">LIFECYCLE STATUS</th>
                    <th className="pb-3 text-right">LIFECYCLE ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3.5 space-y-0.5">
                        <span className="font-bold text-white block">{user.fullName}</span>
                        <span className="text-2xs text-slate-400 block">{user.email}</span>
                      </td>
                      <td className="py-3 text-slate-300 font-sans">{user.tenantName}</td>
                      <td className="py-3">
                        <select 
                          value={user.role}
                          onChange={(e) => handleRoleReassign(user.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-2xs font-mono text-purple-300 font-bold"
                        >
                          <option value="NATIONAL_ADMIN">NATIONAL_ADMIN</option>
                          <option value="PROVINCIAL_COMMAND">PROVINCIAL_COMMAND</option>
                          <option value="SCHOOL_ADMIN">SCHOOL_ADMIN</option>
                          <option value="SAPS_RESPONDER">SAPS_RESPONDER</option>
                          <option value="TEACHER">TEACHER</option>
                          <option value="PARENT">PARENT</option>
                        </select>
                      </td>
                      <td className="py-3">
                        {user.mfaEnabled ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-fit">
                            <ShieldCheck className="w-3 h-3" /> {user.mfaMethod?.toUpperCase()}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 w-fit">
                            UNENFORCED
                          </span>
                        )}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          user.riskScore > 50 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                        }`}>
                          Risk: {user.riskScore}/100
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          user.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-1">
                        {user.status === 'ACTIVE' ? (
                          <button
                            onClick={() => handleUserStatusChange(user.id, 'SUSPENDED')}
                            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded text-2xs font-bold transition"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserStatusChange(user.id, 'ACTIVE')}
                            className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded text-2xs font-bold transition"
                          >
                            Reactivate
                          </button>
                        )}
                        <button
                          onClick={() => handleUserStatusChange(user.id, 'TERMINATED')}
                          className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded text-2xs font-bold transition"
                        >
                          Terminate
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

      {/* TAB 2: SSO & TENANTS */}
      {activeTab === 'federation' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg">Federated Organization Identity Tenants</h3>
              <p className="text-xs text-slate-400">External Identity Providers (IdP) integrated via OpenID Connect (OIDC) and SAML 2.0.</p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
              {tenants.length} Tenants Connected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {tenants.map((t) => (
              <div key={t.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-white text-sm block font-sans">{t.name}</span>
                    <span className="text-2xs text-purple-300 block">Domain: @{t.domain}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
                    {t.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-2xs bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">SSO Provider:</span>
                    <span className="text-white font-bold uppercase">{t.ssoProvider.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Protocol:</span>
                    <span className="text-cyan-300 font-bold uppercase">{t.ssoProtocol}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">MFA Policy:</span>
                    <span className="text-emerald-400 font-bold">{t.mfaEnforced ? 'ENFORCED' : 'OPTIONAL'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">User Count:</span>
                    <span className="text-amber-300 font-bold">{t.userCount.toLocaleString()} Users</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVE SESSIONS */}
      {activeTab === 'sessions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Laptop className="w-5 h-5 text-purple-400" /> Active Enterprise Sessions & Device Fingerprints
            </h3>
            <p className="text-xs text-slate-400">Real-time session monitoring with remote instant session revocation controls.</p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {sessions.map((sess) => (
              <div key={sess.sessionId} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{sess.userName}</span>
                    <span className="text-2xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">{sess.loginMethod}</span>
                    {sess.isCurrentSession && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">CURRENT SESSION</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-2xs">{sess.deviceFingerprint}</p>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500">
                    <span>IP: {sess.ipAddress}</span>
                    <span>Location: {sess.location}</span>
                    <span>Issued: {new Date(sess.issuedAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleRevokeSession(sess.sessionId)}
                    className="px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-2xs rounded-lg transition flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Revoke Remote Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PASSWORD & CREDENTIAL POLICIES */}
      {activeTab === 'policy' && (
        <form onSubmit={handleSavePolicy} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl font-mono text-xs">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white text-lg">Enterprise Credential & Password Governance</h3>
            <p className="text-xs text-slate-400 font-sans">Configure system-wide password complexity, lockout thresholds, and session timeout parameters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="font-bold text-purple-300 uppercase">Complexity & Expiry Rules</h4>
              
              <div className="space-y-1">
                <label className="text-slate-400 block">Minimum Password Length:</label>
                <input 
                  type="number"
                  value={policy.minLength}
                  onChange={(e) => setPolicy({ ...policy, minLength: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Password Rotation (Days):</label>
                <input 
                  type="number"
                  value={policy.rotationDays}
                  onChange={(e) => setPolicy({ ...policy, rotationDays: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={policy.requireUppercase}
                    onChange={(e) => setPolicy({ ...policy, requireUppercase: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-slate-200">Require Uppercase & Symbols</span>
                </label>
              </div>
            </div>

            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="font-bold text-cyan-300 uppercase">Lockout & Session Timeouts</h4>

              <div className="space-y-1">
                <label className="text-slate-400 block">Max Failed Login Attempts Before Lockout:</label>
                <input 
                  type="number"
                  value={policy.maxFailedAttempts}
                  onChange={(e) => setPolicy({ ...policy, maxFailedAttempts: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Inactivity Session Timeout (Minutes):</label>
                <input 
                  type="number"
                  value={policy.sessionTimeoutMinutes}
                  onChange={(e) => setPolicy({ ...policy, sessionTimeoutMinutes: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
                />
              </div>
            </div>
          </div>

          {threatStatusMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{threatStatusMsg}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-purple-500/20 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" /> Save Credential Policies
            </button>
          </div>
        </form>
      )}

      {/* TAB 5: SOC SECURITY MONITORING */}
      {activeTab === 'soc' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl font-mono text-xs">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2 text-rose-400">
                <ShieldAlert className="w-5 h-5" /> Security Operations Centre (SOC) Intrusion Monitor
              </h3>
              <p className="text-xs text-slate-400 font-sans">Automated detection for brute-force attacks, impossible travel, and credential stuffing.</p>
            </div>
          </div>

          {/* Trigger Simulation Test Buttons */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 text-2xs block uppercase font-bold">Simulate Security Incident Test:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTriggerSimulatedThreat('BRUTE_FORCE_DETECTED')}
                className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded text-2xs font-bold transition"
              >
                + Trigger Brute-Force Attack
              </button>
              <button
                onClick={() => handleTriggerSimulatedThreat('IMPOSSIBLE_TRAVEL')}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded text-2xs font-bold transition"
              >
                + Trigger Impossible Travel
              </button>
              <button
                onClick={() => handleTriggerSimulatedThreat('CREDENTIAL_STUFFING')}
                className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded text-2xs font-bold transition"
              >
                + Trigger Credential Stuffing
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {secLogs.map((log) => (
              <div key={log.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-300">{log.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {log.eventType} ({log.severity})
                    </span>
                  </div>
                  <span className="text-slate-500 text-2xs">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-slate-300 text-2xs">
                  Target: {log.email} | Origin IP: {log.ipAddress} ({log.location})
                </div>
                <div className="p-2 bg-slate-900 rounded text-emerald-400 text-2xs font-bold">
                  Action Taken: {log.actionTaken}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: E03 CERTIFICATION REPORT */}
      {activeTab === 'report' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" /> Production Identity & Security Certification
            </h3>
            <p className="text-xs text-slate-400">Formal audit matrix verifying software completion against enterprise tenant prerequisites.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-between font-mono">
              <span className="text-purple-300 font-bold text-sm">IAM SOFTWARE COMPLETION</span>
              <span className="text-2xl font-black text-white">{report.softwareCompletePct}%</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {report.checklist.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{item.title}</span>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      item.status === 'COMPLETE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-2xs font-sans">{item.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
