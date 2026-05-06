import Sidebar from './Sidebar'
import TenantSidebar from './TenantSidebar'
import TabBar from '../tabs/TabBar'

export default function AppShell({ appMode = 'domain-manager', navItems, activeItemId, openTabs, activeTabId, onSelectItem, onSwitchTab, onCloseTab, children }) {
  const SidebarComponent = appMode === 'tenant-manager' ? TenantSidebar : Sidebar

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Left sidebar */}
        <SidebarComponent
          navItems={navItems}
          activeItemId={activeItemId}
          onSelectItem={onSelectItem}
        />

        {/* Main content area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>
          {/* Tab bar */}
          <TabBar
            tabs={openTabs}
            activeTabId={activeTabId}
            onSwitchTab={onSwitchTab}
            onCloseTab={onCloseTab}
          />

          {/* Page content */}
          <div style={{ flex: 1, overflow: 'auto', background: '#f9f9f9' }}>
            {children}
          </div>
        </div>
    </div>
  )
}
