import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Bus, 
  School, 
  Smartphone, 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Radio, 
  Sparkles,
  Zap,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface SimulationStep {
  id: number;
  time: string;
  title: string;
  description: string;
  category: 'transit' | 'attendance' | 'security' | 'emergency' | 'resolution';
  location: string;
  metric: string;
  coordinates: { x: number; y: number };
  systemLog: string;
}

const SIMULATION_STEPS: SimulationStep[] = [
  {
    id: 1,
    time: '06:45 AM',
    title: 'Learner Boarding Scholar Bus',
    description: 'Learner wristband scanned via vehicle mTLS gateway upon entering Scholar Bus GP-BUS-402.',
    category: 'transit',
    location: 'Soweto Pickup Zone A3',
    metric: 'mTLS Handshake: 14ms',
    coordinates: { x: 18, y: 72 },
    systemLog: '[06:45:02] mTLS Auth SUCCESS -> Band ID: #WRB-GP-8832 | Driver: Mandla K. (PDP Valid)'
  },
  {
    id: 2,
    time: '07:12 AM',
    title: 'Transit Geofence Route Adherence',
    description: 'Vehicle telematics confirm speed compliance (52 km/h) along approved N1/M1 transport corridor.',
    category: 'transit',
    location: 'M1 Highway Northbound',
    metric: 'GPS Sync: Sub-Meter',
    coordinates: { x: 38, y: 55 },
    systemLog: '[07:12:15] Geofence Audit PASS -> Route #RT-402 | Speed: 52km/h (Limit 60km/h)'
  },
  {
    id: 3,
    time: '07:38 AM',
    title: 'Campus Arrival & BLE Mesh Scan',
    description: 'Classroom BLE Scanner #G-12 detects wristband heartbeat. Automated morning roll-call completed.',
    category: 'attendance',
    location: 'Sandton High School Gate 2',
    metric: 'Roll Call: 0.8s Scan',
    coordinates: { x: 62, y: 35 },
    systemLog: '[07:38:40] BLE Mesh Auto-Attendance -> Student ID #STU-9942 Marked PRESENT (Room 14B)'
  },
  {
    id: 4,
    time: '07:39 AM',
    title: 'Parent Push & SMS Dispatch',
    description: 'Encrypted POPIA-compliant notification delivered to parent app confirming safe arrival.',
    category: 'security',
    location: 'Parent Mobile App',
    metric: 'SMS Latency: 1.1s',
    coordinates: { x: 65, y: 30 },
    systemLog: '[07:39:01] FCM Push Delivered -> "Thabo has arrived safely at Sandton High School."'
  },
  {
    id: 5,
    time: '11:15 AM',
    title: 'Simulated SOS Distress Trigger',
    description: 'SOS button held for 3s on wearable band during break period or perimeter simulation.',
    category: 'emergency',
    location: 'Campus West Boundary',
    metric: 'Emergency Dispatch: <1.2s',
    coordinates: { x: 78, y: 25 },
    systemLog: '[11:15:03] HIGH-PRIORITY SOS ALARM -> Lat: -26.1075, Lon: 28.0567 | Accuracy: 0.8m'
  },
  {
    id: 6,
    time: '11:15 AM',
    title: 'SAPS 10111 & C3 Tactical Dispatch',
    description: 'Automated distress payload transmitted to SAPS Tactical Unit & Campus Ground Security.',
    category: 'emergency',
    location: 'Johannesburg C3 Center',
    metric: 'SAPS Latency: 420ms',
    coordinates: { x: 82, y: 22 },
    systemLog: '[11:15:04] SAPS Dispatch Acknowledged -> Unit #TAC-09 Dispatched | Campus Security En-Route'
  },
  {
    id: 7,
    time: '11:18 AM',
    title: 'Incident Verification & All-Clear',
    description: 'On-site campus security verifies learner safety. Panic alert resolved & logged for audit.',
    category: 'resolution',
    location: 'Sandton Security Post 1',
    metric: 'Total MTTR: 2m 45s',
    coordinates: { x: 75, y: 32 },
    systemLog: '[11:18:12] SOS RESOLVED -> Ground Officer J. Sithole confirmed drill/false alarm. Status ALL-CLEAR.'
  },
  {
    id: 8,
    time: '15:15 PM',
    title: 'Afternoon Boarding & Safe Departure',
    description: 'Learner boards return vehicle. Parent app receives final afternoon transport confirmation.',
    category: 'transit',
    location: 'Soweto Return Route',
    metric: 'Daily Loop Closed',
    coordinates: { x: 22, y: 78 },
    systemLog: '[15:15:30] Daily Journey Completed -> Parent App Updated. Zero Security Anomalies.'
  }
];

