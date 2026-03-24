# Product Strategy Agent — Output

**Input:** [research.md](./research.md)  
**Output:** Product vision, positioning, core features, MVP scope, success criteria, and deliverables for Architecture.

---

## 1. Product vision

### 1.1 Main site (HexaStack Solutions)

- **Vision:** The **HexaStack Solutions company site** (hexastacksolutions.com): one source of truth for the company. Services, blog, contact, work/portfolio, and **location-led SEO** so Kerala and Gulf searchers land on real, relevant pages.
- **North star:** Searcher finds a page that matches intent (Kerala, Thrissur, Gulf VAT, etc.) → reads clear, pain-led copy → contacts or WhatsApp. No dependency on Google domain push; on-site SEO only.

### 1.2 Agent system (pipeline)

- **Vision:** A **single repo with a defined agent chain**; each agent reads/writes Markdown in `docs/agent-system/`. Cursor Pro + file-based handoff; no extra servers.
- **North star:** From “I have an idea” to “deployed and documented” with minimal manual handoffs. Optional product or campaign landings (e.g. HexaBill) use the same agent docs as templates.

---

## 2. Positioning (main site)

| Element | Choice | Rationale (from research) |
|--------|--------|----------------------------|
| Geography | Thrissur-based; Kerala & Gulf | Matches search behaviour and delivery (Kerala districts + UAE/KSA). |
| Promise | Direct developer; 2hr WhatsApp reply | Addresses “Do they reply?” and builds trust. |
| Proof | Projects, products (HexaBill, HexaCV), case-led copy | Reduces “Will this work for my business?” |
| SEO | Location hubs + district/service pages; no Google push | Real pages for “Kerala”, “Gulf VAT”; on-site titles, meta, sitemap. |

---

## 3. Core features (main site)

| # | Feature | Priority | Notes |
|---|---------|----------|------|
| 1 | Services, blog, contact, work | P0 | Keep structure and SEO; pain-led, short sentences. |
| 2 | SEO location pages + sitemap | P0 | `seoLocationPages.ts`; `/seo/:location/:service`; sitemap in `public/`. |
| 3 | Kerala hub (`/kerala`) | P0 | Real page for “Kerala” search; links to district pages. |
| 4 | Gulf VAT hub (`/gulf-vat`) | P0 | Real page for “Gulf VAT” search; links to VAT billing by location. |
| 5 | Admin (portfolio, settings, etc.) | P0 | As needed for content management. |
| 6 | Optional product landing (any product) | P1 | Use uiux.md + growth.md as templates; not tied to one product name. |
| 7 | Conversion: primary CTA, clear contact/WhatsApp | P0 | One primary CTA per section; 2hr reply in copy. |

---

## 4. Core features (agent system)

| # | Feature | Priority | Notes |
|---|---------|----------|------|
| 1 | Agent chain definition | P0 | Research → Strategy → Architecture → UI/UX → Development → Testing → Security → Performance → Deployment → Growth → Operations. |
| 2 | Structured outputs (Markdown) | P0 | One file per agent in `docs/agent-system/`; Performance adds to deployment.md; Operations adds to growth.md. |
| 3 | Pipeline entry + skills | P0 | `.cursor/AGENTS.md`; `.cursor/skills/<agent>/SKILL.md`; rule 21-AGENT-CHAIN. |
| 4 | Repo layout for agents | P0 | Outputs in `docs/agent-system/`; code only in `server/`, `src/`, `prisma/` when needed. |
| 5 | Marketing / SEO / Content agents | P1 | Optional; Growth agent covers SEO, messaging; Operations covers workflows. |
| 6 | “Start next” / light automation | P2 | Manual “start next” or simple script. |

---

## 5. MVP scope

### 5.1 Main site MVP

- **In scope:** Company site live (Netlify); contact and form working; SEO (titles, meta, sitemap); Kerala hub, Gulf VAT hub, and location–service pages; clear headline and subhead (Thrissur-based, pain-led); single primary CTA and WhatsApp.
- **Out of scope for MVP:** Google domain push / GSC submission (optional later); multiple product sites in one repo; paid ads; heavy A/B tests.

### 5.2 Agent system MVP

- **In scope:** Full pipeline (Research through Operations); `docs/agent-system/` plus memory; Cursor rules and skills; “start next” via Composer.
- **Out of scope for MVP:** Full automation (cron/APIs); custom MCP servers; paid orchestration.

---

## 6. Success criteria

- **Main site:** A Kerala or Gulf searcher lands on a real page (hub or district/service), sees clear value and 2hr reply, and can contact or WhatsApp in one click.
- **Agent system:** You can run “start next” and complete Research → … → Operations with Cursor; each step reads the previous Markdown and writes the next; agent docs stay generic for any product/campaign.

---

## 7. Deliverables for Architecture Agent

- **System boundaries:** Main site = frontend (`src/`) + backend (`server/`) + Netlify (static + functions); no duplicate API; Prisma for DB. Agent pipeline = file-based only; no new services.
- **Key routes:** `/`, `/kerala`, `/gulf-vat`, `/seo/:locationSlug/:serviceSlug`, `/services`, `/blog`, `/contact`, `/work`, `/admin`; sitemap includes hubs and location pages.
- **Constraints:** Code changes only in `server/`, `src/`, `prisma/`; SEO and content structure already aligned with strategy above.

---

*Next: [architecture.md](./architecture.md) — Architecture Agent*
