import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/** ~1536px cap; uses screen width better than max-w-7xl (1280px) on large monitors */
const containerClass =
  'mx-auto w-full min-w-0 max-w-[min(100%,92rem)] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'

export function Container({ children, className = '' }: Props) {
  return <div className={`${containerClass} ${className}`}>{children}</div>
}
