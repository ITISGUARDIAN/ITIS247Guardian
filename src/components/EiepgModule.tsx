import React, { useState } from 'react';
import {
  Server,
  ShieldCheck,
  Activity,
  Globe,
  Radio,
  RefreshCw,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Layers,
  Database,
  FileCode,
  Download,
  Send,
  Zap,
  Cpu,
  ShieldAlert,
  ArrowRight,
  GitCommit,
  Filter,
  CheckCheck,
  FileCheck2,
  List
} from 'lucide-react';
import {
  SAMPLE_PARTNERS,
  SAMPLE_WEBHOOKS,
  SAMPLE_DLQ_ITEMS,
  EIEPG_CODE_SPECS,
  CRITICAL_EIEPG_RULES,
  IntegrationPartner,
  WebhookSubscription,
  DeadLetterItem,
  EiepgCodeSpec,
  PartnerCategory
} from '../data/eiepgData';

export const EiepgModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'registry' | 'gateway' | 'webhooks' | 'certs' | 'schema' | 'architecture'
  >('registry');

  // Interactive States
  const [partners, setPartners] = useState<IntegrationPartner[]>(SAMPLE_PARTNERS);
  const [selectedPartner, setSelectedPartner] = useState<IntegrationPartner>(SAMPLE_PARTNERS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const [webhooks] = useState<WebhookSubscription[]>(SAMPLE_WEBHOOKS);
  const [dlqItems, setDlqItems] = useState<DeadLetterItem[]>(SAMPLE_DLQ_ITEMS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<EiepgCodeSpec>(EIEPG_CODE_SPECS[0]);

  // Operational Simulation Logs & States
  const [logs, setLogs] = useState<string[]>([]);
  const [testingPartnerId, setTestingPartnerId] = useState<string | null>(null);
  const [retryingDlqId, setRetryingDlqId] = useState<string | null>(null);
  const [broadcastingWebhook, setBroadcastingWebhook] = useState<boolean>(false);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Test Partner Connection Ping
  const handleTestConnection = (partnerId: string) => {
    setTestingPartnerId(partnerId);
    addLog(`PINGING GATEWAY ENDPOINT for partner ${partnerId}...`);

    setTimeout(() => {
      setPartners((prev) =>
        prev.map((p) =>
          p.id === partnerId
            ? {
                ...p,
                status: 'CONNECTED',
                latencyMs: Math.floor(18 + Math.random() * 25),
                circuitBreakerStatus: 'CLOSED',
              }
            : p
        )
      );
      setTestingPartnerId(null);
      addLog(`PING SUCCESSFUL: ${partnerId} latency <35ms. Mutual TLS and OAuth2 verified.`);
    }, 1000);
  };

  // Retry DLQ Item
  const handleRetryDlq = (dlqId: string) => {
    setRetryingDlqId(dlqId);
    addLog(`RETRYING DEAD LETTER QUEUE ITEM ${dlqId}...`);

    setTimeout(() => {
      setDlqItems((prev) =>
        prev.map((item) =>
          item.id === dlqId
            ? { ...item, status: 'EXPIRED', errorMessage: 'Replayed successfully to EMS endpoint' }
            : item
        )
      );
      setRetryingDlqId(null);
      addLog(`DLQ REPLAY SUCCESSFUL: Packet re-sent to Gauteng EMS Dispatch with 200 OK.`);
    }, 1200);
  };

  // Broadcast Webhook Event Test
  const handleBroadcastWebhook = () => {
    setBroadcastingWebhook(true);
    addLog(`BROADCASTING TEST WEBHOOK EVENT: 'incident.critical_emergency'...`);

    setTimeout(() => {
      setBroadcastingWebhook(false);
      addLog(`WEBHOOK BROADCAST COMPLETED: Delivered to 4 registered partner endpoints (SAPS, SASAMS, EMS, Metro Police) with 100% HMAC verification.`);
    }, 1500);
  };

  // Filter partners
  const filteredPartners =
    categoryFilter === 'ALL'
      ? partners
      : partners.filter((p) => p.category === categoryFilter);

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-2xl border border-indigo-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-xs font-semibold">
              <Server className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
              <span>— ENTERPRISE INTEGRATION & EXTERNAL PARTNER GATEWAY (EIEPG)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Integration & <span className="text-indigo-400">External Gateway</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Connecting ITIS with trusted government (SAPS, DBE, EMS), school (SA-SAMS), scholar transport, communication, mapping, identity, and cloud partners with Mutual TLS, HMAC signing, OAuth2, and zero-downtime circuit breakers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-indigo-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-indigo-400">&lt; 50ms</span>
              <span className="text-xs text-slate-400 font-medium">Gateway Latency</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">99.99%</span>
              <span className="text-xs text-slate-400 font-medium">Target Availability</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">mTLS</span>
              <span className="text-xs text-slate-400 font-medium">Mutual Auth</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('registry')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'registry'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>1. Partner Registry & Connectors</span>
          </button>

          <button
            onClick={() => setActiveSubTab('gateway')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'gateway'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>2. API Traffic & Circuit Breakers</span>
          </button>

          <button
            onClick={() => setActiveSubTab('webhooks')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'webhooks'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4 text-purple-400" />
            <span>3. Webhooks & Dead Letter Queue</span>
          </button>

          <button
            onClick={() => setActiveSubTab('certs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'certs'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>4. Certificates & Mutual TLS Policies</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>5. Relational Prisma Schema</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'architecture'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>6. NestJS Services & REST Controllers</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL SIMULATION LOGS BAR */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-indigo-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Activity className="w-4 h-4 animate-pulse text-indigo-400" />
              <span>EIEPG Gateway Operational Audit Trail</span>
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

      {/* SUB-TAB 1: PARTNER REGISTRY & CONNECTORS */}
      {activeSubTab === 'registry' && (
        <div className="space-y-6">
          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 flex items-center space-x-1 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Category Filter:</span>
            </span>

            {['ALL', 'GOVERNMENT', 'SCHOOL', 'SCHOLAR_TRANSPORT', 'COMMUNICATION', 'MAPPING'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  categoryFilter === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PARTNER LIST */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Registered Third-Party Partner Connectors ({filteredPartners.length})
              </span>

              {filteredPartners.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPartner(p)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedPartner.id === p.id
                      ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-900/20 ring-1 ring-indigo-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="px-2.5 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-400 text-xs font-mono font-bold">
                      {p.id}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        p.status === 'CONNECTED'
                          ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                          : 'bg-amber-950 border-amber-800 text-amber-400'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="pt-3 space-y-1">
                    <h3 className="text-base font-bold text-white">{p.name}</h3>
                    <p className="text-xs text-indigo-400 font-mono">{p.endpointUrl}</p>
                    <p className="text-xs text-slate-400">{p.jurisdiction}</p>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-800 mt-3 font-mono">
                    <span>Latency: {p.latencyMs} ms</span>
                    <span className="text-emerald-400 font-bold">Success: {p.successRatePct}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* PARTNER DETAIL PANEL */}
            <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-indigo-400" />
                    <span>Connector Specification for {selectedPartner.name}</span>
                  </h3>
                  <p className="text-xs text-slate-400">Jurisdiction: {selectedPartner.jurisdiction}</p>
                </div>

                <button
                  onClick={() => handleTestConnection(selectedPartner.id)}
                  disabled={testingPartnerId === selectedPartner.id}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
                >
                  <RefreshCw className={`w-4 h-4 ${testingPartnerId === selectedPartner.id ? 'animate-spin' : ''}`} />
                  <span>{testingPartnerId === selectedPartner.id ? 'Pinging Gateway...' : 'Test Connection'}</span>
                </button>
              </div>

              {/* DETAILS METRIC GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-semibold">Protocol Type</span>
                  <span className="text-indigo-400 font-mono font-bold">{selectedPartner.protocol}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-semibold">Authentication Method</span>
                  <span className="text-purple-400 font-mono font-bold">{selectedPartner.authMethod}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-semibold">Circuit Breaker</span>
                  <span className="text-emerald-400 font-mono font-bold">{selectedPartner.circuitBreakerStatus}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-semibold">Certificate Expiry</span>
                  <span className="text-amber-400 font-mono font-bold">{selectedPartner.certExpiryDays} Days</span>
                </div>
              </div>

              {/* TECHNICAL INTEGRATION METRICS */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  SLA Compliance & Throughput Metrics
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Target SLA Availability ({selectedPartner.slaTargetPct}%)</span>
                      <span className="text-emerald-400 font-bold">{selectedPartner.successRatePct}% Achieved</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${selectedPartner.successRatePct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between p-3 bg-slate-900 rounded-lg text-slate-300 font-mono">
                    <span>Daily Packet Volume:</span>
                    <span className="text-indigo-400 font-bold">{selectedPartner.dailyRequests.toLocaleString()} req/day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: API TRAFFIC & CIRCUIT BREAKERS */}
      {activeSubTab === 'gateway' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span>Real-Time API Gateway Traffic & Failover Circuit Breakers</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-semibold block">Gateway Latency Enforcement</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono">24 ms</span>
                <p className="text-slate-500">Strict SLA target is &lt;50 ms for all inbound/outbound packets.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-semibold block">HMAC-SHA256 Request Signing</span>
                <span className="text-2xl font-bold text-indigo-400 font-mono">ACTIVE</span>
                <p className="text-slate-500">All external partner requests are signed with cryptographic HMAC keys.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-semibold block">Circuit Breaker Policy</span>
                <span className="text-2xl font-bold text-purple-400 font-mono">5 ERR / 10s</span>
                <p className="text-slate-500">Automatic half-open state fallback prevents cascaded system outages.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: WEBHOOKS & DEAD LETTER QUEUE */}
      {activeSubTab === 'webhooks' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-purple-400" />
                  <span>Asynchronous Webhook Subscriptions & Dead Letter Queue (DLQ)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Event-driven webhook engine with exponential backoff retries and manual replay capabilities.
                </p>
              </div>

              <button
                onClick={handleBroadcastWebhook}
                disabled={broadcastingWebhook}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>{broadcastingWebhook ? 'Broadcasting...' : 'Broadcast Test Webhook Event'}</span>
              </button>
            </div>

            {/* WEBHOOK SUBSCRIPTIONS LIST */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Active Webhook Subscriptions ({webhooks.length})
              </span>

              {webhooks.map((wh) => (
                <div key={wh.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono font-bold text-purple-400">{wh.id}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                      {wh.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Partner</span>
                      <span className="text-white font-semibold">{wh.partnerName}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">Event Topic</span>
                      <span className="text-indigo-400 font-mono font-bold">{wh.eventTopic}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DEAD LETTER QUEUE ITEMS */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Dead Letter Queue (DLQ) Items ({dlqItems.length})</span>
              </span>

              {dlqItems.map((item) => (
                <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono font-bold text-amber-400">{item.id}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.failedAt}</span>
                  </div>

                  <p className="text-xs text-slate-200 font-semibold">{item.errorMessage}</p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-slate-500 font-mono">Retry Count: {item.retryCount}</span>
                    <button
                      onClick={() => handleRetryDlq(item.id)}
                      disabled={retryingDlqId === item.id}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-bold"
                    >
                      {retryingDlqId === item.id ? 'Replaying...' : 'Replay DLQ Packet'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: CERTIFICATES & MUTUAL TLS POLICIES */}
      {activeSubTab === 'certs' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Mutual TLS (mTLS) Certificates & AES-256 Secret Rotation</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white">SAPS National CAD mTLS Cert</h4>
                <p className="text-slate-400">RSA 4096-bit x509 Certificate issued by GovCA RSA.</p>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold block w-fit">
                  Valid (142 Days Remaining)
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white">Gauteng EMS Dispatch mTLS Cert</h4>
                <p className="text-slate-400">RSA 2048-bit x509 Certificate issued by ProvincialCA.</p>
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-400 text-[10px] font-bold block w-fit">
                  Expiring Soon (12 Days Remaining)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: RELATIONAL PRISMA SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Prisma Relational Database Schema for EIEPG</h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                Relational Model
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {EIEPG_CODE_SPECS[0].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: NESTJS SERVICES & REST CONTROLLERS */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">NestJS Gateway Services & REST API</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {EIEPG_CODE_SPECS.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedCodeSpec(spec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCodeSpec.id === spec.id
                        ? 'bg-orange-600 text-white shadow-md'
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
                <span className="font-mono text-amber-400 font-bold">{selectedCodeSpec.filename}</span>
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
        </div>
      )}

      {/* CRITICAL BUSINESS RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_EIEPG_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-400">RULE #{rule.id}</span>
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
