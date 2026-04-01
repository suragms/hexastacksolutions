import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { homePageFaqs } from '../../data/faq'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

export function FAQ() {
  const faqs = homePageFaqs
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <Section id="faq">
      <Container>
        <FadeInView className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Answers before you ask
          </h2>
          <p className="mt-4 text-text-muted">
            Straight talk on pricing, timelines, and how we collaborate day to day.
          </p>
        </FadeInView>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((item, i) => {
            const id = `${baseId}-faq-${i}`
            const expanded = open === i
            return (
              <FadeInView key={item.q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    type="button"
                    id={`${id}-btn`}
                    aria-expanded={expanded}
                    aria-controls={`${id}-panel`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-text-primary transition hover:bg-surface/60"
                    onClick={() => setOpen(expanded ? null : i)}
                  >
                    {item.q}
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
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInView>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
