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

function CollapseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M28,4H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6A2,2,0,0,0,28,4ZM4,6h6V26H4ZM28,26H12V6H28Z"/>
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
  const shared = {
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

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
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
    </svg>
  )
}

function LogoMark() {
  return (
    <div style={{
      width: 22,
      height: 22,
      borderRadius: 4,
      background: '#378ADD',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, lineHeight: 1 }}>T</span>
    </div>
  )
}

export default function TenantSidebar({ activeItemId, onSelectItem }) {
  const [expanded, setExpanded] = useState(true)
  const [openSections, setOpenSections] = useState(new Set(TENANT_NAV.map(section => section.id)))
  const [flyout, setFlyout] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [tenantSwitcherOpen, setTenantSwitcherOpen] = useState(false)
  const [activeTenantId, setActiveTenantId] = useState(TENANTS[0].id)
  const [tenantAnchorRect, setTenantAnchorRect] = useState(null)
  const [contextHovered, setContextHovered] = useState(false)
  const [collapseHovered, setCollapseHovered] = useState(false)

  const tenantTriggerRef = useRef(null)

  const activeTenant = TENANTS.find(tenant => tenant.id === activeTenantId)

  const [overflow, setOverflow] = useState('hidden')
  useEffect(() => {
    if (!expanded) {
      const timer = setTimeout(() => setOverflow('visible'), 230)
      return () => clearTimeout(timer)
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

  function handleCategoryIconClick(event, section) {
    if (expanded) {
      toggleSection(section.id)
      return
    }

    if (section.items.length === 0) {
      onSelectItem(section)
      setFlyout(null)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    setFlyout(current =>
      current && current.category.id === section.id
        ? null
        : {
            category: {
              id: section.id,
              label: section.label,
              children: section.items,
            },
            anchorTop: rect.top,
          }
    )
  }

  function toggleTenantSwitcher() {
    setTenantAnchorRect(tenantTriggerRef.current?.getBoundingClientRect() ?? null)
    setTenantSwitcherOpen(open => !open)
  }

  function handleOpenApp(app) {
    if (app.id === 'domain-manager') {
      const url = new URL(window.location.href)
      url.searchParams.delete('app')
      window.open(url.toString(), '_blank')
      return
    }
    if (app.id === 'tenant-manager') return
  }

  const width = expanded ? 220 : 44
  const containerOverflow = expanded ? 'visible' : overflow

  return (
    <div style={{
      width,
      minWidth: width,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#fafafa',
      borderRight: '1px solid #e4e4e4',
      transition: 'width 0.22s ease, min-width 0.22s ease',
      overflow: containerOverflow,
      flexShrink: 0,
      position: 'relative',
      zIndex: 100,
    }}>
      {expanded ? (
        <div
          ref={tenantTriggerRef}
          onMouseEnter={() => setContextHovered(true)}
          onMouseLeave={() => setContextHovered(false)}
          style={{
            borderBottom: '1px solid #ececec',
            background: ((contextHovered && !collapseHovered) || tenantSwitcherOpen) ? '#f0ede7' : 'transparent',
            flexShrink: 0,
            transition: 'background 0.1s',
          }}
        >
          <div style={{
            height: 36,
            display: 'flex',
            alignItems: 'center',
            padding: '4px 10px 0 12px',
            justifyContent: 'space-between',
            position: 'relative',
          }}>
            <button
              onClick={toggleTenantSwitcher}
              onMouseDown={e => e.stopPropagation()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: '4px 6px 4px 0',
                borderRadius: 4,
                minWidth: 0,
              }}
            >
              <LogoMark />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#374151', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                Tenant Manager
              </span>
            </button>

            <button
              onClick={() => setExpanded(false)}
              title="Collapse sidebar"
              style={{
                width: 24,
                height: 24,
                border: 'none',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                cursor: 'pointer',
                borderRadius: 4,
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                setCollapseHovered(true)
                e.currentTarget.style.background = '#ececec'
              }}
              onMouseLeave={e => {
                setCollapseHovered(false)
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <CollapseIcon />
            </button>
          </div>

          <button
            onClick={toggleTenantSwitcher}
            onMouseDown={e => e.stopPropagation()}
            style={{
              width: '100%',
              height: 24,
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px 8px 42px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              outline: 'none',
              boxShadow: 'none',
            }}
          >
            <span style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 13,
              fontWeight: 400,
              color: '#374151',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              <span>Tenant:</span>
              <span style={{
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {activeTenant?.name ?? 'Select Tenant'}
              </span>
            </span>
          </button>
        </div>
      ) : (
        <div style={{
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #ececec',
          flexShrink: 0,
        }}>
          <button
            onClick={() => setExpanded(true)}
            title="Expand sidebar"
            style={{
              width: 32,
              height: 32,
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              cursor: 'pointer',
              borderRadius: 4,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#ececec'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <HamburgerIcon />
          </button>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '6px 0' }}>
        {TENANT_NAV.map(section => {
          const hasChildren = section.items.length > 0
          const open = openSections.has(section.id)
          const isSectionActive = activeItemId === section.id ||
            (hasChildren && section.items.some(item => item.id === activeItemId))

          return (
            <div key={section.id}>
              <button
                onClick={event => handleCategoryIconClick(event, section)}
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
                  borderLeft: isSectionActive ? '2px solid #378ADD' : '2px solid transparent',
                  background: isSectionActive
                    ? '#ece9e2'
                    : hoveredId === section.id
                    ? '#f0ede7'
                    : 'transparent',
                  cursor: 'pointer',
                  justifyContent: expanded ? 'flex-start' : 'center',
                  transition: 'background 0.1s',
                  position: 'relative',
                }}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  flexShrink: 0,
                  color: isSectionActive ? '#378ADD' : '#555',
                }}>
                  <CategoryIcon iconKey={section.iconKey} />
                </span>

                {expanded && (
                  <>
                    <span style={{
                      fontSize: 13,
                      color: isSectionActive ? '#1a1a1a' : '#374151',
                      fontWeight: isSectionActive ? 500 : 400,
                      flex: 1,
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {section.label}
                    </span>
                    {hasChildren && (
                      <span style={{
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 20,
                        transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transition: 'transform 0.18s ease',
                        flexShrink: 0,
                      }}>
                        <ChevronIcon />
                      </span>
                    )}
                  </>
                )}
              </button>

              {expanded && hasChildren && open && section.items.map(item => {
                const hovered = hoveredId === item.id
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
                      background: isActive ? '#ece9e2' : hovered ? '#f0ede7' : 'transparent',
                      padding: '0 10px 0 40px',
                      borderLeft: isActive ? '2px solid #378ADD' : '2px solid transparent',
                      cursor: 'pointer',
                      color: isActive ? '#1a1a1a' : '#444',
                      fontSize: 12.5,
                      fontWeight: isActive ? 500 : 400,
                      textAlign: 'left',
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

      <div style={{
        borderTop: '1px solid #ececec',
        padding: '6px 0',
        flexShrink: 0,
      }}>
        <AccountMenu expanded={expanded} />
      </div>

      {expanded && tenantSwitcherOpen && (
        <TenantSwitcher
          anchorRect={tenantAnchorRect}
          tenants={TENANTS}
          activeTenantId={activeTenantId}
          onSelectTenant={setActiveTenantId}
          onOpenApp={handleOpenApp}
          onClose={() => setTenantSwitcherOpen(false)}
        />
      )}

      {!expanded && flyout && (
        <NavFlyout
          category={flyout.category}
          anchorTop={flyout.anchorTop}
          onSelectItem={onSelectItem}
          onClose={() => setFlyout(null)}
        />
      )}
    </div>
  )
}
