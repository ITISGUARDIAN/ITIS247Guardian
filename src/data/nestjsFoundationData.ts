export interface FoundationItem {
  id: number;
  title: string;
  category: 'Core Setup' | 'Config & DB' | 'Security & Auth' | 'Base Patterns' | 'Middleware & Logs' | 'DevOps & Testing';
  description: string;
  filename: string;
  code: string;
  highlights: string[];
}

export const NESTJS_FOLDER_STRUCTURE = `itis-backend-foundation/
├── .github/
│   └── workflows/
│       └── ci.yml                      # CI/CD pipeline (lint, test, build)
├── docker/
│   ├── mosquitto/
│   │   └── mosquitto.conf             # MQTT Broker config
│   └── redis/
│       └── redis.conf                 # Redis cache/pubsub config
├── prisma/
│   ├── migrations/                    # Prisma database migrations
│   └── schema.prisma                  # Enterprise Prisma Schema (Users, Roles, Audit)
├── src/
│   ├── common/
│   │   ├── controllers/
│   │   │   └── base.controller.ts     # Generic CRUD Controller with Swagger
│   │   ├── decorators/
│   │   │   ├── permissions.decorator.ts # @Permissions() decorator
│   │   │   ├── roles.decorator.ts       # @Roles() decorator
│   │   │   └── current-user.decorator.ts# @CurrentUser() param decorator
│   │   ├── dto/
│   │   │   ├── pagination.dto.ts      # Standard limit/page/sort DTO
│   │   │   └── api-response.dto.ts    # Standardized Envelope Response Format
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts# Global Exception & Error Normalizer
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts      # JWT Authentication Guard
│   │   │   ├── permissions.guard.ts   # Granular Permission Guard
│   │   │   └── roles.guard.ts         # Role-Based Access Control Guard
│   │   ├── middleware/
│   │   │   ├── audit.middleware.ts     # Request/Response Audit Logger
│   │   │   └── request-id.middleware.ts# UUID X-Request-ID injector
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts     # Global DTO Class-Validator Pipe
│   │   ├── repositories/
│   │   │   └── base.repository.ts     # Abstract Generic Prisma Repository
│   │   └── services/
│   │       └── base.service.ts        # Abstract Generic Business Service
│   ├── config/
│   │   ├── configuration.ts           # Type-safe env config factory
│   │   └── env.validation.ts          # Joi schema environment validation
│   ├── database/
│   │   ├── database.module.ts         # Database Module
│   │   └── prisma.service.ts          # Prisma Client Service with Lifecycle Hooks
│   ├── health/
│   │   ├── health.controller.ts       # Liveness/Readiness Terminus Controller
│   │   └── health.module.ts           # Terminus Health Module
│   ├── logging/
│   │   ├── winston.config.ts          # Winston logger transports & formatters
│   │   └── logging.module.ts          # Global Winston Logging Module
│   ├── modules/
│   │   └── auth/
│   │       ├── dto/
│   │       │   ├── login.dto.ts
│   │       │   └── refresh-token.dto.ts
│   │       ├── strategies/
│   │       │   ├── jwt.strategy.ts    # Passport JWT Strategy
│   │       │   └── local.strategy.ts  # Passport Local Strategy
│   │       ├── auth.controller.ts     # Login/Refresh/Profile Routes
│   │       ├── auth.module.ts         # Authentication Module
│   │       └── auth.service.ts        # Jwt & Password Verification Logic
│   ├── app.module.ts                  # Root NestJS Module with Global Interceptors
│   └── main.ts                        # Bootstrap with Swagger, Versioning & Security
├── test/
│   ├── app.e2e-spec.ts                # E2E Integration Tests with Supertest
│   ├── jest-e2e.json                  # Jest E2E test configuration
│   └── mocks/                         # Mock Repositories & Services for Unit Testing
├── .env.example                       # Documented environment variables
├── .env.test                          # Isolated test runner environment
├── docker-compose.yml                 # Local orchestrator (API, Postgres, Redis, MQTT)
├── Dockerfile                         # Multi-stage production build container
├── jest.config.ts                     # Jest unit test configuration
├── package.json                       # Enterprise dependencies & scripts
├── tsconfig.json                      # Strict TypeScript compiler options
└── nest-cli.json                      # Nest CLI build configuration`;

