import React, { useState } from 'react';
import {
  Rocket,
  ShieldCheck,
  Server,
  Activity,
  Globe,
  Database,
  CheckCircle2,
  Lock,
  Terminal,
  Cpu,
  Layers,
  Container,
  Clock,
  Award,
  FileText,
  AlertTriangle,
  Radio,
  Copy,
  Users,
  Check,
  Building,
  ChevronRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import {
  PRODUCTION_INFRA_HEALTH,
  DNS_SSL_RECORDS,
  GO_LIVE_RUNBOOK_STEPS,
  InfraHealthStatus
} from '../data/productionDeploymentData';

export function ProductionDeploymentModule() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'infrastructure' | 'runbook' | 'dns_ssl' | 'hypercare' | 'certification' | 'deployment_code'
  >('dashboard');

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const githubActionsYaml = `name: ITIS Production Release Promotion (v1.0.0)

on:
  push:
    tags:
      - 'v1.0.0'
      - 'v1.0.0-rc2'

jobs:
  production-deployment:
    name: Deploy to SITA Cloud Enclave & AWS Cape Town
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Checkout Codebase
        uses: actions/checkout@v4

      - name: Configure SITA Enclave Kubernetes Credentials
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
          kubeconfig: \${{ secrets.SITA_PROD_KUBECONFIG }}

      - name: Helm Upgrade ITIS Platform Release
        run: |
          helm upgrade --install itis-platform ./helm/itis-platform \\
            --namespace itis-production \\
            --values ./helm/values-production.yaml \\
            --set image.tag=\${{ github.ref_name }} \\
            --wait --timeout 10m0s

      - name: Run Production Database Migration Check
        run: |
          kubectl exec -n itis-production deploy/itis-backend-api -- npx prisma migrate status

      - name: Execute End-to-End Production Smoke Verification
        run: |
          npm run test:e2e:prod`;

  const helmValuesYaml = `# Production Helm Values for SITA Cloud Enclave (values-production.yaml)
global:
  environment: production
  domain: itis.gov.za
  tlsSecretName: itis-wildcard-tls-prod

replicaCount:
  backendApi: 10
  websocketGateway: 8
  responderGateway: 6
  commandCentre: 4

resources:
  backendApi:
    limits:
      cpu: "4000m"
      memory: "8Gi"
    requests:
      cpu: "1000m"
      memory: "2Gi"

autoscaling:
  enabled: true
  minReplicas: 10
  maxReplicas: 100
  targetCPUUtilizationPercentage: 70

database:
  host: "postgres-ha.sita-enclave.internal"
  port: 5432
  sslMode: "verify-full"
  maxConnections: 500`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center justify-center relative">
      {/* GLOBAL HEADER BANNER */}
      <div className="w-full max-w-7xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-900/30">
            <Rocket className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white tracking-wide">
                ITIS PRODUCTION GO-LIVE & HYPERCARE PLATFORM (PDNGOHHP)
              </h1>
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                NATIONAL LIVE (v1.0.0)
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                PROMPT 065 (FINAL)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              SITA Cloud Enclave Infrastructure, Minute-by-Minute Runbook, 90-Day Hypercare Plan & National Pilot Launch
            </p>
          </div>
        </div>

        {/* GO-LIVE CERTIFICATION BADGE */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <div className="bg-emerald-950 px-3 py-2 rounded-xl border border-emerald-500/40 text-emerald-400 flex items-center space-x-2 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">GO-LIVE CERTIFIED & APPROVED</span>
          </div>
        </div>
      </div>

      {/* MAIN MODULE CONTAINER */}
      <div className="w-full max-w-7xl bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-6">
        {/* NAVIGATION TABS */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'dashboard'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Go-Live Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('infrastructure')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'infrastructure'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Infrastructure</span>
          </button>

          <button
            onClick={() => setActiveTab('runbook')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'runbook'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Runbook</span>
          </button>

          <button
            onClick={() => setActiveTab('dns_ssl')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'dns_ssl'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>DNS & SSL</span>
          </button>

          <button
            onClick={() => setActiveTab('hypercare')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'hypercare'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Hypercare & Pilot</span>
          </button>

          <button
            onClick={() => setActiveTab('certification')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'certification'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificates</span>
          </button>

          <button
            onClick={() => setActiveTab('deployment_code')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'deployment_code'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>CI/CD Code</span>
          </button>
        </div>

        {/* TAB 1: GO-LIVE COMMAND DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 font-sans">
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">PLATFORM STATUS</div>
                <div className="text-emerald-400 font-bold text-lg flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>100% OPERATIONAL</span>
                </div>
                <div className="text-[10px] text-slate-500">SITA Cloud Enclave Live</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">CONNECTED WEARABLE DEVICES</div>
                <div className="text-amber-400 font-bold text-lg">25,000 ACTIVE</div>
                <div className="text-[10px] text-slate-500">Gauteng Soweto Pilot Nodes</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">API LATENCY (P99)</div>
                <div className="text-cyan-400 font-bold text-lg">12.4 ms</div>
                <div className="text-[10px] text-slate-500">SLA Requirement: &lt; 50ms</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">HYPERCARE DEFECT COUNT</div>
                <div className="text-emerald-400 font-bold text-lg">0 SEV-1 / 0 SEV-2</div>
                <div className="text-[10px] text-slate-500">Zero-Defect Launch Standard</div>
              </div>
            </div>

            {/* LIVE SMOKE TEST VERIFICATION RESULTS */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-sm">PRODUCTION SMOKE VERIFICATION SUITE</span>
                </div>
                <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950 border border-emerald-500/40 px-2.5 py-1 rounded-lg">
                  ALL 11 PORTALS PASSED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { name: 'Corporate Public Website', route: 'https://www.itis.gov.za', latency: '14ms', status: 'PASS' },
                  { name: 'Parent Safety Portal', route: 'https://parent.itis.gov.za', latency: '18ms', status: 'PASS' },
                  { name: 'School Admin Portal', route: 'https://school.itis.gov.za', latency: '16ms', status: 'PASS' },
                  { name: 'National Command Centre (C3)', route: 'https://command.itis.gov.za', latency: '11ms', status: 'PASS' },
                  { name: 'Government Executive Cabinet', route: 'https://executive.itis.gov.za', latency: '15ms', status: 'PASS' },
                  { name: 'SAPS Responder Mobile Gateway', route: 'https://api.itis.gov.za/v1/responder', latency: '9ms', status: 'PASS' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.route}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold text-[10px]">{item.status}</div>
                      <div className="text-[10px] text-slate-500">{item.latency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INFRASTRUCTURE CLUSTER HEALTH */}
        {activeTab === 'infrastructure' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">SITA ENCLAVE & CLOUD INFRASTRUCTURE NODES</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">SERVICE NAME</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">REGION / DATACENTRE</th>
                    <th className="p-3">NODES</th>
                    <th className="p-3">CPU / MEM</th>
                    <th className="p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {PRODUCTION_INFRA_HEALTH.map((infra, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{infra.serviceName}</span>
                      </td>
                      <td className="p-3 text-slate-300">{infra.category}</td>
                      <td className="p-3 text-slate-400">{infra.region}</td>
                      <td className="p-3 text-amber-400 font-bold">{infra.nodesCount} Nodes</td>
                      <td className="p-3 text-slate-300">{infra.cpuUtil} / {infra.memoryUtil}</td>
                      <td className="p-3">
                        <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                          {infra.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: RUNBOOK TIMELINE */}
        {activeTab === 'runbook' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">MINUTE-BY-MINUTE GO-LIVE RUNBOOK</span>
              </div>
            </div>

            <div className="space-y-3">
              {GO_LIVE_RUNBOOK_STEPS.map((step, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-500 text-slate-950 font-black px-2.5 py-1 rounded-lg text-xs">
                      {step.timeOffset}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{step.action}</div>
                      <div className="text-[10px] text-slate-400">PHASE: {step.phase} | OWNER: {step.owner}</div>
                    </div>
                  </div>
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-lg border border-emerald-500/40">
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DNS & SSL RECORDS */}
        {activeTab === 'dns_ssl' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">PRODUCTION DNS & HSM SSL TLS 1.3 CERTIFICATES</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">DOMAIN NAME</th>
                    <th className="p-3">TYPE</th>
                    <th className="p-3">TARGET IP / ENDPOINT</th>
                    <th className="p-3">TLS ENCRYPTION STATUS</th>
                    <th className="p-3">HSTS SECURITY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {DNS_SSL_RECORDS.map((dns, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-amber-400">{dns.domain}</td>
                      <td className="p-3 text-slate-300">{dns.type}</td>
                      <td className="p-3 text-slate-400">{dns.targetIp}</td>
                      <td className="p-3 text-emerald-400 font-bold">{dns.sslStatus}</td>
                      <td className="p-3 text-slate-300">{dns.hstsStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: HYPERCARE & PILOT ACTIVATION */}
        {activeTab === 'hypercare' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">90-DAY HYPERCARE & GAUTENG 50-SCHOOL PILOT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-emerald-400 text-sm">GAUTENG SOWETO PILOT SCOPE</div>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300 font-sans text-xs">
                  <li><strong>50 Selected Public Schools:</strong> Soweto, Johannesburg South.</li>
                  <li><strong>25,000 Wearables Issued:</strong> AES-256 GPS & NFC BLE panic bands.</li>
                  <li><strong>100 Safe Scholar Buses:</strong> Fitted with IoT telemetry & RFID gates.</li>
                  <li><strong>3 SAPS Stations Connected:</strong> Diepkloof, Orlando, and Eldorado Park.</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-amber-400 text-sm">HYPERCARE ESCALATION SLA MATRIX</div>
                <div className="space-y-2 text-xs font-sans">
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-red-400 font-bold font-mono">SEV-1 (Critical System Down):</span> Response &lt; 5 mins | Resolution &lt; 1 hour
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-amber-400 font-bold font-mono">SEV-2 (Major Feature Failure):</span> Response &lt; 15 mins | Resolution &lt; 4 hours
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-cyan-400 font-bold font-mono">SEV-3 (Minor Bug / Query):</span> Response &lt; 1 hour | Resolution &lt; 24 hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: GO-LIVE CERTIFICATION */}
        {activeTab === 'certification' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">NATIONAL GO-LIVE CERTIFICATION & EXECUTIVE SIGN-OFF</span>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border-2 border-emerald-500/40 space-y-4 text-center font-mono">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
              <div className="text-lg font-black text-white">REPUBLIC OF SOUTH AFRICA — ITIS NATIONAL PLATFORM</div>
              <p className="text-xs text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
                This is to certify that the Integrated Technology & Intelligence System (ITIS) v1.0.0 has successfully passed all 496 verification gates, vulnerability audits, and SITA enclave load tests. The platform is hereby formally certified for live operational deployment across all 9 provinces.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-left text-[11px]">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">CHIEF TECHNOLOGY OFFICER</div>
                  <div className="text-white font-bold">Signed: Dr. S. Dlamini</div>
                  <div className="text-emerald-400 text-[10px]">VERIFIED (RSA PKI)</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">CHIEF SECURITY OFFICER</div>
                  <div className="text-white font-bold">Signed: Adv. M. Khumalo</div>
                  <div className="text-emerald-400 text-[10px]">VERIFIED (POPIA / SSA)</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">SITA EXECUTIVE DIRECTOR</div>
                  <div className="text-white font-bold">Signed: T. Naidoo</div>
                  <div className="text-emerald-400 text-[10px]">VERIFIED (SITA ENCLAVE)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CI/CD DEPLOYMENT CODE GENERATOR */}
        {activeTab === 'deployment_code' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">PRODUCTION DEPLOYMENT MANIFESTS & CI/CD PIPELINE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">1. GITHUB ACTIONS PROMOTION WORKFLOW</span>
                  <button
                    onClick={() => copyToClipboard(githubActionsYaml, 'gha')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode === 'gha' ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[10px] overflow-x-auto">
                  {githubActionsYaml}
                </pre>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">2. SITA CLOUD HELM VALUES (`values-production.yaml`)</span>
                  <button
                    onClick={() => copyToClipboard(helmValuesYaml, 'helm')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode === 'helm' ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[10px] overflow-x-auto">
                  {helmValuesYaml}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
