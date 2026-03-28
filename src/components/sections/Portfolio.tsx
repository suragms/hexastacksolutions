import { ArrowUpRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { PortfolioFilters } from '../portfolio/PortfolioFilters'
import { ProjectLightbox } from '../portfolio/ProjectLightbox'
import type { PortfolioCategory } from '../../data/portfolioManifest'
import { portfolioProjects } from '../../data/portfolioManifest'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

type Project = (typeof portfolioProjects)[0]

function PortfolioCard({
  project: p,
  onOpen,
  imageLoading = 'lazy',
}: {
  project: Project
  onOpen: () => void
  imageLoading?: 'lazy' | 'eager'
}) {
  return (
    <article className="group relative w-[min(85vw,380px)] max-w-[calc(100vw-2rem)] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-shadow duration-300 hover:shadow-xl md:w-[min(380px,65vw)] md:max-w-none">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={p.image}
            alt={p.imageAlt}
            width={760}
            height={475}
            loading={imageLoading}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/5 to-transparent" />
        </div>
      </button>
      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-600">{p.category}</p>
          <h3 className="mt-1 text-base font-semibold leading-snug text-text-primary md:text-[17px]">{p.title}</h3>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-primary transition hover:border-orange-200 hover:text-orange-700"
        >
          Case study
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </article>
  )
}

export function Portfolio() {
  const [category, setCategory] = useState<'all' | PortfolioCategory>('all')
  const [lightbox, setLightbox] = useState<Project | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const scrollerRef = useRef<HTMLDivElement>(null)

  const availableCategories = useMemo(
    () => [...new Set(portfolioProjects.map((p) => p.category))].sort(),
    [],
  )

  const filtered = useMemo(() => {
    if (category === 'all') return portfolioProjects
    return portfolioProjects.filter((p) => p.category === category)
  }, [category])

  /** One full pass (start → end) in seconds; slower when the list is long or reduce-motion is preferred. */
  const loopDurationSec = useMemo(() => {
    const base = Math.min(100, Math.max(36, filtered.length * 2.8))
    return prefersReducedMotion ? Math.min(240, Math.round(base * 2.2)) : base
  }, [filtered.length, prefersReducedMotion])

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 })
  }, [category])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let raf = 0
    let last = performance.now()
    let hoverPaused = false
    let tabHidden = document.hidden

    const onEnter = () => {
      hoverPaused = true
    }
    const onLeave = () => {
      hoverPaused = false
    }
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)

    const maxScroll = () => Math.max(0, el.scrollWidth - el.clientWidth)

    const tick = (now: number) => {
      const dt = Math.min(80, now - last)
      last = now
      const range = maxScroll()
      const allowScroll = !hoverPaused && !tabHidden && range > 1
      if (allowScroll) {
        const pxPerMs = range / (loopDurationSec * 1000)
        el.scrollLeft += pxPerMs * dt
        if (el.scrollLeft >= range - 0.5) el.scrollLeft = 0
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onVis = () => {
      tabHidden = document.hidden
    }
    document.addEventListener('visibilitychange', onVis)

    const ro = new ResizeObserver(() => {
      if (el.scrollLeft > maxScroll()) el.scrollLeft = 0
    })
    ro.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [filtered, loopDurationSec])

  return (
    <Section id="work" className="!py-14 md:!py-24">
      <Container>
        <FadeInView className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Proof of work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Selected Work
            </h2>
            <p className="mt-2 max-w-md text-text-muted">
              Real clients, real industries: this row scrolls horizontally on a loop (hover to pause). Drag or swipe
              anytime. Open any card for full case notes.
            </p>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
          >
            View all projects <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </FadeInView>
        <PortfolioFilters active={category} onChange={setCategory} available={availableCategories} />
      </Container>

      {/* Single row (no DOM duplication); auto-scroll via rAF, pause on hover. */}
      <FadeInView variant="fadeIn" className="mt-8 w-full px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto w-full max-w-[min(100%,92rem)]">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-14"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-14"
            aria-hidden
          />

          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">No projects in this category yet.</p>
          ) : (
            <div className="min-w-0 overflow-hidden pb-4">
              <div
                ref={scrollerRef}
                className="scrollbar-thin flex w-full min-w-0 flex-nowrap gap-5 overflow-x-auto overscroll-x-contain pb-1 md:gap-6"
                style={{ scrollBehavior: 'auto' }}
              >
                {filtered.map((p, i) => (
                  <PortfolioCard
                    key={p.id}
                    project={p}
                    onOpen={() => setLightbox(p)}
                    imageLoading={i < 8 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </FadeInView>

      <ProjectLightbox key={lightbox?.id} project={lightbox} onClose={() => setLightbox(null)} />
    </Section>
  )
}
