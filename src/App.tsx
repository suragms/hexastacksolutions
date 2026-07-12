import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { AnalyticsBeacon } from './components/AnalyticsBeacon'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'

const Admin = lazy(() => import('./pages/Admin'))
const WorkPage = lazy(() => import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })))
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })),
)
const HexaBillPage = lazy(() => import('./pages/HexaBillPage').then((m) => ({ default: m.HexaBillPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostDynamic = lazy(() => import('./pages/BlogPostDynamic'))
const BlogVatUae = lazy(() => import('./pages/blog/VATCompliantBillingUAE'))
const BlogPosKerala = lazy(() => import('./pages/blog/POSSoftwareRestaurantsKerala'))
const BlogWebsiteCost = lazy(() => import('./pages/blog/WebsiteCostKerala'))
const BlogWebDevThrissur = lazy(() => import('./pages/blog/WebDevelopmentCompanyThrissur'))
const BlogWhatsApp = lazy(() => import('./pages/blog/WhatsAppBusinessSetupKerala'))
const BlogRestaurantPos = lazy(() => import('./pages/blog/RestaurantPOSCaseStudy'))
const BlogNutriScan = lazy(() => import('./pages/blog/NutriScanAIFoodRecognition'))
const BlogLab = lazy(() => import('./pages/blog/MedicalLabSoftwareKerala'))
const BlogMobileDev = lazy(() => import('./pages/blog/ChooseMobileAppDeveloperKerala'))
const BlogAi = lazy(() => import('./pages/blog/AIIntegrationSmallBusinessKerala'))
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
const SecurityPage = lazy(() => import('./pages/SecurityPage').then((m) => ({ default: m.SecurityPage })))
const RulesPage = lazy(() => import('./pages/RulesPage').then((m) => ({ default: m.RulesPage })))
const RefundPolicyPage = lazy(() =>
  import('./pages/RefundPolicyPage').then((m) => ({ default: m.RefundPolicyPage })),
)

const LocalSeoPage = lazy(() => import('./pages/seo/LocalSeoPage'))

function RouteFallback() {
  return (
    <div
      className="flex min-h-[45vh] w-full flex-col items-center justify-center gap-3 bg-background px-4"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="h-3 w-32 animate-pulse rounded-md bg-zinc-200/80" />
      <div className="h-8 w-full max-w-md animate-pulse rounded-md bg-zinc-200/80" />
      <div className="h-3 w-full max-w-sm animate-pulse rounded-md bg-zinc-200/80" />
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <AnalyticsBeacon />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/admin" element={<Admin />} />

          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/products/hexabill" element={<HexaBillPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/vat-compliant-billing-software-uae" element={<BlogVatUae />} />
            <Route path="/blog/pos-software-restaurants-kerala" element={<BlogPosKerala />} />
            <Route path="/blog/website-cost-kerala" element={<BlogWebsiteCost />} />
            <Route path="/blog/web-development-company-thrissur" element={<BlogWebDevThrissur />} />
            <Route path="/blog/whatsapp-business-setup-kerala" element={<BlogWhatsApp />} />
            <Route path="/blog/restaurant-pos-case-study" element={<BlogRestaurantPos />} />
            <Route path="/blog/nutriscan-ai-food-recognition" element={<BlogNutriScan />} />
            <Route path="/blog/medical-lab-software-kerala" element={<BlogLab />} />
            <Route path="/blog/choose-mobile-app-developer-kerala" element={<BlogMobileDev />} />
            <Route path="/blog/ai-integration-small-business-kerala" element={<BlogAi />} />
            <Route path="/blog/:slug" element={<BlogPostDynamic />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />

            <Route path="/web-development-company-thrissur" element={<LocalSeoPage />} />
            <Route path="/seo-company-thrissur" element={<LocalSeoPage />} />
            <Route path="/software-company-kerala" element={<LocalSeoPage />} />
            <Route path="/mobile-app-development-kerala" element={<LocalSeoPage />} />
            <Route path="/erp-software-kerala" element={<LocalSeoPage />} />
            <Route path="/ai-automation-company-kerala" element={<LocalSeoPage />} />
            <Route path="/website-design-company-thrissur" element={<LocalSeoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
