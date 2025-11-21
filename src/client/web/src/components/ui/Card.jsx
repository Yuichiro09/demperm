// Atomes Card : wrappers communs pour titres, contenus et stats.
import clsx from 'classnames'

/**
 * Conteneur de carte générique (fond blanc + bord).
 */
export function Card({ className, ...props }) {
  return <div className={clsx('rounded-2xl border border-border bg-white shadow-sm', className)} {...props} />
}

/**
 * En-tête de carte (zone titre/description).
 */
export function CardHeader({ className, ...props }) {
  return <div className={clsx('flex flex-col gap-1 border-b border-border px-5 py-4', className)} {...props} />
}

/**
 * Style de titre interne aux cartes.
 */
export function CardTitle({ className, ...props }) {
  return <h3 className={clsx('text-base font-semibold text-foreground', className)} {...props} />
}

/**
 * Description optionnelle sous les titres de carte.
 */
export function CardDescription({ className, ...props }) {
  return <p className={clsx('text-sm text-muted', className)} {...props} />
}

/**
 * Corps de contenu d'une carte.
 */
export function CardContent({ className, ...props }) {
  return <div className={clsx('px-5 py-4', className)} {...props} />
}

/**
 * Valeur stat (label + valeur) utilisée dans les en-têtes de profil.
 * @param label nom de la statistique
 * @param value valeur affichée
 */
export function StatValue({ label, value }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border bg-background-soft px-4 py-3">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-lg font-semibold text-foreground">{value}</span>
    </div>
  )
}
