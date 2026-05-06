import { useState } from 'react'

function CloseIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

export default function TabBar({ tabs, activeTabId, onSwitchTab, onCloseTab }) {
  const [hoveredTabId, setHoveredTabId] = useState(null)
  const [hoveredCloseId, setHoveredCloseId] = useState(null)

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      background: '#fff',
      paddingLeft: 30,
      paddingTop: 6,
      flexShrink: 0,
      overflowX: 'auto',
      overflowY: 'hidden',
      gap: 2,
      position: 'relative',
    }}>
      {tabs.map((tab) => {
        const isActive  = tab.id === activeTabId
        const noClose   = tab.noClose || tab.id === 'start'
        const isHovered = hoveredTabId === tab.id

        return (
          <div
            key={tab.id}
            onClick={() => onSwitchTab(tab.id)}
            onMouseEnter={() => setHoveredTabId(tab.id)}
            onMouseLeave={() => setHoveredTabId(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '0 12px',
              height: 32,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              borderRadius: '6px 6px 0 0',
              background: isActive
                ? '#f9f9f9'
                : isHovered
                ? '#f2f2f4'
                : 'transparent',
              borderTop: isActive ? '1px solid #e8e8e8' : '1px solid transparent',
              borderLeft: isActive ? '1px solid #e8e8e8' : '1px solid transparent',
              borderRight: isActive ? '1px solid #e8e8e8' : '1px solid transparent',
              borderBottom: isActive ? '1px solid #f9f9f9' : '1px solid transparent',
              position: 'relative',
              zIndex: isActive ? 1 : 0,
              color: isActive ? '#1a1a1a' : '#666',
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              transition: 'background 0.1s',
              userSelect: 'none',
            }}
          >
            <span>{tab.label}</span>

            {!noClose && (
              <button
                onClick={e => { e.stopPropagation(); onCloseTab(tab.id) }}
                onMouseEnter={() => setHoveredCloseId(tab.id)}
                onMouseLeave={() => setHoveredCloseId(null)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 16, height: 16,
                  border: 'none',
                  borderRadius: 4,
                  background: hoveredCloseId === tab.id
                    ? (isActive ? '#e4e4e4' : '#e0e0e2')
                    : 'transparent',
                  color: '#999',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'background 0.1s',
                  flexShrink: 0,
                }}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )
      })}

      {/* Shelf line — sits behind active tab (zIndex 0) but above inactive tabs */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: '#e8e8e8',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
    </div>
  )
}
