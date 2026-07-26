export type EnvironmentMode = 'development' | 'staging' | 'production';

export interface EnvironmentConfig {
  mode: EnvironmentMode;
  isProduction: boolean;
  isStaging: boolean;
  isDevelopment: boolean;
  primaryDomain: string;
  govDomain: string;
  activeDomain: string;
  apiBaseUrl: string;
  wsTelemetryUrl: string;
  database: {
    sslRequired: boolean;
    maxConnections: number;
    idleTimeoutMs: number;
  };
  redis: {
    enabled: boolean;
    ttlSeconds: number;
  };
  featureFlags: {
    enableDemoMode: boolean;
    enableSapsDispatch: boolean;
    enableOfflineMesh: boolean;
    enableMaintenanceMode: boolean;
    enableDebugConsole: boolean;
  };
  security: {
    enableMtls: boolean;
    popiaDataEncryption: boolean;
    jwtExpiryMinutes: number;
    sessionTimeoutMinutes: number;
  };
}

// Auto-detect environment based on hostname or environment variable
function detectEnvironment(): EnvironmentMode {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host.includes('itis.gov.za') || host.includes('itis.co.za') || host.includes('run.app')) {
      return 'production';
    }
    if (host.includes('staging') || host.includes('vercel.app')) {
      return 'staging';
    }
  }
  const nodeEnv = (import.meta as any).env?.VITE_NODE_ENV || 'production';
  return nodeEnv as EnvironmentMode;
}

const currentMode = detectEnvironment();

export const environmentConfig: EnvironmentConfig = {
  mode: currentMode,
  isProduction: currentMode === 'production',
  isStaging: currentMode === 'staging',
  isDevelopment: currentMode === 'development',
  primaryDomain: (import.meta as any).env?.VITE_PRIMARY_DOMAIN || 'https://itis.co.za',
  govDomain: (import.meta as any).env?.VITE_GOV_DOMAIN || 'https://itis.gov.za',
  activeDomain: typeof window !== 'undefined' ? window.location.origin : 'https://itis.co.za',
  apiBaseUrl: (import.meta as any).env?.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin + '/api' : 'https://api.itis.co.za'),
  wsTelemetryUrl: (import.meta as any).env?.VITE_WS_TELEMETRY_URL || 'wss://telemetry.itis.co.za',
  database: {
    sslRequired: currentMode !== 'development',
    maxConnections: currentMode === 'production' ? 50 : 10,
    idleTimeoutMs: 30000,
  },
  redis: {
    enabled: true,
    ttlSeconds: 3600,
  },
  featureFlags: {
    enableDemoMode: true,
    enableSapsDispatch: true,
    enableOfflineMesh: true,
    enableMaintenanceMode: (import.meta as any).env?.VITE_FEATURE_ENABLE_MAINTENANCE_MODE === 'true',
    enableDebugConsole: currentMode === 'development',
  },
  security: {
    enableMtls: true,
    popiaDataEncryption: true,
    jwtExpiryMinutes: 60,
    sessionTimeoutMinutes: 30,
  }
};

/**
 * Domain Switcher Helper for Migration from itis.co.za -> itis.gov.za
 */
export function getDomainInfo() {
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'itis.co.za';
  const isGovDomain = currentHost.endsWith('.gov.za');
  return {
    currentHost,
    isGovDomain,
    targetGovUrl: `https://itis.gov.za`,
    targetCommercialUrl: `https://itis.co.za`,
    sslCertificateStatus: 'X.509 Wildcard SAN Active (TLS 1.3)',
    corsOrigins: ['https://itis.co.za', 'https://itis.gov.za', 'https://app.itis.co.za', 'http://localhost:3000']
  };
}
