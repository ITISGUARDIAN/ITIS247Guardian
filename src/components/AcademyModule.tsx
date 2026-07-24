import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  FileCheck2,
  Brain,
  Search,
  Lock,
  Terminal,
  Download,
  Users,
  Building2,
  ShieldAlert,
  FileCode,
  Sliders,
  BarChart3,
  RefreshCw,
  Sparkles,
  HelpCircle,
  Clock,
  Send,
  AlertTriangle,
  Siren,
  Laptop
} from 'lucide-react';
import {
  SAMPLE_ACADEMY_COURSES,
  SAMPLE_COURSE_MODULES,
  SAPS_EXAM_QUESTIONS,
  SAMPLE_ISSUED_CERTIFICATES,
  ACADEMY_CODE_SPECS,
  CRITICAL_ACADEMY_RULES,
  AcademyCourse,
  CourseModule,
  ExamQuestion,
  IssuedDigitalCertificate,
  AcademyCodeSpec
} from '../data/academyData';

export const AcademyModule: React.FC = () => {
  // Sub-tab Navigation
  const [activeSubTab, setActiveSubTab] = useState<
    'catalog' | 'module_player' | 'exam_engine' | 'cert_registry' | 'code_specs'
  >('catalog');

  // State
  const [courses] = useState<AcademyCourse[]>(SAMPLE_ACADEMY_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse>(SAMPLE_ACADEMY_COURSES[3]); // SAPS CAD by default
  const [selectedCodeSpec, setSelectedCodeSpec] = useState<AcademyCodeSpec>(ACADEMY_CODE_SPECS[0]);
  const [certificates, setCertificates] = useState<IssuedDigitalCertificate[]>(SAMPLE_ISSUED_CERTIFICATES);

  // Interactive AI Learning Tutor State
  const [tutorQuery, setTutorQuery] = useState<string>('');
  const [tutorChat, setTutorChat] = useState<Array<{ sender: 'USER' | 'AI'; text: string }>>([
    { sender: 'AI', text: 'Greetings, Officer. I am your ITIS AI Learning Assistant. Ask me anything about sub-900ms SAPS CAD dispatch protocols, wearable pairing, or geofence rules.' },
  ]);

  // Interactive Exam State
  const [examAnswers, setExamAnswers] = useState<number[]>([1, 2, 1]); // default pre-filled
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number | null>(null);
  const [newlyIssuedCert, setNewlyIssuedCert] = useState<IssuedDigitalCertificate | null>(null);

  // Verification Hash Input State
  const [searchHash, setSearchHash] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // Operational Logs
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] ACADEMY ENGINE: Connected to SITA National Accreditation Database.`,
    `[${new Date().toLocaleTimeString()}] CERTIFICATION SERVICE: SHA-256 certificate ledger ready.`,
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const handleTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuery.trim()) return;

    const userText = tutorQuery;
    setTutorQuery('');
    setTutorChat((prev) => [...prev, { sender: 'USER', text: userText }]);

    setTimeout(() => {
      let aiReply = 'Regarding your query: The ITIS system enforces a sub-900ms SLA for all emergency dispatch events. Hardware wearables sign telemetry packets with ECDSA P-256 via STSAFE-A110 secure elements.';
      if (userText.toLowerCase().includes('parent') || userText.toLowerCase().includes('pair')) {
        aiReply = 'Parent pairing uses NFC or Bluetooth BLE 5.3. Tap the wearable against your smartphone while in the ITIS Parent App to automatically link the learner profile.';
      } else if (userText.toLowerCase().includes('school') || userText.toLowerCase().includes('emis')) {
        aiReply = 'School administrators verify learners via the DBE EMIS ID portal. Classroom safe geofences automatically alert safety directors during unauthorized exit.';
      }
      setTutorChat((prev) => [...prev, { sender: 'AI', text: aiReply }]);
    }, 400);
  };

  const handleSubmitExam = () => {
    let score = 0;
    SAPS_EXAM_QUESTIONS.forEach((q, idx) => {
      if (examAnswers[idx] === q.correctOptionIndex) {
        score++;
      }
    });

    const scorePct = Math.round((score / SAPS_EXAM_QUESTIONS.length) * 100);
    setExamScore(scorePct);
    setExamSubmitted(true);

    if (scorePct >= 80) {
      const newCertId = `CERT-SAPS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const cert: IssuedDigitalCertificate = {
        certificateId: newCertId,
        recipientName: 'Officer J. van der Merwe',
        recipientRole: 'SAPS Flying Squad Specialist',
        courseTitle: selectedCourse.title,
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '2028-07-22',
        verificationHashSha256: `9a2f${Math.random().toString(16).substring(2, 10)}881023c91f00a`,
        accreditationAuthority: 'SAPS National Academy & DBE Safety Board',
      };

      setNewlyIssuedCert(cert);
      setCertificates((prev) => [cert, ...prev]);
      addLog(`EXAM PASSED (${scorePct}%): Issued cryptographic certificate ${newCertId} (SHA-256).`);
    } else {
      addLog(`EXAM FAILED (${scorePct}%): Below 80% pass mark. Retake required.`);
    }
  };

  const handleVerifyHash = () => {
    if (!searchHash.trim()) {
      setVerificationResult('Please enter a valid certificate ID or SHA-256 hash.');
      return;
    }

    const found = certificates.find(
      (c) =>
        c.certificateId.toLowerCase().includes(searchHash.toLowerCase()) ||
        c.verificationHashSha256.toLowerCase().includes(searchHash.toLowerCase())
    );

    if (found) {
      setVerificationResult(
        `✓ VERIFIED VALID: Issued to ${found.recipientName} (${found.recipientRole}) for course '${found.courseTitle}'. Accreditation: ${found.accreditationAuthority}. Valid until ${found.expiryDate}.`
      );
    } else {
      setVerificationResult(`❌ INVALID OR UNREGISTERED: Hash '${searchHash}' not found in the SITA Cryptographic Ledger.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-2xl border border-indigo-800/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
              <span>— NATIONAL TRAINING ACADEMY & LEARNING MANAGEMENT SYSTEM (LMS)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ITIS National Training Academy & <span className="text-indigo-400">LMS Platform</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Comprehensive national accreditation framework for Parents, School Administrators, Hardware Technicians, SAPS Flying Squad 10111 Dispatchers, and SSA Command Supervisors. AI-assisted learning, interactive exams, and cryptographic SHA-256 digital certificate minting.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-4 rounded-xl border border-indigo-800/30">
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-indigo-400">5 Tracks</span>
              <span className="text-xs text-slate-400 font-medium">Role Curriculums</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-emerald-400">100%</span>
              <span className="text-xs text-slate-400 font-medium">SHA-256 Cryptographic</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-amber-400">80%+</span>
              <span className="text-xs text-slate-400 font-medium">Pass Threshold</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE NAVIGATION TABS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'catalog'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
            <span>1. Course Catalog & LMS Tracks</span>
          </button>

          <button
            onClick={() => setActiveSubTab('module_player')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'module_player'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span>2. Module Player & AI Learning Tutor</span>
          </button>

          <button
            onClick={() => setActiveSubTab('exam_engine')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'exam_engine'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Interactive Exam Engine</span>
          </button>

          <button
            onClick={() => setActiveSubTab('cert_registry')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'cert_registry'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>4. Digital Certificate Ledger</span>
          </button>

          <button
            onClick={() => setActiveSubTab('code_specs')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'code_specs'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-amber-300" />
            <span>5. LMS Code Specs & APIs</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL LOGS AUDIT CONSOLE */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-indigo-400 font-bold border-b border-slate-800 pb-2">
          <span className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 animate-pulse text-indigo-400" />
            <span>National Training Academy & Accreditation Console</span>
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

      {/* SUB-TAB 1: COURSE CATALOG */}
      {activeSubTab === 'catalog' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>National Role-Based Accreditation Curriculums</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {courses.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCourse(c)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 ${
                  selectedCourse.id === c.id
                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-800'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold text-[10px]">
                    {c.category}
                  </span>
                  <span className="text-emerald-400 font-bold text-[10px]">Pass: {c.passMarkPct}%</span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">{c.title}</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">{c.description}</p>

                <div className="space-y-1 text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
                  <p>Target Role: <strong className="text-slate-200">{c.targetRole}</strong></p>
                  <p>Duration: <strong className="text-amber-300">{c.durationMinutes} Minutes ({c.totalModulesCount} Modules)</strong></p>
                  <p>Badge: <strong className="text-emerald-400">{c.badge}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MODULE PLAYER & AI TUTOR */}
      {activeSubTab === 'module_player' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>Active Learning Module & AI Safety Tutor</span>
              </h3>
              <p className="text-xs text-slate-400">Course: {selectedCourse.title}</p>
            </div>

            <button
              onClick={() => setActiveSubTab('exam_engine')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>TAKE FINAL ACCREDITATION EXAM</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* MODULE CONTENT */}
            <div className="space-y-4">
              <span className="text-indigo-400 font-bold block border-b border-slate-800 pb-2">Module Lessons Curriculum</span>

              {SAMPLE_COURSE_MODULES.map((m) => (
                <div key={m.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-sm font-bold text-white">{m.moduleTitle}</h4>
                  <p className="text-slate-300 text-[11px]">{m.contentSummary}</p>

                  <div className="space-y-1 pt-1">
                    <span className="text-amber-400 font-semibold block text-[10px]">Key Learning Objectives:</span>
                    <ul className="list-disc list-inside text-slate-400 text-[10px] space-y-0.5">
                      {m.keyTakeaways.map((k, kIdx) => (
                        <li key={kIdx}>{k}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* AI TUTOR CHAT SIMULATOR */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between space-y-4 h-96">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-purple-400 font-bold">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>ITIS Gemini AI Learning Tutor</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {tutorChat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg text-xs ${
                      msg.sender === 'USER'
                        ? 'bg-indigo-900/60 text-white ml-auto max-w-[85%]'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 max-w-[90%]'
                    }`}
                  >
                    <span className="text-[10px] font-bold block opacity-70">
                      {msg.sender === 'USER' ? 'You' : 'AI Assistant'}
                    </span>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleTutorSubmit} className="flex gap-2 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Ask AI Tutor a question..."
                  value={tutorQuery}
                  onChange={(e) => setTutorQuery(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: EXAM ENGINE */}
      {activeSubTab === 'exam_engine' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Interactive Examination Engine & Digital Certification</span>
              </h3>
              <p className="text-xs text-slate-400">Exam: {selectedCourse.title} (Required Pass: {selectedCourse.passMarkPct}%)</p>
            </div>

            {examScore !== null && (
              <span className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                examScore >= 80
                  ? 'bg-emerald-950 border-emerald-800 text-emerald-300'
                  : 'bg-rose-950 border-rose-800 text-rose-300'
              }`}>
                SCORE: {examScore}% ({examScore >= 80 ? 'PASSED & MINTED' : 'FAILED - RETRY'})
              </span>
            )}
          </div>

          <div className="space-y-6 font-mono text-xs">
            {SAPS_EXAM_QUESTIONS.map((q, qIdx) => (
              <div key={q.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white">
                  Question {qIdx + 1}: {q.questionText}
                </h4>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center space-x-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        examAnswers[qIdx] === optIdx
                          ? 'bg-indigo-950/80 border-indigo-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q_${q.id}`}
                        checked={examAnswers[qIdx] === optIdx}
                        onChange={() => {
                          const newAns = [...examAnswers];
                          newAns[qIdx] = optIdx;
                          setExamAnswers(newAns);
                        }}
                        className="accent-indigo-500"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>

                {examSubmitted && (
                  <p className="text-[11px] text-amber-300 pt-1">
                    💡 Explanation: {q.explanation}
                  </p>
                )}
              </div>
            ))}

            <button
              onClick={handleSubmitExam}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-600/30"
            >
              <Award className="w-4 h-4" />
              <span>SUBMIT EXAM & MINT SHA-256 DIGITAL CERTIFICATE</span>
            </button>

            {newlyIssuedCert && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500 rounded-xl space-y-2 text-slate-200">
                <span className="text-emerald-400 font-bold block text-sm">🎉 Cryptographic Digital Certificate Issued!</span>
                <p>Certificate ID: <strong className="text-white">{newlyIssuedCert.certificateId}</strong></p>
                <p>Recipient: <strong className="text-white">{newlyIssuedCert.recipientName}</strong></p>
                <p>SHA-256 Hash: <strong className="text-amber-300 font-mono text-[10px] break-all">{newlyIssuedCert.verificationHashSha256}</strong></p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: CERT REGISTRY */}
      {activeSubTab === 'cert_registry' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
            <FileCheck2 className="w-5 h-5 text-cyan-400" />
            <span>National Cryptographic SHA-256 Digital Certificate Ledger</span>
          </h3>

          {/* VERIFICATION SEARCH BAR */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">SITA Public Certificate Verification Portal:</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Certificate ID or SHA-256 Hash..."
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleVerifyHash}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-lg transition-all flex items-center space-x-1"
              >
                <Search className="w-3.5 h-3.5" />
                <span>VERIFY HASH</span>
              </button>
            </div>

            {verificationResult && (
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-200">
                {verificationResult}
              </div>
            )}
          </div>

          {/* CERTIFICATE LEDGER LIST */}
          <div className="space-y-3 font-mono text-xs">
            {certificates.map((cert) => (
              <div key={cert.certificateId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-cyan-400 font-bold">{cert.certificateId}</span>
                    <h4 className="text-white font-bold text-sm">{cert.courseTitle}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px]">
                    VERIFIED ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                  <p>Recipient: <strong>{cert.recipientName}</strong> ({cert.recipientRole})</p>
                  <p>Authority: <strong>{cert.accreditationAuthority}</strong></p>
                </div>

                <p className="text-slate-400 text-[10px]">
                  SHA-256 Ledger Hash: <strong className="text-amber-300">{cert.verificationHashSha256}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: CODE SPECS */}
      {activeSubTab === 'code_specs' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-amber-300" />
              <h3 className="text-base font-bold text-white">Academy Master Code Specifications</h3>
            </div>

            <div className="flex flex-wrap gap-1">
              {ACADEMY_CODE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedCodeSpec(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCodeSpec.id === spec.id
                      ? 'bg-indigo-600 text-white shadow-md'
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
              <span className="font-mono text-indigo-300 font-bold">{selectedCodeSpec.filename}</span>
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
      )}

      {/* MANDATORY ACADEMY RULES */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-indigo-400" />
          <span>Enterprise Directives & Compliance Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRITICAL_ACADEMY_RULES.map((rule) => (
            <div key={rule.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-400">RULE #{rule.id}</span>
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
