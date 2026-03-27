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
}

/** Websites, product UI & organic growth */
const coreServices: ServiceItem[] = [
  {
    title: 'Website design & development',
    desc: 'Marketing and corporate sites that load fast, tell a clear story, and convert.',
    icon: Code2,
    image: `${P}/web-ecommerce-fashion-store-landing-01.jpg`,
    imageAlt: 'Fashion e-commerce website design preview, marketing site example',
  },
  {
    title: 'Web application development',
    desc: 'Workflow tools, customer portals, and internal apps with real permissions and scale.',
    icon: AppWindow,
    image: `${P}/web-rizeshift-hr-payroll-dashboard-dark-06.webp`,
    imageAlt: 'HR and payroll SaaS dashboard, web application interface',
  },
  {
    title: 'UI/UX design',
    desc: 'Research-backed IA, accessible UI, and design systems your team can extend.',
    icon: Palette,
    image: `${P}/web-interior-design-architecture-landing-01.webp`,
    imageAlt: 'Interior design landing page, UI and visual design example',
  },
  {
    title: 'SEO optimization',
    desc: 'Technical SEO, structured content, and performance work that supports growth.',
    icon: Search,
    image: `${P}/web-digital-marketing-agency-landing-modern-green-20.webp`,
    imageAlt: 'Digital marketing and SEO-focused landing page preview',
  },
]

/** Mobile products & business / operations software */
const mobileAndBusiness: ServiceItem[] = [
  {
    title: 'Mobile apps',
    desc: 'React Native and cross-platform apps for commerce, bookings, and field teams, offline-aware where it matters.',
    icon: Smartphone,
    image: `${P}/mobile-app-ecommerce-shopping-ui-01.webp`,
    imageAlt: 'Mobile e-commerce shopping app UI, product discovery and checkout flows',
  },
  {
    title: 'HexaBill POS & ERP',
    desc: 'All-in-one POS, advanced ERP, and VAT: stock, billing, branches, and reports in a single app for every business scale.',
    icon: Briefcase,
    image: '/images/hexabill/POS.png',
    imageAlt: 'HexaBill POS and ERP: products, stock, and VAT-ready business screens',
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
            to="/contact"
            className="mt-4 inline-flex text-sm font-semibold text-orange-600 transition hover:text-orange-700"
          >
            Contact us
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
              Custom digital solutions, designed for growth
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              Pick a lane to start; we often combine design, build, SEO, mobile, and business systems in one
              roadmap for Kerala, Gulf, and global teams.
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
                alt="SaaS product dashboard and marketing UI showcase"
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
              alt="Interior and architecture landing — different preview from desktop sidebar"
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
              Same card size as the row above: mobile products plus HexaBill-style POS, ERP, and VAT in one stack.
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
          <GradientLink to="/contact">Discuss your project</GradientLink>
        </FadeInView>
      </Container>
    </Section>
  )
}
