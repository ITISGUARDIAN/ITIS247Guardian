export interface AiCopilotQuery {
  id: string;
  persona: 'C3_OPERATOR' | 'PARENT' | 'SCHOOL_ADMIN' | 'GOVT_EXEC' | 'FIELD_TECH';
  userQuery: string;
  aiResponse: string;
  language: string;
  retrievedSources: string[];
  executionTimeMs: number;
  humanApprovalRequired: boolean;
  approvalStatus?: 'APPROVED' | 'AUTO_EXECUTED' | 'REJECTED';
}

export interface IncidentAiSummary {
  incidentId: string;
  title: string;
  aiGeneratedTimeline: string[];
  recommendedAction: string;
  confidenceScorePct: number;
  sapsDispatchBrief: string;
}

export interface AiKnowledgeDocument {
  id: string;
  title: string;
  category: 'SOP_OPERATIONS' | 'LEGAL_POPIA' | 'DEVICE_FIRMWARE' | 'EMERGENCY_DISPATCH' | 'TREASURY_REGULATION';
  vectorEmbeddingId: string;
  lastIndexed: string;
  relevanceScorePct: number;
}

export interface AiCopilotCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'NestJS AI Gateway' | 'MCP Tool Calling Agent' | 'pgvector RAG Service';
  description: string;
  code: string;
}

// SAMPLE COPILOT QUERIES
export const SAMPLE_COPILOT_QUERIES: AiCopilotQuery[] = [
  {
    id: 'QRY-C3-001',
    persona: 'C3_OPERATOR',
    userQuery: 'Show all active amber incidents in Gauteng with delayed SAPS response time.',
    aiResponse: 'Identified 2 amber incidents in Gauteng: INC-2026-8801 (Soweto High) with SAPS unit 12 minutes away, and INC-2026-8804 (Pretoria West) where unit ETA was updated to 8 mins. Both safe corridors are actively monitored.',
    language: 'English',
    retrievedSources: ['c3_incidents_db', 'saps_cad_gateway', 'geofence_engine'],
    executionTimeMs: 112,
    humanApprovalRequired: false,
    approvalStatus: 'AUTO_EXECUTED',
  },
  {
    id: 'QRY-PARENT-002',
    persona: 'PARENT',
    userQuery: 'Ingabe ingane yami ifikile esikoleni ngokuphepha namuhla? (isiZulu: Is my child safely at school today?)',
    aiResponse: 'Yebo, uSipho ufikile eSoweto High School ngo 07:14 AM. Iskenwe esangweni elikhulu, kanti nochungechunge lweBheka safe zone lusebenza kahle. Isilinganiso sebhetri sebhendi ngu 94%.',
    language: 'isiZulu',
    retrievedSources: ['nfc_gate_logs', 'wearable_telemetry_stream', 'learner_profile_registry'],
    executionTimeMs: 145,
    humanApprovalRequired: false,
    approvalStatus: 'AUTO_EXECUTED',
  },
  {
    id: 'QRY-EXEC-003',
    persona: 'GOVT_EXEC',
    userQuery: 'Generate a Parliamentary Treasury briefing report summarizing Q2 child safety SLA metrics.',
    aiResponse: 'Q2 Executive Treasury Briefing generated: 162,500 protected learners across 325 schools. SLA compliance stands at 99.8% with average SAPS dispatch speed of 0.89s. Total cost per learner optimized at R14.20/month.',
    language: 'English',
    retrievedSources: ['nrpo_financial_db', 'sla_analytics_engine', 'bi_treasury_reports'],
    executionTimeMs: 210,
    humanApprovalRequired: true,
    approvalStatus: 'APPROVED',
  },
];

