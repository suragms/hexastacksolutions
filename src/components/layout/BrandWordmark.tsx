import { Link } from 'react-router-dom'

/** Clean wordmark: full company name; orange accents text only. */
export function BrandWordmark() {
  return (
    <Link
      to="/"
      className="group min-w-0 shrink-0"
      aria-label="HexaStack Solutions, Home"
    >
      <span className="block text-[15px] font-bold leading-tight tracking-tight text-zinc-900 sm:text-base md:text-lg">
        HexaStack{' '}
        <span className="text-orange-600">Solutions</span>
      </span>
      <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 sm:text-[11px]">
        Kerala · Gulf · Global
      </span>
    </Link>
  )
}
