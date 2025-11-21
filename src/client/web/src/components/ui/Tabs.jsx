// Composant Tabs minimaliste (context interne + triggers).
import { createContext, useContext, useMemo, useState } from 'react'
import clsx from 'classnames'

const TabsContext = createContext(null)

/**
 * Wrapper d'onglets contrôlés : gère un état interne ou relaie un état contrôlé.
 * @param defaultValue valeur initiale quand non contrôlé
 * @param value valeur contrôlée
 * @param onValueChange callback quand l'onglet change
 * @param children triggers + contenus
 */
export function Tabs({ defaultValue, value, onValueChange, children }) {
  // Piloté par les pages (ex VoteDashboard) pour refléter les filtres récupérés côté API.
  const [internal, setInternal] = useState(defaultValue)
  const activeValue = value ?? internal

  const ctx = useMemo(
    () => ({
      active: activeValue,
      setActive: (next) => {
        if (value === undefined) {
          setInternal(next)
        }
        onValueChange?.(next)
      }
    }),
    [activeValue, onValueChange, value]
  )

  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>
}

/** Liste horizontale qui héberge les triggers des tabs. */
export function TabsList({ children }) {
  return <div className="flex gap-2 rounded-2xl border border-border bg-background-soft p-1">{children}</div>
}

/**
 * Bouton qui active un onglet donné.
 * @param value valeur de l'onglet
 * @param children contenu du bouton
 */
export function TabsTrigger({ value, children }) {
  const ctx = useTabsContext()
  const isActive = ctx.active === value

  return (
    <button
      type="button"
      onClick={() => ctx.setActive(value)}
      className={clsx(
        'flex-1 rounded-2xl px-4 py-2 text-sm font-medium transition-colors',
        isActive ? 'bg-white text-foreground shadow-sm' : 'text-muted'
      )}
    >
      {children}
    </button>
  )
}

/**
 * Rend le contenu uniquement si la valeur de tab correspond à l'onglet actif.
 * @param value valeur à matcher
 * @param children contenu rendu quand actif
 */
export function TabsContent({ value, children }) {
  const ctx = useTabsContext()
  if (ctx.active !== value) return null
  return <div className="mt-4">{children}</div>
}

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error('TabsContext is missing. Wrap components in <Tabs>.')
  }
  return ctx
}
