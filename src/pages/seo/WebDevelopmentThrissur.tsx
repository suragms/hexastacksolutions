import React from 'react';
import SEO from '../../components/SEO';
import { createFAQSchema, createLocalBusinessSchema } from '../../lib/seoSchemas';

const faqs = [
    {
        question: 'How much does a website cost in Thrissur?',
        answer: 'The cost of website development in Thrissur depends on the complexity, features, and platform. A basic business website starts around ₹20,000, while a custom ecommerce or complex web application can range from ₹50,000 to ₹2,000,000+. We provide a detailed quote after understanding your exact requirements.',
    },
    {
        question: 'Do you provide SEO services along with web development?',
        answer: 'Yes, all our websites are built with an SEO-first approach. We ensure technical SEO (Core Web Vitals, mobile responsiveness, schema markup) is implemented from day one. We also offer advanced monthly local SEO packages for businesses in Thrissur and Kerala.',
    },
    {
        question: 'How long does it take to build a business website?',
        answer: 'A standard corporate website takes about 2-4 weeks to design and develop. Custom web applications and ecommerce platforms typically take 6-12 weeks depending on the features and integrations required.',
    },
    {
        question: 'Can you redesign my existing website?',
        answer: 'Absolutely. We specialize in website redesigns focusing on improving user experience (UX), conversion rates, and modernizing the aesthetic to reflect a premium brand image.',
    },
];

