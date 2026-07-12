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
import { Testimonials } from '../components/sections/Testimonials'
import { ValueProp } from '../components/sections/ValueProp'
import { FounderStory } from '../components/sections/FounderStory'
import { TrustMetrics } from '../components/sections/TrustMetrics'

export function HomePage() {
  const { hash, pathname } = useLocation()

  usePageSeo({
    title: 'Custom Software & Websites — Built in Thrissur, Trusted in the Gulf | HexaStack',
    description:
      'HexaStack Solutions builds custom websites, mobile apps, ERP/POS, and AI automation from Thrissur for Kerala and Gulf businesses. Talk to the developer. Reply in 2 hours on WhatsApp.',
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
      <ValueProp />
      <FounderStory />
      <Stats />
      <Testimonials />
      <TrustMetrics />
      <Services />
      <OperationalProducts />
      <Comparison />
      <Process />
      <Industries />
      <FAQ />
      <CTASection />
    </>
  )
}
