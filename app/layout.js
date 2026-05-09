import './globals.css'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { unstable_cache } from 'next/cache'
import { createServerClient } from '@supabase/ssr'
import { supabase } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import LogoutButton from '@/components/LogoutButton'
import { IconWarning } from '@/components/Icons'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Cartera Fiscal | Sistema de Gestión',
  description: 'Sistema de Gestión de Cartera Fiscal de Clientes',
}

const getAlertCount = unstable_cache(
  async () => {
    try {
      const in30 = new Date(Date.now() + 30*86400000).toISOString().split('T')[0]
      const { count } = await supabase
        .from('obligaciones_fiscales')
        .select('*', { count: 'exact', head: true })
        .eq('estatus_cumplimiento', 'Pendiente')
        .lte('fecha_vencimiento', in30)
      return count || 0
    } catch { return 0 }
  },
  ['alert-count'],
  { revalidate: 60 }
)

export default async function RootLayout({ children }) {
  const cookieStore = cookies()
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )

  const { data: { user } } = await supabaseAuth.auth.getUser()
  const alertCount = user ? await getAlertCount() : 0

  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',d?'dark':'light');})();` }} />
      </head>
      <body>
        {user && (
          <>
            <header className="header">
              <Link href="/" className="header-logo">CarteraFiscal</Link>
              <nav className="header-nav">
                <Link href="/">Dashboard</Link>
                <Link href="/clientes">Clientes</Link>
                <Link href="/obligaciones">Obligaciones</Link>
              </nav>
              <div className="header-right">
                <span>{new Date().toLocaleDateString('es-MX',{day:'2-digit',month:'short',year:'numeric'})}</span>
                <ThemeToggle />
                <LogoutButton />
              </div>
            </header>

            {alertCount > 0 && (
              <div className="alert-banner">
                <IconWarning size={14} /> &nbsp;Hay{' '}
                <span className="alert-count">{alertCount}</span>{' '}
                obligaciones próximas a vencer o vencidas que requieren atención.
                <Link href="/obligaciones">Ver alertas →</Link>
              </div>
            )}
          </>
        )}

        <main>{children}</main>
        <div id="toast-root" />
      </body>
    </html>
  )
}
