// ITIS Infrastructure & Multi-Cloud Production Readiness Types

export type CloudProviderTarget = 'AWS' | 'AZURE' | 'GCP' | 'SITA_GOVCLOUD';

export type ReadinessCheckStatus = 'PASSED' | 'WARNING' | 'FAILED' | 'VERIFIED';

export interface ReadinessCheckpoint {
  id: string;
  category: 'INFRASTRUCTURE_IAC' | 'KUBERNETES' | 'SECURITY_SSL' | 'SECRETS' | 'BACKUP_DR' | 'MONITORING' | 'SITA_COMPLIANCE';
  name: string;
  description: string;
  status: ReadinessCheckStatus;
  targetProvider: CloudProviderTarget | 'MULTI_CLOUD';
  verifiedAt: string;
  details: string;
}

export interface MultiCloudInfrastructureHealth {
  aws: { status: 'HEALTHY' | 'DEGRADED'; region: 'af-south-1'; eksNodes: number };
  azure: { status: 'HEALTHY' | 'DEGRADED'; region: 'southafricanorth'; aksNodes: number };
  gcp: { status: 'HEALTHY' | 'DEGRADED'; region: 'europe-west2'; gkeNodes: number };
  sitaGovCloud: { status: 'HEALTHY' | 'DEGRADED'; region: 'ZA-GCLOUD-JHB-1'; openstackNodes: number; popiaSovereigntyVerified: boolean };
}

export interface ProductionReadinessReport {
  overallStatus: 'PRODUCTION_READY' | 'ACTION_REQUIRED';
  readinessScorePercentage: number;
  checkpointsPassedCount: number;
  totalCheckpointsCount: number;
  evaluatedAt: string;
  cloudTarget: CloudProviderTarget | 'HYBRID_MULTI_CLOUD';
  checkpoints: ReadinessCheckpoint[];
  multiCloudHealth: MultiCloudInfrastructureHealth;
  disasterRecoverySla: {
    rpoMinutes: number; // 15 Min Target
    rtoMinutes: number; // 10 Min Target
    lastVeleroBackupTimestamp: string;
    drFailoverScriptVerified: boolean;
  };
}
