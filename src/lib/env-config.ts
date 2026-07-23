export type EnvironmentMode = 'development' | 'testing' | 'staging' | 'production';

export interface EnvironmentConfig {
  mode: EnvironmentMode;
  apiBaseUrl: string;
  wsUrl: string;
  authServerUrl: string;
  mtlsEnabled: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableOfflineFallback: boolean;
  timeoutMs: number;
}

export const ENV_CONFIGS: Record<EnvironmentMode, EnvironmentConfig> = {
  development: {
    mode: 'development',
    apiBaseUrl: 'http://localhost:3000/api/v1',
    wsUrl: 'ws://localhost:3000/ws',
    authServerUrl: 'http://localhost:3000/api/v1/auth',
    mtlsEnabled: false,
    logLevel: 'debug',
    enableOfflineFallback: true,
    timeoutMs: 5000,
  },
  testing: {
    mode: 'testing',
    apiBaseUrl: 'https://test-api.itis.gov.za/api/v1',
    wsUrl: 'wss://test-api.itis.gov.za/ws',
    authServerUrl: 'https://test-auth.itis.gov.za/api/v1/auth',
    mtlsEnabled: true,
    logLevel: 'info',
    enableOfflineFallback: true,
    timeoutMs: 8000,
  },
  staging: {
    mode: 'staging',
    apiBaseUrl: 'https://staging-api.itis.gov.za/api/v1',
    wsUrl: 'wss://staging-api.itis.gov.za/ws',
    authServerUrl: 'https://staging-auth.itis.gov.za/api/v1/auth',
    mtlsEnabled: true,
    logLevel: 'info',
    enableOfflineFallback: true,
    timeoutMs: 10000,
  },
  production: {
    mode: 'production',
    apiBaseUrl: 'https://api.itis.gov.za/api/v1',
    wsUrl: 'wss://api.itis.gov.za/ws',
    authServerUrl: 'https://auth.itis.gov.za/api/v1/auth',
    mtlsEnabled: true,
    logLevel: 'error',
    enableOfflineFallback: true,
    timeoutMs: 10000,
  },
};

let currentEnvironment: EnvironmentMode = 'production';

export function getCurrentEnv(): EnvironmentConfig {
  return ENV_CONFIGS[currentEnvironment];
}

export function setEnvironment(env: EnvironmentMode): EnvironmentConfig {
  currentEnvironment = env;
  return ENV_CONFIGS[currentEnvironment];
}
