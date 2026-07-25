# Deployment Phase D04 — Part 2: Redis, MQTT & Kafka Production Configuration

## Executive Summary

The messaging and caching layer of the **ITIS Enterprise Platform** handles sub-second real-time telemetry from 50,000 buses, JWT token revocations, rate limiting, and emergency SAPS CAD broadcasts using **Redis Enterprise Cluster**, **EMQX MQTT 5.0**, and **Apache Kafka**.

---

## 1. Redis Production Configuration & Cache Namespaces

### 1.1 Architecture & Eviction Policy
- **Topology**: 3-Node Master-Replica cluster with Redis Sentinel auto-failover (`redis.internal.itis.gov.za:6379`).
- **Memory Management**: `maxmemory 16gb`, `maxmemory-policy allkeys-lru`.
- **Persistence**: Hybrid RDB snapshots (every 15 minutes) + AOF (`appendfsync everysec`).

### 1.2 Cache Namespace Mapping & TTL Policies

| Namespace Prefix | Description / Key Format | Default TTL | Eviction Behavior |
| ---------------- | ------------------------ | ----------- | ----------------- |
| `jwt:blacklist:` | Revoked JWT tokens (`jwt:blacklist:{jti}`) | 15 Minutes (Token Lifespan) | No Eviction / Volatile TTL |
| `ratelimit:` | API Rate Limiting counters (`ratelimit:{ip}:{endpoint}`) | 60 Seconds | Volatile TTL |
| `session:` | Active User Session State (`session:{userId}`) | 24 Hours | LRU Eviction |
| `telemetry:geofence:` | Vehicle Current Geofence State (`telemetry:geofence:{busId}`) | 5 Minutes | LRU Eviction |
| `telemetry:last_ping:` | Last known GPS coordinates (`telemetry:last_ping:{busId}`) | 1 Hour | LRU Eviction |

---

## 2. MQTT Broker Production Configuration (EMQX 5.0)

### 2.1 Security & Mutual TLS (mTLS)
- **Port Listener**: `8883` (MQTT over TLS v1.3 with client certificate validation).
- **Client Authentication**: Hardware telematic gateways authenticate using mTLS RSA-4096 certificates issued by SITA IoT CA + bcrypt salted device token.

### 2.2 Topic Hierarchy & Quality of Service (QoS)

```
itis/v1/{province}/{municipality}/telematics/{vehicleId}/gps   (QoS 1)
itis/v1/{province}/{municipality}/telematics/{vehicleId}/sos   (QoS 2 - Highest Priority)
itis/v1/{province}/{municipality}/biometrics/rfid/{gateId}      (QoS 1)
itis/v1/commands/{vehicleId}/ota                               (QoS 2)
```

- **Retained Messages**: `itis/v1/{province}/{municipality}/telematics/{vehicleId}/status` retains current ignition & online state (`ONLINE` / `OFFLINE`).

### 2.3 Access Control List (ACL) Rules
- **Bus Telematics Gateway**: Can ONLY publish to `itis/v1/+/+/telematics/{self.id}/*` and subscribe to `itis/v1/commands/{self.id}/*`.
- **Field Technician Tool**: Can ONLY publish/subscribe to `itis/v1/provisioning/{self.tech_id}/*`.
- **C3 Command Centre Ingress**: Read-only wildcard subscription `itis/v1/+/+/+/+/*`.

---

## 3. Kafka Production Event Streaming Architecture

### 3.1 Topic Specifications & Retention

| Topic Name | Partitions | Replication Factor | Retention Period | Cleanup Policy |
| ---------- | ---------- | ------------------ | ---------------- | -------------- |
| `telematics.raw.gps` | 12 | 3 | 30 Days | Delete |
| `telematics.alerts.sos` | 12 | 3 | 7 Years | Compact / Archive |
| `biometrics.rfid.taps` | 12 | 3 | 30 Days | Delete |
| `system.audit.logs` | 12 | 3 | 10 Years | Compact / WORM Archive |

### 3.2 Consumer Groups, Retry & Dead-Letter Queues (DLQ)
- **Consumer Group `itis-telematics-ingest-group`**: Consumes `telematics.raw.gps` and writes to TimescaleDB hypertable in batches of 500 records.
- **Retry Mechanism**: Failed telemetry events are published to `telematics.raw.gps.retry-1` with 5-second backoff (max 3 retries).
- **Dead-Letter Queue (DLQ)**: Malformed or unparseable packets are routed to `telematics.raw.gps.dlq` for SRE manual inspection.
