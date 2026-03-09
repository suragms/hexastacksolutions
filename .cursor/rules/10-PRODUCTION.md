# 10 — PRODUCTION AGENT
# Deploy & Performance | Netlify + MongoDB

---

## DEPLOY CHECKLIST

```
□ npm run build completes with zero errors
□ npx prisma generate runs (provider=mongodb)
□ All Netlify env vars set: DATABASE_URL, JWT_SECRET, NODE_ENV, ADMIN_EMAIL, RESEND_API_KEY
□ netlify.toml build command: npm install && npx prisma generate && npm run build
□ RESEND_API_KEY configured → test contact form → confirm email received
□ Lighthouse mobile score > 80 (test at pagespeed.web.dev)
□ No console errors in browser
□ /api/health returns { status: 'ok', db: 'connected' }
□ WhatsApp button color is green (#25D366) not dark
□ canonical URL is hexastacksolutions.com in index.html
□ "Enterprise-grade" removed from index.html meta
```
