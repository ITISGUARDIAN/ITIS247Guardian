export interface SqlScriptSpec {
  id: string;
  filename: string;
  title: string;
  category: 'Schema Migration' | 'Rollback Script' | 'Seed Data' | 'Audit Triggers' | 'Extensions & Types';
  sql: string;
  description: string;
}

export interface TableSchemaSpec {
  tableName: string;
  description: string;
  primaryKey: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    defaultVal?: string;
    references?: string;
    description: string;
  }[];
  constraints: string[];
  indexes: string[];
}

export const SQL_EXTENSIONS_AND_TYPES = `-- ====================================================================
-- SPRINT 1 DATABASE INITIALIZATION: EXTENSIONS & ENUMS
-- System: Integrated Transport & Learner Safety Platform (ITIS)
-- Database Engine: PostgreSQL 16+ with PostGIS & TimescaleDB
-- ====================================================================

-- 1. EXTENSIONS REQUIRED
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "timescaledb" CASCADE;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. DOMAIN ENUM DEFINITIONS
CREATE TYPE user_role_enum AS ENUM (
  'SYSTEM_ADMIN',
  'COMMAND_OPERATOR',
  'SCHOOL_ADMIN',
  'PARENT',
  'FIELD_RESPONDER',
  'TECHNICIAN'
);

CREATE TYPE threat_level_enum AS ENUM (
  'LEVEL_1_GREEN',
  'LEVEL_2_AMBER',
  'LEVEL_3_ORANGE',
  'LEVEL_4_RED'
);

CREATE TYPE device_status_enum AS ENUM (
  'ACTIVE',
  'UNASSIGNED',
  'MAINTENANCE',
  'TAMPERED',
  'DECOMMISSIONED'
);

CREATE TYPE incident_status_enum AS ENUM (
  'ACTIVE',
  'ACKNOWLEDGED',
  'RESPONDER_EN_ROUTE',
  'ON_SCENE',
  'RESOLVED',
  'FALSE_ALARM'
);

CREATE TYPE geofence_type_enum AS ENUM (
  'SCHOOL_GROUNDS',
  'HOME_ZONE',
  'TRANSIT_CORRIDOR',
  'HIGH_RISK_ZONE',
  'SAFE_HAVEN'
);

CREATE TYPE notification_channel_enum AS ENUM (
  'APNS_PUSH',
  'FCM_PUSH',
  'SMS',
  'COMMAND_WALL_WEBSOCKET',
  'VOICE_CALL'
);

-- 3. REUSABLE TRIGGER FUNCTION FOR AUTO-UPDATING updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

export const FULL_MIGRATION_SQL = `-- ====================================================================
-- FLYWAY MIGRATION SCRIPT: V1_0_0__sprint1_initial_schema.sql
-- Integrated Transport & Learner Safety Platform (ITIS)
-- Description: Complete Sprint 1 DDL with Dedicated Users Table (RBAC),
--              Immutable 1:1 Device Assignment History, PostGIS Geofencing,
--              Timescale Telemetry Hypertables, and SHA-256 Audit Trail Ledgers.
-- ====================================================================

BEGIN;

-- --------------------------------------------------------------------
-- 1. SCHOOLS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emis_number VARCHAR(32) NOT NULL UNIQUE,
    school_name VARCHAR(255) NOT NULL,
    province VARCHAR(64) NOT NULL,
    district VARCHAR(128) NOT NULL,
    address TEXT NOT NULL,
    location GEOMETRY(Point, 4326) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(32) NOT NULL,
    principal_name VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_by UUID NULL,
    updated_by UUID NULL
);

CREATE INDEX idx_schools_emis ON schools(emis_number);
CREATE INDEX idx_schools_location ON schools USING GIST(location);

CREATE TRIGGER trg_schools_updated_at
BEFORE UPDATE ON schools
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 2. DEDICATED USERS TABLE (AUTHENTICATION & RBAC IDENTITY SERVICE)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    msisdn_phone VARCHAR(32) NULL UNIQUE,
    role user_role_enum NOT NULL DEFAULT 'PARENT',
    school_id UUID NULL REFERENCES schools(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_by UUID NULL,
    updated_by UUID NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_school ON users(school_id);

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 3. PARENTS TABLE (LINKED TO USER IDENTITY ACCOUNT)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NULL REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    national_id VARCHAR(32) NOT NULL UNIQUE,
    msisdn_phone VARCHAR(32) NOT NULL UNIQUE,
    email VARCHAR(255) NULL,
    fcm_token TEXT NULL,
    address TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_by UUID NULL,
    updated_by UUID NULL
);

CREATE INDEX idx_parents_user ON parents(user_id);
CREATE INDEX idx_parents_phone ON parents(msisdn_phone);
CREATE INDEX idx_parents_national_id ON parents(national_id);

CREATE TRIGGER trg_parents_updated_at
BEFORE UPDATE ON parents
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 4. GPS WEARABLE DEVICES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gps_devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    imei VARCHAR(32) NOT NULL UNIQUE,
    serial_number VARCHAR(64) NOT NULL UNIQUE,
    mtls_cert_fingerprint VARCHAR(128) NOT NULL UNIQUE,
    status device_status_enum NOT NULL DEFAULT 'UNASSIGNED',
    battery_pct INT CHECK (battery_pct BETWEEN 0 AND 100),
    firmware_ver VARCHAR(32) NOT NULL DEFAULT 'v1.0.0',
    last_ping_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_by UUID NULL,
    updated_by UUID NULL
);

CREATE INDEX idx_gps_devices_imei ON gps_devices(imei);
CREATE INDEX idx_gps_devices_status ON gps_devices(status);

CREATE TRIGGER trg_gps_devices_updated_at
BEFORE UPDATE ON gps_devices
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 5. LEARNERS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS learners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emis_learner_id VARCHAR(32) NOT NULL UNIQUE,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    grade VARCHAR(16) NOT NULL,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE RESTRICT,
    parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE RESTRICT,
    blood_type VARCHAR(8) NULL,
    emergency_notes TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_by UUID NULL,
    updated_by UUID NULL
);

