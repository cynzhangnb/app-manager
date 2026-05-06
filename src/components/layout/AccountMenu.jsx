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

export default function AccountMenu({ expanded = true, user = 'cynthia.zhang@netbrain.com' }) {
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
          background: open ? '#f0ede7' : 'transparent',
          cursor: 'pointer',
          justifyContent: expanded ? 'flex-start' : 'center',
          transition: 'background 0.1s',
        }}
        onMouseEnter={e => {
          if (!open) e.currentTarget.style.background = '#f0ede7'
        }}
        onMouseLeave={e => {
          if (!open) e.currentTarget.style.background = 'transparent'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, color: '#555' }}>
          <FooterUserIcon />
        </span>
        {expanded && (
          <span style={{ fontSize: 13, color: '#374151', flex: 1, textAlign: 'left' }}>
            Account
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          left: expanded ? 0 : 'calc(100% + 8px)',
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
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#1a1a1a',
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
                  color: '#374151',
                  fontSize: 13,
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f7f7f7'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ display: 'inline-flex', color: '#666', flexShrink: 0 }}>
                  <Icon />
                </span>
                <span>{label}</span>
              </button>
            ))}
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
                color: '#374151',
                fontSize: 13,
                textAlign: 'left',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f7f7f7'}
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
