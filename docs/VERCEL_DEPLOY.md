# Vercel + MongoDB deployment

## Frontend and API on Vercel

- **Frontend:** Static build (`dist/`) is served from the project root.
- **API:** All `/api/*` requests are routed to the serverless function `api/index.js` (ESM). That file loads the Express app from `api/server-bundle.cjs` (built by `npm run build` via `node scripts/build-api-bundle.cjs`). The root `package.json` has `"type": "module"` so `api/index.js` uses `import`/`export`; the bundle stays CommonJS to avoid "Cannot use import statement outside a module".

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

Set these in **Vercel → Project → Settings → Environment Variables** for **Production** (and Preview if needed):

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | **Yes** | MongoDB Atlas connection string. Include DB name: `.../hexastacksolutions?retryWrites=true&w=majority`. Optional: `&connectTimeoutMS=10000&serverSelectionTimeoutMS=10000&appName=hexastack` |
| `JWT_SECRET` | **Yes** | Secret for JWT; use ≥32 characters (e.g. a long random string) |
| `ADMIN_PASSWORD` | **Yes** | The password you use to log in at https://www.hexastacksolutions.com/admin |
| `ADMIN_EMAIL` | No | Where contact form enquiries are sent (default: supporthexastack@hexastacksolutions.com) |
| `RESEND_API_KEY` | No | For sending reply emails from Admin Enquiries via Resend.com |

After adding or changing any variable, **redeploy** (Deployments → ⋯ → Redeploy) so the new values are used.

## Optional

- **VITE_API_URL:** Leave **unset** so the frontend uses the same origin (`/api/*`). Only set it if you host the API on a different domain.

## After deploy

1. **Verify API:** Open `https://www.hexastacksolutions.com/api/health` — you should see `{"status":"ok","db":"connected",...}` if `DATABASE_URL` is set.
2. **Verify Admin:** Open `https://www.hexastacksolutions.com/admin` and log in with your `ADMIN_PASSWORD`. If you see 503 or "not configured", re-check env vars and redeploy.
3. **DB schema:** Run once from your machine (with `DATABASE_URL` in `.env`): `npx prisma db push`. Contact form, Admin, and all API routes use the same Vercel deployment and MongoDB.

---

## Troubleshooting: /admin login not working

**"Invalid password" on production but works locally** — Your deployed app doesn’t have the same env as local. Do this:

1. **Vercel** → your project → **Settings** → **Environment Variables**.
2. Add **ADMIN_PASSWORD** with the **exact same value** you use locally (e.g. `hexastack@2024`). No extra spaces.
3. Add **JWT_SECRET** (any string ≥ 32 characters, e.g. `hexastack-secure-secret-key-2024`).
4. **Redeploy**: **Deployments** → ⋯ on latest → **Redeploy**. Env vars are applied on deploy; changing them alone is not enough.
5. Log in with the same password as in `ADMIN_PASSWORD`.

If you see **"Admin login not configured"** (503), `ADMIN_PASSWORD` (or `JWT_SECRET`) is missing in Vercel — add both and redeploy.

If you see **"Login API not found"** or **"Connection error"**, the `/api/*` route may not be running: confirm `api/index.js` exists, `vercel.json` routes `/api/(.*)` to `/api/index.js`, and the **Build Command** runs `npm run build` (so `api/server-bundle.cjs` is created). In Vercel → Settings → General, set **Output Directory** to `dist` so the frontend is served.

**"Server error" or 500 on admin login** — Do this in order:

1. **Vercel** → your project → **Settings** → **Environment Variables**.
2. Add these for **Production** (no typos, no extra spaces):
   - `DATABASE_URL` = your MongoDB Atlas connection string (include database name, e.g. `.../hexastacksolutions?retryWrites=true&w=majority`).
   - `JWT_SECRET` = a long secret (e.g. ≥32 characters).
   - `ADMIN_PASSWORD` = the password you will type on the login page.
3. **Redeploy**: **Deployments** → **⋯** on latest deployment → **Redeploy**. Env vars are only applied on deploy.
4. Try logging in again with `ADMIN_PASSWORD`.

If you still get 500 or "Cannot use import statement outside a module", the API bundle may not be built. **Build Command** must be `npm run build` (which runs `node scripts/build-api-bundle.cjs` and creates `api/server-bundle.cjs`). **Locally** run `npm run build` or `npm run build:api` then `npm run start` or `npm run dev` for the API.
