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
    title: 'About HexaStack Solutions | Kerala & Gulf software studio',
    description:
      'HexaStack builds VAT-aware POS, billing, and web products for Kerala, UAE, and Gulf B2B teams. Meet the founders and how we work.',
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
                {site.name} is based in {site.area}, {site.city}, {site.region}. We build marketing sites, internal
                tools, POS and billing flows, and custom software for teams across {site.serviceAreasLabel}, with
                clear scope, SEO-aware delivery, and support after launch.
              </p>
              <div className="mt-10 space-y-6 leading-relaxed text-text-muted">
                <p>
                  For Gulf B2B teams we focus on VAT, invoicing, and operational software that matches how finance and
                  store teams actually work, whether you are in UAE, Saudi Arabia, or scaling from Kerala to the Gulf.
                </p>
                <p>
                  Our stack favours maintainability: modern front ends, typed code where it pays off, and documentation
                  your team can extend, not a black box.
                </p>
              </div>
            </FadeInView>

            <FadeInView className="mx-auto mt-16 max-w-5xl border-t border-border pt-16">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Founders</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                Anandu Krishna and Surag stay on the work
              </h2>
              <p className="mt-3 max-w-2xl text-text-muted">
                You work directly with founders, with no layers of account managers. That keeps decisions fast and
                quality consistent. Add photos as <code className="rounded bg-zinc-100 px-1 text-xs">anandu.jpg</code>{' '}
                and <code className="rounded bg-zinc-100 px-1 text-xs">surag.jpg</code> under{' '}
                <code className="rounded bg-zinc-100 px-1 text-xs">public/images/founders</code>, or upload in Admin.
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
                    <p className="text-sm font-medium text-text-muted">Co-founder &amp; developer</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      Leads frontend delivery, UI decisions, and product implementation, so what you approve in design is
                      what ships in the browser.
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
                    <p className="text-sm font-medium text-text-muted">Co-founder &amp; developer</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      Owns backend planning, architecture, integrations, and direct client communication, so timelines
                      and technical risk stay visible.
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
