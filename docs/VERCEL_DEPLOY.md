# Vercel + MongoDB deployment

## Frontend and API on Vercel

- **Frontend:** Static build (`dist/`) is served from the project root.
- **API:** All `/api/*` requests are handled by the serverless function at `api/[[...path]].ts`, which forwards to the Express app in `server/index.ts`.

---

## How to set environment variables in Vercel

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)** and sign in.
2. Open your **project** (e.g. hexastack-solutions).
3. Click the **Settings** tab.
4. In the left sidebar, click **Environment Variables**.
5. For each variable:
   - **Key:** e.g. `DATABASE_URL`
   - **Value:** your actual value (paste from `.env` or type it)
   - **Environments:** tick **Production** (and **Preview** if you want them in preview deployments).
   - Click **Save**.
6. **Redeploy** so the new variables are used:
   - Go to **Deployments** → open the **⋯** on the latest deployment → **Redeploy** (or push a new commit).

You can also add/update variables when deploying via CLI:  
`vercel env add DATABASE_URL` (then paste the value when prompted).

---

## Required environment variables

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

---

## Troubleshooting: /admin login not working

If [https://www.hexastacksolutions.com/admin](https://www.hexastacksolutions.com/admin) does not accept your password:

1. **Set env vars in Vercel** (Project → Settings → Environment Variables):
   - **ADMIN_PASSWORD** — the password you use to log in (e.g. a strong password; dev default is `hexastack@2024`).
   - **JWT_SECRET** — any string ≥ 32 characters (used to sign the session token).
2. **Redeploy** after changing env vars (Deployments → ⋯ → Redeploy). Env is baked in at build/start.
3. If you see "Login API not found" or "Connection error", the `/api/*` route may not be running: confirm `api/[[...path]].ts` is in the repo and that the deployment completed without errors.
4. Use the same password in the login form as the one set in `ADMIN_PASSWORD`.
