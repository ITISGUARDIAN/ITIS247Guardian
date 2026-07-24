import React from 'react';
import { Shield, Mail, Phone, Lock, ExternalLink, Globe, FileText, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigateTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-300 mt-16 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-slate-800/80 pb-10">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-wider">ITIS</span>
                <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800/50">
                  Sovereign Child Safety
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Integrated Transport & Safety (ITIS) — South Africa's official sovereign child safety platform uniting 12.4M learners across 23,000+ public schools, DBE, DoT, SAPS, and SITA C3 Command Centres.
            </p>

            {/* Official Contact Details */}
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">National Support Hotline:</span>
                <a href="tel:0624304906" className="text-amber-400 hover:underline font-bold">
                  062 430 4906
                </a>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold">Official Email:</span>
                <a href="mailto:itis.intergrated@gmail.com" className="text-indigo-400 hover:underline font-bold">
                  itis.intergrated@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Company & Portals */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider text-amber-400">
              Company & Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab?.('website')} className="hover:text-white transition-colors">
                  About ITIS Platform
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab?.('parentportal')} className="hover:text-white transition-colors">
                  Parent & Guardian Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab?.('schoolportal')} className="hover:text-white transition-colors">
                  School Admin Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab?.('c3command')} className="hover:text-white transition-colors">
                  C3 Command Centre
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab?.('responderapp')} className="hover:text-white transition-colors">
                  Emergency Responder App
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance & Government */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider text-amber-400">
              Government & Exec
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab?.('natgov')} className="hover:text-white transition-colors">
                  National Government Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab?.('execcabinet')} className="hover:text-white transition-colors">
                  Executive Cabinet Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab?.('fieldtech')} className="hover:text-white transition-colors">
                  Field Technician App
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab?.('auth')} className="hover:text-white transition-colors flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-indigo-400" />
                  <span>Enterprise SSO Login</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider text-amber-400">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>POPIA Compliant</span>
              </li>
              <li className="flex items-center space-x-1.5 text-blue-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ISO 27001 Certified</span>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#popia" className="hover:text-white transition-colors">POPIA Manual & Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Social Media & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <p>© 2026 Integrated Transport & Safety (ITIS) Platform. Republic of South Africa. All Rights Reserved.</p>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">Twitter / X</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">Facebook</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
