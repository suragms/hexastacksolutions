import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { API_URL } from '../lib/utils'

function readUtm(): string | null {
  try {
    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get('utm_source')
    if (fromUrl) {
      sessionStorage.setItem('hs_utm_source', fromUrl)
      return fromUrl
    }
    return sessionStorage.getItem('hs_utm_source')
  } catch {
    return null
  }
}

/** Fire-and-forget page view with UTM / referrer source. */
export function AnalyticsBeacon() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return
    const utmSource = readUtm()
    void fetch(`${API_URL}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: location.pathname + location.search,
        referrer: document.referrer || null,
        utmSource,
      }),
      keepalive: true,
    }).catch(() => {})
  }, [location.pathname, location.search])

  return null
}
