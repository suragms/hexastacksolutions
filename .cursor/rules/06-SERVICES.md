# 06 — SERVICES AGENT
# Services Pages | Real service data

---

## READ BEFORE ANY SERVICES TASK

```bash
cat src/pages/Services.tsx           # current services page
cat server/routes/services.ts        # API — uses MongoDB native driver
```

## SERVICES DATA (use in seed/admin — 9 services)

```typescript
const services = [
  { name: 'Business Website', description: 'Mobile-first, SEO-optimized websites for shops, clinics, and businesses. Custom-coded, not templates.', displayOrder: 0 },
  { name: 'E-commerce Website', description: 'Online store with products, cart, UPI/card payments, and WhatsApp order integration.', displayOrder: 1 },
  { name: 'Business Web Application', description: 'Login-protected systems with roles, data management, reports, and automation.', displayOrder: 2 },
  { name: 'Restaurant / Shop POS', description: 'Complete POS with orders, inventory, billing, and daily reports. Built for Kerala and Gulf restaurants.', displayOrder: 3 },
  { name: 'AI-Powered Application', description: 'AI apps using OpenAI Vision, GPT-4o, and custom ML — for health, HR, logistics.', displayOrder: 4 },
  { name: 'SaaS Product Development', description: 'Full SaaS with user accounts, subscriptions, and admin panels. You own 100%.', displayOrder: 5 },
  { name: 'Website Redesign + SEO', description: 'Fix old or bad websites. Improve Google ranking. Before/after results shown.', displayOrder: 6 },
  { name: 'WhatsApp Business Setup', description: 'Automated replies, product catalog, broadcast lists. Done in 3-5 days.', displayOrder: 7 },
  { name: 'Monthly Maintenance', description: 'Updates, backups, hosting, bug fixes. Recurring support for all clients.', displayOrder: 8 },
];
```

## SERVICE DETAIL SUB-PAGES (add these routes)

```tsx
// Add to App.tsx:
import ServiceDetail from '@/pages/services/ServiceDetail';

<Route path="/services/:slug" element={<ServiceDetail />} />

// ServiceDetail.tsx: dynamic page that loads service by slug
// Each sub-page has: hero, who-it's-for, included, case-study, process, FAQ, CTA
```
