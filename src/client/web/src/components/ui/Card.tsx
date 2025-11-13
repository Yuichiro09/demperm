// Atomes Card : wrappers communs pour titres, contenus et stats.
import clsx from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'

/** Base card wrapper used across the UI. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('rounded-2xl border border-border bg-white shadow-sm', className)}
      {...props}
    />
  )
}

/** Header area (title/description) for cards. */
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('flex flex-col gap-1 border-b border-border px-5 py-4', className)} {...props} />
  )
}

/** Title text styling inside a card. */
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={clsx('text-base font-semibold text-foreground', className)} {...props} />
}

/** Optional description text for card headers. */
export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx('text-sm text-muted', className)} {...props} />
}

/** Content body of a card. */
export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('px-5 py-4', className)} {...props} />
}

export function StatValue({ label, value }: { label: string; value: ReactNode }) {
  // Utilisé par ProfileHeader pour afficher les compteurs récupérés auprès du backend.
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border bg-background-soft px-4 py-3">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-lg font-semibold text-foreground">{value}</span>
    </div>
  )
}
