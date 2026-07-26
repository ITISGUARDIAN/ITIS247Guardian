import React from 'react';
import { 
  ShieldCheck, 
  School, 
  Radio, 
  Users, 
  Award, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Activity, 
  PhoneCall, 
  Building2, 
  MapPin, 
  ExternalLink, 
  Sparkles, 
  ChevronRight,
  Shield,
  Clock,
  Zap,
  Globe
} from 'lucide-react';

interface WebsiteModuleProps {
  onNavigateToDashboard: (route: string) => void;
}

export function WebsiteModule({ onNavigateToDashboard }: WebsiteModuleProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Corporate Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 rounded-xl text-cyan-400 shadow-lg shadow-cyan-500/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-mono">ITIS</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-mono font-bold">
                  v1.0.0-GA
                </span>
              </div>
              <p className="text-2xs text-slate-400 uppercase tracking-wider font-semibold">
                Integrated Transportation & Identity Safety
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#solutions" className="hover:text-cyan-400 transition">Solutions</a>
            <a href="#pilots" className="hover:text-cyan-400 transition">National Pilots</a>
            <a href="#compliance" className="hover:text-cyan-400 transition">POPIA & Security</a>
            <a href="#governance" className="hover:text-cyan-400 transition">Governance</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToDashboard('/certification')}
              className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 shadow-sm"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>GA Release Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 border-b border-slate-800 overflow-hidden bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Republic of South Africa • National Child Safety Infrastructure</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            Integrated Transportation & Identity Safety Platform
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mt-6 max-w-3xl leading-relaxed">
            Protecting South African learners through mTLS hardware wearable telemetry, high-throughput BLE classroom mesh scanning, and real-time SAPS tactical emergency dispatch.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigateToDashboard('/certification')}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Award className="w-4 h-4" />
              <span>Access Phase D14 GA Control Center</span>
            </button>
            <a
              href="#solutions"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold border border-slate-700 rounded-xl text-sm transition flex items-center gap-2"
            >
              <span>Explore Safety Architecture</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </a>
          </div>

          {/* Key Metric Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <div className="text-2xs font-mono text-slate-400 uppercase tracking-wider">Pilot Coverage</div>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">1,420+ Schools</div>
              <p className="text-xs text-slate-400 mt-1">Gauteng, W. Cape & KZN</p>
            </div>
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <div className="text-2xs font-mono text-slate-400 uppercase tracking-wider">Learner Safety</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">1.2M+ Active</div>
              <p className="text-xs text-slate-400 mt-1">Wearable & BLE Sync</p>
            </div>
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <div className="text-2xs font-mono text-slate-400 uppercase tracking-wider">Emergency Response</div>
              <div className="text-2xl font-extrabold text-purple-400 font-mono mt-1">&lt;180s Dispatch</div>
              <p className="text-xs text-slate-400 mt-1">SAPS 10111 Integration</p>
            </div>
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <div className="text-2xs font-mono text-slate-400 uppercase tracking-wider">Compliance Status</div>
              <div className="text-2xl font-extrabold text-blue-400 font-mono mt-1">POPIA Certified</div>
              <p className="text-xs text-slate-400 mt-1">Zero-Trust & RLS Enforced</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Core Solutions */}
      <section id="solutions" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">End-to-End Safety Engineering</span>
            <h2 className="text-3xl font-extrabold text-white">Four Pillars of National Child & Transit Security</h2>
            <p className="text-sm text-slate-400">
              A comprehensive system uniting hardware wearables, school gateways, transport fleets, and provincial emergency command centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 w-fit">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">1. mTLS Hardware Wearable Bands</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Tamper-proof learner wristbands equipped with hardware-isolated ECDSA P-256 keys, panic SOS buttons, and anti-removal sensors transmitting location packets via encrypted cellular gateways.
              </p>
              <ul className="text-xs font-mono text-slate-400 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Hardware-backed mTLS device authentication</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant panic signal with sub-second alert transmission</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 w-fit">
                <School className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">2. BLE Mesh Classroom Attendance</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Automated classroom attendance scanners capable of processing up to 1,200 BLE wristband heartbeats per minute without requiring manual roll call by educators.
              </p>
              <ul className="text-xs font-mono text-slate-400 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Automated arrival/departure SMS dispatch to parents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero-delay truancy & unauthorized departure alerts</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition">
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 w-fit">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">3. Fleet Transit & Vehicle Monitoring</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                On-board telematics for school buses and transport vans. Monitors vehicle speed, route adherence, boarding verifications, and driver identity validation.
              </p>
              <ul className="text-xs font-mono text-slate-400 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Geofence deviation & unauthorized stop detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Integrated driver biometric authentication</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">4. SAPS Tactical Command Integration</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct tactical pipeline linking high-priority distress alerts to South African Police Service (SAPS) 10111 dispatch units and private security rapid responders.
              </p>
              <ul className="text-xs font-mono text-slate-400 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Automatic incident telemetry & GPS coordinate sharing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Multi-agency emergency protocol coordination</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* National Pilot Deployment */}
      <section id="pilots" className="py-20 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">National Deployment Scope</span>
              <h2 className="text-3xl font-extrabold text-white mt-2">Active Provincial Target Regions</h2>
              <p className="text-sm text-slate-400 mt-1">Phased rollout across key transport corridors and high-density education districts.</p>
            </div>
            <button
              onClick={() => onNavigateToDashboard('/release')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>View Full National Readiness Matrix</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">GP — GAUTENG</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-2xs font-mono font-bold">100% READY</span>
              </div>
              <h4 className="text-base font-bold text-white">Johannesburg & Tshwane Metro</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                620 pilot schools, 580,000 learners, and 450 transit fleet vehicles fully onboarded to the ITIS mesh network.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">WC — WESTERN CAPE</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-2xs font-mono font-bold">98% READY</span>
              </div>
              <h4 className="text-base font-bold text-white">Cape Town & Metro South</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                480 pilot schools, 390,000 learners, with live mTLS wearable wristband syncing and SAPS command links.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">KZN — KWAZULU-NATAL</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-2xs font-mono font-bold">95% READY</span>
              </div>
              <h4 className="text-base font-bold text-white">eThekwini & Umlazi District</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                320 pilot schools, 250,000 learners, featuring high-gain cellular repeater nodes for rural transit coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Security Section */}
      <section id="compliance" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">Governance & Compliance</span>
            <h2 className="text-3xl font-extrabold text-white">POPIA & DevSecOps Certification</h2>
            <p className="text-sm text-slate-400">
              Built in strict adherence to the Protection of Personal Information Act (POPIA) and international cyber defence standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 font-mono">
              <Lock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-white">POPIA Compliant</div>
              <div className="text-2xs text-slate-400 mt-1">Row Level Security (RLS)</div>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 font-mono">
              <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-white">OWASP 10/10 Cleared</div>
              <div className="text-2xs text-slate-400 mt-1">Zero Vulnerabilities</div>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 font-mono">
              <Activity className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-white">25,000 RPS Tested</div>
              <div className="text-2xs text-slate-400 mt-1">k6 Benchmark Certified</div>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 font-mono">
              <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-white">GA Certified</div>
              <div className="text-2xs text-slate-400 mt-1">Version 1.0.0-GA Freeze</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Integrated Transportation & Identity Safety (ITIS) Platform • Republic of South Africa</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <button 
              onClick={() => onNavigateToDashboard('/certification')} 
              className="hover:text-emerald-400 transition text-emerald-300 font-bold"
            >
              GA Control Center (/certification)
            </button>
            <button 
              onClick={() => onNavigateToDashboard('/release')} 
              className="hover:text-cyan-400 transition text-cyan-300 font-bold"
            >
              Release Dashboard (/release)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
