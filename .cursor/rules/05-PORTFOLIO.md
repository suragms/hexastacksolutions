# 05 — PORTFOLIO AGENT
# Work Page & Case Studies | Built from real Work.tsx analysis

---

## READ BEFORE ANY PORTFOLIO TASK

```bash
cat src/pages/Work.tsx         # current work page
cat server/routes/portfolio.ts # portfolio API
```

## THE 3 REAL PROJECTS (never fake — seed these via backend)

```
1. Gulf Restaurant POS — UAE — React+Node.js+MongoDB+Socket.io
2. Medical Lab System — Thrissur Kerala — React+Express+PostgreSQL
3. NutriScan AI — SaaS/Global — FastAPI+GPT-4o Vision+SQLite
```

## WORK PAGE STRUCTURE (rebuild if current version is weak)

```tsx
// Filter tabs:
const filters = ['All', 'Software', 'AI', 'Gulf', 'Kerala'];
const [activeFilter, setActiveFilter] = useState('All');

// Filter logic:
const filtered = projects.filter(p => {
  if (activeFilter === 'All') return true;
  if (activeFilter === 'Gulf') return p.location?.includes('UAE') || p.location?.includes('Gulf');
  if (activeFilter === 'Kerala') return p.location?.includes('Kerala');
  if (activeFilter === 'AI') return p.techStack?.includes('AI') || p.techStack?.includes('GPT');
  if (activeFilter === 'Software') return p.clientType === 'Restaurant' || p.clientType === 'Healthcare';
  return true;
});

// Project card MUST show:
// - Screenshot (from media array — p.media[0]?.url)
// - Location badge: "🇦🇪 UAE" or "📍 Thrissur, Kerala" or "🌐 SaaS"
// - Title
// - Tech stack pills
// - "View Case Study" button → open modal
```

## CASE STUDY MODAL (add to Work.tsx)

```tsx
// On "View Case Study" click, open dialog (use Dialog from shadcn/ui — already installed)
// Modal shows:
// - Large screenshot
// - Problem (2-3 sentences)
// - What we built (3-4 sentences)  
// - Result (1-2 sentences with numbers)
// - Tech stack list
// - "Have a similar project? WhatsApp us" green button
```
