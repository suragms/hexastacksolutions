# HexaStack Solutions — Website & API

Marketing site and backend for **HexaStack Solutions** (Thrissur, Kerala): services, portfolio, blog, contact, and a lightweight `/admin` dashboard. Built with **React 19**, **TypeScript**, **Vite 8**, **Tailwind CSS**, and an **Express** API backed by **Prisma** + **MongoDB**.

**Live:** [hexastacksolutions.com](https://www.hexastacksolutions.com)

## Stack

| Layer | Tech |
|--------|------|
| Frontend | React, React Router, Framer Motion, Vite |
| API | Express 5 (`server/`), Vercel serverless entry `api/index.js` |
| Data | Prisma ORM, MongoDB (`prisma/schema.prisma`) |
| Deploy | Vercel (static `dist/` + `/api/*` function) |

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm**
- **MongoDB** connection string for Prisma (`DATABASE_URL`)

## Setup

```bash
git clone <repository-url>
cd hexastack
npm install
cp .env.example .env
```

Edit `.env`: set **`DATABASE_URL`**, and for production API features **`ADMIN_PASSWORD`**, **`JWT_SECRET`**, etc. See `.env.example` for **`VITE_*`** options (admin password, optional review URL, proxy overrides).

`postinstall` runs **`prisma generate`** so the Prisma client is available after install.

## Development

Starts **Vite** (default `http://localhost:5173`) and the **API** on port **3001**, with Vite proxying **`/api`** to the backend.

```bash
npm run dev
```

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite + `tsx server/index.ts` (full stack) |
| `npm run dev:vite` | Frontend only |
| `npm run dev:api` | API only |
| `npm run api:dev` | Legacy Mongo sync service (`server/index.js`, port 4000) — optional |

## Production build

```bash
npm run build
```

Runs TypeScript build, Vite production build (including prerendered routes), then **`scripts/build-api-bundle.cjs`** to produce **`api/server-bundle.cjs`** for Vercel. Output: **`dist/`** + generated API bundle (bundle is gitignored).

```bash
npm run preview   # preview static dist locally
```

## Deployment (Vercel)

- **`vercel.json`**: `buildCommand`, `outputDirectory` (`dist`), `rewrites` for SPA + `/api`, `functions` include for `server-bundle.cjs`.
- Set **`DATABASE_URL`** and other secrets in the Vercel project **Environment Variables**.

More detail: **`docs/VERCEL_DEPLOY.md`**.

## Repository layout

```
src/           React app (pages, components, hooks, data)
server/        Express app + route modules
api/           Vercel entry (index.js) + built server bundle (local only)
prisma/        Schema & migrations context
public/        Static assets, sitemap, manifest
scripts/       Build helpers (e.g. API bundle)
```

## License

See [LICENSE](./LICENSE).
