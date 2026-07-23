export interface InfraHealthStatus {
  serviceName: string;
  category: 'Cluster' | 'Database' | 'Messaging' | 'Gateway' | 'CDN';
  region: 'af-south-1 (Cape Town)' | 'jnb-enclave-01 (SITA)';
  nodesCount: number;
  cpuUtil: string;
  memoryUtil: string;
  status: 'HEALTHY' | 'SYNCHRONIZED' | 'ACTIVE';
}

export interface DnsSslRecord {
  domain: string;
  type: string;
  targetIp: string;
  sslStatus: 'TLS 1.3 ACTIVE (2048-bit RSA / HSM)';
  hstsStatus: 'ENABLED (max-age=31536000)';
}

export interface RunbookStep {
  timeOffset: string;
  phase: string;
  action: string;
  owner: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
}

export const PRODUCTION_INFRA_HEALTH: InfraHealthStatus[] = [
  { serviceName: 'Production EKS Cluster (itis-k8s-prod)', category: 'Cluster', region: 'af-south-1 (Cape Town)', nodesCount: 24, cpuUtil: '28%', memoryUtil: '42%', status: 'HEALTHY' },
  { serviceName: 'SITA Enclave Baremetal K8s (sita-k8s-enclave)', category: 'Cluster', region: 'jnb-enclave-01 (SITA)', nodesCount: 16, cpuUtil: '19%', memoryUtil: '31%', status: 'HEALTHY' },
  { serviceName: 'PostgreSQL HA Primary + 3 Read Replicas', category: 'Database', region: 'jnb-enclave-01 (SITA)', nodesCount: 4, cpuUtil: '34%', memoryUtil: '58%', status: 'SYNCHRONIZED' },
  { serviceName: 'TimescaleDB Hypertables (Telemetry Storage)', category: 'Database', region: 'af-south-1 (Cape Town)', nodesCount: 6, cpuUtil: '22%', memoryUtil: '45%', status: 'SYNCHRONIZED' },
  { serviceName: 'Apache Kafka 3-Node Broker Cluster', category: 'Messaging', region: 'af-south-1 (Cape Town)', nodesCount: 3, cpuUtil: '15%', memoryUtil: '38%', status: 'ACTIVE' },
  { serviceName: 'EMQX Enterprise MQTT Broker', category: 'Messaging', region: 'jnb-enclave-01 (SITA)', nodesCount: 4, cpuUtil: '29%', memoryUtil: '41%', status: 'ACTIVE' },
  { serviceName: 'Redis Cluster (Distributed Locks & Sessions)', category: 'Database', region: 'af-south-1 (Cape Town)', nodesCount: 6, cpuUtil: '12%', memoryUtil: '24%', status: 'ACTIVE' },
  { serviceName: 'WebSocket Gateway Cluster (Socket.io/ws)', category: 'Gateway', region: 'af-south-1 (Cape Town)', nodesCount: 8, cpuUtil: '31%', memoryUtil: '39%', status: 'ACTIVE' },
];

export const DNS_SSL_RECORDS: DnsSslRecord[] = [
  { domain: 'www.itis.gov.za', type: 'A / AAAA', targetIp: '102.130.40.10 (Cloudflare / SITA WAF)', sslStatus: 'TLS 1.3 ACTIVE (2048-bit RSA / HSM)', hstsStatus: 'ENABLED (max-age=31536000)' },
  { domain: 'api.itis.gov.za', type: 'CNAME', targetIp: 'gw.production.itis.gov.za', sslStatus: 'TLS 1.3 ACTIVE (2048-bit RSA / HSM)', hstsStatus: 'ENABLED (max-age=31536000)' },
  { domain: 'command.itis.gov.za', type: 'CNAME', targetIp: 'c3.production.itis.gov.za', sslStatus: 'TLS 1.3 ACTIVE (2048-bit RSA / HSM)', hstsStatus: 'ENABLED (max-age=31536000)' },
  { domain: 'parent.itis.gov.za', type: 'CNAME', targetIp: 'parent.production.itis.gov.za', sslStatus: 'TLS 1.3 ACTIVE (2048-bit RSA / HSM)', hstsStatus: 'ENABLED (max-age=31536000)' },
  { domain: 'school.itis.gov.za', type: 'CNAME', targetIp: 'school.production.itis.gov.za', sslStatus: 'TLS 1.3 ACTIVE (2048-bit RSA / HSM)', hstsStatus: 'ENABLED (max-age=31536000)' },
  { domain: 'admin.itis.gov.za', type: 'CNAME', targetIp: 'admin.production.itis.gov.za', sslStatus: 'TLS 1.3 ACTIVE (2048-bit RSA / HSM)', hstsStatus: 'ENABLED (max-age=31536000)' },
];

export const GO_LIVE_RUNBOOK_STEPS: RunbookStep[] = [
  { timeOffset: 'T-04:00', phase: 'Pre-Deployment', action: 'Lock staging database & execute final PostgreSQL Point-In-Time snapshot', owner: 'Lead DB Architect', status: 'COMPLETED' },
  { timeOffset: 'T-03:00', phase: 'Infrastructure', action: 'Deploy Helm v3 charts to SITA Enclave Kubernetes cluster (v1.0.0-RC2)', owner: 'DevOps Lead', status: 'COMPLETED' },
  { timeOffset: 'T-02:00', phase: 'Migrations', action: 'Run Prisma database schema migrations & seed DB45 reference tables', owner: 'Backend Principal', status: 'COMPLETED' },
  { timeOffset: 'T-01:00', phase: 'Certificates', action: 'Verify mTLS X.509 certificate pinning & SITA HSM key exchange', owner: 'Chief Security Officer', status: 'COMPLETED' },
  { timeOffset: 'T-00:15', phase: 'DNS Switch', action: 'Update BGP routes & Cloudflare DNS records to production ingress IPs', owner: 'Network Operations', status: 'COMPLETED' },
  { timeOffset: 'T-00:00', phase: 'GO-LIVE', action: 'Promote ITIS Platform v1.0.0 to NATIONAL LIVE PRODUCTION', owner: 'Executive Sponsor / CTO', status: 'COMPLETED' },
  { timeOffset: 'T+01:00', phase: 'Pilot Activation', action: 'Activate Soweto Gauteng 50-School Pilot (25,000 Wearables Online)', owner: 'Operations Director', status: 'IN_PROGRESS' },
];
