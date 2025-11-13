// Bouton générique Tailwind (variants + tailles).
import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'classnames'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-cyan-300',
  secondary: 'bg-foreground text-white hover:bg-slate-700',
  ghost: 'bg-transparent text-foreground hover:bg-background-soft',
  outline: 'border border-border text-foreground hover:bg-background-soft'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
}

/**
 * Generic button component with consistent variants/sizes.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