CREATE INDEX idx_learners_school ON learners(school_id);
CREATE INDEX idx_learners_parent ON learners(parent_id);
CREATE INDEX idx_learners_emis ON learners(emis_learner_id);

CREATE TRIGGER trg_learners_updated_at
BEFORE UPDATE ON learners
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 6. DEVICE-LEARNER MAPPINGS (IMMUTABLE ASSIGNMENT AUDIT HISTORY)
-- Rule: Never overwrite assignments. Reassignment creates a new record 
--       and deactivates the previous active mapping.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS device_learner_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID NOT NULL REFERENCES gps_devices(id) ON DELETE RESTRICT,
    learner_id UUID NOT NULL REFERENCES learners(id) ON DELETE RESTRICT,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    unassigned_at TIMESTAMPTZ NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    assignment_reason TEXT NULL DEFAULT 'INITIAL_PROVISIONING',
    assigned_by UUID NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_by UUID NULL,
    updated_by UUID NULL
);

-- PARTIAL UNIQUE INDEXES: GUARANTEE AT MOST 1 ACTIVE DEVICE PER LEARNER & 1 ACTIVE LEARNER PER DEVICE
CREATE UNIQUE INDEX uq_active_device_binding ON device_learner_mappings(device_id) WHERE is_active = TRUE;
CREATE UNIQUE INDEX uq_active_learner_binding ON device_learner_mappings(learner_id) WHERE is_active = TRUE;

CREATE INDEX idx_dl_mappings_active ON device_learner_mappings(is_active);
CREATE INDEX idx_dl_mappings_history ON device_learner_mappings(learner_id, assigned_at DESC);

CREATE TRIGGER trg_dl_mappings_updated_at
BEFORE UPDATE ON device_learner_mappings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to safely reassign a device without overwriting history
CREATE OR REPLACE FUNCTION reassign_wearable_device(
    p_device_id UUID,
    p_new_learner_id UUID,
    p_assigned_by UUID,
    p_reason TEXT DEFAULT 'DEVICE_REASSIGNMENT'
) RETURNS UUID AS $$
DECLARE
    v_new_mapping_id UUID;
BEGIN
    -- Deactivate current active mapping for device
    UPDATE device_learner_mappings
    SET is_active = FALSE,
        unassigned_at = NOW(),
        updated_at = NOW()
    WHERE device_id = p_device_id AND is_active = TRUE;

    -- Deactivate current active mapping for new learner (if holding another device)
    UPDATE device_learner_mappings
    SET is_active = FALSE,
        unassigned_at = NOW(),
        updated_at = NOW()
    WHERE learner_id = p_new_learner_id AND is_active = TRUE;

    -- Insert new immutable assignment record
    INSERT INTO device_learner_mappings (
        device_id, learner_id, assigned_at, is_active, assignment_reason, assigned_by
    ) VALUES (
        p_device_id, p_new_learner_id, NOW(), TRUE, p_reason, p_assigned_by
    ) RETURNING id INTO v_new_mapping_id;

    -- Update device operational status
    UPDATE gps_devices SET status = 'ACTIVE', updated_at = NOW() WHERE id = p_device_id;

    RETURN v_new_mapping_id;
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------------------------------
-- 7. GEOFENCES TABLE (POSTGIS POLYGONS & CORRIDORS)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS geofences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(128) NOT NULL,
    type geofence_type_enum NOT NULL,
    school_id UUID NULL REFERENCES schools(id) ON DELETE CASCADE,
    boundary GEOMETRY(Polygon, 4326) NOT NULL,
    buffer_meters INT NOT NULL DEFAULT 50,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_by UUID NULL,
    updated_by UUID NULL
);

CREATE INDEX idx_geofences_boundary ON geofences USING GIST(boundary);
CREATE INDEX idx_geofences_type ON geofences(type);
CREATE INDEX idx_geofences_school ON geofences(school_id);

CREATE TRIGGER trg_geofences_updated_at
BEFORE UPDATE ON geofences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 8. TELEMETRY PINGS TABLE (TIMESCALE HYPERTABLE FOR HIGH-SPEED GPS)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS telemetry_pings (
    time TIMESTAMPTZ NOT NULL,
    device_id UUID NOT NULL REFERENCES gps_devices(id),
    location GEOMETRY(Point, 4326) NOT NULL,
    altitude_m NUMERIC(8,2) NULL,
    speed_kmh NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    heading_deg NUMERIC(5,2) NULL,
    accuracy_m NUMERIC(5,2) NOT NULL DEFAULT 5.00,
    battery_pct INT CHECK (battery_pct BETWEEN 0 AND 100),
    sos_triggered BOOLEAN NOT NULL DEFAULT FALSE,
    threat_score NUMERIC(5,2) NOT NULL DEFAULT 0.00
);

-- CONVERT TO TIMESCALEDB HYPERTABLE PARTITIONED BY TIME
SELECT create_hypertable('telemetry_pings', 'time', if_not_exists => TRUE);

CREATE INDEX idx_telemetry_device_time ON telemetry_pings(device_id, time DESC);
CREATE INDEX idx_telemetry_location ON telemetry_pings USING GIST(location);
CREATE INDEX idx_telemetry_sos ON telemetry_pings(sos_triggered) WHERE sos_triggered = TRUE;

