import { 
  PerformancePosture, 
  LatencyMetric, 
  DatabaseQueryOptimization, 
  LoadTestScenario, 
  CircuitBreaker, 
  CacheLayerMetrics 
} from '../types';

export const initialPerformancePosture: PerformancePosture = {
  overallPerformanceScore: 98,
  databaseEfficiencyScore: 99,
  frontendPerformanceScore: 97,
  mobilePerformanceScore: 96,
  streamingPerformanceScore: 98,
  loadTestReadinessScore: 100,
  avgP95LatencyMs: 18.4,
  globalCacheHitRatioPercent: 94.2,
  sseThroughputEventsPerSec: 12500,
  wsConnectedSockets: 45000,
  mobileColdStartMs: 380,
  mobileFrameDropPercent: 0.2,
};

export const latencyMetrics: LatencyMetric[] = [
  {
    endpoint: 'GET /api/v1/incidents/active',
    p50Ms: 4.2,
    p95Ms: 12.1,
    p99Ms: 24.5,
    requestsPerSec: 3200,
    cacheHitRatioPercent: 96.8,
    status: 'OPTIMAL'
  },
  {
    endpoint: 'POST /api/v1/telemetry/ingest',
    p50Ms: 6.8,
    p95Ms: 18.5,
    p99Ms: 35.0,
    requestsPerSec: 14500,
    cacheHitRatioPercent: 88.4,
    status: 'OPTIMAL'
  },
  {
    endpoint: 'GET /api/v1/analytics/dashboard-summary',
    p50Ms: 12.0,
    p95Ms: 28.4,
    p99Ms: 48.2,
    requestsPerSec: 850,
    cacheHitRatioPercent: 98.1,
    status: 'OPTIMAL'
  },
  {
    endpoint: 'POST /api/v1/evidence/upload-presigned-url',
    p50Ms: 8.5,
    p95Ms: 21.0,
    p99Ms: 42.0,
    requestsPerSec: 420,
    cacheHitRatioPercent: 91.5,
    status: 'OPTIMAL'
  },
  {
    endpoint: 'WS /ws/v1/dispatch-feed',
    p50Ms: 1.8,
    p95Ms: 5.2,
    p99Ms: 9.8,
    requestsPerSec: 28000,
    cacheHitRatioPercent: 99.2,
    status: 'OPTIMAL'
  }
];

export const databaseOptimizations: DatabaseQueryOptimization[] = [
  {
    queryId: 'DB-OPT-01',
    table: 'telemetry_readings (TimescaleDB)',
    operation: 'INSERT',
    executionTimePreOptMs: 142.0,
    executionTimePostOptMs: 3.2,
    improvementMultiplier: '44.3x speedup',
    indexApplied: 'TimescaleDB Hypertable chunk_time_interval (1 hour) + GIS spatial index',
    notes: 'Batch ingestion pipeline with copyFrom protocol & prepared connection pool.'
  },
  {
    queryId: 'DB-OPT-02',
    table: 'incidents',
    operation: 'SELECT',
    executionTimePreOptMs: 88.5,
    executionTimePostOptMs: 2.1,
    improvementMultiplier: '42.1x speedup',
    indexApplied: 'Compound Index on (tenant_id, status, created_at DESC)',
    notes: 'Eliminated full table scans for active incident dispatch listings.'
  },
  {
    queryId: 'DB-OPT-03',
    table: 'responder_locations (PostGIS)',
    operation: 'JOIN / AGGREGATE',
    executionTimePreOptMs: 210.0,
    executionTimePostOptMs: 5.4,
    improvementMultiplier: '38.8x speedup',
    indexApplied: 'GiST Spatial Index on location_geometry + ST_DWithin bounding box',
    notes: 'Optimized nearest-responder spatial lookup within 5km radius.'
  },
  {
    queryId: 'DB-OPT-04',
    table: 'audit_logs',
    operation: 'INSERT',
    executionTimePreOptMs: 45.0,
    executionTimePostOptMs: 1.8,
    improvementMultiplier: '25.0x speedup',
    indexApplied: 'Asynchronous write buffer with Redis stream queue batching',
    notes: 'Decoupled synchronous DB writes using worker pool queue.'
  }
];

