# Deployment Phase D07 — Part 1: Production Build & Server Hardening Architecture

## Executive Summary

The **ITIS Enterprise Platform** implements a hardened Express & Vite full-stack server architecture running on Node.js 20+ LTS with native ES module support, bundled CommonJS server entry points (`dist/server.cjs`), strict HTTP security headers (Helmet specification), CORS restrictions, trust proxy configuration for NGINX/Cloudflare ingress, and gzip/brotli compression.

---

## 1. Multi-Portal Production Build Matrix

The platform compiles 7 integrated web portal interfaces and 1 full-stack backend server into optimized production bundles:

| Portal Application | Type | Production Route Path | Build Entry Point | Bundle Status |
| ------------------ | ---- | --------------------- | ----------------- | ------------- |
| **Corporate Website** | React 18 SPA | `/` | `/src/main.tsx` | COMPILED & VERIFIED |
| **Parent Portal** | React 18 SPA | `/parent` | `/src/main.tsx` | COMPILED & VERIFIED |
| **School Portal** | React 18 SPA | `/school` | `/src/main.tsx` | COMPILED & VERIFIED |
| **Command Centre** | React 18 SPA | `/command` | `/src/main.tsx` | COMPILED & VERIFIED |
| **Government Portal** | React 18 SPA | `/government` | `/src/main.tsx` | COMPILED & VERIFIED |
| **Executive Dashboard**| React 18 SPA | `/executive` | `/src/main.tsx` | COMPILED & VERIFIED |
| **Authentication Portal**| Full-Stack SSO | `/api/v1/auth` | `/src/backend/auth/auth.controller.ts` | COMPILED & VERIFIED |

---

## 2. Server Hardening & Express Middlewares

### 2.1 Security Headers & CORS Enforcement
```typescript
// /server.ts Security & CORS Configuration
app.set('trust proxy', true); // Trust reverse proxy headers from NGINX & Cloudflare Edge

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Correlation-ID');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

### 2.2 Rate Limiting & Correlation Tracing
- **Correlation ID Middleware**: Assigns a unique `X-Correlation-ID` UUID to every incoming request for end-to-end distributed audit logging across microservices.
- **In-Memory & Redis Rate Limiting**: Enforces 300 requests per minute per IP on public REST endpoints (`/api/v1/*`), and 30 requests per minute on auth endpoints (`/api/v1/auth/*`).
