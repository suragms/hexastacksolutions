import {
  BarChart3,
  Building2,
  Check,
  Globe2,
  LayoutGrid,
  LineChart,
  Receipt,
  Shield,
  Smartphone,
  Store,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { FadeInView } from '../components/ui/FadeInView'
import { GradientLink } from '../components/ui/GradientLink'
import { Section } from '../components/ui/Section'
import {
  HEXABILL_IMAGE_FALLBACK,
  hexabillFeatures,
  hexabillGulf,
  hexabillHero,
  hexabillModules,
  hexabillPreviewSlides,
  hexabillSeo,
  hexabillTestimonials,
  hexabillTrusted,
  hexabillMarketingUrl,
} from '../data/hexabillPage'
import { usePageSeo } from '../hooks/usePageSeo'

function PreviewImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={960}
      height={600}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        const el = e.currentTarget
        if (el.src.endsWith(HEXABILL_IMAGE_FALLBACK)) return
        el.src = HEXABILL_IMAGE_FALLBACK
      }}
    />
  )
}

const moduleIcon = {
  vat: Receipt,
  pos: Store,
  erp: Building2,
  analytics: LineChart,
} as const

export function HexaBillPage() {
  const marketing = hexabillMarketingUrl()

  usePageSeo({
    title: hexabillSeo.pageTitle,
    description: hexabillSeo.metaDescription,
    canonicalPath: '/products/hexabill',
  })

  return (
    <>
      {/* Hero */}
      <section className="relative scroll-mt-28 overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(251,146,60,0.2),transparent_55%),radial-gradient(ellipse_65%_45%_at_100%_40%,rgba(251,191,36,0.12),transparent_50%),linear-gradient(to_bottom,#fffdfb,#ffffff)]"
          aria-hidden
        />
        <Container>
          <FadeInView className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">HexaBill product suite</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {hexabillHero.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-text-muted md:text-xl">{hexabillHero.subtext}</p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-muted">
              Looking for{' '}
              <strong className="font-medium text-text-primary">VAT billing software UAE</strong>, a{' '}
              <strong className="font-medium text-text-primary">POS system UAE</strong>, or{' '}
              <strong className="font-medium text-text-primary">ERP software UAE</strong>? HexaBill brings VAT
              compliant billing, retail and restaurant POS, ERP, and analytics into one Gulf-ready platform.
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={marketing}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/15 transition hover:from-orange-600 hover:to-amber-600"
              >
                {hexabillHero.ctaProductSite}
              </a>
              <GradientLink to="/contact?product=hexabill" className="justify-center sm:min-w-[200px]">
                Talk to HexaStack
              </GradientLink>
            </div>
            <p className="mt-6 text-xs text-text-muted">
              Product site:{' '}
              <a href={marketing} target="_blank" rel="noopener noreferrer" className="font-medium text-orange-600 underline-offset-2 hover:underline">
                hexabillmarketingpage.com
              </a>
            </p>
          </FadeInView>
        </Container>
      </section>

      {/* Core modules */}
      <Section className="border-y border-border bg-white !py-16 md:!py-24">
        <Container>
          <FadeInView className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">Core products</h2>
            <p className="mt-3 text-text-muted">
              Split clearly so finance, store, and ops teams each see what matters: VAT billing software, POS, ERP,
              and analytics in one roadmap.
            </p>
          </FadeInView>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {hexabillModules.map((m, i) => {
              const Icon = moduleIcon[m.id]
              return (
                <FadeInView key={m.id} delay={i * 0.05}>
                  <article
                    id={m.id}
                    className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-orange-200 hover:shadow-md md:p-8"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 text-orange-700 ring-1 ring-orange-100">
                      <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-text-primary capitalize">{m.title}</h3>
                    <p className="mt-1 text-sm font-medium text-orange-600">{m.subtitle}</p>
                    <ul className="mt-4 space-y-2 text-sm text-text-muted">
                      {m.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </article>
                </FadeInView>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Gulf */}
      <Section id="gulf" className="scroll-mt-28 bg-gradient-to-b from-zinc-50 to-white !py-16 md:!py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeInView>
              <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">{hexabillGulf.title}</h2>
              <p className="mt-4 text-text-muted">
                Whether you need the <strong className="text-text-primary">best POS system Dubai</strong> workflows
                or <strong className="text-text-primary">ERP for small business UAE</strong> scale, HexaBill is
                shaped for English and Arabic-speaking teams, multi-currency, and VAT compliance across the Gulf.
              </p>
              <ul className="mt-6 space-y-3">
                {hexabillGulf.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm font-medium text-text-primary">
                    <Globe2 className="h-5 w-5 shrink-0 text-orange-600" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </FadeInView>
            <FadeInView delay={0.08} variant="fadeIn" className="rounded-2xl border border-border bg-card p-6 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">Why teams switch</p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Affordable POS for retail in Dubai, cloud billing software Gulf-wide, and ERP software with VAT
                compliance UAE teams can audit: fewer spreadsheets, fewer mismatches between branches.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Bahrain'].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-orange-100 bg-orange-50/90 px-3 py-1 text-xs font-semibold text-orange-900"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </FadeInView>
          </div>
        </Container>
      </Section>

      {/* Features grid */}
      <Section id="features" className="scroll-mt-28 border-t border-border bg-white !py-16 md:!py-24">
        <Container>
          <FadeInView className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">Platform features</h2>
            <p className="mt-3 text-text-muted">
              Cloud billing software Gulf businesses expect: secure, fast, and multi-branch by default.
            </p>
          </FadeInView>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hexabillFeatures.map((f, i) => {
              const FeatureIcon = [Zap, Smartphone, Shield, LayoutGrid, BarChart3][i] ?? Zap
              return (
                <FadeInView key={f.title} delay={i * 0.04}>
                  <div className="h-full rounded-2xl border border-border bg-zinc-50/80 p-6 transition hover:border-orange-200 hover:bg-white hover:shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      <FeatureIcon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-text-primary">{f.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{f.desc}</p>
                  </div>
                </FadeInView>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Trusted */}
      <Section id="trusted" className="scroll-mt-28 bg-surface/60 !py-14 md:!py-20">
        <Container>
          <FadeInView className="text-center">
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl">{hexabillTrusted.headline}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-text-muted">{hexabillTrusted.sub}</p>
            <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-6 opacity-70 grayscale">
              {['Gulf retail', 'F&B', 'Distribution', 'Services'].map((label) => (
                <div
                  key={label}
                  className="flex h-14 min-w-[120px] items-center justify-center rounded-xl border border-dashed border-border bg-card px-4 text-xs font-semibold uppercase tracking-wider text-text-muted"
                >
                  {label}
                </div>
              ))}
            </div>
          </FadeInView>
        </Container>
      </Section>

      {/* Dashboard previews */}
      <Section id="previews" className="scroll-mt-28 !py-16 md:!py-24">
        <Container>
          <FadeInView className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">Dashboard preview</h2>
            <p className="mt-3 text-text-muted">
              POS, ERP, and analytics views (add your screenshots under{' '}
              <code className="rounded bg-zinc-100 px-1 text-xs">public/images/hexabill</code>).
            </p>
          </FadeInView>
          <div className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-3">
            {hexabillPreviewSlides.map((slide, i) => (
              <FadeInView key={slide.id} delay={i * 0.06}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                    <PreviewImage
                      src={slide.src}
                      alt={slide.alt}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <p className="border-t border-border px-4 py-3 text-center text-sm font-semibold text-text-primary">
                    {slide.caption}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" className="scroll-mt-28 border-t border-border bg-gradient-to-b from-orange-50/35 to-white !py-16 md:!py-24">
        <Container>
          <FadeInView className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">What teams say</h2>
            <p className="mt-3 text-text-muted">B2B outcomes from VAT, POS, and ERP on one stack.</p>
          </FadeInView>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {hexabillTestimonials.map((t, i) => (
              <FadeInView key={t.name} delay={i * 0.06}>
                <blockquote className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                  <p className="text-lg font-medium leading-relaxed text-text-primary">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm text-text-muted">
                    <span className="font-semibold text-text-primary">{t.name}</span>
                    <span className="text-text-muted"> · {t.company}</span>
                  </footer>
                </blockquote>
              </FadeInView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA — plans & trials live on hexabillmarketingpage.com */}
      <Section
        id="next-step"
        className="scroll-mt-28 border-t border-border bg-gradient-to-br from-orange-50/80 via-white to-amber-50/50 !py-16 md:!py-24"
      >
        <Container>
          <FadeInView className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">Next step</h2>
            <p className="mt-4 text-lg text-text-muted">
              Pricing, demos, and rollout options are on the HexaBill marketing site. For implementation, integrations,
              or a scoped proposal, talk to HexaStack.
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={marketing}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-900/10 transition hover:from-orange-600 hover:to-amber-600"
              >
                {hexabillHero.ctaProductSite}
              </a>
              <Link
                to="/contact?product=hexabill"
                className="inline-flex items-center justify-center rounded-xl border border-orange-200 bg-white px-8 py-3.5 text-sm font-semibold text-text-primary shadow-sm transition hover:border-orange-300 hover:bg-orange-50/50"
              >
                Contact HexaStack
              </Link>
            </div>
          </FadeInView>
        </Container>
      </Section>
    </>
  )
}
