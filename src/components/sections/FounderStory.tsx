import { Code2, Cpu, Globe2, LayoutDashboard, Search, Zap } from 'lucide-react'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'

const features = [
  {
    icon: Globe2,
    title: 'Kerala • Gulf • Global',
    desc: 'Delivering robust digital solutions for local brands and international enterprises.',
  },
  {
    icon: Code2,
    title: 'Enterprise Engineering',
    desc: '100% custom code architecture, built for scalability, security, and long-term ROI.',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    desc: 'Sub-second load times and 90+ Lighthouse scores for maximum conversion rates.',
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    desc: 'Built-in technical SEO foundations ensuring your business dominates search rankings.',
  },
  {
    icon: Cpu,
    title: 'AI & Automation',
    desc: 'Intelligent workflows and custom AI integrations that save hundreds of manual hours.',
  },
  {
    icon: LayoutDashboard,
    title: 'ERP & POS Specialists',
    desc: 'Comprehensive HexaBill systems engineered for inventory, billing, and VAT compliance.',
  },
]

export function FounderStory() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/30 py-16 md:py-20">
      {/* Premium subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[100px]" />
      
      <Container>
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <FadeInView variant="fadeUp">
            <span className="section-kicker mx-auto mb-4">Our Standard</span>
            <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
              Engineers First. <br className="hidden sm:block" /> Marketers Second.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
              We believe a website should be a <strong className="font-semibold text-text-primary">high-performance revenue engine</strong>. We don't just build generic templates—we engineer custom software, fast websites, and AI automation workflows that drive measurable growth.
            </p>
            <p className="mt-6 text-sm font-semibold text-text-primary">
              — Anandu Krishna & Surag, Founders
            </p>
          </FadeInView>
        </div>
        
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeInView key={feature.title} variant="fadeUp" delay={i * 0.05}>
              <div className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition duration-300 hover:border-orange-200/60 hover:shadow-md sm:p-7">
                <div className="mb-5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50/50 text-orange-600 ring-1 ring-orange-100/80 transition duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/20 group-hover:ring-orange-500">
                  <feature.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-base font-bold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {feature.desc}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>

        <FadeInView variant="fadeUp" delay={0.2} className="mx-auto mt-14 max-w-4xl border-t border-border/40 pt-10">
           <div className="flex flex-col items-center justify-center gap-8 divide-y divide-border/40 text-center sm:flex-row sm:gap-0 sm:divide-x sm:divide-y-0">
              <div className="w-full px-8 sm:w-auto sm:px-12">
                <p className="tabular-nums tracking-tight text-4xl font-extrabold text-text-primary">40+</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Projects Delivered</p>
              </div>
              <div className="w-full px-8 pt-8 sm:w-auto sm:px-12 sm:pt-0">
                <p className="tabular-nums tracking-tight text-4xl font-extrabold text-text-primary">100%</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Custom Code</p>
              </div>
              <div className="w-full px-8 pt-8 sm:w-auto sm:px-12 sm:pt-0">
                <p className="tabular-nums tracking-tight text-4xl font-extrabold text-text-primary">90+</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Lighthouse Score</p>
              </div>
           </div>
        </FadeInView>
      </Container>
    </section>
  )
}
