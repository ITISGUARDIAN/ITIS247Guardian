# Security Policy - ITIS Enterprise Platform

The Integrated Technology Intelligence & Safety (ITIS) Platform operates under strict government cybersecurity and data privacy frameworks, including the South African **Protection of Personal Information Act (POPIA Act 4 of 2013)** and **ISO/IEC 27001 Security Management Standards**.

---

## Supported Versions

| Version | Supported          | Security Audit Status |
| ------- | ------------------ | --------------------- |
| 1.0.x   | :white_check_mark: | KPMG & SITA Audited   |
| < 1.0   | :x:                | End of Life           |

---

## Reporting a Vulnerability

If you discover a security vulnerability within the ITIS platform:

1. **Do NOT open a public issue.**
2. Send an encrypted report directly to the ITIS Cyber Security Team at `security@itis.gov.za`.
3. Include:
   - Module / Endpoint affected
   - Step-by-step reproduction guide
   - Potential impact analysis (e.g., Auth Bypass, PII Leak, Telemetry Injection)

---

## Security Engineering Principles

- **Zero Cleartext Biometrics**: All pupil RFID, facial templates, and GPS coordinates are encrypted at rest using AES-256 GCM hardware KMS keys.
- **TLS 1.3 Strict Enclave**: All in-transit REST and WebSocket traffic is enforced over TLS 1.3 with mTLS for telematic IoT hardware.
- **Role-Based Access Control (RBAC)**: Strict separation across 11 system roles with complete audit logging via `AuditLogger`.
