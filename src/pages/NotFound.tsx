import { Container } from '../components/ui/Container'
import { GradientLink } from '../components/ui/GradientLink'
import { Section } from '../components/ui/Section'
import { usePageSeo } from '../hooks/usePageSeo'

export function NotFound() {
  usePageSeo({
    title: 'Page Not Found | HexaStack Solutions',
    description:
      'The page you are looking for could not be found. Explore HexaStack Solutions services for web development, software, and SEO in Thrissur, Kerala.',
    robots: 'noindex, follow',
  })

  return (
    <Section>
      <Container>
        <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-4 max-w-md text-text-muted">
            The page you are looking for could not be found. It may have moved, or the link may be
            out of date.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <GradientLink to="/">Back to Home</GradientLink>
            <a
              href="https://wa.me/917591999365?text=Hi%20HexaStack!%20I%20couldn%27t%20find%20a%20page%20on%20your%20site."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-transparent px-6 py-3 text-sm font-semibold text-text-primary transition duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-orange-300 hover:bg-surface hover:scale-[1.02]"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}
