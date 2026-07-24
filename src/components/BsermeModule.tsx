import React, { useState } from 'react';
import {
  CreditCard,
  TrendingUp,
  DollarSign,
  Building2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Zap,
  Lock,
  Layers,
  FileCode,
  HardDrive,
  Terminal,
  Download,
  Users,
  Award,
  Globe,
  PieChart,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  Building,
  Briefcase,
  Database
} from 'lucide-react';
import {
  SAMPLE_PLANS,
  SAMPLE_SUBSCRIPTIONS,
  SAMPLE_INVOICES,
  SAMPLE_CONTRACTS,
  BSERME_CODE_SPECS,
  CRITICAL_BSERME_RULES,
  SubscriptionPlan,
  CustomerSubscription,
  InvoiceRecord,
  GovernmentContract,
  BsermeCodeSpec
} from '../data/bsermeData';

export const BsermeModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'revenue' | 'plans' | 'subscriptions' | 'invoices' | 'contracts' | 'gateways' | 'schema' | 'architecture'
  >('revenue');

  // Interactive States
  const [plans] = useState<SubscriptionPlan[]>(SAMPLE_PLANS);
  const [subscriptions, setSubscriptions] = useState<CustomerSubscription[]>(SAMPLE_SUBSCRIPTIONS);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(SAMPLE_INVOICES);
  const [contracts] = useState<GovernmentContract[]>(SAMPLE_CONTRACTS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<BsermeCodeSpec>(BSERME_CODE_SPECS[0]);

  // Invoice Generation State
  const [customerNameInput, setCustomerNameInput] = useState<string>('Gauteng Department of Education');
  const [amountInput, setAmountInput] = useState<number>(450000);
  const [selectedGateway, setSelectedGateway] = useState<'BANK_EFT' | 'OZOW' | 'PAYFAST' | 'PEACH_PAYMENTS'>('BANK_EFT');
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState<boolean>(false);

  // Operational Simulation Logs
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingInvoice(true);
    addLog(`CALCULATING 15% SA VAT & GENERATING TAX INVOICE for "${customerNameInput}"...`);

    setTimeout(() => {
      const vatRate = 0.15;
      const subtotal = amountInput / (1 + vatRate);
      const vat = amountInput - subtotal;

      const newInv: InvoiceRecord = {
        id: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: customerNameInput,
        invoiceDate: new Date().toISOString().substring(0, 10),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
        subtotalZar: parseFloat(subtotal.toFixed(2)),
        vatZar: parseFloat(vat.toFixed(2)),
        totalZar: parseFloat(amountInput.toFixed(2)),
        paymentGateway: selectedGateway,
        status: 'PAID',
      };

      setInvoices((prev) => [newInv, ...prev]);
      setIsGeneratingInvoice(false);
      addLog(`TAX INVOICE GENERATED & SIGNED: ${newInv.id} | Total: R${newInv.totalZar.toLocaleString()} (incl 15% VAT: R${newInv.vatZar.toLocaleString()})`);
    }, 1400);
  };

  const handleToggleSubStatus = (subId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id === subId) {
          const nextStatus = s.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          addLog(`SUBSCRIPTION STATE CHANGED: ${s.id} updated to ${nextStatus}`);
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 rounded-2xl border border-emerald-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
              <CreditCard className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>— BILLING, SUBSCRIPTIONS & ENTERPRISE REVENUE ENGINE (BSERME)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Revenue & <span className="text-emerald-400">Subscription Management</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Sustainable commercial monetization engine for government tenders, school district subscriptions, parent premium plans, scholar transport fleets, and integrated South African payment gateways.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-emerald-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">R 12.85M</span>
              <span className="text-xs text-slate-400 font-medium">Monthly Rec. Rev</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-teal-400">R 154.2M</span>
              <span className="text-xs text-slate-400 font-medium">Annual Rec. Rev</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">15% VAT</span>
              <span className="text-xs text-slate-400 font-medium">SARS Compliant</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('revenue')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'revenue'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>1. Revenue & MRR Overview</span>
          </button>

          <button
            onClick={() => setActiveSubTab('plans')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'plans'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4 text-teal-400" />
            <span>2. Subscription Plans & Tiers</span>
          </button>

          <button
            onClick={() => setActiveSubTab('subscriptions')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'subscriptions'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>3. Customer Subscriptions</span>
          </button>

          <button
            onClick={() => setActiveSubTab('invoices')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'invoices'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>4. Automated Invoicing & VAT</span>
          </button>

          <button
            onClick={() => setActiveSubTab('contracts')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'contracts'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>5. Government Tender Contracts</span>
          </button>

          <button
            onClick={() => setActiveSubTab('gateways')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'gateways'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>6. SA Payment Gateways</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-blue-400" />
            <span>7. Relational Prisma Schema</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'architecture'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>8. NestJS Services & Controllers</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT TRAIL */}
      {logs.length > 0 && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 animate-pulse text-emerald-400" />
              <span>BSERME Financial Audit Ledger</span>
            </span>
            <button onClick={() => setLogs([])} className="text-slate-500 hover:text-slate-300">
              Clear
            </button>
          </div>
          <div className="space-y-1">
            {logs.map((log, idx) => (
              <p key={idx} className="text-slate-300">
                {log}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 1: REVENUE & MRR OVERVIEW */}
      {activeSubTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <span className="text-xs text-slate-400 font-semibold block">Monthly Recurring Revenue (MRR)</span>
              <div className="flex items-center space-x-2 text-emerald-400">
                <TrendingUp className="w-6 h-6" />
                <span className="text-2xl font-bold">R 12.85M</span>
              </div>
              <p className="text-[10px] text-slate-500">+8.4% growth vs previous month</p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <span className="text-xs text-slate-400 font-semibold block">Annual Recurring Revenue (ARR)</span>
              <div className="flex items-center space-x-2 text-teal-400">
                <DollarSign className="w-6 h-6" />
                <span className="text-2xl font-bold">R 154.2M</span>
              </div>
              <p className="text-[10px] text-slate-500">Includes 9 Provincial DBE Contracts</p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <span className="text-xs text-slate-400 font-semibold block">Active Paid Subscriptions</span>
              <div className="flex items-center space-x-2 text-purple-400">
                <Users className="w-6 h-6" />
                <span className="text-2xl font-bold">85,814</span>
              </div>
              <p className="text-[10px] text-slate-500">Parents, Schools & Fleet Operators</p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <span className="text-xs text-slate-400 font-semibold block">South African VAT Status</span>
              <div className="flex items-center space-x-2 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-2xl font-bold">15% SARS</span>
              </div>
              <p className="text-[10px] text-slate-500">Itemised & Cryptographically Audited</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SUBSCRIPTION PLANS & TIERS */}
      {activeSubTab === 'plans' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <CreditCard className="w-5 h-5 text-teal-400" />
              <span>Commercial Pricing Plans & Feature Allocation</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((p) => (
                <div key={p.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold uppercase">
                      {p.category}
                    </span>
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    <div className="text-xl font-extrabold text-emerald-400">
                      R {p.monthlyFeeZar.toLocaleString()}{' '}
                      <span className="text-xs text-slate-400 font-normal">/ mo</span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-800 pt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Features Included</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span>Active Subscribers:</span>
                    <span className="text-emerald-400 font-bold">{p.activeSubscribersCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CUSTOMER SUBSCRIPTIONS */}
      {activeSubTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Users className="w-5 h-5 text-purple-400" />
              <span>Multi-Tenant Active Subscriptions & State Machine</span>
            </h3>

            <div className="space-y-3">
              {subscriptions.map((s) => (
                <div key={s.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{s.customerName}</h4>
                      <p className="text-xs text-slate-400">{s.planName} • ID: {s.id}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                          s.status === 'ACTIVE'
                            ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                            : 'bg-rose-950 border-rose-800 text-rose-400'
                        }`}
                      >
                        STATUS: {s.status}
                      </span>

                      <button
                        onClick={() => handleToggleSubStatus(s.id)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-bold"
                      >
                        Toggle State
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Monthly Value</span>
                      <span className="text-emerald-400 font-bold">R {s.monthlyValueZar.toLocaleString()}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Billing Cycle</span>
                      <span className="text-teal-400 font-bold">{s.billingCycle}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Start Date</span>
                      <span className="text-slate-300 font-bold">{s.startDate}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Next Renewal</span>
                      <span className="text-purple-400 font-bold">{s.nextRenewalDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: AUTOMATED INVOICING & VAT */}
      {activeSubTab === 'invoices' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Automated Tax Invoice Generator (South African 15% VAT)</span>
            </h3>

            {/* INTERACTIVE INVOICE FORM */}
            <form onSubmit={handleCreateInvoice} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">
                Generate SARS-Compliant Tax Invoice
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Customer / Entity Name</label>
                  <input
                    type="text"
                    value={customerNameInput}
                    onChange={(e) => setCustomerNameInput(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Total Value Inclusive (ZAR)</label>
                  <input
                    type="number"
                    value={amountInput}
                    onChange={(e) => setAmountInput(Number(e.target.value))}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Payment Gateway / Method</label>
                  <select
                    value={selectedGateway}
                    onChange={(e) => setSelectedGateway(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="BANK_EFT">Direct Bank EFT (Government Procurement)</option>
                    <option value="OZOW">Ozow Instant EFT</option>
                    <option value="PAYFAST">PayFast Gateway</option>
                    <option value="PEACH_PAYMENTS">Peach Payments</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGeneratingInvoice}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-1.5"
              >
                <Send className="w-3 h-3" />
                <span>{isGeneratingInvoice ? 'Calculating VAT & Issuing...' : 'Generate Tax Invoice'}</span>
              </button>
            </form>

            {/* INVOICES LIST */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Recent Invoices ({invoices.length})</span>
              {invoices.map((inv) => (
                <div key={inv.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-amber-400">{inv.id} — {inv.customerName}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        inv.status === 'PAID'
                          ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                          : 'bg-amber-950 border-amber-800 text-amber-400'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Subtotal Excl VAT</span>
                      <span className="text-slate-200 font-bold">R {inv.subtotalZar.toLocaleString()}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">15% SA VAT</span>
                      <span className="text-amber-400 font-bold">R {inv.vatZar.toLocaleString()}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Total Incl VAT</span>
                      <span className="text-emerald-400 font-bold">R {inv.totalZar.toLocaleString()}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Gateway Method</span>
                      <span className="text-cyan-400 font-bold">{inv.paymentGateway}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: GOVERNMENT TENDER CONTRACTS */}
      {activeSubTab === 'contracts' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <span>Government Procurement & Provincial Tender Contracts</span>
            </h3>

            <div className="space-y-3">
              {contracts.map((c) => (
                <div key={c.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.departmentName}</h4>
                      <p className="text-xs text-slate-400">Tender Ref: {c.tenderNumber} • ID: {c.id}</p>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                      SLA: {c.slaTier}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Contract Value</span>
                      <span className="text-emerald-400 font-bold">R {c.totalContractValueZar.toLocaleString()}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Duration</span>
                      <span className="text-slate-200 font-bold">{c.durationMonths} Months</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Milestone Status</span>
                      <span className="text-teal-400 font-bold">{c.milestoneStatus}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded">
                      <span className="text-slate-500 text-[10px] block">Expiry Date</span>
                      <span className="text-purple-400 font-bold">{c.expiryDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: SA PAYMENT GATEWAYS */}
      {activeSubTab === 'gateways' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>Integrated South African Payment Rails & Gateway Health</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold block">PayFast Gateway</span>
                <p className="text-slate-300">Credit cards, Instant EFT, Masterpass integration for parent billing.</p>
                <div className="p-2 bg-slate-900 rounded text-[10px] text-emerald-400 font-bold">
                  Status: Operational (Latency 18ms)
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold block">Ozow Instant EFT</span>
                <p className="text-slate-300">Direct real-time bank EFT payments across FNB, Capitec, Absa, Standard Bank.</p>
                <div className="p-2 bg-slate-900 rounded text-[10px] text-emerald-400 font-bold">
                  Status: Operational (Clearing Instant)
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold block">Peach Payments</span>
                <p className="text-slate-300">Recurring debit order engine and enterprise fleet subscription billing.</p>
                <div className="p-2 bg-slate-900 rounded text-[10px] text-emerald-400 font-bold">
                  Status: Operational (Zero Failed Retries)
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold block">Direct Bank EFT Procurement</span>
                <p className="text-slate-300">Government Treasury purchase order matching and automated reconciliation.</p>
                <div className="p-2 bg-slate-900 rounded text-[10px] text-emerald-400 font-bold">
                  Status: Operational (PO Reconciliation Synced)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: RELATIONAL PRISMA SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Prisma Relational Database Schema for BSERME</h3>
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold">
                Relational Model
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {BSERME_CODE_SPECS[0].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: NESTJS SERVICES & CONTROLLERS */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">NestJS Billing Services & Payment Controllers</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {BSERME_CODE_SPECS.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedCodeSpec(spec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCodeSpec.id === spec.id
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {spec.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-400 font-bold">{selectedCodeSpec.filename}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                  {selectedCodeSpec.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">{selectedCodeSpec.description}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {selectedCodeSpec.code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* CRITICAL BUSINESS RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_BSERME_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400">RULE #{rule.id}</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-slate-300 font-semibold">
                  {rule.badge}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{rule.title}</h4>
              <p className="text-[11px] text-slate-400 leading-tight">{rule.ruleText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
