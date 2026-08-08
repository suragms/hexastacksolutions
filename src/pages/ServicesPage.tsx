import { Link } from 'react-router-dom'
import { coreSeoKeywords } from '../data/site'
import { getServiceCategories } from '../data/serviceCatalog'
import { Container } from '../components/ui/Container'
import { FadeInView } from '../components/ui/FadeInView'
import { GradientLink } from '../components/ui/GradientLink'
import { Section } from '../components/ui/Section'
import { usePageSeo } from '../hooks/usePageSeo'

const serviceCategories = getServiceCategories()

/** Legacy specialised landings that predate the category pages (kept for their SEO equity). */
const legacyLandings = [
  { title: 'Website design & development', to: '/services/web-design' },
  { title: 'Custom software development', to: '/services/web-applications' },
  { title: 'Search engine optimization', to: '/services/seo' },
]

export function ServicesPage() {
  usePageSeo({
    title: 'Software, AI, Web, Mobile, Marketing & IT Services | HexaStack Kerala',
    description:
      'Complete IT services from HexaStack in Thrissur, Kerala: software development, AI solutions, websites, mobile apps, digital marketing, branding, business development, attendance systems, and IT support.',
    canonicalPath: '/services',
  })

  return (
    <Section className="relative pt-24 md:pt-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:48px_48px] opacity-50"
        aria-hidden
      />
      <Container>
        <FadeInView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Services</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            Complete Technology, AI &amp; Growth Services
          </h1>
          <p className="mt-4 text-text-muted">
            Software, AI, websites, mobile apps, digital marketing, branding, business development, and IT support —
            all planned, designed, built, and supported by the HexaStack Solutions team in Thrissur, Kerala.
          </p>
        </FadeInView>

        <div id="seo-focus" className="scroll-mt-28">
          <FadeInView className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card/80 p-6 text-center text-sm text-text-muted">
            <p className="font-medium text-text-primary">SEO focus (organic growth)</p>
            <p className="mt-2 leading-relaxed">
              {coreSeoKeywords.join(' · ')}, woven naturally into pages without stuffing. Better rankings come from
              useful content, technical performance, and trust signals; we build the foundation and help you convert
              traffic into qualified leads.
            </p>
          </FadeInView>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((s, i) => {
            const Icon = s.features[0].icon
            return (
              <FadeInView key={s.slug} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:border-orange-200 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                <h2 className="mt-5 text-lg font-semibold text-text-primary">{s.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{s.shortDescription}</p>
                <Link
                  to={`/services/${s.slug}`}
                  className="mt-6 text-sm font-semibold text-orange-600 hover:text-orange-700"
                >
                  View full service
                </Link>
                <Link
                  to={`/contact?service=${encodeURIComponent(s.slug)}`}
                  className="mt-2 text-sm font-semibold text-text-muted underline-offset-4 transition hover:text-orange-700 hover:underline"
                >
                  Get a Quote
                </Link>
                </div>
              </FadeInView>
            )
          })}
        </div>

        <FadeInView className="mx-auto mt-14 max-w-2xl rounded-2xl border border-border bg-surface/40 p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Specialized service landings
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {legacyLandings.map((landing) => (
              <Link
                key={landing.to}
                to={landing.to}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-orange-600 transition hover:border-orange-200 hover:bg-orange-50"
              >
                {landing.title}
              </Link>
            ))}
          </div>
        </FadeInView>

        <FadeInView className="mt-14 text-center">
          <GradientLink to="/contact">Request Pricing</GradientLink>
        </FadeInView>
      </Container>
    </Section>
  )
}
