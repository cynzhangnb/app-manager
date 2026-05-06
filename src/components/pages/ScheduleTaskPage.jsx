import { useState } from 'react'

const SUB_TABS = [
  { id: 'discovery-benchmark', label: 'Schedule Discovery/Benchmark' },
  { id: 'data-view-template',  label: 'Schedule Data View Template' },
  { id: 'qapp',                label: 'Schedule Qapp' },
  { id: 'intent',              label: 'Schedule Intent' },
  { id: 'plugin',              label: 'Schedule Plugin' },
  { id: 'platform-validation', label: 'Schedule Platform Validation' },
]

const MOCK_TASKS = [
  { enabled: true,  name: 'Basic System Benchmark',       type: 'Benchmark Task', lastRun: '2026-04-17, 10:03:03 AM', duration: '1 hrs 3 mins 35 secs', result: 'Succeeded with warnings', status: 'Idle', nextRun: '',                    scope: 'All Devices;Azure2-Sec...', freq: 'Once', author: 'NetBrain' },
  { enabled: false, name: 'Scheduled System Discovery',   type: 'Discovery Task', lastRun: '',                        duration: '',                      result: '',                       status: 'Idle', nextRun: '',                    scope: 'All Live Network',         freq: 'Once', author: 'NetBrain' },
  { enabled: true,  name: 'Azure – Build Topo',           type: 'Benchmark Task', lastRun: '2025-09-17, 10:03:09 AM', duration: '6 mins 15 secs',        result: 'Succeeded',              status: 'Idle', nextRun: '',                    scope: 'Azure2-Second Tenant ...',  freq: 'Once', author: 'Jia.Wei@netbraintech.com' },
  { enabled: true,  name: 'AWS Cloud Service',            type: 'Benchmark Task', lastRun: '2025-09-19, 3:43:28 PM', duration: '15 mins 55 secs',       result: 'Succeeded',              status: 'Idle', nextRun: '',                    scope: 'All Devices;AWS_Lab_A...',  freq: 'Once', author: 'ashhar.mohammed@netbrainte...' },
  { enabled: true,  name: 'kubernetes',                   type: 'Benchmark Task', lastRun: '2025-09-19, 1:03:27 AM', duration: '17 mins 41 secs',       result: 'Succeeded with warnings', status: 'Idle', nextRun: '',                    scope: 'All Devices;kubernetes...',  freq: 'Once', author: 'Vishnu.Venkatesh@netbrain...' },
  { enabled: true,  name: 'Cisco Meraki benchmark task',  type: 'Benchmark Task', lastRun: '2026-05-04, 8:10:00 AM', duration: '12 mins 41 secs',       result: 'Succeeded',              status: 'Idle', nextRun: '2026-05-05, 8:10:00 AM', scope: 'Meraki MX Appliances;...',  freq: 'Daily', author: 'Anvesh.Kosna@netbrain.com' },
]

function PlusIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}
function RefreshIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
}
function HelpCircleIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
}

function StatusBadge({ result }) {
  if (!result) return null
  const isWarning = result.toLowerCase().includes('warning')
  const isFailed  = result.toLowerCase().includes('fail')
  const isStop    = result.toLowerCase().includes('stopped')
  const color     = isFailed ? '#d32f2f' : isWarning ? '#e65100' : isStop ? '#888' : '#2e7d32'
  const bg        = isFailed ? '#fef2f2' : isWarning ? '#fff3e0' : isStop ? '#f5f5f5' : '#f0faf0'
  return (
    <span style={{ fontSize: 11.5, color, background: bg, padding: '2px 7px', borderRadius: 3, border: `1px solid ${bg}` }}>
      {result}
    </span>
  )
}

export default function ScheduleTaskPage() {
  const [activeSubTab, setActiveSubTab] = useState('discovery-benchmark')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sub-tab navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        background: '#fff',
        borderBottom: '1px solid #e4e4e4',
        padding: '0 24px',
        gap: 0,
        flexShrink: 0,
      }}>
        {SUB_TABS.map(tab => {
          const isActive = tab.id === activeSubTab
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                padding: '10px 16px',
                border: 'none',
                borderBottom: isActive ? '2px solid #378ADD' : '2px solid transparent',
                background: 'transparent',
                fontSize: 13,
                color: isActive ? '#378ADD' : '#555',
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.1s, border-color 0.1s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#374151' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#555' }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderBottom: '1px solid #f0f0f0', background: '#fff', flexShrink: 0 }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#378ADD', border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px 10px', borderRadius: 4 }}
          onMouseEnter={e => e.currentTarget.style.background = '#e8f2fc'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <PlusIcon /> Add Benchmark Task
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#378ADD', border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px 10px', borderRadius: 4 }}
          onMouseEnter={e => e.currentTarget.style.background = '#e8f2fc'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <PlusIcon /> Add Discovery Task
        </button>
        <div style={{ flex: 1 }} />
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#555', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <RefreshIcon /> Refresh
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#555', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <HelpCircleIcon /> Help
        </button>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 0 16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8f8f8', borderBottom: '1px solid #e8e8e8' }}>
              {['', 'Task Name', 'Type', 'Last Run Time', 'Duration', 'Last Result', 'Current Status', 'Next Run Time', 'Device Scope', 'Frequency', 'Author'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#555', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_TASKS.map((task, i) => (
              <tr key={task.name} style={{ borderBottom: '1px solid #f0f0f0', background: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <td style={{ padding: '7px 12px' }}>
                  <input type="checkbox" defaultChecked={task.enabled} style={{ cursor: 'pointer' }} />
                </td>
                <td style={{ padding: '7px 12px' }}>
                  <button style={{ fontSize: 13, color: '#378ADD', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                    {task.name}
                  </button>
                </td>
                <td style={{ padding: '7px 12px', color: '#555' }}>{task.type}</td>
                <td style={{ padding: '7px 12px', color: '#555', whiteSpace: 'nowrap' }}>
                  {task.duration ? (
                    <button style={{ fontSize: 13, color: '#378ADD', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>{task.duration}</button>
                  ) : ''}
                </td>
                <td style={{ padding: '7px 12px', color: '#555', whiteSpace: 'nowrap' }}>{task.lastRun}</td>
                <td style={{ padding: '7px 12px' }}><StatusBadge result={task.result} /></td>
                <td style={{ padding: '7px 12px', color: '#555' }}>{task.status}</td>
                <td style={{ padding: '7px 12px', color: '#555', whiteSpace: 'nowrap' }}>{task.nextRun}</td>
                <td style={{ padding: '7px 12px', color: '#555', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.scope}</td>
                <td style={{ padding: '7px 12px', color: '#555' }}>{task.freq}</td>
                <td style={{ padding: '7px 12px', color: '#555', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
