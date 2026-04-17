import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'

const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })))
const WorkPage = lazy(() => import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })))
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })),
)
const HexaBillPage = lazy(() => import('./pages/HexaBillPage').then((m) => ({ default: m.HexaBillPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostDynamic = lazy(() => import('./pages/BlogPostDynamic'))
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
const SecurityPage = lazy(() => import('./pages/SecurityPage').then((m) => ({ default: m.SecurityPage })))
const RulesPage = lazy(() => import('./pages/RulesPage').then((m) => ({ default: m.RulesPage })))
const RefundPolicyPage = lazy(() =>
  import('./pages/RefundPolicyPage').then((m) => ({ default: m.RefundPolicyPage })),
)

function RouteFallback() {
  return (
    <div
      className="flex min-h-[45vh] w-full items-center justify-center bg-background text-sm text-text-muted"
      aria-busy="true"
      aria-live="polite"
    >
      Loading…
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />

          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/products/hexabill" element={<HexaBillPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostDynamic />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
