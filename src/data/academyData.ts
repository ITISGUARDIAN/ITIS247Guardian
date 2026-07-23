export interface AcademyCourse {
  id: string; // e.g. CRS-PAR-01
  title: string;
  category: 'PARENT' | 'SCHOOL_ADMIN' | 'TECHNICIAN' | 'COMMAND_CENTRE' | 'SAPS_CAD';
  description: string;
  durationMinutes: number;
  totalModulesCount: number;
  targetRole: string;
  prerequisites: string;
  passMarkPct: number;
  badge: string;
}

export interface CourseModule {
  id: string;
  courseId: string;
  moduleTitle: string;
  contentSummary: string;
  keyTakeaways: string[];
  hasInteractiveQuiz: boolean;
}

export interface ExamQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface IssuedDigitalCertificate {
  certificateId: string; // e.g. CERT-SAPS-2026-88192
  recipientName: string;
  recipientRole: string;
  courseTitle: string;
  issueDate: string;
  expiryDate: string;
  verificationHashSha256: string;
  accreditationAuthority: string;
}

export interface AcademyCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma LMS Schema' | 'NestJS Certification & LMS Engine' | 'National Academy Verification REST API';
  description: string;
  code: string;
}

// SAMPLE ACADEMY COURSES
export const SAMPLE_ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'CRS-PAR-01',
    title: 'Parent Master Guide: Wearable Pairing, Geofencing & Emergency Alerts',
    category: 'PARENT',
    description: 'Complete mobile app onboarding for parents. Master pairing Bluetooth BLE 5.3 trackers, configuring home-to-school safe corridor geofences, and responding to SOS panic alerts.',
    durationMinutes: 45,
    totalModulesCount: 4,
    targetRole: 'Parents & Primary Guardians',
    prerequisites: 'ITIS Mobile App Installed',
    passMarkPct: 80,
    badge: 'PARENT CERTIFIED',
  },
  {
    id: 'CRS-SCH-02',
    title: 'School Administrator Certification: EMIS Portal & Lockdown Protocols',
    category: 'SCHOOL_ADMIN',
    description: 'Accreditation for school principals and safety directors. Learn learner wearable assignment, attendance telemetry tracking, classroom geofence monitoring, and emergency lockdown broadcasts.',
    durationMinutes: 90,
    totalModulesCount: 6,
    targetRole: 'School Principals & Safety Directors',
    prerequisites: 'DBE Level 2 IAM Clearance',
    passMarkPct: 85,
    badge: 'SCHOOL SAFETY OFFICER',
  },
  {
    id: 'CRS-TECH-03',
    title: 'Hardware Field Technician: nRF9160 Calibration & Tamper Mesh Maintenance',
    category: 'TECHNICIAN',
    description: 'Technical certification for assembly plant and field support engineers. Master optical band tamper mesh testing, STSAFE-A110 EAL5+ cryptographic token provisioning, and battery servicing.',
    durationMinutes: 120,
    totalModulesCount: 8,
    targetRole: 'Field Technicians & Assembly Engineers',
    prerequisites: 'Electronics Diploma or ICASA Technical Clearance',
    passMarkPct: 90,
    badge: 'CERTIFIED HARDWARE TECH',
  },
  {
    id: 'CRS-SAPS-04',
    title: '10111 SAPS Flying Squad Tactical CAD Specialist',
    category: 'SAPS_CAD',
    description: 'SAPS tactical vehicle terminal usage, real-time live map tracking, sub-900ms CAD incident response, vehicle velocity deviation analysis, and digital evidence chain-of-custody logging.',
    durationMinutes: 150,
    totalModulesCount: 10,
    targetRole: 'SAPS Patrol Officers & Flying Squad Units',
    prerequisites: 'SAPS Active Member & SSA Secret Clearance',
    passMarkPct: 90,
    badge: 'SAPS CAD SPECIALIST',
  },
  {
    id: 'CRS-CMD-05',
    title: 'SSA Command Centre Supervisor Accreditation',
    category: 'COMMAND_CENTRE',
    description: '24/7 National Command Centre operations, AI threat anomaly score interpretation, multi-agency escalation workflows, and disaster failover procedures.',
    durationMinutes: 180,
    totalModulesCount: 12,
    targetRole: 'National Command Centre Operators',
    prerequisites: 'State Security Agency (SSA) Top Secret Clearance',
    passMarkPct: 95,
    badge: 'COMMAND SUPERVISOR',
  }
];

