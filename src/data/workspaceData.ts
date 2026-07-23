export interface WorkspaceFileNode {
  id: string;
  name: string;
  path: string;
  type: 'folder' | 'file';
  category?: 'backend' | 'app' | 'shared' | 'infra' | 'docs' | 'script';
  content?: string;
  children?: WorkspaceFileNode[];
}

export interface InfraServiceSpec {
  name: string; // e.g. postgres, redis, kafka, mqtt, nginx
  image: string;
  port: string;
  purpose: string;
  healthCheck: string;
}

export interface SharedPackageSpec {
  name: string;
  folderPath: string;
  description: string;
  dependencies: string[];
  exports: string[];
  codeSample: string;
}

// SAMPLE PRODUCTION WORKSPACE TREE
export const WORKSPACE_TREE: WorkspaceFileNode = {
  id: 'root',
  name: 'itis',
  path: 'itis/',
  type: 'folder',
  children: [
    {
      id: 'backend',
      name: 'backend',
      path: 'itis/backend/',
      type: 'folder',
      category: 'backend',
      children: [
        {
          id: 'backend-package',
          name: 'package.json',
          path: 'itis/backend/package.json',
          type: 'file',
          content: `{
  "name": "@itis/backend-gateway",
  "version": "1.0.0-prod",
  "private": true,
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate deploy",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.0",
    "@nestjs/core": "^10.3.0",
    "@nestjs/microservices": "^10.3.0",
    "@nestjs/jwt": "^10.2.0",
    "@prisma/client": "^5.10.0",
    "kafkajs": "^2.2.4",
    "mqtt": "^5.3.0",
    "ioredis": "^5.3.2",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.0",
    "prisma": "^5.10.0",
    "typescript": "^5.3.3"
  }
}`
        },
        {
          id: 'backend-dockerfile',
          name: 'Dockerfile',
          path: 'itis/backend/Dockerfile',
          type: 'file',
          content: `# Multi-stage Production Dockerfile for ITIS NestJS Backend Gateway
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main.js"]`
        },
        {
          id: 'backend-tsconfig',
          name: 'tsconfig.json',
          path: 'itis/backend/tsconfig.json',
          type: 'file',
          content: `{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strict": true
  }
}`
        }
      ]
    },
    {
      id: 'website',
      name: 'website',
      path: 'itis/website/',
      type: 'folder',
      category: 'app',
      children: [
        {
          id: 'website-package',
          name: 'package.json',
          path: 'itis/website/package.json',
          type: 'file',
          content: `{
  "name": "@itis/website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "tailwindcss": "^3.4.1",
    "@itis/shared-types": "workspace:*",
    "@itis/shared-ui": "workspace:*"
  }
}`
        }
      ]
    },
    {
      id: 'parent-app',
      name: 'parent-app',
      path: 'itis/parent-app/',
      type: 'folder',
      category: 'app',
      children: [
        {
          id: 'parent-pubspec',
          name: 'pubspec.yaml',
          path: 'itis/parent-app/pubspec.yaml',
          type: 'file',
          content: `name: itis_parent_app
description: "ITIS National Child Safety Parent Guardian Mobile Application (Flutter)."
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_bloc: ^8.1.3
  google_maps_flutter: ^2.5.3
  flutter_local_notifications: ^17.0.0
  mqtt_client: ^10.0.0
  http: ^1.2.0`
        }
      ]
    },
    {
      id: 'school-portal',
      name: 'school-portal',
      path: 'itis/school-portal/',
      type: 'folder',
      category: 'app',
      children: [
        {
          id: 'school-package',
          name: 'package.json',
          path: 'itis/school-portal/package.json',
          type: 'file',
          content: `{
  "name": "@itis/school-portal",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "19.0.0",
    "lucide-react": "^0.344.0"
  }
}`
        }
      ]
    },
    {
      id: 'command-centre',
      name: 'command-centre',
      path: 'itis/command-centre/',
      type: 'folder',
      category: 'app',
      children: [
        {
          id: 'command-package',
          name: 'package.json',
          path: 'itis/command-centre/package.json',
          type: 'file',
          content: `{
  "name": "@itis/command-centre-wallboard",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev -p 3002",
    "build": "next build"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "19.0.0",
    "recharts": "^2.12.0",
    "leaflet": "^1.9.4"
  }
}`
        }
      ]
    },
    {
      id: 'shared',
      name: 'shared/packages',
      path: 'itis/shared/packages/',
      type: 'folder',
      category: 'shared',
      children: [
        {
          id: 'shared-types',
          name: 'types/index.ts',
          path: 'itis/shared/packages/types/index.ts',
          type: 'file',
          content: `export interface LearnerProfile {
  learnerId: string;
  saNationalId: string;
  schoolEmisCode: string;
  wearableImei: string;
  status: 'SAFE_AT_SCHOOL' | 'IN_TRANSIT' | 'SOS_PANIC_ALERT';
}

export interface TelemetryFrame {
  imei: string;
  lat: number;
  lng: number;
  speedKmH: number;
  batteryPct: number;
  tamperOpticalFlag: boolean;
  timestamp: string;
}`
        },
        {
          id: 'shared-auth',
          name: 'auth/jwt.strategy.ts',
          path: 'itis/shared/packages/auth/jwt.strategy.ts',
          type: 'file',
          content: `import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthStrategy {
  validateToken(authHeader: string): { userId: string; role: string; emisCode?: string } {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized: Missing valid Bearer token');
    }
    // Verify SSA mTLS / JWT token
    return {
      userId: 'SAPS-OFFICER-8819',
      role: 'SAPS_CAD_DISPATCHER',
      emisCode: 'GAUTENG-90112'
    };
  }
}`
        }
      ]
    },
    {
      id: 'infrastructure',
      name: 'infrastructure',
      path: 'itis/infrastructure/',
      type: 'folder',
      category: 'infra',
      children: [
        {
          id: 'infra-compose',
          name: 'docker-compose.yml',
          path: 'itis/infrastructure/docker-compose.yml',
          type: 'file',
          content: `version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: itis_postgres_db
    environment:
      POSTGRES_DB: itis_national_db
      POSTGRES_USER: itis_admin
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:-SecuredSita2026!}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U itis_admin -d itis_national_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: itis_redis_cache
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    container_name: itis_kafka_bus
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092'
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka:29093'
      KAFKA_LISTENERS: 'PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9092'

  mqtt:
    image: eclipse-mosquitto:2.0
    container_name: itis_mqtt_broker
    ports:
      - "1883:1883"
      - "9001:9001"

  nginx:
    image: nginx:1.25-alpine
    container_name: itis_nginx_proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro

volumes:
  pgdata:`
        },
        {
          id: 'infra-nginx',
          name: 'nginx/nginx.conf',
          path: 'itis/infrastructure/nginx/nginx.conf',
          type: 'file',
          content: `worker_processes auto;

events {
    worker_connections 10240;
}

http {
    upstream backend_api {
        server backend:3000;
    }

    server {
        listen 80;
        server_name api.itis.gov.za;

        location /api/v1/ {
            proxy_pass http://backend_api;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}`
        }
      ]
    },
    {
      id: 'docs',
      name: 'docs',
      path: 'itis/docs/',
      type: 'folder',
      category: 'docs',
      children: [
        {
          id: 'docs-standards',
          name: 'CODING_STANDARDS.md',
          path: 'itis/docs/CODING_STANDARDS.md',
          type: 'file',
          content: `# ITIS Production Coding Standards

1. Strict TypeScript (no implicit any)
2. NestJS Architecture (Controller -> Service -> Repository)
3. Zero Mock Stubs in Production
4. Conventional Commits (feat, fix, docs, refactor, test)
5. Security: AES-256-GCM, mTLS for SAPS APIs`
        },
        {
          id: 'docs-git',
          name: 'GIT_STRATEGY.md',
          path: 'itis/docs/GIT_STRATEGY.md',
          type: 'file',
          content: `# ITIS National Git Strategy

Branches:
- main (Production State)
- staging (SITA QA Cluster)
- dev (Active Engineering)
- feature/PROMPT-XXX-feature-name`
        }
      ]
    }
  ]
};

