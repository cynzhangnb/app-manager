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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.6446 10.7815C21.0843 11.62 21.7848 12.954 21.9882 13.9719C22.1585 14.8269 20.434 14.9521 20.434 14.9521C20.434 14.9521 20.6029 15.1456 20.6201 15.4358C20.6381 15.7288 20.2724 15.9223 20.2724 15.9223C20.2724 15.9223 20.6941 16.2281 20.5325 16.5382C20.3715 16.8468 20.0144 16.9365 20.0144 16.9365C20.0144 16.9365 20.5282 18.4984 19.4066 19.3861C18.3899 20.1883 15.9929 19.6322 15.9929 19.6322C15.9929 19.6322 15.8363 19.8498 15.6559 20.5285C15.4756 21.2084 15.4267 21.8499 15.5956 22.2881C15.7644 22.722 15.089 23.0036 14.1406 22.9695C12.4643 22.9085 10.4676 21.4094 9.73398 20.8589C9.69805 20.8323 9.66572 20.8079 9.63626 20.786C9.30503 20.5398 8.90841 20.6111 8.5664 20.6726C8.256 20.7284 7.99087 20.7762 7.85939 20.5711C7.5842 20.1401 9.0011 18.7759 10.2499 19.6351C10.5344 19.8305 10.852 20.0843 11.1861 20.3507C11.6783 20.7435 12.2049 21.1636 12.7079 21.4644C13.79 22.116 14.5221 21.8784 14.5221 21.8784C14.5221 21.8784 14.4481 21.0817 14.6163 20.4117C14.7743 19.773 15.3628 18.4643 15.3628 18.4643C15.3628 18.4643 18.4653 19.4473 19.1134 18.4998C19.4339 18.0333 19.14 16.6861 19.0919 16.5168C19.0437 16.3447 19.7673 16.2238 19.7673 16.2238C19.7673 16.2238 19.4504 16.0489 19.487 15.8299C19.5179 15.6448 19.6839 15.5226 19.8513 15.4486C19.9311 15.4138 19.8563 15.3306 19.7543 15.2178C19.6437 15.0949 19.5014 14.937 19.4942 14.7686C19.4827 14.4912 20.1811 14.2508 20.8041 14.0587C21.1432 13.954 21.1145 13.8721 21.0203 13.6058C21.0074 13.5685 20.993 13.5276 20.9779 13.4826C20.9133 13.2862 20.5238 12.5288 20.1402 11.7807C19.8175 11.1524 19.4978 10.5308 19.3771 10.2535C19.2679 10.0027 19.3074 9.82836 19.3649 9.57408C19.4461 9.21411 19.5639 8.69383 19.3476 7.56915C18.7635 4.53058 15.3111 0.844801 9.05139 1.90468C6.55242 2.32854 4.43927 4.00288 3.66831 5.23909C2.89879 6.47522 2.1034 8.35736 2.7903 10.6376C3.33421 12.4425 4.1296 13.0224 5.08522 13.72C5.42364 13.9663 5.78145 14.2274 6.15508 14.5623C7.99015 16.2038 7.12938 18.9552 7.12938 18.9552C7.12938 18.9552 7.46564 16.5937 6.15579 15.1782C5.92875 14.9327 5.60398 14.713 5.23323 14.4625C4.3006 13.8319 3.07986 13.0064 2.40661 11.0842C1.75492 9.21784 1.59038 6.36845 4.22372 3.64019C6.85562 0.911701 11.3442 0.440912 14.9892 1.66995C19.3419 3.13663 20.1667 6.62467 20.2544 7.39276C20.3536 8.25899 20.3069 8.87454 20.2731 9.31772C20.2487 9.64457 20.2307 9.87772 20.2839 10.0487C20.3219 10.1666 20.4606 10.4307 20.6446 10.7815ZM12.238 9.36729C15.5941 8.67163 16.3903 7.06569 16.1546 5.59756C15.9096 4.07113 14.022 2.55192 10.2226 3.20343C6.42093 3.85639 4.90775 6.02859 5.1894 7.33441C5.52063 8.85801 9.51339 9.93484 12.238 9.36729ZM5.37981 7.1111C5.24473 5.98872 6.89946 4.47939 10.1198 3.92745C13.3387 3.3727 15.1214 4.50072 15.0991 5.84652C15.0761 7.15802 14.1923 8.27487 11.7587 8.78401C9.45017 9.26907 5.54938 8.52225 5.37981 7.1111Z" fill="#ffffff"/>
    </svg>
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
  const domainButtonRef  = useRef(null)
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
        <div
          ref={domainTriggerRef}
          onMouseEnter={() => setContextHovered(true)}
          onMouseLeave={() => setContextHovered(false)}
          style={{
            flexShrink: 0,
            padding: '0 8px 4px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{
            height: 40,
            display: 'flex',
            alignItems: 'center',
            padding: '0 2px 3px 6px',
            justifyContent: 'space-between',
            position: 'relative',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              minWidth: 0,
              cursor: 'default',
            }}>
              <LogoMark />
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#e0e0e0',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}>
                Domain Management
              </span>
            </div>

            <button
              onClick={() => setExpanded(false)}
              title="Collapse sidebar"
              style={{
                width: 24, height: 24, border: 'none', background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#c0c0c0', cursor: 'pointer', borderRadius: 4, flexShrink: 0,
              }}
              onMouseEnter={e => {
                setCollapseHovered(true)
                e.currentTarget.style.background = '#2e2e2e'
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
            ref={domainButtonRef}
            onClick={toggleDomainSwitcher}
            onMouseDown={e => e.stopPropagation()}
            style={{
              width: '100%',
              height: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 2px 0 6px',
              border: 'none',
              borderRadius: 6,
              background: domainSwitcherOpen
                ? '#585858'
                : contextHovered
                ? '#525252'
                : '#4a4a4a',
              cursor: 'pointer',
              textAlign: 'left',
              outline: 'none',
              transition: 'background 0.14s ease',
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
              flexShrink: 0,
            }}>
              <DotIcon />
            </span>
            <span style={{
              fontSize: 13,
              color: '#ebebeb',
              fontWeight: 500,
              flex: 1,
              minWidth: 0,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {activeDomain?.name ?? 'Select Domain'}
            </span>
          </button>
        </div>
      ) : (
        <div style={{
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #2e2e2e',
          flexShrink: 0,
        }}>
          <button
            onClick={() => setExpanded(true)}
            title="Expand sidebar"
            style={{
              width: 32, height: 32, border: 'none', background: 'transparent',
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
