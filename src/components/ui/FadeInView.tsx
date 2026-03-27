import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'zoomIn'

const variants: Record<
  Variant,
  { initial: Record<string, number>; animate: Record<string, number> }
> = {
  fadeUp: { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } },
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  slideLeft: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  slideRight: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
  zoomIn: { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 } },
}

type Props = {
  children: ReactNode
  className?: string
  variant?: Variant
  delay?: number
  duration?: number
}

export function FadeInView({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.5,
}: Props) {
  const reduce = useReducedMotion()
  const v = variants[variant]

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
