import React from 'react';
import { X, Layers, Users, ArrowRight, ArrowLeft, Cpu, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Level3Service } from '../types/capability';

interface CapabilityDetailModalProps {
  service: Level3Service | null;
  onClose: () => void;
}

export const CapabilityDetailModal: React.FC<CapabilityDetailModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const { details } = service;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Level 3 Business Service
              </span>
              <span className="text-xs text-slate-400 font-mono">{service.id}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{service.name}</h2>
            <p className="text-xs text-slate-400 mt-1">{service.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs">
          {/* Level 4 Software Modules */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Level 4 Software Modules
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.softwareModules.map((mod, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-indigo-950/60 text-indigo-200 border border-indigo-800/50 font-mono text-xs flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  {mod}
                </span>
              ))}
            </div>
          </div>

          {/* Purpose & Business Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <h4 className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Purpose
              </h4>
              <p className="text-slate-300 leading-relaxed">{details.purpose}</p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <h4 className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Business Value
              </h4>
              <p className="text-slate-300 leading-relaxed">{details.businessValue}</p>
            </div>
          </div>

          {/* Primary Users */}
          <div>
            <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              Primary Users
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.primaryUsers.map((user, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {user}
                </span>
              ))}
            </div>
          </div>

          {/* Inputs & Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-cyan-400" />
                Inputs
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {details.inputs.map((inp, i) => (
                  <li key={i}>{inp}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4 text-purple-400 rotate-180" />
                Outputs
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {details.outputs.map((out, i) => (
                  <li key={i}>{out}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dependencies */}
          <div>
            <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-orange-400" />
              Dependencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.dependencies.map((dep, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">
                  {dep}
                </span>
              ))}
            </div>
          </div>

          {/* Future Expansion */}
          <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
            <h4 className="font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
              <ArrowUpRight className="w-4 h-4 text-indigo-400" />
              Future Expansion (Vision 2035)
            </h4>
            <p className="text-indigo-200/90 leading-relaxed">{details.futureExpansion}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
          >
            Close Specification
          </button>
        </div>
      </div>
    </div>
  );
};
