import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

const industries = [
  'Gulf B2B',
  'VAT & e-invoicing',
  'GST (India–Gulf)',
  'Retail & POS',
  'Hospitality',
  'Distribution',
  'Professional services',
]

export function Industries() {
  return (
    <Section className="border-t border-border bg-surface/25 pb-4 pt-2 md:pb-8">
      <Container>
        <FadeInView className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Industries</p>
            <h2 className="mt-2 text-xl font-bold text-text-primary md:text-2xl">
              From Kerala to Gulf: sectors we ship for
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              We align copy and integrations to VAT, POS, and ERP realities for UAE, Saudi Arabia, Qatar, Oman, and India
              export teams.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 md:max-w-xl md:justify-end">
            {industries.map((name) => (
              <li key={name}>
                <span className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-text-primary transition hover:border-accent/30">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </FadeInView>
      </Container>
    </Section>
  )
}
