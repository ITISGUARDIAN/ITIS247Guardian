import React from 'react';

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="w-full space-y-3 animate-pulse" id="table-skeleton">
      <div className="h-10 bg-slate-800/80 rounded-xl w-full border border-slate-700/50" />
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div key={rIdx} className="h-12 bg-slate-900/60 rounded-xl w-full border border-slate-800/60 flex items-center px-4 space-x-4">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <div key={cIdx} className="h-4 bg-slate-800/80 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="card-skeleton">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 animate-pulse space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-4 w-28 bg-slate-800 rounded" />
            <div className="h-8 w-8 bg-slate-800 rounded-lg" />
          </div>
          <div className="h-8 w-20 bg-slate-800 rounded" />
          <div className="h-3 w-36 bg-slate-800/60 rounded" />
        </div>
      ))}
    </div>
  );
};

export const MetricsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3" id="metrics-skeleton">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 animate-pulse space-y-2">
          <div className="h-3 w-20 bg-slate-800 rounded" />
          <div className="h-6 w-16 bg-slate-800 rounded" />
        </div>
      ))}
    </div>
  );
};
