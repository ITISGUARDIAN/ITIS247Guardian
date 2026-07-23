import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
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
  QrCode,
  ShieldCheck,
  ShieldAlert,
  Award,
  Activity,
  BarChart3,
  Terminal,
  FileCode,
  Lock,
  TrendingUp,
  Download,
  Flame,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import {
  SAMPLE_TEST_CASES,
  SAMPLE_DEFECTS,
  SAMPLE_PERSONA_UATS,
  SAMPLE_BENCHMARKS,
  EQAVCPR_CODE_SPECS,
  CRITICAL_EQAVCPR_RULES,
  TestCaseRecord,
  DefectRecord,
  PersonaUatScript,
  PerformanceBenchmark,
  EqavcprCodeSpec
} from '../data/eqavcprData';

export const EqavcprModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'test_management' | 'defects' | 'performance_sla' | 'security_qa' | 'functional_matrix' | 'uat_signoffs' | 'compliance_audit' | 'go_no_go' | 'code_specs' | 'rules_sla'
  >('go_no_go');

  // Test Cases State
  const [testCases, setTestCases] = useState<TestCaseRecord[]>(SAMPLE_TEST_CASES);

  // Defects State
  const [defects, setDefects] = useState<DefectRecord[]>(SAMPLE_DEFECTS);

  // Persona UAT State
  const [personaUats, setPersonaUats] = useState<PersonaUatScript[]>(SAMPLE_PERSONA_UATS);

  // Benchmarks State
  const [benchmarks, setBenchmarks] = useState<PerformanceBenchmark[]>(SAMPLE_BENCHMARKS);

  // Code Spec State
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<EqavcprCodeSpec>(EQAVCPR_CODE_SPECS[0]);

  // Test Suite Execution Simulation State
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Run All Automated Test Suites
  const handleRunAllTests = () => {
    setIsRunningTests(true);
    addLog('QA ENGINE INITIATED: Executing 1,840 automated Playwright, k6, Jest, and OWASP security suites...');

    setTimeout(() => {
      setTestCases((prev) =>
        prev.map((tc) => ({
          ...tc,
          status: 'PASSED',
          lastExecuted: 'Just now',
          executionTimeMs: Math.floor(Math.random() * 50 + 5),
        }))
      );
      setIsRunningTests(false);
      addLog('QA SUITE COMPLETE: 1,840/1,840 tests PASSED (100% Success Rate). Zero regressions detected.');
    }, 2000);
  };

  // Resolve Defect
  const handleResolveDefect = (defectId: string) => {
    setDefects((prev) =>
      prev.map((d) => (d.id === defectId ? { ...d, status: 'RESOLVED' } : d))
    );
    addLog(`DEFECT RESOLVED: ${defectId} marked as RESOLVED. Re-running regression verification...`);
  };

  // Export Executive Compliance Audit Package
  const handleExportAuditPackage = () => {
    addLog('EXPORT INITIATED: Cryptographically signed ISO 27001 / POPIA Quality & Readiness Audit Package generated (SHA-256: 8f4a21...9b01).');
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 rounded-2xl border border-emerald-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>PROMPT 043 — QUALITY ASSURANCE, CERTIFICATION & PRODUCTION READINESS (EQAVCPR)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise QA, Certification & <span className="text-emerald-400">Production Readiness</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              End-to-end automated verification framework validating all 26 ITIS platform modules (Prompts 017–043). Features automated Playwright E2E suites, k6 burst load stress testing, OWASP ASVS Level 3 security audits, stakeholder UAT sign-offs, and executive Go/No-Go release certification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-emerald-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">99.8%</span>
              <span className="text-xs text-slate-400 font-medium">Release Readiness</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">1,840 / 1,840</span>
              <span className="text-xs text-slate-400 font-medium">Tests Passed</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">0 P1</span>
              <span className="text-xs text-slate-400 font-medium">Open Blockers</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('go_no_go')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'go_no_go'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>1. Executive Go/No-Go Release Readiness</span>
          </button>

          <button
            onClick={() => setActiveSubTab('test_management')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'test_management'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>2. Automated Test Execution Engine</span>
          </button>

          <button
            onClick={() => setActiveSubTab('defects')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'defects'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>3. Defect Linkage & Resolution</span>
          </button>

          <button
            onClick={() => setActiveSubTab('performance_sla')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'performance_sla'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>4. k6 Performance SLA Verification</span>
          </button>

          <button
            onClick={() => setActiveSubTab('security_qa')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'security_qa'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>5. OWASP ASVS L3 & Pen-Test QA</span>
          </button>

          <button
            onClick={() => setActiveSubTab('functional_matrix')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'functional_matrix'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-teal-400" />
            <span>6. 26-Module Cross-Functional Matrix</span>
          </button>

          <button
            onClick={() => setActiveSubTab('uat_signoffs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'uat_signoffs'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>7. Stakeholder UAT Sign-Offs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('compliance_audit')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'compliance_audit'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>8. ISO 27001 / POPIA Regulatory Package</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-fuchsia-400" />
            <span>9. Automated Test Code Specs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rules_sla')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'rules_sla'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-teal-400" />
            <span>10. Mandatory QA Rules</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-emerald-400" />
              <span>EQAVCPR Quality Assurance Execution Stream</span>
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

      {/* SUB-TAB 1: EXECUTIVE GO / NO-GO DASHBOARD */}
      {activeSubTab === 'go_no_go' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 font-mono text-xs font-bold border border-emerald-800 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>RECOMMENDATION: GO FOR NATIONAL LAUNCH</span>
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-2">Executive Production Release Certification Package</h2>
              <p className="text-xs text-slate-400">Certifying readiness across all 26 integrated ITIS platform modules for 12M+ protected South African learners.</p>
            </div>

            <button
              onClick={handleExportAuditPackage}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT AUDIT SIGN-OFF PACK</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Total Integrated Modules:</span>
              <strong className="text-white text-lg">26 Modules (P017-P043)</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Automated Test Pass Rate:</span>
              <strong className="text-emerald-400 text-lg">100.0% (1,840 / 1,840)</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Open Blocker Defects (P1/P2):</span>
              <strong className="text-emerald-400 text-lg">0 Open Defects</strong>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Regulatory Compliance:</span>
              <strong className="text-cyan-400 text-lg">POPIA / ISO 27001 OK</strong>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: AUTOMATED TEST EXECUTION */}
      {activeSubTab === 'test_management' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Play className="w-5 h-5 text-cyan-400" />
                <span>Automated Playwright, k6 & Jest Test Suite Engine</span>
              </h3>
            </div>

            <button
              onClick={handleRunAllTests}
              disabled={isRunningTests}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-cyan-600/30 transition-all"
            >
              <RotateCw className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
              <span>{isRunningTests ? 'RUNNING SUITES...' : 'EXECUTE ALL 1,840 TESTS'}</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {testCases.map((tc) => (
              <div key={tc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">{tc.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">
                      {tc.testType}
                    </span>
                    <span className="text-slate-500 text-[11px] font-semibold">{tc.moduleName}</span>
                  </div>
                  <p className="text-white font-bold">{tc.title}</p>
                  <p className="text-slate-400 text-[11px]">Expected SLA Target: {tc.expectedSla} • Executed: {tc.lastExecuted}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-slate-300 font-bold">{tc.executionTimeMs} ms</span>
                  <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-xs">
                    ✓ {tc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: DEFECTS */}
      {activeSubTab === 'defects' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Defect Tracking, Severity Matrix & Resolution Verification</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {defects.map((def) => (
              <div key={def.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-400 font-bold text-sm">{def.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-rose-300 font-bold text-[10px]">
                      {def.severity}
                    </span>
                    <span className="text-slate-400 text-[11px] font-semibold">Linked: {def.linkedTestCaseId}</span>
                  </div>
                  <p className="text-white font-bold">{def.title}</p>
                  <p className="text-slate-400 text-[11px]">Module: {def.module} • Assigned: {def.assignedEngineer} • Resolution Time: {def.resolutionTimeHours}h</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    def.status === 'RESOLVED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {def.status}
                  </span>

                  {def.status !== 'RESOLVED' && (
                    <button
                      onClick={() => handleResolveDefect(def.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all"
                    >
                      MARK RESOLVED
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: PERFORMANCE BENCHMARKS */}
      {activeSubTab === 'performance_sla' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span>k6 Burst Load Performance & Latency Benchmark Verification</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {benchmarks.map((bm, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-purple-400 font-bold">
                  <span>{bm.metricName}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                    ✓ {bm.stressTestStatus}
                  </span>
                </div>
                <div className="space-y-1 text-slate-300 pt-2 border-t border-slate-800">
                  <p>Required Target SLA: <strong className="text-white">{bm.targetSla}</strong></p>
                  <p>Measured Average Latency: <strong className="text-emerald-400">{bm.measuredAvg}</strong></p>
                  <p>Measured p99 Max Latency: <strong className="text-cyan-400">{bm.measuredP99}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: SECURITY QA */}
      {activeSubTab === 'security_qa' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <ShieldCheck className="w-5 h-5 text-rose-400" />
            <span>OWASP ASVS Level 3 Penetration Test & Security Validation</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">OWASP Top 10 API Security</span>
              <p className="text-slate-300">100% resistance verified against SQLi, XSS, SSRF, and JWT tampering.</p>
              <span className="text-emerald-400 font-bold block">✓ PASSED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">X.509 mTLS Certificate Validation</span>
              <p className="text-slate-300">Strict peer verification enforced across all wearable IoT and mobile endpoints.</p>
              <span className="text-emerald-400 font-bold block">✓ PASSED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">AES-256 Envelope Encryption</span>
              <p className="text-slate-300">Field-level learner PII encryption verified with automated HSM DEK key rotation.</p>
              <span className="text-emerald-400 font-bold block">✓ PASSED</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: FUNCTIONAL MATRIX */}
      {activeSubTab === 'functional_matrix' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <CheckSquare className="w-5 h-5 text-teal-400" />
            <span>Complete 26-Module Cross-Functional Verification Matrix</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
            {[
              'P017 Core Architectural Vision', 'P018 Level 1-3 Capability Hierarchy', 'P019 SRS System Requirements', 'P020 Database & Domain Schemas',
              'P021 IAM, RBAC & Multi-Tenancy', 'P022 GPS Wearable IoT Device', 'P023 Telemetry Ingestion Engine', 'P024 Geofencing Safe Zone Engine',
              'P025 Child Safety Decision Engine', 'P026 Emergency Incident Engine', 'P027 Multi-Agency Tactical Dispatch', 'P028 C3 Command Centre',
              'P029 AI Predictive Risk & Threat', 'P030 Digital Forensics & Evidence', 'P031 Inter-Agency Integration Gateway', 'P032 BI Analytics & Reporting',
              'P033 Platform Ops & Billing Engine', 'P034 Parent Mobile Application PMA', 'P035 School Admin Portal SAP', 'P036 Emergency Responder ERMA',
              'P037 Field Technician App FTDPA', 'P038 National Govt Platform NAMGP', 'P039 Mobile Architecture Specs', 'P040 National Multi-Tenancy NAMGP',
              'P041 Enterprise Cybersecurity ECZTDP', 'P042 DevSecOps & Cloud EDCNDP', 'P043 QA & Production Readiness'
            ].map((mName, i) => (
              <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300 truncate max-w-[200px]">{mName}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                  ✓ VERIFIED
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: UAT SIGNOFFS */}
      {activeSubTab === 'uat_signoffs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>Stakeholder Persona User Acceptance Testing (UAT) Sign-Offs</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {personaUats.map((uat) => (
              <div key={uat.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-indigo-400 font-bold text-sm">{uat.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold text-[10px]">
                      {uat.persona}
                    </span>
                  </div>
                  <p className="text-white font-bold">{uat.scenarioName}</p>
                  <p className="text-slate-400 text-[11px]">Sign-Off Authority: {uat.signoffAuthority} • Steps: {uat.stepsCount}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400 font-bold">{uat.passRatePct}% PASS</span>
                  <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-xs">
                    ✓ {uat.signoffStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 8: COMPLIANCE AUDIT */}
      {activeSubTab === 'compliance_audit' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <FileText className="w-5 h-5 text-amber-300" />
            <span>ISO 27001, POPIA & South African Cybercrimes Act Regulatory Package</span>
          </h3>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
            <span className="text-emerald-400 font-bold block">REGULATORY CERTIFICATION STATUS:</span>
            <p className="text-slate-300">
              Platform certified compliant with POPIA Section 18 data minimisation, ISO/IEC 27001:2022 ISMS controls, and South African Cybercrimes Act Section 12 evidence preservation.
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-fuchsia-400" />
              <h3 className="text-base font-bold text-white">Automated QA & Test Engineering Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {EQAVCPR_CODE_SPECS.map((spec) => (
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

      {/* SUB-TAB 10: MANDATORY RULES */}
      {activeSubTab === 'rules_sla' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-teal-400" />
            <span>10 Mandatory Quality Assurance & Production Readiness Rules</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {CRITICAL_EQAVCPR_RULES.map((rule) => (
              <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400">RULE #{rule.id}</span>
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
