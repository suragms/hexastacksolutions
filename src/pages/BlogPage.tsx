import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { FadeInView } from '../components/ui/FadeInView'
import { GradientLink } from '../components/ui/GradientLink'
import { Section } from '../components/ui/Section'
import { blogCategories, blogPosts, sortedBlogPostsByDate, type BlogPost } from '../data/blogPosts'
import { site } from '../data/site'
import { readAdminCategories } from '../lib/adminContent'
import { usePageSeo } from '../hooks/usePageSeo'

const siteLine = `${site.siteUrl.replace(/\/$/, '')}/`

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:border-orange-200 hover:shadow-md">
      <div className="relative aspect-[16/11] overflow-hidden bg-zinc-100">
        <img
          src={post.coverImage}
          alt={post.coverAlt}
          width={800}
          height={480}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-950/80 via-orange-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-4 pt-16">
          <span className="w-fit rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-orange-800 shadow-sm backdrop-blur-sm">
            {post.category}
          </span>
          <h2 className="text-lg font-bold leading-snug text-white drop-shadow-sm md:text-xl">
            <Link to={`/blog/${post.id}`} className="hover:underline focus-visible:underline">
              {post.title}
            </Link>
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-white/90">{post.excerpt}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end border-t border-border px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{post.dateLabel}</p>
        <p className="mt-1 truncate text-[11px] text-orange-700/90">
          <a href={site.siteUrl} className="hover:underline" target="_blank" rel="noopener noreferrer">
            {siteLine}
          </a>{' '}
          <span className="text-text-muted">Share this site when you discuss the topic.</span>
        </p>
        <Link to={`/blog/${post.id}`} className="mt-2 text-sm font-semibold text-orange-600 hover:text-orange-700">
          Read more →
        </Link>
      </div>
    </article>
  )
}

/** Sidebar: no cover image (avoids repeating the same art next to the grid). */
function SidebarPost({ post }: { post: BlogPost }) {
  const initials = post.category
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

  return (
    <li className="flex gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 text-xs font-bold text-orange-900 ring-1 ring-orange-200/80"
        aria-hidden
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">{post.dateLabel}</p>
        <p className="text-sm font-semibold leading-snug text-text-primary">{post.title}</p>
        <p className="mt-1 text-[11px] text-orange-700/80">
          <a href={site.siteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {siteLine}
          </a>
        </p>
      </div>
    </li>
  )
}

function useMergedCategories(): string[] {
  const [extra, setExtra] = useState<string[]>(() => readAdminCategories())

  useEffect(() => {
    function sync() {
      setExtra(readAdminCategories())
    }
    window.addEventListener('hs-admin-content-updated', sync)
    return () => window.removeEventListener('hs-admin-content-updated', sync)
  }, [])

  return useMemo(() => {
    const base = blogCategories()
    const merged = [...new Set([...base, ...extra])].sort((a, b) => a.localeCompare(b))
    return merged
  }, [extra])
}

export function BlogPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string>('All')
  const mergedCats = useMergedCategories()

  usePageSeo({
    title: 'Blog | VAT, POS, ERP, SEO & digital marketing | HexaStack Kerala & Gulf',
    description:
      'Articles on VAT billing UAE, POS and ERP rollout, technical SEO, web performance, and digital marketing for Kerala, UAE, Saudi Arabia, GCC, and global B2B teams.',
    canonicalPath: '/blog',
  })

  const categories = useMemo(() => ['All', ...mergedCats], [mergedCats])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return sortedBlogPostsByDate().filter((p) => {
      const matchCat = cat === 'All' || p.category === cat
      const matchQ =
        !needle ||
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle))
      return matchCat && matchQ
    })
  }, [q, cat])

  const featured = useMemo(() => blogPosts.filter((p) => p.featured).slice(0, 3), [])
  const latest = useMemo(() => sortedBlogPostsByDate().slice(0, 5), [])

  const strip = filtered.slice(0, 3)
  const rest = filtered.slice(3)

  return (
    <div className="bg-gradient-to-b from-orange-50/40 via-white to-white">
      <Section className="pt-24 md:pt-28">
        <Container>
          <FadeInView className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700">
              Blog
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Discover our latest notes
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-text-muted">
              2026 trends, VAT/POS/ERP topics, and SEO for Gulf B2B—horizontal layout: top row + grid + sidebar (no
              repeated thumbnails in the list).
            </p>
          </FadeInView>

          <FadeInView className="mx-auto mt-10 max-w-3xl" delay={0.05}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search topics, VAT, POS, SEO…"
                  className="w-full min-w-0 rounded-2xl border border-border bg-white py-3.5 pl-12 pr-4 text-base text-text-primary shadow-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100 sm:text-sm"
                  aria-label="Search blog posts"
                />
              </div>
              <GradientLink to="/contact" className="justify-center sm:shrink-0">
                Get Free Website Consultation
              </GradientLink>
            </div>
          </FadeInView>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  cat === c
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-900/10'
                    : 'border border-border bg-white text-text-primary hover:border-orange-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Top row: horizontal scroll on small screens, 3 columns on md+ */}
          {strip.length > 0 && (
            <div className="mt-10">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-orange-600 md:text-left">
                Latest row
              </p>
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
                {strip.map((post, i) => (
                  <div
                    key={post.id}
                    className="w-[min(20rem,calc(100vw-2rem))] max-w-[340px] shrink-0 snap-start md:w-auto md:min-w-0 md:max-w-none"
                  >
                    <FadeInView delay={i * 0.04}>
                      <BlogCard post={post} />
                    </FadeInView>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:gap-12">
            <div className="min-w-0 flex-1">
              {rest.length === 0 && strip.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-text-muted">
                  No posts match. Clear search or pick &ldquo;All&rdquo;.
                </p>
              ) : rest.length > 0 ? (
                <>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange-600">More topics</p>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {rest.map((post, i) => (
                      <FadeInView key={post.id} delay={i * 0.03}>
                        <BlogCard post={post} />
                      </FadeInView>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <aside className="w-full shrink-0 space-y-10 lg:w-80">
              <FadeInView>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600">Featured</h2>
                <ul className="mt-4 space-y-4">
                  {featured.map((post) => (
                    <SidebarPost key={post.id} post={post} />
                  ))}
                </ul>
              </FadeInView>
              <FadeInView delay={0.06}>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600">Latest</h2>
                <ul className="mt-4 space-y-4">
                  {latest.map((post) => (
                    <SidebarPost key={`latest-${post.id}`} post={post} />
                  ))}
                </ul>
              </FadeInView>
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50/80 to-white p-5 text-sm text-text-muted">
                <p className="font-semibold text-text-primary">HexaStack Solutions</p>
                <p className="mt-2 leading-relaxed">
                  Every post should end with your live site for backlinks and trust.{' '}
                  <a
                    href={site.siteUrl}
                    className="font-medium text-orange-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {siteLine}
                  </a>
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-border pt-10">
            <GradientLink to="/contact">Start Your Project Today</GradientLink>
            <p className="text-center text-sm text-text-muted">
              Guest posts or speaking—use the same{' '}
              <Link to="/contact" className="font-semibold text-orange-600 hover:text-orange-700">
                contact form
              </Link>{' '}
              and we&apos;ll reply quickly.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}
