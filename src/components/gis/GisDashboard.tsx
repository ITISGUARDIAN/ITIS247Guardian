import React, { useState, useEffect } from 'react';
import { 
  Map, 
  MapPin, 
  Layers, 
  ShieldAlert, 
  Navigation, 
  Truck, 
  Radio, 
  Activity, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Wifi, 
  WifiOff, 
  Eye, 
  Sliders, 
  Plus, 
  Globe, 
  RefreshCw, 
  Zap, 
  FileText, 
  Terminal, 
  Crosshair, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { gisEngine } from '../../lib/gis/GisEngineService';
import { 
  MapProvider, 
  MapLayerType, 
  GeofenceItem, 
  IntelligentRoute, 
  FleetTelemetryItem, 
  GeospatialAlert, 
  SpatialHeatmapPoint, 
  GisReadinessReport 
} from '../../lib/gis/types';

export const GisDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'geofences' | 'routes' | 'fleet' | 'alerts' | 'analytics' | 'api' | 'readiness'>('map');
  
  // GIS Engine State
  const [provider, setProvider] = useState<MapProvider>(gisEngine.getProvider());
  const [activeLayers, setActiveLayers] = useState<MapLayerType[]>(gisEngine.getActiveLayers());
  const [geofences, setGeofences] = useState<GeofenceItem[]>(gisEngine.getGeofences());
  const [routes, setRoutes] = useState<IntelligentRoute[]>(gisEngine.getRoutes());
  const [fleet, setFleet] = useState<FleetTelemetryItem[]>(gisEngine.getFleetTelemetry());
  const [alerts, setAlerts] = useState<GeospatialAlert[]>(gisEngine.getAlerts());
  const [heatmaps, setHeatmaps] = useState<SpatialHeatmapPoint[]>(gisEngine.getHeatmaps());
  const [offlineInfo, setOfflineInfo] = useState(gisEngine.getOfflineInfo());
  const [report, setReport] = useState<GisReadinessReport>(gisEngine.getGisReadinessReport());

  // Location focus & view state
  const [selectedFocus, setSelectedFocus] = useState<'gauteng' | 'tshwane' | 'hatfield' | 'soweto'>('hatfield');
  const [selectedFleetEntity, setSelectedFleetEntity] = useState<FleetTelemetryItem | null>(fleet[0] || null);
  const [selectedHeatmapFilter, setSelectedHeatmapFilter] = useState<'all' | 'attendance' | 'sos' | 'delay' | 'high_risk'>('all');

  // New Geofence Form state
  const [isAddingGeofence, setIsAddingGeofence] = useState(false);
  const [newGfName, setNewGfName] = useState('');
  const [newGfType, setNewGfType] = useState<GeofenceItem['type']>('school_boundary');
  const [newGfGeometry, setNewGfGeometry] = useState<GeofenceItem['geometry']>('circle');
  const [newGfSchool, setNewGfSchool] = useState('Hatfield Secondary');
  const [newGfRadius, setNewGfRadius] = useState('100');

  // API Console State
  const [apiEndpoint, setApiEndpoint] = useState<string>('/api/v1/maps');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setGeofences([...gisEngine.getGeofences()]);
    setRoutes([...gisEngine.getRoutes()]);
    setFleet([...gisEngine.getFleetTelemetry()]);
    setAlerts([...gisEngine.getAlerts()]);
    setHeatmaps([...gisEngine.getHeatmaps()]);
    setOfflineInfo(gisEngine.getOfflineInfo());
    setReport(gisEngine.getGisReadinessReport());
  };

  const handleProviderChange = (p: MapProvider) => {
    gisEngine.setProvider(p);
    setProvider(p);
    setOfflineInfo(gisEngine.getOfflineInfo());
  };

  const handleLayerToggle = (l: MapLayerType) => {
    gisEngine.toggleLayer(l);
    setActiveLayers(gisEngine.getActiveLayers());
  };

  const handleToggleOffline = () => {
    const isNowOffline = gisEngine.toggleOfflineMode();
    setProvider(gisEngine.getProvider());
    setOfflineInfo(gisEngine.getOfflineInfo());
  };

  const handleCreateGeofence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGfName) return;

    gisEngine.addGeofence({
      name: newGfName,
      type: newGfType,
      geometry: newGfGeometry,
      schoolName: newGfSchool,
      centerLat: -25.7505,
      centerLng: 28.2380,
      radiusMeters: Number(newGfRadius) || 100,
      status: 'ACTIVE',
      riskLevel: 'SAFE'
    });

    setNewGfName('');
    setIsAddingGeofence(false);
    refreshData();
  };

  const handleGenerateEmergencyRoute = (routeId: string) => {
    gisEngine.calculateAlternativeEmergencyRoute(routeId);
    refreshData();
  };

  const handleTriggerSOS = (fleetId: string) => {
    gisEngine.triggerSimulatedEmergencySOS(fleetId);
    refreshData();
  };

  const handleResolveAlert = (id: string) => {
    gisEngine.resolveAlert(id);
    refreshData();
  };

  const handleTestApi = async (endpoint: string) => {
    setApiEndpoint(endpoint);
    setApiLoading(true);
    let res: any;
    if (endpoint === '/api/v1/maps') res = await gisEngine.fetchApiMaps();
    else if (endpoint === '/api/v1/geofences') res = await gisEngine.fetchApiGeofences();
    else if (endpoint === '/api/v1/routes') res = await gisEngine.fetchApiRoutes();
    else if (endpoint === '/api/v1/spatial') res = await gisEngine.fetchApiSpatial();
    else if (endpoint === '/api/v1/heatmaps') res = await gisEngine.fetchApiHeatmaps();
    
    setApiResponse(res);
    setApiLoading(false);
  };

  // Center coordinate mapping
  const focusCoordinates = {
    gauteng: { lat: -26.0, lng: 28.1, label: 'Gauteng Provincial Grid', zoom: '1:250,000' },
    tshwane: { lat: -25.74, lng: 28.22, label: 'City of Tshwane District', zoom: '1:50,000' },
    hatfield: { lat: -25.7505, lng: 28.2380, label: 'Hatfield Secondary Campus', zoom: '1:5,000' },
    soweto: { lat: -26.2485, lng: 27.8540, label: 'Soweto Tech Academy Corridor', zoom: '1:8,000' }
  };

  const currentFocus = focusCoordinates[selectedFocus];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Globe className="w-80 h-80 text-emerald-500" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Enterprise GIS Platform
              </span>
              <span className="text-xs text-slate-400 font-mono">v4.8.0-PROD</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Compass className="w-8 h-8 text-emerald-400" />
              Geospatial Intelligence & Safety Geofencing Platform
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Real-time spatial monitoring engine for Gauteng schools, learner safety corridors, live transport fleets, and emergency incident overlays.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleOffline}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-2 ${
                offlineInfo.isOffline
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {offlineInfo.isOffline ? <WifiOff className="w-4 h-4 text-amber-400" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
              {offlineInfo.isOffline ? 'Offline Mode Active' : 'Cloud Tile Sync'}
            </button>

            <button
              onClick={() => setActiveTab('readiness')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-emerald-900/30 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              GIS Readiness Report ({report.softwareCompletePct}%)
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 text-xs block">Active Geofences</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">{geofences.filter(g => g.status === 'ACTIVE').length} / {geofences.length}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 text-xs block">Monitored Routes</span>
            <span className="text-xl font-bold text-blue-400 mt-1 block">{routes.length} Active</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 text-xs block">Fleet & Wearables</span>
            <span className="text-xl font-bold text-purple-400 mt-1 block">{fleet.length} Tracking</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 text-xs block">Active Spatial Alerts</span>
            <span className="text-xl font-bold text-rose-400 mt-1 block">{alerts.filter(a => a.status === 'ACTIVE').length} Urgent</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 text-xs block">Offline Tile Cache</span>
            <span className="text-xl font-bold text-cyan-400 mt-1 block">{offlineInfo.cachedTiles} Tiles</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 text-xs block">Active Provider</span>
            <span className="text-xs font-mono font-bold text-amber-300 mt-2 block truncate">{provider.toUpperCase().replace(/_/g, ' ')}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
        {[
          { id: 'map', label: 'GIS Live Interactive Map', icon: Map },
          { id: 'geofences', label: 'Safety Geofences', icon: ShieldAlert },
          { id: 'routes', label: 'Intelligent Routing', icon: Navigation },
          { id: 'fleet', label: 'Fleet & Wearables', icon: Truck },
          { id: 'alerts', label: 'Geospatial Alerts', icon: Radio },
          { id: 'analytics', label: 'Spatial Heatmaps', icon: Activity },
          { id: 'api', label: 'GIS REST APIs', icon: Terminal },
          { id: 'readiness', label: 'Readiness & Certification', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: GIS LIVE INTERACTIVE MAP ENGINE */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Map Canvas Area */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
              
              {/* Map Bar Controls */}
              <div className="bg-slate-950 p-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Jurisdiction Focus:</span>
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    {(['gauteng', 'tshwane', 'hatfield', 'soweto'] as const).map((focus) => (
                      <button
                        key={focus}
                        onClick={() => setSelectedFocus(focus)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors capitalize ${
                          selectedFocus === focus
                            ? 'bg-emerald-600 text-white font-medium'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {focus}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Engine Provider:</span>
                  <select
                    value={provider}
                    onChange={(e) => handleProviderChange(e.target.value as MapProvider)}
                    className="bg-slate-900 border border-slate-800 text-emerald-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="open_street_map">OpenStreetMap (Vector)</option>
                    <option value="google_maps">Google Maps Platform Adapter</option>
                    <option value="mapbox">Mapbox GL SDK Adapter</option>
                    <option value="offline_tile_server">Local Offline Tile Server</option>
                  </select>
                </div>
              </div>

              {/* Simulated Map Visualizer */}
              <div className="relative h-[520px] bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-800">
                
                {/* Background Grid Representation */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.4) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* Satellite / Terrain Overlay Styling */}
                {activeLayers.includes('satellite') && (
                  <div className="absolute inset-0 bg-emerald-950/20 mix-blend-overlay pointer-events-none" />
                )}
                {activeLayers.includes('infrared_heatmap') && (
                  <div className="absolute inset-0 bg-rose-950/30 mix-blend-color-dodge pointer-events-none" />
                )}

                {/* Centered Focus Coordinates Hud */}
                <div className="absolute top-4 left-4 bg-slate-900/98 border border-slate-800 p-3 rounded-lg z-20 text-xs space-y-1">
                  <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
                    {currentFocus.label}
                  </div>
                  <div className="text-slate-400 font-mono text-[11px]">Lat: {currentFocus.lat.toFixed(4)} | Lng: {currentFocus.lng.toFixed(4)}</div>
                  <div className="text-slate-500 text-[10px]">Scale: {currentFocus.zoom} | Tiles: 100% Loaded</div>
                </div>

                {/* Simulated Geofence Polygons & Circles */}
                {activeLayers.includes('geofences') && geofences.map((gf) => {
                  const isHatfield = gf.schoolName.includes('Hatfield');
                  const xPos = isHatfield ? '45%' : '65%';
                  const yPos = isHatfield ? '35%' : '60%';

                  return (
                    <div 
                      key={gf.id}
                      style={{ left: xPos, top: yPos }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all cursor-pointer group"
                    >
                      <div className={`p-4 rounded-full border-2 border-dashed flex items-center justify-center animate-pulse ${
                        gf.riskLevel === 'RESTRICTED' 
                          ? 'border-rose-500 bg-rose-500/10' 
                          : gf.riskLevel === 'CONTROLLED'
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-emerald-500 bg-emerald-500/10'
                      }`}>
                        <ShieldAlert className={`w-5 h-5 ${
                          gf.riskLevel === 'RESTRICTED' ? 'text-rose-400' : 'text-emerald-400'
                        }`} />
                      </div>
                      
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 border border-slate-700 text-white text-[11px] p-2 rounded whitespace-nowrap z-30 shadow-xl pointer-events-none">
                        <div className="font-bold text-emerald-400">{gf.name}</div>
                        <div className="text-slate-300">{gf.type} • {gf.activeMonitoredCount} Learners inside</div>
                      </div>
                    </div>
                  );
                })}

                {/* Simulated Intelligent Routes (Polyline representation) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <path 
                    d="M 120 180 Q 280 220 450 320 T 680 410" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="3" 
                    strokeDasharray="6 6"
                    className="animate-pulse"
                  />
                  <path 
                    d="M 220 100 L 400 240 L 520 380" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="4" 
                  />
                </svg>

                {/* Simulated Fleet Telemetry Entities */}
                {activeLayers.includes('fleet_telemetry') && fleet.map((f, idx) => {
                  const offsets = [
                    { left: '25%', top: '38%' },
                    { left: '42%', top: '48%' },
                    { left: '58%', top: '32%' },
                    { left: '68%', top: '65%' },
                    { left: '35%', top: '70%' }
                  ];
                  const pos = offsets[idx % offsets.length];

                  return (
                    <div 
                      key={f.id}
                      style={{ left: pos.left, top: pos.top }}
                      onClick={() => setSelectedFleetEntity(f)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 rounded-full border shadow-lg transition-transform hover:scale-125 ${
                        f.status === 'EMERGENCY_SOS'
                          ? 'bg-rose-600 text-white border-rose-300 animate-pulse ring-4 ring-rose-500/50'
                          : f.status === 'MOVING'
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-800 text-slate-300 border-slate-600'
                      }`}
                    >
                      {f.entityType === 'school_bus' && <Truck className="w-4 h-4" />}
                      {f.entityType === 'saps_patrol' && <ShieldAlert className="w-4 h-4" />}
                      {f.entityType === 'learner_wearable' && <Radio className="w-4 h-4" />}
                      {f.entityType === 'technician_van' && <MapPin className="w-4 h-4" />}
                    </div>
                  );
                })}

                {/* Simulated Spatial Heatmap Overlay */}
                {activeLayers.includes('infrared_heatmap') && heatmaps.map((hm) => (
                  <div
                    key={hm.id}
                    style={{ left: `${(hm.lng - 27.5) * 60}%`, top: `${(hm.lat + 26.5) * 80}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                  >
                    <div 
                      className="w-24 h-24 rounded-full opacity-70 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-rose-500/80 via-amber-400/50 to-transparent" 
                      style={{ transform: `scale(${hm.weight * 1.5})` }}
                    />
                  </div>
                ))}

                {/* Map Control Floating Toolbar */}
                <div className="absolute bottom-4 right-4 bg-slate-900/98 border border-slate-800 rounded-lg p-1.5 flex flex-col gap-1 z-20">
                  <button onClick={() => refreshData()} title="Recenter Map" className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button onClick={() => setSelectedFocus('hatfield')} title="Focus Hatfield Campus" className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors">
                    <Crosshair className="w-4 h-4" />
                  </button>
                  <button onClick={() => setSelectedFocus('soweto')} title="Focus Soweto Corridor" className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors">
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Layer Controls Bar */}
              <div className="p-4 bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-slate-200">Active GIS Layers:</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'vector', label: 'Vector Roads' },
                    { id: 'satellite', label: 'Satellite Imagery' },
                    { id: 'infrared_heatmap', label: 'Infrared Density' },
                    { id: 'geofences', label: 'Safety Geofences' },
                    { id: 'fleet_telemetry', label: 'Live Telemetry' }
                  ].map((layer) => {
                    const isChecked = activeLayers.includes(layer.id as MapLayerType);
                    return (
                      <button
                        key={layer.id}
                        onClick={() => handleLayerToggle(layer.id as MapLayerType)}
                        className={`px-3 py-1.5 rounded-lg border transition-all ${
                          isChecked
                            ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 font-medium'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '}{layer.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Active Entity Inspector & GIS Specs */}
          <div className="space-y-4">
            {/* Selected Telemetry Entity Inspector */}
            {selectedFleetEntity ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    Entity Telemetry Inspector
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedFleetEntity.status === 'EMERGENCY_SOS'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  }`}>
                    {selectedFleetEntity.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Entity Name</span>
                    <span className="font-semibold text-white">{selectedFleetEntity.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Assigned Operator / Target</span>
                    <span className="text-slate-200">{selectedFleetEntity.assignedDriverOrTarget}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Speed</span>
                      <span className="font-mono text-emerald-400 font-bold">{selectedFleetEntity.speedKmh} km/h</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Heading</span>
                      <span className="font-mono text-slate-200">{selectedFleetEntity.headingDegrees}° N</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Battery</span>
                      <span className="font-mono text-amber-300">{selectedFleetEntity.batteryPct}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Signal</span>
                      <span className="font-mono text-cyan-300">{selectedFleetEntity.signalQuality}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Coordinates</span>
                    <span className="font-mono text-[11px] text-slate-300">{selectedFleetEntity.lat.toFixed(4)}, {selectedFleetEntity.lng.toFixed(4)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex gap-2">
                  <button
                    onClick={() => handleTriggerSOS(selectedFleetEntity.id)}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow"
                  >
                    Trigger Simulated SOS
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center text-slate-400 text-xs">
                Select any entity on the live map to view real-time telemetry details.
              </div>
            )}

            {/* GIS Infrastructure Capability Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 text-xs">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                GIS Engine Specifications
              </h3>
              
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Coordinate Reference:</span>
                  <span className="font-mono text-slate-200">WGS 84 / EPSG:4326</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Offline Tile Cache:</span>
                  <span className="font-mono text-emerald-400">1,420 MB Cached</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Polyline Route Precision:</span>
                  <span className="font-mono text-slate-200">Sub-meter 10Hz</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Geofence Evaluation:</span>
                  <span className="font-mono text-emerald-400">&lt; 15ms Raycasting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SAFETY GEOFENCES */}
      {activeTab === 'geofences' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-xl border border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-emerald-400" />
                School Safety Geofence Manager
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Configure perimeter boundaries, bus loading bays, safe corridors, and restricted server vaults.
              </p>
            </div>

            <button
              onClick={() => setIsAddingGeofence(!isAddingGeofence)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              {isAddingGeofence ? 'Close Form' : 'Create Safety Geofence'}
            </button>
          </div>

          {/* New Geofence Form Modal / Collapsible */}
          {isAddingGeofence && (
            <form onSubmit={handleCreateGeofence} className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Define New Safety Geofence Boundary</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Geofence Label / Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. North Athletics Perimeter"
                    value={newGfName}
                    onChange={(e) => setNewGfName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Geofence Type</label>
                  <select
                    value={newGfType}
                    onChange={(e) => setNewGfType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="school_boundary">School Boundary</option>
                    <option value="bus_loading_zone">Bus Loading Zone</option>
                    <option value="safe_walking_corridor">Safe Walking Corridor</option>
                    <option value="parent_pickup">Parent Pickup Area</option>
                    <option value="staff_only">Staff-Only Vault</option>
                    <option value="assembly_point">Emergency Assembly Point</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Geometry Shape</label>
                  <select
                    value={newGfGeometry}
                    onChange={(e) => setNewGfGeometry(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="polygon">Custom Polygon</option>
                    <option value="circle">Circular Radius</option>
                    <option value="corridor">Linear Corridor Buffer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Associated School</label>
                  <input
                    type="text"
                    value={newGfSchool}
                    onChange={(e) => setNewGfSchool(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Radius / Buffer (Meters)</label>
                  <input
                    type="number"
                    value={newGfRadius}
                    onChange={(e) => setNewGfRadius(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-all"
                  >
                    Save & Deploy Geofence
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Geofences List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {geofences.map((gf) => (
              <div key={gf.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 block">{gf.id} • {gf.geometry.toUpperCase()}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{gf.name}</h3>
                    <span className="text-slate-400 text-xs block">{gf.schoolName}</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    gf.status === 'ACTIVE' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}>
                    {gf.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Geofence Type</span>
                    <span className="text-slate-300 font-medium">{gf.type.replace(/_/g, ' ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Risk Categorization</span>
                    <span className={`font-semibold ${
                      gf.riskLevel === 'RESTRICTED' ? 'text-rose-400' : 'text-emerald-400'
                    }`}>{gf.riskLevel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Monitored Learners Inside</span>
                    <span className="font-mono text-cyan-300 font-bold">{gf.activeMonitoredCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Center Coordinates</span>
                    <span className="font-mono text-[11px] text-slate-400">{gf.centerLat.toFixed(3)}, {gf.centerLng.toFixed(3)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      gisEngine.toggleGeofenceStatus(gf.id);
                      refreshData();
                    }}
                    className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    Toggle {gf.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                  </button>

                  <span className="text-[10px] text-slate-500">Raycast Engine Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTELLIGENT ROUTING */}
      {activeTab === 'routes' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-400" />
              Intelligent Route Engine & Deviation Detection
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Calculates home-to-school routes, bus paths, safe walking corridors, and emergency bypass polylines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {routes.map((rt) => (
              <div key={rt.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 block">{rt.id} • {rt.type.replace(/_/g, ' ').toUpperCase()}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{rt.name}</h3>
                    <span className="text-slate-400 text-xs block">{rt.schoolName}</span>
                  </div>

                  {rt.hasDeviation && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                      Deviation Flagged
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Origin:</span>
                    <span className="font-semibold text-slate-200">{rt.originName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="font-semibold text-slate-200">{rt.destinationName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Distance</span>
                      <span className="font-mono text-emerald-400 font-bold">{rt.distanceKm} km</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Expected Time</span>
                      <span className="font-mono text-blue-300 font-bold">{rt.expectedTimeMins} mins</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => handleGenerateEmergencyRoute(rt.id)}
                    className="w-full py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 rounded text-xs font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
                    Compute Evacuation Bypass
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FLEET & WEARABLES */}
      {activeTab === 'fleet' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-purple-400" />
              Live Fleet Mapping & Learner Wearable Telemetry
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Active telemetry streaming for transport buses, technician vans, SAPS patrols, and learner panic badges.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">ID / Name</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Operator / Target</th>
                    <th className="p-3.5">Speed / Heading</th>
                    <th className="p-3.5">Battery</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {fleet.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-white">{item.name}</td>
                      <td className="p-3.5 text-slate-400 capitalize">{item.entityType.replace(/_/g, ' ')}</td>
                      <td className="p-3.5 text-slate-200">{item.assignedDriverOrTarget}</td>
                      <td className="p-3.5 font-mono text-emerald-400">{item.speedKmh} km/h • {item.headingDegrees}°</td>
                      <td className="p-3.5 font-mono text-amber-300">{item.batteryPct}%</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === 'EMERGENCY_SOS'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                            : item.status === 'MOVING'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleTriggerSOS(item.id)}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          Simulate Panic
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GEOSPATIAL ALERTS */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-rose-400" />
              Real-time Geospatial Alert & Incident Stream
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Automated triggers for safe zone breaches, unauthorized pickups, perimeter violations, and stationary anomalies.
            </p>
          </div>

          <div className="space-y-3">
            {alerts.map((alt) => (
              <div key={alt.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${
                    alt.severity === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-400">{alt.id} • {alt.timestamp}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        {alt.alertType}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1">{alt.subjectName} @ {alt.locationName}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{alt.actionTaken}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                    alt.status === 'ACTIVE' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {alt.status}
                  </span>

                  {alt.status === 'ACTIVE' && (
                    <button
                      onClick={() => handleResolveAlert(alt.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold transition-all"
                    >
                      Resolve Incident
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SPATIAL ANALYTICS HEATMAPS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Spatial Density Analytics & Risk Heatmaps
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Visual analytics for learner density, SOS cluster hotspots, transport bottlenecks, and response times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {heatmaps.map((hm) => (
              <div key={hm.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400">{hm.id} • {hm.category.toUpperCase()}</span>
                  <span className="font-mono text-xs font-bold text-emerald-400">Weight: {(hm.weight * 100).toFixed(0)}%</span>
                </div>

                <h3 className="text-sm font-bold text-white">{hm.label}</h3>
                <div className="text-slate-400 text-xs font-mono">Coordinates: {hm.lat.toFixed(4)}, {hm.lng.toFixed(4)}</div>

                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 h-full transition-all"
                    style={{ width: `${hm.weight * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: API LAYER INSPECTOR */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              GIS REST API Endpoint Tester
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Inspect backend geospatial API responses with RBAC enforcement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Select Endpoint to Query:</span>
              {[
                { endpoint: '/api/v1/maps', desc: 'Map providers & active layers' },
                { endpoint: '/api/v1/geofences', desc: 'Safety geofence collection' },
                { endpoint: '/api/v1/routes', desc: 'Intelligent routing polyline dataset' },
                { endpoint: '/api/v1/spatial', desc: 'Live fleet & wearable telemetry' },
                { endpoint: '/api/v1/heatmaps', desc: 'Spatial density heatmap weight points' }
              ].map((item) => (
                <button
                  key={item.endpoint}
                  onClick={() => handleTestApi(item.endpoint)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                    apiEndpoint === item.endpoint
                      ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 font-semibold'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-mono text-emerald-400">{item.endpoint}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-xl font-mono text-xs text-emerald-400 space-y-2 overflow-x-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                <span>GET {apiEndpoint}</span>
                <span>HTTP 200 OK</span>
              </div>

              {apiLoading ? (
                <div className="p-8 text-center text-slate-500">Querying GIS API...</div>
              ) : apiResponse ? (
                <pre className="text-xs text-emerald-300 whitespace-pre-wrap">{JSON.stringify(apiResponse, null, 2)}</pre>
              ) : (
                <div className="p-8 text-center text-slate-500">Select an endpoint on the left to inspect the API output.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: GIS CERTIFICATION & READINESS REPORT */}
      {activeTab === 'readiness' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  GIS Platform Certification
                </span>
                <span className="text-slate-400 text-xs font-mono">Software Readiness 98%</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Geospatial Platform Certification & Dependency Audit</h2>
              <p className="text-slate-400 text-xs mt-1">
                Clearly separating software functionality from required production cloud API keys, GIS datasets, and hardware gateway bindings.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <span className="text-slate-400 text-xs block">Overall Software Complete</span>
              <span className="text-2xl font-bold text-emerald-400">{report.softwareCompletePct}%</span>
            </div>
          </div>

          <div className="space-y-3">
            {report.checklist.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {item.title}
                  </h3>
                  <p className="text-slate-400">{item.notes}</p>
                </div>

                <span className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap self-start sm:self-auto ${
                  item.status === 'COMPLETE'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : item.status === 'REQUIRES_KEY'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}>
                  {item.status.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
