export type PartnerCategory =
  | 'GOVERNMENT'
  | 'SCHOOL'
  | 'SCHOLAR_TRANSPORT'
  | 'COMMUNICATION'
  | 'MAPPING'
  | 'IDENTITY'
  | 'CLOUD';

export type ProtocolType = 'REST_API' | 'WEBHOOK' | 'MQTT' | 'GRPC' | 'WEBSOCKET' | 'AMQP' | 'SFTP_BATCH';

export type PartnerStatus = 'CONNECTED' | 'DEGRADED' | 'DISCONNECTED' | 'MAINTENANCE' | 'CERT_EXPIRING';

export interface IntegrationPartner {
  id: string; // e.g. PRT-SAPS-001
  name: string;
  category: PartnerCategory;
  protocol: ProtocolType;
  endpointUrl: string;
  authMethod: 'OAUTH2' | 'MUTUAL_TLS' | 'API_KEY_HMAC' | 'JWT_BEARER';
  status: PartnerStatus;
  latencyMs: number;
  successRatePct: number;
  dailyRequests: number;
  slaTargetPct: number;
  circuitBreakerStatus: 'CLOSED' | 'HALF_OPEN' | 'OPEN';
  certExpiryDays: number;
  jurisdiction: string;
}

export interface WebhookSubscription {
  id: string;
  partnerId: string;
  partnerName: string;
  eventTopic: string; // e.g. incident.created, geofence.breached
  callbackUrl: string;
  status: 'ACTIVE' | 'PAUSED' | 'FAILED';
  deliverySuccessPct: number;
  retryAttempts: number;
}

export interface DeadLetterItem {
  id: string; // e.g. DLQ-10042
  partnerId: string;
  partnerName: string;
  endpoint: string;
  failedAt: string;
  retryCount: number;
  errorMessage: string;
  payloadSummary: string;
  status: 'QUEUED_FOR_RETRY' | 'EXPIRED' | 'MANUAL_DISCARD';
}

export interface EiepgCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Prisma Schema' | 'API Gateway Service' | 'Webhook Engine Service' | 'REST Controller' | 'WebSocket Gateway';
  description: string;
  code: string;
}

// SAMPLE INTEGRATION PARTNERS
export const SAMPLE_PARTNERS: IntegrationPartner[] = [
  {
    id: 'PRT-GOV-SAPS-001',
    name: 'SAPS National Command CAD API',
    category: 'GOVERNMENT',
    protocol: 'REST_API',
    endpointUrl: 'https://cad-gateway.saps.gov.za/v2/incidents',
    authMethod: 'MUTUAL_TLS',
    status: 'CONNECTED',
    latencyMs: 38,
    successRatePct: 99.98,
    dailyRequests: 48200,
    slaTargetPct: 99.99,
    circuitBreakerStatus: 'CLOSED',
    certExpiryDays: 142,
    jurisdiction: 'Republic of South Africa National',
  },
  {
    id: 'PRT-SCH-SASAMS-002',
    name: 'SA-SAMS National School Database Sync',
    category: 'SCHOOL',
    protocol: 'REST_API',
    endpointUrl: 'https://api.sasams.dbe.gov.za/v1/learners',
    authMethod: 'OAUTH2',
    status: 'CONNECTED',
    latencyMs: 64,
    successRatePct: 99.85,
    dailyRequests: 128000,
    slaTargetPct: 99.90,
    circuitBreakerStatus: 'CLOSED',
    certExpiryDays: 88,
    jurisdiction: 'Department of Basic Education',
  },
  {
    id: 'PRT-TRN-FLEET-003',
    name: 'Soweto Scholar Transport Fleet Telematics',
    category: 'SCHOLAR_TRANSPORT',
    protocol: 'MQTT',
    endpointUrl: 'mqtts://telematics.scholarfleet.co.za:8883',
    authMethod: 'API_KEY_HMAC',
    status: 'CONNECTED',
    latencyMs: 18,
    successRatePct: 99.92,
    dailyRequests: 840000,
    slaTargetPct: 99.95,
    circuitBreakerStatus: 'CLOSED',
    certExpiryDays: 210,
    jurisdiction: 'Gauteng Scholar Transport Association',
  },
  {
    id: 'PRT-COM-SMS-004',
    name: 'Infobip Emergency SMS Gateway',
    category: 'COMMUNICATION',
    protocol: 'REST_API',
    endpointUrl: 'https://api.infobip.com/sms/2/text/single',
    authMethod: 'API_KEY_HMAC',
    status: 'CONNECTED',
    latencyMs: 42,
    successRatePct: 99.99,
    dailyRequests: 320000,
    slaTargetPct: 99.99,
    circuitBreakerStatus: 'CLOSED',
    certExpiryDays: 310,
    jurisdiction: 'Pan-African Telecommunications',
  },
  {
    id: 'PRT-MAP-GOOGLE-005',
    name: 'Google Maps Platform & Distance Matrix',
    category: 'MAPPING',
    protocol: 'REST_API',
    endpointUrl: 'https://maps.googleapis.com/maps/api/distancematrix',
    authMethod: 'API_KEY_HMAC',
    status: 'CONNECTED',
    latencyMs: 28,
    successRatePct: 100.0,
    dailyRequests: 1850000,
    slaTargetPct: 99.99,
    circuitBreakerStatus: 'CLOSED',
    certExpiryDays: 365,
    jurisdiction: 'Global Cloud Infrastructure',
  },
  {
    id: 'PRT-GOV-EMS-006',
    name: 'Gauteng Provincial EMS Dispatch (ER24 / Netcare)',
    category: 'GOVERNMENT',
    protocol: 'WEBHOOK',
    endpointUrl: 'https://dispatch.gautengems.gov.za/webhooks/itis',
    authMethod: 'MUTUAL_TLS',
    status: 'DEGRADED',
    latencyMs: 180,
    successRatePct: 97.4,
    dailyRequests: 8400,
    slaTargetPct: 99.9,
    circuitBreakerStatus: 'HALF_OPEN',
    certExpiryDays: 12,
    jurisdiction: 'Gauteng Department of Health',
  },
];

