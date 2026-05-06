import { useState, useCallback, useEffect } from 'react'
import AppShell from './components/layout/AppShell'
import StartPage from './components/pages/StartPage'
import ScheduleTaskPage from './components/pages/ScheduleTaskPage'
import TenantManagerPage from './components/pages/TenantManagerPage'
import PlaceholderPage from './components/pages/PlaceholderPage'
import { NAV_ITEMS } from './data/navItems'

const START_TAB = { id: 'start', label: 'Start Page' }
const APP_TABS = {
  'tenant-manager': { id: 'user-authorization', label: 'User Authorization' },
}

function getAppMode() {
  const appId = new URLSearchParams(window.location.search).get('app')
  return appId === 'tenant-manager' ? 'tenant-manager' : 'domain-manager'
}

function getInitialTab(appMode) {
  return appMode === 'tenant-manager' ? APP_TABS['tenant-manager'] : START_TAB
}

function renderPage(tabId) {
  if (tabId === 'start')         return <StartPage />
  if (tabId === 'schedule-task') return <ScheduleTaskPage />
  if (tabId === 'user-authorization') return <TenantManagerPage view="user-authorization" />
  if (tabId === 'domain-list') return <TenantManagerPage view="domain-list" />
  return <PlaceholderPage label={labelForTab(tabId)} />
}

function labelForTab(id) {
  const fixedLabels = {
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

export default function App() {
  const appMode = getAppMode()
  const initialTab = getInitialTab(appMode)
  const [openTabs,   setOpenTabs]   = useState([initialTab])
  const [activeTabId, setActiveTabId] = useState(initialTab.id)

  useEffect(() => {
    document.title = appMode === 'tenant-manager'
      ? 'Tenant Manager — NetBrain'
      : 'Domain Management — NetBrain'
  }, [appMode])

  const handleNavSelect = useCallback((item) => {
    setOpenTabs(prev => {
      if (prev.some(t => t.id === item.id)) return prev
      return [...prev, { id: item.id, label: item.label }]
    })
    setActiveTabId(item.id)
  }, [])

  const handleSwitchTab = useCallback((id) => {
    setActiveTabId(id)
  }, [])

  const handleCloseTab = useCallback((id) => {
    setOpenTabs(prev => {
      const idx  = prev.findIndex(t => t.id === id)
      const next = prev.filter(t => t.id !== id)
      if (activeTabId === id) {
        const newActive = next[Math.max(0, idx - 1)]
        setActiveTabId(newActive ? newActive.id : 'start')
      }
      return next
    })
  }, [activeTabId])

  return (
    <AppShell
      appMode={appMode}
      navItems={NAV_ITEMS}
      activeItemId={null}
      openTabs={openTabs}
      activeTabId={activeTabId}
      onSelectItem={handleNavSelect}
      onSwitchTab={handleSwitchTab}
      onCloseTab={handleCloseTab}
    >
      {/* Render all open tab pages; hide inactive ones to preserve state */}
      {openTabs.map(tab => (
        <div
          key={tab.id}
          style={{
            display: activeTabId === tab.id ? 'flex' : 'none',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {renderPage(tab.id)}
        </div>
      ))}
    </AppShell>
  )
}
