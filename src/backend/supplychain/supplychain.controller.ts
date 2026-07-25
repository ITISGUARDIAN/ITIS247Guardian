// ITIS Manufacturing & Supply Chain REST Controller
// Exposes endpoints for Batches, Factory QA, Warehouse Inventory, Depots, Device Shipping, RMA, Repairs, Refurbishment, Warranty & Recalls.

import { Request, Response, Router } from 'express';
import { SupplyChainService } from './supplychain.service';

export const supplyChainRouter = Router();

const scService = SupplyChainService.getInstance();

/**
 * 1. GET ANALYTICS OVERVIEW
 * GET /api/v1/supplychain/analytics
 */
supplyChainRouter.get('/analytics', async (req: Request, res: Response) => {
  try {
    const analytics = await scService.getAnalytics();
    return res.json({
      success: true,
      analytics
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'ANALYTICS_FETCH_FAILED', message: err.message });
  }
});

/**
 * 2. WEARABLE MANUFACTURING BATCHES
 * GET /api/v1/supplychain/batches
 * POST /api/v1/supplychain/batches
 */
supplyChainRouter.get('/batches', async (req: Request, res: Response) => {
  try {
    const batches = await scService.getBatches();
    return res.json({
      success: true,
      count: batches.length,
      batches
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'BATCHES_FETCH_FAILED', message: err.message });
  }
});

supplyChainRouter.post('/batches', async (req: Request, res: Response) => {
  try {
    const { batchNumber, deviceType, unitsQuantity, factoryName, productionStartDate, qaPassRatePercentage, status, qaInspectorName, qualityCertificateHash } = req.body;

    if (!batchNumber || !deviceType || !unitsQuantity) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_BATCH_FIELDS',
        message: 'batchNumber, deviceType, and unitsQuantity are required.'
      });
    }

    const batch = await scService.createBatch({
      batchNumber,
      deviceType: deviceType || 'SCHOLAR_SAFETY_WEARABLE',
      unitsQuantity: Number(unitsQuantity),
      factoryName: factoryName || 'SITA High-Tech Manufacturing Facility',
      productionStartDate: productionStartDate || new Date().toISOString(),
      qaPassRatePercentage: Number(qaPassRatePercentage) || 99.0,
      status: status || 'SCHEDULED',
      qaInspectorName: qaInspectorName || 'Quality Lead Inspector',
      qualityCertificateHash: qualityCertificateHash || `0x${Math.random().toString(16).substring(2, 10)}`
    });

    return res.status(201).json({
      success: true,
      message: `Manufacturing batch '${batch.batchNumber}' created.`,
      batch
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'BATCH_CREATE_FAILED', message: err.message });
  }
});

/**
 * 3. REGIONAL DEPOTS & WAREHOUSE MANAGEMENT
 * GET /api/v1/supplychain/depots
 */
supplyChainRouter.get('/depots', async (req: Request, res: Response) => {
  try {
    const depots = await scService.getDepots();
    return res.json({
      success: true,
      count: depots.length,
      depots
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DEPOTS_FETCH_FAILED', message: err.message });
  }
});

/**
 * 4. INVENTORY UNITS & BARCODE/QR TRACKING
 * GET /api/v1/supplychain/inventory
 */
supplyChainRouter.get('/inventory', async (req: Request, res: Response) => {
  try {
    const inventory = await scService.getInventory();
    return res.json({
      success: true,
      count: inventory.length,
      inventory
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'INVENTORY_FETCH_FAILED', message: err.message });
  }
});

/**
 * 5. DEVICE SHIPPING & LOGISTICS
 * GET /api/v1/supplychain/shipments
 */
supplyChainRouter.get('/shipments', async (req: Request, res: Response) => {
  try {
    const shipments = await scService.getShipments();
    return res.json({
      success: true,
      count: shipments.length,
      shipments
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SHIPMENTS_FETCH_FAILED', message: err.message });
  }
});

/**
 * 6. RMA, REPAIRS, & REFURBISHMENT
 * GET /api/v1/supplychain/rma
 * POST /api/v1/supplychain/rma
 */
supplyChainRouter.get('/rma', async (req: Request, res: Response) => {
  try {
    const rmas = await scService.getRmas();
    return res.json({
      success: true,
      count: rmas.length,
      rmas
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'RMA_FETCH_FAILED', message: err.message });
  }
});

supplyChainRouter.post('/rma', async (req: Request, res: Response) => {
  try {
    const { deviceSerialNumber, reportedDefect, depotLocation, diagnosisNotes, repairedByTechnician, warrantyCovered } = req.body;

    if (!deviceSerialNumber || !reportedDefect) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_RMA_FIELDS',
        message: 'deviceSerialNumber and reportedDefect are required.'
      });
    }

    const rma = await scService.createRma({
      deviceSerialNumber,
      reportedDefect,
      depotLocation: depotLocation || 'JHB_CENTRAL_DEPOT',
      rmaStatus: 'RMA_REQUESTED',
      diagnosisNotes,
      repairedByTechnician,
      warrantyCovered: warrantyCovered !== undefined ? Boolean(warrantyCovered) : true
    });

    return res.status(201).json({
      success: true,
      message: `RMA ticket '${rma.rmaNumber}' created successfully.`,
      rma
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'RMA_CREATE_FAILED', message: err.message });
  }
});

/**
 * 7. RECALL CAMPAIGNS
 * GET /api/v1/supplychain/recalls
 */
supplyChainRouter.get('/recalls', async (req: Request, res: Response) => {
  try {
    const recalls = await scService.getRecalls();
    return res.json({
      success: true,
      count: recalls.length,
      recalls
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'RECALLS_FETCH_FAILED', message: err.message });
  }
});
