import { useState, useCallback, useEffect } from 'react'
import AppShell from './components/layout/AppShell'
import StartPage from './components/pages/StartPage'
import ScheduleTaskPage from './components/pages/ScheduleTaskPage'
import TenantManagerPage from './components/pages/TenantManagerPage'
import PlaceholderPage from './components/pages/PlaceholderPage'
import { NAV_ITEMS } from './data/navItems'

const DOMAIN_HOME_ID = 'start'
const TENANT_HOME_ID = 'domain-list'

function getAppMode() {
  const appId = new URLSearchParams(window.location.search).get('app')
  return appId === 'tenant-manager' ? 'tenant-manager' : 'domain-manager'
}

function getInitialPageId(appMode) {
  return appMode === 'tenant-manager' ? TENANT_HOME_ID : DOMAIN_HOME_ID
}

function renderPage(pageId) {
  if (pageId === DOMAIN_HOME_ID) return <StartPage />
  if (pageId === 'schedule-task') return <ScheduleTaskPage />
  if (pageId === 'user-authorization') return <TenantManagerPage view="user-authorization" />
  if (pageId === TENANT_HOME_ID) return <TenantManagerPage view="domain-list" />
  return <PlaceholderPage label={labelForPage(pageId)} />
}

function labelForPage(id) {
  const fixedLabels = {
    start: 'Start Page',
    'user-authorization': 'User Authorization',
    'domain-list': 'Domain List',
    'advanced-settings': 'Advanced Settings',
    'multi-vendor-support': 'Multi-vendor Support',
    'gdr-data-configuration': 'GDR Data Configuration',
    'api-manager': 'API Manager',
    'platform-management-page': 'Platform Management',
    'topology-link-style': 'Topology Link Style',
    'cloud-type-definition': 'Cloud Type Definition',
    'misc-configuration': 'Misc Configuration',
    'interface-type': 'Interface Type',
    'live-thread-pool': 'Live Thread Pool',
  }
  if (fixedLabels[id]) return fixedLabels[id]

  for (const cat of NAV_ITEMS) {
    if (cat.id === id) return cat.label
    for (const child of cat.children) {
      if (child.id === id) return child.label
    }
  }
  return id
}

function getBreadcrumbConfig(appMode, pageId, onNavigateHome) {
  const homeId = appMode === 'tenant-manager' ? TENANT_HOME_ID : DOMAIN_HOME_ID
  const homeLabel = appMode === 'tenant-manager' ? 'Tenant Management' : 'Domain Management'

  if (pageId === homeId) {
    return { showBreadcrumb: false, breadcrumbItems: [] }
  }

  return {
    showBreadcrumb: true,
    breadcrumbItems: [
      { id: homeId, label: homeLabel, onClick: onNavigateHome },
      { id: pageId, label: labelForPage(pageId) },
    ],
  }
}

export default function App() {
  const appMode = getAppMode()
  const [currentPageId, setCurrentPageId] = useState(() => getInitialPageId(appMode))

  useEffect(() => {
    document.title = appMode === 'tenant-manager'
      ? 'Tenant Manager — NetBrain'
      : 'Domain Management — NetBrain'
  }, [appMode])

  useEffect(() => {
    setCurrentPageId(getInitialPageId(appMode))
  }, [appMode])

  const handleNavSelect = useCallback((item) => {
    setCurrentPageId(item.id)
  }, [])

  const handleNavigateHome = useCallback(() => {
    setCurrentPageId(getInitialPageId(appMode))
  }, [appMode])

  const { showBreadcrumb, breadcrumbItems } = getBreadcrumbConfig(
    appMode,
    currentPageId,
    handleNavigateHome
  )

  return (
    <AppShell
      appMode={appMode}
      navItems={NAV_ITEMS}
      activeItemId={currentPageId === DOMAIN_HOME_ID || currentPageId === TENANT_HOME_ID ? null : currentPageId}
      showBreadcrumb={showBreadcrumb}
      breadcrumbItems={breadcrumbItems}
      onSelectItem={handleNavSelect}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {renderPage(currentPageId)}
      </div>
    </AppShell>
  )
}
