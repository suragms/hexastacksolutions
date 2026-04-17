import { Link } from 'react-router-dom'
import { coreSeoKeywords } from '../data/site'
import { getHubServices } from '../data/servicesManifest'
import { Container } from '../components/ui/Container'
import { FadeInView } from '../components/ui/FadeInView'
import { GradientLink } from '../components/ui/GradientLink'
import { Section } from '../components/ui/Section'
import { usePageSeo } from '../hooks/usePageSeo'

const hubServices = getHubServices()

export function ServicesPage() {
  usePageSeo({
    title: 'Web Development, Mobile Apps, ERP & AI Automation Services Kerala | HexaStack',
    description:
      'HexaStack Solutions is a software company in Thrissur offering web development company in Kerala services, mobile app development Kerala, ERP software Kerala, and AI automation services Kerala with reliable delivery.',
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
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Complete digital services to scale your business in Kerala
          </h1>
          <p className="mt-4 text-text-muted">
            From revenue-focused websites to production-ready apps, we plan clearly and ship in milestones you can
            trust. As a software company in Thrissur, we also deliver mobile app development Kerala, ERP software
            Kerala, and AI automation services Kerala. Tell us your priority on{' '}
            <Link to="/contact" className="font-medium text-orange-600 hover:text-orange-700">
              contact
            </Link>
            .
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
            <Link
              to="/services/seo"
              className="mt-4 inline-block text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              View SEO service
            </Link>
          </FadeInView>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2">
          {hubServices.map((s, i) => (
            <FadeInView key={s.slug} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:border-orange-200 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                  <s.icon className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-text-primary">{s.title}</h2>
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
                  Get Free Consultation
                </Link>
              </div>
            </FadeInView>
          ))}
        </div>

        <FadeInView className="mt-14 text-center">
          <GradientLink to="/contact">Book a Demo</GradientLink>
        </FadeInView>
      </Container>
    </Section>
  )
}