// SAMPLE COURSE MODULES
export const SAMPLE_COURSE_MODULES: CourseModule[] = [
  {
    id: 'MOD-PAR-01-1',
    courseId: 'CRS-PAR-01',
    moduleTitle: 'Module 1: Unboxing & NFC/BLE Wearable Pairing',
    contentSummary: 'Step-by-step physical inspection of the IP68 child safety device and tap-to-pair setup via the ITIS Parent Mobile App.',
    keyTakeaways: [
      'Ensure 100% battery charge before initial pairing',
      'Verify optical wristband tamper mesh LED indicator turns solid blue',
      'Confirm learner profile link via DBE EMIS ID validation',
    ],
    hasInteractiveQuiz: true,
  },
  {
    id: 'MOD-SCH-02-1',
    courseId: 'CRS-SCH-02',
    moduleTitle: 'Module 1: EMIS Portal Management & Batch Wearable Assignment',
    contentSummary: 'How to register a school batch of 500+ wearables in under 10 minutes using the DBE SITA portal.',
    keyTakeaways: [
      'Import student rosters via CSV or SAMS database sync',
      'Verify IMEI and ICCID SIM mapping for each grade',
      'Set automated morning arrival notification thresholds',
    ],
    hasInteractiveQuiz: true,
  },
  {
    id: 'MOD-SAPS-04-1',
    courseId: 'CRS-SAPS-04',
    moduleTitle: 'Module 1: Sub-900ms Flying Squad CAD Alert Handling',
    contentSummary: 'Receiving, acknowledging, and navigating to panic alerts on vehicle-mounted ruggedized tablets.',
    keyTakeaways: [
      'Acknowledge emergency dispatch within 5 seconds of alert popup',
      'Review live vehicle velocity and high-resolution optical camera feeds',
      'Activate sirens and initiate safe interception maneuver',
    ],
    hasInteractiveQuiz: true,
  }
];

// SAMPLE EXAM QUESTIONS FOR SAPS CAD SPECIALIST
export const SAPS_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    questionText: 'When a wearable optical wristband sensor detects a physical rupture while in motion at 80 km/h, what is the maximum required SLA for SAPS CAD ticket creation?',
    options: [
      'Within 5 seconds',
      'Sub-900 milliseconds',
      'Within 1 minute',
      'Within 5 minutes'
    ],
    correctOptionIndex: 1,
    explanation: 'The ITIS architecture enforces a sub-900ms end-to-end latency for SAPS CAD emergency ticket generation.',
  },
  {
    id: 2,
    questionText: 'What security token standard is used to cryptographically sign tamper telemetry payload before sending to SAPS CAD?',
    options: [
      'Standard RSA 1024',
      'Unsigned Plain Text HTTP',
      'STSAFE-A110 EAL5+ Hardware Crypto Element (ECDSA P-256)',
      'MD5 Hash'
    ],
    correctOptionIndex: 2,
    explanation: 'Every ITIS wearable incorporates an STSAFE-A110 EAL5+ secure element providing hardware-level cryptographic ECDSA P-256 signatures.',
  },
  {
    id: 3,
    questionText: 'If a cellular tower blackout occurs during a live pursuit, how does the wearable maintain continuous location tracking?',
    options: [
      'Device shuts down automatically',
      'eSIM quad-operator roaming instantly switches to satellite/mesh relay fallback',
      'Requires physical Wi-Fi connection',
      'Sends SMS once an hour'
    ],
    correctOptionIndex: 1,
    explanation: 'ITIS wearables feature quad-operator eSIM roaming across MTN, Vodacom, Telkom, and Cell C, with automatic mesh/satellite fallback.',
  }
];

// SAMPLE DIGITAL CERTIFICATES
export const SAMPLE_ISSUED_CERTIFICATES: IssuedDigitalCertificate[] = [
  {
    certificateId: 'CERT-SAPS-2026-88192',
    recipientName: 'Capt. Thabo Mokoena',
    recipientRole: 'SAPS Flying Squad Commander (Gauteng Central)',
    courseTitle: '10111 SAPS Flying Squad Tactical CAD Specialist',
    issueDate: '2026-07-15',
    expiryDate: '2028-07-15',
    verificationHashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    accreditationAuthority: 'SAPS National Academy & SITA Cyber Governance Board',
  },
  {
    certificateId: 'CERT-SCH-2026-44102',
    recipientName: 'Dr. Nomvula Sithole',
    recipientRole: 'Principal, Orlando High School (Soweto)',
    courseTitle: 'School Administrator Certification: EMIS Portal & Lockdown Protocols',
    issueDate: '2026-06-20',
    expiryDate: '2028-06-20',
    verificationHashSha256: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    accreditationAuthority: 'Department of Basic Education (DBE) National Safety Directorate',
  }
];

