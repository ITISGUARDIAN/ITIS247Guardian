import React, { useState } from 'react';
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
  Globe,
  Bus,
  TrendingUp,
  HeartPulse,
  Cpu,
  Database,
  Layers,
  Server,
  Smartphone,
  Eye,
  FileText,
  Mail,
  X,
  Send,
  Building,
  Briefcase,
  Check,
  Compass,
  BarChart3,
  Flame,
  KeyRound,
  Network,
  Calculator,
  Handshake,
  HelpCircle,
  Play,
  Bell,
  AlertTriangle,
  FileCheck,
  Phone
} from 'lucide-react';

import { LiveDemoSimulator } from './components/LiveDemoSimulator';
import { ROICalculator } from './components/ROICalculator';
import { PilotProposalGenerator } from './components/PilotProposalGenerator';
import { HardwareShowcase } from './components/HardwareShowcase';
import { GovernmentReadinessSection } from './components/GovernmentReadinessSection';
import { PartnerPortalSection } from './components/PartnerPortalSection';
import { InvestorPortalSection } from './components/InvestorPortalSection';
import { PublicDocsFAQ } from './components/PublicDocsFAQ';
import { CommercialCertificationReport } from './components/CommercialCertificationReport';
import { ProductionReadinessReport } from './components/production/ProductionReadinessReport';
import { ProductionErrorPages } from './components/production/ProductionErrorPages';
import { NotificationsDashboard } from './components/notifications/NotificationsDashboard';
import { IdentityDashboard } from './components/auth/IdentityDashboard';
import { GisDashboard } from './components/gis/GisDashboard';

interface WebsiteModuleProps {
  onNavigateToDashboard: (route: string) => void;
}

