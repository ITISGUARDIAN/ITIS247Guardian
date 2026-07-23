export interface ClusterNodeStatus {
  nodeId: string; // e.g. k8s-node-jhb-prod-01
  region: 'ZA_CENTRAL_JHB' | 'ZA_SOUTH_CPT';
  zone: string; // e.g. af-south-1a
  cpuUsagePct: number;
  memoryUsagePct: number;
  podCount: number;
  status: 'HEALTHY' | 'SCALING' | 'DRAINING';
  k8sVersion: string;
}

export interface DeploymentPipeline {
  pipelineId: string; // e.g. PIPE-RELEASE-2026-v4.1
  serviceName: string;
  environment: 'PRODUCTION' | 'STAGING' | 'DR_REGION';
  strategy: 'BLUE_GREEN' | 'CANARY' | 'ROLLING';
  status: 'SUCCESS' | 'IN_PROGRESS' | 'ROLLBACK_TRIGGERED';
  sbomVerified: boolean;
  cosignSigned: boolean;
  deployedAt: string;
}

export interface DatabaseClusterHealth {
  clusterName: string; // e.g. pg-ha-primary-jhb
  role: 'PRIMARY' | 'READ_REPLICA' | 'CROSS_REGION_DR';
  lagMs: number;
  activeConnections: number;
  pitrBackupStatus: 'COMPLIANT_RPO_1M' | 'BACKUP_IN_PROGRESS';
  storageUsedGbp: number;
}

export interface EdcndpCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Terraform IaC' | 'Kubernetes Helm Chart' | 'GitHub Actions DevSecOps Pipeline';
  description: string;
  code: string;
}

// SAMPLE CLUSTER NODES
export const SAMPLE_CLUSTER_NODES: ClusterNodeStatus[] = [
  {
    nodeId: 'k8s-node-jhb-prod-01',
    region: 'ZA_CENTRAL_JHB',
    zone: 'af-south-1a (Johannesburg)',
    cpuUsagePct: 34,
    memoryUsagePct: 48,
    podCount: 42,
    status: 'HEALTHY',
    k8sVersion: 'v1.30.2-gke',
  },
  {
    nodeId: 'k8s-node-jhb-prod-02',
    region: 'ZA_CENTRAL_JHB',
    zone: 'af-south-1b (Johannesburg)',
    cpuUsagePct: 38,
    memoryUsagePct: 52,
    podCount: 45,
    status: 'HEALTHY',
    k8sVersion: 'v1.30.2-gke',
  },
  {
    nodeId: 'k8s-node-cpt-dr-01',
    region: 'ZA_SOUTH_CPT',
    zone: 'af-south-2a (Cape Town DR)',
    cpuUsagePct: 18,
    memoryUsagePct: 29,
    podCount: 22,
    status: 'HEALTHY',
    k8sVersion: 'v1.30.2-gke',
  },
];

// SAMPLE PIPELINES
export const SAMPLE_DEPLOYMENT_PIPELINES: DeploymentPipeline[] = [
  {
    pipelineId: 'PIPE-REL-2026.07-v4.2',
    serviceName: 'child-safety-decision-engine',
    environment: 'PRODUCTION',
    strategy: 'CANARY',
    status: 'SUCCESS',
    sbomVerified: true,
    cosignSigned: true,
    deployedAt: '15 mins ago',
  },
  {
    pipelineId: 'PIPE-REL-2026.07-v4.1',
    serviceName: 'telemetry-ingestion-gateway',
    environment: 'PRODUCTION',
    strategy: 'BLUE_GREEN',
    status: 'SUCCESS',
    sbomVerified: true,
    cosignSigned: true,
    deployedAt: '1 hour ago',
  },
  {
    pipelineId: 'PIPE-REL-2026.07-dr-sync',
    serviceName: 'emergency-dispatch-c3-api',
    environment: 'DR_REGION',
    strategy: 'ROLLING',
    status: 'SUCCESS',
    sbomVerified: true,
    cosignSigned: true,
    deployedAt: '3 hours ago',
  },
];

// SAMPLE DB CLUSTER
export const SAMPLE_DB_CLUSTERS: DatabaseClusterHealth[] = [
  {
    clusterName: 'pg-ha-primary-jhb',
    role: 'PRIMARY',
    lagMs: 0,
    activeConnections: 4820,
    pitrBackupStatus: 'COMPLIANT_RPO_1M',
    storageUsedGbp: 1840,
  },
  {
    clusterName: 'pg-ha-replica-jhb-02',
    role: 'READ_REPLICA',
    lagMs: 1.2,
    activeConnections: 1240,
    pitrBackupStatus: 'COMPLIANT_RPO_1M',
    storageUsedGbp: 1840,
  },
  {
    clusterName: 'pg-ha-dr-cpt-standby',
    role: 'CROSS_REGION_DR',
    lagMs: 8.4,
    activeConnections: 120,
    pitrBackupStatus: 'COMPLIANT_RPO_1M',
    storageUsedGbp: 1840,
  },
];

