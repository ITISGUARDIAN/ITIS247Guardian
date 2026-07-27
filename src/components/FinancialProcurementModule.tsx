import React, { useState } from 'react';
import {
  CreditCard,
  Receipt,
  FileText,
  Truck,
  Warehouse,
  Users,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Plus,
  ArrowRight,
  Download,
  Building2,
  Package,
  Cpu,
  Radio,
  FileSpreadsheet,
  PieChart,
  BarChart3,
  RefreshCw,
  Search,
  Check,
  ExternalLink,
  ChevronRight,
  Send,
  Sparkles,
  Lock,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Box,
  MapPin,
  Wrench,
  ClipboardList,
  PenTool,
  HelpCircle
} from 'lucide-react';

// ==========================================
// TYPES & MOCK DATA
// ==========================================

export interface SubscriptionPlan {
  id: string;
  category: 'Parent' | 'School' | 'Transport' | 'Municipality' | 'Government' | 'Security';
  name: string;
  priceModel: string;
  monthlyRateZAR: number;
  billingFrequency: 'Monthly' | 'Quarterly' | 'Annual';
  activeSubscribers: number;
  mrrZAR: number;
  features: string[];
}

export interface QuotationItem {
  id: string;
  quoteNumber: string;
  clientName: string;
  clientType: string;
  issueDate: string;
  expiryDate: string;
  subtotalZAR: number;
  vatZAR: number;
  totalZAR: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired' | 'Converted to Contract';
  lineItemsCount: number;
}

export interface ContractItem {
  id: string;
  contractNumber: string;
  title: string;
  partyName: string;
  type: 'School Agreement' | 'Government MSA' | 'MoU' | 'SLA' | 'Security Integration';
  startDate: string;
  endDate: string;
  valueZAR: number;
  status: 'Active' | 'Pending Renewal' | 'Under Review' | 'Terminated';
  eSignedByClient: boolean;
  eSignedByITIS: boolean;
  slaUptimeTarget: string;
  autoRenew: boolean;
}

export interface PurchaseOrderItem {
  id: string;
  poNumber: string;
  itemCategory: 'Wearables' | 'SIM Cards' | 'BLE Gateways' | 'GPS Modules' | 'Packaging' | 'Charging Docks' | 'Accessories';
  supplierName: string;
  quantity: number;
  unitCostZAR: number;
  totalAmountZAR: number;
  dateIssued: string;
  expectedDelivery: string;
  status: 'Draft' | 'Approved' | 'Issued to Vendor' | 'In Transit' | 'Received & Verified';
}

export interface WarehouseStock {
  id: string;
  warehouseName: string;
  location: string;
  itemCode: string;
  itemName: string;
  category: string;
  inStock: number;
  reserved: number;
  inTransit: number;
  repairQueue: number;
  damaged: number;
  reorderPoint: number;
}

export interface SupplierItem {
  id: string;
  companyName: string;
  category: 'Hardware OEM' | 'Microchip Fab' | 'M2M Telecom' | 'Logistics & Courier' | 'Packaging' | 'Printing';
  location: string;
  leadTimeDays: number;
  slaPerformance: number; // percentage
  qualityRating: number; // 1-5
  totalOrders: number;
  activeContracts: boolean;
  contactPerson: string;
  email: string;
}

// Mock Subscriptions Data
const INITIAL_SUBSCRIPTIONS: SubscriptionPlan[] = [
  {
    id: 'SUB-PAR-01',
    category: 'Parent',
    name: 'Parent Guardian SafeKid Plus',
    priceModel: 'R99 / month per child',
    monthlyRateZAR: 99,
    billingFrequency: 'Monthly',
    activeSubscribers: 12450,
    mrrZAR: 1232550,
    features: ['Live GPS Tracking', 'Geofence Exit Alerts', 'Emergency SOS Button', '24/7 Command Dispatch']
  },
  {
    id: 'SUB-SCH-01',
    category: 'School',
    name: 'School Enterprise Safety Enclave',
    priceModel: 'R25 / learner / month',
    monthlyRateZAR: 25,
    billingFrequency: 'Annual',
    activeSubscribers: 42, // 42 schools (~38,000 learners)
    mrrZAR: 950000,
    features: ['Gate BLE Scanners', 'Attendance Roster Sync', 'Parent Panic Notifications', 'SGB Dashboard']
  },
  {
    id: 'SUB-TRN-01',
    category: 'Transport',
    name: 'Scholar Fleet Telematics Pro',
    priceModel: 'R180 / bus / month',
    monthlyRateZAR: 180,
    billingFrequency: 'Monthly',
    activeSubscribers: 310, // vehicles
    mrrZAR: 55800,
    features: ['Passenger Onboard Counter', 'Driver Behaviour Telematics', 'Collision Deceleration Alert', 'Route Deviation Engine']
  },
  {
    id: 'SUB-MUN-01',
    category: 'Municipality',
    name: 'Metropolitan Public Safety Dashboard',
    priceModel: 'R85,000 / month flat',
    monthlyRateZAR: 85000,
    billingFrequency: 'Quarterly',
    activeSubscribers: 3, // Metros
    mrrZAR: 255000,
    features: ['City GIS Live Map', 'Crime Zone Heatmapping', 'Joint Operations Command Stream', 'API Data Feed']
  },
  {
    id: 'SUB-GOV-01',
    category: 'Government',
    name: 'National Public Sector Framework Tier-1',
    priceModel: 'R450,000 / month framework',
    monthlyRateZAR: 450000,
    billingFrequency: 'Annual',
    activeSubscribers: 2, // Departments
    mrrZAR: 900000,
    features: ['National School Safety Compliance', 'Auditor General Reporting', 'Multi-Agency SAPS Dispatch', 'Dedicated SRE Node']
  },
  {
    id: 'SUB-SEC-01',
    category: 'Security',
    name: 'Armed Response API Integration',
    priceModel: 'R25,000 / month partner fee',
    monthlyRateZAR: 25000,
    billingFrequency: 'Monthly',
    activeSubscribers: 8, // Security operators
    mrrZAR: 200000,
    features: ['Direct CAD/Dispatch Stream', 'SOS Proximity Routing', 'Bi-Directional Telematics', 'SLA Guarantee 99.99%']
  }
];

