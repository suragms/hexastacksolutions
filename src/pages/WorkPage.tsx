import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageSeo } from '../hooks/usePageSeo'
import { PortfolioFilters } from '../components/portfolio/PortfolioFilters'
import { ProjectLightbox } from '../components/portfolio/ProjectLightbox'
import { Container } from '../components/ui/Container'
import { FadeInView } from '../components/ui/FadeInView'
import { Section } from '../components/ui/Section'
import type { PortfolioCategory } from '../data/portfolioManifest'
import { portfolioProjects } from '../data/portfolioManifest'

export function WorkPage() {
  usePageSeo({
    title: 'Portfolio & case studies | Web design & software | Kerala, Gulf & global',
    description:
      'Selected websites, dashboards, e‑commerce, and custom software delivered for Kerala, UAE, Saudi Arabia, GCC, and global clients. Browse by category and read case notes.',
    canonicalPath: '/work',
  })

  const [category, setCategory] = useState<'all' | PortfolioCategory>('all')
  const [lightbox, setLightbox] = useState<(typeof portfolioProjects)[0] | null>(null)

  const availableCategories = useMemo(
    () => [...new Set(portfolioProjects.map((p) => p.category))].sort(),
    [],
  )

  const filtered = useMemo(() => {
    if (category === 'all') return portfolioProjects
    return portfolioProjects.filter((p) => p.category === category)
  }, [category])

  return (
    <Section className="pt-24 md:pt-28">
      <Container>
        <FadeInView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Our work</p>
          <h1 className="mt-3 break-words text-2xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            Websites & products we’ve shipped
          </h1>
          <p className="mt-4 text-text-muted">
            From marketing sites to internal tools, each engagement is tailored to the business, not a
            template.
          </p>
        </FadeInView>

        <FadeInView className="mt-10">
          <PortfolioFilters active={category} onChange={setCategory} available={availableCategories} />
        </FadeInView>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <FadeInView key={p.id} delay={i * 0.04}>
              <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition duration-300 hover:border-orange-200 hover:shadow-xl md:hover:scale-[1.02] motion-reduce:md:hover:scale-100">
                <button
                  type="button"
                  onClick={() => setLightbox(p)}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      width={1200}
                      height={750}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                  </div>
                </button>
                <div className="flex items-start justify-between gap-3 p-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-orange-600">
                      {p.category}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-text-primary">{p.title}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightbox(p)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-primary transition hover:border-orange-200 hover:text-orange-700"
                  >
                    View details
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              </article>
            </FadeInView>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-text-muted">No projects in this category yet.</p>
        ) : null}

        <p className="mt-12 text-center text-sm text-text-muted">
          Want something similar?{' '}
          <Link to="/contact" className="font-semibold text-orange-600 hover:text-orange-700">
            Start a project
          </Link>
        </p>
      </Container>

      <ProjectLightbox key={lightbox?.id} project={lightbox} onClose={() => setLightbox(null)} />
    </Section>
  )
}
