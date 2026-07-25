# Deployment Phase D07 — Part 3: Frontend & Backend Deployment Configurations

## Executive Summary

This document specifies the production build assets, routing strategies, cache headers, Docker container startup manifests, and npm scripts for deploying the **ITIS Enterprise Platform**.

---

## 1. Production Package Scripts & Docker Build Flow

### 1.1 `package.json` Production Scripts
```json
{
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs",
    "lint": "tsc --noEmit"
  }
}
```

### 1.2 Multi-Stage Dockerfile (`Dockerfile`)

```dockerfile
# Stage 1: Build Phase
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Execution Phase
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/server.cjs"]
```

---

## 2. Static Asset Caching & SPA Routing Headers

- **Hashed Assets (`/assets/*.js`, `/assets/*.css`)**: Served with `Cache-Control: public, max-age=31536000, immutable`.
- **HTML Entry Pages (`index.html`)**: Served with `Cache-Control: no-cache, must-revalidate` to ensure instant SPA update adoption on new deployment releases.
- **SPA Fallback Routing**: All non-API routes (`/*`) fall back to `dist/index.html` via Express static fallback.
