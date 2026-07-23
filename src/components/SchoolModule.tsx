import React, { useState } from 'react';
import {
  School,
  Building2,
  MapPin,
  Phone,
  Mail,
  UserCheck,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Code,
  ListCheck,
  Activity,
  Layers,
  Copy,
  Check,
  FileCode,
  ShieldCheck,
  Compass,
  Radio,
  Users,
  HardDrive,
  Bus,
  ShieldAlert,
  Clock,
  Globe,
  Sparkles,
  ChevronRight,
  Maximize2,
  Navigation
} from 'lucide-react';
import {
  SAMPLE_SCHOOLS,
  SCHOOL_DASHBOARD_MOCK,
  SCHOOL_SPEC_ITEMS,
  SchoolEntityData,
  SchoolDashboardStats,
  SchoolSpecItem
} from '../data/schoolModuleData';

export const SchoolModule: React.FC = () => {
  const [schools, setSchools] = useState<SchoolEntityData[]>(SAMPLE_SCHOOLS);
  const [activeView, setActiveView] = useState<'registry' | 'dashboard' | 'inspector' | 'swagger' | 'security' | 'checklist'>('registry');
  
  // Filtering & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Selected School for Modal or Dashboard View
  const [selectedSchool, setSelectedSchool] = useState<SchoolEntityData>(SAMPLE_SCHOOLS[0]);
  const [showDashboardModal, setShowDashboardModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // New School Form State
  const [newSchool, setNewSchool] = useState<Partial<SchoolEntityData>>({
    emisNumber: '800500' + Math.floor(100 + Math.random() * 900),
    name: '',
    province: 'Gauteng',
    district: 'Johannesburg East',
    municipality: 'City of Johannesburg',
    address: '',
    latitude: -26.2041,
    longitude: 28.0473,
    phone: '+27 11 555 0199',
    email: 'info@newschool.edu.za',
    principalName: '',
    principalPhone: '+27 82 000 1122',
    capacity: 1000,
    schoolType: 'PRIMARY',
    primaryLanguage: 'English',
    openingTime: '07:30',
    closingTime: '14:30'
  });

  // Code Inspector State
  const [selectedSpec, setSelectedSpec] = useState<SchoolSpecItem>(SCHOOL_SPEC_ITEMS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [specSearch, setSpecSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const provinces = ['All', 'Gauteng', 'KwaZulu-Natal', 'Western Cape', 'Eastern Cape', 'Limpopo', 'Mpumalanga', 'Free State', 'North West', 'Northern Cape'];
  const specCategories = ['All', 'Entity & DTOs', 'Service & Logic', 'Controller & API', 'Geospatial & Spatial', 'Dashboard Aggregator', 'Security & Tests', 'Architecture & Flow'];

  // Filtered Schools
  const filteredSchools = schools.filter((sch) => {
    const matchesSearch =
      sch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.emisNumber.includes(searchTerm) ||
      sch.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.principalName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvince = selectedProvince === 'All' || sch.province === selectedProvince;
    const matchesStatus = selectedStatus === 'All' || sch.status === selectedStatus;
    const matchesType = selectedType === 'All' || sch.schoolType === selectedType;

    return matchesSearch && matchesProvince && matchesStatus && matchesType;
  });

  // Filtered Specs
  const filteredSpecs = SCHOOL_SPEC_ITEMS.filter((item) => {
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

  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchool.name || !newSchool.emisNumber) return;

    const created: SchoolEntityData = {
      id: `sch-${Date.now()}`,
      emisNumber: newSchool.emisNumber || '700999000',
      name: newSchool.name || 'New Academy',
      province: newSchool.province || 'Gauteng',
      district: newSchool.district || 'Johannesburg District',
      municipality: newSchool.municipality || 'City of Johannesburg',
      address: newSchool.address || '10 Main Road, Johannesburg',
      latitude: Number(newSchool.latitude) || -26.2041,
      longitude: Number(newSchool.longitude) || 28.0473,
      phone: newSchool.phone || '+27 11 000 0000',
      email: newSchool.email || 'admin@school.edu.za',
      principalName: newSchool.principalName || 'Dr. Principal',
      principalPhone: newSchool.principalPhone || '+27 82 123 4567',
      status: 'ACTIVE',
      capacity: Number(newSchool.capacity) || 1000,
      schoolType: (newSchool.schoolType as any) || 'PRIMARY',
      primaryLanguage: newSchool.primaryLanguage || 'English',
      openingTime: newSchool.openingTime || '07:30',
      closingTime: newSchool.closingTime || '14:30',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Add mock dashboard entry
    SCHOOL_DASHBOARD_MOCK[created.id] = {
      schoolId: created.id,
      totalLearners: 500,
      assignedDevices: 480,
      onlineDevices: 460,
      offlineDevices: 20,
      activeIncidents: 0,
      todayAttendancePercentage: 97.5,
      assignedVehicles: 6,
      assignedDrivers: 6,
      activeGeofences: 2
    };

    setSchools([created, ...schools]);
    setShowCreateModal(false);
    setSelectedSchool(created);
  };

  const handleToggleStatus = (id: string) => {
    setSchools((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'ACTIVE' ? 'INACTIVE' : s.status === 'INACTIVE' ? 'ARCHIVED' : 'ACTIVE';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  // Get current dashboard stats
  const currentStats = SCHOOL_DASHBOARD_MOCK[selectedSchool.id] || {
    schoolId: selectedSchool.id,
    totalLearners: 850,
    assignedDevices: 820,
    onlineDevices: 790,
    offlineDevices: 30,
    activeIncidents: 0,
    todayAttendancePercentage: 96.8,
    assignedVehicles: 10,
    assignedDrivers: 10,
    activeGeofences: 2
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center space-x-3 mb-3">
          <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <School className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-400">
            Prompt 018 School Management Module
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Enterprise School Infrastructure & Geospatial Hub
        </h2>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-4xl leading-relaxed">
          Production NestJS School Management backend. Manages EMIS registration numbers, provincial school clusters, PostGIS GPS coordinates, boundary validation, status lifecycles (Active, Inactive, Archived), and real-time aggregated school telemetry dashboards.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2.5 mt-4">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>10/10 School Requirements Complete</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>PostGIS GPS Spatial Geofence Ready</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Aggregated Dashboard Telemetry</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>RBAC Protected (Admins / Parents Read-only)</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveView('registry')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'registry'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>School Registry ({schools.length} Schools)</span>
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'dashboard'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>School Dashboard Aggregator</span>
          </button>

          <button
            onClick={() => setActiveView('inspector')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'inspector'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>NestJS Code Inspector ({SCHOOL_SPEC_ITEMS.length} Specs)</span>
          </button>

          <button
            onClick={() => setActiveView('swagger')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'swagger'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>OpenAPI Swagger API Specs</span>
          </button>

          <button
            onClick={() => setActiveView('security')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'security'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>RBAC Security Matrix</span>
          </button>

          <button
            onClick={() => setActiveView('checklist')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'checklist'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ListCheck className="w-4 h-4" />
            <span>Prompt 018 Checklist</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: SCHOOL REGISTRY & INTERACTIVE SIMULATOR */}
      {activeView === 'registry' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search EMIS, name, district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Province Filter */}
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    Province: {p}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">Status: All</option>
                <option value="ACTIVE">Status: ACTIVE</option>
                <option value="INACTIVE">Status: INACTIVE</option>
                <option value="ARCHIVED">Status: ARCHIVED</option>
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">Type: All</option>
                <option value="PRIMARY">PRIMARY</option>
                <option value="SECONDARY">SECONDARY</option>
                <option value="COMBINED">COMBINED</option>
                <option value="SPECIAL">SPECIAL</option>
              </select>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs flex items-center space-x-2 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30 transition-all self-start lg:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create New School</span>
            </button>
          </div>

          {/* School Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredSchools.map((school) => {
              const stats = SCHOOL_DASHBOARD_MOCK[school.id] || {
                totalLearners: 800,
                onlineDevices: 750,
                assignedDevices: 780,
                activeIncidents: 0
              };

              return (
                <div
                  key={school.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          <School className="w-5 h-5" />
                        </span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-bold">
                              EMIS: {school.emisNumber}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                school.status === 'ACTIVE'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : school.status === 'INACTIVE'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}
                            >
                              {school.status}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white mt-1 line-clamp-1">{school.name}</h3>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleStatus(school.id)}
                        title="Cycle Operational Status"
                        className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Metadata Details */}
                    <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Province & District</span>
                        <p className="font-semibold text-slate-200 mt-0.5">{school.province}</p>
                        <p className="text-[11px] text-slate-400">{school.district}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">GPS Coordinates</span>
                        <p className="font-mono text-cyan-300 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>{school.latitude.toFixed(4)}, {school.longitude.toFixed(4)}</span>
                        </p>
                      </div>

                      <div className="col-span-2 pt-2 border-t border-slate-900">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Principal & Contacts</span>
                        <p className="font-semibold text-slate-200 mt-0.5">{school.principalName} ({school.principalPhone})</p>
                        <p className="text-[11px] text-slate-400">{school.email} | {school.phone}</p>
                      </div>
                    </div>

                    {/* Mini Aggregated Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                      <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">Learners</span>
                        <span className="text-xs font-mono font-bold text-cyan-300">{stats.totalLearners}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">Devices</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{stats.onlineDevices} Online</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">Incidents</span>
                        <span className={`text-xs font-mono font-bold ${stats.activeIncidents > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                          {stats.activeIncidents} Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">
                      Hours: {school.openingTime} - {school.closingTime} ({school.schoolType})
                    </span>

                    <button
                      onClick={() => {
                        setSelectedSchool(school);
                        setActiveView('dashboard');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-600 hover:text-white transition-all flex items-center space-x-1.5"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>View Aggregated Dashboard</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: AGGREGATED SCHOOL DASHBOARD */}
      {activeView === 'dashboard' && (
        <div className="space-y-6">
          {/* Selector bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <School className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-400 block">
                  Active School Metrics Aggregator
                </span>
                <h3 className="text-lg font-extrabold text-white">{selectedSchool.name}</h3>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-xs font-bold text-slate-400">Select School:</label>
              <select
                value={selectedSchool.id}
                onChange={(e) => {
                  const s = schools.find((sch) => sch.id === e.target.value);
                  if (s) setSelectedSchool(s);
                }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
              >
                {schools.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.province})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 9 Aggregated Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1: Total Learners */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Total Enrolled Learners</span>
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-white">{currentStats.totalLearners}</p>
              <p className="text-[11px] text-slate-400">Capacity utilization: {((currentStats.totalLearners / selectedSchool.capacity) * 100).toFixed(1)}% ({selectedSchool.capacity} Max)</p>
            </div>

            {/* Card 2: Assigned Devices */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Assigned Wearables & Gateways</span>
                <HardDrive className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-indigo-300">{currentStats.assignedDevices}</p>
              <p className="text-[11px] text-slate-400">IoT Wearable smart cards paired with active learners</p>
            </div>

            {/* Card 3: Online Devices */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Online Active Devices</span>
                <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-emerald-400">{currentStats.onlineDevices}</p>
              <p className="text-[11px] text-emerald-300 font-semibold">
                {currentStats.assignedDevices > 0 ? ((currentStats.onlineDevices / currentStats.assignedDevices) * 100).toFixed(1) : 0}% Active Telemetry Signal
              </p>
            </div>

            {/* Card 4: Offline Devices */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Offline Devices</span>
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-amber-400">{currentStats.offlineDevices}</p>
              <p className="text-[11px] text-slate-400">Low battery or disconnected from bus gateway</p>
            </div>

            {/* Card 5: Active Incidents */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Active Open Incidents</span>
                <ShieldAlert className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-red-400">{currentStats.activeIncidents}</p>
              <p className="text-[11px] text-slate-400">Geofence breach or unassigned stop alerts</p>
            </div>

            {/* Card 6: Today's Attendance */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Today's Attendance</span>
                <UserCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-cyan-300">{currentStats.todayAttendancePercentage}%</p>
              <p className="text-[11px] text-slate-400">NFC attendance verification rollcall</p>
            </div>

            {/* Card 7: Vehicles */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Scholar Buses / Vans</span>
                <Bus className="w-5 h-5 text-slate-300" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-white">{currentStats.assignedVehicles}</p>
              <p className="text-[11px] text-slate-400">Assigned scholar transport fleet</p>
            </div>

            {/* Card 8: Drivers */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Assigned Drivers</span>
                <Users className="w-5 h-5 text-slate-300" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-white">{currentStats.assignedDrivers}</p>
              <p className="text-[11px] text-slate-400">Verified scholar transport drivers</p>
            </div>

            {/* Card 9: Geofences */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Active Geofences</span>
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold font-mono text-emerald-300">{currentStats.activeGeofences}</p>
              <p className="text-[11px] text-slate-400">School perimeter polygon geofences</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: NESTJS CODE INSPECTOR */}
      {activeView === 'inspector' && (
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
                placeholder="Search school specs or code..."
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
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700 whitespace-nowrap self-start md:self-auto"
                >
                  {copiedId === selectedSpec.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedId === selectedSpec.id ? 'Copied Code!' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedSpec.highlights.map((hl, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800 text-[11px] font-medium flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>

              <pre className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed max-h-[500px]">
                {selectedSpec.code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: SWAGGER API SPECS */}
      {activeView === 'swagger' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              School Management OpenAPI / Swagger Route Endpoints
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Complete production OpenAPI specs for all 7 required REST endpoints mapped to RBAC permissions.
            </p>
          </div>

          <div className="space-y-4">
            {/* POST /schools */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  POST
                </span>
                <span className="font-mono text-sm font-bold text-white">/api/v1/schools</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">
                  [SYSTEM_ADMIN, NATIONAL_ADMIN, PROVINCIAL_ADMIN]
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Creates a new school entity after validating EMIS uniqueness and South Africa GPS coordinates.
              </p>
            </div>

            {/* GET /schools */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  GET
                </span>
                <span className="font-mono text-sm font-bold text-white">/api/v1/schools</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">
                  [schools.view]
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Retrieves paginated list of active schools with optional province and status filters.
              </p>
            </div>

            {/* GET /schools/{id} */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  GET
                </span>
                <span className="font-mono text-sm font-bold text-white">/api/v1/schools/{'{id}'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">
                  [schools.view]
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Retrieves single school record by UUID. Accessible to admins and parents (read-only for own school).
              </p>
            </div>

            {/* PATCH /schools/{id} */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  PATCH
                </span>
                <span className="font-mono text-sm font-bold text-white">/api/v1/schools/{'{id}'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">
                  [schools.update]
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Updates school details (capacity, principal contact, opening hours, status).
              </p>
            </div>

            {/* DELETE /schools/{id} */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-extrabold bg-red-500/20 text-red-400 border border-red-500/30">
                  DELETE
                </span>
                <span className="font-mono text-sm font-bold text-white">/api/v1/schools/{'{id}'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">
                  [SYSTEM_ADMIN, NATIONAL_ADMIN]
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Soft-deletes and archives a school record setting status to ARCHIVED and deletedAt timestamp.
              </p>
            </div>

            {/* GET /schools/search */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  GET
                </span>
                <span className="font-mono text-sm font-bold text-white">/api/v1/schools/search</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">
                  [schools.view]
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full-text case-insensitive search across school name, EMIS number, district, and principal name.
              </p>
            </div>

            {/* GET /schools/dashboard/{id} */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-extrabold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  GET
                </span>
                <span className="font-mono text-sm font-bold text-white">/api/v1/schools/dashboard/{'{id}'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">
                  [schools.view]
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Calculates real-time aggregated metrics: Total Learners, Devices (Assigned, Online, Offline), Active Incidents, Attendance %, Vehicles, Drivers, and Geofences.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: SECURITY MATRIX */}
      {activeView === 'security' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              School Management Role-Based Scoping & Permission Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enforces strict isolation rules so only authorized admins can alter school data, while Parents maintain read-only access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-300 font-mono">SYSTEM_ADMIN</span>
              <p className="text-xs font-extrabold text-white">Full Global Scope</p>
              <p className="text-[11px] text-slate-400">Can Create, Read, Update, Deactivate, Archive, and Restore schools across all 9 provinces.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-300 font-mono">NATIONAL_ADMIN</span>
              <p className="text-xs font-extrabold text-white">National Scope</p>
              <p className="text-[11px] text-slate-400">Can Create, Read, Update, and Archive schools nationally. Cannot hard-restore archived entities.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-300 font-mono">PROVINCIAL_ADMIN</span>
              <p className="text-xs font-extrabold text-white">Provincial Cluster Scope</p>
              <p className="text-[11px] text-slate-400">Can Create, Read, and Update schools within their designated province (e.g. Gauteng).</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-300 font-mono">SCHOOL_ADMIN</span>
              <p className="text-xs font-extrabold text-white">Single School Scope</p>
              <p className="text-[11px] text-slate-400">Can Update operational contact details and view metrics for their specific assigned school ID.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-300 font-mono">PARENT</span>
              <p className="text-xs font-extrabold text-white">Read-Only Scope</p>
              <p className="text-[11px] text-slate-400">Strictly read-only access to their child's enrolled school details and contact information.</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: PROMPT 018 CHECKLIST */}
      {activeView === 'checklist' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ListCheck className="w-5 h-5 text-emerald-400" />
              Prompt 018 Requirements Verification (10/10)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Verification checklist confirming full production compliance with zero unrequested modules built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">1. School Entity</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Supports EMIS Number, School Name, Province, District, Municipality, Address, GPS Coordinates, Contacts, Principal, Status, Capacity, School Type, Language, Operating Hours.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">2. School CRUD Workflows</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Includes Create, Update, Deactivate, Archive, Restore, Search, and Multi-field Filter endpoints.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">3. School Dashboard Aggregator</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Computes Total Learners, Devices (Assigned/Online/Offline), Active Incidents, Today's Attendance %, Vehicles, Drivers, and Geofences.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">4. Geospatial Data</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Stores GPS coordinates, supports future polygon geofences, and validates South African bounding boxes.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">5. School Validations</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Enforces unique EMIS registration numbers, duplicate coordinate detection, SA province enums, and address rules.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">6. School REST API</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">POST /schools, GET /schools, GET /schools/:id, PATCH /schools/:id, DELETE /schools/:id, GET /schools/search, GET /schools/dashboard/:id.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">7. Security & Scoping</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Strict RBAC modification permissions for SYSTEM_ADMIN, NATIONAL_ADMIN, PROVINCIAL_ADMIN, and SCHOOL_ADMIN. Parents read-only.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">8. Swagger OpenApi Documentation</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Annotated DTOs and endpoints with request/response examples and bearer auth.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">9. Unit & Integration Test Suite</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Jest unit tests and Supertest E2E tests covering duplicate EMIS rejection, boundary coordinates, and security protection.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">10. Architecture & Data Flow Docs</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Full architectural specification documenting PostGIS integration, service interactions, and multi-tenant scoping.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE SCHOOL MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <School className="w-5 h-5 text-cyan-400" />
                Create New School Entry (Prompt 018)
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                Close ✕
              </button>
            </div>

            <form onSubmit={handleCreateSchool} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">EMIS Number (Unique)</label>
                  <input
                    type="text"
                    required
                    value={newSchool.emisNumber}
                    onChange={(e) => setNewSchool({ ...newSchool, emisNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">School Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pretoria High Academy"
                    value={newSchool.name}
                    onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Province</label>
                  <select
                    value={newSchool.province}
                    onChange={(e) => setNewSchool({ ...newSchool, province: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    {provinces.filter((p) => p !== 'All').map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={newSchool.district}
                    onChange={(e) => setNewSchool({ ...newSchool, district: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">GPS Latitude (SA: -35 to -22)</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={newSchool.latitude}
                    onChange={(e) => setNewSchool({ ...newSchool, latitude: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">GPS Longitude (SA: 16 to 33)</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={newSchool.longitude}
                    onChange={(e) => setNewSchool({ ...newSchool, longitude: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-300 mb-1">Physical Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 100 Church Street, Pretoria Central"
                    value={newSchool.address}
                    onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Principal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. M. Khumalo"
                    value={newSchool.principalName}
                    onChange={(e) => setNewSchool({ ...newSchool, principalName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Principal Phone</label>
                  <input
                    type="text"
                    required
                    value={newSchool.principalPhone}
                    onChange={(e) => setNewSchool({ ...newSchool, principalPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 shadow-md shadow-cyan-600/30"
                >
                  Save School Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