// SAMPLE WEBHOOK SUBSCRIPTIONS
export const SAMPLE_WEBHOOKS: WebhookSubscription[] = [
  {
    id: 'WH-SAPS-001',
    partnerId: 'PRT-GOV-SAPS-001',
    partnerName: 'SAPS National Command CAD API',
    eventTopic: 'incident.critical_emergency',
    callbackUrl: 'https://cad-gateway.saps.gov.za/v2/incidents',
    status: 'ACTIVE',
    deliverySuccessPct: 99.98,
    retryAttempts: 0,
  },
  {
    id: 'WH-SASAMS-002',
    partnerId: 'PRT-SCH-SASAMS-002',
    partnerName: 'SA-SAMS School Sync',
    eventTopic: 'learner.absence_alert',
    callbackUrl: 'https://api.sasams.dbe.gov.za/v1/events',
    status: 'ACTIVE',
    deliverySuccessPct: 99.85,
    retryAttempts: 1,
  },
];

// SAMPLE DEAD LETTER QUEUE ITEMS
export const SAMPLE_DLQ_ITEMS: DeadLetterItem[] = [
  {
    id: 'DLQ-10042',
    partnerId: 'PRT-GOV-EMS-006',
    partnerName: 'Gauteng Provincial EMS Dispatch',
    endpoint: 'https://dispatch.gautengems.gov.za/webhooks/itis',
    failedAt: '2026-07-21 18:34:12',
    retryCount: 5,
    errorMessage: 'HTTP 504 Gateway Timeout on EMS Dispatch Server',
    payloadSummary: 'Incident ITIS-2026-GP-00000045 Dispatch Request Packet',
    status: 'QUEUED_FOR_RETRY',
  },
];

