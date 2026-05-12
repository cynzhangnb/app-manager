import { useEffect, useRef, useState } from 'react'
import { MANAGED_TENANTS } from '../../data/tenants'

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
  const [tenantDialogOpen, setTenantDialogOpen] = useState(false)
  const [domainDialogOpen, setDomainDialogOpen] = useState(false)
  const [openTenantIds, setOpenTenantIds] = useState(() => new Set(MANAGED_TENANTS.map(t => t.id)))
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

  function openTenantManagementForTenant(tenantId) {
    const url = new URL(window.location.href)
    url.searchParams.set('app', 'tenant-manager')
    url.searchParams.set('tenant', tenantId)
    const a = document.createElement('a')
    a.href = url.toString()
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.click()
  }

  function openDomainManagementForDomain(tenantId, domainId) {
    const url = new URL(window.location.href)
    url.searchParams.delete('app')
    url.searchParams.set('tenant', tenantId)
    url.searchParams.set('domain', domainId)
    const a = document.createElement('a')
    a.href = url.toString()
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.click()
  }

  function toggleTenant(tenantId) {
    setOpenTenantIds(prev => {
      const next = new Set(prev)
      next.has(tenantId) ? next.delete(tenantId) : next.add(tenantId)
      return next
    })
  }

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
                  { label: 'System Management', onClick: null },
                  appMode === 'tenant-manager'
                    ? { label: 'Domain Management', onClick: () => { setOpen(false); setDomainDialogOpen(true) } }
                    : { label: 'Tenant Management', onClick: () => { setOpen(false); setTenantDialogOpen(true) } },
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

      {domainDialogOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(17, 24, 39, 0.38)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
          onMouseDown={e => { if (e.target === e.currentTarget) setDomainDialogOpen(false) }}
        >
          <div style={{
            width: 380,
            maxWidth: 'calc(100vw - 32px)',
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 16px 40px rgba(0,0,0,0.16)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '16px 18px 10px', borderBottom: '1px solid #ededed' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#262626', marginBottom: 4 }}>
                Open Domain Management
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.45, color: '#666' }}>
                Select the domain you want to manage. Domains are grouped by tenant.
              </div>
            </div>

            <div style={{ maxHeight: 320, overflowY: 'auto', padding: '6px 0' }}>
              {MANAGED_TENANTS.map((tenant, tenantIndex) => {
                const isOpen = openTenantIds.has(tenant.id)
                return (
                  <div key={tenant.id} style={{ borderTop: tenantIndex === 0 ? 'none' : '1px solid #ececec' }}>
                    {/* Tenant header row */}
                    <button
                      onClick={() => toggleTenant(tenant.id)}
                      style={{
                        width: '100%',
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 18px',
                        border: 'none',
                        background: 'transparent',
                        color: '#999',
                        fontSize: 10.5,
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8f8f8'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span>{tenant.name}</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.14s ease', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    {/* Domain rows */}
                    {isOpen && (
                      <div style={{ paddingBottom: 6 }}>
                        {tenant.domains.map(domain => (
                          <button
                            key={domain.id}
                            onClick={() => {
                              setDomainDialogOpen(false)
                              openDomainManagementForDomain(tenant.id, domain.id)
                            }}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 18px 8px 30px',
                              border: 'none',
                              background: 'transparent',
                              color: '#1a1a1a',
                              fontSize: 13,
                              fontWeight: 400,
                              textAlign: 'left',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f5f6f8'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <span>{domain.name}</span>
                            <span style={{ display: 'inline-flex', color: '#bbb', flexShrink: 0 }}>
                              <ExternalIcon />
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div style={{
              padding: '10px 18px 14px',
              borderTop: '1px solid #ededed',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => setDomainDialogOpen(false)}
                style={{
                  height: 32,
                  padding: '0 14px',
                  border: '1px solid #d8d8d8',
                  borderRadius: 6,
                  background: '#fff',
                  color: '#444',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {tenantDialogOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(17, 24, 39, 0.38)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            width: 380,
            maxWidth: 'calc(100vw - 32px)',
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 16px 40px rgba(0,0,0,0.16)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '16px 18px 10px', borderBottom: '1px solid #ededed' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#262626', marginBottom: 4 }}>
                Open Tenant Management
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.45, color: '#666' }}>
                You participate in multiple tenants. Choose which tenant's management tool you want to open.
              </div>
            </div>

            <div style={{ padding: '6px 0' }}>
              {MANAGED_TENANTS.map(tenant => (
                <button
                  key={tenant.id}
                  onClick={() => {
                    setTenantDialogOpen(false)
                    openTenantManagementForTenant(tenant.id)
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f5f6f8'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#303030' }}>{tenant.name}</span>
                  <span style={{ display: 'inline-flex', color: '#999', flexShrink: 0 }}>
                    <ExternalIcon />
                  </span>
                </button>
              ))}
            </div>

            <div style={{
              padding: '10px 18px 14px',
              borderTop: '1px solid #ededed',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => setTenantDialogOpen(false)}
                style={{
                  height: 32,
                  padding: '0 14px',
                  border: '1px solid #d8d8d8',
                  borderRadius: 6,
                  background: '#fff',
                  color: '#444',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
