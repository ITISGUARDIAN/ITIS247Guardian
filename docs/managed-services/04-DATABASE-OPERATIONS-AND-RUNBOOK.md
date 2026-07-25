# Deployment Phase D04 — Part 4: Database Operations & Site Reliability Engineering (SRE) Runbook

## Executive Summary

This document provides step-by-step operational procedures for Database Operations, Disaster Recovery, Service Restarts, and Emergency Certificate Rotation for the **ITIS Enterprise Platform**.

---

## 1. Database Migration & Rollback Checklists

### 1.1 Pre-Deployment Migration Checklist
- [ ] Verify migration SQL script is non-blocking and additive-first.
- [ ] Run `npx prisma migrate status` against Staging database.
- [ ] Confirm full database backup snapshot was completed within the last 1 hour.
- [ ] Ensure PgBouncer connection pool has sufficient idle capacity.

### 1.2 Migration Execution
```bash
# Execute Prisma migration on production cluster
kubectl exec -it deployment/itis-backend-api -n itis-production -- npx prisma migrate deploy
```

### 1.3 Rollback Checklist (Emergency Schema Reversion)
- [ ] If migration fails, isolate the affected API pod deployment immediately (`kubectl rollout pause deployment/itis-backend-api -n itis-production`).
- [ ] Execute down-migration script using Prisma rollback SQL artifact.
- [ ] Restore database state to last pre-migration WAL snapshot if data corruption occurred.
- [ ] Verify database schema hash via `/api/v1/release/health/overview`.

---

## 2. Operations Runbook Procedures

### Procedure 1: PostgreSQL Failover (Primary Writer Failure)
**Trigger**: Primary PostgreSQL database pod/node uncontactable for > 15 seconds.
1. **Automated Trigger**: Cloud SQL / Patroni detects primary heartbeat loss and promotes synchronous read replica in Centurion DC to Primary Writer.
2. **DNS Floating VIP Re-assignment**: Internal DNS `postgres.internal.itis.gov.za` updates pointer to new Primary Writer in < 840ms.
3. **Manual SRE Verification**:
   ```bash
   # Check Patroni cluster status
   patronictl -c /etc/patroni/patroni.yml list
   # Verify Prisma connectivity
   curl https://api.itis.gov.za/api/v1/release/health/overview
   ```

---

### Procedure 2: Redis Cluster Rolling Restart & Cache Flush
**Trigger**: Redis memory saturation OR corrupted session cache.
1. **Flush Non-Essential Caches**:
   ```bash
   redis-cli -h redis.internal.itis.gov.za -a $REDIS_PASSWORD EVAL "for _,k in ipaip(redis.call('keys','ratelimit:*')) do redis.call('del',k) end" 0
   ```
2. **Execute Rolling Pod Restart**:
   ```bash
   kubectl rollout restart statefulset/redis-cluster -n itis-production
   ```

---

### Procedure 3: EMQX MQTT Broker Node Restart & Session Recovery
**Trigger**: Unresponsive MQTT gateway listener on port 8883.
1. **Isolate Broker Node**: Drain traffic from target node in EMQX cluster dashboard.
2. **Restart EMQX Service**:
   ```bash
   kubectl rollout restart deployment/emqx-broker -n itis-production
   ```
3. **Verify Gateway Re-connection**: Confirm active MQTT client connections return to ~50,000 via Grafana dashboard.

---

### Procedure 4: Apache Kafka Broker Restart & Consumer Group Rebalance
**Trigger**: Kafka partition lag > 10,000 messages or broker disk saturation.
1. **Check Consumer Group Lag**:
   ```bash
   kafka-consumer-groups --bootstrap-server kafka.internal.itis.gov.za:9092 --describe --group itis-telematics-ingest-group
   ```
2. **Execute Rolling Restart**:
   ```bash
   kubectl rollout restart statefulset/kafka -n itis-production
   ```

---

### Procedure 5: Point-In-Time Database Recovery (PITR)
**Trigger**: Critical accidental data deletion or corruption.
1. **Identify Target Timestamp**: Determine exact timestamp prior to corruption (e.g., `2026-07-25T01:14:22Z`).
2. **Provision Target Sandbox Instance**:
   ```bash
   gcloud sql instances clone itis-db-prod itis-db-pitr-restore --point-in-time="2026-07-25T01:14:22Z"
   ```
3. **Extract Affected Tables & Re-inject**: Export missing records into primary production database via `pg_dump` and `pg_restore`.

---

### Procedure 6: Certificate Rotation (TLS 1.3 & mTLS)
**Trigger**: Annual expiration OR compromised TLS key.
1. **Trigger Cert-Manager Renewal**:
   ```bash
   cmctl renew wildcard-itis-gov-za-cert -n itis-production
   ```
2. **Reload NGINX Ingress & EMQX Gateway**:
   ```bash
   kubectl rollout restart deployment/nginx-ingress-controller -n itis-production
   ```
