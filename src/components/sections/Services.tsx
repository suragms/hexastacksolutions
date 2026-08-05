import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  getFlagshipService,
  getServiceCategories,
  type ServiceCategory,
} from '../../data/serviceCatalog'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { GradientLink } from '../ui/GradientLink'
import { Section } from '../ui/Section'

function ServiceCard({ category, delay }: { category: ServiceCategory; delay: number }) {
  const Icon = category.features[0].icon
  return (
    <FadeInView delay={delay} className="h-full">
      <div className="group flex h-full flex-col rounded-2xl border border-orange-100/80 bg-white/90 p-6 shadow-md shadow-orange-900/[0.04] ring-1 ring-zinc-900/[0.04] transition duration-300 ease-out hover:border-orange-200 hover:shadow-xl hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-white text-orange-600 shadow-sm ring-1 ring-orange-200/70">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug text-text-primary">{category.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{category.shortDescription}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Link
            to={`/services/${category.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
          >
            Explore service
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            to={`/contact?service=${encodeURIComponent(category.slug)}`}
            className="text-sm font-semibold text-text-muted underline-offset-4 transition hover:text-orange-700 hover:underline"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </FadeInView>
  )
}

function FlagshipCard({ category }: { category: ServiceCategory }) {
  const Icon = category.features[0].icon
  return (
    <FadeInView className="h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-orange-200/70 bg-gradient-to-br from-orange-50 via-white to-amber-50/40 p-7 shadow-md ring-1 ring-orange-100/80 md:flex-row md:items-center md:gap-8 md:p-9">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-orange-100/60 blur-3xl"
          aria-hidden
        />
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md">
          <Icon className="h-7 w-7" aria-hidden />
        </div>
        <div className="relative mt-5 flex-1 md:mt-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">Flagship</p>
          <h3 className="mt-1 text-xl font-bold text-text-primary md:text-2xl">{category.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">{category.shortDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {category.features.slice(0, 6).map((f) => (
              <span
                key={f.title}
                className="inline-flex items-center rounded-full border border-orange-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-text-primary"
              >
                {f.title}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <GradientLink to={`/services/${category.slug}`} className="!px-5 !py-2.5 text-sm">
              Explore the system
            </GradientLink>
            <Link
              to={`/contact?service=${encodeURIComponent(category.slug)}`}
              className="text-sm font-semibold text-orange-600 transition hover:text-orange-700"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </FadeInView>
  )
}

export function Services() {
  const flagship = getFlagshipService()
  const others = getServiceCategories().filter((c) => !c.flagship)

  return (
    <Section id="services" className="relative !py-10 md:!py-16">
      <div className="bg-services-warm absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-orange-200/60 to-transparent"
        aria-hidden
      />

      <Container>
        <FadeInView className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Our Services</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Complete Technology, AI, Software &amp; Growth Services
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Software development, AI, attendance systems, websites, mobile apps, digital marketing, branding,
            business development, and IT support — one partner for your entire digital journey.
          </p>
        </FadeInView>

        {flagship && (
          <div className="mt-12">
            <FlagshipCard category={flagship} />
          </div>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-6">
          {others.map((category, i) => (
            <ServiceCard key={category.slug} category={category} delay={i * 0.05} />
          ))}
        </div>

        <FadeInView className="mt-14 text-center">
          <GradientLink to="/services">View All Services</GradientLink>
        </FadeInView>
      </Container>
    </Section>
  )
}
