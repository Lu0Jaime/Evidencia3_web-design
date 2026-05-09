'use client'
import { useEffect } from 'react'
import { IconCheck, IconXCircle, IconWarning } from '@/components/Icons'

const ico = {
  success: <IconCheck size={14} />,
  error:   <IconXCircle size={14} />,
  warn:    <IconWarning size={14} />,
}

export function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t) }, [onDone])
  return <div className={`toast ${type}`}>{ico[type]} {msg}</div>
}