const WebDevelopmentThrissur: React.FC = () => {
    const faqSchema = createFAQSchema(faqs);
    const localBusinessSchema = createLocalBusinessSchema({
        name: 'HexaStack Solutions - Web Development Thrissur',
        description: 'Premium web development and SEO company in Thrissur, Kerala.',
    });

    return (
        <div className="bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
            <SEO
                title="Web Development Company in Thrissur | HexaStack Solutions"
                description="Looking for the best web development company in Thrissur? HexaStack Solutions builds premium, high-converting websites, ecommerce stores, and web apps for local and global businesses."
                keywords="web development company Thrissur, website design Thrissur, ecommerce development Thrissur, web developers in Thrissur, custom software Thrissur, web design agency Kerala"
                canonical="/web-development-company-thrissur"
                schema={[faqSchema, localBusinessSchema]}
            />

            {/* 1. Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        #1 Web Development Agency in Thrissur
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                        We Build High-Converting <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Websites & Web Apps</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Transform your digital presence with Thrissur's premier web development company. We create lightning-fast, SEO-optimized, and beautifully designed digital experiences that drive real business growth.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-orange-500/30">
                            Get Free Website Audit
                        </a>
                        <a href="https://wa.me/919074092490" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50 text-slate-800 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. Trust Indicators */}
            <section className="py-10 border-y border-slate-100 bg-white">
                <div className="container mx-auto px-6">
                    <p className="text-center text-sm font-semibold text-slate-400 mb-6 uppercase tracking-wider">Trusted by innovative businesses across Kerala & UAE</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder for Client Logos */}
                        <div className="text-xl font-bold font-serif">Oripio</div>
                        <div className="text-xl font-bold font-serif">MedCare</div>
                        <div className="text-xl font-bold font-serif">EduTech</div>
                        <div className="text-xl font-bold font-serif">RealEstate Pro</div>
                        <div className="text-xl font-bold font-serif">RetailPlus</div>
                    </div>
                </div>
            </section>

            {/* 3. Services Overview */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Comprehensive Web Solutions</h2>
                        <p className="text-slate-600">From simple landing pages to complex enterprise web applications, we have the technical expertise to bring your vision to life.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Corporate Websites', desc: 'Premium, fast, and SEO-optimized business websites that establish your brand authority and generate quality leads.', icon: '🏢' },
                            { title: 'Ecommerce Development', desc: 'Custom, scalable online stores with secure payment gateways and seamless inventory management.', icon: '🛒' },
                            { title: 'Custom Web Applications', desc: 'Complex SaaS platforms, ERP systems, and internal tools built with scalable modern web technologies.', icon: '💻' }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Why Choose Us */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Why We Are The Best Choice in Thrissur</h2>
                            <p className="text-slate-400 mb-8 text-lg">We don't just write code. We build digital businesses. Our approach combines engineering excellence with deep conversion psychology.</p>
                            <ul className="space-y-4">
                                {[
                                    '100% Custom Design (No cheap templates)',
                                    'Lightning Fast Load Times (Core Web Vitals optimized)',
                                    'Built-in Technical SEO Architecture',
                                    'Mobile-First Responsive Experiences',
                                    'Transparent Process & Timely Delivery'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                                        <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-slate-800 p-8 rounded-3xl relative">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="bg-slate-700/50 p-6 rounded-2xl text-center">
                                    <div className="text-4xl font-extrabold text-orange-400 mb-1">50+</div>
                                    <div className="text-sm text-slate-400">Projects Delivered</div>
                                </div>
                                <div className="bg-slate-700/50 p-6 rounded-2xl text-center">
                                    <div className="text-4xl font-extrabold text-orange-400 mb-1">100%</div>
                                    <div className="text-sm text-slate-400">Client Satisfaction</div>
                                </div>
                                <div className="bg-slate-700/50 p-6 rounded-2xl text-center col-span-2">
                                    <div className="text-4xl font-extrabold text-orange-400 mb-1">99/100</div>
                                    <div className="text-sm text-slate-400">Average Google PageSpeed Score</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Technologies */}
            <section className="py-20 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-10">Modern Tech Stack for Modern Businesses</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'AWS'].map((tech) => (
                            <span key={tech} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium text-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Process Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Our Development Process</h2>
                        <p className="text-slate-600">A structured, transparent approach to ensure your project's success from concept to launch.</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { num: '01', title: 'Discovery', desc: 'We analyze your business goals, target audience, and competitors.' },
                            { num: '02', title: 'Design', desc: 'Crafting premium, conversion-focused UI/UX that aligns with your brand.' },
                            { num: '03', title: 'Development', desc: 'Writing clean, scalable, and highly performant code.' },
                            { num: '04', title: 'Launch', desc: 'Rigorous testing, SEO optimization, and going live.' }
                        ].map((step) => (
                            <div key={step.num} className="relative">
                                <div className="text-6xl font-black text-slate-200 mb-4 absolute -top-8 -left-4 z-0 opacity-50">{step.num}</div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-slate-600">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Case Studies (Simplified for now) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Recent Projects</h2>
                            <p className="text-slate-600">See how we've helped businesses transform their digital presence.</p>
                        </div>
                        <a href="/portfolio" className="text-orange-600 font-semibold hover:text-orange-700 mt-4 md:mt-0 flex items-center gap-1">
                            View All Work <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mock Case Study 1 */}
                        <div className="group block overflow-hidden rounded-2xl bg-slate-100">
                            <div className="aspect-[4/3] w-full bg-slate-200 relative overflow-hidden">
                                {/* Replace with actual image */}
                                <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-500 font-medium">Project Image Placeholder</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Oripio Healthcare Platform</h3>
                                <p className="text-slate-600 mb-4">Complete UI/UX redesign and web application development for a leading healthcare startup.</p>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-white text-slate-600 text-xs rounded font-medium border border-slate-200">Next.js</span>
                                    <span className="px-2 py-1 bg-white text-slate-600 text-xs rounded font-medium border border-slate-200">Healthcare</span>
                                </div>
                            </div>
                        </div>
                         {/* Mock Case Study 2 */}
                         <div className="group block overflow-hidden rounded-2xl bg-slate-100">
                            <div className="aspect-[4/3] w-full bg-slate-200 relative overflow-hidden">
                                {/* Replace with actual image */}
                                <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-500 font-medium">Project Image Placeholder</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Retail ERP Dashboard</h3>
                                <p className="text-slate-600 mb-4">Custom built ERP solution for inventory and sales management with real-time analytics.</p>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-white text-slate-600 text-xs rounded font-medium border border-slate-200">React</span>
                                    <span className="px-2 py-1 bg-white text-slate-600 text-xs rounded font-medium border border-slate-200">ERP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Testimonials */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Client Success Stories</h2>
                        <p className="text-slate-600">Don't just take our word for it.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Mock Testimonial */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex text-yellow-400 mb-4">★★★★★</div>
                            <p className="text-slate-700 italic mb-6">"HexaStack delivered exactly what we needed. Our new website is fast, looks amazing, and we've seen a 40% increase in online inquiries since the launch."</p>
                            <div>
                                <div className="font-bold text-slate-900">Rahul K.</div>
                                <div className="text-sm text-slate-500">Business Owner, Thrissur</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. FAQ Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-slate-50 p-6 rounded-2xl">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                                <p className="text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. Final CTA */}
            <section id="contact" className="py-24 bg-orange-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Grow Your Business?</h2>
                    <p className="text-orange-100 max-w-2xl mx-auto mb-10 text-lg">
                        Let's discuss your project. Get a free consultation and a detailed technical roadmap for your new website.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="mailto:hello@hexastacksolutions.com" className="w-full sm:w-auto px-8 py-4 bg-white text-orange-600 hover:bg-slate-50 rounded-full font-bold transition-all shadow-xl">
                            Request a Quote
                        </a>
                        <a href="https://wa.me/919074092490" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-orange-700 hover:bg-orange-800 text-white border border-orange-500 rounded-full font-bold transition-all flex items-center justify-center gap-2">
                            Chat via WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebDevelopmentThrissur;
