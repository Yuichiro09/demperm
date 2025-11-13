// Layout commun : en-tête + navigation entre les pages.
import { NavLink } from 'react-router-dom'
import { PropsWithChildren } from 'react'

// TODO API: ajuster cette navigation selon les routes autorisées dans la session utilisateur renvoyée par le backend.
const navItems = [
  { to: '/profil', label: 'Profil' },
  { to: '/profil/public', label: 'Profil public' },
  { to: '/vote', label: 'Vote' },
  { to: '/forum', label: 'Forum' },
  { to: '/messages', label: 'Messagerie' }
]

/**
 * Shared shell: header + nav + bounded main container.
 */
export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background-soft">
      <header className="border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Demperm</p>
            <h1 className="text-xl font-semibold text-foreground">Expérience citoyenne</h1>
          </div>
          <nav className="flex gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-2xl px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-primary text-white shadow-sm' : 'text-muted hover:bg-background-soft'
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">{children}</main>
    </div>
  )
}
