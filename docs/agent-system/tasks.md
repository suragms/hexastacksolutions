# Development plan and tasks

**Input:** [architecture.md](./architecture.md), [uiux.md](./uiux.md), [strategy.md](./strategy.md)  
**Purpose:** How to run the agent chain, code locations, task list, and implementation checklist for the HexaStack Solutions main site.

---

## 1. How to run the agent chain

### 1.1 Pipeline entry and order

- **Entry:** `.cursor/AGENTS.md` — pipeline order (Research → … → Operations), outputs, how to run.
- **Rule:** `.cursor/rules/21-AGENT-CHAIN.md` — read before running any agent.
- **Per-agent behaviour:** `.cursor/skills/<agent-name>/SKILL.md`.

### 1.2 Running the next agent

- **Manual:** In Cursor Composer, say **“start next”** (or “start nextv”). The AI runs the next agent in sequence: reads previous `docs/agent-system/*.md` and `memory/*.md`, produces/updates the next file.
- **Prompt pattern:** “You are the [Agent Name] Agent. Read `docs/agent-system/[previous].md` and `memory/*.md`; produce/update `docs/agent-system/[next].md`. Follow the skill in `.cursor/skills/[agent-name]/SKILL.md`.”
- **Order:** Research → Strategy → Architecture → UI/UX → Development → Testing → Security → Performance → Deployment → Growth → Operations.

### 1.3 Code scope

- **Code changes only in:** `server/`, `src/`, and `prisma/` when needed.
- **Pipeline docs only in:** `docs/agent-system/`. No new top-level folders or duplicate APIs.

---

## 2. Organizing the repo for agents

- **Convention:** One run = one set of files in `docs/agent-system/`. Re-run overwrites or updates the file.
- **Memory:** Before each agent, read `memory/lessons.md`, `memory/patterns.md`, `memory/ui_patterns.md`, `memory/architecture_patterns.md`. Optionally append insights after the stage.
- **Git:** Commit after each agent run, e.g. `git add docs/agent-system memory && git commit -m "Agent: Development"`.

---

## 3. Code locations (main site)

| Layer | Path | Contents |
|-------|------|----------|
| **Frontend** | `src/` | `main.tsx`, `App.tsx`, `pages/`, `components/`, `data/`, `lib/` |
| **Pages** | `src/pages/` | Home, Services, Blog, Contact, Work, KeralaHubPage, GulfVatPage, LocationServicePage, Admin, About, Pricing, products/, blog/ |
| **Data** | `src/data/seoLocationPages.ts` | `SEO_LOCATION_PAGES`, `getKeralaDistricts()`, `getGulfVatPages()`, `findSeoLocationPage()`, `getSeoLocationPaths()` |
| **Backend** | `server/` | `index.ts`, `routes/` (contact, portfolio, analytics, auth, services, products, etc.) |
| **Config** | Root | `vite.config.ts`, `tsconfig.*.json`, `netlify.toml`, `.env` (never commit secrets) |
| **Static** | `public/` | `sitemap.xml`, `robots.txt`, assets |

### 3.1 Key routes (must exist)

| Route | Component | Data / notes |
|-------|-----------|--------------|
| `/` | Home | Hero (Thrissur, pain-led, 2hr WhatsApp), services, products, stats, CTA |
| `/kerala` | KeralaHubPage | getKeralaDistricts(); district links → /seo/{slug}/web-development |
| `/gulf-vat` | GulfVatPage | getGulfVatPages(); location links → /seo/{slug}/vat-billing |
| `/seo/:locationSlug/:serviceSlug` | LocationServicePage | findSeoLocationPage(); H1, intro, Why choose us, Contact CTA |
| `/contact` | Contact | Form + WhatsApp CTA; 2hr reply in copy |
| `/services`, `/blog`, `/work` | Services, Blog, Work | Per uiux.md |

### 3.2 Adding a new page

1. Add route in `src/App.tsx`.
2. Add page in `src/pages/` (and data in `src/data/` if needed).
3. If SEO: add URL to `public/sitemap.xml`.

### 3.3 Optional product landing

- Use `uiux.md` (section 6) and `growth.md` as templates.
- New page under `src/pages/` or `src/pages/products/`; replace [Product] and audience with actual names.

---

## 4. Task list (implementation checklist)

### 4.1 Pipeline and docs

- [x] Agent pipeline defined (AGENTS.md, skills, 21-AGENT-CHAIN).
- [x] Research, Strategy, Architecture, UI/UX, Development outputs updated.
- [ ] Run Testing agent (testing.md).
- [ ] Run Security agent (security.md).
- [ ] Run Performance agent (adds to deployment.md).
- [ ] Run Deployment agent (deployment.md).
- [ ] Run Growth agent (growth.md).
- [ ] Run Operations agent (adds to growth.md).

### 4.2 Main site — pages and UI (per uiux.md)

- [x] Home: Hero (Thrissur-based headline, pain-led subhead, 2hr WhatsApp), services grid, products, stats, primary CTA + WhatsApp.
- [x] Kerala hub: H1, intro, district links grid, “Get a quote for Kerala” CTA.
- [x] Gulf VAT hub: H1, intro, VAT location links, “Get VAT billing quote for Gulf” CTA.
- [x] Location SEO page: H1 from data, intro, Why choose us, Get in touch + Contact CTA.
- [ ] Contact: Form (labels above, one submit, loading); WhatsApp CTA; 2hr reply in copy.
- [ ] Services, Blog, Work: Layout and CTAs per uiux.md; responsive breakpoints (768px, 1024px).

### 4.3 SEO and sitemap

- [x] Sitemap includes `/`, `/kerala`, `/gulf-vat`, and location pages.
- [x] On-site SEO only (titles, meta, canonical); no Google domain push dependency.
- [ ] Verify all key routes have correct title/description (SEO component).

### 4.4 Before handoff to Testing

- [ ] No code outside `server/`, `src/`, `prisma/`.
- [ ] No duplicate API or new top-level folders.
- [ ] `npm run build` succeeds; no TypeScript errors.
- [ ] Mobile check (e.g. 375px) for Home, Kerala hub, Gulf VAT hub, Contact.

---

## 5. Execution checklist (Development Agent)

1. Read `uiux.md`, `architecture.md`, and memory.
2. Implement or adjust only in `server/`, `src/`, `prisma/`.
3. Follow section order and components in uiux.md (Home, hubs, location page, Contact).
4. Use existing `seoLocationPages.ts` and helpers (getKeralaDistricts, getGulfVatPages).
5. Update tasks.md (this file) with task list and checkboxes.
6. When done, hand off to Testing agent: “start next” → Testing.

---

## 6. Cost and tooling

- **Cursor Pro:** Primary IDE + AI for pipeline.
- **Netlify:** Hosting (static `dist/` + functions).
- **MongoDB:** Database (Prisma).
- No extra orchestration or paid agent infra for MVP.

---

*Next: [testing.md](./testing.md) — Testing Agent*