-- --------------------------------------------------------------------
-- 9. INCIDENTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    learner_id UUID NOT NULL REFERENCES learners(id) ON DELETE RESTRICT,
    device_id UUID NOT NULL REFERENCES gps_devices(id) ON DELETE RESTRICT,
    threat_level threat_level_enum NOT NULL DEFAULT 'LEVEL_4_RED',
    trigger_type VARCHAR(64) NOT NULL,
    status incident_status_enum NOT NULL DEFAULT 'ACTIVE',
    last_known_location GEOMETRY(Point, 4326) NOT NULL,
    risk_score NUMERIC(5,2) NOT NULL DEFAULT 95.00,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ NULL,
    forensic_hash VARCHAR(64) NULL,
    operator_notes TEXT NULL,
    assigned_operator_id UUID NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_by UUID NULL,
    updated_by UUID NULL
);

CREATE INDEX idx_incidents_learner ON incidents(learner_id);
CREATE INDEX idx_incidents_status_level ON incidents(status, threat_level);
CREATE INDEX idx_incidents_location ON incidents USING GIST(last_known_location);

CREATE TRIGGER trg_incidents_updated_at
BEFORE UPDATE ON incidents
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 10. EVIDENCE AUDIT LOGS TABLE (EVIDENTIARY HASH SEALED LEDGER)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS evidence_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NULL REFERENCES incidents(id) ON DELETE CASCADE,
    learner_id UUID NULL REFERENCES learners(id) ON DELETE SET NULL,
    device_id UUID NULL REFERENCES gps_devices(id) ON DELETE SET NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_type VARCHAR(64) NOT NULL,
    payload_json JSONB NOT NULL,
    sha256_digest VARCHAR(64) NOT NULL,
    operator_id UUID NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_by UUID NULL,
    updated_by UUID NULL
);

CREATE INDEX idx_evidence_incident ON evidence_audit_logs(incident_id);
CREATE INDEX idx_evidence_digest ON evidence_audit_logs(sha256_digest);

CREATE TRIGGER trg_evidence_updated_at
BEFORE UPDATE ON evidence_audit_logs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------
-- 11. GENERIC TABLE AUDIT LOGS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS table_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(64) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(16) NOT NULL,
    old_data JSONB NULL,
    new_data JSONB NULL,
    performed_by UUID NULL REFERENCES users(id),
    performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_table_audit_ref ON table_audit_logs(table_name, record_id);

-- --------------------------------------------------------------------
-- 12. SOFT DELETE VIEWS (FILTERING deleted_at IS NULL)
-- --------------------------------------------------------------------
CREATE OR REPLACE VIEW v_active_schools AS SELECT * FROM schools WHERE deleted_at IS NULL;
CREATE OR REPLACE VIEW v_active_users AS SELECT * FROM users WHERE deleted_at IS NULL;
CREATE OR REPLACE VIEW v_active_parents AS SELECT * FROM parents WHERE deleted_at IS NULL;
CREATE OR REPLACE VIEW v_active_learners AS SELECT * FROM learners WHERE deleted_at IS NULL;
CREATE OR REPLACE VIEW v_active_gps_devices AS SELECT * FROM gps_devices WHERE deleted_at IS NULL;
CREATE OR REPLACE VIEW v_active_geofences AS SELECT * FROM geofences WHERE deleted_at IS NULL;

COMMIT;
`;

export const SEED_DATA_SQL = `-- ====================================================================
-- SEED DATA SCRIPT: V1_0_1__sprint1_seed_data.sql
-- Integrated Transport & Learner Safety Platform (ITIS)
-- Description: Production-grade seed data initializing schools,
--              users across roles (admins, operators, responders, parents),
--              parents, learners, wearables, assignment history, geofences,
--              telemetry, and active Level 4 SOS incident.
-- ====================================================================

BEGIN;

-- 1. SEED SCHOOLS
INSERT INTO schools (
    id, emis_number, school_name, province, district, address, location, contact_email, contact_phone, principal_name
) VALUES 
('c0a80101-0000-0000-0000-000000000001', 'EMIS-700142991', 'Soweto Central Primary School', 'Gauteng', 'Johannesburg West', '142 Vilakazi St, Orlando West, Soweto', ST_SetSRID(ST_MakePoint(27.9045, -26.2381), 4326), 'admin@sowetoprimary.edu.za', '+27119821000', 'Dr. Thandiwe Mabaso'),
('c0a80101-0000-0000-0000-000000000002', 'EMIS-700142992', 'Pretoria East Academy', 'Gauteng', 'Tshwane South', '88 Lynnwood Rd, Pretoria', ST_SetSRID(ST_MakePoint(28.2721, -25.7545), 4326), 'info@ptaeast.edu.za', '+27123625000', 'Mr. Johan van der Merwe');

-- 2. SEED SYSTEM USERS (RBAC ROLES: ADMIN, OPERATOR, SCHOOL ADMIN, RESPONDER, TECHNICIAN, PARENT)
INSERT INTO users (
    id, email, password_hash, first_name, last_name, msisdn_phone, role, school_id
) VALUES 
('a0a80101-0000-0000-0000-000000000001', 'sysadmin@itis.gov.za', '$2a$12$e0M2/4N1X3Q.vL9r.sSgIeY1aB5cD7e9f1a3b5c7e9f0a2b4c6d8e', 'Kagiso', 'Mokoena', '+27820000001', 'SYSTEM_ADMIN', NULL),
('a0a80101-0000-0000-0000-000000000002', 'operator1@itis.gov.za', '$2a$12$e0M2/4N1X3Q.vL9r.sSgIeY1aB5cD7e9f1a3b5c7e9f0a2b4c6d8e', 'Zanele', 'Ndlovu', '+27820000002', 'COMMAND_OPERATOR', NULL),
('a0a80101-0000-0000-0000-000000000003', 'principal@sowetoprimary.edu.za', '$2a$12$e0M2/4N1X3Q.vL9r.sSgIeY1aB5cD7e9f1a3b5c7e9f0a2b4c6d8e', 'Thandiwe', 'Mabaso', '+27820000003', 'SCHOOL_ADMIN', 'c0a80101-0000-0000-0000-000000000001'),
('a0a80101-0000-0000-0000-000000000004', 'responder1@saps.gov.za', '$2a$12$e0M2/4N1X3Q.vL9r.sSgIeY1aB5cD7e9f1a3b5c7e9f0a2b4c6d8e', 'Sello', 'Zulu', '+27820000004', 'FIELD_RESPONDER', NULL),
('a0a80101-0000-0000-0000-000000000005', 'tech1@wearables.co.za', '$2a$12$e0M2/4N1X3Q.vL9r.sSgIeY1aB5cD7e9f1a3b5c7e9f0a2b4c6d8e', 'David', 'Smith', '+27820000005', 'TECHNICIAN', NULL),
('a0a80101-0000-0000-0000-000000000006', 'sipho.khumalo@itis.gov.za', '$2a$12$e0M2/4N1X3Q.vL9r.sSgIeY1aB5cD7e9f1a3b5c7e9f0a2b4c6d8e', 'Sipho', 'Khumalo', '+27829910014', 'PARENT', NULL),
('a0a80101-0000-0000-0000-000000000007', 'nomsa.dlamini@itis.gov.za', '$2a$12$e0M2/4N1X3Q.vL9r.sSgIeY1aB5cD7e9f1a3b5c7e9f0a2b4c6d8e', 'Nomsa', 'Dlamini', '+27834419982', 'PARENT', NULL);

