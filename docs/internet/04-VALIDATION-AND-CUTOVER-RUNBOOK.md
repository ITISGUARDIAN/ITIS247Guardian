# Deployment Phase D05 — Part 4: Production Validation Procedures & Cutover Runbook

## Executive Summary

This document provides step-by-step verification procedures for validating public internet connectivity, DNS propagation, HTTPS certs, WebSockets, and the zero-downtime **Production Cutover & Rollback Runbook**.

---

## 1. Production Internet Validation Checklist

All 6 validation checks MUST be executed and marked PASSED prior to cutting live public traffic over to the production platform:

### 1.1 DNS Propagation Check
```bash
# Verify DNS A and CNAME record propagation globally
dig +short api.itis.gov.za
dig +short ws.itis.gov.za
dig +short download.itis.gov.za
```
- **Expected Result**: Resolves to `102.130.48.20` (or Cloudflare Edge VIPs) with TTL = 60s/300s.

### 1.2 HTTPS & TLS 1.3 Handshake Verification
```bash
# Verify TLS 1.3 protocol enforcement and SSL certificate chain
openssl s_client -connect api.itis.gov.za:443 -tls1_3 -servername api.itis.gov.za
```
- **Expected Result**: Successful TLS 1.3 handshake with `CN = *.itis.gov.za` issued by Let's Encrypt / SITA CA.

### 1.3 Security Header & HSTS Audit
```bash
# Verify security headers in HTTP response
curl -I -s https://api.itis.gov.za/api/v1/release/health/overview
```
- **Expected Result**: HTTP 200 OK with `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` and `X-Frame-Options: SAMEORIGIN`.

### 1.4 API Reachability & Health Endpoint
```bash
curl -s https://api.itis.gov.za/api/v1/release/health/overview | jq .
```
- **Expected Result**: `{"success": true, "overview": {"status": "HEALTHY", ...}}`.

### 1.5 WebSocket WSS Connectivity Test
```bash
# Test WSS real-time connection
wscat -c wss://ws.itis.gov.za/ws
```
- **Expected Result**: Connection established with `HTTP 101 Switching Protocols`.

### 1.6 Download Portal Partial Content (HTTP 206) Test
```bash
# Verify byte-range resume support for Android APK download
curl -I -r 0-1024 https://download.itis.gov.za/itis-parent-v1.0.0.apk
```
- **Expected Result**: `HTTP/1.1 206 Partial Content` with `Accept-Ranges: bytes`.

---

## 2. Production Cutover & Go-Live Runbook

The cutover follows a strict 4-phase sequence executed by the SRE and DevSecOps team:

```
 [ Phase 1: Pre-Cutover ] ---> [ Phase 2: Go-Live Traffic ] ---> [ Phase 3: Smoke Verification ] ---> [ Phase 4: Post-Launch ]
 (Backup & DNS Prep)          (DNS TTL Drop & VIP Swap)         (Execute E2E Tests)               (12-Hr Hypercare)
```

### Phase 1: Pre-Cutover Verification (T-2 Hours)
1. **Database Snapshot**: Take a manual full PostgreSQL and TimescaleDB database snapshot (`gcloud sql instances snapshot itis-db-prod`).
2. **Lower DNS TTLs**: Set TTL on all `itis.gov.za` records to **60 seconds**.
3. **Confirm Pod Scaled State**: Verify 10x API pods, 8x Telematics pods, and 5x EMQX brokers are green (`kubectl get pods -n itis-production`).

### Phase 2: Go-Live Traffic Shift (T-0 Hours)
1. **Update DNS Edge Pointer**: Change Cloudflare / SITA DNS A records from Legacy Staging IP to Production Load Balancer VIP (`102.130.48.20`).
2. **Purge Edge CDN Cache**: Execute global Cloudflare cache purge (`curl -X POST https://api.cloudflare.com/client/v4/zones/.../purge_cache`).
3. **Enable SAPS CAD Live Dispatch**: Activate live webhook dispatch in SAPS National Control Room.

### Phase 3: Post-Cutover Smoke Verification (T+15 Minutes)
1. Execute automated End-to-End smoke suite against `https://api.itis.gov.za`.
2. Monitor PagerDuty and Grafana dashboard for any HTTP 5xx spikes or database connection pool exhaustion.
3. Verify mobile app test user login and live bus GPS ping ingestion.

### Phase 4: Emergency Rollback Trigger (If Error Rate > 0.5%)
1. **Revert DNS A Record**: Immediately point `itis.gov.za` back to Maintenance / Legacy VIP.
2. **Restore Database State**: If data corruption occurred, trigger PITR database restore to T-2 Hours snapshot.
3. **Issue Status Alert**: Update `status.itis.gov.za` notifying stakeholders of maintenance window extension.
