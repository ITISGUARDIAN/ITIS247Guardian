// ITIS CRM & Customer Success Service
// Manages Government Accounts, Sales Pipeline, School Onboarding Workflows, Partners, Contracts, & Churn Analytics.

import { AuditLogger } from '../common/audit.logger';
import {
  ChurnRiskMetric,
  ContractLifecycleItem,
  CrmCustomerSuccessOverview,
  DealStage,
  GovernmentAccount,
  PartnerOrganization,
  SalesPipelineDeal,
  SchoolOnboardingWorkflow
} from './crm.types';

export class CrmService {
  private static instance: CrmService;

  // In-Memory Storage
  private accounts: Map<string, GovernmentAccount> = new Map();
  private deals: Map<string, SalesPipelineDeal> = new Map();
  private schoolOnboardings: Map<string, SchoolOnboardingWorkflow> = new Map();
  private partners: Map<string, PartnerOrganization> = new Map();
  private contracts: Map<string, ContractLifecycleItem> = new Map();
  private churnRisks: Map<string, ChurnRiskMetric> = new Map();

  private constructor() {
    this.seedInitialData();
  }

  public static getInstance(): CrmService {
    if (!CrmService.instance) {
      CrmService.instance = new CrmService();
    }
    return CrmService.instance;
  }

  private seedInitialData() {
    const now = new Date();
    const isoNow = now.toISOString();

    // 1. Seed Government Accounts
    const acc1Id = 'ACC-GDE-01';
    this.accounts.set(acc1Id, {
      accountId: acc1Id,
      accountName: 'Gauteng Department of Education (GDE)',
      accountType: 'PROVINCIAL_DEPT_EDUCATION',
      province: 'Gauteng',
      primaryContactName: 'MEC Matome Chiloane',
      primaryContactEmail: 'm.chiloane@gauteng.gov.za',
      primaryContactPhone: '+27 11 355 0000',
      annualContractValueZar: 48500000, // R48.5m ARR
      contractStartDate: '2025-04-01T00:00:00Z',
      contractEndDate: '2028-03-31T00:00:00Z',
      healthScore: 92,
      healthStatus: 'EXCELLENT',
      activeSchoolsCount: 420,
      activeVehiclesCount: 1850,
      assignedAccountManager: 'Kabelo Mokoena (Key Account Director)'
    });

    const acc2Id = 'ACC-WCED-02';
    this.accounts.set(acc2Id, {
      accountId: acc2Id,
      accountName: 'Western Cape Education Department (WCED)',
      accountType: 'PROVINCIAL_DEPT_EDUCATION',
      province: 'Western Cape',
      primaryContactName: 'Dr. David Maynier',
      primaryContactEmail: 'david.maynier@westerncape.gov.za',
      primaryContactPhone: '+27 21 467 2000',
      annualContractValueZar: 32000000, // R32m ARR
      contractStartDate: '2025-01-01T00:00:00Z',
      contractEndDate: '2027-12-31T00:00:00Z',
      healthScore: 84,
      healthStatus: 'STABLE',
      activeSchoolsCount: 280,
      activeVehiclesCount: 1100,
      assignedAccountManager: 'Sarah Jenkins (Regional Lead)'
    });

    // 2. Seed Sales Pipeline Deals
    const deal1Id = 'DEAL-KZN-01';
    this.deals.set(deal1Id, {
      dealId: deal1Id,
      title: 'KZN Department of Transport Fleet Telematics & Scholar Safety Mandate',
      accountName: 'KwaZulu-Natal Department of Transport',
      dealStage: 'GOVERNMENT_APPROVAL',
      dealValueZar: 55000000,
      probabilityPercentage: 85,
      expectedCloseDate: '2026-09-30T00:00:00Z',
      tenderReferenceNumber: 'ZNB-DOT-2026-901',
      leadSource: 'SITA_EGOV_TENDER',
      assignedOwner: 'Thabo Ndlovu (VP Sales)',
      updatedAt: isoNow
    });

    const deal2Id = 'DEAL-EC-02';
    this.deals.set(deal2Id, {
      dealId: deal2Id,
      title: 'Eastern Cape Rural Scholar Transport Real-time Monitoring Rollout',
      accountName: 'Eastern Cape Department of Education',
      dealStage: 'TENDER_QUALIFICATION',
      dealValueZar: 38000000,
      probabilityPercentage: 60,
      expectedCloseDate: '2026-11-15T00:00:00Z',
      tenderReferenceNumber: 'EC-EDU-2026-042',
      leadSource: 'PROVINCIAL_MANDATE',
      assignedOwner: 'Lindiwe Bhengu',
      updatedAt: isoNow
    });

    // 3. Seed School Onboarding Workflows
    const ob1Id = 'ONB-700141';
    this.schoolOnboardings.set(ob1Id, {
      onboardingId: ob1Id,
      schoolEmisCode: '700141029',
      schoolName: 'Soweto Comprehensive Secondary School',
      province: 'Gauteng',
      targetGoLiveDate: '2026-08-15T00:00:00Z',
      currentMilestone: 'RFID_TAG_DISTRIBUTION',
      progressPercentage: 70,
      completedMilestones: ['EMIS_DATA_IMPORT', 'PARENT_CONSENT_COLLECTION'],
      blockersCount: 0,
      assignedOnboardingLead: 'Nomvula Sithole'
    });

    const ob2Id = 'ONB-800202';
    this.schoolOnboardings.set(ob2Id, {
      onboardingId: ob2Id,
      schoolEmisCode: '800202118',
      schoolName: 'Khayelitsha Primary Academy',
      province: 'Western Cape',
      targetGoLiveDate: '2026-08-30T00:00:00Z',
      currentMilestone: 'DRIVER_APP_TRAINING',
      progressPercentage: 85,
      completedMilestones: ['EMIS_DATA_IMPORT', 'PARENT_CONSENT_COLLECTION', 'RFID_TAG_DISTRIBUTION'],
      blockersCount: 1,
      assignedOnboardingLead: 'Pieter van Zyl'
    });

    // 4. Seed Partners
    const p1Id = 'PART-MIX-01';
    this.partners.set(p1Id, {
      partnerId: p1Id,
      partnerName: 'MiX Telematics / Powerfleet Enterprise',
      partnerCategory: 'TELEMATICS_OEM',
      status: 'ACTIVE_CERTIFIED',
      contractedBusesCount: 2200,
      slaAdherencePercentage: 99.4,
      supportTicketVolumeMonthly: 12
    });

    // 5. Seed Contracts
    const c1Id = 'CT-2026-GDE';
    this.contracts.set(c1Id, {
      contractId: c1Id,
      contractNumber: 'CT-2026-GDE-01',
      accountName: 'Gauteng Department of Education',
      valueZar: 48500000,
      startDate: '2025-04-01T00:00:00Z',
      endDate: '2028-03-31T00:00:00Z',
      daysToRenewal: 615,
      renewalStatus: 'RENEWAL_CONFIRMED',
      autoRenewEnabled: true
    });

    // 6. Seed Churn Risk Metrics
    const cr1Id = 'CR-001';
    this.churnRisks.set(cr1Id, {
      accountId: 'ACC-FS-03',
      accountName: 'Free State Department of Police, Roads & Transport',
      riskScore: 68,
      primaryRiskFactor: 'Low Driver RFID Tap Adoption (< 58%) and Unresolved Support Backlog',
      arrValueZar: 14500000,
      mitigationPlan: 'Dispatch Field Customer Success Specialist to Bloemfontein depot for onsite retraining.'
    });
  }

