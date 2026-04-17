import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '@/lib/utils';
import SEO from '@/components/SEO';
import {
    Trash2, Mail, Phone, Clock, ArrowLeft, RefreshCw, Lock, LogOut, Shield,
    FolderOpen, Settings, Bell, Plus, Edit2, Save, X, ExternalLink,
    MessageCircle, AlertCircle, CheckCircle, ImagePlus, BarChart3, Eye, Users, TrendingUp, Zap, Package,
    Globe, Link2
} from 'lucide-react';

const ADMIN_SESSION_KEY = 'hexastack_admin_auth';
const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_SESSION_TIME_KEY = 'hexastack_admin_time';
const BACKLINKS_CHECKLIST_KEY = 'hexastack_backlinks_checklist';

/** Headers for admin API calls (includes Bearer token when logged in). */
function getAdminAuthHeaders(json = true): Record<string, string> {
    const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(ADMIN_TOKEN_KEY) : null;
    const h: Record<string, string> = {};
    if (json) h['Content-Type'] = 'application/json';
    if (token) h['Authorization'] = `Bearer ${token}`;
    return h;
}

const STATIC_BACKLINK_SITES = [
    { id: 'justdial', name: 'JustDial', url: 'https://www.justdial.com/', da: 'DA 70+' },
    { id: 'sulekha', name: 'Sulekha', url: 'https://www.sulekha.com/', da: 'DA 85+' },
    { id: 'clutch', name: 'Clutch', url: 'https://clutch.co/', da: 'DA 90+' },
    { id: 'indiamart', name: 'IndiaMART', url: 'https://www.indiamart.com/', da: 'DA 80+' },
    { id: 'goodfirms', name: 'GoodFirms', url: 'https://www.goodfirms.co/', da: 'DA 75+' },
    { id: 'trustpilot', name: 'Trustpilot', url: 'https://www.trustpilot.com/', da: 'DA 92+' },
    { id: 'glassdoor', name: 'Glassdoor', url: 'https://www.glassdoor.co.in/', da: 'DA 90+' },
    { id: 'linkedin', name: 'LinkedIn Company', url: 'https://www.linkedin.com/company/', da: 'DA 98' },
];

interface Enquiry {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    requirement: string;
    isRead: boolean;
    createdAt: string;
}

interface PortfolioProject {
    id: string;
    title: string;
    description: string;
    techStack: string | null;
    projectUrl: string | null;
    featured: boolean;
    displayOrder: number;
    media: { id: string; type: string; url: string }[];
}

interface CompanySettings {
    id?: string;
    companyName: string;
    logoUrl?: string | null;
    heroDesktopImageUrl?: string | null;
    heroMobileImageUrl?: string | null;
    primaryEmail: string;
    supportEmail: string;
    primaryWhatsApp: string;
    secondaryWhatsApp: string;
    leadName1: string;
    leadEmail1: string;
    leadWhatsApp1: string;
    leadName2: string;
    leadEmail2: string;
    leadWhatsApp2: string;
    address: string;
    tagline: string;
    description: string;
}

const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
    companyName: 'HexaStack Solutions',
    logoUrl: '',
    heroDesktopImageUrl: '',
    heroMobileImageUrl: '',
    primaryEmail: 'hexastacksolutions@gmail.com',
    supportEmail: 'supporthexastack@hexastacksolutions.com',
    primaryWhatsApp: '+917591999365',
    secondaryWhatsApp: '+917012714150',
    leadName1: 'Anandu Krishna',
    leadEmail1: 'hexastacksolutions@gmail.com',
    leadWhatsApp1: '+917591999365',
    leadName2: 'Surag',
    leadEmail2: 'officialsurag@gmail.com',
    leadWhatsApp2: '+917012714150',
    address: 'Vadanappally, Thrissur, Kerala 680614, India',
    tagline: 'Building Digital Excellence',
    description: 'We create innovative web applications, mobile solutions, and AI-powered tools that transform your business ideas into reality.',
};

interface Service {
    id: string;
    name: string;
    description?: string;
    icon: string;
    link: string | null;
    isComingSoon: boolean;
    displayOrder: number;
}

interface Product {
    id: string;
    name: string;
    link: string | null;
    description: string;
    features: string[];
    category?: string | null; // "business" | "free"
    isComingSoon: boolean;
    displayOrder: number;
}

type TabType = 'enquiries' | 'projects' | 'settings' | 'analytics' | 'services' | 'products' | 'seo' | 'backlinks';

interface SeoLocationPageEntry {
    id: string;
    location: string;
    locationSlug: string;
    service: string;
    serviceSlug: string;
    title: string;
    description: string;
    h1: string;
    region?: string | null;
}

interface BacklinkEntry {
    id: string;
    sourceUrl: string;
    targetUrl: string | null;
    sourceSite: string | null;
    linkType: string | null;
    daDr: string | null;
    notes: string | null;
    status: string | null;
}

interface AnalyticsStats {
    today: { totalViews: number; homeViews: number; workViews: number; contactViews: number; formSubmissions: number };
    last30Days: { totalViews: number; homeViews: number; workViews: number; contactViews: number; formSubmissions: number };
    totalEnquiries: number;
    unreadEnquiries: number;
    recentViews: { page: string; referrer: string | null; createdAt: string }[];
}

