export interface CapabilityDetail {
  id: string;
  name: string;
  purpose: string;
  businessValue: string;
  primaryUsers: string[];
  inputs: string[];
  outputs: string[];
  dependencies: string[];
  futureExpansion: string;
}

export interface Level3Service {
  id: string;
  name: string;
  description: string;
  softwareModules: string[];
  details: CapabilityDetail;
}

export interface Level2Capability {
  id: string;
  name: string;
  code: string;
  description: string;
  services: Level3Service[];
}

export interface Level1Domain {
  id: string;
  name: string;
  code: string;
  category: 'Core Operations' | 'Safety & Emergency' | 'Intelligence & Analytics' | 'Enterprise & Administration';
  description: string;
  iconName: string;
  capabilities: Level2Capability[];
}

export interface VisionPhase {
  phase: string;
  title: string;
  targetScope: string;
  timeline: string;
  keyMilestones: string[];
}
