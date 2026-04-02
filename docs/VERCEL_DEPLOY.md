# Vercel + MongoDB deployment

## Production not updating / latest design not showing

If you pushed but production still shows the old design:

1. **Confirm Production Branch**  
   Vercel → your project → **Settings** → **Git** → **Production Branch**.  
   It must be the branch you push to (e.g. `main` or `master`). If it was `master` and you only pushed to `main`, production won’t update until you push to `master` or change Production Branch to `main`.

2. **Redeploy and clear cache**  
   **Deployments** → open the **⋯** menu on the **latest** deployment → **Redeploy**.  
   If you see **“Redeploy with existing Build Cache”**, choose **“Redeploy”** without cache (or use **Clear cache and redeploy** if available) so the full build runs and new static files are uploaded.

3. **Check build settings**  
   **Settings** → **General**:
   - **Build Command:** `npm run build` (must run Vite + API bundle).
   - **Output Directory:** `dist`.
   - **Root Directory:** leave blank (repo root). If set to a subfolder, `package.json` and `vercel.json` must be inside it.

4. **Check the latest deployment**  
   **Deployments** → open the top deployment. If **Building** or **Error**, production won’t change. Fix any build errors in the logs. If **Ready**, the new build is live; hard-refresh the site (Ctrl+Shift+R / Cmd+Shift+R) or try in an incognito window.

5. **Confirm new build is served**  
   On the live site, right-click the footer → **Inspect**. In the HTML, the `<footer>` should have `data-deploy-version="2025-03-14"` (or the date we set). If you don’t see it, the browser or CDN is still serving an old bundle.

### Build failed: timed out (45 minutes)

Vercel caps build duration (often **45 minutes** on Hobby). A timeout usually means the build **stuck** (open handles, a hung step), not that the project needs 45 minutes to compile.

**Prerender on Vercel:** The repo skips the Vite prerender plugin when `VERCEL=1` (set automatically by Vercel) so `vite build` does not run route-by-route SSR during the deploy. That avoids long or stuck prerender steps and keeps builds short. The site is still a normal SPA with client-side routing and your SEO hooks (`usePageSeo`, JSON-LD, etc.).

| Variable | Effect |
|----------|--------|
| *(default on Vercel)* | Prerender **off** — fast, reliable builds. |
| `ENABLE_PRERENDER=1` | Turn prerender **on** for Vercel (only if you need static HTML per route and builds complete). |
| `SKIP_PRERENDER=1` | Force prerender **off** (any environment). |

If builds are still slow after this, check the log for the last step printed (e.g. `tsc`, `vite build`, `[build-api-bundle]`). **Enhanced Builds** on Vercel can increase CPU/RAM but will not fix a true hang.

---

## Frontend and API on Vercel

- **Frontend:** Static build (`dist/`) is served from the project root. Build command: `npm run build` (runs Vite then the API bundle script). In Vercel → Settings → General, **Build Command** should be `npm run build` and **Output Directory** `dist`.
- **API:** All `/api/*` requests are rewritten to the serverless function `api/index.js` (ESM). That file loads the Express app from `api/server-bundle.cjs`, produced by **`npm run build`** (`tsc -b && vite build && node scripts/build-api-bundle.cjs`). `vercel.json` uses **`functions["api/index.js"].includeFiles`** so the bundle is shipped with the function (no legacy `builds` array — Dashboard **Build Command** / **Output Directory** now apply; root `vercel.json` sets `buildCommand` and `outputDirectory` to match). The repo has `"type": "module"` so `api/index.js` uses ESM; the bundle is CommonJS. If the bundle is missing, the API returns 503 JSON instead of crashing.

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

**If you see "Server error" on admin login:**  
1. Open **https://www.hexastacksolutions.com/api/admin/status** — it must show `{"configured":true}`.  
2. In Vercel → Settings → Environment Variables, ensure **ADMIN_PASSWORD** and **JWT_SECRET** exist and are checked for **Production** (not only Preview).  
3. **Redeploy**: Deployments → ⋯ on latest → Redeploy. Variables are applied only on deploy.

