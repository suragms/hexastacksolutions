import type { LucideIcon } from 'lucide-react'
import {
  AppWindow,
  BarChart3,
  Bell,
  BrainCircuit,
  Briefcase,
  Building2,
  CalendarDays,
  Camera,
  ClipboardList,
  Cloud,
  Code2,
  Cpu,
  CreditCard,
  FileText,
  Gauge,
  Globe,
  GraduationCap,
  HeartPulse,
  Hospital,
  Landmark,
  Layers,
  Layout,
  LayoutTemplate,
  LineChart,
  MapPin,
  Megaphone,
  Palette,
  PenLine,
  PenTool,
  QrCode,
  Rocket,
  ScanFace,
  School,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UserCheck,
  Users,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react'

/**
 * Single source of truth for the 13 service categories shown on the homepage grid,
 * the /services page, the per-category detail pages (/services/<slug>), the navbar,
 * and the footer. Kept in sync with scripts/public-routes.cjs SERVICE_CATEGORY_PATHS
 * and src/prerender.tsx routeMeta.
 */

export type ServiceFeature = { title: string; description: string; icon: LucideIcon }

export type ServiceCategory = {
  /** URL slug, e.g. 'software-development' -> /services/software-development */
  slug: string
  title: string
  /** Short label for navbar / footer */
  navLabel: string
  /** Small kicker used on the detail page header */
  kicker: string
  /** One-two sentence card copy for homepage / services grid */
  shortDescription: string
  /** Grid sort key */
  hubOrder: number
  /** SEO <title> WITHOUT the '| HexaStack Solutions' suffix (usePageSeo appends it) */
  pageTitle: string
  /** SEO meta description (keyword-rich, ~150-160 chars) */
  metaDescription: string
  hero: {
    h1: string
    intro: string
  }
  /** Core deliverables for this service (4-8 each; flagship gets 15) */
  features: ServiceFeature[]
  /** Audience / industry chips, when relevant */
  audience?: string[]
  faqs: { question: string; answer: string }[]
  /** Other catalog slugs for the Related services block */
  related?: string[]
  /** Only the Attendance Management System is the flagship */
  flagship?: boolean
  /** SEO phrases to weave into meta + on-page copy (not stuffed) */
  keywords?: string[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'software-development',
    title: 'Software Development',
    navLabel: 'Software Development',
    kicker: 'Custom software',
    shortDescription:
      'Custom web applications, enterprise software, ERP, CRM, SaaS, dashboards, APIs, and cloud applications built to fit how your business actually works.',
    hubOrder: 0,
    pageTitle: 'Software Development Company in Kerala',
    metaDescription:
      'Software development company in Kerala. Custom web applications, ERP, CRM, SaaS platforms, dashboards, API and cloud applications built by HexaStack Solutions.',
    hero: {
      h1: 'Custom Software Development Company in Kerala',
      intro:
        'Stop adapting your business to off-the-shelf software. We design and build web applications, ERP and CRM systems, SaaS platforms, dashboards, and APIs around your exact workflows — for Kerala, Gulf, and global teams.',
    },
    features: [
      { title: 'Custom Web Applications', description: 'Tailored tools that automate your unique workflows and remove manual processes.', icon: AppWindow },
      { title: 'Enterprise Software', description: 'Robust internal systems built for scale, security, and real daily usage.', icon: Building2 },
      { title: 'ERP Solutions', description: 'Enterprise resource planning covering inventory, finance, HR, and operations in one system.', icon: BarChart3 },
      { title: 'CRM Systems', description: 'Customer relationship management that tracks leads, deals, and follow-ups end to end.', icon: Users },
      { title: 'SaaS Platforms', description: 'Multi-tenant cloud products with subscription billing, analytics, and scalable architecture.', icon: Layers },
      { title: 'Dashboard Development', description: 'Real-time dashboards and reporting that turn raw data into decisions.', icon: Gauge },
      { title: 'API Development', description: 'Secure, documented APIs that connect your systems and third-party services.', icon: Code2 },
      { title: 'Cloud Applications', description: 'Cloud-native apps deployed on modern infrastructure with reliability baked in.', icon: Server },
    ],
    faqs: [
      { question: 'How much does custom software development cost in Kerala?', answer: 'Cost depends on scope. A focused internal tool or portal typically starts around ₹1,00,000, while larger ERP or SaaS builds are scoped phase by phase with fixed deliverables and transparent pricing.' },
      { question: 'Do you build on the client’s existing stack or your own?', answer: 'Both. We match the stack that fits your team and maintenance plan — React, Node.js, TypeScript, and modern databases are our defaults, but we work with what you already run.' },
      { question: 'Can you take over and improve existing software?', answer: 'Yes. We regularly audit, extend, and maintain existing systems — adding modules, fixing bottlenecks, and upgrading performance without a rebuild.' },
    ],
    related: ['ai-machine-learning', 'ecommerce-solutions', 'business-development'],
    keywords: ['software development company', 'ERP development', 'CRM development', 'SaaS development Kerala', 'API development', 'cloud solutions'],
  },
  {
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    navLabel: 'AI & Machine Learning',
    kicker: 'AI solutions',
    shortDescription:
      'AI chatbots, agents, machine learning models, predictive analytics, computer vision, NLP, and automation systems that cut manual work and unlock new insights.',
    hubOrder: 1,
    pageTitle: 'AI Development Company in Kerala',
    metaDescription:
      'AI development company in Kerala. AI chatbots, AI agents, machine learning models, predictive analytics, computer vision, NLP, and automation systems from HexaStack.',
    hero: {
      h1: 'AI & Machine Learning Solutions for Business',
      intro:
        'From intelligent chatbots and AI agents to predictive analytics, computer vision, and NLP — we design practical AI solutions that save hours, reduce errors, and give your business a real competitive edge.',
    },
    features: [
      { title: 'AI Chatbots', description: 'Conversational assistants for support, lead qualification, and bookings.', icon: Sparkles },
      { title: 'AI Agents', description: 'Autonomous agents that execute multi-step tasks across your tools and data.', icon: BrainCircuit },
      { title: 'Machine Learning Models', description: 'Custom models trained on your data to classify, predict, and recommend.', icon: Cpu },
      { title: 'Predictive Analytics', description: 'Forecasting and demand prediction that guide pricing, stock, and capacity.', icon: TrendingUp },
      { title: 'Computer Vision', description: 'Image and video recognition for inspection, recognition, and automation.', icon: Camera },
      { title: 'NLP Solutions', description: 'Language understanding for search, documents, sentiment, and chat.', icon: FileText },
      { title: 'Automation Systems', description: 'End-to-end workflow automation that removes repetitive manual work.', icon: Wrench },
      { title: 'Recommendation Systems', description: 'Personalised product and content suggestions that lift conversion.', icon: Layers },
    ],
    faqs: [
      { question: 'Does AI really help small and mid-size businesses in Kerala?', answer: 'Yes. The highest-value uses are practical: AI chatbots for round-the-clock lead capture, document and data processing, and automating repetitive workflows — all affordable at small-business scale.' },
      { question: 'Do you train models on our data or use ready-made AI?', answer: 'We use the right tool for the job — ready-made models where they work, fine-tuned or custom-trained models where your data and accuracy requirements demand it.' },
      { question: 'Is our data safe with an AI project?', answer: 'Yes. We keep your data in your own infrastructure where required, follow least-privilege access, and avoid sending sensitive data to third-party services without explicit consent.' },
    ],
    related: ['software-development', 'business-development', 'attendance-management-system'],
    keywords: ['AI development company', 'AI solutions', 'AI chatbots Kerala', 'machine learning', 'business automation', 'predictive analytics'],
  },
  {
    slug: 'attendance-management-system',
    title: 'Attendance Management System',
    navLabel: 'Attendance System',
    kicker: 'Flagship product',
    shortDescription:
      'Face recognition, QR, RFID, NFC, GPS, and biometric attendance for schools, colleges, offices, factories, and hospitals — with shifts, leave, payroll, and analytics.',
    hubOrder: 2,
    pageTitle: 'Attendance Management System with Face Recognition in Kerala',
    metaDescription:
      'Attendance management system in Kerala with face recognition, QR, RFID, NFC, GPS, and biometric attendance for schools, colleges, offices, factories, and hospitals.',
    hero: {
      h1: 'Attendance Management System for Schools, Colleges & Workplaces',
      intro:
        'One system for every attendance method — face recognition, QR, RFID, NFC, GPS, and biometric — with shift and leave management, payroll integration, analytics, and real-time alerts. Built for schools, colleges, universities, offices, factories, hospitals, and organizations.',
    },
    audience: ['Schools', 'Colleges', 'Universities', 'Offices', 'Factories', 'Hospitals', 'Organizations'],
    features: [
      { title: 'Face Recognition Attendance', description: 'Mark attendance in under a second with accurate face matching.', icon: ScanFace },
      { title: 'QR Attendance', description: 'Students and staff scan a unique QR to check in and out.', icon: QrCode },
      { title: 'RFID Attendance', description: 'Tap-and-go check-in with RFID cards and tags.', icon: CreditCard },
      { title: 'NFC Attendance', description: 'NFC-based attendance for smartphones and smart cards.', icon: Smartphone },
      { title: 'GPS Attendance', description: 'Location-verified attendance for field teams and site staff.', icon: MapPin },
      { title: 'Biometric Integration', description: 'Connect fingerprint and other biometric devices as needed.', icon: UserCheck },
      { title: 'Staff Attendance', description: 'Separate staff and faculty attendance flows and reporting.', icon: Briefcase },
      { title: 'Student Attendance', description: 'Class-wise, section-wise student attendance and analysis.', icon: GraduationCap },
      { title: 'Shift Management', description: 'Multi-shift scheduling with day, night, and rotation support.', icon: CalendarDays },
      { title: 'Leave Management', description: 'Apply, approve, and track leaves with balances per employee.', icon: ClipboardList },
      { title: 'Payroll Integration', description: 'Send approved attendance and leave straight into payroll.', icon: CreditCard },
      { title: 'Reports', description: 'Daily, monthly, and custom reports exportable in one click.', icon: FileText },
      { title: 'Analytics Dashboard', description: 'Live dashboards for attendance, trends, and exceptions.', icon: BarChart3 },
      { title: 'Mobile Attendance', description: 'Full mobile app for marking, approving, and monitoring on the go.', icon: Smartphone },
      { title: 'Real-Time Notifications', description: 'Instant alerts to parents, admins, and HR on absences or check-ins.', icon: Bell },
    ],
    faqs: [
      { question: 'Can the attendance system work without the internet?', answer: 'Yes. Attendance can be captured offline and synced automatically once connectivity returns, so marking never stops during outages.' },
      { question: 'Which attendance methods do you support?', answer: 'Face recognition, QR, RFID, NFC, GPS, and biometric — you can use one method or combine several by location or role.' },
      { question: 'Does it integrate with our existing payroll and HR software?', answer: 'Yes. Attendance and leave records export cleanly and can integrate with common payroll and HR systems or your custom software.' },
    ],
    related: ['educational-solutions', 'healthcare-solutions', 'software-development'],
    flagship: true,
    keywords: ['attendance management system', 'face recognition attendance', 'QR attendance', 'RFID attendance', 'student attendance Kerala'],
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    navLabel: 'Website Development',
    kicker: 'Websites',
    shortDescription:
      'Business, corporate, e-commerce, hospital, school, hotel, restaurant, tourism, NGO, and startup websites — fast, SEO-ready, and conversion-focused.',
    hubOrder: 3,
    pageTitle: 'Web Development Company in Kerala',
    metaDescription:
      'Website development company in Kerala. Business, corporate, e-commerce, hospital, school, hotel, restaurant, and tourism websites built fast and SEO-ready by HexaStack.',
    hero: {
      h1: 'Website Development for Businesses in Kerala & the Gulf',
      intro:
        'From business and corporate sites to e-commerce stores, hospital and school websites, tourism and hotel sites — we build fast, mobile-first, SEO-ready websites that turn visitors into customers.',
    },
    features: [
      { title: 'Business Websites', description: 'Clear, credible sites that make your business easy to find and contact.', icon: Briefcase },
      { title: 'Corporate Websites', description: 'Premium multi-page corporate sites that build trust at scale.', icon: Building2 },
      { title: 'Portfolio Websites', description: 'Showcase work beautifully for agencies, freelancers, and studios.', icon: Layout },
      { title: 'Hospital Websites', description: 'Doctor profiles, departments, appointments, and patient-focused design.', icon: Hospital },
      { title: 'School & College Websites', description: 'Admissions, academics, events, and news for educational institutions.', icon: School },
      { title: 'Tourism Websites', description: 'Destinations, itineraries, and booking journeys that inspire travel.', icon: MapPin },
      { title: 'Hotel & Restaurant Websites', description: 'Menus, rooms, reservations, and direct bookings.', icon: UtensilsCrossed },
      { title: 'E-commerce Websites', description: 'Online stores with payments, inventory, and order management.', icon: ShoppingCart },
      { title: 'Temple & NGO Websites', description: 'Community, donation, and event sites for institutions and causes.', icon: Landmark },
      { title: 'Real Estate Websites', description: 'Listings, searches, and lead capture for properties and projects.', icon: Building2 },
      { title: 'Landing Pages', description: 'High-converting single pages for campaigns and launches.', icon: Rocket },
      { title: 'Startup Websites', description: 'Launch-ready sites that communicate product and traction clearly.', icon: Sparkles },
    ],
    faqs: [
      { question: 'How long does a website take to build?', answer: 'A standard business website takes 2–4 weeks. E-commerce and larger corporate sites take 6–12 weeks depending on features and integrations.' },
      { question: 'Is SEO included with website development?', answer: 'Every site ships with technical SEO built in — Core Web Vitals, semantic markup, schema, and mobile-first responsive design — so you start with a strong search foundation.' },
      { question: 'Can you redesign our existing website?', answer: 'Yes. We specialise in redesigns that improve performance, user experience, and conversion while preserving your existing SEO equity.' },
    ],
    related: ['ui-ux-design', 'digital-marketing', 'ecommerce-solutions'],
    keywords: ['web development company Kerala', 'website development', 'web design Thrissur', 'e-commerce websites Kerala'],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    navLabel: 'Mobile Apps',
    kicker: 'Mobile apps',
    shortDescription:
      'Android and iOS apps in Flutter and React Native, plus enterprise and business apps that work offline, integrate, and scale with your team.',
    hubOrder: 4,
    pageTitle: 'Mobile App Development Company in Kerala',
    metaDescription:
      'Mobile app development company in Kerala. Android, iOS, Flutter, and React Native apps — business and enterprise mobile applications built by HexaStack Solutions.',
    hero: {
      h1: 'Mobile App Development for Android, iOS & Cross-Platform',
      intro:
        'Native-feeling Android and iOS apps built with Flutter and React Native from one codebase — plus enterprise and business apps for field teams, bookings, commerce, and internal operations.',
    },
    features: [
      { title: 'Android Apps', description: 'Feature-rich Android apps built for performance and reach.', icon: Smartphone },
      { title: 'iOS Apps', description: 'Polished iOS apps that meet App Store standards and expectations.', icon: Smartphone },
      { title: 'Flutter Apps', description: 'One codebase, native performance, for both stores at once.', icon: Layers },
      { title: 'React Native Apps', description: 'Cross-platform apps with a huge ecosystem and fast iteration.', icon: Code2 },
      { title: 'Enterprise Apps', description: 'Secure internal apps for field service, approvals, and operations.', icon: Briefcase },
      { title: 'Business Apps', description: 'Apps for bookings, ordering, loyalty, and customer engagement.', icon: TrendingUp },
    ],
    faqs: [
      { question: 'Flutter or React Native — which do you recommend?', answer: 'Both are excellent for cross-platform. We choose based on your team, integrations, and feature needs — Flutter for highly custom UI, React Native for strong JS ecosystem reuse.' },
      { question: 'Can the app work offline?', answer: 'Yes. We build offline-first where it matters — field teams, delivery, and remote sites — with automatic sync when back online.' },
      { question: 'Do you publish to the App Store and Google Play?', answer: 'Yes. We handle store submission, screenshots, and compliance so your app launches without friction.' },
    ],
    related: ['website-development', 'software-development', 'ui-ux-design'],
    keywords: ['mobile app development Kerala', 'Android app development', 'iOS app development', 'Flutter app development Kerala'],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    navLabel: 'UI/UX Design',
    kicker: 'Design',
    shortDescription:
      'Web and mobile UI design, dashboard design, prototyping, wireframes, design systems, and user experience improvement that make products easy and enjoyable.',
    hubOrder: 5,
    pageTitle: 'UI/UX Design Services in Kerala',
    metaDescription:
      'UI/UX design services in Kerala. Web and mobile UI design, dashboard design, prototyping, wireframes, and design systems that convert by HexaStack.',
    hero: {
      h1: 'UI/UX Design That Makes Products Easy to Use',
      intro:
        'Research-backed web and mobile interfaces, dashboard design, prototypes, and design systems — so your product is clear, accessible, and built to convert.',
    },
    features: [
      { title: 'Web UI Design', description: 'Interfaces that balance brand, clarity, and conversion.', icon: Layout },
      { title: 'Mobile UI Design', description: 'Thumb-friendly mobile interfaces that feel native.', icon: Smartphone },
      { title: 'Dashboard Design', description: 'Data-dense dashboards that are easy to scan and act on.', icon: Gauge },
      { title: 'Prototyping', description: 'Clickable prototypes to validate flows before development.', icon: Rocket },
      { title: 'Wireframes', description: 'Low-fidelity structure that aligns teams before pixels.', icon: LayoutTemplate },
      { title: 'Design Systems', description: 'Reusable components and tokens your team can extend.', icon: Layers },
      { title: 'User Experience Improvement', description: 'Audits and refinements that lift usability and conversion.', icon: TrendingUp },
    ],
    faqs: [
      { question: 'Can you work with our existing design or brand?', answer: 'Absolutely. We extend your brand and existing design rather than starting over where you already have equity.' },
      { question: 'Do you test designs with real users?', answer: 'For larger projects we run lightweight usability checks on prototypes and live pages so decisions are evidence-led.' },
      { question: 'Do designers hand off to developers cleanly?', answer: 'Yes — design systems and documented components hand off cleanly to our own developers or yours.' },
    ],
    related: ['website-development', 'mobile-app-development', 'software-development'],
    keywords: ['UI UX design Kerala', 'web UI design', 'dashboard design', 'design system'],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    navLabel: 'Digital Marketing',
    kicker: 'Growth & marketing',
    shortDescription:
      'SEO, Google Ads, Meta Ads, social media, email, WhatsApp, content, and lead generation — a complete digital marketing agency service for measurable growth.',
    hubOrder: 6,
    pageTitle: 'Digital Marketing Agency in Kerala',
    metaDescription:
      'Digital marketing agency in Kerala. SEO, local SEO, Google Ads, Meta Ads, social media, email, WhatsApp marketing, content, and lead generation from HexaStack.',
    hero: {
      h1: 'Digital Marketing Agency in Kerala & the Gulf',
      intro:
        'Search, social, paid, email, and WhatsApp marketing under one roof — so your brand is visible where buyers look and leads actually convert.',
    },
    features: [
      { title: 'Search Engine Optimization (SEO)', description: 'Rank for the searches that bring qualified visitors.', icon: Search },
      { title: 'Local SEO', description: 'Win the local pack and Google Maps for your area.', icon: MapPin },
      { title: 'Technical SEO', description: 'Site speed, structure, and crawlability that support rankings.', icon: Gauge },
      { title: 'Google Business Profile Optimization', description: 'A complete, optimised profile that attracts local customers.', icon: Building2 },
      { title: 'Social Media Marketing', description: 'Consistent, engaging presence across the right channels.', icon: Megaphone },
      { title: 'Facebook & Instagram Marketing', description: 'Campaigns and content that grow your audience and sales.', icon: Users },
      { title: 'LinkedIn Marketing', description: 'B2B visibility and lead generation for professional buyers.', icon: Briefcase },
      { title: 'YouTube Marketing', description: 'Video strategy, optimisation, and channel growth.', icon: Camera },
      { title: 'Email Marketing', description: 'Nurture sequences and campaigns that build relationships.', icon: FileText },
      { title: 'WhatsApp Marketing', description: 'Catalog, broadcast, and conversational marketing on WhatsApp.', icon: Bell },
      { title: 'Google Ads', description: 'Search and display campaigns with disciplined budgets.', icon: TrendingUp },
      { title: 'Meta Ads', description: 'Facebook and Instagram ads tuned for cost per result.', icon: Megaphone },
      { title: 'Content Marketing', description: 'Useful content that builds authority and organic traffic.', icon: PenLine },
      { title: 'Brand Awareness Campaigns', description: 'Campaigns that put your brand in front of the right people.', icon: Sparkles },
      { title: 'Lead Generation', description: 'Funnels and campaigns engineered for qualified leads.', icon: Users },
      { title: 'Marketing Automation', description: 'Automated follow-ups, scoring, and nurturing at scale.', icon: Wrench },
      { title: 'Analytics & Reporting', description: 'Clear reporting on what is working and what to improve.', icon: BarChart3 },
    ],
    faqs: [
      { question: 'When will we see results from SEO?', answer: 'SEO compounds. Meaningful movement typically appears in 2–4 months; sustainable rankings build over 6–12 months with consistent content and technical work.' },
      { question: 'Do you manage ad budgets directly?', answer: 'Yes. We run Google and Meta ads with transparent budgets, weekly performance reviews, and clear cost-per-result reporting.' },
      { question: 'Can you take over our existing campaigns and accounts?', answer: 'Yes. We audit, restructure, and improve existing accounts — often finding quick wins in wasted spend within the first weeks.' },
    ],
    related: ['website-development', 'branding-creative', 'business-development'],
    keywords: ['digital marketing agency Kerala', 'SEO company Kerala', 'Google Ads Kerala', 'social media marketing Kerala', 'WhatsApp marketing'],
  },
  {
    slug: 'branding-creative',
    title: 'Branding & Creative',
    navLabel: 'Branding & Creative',
    kicker: 'Brand & creative',
    shortDescription:
      'Logo design, brand identity, company profiles, brochures, business cards, social creatives, video editing, motion graphics, and product catalogues.',
    hubOrder: 7,
    pageTitle: 'Branding & Creative Design Services in Kerala',
    metaDescription:
      'Branding and creative design services in Kerala. Logo design, brand identity, company profiles, brochures, business cards, and social media creatives from HexaStack.',
    hero: {
      h1: 'Branding & Creative Design That Gets You Noticed',
      intro:
        'A memorable brand is more than a logo. We design complete identities, print and digital collateral, and motion content that make your business look and feel premium.',
    },
    features: [
      { title: 'Logo Design', description: 'Distinctive marks that work across every medium.', icon: PenTool },
      { title: 'Brand Identity', description: 'Color, type, voice, and guidelines that keep you consistent.', icon: Palette },
      { title: 'Company Profile', description: 'Professional profiles that win trust and shortlist you.', icon: FileText },
      { title: 'Brochures & Flyers', description: 'Print-ready collateral for campaigns and events.', icon: Layout },
      { title: 'Posters', description: 'High-impact posters for launches, offers, and awareness.', icon: PenLine },
      { title: 'Business Cards', description: 'Cards people keep — designed to a premium standard.', icon: CreditCard },
      { title: 'Social Media Creatives', description: 'On-brand creatives for every post and campaign.', icon: Megaphone },
      { title: 'Video Editing', description: 'Polished edits for ads, explainers, and reels.', icon: Camera },
      { title: 'Motion Graphics', description: 'Animated titles, logos, and intros that add life.', icon: Sparkles },
      { title: 'Product Catalogues', description: 'Catalogues that present your range professionally.', icon: Layers },
    ],
    faqs: [
      { question: 'Do you design logos separately or only with branding?', answer: 'Both. We design standalone logos, but a complete brand identity delivers far more value for businesses planning to grow.' },
      { question: 'Can you work from our existing brand guidelines?', answer: 'Yes — we can follow your guidelines or build them where none exist yet.' },
      { question: 'Do you deliver print-ready files?', answer: 'Yes. We deliver print-ready and digital files in the formats your printers and platforms need.' },
    ],
    related: ['digital-marketing', 'ui-ux-design', 'website-development'],
    keywords: ['logo design Kerala', 'brand identity', 'company profile design', 'social media creatives Kerala'],
  },
  {
    slug: 'business-development',
    title: 'Business Development Support',
    navLabel: 'Business Development',
    kicker: 'Business consulting',
    shortDescription:
      'Growth strategy, startup consultation, digital transformation, process optimization, market research, and technical consulting — a business growth partner, not just a vendor.',
    hubOrder: 8,
    pageTitle: 'Business Development & IT Consulting in Kerala',
    metaDescription:
      'Business development services and IT consulting in Kerala. Growth strategy, digital transformation, business automation, market research, and technology consulting from HexaStack.',
    hero: {
      h1: 'Business Development Support & Technology Consulting',
      intro:
        'Strategy without software is a document; software without strategy is an expense. We help startups and businesses plan growth, optimize processes, choose technology, and execute with measurable outcomes.',
    },
    audience: ['Startups', 'Small & Medium Businesses', 'Enterprises'],
    features: [
      { title: 'Business Growth Strategy', description: 'A practical plan to grow revenue, reach, and resilience.', icon: TrendingUp },
      { title: 'Startup Consultation', description: 'Go-to-market, product, and technical guidance for founders.', icon: Rocket },
      { title: 'Business Process Optimization', description: 'Find and fix the manual steps that cost you time and money.', icon: Wrench },
      { title: 'Digital Transformation', description: 'Modernise operations, data, and customer experience end to end.', icon: Layers },
      { title: 'IT & Technology Consulting', description: 'Clear advice on the right systems and vendors for your goals.', icon: Cpu },
      { title: 'Product Strategy', description: 'Define the roadmap, scope, and priorities that matter.', icon: LineChart },
      { title: 'Business Automation', description: 'Automate repetitive work so your team focuses on growth.', icon: Bell },
      { title: 'Sales Process Optimization', description: 'A repeatable sales motion with stronger conversion.', icon: Users },
      { title: 'Customer Relationship Strategy', description: 'Retain and grow customers with a clear relationship plan.', icon: HeartPulse },
      { title: 'Business Expansion Planning', description: 'Plan for new markets, locations, or product lines.', icon: Building2 },
      { title: 'Revenue Growth Planning', description: 'Pricing, offers, and channels engineered for revenue.', icon: BarChart3 },
      { title: 'Workflow Automation', description: 'Documented, automated workflows across your teams.', icon: Code2 },
      { title: 'Operational Support', description: 'Hands-on help running systems and processes day to day.', icon: Briefcase },
      { title: 'Software Consulting', description: 'What to build, buy, or integrate — and how to sequence it.', icon: AppWindow },
      { title: 'Market Research', description: 'Evidence on your market, customers, and opportunity.', icon: Search },
      { title: 'Competitor Analysis', description: 'Know what competitors do well and where you can win.', icon: Gauge },
      { title: 'Performance Analysis', description: 'Metrics that show what is working and what to change.', icon: LineChart },
      { title: 'Project Planning', description: 'Clear scope, milestones, and ownership before you build.', icon: ClipboardList },
      { title: 'Technical Documentation', description: 'Documentation your team can actually operate and extend.', icon: FileText },
    ],
    faqs: [
      { question: 'Can you act as our fractional CTO or technical advisor?', answer: 'Yes. We work with founders as a practical technical and strategy partner — advising on architecture, vendors, hiring, and delivery without full-time cost.' },
      { question: 'Do you consult without building anything?', answer: 'Yes. We offer standalone consulting — audits, roadmaps, and documentation — with no obligation to build.' },
      { question: 'How is this different from hiring an agency for one project?', answer: 'We stay engaged across strategy, build, and operation, so decisions made in planning are actually executed — one partner for the full journey.' },
    ],
    related: ['software-development', 'ai-machine-learning', 'digital-marketing'],
    keywords: ['business development services', 'IT consulting Kerala', 'business automation', 'startup technology partner', 'digital transformation'],
  },
  {
    slug: 'it-support-maintenance',
    title: 'IT Support & Maintenance',
    navLabel: 'IT Support',
    kicker: 'Support & maintenance',
    shortDescription:
      'AMC support, server and cloud management, database maintenance, website and software maintenance, security monitoring, backups, and technical support.',
    hubOrder: 9,
    pageTitle: 'IT Support & Maintenance Services in Kerala',
    metaDescription:
      'IT support and maintenance services in Kerala. AMC support, server management, cloud migration, database maintenance, security monitoring, and backups from HexaStack.',
    hero: {
      h1: 'IT Support & Maintenance That Keeps You Running',
      intro:
        'Your software is never really "done". We keep systems fast, secure, and reliable — with AMC plans, server and cloud management, backups, monitoring, and responsive technical support.',
    },
    features: [
      { title: 'AMC Support', description: 'Annual maintenance contracts with defined response and care.', icon: ShieldCheck },
      { title: 'Server Management', description: 'Server setup, updates, and 24/7 health monitoring.', icon: Server },
      { title: 'Cloud Migration', description: 'Move workloads to the cloud with minimal disruption.', icon: Cloud },
      { title: 'Database Maintenance', description: 'Backups, tuning, and safe migrations for your data.', icon: BarChart3 },
      { title: 'Software Maintenance', description: 'Updates, fixes, and improvements to keep software healthy.', icon: Wrench },
      { title: 'Website Maintenance', description: 'Content updates, security, and performance for your site.', icon: Globe },
      { title: 'Security Monitoring', description: 'Watch for threats, breaches, and vulnerabilities.', icon: ShieldCheck },
      { title: 'Backup Solutions', description: 'Automated, tested backups you can actually restore.', icon: FileText },
      { title: 'Performance Optimization', description: 'Speed up slow systems, queries, and load times.', icon: Gauge },
      { title: 'Technical Support', description: 'Responsive help for your team when things break.', icon: Users },
    ],
    faqs: [
      { question: 'Do you support systems you did not build?', answer: 'Yes. We maintain and support software and infrastructure regardless of who built it — after a quick audit and handover.' },
      { question: 'What does an AMC plan include?', answer: 'A typical plan covers monitoring, updates, security patches, backups, defined response times, and a set number of change requests per month.' },
      { question: 'How fast do you respond to issues?', answer: 'Response depends on your plan — from same-day for critical issues to scheduled maintenance for routine work.' },
    ],
    related: ['software-development', 'website-development', 'business-development'],
    keywords: ['IT support Kerala', 'AMC support', 'website maintenance', 'cloud migration Kerala', 'server management'],
  },
  {
    slug: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    navLabel: 'E-Commerce',
    kicker: 'E-commerce',
    shortDescription:
      'Shopify, WooCommerce, and custom online stores with payment gateway integration, inventory, and order management built for real sales.',
    hubOrder: 10,
    pageTitle: 'E-Commerce Development Company in Kerala',
    metaDescription:
      'E-commerce development company in Kerala. Shopify, WooCommerce, and custom online stores with payment gateways, inventory, and order management from HexaStack.',
    hero: {
      h1: 'E-Commerce Solutions That Sell',
      intro:
        'Shopify, WooCommerce, or fully custom — we build online stores with fast checkout, secure payments, and inventory and order systems that scale with your sales.',
    },
    features: [
      { title: 'Shopify', description: 'Fast to launch, fully customisable storefronts and apps.', icon: ShoppingCart },
      { title: 'WooCommerce', description: 'Flexible WordPress e-commerce with complete control.', icon: Code2 },
      { title: 'Custom Stores', description: 'Bespoke storefronts engineered for your exact business.', icon: AppWindow },
      { title: 'Payment Gateway Integration', description: 'Razorpay, Stripe, PayPal, and local gateways done right.', icon: CreditCard },
      { title: 'Inventory Management', description: 'Stock, variants, and reorder controls that never drift.', icon: ClipboardList },
      { title: 'Order Management', description: 'Orders, fulfilment, and returns managed in one place.', icon: BarChart3 },
    ],
    faqs: [
      { question: 'Shopify, WooCommerce, or custom — how do we choose?', answer: 'It depends on your catalogue, budget, and growth plan. Shopify is fast to launch, WooCommerce is flexible, and custom gives total control — we recommend based on your business.' },
      { question: 'Which payment gateways do you support?', answer: 'Razorpay, Stripe, PayPal, and India/GCC local gateways, with cards, UPI, and wallets as your market needs.' },
      { question: 'Can you migrate our existing store?', answer: 'Yes. We migrate products, customers, and orders with careful testing so your store keeps selling through the switch.' },
    ],
    related: ['website-development', 'digital-marketing', 'software-development'],
    keywords: ['e-commerce development Kerala', 'Shopify development', 'WooCommerce development', 'online store Kerala'],
  },
  {
    slug: 'educational-solutions',
    title: 'Educational Solutions',
    navLabel: 'Education',
    kicker: 'Education',
    shortDescription:
      'Student and teacher portals, learning management systems, online classes, digital libraries, attendance, and examination and result management.',
    hubOrder: 11,
    pageTitle: 'Educational Software Solutions in Kerala',
    metaDescription:
      'Educational software solutions in Kerala. Student and teacher portals, LMS, online classes, digital library, examination and result management from HexaStack.',
    hero: {
      h1: 'Digital Solutions for Schools, Colleges & Universities',
      intro:
        'Portals, learning management systems, online classes, digital libraries, and examination and result management — technology that makes education institutions easier to run and easier to learn in.',
    },
    audience: ['Schools', 'Colleges', 'Universities', 'Coaching Centers'],
    features: [
      { title: 'Student Portal', description: 'Admissions, notices, fees, and results in one student view.', icon: GraduationCap },
      { title: 'Teacher Portal', description: 'Classes, grading, attendance, and communication for faculty.', icon: Users },
      { title: 'Learning Management System', description: 'Courses, content, assignments, and progress tracking.', icon: Layers },
      { title: 'Online Classes', description: 'Live and recorded classes with scheduling and access.', icon: Smartphone },
      { title: 'Digital Library', description: 'Searchable resources students can access anytime.', icon: FileText },
      { title: 'Attendance System', description: 'Full attendance across classes and sections (see our flagship).', icon: UserCheck },
      { title: 'Examination Management', description: 'Exams, seating, invigilation, and evaluation workflows.', icon: ClipboardList },
      { title: 'Result Management', description: 'Marks, grading, reports, and secure result publishing.', icon: BarChart3 },
    ],
    faqs: [
      { question: 'Can it integrate with our existing student information system?', answer: 'Yes — portals and exam modules integrate with common SIS and ERP systems or run as a complete solution.' },
      { question: 'Is a mobile app available for parents and students?', answer: 'Yes, with attendance and result notifications for parents and a full student app where useful.' },
      { question: 'Is the system secure for student data?', answer: 'Yes. We follow access control, encryption, and data protection practices appropriate for educational institutions.' },
    ],
    related: ['attendance-management-system', 'website-development', 'software-development'],
    keywords: ['educational software Kerala', 'school management system', 'learning management system', 'student portal Kerala'],
  },
  {
    slug: 'healthcare-solutions',
    title: 'Healthcare Solutions',
    navLabel: 'Healthcare',
    kicker: 'Healthcare',
    shortDescription:
      'Hospital and clinic management, appointment booking, medical records, pharmacy and laboratory management — built for real healthcare workflows.',
    hubOrder: 12,
    pageTitle: 'Healthcare Software Solutions in Kerala',
    metaDescription:
      'Healthcare software solutions in Kerala. Hospital and clinic management, appointment booking, medical records, pharmacy and laboratory management from HexaStack.',
    hero: {
      h1: 'Software for Hospitals, Clinics & Laboratories',
      intro:
        'Hospital and clinic management, appointment booking, medical records, pharmacy and laboratory workflows — healthcare software designed around real clinical and operational workflows.',
    },
    audience: ['Hospitals', 'Clinics', 'Labs', 'Pharmacies'],
    features: [
      { title: 'Hospital Management', description: 'OPD, IPD, beds, billing, and administration in one system.', icon: Hospital },
      { title: 'Clinic Management', description: 'Scheduling, records, and billing for busy clinics.', icon: Stethoscope },
      { title: 'Appointment Booking', description: 'Online bookings, reminders, and reduced no-shows.', icon: CalendarDays },
      { title: 'Medical Records', description: 'Secure, accessible patient records across visits.', icon: FileText },
      { title: 'Pharmacy Management', description: 'Stock, dispensing, and expiry control for pharmacies.', icon: ShoppingCart },
      { title: 'Laboratory Management', description: 'Samples, tests, reports, and result delivery managed end to end.', icon: BarChart3 },
    ],
    faqs: [
      { question: 'Is patient data kept secure and compliant?', answer: 'Yes. We follow data protection practices and access control suitable for healthcare, keeping records encrypted and audited.' },
      { question: 'Can it integrate with lab machines and systems?', answer: 'Yes — lab instruments and existing HIS/software can be integrated to remove duplicate entry and errors.' },
      { question: 'Can patients book appointments online?', answer: 'Yes, with reminders by SMS/WhatsApp and direct calendar integration for staff.' },
    ],
    related: ['attendance-management-system', 'software-development', 'website-development'],
    keywords: ['healthcare software Kerala', 'hospital management system', 'clinic management software', 'medical records software'],
  },
]

const bySlug = new Map(serviceCategories.map((c) => [c.slug, c]))

export function getServiceCategory(slug: string): ServiceCategory | undefined {
  return bySlug.get(slug)
}

export function getServiceCategories(): ServiceCategory[] {
  return [...serviceCategories].sort((a, b) => a.hubOrder - b.hubOrder)
}

export function getFeaturedServiceCategories(count = 6): ServiceCategory[] {
  return getServiceCategories().slice(0, count)
}

export function getFlagshipService(): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.flagship)
}

/** Navigation groups for the Navbar "Services" dropdown. */
export function getNavGroups(): { label: string; items: { label: string; to: string }[] }[] {
  const bySlug = new Map(serviceCategories.map((c) => [c.slug, c]))
  const link = (slug: string) => {
    const c = bySlug.get(slug)!
    return { label: c.navLabel, to: `/services/${c.slug}` }
  }
  return [
    {
      label: 'Development',
      items: [link('software-development'), link('website-development'), link('mobile-app-development'), link('ecommerce-solutions')],
    },
    {
      label: 'AI & Data',
      items: [link('ai-machine-learning')],
    },
    {
      label: 'Design & Marketing',
      items: [link('ui-ux-design'), link('digital-marketing'), link('branding-creative')],
    },
    {
      label: 'Industry Solutions',
      items: [link('attendance-management-system'), link('educational-solutions'), link('healthcare-solutions')],
    },
    {
      label: 'Business & Ops',
      items: [link('business-development'), link('it-support-maintenance')],
    },
  ]
}
