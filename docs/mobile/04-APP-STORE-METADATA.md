# Deployment Phase D06 — Part 4: App Store & Play Store Metadata Specifications

## Executive Overview

This document provides the official production store listing copy, privacy disclosures, age rating declarations, search keywords, and screenshot requirements for publishing the **ITIS Mobile Application Suite** on Google Play Store and Apple App Store.

---

## 1. App Store Copy & Metadata — ITIS Parent Safety App

### 1.1 Store Identifiers
- **App Name**: ITIS Parent Safety
- **Subtitle (iOS)**: National Scholar Transport Safety & Real-Time Tracking
- **Category**: Educational / Travel / Safety

### 1.2 Short Description (80 Characters)
Real-time scholar transport tracking, SOS alerts & safe arrival notifications.

### 1.3 Full Description (Google Play / App Store)
```
The ITIS Parent Safety App is South Africa’s official national scholar transport safety platform, developed in partnership with the Department of Transport and Department of Basic Education.

Designed specifically for parents, guardians, and school administrators, ITIS provides end-to-end visibility and real-time peace of mind during daily school commutes.

KEY FEATURES:
• Live GPS Transport Tracking: View your child’s school bus position in real-time on high-accuracy interactive maps.
• Instant Arrival & Departure Alerts: Receive instant push notifications when the bus reaches school, home, or designated pickup stops.
• RFID Scholar Attendance: Verified biometric and RFID badge tap-in/tap-out logs confirm exactly when your child boards and exits the bus.
• Instant SOS Emergency Panic: Direct integration with SAPS (South African Police Service) Emergency Command Centre and C3 Operations.
• Driver & Vehicle Verification: View verified driver licenses, PrDP clearance certificates, and vehicle roadworthiness inspection statuses.

PRIVACY & POPIA COMPLIANCE:
Your family's privacy is paramount. All pupil data is encrypted using military-grade AES-256 GCM encryption stored within SITA national government enclaves in full compliance with the POPIA Act (Protection of Personal Information Act).
```

### 1.4 Search Keywords (iOS 100 Characters)
scholar transport,school bus tracking,child safety,itis,sita,south africa safety,saps sos,pupil tracking

---

## 2. Privacy Declarations & Data Safety Disclosures

Google Play Data Safety & Apple App Privacy Nutrition Labels MUST declare the following:

| Data Type | Collected / Shared | Purpose | Encryption Status | Linked to User |
| --------- | ------------------ | ------- | ----------------- | -------------- |
| **Precise Location** | Collected | App Functionality (Live GPS Tracking) | Encrypted in Transit (TLS 1.3) & Rest (AES-256) | Yes |
| **Name & Contact Info** | Collected | Account Management & Emergency Contact | Encrypted in Transit & Rest | Yes |
| **Pupil Biometrics / RFID** | Collected | Scholar Identification & Tap-in Logs | Encrypted via SITA KMS HSM | Yes |
| **Device & App Identifiers**| Collected | Push Notifications & Security Auditing | Encrypted in Transit | Yes |
| **Crash Logs & Performance**| Collected | Analytics & App Reliability | Anonymized | No |

---

## 3. Age Rating Declarations & Content Rating

- **Google Play Content Rating**: **Rated 3+ / Everyone**. (No mature content, violence, or gambling).
- **Apple Age Rating**: **4+**.
- **Privacy Policy URL**: `https://itis.gov.za/privacy`
- **Support URL**: `https://itis.gov.za/support`

---

## 4. Required Screenshots & Asset Checklist

### 4.1 Android & iOS Screenshot Matrix
- **Phone (6.5" & 6.7" Display)**: 5 Required Screenshots.
  1. *Live Scholar Bus Map with Real-Time Route Overlay.*
  2. *Instant Geofence Arrival Push Notification Alert Card.*
  3. *Verified Driver License & PrDP Roadworthiness Status.*
  4. *Biometric Parent Login & Pupil Selection Dashboard.*
  5. *Instant Emergency SOS One-Tap Command Center.*
- **Tablet (10" & 12.9" iPad)**: 3 Required Screenshots showcasing split-screen transport route monitoring.
- **Feature Graphic (Google Play)**: 1024x500px banner featuring official ITIS logo and "National Scholar Safety" title.
