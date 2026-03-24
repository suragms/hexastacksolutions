# Security Agent — Output

**Input:** [architecture.md](./architecture.md), [tasks.md](./tasks.md), [testing.md](./testing.md)  
**Output:** Security requirements and mitigations for the HexaStack Solutions main site (Netlify, Express, Prisma, MongoDB). Actionable items for Deployment and Development.

---

## 1. Secrets and environment

| Requirement | Action |
|-------------|--------|
| **Never commit** | API keys, `DATABASE_URL`, `RESEND_API_KEY`, admin passwords, JWT secrets, any token. |
| **Use env vars** | Backend only: `server/` and Netlify (e.g. Netlify env / `.env` in build). Frontend: only `VITE_*` if needed (no secrets in client bundle). |
| **.env** | In `.gitignore`; never committed. |
| **.env.example** | Optional: list variable names with placeholders (e.g. `DATABASE_URL=`, `RESEND_API_KEY=`); no real values. |
| **Netlify** | Set env in Netlify dashboard (Site settings → Environment variables) for production; do not bake secrets into build. |

---

## 2. Input validation

| Area | Requirement | Mitigation |
|------|-------------|------------|
| **Contact form** | Server-side validation for all fields (name, email, phone, requirement). | Validate in `server/routes/contact.ts` (or equivalent); reject empty/invalid email; enforce max length. |
| **Email** | Format and length. | Use a schema (e.g. Zod) or regex; reject invalid before DB or email send. |
| **API body** | Parse JSON safely; reject oversized payloads. | Use Express body-parser limits; validate shape and types. |
| **URL params** | Location/service slugs. | Validate against allowed set or pattern; return 404 for invalid (no 500 with stack trace). |

- **Principle:** Never trust client input; validate and sanitize on the server before storage or forwarding.

---

## 3. API security

| Requirement | Action |
|-------------|--------|
| **Rate limiting** | Contact (and other public POST) endpoints. | Limit per IP (e.g. 5/hour for contact); return 429 or friendly message when exceeded. Already noted in architecture; verify implemented. |
| **Error responses** | No sensitive data to client. | Return generic message (e.g. “Something went wrong”); log details server-side only; never send stack traces or DB errors to client. |
| **CORS** | Restrict origins in production. | Allow only your frontend origin(s); avoid `*` in production. |
| **Methods** | Only needed methods per route. | e.g. Contact: POST (and GET for admin if needed); disable unnecessary methods. |

---

## 4. Access control

| Area | Requirement |
|------|-------------|
| **Public routes** | `/`, `/kerala`, `/gulf-vat`, `/seo/*`, `/contact`, `/services`, `/blog`, `/work` — no auth; no sensitive data in response. |
| **Admin** | `/admin` and admin API routes (e.g. portfolio, settings, enquiries) behind authentication. No public exposure of internal IDs or bulk data. |
| **Auth** | Use a consistent mechanism (e.g. session, JWT, or simple password check as in 00-MASTER); avoid hardcoded password in client bundle. Store secret server-side only. |

---

## 5. Common vulnerabilities and mitigations

| Risk | Mitigation |
|------|------------|
| **Injection (NoSQL/SQL)** | Use parameterised queries (Prisma handles this); avoid raw user input in queries. |
| **XSS** | React escapes by default; avoid `dangerouslySetInnerHTML` with user content. Sanitize if rich text is stored/displayed. |
| **CSRF** | For state-changing operations, use SameSite cookies, or CSRF tokens if using cookie-based auth. API with JWT in header is less CSRF-prone. |
| **Sensitive data in client** | No API keys or DB URLs in frontend bundle; no admin password in `src/`. |
| **Dependencies** | Run `npm audit`; fix high/critical; update packages periodically. |

---

## 6. Data protection

| Area | Requirement |
|------|-------------|
| **Contact/lead data** | Stored in MongoDB via Prisma; access only via backend; admin view protected by auth. |
| **HTTPS** | Production served over HTTPS only; no mixed content. Netlify provides TLS. |
| **Headers** | Optional: HSTS, X-Content-Type-Options, X-Frame-Options via Netlify headers config. |

---

## 7. Agent system and repo

| Requirement | Action |
|-------------|--------|
| **Secrets in docs** | Never put API keys, passwords, or tokens in `docs/agent-system/*.md` or `.cursor/` rules/skills. |
| **Private repo** | If repo is private, agent outputs are not public; still do not store secrets in Markdown. |

---

## 8. Actionable checklist for Development / Deployment

### Development

- [ ] Contact route: server-side validation (required fields, email format, max length); reject invalid with 4xx and user-friendly message.
- [ ] Contact route: rate limit (e.g. 5/hour per IP) on POST; return 429 or friendly message when exceeded.
- [ ] All API error handlers: no stack trace or DB error in response; log server-side only.
- [ ] Admin routes: require auth; return 401/403 when unauthenticated.
- [ ] No secrets in `src/` or in any client bundle.

### Deployment

- [ ] Set `DATABASE_URL`, `RESEND_API_KEY`, and any other secrets in Netlify environment variables only.
- [ ] Confirm `.env` is not committed and is in `.gitignore`.
- [ ] Run `npm audit` before deploy; fix high/critical.
- [ ] Confirm production URL is HTTPS and no mixed content.

---

## 9. Outputs for next agents

- **Performance Agent:** Will add Performance section to deployment.md; security-related performance (e.g. no blocking on validation) can be noted there if needed.
- **Deployment Agent:** Use this doc for env and secrets handling, HTTPS, and post-deploy security checks in deployment.md.

---

*Next: Performance Agent (adds to deployment.md) → [deployment.md](./deployment.md) — Deployment Agent*
