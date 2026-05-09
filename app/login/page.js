'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.03em' }}>
            CarteraFiscal
          </div>
          <div style={{ fontSize: '.8rem', color: 'var(--text3)', marginTop: 5 }}>
            Sistema de Gestión Fiscal
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Iniciar Sesión</span>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div style={{
                  background: 'rgba(220,38,38,.12)', color: 'var(--red)',
                  border: '1px solid rgba(220,38,38,.25)',
                  borderRadius: 6, padding: '8px 12px',
                  fontSize: '.82rem', marginBottom: 14,
                }}>
                  {error}
                </div>
              )}

              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
                {loading
                  ? <><span className="spinner" /> Ingresando…</>
                  : 'Ingresar'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
