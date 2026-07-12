# Deployment Agent — Output

**Input:** [architecture.md](./architecture.md)  
**Output:** Deployment steps for HexaStack Solutions main site (Netlify + server + Prisma/MongoDB)

---

## 1. Current stack (this repo)

| Component | Technology |
|-----------|------------|
| **Frontend** | Vite 7, React 19 — build output: `dist/` |
| **Backend** | Express 5 (TypeScript) in `server/`; Prisma, MongoDB |
| **Hosting** | Netlify: static from `dist/`, API via Netlify Functions |
| **Database** | MongoDB (connection string in env) |

---

## 2. Netlify setup

1. Connect repo to Netlify (GitHub/GitLab).
2. **Build settings:**  
   - Build command: `prisma generate && vite build` (or `npm run build`).  
   - Publish directory: `dist`.  
   - Root: project root.
3. **Environment variables:** Add in Netlify dashboard, e.g. `DATABASE_URL`, `JWT_SECRET`, and any API keys. Do not commit secrets.
4. **Functions:** `netlify/functions/api.ts` wraps `server/index.ts` with serverless-http. Netlify runs this for `/api/*` (see `netlify.toml` and `public/_redirects`).
5. **Redirects:** SPA fallback and `/api/*` → `/.netlify/functions/api` are in `netlify.toml` and/or `public/_redirects`.
6. **Domain:** Add custom domain (e.g. hexastacksolutions.com) in Netlify; update DNS as instructed.

---

## 3. Local development

- **Full stack:** `npm run dev` — runs Vite dev server and Express (nodemon + ts-node) concurrently.
- **Frontend only:** `npm run client` (Vite).
- **Backend only:** `npm run server` (Express on port 3001; Vite proxies `/api` to it via `vite.config.ts`).
- **Database:** Ensure MongoDB is reachable; set `DATABASE_URL` in `.env`. Run `npm run db:push` or `npm run db:migrate` as needed.

---

## 4. Post-deploy checks

- Visit production URL; confirm 200 and correct content.
- Test contact/form and any API routes.
- Run Lighthouse and fix critical issues.
- Submit sitemap in Google Search Console if not already done.

---

## 5. Performance (Performance Agent)

### 5.1 Load time targets

- **LCP (Largest Contentful Paint):** &lt; 2.5s on key pages (home, Kerala hub, Gulf VAT hub, contact) on 4G.
- **FCP (First Contentful Paint):** &lt; 1.8s.
- **Lighthouse:** Aim for Performance &gt; 70, Accessibility &gt; 90 on key routes (testing.md). Re-run after deploy and fix regressions.

### 5.2 Frontend

- **Bundle:** Vite build produces chunked JS/CSS; avoid single huge bundles. Use dynamic import for heavy or below-the-fold components if needed.
- **Images:** Optimize and lazy-load below-the-fold images; use appropriate format (e.g. WebP where supported); avoid oversized source images.
- **Fonts:** Few fonts (per uiux.md); subset or self-host if custom fonts add weight; prefer system or one webfont.
- **Animations:** No heavy animations for MVP; prefer CSS or light use of motion libs.

### 5.3 Backend and database

- **Queries:** Use Prisma select/include to fetch only needed fields; avoid N+1 (e.g. list + relations in one query where possible).
- **Indexes:** Add MongoDB indexes for frequent filters (e.g. contact by date, portfolio by slug); verify with Prisma schema or raw index creation.
- **Response size:** Paginate list endpoints (e.g. admin enquiries, portfolio); cap page size.

### 5.4 Caching and scalability

- **Static:** Netlify serves `dist/` with CDN; cache headers for assets (Netlify default). Ensure HTML has short cache or no-cache if content changes often; long cache for hashed JS/CSS.
- **API:** Stateless Express; no in-memory session store required for MVP. For high traffic, consider response caching for read-heavy public routes (e.g. services list) or edge caching later.
- **Functions:** Netlify Functions cold start; keep handler lean; avoid heavy init in global scope. Warm critical paths if needed (e.g. health check ping).

### 5.5 Resource usage

- **Dependencies:** Audit bundle size (`npm run build` and inspect `dist/`); remove unused deps. Run `npm audit` for security (security.md).
- **Logging:** Avoid logging large payloads or PII in production; use log levels.

---

## 6. Optional product sites

- Separate product sites (e.g. HexaBill marketing) can be:
  - Same repo with an extra route or subfolder, or
  - Separate repo deployed to Netlify/Vercel with its own domain or subdomain.
- This deployment guide is for the **main site** (hexastacksolutions.com) and its API only.

---

---

## 7. Staff / CRM env vars (Netlify)

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | yes | MongoDB |
| `JWT_SECRET` | yes | Production |
| `RESEND_API_KEY` | recommended | Confirm + quoted emails |
| `WHATSAPP_TOKEN` | optional | Cloud API |
| `WHATSAPP_PHONE_ID` | optional | |
| `WHATSAPP_TEMPLATE` | optional | Approved template name |
| `OPENROUTER_API_KEY` | optional | Free-tier caption gen |
| `OLLAMA_BASE_URL` | optional | Local LLM alternative |
| `MONTHLY_REVENUE_TARGET` | optional | Default `50000` (INR) for Revenue MTD bar |
| `OPS_DIGEST_SECRET` | optional | Cron header `x-ops-digest-secret` for `POST /api/ops/digest` without JWT |

Remove `ADMIN_PASSWORD` / `VITE_ADMIN_PASSWORD` after Step 0. Bootstrap first SUPER_ADMIN via seed script or one-time register.

### Ops digest cron (optional, post-MVP UI)

Netlify scheduled function or external cron can `POST /api/ops/digest` with header `x-ops-digest-secret: $OPS_DIGEST_SECRET`. UI “Send digest now” remains SUPER_ADMIN-only via JWT. Digests never email clients.

### Performance notes (ops features)

- Paginate AuditLog and CRM lists (cap 50–100).
- Analytics aggregate by date/source in DB queries, not client-side full PageView dumps.
- AI generate: short timeout (15–30s); never block contact form path.
- After schema change: `npx prisma generate` + `npx prisma db push` with `DATABASE_URL`.

---

*Pipeline: [growth.md](./growth.md) for SEO and launch.*
