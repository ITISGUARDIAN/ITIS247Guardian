import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../data/authData';
import { ShieldAlert, Lock, AlertTriangle, RefreshCw, KeyRound, Server } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
  fallbackTab?: string;
  onNavigateTab?: (tab: string) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
  onNavigateTab,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mb-4" />
        <h3 className="text-lg font-bold text-white">Validating Production JWT Session...</h3>
        <p className="text-sm text-slate-400 mt-1">SITA Enclave OAuth2/OIDC Token Authentication</p>
      </div>
    );
  }

  // 401 UNAUTHORIZED
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-slate-900/90 border border-red-500/30 rounded-2xl text-center space-y-4 max-w-xl mx-auto my-12 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400">
          <Lock className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
          HTTP 401 UNAUTHORIZED
        </div>
        <h2 className="text-2xl font-extrabold text-white">Authentication Required</h2>
        <p className="text-sm text-slate-300">
          Your session token is either missing, expired, or invalid. Access to this production module requires a verified SITA JWT bearer token.
        </p>
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => onNavigateTab && onNavigateTab('auth')}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all"
          >
            <KeyRound className="w-4 h-4" />
            <span>Go to Auth & Login</span>
          </button>
        </div>
      </div>
    );
  }

  // 403 FORBIDDEN
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role) && user.role !== 'SYSTEM_ADMIN') {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-slate-900/90 border border-amber-500/30 rounded-2xl text-center space-y-4 max-w-xl mx-auto my-12 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
          HTTP 403 ACCESS DENIED
        </div>
        <h2 className="text-2xl font-extrabold text-white">Insufficient Role Permissions</h2>
        <p className="text-sm text-slate-300">
          Your current role (<span className="text-amber-400 font-mono font-bold">{user.role}</span>) does not possess permission to view this specific portal context.
        </p>
        <div className="bg-slate-800/80 p-4 rounded-xl text-left w-full text-xs text-slate-400 space-y-1 font-mono">
          <div><span className="text-slate-500">User ID:</span> {user.id}</div>
          <div><span className="text-slate-500">Tenant:</span> {user.tenantId || 'DEFAULT'}</div>
          <div><span className="text-slate-500">Required Roles:</span> {allowedRoles.join(', ')}</div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onNavigateTab && onNavigateTab('auth')}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700"
          >
            Switch Role / Tenant
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const ProductionErrorPage: React.FC<{ type: '404' | '500' | 'maintenance' }> = ({ type }) => {
  if (type === 'maintenance') {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-slate-900/90 border border-indigo-500/30 rounded-2xl text-center space-y-4 max-w-xl mx-auto my-12 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
          <Server className="w-8 h-8 animate-pulse" />
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
          SCHEDULED MAINTENANCE MODE
        </div>
        <h2 className="text-2xl font-extrabold text-white">SITA Cloud Enclave Upgrade</h2>
        <p className="text-sm text-slate-300">
          The National Telemetry Core is undergoing scheduled database indexing. High-priority SOS panic circuits remain fully active via direct satellite fallback.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-slate-900/90 border border-slate-700 rounded-2xl text-center space-y-4 max-w-xl mx-auto my-12 shadow-2xl">
      <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
        HTTP {type === '404' ? '404 NOT FOUND' : '500 SYSTEM ERROR'}
      </div>
      <h2 className="text-2xl font-extrabold text-white">{type === '404' ? 'Resource Not Found' : 'Internal Pipeline Exception'}</h2>
      <p className="text-sm text-slate-300">
        {type === '404' ? 'The requested API route or portal component does not exist in the ITIS catalog.' : 'An unexpected exception occurred during NestJS controller execution. Correlation log logged to OpenTelemetry.'}
      </p>
    </div>
  );
};
