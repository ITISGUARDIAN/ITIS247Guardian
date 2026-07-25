# Deployment Phase D03 — Part 2: Cloud Architecture Specifications

## Executive Summary

The **Integrated Technology Intelligence & Safety (ITIS) Platform** uses a microservice-oriented, event-driven containerized architecture deployed on Kubernetes with high availability across primary (SITA Gauteng) and secondary (AWS / GCP Cape Town) cloud enclaves.

```
                           [ Cloudflare / SITA WAF Edge ]
                                        |
                                 (HTTPS / TLS 1.3)
                                        v
                       [ NGINX Ingress Controller Layer ]
                                        |
      +---------------------------------+---------------------------------+
      |                                 |                                 |
      v                                 v                                 v
[ Backend API Pods ]        [ WS / Telematics Pods ]            [ CAD Dispatch Pods ]
(10x K8s Replicas)             (8x K8s Replicas)                 (4x K8s Replicas)
      |                                 |                                 |
      +---------------------------------+---------------------------------+
                                        |
      +---------------------------------+---------------------------------+
      |                                 |                                 |
      v                                 v                                 v
[ PostgreSQL Multi-AZ ]         [ TimescaleDB Cluster ]          [ Redis HA Cluster ]
 (Master + 2 Replicas)          (Hypertable Telematics)          (3-Node Sentinel)
```

---

## 1. System Component Specifications

### 1.1 Backend REST API Microservices (`itis-backend-api`)
- **Runtime**: Node.js 20 LTS + Express v4 + TypeScript.
- **Packaging**: Containerized via multi-stage Alpine Dockerfile (`dist/server.cjs`).
- **Kubernetes Sizing**: 10 Replicas minimum, 50 Replicas maximum (HPA target: 70% CPU / Memory utilization).
- **Resource Limits**: Request: `500m CPU, 1Gi RAM` | Limit: `2000m CPU, 4Gi RAM`.

### 1.2 Corporate Website & Portals (`itis-frontend-portal`)
- **Runtime**: Static Single Page Application (SPA) served via NGINX.
- **Build Output**: Optimized Vite bundle with gzip/brotli compression.
- **Edge Distribution**: Cached at Cloudflare / SITA Edge CDNs with 1-year immutable static asset caching.

### 1.3 Primary Relational Database (`PostgreSQL 16 + PostGIS`)
- **Engine**: PostgreSQL 16 with PostGIS spatial extension & Prisma ORM.
- **Topology**: Primary Writer in SITA Centurion DC + Read Replica in SITA Centurion + Standby Replica in AWS Cape Town.
- **Instance Sizing**: 16 vCPU, 64 GB RAM, 1 TB NVMe Storage with IOPS autoscale.

### 1.4 High-Frequency Telematics Database (`TimescaleDB`)
- **Engine**: TimescaleDB extension for time-series geospatial pings.
- **Data Model**: Compressed hypertables with chunk interval of 1 day for 50,000 active bus telemetry streams.
- **Retention**: Raw 1-second pings retained for 90 days; aggregated 1-minute summaries retained for 7 years.

### 1.5 Cache & Session Store (`Redis Enterprise Cluster`)
- **Topology**: 3-Node Master-Replica cluster with Redis Sentinel auto-failover.
- **Memory Allocation**: 16 GB RAM with LRU eviction for session tokens and active geofence lookup keys.

### 1.6 Fleet IoT Message Broker (`EMQX MQTT 5.0`)
- **Topology**: 5-Node EMQX Cluster behind Layer 4 Load Balancers.
- **Capacity**: Handles 100,000 concurrent MQTT TLS connections from bus gateways and wearable RFID readers.

### 1.7 Event Streaming Pipeline (`Apache Kafka`)
- **Topology**: 3 Broker Kafka Cluster with Zookeeper / KRaft consensus.
- **Topics**: `telematics.raw.gps`, `telematics.alerts.sos`, `biometrics.rfid.taps`, `system.audit.logs`.

### 1.8 Evidence & File Vault (`S3 / Cloud Storage`)
- **Bucket Spec**: Encrypted via KMS HSM keys; object versioning enabled; Immutable WORM retention for audit evidence.

---

## 2. Multi-Cloud Target Profiles

The ITIS platform source code and Infrastructure as Code (IaC) templates natively support 4 major deployment targets:

### Target A: SITA National Government Cloud Enclave (Default Primary)
- **Data Centers**: SITA Centurion (Gauteng) & SITA Pietermaritzburg (KZN).
- **Compliance**: Full National Treasury, SITA Act 88 of 1998, and POPIA enclaves.
- **Kubernetes**: SITA OpenShift / Rancher K8s Cluster (`itis-production` namespace).

### Target B: Amazon Web Services (AWS South Africa - `af-south-1` Cape Town)
- **Services**: EKS (Elastic Kubernetes Service), RDS PostgreSQL Multi-AZ, ElastiCache Redis, MSK (Managed Kafka), S3.
- **IaC Module**: Located in `/infrastructure/terraform/aws`.

### Target C: Google Cloud Platform (GCP Africa - `africa-south1` Johannesburg)
- **Services**: GKE (Google Kubernetes Engine), Cloud SQL for PostgreSQL, Memorystore Redis, Cloud Storage, KMS.
- **IaC Module**: Located in `/infrastructure/terraform/gcp`.

### Target D: Microsoft Azure (South Africa North - Johannesburg)
- **Services**: AKS (Azure Kubernetes Service), Flexible Server PostgreSQL, Azure Cache for Redis, Blob Storage.
- **IaC Module**: Located in `/infrastructure/terraform/azure`.
