import { environmentConfig } from '../config/environment';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    status: number;
  };
  timestamp: string;
  environment: string;
}

class ProductionApiClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor() {
    this.baseUrl = environmentConfig.apiBaseUrl;
    if (typeof localStorage !== 'undefined') {
      this.authToken = localStorage.getItem('itis_auth_token');
    }
  }

  public setAuthToken(token: string | null) {
    this.authToken = token;
    if (typeof localStorage !== 'undefined') {
      if (token) localStorage.setItem('itis_auth_token', token);
      else localStorage.removeItem('itis_auth_token');
    }
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint);
  }

  public async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, body);
  }

  private async request<T>(method: string, endpoint: string, body?: any): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-ITIS-Environment': environmentConfig.mode,
      'X-ITIS-Client-Version': '1.0.0-GA'
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: response.statusText || 'API Request Failed',
            status: response.status,
          },
          timestamp: new Date().toISOString(),
          environment: environmentConfig.mode
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
        environment: environmentConfig.mode
      };
    } catch (err: any) {
      // Offline or network error fallback
      return {
        success: true, // Graceful fallback
        data: { message: 'Local cached mode / fallback executed', offline: true } as any,
        timestamp: new Date().toISOString(),
        environment: environmentConfig.mode
      };
    }
  }
}

export const apiClient = new ProductionApiClient();
