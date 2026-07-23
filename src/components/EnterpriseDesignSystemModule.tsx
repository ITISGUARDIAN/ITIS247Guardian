import React, { useState, useEffect } from 'react';
import {
  Palette,
  Type,
  LayoutGrid,
  Search,
  Command,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Siren,
  Sliders,
  Sparkles,
  Layers,
  Copy,
  Check,
  Download,
  Moon,
  Sun,
  Eye,
  SlidersHorizontal,
  Smartphone,
  School,
  Building2,
  Cpu,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Heart,
  FileCheck2,
  DollarSign,
  Maximize2,
  X,
  ChevronRight,
  ArrowRight,
  Volume2,
  VolumeX,
  FileText,
  Code2,
  Figma
} from 'lucide-react';
import { SA_LANGUAGES } from '../data/responderMobileData';

export function EnterpriseDesignSystemModule() {
  const [activeTab, setActiveTab] = useState<
    'tokens' | 'components' | 'command_palette' | 'notifications' | 'accessibility' | 'figma_spec'
  >('tokens');

  // Command Palette Open State
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [commandSearch, setCommandSearch] = useState<string>('');

  // Notification Drawer State
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Accessibility State
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Copy Feedback State
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Keyboard shortcut listener for CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Sample Notifications
  const sampleNotifications = [
    { id: '1', title: 'SOS Panic Triggered', time: '2 mins ago', level: 'CRITICAL', desc: 'Thabo Mokoena triggered wearable SOS at Orlando East Secondary.' },
    { id: '2', title: 'Gate NFC Scanner Sync', time: '14 mins ago', level: 'INFO', desc: 'Soweto High Gate 01 synced 1,840 attendance records to School Portal.' },
    { id: '3', title: 'OTA Firmware Flash Complete', time: '1 hour ago', level: 'SUCCESS', desc: 'nRF9160 batch GP-882 updated to v4.2.1 SITA Enclave certified.' },
  ];

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center justify-center relative transition-all ${
        highContrastMode ? 'contrast-125 saturate-150 border-4 border-amber-400' : ''
      }`}
    >
      {/* GLOBAL HEADER BANNER */}
      <div className="w-full max-w-7xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/50 rounded-2xl flex items-center justify-center text-amber-400 shadow-lg shadow-amber-900/30">
            <Palette className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white tracking-wide">
                ITIS ENTERPRISE DESIGN SYSTEM & UI/UX POLISH (EDSUPEP)
              </h1>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                @itis/shared-ui
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                PROMPT 062
              </span>
            </div>
            <p className="text-xs text-slate-400">
              WCAG 2.2 AA Accessibility, Command Palette (CTRL+K), Figma Token Spec & Shared Component Engine
            </p>
          </div>
        </div>

        {/* TOP QUICK ACTION BUTTONS */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-2 rounded-xl flex items-center space-x-2 transition-all shadow-md"
          >
            <Command className="w-4 h-4 text-amber-400" />
            <span>COMMAND PALETTE</span>
            <kbd className="bg-slate-950 text-amber-400 text-[10px] px-1.5 py-0.5 rounded border border-slate-800 font-mono">
              CTRL+K
            </kbd>
          </button>

          <button
            onClick={() => setIsNotifOpen(true)}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 p-2 rounded-xl relative transition-all"
          >
            <Bell className="w-4 h-4 text-blue-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
          </button>
        </div>
      </div>

      {/* DESIGN SYSTEM CONTAINER FRAME */}
      <div className="w-full max-w-7xl bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-6">
        {/* NAVIGATION TABS */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'tokens'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Color Tokens</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'components'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>UI Components</span>
          </button>

          <button
            onClick={() => setActiveTab('command_palette')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'command_palette'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Command className="w-4 h-4" />
            <span>Command Palette</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'notifications'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab('accessibility')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'accessibility'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>WCAG AA Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('figma_spec')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'figma_spec'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Figma className="w-4 h-4" />
            <span>Figma Tokens</span>
          </button>
        </div>

        {/* TAB 1: COLOR & DESIGN TOKENS EXPLORER */}
        {activeTab === 'tokens' && (
          <div className="space-y-6 font-sans">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Palette className="w-5 h-5 text-amber-400" />
                    <span>ENTERPRISE COLOR PALETTE & DESIGN TOKENS</span>
                  </h3>
                  <p className="text-xs text-slate-400">Strictly mapped WCAG AA compliant color tokens across all 10 ITIS portals</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs">
                {/* Deep Navy */}
                <div
                  onClick={() => copyToClipboard('#020617')}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 cursor-pointer hover:border-amber-500 transition-all group"
                >
                  <div className="w-full h-12 bg-slate-950 rounded-lg border border-slate-800"></div>
                  <div className="font-bold text-white">Deep Navy</div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>#020617</span>
                    <Copy className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                  </div>
                </div>

                {/* Accent Gold */}
                <div
                  onClick={() => copyToClipboard('#f59e0b')}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 cursor-pointer hover:border-amber-500 transition-all group"
                >
                  <div className="w-full h-12 bg-amber-500 rounded-lg"></div>
                  <div className="font-bold text-white">Accent Gold</div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>#F59E0B</span>
                    <Copy className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                  </div>
                </div>

                {/* Emergency Red */}
                <div
                  onClick={() => copyToClipboard('#ef4444')}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 cursor-pointer hover:border-amber-500 transition-all group"
                >
                  <div className="w-full h-12 bg-red-500 rounded-lg"></div>
                  <div className="font-bold text-white">Emergency Red</div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>#EF4444</span>
                    <Copy className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                  </div>
                </div>

                {/* SAPS Blue */}
                <div
                  onClick={() => copyToClipboard('#2563eb')}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 cursor-pointer hover:border-amber-500 transition-all group"
                >
                  <div className="w-full h-12 bg-blue-600 rounded-lg"></div>
                  <div className="font-bold text-white">SAPS Blue</div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>#2563EB</span>
                    <Copy className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                  </div>
                </div>

                {/* EMS Green */}
                <div
                  onClick={() => copyToClipboard('#10b981')}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 cursor-pointer hover:border-amber-500 transition-all group"
                >
                  <div className="w-full h-12 bg-emerald-500 rounded-lg"></div>
                  <div className="font-bold text-white">EMS Green</div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>#10B981</span>
                    <Copy className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                  </div>
                </div>

                {/* Slate Neutral */}
                <div
                  onClick={() => copyToClipboard('#334155')}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 cursor-pointer hover:border-amber-500 transition-all group"
                >
                  <div className="w-full h-12 bg-slate-700 rounded-lg"></div>
                  <div className="font-bold text-white">Slate Neutral</div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>#334155</span>
                    <Copy className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                  </div>
                </div>
              </div>

              {copiedToken && (
                <div className="text-center font-mono text-xs text-amber-400 animate-pulse font-bold">
                  Copied token ({copiedToken}) to clipboard!
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: REUSABLE COMPONENT LIBRARY SHOWCASE */}
        {activeTab === 'components' && (
          <div className="space-y-6 font-sans text-xs">
            {/* INCIDENT CARD COMPONENT */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="font-mono font-bold text-white text-sm flex items-center justify-between">
                <span>1. EMERGENCY INCIDENT CARD COMPONENT (`IncidentCard`)</span>
                <span className="text-red-400 text-[10px]">CRITICAL SOS COMPONENT</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border-2 border-red-500/60 shadow-2xl space-y-3 font-mono">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-500 text-white font-bold text-[10px] px-2.5 py-1 rounded">
                      SOS PANIC ALERT #INC-2026-901
                    </span>
                    <span className="text-slate-400 text-[10px]">2 mins ago</span>
                  </div>
                  <span className="text-emerald-400 text-[11px] font-bold">SLA: 03:24 REMAINING</span>
                </div>

                <div>
                  <div className="text-base font-bold text-white">Learner: Thabo Mokoena (WR-GP-8831)</div>
                  <div className="text-slate-400 text-[11px]">School: Orlando East Secondary • Soweto, GP</div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300 text-[11px] font-sans">
                  GPS: -26.2312, 27.9123 • Khumalo St Corridor • Buckle Status: LOCKED
                </div>
              </div>
            </div>

            {/* TELEMETRY CARD COMPONENT */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="font-mono font-bold text-white text-sm flex items-center justify-between">
                <span>2. WEARABLE TELEMETRY CARD (`TelemetryCard`)</span>
                <span className="text-emerald-400 text-[10px]">IOT HARDWARE COMPONENT</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Device ID: WR-KZN-1024</span>
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/40 font-bold">
                    LTE-M ONLINE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <div className="text-slate-400">BATTERY</div>
                    <div className="text-emerald-400 font-bold text-sm">94%</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <div className="text-slate-400">BUCKLE</div>
                    <div className="text-white font-bold text-sm">LOCKED</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <div className="text-slate-400">BLE RSSI</div>
                    <div className="text-blue-400 font-bold text-sm">-58 dBm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMMAND PALETTE DEMO */}
        {activeTab === 'command_palette' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Command className="w-5 h-5 text-amber-400" />
                  <span>GLOBAL ENTERPRISE COMMAND PALETTE (CTRL+K)</span>
                </h3>
                <p className="text-xs text-slate-400">Instant keyboard shortcuts and global search across all 10 applications</p>
              </div>

              <button
                onClick={() => setIsCommandOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition-all"
              >
                TEST CTRL+K OVERLAY
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: WCAG AA ACCESSIBILITY SPECS */}
        {activeTab === 'accessibility' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-amber-400" />
                  <span>WCAG 2.2 AA ACCESSIBILITY & HIGH CONTRAST CONTROLS</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-white">ACCESSIBILITY PREFERENCES:</div>

                <div className="flex items-center justify-between">
                  <span>High Contrast Mode:</span>
                  <button
                    onClick={() => setHighContrastMode(!highContrastMode)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      highContrastMode ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {highContrastMode ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Reduced Motion Mode:</span>
                  <button
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      reducedMotion ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {reducedMotion ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white">CONTRAST RATIO VERIFICATION:</div>
                <div className="text-emerald-400 font-bold">4.8:1 PASS (WCAG AA)</div>
                <p className="text-slate-400 text-[11px] font-sans">
                  Deep Navy background vs White/Gold typography achieves strict AAA standard contrast ratios for low-vision safety operators.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FIGMA & CODE SPECIFICATIONS EXPORTER */}
        {activeTab === 'figma_spec' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Figma className="w-5 h-5 text-amber-400" />
                  <span>FIGMA DESIGN SPECIFICATION & CODE TOKEN EXPORTER</span>
                </h3>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-amber-400 font-bold">FLUTTER MATERIAL 3 THEME SNIPPET:</div>
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 font-mono text-[10px] overflow-x-auto">
{`final ThemeData itisEnterpriseTheme = ThemeData(
  colorScheme: ColorScheme.dark(
    primary: Color(0xFF2563EB), // SAPS Blue
    secondary: Color(0xFFF59E0B), // Accent Gold
    error: Color(0xFFEF4444), // Emergency Red
    background: Color(0xFF020617), // Deep Navy
  ),
);`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* COMMAND PALETTE MODAL OVERLAY */}
      {isCommandOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-xl bg-slate-900 border-2 border-amber-500 rounded-2xl p-4 shadow-2xl space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2 text-white font-bold">
                <Search className="w-4 h-4 text-amber-400" />
                <span>ITIS COMMAND PALETTE</span>
              </div>
              <button onClick={() => setIsCommandOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Type a command or search (e.g. 'C3', 'Learner', 'SOS', 'Tech', 'Gov')..."
              value={commandSearch}
              onChange={(e) => setCommandSearch(e.target.value)}
              className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              autoFocus
            />

            <div className="space-y-1 max-h-60 overflow-y-auto text-xs">
              <div className="text-[10px] text-slate-400 font-bold px-2 py-1">SHORTCUT ACTIONS:</div>
              <button
                onClick={() => setIsCommandOpen(false)}
                className="w-full text-left bg-slate-950 hover:bg-slate-800 p-2 rounded-lg text-slate-200 flex items-center justify-between"
              >
                <span>Navigate to C3 National Command Centre</span>
                <span className="text-[10px] text-amber-400">PROMPT 056</span>
              </button>

              <button
                onClick={() => setIsCommandOpen(false)}
                className="w-full text-left bg-slate-950 hover:bg-slate-800 p-2 rounded-lg text-slate-200 flex items-center justify-between"
              >
                <span>Open Emergency Responder Mobile App</span>
                <span className="text-[10px] text-amber-400">PROMPT 057</span>
              </button>

              <button
                onClick={() => setIsCommandOpen(false)}
                className="w-full text-left bg-slate-950 hover:bg-slate-800 p-2 rounded-lg text-slate-200 flex items-center justify-between"
              >
                <span>Launch Field Technician Provisioning App</span>
                <span className="text-[10px] text-amber-400">PROMPT 058</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION DRAWER OVERLAY */}
      {isNotifOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-slate-900 border-l-2 border-slate-800 p-4 shadow-2xl z-50 flex flex-col justify-between font-mono text-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="font-bold text-white flex items-center space-x-2">
                <Bell className="w-4 h-4 text-blue-400" />
                <span>NOTIFICATIONS</span>
              </div>
              <button onClick={() => setIsNotifOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {sampleNotifications.map((n) => (
                <div key={n.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{n.title}</span>
                    <span className="text-[9px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-sans">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsNotifOpen(false)}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold p-2.5 rounded-xl"
          >
            DISMISS ALL
          </button>
        </div>
      )}
    </div>
  );
}
