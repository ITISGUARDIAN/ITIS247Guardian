import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Building2, 
  Users, 
  Bus, 
  DollarSign, 
  Shield, 
  Download,
  ArrowRight,
  PieChart,
  BarChart3
} from 'lucide-react';

export function ROICalculator() {
  const [schools, setSchools] = useState(10);
  const [learners, setLearners] = useState(8000);
  const [vehicles, setVehicles] = useState(80);
  const [monthlyFeePerLearner, setMonthlyFeePerLearner] = useState(45); // ZAR
  const [supportPackage, setSupportPackage] = useState<'standard' | 'premium' | 'enterprise'>('premium');

  // Calculations
  const supportFeeMultiplier = supportPackage === 'standard' ? 1.0 : supportPackage === 'premium' ? 1.15 : 1.30;
  
  const grossMonthlyRevenue = learners * monthlyFeePerLearner * supportFeeMultiplier;
  const annualRecurringRevenue = grossMonthlyRevenue * 12;

  // Capex Hardware Setup Cost Estimates (ZAR)
  const bandCostPerLearner = 250; // Wearable band cost ZAR
  const bleGatewayPerSchool = 4500; // 3 gateways per school
  const vehicleGatewayCost = 2800; // per vehicle
  
  const totalHardwareCapex = (learners * bandCostPerLearner) + (schools * bleGatewayPerSchool * 3) + (vehicles * vehicleGatewayCost);
  
  // Opex Cloud & Telco SIM Cost (ZAR per learner per month)
  const cloudOpexPerLearnerAnnual = 12 * 8; // R8/mo per learner cloud/telco
  const totalAnnualOpex = learners * cloudOpexPerLearnerAnnual;

  const netAnnualMargin = annualRecurringRevenue - totalAnnualOpex;
  const roiPercentage = totalHardwareCapex > 0 ? ((netAnnualMargin / totalHardwareCapex) * 100).toFixed(1) : '0';

  // 5-Year Forecast projection
  const forecast = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    const growthFactor = Math.pow(1.35, i); // 35% YoY expansion
    const arr = annualRecurringRevenue * growthFactor;
    return { year: `Year ${year}`, arr: Math.round(arr) };
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg">
              <Calculator className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">Commercial ROI & Financial Forecast Engine</h3>
          </div>
          <p className="text-xs text-slate-400">
            Interactive deployment cost, annual recurring revenue (ARR), hardware Capex amortization & 5-year growth projection model for pilot sponsors.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Currency:</span>
          <span className="text-emerald-400 font-bold">ZAR (R South African Rand)</span>
        </div>
      </div>

      {/* Input Sliders & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Schools Input */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-cyan-400" />
              Pilot Schools
            </span>
            <span className="text-cyan-400 font-bold text-sm">{schools}</span>
          </div>
          <input 
            type="range" 
            min={1} 
            max={100} 
            value={schools} 
            onChange={(e) => setSchools(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 rounded-lg h-2"
          />
          <div className="text-2xs text-slate-500 flex justify-between">
            <span>1 School</span>
            <span>100 Schools</span>
          </div>
        </div>

        {/* Learners Input */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              Total Learners
            </span>
            <span className="text-emerald-400 font-bold text-sm">{learners.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min={500} 
            max={50000} 
            step={500}
            value={learners} 
            onChange={(e) => setLearners(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2"
          />
          <div className="text-2xs text-slate-500 flex justify-between">
            <span>500</span>
            <span>50,000</span>
          </div>
        </div>

        {/* Vehicles Input */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Bus className="w-4 h-4 text-amber-400" />
              Scholar Vehicles
            </span>
            <span className="text-amber-400 font-bold text-sm">{vehicles}</span>
          </div>
          <input 
            type="range" 
            min={5} 
            max={500} 
            step={5}
            value={vehicles} 
            onChange={(e) => setVehicles(Number(e.target.value))}
            className="w-full accent-amber-500 bg-slate-800 rounded-lg h-2"
          />
          <div className="text-2xs text-slate-500 flex justify-between">
            <span>5 Fleet</span>
            <span>500 Fleet</span>
          </div>
        </div>

        {/* Subscription Tariff */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-rose-400" />
              Monthly / Learner
            </span>
            <span className="text-rose-400 font-bold text-sm">R{monthlyFeePerLearner}</span>
          </div>
          <input 
            type="range" 
            min={20} 
            max={120} 
            step={5}
            value={monthlyFeePerLearner} 
            onChange={(e) => setMonthlyFeePerLearner(Number(e.target.value))}
            className="w-full accent-rose-500 bg-slate-800 rounded-lg h-2"
          />
          <div className="text-2xs text-slate-500 flex justify-between">
            <span>R20/mo</span>
            <span>R120/mo</span>
          </div>
        </div>

      </div>

      {/* Package Tier Selection */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <span className="text-xs font-mono text-slate-300 font-bold flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-400" />
          SLA & SLA Support Package Tier:
        </span>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['standard', 'premium', 'enterprise'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setSupportPackage(tier)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-mono capitalize transition ${
                supportPackage === tier
                  ? 'bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tier} {tier === 'standard' ? '(1.0x)' : tier === 'premium' ? '(1.15x SLA)' : '(1.30x 24/7)'}
            </button>
          ))}
        </div>
      </div>

      {/* Primary KPI Metrics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-1">
          <span className="text-2xs font-mono text-emerald-400 uppercase tracking-wider font-bold">Annual ARR Revenue</span>
          <div className="text-2xl font-black text-white font-mono">
            R{(annualRecurringRevenue / 1000000).toFixed(2)}M
          </div>
          <p className="text-2xs text-slate-400">R{(grossMonthlyRevenue / 1000).toFixed(1)}k Monthly Recurring Revenue</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-1">
          <span className="text-2xs font-mono text-cyan-400 uppercase tracking-wider font-bold">Initial Capex Setup</span>
          <div className="text-2xl font-black text-white font-mono">
            R{(totalHardwareCapex / 1000000).toFixed(2)}M
          </div>
          <p className="text-2xs text-slate-400">Wristbands + Gateways + Vehicle Units</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-1">
          <span className="text-2xs font-mono text-indigo-400 uppercase tracking-wider font-bold">Net Annual Opex Margin</span>
          <div className="text-2xl font-black text-white font-mono">
            R{(netAnnualMargin / 1000000).toFixed(2)}M
          </div>
          <p className="text-2xs text-slate-400">Excludes hardware amortization</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-1">
          <span className="text-2xs font-mono text-amber-400 uppercase tracking-wider font-bold">Year 1 Capex ROI</span>
          <div className="text-2xl font-black text-white font-mono">
            {roiPercentage}%
          </div>
          <p className="text-2xs text-slate-400">Payback Period: ~{(12 / (Number(roiPercentage) / 100)).toFixed(1)} Months</p>
        </div>

      </div>

      {/* 5-Year Financial Projection Chart */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-mono font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            5-Year Revenue Forecast (35% YoY Expansion Curve)
          </h4>
          <span className="text-2xs font-mono text-slate-400">SaaS Recurring Revenue Model</span>
        </div>

        <div className="grid grid-cols-5 gap-3 items-end h-36 pt-4 border-b border-slate-800">
          {forecast.map((item, idx) => {
            const maxVal = forecast[4].arr;
            const heightPercent = Math.max(15, (item.arr / maxVal) * 100);
            return (
              <div key={item.year} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-2xs font-mono text-cyan-300 font-bold">R{(item.arr / 1000000).toFixed(2)}M</span>
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    idx === 0 ? 'bg-cyan-500/40 border border-cyan-400' : 'bg-gradient-to-t from-cyan-600 to-indigo-500'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-2xs font-mono text-slate-400">{item.year}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