// Mock Quotations Data
const INITIAL_QUOTATIONS: QuotationItem[] = [
  {
    id: 'QT-2026-089',
    quoteNumber: 'QT-2026-089',
    clientName: 'Gauteng Department of Infrastructure Development',
    clientType: 'Government Department',
    issueDate: '2026-07-20',
    expiryDate: '2026-08-20',
    subtotalZAR: 4200000,
    vatZAR: 630000,
    totalZAR: 4830000,
    status: 'Sent',
    lineItemsCount: 4
  },
  {
    id: 'QT-2026-084',
    quoteNumber: 'QT-2026-084',
    clientName: 'City of Tshwane Safety Directorate',
    clientType: 'Municipality',
    issueDate: '2026-07-10',
    expiryDate: '2026-08-10',
    subtotalZAR: 1850000,
    vatZAR: 277500,
    totalZAR: 2127500,
    status: 'Accepted',
    lineItemsCount: 3
  },
  {
    id: 'QT-2026-078',
    quoteNumber: 'QT-2026-078',
    clientName: 'Independent Schools Association Group',
    clientType: 'School Network',
    issueDate: '2026-06-15',
    expiryDate: '2026-07-15',
    subtotalZAR: 980000,
    vatZAR: 147000,
    totalZAR: 1127000,
    status: 'Converted to Contract',
    lineItemsCount: 2
  },
  {
    id: 'QT-2026-071',
    quoteNumber: 'QT-2026-071',
    clientName: 'Soweto Bus Transit Association',
    clientType: 'Transport Operator',
    issueDate: '2026-05-02',
    expiryDate: '2026-06-02',
    subtotalZAR: 450000,
    vatZAR: 67500,
    totalZAR: 517500,
    status: 'Expired',
    lineItemsCount: 3
  }
];

// Mock Contracts Data
const INITIAL_CONTRACTS: ContractItem[] = [
  {
    id: 'CTR-2026-001',
    contractNumber: 'ITIS-GAU-MSA-2026',
    title: 'Gauteng Safe Schools Pilot Master Services Agreement',
    partyName: 'Gauteng Department of Education',
    type: 'Government MSA',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    valueZAR: 12500000,
    status: 'Active',
    eSignedByClient: true,
    eSignedByITIS: true,
    slaUptimeTarget: '99.95%',
    autoRenew: true
  },
  {
    id: 'CTR-2026-004',
    contractNumber: 'ITIS-JHB-SLA-2026',
    title: 'City of Johannesburg Command Centre Integration SLA',
    partyName: 'City of Joburg Metropolitan Municipality',
    type: 'SLA',
    startDate: '2026-03-01',
    endDate: '2027-02-28',
    valueZAR: 3200000,
    status: 'Active',
    eSignedByClient: true,
    eSignedByITIS: true,
    slaUptimeTarget: '99.99%',
    autoRenew: true
  },
  {
    id: 'CTR-2026-009',
    contractNumber: 'ITIS-SGB-MOU-2026',
    title: 'Soweto Central High School Board Safety MOU',
    partyName: 'Soweto Central High SGB',
    type: 'School Agreement',
    startDate: '2026-02-15',
    endDate: '2026-11-30',
    valueZAR: 850000,
    status: 'Active',
    eSignedByClient: true,
    eSignedByITIS: true,
    slaUptimeTarget: '99.50%',
    autoRenew: false
  }
];

