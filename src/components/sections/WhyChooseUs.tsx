import {
  Briefcase,
  ClipboardList,
  Code2,
  Cpu,
  Gauge,
  Globe2,
  Handshake,
  Layers,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

const reasons = [
  { title: 'One partner, full stack', desc: 'Software, AI, web, mobile, marketing, branding, and IT under one roof.', Icon: Layers },
  { title: 'Founder-led delivery', desc: 'Anandu & Surag stay hands-on from kickoff to deployment and beyond.', Icon: Users },
  { title: '100% custom code', desc: 'No templates — architecture matches how your business actually operates.', Icon: Code2 },
  { title: 'AI & automation first', desc: 'Workflows that cut manual hours and unlock real efficiency, not feature lists.', Icon: Cpu },
  { title: 'Fast, SEO-ready builds', desc: '90+ Lighthouse scores, Core Web Vitals, semantic markup, and schema.', Icon: Gauge },
  { title: 'Clear milestones, transparent pricing', desc: 'Fixed deliverables per phase with weekly updates — no surprises.', Icon: ClipboardList },
  { title: 'End-to-end support', desc: 'AMC, monitoring, backups, and maintenance plans that keep you running.', Icon: Wrench },
  { title: 'Kerala • Gulf • global', desc: 'Delivery for Thrissur and Kerala, GCC, and remote clients worldwide.', Icon: Globe2 },
  { title: 'Growth & marketing done right', desc: 'SEO, ads, social, and content engineered to convert visitors into customers.', Icon: TrendingUp },
  { title: 'Business-first consulting', desc: 'Process, strategy, and digital transformation — not just code.', Icon: Briefcase },
  { title: 'Secure & reliable', desc: 'Backups, security monitoring, and dependable uptime for your systems.', Icon: ShieldCheck },
  { title: 'Long-term partnership', desc: 'We scale with you — launch is the beginning, not the end.', Icon: Handshake },
]

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us">
      <Container>
        <FadeInView className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Why HexaStack</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Why Choose HexaStack Solutions
          </h2>
          <p className="mt-4 text-text-muted">
            A single, dependable partner for planning, design, development, marketing, and long-term support.
          </p>
        </FadeInView>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reasons.map((reason, i) => (
            <FadeInView key={reason.title} delay={i * 0.05} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-colors duration-200 hover:border-orange-200/60 hover:shadow-md">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50/50 text-orange-600 ring-1 ring-orange-100/80 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <reason.Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug text-text-primary">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{reason.desc}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </Container>
    </Section>
  )
}
