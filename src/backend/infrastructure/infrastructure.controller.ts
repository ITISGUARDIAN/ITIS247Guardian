// ITIS Production Infrastructure & Deployment Controller
// Exposes API endpoints for Infrastructure Readiness Audit, Multi-Cloud Cluster Status,
// Disaster Recovery SLA, and Helm/Terraform Artifact Inventories.

import { Request, Response, Router } from 'express';
import { InfrastructureReadinessService } from './infrastructure-readiness.service';

export const infrastructureRouter = Router();

const readinessService = InfrastructureReadinessService.getInstance();

/**
 * 1. EVALUATE PRODUCTION READINESS
 * GET /api/v1/infrastructure/readiness
 */
infrastructureRouter.get('/readiness', async (req: Request, res: Response) => {
  try {
    const provider = (req.query.provider as any) || 'HYBRID_MULTI_CLOUD';
    const report = await readinessService.evaluateProductionReadiness(provider);

    return res.json({
      success: true,
      report
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'READINESS_EVALUATION_FAILED', message: err.message });
  }
});

/**
 * 2. GET MULTI-CLOUD CLUSTER METRICS
 * GET /api/v1/infrastructure/clusters
 */
infrastructureRouter.get('/clusters', async (req: Request, res: Response) => {
  try {
    const report = await readinessService.evaluateProductionReadiness();
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      clusters: report.multiCloudHealth
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'CLUSTER_METRICS_FAILED', message: err.message });
  }
});

/**
 * 3. GET DISASTER RECOVERY & BACKUP SLA
 * GET /api/v1/infrastructure/disaster-recovery
 */
infrastructureRouter.get('/disaster-recovery', async (req: Request, res: Response) => {
  try {
    const report = await readinessService.evaluateProductionReadiness();
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      disasterRecoverySla: report.disasterRecoverySla,
      veleroBackupSchedule: '*/15 * * * * (15-Minute RPO)',
      drScriptPath: '/infrastructure/dr_backup/rpo-rto-disaster-recovery.sh'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'DR_METRICS_FAILED', message: err.message });
  }
});

/**
 * 4. GET INFRASTRUCTURE ARTIFACT INVENTORY
 * GET /api/v1/infrastructure/inventory
 */
infrastructureRouter.get('/inventory', (req: Request, res: Response) => {
  return res.json({
    success: true,
    timestamp: new Date().toISOString(),
    artifacts: {
      terraform: {
        aws: '/infrastructure/terraform/aws/main.tf',
        azure: '/infrastructure/terraform/azure/main.tf',
        gcp: '/infrastructure/terraform/gcp/main.tf',
        sitaGovCloud: '/infrastructure/terraform/sita_govcloud/main.tf'
      },
      kubernetes: [
        '/infrastructure/k8s/deployment.yaml',
        '/infrastructure/k8s/service.yaml',
        '/infrastructure/k8s/ingress.yaml',
        '/infrastructure/k8s/hpa.yaml',
        '/infrastructure/k8s/cert-manager.yaml',
        '/infrastructure/k8s/vault-agent.yaml'
      ],
      helmChart: '/infrastructure/helm/itis-app',
      monitoring: [
        '/infrastructure/monitoring/prometheus-alerts.yaml',
        '/infrastructure/monitoring/grafana-itis-dashboard.json'
      ],
      disasterRecovery: [
        '/infrastructure/dr_backup/velero-backup-policy.yaml',
        '/infrastructure/dr_backup/rpo-rto-disaster-recovery.sh'
      ],
      readinessScript: '/infrastructure/readiness/verify-production-readiness.sh'
    }
  });
});
