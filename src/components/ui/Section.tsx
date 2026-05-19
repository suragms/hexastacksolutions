import type { ReactNode } from 'react'

type Props = {
  id?: string
  children: ReactNode
  className?: string
  as?: 'section' | 'div'
}

export function Section({ id, children, className = '', as: Tag = 'section' }: Props) {
  return (
    <Tag id={id} className={`scroll-mt-20 py-8 md:py-16 ${className}`}>
      {children}
    </Tag>
  )
}
