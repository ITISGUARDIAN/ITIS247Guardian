import React, { useState } from 'react';
import {
  Bell,
  MessageSquare,
  Globe,
  Radio,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Lock,
  Layers,
  Database,
  FileCode,
  ShieldCheck,
  Zap,
  Users,
  Activity,
  UserCheck,
  RefreshCw,
  PhoneCall,
  Smartphone,
  Mail,
  MessageCircle,
  Server,
  Eye,
  CheckCheck
} from 'lucide-react';
import {
  SA_LANGUAGES,
  SAMPLE_TEMPLATES,
  SAMPLE_NOTIFICATION_QUEUE,
  SAMPLE_THREAD_MESSAGES,
  PSNCE_CODE_SPECS,
  CRITICAL_PSNCE_RULES,
  SouthAfricanLanguage,
  NotificationPriority,
  NotificationChannelType,
  QueueItem,
  ThreadMessage,
  NotificationTemplate
} from '../data/psnceModuleData';

export const PsnceModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'queue' | 'thread' | 'templates' | 'channels' | 'statemachine' | 'schema' | 'architecture'
  >('queue');

  // Interactive States
  const [queue, setQueue] = useState<QueueItem[]>(SAMPLE_NOTIFICATION_QUEUE);
  const [messages, setMessages] = useState<ThreadMessage[]>(SAMPLE_THREAD_MESSAGES);
  const [selectedLanguage, setSelectedLanguage] = useState<SouthAfricanLanguage>('ISIZULU');
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate>(SAMPLE_TEMPLATES[0]);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState(PSNCE_CODE_SPECS[0]);

  // Form states for sending new notification simulator
  const [simLearnerName, setSimLearnerName] = useState('Sipho Zulu');
  const [simRecipientName, setSimRecipientName] = useState('Nomvula Zulu (Mother)');
  const [simPriority, setSimPriority] = useState<NotificationPriority>('CRITICAL');
  const [simChannel, setSimChannel] = useState<NotificationChannelType>('SMS');
  const [notificationLog, setNotificationLog] = useState<string[]>([]);

  // Chat message input state
  const [chatInput, setChatInput] = useState('');
  const [chatSenderRole, setChatSenderRole] = useState<'PARENT' | 'COMMAND_OPERATOR' | 'RESPONDER'>('PARENT');

  const addLog = (msg: string) => {
    setNotificationLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 8)]);
  };

  // Enqueue new notification
  const handleEnqueue = () => {
    const newId = `NTF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const template = SAMPLE_TEMPLATES[0];
    const title = template.titleTemplate[selectedLanguage].replace('{{LearnerName}}', simLearnerName);
    const body = template.bodyTemplate[selectedLanguage]
      .replace('{{LearnerName}}', simLearnerName)
      .replace('{{CurrentLocation}}', 'Orlando West High')
      .replace('{{ResponderAgency}}', 'SAPS Soweto Tactical')
      .replace('{{ETA}}', '3');

    const newItem: QueueItem = {
      id: newId,
      incidentId: 'ITIS-2026-GP-00000045',
      learnerName: simLearnerName,
      recipientName: simRecipientName,
      recipientRole: 'Parent',
      recipientLanguage: selectedLanguage,
      eventType: 'incident.created',
      channel: simChannel,
      priority: simPriority,
      title,
      body,
      status: 'DELIVERED',
      queuedAt: new Date().toLocaleTimeString(),
      deliveredAt: new Date().toLocaleTimeString(),
      retryCount: 0,
      dedupHash: `sha256-dedup-${Math.floor(Math.random() * 10000)}`,
    };

    setQueue([newItem, ...queue]);
    addLog(`ENQUEUED & DELIVERED (${simChannel}): ${newId} -> ${simRecipientName} (<20ms queue)`);
  };

  // Send message in family thread
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMsg: ThreadMessage = {
      id: `MSG-${Date.now()}`,
      threadId: 'THREAD-ITIS-2026-GP-00000045',
      senderName:
        chatSenderRole === 'PARENT'
          ? 'Nomvula Zulu (Mother)'
          : chatSenderRole === 'COMMAND_OPERATOR'
          ? 'Operator J. Sithole (Command Centre)'
          : 'SAPS Soweto Tactical #4',
      senderRole: chatSenderRole,
      content: chatInput,
      timestamp: new Date().toLocaleTimeString(),
      isSystemEvent: false,
      isReadByParent: true,
    };

    setMessages([...messages, newMsg]);
    setChatInput('');
    addLog(`THREAD MSG SENT: ${newMsg.senderName}`);
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl border border-blue-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-300 text-xs font-semibold">
              <Bell className="w-3.5 h-3.5 animate-pulse text-blue-400" />
              <span>PROMPT 028 — PARENT, SCHOOL & STAKEHOLDER NOTIFICATION ENGINE (PSNCE)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Parent & Stakeholder <span className="text-blue-400">Notification Engine</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Delivering timely, role-appropriate, secure, multilingual communications across 11 official South African languages to parents, guardians, schools, and emergency responders without creating alert fatigue or privacy violations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/80 p-4 rounded-xl border border-blue-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-blue-400">&lt;20 ms</span>
              <span className="text-xs text-slate-400 font-medium">Queue Latency</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">11 Languages</span>
              <span className="text-xs text-slate-400 font-medium">SA Multilingual</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">1,000,000+</span>
              <span className="text-xs text-slate-400 font-medium">Daily Capacity</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('queue')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'queue'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4 text-blue-400" />
            <span>1. Live Notification Queue</span>
          </button>

          <button
            onClick={() => setActiveSubTab('thread')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'thread'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>2. Family Communication Thread</span>
          </button>

          <button
            onClick={() => setActiveSubTab('templates')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'templates'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>3. Multilingual Templates (11 Languages)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('channels')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'channels'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4 text-purple-400" />
            <span>4. Channel Health & Failover</span>
          </button>

          <button
            onClick={() => setActiveSubTab('statemachine')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'statemachine'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-teal-400" />
            <span>5. Delivery Lifecycle Machine</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-indigo-400" />
            <span>6. Relational Prisma Schema</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'architecture'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>7. NestJS Services & REST</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: LIVE NOTIFICATION QUEUE */}
      {activeSubTab === 'queue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* NOTIFICATION SIMULATION FORM */}
            <div className="lg:col-span-1 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">Trigger Notification</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-xs font-mono font-bold border border-blue-800">
                  EVENT BUS
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Learner Name</label>
                  <input
                    type="text"
                    value={simLearnerName}
                    onChange={(e) => setSimLearnerName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400">Recipient Name & Role</label>
                  <input
                    type="text"
                    value={simRecipientName}
                    onChange={(e) => setSimRecipientName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400">Preferred Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as SouthAfricanLanguage)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    {SA_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.label} ({lang.native})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Priority</label>
                    <select
                      value={simPriority}
                      onChange={(e) => setSimPriority(e.target.value as NotificationPriority)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="CRITICAL">CRITICAL (Bypass Quiet)</option>
                      <option value="HIGH">HIGH (Push + SMS)</option>
                      <option value="NORMAL">NORMAL (Push)</option>
                      <option value="LOW">LOW (In-App Digest)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400">Primary Channel</label>
                    <select
                      value={simChannel}
                      onChange={(e) => setSimChannel(e.target.value as NotificationChannelType)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white mt-1 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="SMS">SMS</option>
                      <option value="PUSH_FIREBASE">Firebase Push</option>
                      <option value="WHATSAPP_BUSINESS">WhatsApp Business</option>
                      <option value="VOICE_CALL">Voice Call</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleEnqueue}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enqueue & Dispatch Notification</span>
                </button>
              </div>

              {/* SIMULATION EVENT LOG */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Notification Queue Log
                </span>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 h-36 overflow-y-auto space-y-1">
                  {notificationLog.length === 0 ? (
                    <span className="text-slate-600 italic">No queue events logged in session.</span>
                  ) : (
                    notificationLog.map((log, idx) => (
                      <div key={idx} className="text-blue-400 border-b border-slate-900 pb-1">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* LIVE QUEUE DISPLAY */}
            <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Active Queue & Delivery Log</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {queue.length} Total Messages
                </span>
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border bg-slate-950/60 border-slate-800 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-blue-900/60 border border-blue-700/50 text-blue-300 text-xs font-mono font-bold">
                          {item.id}
                        </span>
                        <span className="text-xs font-bold text-white">{item.recipientName}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                          {item.recipientLanguage}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.priority === 'CRITICAL'
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : item.priority === 'HIGH'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-blue-950 text-blue-400 border border-blue-800'
                          }`}
                        >
                          {item.priority}
                        </span>

                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold flex items-center space-x-1">
                          <CheckCheck className="w-3 h-3" />
                          <span>{item.status}</span>
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                      <h5 className="text-xs font-bold text-slate-200">{item.title}</h5>
                      <p className="text-xs text-slate-400">{item.body}</p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Channel: {item.channel}</span>
                      <span>Deduplication Hash: {item.dedupHash}</span>
                      <span>Queued: {item.queuedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CRITICAL BUSINESS RULES */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>10 Mandatory PSNCE Notification Business Rules</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {CRITICAL_PSNCE_RULES.map((rule) => (
                <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-400">RULE #{rule.id}</span>
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
      )}

      {/* SUB-TAB 2: FAMILY COMMUNICATION THREAD */}
      {activeSubTab === 'thread' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span>Secure Family Incident Communication Thread</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Incident-bound messaging thread linking Parents, Command Centre Operators, and Responders.
                </p>
              </div>

              <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-mono font-bold">
                THREAD-ITIS-2026-GP-00000045
              </span>
            </div>

            {/* CHAT MESSAGES DISPLAY */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-[380px] overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl max-w-2xl border text-xs space-y-1 ${
                    msg.isSystemEvent
                      ? 'bg-amber-950/40 border-amber-800/60 text-amber-200 mx-auto text-center'
                      : msg.senderRole === 'PARENT'
                      ? 'bg-blue-950/60 border-blue-800 text-blue-100 ml-auto'
                      : 'bg-slate-900 border-slate-800 text-slate-200 mr-auto'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/60 pb-1">
                    <span className="font-bold">{msg.senderName} ({msg.senderRole})</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="pt-1 text-sm">{msg.content}</p>
                </div>
              ))}
            </div>

            {/* CHAT INPUT AREA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <select
                value={chatSenderRole}
                onChange={(e) => setChatSenderRole(e.target.value as any)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="PARENT">Parent (Nomvula Zulu)</option>
                <option value="COMMAND_OPERATOR">Command Operator</option>
                <option value="RESPONDER">SAPS Tactical Responder</option>
              </select>

              <input
                type="text"
                placeholder="Type message into secure incident thread..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-emerald-500"
              />

              <button
                onClick={handleSendMessage}
                className="w-full sm:w-auto px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MULTILINGUAL TEMPLATE ENGINE */}
      {activeSubTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-amber-400" />
                  <span>11 South African Official Languages Template Engine</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Select a language below to view localized notification strings instantly.
                </p>
              </div>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as SouthAfricanLanguage)}
                className="bg-amber-950 border border-amber-800 text-amber-300 font-bold rounded-xl px-4 py-2 text-xs outline-none"
              >
                {SA_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label} — {lang.native}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_TEMPLATES.map((tpl) => (
                <div key={tpl.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">{tpl.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                      {tpl.eventType}
                    </span>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-amber-400 uppercase font-bold">
                      Localized Title ({selectedLanguage})
                    </span>
                    <p className="text-xs font-bold text-white">
                      {tpl.titleTemplate[selectedLanguage]}
                    </p>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-amber-400 uppercase font-bold">
                      Localized Message Body ({selectedLanguage})
                    </span>
                    <p className="text-xs text-slate-300">
                      {tpl.bodyTemplate[selectedLanguage]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: CHANNEL HEALTH & FAILOVER */}
      {activeSubTab === 'channels' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Server className="w-5 h-5 text-purple-400" />
              <span>Multi-Channel Provider Transport Health & Failover</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Firebase Cloud Messaging (FCM)', type: 'PUSH', status: 'HEALTHY', latency: '42ms', uptime: '99.98%' },
                { name: 'Apple Push Notification Service (APNs)', type: 'PUSH', status: 'HEALTHY', latency: '38ms', uptime: '99.99%' },
                { name: 'Twilio Gateway SMS', type: 'SMS', status: 'HEALTHY', latency: '820ms', uptime: '99.91%' },
                { name: 'WhatsApp Business API', type: 'WHATSAPP', status: 'HEALTHY', latency: '410ms', uptime: '99.95%' },
              ].map((channel, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{channel.name}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                      {channel.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Latency:</span>
                      <span className="text-slate-200 font-mono">{channel.latency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="text-slate-200 font-mono">{channel.uptime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: DELIVERY LIFECYCLE MACHINE */}
      {activeSubTab === 'statemachine' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Activity className="w-5 h-5 text-teal-400" />
              <span>Notification Delivery State Machine</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { status: 'QUEUED', desc: 'Message inserted into Redis/Postgres queue (<20ms)' },
                { status: 'SENT', desc: 'Dispatched to provider transport API' },
                { status: 'DELIVERED', desc: 'Device confirmed receipt' },
                { status: 'READ', desc: 'Recipient opened push/SMS' },
                { status: 'ACKNOWLEDGED', desc: 'Parent acknowledged critical alert' },
              ].map((st, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-teal-400">STEP {idx + 1}</span>
                  <h4 className="text-xs font-bold text-white">{st.status}</h4>
                  <p className="text-[11px] text-slate-400">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: RELATIONAL PRISMA SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Prisma Notification Database Schema</h3>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-bold">
                11 Relational Tables
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {PSNCE_CODE_SPECS[0].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: NESTJS SERVICES & REST */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">NestJS Services & REST Specs</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {PSNCE_CODE_SPECS.map((spec) => (
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
    </div>
  );
};
