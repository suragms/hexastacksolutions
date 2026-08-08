import { ChevronDown, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getNavGroups } from '../../data/serviceCatalog'
import { site } from '../../data/site'
import { useNavbarScroll } from '../../hooks/useNavbarScroll'
import { BrandWordmark } from './BrandWordmark'
import { Container } from '../ui/Container'
import { GradientLink } from '../ui/GradientLink'

/** Our Work: portfolio only; no duplicate “Portfolio overview” row. */
const workLinks = [
  { label: 'Website design & development', to: '/work' },
  { label: 'Web application development', to: '/work' },
]

const navGroups = getNavGroups()

const productLinks = [
  { label: 'HexaBill overview', to: '/products/hexabill' },
  { label: 'VAT billing', to: '/products/hexabill#vat' },
  { label: 'POS', to: '/products/hexabill#pos' },
  { label: 'ERP', to: '/products/hexabill#erp' },
  { label: 'Analytics', to: '/products/hexabill#analytics' },
]

const CLOSE_DELAY_MS = 200

function navItemActive(to: string, pathname: string, hash: string): boolean {
  if (to.includes('#')) {
    const [path, fragment] = to.split('#')
    return pathname === path && hash === `#${fragment}`
  }
  if (to === '/work') return pathname.startsWith('/work')
  return pathname === to
}

function dropdownLinkClass(to: string, pathname: string, hash: string) {
  const active = navItemActive(to, pathname, hash)
  return [
    'block px-4 py-2.5 text-sm font-medium transition rounded-lg mx-1',
    active
      ? 'bg-orange-500 text-white'
      : 'text-text-muted hover:bg-orange-500 hover:text-white active:bg-orange-600',
  ].join(' ')
}

function mobileSolutionLinkClass(to: string, pathname: string, hash: string) {
  const active = navItemActive(to, pathname, hash)
  return [
    'rounded-lg px-2 py-2.5 text-base font-medium transition',
    active
      ? 'bg-orange-500 text-white'
      : 'text-text-muted hover:bg-orange-500 hover:text-white',
  ].join(' ')
}

function mobileWorkLinkClass(pathname: string) {
  const active = pathname.startsWith('/work')
  return [
    'rounded-lg px-2 py-2.5 text-base font-medium transition',
    active ? 'bg-orange-500 text-white' : 'text-text-muted hover:bg-orange-500 hover:text-white',
  ].join(' ')
}

