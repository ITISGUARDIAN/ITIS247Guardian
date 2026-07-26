import React, { useState } from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  ShieldCheck, 
  Settings, 
  PhoneCall, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  FileText,
  Video
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'parents' | 'schools' | 'security' | 'technical';
}

const FAQS: FAQItem[] = [
  {
    category: 'general',
    question: 'What is ITIS and how does it protect South African learners?',
    answer: 'ITIS (Integrated Transport & Identity Safety) is an enterprise IoT and safety platform combining tamper-resistant wearable wristbands, vehicle telematics, and classroom BLE scanners to automate morning roll-call and provide instant sub-meter emergency dispatch during distress calls.'
  },
  {
    category: 'parents',
    question: 'How do parents receive notifications and track their children?',
    answer: 'Parents download the free ITIS Parent Mobile App (iOS & Android). Whenever their child boards a scholar bus, arrives at school, enters the classroom, or departs in the afternoon, push notifications and SMS alerts are instantly delivered.'
  },
  {
    category: 'parents',
    question: 'Is my child’s personal data protected under POPIA?',
    answer: 'Yes. ITIS strictly adheres to the Protection of Personal Information Act (POPIA). Wearable bands contain only cryptographic SHA-256 hashes without visible names. Location data is encrypted in transit and stored exclusively within South African data centers.'
  },
  {
    category: 'schools',
    question: 'Does ITIS require schools to install expensive computers or cameras?',
    answer: 'No. ITIS utilizes compact wall-mounted BLE Mesh Gateways in classrooms and entry gates that automatically scan student wristbands in under 1 second without manual teacher intervention.'
  },
  {
    category: 'schools',
    question: 'How long does it take to onboard a school of 1,000 learners?',
    answer: 'Using the ITIS Technician NFC App, field technicians can provision and issue wristbands to 1,000 learners in less than 4 hours during school registration day.'
  },
  {
    category: 'security',
    question: 'What happens when a learner triggers the SOS button on their wristband?',
    answer: 'Holding the wristband SOS button for 3 seconds triggers an immediate high-priority panic alert. Within 1.2 seconds, sub-meter GPS coordinates, child details, and nearby camera/bus feeds are transmitted to campus security and the nearest SAPS 10111 command desk.'
  },
  {
    category: 'technical',
    question: 'Does the system work during load-shedding or power outages?',
    answer: 'Yes. All classroom BLE gateways and vehicle hubs feature internal 12-hour LiFePO4 battery backups and local offline mesh storage, ensuring uninterrupted attendance tracking even when power grids fail.'
  }
];

export function PublicDocsFAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = activeCategory === 'all' 
    ? FAQS 
    : FAQS.filter(f => f.category === activeCategory);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">Public Documentation & Knowledge Base</h3>
          </div>
          <p className="text-xs text-slate-400">
            Implementation guides, security overviews, frequently asked questions, and training resources.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-xl border border-slate-700 transition flex items-center gap-2">
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Deployment Guide PDF</span>
          </button>
        </div>
      </div>

      {/* Docs Overview Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
            <FileText className="w-4 h-4" /> School Onboarding Manual
          </div>
          <p className="text-2xs text-slate-400">Step-by-step guide for principals, SGB members, and teachers on system setup and daily roll-call administration.</p>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> POPIA & Security Whitepaper
          </div>
          <p className="text-2xs text-slate-400">Comprehensive cryptographic architecture breakdown detailing mTLS authentication, SHA-256 hashing, and cloud residency.</p>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
            <Video className="w-4 h-4" /> Video Training Library
          </div>
          <p className="text-2xs text-slate-400">Short 2-minute video tutorials for parents, scholar transport drivers, and security personnel in 11 official SA languages.</p>
        </div>

      </div>

      {/* FAQ Category Filter */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-mono font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" /> Frequently Asked Questions
          </h4>

          <div className="flex items-center gap-2 overflow-x-auto">
            {['all', 'parents', 'schools', 'security', 'technical'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-2xs font-mono capitalize transition ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-sans text-xs font-bold text-white flex items-center justify-between gap-4 hover:bg-slate-900/60 transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-cyan-400 font-mono text-2xs uppercase">[{faq.category}]</span>
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed font-sans border-t border-slate-900 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
