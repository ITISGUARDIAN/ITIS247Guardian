export interface ThreatLevel {
  level: 'Green' | 'Amber' | 'Orange' | 'Red';
  code: string;
  scenario: string;
  action: string;
  colorClass: string;
  badgeClass: string;
}

export interface UserStory {
  id: string;
  role: string;
  want: string;
  soThat: string;
  priority: 'Must Have' | 'Should Have';
}

export interface FunctionalRequirement {
  id: string;
  category: string;
  title: string;
  description: string;
}

export interface AcceptanceCriterion {
  id: string;
  feature: string;
  given: string;
  when: string;
  then: string;
}

export interface Sprint1ModuleSpec {
  id: string;
  name: string;
  type: 'Backend' | 'Frontend' | 'Mobile Flutter';
  description: string;
  keyResponsibilities: string[];
}

export interface DatabaseTableSpec {
  name: string;
  description: string;
  primaryKey: string;
  columns: string[];
  indexes: string[];
}

export interface RestApiSpec {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  summary: string;
  auth: string;
  requestBody?: string;
  responseBody: string;
}

export interface RealtimeTopicSpec {
  protocol: 'MQTT' | 'WebSocket';
  topicOrEvent: string;
  direction: 'Publish' | 'Subscribe' | 'Bi-directional';
  description: string;
  samplePayload: string;
}

export interface ProcessFlowSpec {
  id: string;
  title: string;
  steps: { step: number; actor: string; action: string; outcome: string }[];
}

export interface OperationalSpecSection {
  id: string;
  title: string;
  items: { title: string; description: string; detail?: string }[];
}
