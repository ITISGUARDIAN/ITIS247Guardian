import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Shield,
  Layers,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Play,
  FileCode,
  Award,
  Database,
  ArrowRight,
  Activity,
  Maximize2,
  RefreshCw,
  Search,
  Check,
  Copy,
  Clock,
  TrendingUp,
  Navigation,
  Crosshair,
  Sliders
} from 'lucide-react';
import {
  GeofenceType,
  SpatialEventType,
  GeofenceDefinition,
  SafeCorridorRoute,
  LearnerJourneySession,
  SpatialEventRecord,
  GEOFENCE_PIPELINE_STEPS,
  SAMPLE_GEOFENCES,
  SAMPLE_SAFE_CORRIDORS,
  SAMPLE_ACTIVE_JOURNEYS,
  SAMPLE_SPATIAL_EVENTS,
  GEOFENCE_SPEC_ITEMS,
  CRITICAL_GEOFENCE_RULES
} from '../data/geofenceModuleData';

export function GeofenceModule() {
  const [activeSubTab, setActiveSubTab] = useState<'map' | 'pipeline' | 'journeys' | 'postgis' | 'rules' | 'nestjs'>('map');

  // Interactive Map State
  const [testLat, setTestLat] = useState(-26.2581);
  const [testLng, setTestLng] = useState(27.8573);
  const [selectedGeofence, setSelectedGeofence] = useState<GeofenceDefinition>(SAMPLE_GEOFENCES[0]);
  const [activeJourneys, setActiveJourneys] = useState<LearnerJourneySession[]>(SAMPLE_ACTIVE_JOURNEYS);
  const [spatialEvents, setSpatialEvents] = useState<SpatialEventRecord[]>(SAMPLE_SPATIAL_EVENTS);

  // Evaluation state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<{
    insideGeofence: boolean;
    geofenceName: string;
    corridorOffsetMeters: number;
    generatedEvent?: string;
  } | null>(null);

  // Code Spec State
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

  // Run Spatial Point-In-Polygon Evaluation Simulation
  const handleRunSpatialEvaluation = (preset?: 'ON_SCHOOL' | 'ON_ROUTE' | 'DEVIATED' | 'ON_HOME') => {
    setIsEvaluating(true);

    let lat = testLat;
    let lng = testLng;

    if (preset === 'ON_SCHOOL') {
      lat = -26.2581;
      lng = 27.8573;
    } else if (preset === 'ON_HOME') {
      lat = -26.2750;
      lng = 27.8420;
    } else if (preset === 'ON_ROUTE') {
      lat = -26.2650;
      lng = 27.8510;
    } else if (preset === 'DEVIATED') {
      lat = -26.2400; // Far away offset!
      lng = 27.8700;
    }

    setTestLat(lat);
    setTestLng(lng);

    setTimeout(() => {
      setIsEvaluating(false);

      // Distance calculation to school center (-26.2581, 27.8573)
      const dLat = (lat - (-26.2581)) * 111000;
      const dLng = (lng - 27.8573) * 111000;
      const distToSchoolMeters = Math.sqrt(dLat * dLat + dLng * dLng);

      const isInsideSchool = distToSchoolMeters <= 250;
      const corridorOffset = isInsideSchool ? 0 : Math.round(distToSchoolMeters - 200);

      let evtType = 'IN_CORRIDOR';
      if (isInsideSchool) {
        evtType = 'SAFE_ARRIVAL (Soweto Primary)';
      } else if (corridorOffset > 80) {
        evtType = 'ROUTE_DEVIATION ALERT (185m offset > 80m limit)';
      }

      setEvalResult({
        insideGeofence: isInsideSchool,
        geofenceName: isInsideSchool ? 'Soweto Primary School Campus' : 'Outside Boundary Zone',
        corridorOffsetMeters: Math.max(0, corridorOffset),
        generatedEvent: evtType,
      });

      if (corridorOffset > 80) {
        const newEvt: SpatialEventRecord = {
          eventId: `spat-evt-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          learnerId: 'itis-lrn-2026-001',
          learnerName: 'Bandile Sithole',
          eventType: 'ROUTE_DEVIATION',
          latitude: lat,
          longitude: lng,
          distanceFromRouteMeters: corridorOffset,
          description: `PostGIS ST_Distance alert: ${corridorOffset}m offset exceeds 80m allowed threshold.`,
          rawTelemetryEventId: 'evt-tlm-sim',
        };
        setSpatialEvents([newEvt, ...spatialEvents]);
        showToast(`ROUTE_DEVIATION Event Generated: ${corridorOffset}m offset detected`);
      } else if (isInsideSchool) {
        showToast(`SAFE_ARRIVAL Event Verified inside Soweto Primary School Campus`);
      } else {
        showToast(`Spatial Evaluation Completed: Learner on approved safe corridor`);
      }
    }, 450);
  };

  const activeSpec = GEOFENCE_SPEC_ITEMS.find((s) => s.id === selectedSpecId) || GEOFENCE_SPEC_ITEMS[0];

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
                <Compass className="w-3.5 h-3.5" /> </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Spatial Tracking, Geofencing & Safe Corridor Engine
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              PostGIS Geofencing & Safe Corridor Engine
            </h1>
            <p className="text-slate-300 max-w-3xl text-sm leading-relaxed">
              Transforms raw GPS coordinates into verified spatial intelligence events (ENTER_GEOFENCE, ROUTE_DEVIATION, SAFE_ARRIVAL) using PostGIS ST_Contains, ST_DWithin, and ST_LineLocatePoint across 13 geofence types.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleRunSpatialEvaluation('ON_SCHOOL')}
              disabled={isEvaluating}
              className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simulate School Arrival</span>
            </button>

            <button
              onClick={() => handleRunSpatialEvaluation('DEVIATED')}
              disabled={isEvaluating}
              className="flex items-center space-x-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-amber-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Simulate Route Deviation</span>
            </button>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Evaluation Capacity</div>
            <div className="text-xl font-bold text-emerald-400 mt-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              100,000 eval/s
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Evaluation SLA</div>
            <div className="text-xl font-bold text-indigo-400 mt-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              &lt; 100 ms
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Geofence Types</div>
            <div className="text-xl font-bold text-cyan-400 mt-1 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              13 Types
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Spatial Database</div>
            <div className="text-xl font-bold text-amber-400 mt-1 flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" />
              PostGIS + GiST
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
            <div className="text-xs text-slate-400 font-medium">Baseline Requirement</div>
            <div className="text-xs font-bold text-slate-200 mt-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Rule 2: Home + School
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center space-x-1 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('map')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'map'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Spatial Evaluator & Map Simulator</span>
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
          <span>10-Step Pipeline Inspector</span>
        </button>

        <button
          onClick={() => setActiveSubTab('journeys')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'journeys'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>Active Journeys & Deviation Monitor</span>
        </button>

        <button
          onClick={() => setActiveSubTab('postgis')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'postgis'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>PostGIS Tables & Spatial Queries</span>
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

      {/* SUBTAB 1: SPATIAL EVALUATOR & MAP SIMULATOR */}
      {activeSubTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Geofence Map Simulation Canvas */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-400" /> Spatial Boundary & Corridor Canvas
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Soweto Primary Safe Transit Corridor & Polygon Geofences</p>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                SRID 4326 / PostGIS 3.4
              </span>
            </div>

            {/* Custom Interactive Coordinate Map Canvas Box */}
            <div className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

              {/* Map Layers Visual representation */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-slate-300 font-bold">
                  Learner: Bandile Sithole (itis-lrn-2026-001)
                </span>
                <span className="text-emerald-400 font-bold">ST_DWithin Buffer: 20m</span>
              </div>

              {/* Visual Map Nodes */}
              <div className="relative z-10 my-auto flex items-center justify-around">
                {/* Home Zone */}
                <div className="text-center space-y-1">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-[11px] font-bold text-blue-300 block">Home Zone</span>
                  <span className="text-[9px] text-slate-500 block">Radius 100m</span>
                </div>

                {/* Corridor Linestring */}
                <div className="flex-1 max-w-xs mx-4 border-t-2 border-dashed border-indigo-500/60 relative flex items-center justify-center">
                  <span className="absolute -top-3 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-700 text-[9px] text-indigo-300 font-bold">
                    Safe Corridor (Allowed: 80m)
                  </span>

                  {/* Test Point Marker */}
                  <div className="absolute -bottom-5 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-slate-950 shadow-lg">
                      GPS
                    </div>
                    <span className="text-[9px] font-mono text-emerald-300 mt-0.5">Current GPS</span>
                  </div>
                </div>

                {/* School Campus Zone */}
                <div className="text-center space-y-1">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <Shield className="w-8 h-8 text-emerald-400" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-300 block">School Campus</span>
                  <span className="text-[9px] text-slate-500 block">Radius 250m</span>
                </div>
              </div>

              {/* Map Footer Info */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                <span>Lat: {testLat.toFixed(4)} • Lng: {testLng.toFixed(4)}</span>
                <span className="text-indigo-400 font-bold">ST_LineLocatePoint Progress: 68%</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block">Simulate GPS Positions:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleRunSpatialEvaluation('ON_SCHOOL')}
                  disabled={isEvaluating}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 text-left transition-all"
                >
                  <span className="font-bold text-emerald-400 block">At School Campus</span>
                  <span className="text-[10px] text-slate-400">Inside 250m perimeter</span>
                </button>

                <button
                  onClick={() => handleRunSpatialEvaluation('ON_HOME')}
                  disabled={isEvaluating}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 text-left transition-all"
                >
                  <span className="font-bold text-blue-400 block">At Home Residence</span>
                  <span className="text-[10px] text-slate-400">Inside 100m home zone</span>
                </button>

                <button
                  onClick={() => handleRunSpatialEvaluation('ON_ROUTE')}
                  disabled={isEvaluating}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 text-left transition-all"
                >
                  <span className="font-bold text-indigo-400 block">On Safe Corridor</span>
                  <span className="text-[10px] text-slate-400">Offset &lt; 80m allowed</span>
                </button>

                <button
                  onClick={() => handleRunSpatialEvaluation('DEVIATED')}
                  disabled={isEvaluating}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 text-left transition-all"
                >
                  <span className="font-bold text-amber-400 block">Route Deviation</span>
                  <span className="text-[10px] text-slate-400">Offset &gt; 180m limit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Evaluation Results & Active Geofences List */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Evaluation Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" /> PostGIS ST_Contains Evaluation Result
              </h3>

              {evalResult ? (
                <div className="space-y-3">
                  <div className={`p-4 rounded-xl border ${
                    evalResult.insideGeofence
                      ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                      : evalResult.corridorOffsetMeters > 80
                      ? 'bg-amber-950/50 border-amber-500/50 text-amber-200'
                      : 'bg-indigo-950/50 border-indigo-500/50 text-indigo-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider">Spatial Status</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 font-bold">
                        {evalResult.insideGeofence ? 'ST_Contains = TRUE' : 'ST_Contains = FALSE'}
                      </span>
                    </div>

                    <div className="text-base font-extrabold mt-1">{evalResult.geofenceName}</div>
                    <div className="text-xs mt-2 opacity-90">
                      Corridor Perpendicular Offset: <strong>{evalResult.corridorOffsetMeters} meters</strong>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                    <span className="text-slate-500 block font-bold text-[10px] uppercase">Generated Spatial Event</span>
                    <strong className="text-indigo-300 font-bold block">{evalResult.generatedEvent}</strong>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-500 text-xs">
                  Click a preset or button to evaluate GPS coordinates against PostGIS spatial layers.
                </div>
              )}
            </div>

            {/* Active Geofence Definitions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" /> Active Learner Geofences (Rule 2)
              </h3>

              <div className="space-y-2.5">
                {SAMPLE_GEOFENCES.map((fence) => (
                  <div key={fence.id} className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{fence.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{fence.geofenceType} • Buffer {fence.bufferMeters}m</span>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: 10-STEP PIPELINE INSPECTOR */}
      {activeSubTab === 'pipeline' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" /> 10-Step Geofence Evaluation Pipeline Architecture
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Sub-100ms spatial evaluation flow executing PostGIS ST_Contains, ST_Distance, and ST_LineLocatePoint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {GEOFENCE_PIPELINE_STEPS.map((step) => (
              <div key={step.stepNumber} className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    STEP {step.stepNumber}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">{step.avgLatencyMs}ms</span>
                </div>

                <h3 className="text-xs font-bold text-white mt-1">{step.name}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{step.description}</p>

                <div className="pt-2 border-t border-slate-700/60 text-[10px] font-mono text-indigo-300 truncate">
                  {step.postgisOperation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: ACTIVE JOURNEYS & DEVIATION MONITOR */}
      {activeSubTab === 'journeys' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Navigation className="w-5 h-5 text-indigo-400" /> Active Scholar Journeys & Safe Corridor Deviation Monitor
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Monitors route compliance, perpendicular offsets, and unauthorized stops across transit corridors.
              </p>
            </div>

            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30">
              2 Active Sessions
            </span>
          </div>

          <div className="space-y-4">
            {activeJourneys.map((jrn) => (
              <div key={jrn.journeyId} className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-base">{jrn.learnerName}</span>
                      <span className="text-xs text-slate-400 font-mono">({jrn.learnerId})</span>
                    </div>
                    <p className="text-xs text-indigo-300 font-medium">{jrn.routeName}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    jrn.status === 'IN_PROGRESS'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse'
                  }`}>
                    {jrn.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Distance Travelled</span>
                    <strong className="text-slate-200">{jrn.currentDistanceTravelledMeters} meters</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Corridor Offset</span>
                    <strong className={jrn.currentDeviationMeters > 80 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {jrn.currentDeviationMeters} meters
                    </strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Avg Speed</span>
                    <strong className="text-slate-200">{jrn.avgSpeedKmh} km/h</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Compliance Score</span>
                    <strong className="text-emerald-400 font-bold">{jrn.routeComplianceScorePct}%</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Safety Score</span>
                    <strong className={jrn.journeySafetyScore === 'EXCELLENT' ? 'text-emerald-300' : 'text-amber-300'}>
                      {jrn.journeySafetyScore}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: POSTGIS TABLES & SPATIAL QUERIES */}
      {activeSubTab === 'postgis' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-400" /> PostGIS Spatial Tables & Geometry Indexing
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Database tables: <code className="text-indigo-300">geofence_events</code>, <code className="text-indigo-300">safe_corridors</code>, <code className="text-indigo-300">learner_journeys</code> with GiST spatial indexes.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Spatial Events Record:</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-800 text-slate-300">
                    <th className="p-3">Event ID</th>
                    <th className="p-3">Learner ID</th>
                    <th className="p-3">Event Type</th>
                    <th className="p-3">Geofence Name</th>
                    <th className="p-3">Offset (m)</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {spatialEvents.map((evt) => (
                    <tr key={evt.eventId} className="hover:bg-slate-800/40">
                      <td className="p-3 text-indigo-400 font-bold">{evt.eventId}</td>
                      <td className="p-3 text-slate-300">{evt.learnerId}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          evt.eventType === 'ROUTE_DEVIATION'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {evt.eventType}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300">{evt.geofenceName || 'N/A'}</td>
                      <td className="p-3 text-slate-300">{evt.distanceFromRouteMeters}m</td>
                      <td className="p-3 text-slate-400">{evt.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: CRITICAL ITIS RULES */}
      {activeSubTab === 'rules' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Critical ITIS Spatial Geofencing Rules (1 – 5)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Architectural constraints enforcing baseline geofence requirements and decoupled spatial intelligence generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CRITICAL_GEOFENCE_RULES.map((rule) => (
              <div key={rule.id} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    RULE {rule.id}
                  </span>
                  <h3 className="text-sm font-bold text-white">{rule.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rule.ruleText}</p>
                <div className="pt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-indigo-300">
                    {rule.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 6: NESTJS ENGINEERING SPECS */}
      {activeSubTab === 'nestjs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">Engineering Code Modules:</span>
            {GEOFENCE_SPEC_ITEMS.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecId(spec.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedSpecId === spec.id
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{spec.title}</span>
                  <FileCode className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="text-[10px] opacity-80 mt-1 font-mono truncate">{spec.filename}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{activeSpec.filename}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{activeSpec.title}</h3>
              </div>

              <button
                onClick={() => handleCopyCode(activeSpec.id, activeSpec.code)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5"
              >
                {copiedCodeId === activeSpec.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === activeSpec.id ? 'Copied' : 'Copy Spec'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">{activeSpec.description}</p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto max-h-96">
              <pre>{activeSpec.code}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
