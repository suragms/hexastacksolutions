import { Link, useLocation } from 'react-router-dom'

export function FloatingBookCall() {
  const { pathname } = useLocation()
  if (pathname === '/contact') return null

  return (
    <Link
      to="/contact"
      className="btn-gradient-primary fixed z-40 rounded-xl px-4 py-3 text-sm font-semibold [bottom:max(1rem,env(safe-area-inset-bottom,0px))] [right:max(1rem,env(safe-area-inset-right,0px))] md:bottom-8 md:right-8"
    >
      Book a call
    </Link>
  )
}
