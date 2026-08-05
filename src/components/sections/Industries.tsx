import {
  Banknote,
  Building2,
  Factory,
  GraduationCap,
  HardHat,
  HeartHandshake,
  Home,
  Hospital,
  Hotel,
  Landmark,
  Plane,
  Rocket,
  School,
  ShoppingCart,
  Stethoscope,
  Store,
  UtensilsCrossed,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

const industries = [
  { name: 'Startups', Icon: Rocket },
  { name: 'Small Businesses', Icon: Store },
  { name: 'Enterprises', Icon: Building2 },
  { name: 'Schools', Icon: School },
  { name: 'Colleges', Icon: GraduationCap },
  { name: 'Universities', Icon: Landmark },
  { name: 'Hospitals', Icon: Hospital },
  { name: 'Hotels', Icon: Hotel },
  { name: 'Restaurants', Icon: UtensilsCrossed },
  { name: 'Retail', Icon: ShoppingCart },
  { name: 'Manufacturing', Icon: Factory },
  { name: 'NGOs', Icon: HeartHandshake },
  { name: 'Government Organizations', Icon: Landmark },
  { name: 'Travel Agencies', Icon: Plane },
  { name: 'Financial Services', Icon: Banknote },
  { name: 'Healthcare', Icon: Stethoscope },
  { name: 'Construction', Icon: HardHat },
  { name: 'Real Estate', Icon: Home },
] as const

export function Industries() {
  return (
    <Section className="border-t border-border bg-surface/25">
      <Container>
        <FadeInView className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Industries</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Industries We Serve
          </h2>
          <p className="mt-4 text-text-muted">
            From startups and education to healthcare, hospitality, and construction — we tailor technology to the
            way your industry actually works.
          </p>
        </FadeInView>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {industries.map((industry, i) => (
            <FadeInView key={industry.name} delay={i * 0.04} className="h-full">
              <div className="flex h-full flex-col items-center gap-2.5 rounded-2xl border border-border bg-card px-3 py-5 text-center shadow-sm transition-colors duration-200 hover:border-orange-200/80 hover:bg-orange-50/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100/80">
                  <industry.Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <span className="text-xs font-semibold leading-tight text-text-primary">{industry.name}</span>
              </div>
            </FadeInView>
          ))}
        </div>
      </Container>
    </Section>
  )
}
