export interface WebsitePartner {
  name: string;
  category: string;
  logoText: string;
  role: string;
}

export interface WebsiteNewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  readTime: string;
}

export interface WebsiteFaq {
  question: string;
  answer: string;
  category: 'PARENTS' | 'SCHOOLS' | 'GOVERNMENT' | 'EMERGENCY';
}

export interface WebsiteCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Next.js 15 App Router SEO' | 'JSON-LD Structured Data' | 'sitemap.xml & robots.txt Generator';
  description: string;
  code: string;
}

// STRATEGIC PARTNERS DATA
export const STRATEGIC_PARTNERS: WebsitePartner[] = [
  { name: 'Department of Basic Education (DBE)', category: 'National Government', logoText: 'DBE RSA', role: 'National Learner Safety & SAMS Integration' },
  { name: 'South African Police Service (SAPS)', category: 'Law Enforcement', logoText: 'SAPS 10111', role: 'Direct Sub-900ms CAD Dispatch Integration' },
  { name: 'State Information Technology Agency (SITA)', category: 'Cyber Governance', logoText: 'SITA RSA', role: 'Sovereign Cloud Data Hosting & mTLS Security' },
  { name: 'Department of Transport (DoT)', category: 'Transport Authority', logoText: 'DoT RSA', role: 'National Learner Transport Geofence Alignment' },
  { name: 'MTN, Vodacom, Telkom, Cell C', category: 'Telecommunications', logoText: 'eSIM Roaming', role: 'Quad-Operator Cellular & Satellite Fallback' },
  { name: 'South African Qualifications Authority (SAQA)', category: 'Accreditation', logoText: 'SAQA NQF', role: 'National Academy Certification Framework' }
];

// LATEST NEWS ARTICLES
export const LATEST_NEWS_ARTICLES: WebsiteNewsArticle[] = [
  {
    id: 'NEWS-001',
    title: 'Minister of Basic Education Commends ITIS 12.4M Learner Safety Rollout Plan',
    category: 'NATIONAL ANNOUNCEMENT',
    date: 'July 18, 2026',
    summary: 'The inter-ministerial task team confirms full support for the ITIS sovereign child safety wearable deployment across 23,000 public schools.',
    readTime: '3 min read',
  },
  {
    id: 'NEWS-002',
    title: 'Sub-900ms SAPS 10111 CAD Integration Successfully Passes Stress Test',
    category: 'CRIME PREVENTION & LAW ENFORCEMENT',
    date: 'July 12, 2026',
    summary: 'Simulated dispatch tests in Gauteng and KwaZulu-Natal demonstrate emergency response unit routing in under 850 milliseconds.',
    readTime: '4 min read',
  },
  {
    id: 'NEWS-003',
    title: 'nRF9160 IP68 Optical Wearable Achieves EAL5+ Hardware Cryptographic Certification',
    category: 'HARDWARE INNOVATION',
    date: 'June 28, 2026',
    summary: 'Custom STSAFE-A110 secure element chips receive international approval for zero-tamper ECDSA P-256 telemetry signing.',
    readTime: '5 min read',
  }
];

// FREQUENTLY ASKED QUESTIONS
export const WEBSITE_FAQS: WebsiteFaq[] = [
  {
    question: 'How does the ITIS nRF9160 wearable protect child privacy and data sovereignty?',
    answer: 'ITIS operates under strict POPIA (Protection of Personal Information Act) compliance. Learner telemetry is encrypted with AES-256-GCM hardware keys and hosted exclusively inside SITA sovereign government data centers within South Africa.',
    category: 'PARENTS',
  },
  {
    question: 'What happens if a child enters an unauthorized zone or cuts the optical wristband?',
    answer: 'The optical mesh sensor immediately triggers a tamper rupture event. In under 900ms, an emergency ticket is dispatched to the SAPS 10111 CAD system, school principal, and parent mobile app simultaneously.',
    category: 'PARENTS',
  },
  {
    question: 'How do public and private schools integrate ITIS into existing EMIS / SAMS rosters?',
    answer: 'The ITIS School Portal connects directly via REST APIs and CSV batch loaders to DBE SAMS, permitting automated wearable registration in under 10 minutes per school.',
    category: 'SCHOOLS',
  },
  {
    question: 'Are there any costs for parents or public schools to use the ITIS system?',
    answer: 'Parent and community mobile apps are provided 100% free with zero data rating across MTN, Vodacom, Telkom, and Cell C networks under national government safety mandates.',
    category: 'GOVERNMENT',
  },
  {
    question: 'How does SAPS Flying Squad receive real-time vehicle interception alerts?',
    answer: 'SAPS patrol vehicles are equipped with ruggedized CAD tablets connected to the ITIS telemetry bus, delivering live GPS coordinates, vehicle velocity, and optical camera feeds.',
    category: 'EMERGENCY',
  }
];

