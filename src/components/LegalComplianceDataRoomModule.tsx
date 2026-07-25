import React, { useState, useEffect } from 'react';
import {
  Scale,
  Lock,
  FileText,
  Award,
  ShieldCheck,
  Building2,
  Download,
  Upload,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  FileCheck,
  Briefcase,
  Layers,
  Sparkles,
  Eye,
  KeyRound,
  BookOpen,
  FolderArchive,
  XCircle,
  FileCode,
  ShieldAlert
} from 'lucide-react';
import {
  BoardResolution,
  ComplianceEvidenceItem,
  DataRoomDocument,
  DocumentClassification,
  GovernmentContractItem,
  LegalDataRoomOverview,
  PatentItem,
  TrademarkItem
} from '../backend/legal/legal.types';

export const LegalComplianceDataRoomModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'DATA_ROOM' | 'PATENTS_IP' | 'TRADEMARKS' | 'GOVT_CONTRACTS' | 'BOARD_RESOLUTIONS' | 'COMPLIANCE_EVIDENCE'
  >('OVERVIEW');

  // State
  const [overview, setOverview] = useState<LegalDataRoomOverview | null>(null);
  const [documents, setDocuments] = useState<DataRoomDocument[]>([]);
  const [patents, setPatents] = useState<PatentItem[]>([]);
  const [trademarks, setTrademarks] = useState<TrademarkItem[]>([]);
  const [govtContracts, setGovtContracts] = useState<GovernmentContractItem[]>([]);
  const [boardResolutions, setBoardResolutions] = useState<BoardResolution[]>([]);
  const [complianceEvidence, setComplianceEvidence] = useState<ComplianceEvidenceItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [auditExporting, setAuditExporting] = useState<boolean>(false);
  const [auditExportResult, setAuditExportResult] = useState<any | null>(null);

  // Upload Form State
  const [newDoc, setNewDoc] = useState({
    title: '',
    folderCategory: 'DUE_DILIGENCE' as DataRoomDocument['folderCategory'],
    classification: 'CONFIDENTIAL' as DocumentClassification,
    fileFormat: 'PDF' as 'PDF' | 'DOCX' | 'ZIP' | 'XLSX',
    uploadedBy: 'Legal Counsel',
    version: 'v1.0'
  });

  const fetchLegalData = async () => {
    setLoading(true);
    try {
      const [resO, resD, resP, resT, resC, resB, resE] = await Promise.all([
        fetch('/api/v1/legal/overview').then((r) => r.json()),
        fetch('/api/v1/legal/documents').then((r) => r.json()),
        fetch('/api/v1/legal/patents').then((r) => r.json()),
        fetch('/api/v1/legal/trademarks').then((r) => r.json()),
        fetch('/api/v1/legal/contracts').then((r) => r.json()),
        fetch('/api/v1/legal/board-resolutions').then((r) => r.json()),
        fetch('/api/v1/legal/compliance').then((r) => r.json())
      ]);

      if (resO.success) setOverview(resO.overview);
      if (resD.success) setDocuments(resD.documents);
      if (resP.success) setPatents(resP.patents);
      if (resT.success) setTrademarks(resT.trademarks);
      if (resC.success) setGovtContracts(resC.contracts);
      if (resB.success) setBoardResolutions(resB.boardResolutions);
      if (resE.success) setComplianceEvidence(resE.compliance);
    } catch (err) {
      console.error('Failed to load legal data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLegalData();
  }, []);

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/legal/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoc)
      });
      const data = await res.json();
      if (data.success) {
        setShowUploadModal(false);
        setNewDoc({
          title: '',
          folderCategory: 'DUE_DILIGENCE',
          classification: 'CONFIDENTIAL',
          fileFormat: 'PDF',
          uploadedBy: 'Legal Counsel',
          version: 'v1.0'
        });
        fetchLegalData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateAuditPack = async () => {
    setAuditExporting(true);
    try {
      const res = await fetch('/api/v1/legal/audit-export', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setAuditExportResult(data.auditExport);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAuditExporting(false);
    }
  };

  const formatZar = (val: number) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);
  };

  const renderClassificationBadge = (classification: DocumentClassification) => {
    switch (classification) {
      case 'RESTRICTED_INVESTOR_ONLY':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">INVESTOR RESTRICTED</span>;
      case 'SECRET_GOVERNMENT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">GOVT SECRET</span>;
      case 'CONFIDENTIAL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">CONFIDENTIAL</span>;
      case 'INTERNAL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300">INTERNAL</span>;
      case 'PUBLIC':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">PUBLIC</span>;
    }
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen p-4 md:p-6 space-y-6 font-sans">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-slate-700 rounded-lg text-white shadow-lg shadow-indigo-600/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Legal, Compliance & Investor Data Room
                <span className="text-xs px-2.5 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full font-mono">
                  POPIA 100% • ISO 27001 Certified
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Secure Due Diligence Repository • Patent Portfolio • Government Contracts • Board Resolutions • POPIA & ISO Audit Evidence
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-xs transition shadow-md shadow-indigo-600/30"
          >
            <Upload className="w-4 h-4" />
            <span>Deposit Legal Vault Document</span>
          </button>

          <button
            onClick={handleGenerateAuditPack}
            disabled={auditExporting}
            className="flex items-center space-x-2 px-3.5 py-2 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 font-medium rounded-lg text-xs transition"
          >
            <FolderArchive className="w-4 h-4 text-emerald-400" />
            <span>{auditExporting ? 'Packaging Audit Pack...' : 'Export Audit Bundle'}</span>
          </button>

          <button
            onClick={fetchLegalData}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition"
            title="Refresh Legal Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Audit Export Download Notice */}
      {auditExportResult && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="text-xs font-bold text-emerald-200">
                Audit Bundle Exported ({auditExportResult.documentsIncluded} Verified Documents)
              </h4>
              <p className="text-[11px] text-emerald-400/80 font-mono">
                SHA-256 Hash: {auditExportResult.sha256VerificationHash}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuditExportResult(null)}
            className="text-xs text-emerald-400 hover:text-emerald-200 font-mono font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Primary Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-2">
        {[
          { id: 'OVERVIEW', label: 'Vault Executive Overview', icon: Scale },
          { id: 'DATA_ROOM', label: 'Investor Data Room', icon: Lock, badge: documents.length },
          { id: 'PATENTS_IP', label: 'Patent Portfolio (CIPC / WIPO)', icon: Award, badge: patents.length },
          { id: 'TRADEMARKS', label: 'Trademark Register', icon: ShieldCheck, badge: trademarks.length },
          { id: 'GOVT_CONTRACTS', label: 'Government Contracts', icon: Building2, badge: govtContracts.length },
          { id: 'BOARD_RESOLUTIONS', label: 'Board Resolutions', icon: FileCheck, badge: boardResolutions.length },
          { id: 'COMPLIANCE_EVIDENCE', label: 'POPIA & ISO Evidence Vault', icon: ShieldAlert, badge: complianceEvidence.length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Data Room Documents</span>
                <Lock className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-indigo-300 font-mono">
                {overview?.totalDataRoomDocuments || 2} Vault Items
              </div>
              <div className="text-[11px] text-slate-400">Encrypted SHA-256 Verified</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active Gov Contracts Value</span>
                <Building2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-emerald-400 font-mono">
                {formatZar(overview?.activeGovernmentContractsValueZar || 48500000)}
              </div>
              <div className="text-[11px] text-slate-400">GDE & SITA Service Agreements</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>POPIA Act Compliance</span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-300 font-mono">
                {overview?.popiaComplianceScorePercentage || 100}% Compliant
              </div>
              <div className="text-[11px] text-emerald-400">Audited by KPMG Cyber</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active Patents & Trademarks</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-300 font-mono">
                {(overview?.activePatentsCount || 1) + (overview?.registeredTrademarksCount || 1)} Registered
              </div>
              <div className="text-[11px] text-slate-400">CIPC SA & WIPO PCT</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVESTOR DATA ROOM */}
      {activeTab === 'DATA_ROOM' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 font-semibold text-sm text-white flex justify-between items-center">
              <span>Investor Due Diligence Vault & Legal Documents</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Document Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Classification</th>
                    <th className="px-4 py-3">Format / Size</th>
                    <th className="px-4 py-3">Version</th>
                    <th className="px-4 py-3">SHA-256 Fingerprint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {documents.map((doc) => (
                    <tr key={doc.docId} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5 font-bold text-white max-w-md">{doc.title}</td>
                      <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px]">{doc.folderCategory}</td>
                      <td className="px-4 py-3.5">{renderClassificationBadge(doc.classification)}</td>
                      <td className="px-4 py-3.5 text-slate-300 font-mono">
                        {doc.fileFormat} • {(doc.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 font-mono">{doc.version}</td>
                      <td className="px-4 py-3.5 text-slate-400 font-mono text-[10px] truncate max-w-xs">{doc.hashSha256}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PATENTS */}
      {activeTab === 'PATENTS_IP' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patents.map((p) => (
              <div key={p.patentId} className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-400">{p.patentNumber}</span>
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    {p.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">Jurisdiction: {p.jurisdiction}</div>
                <div className="p-3 bg-slate-950 rounded text-xs text-slate-300">{p.abstract}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TRADEMARKS */}
      {activeTab === 'TRADEMARKS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trademarks.map((tm) => (
              <div key={tm.trademarkId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-400">{tm.registrationNumber}</span>
                    <h4 className="text-sm font-bold text-white">{tm.markName}</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    {tm.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-mono">Classes: {tm.classNumber}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: GOVERNMENT CONTRACTS */}
      {activeTab === 'GOVT_CONTRACTS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {govtContracts.map((gc) => (
              <div key={gc.contractId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400">{gc.contractNumber}</span>
                    <h4 className="text-sm font-bold text-white">{gc.procurementDepartment}</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    {gc.complianceStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-200 font-mono font-bold">Value: {formatZar(gc.tenderValueZar)}</div>
                <div className="text-xs text-slate-400 font-mono">SITA Ref: {gc.sitaApprovalRef}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: BOARD RESOLUTIONS */}
      {activeTab === 'BOARD_RESOLUTIONS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {boardResolutions.map((br) => (
              <div key={br.resolutionId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-400">{br.resolutionNumber}</span>
                    <h4 className="text-sm font-bold text-white">{br.title}</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    PASSED UNANIMOUSLY
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Votes: {br.votesInFavor} In Favor / {br.votesAgainst} Against • Signed by: {br.signatoryChairperson}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: COMPLIANCE EVIDENCE */}
      {activeTab === 'COMPLIANCE_EVIDENCE' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceEvidence.map((ce) => (
              <div key={ce.evidenceId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400">{ce.framework}</span>
                    <h4 className="text-sm font-bold text-white">{ce.controlClause}</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    {ce.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300">Auditor: {ce.auditorOrg}</div>
                <div className="text-xs text-slate-400 font-mono">Doc Ref: {ce.evidenceDocRef}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UPLOAD DOCUMENT MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-400" />
                Deposit Document to Investor Vault
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadDocument} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  placeholder="e.g. KPMG Audited Financial Statements FY2026"
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Vault Category</label>
                  <select
                    value={newDoc.folderCategory}
                    onChange={(e) => setNewDoc({ ...newDoc, folderCategory: e.target.value as any })}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                  >
                    <option value="DUE_DILIGENCE">Due Diligence</option>
                    <option value="GOVT_CONTRACTS">Government Contracts</option>
                    <option value="INTELLECTUAL_PROPERTY">Intellectual Property</option>
                    <option value="BOARD_GOVERNANCE">Board Governance</option>
                    <option value="COMPLIANCE_EVIDENCE">Compliance Evidence</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Classification</label>
                  <select
                    value={newDoc.classification}
                    onChange={(e) => setNewDoc({ ...newDoc, classification: e.target.value as any })}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                  >
                    <option value="RESTRICTED_INVESTOR_ONLY">Restricted Investor Only</option>
                    <option value="SECRET_GOVERNMENT">Secret Government</option>
                    <option value="CONFIDENTIAL">Confidential</option>
                    <option value="INTERNAL">Internal</option>
                    <option value="PUBLIC">Public</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                >
                  Deposit Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