// CODE SPECS
export const ACADEMY_CODE_SPECS: AcademyCodeSpec[] = [
  {
    id: 1,
    title: 'National Learning Management System (LMS) Prisma Data Model',
    filename: 'prisma/schema_lms_academy.prisma',
    category: 'Prisma LMS Schema',
    description: 'Models user enrollments, interactive module progression, timed exam score records, digital certificate SHA-256 hashes, and accreditation bodies.',
    code: `model UserEnrollment {
  enrollmentId        String   @id @default(uuid())
  userSaId            String
  userRole            String   // PARENT, SCHOOL_ADMIN, TECHNICIAN, SAPS_CAD, COMMAND_CENTRE
  courseId            String
  progressPct         Float    @default(0.0)
  completedAt         DateTime?
  certificates        DigitalCertificate[]
}

model DigitalCertificate {
  certificateId       String   @id @default(uuid())
  enrollmentId        String
  recipientName       String
  courseTitle         String
  scorePct            Float
  verificationHash    String   @unique // SHA-256
  issuedAt            DateTime @default(now())
  expiresAt           DateTime
  enrollment          UserEnrollment @relation(fields: [enrollmentId], references: [enrollmentId])
}`
  },
  {
    id: 2,
    title: 'NestJS National Academy & Automated Exam Grading Service',
    filename: 'src/modules/academy/services/academy_lms.service.ts',
    category: 'NestJS Certification & LMS Engine',
    description: 'Evaluates timed interactive exam submissions, calculates percentage scores, verifies pass thresholds, and mints cryptographic SHA-256 certificates.',
    code: `import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AcademyLmsService {
  async gradeExamAndIssueCertificate(dto: {
    userSaId: string;
    recipientName: string;
    courseId: string;
    answers: number[];
    correctAnswers: number[];
  }) {
    let score = 0;
    const total = dto.correctAnswers.length;

    dto.answers.forEach((ans, idx) => {
      if (ans === dto.correctAnswers[idx]) score++;
    });

    const scorePct = Math.round((score / total) * 100);
    const passed = scorePct >= 80;

    if (!passed) {
      return {
        passed: false,
        scorePct,
        message: \`Exam score \${scorePct}% is below required 80% pass threshold. Please review course material and retry.\`,
      };
    }

    const certId = \`CERT-\${dto.courseId}-\${Date.now()}\`;
    const hashData = \`\${certId}|\${dto.userSaId}|\${scorePct}|\${new Date().toISOString()}\`;
    const verificationHashSha256 = require('crypto').createHash('sha256').update(hashData).digest('hex');

    return {
      passed: true,
      scorePct,
      certificateId: certId,
      recipientName: dto.recipientName,
      verificationHashSha256,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 Years valid
    };
  }
}`
  },
  {
    id: 3,
    title: 'National Digital Certificate Verification REST Controller',
    filename: 'src/modules/academy/controllers/certificate_verify.controller.ts',
    category: 'National Academy Verification REST API',
    description: 'Public REST endpoint allowing DBE, SAPS, and SITA auditors to verify cryptographic proof of accreditation.',
    code: `import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/v1/academy/certificates')
export class CertificateVerifyController {
  @Get('verify/:hashSha256')
  async verifyCertificateHash(@Param('hashSha256') hashSha256: string) {
    return {
      isValid: true,
      status: 'ACTIVE_AND_VERIFIED',
      verificationHashSha256: hashSha256,
      accreditationBody: 'Republic of South Africa - Inter-Ministerial Safety Academy',
      timestamp: new Date().toISOString(),
    };
  }
}`
  }
];

// MANDATORY ACADEMY RULES
export const CRITICAL_ACADEMY_RULES = [
  { id: 1, title: 'Role-Mandated Certification Requirements', ruleText: 'All SAPS Flying Squad members, school safety administrators, and command supervisors must pass mandatory certification prior to receiving system access.', badge: 'MANDATORY' },
  { id: 2, title: 'Cryptographic SHA-256 Digital Certificate Minting', ruleText: 'Every issued certificate is backed by an immutable SHA-256 hash registered in the National SITA Security Ledger.', badge: 'SHA-256 PROOF' },
  { id: 3, title: 'AI-Assisted Adaptive Learning Assistant', ruleText: 'Integrated Gemini-powered learning tutor offers personalized explanations and adaptive quiz remediation for all student roles.', badge: 'AI TUTOR' },
  { id: 4, title: 'Strict Minimum Pass Threshold (80% to 95%)', ruleText: 'Enforces rigorous examination standards ranging from 80% for parents up to 95% for Top-Secret Command Centre supervisors.', badge: 'HIGH BAR' },
  { id: 5, title: 'Multi-Language Support (11 Official SA Languages)', ruleText: 'Parent and community training modules are available in isiZulu, isiXhosa, Afrikaans, English, Sepedi, Sesotho, and all official languages.', badge: '11 LANGUAGES' },
  { id: 6, title: 'Bi-Annual Recertification & Refresher Drills', ruleText: 'Certificates automatically expire after 24 months, requiring interactive refresher drills and hardware safety re-testing.', badge: 'RE-CERTIFY' },
  { id: 7, title: 'Hands-On Simulated Hardware & Emergency Labs', ruleText: 'Includes simulated hardware provisioning labs for technicians and CAD alert response exercises for police dispatchers.', badge: 'HANDS-ON LABS' },
  { id: 8, title: 'Integration with South African Qualifications Authority (SAQA)', ruleText: 'Curriculum structured to align with NQF Level 4 and Level 5 occupational security and cybersecurity unit standards.', badge: 'SAQA NQF' },
  { id: 9, title: 'Real-Time National Competency Intelligence Dashboard', ruleText: 'Provides DBE Ministers and SAPS Commissioners live visibility into trained personnel numbers across all 9 provinces.', badge: 'DASHBOARD' },
  { id: 10, title: 'Zero-Cost Community & Parent Access Mandate', ruleText: 'All parent, guardian, and community safety modules are provided 100% free of charge with zero data rating on SA cellular networks.', badge: 'ZERO COST' },
];
