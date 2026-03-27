import { BadgeCheck, Eye, Gauge, LineChart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { portfolio } from '../../data/servicesManifest'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { GradientLink } from '../ui/GradientLink'
import { Section } from '../ui/Section'
import { usePageSeo } from '../../hooks/usePageSeo'

const whySeo = [
  {
    icon: Eye,
    title: 'More visibility, more customers',
    body: 'Rank for the right intents so people who need what you sell can find you, not just vanity traffic.',
  },
  {
    icon: LineChart,
    title: 'Cost-effective growth',
    body: 'Organic compounds over time: less pay-per-click dependency when your pages earn trust and clicks.',
  },
  {
    icon: BadgeCheck,
    title: 'Trust & credibility',
    body: 'Strong results and helpful content signal authority; users often trust organic listings alongside your brand.',
  },
  {
    icon: Gauge,
    title: 'Better user experience',
    body: 'Technical SEO overlaps with UX: speed, mobile clarity, and navigation that keeps people engaged.',
  },
]

const whatWeOffer = [
  {
    title: 'Technical SEO',
    body: 'Crawl budget, indexation, structured data, Core Web Vitals, and clean URL patterns so Google can render and rank your pages correctly.',
  },
  {
    title: 'On-page optimization',
    body: 'Titles, meta descriptions, headings, internal linking, and semantic HTML aligned to search intent, not keyword stuffing.',
  },
  {
    title: 'Content & topical depth',
    body: 'Editorial calendars, landing pages, and proof (case studies, FAQs) that match what your audience actually searches.',
  },
  {
    title: 'Local & Gulf visibility',
    body: 'Where it fits: Kerala districts, India-wide queries, and English/Gulf-facing positioning with consistent NAP and geography signals.',
  },
  {
    title: 'Measurement & reporting',
    body: 'Search Console, analytics, and simple dashboards you can act on, not black-box “ranking” promises without proof.',
  },
]

const faq = [
  {
    q: 'How is SEO different from paid ads?',
    a: 'SEO builds durable visibility in organic results; ads stop when spend stops. We often use both during the ramp-up phase.',
  },
  {
    q: 'How long until we see results?',
    a: 'Technical fixes can show in weeks; competitive queries take months of content and authority. We set realistic milestones.',
  },
  {
    q: 'Do you guarantee #1 rankings?',
    a: 'No honest agency can. We optimize for measurable traffic, conversions, and sustainable practices, not vanity positions.',
  },
]

const heroImage = portfolio.webDesign.seoPerf

export function SeoLanding() {
  usePageSeo({
    title: 'Search engine optimization',
    description:
      'Technical SEO, on-page optimization, and content strategy for Kerala and Gulf businesses, with transparent reporting from HexaStack Solutions, Thrissur.',
    canonicalPath: '/services/seo',
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
        name: 'Search engine optimization',
        item: `${site.siteUrl}/services/seo`,
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
          <span className="text-text-primary">Search engine optimization</span>
        </nav>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeInView>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
              Rank higher, get more traffic, grow faster.
            </h1>
            <p className="mt-5 text-lg text-text-muted">
              SEO isn’t a one-time checklist; it’s how you get in front of the right audience when they search. We
              combine technical foundations, intent-aligned content, and clear reporting so growth is measurable, not
              mysterious.
            </p>
            <GradientLink to="/contact?service=seo" className="mt-8 inline-flex">
              Get started
            </GradientLink>
          </FadeInView>
          <FadeInView delay={0.06} className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <img
              src={heroImage}
              alt="Analytics and SEO: charts, dashboards, and marketing data"
              width={960}
              height={640}
              className="aspect-[4/3] w-full object-cover object-center"
              loading="eager"
            />
          </FadeInView>
        </div>

        <FadeInView className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-xl font-semibold leading-snug text-text-primary md:text-2xl">
            We don&apos;t do cookie-cutter playbooks. Every business has different buyers, markets, and proof. Our SEO
            work focuses on clarity, structure, and content that earns trust, so your site doesn&apos;t just rank, it{' '}
            <span className="text-text-muted">converts visitors into real conversations.</span>
          </p>
        </FadeInView>

        <FadeInView className="mt-20">
          <h2 className="text-center text-2xl font-bold text-text-primary md:text-3xl">Why SEO matters</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-text-muted">
            Even a strong website needs visibility. If people can&apos;t find you for the right searches, growth is
            left on the table.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {whySeo.map((item) => (
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
            <div>
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">What we offer</h2>
              <p className="mt-2 max-w-2xl text-text-muted">
                A comprehensive approach (technical health, on-page signals, content, and measurement) so improvements
                compound instead of conflicting.
              </p>
            </div>
            <GradientLink to="/contact?service=seo" className="shrink-0 self-start sm:self-auto">
              Request a quote
            </GradientLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {whatWeOffer.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card/90 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.body}</p>
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
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <Link to="/services/web-design" className="text-orange-600 hover:text-orange-700">
              Website design &amp; development
            </Link>
            <Link to="/services/web-applications" className="text-orange-600 hover:text-orange-700">
              Custom software development
            </Link>
          </div>
          <div className="mt-8">
            <GradientLink to="/contact?service=seo">Book a discovery call</GradientLink>
          </div>
        </FadeInView>
      </Container>
    </Section>
  )
}
