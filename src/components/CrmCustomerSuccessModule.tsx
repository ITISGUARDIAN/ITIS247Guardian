import React, { useState, useEffect } from 'react';
import {
  Building2,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Layers,
  GraduationCap,
  AlertOctagon,
  FileCheck,
  CheckCircle2,
  Plus,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Mail,
  Calendar,
  XCircle,
  PieChart,
  Target
} from 'lucide-react';
import {
  ChurnRiskMetric,
  ContractLifecycleItem,
  CrmCustomerSuccessOverview,
  DealStage,
  GovernmentAccount,
  PartnerOrganization,
  SalesPipelineDeal,
  SchoolOnboardingWorkflow
} from '../backend/crm/crm.types';

export const CrmCustomerSuccessModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'ACCOUNTS' | 'PIPELINE' | 'SCHOOL_ONBOARDING' | 'PARTNERS' | 'CONTRACTS' | 'CHURN_RISK'
  >('OVERVIEW');

  // State
  const [overview, setOverview] = useState<CrmCustomerSuccessOverview | null>(null);
  const [accounts, setAccounts] = useState<GovernmentAccount[]>([]);
  const [deals, setDeals] = useState<SalesPipelineDeal[]>([]);
  const [schoolOnboardings, setSchoolOnboardings] = useState<SchoolOnboardingWorkflow[]>([]);
  const [partners, setPartners] = useState<PartnerOrganization[]>([]);
  const [contracts, setContracts] = useState<ContractLifecycleItem[]>([]);
  const [churnRisks, setChurnRisks] = useState<ChurnRiskMetric[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNewDealModal, setShowNewDealModal] = useState<boolean>(false);

  // New Deal Form State
  const [newDeal, setNewDeal] = useState({
    title: '',
    accountName: '',
    dealValueZar: 15000000,
    dealStage: 'LEAD' as DealStage,
    probabilityPercentage: 30,
    tenderReferenceNumber: '',
    assignedOwner: 'Thabo Ndlovu (VP Sales)'
  });

  const fetchCrmData = async () => {
    setLoading(true);
    try {
      const [resO, resA, resD, resS, resP, resC, resR] = await Promise.all([
        fetch('/api/v1/crm/overview').then((r) => r.json()),
        fetch('/api/v1/crm/accounts').then((r) => r.json()),
        fetch('/api/v1/crm/deals').then((r) => r.json()),
        fetch('/api/v1/crm/school-onboarding').then((r) => r.json()),
        fetch('/api/v1/crm/partners').then((r) => r.json()),
        fetch('/api/v1/crm/contracts').then((r) => r.json()),
        fetch('/api/v1/crm/churn-risks').then((r) => r.json())
      ]);

      if (resO.success) setOverview(resO.overview);
      if (resA.success) setAccounts(resA.accounts);
      if (resD.success) setDeals(resD.deals);
      if (resS.success) setSchoolOnboardings(resS.schoolOnboardings);
      if (resP.success) setPartners(resP.partners);
      if (resC.success) setContracts(resC.contracts);
      if (resR.success) setChurnRisks(resR.churnRisks);
    } catch (err) {
      console.error('Failed to load CRM data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrmData();
  }, []);

  // Handle Create Deal
  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/crm/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDeal)
      });
      const data = await res.json();
      if (data.success) {
        setShowNewDealModal(false);
        setNewDeal({
          title: '',
          accountName: '',
          dealValueZar: 15000000,
          dealStage: 'LEAD',
          probabilityPercentage: 30,
          tenderReferenceNumber: '',
          assignedOwner: 'Thabo Ndlovu (VP Sales)'
        });
        fetchCrmData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatZar = (val: number) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);
  };

  const renderStageBadge = (stage: DealStage) => {
    switch (stage) {
      case 'LEAD':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300">LEAD</span>;
      case 'TENDER_QUALIFICATION':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">TENDER QUAL</span>;
      case 'PROPOSAL_SUBMITTED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">PROPOSAL</span>;
      case 'GOVERNMENT_APPROVAL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">GOVT APPROVAL</span>;
      case 'CONTRACT_SIGNED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">WON / SIGNED</span>;
      case 'CLOSED_LOST':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">LOST</span>;
    }
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen p-4 md:p-6 space-y-6 font-sans">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg text-white shadow-lg shadow-purple-600/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Business Operations & Customer Success
                <span className="text-xs px-2.5 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full font-mono">
                  ARR {formatZar(overview?.totalArrZar || 80500000)}
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Government CRM • Sales Pipeline • School Onboarding Workflows • Partner Management • Churn Analytics
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowNewDealModal(true)}
            className="flex items-center space-x-2 px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg text-xs transition shadow-md shadow-purple-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sales Opportunity</span>
          </button>
          <button
            onClick={fetchCrmData}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition"
            title="Refresh CRM Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-2">
        {[
          { id: 'OVERVIEW', label: 'Executive Overview', icon: TrendingUp },
          { id: 'ACCOUNTS', label: 'Government Accounts', icon: Building2, badge: overview?.activeGovernmentAccountsCount },
          { id: 'PIPELINE', label: 'Sales Pipeline & Tenders', icon: Target },
          { id: 'SCHOOL_ONBOARDING', label: 'School Onboarding Workflows', icon: GraduationCap, badge: overview?.onboardingSchoolsCount },
          { id: 'PARTNERS', label: 'Partner Management', icon: Users },
          { id: 'CONTRACTS', label: 'Contract Lifecycle', icon: FileCheck },
          { id: 'CHURN_RISK', label: 'Churn Analytics & Health', icon: AlertOctagon, badge: overview?.churnRiskAccountsCount }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Annual Recurring Revenue (ARR)</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-emerald-400 font-mono">
                {formatZar(overview?.totalArrZar || 80500000)}
              </div>
              <div className="text-[11px] text-slate-400">GDE, WCED, & Municipal Mandates</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Weighted Sales Pipeline</span>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xl font-bold text-purple-300 font-mono">
                {formatZar(overview?.weightedPipelineValueZar || 69550000)}
              </div>
              <div className="text-[11px] text-slate-400">Total Unweighted: {formatZar(overview?.totalDealsInPipelineValueZar || 93000000)}</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Avg Account Health Score</span>
                <Award className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                {overview?.averageCustomerHealthScore || 88} / 100
              </div>
              <div className="text-[11px] text-emerald-400">Target Renewal Rate: 96.5%</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Schools Onboarding Live</span>
                <GraduationCap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-amber-300 font-mono">
                {overview?.onboardingSchoolsCount || 2} Active
              </div>
              <div className="text-[11px] text-slate-400">Soweto & Khayelitsha Pilots</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GOVERNMENT ACCOUNTS */}
      {activeTab === 'ACCOUNTS' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 font-semibold text-sm text-white">
              Provincial Education & Transport Departments
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Account Name</th>
                    <th className="px-4 py-3">Province</th>
                    <th className="px-4 py-3">Annual Value (ARR)</th>
                    <th className="px-4 py-3">Primary Contact</th>
                    <th className="px-4 py-3">Health Score</th>
                    <th className="px-4 py-3">Schools / Buses</th>
                    <th className="px-4 py-3">Account Director</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {accounts.map((acc) => (
                    <tr key={acc.accountId} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-white">{acc.accountName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{acc.accountId}</div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-300">{acc.province}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-emerald-400">
                        {formatZar(acc.annualContractValueZar)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-slate-200">{acc.primaryContactName}</div>
                        <div className="text-[10px] text-slate-400">{acc.primaryContactEmail}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {acc.healthScore} / 100 ({acc.healthStatus})
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-300 font-mono">
                        {acc.activeSchoolsCount} Schools • {acc.activeVehiclesCount} Buses
                      </td>
                      <td className="px-4 py-3.5 text-slate-400">{acc.assignedAccountManager}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SALES PIPELINE */}
      {activeTab === 'PIPELINE' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 font-semibold text-sm text-white flex justify-between items-center">
              <span>Provincial Government Tender & Expansion Pipeline</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Opportunity Title</th>
                    <th className="px-4 py-3">Account Name</th>
                    <th className="px-4 py-3">Stage</th>
                    <th className="px-4 py-3">Deal Value</th>
                    <th className="px-4 py-3">Win Prob.</th>
                    <th className="px-4 py-3">Tender Ref</th>
                    <th className="px-4 py-3">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {deals.map((deal) => (
                    <tr key={deal.dealId} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5 font-bold text-white max-w-xs">{deal.title}</td>
                      <td className="px-4 py-3.5 text-slate-300">{deal.accountName}</td>
                      <td className="px-4 py-3.5">{renderStageBadge(deal.dealStage)}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-purple-300">
                        {formatZar(deal.dealValueZar)}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-emerald-400">{deal.probabilityPercentage}%</td>
                      <td className="px-4 py-3.5 text-slate-400 font-mono">{deal.tenderReferenceNumber || 'N/A'}</td>
                      <td className="px-4 py-3.5 text-slate-300">{deal.assignedOwner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SCHOOL ONBOARDING WORKFLOWS */}
      {activeTab === 'SCHOOL_ONBOARDING' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schoolOnboardings.map((ob) => (
              <div key={ob.onboardingId} className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-mono text-purple-400 font-bold">EMIS: {ob.schoolEmisCode}</div>
                    <h4 className="text-sm font-bold text-white">{ob.schoolName}</h4>
                    <div className="text-xs text-slate-400">{ob.province} Province</div>
                  </div>
                  <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-xs font-bold font-mono">
                    {ob.progressPercentage}% Complete
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Current Milestone:</span>
                    <span className="font-bold text-amber-300 font-mono">{ob.currentMilestone}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${ob.progressPercentage}%` }}></div>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  Target Go-Live: {new Date(ob.targetGoLiveDate).toLocaleDateString()} • Lead: {ob.assignedOnboardingLead}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PARTNER MANAGEMENT */}
      {activeTab === 'PARTNERS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((p) => (
              <div key={p.partnerId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white">{p.partnerName}</h4>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    {p.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">Category: {p.partnerCategory}</div>
                <div className="text-xs text-slate-300 font-mono">
                  Contracted Fleet: {p.contractedBusesCount} Vehicles • SLA: {p.slaAdherencePercentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CONTRACT LIFECYCLE */}
      {activeTab === 'CONTRACTS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contracts.map((ct) => (
              <div key={ct.contractId} className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-mono font-bold text-purple-400">{ct.contractNumber}</div>
                    <div className="text-sm font-bold text-white">{ct.accountName}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    {ct.renewalStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-mono font-bold">Contract Value: {formatZar(ct.valueZar)}</div>
                <div className="text-xs text-slate-400">Days to Renewal: {ct.daysToRenewal} Days</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: CHURN ANALYTICS & HEALTH */}
      {activeTab === 'CHURN_RISK' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              Customer Health & Churn Risk Early Warning System
            </h3>
            {churnRisks.map((cr) => (
              <div key={cr.accountId} className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-amber-300">{cr.accountName}</h4>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs font-mono font-bold">
                    Risk Score: {cr.riskScore} / 100
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-semibold">Primary Risk Factor: {cr.primaryRiskFactor}</div>
                <div className="text-xs text-emerald-400 font-mono font-bold">ARR At Risk: {formatZar(cr.arrValueZar)}</div>
                <div className="p-2.5 bg-slate-900 rounded text-xs text-slate-300">Mitigation: {cr.mitigationPlan}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE DEAL MODAL */}
      {showNewDealModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Add Provincial Tender Deal
              </h3>
              <button onClick={() => setShowNewDealModal(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Tender Title / Opportunity</label>
                <input
                  type="text"
                  required
                  value={newDeal.title}
                  onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                  placeholder="e.g. Limpopo Scholar Fleet Real-time Telematics Expansion"
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Account Name</label>
                  <input
                    type="text"
                    required
                    value={newDeal.accountName}
                    onChange={(e) => setNewDeal({ ...newDeal, accountName: e.target.value })}
                    placeholder="e.g. Limpopo Dept of Transport"
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Deal Value (ZAR)</label>
                  <input
                    type="number"
                    required
                    value={newDeal.dealValueZar}
                    onChange={(e) => setNewDeal({ ...newDeal, dealValueZar: Number(e.target.value) })}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2.5 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewDealModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium"
                >
                  Create Sales Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
