import { useState, useRef, useEffect } from 'react'
import NavFlyout from './NavFlyout'
import DomainSwitcher from './DomainSwitcher'
import AccountMenu from './AccountMenu'

/* ── Icons ──────────────────────────────────────────────────────────────── */
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

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function DotIcon() {
  return (
    <span style={{
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: '#4b97ea',
      display: 'block',
      flexShrink: 0,
    }} />
  )
}

/* ── Nav icons keyed by iconKey ─────────────────────────────────────────── */
function NavIcon({ iconKey }) {
  const IC = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (iconKey) {
    case 'network-analysis':
      return <svg {...IC}><rect x="8" y="2" width="8" height="5" rx="1"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="4" y1="11" x2="20" y2="11"/><line x1="4" y1="11" x2="4" y2="16"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="20" y1="11" x2="20" y2="16"/><circle cx="4" cy="19" r="2.5"/><circle cx="12" cy="19" r="2.5"/><circle cx="20" cy="19" r="2.5"/></svg>
    case 'discovery':
      return <svg {...IC}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    case 'benchmark':
      return <svg {...IC}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    case 'data-model':
      return <svg {...IC}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
    case 'map':
      return <svg {...IC}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
    case 'path-application':
      return <svg {...IC}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
    case 'runbook-template':
      return <svg {...IC}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>
    case 'intent':
      return <svg {...IC}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    case 'incident':
      return <svg {...IC}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    case 'network-change':
      return <svg {...IC}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
    case 'backend':
      return <svg {...IC}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
    case 'settings':
      return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    default:
      return <svg {...IC}><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
  }
}

/* ── App switcher apps ──────────────────────────────────────────────────── */
const TENANTS = [
  {
    id: 'tenant-nblive',
    name: 'NBLIVE',
    domains: [
      { id: 'hybrid-network', name: 'Hybrid Network' },
      { id: 'cve-ongoing-project', name: 'CVE Ongoing Project' },
      { id: 'cve-release-domain', name: 'CVE Release Domain' },
      { id: 'dongxu-demo', name: 'Dongxu-Demo' },
    ],
  },
  {
    id: 'tenant-playground',
    name: 'NETBRAIN PLAYGROUND',
    domains: [
      { id: 'playground-1', name: 'Playground-1' },
    ],
  },
]

