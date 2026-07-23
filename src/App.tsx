import React, { useState, useMemo } from 'react';
import { CAPABILITY_DOMAINS } from './data/capabilities';
import { Level1Domain, Level2Capability, Level3Service } from './types/capability';
import { Header } from './components/Header';
import { CapabilityDetailModal } from './components/CapabilityDetailModal';
import { VisionMatrix } from './components/VisionMatrix';
import { SrsOverview } from './components/SrsOverview';
import { SafetyPipeline } from './components/SafetyPipeline';
import { DecisionEngine } from './components/DecisionEngine';
import { Sprint1Spec } from './components/Sprint1Spec';
import { DatabaseSprint1 } from './components/DatabaseSprint1';
import { NestJsFoundation } from './components/NestJsFoundation';
import { IdentityAuthModule } from './components/IdentityAuthModule';
import { SchoolModule } from './components/SchoolModule';
import { ParentModule } from './components/ParentModule';
import { LearnerModule } from './components/LearnerModule';
import { DeviceModule } from './components/DeviceModule';
import { PairingModule } from './components/PairingModule';
import { TelemetryModule } from './components/TelemetryModule';
import { GeofenceModule } from './components/GeofenceModule';
import { CsdeModule } from './components/CsdeModule';
import { EioeModule } from './components/EioeModule';
import { ErcdeModule } from './components/ErcdeModule';
import { PsnceModule } from './components/PsnceModule';
import { C3Module } from './components/C3Module';
import { ApcpeModule } from './components/ApcpeModule';
import { DfcceModule } from './components/DfcceModule';
import { EiepgModule } from './components/EiepgModule';
import { EarnsipModule } from './components/EarnsipModule';
import { EporeModule } from './components/EporeModule';
import { BsermeModule } from './components/BsermeModule';
import { PmaModule } from './components/PmaModule';
import { SapModule } from './components/SapModule';
import { ErmaModule } from './components/ErmaModule';
import { FtdpaModule } from './components/FtdpaModule';
import { NamgpModule } from './components/NamgpModule';
import { EcztdpModule } from './components/EcztdpModule';
import { EdcndpModule } from './components/EdcndpModule';
import { EqavcprModule } from './components/EqavcprModule';
import { NpdoapmModule } from './components/NpdoapmModule';
import { NrpeosModule } from './components/NrpeosModule';
import { AicipilotModule } from './components/AicipilotModule';
import { HwCertModule } from './components/HwCertModule';
import { CommProcureModule } from './components/CommProcureModule';
import { EbocgcipModule } from './components/EbocgcipModule';
import { MebimModule } from './components/MebimModule';
import { DigitalTwinModule } from './components/DigitalTwinModule';
import { AcademyModule } from './components/AcademyModule';
import { WorkspaceModule } from './components/WorkspaceModule';
import { WebsiteModule } from './components/WebsiteModule';
import { AuthModule } from './components/AuthModule';
import { ParentPortalModule } from './components/ParentPortalModule';
import { SchoolPortalModule } from './components/SchoolPortalModule';
import { C3CommandCentreModule } from './components/C3CommandCentreModule';
import { ResponderMobileModule } from './components/ResponderMobileModule';
import { TechnicianProvisioningModule } from './components/TechnicianProvisioningModule';
import { NationalGovernanceModule } from './components/NationalGovernanceModule';
import { ExecutiveCabinetModule } from './components/ExecutiveCabinetModule';
import { PlatformIntegrationModule } from './components/PlatformIntegrationModule';
import { EnterpriseDesignSystemModule } from './components/EnterpriseDesignSystemModule';
import { SystemValidationModule } from './components/SystemValidationModule';
import { ReleaseEngineeringModule } from './components/ReleaseEngineeringModule';
import {
  School,
  ShieldCheck,
  Bus,
  Navigation,
  UserCheck,
  HeartHandshake,
  ClipboardCheck,
  AlertTriangle,
  Siren,
  FileText,
  Activity,
  BarChart3,
  Brain,
  CreditCard,
  Lock,
  ChevronRight,
  Layers,
  Sparkles,
  ExternalLink,
  Cpu
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  School: <School className="w-5 h-5 text-indigo-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Bus: <Bus className="w-5 h-5 text-amber-400" />,
  Navigation: <Navigation className="w-5 h-5 text-cyan-400" />,
  UserCheck: <UserCheck className="w-5 h-5 text-blue-400" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-rose-400" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5 text-teal-400" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5 text-red-500" />,
  Siren: <Siren className="w-5 h-5 text-orange-500" />,
  FileText: <FileText className="w-5 h-5 text-slate-400" />,
  Activity: <Activity className="w-5 h-5 text-purple-400" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-green-400" />,
  Brain: <Brain className="w-5 h-5 text-fuchsia-400" />,
  CreditCard: <CreditCard className="w-5 h-5 text-yellow-400" />,
  Lock: <Lock className="w-5 h-5 text-red-400" />
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'release_engineering' | 'system_validation' | 'design_system' | 'platform_integration' | 'execcabinet' | 'natgov' | 'fieldtech' | 'responderapp' | 'c3command' | 'schoolportal' | 'parentportal' | 'auth' | 'website' | 'workspace' | 'academy' | 'digitaltwin' | 'mebim' | 'ebocgcip' | 'commprocure' | 'hwcert' | 'aicipilot' | 'nrpeos' | 'npdoapm' | 'eqavcpr' | 'edcndp' | 'ecztdp' | 'namgp' | 'ftdpa' | 'erma' | 'sap' | 'pma' | 'bserme' | 'epore' | 'earnsip' | 'eiepg' | 'dfcce' | 'apcpe' | 'c3' | 'psnce' | 'ercde' | 'eioe' | 'csde' | 'geofence' | 'telemetry' | 'pairing' | 'device' | 'learner' | 'parent' | 'school' | 'iam' | 'nestjs' | 'decision' | 'sprint1' | 'db_sprint1' | 'pipeline' | 'capabilities' | 'matrix' | 'vision' | 'srs'>('release_engineering');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<Level1Domain | null>(CAPABILITY_DOMAINS[0]);
  const [selectedService, setSelectedService] = useState<Level3Service | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Filter domains based on search & category
  const filteredDomains = useMemo(() => {
    return CAPABILITY_DOMAINS.filter((domain) => {
      const matchesCategory = categoryFilter === 'All' || domain.category === categoryFilter;

      if (!searchTerm) return matchesCategory;

      const term = searchTerm.toLowerCase();
      const matchesDomain = domain.name.toLowerCase().includes(term) || domain.code.toLowerCase().includes(term);

      const matchesCaps = domain.capabilities.some((cap) =>
        cap.name.toLowerCase().includes(term) ||
        cap.code.toLowerCase().includes(term) ||
        cap.services.some(
          (srv) =>
            srv.name.toLowerCase().includes(term) ||
            srv.softwareModules.some((m) => m.toLowerCase().includes(term))
        )
      );

      return matchesCategory && (matchesDomain || matchesCaps);
    });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB 0: PROMPT 064 PRODUCTION PACKAGING, RELEASE ENGINEERING & DISTRIBUTION PLATFORM */}
        {activeTab === 'release_engineering' && <ReleaseEngineeringModule />}

        {/* TAB 0.1: PROMPT 063 SYSTEM CERTIFICATION & E2E INTEGRATION TESTS */}
        {activeTab === 'system_validation' && <SystemValidationModule />}

        {/* TAB 0.1: PROMPT 062 ENTERPRISE DESIGN SYSTEM, UI/UX POLISH & ACCESSIBILITY */}
        {activeTab === 'design_system' && <EnterpriseDesignSystemModule />}

        {/* TAB 0.1: PROMPT 061 END-TO-END PLATFORM INTEGRATION & LIVE API CONNECTION */}
        {activeTab === 'platform_integration' && <PlatformIntegrationModule />}

        {/* TAB 0.1: PROMPT 060 EXECUTIVE INTELLIGENCE, BUSINESS INTELLIGENCE & CABINET DASHBOARD */}
        {activeTab === 'execcabinet' && <ExecutiveCabinetModule />}

        {/* TAB 0.1: PROMPT 059 NATIONAL ADMINISTRATION, GOVERNMENT GOVERNANCE & MULTI-TENANT PORTAL */}
        {activeTab === 'natgov' && <NationalGovernanceModule />}

        {/* TAB 0.1: PROMPT 058 FIELD TECHNICIAN & DEVICE PROVISIONING APPLICATION */}
        {activeTab === 'fieldtech' && <TechnicianProvisioningModule />}

        {/* TAB 0.1: PROMPT 057 EMERGENCY RESPONDER MOBILE APPLICATION */}
        {activeTab === 'responderapp' && <ResponderMobileModule />}

        {/* TAB 0.1: PROMPT 056 NATIONAL C3 COMMAND CENTRE WEB APPLICATION */}
        {activeTab === 'c3command' && <C3CommandCentreModule />}

        {/* TAB 0.1: PROMPT 055 PRODUCTION SCHOOL ADMINISTRATION PORTAL */}
        {activeTab === 'schoolportal' && <SchoolPortalModule />}

        {/* TAB 0.1: PROMPT 054 PARENT PORTAL */}
        {activeTab === 'parentportal' && <ParentPortalModule />}

        {/* TAB 0.1: PROMPT 053 ENTERPRISE AUTHENTICATION & IDENTITY PORTAL */}
        {activeTab === 'auth' && <AuthModule />}

        {/* TAB 0.1: PHASE 2 ITIS CORPORATE WEBSITE FOUNDATION */}
        {activeTab === 'website' && <WebsiteModule />}

        {/* TAB 0.1: PHASE 2 PRODUCTION IMPLEMENTATION WORKSPACE FOUNDATION */}
        {activeTab === 'workspace' && <WorkspaceModule />}

        {/* TAB 0.1: PROMPT 054 NATIONAL TRAINING ACADEMY & LMS PLATFORM */}
        {activeTab === 'academy' && <AcademyModule />}

        {/* TAB 0.1: PROMPT 051 DIGITAL TWIN, NATIONAL SIMULATION & MISSION REHEARSAL PLATFORM */}
        {activeTab === 'digitaltwin' && <DigitalTwinModule />}

        {/* TAB 0.1: PROMPT 050 MASTER ENTERPRISE BLUEPRINT, INVESTMENT MEMORANDUM & NATIONAL IMPLEMENTATION PLAN */}
        {activeTab === 'mebim' && <MebimModule />}

        {/* TAB 0.1: PROMPT 049 ENTERPRISE BUSINESS OPERATIONS, CORPORATE GOVERNANCE & CONTINUOUS INNOVATION PLATFORM */}
        {activeTab === 'ebocgcip' && <EbocgcipModule />}

        {/* TAB 0.1: PROMPT 048 COMMERCIAL LAUNCH, INVESTOR PLATFORM & GOVERNMENT PROCUREMENT PACKAGE */}
        {activeTab === 'commprocure' && <CommProcureModule />}

        {/* TAB 0.1: PROMPT 047 HARDWARE WEARABLE ENGINEERING, MANUFACTURING & CERTIFICATION PLATFORM */}
        {activeTab === 'hwcert' && <HwCertModule />}

        {/* TAB 0.1: PROMPT 046 ENTERPRISE AI COPILOT & AUTONOMOUS OPERATIONS PLATFORM */}
        {activeTab === 'aicipilot' && <AicipilotModule />}

        {/* TAB 0.1: PROMPT 045 NATIONAL ROLLOUT, PROVINCIAL EXPANSION & ENTERPRISE OPERATIONS SCALING (NRPEOS) */}
        {activeTab === 'nrpeos' && <NrpeosModule />}

        {/* TAB 0.1: PROMPT 044 PILOT DEPLOYMENT, OPERATIONAL ACCEPTANCE & PROGRAMME MANAGEMENT (NPDOAPM) */}
        {activeTab === 'npdoapm' && <NpdoapmModule />}

        {/* TAB 0.1: PROMPT 043 ENTERPRISE QUALITY ASSURANCE, VALIDATION & CERTIFICATION (EQAVCPR) */}
        {activeTab === 'eqavcpr' && <EqavcprModule />}

        {/* TAB 0.1: PROMPT 042 ENTERPRISE DEVSECOPS & CLOUD DEPLOYMENT PLATFORM (EDCNDP) */}
        {activeTab === 'edcndp' && <EdcndpModule />}

        {/* TAB 0.1: PROMPT 041 ENTERPRISE CYBERSECURITY & ZERO TRUST PLATFORM (ECZTDP) */}
        {activeTab === 'ecztdp' && <EcztdpModule />}

        {/* TAB 0.1: PROMPT 040 NATIONAL ADMINISTRATION & MULTI-TENANCY PLATFORM (NAMGP) */}
        {activeTab === 'namgp' && <NamgpModule />}

        {/* TAB 0.1: PROMPT 039 FIELD TECHNICIAN & DEVICE PROVISIONING APPLICATION (FTDPA) */}
        {activeTab === 'ftdpa' && <FtdpaModule />}

        {/* TAB 0.1: PROMPT 038 EMERGENCY RESPONDER MOBILE APPLICATION (ERMA) */}
        {activeTab === 'erma' && <ErmaModule />}

        {/* TAB 0.1: PROMPT 037 SCHOOL ADMINISTRATION PORTAL (SAP) */}
        {activeTab === 'sap' && <SapModule />}

        {/* TAB 0.1: PROMPT 036 PARENT MOBILE APPLICATION (PMA) */}
        {activeTab === 'pma' && <PmaModule />}

        {/* TAB 0.1: PROMPT 035 BILLING, SUBSCRIPTIONS & ENTERPRISE REVENUE MANAGEMENT ENGINE (BSERME) */}
        {activeTab === 'bserme' && <BsermeModule />}

        {/* TAB 0.1: PROMPT 034 ENTERPRISE PLATFORM OPERATIONS, OBSERVABILITY & RESILIENCE ENGINE (EPORE) */}
        {activeTab === 'epore' && <EporeModule />}

        {/* TAB 0.1: PROMPT 033 ENTERPRISE ANALYTICS, REPORTING & NATIONAL SAFETY INTELLIGENCE PLATFORM (EARNSIP) */}
        {activeTab === 'earnsip' && <EarnsipModule />}

        {/* TAB 0.1: PROMPT 032 ENTERPRISE INTEGRATION & EXTERNAL PARTNER GATEWAY (EIEPG) */}
        {activeTab === 'eiepg' && <EiepgModule />}

        {/* TAB 0.1: PROMPT 031 DIGITAL FORENSICS, EVIDENCE & CHAIN OF CUSTODY ENGINE (DFCCE) */}
        {activeTab === 'dfcce' && <DfcceModule />}

        {/* TAB 0.1: PROMPT 030 AI PREDICTIVE CHILD PROTECTION ENGINE (APCPE) */}
        {activeTab === 'apcpe' && <ApcpeModule />}

        {/* TAB 0.1: PROMPT 029 ITIS COMMAND & CONTROL CENTRE (C3) PLATFORM */}
        {activeTab === 'c3' && <C3Module />}

        {/* TAB 0.1: PROMPT 028 PARENT, SCHOOL & STAKEHOLDER NOTIFICATION ENGINE (PSNCE) */}
        {activeTab === 'psnce' && <PsnceModule />}

        {/* TAB 0.1: PROMPT 027 EMERGENCY RESPONSE COORDINATION & DISPATCH ENGINE (ERCDE) */}
        {activeTab === 'ercde' && <ErcdeModule />}

        {/* TAB 0.1: PROMPT 026 EMERGENCY INCIDENT ORCHESTRATION ENGINE (EIOE) */}
        {activeTab === 'eioe' && <EioeModule />}

        {/* TAB 0.1: PROMPT 025 CHILD SAFETY DECISION ENGINE (CSDE) */}
        {activeTab === 'csde' && <CsdeModule />}

        {/* TAB 0.1: PROMPT 024 SPATIAL TRACKING, GEOFENCING & SAFE CORRIDOR ENGINE */}
        {activeTab === 'geofence' && <GeofenceModule />}

        {/* TAB 0.0: PROMPT 023 REAL-TIME TELEMETRY INGESTION & LOCATION STREAM PROCESSING */}
        {activeTab === 'telemetry' && <TelemetryModule />}

        {/* TAB 0.1: PROMPT 022 DEVICE PAIRING, ACTIVATION & LIFECYCLE MANAGEMENT MODULE */}
        {activeTab === 'pairing' && <PairingModule />}

        {/* TAB 0.1: PROMPT 021 GPS WEARABLE DEVICE & IOT MODULE */}
        {activeTab === 'device' && <DeviceModule />}

        {/* TAB 0.1: PROMPT 020 LEARNER DIGITAL SAFETY PROFILE MODULE */}
        {activeTab === 'learner' && <LearnerModule />}

        {/* TAB 0.1: PROMPT 019 PARENT & GUARDIAN MANAGEMENT MODULE */}
        {activeTab === 'parent' && <ParentModule />}

        {/* TAB 0.1: PROMPT 018 SCHOOL MANAGEMENT MODULE */}
        {activeTab === 'school' && <SchoolModule />}

        {/* TAB 0.1: PROMPT 017 IDENTITY & AUTHENTICATION MODULE */}
        {activeTab === 'iam' && <IdentityAuthModule />}

        {/* TAB 0.1: PROMPT 016 NESTJS ENTERPRISE FOUNDATION */}
        {activeTab === 'nestjs' && <NestJsFoundation />}

        {/* TAB 0.5: DECISION ENGINE & THREAT MATRIX */}
        {activeTab === 'decision' && <DecisionEngine />}

        {/* TAB 1: SPRINT 1 ENGINEERING SPEC */}
        {activeTab === 'sprint1' && <Sprint1Spec />}

        {/* TAB 1.5: SPRINT 1 DATABASE IMPLEMENTATION */}
        {activeTab === 'db_sprint1' && <DatabaseSprint1 />}

        {/* TAB 2: SAFETY PIPELINE & EMERGENCY WORKFLOW */}
        {activeTab === 'pipeline' && <SafetyPipeline />}

        {/* TAB 1: CAPABILITY TAXONOMY EXPLORER */}
        {activeTab === 'capabilities' && (
          <div className="space-y-6">
            {/* Top Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Level 1 Domains</span>
                  <p className="text-2xl font-extrabold text-white mt-0.5">22 Domains</p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Level 2 Capabilities</span>
                  <p className="text-2xl font-extrabold text-indigo-400 mt-0.5">48 Capabilities</p>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Level 3 Services</span>
                  <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">96 Services</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Level 4 Software Modules</span>
                  <p className="text-2xl font-extrabold text-amber-400 mt-0.5">180+ Modules</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Domain Category Filter */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800">
              {['All', 'Core Operations', 'Safety & Emergency', 'Intelligence & Analytics', 'Enterprise & Administration'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    categoryFilter === cat
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Split View Explorer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Domain List */}
              <div className="lg:col-span-5 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
                {filteredDomains.map((domain) => {
                  const isSelected = selectedDomain?.id === domain.id;
                  return (
                    <div
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                          : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                            {ICON_MAP[domain.iconName] || <Layers className="w-5 h-5 text-indigo-400" />}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{domain.code}</span>
                              <span className="text-[10px] font-bold text-indigo-300 px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800/60">
                                {domain.category}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-white mt-0.5">{domain.name}</h3>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-indigo-400 translate-x-1' : 'text-slate-600'}`} />
                      </div>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{domain.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Selected Domain Details */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                {selectedDomain ? (
                  <>
                    <div className="border-b border-slate-800 pb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-mono text-indigo-400 font-bold">{selectedDomain.code}</span>
                        <span className="text-xs text-slate-400">• {selectedDomain.category}</span>
                      </div>
                      <h2 className="text-xl font-extrabold text-white">{selectedDomain.name} Domain</h2>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedDomain.description}</p>
                    </div>

                    <div className="space-y-6">
                      {selectedDomain.capabilities.map((cap) => (
                        <div key={cap.id} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/60 space-y-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                                {cap.code}
                              </span>
                              <h4 className="text-sm font-bold text-white">{cap.name}</h4>
                            </div>
                            <p className="text-xs text-slate-300 mt-1">{cap.description}</p>
                          </div>

                          <div className="space-y-3 pt-3 border-t border-slate-700/50">
                            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                              Level 3 Business Services & Level 4 Modules:
                            </span>

                            <div className="grid grid-cols-1 gap-3">
                              {cap.services.map((srv) => (
                                <div
                                  key={srv.id}
                                  onClick={() => setSelectedService(srv)}
                                  className="bg-slate-900/90 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-700/80 hover:border-indigo-500/50 cursor-pointer transition-all group"
                                >
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h5 className="text-xs font-bold text-indigo-200 group-hover:text-indigo-400 transition-colors">
                                        {srv.name}
                                      </h5>
                                      <p className="text-[11px] text-slate-400 mt-1">{srv.description}</p>
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap">
                                      Inspect Spec →
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800">
                                    {srv.softwareModules.map((mod, i) => (
                                      <span
                                        key={i}
                                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                                      >
                                        {mod}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="p-12 text-center text-slate-500 text-xs">
                    Select a domain on the left to view capabilities and software modules.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 4-LEVEL CAPABILITY MAP GRID */}
        {activeTab === 'matrix' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">ITIS Level 1–4 Enterprise Capability Map</h2>
              <p className="text-xs text-slate-400 mt-1">
                Full hierarchical representation from high-level core domains down to software component modules.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                    <th className="p-3 font-bold uppercase tracking-wider">Level 1 Domain</th>
                    <th className="p-3 font-bold uppercase tracking-wider">Level 2 Capability</th>
                    <th className="p-3 font-bold uppercase tracking-wider">Level 3 Business Service</th>
                    <th className="p-3 font-bold uppercase tracking-wider">Level 4 Software Modules</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {CAPABILITY_DOMAINS.map((domain) =>
                    domain.capabilities.map((cap) =>
                      cap.services.map((srv) => (
                        <tr key={srv.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 font-bold text-indigo-300 whitespace-nowrap">
                            {domain.name}
                          </td>
                          <td className="p-3 text-slate-200 font-medium whitespace-nowrap">
                            <span className="font-mono text-[10px] text-cyan-400 mr-1.5">{cap.code}</span>
                            {cap.name}
                          </td>
                          <td className="p-3 text-slate-300">
                            <button
                              onClick={() => setSelectedService(srv)}
                              className="text-indigo-400 hover:underline text-left font-semibold"
                            >
                              {srv.name}
                            </button>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {srv.softwareModules.map((m, i) => (
                                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                  {m}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: VISION 2035 ROADMAP */}
        {activeTab === 'vision' && <VisionMatrix />}

        {/* TAB 4: SRS OVERVIEW */}
        {activeTab === 'srs' && <SrsOverview />}
      </main>

      {/* Capability Detail Modal */}
      <CapabilityDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Elite Engineering Company. All Rights Reserved. Confidential Government Contract Deliverable.</p>
      </footer>
    </div>
  );
}
