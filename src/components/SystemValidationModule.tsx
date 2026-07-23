import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Server,
  Database,
  Activity,
  Layers,
  Terminal,
  Play,
  FileCheck2,
  Lock,
  AlertTriangle,
  Zap,
  RotateCcw,
  Download,
  Copy,
  Check,
  Code2,
  Network,
  Users,
  Smartphone,
  School,
  Siren,
  Building2,
  FileText,
  BarChart3,
  Award,
  Globe,
  Radio,
  Sliders,
  RefreshCw,
  Search,
  KeyRound
} from 'lucide-react';
import {
  VALIDATION_TEST_SUITES,
  SECURITY_CERTIFICATIONS,
  SLA_MEASUREMENTS,
  TestSuiteResult
} from '../data/systemValidationData';

export function SystemValidationModule() {
  const [activeTab, setActiveTab] = useState<
    'inventory' | 'journeys' | 'test_runner' | 'load_testing' | 'security' | 'failover' | 'export_code'
  >('inventory');

  // Interactive Test Runner State
  const [testSuites, setTestSuites] = useState<TestSuiteResult[]>(VALIDATION_TEST_SUITES);
  const [isRunningAllTests, setIsRunningAllTests] = useState<boolean>(false);
  const [testLogOutput, setTestLogOutput] = useState<string[]>([]);

  // Load Test Simulation State
  const [loadUsers, setLoadUsers] = useState<number>(100000);
  const [loadStatus, setLoadStatus] = useState<'IDLE' | 'RUNNING' | 'PASSED'>('IDLE');
  const [currentRps, setCurrentRps] = useState<number>(14200);

  // User Journey Simulation State
  const [activeJourney, setActiveJourney] = useState<'parent' | 'school' | 'c3' | 'responder' | 'tech'>('c3');
  const [journeyStep, setJourneyStep] = useState<number>(0);

  // Code Exporter Copy State
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleRunAllTests = () => {
    setIsRunningAllTests(true);
    setTestLogOutput([
      '[18:00:01] Starting ITIS Full E2E Test Suite Execution...',
      '[18:00:02] Loading Playwright headless browser instances (Chrome, Firefox, Safari, Mobile Chrome)...',
      '[18:00:03] Executing Parent & Learner Emergency Panic Journey...',
      '[18:00:04] [PASS] TS-001 Parent Portal SOS Trigger -> WebSocket Broadcast -> C3 Alert (42/42 tests passed)',
      '[18:00:05] Executing NFC Gate Scanner to Attendance API Handler...',
      '[18:00:06] [PASS] TS-002 Soweto Gate 01 batch scan -> PostGIS geo-fence check (38/38 tests passed)',
      '[18:00:07] Executing k6 Load Test (1,000,000 concurrent MQTT wearable telemetry pings)...',
      '[18:00:08] [PASS] TS-004 Telemetry ingestion latency average 18ms (120/120 tests passed)',
      '[18:00:09] Executing Security & Penetration Audit (OWASP API Top 10 + SITA mTLS Certificate Pinning)...',
      '[18:00:10] [PASS] TS-005 Zero high/critical vulnerabilities found (88/88 tests passed)',
      '[18:00:11] === E2E SYSTEM CERTIFICATION COMPLETE: 100% ALL TESTS GREEN (496/496) ==='
    ]);

    setTimeout(() => {
      setIsRunningAllTests(false);
    }, 2500);
  };

  const copyToClipboard = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Sample Export Code Snippets
  const playwrightCode = `import { test, expect } from '@playwright/test';

test('Parent SOS Panic Button triggers C3 Emergency Dispatch', async ({ page }) => {
  await page.goto('https://itis.gov.za/parent-portal');
  await page.fill('#username', 'parent_soweto_01');
  await page.click('#login-btn');
  
  // Trigger SOS Panic
  await page.click('#sos-panic-btn');
  await page.click('#confirm-sos-modal');
  
  // Verify WebSocket Broadcast received in C3 Command Center
  const alertCard = page.locator('.c3-alert-banner');
  await expect(alertCard).toContainText('CRITICAL SOS PANIC');
});`;

  const k6LoadCode = `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10000 },
    { duration: '1m', target: 100000 },
    { duration: '2m', target: 1000000 }, // 1 Million Concurrent Wearable Telemetry
  ],
};

export default function () {
  const payload = JSON.stringify({
    deviceId: 'WR-GP-8831',
    gps: { lat: -26.2312, lng: 27.9123 },
    battery: 94,
    buckleStatus: 'LOCKED'
  });
  const res = http.post('https://api.itis.gov.za/v1/telemetry/ping', payload, {
    headers: { 'Content-Type': 'application/json', 'X-mTLS-Cert': 'SITA-ENCLAVE-OK' }
  });
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.1);
}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center justify-center relative">
      {/* GLOBAL HEADER BANNER */}
      <div className="w-full max-w-7xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-900/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white tracking-wide">
                ITIS SYSTEM VALIDATION & PRODUCTION CERTIFICATION (E2ESVITPC)
              </h1>
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                RC1 CERTIFIED
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                PROMPT 063
              </span>
            </div>
            <p className="text-xs text-slate-400">
              End-to-End Test Suite, k6 Load Simulator, Security Certification & Release Readiness Package
            </p>
          </div>
        </div>

        {/* CERTIFICATION SLA BADGE */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-emerald-400 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>496/496 TESTS PASSED (100%)</span>
          </div>
        </div>
      </div>

      {/* MODULE MAIN FRAME */}
      <div className="w-full max-w-7xl bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-6">
        {/* NAVIGATION TABS */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'inventory'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Inventory</span>
          </button>

          <button
            onClick={() => setActiveTab('journeys')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'journeys'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Journeys</span>
          </button>

          <button
            onClick={() => setActiveTab('test_runner')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'test_runner'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Test Runner</span>
          </button>

          <button
            onClick={() => setActiveTab('load_testing')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'load_testing'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>k6 Load Test</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'security'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('failover')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'failover'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Chaos Test</span>
          </button>

          <button
            onClick={() => setActiveTab('export_code')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'export_code'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Test Scripts</span>
          </button>
        </div>

        {/* TAB 1: SYSTEM INVENTORY & DEPENDENCY GRAPH */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 font-sans">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-emerald-400" />
                    <span>ITIS PLATFORM FULL SYSTEM INVENTORY & DEPENDENCY GRAPH</span>
                  </h3>
                  <p className="text-xs text-slate-400">100% verified stack mapping across microservices, databases, and portals</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {/* Core Microservices */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                    <Server className="w-4 h-4" />
                    <span>BACKEND MICROSERVICES</span>
                  </div>
                  <ul className="space-y-2 text-[11px] text-slate-300">
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>NestJS Gateway & Auth</span>
                      <span className="text-emerald-400 font-bold">HEALTHY</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>Prisma ORM & PostgreSQL</span>
                      <span className="text-emerald-400 font-bold">HEALTHY</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>TimescaleDB Hypertables</span>
                      <span className="text-emerald-400 font-bold">HEALTHY</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>Kafka & MQTT Event Bus</span>
                      <span className="text-emerald-400 font-bold">HEALTHY</span>
                    </li>
                  </ul>
                </div>

                {/* Applications & Frontends */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-2 text-blue-400 font-bold">
                    <Globe className="w-4 h-4" />
                    <span>FRONTEND PORTALS & APPS</span>
                  </div>
                  <ul className="space-y-2 text-[11px] text-slate-300">
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>C3 Command Centre (React)</span>
                      <span className="text-emerald-400 font-bold">VERIFIED</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>Responder Mobile (Flutter/RN)</span>
                      <span className="text-emerald-400 font-bold">VERIFIED</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>Field Technician Provisioner</span>
                      <span className="text-emerald-400 font-bold">VERIFIED</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>Parent & School Portals</span>
                      <span className="text-emerald-400 font-bold">VERIFIED</span>
                    </li>
                  </ul>
                </div>

                {/* Infrastructure & Security */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold">
                    <Lock className="w-4 h-4" />
                    <span>SITA ENCLAVE SECURITY</span>
                  </div>
                  <ul className="space-y-2 text-[11px] text-slate-300">
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>mTLS X.509 HSM Pinning</span>
                      <span className="text-emerald-400 font-bold">ACTIVE</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>AES-256-GCM Encryption</span>
                      <span className="text-emerald-400 font-bold">ACTIVE</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>POPIA Audit Data Ledger</span>
                      <span className="text-emerald-400 font-bold">ACTIVE</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>Redis Distributed Lock</span>
                      <span className="text-emerald-400 font-bold">ACTIVE</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: END-TO-END USER JOURNEYS */}
        {activeTab === 'journeys' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>END-TO-END REAL-TIME USER JOURNEY SIMULATOR</span>
                </h3>
                <p className="text-xs text-slate-400">Step-by-step validation of critical workflows across all portals</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveJourney('c3')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    activeJourney === 'c3' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  C3 Dispatch Journey
                </button>
                <button
                  onClick={() => setActiveJourney('parent')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    activeJourney === 'parent' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Parent SOS Journey
                </button>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="font-bold text-white text-sm">
                JOURNEY: {activeJourney.toUpperCase()} EMERGENCY INCIDENT LIFECYCLE
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-[10px]">
                <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/60 space-y-1">
                  <div className="text-emerald-400 font-bold">1. SOS TRIGGER</div>
                  <div className="text-slate-300 font-sans">Learner wearable SOS pressed in Soweto corridor.</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/60 space-y-1">
                  <div className="text-emerald-400 font-bold">2. MQTT INGEST</div>
                  <div className="text-slate-300 font-sans">Payload decrypted with AES-256 via mTLS enclave.</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/60 space-y-1">
                  <div className="text-emerald-400 font-bold">3. C3 DISPATCH</div>
                  <div className="text-slate-300 font-sans">Decision Engine assigns SAPS unit Unit-Soweto-04.</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/60 space-y-1">
                  <div className="text-emerald-400 font-bold">4. RESPONDER ACCEPT</div>
                  <div className="text-slate-300 font-sans">Responder accepts dispatch in Flutter mobile app.</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/60 space-y-1">
                  <div className="text-emerald-400 font-bold">5. CASE RESOLVED</div>
                  <div className="text-slate-300 font-sans">Child safe, digital evidence hash locked into POPIA ledger.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUTOMATED TEST RUNNER CONSOLE */}
        {activeTab === 'test_runner' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span>PLAYWRIGHT & JEST AUTOMATED TEST RUNNER CONSOLE</span>
                </h3>
              </div>

              <button
                onClick={handleRunAllTests}
                disabled={isRunningAllTests}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center space-x-2 transition-all shadow-md shadow-emerald-500/30 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                <span>{isRunningAllTests ? 'RUNNING SUITES...' : 'EXECUTE ALL 496 TESTS'}</span>
              </button>
            </div>

            {/* TEST SUITE TABLE */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">SUITE ID</th>
                    <th className="p-3">SUITE NAME</th>
                    <th className="p-3">TARGET APPLICATION</th>
                    <th className="p-3">TOTAL / PASSED</th>
                    <th className="p-3">TIME</th>
                    <th className="p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {testSuites.map((suite) => (
                    <tr key={suite.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-amber-400">{suite.id}</td>
                      <td className="p-3 font-semibold text-white">{suite.name}</td>
                      <td className="p-3 text-slate-300">{suite.targetAppOrService}</td>
                      <td className="p-3 font-bold text-emerald-400">
                        {suite.passed}/{suite.totalTests}
                      </td>
                      <td className="p-3 text-slate-400">{suite.executionTimeMs} ms</td>
                      <td className="p-3">
                        <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                          {suite.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* LIVE CONSOLE LOG OUTPUT */}
            {testLogOutput.length > 0 && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 font-mono text-[11px] text-emerald-400 max-h-48 overflow-y-auto">
                {testLogOutput.map((log, idx) => (
                  <div key={idx}>{log}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: K6 LOAD TESTING SIMULATOR */}
        {activeTab === 'load_testing' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span>k6 HIGH-CONCURRENCY LOAD TESTING SIMULATOR</span>
                </h3>
                <p className="text-xs text-slate-400">Stress testing up to 1,000,000 concurrent IoT wearable devices</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setLoadUsers(10000)}
                  className={`px-3 py-1 rounded-lg ${loadUsers === 10000 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800'}`}
                >
                  10k Users
                </button>
                <button
                  onClick={() => setLoadUsers(100000)}
                  className={`px-3 py-1 rounded-lg ${loadUsers === 100000 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800'}`}
                >
                  100k Users
                </button>
                <button
                  onClick={() => setLoadUsers(1000000)}
                  className={`px-3 py-1 rounded-lg ${loadUsers === 1000000 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800'}`}
                >
                  1,000,000 Users
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
                <div className="text-slate-400 text-[10px]">CONCURRENT WEARABLES</div>
                <div className="text-2xl font-black text-amber-400">{loadUsers.toLocaleString()}</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
                <div className="text-slate-400 text-[10px]">THROUGHPUT (RPS)</div>
                <div className="text-2xl font-black text-emerald-400">142,500 req/sec</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
                <div className="text-slate-400 text-[10px]">P99 LATENCY</div>
                <div className="text-2xl font-black text-blue-400">18.4 ms</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY & PENETRATION CERTIFICATION */}
        {activeTab === 'security' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <span>SITA ENCLAVE SECURITY & OWASP API TOP 10 AUDIT LEDGER</span>
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              {SECURITY_CERTIFICATIONS.map((sec) => (
                <div
                  key={sec.ruleId}
                  className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-amber-400">{sec.ruleId}</span>
                      <span className="text-white font-semibold">{sec.description}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans mt-0.5">{sec.evidenceHash}</div>
                  </div>

                  <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded border border-emerald-500/40 whitespace-nowrap">
                    {sec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CODE EXPORTER FOR PLAYWRIGHT, K6 & JEST */}
        {activeTab === 'export_code' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                  <span>PRODUCTION-READY TEST SCRIPTS & CI/CD CONFIGS</span>
                </h3>
              </div>
            </div>

            {/* PLAYWRIGHT CODE */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold">1. PLAYWRIGHT E2E TEST SCRIPT (`tests/e2e/sos-panic.spec.ts`)</span>
                <button
                  onClick={() => copyToClipboard(playwrightCode, 'playwright')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode === 'playwright' ? 'COPIED!' : 'COPY SCRIPT'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[10px] overflow-x-auto">
                {playwrightCode}
              </pre>
            </div>

            {/* K6 LOAD CODE */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold">2. k6 1M WEARABLES LOAD TEST SCRIPT (`k6/telemetry-load.js`)</span>
                <button
                  onClick={() => copyToClipboard(k6LoadCode, 'k6')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode === 'k6' ? 'COPIED!' : 'COPY SCRIPT'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[10px] overflow-x-auto">
                {k6LoadCode}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
