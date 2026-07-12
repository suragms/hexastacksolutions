# 24 — Style, Scroll, Transitions & Hooks

Use this **before** inventing new CSS, animations, or page headings. Pair with `01-FRONTEND.md` (classes), `12-MOBILE-UX.md` (breakpoints), `14-PSYCHOLOGICAL-COPY.md` (words), `02-SEO.md` (meta).

## Reality (this repo)

- Canonical stylesheet: **`src/index.css` only** (imported from `main.tsx`). Do not reintroduce `globals.css` or a second `overflow-x` / `scroll-behavior` root.
- Live brand: **light + orange** (`#ea580c`) + WhatsApp green (`#25D366`). Do not rebrand to dark purple glass.
- Active nav: `layout/Navbar.tsx` + `useNavbarScroll` (threshold 80). Blur **only when scrolled solid**.

## Checklist (ship gate)

```
□ One stylesheet only (index.css)
□ H1 + subhead readable alone as a hook (place + proof, or pain + answer)
□ No emoji in UI chrome; lucide-react icons only
□ No more than one accent beyond white/black/green/orange brand
□ backdrop-blur in at most one place (sticky nav when scrolled)
□ No fixed/sticky FABs overlapping at 375px
□ whileInView + once:true on scroll-triggered animation
□ Skeleton on every public data fetch — never blank flash or center spinner
□ Section heading is a specific claim, not a category label
```

## Scroll

- Root: `overflow-x: clip` + one `scroll-behavior: smooth`; reduced-motion turns scroll to `auto` and kills marquee/portfolio-scroll (same pattern as `.portfolio-track`).
- No page-level `scroll-snap-type`.
- FAB stack: Quote at `bottom-[5.5rem] right-4`; WhatsApp at `bottom-4 right-4`.

## Motion tokens

```tsx
// Section (default):
{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.05 } }

// Hero (once per page):
{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } }

// Micro:
className="transition-colors duration-200"
```

Use `FadeInView` — do not invent per-component motion numbers. No route-level page fades.

## Hooks (H1)

Every page H1 must work alone on a slow connection:

| Page | Pattern |
|------|---------|
| Home | Place + proof (Thrissur / Gulf) |
| Services | Pain answered in H1 (2-hour reply) |
| Work | Real proof, not “Our Projects” |
| Contact | Speed trust (“Reply Within 2 Hours”) |
| Pricing | Price + no hidden fees |
| Blog post | Exact question the reader searched |

Section H2s: specific claims (“No Agency Fluff…”), never “Why Choose Us” / “Our Services” alone.
