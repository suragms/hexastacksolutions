import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: Variant
  className?: string
}

export function GradientButton({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:pointer-events-none disabled:opacity-50'

  const styles: Record<Variant, string> = {
    primary: 'btn-gradient-primary glow-btn',
    outline:
      'border border-border bg-transparent text-text-primary hover:border-orange-300 hover:bg-surface hover:scale-[1.02]',
    ghost: 'bg-transparent text-text-muted hover:bg-surface hover:text-text-primary',
  }

  return (
    <button type={type} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
