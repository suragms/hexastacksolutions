# 12 — MOBILE UX AGENT
# Mobile-First Layout, Breakpoints & Mobile Frame

---

## READ BEFORE ANY MOBILE/LAYOUT TASK

1. Read `src/components/Layout.tsx` — contains nav, footer, floating WhatsApp
2. Read the page you are editing — check existing `sm:` / `md:` usage
3. Pair with 01-FRONTEND.md for implementation; use this agent for layout and viewport decisions

---

## BREAKPOINTS (Tailwind — use consistently)

```
320px   — minimum supported (small phones)
375px   — PRIMARY TEST WIDTH — test every UI change at this width (Chrome DevTools)
768px   — md: tablet / large phone
1024px  — lg: small desktop
1440px  — xl: max-w-6xl content (1280px) centered
```

Rule: **Test every UI change at 375px.** 70%+ of Kerala traffic is mobile.

---

## TOUCH TARGETS

- Minimum tap target: **44px** height/width (Apple HIG; Android recommends 48dp)
- Buttons and links: use `min-h-[44px]` or `py-3` (12px × 2 + line ≈ 44px) for primary CTAs
- Spacing between tappable elements: at least 8px so thumbs don’t hit two at once
- Floating WhatsApp button: keep clear of nav and other fixed elements (already in Layout.tsx)

---

## MOBILE FRAME (canonical layout for all pages)

Use this structure so every page feels consistent and works on small screens:

```tsx
// Page structure (Layout.tsx wraps all pages):
// 1. Sticky nav (already in Layout) — logo + links + phone/WA in nav or hamburger
// 2. Main content: full-bleed with constrained width
<section className="py-8 md:py-20">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    {/* page content */}
  </div>
</section>
// 3. Floating WhatsApp — fixed bottom-right (Layout.tsx) — green #25D366
```

- Content width: `max-w-6xl mx-auto px-4 sm:px-6` (from 01-FRONTEND)
- No horizontal scroll at 320px–375px
- Stack sections vertically on mobile; use `md:grid` or `md:flex` for larger screens

---

## REFERENCE FILES

- `src/components/Layout.tsx` — global nav, footer, WhatsApp button
- `src/pages/Home.tsx` — section spacing, responsive grids
- `src/pages/Contact.tsx` — form layout on mobile
- `src/pages/Work.tsx` — project cards and filters on small screens

---

## WHEN TO USE THIS AGENT

- Adding or changing any page or component layout
- Implementing new sections (hero, cards, forms)
- Fixing overflow, tiny tap targets, or cramped mobile layout
- Always use with 01-FRONTEND for actual JSX/CSS
