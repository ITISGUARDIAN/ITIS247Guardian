// ITIS Operations, Monitoring & Support Centre REST Controller
// Exposes API endpoints for Support Tickets, SLA Status, Maintenance Windows, Incidents, KB, Diagnostics, & Analytics.

import { Request, Response, Router } from 'express';
import { OperationsService } from './operations.service';

export const operationsRouter = Router();

const opsService = OperationsService.getInstance();

/**
 * 1. SUPPORT TICKET MANAGEMENT
 * GET /api/v1/operations/tickets
 * POST /api/v1/operations/tickets
 */
operationsRouter.get('/tickets', async (req: Request, res: Response) => {
  try {
    const { status, priority } = req.query;
    const tickets = await opsService.listTickets({
      status: status as any,
      priority: priority as any
    });

    return res.json({
      success: true,
      count: tickets.length,
      tickets
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'TICKETS_FETCH_FAILED', message: err.message });
  }
});

operationsRouter.post('/tickets', async (req: Request, res: Response) => {
  try {
    const { subject, description, category, priority, submitterEmail, submitterName, assignedTeam } = req.body;

    if (!subject || !description || !category || !priority || !submitterEmail) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_TICKET_FIELDS',
        message: 'Subject, description, category, priority, and submitterEmail are required.'
      });
    }

    const ticket = await opsService.createTicket({
      subject,
      description,
      category,
      priority,
      submitterEmail,
      submitterName: submitterName || 'System User',
      assignedTeam
    });

    return res.status(201).json({
      success: true,
      message: `Support ticket '${ticket.ticketNumber}' created successfully. SLA target: ${ticket.slaTargetMinutes} mins.`,
      ticket
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'TICKET_CREATE_FAILED', message: err.message });
  }
});

/**
 * 2. UPDATE TICKET STATUS
 * PUT /api/v1/operations/tickets/:ticketId/status
 */
operationsRouter.put('/tickets/:ticketId/status', async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const { status, agentName, commentNote } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'MISSING_STATUS', message: 'Status is required.' });
    }

    const ticket = await opsService.updateTicketStatus(
      ticketId,
      status,
      agentName || 'Support Agent',
      commentNote
    );

    return res.json({
      success: true,
      message: `Ticket status updated to '${status}'.`,
      ticket
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: 'TICKET_UPDATE_FAILED', message: err.message });
  }
});

/**
 * 3. MAINTENANCE WINDOWS
 * GET /api/v1/operations/maintenance-windows
 * POST /api/v1/operations/maintenance-windows
 */
operationsRouter.get('/maintenance-windows', async (req: Request, res: Response) => {
  try {
    const windows = await opsService.getMaintenanceWindows();
    return res.json({
      success: true,
      count: windows.length,
      maintenanceWindows: windows
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'MAINTENANCE_FETCH_FAILED', message: err.message });
  }
});

operationsRouter.post('/maintenance-windows', async (req: Request, res: Response) => {
  try {
    const { title, systemScope, scheduledStart, scheduledEnd, impactLevel, affectedModules, approvedBy } = req.body;

    if (!title || !systemScope || !scheduledStart || !scheduledEnd) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_MW_FIELDS',
        message: 'Title, systemScope, scheduledStart, and scheduledEnd are required.'
      });
    }

    const window = await opsService.scheduleMaintenanceWindow({
      title,
      systemScope,
      scheduledStart,
      scheduledEnd,
      status: 'SCHEDULED',
      impactLevel: impactLevel || 'PARTIAL_DEGRADATION',
      affectedModules: affectedModules || [],
      approvedBy: approvedBy || 'Operations Lead'
    });

    return res.status(201).json({
      success: true,
      message: 'Maintenance window scheduled.',
      maintenanceWindow: window
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'MAINTENANCE_SCHEDULE_FAILED', message: err.message });
  }
});

/**
 * 4. OPERATIONAL INCIDENT MANAGEMENT
 * GET /api/v1/operations/incidents
 * POST /api/v1/operations/incidents
 */
operationsRouter.get('/incidents', async (req: Request, res: Response) => {
  try {
    const incidents = await opsService.getIncidents();
    return res.json({
      success: true,
      count: incidents.length,
      incidents
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'INCIDENTS_FETCH_FAILED', message: err.message });
  }
});

operationsRouter.post('/incidents', async (req: Request, res: Response) => {
  try {
    const { title, severity, impactSummary, affectedRegion, commanderName } = req.body;

    if (!title || !severity || !impactSummary) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_INCIDENT_FIELDS',
        message: 'Title, severity, and impactSummary are required.'
      });
    }

    const incident = await opsService.declareIncident({
      title,
      severity,
      impactSummary,
      affectedRegion: affectedRegion || 'Gauteng',
      commanderName: commanderName || 'Duty Incident Commander'
    });

    return res.status(201).json({
      success: true,
      message: `Operational Incident '${incident.incidentNumber}' declared.`,
      incident
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'INCIDENT_DECLARE_FAILED', message: err.message });
  }
});

/**
 * 5. KNOWLEDGE BASE & OPERATIONAL MANUALS
 * GET /api/v1/operations/kb
 */
operationsRouter.get('/kb', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const articles = await opsService.searchKnowledgeBase(q as string);
    return res.json({
      success: true,
      count: articles.length,
      articles
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'KB_FETCH_FAILED', message: err.message });
  }
});

/**
 * 6. REMOTE DIAGNOSTICS & TROUBLESHOOTING PROBES
 * POST /api/v1/operations/diagnostics/probe
 */
operationsRouter.post('/diagnostics/probe', async (req: Request, res: Response) => {
  try {
    const { targetSystem, deviceIdOrReference, diagnosticType } = req.body;

    if (!targetSystem || !diagnosticType) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_PROBE_FIELDS',
        message: 'targetSystem and diagnosticType are required.'
      });
    }

    const result = await opsService.runDiagnosticProbe({
      targetSystem,
      deviceIdOrReference,
      diagnosticType
    });

    return res.json({
      success: true,
      message: 'Diagnostic probe completed.',
      result
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DIAGNOSTIC_PROBE_FAILED', message: err.message });
  }
});

/**
 * 7. SUPPORT ANALYTICS METRICS
 * GET /api/v1/operations/analytics
 */
operationsRouter.get('/analytics', async (req: Request, res: Response) => {
  try {
    const metrics = await opsService.getAnalyticsMetrics();
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      metrics
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'ANALYTICS_FAILED', message: err.message });
  }
});
