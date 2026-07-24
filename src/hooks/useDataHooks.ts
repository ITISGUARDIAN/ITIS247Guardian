import { useState, useEffect, useCallback, useRef } from 'react';
import { itisApiClient, ApiResponse } from '../lib/api-client';
import { itisWebSocketHub, WsChannel } from '../lib/websocket-hub';

export interface UseApiOptions {
  autoRefreshIntervalMs?: number; // Automatic polling interval
  enableWebSocketSync?: boolean;
  wsChannel?: WsChannel;
  initialParams?: Record<string, any>;
}

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  statusCode: number;
  isEmpty: boolean;
  refetch: () => Promise<void>;
  lastUpdated: string | null;
}

// Internal cache memory store to retain state across tab navigation
const apiCacheStore: Map<string, { data: any; timestamp: string }> = new Map();

/**
 * Base generic hook for API data fetching with polling, caching, WS synchronization and error handling
 */
export function useApiData<T>(
  endpoint: string,
  options: UseApiOptions = {}
): UseApiResult<T> {
  const {
    autoRefreshIntervalMs = 10000,
    enableWebSocketSync = true,
    wsChannel,
    initialParams = {}
  } = options;

  const [data, setData] = useState<T | null>(() => {
    const cached = apiCacheStore.get(endpoint);
    return cached ? cached.data : null;
  });
  const [loading, setLoading] = useState<boolean>(!apiCacheStore.has(endpoint));
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number>(200);
  const [lastUpdated, setLastUpdated] = useState<string | null>(() => {
    const cached = apiCacheStore.get(endpoint);
    return cached ? cached.timestamp : null;
  });

  const paramsRef = useRef(initialParams);
  paramsRef.current = initialParams;

  const fetchData = useCallback(async () => {
    setLoading((prev) => (data ? false : true));
    try {
      // Build query string if initialParams provided
      const queryParts: string[] = [];
      Object.entries(paramsRef.current).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          queryParts.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
        }
      });
      const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';
      const fullEndpoint = `${endpoint}${queryString}`;

      const res: ApiResponse<any> = await itisApiClient.request<T>(fullEndpoint, 'GET');

      if (res.success && res.data) {
        // Normalize payload format whether backend returns { data: [...] } or array
        let resultData = res.data;
        if (res.data.data !== undefined) resultData = res.data.data;
        else if (res.data.records !== undefined) resultData = res.data.records;
        else if (res.data.incidents !== undefined) resultData = res.data.incidents;
        else if (res.data.activeIncidents !== undefined) resultData = res.data.activeIncidents;
        else if (res.data.schools !== undefined) resultData = res.data.schools;
        else if (res.data.devices !== undefined) resultData = res.data.devices;
        else if (res.data.activeDevices !== undefined) resultData = res.data.activeDevices;
        else if (res.data.parents !== undefined) resultData = res.data.parents;
        else if (res.data.notifications !== undefined) resultData = res.data.notifications;
        else if (res.data.metrics !== undefined) resultData = res.data.metrics;
        else if (res.data.logs !== undefined) resultData = res.data.logs;
        else if (res.data.telemetry !== undefined) resultData = res.data.telemetry;
        else if (res.data.healthSummary !== undefined) resultData = res.data;

        setData(resultData);
        setError(null);
        setStatusCode(200);
        const nowStr = new Date().toLocaleTimeString();
        setLastUpdated(nowStr);
        apiCacheStore.set(endpoint, { data: resultData, timestamp: nowStr });
      } else {
        setStatusCode(res.statusCode || 500);
        setError(res.error?.message || 'Failed to communicate with live NestJS backend API.');
      }
    } catch (err: any) {
      setStatusCode(500);
      setError(err.message || 'Network exception while connecting to live backend API.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();

    let intervalId: NodeJS.Timeout | null = null;
    if (autoRefreshIntervalMs > 0) {
      intervalId = setInterval(fetchData, autoRefreshIntervalMs);
    }

    let unsubscribeWs: (() => void) | null = null;
    if (enableWebSocketSync && wsChannel) {
      unsubscribeWs = itisWebSocketHub.subscribe(wsChannel, (_msg) => {
        fetchData();
      });
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (unsubscribeWs) unsubscribeWs();
    };
  }, [fetchData, autoRefreshIntervalMs, enableWebSocketSync, wsChannel]);

  const isEmpty = !loading && !error && (!data || (Array.isArray(data) && data.length === 0));

  return {
    data,
    loading,
    error,
    statusCode,
    isEmpty,
    refetch: fetchData,
    lastUpdated
  };
}

// 1. USE LEARNERS HOOK
export function useLearners(params?: { search?: string; schoolId?: string }) {
  return useApiData<any[]>('/learners', {
    autoRefreshIntervalMs: 12000,
    enableWebSocketSync: true,
    wsChannel: 'attendance',
    initialParams: params
  });
}

// 2. USE INCIDENTS HOOK
export function useIncidents() {
  return useApiData<any[]>('/incidents', {
    autoRefreshIntervalMs: 5000,
    enableWebSocketSync: true,
    wsChannel: 'incidents'
  });
}

// 3. USE ATTENDANCE HOOK
export function useAttendance() {
  return useApiData<any>('/attendance', {
    autoRefreshIntervalMs: 6000,
    enableWebSocketSync: true,
    wsChannel: 'attendance'
  });
}

// 4. USE TELEMETRY HOOK
export function useTelemetry() {
  return useApiData<any>('/iot/telemetry/live', {
    autoRefreshIntervalMs: 3000,
    enableWebSocketSync: true,
    wsChannel: 'telemetry'
  });
}

// 5. USE SCHOOLS HOOK
export function useSchools(params?: { search?: string }) {
  return useApiData<any[]>('/schools', {
    autoRefreshIntervalMs: 15000,
    initialParams: params
  });
}

// 6. USE DEVICES HOOK
export function useDevices(params?: { search?: string }) {
  return useApiData<any[]>('/iot/devices', {
    autoRefreshIntervalMs: 8000,
    enableWebSocketSync: true,
    wsChannel: 'devices',
    initialParams: params
  });
}

// 6b. USE DEVICE HEALTH HOOK
export function useDeviceHealth() {
  return useApiData<any>('/iot/device-health', {
    autoRefreshIntervalMs: 8000,
    enableWebSocketSync: true,
    wsChannel: 'devices'
  });
}

// 7. USE PARENTS HOOK
export function useParents(params?: { search?: string }) {
  return useApiData<any[]>('/parents', {
    autoRefreshIntervalMs: 15000,
    initialParams: params
  });
}

// 8. USE NOTIFICATIONS HOOK
export function useNotifications() {
  return useApiData<any[]>('/notifications', {
    autoRefreshIntervalMs: 6000,
    enableWebSocketSync: true,
    wsChannel: 'notifications'
  });
}

// 9. USE EXECUTIVE METRICS HOOK
export function useExecutiveMetrics() {
  return useApiData<any>('/executive/metrics', {
    autoRefreshIntervalMs: 10000,
    enableWebSocketSync: true,
    wsChannel: 'telemetry'
  });
}

// 10. USE AUDIT LOGS HOOK
export function useAuditLogs() {
  return useApiData<any[]>('/audit-logs', {
    autoRefreshIntervalMs: 10000
  });
}