-- 3. SEED PARENTS (LINKED TO USER IDENTITY)
INSERT INTO parents (
    id, user_id, first_name, last_name, national_id, msisdn_phone, email, fcm_token, address
) VALUES 
('d0a80101-0000-0000-0000-000000000001', 'a0a80101-0000-0000-0000-000000000006', 'Sipho', 'Khumalo', '8204125890082', '+27829910014', 'sipho.khumalo@itis.gov.za', 'fcm_token_test_12345', '45 Diepkloof Zone 3, Soweto'),
('d0a80101-0000-0000-0000-000000000002', 'a0a80101-0000-0000-0000-000000000007', 'Nomsa', 'Dlamini', '8809144800081', '+27834419982', 'nomsa.dlamini@itis.gov.za', 'fcm_token_test_67890', '12 Orlando East, Soweto');

-- 4. SEED GPS WEARABLE DEVICES
INSERT INTO gps_devices (
    id, imei, serial_number, mtls_cert_fingerprint, status, battery_pct, firmware_ver, last_ping_at
) VALUES 
('e0a80101-0000-0000-0000-000000000001', '860491001299812', 'ITIS-WR-2026-001', 'SHA256:a8f9b2c4e6d8f1a3b5c7e9f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0', 'ACTIVE', 94, 'v2.1.0-sec', NOW()),
('e0a80101-0000-0000-0000-000000000002', '860491001299813', 'ITIS-WR-2026-002', 'SHA256:b9f0c3d5e7f9a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b1', 'ACTIVE', 88, 'v2.1.0-sec', NOW());

-- 5. SEED LEARNERS
INSERT INTO learners (
    id, emis_learner_id, first_name, last_name, grade, school_id, parent_id, blood_type, emergency_notes
) VALUES 
('f0a80101-0000-0000-0000-000000000001', 'LRN-2026-001', 'Bontle', 'Khumalo', 'Grade 4', 'c0a80101-0000-0000-0000-000000000001', 'd0a80101-0000-0000-0000-000000000001', 'O+', 'Asthma inhaler in school bag'),
('f0a80101-0000-0000-0000-000000000002', 'LRN-2026-002', 'Lethabo', 'Dlamini', 'Grade 5', 'c0a80101-0000-0000-0000-000000000001', 'd0a80101-0000-0000-0000-000000000002', 'A+', 'Penicillin allergy');

-- 6. PERMANENT IMMUTABLE ASSIGNMENT HISTORY (DEVICE-LEARNER MAPPINGS)
-- Historical Deactivated Mapping (demonstrating audit trail retention)
INSERT INTO device_learner_mappings (
    id, device_id, learner_id, assigned_at, unassigned_at, is_active, assignment_reason, assigned_by
) VALUES 
('10a80101-0000-0000-0000-000000000000', 'e0a80101-0000-0000-0000-000000000001', 'f0a80101-0000-0000-0000-000000000002', NOW() - INTERVAL '60 days', NOW() - INTERVAL '30 days', FALSE, 'TEMPORARY_REPLACEMENT_RETURNED', 'a0a80101-0000-0000-0000-000000000005');

-- Current Active Mappings
INSERT INTO device_learner_mappings (
    id, device_id, learner_id, assigned_at, is_active, assignment_reason, assigned_by
) VALUES 
('10a80101-0000-0000-0000-000000000001', 'e0a80101-0000-0000-0000-000000000001', 'f0a80101-0000-0000-0000-000000000001', NOW() - INTERVAL '30 days', TRUE, 'ANNUAL_DEVICE_ISSUANCE', 'a0a80101-0000-0000-0000-000000000005'),
('10a80101-0000-0000-0000-000000000002', 'e0a80101-0000-0000-0000-000000000002', 'f0a80101-0000-0000-0000-000000000002', NOW() - INTERVAL '15 days', TRUE, 'NEW_LEARNER_REGISTRATION', 'a0a80101-0000-0000-0000-000000000005');

-- 7. SEED SCHOOL GEOFENCE POLYGON
INSERT INTO geofences (
    id, name, type, school_id, boundary, buffer_meters
) VALUES (
    '20a80101-0000-0000-0000-000000000001',
    'Soweto Primary Safe Campus Zone',
    'SCHOOL_GROUNDS',
    'c0a80101-0000-0000-0000-000000000001',
    ST_SetSRID(ST_GeomFromText('POLYGON((27.9030 -26.2370, 27.9060 -26.2370, 27.9060 -26.2390, 27.9030 -26.2390, 27.9030 -26.2370))'), 4326),
    50
);

