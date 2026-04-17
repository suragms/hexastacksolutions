import type { LucideIcon } from 'lucide-react'
import { AppWindow, Briefcase, Code2, Palette, Search, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { GradientLink } from '../ui/GradientLink'
import { Section } from '../ui/Section'

const P = '/images/portfolio'

type ServiceItem = {
  title: string
  desc: string
  icon: LucideIcon
  image: string
  imageAlt: string
  detailTo: string
}

/** Websites, product UI & organic growth */
const coreServices: ServiceItem[] = [
  {
    title: 'Website design & development',
    desc: 'Marketing and corporate sites that load fast, tell a clear story, and convert.',
    icon: Code2,
    image: `${P}/web-ecommerce-fashion-store-landing-01.jpg`,
    imageAlt:
      'Web development company in Kerala — fashion ecommerce marketing site UI, Thrissur HexaStack portfolio preview',
    detailTo: '/services/web-design',
  },
  {
    title: 'Web application development',
    desc: 'Workflow tools, customer portals, and internal apps with real permissions and scale.',
    icon: AppWindow,
    image: `${P}/web-rizeshift-hr-payroll-dashboard-dark-06.webp`,
    imageAlt:
      'Custom web application dashboard for Kerala and GCC clients — HR payroll SaaS interface example, Thrissur team',
    detailTo: '/services/web-applications',
  },
  {
    title: 'UI/UX design',
    desc: 'Research-backed IA, accessible UI, and design systems your team can extend.',
    icon: Palette,
    image: `${P}/web-interior-design-architecture-landing-01.webp`,
    imageAlt:
      'UI UX design for websites and apps in Kerala — interior architecture landing page visual design, HexaStack Thrissur',
    detailTo: '/services/web-design',
  },
  {
    title: 'SEO optimization',
    desc: 'Technical SEO, structured content, and performance work that supports growth.',
    icon: Search,
    image: `${P}/web-digital-marketing-agency-landing-modern-green-20.webp`,
    imageAlt:
      'Technical SEO and digital marketing landing page preview for Kerala and Gulf B2B visibility, Thrissur agency',
    detailTo: '/services/seo',
  },
]

/** Mobile products & business / operations software */
const mobileAndBusiness: ServiceItem[] = [
  {
    title: 'Mobile apps',
    desc: 'React Native and cross-platform apps for commerce, bookings, and field teams, offline-aware where it matters.',
    icon: Smartphone,
    image: `${P}/mobile-app-ecommerce-shopping-ui-01.webp`,
    imageAlt:
      'Mobile app development Kerala — ecommerce shopping app UI with product discovery and checkout, HexaStack Thrissur',
    detailTo: '/services/web-applications',
  },
  {
    title: 'HexaBill POS & ERP',
    desc: 'All-in-one POS, advanced ERP, and VAT: stock, billing, branches, and reports in a single app for every business scale.',
    icon: Briefcase,
    image: '/images/hexabill/POS.png',
    imageAlt:
      'ERP software company Kerala — HexaBill POS and ERP dashboard with stock, billing, and VAT-ready screens for UAE and India',
    detailTo: '/products/hexabill',
  },
]

function ServiceCardImage({
  src,
  alt,
  Icon,
}: {
  src: string
  alt: string
  Icon: LucideIcon
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className="relative flex aspect-[16/11] items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-zinc-100"
        aria-hidden
      >
        <Icon className="h-14 w-14 text-orange-400/80" strokeWidth={1.25} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_50%)]" />
      </div>
    )
  }

  return (
    <div className="relative aspect-[16/11] overflow-hidden rounded-t-2xl bg-zinc-100">
      <img
        src={src}
        alt={alt}
        width={640}
        height={440}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent" />
    </div>
  )
}

