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
            Transforming Ideas into Digital Success
          </h1>

          <h2 className="order-1 mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-600 sm:mb-4 sm:text-xs">
            HexaStack Solutions · Software · AI · Web · Mobile · Marketing · Branding · BizDev · IT
          </h2>

          <h3 className="order-3 mt-4 text-base font-semibold leading-snug text-text-primary sm:mt-5 sm:text-lg">
            You talk to the developer. Reply in 2 hours on WhatsApp.
          </h3>

          <p className="order-4 mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-4 sm:text-base">
            HexaStack Solutions helps businesses, startups, educational institutions, and organizations grow with
            custom software, AI solutions, websites, mobile apps, digital marketing, branding, business development
            support, and complete IT services. As a{' '}
            <Link to="/services/software-development" className="font-semibold text-text-primary underline decoration-orange-200 underline-offset-2 hover:text-orange-700">
              software development company
            </Link>{' '}
            and{' '}
            <Link to="/services/ai-machine-learning" className="font-semibold text-text-primary underline decoration-orange-200 underline-offset-2 hover:text-orange-700">
              AI development company
            </Link>{' '}
            in Kerala, we plan, build, market, and support your product end to end — one trusted partner for your
            entire digital transformation journey.
          </p>

          <div className="order-5 mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <GradientLink to="/contact" className="w-full justify-center sm:w-auto">
              Get Started
            </GradientLink>
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text-primary shadow-sm transition hover:border-orange-300 hover:bg-surface sm:w-auto"
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text-primary shadow-sm transition hover:border-orange-300 hover:bg-surface sm:w-auto"
            >
              View Services
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
