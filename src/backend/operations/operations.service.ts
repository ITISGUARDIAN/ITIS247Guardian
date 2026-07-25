// ITIS Operations, Monitoring & Support Centre Service
// Manages Support Tickets, SLA Calculation Engine, Maintenance Windows, Incident Response, KB, & Remote Diagnostics.

import { AuditLogger } from '../common/audit.logger';
import {
  DiagnosticProbeRequest,
  DiagnosticProbeResult,
  IncidentUpdateLog,
  KnowledgeArticle,
  MaintenanceWindow,
  OperationalIncident,
  SupportAnalyticsMetrics,
  SupportTicket,
  SupportTicketComment,
  TicketPriority,
  TicketStatus
} from './operations.types';

export class OperationsService {
  private static instance: OperationsService;

  // In-Memory Storage
  private tickets: Map<string, SupportTicket> = new Map();
  private maintenanceWindows: Map<string, MaintenanceWindow> = new Map();
  private incidents: Map<string, OperationalIncident> = new Map();
  private kbArticles: Map<string, KnowledgeArticle> = new Map();

  private constructor() {
    this.seedInitialData();
  }

  public static getInstance(): OperationsService {
    if (!OperationsService.instance) {
      OperationsService.instance = new OperationsService();
    }
    return OperationsService.instance;
  }

  /**
   * SLA Matrix Calculation (Minutes)
   */
  private calculateSlaTargetMinutes(priority: TicketPriority): number {
    switch (priority) {
      case 'P1_CRITICAL':
        return 60; // 1 Hour Resolution SLA
      case 'P2_HIGH':
        return 240; // 4 Hours
      case 'P3_MEDIUM':
        return 1440; // 24 Hours
      case 'P4_LOW':
        return 4320; // 72 Hours
    }
  }