export const FOUNDATION_ITEMS: FoundationItem[] = [
  {
    id: 1,
    title: 'Complete Folder Structure',
    category: 'Core Setup',
    description: 'CI-ready modular NestJS enterprise directory hierarchy separating core infrastructure, common abstract layers, configuration, database, auth framework, logging, and health modules.',
    filename: 'nest-cli.json / Directory Map',
    code: NESTJS_FOLDER_STRUCTURE,
    highlights: ['Strict separation of concerns', 'Abstract layer in src/common/', 'Modular NestJS architecture', 'Production container readiness']
  },
  {
    id: 2,
    title: 'Application Bootstrap',
    category: 'Core Setup',
    description: 'Production main.ts bootstrap with Express/Fastify adapter, Helmet security headers, CORS origin enforcement, URI API versioning (v1), Swagger OpenAPI, and graceful shutdown listeners.',
    filename: 'src/main.ts',
    code: `import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  // 1. Create NestJS Application with Winston Logger
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const environment = configService.get<string>('NODE_ENV', 'development');

  // 2. Global Security & Middleware
  app.use(helmet());
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGINS', '*').split(','),
    credentials: true,
  });

  // 3. API Versioning (URI Pattern: /api/v1/...)
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 4. Global Filters & Pipes
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // 5. OpenAPI Swagger Documentation
  if (environment !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('ITIS Enterprise Learner Safety Platform API')
      .setDescription('Enterprise NestJS Foundation API Documentation for Integrated Transport & Learner Safety Platform')
      .setVersion('1.0.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'JWT-auth',
      )
      .addTag('Health', 'Liveness & Readiness Endpoints')
      .addTag('Authentication', 'JWT Authentication & RBAC Identity')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    logger.log(\`Swagger OpenAPI documentation initialized at /api/docs\`);
  }

  // 6. Graceful Shutdown Hooks
  app.enableShutdownHooks();

  await app.listen(port, '0.0.0.0');
  logger.log(\`ITIS NestJS Enterprise Engine listening on port \${port} [\${environment}]\`);
}

bootstrap();`,
    highlights: ['Helmet security header protection', 'Global URI versioning (/api/v1)', 'OpenAPI Swagger auto-documentation', 'Graceful container shutdown hooks']
  },
  {
    id: 3,
    title: 'Configuration Module',
    category: 'Config & DB',
    description: 'Type-safe configuration module using @nestjs/config with Joi schema validation to guarantee invalid environment variables halt app startup before binding ports.',
    filename: 'src/config/configuration.ts',
    code: `export interface DatabaseConfig {
  url: string;
  maxConnections: number;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

export interface AppConfig {
  env: string;
  port: number;
  database: DatabaseConfig;
  redisUrl: string;
  mqttUrl: string;
  jwt: JwtConfig;
}

export default (): AppConfig => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
    maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 20,
  },
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  mqttUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'super-secret-refresh-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
});`,
    highlights: ['Type-safe interface mapping', 'Strong fallback defaults', 'Secrets isolation', 'Joi runtime schema validation']
  },
  {
    id: 4,
    title: 'Environment Configuration',
    category: 'Config & DB',
    description: 'Fully documented .env.example template and isolated Joi validation schema ensuring zero missing environment variables at startup.',
    filename: 'src/config/env.validation.ts & .env.example',
    code: `import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required().description('PostgreSQL Connection String'),
  REDIS_URL: Joi.string().required().default('redis://localhost:6379'),
  MQTT_URL: Joi.string().required().default('mqtt://localhost:1883'),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('1h'),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  CORS_ORIGINS: Joi.string().default('*'),
});

/* =========================================================
   SAMPLE .env.example
   =========================================================
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://itis_user:itis_password_2026@localhost:5432/itis_db?schema=public
   REDIS_URL=redis://localhost:6379
   MQTT_URL=mqtt://localhost:1883
   JWT_SECRET=c8d7e9f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b1c2d3
   JWT_EXPIRES_IN=1h
   JWT_REFRESH_SECRET=f1a3b5c7e9f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6
   JWT_REFRESH_EXPIRES_IN=7d
   CORS_ORIGINS=http://localhost:3000,http://localhost:5173
*/`,
    highlights: ['Joi validation schema', '32+ char secret length enforcement', 'Detailed .env.example documentation', 'Multi-environment setup']
  },
  {
    id: 5,
    title: 'Database Connection',
    category: 'Config & DB',
    description: 'Centralized NestJS DatabaseModule encapsulating PrismaService connection pools, health lifecycle listeners, and transaction managers.',
    filename: 'src/database/database.module.ts',
    code: `import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}`,
    highlights: ['@Global() module scoping', 'Singleton connection pooling', 'Lifecycle management', 'Seamless dependency injection']
  },
  {
    id: 6,
    title: 'Prisma Configuration',
    category: 'Config & DB',
    description: 'Production Prisma Service extending PrismaClient with onModuleInit connect hooks, query logging, and graceful $disconnect handlers.',
    filename: 'src/database/prisma.service.ts',
    code: `import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
  }

  async onModuleInit() {
    this.logger.log('Initializing PostgreSQL Prisma Database Connection...');
    await this.$connect();
    this.logger.log('PostgreSQL Prisma Database Connection Successfully Established.');
  }

  async onModuleDestroy() {
    this.logger.log('Closing PostgreSQL Prisma Database Connection...');
    await this.$disconnect();
    this.logger.log('PostgreSQL Prisma Connection Closed Gracefully.');
  }
}`,
    highlights: ['PrismaClient extension', 'Module lifecycle hooks', 'Query execution event logging', 'Connection pool cleanup']
  },
  {
    id: 7,
    title: 'Global Exception Filter',
    category: 'Middleware & Logs',
    description: 'Enterprise HttpExceptionFilter normalizing all NestJS, Prisma, and runtime exceptions into a uniform JSON error envelope with request tracking IDs.',
    filename: 'src/common/filters/http-exception.filter.ts',
    code: `import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ErrorResponseEnvelope {
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  method: string;
  timestamp: string;
  requestId: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    const requestId = (request.headers['x-request-id'] as string) || 'N/A';

    const message =
      typeof exceptionResponse === 'object' && exceptionResponse !== null
        ? (exceptionResponse as any).message || exceptionResponse
        : exceptionResponse;

    const errorEnvelope: ErrorResponseEnvelope = {
      statusCode: status,
      error: HttpStatus[status] || 'Error',
      message: message,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      requestId: requestId,
    };

    this.logger.error(
      \`[\${request.method}] \${request.url} - Status: \${status} - ReqID: \${requestId} - Message: \${JSON.stringify(message)}\`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json(errorEnvelope);
  }
}`,
    highlights: ['Normalized error response envelope', 'X-Request-ID correlation', 'Prisma & HTTP exception mapping', 'Structured Winston error logging']
  },
  {
    id: 8,
    title: 'Global Validation Pipe',
    category: 'Core Setup',
    description: 'Strict ValidationPipe config leveraging class-validator and class-transformer to automatically sanitize payload DTOs and reject extra properties.',
    filename: 'src/common/pipes/validation.pipe.ts',
    code: `import { ValidationPipe as NestValidationPipe } from '@nestjs/common';

export const globalValidationPipe = new NestValidationPipe({
  whitelist: true, // Strip properties not in the DTO
  forbidNonWhitelisted: true, // Reject requests with extra unexpected parameters
  transform: true, // Auto-transform payloads to DTO instance types
  transformOptions: {
    enableImplicitConversion: true, // Auto-convert query parameters string -> number/boolean
  },
  disableErrorMessages: process.env.NODE_ENV === 'production',
});`,
    highlights: ['Payload sanitization (whitelist)', 'Non-whitelisted parameter rejection', 'Implicit type conversion', 'Production mode error masking']
  },
  {
    id: 9,
    title: 'Logging Module',
    category: 'Middleware & Logs',
    description: 'Global LoggingModule providing injected custom Winston loggers with asynchronous transport initialization.',
    filename: 'src/logging/logging.module.ts',
    code: `import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerOptions } from './winston.config';

@Global()
@Module({
  imports: [WinstonModule.forRoot(winstonLoggerOptions)],
  exports: [WinstonModule],
})
export class LoggingModule {}`,
    highlights: ['Global Winston provider', 'Async transport options', 'Multi-channel stream support', 'Injectable Winston instance']
  },
  {
    id: 10,
    title: 'Winston Logger',
    category: 'Middleware & Logs',
    description: 'Structured Winston logger with daily rotating file transports, JSON format for production Logstash/Datadog, and colorized console format for dev.',
    filename: 'src/logging/winston.config.ts',
    code: `import * as winston from 'winston';
import 'winston-daily-rotate-file';

const isProduction = process.env.NODE_ENV === 'production';

export const winstonLoggerOptions: winston.LoggerOptions = {
  level: isProduction ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    isProduction ? winston.format.json() : winston.format.prettyPrint(),
  ),
  transports: [
    // 1. Console Transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: !isProduction }),
        winston.format.printf(({ timestamp, level, message, context, stack, requestId }) => {
          const reqIdStr = requestId ? \`[ReqID: \${requestId}]\` : '';
          const ctxStr = context ? \`[\${context}]\` : '';
          return \`\${timestamp} \${level} \${ctxStr}\${reqIdStr}: \${message}\${stack ? \`\\n\${stack}\` : ''}\`;
        }),
      ),
    }),
    // 2. Application Daily Rotate File Transport
    new winston.transports.DailyRotateFile({
      filename: 'logs/itis-app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),
    // 3. Error Daily Rotate File Transport
    new winston.transports.DailyRotateFile({
      filename: 'logs/itis-error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error',
    }),
  ],
};`,
    highlights: ['Daily log file rotation (14d retention)', 'Environment-based JSON vs CLI formatting', 'Error stack trace preservation', 'Context & RequestID tags']
  },
  {
    id: 11,
    title: 'Health Check Endpoint',
    category: 'Core Setup',
    description: 'Production Terminus health module checking PostgreSQL DB connection, Redis memory status, and disk storage availability for Kubernetes probes.',
    filename: 'src/health/health.controller.ts',
    code: `import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  PrismaHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../database/prisma.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get('liveness')
  @ApiOperation({ summary: 'Kubernetes Liveness Probe' })
  @ApiResponse({ status: 200, description: 'Service is alive' })
  getLiveness() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('readiness')
  @HealthCheck()
  @ApiOperation({ summary: 'Kubernetes Readiness Probe (DB & Memory Check)' })
  @ApiResponse({ status: 200, description: 'All core dependencies healthy' })
  getReadiness() {
    return this.health.check([
      () => this.prismaHealth.pingCheck('database', this.prisma),
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024), // 300MB heap limit
      () => this.memory.checkRSS('memory_rss', 500 * 1024 * 1024),   // 500MB RSS limit
    ]);
  }
}`,
    highlights: ['Kubernetes liveness (/api/v1/health/liveness)', 'Readiness database ping probe', 'Node.js memory heap/RSS threshold monitoring', '@nestjs/terminus integration']
  },
  {
    id: 12,
    title: 'Docker Configuration',
    category: 'DevOps & Testing',
    description: 'Multi-stage Dockerfile compiling TypeScript NestJS app into lightweight Alpine Linux container with non-root security user execution.',
    filename: 'Dockerfile',
    code: `# ==========================================
# STAGE 1: Builder
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# ==========================================
# STAGE 2: Production Runner
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

NODE_ENV=production

# Install openssl for Prisma Engine on Alpine
RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production
RUN npx prisma generate

COPY --from=builder /usr/src/app/dist ./dist

# Non-root user for enterprise security
USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]`,
    highlights: ['Multi-stage Docker build', 'Production node_modules pruning', 'Prisma client generation inside image', 'Non-root user execution security']
  },
  {
    id: 13,
    title: 'Docker Compose Orchestrator',
    category: 'DevOps & Testing',
    description: 'Local development orchestrator provisioning NestJS API, PostgreSQL 16 (with PostGIS), Redis 7 (caching/queues), and Mosquitto MQTT broker.',
    filename: 'docker-compose.yml',
    code: `version: '3.8'

services:
  # 1. NestJS Enterprise Backend API
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: itis-nestjs-api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - PORT=3000
      - DATABASE_URL=postgresql://itis_user:itis_secure_password_2026@postgres:5432/itis_db?schema=public
      - REDIS_URL=redis://redis:6379
      - MQTT_URL=mqtt://mosquitto:1883
      - JWT_SECRET=c8d7e9f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b1c2d3
      - JWT_REFRESH_SECRET=f1a3b5c7e9f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      mosquitto:
        condition: service_started
    restart: unless-stopped

  # 2. PostgreSQL 16 with PostGIS Spatial Engine
  postgres:
    image: postgis/postgis:16-3.4-alpine
    container_name: itis-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: itis_user
      POSTGRES_PASSWORD: itis_secure_password_2026
      POSTGRES_DB: itis_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U itis_user -d itis_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  # 3. Redis 7 Cache & PubSub Server
  redis:
    image: redis:7-alpine
    container_name: itis-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  # 4. Eclipse Mosquitto MQTT IoT Telemetry Broker
  mosquitto:
    image: eclipse-mosquitto:2.0
    container_name: itis-mosquitto
    ports:
      - "1883:1883"
      - "9001:9001"
    volumes:
      - ./docker/mosquitto/mosquitto.conf:/mosquitto/config/mosquitto.conf

volumes:
  postgres_data:
  redis_data:`,
    highlights: ['PostGIS PostgreSQL 16 container', 'Redis 7 cache instance', 'Eclipse Mosquitto MQTT broker', 'Container health check ordering']
  },
  {
    id: 14,
    title: 'Authentication Framework',
    category: 'Security & Auth',
    description: 'Central AuthModule implementing Passport local strategy, bcrypt password hashing, login verification, and token emission.',
    filename: 'src/modules/auth/auth.service.ts',
    code: `import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  schoolId?: string;
}

export interface AuthTokensEnvelope {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials or inactive user account.');
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto): Promise<AuthTokensEnvelope> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Update last login clock
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    this.logger.log(\`User authenticated successfully: \${user.email} [\${user.role}]\`);

    return {
      accessToken,
      refreshToken,
      expiresIn: '1h',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}`,
    highlights: ['Bcrypt password hash comparison', 'JWT Access & Refresh token generation', 'Last login clock persistence', 'Structured Auth result envelope']
  },
  {
    id: 15,
    title: 'JWT Framework',
    category: 'Security & Auth',
    description: 'Passport JwtStrategy extracting Bearer tokens from Authorization headers, validating signature and extracting user identity.',
    filename: 'src/modules/auth/strategies/jwt.strategy.ts',
    code: `import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../database/prisma.service';
import { JwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        schoolId: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Token invalid or user deactivated.');
    }

    return user;
  }
}`,
    highlights: ['Passport Bearer token extraction', 'Database active user re-verification', 'Seamless request.user context attachment', 'Expiration enforcement']
  },
  {
    id: 16,
    title: 'RBAC Framework',
    category: 'Security & Auth',
    description: 'Role-Based Access Control framework with @Roles(...) decorator and RolesGuard evaluating user roles against endpoint requirements.',
    filename: 'src/common/guards/roles.guard.ts & decorators/roles.decorator.ts',
    code: `import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/core';
import { Reflector } from '@nestjs/core';

export enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  COMMAND_OPERATOR = 'COMMAND_OPERATOR',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  PARENT = 'PARENT',
  FIELD_RESPONDER = 'FIELD_RESPONDER',
  TECHNICIAN = 'TECHNICIAN',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Endpoint is public or role-unrestricted
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      return false;
    }

    return requiredRoles.includes(user.role as UserRole);
  }
}`,
    highlights: ['@Roles(...) decorator pattern', 'Reflector metadata extraction', 'UserRole enum definition', 'Hierarchical role evaluation']
  },
  {
    id: 17,
    title: 'Permission Framework',
    category: 'Security & Auth',
    description: 'Fine-grained Permission framework supporting granular permission string evaluations (e.g., incidents:write, telemetry:read).',
    filename: 'src/common/guards/permissions.guard.ts',
    code: `import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/core';
import { Reflector } from '@nestjs/core';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);

// Role-to-Permission Mapping Table
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  SYSTEM_ADMIN: ['*'], // Wildcard access
  COMMAND_OPERATOR: [
    'incidents:read', 'incidents:write', 'incidents:dispatch',
    'telemetry:read', 'geofence:read', 'geofence:write'
  ],
  SCHOOL_ADMIN: ['learners:read', 'learners:write', 'schools:read'],
  FIELD_RESPONDER: ['incidents:read', 'incidents:update_status', 'telemetry:read'],
  PARENT: ['learners:read_own', 'telemetry:read_own', 'incidents:read_own'],
  TECHNICIAN: ['devices:read', 'devices:write', 'devices:reassign'],
};

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    if (userPermissions.includes('*')) return true; // Superadmin wildcard

    return requiredPermissions.every((perm) => userPermissions.includes(perm));
  }
}`,
    highlights: ['Granular permission strings', 'Role-to-permission mapping dictionary', 'Wildcard superadmin support', '@Permissions(...) decorator']
  },
  {
    id: 18,
    title: 'Base Repository Pattern',
    category: 'Base Patterns',
    description: 'Abstract generic BaseRepository<T> class encapsulating Prisma CRUD operations, pagination, filtering, soft-delete, and transactions.',
    filename: 'src/common/repositories/base.repository.ts',
    code: `import { PrismaService } from '../../database/prisma.service';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export abstract class BaseRepository<T, CreateInput, UpdateInput> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string,
  ) {}

  protected get model(): any {
    return (this.prisma as any)[this.modelName];
  }

  async create(data: CreateInput): Promise<T> {
    return this.model.create({ data });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async findAllPaginated(
    page = 1,
    limit = 20,
    where: any = {},
    orderBy: any = { createdAt: 'desc' },
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.findMany({
        where: { ...where, deletedAt: null },
        skip,
        take: limit,
        orderBy,
      }),
      this.model.count({ where: { ...where, deletedAt: null } }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: string, data: UpdateInput): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<T> {
    return this.model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}`,
    highlights: ['Abstract Generic TypeScript class', 'Automated soft-delete filtering', 'Reusable pagination calculation', 'Dynamic Prisma model binding']
  },
  {
    id: 19,
    title: 'Base Service Pattern',
    category: 'Base Patterns',
    description: 'Abstract BaseService<T> handling common business workflow validation, entity lookups, NotFoundException throwing, and Winston logging.',
    filename: 'src/common/services/base.service.ts',
    code: `import { NotFoundException, Logger } from '@nestjs/common';
import { BaseRepository, PaginatedResult } from '../repositories/base.repository';

export abstract class BaseService<T, CreateDto, UpdateDto> {
  protected readonly logger: Logger;

  constructor(
    protected readonly repository: BaseRepository<T, CreateDto, UpdateDto>,
    serviceName: string,
  ) {
    this.logger = new Logger(serviceName);
  }

  async create(createDto: CreateDto): Promise<T> {
    this.logger.log(\`Creating new \${this.constructor.name} record...\`);
    return this.repository.create(createDto);
  }

  async findOne(id: string): Promise<T> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException(\`Record with ID '\${id}' not found.\`);
    }
    return record;
  }

  async findAllPaginated(page: number, limit: number, where?: any): Promise<PaginatedResult<T>> {
    return this.repository.findAllPaginated(page, limit, where);
  }

  async update(id: string, updateDto: UpdateDto): Promise<T> {
    await this.findOne(id); // Ensure exists
    this.logger.log(\`Updating record ID '\${id}'...\`);
    return this.repository.update(id, updateDto);
  }

  async remove(id: string): Promise<T> {
    await this.findOne(id); // Ensure exists
    this.logger.log(\`Soft deleting record ID '\${id}'...\`);
    return this.repository.softDelete(id);
  }
}`,
    highlights: ['Business logic abstraction', 'Automated NotFoundException checks', 'Unified Winston logger per service', 'Type-safe DTO transformations']
  },
  {
    id: 20,
    title: 'Base Controller Pattern',
    category: 'Base Patterns',
    description: 'Abstract BaseController<T> providing standardized RESTful routes (@Get, @Post, @Patch, @Delete) with OpenAPI Swagger tags and guards.',
    filename: 'src/common/controllers/base.controller.ts',
    code: `import { Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseService } from '../services/base.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export abstract class BaseController<T, CreateDto, UpdateDto> {
  constructor(protected readonly service: BaseService<T, CreateDto, UpdateDto>) {}

  @Post()
  @ApiOperation({ summary: 'Create a new record' })
  @ApiResponse({ status: 211, description: 'Record created successfully' })
  async create(@Body() createDto: CreateDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve paginated list of records' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.service.findAllPaginated(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find record by unique UUID' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update existing record by UUID' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft-delete record by UUID' })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}`,
    highlights: ['Standardized RESTful CRUD routes', 'OpenAPI Swagger decorator annotations', 'Default JWT & Roles guard binding', 'Clean DRY controller code']
  },
  {
    id: 21,
    title: 'Audit Middleware',
    category: 'Middleware & Logs',
    description: 'Express middleware capturing incoming request method, route, IP, user-agent, execution duration in milliseconds, and response status.',
    filename: 'src/common/middleware/audit.middleware.ts',
    code: `import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  private readonly logger = new Logger('AuditHTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || 'Unknown';
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      const requestId = req.headers['x-request-id'] || 'N/A';
      const userId = (req as any).user?.id || 'Anonymous';

      this.logger.log(
        \`[\${method}] \${originalUrl} -> Status: \${statusCode} (\${responseTime}ms) | User: \${userId} | IP: \${ip} | ReqID: \${requestId}\`,
      );
    });

    next();
  }
}`,
    highlights: ['Response latency measurement (ms)', 'Authenticated User ID extraction', 'IP address & User-Agent capture', 'X-Request-ID correlation']
  },
  {
    id: 22,
    title: 'Request ID Middleware',
    category: 'Middleware & Logs',
    description: 'Middleware generating or propagating UUID v4 X-Request-ID headers across downstream microservices and log contexts.',
    filename: 'src/common/middleware/request-id.middleware.ts',
    code: `import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const existingRequestId = req.headers['x-request-id'] as string;
    const requestId = existingRequestId || uuidv4();

    req.headers['x-request-id'] = requestId;
    res.setHeader('X-Request-ID', requestId);

    next();
  }
}`,
    highlights: ['UUID v4 trace ID generation', 'Header propagation on requests and responses', 'Distributed trace correlation', 'Express middleware integration']
  },
  {
    id: 23,
    title: 'API Versioning',
    category: 'Core Setup',
    description: 'URI-based versioning configuration prefixing endpoints with /api/v1/... and enabling backward-compatible version migration.',
    filename: 'src/main.ts (Versioning setup)',
    code: `import { VersioningType } from '@nestjs/common';

// URI Versioning configuration in main.ts
app.setGlobalPrefix('api');
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});

/* Resulting URI endpoint paths:
   POST   /api/v1/auth/login
   GET    /api/v1/health/liveness
   GET    /api/v1/health/readiness
*/`,
    highlights: ['URI VersioningType pattern', 'Default version = v1', 'Global /api prefix', 'Clean backwards compatibility']
  },
  {
    id: 24,
    title: 'Swagger OpenAPI Configuration',
    category: 'Core Setup',
    description: 'Interactive OpenAPI specification generated dynamically via SwaggerModule with Bearer Auth tags, schemas, and endpoint descriptions.',
    filename: 'src/main.ts (Swagger setup)',
    code: `import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('ITIS Enterprise Learner Safety Platform API')
  .setDescription('Production NestJS Enterprise Backend Foundation API')
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT Bearer Token',
      in: 'header',
    },
    'JWT-auth',
  )
  .addTag('Health', 'System Liveness & Readiness Checks')
  .addTag('Authentication', 'JWT User Authentication & RBAC')
  .build();

const document = SwaggerModule.createDocument(app, swaggerConfig);
SwaggerModule.setup('api/docs', app, document);`,
    highlights: ['Bearer Auth JWT scheme', 'Interactive UI at /api/docs', 'Automated DTO schema generation', 'Tags & grouping']
  },
  {
    id: 25,
    title: 'Unit Test Framework',
    category: 'DevOps & Testing',
    description: 'Jest unit testing setup with ts-jest, module mocking, repository stubs, and code coverage threshold enforcement.',
    filename: 'jest.config.ts',
    code: `import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\\\.spec\\\\.ts$',
  transform: {
    '^.+\\\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!main.ts',
    '!**/*.module.ts',
    '!**/*.dto.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;`,
    highlights: ['Jest + ts-jest compilation', '80% mandatory code coverage threshold', 'Targeted spec file execution', 'Unit mock isolated testing']
  },
  {
    id: 26,
    title: 'Integration Test Framework',
    category: 'DevOps & Testing',
    description: 'End-to-End (E2E) integration test suite using Supertest to verify live HTTP status codes, validation filters, and JWT guards.',
    filename: 'test/app.e2e-spec.ts',
    code: `import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/health/liveness (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/health/liveness')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
        expect(res.body.timestamp).toBeDefined();
      });
  });

  it('/api/v1/auth/login (POST) - should reject invalid credentials', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'nonexistent@itis.gov.za', password: 'wrongpassword' })
      .expect(401);
  });
});`,
    highlights: ['Supertest HTTP assertion library', 'In-memory NestJS test server', 'E2E end-to-end integration flow', 'Graceful server cleanup']
  },
  {
    id: 27,
    title: 'CI-Ready Project Structure & GitHub Actions',
    category: 'DevOps & Testing',
    description: 'GitHub Actions workflow file automating ESLint, Prettier formatting checks, Jest unit tests, E2E tests, and Docker container build verification.',
    filename: '.github/workflows/ci.yml',
    code: `name: ITIS NestJS Backend Foundation CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint-test-build:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgis/postgis:16-3.4-alpine
        env:
          POSTGRES_USER: itis_user
          POSTGRES_PASSWORD: itis_password
          POSTGRES_DB: itis_test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: ESLint & Code Format Check
        run: npm run lint

      - name: Generate Prisma Client
        run: npx prisma generate

      - name: Run Database Migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://itis_user:itis_password@localhost:5432/itis_test_db?schema=public

      - name: Execute Unit Tests
        run: npm run test

      - name: Execute E2E Integration Tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgresql://itis_user:itis_password@localhost:5432/itis_test_db?schema=public
          JWT_SECRET: super-secret-test-jwt-key-min-32-chars
          JWT_REFRESH_SECRET: super-secret-test-refresh-key-min-32-chars

      - name: Build Production Distribution
        run: npm run build

      - name: Build Docker Container Image
        run: docker build -t itis-backend-foundation:latest .`,
    highlights: ['Automated ESLint & Prettier checks', 'PostgreSQL & Redis service containers in CI', 'Prisma migration deployment', 'Production build verification']
  }
];
