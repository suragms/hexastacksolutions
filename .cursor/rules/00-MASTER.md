# 00 — HEXASTACK MASTER AGENT
# Self-Reasoning Orchestrator | Built from real code analysis

---

## READ THIS BEFORE EVERY SINGLE TASK

You are working on the **HexaStack Solutions** company website — a real production codebase.
Before you write one line of code, you MUST reason through what already exists.
You NEVER guess. You NEVER assume. You READ first.

---

## REAL CODEBASE FACTS (verified from actual files — March 2026)

### Tech Stack (exact, do not deviate)
```
Frontend:  React 19 + TypeScript + Vite 7 + Tailwind CSS v4 + shadcn/ui (new-york)
Routing:   react-router-dom v7
Animation: framer-motion v12
Icons:     lucide-react v0.525
State:     React useState/useEffect (no global store yet)
Charts:    recharts v2
DnD:       @dnd-kit/core + @dnd-kit/sortable (already installed)
Forms:     react-hook-form + zod
Backend:   Express 5 + TypeScript (server/index.ts)
Database:  MongoDB via Prisma (prisma/schema.prisma — provider = "mongodb")
ORM:       @prisma/client v6
Auth:      Simple hardcoded password in Admin.tsx: 'hexastack@2024'
Email:     Resend API (already integrated in contact.ts — needs RESEND_API_KEY env var)
Upload:    multer (server/routes/upload.ts exists)
Deploy:    Netlify (frontend dist/ + Netlify Functions via netlify/functions/api.ts)
API base:  /api/* → /.netlify/functions/api/:splat
```

### What Already EXISTS (do not rebuild these)
```
Pages (src/pages/):
  Home.tsx         — hero, services grid, products grid, portfolio link, process, CTA, blog preview
  Services.tsx     — exists (read before editing)
  Products.tsx     — exists (read before editing)
  Work.tsx         — exists (read before editing)
  Contact.tsx      — exists (read before editing)
  Admin.tsx        — full admin panel: analytics, enquiries, portfolio, settings, services, products tabs
  About.tsx        — exists
  Blog.tsx         — exists
  Pricing.tsx      — exists
  Solutions.tsx    — exists
  Privacy.tsx      — exists
  Terms.tsx        — exists
  products/HexaBill.tsx  — product sub-page
  products/HexaCV.tsx    — product sub-page

Components:
  Layout.tsx       — sticky nav + footer + WhatsApp floating button (ALREADY EXISTS)
  SEO.tsx          — sets document.title + meta tags + JSON-LD schema
  ThemeToggle.tsx  — dark mode toggle

Server routes (server/routes/):
  contact.ts    — POST/GET/PATCH/DELETE + /:id/reply (email via Resend)
  portfolio.ts  — full CRUD (Prisma/MongoDB)
  services.ts   — full CRUD (MongoDB native driver — NOT Prisma)
  products.ts   — full CRUD (MongoDB native driver — NOT Prisma)
  analytics.ts  — page tracking + stats
  auth.ts       — login/register
  settings.ts   — company settings CRUD
  upload.ts     — file upload via multer
  feedback.ts   — client testimonials
  projects.ts   — internal project management
  users.ts      — user management
```

### Database Architecture (CRITICAL — two systems running simultaneously)
```
MongoDB via Prisma:
  User, Project, ProjectMedia, Feedback, Task, WebsiteContent,
  Portfolio, PortfolioMedia, PortfolioTeamMember, ContactMessage,
  CompanySettings, PageView, Analytics

MongoDB via native driver (getCollection from server/mongodb.ts):
  Service    — managed by server/routes/services.ts
  Product    — managed by server/routes/products.ts

WHY: Services and Products were added after the initial Prisma schema 
and use the native MongoDB driver directly.
```

### Real Business Data (hardcoded in Home.tsx + Admin.tsx)
```
Company:    HexaStack Solutions
WhatsApp1:  +917591999365 (Anandu Krishna — Lead Dev)
WhatsApp2:  +917012714150 (Surag — Full Stack Dev & PM)
Email:      supporthexastack@hexastacksolutions.com
Address:    Thrissur, Kerala (default in CompanySettings)
Admin pass: hexastack@2024
Domain:     hexastacksolutions.com (canonical set in index.html — correct)
LinkedIn:   https://www.linkedin.com/company/hexastack-solutions/

Real Products:
  HexaBill  — POS/ERP/billing, VAT-compliant, India & Gulf
  HexaCV    — https://www.hexacv.online/ (external)
  Hexa AI Tool Suite — https://www.hexacv.online/free-tools (external)
  Student Tools — https://studentshub-gold.vercel.app/ (external)

Real Delivered Projects (for portfolio):
  1. Gulf Restaurant POS — UAE, React+Node.js+MongoDB+Socket.io
  2. Medical Lab Software — Kerala, React+Express+PostgreSQL
  3. NutriScan AI — SaaS, FastAPI+GPT-4o Vision+SQLite
```

---

## SELF-REASONING PROTOCOL (mandatory before every task)

### STEP 1 — DECLARE THE GOAL
```
State exactly what you are building or fixing.
If it's vague, ask for clarification before proceeding.
```

### STEP 2 — READ EXISTING CODE
```
Which files are affected?
→ Read every one of them completely before writing anything.
→ Use: cat src/pages/[Page].tsx, cat server/routes/[route].ts, etc.
```

### STEP 3 — FIND WHAT ALREADY EXISTS
```
Does this feature already exist partially?
What can be reused vs what needs to be added?
What imports are already available?
```

