import { useEffect, useRef, useState } from 'react'

function UserIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}

function TicketIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
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

function LogoutIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}

function FooterUserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

const MENU_ITEMS = [
  { label: 'User Profile', icon: UserIcon },
  { label: 'Get Help', icon: HelpIcon },
  { label: 'Open Support Ticket', icon: TicketIcon },
]

export default function AccountMenu({ expanded = true, user = 'cynthia.zhang@netbrain.com', appMode = 'domain-manager' }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button
        title={!expanded ? 'Account' : undefined}
        onClick={() => setOpen(value => !value)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 34,
          padding: expanded ? '0 10px 0 12px' : '0',
          border: 'none',
          background: open ? '#3a3a3a' : 'transparent',
          cursor: 'pointer',
          justifyContent: expanded ? 'flex-start' : 'center',
          transition: 'background 0.1s',
        }}
        onMouseEnter={e => {
          if (!open) e.currentTarget.style.background = '#363636'
        }}
        onMouseLeave={e => {
          if (!open) e.currentTarget.style.background = 'transparent'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, color: '#ffffff' }}>
          <FooterUserIcon />
        </span>
        {expanded && (
          <span style={{ fontSize: 13, color: '#d0d0d0', flex: 1, textAlign: 'left' }}>
            Account
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          left: expanded ? 8 : 'calc(100% + 8px)',
          bottom: expanded ? 'calc(100% + 4px)' : 0,
          width: 240,
          background: '#fff',
          border: '1px solid #e4e4e4',
          borderRadius: 6,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          zIndex: 300,
        }}>
          <div style={{
            padding: '10px 12px',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 1.4,
            color: '#888',
            borderBottom: '1px solid #f0f0f0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {user}
          </div>

          <div style={{ padding: '4px 0' }}>
            {MENU_ITEMS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  border: 'none',
                  background: 'transparent',
                  color: '#1a1a1a',
                  fontSize: 13,
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#efefef'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ display: 'inline-flex', color: '#666', flexShrink: 0 }}>
                  <Icon />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f0f0f0', background: '#f7f7f7' }}>
            <div style={{ padding: '8px 12px 4px', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', color: '#aaa', textTransform: 'uppercase' }}>
              Admin Tools
            </div>
            <div style={{ padding: '2px 0 6px' }}>
              {[
                { label: 'Account Management', onClick: null },
                appMode === 'tenant-manager'
                  ? { label: 'Domain Management', onClick: () => { const u = new URL(window.location.href); u.searchParams.delete('app'); const a = document.createElement('a'); a.href = u.toString(); a.target = '_blank'; a.rel = 'noopener noreferrer'; a.click() } }
                  : { label: 'Tenant Management', onClick: () => { const u = new URL(window.location.href); u.searchParams.set('app', 'tenant-manager'); const a = document.createElement('a'); a.href = u.toString(); a.target = '_blank'; a.rel = 'noopener noreferrer'; a.click() } },
                { label: 'NetBrain', onClick: null },
              ].map(({ label, onClick }) => (
                <button
                  key={label}
                  onClick={onClick ?? undefined}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    border: 'none',
                    background: 'transparent',
                    color: '#1a1a1a',
                    fontSize: 13,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#efefef'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span>{label}</span>
                  <span style={{ display: 'inline-flex', color: '#999', flexShrink: 0 }}>
                    <ExternalIcon />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f0f0f0' }}>
            <button
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                border: 'none',
                background: 'transparent',
                color: '#1a1a1a',
                fontSize: 13,
                textAlign: 'left',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#efefef'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ display: 'inline-flex', color: '#666', flexShrink: 0 }}>
                <LogoutIcon />
              </span>
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
