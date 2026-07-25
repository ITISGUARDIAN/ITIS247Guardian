// ITIS CRM & Customer Success REST Controller
// Exposes endpoints for Accounts, Sales Pipeline, School Onboarding, Partners, Contracts, & Churn Analytics.

import { Request, Response, Router } from 'express';
import { CrmService } from './crm.service';

export const crmRouter = Router();

const crmService = CrmService.getInstance();

/**
 * 1. GET OVERVIEW METRICS
 * GET /api/v1/crm/overview
 */
crmRouter.get('/overview', async (req: Request, res: Response) => {
  try {
    const overview = await crmService.getOverview();
    return res.json({
      success: true,
      overview
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'CRM_OVERVIEW_FAILED', message: err.message });
  }
});

/**
 * 2. GOVERNMENT ACCOUNTS
 * GET /api/v1/crm/accounts
 */
crmRouter.get('/accounts', async (req: Request, res: Response) => {
  try {
    const accounts = await crmService.getAccounts();
    return res.json({
      success: true,
      count: accounts.length,
      accounts
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'ACCOUNTS_FETCH_FAILED', message: err.message });
  }
});

/**
 * 3. SALES PIPELINE DEALS
 * GET /api/v1/crm/deals
 * POST /api/v1/crm/deals
 * PUT /api/v1/crm/deals/:dealId/stage
 */
crmRouter.get('/deals', async (req: Request, res: Response) => {
  try {
    const deals = await crmService.getDeals();
    return res.json({
      success: true,
      count: deals.length,
      deals
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DEALS_FETCH_FAILED', message: err.message });
  }
});

crmRouter.post('/deals', async (req: Request, res: Response) => {
  try {
    const { title, accountName, dealStage, dealValueZar, probabilityPercentage, expectedCloseDate, tenderReferenceNumber, leadSource, assignedOwner } = req.body;

    if (!title || !accountName || !dealValueZar) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_DEAL_FIELDS',
        message: 'Title, accountName, and dealValueZar are required.'
      });
    }

    const deal = await crmService.createDeal({
      title,
      accountName,
      dealStage: dealStage || 'LEAD',
      dealValueZar: Number(dealValueZar),
      probabilityPercentage: Number(probabilityPercentage) || 20,
      expectedCloseDate: expectedCloseDate || new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString(),
      tenderReferenceNumber,
      leadSource: leadSource || 'SITA_EGOV_TENDER',
      assignedOwner: assignedOwner || 'Account Executive'
    });

    return res.status(201).json({
      success: true,
      message: `Sales deal '${deal.title}' created successfully.`,
      deal
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DEAL_CREATE_FAILED', message: err.message });
  }
});

crmRouter.put('/deals/:dealId/stage', async (req: Request, res: Response) => {
  try {
    const { dealId } = req.params;
    const { stage } = req.body;

    if (!stage) {
      return res.status(400).json({ success: false, error: 'MISSING_STAGE', message: 'Stage is required.' });
    }

    const deal = await crmService.updateDealStage(dealId, stage);

    return res.json({
      success: true,
      message: `Deal stage updated to '${stage}'.`,
      deal
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: 'DEAL_UPDATE_FAILED', message: err.message });
  }
});

/**
 * 4. SCHOOL ONBOARDING WORKFLOWS
 * GET /api/v1/crm/school-onboarding
 */
crmRouter.get('/school-onboarding', async (req: Request, res: Response) => {
  try {
    const onboardings = await crmService.getSchoolOnboardings();
    return res.json({
      success: true,
      count: onboardings.length,
      schoolOnboardings: onboardings
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'SCHOOL_ONBOARDING_FETCH_FAILED', message: err.message });
  }
});

/**
 * 5. PARTNER ORGANIZATIONS
 * GET /api/v1/crm/partners
 */
crmRouter.get('/partners', async (req: Request, res: Response) => {
  try {
    const partners = await crmService.getPartners();
    return res.json({
      success: true,
      count: partners.length,
      partners
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'PARTNERS_FETCH_FAILED', message: err.message });
  }
});

/**
 * 6. CONTRACT LIFECYCLE & RENEWALS
 * GET /api/v1/crm/contracts
 */
crmRouter.get('/contracts', async (req: Request, res: Response) => {
  try {
    const contracts = await crmService.getContracts();
    return res.json({
      success: true,
      count: contracts.length,
      contracts
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'CONTRACTS_FETCH_FAILED', message: err.message });
  }
});

/**
 * 7. CHURN RISK ANALYTICS
 * GET /api/v1/crm/churn-risks
 */
crmRouter.get('/churn-risks', async (req: Request, res: Response) => {
  try {
    const churnRisks = await crmService.getChurnRisks();
    return res.json({
      success: true,
      count: churnRisks.length,
      churnRisks
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'CHURN_RISKS_FETCH_FAILED', message: err.message });
  }
});