// Mock Purchase Orders
const INITIAL_PURCHASE_ORDERS: PurchaseOrderItem[] = [
  {
    id: 'PO-2026-101',
    poNumber: 'PO-ITIS-2026-042',
    itemCategory: 'Wearables',
    supplierName: 'Shenzhen MicroTech Precision Assembly',
    quantity: 10000,
    unitCostZAR: 420,
    totalAmountZAR: 4200000,
    dateIssued: '2026-07-01',
    expectedDelivery: '2026-08-15',
    status: 'In Transit'
  },
  {
    id: 'PO-2026-098',
    poNumber: 'PO-ITIS-2026-039',
    itemCategory: 'SIM Cards',
    supplierName: 'National Cellular M2M Telecommunications',
    quantity: 15000,
    unitCostZAR: 15,
    totalAmountZAR: 225000,
    dateIssued: '2026-07-05',
    expectedDelivery: '2026-07-25',
    status: 'Received & Verified'
  },
  {
    id: 'PO-2026-092',
    poNumber: 'PO-ITIS-2026-035',
    itemCategory: 'BLE Gateways',
    supplierName: 'Gauteng Electronics & Enclosure Fab',
    quantity: 150,
    unitCostZAR: 2400,
    totalAmountZAR: 360000,
    dateIssued: '2026-06-20',
    expectedDelivery: '2026-07-30',
    status: 'Approved'
  }
];

// Mock Warehouse Stocks
const INITIAL_WAREHOUSES: WarehouseStock[] = [
  {
    id: 'STK-01',
    warehouseName: 'Soweto Central Logistics Depot',
    location: 'Soweto, Gauteng',
    itemCode: 'ITIS-WRB-04',
    itemName: 'ITIS Child Wearable Band v4 (GPS + Panic)',
    category: 'Wearables',
    inStock: 4250,
    reserved: 1200,
    inTransit: 5000,
    repairQueue: 42,
    damaged: 8,
    reorderPoint: 1500
  },
  {
    id: 'STK-02',
    warehouseName: 'Soweto Central Logistics Depot',
    location: 'Soweto, Gauteng',
    itemCode: 'ITIS-GTW-100',
    itemName: 'Gate BLE Scanner Hub G-100',
    category: 'BLE Gateways',
    inStock: 85,
    reserved: 40,
    inTransit: 150,
    repairQueue: 3,
    damaged: 1,
    reorderPoint: 30
  },
  {
    id: 'STK-03',
    warehouseName: 'Sandton Tech Hub Depot',
    location: 'Sandton, Johannesburg',
    itemCode: 'ITIS-GPS-VT900',
    itemName: 'Fleet GPS Vehicle Tracker VT-900',
    category: 'GPS Modules',
    inStock: 320,
    reserved: 110,
    inTransit: 0,
    repairQueue: 12,
    damaged: 2,
    reorderPoint: 50
  },
  {
    id: 'STK-04',
    warehouseName: 'Cape Town Regional Depot',
    location: 'Milnerton, Western Cape',
    itemCode: 'ITIS-WRB-04',
    itemName: 'ITIS Child Wearable Band v4',
    category: 'Wearables',
    inStock: 1800,
    reserved: 600,
    inTransit: 2000,
    repairQueue: 15,
    damaged: 4,
    reorderPoint: 800
  }
];

// Mock Suppliers
const INITIAL_SUPPLIERS: SupplierItem[] = [
  {
    id: 'SUP-01',
    companyName: 'Shenzhen MicroTech Assembly Co.',
    category: 'Hardware OEM',
    location: 'Shenzhen, China / Midrand Assembly',
    leadTimeDays: 21,
    slaPerformance: 98.4,
    qualityRating: 4.8,
    totalOrders: 14,
    activeContracts: true,
    contactPerson: 'David Chen',
    email: 'd.chen@microtech-oem.com'
  },
  {
    id: 'SUP-02',
    companyName: 'National Tier-1 Cellular M2M',
    category: 'M2M Telecom',
    location: 'Midrand, Gauteng',
    leadTimeDays: 3,
    slaPerformance: 99.9,
    qualityRating: 4.9,
    totalOrders: 28,
    activeContracts: true,
    contactPerson: 'Nomvula Sithole',
    email: 'm2m.public@tier1-telco.co.za'
  },
  {
    id: 'SUP-03',
    companyName: 'Express Parcel Courier Logistics',
    category: 'Logistics & Courier',
    location: 'Kempton Park, Gauteng',
    leadTimeDays: 2,
    slaPerformance: 96.8,
    qualityRating: 4.6,
    totalOrders: 62,
    activeContracts: true,
    contactPerson: 'Kagiso Molefe',
    email: 'dispatch@express-courier.co.za'
  },
  {
    id: 'SUP-04',
    companyName: 'Gauteng Precision Packaging & Printing',
    category: 'Packaging',
    location: 'Roodepoort, Gauteng',
    leadTimeDays: 7,
    slaPerformance: 97.2,
    qualityRating: 4.7,
    totalOrders: 9,
    activeContracts: true,
    contactPerson: 'Sarah Naidoo',
    email: 'orders@gauteng-pack.co.za'
  }
];

