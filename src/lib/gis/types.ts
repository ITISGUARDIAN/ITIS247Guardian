export type MapProvider = 'open_street_map' | 'google_maps' | 'mapbox' | 'offline_tile_server';

export type MapLayerType = 'vector' | 'satellite' | 'terrain' | 'infrared_heatmap' | 'geofences' | 'fleet_telemetry';

export type GeofenceType = 
  | 'school_boundary' 
  | 'bus_loading_zone' 
  | 'safe_walking_corridor' 
  | 'parent_pickup' 
  | 'staff_only' 
  | 'assembly_point';

export type GeofenceGeometry = 'polygon' | 'circle' | 'corridor';

export interface GeofenceItem {
  id: string;
  name: string;
  type: GeofenceType;
  geometry: GeofenceGeometry;
  schoolName: string;
  centerLat: number;
  centerLng: number;
  radiusMeters?: number;
  polygonPoints?: [number, number][]; // [lat, lng]
  corridorWidthMeters?: number;
  status: 'ACTIVE' | 'DISABLED' | 'MAINTENANCE';
  riskLevel: 'SAFE' | 'CONTROLLED' | 'RESTRICTED' | 'HIGH_RISK';
  activeMonitoredCount: number;
}

export type RouteType = 'bus_route' | 'safe_walking' | 'home_to_school' | 'emergency_evacuation';

export interface IntelligentRoute {
  id: string;
  name: string;
  type: RouteType;
  schoolName: string;
  originName: string;
  destinationName: string;
  distanceKm: number;
  expectedTimeMins: number;
  waypoints: [number, number][];
  activeVehiclesCount: number;
  hasDeviation: boolean;
  riskFactor: 'LOW' | 'MEDIUM' | 'ELEVATED';
}

export type FleetEntityType = 'school_bus' | 'technician_van' | 'saps_patrol' | 'learner_wearable';

export interface FleetTelemetryItem {
  id: string;
  name: string;
  entityType: FleetEntityType;
  assignedDriverOrTarget: string;
  lat: number;
  lng: number;
  speedKmh: number;
  headingDegrees: number;
  batteryPct: number;
  status: 'MOVING' | 'STOPPED' | 'DELAYED' | 'EMERGENCY_SOS';
  routeId?: string;
  lastPingTime: string;
  signalQuality: 'EXCELLENT' | 'GOOD' | 'WEAK' | 'DEGRADED';
}

export interface GeospatialAlert {
  id: string;
  timestamp: string;
  alertType: 
    | 'SAFE_ZONE_BREACH' 
    | 'ROUTE_DEVIATION' 
    | 'UNAUTHORIZED_PICKUP' 
    | 'PERIMETER_BREACH' 
    | 'DEVICE_STATIONARY' 
    | 'HOTSPOT_ELEVATED';
  severity: 'low' | 'medium' | 'high' | 'critical';
  subjectName: string;
  locationName: string;
  lat: number;
  lng: number;
  status: 'ACTIVE' | 'DISPATCHED' | 'RESOLVED';
  actionTaken: string;
}

export interface SpatialHeatmapPoint {
  id: string;
  lat: number;
  lng: number;
  weight: number; // 0.1 to 1.0
  category: 'attendance' | 'sos' | 'delay' | 'high_risk' | 'density';
  label: string;
}

export interface GisReadinessReport {
  softwareCompletePct: number;
  checklist: {
    title: string;
    status: 'COMPLETE' | 'REQUIRES_KEY' | 'REQUIRES_GIS_DATA' | 'PENDING_TELEMETRY';
    notes: string;
  }[];
}
