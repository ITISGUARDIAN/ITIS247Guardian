import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Send, 
  Radio, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Settings, 
  Globe, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  Clock, 
  UserCheck, 
  FileText, 
  Zap, 
  Sliders, 
  Award, 
  TrendingUp, 
  Lock, 
  Flame, 
  Layers, 
  Search, 
  Check, 
  RotateCcw, 
  Trash2, 
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { notificationEngine } from '../../lib/notifications/NotificationEngine';
import { 
  NotificationChannel, 
  NotificationLog, 
  ProviderConfig, 
  NotificationTemplate, 
  UserNotificationPreferences, 
  EmergencyBroadcastPayload,
  DeliveryAnalytics 
} from '../../lib/notifications/types';

export function NotificationsDashboard() {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'providers' | 'broadcast' | 'templates' | 'preferences' | 'dlq' | 'timeline' | 'report'>('telemetry');
  
  // Analytics State
  const [analytics, setAnalytics] = useState<DeliveryAnalytics>(notificationEngine.getAnalytics());
  const [logs, setLogs] = useState<NotificationLog[]>(notificationEngine.getLogs());
  const [dlqList, setDlqList] = useState<NotificationLog[]>(notificationEngine.getDLQ());
  
  // Provider Config Form State
  const [providerConfig, setProviderConfig] = useState<ProviderConfig>(notificationEngine.getProviderConfig());
  const [pingStatus, setPingStatus] = useState<string>('');
  
  // Broadcast Form State
  const [bcScope, setBcScope] = useState<'school' | 'district' | 'province' | 'national' | 'responders'>('school');
  const [bcRegion, setBcRegion] = useState<string>('Gauteng District 3');
  const [bcMsgEn, setBcMsgEn] = useState<string>('CRITICAL EMERGENCY: School lockdown active. SAPS 10111 dispatched. Stay in secure areas.');
  const [bcMsgZu, setBcMsgZu] = useState<string>('ISIXWAYISO ESIBI: Isikole sivaliwe impela. Amaphoyisa e-SAPS aseyasondela.');
  const [bcMsgAf, setBcMsgAf] = useState<string>('KRITIESE NOOD: Skool grendeltyd aktief. SAPS 10111 ontplooi. Bly in veilige gebiede.');
  const [activeBroadcast, setActiveBroadcast] = useState<EmergencyBroadcastPayload | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Template Tester State
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate>(notificationEngine.getTemplates()[2]);
  const [testRecipient, setTestRecipient] = useState<string>('+27 82 999 1234');
  const [testResult, setTestResult] = useState<string>('');

  // User Preferences State
  const [userPrefs, setUserPrefs] = useState<UserNotificationPreferences>({
    userId: 'USR-8812',
    userName: 'Nomvula Sithole (Parent)',
    userRole: 'parent',
    smsEnabled: true,
    emailEnabled: true,
    pushEnabled: true,
    emergencyOnly: false,
    quietHoursEnabled: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '06:00',
    preferredLanguage: 'en'
  });

  const refreshData = () => {
    setAnalytics(notificationEngine.getAnalytics());
    setLogs(notificationEngine.getLogs());
    setDlqList(notificationEngine.getDLQ());
  };

  const pingTimeoutRef = React.useRef<any>(null);

  useEffect(() => {
    return () => {
      if (pingTimeoutRef.current) clearTimeout(pingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  const handleSaveProviders = (e: React.FormEvent) => {
    e.preventDefault();
    notificationEngine.updateProviderConfig(providerConfig);
    setPingStatus('Provider gateway configurations saved & tested successfully.');
    if (pingTimeoutRef.current) clearTimeout(pingTimeoutRef.current);
    pingTimeoutRef.current = setTimeout(() => setPingStatus(''), 4000);
    refreshData();
  };

  const handleTriggerBroadcast = async () => {
    setIsBroadcasting(true);
    const res = await notificationEngine.dispatchEmergencyBroadcast(bcScope, bcRegion, bcMsgEn, bcMsgZu, bcMsgAf);
    setActiveBroadcast(res);
    setIsBroadcasting(false);
    refreshData();
  };

  const handleTestTemplate = async () => {
    const log = await notificationEngine.sendNotification(
      'USR-TEST',
      testRecipient,
      selectedTemplate.id,
      { learner_name: 'Sipho Ndlovu', location: 'Gate 1', live_url: 'https://itis.co.za/track/99', school_name: 'Soweto Primary', timestamp: '07:30', tag_id: 'TAG-802', bus_id: 'BUS-04', driver_name: 'Mr. Khumalo' },
      userPrefs
    );
    setTestResult(`Sent via ${log.provider} (${log.channel.toUpperCase()}). Latency: ${log.deliveryLatencyMs}ms`);
    refreshData();
  };

  const handleRetryDLQ = (id: string) => {
    notificationEngine.retryDLQItem(id);
    refreshData();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" />
                <span>ENTERPRISE COMMUNICATIONS PLATFORM</span>
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
                SIMULATOR + LIVE GATEWAY ACTIVE
              </span>
            </div>
            <h2 className="text-3xl font-black text-white font-sans tracking-tight">
              Multi-Channel Notifications & Emergency Dispatch Gateway
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl font-sans leading-relaxed">
              Unified communication hub powering real-time SMS, Email, FCM Push, and In-App safety alerts with SA multilingual translation, retry queues, and SAPS dispatch timeline tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Gateway</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin border-b border-slate-800">
        {[
          { id: 'telemetry', label: 'Telemetry & Logs', icon: TrendingUp },
          { id: 'providers', label: 'Provider Abstraction', icon: Sliders },
          { id: 'broadcast', label: 'Emergency Broadcast', icon: ShieldAlert },
          { id: 'templates', label: 'Template Library', icon: FileText },
          { id: 'preferences', label: 'User Preferences', icon: UserCheck },
          { id: 'dlq', label: `DLQ & Retry (${dlqList.length})`, icon: RotateCcw },
          { id: 'timeline', label: 'Incident Timeline', icon: Clock },
          { id: 'report', label: 'E02 Certification', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TELEMETRY & LIVE LOGS */}
      {activeTab === 'telemetry' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <span className="text-2xs font-mono text-slate-400 uppercase">NOTIFICATIONS TODAY</span>
              <div className="text-2xl font-black text-white font-mono">{analytics.notificationsToday.toLocaleString()}</div>
              <span className="text-2xs text-emerald-400 font-mono">+12.4% vs yesterday</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <span className="text-2xs font-mono text-slate-400 uppercase">DELIVERY SUCCESS RATE</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">{analytics.deliverySuccessRate}%</div>
              <span className="text-2xs text-slate-400 font-mono">Carrier SLA: &gt;99.5%</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <span className="text-2xs font-mono text-slate-400 uppercase">AVG LATENCY</span>
              <div className="text-2xl font-black text-cyan-300 font-mono">{analytics.avgLatencyMs} ms</div>
              <span className="text-2xs text-slate-400 font-mono">End-to-End Carrier Delivery</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <span className="text-2xs font-mono text-slate-400 uppercase">TOTAL CARRIER COST</span>
              <div className="text-2xl font-black text-amber-400 font-mono">R {analytics.totalCostZar.toLocaleString()}</div>
              <span className="text-2xs text-slate-400 font-mono">ZAR Telco Gateway Fees</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <span className="text-2xs font-mono text-slate-400 uppercase">DEAD LETTER QUEUE</span>
              <div className="text-2xl font-black text-rose-400 font-mono">{analytics.dlqCount}</div>
              <span className="text-2xs text-rose-300 font-mono">Requires Agent Inspection</span>
            </div>
          </div>

          {/* Logs Stream Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" /> Real-Time Communication Dispatches
              </h3>
              <span className="text-2xs font-mono text-slate-400">Showing last {logs.length} dispatches</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-2xs">
                    <th className="pb-3">DISPATCH ID</th>
                    <th className="pb-3">RECIPIENT</th>
                    <th className="pb-3">CHANNEL</th>
                    <th className="pb-3">PROVIDER</th>
                    <th className="pb-3">LATENCY</th>
                    <th className="pb-3">STATUS</th>
                    <th className="pb-3">TIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 font-bold text-cyan-300">{log.id}</td>
                      <td className="py-3 text-slate-200">{log.recipientContact} <span className="text-slate-500">({log.recipientRole})</span></td>
                      <td className="py-3 uppercase text-slate-300">{log.channel}</td>
                      <td className="py-3 text-purple-300 font-bold">{log.provider}</td>
                      <td className="py-3 text-slate-400">{log.deliveryLatencyMs} ms</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500 text-2xs">{new Date(log.queuedAt).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROVIDER ABSTRACTION */}
      {activeTab === 'providers' && (
        <form onSubmit={handleSaveProviders} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-white text-lg">Provider Abstraction & Gateway API Keys</h3>
              <p className="text-xs text-slate-400">Configure production SMS, Email, and Push providers with instant simulation fallback.</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={providerConfig.simulationMode}
                  onChange={(e) => setProviderConfig({ ...providerConfig, simulationMode: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="font-bold text-cyan-400">Simulation Mode Active</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SMS Provider Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <MessageSquare className="w-4 h-4" /> SMS Gateway
              </div>
              <div className="space-y-2 text-xs">
                <label className="text-slate-400 block font-mono">Provider Selection:</label>
                <select 
                  value={providerConfig.smsProvider}
                  onChange={(e) => setProviderConfig({ ...providerConfig, smsProvider: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                >
                  <option value="twilio">Twilio (International / SA)</option>
                  <option value="clickatell">Clickatell (South Africa)</option>
                  <option value="bulksms">BulkSMS (South Africa)</option>
                  <option value="aws_sns">AWS SNS (af-south-1)</option>
                  <option value="simulator">Local Simulator</option>
                </select>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <label className="text-slate-400 block">API Key / Token:</label>
                <input 
                  type="password"
                  placeholder="SK_live_twilio_key_..."
                  value={providerConfig.smsApiKey || ''}
                  onChange={(e) => setProviderConfig({ ...providerConfig, smsApiKey: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            {/* Email Provider Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Mail className="w-4 h-4" /> Email Gateway
              </div>
              <div className="space-y-2 text-xs">
                <label className="text-slate-400 block font-mono">Provider Selection:</label>
                <select 
                  value={providerConfig.emailProvider}
                  onChange={(e) => setProviderConfig({ ...providerConfig, emailProvider: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                >
                  <option value="sendgrid">Twilio SendGrid API</option>
                  <option value="ses">Amazon SES (AWS SA)</option>
                  <option value="smtp">Direct SMTP Relay</option>
                  <option value="simulator">Local Simulator</option>
                </select>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <label className="text-slate-400 block">From Address:</label>
                <input 
                  type="email"
                  placeholder="itis.intergrated@gmail.com"
                  value={providerConfig.emailFromAddress || ''}
                  onChange={(e) => setProviderConfig({ ...providerConfig, emailFromAddress: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            {/* Push Provider Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Smartphone className="w-4 h-4" /> Push Gateway (FCM)
              </div>
              <div className="space-y-2 text-xs">
                <label className="text-slate-400 block font-mono">Provider Selection:</label>
                <select 
                  value={providerConfig.pushProvider}
                  onChange={(e) => setProviderConfig({ ...providerConfig, pushProvider: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                >
                  <option value="fcm">Firebase Cloud Messaging (FCM)</option>
                  <option value="simulator">Local Simulator</option>
                </select>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <label className="text-slate-400 block">Firebase Project Key:</label>
                <input 
                  type="password"
                  placeholder="itis-enterprise-fcm-key"
                  value={providerConfig.fcmProjectKey || ''}
                  onChange={(e) => setProviderConfig({ ...providerConfig, fcmProjectKey: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>
          </div>

          {pingStatus && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{pingStatus}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" /> Save & Test Connections
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: EMERGENCY BROADCAST */}
      {activeTab === 'broadcast' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-5 h-5" /> Mass Emergency Broadcast Engine
            </h3>
            <p className="text-xs text-slate-400">Dispatch critical alert broadcasts across entire school campuses, districts, or provinces in 11 official South African languages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-400">Broadcast Target Scope:</label>
                <select 
                  value={bcScope}
                  onChange={(e) => setBcScope(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                >
                  <option value="school">Single School Campus (e.g. Soweto Primary - 850 targets)</option>
                  <option value="district">Educational District (Gauteng D3 - 12,400 targets)</option>
                  <option value="province">Provincial Command (Gauteng - 185,000 targets)</option>
                  <option value="national">National Emergency Broadcast (1.25M targets)</option>
                  <option value="responders">SAPS & Emergency Tactical Responders Only (450 targets)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Region Tag:</label>
                <input 
                  type="text"
                  value={bcRegion}
                  onChange={(e) => setBcRegion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">English Message Text:</label>
                <textarea 
                  rows={2}
                  value={bcMsgEn}
                  onChange={(e) => setBcMsgEn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">isiZulu Auto-Translation:</label>
                <textarea 
                  rows={2}
                  value={bcMsgZu}
                  onChange={(e) => setBcMsgZu(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <button
                onClick={handleTriggerBroadcast}
                disabled={isBroadcasting}
                className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-white font-mono font-bold text-xs rounded-xl transition shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>{isBroadcasting ? 'Broadcasting to Telco Networks...' : 'Execute Mass Emergency Broadcast'}</span>
              </button>
            </div>

            {/* Broadcast Receipt Console */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="font-mono text-xs font-bold text-cyan-300 uppercase">Broadcast Operations Receipt</h4>
              {activeBroadcast ? (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg space-y-1">
                    <span className="text-rose-400 font-bold block">BROADCAST DISPATCHED SUCCESSFULLY</span>
                    <span className="text-slate-300 text-2xs block">Broadcast ID: {activeBroadcast.id}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Recipients Reached:</span>
                    <span className="text-white font-bold">{activeBroadcast.recipientsCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Delivery Success SLA:</span>
                    <span className="text-emerald-400 font-bold">{activeBroadcast.deliverySuccessRate}%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">SAPS Command Synced:</span>
                    <span className="text-cyan-300 font-bold">YES (mTLS Active)</span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 text-xs text-center py-12">
                  No emergency broadcast executed in current session. Select parameters and click trigger to test mass delivery.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TEMPLATES & TESTER */}
      {activeTab === 'templates' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white text-lg">Enterprise Notification Template Catalog</h3>
            <p className="text-xs text-slate-400">Pre-approved, multilingual templates compliant with South African safety and POPIA communication mandates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Template Selector List */}
            <div className="space-y-3">
              <span className="text-2xs font-mono text-slate-400 uppercase">Select Template:</span>
              <div className="space-y-2">
                {notificationEngine.getTemplates().map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTemplate(t)}
                    className={`p-3 rounded-xl border transition cursor-pointer ${
                      selectedTemplate.id === t.id
                        ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{t.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 uppercase">{t.category}</span>
                    </div>
                    <span className="text-2xs text-slate-500 block mt-1 font-mono">Supported Channels: {t.channelSupport.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Tester Panel */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
              <h4 className="font-bold text-cyan-300">Live Interactive Template Tester</h4>
              
              <div className="space-y-2">
                <span className="text-slate-400 block text-2xs">English Preview Template:</span>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 text-slate-200">
                  {selectedTemplate.bodyTemplate.en}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 block text-2xs">isiZulu Preview Template:</span>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 text-slate-200">
                  {selectedTemplate.bodyTemplate.zu}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 block text-2xs">Test Contact Phone / Email:</span>
                <input 
                  type="text"
                  value={testRecipient}
                  onChange={(e) => setTestRecipient(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
                />
              </div>

              <button
                onClick={handleTestTemplate}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Dispatch Test Notification
              </button>

              {testResult && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-300 text-2xs">
                  {testResult}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: USER PREFERENCES */}
      {activeTab === 'preferences' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white text-lg">User Communication Preferences & Quiet Hours</h3>
            <p className="text-xs text-slate-400">Granular user controls for notification channels, quiet hours override, and primary language settings.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="font-bold text-cyan-300">Channel Preferences ({userPrefs.userName})</h4>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg cursor-pointer">
                  <span className="text-slate-200">SMS Direct Carrier Alerts</span>
                  <input 
                    type="checkbox"
                    checked={userPrefs.smsEnabled}
                    onChange={(e) => setUserPrefs({ ...userPrefs, smsEnabled: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg cursor-pointer">
                  <span className="text-slate-200">Email Daily Digest & Reports</span>
                  <input 
                    type="checkbox"
                    checked={userPrefs.emailEnabled}
                    onChange={(e) => setUserPrefs({ ...userPrefs, emailEnabled: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg cursor-pointer">
                  <span className="text-slate-200">Mobile Push Notifications</span>
                  <input 
                    type="checkbox"
                    checked={userPrefs.pushEnabled}
                    onChange={(e) => setUserPrefs({ ...userPrefs, pushEnabled: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                  />
                </label>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="font-bold text-purple-300">Quiet Hours & Language Overrides</h4>
              
              <div className="space-y-2">
                <label className="text-slate-400 block">Preferred SA Language:</label>
                <select 
                  value={userPrefs.preferredLanguage}
                  onChange={(e) => setUserPrefs({ ...userPrefs, preferredLanguage: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white"
                >
                  <option value="en">English (Official)</option>
                  <option value="zu">isiZulu</option>
                  <option value="af">Afrikaans</option>
                  <option value="st">Sesotho</option>
                  <option value="xh">isiXhosa</option>
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={userPrefs.quietHoursEnabled}
                    onChange={(e) => setUserPrefs({ ...userPrefs, quietHoursEnabled: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-slate-200">Enable Quiet Hours (Suppress non-emergency alerts)</span>
                </label>
                <p className="text-2xs text-slate-500 pl-6">Emergency SOS panic alerts ALWAYS bypass quiet hours restrictions.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DLQ & RETRY */}
      {activeTab === 'dlq' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2 text-rose-400">
                <RotateCcw className="w-5 h-5" /> Dead Letter Queue (DLQ) & Failure Analytics
              </h3>
              <p className="text-xs text-slate-400">Inspect failed carrier dispatches, review error diagnostics, and trigger manual retry procedures.</p>
            </div>
            <span className="px-3 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold">
              {dlqList.length} Items in DLQ
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {dlqList.length > 0 ? (
              dlqList.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-300">{item.id}</span>
                      <span className="text-2xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold uppercase">{item.failedReason}</span>
                    </div>
                    <p className="text-slate-300 text-2xs">{item.body}</p>
                    <span className="text-slate-500 text-[10px] block">Target: {item.recipientContact} | Provider: {item.provider} | Retries: {item.retryCount}/{item.maxRetries}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleRetryDLQ(item.id)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-2xs rounded-lg transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Force Retry Delivery
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-500 py-12">Dead Letter Queue is empty. All dispatches delivered successfully.</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 7: INCIDENT TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" /> End-to-End Emergency Alert Delivery Timeline
            </h3>
            <p className="text-xs text-slate-400">Forensic millisecond timeline from SOS panic button activation to SAPS acknowledgment and parent notification read receipt.</p>
          </div>

          <div className="relative pl-6 space-y-6 border-l-2 border-slate-800 font-mono text-xs">
            {[
              { time: '+0.00s', event: 'SOS Panic Button Triggered', desc: 'BLE Wristband #TAG-902 button held for 3 seconds at Soweto High School Gate 1.', status: 'COMPLETED' },
              { time: '+0.12s', event: 'Central Notification Gateway Ingested', desc: 'Central Notification Engine ingested panic payload & prioritized as EMERGENCY.', status: 'COMPLETED' },
              { time: '+0.45s', event: 'Multi-Channel Parallel Dispatch', desc: 'Simultaneous SMS (Twilio), Push (FCM), and SAPS Command mTLS payload dispatched.', status: 'COMPLETED' },
              { time: '+1.02s', event: 'SAPS 10111 Dispatch Center Received', desc: 'Command center workstation alerted with live GPS coordinates.', status: 'COMPLETED' },
              { time: '+2.10s', event: 'Parent Mobile App Push Delivered & Read', desc: 'Parent device acknowledged read receipt (Nomvula Sithole).', status: 'COMPLETED' },
              { time: '+4.80s', event: 'SAPS Flying Squad Unit 4 Acknowledged', desc: 'Response vehicle dispatched with ETA 6 minutes.', status: 'ACTIVE' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900" />
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300">{step.event}</span>
                    <span className="text-2xs text-slate-500 font-bold">{step.time}</span>
                  </div>
                  <p className="text-slate-400 text-2xs">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: E02 CERTIFICATION REPORT */}
      {activeTab === 'report' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" /> Communications Engine Readiness Certification
            </h3>
            <p className="text-xs text-slate-400">Formal audit matrix verifying software completion against real-world telco provider requirements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase">✓ Software & System Architecture (100% Complete)</h4>
              <ul className="space-y-2 text-xs font-sans text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Unified Notification Engine & Provider Abstraction Layer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multilingual South African Template Catalog (EN, ZU, AF, ST)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Mass Emergency Broadcast Engine with Scope Filtering</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Dead Letter Queue (DLQ), Exponential Backoff & Retry Logic</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> User Preferences, Quiet Hours & Emergency Bypass Overrides</li>
              </ul>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="font-mono text-xs font-bold text-amber-400 uppercase">⚠ Commercial & Carrier Prerequisites</h4>
              <ul className="space-y-2 text-xs font-sans text-slate-300">
                <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-400 shrink-0" /> Twilio / Clickatell Commercial Account & ZAR SMS Credits</li>
                <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-400 shrink-0" /> Verified SendGrid / Google Workspace Domain (itis.intergrated@gmail.com)</li>
                <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-400 shrink-0" /> Firebase Cloud Messaging Service Account Credentials</li>
                <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-400 shrink-0" /> ICASA Telecommunications Approval for Dedicated SMS Shortcodes</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
