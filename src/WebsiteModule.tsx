import React, { useState } from 'react';
import { 
  ShieldCheck, 
  School, 
  Radio, 
  Users, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Activity, 
  PhoneCall, 
  Building2, 
  MapPin, 
  Sparkles, 
  Bus, 
  Cpu, 
  Smartphone, 
  FileText, 
  Mail, 
  X, 
  Send, 
  Check, 
  HelpCircle, 
  User, 
  Phone,
  AlertTriangle
} from 'lucide-react';

import { EnterprisePortalSuite, UserProfile } from './components/auth/EnterprisePortalSuite';
import { HardwareShowcase } from './components/HardwareShowcase';
import { GovernmentReadinessSection } from './components/GovernmentReadinessSection';
import { PublicDocsFAQ } from './components/PublicDocsFAQ';
import { CommercialCertificationReport } from './components/CommercialCertificationReport';
import { NotificationsDashboard } from './components/notifications/NotificationsDashboard';
import { GisDashboard } from './components/gis/GisDashboard';
import { DeviceLifecycleModule } from './components/DeviceLifecycleModule';
import { CommercialCRMModule } from './components/CommercialCRMModule';
import { FinancialProcurementModule } from './components/FinancialProcurementModule';
import { AIDecisionIntelligenceModule } from './components/AIDecisionIntelligenceModule';
import { CommandCentreModule } from './components/CommandCentreModule';

interface WebsiteModuleProps {
  onNavigateToDashboard: (route: string) => void;
}

