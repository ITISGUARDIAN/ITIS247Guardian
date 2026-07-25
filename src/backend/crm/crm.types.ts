// ITIS Business Operations, CRM & Customer Success Types
// Defines structures for Sales Pipeline, Government Accounts, School Onboarding, Partner Management, Contracts, Renewal Forecasting & Churn Analytics.

export type AccountType = 'PROVINCIAL_DEPT_EDUCATION' | 'PROVINCIAL_DEPT_TRANSPORT' | 'MUNICIPALITY' | 'SCHOOL_DISTRICT' | 'TRANSPORT_CONTRACTOR' | 'TELEMATICS_OEM';

export type DealStage = 'LEAD' | 'TENDER_QUALIFICATION' | 'PROPOSAL_SUBMITTED' | 'GOVERNMENT_APPROVAL' | 'CONTRACT_SIGNED' | 'CLOSED_LOST';

export type HealthScoreStatus = 'EXCELLENT' | 'STABLE' | 'AT_RISK' | 'CRITICAL_CHURN_RISK';

export interface GovernmentAccount {
  accountId: string;
  accountName: string; // e.g. Gauteng Department of Education (GDE)
  accountType: AccountType;
  province: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  annualContractValueZar: number; // e.g. R45,000,000
  contractStartDate: string;
  contractEndDate: string;
  healthScore: number; // 0 - 100
  healthStatus: HealthScoreStatus;
  activeSchoolsCount: number;
  activeVehiclesCount: number;
  assignedAccountManager: string;
}

export interface SalesPipelineDeal {
  dealId: string;
  title: string;
  accountName: string;
  dealStage: DealStage;
  dealValueZar: number;
  probabilityPercentage: number;
  expectedCloseDate: string;
  tenderReferenceNumber?: string;
  leadSource: 'SITA_EGOV_TENDER' | 'PROVINCIAL_MANDATE' | 'DIRECT_SCHOOL_INQUIRY' | 'PARTNER_REFERRAL';
  assignedOwner: string;
  updatedAt: string;
}

export interface SchoolOnboardingWorkflow {
  onboardingId: string;
  schoolEmisCode: string;
  schoolName: string;
  province: string;
  targetGoLiveDate: string;
  currentMilestone: 'EMIS_DATA_IMPORT' | 'PARENT_CONSENT_COLLECTION' | 'RFID_TAG_DISTRIBUTION' | 'DRIVER_APP_TRAINING' | 'LIVE_DISPATCH_TEST' | 'COMPLETED';
  progressPercentage: number; // 0 to 100%
  completedMilestones: string[];
  blockersCount: number;
  assignedOnboardingLead: string;
}

export interface PartnerOrganization {
  partnerId: string;
  partnerName: string; // e.g. Mix Telematics, Netstar, Tshwane Bus Operators Association
  partnerCategory: 'TELEMATICS_OEM' | 'TRANSPORT_CONTRACTOR' | 'HARDWARE_VENDOR' | 'PAYMENT_GATEWAY';
  status: 'ACTIVE_CERTIFIED' | 'PENDING_ONBOARDING' | 'SUSPENDED';
  contractedBusesCount: number;
  slaAdherencePercentage: number;
  supportTicketVolumeMonthly: number;
}

export interface ContractLifecycleItem {
  contractId: string;
  contractNumber: string; // e.g. CT-2026-GDE-01
  accountName: string;
  valueZar: number;
  startDate: string;
  endDate: string;
  daysToRenewal: number;
  renewalStatus: 'RENEWAL_CONFIRMED' | 'IN_RENEGOTIATION' | 'EXPIRING_SOON' | 'AUTO_RENEW';
  autoRenewEnabled: boolean;
  signedDocumentUrl?: string;
}

export interface ChurnRiskMetric {
  accountId: string;
  accountName: string;
  riskScore: number; // 0 to 100
  primaryRiskFactor: string; // e.g. "Low RFID Tap Adoption (<60%)" or "High P1 Ticket Volume"
  arrValueZar: number;
  mitigationPlan: string;
}

export interface CrmCustomerSuccessOverview {
  totalArrZar: number;
  activeGovernmentAccountsCount: number;
  totalDealsInPipelineValueZar: number;
  weightedPipelineValueZar: number;
  onboardingSchoolsCount: number;
  averageCustomerHealthScore: number;
  renewalRatePercentage: number;
  churnRiskAccountsCount: number;
}
