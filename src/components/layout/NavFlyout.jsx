import { useEffect, useRef } from 'react'

export default function NavFlyout({ category, anchorTop, activeItemId, onSelectItem, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onClose])

  if (!category) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: 44,
        top: anchorTop,
        minWidth: 200,
        background: '#fff',
        border: '1px solid #e4e4e4',
        borderRadius: 6,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        zIndex: 300,
        overflow: 'hidden',
        paddingBottom: 4,
      }}
    >
      {/* Category header */}
      <div style={{
        padding: '8px 12px 6px',
        fontSize: 11,
        fontWeight: 600,
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: 4,
      }}>
        {category.label}
      </div>

      {/* Sub-items */}
      {category.children.length > 0 ? (
        category.children.map(child => {
          const isActive = child.id === activeItemId

          return (
            <button
              key={child.id}
              onClick={() => { onSelectItem(child); onClose() }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                width: '100%',
                textAlign: 'left',
                padding: '7px 14px',
                border: 'none',
                background: 'transparent',
                fontSize: 12.5,
                color: '#374151',
                cursor: 'pointer',
                transition: 'background 0.1s',
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0ede7'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {child.label}
              </span>
              {isActive && (
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#378ADD',
                  flexShrink: 0,
                }} />
              )}
            </button>
          )
        })
      ) : (
        /* Childless category — clicking the icon already triggered the tab */
        <div style={{ padding: '6px 14px 2px', fontSize: 13, color: '#888' }}>
          Click to open
        </div>
      )}
    </div>
  )
}
