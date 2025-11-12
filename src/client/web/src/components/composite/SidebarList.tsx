// Liste latérale générique (messages, communautés, élections).
import clsx from 'classnames'

export interface SidebarItem {
  id: string
  title: string
  subtitle?: string
  meta?: string
}

interface SidebarListProps {
  title?: string
  items: SidebarItem[]
  activeId?: string
  onSelect?: (id: string) => void
  actionLabel?: string
  onAction?: () => void
}

export function SidebarList({ title, items, activeId, onSelect, actionLabel, onAction }: SidebarListProps) {
  return (
    <aside className="rounded-2xl border border-border bg-white shadow-sm">
      {title && <header className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">{title}</header>}
      <ul className="divide-y divide-border">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect?.(item.id)}
                className={clsx(
                  'w-full px-4 py-3 text-left text-sm transition-colors',
                  active ? 'bg-primary/10 text-primary' : 'hover:bg-background-soft'
                )}
              >
                <p className="font-semibold">{item.title}</p>
                {item.subtitle && <p className="text-xs text-muted">{item.subtitle}</p>}
                {item.meta && <p className="text-xs text-muted">{item.meta}</p>}
              </button>
            </li>
          )
        })}
      </ul>
      {actionLabel && (
        <button
          type="button"
          className="w-full rounded-b-2xl px-4 py-3 text-center text-sm font-semibold text-primary hover:bg-background-soft"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </aside>
  )
}
