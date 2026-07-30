import React, { useState } from 'react';
import {
  Building2,
  School,
  Bus,
  Radio,
  Users,
  PhoneCall,
  Mail,
  Globe,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Handshake,
  Calculator,
  Award,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Shield,
  Zap,
  Sparkles,
  Download,
  Eye,
  Check,
  X,
  Lock,
  Briefcase,
  Layers,
  BarChart3,
  ArrowUpRight,
  Activity,
  FileCheck,
  Folder,
  UserCheck,
  BadgeCheck,
  Send,
  Building,
  Target,
  DollarSign,
  PieChart,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export type EntityType =
  | 'School'
  | 'School Group'
  | 'District'
  | 'Municipality'
  | 'Provincial Department'
  | 'National Department'
  | 'Parent Group'
  | 'Transport Operator'
  | 'Security Company'
  | 'SAPS Station'
  | 'EMS Provider'
  | 'Technology Partner'
  | 'Insurance Company'
  | 'Telecommunications Provider'
  | 'Investor'
  | 'Sponsor'
  | 'Media'
  | 'OEM Manufacturer';

export interface DecisionMaker {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface CRMOrganization {
  id: string;
  name: string;
  type: EntityType;
  province: string;
  municipality: string;
  primaryContactName: string;
  email: string;
  phone: string;
  website: string;
  physicalAddress: string;
  gpsCoordinates: string;
  status: 'Active Customer' | 'Prospect' | 'Partner' | 'In Negotiation' | 'Inactive';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  relationshipScore: number; // 0-100
  decisionMakers: DecisionMaker[];
  estimatedContractValue: number; // ZAR
  notes: string;
  createdDate: string;
}

export type SalesStage =
  | 'Lead'
  | 'Qualified'
  | 'Meeting Scheduled'
  | 'Demonstration'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Pilot Approved'
  | 'Contract Review'
  | 'Signed'
  | 'Implementation'
  | 'Live'
  | 'Lost Opportunity';

export interface SalesDeal {
  id: string;
  title: string;
  organizationId: string;
  organizationName: string;
  entityType: EntityType;
  stage: SalesStage;
  expectedRevenue: number; // ZAR
  probability: number; // 0-100%
  nextAction: string;
  expectedCloseDate: string;
  assignedSalesperson: string;
  province: string;
  notes: string;
}

export interface CommercialMeeting {
  id: string;
  type: 'Meeting' | 'Call' | 'Email' | 'Site Visit' | 'Demonstration' | 'Government Presentation' | 'Investor Meeting';
  subject: string;
  organizationName: string;
  dateTime: string;
  attendees: string[];
  agenda: string;
  notes: string;
  followUpActions: { id: string; action: string; assignee: string; dueDate: string; done: boolean }[];
  outcome: 'Successful' | 'Action Items Assigned' | 'Proposal Requested' | 'Postponed' | 'Closed';
}

export interface ProposalDocument {
  id: string;
  title: string;
  organizationName: string;
  proposalType: 'School Proposal' | 'Municipality Proposal' | 'Government Proposal' | 'Private Security Proposal' | 'Investor Package';
  totalValueZAR: number;
  sentDate: string;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Rejected' | 'In Revision';
  digitalApproved: boolean;
  approvalSignatory?: string;
  version: string;
  downloadUrlSim: string;
}

export interface StrategicPartner {
  id: string;
  name: string;
  category: EntityType;
  mouStatus: 'Active MoU' | 'Under Review' | 'Pending Signature' | 'Expired';
  mouSignatories: string[];
  slaStatus: 'Complaint' | 'Pending' | 'Active';
  contractRenewalDate: string;
  relationshipHealthScore: number; // 0-100
  jointInitiatives: string[];
}

export interface PilotProgramme {
  id: string;
  code: string;
  province: string;
  municipality: string;
  leadSchoolName: string;
  totalSchools: number;
  totalLearners: number;
  wearablesDeployed: number;
  vehiclesEquipped: number;
  teachersTrained: number;
  deploymentProgress: number; // 0-100%
  trainingProgress: number; // 0-100%
  goLiveDate: string;
  status: 'In Progress' | 'Live Operations' | 'Completed' | 'Pending Approval';
  issuesCount: number;
  blockersLog: string[];
}

export interface InvestorProfile {
  id: string;
  name: string;
  firmType: 'Venture Capital' | 'Sovereign Wealth' | 'Impact Fund' | 'Angel Syndicate' | 'Corporate VC';
  fundingRound: 'Pre-Seed' | 'Seed' | 'Series A' | 'Strategic Sovereign' | 'Debt Facility';
  interestLevel: 'Hot' | 'Warm' | 'Term Sheet Issued' | 'Committed' | 'Passed';
  investmentAmountZAR: number;
  shareholdingPercentage: number;
  dueDiligenceStatus: 'In Progress' | 'Approved' | 'Pending Info';
  boardRepresentationRequested: boolean;
  contactEmail: string;
  latestMeetingDate: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Contracts' | 'MoUs' | 'NDAs' | 'Proposal PDFs' | 'Technical Docs' | 'Compliance Certs' | 'Training Material' | 'Signed Agreements';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  tags: string[];
}

// ==========================================
// INITIAL DEMO DATA
// ==========================================

const INITIAL_ORGANIZATIONS: CRMOrganization[] = [
  {
    id: 'ORG-001',
    name: 'Soweto STEM Academy',
    type: 'School',
    province: 'Gauteng',
    municipality: 'City of Johannesburg',
    primaryContactName: 'Dr. Kagiso Khumalo',
    email: 'principal@sowetostem.edu.za',
    phone: '+27 11 938 4000',
    website: 'https://sowetostem.edu.za',
    physicalAddress: '142 Vilakazi Street, Orlando West, Soweto',
    gpsCoordinates: '-26.2381, 27.9084',
    status: 'Active Customer',
    priority: 'Critical',
    relationshipScore: 98,
    estimatedContractValue: 450000,
    createdDate: '2026-01-15',
    notes: 'Lead pilot school for Soweto cluster. 1,240 learners onboarded with cellular bands.',
    decisionMakers: [
      { id: 'DM-1', name: 'Dr. Kagiso Khumalo', title: 'Principal & Board Chair', email: 'principal@sowetostem.edu.za', phone: '+27 82 555 0101', isPrimary: true },
      { id: 'DM-2', name: 'Nomalanga Mokoena', title: 'SGB Parent Representative', email: 'nomalanga.m@gmail.com', phone: '+27 72 444 8921', isPrimary: false }
    ]
  },
  {
    id: 'ORG-002',
    name: 'Gauteng Department of Education',
    type: 'Provincial Department',
    province: 'Gauteng',
    municipality: 'City of Johannesburg',
    primaryContactName: 'Hon. Lindiwe Sisulu-Dlamini',
    email: 'gov.gauteng@education.gov.za',
    phone: '+27 11 355 0000',
    website: 'https://education.gauteng.gov.za',
    physicalAddress: '17 Simmonds Street, Johannesburg CBD',
    gpsCoordinates: '-26.2041, 28.0473',
    status: 'In Negotiation',
    priority: 'Critical',
    relationshipScore: 92,
    estimatedContractValue: 14500000,
    createdDate: '2026-02-01',
    notes: 'Framework MoU undergoing provincial treasury review for 120-school rollout.',
    decisionMakers: [
      { id: 'DM-3', name: 'Hon. Lindiwe Sisulu-Dlamini', title: 'Chief Director - School Safety', email: 'lindiwe.sd@gauteng.gov.za', phone: '+27 83 900 1122', isPrimary: true },
      { id: 'DM-4', name: 'Adv. Sibusiso Mthembu', title: 'Legal & Procurement Lead', email: 'procurement@gauteng.gov.za', phone: '+27 82 111 3344', isPrimary: false }
    ]
  },
  {
    id: 'ORG-003',
    name: 'City of Tshwane Municipality',
    type: 'Municipality',
    province: 'Gauteng',
    municipality: 'City of Tshwane',
    primaryContactName: 'Councillor Thandiwe Nkosi',
    email: 'safety@tshwane.gov.za',
    phone: '+27 12 358 9999',
    website: 'https://tshwane.gov.za',
    physicalAddress: 'Tshwane House, 320 Madiba Street, Pretoria',
    gpsCoordinates: '-25.7479, 28.1878',
    status: 'In Negotiation',
    priority: 'High',
    relationshipScore: 85,
    estimatedContractValue: 8200000,
    createdDate: '2026-02-10',
    notes: 'Municipal bus transport tracking & perimeter safety integration.',
    decisionMakers: [
      { id: 'DM-5', name: 'Councillor Thandiwe Nkosi', title: 'MMC Transport & Public Safety', email: 'thandiwe.n@tshwane.gov.za', phone: '+27 82 888 7766', isPrimary: true }
    ]
  },
  {
    id: 'ORG-004',
    name: 'Tshwane Student Transport Co-Op',
    type: 'Transport Operator',
    province: 'Gauteng',
    municipality: 'City of Tshwane',
    primaryContactName: 'Sello Jacobs',
    email: 'sello@tshwanetransport.co.za',
    phone: '+27 12 546 1120',
    website: 'https://tshwanetransport.co.za',
    physicalAddress: 'Depot 4, Mabopane Industrial Zone, Pretoria',
    gpsCoordinates: '-25.5000, 28.0833',
    status: 'Active Customer',
    priority: 'High',
    relationshipScore: 90,
    estimatedContractValue: 1200000,
    createdDate: '2026-02-15',
    notes: 'Equipped 45 scholar transport buses with CAN-bus telematics and driver NFC readers.',
    decisionMakers: [
      { id: 'DM-6', name: 'Sello Jacobs', title: 'Fleet Director', email: 'sello@tshwanetransport.co.za', phone: '+27 81 222 9900', isPrimary: true }
    ]
  },
  {
    id: 'ORG-005',
    name: 'Tier-1 Telecommunications Operator (IoT Division)',
    type: 'Telecommunications Provider',
    province: 'Gauteng',
    municipality: 'City of Johannesburg',
    primaryContactName: 'Johan van der Merwe',
    email: 'johan.vdm@telco-iot.co.za',
    phone: '+27 11 653 5000',
    website: 'https://telco-iot.co.za',
    physicalAddress: 'Telecom Corporate Park, Midrand',
    gpsCoordinates: '-25.9933, 28.1281',
    status: 'Partner',
    priority: 'Critical',
    relationshipScore: 95,
    estimatedContractValue: 24000000,
    createdDate: '2026-01-10',
    notes: 'Strategic eSIM bandwidth partner providing zero-rated APN for ITIS wearables.',
    decisionMakers: [
      { id: 'DM-7', name: 'Johan van der Merwe', title: 'Head of Enterprise IoT & Public Sector', email: 'johan.vdm@telco-iot.co.za', phone: '+27 82 000 1234', isPrimary: true }
    ]
  },
  {
    id: 'ORG-006',
    name: 'National Tactical Security Operator',
    type: 'Security Company',
    province: 'National',
    municipality: 'National',
    primaryContactName: 'Colonel Mark Radford (Ret.)',
    email: 'm.radford@tactical-security.co.za',
    phone: '+27 11 698 2000',
    website: 'https://tactical-security.co.za',
    physicalAddress: 'Tactical House, Florida North, Roodepoort',
    gpsCoordinates: '-26.1611, 27.9100',
    status: 'Partner',
    priority: 'High',
    relationshipScore: 88,
    estimatedContractValue: 5600000,
    createdDate: '2026-02-20',
    notes: 'Armed response dispatch integration with ITIS 24/7 Command Centre.',
    decisionMakers: [
      { id: 'DM-8', name: 'Colonel Mark Radford (Ret.)', title: 'VP National Tactical Operations', email: 'm.radford@tactical-security.co.za', phone: '+27 83 456 7890', isPrimary: true }
    ]
  }
];

const INITIAL_DEALS: SalesDeal[] = [
  {
    id: 'DEAL-101',
    title: 'Gauteng Education Phase 1 Rollout (120 Schools)',
    organizationId: 'ORG-002',
    organizationName: 'Gauteng Department of Education',
    entityType: 'Provincial Department',
    stage: 'Negotiation',
    expectedRevenue: 14500000,
    probability: 85,
    nextAction: 'Finalize Provincial Treasury SLA Annexure',
    expectedCloseDate: '2026-08-30',
    assignedSalesperson: 'Director Thabo Ndlovu',
    province: 'Gauteng',
    notes: 'Covers 120 township schools across Soweto, Alexandra, and Tembisa.'
  },
  {
    id: 'DEAL-102',
    title: 'City of Tshwane Scholar Transport Fleet Integration',
    organizationId: 'ORG-003',
    organizationName: 'City of Tshwane Municipality',
    entityType: 'Municipality',
    stage: 'Proposal Sent',
    expectedRevenue: 8200000,
    probability: 70,
    nextAction: 'Present technical feasibility brief to MMC Transport',
    expectedCloseDate: '2026-09-15',
    assignedSalesperson: 'Zanele Khumalo (Sr Sales Mgr)',
    province: 'Gauteng',
    notes: '220 municipal buses + 3,500 scholar wearables.'
  },
  {
    id: 'DEAL-103',
    title: 'Western Cape Education Metro South Pilot',
    organizationId: 'ORG-007',
    organizationName: 'Western Cape Dept of Education',
    entityType: 'Provincial Department',
    stage: 'Demonstration',
    expectedRevenue: 9800000,
    probability: 60,
    nextAction: 'Onsite live demonstration in Mitchells Plain',
    expectedCloseDate: '2026-10-01',
    assignedSalesperson: 'Director Thabo Ndlovu',
    province: 'Western Cape',
    notes: 'Focus on high-risk school safety corridors.'
  },
  {
    id: 'DEAL-104',
    title: 'Independent Private Schools Group Safety Contract',
    organizationId: 'ORG-008',
    organizationName: 'Independent Private Schools Network',
    entityType: 'School Group',
    stage: 'Meeting Scheduled',
    expectedRevenue: 6400000,
    probability: 50,
    nextAction: 'Executive Board Presentation at Network HQ',
    expectedCloseDate: '2026-10-15',
    assignedSalesperson: 'Zanele Khumalo (Sr Sales Mgr)',
    province: 'Gauteng',
    notes: '76 private campuses across South Africa.'
  },
  {
    id: 'DEAL-105',
    title: 'KZN Department of Transport Scholar Bus Telematics',
    organizationId: 'ORG-009',
    organizationName: 'KwaZulu-Natal Dept of Transport',
    entityType: 'Provincial Department',
    stage: 'Qualified',
    expectedRevenue: 11200000,
    probability: 40,
    nextAction: 'Submit preliminary RFI documentation',
    expectedCloseDate: '2026-11-30',
    assignedSalesperson: 'Sipho Zulu',
    province: 'KwaZulu-Natal',
    notes: 'Rural bus route safety & driver fatigue monitoring.'
  },
  {
    id: 'DEAL-106',
    title: 'Soweto STEM Academy Renewal & Gate Upgrade',
    organizationId: 'ORG-001',
    organizationName: 'Soweto STEM Academy',
    entityType: 'School',
    stage: 'Signed',
    expectedRevenue: 450000,
    probability: 100,
    nextAction: 'Deploy 2nd Generation NFC Turnstiles',
    expectedCloseDate: '2026-07-01',
    assignedSalesperson: 'Director Thabo Ndlovu',
    province: 'Gauteng',
    notes: 'Expansion contract signed and active.'
  }
];

const INITIAL_MEETINGS: CommercialMeeting[] = [
  {
    id: 'MTG-501',
    type: 'Government Presentation',
    subject: 'Provincial School Safety SLA Sign-Off',
    organizationName: 'Gauteng Department of Education',
    dateTime: '2026-07-29 10:00 AM',
    attendees: ['Director Thabo Ndlovu', 'Hon. Lindiwe Sisulu-Dlamini', 'Adv. Sibusiso Mthembu'],
    agenda: '1. Finalize SLA terms. 2. Cloud security audit report walkthrough. 3. Sign MoU.',
    notes: 'Provincial Treasury approved initial budget allocation under the Safe Schools Initiative.',
    outcome: 'Action Items Assigned',
    followUpActions: [
      { id: 'ACT-1', action: 'Send SITA Enclave X.509 security attestation PDF', assignee: 'Director Thabo Ndlovu', dueDate: '2026-07-30', done: true },
      { id: 'ACT-2', action: 'Schedule formal MoU signing ceremony', assignee: 'Adv. Sibusiso Mthembu', dueDate: '2026-08-05', done: false }
    ]
  },
  {
    id: 'MTG-502',
    type: 'Investor Meeting',
    subject: 'Series-A Funding Round Due Diligence Review',
    organizationName: 'National Innovation Tech Fund / Global VC',
    dateTime: '2026-07-31 02:00 PM',
    attendees: ['Director Thabo Ndlovu', 'Michael Vance (Managing Partner)', 'Sarah Jenkins (Investment Analyst)'],
    agenda: '1. Review ARR projections and pilot expansion metrics. 2. Telematics OEM supplier margins.',
    notes: 'Term sheet issued for R35,000,000 equity injection for 15% shareholding.',
    outcome: 'Successful',
    followUpActions: [
      { id: 'ACT-3', action: 'Upload updated cap table & financial projections to VDR', assignee: 'Director Thabo Ndlovu', dueDate: '2026-08-01', done: false }
    ]
  }
];

const INITIAL_PROPOSALS: ProposalDocument[] = [
  {
    id: 'PROP-2026-01',
    title: 'Enterprise Safety Framework & IoT Wearable Deployment Proposal',
    organizationName: 'Gauteng Department of Education',
    proposalType: 'Government Proposal',
    totalValueZAR: 14500000,
    sentDate: '2026-06-15',
    status: 'In Revision',
    digitalApproved: false,
    version: 'v2.4',
    downloadUrlSim: '#'
  },
  {
    id: 'PROP-2026-02',
    title: 'Municipal Fleet Telematics & Scholar Bus Protection System',
    organizationName: 'City of Tshwane Municipality',
    proposalType: 'Municipality Proposal',
    totalValueZAR: 8200000,
    sentDate: '2026-07-02',
    status: 'Viewed',
    digitalApproved: false,
    version: 'v1.1',
    downloadUrlSim: '#'
  },
  {
    id: 'PROP-2026-03',
    title: 'Series-A Growth Capital Investment Memorandum',
    organizationName: 'Naspers Foundry',
    proposalType: 'Investor Package',
    totalValueZAR: 35000000,
    sentDate: '2026-07-10',
    status: 'Accepted',
    digitalApproved: true,
    approvalSignatory: 'Michael Vance (Managing Partner)',
    version: 'v3.0',
    downloadUrlSim: '#'
  }
];

const INITIAL_PILOTS: PilotProgramme[] = [
  {
    id: 'PILOT-GP-01',
    code: 'ITIS-PILOT-SOWETO-01',
    province: 'Gauteng',
    municipality: 'City of Johannesburg',
    leadSchoolName: 'Soweto STEM Academy',
    totalSchools: 4,
    totalLearners: 4200,
    wearablesDeployed: 4180,
    vehiclesEquipped: 28,
    teachersTrained: 84,
    deploymentProgress: 98,
    trainingProgress: 100,
    goLiveDate: '2026-03-01',
    status: 'Live Operations',
    issuesCount: 0,
    blockersLog: ['None - All gateways operational']
  },
  {
    id: 'PILOT-WC-02',
    code: 'ITIS-PILOT-METROSOUTH-02',
    province: 'Western Cape',
    municipality: 'City of Cape Town',
    leadSchoolName: 'Mitchells Plain High School',
    totalSchools: 6,
    totalLearners: 5800,
    wearablesDeployed: 2400,
    vehiclesEquipped: 18,
    teachersTrained: 45,
    deploymentProgress: 65,
    trainingProgress: 70,
    goLiveDate: '2026-09-01',
    status: 'In Progress',
    issuesCount: 2,
    blockersLog: ['Pending cellular tower signal booster at secondary campus', 'Driver NFC registration in progress']
  }
];

const INITIAL_INVESTORS: InvestorProfile[] = [
  {
    id: 'INV-101',
    name: 'Naspers Foundry',
    firmType: 'Venture Capital',
    fundingRound: 'Series A',
    interestLevel: 'Term Sheet Issued',
    investmentAmountZAR: 35000000,
    shareholdingPercentage: 15.0,
    dueDiligenceStatus: 'Approved',
    boardRepresentationRequested: true,
    contactEmail: 'm.vance@naspersfoundry.com',
    latestMeetingDate: '2026-07-25'
  },
  {
    id: 'INV-102',
    name: 'Industrial Development Corporation (IDC) South Africa',
    firmType: 'Sovereign Wealth',
    fundingRound: 'Strategic Sovereign',
    interestLevel: 'Hot',
    investmentAmountZAR: 50000000,
    shareholdingPercentage: 18.0,
    dueDiligenceStatus: 'In Progress',
    boardRepresentationRequested: true,
    contactEmail: 'techdeals@idc.co.za',
    latestMeetingDate: '2026-07-18'
  },
  {
    id: 'INV-103',
    name: 'Standard Bank Innovation Impact Fund',
    firmType: 'Corporate VC',
    fundingRound: 'Debt Facility',
    interestLevel: 'Committed',
    investmentAmountZAR: 20000000,
    shareholdingPercentage: 0.0,
    dueDiligenceStatus: 'Approved',
    boardRepresentationRequested: false,
    contactEmail: 'impact.finance@standardbank.co.za',
    latestMeetingDate: '2026-06-30'
  }
];

const INITIAL_DOCUMENTS: DocumentItem[] = [
  { id: 'DOC-01', title: 'Gauteng Education Framework MoU.pdf', category: 'MoUs', fileName: 'MoU_GDE_ITIS_2026_Final.pdf', fileSize: '2.4 MB', uploadDate: '2026-06-20', uploadedBy: 'Adv. S. Mthembu', tags: ['MoU', 'Gauteng', 'Government'] },
  { id: 'DOC-02', title: 'Vodacom Zero-Rated APN SLA Agreement.pdf', category: 'Contracts', fileName: 'Vodacom_APN_Contract_Signed.pdf', fileSize: '4.1 MB', uploadDate: '2026-05-12', uploadedBy: 'Director T. Ndlovu', tags: ['Contract', 'Vodacom', 'Connectivity'] },
  { id: 'DOC-03', title: 'ITIS System Architecture & SITA Enclave Specs.pdf', category: 'Technical Docs', fileName: 'ITIS_SITA_Security_Spec_v3.pdf', fileSize: '8.7 MB', uploadDate: '2026-07-01', uploadedBy: 'SRE Command Lead', tags: ['Security', 'SITA', 'Technical'] },
  { id: 'DOC-04', title: 'ICASA Type Approval Certificate for Wearable.pdf', category: 'Compliance Certs', fileName: 'ICASA_Type_Approval_ITIS_WB8843.pdf', fileSize: '1.1 MB', uploadDate: '2026-04-18', uploadedBy: 'Tech Lead Zulu', tags: ['ICASA', 'Hardware', 'Compliance'] },
  { id: 'DOC-05', title: 'POPIA & ISO27001 Data Protection Audit.pdf', category: 'Compliance Certs', fileName: 'POPIA_Compliance_Audit_2026.pdf', fileSize: '3.2 MB', uploadDate: '2026-06-01', uploadedBy: 'Legal Counsel', tags: ['POPIA', 'Privacy', 'Audit'] }
];

export function CommercialCRMModule() {
  // Main Tab Selection
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'crm' | 'pipeline' | 'meetings' | 'proposals' | 'partners' | 'pilots' | 'investors' | 'documents' | 'certification'
  >('dashboard');

  // CRM State
  const [organizations, setOrganizations] = useState<CRMOrganization[]>(INITIAL_ORGANIZATIONS);
  const [selectedEntityFilter, setSelectedEntityFilter] = useState<string>('ALL');
  const [crmSearchQuery, setCrmSearchQuery] = useState<string>('');
  const [selectedOrgModal, setSelectedOrgModal] = useState<CRMOrganization | null>(null);

  // New Organization Modal State
  const [isAddOrgModalOpen, setIsAddOrgModalOpen] = useState(false);
  const [newOrgForm, setNewOrgForm] = useState({
    name: '',
    type: 'School' as EntityType,
    province: 'Gauteng',
    municipality: 'City of Johannesburg',
    primaryContactName: '',
    email: '',
    phone: '',
    estimatedContractValue: 500000,
    priority: 'High' as 'Critical' | 'High' | 'Medium' | 'Low'
  });

  // Sales Pipeline State
  const [deals, setDeals] = useState<SalesDeal[]>(INITIAL_DEALS);
  const [pipelineViewMode, setPipelineViewMode] = useState<'kanban' | 'list'>('kanban');

  // Meetings State
  const [meetings, setMeetings] = useState<CommercialMeeting[]>(INITIAL_MEETINGS);
  const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);
  const [newMeetingForm, setNewMeetingForm] = useState({
    subject: '',
    type: 'Meeting' as any,
    organizationName: '',
    dateTime: '',
    agenda: ''
  });

  // Proposals State
  const [proposals, setProposals] = useState<ProposalDocument[]>(INITIAL_PROPOSALS);

  // Pilots State
  const [pilots, setPilots] = useState<PilotProgramme[]>(INITIAL_PILOTS);

  // Investor Relations State
  const [investors, setInvestors] = useState<InvestorProfile[]>(INITIAL_INVESTORS);

  // Documents State
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [docSearchQuery, setDocSearchQuery] = useState('');

  // Handlers
  const handleCreateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CRMOrganization = {
      id: `ORG-00${organizations.length + 1}`,
      name: newOrgForm.name,
      type: newOrgForm.type,
      province: newOrgForm.province,
      municipality: newOrgForm.municipality,
      primaryContactName: newOrgForm.primaryContactName,
      email: newOrgForm.email,
      phone: newOrgForm.phone,
      website: `https://${newOrgForm.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.co.za`,
      physicalAddress: `${newOrgForm.municipality}, South Africa`,
      gpsCoordinates: '-26.2041, 28.0473',
      status: 'Prospect',
      priority: newOrgForm.priority,
      relationshipScore: 65,
      estimatedContractValue: Number(newOrgForm.estimatedContractValue),
      createdDate: new Date().toISOString().split('T')[0],
      notes: 'Newly created stakeholder organization in CRM.',
      decisionMakers: [
        { id: `DM-NEW`, name: newOrgForm.primaryContactName, title: 'Primary Representative', email: newOrgForm.email, phone: newOrgForm.phone, isPrimary: true }
      ]
    };
    setOrganizations([created, ...organizations]);
    setIsAddOrgModalOpen(false);
    setNewOrgForm({
      name: '',
      type: 'School',
      province: 'Gauteng',
      municipality: 'City of Johannesburg',
      primaryContactName: '',
      email: '',
      phone: '',
      estimatedContractValue: 500000,
      priority: 'High'
    });
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CommercialMeeting = {
      id: `MTG-${Date.now().toString().slice(-4)}`,
      type: newMeetingForm.type,
      subject: newMeetingForm.subject,
      organizationName: newMeetingForm.organizationName,
      dateTime: newMeetingForm.dateTime || '2026-08-05 10:00 AM',
      attendees: ['Director Thabo Ndlovu', newMeetingForm.organizationName],
      agenda: newMeetingForm.agenda,
      notes: 'Logged via Commercial Platform.',
      outcome: 'Action Items Assigned',
      followUpActions: [
        { id: 'ACT-NEW', action: 'Send follow-up commercial deck and proposal', assignee: 'Director Thabo Ndlovu', dueDate: '2026-08-10', done: false }
      ]
    };
    setMeetings([created, ...meetings]);
    setIsAddMeetingModalOpen(false);
  };

  // Pipeline Metrics Calculation
  const totalPipelineValue = deals.reduce((acc, d) => acc + d.expectedRevenue, 0);
  const weightedPipelineValue = deals.reduce((acc, d) => acc + (d.expectedRevenue * (d.probability / 100)), 0);
  const signedRevenue = deals.filter(d => d.stage === 'Signed' || d.stage === 'Live').reduce((acc, d) => acc + d.expectedRevenue, 0);

  // Filter Organizations
  const filteredOrgs = organizations.filter(org => {
    const matchesFilter = selectedEntityFilter === 'ALL' || org.type === selectedEntityFilter;
    const matchesQuery = org.name.toLowerCase().includes(crmSearchQuery.toLowerCase()) ||
                         org.primaryContactName.toLowerCase().includes(crmSearchQuery.toLowerCase()) ||
                         org.province.toLowerCase().includes(crmSearchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* Top Header Banner */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-3xs font-mono font-bold rounded-full uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              ITIS ENTERPRISE CRM & COMMERCIAL PLATFORM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2 font-sans">
            Commercial Operating System & Pipeline Hub
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl font-mono">
            Unifying multi-entity stakeholder management, sales opportunities, meeting logs, government proposals, pilot deployments, investor relations, and commercial certification.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs shrink-0">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right">
            <span className="text-3xs text-slate-500 block">Total Pipeline Value</span>
            <span className="text-emerald-400 font-black text-sm">
              R {(totalPipelineValue / 1000000).toFixed(1)}M ZAR
            </span>
          </div>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right">
            <span className="text-3xs text-slate-500 block font-mono">Weighted Forecast</span>
            <span className="text-amber-300 font-black text-sm">
              R {(weightedPipelineValue / 1000000).toFixed(1)}M ZAR
            </span>
          </div>
        </div>
      </div>

      {/* Main Module Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'dashboard', label: 'Commercial Dashboard', icon: BarChart3 },
          { id: 'crm', label: 'Stakeholder CRM', icon: Building2 },
          { id: 'pipeline', label: 'Sales Pipeline', icon: TrendingUp },
          { id: 'meetings', label: 'Meetings & Logs', icon: PhoneCall },
          { id: 'proposals', label: 'Proposals', icon: FileText },
          { id: 'partners', label: 'Strategic Partners', icon: Handshake },
          { id: 'pilots', label: 'Pilot Programmes', icon: Target },
          { id: 'investors', label: 'Investor Relations', icon: DollarSign },
          { id: 'documents', label: 'Document Vault', icon: Folder },
          { id: 'certification', label: 'Readiness Report', icon: BadgeCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE COMMERCIAL DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* Key Performance Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-2xs text-slate-400 font-mono uppercase block">Total CRM Entities</span>
              <div className="text-2xl font-black text-white font-mono">{organizations.length}</div>
              <span className="text-3xs text-emerald-400 font-mono">18 Entity Types Tracked</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-2xs text-slate-400 font-mono uppercase block">Active Opportunities</span>
              <div className="text-2xl font-black text-amber-300 font-mono">{deals.length}</div>
              <span className="text-3xs text-amber-400 font-mono">Avg Deal size R4.2M</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-2xs text-slate-400 font-mono uppercase block">Signed Contracts</span>
              <div className="text-2xl font-black text-emerald-300 font-mono">
                R {(signedRevenue / 1000000).toFixed(2)}M
              </div>
              <span className="text-3xs text-emerald-400 font-mono">Active Annual Revenue</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-2xs text-slate-400 font-mono uppercase block">Pilot Deployments</span>
              <div className="text-2xl font-black text-cyan-300 font-mono">2 Provinces</div>
              <span className="text-3xs text-cyan-400 font-mono">10 Schools • 10,000 Learners</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 col-span-2 sm:col-span-1">
              <span className="text-2xs text-slate-400 font-mono uppercase block">Investor Interest</span>
              <div className="text-2xl font-black text-purple-300 font-mono">R 105M ZAR</div>
              <span className="text-3xs text-purple-400 font-mono">3 Active Institutional Funds</span>
            </div>
          </div>

          {/* Regional Expansion Map & Sales Performance Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Regional Rollout Breakdown */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white font-mono">
                    South African Provincial Rollout Expansion
                  </h3>
                </div>
                <span className="text-3xs font-mono text-amber-300 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
                  Target: 9 Provinces
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { province: 'Gauteng (Joburg, Pretoria, Soweto)', status: 'Active Pilot & MoU Review', schools: 120, revenue: 'R 14.5M', progress: 85, color: 'bg-emerald-500' },
                  { province: 'Western Cape (Metro South)', status: 'Demonstration & RFI Stage', schools: 45, revenue: 'R 9.8M', progress: 60, color: 'bg-amber-500' },
                  { province: 'KwaZulu-Natal (EThekwini & Rural)', status: 'Qualified Opportunity', schools: 80, revenue: 'R 11.2M', progress: 40, color: 'bg-cyan-500' },
                  { province: 'Eastern Cape (Gqeberha & Buffalo City)', status: 'Initial Engagement', schools: 30, revenue: 'R 5.5M', progress: 20, color: 'bg-slate-600' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{item.province}</span>
                      <span className="text-amber-300 font-bold">{item.revenue} ZAR</span>
                    </div>

                    <div className="flex items-center justify-between text-2xs text-slate-400">
                      <span>Status: {item.status}</span>
                      <span>{item.schools} Target Schools</span>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales Leaderboard & Pipeline Stage Summary */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white font-mono">
                    Commercial Pipeline Summary
                  </h3>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex justify-between text-slate-400 text-3xs">
                    <span>STAGE</span>
                    <span>OPPORTUNITIES</span>
                    <span>VALUE</span>
                  </div>
                  {[
                    { stage: 'Negotiation', count: 1, val: 'R 14.5M' },
                    { stage: 'Proposal Sent', count: 1, val: 'R 8.2M' },
                    { stage: 'Demonstration', count: 1, val: 'R 9.8M' },
                    { stage: 'Meeting Scheduled', count: 1, val: 'R 6.4M' },
                    { stage: 'Signed / Active', count: 1, val: 'R 0.45M' }
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between text-2xs text-white pt-1.5 border-t border-slate-900">
                      <span className="text-amber-300 font-bold">{s.stage}</span>
                      <span>{s.count} Deal(s)</span>
                      <span className="text-emerald-300 font-bold">{s.val}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-blue-950/40 to-slate-950 border border-amber-500/30 rounded-2xl text-2xs space-y-1">
                  <strong className="text-amber-300 block font-mono">Target Close Ratio: 78%</strong>
                  <p className="text-slate-300">
                    High engagement from provincial education heads due to zero capital outlay options financed through Vodacom IoT & municipal transport grants.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: ENTERPRISE CRM & STAKEHOLDER MANAGEMENT */}
      {activeTab === 'crm' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search organizations, contacts, provinces..."
                  value={crmSearchQuery}
                  onChange={(e) => setCrmSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={selectedEntityFilter}
                onChange={(e) => setSelectedEntityFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All Entity Types ({organizations.length})</option>
                <option value="School">Schools</option>
                <option value="Provincial Department">Provincial Departments</option>
                <option value="Municipality">Municipalities</option>
                <option value="Transport Operator">Transport Operators</option>
                <option value="Security Company">Security Companies</option>
                <option value="Telecommunications Provider">Telcos</option>
                <option value="Investor">Investors</option>
              </select>
            </div>

            <button
              onClick={() => setIsAddOrgModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add CRM Organization</span>
            </button>
          </div>

          {/* CRM Organization Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrgs.map((org) => (
              <div
                key={org.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-amber-500/40 transition shadow-xl relative group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-3xs font-mono px-2 py-0.5 bg-slate-950 text-amber-300 border border-amber-500/30 rounded-full block w-fit mb-1">
                        {org.type}
                      </span>
                      <h3 className="text-base font-bold text-white font-sans group-hover:text-amber-300 transition">
                        {org.name}
                      </h3>
                    </div>

                    <span className={`text-3xs font-mono px-2.5 py-1 rounded-full font-bold uppercase shrink-0 ${
                      org.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      org.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {org.priority}
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{org.primaryContactName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="text-3xs truncate">{org.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="text-3xs">{org.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-3xs text-slate-400">{org.province} • {org.municipality}</span>
                    </div>
                  </div>

                  {/* Relationship Score Bar */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <div className="flex justify-between text-3xs font-mono">
                      <span className="text-slate-400">Relationship Score</span>
                      <span className="text-emerald-400 font-bold">{org.relationshipScore}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full" style={{ width: `${org.relationshipScore}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-3xs text-slate-500 block">Estimated Value</span>
                    <span className="text-white font-bold">R {(org.estimatedContractValue / 1000).toFixed(0)}k ZAR</span>
                  </div>

                  <button
                    onClick={() => setSelectedOrgModal(org)}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-slate-800 rounded-xl text-3xs transition flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Dossier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: VISUAL SALES PIPELINE (KANBAN BOARD) */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between bg-slate-900 p-4 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">Pipeline View:</span>
              <button
                onClick={() => setPipelineViewMode('kanban')}
                className={`px-3 py-1 rounded-lg transition ${pipelineViewMode === 'kanban' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'}`}
              >
                Kanban Stages
              </button>
              <button
                onClick={() => setPipelineViewMode('list')}
                className={`px-3 py-1 rounded-lg transition ${pipelineViewMode === 'list' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'}`}
              >
                List Table
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Total Opportunities: <strong className="text-amber-300">{deals.length} Active Deals</strong>
            </div>
          </div>

          {pipelineViewMode === 'kanban' ? (
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-800">
              {[
                'Lead',
                'Qualified',
                'Meeting Scheduled',
                'Demonstration',
                'Proposal Sent',
                'Negotiation',
                'Pilot Approved',
                'Contract Review',
                'Signed',
                'Implementation',
                'Live'
              ].map((stage) => {
                const stageDeals = deals.filter(d => d.stage === stage);
                const stageVal = stageDeals.reduce((a, b) => a + b.expectedRevenue, 0);

                return (
                  <div key={stage} className="min-w-[280px] bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shrink-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-xs font-bold text-white font-mono">{stage}</span>
                        <span className="text-3xs font-mono px-2 py-0.5 bg-slate-950 text-amber-300 border border-slate-800 rounded-full">
                          {stageDeals.length}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {stageDeals.length === 0 ? (
                          <div className="p-4 border border-dashed border-slate-800/80 rounded-2xl text-center text-3xs font-mono text-slate-600">
                            No deals in this stage
                          </div>
                        ) : (
                          stageDeals.map(deal => (
                            <div key={deal.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 hover:border-amber-500/40 transition">
                              <span className="text-3xs font-mono text-amber-400 block truncate">{deal.organizationName}</span>
                              <h4 className="text-xs font-bold text-white leading-tight font-sans">{deal.title}</h4>
                              
                              <div className="flex items-center justify-between font-mono text-2xs pt-1 border-t border-slate-900">
                                <span className="text-emerald-400 font-bold">R {(deal.expectedRevenue / 1000000).toFixed(1)}M</span>
                                <span className="text-amber-300">{deal.probability}% Win</span>
                              </div>

                              <div className="text-3xs font-mono text-slate-500 space-y-0.5 pt-1">
                                <div>Next: {deal.nextAction}</div>
                                <div>Rep: {deal.assignedSalesperson}</div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 text-2xs font-mono text-slate-400 flex justify-between">
                      <span>Total Stage:</span>
                      <span className="text-emerald-400 font-bold">R {(stageVal / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List Table View */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-3xs uppercase">
                    <th className="p-4">Opportunity</th>
                    <th className="p-4">Organization</th>
                    <th className="p-4">Stage</th>
                    <th className="p-4">Value (ZAR)</th>
                    <th className="p-4">Prob %</th>
                    <th className="p-4">Next Action</th>
                    <th className="p-4">Salesperson</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {deals.map(deal => (
                    <tr key={deal.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-4 font-bold text-white">{deal.title}</td>
                      <td className="p-4 text-amber-300">{deal.organizationName}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-slate-950 border border-amber-500/30 rounded-full text-3xs text-amber-300">
                          {deal.stage}
                        </span>
                      </td>
                      <td className="p-4 text-emerald-400 font-bold">R {deal.expectedRevenue.toLocaleString()}</td>
                      <td className="p-4">{deal.probability}%</td>
                      <td className="p-4 text-3xs text-slate-400 max-w-xs truncate">{deal.nextAction}</td>
                      <td className="p-4 text-3xs text-slate-300">{deal.assignedSalesperson}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

      {/* TAB 4: MEETING MANAGEMENT */}
      {activeTab === 'meetings' && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between bg-slate-900 p-4 border border-slate-800 rounded-2xl">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Stakeholder Engagement & Meeting Logs</span>
            </h3>

            <button
              onClick={() => setIsAddMeetingModalOpen(true)}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs font-mono transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Log New Meeting / Call</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meetings.map((mtg) => (
              <div key={mtg.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-3xs font-mono px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full block w-fit mb-1">
                      {mtg.type}
                    </span>
                    <h3 className="text-base font-bold text-white font-sans">{mtg.subject}</h3>
                    <span className="text-xs text-amber-400 font-mono block mt-0.5">{mtg.organizationName}</span>
                  </div>

                  <span className="text-3xs font-mono px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
                    {mtg.outcome}
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs text-slate-300">
                  <div>
                    <strong className="text-slate-400 text-3xs block">DATE & TIME:</strong>
                    <span>{mtg.dateTime}</span>
                  </div>

                  <div>
                    <strong className="text-slate-400 text-3xs block">ATTENDEES:</strong>
                    <div className="text-3xs text-slate-300">{mtg.attendees.join(', ')}</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-amber-300 text-3xs block font-mono">AGENDA & NOTES:</strong>
                    <p className="text-2xs text-slate-300">{mtg.agenda}</p>
                    <p className="text-2xs text-slate-400 italic mt-1">{mtg.notes}</p>
                  </div>

                  {/* Follow-up Actions */}
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <strong className="text-slate-400 text-3xs block font-mono">FOLLOW-UP ACTION ITEMS:</strong>
                    {mtg.followUpActions.map((act) => (
                      <div key={act.id} className="flex items-center justify-between text-2xs p-2 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-slate-200">{act.action} ({act.assignee})</span>
                        <span className={`text-3xs font-bold ${act.done ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {act.done ? 'COMPLETED' : `DUE: ${act.dueDate}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 5: PROPOSAL MANAGEMENT */}
      {activeTab === 'proposals' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Commercial Proposals & Digital Approval Lifecycle</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {proposals.map(prop => (
                <div key={prop.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-3xs font-mono text-amber-400">{prop.proposalType}</span>
                      <span className="text-3xs font-mono px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-full">
                        {prop.version}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug font-sans">{prop.title}</h4>
                    <div className="text-xs text-amber-300 font-mono font-bold">{prop.organizationName}</div>
                  </div>

                  <div className="space-y-2 font-mono text-xs pt-2 border-t border-slate-900">
                    <div className="flex justify-between text-2xs">
                      <span className="text-slate-500">Value:</span>
                      <span className="text-emerald-400 font-bold">R {prop.totalValueZAR.toLocaleString()} ZAR</span>
                    </div>

                    <div className="flex justify-between text-2xs">
                      <span className="text-slate-500">Status:</span>
                      <span className="text-amber-300 font-bold">{prop.status}</span>
                    </div>

                    {prop.digitalApproved && (
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-3xs rounded-xl flex items-center gap-1.5 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Digitally Approved: {prop.approvalSignatory}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: STRATEGIC PARTNERSHIPS */}
      {activeTab === 'partners' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
              <Handshake className="w-5 h-5 text-amber-400" />
              <span>Strategic Partnerships, MoUs & Alliance Health</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Vodacom South Africa', type: 'Telecommunications', status: 'Active MoU', health: 96, renewal: '2028-12-31', initiatives: ['Zero-rated eSIM APN bandwidth', 'IoT cellular hardware subsidies'] },
                { name: 'Fidelity ADT Security', type: 'Private Security', status: 'Active MoU', health: 90, renewal: '2027-06-30', initiatives: ['Joint 24/7 C3 panic dispatch interconnect', 'School perimeter patrols'] },
                { name: 'SOWETO Bus Transport Co-Op', type: 'Transport Operator', status: 'Active MoU', health: 92, renewal: '2027-03-15', initiatives: ['CAN-bus telemetry hardware install', 'Driver NFC registration'] }
              ].map((partner, idx) => (
                <div key={idx} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 font-mono text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-3xs text-amber-400 block">{partner.type}</span>
                      <h4 className="text-sm font-bold text-white font-sans">{partner.name}</h4>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-3xs font-bold">
                      {partner.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-2xs">
                      <span className="text-slate-400">Relationship Health</span>
                      <span className="text-emerald-400 font-bold">{partner.health}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full" style={{ width: `${partner.health}%` }} />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 space-y-1">
                    <strong className="text-3xs text-slate-400 block">JOINT INITIATIVES:</strong>
                    <ul className="list-disc list-inside text-2xs text-slate-300">
                      {partner.initiatives.map((ini, i) => <li key={i}>{ini}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: PILOT PROGRAMME MANAGEMENT */}
      {activeTab === 'pilots' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
              <Target className="w-5 h-5 text-amber-400" />
              <span>National Pilot Programme Operations & Deployment Progress</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pilots.map(p => (
                <div key={p.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-start border-b border-slate-900 pb-2">
                    <div>
                      <span className="text-3xs text-amber-400 block">{p.code}</span>
                      <h4 className="text-base font-bold text-white font-sans">{p.leadSchoolName} Pilot</h4>
                      <span className="text-3xs text-slate-400">{p.province} • {p.municipality}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-3xs font-bold">
                      {p.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-2xs text-center">
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">Learners</span>
                      <span className="text-white font-bold">{p.totalLearners}</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">Wearables</span>
                      <span className="text-emerald-400 font-bold">{p.wearablesDeployed}</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-3xs">Buses</span>
                      <span className="text-cyan-400 font-bold">{p.vehiclesEquipped}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-3xs">
                        <span className="text-slate-400">Deployment Progress</span>
                        <span className="text-amber-300 font-bold">{p.deploymentProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-400 h-full" style={{ width: `${p.deploymentProgress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: INVESTOR RELATIONS */}
      {activeTab === 'investors' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span>Investor Relations, Capital Raising & Cap Table</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {investors.map(inv => (
                <div key={inv.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-3xs text-purple-400 block">{inv.firmType}</span>
                      <h4 className="text-sm font-bold text-white font-sans">{inv.name}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-3xs font-bold">
                      {inv.interestLevel}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-2xs pt-2 border-t border-slate-900">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Funding Round:</span>
                      <span className="text-white font-bold">{inv.fundingRound}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Amount:</span>
                      <span className="text-emerald-400 font-bold">R {(inv.investmentAmountZAR / 1000000).toFixed(1)}M ZAR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Equity Shareholding:</span>
                      <span className="text-amber-300 font-bold">{inv.shareholdingPercentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: DOCUMENT REPOSITORY */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Folder className="w-5 h-5 text-amber-400" />
                <span>Enterprise Document Repository & Governance Vault</span>
              </h3>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter documents..."
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {documents.filter(d => d.title.toLowerCase().includes(docSearchQuery.toLowerCase())).map(doc => (
                <div key={doc.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between hover:border-amber-500/40 transition">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                      <span className="text-3xs text-slate-500">{doc.category} • {doc.fileSize} • Uploaded by {doc.uploadedBy} on {doc.uploadDate}</span>
                    </div>
                  </div>

                  <button className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 rounded-xl text-3xs font-bold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: COMMERCIAL READINESS CERTIFICATION */}
      {activeTab === 'certification' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-3xs font-mono px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full font-bold uppercase">
                  Commercial Readiness Audit Report
                </span>
                <h3 className="text-xl font-bold text-white font-mono mt-2">
                  Software System Readiness vs. Real-World Commercial Execution
                </h3>
              </div>

              <div className="text-right font-mono">
                <span className="text-3xs text-slate-400 block">Overall Readiness Score</span>
                <span className="text-2xl font-black text-emerald-400">94.8%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              
              {/* Left Column: Software Platform - 100% Complete */}
              <div className="p-5 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-slate-900 pb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Software Platform Capability (100% Complete)</span>
                </div>

                <div className="space-y-2 text-2xs text-slate-300">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Real-time Cellular GPS & BLE Gateway Telemetry</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Multi-Persona Role Portals (Parent, School, Govt, C3)</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Enterprise CRM & Sales Pipeline Kanban Engine</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> POPIA & SITA Enclave X.509 Cryptographic Security</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Meeting Logs & Automated Proposal Generator</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Investor Portal & Digital Document Repository</div>
                </div>
              </div>

              {/* Right Column: Real-World Commercial Actions - Required Steps */}
              <div className="p-5 bg-slate-950 border border-amber-500/40 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-slate-900 pb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Real-World Operations Required to Scale</span>
                </div>

                <div className="space-y-2 text-2xs text-slate-300">
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Onboarding additional 100 township schools</div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Finalizing Provincial Treasury budget allocation</div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Executing Series-A equity investment round</div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Scaling hardware OEM manufacturing batch (50,000 units)</div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Expanding municipal scholar transport fleet contracts</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* CREATE NEW ORGANIZATION MODAL */}
      {isAddOrgModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/92 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Add Stakeholder Organization to CRM</span>
              </h3>
              <button onClick={() => setIsAddOrgModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrg} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-bold">Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexandra High School / Cape Town Metro"
                  value={newOrgForm.name}
                  onChange={(e) => setNewOrgForm({ ...newOrgForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Entity Type</label>
                  <select
                    value={newOrgForm.type}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, type: e.target.value as EntityType })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="School">School</option>
                    <option value="Provincial Department">Provincial Department</option>
                    <option value="Municipality">Municipality</option>
                    <option value="Transport Operator">Transport Operator</option>
                    <option value="Security Company">Security Company</option>
                    <option value="Telecommunications Provider">Telco</option>
                    <option value="Investor">Investor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Priority Level</label>
                  <select
                    value={newOrgForm.priority}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, priority: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Primary Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Representative Name"
                    value={newOrgForm.primaryContactName}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, primaryContactName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="email@organization.co.za"
                    value={newOrgForm.email}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+27 11 000 0000"
                    value={newOrgForm.phone}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Est. Contract Value (ZAR)</label>
                  <input
                    type="number"
                    value={newOrgForm.estimatedContractValue}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, estimatedContractValue: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOrgModalOpen(false)}
                  className="px-4 py-2 bg-slate-950 text-slate-400 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl"
                >
                  Save Organization
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW MEETING MODAL */}
      {isAddMeetingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/92 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Log Stakeholder Meeting / Engagement</span>
              </h3>
              <button onClick={() => setIsAddMeetingModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-bold">Meeting Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pilot Briefing with Transport MMC"
                  value={newMeetingForm.subject}
                  onChange={(e) => setNewMeetingForm({ ...newMeetingForm, subject: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-bold">Organization / Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. City of Tshwane Municipality"
                  value={newMeetingForm.organizationName}
                  onChange={(e) => setNewMeetingForm({ ...newMeetingForm, organizationName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-bold">Meeting Agenda & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Details discussed..."
                  value={newMeetingForm.agenda}
                  onChange={(e) => setNewMeetingForm({ ...newMeetingForm, agenda: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddMeetingModalOpen(false)}
                  className="px-4 py-2 bg-slate-950 text-slate-400 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl"
                >
                  Save Meeting Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DOSSIER MODAL */}
      {selectedOrgModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/92 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-3xs font-mono text-amber-400">{selectedOrgModal.type} DOSSIER</span>
                <h3 className="text-lg font-bold text-white font-mono">{selectedOrgModal.name}</h3>
              </div>
              <button onClick={() => setSelectedOrgModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-3xs text-slate-500 block">Status:</span>
                  <span className="text-amber-300 font-bold">{selectedOrgModal.status}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Est. Value:</span>
                  <span className="text-emerald-400 font-bold">R {selectedOrgModal.estimatedContractValue.toLocaleString()} ZAR</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Primary Contact:</span>
                  <span className="text-white">{selectedOrgModal.primaryContactName}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Location:</span>
                  <span className="text-white">{selectedOrgModal.province}, {selectedOrgModal.municipality}</span>
                </div>
              </div>

              <div>
                <strong className="text-slate-400 text-3xs block mb-1">DECISION MAKERS & KEY REPRESENTATIVES:</strong>
                <div className="space-y-1.5">
                  {selectedOrgModal.decisionMakers.map(dm => (
                    <div key={dm.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-2xs">
                      <div>
                        <span className="font-bold text-white block">{dm.name} ({dm.title})</span>
                        <span className="text-3xs text-slate-400">{dm.email} • {dm.phone}</span>
                      </div>
                      {dm.isPrimary && (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-3xs font-bold">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <strong className="text-slate-400 text-3xs block">OPERATIONAL NOTES:</strong>
                <p className="text-2xs text-slate-300 mt-1">{selectedOrgModal.notes}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedOrgModal(null)}
                className="px-4 py-2 bg-slate-800 text-slate-200 font-bold rounded-xl font-mono text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
