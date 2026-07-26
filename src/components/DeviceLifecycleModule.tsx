import React, { useState } from 'react';
import {
  Cpu,
  QrCode,
  Radio,
  Wifi,
  ShieldCheck,
  Zap,
  Wrench,
  AlertTriangle,
  RefreshCw,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  FileText,
  Lock,
  Battery,
  MapPin,
  Flame,
  Terminal,
  Activity,
  Award,
  Layers,
  Sparkles,
  Database,
  ArrowRight,
  Download,
  Copy,
  ChevronRight,
  Smartphone,
  Truck,
  Building2,
  User,
  Clock,
  RotateCcw
} from 'lucide-react';

import {
  DeviceRecord,
  ManufacturingBatch,
  FirmwarePackage,
  RealWorldCertificationRequirement,
  initialDeviceInventory,
  initialManufacturingBatches,
  initialFirmwarePackages,
  initialRealWorldCertifications
} from '../data/deviceLifecycleData';

interface DeviceLifecycleModuleProps {
  onNavigateToTab?: (tabId: string) => void;
}

export function DeviceLifecycleModule({ onNavigateToTab }: DeviceLifecycleModuleProps) {
  const [activeTab, setActiveTab] = useState<'inventory' | 'provisioning' | 'firmware' | 'health' | 'maintenance' | 'technician' | 'apis' | 'certification'>('inventory');
  
  // Local state for interactive operations
  const [devices, setDevices] = useState<DeviceRecord[]>(initialDeviceInventory);
  const [batches] = useState<ManufacturingBatch[]>(initialManufacturingBatches);
  const [firmwarePackages, setFirmwarePackages] = useState<FirmwarePackage[]>(initialFirmwarePackages);
  const [certifications] = useState<RealWorldCertificationRequirement[]>(initialRealWorldCertifications);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modal States
  const [selectedDevice, setSelectedDevice] = useState<DeviceRecord | null>(null);
  const [isProvisioningModalOpen, setIsProvisioningModalOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Provisioning Form State
  const [provForm, setProvForm] = useState({
    serialNumber: `ITIS-2026-WB${Math.floor(1000 + Math.random() * 9000)}`,
    deviceType: 'wearable_band' as const,
    modelName: 'ITIS Learner Safety Band V3',
    bleMac: `AA:BB:CC:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}`,
    batchNumber: 'BATCH-2026-Q2-JHB',
    assignedSchoolName: 'Soweto STEM Academy',
    assignedLearnerName: 'Kagiso Khumalo',
    technicianName: 'Sipho Zulu (Cert. #402)',
    injectCert: true
  });

  // Technician Test Sequence State
  const [techTestDevice, setTechTestDevice] = useState<DeviceRecord | null>(devices[0]);
  const [testResults, setTestResults] = useState<{ [key: string]: 'PENDING' | 'RUNNING' | 'PASS' | 'FAIL' }>({
    gpsFix: 'PASS',
    bleBeacon: 'PASS',
    lteConnectivity: 'PASS',
    sosButtonTrigger: 'PASS',
    accelerometer: 'PASS',
    eccCertCheck: 'PASS'
  });
  const [isTestingInProgress, setIsTestingInProgress] = useState(false);

  // API Playground State
  const [selectedApiEndpoint, setSelectedApiEndpoint] = useState<string>('/api/v1/devices');
  const [apiMethod, setApiMethod] = useState<'GET' | 'POST' | 'PUT'>('GET');
  const [apiResponseBody, setApiResponseBody] = useState<string>(
    JSON.stringify({ status: 200, count: devices.length, data: devices.slice(0, 2) }, null, 2)
  );

  // Trigger feedback banner
  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // Filtered devices
  const filteredDevices = devices.filter((dev) => {
    const matchesSearch =
      dev.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dev.imei && dev.imei.includes(searchQuery)) ||
      dev.bleMac.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dev.assignedLearnerName && dev.assignedLearnerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (dev.assignedSchoolName && dev.assignedSchoolName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === 'ALL' || dev.deviceType === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || dev.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Provisioning Submit
  const handleProvisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDev: DeviceRecord = {
      id: `DEV-${Math.floor(1000 + Math.random() * 9000)}`,
      serialNumber: provForm.serialNumber,
      qrCodePayload: `ITIS_PROV_PAYLOAD::${provForm.serialNumber}::${provForm.batchNumber}::X509_ECC_INJECTED`,
      deviceType: provForm.deviceType,
      modelName: provForm.modelName,
      bleMac: provForm.bleMac,
      batchNumber: provForm.batchNumber,
      supplier: 'Defy Defence Systems & Microelectronics',
      hardwareRev: 'REV-3.3a',
      firmwareVersion: 'v3.2.1-STABLE',
      warrantyExpiry: '2028-08-01',
      status: 'active',
      assignedSchoolName: provForm.assignedSchoolName,
      assignedLearnerName: provForm.assignedLearnerName,
      technicianName: provForm.technicianName,
      health: {
        batteryPct: 100,
        gpsStatus: '3D_FIX',
        gpsSatellites: 14,
        bleRssiDbm: -48,
        lteSignalDbm: -64,
        motionSensorStatus: 'NORMAL',
        sosButtonState: 'IDLE',
        tamperDetected: false,
        lastPingTimestamp: new Date().toISOString()
      },
      maintenanceHistory: [
        {
          id: `MNT-${Math.floor(100 + Math.random() * 900)}`,
          date: new Date().toISOString().split('T')[0],
          action: 'Provisioned & Enrolled via Field Portal',
          technician: provForm.technicianName,
          notes: `Learner linked: ${provForm.assignedLearnerName}. X.509 ECC Client Certificate Injected into Secure Element.`
        }
      ]
    };

    setDevices([newDev, ...devices]);
    setIsProvisioningModalOpen(false);
    triggerFeedback(`Device ${newDev.serialNumber} successfully provisioned and linked to ${provForm.assignedLearnerName}!`);
  };

  // Run Technician Automated Diagnostics
  const runDiagnosticTests = () => {
    setIsTestingInProgress(true);
    setTestResults({
      gpsFix: 'RUNNING',
      bleBeacon: 'RUNNING',
      lteConnectivity: 'RUNNING',
      sosButtonTrigger: 'RUNNING',
      accelerometer: 'RUNNING',
      eccCertCheck: 'RUNNING'
    });

    setTimeout(() => {
      setTestResults({
        gpsFix: 'PASS',
        bleBeacon: 'PASS',
        lteConnectivity: 'PASS',
        sosButtonTrigger: 'PASS',
        accelerometer: 'PASS',
        eccCertCheck: 'PASS'
      });
      setIsTestingInProgress(false);
      triggerFeedback(`Automated Hardware Diagnostic Complete for ${techTestDevice?.serialNumber}. All 6 Tests PASSED.`);
    }, 1800);
  };

  // Handle OTA Canary Update Trigger
  const handleTriggerOtaCanary = (fwId: string, newCanaryPct: number) => {
    setFirmwarePackages((prev) =>
      prev.map((fw) =>
        fw.id === fwId
          ? {
              ...fw,
              isCanaryActive: newCanaryPct > 0,
              canaryPct: newCanaryPct,
              deploymentStatus: newCanaryPct === 100 ? 'GENERAL_AVAILABILITY' : newCanaryPct > 0 ? 'CANARY' : 'DRAFT'
            }
          : fw
      )
    );
    triggerFeedback(`OTA Firmware ${fwId} canary deployment percentage updated to ${newCanaryPct}%.`);
  };

  // Trigger Remote Wipe/Brick for lost/stolen device
  const handleRemoteBrick = (devId: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === devId
          ? {
              ...d,
              status: 'lost_stolen',
              health: { ...d.health, tamperDetected: true, sosButtonState: 'TEST_MODE' },
              maintenanceHistory: [
                ...d.maintenanceHistory,
                {
                  id: `MNT-${Math.floor(100 + Math.random() * 900)}`,
                  date: new Date().toISOString().split('T')[0],
                  action: 'Remote Wipe & Security Brick Triggered',
                  technician: 'SITA Enclave Security Center',
                  notes: 'Command sent over MQTT-SN to clear hardware keys and activate high-frequency GPS beacon for recovery.'
                }
              ]
            }
          : d
      )
    );
    triggerFeedback(`Remote Security Brick Command dispatched to device ${devId}. Cryptographic keys revoked.`);
  };

  // API Tester Action
  const handleExecuteApiCall = (endpoint: string, method: 'GET' | 'POST' | 'PUT') => {
    setSelectedApiEndpoint(endpoint);
    setApiMethod(method);

    if (endpoint === '/api/v1/devices') {
      setApiResponseBody(JSON.stringify({
        status: 200,
        timestamp: new Date().toISOString(),
        totalDevices: devices.length,
        devices: devices.map(d => ({
          serialNumber: d.serialNumber,
          type: d.deviceType,
          status: d.status,
          battery: d.health.batteryPct,
          assignedTo: d.assignedLearnerName || 'Unassigned'
        }))
      }, null, 2));
    } else if (endpoint === '/api/v1/provisioning') {
      setApiResponseBody(JSON.stringify({
        status: 201,
        message: 'Device Provisioning Endpoint Ready',
        supportedFlows: ['QR_CODE_SCAN', 'NFC_ENROLLMENT', 'X509_CERT_INJECTION'],
        activeTechnicians: 48,
        certIssuer: 'SITA-ITIS-ROOT-CA-2026'
      }, null, 2));
    } else if (endpoint === '/api/v1/firmware') {
      setApiResponseBody(JSON.stringify({
        status: 200,
        firmwarePackages: firmwarePackages
      }, null, 2));
    } else if (endpoint === '/api/v1/device-health') {
      setApiResponseBody(JSON.stringify({
        status: 200,
        telemetrySummary: {
          onlineCount: devices.filter(d => d.status === 'active').length,
          avgBatteryPct: 89.4,
          activeSosAlerts: 0,
          tamperAlerts: devices.filter(d => d.health.tamperDetected).length
        }
      }, null, 2));
    } else if (endpoint === '/api/v1/device-maintenance') {
      setApiResponseBody(JSON.stringify({
        status: 200,
        rmaPipeline: {
          underRepair: devices.filter(d => d.status === 'under_repair').length,
          faultyCount: devices.filter(d => d.status === 'faulty').length,
          lostOrStolen: devices.filter(d => d.status === 'lost_stolen').length
        }
      }, null, 2));
    }
  };

  // Calculations for KPI Cards
  const totalUnits = devices.length;
  const activeUnits = devices.filter((d) => d.status === 'active').length;
  const inStockUnits = devices.filter((d) => d.status === 'in_stock').length;
  const underRepairUnits = devices.filter((d) => d.status === 'under_repair' || d.status === 'faulty').length;
  const lostStolenUnits = devices.filter((d) => d.status === 'lost_stolen').length;
  const avgBattery = Math.round(devices.reduce((acc, d) => acc + d.health.batteryPct, 0) / (devices.length || 1));

  return (
    <div className="space-y-8 font-sans text-slate-100 pb-16">
      
      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950/95 border-2 border-emerald-500/80 text-emerald-200 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 font-mono text-xs animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-2xs font-mono font-bold">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>PHASE E05 • ENTERPRISE DEVICE LIFECYCLE & MANUFACTURING</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Hardware Provisioning & Manufacturing Enclave</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Full lifecycle tracking for wearable bands, institutional gateways, fleet trackers, NFC provisioners, and command centre terminals. Governed by ICASA, SITA X.509 HSM key injection, and automated field diagnostics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsProvisioningModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/20 font-mono"
            >
              <Plus className="w-4 h-4" />
              <span>Provision New Device</span>
            </button>

            {onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('gis')}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs transition flex items-center gap-2 font-mono font-bold"
              >
                <Radio className="w-4 h-4 text-cyan-400" />
                <span>GIS Live Telemetry</span>
              </button>
            )}
          </div>
        </div>

        {/* Executive Hardware Metrics Grid (Part 8) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
            <span className="text-2xs font-mono font-bold text-slate-400 uppercase">Total Inventory</span>
            <div className="text-2xl font-black text-white font-mono">{totalUnits}</div>
            <p className="text-3xs text-slate-400 font-mono">5 Device Model Types</p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-emerald-500/30 space-y-1">
            <span className="text-2xs font-mono font-bold text-emerald-400 uppercase">Active & Assigned</span>
            <div className="text-2xl font-black text-emerald-300 font-mono">{activeUnits}</div>
            <p className="text-3xs text-emerald-400/80 font-mono">Learners & School Fleets</p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-blue-500/30 space-y-1">
            <span className="text-2xs font-mono font-bold text-blue-400 uppercase">In Stock (Warehouse)</span>
            <div className="text-2xl font-black text-blue-300 font-mono">{inStockUnits}</div>
            <p className="text-3xs text-blue-400/80 font-mono">Ready for Enrollment</p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-amber-500/30 space-y-1">
            <span className="text-2xs font-mono font-bold text-amber-400 uppercase">Under Repair / RMA</span>
            <div className="text-2xl font-black text-amber-300 font-mono">{underRepairUnits}</div>
            <p className="text-3xs text-amber-400/80 font-mono">Technician Servicing</p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-rose-500/30 space-y-1">
            <span className="text-2xs font-mono font-bold text-rose-400 uppercase">Lost / Stolen</span>
            <div className="text-2xl font-black text-rose-300 font-mono">{lostStolenUnits}</div>
            <p className="text-3xs text-rose-400/80 font-mono">Key Revoked / Bricked</p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-purple-500/30 space-y-1">
            <span className="text-2xs font-mono font-bold text-purple-400 uppercase">Avg Fleet Battery</span>
            <div className="text-2xl font-black text-purple-300 font-mono">{avgBattery}%</div>
            <p className="text-3xs text-purple-400/80 font-mono">14-Day Li-Po Cycles</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Phase E05 Modules */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin border-b border-slate-800">
        {[
          { id: 'inventory', label: '1. Device Inventory & Records', icon: Cpu },
          { id: 'provisioning', label: '2. Secure Provisioning & Enrollment', icon: QrCode },
          { id: 'firmware', label: '3. Firmware OTA & Canary Engine', icon: RefreshCw },
          { id: 'health', label: '4. Telemetry & Sensor Diagnostics', icon: Activity },
          { id: 'maintenance', label: '5. RMA, Battery & Security Bricking', icon: Wrench },
          { id: 'technician', label: '6. Field Technician Portal', icon: Terminal },
          { id: 'apis', label: '7. REST APIs & Integration', icon: Database },
          { id: 'certification', label: '8. Real-World Hardware Cert Checklist', icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DEVICE INVENTORY & MANUFACTURING RECORDS */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search Serial, IMEI, MAC, Learner, School..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto font-mono text-xs">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All Device Types</option>
                <option value="wearable_band">Wearable Bands</option>
                <option value="ble_gateway">BLE Gateways</option>
                <option value="fleet_tracker">Fleet Trackers</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="active">Active</option>
                <option value="in_stock">In Stock</option>
                <option value="under_repair">Under Repair</option>
                <option value="lost_stolen">Lost / Stolen</option>
              </select>
            </div>
          </div>

          {/* Manufacturing Batches Summary Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Manufacturing Batches & Supplier Records</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {batches.map((batch) => (
                <div key={batch.batchNumber} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-2xs font-mono text-amber-400 font-bold">{batch.batchNumber}</span>
                      <h4 className="text-xs font-bold text-white mt-0.5">{batch.supplier}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-3xs font-mono font-bold rounded-full">
                      QA YIELD: {((batch.passedQaUnits / batch.totalUnits) * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-2xs font-mono text-slate-400 border-t border-slate-800/80 pt-2">
                    <div>
                      <span className="block text-slate-500">Manufactured:</span>
                      <span className="text-slate-200">{batch.manufactureDate}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Hardware Rev:</span>
                      <span className="text-slate-200">{batch.hardwareRev}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Total Units:</span>
                      <span className="text-white font-bold">{batch.totalUnits.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">ICASA Code:</span>
                      <span className="text-cyan-400">{batch.icasaApprovalCode}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Inventory Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Device Serial Inventory ({filteredDevices.length} Records)</span>
              </h3>
              <span className="text-2xs font-mono text-slate-400">Click any row for full diagnostic inspect</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 uppercase text-3xs border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Serial / QR Payload</th>
                    <th className="py-3 px-4">Model & Type</th>
                    <th className="py-3 px-4">IMEI / BLE MAC</th>
                    <th className="py-3 px-4">Batch & Rev</th>
                    <th className="py-3 px-4">Assignment Target</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredDevices.map((dev) => (
                    <tr
                      key={dev.id}
                      onClick={() => setSelectedDevice(dev)}
                      className="hover:bg-slate-800/50 transition cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{dev.serialNumber}</div>
                        <div className="text-3xs text-slate-500 truncate max-w-xs">{dev.qrCodePayload}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-200 font-sans font-semibold">{dev.modelName}</div>
                        <div className="text-3xs text-amber-400 uppercase">{dev.deviceType.replace('_', ' ')}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-300">{dev.bleMac}</div>
                        {dev.imei && <div className="text-3xs text-slate-500">IMEI: {dev.imei}</div>}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-300">{dev.batchNumber}</div>
                        <div className="text-3xs text-slate-500">{dev.hardwareRev} • {dev.firmwareVersion}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        {dev.assignedLearnerName ? (
                          <div>
                            <span className="font-bold text-emerald-300 font-sans block">{dev.assignedLearnerName}</span>
                            <span className="text-3xs text-slate-400 block">{dev.assignedSchoolName}</span>
                          </div>
                        ) : dev.assignedSchoolName ? (
                          <span className="text-cyan-300 font-sans">{dev.assignedSchoolName}</span>
                        ) : (
                          <span className="text-slate-500 italic">Unassigned (Warehouse)</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-3xs font-bold uppercase ${
                            dev.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : dev.status === 'in_stock'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : dev.status === 'under_repair'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              dev.status === 'active'
                                ? 'bg-emerald-400 animate-pulse'
                                : dev.status === 'in_stock'
                                ? 'bg-blue-400'
                                : 'bg-amber-400'
                            }`}
                          />
                          {dev.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDevice(dev);
                          }}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-3xs transition"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECURE PROVISIONING & ENROLLMENT PORTAL */}
      {activeTab === 'provisioning' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive QR & NFC Provisioning Wizard */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-2xs font-mono font-bold text-amber-400 uppercase">Part 3 • Secure Enrollment Workflow</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-400" />
                <span>Hardware Provisioning & Learner Link Wizard</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Execute QR activation scanner, tap-to-enroll NFC token injection, X.509 client certificate injection into NXP SE050, and learner pairing.
              </p>
            </div>

            <form onSubmit={handleProvisionSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Generated Serial Number</label>
                  <input
                    type="text"
                    value={provForm.serialNumber}
                    onChange={(e) => setProvForm({ ...provForm, serialNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Device Model Type</label>
                  <select
                    value={provForm.deviceType}
                    onChange={(e) => setProvForm({ ...provForm, deviceType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="wearable_band">ITIS Learner Safety Band V3</option>
                    <option value="ble_gateway">ITIS Institutional BLE Gateway 100</option>
                    <option value="fleet_tracker">ITIS Transport OBD Fleet Tracker 500</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">BLE MAC Address</label>
                  <input
                    type="text"
                    value={provForm.bleMac}
                    onChange={(e) => setProvForm({ ...provForm, bleMac: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Manufacturing Batch</label>
                  <select
                    value={provForm.batchNumber}
                    onChange={(e) => setProvForm({ ...provForm, batchNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="BATCH-2026-Q1-CPT">BATCH-2026-Q1-CPT (Tshwane IoT)</option>
                    <option value="BATCH-2026-Q2-JHB">BATCH-2026-Q2-JHB (Defy Systems)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-slate-400 mb-1">Assign to School</label>
                  <input
                    type="text"
                    value={provForm.assignedSchoolName}
                    onChange={(e) => setProvForm({ ...provForm, assignedSchoolName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Assign to Learner Name</label>
                  <input
                    type="text"
                    value={provForm.assignedLearnerName}
                    onChange={(e) => setProvForm({ ...provForm, assignedLearnerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 font-sans"
                  />
                </div>
              </div>

              {/* Certificate Injection Option */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">SITA X.509 Client Certificate Injection</span>
                    <span className="text-3xs text-slate-400 block">Inject ECC-P256 mTLS keypair into hardware Secure Element</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={provForm.injectCert}
                  onChange={(e) => setProvForm({ ...provForm, injectCert: e.target.checked })}
                  className="w-4 h-4 accent-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Execute Provisioning & Enroll Device</span>
              </button>
            </form>
          </div>

          {/* Right Column: Live QR Activation & NFC Simulation Box */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
                <Smartphone className="w-4 h-4" />
                <span>Technician Field Reader Visualizer</span>
              </div>

              <div className="p-6 bg-slate-950 border-2 border-dashed border-amber-500/40 rounded-2xl text-center space-y-4 relative">
                <div className="mx-auto w-24 h-24 bg-slate-900 border border-amber-500/50 rounded-2xl flex items-center justify-center text-amber-400 shadow-inner">
                  <QrCode className="w-14 h-14" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">QR Code Payload Ready</h4>
                  <p className="text-3xs font-mono text-slate-400 break-all mt-1">
                    ITIS_PROV_PAYLOAD::{provForm.serialNumber}::{provForm.batchNumber}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-3xs font-mono font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>NFC Target Enrolled & Ready</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="text-2xs text-slate-400 font-bold uppercase">Provisioning Step Audit Checklist</div>
                <ul className="space-y-2 text-2xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Batch Serial Number Validated</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ICASA Frequency Band Verified (868MHz / LTE-M)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> SITA Private APN eSIM Profile Provisioned</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Guardian Notification Webhook Armed</li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-3xs font-mono text-slate-400">
              Technician ID: <span className="text-amber-300">{provForm.technicianName}</span>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: FIRMWARE MANAGEMENT & OTA CANARY ENGINE */}
      {activeTab === 'firmware' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-2xs font-mono font-bold text-amber-400 uppercase">Part 4 • OTA Firmware Engine</span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-amber-400" />
                  <span>Firmware Releases, Canary Rollouts & Dual-Bank Rollbacks</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Manage cryptographically signed firmware binaries with percentage-based canary distribution and dual-bank fallback.
                </p>
              </div>

              <button
                onClick={() => triggerFeedback('Firmware RSA-4096 signature verified on SITA Key Vault.')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Verify Digital Signatures</span>
              </button>
            </div>

            {/* Firmware Packages List */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              {firmwarePackages.map((fw) => (
                <div key={fw.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-white font-mono">{fw.version}</span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-3xs font-mono font-bold uppercase ${
                              fw.deploymentStatus === 'GENERAL_AVAILABILITY'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : fw.deploymentStatus === 'CANARY'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {fw.deploymentStatus.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-xs font-sans text-slate-400">Target: {fw.targetDeviceType.replace('_', ' ').toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="text-right text-2xs font-mono text-slate-400">
                      <div>Size: {(fw.fileSizeBytes / 1024).toFixed(1)} KB</div>
                      <div>Released: {fw.releaseDate}</div>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    {fw.releaseNotes}
                  </p>

                  <div className="text-3xs font-mono text-slate-500 break-all bg-slate-900/40 p-2 rounded-lg">
                    SHA-256 Signature: <span className="text-cyan-400">{fw.digitalSignatureSha256}</span>
                  </div>

                  {/* Canary Slider & Rollout Control */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-400" /> Canary Distribution Percentage:
                      </span>
                      <span className="text-amber-400 font-black text-sm">{fw.canaryPct}% Fleet</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={fw.canaryPct}
                      onChange={(e) => handleTriggerOtaCanary(fw.id, parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />

                    <div className="flex justify-between text-3xs font-mono text-slate-500">
                      <span>0% (Disabled)</span>
                      <span>15% (Stage 1 Test)</span>
                      <span>50% (Stage 2 Regional)</span>
                      <span>100% (General Availability)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REAL-TIME TELEMETRY & DEVICE HEALTH */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-2xs font-mono font-bold text-amber-400 uppercase">Part 5 • Sensor Diagnostics</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                <span>Live Device Health & Hardware Sensor Telemetry</span>
              </h3>
              <p className="text-xs text-slate-300">
                Monitor battery levels, 3D GNSS fix quality, BLE RSSI signal, 3-axis motion accelerometer, SOS button latch state, and tamper detection switches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              {devices.map((dev) => (
                <div key={dev.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-bold text-white font-mono block">{dev.serialNumber}</span>
                      <span className="text-3xs text-amber-400 font-mono uppercase">{dev.modelName}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-3xs font-mono font-bold uppercase ${
                        dev.health.batteryPct > 50
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : dev.health.batteryPct > 20
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      BATTERY {dev.health.batteryPct}%
                    </span>
                  </div>

                  {/* Sensor Grid */}
                  <div className="grid grid-cols-2 gap-2 text-2xs font-mono">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80">
                      <span className="text-slate-500 block text-3xs">GNSS Fix:</span>
                      <span className="text-emerald-300 font-bold">{dev.health.gpsStatus} ({dev.health.gpsSatellites} Sats)</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80">
                      <span className="text-slate-500 block text-3xs">BLE Signal:</span>
                      <span className="text-cyan-300 font-bold">{dev.health.bleRssiDbm} dBm</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80">
                      <span className="text-slate-500 block text-3xs">LTE Cellular:</span>
                      <span className="text-slate-200 font-bold">{dev.health.lteSignalDbm} dBm</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80">
                      <span className="text-slate-500 block text-3xs">Motion Sensor:</span>
                      <span className="text-amber-300 font-bold">{dev.health.motionSensorStatus}</span>
                    </div>
                  </div>

                  {/* Tamper Alert Box */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-2xs font-mono">
                    <span className="text-slate-400">Tamper Seal Status:</span>
                    {dev.health.tamperDetected ? (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> BREACH DETECTED
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> INTACT
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RMA, MAINTENANCE & THEFT BRICKING */}
      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-2xs font-mono font-bold text-amber-400 uppercase">Part 6 • Maintenance & Anti-Theft</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                <span>RMA Repairs, Warranty Claims & Remote Wipe Bricking</span>
              </h3>
              <p className="text-xs text-slate-300">
                Log RMA repair work orders, warranty replacements, battery re-pack servicing, and dispatch cryptographically signed remote wipe / brick commands to stolen devices.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              {devices.map((dev) => (
                <div key={dev.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-mono">{dev.serialNumber}</span>
                        <span className="text-3xs px-2 py-0.5 bg-slate-800 text-slate-300 font-mono rounded-full uppercase">
                          {dev.status.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-2xs text-slate-400 font-sans">Supplier: {dev.supplier} • Warranty Expiry: {dev.warrantyExpiry}</span>
                    </div>

                    {dev.status !== 'lost_stolen' ? (
                      <button
                        onClick={() => handleRemoteBrick(dev.id)}
                        className="px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Trigger Remote Brick & Key Wipe</span>
                      </button>
                    ) : (
                      <span className="px-3.5 py-1.5 bg-rose-950 text-rose-300 border border-rose-500/50 rounded-xl text-xs font-mono font-bold">
                        DEVICE BRICKED & KEYS REVOKED
                      </span>
                    )}
                  </div>

                  {/* Maintenance Log List */}
                  <div className="space-y-2">
                    <span className="text-3xs font-mono font-bold text-slate-500 uppercase">Maintenance & Work Order Audit Trail</span>
                    {dev.maintenanceHistory.map((m) => (
                      <div key={m.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 text-2xs font-mono space-y-1">
                        <div className="flex justify-between text-slate-400">
                          <span className="text-amber-300 font-bold">{m.action}</span>
                          <span>{m.date} • {m.technician}</span>
                        </div>
                        <p className="text-slate-300 font-sans">{m.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: FIELD TECHNICIAN PORTAL */}
      {activeTab === 'technician' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Diagnostics Testing Suite */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-2xs font-mono font-bold text-amber-400 uppercase">Part 7 • Field Technician Tools</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-amber-400" />
                <span>Automated Hardware Diagnostic Suite</span>
              </h3>
              <p className="text-xs text-slate-300">
                Run field test routines on target hardware prior to learner assignment or following maintenance replacement.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Select Field Device to Test:</label>
                <select
                  value={techTestDevice?.id}
                  onChange={(e) => setTechTestDevice(devices.find(d => d.id === e.target.value) || devices[0])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                >
                  {devices.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.serialNumber} — {d.modelName} ({d.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Diagnostic Test Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {Object.entries(testResults).map(([testKey, status]) => (
                  <div key={testKey} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-200 uppercase font-bold block">{testKey.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-3xs text-slate-500">Automated Sensor Ping</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-md text-3xs font-bold uppercase ${
                        status === 'PASS'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : status === 'RUNNING'
                          ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={runDiagnosticTests}
                disabled={isTestingInProgress}
                className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <RotateCcw className={`w-4 h-4 ${isTestingInProgress ? 'animate-spin' : ''}`} />
                <span>{isTestingInProgress ? 'Running Hardware Diagnostic Suite...' : 'Execute Automated Field Test Sequence'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Field Report Generator */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                <FileText className="w-4 h-4" />
                <span>Field Service Clearance Certificate</span>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 font-mono text-2xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Target Device:</span>
                  <span className="text-white font-bold">{techTestDevice?.serialNumber}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Technician ID:</span>
                  <span className="text-amber-300">Sipho Zulu (#402)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Location GPS Seal:</span>
                  <span className="text-cyan-300">-26.2041° S, 28.0473° E</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Diagnostic Status:</span>
                  <span className="text-emerald-400 font-bold">100% CLEARANCE</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => triggerFeedback('Field Diagnostics Clearance Certificate generated and saved to audit ledger.')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Generate Signed Field Service Report</span>
            </button>
          </div>

        </div>
      )}

      {/* TAB 7: REST APIS & DEVELOPER PLAYGROUND */}
      {activeTab === 'apis' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-2xs font-mono font-bold text-amber-400 uppercase">Part 9 • RESTful APIs & Endpoints</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                <span>Device Lifecycle RESTful API Endpoints</span>
              </h3>
              <p className="text-xs text-slate-300">
                Test and inspect production REST APIs for device queries, provisioning, firmware triggers, telemetry, and maintenance work orders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs pt-2">
              {[
                { endpoint: '/api/v1/devices', label: '1. /api/v1/devices', method: 'GET' },
                { endpoint: '/api/v1/provisioning', label: '2. /api/v1/provisioning', method: 'POST' },
                { endpoint: '/api/v1/firmware', label: '3. /api/v1/firmware', method: 'GET' },
                { endpoint: '/api/v1/device-health', label: '4. /api/v1/device-health', method: 'GET' },
                { endpoint: '/api/v1/device-maintenance', label: '5. /api/v1/device-maintenance', method: 'POST' }
              ].map((item) => (
                <button
                  key={item.endpoint}
                  onClick={() => handleExecuteApiCall(item.endpoint, item.method as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    selectedApiEndpoint === item.endpoint
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="text-3xs text-emerald-400 font-bold">{item.method}</div>
                  <div className="truncate text-xs">{item.label}</div>
                </button>
              ))}
            </div>

            {/* API Console Output Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 font-mono">
              <div className="flex items-center justify-between text-2xs text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Endpoint: <strong className="text-amber-300">{apiMethod} {selectedApiEndpoint}</strong>
                </span>
                <span className="text-emerald-400">HTTP 200 OK</span>
              </div>

              <pre className="text-2xs text-cyan-300 bg-slate-900/80 p-4 rounded-xl overflow-x-auto max-h-80 scrollbar-thin">
                {apiResponseBody}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: REAL-WORLD HARDWARE CERTIFICATION VS SOFTWARE STATUS */}
      {activeTab === 'certification' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-2xs font-mono font-bold text-amber-400 uppercase">Part 10 • Physical Hardware Certification</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Software Completeness vs Real-World Hardware Requirements</span>
              </h3>
              <p className="text-xs text-slate-300">
                Clear distinction between 100% complete software logic vs physical manufacturing milestones (Injection moulds, PCB assembly, ICASA approvals, eSIM M2M profiles).
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              {certifications.map((req) => (
                <div key={req.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-3xs font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full font-bold uppercase">
                        {req.category}
                      </span>
                      <h4 className="text-sm font-bold text-white font-sans">{req.title}</h4>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-3xs">
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg font-bold">
                        SOFTWARE: {req.softwareStatus}
                      </span>
                      <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg font-bold">
                        HARDWARE: {req.hardwareStatus.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    {req.specification}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between text-2xs font-mono text-slate-400 pt-1">
                    <span>Details: <strong className="text-slate-200">{req.details}</strong></span>
                    <span>Entity: <strong className="text-amber-300">{req.responsibleEntity}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Device Inspection Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedDevice(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-950/80 rounded-lg border border-slate-800 transition"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-2xs font-mono text-amber-400 font-bold uppercase">Device Inspector</span>
              <h3 className="text-xl font-bold text-white font-mono">{selectedDevice.serialNumber}</h3>
              <p className="text-xs text-slate-400">{selectedDevice.modelName} • {selectedDevice.supplier}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div><span className="text-slate-500">IMEI:</span> <span className="text-white">{selectedDevice.imei || 'N/A'}</span></div>
              <div><span className="text-slate-500">BLE MAC:</span> <span className="text-white">{selectedDevice.bleMac}</span></div>
              <div><span className="text-slate-500">Batch:</span> <span className="text-amber-300">{selectedDevice.batchNumber}</span></div>
              <div><span className="text-slate-500">Hardware Rev:</span> <span className="text-cyan-300">{selectedDevice.hardwareRev}</span></div>
              <div><span className="text-slate-500">Firmware:</span> <span className="text-emerald-300">{selectedDevice.firmwareVersion}</span></div>
              <div><span className="text-slate-500">Warranty:</span> <span className="text-slate-300">{selectedDevice.warrantyExpiry}</span></div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <span className="text-2xs font-bold text-slate-400 uppercase">Assigned Entities</span>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-300">Learner: <strong className="text-white">{selectedDevice.assignedLearnerName || 'Unassigned'}</strong></div>
                <div className="text-slate-300">School: <strong className="text-white">{selectedDevice.assignedSchoolName || 'Unassigned'}</strong></div>
                <div className="text-slate-300">Technician: <strong className="text-amber-300">{selectedDevice.technicianName || 'N/A'}</strong></div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedDevice(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition font-mono"
              >
                Close Inspection
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
