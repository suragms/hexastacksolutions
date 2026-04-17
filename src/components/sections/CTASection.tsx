import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { GradientLink } from '../ui/GradientLink'
import { Section } from '../ui/Section'

export function CTASection() {
  return (
    <Section id="cta" className="!pb-16 md:!pb-24">
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
                Limited consultation slots this week - secure your growth roadmap
              </h2>
              <p className="mt-4 text-text-muted">
                Share your goals and get clear next steps to save time, increase revenue, and launch with confidence.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
                <GradientLink to="/contact" className="w-full justify-center sm:w-auto">
                  Get Free Consultation
                </GradientLink>
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition hover:border-orange-200 hover:bg-surface sm:w-auto"
                >
                  Start Your Project Today
                </Link>
              </div>
              <p className="mt-6 text-sm text-text-muted">
                Need a quick walkthrough? <Link to="/contact" className="font-medium text-orange-600 hover:text-orange-700">Book a Demo</Link> or email{' '}
                <a href={`mailto:${site.email}`} className="font-medium text-orange-600 hover:text-orange-700">
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </FadeInView>
      </Container>
    </Section>
  )
}
