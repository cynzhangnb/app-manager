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

function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.6446 10.7815C21.0843 11.62 21.7848 12.954 21.9882 13.9719C22.1585 14.8269 20.434 14.9521 20.434 14.9521C20.434 14.9521 20.6029 15.1456 20.6201 15.4358C20.6381 15.7288 20.2724 15.9223 20.2724 15.9223C20.2724 15.9223 20.6941 16.2281 20.5325 16.5382C20.3715 16.8468 20.0144 16.9365 20.0144 16.9365C20.0144 16.9365 20.5282 18.4984 19.4066 19.3861C18.3899 20.1883 15.9929 19.6322 15.9929 19.6322C15.9929 19.6322 15.8363 19.8498 15.6559 20.5285C15.4756 21.2084 15.4267 21.8499 15.5956 22.2881C15.7644 22.722 15.089 23.0036 14.1406 22.9695C12.4643 22.9085 10.4676 21.4094 9.73398 20.8589C9.69805 20.8323 9.66572 20.8079 9.63626 20.786C9.30503 20.5398 8.90841 20.6111 8.5664 20.6726C8.256 20.7284 7.99087 20.7762 7.85939 20.5711C7.5842 20.1401 9.0011 18.7759 10.2499 19.6351C10.5344 19.8305 10.852 20.0843 11.1861 20.3507C11.6783 20.7435 12.2049 21.1636 12.7079 21.4644C13.79 22.116 14.5221 21.8784 14.5221 21.8784C14.5221 21.8784 14.4481 21.0817 14.6163 20.4117C14.7743 19.773 15.3628 18.4643 15.3628 18.4643C15.3628 18.4643 18.4653 19.4473 19.1134 18.4998C19.4339 18.0333 19.14 16.6861 19.0919 16.5168C19.0437 16.3447 19.7673 16.2238 19.7673 16.2238C19.7673 16.2238 19.4504 16.0489 19.487 15.8299C19.5179 15.6448 19.6839 15.5226 19.8513 15.4486C19.9311 15.4138 19.8563 15.3306 19.7543 15.2178C19.6437 15.0949 19.5014 14.937 19.4942 14.7686C19.4827 14.4912 20.1811 14.2508 20.8041 14.0587C21.1432 13.954 21.1145 13.8721 21.0203 13.6058C21.0074 13.5685 20.993 13.5276 20.9779 13.4826C20.9133 13.2862 20.5238 12.5288 20.1402 11.7807C19.8175 11.1524 19.4978 10.5308 19.3771 10.2535C19.2679 10.0027 19.3074 9.82836 19.3649 9.57408C19.4461 9.21411 19.5639 8.69383 19.3476 7.56915C18.7635 4.53058 15.3111 0.844801 9.05139 1.90468C6.55242 2.32854 4.43927 4.00288 3.66831 5.23909C2.89879 6.47522 2.1034 8.35736 2.7903 10.6376C3.33421 12.4425 4.1296 13.0224 5.08522 13.72C5.42364 13.9663 5.78145 14.2274 6.15508 14.5623C7.99015 16.2038 7.12938 18.9552 7.12938 18.9552C7.12938 18.9552 7.46564 16.5937 6.15579 15.1782C5.92875 14.9327 5.60398 14.713 5.23323 14.4625C4.3006 13.8319 3.07986 13.0064 2.40661 11.0842C1.75492 9.21784 1.59038 6.36845 4.22372 3.64019C6.85562 0.911701 11.3442 0.440912 14.9892 1.66995C19.3419 3.13663 20.1667 6.62467 20.2544 7.39276C20.3536 8.25899 20.3069 8.87454 20.2731 9.31772C20.2487 9.64457 20.2307 9.87772 20.2839 10.0487C20.3219 10.1666 20.4606 10.4307 20.6446 10.7815ZM12.238 9.36729C15.5941 8.67163 16.3903 7.06569 16.1546 5.59756C15.9096 4.07113 14.022 2.55192 10.2226 3.20343C6.42093 3.85639 4.90775 6.02859 5.1894 7.33441C5.52063 8.85801 9.51339 9.93484 12.238 9.36729ZM5.37981 7.1111C5.24473 5.98872 6.89946 4.47939 10.1198 3.92745C13.3387 3.3727 15.1214 4.50072 15.0991 5.84652C15.0761 7.15802 14.1923 8.27487 11.7587 8.78401C9.45017 9.26907 5.54938 8.52225 5.37981 7.1111Z" fill="#ffffff"/>
    </svg>
  )
}

