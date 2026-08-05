import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { usePageSeo } from '../../hooks/usePageSeo'
import { site } from '../../data/site'
import { getServiceCategory, type ServiceCategory } from '../../data/serviceCatalog'
import { createBreadcrumbSchema, createFAQSchema, createServiceSchema } from '../../lib/seoSchemas'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { GradientLink } from '../ui/GradientLink'
import { Section } from '../ui/Section'

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => {
        const id = `${baseId}-faq-${i}`
        const expanded = open === i
        return (
          <div key={item.question} className="overflow-hidden rounded-2xl border border-border bg-card">
            <button
              type="button"
              id={`${id}-btn`}
              aria-expanded={expanded}
              aria-controls={`${id}-panel`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-text-primary transition hover:bg-surface/60"
              onClick={() => setOpen(expanded ? null : i)}
            >
              {item.question}
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ${
                  expanded ? 'rotate-180' : ''
                }`}
                aria-hidden
              />
            </button>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-btn`}
              aria-hidden={!expanded}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="border-t border-border px-5 pb-4 pt-0 text-sm leading-relaxed text-text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ServiceCategoryLanding({ data }: { data: ServiceCategory }) {
  const { slug, title, kicker, hero, shortDescription, features, audience, faqs, related, flagship } = data

  usePageSeo({
    title: data.pageTitle,
    description: data.metaDescription,
    canonicalPath: `/services/${slug}`,
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
    { name: title, item: `/services/${slug}` },
  ])
  const serviceSchema = createServiceSchema({
    name: title,
    description: data.metaDescription,
    serviceType: title,
  })
  const faqSchema = createFAQSchema(faqs)
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, serviceSchema, faqSchema],
  }

  const relatedEntries = (related ?? [])
    .map((s) => getServiceCategory(s))
    .filter((c): c is ServiceCategory => Boolean(c))
    .filter((c) => c.slug !== slug)

  const featureGridCols = flagship
    ? 'grid-cols-2 lg:grid-cols-4'
    : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-orange-100/80 bg-hero-grid-light pt-24 pb-14 md:pt-28 md:pb-20">
        <div
          className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-orange-100/70 blur-3xl"
          aria-hidden
        />
        <Container className="relative z-10">
          <FadeInView className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-text-muted">
              <Link to="/" className="font-medium text-orange-600 transition hover:text-orange-700">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link to="/services" className="font-medium text-orange-600 transition hover:text-orange-700">
                Services
              </Link>
              <span aria-hidden>/</span>
              <span className="text-text-primary">{title}</span>
            </nav>
            <span className="section-kicker mx-auto mb-5">{kicker}</span>
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              {hero.h1}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
              {hero.intro}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GradientLink to={`/contact?service=${encodeURIComponent(slug)}`}>
                Get Started
              </GradientLink>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition hover:border-orange-200 hover:bg-surface sm:w-auto"
              >
                Contact Us
              </Link>
            </div>
          </FadeInView>
        </Container>
      </section>

      {/* FEATURES */}
      <Section id="features" className="relative !py-10 md:!py-16">
        <Container>
          <FadeInView className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
              {flagship ? 'Complete solution' : 'What we deliver'}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {flagship ? 'Every attendance method, in one system' : `${title} services`}
            </h2>
            <p className="mt-4 text-text-muted">{shortDescription}</p>
          </FadeInView>

          {flagship && (
            <FadeInView className="mx-auto mt-10 max-w-3xl rounded-2xl border border-orange-200/70 bg-gradient-to-br from-orange-50 via-white to-amber-50/50 p-6 text-center text-sm leading-relaxed text-text-muted md:p-8">
              <p className="font-semibold text-text-primary">Built for institutions and workplaces</p>
              <p className="mt-2">
                One attendance platform for schools, colleges, universities, offices, factories, hospitals, and
                organizations — with face recognition, QR, RFID, NFC, GPS, and biometric capture, plus shift and leave
                management, payroll integration, analytics, and real-time alerts.
              </p>
            </FadeInView>
          )}

          {audience && audience.length > 0 && (
            <FadeInView className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {audience.map((name) => (
                <span
                  key={name}
                  className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-text-primary"
                >
                  {name}
                </span>
              ))}
            </FadeInView>
          )}

          <div className={`mx-auto mt-12 grid gap-5 ${featureGridCols}`}>
            {features.map((feature, i) => (
              <FadeInView key={feature.title} delay={i * 0.05} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-colors duration-200 hover:border-orange-200/60 hover:shadow-md">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50/50 text-orange-600 ring-1 ring-orange-100/80 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                    <feature.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{feature.description}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface/20">
        <Container className="max-w-3xl">
          <FadeInView className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Common questions about {title.toLowerCase()}
            </h2>
          </FadeInView>
          <FadeInView className="mt-10">
            <FAQAccordion faqs={faqs} />
          </FadeInView>
        </Container>
      </Section>

      {/* RELATED SERVICES */}
      {relatedEntries.length > 0 && (
        <Section className="border-t border-border">
          <Container>
            <FadeInView className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Explore more</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                Related services
              </h2>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {relatedEntries.map((entry) => (
                  <Link
                    key={entry.slug}
                    to={`/services/${entry.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-orange-600 transition hover:border-orange-200 hover:bg-orange-50"
                  >
                    {entry.title}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-text-primary transition hover:border-orange-200 hover:bg-surface"
                >
                  All services
                </Link>
              </div>
            </FadeInView>
          </Container>
        </Section>
      )}

      {/* FINAL CTA */}
      <Section className="!pt-2 md:!pt-6">
        <Container>
          <FadeInView variant="zoomIn">
            <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-background to-amber-50/40 p-8 shadow-xl md:p-12 md:px-16">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl"
                aria-hidden
              />
              <div className="relative mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                  Ready to start your {title.toLowerCase()} project?
                </h2>
                <p className="mt-4 text-text-muted">
                  Get a free consultation and a clear roadmap — no obligations, no pressure.
                </p>
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
                  <GradientLink to={`/contact?service=${encodeURIComponent(slug)}`}>
                    Get a Quote
                  </GradientLink>
                  <Link
                    to="/contact"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition hover:border-orange-200 hover:bg-surface sm:w-auto"
                  >
                    Request Pricing
                  </Link>
                </div>
                <p className="mt-6 text-sm text-text-muted">
                  Or call us directly:{' '}
                  <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="font-medium text-orange-600 hover:text-orange-700">
                    {site.phones[0]}
                  </a>
                </p>
              </div>
            </div>
          </FadeInView>
        </Container>
      </Section>
    </>
  )
}
