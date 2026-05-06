import { useState } from 'react'

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
      height: 40,
      display: 'flex',
      alignItems: 'stretch',
      background: '#fff',
      borderBottom: '1px solid #e4e4e4',
      flexShrink: 0,
      overflowX: 'auto',
      overflowY: 'hidden',
    }}>
      {tabs.map((tab, i) => {
        const isActive  = tab.id === activeTabId
        const isStart   = tab.id === 'start'
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
              padding: '0 14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              background: isActive ? '#fff' : isHovered ? '#f5f5f5' : 'transparent',
              borderBottom: isActive ? '2px solid #378ADD' : '2px solid transparent',
              borderRight: '1px solid #e8e8e8',
              color: isActive ? '#1a1a1a' : '#555',
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              transition: 'background 0.1s',
              position: 'relative',
              userSelect: 'none',
            }}
          >
            <span>{tab.label}</span>

            {!isStart && (
              <button
                onClick={e => { e.stopPropagation(); onCloseTab(tab.id) }}
                onMouseEnter={() => setHoveredCloseId(tab.id)}
                onMouseLeave={() => setHoveredCloseId(null)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 16, height: 16,
                  border: 'none',
                  borderRadius: 3,
                  background: hoveredCloseId === tab.id ? '#e0e0e0' : 'transparent',
                  color: '#888',
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
    </div>
  )
}
