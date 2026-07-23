import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Layers,
  Shield,
  Siren,
  Bus,
  School,
  Activity,
  Maximize2,
  RefreshCw,
  Compass,
  AlertTriangle,
  Radio,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';
import { itisWebSocketHub } from '../lib/websocket-hub';

export interface MapMarker {
  id: string;
  type: 'SCHOOL' | 'LEARNER' | 'RESPONDER' | 'BUS' | 'INCIDENT';
  label: string;
  lat: number;
  lng: number;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'ACTIVE';
  details?: string;
}

interface UnifiedMapProps {
  title?: string;
  initialCenter?: { lat: number; lng: number };
  heightPx?: number;
  showLayerControls?: boolean;
  interactive?: boolean;
  activeLayers?: {
    schools?: boolean;
    learners?: boolean;
    responders?: boolean;
    buses?: boolean;
    incidents?: boolean;
    geofences?: boolean;
  };
  onMarkerSelect?: (marker: MapMarker) => void;
}

export function UnifiedMapComponent({
  title = 'ITIS NATIONAL GIS PLATFORM • UNIFIED MAP ENGINE',
  initialCenter = { lat: -26.2041, lng: 28.0473 },
  heightPx = 420,
  showLayerControls = true,
  interactive = true,
  activeLayers: propLayers,
  onMarkerSelect,
}: UnifiedMapProps) {
  const [layers, setLayers] = useState({
    schools: propLayers?.schools ?? true,
    learners: propLayers?.learners ?? true,
    responders: propLayers?.responders ?? true,
    buses: propLayers?.buses ?? true,
    incidents: propLayers?.incidents ?? true,
    geofences: propLayers?.geofences ?? true,
  });

  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [livePingsCount, setLivePingsCount] = useState<number>(1420);
  const [lastPingTime, setLastPingTime] = useState<string>('Just now');

  // Sample static map entities mapped on canvas grid
  const [markers, setMarkers] = useState<MapMarker[]>([
    { id: 'SCH-01', type: 'SCHOOL', label: 'Soweto High School', lat: -26.2041, lng: 28.0473, status: 'NORMAL', details: '1,840 Learners Protected • Gate 01 Online' },
    { id: 'SCH-02', type: 'SCHOOL', label: 'Orlando East Secondary', lat: -26.2312, lng: 27.9123, status: 'NORMAL', details: '2,100 Learners Protected • All NFC Readers Online' },
    { id: 'LNR-01', type: 'LEARNER', label: 'Sipho Ndlovu (WR-GP-8831)', lat: -26.2081, lng: 28.0493, status: 'NORMAL', details: 'Battery 94% • Buckle Locked • Velocity 0km/h' },
    { id: 'RSP-01', type: 'RESPONDER', label: 'JMPD Patrol Unit GP-04', lat: -26.212, lng: 28.041, status: 'ACTIVE', details: 'SAPS / Metro Unit Dispatched • Sub-3m SLA' },
    { id: 'BUS-01', type: 'BUS', label: 'Fleet Bus GP-102 (Route 14)', lat: -26.221, lng: 28.035, status: 'NORMAL', details: '48 Learners Onboard • Speed 38 km/h' },
    { id: 'INC-01', type: 'INCIDENT', label: 'SOS Panic Alert #INC-901', lat: -26.228, lng: 27.92, status: 'CRITICAL', details: 'SOS Button Pressed • Responder Assigned' },
  ]);

  // Subscribe to real-time telemetry WebSocket updates
  useEffect(() => {
    const unsubscribe = itisWebSocketHub.subscribe('telemetry', (msg) => {
      setLivePingsCount((prev) => prev + 1);
      setLastPingTime(new Date().toLocaleTimeString());

      if (msg.event === 'PING_UPDATE') {
        const payload = msg.payload as { deviceId: string; lat: number; lng: number; status: string };
        setMarkers((prev) =>
          prev.map((m) =>
            m.id === 'LNR-01'
              ? { ...m, lat: payload.lat, lng: payload.lng, details: `Live WS Ping • ${payload.status} • Battery 92%` }
              : m
          )
        );
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleLayer = (layerName: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    if (onMarkerSelect) onMarkerSelect(marker);
  };

  return (
    <div className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans">
      {/* MAP TOP BAR */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span className="font-bold text-white tracking-wide">{title}</span>
          <span className="bg-emerald-950 text-emerald-400 text-[9px] px-2 py-0.5 rounded border border-emerald-500/40">
            WS LIVE
          </span>
        </div>

        <div className="flex items-center space-x-3 text-slate-400 text-[11px]">
          <div>
            Pings Logged: <span className="text-white font-bold">{livePingsCount.toLocaleString()}</span>
          </div>
          <div>
            Last Sync: <span className="text-emerald-400 font-bold">{lastPingTime}</span>
          </div>
        </div>
      </div>

      {/* LAYER CONTROLS BAR */}
      {showLayerControls && (
        <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center space-x-1.5 flex-wrap">
            <span className="text-slate-400 text-[10px] mr-1 flex items-center space-x-1">
              <Layers className="w-3 h-3 text-amber-400" />
              <span>LAYERS:</span>
            </span>

            <button
              onClick={() => toggleLayer('schools')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border transition-all ${
                layers.schools
                  ? 'bg-blue-950 text-blue-400 border-blue-500/50'
                  : 'bg-slate-950 text-slate-500 border-slate-800 opacity-60'
              }`}
            >
              <School className="w-3 h-3" />
              <span>Schools</span>
            </button>

            <button
              onClick={() => toggleLayer('learners')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border transition-all ${
                layers.learners
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/50'
                  : 'bg-slate-950 text-slate-500 border-slate-800 opacity-60'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>Wearables</span>
            </button>

            <button
              onClick={() => toggleLayer('responders')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border transition-all ${
                layers.responders
                  ? 'bg-amber-950 text-amber-400 border-amber-500/50'
                  : 'bg-slate-950 text-slate-500 border-slate-800 opacity-60'
              }`}
            >
              <Siren className="w-3 h-3" />
              <span>SAPS / Responders</span>
            </button>

            <button
              onClick={() => toggleLayer('buses')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border transition-all ${
                layers.buses
                  ? 'bg-purple-950 text-purple-400 border-purple-500/50'
                  : 'bg-slate-950 text-slate-500 border-slate-800 opacity-60'
              }`}
            >
              <Bus className="w-3 h-3" />
              <span>Scholar Fleet</span>
            </button>

            <button
              onClick={() => toggleLayer('incidents')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border transition-all ${
                layers.incidents
                  ? 'bg-red-950 text-red-400 border-red-500/50'
                  : 'bg-slate-950 text-slate-500 border-slate-800 opacity-60'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>SOS Incidents</span>
            </button>
          </div>

          <div className="text-[10px] text-slate-400 font-sans">
            Grid Scale: 1:25000 • SITA mTLS Encrypted GIS
          </div>
        </div>
      )}

      {/* MAP CANVAS GRID INTERACTIVE DISPLAY */}
      <div
        className="relative bg-slate-950 w-full overflow-hidden flex items-center justify-center"
        style={{ height: `${heightPx}px` }}
      >
        {/* MAP BACKGROUND TILE SIMULATION GRID */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>

        {/* GEOFENCE SAFE CORRIDOR OVERLAY POLYGON */}
        {layers.geofences && (
          <div className="absolute w-72 h-48 border-2 border-dashed border-emerald-500/40 bg-emerald-500/10 rounded-full flex items-center justify-center pointer-events-none transform -rotate-12">
            <span className="text-[10px] font-mono text-emerald-400/80 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              SOWETO SAFE CORRIDOR GEOFENCE (ACTIVE)
            </span>
          </div>
        )}

        {/* MAP MARKERS */}
        {markers.map((marker, index) => {
          // Hide marker if layer disabled
          if (
            (marker.type === 'SCHOOL' && !layers.schools) ||
            (marker.type === 'LEARNER' && !layers.learners) ||
            (marker.type === 'RESPONDER' && !layers.responders) ||
            (marker.type === 'BUS' && !layers.buses) ||
            (marker.type === 'INCIDENT' && !layers.incidents)
          ) {
            return null;
          }

          // Positioning relative to center grid simulation
          const topPercent = 25 + ((index * 14) % 55);
          const leftPercent = 18 + ((index * 22) % 65);

          return (
            <div
              key={marker.id}
              onClick={() => handleMarkerClick(marker)}
              className="absolute cursor-pointer group transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 z-10"
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
            >
              <div className="relative flex flex-col items-center">
                {/* Ping Pulse ring for critical/active */}
                {(marker.status === 'CRITICAL' || marker.status === 'ACTIVE') && (
                  <span className="absolute w-8 h-8 rounded-full bg-red-500 opacity-75 animate-ping"></span>
                )}

                <div
                  className={`p-2 rounded-xl border shadow-xl flex items-center justify-center font-bold text-xs ${
                    marker.type === 'SCHOOL'
                      ? 'bg-blue-950 text-blue-400 border-blue-500'
                      : marker.type === 'LEARNER'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500'
                      : marker.type === 'RESPONDER'
                      ? 'bg-amber-950 text-amber-400 border-amber-500'
                      : marker.type === 'BUS'
                      ? 'bg-purple-950 text-purple-400 border-purple-500'
                      : 'bg-red-950 text-red-400 border-red-500'
                  }`}
                >
                  {marker.type === 'SCHOOL' && <School className="w-4 h-4" />}
                  {marker.type === 'LEARNER' && <Activity className="w-4 h-4" />}
                  {marker.type === 'RESPONDER' && <Siren className="w-4 h-4" />}
                  {marker.type === 'BUS' && <Bus className="w-4 h-4" />}
                  {marker.type === 'INCIDENT' && <AlertTriangle className="w-4 h-4" />}
                </div>

                {/* Marker Tooltip on Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-white text-[10px] font-mono px-2 py-1 rounded shadow-xl whitespace-nowrap mt-1">
                  {marker.label}
                </div>
              </div>
            </div>
          );
        })}

        {/* SELECTED MARKER INSPECTOR POPUP */}
        {selectedMarker && (
          <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 border-2 border-amber-500 p-3 rounded-xl text-xs font-mono text-slate-100 shadow-2xl flex items-center justify-between gap-3 z-20">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/40">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white">{selectedMarker.label} ({selectedMarker.id})</div>
                <div className="text-[11px] text-slate-300">{selectedMarker.details}</div>
                <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                  GPS: {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)} • Live Stream Connected
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedMarker(null)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] px-2.5 py-1.5 rounded-lg border border-slate-700"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
