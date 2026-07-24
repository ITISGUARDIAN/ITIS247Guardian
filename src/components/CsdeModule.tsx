import React, { useState } from 'react';
import {
  Brain,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Layers,
  FileCode,
  Award,
  Database,
  Radio,
  Clock,
  RotateCcw,
  Sliders,
  Check,
  Copy,
  TrendingUp,
  Cpu,
  Flame,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import {
  ThreatLevel,
  DecisionOutputType,
  CSDE_PIPELINE_STAGES,
  RISK_FACTOR_CATALOGUE,
  SAMPLE_LEARNER_BASELINE,
  CSDE_RULE_EXAMPLES,
  SAMPLE_RISK_ASSESSMENTS,
  CSDE_CODE_SPECS,
  CRITICAL_CSDE_RULES
} from '../data/csdeModuleData';

export function CsdeModule() {
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'pipeline' | 'rules' | 'baseline' | 'database' | 'nestjs'>('calculator');

  // Interactive Simulator Controls State
  const [simSos, setSimSos] = useState(false);
  const [simTamper, setSimTamper] = useState(false);
  const [simDeviationMeters, setSimDeviationMeters] = useState(0);
  const [simSpeedKmh, setSimSpeedKmh] = useState(15);
  const [simBatteryPercent, setSimBatteryPercent] = useState(85);
  const [simNightMovement, setSimNightMovement] = useState(false);

  // Live Risk Calculation Output
  const [calculatedScore, setCalculatedScore] = useState(12);
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>('LEVEL_1_GREEN');
  const [decisionOutput, setDecisionOutput] = useState<DecisionOutputType>('decision.safe');
  const [activeFactors, setActiveFactors] = useState<string[]>(['Routine Morning Transit']);
  const [suppressedAlert, setSuppressedAlert] = useState(false);

  // Spec Code State
  const [selectedSpecId, setSelectedSpecId] = useState(1);
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Run Dynamic Risk Score Calculation Simulation
  const handleRecalculateRiskScore = (
    sos = simSos,
    tamper = simTamper,
    devMeters = simDeviationMeters,
    speed = simSpeedKmh,
    battery = simBatteryPercent,
    night = simNightMovement
  ) => {
    let score = 0;
    const factors: string[] = [];
    let isSuppressed = false;

    // False Positive Suppressor Rule: Low battery (< 5%) with 0 speed and no tamper/sos
    if (battery < 5 && speed === 0 && !tamper && !sos) {
      isSuppressed = true;
      score = 15;
      factors.push('Low Battery (<5%) with Zero Movement -> Suppressed to device_failure');
    } else {
      if (sos) {
        score += 85;
        factors.push('Hardware SOS Panic Button (+85)');
      }
      if (tamper) {
        score += 35;
        factors.push('Optical Strap Tamper / Disconnect (+35)');
      }
      if (devMeters > 150) {
        score += 30;
        factors.push(`Corridor Deviation ${devMeters}m > 150m (+30)`);
      } else if (devMeters > 80) {
        score += 15;
        factors.push(`Corridor Deviation ${devMeters}m (+15)`);
      }
      if (speed > 40) {
        score += 25;
        factors.push(`Vehicular Speed ${speed} km/h (+25)`);
      }
      if (night) {
        score += 20;
        factors.push('Night Time Movement Outside Schedule (+20)');
      }
      if (battery < 10) {
        score += 10;
        factors.push('Battery Depleted < 10% (+10)');
      }
    }

    if (factors.length === 0) {
      factors.push('Routine Movement Within Safe Corridor');
      score = 12;
    }

    const finalScore = Math.min(100, Math.max(0, score));

    // Threat Mapping
    let threat: ThreatLevel = 'LEVEL_1_GREEN';
    let output: DecisionOutputType = 'decision.safe';

    if (isSuppressed) {
      threat = 'LEVEL_2_AMBER';
      output = 'decision.device_failure';
    } else if (sos || finalScore >= 81) {
      threat = 'LEVEL_4_RED';
      output = 'decision.critical';
    } else if (finalScore >= 61) {
      threat = 'LEVEL_3_ORANGE';
      output = 'decision.warning';
    } else if (finalScore >= 21) {
      threat = 'LEVEL_2_AMBER';
      output = 'decision.monitor';
    }

    setCalculatedScore(finalScore);
    setThreatLevel(threat);
    setDecisionOutput(output);
    setActiveFactors(factors);
    setSuppressedAlert(isSuppressed);

    showToast(`CSDE Re-Evaluated: Score ${finalScore} -> ${threat} (${output})`);
  };

  // Preset Trigger Handlers
  const handleTriggerPreset = (preset: 'SOS' | 'DEV_SPEED' | 'TAMPER_SIG' | 'LOW_BATT' | 'ROUTINE') => {
    if (preset === 'SOS') {
      setSimSos(true);
      setSimTamper(false);
      setSimDeviationMeters(10);
      setSimSpeedKmh(12);
      setSimBatteryPercent(90);
      setSimNightMovement(false);
      handleRecalculateRiskScore(true, false, 10, 12, 90, false);
    } else if (preset === 'DEV_SPEED') {
      setSimSos(false);
      setSimTamper(false);
      setSimDeviationMeters(185);
      setSimSpeedKmh(52);
      setSimBatteryPercent(80);
      setSimNightMovement(false);
      handleRecalculateRiskScore(false, false, 185, 52, 80, false);
    } else if (preset === 'TAMPER_SIG') {
      setSimSos(false);
      setSimTamper(true);
      setSimDeviationMeters(120);
      setSimSpeedKmh(35);
      setSimBatteryPercent(75);
      setSimNightMovement(false);
      handleRecalculateRiskScore(false, true, 120, 35, 75, false);
    } else if (preset === 'LOW_BATT') {
      setSimSos(false);
      setSimTamper(false);
      setSimDeviationMeters(0);
      setSimSpeedKmh(0);
      setSimBatteryPercent(3);
      setSimNightMovement(false);
      handleRecalculateRiskScore(false, false, 0, 0, 3, false);
    } else {
      setSimSos(false);
      setSimTamper(false);
      setSimDeviationMeters(5);
      setSimSpeedKmh(14);
      setSimBatteryPercent(95);
      setSimNightMovement(false);
      handleRecalculateRiskScore(false, false, 5, 14, 95, false);
    }
  };

  const activeSpec = CSDE_CODE_SPECS.find((s) => s.id === selectedSpecId) || CSDE_CODE_SPECS[0];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-indigo-400/40 backdrop-blur-md flex items-center space-x-3 animate-bounce">
          <Brain className="w-5 h-5 text-indigo-200" />
          <span className="font-medium text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/50 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> Child Safety Decision Engine (CSDE)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Operational Intelligence Brain & Threat Matrix
            </h1>
            <p className="text-slate-300 max-w-3xl text-sm leading-relaxed">
              Continuously evaluates telemetry and spatial streams across 10 decision stages to compute dynamic risk scores (0-100) and publish threat levels (GREEN, AMBER, ORANGE, RED).
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleTriggerPreset('SOS')}
              className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-red-600/30 transition-all active:scale-95 animate-pulse"
            >
              <Flame className="w-4 h-4" />
              <span>Trigger SOS Emergency</span>
            </button>

            <button
              onClick={() => handleTriggerPreset('DEV_SPEED')}
              className="flex items-center space-x-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-amber-600/30 transition-all active:scale-95"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Trigger Deviation + Speed</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Evaluation Latency</div>
            <div className="text-xl font-bold text-emerald-400 mt-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              &lt; 150 ms SLA
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Throughput SLA</div>
            <div className="text-xl font-bold text-indigo-400 mt-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              100,000 eval/s
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Threat Levels</div>
            <div className="text-xl font-bold text-cyan-400 mt-1 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              4 Levels (Green-Red)
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Analysis Stages</div>
            <div className="text-xl font-bold text-amber-400 mt-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              10 Stages
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
            <div className="text-xs text-slate-400 font-medium">Decoupled Rules</div>
            <div className="text-xs font-bold text-slate-200 mt-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Rules 1 & 2: Zero Dispatch/Notif
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center space-x-1 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'calculator'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Risk Calculator & Threat Simulator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pipeline')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'pipeline'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>10-Stage Decision Pipeline</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rules')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'rules'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Critical ITIS Rules (1 - 5)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('baseline')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'baseline'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Learner Behaviour Baseline</span>
        </button>

        <button
          onClick={() => setActiveSubTab('database')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'database'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>CSDE Database Tables</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nestjs')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'nestjs'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span>NestJS CSDE Specs</span>
        </button>
      </div>

      {/* SUBTAB 1: RISK CALCULATOR & THREAT SIMULATOR */}
      {activeSubTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" /> Dynamic Risk Factor Simulator
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Toggle live telemetry parameters to compute dynamic risk score (0 - 100)</p>
              </div>

              <button
                onClick={() => handleTriggerPreset('ROUTINE')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700"
              >
                Reset Controls
              </button>
            </div>

            {/* Quick Scenario Presets */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block">Scenario Presets:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  onClick={() => handleTriggerPreset('SOS')}
                  className="p-2.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-200 rounded-xl font-bold text-left transition-all"
                >
                  <span className="block text-red-400">1. SOS Emergency</span>
                  <span className="text-[10px] font-normal opacity-80">LEVEL_4_RED (Score 95)</span>
                </button>

                <button
                  onClick={() => handleTriggerPreset('DEV_SPEED')}
                  className="p-2.5 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/60 text-amber-200 rounded-xl font-bold text-left transition-all"
                >
                  <span className="block text-amber-400">2. Deviation + Speed</span>
                  <span className="text-[10px] font-normal opacity-80">LEVEL_3_ORANGE (Score 78)</span>
                </button>

                <button
                  onClick={() => handleTriggerPreset('TAMPER_SIG')}
                  className="p-2.5 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-800/60 text-indigo-200 rounded-xl font-bold text-left transition-all"
                >
                  <span className="block text-indigo-300">3. Tamper + Disconnect</span>
                  <span className="text-[10px] font-normal opacity-80">LEVEL_3_ORANGE (Score 65)</span>
                </button>

                <button
                  onClick={() => handleTriggerPreset('LOW_BATT')}
                  className="p-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl font-bold text-left transition-all"
                >
                  <span className="block text-slate-300">4. Low Battery False Alarm</span>
                  <span className="text-[10px] font-normal opacity-80">Suppressed to Fault</span>
                </button>
              </div>
            </div>

            {/* Individual Slider & Toggle Controls */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simSos}
                    onChange={(e) => {
                      setSimSos(e.target.checked);
                      handleRecalculateRiskScore(e.target.checked);
                    }}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-xs font-bold text-white">Hardware SOS Pressed</span>
                </label>

                <label className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simTamper}
                    onChange={(e) => {
                      setSimTamper(e.target.checked);
                      handleRecalculateRiskScore(undefined, e.target.checked);
                    }}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-xs font-bold text-white">Strap Tamper / Optical Cut</span>
                </label>
              </div>

              {/* Corridor Deviation Slider */}
              <div className="space-y-1 bg-slate-800/30 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Corridor Route Deviation</span>
                  <span className={simDeviationMeters > 150 ? 'text-amber-400 font-extrabold' : 'text-slate-300'}>
                    {simDeviationMeters} meters
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="5"
                  value={simDeviationMeters}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSimDeviationMeters(val);
                    handleRecalculateRiskScore(undefined, undefined, val);
                  }}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Speed Slider */}
              <div className="space-y-1 bg-slate-800/30 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Vehicle Speed</span>
                  <span className={simSpeedKmh > 40 ? 'text-amber-400 font-extrabold' : 'text-slate-300'}>
                    {simSpeedKmh} km/h
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="2"
                  value={simSpeedKmh}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSimSpeedKmh(val);
                    handleRecalculateRiskScore(undefined, undefined, undefined, val);
                  }}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Battery Slider */}
              <div className="space-y-1 bg-slate-800/30 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Battery Telemetry</span>
                  <span className={simBatteryPercent < 10 ? 'text-red-400 font-extrabold' : 'text-emerald-400 font-bold'}>
                    {simBatteryPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={simBatteryPercent}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSimBatteryPercent(val);
                    handleRecalculateRiskScore(undefined, undefined, undefined, undefined, val);
                  }}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Assessment Output Display Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Dynamic Threat Score Gauge Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" /> CSDE Risk Evaluation Gauge
                </h3>
                <span className="text-xs font-mono text-emerald-400 font-bold">Latency: 28 ms</span>
              </div>

              {/* Big Score Gauge */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Calculated Risk Score</span>
                  <div className="text-5xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
                    {calculatedScore}
                    <span className="text-lg text-slate-500 font-normal">/ 100</span>
                  </div>
                  <span className="text-xs text-indigo-300 font-mono block pt-1">
                    Evidence Hash: sha256-{Math.random().toString(36).substring(2, 8)}
                  </span>
                </div>

                {/* Threat Badge */}
                <div className={`px-6 py-4 rounded-2xl border text-center font-extrabold space-y-1 shadow-2xl ${
                  threatLevel === 'LEVEL_4_RED'
                    ? 'bg-red-950/80 border-red-500/80 text-red-200 animate-pulse ring-4 ring-red-500/30'
                    : threatLevel === 'LEVEL_3_ORANGE'
                    ? 'bg-amber-950/80 border-amber-500/80 text-amber-200'
                    : threatLevel === 'LEVEL_2_AMBER'
                    ? 'bg-yellow-950/80 border-yellow-500/80 text-yellow-200'
                    : 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200'
                }`}>
                  <span className="text-[10px] uppercase font-bold tracking-widest block opacity-80">THREAT LEVEL</span>
                  <div className="text-lg tracking-wide">{threatLevel}</div>
                  <span className="text-[10px] font-mono block text-indigo-200 font-bold">{decisionOutput}</span>
                </div>
              </div>

              {/* Active Risk Factors Stack */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Active Risk Factor Additions:</span>
                <div className="space-y-2">
                  {activeFactors.map((factor, idx) => (
                    <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80 text-xs font-medium text-slate-200 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        {factor}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">VERIFIED</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* False Positive Suppressor Notice */}
              {suppressedAlert && (
                <div className="p-4 bg-amber-950/40 border border-amber-500/50 rounded-xl text-xs text-amber-200 space-y-1">
                  <strong className="font-bold block flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> False Positive Suppressor Applied
                  </strong>
                  <p className="opacity-90">
                    Low battery telemetry detected with zero kinetic movement. Alert suppressed to standard maintenance event (decision.device_failure) avoiding unnecessary responder dispatch.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: 10-STAGE DECISION PIPELINE */}
      {activeSubTab === 'pipeline' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" /> 10-Stage Child Safety Decision Engine Pipeline
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Sequential analysis pipeline executing identity, device trust, spatial, kinematic, and baseline evaluations in under 150ms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {CSDE_PIPELINE_STAGES.map((stage) => (
              <div key={stage.stageNumber} className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    STAGE {stage.stageNumber}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">{stage.latencyMs}ms</span>
                </div>

                <h3 className="text-xs font-bold text-white mt-1">{stage.name}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{stage.description}</p>

                <div className="pt-2 border-t border-slate-700/60 text-[10px] font-mono text-indigo-300 truncate">
                  Module: {stage.evaluatorModule}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: CRITICAL ITIS RULES */}
      {activeSubTab === 'rules' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Critical ITIS Child Safety Decision Engine Rules (1 – 5)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Architectural constraints enforcing decoupled event publishing and zero direct notification/dispatch logic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CRITICAL_CSDE_RULES.map((rule) => (
              <div key={rule.id} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/80 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    RULE {rule.id}
                  </span>
                  <h3 className="text-sm font-bold text-white">{rule.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rule.ruleText}</p>
                <div className="pt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-indigo-300">
                    {rule.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: LEARNER BEHAVIOUR BASELINE */}
      {activeSubTab === 'baseline' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-400" /> Learner Movement Baseline & Anomaly Profile
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Historical movement fingerprint used by Stage 7 to compare current movement vectors against baseline departure times and routes.
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-bold text-white block">{SAMPLE_LEARNER_BASELINE.learnerName}</span>
                <span className="text-xs font-mono text-slate-400">{SAMPLE_LEARNER_BASELINE.learnerId}</span>
              </div>

              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30">
                Baseline Confidence: {SAMPLE_LEARNER_BASELINE.confidenceScorePct}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Typical Departure</span>
                <strong className="text-slate-200">{SAMPLE_LEARNER_BASELINE.typicalDepartureTime}</strong>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Typical Arrival</span>
                <strong className="text-slate-200">{SAMPLE_LEARNER_BASELINE.typicalArrivalTime}</strong>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Avg Travel Speed</span>
                <strong className="text-slate-200">{SAMPLE_LEARNER_BASELINE.avgTravelSpeedKmh} km/h</strong>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Avg Journey Duration</span>
                <strong className="text-slate-200">{SAMPLE_LEARNER_BASELINE.avgJourneyDurationMinutes} mins</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: DATABASE TABLES */}
      {activeSubTab === 'database' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-400" /> CSDE Persistent Database Tables
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Tables: <code className="text-indigo-300">risk_assessments</code>, <code className="text-indigo-300">decision_history</code>, <code className="text-indigo-300">learner_baselines</code>, <code className="text-indigo-300">false_positive_reviews</code>.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Decision History Record:</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-800 text-slate-300">
                    <th className="p-3">Assessment ID</th>
                    <th className="p-3">Learner ID</th>
                    <th className="p-3">Risk Score</th>
                    <th className="p-3">Threat Level</th>
                    <th className="p-3">Decision Event</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {SAMPLE_RISK_ASSESSMENTS.map((assessment) => (
                    <tr key={assessment.assessmentId} className="hover:bg-slate-800/40">
                      <td className="p-3 text-indigo-400 font-bold">{assessment.assessmentId}</td>
                      <td className="p-3 text-slate-300">{assessment.learnerId}</td>
                      <td className="p-3 font-bold text-white">{assessment.calculatedRiskScore} / 100</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          assessment.threatLevel === 'LEVEL_4_RED'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : assessment.threatLevel === 'LEVEL_3_ORANGE'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {assessment.threatLevel}
                        </span>
                      </td>
                      <td className="p-3 text-indigo-300">{assessment.decisionOutput}</td>
                      <td className="p-3 text-slate-400">{assessment.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 6: NESTJS CSDE SPECS */}
      {activeSubTab === 'nestjs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">Engineering Code Specs:</span>
            {CSDE_CODE_SPECS.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecId(spec.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedSpecId === spec.id
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{spec.title}</span>
                  <FileCode className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="text-[10px] opacity-80 mt-1 font-mono truncate">{spec.filename}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{activeSpec.filename}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{activeSpec.title}</h3>
              </div>

              <button
                onClick={() => handleCopyCode(activeSpec.id, activeSpec.code)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5"
              >
                {copiedCodeId === activeSpec.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === activeSpec.id ? 'Copied' : 'Copy Spec'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">{activeSpec.description}</p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto max-h-96">
              <pre>{activeSpec.code}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
