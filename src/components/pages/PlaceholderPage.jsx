export default function PlaceholderPage({ label }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: 12,
      color: '#888',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: '#f0f0f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="9" x2="9" y2="21"/>
        </svg>
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#555' }}>{label}</div>
      <div style={{ fontSize: 13, color: '#aaa' }}>This section is under construction</div>
    </div>
  )
}
