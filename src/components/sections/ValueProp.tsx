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
              Reliable digital products are{' '}
              <span className="gradient-text">strategically engineered</span>, not rushed. We combine business
              strategy, UX, and engineering to build scalable websites, apps, and ERP workflows that{' '}
              <span className="text-zinc-400">help your team grow with less friction.</span>
            </p>
            <footer className="mt-8 text-sm text-text-muted">
              From Thrissur to wider Kerala, we deliver maintainable code, measurable SEO outcomes, and long-term
              support your stakeholders can trust. Need web, mobile, ERP, and AI automation on one roadmap? We build
              for reliability and scalability from day one.
            </footer>
          </blockquote>
        </FadeInView>
      </Container>
    </Section>
  )
}
