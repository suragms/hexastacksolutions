# HexaStack Solutions — Complete Project Analysis for Publishing

**Purpose:** Full tech stack, deployment, project overview, step-by-step build features, and deep feature analysis for publishing and promotion.  
**Last updated:** March 2026.

---

## 1. Project Overview

### 1.1 What It Is

**HexaStack AI Solutions** (product name:  *HexaStack Solutions*) is a **single full-stack web application** that serves as the **company website and enquiry management platform** for HexaStack Solutions. It combines:

- **Marketing site:** Services, products, blog, pricing, about, contact, work/portfolio.
- **SEO & growth:** Location-based SEO pages (Kerala, India, Gulf), blog articles, sitemap, conversion flows.
- **Enquiry & CRM:** Contact form, lead storage, admin dashboard for enquiries, projects, feedback, analytics.
- **Admin & auth:** Staff/Admin login (JWT), client login, dashboard, settings, portfolio and content management.

**Domain:** Primary production domain **hexastack.in**; legacy redirect from **hexastacksolutions.com** (301 to hexastack.in).

**Repository:** Single monorepo at repo root — one app (frontend + backend + Prisma + config). No separate microservices or multiple deployable apps.

---

## 2. Tech Stack (Complete)

### 2.1 Frontend

| Category | Technology | Version / Notes |
|----------|------------|-----------------|
| **Runtime / build** | Vite | 7.x — dev server, HMR, production build |
| **Framework** | React | 19.x |
| **Language** | TypeScript | 5.9 |
| **Routing** | React Router | 7.x |
| **Styling** | Tailwind CSS | 4.x — utility-first, PostCSS |
| **UI components** | shadcn/ui (Radix) | Accordion, Dialog, Tabs, Select, etc. |
| **Animations** | Framer Motion | 12.x |
| **Data fetching / state** | TanStack React Query, Zustand | Query 5.x, Zustand 5.x |
| **Forms** | React Hook Form, Zod, @hookform/resolvers | Validation and API wiring |
| **Charts** | Recharts | 2.x |
| **Icons** | Lucide React | — |
| **Tables** | TanStack React Table | 8.x |
| **Markdown / content** | react-markdown, @mdxeditor/editor, react-syntax-highlighter | Blog and rich content |
| **Other UI** | Embla Carousel, Vaul (drawer), cmdk (command), Sonner (toast), date-fns, nanoid, uuid | — |
| **Prerender** | vite-plugin-prerender | Optional (skipped on Vercel/CI); prerenders key routes for SEO |

**Entry:** `index.html` → `src/main.tsx` → `src/App.tsx` (Router).  
**Dev port:** 5173 (Vite). **API proxy:** `/api` → `http://127.0.0.1:3001`.

### 2.2 Backend

| Category | Technology | Version / Notes |
|----------|------------|-----------------|
| **Runtime** | Node.js | — |
| **Framework** | Express | 5.x |
| **Language** | TypeScript | ts-node + nodemon in dev |
| **ORM / DB client** | Prisma | 6.x |
| **Database** | MongoDB | Via Prisma (DATABASE_URL) |
| **Auth** | JWT (jsonwebtoken), bcryptjs | Stateless tokens, hashed passwords |
| **Security** | express-rate-limit, CORS | Contact + admin login limiters |
| **File upload** | Multer | Memory storage (serverless-friendly) |
| **Serverless** | serverless-http | For Netlify Functions (handler not in repo; see Deployment) |

**Entry:** `server/index.ts`. **Dev port:** 3001.

### 2.3 Database (Prisma + MongoDB)

- **Provider:** MongoDB.
- **Schema:** `prisma/schema.prisma`.
- **Binary targets:** native, rhel-openssl-3.0.x, rhel-openssl-1.0.x, debian-openssl-3.0.x (for Netlify/Linux).

### 2.4 Development & Tooling

- **Scripts:** npm (concurrently, nodemon, ts-node, prisma).
- **Lint:** ESLint 9.
- **Config:** tsconfig.json, tsconfig.server.json, tsconfig.node.json, postcss.config.mjs, components.json (shadcn).

---

## 3. Deployment

### 3.1 Primary: Netlify

- **Static site:** Build output `dist/` is published.
- **Build command:**  
  `npm install && npx prisma generate && node scripts/generate-sitemap.js && npm run build`
