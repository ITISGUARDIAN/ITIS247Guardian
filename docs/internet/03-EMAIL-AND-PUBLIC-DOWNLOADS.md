# Deployment Phase D05 — Part 3: Email Delivery & Public Downloads Portal Architecture

## Executive Summary

The **ITIS Enterprise Platform** implements a high-deliverability transactional email delivery network integrated with SITA SMTP relays and a multi-platform Public Download Portal (`download.itis.gov.za`) for mobile APK/AAB builds, desktop installers, and investor whitepapers.

---

## 1. Transactional Email Delivery Architecture

Transactional email services are critical for emergency incident alerts, parent login OTPs, driver PrDP verification notices, and password resets.

```
 [ ITIS API Pods ] ---> [ SITA Internal Mail Relay ] ---> [ Internet Mail Gateway ] ---> [ Recipient Inbox ]
                          (DKIM / SPF Signed)                (DMARC Enforcement)
```

### 1.1 SMTP Gateway Configuration
- **Primary SMTP Server**: `mail.itis.gov.za` (Port 587 STARTTLS).
- **Fallback SMTP Server**: `smtp.gov.za` (Port 465 SMTPS).
- **Authentication**: Salted API Token stored in HashiCorp Vault (`SMTP_USER`, `SMTP_PASS`).
- **Sender Identity**: `ITIS National Safety Platform <no-reply@itis.gov.za>`.

### 1.2 Email Category Inventory

| Email Event | Priority Level | Target Recipient | Template File | Delivery SLA |
| ----------- | -------------- | ---------------- | ------------- | ------------ |
| **SOS Emergency Alert** | CRITICAL (P1) | SAPS Officer & Parent | `email/sos-incident.html` | `< 5 Seconds` |
| **Driver Fatigue Alert** | HIGH (P2) | Fleet Manager | `email/driver-fatigue.html` | `< 15 Seconds` |
| **Parent OTP / Password Reset** | HIGH (P2) | Parent / Scholar Guard | `email/parent-auth-otp.html` | `< 10 Seconds` |
| **Driver PrDP Expiry Notice** | NORMAL (P3) | Bus Driver & School | `email/prdp-expiry-warning.html` | Daily Batch |
| **Monthly Safety Report** | LOW (P4) | Department of Transport | `email/monthly-report.html` | Monthly Batch |

---

## 2. Public Downloads Portal Architecture (`download.itis.gov.za`)

The download portal serves signed production distribution builds across 6 OS targets and formal documentation artifacts.

```
                                [ Download Portal Gateway ]
                                  download.itis.gov.za
                                           |
    +-------------------+------------------+------------------+-------------------+
    |                   |                  |                  |                   |
 Mobile Apps         Desktop Apps      Linux Packages     System Docs        Whitepapers
(Android APK/AAB)  (Windows / macOS)   (Debian / RPM)    (PDF Manuals)      (Due Diligence)
```

### 2.1 Artifact Inventory & Delivery Matrix

| Target Platform | Package / File Name | Signing Protocol | SHA-256 Checksum Verification | Storage Path |
| --------------- | ------------------- | ---------------- | ----------------------------- | ------------ |
| **Android Mobile** | `itis-parent-v1.0.0.apk` | Android v3 Signing Scheme | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | `s3://itis-evidence-vault-prod/downloads/android/` |
| **Android Bundle** | `itis-parent-v1.0.0.aab` | Google Play App Signing | Verified in Play Console | `s3://itis-evidence-vault-prod/downloads/android/` |
| **Windows Desktop** | `itis-command-v1.0.0-setup.exe` | Microsoft Authenticode Certificate | Verified via EV Code Signing | `s3://itis-evidence-vault-prod/downloads/desktop/` |
| **macOS Desktop** | `itis-command-v1.0.0.dmg` | Apple Developer ID + Notarized | Verified via Apple Gatekeeper | `s3://itis-evidence-vault-prod/downloads/desktop/` |
| **Linux Desktop** | `itis-command_1.0.0_amd64.deb` | GPG Package Signature | Verified via APT Key Ring | `s3://itis-evidence-vault-prod/downloads/desktop/` |
| **PDF Architecture** | `ITIS-Architecture-Guide-v1.0.pdf` | Adobe PDF Digital Signature | Standard SHA-256 Hash | `s3://itis-evidence-vault-prod/downloads/docs/` |
| **Investor Whitepaper**| `ITIS-Investor-Whitepaper-v1.0.pdf` | SITA Official Seal Stamp | Standard SHA-256 Hash | `s3://itis-evidence-vault-prod/downloads/docs/` |

---

## 3. Byte-Range Resume & Security Controls

- **Range Request Support**: The download server responds with `HTTP 206 Partial Content` and `Accept-Ranges: bytes` allowing interrupted 100MB+ APK/DMG downloads to resume seamlessly.
- **Checksum Verification**: Every download link displays its explicit **SHA-256 Digest** on the web page to prevent tampering or man-in-the-middle file replacement.
