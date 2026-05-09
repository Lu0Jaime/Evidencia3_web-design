'use client'
import { useEffect, useState } from 'react'
import { IconSun, IconMoon } from '@/components/Icons'

function applyTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    setDark(isDark)
    setMounted(true)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    applyTheme(next)
  }

  if (!mounted) return <div style={{ width: 72, height: 28 }} />

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      <IconSun size={13} />
      <span className="toggle-track">
        <span className={`toggle-thumb ${dark ? 'toggle-thumb--dark' : ''}`} />
      </span>
      <IconMoon size={12} />
    </button>
  )
}
