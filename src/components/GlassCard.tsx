import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientBorder?: boolean;
  hover?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, gradientBorder, hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="glass-card"
        className={cn(
          'rounded-2xl border backdrop-blur-xl shadow-[var(--shadow-card)] transition-all duration-300',
          gradientBorder ? 'gradient-border' : 'bg-[var(--glass-bg)] border-[var(--glass-border)]',
          hover && 'hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]',
          className
        )}
        {...props}
      />
    );
  }
);
GlassCard.displayName = 'GlassCard';

export { GlassCard };
