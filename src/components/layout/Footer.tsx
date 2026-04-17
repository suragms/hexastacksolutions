import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { Container } from '../ui/Container'

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5z" />
      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5z" />
      <circle cx="17.35" cy="6.65" r="1.15" />
    </svg>
  )
}

const solutionLinks = [
  { label: 'Website design & development', to: '/services/web-design' },
  { label: 'Custom software development', to: '/services/web-applications' },
  { label: 'Search engine optimization', to: '/services/seo' },
]

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Client reviews', to: '/#reviews' },
  { label: 'Services', to: '/services' },
  { label: 'HexaBill (VAT, POS, ERP)', to: '/products/hexabill' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Blogs', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const legalLinks = [
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Security', to: '/security' },
  { label: 'Project rules', to: '/rules' },
  { label: 'No refund policy', to: '/refund-policy' },
]

const industryLinks = [
  'Healthcare',
  'Fintech',
  'E‑commerce',
  'Education',
  'Logistics',
  'Real estate',
  'Custom enterprise software',
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12 md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="text-lg font-bold uppercase tracking-wide text-text-primary">{site.legalName}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-muted">{site.tagline}</p>
            <p className="mt-4 flex items-start gap-2 text-sm text-text-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" aria-hidden />
              <span>{site.addressLine}</span>
            </p>
            <p className="mt-3 text-sm text-text-muted">
              <span className="font-medium text-text-primary">Serving:</span>{' '}
              {site.serviceAreasLabel}
            </p>
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-text-primary">Solutions</p>
            <ul className="mt-4 space-y-2">
              {solutionLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-text-muted transition hover:text-text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-text-primary">Quick links</p>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-text-muted transition hover:text-text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-semibold text-text-primary">Legal</p>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-text-muted transition hover:text-text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-text-primary">Industries</p>
            <ul className="mt-4 space-y-2">
              {industryLinks.map((name) => (
                <li key={name}>
                  <Link
                    to="/#stats"
                    className="text-sm text-text-muted transition hover:text-text-primary"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-text-primary">Contact</p>
            <ul className="mt-4 space-y-2">
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-sm text-text-muted transition hover:text-orange-600"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden />
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
            >
              WhatsApp for Fast Help
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 flex items-center gap-2 text-sm text-text-muted transition hover:text-orange-600"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              {site.email}
            </a>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.x}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-lg border border-border p-2 text-text-muted transition hover:border-orange-200 hover:text-text-primary"
                aria-label="X"
              >
                <IconX className="h-4 w-4" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-lg border border-border p-2 text-text-muted transition hover:border-orange-200 hover:text-text-primary"
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="h-4 w-4" />
              </a>
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-lg border border-border p-2 text-text-muted transition hover:border-orange-200 hover:text-text-primary"
                aria-label="GitHub"
              >
                <IconGitHub className="h-4 w-4" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-lg border border-border p-2 text-text-muted transition hover:border-orange-200 hover:text-text-primary"
                aria-label="Instagram"
              >
                <IconInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-border pt-8 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
