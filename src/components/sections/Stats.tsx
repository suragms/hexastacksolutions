import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

const clients = [
  'iSprout Workspaces',
  'SecureX Global',
  'QS I‑GAUGE',
  'Lavancha Solar',
  'OM Steel Solutions',
  'DirectEarCare UK',
  'Rizeshift HR',
  'Goldrec Australia',
  'MAB‑SSC Facility Mgmt',
  'World Informatix Cyber',
]

const keralaDistricts = [
  'Thrissur', 'Ernakulam', 'Kozhikode', 'Malappuram',
  'Thiruvananthapuram', 'Kannur', 'Palakkad', 'Kottayam',
]

const gulfCountries = [
  'UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait', 'Oman',
]

const stats = [
  { value: '40+', label: 'Projects delivered' },
  { value: '4+', label: 'Countries served' },
  { value: '2+', label: 'Years shipping products' },
  { value: '12+', label: 'Industries covered' },
]

export function Stats() {
  return (
    <Section id="stats" className="!py-16 md:!py-24 bg-surface/40">
      <Container>
        {/* Header */}
        <FadeInView className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
            Trusted globally
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Trusted by Businesses Across Gulf &amp; Kerala
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-text-muted">
            From Thrissur to Dubai, we&apos;ve designed and shipped digital products for companies
            across every major Kerala district and Gulf state.
          </p>
        </FadeInView>

        {/* Client name strip */}
        <FadeInView variant="fadeIn" className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {clients.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-text-muted shadow-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </FadeInView>

        {/* Geography strips */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <FadeInView variant="slideRight" className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-600">
              Kerala Districts Served
            </p>
            <div className="flex flex-wrap gap-2">
              {keralaDistricts.map((d) => (
                <span
                  key={d}
                  className="rounded-md bg-orange-50 px-3 py-1 text-sm font-medium text-orange-800 border border-orange-100"
                >
                  {d}
                </span>
              ))}
            </div>
          </FadeInView>

          <FadeInView variant="slideLeft" className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-600">
              Gulf Countries
            </p>
            <div className="flex flex-wrap gap-2">
              {gulfCountries.map((g) => (
                <span
                  key={g}
                  className="rounded-md bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-700 border border-zinc-200"
                >
                  {g}
                </span>
              ))}
            </div>
          </FadeInView>
        </div>

        {/* Numbers */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeInView key={s.label} delay={i * 0.06} variant="zoomIn">
              <div className="rounded-2xl border border-border bg-card px-5 py-8 text-center shadow-sm">
                <p className="text-4xl font-bold tabular-nums tracking-tight gradient-text md:text-[2.75rem]">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-text-muted">{s.label}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </Container>
    </Section>
  )
}
