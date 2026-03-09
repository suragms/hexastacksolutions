# Architecture Agent — Output

**Input:** [strategy.md](./strategy.md)  
**Output:** System architecture, agent chain, repo layout, tech stack, deployment, key routes, and handoff for UI/UX and Development agents.

---

## 1. Agent chain (canonical order)

```
Research → Product Strategy → Architecture → UI/UX → Development → Testing → Security
    → Performance (adds to deployment.md) → Deployment → Growth → Operations (adds to growth.md)
```

- **Handoff:** Each agent reads the previous agent’s Markdown (and memory) and writes its own output in `docs/agent-system/`. Performance and Operations append to deployment.md and growth.md; all others have one file each.
- **Files:** `research.md`, `strategy.md`, `architecture.md`, `uiux.md`, `tasks.md`, `testing.md`, `security.md`, `deployment.md`, `growth.md`.
- **Entry:** `.cursor/AGENTS.md`; per-agent behaviour in `.cursor/skills/<agent-name>/SKILL.md`; rule `.cursor/rules/21-AGENT-CHAIN.md`.

---

## 2. Repository layout (HexaStack Solutions main site)

```
project-root/
├── docs/
│   └── agent-system/           # Agent pipeline outputs (Markdown) — generic, not product-specific
│       ├── research.md
│       ├── strategy.md
│       ├── architecture.md
│       ├── uiux.md
│       ├── tasks.md
│       ├── testing.md
│       ├── security.md
│       ├── deployment.md
│       └── growth.md
├── .cursor/
│   ├── AGENTS.md               # Pipeline index: order, outputs, how to run
│   ├── README.md
│   ├── rules/                  # e.g. 21-AGENT-CHAIN.md
│   └── skills/                 # One folder per agent (SKILL.md each)
├── server/                     # Backend: Express 5 (TypeScript), Prisma, MongoDB
│   ├── index.ts
│   ├── routes/
│   └── ...
├── src/                        # Frontend: Vite 7 + React 19
│   ├── main.tsx, App.tsx
│   ├── pages/                  # Home, Services, Blog, Contact, Work, KeralaHub, GulfVat, LocationServicePage, Admin, etc.
│   ├── components/
│   ├── data/                   # e.g. seoLocationPages.ts
│   └── lib/
├── netlify/
│   └── functions/
│       └── api.ts              # Serverless entry: wraps server/index.ts
├── public/                     # Static assets, sitemap.xml, robots.txt
├── prisma/
│   └── schema.prisma
├── memory/                     # lessons.md, patterns.md, ui_patterns.md, architecture_patterns.md
└── (index.html, vite.config.ts, netlify.toml, package.json, tsconfig.*.json)
```

- **Rule:** Pipeline agents update only `docs/agent-system/*.md` (and optionally memory). Code changes only in `server/`, `src/`, `prisma/` when needed.
- **Single backend:** No duplicate API (e.g. no separate `api/`); all API via `server/` and Netlify Functions.

---

## 3. Main site — key routes and SEO

| Route | Purpose |
|-------|---------|
| `/` | Home; Thrissur-based headline, pain-led subhead, primary CTA + WhatsApp |
| `/kerala` | Kerala hub; links to district SEO pages |
| `/gulf-vat` | Gulf VAT hub; links to VAT billing by location |
| `/seo/:locationSlug/:serviceSlug` | Location–service SEO pages (data: `src/data/seoLocationPages.ts`) |
| `/services`, `/blog`, `/contact`, `/work` | Core pages; SEO and conversion |
| `/admin` | Admin (portfolio, settings, etc.); behind auth |

- **Sitemap:** `public/sitemap.xml` includes `/`, `/kerala`, `/gulf-vat`, location pages, blog, and core routes.
- **SEO:** On-site only (titles, meta, canonical, JSON-LD where needed); no dependency on Google domain push.

---

## 4. How agents communicate (no extra infra)

| Mechanism | Use |
|-----------|-----|
| **File read** | Cursor reads previous agent’s `.md` and memory files. |
| **File write** | Agent writes or updates its output file in `docs/agent-system/`. |
| **AGENTS.md + skills** | Pipeline order and per-agent behaviour; “start next” = run next agent. |
| **Cursor Rules** | `21-AGENT-CHAIN.md` describes pipeline and file names. |
| **Automation** | Manual “start next” in Composer or a simple script that outputs the next-agent prompt. |

---

## 5. Tech stack (main site)

| Component | Stack |
|------------|--------|
| **Frontend** | Vite 7, React 19, React Router 7, Tailwind 4 → build to `dist/` |
| **Backend** | Express 5 (TypeScript) in `server/`; Prisma; MongoDB |
| **Deploy** | Netlify: static from `dist/`, API via `netlify/functions/api.ts` (serverless-http wrapping `server/index.ts`) |
| **DB** | MongoDB (Prisma) |

Single deploy target (Netlify); no Vercel or duplicate API in this repo.

---

## 6. Security (for Security Agent)

- Env vars for DB and API keys; never commit secrets.
- Contact form: rate limit and validation; optional CAPTCHA later.
- Admin behind auth; no public exposure of internal routes.

---

## 7. Outputs for next agents

- **UI/UX Agent:** Use this architecture + strategy for layout, sections, and components. Focus: main site (home, hubs, location pages, contact); conversion (primary CTA, 2hr reply in copy); optional product landing from templates.
- **Development Agent:** Implement only in `server/` and `src/` (and `prisma/` when needed). Reference key routes and `seoLocationPages.ts`; no new top-level folders or duplicate APIs.
- **Deployment Agent:** Use Netlify + Prisma/MongoDB; produce `deployment.md` with step-by-step; Performance Agent will add a Performance section to that file.

---

*Next: [uiux.md](./uiux.md) — UI/UX Agent*
