import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// Custom metrics for SRE and Performance observability
export const telemetryLatency = new Trend('telemetry_ingest_duration_ms');
export const incidentFetchLatency = new Trend('incident_fetch_duration_ms');
export const errorRate = new Rate('http_error_rate');
export const totalRequests = new Counter('total_processed_requests');

export const options = {
  scenarios: {
    telemetry_burst: {
      executor: 'ramping-arrival-rate',
      startRate: 500,
      timeUnit: '1s',
      preAllocatedVUs: 1000,
      maxVUs: 5000,
      stages: [
        { duration: '1m', target: 5000 },  // Ramp up
        { duration: '5m', target: 25000 }, // Peak load
        { duration: '2m', target: 5000 },  // Ramp down
      ],
    },
    incident_query_stress: {
      executor: 'constant-vus',
      vus: 500,
      duration: '5m',
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.001'],         // Less than 0.1% errors
    http_req_duration: ['p(95)<50', 'p(99)<100'], // 95% of requests under 50ms
    telemetry_ingest_duration_ms: ['p(95)<30'],
    incident_fetch_duration_ms: ['p(95)<20'],
  },
};

const BASE_URL = __ENV.API_BASE_URL || 'https://itis.internal.api';
const BEARER_TOKEN = __ENV.JWT_TEST_TOKEN || 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.testToken';

export default function () {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'X-Tenant-ID': 'TNT-UK-NATIONAL-01',
  };

  // Test 1: Telemetry Ingestion Burst
  const telemetryPayload = JSON.stringify({
    deviceId: 'ITIS-DEV-8842',
    timestamp: new Date().toISOString(),
    heartRate: 72 + Math.floor(Math.random() * 10),
    latitude: 51.5074,
    longitude: -0.1278,
    batteryPercent: 94,
    signature: '3045022100a892b1...',
  });

  const res1 = http.post(`${BASE_URL}/api/v1/telemetry/ingest`, telemetryPayload, { headers });
  telemetryLatency.add(res1.timings.duration);
  totalRequests.add(1);

  const check1 = check(res1, {
    'telemetry status is 200/202': (r) => r.status === 200 || r.status === 202,
  });
  errorRate.add(!check1);

  sleep(0.1);

  // Test 2: Incident Retrieval with Redis Caching
  const res2 = http.get(`${BASE_URL}/api/v1/incidents/active`, { headers });
  incidentFetchLatency.add(res2.timings.duration);
  totalRequests.add(1);

  const check2 = check(res2, {
    'incidents status is 200': (r) => r.status === 200,
    'response time < 30ms': (r) => r.timings.duration < 30,
  });
  errorRate.add(!check2);

  sleep(0.2);
}
