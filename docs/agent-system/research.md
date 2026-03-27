# Research Agent — Output

**Scope:** HexaStack Solutions main site (hexastacksolutions.com) — company site, not a single product. Agent docs are dynamic skills for the main site and any product/campaign.  
**Date:** 2026-03  
**Inputs:** Memory (lessons, patterns, ui_patterns, architecture_patterns); repo state after cleanup and Kerala/Gulf SEO hubs.

---

## 1. Market overview

### 1.1 Main site — Kerala & Gulf SMBs

- **Audience:** Businesses in Kerala (all 14 districts) and Gulf (UAE, Dubai, Abu Dhabi, KSA, etc.) searching for: web development, POS, billing software, VAT-compliant systems, website design, custom software.
- **Search behaviour:** Users search by location (“Kerala”, “Thrissur”, “Gulf VAT”, “Dubai POS”) and expect to land on **real, relevant pages** — not generic home-only.
- **Current response:** Location–service SEO pages (`/seo/:location/:service`), Kerala hub (`/kerala`), Gulf VAT hub (`/gulf-vat`), blog, services, contact. No dependency on “pushing” to Google domain; SEO is on-site (titles, meta, sitemap).
- **Opportunity:** Strengthen conversion from search → contact/WhatsApp; keep copy clear, pain-point led, short sentences (per memory and recent UI/UX pass).

### 1.2 AI agent system (for pipeline operators)

- **Trend:** Solo/micro-teams use AI coding (Cursor, Composer) with file-based handoff; need a clear “run next agent” flow.
- **Gap:** Orchestration and templates (who runs when, what file to read/write), not raw AI capability.
- **Validation:** Repo has `.cursor/AGENTS.md`, `docs/agent-system/`, memory files; pipeline is Research → Strategy → … → Operations. One output file per agent; code changes only in `server/` and `src/`.

### 1.3 Billing / POS — Gulf & India (HexaBill context)

- **Gulf:** VAT, TRN, multi-currency; restaurant POS and distribution are strong use cases.
- **India (Kerala):** GST, multi-branch; clinics, labs, retail.
- **Pain points (validated):** Moving off spreadsheets; compliance without a full-time accountant; multi-branch; “Will this work for my business?” — need proof and clear positioning.
- **Competitors:** Zoho, Odoo, local ERPs; differentiation = focus (Gulf/India), simplicity, direct developer contact.

---

## 2. Competitor and positioning snapshot

| Area | Competitors / reality | Gap / opportunity |
|------|------------------------|-------------------|
| Main site SEO | Generic agency sites, single-city players | Location hubs (Kerala, Gulf VAT) + district-level pages = real, scannable results |
| Agent pipeline | LangGraph, CrewAI, heavy orchestration | Lightweight: Markdown + Cursor rules + skills; no extra infra |
| Billing (Gulf/India) | Zoho, Odoo | HexaBill: focused, compliant, demo + trust elements |

---

## 3. User pain points (summary)

1. **Searcher (Kerala / Gulf):** “I need software in my city/region” — must find a **real** page (district or hub), not a generic home. Clear headlines (e.g. why Thrissur, pain-led subheads) reduce bounce.
2. **Prospect (main site):** “Can they do VAT? Do they reply?” — need fast reply promise (e.g. 2 hours WhatsApp), proof (projects, products), single primary CTA.
3. **Pipeline operator:** “What do I run next?” — need one entry (e.g. AGENTS.md) and clear “previous → next” file handoff.

---

## 4. Validation and constraints

- **Main site:** Live; Kerala and Gulf VAT hubs added; no Google domain push (on-site SEO only). GSC/GBP optional.
- **Codebase:** Single backend (`server/` + Netlify Functions); no duplicate `api/` or stray folders. Frontend `src/`, config at root.
- **Agent system:** Fit = high for Cursor users; structure and templates in place; next = keep strategy and tasks aligned with main site and optional product launches.

---

## 5. Outputs for next agent (Product Strategy)

- **Primary deliverable:** Problem statements and market gaps above; main site = hexastacksolutions.com (Kerala & Gulf, SEO, contact/WhatsApp).
- **Suggested strategy inputs:**
  - **Main site:** Positioning (Thrissur-based, Kerala & Gulf; direct developer; 2hr reply). Feature priorities: keep SEO hubs and location pages; improve conversion from visit → contact.
  - **Optional product/campaign:** HexaBill or other product landings can reference this research or live in subpaths/separate repos; agent docs stay generic (templates, not product-locked).
  - **Pipeline:** Define which agents are must-have per run (e.g. Research → Strategy → Architecture → Dev → Test → Deploy) vs phase 2 (Growth, Operations).

---

*Next: [strategy.md](./strategy.md) — Product Strategy Agent*
