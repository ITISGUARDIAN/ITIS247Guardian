import React from 'react';
import { AlertTriangle, RefreshCw, ShieldAlert, Lock, AlertCircle } from 'lucide-react';

interface ErrorBannerProps {
  statusCode?: number;
  message?: string;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  statusCode = 500,
  message = 'Failed to load live data from NestJS API server.',
  onRetry
}) => {
  const getIcon = () => {
    switch (statusCode) {
      case 401:
      case 403:
        return <Lock className="w-5 h-5 text-amber-400" />;
      case 429:
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-rose-400" />;
    }
  };

  const getTitle = () => {
    switch (statusCode) {
      case 401: return '401 Unauthorized — RSA Bearer Token Expired';
      case 403: return '403 Forbidden — Insufficient RBAC Scope';
      case 404: return '404 Resource Not Found';
      case 429: return '429 Too Many Requests — Rate Limit Throttled';
      default: return `${statusCode} Enterprise API Connection Error`;
    }
  };

  return (
    <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 flex items-start justify-between gap-4" id="error-banner">
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-rose-900/40 mt-0.5">
          {getIcon()}
        </div>
        <div>
          <h4 className="text-xs font-bold text-rose-200">{getTitle()}</h4>
          <p className="text-[11px] text-rose-300/80 mt-0.5 leading-normal">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-rose-800 hover:bg-rose-700 text-white font-semibold text-xs transition-all whitespace-nowrap"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};
