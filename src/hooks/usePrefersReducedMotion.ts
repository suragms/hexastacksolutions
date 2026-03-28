import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Mirrors the OS “reduce motion” setting. Prefer this over mixing CSS
 * `animation: none` on marquee tracks with a duplicated DOM strip (that
 * combination leaves two static copies visible).
 */
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    setPrefers(mq.matches)
    const onChange = () => setPrefers(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return prefers
}
