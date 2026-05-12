import { useEffect, useMemo, useRef, useState } from 'react'

export default function TenantSwitcher({
  anchorRect,
  tenants,
  activeTenantId,
  onSelectTenant,
  onClose,
}) {
  const ref = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)

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

  function handleSelect(tenantId) {
    onSelectTenant(tenantId)
    onClose()
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
          Switch Tenant
        </div>

        <div style={{ padding: '0 0 10px' }}>
          {tenants.map(tenant => {
            const active  = tenant.id === activeTenantId
            const hovered = hoveredId === tenant.id
            return (
              <button
                key={tenant.id}
                onClick={() => handleSelect(tenant.id)}
                onMouseEnter={() => setHoveredId(tenant.id)}
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
                  fontWeight: active ? 600 : 400,
                  textAlign: 'left',
                }}
              >
                <span style={{ width: 20, minWidth: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {active && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#378ADD', flexShrink: 0 }} />}
                </span>
                <span style={{ flex: 1, minWidth: 0, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {tenant.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
