export const NAV_ITEMS = [
  {
    id: 'network-analysis',
    label: 'Network Analysis',
    iconKey: 'network-analysis',
    children: [
      { id: 'site-manager', label: 'Site Manager' },
    ],
  },
  {
    id: 'discovery',
    label: 'Discovery',
    iconKey: 'discovery',
    children: [
      { id: 'discover',           label: 'Discover' },
      { id: 'network-settings',   label: 'Network Settings' },
      { id: 'api-server-manager', label: 'API Server Manager' },
      { id: 'do-not-scan',        label: 'Do-Not-Scan' },
      { id: 'network-definition', label: 'Network Definition' },
      { id: 'api-authenticator',  label: 'API Authenticator' },
    ],
  },
  {
    id: 'benchmark',
    label: 'Benchmark',
    iconKey: 'benchmark',
    children: [
      { id: 'schedule-task',         label: 'Schedule Task' },
      { id: 'tune-live-access',      label: 'Tune Live Access' },
      { id: 'circuit-break-manager', label: 'Circuit Break Manager' },
    ],
  },
  {
    id: 'data-model',
    label: 'Data Model',
    iconKey: 'data-model',
    children: [
      { id: 'data-accuracy-resolution',  label: 'Data Accuracy Resolution' },
      { id: 'health-report',             label: 'Health Report' },
      { id: 'platform-validation-manager', label: 'Platform Validation Manager' },
      { id: 'tune-private-cli-settings', label: 'Tune Private CLI Settings' },
    ],
  },
  {
    id: 'map',
    label: 'Map',
    iconKey: 'map',
    children: [
      { id: 'update-map-manager', label: 'Update Map Manager' },
    ],
  },
  { id: 'settings', label: 'Settings', iconKey: 'settings', children: [] },
]
