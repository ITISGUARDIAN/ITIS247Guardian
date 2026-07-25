# Deployment Phase D07 — Part 4: Production Health Checks & Live Environment Matrix

## Executive Summary

This document details the production health endpoints, live environment switching configurations (`development`, `testing`, `staging`, `production`), and OpenAPI Swagger documentation access.

---

## 1. Production Health Probe Specifications

The server exposes 4 distinct system health endpoints for Kubernetes liveness/readiness probes, load balancers, and monitoring tools:

| Endpoint Path | Method | Purpose | Response Format |
| ------------- | ------ | ------- | --------------- |
| `/` | `GET` | Root SPA Index / Health Status | HTML or JSON |
| `/health` | `GET` | Kubernetes Liveness Probe | `{"status":"HEALTHY","timestamp":"...","database":{"status":"UP"}}` |
| `/api/v1/health` | `GET` | API Gateway Readiness Probe | `{"status":"HEALTHY","timestamp":"...","database":{"status":"UP"}}` |
| `/api/v1/docs` | `GET` | OpenAPI 3.0 Swagger Spec | Complete JSON OpenAPI Document |
| `/api/v1/release/deployment/overview` | `GET` | Phase D07 Release Readiness Scorecard | `{"success": true, "overview": {...}}` |

---

## 2. Environment Switch Matrix

`.env.example` defines all required runtime environment variables across the 4 deployment tiers:

```env
# Runtime Environment Tier: development | testing | staging | production
NODE_ENV=production
PORT=3000

# PostgreSQL / TimescaleDB Master Connection
DATABASE_URL=postgresql://itis_user:secret_password@postgres-master.sita.gov.za:5432/itis_production?sslmode=require

# JWT Authentication Secrets
JWT_SECRET=super_secret_jwt_key_vault_ref
JWT_EXPIRATION=24h

# EMQX MQTT / Real-Time Telematics
MQTT_BROKER_URL=mqtts://emqx.itis.gov.za:8883
MQTT_CLIENT_ID=itis-backend-cluster

# SITA e-Government SSO Integration
SITA_SSO_ISSUER=https://sso-enclave.sita.gov.za/auth/realms/gov
SITA_SSO_CLIENT_ID=itis-enterprise-app
```
