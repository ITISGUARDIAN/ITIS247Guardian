# Deployment Phase D07 — Part 2: Database Connection Pooling & Real-Time Event Streaming

## Executive Summary

The **ITIS Enterprise Platform** utilizes Prisma ORM connected to PostgreSQL 16 with TimescaleDB extensions for high-frequency telematics ingestion. The server manages connection pooling, automatic startup migrations, health probes, and real-time Server-Sent Events (SSE) and WebSocket upgrades.

---

## 1. Database Connection Pooling & Reconnect Architecture

```
 [ Express API Server ] ---> [ PgBouncer Connection Pooler ] ---> [ PostgreSQL / TimescaleDB Master ]
                             (Max Connections: 100)               (SSL Mode: Require)
```

### 1.1 Connection Settings (`prisma.ts`)
- **Connection URI**: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}?connection_limit=20&pool_timeout=10`
- **Automatic Reconnect**: Exponential backoff reconnection loop up to 5 retries on transient network disconnects.
- **Startup Migrations**: Executes `npx prisma migrate deploy` during Docker container initialization prior to binding port 3000.

---

## 2. Real-Time WebSocket & Server-Sent Events (SSE) Engine

### 2.1 Event Streaming Endpoints
- **SSE Stream (`/api/v1/events/sse`)**: Delivers real-time emergency SOS alerts, driver fatigue warnings, and pupil tap-in events directly to Command Centre dashboards.
- **Heartbeat Interval**: 15-second heartbeat ping (`:keep-alive\n\n`) keeps connections active through NGINX and Cloudflare proxy layers.
- **Automatic Client Reconnect**: EventSource client automatically reconnects with `Last-Event-ID` header resume support.

```typescript
// /src/backend/api.routes.ts Event Stream Snippet
eventsStreamRouter.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const timer = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: 'HEARTBEAT', timestamp: new Date().toISOString() })}\n\n`);
  }, 15000);

  req.on('close', () => clearInterval(timer));
});
```
