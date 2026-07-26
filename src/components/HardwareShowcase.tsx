import React, { useState } from 'react';
import { 
  Watch, 
  Radio, 
  Bus, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  Battery, 
  Wifi, 
  Cpu, 
  Lock,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';

interface HardwareItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  tagline: string;
  specs: { label: string; value: string }[];
  battery: string;
  connectivity: string;
  security: string;
  deploymentProcess: string;
}

const HARDWARE_CATALOG: HardwareItem[] = [
  {
    id: 'wearable',
    name: 'ITIS Learner Wearable Band v1.0',
    category: 'Wearable Hardware',
    icon: Watch,
    tagline: 'Tamper-resistant, IP68 waterproof wristband with ECDSA P-256 cryptographic hardware token and emergency SOS button.',
    specs: [
      { label: 'Form Factor', value: 'Hypoallergenic Silicone Band' },
      { label: 'Ingress Rating', value: 'IP68 (1.5m Submersion)' },
      { label: 'Weight', value: '28 grams' },
      { label: 'Crypto Chip', value: 'Microchip ATECC608A (ECDSA P-256)' }
    ],
    battery: '365 Days (CR2032 Replaceable / Non-Rechargeable Sealed)',
    connectivity: 'Bluetooth 5.3 LE (128-bit Encrypted Heartbeat)',
    security: 'mTLS Client Certificate pre-injected during manufacturing',
    deploymentProcess: 'NFC Tap provisioning via Technician App in <3 seconds per learner.'
  },
  {
    id: 'ble-gateway',
    name: 'Classroom BLE Mesh Gateway',
    category: 'Campus Infrastructure',
    icon: Radio,
    tagline: 'High-density wall-mounted scanner capable of performing automated roll-call for 60 learners in under 1 second.',
    specs: [
      { label: 'Capacity', value: 'Up to 250 Concurrent BLE Nodes' },
      { label: 'Power Input', value: 'Power-over-Ethernet (PoE) / 12V DC' },
      { label: 'Range', value: '35m Radial Coverage' },
      { label: 'Processor', value: 'Dual-Core ARM Cortex-M33' }
    ],
    battery: 'Integrated 12-Hour LiFePO4 UPS Battery Backup',
    connectivity: 'Ethernet RJ45, Wi-Fi 6, LTE-M Fallback SIM',
    security: 'AES-256 Encrypted Payload to Cloud Ingestion Bus',
    deploymentProcess: 'Plug-and-play ceiling/wall mount with QR Code self-registration.'
  },
  {
    id: 'vehicle-gateway',
    name: 'Scholar Fleet Telematics Hub',
    category: 'Vehicle Electronics',
    icon: Bus,
    tagline: 'Heavy-duty OBD-II / CANbus vehicular gateway providing dual-SIM LTE telematics and driver PDP card validation.',
    specs: [
      { label: 'GPS Receiver', value: 'Multi-Constellation L1/L5 GNSS (0.8m accuracy)' },
      { label: 'Interfaces', value: 'CANbus, RS232, 4x Digital I/O, NFC PDP Reader' },
      { label: 'Accelerometers', value: '6-Axis Gyro (Harsh Braking & Impact Detect)' },
      { label: 'Enclosure', value: 'Ruggedized Flame-Retardant ABS' }
    ],
    battery: 'Vehicle Battery Powered (9V - 36V DC wide range)',
    connectivity: 'Dual-SIM LTE-M / NB-IoT / 2G Emergency Failover',
    security: 'Hardware Secure Element with RSA-4096 Root Trust',
    deploymentProcess: 'Under-dash 15-minute wiring harness connection by certified auto electrician.'
  },
  {
    id: 'tech-device',
    name: 'Technician NFC Provisioner',
    category: 'Field Tooling',
    icon: Smartphone,
    tagline: 'Ruggedized handheld terminal utilized by on-site technicians to register bands, scan QR tags, and execute audits.',
    specs: [
      { label: 'Display', value: '5.5" Sun-Readable Gorilla Glass' },
      { label: 'Scanner', value: 'High-Speed 2D Barcode & ISO 14443 NFC' },
      { label: 'Drop Rating', value: '1.8m Concrete Drop Certified' },
      { label: 'OS', value: 'ITIS Android Enterprise Kiosk OS' }
    ],
    battery: '5000 mAh Hot-Swappable Battery (16 Hours continuous use)',
    connectivity: '4G LTE, Wi-Fi 802.11ax, Bluetooth 5.2',
    security: 'Zero Trust MDM Lock, Biometric Technician Login',
    deploymentProcess: 'Pre-configured and managed via Central MDM cloud portal.'
  },
  {
    id: 'command-centre',
    name: 'SAPS C3 Command Workstation',
    category: 'Control Centre',
    icon: Monitor,
    tagline: 'Enterprise dispatch terminal for provincial command centers, municipal security desks, and emergency responders.',
    specs: [
      { label: 'Display Support', value: 'Quad-4K Multi-Monitor Array' },
      { label: 'Latency', value: '&lt;250ms Alert Relay to Dispatch' },
      { label: 'Integrations', value: 'SAPS 10111, Private Armed Response, EMS' },
      { label: 'Map Engine', value: 'High-Precision Vector GIS Layers' }
    ],
    battery: 'Dual Redundant Power Supplies + Enterprise UPS & Generator',
    connectivity: 'Dedicated Dark Fiber / Direct Cloud Interconnect',
    security: 'FIPS 140-2 Level 3 HSM Key Management & Role-Based RBAC',
    deploymentProcess: 'Turnkey server rack setup with 24/7 SLA maintenance.'
  }
];

