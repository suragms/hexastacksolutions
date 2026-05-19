import { site } from './site'

export interface LocalSeoPageData {
  slug: string
  title: string
  metaDescription: string
  h1: string
  heroSubtitle: string
  heroDescription: string
  serviceFocus: string
  location: string
  locationShort: string
  canonicalPath: string
  faqs: { question: string; answer: string }[]
  services: { title: string; description: string; icon: string }[]
  stats: { value: string; label: string }[]
  processSteps: { num: string; title: string; desc: string }[]
  techStack: string[]
  whyChooseUs: string[]
}

export const LOCAL_SEO_PAGES: LocalSeoPageData[] = [
  {
    slug: 'web-development-company-thrissur',
    title: 'Best Web Development Company in Thrissur | HexaStack Solutions',
    metaDescription: 'Looking for the best web development company in Thrissur? HexaStack Solutions builds premium websites, ecommerce stores, and web apps with SEO-first architecture.',
    h1: 'Web Development Company in Thrissur',
    heroSubtitle: '#1 Rated Web Development Agency in Thrissur',
    heroDescription: 'Transform your business with Thrissur\'s premier web development company. We build lightning-fast, SEO-optimized websites and web applications that drive real business growth and generate quality leads.',
    serviceFocus: 'Web Development',
    location: 'Thrissur, Kerala',
    locationShort: 'Thrissur',
    canonicalPath: '/web-development-company-thrissur',
    faqs: [
      { question: 'How much does website development cost in Thrissur?', answer: 'Website development cost in Thrissur varies based on complexity. A business website starts from ₹25,000, while custom web applications range from ₹1,00,000 to ₹10,00,000+. We provide transparent quotes after understanding your requirements.' },
      { question: 'How long does it take to build a website?', answer: 'A standard business website takes 2-4 weeks. Custom web applications and ecommerce platforms take 6-12 weeks depending on features and integrations required.' },
      { question: 'Do you provide SEO with web development?', answer: 'Yes, all our websites are built with technical SEO architecture from day one — Core Web Vitals optimization, schema markup, semantic HTML, and mobile-first responsive design.' },
      { question: 'Can you redesign my existing website?', answer: 'Absolutely. We specialize in website redesigns that improve performance, user experience, and conversion rates while preserving your existing SEO equity.' },
      { question: 'What technologies do you use for web development?', answer: 'We use modern technologies including React, Next.js, TypeScript, Node.js, PostgreSQL, and Tailwind CSS to build fast, scalable, and maintainable web applications.' },
    ],
    services: [
      { title: 'Corporate Websites', description: 'Premium business websites with SEO-first architecture, fast load times, and conversion-optimized design.', icon: '🏢' },
      { title: 'Ecommerce Development', description: 'Custom online stores with secure payments, inventory management, and scalable infrastructure.', icon: '🛒' },
      { title: 'Web Applications', description: 'Complex SaaS platforms, ERP dashboards, and internal tools built with modern frameworks.', icon: '💻' },
    ],
    stats: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '99/100', label: 'Avg PageSpeed Score' },
      { value: '100%', label: 'Client Satisfaction' },
      { value: '3x', label: 'Avg Lead Increase' },
    ],
    processSteps: [
      { num: '01', title: 'Discovery & Strategy', desc: 'We analyze your business goals, target audience, competitors, and define a clear project roadmap.' },
      { num: '02', title: 'UI/UX Design', desc: 'Premium, conversion-focused interface design aligned with your brand identity and user expectations.' },
      { num: '03', title: 'Development & SEO', desc: 'Clean, scalable code with built-in technical SEO, Core Web Vitals optimization, and schema markup.' },
      { num: '04', title: 'Launch & Growth', desc: 'Rigorous testing, performance optimization, analytics setup, and ongoing growth support.' },
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'AWS', 'Vercel'],
    whyChooseUs: [
      '100% Custom Design — No cheap templates or WordPress themes',
      'Core Web Vitals Optimized — 90+ Lighthouse scores guaranteed',
      'Built-in Technical SEO Architecture from day one',
      'Mobile-First Responsive Design for all devices',
      'Transparent Process with weekly progress updates',
      'Post-Launch Support and maintenance included',
    ],
  },
  {
    slug: 'seo-company-thrissur',
    title: 'Best SEO Company in Thrissur | HexaStack Solutions',
    metaDescription: 'Results-driven SEO company in Thrissur. We help Kerala businesses rank higher on Google with technical SEO, local SEO, and content authority strategies.',
    h1: 'SEO Company in Thrissur',
    heroSubtitle: 'Data-Driven SEO Agency in Thrissur',
    heroDescription: 'Stop losing customers to competitors on Google. Our technical SEO expertise and local search optimization strategies help Thrissur businesses dominate search results and generate consistent enquiries.',
    serviceFocus: 'SEO & Digital Growth',
    location: 'Thrissur, Kerala',
    locationShort: 'Thrissur',
    canonicalPath: '/seo-company-thrissur',
    faqs: [
      { question: 'How much does SEO cost in Thrissur?', answer: 'SEO packages in Thrissur start from ₹10,000/month for local SEO to ₹50,000+/month for enterprise SEO campaigns. We provide customized plans based on your industry and competition level.' },
      { question: 'How long does SEO take to show results?', answer: 'Most businesses see measurable improvements within 3-6 months. Local SEO results can appear faster (1-3 months), while competitive national keywords may take 6-12 months.' },
      { question: 'Do you guarantee first page rankings?', answer: 'No ethical SEO company can guarantee specific rankings. However, we guarantee transparent reporting, proven strategies, and measurable growth in organic traffic and enquiries.' },
      { question: 'What SEO services do you offer?', answer: 'We offer technical SEO audits, on-page optimization, local SEO, content strategy, link building, Core Web Vitals optimization, schema markup, and Google Business Profile optimization.' },
    ],
    services: [
      { title: 'Technical SEO', description: 'Core Web Vitals optimization, schema markup, site architecture, and crawlability improvements.', icon: '⚙️' },
      { title: 'Local SEO', description: 'Google Business Profile optimization, local citations, map rankings, and geo-targeted content.', icon: '📍' },
      { title: 'Content & Authority', description: 'Topical authority building through strategic content clusters, link building, and E-E-A-T optimization.', icon: '📝' },
    ],
    stats: [
      { value: '200%', label: 'Avg Traffic Increase' },
      { value: '3x', label: 'Lead Generation Growth' },
      { value: '50+', label: 'Keywords on Page 1' },
      { value: '90+', label: 'Lighthouse SEO Score' },
    ],
    processSteps: [
      { num: '01', title: 'SEO Audit', desc: 'Comprehensive technical audit covering 200+ ranking factors, competitor analysis, and keyword research.' },
      { num: '02', title: 'Strategy & Roadmap', desc: 'Custom SEO strategy with prioritized actions, content calendar, and measurable KPIs.' },
      { num: '03', title: 'Implementation', desc: 'On-page optimization, technical fixes, content creation, and authority building execution.' },
      { num: '04', title: 'Monitor & Scale', desc: 'Monthly reporting, ranking tracking, continuous optimization, and strategy refinement.' },
    ],
    techStack: ['Google Search Console', 'Google Analytics 4', 'Ahrefs', 'Screaming Frog', 'Schema.org', 'Core Web Vitals'],
    whyChooseUs: [
      'Developer-Led SEO — We fix technical issues at the code level',
      'Local SEO Specialists — Deep expertise in Kerala market',
      'Transparent Reporting — Monthly dashboards with real metrics',
      'No Long-Term Lock-In — Results speak for themselves',
      'Content + Technical — Both sides of SEO covered',
      'Proven Track Record — Consistent ranking improvements',
    ],
  },
  {
    slug: 'software-company-kerala',
    title: 'Best Software Company in Kerala | HexaStack Solutions',
    metaDescription: 'Top software company in Kerala building custom business software, ERP systems, and SaaS platforms. Enterprise-grade solutions from Thrissur for India and Gulf markets.',
    h1: 'Software Company in Kerala',
    heroSubtitle: 'Enterprise Software Development from Kerala',
    heroDescription: 'From custom business applications to enterprise ERP systems, we build software that transforms how Kerala businesses operate. Modern architecture, scalable infrastructure, and transparent delivery.',
    serviceFocus: 'Custom Software',
    location: 'Kerala, India',
    locationShort: 'Kerala',
    canonicalPath: '/software-company-kerala',
    faqs: [
      { question: 'What types of software does HexaStack build?', answer: 'We build custom CRM systems, ERP software, SaaS platforms, billing & POS systems, healthcare software, inventory management tools, and industry-specific business applications.' },
      { question: 'How much does custom software cost in Kerala?', answer: 'Custom software costs range from ₹2,00,000 for simple applications to ₹20,00,000+ for enterprise ERP systems. We provide fixed-scope quotes after discovery.' },
      { question: 'Do you work with businesses outside Kerala?', answer: 'Yes, we serve clients across India, UAE, Saudi Arabia, and other Gulf countries. Our remote delivery model ensures seamless collaboration regardless of location.' },
      { question: 'What is your development process?', answer: 'We follow an agile methodology with 2-week sprints, weekly demos, and transparent project tracking. You see progress every week and can provide feedback continuously.' },
    ],
    services: [
      { title: 'Custom Business Software', description: 'Tailored applications that automate your unique workflows and eliminate manual processes.', icon: '⚡' },
      { title: 'ERP & CRM Systems', description: 'Enterprise resource planning and customer management platforms built for your scale.', icon: '🏗️' },
      { title: 'SaaS Development', description: 'Multi-tenant cloud platforms with subscription billing, analytics, and scalable architecture.', icon: '☁️' },
    ],
    stats: [
      { value: '50+', label: 'Software Projects' },
      { value: '10+', label: 'Industries Served' },
      { value: '99.9%', label: 'System Uptime' },
      { value: '5+', label: 'Countries Served' },
    ],
    processSteps: [
      { num: '01', title: 'Discovery', desc: 'Deep-dive into your business processes, pain points, and goals to define the perfect solution.' },
      { num: '02', title: 'Architecture', desc: 'System design, database modeling, API planning, and technology stack selection.' },
      { num: '03', title: 'Agile Development', desc: 'Iterative development with 2-week sprints, continuous testing, and weekly stakeholder demos.' },
      { num: '04', title: 'Deploy & Support', desc: 'Production deployment, training, documentation, and ongoing maintenance support.' },
    ],
    techStack: ['React', 'Next.js', '.NET', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    whyChooseUs: [
      'Enterprise Architecture — Built for scale from day one',
      'Agile Delivery — See progress every 2 weeks',
      'Full-Stack Expertise — Frontend, backend, DevOps',
      'Industry Experience — Healthcare, retail, education, finance',
      'Post-Launch Support — We don\'t disappear after delivery',
      'Kerala + Gulf — Serving both markets with expertise',
    ],
  },
  {
    slug: 'mobile-app-development-kerala',
    title: 'Mobile App Development Company in Kerala | HexaStack Solutions',
    metaDescription: 'Top mobile app development company in Kerala. We build high-performance iOS and Android apps using React Native and Flutter for businesses across India and Gulf.',
    h1: 'Mobile App Development in Kerala',
    heroSubtitle: 'Premium Mobile App Development Agency',
    heroDescription: 'Build mobile apps that users love. From on-demand delivery apps to enterprise mobile solutions, we create high-performance iOS and Android applications that drive engagement and revenue.',
    serviceFocus: 'Mobile Apps',
    location: 'Kerala, India',
    locationShort: 'Kerala',
    canonicalPath: '/mobile-app-development-kerala',
    faqs: [
      { question: 'How much does mobile app development cost in Kerala?', answer: 'Mobile app costs in Kerala range from ₹1,50,000 for a simple app to ₹15,00,000+ for complex enterprise apps. Cross-platform (React Native/Flutter) apps are more cost-effective than building separate iOS and Android apps.' },
      { question: 'How long does it take to build a mobile app?', answer: 'A simple mobile app takes 8-12 weeks, while complex apps with custom backends, real-time features, and integrations can take 4-6 months.' },
      { question: 'Do you build for both iOS and Android?', answer: 'Yes. We primarily use React Native and Flutter for cross-platform development, allowing us to build for both platforms simultaneously with a single codebase.' },
      { question: 'Do you publish apps to App Store and Play Store?', answer: 'Yes, we handle the complete app submission process including store optimization (ASO), screenshots, descriptions, and compliance requirements.' },
    ],
    services: [
      { title: 'Cross-Platform Apps', description: 'React Native and Flutter apps that run natively on both iOS and Android from a single codebase.', icon: '📱' },
      { title: 'Enterprise Mobile', description: 'Internal business apps, field service tools, and mobile dashboards for enterprise teams.', icon: '🏢' },
      { title: 'On-Demand Apps', description: 'Delivery, booking, and marketplace apps with real-time tracking and payment integration.', icon: '🚀' },
    ],
    stats: [
      { value: '20+', label: 'Apps Launched' },
      { value: '4.8★', label: 'Avg Store Rating' },
      { value: '50K+', label: 'Total Downloads' },
      { value: '95%', label: 'Crash-Free Rate' },
    ],
    processSteps: [
      { num: '01', title: 'Product Strategy', desc: 'Define your app\'s core value proposition, user personas, and feature roadmap.' },
      { num: '02', title: 'UX/UI Design', desc: 'Mobile-native interface design following iOS and Android design guidelines.' },
      { num: '03', title: 'Development', desc: 'Cross-platform development with native performance, offline support, and push notifications.' },
      { num: '04', title: 'Launch & Iterate', desc: 'Store submission, ASO optimization, analytics setup, and iterative improvements.' },
    ],
    techStack: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Node.js', 'PostgreSQL', 'AWS', 'Expo'],
    whyChooseUs: [
      'Cross-Platform Expertise — One codebase, both platforms',
      'Native Performance — No compromise on speed',
      'Offline-First Architecture — Works without internet',
      'Push Notification Strategy — Retain and engage users',
      'App Store Optimization — Rank higher in stores',
      'Post-Launch Analytics — Data-driven improvements',
    ],
  },
  {
    slug: 'erp-software-kerala',
    title: 'ERP Software Development Company in Kerala | HexaStack Solutions',
    metaDescription: 'Custom ERP software development company in Kerala. We build tailored ERP systems for manufacturing, retail, healthcare, and service businesses across India and Gulf.',
    h1: 'ERP Software Development in Kerala',
    heroSubtitle: 'Custom ERP Solutions for Kerala Businesses',
    heroDescription: 'Stop managing your business with spreadsheets and disconnected tools. We build custom ERP systems that unify your operations — inventory, billing, HR, CRM, and reporting — into one powerful platform.',
    serviceFocus: 'ERP Software',
    location: 'Kerala, India',
    locationShort: 'Kerala',
    canonicalPath: '/erp-software-kerala',
    faqs: [
      { question: 'How much does custom ERP software cost in Kerala?', answer: 'Custom ERP costs in Kerala range from ₹5,00,000 for basic modules to ₹25,00,000+ for full enterprise systems. We offer modular pricing so you can start small and scale.' },
      { question: 'How long does ERP implementation take?', answer: 'A basic ERP with core modules takes 3-4 months. Full enterprise ERP with custom integrations, data migration, and training typically takes 6-12 months.' },
      { question: 'Can you integrate ERP with existing software?', answer: 'Yes, we build custom integrations with accounting software (Tally, QuickBooks), payment gateways, ecommerce platforms, and third-party APIs.' },
      { question: 'Do you offer ERP for specific industries?', answer: 'Yes — we have experience building ERP systems for manufacturing, retail, healthcare, restaurants, education, and service-based businesses.' },
    ],
    services: [
      { title: 'Custom ERP Systems', description: 'End-to-end enterprise resource planning systems tailored to your business processes.', icon: '🏗️' },
      { title: 'POS & Billing', description: 'Point-of-sale systems with GST/VAT compliance, inventory tracking, and multi-branch support.', icon: '💳' },
      { title: 'Business Intelligence', description: 'Real-time dashboards, analytics, and reporting tools for data-driven decision making.', icon: '📊' },
    ],
    stats: [
      { value: '30+', label: 'ERP Deployments' },
      { value: '40%', label: 'Avg Efficiency Gain' },
      { value: '99.9%', label: 'System Uptime' },
      { value: '10+', label: 'Industries Served' },
    ],
    processSteps: [
      { num: '01', title: 'Business Analysis', desc: 'Map your existing workflows, identify bottlenecks, and define ERP requirements.' },
      { num: '02', title: 'System Design', desc: 'Module architecture, data modeling, integration planning, and user role mapping.' },
      { num: '03', title: 'Modular Build', desc: 'Iterative development of core modules — billing, inventory, HR, CRM — with stakeholder feedback.' },
      { num: '04', title: 'Deploy & Train', desc: 'Data migration, user training, go-live support, and continuous optimization.' },
    ],
    techStack: ['React', '.NET', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Azure', 'Elasticsearch'],
    whyChooseUs: [
      'Custom-Built — Not generic software with unnecessary features',
      'Modular Architecture — Start small, scale as you grow',
      'GST & VAT Ready — Compliance built in for India and Gulf',
      'Multi-Branch Support — Centralized management across locations',
      'Real-Time Analytics — Live dashboards and automated reports',
      'Kerala + Gulf Expertise — Understanding of both markets',
    ],
  },
  {
    slug: 'ai-automation-company-kerala',
    title: 'AI Automation Company in Kerala | HexaStack Solutions',
    metaDescription: 'Leading AI automation company in Kerala. We build custom AI chatbots, workflow automation, and intelligent business systems for companies across India and Gulf.',
    h1: 'AI Automation Company in Kerala',
    heroSubtitle: 'AI-Powered Business Automation from Kerala',
    heroDescription: 'Automate repetitive work, reduce costs, and make smarter decisions with custom AI solutions. From intelligent chatbots to predictive analytics, we help Kerala businesses harness the power of artificial intelligence.',
    serviceFocus: 'AI Automation',
    location: 'Kerala, India',
    locationShort: 'Kerala',
    canonicalPath: '/ai-automation-company-kerala',
    faqs: [
      { question: 'What AI automation services do you offer?', answer: 'We build custom AI chatbots, workflow automation systems, document processing tools, predictive analytics platforms, and AI-integrated business software.' },
      { question: 'How much does AI automation cost?', answer: 'AI automation projects range from ₹1,00,000 for simple chatbots to ₹15,00,000+ for complex custom AI systems. We provide detailed scoping after understanding your automation needs.' },
      { question: 'Can AI automation work for small businesses?', answer: 'Absolutely. Simple automations like WhatsApp chatbots, lead qualification, and document processing can save small businesses 10-20 hours per week at affordable costs.' },
      { question: 'Do you integrate AI with existing software?', answer: 'Yes, we integrate AI capabilities into your existing CRM, ERP, website, and business tools through custom APIs and plugins.' },
    ],
    services: [
      { title: 'AI Chatbots', description: 'Intelligent conversational agents for customer support, lead qualification, and appointment booking.', icon: '🤖' },
      { title: 'Workflow Automation', description: 'End-to-end business process automation using AI to eliminate manual, repetitive tasks.', icon: '⚡' },
      { title: 'Predictive Analytics', description: 'AI-powered forecasting, demand prediction, and data-driven decision support systems.', icon: '📈' },
    ],
    stats: [
      { value: '70%', label: 'Task Automation Rate' },
      { value: '50%', label: 'Cost Reduction' },
      { value: '24/7', label: 'AI Availability' },
      { value: '10x', label: 'Processing Speed' },
    ],
    processSteps: [
      { num: '01', title: 'AI Readiness Audit', desc: 'Evaluate your business processes and identify the highest-impact automation opportunities.' },
      { num: '02', title: 'Solution Design', desc: 'Design the AI architecture, data pipelines, and integration points with your existing systems.' },
      { num: '03', title: 'Build & Train', desc: 'Develop custom AI models, train on your data, and iteratively improve accuracy.' },
      { num: '04', title: 'Deploy & Monitor', desc: 'Production deployment with monitoring, feedback loops, and continuous model improvement.' },
    ],
    techStack: ['Python', 'OpenAI', 'LangChain', 'TensorFlow', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    whyChooseUs: [
      'Custom AI — Not generic chatbot builders',
      'Business-First Approach — We solve problems, not sell technology',
      'Data Privacy — Your data stays secure and private',
      'Integration Experts — Works with your existing tools',
      'Measurable ROI — Clear metrics on automation impact',
      'Ongoing Optimization — AI models improve over time',
    ],
  },
  {
    slug: 'website-design-company-thrissur',
    title: 'Website Design Company in Thrissur | HexaStack Solutions',
    metaDescription: 'Premium website design company in Thrissur creating stunning, conversion-optimized websites for local businesses. Modern UI/UX design with SEO-first approach.',
    h1: 'Website Design Company in Thrissur',
    heroSubtitle: 'Premium Website Design Agency in Thrissur',
    heroDescription: 'Your website is your most powerful salesperson. We design stunning, conversion-optimized websites that make your Thrissur business stand out from competitors and convert visitors into paying customers.',
    serviceFocus: 'Website Design',
    location: 'Thrissur, Kerala',
    locationShort: 'Thrissur',
    canonicalPath: '/website-design-company-thrissur',
    faqs: [
      { question: 'What makes your website designs different?', answer: 'We focus on conversion psychology, not just aesthetics. Every design decision — from color choices to CTA placement — is backed by UX research and optimized for generating enquiries and sales.' },
      { question: 'How much does website design cost in Thrissur?', answer: 'Website design in Thrissur ranges from ₹20,000 for a landing page to ₹2,00,000+ for premium multi-page business websites with custom illustrations and animations.' },
      { question: 'Do you design logos and branding?', answer: 'Yes, we offer complete brand identity design including logos, color palettes, typography systems, and brand guidelines alongside website design.' },
      { question: 'Will my website work on mobile phones?', answer: 'Absolutely. All our websites are designed mobile-first, ensuring perfect experience across smartphones, tablets, laptops, and desktops.' },
    ],
    services: [
      { title: 'UI/UX Design', description: 'Research-backed interface design that looks premium and converts visitors into customers.', icon: '🎨' },
      { title: 'Brand Identity', description: 'Complete visual branding — logos, color systems, typography, and design guidelines.', icon: '✨' },
      { title: 'Landing Pages', description: 'High-converting single-page designs optimized for Google Ads and social media campaigns.', icon: '🎯' },
    ],
    stats: [
      { value: '50+', label: 'Websites Designed' },
      { value: '3x', label: 'Avg Conversion Lift' },
      { value: '99/100', label: 'Design Quality Score' },
      { value: '100%', label: 'Mobile Responsive' },
    ],
    processSteps: [
      { num: '01', title: 'Brand Discovery', desc: 'Understand your brand personality, target audience, and competitive positioning.' },
      { num: '02', title: 'Wireframing', desc: 'Create information architecture and low-fidelity wireframes for user flow optimization.' },
      { num: '03', title: 'Visual Design', desc: 'Premium high-fidelity design with micro-interactions, animations, and responsive layouts.' },
      { num: '04', title: 'Development', desc: 'Pixel-perfect frontend development with SEO optimization and performance tuning.' },
    ],
    techStack: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion', 'Next.js', 'TypeScript'],
    whyChooseUs: [
      'Conversion-First Design — Beautiful AND effective',
      'No Templates — Every design is 100% custom',
      'Mobile-First — Perfect on every screen size',
      'SEO-Optimized — Designed for Google from the start',
      'Fast Turnaround — First concepts in 5 business days',
      'Unlimited Revisions — Until you\'re 100% satisfied',
    ],
  },
]

const bySlug = new Map(LOCAL_SEO_PAGES.map((p) => [p.slug, p]))

export function getLocalSeoPage(slug: string): LocalSeoPageData | undefined {
  return bySlug.get(slug)
}

export function getAllLocalSeoSlugs(): string[] {
  return LOCAL_SEO_PAGES.map((p) => p.slug)
}
