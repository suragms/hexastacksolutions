import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

export function ValueProp() {
  return (
    <Section className="border-y border-border bg-surface/60 py-16 md:py-28">
      <Container>
        <FadeInView variant="slideRight">
          <blockquote className="mx-auto w-full max-w-[min(100%,85rem)] px-0 text-center">
            <p className="text-3xl font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl md:text-5xl md:leading-[1.12] lg:text-[2.75rem] lg:leading-[1.14]">
              Great digital products are{' '}
              <span className="gradient-text">engineered</span>, not improvised. Through a structured process that
              blends strategy, UX, and engineering, we build websites, MVPs, and web applications that are
              scalable, efficient, and ready to{' '}
              <span className="text-zinc-400">grow with your business.</span>
            </p>
            <footer className="mt-8 text-sm text-text-muted">
              From MVPs to mature platforms: maintainable code, measurable SEO, and outcomes you can explain to
              stakeholders in Kerala, the Gulf, or globally.
            </footer>
          </blockquote>
        </FadeInView>
      </Container>
    </Section>
  )
}
