export interface ReleaseArtifact {
  id: string;
  name: string;
  fileName: string;
  sizeMb: number;
  sha256: string;
  targetPlatform: 'Android AAB/APK' | 'iOS Archive' | 'Web Bundle' | 'Docker Image' | 'K8s Bundle' | 'Docs';
  version: string;
  status: 'SIGNED & VERIFIED' | 'READY_FOR_STORE' | 'COMPILED';
}

export interface AppStoreMetadata {
  appName: string;
  bundleId: string;
  category: string;
  ageRating: string;
  privacyDeclaration: string;
  shortDescription: string;
  keywords: string[];
}

export const RELEASE_VERSION_INFO = {
  version: '1.0.0',
  releaseCandidate: 'RC2',
  buildNumber: '104928',
  commitHash: 'git-a1dae3f3-20260722-release-rc2',
  buildDate: '2026-07-22T18:08:00Z',
  targetEnvironments: ['development', 'testing', 'staging', 'production'],
};

export const RELEASE_ARTIFACTS: ReleaseArtifact[] = [
  { id: 'ART-001', name: 'ITIS Parent Mobile App (Android Play Bundle)', fileName: 'ITIS-ParentApp-v1.0.0-RC2.aab', sizeMb: 48.2, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', targetPlatform: 'Android AAB/APK', version: 'v1.0.0-RC2', status: 'READY_FOR_STORE' },
  { id: 'ART-002', name: 'ITIS Parent Mobile App (Android Direct APK)', fileName: 'ITIS-ParentApp-v1.0.0-RC2.apk', sizeMb: 52.1, sha256: 'ca978112ca1bbdcafac231b39a23dac405a3d041b201614247d2a6094b0d6ee3', targetPlatform: 'Android AAB/APK', version: 'v1.0.0-RC2', status: 'SIGNED & VERIFIED' },
  { id: 'ART-003', name: 'ITIS Emergency Responder App (Android/MDM)', fileName: 'ITIS-Responder-v1.0.0-RC2.aab', sizeMb: 42.8, sha256: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae', targetPlatform: 'Android AAB/APK', version: 'v1.0.0-RC2', status: 'READY_FOR_STORE' },
  { id: 'ART-004', name: 'ITIS Field Technician App (Android BLE/NFC)', fileName: 'ITIS-Technician-v1.0.0-RC2.aab', sizeMb: 39.5, sha256: 'fc25b989d29a070ce2083130a6e80e0e0a092ce2a008825f62f963878b617028', targetPlatform: 'Android AAB/APK', version: 'v1.0.0-RC2', status: 'READY_FOR_STORE' },
  { id: 'ART-005', name: 'ITIS National Command Centre (Web/Kiosk Zip)', fileName: 'ITIS-CommandCentre-v1.0.0-RC2.zip', sizeMb: 18.4, sha256: '71c8651a1415ebc20f78f65b21008d37497127a69527e0258d4a52033bc65b82', targetPlatform: 'Web Bundle', version: 'v1.0.0-RC2', status: 'SIGNED & VERIFIED' },
  { id: 'ART-006', name: 'ITIS Backend NestJS Container Image', fileName: 'itis-backend-api:1.0.0-rc2.tar.gz', sizeMb: 210.6, sha256: 'd2d2d2e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9', targetPlatform: 'Docker Image', version: 'v1.0.0-RC2', status: 'SIGNED & VERIFIED' },
  { id: 'ART-007', name: 'ITIS Full Kubernetes Helm & Manifests Bundle', fileName: 'ITIS-Kubernetes-Production-Bundle.tar.gz', sizeMb: 4.2, sha256: '99887766554433221100aabbccddeeff99887766554433221100aabbccddeeff', targetPlatform: 'K8s Bundle', version: 'v1.0.0-RC2', status: 'SIGNED & VERIFIED' },
];

export const GOOGLE_PLAY_METADATA: AppStoreMetadata = {
  appName: 'ITIS Parent - Learner Safety & Tracking',
  bundleId: 'za.gov.itis.parent',
  category: 'Education & Child Safety',
  ageRating: 'Everyone / PEGI 3',
  privacyDeclaration: 'Compliant with POPIA & GDPR. GPS and Wearable Telemetry encrypted with AES-256 in SITA Government Enclave.',
  shortDescription: 'National Learner Safety Portal providing live GPS tracking, NFC school gate attendance, SOS panic alerts, and scholar transport monitoring for South African parents.',
  keywords: ['ITIS', 'Learner Safety', 'South Africa', 'Soweto', 'School Attendance', 'Wearable GPS', 'POPIA'],
};
