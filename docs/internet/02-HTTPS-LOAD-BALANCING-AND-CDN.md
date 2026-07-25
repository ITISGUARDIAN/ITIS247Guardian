# Deployment Phase D05 — Part 2: HTTPS, Ingress Load Balancing & CDN Architecture

## Executive Summary

The **ITIS Enterprise Platform** enforces mandatory **TLS 1.3 encryption**, strict HTTP Strict Transport Security (HSTS), automated certificate provisioning via `cert-manager`, multi-layer ingress load balancing (NGINX + HAProxy), and Cloudflare / SITA Edge CDN caching for static assets, public downloads, and whitepapers.

---

## 1. HTTPS, TLS 1.3 & Certificate Automation

### 1.1 Cryptographic Profile & Protocol Constraints
- **Minimum Protocol**: **TLS 1.3** required for all public internet endpoints. TLS 1.0, 1.1, and 1.2 are strictly disabled at the WAF and NGINX edge.
- **OCSP Stapling**: `ssl_stapling on; ssl_stapling_verify on;` enabled to eliminate client certificate validation latency.
- **HSTS Enforcement**: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.

### 1.2 Automated Wildcard Certificate Renewal (`cert-manager`)
Kubernetes `cert-manager` uses DNS-01 ACME challenge handlers to automatically renew wildcard certificates (`*.itis.gov.za`) 30 days prior to expiration:

```yaml
# /infrastructure/k8s/cert-manager-cluster-issuer.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-sita-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: devsecops@itis.gov.za
    privateKeySecretRef:
      name: letsencrypt-sita-prod-account-key
    solvers:
    - dns01:
        cloudflare:
          email: devsecops@itis.gov.za
          apiTokenSecretRef:
            name: cloudflare-api-token-secret
            key: api-token
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: wildcard-itis-gov-za-cert
  namespace: itis-production
spec:
  secretName: wildcard-itis-gov-za-tls
  issuerRef:
    name: letsencrypt-sita-prod
    kind: ClusterIssuer
  commonName: "*.itis.gov.za"
  dnsNames:
  - "itis.gov.za"
  - "*.itis.gov.za"
```

---

## 2. Production Ingress & Load Balancing (NGINX Configuration)

The NGINX Ingress Controller acts as the high-throughput gateway for REST API endpoints, WebSockets, and public downloads:

```nginx
# /etc/nginx/conf.d/itis-ingress.conf
upstream backend_api_cluster {
    zone backend_api 64k;
    server 10.200.1.10:3000 max_fails=3 fail_timeout=10s;
    server 10.200.1.11:3000 max_fails=3 fail_timeout=10s;
    server 10.200.1.12:3000 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

upstream websocket_cluster {
    ip_hash; # Sticky sessions for real-time telematics
    server 10.200.2.10:8883;
    server 10.200.2.11:8883;
}

# Rate Limiting Zones
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=300r/m;
limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

server {
    listen 443 ssl http2;
    server_name api.itis.gov.za;

    ssl_certificate /etc/ssl/certs/wildcard-itis-gov-za.crt;
    ssl_certificate_key /etc/ssl/certs/wildcard-itis-gov-za.key;
    ssl_protocols TLSv1.3;
    ssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256;
    ssl_prefer_server_ciphers off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # API Proxy Location
    location / {
        limit_req zone=api_limit burst=50 nodelay;
        limit_conn conn_limit 20;

        proxy_pass http://backend_api_cluster;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    # Health Check Probe
    location /api/v1/release/health/overview {
        proxy_pass http://backend_api_cluster;
        access_log off;
    }
}
```

---

## 3. CDN & Edge Caching Strategy

- **Static Website Assets (`.js`, `.css`, `.png`, `.svg`)**: Cached at Cloudflare / SITA Edge CDNs with `Cache-Control: public, max-age=31536000, immutable`.
- **Public Application Binaries (`download.itis.gov.za`)**: Cached at edge locations with Byte-Range Resume Support (`Accept-Ranges: bytes`).
- **Dynamic API Responses (`/api/*`)**: Marked with `Cache-Control: no-store, private` to prevent caching confidential pupil or telematics data.
- **Brotli & Gzip Compression**: Enabled at edge WAF for all text/json payloads reducing transfer sizes by up to 78%.
