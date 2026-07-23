import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Radio,
  Battery,
  Wifi,
  Key,
  Smartphone,
  Box,
  Truck,
  Server,
  Code,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  UserCheck,
  UserX,
  FileText,
  Lock,
  Zap,
  HardDrive,
  Copy,
  Check,
  ChevronRight,
  ShieldAlert,
  Sliders,
  Database,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  QrCode,
  Globe,
  BarChart2,
  Clock,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import {
  SAMPLE_DEVICES,
  SAMPLE_BATCHES,
  SAMPLE_FIRMWARES,
  DEVICE_SPEC_ITEMS,
  DeviceEntity,
  InventoryBatch,
  FirmwarePackage,
  DeviceSpecItem
} from '../data/deviceModuleData';

export function DeviceModule() {
  const [activeSubTab, setActiveSubTab] = useState<'fleet' | 'inventory' | 'sim' | 'health' | 'security' | 'firmware' | 'nestjs' | 'rules'>('fleet');
  const [devices, setDevices] = useState<DeviceEntity[]>(SAMPLE_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<DeviceEntity | null>(devices[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [provinceFilter, setProvinceFilter] = useState<string>('ALL');
  const [selectedCodeTab, setSelectedCodeTab] = useState<number>(1);
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);

  // Assign Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignLearnerName, setAssignLearnerName] = useState('');
  const [assignSchoolName, setAssignSchoolName] = useState('');

  // Toast / Action notification
  const [actionNotification, setActionNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionNotification(msg);
    setTimeout(() => setActionNotification(null), 4000);
  };

  // Filtered devices list
  const filteredDevices = devices.filter((d) => {
    const matchesSearch =
      d.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.imei.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.simDetails.msisdn.includes(searchQuery) ||
      (d.assignedLearnerName && d.assignedLearnerName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || d.deviceStatus === statusFilter;
    const matchesProvince = provinceFilter === 'ALL' || d.province === provinceFilter;

    return matchesSearch && matchesStatus && matchesProvince;
  });

  // Key metrics
  const totalCount = devices.length;
  const activeCount = devices.filter((d) => d.deviceStatus === 'ACTIVE').length;
  const unassignedCount = devices.filter((d) => d.deviceStatus === 'UNASSIGNED').length;
  const tamperedCount = devices.filter((d) => d.deviceStatus === 'TAMPERED' || d.tamperSensorAlert).length;
  const lowBatteryCount = devices.filter((d) => d.batteryPercentage < 20).length;

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevice) return;

    if (!assignLearnerName.trim()) {
      alert('Please enter a learner name');
      return;
    }

    const updated = devices.map((d) => {
      if (d.id === selectedDevice.id) {
        return {
          ...d,
          assignedLearnerName: assignLearnerName,
          currentSchoolName: assignSchoolName || 'Soweto Central Primary School',
          deviceStatus: 'ACTIVE' as const,
          lifecycleStatus: 'Assigned' as const,
          assignedLearnerId: `itis-lrn-2026-${Math.floor(100 + Math.random() * 900)}`,
        };
      }
      return d;
    });

    setDevices(updated);
    const target = updated.find((d) => d.id === selectedDevice.id) || null;
    setSelectedDevice(target);
    setIsAssignModalOpen(false);
    setAssignLearnerName('');
    setAssignSchoolName('');
    showNotification(`Device ${selectedDevice.serialNumber} successfully assigned to ${assignLearnerName}!`);
  };

  const handleUnassign = (device: DeviceEntity) => {
    if (!confirm(`Are you sure you want to unassign ${device.serialNumber} from ${device.assignedLearnerName}?`)) return;

    const updated = devices.map((d) => {
      if (d.id === device.id) {
        return {
          ...d,
          assignedLearnerName: undefined,
          assignedLearnerId: undefined,
          currentSchoolName: undefined,
          currentSchoolId: undefined,
          deviceStatus: 'UNASSIGNED' as const,
          lifecycleStatus: 'Inventory' as const,
        };
      }
      return d;
    });

    setDevices(updated);
    const target = updated.find((d) => d.id === device.id) || null;
    setSelectedDevice(target);
    showNotification(`Device ${device.serialNumber} unassigned and returned to inventory.`);
  };

  const activeCodeSpec = DEVICE_SPEC_ITEMS.find((item) => item.id === selectedCodeTab) || DEVICE_SPEC_ITEMS[0];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Action Notification Toast */}
      {actionNotification && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600/90 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-400/40 backdrop-blur-md flex items-center space-x-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-200" />
          <span className="font-medium text-sm">{actionNotification}</span>
        </div>
      )}

      {/* Module Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-800/50 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/30 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> PROMPT 021
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Hardware Asset Registry & mTLS
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              GPS Wearable Device & IoT Management Module
            </h1>
            <p className="text-slate-300 max-w-3xl text-sm leading-relaxed">
              Authoritative hardware asset registry, mTLS X.509 certificate authentication, cellular SIM inventory, hardware health telemetry, and staged OTA firmware wave deployment for every ITIS wearable device.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => showNotification('Synchronizing IoT Fleet Telemetry via mTLS proxy...')}
              className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-semibold border border-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-95"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>Sync Fleet</span>
            </button>
            <button
              onClick={() => setActiveSubTab('nestjs')}
              className="flex items-center space-x-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-600/30 transition-all active:scale-95"
            >
              <Code className="w-4 h-4" />
              <span>NestJS Spec</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Total Registered</div>
            <div className="text-xl font-bold text-white mt-1 flex items-baseline space-x-1">
              <span>{totalCount}</span>
              <span className="text-xs text-cyan-400 font-normal">assets</span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> Assigned Active
            </div>
            <div className="text-xl font-bold text-emerald-300 mt-1">{activeCount}</div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-amber-400 font-medium flex items-center gap-1">
              <Box className="w-3.5 h-3.5" /> Inventory Unassigned
            </div>
            <div className="text-xl font-bold text-amber-300 mt-1">{unassignedCount}</div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-rose-400 font-medium flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Tampered / Alert
            </div>
            <div className="text-xl font-bold text-rose-400 mt-1">{tamperedCount}</div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
            <div className="text-xs text-indigo-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> mTLS Auth Status
            </div>
            <div className="text-xl font-bold text-indigo-300 mt-1">100% Verified</div>
          </div>
        </div>
      </div>

      {/* Sub-Module Navigation Tabs */}
      <div className="flex space-x-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('fleet')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'fleet'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Device Registry ({devices.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'inventory'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>Warehouse Inventory</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sim')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'sim'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>SIM & Connectivity</span>
        </button>

        <button
          onClick={() => setActiveSubTab('health')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'health'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Hardware Health</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'security'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>mTLS Security & Certs</span>
        </button>

        <button
          onClick={() => setActiveSubTab('firmware')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'firmware'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>OTA Firmware Manager</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nestjs')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'nestjs'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Code className="w-4 h-4 text-emerald-400" />
          <span>NestJS API Code</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rules')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'rules'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-amber-400" />
          <span>Rules & Architecture</span>
        </button>
      </div>

      {/* SUB-TAB 1: DEVICE FLEET REGISTRY */}
      {activeSubTab === 'fleet' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Search, Filter, & Table */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search & Filters */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search IMEI, Serial, Phone, or Learner name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="UNASSIGNED">UNASSIGNED</option>
                  <option value="TAMPERED">TAMPERED</option>
                  <option value="LOW_BATTERY">LOW BATTERY</option>
                </select>

                <select
                  value={provinceFilter}
                  onChange={(e) => setProvinceFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="ALL">All Provinces</option>
                  <option value="GAUTENG">Gauteng</option>
                  <option value="KWAZULU_NATAL">KwaZulu-Natal</option>
                  <option value="WESTERN_CAPE">Western Cape</option>
                </select>
              </div>
            </div>

            {/* Device List Table */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    Wearable Device Registry ({filteredDevices.length})
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Click device to inspect details</span>
              </div>

              <div className="divide-y divide-slate-800/80 overflow-x-auto">
                {filteredDevices.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    No wearable devices matched your query.
                  </div>
                ) : (
                  filteredDevices.map((dev) => {
                    const isSelected = selectedDevice?.id === dev.id;
                    return (
                      <div
                        key={dev.id}
                        onClick={() => setSelectedDevice(dev)}
                        className={`p-4 cursor-pointer transition-all hover:bg-slate-800/50 flex items-center justify-between gap-4 ${
                          isSelected ? 'bg-cyan-950/40 border-l-4 border-l-cyan-500' : ''
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold text-cyan-300">{dev.serialNumber}</span>
                            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                              IMEI: {dev.imei}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                dev.deviceStatus === 'ACTIVE'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : dev.deviceStatus === 'UNASSIGNED'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {dev.deviceStatus}
                            </span>
                          </div>

                          <div className="text-xs text-slate-300 flex items-center space-x-3">
                            <span>
                              Model: <span className="text-slate-200 font-medium">{dev.model}</span> ({dev.hardwareRevision})
                            </span>
                            <span className="text-slate-600">•</span>
                            <span>
                              FW: <span className="text-cyan-400 font-mono text-[11px]">{dev.firmwareVersion}</span>
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                            <UserCheck className="w-3 h-3 text-slate-500" />
                            <span>
                              Assigned Learner:{' '}
                              {dev.assignedLearnerName ? (
                                <strong className="text-emerald-300 font-medium">{dev.assignedLearnerName}</strong>
                              ) : (
                                <span className="italic text-slate-500">Unassigned (In Warehouse)</span>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Telemetry Summary Badges */}
                        <div className="flex flex-col items-end space-y-1.5 shrink-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                              <Battery className={`w-3.5 h-3.5 ${dev.batteryPercentage < 20 ? 'text-rose-400' : 'text-emerald-400'}`} />
                              {dev.batteryPercentage}%
                            </span>
                            <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                              {dev.signalRssiDbm} dBm
                            </span>
                          </div>

                          <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                            <Globe className="w-3 h-3 text-cyan-400" />
                            <span>{dev.province}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Col: Selected Device Inspector & Controls */}
          <div className="space-y-6">
            {selectedDevice ? (
              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-5 shadow-2xl sticky top-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                      Device Inspector
                    </span>
                    <h3 className="text-lg font-bold text-white font-mono">{selectedDevice.serialNumber}</h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedDevice.deviceStatus === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : selectedDevice.deviceStatus === 'UNASSIGNED'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {selectedDevice.deviceStatus}
                  </span>
                </div>

                {/* Assignment Banner */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                    <span>LEARNER BINDING (RULE 1 & 2)</span>
                    <span className="text-[10px] text-cyan-400">1:1 Strict Rule</span>
                  </div>

                  {selectedDevice.assignedLearnerName ? (
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-emerald-400" />
                        {selectedDevice.assignedLearnerName}
                      </div>
                      <div className="text-xs text-slate-400">School: {selectedDevice.currentSchoolName}</div>
                      <div className="text-[10px] font-mono text-slate-500">Learner ID: {selectedDevice.assignedLearnerId}</div>

                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => handleUnassign(selectedDevice)}
                          className="w-full py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg text-xs font-semibold border border-rose-800/50 transition-all"
                        >
                          Unassign Device
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-xs text-amber-300 italic">No learner bound to this wearable device.</div>
                      <button
                        onClick={() => setIsAssignModalOpen(true)}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all"
                      >
                        Assign to Learner
                      </button>
                    </div>
                  )}
                </div>

                {/* Hardware Specs Grid */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Hardware & SIM Specifications
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">IMEI Number:</span>
                      <span className="font-mono text-slate-200">{selectedDevice.imei}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">Manufacturer & Model:</span>
                      <span className="text-slate-200">{selectedDevice.model}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">Firmware Version:</span>
                      <span className="font-mono text-cyan-400">{selectedDevice.firmwareVersion}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">SIM MSISDN / Phone:</span>
                      <span className="font-mono text-slate-200">{selectedDevice.simDetails.msisdn}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">SIM Provider & APN:</span>
                      <span className="text-slate-200">{selectedDevice.simDetails.networkProvider}</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Warranty Expiry:</span>
                      <span className="text-emerald-400 font-medium">{selectedDevice.warrantyExpiry}</span>
                    </div>
                  </div>
                </div>

                {/* Security & mTLS Cert */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>mTLS X.509 Cryptography</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="text-[10px] text-slate-500 uppercase">Certificate Fingerprint (SHA-256):</div>
                    <div className="p-2 bg-slate-900 rounded font-mono text-[10px] text-cyan-300 break-all border border-slate-800">
                      {selectedDevice.mtlsCertFingerprint}
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-400">Secure Boot Enabled:</span>
                      <span className="text-emerald-400 font-bold">YES (Verified)</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Strap Tamper Sensor:</span>
                      <span className={selectedDevice.tamperSensorAlert ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                        {selectedDevice.tamperSensorAlert ? 'TAMPER ALERT!' : 'INTACT'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-8 text-center text-slate-500 text-xs">
                Select a device from the list to inspect hardware details.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: WAREHOUSE INVENTORY */}
      {activeSubTab === 'inventory' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_BATCHES.map((batch) => (
              <div key={batch.batchNumber} className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 font-mono">{batch.batchNumber}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold rounded border border-emerald-500/30">
                    QA PASSED
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">{batch.warehouseName}</h3>
                  <div className="text-xs text-slate-400">Supplier: {batch.supplier}</div>
                  <div className="text-xs font-mono text-slate-500">PO: {batch.purchaseOrder}</div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Total Batch Quantity:</span>
                    <span className="font-bold">{batch.totalQuantity.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-emerald-400">
                    <span>Assigned to Learners:</span>
                    <span className="font-bold">{batch.assignedCount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-amber-300">
                    <span>Warehouse Ready Stock:</span>
                    <span className="font-bold">{batch.availableCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${(batch.assignedCount / batch.totalQuantity) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 text-right">
                    {Math.round((batch.assignedCount / batch.totalQuantity) * 100)}% deployed
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Barcode & QR Scanner Simulator */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm">
                <QrCode className="w-5 h-5" />
                <span>Warehouse Barcode & QR Batch Intake System</span>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">
                Scan device QR codes or IMEI barcodes upon receiving warehouse shipments. Automatically generates mTLS X.509 certificate fingerprints and registers device secrets into the ITIS asset database.
              </p>
            </div>

            <button
              onClick={() => showNotification('Simulating QR Scanner: Scanned 50 new SafeBand-v4 units into Gauteng Central Depot.')}
              className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-600/30 transition-all flex items-center space-x-2 shrink-0"
            >
              <QrCode className="w-4 h-4" />
              <span>Simulate QR Intake Scan</span>
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SIM & CONNECTIVITY */}
      {activeSubTab === 'sim' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Vodacom SA M2M</div>
              <div className="text-xl font-bold text-red-400">4,200 Active SIMs</div>
              <div className="text-[10px] text-slate-500">APN: itis.m2m.vodacom.za</div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">MTN SA M2M</div>
              <div className="text-xl font-bold text-yellow-400">3,800 Active SIMs</div>
              <div className="text-[10px] text-slate-500">APN: itis.m2m.mtn.co.za</div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Telkom Mobile SA</div>
              <div className="text-xl font-bold text-blue-400">1,500 Active SIMs</div>
              <div className="text-[10px] text-slate-500">APN: itis.m2m.telkom.co.za</div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Cell C SA</div>
              <div className="text-xl font-bold text-emerald-400">500 Active SIMs</div>
              <div className="text-[10px] text-slate-500">APN: itis.m2m.cellc.co.za</div>
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                SIM Inventory & Network Connectivity Registry
              </span>
              <span className="text-[11px] text-cyan-400 font-mono">eSIM Profile Auto-Provisioning Active</span>
            </div>

            <div className="divide-y divide-slate-800 text-xs">
              {devices.map((d) => (
                <div key={d.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-white">{d.simDetails.msisdn}</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                        ICCID: {d.simDetails.iccid}
                      </span>
                    </div>

                    <div className="text-slate-400 text-[11px] flex items-center space-x-3">
                      <span>Provider: <strong className="text-slate-200">{d.simDetails.networkProvider}</strong></span>
                      <span>•</span>
                      <span>IMSI: <span className="font-mono">{d.simDetails.imsi}</span></span>
                      <span>•</span>
                      <span>APN: <span className="text-cyan-400 font-mono">{d.simDetails.apnProfile}</span></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-xs shrink-0">
                    <div>
                      <div className="text-[10px] text-slate-500">Data Usage</div>
                      <div className="font-mono font-bold text-slate-200">{d.simDetails.dataUsageMb} MB</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-500">SMS Sent</div>
                      <div className="font-mono font-bold text-slate-200">{d.simDetails.smsUsageCount} msgs</div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        d.simDetails.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {d.simDetails.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: HARDWARE HEALTH */}
      {activeSubTab === 'health' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
                <Battery className="w-5 h-5" />
                <span>Battery & Charging Fleet Health</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Optimal Charge (&gt;80%)</span>
                    <span className="font-bold text-emerald-400">88% of fleet</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Moderate Charge (20% - 80%)</span>
                    <span className="font-bold text-amber-400">10% of fleet</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Low Battery Alert (&lt;20%)</span>
                    <span className="font-bold text-rose-400">2% of fleet</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '2%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm">
                <Globe className="w-5 h-5" />
                <span>GNSS Satellite & GPS Fix Quality</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">DGPS High Accuracy Fix:</span>
                  <span className="font-bold text-cyan-300">72%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Standard 3D Fix (&gt;8 satellites):</span>
                  <span className="font-bold text-emerald-300">25%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">No GNSS Fix / Indoors:</span>
                  <span className="font-bold text-amber-300">3%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-rose-400 font-semibold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>Strap Tamper & Hardware Integrity</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Hardware Tamper Sensors Intact:</span>
                  <span className="font-bold text-emerald-400">99.2%</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Water Submersion Flagged:</span>
                  <span className="font-bold text-slate-400">0 devices</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Active Tamper Alerts:</span>
                  <span className="font-bold text-rose-400">1 device (ITIS-GPS-W906)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: MTLS SECURITY & CERTS */}
      {activeSubTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white">Mutual TLS (mTLS) X.509 Hardware Cryptography</h3>
                  <p className="text-xs text-slate-400">
                    CRITICAL ITIS RULE 3 & 4: Every wearable must authenticate using mutual TLS before sending telemetry. No telemetry accepted from unregistered hardware.
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/30">
                X.509 PKI Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300">1. Client Cert Handshake</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  During TLS negotiation, Nginx reverse proxy extracts the client certificate fingerprint (`X-SSL-Client-Fingerprint`) embedded in wearable secure memory.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300">2. Fingerprint Lookup</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  NestJS `MtlsDeviceGuard` performs zero-trust lookup against the `Device` entity database. Rejects connection if fingerprint is unknown or revoked.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300">3. Cert Rotation</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Automated annual X.509 certificate rotation executed seamlessly over-the-air without interrupting telemetry streams.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: OTA FIRMWARE MANAGER */}
      {activeSubTab === 'firmware' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-base font-bold text-white">Over-The-Air (OTA) Firmware Deployment Manager</h3>
                  <p className="text-xs text-slate-400">
                    Staged deployment waves (Canary 10% → Staging 25% → General 100%) with SHA-256 digital signature verification and rollback protection.
                  </p>
                </div>
              </div>

              <button
                onClick={() => showNotification('Firmware OTA Package v2.5.0-beta dispatched to Canary 10% wave.')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
              >
                + Dispatch OTA Release
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              {SAMPLE_FIRMWARES.map((fw) => (
                <div key={fw.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm font-bold text-cyan-300">{fw.version}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          fw.releaseChannel === 'STABLE'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {fw.releaseChannel} CHANNEL
                      </span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
                        Wave: {fw.deploymentWave}
                      </span>
                    </div>

                    <span className="text-xs text-slate-400">Released: {fw.releaseDate}</span>
                  </div>

                  <div className="text-xs text-slate-400 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      Target Models: <strong className="text-slate-200">{fw.targetDeviceModels.join(', ')}</strong>
                    </div>
                    <div>
                      File Size: <strong className="text-slate-200">{(fw.fileSizeBytes / 1024 / 1024).toFixed(1)} MB</strong>
                    </div>
                    <div className="md:col-span-2 font-mono text-[10px] text-slate-500 truncate">
                      SHA-256 Signature: {fw.sha256Hash}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: NESTJS API CODE */}
      {activeSubTab === 'nestjs' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* File selector sidebar */}
          <div className="space-y-2 lg:col-span-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              NestJS Backend Spec Files
            </div>

            {DEVICE_SPEC_ITEMS.map((item) => {
              const isSelected = item.id === selectedCodeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCodeTab(item.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex flex-col space-y-1 ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-500/80 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="font-semibold text-cyan-300 flex items-center justify-between">
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono truncate">{item.filename}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer Panel */}
          <div className="lg:col-span-3 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">{activeCodeSpec.filename}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeCodeSpec.description}</p>
              </div>

              <button
                onClick={() => handleCopyCode(activeCodeSpec.id, activeCodeSpec.code)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-medium border border-cyan-500/30 transition-all shrink-0"
              >
                {copiedCodeId === activeCodeSpec.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Highlights Bar */}
            <div className="px-4 py-2 bg-cyan-950/30 border-b border-cyan-900/30 flex items-center space-x-2 text-[11px] overflow-x-auto">
              <span className="text-cyan-400 font-bold uppercase shrink-0">Highlights:</span>
              {activeCodeSpec.highlights.map((h, i) => (
                <span key={i} className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded whitespace-nowrap">
                  ✓ {h}
                </span>
              ))}
            </div>

            <div className="p-4 overflow-x-auto bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed max-h-[550px] overflow-y-auto">
              <pre>{activeCodeSpec.code}</pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: RULES & ARCHITECTURE */}
      {activeSubTab === 'rules' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Prompt 021 Critical Business Rules Verification</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Rule 1: Every learner must ultimately have one active ITIS wearable device.</strong>
                  <span className="text-slate-400">Verified. The Learner Digital Safety Profile tracks ProtectionStatus ('PROTECTED' vs 'DEVICE_PENDING').</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Rule 2: A wearable cannot be assigned to multiple learners simultaneously.</strong>
                  <span className="text-slate-400">Verified. DevicesService throws ConflictException if an active binding exists.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Rule 3: Every wearable must authenticate using mutual TLS before sending telemetry.</strong>
                  <span className="text-slate-400">Verified. MtlsDeviceGuard enforces X.509 certificate handshake headers before telemetry ingress.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Rule 4: No telemetry may be accepted from an unregistered device.</strong>
                  <span className="text-slate-400">Verified. Unregistered hardware cert fingerprints return 403 Forbidden.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Rule 5: Every device must maintain a complete lifecycle history from manufacturing through retirement.</strong>
                  <span className="text-slate-400">Verified. AuditLogService persists immutable records for assignment, replacement, and firmware upgrades.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {isAssignModalOpen && selectedDevice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <span>Assign Device to Learner</span>
              </h3>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Selected Hardware</span>
                <div className="font-mono text-cyan-300 font-bold">{selectedDevice.serialNumber}</div>
                <div className="text-slate-400 text-[11px]">IMEI: {selectedDevice.imei}</div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Learner Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sipho Ndlovu"
                  value={assignLearnerName}
                  onChange={(e) => setAssignLearnerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">School Name</label>
                <input
                  type="text"
                  placeholder="e.g. Soweto Central Primary School"
                  value={assignSchoolName}
                  onChange={(e) => setAssignSchoolName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/30 transition-all"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
