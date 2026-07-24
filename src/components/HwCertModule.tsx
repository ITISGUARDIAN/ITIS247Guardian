import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Download,
  Settings,
  Radio,
  Wifi,
  BatteryCharging,
  Sliders,
  FileCode,
  Lock,
  Box,
  Compass,
  Building,
  RefreshCw,
  Check,
  RotateCw,
  Award,
  Factory,
  Wrench,
  Gauge
} from 'lucide-react';
import {
  SAMPLE_BOM_ITEMS,
  SAMPLE_QA_STATIONS,
  SAMPLE_MANUFACTURING_BATCHES,
  HWCERT_CODE_SPECS,
  CRITICAL_HWCERT_RULES,
  BomComponentItem,
  FactoryQaTestStationRecord,
  DeviceManufacturingBatch,
  HwCertCodeSpec
} from '../data/hwCertData';

export const HwCertModule: React.FC = () => {
  // Navigation Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    | 'industrial_design'
    | 'electronics_pcb'
    | 'battery_engineering'
    | 'firmware_rtos'
    | 'gnss_cellular'
    | 'durability_testing'
    | 'factory_qa'
    | 'regulatory_compliance'
    | 'code_specs'
  >('industrial_design');

  // State
  const [bomItems] = useState<BomComponentItem[]>(SAMPLE_BOM_ITEMS);
  const [qaStations] = useState<FactoryQaTestStationRecord[]>(SAMPLE_QA_STATIONS);
  const [batches] = useState<DeviceManufacturingBatch[]>(SAMPLE_MANUFACTURING_BATCHES);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<HwCertCodeSpec>(HWCERT_CODE_SPECS[0]);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const handleSimulateQaTest = (stationId: string) => {
    addLog(`FACTORY QA: Station ${stationId} executed 100-unit RF transmit calibration sweep. Result: 100% PASS.`);
  };

  const handleExportBomCsv = () => {
    addLog('PRODUCTION BOM: Exported hardware Bill of Materials (BOM) specification CSV for Shenzhen & JHB manufacturing line.');
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 rounded-2xl border border-teal-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-700/50 text-teal-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 animate-pulse text-teal-400" />
              <span>— HARDWARE WEARABLE ENGINEERING, MANUFACTURING & CERTIFICATION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Wearable Hardware <span className="text-teal-400">Engineering & Manufacturing</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Production engineering specifications for the physical ITIS child wearable device. Includes industrial design (IP68, anti-tamper strap), PCB stack-up, GNSS/LTE modem engineering, FreeRTOS secure boot firmware, ICASA/NRCS certification, and automated factory QA stations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-teal-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-teal-400">IP68</span>
              <span className="text-xs text-slate-400 font-medium">Submersible Seal</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">48h</span>
              <span className="text-xs text-slate-400 font-medium">Active Li-Po Runtime</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">ICASA</span>
              <span className="text-xs text-slate-400 font-medium">Certified Spec</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('industrial_design')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'industrial_design'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Box className="w-4 h-4 text-teal-300" />
            <span>1. Industrial Design & Comfort</span>
          </button>

          <button
            onClick={() => setActiveSubTab('electronics_pcb')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'electronics_pcb'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>2. Electronics & PCB BOM</span>
          </button>

          <button
            onClick={() => setActiveSubTab('battery_engineering')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'battery_engineering'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BatteryCharging className="w-4 h-4 text-amber-400" />
            <span>3. Battery & Power Management</span>
          </button>

          <button
            onClick={() => setActiveSubTab('firmware_rtos')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'firmware_rtos'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>4. FreeRTOS & Secure Boot</span>
          </button>

          <button
            onClick={() => setActiveSubTab('gnss_cellular')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'gnss_cellular'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>5. GNSS & Dual-APN Cellular</span>
          </button>

          <button
            onClick={() => setActiveSubTab('durability_testing')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'durability_testing'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>6. Mechanical & IP68 Durability</span>
          </button>

          <button
            onClick={() => setActiveSubTab('factory_qa')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'factory_qa'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Factory className="w-4 h-4 text-purple-400" />
            <span>7. Factory QA & Calibration</span>
          </button>

          <button
            onClick={() => setActiveSubTab('regulatory_compliance')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'regulatory_compliance'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-fuchsia-400" />
            <span>8. ICASA & Regulatory Compliance</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-teal-300" />
            <span>9. Hardware Schemas & Code Specs</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-teal-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-teal-400" />
              <span>Hardware Manufacturing & Factory Test Console</span>
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

      {/* SUB-TAB 1: INDUSTRIAL DESIGN */}
      {activeSubTab === 'industrial_design' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Box className="w-5 h-5 text-teal-400" />
            <span>Industrial Design, Ergonomics & Anti-Tamper Mechanical Spec</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold block">Dimensions & Weight</span>
              <p className="text-slate-300">38mm x 34mm x 11.2mm • 34 grams total weight. Optimized for South African learners aged 5–18.</p>
              <span className="text-emerald-400 font-bold block">✓ ERGONOMICS CERTIFIED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Strap Material & Locking Buckle</span>
              <p className="text-slate-300">Hypoallergenic Medical-Grade Silicone (ISO 10993) with integrated fiber-reinforced anti-tamper optical mesh.</p>
              <span className="text-emerald-400 font-bold block">✓ ANTI-TAMPER OPTICAL</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">Enclosure & Ingress Protection</span>
              <p className="text-slate-300">High-impact Polycarbonate (PC-ABS) casing with ultrasonic seal guaranteeing IP68 submersion (2m for 60 mins).</p>
              <span className="text-emerald-400 font-bold block">✓ IP68 SUBMERSIBLE</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ELECTRONICS & PCB */}
      {activeSubTab === 'electronics_pcb' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>Printed Circuit Board (PCB) Architecture & Component BOM</span>
              </h3>
              <p className="text-xs text-slate-400">4-Layer High-Density Interconnect (HDI) Rigid-Flex PCB stack-up design.</p>
            </div>

            <button
              onClick={handleExportBomCsv}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT PRODUCTION BOM CSV</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {bomItems.map((item) => (
              <div key={item.designator} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <span className="text-emerald-400 font-bold block">[{item.designator}] {item.componentName}</span>
                  <p className="text-slate-400 text-[11px]">Part #: {item.partNumber} • Category: {item.category} • Sourcing: {item.sourcingCountry}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-slate-300 font-bold">${item.unitCostUsd.toFixed(2)} USD</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    {item.complianceCert}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: BATTERY ENGINEERING */}
      {activeSubTab === 'battery_engineering' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <BatteryCharging className="w-5 h-5 text-amber-400" />
            <span>Power Subsystem & Li-Po Battery Cycle Management</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Chemistry & Capacity</span>
              <p className="text-slate-300">650mAh Lithium Polymer with integrated Protection Circuit Module (PCM) preventing overcharge, overdischarge, and thermal runaway.</p>
              <span className="text-emerald-400 font-bold block">✓ UN38.3 COMPLIANT</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Runtime & Charging</span>
              <p className="text-slate-300">48 hours active tracking (1-min telemetry interval) or 14 days standby. Magnetic pogo-pin fast charger (0-80% in 35 mins).</p>
              <span className="text-emerald-400 font-bold block">✓ FAST POGO-PIN</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">Degradation Curve</span>
              <p className="text-slate-300">Retains &gt; 85% capacity after 800 full charge cycles under African climate conditions (-10°C to +55°C operational range).</p>
              <span className="text-emerald-400 font-bold block">✓ 800+ CYCLES</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FIRMWARE RTOS */}
      {activeSubTab === 'firmware_rtos' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Lock className="w-5 h-5 text-indigo-400" />
            <span>FreeRTOS Secure Boot, Dual Flash Partitions & OTA Architecture</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">Arm TrustZone & Secure Boot:</span>
              <p className="text-slate-300">Hardware bootloader validates RSA-2048/ECC signature of the primary firmware image in Flash Partition A before booting.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">A/B Dual Partition FOTA Rollback:</span>
              <p className="text-slate-300">Over-the-Air updates download to Partition B in background. Automatic hardware watchdog rollback triggers if boot fails within 30s.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: GNSS & CELLULAR */}
      {activeSubTab === 'gnss_cellular' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Radio className="w-5 h-5 text-cyan-400" />
            <span>Multi-Constellation GNSS & Dual-APN SA Cellular Engineering</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">GNSS Multi-Constellation</span>
              <p className="text-slate-300">Concurrent GPS, Galileo, GLONASS, BeiDou & QZSS reception. Cold start TTFF &lt; 2.5s via Assisted-GPS (A-GPS). CEP accuracy &lt; 1.5 meters.</p>
              <span className="text-emerald-400 font-bold block">✓ CEP &lt; 1.5m ACCURACY</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">South African Mobile Network APNs</span>
              <p className="text-slate-300">eSIM with active profiles for MTN, Vodacom, Telkom, and Cell C. Encrypted Private APN with automatic signal failover in rural areas.</p>
              <span className="text-emerald-400 font-bold block">✓ 4-NETWORKS DUAL-APN</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: MECHANICAL DURABILITY */}
      {activeSubTab === 'durability_testing' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <ShieldCheck className="w-5 h-5 text-rose-400" />
            <span>Mechanical & Environmental Stress Testing Specifications</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">2-Meter Concrete Drop Test</span>
              <p className="text-slate-300">30 drops onto reinforced concrete at all 6 face angles. PCB shock isolation silicone gaskets protect internal sensors.</p>
              <span className="text-emerald-400 font-bold block">✓ 100% SHOCK PASSED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">IP68 Water & Dust Immersion</span>
              <p className="text-slate-300">Tested at 2.0m depth for 60 minutes in salt water and fine African dust chamber (IEC 60529 standard).</p>
              <span className="text-emerald-400 font-bold block">✓ IEC 60529 PASSED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Child Wear & Chemical Resistance</span>
              <p className="text-slate-300">Exposed to synthetic sweat, UV solar radiation, sunscreen, and pool chlorine for 500 continuous hours.</p>
              <span className="text-emerald-400 font-bold block">✓ NO MATERIAL DEGRADATION</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: FACTORY QA */}
      {activeSubTab === 'factory_qa' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Factory className="w-5 h-5 text-purple-400" />
            <span>Automated Assembly Line QA Test Stations & Batch Management</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {qaStations.map((st) => (
                <div key={st.stationId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-bold">{st.stationId}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                      {st.passRatePct}% PASS
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-300">
                    <p>Type: {st.stationType}</p>
                    <p>Units Today: {st.unitsTestedToday}</p>
                    <p>Lead Engineer: {st.calibratedOperator}</p>
                  </div>

                  <button
                    onClick={() => handleSimulateQaTest(st.stationId)}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all text-xs"
                  >
                    RUN FIXTURE TEST SWEEP
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Active Assembly Line Batches:</span>
              {batches.map((b) => (
                <div key={b.batchNumber} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800 pt-2 text-slate-300">
                  <span>Batch: <strong className="text-white">{b.batchNumber}</strong> ({b.manufacturingPlant})</span>
                  <span>IMEI Range: {b.imeiRangeStart} → {b.imeiRangeEnd} ({b.passedQaQuantity}/{b.targetQuantity} Ready)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: REGULATORY COMPLIANCE */}
      {activeSubTab === 'regulatory_compliance' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Award className="w-5 h-5 text-fuchsia-400" />
            <span>National ICASA, NRCS & International Certification Matrix</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-fuchsia-400 font-bold block">ICASA Radio Approval</span>
              <p className="text-slate-300">Type Approval Certificate TA-2026/8801 for LTE Cat-M1 and 2.4GHz BLE spectrum in South Africa.</p>
              <span className="text-emerald-400 font-bold block">✓ ICASA CERTIFIED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">NRCS Electrical Safety</span>
              <p className="text-slate-300">National Regulator for Compulsory Specifications LOA approval under IEC 62368-1.</p>
              <span className="text-emerald-400 font-bold block">✓ NRCS LOA ISSUED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">CE & FCC International</span>
              <p className="text-slate-300">Complies with European RED Directive 2014/53/EU and FCC Part 15 / 22 / 24 cellular standards.</p>
              <span className="text-emerald-400 font-bold block">✓ CE / FCC PASSED</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">ISO 9001 Factory Quality</span>
              <p className="text-slate-300">Assembled in certified high-tech ISO 9001 and ISO 14001 green manufacturing facilities.</p>
              <span className="text-emerald-400 font-bold block">✓ ISO 9001 AUDITED</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-teal-300" />
              <h3 className="text-base font-bold text-white">Hardware Schemas & NestJS Flashing Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {HWCERT_CODE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedCodeSpec(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCodeSpec.id === spec.id
                      ? 'bg-teal-600 text-white shadow-md'
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
              <span className="font-mono text-teal-300 font-bold">{selectedCodeSpec.filename}</span>
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

      {/* MANDATORY HARDWARE MANUFACTURING RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-teal-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_HWCERT_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-teal-400">RULE #{rule.id}</span>
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
    </div>
  );
};
