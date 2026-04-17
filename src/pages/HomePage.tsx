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
    title: 'Web Development Company in Kerala | Software Company in Thrissur | HexaStack Solutions',
    description:
      'HexaStack Solutions is a web development company in Kerala and software company in Thrissur delivering mobile app development Kerala, ERP software Kerala, and AI automation services Kerala to help businesses save time and grow revenue.',
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