// SAMPLE INCIDENT AI SUMMARIES
export const SAMPLE_INCIDENT_AI_SUMMARIES: IncidentAiSummary[] = [
  {
    incidentId: 'INC-2026-8801',
    title: 'Anomalous Geofence Boundary Breach & SOS Signal',
    aiGeneratedTimeline: [
      '07:42:10 - Panic SOS button held for 3.2s by Learner LRN-ZA-8801',
      '07:42:11 - Geofence engine confirms coordinates (-26.2041, 28.0473) 140m outside safe corridor',
      '07:42:12 - C3 AI Copilot calculates Threat Score 94/100 (HIGH DANGER)',
      '07:42:13 - Multi-Agency Dispatch generated for SAPS Flying Squad Unit 42 (ETA 4.2 mins)'
    ],
    recommendedAction: 'Maintain live camera feed on Gate 3 perimeter and alert Parent Mrs. Khumalo via priority push & SMS.',
    confidenceScorePct: 98.4,
    sapsDispatchBrief: 'HIGH PRIORITY SOS: 14yo Learner outside Soweto High corridor. Suspected unauthorized transport vehicle approach.',
  },
];

// SAMPLE KNOWLEDGE DOCUMENTS (RAG)
export const SAMPLE_KNOWLEDGE_DOCS: AiKnowledgeDocument[] = [
  {
    id: 'DOC-SOP-001',
    title: 'SAPS Multi-Agency Tactical Emergency Response SOP v4.2',
    category: 'SOP_OPERATIONS',
    vectorEmbeddingId: 'vec_saps_sop_88012',
    lastIndexed: '2 hours ago',
    relevanceScorePct: 99.1,
  },
  {
    id: 'DOC-POPIA-002',
    title: 'POPIA Section 18 Minor PII Encryption & Data Minimisation Standard',
    category: 'LEGAL_POPIA',
    vectorEmbeddingId: 'vec_popia_sec18_4091',
    lastIndexed: '1 day ago',
    relevanceScorePct: 97.8,
  },
  {
    id: 'DOC-HW-003',
    title: 'Wearable GPS v4.2 Firmware & Dual-APN Cellular Failover Manual',
    category: 'DEVICE_FIRMWARE',
    vectorEmbeddingId: 'vec_wrb_fw42_9012',
    lastIndexed: '3 days ago',
    relevanceScorePct: 95.4,
  },
];

// CODE SPECS
export const AICOPILOT_CODE_SPECS: AiCopilotCodeSpec[] = [
  {
    id: 1,
    title: 'NestJS Enterprise AI Copilot Gateway',
    filename: 'src/modules/ai/gateway/ai_copilot.gateway.ts',
    category: 'NestJS AI Gateway',
    description: 'WebSocket gateway delivering streaming LLM responses, tool calls, and WebSocket live updates to C3 operators and mobile apps.',
    code: `import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AiCopilotService } from '../services/ai_copilot.service';

@WebSocketGateway({ namespace: '/ws/ai-copilot', cors: true })
export class AiCopilotGateway {
  constructor(private readonly aiService: AiCopilotService) {}

  @SubscribeMessage('query_copilot')
  async handleQuery(@MessageBody() data: { query: string; persona: string; lang: string }, @ConnectedSocket() client: Socket) {
    const stream = await this.aiService.streamResponse(data.query, data.persona, data.lang);
    
    for await (const chunk of stream) {
      client.emit('copilot_chunk', { delta: chunk });
    }
    client.emit('copilot_complete', { status: 'DONE' });
  }
}`
  },
  {
    id: 2,
    title: 'Model Context Protocol (MCP) Tool Calling Agent',
    filename: 'src/modules/ai/agents/mcp_tool_agent.service.ts',
    category: 'MCP Tool Calling Agent',
    description: 'Enforces human-in-the-loop approval gates for sensitive operational tool actions like dispatching SAPS or updating learner PII.',
    code: `import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class McpToolAgentService {
  async executeMcpToolCall(toolName: string, params: any, userRole: string) {
    // 1. Guardrail Check: Critical actions require explicit human approval
    if (toolName === 'DISPATCH_EMERGENCY_UNIT' && userRole !== 'C3_SENIOR_OPERATOR') {
      return {
        requiresHumanApproval: true,
        approvalQueueId: \`APPR-\${Date.now()}\`,
        message: 'Emergency responder dispatch requires senior operator confirmation.',
      };
    }

    // 2. Execute safe read-only or authorized tool action
    return await this.invokeInternalService(toolName, params);
  }

  private async invokeInternalService(tool: string, args: any) {
    return { status: 'EXECUTED_SUCCESS', result: \`Executed \${tool}\` };
  }
}`
  },
  {
    id: 3,
    title: 'pgvector RAG Retrieval & Source Attribution Engine',
    filename: 'src/modules/ai/rag/vector_rag.service.ts',
    category: 'pgvector RAG Service',
    description: 'Performs semantic vector search across South African legal statutes, SAPS SOPs, and school attendance records.',
    code: `import { Injectable } from '@nestjs/common';

@Injectable()
export class VectorRagService {
  async searchRelevantContext(queryText: string, topK: number = 3) {
    // 1. Generate text embedding vector
    const vector = await this.generateEmbedding(queryText);

    // 2. Query PostgreSQL pgvector cosine similarity
    const documents = await this.queryPgVector(vector, topK);

    return documents.map(doc => ({
      documentId: doc.id,
      title: doc.title,
      textSnippet: doc.snippet,
      similarityScore: doc.score,
    }));
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    return new Array(768).fill(0.01); // Mock 768-dim vector
  }

  private async queryPgVector(vector: number[], limit: number) {
    return [
      { id: 'DOC-SOP-001', title: 'SAPS Emergency Response SOP', snippet: 'Dispatch within 900ms...', score: 0.98 },
    ];
  }
}`
  }
];

