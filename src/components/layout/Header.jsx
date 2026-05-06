import { useState, useRef, useEffect } from 'react'

function HelpIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

export default function Header({ tenant = 'NBLIVE-Sessions', domain = 'Hybrid Network', user = 'cynthia.zhang@netbrain.com' }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!userMenuOpen) return
    function handle(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [userMenuOpen])

  return (
    <div style={{
      height: 44,
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      background: '#fff',
      borderBottom: '1px solid #e4e4e4',
      flexShrink: 0,
      gap: 12,
      zIndex: 50,
    }}>
      {/* App title */}
      <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', letterSpacing: '-0.01em', flexShrink: 0 }}>
        Domain Management
      </span>

      <div style={{ flex: 1 }} />

      {/* Tenant chip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '3px 10px', borderRadius: 4,
        background: '#f4f4f4', border: '1px solid #e4e4e4',
        fontSize: 12, color: '#444',
      }}>
        <span style={{ color: '#666' }}><CloudIcon /></span>
        <span style={{ fontWeight: 500 }}>Tenant:</span>
        <span>{tenant}</span>
      </div>

      {/* Domain chip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '3px 10px', borderRadius: 4,
        background: '#f4f4f4', border: '1px solid #e4e4e4',
        fontSize: 12, color: '#444',
      }}>
        <span style={{ color: '#666' }}><GlobeIcon /></span>
        <span>{domain}</span>
      </div>

      {/* Help */}
      <button style={{
        width: 28, height: 28, border: 'none', background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#666', cursor: 'pointer', borderRadius: 4,
        flexShrink: 0,
      }}
        onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <HelpIcon />
      </button>

      {/* NetBrain logo wordmark */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '0 8px', borderLeft: '1px solid #e4e4e4', height: '100%',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#1a56a0', letterSpacing: '-0.02em' }}>Net</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', letterSpacing: '-0.02em' }}>Brain</span>
      </div>

      {/* User menu */}
      <div style={{ position: 'relative', flexShrink: 0 }} ref={menuRef}>
        <button
          onClick={() => setUserMenuOpen(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 8px', border: 'none', borderRadius: 4,
            background: userMenuOpen ? '#f0f0f0' : 'transparent',
            cursor: 'pointer', color: '#444', fontSize: 12,
          }}
          onMouseEnter={e => { if (!userMenuOpen) e.currentTarget.style.background = '#f0f0f0' }}
          onMouseLeave={e => { if (!userMenuOpen) e.currentTarget.style.background = 'transparent' }}
        >
          <UserIcon />
          <span style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user}
          </span>
          <ChevronDownIcon />
        </button>

        {userMenuOpen && (
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 4px)',
            background: '#fff', border: '1px solid #e4e4e4', borderRadius: 6,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            minWidth: 180, zIndex: 200,
            overflow: 'hidden',
          }}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>Signed in as</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1a1a' }}>{user}</div>
            </div>
            {['User Profile', 'Get Help', 'Open Support Ticket'].map(label => (
              <button key={label} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 12px', border: 'none', background: 'transparent',
                fontSize: 13, color: '#374151', cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid #f0f0f0' }}>
              <button style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 12px', border: 'none', background: 'transparent',
                fontSize: 13, color: '#d32f2f', cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
