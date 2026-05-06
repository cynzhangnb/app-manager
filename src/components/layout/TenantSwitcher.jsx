import { useEffect, useMemo, useRef, useState } from 'react'

function ChevronDownIcon({ open = false }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.14s ease' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6"/>
      <path d="M10 14L21 3"/>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  )
}

export default function TenantSwitcher({
  anchorRect,
  tenants,
  activeTenantId,
  onSelectTenant,
  onOpenApp,
  onClose,
}) {
  const ref = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)

  const position = useMemo(() => ({
    left: anchorRect ? anchorRect.left : 8,
    top: anchorRect ? anchorRect.bottom + 6 : 86,
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

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: position.left,
        top: position.top,
        width: 236,
        maxWidth: 'calc(100vw - 18px)',
        background: '#fff',
        border: '1px solid #e4e4e4',
        borderRadius: 8,
        boxShadow: '0 6px 18px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)',
        zIndex: 500,
        overflow: 'hidden',
        color: '#1f1f1f',
      }}
    >
      <div style={{ padding: '6px 0 7px' }}>
        <div style={{
          padding: '0 12px 6px',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: '#8a8a8a',
          textTransform: 'uppercase',
        }}>
          Tenant
        </div>

        {tenants.map(tenant => {
          const active = tenant.id === activeTenantId
          const hovered = hoveredId === tenant.id
          return (
            <button
              key={tenant.id}
              onClick={() => {
                onSelectTenant(tenant.id)
                onClose()
              }}
              onMouseEnter={() => setHoveredId(tenant.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                width: '100%',
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: 'none',
                background: active || hovered ? '#f0ede7' : 'transparent',
                cursor: 'pointer',
                padding: '0 18px',
                color: '#1a1a1a',
                fontSize: 12.5,
                fontWeight: active ? 500 : 400,
                textAlign: 'left',
              }}
            >
              <span>{tenant.name}</span>
              <span style={{
                width: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {active ? (
                  <span style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#378ADD',
                    flexShrink: 0,
                  }} />
                ) : null}
              </span>
            </button>
          )
        })}

        <div style={{ borderTop: '1px solid #ececec', marginTop: 6, padding: '4px 0 5px' }}>
          {[
            { id: 'account-manager', label: 'Account Manager' },
            { id: 'domain-manager', label: 'Domain Manager' },
            { id: 'netbrain', label: 'NetBrain' },
          ].map(app => (
            <button
              key={app.id}
              style={{
                width: '100%',
                height: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: '0 17px',
                color: app.id === 'domain-manager' ? '#1a1a1a' : '#1f1f1f',
                fontSize: 12.5,
                fontWeight: app.id === 'domain-manager' ? 500 : 400,
                textAlign: 'left',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0ede7'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              onClick={() => {
                onOpenApp?.(app)
                onClose()
              }}
            >
              <span>{app.label}</span>
              <span style={{
                width: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                flexShrink: 0,
              }}>
                <ExternalIcon />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
