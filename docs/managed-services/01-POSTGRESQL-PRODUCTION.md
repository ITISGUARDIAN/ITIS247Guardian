# Deployment Phase D04 — Part 1: PostgreSQL Production Configuration & Operations

## Executive Summary

The **ITIS Enterprise Platform** relies on a high-availability **Cloud SQL PostgreSQL 16 + PostGIS** database architecture with **PgBouncer** connection pooling, synchronous failover replication across SITA Data Centers (Centurion & Pietermaritzburg), and continuous Write-Ahead Logging (WAL) archiving.

---

## 1. Production Database Connection & PgBouncer Configuration

### 1.1 SSL & Security Enforcement
- **Enforced Protocol**: `sslmode=require` with TLS 1.3 client certificate verification (`sslrootcert=/etc/ssl/certs/sita-ca.crt`).
- **Cleartext Prohibition**: Plaintext TCP/5432 connections are rejected at the firewall and PostgreSQL parameter layer (`ssl = on`).

### 1.2 Connection Pooling (PgBouncer)
To support 100+ application pods and 50,000 telemetry IoT brokers without exhausting PostgreSQL backend worker threads, PgBouncer operates in **Transaction Pooling Mode**:

```ini
; /etc/pgbouncer/pgbouncer.ini
[databases]
itis_db = host=postgres.internal.itis.gov.za port=5432 dbname=itis_db pool_size=50 reserve_pool=10

[pgbouncer]
listen_addr = *
listen_port = 6432
auth_type = scram-sha-256
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 2500
default_pool_size = 50
min_pool_size = 10
reserve_pool_size = 10
reserve_pool_timeout = 5
max_db_connections = 100
server_idle_timeout = 60
query_timeout = 30
```

---

## 2. Replication Topology & High Availability

```
                          [ Primary Writer (Centurion DC) ]
                                         |
               +-------------------------+-------------------------+
               | Synchronous Replication                           | Asynchronous Streaming
               v                                                   v
   [ Local Read Replica (Centurion) ]                     [ Standby DR Replica (Cape Town) ]
   (Prisma Read Queries & BI)                             (RTO < 840ms, RPO = 0s)
```

- **Synchronous Standby**: Guarantees zero data loss (`synchronous_commit = on`).
- **Automatic Failover**: Handled by Cloud SQL High Availability / Patroni Cluster Manager with automated VIP floating re-assignment in < 840ms.

---

## 3. Migration Workflow & Zero-Downtime Policy

1. **Pre-Deployment Dry Run**: CI pipeline executes `npx prisma migrate diff` against a copy of the production schema to detect non-additive breaking changes.
2. **Additive-First Rule**: New columns MUST be added as `NULLABLE` or with default values before application code updates.
3. **Execution**: Automated Kubernetes pre-install Job executes `npx prisma migrate deploy` using isolated DDL migration credentials.
4. **Post-Migration Audit**: Schema hash verified against `/prisma/schema.prisma`.

---

## 4. Backup Strategy & Point-in-Time Recovery (PITR)

- **Full Daily Snapshots**: Executed automatically at 01:00 SAST every night. Retained for 30 days in KMS-encrypted bucket `itis-db-backups-prod`.
- **WAL Archiving**: Continuous WAL segment archiving shipped every 15 seconds to Cloud Storage. Enables **Point-in-Time Recovery (PITR)** down to the exact second.
- **Weekly Automated Restore Verification**: Every Sunday at 03:00 SAST, an automated script restores the latest snapshot into a transient sandbox and executes Prisma integrity checksum tests.

---

## 5. Automated Database Maintenance Schedule

| Maintenance Task | Frequency | Schedule (SAST) | Execution Mechanism | Impact |
| ---------------- | --------- | --------------- | ------------------- | ------ |
| **Vacuum Analyze** | Daily | 02:00 SAST | Automated `autovacuum` daemon | None (Online) |
| **PostGIS Spatial Index Reindex** | Weekly | Sun 02:30 SAST | Scheduled Cron Job `REINDEX TABLE CONCURRENTLY` | None (Online) |
| **Table Bloat Compaction** | Monthly | 1st Sun 03:00 SAST | `pg_repack` concurrently | None (Online) |
| **Major Engine Patching** | Quarterly | Scheduled Maintenance Window | SITA DevSecOps Change Window | Zero Downtime Failover |
