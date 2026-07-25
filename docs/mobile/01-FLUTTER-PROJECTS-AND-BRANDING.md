# Deployment Phase D06 — Part 1: Flutter Projects & Application Branding

## Executive Overview

The **ITIS Enterprise Platform** powers three primary mobile applications built using Flutter & Native Android/iOS bridges:
1. **ITIS Parent & Scholar Safety Hub** (`za.gov.itis.parent`)
2. **ITIS Emergency Responder & CAD Tactical App** (`za.gov.itis.responder`)
3. **ITIS Field Technician & Telematic Gateway Provisioner** (`za.gov.itis.technician`)

This document defines the verified Flutter project structures, package identity configurations, assets/fonts, and official branding guidelines for production release builds.

---

## 1. Mobile Application Identity Matrix

| Identity Aspect | Parent & Scholar App | Emergency Responder App | Field Technician App |
| --------------- | -------------------- | ----------------------- | -------------------- |
| **App Name** | ITIS Parent Safety | ITIS Responder | ITIS Field Tech |
| **Android Package ID** | `za.gov.itis.parent` | `za.gov.itis.responder` | `za.gov.itis.technician` |
| **iOS Bundle Identifier** | `za.gov.itis.parent` | `za.gov.itis.responder` | `za.gov.itis.technician` |
| **Primary Audience** | Parents, Guardians & Scholars | SAPS, EMS & Traffic Responders | Hardware & Telematics Technicians |
| **Min Android SDK** | API 24 (Android 7.0) | API 26 (Android 8.0) | API 24 (Android 7.0) |
| **Target Android SDK** | API 34 (Android 14) | API 34 (Android 14) | API 34 (Android 14) |
| **Target iOS Deployment** | iOS 15.0+ | iOS 15.0+ | iOS 15.0+ |
| **Flutter Version Target** | Flutter 3.22 LTS / Dart 3.4 | Flutter 3.22 LTS / Dart 3.4 | Flutter 3.22 LTS / Dart 3.4 |

---

## 2. Flutter `pubspec.yaml` Dependency Specifications

```yaml
# /mobile/parent_app/pubspec.yaml (Sample structure for ITIS Parent App)
name: itis_parent_app
description: "ITIS Parent & Scholar Transport Safety Mobile Application"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.4.0 <4.0.0'
  flutter: ">=3.22.0"

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  
  # State Management & Routing
  flutter_riverpod: ^2.5.1
  go_router: ^14.0.0

  # Networking & Real-time
  dio: ^5.4.3+1
  web_socket_channel: ^3.0.0
  mqtt_client: ^10.2.0

  # Location & Maps
  geolocator: ^12.0.0
  google_maps_flutter: ^2.6.0
  flutter_compass: ^0.8.0

  # Security & Biometrics
  flutter_secure_storage: ^9.0.0
  local_auth: ^2.2.0

  # UI & Notifications
  flutter_local_notifications: ^17.1.0
  firebase_messaging: ^14.9.0
  lucide_icons: ^0.257.0
  google_fonts: ^6.2.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0
  flutter_launcher_icons: ^0.13.1
  flutter_native_splash: ^2.4.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/logo_itis_official.png
    - assets/images/logo_sita.png
    - assets/icons/
    - assets/env/env.production.json
```

---

## 3. Official Application Branding Guidelines

### 3.1 Visual Branding Assets
- **Official Platform Logo**: `assets/images/logo_itis_official.png` (High-resolution vector PNG representing National Scholar Transport Safety).
- **Color Palette**:
  - **ITIS Safety Green (Primary)**: `#15803D` (RGB 21, 128, 61) — Trust, safety, and active clear passage.
  - **SAPS Emergency Amber/Orange (Accent)**: `#EA580C` (RGB 234, 88, 12) — SOS panic, real-time response alerts.
  - **SITA Deep Government Blue (Background Accent)**: `#1E3A8A` (RGB 30, 58, 138) — Official state enclave authority.
  - **Light Neutral Canvas**: `#F8FAFC` (Slate 50) — High contrast WCAG AA compliant readability.

### 3.2 Launcher Icons & Adaptive Icon Specs
Adaptive launcher icons are generated using `flutter_launcher_icons`:
- **Foreground Vector (`ic_launcher_foreground.png`)**: 432x432px centered ITIS crest with 66dp active safety area.
- **Background Layer (`ic_launcher_background.xml`)**: Solid `#15803D` vector background or gradient tile.
- **iOS AppIcon set**: Multi-resolution PNGs generated from 1024x1024px master canvas (`AppIcon.appiconset`).

### 3.3 Native Splash Screen Specification
Configured via `flutter_native_splash`:
- **Android 12+ Splash API**: Centered vector icon over `#15803D` background with smooth exit fade transition.
- **iOS LaunchScreen.storyboard**: Centered ITIS logo with official Department of Transport & Department of Basic Education co-branding credits.
