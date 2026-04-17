import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { usePageSeo } from '../hooks/usePageSeo'
import { API_URL } from '../lib/utils'

type Post = {
  title: string
  excerpt: string
  category: string
  body: string
  featuredImageUrl: string | null
  dateIso?: string
}

export default function BlogPostDynamic() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [error, setError] = useState(false)
  const [resolvedSlug, setResolvedSlug] = useState('')

  const canonicalPath = `/blog/${slug}`

  usePageSeo({
    title: post ? `${post.title} | HexaStack Blog` : 'Post not found',
    description: post?.excerpt ?? 'This blog post is not available.',
    canonicalPath,
    robots: post ? undefined : 'noindex, nofollow',
  })

  const articleSchema = useMemo(() => {
    if (!post) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      datePublished: post.dateIso ?? new Date().toISOString().slice(0, 10),
      author: { '@type': 'Organization', name: 'HexaStack Solutions' },
      publisher: {
        '@type': 'Organization',
        name: 'HexaStack Solutions',
        url: 'https://www.hexastacksolutions.com',
      },
    }
  }, [post])

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    fetch(`${API_URL}/api/blog/post/${encodeURIComponent(slug)}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((data) => {
        if (!cancelled) {
          setPost(data)
          setError(false)
          setResolvedSlug(slug)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPost(null)
          setError(true)
          setResolvedSlug(slug)
        }
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  useEffect(() => {
    const scriptId = 'blog-post-article-schema'
    if (!articleSchema) {
      document.getElementById(scriptId)?.remove()
      return
    }
    let script = document.getElementById(scriptId) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(articleSchema)
    return () => {
      script?.remove()
    }
  }, [articleSchema])

  const loading = resolvedSlug !== slug

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="mb-6 text-[var(--muted-foreground)]">This post is not available or has not been published.</p>
        <Link to="/blog" className="font-semibold text-[var(--primary)] hover:underline">
          Back to blog
        </Link>
      </div>
    )
  }

  return (
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
  )
}
