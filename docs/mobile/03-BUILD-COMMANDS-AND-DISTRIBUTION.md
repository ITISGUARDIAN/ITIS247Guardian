# Deployment Phase D06 — Part 3: Release Build Commands & Distribution Strategy

## Executive Overview

This document specifies the exact CLI build commands for compiling Android APKs, App Bundles (AAB), and iOS IPA binaries for the **ITIS Mobile Application Suite**, as well as the 4-phase release distribution strategy (Internal Testing, Closed Beta, Staged Rollout, and Rollback Procedures).

---

## 1. Automated Release Build Command Matrix

All builds are executed within clean containerized CI/CD runners (GitHub Actions / Jenkins) with active Flutter SDK 3.22 LTS.

```
                    [ Source Repository ]
                              |
      +-----------------------+-----------------------+
      |                       |                       |
[ Debug APK Build ]    [ Profile APK Build ]   [ Release AAB / APK / IPA ]
(Internal SRE Test)   (Performance Profiling)   (Play Store & App Store)
```

### 1.1 Android Build Commands

```bash
# ------------------------------------------------------------------------------
# 1. Android Release App Bundle (AAB) — Required for Google Play Store Submission
# ------------------------------------------------------------------------------
flutter build appbundle \
  --flavor prod \
  --target lib/main_production.dart \
  --build-name 1.0.0 \
  --build-number 1 \
  --obfuscate \
  --split-debug-info=build/app/outputs/symbols

# ------------------------------------------------------------------------------
# 2. Android Universal Standalone Release APK — For Direct Portal Download Portal
# ------------------------------------------------------------------------------
flutter build apk \
  --flavor prod \
  --target lib/main_production.dart \
  --build-name 1.0.0 \
  --build-number 1 \
  --split-per-abi \
  --obfuscate \
  --split-debug-info=build/app/outputs/symbols

# Output Binaries:
# - build/app/outputs/flutter-apk/app-arm64-v8a-prod-release.apk
# - build/app/outputs/flutter-apk/app-armeabi-v7a-prod-release.apk

# ------------------------------------------------------------------------------
# 3. Android Debug & Profile APKs — For QA Smoke Testing
# ------------------------------------------------------------------------------
flutter build apk --debug --flavor dev
flutter build apk --profile --flavor staging
```

### 1.2 iOS Build Commands

```bash
# ------------------------------------------------------------------------------
# 1. iOS Release Archive (IPA) — Required for Apple TestFlight / App Store
# ------------------------------------------------------------------------------
flutter build ipa \
  --flavor prod \
  --target lib/main_production.dart \
  --build-name 1.0.0 \
  --build-number 1 \
  --obfuscate \
  --split-debug-info=build/ios/symbol_maps

# Output Binary:
# - build/ios/ipa/itis_parent_app.ipa
```

---

## 2. Release Distribution & Staged Rollout Strategy

```
 [ Phase 1: Internal QA ] ---> [ Phase 2: Closed Beta ] ---> [ Phase 3: Staged Rollout ] ---> [ Phase 4: 100% GA ]
 (20 DevSecOps Testers)        (500 Verified Parents)        (10% -> 25% -> 50% -> 100%)       (Full National Live)
```

### 2.1 Distribution Phase Specifications

| Phase | Target Audience | Channel | Access Control | Primary Objective |
| ----- | --------------- | ------- | -------------- | ----------------- |
| **1. Internal QA** | DevSecOps & SRE Engineers | Firebase App Distribution / TestFlight | Internal Org Invites Only | Verify mTLS backend connection, biometrics, and push alerts. |
| **2. Closed Beta** | 500 Selected Gauteng Parents & Drivers | Google Play Console Internal Track / TestFlight | Verified RSA ID Numbers | Smoke test real-time bus GPS tracking in live urban conditions. |
| **3. Staged Rollout** | General Public (South Africa) | Google Play & Apple App Store Production Track | Automated Percent Rollout | Roll out to 10% on Day 1, 25% Day 3, 50% Day 5, 100% Day 7. |
| **4. 100% GA Release** | All 9 South African Provinces | Google Play, App Store & Direct Download Portal | Open Public Access | Full national scholar transport safety operations live. |

---

## 3. Mobile Emergency Rollback Procedure

If a critical flaw (crash rate > 0.1% or data desynchronization) is detected during staged rollout:

1. **Halt Rollout**: Immediately pause staged rollout in Google Play Console & Apple App Store Connect.
2. **Revert Active Backend APIs**: If the crash is API-driven, enable backward-compatible API mode in Express gateway without touching the client app.
3. **Hotfix Release Pipeline**:
   - Increment build number (e.g., `1.0.1+2`).
   - Re-compile release AAB/IPA with targeted patch.
   - Request Expedited Review in App Store Connect & Play Console with "Critical Transport Safety Patch" justification.
4. **Direct Download Portal Fallback**: Publish updated APK immediately to `https://download.itis.gov.za/itis-parent-v1.0.1.apk` for direct manual update.
