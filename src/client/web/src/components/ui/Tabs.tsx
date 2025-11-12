// Composant Tabs minimaliste (context interne + triggers).
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import clsx from 'classnames'

type TabsContextValue = {
  active: string
  setActive: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

export function Tabs({ defaultValue, value, onValueChange, children }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue)
  const activeValue = value ?? internal

  const ctx = useMemo<TabsContextValue>(() => ({
    active: activeValue,
    setActive: (next) => {
      if (!value) {
        setInternal(next)
      }
      onValueChange?.(next)
    }
  }), [activeValue, onValueChange, value])

  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 rounded-2xl border border-border bg-background-soft p-1">
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: ReactNode
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
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

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
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