export const loadTestScenarios: LoadTestScenario[] = [
  {
    id: 'K6-SCENARIO-01',
    name: 'High-Volume Incident Telemetry Burst Test',
    targetUsersVUs: 10000,
    duration: '10m 00s',
    targetRps: 25000,
    p95ThresholdMs: 50,
    maxErrorRatePercent: 0.1,
    lastRunStatus: 'PASSED',
    summary: 'Sustained 25,000 req/sec telemetry stream with 0.02% error rate and 18.4ms P95 latency.'
  },
  {
    id: 'K6-SCENARIO-02',
    name: 'WebSocket Concurrent Responder Dispatch Fanout',
    targetUsersVUs: 50000,
    duration: '15m 00s',
    targetRps: 50000,
    p95ThresholdMs: 20,
    maxErrorRatePercent: 0.05,
    lastRunStatus: 'PASSED',
    summary: 'Tested 50,000 concurrent WebSocket connections receiving broadcast emergency dispatches.'
  },
  {
    id: 'K6-SCENARIO-03',
    name: 'Mobile Offline Sync Re-connection Burst',
    targetUsersVUs: 15000,
    duration: '05m 00s',
    targetRps: 18000,
    p95ThresholdMs: 40,
    maxErrorRatePercent: 0.1,
    lastRunStatus: 'PASSED',
    summary: 'Simulated 15,000 mobile field devices reconnecting after network drop to sync cached sqlite changes.'
  },
  {
    id: 'K6-SCENARIO-04',
    name: 'Operations Support Centre Dashboard Multi-Tenant Stress',
    targetUsersVUs: 2500,
    duration: '08m 00s',
    targetRps: 5000,
    p95ThresholdMs: 30,
    maxErrorRatePercent: 0.0,
    lastRunStatus: 'PASSED',
    summary: '100% cache hit ratio on summary feeds with virtualized table rendering and zero frame drop.'
  }
];

export const circuitBreakers: CircuitBreaker[] = [
  {
    serviceName: 'External GIS Geocoding Gateway',
    state: 'CLOSED (HEALTHY)',
    failureThreshold: 5,
    currentFailures: 0,
    fallbackStrategy: 'Local PostGIS spatial cache fallback',
    lastTrippedTime: 'Never (Stable)'
  },
  {
    serviceName: 'Push Notification SMS Gateway',
    state: 'CLOSED (HEALTHY)',
    failureThreshold: 3,
    currentFailures: 0,
    fallbackStrategy: 'MQTT & In-App Emergency Broadcast queue',
    lastTrippedTime: 'Never (Stable)'
  },
  {
    serviceName: 'ClamAV Malware Virus Scanner Service',
    state: 'CLOSED (HEALTHY)',
    failureThreshold: 5,
    currentFailures: 0,
    fallbackStrategy: 'Quarantine bucket isolate & async queue retry',
    lastTrippedTime: 'Never (Stable)'
  }
];

export const cacheLayers: CacheLayerMetrics[] = [
  {
    layerName: 'L1 App Server LRU Memory Cache',
    technology: 'In-Memory (LRU L1)',
    hitRatioPercent: 96.5,
    totalKeys: 125000,
    memoryUsageMb: 256,
    evictionPolicy: 'Least Recently Used (LRU) - 500ms TTL'
  },
  {
    layerName: 'L2 Distributed Redis Cluster',
    technology: 'Redis Cluster (L2)',
    hitRatioPercent: 94.2,
    totalKeys: 1850000,
    memoryUsageMb: 2048,
    evictionPolicy: 'allkeys-lru with multi-tenant namespaces'
  },
  {
    layerName: 'L3 Edge CDN & Static Assets',
    technology: 'CDN Edge (L3)',
    hitRatioPercent: 99.1,
    totalKeys: 4500,
    memoryUsageMb: 512,
    evictionPolicy: 'Cache-Control max-age=31536000, immutable'
  }
];
