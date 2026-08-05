import { Container } from '../ui/Container'
import { FadeInView } from '../ui/FadeInView'

const metrics = [
  {
    client: 'Local Retail Brand',
    industry: 'Ecommerce',
    before: 'Slow loading times, high cart abandonment.',
    after: '3x increase in mobile sales, sub-second load times.',
    stat: '+210%',
    statLabel: 'Conversion Rate',
  },
  {
    client: 'Gulf B2B Distributor',
    industry: 'Enterprise ERP',
    before: 'Manual invoice tracking, VAT compliance errors.',
    after: 'Fully automated VAT billing with multi-branch sync.',
    stat: '40 hrs',
    statLabel: 'Saved Per Week',
  },
  {
    client: 'Thrissur Service Agency',
    industry: 'Lead Generation',
    before: 'Zero organic traffic, invisible on Google Maps.',
    after: 'Ranking #1 for local keywords, consistent inquiries.',
    stat: '+350%',
    statLabel: 'Organic Leads',
  },
]

export function TrustMetrics() {
  return (
    <section className="bg-surface/30 py-12 md:py-16">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="section-kicker mx-auto mb-4">Proven Results</span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            We Build Digital Revenue Engines
          </h2>
          <p className="mt-4 text-text-muted">
            Don't just take our word for it. Here is the tangible business impact our engineering brings to clients across Kerala and the Gulf.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {metrics.map((metric, i) => (
            <FadeInView key={i} delay={i * 0.15}>
              <div className="glass-card card-hover relative h-full p-8 flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    {metric.industry}
                  </span>
                </div>
                
                <div className="mb-6">
                  <div className="text-4xl font-extrabold text-text-primary mb-1">
                    {metric.stat}
                  </div>
                  <div className="text-sm font-medium text-text-muted">
                    {metric.statLabel}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Before HexaStack</p>
                    <p className="text-sm text-text-muted line-through opacity-70">{metric.before}</p>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                  <div>
                    <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">After HexaStack</p>
                    <p className="text-sm font-medium text-text-primary">{metric.after}</p>
                  </div>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </Container>
    </section>
  )
}
