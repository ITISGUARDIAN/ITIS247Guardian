import React from 'react';
import { Shield, Globe, Layers, Search, Compass, FileCheck2, ShieldAlert, Brain, Flame, Siren, Bell, FileCode, Database, Server, KeyRound, School, Users, Smartphone, Cpu, Link2, Radio, Activity, MapPin, BarChart3, CreditCard, Building2, Cloud, Award, GraduationCap, Box, Heart, Wrench, Zap, Palette, ShieldCheck, Package, Rocket } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  ITIS
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Learner Safety Platform
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Africa's Coordinated Child Safety Architecture & Decision Engine
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 overflow-x-auto">
            {/* 1. ITIS CORPORATE WEBSITE (PRIMARY / DEFAULT ROUTE) */}
            <button
              onClick={() => setActiveTab('website')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'website'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/40 ring-1 ring-amber-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>ITIS Corporate Website (/)</span>
            </button>

            {/* 2. ENTERPRISE AUTH / LOGIN */}
            <button
              onClick={() => setActiveTab('auth')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'auth'
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/40 ring-1 ring-indigo-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-indigo-300" />
              <span>Enterprise Login (/login)</span>
            </button>

            {/* 3. PARENT PORTAL */}
            <button
              onClick={() => setActiveTab('parentportal')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'parentportal'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30 ring-1 ring-amber-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-amber-400" />
              <span>Parent Portal (/parent)</span>
            </button>

            {/* 4. SCHOOL ADMIN PORTAL */}
            <button
              onClick={() => setActiveTab('schoolportal')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'schoolportal'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 ring-1 ring-blue-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <School className="w-3.5 h-3.5 text-blue-400" />
              <span>School Admin Portal (/school)</span>
            </button>

            {/* 5. NATIONAL C3 COMMAND CENTRE */}
            <button
              onClick={() => setActiveTab('c3command')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'c3command'
                  ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/40 ring-1 ring-red-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Siren className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>C3 Command Centre (/command)</span>
            </button>

            {/* 6. EMERGENCY RESPONDER MOBILE */}
            <button
              onClick={() => setActiveTab('responderapp')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'responderapp'
                  ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/40 ring-1 ring-red-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Responder Mobile (/responder)</span>
            </button>

            {/* 7. FIELD TECH APP */}
            <button
              onClick={() => setActiveTab('fieldtech')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'fieldtech'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/40 ring-1 ring-amber-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Field Tech App (/technician)</span>
            </button>

            {/* 8. NATIONAL GOV PORTAL */}
            <button
              onClick={() => setActiveTab('natgov')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'natgov'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/40 ring-1 ring-blue-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>National Gov Portal (/government)</span>
            </button>

            {/* 9. EXECUTIVE CABINET DASHBOARD */}
            <button
              onClick={() => setActiveTab('execcabinet')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'execcabinet'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/40 ring-1 ring-amber-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Exec Cabinet (/executive)</span>
            </button>

            {/* 10. NATIONAL GO-LIVE & DEPLOYMENT PLATFORM */}
            <button
              onClick={() => setActiveTab('production_deployment')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'production_deployment'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/40 ring-1 ring-emerald-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Rocket className="w-3.5 h-3.5 text-emerald-400" />
              <span>Go-Live & Deployment (/deployment)</span>
            </button>

            <button
              onClick={() => setActiveTab('workspace')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'workspace'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-1 ring-amber-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Box className="w-3.5 h-3.5 text-amber-400" />
              <span>Production Workspace Foundation (Phase 2)</span>
            </button>

            <button
              onClick={() => setActiveTab('academy')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'academy'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Academy & LMS (Prompt 054)</span>
            </button>

            <button
              onClick={() => setActiveTab('digitaltwin')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'digitaltwin'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Digital Twin & Simulation Platform (Prompt 051)</span>
            </button>

            <button
              onClick={() => setActiveTab('mebim')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'mebim'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-1 ring-amber-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Master Enterprise Blueprint & Plan (Prompt 050)</span>
            </button>

            <button
              onClick={() => setActiveTab('ebocgcip')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'ebocgcip'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>Enterprise Governance & Operations (Prompt 049)</span>
            </button>

            <button
              onClick={() => setActiveTab('commprocure')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'commprocure'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Commercial Launch & Procurement (Prompt 048)</span>
            </button>

            <button
              onClick={() => setActiveTab('hwcert')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'hwcert'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-1 ring-teal-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-teal-400" />
              <span>Hardware Wearable Engineering (Prompt 047)</span>
            </button>

            <button
              onClick={() => setActiveTab('aicipilot')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'aicipilot'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Operations Copilot (Prompt 046)</span>
            </button>

            <button
              onClick={() => setActiveTab('nrpeos')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'nrpeos'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>National Expansion NRPEOS (Prompt 045)</span>
            </button>

            <button
              onClick={() => setActiveTab('npdoapm')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'npdoapm'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pilot Rollout NPDOAPM (Prompt 044)</span>
            </button>

            <button
              onClick={() => setActiveTab('eqavcpr')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'eqavcpr'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>QA & Certification EQAVCPR (Prompt 043)</span>
            </button>

            <button
              onClick={() => setActiveTab('edcndp')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'edcndp'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              <span>DevSecOps & Cloud EDCNDP (Prompt 042)</span>
            </button>

            <button
              onClick={() => setActiveTab('ecztdp')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'ecztdp'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-1 ring-rose-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Cybersecurity ECZTDP (Prompt 041)</span>
            </button>

            <button
              onClick={() => setActiveTab('namgp')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'namgp'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>National Govt Platform NAMGP (Prompt 040)</span>
            </button>

            <button
              onClick={() => setActiveTab('ftdpa')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'ftdpa'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-1 ring-amber-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Field Tech Provisioning App FTDPA (Prompt 039)</span>
            </button>

            <button
              onClick={() => setActiveTab('erma')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'erma'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-1 ring-rose-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Siren className="w-3.5 h-3.5 text-rose-400" />
              <span>Emergency Responder App ERMA (Prompt 038)</span>
            </button>

            <button
              onClick={() => setActiveTab('sap')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'sap'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <School className="w-3.5 h-3.5 text-cyan-400" />
              <span>School Admin Portal SAP (Prompt 037)</span>
            </button>

            <button
              onClick={() => setActiveTab('pma')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'pma'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Parent Mobile App PMA (Prompt 036)</span>
            </button>

            <button
              onClick={() => setActiveTab('bserme')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'bserme'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Revenue Engine BSERME (Prompt 035)</span>
            </button>

            <button
              onClick={() => setActiveTab('epore')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'epore'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>SRE Platform Operations EPORE (Prompt 034)</span>
            </button>

            <button
              onClick={() => setActiveTab('earnsip')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'earnsip'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-1 ring-teal-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
              <span>National Intelligence EARNSIP (Prompt 033)</span>
            </button>

            <button
              onClick={() => setActiveTab('eiepg')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'eiepg'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>External Gateway EIEPG (Prompt 032)</span>
            </button>

            <button
              onClick={() => setActiveTab('dfcce')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'dfcce'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Digital Forensics DFCCE (Prompt 031)</span>
            </button>

            <button
              onClick={() => setActiveTab('apcpe')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'apcpe'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>AI Predictive Protection APCPE (Prompt 030)</span>
            </button>

            <button
              onClick={() => setActiveTab('c3')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'c3'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Command Centre C3 (Prompt 029)</span>
            </button>

            <button
              onClick={() => setActiveTab('psnce')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'psnce'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Notifications PSNCE (Prompt 028)</span>
            </button>

            <button
              onClick={() => setActiveTab('ercde')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'ercde'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Siren className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Dispatch Engine ERCDE (Prompt 027)</span>
            </button>

            <button
              onClick={() => setActiveTab('eioe')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'eioe'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Incident Engine EIOE (Prompt 026)</span>
            </button>

            <button
              onClick={() => setActiveTab('csde')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'csde'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-cyan-400" />
              <span>Decision Engine CSDE (Prompt 025)</span>
            </button>

            <button
              onClick={() => setActiveTab('geofence')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'geofence'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Spatial Geofencing (Prompt 024)</span>
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'telemetry'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-Time Telemetry (Prompt 023)</span>
            </button>

            <button
              onClick={() => setActiveTab('pairing')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'pairing'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Link2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Device Pairing (Prompt 022)</span>
            </button>

            <button
              onClick={() => setActiveTab('device')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'device'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Devices & IoT (Prompt 021)</span>
            </button>

            <button
              onClick={() => setActiveTab('learner')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'learner'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Learners (Prompt 020)</span>
            </button>

            <button
              onClick={() => setActiveTab('parent')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'parent'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>Parents & Guardians (Prompt 019)</span>
            </button>

            <button
              onClick={() => setActiveTab('school')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'school'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <School className="w-3.5 h-3.5 text-cyan-400" />
              <span>School Management (Prompt 018)</span>
            </button>

            <button
              onClick={() => setActiveTab('iam')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'iam'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>Identity & Auth (Prompt 017)</span>
            </button>

            <button
              onClick={() => setActiveTab('nestjs')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'nestjs'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <span>NestJS Foundation</span>
            </button>

            <button
              onClick={() => setActiveTab('decision')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'decision'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Decision Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('sprint1')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'sprint1'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Sprint 1 Spec</span>
            </button>

            <button
              onClick={() => setActiveTab('db_sprint1')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'db_sprint1'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Database Schema</span>
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'pipeline'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-300" />
              <span>Safety Pipeline</span>
            </button>

            <button
              onClick={() => setActiveTab('capabilities')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'capabilities'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Taxonomy</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('vision')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'vision'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Vision 2035</span>
            </button>

            <button
              onClick={() => setActiveTab('srs')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'srs'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>SRS Overview</span>
            </button>
          </nav>

          {/* Search Box */}
          <div className="relative w-64 hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services, modules..."
              className="w-full bg-slate-800/90 text-slate-100 text-xs rounded-xl pl-9 pr-4 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 placeholder-slate-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
