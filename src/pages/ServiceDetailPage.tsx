import { Navigate, useParams } from 'react-router-dom'
import { SeoLanding } from '../components/services/SeoLanding'
import { WebAppLanding } from '../components/services/WebAppLanding'
import { WebDesignLanding } from '../components/services/WebDesignLanding'

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  if (slug === 'web-design') {
    return <WebDesignLanding />
  }
  if (slug === 'web-applications') {
    return <WebAppLanding />
  }
  if (slug === 'seo') {
    return <SeoLanding />
  }

  return <Navigate to="/services" replace />
}
