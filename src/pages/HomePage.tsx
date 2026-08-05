import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaqJsonLd } from '../components/seo/FaqJsonLd'
import { usePageSeo } from '../hooks/usePageSeo'
import { Comparison } from '../components/sections/Comparison'
import { CTASection } from '../components/sections/CTASection'
import { FAQ } from '../components/sections/FAQ'
import { Hero } from '../components/sections/Hero'
import { Industries } from '../components/sections/Industries'
import { OperationalProducts } from '../components/sections/OperationalProducts'
import { Portfolio } from '../components/sections/Portfolio'
import { Process } from '../components/sections/Process'
import { Services } from '../components/sections/Services'
import { Stats } from '../components/sections/Stats'
import { TeamSection } from '../components/sections/TeamSection'
import { Testimonials } from '../components/sections/Testimonials'
import { TrustMetrics } from '../components/sections/TrustMetrics'
import { ValueProp } from '../components/sections/ValueProp'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'
import { FounderStory } from '../components/sections/FounderStory'

export function HomePage() {
  const { hash, pathname } = useLocation()

  usePageSeo({
    title: 'Software, AI, Web & Digital Growth Partner in Kerala | HexaStack',
    description:
      'HexaStack Solutions is a software development company and digital marketing agency in Thrissur, Kerala — custom software, AI solutions, websites, mobile apps, attendance systems, branding, and IT support for businesses in India and the Gulf.',
    canonicalPath: '/',
  })

  useEffect(() => {
    if (pathname !== '/') return
    if (!hash) return
    const id = hash.replace('#', '')
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [hash, pathname])

  return (
    <>
      <FaqJsonLd />
      <Hero />
      <Portfolio />
      <Services />
      <WhyChooseUs />
      <ValueProp />
      <FounderStory />
      <TeamSection />
      <Stats />
      <Testimonials />
      <TrustMetrics />
      <Process />
      <Industries />
      <OperationalProducts />
      <Comparison />
      <FAQ />
      <CTASection />
    </>
  )
}
