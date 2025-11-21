// Skeleton : chargement shimmer basique pour les placeholders.
import clsx from 'classnames'

/**
 * Placeholder animé à utiliser pendant les chargements.
 * @param className classes supplémentaires
 */
export function Skeleton({ className }) {
  // À utiliser pendant le fetch des données (profil, posts, etc.) avant de montrer les vraies valeurs.
  return <div className={clsx('animate-pulse rounded-2xl bg-border/80', className)} />
}
