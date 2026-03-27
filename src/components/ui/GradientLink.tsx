import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'outline'

type Props = Omit<LinkProps, 'className'> & {
  children: ReactNode
  variant?: Variant
  className?: string
}

const base =
  'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'

const styles: Record<Variant, string> = {
  primary: 'btn-gradient-primary glow-btn',
  outline:
    'border border-border bg-transparent text-text-primary hover:border-orange-300 hover:bg-surface hover:scale-[1.02]',
}

export function GradientLink({ children, variant = 'primary', className = '', ...rest }: Props) {
  return (
    <Link className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  )
}