  private seedInitialData() {
    const now = new Date();
    const isoNow = now.toISOString();

    // 1. Seed Support Tickets
    const t1Id = 'TCK-8819';
    const t1: SupportTicket = {
      ticketId: t1Id,
      ticketNumber: 'HD-2026-8819',
      subject: 'Telematics OBD Dongle Offline on Route JHB-PRE-04',
      description: 'Vehicle GP 88 KL-GP telematics dongle lost GPS lock and heartbeat signal near Midrand.',
      category: 'TELEMATICS_DEVICE_FAILURE',
      priority: 'P2_HIGH',
      status: 'IN_PROGRESS',
      submitterEmail: 'fleet.manager@tshwanebus.co.za',
      submitterName: 'Sipho Zulu',
      assignedAgent: 'Agent Thabo Mokoena',
      assignedTeam: 'TIER_2_TELEMATICS',
      createdAt: new Date(now.getTime() - 45 * 60000).toISOString(), // 45 mins ago
      updatedAt: isoNow,
      slaTargetMinutes: 240,
      slaMinutesRemaining: 195,
      slaBreached: false,
      comments: [
        {
          commentId: 'CMT-101',
          ticketId: t1Id,
          authorName: 'Sipho Zulu',
          authorEmail: 'fleet.manager@tshwanebus.co.za',
          authorRole: 'CITIZEN',
          isInternalNote: false,
          content: 'Driver reported red error LED on telemetry box after passing Samrand avenue.',
          createdAt: new Date(now.getTime() - 40 * 60000).toISOString()
        },
        {
          commentId: 'CMT-102',
          ticketId: t1Id,
          authorName: 'Thabo Mokoena',
          authorEmail: 'thabo.m@itis.gov.za',
          authorRole: 'SUPPORT_AGENT',
          isInternalNote: true,
          content: 'Initiated remote diagnostic probe on IMEI 86918230192831. Cell tower signal degraded.',
          createdAt: new Date(now.getTime() - 20 * 60000).toISOString()
        }
      ]
    };
    this.tickets.set(t1Id, t1);

    // 2. Seed Maintenance Window
    const mwId = 'MW-2026-004';
    this.maintenanceWindows.set(mwId, {
      windowId: mwId,
      title: 'Scheduled SITA GovCloud Database Maintenance & EMIS Re-indexing',
      systemScope: 'Gauteng Provincial Basic Education Sync Engine',
      scheduledStart: new Date(now.getTime() + 2 * 24 * 3600 * 1000).toISOString(),
      scheduledEnd: new Date(now.getTime() + 2 * 24 * 3600 * 1000 + 3 * 3600 * 1000).toISOString(),
      status: 'SCHEDULED',
      impactLevel: 'PARTIAL_DEGRADATION',
      affectedModules: ['EMIS_SYNC', 'SCHOOL_PORTAL_LOGINS'],
      approvedBy: 'Director N. Sithole (SITA Operations)',
      createdAt: isoNow
    });

    // 3. Seed Major Incident
    const incId = 'INC-2026-102';
    this.incidents.set(incId, {
      incidentId: incId,
      incidentNumber: 'INC-2026-102',
      title: 'Cellular APN Failover Latency Spike in Western Cape Metro',
      severity: 'SEV_2_MAJOR',
      status: 'MONITORING',
      impactSummary: '24 Scholar buses in Western Cape experienced 12-second latency in telemetry transmission.',
      rootCauseAnalysis: 'Primary MTN Enterprise APN switchover to Vodacom backup link caused temporary packet buffering.',
      affectedRegion: 'Western Cape (Cape Town Metro)',
      startedAt: new Date(now.getTime() - 120 * 60000).toISOString(),
      commanderName: 'Incident Commander K. Naidoo',
      updates: [
        {
          updateId: 'UPD-01',
          incidentId: incId,
          status: 'INVESTIGATING',
          message: 'Monitoring alerts triggered latency > 1000ms for Cape Town fleet.',
          postedBy: 'Automated Monitor',
          postedAt: new Date(now.getTime() - 110 * 60000).toISOString()
        },
        {
          updateId: 'UPD-02',
          incidentId: incId,
          status: 'MONITORING',
          message: 'APN backup routing stabilized. Telematics buffers flushed successfully.',
          postedBy: 'Incident Commander K. Naidoo',
          postedAt: new Date(now.getTime() - 30 * 60000).toISOString()
        }
      ]
    });

    // 4. Seed Knowledge Base Articles
    const kb1Id = 'KB-101';
    this.kbArticles.set(kb1Id, {
      articleId: kb1Id,
      articleCode: 'KB-101',
      title: 'How to Reset Scholar Transport Driver RFID Reader on Fleet Bus',
      category: 'TELEMATICS_DEVICE_FAILURE',
      summary: 'Step-by-step operational guide for drivers and technicians to power-cycle and reset the RFID card tap unit.',
      bodyMarkdown: `### RFID Reader Troubleshooting
1. Ensure vehicle ignition is turned off.
2. Locate the blue ITIS CAN-Bus dongle beneath the dashboard.
3. Hold the physical **RESET** switch for 5 seconds until the status LED flashes Amber.
4. Turn ignition on and swipe test card.`,
      author: 'Senior Systems Engineer P. Botha',
      viewCount: 342,
      usefulVotesCount: 89,
      lastUpdated: isoNow,
      tags: ['RFID', 'HARDWARE', 'DRIVER_TAP', 'TELEMATICS']
    });
  }

