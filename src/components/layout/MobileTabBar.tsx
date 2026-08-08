import { Briefcase, Home, Newspaper, Phone, Wrench } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Home', icon: Home, active: (p: string) => p === '/' },
  { to: '/services', label: 'Services', icon: Wrench, active: (p: string) => p.startsWith('/services') },
  { to: '/work', label: 'Work', icon: Briefcase, active: (p: string) => p.startsWith('/work') },
  { to: '/blog', label: 'Blog', icon: Newspaper, active: (p: string) => p.startsWith('/blog') },
  { to: '/contact', label: 'Contact', icon: Phone, active: (p: string) => p.startsWith('/contact') },
]

/** Fixed bottom navigation for phones/tablets — one-thumb access to the 5 core pages. */
export function MobileTabBar() {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex h-[64px] items-stretch">
        {tabs.map(({ to, label, icon: Icon, active }) => {
          const isActive = active(pathname)
          return (
            <Link
              key={to}
              to={to}
              aria-current={isActive ? 'page' : undefined}
              aria-label={label}
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
                isActive
                  ? 'text-orange-600'
                  : 'text-text-muted hover:text-text-primary active:text-orange-600'
              }`}
            >
              <span
                className={`absolute top-0 h-0.5 w-8 rounded-full transition-opacity ${
                  isActive ? 'bg-orange-600 opacity-100' : 'bg-transparent opacity-0'
                }`}
                aria-hidden
              />
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.25 : 1.75} aria-hidden />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
