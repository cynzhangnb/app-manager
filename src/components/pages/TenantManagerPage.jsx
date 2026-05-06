const USERS = [
  ['Abhay.Bhardwaj@netbrain.com', true, true, true],
  ['abhinav.agrawal@netbrain.com', false, false, false],
  ['Abhishek.Sharma@netbraintech.com', false, false, false],
  ['Adewale.Obadeyi@netbrain.com', false, false, false],
  ['admin', true, true, true],
  ['admin1', true, true, true],
  ['ADT_Test', true, true, true],
  ['Ahmed.Alammari@netbraintech.com', false, false, false],
  ['AI1', false, false, false],
  ['AI2', false, false, false],
  ['AI3', false, false, false],
  ['Ajay.Tammineedi@netbrain.com', false, false, false],
  ['AjayKumar.Verma@netbraintech.com', false, false, false],
  ['Ajeet', false, false, false],
  ['Ajeet.Kumar@netbraintech.com', true, true, true],
  ['Akanksha Bansal', false, false, false],
  ['Akshay.Mogaveera@netbrain.com', false, false, false],
  ['Alaa.Hashim@netbrain.com', false, false, false],
  ['Alejandro.Marin@netbraintech.com', false, false, false],
  ['Alejandro.Rivero@netbrain.com', false, false, false],
  ['Alex.Drazin@netbrain.com', false, false, false],
  ['Ali.Abduljabbar@netbrain.com', false, false, false],
  ['Alireza.Afshartoos@netbrain.com', false, false, false],
  ['Amber.Lukacs@netbrain.com', false, false, false],
]

const TABLE_HEADERS = ['No.', 'Username', 'System Admin', 'Tenant Admin', 'Allowed to create domain']
const COLUMN_WIDTHS = ['72px', '43%', '17%', '17%', '23%']

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function CheckMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#008a3d"
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function EmptyBox() {
  return <span style={{ width: 12, height: 12, border: '1px solid #999', borderRadius: 3, display: 'inline-block' }} />
}

export default function TenantManagerPage({ view = 'user-authorization' }) {
  if (view === 'domain-list') {
    return (
      <div style={{ flex: 1, padding: 24, background: '#fff', color: '#777', fontSize: 13 }}>
        Domain List content placeholder
      </div>
    )
  }

  return (
    <div style={{ flex: 1, padding: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <p style={{ margin: 0, fontSize: 12.5, color: '#1f1f1f', flex: 1 }}>
          Enable or disable the privilege of creating domains. System administrators and Tenant administrators are intrinsically able to create domains.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 190, height: 30, display: 'flex', alignItems: 'center', border: '1px solid #d0d0d0', background: '#fff' }}>
            <input placeholder="Search..." style={{ flex: 1, border: 'none', outline: 'none', padding: '0 8px', fontSize: 12, fontStyle: 'italic' }} />
            <span style={{ color: '#378ADD', paddingRight: 8 }}><SearchIcon /></span>
          </div>
          <button style={{ border: 'none', background: 'transparent', color: '#378ADD', cursor: 'pointer', fontSize: 12 }}>Refresh</button>
          <button style={{ border: 'none', background: 'transparent', color: '#378ADD', cursor: 'pointer', fontSize: 12 }}>Help</button>
        </div>
      </div>

      <div style={{ flex: 1, background: '#fff', border: '1px solid #e4e4e4', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'flex', background: '#f8f8f8', borderBottom: '1px solid #e8e8e8', padding: '0 16px' }}>
          {TABLE_HEADERS.map((header, index) => (
            <div key={header} style={{ width: COLUMN_WIDTHS[index], fontSize: 12, fontWeight: 600, color: '#555', padding: '7px 6px', flexShrink: 0 }}>
              {header}
            </div>
          ))}
        </div>

        <div style={{ overflow: 'auto', height: '100%' }}>
          {USERS.map(([username, systemAdmin, tenantAdmin, allowed], index) => (
            <div
              key={username}
              style={{ display: 'flex', alignItems: 'center', padding: '6px 16px', borderBottom: '1px solid #f5f5f5', background: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fafafa' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
            >
              <div style={{ width: COLUMN_WIDTHS[0], fontSize: 12, color: '#555', padding: '0 6px', flexShrink: 0 }}>{index + 1}</div>
              <div style={{ width: COLUMN_WIDTHS[1], fontSize: 12.5, color: '#374151', padding: '0 6px', flexShrink: 0 }}>{username}</div>
              <div style={{ width: COLUMN_WIDTHS[2], fontSize: 12, color: '#444', padding: '0 6px', flexShrink: 0 }}>{systemAdmin && <CheckMark />}</div>
              <div style={{ width: COLUMN_WIDTHS[3], fontSize: 12, color: '#444', padding: '0 6px', flexShrink: 0 }}>{tenantAdmin && <CheckMark />}</div>
              <div style={{ width: COLUMN_WIDTHS[4], fontSize: 12, color: '#444', padding: '0 6px', flexShrink: 0 }}>{allowed ? <CheckMark /> : <EmptyBox />}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
