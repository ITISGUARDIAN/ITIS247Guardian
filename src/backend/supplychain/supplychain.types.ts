// ITIS Manufacturing & Supply Chain Domain Types
// Defines structures for Wearable Manufacturing Batches, Factory QA, Warehouse Inventory, Regional Depots, Shipping, RMA, Repairs, Refurbishment, Warranty, Recall, & Logistics.

export type BatchStatus = 'SCHEDULED' | 'IN_PRODUCTION' | 'FACTORY_QA_PENDING' | 'QA_PASSED' | 'QA_FAILED' | 'RELEASED_TO_DEPOT';

export type DeviceType = 'SCHOLAR_SAFETY_WEARABLE' | 'BUS_CAN_OBD_DONGLE' | 'DRIVER_RFID_READER' | 'DEPOT_GATE_BEACON';

export type DepotLocation = 'JHB_CENTRAL_DEPOT' | 'CPT_METRO_DEPOT' | 'DURBAN_DEPOT' | 'POLOKWANE_DEPOT' | 'GQEBERHA_DEPOT';

export type RmaStatus = 'RMA_REQUESTED' | 'DEVICE_RECEIVED' | 'DIAGNOSED' | 'REPAIRED' | 'REFURBISHED' | 'SCRAPPED_RECYCLED' | 'REPLACED_UNDER_WARRANTY';

export interface WearableBatch {
  batchId: string;
  batchNumber: string; // e.g. BATCH-2026-W04
  deviceType: DeviceType;
  unitsQuantity: number;
  factoryName: string; // e.g. SITA Electronics Facility (Pretoria)
  productionStartDate: string;
  qaPassRatePercentage: number;
  status: BatchStatus;
  qaInspectorName: string;
  qualityCertificateHash: string;
}

export interface InventoryDeviceUnit {
  serialNumber: string; // e.g. IT-W2026-88102
  qrCodeBarcode: string; // e.g. QR-88102-GDE
  deviceType: DeviceType;
  depotLocation: DepotLocation;
  firmwareVersion: string; // e.g. v2.4.1-gov
  hardwareRev: string;
  warrantyExpirationDate: string;
  warrantyActive: boolean;
  unitStatus: 'IN_STOCK' | 'DEPLOYED_ACTIVE' | 'IN_TRANSIT' | 'RMA_REPAIR' | 'REFURBISHED';
  assignedSchoolOrBusRef?: string;
}

export interface RegionalDepot {
  depotId: DepotLocation;
  depotName: string;
  province: string;
  address: string;
  managerName: string;
  totalStockUnits: number;
  rmaQueueUnitsCount: number;
  lastInventoryAuditDate: string;
}

export interface DeviceShipmentLog {
  shipmentId: string;
  trackingNumber: string; // e.g. SITA-LOG-2026-901
  originDepot: DepotLocation;
  destinationFacility: string; // e.g. Soweto School District Depot
  deviceType: DeviceType;
  unitsCount: number;
  carrierName: string; // e.g. CourierIT Government Logistics
  shipmentStatus: 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED' | 'EXCEPTION';
  dispatchedAt: string;
  estimatedDeliveryAt: string;
}

export interface RmaRepairRecord {
  rmaId: string;
  rmaNumber: string; // e.g. RMA-2026-402
  deviceSerialNumber: string;
  reportedDefect: string; // e.g. "Screen flickering, panic button stuck"
  depotLocation: DepotLocation;
  rmaStatus: RmaStatus;
  diagnosisNotes?: string;
  repairedByTechnician?: string;
  refurbishedDate?: string;
  warrantyCovered: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecallCampaign {
  recallId: string;
  recallCode: string; // e.g. RECALL-2026-OBD1
  affectedBatchNumber: string;
  deviceType: DeviceType;
  reasonDescription: string; // e.g. "Battery firmware charging profile over-voltage fix"
  affectedUnitsCount: number;
  replacedUnitsCount: number;
  recallStatus: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  issuedAt: string;
}

export interface SupplyChainAnalytics {
  totalDevicesManufactured: number;
  factoryQaPassRateAverage: number;
  totalStockInDepots: number;
  activeRmaUnitsCount: number;
  refurbishedUnitsCount: number;
  warrantyClaimRatePercentage: number;
  depotStockDistribution: Record<DepotLocation, number>;
}
