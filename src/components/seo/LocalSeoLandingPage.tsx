import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { LocalSeoPageData } from '../../data/localSeoPages'
import { usePageSeo } from '../../hooks/usePageSeo'
import { site } from '../../data/site'
import { createFAQSchema, createLocalBusinessSchema, createServiceSchema } from '../../lib/seoSchemas'
import { Container } from '../ui/Container'

/* ── Inline CTA banner ── */
function InlineCTA({ label, href }: { label: string; href: string }) {
  return (
    <div className="my-12 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-amber-50/60 p-6 text-center shadow-sm md:p-8">
      <p className="mb-4 text-lg font-semibold text-text-primary">Ready to get started?</p>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-hover"
        >
          {label}
        </Link>
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition hover:border-green-300 hover:bg-green-50"
        >
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>
  )
}

/* ── FAQ Accordion ── */
function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-left text-base font-semibold text-text-primary transition hover:bg-muted/50"
            aria-expanded={open === i}
          >
            <span>{faq.question}</span>
            <span className="ml-3 shrink-0 text-lg text-muted-foreground">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="border-t border-border px-6 py-4 text-[0.95rem] leading-relaxed text-text-secondary">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Main Template ── */
export function LocalSeoLandingPage({ data }: { data: LocalSeoPageData }) {
  const reduce = useReducedMotion()

  usePageSeo({
    title: data.title,
    description: data.metaDescription,
    canonicalPath: data.canonicalPath,
  })

  const faqSchema = createFAQSchema(data.faqs)
  const localBizSchema = createLocalBusinessSchema({
    name: `HexaStack Solutions — ${data.serviceFocus} ${data.locationShort}`,
    description: data.metaDescription,
  })
  const serviceSchema = createServiceSchema({
    name: data.serviceFocus,
    description: data.metaDescription,
    serviceType: data.serviceFocus,
  })

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [faqSchema, localBizSchema, serviceSchema],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-hero-grid-light pt-24 pb-16 md:pt-36 md:pb-28">
        <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-orange-100/70 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-orange-50/80 blur-3xl" aria-hidden />
        <Container className="relative z-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="mx-auto flex max-w-4xl flex-col text-center"
          >
            <span className="section-kicker mx-auto mb-5">{data.heroSubtitle}</span>
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
              {data.h1.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="bg-gradient-to-r from-brand to-blue-500 bg-clip-text text-transparent">
                {data.h1.split(' ').slice(-2).join(' ')}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
              {data.heroDescription}
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-hover"
              >
                Get a Quote
              </Link>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-text-primary shadow-sm transition hover:border-green-300 hover:bg-green-50"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="border-y border-border bg-muted/30 py-6">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span>✓ 50+ Projects Delivered</span>
            <span>✓ Kerala & Gulf Clients</span>
            <span>✓ 100% Custom Code</span>
            <span>✓ 90+ Lighthouse Score</span>
          </div>
        </Container>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-kicker mx-auto mb-4">{data.serviceFocus}</span>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Comprehensive {data.serviceFocus} Solutions
            </h2>
            <p className="mt-4 text-text-muted">
              From strategy to execution, we cover every aspect of {data.serviceFocus.toLowerCase()} to help your business grow.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {data.services.map((svc, i) => (
              <div key={i} className="glass-card card-hover p-8">
                <span className="mb-4 block text-3xl">{svc.icon}</span>
                <h3 className="mb-2 text-lg font-bold text-text-primary">{svc.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{svc.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <InlineCTA label="Get a Quote" href="/contact" />

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="bg-muted/30 py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="section-kicker mb-4">Why HexaStack</span>
              <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                Why Choose Us for {data.serviceFocus} in {data.locationShort}
              </h2>
              <p className="mt-4 text-text-muted">
                We don't just write code — we build digital businesses. Our approach combines engineering excellence with deep conversion psychology.
              </p>
              <ul className="mt-8 space-y-3">
                {data.whyChooseUs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.stats.map((stat, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <div className="text-3xl font-extrabold text-brand">{stat.value}</div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="border-y border-border py-12">
        <Container>
          <h2 className="mb-8 text-center text-xl font-bold text-text-primary">Technologies We Use</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {data.techStack.map((tech) => (
              <span key={tech} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-text-secondary">
                {tech}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-kicker mx-auto mb-4">Our Process</span>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              How We Deliver Results
            </h2>
            <p className="mt-4 text-text-muted">
              A structured, transparent approach to ensure your project's success from concept to launch.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {data.processSteps.map((step) => (
              <div key={step.num} className="relative">
                <span className="absolute -left-2 -top-6 text-6xl font-black text-border/40">{step.num}</span>
                <div className="relative z-10 pt-4">
                  <h3 className="mb-2 text-lg font-bold text-text-primary">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="bg-muted/30 py-16">
        <Container>
          <h2 className="mb-8 text-center text-2xl font-bold text-text-primary">Industries We Serve in {data.locationShort}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Healthcare', 'Education', 'Retail & Ecommerce', 'Restaurants & Hospitality', 'Real Estate', 'Tourism', 'Manufacturing', 'Finance & Banking', 'Logistics', 'SaaS & Startups'].map((ind) => (
              <span key={ind} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-text-secondary transition hover:border-brand hover:text-brand">
                {ind}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <div className="mb-12 text-center">
            <span className="section-kicker mx-auto mb-4">FAQ</span>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion faqs={data.faqs} />
        </Container>
      </section>

      {/* ═══ INTERNAL LINKS (SEO Silo) ═══ */}
      <section className="border-t border-border bg-muted/20 py-12">
        <Container>
          <h2 className="mb-6 text-center text-lg font-bold text-text-primary">Related Services</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Web Development Thrissur', to: '/web-development-company-thrissur' },
              { label: 'SEO Company Thrissur', to: '/seo-company-thrissur' },
              { label: 'Software Company Kerala', to: '/software-company-kerala' },
              { label: 'Mobile App Development', to: '/mobile-app-development-kerala' },
              { label: 'ERP Software Kerala', to: '/erp-software-kerala' },
              { label: 'AI Automation Kerala', to: '/ai-automation-company-kerala' },
              { label: 'Website Design Thrissur', to: '/website-design-company-thrissur' },
              { label: 'All Services', to: '/services' },
              { label: 'Our Work', to: '/work' },
              { label: 'Contact Us', to: '/contact' },
            ]
              .filter((link) => link.to !== data.canonicalPath)
              .map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-brand transition hover:border-brand hover:bg-brand/5"
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </Container>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-background to-amber-50/40 p-8 shadow-xl md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl" aria-hidden />
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                Ready to Grow Your Business in {data.locationShort}?
              </h2>
              <p className="mt-4 text-text-muted">
                Get a free consultation and a clear roadmap for your {data.serviceFocus.toLowerCase()} project. No obligations, no pressure — just actionable insights.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-hover"
                >
                  Get a Quote
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-text-primary shadow-sm transition hover:border-orange-200 hover:bg-surface"
                >
                  Email Us
                </a>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Or call us directly:{' '}
                <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="font-medium text-brand hover:underline">
                  {site.phones[0]}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
