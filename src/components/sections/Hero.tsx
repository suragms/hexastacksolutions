import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { GradientLink } from '../ui/GradientLink'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-hero-grid-light pt-24 pb-16 md:pt-32 md:pb-24">
      <div
        className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-orange-100/70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-orange-50/80 blur-3xl"
        aria-hidden
      />

      <Container className="relative z-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto w-full max-w-[min(100%,85rem)] text-center"
        >
          {/* Credibility line; SEO-relevant */}
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-600 sm:mb-5 sm:text-xs md:text-sm">
            HexaStack Solutions · Official site · Web design · Apps · SEO · Thrissur, Kerala
          </p>

          <h1 className="break-words text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl lg:text-[4.75rem]">
            Building High&#8209;Performance Websites &amp; Software That Power Growing Businesses.
          </h1>

          <p className="mx-auto mt-6 max-w-[min(100%,52rem)] text-base leading-relaxed text-text-muted sm:mt-7 sm:text-lg md:text-xl">
            HexaStack Solutions delivers custom{' '}
            <strong className="font-semibold text-text-primary">web design Kerala</strong>,{' '}
            <strong className="font-semibold text-text-primary">UI/UX</strong>,{' '}
            <strong className="font-semibold text-text-primary">ecommerce</strong>, and{' '}
            <strong className="font-semibold text-text-primary">web development Thrissur</strong>, and custom software for teams in{' '}
            <strong className="font-semibold text-text-primary">Ernakulam, Kozhikode, and Gulf states</strong>{' '}
            (UAE, Saudi Arabia, Qatar, Bahrain). Technical SEO, fast builds, clear scope—built to convert.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link
              to="/work"
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-text-primary shadow-sm transition hover:border-orange-300 hover:bg-surface sm:w-auto"
            >
              View Portfolio
            </Link>
            <GradientLink to="/contact" className="w-full justify-center sm:w-auto">
              Book A Call
            </GradientLink>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