export default function Admin() {
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    // Tab state
    const [activeTab, setActiveTab] = useState<TabType>('analytics');

    // Enquiries state
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [replyText, setReplyText] = useState('');
    const [sendingReply, setSendingReply] = useState(false);

    // Projects state
    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        techStack: '',
        projectUrl: '',
        featured: false,
        imageUrl: '', // New field for image
    });
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Settings state
    const [settings, setSettings] = useState<CompanySettings | null>(null);
    const [editingSettings, setEditingSettings] = useState(false);
    const [settingsForm, setSettingsForm] = useState<CompanySettings>({ ...DEFAULT_COMPANY_SETTINGS });

    // Loading states
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);

    // Analytics state
    const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);

    // Services state
    const [services, setServices] = useState<Service[]>([]);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [serviceForm, setServiceForm] = useState({
        name: '',
        description: '',
        link: '',
        icon: '',
        isComingSoon: false,
        displayOrder: 0
    });

    // Products state
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showProductForm, setShowProductForm] = useState(false);
    const [productForm, setProductForm] = useState({
        name: '',
        link: '',
        description: '',
        features: '', // as a string for the form
        category: '' as '' | 'business' | 'free',
        isComingSoon: false,
        displayOrder: 0
    });

    // SEO Pages state
    const [seoPages, setSeoPages] = useState<SeoLocationPageEntry[]>([]);
    const [seoLoading, setSeoLoading] = useState(false);
    const [editingSeo, setEditingSeo] = useState<SeoLocationPageEntry | null>(null);
    const [showSeoForm, setShowSeoForm] = useState(false);
    const [seoForm, setSeoForm] = useState({
        location: '', locationSlug: '', service: '', serviceSlug: '', title: '', description: '', h1: '', region: ''
    });

    // Backlinks state
    const [backlinks, setBacklinks] = useState<BacklinkEntry[]>([]);
    const [backlinksLoading, setBacklinksLoading] = useState(false);
    const [backlinksChecklistVersion, setBacklinksChecklistVersion] = useState(0);
    const [editingBacklink, setEditingBacklink] = useState<BacklinkEntry | null>(null);
    const [showBacklinkForm, setShowBacklinkForm] = useState(false);
    const [backlinkForm, setBacklinkForm] = useState({
        sourceUrl: '', targetUrl: '', sourceSite: '', linkType: '', daDr: '', notes: '', status: 'active'
    });

    // Notifications
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // Service handlers
    const fetchServices = async () => {
        try {
            const response = await fetch(`${API_URL}/api/services`, { headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
        }
    };

    const saveService = async () => {
        if (!serviceForm.name || !serviceForm.icon) {
            showNotification('error', 'Name and icon required');
            return;
        }

        setSaving(true);
        try {
            const url = editingService
                ? `${API_URL}/api/services/${editingService.id}`
                : `${API_URL}/api/services`;

            const response = await fetch(url, {
                method: editingService ? 'PUT' : 'POST',
                headers: getAdminAuthHeaders(),
                body: JSON.stringify(serviceForm),
            });

            if (response.ok) {
                await fetchServices();
                setShowServiceForm(false);
                setEditingService(null);
                setServiceForm({ name: '', description: '', link: '', icon: '', isComingSoon: false, displayOrder: 0 });
                showNotification('success', editingService ? 'Service updated' : 'Service created');
            }
        } catch (error) {
            showNotification('error', 'Failed to save service');
        } finally {
            setSaving(false);
        }
    };

    const deleteService = async (id: string) => {
        if (!window.confirm('Delete this service?')) return;
        setDeleting(id);
        try {
            const response = await fetch(`${API_URL}/api/services/${id}`, { method: 'DELETE', headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                setServices(services.filter(s => s.id !== id));
                showNotification('success', 'Service deleted');
            }
        } catch (error) {
            showNotification('error', 'Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    const editService = (service: Service) => {
        setEditingService(service);
        setServiceForm({
            name: service.name,
            description: service.description || '',
            link: service.link || '',
            icon: service.icon,
            isComingSoon: service.isComingSoon,
            displayOrder: service.displayOrder
        });
        setShowServiceForm(true);
    };

    const handleServiceIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                headers: getAdminAuthHeaders(false),
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setServiceForm({ ...serviceForm, icon: data.url });
                showNotification('success', 'Icon uploaded');
            }
        } catch (error) {
            showNotification('error', 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    // Product handlers
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/products`, { headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const saveProduct = async () => {
        if (!productForm.name || !productForm.description) {
            showNotification('error', 'Name and description required');
            return;
        }

        setSaving(true);
        try {
            const url = editingProduct
                ? `${API_URL}/api/products/${editingProduct.id}`
                : `${API_URL}/api/products`;

            const featuresArray = productForm.features
                .split('\n')
                .map(f => f.trim())
                .filter(f => f !== '');

            const response = await fetch(url, {
                method: editingProduct ? 'PUT' : 'POST',
                headers: getAdminAuthHeaders(),
                body: JSON.stringify({
                    ...productForm,
                    features: featuresArray,
                    category: productForm.category === 'business' || productForm.category === 'free' ? productForm.category : null
                }),
            });

            if (response.ok) {
                await fetchProducts();
                setShowProductForm(false);
                setEditingProduct(null);
                setProductForm({ name: '', link: '', description: '', features: '', category: '', isComingSoon: false, displayOrder: 0 });
                showNotification('success', editingProduct ? 'Product updated' : 'Product created');
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Save product failed:', errorData);
                showNotification('error', errorData.error || errorData.message || 'Failed to save product');
            }
        } catch (error) {
            console.error('Failed to save product:', error);
            showNotification('error', 'Network error or server unavailable');
        } finally {
            setSaving(false);
        }
    };

    const deleteProduct = async (id: string) => {
        if (!window.confirm('Delete this product?')) return;
        setDeleting(id);
        try {
            const response = await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE', headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                setProducts(products.filter(p => p.id !== id));
                showNotification('success', 'Product deleted');
            }
        } catch (error) {
            showNotification('error', 'Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    const editProduct = (product: Product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            link: product.link || '',
            description: product.description,
            features: product.features.join('\n'),
            category: product.category === 'business' || product.category === 'free' ? product.category : '',
            isComingSoon: product.isComingSoon,
            displayOrder: product.displayOrder
        });
        setShowProductForm(true);
    };

    const fetchSeoPages = async () => {
        try {
            setSeoLoading(true);
            const res = await fetch(`${API_URL}/api/seo-pages`, { headers: getAdminAuthHeaders(false) });
            if (res.ok) setSeoPages(await res.json());
        } catch (e) {
            console.error('Fetch SEO pages:', e);
        } finally {
            setSeoLoading(false);
        }
    };

    const saveSeoPage = async () => {
        const { location, locationSlug, service, serviceSlug, title, description, h1, region } = seoForm;
        if (!location || !locationSlug || !service || !serviceSlug || !title || !description || !h1) {
            showNotification('error', 'Location, location slug, service, service slug, title, description, and H1 are required');
            return;
        }
        setSaving(true);
        try {
            const url = editingSeo ? `${API_URL}/api/seo-pages/${editingSeo.id}` : `${API_URL}/api/seo-pages`;
            const res = await fetch(url, {
                method: editingSeo ? 'PATCH' : 'POST',
                headers: getAdminAuthHeaders(),
                body: JSON.stringify({ location, locationSlug, service, serviceSlug, title, description, h1, region: region || null })
            });
            if (res.ok) {
                await fetchSeoPages();
                setShowSeoForm(false);
                setEditingSeo(null);
                setSeoForm({ location: '', locationSlug: '', service: '', serviceSlug: '', title: '', description: '', h1: '', region: '' });
                showNotification('success', editingSeo ? 'SEO page updated' : 'SEO page created');
            } else {
                const err = await res.json().catch(() => ({}));
                showNotification('error', err.error || 'Failed to save');
            }
        } catch (e) {
            showNotification('error', 'Network error');
        } finally {
            setSaving(false);
        }
    };

    const deleteSeoPage = async (id: string) => {
        if (!window.confirm('Delete this SEO page?')) return;
        setDeleting(id);
        try {
            const res = await fetch(`${API_URL}/api/seo-pages/${id}`, { method: 'DELETE', headers: getAdminAuthHeaders(false) });
            if (res.ok) {
                setSeoPages(seoPages.filter(p => p.id !== id));
                showNotification('success', 'Deleted');
            } else showNotification('error', 'Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    const fetchBacklinks = async () => {
        try {
            setBacklinksLoading(true);
            const res = await fetch(`${API_URL}/api/backlinks`, { headers: getAdminAuthHeaders(false) });
            if (res.ok) setBacklinks(await res.json());
        } catch (e) {
            console.error('Fetch backlinks:', e);
        } finally {
            setBacklinksLoading(false);
        }
    };

    const saveBacklink = async () => {
        if (!backlinkForm.sourceUrl.trim()) {
            showNotification('error', 'Source URL is required');
            return;
        }
        setSaving(true);
        try {
            const url = editingBacklink ? `${API_URL}/api/backlinks/${editingBacklink.id}` : `${API_URL}/api/backlinks`;
            const res = await fetch(url, {
                method: editingBacklink ? 'PATCH' : 'POST',
                headers: getAdminAuthHeaders(),
                body: JSON.stringify(backlinkForm)
            });
            if (res.ok) {
                await fetchBacklinks();
                setShowBacklinkForm(false);
                setEditingBacklink(null);
                setBacklinkForm({ sourceUrl: '', targetUrl: '', sourceSite: '', linkType: '', daDr: '', notes: '', status: 'active' });
                showNotification('success', editingBacklink ? 'Backlink updated' : 'Backlink added');
            } else {
                const err = await res.json().catch(() => ({}));
                showNotification('error', err.error || 'Failed to save');
            }
        } catch (e) {
            showNotification('error', 'Network error');
        } finally {
            setSaving(false);
        }
    };

    const deleteBacklink = async (id: string) => {
        if (!window.confirm('Remove this backlink?')) return;
        setDeleting(id);
        try {
            const res = await fetch(`${API_URL}/api/backlinks/${id}`, { method: 'DELETE', headers: getAdminAuthHeaders(false) });
            if (res.ok) {
                setBacklinks(backlinks.filter(b => b.id !== id));
                showNotification('success', 'Removed');
            } else showNotification('error', 'Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    // Check auth on mount (token from /api/admin/login)
    useEffect(() => {
        const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
        const sessionTime = sessionStorage.getItem(ADMIN_SESSION_TIME_KEY);

        if (token && sessionTime) {
            const elapsed = Date.now() - parseInt(sessionTime);
            if (elapsed < 4 * 60 * 60 * 1000) {
                setIsAuthenticated(true);
            } else {
                sessionStorage.removeItem(ADMIN_TOKEN_KEY);
                sessionStorage.removeItem(ADMIN_SESSION_KEY);
                sessionStorage.removeItem(ADMIN_SESSION_TIME_KEY);
            }
        }

        const lockTime = localStorage.getItem('hexastack_lock_time');
        if (lockTime) {
            const elapsed = Date.now() - parseInt(lockTime);
            if (elapsed < 15 * 60 * 1000) {
                setIsLocked(true);
            } else {
                localStorage.removeItem('hexastack_lock_time');
                localStorage.removeItem('hexastack_attempts');
            }
        }

        const attempts = localStorage.getItem('hexastack_attempts');
        if (attempts) setLoginAttempts(parseInt(attempts));
    }, []);

    // Fetch data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchEnquiries();
            fetchProjects();
            fetchSettings();
            fetchAnalytics();
            fetchServices();
            fetchProducts();
            fetchSeoPages();
            fetchBacklinks();
        }
    }, [isAuthenticated]);

    // Fetch SEO pages / Backlinks when tab is active
    useEffect(() => {
        if (isAuthenticated && activeTab === 'seo') fetchSeoPages();
        if (isAuthenticated && activeTab === 'backlinks') fetchBacklinks();
    }, [isAuthenticated, activeTab]);

    // Show notification
    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    // Auth handlers (API login)
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLocked) return;

        try {
            const res = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok && data.token) {
                sessionStorage.setItem(ADMIN_TOKEN_KEY, data.token);
                sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
                sessionStorage.setItem(ADMIN_SESSION_TIME_KEY, Date.now().toString());
                localStorage.removeItem('hexastack_attempts');
                localStorage.removeItem('hexastack_lock_time');
                setLoginError('');
                setLoginAttempts(0);
                setIsAuthenticated(true);
                if (typeof window !== 'undefined' && window.history.replaceState) {
                    window.history.replaceState(null, '', '/admin');
                }
            } else {
                const newAttempts = loginAttempts + 1;
                setLoginAttempts(newAttempts);
                localStorage.setItem('hexastack_attempts', newAttempts.toString());

                if (newAttempts >= 5) {
                    setIsLocked(true);
                    localStorage.setItem('hexastack_lock_time', Date.now().toString());
                    setLoginError('Too many failed attempts. Locked for 15 minutes.');
                } else {
                    if (res.status === 404) {
                        setLoginError('Login API not found. Add API route and set ADMIN_PASSWORD, JWT_SECRET in Vercel → Settings → Environment Variables, then redeploy.');
                    } else if (res.status === 503 && data.error) {
                        setLoginError(data.error);
                    } else if (res.status === 500) {
                        setLoginError(data.error || 'Server error. Set ADMIN_PASSWORD and JWT_SECRET in Vercel → Settings → Environment Variables (Production), then redeploy. Verify: ' + (typeof window !== 'undefined' ? window.location.origin : API_URL || '') + '/api/admin/status');
                    } else {
                        setLoginError(data.error || `Invalid password. ${5 - newAttempts} attempts remaining.`);
                    }
                }
            }
        } catch {
            setLoginError('Connection error. Check your network and that the site API is reachable.');
        }
        setPassword('');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        sessionStorage.removeItem(ADMIN_SESSION_TIME_KEY);
    };

    // Analytics handlers
    const defaultAnalytics = (): AnalyticsStats => ({
        today: { totalViews: 0, homeViews: 0, workViews: 0, contactViews: 0, formSubmissions: 0 },
        last30Days: { totalViews: 0, homeViews: 0, workViews: 0, contactViews: 0, formSubmissions: 0 },
        totalEnquiries: 0,
        unreadEnquiries: 0,
        recentViews: [],
    });
    const fetchAnalytics = async () => {
        try {
            setAnalyticsLoading(true);
            const response = await fetch(`${API_URL}/api/analytics/stats`, { headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                const data = await response.json();
                setAnalytics({
                    today: data.today ?? defaultAnalytics().today,
                    last30Days: data.last30Days ?? defaultAnalytics().last30Days,
                    totalEnquiries: data.totalEnquiries ?? 0,
                    unreadEnquiries: data.unreadEnquiries ?? 0,
                    recentViews: Array.isArray(data.recentViews) ? data.recentViews : [],
                });
            } else {
                setAnalytics(defaultAnalytics());
            }
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
            setAnalytics(defaultAnalytics());
        } finally {
            setAnalyticsLoading(false);
        }
    };

    // Enquiry handlers
    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/contact`, { headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                const data = await response.json();
                setEnquiries(data);
            }
        } catch (error) {
            console.error('Failed to fetch enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/api/contact/${id}`, {
                method: 'PATCH',
                headers: getAdminAuthHeaders(),
                body: JSON.stringify({ isRead: true }),
            });
            if (res.ok) setEnquiries(enquiries.map(e => e.id === id ? { ...e, isRead: true } : e));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const deleteEnquiry = async (id: string) => {
        if (!window.confirm('Delete this enquiry?')) return;
        setDeleting(id);
        try {
            const response = await fetch(`${API_URL}/api/contact/${id}`, { method: 'DELETE', headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                setEnquiries(enquiries.filter(e => e.id !== id));
                if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
                showNotification('success', 'Enquiry deleted');
            }
        } catch (error) {
            showNotification('error', 'Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    const sendReply = async () => {
        if (!selectedEnquiry || !replyText.trim()) return;
        if (replyText.trim().length < 10) {
            showNotification('error', 'Reply too short (min 10 characters)');
            return;
        }
        try {
            setSendingReply(true);
            const response = await fetch(`${API_URL}/api/contact/${selectedEnquiry.id}/reply`, {
                method: 'POST',
                headers: getAdminAuthHeaders(),
                body: JSON.stringify({ replyMessage: replyText }),
            });
            const data = await response.json();
            if (response.ok) {
                showNotification('success', data.message || 'Reply sent!');
                setReplyText('');
                setEnquiries(enquiries.map(e => e.id === selectedEnquiry.id ? { ...e, isRead: true } : e));
                setSelectedEnquiry({ ...selectedEnquiry, isRead: true });
                await fetchEnquiries();
            } else {
                showNotification('error', data.message || 'Failed to send reply');
            }
        } catch (error) {
            showNotification('error', 'Failed to send reply');
        } finally {
            setSendingReply(false);
        }
    };

    // Project handlers
    const fetchProjects = async () => {
        try {
            const response = await fetch(`${API_URL}/api/portfolio`, { headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const saveProject = async () => {
        if (!projectForm.title || !projectForm.description) {
            showNotification('error', 'Title and description required');
            return;
        }

        setSaving(true);
        try {
            const url = editingProject
                ? `${API_URL}/api/portfolio/${editingProject.id}`
                : `${API_URL}/api/portfolio`;

            const response = await fetch(url, {
                method: editingProject ? 'PATCH' : 'POST',
                headers: getAdminAuthHeaders(),
                body: JSON.stringify(projectForm),
            });

            if (response.ok) {
                await fetchProjects();
                setShowProjectForm(false);
                setEditingProject(null);
                setProjectForm({ title: '', description: '', techStack: '', projectUrl: '', featured: false, imageUrl: '' });
                showNotification('success', editingProject ? 'Project updated' : 'Project created');
            }
        } catch (error) {
            showNotification('error', 'Failed to save project');
        } finally {
            setSaving(false);
        }
    };

    const deleteProject = async (id: string) => {
        if (!window.confirm('Delete this project?')) return;
        setDeleting(id);
        try {
            const response = await fetch(`${API_URL}/api/portfolio/${id}`, { method: 'DELETE', headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                setProjects(projects.filter(p => p.id !== id));
                showNotification('success', 'Project deleted');
            }
        } catch (error) {
            showNotification('error', 'Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    const editProject = (project: PortfolioProject) => {
        setEditingProject(project);
        setProjectForm({
            title: project.title,
            description: project.description,
            techStack: project.techStack || '',
            projectUrl: project.projectUrl || '',
            featured: project.featured,
            imageUrl: project.media?.[0]?.url || '',
        });
        setShowProjectForm(true);
    };

    // Image upload handler
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showNotification('error', 'Image too large (max 5MB)');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                headers: getAdminAuthHeaders(false),
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProjectForm({ ...projectForm, imageUrl: data.url });
                showNotification('success', 'Image uploaded');
            } else {
                showNotification('error', 'Upload failed');
            }
        } catch (error) {
            showNotification('error', 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    // Settings handlers
    const fetchSettings = async () => {
        try {
            const response = await fetch(`${API_URL}/api/settings`, { headers: getAdminAuthHeaders(false) });
            if (response.ok) {
                const data = await response.json();
                const hasSaved = data && (data.id ?? data.companyName);
                setSettings(hasSaved ? data : null);
                setSettingsForm((prev) => ({ ...DEFAULT_COMPANY_SETTINGS, ...prev, ...data }));
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        }
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            const response = await fetch(`${API_URL}/api/settings`, {
                method: 'PATCH',
                headers: getAdminAuthHeaders(),
                body: JSON.stringify(settingsForm),
            });

            if (response.ok) {
                const data = await response.json();
                setSettings(data);
                setEditingSettings(false);
                showNotification('success', 'Settings saved');
            }
        } catch (error) {
            showNotification('error', 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const unreadCount = enquiries.filter(e => !e.isRead).length;

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div
                className="min-h-screen font-sans flex items-center justify-center px-4 py-8 sm:px-6"
                style={{
                    background:
                        'radial-gradient(circle at 12% 10%, rgba(37,99,235,0.14), transparent 28%), radial-gradient(circle at 88% 18%, rgba(14,165,233,0.1), transparent 22%), linear-gradient(180deg, #f8fbff 0%, #ffffff 24%)',
                }}
            >
                <SEO title="Admin Login | HexaStack" description="Secure admin access" noindex />
                <div className="w-full max-w-md">
                    <div className="surface-panel rounded-[32px] border border-slate-200 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-8">
                        <div className="text-center mb-8">
                            <img src="/logo-brand.png" alt="HexaStack Solutions" className="mx-auto mb-5 h-12 w-auto" />
                            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-semibold text-slate-900">Admin Access</h1>
                            <p className="text-sm text-slate-500 mt-1">Secure entry for the HexaStack admin console</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLocked}
                                        className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 disabled:bg-slate-100"
                                        placeholder="Enter password"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {loginError && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                    {loginError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLocked || !password}
                                className="w-full rounded-full bg-slate-900 px-4 py-3.5 font-medium text-white transition-opacity hover:bg-slate-800 disabled:opacity-50"
                            >
                                {isLocked ? 'Locked' : 'Access Admin'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-700">Back to website</Link>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-center mb-3">Founders</p>
                            <div className="flex justify-center gap-6">
                                <div className="flex flex-col items-center gap-1.5">
                                    <img
                                        src="https://media.licdn.com/dms/image/v2/D5603AQEiWUz1x8TqFA/profile-displayphoto-scale_400_400/B56ZnwzFGVJ4Ag-/0/1760681546981?e=1775088000&v=beta&t=7G-CHY_T7SR7QByvAS1uJFiPGt1W_Xfgx2iOc1ASj7s"
                                        alt="Anandu"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Anandu</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <img
                                        src="https://media.licdn.com/dms/image/v2/D5603AQH8pB2vlL3GeA/profile-displayphoto-scale_400_400/B56Zwxt2X8K4Ag-/0/1770360629769?e=1775088000&v=beta&t=TSADhSp0jRbM2Gu5BKIBdgES-cMj8DAiEAczRGWV-rs"
                                        alt="Surag"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Surag</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7fbff] font-sans text-slate-900">
            <SEO title="Admin Dashboard | HexaStack" description="Manage your website" noindex />
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {notification.message}
                </div>
            )}

            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <Link
                                to="/"
                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Admin workspace</p>
                                <h1 className="mt-1 text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
                                <p className="text-sm text-slate-500">Manage your website</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <a
                                href="https://search.google.com/search-console?resource_id=https%3A%2F%2Fwww.hexastacksolutions.com%2F"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                            >
                                <Globe className="w-4 h-4" />
                                Search Console
                                <ExternalLink className="w-3 h-3 opacity-70" />
                            </a>
                            {unreadCount > 0 && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-2 text-sm text-orange-600">
                                    <Bell className="w-4 h-4" />
                                    {unreadCount} new
                                </span>
                            )}
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {[
                            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                            { id: 'enquiries', label: 'Enquiries', icon: Mail, count: unreadCount },
                            { id: 'projects', label: 'Projects', icon: FolderOpen },
                            { id: 'services', label: 'Services', icon: Zap },
                            { id: 'products', label: 'Products', icon: Package },
                            { id: 'seo', label: 'SEO Pages', icon: Globe },
                            { id: 'backlinks', label: 'Backlinks', icon: Link2 },
                            { id: 'settings', label: 'Settings', icon: Settings },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                                {tab.count ? (
                                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{tab.count}</span>
                                ) : null}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* ANALYTICS TAB */}
                {activeTab === 'analytics' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Analytics</h2>
                            <button onClick={fetchAnalytics} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                <RefreshCw className={`w-4 h-4 ${analyticsLoading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>

                        {analyticsLoading && !analytics ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4" />
                                <p className="text-slate-500">Loading analytics...</p>
                            </div>
                        ) : analytics ? (
                            <div className="space-y-6">
                                {/* Today's Stats */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                                    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Eye className="w-5 h-5 text-blue-600" />
                                            <span className="text-sm text-slate-500">Today Views</span>
                                        </div>
                                        <p className="text-3xl font-bold text-slate-900">{analytics.today.totalViews}</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Users className="w-5 h-5 text-emerald-600" />
                                            <span className="text-sm text-slate-500">Form Submissions</span>
                                        </div>
                                        <p className="text-3xl font-bold text-slate-900">{analytics.today.formSubmissions}</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Mail className="w-5 h-5 text-orange-600" />
                                            <span className="text-sm text-slate-500">Total Enquiries</span>
                                        </div>
                                        <p className="text-3xl font-bold text-slate-900">{analytics.totalEnquiries}</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Bell className="w-5 h-5 text-red-600" />
                                            <span className="text-sm text-slate-500">Unread</span>
                                        </div>
                                        <p className="text-3xl font-bold text-slate-900">{analytics.unreadEnquiries}</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-5 h-5 text-purple-600" />
                                            <span className="text-sm text-slate-500">30-Day Views</span>
                                        </div>
                                        <p className="text-3xl font-bold text-slate-900">{analytics.last30Days.totalViews}</p>
                                    </div>
                                </div>

                                {/* Page Breakdown */}
                                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Page Views (Last 30 Days)</h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                                            <p className="text-2xl font-bold text-slate-900">{analytics.last30Days.homeViews}</p>
                                            <p className="text-sm text-slate-500">Home Page</p>
                                        </div>
                                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                                            <p className="text-2xl font-bold text-slate-900">{analytics.last30Days.workViews}</p>
                                            <p className="text-sm text-slate-500">Work Page</p>
                                        </div>
                                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                                            <p className="text-2xl font-bold text-slate-900">{analytics.last30Days.contactViews}</p>
                                            <p className="text-sm text-slate-500">Contact Page</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Conversion Rate */}
                                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Conversion Metrics</h3>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <p className="text-sm text-slate-500 mb-1">Contact Page → Form Submit (30 days)</p>
                                            <p className="text-2xl font-bold text-emerald-600">
                                                {analytics.last30Days.contactViews > 0
                                                    ? Math.round((analytics.last30Days.formSubmissions / analytics.last30Days.contactViews) * 100)
                                                    : 0}%
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 mb-1">Total Submissions (30 days)</p>
                                            <p className="text-2xl font-bold text-blue-600">{analytics.last30Days.formSubmissions}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Visits</h3>
                                    {analytics.recentViews.length > 0 ? (
                                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                            {analytics.recentViews.map((view, idx) => (
                                                <div key={idx} className="flex flex-col gap-2 rounded bg-slate-50 px-3 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`w-2 h-2 rounded-full ${view.page === '/' ? 'bg-blue-500' :
                                                            view.page === '/work' ? 'bg-emerald-500' :
                                                                view.page === '/contact' ? 'bg-orange-500' : 'bg-slate-400'
                                                            }`} />
                                                        <span className="font-medium text-slate-700">
                                                            {view.page === '/' ? 'Home' : view.page.replace('/', '').charAt(0).toUpperCase() + view.page.slice(2)}
                                                        </span>
                                                    </div>
                                                    <span className="text-slate-400 text-xs">
                                                        {new Date(view.createdAt).toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 text-center py-4">No recent visits tracked yet</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-700 mb-2">No analytics data yet</h3>
                                <p className="text-slate-500">Visitor tracking will begin once deployed.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ENQUIRIES TAB */}
                {activeTab === 'enquiries' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Enquiries</h2>
                            <button onClick={fetchEnquiries} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>

                        {loading && enquiries.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4" />
                                <p className="text-slate-500">Loading...</p>
                            </div>
                        ) : enquiries.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-700 mb-2">No enquiries yet</h3>
                                <p className="text-slate-500">New enquiries will appear here.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
                                <div className="space-y-2 max-h-[420px] overflow-y-auto xl:max-h-[600px]">
                                    {enquiries.map((enquiry) => (
                                        <div
                                            key={enquiry.id}
                                            onClick={() => { setSelectedEnquiry(enquiry); if (!enquiry.isRead) markAsRead(enquiry.id); }}
                                            className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedEnquiry?.id === enquiry.id
                                                ? 'bg-slate-900 text-white border-slate-900'
                                                : enquiry.isRead
                                                    ? 'bg-white border-slate-200 hover:border-slate-300'
                                                    : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className={`font-medium truncate ${selectedEnquiry?.id === enquiry.id ? 'text-white' : 'text-slate-900'}`}>
                                                    {enquiry.name}
                                                </h3>
                                                {!enquiry.isRead && selectedEnquiry?.id !== enquiry.id && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                                )}
                                            </div>
                                            <p className={`text-sm truncate mb-2 ${selectedEnquiry?.id === enquiry.id ? 'text-slate-300' : 'text-slate-500'}`}>
                                                {enquiry.requirement}
                                            </p>
                                            <p className={`text-xs ${selectedEnquiry?.id === enquiry.id ? 'text-slate-400' : 'text-slate-400'}`}>
                                                {formatDate(enquiry.createdAt)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="min-w-0">
                                    {selectedEnquiry ? (
                                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h2 className="text-xl font-semibold text-slate-900 mb-1">{selectedEnquiry.name}</h2>
                                                    <div className="flex items-center gap-1 text-sm text-slate-500">
                                                        <Clock className="w-4 h-4" />
                                                        {formatDate(selectedEnquiry.createdAt)}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => deleteEnquiry(selectedEnquiry.id)}
                                                    disabled={deleting === selectedEnquiry.id}
                                                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    {deleting === selectedEnquiry.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex items-center gap-3">
                                                    <Mail className="w-4 h-4 text-slate-400" />
                                                    {selectedEnquiry.email ? (
                                                        <a href={`mailto:${selectedEnquiry.email}`} className="text-slate-700 hover:text-slate-900">
                                                            {selectedEnquiry.email}
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-500">No email</span>
                                                    )}
                                                </div>
                                                {selectedEnquiry.phone && (
                                                    <div className="flex items-center gap-3">
                                                        <Phone className="w-4 h-4 text-slate-400" />
                                                        <a href={`tel:${selectedEnquiry.phone}`} className="text-slate-700 hover:text-slate-900">
                                                            {selectedEnquiry.phone}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-8">
                                                <h3 className="text-sm font-medium text-slate-500 mb-3">Project Requirements</h3>
                                                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">{selectedEnquiry.requirement}</p>
                                            </div>

                                            {/* Reply Form */}
                                            <div className="mb-6">
                                                <h3 className="text-sm font-medium text-slate-500 mb-3">Send Reply</h3>
                                                {!selectedEnquiry.email && (
                                                    <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm mb-3">No email address — reply by phone or other channel.</p>
                                                )}
                                                <textarea
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Type your reply here... (min 10 characters)"
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 resize-none"
                                                    rows={4}
                                                    disabled={!selectedEnquiry.email}
                                                />
                                                <button
                                                    onClick={sendReply}
                                                    disabled={!selectedEnquiry.email || sendingReply || replyText.trim().length < 10}
                                                    className="mt-3 w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                    {sendingReply ? 'Sending...' : 'Send Reply via Email'}
                                                </button>
                                                <p className="text-xs text-slate-400 mt-2 text-center">Reply will be sent to {selectedEnquiry.email}</p>
                                            </div>

                                            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3 sm:flex-row">
                                                <a href={`mailto:${selectedEnquiry.email}`} className="flex-1 text-center bg-slate-900 text-white py-3 px-4 rounded-md hover:bg-slate-800 text-sm font-medium">
                                                    Reply via Email
                                                </a>
                                                {selectedEnquiry.phone && (
                                                    <a href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 text-sm font-medium">
                                                        <MessageCircle className="w-4 h-4 inline mr-2" />
                                                        WhatsApp
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                                            <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                            <p className="text-slate-500">Select an enquiry to view details</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={fetchProjects} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh
                                </button>
                                <button
                                    onClick={() => { setShowProjectForm(true); setEditingProject(null); setProjectForm({ title: '', description: '', techStack: '', projectUrl: '', featured: false, imageUrl: '' }); }}
                                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Project
                                </button>
                            </div>
                        </div>

                        {/* Project Form Modal */}
                        {showProjectForm && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowProjectForm(false)}>
                                <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {editingProject ? 'Edit Project' : 'Add New Project'}
                                        </h3>
                                        <button onClick={() => setShowProjectForm(false)} className="text-slate-400 hover:text-slate-600">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                                            <input
                                                type="text"
                                                value={projectForm.title}
                                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                placeholder="Project title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Tech Stack</label>
                                            <input
                                                type="text"
                                                value={projectForm.techStack}
                                                onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                placeholder="React, Node.js, MongoDB..."
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                                            <textarea
                                                value={projectForm.description}
                                                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                rows={2}
                                                placeholder="Project description"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Project URL</label>
                                            <input
                                                type="url"
                                                value={projectForm.projectUrl}
                                                onChange={(e) => setProjectForm({ ...projectForm, projectUrl: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="featured"
                                                    checked={projectForm.featured}
                                                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                                                    className="w-4 h-4"
                                                />
                                                <label htmlFor="featured" className="text-sm text-slate-700">Featured</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {projectForm.imageUrl ? (
                                                    <div className="relative w-12 h-12 rounded overflow-hidden border border-slate-200">
                                                        <img src={projectForm.imageUrl} alt="Project" className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => setProjectForm({ ...projectForm, imageUrl: '' })}
                                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="w-12 h-12 border-2 border-dashed border-slate-300 rounded flex items-center justify-center cursor-pointer hover:border-slate-400"
                                                    >
                                                        {uploading ? (
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600" />
                                                        ) : (
                                                            <ImagePlus className="w-5 h-5 text-slate-400" />
                                                        )}
                                                    </div>
                                                )}
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                <span className="text-xs text-slate-500">Image</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                                        <button
                                            onClick={() => setShowProjectForm(false)}
                                            className="flex-1 px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 text-sm font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={saveProject}
                                            disabled={saving}
                                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Projects List */}
                        {projects.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-700 mb-2">No projects yet</h3>
                                <p className="text-slate-500">Add your first project to showcase your work.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <div key={project.id} className="bg-white rounded-lg border border-slate-200 p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-slate-900">{project.title}</h3>
                                                {project.featured && (
                                                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Featured</span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => editProject(project)} className="text-slate-400 hover:text-slate-600">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteProject(project.id)}
                                                    disabled={deleting === project.id}
                                                    className="text-red-400 hover:text-red-600 disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
                                        {project.techStack && (
                                            <p className="text-xs text-slate-500 mb-4">{project.techStack}</p>
                                        )}
                                        {project.projectUrl && (
                                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
                                                <ExternalLink className="w-3 h-3" />
                                                View Project
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Company Settings</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={fetchSettings} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh
                                </button>
                                {!editingSettings ? (
                                    <button
                                        onClick={() => setEditingSettings(true)}
                                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => { setEditingSettings(false); setSettingsForm(settings || settingsForm); }}
                                            className="px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 text-sm font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={saveSettings}
                                            disabled={saving}
                                            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Current details (read-only summary) */}
                        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 mb-6">
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">Current details</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                                <div><span className="text-slate-500">Company</span><br /><span className="text-slate-900 font-medium">{settings?.companyName || settingsForm.companyName || '—'}</span></div>
                                <div><span className="text-slate-500">Primary email</span><br /><span className="text-slate-900">{settings?.primaryEmail || settingsForm.primaryEmail || '—'}</span></div>
                                <div><span className="text-slate-500">Support email</span><br /><span className="text-slate-900">{settings?.supportEmail || settingsForm.supportEmail || settingsForm.primaryEmail || '—'}</span></div>
                                <div><span className="text-slate-500">Primary WhatsApp</span><br /><span className="text-slate-900">{settings?.primaryWhatsApp || settingsForm.primaryWhatsApp || '—'}</span></div>
                                <div><span className="text-slate-500">Secondary WhatsApp</span><br /><span className="text-slate-900">{(settings?.secondaryWhatsApp ?? settingsForm.secondaryWhatsApp) || '—'}</span></div>
                                <div><span className="text-slate-500">Lead 1</span><br /><span className="text-slate-900">{[settings?.leadName1 || settingsForm.leadName1, (settings?.leadEmail1 || settingsForm.leadEmail1) && `(${settings?.leadEmail1 || settingsForm.leadEmail1})`].filter(Boolean).join(' ') || '—'}</span></div>
                                <div><span className="text-slate-500">Lead 2</span><br /><span className="text-slate-900">{[settings?.leadName2 || settingsForm.leadName2, (settings?.leadEmail2 || settingsForm.leadEmail2) && `(${settings?.leadEmail2 || settingsForm.leadEmail2})`].filter(Boolean).join(' ') || '—'}</span></div>
                                <div className="sm:col-span-2 lg:col-span-3"><span className="text-slate-500">Address</span><br /><span className="text-slate-900">{(settings?.address ?? settingsForm.address) || '—'}</span></div>
                                <div><span className="text-slate-500">Tagline</span><br /><span className="text-slate-900">{(settings?.tagline ?? settingsForm.tagline) || '—'}</span></div>
                                <div className="sm:col-span-2"><span className="text-slate-500">Description</span><br /><span className="text-slate-900 line-clamp-2">{(settings?.description ?? settingsForm.description) || '—'}</span></div>
                            </div>
                            {(settings?.logoUrl || settingsForm.logoUrl) && (
                                <div className="mt-3 pt-3 border-t border-slate-200">
                                    <span className="text-slate-500 text-sm">Logo</span>
                                    <div className="mt-1 w-16 h-16 rounded border border-slate-200 overflow-hidden bg-white">
                                        <img src={settings?.logoUrl || settingsForm.logoUrl || ''} alt="Current logo" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-8">
                            {/* Branding */}
                            <section>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Branding</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Brand Logo</label>
                                    <p className="text-xs text-slate-500 mb-2">Upload a logo (SVG/PNG/JPG). Used in header; fallback: site logo.</p>
                                    <div className="flex items-center gap-4">
                                        {settingsForm.logoUrl ? (
                                            <div className="relative w-24 h-24 rounded border border-slate-200 overflow-hidden bg-slate-50">
                                                <img src={settingsForm.logoUrl} alt="Brand logo" className="w-full h-full object-contain" />
                                                <button
                                                    type="button"
                                                    onClick={() => setSettingsForm({ ...settingsForm, logoUrl: '' })}
                                                    disabled={!editingSettings}
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-1 hover:bg-red-600 disabled:opacity-50"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : null}
                                        {editingSettings && (
                                            <div
                                                onClick={() => {
                                                    const input = document.createElement('input');
                                                    input.type = 'file';
                                                    input.accept = 'image/*';
                                                    input.onchange = async (e) => {
                                                        const file = (e.target as HTMLInputElement).files?.[0];
                                                        if (!file) return;
                                                        setUploading(true);
                                                        try {
                                                            const formData = new FormData();
                                                            formData.append('file', file);
                                                            const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: getAdminAuthHeaders(false), body: formData });
                                                            if (res.ok) {
                                                                const data = await res.json();
                                                                setSettingsForm({ ...settingsForm, logoUrl: data.url });
                                                                showNotification('success', 'Logo uploaded');
                                                            }
                                                        } catch {
                                                            showNotification('error', 'Upload failed');
                                                        } finally {
                                                            setUploading(false);
                                                        }
                                                    };
                                                    input.click();
                                                }}
                                                className="w-24 h-24 border-2 border-dashed border-slate-300 rounded flex items-center justify-center cursor-pointer hover:border-slate-400"
                                            >
                                                {uploading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600" /> : <ImagePlus className="w-8 h-8 text-slate-400" />}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Home hero — desktop image</label>
                                        <p className="text-xs text-slate-500 mb-2">Wide screenshot (e.g. HexaBill dashboard). Shown in the large frame on the home page.</p>
                                        <div className="flex items-start gap-3 flex-wrap">
                                            {settingsForm.heroDesktopImageUrl ? (
                                                <div className="relative w-full max-w-xs aspect-video rounded border border-slate-200 overflow-hidden bg-slate-50">
                                                    <img src={settingsForm.heroDesktopImageUrl} alt="Hero desktop" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setSettingsForm({ ...settingsForm, heroDesktopImageUrl: '' })}
                                                        disabled={!editingSettings}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-1 hover:bg-red-600 disabled:opacity-50"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : null}
                                            {editingSettings && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const input = document.createElement('input');
                                                        input.type = 'file';
                                                        input.accept = 'image/*';
                                                        input.onchange = async (e) => {
                                                            const file = (e.target as HTMLInputElement).files?.[0];
                                                            if (!file) return;
                                                            setUploading(true);
                                                            try {
                                                                const formData = new FormData();
                                                                formData.append('file', file);
                                                                const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: getAdminAuthHeaders(false), body: formData });
                                                                if (res.ok) {
                                                                    const data = await res.json();
                                                                    setSettingsForm({ ...settingsForm, heroDesktopImageUrl: data.url });
                                                                    showNotification('success', 'Desktop hero image uploaded');
                                                                }
                                                            } catch {
                                                                showNotification('error', 'Upload failed');
                                                            } finally {
                                                                setUploading(false);
                                                            }
                                                        };
                                                        input.click();
                                                    }}
                                                    className="px-3 py-2 border border-dashed border-slate-300 rounded-md text-sm text-slate-600 hover:border-slate-400"
                                                >
                                                    {uploading ? 'Uploading…' : 'Upload desktop'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Home hero — mobile image</label>
                                        <p className="text-xs text-slate-500 mb-2">Tall screenshot (e.g. sales / growth). Shown in the small overlapping phone frame.</p>
                                        <div className="flex items-start gap-3 flex-wrap">
                                            {settingsForm.heroMobileImageUrl ? (
                                                <div className="relative w-full max-w-[140px] aspect-[9/16] rounded border border-slate-200 overflow-hidden bg-slate-50">
                                                    <img src={settingsForm.heroMobileImageUrl} alt="Hero mobile" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setSettingsForm({ ...settingsForm, heroMobileImageUrl: '' })}
                                                        disabled={!editingSettings}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-1 hover:bg-red-600 disabled:opacity-50"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : null}
                                            {editingSettings && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const input = document.createElement('input');
                                                        input.type = 'file';
                                                        input.accept = 'image/*';
                                                        input.onchange = async (e) => {
                                                            const file = (e.target as HTMLInputElement).files?.[0];
                                                            if (!file) return;
                                                            setUploading(true);
                                                            try {
                                                                const formData = new FormData();
                                                                formData.append('file', file);
                                                                const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: getAdminAuthHeaders(false), body: formData });
                                                                if (res.ok) {
                                                                    const data = await res.json();
                                                                    setSettingsForm({ ...settingsForm, heroMobileImageUrl: data.url });
                                                                    showNotification('success', 'Mobile hero image uploaded');
                                                                }
                                                            } catch {
                                                                showNotification('error', 'Upload failed');
                                                            } finally {
                                                                setUploading(false);
                                                            }
                                                        };
                                                        input.click();
                                                    }}
                                                    className="px-3 py-2 border border-dashed border-slate-300 rounded-md text-sm text-slate-600 hover:border-slate-400"
                                                >
                                                    {uploading ? 'Uploading…' : 'Upload mobile'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        value={settingsForm.companyName}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                </div>
                            </section>

                            {/* Company & Contact */}
                            <section>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Company & Contact</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Primary Email</label>
                                    <input
                                        type="email"
                                        value={settingsForm.primaryEmail}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, primaryEmail: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                                    <input
                                        type="email"
                                        value={settingsForm.supportEmail}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Primary WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={settingsForm.primaryWhatsApp}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, primaryWhatsApp: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Secondary WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={settingsForm.secondaryWhatsApp}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, secondaryWhatsApp: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                </div>
                            </section>

                            {/* Lead 1 */}
                            <section>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Lead 1</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={settingsForm.leadName1}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadName1: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={settingsForm.leadEmail1}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadEmail1: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={settingsForm.leadWhatsApp1}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadWhatsApp1: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                </div>
                            </section>

                            {/* Lead 2 */}
                            <section>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Lead 2</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={settingsForm.leadName2}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadName2: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={settingsForm.leadEmail2}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadEmail2: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={settingsForm.leadWhatsApp2}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadWhatsApp2: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                </div>
                            </section>

                            {/* About */}
                            <section>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">About</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={settingsForm.address}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                                    <input
                                        type="text"
                                        value={settingsForm.tagline}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        value={settingsForm.description}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, description: e.target.value })}
                                        disabled={!editingSettings}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )}

                {/* SERVICES TAB */}
                {activeTab === 'services' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Services</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={fetchServices} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh
                                </button>
                                <button
                                    onClick={() => { setShowServiceForm(true); setEditingService(null); setServiceForm({ name: '', description: '', link: '', icon: '', isComingSoon: false, displayOrder: services.length }); }}
                                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Service
                                </button>
                            </div>
                        </div>

                        {/* Service Form Modal */}
                        {showServiceForm && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowServiceForm(false)}>
                                <div className="bg-white rounded-lg w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {editingService ? 'Edit Service' : 'Add New Service'}
                                        </h3>
                                        <button onClick={() => setShowServiceForm(false)} className="text-slate-400 hover:text-slate-600">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Service Name *</label>
                                            <input
                                                type="text"
                                                value={serviceForm.name}
                                                onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                placeholder="e.g. AI Consulting"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Service Link (Optional)</label>
                                            <input
                                                type="text"
                                                value={serviceForm.link}
                                                onChange={(e) => setServiceForm({ ...serviceForm, link: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                placeholder="/services/ai"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                            <textarea
                                                value={serviceForm.description}
                                                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                rows={2}
                                                placeholder="Short description of the service"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Icon (JPG/PNG) *</label>
                                            <div className="flex items-center gap-4">
                                                {serviceForm.icon ? (
                                                    <div className="relative w-16 h-16 rounded overflow-hidden border border-slate-200">
                                                        <img src={serviceForm.icon} alt="Service Icon" className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => setServiceForm({ ...serviceForm, icon: '' })}
                                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => {
                                                            const input = document.createElement('input');
                                                            input.type = 'file';
                                                            input.accept = 'image/*';
                                                            input.onchange = (e) => handleServiceIconUpload(e as any);
                                                            input.click();
                                                        }}
                                                        className="w-16 h-16 border-2 border-dashed border-slate-300 rounded flex items-center justify-center cursor-pointer hover:border-slate-400"
                                                    >
                                                        {uploading ? (
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600" />
                                                        ) : (
                                                            <ImagePlus className="w-6 h-6 text-slate-400" />
                                                        )}
                                                    </div>
                                                )}
                                                <span className="text-xs text-slate-500">JPG or PNG (max 5MB)</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="isComingSoon"
                                                    checked={serviceForm.isComingSoon}
                                                    onChange={(e) => setServiceForm({ ...serviceForm, isComingSoon: e.target.checked })}
                                                    className="w-4 h-4"
                                                />
                                                <label htmlFor="isComingSoon" className="text-sm text-slate-700">Coming Soon</label>
                                            </div>
                                            <div>
                                                <label className="text-sm text-slate-700 mr-2">Order:</label>
                                                <input
                                                    type="number"
                                                    value={serviceForm.displayOrder}
                                                    onChange={(e) => setServiceForm({ ...serviceForm, displayOrder: parseInt(e.target.value) || 0 })}
                                                    className="w-16 px-2 py-1 border border-slate-200 rounded text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                                        <button
                                            onClick={() => setShowServiceForm(false)}
                                            className="flex-1 px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 text-sm font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={saveService}
                                            disabled={saving}
                                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            {saving ? 'Saving...' : 'Save Service'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Services List */}
                        {services.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <Zap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-700 mb-2">No services yet</h3>
                                <p className="text-slate-500">Add services to display them on the homepage.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {services.map((service) => (
                                    <div key={service.id} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-100">
                                                <img src={service.icon} alt={service.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex gap-1">
                                                <button onClick={() => editService(service)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteService(service.id)}
                                                    disabled={deleting === service.id}
                                                    className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-1">{service.name}</h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {service.isComingSoon && (
                                                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase">Coming Soon</span>
                                            )}
                                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase">Order: {service.displayOrder}</span>
                                        </div>
                                        {service.link && (
                                            <p className="text-[10px] text-slate-400 mt-2 truncate">{service.link}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* PRODUCTS TAB */}
                {activeTab === 'products' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Products</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={fetchProducts} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh
                                </button>
                                <button
                                    onClick={() => { setShowProductForm(true); setEditingProduct(null); setProductForm({ name: '', link: '', description: '', features: '', category: '', isComingSoon: false, displayOrder: products.length }); }}
                                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Product
                                </button>
                            </div>
                        </div>

                        {/* Product Form Modal */}
                        {showProductForm && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowProductForm(false)}>
                                <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                                        </h3>
                                        <button onClick={() => setShowProductForm(false)} className="text-slate-400 hover:text-slate-600">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Product Name *</label>
                                            <input
                                                type="text"
                                                value={productForm.name}
                                                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                placeholder="e.g. Hexa POS"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                            <select
                                                value={productForm.category}
                                                onChange={(e) => setProductForm({ ...productForm, category: e.target.value as '' | 'business' | 'free' })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                            >
                                                <option value="">— Select —</option>
                                                <option value="business">Business Software</option>
                                                <option value="free">Free Tools</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Product Link (Optional)</label>
                                            <input
                                                type="text"
                                                value={productForm.link}
                                                onChange={(e) => setProductForm({ ...productForm, link: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                placeholder="https://pos.hexastack.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                                            <textarea
                                                value={productForm.description}
                                                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                rows={3}
                                                placeholder="Short description of the product"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Features (one per line) *</label>
                                            <textarea
                                                value={productForm.features}
                                                onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                                                rows={4}
                                                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="prodIsComingSoon"
                                                    checked={productForm.isComingSoon}
                                                    onChange={(e) => setProductForm({ ...productForm, isComingSoon: e.target.checked })}
                                                    className="w-4 h-4"
                                                />
                                                <label htmlFor="prodIsComingSoon" className="text-sm text-slate-700">Coming Soon</label>
                                            </div>
                                            <div>
                                                <label className="text-sm text-slate-700 mr-2">Order:</label>
                                                <input
                                                    type="number"
                                                    value={productForm.displayOrder}
                                                    onChange={(e) => setProductForm({ ...productForm, displayOrder: parseInt(e.target.value) || 0 })}
                                                    className="w-16 px-2 py-1 border border-slate-200 rounded text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                                        <button
                                            onClick={() => setShowProductForm(false)}
                                            className="flex-1 px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 text-sm font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={saveProduct}
                                            disabled={saving}
                                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            {saving ? 'Saving...' : 'Save Product'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Products List — Business Software then Free Tools */}
                        {products.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-700 mb-2">No products yet</h3>
                                <p className="text-slate-500">Add products to sync with the site (Business Software & Free Tools).</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {(['business', 'free'] as const).map((cat) => {
                                    const list = products.filter(p => (p.category || '') === cat);
                                    if (list.length === 0) return null;
                                    return (
                                        <div key={cat}>
                                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                                                {cat === 'business' ? 'Business Software' : 'Free Tools'}
                                            </h3>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {list.map((product) => (
                                                    <div key={product.id} className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                                                                <Package className="w-6 h-6" />
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <button onClick={() => editProduct(product)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded">
                                                                    <Edit2 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteProduct(product.id)}
                                                                    disabled={deleting === product.id}
                                                                    className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded disabled:opacity-50"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <h3 className="font-bold text-slate-900 mb-2">{product.name}</h3>
                                                        <p className="text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                                                            {product.description}
                                                        </p>
                                                        <div className="space-y-1 mb-4">
                                                            {product.features.slice(0, 3).map((f, i) => (
                                                                <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                                                                    <div className="w-1 h-1 bg-slate-400 rounded-full" />
                                                                    {f}
                                                                </div>
                                                            ))}
                                                            {product.features.length > 3 && (
                                                                <p className="text-[10px] text-slate-300">+{product.features.length - 3} more features</p>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 mt-auto">
                                                            {product.isComingSoon && (
                                                                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase">Coming Soon</span>
                                                            )}
                                                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase">Order: {product.displayOrder}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                                {products.filter(p => p.category !== 'business' && p.category !== 'free').length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Other</h3>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {products.filter(p => p.category !== 'business' && p.category !== 'free').map((product) => (
                                                <div key={product.id} className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600"><Package className="w-6 h-6" /></div>
                                                        <div className="flex gap-1">
                                                            <button onClick={() => editProduct(product)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded"><Edit2 className="w-4 h-4" /></button>
                                                            <button onClick={() => deleteProduct(product.id)} disabled={deleting === product.id} className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
                                                        </div>
                                                    </div>
                                                    <h3 className="font-bold text-slate-900 mb-2">{product.name}</h3>
                                                    <p className="text-sm text-slate-500 line-clamp-2 mb-3">{product.description}</p>
                                                    <div className="flex flex-wrap gap-2 mt-auto">
                                                        {product.isComingSoon && <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase">Coming Soon</span>}
                                                        <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase">Order: {product.displayOrder}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* SEO PAGES TAB */}
                {activeTab === 'seo' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">SEO Location Pages</h2>
                            <div className="flex gap-2">
                                <button onClick={fetchSeoPages} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                    <RefreshCw className={`w-4 h-4 ${seoLoading ? 'animate-spin' : ''}`} /> Refresh
                                </button>
                                <button
                                    onClick={() => { setShowSeoForm(true); setEditingSeo(null); setSeoForm({ location: '', locationSlug: '', service: '', serviceSlug: '', title: '', description: '', h1: '', region: '' }); }}
                                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" /> Add SEO Page
                                </button>
                            </div>
                        </div>
                        {showSeoForm && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSeoForm(false)}>
                                <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4">{editingSeo ? 'Edit SEO Page' : 'Add SEO Page'}</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block font-medium text-slate-700 mb-1">Location</label>
                                                <input type="text" value={seoForm.location} onChange={(e) => setSeoForm({ ...seoForm, location: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="Thrissur" />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-slate-700 mb-1">Location slug</label>
                                                <input type="text" value={seoForm.locationSlug} onChange={(e) => setSeoForm({ ...seoForm, locationSlug: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="thrissur" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block font-medium text-slate-700 mb-1">Service</label>
                                                <input type="text" value={seoForm.service} onChange={(e) => setSeoForm({ ...seoForm, service: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="Web Development" />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-slate-700 mb-1">Service slug</label>
                                                <input type="text" value={seoForm.serviceSlug} onChange={(e) => setSeoForm({ ...seoForm, serviceSlug: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="web-development" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-slate-700 mb-1">Title</label>
                                            <input type="text" value={seoForm.title} onChange={(e) => setSeoForm({ ...seoForm, title: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="Web Development Company Thrissur | HexaStack" />
                                        </div>
                                        <div>
                                            <label className="block font-medium text-slate-700 mb-1">Description</label>
                                            <textarea value={seoForm.description} onChange={(e) => setSeoForm({ ...seoForm, description: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" rows={2} />
                                        </div>
                                        <div>
                                            <label className="block font-medium text-slate-700 mb-1">H1</label>
                                            <input type="text" value={seoForm.h1} onChange={(e) => setSeoForm({ ...seoForm, h1: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="Web Development Company in Thrissur" />
                                        </div>
                                        <div>
                                            <label className="block font-medium text-slate-700 mb-1">Region (KERALA | GULF | INDIA)</label>
                                            <input type="text" value={seoForm.region} onChange={(e) => setSeoForm({ ...seoForm, region: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="KERALA" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-4 pt-4 border-t">
                                        <button onClick={() => setShowSeoForm(false)} className="flex-1 px-4 py-2 border border-slate-200 rounded hover:bg-slate-50 text-sm font-medium">Cancel</button>
                                        <button onClick={saveSeoPage} disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 text-sm font-medium disabled:opacity-50"><Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {seoLoading && !seoPages.length ? (
                            <div className="text-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto" /><p className="text-slate-500 mt-2">Loading...</p></div>
                        ) : seoPages.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500">No SEO pages in database. Add pages here (or use static config in src/data/seoLocationPages.ts).</p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                                {seoPages.map((p) => (
                                    <div key={p.id} className="flex items-center justify-between gap-4 py-3 px-4 bg-white border border-slate-200 rounded-lg">
                                        <div className="min-w-0 flex-1">
                                            <span className="font-medium text-slate-900">{p.location}</span>
                                            <span className="text-slate-400 mx-2">·</span>
                                            <span className="text-slate-600">{p.service}</span>
                                            <span className="text-slate-400 ml-2 text-xs">/seo/{p.locationSlug}/{p.serviceSlug}</span>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <button onClick={() => { setEditingSeo(p); setSeoForm({ location: p.location, locationSlug: p.locationSlug, service: p.service, serviceSlug: p.serviceSlug, title: p.title, description: p.description, h1: p.h1, region: p.region || '' }); setShowSeoForm(true); }} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded"><Edit2 className="w-4 h-4" /></button>
                                            <button onClick={() => deleteSeoPage(p.id)} disabled={deleting === p.id} className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* BACKLINKS TAB */}
                {activeTab === 'backlinks' && (
                    <div>
                        {/* Static directory checklist — state in localStorage */}
                        <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-900 mb-2">Directory backlinks checklist</h2>
                            <p className="text-sm text-slate-600 mb-4">
                                {(() => {
                                    const completed = JSON.parse(localStorage.getItem(BACKLINKS_CHECKLIST_KEY) || '[]') as string[];
                                    return `${completed.length} of ${STATIC_BACKLINK_SITES.length} completed`;
                                })()}
                            </p>
                            <ul className="space-y-2">
                                {STATIC_BACKLINK_SITES.map((site) => {
                                    const completed = JSON.parse(localStorage.getItem(BACKLINKS_CHECKLIST_KEY) || '[]') as string[];
                                    const checked = completed.includes(site.id);
                                    const toggle = () => {
                                        const next = checked ? completed.filter((id) => id !== site.id) : [...completed, site.id];
                                        localStorage.setItem(BACKLINKS_CHECKLIST_KEY, JSON.stringify(next));
                                        setBacklinksChecklistVersion((v) => v + 1);
                                    };
                                    return (
                                        <li key={site.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                                            <input type="checkbox" checked={checked} onChange={toggle} className="rounded border-slate-300" />
                                            <span className="font-medium text-slate-800">{site.name}</span>
                                            <span className="text-xs text-slate-500">{site.da}</span>
                                            <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate max-w-[200px]">{site.url}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Backlinks (ranking)</h2>
                            <div className="flex gap-2">
                                <button onClick={fetchBacklinks} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                    <RefreshCw className={`w-4 h-4 ${backlinksLoading ? 'animate-spin' : ''}`} /> Refresh
                                </button>
                                <button
                                    onClick={() => { setShowBacklinkForm(true); setEditingBacklink(null); setBacklinkForm({ sourceUrl: '', targetUrl: '', sourceSite: '', linkType: '', daDr: '', notes: '', status: 'active' }); }}
                                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" /> Add Backlink
                                </button>
                            </div>
                        </div>
                        {showBacklinkForm && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBacklinkForm(false)}>
                                <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4">{editingBacklink ? 'Edit Backlink' : 'Add Backlink'}</h3>
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <label className="block font-medium text-slate-700 mb-1">Source URL *</label>
                                            <input type="url" value={backlinkForm.sourceUrl} onChange={(e) => setBacklinkForm({ ...backlinkForm, sourceUrl: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="https://example.com/page" />
                                        </div>
                                        <div>
                                            <label className="block font-medium text-slate-700 mb-1">Our URL (target)</label>
                                            <input type="url" value={backlinkForm.targetUrl} onChange={(e) => setBacklinkForm({ ...backlinkForm, targetUrl: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="https://www.hexastacksolutions.com" />
                                        </div>
                                        <div>
                                            <label className="block font-medium text-slate-700 mb-1">Source site / domain</label>
                                            <input type="text" value={backlinkForm.sourceSite} onChange={(e) => setBacklinkForm({ ...backlinkForm, sourceSite: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="example.com" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block font-medium text-slate-700 mb-1">Type</label>
                                                <select value={backlinkForm.linkType} onChange={(e) => setBacklinkForm({ ...backlinkForm, linkType: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded">
                                                    <option value="">—</option>
                                                    <option value="directory">Directory</option>
                                                    <option value="guest_post">Guest post</option>
                                                    <option value="partner">Partner</option>
                                                    <option value="press">Press</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium text-slate-700 mb-1">DA/DR</label>
                                                <input type="text" value={backlinkForm.daDr} onChange={(e) => setBacklinkForm({ ...backlinkForm, daDr: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" placeholder="DA 45" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-slate-700 mb-1">Status</label>
                                            <select value={backlinkForm.status} onChange={(e) => setBacklinkForm({ ...backlinkForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded">
                                                <option value="active">Active</option>
                                                <option value="pending">Pending</option>
                                                <option value="lost">Lost</option>
                                                <option value="review">Review</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-slate-700 mb-1">Notes</label>
                                            <textarea value={backlinkForm.notes} onChange={(e) => setBacklinkForm({ ...backlinkForm, notes: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" rows={2} />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-4 pt-4 border-t">
                                        <button onClick={() => setShowBacklinkForm(false)} className="flex-1 px-4 py-2 border border-slate-200 rounded hover:bg-slate-50 text-sm font-medium">Cancel</button>
                                        <button onClick={saveBacklink} disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 text-sm font-medium disabled:opacity-50"><Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {backlinksLoading && !backlinks.length ? (
                            <div className="text-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto" /><p className="text-slate-500 mt-2">Loading...</p></div>
                        ) : backlinks.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <Link2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500">No backlinks yet. Add links that point to your site to track ranking.</p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                                {backlinks.map((b) => (
                                    <div key={b.id} className="flex items-center justify-between gap-4 py-3 px-4 bg-white border border-slate-200 rounded-lg">
                                        <div className="min-w-0 flex-1">
                                            <a href={b.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-slate-900 font-medium hover:underline truncate block">{b.sourceUrl}</a>
                                            <div className="flex gap-2 mt-1 text-xs text-slate-500">
                                                {b.sourceSite && <span>{b.sourceSite}</span>}
                                                {b.linkType && <span>· {b.linkType}</span>}
                                                {b.daDr && <span>· {b.daDr}</span>}
                                                {b.status && <span>· {b.status}</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <button onClick={() => { setEditingBacklink(b); setBacklinkForm({ sourceUrl: b.sourceUrl, targetUrl: b.targetUrl || '', sourceSite: b.sourceSite || '', linkType: b.linkType || '', daDr: b.daDr || '', notes: b.notes || '', status: b.status || 'active' }); setShowBacklinkForm(true); }} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded"><Edit2 className="w-4 h-4" /></button>
                                            <button onClick={() => deleteBacklink(b.id)} disabled={deleting === b.id} className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
