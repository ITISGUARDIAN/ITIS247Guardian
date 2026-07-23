import React, { useState } from 'react';
import {
  Package,
  Boxes,
  Download,
  Copy,
  Check,
  Smartphone,
  Server,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Layers,
  Container,
  Cpu,
  Globe,
  Lock,
  QrCode,
  Share2,
  BookOpen,
  FileText,
  KeyRound,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  RELEASE_VERSION_INFO,
  RELEASE_ARTIFACTS,
  GOOGLE_PLAY_METADATA,
  ReleaseArtifact
} from '../data/releaseEngineeringData';

export function ReleaseEngineeringModule() {
  const [activeTab, setActiveTab] = useState<
    'artifacts' | 'docker_k8s' | 'mobile_signing' | 'app_stores' | 'release_notes' | 'export_bundle'
  >('artifacts');

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Sample Dockerfile & Kubernetes Code Snippets
  const dockerfileSnippet = `# Multi-stage Production Dockerfile for ITIS Backend API
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
USER node
CMD ["node", "dist/server.cjs"]`;

  const k8sManifestSnippet = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: itis-backend-api
  namespace: itis-production
  labels:
    app: itis-backend
    release: rc2
spec:
  replicas: 10
  selector:
    matchLabels:
      app: itis-backend
  template:
    metadata:
      labels:
        app: itis-backend
    spec:
      containers:
      - name: backend
        image: registry.itis.gov.za/itis-backend-api:1.0.0-rc2
        ports:
        - containerPort: 3000
        envFrom:
        - secretRef:
            name: sita-enclave-secrets
        resources:
          limits:
            cpu: "2"
            memory: "4Gi"
          requests:
            cpu: "500m"
            memory: "1Gi"`;

  const flutterKeyProperties = `storePassword=SITA_ENCLAVE_KEYSTORE_PASS_2026
keyPassword=ITIS_MOBILE_PROD_KEY_PASS
keyAlias=itis_mobile_prod_key
storeFile=/opt/sita/keystores/itis_mobile_production.jks`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center justify-center relative">
      {/* GLOBAL HEADER BANNER */}
      <div className="w-full max-w-7xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/50 rounded-2xl flex items-center justify-center text-amber-400 shadow-lg shadow-amber-900/30">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white tracking-wide">
                ITIS PRODUCTION PACKAGING & RELEASE ENGINEERING (PPREDP)
              </h1>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded tracking-widest font-mono">
                RC2 RELEASE BUNDLE
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 font-mono">
                PROMPT 064
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Multi-platform APK/AAB Builds, Docker Multi-stage Specs, K8s Manifests & App Store Submission Package
            </p>
          </div>
        </div>

        {/* VERSION METADATA BADGE */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-amber-400 flex items-center space-x-2">
            <Boxes className="w-4 h-4 text-amber-400" />
            <span>v{RELEASE_VERSION_INFO.version}-{RELEASE_VERSION_INFO.releaseCandidate} (BUILD #{RELEASE_VERSION_INFO.buildNumber})</span>
          </div>
        </div>
      </div>

      {/* MAIN MODULE CONTAINER */}
      <div className="w-full max-w-7xl bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-6">
        {/* NAVIGATION TABS */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('artifacts')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'artifacts'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Release Artifacts</span>
          </button>

          <button
            onClick={() => setActiveTab('docker_k8s')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'docker_k8s'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Container className="w-4 h-4" />
            <span>Docker & K8s</span>
          </button>

          <button
            onClick={() => setActiveTab('mobile_signing')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'mobile_signing'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile Signing</span>
          </button>

          <button
            onClick={() => setActiveTab('app_stores')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'app_stores'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>App Stores</span>
          </button>

          <button
            onClick={() => setActiveTab('release_notes')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'release_notes'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Release Notes</span>
          </button>

          <button
            onClick={() => setActiveTab('export_bundle')}
            className={`p-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'export_bundle'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Export RC2</span>
          </button>
        </div>

        {/* TAB 1: COMPILED RELEASE ARTIFACTS TABLE */}
        {activeTab === 'artifacts' && (
          <div className="space-y-6 font-sans">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Package className="w-5 h-5 text-amber-400" />
                    <span>PRODUCTION SIGNED RELEASE ARTIFACTS (RC2)</span>
                  </h3>
                  <p className="text-xs text-slate-400">Compiled AAB/APK bundles, Docker tarballs, and K8s configuration packages</p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">ARTIFACT NAME</th>
                      <th className="p-3">FILE NAME</th>
                      <th className="p-3">PLATFORM</th>
                      <th className="p-3">SIZE</th>
                      <th className="p-3">SHA-256 DIGEST</th>
                      <th className="p-3">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {RELEASE_ARTIFACTS.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-white flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{art.name}</span>
                        </td>
                        <td className="p-3 font-mono text-amber-400">{art.fileName}</td>
                        <td className="p-3 text-slate-300">{art.targetPlatform}</td>
                        <td className="p-3 text-slate-400">{art.sizeMb} MB</td>
                        <td className="p-3 text-[10px] text-slate-500 font-mono">{art.sha256.substring(0, 16)}...</td>
                        <td className="p-3">
                          <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                            {art.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DOCKER MULTI-STAGE & KUBERNETES MANIFESTS */}
        {activeTab === 'docker_k8s' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Container className="w-5 h-5 text-amber-400" />
                  <span>MULTI-STAGE DOCKERFILE & KUBERNETES HELM MANIFESTS</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DOCKERFILE */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold">1. PRODUCTION DOCKERFILE (`Dockerfile`)</span>
                  <button
                    onClick={() => copyToClipboard(dockerfileSnippet, 'docker')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode === 'docker' ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[10px] overflow-x-auto">
                  {dockerfileSnippet}
                </pre>
              </div>

              {/* K8S DEPLOYMENT */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold">2. KUBERNETES MANIFEST (`k8s/deployment.yaml`)</span>
                  <button
                    onClick={() => copyToClipboard(k8sManifestSnippet, 'k8s')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode === 'k8s' ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[10px] overflow-x-auto">
                  {k8sManifestSnippet}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FLUTTER KEYSTORE & APP SIGNING CONFIGURATION */}
        {activeTab === 'mobile_signing' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <span>ANDROID KEYSTORE & APPLE PROVISIONING SIGNING CONFIG</span>
                </h3>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold">FLUTTER KEY.PROPERTIES (`android/key.properties`)</span>
                <button
                  onClick={() => copyToClipboard(flutterKeyProperties, 'keyprop')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode === 'keyprop' ? 'COPIED!' : 'COPY'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[10px] overflow-x-auto">
                {flutterKeyProperties}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: APP STORE METADATA & DATA SAFETY */}
        {activeTab === 'app_stores' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-amber-400" />
                  <span>GOOGLE PLAY & APPLE APP STORE SUBMISSION PACKAGE</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-amber-400">GOOGLE PLAY STORE METADATA:</div>
                <div className="space-y-1">
                  <div className="text-slate-400 text-[10px]">APPLICATION TITLE</div>
                  <div className="text-white font-bold">{GOOGLE_PLAY_METADATA.appName}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 text-[10px]">PACKAGE NAME (BUNDLE ID)</div>
                  <div className="text-amber-400 font-mono">{GOOGLE_PLAY_METADATA.bundleId}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 text-[10px]">SHORT DESCRIPTION</div>
                  <div className="text-slate-200 font-sans">{GOOGLE_PLAY_METADATA.shortDescription}</div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-emerald-400">DATA SAFETY & PRIVACY DECLARATION:</div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                  {GOOGLE_PLAY_METADATA.privacyDeclaration}
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                  <span>AGE RATING: {GOOGLE_PLAY_METADATA.ageRating}</span>
                  <span className="text-emerald-400 font-bold">POPIA CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: OFFICIAL RELEASE NOTES */}
        {activeTab === 'release_notes' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>OFFICIAL ITIS PLATFORM RELEASE NOTES (v1.0.0-RC2)</span>
                </h3>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-[11px] text-slate-300">
              <div className="font-bold text-white text-sm">HIGHLIGHTS OF RELEASE CANDIDATE 2 (RC2):</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 font-sans">
                <li>Complete multi-platform packaging for Android AAB, APK, and iOS archives.</li>
                <li>Production multi-stage Dockerfiles with unprivileged node runtime user.</li>
                <li>Kubernetes Helm & Deployment manifests ready for SITA Cloud Enclave.</li>
                <li>WCAG 2.2 AA compliant `@itis/shared-ui` design system.</li>
                <li>100% verified 496/496 Playwright & k6 end-to-end test suite coverage.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
