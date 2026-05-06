import { useEffect, useMemo, useRef, useState } from 'react'

const RIGHT_SLOT_WIDTH = 20
const RIGHT_SLOT_STYLE = {
  width: RIGHT_SLOT_WIDTH,
  minWidth: RIGHT_SLOT_WIDTH,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

function ChevronDownIcon({ open = false }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.14s ease', display: 'block' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M15 3h6v6"/>
      <path d="M10 14L21 3"/>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  )
}

export default function DomainSwitcher({
  anchorRect,
  tenants,
  activeTenantId,
  activeDomainId,
  onSelect,
  onOpenApp,
  onClose,
}) {
  const ref = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [openTenantIds, setOpenTenantIds] = useState(() => new Set(tenants.map(tenant => tenant.id)))

  const activeTenant = tenants.find(tenant => tenant.id === activeTenantId)
  const activeDomain = activeTenant?.domains.find(domain => domain.id === activeDomainId)

  const position = useMemo(() => ({
    left: anchorRect ? anchorRect.left : 8,
    top: anchorRect ? anchorRect.bottom + 2 : 86,
  }), [anchorRect])

  useEffect(() => {
    function handleMouseDown(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  function handleSelect(tenantId, domainId) {
    onSelect(tenantId, domainId)
    onClose()
  }

  function toggleTenant(tenantId) {
    setOpenTenantIds(prev => {
      const next = new Set(prev)
      next.has(tenantId) ? next.delete(tenantId) : next.add(tenantId)
      return next
    })
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: position.left,
        top: position.top,
        width: 252,
        maxWidth: 'calc(100vw - 18px)',
        background: '#fff',
        border: '1px solid #e4e4e4',
        borderRadius: 6,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.07)',
        zIndex: 500,
        overflow: 'hidden',
        color: '#1f1f1f',
      }}
    >
      <div style={{ maxHeight: 360, overflowY: 'auto', paddingTop: 6 }}>
        <div style={{ padding: '6px 12px 4px', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', color: '#aaa', textTransform: 'uppercase' }}>
          Switch Domain
        </div>
        {tenants.map((tenant, tenantIndex) => {
          const isOpen = openTenantIds.has(tenant.id)
          return (
            <div key={tenant.id} style={{ borderTop: tenantIndex === 0 ? 'none' : '1px solid #ececec' }}>
              <button
                onClick={() => toggleTenant(tenant.id)}
                style={{
                  width: '100%',
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: 12,
                  paddingRight: 12,
                  border: 'none',
                  background: 'transparent',
                  color: '#909090',
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span>{tenant.name}</span>
                <span style={{ ...RIGHT_SLOT_STYLE, color: '#777' }}>
                  <ChevronDownIcon open={isOpen} />
                </span>
              </button>

              {isOpen && (
                <div style={{ padding: '0 0 10px' }}>
                  {tenant.domains.map(domain => {
                    const active = tenant.id === activeTenantId && domain.id === activeDomainId
                    const hovered = hoveredId === domain.id
                    return (
                      <button
                        key={domain.id}
                        onClick={() => handleSelect(tenant.id, domain.id)}
                        onMouseEnter={() => setHoveredId(domain.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                          width: '100%',
                          height: 26,
                          display: 'flex',
                          alignItems: 'center',
                          border: 'none',
                          borderRadius: 0,
                          background: hovered ? '#efefef' : 'transparent',
                          cursor: 'pointer',
                          paddingLeft: 6,
                          paddingRight: 10,
                          color: '#1a1a1a',
                          fontSize: 12.5,
                          fontWeight: active ? 500 : 400,
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ width: 20, minWidth: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {active && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#378ADD', flexShrink: 0 }} />}
                        </span>
                        <span style={{ flex: 1, minWidth: 0, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{domain.name}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

      </div>
    </div>
  )
}
