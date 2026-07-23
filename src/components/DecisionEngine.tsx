import React, { useState } from 'react';
import {
  Brain,
  ShieldAlert,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Siren,
  FileCheck,
  Zap,
  Lock,
  ArrowRight,
  ShieldCheck,
  Activity,
  HeartHandshake,
  MessageSquare,
  Clock,
  Sparkles,
  Server
} from 'lucide-react';
import {
  THREAT_LEVELS,
  QUICK_STATUS_MESSAGES,
  EVIDENCE_CHAIN_FIELDS,
  VISION_2035
} from '../data/sprint1Data';

export const DecisionEngine: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(4); // Default on Decision Engine
  const [selectedThreatLevel, setSelectedThreatLevel] = useState<string>('Red');
  const [quickStatusSent, setQuickStatusSent] = useState<string | null>(null);

  const decisionFlowStages = [
    {
      id: 0,
      title: 'GPS Telemetry Ingestion',
      subtitle: 'Raw NMEA / IoT binary ping',
      icon: Radio,
      desc: 'High-throughput TCP/MQTT pipeline ingests 50,000+ coordinates per second into TimescaleDB spatial buffers.'
    },
    {
      id: 1,
      title: 'Device Validation',
      subtitle: 'IMEI & Hardware Integrity',
      icon: Lock,
      desc: 'Authenticates device cryptographic keys, battery telemetry, IMEI validity, and tamper detection flags.'
    },
    {
      id: 2,
      title: 'Location Validation',
      subtitle: 'Coordinate & Map Matching',
      icon: ShieldCheck,
      desc: 'Filters GPS multipath errors, checks satellite HDOP quality, and snaps raw points to known road network geometry.'
    },
    {
      id: 3,
      title: 'Movement Analysis',
      subtitle: 'Speed & Geofence Trajectory',
      icon: Activity,
      desc: 'Evaluates spatial displacement vectors, speed anomalies, unscheduled stops, and safe corridor boundaries.'
    },
    {
      id: 4,
      title: 'AI Risk Assessment',
      subtitle: 'Gemini Pattern of Life Engine',
      icon: Brain,
      desc: 'Evaluates historical habit patterns, time of day, regional crime heatmaps, and calculates a 0.00-100.00 threat score.'
    },
    {
      id: 5,
      title: 'Child Safety Decision Engine',
      subtitle: 'Operational Core Brain',
      icon: Sparkles,
      desc: 'Synthesizes all validation feeds, classifies threat level (Green/Amber/Orange/Red), and routes alerts without notification spam.'
    }
  ];

  const handleSendQuickStatus = (id: string) => {
    setQuickStatusSent(id);
    setTimeout(() => {
      setQuickStatusSent(null);
    }, 4000);
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* Vision 2035 Outcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center space-x-3 mb-3">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-300">
            {VISION_2035.title}
          </span>
        </div>

        <blockquote className="text-lg md:text-xl font-bold text-white italic max-w-4xl leading-relaxed">
          "{VISION_2035.quote}"
        </blockquote>
        <p className="text-xs text-indigo-200/80 mt-3 font-mono">
          Strategic Focus: {VISION_2035.focus}
        </p>
      </div>

      {/* SECTION 1: THE CHILD SAFETY DECISION ENGINE FLOW */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Brain className="w-4 h-4" />
              <span>Core Operational Brain</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              The Child Safety Decision Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Every incoming GPS telemetry ping passes sequentially through 5 validation stages before any notifications or emergency escalations occur.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Processing SLA: &lt; 150ms / ping</span>
          </div>
        </div>

        {/* Sequential Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
          {decisionFlowStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">0{idx + 1}</span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">{stage.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">{stage.subtitle}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Stage {idx + 1}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Box */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400">
            <span>Selected Validation Node:</span>
            <span className="text-white font-mono">{decisionFlowStages[activeStage].title}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {decisionFlowStages[activeStage].desc}
          </p>
        </div>

        {/* Decision Outputs Cascade */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
            Decision Engine Outbound Notification & Coordination Matrix
          </span>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-amber-400">Channel 1</span>
              <h4 className="text-xs font-bold text-white mt-1">Parent Alert Channel</h4>
              <p className="text-[11px] text-slate-400 mt-1">Instant push notification, live radar map link, status update.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-indigo-400">Channel 2</span>
              <h4 className="text-xs font-bold text-white mt-1">School Alert Channel</h4>
              <p className="text-[11px] text-slate-400 mt-1">School administrator portal docket, attendance integration ping.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-red-400">Channel 3</span>
              <h4 className="text-xs font-bold text-white mt-1">Command Centre Alert</h4>
              <p className="text-[11px] text-slate-400 mt-1">Video wall priority pop-up, supervisor action queue, camera feed overlay.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-red-900/50 bg-red-950/20">
              <span className="text-[10px] uppercase font-bold text-red-400">Channel 4</span>
              <h4 className="text-xs font-bold text-red-200 mt-1">Emergency Response Coordination</h4>
              <p className="text-[11px] text-red-300/80 mt-1">Identifies configured partner(s), transmits verified docket, updates ETA continuous stream.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 4-TIER THREAT LEVEL CLASSIFICATION GRID */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Threat Classification Matrix</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            4-Tier Threat Level Incident Classification
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Reduces false alarms while ensuring high-risk emergencies receive immediate sub-second priority escalation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {THREAT_LEVELS.map((tl) => (
            <div
              key={tl.level}
              onClick={() => setSelectedThreatLevel(tl.level)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                tl.colorClass
              } ${selectedThreatLevel === tl.level ? 'ring-2 ring-white/50 scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${tl.badgeClass}`}>
                  Level {tl.level}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{tl.code}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{tl.level} Threat</h3>
                <p className="text-xs text-slate-300 mt-1 leading-snug">{tl.scenario}</p>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Automated System Action:</span>
                <p className="text-slate-200 font-medium leading-relaxed">{tl.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: DIGITAL EVIDENCE CHAIN & PARENT 'I'M SAFE' FEATURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Digital Evidence Chain on Left */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            <span>Forensic Docket Security</span>
          </div>
          <h3 className="text-xl font-bold text-white">Digital Evidence Chain & Audit Trail</h3>
          <p className="text-xs text-slate-400">
            Automatically preserves immutable telemetry, AI scores, geofences, and supervisor actions sealed with SHA-256 digests for SAPS law enforcement and court disclosure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {EVIDENCE_CHAIN_FIELDS.map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{item.field}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                    {item.type}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Parent / Learner 'I'm Safe' Module on Right */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>Learner Communication & Reassurance</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">Parent App: "I'm Safe" Quick Status</h3>
            <p className="text-xs text-slate-400 mt-1">
              Reduces unnecessary emergency escalations by allowing children or transport drivers to send instant one-tap status check-ins.
            </p>

            <div className="space-y-3 mt-4">
              {QUICK_STATUS_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSendQuickStatus(msg.id)}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <MessageSquare className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{msg.label}</h4>
                      <p className="text-[10px] text-slate-400">{msg.desc}</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-indigo-400 px-2.5 py-1 rounded bg-indigo-950/60 border border-indigo-800/50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    Test Ping
                  </button>
                </div>
              ))}
            </div>

            {quickStatusSent && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center space-x-2 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Quick status ping "{quickStatusSent}" dispatched to parents & logged!</span>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-normal mt-4">
            <span className="font-bold text-white block mb-0.5">Emergency Response Framing Note</span>
            "Emergency Response Coordination Layer identifies configured response partners, securely transmits verified incident dockets, and streams live updates in accordance with integration agreements."
          </div>
        </div>
      </div>
    </div>
  );
};
