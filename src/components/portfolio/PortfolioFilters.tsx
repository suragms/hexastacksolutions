import type { PortfolioCategory } from '../../data/portfolioManifest'

type Props = {
  active: 'all' | PortfolioCategory
  onChange: (next: 'all' | PortfolioCategory) => void
  /** Categories that have at least one project */
  available: string[]
}

export function PortfolioFilters({ active, onChange, available }: Props) {
  const chips: { id: 'all' | PortfolioCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    ...available.map((c) => ({ id: c as PortfolioCategory, label: c })),
  ]

  return (
    <div
      className="scrollbar-thin flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter by category"
    >
      {chips.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'border-orange-500 bg-orange-50 text-text-primary'
                : 'border-border bg-card text-text-muted hover:border-orange-200 hover:text-text-primary'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
