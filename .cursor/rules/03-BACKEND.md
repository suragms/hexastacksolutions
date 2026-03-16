# 03 — BACKEND AGENT
# API & Database | Built from real server/ code

---

## READ BEFORE ANY BACKEND TASK

```bash
cat server/index.ts          # Express setup, all route registrations
cat server/db.ts             # Prisma client export
cat server/mongodb.ts        # Native MongoDB driver — used by services.ts + products.ts
cat server/routes/[name].ts  # Always read the specific route before changing it
cat server/utils/auth.ts     # JWT utils if they exist
cat prisma/schema.prisma     # MongoDB Prisma schema (provider = "mongodb")
```

---

## ARCHITECTURE FACTS (from real code)

### Two database clients — CRITICAL
```typescript
// 1. Prisma client (server/db.ts) — for Prisma models:
import { db } from '../db';
// Use for: User, Project, Feedback, Task, Portfolio, ContactMessage, 
//          CompanySettings, Analytics, PageView, WebsiteContent

// 2. Native MongoDB driver (server/mongodb.ts) — for:
import { getCollection, ObjectId } from '../mongodb';
// Use for: Service collection, Product collection
// These use getCollection('Service') and getCollection('Product')

// NEVER mix: do not use db.service or db.product — they don't exist in Prisma
```

### Admin authentication (from Admin.tsx)
```typescript
// Current: simple password check in the frontend
const ADMIN_PASSWORD = 'hexastack@2024';
// This is NOT a real auth system — it's a frontend-only check
// The API has NO JWT protection currently
// All /api/contact GET, /api/portfolio POST etc are open to anyone

// TODO: Add real auth — see issue list
```

### Route registrations (from server/index.ts)
```typescript
app.use('/api/projects',   projectsRouter);
app.use('/api/feedback',   feedbackRouter);
app.use('/api/contact',    contactRouter);
app.use('/api/auth',       authRouter);
app.use('/api/users',      usersRouter);
app.use('/api/settings',   settingsRouter);
app.use('/api/upload',     uploadRouter);
app.use('/api/portfolio',  portfolioRouter);
app.use('/api/analytics',  analyticsRouter);
app.use('/api/services',   servicesRouter);
app.use('/api/products',   productsRouter);
```

---

## CONTACT ROUTE (from real contact.ts — don't rebuild)

Already has:
- POST /api/contact — saves to MongoDB + sends Resend email if RESEND_API_KEY set
- GET /api/contact — list all enquiries
- PATCH /api/contact/:id — mark read/starred
- DELETE /api/contact/:id — delete
- POST /api/contact/:id/reply — sends email reply via Resend

**What's missing — add these:**
```typescript
// 1. Rate limiting (add to server/index.ts or contact.ts):
import rateLimit from 'express-rate-limit';

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5,                     // max 5 per IP
  message: { error: 'Too many enquiries. Please try again in an hour.' }
});

// Apply BEFORE the contact route:
app.use('/api/contact', contactLimiter, contactRouter as any);
// Note: only limit POST — not GET. Add method check inside if needed.

// 2. Install rate limit:
// npm install express-rate-limit
// npm install --save-dev @types/express-rate-limit
```

---

## PORTFOLIO ROUTE (from real portfolio.ts)

Already has: GET / POST / PATCH /:id / DELETE /:id

**What's missing — add these fields to POST/PATCH:**
```typescript
// Add location and clientType to Portfolio model and route:
// In prisma/schema.prisma, add:
//   location    String?   // "UAE" | "Thrissur, Kerala" | "India"
//   clientType  String?   // "Restaurant" | "Healthcare" | "SaaS" | "Retail"

// Then run: npx prisma db push

// In portfolio.ts POST route, add:
const { title, description, techStack, projectUrl, featured, imageUrl, location, clientType } = req.body;
// Add to data: { location, clientType }
```

---

## SEED REAL PORTFOLIO DATA

```typescript
// Add to server/seed.ts or run manually once:
const realProjects = [
  {
    title: 'Gulf Restaurant POS System',
    description: 'Complete restaurant management system for a UAE client. Real-time order tracking, table management, kitchen display, inventory, and daily sales reports. Handles 200+ orders/day.',
    techStack: 'React, Node.js, MongoDB, Socket.io, Express',
    location: 'UAE',
    clientType: 'Restaurant',
    featured: true,
    displayOrder: 0,
  },
  {
    title: 'Medical Lab Management System — Kerala',
    description: 'Full laboratory information system for a Kerala clinic. Patient registration, test ordering, sample tracking, result entry, automated PDF reports, and billing. Used daily.',
    techStack: 'React, Express, PostgreSQL, TypeScript',
    location: 'Thrissur, Kerala',
    clientType: 'Healthcare',
    featured: true,
    displayOrder: 1,
  },
  {
    title: 'NutriScan AI — Nutrition Tracking SaaS',
    description: 'AI-powered nutrition app. Users photograph food, GPT-4o Vision returns full macro+micro nutrient breakdown. Live SaaS with user accounts, history, admin panel.',
    techStack: 'FastAPI, Python, OpenAI GPT-4o Vision, SQLite, JavaScript',
    location: 'SaaS (Global)',
    clientType: 'SaaS / Health Tech',
    featured: true,
    displayOrder: 2,
  },
];

// Use: await db.portfolio.createMany({ data: realProjects });
```

---

## ENV VARIABLES REQUIRED

```env
# .env (local) — never commit
DATABASE_URL="mongodb+srv://..."   # MongoDB Atlas connection string
JWT_SECRET="[64 char random string]"
NODE_ENV="development"
ADMIN_EMAIL="supporthexastack@hexastacksolutions.com"
RESEND_API_KEY="re_..."            # from resend.com — already integrated in code

# Netlify dashboard — set same vars for production
```

---

## BACKEND CHECKLIST

```
□ Rate limiting added to POST /api/contact
□ RESEND_API_KEY set in Netlify dashboard
□ Real portfolio projects seeded (3 real projects)
□ MongoDB Atlas connected (DATABASE_URL set)
□ Admin email receiving enquiry notifications
□ /api/health returns status: ok
□ No 500 errors in Netlify function logs
□ CORS allows hexastacksolutions.com in production
```
