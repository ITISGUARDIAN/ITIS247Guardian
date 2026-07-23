import React, { useState } from 'react';
import {
  ShieldAlert,
  Radio,
  Brain,
  AlertTriangle,
  Siren,
  Bell,
  School,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  Zap,
  Users,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export const SafetyPipeline: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<'cascade' | 'routine' | 'sos'>('sos');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Workflow steps for High Priority SOS Pipeline
  const sosSteps = [
    {
      step: 1,
      title: 'Emergency Trigger',
      subTitle: 'Child presses SOS button OR AI detects abnormal movement pattern',
      role: 'Learner Wearable / AI Engine',
      latency: '< 50ms',
      description: 'Physical tactile panic press on IoT device or AI anomaly detection triggering an immediate high-priority system interrupt.',
      module: 'SOSHandlerModule & TelemetryIngestModule',
      payload: '{"deviceId": "DEV-8821", "type": "PANIC_HARDWARE", "lat": -26.2041, "lng": 28.0473, "speed": 62.4, "heading": 182}'
    },
    {
      step: 2,
      title: 'High Priority Incident Allocation',
      subTitle: 'System flags continuous GPS stream & assigns emergency dockets',
      role: 'ITIS Risk Engine',
      latency: '< 100ms',
      description: 'System automatically upgrades telemetry polling to sub-second frequency (100ms interval) and locks camera/GPS feeds.',
      module: 'SpatialStreamProcessor & IncidentDocketModule',
      payload: '{"incidentId": "INC-2026-0941", "threatScore": 98.4, "status": "ACTIVE_EMERGENCY", "frequency": "100ms"}'
    },
    {
      step: 3,
      title: 'Continuous Tracking & Route Prediction',
      subTitle: 'AI calculates probable velocity vector and arrival points',
      role: 'AI Intelligence Service',
      latency: '< 150ms',
      description: 'Machine learning model evaluates spatial trajectory, current traffic, and street networks to predict target destination.',
      module: 'PredictiveETAModule & PatternOfLifeEngine',
      payload: '{"predictedRoute": [[-26.204, 28.047], [-26.209, 28.051]], "vectorConfidence": 0.94, "heading": "SOUTH"}'
    },
    {
      step: 4,
      title: 'Instant Multi-Stakeholder Dispatch',
      subTitle: 'Parents receive push radar, Command Centre wall alerts, School notified',
      role: 'Command Centre & Parent Engagement',
      latency: '< 300ms',
      description: 'High-priority APNS/FCM push notifications sent to parents with live radar link; Command Centre video wall flashes red queue alert.',
      module: 'ParentPortalModule & CommandWallController',
      payload: '{"pushSent": true, "parentsNotified": ["USR-9912"], "schoolNotified": "SCH-401", "wallPriority": "P1"}'
    },
    {
      step: 5,
      title: 'Tactical Responder Dispatch',
      subTitle: 'Nearest armed response or EMS unit receives live coordinates and turn-by-turn nav',
      role: 'Emergency Response Partner',
      latency: '< 1,000ms',
      description: 'System queries PostGIS spatial index to identify nearest armed security unit and streams turn-by-turn navigation.',
      module: 'ProximateDispatchEngine & ResponderAppInterface',
      payload: '{"responderUnitId": "UNIT-TAC-04", "etaMinutes": 4.2, "distanceKm": 2.1, "navStream": "ACTIVE"}'
    },
    {
      step: 6,
      title: 'Live Operational Tracking',
      subTitle: 'Continuous recalculation of ETA and responder position overlay',
      role: 'Command Centre Supervisor',
      latency: 'Continuous',
      description: 'Command controller monitors live video/audio, communicates with field responders, and maintains real-time tactical overview.',
      module: 'OperatorWorkstationModule & TacticalRoutingModule',
      payload: '{"liveDistance": "450m", "interceptionETA": "1 min 20 sec", "audioStream": "ESTABLISHED"}'
    },
    {
      step: 7,
      title: 'Recovery & Tamper-Evident Report',
      subTitle: 'Learner recovered safely; cryptographically sealed forensic report generated',
      role: 'Super Administrator / Police Partner',
      latency: 'Post-Incident',
      description: 'Child verified safe by responder. Incident docket cryptographically sealed with hash digest for SAPS & court evidence.',
      module: 'EvidentiaryExportModule & POPIAConsentEngine',
      payload: '{"outcome": "CHILD_SAFE", "sealedHash": "0x8f3b...e4a1", "sapsDocketRef": "SAPS-JHB-2026-881"}'
    }
  ];

  const handleNextStep = () => {
    if (currentStep < sosSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleResetSim = () => {
    setCurrentStep(0);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* Title & Mission Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center space-x-3 mb-3">
          <span className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-red-400">
            Core Safety Architecture & Response Pipeline
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          ITIS Operational Emergency Response Pipeline
        </h2>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          From sub-second IoT wearable telemetry ingestion through AI threat evaluation to sub-3-second tactical emergency dispatch across Africa.
        </p>

        {/* Core Mission Cascade Visual */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-3">
            Core Operational Mission Cascade
          </span>

          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center space-x-2 text-xs font-bold text-white bg-slate-900 px-3 py-2 rounded-lg border border-slate-700">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Every Child</span>
            </div>

            <span className="text-slate-600 font-bold">→</span>

            <div className="flex items-center space-x-2 text-xs font-bold text-white bg-slate-900 px-3 py-2 rounded-lg border border-slate-700">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>One GPS Device</span>
            </div>

            <span className="text-slate-600 font-bold">→</span>

            <div className="flex items-center space-x-2 text-xs font-bold text-white bg-slate-900 px-3 py-2 rounded-lg border border-slate-700">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>One Digital Safety Profile</span>
            </div>

            <span className="text-slate-600 font-bold">→</span>

            <div className="flex items-center space-x-2 text-xs font-bold text-white bg-slate-900 px-3 py-2 rounded-lg border border-slate-700">
              <Siren className="w-4 h-4 text-purple-400" />
              <span>One Command Centre</span>
            </div>

            <span className="text-slate-600 font-bold">→</span>

            <div className="flex items-center space-x-2 text-xs font-bold text-white bg-slate-900 px-3 py-2 rounded-lg border border-slate-700">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Coordinated Emergency Response</span>
            </div>

            <span className="text-slate-600 font-bold">→</span>

            <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-300 bg-emerald-950/80 px-3 py-2 rounded-lg border border-emerald-500/50 shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Child Safe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-800">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveWorkflow('sos')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeWorkflow === 'sos'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Interactive SOS & Threat Pipeline</span>
          </button>

          <button
            onClick={() => setActiveWorkflow('routine')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeWorkflow === 'routine'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Routine Danger Loop Architecture</span>
          </button>
        </div>

        {activeWorkflow === 'sos' && (
          <div className="flex items-center space-x-2 px-2">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 text-xs font-bold"
            >
              ← Previous
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Step {currentStep + 1} of {sosSteps.length}
            </span>
            <button
              onClick={handleNextStep}
              disabled={currentStep === sosSteps.length - 1}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold disabled:opacity-40"
            >
              Next Step →
            </button>
            <button
              onClick={handleResetSim}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: INTERACTIVE SOS PIPELINE SIMULATION */}
      {activeWorkflow === 'sos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stepper Timeline on Left */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Pipeline Execution Steps
            </h3>

            <div className="space-y-3">
              {sosSteps.map((s, idx) => {
                const isActive = idx === currentStep;
                const isPassed = idx < currentStep;

                return (
                  <div
                    key={s.step}
                    onClick={() => setCurrentStep(idx)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-950/60 border-red-500 ring-1 ring-red-500/50 shadow-lg shadow-red-500/10'
                        : isPassed
                        ? 'bg-slate-900 border-slate-700 text-slate-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            isActive
                              ? 'bg-red-500 text-white'
                              : isPassed
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.step}
                        </span>
                        <div>
                          <h4 className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                            {s.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">{s.role}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {s.latency}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector Card on Right */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                    Step 0{sosSteps[currentStep].step} Specification
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    SLA: {sosSteps[currentStep].latency}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{sosSteps[currentStep].title}</h3>
                <p className="text-xs text-slate-400 mt-1">{sosSteps[currentStep].subTitle}</p>
              </div>

              <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                <Zap className="w-6 h-6" />
              </div>
            </div>

            {/* Step Description */}
            <div className="space-y-4 text-xs">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <h4 className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  Operational Logic & Behavior
                </h4>
                <p className="text-slate-300 leading-relaxed">{sosSteps[currentStep].description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/30 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Responsible Module</span>
                  <span className="text-xs font-bold text-indigo-300 font-mono mt-0.5 block">
                    {sosSteps[currentStep].module}
                  </span>
                </div>

                <div className="bg-slate-800/30 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Primary System Actor</span>
                  <span className="text-xs font-bold text-emerald-300 font-mono mt-0.5 block">
                    {sosSteps[currentStep].role}
                  </span>
                </div>
              </div>

              {/* JSON Payload Inspection */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Real-Time Event Payload (MQTT/WebSocket):
                </span>
                <pre className="p-4 rounded-xl bg-slate-950 font-mono text-[11px] text-emerald-400 border border-slate-800 overflow-x-auto">
                  {JSON.stringify(JSON.parse(sosSteps[currentStep].payload), null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: ROUTINE TELEMETRY & DANGER DETECTION LOOP */}
      {activeWorkflow === 'routine' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-indigo-400" />
              Routine Telemetry & Threat Evaluation Loop
            </h3>
            <p className="text-slate-400 mt-1">
              End-to-end flow chart mapping continuous position pinging through risk engine evaluation to child safety verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Step 1</span>
                <h4 className="font-bold text-white mt-1">Child Wearing Device</h4>
                <p className="text-slate-400 mt-2 leading-relaxed">
                  IoT Wearable transmits NMEA coordinates every 5 seconds over LTE-M / NB-IoT network.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-700/50 flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Ingestion Layer</span>
                <span>5s Interval</span>
              </div>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Step 2</span>
                <h4 className="font-bold text-white mt-1">GPS Location Updated</h4>
                <p className="text-slate-400 mt-2 leading-relaxed">
                  Sub-second MQTT telemetry pipeline ingests stream into TimescaleDB and Redis spatial cache.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-700/50 flex justify-between text-[10px] text-slate-500 font-mono">
                <span>TimescaleDB</span>
                <span>&lt; 150ms</span>
              </div>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Step 3</span>
                <h4 className="font-bold text-white mt-1">AI Movement Verification</h4>
                <p className="text-slate-400 mt-2 leading-relaxed">
                  Evaluates geofence boundaries, unscheduled stops, speed anomalies, and high-risk corridor entry.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-700/50 flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Gemini/ML Model</span>
                <span>Anomaly Check</span>
              </div>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Step 4</span>
                <h4 className="font-bold text-white mt-1">Risk Engine Assessment</h4>
                <p className="text-slate-400 mt-2 leading-relaxed">
                  Calculates 0-100 danger score. If score exceeds threshold (&gt;75), triggers automatic escalation.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-700/50 flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Threat Score</span>
                <span>0-100 Index</span>
              </div>
            </div>

            <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Step 5</span>
                <h4 className="font-bold text-emerald-200 mt-1">Incident Resolution</h4>
                <p className="text-emerald-300/80 mt-2 leading-relaxed">
                  Command centre dispatches nearest partner. Tracking continues until child safety is verified.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-emerald-800/40 flex justify-between text-[10px] text-emerald-400 font-mono">
                <span>Status</span>
                <span>Child Safe</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