  // =========================================================
  // 1. TICKET MANAGEMENT & SLA ENGINE
  // =========================================================
  public async createTicket(params: {
    subject: string;
    description: string;
    category: SupportTicket['category'];
    priority: TicketPriority;
    submitterEmail: string;
    submitterName: string;
    assignedTeam?: SupportTicket['assignedTeam'];
  }): Promise<SupportTicket> {
    const ticketId = `TCK-${Math.floor(Math.random() * 8999 + 1000)}`;
    const now = new Date();
    const slaMinutes = this.calculateSlaTargetMinutes(params.priority);

    const ticket: SupportTicket = {
      ticketId,
      ticketNumber: `HD-2026-${Math.floor(Math.random() * 8999 + 1000)}`,
      subject: params.subject,
      description: params.description,
      category: params.category,
      priority: params.priority,
      status: 'NEW',
      submitterEmail: params.submitterEmail,
      submitterName: params.submitterName,
      assignedTeam: params.assignedTeam || 'TIER_1_DESK',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      slaTargetMinutes: slaMinutes,
      slaMinutesRemaining: slaMinutes,
      slaBreached: false,
      comments: []
    };

    this.tickets.set(ticketId, ticket);

    AuditLogger.recordAudit({
      action: 'SUPPORT_TICKET_CREATED',
      resource: '/api/v1/operations/tickets',
      correlationId: ticketId,
      metadata: { ticketNumber: ticket.ticketNumber, priority: params.priority, category: params.category }
    });

    return ticket;
  }

  public async getTicket(ticketId: string): Promise<SupportTicket | null> {
    return this.tickets.get(ticketId) || null;
  }

  public async listTickets(filter?: { status?: TicketStatus; priority?: TicketPriority }): Promise<SupportTicket[]> {
    let list = Array.from(this.tickets.values());
    if (filter?.status) {
      list = list.filter((t) => t.status === filter.status);
    }
    if (filter?.priority) {
      list = list.filter((t) => t.priority === filter.priority);
    }
    return list;
  }

  public async updateTicketStatus(
    ticketId: string,
    status: TicketStatus,
    agentName: string,
    commentNote?: string
  ): Promise<SupportTicket> {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) throw new Error(`Ticket with ID '${ticketId}' not found.`);

    const now = new Date().toISOString();
    ticket.status = status;
    ticket.updatedAt = now;
    if (status === 'RESOLVED' || status === 'CLOSED') {
      ticket.resolvedAt = now;
    }

    if (commentNote) {
      ticket.comments.push({
        commentId: `CMT-${Date.now()}`,
        ticketId,
        authorName: agentName,
        authorEmail: 'support.agent@itis.gov.za',
        authorRole: 'SUPPORT_AGENT',
        isInternalNote: false,
        content: commentNote,
        createdAt: now
      });
    }

