import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Users, 
  Bus, 
  Shield, 
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';

export function PilotProposalGenerator() {
  const [province, setProvince] = useState('Gauteng');
  const [municipality, setMunicipality] = useState('City of Johannesburg (Region D)');
  const [targetSchoolCluster, setTargetSchoolCluster] = useState('Soweto School Transport Cluster 04');
  const [fleetSize, setFleetSize] = useState(45);
  const [learnerCount, setLearnerCount] = useState(4500);
  const [durationMonths, setDurationMonths] = useState(6);
  const [showDocument, setShowDocument] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-lg">
              <FileText className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">Government & School Pilot Package Generator</h3>
          </div>
          <p className="text-xs text-slate-400">
            Generate customized commercial pilot scope proposals, SLAs, timelines, and procurement specifications.
          </p>
        </div>

        <button
          onClick={() => setShowDocument(!showDocument)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-mono font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>{showDocument ? 'Edit Parameters' : 'Generate Pilot Proposal'}</span>
        </button>
      </div>

      {!showDocument ? (
        /* Form Inputs */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Target Province
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs font-mono focus:border-indigo-500 outline-none"
            >
              <option value="Gauteng">Gauteng Province</option>
              <option value="Western Cape">Western Cape Province</option>
              <option value="KwaZulu-Natal">KwaZulu-Natal Province</option>
              <option value="Eastern Cape">Eastern Cape Province</option>
              <option value="Limpopo">Limpopo Province</option>
              <option value="Mpumalanga">Mpumalanga Province</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Municipality / District
            </label>
            <input
              type="text"
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs font-mono focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" /> School / Cluster Name
            </label>
            <input
              type="text"
              value={targetSchoolCluster}
              onChange={(e) => setTargetSchoolCluster(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs font-mono focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 text-indigo-400" /> Vehicle Fleet Count
            </label>
            <input
              type="number"
              value={fleetSize}
              onChange={(e) => setFleetSize(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs font-mono focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" /> Learner Count
            </label>
            <input
              type="number"
              value={learnerCount}
              onChange={(e) => setLearnerCount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs font-mono focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Pilot Duration (Months)
            </label>
            <select
              value={durationMonths}
              onChange={(e) => setDurationMonths(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs font-mono focus:border-indigo-500 outline-none"
            >
              <option value={3}>3 Months Deployment</option>
              <option value={6}>6 Months Comprehensive Pilot</option>
              <option value={12}>12 Months Annual Pilot</option>
            </select>
          </div>

        </div>
      ) : (
        /* Generated Proposal Document View */
        <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 space-y-6 text-slate-200 print:bg-white print:text-black">
          
          {/* Print Controls Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Pilot Document Generated & Verified
            </span>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-lg transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print / Export PDF
            </button>
          </div>

          {/* Document Header */}
          <div className="space-y-2 border-b border-slate-800 pb-6">
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs text-indigo-400 font-bold tracking-widest uppercase">
                ITIS Enterprise Platform v1.0.0-GA
              </div>
              <div className="font-mono text-2xs text-slate-500">
                Ref: PILOT-{province.substring(0,3).toUpperCase()}-2026-{Math.floor(Math.random() * 899 + 100)}
              </div>
            </div>
            <h2 className="text-2xl font-black text-white font-sans tracking-tight">
              Commercial Pilot Deployment Proposal
            </h2>
            <p className="text-xs text-slate-400">
              Prepared for: <span className="text-white font-bold">{municipality}, {province}</span> | Focus: <span className="text-indigo-300">{targetSchoolCluster}</span>
            </p>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider font-mono">1. Executive Summary</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This proposal outlines the commercial and technical deployment of the Integrated Transport & Identity Safety (ITIS) system for <strong className="text-white">{learnerCount.toLocaleString()} learners</strong> across <strong className="text-white">{fleetSize} scholar vehicles</strong> within <strong className="text-white">{targetSchoolCluster}</strong>. The objective of this {durationMonths}-month pilot is to establish automated roll-call attendance, zero-trust BLE tracking, sub-meter vehicle telematics, and direct SAPS 10111 emergency dispatch capabilities.
            </p>
          </div>

          {/* Scope & Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Deliverables
              </h4>
              <ul className="text-2xs text-slate-300 space-y-1 list-disc list-inside font-mono">
                <li>{learnerCount.toLocaleString()} Encrypted Wearable Bands</li>
                <li>{fleetSize} Vehicle Telematics Gateways</li>
                <li>Campus BLE Attendance Scanners</li>
                <li>Command Centre Real-Time Portal</li>
                <li>Parent & School Principal Mobile Apps</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" /> Key SLAs & Criteria
              </h4>
              <ul className="text-2xs text-slate-300 space-y-1 list-disc list-inside font-mono">
                <li>Automated Attendance Latency: &lt;1.0s</li>
                <li>SAPS Emergency Dispatch: &lt;1.2s</li>
                <li>System Availability SLA: 99.95%</li>
                <li>POPIA & Cryptographic Hash Compliance</li>
                <li>Dedicated On-Site Field Technician Support</li>
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider font-mono">2. Implementation Rollout Timeline</h3>
            <div className="grid grid-cols-3 gap-3 font-mono text-2xs">
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <div className="text-cyan-400 font-bold">Month 1</div>
                <div className="text-slate-300 font-sans mt-1">Hardware Provisioning & Gateways Installation</div>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <div className="text-cyan-400 font-bold">Month 2-3</div>
                <div className="text-slate-300 font-sans mt-1">Go-Live, Driver Onboarding & School Roll-Call</div>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <div className="text-cyan-400 font-bold">Month 4-{durationMonths}</div>
                <div className="text-slate-300 font-sans mt-1">Full Operations, SAPS Coordination & Audit Sign-Off</div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
