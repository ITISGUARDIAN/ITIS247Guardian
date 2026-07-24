import React, { useState } from 'react';
import {
  Brain,
  Shield,
  Activity,
  AlertTriangle,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  Search,
  CheckCircle2,
  Clock,
  Database,
  FileCode,
  Globe,
  Radio,
  RefreshCw,
  Sliders,
  BarChart3,
  GitBranch,
  ShieldCheck,
  Flame,
  ShieldAlert,
  ArrowRight,
  Eye,
  CheckCheck,
  UserCheck
} from 'lucide-react';
import {
  SAMPLE_LEARNER_PREDICTIONS,
  SAMPLE_ML_MODELS,
  SAMPLE_FEATURE_IMPORTANCE,
  SAMPLE_RISK_HEATMAPS,
  APCPE_CODE_SPECS,
  CRITICAL_APCPE_RULES,
  LearnerPredictionProfile,
  ModelHealthMetric,
  ApcpeCodeSpec,
  PredictionRiskLevel
} from '../data/apcpeData';

export const ApcpeModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'predictions' | 'xai' | 'baselines' | 'models' | 'heatmaps' | 'schema' | 'architecture'
  >('predictions');

  // Interactive States
  const [learnerPredictions, setLearnerPredictions] = useState<LearnerPredictionProfile[]>(
    SAMPLE_LEARNER_PREDICTIONS
  );
  const [selectedProfile, setSelectedProfile] = useState<LearnerPredictionProfile>(
    SAMPLE_LEARNER_PREDICTIONS[0]
  );
  const [mlModels, setMlModels] = useState<ModelHealthMetric[]>(SAMPLE_ML_MODELS);
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<ApcpeCodeSpec>(APCPE_CODE_SPECS[0]);

  // Filtering & Form States
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | PredictionRiskLevel>('ALL');
  const [predictionLog, setPredictionLog] = useState<string[]>([]);
  const [retrainLoading, setRetrainLoading] = useState(false);

  const addLog = (msg: string) => {
    setPredictionLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 8)]);
  };

  // Re-evaluate learner risk simulation
  const handleReevaluateRisk = (learnerId: string) => {
    const updatedScore = Math.floor(80 + Math.random() * 18);
    setLearnerPredictions((prev) =>
      prev.map((p) =>
        p.learnerId === learnerId
          ? {
              ...p,
              currentRiskScore: updatedScore,
              lastEvaluatedSecAgo: 0,
              confidencePct: 98.9,
              behaviorTrend: 'CRITICAL_SPIKE',
            }
          : p
      )
    );
    if (selectedProfile.learnerId === learnerId) {
      setSelectedProfile((prev) => ({
        ...prev,
        currentRiskScore: updatedScore,
        lastEvaluatedSecAgo: 0,
        confidencePct: 98.9,
        behaviorTrend: 'CRITICAL_SPIKE',
      }));
    }
    addLog(`RISK RE-EVALUATED for ${learnerId}: Score = ${updatedScore} (Inference: 18ms)`);
  };

  // Trigger manual model retraining
  const handleTriggerRetrain = (modelName: string) => {
    setRetrainLoading(true);
    addLog(`MODEL RETRAINING INITIALIZED: ${modelName} on GPU Cluster #2...`);
    setTimeout(() => {
      setMlModels((prev) =>
        prev.map((m) =>
          m.modelName === modelName
            ? {
                ...m,
                status: 'OPTIMAL',
                lastRetrained: 'Just Now (Manual Trigger)',
                driftPercentage: 0.2,
                accuracyPct: 99.1,
              }
            : m
        )
      );
      setRetrainLoading(false);
      addLog(`MODEL RETRAINING COMPLETE: ${modelName} updated with 2,400,000 new feature vectors.`);
    }, 1500);
  };

  const filteredProfiles = learnerPredictions.filter((p) => {
    const matchesSearch =
      p.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.learnerId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = riskFilter === 'ALL' || p.riskLevel === riskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl border border-purple-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-semibold">
              <Brain className="w-3.5 h-3.5 animate-pulse text-purple-400" />
              <span>— AI PREDICTIVE CHILD PROTECTION ENGINE (APCPE)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Predictive <span className="text-purple-400">Child Protection Engine</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Predicting child danger before an SOS button is pressed by continuously learning normal daily travel, walking routes, arrival windows, and transport behaviors across millions of protected learners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-purple-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-purple-400">&lt;150 ms</span>
              <span className="text-xs text-slate-400 font-medium">Inference Latency</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">98.6%</span>
              <span className="text-xs text-slate-400 font-medium">XGBoost Accuracy</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">SHAP XAI</span>
              <span className="text-xs text-slate-400 font-medium">Explainable AI</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('predictions')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'predictions'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4 text-purple-400" />
            <span>1. Live Learner Risk Predictions</span>
          </button>

          <button
            onClick={() => setActiveSubTab('xai')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'xai'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <GitBranch className="w-4 h-4 text-amber-400" />
            <span>2. Explainable AI (SHAP & Factors)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('baselines')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'baselines'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>3. Behavioral Baselines & Profiles</span>
          </button>

          <button
            onClick={() => setActiveSubTab('models')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'models'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>4. ML Ensemble & Continuous Training</span>
          </button>

          <button
            onClick={() => setActiveSubTab('heatmaps')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'heatmaps'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-red-400" />
            <span>5. Risk Heatmaps & Crime Corridors</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schema'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-indigo-400" />
            <span>6. Relational Prisma Schema</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'architecture'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>7. NestJS Services & REST</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: LIVE LEARNER RISK PREDICTIONS */}
      {activeSubTab === 'predictions' && (
        <div className="space-y-6">
          {/* SEARCH & RISK LEVEL FILTER BAR */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search learner name, school, or prediction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Risk Filter:</span>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value as any)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-purple-500 w-full sm:w-auto"
              >
                <option value="ALL">All Risk Levels</option>
                <option value="EXTREME_RISK">EXTREME RISK (Score 85-100)</option>
                <option value="HIGH_RISK">HIGH RISK (Score 65-84)</option>
                <option value="MEDIUM_RISK">MEDIUM RISK (Score 45-64)</option>
                <option value="LOW_RISK">LOW RISK (Score 25-44)</option>
                <option value="NORMAL">NORMAL (Score 0-24)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEARNER PREDICTIONS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {filteredProfiles.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProfile(p)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedProfile.id === p.id
                      ? 'bg-slate-900 border-purple-500/80 shadow-xl shadow-purple-900/20 ring-1 ring-purple-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono font-bold">
                        {p.learnerId}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-white">{p.learnerName}</h3>
                        <p className="text-xs text-slate-400">{p.schoolName}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide ${
                          p.riskLevel === 'EXTREME_RISK'
                            ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
                            : p.riskLevel === 'HIGH_RISK'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {p.riskLevel.replace('_', ' ')} ({p.currentRiskScore}/100)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-3">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                      <span className="text-[10px] text-slate-500 font-semibold block">Predicted Route</span>
                      <span className="text-slate-200 font-semibold truncate block">{p.predictedRoute}</span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                      <span className="text-[10px] text-slate-500 font-semibold block">Estimated Destination</span>
                      <span className="text-slate-200 font-semibold truncate block">{p.estimatedDestination}</span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                      <span className="text-[10px] text-slate-500 font-semibold block">AI Model Confidence</span>
                      <span className="text-purple-400 font-bold block">{p.confidencePct}% Confidence</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTED PREDICTION PROFILE DETAILED BREAKDOWN */}
            <div className="lg:col-span-1 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-bold text-white">XAI Risk Attribution</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono font-bold">
                  {selectedProfile.id}
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Risk Score Meter</span>
                    <span className="text-sm font-extrabold text-purple-400 font-mono">
                      {selectedProfile.currentRiskScore} / 100
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        selectedProfile.currentRiskScore >= 85
                          ? 'bg-red-500'
                          : selectedProfile.currentRiskScore >= 65
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${selectedProfile.currentRiskScore}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 pt-1">
                    Evaluated {selectedProfile.lastEvaluatedSecAgo}s ago via XGBoost + Isolation Forest Ensemble.
                  </p>
                </div>

                {/* CONTRIBUTING FACTORS LIST */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Top Contributing Risk Factors (XAI)
                  </span>

                  {selectedProfile.contributingFactors.map((factor, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{factor.factorName}</span>
                        <span className="text-purple-400 font-mono font-bold">+{factor.weightPct}% Weight</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">{factor.description}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleReevaluateRisk(selectedProfile.learnerId)}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Re-evaluate Prediction via Live Feature Stream</span>
                </button>
              </div>

              {/* SIMULATION EVENT LOG */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  APCPE Pipeline Log
                </span>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 h-28 overflow-y-auto space-y-1">
                  {predictionLog.length === 0 ? (
                    <span className="text-slate-600 italic">No prediction events logged in session.</span>
                  ) : (
                    predictionLog.map((log, idx) => (
                      <div key={idx} className="text-purple-400 border-b border-slate-900 pb-1">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: EXPLAINABLE AI (SHAP & FACTORS) */}
      {activeSubTab === 'xai' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-amber-400" />
                  <span>Explainable AI (XAI) & Global Feature Importance</span>
                </h3>
                <p className="text-xs text-slate-400">
                  SHAP (Shapley Additive exPlanations) values quantifying feature contributions across 2,400,000 daily inference cycles.
                </p>
              </div>

              <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-400 text-xs font-mono font-bold">
                KERNEL SHAP V0.4
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_FEATURE_IMPORTANCE.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{item.featureLabel}</span>
                    <span className="text-amber-400 font-mono font-bold">
                      {(item.importanceWeight * 100).toFixed(0)}% Importance
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${item.importanceWeight * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Feature Key: {item.featureKey}</span>
                    <span>Category: {item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: BEHAVIORAL BASELINES & PROFILES */}
      {activeSubTab === 'baselines' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>Learner 90-Day Behavioral Baselines Engine</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Normal Walking & Travel Routes', desc: 'Learns geodesic bounding corridors for daily home-to-school travel.', status: '98.7% Baseline Confidence' },
                { title: 'Arrival & Departure Windows', desc: 'Monitors historical school arrival times (e.g. 07:30 - 07:48 SAST).', status: 'Learned 90-Day Pattern' },
                { title: 'Registered Caregiver Schedules', desc: 'Maps authorized pickup vectors vs unknown transport vehicle stops.', status: '2 Guardians Registered' },
              ].map((b, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 block">{b.title}</span>
                  <p className="text-xs text-slate-300">{b.desc}</p>
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono font-bold">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ML ENSEMBLE & CONTINUOUS TRAINING */}
      {activeSubTab === 'models' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                <span>Production Machine Learning Models & Health</span>
              </h3>

              <button
                onClick={() => handleTriggerRetrain(mlModels[0].modelName)}
                disabled={retrainLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${retrainLoading ? 'animate-spin' : ''}`} />
                <span>{retrainLoading ? 'Retraining...' : 'Trigger Nightly Retrain Job'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mlModels.map((m, idx) => (
                <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{m.modelName}</h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.status === 'OPTIMAL'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono">{m.algorithm}</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                    <div>Accuracy: <span className="text-emerald-400 font-mono font-bold">{m.accuracyPct}%</span></div>
                    <div>F1 Score: <span className="text-purple-400 font-mono font-bold">{m.f1Score}</span></div>
                    <div>Latency: <span className="text-blue-400 font-mono font-bold">{m.avgLatencyMs} ms</span></div>
                    <div>Data Drift: <span className="text-amber-400 font-mono font-bold">{m.driftPercentage}%</span></div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono border-t border-slate-900 pt-2">
                    Last Retrained: {m.lastRetrained}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: RISK HEATMAPS & CRIME CORRIDORS */}
      {activeSubTab === 'heatmaps' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Globe className="w-5 h-5 text-red-400" />
              <span>Spatial Risk Heatmaps & SAPS Crime Hotspots</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_RISK_HEATMAPS.map((zone) => (
                <div key={zone.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-400">{zone.id}</span>
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 text-[10px] font-bold">
                      Crime Index: {zone.historicalCrimeIndex}/10
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{zone.zoneName}</h4>

                  <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                    <div className="flex justify-between">
                      <span>Tracked Learners Currently in Zone:</span>
                      <span className="text-white font-mono font-bold">{zone.activeTrackedLearners}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Predicted High-Risk Learners:</span>
                      <span className="text-amber-400 font-mono font-bold">{zone.predictedHighRiskCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: RELATIONAL PRISMA SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Prisma Relational Database Schema for APCPE</h3>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-bold">
                Relational Model
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                {APCPE_CODE_SPECS[0].code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: NESTJS SERVICES & REST */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-bold text-white">NestJS Services, XAI & REST Controllers</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {APCPE_CODE_SPECS.map((spec) => (
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
          <Shield className="w-5 h-5 text-purple-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_APCPE_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-purple-400">RULE #{rule.id}</span>
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
