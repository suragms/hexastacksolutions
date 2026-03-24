# 01 — FRONTEND AGENT
# UI/UX Builder | Based on actual src/ code

---

## READ BEFORE STARTING ANY FRONTEND TASK

1. Read `src/components/Layout.tsx` — contains Navbar, Footer, WhatsApp button
2. Read `src/components/SEO.tsx` — understand its props interface
3. Read `src/App.tsx` — check all existing routes before adding new ones
4. Read the specific page file you are editing

---

## DESIGN SYSTEM (from actual CSS in globals.css + tailwind classes in Home.tsx)

### Colors in use (dark theme — DO NOT change to light)
```css
Background:    #0D0D0D (page bg), #0A0A0A (sections), #111111 (cards)
Foreground:    #F5F5F5 (primary text), #A0A0A0 (secondary text), #666666 (tertiary)
Border:        rgba(255,255,255,0.08) (all borders)
Card hover:    #141414 (from #0A0A0A)
White CTA:     bg-white text-black (primary buttons)
WhatsApp:      #25D366 (currently dark in Layout — NEEDS to be green)
```

### Typography patterns (copy from Home.tsx)
```tsx
// Section heading pattern:
<h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">

// Section subheading:
<p className="text-[#A0A0A0] mb-8 md:mb-12 max-w-xl">

// Card title:
<h3 className="font-semibold mb-2 text-white">

// Card body:
<p className="text-sm text-[#A0A0A0] leading-relaxed">

// Stat pill/badge:
<span className="px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#111111] text-[#A0A0A0] text-sm font-medium">
```

### Section spacing pattern (from Home.tsx)
```tsx
// Standard section:
<section className="py-8 md:py-20 border-t border-[rgba(255,255,255,0.08)]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">

// Dark bg section:
<section className="py-8 md:py-20 border-t border-[rgba(255,255,255,0.08)] bg-[#0D0D0D]">
```

### Button patterns (exact from Home.tsx)
```tsx
// Primary CTA:
<Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-colors">
  Get Started <ArrowRight className="w-4 h-4" />
</Link>

// Secondary CTA:
<Link to="/work" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.05)] font-medium transition-colors">
  View Our Work
</Link>

// WhatsApp button (inline):
<a href="https://wa.me/917591999365?text=..." className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors">
  <MessageCircle className="w-5 h-5" /> WhatsApp Us
</a>
```

---

## ANIMATION (from framer-motion — already in codebase)

```tsx
// Standard section entry (copy from Home.tsx):
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.05 }}
>

// Hero entry (used in Home.tsx):
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

---

## LAYOUT RULES (from Layout.tsx — already built)

### What Layout.tsx already gives you (don't rebuild):
- Sticky navbar with logo + Products dropdown + nav links
- Mobile full-screen menu (animated slide)
- Footer with 4-column grid: brand | Products | Explore | Contact
- Floating WhatsApp button (bottom-right, currently dark — fix to green)
- Fetches CompanySettings from /api/settings for dynamic phone/email/address

### What you add per page:
- `<SEO>` component at top of page return
- Page content inside `<Layout>` wrapper

### Fix the WhatsApp button color in Layout.tsx:
```tsx
// CURRENT (wrong):
className="... bg-[#1A1A1A] text-[#F5F5F5] ..."

// CORRECT (fix this):
className="fixed z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20BA5A] transition-colors"
style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))', right: 'max(1.5rem, env(safe-area-inset-right))' }}
```

---

## PAGE-BY-PAGE REBUILD GUIDE

### Home.tsx — what to CHANGE (not rebuild from scratch)
```
1. Hero H1: Change "Build Smarter. Scale Faster." 
   → "Custom Software & Websites — Built in Thrissur, Trusted in Gulf"
   
2. Hero subtext: Remove "Enterprise-grade" phrase
   → "We've built a restaurant POS for a UAE client, medical lab software 
      for a Kerala clinic, and an AI nutrition app. Talk directly to the developer."

3. Hero CTAs: Keep structure, change text:
   Primary: "Get Free Quote" → /contact
   Secondary: "💬 WhatsApp Us Now" → wa.me/917591999365

4. Add stats row below hero:
   "3+" Projects | "2" Countries | "2hrs" Reply | "100%" Satisfaction

5. Status pill text: 
   Change "Operational. Deployed. Trusted." 
   → "Thrissur, Kerala → UAE → India"

6. Keep all sections that exist (services, products, process, CTA, blog)
7. Do NOT remove the exit intent popup — it works well
```

### Contact.tsx — what to change (read file first)
```
1. Reduce form fields to ONLY: name, email, phone, country (dropdown), requirement
2. Add big WhatsApp CTA above the form with green button
3. Add: "We reply within 2 hours on WhatsApp"
4. Remove all HexaBill-specific fields (numberOfBranches, currentSystem) from public form
   (keep them only if user selects HexaBill in a service dropdown)
```

### Work.tsx — what to add
```
1. Read current Work.tsx first
2. Add filter tabs: All | Software | AI | Gulf | Kerala
3. Each project card MUST show location badge
4. Bottom CTA: "Have a similar project? WhatsApp us"
```

---

## SEO COMPONENT USAGE (correct pattern)

```tsx
// From SEO.tsx props interface:
<SEO
  title="Custom Software Development Thrissur Kerala | HexaStack Solutions"
  description="HexaStack Solutions builds websites, apps and AI software for businesses in Thrissur, Kerala and Gulf. 3+ delivered projects. WhatsApp reply in 2 hours."
  keywords="web development Thrissur, software company Kerala, website design Thrissur Kerala"
  schema={{
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'HexaStack Solutions',
    // ... see SEO agent for full schema
  }}
/>
```

---

## LOADING STATE PATTERN (from Home.tsx)

```tsx
// Skeleton loader (already in use in Home.tsx):
{loading
  ? Array(6).fill(0).map((_, i) => (
      <div key={i} className="h-40 rounded-2xl bg-[#111111] animate-pulse" />
    ))
  : data.map((item) => <RealCard key={item.id} {...item} />)
}
```

---

## API CALLS PATTERN (from Home.tsx)

```tsx
// Always use API_URL from lib/utils:
import { API_URL } from '@/lib/utils';

// Fetch pattern (no useQuery yet — use useState + useEffect):
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`${API_URL}/api/endpoint`)
    .then(res => res.ok ? res.json() : [])
    .then(data => setData(Array.isArray(data) ? data : []))
    .catch(() => {})
    .finally(() => setLoading(false));
}, []);
```

---

## MOBILE CHECKLIST (before every commit)

```
□ All tap targets minimum 44px height
□ Text readable at 375px without horizontal scroll
□ Images don't overflow container
□ Nav menu opens and closes on mobile
□ Form inputs don't cause horizontal scroll on iPhone
□ WhatsApp button not blocked by anything on mobile
□ All sections have px-4 sm:px-6 padding
```