export function LiveDemoSimulator() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoSpeed, setAutoSpeed] = useState(3000); // ms per step
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = SIMULATION_STEPS[currentStepIndex];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= SIMULATION_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, autoSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, autoSpeed]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleNext = () => {
    if (currentStepIndex < SIMULATION_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      {/* Simulator Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg">
              <Radio className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">Executive Live Demonstration Engine</h3>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-2xs font-mono font-bold">
              REAL-TIME SIMULATION
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Interactive simulation of a complete South African learner daily safety lifecycle (Transit → Campus → Emergency SOS → SAPS Dispatch).
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 ${
              isPlaying 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Demo' : 'Start Live Demonstration'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl transition"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Simulation View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Map Visualizer */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800/90 p-4 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
          {/* Simulated Map Background Styling */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
          
          {/* Map Status Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono bg-slate-900/90 backdrop-blur p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold">Gauteng Corridor #GP-01</span>
            </div>
            <div className="text-slate-400">
              Simulated Time: <span className="text-cyan-400 font-bold">{currentStep.time}</span>
            </div>
          </div>

          {/* Map Pins & Dynamic Movement Indicator */}
          <div className="relative z-10 my-8 h-48 w-full border border-slate-800/60 rounded-lg bg-slate-900/40 p-4 overflow-hidden">
            {/* Route path lines */}
            <svg className="absolute inset-0 w-full h-full stroke-cyan-500/30 stroke-[2] fill-none">
              <path d="M 50 180 Q 150 100, 300 120 T 500 50" strokeDasharray="4 4" />
            </svg>

            {/* Simulated Active Node Icon */}
            <div 
              className="absolute transition-all duration-700 ease-out -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${currentStep.coordinates.x}%`, top: `${currentStep.coordinates.y}%` }}
            >
              <div className="relative">
                <span className={`absolute -inset-2 rounded-full opacity-75 animate-ping ${
                  currentStep.category === 'emergency' ? 'bg-rose-500' : 'bg-cyan-400'
                }`} />
                <div className={`p-2.5 rounded-full border shadow-xl flex items-center justify-center ${
                  currentStep.category === 'emergency'
                    ? 'bg-rose-500 text-white border-rose-300'
                    : currentStep.category === 'resolution'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                    : 'bg-cyan-500 text-slate-950 border-cyan-300'
                }`}>
                  {currentStep.category === 'transit' && <Bus className="w-5 h-5" />}
                  {currentStep.category === 'attendance' && <School className="w-5 h-5" />}
                  {currentStep.category === 'security' && <Smartphone className="w-5 h-5" />}
                  {currentStep.category === 'emergency' && <ShieldAlert className="w-5 h-5" />}
                  {currentStep.category === 'resolution' && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {/* Static Waypoints */}
            <div className="absolute left-[18%] top-[72%] -translate-x-1/2 text-2xs font-mono text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" /> Soweto Pickup
            </div>
            <div className="absolute left-[62%] top-[35%] -translate-x-1/2 text-2xs font-mono text-slate-500 flex items-center gap-1">
              <School className="w-3 h-3 text-emerald-400" /> Sandton High
            </div>
            <div className="absolute left-[82%] top-[22%] -translate-x-1/2 text-2xs font-mono text-slate-500 flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-rose-400" /> SAPS C3
            </div>
          </div>

          {/* Map Footer Active Step Detail */}
          <div className="relative z-10 bg-slate-900/90 backdrop-blur p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">Step {currentStep.id} of {SIMULATION_STEPS.length}</span>
              <span className="px-2 py-0.5 bg-slate-950 text-slate-300 border border-slate-800 rounded text-2xs">
                {currentStep.metric}
              </span>
            </div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              {currentStep.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </div>

        {/* Step Progress & System Telemetry Log */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          
          {/* Step Timeline Progress */}
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
            {SIMULATION_STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`w-full text-left p-2.5 rounded-lg border text-xs font-mono transition flex items-center justify-between ${
                  idx === currentStepIndex
                    ? 'bg-cyan-500/10 text-white border-cyan-500/50 font-bold'
                    : idx < currentStepIndex
                    ? 'bg-slate-950 text-slate-400 border-slate-800/80 hover:bg-slate-900'
                    : 'bg-slate-950/40 text-slate-600 border-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${
                    idx === currentStepIndex ? 'bg-cyan-400 animate-pulse' : idx < currentStepIndex ? 'bg-emerald-400' : 'bg-slate-700'
                  }`} />
                  <span>{step.time}</span>
                  <span className="truncate max-w-[160px] font-sans text-2xs">{step.title}</span>
                </div>
                {idx < currentStepIndex && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              </button>
            ))}
          </div>

          {/* Real-time Telemetry Terminal Log */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/90 font-mono text-2xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Radio className="w-3.5 h-3.5" /> LIVE TELEMETRY LOG
              </span>
              <span>TLS 1.3 SECURE</span>
            </div>
            <div className="p-2 bg-slate-900/80 rounded border border-slate-800/80 text-emerald-400 leading-relaxed font-mono">
              {currentStep.systemLog}
            </div>
          </div>

          {/* Next / Prev Navigation Controls */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg text-xs font-mono font-bold transition"
            >
              Previous Step
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === SIMULATION_STEPS.length - 1}
              className="flex-1 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 disabled:opacity-40 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center gap-1"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
