import React, { useState } from 'react';
import {
  Shield,
  Globe,
  Smartphone,
  School,
  Building2,
  Siren,
  Download,
  CheckCircle2,
  Users,
  Activity,
  ArrowRight,
  Send,
  Mail,
  Phone,
  MapPin,
  Lock,
  FileText,
  HelpCircle,
  Newspaper,
  ChevronRight,
  Star,
  ExternalLink,
  Award,
  Sparkles,
  Search,
  Code2,
  Copy,
  Terminal,
  Moon,
  Sun,
  Flame,
  Check,
  Zap,
  Clock,
  Laptop
} from 'lucide-react';
import {
  STRATEGIC_PARTNERS,
  LATEST_NEWS_ARTICLES,
  WEBSITE_FAQS,
  WEBSITE_CODE_SPECS,
  CRITICAL_WEBSITE_RULES
} from '../data/websiteData';

export const WebsiteModule: React.FC = () => {
  // Navigation Sub-tabs
  const [activeNav, setActiveNav] = useState<
    'home' | 'about' | 'features' | 'solutions' | 'contact' | 'downloads' | 'legal' | 'seo'
  >('home');

  // Solutions subtab state
  const [solutionsRole, setSolutionsRole] = useState<'parents' | 'schools' | 'government' | 'emergency'>('parents');

  // Language state
  const [currentLang, setCurrentLang] = useState<string>('English');

  // Dark/Light mode theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // FAQ Category Filter
  const [faqCategory, setFaqCategory] = useState<'ALL' | 'PARENTS' | 'SCHOOLS' | 'GOVERNMENT' | 'EMERGENCY'>('ALL');

  // Demo Booking Form State
  const [demoForm, setDemoForm] = useState({
    fullName: '',
    email: '',
    organization: '',
    role: 'School Principal',
    phone: '',
    notes: '',
  });
  const [demoSubmitted, setDemoSubmitted] = useState<boolean>(false);

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Copy Code State
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);

  // Handlers
  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.fullName || !demoForm.email) return;
    setDemoSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
  };

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredFaqs = faqCategory === 'ALL'
    ? WEBSITE_FAQS
    : WEBSITE_FAQS.filter((f) => f.category === faqCategory);

  return (
    <div className={`space-y-8 rounded-3xl p-2 sm:p-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      {/* STICKY CORPORATE HEADER */}
      <header className="sticky top-2 z-50 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-amber-500/30 p-3 sm:p-4 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* LOGO & BRAND */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveNav('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 ring-2 ring-amber-300">
            <Shield className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black text-white tracking-wider">ITIS</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                SOVEREIGN RSA
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Integrated Transport & Safety Platform</p>
          </div>
        </div>

        {/* PRIMARY WEBSITE NAVIGATION */}
        <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveNav('home')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeNav === 'home'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveNav('about')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeNav === 'about'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            About
          </button>

          <button
            onClick={() => setActiveNav('features')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeNav === 'features'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Features
          </button>

          <button
            onClick={() => setActiveNav('solutions')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeNav === 'solutions'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Solutions
          </button>

          <button
            onClick={() => setActiveNav('contact')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeNav === 'contact'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Contact & Demo
          </button>

          <button
            onClick={() => setActiveNav('downloads')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeNav === 'downloads'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Downloads
          </button>

          <button
            onClick={() => setActiveNav('legal')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeNav === 'legal'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Privacy & Terms
          </button>

          <button
            onClick={() => setActiveNav('seo')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeNav === 'seo'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-cyan-400 hover:bg-cyan-950/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Next.js 15 SEO</span>
          </button>
        </nav>

        {/* CONTROLS: LANGUAGE SELECTOR, THEME TOGGLE, CTA */}
        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 text-xs text-slate-300">
            <Globe className="w-3.5 h-3.5 mr-1 text-amber-400" />
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="English" className="bg-slate-900">English (RSA)</option>
              <option value="isiZulu" className="bg-slate-900">isiZulu</option>
              <option value="isiXhosa" className="bg-slate-900">isiXhosa</option>
              <option value="Afrikaans" className="bg-slate-900">Afrikaans</option>
              <option value="Sepedi" className="bg-slate-900">Sepedi</option>
              <option value="Sesotho" className="bg-slate-900">Sesotho</option>
            </select>
          </div>

          {/* Theme Visual Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-400 hover:bg-slate-700 transition-all"
            title="Toggle Visual Theme Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Main CTA */}
          <button
            onClick={() => setActiveNav('contact')}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all transform hover:-translate-y-0.5"
          >
            <span>Book Demonstration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* VIEW 1: HOME PAGE */}
      {activeNav === 'home' && (
        <div className="space-y-16">

          {/* HERO SECTION */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 rounded-3xl border border-amber-500/30 p-8 md:p-14 shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>REPUBLIC OF SOUTH AFRICA NATIONAL CHILD SAFETY INITIATIVE</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  Protecting Every Learner.{' '}
                  <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                    Empowering Every Parent.
                  </span>
                </h1>

                <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-normal">
                  The official sovereign ITIS platform integrates hardware optical wearables, real-time vehicle geofence corridors, and sub-900ms SAPS 10111 emergency CAD dispatch to safeguard 12.4 million South African learners across 23,000 schools.
                </p>

                {/* CALL TO ACTION BUTTONS */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setActiveNav('contact')}
                    className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Book a Demonstration</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveNav('about')}
                    className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-all"
                  >
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>Partner With ITIS</span>
                  </button>

                  <button
                    onClick={() => setActiveNav('downloads')}
                    className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 font-bold text-sm border border-amber-700/50 transition-all"
                  >
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>Download Parent App</span>
                  </button>
                </div>

                {/* TRUST BADGES */}
                <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>POPIA Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>SITA Sovereign Cloud</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>SAPS 10111 Integrated</span>
                  </div>
                </div>
              </div>

              {/* HERO VISUAL / PLATFORM LIVE DEMO PREVIEW */}
              <div className="lg:col-span-5 bg-slate-950/90 rounded-2xl border border-amber-500/40 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-white tracking-wider uppercase">
                      Live Telemetry Stream
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                    SUB-900MS CAD ACTIVE
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Wearable Serial:</span>
                      <span className="text-amber-400 font-bold">ITIS-nRF9160-8842</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Status:</span>
                      <span className="text-emerald-400 font-bold">OPTICAL MESH SECURE</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Location:</span>
                      <span className="text-cyan-300">Soweto School Corridor, GP</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Transport Geofence:</span>
                      <span className="text-cyan-400 font-bold">ROUTE-ZA-2026-ACTIVE</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Bus Speed:</span>
                      <span className="text-white font-bold">42 km/h (Limit: 60 km/h)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-amber-800/60 bg-amber-950/20 space-y-1">
                    <div className="flex justify-between text-amber-300 text-[11px]">
                      <span>SAPS CAD Link:</span>
                      <span className="text-emerald-400 font-bold">LATENCY 380ms</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">Direct mTLS socket connected to SITA Sovereign Pretoria Cloud.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* REAL-TIME PLATFORM STATISTICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-amber-500/20 text-center space-y-2 shadow-lg">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 block font-mono">12.4M</span>
              <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Learners Protected</p>
              <p className="text-[11px] text-slate-400">Public & Private RSA Schools</p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-amber-500/20 text-center space-y-2 shadow-lg">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 block font-mono">23,000+</span>
              <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Schools Connected</p>
              <p className="text-[11px] text-slate-400">DBE SAMS Integrated Roster</p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-amber-500/20 text-center space-y-2 shadow-lg">
              <span className="text-3xl sm:text-4xl font-black text-cyan-400 block font-mono">&lt; 380ms</span>
              <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">SAPS CAD Latency</p>
              <p className="text-[11px] text-slate-400">Sub-900ms National Target</p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-amber-500/20 text-center space-y-2 shadow-lg">
              <span className="text-3xl sm:text-4xl font-black text-purple-400 block font-mono">99.999%</span>
              <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">SITA Cloud Uptime</p>
              <p className="text-[11px] text-slate-400">Sovereign High Availability</p>
            </div>
          </div>

          {/* MISSION & VISION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                To eliminate child abduction, transport hazards, and emergency response delays across South Africa by deploying an unhackable, sovereign Internet-of-Things safety infrastructure that links every learner directly to parents, school leadership, and SAPS 10111 law enforcement.
              </p>
            </div>

            <div className="p-8 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                A Republic of South Africa where every child journeys to school without fear, where parents have instant peace of mind, and where public infrastructure sets the global benchmark for sovereign emergency response technology.
              </p>
            </div>
          </div>

          {/* HOW ITIS WORKS — 4 STEP WORKFLOW */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 space-y-8 shadow-2xl">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">End-To-End Protection Architecture</span>
              <h2 className="text-3xl font-extrabold text-white">How ITIS Works</h2>
              <p className="text-slate-400 text-sm">From physical wristband optical sensors to direct SAPS Flying Squad dispatch.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h4 className="text-base font-bold text-white">Learner Wearable</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Learners wear an IP68 unremovable optical mesh wristband with nRF9160 cellular and BLE proximity beaconing.
                </p>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h4 className="text-base font-bold text-white">Vehicle Geofencing</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  School transport vehicles broadcast BLE mesh signals, confirming authorized boarding and route adherence.
                </p>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h4 className="text-base font-bold text-white">Sub-900ms Engine</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  SITA sovereign Kafka bus evaluates telemetry for geofence breaches or band tamper rupture events.
                </p>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center">
                  4
                </div>
                <h4 className="text-base font-bold text-white">SAPS 10111 Dispatch</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automated CAD ticket triggers nearest SAPS Flying Squad unit with live vehicle coordinates and learner photo.
                </p>
              </div>
            </div>
          </div>

          {/* KEY PLATFORM MODULES */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Ecosystem Overview</span>
                <h2 className="text-2xl font-extrabold text-white">Integrated Platform Modules</h2>
              </div>
              <button
                onClick={() => setActiveNav('features')}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1"
              >
                <span>Explore Technical Specs</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/50 transition-all">
                <Smartphone className="w-8 h-8 text-amber-400" />
                <h3 className="text-lg font-bold text-white">ITIS Parent App</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real-time bus tracking, safe arrival notifications, instant SOS panic trigger, and zero-data rating across MTN, Vodacom, and Telkom.
                </p>
              </div>

              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/50 transition-all">
                <School className="w-8 h-8 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">School Portal</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automated attendance rosters synced with DBE SAMS, gate access control, bus dispatch logs, and principal alert dashboards.
                </p>
              </div>

              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/50 transition-all">
                <Siren className="w-8 h-8 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">SAPS CAD Console</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct sub-900ms law enforcement CAD integration providing emergency responders with real-time GPS telemetry and suspect vehicle intercept vectors.
                </p>
              </div>
            </div>
          </div>

          {/* STRATEGIC PARTNERS GRID */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Inter-Governmental Governance</span>
              <h2 className="text-2xl font-extrabold text-white">Strategic Strategic Partners</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {STRATEGIC_PARTNERS.map((partner, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2 hover:border-amber-500/40 transition-all">
                  <div className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-black text-xs">
                    {partner.logoText}
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">{partner.name}</h4>
                  <p className="text-[10px] text-slate-400">{partner.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div className="space-y-6">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Stakeholder Endorsements</span>
              <h2 className="text-2xl font-extrabold text-white">Trusted Across South Africa</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "Knowing exactly when my daughter boards the school transport bus and receiving a notification the second she steps into her classroom gives me total peace of mind every single morning."
                </p>
                <div>
                  <h5 className="text-xs font-bold text-white">Thandiwe Nkosi</h5>
                  <p className="text-[10px] text-slate-400">Parent, Soweto, Gauteng</p>
                </div>
              </div>

              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "The automated DBE SAMS roster synchronization saved our administrative staff over 15 hours per week. Gate check-ins are instantaneous, and parent inquiries have dropped dramatically."
                </p>
                <div>
                  <h5 className="text-xs font-bold text-white">Principal M. Dlamini</h5>
                  <p className="text-[10px] text-slate-400">Umlazi Primary School, KZN</p>
                </div>
              </div>

              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "The sub-900ms direct telemetry link to our 10111 Flying Squad CAD systems provides dispatchers with pinpoint GPS coordinates and vehicle descriptors instantly during emergency calls."
                </p>
                <div>
                  <h5 className="text-xs font-bold text-white">Brigadier J. van der Merwe</h5>
                  <p className="text-[10px] text-slate-400">SAPS Operational Command, Pretoria</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ ACCORDION SECTION */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Frequently Asked Questions</span>
                <h2 className="text-2xl font-extrabold text-white">Got Questions? We Have Answers.</h2>
              </div>

              {/* FAQ CATEGORY FILTERS */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {(['ALL', 'PARENTS', 'SCHOOLS', 'GOVERNMENT', 'EMERGENCY'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFaqCategory(cat)}
                    className={`px-3 py-1 rounded-lg border transition-all ${
                      faqCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => (
                <div key={idx} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <h4>{faq.question}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LATEST NEWS & ANNOUNCEMENTS */}
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Official Announcements</span>
              <h2 className="text-2xl font-extrabold text-white">Latest ITIS Platform News</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LATEST_NEWS_ARTICLES.map((article) => (
                <div key={article.id} className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                        {article.category}
                      </span>
                      <span className="text-slate-400">{article.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{article.readTime}</span>
                    <button className="text-amber-400 font-bold hover:underline flex items-center space-x-1">
                      <span>Read Full Article</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: ABOUT ITIS */}
      {activeNav === 'about' && (
        <div className="space-y-12">
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-8 md:p-12 rounded-3xl border border-amber-500/30 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">National Mandate & Governance</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About the Integrated Transport & Safety Platform</h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
              ITIS was established under inter-ministerial mandate uniting the Department of Basic Education (DBE), Department of Transport (DoT), South African Police Service (SAPS), and State Information Technology Agency (SITA) to create a sovereign digital shield protecting South Africa's learners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <Building2 className="w-8 h-8 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Sovereign Data Hosting</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                100% hosted inside SITA Erasmuskloof and Centurion government data centers. Zero external cloud exposure, ensuring full compliance with POPIA and National Intelligence standards.
              </p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <Siren className="w-8 h-8 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Direct 10111 Integration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bypasses standard call center wait times by delivering high-priority CAD alerts directly to regional SAPS Flying Squad vehicles and provincial command centers in under 900ms.
              </p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <Award className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Hardware Hardware Security</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Equipped with custom STSAFE-A110 cryptographic chips executing hardware-bound ECDSA P-256 signatures for tamper-proof telemetry validation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: FEATURES */}
      {activeNav === 'features' && (
        <div className="space-y-8">
          <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Enterprise Technical Capabilities</span>
            <h1 className="text-3xl font-extrabold text-white">ITIS Architecture & Technical Features</h1>
            <p className="text-slate-300 text-sm max-w-3xl">
              Engineered for zero downtime, extreme low latency, and uncompromising physical security across urban and remote rural school corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">nRF9160 Hardware Wearable</h3>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">IP68 OPTICAL MESH</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dual LTE-M/NB-IoT cellular modem with integrated GPS/GNSS positioning, optical skin-contact sensor mesh, and 14-day ultra-low power battery life.
              </p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Vehicle Geofence Corridors</h3>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">BLE 5.3 MESH</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated vehicle pairing ensuring learners are matched to designated transport buses. Triggers instant warnings if a learner boards an unverified vehicle.
              </p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Sub-900ms Telemetry Pipeline</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">APACHE KAFKA & MQTT</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-throughput event streaming handling up to 500,000 concurrent device telemetry updates per second with guaranteed order and zero packet loss.
              </p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Zero-Data Rated Parent App</h3>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold">MTN, VODACOM, TELKOM</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero data balance required for parents on all major mobile networks, ensuring equal safety access regardless of economic circumstances.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: SOLUTIONS */}
      {activeNav === 'solutions' && (
        <div className="space-y-8">
          <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Tailored Stakeholder Portals</span>
            <h1 className="text-3xl font-extrabold text-white">ITIS Solutions Matrix</h1>

            {/* SUBTABS FOR SOLUTIONS */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setSolutionsRole('parents')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  solutionsRole === 'parents'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                For Parents & Guardians
              </button>

              <button
                onClick={() => setSolutionsRole('schools')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  solutionsRole === 'schools'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                For Schools & Principals
              </button>

              <button
                onClick={() => setSolutionsRole('government')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  solutionsRole === 'government'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                For DBE & Government
              </button>

              <button
                onClick={() => setSolutionsRole('emergency')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  solutionsRole === 'emergency'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                For SAPS & Emergency Services
              </button>
            </div>
          </div>

          {/* DYNAMIC ROLE CONTENT */}
          {solutionsRole === 'parents' && (
            <div className="p-8 bg-slate-900/90 rounded-3xl border border-amber-500/30 space-y-4">
              <Smartphone className="w-10 h-10 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Parent Protection Suite</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Parents gain 24/7 visibility over their child's school transport journey. Receive instant notifications when your child boards the school bus, arrives at school, or leaves designated safe zones.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                  ✔ Live GPS Bus Tracking
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                  ✔ Safe Geofence Entrance Alerts
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                  ✔ Instant SOS Panic Dispatch
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                  ✔ 100% Zero-Data Rated Mobile App
                </div>
              </div>
            </div>
          )}

          {solutionsRole === 'schools' && (
            <div className="p-8 bg-slate-900/90 rounded-3xl border border-amber-500/30 space-y-4">
              <School className="w-10 h-10 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">School Management Portal</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Seamlessly integrated with DBE SA-SAMS. Automated learner attendance check-ins, gate reader integration, and principal security dashboards.
              </p>
            </div>
          )}

          {solutionsRole === 'government' && (
            <div className="p-8 bg-slate-900/90 rounded-3xl border border-amber-500/30 space-y-4">
              <Building2 className="w-10 h-10 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Government & SITA Sovereign Analytics</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Provincial and national overview metrics for DBE and DoT executives. Monitor transport safety trends, response times, and fleet compliance across all 9 provinces.
              </p>
            </div>
          )}

          {solutionsRole === 'emergency' && (
            <div className="p-8 bg-slate-900/90 rounded-3xl border border-amber-500/30 space-y-4">
              <Siren className="w-10 h-10 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">SAPS 10111 CAD Integration</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct CAD API link feeding sub-900ms emergency dispatch tickets to Flying Squad vehicles, complete with live telemetry, suspect vehicle descriptors, and intercept routing.
              </p>
            </div>
          )}
        </div>
      )}

      {/* VIEW 5: CONTACT & DEMO BOOKING */}
      {activeNav === 'contact' && (
        <div className="space-y-8">
          <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Schedule a Live Demonstration</span>
            <h1 className="text-3xl font-extrabold text-white">Connect With the ITIS Platform Team</h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              School principals, government officials, SAPS command officers, and transport operators can book an interactive demonstration of the ITIS hardware and software platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* DEMO FORM */}
            <div className="lg:col-span-7 bg-slate-900/90 p-6 md:p-8 rounded-3xl border border-amber-500/30 shadow-xl space-y-6">
              {demoSubmitted ? (
                <div className="p-8 bg-slate-950 rounded-2xl border border-emerald-500/50 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Demonstration Request Submitted!</h3>
                  <p className="text-xs text-slate-300">
                    Thank you, <strong className="text-amber-400">{demoForm.fullName}</strong>. An ITIS technical deployment officer will contact you at <strong className="text-cyan-300">{demoForm.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => setDemoSubmitted(false)}
                    className="px-4 py-2 bg-slate-800 text-xs font-bold text-white rounded-xl hover:bg-slate-700"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-4 text-xs font-medium">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-300">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={demoForm.fullName}
                        onChange={(e) => setDemoForm({ ...demoForm, fullName: e.target.value })}
                        placeholder="Dr. Sibusiso Khumalo"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300">Official Email *</label>
                      <input
                        type="email"
                        required
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        placeholder="sibusiso.khumalo@dbe.gov.za"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-300">Organization / School Name</label>
                      <input
                        type="text"
                        value={demoForm.organization}
                        onChange={(e) => setDemoForm({ ...demoForm, organization: e.target.value })}
                        placeholder="Gauteng Department of Education"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300">Stakeholder Role</label>
                      <select
                        value={demoForm.role}
                        onChange={(e) => setDemoForm({ ...demoForm, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="School Principal">School Principal / Administrator</option>
                        <option value="Government Official">Government Official (DBE / DoT)</option>
                        <option value="SAPS Officer">SAPS / Law Enforcement</option>
                        <option value="Transport Operator">School Transport Operator</option>
                        <option value="Parent Association">Parent / SGB Representative</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300">Contact Telephone</label>
                    <input
                      type="tel"
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                      placeholder="+27 (0)12 482 3000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300">Additional Demonstration Notes</label>
                    <textarea
                      rows={3}
                      value={demoForm.notes}
                      onChange={(e) => setDemoForm({ ...demoForm, notes: e.target.value })}
                      placeholder="Specify required focus areas (e.g., SA-SAMS roster sync, SAPS CAD integration, parent mobile app rollout)."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all"
                  >
                    Confirm Demonstration Booking
                  </button>
                </form>
              )}
            </div>

            {/* DIRECT CONTACT INFO */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>National Headquarters</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  SITA Erasmuskloof Sovereign Campus<br />
                  459 Tsitsa Street, Erasmuskloof<br />
                  Pretoria, 0181, South Africa
                </p>
              </div>

              <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>24/7 Emergency CAD Desk</span>
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  National Hotline: <strong className="text-amber-400">+27 800 10111 ITIS</strong><br />
                  General Inquiries: <strong className="text-cyan-300">info@itis.gov.za</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: DOWNLOADS */}
      {activeNav === 'downloads' && (
        <div className="space-y-8">
          <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Public Access & Software Hub</span>
            <h1 className="text-3xl font-extrabold text-white">ITIS Mobile Apps & Desktop Clients</h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Download certified production builds for Android, iOS, Windows Desktop, and technical architectural whitepapers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Smartphone className="w-8 h-8 text-amber-400" />
                <h3 className="text-base font-bold text-white">ITIS Parent App (Android)</h3>
                <p className="text-xs text-slate-300">APK Build v2.4.1 — Zero-data rated on MTN, Vodacom, Telkom.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 hover:bg-amber-400 transition-all">
                <Download className="w-4 h-4" />
                <span>Download APK (24MB)</span>
              </button>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Smartphone className="w-8 h-8 text-cyan-400" />
                <h3 className="text-base font-bold text-white">ITIS Parent App (iOS)</h3>
                <p className="text-xs text-slate-300">Apple App Store & TestFlight Sovereign Build v2.4.1.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 hover:bg-slate-700 transition-all">
                <Download className="w-4 h-4" />
                <span>App Store Link</span>
              </button>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Laptop className="w-8 h-8 text-emerald-400" />
                <h3 className="text-base font-bold text-white">School Portal Client</h3>
                <p className="text-xs text-slate-300">Windows / macOS Desktop Client for DBE SA-SAMS Sync.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 hover:bg-slate-700 transition-all">
                <Download className="w-4 h-4" />
                <span>Download Installer (68MB)</span>
              </button>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <FileText className="w-8 h-8 text-purple-400" />
                <h3 className="text-base font-bold text-white">Architectural Whitepaper</h3>
                <p className="text-xs text-slate-300">Official RSA Sovereign Child Safety Specification (PDF).</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 hover:bg-slate-700 transition-all">
                <Download className="w-4 h-4" />
                <span>Download Whitepaper (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7: PRIVACY & TERMS */}
      {activeNav === 'legal' && (
        <div className="space-y-8">
          <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Government Governance & Compliance</span>
            <h1 className="text-3xl font-extrabold text-white">POPIA Privacy Policy & Terms of Use</h1>
            <p className="text-slate-300 text-sm max-w-3xl">
              Strict adherence to the Protection of Personal Information Act (POPIA), Promotion of Access to Information Act (PAIA), and SITA Sovereign Security Directives.
            </p>
          </div>

          <div className="p-8 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-6 text-xs text-slate-300 leading-relaxed">
            <h3 className="text-base font-bold text-white">1. Protection of Personal Information Act (POPIA) Guarantee</h3>
            <p>
              All learner biometric telemetry, geofence logs, and contact credentials are encrypted using AES-256-GCM hardware keys. Data is processed exclusively for emergency protection and is never commercialized or transferred outside the Republic of South Africa.
            </p>

            <h3 className="text-base font-bold text-white">2. SITA Sovereign Cloud Hosting</h3>
            <p>
              The ITIS platform operates entirely within SITA tier-4 government data centers. All network communication requires mutual TLS (mTLS) authentication with ECDSA P-256 certificates issued by the National Public Key Infrastructure (PKI).
            </p>
          </div>
        </div>
      )}

      {/* VIEW 8: NEXT.JS 15 SEO CODE SPECS */}
      {activeNav === 'seo' && (
        <div className="space-y-8">
          <div className="bg-slate-900/90 p-8 rounded-3xl border border-amber-500/30 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold">
              <Code2 className="w-4 h-4" />
              <span>PRODUCTION CODE SPECIFICATIONS</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Next.js 15 App Router SEO & Metadata API</h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Inspect compile-ready Next.js 15 App Router code for OpenGraph cards, Twitter Cards, dynamic sitemap.xml generation, and JSON-LD structured data.
            </p>
          </div>

          <div className="space-y-6">
            {WEBSITE_CODE_SPECS.map((spec) => (
              <div key={spec.id} className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{spec.title}</h3>
                    <p className="text-[11px] text-cyan-400">{spec.filename}</p>
                  </div>

                  <button
                    onClick={() => handleCopyCode(spec.id, spec.code)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-all w-fit"
                  >
                    {copiedCodeId === spec.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">{spec.description}</p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto max-h-80">
                  <pre className="text-xs text-slate-300 leading-relaxed">{spec.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MANDATORY WEBSITE RULES PANEL */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-amber-400" />
          <span>10 Mandatory Corporate Website Foundation Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_WEBSITE_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400">RULE #{rule.id}</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-slate-300 font-semibold">
                  {rule.badge}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{rule.title}</h4>
              <p className="text-[11px] text-slate-400 leading-tight">{rule.ruleText}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ENTERPRISE FOOTER */}
      <footer className="bg-slate-950 rounded-3xl border border-slate-800 p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-slate-800 pb-8 text-xs">
          {/* COLUMN 1: BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white tracking-wider">ITIS</span>
            </div>
            <p className="text-slate-400 leading-relaxed pr-4">
              Integrated Transport & Safety — South Africa's official sovereign child safety platform uniting 12.4M learners, DBE, DoT, SAPS, and SITA.
            </p>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li onClick={() => setActiveNav('about')} className="hover:text-white cursor-pointer">About ITIS</li>
              <li onClick={() => setActiveNav('features')} className="hover:text-white cursor-pointer">Features</li>
              <li onClick={() => setActiveNav('solutions')} className="hover:text-white cursor-pointer">Solutions</li>
              <li onClick={() => setActiveNav('contact')} className="hover:text-white cursor-pointer">Contact & Demo</li>
            </ul>
          </div>

          {/* COLUMN 3: DOWNLOADS & PORTALS */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">Downloads</h4>
            <ul className="space-y-2 text-slate-400">
              <li onClick={() => setActiveNav('downloads')} className="hover:text-white cursor-pointer">Parent App APK</li>
              <li onClick={() => setActiveNav('downloads')} className="hover:text-white cursor-pointer">School Portal Windows</li>
              <li onClick={() => setActiveNav('downloads')} className="hover:text-white cursor-pointer">Whitepapers (PDF)</li>
              <li onClick={() => setActiveNav('legal')} className="hover:text-white cursor-pointer">POPIA Manual</li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER SIGNUP */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">Government Updates</h4>
            {newsletterSubscribed ? (
              <p className="text-emerald-400 text-xs font-bold">Subscribed to official DBE / ITIS announcements!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="enter.email@dbe.gov.za"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4">
          <p>© 2026 Integrated Transport & Safety (ITIS) Platform. Republic of South Africa. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <span onClick={() => setActiveNav('legal')} className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span onClick={() => setActiveNav('legal')} className="hover:text-slate-300 cursor-pointer">POPIA Directives</span>
            <span onClick={() => setActiveNav('legal')} className="hover:text-slate-300 cursor-pointer">SITA Cloud Terms</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
