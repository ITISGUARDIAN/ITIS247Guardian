# Deployment Phase D05 — Part 1: Domain Strategy & DNS Configuration

## Executive Overview

The **ITIS Enterprise Platform** enforces a unified, government-compliant domain hierarchy with high-availability DNS routing, DNSSEC validation, strict SPF/DKIM/DMARC email security, and CAA certificate authorization records. All domain names referenced are standardized placeholder examples for public internet deployment.

---

## 1. Public Internet Domain Hierarchy Strategy

| Role / Function | Subdomain Placeholder | Primary Target | CDN / Proxy | Purpose |
| --------------- | --------------------- | -------------- | ----------- | ------- |
| **Main Portal** | `itis.gov.za` | Cloudflare / SITA WAF Edge | Proxied | Public Website & Parent Safety Hub |
| **Canonical Web** | `www.itis.gov.za` | `itis.gov.za` | Proxied | CNAME web redirect |
| **API Microservices** | `api.itis.gov.za` | NGINX Ingress VIP | Proxied | REST API Services & Health Probes |
| **SITA SSO Gateway** | `auth.itis.gov.za` | SITA e-Gov SSO Enclave | Proxied | SAML2 & OAuth2 Single Sign-On |
| **Real-time Telematics** | `ws.itis.gov.za` | EMQX / WS Ingress | Direct TLS | WSS & MQTT Telematics Stream |
| **Public Downloads** | `download.itis.gov.za` | S3 / GCS Edge Bucket | Proxied | Mobile APKs, Desktop Apps, Whitepapers |
| **Documentation** | `docs.itis.gov.za` | Static Vault CDN | Proxied | Investor Due Diligence & OpenAPI Specs |
| **Public Status** | `status.itis.gov.za` | Statuspage Edge | Direct | Real-time Uptime & SLA Monitor |
| **Internal Ops** | `monitor.itis.gov.za` | Internal VPN VIP | Internal | Grafana & Prometheus Dashboards |
| **Object Storage** | `storage.itis.gov.za` | Cloud KMS Bucket | Proxied | Evidence Vault & Presigned Downloads |
| **Email Relay** | `mail.itis.gov.za` | SITA SMTP Gateway | Direct | Transactional Email & Alerts |
| **Admin Enclave** | `admin.itis.gov.za` | SITA Bastion VIP | Proxied | National Command & System Admin Portal |

---

## 2. Production DNS Record Specification & TTL Strategy

```
                                  [ DNS Authority ]
                             SITA Anycast DNS / Cloudflare
                                           |
    +-------------------+------------------+------------------+-------------------+
    |                   |                  |                  |                   |
 A / AAAA Records   CNAME Aliases      MX Mail Exchange   TXT Verification   CAA Policy
 (60s - 300s TTL)   (300s TTL)         (3600s TTL)        (3600s TTL)        (86400s TTL)
```

### 2.1 Zone File Records Table (`itis.gov.za.zone`)

```dns
;$ORIGIN itis.gov.za.
;$TTL 300

; --- SOA Record ---
@       IN  SOA  ns1.sita.gov.za. hostmaster.itis.gov.za. (
                 2026072501 ; Serial YYYYMMDDNN
                 3600       ; Refresh 1 hour
                 1800       ; Retry 30 mins
                 1209600    ; Expire 2 weeks
                 300 )      ; Minimum TTL 5 mins

; --- Name Servers ---
@       IN  NS   ns1.sita.gov.za.
@       IN  NS   ns2.sita.gov.za.
@       IN  NS   ns3.sita.gov.za.

; --- A & AAAA IPv4/IPv6 Address Records ---
@       IN  A    102.130.48.10
@       IN  AAAA 2001:db8:sita:1::10
api     IN  A    102.130.48.20
api     IN  AAAA 2001:db8:sita:1::20
ws      IN  A    102.130.48.25
ws      IN  AAAA 2001:db8:sita:1::25
storage IN  A    102.130.48.30

; --- CNAME Canonical Alias Records ---
www      IN  CNAME  itis.gov.za.
auth     IN  CNAME  sso-enclave.sita.gov.za.
download IN  CNAME  edge-storage.sita.gov.za.
docs     IN  CNAME  investor-vault.itis.gov.za.
status   IN  CNAME  statuspage.itis.gov.za.

; --- CAA Certificate Authority Authorization ---
@       IN  CAA  0 issue "letsencrypt.org"
@       IN  CAA  0 issue "sita.gov.za"
@       IN  CAA  0 iodef "mailto:security@itis.gov.za"

; --- Mail Exchange (MX) & Email Security (SPF / DKIM / DMARC) ---
@       IN  MX   10 mail.itis.gov.za.
mail    IN  A    102.130.48.50

; SPF Record: Hard Fail (-all) enforcing authorized SITA mail servers
@       IN  TXT  "v=spf1 mx ip4:102.130.48.50/32 -all"

; DKIM RSA 2048-bit Public Key Selector
sita2026._domainkey IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuITIS2026PlaceholderPublicKey..."

; DMARC Policy Enforcement (Reject 100% non-compliant email)
_dmarc  IN  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc-reports@itis.gov.za; ruf=mailto:security@itis.gov.za; pct=100; fo=1"
```

---

## 3. Recommended TTL Strategy

- **High-Mobility Endpoints (`api`, `ws`)**: **60 Seconds** (Enables rapid failover during Multi-AZ IP migration).
- **Public Core Endpoints (`@`, `www`, `download`, `docs`)**: **300 Seconds (5 Minutes)**.
- **Email & Identity Records (`MX`, `SPF`, `DKIM`, `DMARC`)**: **3,600 Seconds (1 Hour)**.
- **Security & Authorization (`CAA`)**: **86,400 Seconds (24 Hours)**.
