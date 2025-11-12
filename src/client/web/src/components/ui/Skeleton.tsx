// Skeleton : chargement shimmer basique pour les placeholders.
import clsx from 'classnames'

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx('animate-pulse rounded-2xl bg-border/80', className)} />
}
