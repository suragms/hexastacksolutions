import {
  CheckCircle2,
  ClipboardList,
  Code2,
  GraduationCap,
  LayoutTemplate,
  Palette,
  Rocket,
  Search,
  Wrench,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

const steps = [
  {
    title: 'Requirement Analysis',
    desc: 'We understand your goals, users, and constraints so the scope is clear before a single screen is drawn.',
    Icon: ClipboardList,
  },
  {
    title: 'Business Consultation',
    desc: 'Practical guidance on process, technology, and scope — the right plan before the right build.',
    Icon: Search,
  },
  {
    title: 'Planning',
    desc: 'Roadmap, milestones, and fixed deliverables per phase so everyone knows what ships and when.',
    Icon: LayoutTemplate,
  },
  {
    title: 'UI/UX Design',
    desc: 'Wireframes and interfaces that are clear, accessible, and aligned with your brand.',
    Icon: Palette,
  },
  {
    title: 'Development',
    desc: 'Clean, scalable code with staging previews and reviews throughout the build.',
    Icon: Code2,
  },
  {
    title: 'Testing',
    desc: 'Cross-device QA, security checks, and performance testing before anything goes live.',
    Icon: CheckCircle2,
  },
  {
    title: 'Deployment',
    desc: 'A controlled go-live with monitoring, backups, and rollback readiness in place.',
    Icon: Rocket,
  },
  {
    title: 'Training',
    desc: 'Hands-on onboarding for your team so you can operate and manage the system with confidence.',
    Icon: GraduationCap,
  },
  {
    title: 'Support & Maintenance',
    desc: 'Ongoing care — updates, monitoring, and support — so your software stays fast, secure, and useful.',
    Icon: Wrench,
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
            From idea to launch — and beyond
          </h2>
          <p className="mt-4 text-text-muted">
            A transparent nine-step path: analyse, consult, plan, design, build, test, deploy, train, and support.
          </p>
        </FadeInView>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-card px-5 py-5 shadow-sm transition-colors duration-200 hover:border-orange-200/80"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: reduce ? 0 : index * 0.05,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 text-orange-700 ring-1 ring-orange-100">
                  <step.Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Step {String(index + 1).padStart(2, '0')}
                </span>
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