function NavDropdown({
  label,
  items,
  open,
  onOpen,
  onClose,
  labelActive,
}: {
  label: string
  items: { label: string; to: string }[]
  open: boolean
  onOpen: () => void
  onClose: () => void
  labelActive?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { pathname, hash } = useLocation()

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => onClose(), CLOSE_DELAY_MS)
  }, [clearCloseTimer, onClose])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) onClose()
    }
    if (open) document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer()
        onOpen()
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={`flex items-center gap-1 text-sm font-medium transition ${
          labelActive || open
            ? 'text-orange-700'
            : 'text-text-muted hover:text-orange-700'
        }`}
        aria-expanded={open}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 min-w-[280px] rounded-xl border border-orange-100/80 bg-card py-2 shadow-xl shadow-orange-900/10"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              role="menuitem"
              to={item.to}
              className={dropdownLinkClass(item.to, pathname, hash)}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function NavServicesDropdown({
  open,
  onOpen,
  onClose,
  labelActive,
}: {
  open: boolean
  onOpen: () => void
  onClose: () => void
  labelActive?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { pathname, hash } = useLocation()

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => onClose(), CLOSE_DELAY_MS)
  }, [clearCloseTimer, onClose])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) onClose()
    }
    if (open) document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer()
        onOpen()
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={`flex items-center gap-1 text-sm font-medium transition ${
          labelActive || open ? 'text-orange-700' : 'text-text-muted hover:text-orange-700'
        }`}
        aria-expanded={open}
        onClick={() => (open ? onClose() : onOpen())}
      >
        Services
        <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-[460px] rounded-xl border border-orange-100/80 bg-card py-3 shadow-xl shadow-orange-900/10"
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-3">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="px-3 text-[0.65rem] font-bold uppercase tracking-wider text-text-muted">
                  {group.label}
                </p>
                <div className="mt-1.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.to}
                      role="menuitem"
                      to={item.to}
                      className={dropdownLinkClass(item.to, pathname, hash)}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 border-t border-orange-100/70 px-2 pt-2">
            <Link
              to="/services"
              role="menuitem"
              className={dropdownLinkClass('/services', pathname, hash)}
              onClick={onClose}
            >
              All services →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function Navbar() {
  const solid = useNavbarScroll()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dd, setDd] = useState<'work' | 'services' | 'products' | null>(null)
  const { pathname, hash } = useLocation()

  /** Lock body scroll while the mobile menu is open so the drawer reads as a real overlay. */
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  const headerClass =
    solid || pathname !== '/'
      ? 'border-b border-border bg-background/95 shadow-sm backdrop-blur-md'
      : 'border-b border-transparent bg-transparent'

  const servicesNavActive = pathname.startsWith('/services')
  const workNavActive = pathname.startsWith('/work')
  const productsNavActive = pathname.startsWith('/products')

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${headerClass}`}>
      <Container className="flex h-14 items-center justify-between md:h-16">
        <BrandWordmark />

        <nav className="hidden lg:flex items-center gap-4 lg:gap-5" aria-label="Primary">
          <NavDropdown
            label="Our Work"
            items={workLinks}
            open={dd === 'work'}
            onOpen={() => setDd('work')}
            onClose={() => setDd(null)}
            labelActive={workNavActive}
          />
          <NavServicesDropdown
            open={dd === 'services'}
            onOpen={() => setDd('services')}
            onClose={() => setDd(null)}
            labelActive={servicesNavActive}
          />
          <NavDropdown
            label="Products"
            items={productLinks}
            open={dd === 'products'}
            onOpen={() => setDd('products')}
            onClose={() => setDd(null)}
            labelActive={productsNavActive}
          />
          <Link
            to="/about"
            className={`text-sm font-medium transition ${
              pathname === '/about' ? 'text-orange-700' : 'text-text-muted hover:text-orange-700'
            }`}
          >
            About
          </Link>
          <Link
            to="/blog"
            className={`text-sm font-medium transition ${
              pathname === '/blog' ? 'text-orange-700' : 'text-text-muted hover:text-orange-700'
            }`}
          >
            Blogs
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium transition ${
              pathname === '/contact' ? 'text-orange-700' : 'text-text-muted hover:text-orange-700'
            }`}
          >
            Contact
          </Link>
          <GradientLink to="/contact" className="!py-2 !px-4 text-sm">
            Get a Quote
          </GradientLink>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <GradientLink to="/contact" className="!py-2.5 !px-3.5 text-sm sm:!px-4">
            Request Pricing
          </GradientLink>
          <button
            type="button"
            className="rounded-lg p-2 text-text-primary hover:bg-orange-50"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="max-h-[min(80vh,calc(100vh-9.5rem))] overflow-y-auto border-b border-border bg-background lg:hidden"
        >
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            <div className="mb-2 grid grid-cols-2 gap-2 border-b border-border pb-3">
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe57]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </a>
              <a
                href={`tel:${site.phones[0].replace(/\s/g, '')}`}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 transition-colors hover:bg-orange-100"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call Us
              </a>
            </div>
            <Link
              to="/"
              className={`rounded-lg px-2 py-2.5 text-base font-medium transition ${
                pathname === '/'
                  ? 'bg-orange-500 text-white'
                  : 'text-text-muted hover:bg-orange-500 hover:text-white'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <p className="mt-1 px-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Our Work</p>
            {workLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={mobileWorkLinkClass(pathname)}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <p className="mt-3 px-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Services
            </p>
            {navGroups.map((group) => (
              <div key={group.label} className="mt-2">
                <p className="px-2 text-[0.65rem] font-bold uppercase tracking-wider text-text-muted">
                  {group.label}
                </p>
                <div className="mt-1">
                  {group.items.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={mobileSolutionLinkClass(l.to, pathname, hash)}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              to="/services"
              className={`mt-2 rounded-lg px-2 py-2.5 text-base font-medium transition ${
                pathname === '/services'
                  ? 'bg-orange-500 text-white'
                  : 'text-text-muted hover:bg-orange-500 hover:text-white'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              All services →
            </Link>
            <p className="mt-3 px-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Products</p>
            {productLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={mobileSolutionLinkClass(l.to, pathname, hash)}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/about"
              className={`mt-2 rounded-lg px-2 py-2.5 text-base font-medium transition ${
                pathname === '/about'
                  ? 'bg-orange-500 text-white'
                  : 'text-text-muted hover:bg-orange-500 hover:text-white'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              to="/blog"
              className={`rounded-lg px-2 py-2.5 text-base font-medium transition ${
                pathname === '/blog'
                  ? 'bg-orange-500 text-white'
                  : 'text-text-muted hover:bg-orange-500 hover:text-white'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className={`rounded-lg px-2 py-2.5 text-base font-medium transition ${
                pathname === '/contact'
                  ? 'bg-orange-500 text-white'
                  : 'text-text-muted hover:bg-orange-500 hover:text-white'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <GradientLink
              to="/contact"
              className="mt-3 w-full justify-center !py-2.5 !px-4 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Get a Quote
            </GradientLink>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
