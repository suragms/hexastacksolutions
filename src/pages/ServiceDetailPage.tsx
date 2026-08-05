import { Navigate, useParams } from 'react-router-dom'
import { SeoLanding } from '../components/services/SeoLanding'
import { ServiceCategoryLanding } from '../components/services/ServiceCategoryLanding'
import { WebAppLanding } from '../components/services/WebAppLanding'
import { WebDesignLanding } from '../components/services/WebDesignLanding'
import { getServiceCategory } from '../data/serviceCatalog'

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

  const category = slug ? getServiceCategory(slug) : undefined
  if (category) {
    return <ServiceCategoryLanding data={category} />
  }

  return <Navigate to="/services" replace />
}
