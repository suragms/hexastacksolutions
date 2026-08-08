import { Link, useLocation } from 'react-router-dom'

export function FloatingBookCall() {
  const { pathname } = useLocation()
  if (pathname === '/contact') return null

  return (
    <Link
      to="/contact"
      className="btn-gradient-primary fixed bottom-[5.5rem] right-4 z-40 hidden rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 lg:block lg:bottom-[5.5rem] lg:right-4"
    >
      Get a Quote
    </Link>
  )
}
