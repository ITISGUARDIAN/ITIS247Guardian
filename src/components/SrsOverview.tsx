import React from 'react';
import { Shield, Users, Server, Database, Lock, Terminal, Cpu, CheckCircle } from 'lucide-react';

export const SrsOverview: React.FC = () => {
  const personas = [
    { title: 'Parent', desc: 'Monitors child real-time transport radar, receives boarding alerts and triggers emergency comms.' },
    { title: 'Learner', desc: 'Carries IoT wearable/NFC tag for automated boarding scans and location pinging.' },
    { title: 'School Administrator', desc: 'Manages school rosters, campus geofences, and transport attendance reconciliation.' },
    { title: 'Teacher', desc: 'Conducts classroom roll calls synced with transport boarding logs to detect truancy.' },
    { title: 'Driver', desc: 'Receives route turn-by-turn nav, logs vehicle inspections, and handles SOS hardware triggers.' },
    { title: 'Fleet Owner', desc: 'Monitors vehicle roadworthiness, license disk renewals, fuel usage, and driver behavior scores.' },
    { title: 'ITIS Operator', desc: 'Monitors live vehicle positions, manages routine exception flags, and assists command supervisors.' },
    { title: 'Command Centre Supervisor', desc: 'Oversees 24/7 video wall, orchestrates SAPS/EMS tactical response, and handles escalations.' },
    { title: 'Emergency Response Partner', desc: 'Receives proximate dispatch alerts, tactical navigation, and incident scene payloads.' },
    { title: 'Super Administrator', desc: 'Manages multi-tenant cloud infrastructure, security policies, RBAC keys, and platform billing.' }
  ];

  return (
    <div className="space-y-8 text-slate-100 text-xs">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
        <div className="flex items-center space-x-2 text-indigo-400 font-bold mb-2">
          <Shield className="w-5 h-5" />
          <span className="uppercase tracking-widest">Enterprise Software Requirements Specification</span>
        </div>
        <h2 className="text-2xl font-bold text-white">ITIS System Architectural Overview</h2>
        <p className="text-slate-300 mt-2 text-sm leading-relaxed">
          Integrated Technology Intelligence & Safety (ITIS) engineered by Elite Engineering Company.
        </p>
      </div>

      {/* Personas Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          10 Core System User Personas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {personas.map((p, i) => (
            <div key={i} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="font-bold text-indigo-300 block mb-1">{p.title}</span>
              <p className="text-slate-400 text-[11px] leading-snug">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack & Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
            <Server className="w-4 h-4 text-cyan-400" />
            Backend & Mobile Architecture
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>NestJS / Node.js Microservices</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Flutter Cross-Platform Mobile Apps</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>MQTT / WebSocket Telemetry Pipeline</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
            <Database className="w-4 h-4 text-indigo-400" />
            Database & Spatial Layer
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>PostgreSQL with PostGIS Extensions</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>TimescaleDB Time-Series Telemetry</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Maps Platform Abstraction Layer</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
            <Lock className="w-4 h-4 text-purple-400" />
            Security & Compliance
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>POPIA Minor PII AES-256 Vault</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Role-Based Access Control (RBAC)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tamper-Evident Forensic Incident Docket</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
