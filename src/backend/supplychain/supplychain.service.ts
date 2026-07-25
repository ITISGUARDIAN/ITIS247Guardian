// ITIS Manufacturing & Supply Chain Domain Service
// Manages Batches, Factory QA, Inventory, Depots, Device Shipping, RMA, Repairs, Refurbishment, Warranty & Recalls.

import { AuditLogger } from '../common/audit.logger';
import {
  BatchStatus,
  DepotLocation,
  DeviceShipmentLog,
  InventoryDeviceUnit,
  RecallCampaign,
  RegionalDepot,
  RmaRepairRecord,
  RmaStatus,
  SupplyChainAnalytics,
  WearableBatch
} from './supplychain.types';

export class SupplyChainService {
  private static instance: SupplyChainService;

  // In-Memory Data Stores
  private batches: Map<string, WearableBatch> = new Map();
  private inventory: Map<string, InventoryDeviceUnit> = new Map();
  private depots: Map<DepotLocation, RegionalDepot> = new Map();
  private shipments: Map<string, DeviceShipmentLog> = new Map();
  private rmas: Map<string, RmaRepairRecord> = new Map();
  private recalls: Map<string, RecallCampaign> = new Map();

  private constructor() {
    this.seedInitialData();
  }

  public static getInstance(): SupplyChainService {
    if (!SupplyChainService.instance) {
      SupplyChainService.instance = new SupplyChainService();
    }
    return SupplyChainService.instance;
  }

  private seedInitialData() {
    const now = new Date();
    const isoNow = now.toISOString();

    // 1. Seed Batches
    const b1Id = 'BATCH-2026-W01';
    this.batches.set(b1Id, {
      batchId: b1Id,
      batchNumber: 'BATCH-2026-W01',
      deviceType: 'SCHOLAR_SAFETY_WEARABLE',
      unitsQuantity: 5000,
      factoryName: 'SITA High-Tech Manufacturing Facility (Pretoria East)',
      productionStartDate: '2026-05-10T00:00:00Z',
      qaPassRatePercentage: 99.2,
      status: 'RELEASED_TO_DEPOT',
      qaInspectorName: 'Eng. Johan Oberholzer',
      qualityCertificateHash: '0x8f9a2b4e7c1d3f5a'
    });

    const b2Id = 'BATCH-2026-B02';
    this.batches.set(b2Id, {
      batchId: b2Id,
      batchNumber: 'BATCH-2026-B02',
      deviceType: 'BUS_CAN_OBD_DONGLE',
      unitsQuantity: 2500,
      factoryName: 'Electronics Assemblies SA (Durban South)',
      productionStartDate: '2026-06-01T00:00:00Z',
      qaPassRatePercentage: 98.6,
      status: 'QA_PASSED',
      qaInspectorName: 'Ayanda Dlamini',
      qualityCertificateHash: '0x7e6d5c4b3a2f1e0d'
    });

    // 2. Seed Regional Depots
    this.depots.set('JHB_CENTRAL_DEPOT', {
      depotId: 'JHB_CENTRAL_DEPOT',
      depotName: 'Johannesburg Central Regional Depot (Midrand)',
      province: 'Gauteng',
      address: '100 Logistics Parkway, Midrand, Gauteng',
      managerName: 'Khomotso Phiri',
      totalStockUnits: 3400,
      rmaQueueUnitsCount: 14,
      lastInventoryAuditDate: '2026-07-01T00:00:00Z'
    });

    this.depots.set('CPT_METRO_DEPOT', {
      depotId: 'CPT_METRO_DEPOT',
      depotName: 'Cape Town Metro Depot (Epping)',
      province: 'Western Cape',
      address: '45 Viking Way, Epping Industrial, Cape Town',
      managerName: 'Willem de Klerk',
      totalStockUnits: 2100,
      rmaQueueUnitsCount: 8,
      lastInventoryAuditDate: '2026-07-05T00:00:00Z'
    });

    // 3. Seed Sample Device Units with Barcode/QR
    const sn1 = 'IT-W2026-88101';
    this.inventory.set(sn1, {
      serialNumber: sn1,
      qrCodeBarcode: 'QR-88101-GDE',
      deviceType: 'SCHOLAR_SAFETY_WEARABLE',
      depotLocation: 'JHB_CENTRAL_DEPOT',
      firmwareVersion: 'v2.4.1-gov',
      hardwareRev: 'Rev B2',
      warrantyExpirationDate: '2028-05-10T00:00:00Z',
      warrantyActive: true,
      unitStatus: 'IN_STOCK'
    });

    const sn2 = 'IT-W2026-88102';
    this.inventory.set(sn2, {
      serialNumber: sn2,
      qrCodeBarcode: 'QR-88102-GDE',
      deviceType: 'SCHOLAR_SAFETY_WEARABLE',
      depotLocation: 'JHB_CENTRAL_DEPOT',
      firmwareVersion: 'v2.4.1-gov',
      hardwareRev: 'Rev B2',
      warrantyExpirationDate: '2028-05-10T00:00:00Z',
      warrantyActive: true,
      unitStatus: 'DEPLOYED_ACTIVE',
      assignedSchoolOrBusRef: 'Soweto Comp. Secondary (EMIS 700141029)'
    });

    // 4. Seed Shipments
    const sh1 = 'SHIP-2026-101';
    this.shipments.set(sh1, {
      shipmentId: sh1,
      trackingNumber: 'SITA-LOG-2026-901',
      originDepot: 'JHB_CENTRAL_DEPOT',
      destinationFacility: 'Soweto School District Depot',
      deviceType: 'SCHOLAR_SAFETY_WEARABLE',
      unitsCount: 450,
      carrierName: 'CourierIT Government Fleet Express',
      shipmentStatus: 'IN_TRANSIT',
      dispatchedAt: '2026-07-22T08:00:00Z',
      estimatedDeliveryAt: '2026-07-24T16:00:00Z'
    });

    // 5. Seed RMA & Repair Records
    const rma1 = 'RMA-2026-401';
    this.rmas.set(rma1, {
      rmaId: rma1,
      rmaNumber: 'RMA-2026-401',
      deviceSerialNumber: 'IT-W2026-87990',
      reportedDefect: 'SOS Panic button tactile switch unresponsive',
      depotLocation: 'JHB_CENTRAL_DEPOT',
      rmaStatus: 'DIAGNOSED',
      diagnosisNotes: 'Failed micro-switch housing, replaced with silicon reinforced switch',
      repairedByTechnician: 'Tech Sibusiso Kumalo',
      warrantyCovered: true,
      createdAt: '2026-07-18T10:00:00Z',
      updatedAt: isoNow
    });

    // 6. Seed Recalls
    const rc1 = 'RECALL-2026-OBD1';
    this.recalls.set(rc1, {
      recallId: rc1,
      recallCode: 'RECALL-2026-OBD1',
      affectedBatchNumber: 'BATCH-2025-B08',
      deviceType: 'BUS_CAN_OBD_DONGLE',
      reasonDescription: 'Power surge regulator pin insulation update required for older 24V bus alternators',
      affectedUnitsCount: 350,
      replacedUnitsCount: 280,
      recallStatus: 'ACTIVE',
      issuedAt: '2026-06-15T00:00:00Z'
    });
  }

