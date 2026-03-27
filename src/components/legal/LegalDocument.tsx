import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'

type Props = {
  title: string
  updated: string
  children: ReactNode
}

export function LegalDocument({ title, updated, children }: Props) {
  return (
    <Section className="pt-24 pb-20 md:pt-28 md:pb-28">
      <Container>
        <nav className="mb-10 text-sm text-text-muted">
          <Link to="/" className="transition hover:text-orange-600">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-text-primary">{title}</span>
        </nav>
        <header className="mx-auto max-w-3xl border-b border-border pb-10">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-text-muted">Last updated: {updated}</p>
          <p className="mt-6 max-w-2xl text-base leading-[1.75] text-text-muted">
            HexaStack Solutions (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates from Vadanappally,
            Thrissur, Kerala, India. These documents govern your use of our website and services.
          </p>
        </header>
        <article
          className={[
            'prose-legal mx-auto max-w-3xl pt-12 text-base leading-[1.75] text-text-muted',
            '[&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:first:mt-0',
            '[&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-text-primary',
            '[&_p]:mt-5 [&_p]:max-w-2xl',
            '[&_ul]:my-5 [&_ul]:max-w-2xl [&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-6',
            '[&_ol]:my-5 [&_ol]:max-w-2xl [&_ol]:list-decimal [&_ol]:space-y-2.5 [&_ol]:pl-6',
            '[&_li]:pl-1 [&_li]:leading-relaxed',
            '[&_a]:font-medium [&_a]:text-orange-600 [&_a]:underline-offset-2 hover:[&_a]:underline',
            '[&_strong]:font-semibold [&_strong]:text-text-primary',
          ].join(' ')}
        >
          {children}
        </article>
      </Container>
    </Section>
  )
}
