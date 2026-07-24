import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  KeyRound,
  FileCode,
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
  HardDrive,
  EyeOff,
  Crosshair,
  Siren,
  Globe,
  Database,
  QrCode
} from 'lucide-react';
import {
  SAMPLE_ZERO_TRUST_DEVICES,
  SAMPLE_CERTIFICATES,
  SAMPLE_SECRETS,
  SAMPLE_WAF_BLOCKS,
  SAMPLE_SOC_INCIDENTS,
  ECZTDP_CODE_SPECS,
  CRITICAL_ECZTDP_RULES,
  ZeroTrustDevicePosture,
  CertificateRecord,
  SecuritySecret,
  WafBlockEvent,
  SocIncident,
  EcztdpCodeSpec
} from '../data/ecztdpData';

export const EcztdpModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'zero_trust' | 'pki_certs' | 'secrets_vault' | 'waf_gateway' | 'siem_threats' | 'soc_edr' | 'compliance' | 'code_specs' | 'rules_sla'
  >('zero_trust');

  // Zero Trust State
  const [devices, setDevices] = useState<ZeroTrustDevicePosture[]>(SAMPLE_ZERO_TRUST_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<ZeroTrustDevicePosture>(SAMPLE_ZERO_TRUST_DEVICES[0]);

  // Certificates State
  const [certificates, setCertificates] = useState<CertificateRecord[]>(SAMPLE_CERTIFICATES);

  // Secrets State
  const [secrets, setSecrets] = useState<SecuritySecret[]>(SAMPLE_SECRETS);

  // WAF State
  const [wafBlocks, setWafBlocks] = useState<WafBlockEvent[]>(SAMPLE_WAF_BLOCKS);

  // SOC State
  const [socIncidents, setSocIncidents] = useState<SocIncident[]>(SAMPLE_SOC_INCIDENTS);

  // Code Spec State
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<EcztdpCodeSpec>(ECZTDP_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // EDR Isolation Simulation
  const handleIsolateDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.deviceId === deviceId
          ? { ...d, postureStatus: 'ISOLATED_QUARANTINE', trustScore: 0 }
          : d
      )
    );
    addLog(`EDR QUARANTINE ACTION: Device ${deviceId} isolated from network mesh. mTLS revoked.`);
  };

  // Rotate Secret Key
  const handleRotateSecret = (secretId: string) => {
    setSecrets((prev) =>
      prev.map((s) =>
        s.id === secretId
          ? { ...s, version: s.version + 1, lastRotated: 'Just now', status: 'ACTIVE' }
          : s
      )
    );
    addLog(`HSM KEY ROTATION: Secret ${secretId} rotated to v${secrets.find((s) => s.id === secretId)!.version + 1}`);
  };

  // Revoke Certificate
  const handleRevokeCert = (certId: string) => {
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === certId ? { ...c, status: 'REVOKED', ocspStatus: 'REVOKED' } : c
      )
    );
    addLog(`OCSP REVOCATION: X.509 Certificate ${certId} added to CRL list.`);
  };

  // Simulate WAF Attack Interception
  const handleSimulateWafAttack = () => {
    const newBlock: WafBlockEvent = {
      id: `WAF-EV-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString(),
      ipAddress: '197.89.21.104',
      sourceGeo: 'Suspicious IP Block',
      attackVector: 'XSS_INJECTION',
      targetEndpoint: '/api/v1/auth/login?payload=<script>',
      actionTaken: 'BLOCKED_403',
      severity: 'CRITICAL',
    };
    setWafBlocks((prev) => [newBlock, ...prev]);
    addLog(`WAF ATTACK BLOCKED: Intercepted ${newBlock.attackVector} from ${newBlock.ipAddress}. Returned HTTP 403.`);
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-rose-950 to-slate-900 rounded-2xl border border-rose-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-700/50 text-rose-300 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-rose-400" />
              <span>— ENTERPRISE CYBERSECURITY & ZERO TRUST PLATFORM (ECZTDP)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Cybersecurity & <span className="text-rose-400">Zero Trust Defence</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Cross-cutting security platform enforcing NIST SP 800-207 Zero Trust Architecture, ISO 27001/POPIA compliance, X.509 PKI certificate management, WAF API gateway defence, SIEM threat intelligence, and automated EDR endpoint containment across the ITIS platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-rose-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-rose-400">&lt; 1.5s</span>
              <span className="text-xs text-slate-400 font-medium">SOC MTTD</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">AES-256</span>
              <span className="text-xs text-slate-400 font-medium">GCM Encryption</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">100%</span>
              <span className="text-xs text-slate-400 font-medium">mTLS Enforced</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('zero_trust')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'zero_trust'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>1. Zero Trust Continuous Trust Engine</span>
          </button>

          <button
            onClick={() => setActiveSubTab('pki_certs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'pki_certs'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4 text-cyan-400" />
            <span>2. PKI & Certificate Lifecycle</span>
          </button>

          <button
            onClick={() => setActiveSubTab('secrets_vault')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'secrets_vault'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>3. HSM Secrets & Key Rotation</span>
          </button>

          <button
            onClick={() => setActiveSubTab('waf_gateway')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'waf_gateway'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-purple-400" />
            <span>4. WAF & API Security Gateway</span>
          </button>

          <button
            onClick={() => setActiveSubTab('siem_threats')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'siem_threats'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Crosshair className="w-4 h-4 text-rose-400" />
            <span>5. SIEM Threat Ingestion</span>
          </button>

          <button
            onClick={() => setActiveSubTab('soc_edr')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'soc_edr'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Siren className="w-4 h-4 text-rose-400" />
            <span>6. SOC & EDR Endpoint Containment</span>
          </button>

          <button
            onClick={() => setActiveSubTab('compliance')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'compliance'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>7. ISO 27001 / POPIA Security Matrix</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-fuchsia-400" />
            <span>8. Cybersecurity Clean Architecture</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rules_sla')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'rules_sla'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-rose-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-teal-400" />
            <span>9. Mandatory Cybersecurity Rules</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-rose-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-rose-400" />
              <span>ECZTDP Threat Defence & Security Log Stream</span>
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

      {/* SUB-TAB 1: ZERO TRUST CONTINUOUS TRUST ENGINE */}
      {activeSubTab === 'zero_trust' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* DEVICE LIST */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Zero Trust Evaluated Entities ({devices.length})
              </h3>

              {devices.map((d) => (
                <div
                  key={d.deviceId}
                  onClick={() => {
                    setSelectedDevice(d);
                    addLog(`EVALUATED POSTURE: ${d.deviceId} trust score: ${d.trustScore}/100`);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    selectedDevice.deviceId === d.deviceId
                      ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-950/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-rose-400 truncate max-w-[180px]">{d.deviceId}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.postureStatus === 'TRUSTED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {d.postureStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400">Trust Score:</span>
                    <span className={`text-base font-extrabold ${d.trustScore > 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {d.trustScore} / 100
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTED DEVICE POSTURE */}
            <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-400 font-mono text-xs font-bold border border-rose-800">
                      {selectedDevice.entityType}
                    </span>
                    <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold border ${
                      selectedDevice.postureStatus === 'TRUSTED' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-rose-950 text-rose-400 border-rose-800'
                    }`}>
                      {selectedDevice.postureStatus}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-2 font-mono">{selectedDevice.deviceId}</h2>
                  <p className="text-xs text-slate-400">IP: {selectedDevice.ipAddress} • Verified: {selectedDevice.lastVerified}</p>
                </div>

                {selectedDevice.postureStatus !== 'ISOLATED_QUARANTINE' && (
                  <button
                    onClick={() => handleIsolateDevice(selectedDevice.deviceId)}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/30 transition-all"
                  >
                    <Crosshair className="w-4 h-4" />
                    <span>EDR ISOLATE DEVICE</span>
                  </button>
                )}
              </div>

              {/* POSTURE CHECKS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">mTLS X.509 Certificate:</span>
                  <strong className={selectedDevice.mTLSValid ? 'text-emerald-400' : 'text-rose-400'}>
                    {selectedDevice.mTLSValid ? '✓ VALID SIGNATURE' : '✗ INVALID / REVOKED'}
                  </strong>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Biometric Attestation:</span>
                  <strong className={selectedDevice.biometricAttested ? 'text-emerald-400' : 'text-amber-400'}>
                    {selectedDevice.biometricAttested ? '✓ PASSED' : '⚠ UNVERIFIED'}
                  </strong>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Root / Jailbreak Check:</span>
                  <strong className={selectedDevice.jailbreakRootStatus === 'CLEAN' ? 'text-emerald-400' : 'text-rose-400'}>
                    {selectedDevice.jailbreakRootStatus}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ENTERPRISE PKI & CERTIFICATES */}
      {activeSubTab === 'pki_certs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-cyan-400" />
                <span>Enterprise X.509 Certificate Authority & OCSP Engine</span>
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400 font-bold text-sm">{cert.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 font-bold text-[10px]">
                      {cert.caType}
                    </span>
                  </div>
                  <p className="text-white font-bold">{cert.commonName}</p>
                  <p className="text-slate-400 text-[11px]">Issuer: {cert.issuer} • Key: {cert.keyType} • Valid Until: {cert.validUntil}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    cert.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    {cert.status}
                  </span>

                  {cert.status === 'ACTIVE' && (
                    <button
                      onClick={() => handleRevokeCert(cert.id)}
                      className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-all"
                    >
                      OCSP Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SECRETS MANAGEMENT */}
      {activeSubTab === 'secrets_vault' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <span>Centralized HSM Secrets Vault & Key Rotation</span>
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {secrets.map((sec) => (
              <div key={sec.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                <div className="space-y-2">
                  <span className="text-amber-400 font-bold text-sm block">{sec.id}</span>
                  <p className="text-slate-300">Type: {sec.secretType} • Active Version: v{sec.version}</p>
                  <p className="text-slate-500 text-[11px]">Last Rotated: {sec.lastRotated} • Access Invocations (24h): {sec.accessCount24h.toLocaleString()}</p>
                </div>

                <button
                  onClick={() => handleRotateSecret(sec.id)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-2"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>ROTATE HSM KEY</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: WAF & API GATEWAY */}
      {activeSubTab === 'waf_gateway' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Globe className="w-5 h-5 text-purple-400" />
                <span>Web Application Firewall (WAF) Interception Engine</span>
              </h3>
            </div>

            <button
              onClick={handleSimulateWafAttack}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-purple-600/30 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>SIMULATE ATTACK INTERCEPTION</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {wafBlocks.map((wb) => (
              <div key={wb.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-rose-400 font-bold">{wb.id}</span>
                    <span className="text-slate-500">[{wb.timestamp}]</span>
                  </div>
                  <p className="text-white font-bold mt-1">{wb.attackVector} Target: {wb.targetEndpoint}</p>
                  <p className="text-slate-400 text-[11px]">IP: {wb.ipAddress} ({wb.sourceGeo})</p>
                </div>

                <span className="px-3 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold text-xs">
                  {wb.actionTaken}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: SIEM THREAT INGESTION */}
      {activeSubTab === 'siem_threats' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Crosshair className="w-5 h-5 text-rose-400" />
            <span>SIEM Log Ingestion & MITRE ATT&CK Intelligence</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {socIncidents.map((inc) => (
              <div key={inc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-rose-400 font-bold">
                  <span>{inc.id}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px]">
                    {inc.severity}
                  </span>
                </div>
                <h4 className="text-white font-bold">{inc.title}</h4>
                <p className="text-slate-400 text-[11px]">MITRE Technique: {inc.mitreTechnique}</p>
                <div className="flex justify-between items-center pt-2 text-[10px] text-slate-500 border-t border-slate-800">
                  <span>MTTD: <strong className="text-emerald-400">{inc.mttdSeconds}s</strong></span>
                  <span>Analyst: <strong className="text-white">{inc.assignedAnalyst}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: SOC & EDR CONTAINMENT */}
      {activeSubTab === 'soc_edr' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Siren className="w-5 h-5 text-rose-400" />
            <span>SOC Incident Response Console & Emergency EDR Containment</span>
          </h3>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
            <span className="text-rose-400 font-bold block">AUTOMATED CONTAINMENT ENGINE:</span>
            <p className="text-slate-300">
              In the event of an anomalous payload, credential breach, or certificate compromise, the EDR agent isolates the compromised endpoint instantly from the network mesh without disrupting active child emergency SOS calls.
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: COMPLIANCE MATRIX */}
      {activeSubTab === 'compliance' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
            <span>ISO 27001, POPIA & OWASP ASVS Security Compliance Matrix</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold block">ISO/IEC 27001:2022</span>
              <p className="text-slate-300">Information Security Management System (ISMS) controls 100% verified.</p>
              <span className="text-emerald-400 font-bold block">AUDIT COMPLIANT</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">POPIA Section 18 Data Shield</span>
              <p className="text-slate-300">Biometric & learner location data protected via envelope encryption.</p>
              <span className="text-emerald-400 font-bold block">AUDIT COMPLIANT</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">OWASP ASVS Level 3</span>
              <p className="text-slate-300">Highest application security verification standard enforced for government software.</p>
              <span className="text-emerald-400 font-bold block">VERIFIED</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-fuchsia-400" />
              <h3 className="text-base font-bold text-white">NestJS Cybersecurity Clean Architecture Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {ECZTDP_CODE_SPECS.map((spec) => (
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

      {/* SUB-TAB 9: MANDATORY RULES */}
      {activeSubTab === 'rules_sla' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-teal-400" />
            <span>Enterprise Directives & Compliance Standards & SLAs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {CRITICAL_ECZTDP_RULES.map((rule) => (
              <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-400">RULE #{rule.id}</span>
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
