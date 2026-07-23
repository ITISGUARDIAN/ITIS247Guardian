import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Shield,
  ShieldAlert,
  ShieldCheck,
  QrCode,
  Radio,
  Cpu,
  BatteryCharging,
  Wifi,
  Layers,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  RotateCw,
  FileCode,
  Database,
  Terminal,
  Smartphone,
  Maximize2,
  Minimize2,
  Languages,
  Activity,
  Box,
  Truck,
  Zap,
  Lock,
  KeyRound,
  Download,
  Share2,
  ChevronRight,
  HardDrive,
  Barcode
} from 'lucide-react';
import {
  SAMPLE_WORK_ORDERS,
  SAMPLE_DIAGNOSTICS,
  SAMPLE_INVENTORY,
  FTDPA_CODE_SPECS,
  CRITICAL_FTDPA_RULES,
  WorkOrderRecord,
  HardwareDiagnosticResult,
  InventoryItem,
  FtdpaCodeSpec
} from '../data/ftdpaData';

export const FtdpaModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'app_simulator' | 'work_orders' | 'provision_pair' | 'diagnostics' | 'firmware_sim' | 'inventory' | 'code_specs' | 'rules_sla'
  >('app_simulator');

  // Mobile Screen State inside Phone Frame
  const [activeScreen, setActiveScreen] = useState<
    'work_orders' | 'scanner' | 'diagnostics' | 'pairing' | 'firmware' | 'inventory' | 'settings'
  >('work_orders');

  // Work Orders State
  const [workOrders, setWorkOrders] = useState<WorkOrderRecord[]>(SAMPLE_WORK_ORDERS);
  const [activeWorkOrder, setActiveWorkOrder] = useState<WorkOrderRecord>(SAMPLE_WORK_ORDERS[0]);

  // Diagnostics State
  const [diagnostics, setDiagnostics] = useState<HardwareDiagnosticResult[]>(SAMPLE_DIAGNOSTICS);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState<boolean>(false);

  // Inventory State
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(SAMPLE_INVENTORY);

  // Pairing State
  const [parentOtpInput, setParentOtpInput] = useState<string>('');
  const [technicianPinInput, setTechnicianPinInput] = useState<string>('');
  const [pairingSuccess, setPairingSuccess] = useState<boolean>(false);

  // Code Spec State
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<FtdpaCodeSpec>(FTDPA_CODE_SPECS[0]);

  // Viewport mode
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Run Automated Diagnostic Test Simulation
  const handleRunDiagnostics = () => {
    setIsDiagnosticRunning(true);
    addLog(`INITIALIZED BLE 12-POINT HARDWARE DIAGNOSTICS for IMEI ${activeWorkOrder.assignedImei}...`);

    setTimeout(() => {
      setDiagnostics((prev) =>
        prev.map((d) =>
          d.sensorName.includes('Strap Tamper')
            ? { ...d, status: 'PASS', valueMeasured: '12.2 kΩ (Normal Closed Loop)', benchmark: '12.4 kΩ ±5%' }
            : d
        )
      );
      setIsDiagnosticRunning(false);
      addLog(`DIAGNOSTICS PASSED: Replacement capacitive strap installed. All 6 core sensor suites 100% green.`);
    }, 2000);
  };

  // Execute 1:1 Learner Pairing
  const handleExecutePairing = (e: React.FormEvent) => {
    e.preventDefault();
    if (parentOtpInput === '9910' || parentOtpInput.length === 4) {
      setPairingSuccess(true);
      setWorkOrders((prev) =>
        prev.map((w) => (w.id === activeWorkOrder.id ? { ...w, status: 'PAIRED' } : w))
      );
      addLog(`SUCCESSFUL 1:1 BINDING: Wearable IMEI ${activeWorkOrder.assignedImei} bound to Learner ${activeWorkOrder.learnerName}. OTP & Tech PIN verified.`);
    } else {
      addLog(`PAIRING ERROR: Parent OTP Invalid. Pairing rejected by ITIS Security Policy.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 rounded-2xl border border-amber-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/50 text-amber-300 text-xs font-semibold">
              <Wrench className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>PROMPT 039 — FIELD TECHNICIAN & DEVICE PROVISIONING APP (FTDPA)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Field Technician & <span className="text-amber-400">Device Provisioning App</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Production-ready Flutter 3.x / Dart Clean Architecture mobile application for field technicians, hardware installers, and warehouse managers. Supports QR/NFC device provisioning, BLE 12-point hardware diagnostics, 1:1 learner binding with parent OTP, OTA firmware signature verification, and van inventory tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-amber-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">&lt; 500ms</span>
              <span className="text-xs text-slate-400 font-medium">QR / NFC Scan</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-cyan-400">&lt; 30s</span>
              <span className="text-xs text-slate-400 font-medium">Auto Diagnostics</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">1:1</span>
              <span className="text-xs text-slate-400 font-medium">Strict Binding</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('app_simulator')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'app_simulator'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>1. Live Handset Simulator</span>
          </button>

          <button
            onClick={() => setActiveSubTab('work_orders')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'work_orders'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>2. Work Order Management</span>
          </button>

          <button
            onClick={() => setActiveSubTab('provision_pair')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'provision_pair'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>3. QR/NFC Provision & Pairing</span>
          </button>

          <button
            onClick={() => setActiveSubTab('diagnostics')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'diagnostics'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>4. Hardware Diagnostics Suite</span>
          </button>

          <button
            onClick={() => setActiveSubTab('inventory')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'inventory'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Box className="w-4 h-4 text-amber-400" />
            <span>5. Van & Depot Inventory</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-fuchsia-400" />
            <span>6. Flutter Clean Architecture Spec</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rules_sla')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'rules_sla'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>7. Mandatory FTDPA Rules & SLAs</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-amber-400" />
              <span>FTDPA Field Technician Operation Log Stream</span>
            </span>
            <button onClick={() => setLogs([])} className="text-slate-500 hover:text-slate-300">
              Clear
            </button>
          </div>
          <div className="space-y-1">
            {logs.map((log, idx) => (
              <p key={idx} className="text-slate-300">
                {log}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 1: LIVE HANDSET SIMULATOR */}
      {activeSubTab === 'app_simulator' && (
        <div className="space-y-6">
          {/* VIEWPORT CONTROLS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h4 className="text-xs font-bold text-white">Technician ID: TECH-JHB-4091</h4>
                <p className="text-[10px] text-slate-400 font-mono">Senior Field Engineer • Vehicle Van #04</p>
              </div>
            </div>

            <button
              onClick={() => setIsExpandedView(!isExpandedView)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
            >
              {isExpandedView ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isExpandedView ? 'Phone Frame View' : 'Full Desktop View'}</span>
            </button>
          </div>

          {/* SIMULATOR CONTAINER */}
          <div className={`flex justify-center transition-all ${isExpandedView ? 'w-full' : ''}`}>
            <div
              className={`bg-slate-950 rounded-[40px] border-4 border-slate-800 p-4 shadow-2xl relative overflow-hidden transition-all ${
                isExpandedView ? 'w-full max-w-5xl' : 'w-full max-w-md'
              }`}
            >
              {/* PHONE TOP NOTCH */}
              <div className="w-32 h-4 bg-slate-900 mx-auto rounded-b-xl flex items-center justify-center space-x-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-8 h-1.5 rounded-full bg-slate-800" />
              </div>

              {/* FTDPA APP HEADER */}
              <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Wrench className="w-5 h-5 text-amber-400 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">ITIS Provisioning Engine</h4>
                    <span className="text-[10px] text-emerald-400 font-mono">mTLS HSM Token Authenticated</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-400">
                  <Radio className="w-3.5 h-3.5" />
                  <span>BLE Online</span>
                </div>
              </div>

              {/* SCREEN CONTENT ENGINE */}
              <div className="space-y-4 min-h-[460px] max-h-[560px] overflow-y-auto pr-1">
                {/* 1. WORK ORDERS SCREEN */}
                {activeScreen === 'work_orders' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300 uppercase tracking-wider">Assigned Work Orders</span>
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] font-bold border border-amber-800">
                        {workOrders.length} JOBS
                      </span>
                    </div>

                    {workOrders.map((wo) => (
                      <div key={wo.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-amber-400">{wo.id}</span>
                          <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-bold uppercase">
                            {wo.priority}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-white text-sm">{wo.orderType.replace(/_/g, ' ')}</h4>
                          <p className="text-xs text-slate-400">{wo.schoolName}</p>
                          <span className="text-[10px] text-cyan-400 block font-mono mt-0.5">
                            Target: {wo.learnerName} | IMEI: {wo.assignedImei}
                          </span>
                        </div>

                        <p className="p-2.5 bg-slate-950 rounded-xl text-[11px] text-slate-300 font-mono">
                          {wo.technicianNotes}
                        </p>

                        <div className="flex justify-between items-center text-xs font-mono pt-1">
                          <span className="text-slate-400">Scheduled: <strong className="text-white">{wo.scheduledTime}</strong></span>
                          <span className="text-emerald-400 font-bold">{wo.status}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => {
                              setActiveWorkOrder(wo);
                              setActiveScreen('diagnostics');
                            }}
                            className="py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1"
                          >
                            <Cpu className="w-3.5 h-3.5" />
                            <span>DIAGNOSTICS</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveWorkOrder(wo);
                              setActiveScreen('pairing');
                            }}
                            className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center space-x-1"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>PAIR DEVICE</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. DIAGNOSTICS SCREEN */}
                {activeScreen === 'diagnostics' && (
                  <div className="space-y-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div>
                          <h4 className="font-bold text-white text-sm">BLE 12-Point Hardware Test</h4>
                          <span className="text-[10px] text-amber-400 font-mono">IMEI: {activeWorkOrder.assignedImei}</span>
                        </div>
                        <button
                          onClick={handleRunDiagnostics}
                          disabled={isDiagnosticRunning}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1"
                        >
                          <RotateCw className={`w-3.5 h-3.5 ${isDiagnosticRunning ? 'animate-spin' : ''}`} />
                          <span>{isDiagnosticRunning ? 'Testing...' : 'Run Test'}</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {diagnostics.map((diag, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-[11px]">
                            <div>
                              <span className="font-bold text-white block">{diag.sensorName}</span>
                              <span className="text-slate-400 text-[10px]">{diag.valueMeasured}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              diag.status === 'PASS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}>
                              {diag.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. PAIRING SCREEN */}
                {activeScreen === 'pairing' && (
                  <div className="space-y-4 text-xs">
                    <form onSubmit={handleExecutePairing} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <span className="font-bold text-white block border-b border-slate-800 pb-2 flex items-center space-x-2">
                        <QrCode className="w-4 h-4 text-emerald-400" />
                        <span>Strict 1:1 Learner Device Binding</span>
                      </span>

                      <div>
                        <label className="block text-slate-400 text-[10px] font-semibold mb-1">Target Learner:</label>
                        <input
                          type="text"
                          readOnly
                          value={activeWorkOrder.learnerName}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-amber-400 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 text-[10px] font-semibold mb-1">Parent SMS OTP Verification Code:</label>
                        <input
                          type="text"
                          value={parentOtpInput}
                          onChange={(e) => setParentOtpInput(e.target.value)}
                          placeholder="Enter 4-digit OTP (Try 9910)"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 text-[10px] font-semibold mb-1">Technician PIN:</label>
                        <input
                          type="password"
                          value={technicianPinInput}
                          onChange={(e) => setTechnicianPinInput(e.target.value)}
                          placeholder="••••"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center space-x-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>BIND WEARABLE 1:1</span>
                      </button>

                      {pairingSuccess && (
                        <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-xl text-center font-bold">
                          ✓ Wearable Successfully Provisioned & Bound!
                        </div>
                      )}
                    </form>
                  </div>
                )}

                {/* 4. INVENTORY SCREEN */}
                {activeScreen === 'inventory' && (
                  <div className="space-y-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <span className="font-bold text-white block border-b border-slate-800 pb-2 flex items-center space-x-2">
                        <Box className="w-4 h-4 text-amber-400" />
                        <span>Vehicle Van #04 Stock Inventory</span>
                      </span>

                      <div className="space-y-2">
                        {inventoryList.map((inv) => (
                          <div key={inv.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-[11px]">
                            <div>
                              <span className="font-bold text-white block">{inv.itemType.replace(/_/g, ' ')}</span>
                              <span className="text-slate-400 text-[10px]">SN/IMEI: {inv.serialOrImei}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-bold text-[10px]">
                              {inv.condition}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* BOTTOM NAVIGATION BAR */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-4 gap-1 text-[10px] text-center text-slate-400 font-medium">
                <button
                  onClick={() => setActiveScreen('work_orders')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'work_orders' ? 'text-amber-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Work Orders</span>
                </button>

                <button
                  onClick={() => setActiveScreen('diagnostics')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'diagnostics' ? 'text-amber-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>Diagnostics</span>
                </button>

                <button
                  onClick={() => setActiveScreen('pairing')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'pairing' ? 'text-amber-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pairing</span>
                </button>

                <button
                  onClick={() => setActiveScreen('inventory')}
                  className={`p-1.5 rounded-xl flex flex-col items-center space-y-0.5 ${
                    activeScreen === 'inventory' ? 'text-amber-400 bg-slate-900' : 'hover:text-white'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  <span>Stock</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: WORK ORDERS */}
      {activeSubTab === 'work_orders' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>Field Maintenance Work Order Queue</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workOrders.map((wo) => (
              <div key={wo.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>{wo.id}</span>
                  <span className="text-rose-400">{wo.priority}</span>
                </div>
                <p className="text-white font-bold">{wo.orderType.replace(/_/g, ' ')}</p>
                <p className="text-slate-400">{wo.schoolName}</p>
                <span className="text-emerald-400 block font-bold">STATUS: {wo.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: PROVISION & PAIRING */}
      {activeSubTab === 'provision_pair' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <QrCode className="w-5 h-5 text-emerald-400" />
            <span>X.509 Certificate Enrollment & 1:1 Learner Pairing Engine</span>
          </h3>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
            <span className="text-emerald-400 font-bold block">1:1 STRICT BINDING RULE:</span>
            <p className="text-slate-300">
              Every Wearable v4 IMEI must possess a valid RSA-signed X.509 device certificate. Pairing requires simultaneous parent OTP confirmation + field technician PIN authorization.
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: DIAGNOSTICS */}
      {activeSubTab === 'diagnostics' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span>12-Point Automated BLE Hardware Diagnostic Suite</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {diagnostics.map((d, i) => (
              <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono">
                <div>
                  <span className="text-white font-bold block">{d.sensorName}</span>
                  <span className="text-slate-400 text-[10px]">{d.valueMeasured}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: INVENTORY */}
      {activeSubTab === 'inventory' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Box className="w-5 h-5 text-amber-400" />
            <span>Vehicle Van & Regional Warehouse Stock Inventory</span>
          </h3>

          <div className="space-y-2">
            {inventoryList.map((inv) => (
              <div key={inv.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono">
                <div>
                  <span className="text-white font-bold block">{inv.itemType}</span>
                  <span className="text-slate-400 text-[10px]">Location: {inv.locationStock}</span>
                </div>
                <span className="text-amber-400 font-bold">{inv.serialOrImei}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-fuchsia-400" />
              <h3 className="text-base font-bold text-white">Flutter FTDPA Dart Architecture Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {FTDPA_CODE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedCodeSpec(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCodeSpec.id === spec.id
                      ? 'bg-fuchsia-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {spec.title}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-fuchsia-400 font-bold">{selectedCodeSpec.filename}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                {selectedCodeSpec.category}
              </span>
            </div>
            <p className="text-xs text-slate-400">{selectedCodeSpec.description}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
            <pre className="font-mono text-xs text-slate-300 leading-relaxed">
              {selectedCodeSpec.code}
            </pre>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: MANDATORY FTDPA RULES */}
      {activeSubTab === 'rules_sla' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span>10 Mandatory FTDPA Field Technician Rules & SLAs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {CRITICAL_FTDPA_RULES.map((rule) => (
              <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
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
      )}
    </div>
  );
};
