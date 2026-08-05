import { useState } from 'react'
import { CheckCircle2, ClipboardList, Layout, Megaphone, Palette, PenLine, Server, Smartphone } from 'lucide-react'
import { FOUNDER_DEFAULT_IMAGES } from '../../data/founderAssets'
import { useFounderPhotos } from '../../hooks/useFounderPhotos'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { Section } from '../ui/Section'

function FounderAvatar({
  name,
  stored,
  defaultSrc,
  initials,
}: {
  name: string
  stored: string | null
  defaultSrc: string
  initials: string
}) {
  const [failed, setFailed] = useState(false)
  const src = stored ?? defaultSrc
  if (failed) {
    return (
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-50 text-xl font-bold text-orange-900 ring-1 ring-orange-100"
        aria-hidden
      >
        {initials}
      </div>
    )
  }
  return (
    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-zinc-100 ring-1 ring-orange-100/80">
      <img
        src={src}
        alt={name}
        width={80}
        height={80}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

const founders = [
  {
    name: 'Anandu Krishna',
    role: 'Co-founder & Product Lead',
    initials: 'AK',
    photoKey: 'anandu' as const,
    bio: 'Leads client communication, product strategy, UI/UX decisions, and overall execution. From understanding business needs to delivering production-ready solutions, Anandu handles the full cycle including client calls, updates, scaling, and ongoing maintenance.',
  },
  {
    name: 'Surag',
    role: 'Co-founder & Full Stack Developer',
    initials: 'S',
    photoKey: 'surag' as const,
    bio: 'Focuses on backend architecture, frontend, system stability, integrations, and technical implementation. Surag designs and plans so the system is scalable, reliable, and performs efficiently — from fixing issues to building core systems.',
  },
]

const specialists = [
  { role: 'UI/UX Designer', scope: 'Interfaces, prototypes, and design systems', Icon: Palette },
  { role: 'Frontend Developer', scope: 'Fast, responsive, accessible frontends', Icon: Layout },
  { role: 'Backend Developer', scope: 'APIs, databases, and reliable architecture', Icon: Server },
  { role: 'Mobile App Developer', scope: 'Android, iOS, Flutter, and React Native apps', Icon: Smartphone },
  { role: 'Digital Marketing Specialist', scope: 'SEO, ads, social, and lead generation', Icon: Megaphone },
  { role: 'Content Writer', scope: 'Clear copy that communicates and converts', Icon: PenLine },
  { role: 'QA Engineer', scope: 'Testing, quality, and cross-device verification', Icon: CheckCircle2 },
  { role: 'Business Analyst', scope: 'Requirements, process, and project planning', Icon: ClipboardList },
]

export function TeamSection() {
  const founderPhotos = useFounderPhotos()

  return (
    <Section id="team">
      <Container>
        <FadeInView className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Meet the Team</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Meet the HexaStack Solutions Team
          </h2>
          <p className="mt-4 text-text-muted">
            Every project is planned, designed, developed, tested, optimized, and supported by the HexaStack
            Solutions team. From concept to deployment and ongoing maintenance, we collaborate closely with clients
            to deliver reliable, scalable, and high-quality digital solutions tailored to their business goals.
          </p>
        </FadeInView>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 md:gap-8">
          {founders.map((founder, i) => (
            <FadeInView key={founder.name} delay={i * 0.1} className="h-full">
              <article className="flex h-full gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <FounderAvatar
                  name={founder.name}
                  stored={founderPhotos[founder.photoKey]}
                  defaultSrc={FOUNDER_DEFAULT_IMAGES[founder.photoKey]}
                  initials={founder.initials}
                />
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{founder.name}</h3>
                  <p className="text-sm font-medium text-text-muted">{founder.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{founder.bio}</p>
                </div>
              </article>
            </FadeInView>
          ))}
        </div>

        <FadeInView className="mt-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Specialists in our extended team
          </p>
        </FadeInView>
        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {specialists.map((specialist, i) => (
            <FadeInView key={specialist.role} delay={i * 0.04} className="h-full">
              <div className="flex h-full flex-col items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-5 text-center shadow-sm transition-colors duration-200 hover:border-orange-200/80">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100/80">
                  <specialist.Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <span className="text-xs font-semibold leading-tight text-text-primary">{specialist.role}</span>
                <span className="text-[0.7rem] leading-snug text-text-muted">{specialist.scope}</span>
              </div>
            </FadeInView>
          ))}
        </div>
      </Container>
    </Section>
  )
}