- **API:** All `/api/*` requests are redirected (200) to `/.netlify/functions/api/:splat`.  
  The **Netlify Function** is expected to wrap the Express app from `server/index.ts` with `serverless-http`.  
  **Note:** The file `netlify/functions/api.ts` is **referenced in docs and netlify.toml but is not present in the repo.** It must be created for production API to work on Netlify (e.g. export handler that uses serverless-http with the Express `app`).
- **Redirects (netlify.toml):**
  - `https://hexastacksolutions.com/*` → `https://hexastack.in/:splat` (301, force).
  - `/api/*` → `/.netlify/functions/api/:splat` (200).
  - `/*` → `/index.html` (200, SPA fallback).
- **Functions config:** esbuild, external node_modules (Prisma, bcryptjs, mongodb, express, cors, jsonwebtoken, multer, serverless-http), `included_files: ["prisma/schema.prisma"]`.
- **Env (set in Netlify UI):** `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`, optional `ADMIN_PASSWORD`, `ADMIN_EMAIL`, `RESEND_API_KEY`.

### 3.2 Vercel

- **vercel.json** exists with build command and SPA rewrites. Project docs state deployment is **Netlify-only**; Vercel config may be legacy or alternative. No serverless API handler was referenced for Vercel.

### 3.3 No Docker / CI-CD in Repo

- No Dockerfile, docker-compose, or GitHub Actions (or other CI/CD) in the repository.

---

## 4. Repository Structure (Key Folders)

```
hexastacksolutions/
├── src/                    # Frontend (React + Vite)
│   ├── main.tsx, App.tsx, globals.css
│   ├── pages/              # All route pages (Home, Services, Products, Work, Contact, Blog, Admin, etc.)
│   ├── components/         # Layout, SEO, ui (shadcn), shared components
│   ├── contexts/           # Auth, Theme
│   ├── hooks/, lib/, data/
├── server/                 # Backend (Express)
│   ├── index.ts            # App entry, route mounting, rate limiters, Netlify path fix
│   ├── routes/             # contact, auth, admin-auth, client-auth, portfolio, analytics, etc.
│   ├── db.ts, utils/       # Prisma client, auth helpers
│   ├── seed-admin-data, fix-admin-config, verify-setup
├── prisma/
│   └── schema.prisma       # All MongoDB models
├── public/                 # Static assets, sitemap.xml, robots.txt, _redirects
├── scripts/                # generate-sitemap.js, screenshot-pages.cjs
├── docs/                   # Agent outputs, SEO, conversion, domain, todos
├── .cursor/                # Rules and agent skills (Research → Operations pipeline)
├── memory/                 # Lessons, patterns (for agents)
├── index.html, vite.config.ts, netlify.toml, package.json, tsconfig*.json
└── README.md, PROJECT_STRUCTURE.md
```

---

## 5. Step-by-Step: Building & Running

### 5.1 Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB (local or Atlas; connection string in `.env`)

### 5.2 Local Setup

1. **Clone**
   ```bash
   git clone https://github.com/suragms/Our-enquiry-app.git
   cd Our-enquiry-app
   ```

2. **Install**
   ```bash
   npm install
   ```

3. **Environment**
   - Copy `.env.example` to `.env`.
   - Set `DATABASE_URL` (MongoDB), `JWT_SECRET`, optionally `ADMIN_PASSWORD`, `ADMIN_EMAIL`, `RESEND_API_KEY`.

4. **Database**
   ```bash
   npx prisma generate
   npm run db:push
   ```

5. **Seed (admin user / company settings)**
   ```bash
   npm run db:seed
   ```

6. **Verify**
   ```bash
   npm run verify
   ```

7. **Run full stack**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173  
   - Backend: http://localhost:3001  
   - Default admin (if seeded via Prisma User): e.g. `admin@example.com` / `admin123` (check seed script).

### 5.3 Production Build

```bash
npm run build
```

- Runs `prisma generate`, `node scripts/generate-sitemap.js`, then `vite build`.
- Output: `dist/` (static site). API must be deployed separately (Netlify Function or other host).

### 5.4 Useful Scripts

