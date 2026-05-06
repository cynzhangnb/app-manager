import { useState, useRef, useEffect } from 'react'
import NavFlyout from './NavFlyout'
import DomainSwitcher from './DomainSwitcher'
import AccountMenu from './AccountMenu'

/* ── Icons ──────────────────────────────────────────────────────────────── */
function HamburgerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
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

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function LogoMark() {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: 4,
      background: '#378ADD',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>D</span>
    </div>
  )
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
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
const APPS = [
  { id: 'netbrain',         label: 'NetBrain',        href: '#' },
  { id: 'tenant-manager',   label: 'Tenant Manager',  href: '#' },
  { id: 'account-manager',  label: 'Account Manager', href: '#' },
  { id: 'domain-manager',   label: 'Domain Manager',  href: '#', current: true },
]

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
export default function Sidebar({ navItems, activeItemId, onSelectItem }) {
  const [expanded, setExpanded]         = useState(true)
  const [openCategories, setOpenCategories] = useState(new Set(['network-analysis']))
  const [flyout, setFlyout]             = useState(null) // { category, anchorTop }
  const [domainSwitcherOpen, setDomainSwitcherOpen] = useState(false)
  const [activeTenantId, setActiveTenantId] = useState('tenant-nblive')
  const [activeDomainId, setActiveDomainId] = useState('hybrid-network')
  const [domainAnchorRect, setDomainAnchorRect] = useState(null)
  const [contextHovered, setContextHovered] = useState(false)
  const [collapseHovered, setCollapseHovered] = useState(false)
  const [hoveredId, setHoveredId]       = useState(null)

  const domainTriggerRef = useRef(null)
  const sidebarRef     = useRef(null)

  const activeTenant = TENANTS.find(tenant => tenant.id === activeTenantId)
  const activeDomain = activeTenant?.domains.find(domain => domain.id === activeDomainId)

  /* After sidebar animates closed, overflow can be visible for flyouts */
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
    /* Collapsed: show flyout */
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
    setDomainAnchorRect(domainTriggerRef.current?.getBoundingClientRect() ?? null)
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
        background: '#fafafa',
        borderRight: '1px solid #e4e4e4',
        transition: 'width 0.22s ease, min-width 0.22s ease',
        overflow: containerOverflow,
        position: 'relative',
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      {/* ── Domain context ─────────────────────────────────────────────── */}
      {expanded ? (
        <div
          ref={domainTriggerRef}
          onMouseEnter={() => setContextHovered(true)}
          onMouseLeave={() => setContextHovered(false)}
          style={{
            borderBottom: '1px solid #ececec',
            background: ((contextHovered && !collapseHovered) || domainSwitcherOpen) ? '#f0ede7' : 'transparent',
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
              onClick={toggleDomainSwitcher}
              onMouseDown={e => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                border: 'none', background: 'transparent', cursor: 'pointer',
                padding: '4px 6px 4px 0', borderRadius: 4,
                minWidth: 0,
              }}
            >
              <LogoMark />
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}>
                <span>Domain Manager</span>
                <span style={{ color: '#6b7280' }}>
                  <ChevronDownIcon />
                </span>
              </span>
            </button>

            <button
              onClick={() => setExpanded(false)}
              title="Collapse sidebar"
              style={{
                width: 24, height: 24, border: 'none', background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#999', cursor: 'pointer', borderRadius: 4, flexShrink: 0,
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
            onClick={toggleDomainSwitcher}
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
              <span style={{
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {activeDomain?.name ?? 'Select Domain'}
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
              width: 32, height: 32, border: 'none', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#666', cursor: 'pointer', borderRadius: 4,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#ececec'}
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
              {/* Category row */}
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
                    ? '#ece9e2'
                    : isFlyoutOpen
                    ? '#f0ede7'
                    : hoveredId === category.id
                    ? '#f0ede7'
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
                  color: isCatActive ? '#378ADD' : '#555',
                }}>
                  <NavIcon iconKey={category.iconKey} />
                </span>

                {expanded && (
                  <>
                    <span style={{
                      fontSize: 13, color: isCatActive ? '#1a1a1a' : '#374151',
                      fontWeight: isCatActive ? 500 : 400,
                      flex: 1, textAlign: 'left', whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {category.label}
                    </span>
                    {hasChildren && (
                      <span style={{
                        color: '#666',
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

              {/* Sub-items (expanded mode only) */}
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
                          /* 12px container-left + 20px icon + 8px gap = 40px, aligns with category label */
                          padding: '0 10px 0 40px',
                          border: 'none',
                          borderLeft: isActive ? '2px solid #378ADD' : '2px solid transparent',
                          background: isActive
                            ? '#ece9e2'
                            : hoveredId === child.id
                            ? '#f0ede7'
                            : 'transparent',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: 12.5,
                          color: isActive ? '#1a1a1a' : '#444',
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
        borderTop: '1px solid #ececec',
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

      {expanded && domainSwitcherOpen && (
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
