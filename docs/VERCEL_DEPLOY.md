# Vercel + MongoDB deployment

## Frontend and API on Vercel

- **Frontend:** Static build (`dist/`) is served from the project root.
- **API:** All `/api/*` requests are handled by the serverless function at `api/[[...path]].ts`, which forwards to the Express app in `server/index.ts`.

## Required environment variables (Vercel Dashboard → Project → Settings → Environment Variables)

Set these for **Production** (and optionally Preview):

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | **Yes** | MongoDB connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority`) |
| `JWT_SECRET` | **Yes** | Secret for JWT (min 32 characters) |
| `ADMIN_PASSWORD` | **Yes** | Admin panel password |
| `ADMIN_EMAIL` | No | Where contact notifications are sent (default: supporthexastack@hexastacksolutions.com) |
| `RESEND_API_KEY` | No | For sending reply emails via Resend.com |

## Optional

- **VITE_API_URL:** Leave **unset** so the frontend uses the same origin (`/api/*`). Only set it if you host the API on a different domain.

## After deploy

1. Run **Prisma** once to ensure the DB schema is in sync (e.g. from your machine with `DATABASE_URL` in `.env`):  
   `npx prisma db push`
2. Contact form, Admin, and all API routes use the same Vercel deployment and MongoDB.