export function HardwareShowcase() {
  const [selectedItem, setSelectedItem] = useState<HardwareItem>(HARDWARE_CATALOG[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg">
              <Cpu className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">ITIS Hardware Product Ecosystem</h3>
          </div>
          <p className="text-xs text-slate-400">
            Purpose-built, South African climate-tested IoT hardware, gateways, and command workstation terminals.
          </p>
        </div>

        <span className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full text-2xs font-mono font-bold">
          5 HARDWARE PRODUCTS READY FOR MASS PRODUCTION
        </span>
      </div>

      {/* Product Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {HARDWARE_CATALOG.map((item) => {
          const Icon = item.icon;
          const isActive = selectedItem.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono transition flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Hardware Details Card */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 space-y-6">
        
        {/* Top Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="space-y-1">
            <span className="text-2xs font-mono text-amber-400 uppercase tracking-wider font-bold">
              {selectedItem.category}
            </span>
            <h4 className="text-2xl font-bold text-white flex items-center gap-3">
              {selectedItem.name}
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {selectedItem.tagline}
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center">
            {React.createElement(selectedItem.icon, { className: 'w-10 h-10 text-amber-400' })}
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedItem.specs.map((spec, i) => (
            <div key={i} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
              <span className="text-2xs font-mono text-slate-400">{spec.label}</span>
              <div className="text-xs font-mono font-bold text-white">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Security, Battery, Connectivity, Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <Battery className="w-4 h-4" /> Battery & Power Specs
            </div>
            <p className="text-xs text-slate-300 font-mono">{selectedItem.battery}</p>
          </div>

          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
              <Wifi className="w-4 h-4" /> Connectivity Protocols
            </div>
            <p className="text-xs text-slate-300 font-mono">{selectedItem.connectivity}</p>
          </div>

          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400">
              <Lock className="w-4 h-4" /> Hardware Security & Encryption
            </div>
            <p className="text-xs text-slate-300 font-mono">{selectedItem.security}</p>
          </div>

          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <ShieldCheck className="w-4 h-4" /> Deployment & Field Setup
            </div>
            <p className="text-xs text-slate-300 font-mono">{selectedItem.deploymentProcess}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
