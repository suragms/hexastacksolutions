# UI/UX Agent — Output

**Input:** [architecture.md](./architecture.md), [strategy.md](./strategy.md)  
**Output:** Interface design for HexaStack Solutions main site (home, hubs, location pages, contact) and optional product landing template. Clear deliverables for Development Agent.

---

## 1. Design principles

- **Minimal, clear hierarchy:** One primary CTA per section; avoid clutter. Follow Hook → Problem → Solution → Benefits → CTA where relevant.
- **Pain-led copy:** Headlines and subheads speak to user pain (e.g. “Tired of agencies and delayed replies?”); short sentences; no jargon.
- **Trust and conversion:** Positioning = Thrissur-based, Kerala & Gulf; promise = direct developer, 2hr WhatsApp reply; proof = projects, products. Repeat primary CTA and WhatsApp where it makes sense.
- **Responsive:** Mobile-first; breakpoints at 768px and 1024px; single column on mobile, 2–3 columns on desktop where useful.
- **Performance:** Few fonts; optimized images; no heavy animations for MVP.

---

## 2. Main site — page and section structure

### 2.1 Home (`/`)

| Section | Content | CTA |
|---------|---------|-----|
| **Hero** | Headline: Thrissur-based, Kerala & Gulf. Subhead: pain-led (e.g. agencies, delay) + “You talk to the developer. Reply in 2 hours on WhatsApp.” | Primary: Get quote / Contact; secondary: WhatsApp; tertiary: View work |
| **Status / pill** | Optional: “Thrissur Kerala → UAE → India” or similar | — |
| **Services** | Grid of services (icons + short text); “Websites, POS, billing…”-style intro | Link to /services if needed |
| **Products** | Cards for HexaBill, HexaCV, etc. | Per-product CTA (demo, try, learn more) |
| **Proof / stats** | e.g. “3+ Projects, 2hr Reply, 100% Satisfaction” | — |
| **CTA** | Repeat primary CTA + WhatsApp | Contact, WhatsApp |

### 2.2 Kerala hub (`/kerala`)

| Section | Content | CTA |
|---------|---------|-----|
| **H1** | “Software & Web Development in Kerala” | — |
| **Intro** | Short para: we serve all 14 districts; Thrissur-based; talk to developer; 2hr reply | — |
| **District links** | Grid/list of districts; each links to `/seo/{district}/web-development` (or first service) | One primary: “Get a quote for Kerala” (→ /contact) |

### 2.3 Gulf VAT hub (`/gulf-vat`)

| Section | Content | CTA |
|---------|---------|-----|
| **H1** | “VAT Billing Software for the Gulf” | — |
| **Intro** | Short para: VAT-compliant for UAE, KSA, Gulf; TRN, reports; we’ve built for UAE clients | — |
| **Location links** | List of VAT billing pages by location (UAE, Dubai, Abu Dhabi, etc.) → `/seo/{location}/vat-billing` | One primary: “Get VAT billing quote for Gulf” (→ /contact) |

### 2.4 Location–service SEO page (`/seo/:locationSlug/:serviceSlug`)

| Section | Content | CTA |
|---------|---------|-----|
| **H1** | From data (e.g. “Web Development Company in Thrissur”) | — |
| **Intro** | One para: HexaStack offers {service} in {location}; Thrissur-based team, Kerala & Gulf | — |
| **Why choose us** | Short value prop: direct developers, no middle layers; examples (POS UAE, lab Kerala, AI apps) | — |
| **Get in touch** | One para + CTA | “Contact us” (→ /contact) |

### 2.5 Contact (`/contact`)

- Form: name, email, phone, requirement (and any strategy-mandated fields). Labels above fields; one primary submit button; loading state.
- Visible WhatsApp CTA (2hr reply in copy).
- No clutter; one primary action = submit or WhatsApp.

### 2.6 Services, Blog, Work

- **Services:** Grid or list; clear headings; optional link to location pages or contact.
- **Blog:** List of posts; card or list layout; readable typography.
- **Work:** Portfolio/projects; proof element; CTA to contact.

---

## 3. Components and layout

- **Header:** Logo, nav (Services, Blog, Contact, Work, etc.), primary CTA. Sticky; minimal.
- **Footer:** 1–2 columns on mobile; 3–4 on desktop (e.g. Product, Company, Legal, Contact). WhatsApp link where appropriate.
- **Cards:** Consistent padding, subtle border or shadow; used for services, products, district/location links.
- **Forms:** Labels above fields; one primary button; loading state on submit.
- **Colors / theme:** Align with HexaStack brand; one primary, neutral background, dark text; support theme toggle if present.

---

## 4. Responsive breakpoints

- **Mobile:** &lt; 768px — single column; stacked sections; touch-friendly targets.
- **Tablet:** 768px–1024px — 2 columns where useful (e.g. service grid, district grid).
- **Desktop:** &gt; 1024px — max-width container (e.g. 1200px / 6xl).

---

## 5. Accessibility and performance

- Semantic HTML (header, main, section, footer, article).
- Alt text for images; focus states for interactive elements.
- WCAG AA where possible; lazy-load below-the-fold images.

---

## 6. Optional product landing (generic template)

When adding a **new product or campaign** (any product name), use this structure. Replace [Product] and audience with actual names.

| Section | Purpose | Content hints |
|---------|---------|----------------|
| Hero | Value prop + primary CTA | Headline + subhead; CTA: “Book demo” or “Start trial”. |
| Problem | Pain points | 2–3 short bullets. |
| Solution | What [Product] does | 3–4 benefit cards. |
| Features | Key capabilities | Icons + short text. |
| Use cases | Who it’s for | Segments (industry or region). |
| Social proof | Trust | “Used by X”; 2–3 quotes; optional logos. |
| Screenshots / demo | Show product | 5–10 screens or one short video. |
| CTA | Convert | Repeat primary CTA; form or “Book demo”. |
| Footer | Links, legal | Contact, Privacy, Terms. |

---

## 7. Outputs for Development Agent

- Implement only in `server/` and `src/` (and `prisma/` when needed).
- Use this doc for: section order per page type (home, Kerala hub, Gulf VAT hub, location SEO, contact); component list; responsive breakpoints; copy placement (headline, subhead, 2hr reply, primary CTA).
- Prefer existing stack (Vite + React, Tailwind) and existing components (Layout, SEO, theme toggle). Add or adjust pages/components to match sections above; no new top-level folders or duplicate APIs.
- Data: location pages from `src/data/seoLocationPages.ts`; Kerala districts and Gulf VAT links via existing helpers (getKeralaDistricts, getGulfVatPages).

---

*Next: [tasks.md](./tasks.md) — Development Agent*
