import { useEffect, useRef, useState } from 'react'

const TENANTS = [
  { id: 'nblive', name: 'NBLive' },
  { id: 'acme-ops', name: 'Acme Ops' },
  { id: 'bluewave-labs', name: 'BlueWave Labs' },
]

function ChevronDownIcon({ open = false }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

export default function TenantHeader() {
  const [activeTenantId, setActiveTenantId] = useState(TENANTS[0].id)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const activeTenant = TENANTS.find(tenant => tenant.id === activeTenantId) ?? TENANTS[0]

  return (
    <div style={{
      height: 40,
      display: 'flex',
      alignItems: 'center',
      padding: '0 12px',
      background: '#fff',
      borderBottom: '1px solid #e4e4e4',
      flexShrink: 0,
      position: 'relative',
      zIndex: 20,
    }}>
      <div ref={menuRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(open => !open)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            border: 'none',
            background: menuOpen ? '#f3f6fa' : 'transparent',
            color: '#1f2937',
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: 6,
            fontSize: 13,
          }}
          onMouseEnter={e => {
            if (!menuOpen) e.currentTarget.style.background = '#f7f7f7'
          }}
          onMouseLeave={e => {
            if (!menuOpen) e.currentTarget.style.background = 'transparent'
          }}
        >
          <span style={{ color: '#374151' }}>Tenant:</span>
          <span style={{ fontWeight: 500 }}>{activeTenant.name}</span>
          <span style={{ color: '#6b7280', display: 'inline-flex' }}>
            <ChevronDownIcon open={menuOpen} />
          </span>
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            minWidth: 220,
            background: '#fff',
            border: '1px solid #e4e4e4',
            borderRadius: 8,
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.12)',
            overflow: 'hidden',
            zIndex: 40,
          }}>
            <div style={{ padding: '9px 12px', borderBottom: '1px solid #f0f0f0', fontSize: 11, color: '#888' }}>
              Switch tenant
            </div>
            {TENANTS.map(tenant => {
              const isActive = tenant.id === activeTenant.id

              return (
                <button
                  key={tenant.id}
                  onClick={() => {
                    setActiveTenantId(tenant.id)
                    setMenuOpen(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px 12px',
                    border: 'none',
                    background: isActive ? '#f5f9ff' : '#fff',
                    color: isActive ? '#1d4ed8' : '#374151',
                    cursor: 'pointer',
                    fontSize: 13,
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.background = '#f7f7f7'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.background = '#fff'
                  }}
                >
                  <span>{tenant.name}</span>
                  {isActive && <span style={{ fontSize: 12, fontWeight: 600 }}>Current</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
