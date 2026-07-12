import * as React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientBorder?: boolean
  hover?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, gradientBorder, hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="glass-card"
        className={cn(
          'glass-card rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-colors duration-200',
          gradientBorder && 'ring-1 ring-orange-100',
          hover && 'card-hover',
          className,
        )}
        {...props}
      />
    )
  },
)
GlassCard.displayName = 'GlassCard'

export { GlassCard }
