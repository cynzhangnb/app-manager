import { useState } from 'react'
import Sidebar from './Sidebar'
import TenantSidebar from './TenantSidebar'

function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.6446 10.7815C21.0843 11.62 21.7848 12.954 21.9882 13.9719C22.1585 14.8269 20.434 14.9521 20.434 14.9521C20.434 14.9521 20.6029 15.1456 20.6201 15.4358C20.6381 15.7288 20.2724 15.9223 20.2724 15.9223C20.2724 15.9223 20.6941 16.2281 20.5325 16.5382C20.3715 16.8468 20.0144 16.9365 20.0144 16.9365C20.0144 16.9365 20.5282 18.4984 19.4066 19.3861C18.3899 20.1883 15.9929 19.6322 15.9929 19.6322C15.9929 19.6322 15.8363 19.8498 15.6559 20.5285C15.4756 21.2084 15.4267 21.8499 15.5956 22.2881C15.7644 22.722 15.089 23.0036 14.1406 22.9695C12.4643 22.9085 10.4676 21.4094 9.73398 20.8589C9.69805 20.8323 9.66572 20.8079 9.63626 20.786C9.30503 20.5398 8.90841 20.6111 8.5664 20.6726C8.256 20.7284 7.99087 20.7762 7.85939 20.5711C7.5842 20.1401 9.0011 18.7759 10.2499 19.6351C10.5344 19.8305 10.852 20.0843 11.1861 20.3507C11.6783 20.7435 12.2049 21.1636 12.7079 21.4644C13.79 22.116 14.5221 21.8784 14.5221 21.8784C14.5221 21.8784 14.4481 21.0817 14.6163 20.4117C14.7743 19.773 15.3628 18.4643 15.3628 18.4643C15.3628 18.4643 18.4653 19.4473 19.1134 18.4998C19.4339 18.0333 19.14 16.6861 19.0919 16.5168C19.0437 16.3447 19.7673 16.2238 19.7673 16.2238C19.7673 16.2238 19.4504 16.0489 19.487 15.8299C19.5179 15.6448 19.6839 15.5226 19.8513 15.4486C19.9311 15.4138 19.8563 15.3306 19.7543 15.2178C19.6437 15.0949 19.5014 14.937 19.4942 14.7686C19.4827 14.4912 20.1811 14.2508 20.8041 14.0587C21.1432 13.954 21.1145 13.8721 21.0203 13.6058C21.0074 13.5685 20.993 13.5276 20.9779 13.4826C20.9133 13.2862 20.5238 12.5288 20.1402 11.7807C19.8175 11.1524 19.4978 10.5308 19.3771 10.2535C19.2679 10.0027 19.3074 9.82836 19.3649 9.57408C19.4461 9.21411 19.5639 8.69383 19.3476 7.56915C18.7635 4.53058 15.3111 0.844801 9.05139 1.90468C6.55242 2.32854 4.43927 4.00288 3.66831 5.23909C2.89879 6.47522 2.1034 8.35736 2.7903 10.6376C3.33421 12.4425 4.1296 13.0224 5.08522 13.72C5.42364 13.9663 5.78145 14.2274 6.15508 14.5623C7.99015 16.2038 7.12938 18.9552 7.12938 18.9552C7.12938 18.9552 7.46564 16.5937 6.15579 15.1782C5.92875 14.9327 5.60398 14.713 5.23323 14.4625C4.3006 13.8319 3.07986 13.0064 2.40661 11.0842C1.75492 9.21784 1.59038 6.36845 4.22372 3.64019C6.85562 0.911701 11.3442 0.440912 14.9892 1.66995C19.3419 3.13663 20.1667 6.62467 20.2544 7.39276C20.3536 8.25899 20.3069 8.87454 20.2731 9.31772C20.2487 9.64457 20.2307 9.87772 20.2839 10.0487C20.3219 10.1666 20.4606 10.4307 20.6446 10.7815ZM12.238 9.36729C15.5941 8.67163 16.3903 7.06569 16.1546 5.59756C15.9096 4.07113 14.022 2.55192 10.2226 3.20343C6.42093 3.85639 4.90775 6.02859 5.1894 7.33441C5.52063 8.85801 9.51339 9.93484 12.238 9.36729ZM5.37981 7.1111C5.24473 5.98872 6.89946 4.47939 10.1198 3.92745C13.3387 3.3727 15.1214 4.50072 15.0991 5.84652C15.0761 7.15802 14.1923 8.27487 11.7587 8.78401C9.45017 9.26907 5.54938 8.52225 5.37981 7.1111Z" fill="#1a1a1a"/>
    </svg>
  )
}

