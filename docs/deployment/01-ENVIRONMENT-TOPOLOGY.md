# Deployment Phase D03 — Part 1: Environment Topology

## Executive Overview

The **Integrated Technology Intelligence & Safety (ITIS) Platform** implements a strict 4-tier isolated environment topology designed to guarantee security, high performance, regulatory compliance (POPIA, ISO 27001), and non-disruptive continuous integration.

```
 +------------------+     +------------------+     +------------------+     +------------------+
 |  1. Local Dev    | --> |   2. Testing     | --> |   3. Staging     | --> |  4. Production   |
 | dev.local.itis   |     | test.itis.gov.za |     | staging.itis.gov |     | itis.gov.za      |
 +------------------+     +------------------+     +------------------+     +------------------+
```

---

## Environment Configuration Matrix

| Aspect / Resource | 1. Local Development | 2. Testing (CI/CD) | 3. Staging (Pre-Prod) | 4. Production (Live) |
| ----------------- | -------------------- | ------------------ | --------------------- | -------------------- |
| **Base URL** | `http://localhost:3000` | `https://test.itis.gov.za` | `https://staging.itis.gov.za` | `https://itis.gov.za` |
| **API Endpoint** | `http://localhost:3000/api/v1` | `https://test-api.itis.gov.za/api/v1` | `https://staging-api.itis.gov.za/api/v1` | `https://api.itis.gov.za/api/v1` |
| **WebSocket URL** | `ws://localhost:3000/ws` | `wss://test-ws.itis.gov.za/ws` | `wss://staging-ws.itis.gov.za/ws` | `wss://ws.itis.gov.za/ws` |
| **Primary Database** | Local PostgreSQL 16 + PostGIS Docker | Dedicated Testing Cloud SQL PostgreSQL | Managed Cloud SQL PostgreSQL (Multi-AZ) | Production Managed Cloud SQL PostgreSQL (Ha + Read Replicas) |
| **Time-Series DB** | Local TimescaleDB Docker | Cloud TimescaleDB Test | Staging TimescaleDB Cluster | Production TimescaleDB Hypertable Cluster (Gauteng + Cape Town) |
| **Redis Cache** | Single Node Docker Container | Managed Redis MemoryStore | Redis Sentinel HA Pair | 3-Node Redis Enterprise Cluster with Persistence |
| **MQTT Broker** | Local EMQX Docker Container | Test EMQX Broker | Staging EMQX Broker | 5-Node EMQX Enterprise Cluster (`emqx.internal.itis.gov.za`) |
| **Kafka Streaming** | Embedded / Mock Stream | Staging Kafka Cluster | Staging Kafka Cluster | 3-Broker Managed Apache Kafka Cluster |
| **Object Storage** | Local filesystem (`/tmp/uploads`) | GCS / S3 Test Bucket | GCS / S3 Staging Bucket (`itis-evidence-staging`) | SITA Enclave GCS/S3 KMS-Encrypted Bucket (`itis-evidence-vault-prod`) |
| **Monitoring** | Console Logs / Local Metrics | Automated CI Test Runner | Prometheus + Grafana Staging | Prometheus + Grafana + Datadog + OpenTelemetry Collector |
| **Logging** | Human-readable stdout | CI Log Output | Structured JSON -> Loki Staging | Structured JSON -> ELK Stack / Loki Production Enclave |
| **SSL / TLS Certificate** | Self-signed / HTTP | Let's Encrypt Wildcard Test | Let's Encrypt Staging Wildcard | SITA National Government CA TLS 1.3 Certificate (`*.itis.gov.za`) |
| **Authentication** | Local JWT & Mock SITA | Mock SITA OAuth2 | SITA e-Government SSO Sandbox | Live SITA e-Government SSO SAML2 / OAuth2 Production Enclave |

---

## Tier-Specific Governance Rules

### 1. Local Development Tier
- **Purpose**: Rapid developer feature work and unit testing.
- **Data Guard**: strictly synthetic mock data. No production pupil or telematic records allowed.
- **Port Binding**: Hardcoded Express & Vite listener on port `3000` bound to host `0.0.0.0`.

### 2. Testing Tier (CI/CD Automated)
- **Purpose**: Automated pull request validation, integration test suite execution, and security linting.
- **Lifecycle**: Ephemeral containers created and destroyed per GitHub Actions pipeline execution.
- **Coverage Requirement**: 100% build compilation pass required before code promotion to staging.

### 3. Staging Tier (Pre-Production Sandbox)
- **Purpose**: Executive sign-offs, investor due diligence walkthroughs, end-to-end smoke verification, and load testing.
- **Parity**: Identical configuration, database schemas, and Kubernetes Helm values as production, with anonymized seed datasets.

### 4. Production Tier (Live National Enclave)
- **Purpose**: Live national scholar transport monitoring, SAPS CAD dispatch, and driver safety telematics across South Africa's 9 provinces.
- **High Availability**: Multi-AZ failover with RTO < 1 second and RPO = 0.
- **Access Guard**: Strictly restricted to authorized DevSecOps engineers via mTLS and SITA Bastion Jump Hosts.
