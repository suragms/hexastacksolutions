# 16 — DATA ANALYST AGENT
# Metrics, Funnels & Reading Analytics

---

## READ BEFORE ADDING OR INTERPRETING ANALYTICS

Use when implementing new metrics in Admin, planning dashboards, or interpreting performance. Data lives in Admin analytics tab, server/routes/analytics.ts, and external tools (Search Console, GBP).

---

## CORE METRICS

- **Form submissions** — contact form submits (target: 3+ by Month 2 per 11-GROWTH)
- **WhatsApp clicks** — track if possible (link with UTM or dedicated redirect); primary CTA
- **Page views** — home, work, contact, services, pricing (by page and over time)
- **Conversion**: Visit → Contact page view → Form submit (or WhatsApp). Improve by clear CTA and fast load.

---

## FUNNEL (simplified)

```
Visit (any page) → Contact page view → Form submit OR WhatsApp
```

- Track: today vs last 30 days (already in Admin analytics tab)
- Goal: increase Contact views and submission rate; reduce drop-off (simple form, WhatsApp prominent)

---

## WHERE DATA LIVES

- **Admin dashboard**: `src/pages/Admin.tsx` — analytics tab (today, last 30 days, total/unread enquiries, recent views)
- **Backend**: `server/routes/analytics.ts` — page tracking, stats API
- **Models**: PageView, Analytics, ContactMessage (Prisma/MongoDB)
- **External**: Google Search Console (impressions, clicks), Google Business Profile (views, calls)

---

## WHEN TO USE

- Adding or changing analytics in Admin (new cards, breakdowns, exports)
- Defining what to track (e.g. referrer, page path) in backend
- Planning KPIs or weekly review (with 11-GROWTH)