  // API Methods
  public async getAnalytics(): Promise<SupplyChainAnalytics> {
    const batchList = Array.from(this.batches.values());
    const totalMfg = batchList.reduce((acc, curr) => acc + curr.unitsQuantity, 0);

    const depotStock: Record<DepotLocation, number> = {
      JHB_CENTRAL_DEPOT: 3400,
      CPT_METRO_DEPOT: 2100,
      DURBAN_DEPOT: 1800,
      POLOKWANE_DEPOT: 950,
      GQEBERHA_DEPOT: 720
    };

    return {
      totalDevicesManufactured: totalMfg,
      factoryQaPassRateAverage: 98.9,
      totalStockInDepots: 8970,
      activeRmaUnitsCount: this.rmas.size,
      refurbishedUnitsCount: 142,
      warrantyClaimRatePercentage: 1.1,
      depotStockDistribution: depotStock
    };
  }

  public async getBatches(): Promise<WearableBatch[]> {
    return Array.from(this.batches.values());
  }

  public async createBatch(params: Omit<WearableBatch, 'batchId'>): Promise<WearableBatch> {
    const batchId = `BATCH-${Math.floor(Math.random() * 8999 + 1000)}`;
    const batch: WearableBatch = {
      ...params,
      batchId
    };
    this.batches.set(batchId, batch);

    AuditLogger.recordAudit({
      action: 'MANUFACTURING_BATCH_CREATED',
      resource: '/api/v1/supplychain/batches',
      correlationId: batchId,
      metadata: { batchNumber: batch.batchNumber, deviceType: batch.deviceType, unitsQuantity: batch.unitsQuantity }
    });

    return batch;
  }

  public async getDepots(): Promise<RegionalDepot[]> {
    return Array.from(this.depots.values());
  }

  public async getInventory(): Promise<InventoryDeviceUnit[]> {
    return Array.from(this.inventory.values());
  }

  public async getShipments(): Promise<DeviceShipmentLog[]> {
    return Array.from(this.shipments.values());
  }

  public async getRmas(): Promise<RmaRepairRecord[]> {
    return Array.from(this.rmas.values());
  }

  public async createRma(params: Omit<RmaRepairRecord, 'rmaId' | 'rmaNumber' | 'createdAt' | 'updatedAt'>): Promise<RmaRepairRecord> {
    const rmaId = `RMA-${Math.floor(Math.random() * 8999 + 1000)}`;
    const rmaNumber = `RMA-2026-${Math.floor(Math.random() * 899 + 100)}`;
    const rma: RmaRepairRecord = {
      ...params,
      rmaId,
      rmaNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.rmas.set(rmaId, rma);

    AuditLogger.recordAudit({
      action: 'DEVICE_RMA_CREATED',
      resource: '/api/v1/supplychain/rma',
      correlationId: rmaId,
      metadata: { serialNumber: rma.deviceSerialNumber, reportedDefect: rma.reportedDefect }
    });

    return rma;
  }

  public async getRecalls(): Promise<RecallCampaign[]> {
    return Array.from(this.recalls.values());
  }
}