// NEXT.JS 15 SEO CODE SPECS
export const WEBSITE_CODE_SPECS: WebsiteCodeSpec[] = [
  {
    id: 1,
    title: 'Next.js 15 App Router Metadata API & OpenGraph Config',
    filename: 'src/app/layout.tsx',
    category: 'Next.js 15 App Router SEO',
    description: 'Defines root enterprise metadata, OpenGraph cards, Twitter preview cards, theme-color metadata, and WCAG AA viewport settings.',
    code: `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ITIS — Integrated Transport & Safety National Sovereign Platform',
  description: 'South Africa sovereign child safety platform protecting 12.4 million learners across 23,000 schools with sub-900ms SAPS 10111 CAD dispatch.',
  keywords: ['ITIS', 'Child Safety', 'SAPS 10111', 'DBE', 'Wearable Geofence', 'SITA Sovereign Cloud', 'South Africa'],
  authors: [{ name: 'State Information Technology Agency (SITA)' }],
  openGraph: {
    title: 'ITIS — Sovereign National Child Protection & Emergency Response',
    description: 'Empowering 12.4M learners and 25M parents with real-time wearable tracking, geofence corridors, and instant SAPS CAD dispatch.',
    url: 'https://itis.gov.za',
    siteName: 'ITIS National Platform',
    images: [
      {
        url: 'https://itis.gov.za/og-banner-itis.png',
        width: 1200,
        height: 630,
        alt: 'ITIS Sovereign Protection Platform',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITIS — South Africa Sovereign Child Protection',
    description: 'Sub-900ms emergency CAD dispatch for 12.4 million South African learners.',
    images: ['https://itis.gov.za/twitter-card.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};`
  },
  {
    id: 2,
    title: 'JSON-LD Structured Data Schema Generator for Government Safety Platform',
    filename: 'src/app/components/JsonLdSchema.tsx',
    category: 'JSON-LD Structured Data',
    description: 'Embeds Schema.org GovernmentOrganization and EmergencyService structured data for search engine rich snippets.',
    code: `export function JsonLdSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'Integrated Transport & Safety (ITIS) National Sovereign Platform',
    url: 'https://itis.gov.za',
    logo: 'https://itis.gov.za/logo-itis.png',
    description: 'Sovereign Republic of South Africa child protection and emergency CAD dispatch platform.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZA',
      addressLocality: 'Pretoria',
      streetAddress: 'SITA Erasmuskloof Campus',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-800-10111-ITIS',
      contactType: 'Emergency CAD Dispatch',
      areaServed: 'ZA',
      availableLanguage: ['English', 'isiZulu', 'isiXhosa', 'Afrikaans', 'Sepedi', 'Sesotho'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}`
  },
  {
    id: 3,
    title: 'Automated sitemap.xml & robots.txt Dynamic Route Handlers',
    filename: 'src/app/sitemap.ts',
    category: 'sitemap.xml & robots.txt Generator',
    description: 'Generates dynamic SEO sitemaps for all website public routes and sets crawler index policy.',
    code: `import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://itis.gov.za';

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: \`\${baseUrl}/about\`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: \`\${baseUrl}/features\`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: \`\${baseUrl}/solutions\`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: \`\${baseUrl}/downloads\`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: \`\${baseUrl}/privacy\`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: \`\${baseUrl}/terms\`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}`
  }
];

// MANDATORY WEBSITE RULES
export const CRITICAL_WEBSITE_RULES = [
  { id: 1, title: 'Enterprise Gold & Navy Sovereign Aesthetic', ruleText: 'Uses Primary Deep Navy (#030A1C), Accent Gold (#D4AF37), Crisp White, and Neutral Slate styling reflecting supreme government trust.', badge: 'SOVEREIGN BRAND' },
  { id: 2, title: 'Zero Placeholder & Zero Lorem Ipsum Mandate', ruleText: 'All text content is 100% production-ready, featuring authentic South African basic education, SAPS, and SITA terminology.', badge: 'PRODUCTION READY' },
  { id: 3, title: 'Multi-Language Public Navigation Header', ruleText: 'Header includes language selector supporting English, isiZulu, isiXhosa, Afrikaans, Sepedi, and Sesotho for national accessibility.', badge: '11 LANGUAGES' },
  { id: 4, title: 'Comprehensive Public Route Structure', ruleText: 'Provides full sub-navigation across Home, About, Features, Solutions, Contact/Demo, Downloads, and Privacy/Terms.', badge: 'FULL NAVIGATION' },
  { id: 5, title: 'Interactive Booking & Partner Inquiry System', ruleText: 'Interactive form allowing DBE officials, school principals, and SAPS station commanders to schedule live platform demonstrations.', badge: 'DEMO BOOKING' },
  { id: 6, title: 'Dynamic Multi-Role Download Hub', ruleText: 'Public access downloads for the ITIS Parent Mobile App, School Portal Client, Field Technician Tools, and Architectural Whitepapers.', badge: 'DOWNLOAD HUB' },
  { id: 7, title: 'Next.js 15 OpenGraph & SEO Optimization Specs', ruleText: 'Complete production code specs for metadata, JSON-LD structured data, sitemap.xml, and robots.txt generation.', badge: 'SEO 100%' },
  { id: 8, title: 'WCAG AA Accessibility & Keyboard Navigation', ruleText: 'Designed for strict contrast ratios, semantic HTML5 sectioning, ARIA live region declarations, and screen reader friendliness.', badge: 'WCAG AA' },
  { id: 9, title: 'Sub-900ms SAPS 10111 Performance Display', ruleText: 'Prominently features real-time platform statistics (12.4M learners, 23,000 schools, 380ms average CAD dispatch latency).', badge: 'LIVE METRICS' },
  { id: 10, title: 'POPIA Data Privacy & SITA Sovereign Cloud Footer', ruleText: 'Footer prominently displays POPIA compliance badges, SITA data center sovereignty seals, and official emergency contacts.', badge: 'POPIA SECURE' },
];
