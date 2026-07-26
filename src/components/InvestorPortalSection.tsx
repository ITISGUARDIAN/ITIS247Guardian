import React from 'react';
import { 
  TrendingUp, 
  Globe2, 
  ShieldCheck, 
  Layers, 
  Zap, 
  DollarSign, 
  BarChart2, 
  CheckCircle2,
  PieChart,
  ArrowUpRight
} from 'lucide-react';

export function InvestorPortalSection() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">Investment & Venture Capital Portal</h3>
          </div>
          <p className="text-xs text-slate-400">
            Series-A investment thesis, Total Addressable Market (TAM), technology moat, unit economics, and SADC regional expansion roadmap.
          </p>
        </div>

        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full text-2xs font-mono font-bold flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-emerald-400" /> R14.2B SOUTH AFRICAN TAM
        </span>
      </div>

      {/* Market Sizing TAM / SAM / SOM Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
          <span className="text-2xs font-mono text-cyan-400 uppercase tracking-wider font-bold">Total Addressable Market (TAM)</span>
          <div className="text-2xl font-black text-white font-mono">R14.2 Billion / yr</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            12.8 Million K-12 Learners in South Africa + 60,000 Registered Scholar Transport Vehicles across 9 Provinces.
          </p>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
          <span className="text-2xs font-mono text-emerald-400 uppercase tracking-wider font-bold">Serviceable Addressable Market (SAM)</span>
          <div className="text-2xl font-black text-white font-mono">R3.8 Billion / yr</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Metro & Suburban Public Schools in Gauteng, Western Cape, and KwaZulu-Natal with active transport needs.
          </p>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
          <span className="text-2xs font-mono text-indigo-400 uppercase tracking-wider font-bold">Serviceable Obtainable Market (SOM)</span>
          <div className="text-2xl font-black text-white font-mono">R450 Million (3-Yr)</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Initial 10% market penetration target across 1,200 schools and 8,000 scholar transport buses by 2028.
          </p>
        </div>

      </div>

      {/* Revenue Model Breakdown */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" /> Multi-Layered SaaS & Hardware Monetization Model
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400">1. Learner SaaS Subscription</div>
            <div className="text-lg font-black text-white font-mono">R45 - R85 / mo</div>
            <p className="text-2xs text-slate-300">Paid by parents or subsidized by Department of Basic Education for real-time safety, roll-call & GPS tracking.</p>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-xs font-mono font-bold text-cyan-400">2. Fleet Telematics SaaS</div>
            <div className="text-lg font-black text-white font-mono">R350 - R650 / bus</div>
            <p className="text-2xs text-slate-300">Paid by scholar transport operators and municipalities for driver PDP validation, OBD diagnostics, and route auditing.</p>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-xs font-mono font-bold text-indigo-400">3. Hardware Upfront Capex</div>
            <div className="text-lg font-black text-white font-mono">28% Gross Margin</div>
            <p className="text-2xs text-slate-300">Wearable wristbands (R250), BLE classroom scanners (R4,500), and vehicle OBD hubs (R2,800) device sales.</p>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-xs font-mono font-bold text-amber-400">4. Insurance Data API</div>
            <div className="text-lg font-black text-white font-mono">Value-Add Margin</div>
            <p className="text-2xs text-slate-300">Underwriting safety score data feeds sold to insurance providers to dynamically discount fleet premiums.</p>
          </div>

        </div>
      </div>

      {/* Technology Moat & Competitive Advantage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-sm font-mono font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Technology Moat & Proprietary IP
          </h4>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Hardware-Bound mTLS Security:</strong> Proprietary ECDSA P-256 key injection process preventing spoofed attendance or wristband cloning.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Offline-First Mesh Roll-Call:</strong> Classroom BLE scanner algorithm performs roll-calls without active Wi-Fi or cellular connections.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Sub-Meter GPS & SAPS Integration:</strong> Sub-second panic alert routing directly into South African SAPS 10111 command desks.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-sm font-mono font-bold text-white flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-indigo-400" /> Geographic Expansion Strategy (SADC)
          </h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
              <span>Phase 1 (2026): South Africa (Gauteng & Western Cape)</span>
              <span className="text-emerald-400 font-bold">Active Pilot</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
              <span>Phase 2 (2027): RSA National Expansion (All 9 Provinces)</span>
              <span className="text-cyan-400 font-bold">Scale Phase</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
              <span>Phase 3 (2028): SADC Region (Botswana, Namibia, Zambia, Kenya)</span>
              <span className="text-indigo-400 font-bold">International</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
