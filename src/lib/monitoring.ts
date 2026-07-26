import { logger } from './logger';
import { environmentConfig } from '../config/environment';

export interface HealthStatus {
  status: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
  uptimeSeconds: number;
  timestamp: string;
  checks: {
    database: { status: 'UP' | 'DOWN'; latencyMs: number };
    redis: { status: 'UP' | 'DOWN'; latencyMs: number };
    apiGateway: { status: 'UP' | 'DOWN'; latencyMs: number };
    sapsDispatch: { status: 'UP' | 'DOWN'; latencyMs: number };
    wsTelemetry: { status: 'UP' | 'DOWN'; latencyMs: number };
  };
  webVitals: {
    fid: number; // First Input Delay (ms)
    lcp: number; // Largest Contentful Paint (ms)
    cls: number; // Cumulative Layout Shift
    ttfb: number; // Time to First Byte (ms)
  };
}

class MonitoringService {
  private startTime = Date.now();

  /**
   * Run Synthetic Health Probe Across Infrastructure Stack
   */
  public async runHealthCheck(): Promise<HealthStatus> {
    const uptimeSeconds = Math.floor((Date.now() - this.startTime) / 1000);

    // Simulated latency checks
    const dbLatency = Math.floor(Math.random() * 12 + 8); // 8-20ms
    const redisLatency = Math.floor(Math.random() * 4 + 2); // 2-6ms
    const apiLatency = Math.floor(Math.random() * 25 + 15); // 15-40ms
    const sapsLatency = Math.floor(Math.random() * 35 + 20); // 20-55ms
    const wsLatency = Math.floor(Math.random() * 10 + 5);

    const checks = {
      database: { status: 'UP' as const, latencyMs: dbLatency },
      redis: { status: 'UP' as const, latencyMs: redisLatency },
      apiGateway: { status: 'UP' as const, latencyMs: apiLatency },
      sapsDispatch: { status: 'UP' as const, latencyMs: sapsLatency },
      wsTelemetry: { status: 'UP' as const, latencyMs: wsLatency },
    };

    const isAllHealthy = Object.values(checks).every(c => c.status === 'UP');

    const healthStatus: HealthStatus = {
      status: isAllHealthy ? 'HEALTHY' : 'DEGRADED',
      uptimeSeconds,
      timestamp: new Date().toISOString(),
      checks,
      webVitals: {
        fid: 8,
        lcp: 820,
        cls: 0.02,
        ttfb: 110,
      }
    };

    logger.performanceLog('Synthetic Health Check Completed', apiLatency, checks);
    return healthStatus;
  }

  /**
   * Capture Uncaught Application Error (Sentry / Crash Reporting Adapter)
   */
  public captureException(error: Error, context?: Record<string, any>) {
    logger.securityLog(`Uncaught App Exception: ${error.message}`, 'error', {
      stack: error.stack,
      context,
      environment: environmentConfig.mode
    });

    if ((import.meta as any).env?.VITE_SENTRY_DSN) {
      // Stub for Sentry.captureException(error);
    }
  }
}

export const monitoringService = new MonitoringService();