export function WebsiteModule({ onNavigateToDashboard }: WebsiteModuleProps) {
  // Portal & Authentication Gateway State
  const [portalUser, setPortalUser] = useState<UserProfile | null>(null);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);

  // Demo Request Modal State
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

  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  // Legal & Policy Modals State
  const [activeLegalModal, setActiveLegalModal] = useState<
    'privacy' | 'popia' | 'terms' | 'careers' | 'media' | null
  >(null);

  // Selected Stakeholder Tab State
  const [activeStakeholder, setActiveStakeholder] = useState<
    'parents' | 'schools' | 'transport' | 'responders' | 'government' | 'communities'
  >('parents');

  // Selected Ecosystem Tab State
  const [activeEcosystemTab, setActiveEcosystemTab] = useState<
    'tech' | 'partners'
  >('tech');

  // Selected Public Showcase Tab State
  const [activeCommercialTab, setActiveCommercialTab] = useState<
    'government' | 'faq'
  >('government');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
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

  // IF USER IS AUTHENTICATED: SHOW FULL ROLE PORTAL SUITE
  if (portalUser) {
    return (
      <EnterprisePortalSuite
        currentUser={portalUser}
        onLogin={(u) => setPortalUser(u)}
        onLogout={() => setPortalUser(null)}
        onNavigateToTab={(tab) => {
          if (tab === 'release' || tab === 'certification') {
            onNavigateToDashboard('/certification');
          }
        }}
        childrenComponents={{
          gisDashboard: <GisDashboard />,
          deviceLifecycle: <DeviceLifecycleModule />,
          commercialReport: <CommercialCertificationReport />,
          notifications: <NotificationsDashboard />,
          commercialCrm: <CommercialCRMModule />,
          financialModule: <FinancialProcurementModule />,
          aiIntelligenceModule: <AIDecisionIntelligenceModule />,
          commandCentreModule: <CommandCentreModule />
        }}
      />
    );
  }

  // PUBLIC WEBSITE VIEW
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-4 sm:px-8 py-3.5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative p-1 bg-gradient-to-br from-amber-500/20 via-blue-950/50 to-slate-950 border border-amber-500/40 rounded-xl shadow-lg shadow-amber-500/10 shrink-0">
              <img 
                src="/branding/itis-logo.png" 
                alt="ITIS Logo" 
                className="w-10 h-10 object-contain rounded-lg drop-shadow-[0_0_10px_rgba(245,158,11,0.25)]" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-mono">ITIS</span>
                <span className="text-3xs px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Enterprise Platform
                </span>
              </div>
              <p className="text-3xs text-slate-400 uppercase tracking-wider font-semibold hidden sm:block">
                Integrated Technology Intelligence & Safety
              </p>
            </div>
          </div>

          {/* Navigation Menu Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#about" className="hover:text-amber-400 transition">Vision</a>
            <a href="#solutions" className="hover:text-amber-400 transition">Solutions</a>
            <a href="#how-it-works" className="hover:text-amber-400 transition">How It Works</a>
            <a href="#benefits" className="hover:text-amber-400 transition">Benefits</a>
            <a 
              href="#partners" 
              onClick={() => setActiveEcosystemTab('partners')} 
              className="hover:text-amber-400 transition"
            >
              Partners
            </a>
            <a 
              href="#demo-suite" 
              onClick={() => {
                setActiveEcosystemTab('tech');
                setActiveCommercialTab('government');
              }} 
              className="text-amber-300 font-bold hover:text-amber-200 transition flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Government Brief
            </a>
            <a href="#contact" className="hover:text-amber-400 transition">Contact</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Demo</span>
            </button>

            <button
              onClick={() => setIsPortalModalOpen(true)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-mono font-semibold transition flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Login to Portal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="relative pt-16 pb-24 border-b border-slate-800/80 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-amber-500/10 via-blue-950/20 to-transparent pointer-events-none" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-blue-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Integrated Technology Intelligence & Safety (ITIS)</span>
              </div>

              {/* Primary Tagline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-sans">
                Protecting Every Learner. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                  Every Journey. Every Second.
                </span>
              </h1>

              {/* Secondary Tagline */}
              <p className="text-lg sm:text-xl font-bold text-slate-200 font-mono tracking-wide">
                Powered by Intelligence. Trusted by Communities.
              </p>

              <p className="text-base text-slate-300 leading-relaxed font-normal">
                ITIS is South Africa's leading national child safety and school transport protection platform, uniting parents, schools, fleet operators, SAPS, and emergency medical services into a seamless real-time safety enclave.
              </p>

              {/* Hero Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#solutions"
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold rounded-xl text-sm transition flex items-center gap-2 shadow-xl shadow-amber-500/20"
                >
                  <span>Explore ITIS</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold border border-slate-700 rounded-xl text-sm transition flex items-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Request Demonstration</span>
                </button>

                <button
                  onClick={() => setIsPortalModalOpen(true)}
                  className="px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold border border-amber-500/40 rounded-xl text-sm transition flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Portal Login</span>
                </button>
              </div>

            </div>

            {/* Right Column: Official Showcase Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-sm">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-blue-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition duration-500 opacity-80" />

                <div className="relative bg-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 space-y-5 shadow-2xl text-center">
                  
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <span className="text-2xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      ITIS Safety
                    </span>
                    <span className="text-3xs font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-bold">
                      REPUBLIC OF SOUTH AFRICA
                    </span>
                  </div>

                  <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 p-2 bg-slate-900 rounded-full border-2 border-amber-500/50 shadow-inner flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src="/branding/itis-logo.png" 
                      alt="ITIS Logo" 
                      className="w-full h-full object-cover rounded-full drop-shadow-[0_0_15px_rgba(245,158,11,0.35)]" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-sm font-extrabold text-white tracking-wide font-mono">
                      UNCOMPROMISED SAFETY.
                    </div>
                    <p className="text-2xs text-amber-300/90 font-mono">
                      Protecting. Monitoring. Responding. Every Life. Every Second.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-around text-3xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> POPIA Compliant
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> 24/7 Command Centre
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 1: National Vision */}
      <section className="py-20 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-2xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
              National Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Safer South Africa for Every Learner
            </h2>
            <p className="text-slate-400 text-sm">
              ITIS combines cellular IoT wearables, BLE classroom gateways, transport CAN-bus tracking, and direct emergency responder dispatch into a unified national safety infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                title: 'National Child Safety',
                desc: 'Continuous real-time wearable protection preventing abductions and lost children across South Africa.',
                icon: ShieldCheck,
                color: 'text-amber-400'
              },
              {
                title: 'Safer School Transport',
                desc: 'Real-time GPS bus tracking, driver verification, collision detection, and instant off-route panic alerts.',
                icon: Bus,
                color: 'text-cyan-400'
              },
              {
                title: 'Smart & Secure Schools',
                desc: 'Automated BLE gate check-ins, instant classroom attendance, and digital visitor NFC access logging.',
                icon: School,
                color: 'text-emerald-400'
              },
              {
                title: 'Community Partnerships',
                desc: 'Connecting parent committees, local neighborhood watch, and private security into one responder grid.',
                icon: Users,
                color: 'text-purple-400'
              },
              {
                title: 'Government Collaboration',
                desc: 'Oversight tools for provincial departments of education, SAPS C3 dispatch, and municipal transport leads.',
                icon: Building2,
                color: 'text-blue-400'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 hover:border-amber-500/40 transition group">
                  <div className={`p-3 bg-slate-950 rounded-2xl w-fit ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white font-sans group-hover:text-amber-300 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 2: How ITIS Works (4-Step Process) */}
      <section id="how-it-works" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-2xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How ITIS Protects Learners
            </h2>
            <p className="text-slate-400 text-sm">
              Simple, secure, and automated from morning pickup to afternoon drop-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Register Learner',
                desc: 'Parents or school administrators securely enroll the learner profile and emergency guardian contact numbers into the POPIA-compliant database.',
                icon: User,
                badge: 'Secure Enrollment'
              },
              {
                step: '02',
                title: 'Assign Wearable',
                desc: 'A rugged IP68 cellular/BLE band is linked to the learner via quick NFC tap or QR scan. Features 14-day battery life and latching panic button.',
                icon: Smartphone,
                badge: 'Rugged Wearable'
              },
              {
                step: '03',
                title: 'Monitor Safely',
                desc: 'BLE gateways log school gate arrivals and classroom attendance. Transport buses track route compliance with CAN-bus telemetry.',
                icon: Activity,
                badge: 'Continuous Monitoring'
              },
              {
                step: '04',
                title: 'Respond Instantly',
                desc: 'In case of SOS activation or geofence breaches, the 24/7 Command Centre receives live GPS tracking and dispatches SAPS/EMS immediately.',
                icon: Radio,
                badge: 'Instant Dispatch'
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 relative overflow-hidden group hover:border-cyan-500/50 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-700 font-mono group-hover:text-cyan-400 transition">
                      {step.step}
                    </span>
                    <span className="text-3xs font-mono px-2 py-0.5 bg-slate-950 text-slate-300 border border-slate-800 rounded-full">
                      {step.badge}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl w-fit text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white font-sans">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 3: Essential Business Features */}
      <section id="solutions" className="py-20 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-2xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Essential Safety Modules
            </h2>
            <p className="text-slate-400 text-sm">
              Comprehensive child safety features engineered for South African schools, municipalities, and transport networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'GPS Wearable Protection',
                desc: 'IP68 water-resistant smart band featuring multi-constellation GPS/Cellular tracking and 14-day battery capacity.',
                icon: Smartphone
              },
              {
                title: 'Smart Attendance Automation',
                desc: 'Automated BLE classroom check-ins eliminate manual roll calls and notify parents immediately if a child is absent.',
                icon: CheckCircle2
              },
              {
                title: 'Fleet Transport Monitoring',
                desc: 'Real-time bus location tracking, CAN-bus speed analytics, driver biometric verification, and off-route alerts.',
                icon: Bus
              },
              {
                title: 'SOS Panic Button Latch',
                desc: 'Latching double-press emergency button on wearable band sends instant high-priority GPS alerts to guardians and police.',
                icon: AlertTriangle
              },
              {
                title: 'Parent WhatsApp & SMS Alerts',
                desc: 'Instant notifications sent to guardians upon bus boarding, school gate arrival, and safe arrival home.',
                icon: Mail
              },
              {
                title: 'Emergency Response Dispatch',
                desc: 'Direct integration with SAPS 10111, municipal EMS, and private security armed response units.',
                icon: Radio
              },
              {
                title: 'Digital School Safety Perimeter',
                desc: 'Geofenced safety boundaries around school grounds trigger immediate alerts if a child exits unauthorized.',
                icon: MapPin
              },
              {
                title: 'POPIA & Data Privacy Compliance',
                desc: 'Strict POPIA data protection with end-to-end encryption for learner biometrics and personal information.',
                icon: ShieldCheck
              },
              {
                title: '24/7 National Command Centre',
                desc: 'Centralized tactical dispatch centre operating 24 hours a day with dedicated emergency call handlers.',
                icon: PhoneCall
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 hover:border-emerald-500/40 transition">
                  <div className="p-3 bg-slate-950 rounded-2xl w-fit text-emerald-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white font-sans">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 4: Benefits for Stakeholders */}
      <section id="benefits" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-2xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
              Stakeholder Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built for the Entire Ecosystem
            </h2>
            <p className="text-slate-400 text-sm">
              Tailored benefits designed specifically for parents, educators, drivers, government leaders, and emergency responders.
            </p>
          </div>

          {/* Stakeholder Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'parents', label: 'Parents & Guardians', icon: User },
              { id: 'schools', label: 'Schools & Principals', icon: School },
              { id: 'transport', label: 'Transport Operators', icon: Bus },
              { id: 'government', label: 'Government & Municipalities', icon: Building2 },
              { id: 'responders', label: 'Emergency Services (SAPS & EMS)', icon: Radio },
              { id: 'communities', label: 'Local Communities', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeStakeholder === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStakeholder(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Benefit Content Box */}
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            {activeStakeholder === 'parents' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                  <User className="w-5 h-5 text-amber-400" />
                  <span>Peace of Mind for Every Parent</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-amber-300 font-mono block">Live Location Map</strong>
                    <p>Track your child's exact location on live maps as they travel between home and school.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-amber-300 font-mono block">Instant Arrival Alerts</strong>
                    <p>Receive immediate WhatsApp/SMS notifications when your child enters the school gates.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-amber-300 font-mono block">Emergency SOS Latch</strong>
                    <p>Direct emergency button on the wearable triggers immediate command centre and police dispatch.</p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'schools' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                  <School className="w-5 h-5 text-cyan-400" />
                  <span>Streamlined Campus Security & Attendance</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-cyan-300 font-mono block">Automated Gate Check-In</strong>
                    <p>BLE gateways automatically mark attendance as learners pass through school entrances.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-cyan-300 font-mono block">Digital Visitor NFC Badges</strong>
                    <p>Issue temporary NFC visitor cards to maintain strict control over campus visitors.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-cyan-300 font-mono block">One-Touch Campus Lockdown</strong>
                    <p>Trigger instant lockdown alerts and broadcast notifications to teachers and local security.</p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'transport' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                  <Bus className="w-5 h-5 text-emerald-400" />
                  <span>Fleet Protection & Route Compliance</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 font-mono block">CAN-Bus Speed Telemetry</strong>
                    <p>Monitor driver speed, rapid acceleration, and sudden braking to enforce safe driving.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 font-mono block">Passenger Roster Check</strong>
                    <p>BLE sensors verify every child who boards and exits the bus to eliminate forgotten passengers.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 font-mono block">Collision SOS Sensors</strong>
                    <p>Impact sensors automatically dispatch emergency medical services in the event of an accident.</p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'government' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  <span>Provincial & Municipal Safety Analytics</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-blue-300 font-mono block">Provincial Dashboards</strong>
                    <p>Overarching oversight across school districts, municipal transport, and police command centres.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-blue-300 font-mono block">POPIA Audit Trails</strong>
                    <p>Full regulatory compliance and security audit logs protecting citizen data privacy.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-blue-300 font-mono block">Grant & Pilot Performance</strong>
                    <p>Comprehensive ROI and grant tracking reporting for educational and municipal budgets.</p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'responders' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                  <Radio className="w-5 h-5 text-rose-400" />
                  <span>Rapid Multi-Agency Emergency Response</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-rose-300 font-mono block">Direct SAPS C3 Integration</strong>
                    <p>Instant dispatch alerts fed directly into police dispatch networks for rapid intervention.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-rose-300 font-mono block">EMS Location Beacons</strong>
                    <p>Live GPS telemetry guides ambulances directly to the incident site without location delay.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-rose-300 font-mono block">Private Security Interconnect</strong>
                    <p>Collaborative dispatch with armed response partners to secure high-risk school corridors.</p>
                  </div>
                </div>
              </div>
            )}

            {activeStakeholder === 'communities' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>Stronger, Safer Neighborhood Corridors</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-purple-300 font-mono block">Community Watch Alerts</strong>
                    <p>Empowers local CPF (Community Policing Forums) to monitor safe walking routes to school.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-purple-300 font-mono block">Incident Prevention</strong>
                    <p>Visible wearable bands deter unauthorized contact and harassment around school grounds.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-purple-300 font-mono block">Trust & Transparency</strong>
                    <p>Fosters trust between parents, schools, and municipal authorities through reliable safety data.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Section 5: ITIS Ecosystem & Strategic Network */}
      <section id="ecosystem" className="py-20 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Main Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-2xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
              Enterprise Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ITIS Ecosystem & Strategic Network
            </h2>
            <p className="text-slate-400 text-sm">
              Explore our integrated technology resources, government readiness briefs, and trusted public-private sector partners.
            </p>
          </div>

          {/* Primary Ecosystem Tab Switcher */}
          <div className="flex justify-center" role="tablist" aria-label="ITIS Ecosystem & Strategic Network">
            <div className="inline-flex flex-col sm:flex-row p-1.5 bg-slate-950 border border-slate-800 rounded-2xl gap-2 w-full sm:w-auto">
              <button
                id="tab-tech"
                role="tab"
                aria-selected={activeEcosystemTab === 'tech'}
                aria-controls="panel-tech"
                onClick={() => setActiveEcosystemTab('tech')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveEcosystemTab('tech');
                  }
                }}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition flex items-center justify-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                  activeEcosystemTab === 'tech'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 border border-amber-400'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800/80'
                }`}
              >
                <Cpu className="w-4 h-4 shrink-0" />
                <span>ITIS Technology & Resources</span>
              </button>

              <button
                id="tab-partners"
                role="tab"
                aria-selected={activeEcosystemTab === 'partners'}
                aria-controls="panel-partners"
                onClick={() => setActiveEcosystemTab('partners')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveEcosystemTab('partners');
                  }
                }}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition flex items-center justify-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                  activeEcosystemTab === 'partners'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 border border-amber-400'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800/80'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>Trusted Industry & Government Partners</span>
              </button>
            </div>
          </div>

          {/* Tab Panel 1: ITIS Technology & Resources */}
          <div
            id="panel-tech"
            role="tabpanel"
            aria-labelledby="tab-tech"
            hidden={activeEcosystemTab !== 'tech'}
            className={activeEcosystemTab === 'tech' ? 'block space-y-6' : 'hidden'}
          >
            <div id="demo-suite" className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
                <span className="text-2xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                  Public Showcase & Documentation
                </span>

                {/* Showcase Tabs Switcher */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'government', label: 'Government Brief', icon: Building2 },
                    { id: 'faq', label: 'FAQ & Docs', icon: HelpCircle }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeCommercialTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveCommercialTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-2xs font-mono font-bold transition flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Render Active Showcase Component */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
                {activeCommercialTab === 'government' && <GovernmentReadinessSection />}
                {activeCommercialTab === 'faq' && <PublicDocsFAQ />}
              </div>
            </div>
          </div>

          {/* Tab Panel 2: Trusted Industry & Government Partners */}
          <div
            id="panel-partners"
            role="tabpanel"
            aria-labelledby="tab-partners"
            hidden={activeEcosystemTab !== 'partners'}
            className={activeEcosystemTab === 'partners' ? 'block space-y-8' : 'hidden'}
          >
            <div id="partners" className="space-y-6">
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="text-2xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full inline-block">
                  National Partner Network
                </span>
                <p className="text-slate-400 text-sm">
                  ITIS works hand-in-hand with key public and private institutions across South Africa.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                {[
                  { name: 'Soweto STEM Academy', cat: 'Pilot School' },
                  { name: 'Gauteng Dept of Education', cat: 'Government Dept' },
                  { name: 'City of Tshwane Municipality', cat: 'Local Government' },
                  { name: 'SAPS Command Centre', cat: 'Police Services' },
                  { name: 'Gauteng EMS Division', cat: 'Emergency Medical' },
                  { name: 'National Security Armed Response', cat: 'Private Security' },
                  { name: 'Soweto Bus Transport Co', cat: 'Fleet Operator' },
                  { name: 'Tier-1 Cellular IoT Telecommunications', cat: 'Telecommunications' },
                  { name: 'National Telecom Cloud Services', cat: 'Connectivity' },
                  { name: 'Public Sector Cloud Security', cat: 'Technology Partner' }
                ].map((p, idx) => (
                  <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 hover:border-amber-500/30 transition">
                    <span className="text-xs font-bold text-white font-mono block">{p.name}</span>
                    <span className="text-3xs text-amber-400 font-mono block">{p.cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-2xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
              Pilot Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Voices from Our Pilot Schools
            </h2>
            <p className="text-slate-400 text-sm">
              Real feedback from educators, parents, and transport captains participating in the initial pilot rollout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "The automated gate check-ins gave our staff complete clarity on who entered campus every morning. Parents love getting the instant arrival notifications."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-bold text-slate-950 font-mono text-sm">
                  KK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dr. Kagiso Khumalo</h4>
                  <span className="text-3xs text-slate-400">Principal, Soweto STEM Academy</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Knowing I can check my daughter's bus location live on my phone gives me total peace of mind during my morning commute to work."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-bold text-slate-950 font-mono text-sm">
                  NM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Nomalanga Mokoena</h4>
                  <span className="text-3xs text-slate-400">Parent Lead, Soweto Parent Committee</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "The CAN-bus telemetry helps our drivers maintain safe speeds on school routes. The automated passenger count prevents any child from being left behind."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-slate-950 font-mono text-sm">
                  SJ
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sello Jacobs</h4>
                  <span className="text-3xs text-slate-400">Fleet Director, Tshwane Student Transport</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 8: Contact & Demo Request */}
      <section id="contact" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details & Direct Hotline */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-2xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                  Get In Touch
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight mt-3">
                  Contact ITIS Command & Sales
                </h2>
                <p className="text-slate-400 text-xs leading-relaxed mt-2">
                  Have questions about bringing ITIS to your school, municipality, or fleet transport business? Contact our team today.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3.5">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-3xs text-slate-400 block">Direct Telephone Hotline:</span>
                    <a href="tel:0624304906" className="text-white font-bold text-sm hover:text-amber-300 transition">
                      +27 62 430 4906 / 0624304906
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3.5">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-3xs text-slate-400 block">Official Email Address:</span>
                    <a href="mailto:itis.intergrated@gmail.com" className="text-white font-bold text-sm hover:text-amber-300 transition">
                      itis.intergrated@gmail.com
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3.5">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-3xs text-slate-400 block">National Operations Centre:</span>
                    <span className="text-white font-bold text-xs">
                      Pretoria HQ, Innovation Hub Enclave, Gauteng, South Africa
                    </span>
                  </div>
                </div>

              </div>

              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-3xs font-mono text-slate-400 space-y-1">
                <span className="text-amber-400 font-bold block">24/7 Dispatch Availability</span>
                <p>Emergency calls are routed instantly to our lead dispatch operators.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              
              <div>
                <h3 className="text-xl font-bold text-white font-mono">
                  Send a Message or Schedule a Presentation
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill out the form below and an ITIS representative will contact you within 24 hours.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 rounded-2xl space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Message Submitted Successfully</span>
                  </div>
                  <p>
                    Thank you for contacting ITIS. Our municipal pilot team will review your message and reply to <strong className="text-white">{contactForm.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
                    }}
                    className="px-4 py-2 bg-slate-950 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold hover:bg-slate-900 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kagiso Khumalo"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. principal@sowetostem.edu.za"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. 0624304906"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Subject Topic</label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="School Pilot Request">School Pilot Request</option>
                        <option value="Government Department Proposal">Government Department Proposal</option>
                        <option value="Fleet Operator Integration">Fleet Operator Integration</option>
                        <option value="Media & Press Inquiry">Media & Press Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">Your Message / Request</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your school size, district location, or specific security requirements..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to ITIS</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img 
                  src="/branding/itis-logo.png" 
                  alt="ITIS Logo" 
                  className="w-8 h-8 object-contain rounded-lg" 
                  referrerPolicy="no-referrer"
                />
                <span className="text-lg font-black text-white font-mono">ITIS</span>
              </div>
              <p className="text-2xs text-slate-400 leading-relaxed">
                Integrated Technology Intelligence & Safety. Protecting learners across South Africa through intelligent technology.
              </p>
            </div>

            <div className="space-y-2 text-2xs font-mono text-slate-400">
              <span className="text-xs font-bold text-white block font-sans">Solutions</span>
              <a href="#solutions" className="block hover:text-amber-400">GPS Wearable Band</a>
              <a href="#solutions" className="block hover:text-amber-400">Smart Attendance Gateways</a>
              <a href="#solutions" className="block hover:text-amber-400">Fleet Bus Safety</a>
              <a href="#solutions" className="block hover:text-amber-400">24/7 Command Centre</a>
            </div>

            <div className="space-y-2 text-2xs font-mono text-slate-400">
              <span className="text-xs font-bold text-white block font-sans">Legal & Policies</span>
              <button onClick={() => setActiveLegalModal('privacy')} className="block hover:text-amber-400 text-left">Privacy Policy</button>
              <button onClick={() => setActiveLegalModal('popia')} className="block hover:text-amber-400 text-left">POPIA Compliance</button>
              <button onClick={() => setActiveLegalModal('terms')} className="block hover:text-amber-400 text-left">Terms of Service</button>
              <button onClick={() => setActiveLegalModal('careers')} className="block hover:text-amber-400 text-left">Careers & Fellowships</button>
              <button onClick={() => setActiveLegalModal('media')} className="block hover:text-amber-400 text-left">Media Office</button>
            </div>

            <div className="space-y-2 text-2xs font-mono text-slate-400">
              <span className="text-xs font-bold text-white block font-sans">Contact Details</span>
              <p>Phone: <strong className="text-slate-200">+27 62 430 4906</strong></p>
              <p>Email: <strong className="text-slate-200">itis.intergrated@gmail.com</strong></p>
              <p>Location: Pretoria / Tshwane HQ</p>
              <button
                onClick={() => setIsPortalModalOpen(true)}
                className="mt-2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-amber-300 font-bold rounded-lg hover:border-amber-500/50 transition inline-flex items-center gap-1.5"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Portal Login</span>
              </button>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-3xs font-mono text-slate-500 gap-4">
            <span>© 2026 ITIS Integrated Technology Intelligence & Safety. All rights reserved.</span>
            <span>POPIA & ISO 27001 Certified • Republic of South Africa</span>
          </div>

        </div>
      </footer>

      {/* PORTAL LOGIN MODAL */}
      {isPortalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl relative">
            <button
              onClick={() => setIsPortalModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1"
            >
              <X className="w-5 h-5" />
              <span>Close Portal Modal</span>
            </button>
            <EnterprisePortalSuite
              currentUser={portalUser}
              onLogin={(u) => {
                setPortalUser(u);
                setIsPortalModalOpen(false);
              }}
              onLogout={() => setPortalUser(null)}
              onNavigateToTab={(tab) => {
                if (tab === 'release' || tab === 'certification') {
                  onNavigateToDashboard('/certification');
                }
              }}
            />
          </div>
        </div>
      )}

      {/* DEMO REQUEST MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative shadow-2xl">
            <button
              onClick={resetDemoModal}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-3xs font-mono font-bold">
                <Send className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL DEMO REQUEST</span>
              </div>
              <h3 className="text-xl font-bold text-white font-mono">
                Request a Demonstration for Your Organization
              </h3>
              <p className="text-xs text-slate-400">
                Provide your details below to schedule an executive demonstration with our municipal team.
              </p>
            </div>

            {demoSubmitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Demonstration Request Submitted</span>
                </div>
                <p>
                  Thank you, <strong className="text-white">{demoForm.name}</strong>. Our team will contact <strong className="text-white">{demoForm.email}</strong> or <strong className="text-white">{demoForm.phone}</strong> shortly to confirm your session.
                </p>
                <button
                  onClick={resetDemoModal}
                  className="w-full py-2.5 bg-slate-950 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold hover:bg-slate-900 transition"
                >
                  Close Request Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Kagiso Khumalo"
                    value={demoForm.name}
                    onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="email@domain.gov.za"
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="0624304906"
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Organization Type</label>
                  <select
                    value={demoForm.organizationType}
                    onChange={(e) => setDemoForm({ ...demoForm, organizationType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Government Department">Government Department</option>
                    <option value="Public School">Public School</option>
                    <option value="Private School">Private School</option>
                    <option value="Transport Operator">Transport Operator</option>
                    <option value="Security Company">Security Company</option>
                    <option value="Parent Association">Parent Association</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Organization Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Soweto STEM Academy"
                    value={demoForm.organizationName}
                    onChange={(e) => setDemoForm({ ...demoForm, organizationName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Demo Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* LEGAL & POLICY MODALS */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 relative shadow-2xl">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {activeLegalModal === 'privacy' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-amber-400 font-bold uppercase">Data Privacy</span>
                  <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
                </div>
                <p>
                  ITIS is committed to maintaining strict data privacy standards for all learners, parents, educators, and drivers. Personal information is collected exclusively for safety, attendance, and emergency dispatch purposes.
                </p>
              </div>
            )}

            {activeLegalModal === 'popia' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-emerald-400 font-bold uppercase">Regulatory Compliance</span>
                  <h3 className="text-xl font-bold text-white">POPIA Compliance Notice</h3>
                </div>
                <p>
                  In compliance with the Protection of Personal Information Act (POPIA) of South Africa, all learner profiles, guardian phone numbers, and location records are encrypted with AES-256 at rest and TLS 1.3 in transit.
                </p>
              </div>
            )}

            {activeLegalModal === 'terms' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-cyan-400 font-bold uppercase">Terms of Service</span>
                  <h3 className="text-xl font-bold text-white">Platform Terms & Service SLA</h3>
                </div>
                <p>
                  Use of the ITIS platform by educational institutions, government departments, and transport contractors is governed by standard enterprise service level agreements with 99.99% uptime guarantees.
                </p>
              </div>
            )}

            {activeLegalModal === 'careers' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-purple-400 font-bold uppercase">Join Our Mission</span>
                  <h3 className="text-xl font-bold text-white">Careers at ITIS</h3>
                </div>
                <p>
                  Join our engineering team in building technology that protects children across South Africa daily. Send CVs to <strong className="text-amber-300">itis.intergrated@gmail.com</strong> or contact <strong className="text-amber-300">0624304906</strong>.
                </p>
              </div>
            )}

            {activeLegalModal === 'media' && (
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-2xs font-mono text-blue-400 font-bold uppercase">Press Office</span>
                  <h3 className="text-xl font-bold text-white">Media Enquiries</h3>
                </div>
                <p>
                  For media enquiries, interview requests, and executive press kits, contact <strong className="text-amber-300">itis.intergrated@gmail.com</strong> or call <strong className="text-amber-300">+27 62 430 4906</strong>.
                </p>
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
