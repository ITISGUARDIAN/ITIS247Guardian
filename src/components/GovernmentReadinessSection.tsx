import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Building2, 
  Scale, 
  Database, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';

const GOV_PILLARS = [
  {
    icon: Lock,
    title: 'POPIA Compliance & Child Privacy',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    summary: 'Protection of Personal Information Act (Act 4 of 2013) strict compliance framework.',
    points: [
      'Learner identity tags use cryptographic SHA-256 salted hashes (no plain-text names on wristbands).',
      'Parental consent opt-in workflows with automated Right-to-Be-Forgotten data purge triggers.',
      'Data minimization: Only location and safety-critical telemetry collected during school hours.',
      'Encrypted transit and storage certified for South African Department of Basic Education compliance.'
    ]
  },
  {
    icon: ShieldCheck,
    title: 'Zero Trust Cybersecurity',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    summary: 'Hardware-verified mutual TLS (mTLS) and elliptic curve cryptography (ECDSA P-256).',
    points: [
      'Every wearable band, vehicle gateway, and classroom scanner possesses a unique X.509 client certificate.',
      'Zero IP exposure: Microservice architecture behind isolated private Cloud Run VPC firewalls.',
      'Automatic anomaly detection rejecting tampered payloads, spoofed GPS coordinates, or replay attacks.',
      'Bi-annual independent penetration testing and vulnerability management reports.'
    ]
  },
  {
    icon: FileCheck,
    title: 'Immutable Audit Logging',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    summary: 'Tamper-evident event logs suitable for SAPS forensic evidence and provincial government oversight.',
    points: [
      'Every attendance roll-call, geofence exit, and driver scan is written to a cryptographic hash log.',
      'Immutable record keeping ensuring evidence admissibility for legal or safety investigations.',
      'Real-time automated compliance reporting for Provincial Department of Transport auditors.',
      'Comprehensive operator action trail detailing who viewed, modified, or dispatched emergency alerts.'
    ]
  },
  {
    icon: Database,
    title: 'Data Sovereignty & Local Cloud',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    summary: '100% South African data residency guaranteeing compliance with national security guidelines.',
    points: [
      'Primary cloud infrastructure hosted in Johannesburg & Cape Town data center zones.',
      'Zero international data egress — student records never leave Republic of South Africa borders.',
      'Redundant geo-disaster recovery replication between Gauteng and Western Cape facilities.',
      'Instant offline-first local mesh fallback if cell towers or power grids go down during load-shedding.'
    ]
  },
  {
    icon: Eye,
    title: 'RBAC Multi-Tenant Governance',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    summary: 'Granular access controls separating parental, municipal, driver, and emergency responder views.',
    points: [
      'Parents only see their own children; school principals see only enrolled students.',
      'Drivers access route navigation and transport scans without seeing private home addresses.',
      'SAPS & Metro Police Command Centers receive high-priority emergency telemetry during active SOS alerts.',
      'Strict multi-factor authentication (MFA) required for all enterprise and government portal users.'
    ]
  },
  {
    icon: Scale,
    title: 'Operational Emergency Governance',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    summary: 'Direct protocol integration with National Disaster Management and SAPS 10111 centers.',
    points: [
      'Direct API webhook integration into SAPS C3 command desks and private armed response dispatches.',
      'Sub-meter GPS precision during distress calls enabling rapid tactical response inside large campuses.',
      'Standardized Incident Command System (ICS) reporting schemas compliant with municipal regulations.',
      'Automated parent panic notification dispatches keeping families instantly informed without rumor spread.'
    ]
  }
];

export function GovernmentReadinessSection() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-lg">
              <Building2 className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">Government Readiness & Regulatory Governance</h3>
          </div>
          <p className="text-xs text-slate-400">
            Enterprise security architecture, POPIA privacy guarantees, data sovereignty, and operational governance built specifically for South African public sector tenders.
          </p>
        </div>

        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full text-2xs font-mono font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% POPIA & GOV COMPLIANT
        </span>
      </div>

      {/* Grid of Governance Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GOV_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div 
              key={idx}
              className={`bg-slate-950 p-5 rounded-xl border ${pillar.borderColor} space-y-3 flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${pillar.bgColor} ${pillar.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans">
                    {pillar.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {pillar.summary}
                </p>

                <div className="border-t border-slate-800/80 pt-3 space-y-2">
                  {pillar.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-2xs text-slate-400 font-sans">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${pillar.color} shrink-0 mt-0.5`} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
