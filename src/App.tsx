import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Products from '@/pages/Products';
import Contact from '@/pages/Contact';
import Pricing from '@/pages/Pricing';
import About from '@/pages/About';
import HexaBill from '@/pages/products/HexaBill';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import WebsiteCostKerala from '@/pages/blog/WebsiteCostKerala';
import RestaurantPOSCaseStudy from '@/pages/blog/RestaurantPOSCaseStudy';
import POSSoftwareRestaurantsKerala from '@/pages/blog/POSSoftwareRestaurantsKerala';
import VATCompliantBillingUAE from '@/pages/blog/VATCompliantBillingUAE';
import WebDevelopmentCompanyThrissur from '@/pages/blog/WebDevelopmentCompanyThrissur';
import MedicalLabSoftwareKerala from '@/pages/blog/MedicalLabSoftwareKerala';
import WhatsAppBusinessSetupKerala from '@/pages/blog/WhatsAppBusinessSetupKerala';
import AIIntegrationSmallBusinessKerala from '@/pages/blog/AIIntegrationSmallBusinessKerala';
import ChooseMobileAppDeveloperKerala from '@/pages/blog/ChooseMobileAppDeveloperKerala';
import NutriScanAIFoodRecognition from '@/pages/blog/NutriScanAIFoodRecognition';
import LocationServicePage from '@/pages/LocationServicePage';
import SEOLocationPage from '@/pages/seo/SEOLocationPage';
import KeralaHubPage from '@/pages/KeralaHubPage';
import GulfVatPage from '@/pages/GulfVatPage';
import UnitedStatesHubPage from '@/pages/UnitedStatesHubPage';
import Portfolio from '@/pages/Portfolio';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import { API_URL } from '@/lib/utils';

const Work = lazy(() => import('@/pages/Work'));
const Blog = lazy(() => import('@/pages/Blog'));
const Admin = lazy(() => import('@/pages/Admin'));
const Solutions = lazy(() => import('@/pages/Solutions'));

// Track page views
function PageTracker() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`${API_URL}/api/analytics/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: location.pathname }),
        }).catch(() => { });
    }, [location.pathname]);

    return null;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <PageTracker />
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-2 border-[var(--primary)] border-t-transparent" /></div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/blog" element={<Blog />} />
                <Route path="/blog/website-cost-kerala-2026" element={<WebsiteCostKerala />} />
                <Route path="/blog/restaurant-pos-uae-case-study" element={<RestaurantPOSCaseStudy />} />
                <Route path="/blog/pos-software-restaurants-kerala-2026" element={<POSSoftwareRestaurantsKerala />} />
                <Route path="/blog/vat-compliant-billing-software-uae" element={<VATCompliantBillingUAE />} />
                <Route path="/blog/vat-billing-software-uae-2026" element={<VATCompliantBillingUAE />} />
                <Route path="/blog/web-development-company-thrissur" element={<WebDevelopmentCompanyThrissur />} />
                <Route path="/blog/medical-lab-software-kerala" element={<MedicalLabSoftwareKerala />} />
                <Route path="/blog/medical-lab-software-kerala-2026" element={<MedicalLabSoftwareKerala />} />
                <Route path="/blog/whatsapp-business-setup-kerala-2026" element={<WhatsAppBusinessSetupKerala />} />
                <Route path="/blog/ai-integration-small-business-kerala" element={<AIIntegrationSmallBusinessKerala />} />
                <Route path="/blog/choose-mobile-app-developer-kerala" element={<ChooseMobileAppDeveloperKerala />} />
                <Route path="/blog/nutriscan-ai-food-recognition-app" element={<NutriScanAIFoodRecognition />} />
                <Route path="/about" element={<About />} />
                <Route path="/products/hexabill" element={<HexaBill />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/kerala" element={<KeralaHubPage />} />
                <Route path="/united-states" element={<UnitedStatesHubPage />} />
                <Route path="/gulf-vat" element={<GulfVatPage />} />
                <Route path="/seo/:locationSlug/:serviceSlug" element={<LocationServicePage />} />
                <Route path="/services/:seoSlug" element={<SEOLocationPage />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </Suspense>
            </Router>
        </AuthProvider>
    );
}

export default App;
