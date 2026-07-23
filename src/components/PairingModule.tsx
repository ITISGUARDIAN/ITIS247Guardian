import React, { useState } from 'react';
import {
  Link2,
  ShieldCheck,
  QrCode,
  Key,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  XCircle,
  UserCheck,
  History,
  ArrowRightLeft,
  Lock,
  Cpu,
  FileCode,
  Copy,
  Check,
  Search,
  Filter,
  ShieldAlert,
  Sliders,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  User,
  School,
  Building,
  Radio,
  Clock,
  ExternalLink
} from 'lucide-react';
import {
  SAMPLE_PAIRINGS,
  SAMPLE_ASSIGNMENT_HISTORY,
  SAMPLE_REPLACEMENTS,
  SAMPLE_ACTIVATION_LOGS,
  PAIRING_SPEC_ITEMS,
  DevicePairingRecord,
  DeviceAssignmentHistory,
  DeviceReplacementHistory,
  DeviceActivationLog,
  PairingSpecItem
} from '../data/pairingModuleData';

export function PairingModule() {
  const [activeSubTab, setActiveSubTab] = useState<'pairings' | 'history' | 'replacements' | 'logs' | 'nestjs' | 'rules'>('pairings');
  const [pairings, setPairings] = useState<DevicePairingRecord[]>(SAMPLE_PAIRINGS);
  const [historyRecords, setHistoryRecords] = useState<DeviceAssignmentHistory[]>(SAMPLE_ASSIGNMENT_HISTORY);
  const [replacements, setReplacements] = useState<DeviceReplacementHistory[]>(SAMPLE_REPLACEMENTS);
  const [activationLogs, setActivationLogs] = useState<DeviceActivationLog[]>(SAMPLE_ACTIVATION_LOGS);

  const [selectedPairing, setSelectedPairing] = useState<DevicePairingRecord | null>(pairings[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [provinceFilter, setProvinceFilter] = useState<string>('ALL');

  const [selectedSpecId, setSelectedSpecId] = useState<number>(1);
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);

  // Modals
  const [isPairModalOpen, setIsPairModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);

  // New Pairing Form
  const [pairSerial, setPairSerial] = useState('');
  const [pairImei, setPairImei] = useState('');
  const [pairLearnerName, setPairLearnerName] = useState('');
  const [pairSchoolName, setPairSchoolName] = useState('');
  const [pairProvince, setPairProvince] = useState<'GAUTENG' | 'KWAZULU_NATAL' | 'WESTERN_CAPE' | 'EASTERN_CAPE' | 'LIMPOPO' | 'MPUMALANGA'>('GAUTENG');
  const [pairPin, setPairPin] = useState('849201');

  // Replacement Form
  const [replaceOldSerial, setReplaceOldSerial] = useState('ITIS-GPS-W901');
  const [replaceNewSerial, setReplaceNewSerial] = useState('ITIS-GPS-W909-NEW');
  const [replaceReason, setReplaceReason] = useState<'BATTERY_FAILURE' | 'LOST_DEVICE' | 'STOLEN_DEVICE' | 'HARDWARE_FAILURE' | 'WATER_DAMAGE' | 'ROUTINE_UPGRADE' | 'EMERGENCY_REPLACEMENT'>('BATTERY_FAILURE');
  const [transparentParent, setTransparentParent] = useState(true);

  // Activation Form
  const [actPin, setActPin] = useState('');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Create new device pairing
  const handleCreatePairing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pairSerial || !pairLearnerName) {
      alert('Serial Number and Learner Name are required.');
      return;
    }

    // Rule 1 check simulation: Learner already paired?
    const learnerExists = pairings.find(
      (p) => p.learnerName.toLowerCase() === pairLearnerName.toLowerCase() && p.pairingStatus !== 'UNPAIRED_ARCHIVED'
    );
    if (learnerExists) {
      alert(`Rule Violation (Rule 1): Learner '${pairLearnerName}' already has active device pairing '${learnerExists.serialNumber}'. Unpair first.`);
      return;
    }

    const newRecord: DevicePairingRecord = {
      id: `pair-uuid-2026-${Math.floor(100 + Math.random() * 900)}`,
      deviceId: `dev-uuid-9011-${Math.floor(100 + Math.random() * 900)}`,
      serialNumber: pairSerial.toUpperCase(),
      imei: pairImei || '869402059381' + Math.floor(100 + Math.random() * 900),
      learnerId: `itis-lrn-2026-${Math.floor(100 + Math.random() * 900)}`,
      learnerName: pairLearnerName,
      schoolId: `sch-${Math.floor(1000 + Math.random() * 9000)}`,
      schoolName: pairSchoolName || 'Soweto Central Primary School',
      province: pairProvince,
      pairingStatus: 'PENDING_ACTIVATION',
      activationPin: pairPin || '849201',
      qrCodeToken: `qr-itis-pair-${pairSerial}-${Date.now()}`,
      challengeNonce: `nonce-${Math.random().toString(36).substring(2, 10)}-2026`,
      mtlsCertFingerprint: `SHA256:${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      parentConfirmed: false,
      schoolVerified: true,
      schoolVerifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      pairedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      pairedByTechnicianId: 'tech-usr-007',
      pairedByTechnicianName: 'Sipho Ndlovu (Field Technician)',
    };

    setPairings([newRecord, ...pairings]);
    setSelectedPairing(newRecord);
    setIsPairModalOpen(false);
    setPairSerial('');
    setPairImei('');
    setPairLearnerName('');
    setPairSchoolName('');

    // Add activation log entry
    const newLog: DeviceActivationLog = {
      id: `act-log-${Date.now()}`,
      deviceId: newRecord.deviceId,
      serialNumber: newRecord.serialNumber,
      activationStep: 'PIN_ENTERED',
      resultStatus: 'SUCCESS',
      ipAddress: '102.132.191.12',
      gpsLocation: '-26.2580, 27.8572',
      certFingerprint: newRecord.mtlsCertFingerprint,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorRole: 'DEVICE_TECHNICIAN',
    };
    setActivationLogs([newLog, ...activationLogs]);

    showToast(`Device ${newRecord.serialNumber} successfully paired with Learner ${newRecord.learnerName} (PENDING_ACTIVATION)`);
  };

  // Activate pairing step
  const handleActivatePairing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPairing) return;

    if (actPin !== selectedPairing.activationPin) {
      alert(`Invalid Activation PIN! Expected PIN: ${selectedPairing.activationPin}`);
      return;
    }

    const updated = pairings.map((p) => {
      if (p.id === selectedPairing.id) {
        return {
          ...p,
          pairingStatus: 'ACTIVATED_PROTECTED' as const,
          parentConfirmed: true,
          parentConfirmedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
          schoolVerified: true,
          schoolVerifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        };
      }
      return p;
    });

    setPairings(updated);
    const refreshed = updated.find((p) => p.id === selectedPairing.id) || null;
    setSelectedPairing(refreshed);
    setIsActivateModalOpen(false);
    setActPin('');

    // Add history ledger record
    if (refreshed) {
      const newHist: DeviceAssignmentHistory = {
        id: `hist-${Date.now()}`,
        deviceId: refreshed.deviceId,
        serialNumber: refreshed.serialNumber,
        imei: refreshed.imei,
        learnerId: refreshed.learnerId,
        learnerName: refreshed.learnerName,
        schoolName: refreshed.schoolName,
        assignedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        assignedBy: 'Sipho Ndlovu (Field Technician)',
        activeFlag: true,
      };
      setHistoryRecords([newHist, ...historyRecords]);
    }

    showToast(`Pairing Activated! Protection Status transitioned to PROTECTED for learner ${selectedPairing.learnerName}.`);
  };

  // Replace wearable
  const handleReplaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const oldPair = pairings.find((p) => p.serialNumber === replaceOldSerial);
    if (!oldPair) {
      alert(`Device ${replaceOldSerial} not found in active fleet.`);
      return;
    }

    // Create replacement record
    const newReplacement: DeviceReplacementHistory = {
      id: `repl-2026-${Math.floor(100 + Math.random() * 900)}`,
      oldDeviceId: oldPair.deviceId,
      oldSerialNumber: oldPair.serialNumber,
      newDeviceId: `dev-uuid-9011-${Math.floor(100 + Math.random() * 900)}`,
      newSerialNumber: replaceNewSerial.toUpperCase(),
      learnerId: oldPair.learnerId,
      learnerName: oldPair.learnerName,
      replacementReason: replaceReason,
      transparentToParent: transparentParent,
      transferredTelemetryCount: 14820,
      replacedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      replacedBy: 'Sipho Ndlovu (Field Technician)',
    };

    setReplacements([newReplacement, ...replacements]);

    // Update pairings: archive old, insert new
    const updatedPairings = pairings.map((p) => {
      if (p.id === oldPair.id) {
        return {
          ...p,
          pairingStatus: 'UNPAIRED_ARCHIVED' as const,
        };
      }
      return p;
    });

    const newPairing: DevicePairingRecord = {
      ...oldPair,
      id: `pair-uuid-2026-${Math.floor(100 + Math.random() * 900)}`,
      deviceId: newReplacement.newDeviceId,
      serialNumber: replaceNewSerial.toUpperCase(),
      pairingStatus: 'ACTIVATED_PROTECTED',
      pairedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    setPairings([newPairing, ...updatedPairings]);
    setSelectedPairing(newPairing);
    setIsReplaceModalOpen(false);

    showToast(`Device ${replaceOldSerial} replaced with ${replaceNewSerial} for ${oldPair.learnerName}. Assignment history updated!`);
  };

  const filteredPairings = pairings.filter((p) => {
    const matchesSearch =
      p.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.learnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.imei.includes(searchQuery);

    const matchesStatus = statusFilter === 'ALL' || p.pairingStatus === statusFilter;
    const matchesProvince = provinceFilter === 'ALL' || p.province === provinceFilter;

    return matchesSearch && matchesStatus && matchesProvince;
  });

  const activeSpec = PAIRING_SPEC_ITEMS.find((s) => s.id === selectedSpecId) || PAIRING_SPEC_ITEMS[0];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-400/40 backdrop-blur-md flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/50 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" /> PROMPT 022
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 1:1 Learner-Device Binding & mTLS
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Device Pairing, Activation & Lifecycle Management Module
            </h1>
            <p className="text-slate-300 max-w-3xl text-sm leading-relaxed">
              Authoritative pairing engine binding ITIS wearable GPS devices to protected learners. Enforces 1:1 strict dual-binding rules, mTLS X.509 challenge-response activation, multi-step verification, transparent replacement telemetry linkage, and immutable hardware assignment history.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPairModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Link2 className="w-4 h-4" />
              <span>Initiate Pairing</span>
            </button>
            <button
              onClick={() => setIsReplaceModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-all active:scale-95"
            >
              <ArrowRightLeft className="w-4 h-4 text-amber-400" />
              <span>Emergency Swap</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Active Protected Pairings</div>
            <div className="text-xl font-bold text-emerald-400 mt-1 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              {pairings.filter((p) => p.pairingStatus === 'ACTIVATED_PROTECTED').length} Devices
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Pending Verification</div>
            <div className="text-xl font-bold text-amber-400 mt-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              {pairings.filter((p) => p.pairingStatus === 'PENDING_ACTIVATION').length} Devices
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Assignment History Ledger</div>
            <div className="text-xl font-bold text-indigo-400 mt-1 flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              {historyRecords.length} Immutable Logs
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Hardware Replacements</div>
            <div className="text-xl font-bold text-cyan-400 mt-1 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-cyan-400" />
              {replacements.length} Swaps Recorded
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center space-x-1 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('pairings')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'pairings'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>Device Pairings Registry</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'history'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Immutable Assignment History</span>
        </button>

        <button
          onClick={() => setActiveSubTab('replacements')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'replacements'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Emergency Replacement Ledger</span>
        </button>

        <button
          onClick={() => setActiveSubTab('logs')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'logs'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>mTLS Security & Activation Logs</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rules')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'rules'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Critical ITIS Rules (1-6)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nestjs')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'nestjs'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span>NestJS Engineering Specs</span>
        </button>
      </div>

      {/* SUBTAB 1: DEVICE PAIRINGS REGISTRY */}
      {activeSubTab === 'pairings' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search serial, learner, IMEI, school..."
                className="w-full bg-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-4 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none"
                >
                  <option value="ALL">All Pairing Statuses</option>
                  <option value="ACTIVATED_PROTECTED">Activated & Protected</option>
                  <option value="PENDING_ACTIVATION">Pending Activation</option>
                  <option value="FAILED_VALIDATION">Failed Validation</option>
                  <option value="UNPAIRED_ARCHIVED">Unpaired / Archived</option>
                </select>
              </div>

              <select
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                className="bg-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none"
              >
                <option value="ALL">All Provinces</option>
                <option value="GAUTENG">Gauteng</option>
                <option value="KWAZULU_NATAL">KwaZulu-Natal</option>
                <option value="WESTERN_CAPE">Western Cape</option>
                <option value="EASTERN_CAPE">Eastern Cape</option>
              </select>
            </div>
          </div>

          {/* Master Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Pairings List */}
            <div className="lg:col-span-5 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {filteredPairings.map((p) => {
                const isSelected = selectedPairing?.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPairing(p)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-indigo-400">{p.serialNumber}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              p.pairingStatus === 'ACTIVATED_PROTECTED'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : p.pairingStatus === 'PENDING_ACTIVATION'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {p.pairingStatus}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {p.learnerName}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                          <School className="w-3 h-3 text-slate-500" />
                          {p.schoolName}
                        </p>
                      </div>

                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-indigo-400 translate-x-1' : 'text-slate-600'}`} />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-800">
                      <span>IMEI: {p.imei}</span>
                      <span className="font-mono text-indigo-300">PIN: {p.activationPin}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Pairing Detailed Inspector */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              {selectedPairing ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-indigo-400">{selectedPairing.serialNumber}</span>
                        <span className="text-xs text-slate-400">• IMEI: {selectedPairing.imei}</span>
                      </div>
                      <h2 className="text-xl font-extrabold text-white mt-0.5">{selectedPairing.learnerName}</h2>
                      <p className="text-xs text-slate-400 mt-1">{selectedPairing.schoolName} ({selectedPairing.province})</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {selectedPairing.pairingStatus === 'PENDING_ACTIVATION' && (
                        <button
                          onClick={() => setIsActivateModalOpen(true)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Activate Pairing</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Pairing Verification Checklist */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" /> Multi-Step Verification & Binding Pipeline
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">Parent Confirmation</span>
                          <span className="text-[11px] text-slate-400">
                            {selectedPairing.parentConfirmed ? `Verified at ${selectedPairing.parentConfirmedAt}` : 'Awaiting parent OTP confirmation'}
                          </span>
                        </div>
                        {selectedPairing.parentConfirmed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-400" />
                        )}
                      </div>

                      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">School Admin Verification</span>
                          <span className="text-[11px] text-slate-400">
                            {selectedPairing.schoolVerified ? `Verified at ${selectedPairing.schoolVerifiedAt}` : 'Awaiting school admin match'}
                          </span>
                        </div>
                        {selectedPairing.schoolVerified ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Security & Token Info */}
                  <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                    <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
                      <span className="text-indigo-400 font-bold">QR Code Token:</span>
                      <span className="text-slate-200 truncate max-w-[280px]">{selectedPairing.qrCodeToken}</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
                      <span className="text-cyan-400 font-bold">Challenge Nonce:</span>
                      <span className="text-slate-200">{selectedPairing.challengeNonce}</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-400">
                      <span className="text-emerald-400 font-bold">mTLS Cert Fingerprint:</span>
                      <span className="text-slate-300 truncate max-w-[260px]">{selectedPairing.mtlsCertFingerprint}</span>
                    </div>
                  </div>

                  {/* Technician Meta */}
                  <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span>Paired by: <strong className="text-slate-200">{selectedPairing.pairedByTechnicianName}</strong></span>
                    <span>Timestamp: <strong className="text-slate-200">{selectedPairing.pairedAt}</strong></span>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-slate-500 text-xs">Select a pairing record from the list to inspect.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: IMMUTABLE ASSIGNMENT HISTORY LEDGER */}
      {activeSubTab === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" /> Immutable Hardware Assignment History Ledger (Rules 3 & 4)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Every learner-device assignment is logged immutably. Device replacements, upgrades, or deactivations never overwrite historical safety logs.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                  <th className="p-3 font-bold uppercase">Learner Name</th>
                  <th className="p-3 font-bold uppercase">Serial Number</th>
                  <th className="p-3 font-bold uppercase">IMEI</th>
                  <th className="p-3 font-bold uppercase">School</th>
                  <th className="p-3 font-bold uppercase">Assigned At</th>
                  <th className="p-3 font-bold uppercase">Unassigned At / Reason</th>
                  <th className="p-3 font-bold uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {historyRecords.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white">{h.learnerName}</td>
                    <td className="p-3 font-mono text-indigo-400 font-bold">{h.serialNumber}</td>
                    <td className="p-3 font-mono text-slate-400">{h.imei}</td>
                    <td className="p-3 text-slate-300">{h.schoolName}</td>
                    <td className="p-3 text-slate-400">{h.assignedAt}</td>
                    <td className="p-3 text-slate-400">
                      {h.unassignedAt ? (
                        <span className="text-amber-300">
                          {h.unassignedAt} ({h.unassignReason})
                        </span>
                      ) : (
                        <span className="text-slate-500">N/A (Currently Active)</span>
                      )}
                    </td>
                    <td className="p-3">
                      {h.activeFlag ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          ACTIVE ASSIGNMENT
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                          ARCHIVED
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: EMERGENCY REPLACEMENT LEDGER */}
      {activeSubTab === 'replacements' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-cyan-400" /> Wearable Hardware Replacement & Telemetry Continuity
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Emergency or routine hardware upgrades maintain transparent linkage to historical telemetry counts without parent friction.
              </p>
            </div>

            <button
              onClick={() => setIsReplaceModalOpen(true)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              + Record Device Replacement
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {replacements.map((r) => (
              <div key={r.id} className="p-5 bg-slate-800/40 rounded-2xl border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{r.id}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{r.learnerName}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {r.replacementReason}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Retired Device</span>
                    <span className="font-mono text-red-400 font-bold">{r.oldSerialNumber}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">New Wearable</span>
                    <span className="font-mono text-emerald-400 font-bold">{r.newSerialNumber}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Telemetry Packets Retained: <strong className="text-white font-mono">{r.transferredTelemetryCount.toLocaleString()}</strong></span>
                  <span>Parent Transparent: <strong className="text-emerald-400">{r.transparentToParent ? 'YES' : 'NO'}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: mTLS SECURITY LOGS */}
      {activeSubTab === 'logs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" /> mTLS X.509 Activation Audit Logs
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Cryptographic audit logs for every activation step, X.509 certificate check, and field technician interaction.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                  <th className="p-3 font-bold uppercase">Timestamp</th>
                  <th className="p-3 font-bold uppercase">Device Serial</th>
                  <th className="p-3 font-bold uppercase">Activation Step</th>
                  <th className="p-3 font-bold uppercase">Actor Role</th>
                  <th className="p-3 font-bold uppercase">IP / Location</th>
                  <th className="p-3 font-bold uppercase">Cert Fingerprint</th>
                  <th className="p-3 font-bold uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {activationLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                    <td className="p-3 font-mono text-indigo-400 font-bold">{log.serialNumber}</td>
                    <td className="p-3 font-bold text-white">{log.activationStep}</td>
                    <td className="p-3 text-slate-300">{log.actorRole}</td>
                    <td className="p-3 text-slate-400">{log.ipAddress} ({log.gpsLocation || 'N/A'})</td>
                    <td className="p-3 font-mono text-slate-500 truncate max-w-[150px]">{log.certFingerprint}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {log.resultStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 5: CRITICAL ITIS RULES */}
      {activeSubTab === 'rules' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Mandatory ITIS Platform Rules (1 – 6)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Architectural constraints hardcoded into the Pairing Engine to guarantee zero telemetry leakage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">RULE 1</span>
                <h3 className="text-sm font-bold text-white">One Learner ↔ One Active Wearable</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A learner can never be simultaneously paired with two active wearable devices. Existing pairings must be unpaired or replaced before a new device is bound.
              </p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">RULE 2</span>
                <h3 className="text-sm font-bold text-white">One Wearable ↔ One Learner</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A physical wearable device can never be assigned to more than one learner at any given time. Multi-assignment is strictly forbidden at DB constraint level.
              </p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">RULE 3</span>
                <h3 className="text-sm font-bold text-white">Historical Assignments are Immutable</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Past hardware assignments in <code className="text-indigo-300">device_assignment_history</code> are permanent. Rows can never be DELETED or overwritten.
              </p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">RULE 4</span>
                <h3 className="text-sm font-bold text-white">Replacing Wearable Never Deletes History</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hardware replacements unassign the old wearable, assign the new wearable, and log the reason while keeping all prior telemetry linked.
              </p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">RULE 5</span>
                <h3 className="text-sm font-bold text-white">Automatic Protection Status Transition</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upon successful multi-step activation, the Learner Digital Safety Profile automatically transitions from <code className="text-amber-300">UNPROTECTED</code> to <code className="text-emerald-300">PROTECTED</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">RULE 6</span>
                <h3 className="text-sm font-bold text-white">Automatic Initial Health Snapshot Creation</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Initiating a device pairing automatically creates an initial <code className="text-cyan-300">DeviceHealthLog</code> snapshot capturing baseline battery, RSSI, GNSS, and temperature.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 6: NESTJS ENGINEERING SPECS */}
      {activeSubTab === 'nestjs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-2">Engineering Specs:</span>
            {PAIRING_SPEC_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSpecId(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                  selectedSpecId === item.id
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{item.title}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </div>
                <span className="text-[10px] opacity-75 font-mono block mt-1">{item.filename}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400">{activeSpec.category}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{activeSpec.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{activeSpec.description}</p>
              </div>

              <button
                onClick={() => handleCopyCode(activeSpec.id, activeSpec.code)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
              >
                {copiedCodeId === activeSpec.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === activeSpec.id ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-[500px]">
              <pre>{activeSpec.code}</pre>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: PAIRING INITIATION */}
      {isPairModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Link2 className="w-5 h-5 text-indigo-400" /> Initiate Device Pairing
              </h3>
              <button onClick={() => setIsPairModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreatePairing} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Wearable Serial Number *</label>
                <input
                  type="text"
                  required
                  value={pairSerial}
                  onChange={(e) => setPairSerial(e.target.value)}
                  placeholder="e.g. ITIS-GPS-W908"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Device IMEI (15 digits)</label>
                <input
                  type="text"
                  value={pairImei}
                  onChange={(e) => setPairImei(e.target.value)}
                  placeholder="e.g. 869402059381555"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Learner Full Name *</label>
                <input
                  type="text"
                  required
                  value={pairLearnerName}
                  onChange={(e) => setPairLearnerName(e.target.value)}
                  placeholder="e.g. Sipho Sithole"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">School Name</label>
                <input
                  type="text"
                  value={pairSchoolName}
                  onChange={(e) => setPairSchoolName(e.target.value)}
                  placeholder="e.g. Soweto Central Primary School"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Province</label>
                  <select
                    value={pairProvince}
                    onChange={(e: any) => setPairProvince(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none"
                  >
                    <option value="GAUTENG">Gauteng</option>
                    <option value="KWAZULU_NATAL">KwaZulu-Natal</option>
                    <option value="WESTERN_CAPE">Western Cape</option>
                    <option value="EASTERN_CAPE">Eastern Cape</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Activation PIN (6 digits)</label>
                  <input
                    type="text"
                    value={pairPin}
                    onChange={(e) => setPairPin(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsPairModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
                >
                  Initiate Pairing Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PAIRING ACTIVATION */}
      {isActivateModalOpen && selectedPairing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Activate Wearable Pairing
              </h3>
              <button onClick={() => setIsActivateModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div><span className="text-slate-400">Device Serial:</span> <strong className="text-indigo-400 font-mono">{selectedPairing.serialNumber}</strong></div>
              <div><span className="text-slate-400">Protected Learner:</span> <strong className="text-white">{selectedPairing.learnerName}</strong></div>
              <div><span className="text-slate-400">Required PIN:</span> <strong className="text-emerald-400 font-mono">{selectedPairing.activationPin}</strong></div>
            </div>

            <form onSubmit={handleActivatePairing} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Enter 6-Digit Activation PIN</label>
                <input
                  type="text"
                  required
                  value={actPin}
                  onChange={(e) => setActPin(e.target.value)}
                  placeholder="e.g. 849201"
                  className="w-full bg-slate-800 border border-slate-700 text-white font-mono text-center text-base rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsActivateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-600/30"
                >
                  Confirm & Activate Protection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EMERGENCY REPLACEMENT */}
      {isReplaceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-cyan-400" /> Emergency Device Replacement
              </h3>
              <button onClick={() => setIsReplaceModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleReplaceSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Select Old Device Serial to Retire</label>
                <select
                  value={replaceOldSerial}
                  onChange={(e) => setReplaceOldSerial(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none"
                >
                  {pairings.filter((p) => p.pairingStatus === 'ACTIVATED_PROTECTED').map((p) => (
                    <option key={p.id} value={p.serialNumber}>
                      {p.serialNumber} - {p.learnerName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">New Wearable Serial Number *</label>
                <input
                  type="text"
                  required
                  value={replaceNewSerial}
                  onChange={(e) => setReplaceNewSerial(e.target.value)}
                  placeholder="e.g. ITIS-GPS-W909-NEW"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Replacement Reason</label>
                <select
                  value={replaceReason}
                  onChange={(e: any) => setReplaceReason(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="BATTERY_FAILURE">Battery Failure</option>
                  <option value="LOST_DEVICE">Lost Device</option>
                  <option value="STOLEN_DEVICE">Stolen Device</option>
                  <option value="HARDWARE_FAILURE">Hardware / Sensor Failure</option>
                  <option value="WATER_DAMAGE">Water Damage</option>
                  <option value="ROUTINE_UPGRADE">Routine Upgrade</option>
                  <option value="EMERGENCY_REPLACEMENT">Emergency Swap</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="transparent"
                  checked={transparentParent}
                  onChange={(e) => setTransparentParent(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="transparent" className="text-slate-300">
                  Transparent to Parent (Preserves telemetry history without re-onboarding)
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsReplaceModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 shadow-lg shadow-cyan-600/30"
                >
                  Execute Hardware Swap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