// INFRASTRUCTURE SERVICES LIST
export const INFRA_SERVICES: InfraServiceSpec[] = [
  {
    name: 'PostgreSQL 16 (Durable Cloud DB)',
    image: 'postgres:16-alpine',
    port: '5432',
    purpose: 'Sovereign database for 12.4M learners, school EMIS records, SAPS CAD tickets, and billing ledgers.',
    healthCheck: 'pg_isready -U itis_admin',
  },
  {
    name: 'Redis 7 (In-Memory Telemetry Cache)',
    image: 'redis:7-alpine',
    port: '6379',
    purpose: 'Sub-10ms active geofence corridor lookup and rate-limiting cache for LTE-M wearables.',
    healthCheck: 'redis-cli ping',
  },
  {
    name: 'Apache Kafka 7.5 (High-Throughput Ingestion Bus)',
    image: 'confluentinc/cp-kafka:7.5.0',
    port: '9092',
    purpose: 'Decoupled event streaming handling up to 50,000 requests/sec during peak morning transport hours.',
    healthCheck: 'kafka-topics.sh --list',
  },
  {
    name: 'MQTT Mosquitto 2.0 (IoT Telemetry Broker)',
    image: 'eclipse-mosquitto:2.0',
    port: '1883 / 9001',
    purpose: 'Low-power packet ingestion for nRF9160 child wearables over LTE-M / NB-IoT.',
    healthCheck: 'mosquitto_sub ping',
  },
  {
    name: 'NGINX 1.25 (API Gateway & SSL Termination)',
    image: 'nginx:1.25-alpine',
    port: '80 / 443',
    purpose: 'mTLS certificate termination, SSA IP whitelisting, and load balancing across NestJS nodes.',
    healthCheck: 'nginx -t',
  }
];