function DotIcon() {
  return (
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4b97ea', display: 'block', flexShrink: 0 }} />
  )
}

export default function TenantSidebar({ activeItemId, onSelectItem }) {
  const [expanded, setExpanded]         = useState(true)
  const [openSections, setOpenSections] = useState(new Set(TENANT_NAV.map(s => s.id)))
  const [flyout, setFlyout]             = useState(null)
  const [hoveredId, setHoveredId]       = useState(null)
  const [tenantSwitcherOpen, setTenantSwitcherOpen] = useState(false)
  const [activeTenantId, setActiveTenantId] = useState(TENANTS[0].id)
  const [tenantAnchorRect, setTenantAnchorRect] = useState(null)
  const [contextHovered, setContextHovered] = useState(false)
  const [collapseHovered, setCollapseHovered] = useState(false)

  const tenantTriggerRef = useRef(null)
  const tenantButtonRef  = useRef(null)

  const activeTenant = TENANTS.find(t => t.id === activeTenantId)

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

      {/* ── Header ─────────────────────────────────────────────────────── */}
      {expanded ? (
        <div
          ref={tenantTriggerRef}
          onMouseEnter={() => setContextHovered(true)}
          onMouseLeave={() => setContextHovered(false)}
          style={{ flexShrink: 0, padding: '0 8px 4px', display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          <div style={{
            height: 40,
            display: 'flex',
            alignItems: 'center',
            padding: '0 2px 3px 6px',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, cursor: 'default' }}>
              <LogoMark />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#e0e0e0', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                Tenant Manager
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
              onMouseEnter={e => { setCollapseHovered(true); e.currentTarget.style.background = '#2e2e2e' }}
              onMouseLeave={e => { setCollapseHovered(false); e.currentTarget.style.background = 'transparent' }}
            >
              <CollapseIcon />
            </button>
          </div>

          <button
            ref={tenantButtonRef}
            onClick={toggleTenantSwitcher}
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
              background: tenantSwitcherOpen ? '#585858' : contextHovered ? '#525252' : '#4a4a4a',
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
          height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid #2e2e2e', flexShrink: 0,
        }}>
          <button
            onClick={() => setExpanded(true)}
            title="Expand sidebar"
            style={{
              width: 32, height: 32, border: 'none', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', cursor: 'pointer', borderRadius: 4,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#363636'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <HamburgerIcon />
          </button>
        </div>
      )}

      {/* ── Nav items ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '6px 0' }}>
        {TENANT_NAV.map(section => {
          const hasChildren   = section.items.length > 0
          const isOpen        = openSections.has(section.id)
          const isSectionActive = activeItemId === section.id ||
            (hasChildren && section.items.some(item => item.id === activeItemId))

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
                  borderLeft: isSectionActive ? '2px solid #378ADD' : '2px solid transparent',
                  background: isSectionActive ? '#3a3a3a' : hoveredId === section.id ? '#363636' : 'transparent',
                  cursor: 'pointer',
                  justifyContent: expanded ? 'flex-start' : 'center',
                  transition: 'background 0.1s',
                  position: 'relative',
                }}
              >
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 20, height: 20, flexShrink: 0,
                  color: isSectionActive ? '#378ADD' : '#ffffff',
                }}>
                  <CategoryIcon iconKey={section.iconKey} />
                </span>

                {expanded && (
                  <>
                    <span style={{
                      fontSize: 13,
                      color: isSectionActive ? '#ffffff' : '#d0d0d0',
                      fontWeight: isSectionActive ? 500 : 400,
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

              {expanded && hasChildren && isOpen && section.items.map(item => {
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
        <AccountMenu expanded={expanded} />
      </div>

      {expanded && tenantSwitcherOpen && (
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
          onSelectItem={onSelectItem}
          onClose={() => setFlyout(null)}
        />
      )}
    </div>
  )
}