  // API Methods
  public async getOverview(): Promise<CrmCustomerSuccessOverview> {
    const dealsList = Array.from(this.deals.values());
    const accountsList = Array.from(this.accounts.values());

    const totalArr = accountsList.reduce((acc, curr) => acc + curr.annualContractValueZar, 0);
    const pipelineTotal = dealsList.reduce((acc, curr) => acc + curr.dealValueZar, 0);
    const pipelineWeighted = dealsList.reduce((acc, curr) => acc + (curr.dealValueZar * curr.probabilityPercentage) / 100, 0);

    return {
      totalArrZar: totalArr,
      activeGovernmentAccountsCount: accountsList.length,
      totalDealsInPipelineValueZar: pipelineTotal,
      weightedPipelineValueZar: pipelineWeighted,
      onboardingSchoolsCount: this.schoolOnboardings.size,
      averageCustomerHealthScore: 88,
      renewalRatePercentage: 96.5,
      churnRiskAccountsCount: this.churnRisks.size
    };
  }

  public async getAccounts(): Promise<GovernmentAccount[]> {
    return Array.from(this.accounts.values());
  }

  public async getDeals(): Promise<SalesPipelineDeal[]> {
    return Array.from(this.deals.values());
  }

  public async createDeal(params: Omit<SalesPipelineDeal, 'dealId' | 'updatedAt'>): Promise<SalesPipelineDeal> {
    const dealId = `DEAL-${Math.floor(Math.random() * 8999 + 1000)}`;
    const deal: SalesPipelineDeal = {
      ...params,
      dealId,
      updatedAt: new Date().toISOString()
    };
    this.deals.set(dealId, deal);

    AuditLogger.recordAudit({
      action: 'SALES_PIPELINE_DEAL_CREATED',
      resource: '/api/v1/crm/deals',
      correlationId: dealId,
      metadata: { title: deal.title, valueZar: deal.dealValueZar, stage: deal.dealStage }
    });

    return deal;
  }

  public async updateDealStage(dealId: string, stage: DealStage): Promise<SalesPipelineDeal> {
    const deal = this.deals.get(dealId);
    if (!deal) throw new Error(`Deal '${dealId}' not found.`);

    deal.dealStage = stage;
    deal.updatedAt = new Date().toISOString();
    return deal;
  }

  public async getSchoolOnboardings(): Promise<SchoolOnboardingWorkflow[]> {
    return Array.from(this.schoolOnboardings.values());
  }

  public async getPartners(): Promise<PartnerOrganization[]> {
    return Array.from(this.partners.values());
  }

  public async getContracts(): Promise<ContractLifecycleItem[]> {
    return Array.from(this.contracts.values());
  }

  public async getChurnRisks(): Promise<ChurnRiskMetric[]> {
    return Array.from(this.churnRisks.values());
  }
}
