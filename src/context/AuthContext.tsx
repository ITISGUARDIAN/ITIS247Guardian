import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, USER_ROLE_REDIRECTS } from '../data/authData';
import { itisApiClient, AuthTokens } from '../lib/api-client';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  province?: string;
  schoolName?: string;
  tenantId?: string;
  permissions: string[];
  mfaVerified: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; targetTab?: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  clearError: () => void;
  getTargetTabForRole: (role: UserRole) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode; onTabRedirect?: (tab: string) => void }> = ({ children, onTabRedirect }) => {
  const [user, setUser] = useState<AuthUser | null>({
    id: 'usr-104928',
    email: 'parent.mokoena@itis.gov.za',
    firstName: 'Thabo',
    lastName: 'Mokoena',
    role: 'PARENT',
    province: 'Gauteng',
    schoolName: 'Diepkloof Primary School',
    tenantId: 'TNT-GP-001',
    permissions: USER_ROLE_REDIRECTS.PARENT.defaultPermissions,
    mfaVerified: true,
  });

  const [tokens, setTokens] = useState<AuthTokens | null>(itisApiClient.getAuthTokens());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Sync tokens with itisApiClient
    if (tokens) {
      itisApiClient.setAuthTokens(tokens);
    }
  }, [tokens]);

  const getTargetTabForRole = (role: UserRole): string => {
    switch (role) {
      case 'PARENT':
        return 'parentportal';
      case 'SCHOOL_ADMIN':
      case 'TEACHER':
        return 'schoolportal';
      case 'COMMAND_OPERATOR':
        return 'c3command';
      case 'NATIONAL_ADMIN':
      case 'PROVINCIAL_ADMIN':
        return 'natgov';
      case 'DEVICE_TECHNICIAN':
        return 'fieldtech';
      case 'EMERGENCY_PARTNER':
        return 'responderapp';
      case 'SYSTEM_ADMIN':
      case 'READONLY_AUDITOR':
      default:
        return 'execcabinet';
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; targetTab?: string }> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();

      if (res.ok && data.status === 'SUCCESS') {
        const userRole: UserRole = data.user?.role || (email.includes('admin') ? 'SYSTEM_ADMIN' : 'PARENT');
        
        const loggedUser: AuthUser = {
          id: data.user?.id || 'usr-104928',
          email,
          firstName: data.user?.firstName || 'Thabo',
          lastName: data.user?.lastName || 'Mokoena',
          role: userRole,
          province: 'Gauteng',
          schoolName: 'Diepkloof Primary School',
          tenantId: 'TNT-GP-001',
          permissions: USER_ROLE_REDIRECTS[userRole]?.defaultPermissions || ['*.*'],
          mfaVerified: true,
        };

        const newTokens: AuthTokens = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresInSeconds: data.expiresInSeconds || 28800,
          tokenType: 'Bearer',
          userRole,
          tenantId: 'TNT-GP-001',
        };

        setUser(loggedUser);
        setTokens(newTokens);
        itisApiClient.setAuthTokens(newTokens);

        const targetTab = getTargetTabForRole(userRole);
        if (onTabRedirect) {
          onTabRedirect(targetTab);
        }

        setIsLoading(false);
        return { success: true, targetTab };
      } else {
        setError(data.message || 'Authentication failed');
        setIsLoading(false);
        return { success: false };
      }
    } catch (err: any) {
      setError(err.message || 'Network error connecting to live auth server');
      setIsLoading(false);
      return { success: false };
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    setUser(null);
    setTokens(null);
    setIsLoading(false);
  };

  const refreshToken = async (): Promise<boolean> => {
    if (!tokens?.refreshToken) return false;
    try {
      const res = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });
      const data = await res.json();
      if (res.ok && data.accessToken) {
        const updatedTokens: AuthTokens = {
          ...tokens,
          accessToken: data.accessToken,
        };
        setTokens(updatedTokens);
        itisApiClient.setAuthTokens(updatedTokens);
        return true;
      }
    } catch (err) {
      setUser(null);
      setTokens(null);
    }
    return false;
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        refreshToken,
        clearError,
        getTargetTabForRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
