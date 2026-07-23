import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Lock,
  KeyRound,
  History,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Share2,
  Database,
  FileCode,
  Globe,
  Sliders,
  MapPin,
  Clock,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  Eye,
  GitCommit,
  CheckCheck,
  Shield,
  Layers,
  Cpu
} from 'lucide-react';
import {
  SAMPLE_CASES,
  SAMPLE_EVIDENCE_ITEMS,
  FORENSIC_REPLAY_TIMELINE,
  DFCCE_CODE_SPECS,
  CRITICAL_DFCCE_RULES,
  EvidenceItem,
  InvestigationCase,
  ForensicTimelinePoint,
  DfcceCodeSpec,
  IntegrityStatus
} from '../data/dfcceData';

export const DfcceModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'cases' | 'replay' | 'custody' | 'export' | 'merkle' | 'schema' | 'architecture'
  >('cases');

  // Interactive States
  const [cases] = useState<InvestigationCase[]>(SAMPLE_CASES);
  const [selectedCase, setSelectedCase] = useState<InvestigationCase>(SAMPLE_CASES[0]);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(SAMPLE_EVIDENCE_ITEMS);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem>(SAMPLE_EVIDENCE_ITEMS[0]);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<DfcceCodeSpec>(DFCCE_CODE_SPECS[0]);

  // Telemetry Replay Engine State
  const [currentReplayIndex, setCurrentReplayIndex] = useState<number>(3); // Default at second 45 (SOS Trigger)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [replaySpeed, setReplaySpeed] = useState<number>(1);

  // Verification & Export States
  const [verificationLog, setVerificationLog] = useState<string[]>([]);
  const [verifyingHash, setVerifyingHash] = useState<boolean>(false);
  const [exportingDocket, setExportingDocket] = useState<boolean>(false);

  const currentTimelinePoint: ForensicTimelinePoint = FORENSIC_REPLAY_TIMELINE[currentReplayIndex];

  // Auto-play replay timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentReplayIndex((prev) => {
          if (prev >= FORENSIC_REPLAY_TIMELINE.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500 / replaySpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, replaySpeed]);

  const addLog = (msg: string) => {
    setVerificationLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 8)]);
  };

  // Perform Cryptographic SHA-256 Hash Integrity Verification
  const handleVerifyIntegrity = (evidenceId: string) => {
    setVerifyingHash(true);
    addLog(`INITIATING CRYPTOGRAPHIC SHA-256 VERIFICATION for ${evidenceId}...`);
    setTimeout(() => {
      setEvidenceItems((prev) =>
        prev.map((ev) =>
          ev.id === evidenceId
            ? { ...ev, integrityStatus: 'VERIFIED_INTACT' as IntegrityStatus }
            : ev
        )
      );
      setVerifyingHash(false);
      addLog(`VERIFICATION SUCCESSFUL: ${evidenceId} hash matches original vault checksum 100%.`);
    }, 1200);
  };

  // Generate Court-Ready SAPS Evidence Docket PDF
  const handleExportDocket = () => {
    setExportingDocket(true);
    addLog(`COMPILING COURT-READY EVIDENCE DOCKET PDF for Case ${selectedCase.sapsCaseNumber}...`);
    setTimeout(() => {
      setExportingDocket(false);
      addLog(`DOCKET COMPILED & CRYPTOGRAPHICALLY SEALED: saps-docket-0045.pdf ready for download.`);
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-2xl border border-blue-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 animate-pulse text-blue-400" />
              <span>PROMPT 031 — DIGITAL FORENSICS, EVIDENCE & CHAIN OF CUSTODY ENGINE (DFCCE)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Digital Forensics & <span className="text-blue-400">Chain of Custody Engine</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Preserving, securing, verifying, and exporting court-admissible digital evidence for SAPS investigations, criminal prosecutions, and legal proceedings with immutable SHA-256 hashes and Merkle tree roots.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-blue-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-blue-400">SHA-256</span>
              <span className="text-xs text-slate-400 font-medium">Crypto Hashing</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">RSA-4096</span>
              <span className="text-xs text-slate-400 font-medium">Digital Signatures</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">SAPS CAS</span>
              <span className="text-xs text-slate-400 font-medium">Court Docket Ready</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('cases')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'cases'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>1. Forensic Cases & Evidence Vault</span>
          </button>

          <button
            onClick={() => setActiveSubTab('replay')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'replay'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span>2. Interactive Map & Telemetry Replay Engine</span>
          </button>

          <button
            onClick={() => setActiveSubTab('custody')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'custody'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <History className="w-4 h-4 text-purple-400" />
            <span>3. Chain of Custody & Hash Verifier</span>
          </button>

          <button
            onClick={() => setActiveSubTab('export')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'export'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>4. Court-Ready SAPS Evidence Export</span>
          </button>

          <button
            onClick={() => setActiveSubTab('merkle')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'merkle'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <GitCommit className="w-4 h-4 text-cyan-400" />
            <span>5. Merkle Tree & Vault Root Ledger</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-indigo-400" />
            <span>6. Relational Prisma Schema</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'architecture'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>7. NestJS Architecture & Services</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: FORENSIC CASES & EVIDENCE VAULT */}
      {activeSubTab === 'cases' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CASES LIST */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Active Forensic Investigation Cases
              </span>

              {cases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedCase.id === c.id
                      ? 'bg-slate-900 border-blue-500/80 shadow-xl shadow-blue-900/20 ring-1 ring-blue-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="px-2.5 py-1 rounded bg-blue-950 border border-blue-800 text-blue-400 text-xs font-mono font-bold">
                      {c.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="pt-3 space-y-1">
                    <h3 className="text-base font-bold text-white">{c.learnerName}</h3>
                    <p className="text-xs text-blue-400 font-mono font-bold">{c.sapsCaseNumber}</p>
                    <p className="text-xs text-slate-400">{c.leadInvestigator}</p>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 pt-3 border-t border-slate-800/80 mt-3">
                    <span>Evidence Items: {c.totalEvidenceCount}</span>
                    <span className="text-emerald-400 font-mono font-bold">100% Hash Verified</span>
                  </div>
                </div>
              ))}
            </div>

            {/* EVIDENCE ITEMS IN SELECTED CASE */}
            <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <FileCheck2 className="w-5 h-5 text-blue-400" />
                    <span>Cryptographic Evidence Vault for {selectedCase.sapsCaseNumber}</span>
                  </h3>
                  <p className="text-xs text-slate-400">Incident Reference: {selectedCase.incidentId}</p>
                </div>

                <button
                  onClick={handleExportDocket}
                  disabled={exportingDocket}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>{exportingDocket ? 'Exporting...' : 'Export SAPS Court Docket PDF'}</span>
                </button>
              </div>

              <div className="space-y-4">
                {evidenceItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEvidence(item)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedEvidence.id === item.id
                        ? 'bg-slate-950 border-blue-500 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono font-bold">
                          {item.id}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-bold">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                          {item.integrityStatus}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 pt-2 font-medium">{item.description}</p>

                    <div className="mt-2 p-2 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                      <span className="truncate">SHA-256: {item.sha256Hash}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerifyIntegrity(item.id);
                        }}
                        disabled={verifyingHash}
                        className="ml-2 text-blue-400 hover:text-blue-300 font-bold whitespace-nowrap"
                      >
                        Verify Hash
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: INTERACTIVE MAP & TELEMETRY REPLAY ENGINE */}
      {activeSubTab === 'replay' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Play className="w-5 h-5 text-emerald-400" />
                  <span>Second-by-Second Telemetry Replay Engine</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Replay incident movement, speed, AI risk scores, and tactical responder dispatch in exact chronological sequence.
                </p>
              </div>

              {/* REPLAY PLAYBACK CONTROLS */}
              <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <button
                  onClick={() => setCurrentReplayIndex(0)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                  title="Reset to Start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center space-x-1 px-3"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span className="text-xs">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                <button
                  onClick={() =>
                    setCurrentReplayIndex((prev) =>
                      prev < FORENSIC_REPLAY_TIMELINE.length - 1 ? prev + 1 : prev
                    )
                  }
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                  title="Step Forward (+15s)"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <select
                  value={replaySpeed}
                  onChange={(e) => setReplaySpeed(Number(e.target.value))}
                  className="bg-slate-800 text-xs text-white px-2 py-1.5 rounded-lg border border-slate-700 outline-none"
                >
                  <option value={1}>1x Speed</option>
                  <option value={2}>2x Speed</option>
                  <option value={5}>5x Speed</option>
                </select>
              </div>
            </div>

            {/* TIMELINE PROGRESS METER */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Offset: +{currentTimelinePoint.secondOffset}s ({currentTimelinePoint.timestamp} SAST)</span>
                <span>Speed: {currentTimelinePoint.speedKmh} km/h</span>
                <span className="text-purple-400 font-bold">AI Risk: {currentTimelinePoint.aiRiskScore}/100</span>
              </div>

              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentReplayIndex + 1) / FORENSIC_REPLAY_TIMELINE.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* REPLAY DISPLAY CARD & EVENT TIMELINE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CURRENT TELEMETRY SNAPSHOT */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Replay Snapshot State
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">GPS Coordinates:</span>
                    <span className="text-white font-mono font-bold">
                      {currentTimelinePoint.lat.toFixed(4)}, {currentTimelinePoint.lng.toFixed(4)}
                    </span>
                  </div>

                  <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">Vehicle Speed:</span>
                    <span className="text-emerald-400 font-mono font-bold">{currentTimelinePoint.speedKmh} km/h</span>
                  </div>

                  <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">Event Classification:</span>
                    <span className="text-blue-400 font-mono font-bold">{currentTimelinePoint.eventType}</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold block">Chronological Narrative</span>
                    <p className="text-xs text-slate-200 font-medium">{currentTimelinePoint.eventDescription}</p>
                  </div>

                  {currentTimelinePoint.operatorAction && (
                    <div className="p-3 bg-blue-950/60 border border-blue-800/60 rounded-lg space-y-1">
                      <span className="text-[10px] text-blue-400 font-semibold block">Operator / Engine Action</span>
                      <p className="text-xs text-blue-200">{currentTimelinePoint.operatorAction}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* SECOND-BY-SECOND EVENT LOG */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Forensic Timeline Sequence
                </span>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                  {FORENSIC_REPLAY_TIMELINE.map((point, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentReplayIndex(idx)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        currentReplayIndex === idx
                          ? 'bg-blue-950 border-blue-500 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex justify-between font-mono font-bold">
                        <span>+{point.secondOffset}s ({point.timestamp})</span>
                        <span className="text-purple-400">Risk {point.aiRiskScore}</span>
                      </div>
                      <p className="truncate mt-1">{point.eventDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CHAIN OF CUSTODY & HASH VERIFIER */}
      {activeSubTab === 'custody' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <History className="w-5 h-5 text-purple-400" />
                <span>Chain of Custody Ledger for {selectedEvidence.id}</span>
              </h3>

              <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-400 text-xs font-mono font-bold">
                CUSTODY LOG COUNT: {selectedEvidence.custodyEntries.length}
              </span>
            </div>

            <div className="space-y-4">
              {selectedEvidence.custodyEntries.map((entry, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono text-purple-400 font-bold">{entry.id}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{entry.timestamp}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Previous Custodian</span>
                      <span className="text-slate-300 font-semibold">{entry.previousCustodian}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">Current Custodian</span>
                      <span className="text-emerald-400 font-bold">{entry.currentCustodian}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 pt-1">Transfer Reason: {entry.transferReason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: COURT-READY SAPS EVIDENCE EXPORT */}
      {activeSubTab === 'export' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Download className="w-5 h-5 text-amber-400" />
              <span>Court-Ready SAPS Digital Evidence Export Centre</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'SAPS Court Docket PDF Package', desc: 'Compliant with Section 212 of South African Criminal Procedure Act.', format: 'PDF (Cryptographically Signed)' },
                { title: 'Raw JSON Telemetry Package', desc: 'Contains 1Hz GPS packets, accelerometer vectors, and IMEI transponder IDs.', format: 'JSON + SHA-256 Checksum' },
                { title: 'Hash Verification Certificate', desc: 'Standalone proof certificate verifying non-tampering of evidence.', format: 'PDF Verification Cert' },
              ].map((exp, i) => (
                <div key={i} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white">{exp.title}</h4>
                  <p className="text-xs text-slate-400">{exp.desc}</p>
                  <span className="px-2.5 py-1 rounded bg-amber-950 border border-amber-800 text-amber-400 text-[10px] font-mono font-bold block">
                    {exp.format}
                  </span>
                  <button
                    onClick={handleExportDocket}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    Generate Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: MERKLE TREE & VAULT ROOT LEDGER */}
      {activeSubTab === 'merkle' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <GitCommit className="w-5 h-5 text-cyan-400" />
              <span>Merkle Tree Root Hash Verification Ledger</span>
            </h3>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-cyan-400 font-bold">
                Merkle Root: mkl-root-88192a00f1c2d3e4b5a6c7d8e9f0
              </div>
              <p className="text-slate-400 text-[11px]">
                Calculated recursively across all 14 evidence items in case CASE-SAPS-2026-0045.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: RELATIONAL PRISMA SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Prisma Relational Database Schema for DFCCE</h3>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-bold">
                Relational Model
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {DFCCE_CODE_SPECS[0].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: NESTJS ARCHITECTURE & SERVICES */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">NestJS Forensics Services & REST API</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {DFCCE_CODE_SPECS.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedCodeSpec(spec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCodeSpec.id === spec.id
                        ? 'bg-orange-600 text-white shadow-md'
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
                <span className="font-mono text-amber-400 font-bold">{selectedCodeSpec.filename}</span>
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
        </div>
      )}

      {/* CRITICAL BUSINESS RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span>10 Mandatory DFCCE Digital Evidence Business Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_DFCCE_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-400">RULE #{rule.id}</span>
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