// CODE SPECS
export const EDCNDP_CODE_SPECS: EdcndpCodeSpec[] = [
  {
    id: 1,
    title: 'Multi-Region Terraform Production Cluster Module',
    filename: 'infra/terraform/modules/k8s_cluster/main.tf',
    category: 'Terraform IaC',
    description: 'Deploys production Kubernetes clusters with autoscaling node pools across South Africa (Johannesburg & Cape Town) with mTLS Istio Service Mesh.',
    code: `module "itis_prod_k8s_cluster" {
  source       = "git::https://github.com/itis-org/terraform-k8s-module.git?ref=v4.2.0"
  cluster_name = "itis-national-prod-jhb"
  region       = "af-south-1"

  node_pools = {
    telemetry_ingestion = {
      machine_type = "c6i.4xlarge" # High network throughput
      min_count    = 10
      max_count    = 100
      autoscaling  = true
    }
    general_api = {
      machine_type = "m6i.2xlarge"
      min_count    = 6
      max_count    = 30
      autoscaling  = true
    }
  }

  enable_istio_service_mesh = true
  mTLS_mode                 = "STRICT"
}`
  },
  {
    id: 2,
    title: 'Zero-Downtime Blue/Green Helm Deployment Spec',
    filename: 'deploy/helm/itis-core/templates/deployment-bluegreen.yaml',
    category: 'Kubernetes Helm Chart',
    description: 'Enforces automated canary testing, zero-downtime blue/green switches, and automatic health check rollback triggers.',
    code: `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: child-safety-decision-engine
  namespace: itis-production
spec:
  replicas: 20
  strategy:
    blueGreen:
      activeService: csde-active-service
      previewService: csde-preview-service
      autoPromotionEnabled: true
      autoPromotionSeconds: 300
      prePromotionAnalysis:
        templates:
          - templateName: success-rate-analysis
`
  },
  {
    id: 3,
    title: 'GitHub Actions DevSecOps Pipeline with Cosign & Trivy',
    filename: '.github/workflows/devsecops_build_deploy.yml',
    category: 'GitHub Actions DevSecOps Pipeline',
    description: 'Automates SAST, container vulnerability scanning with Trivy, SBOM generation with Syft, Cosign cryptographic image signing, and ArgoCD promotion.',
    code: `name: Enterprise DevSecOps CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Trivy Vulnerability Scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'itis-registry.za/core/decision-engine:\${{ github.sha }}'
          exit-code: '1'
          severity: 'CRITICAL,HIGH'

      - name: Sign Container Image with Cosign
        run: |
          cosign sign --key env://COSIGN_PRIVATE_KEY itis-registry.za/core/decision-engine:\${{ github.sha }}
`
  }
];

// MANDATORY RULES
export const CRITICAL_EDCNDP_RULES = [
  { id: 1, title: 'Zero-Downtime Blue/Green & Canary Rollouts', ruleText: 'All application updates use Blue/Green or Canary rollouts. No deployment may disconnect an active child emergency call.', badge: 'ZERO DOWNTIME' },
  { id: 2, title: 'RPO ≤ 1 Min & RTO ≤ 15 Mins DR Guarantee', ruleText: 'Continuous cross-region database replication ensures data loss ≤ 1 minute and failover recovery ≤ 15 minutes.', badge: 'RPO 1M / RTO 15M' },
  { id: 3, title: '100% Reproducible Infrastructure as Code', ruleText: 'All clusters, networks, load balancers, and databases are provisioned exclusively via audited Terraform & Helm.', badge: '100% TERRAFORM' },
  { id: 4, title: 'Cryptographically Signed Container Artifacts', ruleText: 'All Docker images are scanned with Trivy, attested with Syft SBOM, and signed with Cosign before deployment.', badge: 'COSIGN SIGNED' },
  { id: 5, title: 'Autoscaling Under Burst Telemetry Spikes', ruleText: 'Horizontal Pod Autoscalers (HPA) scale pods dynamically to handle >1M telemetry packets/minute under 10ms latency.', badge: 'HPA BURST' },
  { id: 6, title: 'Istio Strict mTLS Service Mesh Traffic Isolation', ruleText: 'Inter-pod communication inside Kubernetes namespaces is encrypted with strictly enforced mutual TLS (mTLS).', badge: 'ISTIO mTLS' },
  { id: 7, title: 'Automated Health-Check Rollback Engine', ruleText: 'If HTTP 5xx error rate exceeds 0.01% or latency exceeds 250ms during rollout, deployment rolls back automatically.', badge: 'AUTO ROLLBACK' },
  { id: 8, title: 'PostgreSQL HA + TimescaleDB Telemetry Partitioning', ruleText: 'Database clusters feature automatic primary-to-replica failover with PostGIS and TimescaleDB hyper-tables.', badge: 'PG HA + TIMESCALE' },
  { id: 9, title: 'Prometheus & OpenTelemetry Golden Signal Metrics', ruleText: 'Continuous ingestion of latency, traffic, errors, and saturation metrics with instant Slack/PagerDuty alerts.', badge: 'GOLDEN SIGNALS' },
  { id: 10, title: 'Core Mission: 99.99% Sovereign Uptime Safeguard', ruleText: 'Provides reliable, fault-tolerant infrastructure protecting South Africa 12M+ learners 24 hours a day, 365 days a year.', badge: '99.99% UPTIME' },
];
