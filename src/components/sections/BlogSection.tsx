import { Link } from 'react-router-dom'
import { sortedBlogPostsByDate } from '../../data/blogPosts'
import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'
import { GradientLink } from '../ui/GradientLink'
import { Section } from '../ui/Section'

/** Homepage → blog surfacing. Renders the 3 newest posts; internal links help discoverability. */
export function BlogSection() {
  const latest = sortedBlogPostsByDate().slice(0, 3)

  return (
    <Section className="border-t border-orange-100/80 bg-gradient-to-b from-white to-orange-50/30 !py-10 md:!py-16">
      <Container>
        <FadeInView className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">From the blog</p>
          <h2 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">Web development notes for Kerala and Gulf teams</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-text-muted">
            Practical write-ups on web development, speed, e-commerce, and choosing the right digital partner.
          </p>
        </FadeInView>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <FadeInView key={post.id} delay={i * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:border-orange-200 hover:shadow-md">
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src={post.coverImage}
                    alt={post.coverAlt}
                    width={800}
                    height={480}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{post.dateLabel}</p>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-text-primary">
                    <Link to={`/blog/${post.id}`} className="hover:text-orange-700">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-text-muted">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="mt-3 text-sm font-semibold text-orange-600 hover:text-orange-700">
                    Read more →
                  </Link>
                </div>
              </article>
            </FadeInView>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GradientLink to="/blog">View all posts</GradientLink>
          <Link to="/contact" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            Discuss your project →
          </Link>
        </div>
      </Container>
    </Section>
  )
}
