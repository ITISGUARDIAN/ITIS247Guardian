# Deployment Phase D03 — Part 5: Observability, Metrics & Incident Escalation

## Executive Summary

The **ITIS Observability Stack** combines Prometheus metrics collection, Grafana dashboards, OpenTelemetry distributed tracing, structured JSON logging, and automated PagerDuty/SAPS incident escalation runbooks to maintain **99.99% operational availability**.

---

## 1. Application & Infrastructure Metrics

### 1.1 Key Performance Indicators (KPIs)
- **API Request Latency (p95)**: Target `< 45ms` across all REST endpoints.
- **WebSocket Message Throughput**: 85,000 telemetry pings/sec processed with zero drop rate.
- **Database Query Latency (p99)**: Target `< 12ms` for PostGIS spatial lookup queries.
- **Error Rate**: Target `< 0.01%` 5xx HTTP responses.

### 1.2 Prometheus Metrics Exporters
- `/api/v1/release/health/overview`: Serves Prometheus counter and gauge metrics on port `9090`.
- **Node Exporter**: System CPU, Memory, Disk IO, Network Bandwidth.
- **cAdvisor**: Container pod level memory/CPU throttling metrics.
- **EMQX Exporter**: MQTT active connections, published/received messages, broker queue depth.

---

## 2. Health Check Probes & OpenTelemetry Tracing

### 2.1 Kubernetes Probes
- **Liveness Probe**: `GET /api/v1/health/liveness` (Fails if Express event loop is blocked > 5 seconds).
- **Readiness Probe**: `GET /api/v1/health/readiness` (Fails if PostgreSQL or Redis connection is broken).

### 2.2 Distributed Tracing
- **Framework**: OpenTelemetry SDK (`@opentelemetry/sdk-node`).
- **Trace Propagation**: W3C Trace Context headers (`traceparent`) passed seamlessly across API Gateway -> Express Controllers -> Prisma Database -> MQTT Gateway.

---

## 3. Alert Thresholds & Escalation Runbook

| Severity Level | Trigger Condition | Notification Channel | Response SLA | Action Required |
| -------------- | ----------------- | -------------------- | ------------ | --------------- |
| **CRITICAL (P1)** | Active Bus SOS Panic Event Triggered | SAPS CAD + C3 Operator Push + Phone Alert | **< 30 Seconds** | Automatic CAD Dispatch & SAPS GPS Route Broadcast |
| **CRITICAL (P1)** | API Error Rate > 1% for 2 mins OR DB Failover | PagerDuty On-Call DevSecOps Lead | **< 5 Minutes** | Trigger SRE Runbook; verify DB auto-failover |
| **MAJOR (P2)** | CPU / Memory Utilization > 85% for 5 mins | Slack `#itis-alerts-major` + Email | **< 15 Minutes** | Verify Kubernetes Horizontal Pod Autoscaler (HPA) |
| **WARNING (P3)** | Disk Usage > 75% on Logs Volume | Jira Ticket + Slack `#itis-devops` | **< 2 Hours** | Run automated log rotation / Loki compaction |
| **INFO (P4)** | New Application Release Promotion | Slack `#itis-deployments` | N/A | Log release entry in CHANGELOG.md |
