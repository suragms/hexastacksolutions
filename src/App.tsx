import { Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Layout } from './components/layout/Layout'
import { AboutPage } from './pages/AboutPage'
import { AdminPage } from './pages/AdminPage'
import { BlogPage } from './pages/BlogPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import { ServicesPage } from './pages/ServicesPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { RefundPolicyPage } from './pages/RefundPolicyPage'
import { RulesPage } from './pages/RulesPage'
import { SecurityPage } from './pages/SecurityPage'
import { TermsPage } from './pages/TermsPage'
import { WorkPage } from './pages/WorkPage'
import { HexaBillPage } from './pages/HexaBillPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin: standalone layout (no Navbar/Footer) */}
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/products/hexabill" element={<HexaBillPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
