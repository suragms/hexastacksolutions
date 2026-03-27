import {
  BarChart3,
  ClipboardList,
  Code2,
  FileText,
  LayoutTemplate,
  Palette,
  Rocket,
  Search,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

const steps = [
  {
    title: 'Onboarding & business analysis',
    desc: 'We align on purpose, goals, constraints, and what “done” looks like for your users and stakeholders.',
    Icon: ClipboardList,
  },
  {
    title: 'Competitive research',
    desc: 'Site structure, user actions, and competitor patterns so positioning and UX decisions are evidence-led.',
    Icon: Search,
  },
  {
    title: 'Wireframes',
    desc: 'Low-fidelity flows before pixels: navigation, key screens, and friction points addressed early.',
    Icon: LayoutTemplate,
  },
  {
    title: 'Design mockups',
    desc: 'Multiple visual directions, brand-aligned components, and responsive layouts you can review clearly.',
    Icon: Palette,
  },
  {
    title: 'Content integration',
    desc: 'Structured copy and media placed deliberately so the story matches tone, SEO, and accessibility.',
    Icon: FileText,
  },
  {
    title: 'Development',
    desc: 'Clean, documented implementation: staging previews, reviews, and performance as a default.',
    Icon: Code2,
  },
  {
    title: 'Testing, deployment & launch',
    desc: 'Cross-device QA, security and speed checks, then a controlled go-live with monitoring in place.',
    Icon: Rocket,
  },
  {
    title: 'Post-launch maintenance',
    desc: 'Monitoring, updates, and iteration so the product stays fast, secure, and aligned with usage.',
    Icon: BarChart3,
  },
] as const

export function Process() {
  const reduce = useReducedMotion()

  return (
    <Section id="process" className="bg-surface/20">
      <Container>
        <FadeInView className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Process</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Detailed process over guesswork
          </h2>
          <p className="mt-4 text-text-muted">
            We don’t skip discovery. You get a transparent path from first workshop to launch, and support after.
          </p>
        </FadeInView>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-card/90 px-4 py-5 shadow-sm backdrop-blur-sm transition hover:border-orange-200/80 hover:shadow-md"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: reduce ? 0 : index * 0.04,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 text-orange-700 ring-1 ring-orange-100">
                <step.Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-text-primary">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-text-muted">{step.desc}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
