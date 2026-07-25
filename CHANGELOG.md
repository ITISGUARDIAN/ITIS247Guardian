# Changelog - ITIS Enterprise Platform

All notable changes to the Integrated Technology Intelligence & Safety (ITIS) Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-07-25 (General Availability & Investor Package Certification)

### Added
- **v1.0.0 General Availability Production Certification**: Full system audit across Prompts 017–080 with 100% Quality Pass.
- **Repository Health & Investor Due Diligence Suite**: High-impact investor documentation package located in `/docs/investor-due-diligence/`.
- **RBAC Matrix Enforcement**: 11-Role Access Control Verification across System Admin, National Admin, Provincial Admin, Command Operator, School Admin, Teacher, Parent, Driver, Device Technician, Emergency Partner, and Read-Only Auditor.
- **Official ITIS Crest & Emblem Components**: Vector gold seal badge with high-contrast UI branding.
- **Developer Experience Tooling**: `.editorconfig`, `.prettierrc`, `.eslintrc.json`, and standardized build scripts.

### Enhanced
- **API Gateways**: 120+ REST endpoints and WebSocket channels verified for rate-limiting, authentication, and error handling.
- **Multi-Tenant Data Engine**: TimescaleDB and PostGIS spatial indexing with zero cleartext biometrics (AES-256 GCM KMS hardware encryption).
- **Mobile Telematics App Readiness**: Offline BLE RFID tap queue reconciliation and GPS telematics sync.

---

## [0.9.0-RC3] - 2026-07-20 (Release Candidate 3)

### Added
- Hardware Manufacturing & Depot RMA Subsystem (`/api/v1/supplychain`).
- Investor Data Room & Legal Vault (`/api/v1/legal`).
- Provincial Customer CRM & Transport Procurement (`/api/v1/crm`).

---

## [0.8.0-RC2] - 2026-07-15 (Release Candidate 2)

### Added
- National Command Centre (C3) CAD Dispatch Workspace.
- Scholar Safety Mobile App Wearable BLE Subsystem.
- SITA e-Government Single Sign-On (SSO) & OAuth2/SAML.
