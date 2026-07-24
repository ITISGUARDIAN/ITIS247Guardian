import React from 'react';
import { Inbox, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onRefresh?: () => void;
  actionLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  message = 'There are no active entries registered in the live PostgreSQL database for this query.',
  onRefresh,
  actionLabel = 'Refresh Data'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3" id="empty-state">
      <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
        <Inbox className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-bold text-white">{title}</h4>
      <p className="text-xs text-slate-400 max-w-md leading-relaxed">{message}</p>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-md mt-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