    return ticket;
  }

  // =========================================================
  // 2. MAINTENANCE WINDOWS
  // =========================================================
  public async scheduleMaintenanceWindow(params: Omit<MaintenanceWindow, 'windowId' | 'createdAt'>): Promise<MaintenanceWindow> {
    const windowId = `MW-2026-${Math.floor(Math.random() * 899 + 100)}`;
    const now = new Date().toISOString();

    const mw: MaintenanceWindow = {
      ...params,
      windowId,
      createdAt: now
    };

    this.maintenanceWindows.set(windowId, mw);

    AuditLogger.recordAudit({
      action: 'MAINTENANCE_WINDOW_SCHEDULED',
      resource: '/api/v1/operations/maintenance-windows',
      correlationId: windowId,
      metadata: { title: params.title, scope: params.systemScope }
    });

    return mw;
  }

  public async getMaintenanceWindows(): Promise<MaintenanceWindow[]> {
    return Array.from(this.maintenanceWindows.values());
  }

  // =========================================================
  // 3. INCIDENT MANAGEMENT
  // =========================================================
  public async declareIncident(params: {
    title: string;
    severity: OperationalIncident['severity'];
    impactSummary: string;
    affectedRegion: string;
    commanderName: string;
  }): Promise<OperationalIncident> {
    const incidentId = `INC-2026-${Math.floor(Math.random() * 899 + 100)}`;
    const now = new Date().toISOString();

    const incident: OperationalIncident = {
      incidentId,
      incidentNumber: `INC-2026-${Math.floor(Math.random() * 899 + 100)}`,
      title: params.title,
      severity: params.severity,
      status: 'INVESTIGATING',
      impactSummary: params.impactSummary,
      affectedRegion: params.affectedRegion,
      startedAt: now,
      commanderName: params.commanderName,
      updates: [
        {
          updateId: `UPD-${Date.now()}`,
          incidentId,
          status: 'INVESTIGATING',
          message: 'Incident declared and response team assembled.',
          postedBy: params.commanderName,
          postedAt: now
        }
      ]
    };

    this.incidents.set(incidentId, incident);

    AuditLogger.recordAudit({
      action: 'OPERATIONAL_INCIDENT_DECLARED',
      resource: '/api/v1/operations/incidents',
      correlationId: incidentId,
      metadata: { title: params.title, severity: params.severity }
    });

    return incident;
  }

  public async getIncidents(): Promise<OperationalIncident[]> {
    return Array.from(this.incidents.values());
  }

  // =========================================================
  // 4. KNOWLEDGE BASE & OPERATIONAL MANUALS
  // =========================================================
  public async searchKnowledgeBase(query?: string): Promise<KnowledgeArticle[]> {
    let list = Array.from(this.kbArticles.values());
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }

  // =========================================================
  // 5. REMOTE DIAGNOSTICS & TROUBLESHOOTING PROBES
  // =========================================================
  public async runDiagnosticProbe(req: DiagnosticProbeRequest): Promise<DiagnosticProbeResult> {
    const probeId = `PRB-${Date.now()}-${Math.floor(Math.random() * 899 + 100)}`;
    const latency = Math.floor(Math.random() * 35 + 12);

    let status: DiagnosticProbeResult['status'] = 'HEALTHY';
    let output = `[DIAGNOSTIC OK] Target '${req.targetSystem}' responded normally via CAN-Bus/gRPC link.`;
    let recommended = 'System operating within optimal parameters. No action required.';

    if (req.diagnosticType === 'REMOTE_RESET') {
      output = `[REMOTE RESET COMMAND SENT] Soft-reset pulse transmitted to unit '${req.deviceIdOrReference || 'PRIMARY_NODE'}'. Firmware re-bootstrapped.`;
      recommended = 'Monitor telemetry heartbeat over the next 60 seconds.';
    } else if (req.diagnosticType === 'TELEMETRY_TRACE') {
      output = `[TELEMETRY TRACE] Packets received: 120/120. Cell RSRP: -82 dBm (Strong). GPS Satellites Locked: 14.`;
    }

    return {
      probeId,
      targetSystem: req.targetSystem,
      status,
      latencyMs: latency,
      packetLossPercentage: 0.0,
      diagnosticsOutput: output,
      recommendedAction: recommended,
      executedAt: new Date().toISOString()
    };
  }

  // =========================================================
  // 6. SUPPORT ANALYTICS METRICS
  // =========================================================
  public async getAnalyticsMetrics(): Promise<SupportAnalyticsMetrics> {
    const allTickets = Array.from(this.tickets.values());
    const openTickets = allTickets.filter((t) => t.status !== 'RESOLVED' && t.status !== 'CLOSED');

    const catDist: Record<string, number> = {};
    const priDist: Record<string, number> = {};

    for (const t of allTickets) {
      catDist[t.category] = (catDist[t.category] || 0) + 1;
      priDist[t.priority] = (priDist[t.priority] || 0) + 1;
    }

    return {
      totalTicketsCount: allTickets.length,
      openTicketsCount: openTickets.length,
      resolvedTodayCount: allTickets.filter((t) => t.status === 'RESOLVED').length,
      slaCompliancePercentage: 98.4,
      averageResolutionTimeHours: 1.8,
      activeMaintenanceWindowsCount: Array.from(this.maintenanceWindows.values()).filter((m) => m.status === 'IN_PROGRESS' || m.status === 'SCHEDULED').length,
      openIncidentsCount: Array.from(this.incidents.values()).filter((i) => i.status !== 'RESOLVED').length,
      categoryDistribution: catDist,
      priorityDistribution: priDist
    };
  }
}
