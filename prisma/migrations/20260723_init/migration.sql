-- ITIS Production PostgreSQL Initial Schema Migration (Prompt 066)
-- Target: PostgreSQL 16 + PostGIS + TimescaleDB

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE "Role" AS ENUM (
  'SYSTEM_ADMIN', 'NATIONAL_ADMIN', 'PROVINCIAL_ADMIN', 'COMMAND_OPERATOR',
  'SCHOOL_ADMIN', 'TEACHER', 'PARENT', 'DEVICE_TECHNICIAN', 'RESPONDER', 'AUDITOR'
);

CREATE TYPE "IncidentSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'SOS_PANIC');
CREATE TYPE "IncidentStatus" AS ENUM ('OPEN', 'DISPATCHED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');

-- Users Table
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "passwordHash" VARCHAR(255) NOT NULL,
  "firstName" VARCHAR(100) NOT NULL,
  "lastName" VARCHAR(100) NOT NULL,
  "idNumber" VARCHAR(20) UNIQUE,
  "phoneNumber" VARCHAR(30),
  "mfaEnabled" BOOLEAN DEFAULT false,
  "mfaSecret" VARCHAR(255),
  "role" "Role" NOT NULL DEFAULT 'PARENT',
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Parents Table
CREATE TABLE "parents" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID UNIQUE NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "address" TEXT,
  "emergencyPhone" VARCHAR(30) NOT NULL,
  "rsaIdVerified" BOOLEAN DEFAULT false
);

-- Schools Table
CREATE TABLE "schools" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "emisCode" VARCHAR(50) UNIQUE NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "province" VARCHAR(100) NOT NULL,
  "district" VARCHAR(100) NOT NULL,
  "circuit" VARCHAR(100),
  "latitude" DOUBLE PRECISION NOT NULL,
  "longitude" DOUBLE PRECISION NOT NULL,
  "principalName" VARCHAR(100),
  "contactPhone" VARCHAR(30) NOT NULL,
  "contactEmail" VARCHAR(255) NOT NULL
);

-- Wearables Table
CREATE TABLE "wearables" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "serialNumber" VARCHAR(100) UNIQUE NOT NULL,
  "imei" VARCHAR(50) UNIQUE NOT NULL,
  "bleMac" VARCHAR(50) NOT NULL,
  "batteryLevel" INT DEFAULT 100,
  "firmwareVersion" VARCHAR(50) DEFAULT '2.4.1',
  "status" VARCHAR(50) DEFAULT 'ACTIVE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Learners Table
CREATE TABLE "learners" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "schoolId" UUID NOT NULL REFERENCES "schools"("id"),
  "parentId" UUID NOT NULL REFERENCES "parents"("id"),
  "firstName" VARCHAR(100) NOT NULL,
  "lastName" VARCHAR(100) NOT NULL,
  "nationalId" VARCHAR(30) UNIQUE NOT NULL,
  "grade" VARCHAR(20) NOT NULL,
  "classSection" VARCHAR(20) NOT NULL,
  "medicalNotes" TEXT,
  "wearableId" UUID UNIQUE REFERENCES "wearables"("id") ON DELETE SET NULL
);

-- Telemetry Table (TimescaleDB Hypertable ready)
CREATE TABLE "telemetry" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "learnerId" UUID NOT NULL REFERENCES "learners"("id") ON DELETE CASCADE,
  "latitude" DOUBLE PRECISION NOT NULL,
  "longitude" DOUBLE PRECISION NOT NULL,
  "speedKmh" DOUBLE PRECISION DEFAULT 0.0,
  "heartRateBpm" INT DEFAULT 72,
  "batteryPercent" INT DEFAULT 95,
  "sosActive" BOOLEAN DEFAULT false,
  "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_telemetry_learner_time" ON "telemetry"("learnerId", "timestamp" DESC);

-- SOS Incidents Table
CREATE TABLE "sos_incidents" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "incidentNumber" VARCHAR(100) UNIQUE NOT NULL,
  "learnerId" UUID NOT NULL REFERENCES "learners"("id"),
  "latitude" DOUBLE PRECISION NOT NULL,
  "longitude" DOUBLE PRECISION NOT NULL,
  "severity" "IncidentSeverity" NOT NULL DEFAULT 'SOS_PANIC',
  "status" "IncidentStatus" NOT NULL DEFAULT 'OPEN',
  "description" TEXT,
  "dispatchedTo" VARCHAR(255),
  "resolvedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Attendance Table
CREATE TABLE "attendance" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "learnerId" UUID NOT NULL REFERENCES "learners"("id"),
  "schoolId" UUID NOT NULL REFERENCES "schools"("id"),
  "date" DATE NOT NULL,
  "status" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
  "nfcCheckInTime" TIMESTAMP(3),
  "nfcCheckOutTime" TIMESTAMP(3),
  CONSTRAINT "unique_learner_daily_attendance" UNIQUE ("learnerId", "date")
);

-- Audit Logs Table
CREATE TABLE "audit_logs" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID REFERENCES "users"("id") ON DELETE SET NULL,
  "action" VARCHAR(100) NOT NULL,
  "resource" VARCHAR(100) NOT NULL,
  "ipAddress" VARCHAR(50),
  "correlationId" VARCHAR(100) NOT NULL,
  "metadata" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sessions & Refresh Tokens
CREATE TABLE "sessions" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "token" TEXT UNIQUE NOT NULL,
  "ipAddress" VARCHAR(50),
  "userAgent" TEXT,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "refresh_tokens" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "tokenHash" VARCHAR(255) UNIQUE NOT NULL,
  "isRevoked" BOOLEAN DEFAULT false,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
