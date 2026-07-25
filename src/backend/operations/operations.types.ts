// ITIS Operations, Monitoring & Support Centre Types
// Defines data structures for Help Desk, SLA Engine, Maintenance Windows, Incidents, KB, & Remote Diagnostics.

export type TicketPriority = 'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW';

export type TicketStatus = 'NEW' | 'ASSIGNED' | 'IN_PROGRESS' | 'PENDING_VENDOR' | 'RESOLVED' | 'CLOSED';

export type TicketCategory =
  | 'TELEMATICS_DEVICE_FAILURE'
  | 'DRIVER_APP_ISSUE'
  | 'SAPS_DISPATCH_ALERT'
  | 'PARENT_PORTAL_ACCESS'
  | 'EMIS_STUDENT_SYNC'
  | 'BILLING_PAYMENT_DISPUTE'
  | 'SYSTEM_INFRASTRUCTURE'
  | 'HARDWARE_TAMPER';

export interface SupportTicket {
  ticketId: string;
  ticketNumber: string; // e.g. HD-2026-8819
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  submitterEmail: string;
  submitterName: string;
  assignedAgent?: string;
  assignedTeam: 'TIER_1_DESK' | 'TIER_2_TELEMATICS' | 'TIER_3_DEVOPS' | 'SAPS_COMMAND_DESK';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  slaTargetMinutes: number;
  slaMinutesRemaining: number;
  slaBreached: boolean;
  comments: SupportTicketComment[];
}

export interface SupportTicketComment {
  commentId: string;
  ticketId: string;
  authorName: string;
  authorEmail: string;
  authorRole: 'CITIZEN' | 'SUPPORT_AGENT' | 'SYSTEM_BOT' | 'SAPS_OFFICER';
  isInternalNote: boolean;
  content: string;
  createdAt: string;
}

export interface MaintenanceWindow {
  windowId: string;
  title: string;
  systemScope: string; // e.g. "Gauteng Telematics Gateway & EMIS DB Sync"
  scheduledStart: string;
  scheduledEnd: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  impactLevel: 'NO_DOWNTIME' | 'PARTIAL_DEGRADATION' | 'FULL_DOWNTIME';
  affectedModules: string[];
  approvedBy: string;
  createdAt: string;
}

export interface OperationalIncident {
  incidentId: string;
  incidentNumber: string; // e.g. INC-2026-901
  title: string;
  severity: 'SEV_1_CRITICAL' | 'SEV_2_MAJOR' | 'SEV_3_MINOR';
  status: 'INVESTIGATING' | 'IDENTIFIED' | 'MONITORING' | 'RESOLVED';
  impactSummary: string;
  rootCauseAnalysis?: string;
  affectedRegion: string;
  startedAt: string;
  resolvedAt?: string;
  commanderName: string;
  updates: IncidentUpdateLog[];
}

export interface IncidentUpdateLog {
  updateId: string;
  incidentId: string;
  status: OperationalIncident['status'];
  message: string;
  postedBy: string;
  postedAt: string;
}

export interface KnowledgeArticle {
  articleId: string;
  articleCode: string; // e.g. KB-1042
  title: string;
  category: TicketCategory;
  summary: string;
  bodyMarkdown: string;
  author: string;
  viewCount: number;
  usefulVotesCount: number;
  lastUpdated: string;
  tags: string[];
}

export interface DiagnosticProbeRequest {
  targetSystem: 'TELEMATICS_GATEWAY' | 'SAPS_CAD_ADAPTER' | 'EMIS_DB' | 'PUSH_COMM_SERVICE' | 'VEHICLE_OBD_DONGLE';
  deviceIdOrReference?: string;
  diagnosticType: 'LATENCY_PING' | 'TELEMETRY_TRACE' | 'MEMORY_HEAP_DUMP' | 'REMOTE_RESET';
}

export interface DiagnosticProbeResult {
  probeId: string;
  targetSystem: string;
  status: 'HEALTHY' | 'DEGRADED' | 'UNREACHABLE';
  latencyMs: number;
  packetLossPercentage: number;
  diagnosticsOutput: string;
  recommendedAction?: string;
  executedAt: string;
}

export interface SupportAnalyticsMetrics {
  totalTicketsCount: number;
  openTicketsCount: number;
  resolvedTodayCount: number;
  slaCompliancePercentage: number;
  averageResolutionTimeHours: number;
  activeMaintenanceWindowsCount: number;
  openIncidentsCount: number;
  categoryDistribution: Record<string, number>;
  priorityDistribution: Record<string, number>;
}
