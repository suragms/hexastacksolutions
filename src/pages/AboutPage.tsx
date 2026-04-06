import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { FadeInView } from '../components/ui/FadeInView'
import { GradientLink } from '../components/ui/GradientLink'
import { Section } from '../components/ui/Section'
import { FOUNDER_DEFAULT_IMAGES } from '../data/founderAssets'
import { site } from '../data/site'
import { useFounderPhotos } from '../hooks/useFounderPhotos'
import { usePageSeo } from '../hooks/usePageSeo'

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

export function AboutPage() {
  const founderPhotos = useFounderPhotos()

  usePageSeo({
    title: 'About HexaStack Solutions | Web & software studio Thrissur, Kerala | UAE & GCC clients',
    description:
      'Meet the HexaStack team: VAT-aware POS, billing, web apps, SEO, and digital marketing for Kerala, UAE, Saudi Arabia, Oman, Kuwait, Bahrain, Qatar, and global B2B teams. Based in Vadanappally, Thrissur.',
    canonicalPath: '/about',
  })

  return (
    <>
      <div className="relative border-b border-orange-100/80 bg-gradient-to-b from-orange-50/90 via-white to-white">
        <Section className="pt-24 md:pt-28">
          <Container>
            <FadeInView className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">About HexaStack Solutions</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
                A Kerala software studio with a product mindset
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-text-muted">
                {site.name} works from {site.area}, {site.city}, {site.region}. We ship marketing sites, internal tools,
                POS and billing, and bespoke software for teams in {site.serviceAreasLabel}, with fixed scope per phase,
                SEO-ready structure, and support after go-live.
              </p>
              <div className="mt-10 space-y-6 leading-relaxed text-text-muted">
                <p>
                  Gulf-facing work stays practical: VAT-ready invoicing, stock and branch flows, and UIs that match how
                  finance and store staff work day to day, from UAE and Saudi to Kerala-based teams exporting to the Gulf.
                </p>
                <p>
                  We bias toward code you can own: clear components, typed logic where it helps, and handover notes so your
                  team or the next vendor is not guessing.
                </p>
              </div>
            </FadeInView>

            <FadeInView className="mx-auto mt-16 max-w-5xl border-t border-border pt-16">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Founders</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                Anandu Krishna and Surag stay on the work
              </h2>
              <p className="mt-3 max-w-2xl text-text-muted">
                You work with the founders directly, so scope and quality stay aligned without a chain of account
                managers. Headshots can be updated anytime from the site Admin.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
                <article className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <FounderAvatar
                    name="Anandu Krishna"
                    stored={founderPhotos.anandu}
                    defaultSrc={FOUNDER_DEFAULT_IMAGES.anandu}
                    initials="AK"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Anandu Krishna</h3>
                    <p className="text-sm font-medium text-text-muted">Co-founder &amp; Product Lead</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      Leads client communication, product strategy, UI/UX decisions, and overall execution. From
                      understanding business needs to delivering production-ready solutions, Anandu handles the full
                      cycle including client calls, updates, scaling, and ongoing maintenance. Every major decision and
                      risk is owned and handled directly.
                    </p>
                  </div>
                </article>

                <article className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <FounderAvatar
                    name="Surag"
                    stored={founderPhotos.surag}
                    defaultSrc={FOUNDER_DEFAULT_IMAGES.surag}
                    initials="S"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Surag</h3>
                    <p className="text-sm font-medium text-text-muted">Co-founder &amp; Full Stack Developer</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      Focuses on backend architecture and frontend, system stability, integrations, and technical
                      implementation. Surag designs and plans ensuring the system is scalable, reliable, and performs
                      efficiently. From fixing issues to building core systems, he ensures smooth technical execution.
                    </p>
                  </div>
                </article>
              </div>
            </FadeInView>

            <FadeInView className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-center gap-4 border-t border-border pt-10 sm:flex-row sm:gap-8">
              <GradientLink to="/contact">Book a call</GradientLink>
              <Link
                to="/work"
                className="text-sm font-semibold text-orange-600 underline-offset-4 hover:text-orange-700 hover:underline"
              >
                View portfolio
              </Link>
            </FadeInView>
          </Container>
        </Section>
      </div>
    </>
  )
}
