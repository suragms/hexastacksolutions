import type { CSSProperties } from 'react'
import { heroMarqueePrimary, heroMarqueeSecondary } from '../../data/heroMarqueeContent'

/* Colour tokens for alternating pill accents */
const DOT_COLOURS = [
  'bg-orange-500',
  'bg-violet-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-pink-500',
  'bg-amber-500',
  'bg-blue-500',
  'bg-rose-500',
]

function dot(i: number) {
  return DOT_COLOURS[i % DOT_COLOURS.length]
}

/* ── single scrolling track ──────────────────────────────────────────────── */
function Row({
  items,
  durationSec,
  reverse,
  variant = 'project',
}: {
  items: readonly string[]
  durationSec: number
  reverse?: boolean
  variant?: 'project' | 'category'
}) {
  const row = [...items, ...items]

  const wrapStyle = {
    '--marquee-duration': `${durationSec}s`,
    '--marquee-direction': reverse ? 'reverse' : 'normal',
  } as CSSProperties

  return (
    <div className="marquee-wrap relative overflow-hidden py-2" style={wrapStyle}>
      <div className="marquee-track flex w-max gap-3 pr-3 md:gap-4" aria-hidden>
        {row.map((label, i) => {
          if (variant === 'category') {
            return (
              <span
                key={`cat-${label}-${i}`}
                className="inline-flex shrink-0 items-center rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400"
              >
                <span className={`mr-1.5 h-1 w-1 shrink-0 rounded-full ${dot(i)} opacity-60`} />
                {label}
              </span>
            )
          }
          return (
            <span
              key={`proj-${label}-${i}`}
              className="inline-flex shrink-0 items-center rounded-full border border-zinc-200/80 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:text-sm"
            >
              <span className={`mr-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot(i)}`} />
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

/* Exported component */
export function HeroMarquee() {
  return (
    <div className="relative mt-10 w-full">
      {/* label */}
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted md:text-[11px]">
        Real clients · Real sectors · Real work
      </p>

      {/* strip container */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-b from-zinc-50/80 to-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
        {/* left fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-20"
          style={{ background: 'linear-gradient(to right, #f9f9f9, transparent)' }}
          aria-hidden
        />
        {/* right fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-20"
          style={{ background: 'linear-gradient(to left, #f9f9f9, transparent)' }}
          aria-hidden
        />

        {/* Row 1: client / project names */}
        <Row items={heroMarqueePrimary} durationSec={70} />

        {/* divider */}
        <div className="mx-4 border-t border-zinc-100" />

        {/* Row 2: industry categories */}
        <Row items={heroMarqueeSecondary} durationSec={55} reverse variant="category" />
      </div>
    </div>
  )
}
