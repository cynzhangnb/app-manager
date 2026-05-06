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

const DOMAINS = [
  { name: 'Hybrid Network',        creator: 'zunyu.liu',                    desc: '',                                        fn: '2000 (1486 available)', cm: '3333',  aa: '48166', pa: '48166', aci: '1000 (760 available)',  wap: '1000 (967 available)'  },
  { name: 'Backup',                creator: 'zunyu.liu',                    desc: '',                                        fn: '1000 (807 available)',  cm: '2333',  aa: '47166', pa: '47166', aci: '1000 (904 available)',  wap: '1000 (972 available)'  },
  { name: 'testnbdownload',        creator: 'chao.liu',                     desc: '',                                        fn: '100 (96 available)',    cm: '100',   aa: '100',   pa: '100',   aci: '0 (0 available)',       wap: '0 (0 available)'       },
  { name: 'TEST',                  creator: 'Danny.Gan@netbraintec...',      desc: '',                                        fn: '100 (95 available)',    cm: '100',   aa: '100',   pa: '100',   aci: '0 (0 available)',       wap: '0 (0 available)'       },
  { name: 'GAL&RuleDiscoveryDEV',  creator: 'zunyu.liu',                    desc: 'This is for building the GAL libra...',   fn: '2000 (1773 available)', cm: '3333',  aa: '48166', pa: '48166', aci: '1000 (760 available)',  wap: '1000 (974 available)'  },
  { name: 'TestContactNB',         creator: 'Danny.Gan@netbraintec...',      desc: '',                                        fn: '100 (88 available)',    cm: '100',   aa: '6917',  pa: '6917',  aci: '300 (300 available)',   wap: '0 (0 available)'       },
  { name: 'CVE Ongoing Project',   creator: 'Lei.Li@netbraintech.com',       desc: '',                                        fn: '1000 (610 available)',  cm: '2333',  aa: '47166', pa: '47166', aci: '1000 (1000 available)', wap: '1000 (999 available)'  },
  { name: 'training',              creator: 'Jason.Sun@netbraintech....',     desc: '',                                        fn: '500 (440 available)',   cm: '1167',  aa: '23584', pa: '23584', aci: '500 (500 available)',   wap: '500 (500 available)'   },
  { name: 'CVE Release Domain',    creator: 'gchen',                         desc: '',                                        fn: '0 (0 available)',       cm: '0',     aa: '0',     pa: '0',     aci: '0 (0 available)',       wap: '0 (0 available)'       },
  { name: 'Dongxu-Demo',           creator: 'Dongxu.Jia@netbrain.com',       desc: '',                                        fn: '1000 (803 available)',  cm: '1267',  aa: '10234', pa: '10234', aci: '200 (200 available)',   wap: '200 (199 available)'   },
  { name: 'Test_for_cve_jyoti',    creator: 'jyoti_ceb',                     desc: '',                                        fn: '1000 (1000 available)', cm: '1000',  aa: '1000',  pa: '1000',  aci: '0 (0 available)',       wap: '0 (0 available)'       },
]

const DOMAIN_HEADERS = ['No.', 'Domain Name', 'Creator', 'Description', 'Foundation Nodes', 'Change Management Module', 'Application Assurance Module', 'Preventive Automation Module', 'Cisco ACI Ports', 'WAP Nodes']

function DomainListView() {
  return (
    <div style={{ flex: 1, padding: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#f9f9f9' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 12.5, color: '#555' }}>{DOMAINS.length} Items</span>
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: '#1a1a1a', border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 8px', borderRadius: 4 }}
          onMouseEnter={e => e.currentTarget.style.background = '#ebebeb'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Domain
        </button>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d0d0d0', background: '#fff', height: 30, paddingLeft: 8, width: 190 }}>
          <input placeholder="Search..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 12, background: 'transparent', fontStyle: 'italic' }} />
          <span style={{ color: '#378ADD', paddingRight: 8, display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
          </span>
        </div>
        <button style={{ border: 'none', background: 'transparent', color: '#378ADD', cursor: 'pointer', fontSize: 12 }}>Refresh</button>
        <button style={{ border: 'none', background: 'transparent', color: '#378ADD', cursor: 'pointer', fontSize: 12 }}>Help</button>
      </div>

      {/* Table card */}
      <div style={{ flex: 1, background: '#fff', border: '1px solid #e4e4e4', borderRadius: 8, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#f8f8f8', borderBottom: '1px solid #e8e8e8' }}>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 48 }}>No.</th>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 140 }}>Domain Name</th>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 160 }}>Creator</th>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 180 }}>Description</th>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 150 }}>Foundation Nodes</th>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 180 }}>Change Management Module</th>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 190 }}>Application Assurance Module</th>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 190 }}>Preventive Automation Module</th>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 150 }}>Cisco ACI Ports</th>
              <th style={{ padding: '7px 12px', textAlign: 'left', fontWeight: 600, color: '#555', whiteSpace: 'nowrap', minWidth: 130 }}>WAP Nodes</th>
            </tr>
          </thead>
          <tbody>
            {DOMAINS.map((d, i) => (
              <tr key={d.name} style={{ borderBottom: '1px solid #f5f5f5', background: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <td style={{ padding: '6px 12px', color: '#888' }}>{i + 1}</td>
                <td style={{ padding: '6px 12px' }}>
                  <button style={{ fontSize: 12, color: '#378ADD', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textAlign: 'left', whiteSpace: 'nowrap' }}>{d.name}</button>
                </td>
                <td style={{ padding: '6px 12px', color: '#555', whiteSpace: 'nowrap' }}>{d.creator}</td>
                <td style={{ padding: '6px 12px', color: '#555', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.desc}</td>
                <td style={{ padding: '6px 12px', color: '#555', whiteSpace: 'nowrap' }}>{d.fn}</td>
                <td style={{ padding: '6px 12px', color: '#555', whiteSpace: 'nowrap' }}>{d.cm}</td>
                <td style={{ padding: '6px 12px', color: '#555', whiteSpace: 'nowrap' }}>{d.aa}</td>
                <td style={{ padding: '6px 12px', color: '#555', whiteSpace: 'nowrap' }}>{d.pa}</td>
                <td style={{ padding: '6px 12px', color: '#555', whiteSpace: 'nowrap' }}>{d.aci}</td>
                <td style={{ padding: '6px 12px', color: '#555', whiteSpace: 'nowrap' }}>{d.wap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function TenantManagerPage({ view = 'user-authorization' }) {
  if (view === 'domain-list') {
    return <DomainListView />
  }

  return (
    <div style={{ flex: 1, padding: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#f9f9f9' }}>
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