### STEP 4 — IDENTIFY THE RISKS
```
What could break?
Does this change affect other pages or routes?
Are there TypeScript type changes needed?
```

### STEP 5 — WRITE THE PLAN (before any code)
```
List: files to create + files to modify + new dependencies (if any)
State: what the definition of "done" looks like
```

### STEP 6 — EXECUTE (one file at a time, explain each change)

### STEP 7 — VERIFY
```
□ TypeScript compiles (no red squiggles)
□ Mobile layout tested (375px)
□ WhatsApp button present (it's in Layout.tsx — already exists)
□ SEO component used with correct title/description
□ No broken imports
□ No hardcoded fake data — use real projects and real products
```

---

## AGENT ROUTING (which skill file to use)

| Task | Load Skill File |
|---|---|
| Any frontend UI, pages, components | 01-FRONTEND.md |
| SEO: titles, meta, schema, sitemap, blog | 02-SEO.md |
| Backend: API routes, DB queries | 03-BACKEND.md |
| Admin panel: any of the 6 admin tabs | 04-ADMIN.md |
| Portfolio / Work page | 05-PORTFOLIO.md |
| Services pages and sub-pages | 06-SERVICES.md |
| Products pages (HexaBill, HexaCV etc) | 07-PRODUCTS.md |
| Business copy, conversion, CTAs | 08-MARKETING.md |
| Competitor research + positioning | 09-COMPETITION.md |
| Deploy, Netlify, performance | 10-PRODUCTION.md |
| Growth, analytics, content plan | 11-GROWTH.md |
| Mobile layout, breakpoints, touch, mobile frame | 12-MOBILE-UX.md |
| Copy for SMB owners, audience behaviour | 13-CUSTOMER-BEHAVIOUR.md |
| Psychological / trust / pain-point copy | 14-PSYCHOLOGICAL-COPY.md |
| Lead qualification, discovery, proposals | 15-CONVERSATION-ANALYST.md |
| Metrics, funnels, reading analytics | 16-DATA-ANALYST.md |
| Channels, SEO, content, LinkedIn/WhatsApp | 17-DIGITAL-MARKETER.md |
| Positioning, campaigns, 20-day alignment | 18-MARKETING-MANAGER.md |
| Admin analytics tab, advanced metrics | 19-ADMIN-ANALYTICS.md |
| Search Console, rankings, keyword tracking | 20-GOOGLE-RANKINGS.md |
| Aggressive startup / project prioritisation | 21-STARTUP-AGGRESSIVE.md |

**Cross-reference:** For copy or conversion, also consider 13-CUSTOMER-BEHAVIOUR, 14-PSYCHOLOGICAL-COPY, 08-MARKETING. For mobile layout, use 12-MOBILE-UX with 01-FRONTEND.

### New agents (12–21)
- 12-MOBILE-UX — Mobile-first layout, breakpoints, touch targets, mobile frame
- 13-CUSTOMER-BEHAVIOUR — SMB owner pain points and trust (Kerala & Gulf)
- 14-PSYCHOLOGICAL-COPY — Words that convert; risk reversal; banned list
- 15-CONVERSATION-ANALYST — Lead qualification, discovery, proposal flow
- 16-DATA-ANALYST — Metrics, funnels, reading Admin and external analytics
- 17-DIGITAL-MARKETER — Channels, content, SEO execution
- 18-MARKETING-MANAGER — Positioning, messaging, 20-day campaign alignment
- 19-ADMIN-ANALYTICS — Advanced Admin analytics (sources, funnel)
- 20-GOOGLE-RANKINGS — Search Console, sitemap, keyword focus
- 21-STARTUP-AGGRESSIVE — Fix order, 20-day plan, pipeline targets

---

## KNOWN ISSUES (fix these, do not introduce more)

### Critical
- [ ] Admin uses hardcoded password — no JWT, no session expiry
- [x] No rate limiting on POST /api/contact — **FIXED** (express-rate-limit, 5/hour, POST only)
- [ ] Services and Products routes (GET/POST) are not auth-protected

### High Priority  
- [x] Home hero copy still says "Enterprise-grade" — **FIXED** (Thrissur + real projects; stats row)
- [x] Portfolio on /work loads from API — **seed script** server/seed-portfolio.ts; add location/clientType to schema
- [x] SEO title on Home — **FIXED** (Thrissur Kerala in title/description)
- [x] Contact form — **FIXED** (5 fields: name, email, phone, country, requirement; WhatsApp CTA above)
- [x] WhatsApp button in Layout — **FIXED** (green #25D366, pre-fill message)

### Medium Priority
- [ ] Blog.tsx — no real articles yet
- [ ] No sitemap.xml (public/ has it but check if it's complete)
- [ ] No JSON-LD LocalBusiness schema (only Organization schema on Home)
- [ ] HexaCV.tsx page exists but may be empty — read it

---

## ABSOLUTE RULES

```
1. READ before WRITE — always cat the file first
2. Never use fake/placeholder data on public pages
3. Never use banned copy words (see MARKETING agent)
4. WhatsApp button: already in Layout.tsx — don't duplicate it
5. SEO component: already exists — import from '@/components/SEO'
6. Mobile first — test 375px always
7. Admin password 'hexastack@2024' — don't expose this in public JS
8. MongoDB ObjectId — all IDs are @db.ObjectId strings
9. Services/Products use native MongoDB driver — not Prisma client
10. Don't mix Prisma and native driver for same collection
```