-- 8. SEED HIGH-FREQUENCY TELEMETRY PINGS (HYPERTABLE)
INSERT INTO telemetry_pings (time, device_id, location, speed_kmh, heading_deg, accuracy_m, battery_pct, sos_triggered, threat_score)
VALUES 
(NOW() - INTERVAL '10 seconds', 'e0a80101-0000-0000-0000-000000000001', ST_SetSRID(ST_MakePoint(27.9046, -26.2382), 4326), 0.0, 180.0, 3.2, 94, FALSE, 0.00),
(NOW() - INTERVAL '5 seconds',  'e0a80101-0000-0000-0000-000000000001', ST_SetSRID(ST_MakePoint(27.9078, -26.2415), 4326), 48.5, 210.0, 2.8, 94, TRUE, 98.50);

-- 9. SEED ACTIVE LEVEL 4 SOS INCIDENT (ASSIGNED TO COMMAND OPERATOR)
INSERT INTO incidents (
    id, learner_id, device_id, threat_level, trigger_type, status, last_known_location, risk_score, started_at, assigned_operator_id, operator_notes
) VALUES (
    '30a80101-0000-0000-0000-000000000001',
    'f0a80101-0000-0000-0000-000000000001',
    'e0a80101-0000-0000-0000-000000000001',
    'LEVEL_4_RED',
    'SOS_BUTTON_HARDWARE_PRESS',
    'ACTIVE',
    ST_SetSRID(ST_MakePoint(27.9078, -26.2415), 4326),
    98.50,
    NOW() - INTERVAL '5 seconds',
    'a0a80101-0000-0000-0000-000000000002',
    'Hardware panic button depressed for 3 seconds. Velocity spike 48.5 km/h outside safe corridor.'
);

-- 10. SEED EVIDENTIARY AUDIT LOG WITH SHA-256 SEAL
INSERT INTO evidence_audit_logs (
    id, incident_id, learner_id, device_id, timestamp, event_type, payload_json, sha256_digest, operator_id
) VALUES (
    '40a80101-0000-0000-0000-000000000001',
    '30a80101-0000-0000-0000-000000000001',
    'f0a80101-0000-0000-0000-000000000001',
    'e0a80101-0000-0000-0000-000000000001',
    NOW() - INTERVAL '5 seconds',
    'INCIDENT_CREATED_LEVEL_4_RED',
    '{"sos": true, "speedKmh": 48.5, "batteryPct": 94, "lat": -26.2415, "lng": 27.9078}',
    '8f3b9e2a4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b1c2d3e4f',
    'a0a80101-0000-0000-0000-000000000002'
);

COMMIT;
`;

export const ROLLBACK_SQL = `-- ====================================================================
-- FLYWAY ROLLBACK SCRIPT: U1_0_0__sprint1_rollback.sql
-- Integrated Transport & Learner Safety Platform (ITIS)
-- Description: Safely undoes Sprint 1 schema migrations in reverse order.
-- ====================================================================

BEGIN;

-- 1. DROP VIEWS
DROP VIEW IF EXISTS v_active_geofences CASCADE;
DROP VIEW IF EXISTS v_active_gps_devices CASCADE;
DROP VIEW IF EXISTS v_active_learners CASCADE;
DROP VIEW IF EXISTS v_active_parents CASCADE;
DROP VIEW IF EXISTS v_active_users CASCADE;
DROP VIEW IF EXISTS v_active_schools CASCADE;

-- 2. DROP REASSIGNMENT HELPER FUNCTION
DROP FUNCTION IF EXISTS reassign_wearable_device CASCADE;

-- 3. DROP TABLES IN REVERSE DEPENDENCY ORDER
DROP TABLE IF EXISTS table_audit_logs CASCADE;
DROP TABLE IF EXISTS evidence_audit_logs CASCADE;
DROP TABLE IF EXISTS incidents CASCADE;
DROP TABLE IF EXISTS telemetry_pings CASCADE;
DROP TABLE IF EXISTS geofences CASCADE;
DROP TABLE IF EXISTS device_learner_mappings CASCADE;
DROP TABLE IF EXISTS learners CASCADE;
DROP TABLE IF EXISTS gps_devices CASCADE;
DROP TABLE IF EXISTS parents CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS schools CASCADE;

-- 4. DROP TRIGGER FUNCTIONS
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- 5. DROP DOMAIN ENUMS
DROP TYPE IF EXISTS notification_channel_enum CASCADE;
DROP TYPE IF EXISTS geofence_type_enum CASCADE;
DROP TYPE IF EXISTS incident_status_enum CASCADE;
DROP TYPE IF EXISTS device_status_enum CASCADE;
DROP TYPE IF EXISTS threat_level_enum CASCADE;
DROP TYPE IF EXISTS user_role_enum CASCADE;

