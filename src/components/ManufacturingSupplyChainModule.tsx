import React, { useState, useEffect } from 'react';
import {
  Factory,
  CheckCircle2,
  Warehouse,
  QrCode,
  MapPin,
  Truck,
  RotateCcw,
  Wrench,
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  Plus,
  RefreshCw,
  Search,
  Box,
  Layers,
  Cpu,
  XCircle,
  FileText,
  Barcode
} from 'lucide-react';
import {
  BatchStatus,
  DepotLocation,
  DeviceShipmentLog,
  InventoryDeviceUnit,
  RecallCampaign,
  RegionalDepot,
  RmaRepairRecord,
  SupplyChainAnalytics,
  WearableBatch
} from '../backend/supplychain/supplychain.types';

export const ManufacturingSupplyChainModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'BATCHES' | 'FACTORY_QA' | 'WAREHOUSE_DEPOTS' | 'BARCODE_INVENTORY' | 'SHIPPING' | 'RMA_REPAIRS' | 'RECALLS'
  >('BATCHES');

  // State
  const [analytics, setAnalytics] = useState<SupplyChainAnalytics | null>(null);
  const [batches, setBatches] = useState<WearableBatch[]>([]);
  const [depots, setDepots] = useState<RegionalDepot[]>([]);
  const [inventory, setInventory] = useState<InventoryDeviceUnit[]>([]);
  const [shipments, setShipments] = useState<DeviceShipmentLog[]>([]);
  const [rmas, setRmas] = useState<RmaRepairRecord[]>([]);
  const [recalls, setRecalls] = useState<RecallCampaign[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [showNewBatchModal, setShowNewBatchModal] = useState<boolean>(false);
  const [showNewRmaModal, setShowNewRmaModal] = useState<boolean>(false);

  // New Batch Form State
  const [newBatch, setNewBatch] = useState({
    batchNumber: '',
    deviceType: 'SCHOLAR_SAFETY_WEARABLE',
    unitsQuantity: 2500,
    factoryName: 'SITA High-Tech Manufacturing Facility (Pretoria East)',
    qaInspectorName: 'Eng. Johan Oberholzer'
  });

  // New RMA Form State
  const [newRma, setNewRma] = useState({
    deviceSerialNumber: '',
    reportedDefect: '',
    depotLocation: 'JHB_CENTRAL_DEPOT' as DepotLocation,
    diagnosisNotes: ''
  });

  const fetchSupplyChainData = async () => {
    setLoading(true);
    try {
      const [resA, resB, resD, resI, resS, resR, resC] = await Promise.all([
        fetch('/api/v1/supplychain/analytics').then((r) => r.json()),
        fetch('/api/v1/supplychain/batches').then((r) => r.json()),
        fetch('/api/v1/supplychain/depots').then((r) => r.json()),
        fetch('/api/v1/supplychain/inventory').then((r) => r.json()),
        fetch('/api/v1/supplychain/shipments').then((r) => r.json()),
        fetch('/api/v1/supplychain/rma').then((r) => r.json()),
        fetch('/api/v1/supplychain/recalls').then((r) => r.json())
      ]);

      if (resA.success) setAnalytics(resA.analytics);
      if (resB.success) setBatches(resB.batches);
      if (resD.success) setDepots(resD.depots);
      if (resI.success) setInventory(resI.inventory);
      if (resS.success) setShipments(resS.shipments);
      if (resR.success) setRmas(resR.rmas);
      if (resC.success) setRecalls(resC.recalls);
    } catch (err) {
      console.error('Failed to load supply chain data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplyChainData();
  }, []);

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/supplychain/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBatch)
      });
      const data = await res.json();
      if (data.success) {
        setShowNewBatchModal(false);
        setNewBatch({
          batchNumber: '',
          deviceType: 'SCHOLAR_SAFETY_WEARABLE',
          unitsQuantity: 2500,
          factoryName: 'SITA High-Tech Manufacturing Facility (Pretoria East)',
          qaInspectorName: 'Eng. Johan Oberholzer'
        });
        fetchSupplyChainData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateRma = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/supplychain/rma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRma)
      });
      const data = await res.json();
      if (data.success) {
        setShowNewRmaModal(false);
        setNewRma({
          deviceSerialNumber: '',
          reportedDefect: '',
          depotLocation: 'JHB_CENTRAL_DEPOT',
          diagnosisNotes: ''
        });
        fetchSupplyChainData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderBatchStatusBadge = (status: BatchStatus) => {
    switch (status) {
      case 'SCHEDULED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300">SCHEDULED</span>;
      case 'IN_PRODUCTION':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">IN PRODUCTION</span>;
      case 'FACTORY_QA_PENDING':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">QA PENDING</span>;
      case 'QA_PASSED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">QA PASSED</span>;
      case 'QA_FAILED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">QA FAILED</span>;
      case 'RELEASED_TO_DEPOT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">DEPOT RELEASED</span>;
    }
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen p-4 md:p-6 space-y-6 font-sans">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg text-white shadow-lg shadow-orange-600/20">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Manufacturing & Supply Chain Management
                <span className="text-xs px-2.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full font-mono">
                  {analytics?.totalDevicesManufactured || 7500} Units Produced
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Wearable Batches • Factory QA • Regional Depots • QR/Barcode Inventory • Logistics • RMA & Recalls
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowNewBatchModal(true)}
            className="flex items-center space-x-2 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg text-xs transition shadow-md shadow-amber-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Mfg Batch</span>
          </button>
          <button
            onClick={() => setShowNewRmaModal(true)}
            className="flex items-center space-x-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg text-xs border border-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4 text-purple-400" />
            <span>Raise RMA Ticket</span>
          </button>
          <button
            onClick={fetchSupplyChainData}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition"
            title="Refresh Supply Chain Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-2">
        {[
          { id: 'BATCHES', label: 'Manufacturing Batches', icon: Factory },
          { id: 'FACTORY_QA', label: 'Factory QA & Certification', icon: CheckCircle2 },
          { id: 'WAREHOUSE_DEPOTS', label: 'Regional Depots & Warehouses', icon: Warehouse },
          { id: 'BARCODE_INVENTORY', label: 'QR / Barcode Inventory', icon: QrCode },
          { id: 'SHIPPING', label: 'Device Shipping & Logistics', icon: Truck },
          { id: 'RMA_REPAIRS', label: 'RMA, Repairs & Refurbishment', icon: Wrench, badge: rmas.length },
          { id: 'RECALLS', label: 'Recall Management', icon: AlertTriangle, badge: recalls.length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                isActive
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: MANUFACTURING BATCHES */}
      {activeTab === 'BATCHES' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Units Manufactured</span>
                <Cpu className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-amber-300 font-mono">
                {analytics?.totalDevicesManufactured || 7500}
              </div>
              <div className="text-[11px] text-slate-400">Wearables & Bus CAN Dongles</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Factory QA Pass Rate</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                {analytics?.factoryQaPassRateAverage || 98.9}%
              </div>
              <div className="text-[11px] text-slate-400">Target: &gt; 98.5%</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Stock In Regional Depots</span>
                <Warehouse className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-300 font-mono">
                {analytics?.totalStockInDepots || 8970} Units
              </div>
              <div className="text-[11px] text-slate-400">Across 5 Provincial Hubs</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Warranty Claim Rate</span>
                <ShieldAlert className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-300 font-mono">
                {analytics?.warrantyClaimRatePercentage || 1.1}%
              </div>
              <div className="text-[11px] text-emerald-400">Below 2.0% SLA Threshold</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 font-semibold text-sm text-white">
              SITA Electronics & Wearable Production Batches
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Batch Ref</th>
                    <th className="px-4 py-3">Device Type</th>
                    <th className="px-4 py-3">Units Qty</th>
                    <th className="px-4 py-3">Manufacturing Plant</th>
                    <th className="px-4 py-3">QA Pass Rate</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Cert Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {batches.map((b) => (
                    <tr key={b.batchId} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5 font-mono font-bold text-amber-300">{b.batchNumber}</td>
                      <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px]">{b.deviceType}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-white">{b.unitsQuantity}</td>
                      <td className="px-4 py-3.5 text-slate-300 max-w-xs">{b.factoryName}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-emerald-400">{b.qaPassRatePercentage}%</td>
                      <td className="px-4 py-3.5">{renderBatchStatusBadge(b.status)}</td>
                      <td className="px-4 py-3.5 text-slate-400 font-mono text-[10px]">{b.qualityCertificateHash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REGIONAL DEPOTS */}
      {activeTab === 'WAREHOUSE_DEPOTS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {depots.map((d) => (
              <div key={d.depotId} className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      {d.depotName}
                    </h4>
                    <p className="text-xs text-slate-400">{d.address}</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs font-mono font-bold">
                    {d.totalStockUnits} Units Stock
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-400">Depot Manager:</span>
                    <div className="text-slate-200 font-semibold">{d.managerName}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">RMA Repair Queue:</span>
                    <div className="text-purple-300 font-mono font-bold">{d.rmaQueueUnitsCount} Units</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BARCODE & QR INVENTORY */}
      {activeTab === 'BARCODE_INVENTORY' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 font-semibold text-sm text-white flex justify-between items-center">
              <span>Device Unit Barcode / QR Registry & Asset Tracking</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Serial Number</th>
                    <th className="px-4 py-3">QR Barcode</th>
                    <th className="px-4 py-3">Device Type</th>
                    <th className="px-4 py-3">Depot Location</th>
                    <th className="px-4 py-3">Firmware</th>
                    <th className="px-4 py-3">Warranty Expiration</th>
                    <th className="px-4 py-3">Unit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {inventory.map((inv) => (
                    <tr key={inv.serialNumber} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5 font-mono font-bold text-cyan-300">{inv.serialNumber}</td>
                      <td className="px-4 py-3.5 font-mono text-purple-300 flex items-center gap-1.5">
                        <Barcode className="w-3.5 h-3.5 text-purple-400" />
                        {inv.qrCodeBarcode}
                      </td>
                      <td className="px-4 py-3.5 text-slate-300 text-[11px] font-mono">{inv.deviceType}</td>
                      <td className="px-4 py-3.5 text-slate-300">{inv.depotLocation}</td>
                      <td className="px-4 py-3.5 font-mono text-slate-400">{inv.firmwareVersion}</td>
                      <td className="px-4 py-3.5 text-slate-300">{new Date(inv.warrantyExpirationDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3.5 font-mono text-emerald-400 font-bold">{inv.unitStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SHIPPING */}
      {activeTab === 'SHIPPING' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shipments.map((s) => (
              <div key={s.shipmentId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-400">{s.trackingNumber}</div>
                    <div className="text-sm font-bold text-white">{s.destinationFacility}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-[10px] font-bold">
                    {s.shipmentStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  {s.unitsCount} Units • Carrier: {s.carrierName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: RMA & REPAIRS */}
      {activeTab === 'RMA_REPAIRS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rmas.map((rma) => (
              <div key={rma.rmaId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-mono font-bold text-purple-400">{rma.rmaNumber}</div>
                    <div className="text-sm font-bold text-white">Serial: {rma.deviceSerialNumber}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded text-[10px] font-bold">
                    {rma.rmaStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-300">Defect: {rma.reportedDefect}</div>
                {rma.diagnosisNotes && (
                  <div className="p-2 bg-slate-950 rounded text-xs text-slate-400">Diagnosis: {rma.diagnosisNotes}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: RECALLS */}
      {activeTab === 'RECALLS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recalls.map((rc) => (
              <div key={rc.recallId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-mono font-bold text-red-400">{rc.recallCode}</div>
                    <div className="text-sm font-bold text-white">Affected Batch: {rc.affectedBatchNumber}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded text-[10px] font-bold">
                    {rc.recallStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-300">Reason: {rc.reasonDescription}</div>
                <div className="text-xs text-amber-300 font-mono">
                  Replaced {rc.replacedUnitsCount} / {rc.affectedUnitsCount} Units
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE BATCH MODAL */}
      {showNewBatchModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Factory className="w-5 h-5 text-amber-400" />
                Schedule Manufacturing Batch
              </h3>
              <button onClick={() => setShowNewBatchModal(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Batch Ref Code</label>
                <input
                  type="text"
                  required
                  value={newBatch.batchNumber}
                  onChange={(e) => setNewBatch({ ...newBatch, batchNumber: e.target.value })}
                  placeholder="e.g. BATCH-2026-W05"
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Quantity (Units)</label>
                  <input
                    type="number"
                    required
                    value={newBatch.unitsQuantity}
                    onChange={(e) => setNewBatch({ ...newBatch, unitsQuantity: Number(e.target.value) })}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">QA Lead Inspector</label>
                  <input
                    type="text"
                    required
                    value={newBatch.qaInspectorName}
                    onChange={(e) => setNewBatch({ ...newBatch, qaInspectorName: e.target.value })}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewBatchModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium"
                >
                  Schedule Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
