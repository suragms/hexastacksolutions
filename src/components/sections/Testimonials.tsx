import { useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { appendPublicTestimonial, getTestimonialsForHome } from '../../lib/testimonials'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

function ReviewCard({
  name,
  message,
  ariaHidden,
}: {
  name: string
  message: string
  ariaHidden?: boolean
}) {
  return (
    <article
      aria-hidden={ariaHidden || undefined}
      className="relative w-[min(20rem,calc(100vw-2rem))] max-w-[340px] shrink-0 rounded-2xl border border-orange-100/90 bg-gradient-to-br from-white via-orange-50/40 to-white p-5 shadow-md ring-1 ring-orange-100/50 sm:p-6 md:w-[320px] md:max-w-none"
    >
      <Quote
        className="absolute right-4 top-4 h-8 w-8 text-orange-200/90 sm:right-5 sm:top-5 sm:h-10 sm:w-10"
        aria-hidden
        strokeWidth={1.25}
      />
      <p className="relative break-words pr-8 text-[15px] leading-relaxed text-text-primary sm:pr-10">
        <span className="text-orange-500/90">&ldquo;</span>
        {message}
        <span className="text-orange-500/90">&rdquo;</span>
      </p>
      <p className="relative mt-5 text-sm font-semibold text-text-primary">{name}</p>
    </article>
  )
}

export function Testimonials() {
  const reduceMotion = useReducedMotion()
  const [tick, setTick] = useState(0)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [formErr, setFormErr] = useState('')
  const [formOk, setFormOk] = useState(false)

  const items = useMemo(() => {
    void tick
    return getTestimonialsForHome()
  }, [tick])

  useEffect(() => {
    function refresh() {
      setTick((x) => x + 1)
    }
    function onStorage(e: StorageEvent) {
      if (e.key === 'hs_testimonials_v1') refresh()
    }
    window.addEventListener('hs-testimonials-updated', refresh)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('hs-testimonials-updated', refresh)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const googleReviewUrl = String(import.meta.env.VITE_GOOGLE_REVIEW_URL ?? '').trim()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormErr('')
    setFormOk(false)
    const r = appendPublicTestimonial(name, msg)
    if (!r.ok) {
      setFormErr('reason' in r ? r.reason : 'Could not submit review.')
      return
    }
    setFormOk(true)
    setName('')
    setMsg('')
    setTick((x) => x + 1)
  }

  return (
    <Section id="reviews" className="border-y border-orange-100/60 bg-gradient-to-b from-white via-orange-50/30 to-white !py-10 md:!py-20">
      <Container>
        <FadeInView className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Trust &amp; social proof</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl md:text-4xl">
              What clients say
            </h2>
            <p className="mt-2 max-w-xl text-sm text-text-muted sm:text-base">
              Short feedback from teams we ship with — Kerala, Gulf, and remote. Approve public submissions in Admin
              so only real notes go live; seeds fill the row until you have enough approved reviews.
            </p>
          </div>
          {googleReviewUrl ? (
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 sm:w-auto"
            >
              Review us on Google
            </a>
          ) : null}
        </FadeInView>
      </Container>

      <FadeInView variant="fadeIn" className="mt-2 w-full px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto w-full max-w-[min(100%,92rem)]">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-14"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-14"
            aria-hidden
          />

          {items.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">No reviews to show yet.</p>
          ) : reduceMotion === true ? (
            <div className="scrollbar-thin flex gap-5 overflow-x-auto pb-4 md:gap-6">
              {items.map((t) => (
                <ReviewCard key={t.id} name={t.name} message={t.message} />
              ))}
            </div>
          ) : (
            <div
              className="portfolio-marquee-wrap group overflow-hidden pb-4"
              style={
                {
                  '--portfolio-marquee-duration': `${Math.min(100, Math.max(40, items.length * 8))}s`,
                } as CSSProperties
              }
            >
              <div className="portfolio-track flex w-max gap-5 md:gap-6">
                {items.map((t) => (
                  <ReviewCard key={`${t.id}-a`} name={t.name} message={t.message} />
                ))}
                {items.map((t) => (
                  <ReviewCard key={`${t.id}-b`} name={t.name} message={t.message} ariaHidden />
                ))}
              </div>
            </div>
          )}
        </div>
      </FadeInView>

      <Container className="mt-8 md:mt-10">
        <FadeInView className="mx-auto w-full min-w-0 max-w-lg rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 md:p-8">
          <h3 className="text-base font-semibold text-text-primary sm:text-lg">Share a quick review</h3>
          <p className="mt-1 text-sm text-text-muted">
            Your name and message only. We may publish approved reviews on this page. This is not a substitute for
            Google — for maximum trust, also leave a review on{' '}
            {googleReviewUrl ? (
              <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-orange-600 hover:underline">
                Google Maps
              </a>
            ) : (
              'your Google Business profile'
            )}
            .
          </p>
          <form className="mt-5 space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="review-name" className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
                Your name
              </label>
              <input
                id="review-name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                maxLength={80}
                required
                className="mt-1.5 w-full min-w-0 rounded-xl border border-border bg-background px-3 py-2.5 text-base outline-none ring-orange-200/50 transition focus:border-orange-300 focus:ring-2"
                placeholder="e.g. Priya · Kochi"
              />
            </div>
            <div>
              <label htmlFor="review-msg" className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
                Message
              </label>
              <textarea
                id="review-msg"
                name="message"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                maxLength={600}
                rows={4}
                required
                className="mt-1.5 w-full min-w-0 resize-y rounded-xl border border-border bg-background px-3 py-2.5 text-base outline-none ring-orange-200/50 transition focus:border-orange-300 focus:ring-2"
                placeholder="What stood out about the project or delivery?"
              />
              <p className="mt-1 text-right text-xs text-text-muted">{msg.length}/600</p>
            </div>
            {formErr ? <p className="text-sm text-red-600">{formErr}</p> : null}
            {formOk ? (
              <p className="text-sm font-medium text-green-700" role="status">
                Thanks — we&apos;ll review and may publish this on the homepage.
              </p>
            ) : null}
            <button
              type="submit"
              className="w-full rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              Submit review
            </button>
          </form>
        </FadeInView>
      </Container>
    </Section>
  )
}
