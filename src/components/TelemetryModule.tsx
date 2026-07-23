import React, { useState } from 'react';
import {
  Activity,
  Radio,
  Cpu,
  ShieldCheck,
  Zap,
  Clock,
  Database,
  Lock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  Copy,
  Check,
  ChevronRight,
  Server,
  Layers,
  FileCode,
  AlertTriangle,
  Play,
  Share2,
  Terminal,
  Compass,
  MapPin,
  Battery,
  Wifi,
  Thermometer,
  ShieldAlert,
  ArrowRight,
  Send,
  Eye,
  Sliders,
  Award,
  Hash
} from 'lucide-react';
import {
  TelemetryPayload,
  EnrichedTelemetryEvent,
  PipelineStage,
  DeviceConnectionSession,
  TimescaleHypertableSpec,
  TelemetryValidationLog,
  PIPELINE_STAGES_LIST,
  SAMPLE_TELEMETRY_PACKETS,
  SAMPLE_ENRICHED_EVENTS,
  SAMPLE_CONNECTION_SESSIONS,
  TIMESCALEDB_HYPERTABLES,
  TELEMETRY_SPEC_ITEMS,
  CRITICAL_TELEMETRY_RULES
} from '../data/telemetryModuleData';

export function TelemetryModule() {
  const [activeSubTab, setActiveSubTab] = useState<'simulator' | 'pipeline' | 'stream' | 'sessions' | 'timescale' | 'rules' | 'nestjs'>('simulator');

  // Simulator State
  const [simPackets, setSimPackets] = useState<TelemetryPayload[]>(SAMPLE_TELEMETRY_PACKETS);
  const [enrichedEvents, setEnrichedEvents] = useState<EnrichedTelemetryEvent[]>(SAMPLE_ENRICHED_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EnrichedTelemetryEvent | null>(enrichedEvents[0]);

  // Active Simulation Pipeline Run
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [simulationLogs, setSimulationLogs] = useState<{ stage: number; name: string; result: string; latencyMs: number }[]>([]);

  // Preset Form Inputs for custom packet simulation
  const [inputImei, setInputImei] = useState('869402059381001');
  const [inputLat, setInputLat] = useState(-26.2581);
  const [inputLng, setInputLng] = useState(27.8573);
  const [inputSpeed, setInputSpeed] = useState(18.5);
  const [inputBattery, setInputBattery] = useState(88);
  const [inputProtocol, setInputProtocol] = useState<'MQTT_TLS' | 'TCP_RAW' | 'HTTPS_REST' | 'WEBSOCKET_SIM'>('MQTT_TLS');
  const [inputSos, setInputSos] = useState(false);
  const [inputTamper, setInputTamper] = useState(false);
  const [inputSeq, setInputSeq] = useState(14822);

  // Filter State for Stream
  const [streamFilter, setStreamFilter] = useState<'ALL' | 'SOS' | 'TAMPER' | 'LOW_BATTERY'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // SQL Console Query State
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [isExecutingSql, setIsExecutingSql] = useState(false);

  // NestJS Spec State
  const [selectedSpecId, setSelectedSpecId] = useState(1);
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Run Real-Time 10-Stage Pipeline Simulation
  const handleRunPipelineSimulation = (preset?: 'NORMAL' | 'SOS' | 'REPLAY' | 'INVALID_COORDINATES' | 'LOW_BATTERY') => {
    setIsSimulating(true);
    setSimulationLogs([]);
    setActiveStepIndex(0);

    let packet: TelemetryPayload = {
      imei: inputImei,
      deviceUuid: `dev-uuid-${inputImei.slice(-4)}`,
      timestamp: new Date().toISOString(),
      latitude: Number(inputLat),
      longitude: Number(inputLng),
      altitude: 1680.0,
      speedKmh: Number(inputSpeed),
      heading: 180.0,
      accuracyMeters: 2.1,
      batteryPercentage: Number(inputBattery),
      chargingState: 'DISCHARGING',
      rssiDbm: -72,
      satelliteCount: 14,
      gnssFixType: '3D_FIX',
      temperatureCelsius: 24.5,
      sosStatus: inputSos,
      tamperStatus: inputTamper,
      motionState: inputSpeed > 10 ? 'IN_VEHICLE' : inputSpeed > 1 ? 'WALKING' : 'STATIONARY',
      firmwareVersion: 'v2.4.12-ITIS',
      sequenceNumber: Number(inputSeq),
      messageSignature: `hmac-sha256-${Math.random().toString(36).substring(2, 10)}`,
      protocol: inputProtocol,
    };

    if (preset === 'SOS') {
      packet.sosStatus = true;
      packet.speedKmh = 45.0;
    } else if (preset === 'REPLAY') {
      packet.sequenceNumber = 14820; // Old sequence -> Replay!
    } else if (preset === 'INVALID_COORDINATES') {
      packet.latitude = -195.0; // Out of bounds
    } else if (preset === 'LOW_BATTERY') {
      packet.batteryPercentage = 9;
    }

    const stages = PIPELINE_STAGES_LIST;
    let step = 0;
    const logsAcc: { stage: number; name: string; result: string; latencyMs: number }[] = [];

    const interval = setInterval(() => {
      if (step < stages.length) {
        setActiveStepIndex(step + 1);
        const currStage = stages[step];

        let result = 'PASSED';
        let latency = Math.floor(Math.random() * 5) + 1;

        // Simulate failure conditions
        if (preset === 'REPLAY' && currStage.stageNumber === 6) {
          result = 'FAILED: Duplicate sequence/replay attack detected!';
        } else if (preset === 'INVALID_COORDINATES' && currStage.stageNumber === 4) {
          result = 'FAILED: Latitude -195.0 out of valid [-90, 90] bounds!';
        }

        logsAcc.push({
          stage: currStage.stageNumber,
          name: currStage.name,
          result,
          latencyMs: latency,
        });
        setSimulationLogs([...logsAcc]);

        if (result.startsWith('FAILED')) {
          clearInterval(interval);
          setIsSimulating(false);
          setActiveStepIndex(null);
          showToast(`Pipeline Aborted at Stage ${currStage.stageNumber}: ${currStage.name}`);
          return;
        }

        step++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setActiveStepIndex(null);

        // Complete pipeline: Create enriched event
        const newEnriched: EnrichedTelemetryEvent = {
          eventId: `evt-tlm-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          rawPayload: packet,
          learnerId: 'itis-lrn-2026-001',
          learnerName: 'Bandile Sithole',
          schoolId: 'sch-1001',
          schoolName: 'Soweto Primary School',
          parentIds: ['prt-8812'],
          assignedDeviceId: packet.deviceUuid,
          protectionStatus: 'PROTECTED',
          currentJourneyState: packet.speedKmh > 20 ? 'TRANSIT_TO_SCHOOL' : 'AT_SCHOOL',
          batteryCategory: packet.batteryPercentage < 15 ? 'CRITICAL' : packet.batteryPercentage < 30 ? 'LOW' : 'OPTIMAL',
          signalCategory: 'EXCELLENT',
          movementCategory: packet.speedKmh > 20 ? 'HIGH_SPEED_TRANSIT' : packet.speedKmh > 2 ? 'PEDESTRIAN' : 'STATIONARY',
          timestampQuality: 'VALID_REALTIME',
          deviceHealthSnapshot: {
            voltage: 3.82,
            gnssLock: true,
            sensorSelfTest: 'PASS',
          },
          communicationLatencyMs: 24,
          futureGeofencePlaceholder: {
            activeGeofenceId: 'geo-soweto-01',
            insideFenceName: 'Soweto Safe School Corridor',
            isAuthorizedZone: true,
          },
          futureRiskScorePlaceholder: {
            preliminaryRiskLevel: packet.sosStatus ? 'CRITICAL' : packet.tamperStatus ? 'HIGH' : 'NONE',
            evaluatedAt: new Date().toISOString(),
          },
          ingestedAt: new Date().toISOString(),
          pipelineLatencyMs: 38,
        };

        setEnrichedEvents([newEnriched, ...enrichedEvents]);
        setSelectedEvent(newEnriched);
        setInputSeq((prev) => prev + 1);
        showToast(`Telemetry Packet Ingested & Enriched Successfully (38ms pipeline latency)`);
      }
    }, 250);
  };

  // Run SQL Query Simulation
  const handleExecuteSql = () => {
    setIsExecutingSql(true);
    setTimeout(() => {
      setIsExecutingSql(false);
      setSqlResult([
        { time_bucket: '2026-07-21 18:10:00', imei: '869402059381001', avg_speed: 16.4, max_battery: 88, packet_count: 30 },
        { time_bucket: '2026-07-21 18:05:00', imei: '869402059381001', avg_speed: 12.1, max_battery: 89, packet_count: 30 },
        { time_bucket: '2026-07-21 18:00:00', imei: '869402059381001', avg_speed: 0.0, max_battery: 90, packet_count: 30 },
      ]);
    }, 600);
  };

  const activeSpec = TELEMETRY_SPEC_ITEMS.find((s) => s.id === selectedSpecId) || TELEMETRY_SPEC_ITEMS[0];
  const selectedTable = TIMESCALEDB_HYPERTABLES[selectedTableIndex];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-400/40 backdrop-blur-md flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="font-medium text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/50 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" /> PROMPT 023
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Real-Time Telemetry Ingestion & Stream Processing
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Telemetry Ingestion Engine & TimescaleDB Stream Processor
            </h1>
            <p className="text-slate-300 max-w-3xl text-sm leading-relaxed">
              The heartbeat of ITIS. Ingests, validates, enriches, and streams GPS telemetry at 50,000 msg/sec via a 10-stage pipeline (mTLS, replay defense, sequence counters, Prompt 022 learner resolution, TimescaleDB hypertables, and WebSocket event bus).
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleRunPipelineSimulation('NORMAL')}
              disabled={isSimulating}
              className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Simulate Telemetry Packet</span>
            </button>

            <button
              onClick={() => handleRunPipelineSimulation('SOS')}
              disabled={isSimulating}
              className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-red-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              <span>Trigger SOS Event</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Target Throughput</div>
            <div className="text-xl font-bold text-emerald-400 mt-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              50,000 msg/s
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Ingestion Pipeline SLA</div>
            <div className="text-xl font-bold text-indigo-400 mt-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              &lt; 38 ms avg
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Pipeline Stages</div>
            <div className="text-xl font-bold text-cyan-400 mt-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              10 Stages
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">TimescaleDB Hypertables</div>
            <div className="text-xl font-bold text-amber-400 mt-1 flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" />
              1-Day Chunks
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
            <div className="text-xs text-slate-400 font-medium">Input Protocols</div>
            <div className="text-xs font-bold text-slate-200 mt-1.5 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              MQTT 1.3 / TCP / REST
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-1 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('simulator')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'simulator'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Interactive Packet Simulator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pipeline')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'pipeline'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>10-Stage Pipeline Inspector</span>
        </button>

        <button
          onClick={() => setActiveSubTab('stream')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'stream'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Enriched Live Event Stream</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sessions')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'sessions'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Connection Sessions & Offline Detector</span>
        </button>

        <button
          onClick={() => setActiveSubTab('timescale')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'timescale'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>TimescaleDB Hypertables Console</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rules')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'rules'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Critical ITIS Rules (1-5)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nestjs')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'nestjs'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span>NestJS Engineering Specs</span>
        </button>
      </div>

      {/* SUBTAB 1: INTERACTIVE PACKET SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Simulator Controls & Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-indigo-400" /> Raw Telemetry Packet Generator
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Configure hardware sensors and push through pipeline</p>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PROMPT 023
              </span>
            </div>

            {/* Quick Scenario Presets */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block">Scenario Presets:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleRunPipelineSimulation('NORMAL')}
                  disabled={isSimulating}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 text-left transition-all"
                >
                  <span className="font-bold text-emerald-400 block">Standard GPS Packet</span>
                  <span className="text-[10px] text-slate-400">Normal transit speed 18km/h</span>
                </button>

                <button
                  onClick={() => handleRunPipelineSimulation('SOS')}
                  disabled={isSimulating}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 text-left transition-all"
                >
                  <span className="font-bold text-red-400 block">SOS Panic Event</span>
                  <span className="text-[10px] text-slate-400">Hardware SOS button pressed</span>
                </button>

                <button
                  onClick={() => handleRunPipelineSimulation('REPLAY')}
                  disabled={isSimulating}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 text-left transition-all"
                >
                  <span className="font-bold text-amber-400 block">Replay Attack Test</span>
                  <span className="text-[10px] text-slate-400">Old sequence # (Stage 6 reject)</span>
                </button>

                <button
                  onClick={() => handleRunPipelineSimulation('INVALID_COORDINATES')}
                  disabled={isSimulating}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 text-left transition-all"
                >
                  <span className="font-bold text-purple-400 block">Invalid Bounds</span>
                  <span className="text-[10px] text-slate-400">Lat -195.0 (Stage 4 reject)</span>
                </button>
              </div>
            </div>

            {/* Custom Inputs */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Device IMEI</label>
                <input
                  type="text"
                  value={inputImei}
                  onChange={(e) => setInputImei(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={inputLat}
                    onChange={(e) => setInputLat(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={inputLng}
                    onChange={(e) => setInputLng(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Speed (km/h)</label>
                  <input
                    type="number"
                    value={inputSpeed}
                    onChange={(e) => setInputSpeed(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Battery %</label>
                  <input
                    type="number"
                    value={inputBattery}
                    onChange={(e) => setInputBattery(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Protocol</label>
                  <select
                    value={inputProtocol}
                    onChange={(e) => setInputProtocol(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none"
                  >
                    <option value="MQTT_TLS">MQTT over TLS 1.3</option>
                    <option value="TCP_RAW">Raw TCP Socket</option>
                    <option value="HTTPS_REST">HTTPS REST Fallback</option>
                    <option value="WEBSOCKET_SIM">WebSocket Simulator</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Sequence Number</label>
                  <input
                    type="number"
                    value={inputSeq}
                    onChange={(e) => setInputSeq(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputSos}
                    onChange={(e) => setInputSos(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500 bg-slate-800 border-slate-700"
                  />
                  <span className="text-red-400 font-bold">SOS Button</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputTamper}
                    onChange={(e) => setInputTamper(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 bg-slate-800 border-slate-700"
                  />
                  <span className="text-amber-400 font-bold">Tamper Sensor</span>
                </label>
              </div>

              <button
                onClick={() => handleRunPipelineSimulation()}
                disabled={isSimulating}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Stage {activeStepIndex}/10...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Ingest Packet into Pipeline</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Pipeline Step Progress & Enriched Event Viewer */}
          <div className="lg:col-span-7 space-y-6">
            {/* Stage Execution Visualization */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Live 10-Stage Pipeline Processing Status
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PIPELINE_STAGES_LIST.map((stage) => {
                  const isCurrent = activeStepIndex === stage.stageNumber;
                  const log = simulationLogs.find((l) => l.stage === stage.stageNumber);
                  const isDone = log && log.result === 'PASSED';
                  const isFailed = log && log.result.startsWith('FAILED');

                  return (
                    <div
                      key={stage.stageNumber}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isCurrent
                          ? 'bg-indigo-600/30 border-indigo-400 text-white ring-2 ring-indigo-400/50 scale-105'
                          : isFailed
                          ? 'bg-red-900/30 border-red-500 text-red-300'
                          : isDone
                          ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-800/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="text-[10px] font-mono font-bold">ST {stage.stageNumber}</div>
                      <div className="text-[11px] font-bold truncate mt-0.5">{stage.name.split(' ')[0]}</div>
                      <div className="text-[9px] mt-1">
                        {isCurrent ? (
                          <span className="text-amber-300 font-bold animate-pulse">Processing...</span>
                        ) : isFailed ? (
                          <span className="text-red-400 font-bold">FAILED</span>
                        ) : isDone ? (
                          <span className="text-emerald-400 font-bold">{log.latencyMs}ms ✓</span>
                        ) : (
                          'Ready'
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Execution Log Stream */}
              {simulationLogs.length > 0 && (
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto">
                  {simulationLogs.map((log) => (
                    <div key={log.stage} className="flex items-center justify-between">
                      <span className="text-slate-400">
                        [Stage {log.stage}] <strong className="text-white">{log.name}</strong>:
                      </span>
                      <span className={log.result === 'PASSED' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                        {log.result} ({log.latencyMs}ms)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enriched JSON Inspector */}
            {selectedEvent && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-400">{selectedEvent.eventId}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">Enriched Telemetry Output (Stage 8)</h3>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Ingestion Latency: {selectedEvent.pipelineLatencyMs}ms
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Resolved Learner</span>
                    <strong className="text-white font-bold">{selectedEvent.learnerName}</strong>
                    <span className="text-[10px] text-slate-400 block">{selectedEvent.learnerId}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">School Binding</span>
                    <strong className="text-white font-bold">{selectedEvent.schoolName}</strong>
                    <span className="text-[10px] text-slate-400 block">{selectedEvent.schoolId}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Journey State</span>
                    <strong className="text-indigo-300 font-bold">{selectedEvent.currentJourneyState}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Battery Category</span>
                    <strong className="text-emerald-400 font-bold">{selectedEvent.batteryCategory} ({selectedEvent.rawPayload.batteryPercentage}%)</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Protection Status</span>
                    <strong className="text-emerald-300 font-bold">{selectedEvent.protectionStatus}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Risk Placeholder</span>
                    <strong className={selectedEvent.futureRiskScorePlaceholder.preliminaryRiskLevel === 'CRITICAL' ? 'text-red-400 font-bold' : 'text-slate-300 font-bold'}>
                      {selectedEvent.futureRiskScorePlaceholder.preliminaryRiskLevel}
                    </strong>
                  </div>
                </div>

                {/* Raw vs Enriched Toggle */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto max-h-60">
                  <pre className="text-indigo-300">{JSON.stringify(selectedEvent, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: 10-STAGE PIPELINE ARCHITECTURE INSPECTOR */}
      {activeSubTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" /> 10-Stage Sequential Telemetry Ingestion Pipeline
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Every packet passes through 10 strict verification steps before entering TimescaleDB and event bus streaming.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
              {PIPELINE_STAGES_LIST.map((stage) => (
                <div key={stage.stageNumber} className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      STAGE {stage.stageNumber}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">{stage.avgLatencyMs}ms</span>
                  </div>

                  <h3 className="text-xs font-bold text-white mt-1">{stage.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{stage.description}</p>

                  <div className="pt-2 border-t border-slate-700/60 text-[10px] text-slate-500">
                    <strong className="text-slate-400">Rule:</strong> {stage.validationCheck}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: ENRICHED LIVE TELEMETRY EVENT STREAM */}
      {activeSubTab === 'stream' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" /> Real-Time Enriched Telemetry Event Stream
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Subscribed to WebSocket topic <code className="text-indigo-300">/ws/telemetry</code>. Every event contains complete learner, school, and battery enrichment.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-emerald-400">Live Stream Active</span>
            </div>
          </div>

          <div className="space-y-3">
            {enrichedEvents.map((evt) => (
              <div key={evt.eventId} className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/80 hover:border-indigo-500/50 transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{evt.learnerName}</span>
                        <span className="text-[10px] font-mono text-indigo-400">({evt.learnerId})</span>
                      </div>
                      <p className="text-xs text-slate-400">{evt.schoolName} • Lat: {evt.rawPayload.latitude}, Lng: {evt.rawPayload.longitude}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 block">{evt.currentJourneyState}</span>
                    <span className="text-[10px] text-slate-500">{evt.ingestedAt}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Battery & Signal</span>
                    <strong className="text-slate-200">{evt.rawPayload.batteryPercentage}% • {evt.rawPayload.rssiDbm} dBm</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block">Speed & Motion</span>
                    <strong className="text-slate-200">{evt.rawPayload.speedKmh} km/h ({evt.rawPayload.motionState})</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block">Active Geofence</span>
                    <strong className="text-indigo-300">{evt.futureGeofencePlaceholder.insideFenceName}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block">Safety Alarms</span>
                    <span className="font-bold">
                      {evt.rawPayload.sosStatus ? (
                        <span className="text-red-400">CRITICAL SOS</span>
                      ) : evt.rawPayload.tamperStatus ? (
                        <span className="text-amber-400">TAMPER ALARM</span>
                      ) : (
                        <span className="text-emerald-400">ALL CLEAR</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: CONNECTION SESSIONS & OFFLINE DETECTOR */}
      {activeSubTab === 'sessions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-indigo-400" /> Active Connection Sessions & Offline Device Detector
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Monitors device heartbeats, socket state, and power loss. Internal offline events generated automatically when heartbeat misses 5-min threshold.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                  <th className="p-3 font-bold uppercase">IMEI / Device UUID</th>
                  <th className="p-3 font-bold uppercase">Protocol</th>
                  <th className="p-3 font-bold uppercase">Client IP</th>
                  <th className="p-3 font-bold uppercase">Connected At</th>
                  <th className="p-3 font-bold uppercase">Last Heartbeat</th>
                  <th className="p-3 font-bold uppercase">Packets Received</th>
                  <th className="p-3 font-bold uppercase">Session Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {SAMPLE_CONNECTION_SESSIONS.map((sess) => (
                  <tr key={sess.sessionId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-indigo-400">{sess.imei}</td>
                    <td className="p-3 text-slate-300">{sess.protocol}</td>
                    <td className="p-3 font-mono text-slate-400">{sess.clientIp}</td>
                    <td className="p-3 text-slate-400">{sess.connectedAt}</td>
                    <td className="p-3 text-slate-300 font-bold">{sess.lastHeartbeatAt}</td>
                    <td className="p-3 font-mono text-slate-300">{sess.packetsReceived.toLocaleString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          sess.status === 'ONLINE'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : sess.status === 'LOST_HEARTBEAT'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}
                      >
                        {sess.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 5: TIMESCALEDB HYPERTABLES CONSOLE */}
      {activeSubTab === 'timescale' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">TimescaleDB Hypertables:</span>
            {TIMESCALEDB_HYPERTABLES.map((table, idx) => (
              <button
                key={table.tableName}
                onClick={() => {
                  setSelectedTableIndex(idx);
                  setSqlResult(null);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedTableIndex === idx
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold font-mono text-xs">{table.tableName}</span>
                  <Database className="w-4 h-4 text-indigo-300" />
                </div>
                <div className="text-[11px] opacity-80 mt-1">Chunk: {table.chunkTimeInterval} • Retention: {table.retentionPeriodDays} days</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-indigo-400 font-bold">Hypertables Partitioning & Aggregates</span>
              <h3 className="text-base font-bold text-white mt-0.5">{selectedTable.tableName}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Partition Key</span>
                <strong className="text-slate-200">{selectedTable.partitionKey}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Compression</span>
                <strong className="text-emerald-400">Enabled (7-day policy)</strong>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Continuous Aggregate SQL Query:</span>
                <button
                  onClick={handleExecuteSql}
                  disabled={isExecutingSql}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  {isExecutingSql ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>Execute Query</span>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                <pre>{selectedTable.sampleQuerySql}</pre>
              </div>
            </div>

            {sqlResult && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400">Query Results (3 rows returned in 4ms):</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono border-collapse bg-slate-950 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-slate-800 text-slate-300">
                        <th className="p-2.5">five_min</th>
                        <th className="p-2.5">imei</th>
                        <th className="p-2.5">avg_speed</th>
                        <th className="p-2.5">max_battery</th>
                        <th className="p-2.5">packet_count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {sqlResult.map((row, i) => (
                        <tr key={i} className="text-slate-200">
                          <td className="p-2.5">{row.time_bucket}</td>
                          <td className="p-2.5 text-indigo-300">{row.imei}</td>
                          <td className="p-2.5">{row.avg_speed} km/h</td>
                          <td className="p-2.5 text-emerald-400">{row.max_battery}%</td>
                          <td className="p-2.5 font-bold">{row.packet_count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 6: CRITICAL ITIS RULES */}
      {activeSubTab === 'rules' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Critical ITIS Telemetry Rules (1 – 5)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Architectural constraints enforcing zero telemetry leakage and single-pass enrichment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CRITICAL_TELEMETRY_RULES.map((rule) => (
              <div key={rule.id} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    RULE {rule.id}
                  </span>
                  <h3 className="text-sm font-bold text-white">{rule.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rule.ruleText}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 7: NESTJS ENGINEERING SPECS */}
      {activeSubTab === 'nestjs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-2">Engineering Specs:</span>
            {TELEMETRY_SPEC_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSpecId(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                  selectedSpecId === item.id
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{item.title}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </div>
                <span className="text-[10px] opacity-75 font-mono block mt-1">{item.filename}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400">{activeSpec.category}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{activeSpec.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{activeSpec.description}</p>
              </div>

              <button
                onClick={() => handleCopyCode(activeSpec.id, activeSpec.code)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
              >
                {copiedCodeId === activeSpec.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === activeSpec.id ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-[500px]">
              <pre>{activeSpec.code}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
