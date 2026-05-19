import { useLocation, Navigate } from 'react-router-dom'
import { getLocalSeoPage } from '../../data/localSeoPages'
import { LocalSeoLandingPage } from '../../components/seo/LocalSeoLandingPage'

export default function LocalSeoPage() {
  const { pathname } = useLocation()
  // Derive slug from pathname: "/web-development-company-thrissur" → "web-development-company-thrissur"
  const slug = pathname.replace(/^\//, '').replace(/\/$/, '')
  const data = getLocalSeoPage(slug)

  if (!data) return <Navigate to="/services" replace />

  return <LocalSeoLandingPage data={data} />
}
