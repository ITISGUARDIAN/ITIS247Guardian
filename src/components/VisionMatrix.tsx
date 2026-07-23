import React from 'react';
import { VISION_PHASES } from '../data/capabilities';
import { Compass, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';

export const VisionMatrix: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center space-x-3 mb-3">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Compass className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">
            Enterprise Growth Blueprint
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          ITIS Vision 2035 Strategy
        </h2>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          From the Gauteng pilot through South Africa national adoption to SADC regional transport corridor security integration.
        </p>
      </div>

      {/* Visual Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VISION_PHASES.map((phase, idx) => (
          <div
            key={idx}
            className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all rounded-2xl p-6 flex flex-col justify-between relative group"
          >
            <div className="absolute top-4 right-4 text-slate-700 group-hover:text-indigo-500/40 transition-colors font-extrabold text-3xl">
              0{idx + 1}
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {phase.phase}
                </span>
                <span className="text-xs text-slate-400 font-mono">{phase.timeline}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>

              <div className="flex items-center text-xs text-slate-400 mb-4 gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{phase.targetScope}</span>
              </div>

              <div className="space-y-2.5 mt-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Key Milestones
                </h4>
                <ul className="space-y-2">
                  {phase.keyMilestones.map((m, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
