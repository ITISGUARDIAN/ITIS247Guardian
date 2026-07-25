# Deployment Phase D04 — Part 3: Secrets Inventory & Object Storage Architecture

## Executive Summary

The **ITIS Enterprise Platform** enforces strict DevSecOps secret separation using **HashiCorp Vault / SITA KMS HSM** for dynamic secret injection and **S3 / Google Cloud Storage** with AES-256 GCM KMS encryption for evidence and audit archives.

---

## 1. Production Secrets Inventory (Placeholders Only)

> **CRITICAL RULE**: Real credentials MUST NEVER be stored in source code. Environment variables in `.env.example` map to HashiCorp Vault secrets injected dynamically at container startup via Vault Agent sidecars.

| Category | Environment Variable | Vault Secret Path | Secret Type | Rotation Policy |
| -------- | -------------------- | ----------------- | ----------- | --------------- |
| **Auth** | `JWT_SECRET` | `secret/data/itis/prod/auth#jwt_secret` | RSA-4096 / HMAC | 90 Days |
| **Auth** | `ARGON2_SECRET` | `secret/data/itis/prod/auth#argon2_pepper` | Pepper Key | 365 Days |
| **Auth** | `SITA_SSO_CLIENT_SECRET` | `secret/data/itis/prod/sita_sso#client_secret` | OAuth2 Secret | 180 Days |
| **Database** | `DATABASE_URL` | `database/creds/itis-app-role` | Dynamic PostgreSQL Credential | 30 Days (Dynamic) |
| **Cache** | `REDIS_URL` | `secret/data/itis/prod/redis#password` | Password Token | 180 Days |
| **MQTT** | `MQTT_PASSWORD` | `secret/data/itis/prod/mqtt#service_password` | Token | 180 Days |
| **SMS** | `SITA_SMS_API_KEY` | `secret/data/itis/prod/sms#api_key` | API Key | 180 Days |
| **Storage** | `STORAGE_SECRET_ACCESS_KEY` | `secret/data/itis/prod/storage#secret_key` | HMAC Key | 90 Days |
| **Security** | `SITA_ENCLAVE_HSM_KEY` | `secret/data/itis/prod/kms#hsm_arn` | Hardware KMS Key ARN | Permanent Key |
| **CAD Dispatch** | `SAPS_DISPATCH_API_KEY` | `secret/data/itis/prod/saps#cad_api_key` | Mutual API Key | 90 Days |

---

## 2. Object Storage Bucket Architecture & Lifecycle Policies

Object storage is segregated into 6 dedicated bucket instances with explicit retention policies and automated lifecycle rules:

```
+---------------------------------------------------------------------------------------+
| SITA Cloud Object Storage (S3 / GCS Compatible)                                        |
+------------------------------------+--------------------------------------------------+
| Bucket Name                        | Purpose & Lifecycle Rule                         |
+------------------------------------+--------------------------------------------------+
| 1. itis-evidence-vault-prod        | Dashcam & SOS crash evidence. Retained 7 years.  |
| 2. itis-images-prod                | Pupil profiles, driver licenses, school badges.  |
| 3. itis-firmware-ota-prod          | IoT gateway binaries. Signed RSA-4096.           |
| 4. itis-csv-exports-prod           | Treasury & PFMA export CSVs. Auto-delete 30 days.|
| 5. itis-audit-archives-prod        | WORM audit ledger archives. Retained 10 years.   |
| 6. itis-db-backups-prod            | PostgreSQL WAL & full daily database snapshots.  |
+------------------------------------+--------------------------------------------------+
```

### 2.1 Encryption & Access Control
- **Encryption at Rest**: Enforced `SSE-KMS` using `SITA_ENCLAVE_HSM_KEY`.
- **Public Access**: Strictly disabled (`BlockPublicAccess: True`).
- **Access Pattern**: Application serves files exclusively via short-lived Signed URLs (max expiry 900 seconds).
