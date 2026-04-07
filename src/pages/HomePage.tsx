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

export function HomePage() {
  const { hash, pathname } = useLocation()

  usePageSeo({
    title:
      'HexaStack Solutions — Official Site | Web Design, UI/UX, Ecommerce & Development Kerala | SEO Thrissur',
    description:
      'HexaStack Solutions — official website (hexastacksolutions.com). Web design, UI/UX, ecommerce, web development, technical SEO & digital marketing from Vadanappally, Thrissur, Kerala for India, UAE, Saudi Arabia, Oman, Kuwait, Bahrain, Qatar, GCC & global clients. Custom software, POS, VAT/GST-aware billing, healthcare & tourism, landing pages, remote delivery. Co‑founders Anandu Krishna & Surag. Kerala IT company; Thrissur web agency.',
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
      <Stats />
      <Testimonials />
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
