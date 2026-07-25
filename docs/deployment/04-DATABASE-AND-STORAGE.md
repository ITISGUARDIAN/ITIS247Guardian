# Deployment Phase D03 — Part 4: Database & Storage Provisioning

## 1. Production Database Architecture (PostgreSQL & TimescaleDB)

```
                            [ Primary Cloud SQL Writer ]
                            (SITA Centurion - Gauteng)
                                         |
               +-------------------------+-------------------------+
               | Synchronous Replication                           | Asynchronous Replication
               v                                                   v
   [ Read Replica 1 (Gauteng) ]                        [ Standby DR Replica (Cape Town) ]
   (Prisma Read Queries & BI)                          (Disaster Recovery RTO < 1s)
```

---

## 2. Database Migration & Schema Management
- **Tooling**: Prisma ORM v7 Schema Migrations (`npx prisma migrate deploy`).
- **Migration Pipeline**:
  1. Migration SQL scripts executed in CI staging test environment against real dataset snapshots.
  2. Non-blocking zero-downtime schema migrations (e.g., adding columns as optional/nullable before enforcing constraints).
  3. Pre-deployment migration dry-run executed via Kubernetes pre-install Job hook (`helm.sh/hook: pre-upgrade`).

---

## 3. High Availability, Connection Pooling & Disaster Recovery

### 3.1 PgBouncer Connection Pooling
- **Instance Count**: 4 PgBouncer pods per database node.
- **Pool Mode**: Transaction pooling.
- **Max Client Connections**: 2,000 application client connections multiplexed into 50 backend server connections per DB replica.

### 3.2 Backup Schedule & Recovery Objectives
- **Full Automated Backups**: Every 24 hours at 01:00 SAST with 30-day rolling retention stored in KMS-encrypted bucket.
- **Write-Ahead Logging (WAL) Archiving**: Continuous WAL streaming every 15 seconds to Cloud Storage.
- **RPO (Recovery Point Objective)**: **0 Seconds** (Zero Data Loss via synchronous commit).
- **RTO (Recovery Time Objective)**: **< 1,000ms** (Automated failover handled by Cloud SQL / Patroni Cluster Manager).
- **Automated Restore Testing**: Weekly automated script (`/infrastructure/dr_backup/rpo-rto-disaster-recovery.sh`) executes full restore to isolated sandbox and verifies checksums.

---

## 4. Object Storage Architecture & Retention Policies

Storage is categorized into 6 distinct isolation tiers with cryptographic access controls and retention lifecycle rules:

| Storage Tier / Category | Access Pattern | Encryption | Retention Policy | Anonymization Rule |
| ----------------------- | -------------- | ---------- | ---------------- | ------------------ |
| **1. Evidence & Dashcam Records** | Read-Heavy, Write-Once | AES-256 GCM KMS | 7 Years (Legal Evidence) | Anonymize pupil faces after 30 days unless flagged for CAD investigation |
| **2. Pupil Biometric Templates** | High-Frequency Read | AES-256 GCM KMS | Active Enrollment Duration | Immediate cryptographic purge upon pupil school graduation / exit |
| **3. Driver & Vehicle Docs (PrDP)** | Periodic Read | AES-256 GCM KMS | 5 Years post-contract | Retained for National Treasury CSD audit compliance |
| **4. IoT Gate Firmware Binaries (OTA)** | Read-Heavy | Signed RSA-4096 | Permanent Archive | Immutable versioning |
| **5. Telemetry CSV/JSON Exports** | On-Demand | AES-256 GCM | 30 Days | Auto-deleted after export download expiry |
| **6. Audit & Financial Logs** | Read-Only WORM | KMS Hardware Vault | 10 Years (PFMA Act) | Immutable Append-Only Ledger |
