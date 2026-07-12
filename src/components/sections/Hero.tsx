import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { GradientLink } from '../ui/GradientLink'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-hero-grid-light pt-20 pb-12 md:pt-24 md:pb-16">
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
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto flex w-full max-w-4xl flex-col text-center"
        >
          {/* DOM: H1 first for SEO; visual order unchanged via flex `order`. */}
          <h1 className="order-2 break-words text-3xl font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            Custom Software &amp; Websites — Built in Thrissur, Trusted in the Gulf
          </h1>

          <h2 className="order-1 mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-600 sm:mb-4 sm:text-xs">
            HexaStack Solutions · Kerala &amp; Thrissur · Web, Mobile, ERP &amp; AI
          </h2>

          <h3 className="order-3 mt-4 text-base font-semibold leading-snug text-text-primary sm:mt-5 sm:text-lg">
            You talk to the developer. Reply in 2 hours on WhatsApp.
          </h3>

          <p className="order-4 mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-4 sm:text-base">
            We help growth-focused teams in Kerala and the Gulf turn slow manual workflows into fast digital systems. As a{' '}
            <Link to="/services/web-design" className="font-semibold text-text-primary underline decoration-orange-200 underline-offset-2 hover:text-orange-700">
              web development company in Kerala
            </Link>{' '}
            and trusted{' '}
            <strong className="font-semibold text-text-primary">software company in Thrissur</strong>, we deliver{' '}
            <Link to="/services/web-applications" className="font-semibold text-text-primary underline decoration-orange-200 underline-offset-2 hover:text-orange-700">
              mobile app development
            </Link>
            ,{' '}
            <Link to="/products/hexabill" className="font-semibold text-text-primary underline decoration-orange-200 underline-offset-2 hover:text-orange-700">
              ERP and POS
            </Link>
            , plus{' '}
            <Link to="/services/web-applications" className="font-semibold text-text-primary underline decoration-orange-200 underline-offset-2 hover:text-orange-700">
              AI automation
            </Link>{' '}
            so you can save time, increase revenue, and scale with confidence.
          </p>

          <div className="order-5 mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <Link
              to="/work"
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text-primary shadow-sm transition hover:border-orange-300 hover:bg-surface sm:w-auto"
            >
              Request Pricing
            </Link>
            <GradientLink to="/contact" className="w-full justify-center sm:w-auto !py-2.5 !px-5">
              Get a Quote
            </GradientLink>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
