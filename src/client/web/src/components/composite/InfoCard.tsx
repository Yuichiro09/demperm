// Tableau d'informations personnelles : affiche ou édite selon le mode.
interface InfoItem {
  label: string
  value: string
}

interface InfoCardProps {
  title?: string
  items: InfoItem[]
  isEditing?: boolean
  onChange?: (label: string, value: string) => void
}

export function InfoCard({ title = 'Informations', items, isEditing, onChange }: InfoCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-white shadow-sm">
      <header className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
        {title}
      </header>
      <dl className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-2 gap-2 px-4 py-3 text-sm">
            <dt className="text-muted">{item.label}</dt>
            <dd className="text-foreground">
              {isEditing ? (
                <input
                  value={item.value}
                  onChange={(event) => onChange?.(item.label, event.target.value)}
                  className="w-full rounded-2xl border border-border bg-background-soft px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              ) : item.value ? (
                item.value
              ) : (
                <span className="text-muted">—</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
