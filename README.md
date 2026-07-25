# ITIS Enterprise Platform — Integrated Technology Intelligence & Safety

<div align="center">
  <h3>National Scholar Safety, Fleet Telematics & Provincial Intelligence Infrastructure</h3>
  <p><strong>Version 1.0.0 General Availability (GA) • Certified Production Release</strong></p>
  <p><em>Republic of South Africa — Department of Transport & Department of Basic Education</em></p>
</div>

---

## Executive Summary

The **Integrated Technology Intelligence & Safety (ITIS) Platform** is a enterprise multi-tenant software ecosystem designed to protect, monitor, and manage national scholar transport fleets, student biometric safety, emergency responder dispatch, and provincial transport intelligence across South Africa.

This repository contains the complete monorepo encompassing 10 production web portals, mobile Flutter app drivers, Express/Node.js API microservices, TimescaleDB telemetry handlers, SITA e-Government SSO authentication, and an integrated Investor Due Diligence suite.

---

## 🏛️ Monorepo Directory Architecture

```
itis-enterprise-platform/
├── backend/                  # Enterprise Express REST controllers & domain microservices
│   ├── release/              # v1.0 Certification, Prompt 080 Audit & Health metrics
│   ├── crm/                  # Provincial Department of Transport Procurement & Contracts
│   ├── supplychain/          # Hardware Manufacturing, Depot Management & RMA Subsystem
│   ├── legal/                # Investor Data Room & POPIA/ISO Compliance Vault
│   └── common/               # AuditLogger, Security Guards, RBAC & Middleware
├── src/                      # Single-Page Application (SPA) React 19 Frontend Modules
│   ├── components/           # 10 Multi-Portal UI Modules & Official ITIS Seal
│   ├── context/              # AuthContext & Session Store
│   └── types.ts              # Global TypeScript Domain Definitions
├── docs/                     # Production & Investor Documentation
│   └── investor-due-diligence/ # High-Impact Investor Package & Technical Audits
├── infrastructure/           # Cloud Infrastructure as Code (IaC)
│   ├── docker/               # Multi-stage Dockerfiles
│   ├── kubernetes/           # Production Helm Charts & Manifests
│   └── terraform/            # GCP Cloud SQL & SITA Enclave Scripts
├── prisma/                   # Schema, PostGIS Migration History & Seeder
├── server.ts                 # Full-Stack Express Server Entrypoint
└── package.json              # Monorepo dependencies and scripts
```

---

## 🔑 11-Role Access Control Matrix (RBAC)

The platform strictly enforces role-based access control across 11 distinct operational roles:

1. **`SYSTEM_ADMIN`**: Root platform maintenance, user setup, database operations (`/government`, `/executive`).
2. **`NATIONAL_ADMIN`**: Executive oversight across all 9 provinces, fleet analytics, contracts (`/government`).
3. **`PROVINCIAL_ADMIN`**: Regional governance restricted to assigned province (e.g., Gauteng, KZN).
4. **`COMMAND_OPERATOR`**: National Command Centre (C3) CAD dispatch, live telematics, SOS queue (`/command`).
5. **`SCHOOL_ADMIN`**: Principal & school gate attendance logs, learner profiles, notifications (`/school`).
6. **`TEACHER`**: Classroom pupil attendance lists and emergency panic alerts (`/school`).
7. **`PARENT`**: Child live GPS tracking, bus arrival WhatsApp/push alerts, medical profile (`/parent`).
8. **`DRIVER`**: Assigned route navigation, pupil boarding roster, vehicle pre-trip audit (`/driver`).
9. **`DEVICE_TECHNICIAN`**: QR IoT sensor provisioning, BLE diagnostic tools, firmware updates (`/technician`).
10. **`EMERGENCY_PARTNER`**: SAPS & Metro EMS emergency dispatch, route navigation (`/responder`).
11. **`READONLY_AUDITOR`**: Treasury & KPMG read-only compliance, audit trails, PFMA analytics (`/executive`).

---

## 🚀 Quick Start & Local Development

### Prerequisites
- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later
- **Docker**: Optional (for running local PostGIS / TimescaleDB container)

### 1. Installation
```bash
git clone https://github.com/itis-org/itis-enterprise-platform.git
cd itis-enterprise-platform
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Seed Database & Start Development
```bash
# Seed local Prisma database
npm run seed

# Launch Express server with Vite middleware on port 3000
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🛡️ Security, Privacy & Compliance

- **POPIA Act 4 of 2013**: 100% compliant pupil biometric and location privacy controls with zero cleartext biometrics.
- **ISO/IEC 27001 & ISO 9001**: KMS Hardware Security Module (HSM) AES-256 GCM encryption at rest and TLS 1.3 in transit.
- **SITA e-Government Architecture v4.2**: Direct integration with National Treasury CSD vendor database and provincial education databases.

---

## 📊 Investor Due Diligence Suite

For investors, government auditors, and technical due diligence teams, comprehensive documentation is available in `/docs/investor-due-diligence/`:

- **[01 System Overview](docs/investor-due-diligence/01-SYSTEM-OVERVIEW.md)**: Product mission, market opportunity, and impact metrics.
- **[02 Architecture & Tech Stack](docs/investor-due-diligence/02-ARCHITECTURE-AND-TECH-STACK.md)**: Infrastructure diagrams and stack selection.
- **[03 Application Inventory](docs/investor-due-diligence/03-APPLICATION-INVENTORY.md)**: Detailed breakdown of all 10 portals.
- **[04 Deployment & Security](docs/investor-due-diligence/04-DEPLOYMENT-AND-SECURITY.md)**: SITA Cloud Enclave, SSL, and KMS encryption.
- **[05 Repository Metrics & Health](docs/investor-due-diligence/05-REPOSITORY-METRICS-AND-HEALTH.md)**: Quality gates, code coverage, and performance scores.

---

## 📄 License & Governance

Copyright © 2026 Republic of South Africa Department of Transport & ITIS Platform Group. All rights reserved.
