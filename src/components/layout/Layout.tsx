import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { hydrateAdminContentFromServer } from '../../lib/adminContent'
import { hydrateTestimonialsFromServer } from '../../lib/testimonials'
import { JsonLd } from '../seo/JsonLd'
import { FloatingBookCall } from './FloatingBookCall'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

const MAX_VISITS = 2000

function getDevice(): 'Mobile' | 'Tablet' | 'Desktop' {
  const w = window.innerWidth
  if (w < 768) return 'Mobile'
  if (w < 1024) return 'Tablet'
  return 'Desktop'
}

function getSource(): string {
  const ref = document.referrer
  if (!ref) return 'Direct'
  if (/google|bing|yahoo|duckduckgo/i.test(ref)) return 'Organic'
  if (/facebook|twitter|instagram|linkedin|youtube/i.test(ref)) return 'Social'
  return 'Referral'
}

export type VisitRecord = {
  page: string
  ts: number         // unix ms
  device: string
  source: string
  referrer: string
}

export function trackVisit(page: string) {
  try {
    const raw = localStorage.getItem('hs_analytics') ?? '[]'
    const visits: VisitRecord[] = JSON.parse(raw)
    visits.push({ page, ts: Date.now(), device: getDevice(), source: getSource(), referrer: document.referrer })
    if (visits.length > MAX_VISITS) visits.splice(0, visits.length - MAX_VISITS)
    localStorage.setItem('hs_analytics', JSON.stringify(visits))
  } catch { /* silently ignore storage errors */ }
}

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    trackVisit(pathname)
  }, [pathname])

  useEffect(() => {
    void hydrateTestimonialsFromServer()
    void hydrateAdminContentFromServer()
  }, [])

  return (
    <div className="flex min-h-svh flex-col bg-background text-text-primary">
      <JsonLd />
      <Navbar key={pathname} />
      <main className="min-w-0 flex-1 overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
      <FloatingBookCall />
    </div>
  )
}
