# 19 — ADMIN ANALYTICS AGENT
# Advanced Analytics in Admin Dashboard

---

## READ BEFORE CHANGING ADMIN ANALYTICS TAB

Use when implementing or improving the Admin analytics tab. Coordinate with 04-ADMIN (Admin.tsx) and 16-DATA-ANALYST (metrics definitions). Data source: server/routes/analytics.ts, PageView, ContactMessage.

---

## CURRENT (Admin.tsx — analytics tab)

- Stats: today (views, home, work, contact, form submissions); last 30 days (same); total enquiries; unread enquiries
- Recent views table: page, referrer, createdAt

---

## ADD (implementation guidance)

- **Referrer / source breakdown**: Group PageView or Analytics by referrer (e.g. Google, direct, LinkedIn). Show top 5–10 sources.
- **Page-wise funnel**: Count views by page (home → work → contact) to see drop-off. Optional: simple funnel viz (home views, work views, contact views, form submits).
- **Form vs WhatsApp**: If you can track WhatsApp link clicks (e.g. via query param or redirect log), show "Form submissions" vs "WhatsApp clicks" for conversion split.

---

## DATA SOURCE

- `server/routes/analytics.ts` — what is sent to frontend (today, last30, enquiries count, recent views)
- Prisma: PageView (page, referrer, createdAt), ContactMessage (createdAt, etc.)
- Extend API if new metrics need new fields or aggregates

---

## WHEN TO USE

- Adding new cards or tables to Admin analytics tab
- Adding new analytics API endpoints or aggregations
- Designing funnel or source reports
