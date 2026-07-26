import React, { useState } from 'react';
import { 
  Users, 
  School, 
  Building2, 
  ShieldAlert, 
  Bus, 
  HeartPulse, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Wrench,
  CheckCircle2,
  ArrowRight,
  Handshake
} from 'lucide-react';

interface PartnerType {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  valueProp: string;
  keyBenefits: string[];
  callToAction: string;
}

const PARTNER_TYPES: PartnerType[] = [
  {
    id: 'schools',
    name: 'Schools & Governing Bodies (SGB)',
    icon: School,
    tagline: 'Automated morning roll-call, zero attendance fraud, and total campus safety.',
    valueProp: 'Eliminate manual paper registers. Principal and parents receive instant automated attendance notifications within seconds of classroom arrival.',
    keyBenefits: [
      'Zero manual record-keeping burden on educators',
      'Automated DBE attendance compliance reports',
      'Instant parent push notifications upon school arrival and departure',
      'Enhanced campus security with unauthorized visitor boundary alerts'
    ],
    callToAction: 'Register School for Pilot Rollout'
  },
  {
    id: 'municipalities',
    name: 'Municipalities & Provincial Transport',
    icon: Building2,
    tagline: 'Transparent scholar transport subsidy verification and route compliance.',
    valueProp: 'Gain 100% real-time oversight of government-subsidized scholar transport buses. Verify actual learner passenger counts before issuing operator payouts.',
    keyBenefits: [
      'Eliminate ghost passenger subsidy claims with cryptographic band validation',
      'Real-time vehicle speed, route deviation, and overloading monitoring',
      'Automated provincial transport audit dashboards',
      'Direct integration into Municipal Disaster Management centers'
    ],
    callToAction: 'Schedule Provincial Procurement Briefing'
  },
  {
    id: 'security',
    name: 'Private Security & SAPS 10111',
    icon: ShieldAlert,
    tagline: 'Sub-meter emergency panic dispatch with instant live GPS tracking.',
    valueProp: 'When a learner or driver triggers an SOS alert, control rooms receive sub-meter coordinates, vehicle telemetry, and child identification instantly.',
    keyBenefits: [
      'Sub-meter indoor and outdoor location precision',
      'Direct C3 tactical dispatch integration via open Webhook APIs',
      'Reduced emergency response times to under 3 minutes',
      'Forensic timestamp logs admissible in court proceedings'
    ],
    callToAction: 'Integrate Control Center Dispatch API'
  },
  {
    id: 'fleet',
    name: 'Scholar Fleet & Taxi Operators',
    icon: Bus,
    tagline: 'Turnkey vehicle telematics, driver PDP verification, and passenger safety.',
    valueProp: 'Equip your transport fleet with state-of-the-art telematics hubs. Protect your drivers against false claims while ensuring learner safety.',
    keyBenefits: [
      'Automated PDP driver license validation prior to engine start',
      'Engine diagnostic codes, fuel monitoring, and maintenance alerts',
      'Improved driver safety scores leading to reduced fleet insurance costs',
      'Preferred contractor status for government scholar transport tenders'
    ],
    callToAction: 'Equip Your Fleet with ITIS'
  },
  {
    id: 'ems',
    name: 'Emergency Responders (EMS)',
    icon: HeartPulse,
    tagline: 'Instant child medical alerts (allergies, blood type, emergency contacts).',
    valueProp: 'First responders receive critical medical data and parent emergency contacts the moment an ambulance is dispatched to an incident.',
    keyBenefits: [
      'Pre-authorized medical info payload transmitted to trauma unit',
      'Direct phone link to verified parent/guardian',
      'Hospital triage preparation prior to ambulance arrival',
      'Minimized emergency treatment delays for injured learners'
    ],
    callToAction: 'Join Medical Response Network'
  },
  {
    id: 'tech-oem',
    name: 'Technology OEMs & Hardware Manufacturers',
    icon: Cpu,
    tagline: 'Mass manufacturing of wearable bands, gateways, and OBD telematics.',
    valueProp: 'Partner with ITIS to manufacture, assemble, and distribute certified hardware devices across South Africa and the SADC region.',
    keyBenefits: [
      'Long-term hardware procurement contracts for millions of learners',
      'Open hardware specifications and mTLS provisioning tools',
      'Local manufacturing and job creation alignment (B-BBEE level 1)',
      'SADC market expansion opportunities'
    ],
    callToAction: 'Become Certified Hardware Supplier'
  },
  {
    id: 'telecoms',
    name: 'Telecommunications & MNOs',
    icon: Radio,
    tagline: 'High-density NB-IoT / LTE-M cellular data connectivity and SIM management.',
    valueProp: 'Provide dedicated APN cellular connectivity for hundreds of thousands of vehicle gateways and campus BLE scanners nationwide.',
    keyBenefits: [
      'High-volume recurring M2M data revenue streams',
      'Zero-rated parent app traffic partnerships',
      'National network coverage utilization across rural and urban schools',
      'E-SIM and multi-carrier failover connectivity'
    ],
    callToAction: 'Partner as Telco Connectivity Provider'
  },
  {
    id: 'insurers',
    name: 'Insurance Underwriters',
    icon: ShieldCheck,
    tagline: 'Risk reduction algorithms and telematics-driven premium discounts.',
    valueProp: 'Underwrite scholar transport fleets and schools equipped with ITIS technology with lower risk profiles and actuarially proven safety gains.',
    keyBenefits: [
      'Up to 35% reduction in scholar transport accident claims',
      'Tamper-evident collision reconstruction telemetry',
      'Reduced risk premiums for participating schools and operators',
      'Direct revenue sharing on micro-insurance child safety add-ons'
    ],
    callToAction: 'Underwrite ITIS Safety Program'
  }
];

export function PartnerPortalSection() {
  const [selectedPartner, setSelectedPartner] = useState<PartnerType>(PARTNER_TYPES[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg">
              <Handshake className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">Commercial Partner & Stakeholder Portal</h3>
          </div>
          <p className="text-xs text-slate-400">
            Tailored value propositions and integration paths for schools, municipalities, security companies, telecommunications, and fleet operators.
          </p>
        </div>

        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full text-2xs font-mono font-bold">
          8 ECOSYSTEM PARTNER TRACKS
        </span>
      </div>

      {/* Partner Tabs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PARTNER_TYPES.map((partner) => {
          const Icon = partner.icon;
          const isActive = selectedPartner.id === partner.id;
          return (
            <button
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                isActive
                  ? 'bg-cyan-500/20 text-white border-cyan-500/50 font-bold shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="text-xs font-mono truncate">{partner.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Partner Value Proposition Display Card */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              {React.createElement(selectedPartner.icon, { className: 'w-6 h-6 text-cyan-400' })}
              {selectedPartner.name}
            </h4>
            <p className="text-xs text-cyan-300 font-mono">
              {selectedPartner.tagline}
            </p>
          </div>

          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-lg shadow-cyan-500/20">
            <span>{selectedPartner.callToAction}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Core Value Proposition</h5>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            {selectedPartner.valueProp}
          </p>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Key Stakeholder Benefits</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedPartner.keyBenefits.map((benefit, bIdx) => (
              <div key={bIdx} className="flex items-start gap-2.5 p-3 bg-slate-900/40 rounded-lg border border-slate-800/60 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
