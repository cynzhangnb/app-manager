import { useState } from 'react'

/* ── Stat card icons ─────────────────────────────────────────────────────── */
function DiscoverIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}
function DataAccuracyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}
function SiteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function ScheduleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}
function RefreshIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  )
}
function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}
function ChevronDownIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

/* ── Stat card ──────────────────────────────────────────────────────────── */
function StatCard({ icon, title, count, subtitle, rows }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: '#fff',
      border: '1px solid #e4e4e4',
      borderRadius: 8,
      padding: '20px 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        {icon}
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 32, fontWeight: 400, color: '#1a1a1a', lineHeight: 1.1 }}>{count}</span>
        <span style={{ fontSize: 12, color: '#888' }}>{subtitle}</span>
      </div>
      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 10 }}>
        {rows.map(([label, value, highlight]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0' }}>
            <span style={{ fontSize: 12, color: '#555' }}>{label}</span>
            <span style={{ fontSize: 12, color: highlight ? '#d32f2f' : '#378ADD', fontWeight: highlight ? 500 : 400 }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Users table ────────────────────────────────────────────────────────── */
const CURRENT_USERS = [
  { username: 'Yueqin.Li@netbraintech.com (SSO_Office365)',    sessions: [{ name: 'Session25', type: 'Workstation', machine: 'ip-172-31-44-14', ip: '172.31.44.14', browser: 'Edge',   loginTime: '2026-05-04, 9:50:55 AM' }] },
  { username: 'Yi.Yang@netbraintech.com (SSO_Office365)',       sessions: [{ name: 'Session33', type: 'Workstation', machine: 'ip-172-31-2-46',  ip: '172.31.2.46',  browser: 'Chrome', loginTime: '2026-05-04, 10:34:56 AM' }] },
  { username: 'Vishnudutta.Pandey@netbraintech.com (SSO_...)',  sessions: [{ name: 'Session11', type: 'Workstation', machine: 'ip-172-31-44-14', ip: '172.31.44.14', browser: 'Edge',   loginTime: '2026-05-04, 8:30:42 AM' }] },
  { username: 'Vicol.Huang@netbrain.com (SSO_Office365)',       sessions: [{ name: 'Session1',  type: 'Workstation', machine: 'ip-172-31-82-115',ip: '172.31.82.115',browser: 'Chrome', loginTime: '2026-04-28, 2:17:43 PM' }] },
]

function UsersTable() {
  const [expandedUsers, setExpandedUsers] = useState(new Set(CURRENT_USERS.map(u => u.username)))

  function toggle(username) {
    setExpandedUsers(prev => {
      const next = new Set(prev)
      next.has(username) ? next.delete(username) : next.add(username)
      return next
    })
  }

  const COL_WIDTHS = ['30%', '12%', '14%', '12%', '10%', '14%', '8%']
  const HEADERS    = ['Username', 'ClientType', 'Machine Name', 'IP Address', 'Browser', 'Login Time', 'End Session']

  return (
    <div style={{ background: '#fff', border: '1px solid #e4e4e4', borderRadius: 8, overflow: 'hidden' }}>
      {/* Table header controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid #e8e8e8' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Current Users</span>
        <span style={{ fontSize: 12, color: '#888' }}>Session Count: <strong style={{ color: '#1a1a1a' }}>42</strong></span>
        <span style={{ fontSize: 12, color: '#555' }}>Client Type:</span>
        <select style={{ fontSize: 12, padding: '2px 6px', border: '1px solid #e4e4e4', borderRadius: 4, color: '#374151', background: '#fff' }}>
          <option>Workstation, Smart CLI,...</option>
        </select>
        <div style={{ flex: 1 }} />
        <input placeholder="Search..." style={{ fontSize: 12, padding: '4px 8px', border: '1px solid #e4e4e4', borderRadius: 4, width: 160, outline: 'none' }} />
      </div>

      {/* Column headers */}
      <div style={{ display: 'flex', background: '#f8f8f8', borderBottom: '1px solid #e8e8e8', padding: '0 16px' }}>
        {HEADERS.map((h, i) => (
          <div key={h} style={{ width: COL_WIDTHS[i], fontSize: 12, fontWeight: 600, color: '#555', padding: '7px 6px', flexShrink: 0 }}>{h}</div>
        ))}
      </div>

      {/* Rows */}
      {CURRENT_USERS.map(user => (
        <div key={user.username}>
          {/* User group header */}
          <div
            onClick={() => toggle(user.username)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', background: '#fafafa', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
          >
            <span style={{ color: '#888', transform: expandedUsers.has(user.username) ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s', display: 'inline-flex' }}>
              <ChevronDownIcon size={11} />
            </span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span style={{ fontSize: 12.5, color: '#374151' }}>{user.username}</span>
          </div>

          {/* Sessions */}
          {expandedUsers.has(user.username) && user.sessions.map(s => (
            <div key={s.name} style={{ display: 'flex', padding: '6px 16px', borderBottom: '1px solid #f5f5f5', background: '#fff' }}>
              <div style={{ width: COL_WIDTHS[0], fontSize: 12, color: '#555', padding: '0 6px', paddingLeft: 28 }}>{s.name}</div>
              <div style={{ width: COL_WIDTHS[1], fontSize: 12, color: '#444', padding: '0 6px' }}>{s.type}</div>
              <div style={{ width: COL_WIDTHS[2], fontSize: 12, color: '#444', padding: '0 6px' }}>{s.machine}</div>
              <div style={{ width: COL_WIDTHS[3], fontSize: 12, color: '#444', padding: '0 6px' }}>{s.ip}</div>
              <div style={{ width: COL_WIDTHS[4], fontSize: 12, color: '#444', padding: '0 6px' }}>{s.browser}</div>
              <div style={{ width: COL_WIDTHS[5], fontSize: 12, color: '#444', padding: '0 6px' }}>{s.loginTime}</div>
              <div style={{ width: COL_WIDTHS[6], fontSize: 12, padding: '0 6px' }}>
                <button style={{ fontSize: 12, color: '#378ADD', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
                  End Session
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── Start Page ─────────────────────────────────────────────────────────── */
export default function StartPage() {
  return (
    <div style={{ padding: '24px 28px' }}>
      {/* Domain info bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 24,
        padding: '12px 20px',
        background: '#fff',
        border: '1px solid #e4e4e4',
        borderRadius: 8,
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 13, color: '#555' }}>Hybrid Network</span>
        <span style={{ fontSize: 13, color: '#555' }}>
          <strong style={{ color: '#374151' }}>Description:</strong>
        </span>
        <div style={{ flex: 1 }} />
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#555', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <EditIcon /> Edit
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#555', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <RefreshIcon /> Refresh
        </button>
      </div>

      {/* Stats cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <StatCard
          icon={<DiscoverIcon />}
          title="Discover"
          count={0}
          subtitle="Last Discovered Devices"
          rows={[
            ['Result', 'Not Executed Yet'],
            ['Duration', '--'],
            ['Execution Time', '--'],
          ]}
        />
        <StatCard
          icon={<DataAccuracyIcon />}
          title="Data Accuracy Resolution"
          count={455}
          subtitle="Total Discovered Devices"
          rows={[
            ['Fully Accessed via CLI', '261 (61%)'],
            ['SNMP Configuration Devices', '38'],
            ['Inaccessible Devices', '127', true],
            ['Unknown SNMP SysObjectID', '1', true],
            ['Devices to be Discovered', '435', true],
            ['Subnet with Conflicted IPs', '20', true],
          ]}
        />
        <StatCard
          icon={<SiteIcon />}
          title="Site"
          count={81}
          subtitle="Sites"
          rows={[
            ['Container Sites', '9'],
            ['Leaf Sites', '72'],
            ['Leaf Sites (over 100 Devices)', '2'],
            ['Unassigned Devices', '1211', true],
          ]}
        />
        <StatCard
          icon={<ScheduleIcon />}
          title="Schedule Task"
          count={71}
          subtitle="Tasks"
          rows={[
            ['Discovery Task', '8'],
            ['Benchmark Task', '41'],
            ['Data View Template Task', '5'],
            ['Qapp Task', '10'],
            ['Plugin Task', '6'],
            ['Platform Validation', '1'],
          ]}
        />
      </div>

      {/* Current users table */}
      <UsersTable />
    </div>
  )
}
