// ITIS Structured Production Logger & Audit Trail
import { Request, Response, NextFunction } from 'express';

export interface AuditLogPayload {
  userId?: string;
  action: string;
  resource: string;
  ipAddress?: string;
  correlationId: string;
  metadata?: Record<string, any>;
}

export class AuditLogger {
  static log(level: 'INFO' | 'WARN' | 'ERROR' | 'SECURITY', message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    const correlationId = meta?.correlationId || 'SYS-INIT';
    console.log(JSON.stringify({
      timestamp,
      level,
      correlationId,
      message,
      ...(meta || {})
    }));
  }

  static async recordAudit(payload: AuditLogPayload) {
    AuditLogger.log('SECURITY', `AUDIT: ${payload.action} on ${payload.resource}`, payload);
  }
}

export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const correlationId = (req.headers['x-correlation-id'] as string) || `CORR-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  (req as any).correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);
  next();
}

export function rbacGuard(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role;
    if (!userRole) {
      return res.status(401).json({ error: 'UNAUTHORIZED', message: 'Authentication required' });
    }
    if (!allowedRoles.includes(userRole) && userRole !== 'SYSTEM_ADMIN') {
      return res.status(403).json({ error: 'FORBIDDEN', message: 'Insufficient role permissions' });
    }
    next();
  };
}
