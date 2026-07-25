# Deployment Phase D03 — Part 3: Domain, DNS & SSL/TLS Configuration

## 1. Production Domain Architecture

The ITIS Enterprise Platform enforces a structured, security-hardened DNS hierarchy. All domains use placeholder examples below:

```
                          itis.gov.za (Main Portal)
                                     |
    +-----------------+--------------+----------------+-----------------+
    |                 |               |                |                 |
api.itis.gov.za   ws.itis.gov.za  auth.itis.gov.za  docs.itis.gov.za  status.itis.gov.za
 (REST Services)  (Live Telematics) (SITA SSO Auth) (Investor Vault)   (Public Status)
```

---

## 2. DNS Record Mapping Table

| Subdomain / Host | Record Type | Target / Value | TTL | Proxy / CDN | Purpose |
| ---------------- | ----------- | -------------- | --- | ----------- | ------- |
| `@` (`itis.gov.za`) | A / ALIAS | `102.130.48.10` / Cloudflare Edge | 300s | Enabled (Proxied) | Main Public Portal & Parent Hub |
| `www` | CNAME | `itis.gov.za` | 300s | Enabled (Proxied) | Canonical Web Redirect |
| `api` | A | `102.130.48.20` / NGINX Ingress VIP | 60s | Enabled (Proxied) | REST Microservices Gateway |
| `ws` | A | `102.130.48.25` / EMQX / WS Ingress | 60s | Bypass (Direct TLS) | Real-time Telematics & CAD WebSockets |
| `auth` | CNAME | `sso-enclave.sita.gov.za` | 300s | Enabled | SITA e-Government SSO Gateway |
| `docs` | CNAME | `investor-vault.itis.gov.za` | 300s | Enabled | Investor Due Diligence & API Specs |
| `status` | CNAME | `statuspage.itis.gov.za` | 60s | Bypass | Public SLA & System Health Page |
| `monitor` | A | `10.200.10.5` (Internal SITA VPN) | 300s | Internal Only | Prometheus / Grafana Ops Dashboard |

---

## 3. SSL/TLS Cryptographic Guidelines

### 3.1 TLS Version & Cipher Suite Enforcement
- **Minimum Protocol**: **TLS 1.3** required for all public endpoints. TLS 1.0, 1.1, and 1.2 are strictly disabled at the WAF and NGINX ingress level.
- **Allowed Ciphers**:
  - `TLS_AES_256_GCM_SHA384`
  - `TLS_CHACHA20_POLY1305_SHA256`
  - `TLS_AES_128_GCM_SHA256`

### 3.2 Certificate Provisioning & Automated Renewal
- **Primary Certificate Authority**: SITA National Government PKI / Let's Encrypt Enterprise CA.
- **Automation**: Kubernetes `cert-manager` controller integrated with ACME DNS-01 challenge handlers automatically renews wildcard certificates (`*.itis.gov.za`) 30 days prior to expiration.
- **Backup Certs**: Dual-RSA 4096 / ECDSA P-384 certificates pre-provisioned in KMS Hardware Security Modules.

### 3.3 Security Headers & Cookie Enforcement
All HTTP responses from NGINX and Express MUST include the following security headers:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://maps.googleapis.com; connect-src 'self' wss://ws.itis.gov.za https://maps.googleapis.com;
```

**Cookie Policy**:
- All session and authentication cookies enforce `Secure; HttpOnly; SameSite=Strict; Path=/; Domain=.itis.gov.za`.