// MANDATORY RULES
export const CRITICAL_AICOPILOT_RULES = [
  { id: 1, title: 'No Autonomous Emergency Responder Dispatch', ruleText: 'AI Copilot can recommend emergency responder dispatches, but final execution strictly requires explicit human operator confirmation.', badge: 'HUMAN IN LOOP' },
  { id: 2, title: 'POPIA & Learner PII Anonymization Guardrails', ruleText: 'All queries sent to LLMs pass through local PII masking filters to prevent learner identities from leaking to external models.', badge: 'PII MASKED' },
  { id: 3, title: 'Model Context Protocol (MCP) Tool Safety', ruleText: 'Every tool invocation by the AI agent is checked against user RBAC roles and logged in immutable audit records.', badge: 'MCP SECURE' },
  { id: 4, title: '11 Official South African Languages Support', ruleText: 'AI Copilot supports natural language interaction across all 11 official SA languages (isiZulu, isiXhosa, Afrikaans, Sepedi, etc.).', badge: '11 LANGUAGES' },
  { id: 5, title: 'Verifiable RAG Source Attribution', ruleText: 'Every factual AI response must cite its underlying database record, SAPS SOP document, or legislative source ID.', badge: 'RAG ATTRIBUTED' },
  { id: 6, title: 'Hallucination Prevention & SLA Fact Verification', ruleText: 'Operational metrics (SLA times, battery health, learner locations) are strictly fetched from direct SQL APIs, never hallucinated.', badge: 'FACT CHECKED' },
  { id: 7, title: 'Persona-Tailored UI & Multi-Role Assistants', ruleText: 'Distinct assistant modes tailored for C3 Command Centre, Parents, School Principals, Field Techs, and Govt Executives.', badge: '5 PERSONAS' },
  { id: 8, title: 'One-Click Automated Incident Summary & PDF Generation', ruleText: 'Incident AI automatically synthesizes multi-agency timelines, evidence chains, and SAPS dispatch briefs into formal PDF reports.', badge: '1-CLICK SUMMARY' },
  { id: 9, title: 'Sub-200ms WebSocket Streaming Response SLA', ruleText: 'Streaming tokens begin rendering on client UIs in under 200 milliseconds over persistent WebSocket channels.', badge: 'STREAM <200ms' },
  { id: 10, title: 'Core Mission: AI-Augmented Child Safety Intelligence', ruleText: 'Empowers South African operators and parents with intelligent, instant clarity to protect 12M+ learners nationwide.', badge: 'AI FOR SAFETY' },
];