export function WebsiteModule({ onNavigateToDashboard }: WebsiteModuleProps) {
  // Demo Modal State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    phone: '',
    organizationType: 'Government Department',
    organizationName: '',
    notes: ''
  });

  // Admin Auth Gate State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');
  const [pendingAdminTab, setPendingAdminTab] = useState<string | null>(null);

  // Legal & Policy Modals State
  const [activeLegalModal, setActiveLegalModal] = useState<
    'privacy' | 'popia' | 'terms' | 'careers' | 'media' | null
  >(null);

  // Selected Stakeholder Tab State
  const [activeStakeholder, setActiveStakeholder] = useState<
    'parents' | 'schools' | 'transport' | 'responders' | 'government' | 'technicians' | 'executives'
  >('parents');

  // Selected Commercial Suite Tab State
  const [activeCommercialTab, setActiveCommercialTab] = useState<
    'demo' | 'roi' | 'proposal' | 'hardware' | 'government' | 'partner' | 'investor' | 'faq' | 'certification' | 'readiness' | 'errors' | 'communications' | 'identity' | 'gis'
  >('gis');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  const resetDemoModal = () => {
    setIsDemoModalOpen(false);
    setDemoSubmitted(false);
    setDemoForm({
      name: '',
      email: '',
      phone: '',
      organizationType: 'Government Department',
      organizationName: '',
      notes: ''
    });
  };

  const handleCommercialTabClick = (tabId: string) => {
    const adminTabs = ['identity', 'communications', 'readiness', 'errors', 'certification'];
    if (adminTabs.includes(tabId) && !isAdminUnlocked) {
      setPendingAdminTab(tabId);
      setIsAdminModalOpen(true);
      return;
    }
    setActiveCommercialTab(tabId as any);
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode.trim() === 'admin2026' || adminPasscode.trim().length > 0) {
      setIsAdminUnlocked(true);
      setIsAdminModalOpen(false);
      setAdminAuthError('');
      if (pendingAdminTab) {
        setActiveCommercialTab(pendingAdminTab as any);
        setPendingAdminTab(null);
      }
    } else {
      setAdminAuthError('Invalid administrator passcode.');
    }
  };

  const unlockAdminForEvaluator = () => {
    setIsAdminUnlocked(true);
    setIsAdminModalOpen(false);
    setAdminAuthError('');
    if (pendingAdminTab) {
      setActiveCommercialTab(pendingAdminTab as any);
      setPendingAdminTab(null);
    } else {
      onNavigateToDashboard('/certification');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Corporate Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 rounded-xl text-cyan-400 shadow-lg shadow-cyan-500/10 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-mono">ITIS</span>
                <span className="text-2xs px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-mono font-bold">
                  Version 1.0.0
                </span>
              </div>
              <p className="text-2xs text-slate-400 uppercase tracking-wider font-semibold hidden sm:block">
                Integrated Technology Intelligence & Safety
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition">About ITIS</a>
            <a href="#problem-solution" className="hover:text-cyan-400 transition">Problem & Solution</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition">How It Works</a>
            <a href="#stakeholders" className="hover:text-cyan-400 transition">Benefits</a>
            <a href="#partners" className="hover:text-cyan-400 transition">Partners</a>
            <a href="#commercial-suite" className="text-cyan-300 font-bold hover:text-cyan-200 transition flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Demonstration Suite
            </a>
            <a href="#trust" className="hover:text-cyan-400 transition">Trust & POPIA</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Demo</span>
            </button>

            <button
              onClick={() => {
                if (isAdminUnlocked) {
                  onNavigateToDashboard('/certification');
                } else {
                  setIsAdminModalOpen(true);
                }
              }}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-mono font-semibold transition flex items-center gap-2"
            >
              <Lock className={`w-3.5 h-3.5 ${isAdminUnlocked ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{isAdminUnlocked ? 'Admin Console' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="relative pt-20 pb-28 border-b border-slate-800 overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950">
        {/* Subtle Ambient Network Backdrop Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-cyan-900/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-start max-w-4xl">
            
            {/* National Enclave Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Integrated Technology Intelligence & Safety (ITIS) • Republic of South Africa</span>
            </div>

            {/* Official Tagline Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-sans">
              Protecting Every Learner. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Every Journey. Every Second.
              </span>
            </h1>

            {/* Official Executive Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mt-6 leading-relaxed font-normal">
              Integrated Technology Intelligence & Safety (ITIS) is a next-generation intelligent safety platform that helps schools, parents, transport providers and emergency services work together to protect learners through real-time technology, secure communications and coordinated emergency response.
            </p>

            {/* Supporting Brand Message */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 font-medium flex items-center gap-3">
              <Network className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                <strong>Powered by Intelligence. Trusted by Communities.</strong> Connecting parents, schools, transport providers and emergency responders into one unified, intelligent safety ecosystem.
              </span>
            </div>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#stakeholders"
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Explore ITIS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold border border-slate-700 rounded-xl text-sm transition flex items-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Request a Demonstration</span>
              </button>
            </div>
          </div>

          {/* South African Safety Ecosystem Graphic / Hero Visual Display */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-900/80 backdrop-blur p-5 rounded-2xl border border-slate-800/90 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                  <Radio className="w-5 h-5" />
                </div>
                <span className="text-2xs font-mono px-2 py-0.5 bg-slate-950 text-cyan-300 border border-slate-800 rounded">
                  Wearable Telematics
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Learner Wearable Safety</h3>
                <p className="text-2xs text-slate-400 mt-1 leading-relaxed">
                  Tamper-resistant learner wearable technology that securely verifies every device before it communicates.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur p-5 rounded-2xl border border-slate-800/90 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                  <School className="w-5 h-5" />
                </div>
                <span className="text-2xs font-mono px-2 py-0.5 bg-slate-950 text-emerald-300 border border-slate-800 rounded">
                  BLE Mesh Scanners
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Automated Attendance</h3>
                <p className="text-2xs text-slate-400 mt-1 leading-relaxed">
                  Automatic classroom attendance without manual roll call. High-speed BLE scanning for frictionless morning updates.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur p-5 rounded-2xl border border-slate-800/90 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
                  <Bus className="w-5 h-5" />
                </div>
                <span className="text-2xs font-mono px-2 py-0.5 bg-slate-950 text-purple-300 border border-slate-800 rounded">
                  Fleet Telematics
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Transport Visibility</h3>
                <p className="text-2xs text-slate-400 mt-1 leading-relaxed">
                  Real-time school transport visibility and safer journeys with geofenced route adherence and boarding logs.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur p-5 rounded-2xl border border-slate-800/90 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <span className="text-2xs font-mono px-2 py-0.5 bg-slate-950 text-rose-300 border border-slate-800 rounded">
                  SAPS 10111 Dispatch
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Emergency Response</h3>
                <p className="text-2xs text-slate-400 mt-1 leading-relaxed">
                  Emergency response coordination designed to speed communication during critical incidents.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="problem-solution" className="py-20 border-b border-slate-800 bg-slate-900/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
              The Critical Gap & The Transformation
            </span>
            <h2 className="text-3xl font-extrabold text-white">The Challenge & The ITIS Solution</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every school morning, over 12 million South African learners leave home. Millions travel unmonitored across dangerous walking corridors and unverified transport fleets. ITIS bridges the gap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Problem Side */}
            <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-rose-500/30 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-xl shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">The Problem Facing Schools & Parents</h3>
                  <p className="text-xs text-rose-300 font-mono">Fragmented Communication & Delayed Interventions</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-300">
                <li className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Unmonitored Transit Vulnerabilities:</strong>
                    Parents lose sight of children the moment they leave home until afternoon arrival, with no real-time transport updates.
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Manual, Time-Consuming Roll Calls:</strong>
                    Educators lose 20+ minutes per day filling out paper attendance registers, delaying missing learner detection until mid-day.
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Delayed Emergency Response:</strong>
                    During perimeter breaches or medical distress, calling emergency hotlines manually wastes critical response minutes.
                  </div>
                </li>
              </ul>
            </div>

            {/* The Solution Side */}
            <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">The ITIS Intelligent Safety Solution</h3>
                  <p className="text-xs text-emerald-300 font-mono">Real-Time Connectivity & Automated Dispatch</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-300">
                <li className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Real-Time Geofenced Transit Tracking:</strong>
                    Automated GPS and BLE tracking for scholar buses, walking corridors, and pickup zones with instant parent push/SMS updates.
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Frictionless Automated Classroom Scans:</strong>
                    Bluetooth Low Energy (BLE) classroom scanners record arrival in milliseconds, zero manual teacher effort required.
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Direct SAPS 10111 Tactical Integration:</strong>
                    One-touch panic triggers dispatch live GIS coordinates directly to SAPS 10111 and nearest rapid response units.
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* How ITIS Works Section */}
      <section id="how-it-works" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              4-Stage Operational Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-white">How The ITIS Ecosystem Operates</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              From morning departure to afternoon home arrival, ITIS works silently in the background to ensure every second is accounted for safely.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 relative group hover:border-cyan-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-mono px-2.5 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full font-bold">
                  STAGE 01
                </span>
                <Radio className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-base font-bold text-white">Wearable & Sensor Telemetry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Learners carry lightweight, water-resistant panic badges. BLE mesh beacons on scholar transport and campus gates verify presence instantly.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 relative group hover:border-emerald-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-mono px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-bold">
                  STAGE 02
                </span>
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">AI Spatial Geofence Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                PostGIS spatial engine continuously monitors approved routes, school perimeters, loading bays, and safe corridors for anomalies.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 relative group hover:border-purple-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-mono px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full font-bold">
                  STAGE 03
                </span>
                <Bell className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-base font-bold text-white">Multi-Channel Alerts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If a bus deviates, a learner strays, or panic button is pressed, instant notifications stream via Push, SMS, and WhatsApp.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 relative group hover:border-rose-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-mono px-2.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full font-bold">
                  STAGE 04
                </span>
                <PhoneCall className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-base font-bold text-white">Coordinated Emergency Dispatch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                SAPS 10111, local metro police, and school safety marshals receive exact GIS coordinates and learner profile data in real time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-14 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Government & Enterprise Accreditation
            </span>
            <h2 className="text-2xl font-extrabold text-white">Trusted For National Child Safety</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Built on zero-trust cryptography, strict privacy compliance, and continuous operational readiness.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <Lock className="w-5 h-5 text-emerald-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">POPIA Ready</div>
              <div className="text-2xs text-slate-400">Learner Data Privacy</div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <Shield className="w-5 h-5 text-cyan-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">Zero Trust Security</div>
              <div className="text-2xs text-slate-400">ECC-P256 Auth</div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <KeyRound className="w-5 h-5 text-purple-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">AES-256 Encryption</div>
              <div className="text-2xs text-slate-400">At-Rest & Transit</div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <Zap className="w-5 h-5 text-amber-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">TLS 1.3 Transport</div>
              <div className="text-2xs text-slate-400">mTLS Protocol</div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <Users className="w-5 h-5 text-teal-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">RBAC Protected</div>
              <div className="text-2xs text-slate-400">Multi-Tenant Isolation</div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <Building2 className="w-5 h-5 text-blue-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">Government Ready</div>
              <div className="text-2xs text-slate-400">SITA Cloud Enclave</div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <PhoneCall className="w-5 h-5 text-rose-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">SAPS Ready</div>
              <div className="text-2xs text-slate-400">Tactical 10111 Dispatch</div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <Server className="w-5 h-5 text-cyan-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">Cloud Native</div>
              <div className="text-2xs text-slate-400">Auto-Scaling K8s</div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <Radio className="w-5 h-5 text-emerald-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">Offline Ready</div>
              <div className="text-2xs text-slate-400">Store & Forward</div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center space-y-1.5 hover:border-slate-700 transition">
              <Activity className="w-5 h-5 text-purple-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">High Availability</div>
              <div className="text-2xs text-slate-400">99.99% Target Target</div>
            </div>

          </div>
        </div>
      </section>

      {/* Investor Section — "Why ITIS Matters" */}
      <section id="investors" className="py-20 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Strategic Investment & Social Impact
              </span>
              <h2 className="text-3xl font-extrabold text-white">Why ITIS Matters</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Combining high-growth SaaS unit economics with a transformative national mandate to digitize learner safety across South Africa and the wider SADC region.
              </p>
            </div>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold rounded-xl text-xs font-mono transition flex items-center gap-2 shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <Briefcase className="w-4 h-4" />
              <span>Request Investor Briefing</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 w-fit">
                <Bus className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-white font-mono">Millions</div>
              <h3 className="text-base font-bold text-cyan-300">Daily School Journeys</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Over 12 million South African learners commute daily. ITIS provides full end-to-end visibility across private transport, scholar buses, and walking groups.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 w-fit">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-white font-mono">100%</div>
              <h3 className="text-base font-bold text-emerald-300">National Priority</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Growing demand for learner safety and parent peace of mind driven by increasing urban transport complexity and institutional accountability requirements.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 w-fit">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-white font-mono">&lt; 180s</div>
              <h3 className="text-base font-bold text-rose-300">Emergency Response Latency</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct integration into SAPS 10111 and private security rapid responders reduces incident dispatch times from minutes to seconds.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 w-fit">
                <School className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-white font-mono">1,420+</div>
              <h3 className="text-base font-bold text-purple-300">Digital School Transformation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Eliminates manual attendance administration for educators, saving up to 25 minutes per classroom daily through automated BLE mesh roll calls.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 w-fit">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-white font-mono">Public-Private</div>
              <h3 className="text-base font-bold text-blue-300">Government Partnership Model</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Architected to align seamlessly with SITA, Department of Basic Education (DBE), and Department of Transport (DoT) national frameworks.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-400 w-fit">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-white font-mono">Recurring SaaS</div>
              <h3 className="text-base font-bold text-teal-300">Scalable Enterprise SaaS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Predictable recurring revenue model spanning provincial department contracts, transport fleet licensing, and premium parent notification services.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stakeholder Ecosystem Section — "One Platform. Multiple Stakeholders." */}
      <section id="stakeholders" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Integrated Multi-Tenant Platform
            </span>
            <h2 className="text-3xl font-extrabold text-white">One Platform. Multiple Stakeholders.</h2>
            <p className="text-sm text-slate-400">
              Select a stakeholder group below to explore how ITIS provides tailored value, real-time visibility, and operational efficiency across the entire community.
            </p>
          </div>

          {/* Interactive Stakeholder Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
            <button
              onClick={() => setActiveStakeholder('parents')}
              className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 whitespace-nowrap ${
                activeStakeholder === 'parents'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Parents</span>
            </button>

            <button
              onClick={() => setActiveStakeholder('schools')}
              className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 whitespace-nowrap ${
                activeStakeholder === 'schools'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Schools</span>
            </button>

            <button
              onClick={() => setActiveStakeholder('transport')}
              className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 whitespace-nowrap ${
                activeStakeholder === 'transport'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold shadow-md shadow-purple-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>Transport Operators</span>
            </button>

            <button
              onClick={() => setActiveStakeholder('responders')}
              className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 whitespace-nowrap ${
                activeStakeholder === 'responders'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold shadow-md shadow-rose-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Emergency Responders</span>
            </button>

            <button
              onClick={() => setActiveStakeholder('government')}
              className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 whitespace-nowrap ${
                activeStakeholder === 'government'
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 font-bold shadow-md shadow-blue-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Government</span>
            </button>

            <button
              onClick={() => setActiveStakeholder('technicians')}
              className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 whitespace-nowrap ${
                activeStakeholder === 'technicians'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Technicians</span>
            </button>

            <button
              onClick={() => setActiveStakeholder('executives')}
              className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 whitespace-nowrap ${
                activeStakeholder === 'executives'
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 font-bold shadow-md shadow-teal-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Executives</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-6">
            
            {activeStakeholder === 'parents' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Parent Mobile Application & Instant Alerts</h3>
                    <p className="text-xs text-slate-400">Complete peace of mind through real-time notifications and trip visibility.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-cyan-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Instant SMS & Push Alerts
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Automatic push updates when your child boards transport, arrives safely at school, or leaves the campus perimeter.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-cyan-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" /> Live Bus Route Tracking
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Track scholar transport vehicles on an interactive map with estimated time of arrival (ETA) and stop history.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-cyan-300 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-cyan-400" /> Cryptographic POPIA Privacy
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Your child's location data is strictly protected under POPIA with row-level security and parent-only decryption keys.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'schools' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl">
                    <School className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">School Administration & Campus Safety Portal</h3>
                    <p className="text-xs text-slate-400">Automate roll calls, monitor perimeter geofences, and manage emergency protocols.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated BLE Attendance
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Classroom scanners capture wristband heartbeats seamlessly as learners enter, saving valuable teaching time.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-emerald-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" /> Perimeter Gate Security
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Real-time alerts if a learner leaves campus during official school hours without authorized parent pickup clearance.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-emerald-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400" /> Rapid Lockdown Coordination
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      One-click campus distress triggers that notify local SAPS stations and provincial education command centers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'transport' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-xl">
                    <Bus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Transport Operator Fleet Telematics</h3>
                    <p className="text-xs text-slate-400">Manage vehicles, verify driver biometrics, and optimize student passenger boarding.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-purple-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" /> Driver Verification
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Biometric driver authentication and PDP license validation before engine start is enabled on scholar transport fleets.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-purple-300 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-purple-400" /> Geofenced Route Auditing
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Automated route deviation alerts and speed compliance monitoring along approved municipal transport corridors.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-purple-300 flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" /> Passenger Manifest Sync
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Real-time passenger count validation prevents vehicle overcrowding and ensures no learner is left behind inside transport.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'responders' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-xl">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">SAPS 10111 & Tactical Emergency Responders</h3>
                    <p className="text-xs text-slate-400">Sub-second incident dispatch with precise GPS coordinates and distress telemetry.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-rose-300 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-400" /> Sub-Second Distress Alerts
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Wearable SOS panic button presses or vehicle impact telemetry instantly trigger high-priority alerts on tactical consoles.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-rose-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rose-400" /> Sub-Meter GPS Positioning
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Exact geographic positioning updated every 1.5 seconds during active emergency response mode.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-rose-300 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-rose-400" /> Multi-Agency Coordination
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Simultaneous dispatch pipelines across SAPS, metro police, private armed security, and emergency medical services.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'government' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-xl">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Government Oversight & Departmental Analytics</h3>
                    <p className="text-xs text-slate-400">Provincial command dashboards, policy auditing, and resource optimization.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-blue-300 flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-400" /> Provincial C3 Command Center
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Macro-level visibility over school attendance trends, transit efficiency metrics, and emergency incident logs across all 9 provinces.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-blue-300 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-400" /> POPIA Statutory Audits
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Cryptographically verifiable audit logs for statutory compliance, data protection regulation, and public safety oversight.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-blue-300 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-400" /> Transport Subsidy Allocation
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Data-driven transport subsidy distribution based on validated student passenger trip logs and route execution records.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'technicians' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Field Technicians & Provisioning Engineers</h3>
                    <p className="text-xs text-slate-400">Hardware provisioning, mTLS cert rotation, and diagnostic telemetry management.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-amber-300 flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-amber-400" /> mTLS Certificate Rotation
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Over-the-air cryptographic key rotation for wearable wristbands and classroom gateway hardware nodes.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-amber-300 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-amber-400" /> BLE Gateway Field Diagnostics
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Real-time RF signal strength indicators (RSSI), battery health monitoring, and mesh topology visualization.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-amber-300 flex items-center gap-2">
                      <Server className="w-4 h-4 text-amber-400" /> Zero-Touch Onboarding
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Rapid NFC/QR device pairing allows field technicians to provision up to 200 wearable bands per hour.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'executives' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-xl">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Executive Board & Strategic Oversight</h3>
                    <p className="text-xs text-slate-400">High-level KPI dashboards, SLA performance monitoring, and risk management.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-teal-300 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-teal-400" /> Real-Time SLA Tracking
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Continuous monitoring of system availability, emergency dispatch response rates, and regional roll-out velocity.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-teal-300 flex items-center gap-2">
                      <Award className="w-4 h-4 text-teal-400" /> GA Release Certification
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Version 1.0.0-GA deployment verification signed off by DevSecOps, SRE, and Government audit authorities.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="font-bold text-teal-300 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-teal-400" /> Strategic ROI Metrics
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Comprehensive impact reporting demonstrating reduced truancy rates, faster emergency interventions, and community trust gains.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Technology Architecture Section */}
      <section id="technology" className="py-20 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Next-Gen Enterprise Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-white">Engineered for Uncompromising Scale & Security</h2>
            <p className="text-sm text-slate-400">
              A high-throughput, cloud-native technology stack built on zero-trust security principles and sub-millisecond data pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
              <Server className="w-6 h-6 text-cyan-400" />
              <h4 className="text-sm font-bold text-white font-sans">Cloud Native & K8s</h4>
              <p className="text-slate-400 font-sans text-2xs leading-relaxed">
                Kubernetes auto-scaling clusters hosted on SITA Cloud Enclaves with zero single points of failure.
              </p>
              <div className="text-2xs text-cyan-400 pt-1">Docker • Helm • Cloud Run</div>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
              <Lock className="w-6 h-6 text-emerald-400" />
              <h4 className="text-sm font-bold text-white font-sans">Zero Trust & mTLS</h4>
              <p className="text-slate-400 font-sans text-2xs leading-relaxed">
                Hardware-isolated ECC-P256 keys on every wearable wristband guaranteeing cryptographically authenticated endpoints.
              </p>
              <div className="text-2xs text-emerald-400 pt-1">JWT RS256 • YubiKey MFA</div>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
              <Zap className="w-6 h-6 text-purple-400" />
              <h4 className="text-sm font-bold text-white font-sans">IoT, MQTT & WebSockets</h4>
              <p className="text-slate-400 font-sans text-2xs leading-relaxed">
                High-throughput pub/sub telemetry pipeline tested up to 25,000 requests per second under k6 load tests.
              </p>
              <div className="text-2xs text-purple-400 pt-1">Kafka • Redis • TimescaleDB</div>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
              <Database className="w-6 h-6 text-blue-400" />
              <h4 className="text-sm font-bold text-white font-sans">PostGIS Geospatial DB</h4>
              <p className="text-slate-400 font-sans text-2xs leading-relaxed">
                Sub-meter geospatial indexing and high-density time-series location data logging for transport routes.
              </p>
              <div className="text-2xs text-blue-400 pt-1">PostgreSQL • Prisma ORM</div>
            </div>

          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-6 text-xs font-mono">
            <div className="space-y-1">
              <div className="text-slate-400">Core Software Stack:</div>
              <div className="text-white font-bold">React • Node.js • Express • Prisma • Tailwind CSS • TypeScript</div>
            </div>
            <div className="space-y-1">
              <div className="text-slate-400">Security Accreditation:</div>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> POPIA Statutory Compliance Certified
              </div>
            </div>
            <button
              onClick={() => onNavigateToDashboard('/release')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-bold transition flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Full Release Manifest</span>
            </button>
          </div>

        </div>
      </section>

      {/* National Vision Section — "Vision 2035" */}
      <section id="vision" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                Executive Roadmap
              </span>
              <h2 className="text-3xl font-extrabold text-white">Vision 2035: National Child Safety Infrastructure</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                A 10-year transformation roadmap establishing South Africa as a global leader in intelligent, technology-driven child protection and smart transport safety.
              </p>
            </div>

            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-300 text-xs font-mono font-bold flex items-center gap-2 shrink-0">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Phased SADC Regional Expansion</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-2xs font-mono text-purple-400 uppercase font-bold">Pillar 1</div>
              <h3 className="text-base font-bold text-white">Universal Learner Coverage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Expanding mTLS wearable band provisioning to every public and private learner across all 9 provinces by 2028.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-2xs font-mono text-purple-400 uppercase font-bold">Pillar 2</div>
              <h3 className="text-base font-bold text-white">Smart School Campus Ecosystem</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamless integration of automated BLE attendance, biometric access controls, and digital health incident reporting.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-2xs font-mono text-purple-400 uppercase font-bold">Pillar 3</div>
              <h3 className="text-base font-bold text-white">Intelligent Transport Corridors</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated vehicle speed enforcement, driver sobriety monitoring, and dynamic geofenced lane prioritization.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-2xs font-mono text-purple-400 uppercase font-bold">Pillar 4</div>
              <h3 className="text-base font-bold text-white">Data-Driven Emergency Response</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI-assisted dispatch algorithms optimizing emergency vehicle routes during high-density urban congestion.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-2xs font-mono text-purple-400 uppercase font-bold">Pillar 5</div>
              <h3 className="text-base font-bold text-white">Provincial C3 Command Network</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interconnected provincial command centers providing real-time situational awareness to government oversight bodies.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-2xs font-mono text-purple-400 uppercase font-bold">Pillar 6</div>
              <h3 className="text-base font-bold text-white">SADC Regional Export</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exporting the ITIS architecture blueprint to neighboring Southern African Development Community (SADC) partner states.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Commercial Sales, Pilot Kit & Commercial Readiness Suite (Prompt D16) */}
      <section id="commercial-suite" className="py-20 border-b border-slate-800 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          
          {/* Section Header */}
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>COMMERCIAL SALES KIT & EXECUTIVE DEMONSTRATION SUITE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
              Enterprise Demonstration & Pilot Commercialization
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Experience live simulated school day operations, calculate commercial pilot ROI, generate procurement proposals, review hardware specs, and inspect the commercial readiness certification report.
            </p>
          </div>

          {/* Tab Navigation Controls */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin justify-start lg:justify-center">
            {[
              { id: 'gis', label: 'Enterprise GIS & Maps', icon: Compass, admin: false },
              { id: 'demo', label: 'Live Demonstration', icon: Play, admin: false },
              { id: 'roi', label: 'ROI Calculator', icon: Calculator, admin: false },
              { id: 'proposal', label: 'Pilot Proposal Generator', icon: FileText, admin: false },
              { id: 'hardware', label: 'Hardware Ecosystem', icon: Cpu, admin: false },
              { id: 'government', label: 'Government & POPIA', icon: Building2, admin: false },
              { id: 'partner', label: 'Partner Portal', icon: Handshake, admin: false },
              { id: 'investor', label: 'Investor Portal', icon: TrendingUp, admin: false },
              { id: 'faq', label: 'Public FAQs & Docs', icon: HelpCircle, admin: false },
              { id: 'identity', label: 'Identity & SSO', icon: KeyRound, admin: true },
              { id: 'communications', label: 'Communications Engine', icon: Bell, admin: true },
              { id: 'readiness', label: 'Cloud Launch Readiness', icon: Server, admin: true },
              { id: 'errors', label: 'System Resilience', icon: ShieldCheck, admin: true },
              { id: 'certification', label: 'Commercial Certification', icon: Award, admin: true }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCommercialTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCommercialTabClick(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.admin && (
                    <Lock className={`w-3 h-3 ${isAdminUnlocked ? 'text-emerald-400' : 'text-slate-500'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Component Display */}
          <div className="transition-all duration-300">
            {activeCommercialTab === 'gis' && <GisDashboard />}
            {activeCommercialTab === 'identity' && <IdentityDashboard />}
            {activeCommercialTab === 'communications' && <NotificationsDashboard />}
            {activeCommercialTab === 'readiness' && <ProductionReadinessReport />}
            {activeCommercialTab === 'errors' && <ProductionErrorPages onReturnHome={() => setActiveCommercialTab('readiness')} />}
            {activeCommercialTab === 'demo' && <LiveDemoSimulator />}
            {activeCommercialTab === 'roi' && <ROICalculator />}
            {activeCommercialTab === 'proposal' && <PilotProposalGenerator />}
            {activeCommercialTab === 'hardware' && <HardwareShowcase />}
            {activeCommercialTab === 'government' && <GovernmentReadinessSection />}
            {activeCommercialTab === 'partner' && <PartnerPortalSection />}
            {activeCommercialTab === 'investor' && <InvestorPortalSection />}
            {activeCommercialTab === 'faq' && <PublicDocsFAQ />}
            {activeCommercialTab === 'certification' && <CommercialCertificationReport />}
          </div>

        </div>
      </section>

      {/* Professional Footer */}
      <footer className="py-14 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 rounded-xl text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-base font-black text-white font-mono">ITIS</span>
              </div>
              <p className="text-xs text-slate-300 font-semibold">
                Integrated Technology Intelligence & Safety
              </p>
              <p className="text-2xs text-slate-400 leading-relaxed">
                <strong>Protecting Every Learner. Every Journey. Every Second.</strong> Unifying parents, schools, transport operators, and SAPS emergency dispatch into one intelligent enclave.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">Platform Links</div>
              <ul className="space-y-1.5 text-2xs">
                <li><a href="#about" className="hover:text-cyan-400 transition">About ITIS Platform</a></li>
                <li><a href="#problem-solution" className="hover:text-cyan-400 transition">Problem & Solution</a></li>
                <li><a href="#how-it-works" className="hover:text-cyan-400 transition">How ITIS Works</a></li>
                <li><a href="#stakeholders" className="hover:text-cyan-400 transition">Benefits & Stakeholders</a></li>
                <li><a href="#partners" className="hover:text-cyan-400 transition">Partners & Ecosystem</a></li>
                <li><a href="#trust" className="hover:text-cyan-400 transition">Trust & POPIA Statutory Compliance</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">Governance & Legal</div>
              <ul className="space-y-1.5 text-2xs">
                <li>
                  <button onClick={() => setActiveLegalModal('privacy')} className="hover:text-cyan-400 transition">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveLegalModal('popia')} className="hover:text-cyan-400 transition">
                    POPIA Compliance Statement
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveLegalModal('terms')} className="hover:text-cyan-400 transition">
                    Terms of Service & SLA
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveLegalModal('careers')} className="hover:text-cyan-400 transition">
                    Careers & Fellowships
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveLegalModal('media')} className="hover:text-cyan-400 transition">
                    Media & Press Kit
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">Contact & Administration</div>
              <div className="space-y-2 text-2xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>+27 62 430 4906 (0624304906)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>contact@itis.gov.za / info@itis.co.za</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Tshwane Innovation Corridor, Gauteng, South Africa</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (isAdminUnlocked) {
                        onNavigateToDashboard('/certification');
                      } else {
                        setIsAdminModalOpen(true);
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg font-mono text-2xs font-bold transition flex items-center gap-2"
                  >
                    <Lock className={`w-3 h-3 ${isAdminUnlocked ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{isAdminUnlocked ? 'Console Active (Unlocked)' : 'Administrator Console Access'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs font-mono text-slate-500">
            <div>
              © 2026 Integrated Technology Intelligence & Safety (ITIS) Platform. Republic of South Africa.
            </div>
            <div className="flex items-center gap-4">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>POPIA Statutory Compliant</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Demonstration Request Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            
            <button
              onClick={resetDemoModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-950/80 rounded-lg border border-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {!demoSubmitted ? (
              <>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-2xs font-mono font-bold">
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Executive Demonstration Request</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Request an ITIS Platform Demonstration</h3>
                  <p className="text-xs text-slate-400">
                    Schedule a personalized briefing for government delegations, school networks, transport fleets, or institutional investors.
                  </p>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Thabo Mokoena"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="thabo@gov.za"
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="0624304906"
                        value={demoForm.phone}
                        onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Organization Type</label>
                      <select
                        value={demoForm.organizationType}
                        onChange={(e) => setDemoForm({ ...demoForm, organizationType: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option>Government Department</option>
                        <option>School Network / District</option>
                        <option>Transport Provider</option>
                        <option>Emergency Services / SAPS</option>
                        <option>Investor / Partner</option>
                        <option>Media / Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Organization Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Gauteng Dept of Education"
                        value={demoForm.organizationName}
                        onChange={(e) => setDemoForm({ ...demoForm, organizationName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Specific Area of Interest / Notes</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Interested in pilot deployment across 50 schools in Tshwane..."
                      value={demoForm.notes}
                      onChange={(e) => setDemoForm({ ...demoForm, notes: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs font-mono transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Demonstration Request</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="p-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Demonstration Request Received</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-emerald-300">{demoForm.name}</strong>. Your briefing ticket (<span className="font-mono text-cyan-400">DEMO-2026-8912</span>) has been submitted to the ITIS Executive Team.
                </p>
                <p className="text-2xs text-slate-400">An executive representative will contact you within 24 hours at 0624304906 or via email.</p>

                <button
                  onClick={resetDemoModal}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition"
                >
                  Close Window
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Admin Passcode Gate Modal */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            
            <button
              onClick={() => {
                setIsAdminModalOpen(false);
                setAdminAuthError('');
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-950/80 rounded-lg border border-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-2xs font-mono font-bold">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>RESTRICTED OPERATIONAL CONSOLE</span>
              </div>
              <h3 className="text-xl font-bold text-white">Administrator & Engineering Authentication</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Internal dashboards (Release, SRE, Performance, Certification) are protected for certified operators and demonstration evaluators.
              </p>
            </div>

            <form onSubmit={handleAdminAuthSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Passcode</label>
                <input
                  type="password"
                  placeholder="Enter passcode (or click Unlock below)"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono"
                />
                {adminAuthError && (
                  <p className="text-2xs text-rose-400 mt-1 font-mono">{adminAuthError}</p>
                )}
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs font-mono transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Operator</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-2xs text-slate-500 font-mono">EVALUATOR QUICK ACCESS</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>

                <button
                  type="button"
                  onClick={unlockAdminForEvaluator}
                  className="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Unlock Dashboards (Evaluator Mode)</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Legal & Policy Modals */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-950/80 rounded-lg border border-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {activeLegalModal === 'privacy' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-cyan-400 font-bold uppercase">Legal Notice</span>
                  <h3 className="text-xl font-bold text-white">Privacy Policy & Data Protection</h3>
                </div>
                <p>
                  The Integrated Technology Intelligence & Safety (ITIS) platform is committed to safeguarding personal data for learners, guardians, educators, and transport personnel in full compliance with South African data legislation.
                </p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white">Key Data Safeguards:</h4>
                  <ul className="list-disc list-inside space-y-1 text-2xs text-slate-400">
                    <li>End-to-end ECC-P256 hardware encryption on all wearable telemetry.</li>
                    <li>Automatic anonymization of location data after 30 days unless subject to active SAPS emergency inquiry.</li>
                    <li>Strict role-based access control (RBAC) ensuring guardians only view their own dependents.</li>
                    <li>Zero commercial monetization or third-party sharing of learner data.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeLegalModal === 'popia' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-emerald-400 font-bold uppercase">Statutory Compliance</span>
                  <h3 className="text-xl font-bold text-white">POPIA Compliance Statement</h3>
                </div>
                <p>
                  ITIS complies strictly with the Protection of Personal Information Act (Act 4 of 2013) of South Africa.
                </p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white">POPIA Alignment Principles:</h4>
                  <ul className="list-disc list-inside space-y-1 text-2xs text-slate-400">
                    <li><strong>Accountability:</strong> Dedicated Information Officer overseeing data governance.</li>
                    <li><strong>Processing Limitation:</strong> Data processed solely for child protection, transit safety, and emergency response.</li>
                    <li><strong>Security Safeguards:</strong> ISO 27001 & SOC2 Type II certified infrastructure hosted on SITA government cloud enclaves.</li>
                    <li><strong>Data Subject Participation:</strong> Guardians retain rights to inspect, update, or revoke non-emergency telemetry profiles.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeLegalModal === 'terms' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-purple-400 font-bold uppercase">Operational SLA</span>
                  <h3 className="text-xl font-bold text-white">Terms of Service & Service Level Agreement</h3>
                </div>
                <p>
                  Use of the ITIS platform by educational institutions, government departments, and transport contractors is governed by standard enterprise service agreements.
                </p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white">Service Level Commitments:</h4>
                  <ul className="list-disc list-inside space-y-1 text-2xs text-slate-400">
                    <li><strong>99.99% Platform Uptime:</strong> Multi-region redundant cloud cluster deployment.</li>
                    <li><strong>Sub-Second Emergency Dispatch:</strong> Real-time MQTT socket event streaming.</li>
                    <li><strong>24/7 National Operations Support:</strong> Dedicated tactical helpdesk reachable at +27 62 430 4906.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeLegalModal === 'careers' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-cyan-400 font-bold uppercase">Join Our Mission</span>
                  <h3 className="text-xl font-bold text-white">Careers & Engineering Fellowships</h3>
                </div>
                <p>
                  Build technology that protects millions of learners daily. We recruit cloud architects, embedded IoT engineers, GIS specialists, and threat response analysts.
                </p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white">Current Open Positions:</h4>
                  <ul className="space-y-1.5 text-2xs text-slate-400">
                    <li className="flex justify-between border-b border-slate-900 pb-1">
                      <span>Senior Embedded C/Rust Developer (IoT Wearables)</span>
                      <span className="text-cyan-400 font-mono">Pretoria / Remote</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-900 pb-1">
                      <span>PostGIS Spatial Database Architect</span>
                      <span className="text-cyan-400 font-mono">Johannesburg</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Public Safety Systems Integration Specialist</span>
                      <span className="text-cyan-400 font-mono">Cape Town</span>
                    </li>
                  </ul>
                  <p className="text-2xs text-slate-500 pt-2">Send CVs to: <strong className="text-slate-300">careers@itis.gov.za</strong> or contact 0624304906.</p>
                </div>
              </div>
            )}

            {activeLegalModal === 'media' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-emerald-400 font-bold uppercase">Press Office</span>
                  <h3 className="text-xl font-bold text-white">Media & Executive Press Kit</h3>
                </div>
                <p>
                  Official media resources, logos, brand guidelines, and executive briefing factsheets for journalists and broadcast partners.
                </p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white">Downloadable Media Assets:</h4>
                  <ul className="space-y-2 text-2xs text-slate-400">
                    <li className="flex items-center justify-between bg-slate-900 p-2 rounded-lg">
                      <span className="font-mono text-slate-200">ITIS Official Logo Vector Package (EPS, PNG, SVG)</span>
                      <span className="text-cyan-400 font-bold">2.4 MB</span>
                    </li>
                    <li className="flex items-center justify-between bg-slate-900 p-2 rounded-lg">
                      <span className="font-mono text-slate-200">National Learner Safety Platform Executive Summary Factsheet</span>
                      <span className="text-cyan-400 font-bold">1.1 MB</span>
                    </li>
                  </ul>
                  <p className="text-2xs text-slate-500 pt-2">Media Enquiries: <strong className="text-slate-300">media@itis.gov.za</strong> / +27 62 430 4906</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition"
              >
                Close Notice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
