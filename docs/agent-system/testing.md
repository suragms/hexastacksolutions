# Testing Agent — Output

**Input:** [tasks.md](./tasks.md), [uiux.md](./uiux.md), [architecture.md](./architecture.md)  
**Output:** Test scope, scenarios, and pass/fail criteria for the agent pipeline and HexaStack Solutions main site.

---

## 1. What to test

| Target | Type | Notes |
|--------|------|-------|
| Agent pipeline | Validation | All `docs/agent-system/*.md` exist; expected sections present; no broken internal links |
| Main site build | Automated | `npm run build` succeeds; no TypeScript or lint errors |
| Main site routes | Manual / browser | Key routes load (200); correct title and content per uiux.md |
| Contact form | Manual / API | Submit succeeds; data stored (e.g. MongoDB/Prisma); validation and error handling |
| Responsive | Manual | Mobile (375px), tablet (768px), desktop; no horizontal scroll; CTAs reachable |
| Production | Smoke | Homepage loads; key assets load; form submits; no 500s; HTTPS only |

---

## 2. Agent pipeline checks

### 2.1 Required files

- **Pass:** All of these exist under `docs/agent-system/`: `research.md`, `strategy.md`, `architecture.md`, `uiux.md`, `tasks.md`, `testing.md`, `security.md`, `deployment.md`, `growth.md`.
- **Pass:** `.cursor/AGENTS.md` exists; `.cursor/skills/` contains one folder per agent with `SKILL.md`.
- **Fail:** Any listed file missing or empty.

### 2.2 Handoff validation (manual)

- Before running the next agent, skim the previous output: required sections present, “Next:” points to correct file.
- **Research:** Contains “Market overview” or equivalent; “Outputs for next agent (Product Strategy)”.
- **Strategy:** Contains “Positioning” or “Core features”; “Deliverables for Architecture”.
- **Architecture:** Contains “Key routes” and “Tech stack”; “Outputs for next agents”.
- **UI/UX:** Contains page/section structure (Home, Kerala hub, Gulf VAT hub, location SEO, Contact); “Outputs for Development Agent”.
- **Tasks:** Contains “Code locations” and “Task list”; “Next: testing.md”.

---

## 3. Build and static checks

| Check | Command / action | Pass | Fail |
|-------|------------------|------|------|
| TypeScript | `npm run build` (includes Prisma generate + Vite build) | Exit 0; `dist/` produced | Exit non-zero; TS or build errors |
| Lint | `npm run lint` (if present) | No errors | Errors reported |
| No code outside scope | Grep or manual: no new top-level `api/` or app code in `docs/` | Code only in `server/`, `src/`, `prisma/` | App code in wrong places |

---

## 4. Key route and content checks (manual / browser)

Test against running app (`npm run dev` or deployed URL). Use real or staging API base.

| Route | Pass criteria | Fail |
|-------|----------------|------|
| `/` | 200; Hero has Thrissur/Kerala & Gulf; subhead mentions 2hr WhatsApp; primary CTA and WhatsApp link visible | 404, 500, or missing headline/CTA |
| `/kerala` | 200; H1 “Software & Web Development in Kerala”; district links present; at least one link goes to `/seo/{slug}/web-development`; “Get a quote for Kerala” CTA | 404, empty list, or broken links |
| `/gulf-vat` | 200; H1 “VAT Billing Software for the Gulf”; list of VAT location links; “Get VAT billing quote for Gulf” CTA | 404, empty list, or broken links |
| `/seo/thrissur/web-development` | 200; H1 from data; intro; “Why choose us”; “Contact us” CTA | 404 or wrong H1 |
| `/seo/invalid/location` | 404 or “Page not found” with link to /services or home | 500 or blank |
| `/contact` | 200; form with labels above fields; one submit button; WhatsApp CTA; 2hr reply mentioned in copy | 404 or form missing |
| `/services`, `/blog`, `/work` | 200; content loads; no console errors | 404 or 500 |

### 4.1 SEO (spot check)

- Home, Kerala hub, Gulf VAT hub, one location page: `<title>` and meta description set (inspect or SEO component).
- Sitemap: `public/sitemap.xml` contains `/`, `/kerala`, `/gulf-vat` and sample location URLs.

---

## 5. Contact form and API

| Check | Pass criteria | Fail |
|-------|----------------|------|
| Validation | Required fields enforced (e.g. name, email); invalid email rejected | Submit with empty/invalid data accepted |
| Submit (staging/dev) | POST to `/api/contact` (or configured API); 2xx response; record stored (e.g. MongoDB/Prisma) | 4xx/5xx with no user message; or data not stored |
| Error handling | On failure, user sees friendly message; no raw stack trace in UI | Stack trace or generic crash |
| Rate limit | If implemented, excess submissions get 429 or friendly “too many requests” | No protection or unclear behaviour |

---

## 6. Responsive and accessibility (manual)

| Check | Pass criteria | Fail |
|-------|----------------|------|
| Mobile (375px) | Home, /kerala, /gulf-vat, /contact usable; no horizontal scroll; CTAs tappable | Overflow; CTAs cut off or too small |
| Tablet (768px) | Grids/layouts adapt (e.g. 2 columns where in uiux.md) | Broken layout |
| Desktop (1024px+) | Max-width container; readable line length | Full-width text or broken nav |
| Focus / keyboard | Tab through nav and form; focus visible | Focus not visible or trap |
| Images | Alt text where present | Decorative images without alt or broken alt |

---

## 7. Production smoke (after deploy)

| Check | Pass criteria | Fail |
|-------|----------------|------|
| Homepage | GET / returns 200; HTML loads | 404, 500, or timeout |
| Assets | Key JS/CSS from build load (no 404) | 404 on chunk or main CSS/JS |
| Form | Submit contact form; success response or redirect; no 500 | 500 or no feedback |
| HTTPS | No mixed content; site served over HTTPS | HTTP or mixed content |
| Links | Footer/nav links (e.g. Services, Contact, Kerala, Gulf VAT) resolve | Broken or wrong domain |

---

## 8. Test execution checklist

1. **Pipeline:** Confirm all `docs/agent-system/*.md` and `.cursor/AGENTS.md` + skills exist; skim handoff sections.
2. **Build:** Run `npm run build`; fix any TS or lint errors.
3. **Routes:** Start app (`npm run dev`); test `/`, `/kerala`, `/gulf-vat`, `/seo/thrissur/web-development`, `/contact`, `/services`, `/blog`, `/work`.
4. **Form:** Submit contact form (dev/staging); confirm storage and error handling.
5. **Responsive:** Check 375px, 768px, 1024px for key pages.
6. **Production:** After deploy, run smoke checks (homepage, assets, form, HTTPS, links).

If a check fails, fix before handing off to Security agent; optionally log recurring issues in `memory/lessons.md`.

---

## 9. Outputs for Security Agent

- **In scope for security review:** Contact form (validation, rate limit, no exposure of internals); env and secrets (no commit); admin behind auth; API error responses (no stack trace to client).
- **Not in scope for this test doc:** Auth implementation details; dependency audit (Security agent may add).

---

*Next: [security.md](./security.md) — Security Agent*
