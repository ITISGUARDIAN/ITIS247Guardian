---
name: Security vulnerability
about: Report a potential security issue in strict confidence
title: '[SECURITY] '
labels: 'type: security, priority: high'
assignees: 'itis-security-team'
---

> **CRITICAL NOTICE**: If this vulnerability exposes live pupil biometrics, GPS telematics, or authentication tokens, DO NOT post detailed reproduction steps publicly. Submit encrypted details directly to `security@itis.gov.za`.

**Component / API Endpoint**
- [ ] Authentication / OAuth2 / SITA SSO
- [ ] Telematics MQTT / WebSocket Ingestion
- [ ] Biometric / RFID Encryption at Rest (KMS)
- [ ] Database / PostGIS Query Sanitization
- [ ] Role-Based Access Control (RBAC) Guard

**Vulnerability Overview**
A high-level description of the security issue.

**Impact Assessment**
- [ ] Confidentiality (Data Leak)
- [ ] Integrity (Unauthorized Mutation)
- [ ] Availability (Denial of Service)

**Remediation Suggestion**
If known, suggest how to fix or mitigate the vulnerability.
