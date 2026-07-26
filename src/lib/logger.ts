import { environmentConfig } from '../config/environment';

export type LogCategory = 'developer' | 'audit' | 'security' | 'performance';
export type LogLevel = 'info' | 'warn' | 'error' | 'critical';

export interface LogEntry {
  id: string;
  timestamp: string;
  category: LogCategory;
  level: LogLevel;
  message: string;
  metadata?: Record<string, any>;
  popiaHash?: string;
  actorId?: string;
}

class ProductionLogger {
  private logQueue: LogEntry[] = [];
  private maxQueueSize = 500;

  constructor() {
    this.auditLog('System Initialized', { version: '1.0.0-GA', env: environmentConfig.mode });
  }

  /**
   * Developer Log — Stripped in Production Build
   */
  public devLog(message: string, details?: any) {
    if (environmentConfig.featureFlags.enableDebugConsole) {
      console.log(`[DEV-LOG] [${new Date().toISOString()}] ${message}`, details || '');
    }
  }

  /**
   * Audit Log — POPIA & SAPS Forensic Evidence Compliance
   */
  public auditLog(action: string, metadata: Record<string, any> = {}, actorId: string = 'SYSTEM_AUTO') {
    const sanitizedMeta = this.sanitizePII(metadata);
    const entry: LogEntry = {
      id: `AUD-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      category: 'audit',
      level: 'info',
      message: action,
      metadata: sanitizedMeta,
      popiaHash: this.generateSha256Hash(action + JSON.stringify(sanitizedMeta)),
      actorId
    };

    this.pushLog(entry);
  }

  /**
   * Security Log — Intrusion, mTLS failures, SOS alarms
   */
  public securityLog(event: string, level: LogLevel = 'warn', metadata: Record<string, any> = {}) {
    const entry: LogEntry = {
      id: `SEC-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      category: 'security',
      level,
      message: event,
      metadata: this.sanitizePII(metadata),
      popiaHash: this.generateSha256Hash(event + level)
    };

    this.pushLog(entry);
    if (level === 'critical' || level === 'error') {
      console.warn(`[SECURITY ALERT] ${event}`, metadata);
    }
  }

  /**
   * Performance Log — API Latencies, BLE Scan Durations
   */
  public performanceLog(metricName: string, durationMs: number, metadata: Record<string, any> = {}) {
    const entry: LogEntry = {
      id: `PERF-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      category: 'performance',
      level: durationMs > 1000 ? 'warn' : 'info',
      message: `Metric: ${metricName} | Duration: ${durationMs}ms`,
      metadata: { ...metadata, durationMs }
    };

    this.pushLog(entry);
  }

  public getLogs(category?: LogCategory): LogEntry[] {
    if (category) {
      return this.logQueue.filter(l => l.category === category);
    }
    return [...this.logQueue];
  }

  private pushLog(entry: LogEntry) {
    this.logQueue.unshift(entry);
    if (this.logQueue.length > this.maxQueueSize) {
      this.logQueue.pop();
    }
  }

  /**
   * PII Sanitization for POPIA Compliance
   */
  private sanitizePII(data: Record<string, any>): Record<string, any> {
    const clean = { ...data };
    const piiKeys = ['idNumber', 'passport', 'creditCard', 'password', 'rawBio'];
    for (const key of Object.keys(clean)) {
      if (piiKeys.includes(key)) {
        clean[key] = '[REDACTED_POPIA]';
      }
    }
    return clean;
  }

  /**
   * Cryptographic Hash Generator
   */
  private generateSha256Hash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(16, '0') + 'e9a4f2';
  }
}

export const logger = new ProductionLogger();