// EIEPG CODE SPECS
export const EIEPG_CODE_SPECS: EiepgCodeSpec[] = [
  {
    id: 1,
    title: 'EIEPG Integration Gateway Prisma Schema',
    filename: 'prisma/schema.prisma',
    category: 'Prisma Schema',
    description: 'Relational database schema storing partner registries, OAuth2 credentials, mutual TLS certificates, API request/response audit logs, rate limit counters, and Dead Letter Queues (DLQ).',
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum PartnerCategory {
  GOVERNMENT
  SCHOOL
  SCHOLAR_TRANSPORT
  COMMUNICATION
  MAPPING
  IDENTITY
  CLOUD
}

enum PartnerStatus {
  CONNECTED
  DEGRADED
  DISCONNECTED
  MAINTENANCE
  CERT_EXPIRING
}

model IntegrationPartner {
  id                    String              @id @default(uuid())
  name                  String
  category              PartnerCategory
  protocol              String              // REST_API, WEBHOOK, MQTT, GRPC
  endpointUrl           String
  authMethod            String              // OAUTH2, MUTUAL_TLS, API_KEY_HMAC
  status                PartnerStatus       @default(CONNECTED)
  latencyMs             Int                 @default(20)
  successRatePct        Float               @default(100.0)
  slaTargetPct          Float               @default(99.99)
  circuitBreakerStatus  String              @default("CLOSED")
  certExpiryDate        DateTime
  jurisdiction          String
  createdAt             DateTime            @default(now())

  webhooks              WebhookSubscription[]
  apiAuditLogs          ApiAuditLog[]
  deadLetterItems       DeadLetterItem[]
}

model WebhookSubscription {
  id                    String              @id @default(uuid())
  partnerId             String
  eventTopic            String              // incident.created, geofence.breached
  callbackUrl           String
  status                String              // ACTIVE, PAUSED, FAILED
  deliverySuccessPct    Float               @default(100.0)

  partner               IntegrationPartner  @relation(fields: [partnerId], references: [id], onDelete: Cascade)
}

model ApiAuditLog {
  id                    String              @id @default(uuid())
  partnerId             String
  requestPath           String
  httpMethod            String
  statusCode            Int
  latencyMs             Int
  timestamp             DateTime            @default(now())

  partner               IntegrationPartner  @relation(fields: [partnerId], references: [id], onDelete: Cascade)
}

model DeadLetterItem {
  id                    String              @id @default(uuid())
  partnerId             String
  errorMessage          String
  retryCount            Int                 @default(0)
  status                String              // QUEUED_FOR_RETRY, EXPIRED
  failedAt              DateTime            @default(now())

  partner               IntegrationPartner  @relation(fields: [partnerId], references: [id], onDelete: Cascade)
}`
  },
  {
    id: 2,
    title: 'EIEPG API Gateway & Circuit Breaker Service',
    filename: 'src/eiepg/services/api-gateway.service.ts',
    category: 'API Gateway Service',
    description: 'Core NestJS API gateway service enforcing mutual TLS, OAuth2 JWT token verification, rate limiting, HMAC request signing, and circuit breaker failovers (<50ms gateway latency).',
    code: `import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface PartnerRequest {
  partnerId: string;
  endpointUrl: string;
  payload: any;
  hmacSecret: string;
}

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);

  // Computes HMAC-SHA256 signature for outbound partner payload integrity
  generateHmacSignature(payload: any, secret: string): string {
    const jsonString = JSON.stringify(payload);
    return crypto.createHmac('sha256', secret).update(jsonString).digest('hex');
  }

  // Executes outbound request with Circuit Breaker pattern
  async dispatchToPartner(req: PartnerRequest) {
    const startTime = Date.now();
    const signature = this.generateHmacSignature(req.payload, req.hmacSecret);

    this.logger.log(\`API GATEWAY DISPATCH: Partner=\${req.partnerId}, URL=\${req.endpointUrl}, HMAC=\${signature.substring(0, 10)}...\`);

    // Simulated Gateway Execution
    const latencyMs = Date.now() - startTime;

    return {
      partnerId: req.partnerId,
      status: 'DELIVERED',
      httpCode: 200,
      latencyMs,
      hmacVerified: true,
      timestamp: new Date().toISOString(),
    };
  }
}`
  },
  {
    id: 3,
    title: 'EIEPG Webhook Engine & DLQ Retry Service',
    filename: 'src/eiepg/services/webhook-engine.service.ts',
    category: 'Webhook Engine Service',
    description: 'Manages asynchronous event webhooks to government (SAPS, DBE), school, and scholar transport systems with exponential backoff retries and Dead Letter Queue (DLQ) routing.',
    code: `import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebhookEngineService {
  private readonly logger = new Logger(WebhookEngineService.name);

  async publishEvent(topic: string, eventData: any) {
    this.logger.log(\`WEBHOOK EVENT BROADCAST: Topic=\${topic}\`);

    // In a real environment, queries active subscriptions for 'topic' and dispatches HTTP POST
    return {
      topic,
      recipientsCount: 4,
      dispatchedAt: new Date().toISOString(),
      status: 'DELIVERED_ALL',
    };
  }

  async retryDlqItem(dlqId: string) {
    this.logger.log(\`RETRYING DEAD LETTER QUEUE ITEM: \${dlqId}\`);
    return {
      dlqId,
      status: 'RETRY_SUCCESSFUL',
      httpCode: 200,
      retryCount: 6,
    };
  }
}`
  },
  {
    id: 4,
    title: 'EIEPG Integration Management REST Controller',
    filename: 'src/eiepg/controllers/integrations.controller.ts',
    category: 'REST Controller',
    description: 'REST API endpoints for partner registry onboarding, health checks, DLQ retry triggers, webhook subscriptions, and certificate rotation.',
    code: `import { Controller, Get, Post, Param, Body } from '@nestjs/common';

@Controller('integrations')
export class IntegrationsController {

  @Get()
  async getAllPartners() {
    return {
      totalPartners: 6,
      healthyCount: 5,
      degradedCount: 1,
      status: 'OPERATIONAL',
    };
  }

  @Post('test/:partnerId')
  async testPartnerConnection(@Param('partnerId') partnerId: string) {
    return {
      partnerId,
      pingLatencyMs: 24,
      status: 'CONNECTED',
      mutualTlsValid: true,
    };
  }

  @Post('dlq/retry')
  async retryDlq(@Body() body: { dlqId: string }) {
    return {
      dlqId: body.dlqId,
      status: 'REPLAYED_SUCCESSFULLY',
      deliveredAt: new Date().toISOString(),
    };
  }
}`
  }
];

// CRITICAL EIEPG MANDATORY RULES
export const CRITICAL_EIEPG_RULES = [
  { id: 1, title: 'Single Point of External Communication', ruleText: 'All incoming and outgoing third-party system integrations pass strictly through the EIEPG API Gateway.', badge: 'SINGLE GATEWAY' },
  { id: 2, title: 'Comprehensive API Request & Response Auditing', ruleText: 'Every request, response payload, HTTP status, and HMAC signature is logged in an append-only audit trail.', badge: 'AUDIT ALL' },
  { id: 3, title: 'No Direct External Database Access', ruleText: 'External partner systems are strictly forbidden from connecting directly to internal PostgreSQL/Firestore DBs.', badge: 'NO DIRECT DB' },
  { id: 4, title: 'Vendor-Neutral Protocol Abstraction', ruleText: 'Supports REST, GraphQL, MQTT, gRPC, and Webhooks through uniform internal connector interfaces.', badge: 'VENDOR NEUTRAL' },
  { id: 5, title: 'Independent Connector Monitoring & Circuit Breakers', ruleText: 'Each partner connector runs isolated health checks and circuit breakers to isolate partner outages.', badge: 'ISOLATED HEALTH' },
  { id: 6, title: 'Failed Integrations Never Block Safety Ops', ruleText: 'If an external partner API fails, local child protection operations continue uninterrupted.', badge: 'ISOLATED FAIL' },
  { id: 7, title: 'Automated Certificate & Secret Rotation', ruleText: 'Mutual TLS certificates and OAuth2 secrets are encrypted with AES-256 and rotated on schedule.', badge: 'AUTO ROTATE' },
  { id: 8, title: 'Graceful Degradation & DLQ Routing', ruleText: 'Failed webhook deliveries route to a Dead Letter Queue (DLQ) for asynchronous exponential backoff retries.', badge: 'DLQ RETRY' },
  { id: 9, title: 'Traceable Origin for Every Event Packet', ruleText: 'Every inbound external packet is authenticated and tagged with partner credentials and source IP.', badge: 'TRACE ORIGIN' },
  { id: 10, title: 'Single Purpose: Secure Ecosystem Extension', ruleText: 'Connects government, schools, transport, and safety partners to protect children everywhere.', badge: 'CHILD PROTECT' },
];
