# Investor Due Diligence — Part 4: Deployment & Cybersecurity

## 1. Cloud Infrastructure & SITA Enclave Setup

ITIS is containerized using Docker and orchestrated with Kubernetes (Helm) for high availability across SITA National Data Centers (Gauteng) and GCP Backup Availability Zones (Western Cape).

```
                      +-----------------------------------+
                      |   Cloudflare / SITA WAF Edge      |
                      |   DDoS Mitigation & Rate Limiting |
                      +-----------------------------------+
                                        |
                                  (HTTPS / TLS 1.3)
                                        v
                      +-----------------------------------+
                      | NGINX Reverse Proxy Ingress       |
                      | Port 3000 Internal Routing        |
                      +-----------------------------------+
                                        |
                                        v
                      +-----------------------------------+
                      | Kubernetes Cluster (Auto-scaling) |
                      | Node.js Express API Pods (x10)    |
                      +-----------------------------------+
```

---

## 2. Cybersecurity & Encryption Governance

- **Data Encryption at Rest**: AES-256 GCM encryption for all sensitive pupil records using Cloud KMS Hardware Security Modules.
- **Data Encryption in Transit**: Enforced TLS 1.3 for all REST and WebSocket connections; mTLS (Mutual TLS) for hardware IoT gateways.
- **POPIA Act 2013 Compliance**: Strict section 18 compliance with automatic anonymization of student records after graduation.
- **ISO 27001 & ISO 9001**: KPMG Cyber Assurance audited with zero critical vulnerabilities found during penetration testing.
