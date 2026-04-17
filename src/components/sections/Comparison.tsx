import { Check, X } from 'lucide-react'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

const other = [
  'Generic templates passed off as custom work',
  'No discovery: straight to design without understanding your business',
  'Vague timelines and missed deadlines, especially for Gulf & NRI clients',
  'Disappear after launch: zero post-delivery support',
  'One point of contact who knows nothing about your code',
]

const ours = [
  'Purpose-built design and code matched to your market: Kerala, UAE, or global',
  'Deep business & SEO discovery before a single wireframe is drawn',
  'Clear milestones, weekly updates, and an on-time delivery guarantee',
  'Post-launch care plans: updates, monitoring, and SEO reporting included',
  'Founders Anandu & Surag stay hands-on from kickoff to deployment',
]

export function Comparison() {
  return (
    <Section id="compare" className="!p-0 overflow-hidden">
      <div className="bg-zinc-950 py-16 md:py-24">
        <Container>
          <FadeInView className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Why growth-focused teams choose HexaStack
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Many vendors promise fast delivery but miss business outcomes. Here is what changes when you partner
              with a reliability-first software company in Thrissur serving Kerala and beyond.
            </p>
          </FadeInView>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Other agencies */}
            <FadeInView variant="slideRight">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 h-full">
                <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Typical Agencies
                </p>
                <ul className="space-y-4">
                  {other.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800">
                        <X className="h-3 w-3 text-zinc-500" aria-hidden />
                      </span>
                      <span className="text-sm leading-relaxed text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>

            {/* HexaStack */}
            <FadeInView variant="slideLeft">
              <div className="rounded-2xl border border-orange-800/40 bg-gradient-to-br from-orange-950/50 to-zinc-900 p-8 h-full">
                <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-orange-400">
                  HexaStack Solutions
                </p>
                <ul className="space-y-4">
                  {ours.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20">
                        <Check className="h-3 w-3 text-orange-400" aria-hidden />
                      </span>
                      <span className="text-sm leading-relaxed text-zinc-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>
          </div>
        </Container>
      </div>
    </Section>
  )
}