/* ── Main Sidebar ────────────────────────────────────────────────────────── */
export default function Sidebar({ expanded, onToggleExpand, onContextChange, navItems, activeItemId, onSelectItem }) {
  const [openCategories, setOpenCategories] = useState(new Set(['network-analysis']))
  const [flyout, setFlyout]             = useState(null)
  const [domainSwitcherOpen, setDomainSwitcherOpen] = useState(false)
  const [activeTenantId, setActiveTenantId] = useState('tenant-nblive')
  const [activeDomainId, setActiveDomainId] = useState('hybrid-network')
  const [domainAnchorRect, setDomainAnchorRect] = useState(null)
  const [hoveredId, setHoveredId]       = useState(null)

  const domainButtonRef = useRef(null)
  const sidebarRef      = useRef(null)

  const activeTenant = TENANTS.find(tenant => tenant.id === activeTenantId)
  const activeDomain = activeTenant?.domains.find(domain => domain.id === activeDomainId)

  useEffect(() => {
    onContextChange?.(activeDomain?.name ?? '')
  }, [activeDomainId, activeTenantId])

  const [overflow, setOverflow] = useState('hidden')
  useEffect(() => {
    if (!expanded) {
      const t = setTimeout(() => setOverflow('visible'), 230)
      return () => clearTimeout(t)
    } else {
      setOverflow('hidden')
    }
  }, [expanded])

  function toggleCategory(id) {
    setOpenCategories(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleCategoryIconClick(e, category) {
    if (expanded) {
      toggleCategory(category.id)
      return
    }
    if (category.children.length === 0) {
      onSelectItem(category)
      setFlyout(null)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    setFlyout(f =>
      f && f.category.id === category.id
        ? null
        : { category, anchorTop: rect.top }
    )
  }

  function handleDomainSelect(tenantId, domainId) {
    setActiveTenantId(tenantId)
    setActiveDomainId(domainId)
  }

  function toggleDomainSwitcher() {
    setDomainAnchorRect(domainButtonRef.current?.getBoundingClientRect() ?? null)
    setDomainSwitcherOpen(open => !open)
  }

  function handleOpenApp(app) {
    if (app.id === 'tenant-manager') {
      const url = new URL(window.location.href)
      url.searchParams.set('app', 'tenant-manager')
      window.open(url.toString(), '_blank')
      return
    }
    onSelectItem(app)
  }

  const SIDEBAR_W = expanded ? 220 : 44
  const containerOverflow = expanded ? 'visible' : overflow

  return (
    <div
      ref={sidebarRef}
      style={{
        width: SIDEBAR_W,
        minWidth: SIDEBAR_W,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#1c1c1e',
        borderRight: '1px solid #2e2e2e',
        transition: 'width 0.22s ease, min-width 0.22s ease',
        overflow: containerOverflow,
        position: 'relative',
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      {/* ── Domain context ─────────────────────────────────────────────── */}
      {expanded ? (
        <div style={{
          flexShrink: 0,
          height: 40,
          padding: '0 6px 0 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <button
            ref={domainButtonRef}
            onClick={toggleDomainSwitcher}
            onMouseDown={e => e.stopPropagation()}
            onMouseEnter={e => { if (!domainSwitcherOpen) e.currentTarget.style.background = '#525252' }}
            onMouseLeave={e => { if (!domainSwitcherOpen) e.currentTarget.style.background = '#4a4a4a' }}
            style={{
              flex: 1,
              minWidth: 0,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 2px 0 6px',
              border: 'none',
              borderRadius: 6,
              background: domainSwitcherOpen ? '#585858' : '#4a4a4a',
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
              flex: 1, minWidth: 0, textAlign: 'left',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {activeDomain?.name ?? 'Select Domain'}
            </span>
          </button>
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
        {navItems.map(category => {
          const hasChildren = category.children.length > 0
          const isOpen      = openCategories.has(category.id)
          const isCatActive = activeItemId === category.id ||
            (hasChildren && category.children.some(c => c.id === activeItemId))
          const isFlyoutOpen = flyout && flyout.category.id === category.id

          return (
            <div key={category.id}>
              <button
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={e => {
                  if (!expanded && !hasChildren) {
                    onSelectItem(category)
                    setFlyout(null)
                  } else {
                    handleCategoryIconClick(e, category)
                  }
                }}
                title={!expanded ? category.label : undefined}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: expanded ? '0 10px 0 12px' : '0',
                  height: 34,
                  border: 'none',
                  background: isCatActive
                    ? '#3a3a3a'
                    : isFlyoutOpen
                    ? '#363636'
                    : hoveredId === category.id
                    ? '#363636'
                    : 'transparent',
                  cursor: 'pointer',
                  justifyContent: expanded ? 'flex-start' : 'center',
                  borderLeft: isCatActive ? '2px solid #378ADD' : '2px solid transparent',
                  transition: 'background 0.1s',
                  position: 'relative',
                }}
              >
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 20, height: 20, flexShrink: 0,
                  color: isCatActive ? '#378ADD' : '#ffffff',
                }}>
                  <NavIcon iconKey={category.iconKey} />
                </span>

                {expanded && (
                  <>
                    <span style={{
                      fontSize: 13, color: isCatActive ? '#ffffff' : '#d0d0d0',
                      fontWeight: isCatActive ? 500 : 400,
                      flex: 1, textAlign: 'left', whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {category.label}
                    </span>
                    {hasChildren && (
                      <span style={{
                        color: '#b0b0b0',
                        transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transition: 'transform 0.18s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                      }}>
                        <ChevronDownIcon />
                      </span>
                    )}
                  </>
                )}
              </button>

              {expanded && hasChildren && isOpen && (
                <div>
                  {category.children.map(child => {
                    const isActive = activeItemId === child.id
                    return (
                      <button
                        key={child.id}
                        onClick={() => onSelectItem(child)}
                        onMouseEnter={() => setHoveredId(child.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          height: 30,
                          padding: '0 10px 0 40px',
                          border: 'none',
                          borderLeft: isActive ? '2px solid #378ADD' : '2px solid transparent',
                          background: isActive
                            ? '#3a3a3a'
                            : hoveredId === child.id
                            ? '#363636'
                            : 'transparent',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: 12.5,
                          color: isActive ? '#ffffff' : '#c0c0c0',
                          fontWeight: isActive ? 500 : 400,
                          transition: 'background 0.1s',
                        }}
                      >
                        {child.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid #2e2e2e',
        padding: '6px 0',
        flexShrink: 0,
      }}>
        <AccountMenu expanded={expanded} />
      </div>

      {/* ── Flyout (collapsed mode) ─────────────────────────────────────── */}
      {!expanded && flyout && (
        <NavFlyout
          category={flyout.category}
          anchorTop={flyout.anchorTop}
          onSelectItem={onSelectItem}
          onClose={() => setFlyout(null)}
        />
      )}

      {domainSwitcherOpen && (
        <DomainSwitcher
          anchorRect={domainAnchorRect}
          tenants={TENANTS}
          activeTenantId={activeTenantId}
          activeDomainId={activeDomainId}
          onSelect={handleDomainSelect}
          onOpenApp={handleOpenApp}
          onClose={() => setDomainSwitcherOpen(false)}
        />
      )}
    </div>
  )
}