export function FinancialProcurementModule() {
  const [activeTab, setActiveTab] = useState<
    'billing' | 'quotes' | 'contracts' | 'procurement' | 'warehouse' | 'suppliers' | 'finance' | 'payments' | 'analytics' | 'readiness'
  >('billing');

  // Interactive Quote Form State
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);
  const [quoteClient, setQuoteClient] = useState('');
  const [quoteType, setQuoteType] = useState('School Network');
  const [wearablesQty, setWearablesQty] = useState(500);
  const [gatewaysQty, setGatewaysQty] = useState(4);
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState('');

  // Payment Checkout Simulator State
  const [selectedGateway, setSelectedGateway] = useState<'payfast' | 'ozow' | 'peach' | 'paygate' | 'eft' | 'debit' | 'po'>('ozow');
  const [simulatedAmount, setSimulatedAmount] = useState('495.00');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // E-Signature Simulator State
  const [signingContractId, setSigningContractId] = useState<string | null>(null);

  // Quote Generation Math
  const wearableUnitPrice = 650;
  const gatewayUnitPrice = 2400;
  const rawSubtotal = wearablesQty * wearableUnitPrice + gatewaysQty * gatewayUnitPrice;
  const vatAmount = rawSubtotal * 0.15;
  const quoteTotal = rawSubtotal + vatAmount;

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSuccessMsg(`Quotation QT-2026-${Math.floor(100 + Math.random() * 900)} successfully issued for ${quoteClient} (Total: R ${quoteTotal.toLocaleString('en-ZA')})`);
    setTimeout(() => {
      setShowNewQuoteModal(false);
      setQuoteSuccessMsg('');
    }, 2500);
  };

  const handleSimulatePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 1800);
  };

  return (
    <div className="space-y-8 text-slate-100 font-sans">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-3xs font-mono font-bold">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>ENTERPRISE FINANCE, CONTRACTS & SUPPLY CHAIN ENGINE</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Commercial Billing, Procurement & Financial Operations
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl">
            Complete financial ecosystem managing recurring SaaS subscriptions, quotations, contracts, hardware purchase orders, warehouse inventory, payment gateways, and audit readiness.
          </p>
        </div>

        {/* Quick Financial Snapshot */}
        <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-right">
            <span className="text-3xs text-slate-400 uppercase font-mono block">Annual Recurring Revenue (ARR)</span>
            <span className="text-lg font-black text-emerald-400 font-mono">R 42,522,600</span>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div>
            <span className="text-3xs text-slate-400 uppercase font-mono block">Active PO Inventory</span>
            <span className="text-lg font-black text-amber-400 font-mono">R 4,785,000</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs Bar */}
      <div className="bg-slate-950 p-2 border border-slate-800 rounded-2xl overflow-x-auto flex items-center gap-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {[
          { id: 'billing', label: '1. Subscription Billing', icon: CreditCard },
          { id: 'quotes', label: '2. Quotes & Proposals', icon: Receipt },
          { id: 'contracts', label: '3. Contracts & SLAs', icon: FileText },
          { id: 'procurement', label: '4. PO Procurement', icon: ShoppingBagIcon },
          { id: 'warehouse', label: '5. Multi-Warehouse', icon: Warehouse },
          { id: 'suppliers', label: '6. Suppliers & OEMs', icon: Truck },
          { id: 'finance', label: '7. Finance Dashboard', icon: TrendingUp },
          { id: 'payments', label: '8. Payment Gateways', icon: Lock },
          { id: 'analytics', label: '9. Supply Analytics', icon: BarChart3 },
          { id: 'readiness', label: '10. Audit Readiness', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================== */}
      {/* TAB 1: SUBSCRIPTION BILLING ENGINE */}
      {/* ========================================== */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span>Multi-Tier Subscription Models & Recurring Revenue Stream</span>
              </h3>
              <p className="text-xs text-slate-400">
                Automated monthly, quarterly, and annual billing engine tailored for Parents, Schools, Fleets, Municipalities, and Government.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-mono font-bold">
                Total Monthly MRR: R 3,593,350
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_SUBSCRIPTIONS.map((plan) => (
              <div key={plan.id} className="p-6 bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl space-y-4 transition group">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-3xs font-mono font-bold rounded-full uppercase">
                    {plan.category} Tier
                  </span>
                  <span className="text-3xs font-mono text-slate-400 uppercase">
                    {plan.billingFrequency} Billing
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-mono group-hover:text-amber-300 transition">
                    {plan.name}
                  </h4>
                  <p className="text-lg font-extrabold text-amber-400 font-mono mt-1">
                    {plan.priceModel}
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="flex justify-between text-2xs font-mono">
                    <span className="text-slate-400">Active Subscribers:</span>
                    <span className="text-white font-bold">{plan.activeSubscribers.toLocaleString('en-ZA')} units</span>
                  </div>
                  <div className="flex justify-between text-2xs font-mono">
                    <span className="text-slate-400">Monthly Contribution:</span>
                    <span className="text-emerald-400 font-bold">R {plan.mrrZAR.toLocaleString('en-ZA')} / mo</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <span className="text-3xs font-mono text-slate-400 uppercase font-bold block">Included Service Scope:</span>
                  <ul className="space-y-1">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="text-2xs text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Active Accounts & Invoices Table */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <h4 className="text-sm font-extrabold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Receipt className="w-4 h-4 text-amber-400" />
              <span>Recent Invoices & Automated Debit Order Logs</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">Account Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Billing Cycle</th>
                    <th className="p-3">Amount (ZAR)</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { inv: 'INV-2026-901', name: 'Gauteng Dept of Education', cat: 'Government', cycle: '2026 Q3', amt: 'R 1,350,000', status: 'Paid', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
                    { inv: 'INV-2026-902', name: 'Soweto Central High School', cat: 'School', cycle: 'July 2026', amt: 'R 31,250', status: 'Paid', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
                    { inv: 'INV-2026-903', name: 'City of Joburg Metro Police', cat: 'Municipality', cycle: 'July 2026', amt: 'R 85,000', status: 'Pending Approval', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
                    { inv: 'INV-2026-904', name: 'Soweto Bus Transit Operators', cat: 'Transport', cycle: 'July 2026', amt: 'R 55,800', status: 'Debit Order Processed', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-amber-300">{row.inv}</td>
                      <td className="p-3 text-white font-bold">{row.name}</td>
                      <td className="p-3 text-slate-300">{row.cat}</td>
                      <td className="p-3 text-slate-400">{row.cycle}</td>
                      <td className="p-3 font-bold text-white">{row.amt}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-3xs font-bold border ${row.color}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-3xs font-bold flex items-center gap-1 transition">
                          <Download className="w-3 h-3 text-amber-400" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: QUOTES & QUOTATION GENERATOR */}
      {/* ========================================== */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-400" />
                <span>Quotation Engine & Proposal Conversion</span>
              </h3>
              <p className="text-xs text-slate-400">
                Generate official enterprise hardware and software quotes with line items, 15% South African VAT, discount options, and contract conversion tracking.
              </p>
            </div>

            <button
              onClick={() => setShowNewQuoteModal(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold rounded-xl transition flex items-center gap-2 text-xs shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Generate New Quotation</span>
            </button>
          </div>

          {/* Quotations List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_QUOTATIONS.map((q) => (
              <div key={q.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold font-mono text-amber-400">{q.quoteNumber}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-3xs font-mono font-bold border ${
                    q.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                    q.status === 'Converted to Contract' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' :
                    q.status === 'Sent' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {q.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">{q.clientName}</h4>
                  <span className="text-3xs text-slate-400 font-mono block">{q.clientType} • Issued: {q.issueDate}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal Excl VAT:</span>
                    <span>R {q.subtotalZAR.toLocaleString('en-ZA')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>15% SA VAT:</span>
                    <span>R {q.vatZAR.toLocaleString('en-ZA')}</span>
                  </div>
                  <div className="flex justify-between text-white font-extrabold pt-1 border-t border-slate-800">
                    <span>Total Incl VAT:</span>
                    <span className="text-emerald-400">R {q.totalZAR.toLocaleString('en-ZA')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-2xs font-mono">
                  <span className="text-slate-400">Valid until: {q.expiryDate}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold flex items-center gap-1">
                      <Download className="w-3 h-3 text-amber-400" />
                      <span>PDF Quote</span>
                    </button>
                    {q.status === 'Accepted' && (
                      <button className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        <span>Convert to Contract</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Quote Modal */}
          {showNewQuoteModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-amber-400" />
                    <span>Generate Official ITIS Quotation</span>
                  </h3>
                  <button onClick={() => setShowNewQuoteModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                {quoteSuccessMsg ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-mono flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <span>{quoteSuccessMsg}</span>
                  </div>
                ) : (
                  <form onSubmit={handleCreateQuote} className="space-y-4">
                    <div>
                      <label className="text-3xs font-mono uppercase text-slate-400 block mb-1">Client Organization Name</label>
                      <input
                        type="text"
                        required
                        value={quoteClient}
                        onChange={(e) => setQuoteClient(e.target.value)}
                        placeholder="e.g. City of Ekurhuleni Public Safety"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-3xs font-mono uppercase text-slate-400 block mb-1">Wearables Qty (@ R650)</label>
                        <input
                          type="number"
                          value={wearablesQty}
                          onChange={(e) => setWearablesQty(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="text-3xs font-mono uppercase text-slate-400 block mb-1">Gate BLE Scanners (@ R2,400)</label>
                        <input
                          type="number"
                          value={gatewaysQty}
                          onChange={(e) => setGatewaysQty(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-400">
                        <span>Calculated Subtotal:</span>
                        <span>R {rawSubtotal.toLocaleString('en-ZA')}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>15% SA VAT:</span>
                        <span>R {vatAmount.toLocaleString('en-ZA')}</span>
                      </div>
                      <div className="flex justify-between text-amber-300 font-extrabold text-sm pt-2 border-t border-slate-800">
                        <span>Total Quotation Amount:</span>
                        <span>R {quoteTotal.toLocaleString('en-ZA')}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold rounded-xl transition text-xs shadow-lg shadow-amber-500/20"
                    >
                      Issue & Send Official Quote PDF
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: CONTRACT MANAGEMENT & SLAS */}
      {/* ========================================== */}
      {activeTab === 'contracts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Contract Management, MoUs & SLA Service Commitments</span>
              </h3>
              <p className="text-xs text-slate-400">
                Track legally binding Master Service Agreements, school board MOUs, uptime SLAs (99.95%+), electronic signatures, and expiry renewal alerts.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {INITIAL_CONTRACTS.map((c) => (
              <div key={c.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/30 transition">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-mono text-amber-400">{c.contractNumber}</span>
                      <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-300 border border-blue-500/30 text-3xs font-mono font-bold rounded-full">
                        {c.type}
                      </span>
                      <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-3xs font-mono font-bold rounded-full">
                        Uptime SLA: {c.slaUptimeTarget}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{c.title}</h4>
                    <span className="text-xs text-slate-400 font-mono block">Counterparty: {c.partyName}</span>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-3xs text-slate-400 uppercase block">Total Contract Value</span>
                    <span className="text-lg font-extrabold text-emerald-400">R {c.valueZAR.toLocaleString('en-ZA')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-3xs text-slate-400 uppercase block">Term Duration</span>
                    <span className="text-slate-200">{c.startDate} to {c.endDate}</span>
                  </div>

                  <div>
                    <span className="text-3xs text-slate-400 uppercase block">E-Signature Audit</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`flex items-center gap-1 text-3xs font-bold ${c.eSignedByClient ? 'text-emerald-400' : 'text-slate-500'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Client Signed
                      </span>
                      <span className={`flex items-center gap-1 text-3xs font-bold ${c.eSignedByITIS ? 'text-emerald-400' : 'text-slate-500'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> ITIS Exec Signed
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-3xs text-slate-400 uppercase block">Auto-Renewal Clause</span>
                    <span className={`text-2xs font-bold ${c.autoRenew ? 'text-cyan-400' : 'text-amber-400'}`}>
                      {c.autoRenew ? '● Enabled (Annual Rollover)' : '○ Fixed Term (Manual Re-negotiation)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-2xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Expiry Alert: Active (Renewal window opens in 120 days)
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSigningContractId(c.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl font-bold transition flex items-center gap-1.5"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Verify E-Signature Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Digital Signature Verification Modal */}
          {signingContractId && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl font-mono text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-amber-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Cryptographic E-Signature Audit Certificate
                  </span>
                  <button onClick={() => setSigningContractId(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-2xs">
                  <p className="text-slate-300">
                    <strong className="text-white">Contract ID:</strong> {signingContractId}
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">PKI Algorithm:</strong> ECDSA P-384 / SITA KeyVault Timestamp
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">Client Representative Hash:</strong> SHA256:e89a7f31c2098... (Verified)
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">ITIS Director Hash:</strong> SHA256:99f410b0213aa... (Verified)
                  </p>
                </div>

                <button
                  onClick={() => setSigningContractId(null)}
                  className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl"
                >
                  Close Certificate Inspector
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 4: PO PROCUREMENT & COMPONENT PURCHASING */}
      {/* ========================================== */}
      {activeTab === 'procurement' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <ShoppingBagIcon className="w-5 h-5 text-amber-400" />
                <span>Procurement & Hardware Component Purchase Orders</span>
              </h3>
              <p className="text-xs text-slate-400">
                Purchase tracking for wearable bands, M2M SIM cards, BLE gateway hubs, GPS modules, charging docks, and packaging.
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                    <th className="p-3">PO Number</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Supplier Name</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Unit Cost (ZAR)</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Expected Delivery</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {INITIAL_PURCHASE_ORDERS.map((po) => (
                    <tr key={po.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-amber-400">{po.poNumber}</td>
                      <td className="p-3 text-slate-200">{po.itemCategory}</td>
                      <td className="p-3 text-white font-bold">{po.supplierName}</td>
                      <td className="p-3 text-slate-300">{po.quantity.toLocaleString('en-ZA')} units</td>
                      <td className="p-3 text-slate-300">R {po.unitCostZAR}</td>
                      <td className="p-3 font-extrabold text-emerald-400">R {po.totalAmountZAR.toLocaleString('en-ZA')}</td>
                      <td className="p-3 text-slate-400">{po.expectedDelivery}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-3xs font-bold border ${
                          po.status === 'Received & Verified' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                          po.status === 'In Transit' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
                          'bg-blue-500/10 text-blue-300 border-blue-500/30'
                        }`}>
                          {po.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 5: MULTI-DEPOT WAREHOUSE & STOCK */}
      {/* ========================================== */}
      {activeTab === 'warehouse' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-amber-400" />
                <span>Multi-Warehouse Logistics & Technical Inventory Control</span>
              </h3>
              <p className="text-xs text-slate-400">
                Real-time stock tracking across Soweto Central, Sandton Tech Hub, and Cape Town depots. Includes transfers, repair queues, damaged stock, and replacement stock.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_WAREHOUSES.map((wh) => (
              <div key={wh.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/40 transition">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-sm font-bold text-white block">{wh.warehouseName}</span>
                    <span className="text-3xs text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" /> {wh.location}
                    </span>
                  </div>
                  <span className="text-3xs font-mono px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full font-bold">
                    {wh.category}
                  </span>
                </div>

                <div>
                  <span className="text-2xs font-mono text-amber-300 font-bold block">{wh.itemCode}</span>
                  <h4 className="text-sm font-extrabold text-white">{wh.itemName}</h4>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-center font-mono">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <span className="text-3xs text-slate-400 block uppercase">In Stock</span>
                    <span className="text-sm font-black text-emerald-400">{wh.inStock.toLocaleString('en-ZA')}</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <span className="text-3xs text-slate-400 block uppercase">Reserved</span>
                    <span className="text-sm font-black text-amber-400">{wh.reserved.toLocaleString('en-ZA')}</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <span className="text-3xs text-slate-400 block uppercase">In Transit</span>
                    <span className="text-sm font-black text-cyan-400">{wh.inTransit.toLocaleString('en-ZA')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-2xs font-mono pt-2 border-t border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-rose-400" /> Repair Queue: <strong className="text-white">{wh.repairQueue}</strong> • Damaged: <strong className="text-rose-400">{wh.damaged}</strong>
                  </span>
                  <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold flex items-center gap-1">
                    <Box className="w-3 h-3 text-amber-400" />
                    <span>Initiate Transfer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 6: SUPPLIER NETWORK & OEMS */}
      {/* ========================================== */}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-400" />
              <span>Supplier Network & Hardware OEM Directory</span>
            </h3>
            <p className="text-xs text-slate-400">
              Approved vendor list covering microchip fabricators, M2M telecom networks, express courier logistics, and precision packaging partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_SUPPLIERS.map((sup) => (
              <div key={sup.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-amber-500/30 transition">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-white font-mono">{sup.companyName}</span>
                  <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-3xs font-mono font-bold rounded-full">
                    {sup.category}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-3xs">
                  <div>
                    <span className="text-slate-400 block uppercase">Lead Time</span>
                    <span className="text-white font-bold">{sup.leadTimeDays} Days</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase">SLA On-Time</span>
                    <span className="text-emerald-400 font-bold">{sup.slaPerformance}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase">Quality Rating</span>
                    <span className="text-amber-400 font-bold">★ {sup.qualityRating} / 5</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-300 space-y-1">
                  <p><strong className="text-slate-400">Location:</strong> {sup.location}</p>
                  <p><strong className="text-slate-400">Primary Contact:</strong> {sup.contactPerson} ({sup.email})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 7: FINANCE DASHBOARD & CASH FLOW */}
      {/* ========================================== */}
      {activeTab === 'finance' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>Executive Financial Operations & Revenue Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400">
              High-level MRR, ARR, outstanding receivables, hardware component costs vs pilot execution margins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-3xs text-slate-400 uppercase font-mono block">Monthly Recurring Revenue (MRR)</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">R 3,543,550</span>
              <span className="text-3xs text-emerald-300 font-mono block">↑ +14.2% Month-on-Month Growth</span>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-3xs text-slate-400 uppercase font-mono block">Annualized Run Rate (ARR)</span>
              <span className="text-2xl font-black text-amber-400 font-mono">R 42,522,600</span>
              <span className="text-3xs text-amber-300 font-mono block">Based on active subscriptions</span>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-3xs text-slate-400 uppercase font-mono block">Outstanding Accounts Receivable</span>
              <span className="text-2xl font-black text-cyan-400 font-mono">R 1,435,000</span>
              <span className="text-3xs text-slate-400 font-mono block">Government 30-day payment terms</span>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-3xs text-slate-400 uppercase font-mono block">Hardware Unit Gross Margin</span>
              <span className="text-2xl font-black text-white font-mono">62.4 %</span>
              <span className="text-3xs text-emerald-300 font-mono block">R420 COGS vs R1,100 Sale Price</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 8: SA PAYMENT GATEWAY INTEGRATION */}
      {/* ========================================== */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              <span>South African Payment Gateway Matrix & Simulated Checkout</span>
            </h3>
            <p className="text-xs text-slate-400">
              Integrations for PayFast, Ozow Instant EFT, Peach Payments, PayGate, Direct EFT, NAEDO Debit Orders, and Government Purchase Orders (PO).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Gateway Selector */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Select Active Gateway Mode
              </h4>

              <div className="space-y-2 font-mono text-xs">
                {[
                  { id: 'ozow', name: 'Ozow Instant EFT', desc: 'Zero-fee bank-to-bank instant EFT' },
                  { id: 'payfast', name: 'PayFast SA', desc: 'Credit cards, Masterpass, Mobicred' },
                  { id: 'peach', name: 'Peach Payments', desc: 'Enterprise card tokenization & recurring debit' },
                  { id: 'paygate', name: 'PayGate DPO', desc: 'Multi-currency public sector portal' },
                  { id: 'eft', name: 'Direct Bank EFT', desc: 'Manual clearance with payment reference' },
                  { id: 'po', name: 'Government PO', desc: 'National Treasury 30-day invoice order' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setSelectedGateway(g.id as any);
                      setPaymentStatus('idle');
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition flex flex-col space-y-0.5 ${
                      selectedGateway === g.id
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{g.name}</span>
                    <span className="text-3xs text-slate-400 font-sans">{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Simulated Checkout Card */}
            <div className="md:col-span-2 p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  Simulated Live Merchant Checkout Widget ({selectedGateway.toUpperCase()})
                </span>
                <span className="text-3xs font-mono px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full font-bold">
                  Sandbox Active
                </span>
              </div>

              <div className="space-y-4 font-mono">
                <div>
                  <label className="text-3xs uppercase text-slate-400 block mb-1">Simulated Invoice Amount (ZAR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-amber-400 font-bold">R</span>
                    <input
                      type="text"
                      value={simulatedAmount}
                      onChange={(e) => setSimulatedAmount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {paymentStatus === 'idle' && (
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold rounded-2xl transition text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize Payment via {selectedGateway.toUpperCase()}</span>
                  </button>
                )}

                {paymentStatus === 'processing' && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-2xl text-xs font-mono flex items-center justify-center gap-3 animate-pulse">
                    <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
                    <span>Processing Gateway Transaction via {selectedGateway.toUpperCase()} API...</span>
                  </div>
                )}

                {paymentStatus === 'success' && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-mono space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Payment Transaction Successful!</span>
                    </div>
                    <p className="text-2xs text-slate-300">
                      Transaction Ref: <strong className="text-amber-300">TXN-ITIS-{Math.floor(100000 + Math.random() * 900000)}</strong>. Payment allocated to account ledger.
                    </p>
                    <button
                      onClick={() => setPaymentStatus('idle')}
                      className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg text-3xs"
                    >
                      Reset Simulator
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 9: PROCUREMENT ANALYTICS */}
      {/* ========================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <span>Procurement & Supply Chain Performance Analytics</span>
            </h3>
            <p className="text-xs text-slate-400">
              Warehouse utilization, stock turnover rates, supplier SLA fulfillment %, and component unit cost reduction trends over scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 font-mono">
              <span className="text-3xs text-slate-400 uppercase block">Stock Turnover Rate</span>
              <span className="text-2xl font-black text-amber-400">4.8x / year</span>
              <span className="text-3xs text-slate-300">Optimal lean stock management</span>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 font-mono">
              <span className="text-3xs text-slate-400 uppercase block">Warehouse Utilization</span>
              <span className="text-2xl font-black text-emerald-400">74.2 %</span>
              <span className="text-3xs text-slate-300">Soweto & Sandton combined</span>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 font-mono">
              <span className="text-3xs text-slate-400 uppercase block">Supplier SLA On-Time Delivery</span>
              <span className="text-2xl font-black text-cyan-400">98.1 %</span>
              <span className="text-3xs text-slate-300">Target ≥ 95% across hardware vendors</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 10: FINANCIAL READINESS REPORT & AUDIT */}
      {/* ========================================== */}
      {activeTab === 'readiness' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Financial Readiness Report: Software vs Real-World Operations</span>
            </h3>
            <p className="text-xs text-slate-400">
              Auditor matrix distinguishing completed software capability from real-world corporate prerequisites (merchant bank accounts, SARS tax clearance, accounting integrations).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Software Complete Column */}
            <div className="p-6 bg-slate-900 border border-emerald-500/30 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Software Capabilities (100% Complete)
                </span>
                <span className="text-3xs font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
                  Verified Engine
                </span>
              </div>

              <ul className="space-y-3 font-mono text-xs text-slate-300">
                {[
                  'Automated multi-tier subscription calculator & billing engine',
                  'Dynamic quotation generator with 15% SA VAT calculations',
                  'Cryptographic e-signature verification audit trail',
                  'Multi-depot warehouse inventory stock tracking & transfers',
                  'SA payment gateway checkout architecture & webhook handlers',
                  'Automated invoice generation & ledger export'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real-World Corporate Prerequisites Column */}
            <div className="p-6 bg-slate-900 border border-amber-500/30 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-amber-400 font-mono flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Real-World Corporate Prerequisites
                </span>
                <span className="text-3xs font-mono px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full font-bold">
                  Operational Checklist
                </span>
              </div>

              <ul className="space-y-3 font-mono text-xs text-slate-300">
                {[
                  { title: 'Live Merchant Bank Accounts', desc: 'Obtain approved Ozow & PayFast production MID credentials', done: false },
                  { title: 'SARS Tax & VAT Registration', desc: 'Confirm VAT vendor status for 15% invoicing compliance', done: true },
                  { title: 'Xero / Sage Accounting Sync', desc: 'Connect automated API bank feeds to cloud general ledger', done: false },
                  { title: 'Independent Financial Auditor', desc: 'Appoint external auditor for annual SGB & public sector audits', done: false },
                  { title: 'Treasury Delegation of Authority', desc: 'Formalize board approval limits for purchase orders over R1M', done: true }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong className="text-white block">{item.title}</strong>
                      <span className="text-3xs text-slate-400 font-sans block">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Helper icon wrapper for shopping bag
function ShoppingBagIcon(props: any) {
  return <Package {...props} />;
}
