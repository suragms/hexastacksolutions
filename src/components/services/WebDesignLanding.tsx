import { Aperture, Hexagon, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { portfolio } from '../../data/servicesManifest'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { GradientLink } from '../ui/GradientLink'
import { Section } from '../ui/Section'
import { usePageSeo } from '../../hooks/usePageSeo'

const why = [
  {
    icon: Hexagon,
    title: 'Design drives business revenue',
    body: 'A well-designed site doesn’t just look good: it guides visitors toward action with clear hierarchy and trust.',
  },
  {
    icon: Aperture,
    title: 'Design impacts brand image',
    body: 'Structure, typography, and visuals tell people what you stand for before they read a full paragraph.',
  },
  {
    icon: Shield,
    title: 'Design creates lasting impressions',
    body: 'You often have seconds to earn attention. We help you make that moment intentional.',
  },
]

const differentiators = [
  {
    title: 'Custom-tailored design',
    desc: 'No cookie-cutter templates: layouts and components shaped to your brand and goals.',
    image: portfolio.webDesign.tailored,
    alt: 'Custom website design example',
  },
  {
    title: 'Mobile-first, always',
    desc: 'Responsive layouts and touch-friendly patterns so every device feels intentional.',
    image: portfolio.webDesign.mobileFirst,
    alt: 'Responsive mobile web experience',
  },
  {
    title: 'SEO & performance built-in',
    desc: 'Fast loads, sensible metadata, and structured content that search engines and users both understand.',
    image: portfolio.webDesign.seoPerf,
    alt: 'SEO and performance focused web build',
  },
  {
    title: 'Strategy-first approach',
    desc: 'We align pages and CTAs with what you sell, whether that’s leads, bookings, or product sales.',
    image: portfolio.webDesign.strategy,
    alt: 'Strategy-led web design',
  },
]

const processPhases = [
  {
    title: 'Onboarding & deep dive',
    items: [
      'Goals, audience, and success metrics',
      'Content and integration requirements',
      'Scope, milestones, and timeline',
    ],
  },
  {
    title: 'UX & structure',
    items: ['Sitemap and key user flows', 'Wireframes and layout decisions', 'Accessibility and content patterns'],
  },
  {
    title: 'Design & build',
    items: ['High-fidelity UI aligned to your brand', 'Responsive front-end', 'CMS or headless setup when needed'],
  },
  {
    title: 'Launch & iterate',
    items: ['Performance and SEO checks', 'Cross-browser testing', 'Handover and optional maintenance'],
  },
]

const faq = [
  {
    q: 'How long does a website project take?',
    a: 'Most marketing sites land in a few weeks; larger or multilingual builds are phased with clear milestones.',
  },
  {
    q: 'Do you use templates?',
    a: 'We design for your brand, not generic themes. Components may reuse proven patterns for speed and quality.',
  },
  {
    q: 'Will my site be mobile-friendly?',
    a: 'Yes: every build is responsive and tested on common breakpoints.',
  },
  {
    q: 'Do you include SEO?',
    a: 'We bake in technical SEO and performance foundations; ongoing content and campaigns can be layered on.',
  },
]

export function WebDesignLanding() {
  usePageSeo({
    title: 'Website design & development',
    description:
      'Custom website design and development for Kerala and Gulf businesses: SEO-ready, fast, conversion-focused. HexaStack Solutions, Thrissur.',
    canonicalPath: '/services/web-design',
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
        name: 'Website design & development',
        item: `${site.siteUrl}/services/web-design`,
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
          <span className="text-text-primary">Website design &amp; development</span>
        </nav>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeInView>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
              First impression matters. Let&apos;s make yours memorable.
            </h1>
            <p className="mt-5 text-lg text-text-muted">
              A poorly designed website is like a locked door: your audience won&apos;t stick around to knock.
            </p>
            <GradientLink to="/contact?service=web-design" className="mt-8 inline-flex">
              Contact us
            </GradientLink>
          </FadeInView>
          <FadeInView delay={0.06} className="grid grid-cols-2 gap-3 sm:gap-4">
            {portfolio.heroCollage.map((src, i) => (
              <div
                key={src}
                className={`overflow-hidden rounded-2xl border border-border bg-card shadow-sm ${
                  i === 1 ? 'translate-y-4' : i === 2 ? '-translate-y-4' : ''
                }`}
              >
                <img
                  src={src}
                  alt=""
                  width={640}
                  height={400}
                  className="aspect-[4/3] w-full object-cover object-top"
                  loading="eager"
                />
              </div>
            ))}
          </FadeInView>
        </div>

        <FadeInView className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-xl font-semibold leading-snug text-text-primary md:text-2xl">
            We don&apos;t do cookie-cutter designs. Every business is unique, and so should be its website. Our
            process focuses on intuitive, compelling experiences that look good and{' '}
            <span className="text-text-muted">work effortlessly for your audience.</span>
          </p>
        </FadeInView>

        <FadeInView className="mt-20">
          <h2 className="text-center text-2xl font-bold text-text-primary md:text-3xl">
            Why a great website matters
          </h2>
          <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-8">
            {why.map((item) => (
              <div key={item.title} className="text-center md:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 md:mx-0">
                  <item.icon className="h-6 w-6" strokeWidth={1.25} aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </FadeInView>

        <FadeInView className="mt-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl">What makes our approach different?</h2>
            <GradientLink to="/contact?service=web-design" className="shrink-0 self-start sm:self-auto">
              Get started
            </GradientLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:flex-row md:min-h-[240px]"
              >
                <div className="flex flex-1 flex-col justify-center p-6 md:w-1/2 md:max-w-[50%]">
                  <h3 className="text-lg font-semibold text-text-primary">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{d.desc}</p>
                </div>
                <div className="relative min-h-[180px] flex-1 md:min-h-0 md:w-1/2">
                  <img src={d.image} alt={d.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </FadeInView>

        <FadeInView className="mt-24">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl">Our design process</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {processPhases.map((phase) => (
              <div key={phase.title} className="rounded-2xl border border-border bg-card/80 p-6">
                <h3 className="text-lg font-semibold text-text-primary">{phase.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-text-muted">
                  {phase.items.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
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
            to="/services/web-applications"
            className="mt-4 inline-block text-lg font-semibold text-orange-600 hover:text-orange-700"
          >
            Web application development
          </Link>
          <div className="mt-8">
            <GradientLink to="/contact?service=web-design">Book a discovery call</GradientLink>
          </div>
        </FadeInView>
      </Container>
    </Section>
  )
}
