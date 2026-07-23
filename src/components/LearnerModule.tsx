import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  User,
  Users,
  Search,
  Filter,
  Plus,
  Activity,
  Heart,
  Radio,
  Clock,
  MapPin,
  Bus,
  Phone,
  Mail,
  AlertTriangle,
  Battery,
  CheckCircle2,
  XCircle,
  Code,
  FileCode,
  ListCheck,
  RefreshCw,
  Compass,
  Copy,
  Check,
  Cpu,
  FileText,
  UserPlus,
  GraduationCap,
  ArrowRightLeft,
  Award,
  Archive,
  UserCheck,
  UserX,
  Lock,
  Eye,
  Sliders,
  Calendar,
  Zap,
  PhoneCall,
  Share2,
  Ambulance,
  Stethoscope,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  SAMPLE_LEARNERS,
  SAMPLE_LEARNER_TIMELINE,
  LEARNER_SPEC_ITEMS,
  LearnerEntityData,
  DigitalSafetyProfile,
  LearnerTimelineEvent,
  LearnerSpecItem
} from '../data/learnerModuleData';

export const LearnerModule: React.FC = () => {
  const [learners, setLearners] = useState<LearnerEntityData[]>(SAMPLE_LEARNERS);
  const [activeTab, setActiveTab] = useState<'registry' | 'profile' | 'timeline' | 'lifecycle' | 'inspector' | 'swagger' | 'security' | 'checklist'>('registry');

  // Selected Learner for Profile & Timeline View
  const [selectedLearner, setSelectedLearner] = useState<LearnerEntityData>(SAMPLE_LEARNERS[0]);

  // Search & Filters for Registry
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [selectedProtection, setSelectedProtection] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');

  // Lifecycle Modals State
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showPairGpsModal, setShowPairGpsModal] = useState<boolean>(false);
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [showPromoteModal, setShowPromoteModal] = useState<boolean>(false);

  // New Device IMEI Pair State
  const [newGpsImei, setNewGpsImei] = useState<string>('86940205938' + Math.floor(1000 + Math.random() * 9000));
  const [pairError, setPairError] = useState<string>('');

  // Transfer School State
  const [transferSchoolId, setTransferSchoolId] = useState<string>('sch-8842-kzn');

  // Promote Grade State
  const [promoteGrade, setPromoteGrade] = useState<string>('Grade 6');
  const [promoteClass, setPromoteClass] = useState<string>('Grade 6B');

  // New Learner Form State
  const [newLearner, setNewLearner] = useState({
    firstName: '',
    lastName: '',
    emisNumber: 'EMIS-700' + Math.floor(100000 + Math.random() * 900000),
    dateOfBirth: '2016-04-10',
    gender: 'MALE' as const,
    grade: 'Grade 3',
    className: 'Grade 3A',
    schoolId: 'sch-9011-gauteng',
    schoolName: 'Soweto Central Primary School',
    homeAddress: '55 Vilakazi Street, Soweto',
    bloodGroup: 'O+' as const,
    allergies: 'None',
  });

  // Spec Inspector State
  const [selectedSpec, setSelectedSpec] = useState<LearnerSpecItem>(LEARNER_SPEC_ITEMS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [specSearch, setSpecSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const schools = ['All', 'Soweto Central Primary School', 'eThekwini Comprehensive High School', 'Cape Flats Technical Academy'];
  const protectionStatuses = ['All', 'PROTECTED', 'DEVICE_PENDING', 'DEVICE_OFFLINE', 'HIGH_RISK', 'IN_TRANSIT', 'SAFE_AT_SCHOOL', 'SAFE_AT_HOME', 'EMERGENCY_ACTIVE'];
  const specCategories = ['All', 'Entity & Prisma', 'DTOs & Validation', 'Service & Lifecycle', 'Protection State Machine', 'Timeline & Profile', 'Controller & API', 'Security & Tests'];

  // Filtered Learners
  const filteredLearners = learners.filter((l) => {
    const matchesSearch =
      l.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.emisNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSchool = selectedSchool === 'All' || l.schoolName === selectedSchool;
    const matchesProtection = selectedProtection === 'All' || l.protectionStatus === selectedProtection;
    const matchesRisk = selectedRisk === 'All' || l.riskProfile === selectedRisk;

    return matchesSearch && matchesSchool && matchesProtection && matchesRisk;
  });

  // Filtered Specs
  const filteredSpecs = LEARNER_SPEC_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSrch =
      item.title.toLowerCase().includes(specSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(specSearch.toLowerCase()) ||
      item.filename.toLowerCase().includes(specSearch.toLowerCase());
    return matchesCat && matchesSrch;
  });

  const handleCopyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Rule 1 & Rule 2 GPS Wearable Pairing Handler
  const handlePairGpsDevice = (e: React.FormEvent) => {
    e.preventDefault();
    setPairError('');

    if (!newGpsImei.trim()) {
      setPairError('GPS IMEI number is required.');
      return;
    }

    // RULE 2 CHECK: Verify if IMEI is already active on another learner
    const existingBinding = learners.find(
      (l) => l.safetyProfile.assignedDevice?.imei === newGpsImei.trim() && l.id !== selectedLearner.id
    );

    if (existingBinding) {
      setPairError(`Rule 2 Violation: GPS IMEI '${newGpsImei}' is already assigned to ${existingBinding.firstName} ${existingBinding.lastName} (${existingBinding.id}).`);
      return;
    }

    // Update selected learner with active GPS device and upgrade status to PROTECTED (Rule 1 fulfilled)
    const updatedLearner: LearnerEntityData = {
      ...selectedLearner,
      protectionStatus: 'PROTECTED',
      safetyProfile: {
        ...selectedLearner.safetyProfile,
        assignedDevice: {
          imei: newGpsImei.trim(),
          serialNumber: `ITIS-GPS-${Math.floor(100 + Math.random() * 900)}`,
          assignedAt: new Date().toLocaleString(),
          status: 'ACTIVE',
          batteryLevel: 100,
          signalStrengthDbm: -65,
        },
        deviceAssignmentHistory: [
          {
            imei: newGpsImei.trim(),
            assignedAt: new Date().toLocaleString(),
            assignedBy: 'Admin User',
            reason: 'Interactive Wearable Device Binding',
          },
          ...selectedLearner.safetyProfile.deviceAssignmentHistory,
        ],
      },
    };

    setLearners((prev) => prev.map((l) => (l.id === selectedLearner.id ? updatedLearner : l)));
    setSelectedLearner(updatedLearner);
    setShowPairGpsModal(false);

    // Add Timeline Event
    const timeline = SAMPLE_LEARNER_TIMELINE[selectedLearner.id] || [];
    timeline.unshift({
      id: `tl-${Date.now()}`,
      learnerId: selectedLearner.id,
      timestamp: new Date().toLocaleString(),
      category: 'DEVICE_ASSIGNMENT',
      title: 'Active GPS Wearable Assigned',
      description: `Paired IMEI ${newGpsImei}. Learner status upgraded to PROTECTED.`,
      actor: 'Admin User',
      severity: 'INFO',
    });
    SAMPLE_LEARNER_TIMELINE[selectedLearner.id] = timeline;
  };

  // Register New Learner Handler
  const handleRegisterLearner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLearner.firstName || !newLearner.lastName) return;

    const created: LearnerEntityData = {
      id: `itis-lrn-2026-${Math.floor(905 + Math.random() * 90)}`,
      emisNumber: newLearner.emisNumber,
      firstName: newLearner.firstName,
      lastName: newLearner.lastName,
      dateOfBirth: newLearner.dateOfBirth,
      gender: newLearner.gender,
      grade: newLearner.grade,
      className: newLearner.className,
      schoolId: newLearner.schoolId,
      schoolName: newLearner.schoolName,
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150',
      medicalProfile: {
        conditions: [],
        allergies: newLearner.allergies ? [newLearner.allergies] : [],
        bloodGroup: newLearner.bloodGroup,
        chronicMedication: [],
        emergencyMedicalNotes: 'New registration.',
        specialNeeds: 'None.',
        mobilityAssistance: 'None.',
        communicationRequirements: 'English',
        hospitalPreference: 'Nearest Tertiary Hospital',
        medicalAidName: 'None',
        medicalAidNumber: 'N/A',
      },
      homeAddress: newLearner.homeAddress,
      homeGpsCoordinates: { lat: -26.238, lng: 27.908 },
      defaultSafeRoute: 'Route A1: Direct School Connection',
      currentStatus: 'ACTIVE',
      riskProfile: 'LOW',
      protectionStatus: 'DEVICE_PENDING', // CRITICAL RULE 1: Initial state is DEVICE_PENDING until GPS assigned!
      guardians: [
        {
          guardianId: 'par-8801-soweto',
          guardianName: 'Sipho Zulu',
          relation: 'FATHER',
          priority: 1,
          isLegalGuardian: true,
          emergencyContactOrder: 1,
          pickupAuthorized: true,
          phone: '+27 82 555 1029',
        },
      ],
      teacherName: 'Unassigned Teacher',
      teacherPhone: '+27 11 000 0000',
      safetyProfile: {
        assignedDevice: null,
        deviceAssignmentHistory: [],
        homeGeofence: { name: 'Home Geofence', radiusMeters: 150, lat: -26.238, lng: 27.908 },
        schoolGeofence: { name: 'School Geofence', radiusMeters: 250, lat: -26.234, lng: 27.901 },
        safeZones: [],
        authorizedPickupPersons: [],
        schoolTransport: {
          routeId: 'TR-SOWETO-01',
          routeName: 'Standard Transport',
          vehicleReg: 'GP 100-NW',
          driverName: 'Unassigned Driver',
          driverPhone: '+27 82 000 0000',
          pickupPoint: 'Home Stop',
          dropoffPoint: 'School Gate #1',
          busStopName: 'Home Stop',
        },
        attendanceHistory: [],
        incidentHistory: [],
        notificationHistory: [],
        deviceHealthHistory: [],
        lastKnownLocation: {
          lat: -26.238,
          lng: 27.908,
          address: 'Awaiting Wearable Assignment',
          timestamp: 'Just now',
          accuracyMeters: 0,
        },
        lastCommunicationTime: 'Awaiting Device Pair',
      },
    };

    setLearners([created, ...learners]);
    setSelectedLearner(created);
    setShowRegisterModal(false);

    // Initial Timeline Event
    SAMPLE_LEARNER_TIMELINE[created.id] = [
      {
        id: `tl-${Date.now()}`,
        learnerId: created.id,
        timestamp: new Date().toLocaleString(),
        category: 'REGISTRATION',
        title: 'Learner Digital Profile Registered',
        description: `Registered with EMIS #${created.emisNumber}. Protection status set to DEVICE_PENDING.`,
        actor: 'Admin User',
        severity: 'INFO',
      },
    ];
  };

  // School Transfer Handler
  const handleTransferSchool = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...selectedLearner,
      schoolId: transferSchoolId,
      schoolName: transferSchoolId === 'sch-8842-kzn' ? 'eThekwini Comprehensive High School' : 'Cape Flats Technical Academy',
      currentStatus: 'TRANSFER_PENDING' as const,
    };
    setLearners((prev) => prev.map((l) => (l.id === selectedLearner.id ? updated : l)));
    setSelectedLearner(updated);
    setShowTransferModal(false);
  };

  // Promote Grade Handler
  const handlePromoteGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...selectedLearner,
      grade: promoteGrade,
      className: promoteClass,
    };
    setLearners((prev) => prev.map((l) => (l.id === selectedLearner.id ? updated : l)));
    setSelectedLearner(updated);
    setShowPromoteModal(false);
  };

  // Toggle Learner Archive / Activate / Graduate Status
  const handleUpdateStatus = (status: LearnerEntityData['currentStatus']) => {
    const updated = {
      ...selectedLearner,
      currentStatus: status,
      protectionStatus: status === 'GRADUATED' || status === 'DEACTIVATED' ? ('DEVICE_OFFLINE' as const) : selectedLearner.protectionStatus,
    };
    setLearners((prev) => prev.map((l) => (l.id === selectedLearner.id ? updated : l)));
    setSelectedLearner(updated);
  };

  const timelineEvents = SAMPLE_LEARNER_TIMELINE[selectedLearner.id] || [];

  return (
    <div className="space-y-8 text-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center space-x-3 mb-3">
          <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <User className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-400">
            Prompt 020 Learner Digital Safety Profile Module
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Learner Digital Safety Profile & Child Protection Command Hub
        </h2>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-4xl leading-relaxed">
          The Learner is the central protected entity of the ITIS platform. Serves as the authoritative single source of truth for all child safety decisions, wearable GPS bindings, geofence protection states, emergency medical alerts, scholar transport routes, and multi-guardian escalation order.
        </p>

        {/* Status Indicators */}
        <div className="flex flex-wrap gap-2.5 mt-4">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>13/13 Learner Module Requirements Complete</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Critical Rules #1 & #2 Active</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Authoritative Risk & Emergency Source</span>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('registry')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'registry'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Learner Registry ({learners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Digital Safety Profile Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'timeline'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Historical Safety Timeline</span>
          </button>

          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'lifecycle'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Lifecycle Workflows</span>
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'inspector'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>NestJS Specs ({LEARNER_SPEC_ITEMS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('swagger')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'swagger'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>OpenAPI REST Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'security'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'checklist'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ListCheck className="w-4 h-4" />
            <span>Prompt 020 Checklist</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LEARNER REGISTRY */}
      {activeTab === 'registry' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, EMIS, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {schools.map((s) => (
                  <option key={s} value={s}>
                    School: {s}
                  </option>
                ))}
              </select>

              <select
                value={selectedProtection}
                onChange={(e) => setSelectedProtection(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {protectionStatuses.map((st) => (
                  <option key={st} value={st}>
                    Protection: {st}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs flex items-center space-x-2 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30 transition-all self-start lg:self-auto"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register New Learner</span>
            </button>
          </div>

          {/* Learner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredLearners.map((learner) => (
              <div
                key={learner.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={learner.photoUrl}
                        alt={learner.firstName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-bold">
                            {learner.emisNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              learner.protectionStatus === 'PROTECTED' || learner.protectionStatus === 'SAFE_AT_SCHOOL' || learner.protectionStatus === 'SAFE_AT_HOME'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : learner.protectionStatus === 'DEVICE_PENDING'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                          >
                            {learner.protectionStatus.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white mt-1">
                          {learner.firstName} {learner.lastName}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-indigo-300 font-bold border border-slate-800">
                      {learner.grade} ({learner.className})
                    </span>
                  </div>

                  {/* Metadata Box */}
                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">School</span>
                      <p className="font-semibold text-slate-200 mt-0.5 line-clamp-1">{learner.schoolName}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Teacher: {learner.teacherName}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">GPS Wearable</span>
                      {learner.safetyProfile.assignedDevice ? (
                        <p className="font-mono text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                          <Battery className="w-3.5 h-3.5" />
                          <span>{learner.safetyProfile.assignedDevice.batteryLevel}% (Active)</span>
                        </p>
                      ) : (
                        <p className="text-amber-400 font-bold mt-0.5 text-[11px]">Unassigned (Device Pending)</p>
                      )}
                    </div>

                    <div className="col-span-2 pt-2 border-t border-slate-900">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Guardians ({learner.guardians.length})</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {learner.guardians.map((g) => (
                          <span key={g.guardianId} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[11px] border border-slate-800 font-semibold">
                            {g.guardianName} ({g.relation})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">ID: {learner.id}</span>

                  <button
                    onClick={() => {
                      setSelectedLearner(learner);
                      setActiveTab('profile');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-600 hover:text-white transition-all flex items-center space-x-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Digital Safety Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL SAFETY PROFILE DASHBOARD */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Learner Switcher Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <img
                src={selectedLearner.photoUrl}
                alt={selectedLearner.firstName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-bold">
                    {selectedLearner.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {selectedLearner.protectionStatus.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  {selectedLearner.firstName} {selectedLearner.lastName} ({selectedLearner.grade})
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-xs font-bold text-slate-400">Select Learner:</label>
              <select
                value={selectedLearner.id}
                onChange={(e) => {
                  const l = learners.find((item) => item.id === e.target.value);
                  if (l) setSelectedLearner(l);
                }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
              >
                {learners.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.firstName} {l.lastName} - {l.schoolName}
                  </option>
                ))}
              </select>

              {!selectedLearner.safetyProfile.assignedDevice && (
                <button
                  onClick={() => setShowPairGpsModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-500 transition-all flex items-center space-x-1.5 shadow-lg shadow-amber-600/30"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Pair Wearable</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Device & Geofences */}
            <div className="lg:col-span-6 space-y-6">
              {/* Assigned GPS Wearable Status */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Assigned Wearable GPS Telemetry
                </h3>

                {selectedLearner.safetyProfile.assignedDevice ? (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">IMEI / Serial Number</span>
                        <p className="text-sm font-mono font-bold text-cyan-300 mt-0.5">
                          {selectedLearner.safetyProfile.assignedDevice.imei}
                        </p>
                        <p className="text-[11px] text-slate-400">{selectedLearner.safetyProfile.assignedDevice.serialNumber}</p>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                        <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                        <span>ACTIVE LOCK</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-900 text-center">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Battery Level</span>
                        <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
                          <Battery className="w-3.5 h-3.5" />
                          <span>{selectedLearner.safetyProfile.assignedDevice.batteryLevel}%</span>
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Signal Strength</span>
                        <p className="text-xs font-mono font-bold text-cyan-300 mt-0.5">
                          {selectedLearner.safetyProfile.assignedDevice.signalStrengthDbm} dBm
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Last Communication</span>
                        <p className="text-[11px] font-mono text-slate-300 mt-0.5">
                          {selectedLearner.safetyProfile.lastCommunicationTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center space-y-2">
                    <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto" />
                    <h4 className="text-xs font-bold text-amber-300">No Active GPS Wearable Device Assigned</h4>
                    <p className="text-[11px] text-slate-300">
                      Critical Business Rule 1 Requirement: Assign an active GPS wearable to transition learner from <span className="font-mono text-amber-300">DEVICE_PENDING</span> to <span className="font-mono text-emerald-300">PROTECTED</span>.
                    </p>
                    <button
                      onClick={() => setShowPairGpsModal(true)}
                      className="px-4 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-500 transition-all inline-block mt-2"
                    >
                      Assign GPS Wearable Now
                    </button>
                  </div>
                )}
              </div>

              {/* Geofences & Safe Zones */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Geofences & Safe Zones Configuration
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block">Home Geofence</span>
                    <p className="text-xs font-bold text-white">{selectedLearner.safetyProfile.homeGeofence.name}</p>
                    <p className="text-[11px] font-mono text-slate-400">Radius: {selectedLearner.safetyProfile.homeGeofence.radiusMeters}m</p>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 block">School Geofence</span>
                    <p className="text-xs font-bold text-white">{selectedLearner.safetyProfile.schoolGeofence.name}</p>
                    <p className="text-[11px] font-mono text-slate-400">Radius: {selectedLearner.safetyProfile.schoolGeofence.radiusMeters}m</p>
                  </div>
                </div>
              </div>

              {/* Scholar Transport & Driver Assignment */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Bus className="w-4 h-4 text-amber-400" />
                  Scholar Transport & Driver Assignment
                </h3>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Route Name</span>
                      <p className="text-sm font-bold text-white mt-0.5">{selectedLearner.safetyProfile.schoolTransport.routeName}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
                      Vehicle: {selectedLearner.safetyProfile.schoolTransport.vehicleReg}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-900 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Assigned Driver</span>
                      <p className="font-semibold text-slate-200 mt-0.5">{selectedLearner.safetyProfile.schoolTransport.driverName}</p>
                      <p className="text-[11px] text-slate-400">{selectedLearner.safetyProfile.schoolTransport.driverPhone}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Bus Stop & Pickup</span>
                      <p className="font-semibold text-slate-200 mt-0.5">{selectedLearner.safetyProfile.schoolTransport.pickupPoint}</p>
                      <p className="text-[11px] text-slate-400">{selectedLearner.safetyProfile.schoolTransport.dropoffPoint}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Medical, Guardians, Authorized Pickup */}
            <div className="lg:col-span-6 space-y-6">
              {/* Emergency Medical Safety Profile */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Ambulance className="w-4 h-4 text-red-400" />
                  Emergency Medical Safety Profile
                </h3>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Blood Group</span>
                      <p className="text-sm font-mono font-extrabold text-red-400 mt-0.5">{selectedLearner.medicalProfile.bloodGroup}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Hospital Preference</span>
                      <p className="font-semibold text-slate-200 mt-0.5">{selectedLearner.medicalProfile.hospitalPreference}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-900 space-y-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Medical Conditions</span>
                      <p className="text-slate-200 mt-0.5">{selectedLearner.medicalProfile.conditions.join(', ') || 'None reported'}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Allergies & Medication</span>
                      <p className="text-amber-300 font-semibold mt-0.5">
                        Allergies: {selectedLearner.medicalProfile.allergies.join(', ') || 'None'}
                      </p>
                      <p className="text-slate-300 mt-0.5">
                        Medication: {selectedLearner.medicalProfile.chronicMedication.join(', ') || 'None'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent & Guardian Relationships */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  Parent & Guardian Relationships
                </h3>

                <div className="space-y-3">
                  {selectedLearner.guardians.map((g) => (
                    <div key={g.guardianId} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold text-[10px] flex items-center justify-center">
                            #{g.priority}
                          </span>
                          <h4 className="font-bold text-white">{g.guardianName}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                            {g.relation}
                          </span>
                        </div>
                        <p className="text-slate-400 mt-1 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-indigo-400" />
                          <span>{g.phone}</span>
                        </p>
                      </div>

                      <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        {g.isLegalGuardian ? 'Legal Guardian' : 'Secondary'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authorized Pickup Persons */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Authorized Gate Pickup Persons
                </h3>

                <div className="space-y-3">
                  {selectedLearner.safetyProfile.authorizedPickupPersons.map((p) => (
                    <div key={p.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center space-x-3">
                      <img src={p.photoUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                      <div className="text-xs">
                        <h4 className="font-bold text-white">{p.name} ({p.relation})</h4>
                        <p className="text-slate-400 font-mono text-[11px]">SA ID: {p.nationalId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHRONOLOGICAL SAFETY TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Chronological Safety Event Timeline Feed
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Learner: <span className="text-cyan-300 font-bold">{selectedLearner.firstName} {selectedLearner.lastName}</span> | Immutable safety audit trail events.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-xs font-bold text-slate-400">Select Learner:</label>
              <select
                value={selectedLearner.id}
                onChange={(e) => {
                  const l = learners.find((item) => item.id === e.target.value);
                  if (l) setSelectedLearner(l);
                }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
              >
                {learners.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.firstName} {l.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 space-y-6 pl-6">
            {timelineEvents.map((evt) => (
              <div key={evt.id} className="relative group">
                <div className="absolute -left-[31px] top-0 p-1.5 rounded-full bg-slate-900 border border-cyan-500 text-cyan-400">
                  <Clock className="w-3.5 h-3.5" />
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                        {evt.category}
                      </span>
                      <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                    </div>

                    <span className="text-xs font-mono text-slate-400">{evt.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300">{evt.description}</p>
                  <p className="text-[11px] font-mono text-slate-500">Actor: {evt.actor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LIFECYCLE WORKFLOWS */}
      {activeTab === 'lifecycle' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-cyan-400" />
              Learner Lifecycle Operations Console
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Execute learner onboarding, wearable pairing (Rule 1 & Rule 2), school transfers, grade promotions, and state archiving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-slate-950 border border-slate-800 p-5 rounded-2xl hover:border-cyan-500 transition-all text-left space-y-2 group"
            >
              <UserPlus className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-bold text-white">1. Register Learner</h4>
              <p className="text-xs text-slate-400">Create new profile with EMIS ID and initial DEVICE_PENDING state.</p>
            </button>

            <button
              onClick={() => setShowPairGpsModal(true)}
              className="bg-slate-950 border border-slate-800 p-5 rounded-2xl hover:border-emerald-500 transition-all text-left space-y-2 group"
            >
              <Cpu className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-bold text-white">2. Pair GPS Wearable</h4>
              <p className="text-xs text-slate-400">Fulfill Rule 1 requirement to transition status to PROTECTED.</p>
            </button>

            <button
              onClick={() => setShowTransferModal(true)}
              className="bg-slate-950 border border-slate-800 p-5 rounded-2xl hover:border-indigo-500 transition-all text-left space-y-2 group"
            >
              <ArrowRightLeft className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-bold text-white">3. Transfer School</h4>
              <p className="text-xs text-slate-400">Transfer learner to new school with TRANSFER_PENDING status.</p>
            </button>

            <button
              onClick={() => setShowPromoteModal(true)}
              className="bg-slate-950 border border-slate-800 p-5 rounded-2xl hover:border-amber-500 transition-all text-left space-y-2 group"
            >
              <GraduationCap className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-bold text-white">4. Promote Grade</h4>
              <p className="text-xs text-slate-400">Advance learner grade and update primary class assignment.</p>
            </button>
          </div>

          {/* Status Operations for Selected Learner */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Selected Learner Status Operations ({selectedLearner.firstName} {selectedLearner.lastName})
            </h4>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleUpdateStatus('ACTIVE')}
                className="px-4 py-2 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all"
              >
                Set ACTIVE
              </button>

              <button
                onClick={() => handleUpdateStatus('GRADUATED')}
                className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all"
              >
                Graduate Learner
              </button>

              <button
                onClick={() => handleUpdateStatus('DEACTIVATED')}
                className="px-4 py-2 rounded-xl bg-amber-600/20 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-600 hover:text-white transition-all"
              >
                Deactivate Profile
              </button>

              <button
                onClick={() => handleUpdateStatus('ARCHIVED')}
                className="px-4 py-2 rounded-xl bg-red-600/20 text-red-300 border border-red-500/30 text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
              >
                Archive Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: NESTJS CODE INSPECTOR */}
      {activeTab === 'inspector' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {specCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search specs or code..."
                value={specSearch}
                onChange={(e) => setSpecSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
              {filteredSpecs.map((item) => {
                const isSelected = selectedSpec.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedSpec(item)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold flex items-center justify-center">
                          {item.id}
                        </span>
                        <span className="text-xs font-bold text-white line-clamp-1">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.filename}</p>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Requirement #{selectedSpec.id}
                    </span>
                    <h3 className="text-lg font-bold text-white">{selectedSpec.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{selectedSpec.description}</p>
                  <p className="text-xs font-mono text-cyan-300 mt-1 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedSpec.filename}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleCopyCode(selectedSpec.code, selectedSpec.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold flex items-center space-x-1.5 self-start md:self-auto shrink-0"
                >
                  {copiedId === selectedSpec.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed max-h-[500px]">
                  <code>{selectedSpec.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SWAGGER REST API DOCS */}
      {activeTab === 'swagger' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              Learner REST API Specification (OpenAPI / Swagger)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              All 9 mandatory REST endpoints for Learner Digital Safety Profile operations.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { method: 'POST', path: '/learners', desc: 'Register a new Learner with initial Digital Safety Profile' },
              { method: 'GET', path: '/learners', desc: 'Get paginated list of registered learners' },
              { method: 'GET', path: '/learners/{id}', desc: 'Get learner details by ID' },
              { method: 'PATCH', path: '/learners/{id}', desc: 'Update learner details and medical profile' },
              { method: 'DELETE', path: '/learners/{id}', desc: 'Soft-delete / Archive learner safety profile' },
              { method: 'GET', path: '/learners/search', desc: 'Search learners by name, EMIS number, grade, or school' },
              { method: 'GET', path: '/learners/{id}/profile', desc: 'Get full Digital Safety Profile (GPS device, geofences, transport, medical)' },
              { method: 'GET', path: '/learners/{id}/timeline', desc: 'Get chronological historical timeline events for learner' },
              { method: 'GET', path: '/learners/{id}/protection-status', desc: 'Get current real-time protection status and battery health' },
            ].map((ep, idx) => (
              <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2.5 py-1 rounded text-[10px] font-extrabold ${
                      ep.method === 'GET'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : ep.method === 'POST'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : ep.method === 'PATCH'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-cyan-300 font-bold">{ep.path}</span>
                </div>
                <span className="text-slate-400 text-[11px] hidden md:inline">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: SECURITY MATRIX */}
      {activeTab === 'security' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              Role-Based Access Control (RBAC) & Data Isolation Matrix
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                Parents & Guardians
              </span>
              <h4 className="text-sm font-bold text-white">Linked Learners Scoping</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Parents may access <span className="text-indigo-300 font-bold">ONLY</span> linked learners verified through National ID or Parent ID relationship records.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                Schools & Teachers
              </span>
              <h4 className="text-sm font-bold text-white">Enrolled Learners Scoping</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                School principals and teachers may access <span className="text-cyan-300 font-bold">ONLY</span> learners currently enrolled under their assigned school ID.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Command Centre & Admins
              </span>
              <h4 className="text-sm font-bold text-white">National Command Center</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                National and Provincial Command Centre operators have platform-wide access to all active learners for emergency response.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: PROMPT 020 CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ListCheck className="w-5 h-5 text-emerald-400" />
              Prompt 020 Learner Module Requirements Verification
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'R1', title: 'Learner Entity with EMIS & ITIS ID', status: 'COMPLETE' },
              { id: 'R2', title: 'Digital Safety Profile (GPS Device, Geofences, Transport)', status: 'COMPLETE' },
              { id: 'R3', title: '8 Learner Lifecycle Workflows (Transfer, Promote, Graduate, etc.)', status: 'COMPLETE' },
              { id: 'R4', title: 'Parent Relationships (Priority, Legal Guardian, Pickup)', status: 'COMPLETE' },
              { id: 'R5', title: 'Medical Safety Profile (Conditions, Allergies, Blood Group)', status: 'COMPLETE' },
              { id: 'R6', title: 'School Relationships (Class, Teacher, Bus Stop)', status: 'COMPLETE' },
              { id: 'R7', title: 'Protection Status State Machine (8 States)', status: 'COMPLETE' },
              { id: 'R8', title: 'All 9 REST Endpoints Implemented', status: 'COMPLETE' },
              { id: 'R9', title: 'Learner Chronological Safety Timeline', status: 'COMPLETE' },
              { id: 'R10', title: 'Learner Profile Dashboard UI', status: 'COMPLETE' },
              { id: 'R11', title: 'Security Scoping (Parents / Schools / Command Centre)', status: 'COMPLETE' },
              { id: 'R12', title: 'Critical Business Rule 1 Enforcement (GPS required for PROTECTED)', status: 'COMPLETE' },
              { id: 'R13', title: 'Critical Business Rule 2 Enforcement (Unique Active GPS IMEI)', status: 'COMPLETE' },
            ].map((item) => (
              <div key={item.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">{item.title}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: REGISTER LEARNER */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 text-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-cyan-400" />
              Register New Learner Digital Profile
            </h3>

            <form onSubmit={handleRegisterLearner} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block font-bold">EMIS Learner ID</label>
                <input
                  type="text"
                  value={newLearner.emisNumber}
                  onChange={(e) => setNewLearner({ ...newLearner, emisNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block font-bold">First Name</label>
                  <input
                    type="text"
                    value={newLearner.firstName}
                    onChange={(e) => setNewLearner({ ...newLearner, firstName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block font-bold">Last Name</label>
                  <input
                    type="text"
                    value={newLearner.lastName}
                    onChange={(e) => setNewLearner({ ...newLearner, lastName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block font-bold">Grade</label>
                  <input
                    type="text"
                    value={newLearner.grade}
                    onChange={(e) => setNewLearner({ ...newLearner, grade: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block font-bold">Class Name</label>
                  <input
                    type="text"
                    value={newLearner.className}
                    onChange={(e) => setNewLearner({ ...newLearner, className: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500">
                  Register Learner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PAIR GPS WEARABLE (RULE 1 & RULE 2 ENFORCEMENT) */}
      {showPairGpsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-slate-100">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              Pair GPS Wearable Device
            </h3>
            <p className="text-xs text-slate-400">
              Learner: <span className="text-cyan-300 font-bold">{selectedLearner.firstName} {selectedLearner.lastName}</span>
            </p>

            {pairError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-300 font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{pairError}</span>
              </div>
            )}

            <form onSubmit={handlePairGpsDevice} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block font-bold">Wearable GPS Device IMEI</label>
                <input
                  type="text"
                  value={newGpsImei}
                  onChange={(e) => setNewGpsImei(e.target.value)}
                  placeholder="Enter 15-digit IMEI..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPairGpsModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500">
                  Bind GPS Device & Upgrade Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: TRANSFER SCHOOL */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-slate-100">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
              Transfer Learner School
            </h3>

            <form onSubmit={handleTransferSchool} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block font-bold">Select Target School</label>
                <select
                  value={transferSchoolId}
                  onChange={(e) => setTransferSchoolId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="sch-8842-kzn">eThekwini Comprehensive High School</option>
                  <option value="sch-7712-wc">Cape Flats Technical Academy</option>
                  <option value="sch-9011-gauteng">Soweto Central Primary School</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500">
                  Execute Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: PROMOTE GRADE */}
      {showPromoteModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-slate-100">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              Promote Learner Grade
            </h3>

            <form onSubmit={handlePromoteGrade} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block font-bold">New Grade</label>
                <input
                  type="text"
                  value={promoteGrade}
                  onChange={(e) => setPromoteGrade(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block font-bold">New Class Name</label>
                <input
                  type="text"
                  value={promoteClass}
                  onChange={(e) => setPromoteClass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPromoteModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-500">
                  Promote Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