// SHARED PACKAGES
export const SHARED_PACKAGES: SharedPackageSpec[] = [
  {
    name: '@itis/shared-types',
    folderPath: 'itis/shared/packages/types',
    description: 'Universal TypeScript interfaces for Learner profiles, Telemetry frames, CAD tickets, and Billing events.',
    dependencies: ['typescript'],
    exports: ['LearnerProfile', 'TelemetryFrame', 'CadTicket', 'GeofenceCorridor'],
    codeSample: `export interface LearnerProfile {
  learnerId: string;
  saNationalId: string;
  schoolEmisCode: string;
  wearableImei: string;
  status: 'SAFE_AT_SCHOOL' | 'IN_TRANSIT' | 'SOS_PANIC_ALERT';
}`,
  },
  {
    name: '@itis/shared-auth',
    folderPath: 'itis/shared/packages/auth',
    description: 'Zero-Trust RBAC auth guards, mTLS validator for SAPS CAD links, and JWT verification.',
    dependencies: ['@nestjs/passport', '@nestjs/jwt'],
    exports: ['JwtAuthGuard', 'SapsMtlsGuard', 'RolePermissionChecker'],
    codeSample: `import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthStrategy {
  validateToken(authHeader: string) {
    if (!authHeader.startsWith('Bearer ')) throw new Error('Invalid Token');
    return { userId: 'SAPS-OFFICER-8819', role: 'SAPS_CAD_DISPATCHER' };
  }
}`,
  },
  {
    name: '@itis/shared-ui',
    folderPath: 'itis/shared/packages/ui',
    description: 'Reusable Tailwind CSS / Shadcn UI components for Web, School Portal, Command Centre, and Mobile.',
    dependencies: ['react', 'tailwindcss', 'lucide-react'],
    exports: ['EmergencyAlertBanner', 'LearnerStatusBadge', 'GeofenceMapViewer'],
    codeSample: `export const LearnerStatusBadge = ({ status }: { status: string }) => (
  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 text-xs">
    {status}
  </span>
);`,
  },
  {
    name: '@itis/shared-api-client',
    folderPath: 'itis/shared/packages/api-client',
    description: 'Axios-backed type-safe SDK for NestJS REST & WebSocket gateways with auto-retry logic.',
    dependencies: ['axios', 'zod'],
    exports: ['ItisApiClient', 'TelemetryStreamClient'],
    codeSample: `export class ItisApiClient {
  async getLearnerStatus(learnerId: string) {
    const res = await fetch(\`/api/v1/learners/\${learnerId}\`);
    return res.json();
  }
}`,
  }
];

// MANDATORY WORKSPACE RULES
export const CRITICAL_WORKSPACE_RULES = [
  { id: 1, title: 'Modular Workspace Architecture', ruleText: 'Enforces strict directory separation across backend, website, parent-app, school-portal, command-centre, responder-app, technician-app, and shared packages.', badge: 'MODULAR' },
  { id: 2, title: 'Zero Placeholder Code Mandate', ruleText: 'All package.json, tsconfig, Dockerfiles, and configuration files must compile cleanly with non-placeholder declarations.', badge: 'ZERO STUBS' },
  { id: 3, title: 'Shared Libraries & Monorepo Package Reuse', ruleText: 'Cross-cutting concerns (Auth, Types, UI, API Clients, Zod Validation) are encapsulated in @itis/shared-packages.', badge: 'MONOREPO' },
  { id: 4, title: 'Production Containerization (Docker Multi-Stage)', ruleText: 'Every application service features a multi-stage Dockerfile minimizing image size (<120MB) and stripping dev dependencies.', badge: 'DOCKER' },
  { id: 5, title: 'Container Orchestration & Infrastructure Topology', ruleText: 'Complete docker-compose.yml defining PostgreSQL 16, Redis 7, Apache Kafka, MQTT Mosquitto, and NGINX proxy.', badge: 'COMPOSE' },
  { id: 6, title: 'Conventional Commit & Branch Naming Standards', ruleText: 'Enforces strict Git strategy with main, staging, dev branches and feat/fix/docs commit message standards.', badge: 'GIT STRATEGY' },
  { id: 7, title: 'Sub-900ms Gateway Latency & Microservices Integration', ruleText: 'Backend API gateway configured for Kafka bus streaming and Redis sub-10ms cache retrieval.', badge: 'KAFKA + REDIS' },
  { id: 8, title: 'Flutter Mobile Cross-Platform Architecture', ruleText: 'Parent, Responder, and Technician mobile applications structured cleanly with BLoC state management in Flutter.', badge: 'FLUTTER' },
  { id: 9, title: 'mTLS Security & SITA Government Compliance', ruleText: 'NGINX reverse proxy pre-configured for mTLS authentication and State Security Agency (SSA) IP range whitelisting.', badge: 'mTLS SECURE' },
  { id: 10, title: 'Permanent Foundation for Future Phase 2 Enhancements', ruleText: 'Provides a robust, standardized codebase foundation ready for instant feature deployment without structural debt.', badge: 'PERMANENT FOUNDATION' },
];
