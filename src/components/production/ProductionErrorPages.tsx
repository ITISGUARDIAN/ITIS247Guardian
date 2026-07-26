import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Lock, 
  ServerCrash, 
  WifiOff, 
  Wrench, 
  RotateCcw, 
  Home, 
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ProductionErrorPagesProps {
  onReturnHome?: () => void;
}

export function ProductionErrorPages({ onReturnHome }: ProductionErrorPagesProps) {
  const [activeErrorType, setActiveErrorType] = useState<'404' | '403' | '401' | '500' | 'offline' | 'maintenance'>('404');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      {/* Header & Error Type Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">Production Error Pages & Resilience System</h3>
          </div>
          <p className="text-xs text-slate-400">
            Enterprise fault isolation, user-friendly error recovery states, and scheduled maintenance notices.
          </p>
        </div>

        {/* Error Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: '404', label: '404 Not Found' },
            { id: '403', label: '403 Forbidden' },
            { id: '401', label: '401 Unauthorized' },
            { id: '500', label: '500 Server Fault' },
            { id: 'offline', label: 'Offline Mode' },
            { id: 'maintenance', label: 'Maintenance' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveErrorType(btn.id as any)}
              className={`px-3 py-1.5 rounded-lg text-2xs font-mono transition whitespace-nowrap ${
                activeErrorType === btn.id
                  ? 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Page Display Box */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-8 flex flex-col items-center justify-center text-center space-y-6 min-h-[380px]">
        
        {/* 404 NOT FOUND */}
        {activeErrorType === '404' && (
          <div className="space-y-4 max-w-md animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-2xs font-mono text-cyan-400 font-bold uppercase tracking-widest">ERROR CODE 404</span>
              <h4 className="text-2xl font-black text-white font-sans">Page or Resource Not Found</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The requested URL path or student record route does not exist or has been relocated within the ITIS Enterprise network.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button 
                onClick={onReturnHome}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold rounded-xl transition flex items-center gap-2"
              >
                <Home className="w-4 h-4" /> Return to Platform
              </button>
            </div>
          </div>
        )}

        {/* 403 FORBIDDEN */}
        {activeErrorType === '403' && (
          <div className="space-y-4 max-w-md animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-2xs font-mono text-amber-400 font-bold uppercase tracking-widest">ERROR CODE 403</span>
              <h4 className="text-2xl font-black text-white font-sans">Access Denied / Insufficient Role</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your role credentials do not possess permission to access this government or command dispatch resource. POPIA access controls enforced.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button 
                onClick={onReturnHome}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold rounded-xl transition flex items-center gap-2"
              >
                <Home className="w-4 h-4" /> Request Elevate Role
              </button>
            </div>
          </div>
        )}

        {/* 401 UNAUTHORIZED */}
        {activeErrorType === '401' && (
          <div className="space-y-4 max-w-md animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-2xs font-mono text-indigo-400 font-bold uppercase tracking-widest">ERROR CODE 401</span>
              <h4 className="text-2xl font-black text-white font-sans">Authentication Session Expired</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your JWT session token has expired after 30 minutes of inactivity. Please re-authenticate via mTLS or biometrics.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button 
                onClick={onReturnHome}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-mono font-bold rounded-xl transition flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Re-Authenticate
              </button>
            </div>
          </div>
        )}

        {/* 500 SERVER FAULT */}
        {activeErrorType === '500' && (
          <div className="space-y-4 max-w-md animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <ServerCrash className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-2xs font-mono text-rose-400 font-bold uppercase tracking-widest">ERROR CODE 500</span>
              <h4 className="text-2xl font-black text-white font-sans">Internal Server Fault Isolated</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                An exception occurred in the backend service. Microservice circuit breakers activated. Event logged to Sentry & Security Audit.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white text-xs font-mono font-bold rounded-xl transition flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* OFFLINE MODE */}
        {activeErrorType === 'offline' && (
          <div className="space-y-4 max-w-md animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <WifiOff className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-2xs font-mono text-amber-400 font-bold uppercase tracking-widest">OFFLINE NETWORK MODE</span>
              <h4 className="text-2xl font-black text-white font-sans">Cellular / Wi-Fi Disconnected</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                ITIS Local Mesh offline sync engaged. Classroom BLE roll-call records will be queued locally and synced automatically once signal returns.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-2xs font-mono">
                Local Storage Storage Safe: 8,090 Records Queued
              </span>
            </div>
          </div>
        )}

        {/* MAINTENANCE MODE */}
        {activeErrorType === 'maintenance' && (
          <div className="space-y-4 max-w-md animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto">
              <Wrench className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-2xs font-mono text-purple-400 font-bold uppercase tracking-widest">SCHEDULED SYSTEM UPGRADE</span>
              <h4 className="text-2xl font-black text-white font-sans">Maintenance Window Active</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The ITIS Cloud Gateway is undergoing scheduled zero-downtime microservice migration (Estimated completion: 15 mins). Emergency SAPS dispatch channels remain active.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-2xs font-mono">
                SAPS 10111 Fallback Stream ACTIVE
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
