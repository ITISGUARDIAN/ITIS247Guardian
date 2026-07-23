import { useState, useEffect } from 'react';
import {
  Layers,
  Activity,
  Globe,
  Radio,
  KeyRound,
  ShieldCheck,
  Server,
  Zap,
  RefreshCw,
  Send,
  Database,
  Cpu,
  Smartphone,
  School,
  Building2,
  Award,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Code,
  Terminal,
  FileCode,
  Sliders,
  Check,
  MapPin,
  Siren,
  Bus,
  Wifi,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { getCurrentEnv, setEnvironment, EnvironmentMode } from '../lib/env-config';
import { itisApiClient } from '../lib/api-client';
import { itisWebSocketHub, WsChannel } from '../lib/websocket-hub';
import { UnifiedMapComponent } from './UnifiedMapComponent';

export function PlatformIntegrationModule() {
  const [envMode, setEnvMode] = useState<EnvironmentMode>('production');
  const [currentEnvConfig, setCurrentEnvConfig] = useState(getCurrentEnv());
  const [wsStatus, setWsStatus] = useState(itisWebSocketHub.getStatus());
  const [apiLogs, setApiLogs] = useState(itisApiClient.getRequestLog());
  const [activeChannel, setActiveChannel] = useState<WsChannel>('telemetry');
  const [lastWsMessage, setLastWsMessage] = useState<string>('Listening for live events...');

  // End-to-End Simulation State
  const [simulatedAction, setSimulatedAction] = useState<string | null>(null);
  const [e2eMetrics, setE2eMetrics] = useState({
    totalApiRequests: 48920,
    wsEventsBroadcast: 18240,
    connectedApps: 10,
    crossAppLatencyMs: 14,
  });

  // Switch Environment Handler
  const handleEnvChange = (mode: EnvironmentMode) => {
    setEnvMode(mode);
    const updated = setEnvironment(mode);
    setCurrentEnvConfig(updated);
    itisApiClient.updateConfig();
  };

  // Subscribe to live WebSocket Hub messages
  useEffect(() => {
    const unsubscribe = itisWebSocketHub.subscribe(activeChannel, (msg) => {
      setLastWsMessage(`[${msg.timestamp}] ${msg.senderApp} -> ${msg.channel}.${msg.event}: ${JSON.stringify(msg.payload)}`);
      setE2eMetrics((prev) => ({ ...prev, wsEventsBroadcast: prev.wsEventsBroadcast + 1 }));
    });

    const logTimer = setInterval(() => {
      setApiLogs([...itisApiClient.getRequestLog()]);
      setWsStatus(itisWebSocketHub.getStatus());
    }, 1500);

    return () => {
      unsubscribe();
      clearInterval(logTimer);
    };
  }, [activeChannel]);

  // Trigger End-to-End Cross-App Action
  const triggerE2eSimulation = async (actionType: 'NFC_TAP' | 'SOS_PANIC' | 'PROVISION_DEVICE' | 'POLICY_UPDATE') => {
    setSimulatedAction(actionType);

    if (actionType === 'NFC_TAP') {
      // Simulates NFC Card Tap at School Gate -> Updates School Portal, Parent App & National Attendance
      await itisApiClient.request('/attendance/scan', 'POST', {
        nfcUid: 'NFC-RSA-88391',
        learnerId: 'LNR-2026-9041',
        gateId: 'GATE-01-MAIN',
      });

      itisWebSocketHub.broadcast(
        'attendance',
        'NFC_TAP_EVENT',
        {
          learnerName: 'Sipho Ndlovu',
          schoolName: 'Soweto High School',
          scanTime: new Date().toLocaleTimeString(),
          scanType: 'ENTRY',
        },
        'SCHOOL_PORTAL_NFC_READER'
      );
    } else if (actionType === 'SOS_PANIC') {
      // Simulates Wearable SOS Panic Press -> Dispatches C3 Command, Emergency Responder App & Cabinet Alert
      await itisApiClient.request('/incidents/trigger', 'POST', {
        learnerId: 'LNR-2026-9041',
        type: 'SOS_PANIC',
        lat: -26.2041,
        lng: 28.0473,
      });

      itisWebSocketHub.broadcast(
        'incidents',
        'SOS_CRITICAL_ALERT',
        {
          incidentId: 'INC-2026-9901',
          learnerName: 'Sipho Ndlovu',
          location: 'Vilakazi St, Soweto',
          assignedUnit: 'JMPD Patrol Unit GP-04',
          severity: 'CRITICAL',
        },
        'PARENT_PORTAL_WEARABLE_LINK'
      );
    } else if (actionType === 'PROVISION_DEVICE') {
      // Simulates Technician BLE Pairing -> Registers in Device Inventory & National Fleet
      await itisApiClient.request('/provisioning/pair', 'POST', {
        bleAddress: 'AA:BB:CC:DD:EE:FF',
        hardwareSerial: 'HW-WEAR-2026-88',
      });

      itisWebSocketHub.broadcast(
        'telemetry',
        'DEVICE_PROVISIONED',
        {
          deviceId: 'WR-GP-9988',
          firmwareVersion: 'v4.2.1-SITA-SECURE',
          status: 'ACTIVATED',
        },
        'FIELD_TECH_PROVISIONING_APP'
      );
    }

    setTimeout(() => setSimulatedAction(null), 3000);
  };

  const tokens = itisApiClient.getAuthTokens();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center justify-center relative">
      {/* HEADER BANNER */}
      <div className="w-full max-w-7xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/50 rounded-2xl flex items-center justify-center text-blue-400 shadow-lg shadow-blue-900/30">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white tracking-wide">
                ITIS PLATFORM INTEGRATION HUB & LIVE API SDK
              </h1>
              <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                SDK @itis/api-client
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                PROMPT 061
              </span>
            </div>
            <p className="text-xs text-slate-400">
              End-to-End Connectivity Across All 10 Operational Portals, WebSocket /ws Hub & Multi-Environment SDK
            </p>
          </div>
        </div>

        {/* ENVIRONMENT SWITCHER */}
        <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 font-mono text-xs">
          <span className="text-slate-400 text-[10px] px-2 font-bold flex items-center space-x-1">
            <Server className="w-3.5 h-3.5 text-blue-400" />
            <span>ENV:</span>
          </span>

          {(['development', 'testing', 'staging', 'production'] as EnvironmentMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => handleEnvChange(mode)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                envMode === mode
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* PLATFORM INTEGRATION MAIN CONTAINER */}
      <div className="w-full max-w-7xl space-y-6">
        {/* CROSS-APP CONNECTIVITY TOP STATUS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 font-mono text-xs">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">CONNECTED PORTALS</div>
            <div className="text-2xl font-black text-white mt-1">10 / 10</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Website, Parent, School, C3, Exec, Gov</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">SDK API CLIENT</div>
            <div className="text-xl font-black text-blue-400 mt-1">@itis/api-client</div>
            <div className="text-[10px] text-slate-400 mt-0.5">v1.0.0-PROMPT061</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">WEBSOCKET HUB</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">/ws CONNECTED</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">6 Channels Broadcast</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">IAM AUTH SECURITY</div>
            <div className="text-xl font-black text-amber-400 mt-1">JWT + mTLS</div>
            <div className="text-[10px] text-amber-400 mt-0.5">SITA Enclave Validated</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">END-TO-END LATENCY</div>
            <div className="text-2xl font-black text-purple-400 mt-1">{e2eMetrics.crossAppLatencyMs} ms</div>
            <div className="text-[10px] text-purple-400 mt-0.5">Real-time Sync</div>
          </div>
        </div>

        {/* END-TO-END INTERACTIVE SIMULATION DEMO PANEL */}
        <div className="bg-slate-900 p-5 rounded-2xl border-2 border-blue-600/50 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span>END-TO-END CROSS-APPLICATION DATA FLOW SIMULATOR</span>
              </h3>
              <p className="text-xs text-slate-400">Trigger live events across portals to witness real-time WebSocket hub propagation</p>
            </div>

            {simulatedAction && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-xl animate-pulse font-mono">
                EXECUTING SIMULATION: {simulatedAction}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <button
              onClick={() => triggerE2eSimulation('NFC_TAP')}
              className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500 p-3.5 rounded-xl text-left space-y-1 transition-all group"
            >
              <div className="flex items-center justify-between text-blue-400 font-bold">
                <span>1. Gate NFC Scan Event</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                School Reader Tap -&gt; Updates Parent App, Attendance API & Executive Dashboard KPIs.
              </p>
            </button>

            <button
              onClick={() => triggerE2eSimulation('SOS_PANIC')}
              className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-red-500 p-3.5 rounded-xl text-left space-y-1 transition-all group"
            >
              <div className="flex items-center justify-between text-red-400 font-bold">
                <span>2. Wearable SOS Emergency</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                SOS Press -&gt; Dispatches C3 Command, Emergency Responder Mobile & Cabinet Alert.
              </p>
            </button>

            <button
              onClick={() => triggerE2eSimulation('PROVISION_DEVICE')}
              className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500 p-3.5 rounded-xl text-left space-y-1 transition-all group"
            >
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>3. Technician BLE Pairing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                BLE Scan -&gt; Flashes OTA Firmware, Registers Hardware in Inventory & Fleet API.
              </p>
            </button>
          </div>
        </div>

        {/* WEBSOCKET HUB & API LOGS MONITOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WEBSOCKET HUB MONITOR */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white flex items-center space-x-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>WEBSOCKET /ws BROADCAST CHANNEL MONITOR</span>
              </span>
              <span className="text-[10px] text-slate-400">{currentEnvConfig.wsUrl}</span>
            </div>

            {/* CHANNEL SELECTOR */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              {(['telemetry', 'incidents', 'attendance', 'notifications', 'dispatch', 'ai_predictions'] as WsChannel[]).map(
                (ch) => (
                  <button
                    key={ch}
                    onClick={() => setActiveChannel(ch)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                      activeChannel === ch
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {ch}
                  </button>
                )
              )}
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 h-44 overflow-y-auto">
              <div className="text-[10px] text-emerald-400 font-bold">LIVE STREAM LISTENER ({activeChannel}):</div>
              <div className="text-slate-300 text-[11px] font-mono break-all leading-relaxed">{lastWsMessage}</div>
            </div>
          </div>

          {/* API CLIENT REQUEST CONSOLE */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span>@itis/api-client REQUEST LOG CONSOLE</span>
              </span>
              <span className="text-[10px] text-emerald-400">REST & mTLS SECURE</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 h-44 overflow-y-auto">
              {apiLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between text-[10px] border-b border-slate-800/50 pb-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-blue-400">{log.method}</span>
                    <span className="text-slate-300">{log.endpoint}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">{log.status} OK</span>
                    <span className="text-slate-500">{log.durationMs}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SHARED GIS MAP ENGINE UNIFIED VIEW */}
        <div className="space-y-3">
          <div className="font-mono text-xs text-slate-400 font-bold flex items-center space-x-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>UNIFIED CROSS-PLATFORM GIS MAP COMPONENT (SHARED BY ALL 10 APPS)</span>
          </div>
          <UnifiedMapComponent heightPx={380} />
        </div>
      </div>
    </div>
  );
}
