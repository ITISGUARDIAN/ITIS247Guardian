import React, { useState } from 'react';
import {
  Database,
  Table,
  FileCode,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Zap,
  RotateCcw,
  Key,
  Lock,
  Workflow,
  Cpu,
  Server,
  Globe,
  FileCheck2,
  AlertOctagon,
  Sparkles,
  Users,
  History
} from 'lucide-react';
import {
  SQL_EXTENSIONS_AND_TYPES,
  FULL_MIGRATION_SQL,
  SEED_DATA_SQL,
  ROLLBACK_SQL,
  SPRINT1_TABLE_SCHEMAS,
  TableSchemaSpec
} from '../data/databaseSprint1Data';

export const DatabaseSprint1: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tables' | 'extensions' | 'migration' | 'seed' | 'rollback' | 'constraints'>('tables');
  const [selectedTable, setSelectedTable] = useState<TableSchemaSpec>(SPRINT1_TABLE_SCHEMAS[0]);
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(label);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center space-x-3 mb-3">
          <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Database className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-400">
            Production Database Layer (Refined Architecture)
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          PostgreSQL + PostGIS + TimescaleDB Enterprise Architecture
        </h2>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-4xl leading-relaxed">
          Production-grade database layer with dedicated <code className="text-emerald-300">users</code> RBAC identity service (separated from parents), immutable device-learner mapping assignment history, partial unique 1:1 active binding constraints, spatial PostGIS indexing, TimescaleDB telemetry hypertables, and SHA-256 evidence ledgers.
        </p>

        {/* Feature Pill Highlights */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dedicated Central Users Identity (RBAC)</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span>Immutable Device Binding History (Never Overwritten)</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>TimescaleDB Hypertable Telemetry</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('tables')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tables'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Schema Tables Inspector ({SPRINT1_TABLE_SCHEMAS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('extensions')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'extensions'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Extensions & ENUMs</span>
          </button>

          <button
            onClick={() => setActiveTab('migration')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'migration'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Migration DDL (V1_0_0)</span>
          </button>

          <button
            onClick={() => setActiveTab('seed')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'seed'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Seed Data Script</span>
          </button>

          <button
            onClick={() => setActiveTab('rollback')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'rollback'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Rollback Script (U1_0_0)</span>
          </button>

          <button
            onClick={() => setActiveTab('constraints')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'constraints'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Architecture & Constraints</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SCHEMA TABLES INSPECTOR */}
      {activeTab === 'tables' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Table Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Sprint 1 Database Tables ({SPRINT1_TABLE_SCHEMAS.length})
            </h3>
            <div className="space-y-2">
              {SPRINT1_TABLE_SCHEMAS.map((tbl) => {
                const isSelected = selectedTable.tableName === tbl.tableName;
                return (
                  <div
                    key={tbl.tableName}
                    onClick={() => setSelectedTable(tbl)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-emerald-400">{tbl.tableName}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {tbl.columns.length} Cols
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{tbl.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Table Detail Inspector */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <Table className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white font-mono">{selectedTable.tableName}</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">{selectedTable.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-950 text-emerald-300 border border-emerald-800">
                  PK: {selectedTable.primaryKey}
                </span>
              </div>
            </div>

            {/* Columns Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                Column Definitions ({selectedTable.columns.length})
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                      <th className="p-2.5 font-bold font-mono">Column</th>
                      <th className="p-2.5 font-bold font-mono">Data Type</th>
                      <th className="p-2.5 font-bold">Nullable</th>
                      <th className="p-2.5 font-bold">Default</th>
                      <th className="p-2.5 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                    {selectedTable.columns.map((col) => (
                      <tr key={col.name} className="hover:bg-slate-800/40">
                        <td className="p-2.5 font-bold text-emerald-300">{col.name}</td>
                        <td className="p-2.5 text-indigo-300">{col.type}</td>
                        <td className="p-2.5">
                          {col.nullable ? (
                            <span className="text-slate-500">YES</span>
                          ) : (
                            <span className="text-amber-400 font-bold">NOT NULL</span>
                          )}
                        </td>
                        <td className="p-2.5 text-slate-400">{col.defaultVal || '-'}</td>
                        <td className="p-2.5 font-sans text-slate-300 text-[11px]">{col.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Constraints & Indexes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Key className="w-4 h-4" />
                  Constraints ({selectedTable.constraints.length})
                </h5>
                <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                  {selectedTable.constraints.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Indexes ({selectedTable.indexes.length})
                </h5>
                <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                  {selectedTable.indexes.map((idx, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{idx}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXTENSIONS & ENUMS */}
      {activeTab === 'extensions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                PostgreSQL Extensions & Domain ENUMs
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Initialization statements for PostGIS, TimescaleDB, uuid-ossp, pgcrypto, and platform ENUMs (including RBAC user roles).
              </p>
            </div>
            <button
              onClick={() => handleCopy(SQL_EXTENSIONS_AND_TYPES, 'extensions')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
            >
              {copiedScript === 'extensions' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript === 'extensions' ? 'Copied SQL!' : 'Copy SQL'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
            {SQL_EXTENSIONS_AND_TYPES}
          </pre>
        </div>
      )}

      {/* TAB 3: MIGRATION DDL */}
      {activeTab === 'migration' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-indigo-400" />
                Flyway Migration Script: V1_0_0__sprint1_initial_schema.sql
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Complete DDL creating all tables, users RBAC identity service, device assignment history stored procedure, spatial PostGIS indexes, Timescale hypertable, and soft-delete views.
              </p>
            </div>
            <button
              onClick={() => handleCopy(FULL_MIGRATION_SQL, 'migration')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
            >
              {copiedScript === 'migration' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript === 'migration' ? 'Copied SQL!' : 'Copy Migration SQL'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed max-h-[600px]">
            {FULL_MIGRATION_SQL}
          </pre>
        </div>
      )}

      {/* TAB 4: SEED DATA */}
      {activeTab === 'seed' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Seed Data Script: V1_0_1__sprint1_seed_data.sql
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Populates production seed records for Schools, System Users (Admin, Operator, School Admin, Responder, Technician, Parent), Parents, Learners, Wearables, Device Mapping History, Geofences, Telemetry, and Active Level 4 SOS Incident.
              </p>
            </div>
            <button
              onClick={() => handleCopy(SEED_DATA_SQL, 'seed')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
            >
              {copiedScript === 'seed' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript === 'seed' ? 'Copied SQL!' : 'Copy Seed SQL'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-amber-200 overflow-x-auto leading-relaxed max-h-[600px]">
            {SEED_DATA_SQL}
          </pre>
        </div>
      )}

      {/* TAB 5: ROLLBACK SCRIPT */}
      {activeTab === 'rollback' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-red-400" />
                Flyway Rollback Script: U1_0_0__sprint1_rollback.sql
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Safely tears down Sprint 1 views, functions, tables, triggers, and types in reverse dependency order.
              </p>
            </div>
            <button
              onClick={() => handleCopy(ROLLBACK_SQL, 'rollback')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
            >
              {copiedScript === 'rollback' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript === 'rollback' ? 'Copied SQL!' : 'Copy Rollback SQL'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-red-300 overflow-x-auto leading-relaxed">
            {ROLLBACK_SQL}
          </pre>
        </div>
      )}

      {/* TAB 6: CONSTRAINTS & ARCHITECTURE */}
      {activeTab === 'constraints' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity & RBAC */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Central RBAC Identity Service (<code className="text-indigo-300 font-mono">users</code>)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authentication is handled by a dedicated <code className="text-indigo-300 font-mono">users</code> table separate from parents. School administrators, command operators, technicians, field responders, and parents all authenticate through role-based access control (<code className="text-indigo-300 font-mono">user_role_enum</code>).
              </p>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-indigo-300">
{`CREATE TYPE user_role_enum AS ENUM (
  'SYSTEM_ADMIN',
  'COMMAND_OPERATOR',
  'SCHOOL_ADMIN',
  'PARENT',
  'FIELD_RESPONDER',
  'TECHNICIAN'
);`}
              </pre>
            </div>

            {/* Permanent Immutable Assignment History */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-amber-400" />
                Immutable Device Binding History
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assignments in <code className="text-amber-300 font-mono">device_learner_mappings</code> are NEVER overwritten. Reassignment deactivates the previous active record (<code className="text-amber-300 font-mono">is_active = FALSE</code>) and inserts a new binding row, preserving a 100% forensic audit trail.
              </p>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300">
{`CREATE OR REPLACE FUNCTION reassign_wearable_device(
    p_device_id UUID, p_new_learner_id UUID, p_assigned_by UUID
) RETURNS UUID AS $$
BEGIN
    UPDATE device_learner_mappings
    SET is_active = FALSE, unassigned_at = NOW()
    WHERE device_id = p_device_id AND is_active = TRUE;

    INSERT INTO device_learner_mappings (...) VALUES (...);
END;
$$ LANGUAGE plpgsql;`}
              </pre>
            </div>

            {/* Partial Unique Indexes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                Strict 1:1 Active Device Binding Guarantee
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Partial unique indexes guarantee that a child can have at most ONE active device, and a device can belong to at most ONE active learner at any given instant:
              </p>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300">
{`CREATE UNIQUE INDEX uq_active_device_binding 
ON device_learner_mappings(device_id) 
WHERE is_active = TRUE;

CREATE UNIQUE INDEX uq_active_learner_binding 
ON device_learner_mappings(learner_id) 
WHERE is_active = TRUE;`}
              </pre>
            </div>

            {/* TimescaleDB Hypertable */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                TimescaleDB Hypertable Telemetry Partitioning
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Raw IoT GPS pings are ingested into the <code className="text-cyan-300 font-mono">telemetry_pings</code> hypertable partitioned on time, delivering sub-millisecond query performance over high-frequency GPS streams:
              </p>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300">
{`SELECT create_hypertable(
  'telemetry_pings', 
  'time', 
  if_not_exists => TRUE
);`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
