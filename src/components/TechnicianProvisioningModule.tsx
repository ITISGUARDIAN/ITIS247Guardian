import React, { useState, useEffect } from 'react';
import {
  Wrench,
  QrCode,
  Bluetooth,
  Cpu,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  ShieldCheck,
  Smartphone,
  Truck,
  Box,
  FileCheck2,
  Clock,
  Wifi,
  WifiOff,
  UserCheck,
  School,
  MapPin,
  Sparkles,
  Download,
  Share2,
  HardDrive,
  BarChart3,
  Award,
  Layers,
  Key,
  Shield,
  Activity,
  Battery,
  Radio,
  FileText,
  ChevronRight,
  Globe,
  Fingerprint,
  Camera,
  Check,
  Send,
  Sliders,
  Settings
} from 'lucide-react';
import {
  SAMPLE_WORK_ORDERS,
  INITIAL_BLE_DIAGNOSTICS,
  SAMPLE_VEHICLE_INVENTORY,
  AVAILABLE_FIRMWARE_RELEASES,
  FieldWorkOrder,
  BleDiagnosticTest,
  VehicleInventoryItem,
  FirmwareRelease
} from '../data/technicianData';
import { SA_LANGUAGES } from '../data/responderMobileData';

export function TechnicianProvisioningModule() {
  // Authentication & Technician Session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [techName, setTechName] = useState<string>('Tech. T. Mokoena');
  const [techCertNumber, setTechCertNumber] = useState<string>('CERT-TECH-8820');
  const [provinceCode, setProvinceCode] = useState<string>('GP');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Application Tabs inside Technician Field Tablet Simulator
  const [activeTab, setActiveTab] = useState<
    'workorders' | 'provision' | 'learner_assign' | 'diagnostics' | 'firmware' | 'sim' | 'inventory' | 'signoff' | 'analytics'
  >('workorders');

  // Work Orders & Active Selection
  const [workOrders, setWorkOrders] = useState<FieldWorkOrder[]>(SAMPLE_WORK_ORDERS);
  const [activeWorkOrder, setActiveWorkOrder] = useState<FieldWorkOrder>(SAMPLE_WORK_ORDERS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  // Provisioning & BLE State
  const [scannedQrCode, setScannedQrCode] = useState<string>('ITIS-nRF9160-8842-X509');
  const [bleDiscoveredDevices, setBleDiscoveredDevices] = useState<
    Array<{ name: string; rssi: number; serial: string; status: string }>
  >([
    { name: 'ITIS-nRF9160-8842', rssi: -42, serial: 'ITIS-nRF9160-8842', status: 'DISCOVERED' },
    { name: 'ITIS-nRF9160-9104', rssi: -68, serial: 'ITIS-nRF9160-9104', status: 'DISCOVERED' },
  ]);
  const [connectedDevice, setConnectedDevice] = useState<string | null>('ITIS-nRF9160-8842');
  const [isProvisioning, setIsProvisioning] = useState<boolean>(false);
  const [provisioningSuccess, setProvisioningSuccess] = useState<boolean>(true);

  // Diagnostics Runner State
  const [diagnosticTests, setDiagnosticTests] = useState<BleDiagnosticTest[]>(INITIAL_BLE_DIAGNOSTICS);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState<boolean>(false);

  // Inventory State
  const [inventoryList, setInventoryList] = useState<VehicleInventoryItem[]>(SAMPLE_VEHICLE_INVENTORY);

  // Sign-off & Certificate Capture
  const [parentSignature, setParentSignature] = useState<boolean>(true);
  const [technicianSignature, setTechnicianSignature] = useState<boolean>(true);
  const [schoolRepSignature, setSchoolRepSignature] = useState<boolean>(true);
  const [photoVerified, setPhotoVerified] = useState<boolean>(true);
  const [installationCertificateHash, setInstallationCertificateHash] = useState<string | null>(
    '0xa1b2c3d4e5f67890123456789abcdef'
  );

  // Offline Mode & SQLite Cache
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [sqliteQueueCount, setSqliteQueueCount] = useState<number>(0);

  // Run Automated BLE Diagnostics Simulation
  const handleRunDiagnostics = () => {
    setIsRunningDiagnostics(true);

    // Reset tests
    setDiagnosticTests((prev) =>
      prev.map((t) => ({ ...t, status: 'TESTING', value: 'Measuring...' }))
    );

    setTimeout(() => {
      const mockResults: BleDiagnosticTest[] = [
        { id: 'TST-01', name: 'GNSS Satellite Receiver Lock', component: 'GPS', status: 'PASS', metric: 'Satellites Locked', value: '11 Sats Locked (1.1m acc)' },
        { id: 'TST-02', name: 'LTE-M / NB-IoT Modem Ping', component: 'LTE_MODEM', status: 'PASS', metric: 'Signal Strength (RSRP)', value: '-84 dBm (Excellent)' },
        { id: 'TST-03', name: 'MTN RSA SIM Identity (eUICC)', component: 'SIM', status: 'PASS', metric: 'ICCID Verification', value: '8927010012938102 (Valid)' },
        { id: 'TST-04', name: 'LiPo Battery Health & Temp', component: 'BATTERY', status: 'PASS', metric: 'Voltage & Temp C', value: '4.18V • 28.4°C (100% Health)' },
        { id: 'TST-05', name: 'Inductive Magnetic Charger', component: 'CHARGING', status: 'PASS', metric: 'Charge Rate (mA)', value: '450mA Fast Charge OK' },
        { id: 'TST-06', name: 'Dual Tactile SOS Panic Buttons', component: 'SOS_BUTTON', status: 'PASS', metric: 'Switch Impedance', value: '0.2 Ohms (Response <10ms)' },
        { id: 'TST-07', name: 'Optical Strap Buckle Tamper', component: 'TAMPER_SENSOR', status: 'PASS', metric: 'IR Light Reflection', value: 'Secure Contact (No Light Leaks)' },
        { id: 'TST-08', name: '3-Axis Accelerometer Motion', component: 'ACCELEROMETER', status: 'PASS', metric: 'G-Force Delta', value: 'Calibrated (±16G Range)' },
        { id: 'TST-09', name: 'Skin Temperature Sensor', component: 'TEMP_SENSOR', status: 'PASS', metric: 'Temperature °C', value: '36.4°C Body Temp Lock' },
        { id: 'TST-10', name: 'STSAFE-A110 Hardware Enclave', component: 'BLE', status: 'PASS', metric: 'X.509 Cert SHA-256', value: 'mTLS Handshake Verified' },
      ];

      setDiagnosticTests(mockResults);
      setIsRunningDiagnostics(false);

      // Update work order status
      setActiveWorkOrder((prev) => ({ ...prev, status: 'DIAGNOSTICS_PASSED' }));
    }, 1500);
  };

  // Complete Installation Certificate
  const handleGenerateCertificate = () => {
    const newHash = '0x' + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
    setInstallationCertificateHash(newHash);

    const updatedWorkOrder: FieldWorkOrder = {
      ...activeWorkOrder,
      status: 'COMPLETED',
      newDeviceSerial: scannedQrCode.split('-')[1] ? scannedQrCode : 'ITIS-nRF9160-8842',
    };

    setActiveWorkOrder(updatedWorkOrder);
    setWorkOrders((prev) => prev.map((w) => (w.id === updatedWorkOrder.id ? updatedWorkOrder : w)));

    if (isOffline) {
      setSqliteQueueCount((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center justify-center">
      {/* APP OVERVIEW BANNER */}
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/50 rounded-2xl flex items-center justify-center text-amber-400 shadow-lg shadow-amber-900/30">
            <Wrench className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white">FIELD TECHNICIAN & PROVISIONING APP</h1>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                FIELD TABLET
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                PROMPT 058
              </span>
            </div>
            <p className="text-xs text-slate-400">
              1:1 Learner Device Activation, BLE Diagnostics, NFC Pairing, SIM Provisioning & Digital Sign-off
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          {/* Offline Sync Toggle */}
          <button
            onClick={() => {
              setIsOffline(!isOffline);
              if (isOffline) {
                setSqliteQueueCount(0);
              }
            }}
            className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
              isOffline
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOffline ? `OFFLINE SQLite (${sqliteQueueCount} QUEUED)` : 'ONLINE CLOUD SYNC'}</span>
          </button>

          {/* Language Selector */}
          <div className="bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-1 text-slate-300">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none font-sans font-semibold cursor-pointer"
            >
              {SA_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RUGGED TABLET CONTAINER FRAME */}
      <div className="w-full max-w-5xl bg-slate-900 border-4 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-4">
        {/* TABLET TOP STATUS HEADER */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-400 font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center space-x-2">
                <span>{techName}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-[10px] text-slate-400">
                Cert: {techCertNumber} • Province: {provinceCode} (Gauteng Central Depot)
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-emerald-400">
              <Battery className="w-4 h-4" />
              <span>96% (Ruggedized Battery)</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-400">
              <Bluetooth className="w-4 h-4" />
              <span>BLE 5.3 Active</span>
            </div>
          </div>
        </div>

        {/* FIELD TABLET NAVIGATION BAR */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab('workorders')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'workorders' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Orders</span>
          </button>

          <button
            onClick={() => setActiveTab('provision')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'provision' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Provision</span>
          </button>

          <button
            onClick={() => setActiveTab('learner_assign')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'learner_assign' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Assign</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'diagnostics' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>BLE Diag</span>
          </button>

          <button
            onClick={() => setActiveTab('firmware')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'firmware' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Firmware</span>
          </button>

          <button
            onClick={() => setActiveTab('sim')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'sim' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>SIM</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'inventory' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Stock</span>
          </button>

          <button
            onClick={() => setActiveTab('signoff')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'signoff' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Sign-Off</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`p-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'analytics' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>KPIs</span>
          </button>
        </div>

        {/* TAB 1: WORK ORDER DASHBOARD */}
        {activeTab === 'workorders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search work orders, learner name, school or ticket..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-xs cursor-pointer"
                >
                  <option value="ALL">All Priorities</option>
                  <option value="EMERGENCY">Emergency</option>
                  <option value="HIGH">High</option>
                  <option value="NORMAL">Normal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workOrders.map((wo) => (
                <div
                  key={wo.id}
                  onClick={() => setActiveWorkOrder(wo)}
                  className={`cursor-pointer bg-slate-950 border rounded-2xl p-4 space-y-3 transition-all ${
                    activeWorkOrder.id === wo.id
                      ? 'border-amber-500 ring-1 ring-amber-500/50 shadow-lg shadow-amber-900/20'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-slate-900 text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800">
                      {wo.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                        wo.priority === 'EMERGENCY'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {wo.priority} SLA {wo.slaCountdownHours}H
                    </span>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-white">{wo.learnerName}</div>
                    <div className="text-xs text-slate-400">{wo.schoolName} ({wo.learnerGrade})</div>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="text-amber-400 font-bold font-mono text-[11px]">{wo.orderType.replace(/_/g, ' ')}</div>
                    <div className="text-slate-300 text-[11px]">{wo.notes}</div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Guardian: {wo.guardianName}</span>
                    <span className="text-emerald-400 font-bold">{wo.status.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DEVICE PROVISIONING WIZARD */}
        {activeTab === 'provision' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <QrCode className="w-5 h-5 text-amber-400" />
                  <span>X.509 CERTIFICATE & QR PROVISIONING</span>
                </h3>
                <p className="text-xs text-slate-400">Scan QR payload & pair hardware security module (STSAFE-A110)</p>
              </div>
              <span className="bg-emerald-950 text-emerald-400 text-xs font-mono font-bold px-2.5 py-1 rounded-xl border border-emerald-500/40">
                mTLS ENCLAVE OK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* QR Scanner Simulator */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
                <div className="w-32 h-32 border-2 border-dashed border-amber-400 rounded-2xl flex items-center justify-center bg-slate-950/80 relative">
                  <QrCode className="w-16 h-16 text-amber-400" />
                  <div className="absolute inset-x-0 h-0.5 bg-amber-400/80 top-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="text-xs font-mono text-slate-300">
                  <span>Scanned Payload: </span>
                  <span className="text-amber-400 font-bold">{scannedQrCode}</span>
                </div>
                <button
                  onClick={() => setScannedQrCode('ITIS-nRF9160-8842-' + Math.floor(1000 + Math.random() * 8999))}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs px-3 py-1.5 rounded-xl border border-slate-700"
                >
                  SIMULATE CAMERA RE-SCAN
                </button>
              </div>

              {/* BLE Discovery List */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-300 flex items-center space-x-1.5">
                    <Bluetooth className="w-4 h-4 text-blue-400" />
                    <span>NEARBY BLE HARDWARE DISCOVERY</span>
                  </span>
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                </div>

                <div className="space-y-2">
                  {bleDiscoveredDevices.map((dev, i) => (
                    <div
                      key={i}
                      onClick={() => setConnectedDevice(dev.serial)}
                      className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                        connectedDevice === dev.serial
                          ? 'bg-blue-950/40 border-blue-500/80 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-white">{dev.name}</div>
                        <div className="text-[10px] text-slate-400">RSSI: {dev.rssi} dBm • BLE 5.3 M2M</div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          connectedDevice === dev.serial ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {connectedDevice === dev.serial ? 'CONNECTED' : 'CONNECT'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LEARNER 1:1 DEVICE ASSIGNMENT */}
        {activeTab === 'learner_assign' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                  <span>1:1 LEARNER DEVICE ASSIGNMENT</span>
                </h3>
                <p className="text-xs text-slate-400">Cryptographically pair wearable serial with learner database record</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-white text-sm">LEARNER VERIFICATION</div>
                <div className="space-y-1 text-slate-300">
                  <div>Name: <span className="text-white font-bold">{activeWorkOrder.learnerName}</span></div>
                  <div>Learner ID: <span className="text-amber-400">{activeWorkOrder.learnerId}</span></div>
                  <div>Grade / Class: <span className="text-white">{activeWorkOrder.learnerGrade}</span></div>
                  <div>School: <span className="text-white">{activeWorkOrder.schoolName}</span></div>
                  <div>Guardian: <span className="text-white">{activeWorkOrder.guardianName} ({activeWorkOrder.guardianContact})</span></div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-white text-sm">HARDWARE PAIRING STATUS</div>
                <div className="space-y-1 text-slate-300">
                  <div>Assigned Serial: <span className="text-emerald-400 font-bold">{scannedQrCode}</span></div>
                  <div>mTLS Cert Hash: <span className="text-slate-400 text-[10px]">0x88e1a902f811c09028a</span></div>
                  <div>Optical Strap Fit: <span className="text-emerald-400 font-bold font-sans">Medium Size Verified</span></div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('diagnostics');
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-amber-500/20"
                >
                  CONFIRM PAIRING & PROCEED TO DIAGNOSTICS →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BLE HARDWARE DIAGNOSTICS RUNNER */}
        {activeTab === 'diagnostics' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <span>AUTOMATED BLE HARDWARE DIAGNOSTICS</span>
                </h3>
                <p className="text-xs text-slate-400">Comprehensive hardware verification prior to field deployment</p>
              </div>

              <button
                onClick={handleRunDiagnostics}
                disabled={isRunningDiagnostics}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRunningDiagnostics ? 'animate-spin' : ''}`} />
                <span>{isRunningDiagnostics ? 'RUNNING TESTS...' : 'START DIAGNOSTICS'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {diagnosticTests.map((t) => (
                <div key={t.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.metric}: {t.value}</div>
                  </div>
                  <div>
                    {t.status === 'PASS' && (
                      <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/40 font-bold text-[10px]">
                        PASS
                      </span>
                    )}
                    {t.status === 'TESTING' && (
                      <span className="bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40 font-bold text-[10px] animate-pulse">
                        TESTING
                      </span>
                    )}
                    {t.status === 'NOT_TESTED' && (
                      <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">
                        PENDING
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FIRMWARE MANAGEMENT */}
        {activeTab === 'firmware' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  <span>OVER-THE-AIR (OTA) FIRMWARE MANAGEMENT</span>
                </h3>
                <p className="text-xs text-slate-400">Digitally signed firmware releases with SHA-256 rollback support</p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {AVAILABLE_FIRMWARE_RELEASES.map((fw) => (
                <div key={fw.version} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-sm">{fw.version}</span>
                    <span className="text-slate-400 font-sans text-[11px]">{fw.releaseDate} • {(fw.fileSizeBytes / 1024 / 1024).toFixed(2)} MB</span>
                  </div>

                  <div className="text-[10px] text-slate-400 truncate">SHA256: {fw.digitalSignatureSha256}</div>

                  <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px] font-sans">
                    {fw.releaseNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>

                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-4 rounded-xl text-xs transition-all">
                    FLASH OTA OVER BLE
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SIM PROVISIONING */}
        {activeTab === 'sim' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-amber-400" />
                  <span>MTN / VODACOM eSIM & ICCID PROVISIONING</span>
                </h3>
                <p className="text-xs text-slate-400">APN provisioning & eUICC cellular profiles</p>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 font-mono space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400">ACTIVE ICCID:</span>
                  <div className="text-white font-bold">8927010012938102</div>
                </div>

                <div>
                  <span className="text-slate-400">CARRIER APN:</span>
                  <div className="text-emerald-400 font-bold">itis.m2m.mtn.co.za</div>
                </div>

                <div>
                  <span className="text-slate-400">DATA USAGE (THIS MONTH):</span>
                  <div className="text-white">14.2 MB / 500 MB Cap</div>
                </div>

                <div>
                  <span className="text-slate-400">SIGNAL STRENGTH:</span>
                  <div className="text-emerald-400 font-bold">-84 dBm (LTE-M)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: VEHICLE INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Box className="w-5 h-5 text-amber-400" />
                  <span>TECHNICIAN BOOT STOCK INVENTORY</span>
                </h3>
                <p className="text-xs text-slate-400">Vehicle mobile depot stock tracking & warehouse replenishment</p>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {inventoryList.map((item) => (
                <div key={item.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{item.model}</div>
                    <div className="text-[10px] text-slate-400">Serial/ICCID: {item.serialOrIccid}</div>
                  </div>
                  <div className="text-right">
                    <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                      QTY: {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: DIGITAL SIGN-OFF & CERTIFICATE */}
        {activeTab === 'signoff' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <FileCheck2 className="w-5 h-5 text-amber-400" />
                  <span>DIGITAL SIGN-OFF & IMMUTABLE CERTIFICATE</span>
                </h3>
                <p className="text-xs text-slate-400">3-Party verification (Parent, Technician, School Rep)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <button
                onClick={() => setParentSignature(!parentSignature)}
                className={`p-3 rounded-xl border font-bold transition-all ${
                  parentSignature ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {parentSignature ? '✓ Parent Signature Signed' : 'Click to Capture Parent Signature'}
              </button>

              <button
                onClick={() => setTechnicianSignature(!technicianSignature)}
                className={`p-3 rounded-xl border font-bold transition-all ${
                  technicianSignature ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {technicianSignature ? '✓ Tech Signature Signed' : 'Click to Capture Tech Signature'}
              </button>

              <button
                onClick={() => setSchoolRepSignature(!schoolRepSignature)}
                className={`p-3 rounded-xl border font-bold transition-all ${
                  schoolRepSignature ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {schoolRepSignature ? '✓ School Rep Signed' : 'Click to Capture School Signature'}
              </button>
            </div>

            <button
              onClick={handleGenerateCertificate}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/30"
            >
              GENERATE IMMUTABLE INSTALLATION CERTIFICATE
            </button>

            {installationCertificateHash && (
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-emerald-400 font-bold">✓ CERTIFICATE ISSUED AND AUDITED</div>
                <div className="text-slate-400 text-[10px] truncate">SHA-256 Hash: {installationCertificateHash}</div>
              </div>
            )}
          </div>
        )}

        {/* TAB 9: TECHNICIAN ANALYTICS & KPIS */}
        {activeTab === 'analytics' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  <span>FIELD TECHNICIAN PERFORMANCE & KPIS</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">JOBS COMPLETED</div>
                <div className="text-xl font-bold text-white mt-1">142</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">AVG INSTALL TIME</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">11.4 Mins</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">1st-TIME SUCCESS</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">99.1%</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">DEVICE FAILURE RATE</div>
                <div className="text-xl font-bold text-blue-400 mt-1">0.4%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
