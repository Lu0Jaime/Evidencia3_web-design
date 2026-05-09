import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <>
      <style>{`
        .unauth-bg {
          position: fixed; inset: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          background: linear-gradient(145deg, #e8f5ee 0%, #f0f4f8 40%, #e2ecf8 100%);
        }
        [data-theme="dark"] .unauth-bg {
          background: linear-gradient(145deg, #071a10 0%, #0f172a 50%, #0a1628 100%);
        }
        .unauth-card {
          width: 100%; max-width: 420px;
          background: var(--surface);
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.12);
          border: 1px solid var(--border);
          overflow: hidden;
          text-align: center;
        }
        [data-theme="dark"] .unauth-card { box-shadow: 0 8px 40px rgba(0,0,0,0.5); }
        .unauth-top {
          background: linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%);
          padding: 36px 36px 28px;
          position: relative; overflow: hidden;
        }
        .unauth-top::before {
          content: '';
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          top: -60px; right: -40px;
        }
        .unauth-icon {
          width: 56px; height: 56px;
          border-radius: 14px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          margin: 0 auto 16px;
          display: flex; align-items: center; justify-content: center;
        }
        .unauth-body { padding: 28px 36px 24px; }
        .unauth-title { font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 8px; letter-spacing: -0.01em; }
        .unauth-msg { font-size: 0.82rem; color: var(--text2); line-height: 1.65; margin-bottom: 24px; }
        .unauth-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #0f5f3e 0%, #1a8a5a 100%);
          color: #fff; border-radius: 10px;
          font-size: 0.88rem; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(15,95,62,0.35);
          transition: opacity 0.18s, transform 0.12s;
        }
        .unauth-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .unauth-divider { height: 1px; background: var(--border); margin: 0 36px 20px; }
        .unauth-footer { padding: 0 36px 24px; font-size: 0.72rem; color: var(--text3); }
      `}</style>

      <div className="unauth-bg">
        <div className="unauth-card">

          <div className="unauth-top">
            <div className="unauth-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div style={{ color:'#fff', fontSize:'1.4rem', fontWeight:800, letterSpacing:'-0.03em', marginBottom:4 }}>
              Acceso Restringido
            </div>
            <div style={{ color:'rgba(255,255,255,0.65)', fontSize:'0.75rem', letterSpacing:'0.05em', textTransform:'uppercase' }}>
              CarteraFiscal · Sistema de Gestión Fiscal
            </div>
          </div>

          <div className="unauth-body">
            <div className="unauth-title">No tienes permiso para acceder</div>
            <div className="unauth-msg">
              Esta área es exclusiva para usuarios autorizados.<br />
              Inicia sesión con tus credenciales para continuar.
            </div>
            <Link href="/login" className="unauth-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Ir al Inicio de Sesión
            </Link>
          </div>

          <div className="unauth-divider" />
          <div className="unauth-footer" suppressHydrationWarning>
            CarteraFiscal &copy; {new Date().getFullYear()} — Todos los derechos reservados
          </div>

        </div>
      </div>
    </>
  )
}
