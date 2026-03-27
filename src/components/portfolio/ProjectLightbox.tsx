import { X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import type { PortfolioProject } from '../../data/portfolioManifest'
import { GradientButton } from '../ui/GradientButton'
import { GradientLink } from '../ui/GradientLink'

type Props = {
  project: PortfolioProject | null
  onClose: () => void
}

export function ProjectLightbox({ project, onClose }: Props) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (!project) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  if (!project) return null

  const slides = [...new Set([project.image, ...(project.gallery ?? [])])]
  const activeSrc = slides[Math.min(slide, slides.length - 1)] ?? project.image

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface">
          <img
            src={activeSrc}
            alt={project.imageAlt}
            width={1200}
            height={750}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
          {slides.length > 1 ? (
            <div className="absolute bottom-0 left-0 right-0 flex gap-1.5 overflow-x-auto bg-background/85 p-2 backdrop-blur-sm scrollbar-thin">
              {slides.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === slide ? 'border-orange-500' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  aria-label={`View slide ${i + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg bg-background/80 p-2 text-text-primary backdrop-blur hover:bg-background"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
            {project.category}
          </p>
          <h2 id={titleId} className="mt-2 text-2xl font-bold text-text-primary">
            {project.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{project.shortDescription}</p>

          <h3 className="mt-6 text-sm font-semibold text-text-primary">Features</h3>
          <ul className="mt-2 list-inside list-disc text-sm text-text-muted">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <h3 className="mt-4 text-sm font-semibold text-text-primary">UI highlights</h3>
          <ul className="mt-2 list-inside list-disc text-sm text-text-muted">
            {project.uiHighlights.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>

          <h3 className="mt-4 text-sm font-semibold text-text-primary">Tech stack</h3>
          <p className="mt-2 text-sm text-text-muted">{project.techStack.join(' · ')}</p>

          <h3 className="mt-6 text-sm font-semibold text-text-primary">Case study</h3>
          <div className="mt-3 space-y-3 text-sm text-text-muted">
            <p>
              <span className="font-medium text-text-primary">Problem:</span> {project.caseStudy.problem}
            </p>
            <p>
              <span className="font-medium text-text-primary">Solution:</span>{' '}
              {project.caseStudy.solution}
            </p>
            <p>
              <span className="font-medium text-text-primary">Outcome:</span> {project.caseStudy.outcome}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GradientLink to="/contact" onClick={onClose} className="flex-1 justify-center">
              Start a similar project
            </GradientLink>
            <GradientButton variant="outline" className="flex-1" type="button" onClick={onClose}>
              Close
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  )
}