COMMIT;
`;

export const SPRINT1_TABLE_SCHEMAS: TableSchemaSpec[] = [
  {
    tableName: 'users',
    description: 'Central RBAC identity service handling user accounts, authentication credentials, and system access roles across admins, operators, responders, technicians, and parents.',
    primaryKey: 'id (UUID v4)',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, defaultVal: 'uuid_generate_v4()', description: 'Primary Key' },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, description: 'User login email address (UNIQUE)' },
      { name: 'password_hash', type: 'VARCHAR(255)', nullable: false, description: 'Bcrypt / Argon2 hashed password digest' },
      { name: 'first_name', type: 'VARCHAR(128)', nullable: false, description: 'Given name' },
      { name: 'last_name', type: 'VARCHAR(128)', nullable: false, description: 'Surname' },
      { name: 'msisdn_phone', type: 'VARCHAR(32)', nullable: true, description: 'Mobile phone number (UNIQUE)' },
      { name: 'role', type: 'user_role_enum', nullable: false, defaultVal: "'PARENT'", description: 'RBAC Role (SYSTEM_ADMIN, COMMAND_OPERATOR, SCHOOL_ADMIN, PARENT, FIELD_RESPONDER, TECHNICIAN)' },
      { name: 'school_id', type: 'UUID', nullable: true, references: 'schools(id)', description: 'Optional school affiliation for School Administrators' },
      { name: 'is_active', type: 'BOOLEAN', nullable: false, defaultVal: 'TRUE', description: 'Account status flag' },
      { name: 'last_login_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Most recent authentication timestamp' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Auto-updated timestamp' },
      { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Soft delete timestamp' },
      { name: 'created_by', type: 'UUID', nullable: true, description: 'Creator User ID' },
      { name: 'updated_by', type: 'UUID', nullable: true, description: 'Updater User ID' }
    ],
    constraints: ['PRIMARY KEY (id)', 'UNIQUE (email)', 'UNIQUE (msisdn_phone)', 'FK users_school_id -> schools(id)'],
    indexes: ['idx_users_email (B-tree)', 'idx_users_role (B-tree)', 'idx_users_school (B-tree)']
  },
  {
    tableName: 'parents',
    description: 'Parent and legal guardian profile records, optionally linked to a central identity user account.',
    primaryKey: 'id (UUID v4)',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, defaultVal: 'uuid_generate_v4()', description: 'Primary Key' },
      { name: 'user_id', type: 'UUID', nullable: true, references: 'users(id)', description: 'Foreign Key to Central User Identity Account' },
      { name: 'first_name', type: 'VARCHAR(128)', nullable: false, description: 'Given name' },
      { name: 'last_name', type: 'VARCHAR(128)', nullable: false, description: 'Surname' },
      { name: 'national_id', type: 'VARCHAR(32)', nullable: false, description: 'SA National ID or Passport Number (UNIQUE)' },
      { name: 'msisdn_phone', type: 'VARCHAR(32)', nullable: false, description: 'E.164 phone number for push/SMS (UNIQUE)' },
      { name: 'email', type: 'VARCHAR(255)', nullable: true, description: 'Email address' },
      { name: 'fcm_token', type: 'TEXT', nullable: true, description: 'Firebase Cloud Messaging Push Token' },
      { name: 'address', type: 'TEXT', nullable: true, description: 'Home address' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Record creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Auto-updated timestamp' },
      { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Soft delete timestamp' },
      { name: 'created_by', type: 'UUID', nullable: true, description: 'Creator ID' },
      { name: 'updated_by', type: 'UUID', nullable: true, description: 'Updater ID' }
    ],
    constraints: ['PRIMARY KEY (id)', 'UNIQUE (national_id)', 'UNIQUE (msisdn_phone)', 'FK parents_user_id -> users(id)'],
    indexes: ['idx_parents_user (B-tree)', 'idx_parents_phone (B-tree)', 'idx_parents_national_id (B-tree)']
  },
  {
    tableName: 'device_learner_mappings',
    description: 'Immutable 1:1 assignment history table preserving permanent audit trail. Assignments are NEVER overwritten; reassignments deactivate past rows and insert new ones.',
    primaryKey: 'id (UUID v4)',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, defaultVal: 'uuid_generate_v4()', description: 'Primary Key' },
      { name: 'device_id', type: 'UUID', nullable: false, references: 'gps_devices(id)', description: 'Foreign Key to Wearable' },
      { name: 'learner_id', type: 'UUID', nullable: false, references: 'learners(id)', description: 'Foreign Key to Learner' },
      { name: 'assigned_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Binding timestamp' },
      { name: 'unassigned_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Unbinding timestamp (set when deactivated)' },
      { name: 'is_active', type: 'BOOLEAN', nullable: false, defaultVal: 'TRUE', description: 'Active binding flag (ONLY 1 TRUE per device/learner)' },
      { name: 'assignment_reason', type: 'TEXT', nullable: true, defaultVal: "'INITIAL_PROVISIONING'", description: 'Reason for assignment or swap' },
      { name: 'assigned_by', type: 'UUID', nullable: true, references: 'users(id)', description: 'Technician/Admin who authorized assignment' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Updated timestamp' },
      { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Soft delete timestamp' },
      { name: 'created_by', type: 'UUID', nullable: true, description: 'Creator ID' },
      { name: 'updated_by', type: 'UUID', nullable: true, description: 'Updater ID' }
    ],
    constraints: [
      'PRIMARY KEY (id)',
      'UNIQUE Partial Index uq_active_device_binding (device_id) WHERE is_active = TRUE',
      'UNIQUE Partial Index uq_active_learner_binding (learner_id) WHERE is_active = TRUE',
      'FK dl_mappings_assigned_by -> users(id)'
    ],
    indexes: ['uq_active_device_binding (Unique B-tree)', 'uq_active_learner_binding (Unique B-tree)', 'idx_dl_mappings_active (B-tree)', 'idx_dl_mappings_history (Composite B-tree)']
  },
  {
    tableName: 'schools',
    description: 'Registered educational institutions with PostGIS coordinates and EMIS authority identification.',
    primaryKey: 'id (UUID v4)',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, defaultVal: 'uuid_generate_v4()', description: 'Primary Key' },
      { name: 'emis_number', type: 'VARCHAR(32)', nullable: false, description: 'National EMIS School Identifier (UNIQUE)' },
      { name: 'school_name', type: 'VARCHAR(255)', nullable: false, description: 'Full official school name' },
      { name: 'province', type: 'VARCHAR(64)', nullable: false, description: 'South African Province' },
      { name: 'district', type: 'VARCHAR(128)', nullable: false, description: 'Education District' },
      { name: 'address', type: 'TEXT', nullable: false, description: 'Physical postal & street address' },
      { name: 'location', type: 'GEOMETRY(Point, 4326)', nullable: false, description: 'WGS84 GPS coordinate point' },
      { name: 'contact_email', type: 'VARCHAR(255)', nullable: false, description: 'Official school contact email' },
      { name: 'contact_phone', type: 'VARCHAR(32)', nullable: false, description: 'Primary office landline' },
      { name: 'principal_name', type: 'VARCHAR(128)', nullable: false, description: 'Head Principal Full Name' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Record creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Auto-updated trigger timestamp' },
      { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Soft delete timestamp' },
      { name: 'created_by', type: 'UUID', nullable: true, description: 'User ID of creator' },
      { name: 'updated_by', type: 'UUID', nullable: true, description: 'User ID of updater' }
    ],
    constraints: ['PRIMARY KEY (id)', 'UNIQUE (emis_number)'],
    indexes: ['idx_schools_emis (B-tree)', 'idx_schools_location (PostGIS GIST)']
  },
  {
    tableName: 'gps_devices',
    description: 'Physical IoT wearable registry holding hardware IMEI credentials, mTLS certificates, and battery health.',
    primaryKey: 'id (UUID v4)',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, defaultVal: 'uuid_generate_v4()', description: 'Primary Key' },
      { name: 'imei', type: 'VARCHAR(32)', nullable: false, description: 'Hardware IMEI number (UNIQUE)' },
      { name: 'serial_number', type: 'VARCHAR(64)', nullable: false, description: 'Factory Serial Number (UNIQUE)' },
      { name: 'mtls_cert_fingerprint', type: 'VARCHAR(128)', nullable: false, description: 'X.509 SHA-256 certificate fingerprint' },
      { name: 'status', type: 'device_status_enum', nullable: false, defaultVal: "'UNASSIGNED'", description: 'Operational device state' },
      { name: 'battery_pct', type: 'INT', nullable: true, description: 'Battery level 0-100%' },
      { name: 'firmware_ver', type: 'VARCHAR(32)', nullable: false, defaultVal: "'v1.0.0'", description: 'Installed firmware version' },
      { name: 'last_ping_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Most recent telemetry heartbeat' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Updated timestamp' },
      { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Soft delete timestamp' },
      { name: 'created_by', type: 'UUID', nullable: true, description: 'Creator ID' },
      { name: 'updated_by', type: 'UUID', nullable: true, description: 'Updater ID' }
    ],
    constraints: ['PRIMARY KEY (id)', 'UNIQUE (imei)', 'UNIQUE (serial_number)', 'CHECK (battery_pct BETWEEN 0 AND 100)'],
    indexes: ['idx_gps_devices_imei (B-tree)', 'idx_gps_devices_status (B-tree)']
  },
  {
    tableName: 'learners',
    description: 'Child profile referencing school, parent, and active safety wearable device.',
    primaryKey: 'id (UUID v4)',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, defaultVal: 'uuid_generate_v4()', description: 'Primary Key' },
      { name: 'emis_learner_id', type: 'VARCHAR(32)', nullable: false, description: 'School Learner Number (UNIQUE)' },
      { name: 'first_name', type: 'VARCHAR(128)', nullable: false, description: 'First Name' },
      { name: 'last_name', type: 'VARCHAR(128)', nullable: false, description: 'Surname' },
      { name: 'grade', type: 'VARCHAR(16)', nullable: false, description: 'School Grade (e.g. Grade 4)' },
      { name: 'school_id', type: 'UUID', nullable: false, references: 'schools(id)', description: 'Foreign Key to School' },
      { name: 'parent_id', type: 'UUID', nullable: false, references: 'parents(id)', description: 'Foreign Key to Parent' },
      { name: 'blood_type', type: 'VARCHAR(8)', nullable: true, description: 'Medical Blood Group' },
      { name: 'emergency_notes', type: 'TEXT', nullable: true, description: 'Allergies, medical conditions, special care' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Updated timestamp' },
      { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Soft delete timestamp' },
      { name: 'created_by', type: 'UUID', nullable: true, description: 'Creator ID' },
      { name: 'updated_by', type: 'UUID', nullable: true, description: 'Updater ID' }
    ],
    constraints: ['PRIMARY KEY (id)', 'UNIQUE (emis_learner_id)', 'FK learners_school_id -> schools(id)', 'FK learners_parent_id -> parents(id)'],
    indexes: ['idx_learners_school (B-tree)', 'idx_learners_parent (B-tree)', 'idx_learners_emis (B-tree)']
  },
  {
    tableName: 'geofences',
    description: 'PostGIS spatial geometry polygons defining school safe zones, transit corridors, and high-risk areas.',
    primaryKey: 'id (UUID v4)',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, defaultVal: 'uuid_generate_v4()', description: 'Primary Key' },
      { name: 'name', type: 'VARCHAR(128)', nullable: false, description: 'Geofence name' },
      { name: 'type', type: 'geofence_type_enum', nullable: false, description: 'Category (SCHOOL_GROUNDS, TRANSIT_CORRIDOR, etc.)' },
      { name: 'school_id', type: 'UUID', nullable: true, references: 'schools(id)', description: 'Optional school association' },
      { name: 'boundary', type: 'GEOMETRY(Polygon, 4326)', nullable: false, description: 'PostGIS spatial polygon geometry' },
      { name: 'buffer_meters', type: 'INT', nullable: false, defaultVal: '50', description: 'Allowed GPS drift buffer' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Updated timestamp' },
      { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Soft delete timestamp' },
      { name: 'created_by', type: 'UUID', nullable: true, description: 'Creator ID' },
      { name: 'updated_by', type: 'UUID', nullable: true, description: 'Updater ID' }
    ],
    constraints: ['PRIMARY KEY (id)', 'FK geofences_school_id -> schools(id)'],
    indexes: ['idx_geofences_boundary (PostGIS GIST)', 'idx_geofences_type (B-tree)']
  },
  {
    tableName: 'telemetry_pings (TimescaleDB Hypertable)',
    description: 'TimescaleDB hypertable storing high-frequency sub-second GPS telemetry and panic button triggers.',
    primaryKey: 'time (TIMESTAMPTZ), device_id (UUID)',
    columns: [
      { name: 'time', type: 'TIMESTAMPTZ', nullable: false, description: 'Ingestion timestamp clock (Hypertable Partition Key)' },
      { name: 'device_id', type: 'UUID', nullable: false, references: 'gps_devices(id)', description: 'Hardware Device ID' },
      { name: 'location', type: 'GEOMETRY(Point, 4326)', nullable: false, description: 'WGS84 GPS coordinate' },
      { name: 'altitude_m', type: 'NUMERIC(8,2)', nullable: true, description: 'Altitude in meters' },
      { name: 'speed_kmh', type: 'NUMERIC(5,2)', nullable: false, defaultVal: '0.00', description: 'Calculated ground speed km/h' },
      { name: 'heading_deg', type: 'NUMERIC(5,2)', nullable: true, description: 'Compass orientation heading 0-360°' },
      { name: 'accuracy_m', type: 'NUMERIC(5,2)', nullable: false, defaultVal: '5.00', description: 'Horizontal dilution of precision' },
      { name: 'battery_pct', type: 'INT', nullable: true, description: 'Wearable battery status' },
      { name: 'sos_triggered', type: 'BOOLEAN', nullable: false, defaultVal: 'FALSE', description: 'Hardware SOS button flag' },
      { name: 'threat_score', type: 'NUMERIC(5,2)', nullable: false, defaultVal: '0.00', description: 'Child Safety Decision Engine Risk Score' }
    ],
    constraints: ['Partitioned by time (TimescaleDB Hypertable)'],
    indexes: ['idx_telemetry_device_time (Composite B-tree)', 'idx_telemetry_location (PostGIS GIST)', 'idx_telemetry_sos (Partial B-tree)']
  },
  {
    tableName: 'incidents',
    description: 'Emergency incident dockets generated when threat levels reach Level 3 Orange or Level 4 Red.',
    primaryKey: 'id (UUID v4)',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, defaultVal: 'uuid_generate_v4()', description: 'Primary Key' },
      { name: 'learner_id', type: 'UUID', nullable: false, references: 'learners(id)', description: 'Target child ID' },
      { name: 'device_id', type: 'UUID', nullable: false, references: 'gps_devices(id)', description: 'Target wearable ID' },
      { name: 'threat_level', type: 'threat_level_enum', nullable: false, defaultVal: "'LEVEL_4_RED'", description: 'Threat classification' },
      { name: 'trigger_type', type: 'VARCHAR(64)', nullable: false, description: 'Event source (SOS_PRESS, GEOFENCE_EXIT, etc.)' },
      { name: 'status', type: 'incident_status_enum', nullable: false, defaultVal: "'ACTIVE'", description: 'Response pipeline state' },
      { name: 'last_known_location', type: 'GEOMETRY(Point, 4326)', nullable: false, description: 'GPS coordinates at trigger' },
      { name: 'risk_score', type: 'NUMERIC(5,2)', nullable: false, defaultVal: '95.00', description: 'AI decision score' },
      { name: 'started_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Incident start time' },
      { name: 'resolved_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Incident closure time' },
      { name: 'forensic_hash', type: 'VARCHAR(64)', nullable: true, description: 'SHA-256 seal hash digest' },
      { name: 'operator_notes', type: 'TEXT', nullable: true, description: 'Command operator logs' },
      { name: 'assigned_operator_id', type: 'UUID', nullable: true, references: 'users(id)', description: 'Command Operator User ID' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Updated timestamp' },
      { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Soft delete timestamp' },
      { name: 'created_by', type: 'UUID', nullable: true, description: 'Creator ID' },
      { name: 'updated_by', type: 'UUID', nullable: true, description: 'Updater ID' }
    ],
    constraints: ['PRIMARY KEY (id)', 'FK incidents_learner_id -> learners(id)', 'FK incidents_device_id -> gps_devices(id)', 'FK incidents_assigned_operator_id -> users(id)'],
    indexes: ['idx_incidents_learner (B-tree)', 'idx_incidents_status_level (Composite B-tree)', 'idx_incidents_location (PostGIS GIST)']
  },
  {
    tableName: 'evidence_audit_logs',
    description: 'Cryptographically sealed audit trail ledger capturing every raw telemetry ping, notification, and operator keypress for court disclosure.',
    primaryKey: 'id (UUID v4)',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, defaultVal: 'uuid_generate_v4()', description: 'Primary Key' },
      { name: 'incident_id', type: 'UUID', nullable: true, references: 'incidents(id)', description: 'Associated incident ID' },
      { name: 'learner_id', type: 'UUID', nullable: true, references: 'learners(id)', description: 'Associated learner ID' },
      { name: 'device_id', type: 'UUID', nullable: true, references: 'gps_devices(id)', description: 'Associated device ID' },
      { name: 'timestamp', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Event clock' },
      { name: 'event_type', type: 'VARCHAR(64)', nullable: false, description: 'Audit action code' },
      { name: 'payload_json', type: 'JSONB', nullable: false, description: 'Full immutable JSON state' },
      { name: 'sha256_digest', type: 'VARCHAR(64)', nullable: false, description: 'SHA-256 merkle digest hash' },
      { name: 'operator_id', type: 'UUID', nullable: true, references: 'users(id)', description: 'Operator User ID' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', nullable: false, defaultVal: 'NOW()', description: 'Updated timestamp' },
      { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Soft delete timestamp' },
      { name: 'created_by', type: 'UUID', nullable: true, description: 'Creator ID' },
      { name: 'updated_by', type: 'UUID', nullable: true, description: 'Updater ID' }
    ],
    constraints: ['PRIMARY KEY (id)', 'FK evidence_incident_id -> incidents(id)', 'FK evidence_operator_id -> users(id)'],
    indexes: ['idx_evidence_incident (B-tree)', 'idx_evidence_digest (B-tree)']
  }
];
