import { useEffect, useRef, useState } from 'react'
import NavFlyout from './NavFlyout'
import TenantSwitcher from './TenantSwitcher'
import AccountMenu from './AccountMenu'

const TENANT_NAV = [
  {
    id: 'tenant-management',
    label: 'Tenant Management',
    iconKey: 'tenant-management',
    items: [
      { id: 'user-authorization', label: 'User Authorization' },
      { id: 'domain-list', label: 'Domain List' },
      { id: 'advanced-settings', label: 'Advanced Settings' },
    ],
  },
  {
    id: 'platform-management',
    label: 'Platform Management',
    iconKey: 'platform-management',
    items: [
      { id: 'multi-vendor-support', label: 'Multi-vendor Support' },
      { id: 'gdr-data-configuration', label: 'GDR Data Configuration' },
      { id: 'api-manager', label: 'API Manager' },
      { id: 'platform-management-page', label: 'Platform Management' },
      { id: 'topology-link-style', label: 'Topology Link Style' },
      { id: 'cloud-type-definition', label: 'Cloud Type Definition' },
      { id: 'misc-configuration', label: 'Misc Configuration' },
      { id: 'interface-type', label: 'Interface Type' },
      { id: 'live-thread-pool', label: 'Live Thread Pool' },
    ],
  },
]

const TENANTS = [
  { id: 'tenant-nblive', name: 'NBLive' },
  { id: 'tenant-acme', name: 'Acme Ops' },
  { id: 'tenant-bluewave', name: 'BlueWave Labs' },
]

function CollapseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M28,4H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6A2,2,0,0,0,28,4ZM4,6h6V26H4ZM28,26H12V6H28Z"/>
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function CategoryIcon({ iconKey }) {
  const shared = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (iconKey === 'tenant-management') {
    return (
      <svg {...shared}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  }
  return (
    <svg {...shared}>
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  )
}

function DotIcon() {
  return (
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4b97ea', display: 'block', flexShrink: 0 }} />
  )
}

export default function TenantSidebar({ expanded, onToggleExpand, onContextChange, activeItemId, onSelectItem }) {
  const [openSections, setOpenSections] = useState(new Set(TENANT_NAV.map(s => s.id)))
  const [flyout, setFlyout]             = useState(null)
  const [hoveredId, setHoveredId]       = useState(null)
  const [tenantSwitcherOpen, setTenantSwitcherOpen] = useState(false)
  const [activeTenantId, setActiveTenantId] = useState(TENANTS[0].id)
  const [tenantAnchorRect, setTenantAnchorRect] = useState(null)
  const [searchQuery, setSearchQuery]   = useState('')

  const tenantButtonRef = useRef(null)

  const activeTenant = TENANTS.find(t => t.id === activeTenantId)

  useEffect(() => {
    onContextChange?.(activeTenant?.name ?? '')
  }, [activeTenantId])

  const [overflow, setOverflow] = useState('hidden')
  useEffect(() => {
    if (!expanded) {
      const t = setTimeout(() => setOverflow('visible'), 230)
      return () => clearTimeout(t)
    }
    setOverflow('hidden')
  }, [expanded])

  function toggleSection(id) {
    setOpenSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleCategoryClick(e, section) {
    if (expanded) {
      toggleSection(section.id)
      return
    }
    if (section.items.length === 0) {
      onSelectItem(section)
      setFlyout(null)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    setFlyout(f =>
      f && f.category.id === section.id
        ? null
        : { category: { id: section.id, label: section.label, children: section.items }, anchorTop: rect.top }
    )
  }

  function toggleTenantSwitcher() {
    setTenantAnchorRect(tenantButtonRef.current?.getBoundingClientRect() ?? null)
    setTenantSwitcherOpen(open => !open)
  }

  function handleOpenApp(app) {
    if (app.id === 'domain-manager') {
      const a = document.createElement('a')
      a.href = new URL(window.location.href).origin + (new URL(window.location.href).pathname)
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      a.click()
    }
  }

  const SIDEBAR_W = expanded ? 220 : 44
  const containerOverflow = expanded ? 'visible' : overflow
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const isFiltering = normalizedQuery.length > 0
  const visibleSections = TENANT_NAV
    .map(section => {
      const sectionMatches = section.label.toLowerCase().includes(normalizedQuery)
      const matchingItems = section.items.filter(item =>
        item.label.toLowerCase().includes(normalizedQuery)
      )

      if (!isFiltering) return section
      if (sectionMatches) return section
      if (matchingItems.length > 0) {
        return { ...section, items: matchingItems }
      }
      return null
    })
    .filter(Boolean)

  return (
    <div style={{
      width: SIDEBAR_W,
      minWidth: SIDEBAR_W,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#1c1c1e',
      borderRight: '1px solid #2e2e2e',
      transition: 'width 0.22s ease, min-width 0.22s ease',
      overflow: containerOverflow,
      flexShrink: 0,
      position: 'relative',
      zIndex: 100,
    }}>

      {/* ── Tenant context ─────────────────────────────────────────────── */}
      {expanded ? (
        <div style={{
          flexShrink: 0,
          padding: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{
              flex: 1,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '0 9px',
              borderRadius: 6,
              background: '#2a2a2d',
              border: '1px solid #36363a',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" />
                <line x1="20" y1="20" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search navigation"
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: '#ededed',
                  fontSize: 12.5,
                }}
              />
            </div>
            <button
              onClick={onToggleExpand}
              title="Collapse sidebar"
              style={{
                width: 28, height: 28, border: 'none', background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#c0c0c0', cursor: 'pointer', borderRadius: 4, flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#2e2e2e'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <CollapseIcon />
            </button>
          </div>
          <button
            ref={tenantButtonRef}
            onClick={toggleTenantSwitcher}
            onMouseDown={e => e.stopPropagation()}
            onMouseEnter={e => { if (!tenantSwitcherOpen) e.currentTarget.style.background = '#525252' }}
            onMouseLeave={e => { if (!tenantSwitcherOpen) e.currentTarget.style.background = '#4a4a4a' }}
            style={{
              width: '100%',
              minWidth: 0,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 6px',
              border: 'none',
              borderRadius: 6,
              background: tenantSwitcherOpen ? '#585858' : '#4a4a4a',
              cursor: 'pointer',
              textAlign: 'left',
              outline: 'none',
              transition: 'background 0.14s ease',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, flexShrink: 0 }}>
              <DotIcon />
            </span>
            <span style={{
              fontSize: 13, color: '#ebebeb', fontWeight: 500,
              flex: 1, minWidth: 0, textAlign: 'left', whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {activeTenant?.name ?? 'Select Tenant'}
            </span>
          </button>
        </div>
      ) : (
        <div style={{
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <button
            onClick={onToggleExpand}
            title="Expand sidebar"
            style={{
              width: 32, height: 28, border: 'none', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', cursor: 'pointer', borderRadius: 4,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2e2e2e'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <HamburgerIcon />
          </button>
        </div>
      )}

      {/* ── Nav items ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '6px 0' }}>
        {visibleSections.map(section => {
          const hasChildren   = section.items.length > 0
          const isOpen        = openSections.has(section.id)
          const hasActiveChild = hasChildren && section.items.some(item => item.id === activeItemId)
          const isSectionActive = activeItemId === section.id
          const isCollapsedActive = !expanded && (isSectionActive || hasActiveChild)
          const showItems = expanded && hasChildren && (isFiltering || isOpen)

          return (
            <div key={section.id}>
              <button
                onClick={e => handleCategoryClick(e, section)}
                onMouseEnter={() => setHoveredId(section.id)}
                onMouseLeave={() => setHoveredId(null)}
                title={!expanded ? section.label : undefined}
                style={{
                  width: '100%',
                  height: 34,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: expanded ? '0 10px 0 12px' : '0',
                  border: 'none',
                  borderLeft: expanded
                    ? (isSectionActive ? '2px solid #378ADD' : '2px solid transparent')
                    : (isCollapsedActive ? '2px solid #378ADD' : '2px solid transparent'),
                  background: isCollapsedActive ? '#3a3a3a' : isSectionActive ? '#3a3a3a' : hoveredId === section.id ? '#363636' : 'transparent',
                  cursor: 'pointer',
                  justifyContent: expanded ? 'flex-start' : 'center',
                  transition: 'background 0.1s',
                  position: 'relative',
                }}
              >
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 20, height: 20, flexShrink: 0,
                  color: '#ffffff',
                }}>
                  <CategoryIcon iconKey={section.iconKey} />
                </span>

                {expanded && (
                  <>
                    <span style={{
                      fontSize: 13,
                      color: isSectionActive ? '#ffffff' : '#d0d0d0',
                      fontWeight: isSectionActive ? 600 : 400,
                      flex: 1, textAlign: 'left', whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {section.label}
                    </span>
                    {hasChildren && (
                      <span style={{
                        color: '#b0b0b0',
                        transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transition: 'transform 0.18s ease',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 20, height: 20, flexShrink: 0,
                      }}>
                        <ChevronIcon />
                      </span>
                    )}
                  </>
                )}
              </button>

              {showItems && section.items.map(item => {
                const isActive = activeItemId === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      width: '100%',
                      height: 30,
                      display: 'flex',
                      alignItems: 'center',
                      border: 'none',
                      borderLeft: isActive ? '2px solid #378ADD' : '2px solid transparent',
                      background: isActive ? '#3a3a3a' : hoveredId === item.id ? '#363636' : 'transparent',
                      padding: '0 10px 0 40px',
                      cursor: 'pointer',
                      color: isActive ? '#ffffff' : '#c0c0c0',
                      fontSize: 12.5,
                      fontWeight: isActive ? 500 : 400,
                      textAlign: 'left',
                      transition: 'background 0.1s',
                    }}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #2e2e2e', padding: '6px 0', flexShrink: 0 }}>
        <AccountMenu expanded={expanded} appMode="tenant-manager" />
      </div>

      {tenantSwitcherOpen && (
        <TenantSwitcher
          anchorRect={tenantAnchorRect}
          tenants={TENANTS}
          activeTenantId={activeTenantId}
          onSelectTenant={id => { setActiveTenantId(id) }}
          onOpenApp={handleOpenApp}
          onClose={() => setTenantSwitcherOpen(false)}
        />
      )}

      {!expanded && flyout && (
        <NavFlyout
          category={flyout.category}
          anchorTop={flyout.anchorTop}
          activeItemId={activeItemId}
          onSelectItem={onSelectItem}
          onClose={() => setFlyout(null)}
        />
      )}
    </div>
  )
}
