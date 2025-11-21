// Avatar circulaire : affiche l'image ou l'initiale.
import clsx from 'classnames'

const sizeMap = {
  sm: 'h-10 w-10',
  md: 'h-16 w-16',
  lg: 'h-24 w-24'
}

/**
 * Avatar circulaire : affiche la photo fournie ou les initiales en fallback.
 * @param {object} props
 * @param {string} props.src URL de la photo
 * @param {string} props.alt texte alternatif (utilisé pour les initiales)
 * @param {'sm'|'md'|'lg'} [props.size] taille de l'avatar
 * @param {string} [props.fallback] texte à afficher si pas de photo
 */
export function Avatar({ src, alt, size = 'md', fallback }) {
  return (
    <div className={clsx('overflow-hidden rounded-full border border-border bg-background-soft', sizeMap[size])}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
          {fallback ?? alt?.[0]?.toUpperCase()}
        </div>
      )}
    </div>
  )
}
