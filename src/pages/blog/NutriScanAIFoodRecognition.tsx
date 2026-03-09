import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

export default function NutriScanAIFoodRecognition() {
    return (
        <Layout>
            <SEO
                title="NutriScan AI — Food Recognition App with GPT-4 Vision | HexaStack"
                description="NutriScan AI uses GPT-4 Vision to recognise food from a photo and give nutritional insights. Built by HexaStack Solutions, Thrissur."
                keywords="NutriScan AI, food recognition app, GPT-4 Vision, nutrition app Kerala"
                canonical="/blog/nutriscan-ai-food-recognition-app"
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                    NutriScan AI — Food Recognition App with GPT-4 Vision
                </h1>
                <p className="text-[var(--muted-foreground)] mb-8">
                    NutriScan AI is an app that uses AI vision to identify food from a photo and provide nutritional information. It's one of the products we've built at HexaStack using modern AI APIs, from our base in Thrissur, Kerala.
                </p>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">What It Does</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        Users take or upload a photo of their meal. The app uses GPT-4 Vision (and related AI) to recognise the food items and estimate portions. It then returns a breakdown that can include calories, macronutrients, and simple dietary tips. The goal is to make it easier for people to log meals and stay aware of nutrition without manual data entry.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">Why We Built It</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        We wanted to showcase how vision AI can solve a real problem — quick, low-friction food logging — and to gain hands-on experience with multimodal APIs. NutriScan is an example of the kind of AI-powered product we can build for startups, health and wellness brands, or F&B companies that want similar "see and understand" features in their apps.
                    </p>
                </section>
                <section className="space-y-6 mb-10">
                    <h2 className="text-xl font-semibold text-[var(--foreground)]">For Businesses</h2>
                    <p className="text-[var(--foreground)] leading-relaxed">
                        If you're looking for food recognition, nutrition estimation, or other AI vision features in your product — whether a consumer app, a healthcare tool, or an internal solution — we can help design and build it. We work with clients in Kerala, India, and the Gulf. Get in touch to discuss your use case and how we can integrate AI vision into your project.
                    </p>
                </section>
                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Talk to us about AI vision
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </Layout>
    );
}
