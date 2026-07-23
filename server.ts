import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { correlationIdMiddleware, AuditLogger } from './src/backend/common/audit.logger';
import { checkDatabaseHealth } from './src/backend/database/prisma';
import { authRouter } from './src/backend/auth/auth.controller';
import { learnerRouter } from './src/backend/learners/learner.controller';
import { attendanceRouter, telemetryRouter, incidentRouter, schoolRouter, deviceRouter, eventsStreamRouter } from './src/backend/api.routes';
import { swaggerDocument } from './src/backend/swagger';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global Middlewares
  app.use(express.json());
  app.use(correlationIdMiddleware);

  // Security Headers Simulation
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });

  // REST API Routes
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/learners', learnerRouter);
  app.use('/api/v1/attendance', attendanceRouter);
  app.use('/api/v1/telemetry', telemetryRouter);
  app.use('/api/v1/incidents', incidentRouter);
  app.use('/api/v1/schools', schoolRouter);
  app.use('/api/v1/devices', deviceRouter);
  app.use('/api/v1/events', eventsStreamRouter);

  // OpenAPI Swagger Spec Endpoint
  app.get('/api/v1/docs', (req, res) => {
    res.json(swaggerDocument);
  });

  // System Health Endpoint
  app.get('/api/v1/health', async (req, res) => {
    const dbHealth = await checkDatabaseHealth();
    res.json({
      status: dbHealth.status === 'UP' ? 'HEALTHY' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      version: '1.0.0-rc2',
      database: dbHealth,
      uptimeSeconds: process.uptime()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    AuditLogger.log('INFO', `ITIS Production Backend Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
