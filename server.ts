import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { correlationIdMiddleware, AuditLogger } from './src/backend/common/audit.logger';
import { checkDatabaseHealth } from './src/backend/database/prisma';
import { authRouter } from './src/backend/auth/auth.controller';
import { learnerRouter } from './src/backend/learners/learner.controller';
import {
  attendanceRouter,
  telemetryRouter,
  incidentRouter,
  schoolRouter,
  deviceRouter,
  eventsStreamRouter,
  parentRouter,
  notificationRouter,
  executiveRouter,
  auditLogsRouter,
  seedRouter
} from './src/backend/api.routes';
import { setupRouter } from './src/backend/setup/setup.controller';
import { iotRouter } from './src/backend/iot/iot.controller';
import { paymentRouter } from './src/backend/payment/payment.controller';
import { billingRouter } from './src/backend/billing/billing.controller';
import { invoiceRouter } from './src/backend/billing/invoice.controller';
import { communicationsRouter } from './src/backend/communications/communications.controller';
import { emailProviderRouter } from './src/backend/communications/email/email-provider.controller';
import { smsProviderRouter } from './src/backend/communications/sms/sms-provider.controller';
import { pushProviderRouter } from './src/backend/communications/push/push-provider.controller';
import { governmentGatewayRouter } from './src/backend/integrations/government/government-gateway.controller';
import { emisSyncRouter } from './src/backend/integrations/emis/emis-sync.controller';
import { sapsAdapterRouter } from './src/backend/integrations/saps/saps-adapter.controller';
import { sitaGatewayRouter } from './src/backend/integrations/sita/sita-gateway.controller';
import { infrastructureRouter } from './src/backend/infrastructure/infrastructure.controller';
import { operationsRouter } from './src/backend/operations/operations.controller';
import { crmRouter } from './src/backend/crm/crm.controller';
import { supplyChainRouter } from './src/backend/supplychain/supplychain.controller';
import { legalRouter } from './src/backend/legal/legal.controller';
import { releaseCertificationRouter } from './src/backend/release/v1-certification.controller';
import { repositoryHealthRouter } from './src/backend/release/repository-health.controller';
import { infrastructureHealthRouter } from './src/backend/release/infrastructure-health.controller';
import { managedServicesHealthRouter } from './src/backend/release/managed-services-health.controller';
import { internetHealthRouter } from './src/backend/release/internet-health.controller';
import { mobileHealthRouter } from './src/backend/release/mobile-health.controller';
import { deploymentHealthRouter } from './src/backend/release/deployment-health.controller';
import { swaggerDocument } from './src/backend/swagger';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Configure Trust Proxy for NGINX Ingress & Cloudflare Edge
  app.set('trust proxy', true);

  // Global Middlewares
  app.use(express.json());
  app.use(correlationIdMiddleware);

  // Production Security Headers & CORS Middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Correlation-ID');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
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
  app.use('/api/v1/parents', parentRouter);
  app.use('/api/v1/notifications', notificationRouter);
  app.use('/api/v1/executive', executiveRouter);
  app.use('/api/v1/audit-logs', auditLogsRouter);
  app.use('/api/v1/seed', seedRouter);
  app.use('/api/v1/setup', setupRouter);
  app.use('/api/v1/iot', iotRouter);
  app.use('/api/v1/payments', paymentRouter);
  app.use('/api/v1/billing', billingRouter);
  app.use('/api/v1/invoices', invoiceRouter);
  app.use('/api/v1/communications/email', emailProviderRouter);
  app.use('/api/v1/communications/sms', smsProviderRouter);
  app.use('/api/v1/communications/push', pushProviderRouter);
  app.use('/api/v1/communications', communicationsRouter);
  app.use('/api/v1/integrations/government', governmentGatewayRouter);
  app.use('/api/v1/integrations/emis', emisSyncRouter);
  app.use('/api/v1/integrations/saps', sapsAdapterRouter);
  app.use('/api/v1/integrations/sita', sitaGatewayRouter);
  app.use('/api/v1/infrastructure', infrastructureRouter);
  app.use('/api/v1/operations', operationsRouter);
  app.use('/api/v1/crm', crmRouter);
  app.use('/api/v1/supplychain', supplyChainRouter);
  app.use('/api/v1/legal', legalRouter);
  app.use('/api/v1/release/certification', releaseCertificationRouter);
  app.use('/api/v1/release/health', repositoryHealthRouter);
  app.use('/api/v1/release/infrastructure', infrastructureHealthRouter);
  app.use('/api/v1/release/managed-services', managedServicesHealthRouter);
  app.use('/api/v1/release/internet', internetHealthRouter);
  app.use('/api/v1/release/mobile', mobileHealthRouter);
  app.use('/api/v1/release/deployment', deploymentHealthRouter);
  app.use('/api/v1/events', eventsStreamRouter);

  // OpenAPI Swagger Spec Endpoint
  app.get('/api/v1/docs', (req, res) => {
    res.json(swaggerDocument);
  });

  // Root & Standard Health Check Endpoints
  const getHealthStatus = async () => {
    const dbHealth = await checkDatabaseHealth();
    return {
      status: dbHealth.status === 'UP' ? 'HEALTHY' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      version: 'v1.0.0-GA',
      database: dbHealth,
      uptimeSeconds: process.uptime()
    };
  };

  app.get('/health', async (req, res) => {
    const status = await getHealthStatus();
    res.json(status);
  });

  app.get('/api/v1/health', async (req, res) => {
    const status = await getHealthStatus();
    res.json(status);
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
