import { Link, useLocation } from 'react-router-dom'

export function FloatingBookCall() {
  const { pathname } = useLocation()
  if (pathname === '/contact') return null

  return (
    <Link
      to="/contact"
      className="btn-gradient-primary fixed bottom-[5.5rem] right-4 z-40 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 md:bottom-[5.5rem] md:right-4"
    >
      Get a Quote
    </Link>
  )
}
