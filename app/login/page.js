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
    <>
      <style>{`
        .login-bg {
          position: fixed; inset: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          background: linear-gradient(145deg, #e8f5ee 0%, #f0f4f8 40%, #e2ecf8 100%);
          overflow: hidden;
        }
        [data-theme="dark"] .login-bg {
          background: linear-gradient(145deg, #071a10 0%, #0f172a 50%, #0a1628 100%);
        }
        .login-bg::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(15,95,62,0.12) 0%, transparent 70%);
          top: -150px; right: -100px;
          pointer-events: none;
        }
        .login-bg::after {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(15,95,62,0.08) 0%, transparent 70%);
          bottom: -100px; left: -80px;
          pointer-events: none;
        }
        .login-card {
          width: 100%; max-width: 420px;
          background: var(--surface);
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.8) inset;
          border: 1px solid var(--border);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }
        [data-theme="dark"] .login-card {
          box-shadow: 0 8px 40px rgba(0,0,0,0.5);
        }
        .login-card-top {
          background: linear-gradient(135deg, #0a3d26 0%, #0f5f3e 100%);
          padding: 36px 36px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .login-card-top::before {
          content: '';
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          top: -60px; right: -40px;
        }
        .login-logo {
          width: 56px; height: 56px;
          border-radius: 14px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          margin: 0 auto 16px;
          display: flex; align-items: center; justify-content: center;
        }
        .login-logo svg {
          width: 28px; height: 28px;
          color: #ffffff;
        }
        .login-brand {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 4px;
        }
        .login-subtitle {
          color: rgba(255,255,255,0.65);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .login-form-area {
          padding: 32px 36px 28px;
        }
        .login-welcome {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }
        .login-hint {
          font-size: 0.8rem;
          color: var(--text3);
          margin-bottom: 24px;
        }
        .login-field {
          margin-bottom: 16px;
        }
        .login-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text2);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .login-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          background: var(--surface2);
          color: var(--text);
          font-size: 0.88rem;
          font-family: var(--font);
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .login-input:focus {
          border-color: var(--primary);
          background: var(--input-focus-bg);
          box-shadow: 0 0 0 3px rgba(15,95,62,0.1);
        }
        [data-theme="dark"] .login-input:focus {
          box-shadow: 0 0 0 3px rgba(16,185,129,0.15);
        }
        .login-input::placeholder { color: var(--text3); }
        .login-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(220,38,38,0.07);
          color: var(--red);
          border: 1px solid rgba(220,38,38,0.2);
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 0.8rem;
          margin-bottom: 16px;
        }
        .login-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #0f5f3e 0%, #1a8a5a 100%);
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          font-family: var(--font);
          letter-spacing: 0.02em;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.18s, transform 0.12s, box-shadow 0.18s;
          box-shadow: 0 4px 14px rgba(15,95,62,0.35);
          margin-top: 4px;
        }
        .login-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(15,95,62,0.4);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .login-footer {
          text-align: center;
          padding: 0 36px 24px;
          font-size: 0.72rem;
          color: var(--text3);
        }
        .login-divider {
          height: 1px;
          background: var(--border);
          margin: 0 36px 20px;
        }
      `}</style>

      <div className="login-bg">
        <div className="login-card">

          <div className="login-card-top">
            <div className="login-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="login-brand">CarteraFiscal</div>
            <div className="login-subtitle">Sistema de Gestión Fiscal</div>
          </div>

          <div className="login-form-area">
            <div className="login-welcome">Bienvenido de vuelta</div>
            <div className="login-hint">Ingresa tus credenciales para continuar</div>

            <form onSubmit={handleLogin}>
              <div className="login-field">
                <label className="login-label">Correo electrónico</label>
                <input
                  className="login-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  required
                  autoFocus
                />
              </div>

              <div className="login-field">
                <label className="login-label">Contraseña</label>
                <input
                  className="login-input"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="login-error">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <button className="login-btn" type="submit" disabled={loading}>
                {loading
                  ? <><span className="spinner" /> Ingresando…</>
                  : 'Ingresar al sistema'}
              </button>
            </form>
          </div>

          <div className="login-divider" />
          <div className="login-footer" suppressHydrationWarning>
            CarteraFiscal &copy; {new Date().getFullYear()} — Todos los derechos reservados
          </div>

        </div>
      </div>
    </>
  )
}