| Script | Purpose |
|--------|--------|
| `npm run dev` | Concurrently run server + client |
| `npm run client` | Vite only |
| `npm run server` | Express only (nodemon + ts-node) |
| `npm run build` | Prisma generate + sitemap + Vite build |
| `npm run preview` | Vite preview (static only) |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:seed` | Seed admin/config (fix-admin-config.ts) |
| `npm run verify` | Run verify-setup.ts |
| `npm run screenshots` | Run screenshot-pages.cjs |

---

## 6. Features — Deep Analysis

### 6.1 Public Website

- **Home:** Hero (India/Gulf geo-detection), services, products (from DB + static cards), process steps, case studies (DB or default), testimonials, tech stack, CTAs (WhatsApp, contact).
- **Services:** List from DB (`/api/services`), optional “coming soon”; SEO-friendly.
- **Products:** List from DB (`/api/products`), links to HexaBill, HexaCV, Student Tools, etc.; product landing (e.g. HexaBill).
- **Work / Portfolio:** Projects from `/api/portfolio` (title, description, media, location, client type, display order).
- **Contact:** Enquiry form (name, phone, requirement, company, country, industry, service/product, budget, timeline, branches, current system). POST to `/api/contact`; rate-limited; optional Resend email; stored in `ContactMessage`.
- **Blog:** Listing + individual posts (e.g. website-cost-kerala-2026, restaurant-pos-uae-case-study, vat-compliant-billing-software-uae, medical-lab-software-kerala, nutriscan-ai, etc.).
- **Pricing, About, Solutions:** Static/marketing content.
- **Legal:** Privacy, Terms.
- **SEO / Location:** Kerala hub (`/kerala`), Gulf VAT (`/gulf-vat`), location-service pages (`/seo/:locationSlug/:serviceSlug`), service-by-slug (`/services/:seoSlug`).

### 6.2 Enquiry & Contact

- **Contact form:** Validation, sanitization, rate limit (e.g. 5/hour), save to `ContactMessage`, optional email via Resend.
- **ContactMessage model:** name, email, phone, requirement, companyName, country, industry, serviceOrProduct, budget, timeline, numberOfBranches, currentSystem, isRead, isStarred.

### 6.3 Admin & Auth

- **Admin login:** `/api/admin/login` (password-only; `ADMIN_PASSWORD` env); returns JWT.
- **Staff auth:** `/api/auth/login`, `/api/auth/register` (email, password, name, role); JWT + user; roles: SUPER_ADMIN, ADMIN, STAFF.
- **Client auth:** `/api/client/*` (client login/register; Client model: name, company, email, whatsapp, password, status).
- **Admin UI:** `/admin` — dashboard: services CRUD, products CRUD, portfolio CRUD, enquiries (contact messages), projects/tasks, feedback, analytics (views, form submissions), settings (CompanySettings), image upload; protected by auth.

### 6.4 Portfolio & Projects (Internal)

- **Portfolio (public):** CRUD via `/api/portfolio`; fields: title, description, techStack, projectUrl, featured, displayOrder, location, clientType, media.
- **Projects (internal):** `/api/projects` — Project model with User (createdBy), ProjectMedia, Feedback, Task; status (IN_PROGRESS, DELIVERED, COMPLETED).
- **Feedback:** Linked to Project; name, company, content, rating, isPublic, isApproved, linkToken.
- **Tasks:** Linked to Project; title, description, status (PENDING, IN_PROGRESS, COMPLETED), deadline, assignedTo (User).

### 6.5 Company Settings

- **CompanySettings:** companyName, logoUrl, primaryEmail, primaryWhatsApp, secondaryWhatsApp, lead names/emails/WhatsApp, address, tagline, description.  
- **API:** GET/PATCH `/api/settings`; used for footer, contact modals, WhatsApp CTAs.

### 6.6 Analytics

- **Page views:** POST `/api/analytics/track` (page path); stored in `PageView` and aggregated in `Analytics` (date, totalViews, homeViews, workViews, contactViews, formSubmissions).
- **Form submissions:** POST `/api/analytics/form-submit` increments formSubmissions.
- **Frontend:** PageTracker in App.tsx sends track on route change.
- **Admin:** Analytics section in dashboard (e.g. last 30 days).

### 6.7 SEO & Growth

- **Sitemap:** `scripts/generate-sitemap.js` → `public/sitemap.xml` (core, blog, Kerala/India/Gulf location-service matrix).
- **robots.txt:** Allow /; Disallow /admin, /dashboard, /api/; Sitemap URL.
- **Prerender:** Key routes in vite.config.ts (home, services, products, work, contact, blog, about, pricing, solutions, blog slugs, products/hexabill, privacy, terms, admin).
- **Location pages:** SeoLocationPage model (location, service, title, description, h1, region); dynamic routes for location+service.
- **Conversion:** Docs describe demo booking, lead magnet, WhatsApp CTAs, pricing page, trust (testimonials, badges), India/Gulf focus.

### 6.8 Upload & Media

- **Upload:** `/api/upload` (Multer, memory storage); used for portfolio/project images and admin assets.
- **ProjectMedia / PortfolioMedia:** type (IMAGE/VIDEO), url; linked to Project or Portfolio.

### 6.9 Data Models (Summary)

| Model | Purpose |
|-------|--------|
| User | Staff/admin users; role; links to projects, tasks, feedbacks |
| Project | Internal projects; status; createdBy; media, feedbacks, tasks |
| ProjectMedia, Task, Feedback | Linked to Project |
| Portfolio, PortfolioMedia, PortfolioTeamMember | Public portfolio items |
| ContactMessage | Website enquiries |
| CompanySettings | Single-row company config |
| WebsiteContent | Page/section content (optional CMS-like) |
| Client | Client users (login/status) |
| PageView, Analytics | Page views and daily aggregates |
| Service, Product | Services and products (display order, coming soon) |
| SeoLocationPage | SEO location+service pages |
| Backlink | Backlink tracking (optional SEO) |

---

## 7. API Endpoints (Reference)

| Base path | Purpose |
|-----------|--------|
| GET /api/ping | Health ping |
| GET /api/health | DB connect + user count + env check |
| /api/contact | POST enquiry (rate-limited); GET list (admin) |
| /api/auth | POST login, register (staff) |
| /api/admin | POST login (admin password) |
| /api/client | Client auth |
| /api/projects | CRUD projects |
| /api/feedback | Feedback CRUD |
| /api/portfolio | Portfolio CRUD, public GET |
| /api/settings | GET/PATCH company settings |
| /api/upload | File upload |
| /api/analytics | POST track, form-submit; GET stats |
| /api/services | CRUD services |
| /api/products | CRUD products |
| /api/users | User management (admin) |

---

## 8. Documentation & Agent System

- **README.md:** Overview, stack, how to run, deployment checklist, team.
- **PROJECT_STRUCTURE.md:** Folder layout, tech stack, commands, removed folders (api/, db/, vercel note).
- **docs/agent-system/:** Research, strategy, architecture, uiux, tasks, testing, security, deployment, growth (9 output docs); 11-agent pipeline (Research → Operations).
- **docs/:** SEO_AND_CLEANUP.md, GSC_GBP_CHECKLIST.md, DOMAIN_STRATEGY.md, CONVERSION_STRATEGY.md, BRAND_ARCHITECTURE.md, LOGO_GUIDELINES.md, PITCH_DECK_STRUCTURE.md, MASTER_TODO_0001_1000.md, THRISSUR_SEO_PAGE_RESEARCH.md, SEO_*.md.
- **.cursor/AGENTS.md:** Agent order and how to run; skills in `.cursor/skills/` (one SKILL.md per agent).
- **memory/:** lessons.md, patterns.md, ui_patterns.md, architecture_patterns.md (for agent pipeline).

---

## 9. Setup Checklist for Publishing / New Environment

1. **Code:** Clone; `npm install`.
2. **Env:** `.env` with `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV`; optional `ADMIN_PASSWORD`, `ADMIN_EMAIL`, `RESEND_API_KEY`.
3. **DB:** MongoDB created; `npx prisma generate`, `npm run db:push`, `npm run db:seed`.
4. **Verify:** `npm run verify`.
5. **Netlify:** Create `netlify/functions/api.ts` that exports a handler wrapping `server/index.ts` with serverless-http; set env in Netlify UI; build command and publish as in netlify.toml.
6. **Domain:** Point domain to host; optional 301 from old domain (e.g. hexastacksolutions.com → hexastack.in).
7. **SEO:** Generate sitemap (part of build); submit sitemap in GSC if used; keep robots.txt and meta per page.

---

## 10. One-Paragraph Summary for Publishing

**HexaStack Solutions** is a full-stack company website and enquiry platform built with **React 19, Vite 7, TypeScript, Tailwind CSS 4, and shadcn/ui** on the frontend, and **Express 5, Prisma, and MongoDB** on the backend. It offers a marketing site (services, products, blog, pricing, about, contact, work/portfolio), location-based SEO pages for Kerala, India, and Gulf, contact form with rate limiting and optional email (Resend), and an admin dashboard for enquiries, portfolio, services, products, analytics, and company settings. Authentication supports admin (password), staff (JWT), and client login. The app is designed to deploy on **Netlify** (static `dist/` plus a serverless API function wrapping the Express app); the Netlify function file must be added for production API. The repo includes an 11-step agent pipeline (research through operations) and docs for SEO, conversion, and growth, suitable for publishing and promotion as a modern, SEO-ready enquiry and portfolio platform for a software company.

---

*End of project analysis.*
