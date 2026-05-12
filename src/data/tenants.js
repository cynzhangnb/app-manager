export const MANAGED_TENANTS = [
  {
    id: 'tenant-acme',
    name: 'Acme Ops',
    domains: [
      { id: 'domain-hybrid', name: 'Hybrid Network' },
      { id: 'domain-backup', name: 'Backup' },
      { id: 'domain-gal', name: 'GAL&RuleDiscoveryDEV' },
      { id: 'domain-cve', name: 'CVE Ongoing Project' },
      { id: 'domain-training', name: 'training' },
      { id: 'domain-dongxu', name: 'Dongxu-Demo' },
      { id: 'domain-saas', name: 'For SaaS Test' },
    ],
  },
  {
    id: 'tenant-nblive',
    name: 'NBLive',
    domains: [
      { id: 'domain-nblive-prod', name: 'Production Network' },
      { id: 'domain-nblive-staging', name: 'Staging' },
      { id: 'domain-nblive-lab', name: 'Lab Environment' },
    ],
  },
  {
    id: 'tenant-bluewave',
    name: 'BlueWave Labs',
    domains: [
      { id: 'domain-bw-core', name: 'Core Infrastructure' },
      { id: 'domain-bw-edge', name: 'Edge Network' },
    ],
  },
]