## Optional

- **VITE_API_URL:** Leave **unset** so the frontend uses the same origin (`/api/*`). Only set it if you host the API on a different domain.

## After deploy

1. **Verify API:** Open `https://www.hexastacksolutions.com/api/health` — you should see `{"status":"ok","db":"connected",...}` if `DATABASE_URL` is set.
2. **Verify Admin:** Open `https://www.hexastacksolutions.com/admin` and log in with your `ADMIN_PASSWORD`. If you see 503 or "not configured", re-check env vars and redeploy.
3. **DB schema:** Run once from your machine (with `DATABASE_URL` in `.env`): `npx prisma db push`. Contact form, Admin, and all API routes use the same Vercel deployment and MongoDB.

---

## Troubleshooting: /admin login not working

**1. Check if the server sees your env**  
Open `https://www.hexastacksolutions.com/api/admin/status` in the browser. It returns `{ "configured": true }` only when `ADMIN_PASSWORD` and `JWT_SECRET` are both set (no values are revealed). If you see `{ "configured": false }`, add both in Vercel → Settings → Environment Variables and redeploy.

**2. "Invalid password" on production but works locally** — Your deployed app doesn’t have the same env as local. Do this:

1. **Vercel** → your project → **Settings** → **Environment Variables**.
2. Add **ADMIN_PASSWORD** with the **exact same value** you use locally (e.g. `hexastack@2024`). No extra spaces.
3. Add **JWT_SECRET** (any string ≥ 32 characters, e.g. `hexastack-secure-secret-key-2024`).
4. **Redeploy**: **Deployments** → ⋯ on latest → **Redeploy**. Env vars are applied on deploy; changing them alone is not enough.
5. Log in with the same password as in `ADMIN_PASSWORD`.

If you see **"Admin login not configured"** (503), `ADMIN_PASSWORD` (or `JWT_SECRET`) is missing in Vercel — add both and redeploy.

If you see **"Password is required"** or the login request seems to send an empty body (e.g. only on the deployed site, not locally), the API now parses the request body in the handler before calling Express so same-origin POSTs from the frontend are handled correctly. Redeploy to pick up this fix.

If you see **"Login API not found"** or **"Connection error"**, the `/api/*` route may not be running: confirm `api/index.js` exists, `vercel.json` routes `/api/(.*)` to `/api/index.js`, and the **Build Command** runs `npm run build` (so `api/server-bundle.cjs` is created). In Vercel → Settings → General, set **Output Directory** to `dist` so the frontend is served.

**"Server error" or 500 on admin login** — Do this in order:

1. **Vercel** → your project → **Settings** → **Environment Variables**.
2. Add these for **Production** (no typos, no extra spaces):
   - `DATABASE_URL` = your MongoDB Atlas connection string (include database name, e.g. `.../hexastacksolutions?retryWrites=true&w=majority`).
   - `JWT_SECRET` = a long secret (e.g. ≥32 characters).
   - `ADMIN_PASSWORD` = the password you will type on the login page.
3. **Redeploy**: **Deployments** → **⋯** on latest deployment → **Redeploy**. Env vars are only applied on deploy.
4. Try logging in again with `ADMIN_PASSWORD`.

If you still get 500 or "Cannot use import statement outside a module", the API bundle may not be built or included. **Build Command** must be `npm run build` (which runs `vite build && node scripts/build-api-bundle.cjs` and creates `dist/` and `api/server-bundle.cjs`). In **Vercel → Settings → General**, set **Root Directory** to blank (repo root) and **Build Command** to `npm run build`. Redeploy **without cache** (Deployments → ⋯ → Redeploy, clear cache if available) so the API bundle is built and included via `functions["api/index.js"].includeFiles`. **MongoDB Atlas:** ensure Network Access allows `0.0.0.0/0` (or Vercel IPs) so the serverless API can connect. **Locally** run `npm run build` then `npm run start` or `npm run dev` to test the API.
