import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { cn } from '@/lib/utils';

export interface PortfolioCardProps {
  category: string;
  techLabel: string;
  name: string;
  outcome: string;
  problem: string;
  techStack: string[];
  to: string;
  featured?: boolean;
}

export function PortfolioCard({
  category,
  techLabel,
  name,
  outcome,
  problem,
  techStack,
  to,
  featured,
}: PortfolioCardProps) {
  const tagColorClass = cn(
    'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border',
    category.toLowerCase().includes('pos') || category.toLowerCase().includes('billing')
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : category.toLowerCase().includes('saas')
      ? 'bg-indigo-50 text-indigo-700 border-indigo-100'
      : 'bg-sky-50 text-sky-700 border-sky-100'
  );

  return (
    <GlassCard
      as="article"
      className={cn(
        'relative flex flex-col h-full p-6 focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)] outline-none transition-transform duration-200 ease-out',
        'hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]',
        featured && 'border-t-4 border-t-[var(--primary)]'
      )}
      tabIndex={0}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={tagColorClass}>
          {category} · {techLabel}
        </span>
      </div>

      <h3 className="text-base sm:text-[17px] font-semibold text-[var(--foreground)] mb-2">
        {name}
      </h3>

      <p className="text-sm font-medium text-[var(--accent)] flex items-center gap-1 mb-2">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        <span className="uppercase tracking-[0.18em] text-[10px] text-[var(--muted-foreground)]">
          RESULT
        </span>
        <span className="text-[var(--accent)]">{outcome}</span>
      </p>

      <p className="text-[13px] text-[var(--muted-foreground)] mb-3">
        {problem}
      </p>

      <div className="flex items-center gap-1.5 flex-wrap mb-4" aria-label="Tech stack">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center justify-center h-6 px-2 rounded-full border border-[var(--border)] bg-[var(--surface-raised,rgba(249,250,251,0.9))] text-[11px] text-[var(--muted-foreground)]"
            title={tech}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="text-[11px] text-[var(--muted-foreground)]">
          Press Tab + Enter to open
        </span>
        <Link
          to={to}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150"
        >
          View Case Study <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </GlassCard>
  );
}

