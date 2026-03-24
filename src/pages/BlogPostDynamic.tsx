import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { API_URL } from '@/lib/utils';
import { createBreadcrumbSchema } from '@/lib/seoSchemas';

type Post = {
    title: string;
    excerpt: string;
    category: string;
    body: string;
    featuredImageUrl: string | null;
};

export default function BlogPostDynamic() {
    const { slug = '' } = useParams<{ slug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        let cancelled = false;
        setLoading(true);
        setError(false);
        setPost(null);
        fetch(`${API_URL}/api/blog/post/${encodeURIComponent(slug)}`)
            .then((r) => {
                if (!r.ok) throw new Error('not found');
                return r.json();
            })
            .then((data) => {
                if (!cancelled) setPost(data);
            })
            .catch(() => {
                if (!cancelled) setError(true);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (loading) {
        return (
            <Layout>
                <div className="flex min-h-[40vh] items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
                </div>
            </Layout>
        );
    }

    if (error || !post) {
        return (
            <Layout>
                <SEO title="Post not found | HexaStack" description="This blog post is not available." canonical={`/blog/${slug}`} noindex />
                <div className="mx-auto max-w-2xl px-4 py-20 text-center">
                    <p className="text-[var(--muted-foreground)] mb-6">This post is not available or has not been published.</p>
                    <Link to="/blog" className="text-[var(--primary)] font-semibold hover:underline">
                        Back to blog
                    </Link>
                </div>
            </Layout>
        );
    }

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                headline: post.title,
                description: post.excerpt,
            },
            createBreadcrumbSchema([
                { name: 'Home', item: '/' },
                { name: 'Blog', item: '/blog' },
                { name: post.title, item: `/blog/${slug}` },
            ]),
        ],
    };

    return (
        <Layout>
            <SEO
                title={`${post.title} | HexaStack Blog`}
                description={post.excerpt}
                canonical={`/blog/${slug}`}
                schema={schemaOrg}
            />
            <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">{post.category}</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">{post.title}</h1>
                {post.featuredImageUrl ? (
                    <img src={post.featuredImageUrl} alt="" className="mt-8 w-full rounded-2xl border border-[var(--border)] object-cover" />
                ) : null}
                <div className="prose prose-slate mt-8 max-w-none text-[var(--foreground)] prose-p:text-[var(--muted-foreground)] prose-headings:text-[var(--foreground)]">
                    <ReactMarkdown>{post.body}</ReactMarkdown>
                </div>
                <div className="mt-12 border-t border-[var(--border)] pt-8">
                    <Link to="/blog" className="text-sm font-semibold text-[var(--primary)] hover:underline">
                        ← All guides
                    </Link>
                </div>
            </article>
        </Layout>
    );
}
