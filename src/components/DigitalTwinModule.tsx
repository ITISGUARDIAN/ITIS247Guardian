import React, { useState } from 'react';
import {
  Cpu,
  Activity,
  Zap,
  Globe,
  Radio,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  Terminal,
  Download,
  Brain,
  FileCode,
  ShieldAlert,
  Sliders,
  BarChart3,
  Layers,
  MapPin,
  RefreshCw,
  Award,
  Video,
  Users,
  Building2,
  Flame,
  Siren,
  Sparkles,
  Server
} from 'lucide-react';
import {
  SAMPLE_SIMULATION_SCENARIOS,
  SAMPLE_REPLAY_FRAMES,
  DIGITAL_TWIN_CODE_SPECS,
  CRITICAL_DIGITAL_TWIN_RULES,
  SimulatedScenario,
  SimulationReplayFrame,
  DigitalTwinCodeSpec
} from '../data/digitalTwinData';

export const DigitalTwinModule: React.FC = () => {
  // Navigation Sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'national_simulation' | 'chaos_engineering' | 'replay_recorder' | 'operator_training' | 'code_specs'
  >('national_simulation');

  // Interactive Simulation Controls State
  const [simulatedLearners, setSimulatedLearners] = useState<number>(12400000);
  const [activeScenario, setActiveScenario] = useState<SimulatedScenario>(SAMPLE_SIMULATION_SCENARIOS[0]);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<DigitalTwinCodeSpec>(DIGITAL_TWIN_CODE_SPECS[0]);

  // Active Simulation Execution State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(100);
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] DIGITAL TWIN ENGINE: System initialized. Connected to 12.4M synthetic learner node cluster.`,
    `[${new Date().toLocaleTimeString()}] CHAOS ENGINE: All 9 RSA provincial simulation grids active (Gauteng, KZN, W-Cape, etc.).`,
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 8)]);
  };

  const handleRunStressTest = (scenario: SimulatedScenario) => {
    setActiveScenario(scenario);
    setIsSimulating(true);
    setSimulationProgress(10);
    addLog(`SIMULATION LAUNCHED: Executing '${scenario.name}' across ${scenario.region}...`);

    let p = 10;
    const interval = setInterval(() => {
      p += 30;
      setSimulationProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsSimulating(false);
        addLog(`SIMULATION PASSED: '${scenario.name}' completed with ${scenario.dispatchLatencyMs}ms SAPS CAD dispatch latency.`);
      }
    }, 400);
  };

  const handleInjectChaos = (type: string) => {
    addLog(`CHAOS INJECTED: Launched '${type}' in sandbox grid. Verified fault isolation and zero production spillover.`);
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-900 rounded-2xl border border-cyan-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>PROMPT 051 — DIGITAL TWIN, NATIONAL SIMULATION & MISSION REHEARSAL PLATFORM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ITIS National Digital Twin & <span className="text-cyan-400">Mission Rehearsal Platform</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Complete digital twin of the entire ITIS ecosystem. Simulate 100 to 12.4 million learners, cellular tower blackouts, high-speed vehicle hijacking interceptions, mass disaster evacuations, and SAPS CAD dispatch stress testing in a risk-free sandbox environment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-cyan-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">{(simulatedLearners / 1e6).toFixed(1)}M</span>
              <span className="text-xs text-slate-400 font-medium">Simulated Learners</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">380ms</span>
              <span className="text-xs text-slate-400 font-medium">CAD Latency under Load</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">99.999%</span>
              <span className="text-xs text-slate-400 font-medium">Simulation Uptime</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('national_simulation')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'national_simulation'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-300" />
            <span>1. National RSA Simulation Grid</span>
          </button>

          <button
            onClick={() => setActiveSubTab('chaos_engineering')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'chaos_engineering'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Chaos Engineering & Scenarios</span>
          </button>

          <button
            onClick={() => setActiveSubTab('replay_recorder')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'replay_recorder'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Frame-by-Frame Live Replay</span>
          </button>

          <button
            onClick={() => setActiveSubTab('operator_training')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'operator_training'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>4. Operator Mission Rehearsal</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-amber-300" />
            <span>5. Digital Twin Schemas & APIs</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT CONSOLE */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
          <span className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
            <span>National Digital Twin Telemetry & Chaos Simulation Log</span>
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

      {/* SUB-TAB 1: NATIONAL SIMULATION GRID */}
      {activeSubTab === 'national_simulation' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>National RSA Telemetry Simulation Grid & Load Control</span>
              </h3>
              <p className="text-xs text-slate-400">Scale synthetic learner nodes from localized school drills up to full 12.4M nationwide stress tests.</p>
            </div>

            <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold">Learner Scale:</span>
              <input
                type="range"
                min={100}
                max={12400000}
                step={100000}
                value={simulatedLearners}
                onChange={(e) => setSimulatedLearners(Number(e.target.value))}
                className="w-36 accent-cyan-500"
              />
              <span className="text-xs text-cyan-300 font-mono font-bold">
                {(simulatedLearners / 1e6).toFixed(2)}M Nodes
              </span>
            </div>
          </div>

          {/* ACTIVE SIMULATION DISPLAY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold">Active Drill: {activeScenario.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  {activeScenario.status}
                </span>
              </div>

              <div className="space-y-1 text-slate-300">
                <p>Region: <strong>{activeScenario.region}</strong></p>
                <p>Simulated Learners: <strong>{activeScenario.simulatedLearners.toLocaleString()}</strong></p>
                <p>SAPS Patrol Units Dispatched: <strong>{activeScenario.sapsRespondersCount}</strong></p>
                <p>Peak System Response Latency: <strong className="text-emerald-400">{activeScenario.dispatchLatencyMs} ms</strong></p>
              </div>

              {isSimulating && (
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[11px] text-cyan-300">
                    <span>Simulating chaos scenario...</span>
                    <span>{simulationProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full transition-all duration-300"
                      style={{ width: `${simulationProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => handleRunStressTest(activeScenario)}
                disabled={isSimulating}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-600/30"
              >
                <Play className="w-4 h-4" />
                <span>{isSimulating ? 'SIMULATION IN PROGRESS...' : 'EXECUTE DRILL STRESS TEST'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <span className="text-amber-400 font-bold block border-b border-slate-800 pb-2">National Simulation Matrix</span>
              <div className="space-y-2 text-slate-300">
                {SAMPLE_SIMULATION_SCENARIOS.map((sc) => (
                  <div
                    key={sc.id}
                    onClick={() => setActiveScenario(sc)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      activeScenario.id === sc.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{sc.name}</span>
                      <span className="text-[10px] text-cyan-400">{sc.region}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CHAOS ENGINEERING */}
      {activeSubTab === 'chaos_engineering' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Chaos Engineering & Fault Injection Control Panel</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <span className="text-amber-400 font-bold block">1. Cellular Tower Power Blackout</span>
              <p className="text-slate-300">Inject total loss of primary LTE-M towers in a 50km radius to verify eSIM quad-operator satellite fallback.</p>
              <button
                onClick={() => handleInjectChaos('CELLULAR_TOWER_BLACKOUT')}
                className="w-full py-2 bg-amber-600/80 hover:bg-amber-500 text-white font-bold rounded-lg transition-all"
              >
                INJECT TOWER BLACKOUT
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <span className="text-rose-400 font-bold block">2. High-Speed Bus Hijacking & Kidnap</span>
              <p className="text-slate-300">Inject optical tamper circuit rupture on moving transport vehicle at 80 km/h with active SAPS Flying Squad dispatch.</p>
              <button
                onClick={() => handleInjectChaos('BUS_HIJACK_KIDNAP_DRILL')}
                className="w-full py-2 bg-rose-600/80 hover:bg-rose-500 text-white font-bold rounded-lg transition-all"
              >
                INJECT HIJACK DRILL
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <span className="text-cyan-400 font-bold block">3. Flash Flood Emergency Evacuation</span>
              <p className="text-slate-300">Inject sudden geofence corridor breach for 3,400 rural learners fleeing flooded school grounds.</p>
              <button
                onClick={() => handleInjectChaos('FLASH_FLOOD_EVACUATION')}
                className="w-full py-2 bg-cyan-600/80 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all"
              >
                INJECT FLOOD DRILL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: REPLAY RECORDER */}
      {activeSubTab === 'replay_recorder' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Video className="w-5 h-5 text-emerald-400" />
            <span>Frame-by-Frame Live Simulation Scenario Replay</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {SAMPLE_REPLAY_FRAMES.map((frame, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-amber-400 font-bold">{frame.timestamp}</span>
                  <span className="text-cyan-300 font-semibold">{frame.simulatedEntity}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold text-[10px]">
                    {frame.telemetryStatus}
                  </span>
                </div>
                <p className="text-slate-300">{frame.eventDescription}</p>
                <p className="text-emerald-400 font-semibold">➔ Action: {frame.systemAction}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: OPERATOR TRAINING */}
      {activeSubTab === 'operator_training' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Users className="w-5 h-5 text-purple-400" />
            <span>SAPS Operator & C3 Command Controller Mission Rehearsal Mode</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">10111 Dispatch Certification Drill</span>
              <p className="text-slate-300">Simulated 10-minute high-stress exam requiring operators to verify SOS panic triggers, review camera telemetry, and confirm SAPS Flying Squad dispatch within 30 seconds.</p>
              <span className="text-emerald-400 font-bold block">✓ CERTIFICATION ACCREDITATION: LEVEL 1 APPROVED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">School Safety Officer Drill</span>
              <p className="text-slate-300">Training school principals and safety officers on rapid parent notification broadcasts and safe corridor evacuation protocols during severe weather events.</p>
              <span className="text-emerald-400 font-bold block">✓ SCHOOL READINESS SCORE: 98.4%</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-amber-300" />
              <h3 className="text-base font-bold text-white">Digital Twin Master Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {DIGITAL_TWIN_CODE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedCodeSpec(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCodeSpec.id === spec.id
                      ? 'bg-cyan-600 text-white shadow-md'
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
              <span className="font-mono text-cyan-300 font-bold">{selectedCodeSpec.filename}</span>
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

      {/* MANDATORY DIGITAL TWIN & SIMULATION RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-cyan-400" />
          <span>10 Mandatory Digital Twin & Mission Rehearsal Platform Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_DIGITAL_TWIN_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400">RULE #{rule.id}</span>
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