function HeaderTrail({ showBreadcrumb, breadcrumbItems, appName }) {
  const homeItem = showBreadcrumb ? breadcrumbItems[0] : null
  const currentItem = showBreadcrumb ? breadcrumbItems[1] : null
  const defaultTextColor = '#262626'
  const homeBreadcrumbColor = '#565656'
  const hoverTextColor = defaultTextColor
  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    gap: 6,
    minHeight: 20,
  }

  return (
    <nav aria-label="breadcrumb" style={contentStyle}>
      <button
        onClick={homeItem?.onClick}
        disabled={!showBreadcrumb}
        style={{
          border: 'none',
          background: 'transparent',
          padding: 0,
          margin: 0,
          fontSize: showBreadcrumb ? 13.5 : 14,
          lineHeight: 1,
          color: showBreadcrumb ? homeBreadcrumbColor : defaultTextColor,
          cursor: showBreadcrumb ? 'pointer' : 'default',
          whiteSpace: 'nowrap',
          fontWeight: showBreadcrumb ? 400 : 600,
          letterSpacing: '-0.01em',
          transition: 'font-size 180ms ease, font-weight 180ms ease, color 120ms ease, opacity 180ms ease',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          height: 20,
        }}
        onMouseEnter={e => {
          if (showBreadcrumb) {
            e.currentTarget.style.color = hoverTextColor
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = showBreadcrumb ? homeBreadcrumbColor : defaultTextColor
        }}
      >
        {showBreadcrumb ? homeItem?.label : appName}
      </button>

      <span style={{
        color: '#525252',
        fontSize: 13.5,
        lineHeight: 1,
        userSelect: 'none',
        opacity: showBreadcrumb ? 1 : 0,
        maxWidth: showBreadcrumb ? 12 : 0,
        overflow: 'hidden',
        transition: 'opacity 180ms ease, max-width 180ms ease',
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        alignSelf: 'center',
        height: 20,
      }}>
        /
      </span>

      <span style={{
        fontSize: 13.5,
        lineHeight: 1,
        color: defaultTextColor,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
        opacity: showBreadcrumb ? 1 : 0,
        maxWidth: showBreadcrumb ? 220 : 0,
        overflow: 'hidden',
        transition: 'opacity 180ms ease, max-width 180ms ease',
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        alignSelf: 'center',
        height: 20,
      }}>
        {currentItem?.label ?? ''}
      </span>
    </nav>
  )
}

export default function AppShell({ appMode = 'domain-manager', navItems, activeItemId, showBreadcrumb = false, breadcrumbItems = [], onSelectItem, children }) {
  const [expanded, setExpanded] = useState(true)

  const SidebarComponent = appMode === 'tenant-manager' ? TenantSidebar : Sidebar
  const appName = appMode === 'tenant-manager' ? 'Tenant Management' : 'Domain Management'

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      <SidebarComponent
        expanded={expanded}
        onToggleExpand={() => setExpanded(e => !e)}
        navItems={navItems}
        activeItemId={activeItemId}
        onSelectItem={onSelectItem}
      />

      {/* ── Right panel ───────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* App name header */}
        <div style={{
          height: 46,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 16px',
          background: '#fff',
          flexShrink: 0,
        }}>
          <LogoMark />
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
            <HeaderTrail
              showBreadcrumb={showBreadcrumb}
              breadcrumbItems={breadcrumbItems}
              appName={appName}
            />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', background: '#f9f9f9' }}>
          {children}
        </div>
      </div>

    </div>
  )
}