function ServiceCard({
  item,
  delay,
  className,
}: {
  item: ServiceItem
  delay: number
  className?: string
}) {
  return (
    <FadeInView delay={delay} className={className ? `h-full ${className}` : 'h-full'}>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-orange-100/80 bg-white/90 shadow-md shadow-orange-900/[0.04] ring-1 ring-zinc-900/[0.04] transition duration-300 ease-out hover:border-orange-200 hover:shadow-xl md:hover:-translate-y-0.5 motion-reduce:md:hover:translate-y-0">
        <ServiceCardImage src={item.image} alt={item.imageAlt} Icon={item.icon} />
        <div className="flex flex-1 flex-col p-5 pt-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-white text-orange-600 shadow-sm ring-1 ring-orange-200/70">
            <item.icon className="h-6 w-6" aria-hidden />
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-snug text-text-primary">{item.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{item.desc}</p>
          <Link
            to={item.detailTo}
            className="mt-4 inline-flex text-sm font-semibold text-orange-600 transition hover:text-orange-700"
          >
            See How We Can Help Your Business
          </Link>
        </div>
      </div>
    </FadeInView>
  )
}

export function Services() {
  return (
    <Section id="services" className="relative !py-16 md:!py-24">
      <div className="bg-services-warm absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-orange-200/60 to-transparent"
        aria-hidden
      />

      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeInView className="max-w-2xl text-left lg:max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Solutions</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.5rem] lg:leading-tight">
              SEO-focused software services built to grow your business
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              Start with one priority and scale from there. We combine design, development, mobile app development
              Kerala, ERP software Kerala, and AI automation services Kerala into one practical roadmap for Thrissur
              and businesses across Kerala.
            </p>
            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
            >
              View all services
            </Link>
          </FadeInView>

          <FadeInView className="hidden shrink-0 lg:block lg:w-[min(100%,380px)]" variant="fadeIn">
            <div className="overflow-hidden rounded-2xl border border-orange-200/40 bg-white/80 shadow-lg shadow-orange-900/5 ring-1 ring-orange-100/80">
              <img
                src={`${P}/web-saas-dashboard-landing-gradient-clean-ui-21.webp`}
                alt="SaaS product dashboard and marketing UI — web development company in Kerala portfolio showcase, Thrissur HexaStack"
                width={760}
                height={480}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <p className="mt-2 text-center text-xs text-text-muted">Recent product &amp; marketing UI work</p>
          </FadeInView>
        </div>

        <FadeInView className="mt-10 lg:hidden" variant="fadeIn">
          <div className="overflow-hidden rounded-2xl border border-orange-200/40 bg-white/80 shadow-md ring-1 ring-orange-100/80">
            <img
              src={`${P}/web-interior-design-architecture-landing-01.webp`}
              alt="Interior architecture landing page — web design Kerala preview, mobile layout variant, HexaStack Thrissur"
              width={760}
              height={480}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </FadeInView>

        {/* Block 1: Web & growth */}
        <div className="mt-12">
          <FadeInView>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Websites, product UI &amp; SEO
            </h3>
          </FadeInView>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:gap-6">
            {coreServices.map((item, i) => (
              <ServiceCard key={item.title} item={item} delay={i * 0.06} />
            ))}
          </div>
        </div>

        {/* Block 2: same grid density as above (full width, no narrow max-w) */}
        <div
          id="mobile-business"
          className="mt-10 scroll-mt-28 border-t border-orange-200/40 pt-10 md:mt-12 md:pt-12"
        >
          <FadeInView>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Mobile apps &amp; business solutions
            </h3>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-text-muted">
              Mobile products plus HexaBill-style POS, ERP, and VAT in one stack so teams spend less time on manual
              operations and more time serving customers.
            </p>
          </FadeInView>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:gap-6">
            {mobileAndBusiness.map((item, i) => (
              <ServiceCard
                key={item.title}
                item={item}
                delay={i * 0.05}
                className={i === 0 ? 'lg:col-start-2 lg:col-span-1' : 'lg:col-start-3 lg:col-span-1'}
              />
            ))}
          </div>
        </div>

        <FadeInView className="mt-14 text-center">
          <GradientLink to="/contact">Start Your Project Today</GradientLink>
        </FadeInView>
      </Container>
    </Section>
  )
}
