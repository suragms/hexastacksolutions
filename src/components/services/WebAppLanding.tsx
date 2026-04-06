import { Box, Layers, LineChart, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { portfolio } from '../../data/servicesManifest'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { GradientLink } from '../ui/GradientLink'
import { Section } from '../ui/Section'
import { usePageSeo } from '../../hooks/usePageSeo'

const whyChoose = [
  {
    icon: LineChart,
    title: 'MVPs built for quick validation',
    body: 'Ship a lean product to real users, learn fast, and iterate without burning months.',
  },
  {
    icon: Layers,
    title: 'Scalable & future-ready',
    body: 'Architecture that won’t collapse when you add tenants, roles, or integrations.',
  },
  {
    icon: Box,
    title: 'Custom-tailored development',
    body: 'No one-size-fits-all: flows and data models match how your business actually works.',
  },
  {
    icon: Users,
    title: 'User-driven, UX-focused',
    body: 'Interfaces that reduce training time and support tickets, not just “feature lists.”',
  },
]

const whatWeBuild = [
  {
    title: 'MVP development',
    desc: 'For startups and teams who need to validate fast with core workflows only.',
    image: portfolio.webApps.mvp,
    alt: 'MVP dashboard and product UI',
  },
  {
    title: 'Business web applications',
    desc: 'Operations, portals, and internal tools with permissions and audit-friendly patterns.',
    image: portfolio.webApps.business,
    alt: 'Business web application dashboard',
  },
  {
    title: 'E‑commerce & marketplaces',
    desc: 'Checkout, catalog, and vendor flows when you outgrow off-the-shelf storefronts.',
    image: portfolio.webApps.ecommerce,
    alt: 'E‑commerce web application',
  },
  {
    title: 'Industry-specific solutions',
    desc: 'Tailored modules for healthcare, logistics, services, and Gulf-facing billing contexts.',
    image: portfolio.webApps.industry,
    alt: 'Industry-specific web software',
  },
]

const collaboration = [
  {
    title: 'Product development',
    body: 'From discovery to launch: strategy, design, development, and deployment with clear milestones.',
    image: portfolio.webApps.mvp,
    alt: 'Product development: dashboard and product UI',
  },
  {
    title: 'Team extension',
    body: 'Developers and designers who join your standups and tools to accelerate delivery without hiring overhead.',
    image: portfolio.webApps.business,
    alt: 'Team extension: collaboration and delivery',
  },
  {
    title: 'Dedicated team',
    body: 'A committed squad for your roadmap: full-cycle delivery, transparent workflows, and aligned goals.',
    image: portfolio.webApps.ecommerce,
    alt: 'Dedicated software team',
  },
]

const faq = [
  {
    q: 'How is a web app different from a marketing website?',
    a: 'Web apps center on logged-in workflows, data, roles, and integrations; marketing sites focus on storytelling and lead capture. We often deliver both.',
  },
  {
    q: 'What stack do you use?',
    a: 'We commonly ship React/TypeScript front ends with Node or API backends, chosen per performance and your team’s needs.',
  },
  {
    q: 'How long for an MVP?',
    a: 'Depends on scope; many MVPs ship in 8–16 weeks when the feature set is disciplined.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'Yes: security updates, monitoring, and feature iterations can be scoped after launch.',
  },
]

export function WebAppLanding() {
  usePageSeo({
    title: 'Custom web applications & software | Thrissur, Kerala | MVPs & B2B portals',
    description:
      'Custom web applications and software for Kerala, GCC, and global teams: MVPs, internal portals, dashboards, and scalable products. HexaStack Solutions, Thrissur.',
    canonicalPath: '/services/web-applications',
  })

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.siteUrl}/services` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Custom software development',
        item: `${site.siteUrl}/services/web-applications`,
      },
    ],
  }

  return (
    <Section className="relative pt-24 md:pt-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:48px_48px] opacity-60"
        aria-hidden
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Container>
        <nav className="text-sm text-text-muted" aria-label="Breadcrumb">
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Home
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <Link to="/services" className="text-orange-600 hover:text-orange-700">
            Services
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-text-primary">Custom software development</span>
        </nav>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeInView>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
              We build custom software that powers businesses
            </h1>
            <p className="mt-5 text-lg text-text-muted">
              You need more than a brochure site: a secure, scalable app that turns workflows into software your team
              trusts. From MVPs to multi-branch operations, we ship with clarity and long-term maintainability.
            </p>
            <GradientLink to="/contact?service=web-applications" className="mt-8 inline-flex">
              Get started
            </GradientLink>
          </FadeInView>
          <FadeInView delay={0.06} className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-amber-50/80 to-zinc-50 p-4 shadow-lg">
            <img
              src={portfolio.webAppHero}
              alt="Web application dashboard: charts and data UI"
              width={960}
              height={640}
              className="w-full rounded-xl object-cover object-top"
              loading="eager"
            />
          </FadeInView>
        </div>

        <FadeInView className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-xl font-semibold leading-snug text-text-primary md:text-2xl">
            At {site.name}, we engineer high-performance products that grow with you: fast, secure platforms that turn
            ideas into{' '}
            <span className="text-text-muted">interactive experiences your users rely on every day.</span>
          </p>
        </FadeInView>

        <FadeInView className="mt-20">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl">Why choose us?</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <item.icon className="h-5 w-5" strokeWidth={1.25} aria-hidden />
                </div>
                <h3 className="mt-4 border-b border-border pb-3 text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </FadeInView>

        <FadeInView className="mt-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl">What we build</h2>
            <GradientLink to="/contact?service=web-applications" className="shrink-0 self-start sm:self-auto">
              Get started
            </GradientLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {whatWeBuild.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:flex-row md:min-h-[240px]"
              >
                <div className="flex flex-1 flex-col justify-center p-6 md:w-1/2 md:max-w-[50%]">
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</p>
                </div>
                <div className="relative min-h-[180px] flex-1 md:min-h-0 md:w-1/2">
                  <img src={item.image} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </FadeInView>

        <FadeInView className="mt-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl">Our collaboration models</h2>
            <GradientLink to="/contact?service=web-applications" className="shrink-0 self-start sm:self-auto">
              Get started
            </GradientLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {collaboration.map((c) => (
              <div
                key={c.title}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="relative aspect-[16/10] w-full shrink-0">
                  <img
                    src={c.image}
                    alt={c.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-text-primary">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeInView>

        <FadeInView className="mt-24">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl">Frequently asked questions</h2>
          <dl className="mt-10 space-y-8">
            {faq.map((item) => (
              <div key={item.q} className="border-b border-border pb-8 last:border-0">
                <dt className="font-semibold text-text-primary">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </FadeInView>

        <FadeInView className="mt-20 rounded-2xl border border-orange-100 bg-orange-50/50 p-8 text-center md:p-10">
          <h2 className="text-xl font-bold text-text-primary">Explore related services</h2>
          <Link
            to="/services/web-design"
            className="mt-4 inline-block text-lg font-semibold text-orange-600 hover:text-orange-700"
          >
            Website design &amp; development
          </Link>
          <div className="mt-8">
            <GradientLink to="/contact?service=web-applications">Book a discovery call</GradientLink>
          </div>
        </FadeInView>
      </Container>
    </Section>
  )
}
