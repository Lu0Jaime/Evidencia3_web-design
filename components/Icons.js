function Svg({ size = 15, style, children }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block', flexShrink: 0, verticalAlign: 'middle', ...style }}
    >
      {children}
    </svg>
  )
}

export function IconDashboard({ size, style }) {
  return <Svg size={size} style={style}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></Svg>
}
export function IconBell({ size, style }) {
  return <Svg size={size} style={style}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></Svg>
}
export function IconUsers({ size, style }) {
  return <Svg size={size} style={style}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Svg>
}
export function IconUser({ size, style }) {
  return <Svg size={size} style={style}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>
}
export function IconDatabase({ size, style }) {
  return <Svg size={size} style={style}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></Svg>
}
export function IconCode({ size, style }) {
  return <Svg size={size} style={style}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></Svg>
}
export function IconServer({ size, style }) {
  return <Svg size={size} style={style}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></Svg>
}
export function IconSearch({ size, style }) {
  return <Svg size={size} style={style}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Svg>
}
export function IconPlus({ size, style }) {
  return <Svg size={size} style={style}><path d="M5 12h14"/><path d="M12 5v14"/></Svg>
}
export function IconEdit({ size, style }) {
  return <Svg size={size} style={style}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></Svg>
}
export function IconTrash({ size, style }) {
  return <Svg size={size} style={style}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></Svg>
}
export function IconEye({ size, style }) {
  return <Svg size={size} style={style}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></Svg>
}
export function IconSave({ size, style }) {
  return <Svg size={size} style={style}><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></Svg>
}
export function IconWarning({ size, style }) {
  return <Svg size={size} style={style}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></Svg>
}
export function IconCheck({ size, style }) {
  return <Svg size={size} style={style}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></Svg>
}
export function IconXCircle({ size, style }) {
  return <Svg size={size} style={style}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></Svg>
}
export function IconList({ size, style }) {
  return <Svg size={size} style={style}><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></Svg>
}
export function IconClock({ size, style }) {
  return <Svg size={size} style={style}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>
}
export function IconCircleDot({ size, style }) {
  return <Svg size={size} style={style}><circle cx="12" cy="12" r="5" fill="currentColor" strokeWidth={0}/></Svg>
}
export function IconX({ size, style }) {
  return <Svg size={size} style={style}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Svg>
}
export function IconSun({ size, style }) {
  return <Svg size={size} style={style}><circle cx="12" cy="12" r="5"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></Svg>
}
export function IconMoon({ size, style }) {
  return <Svg size={size} style={style}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Svg>
}
