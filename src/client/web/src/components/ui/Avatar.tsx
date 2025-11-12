// Avatar circulaire : affiche l'image ou l'initiale.
import clsx from 'classnames'

interface AvatarProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  fallback?: string
}

const sizeMap = {
  sm: 'h-10 w-10',
  md: 'h-16 w-16',
  lg: 'h-24 w-24'
}

export function Avatar({ src, alt, size = 'md', fallback }: AvatarProps) {
  return (
    <div className={clsx('overflow-hidden rounded-full border border-border bg-background-soft', sizeMap[size])}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
          {fallback ?? alt[0]?.toUpperCase()}
        </div>
      )}
    </div>
  )
}
