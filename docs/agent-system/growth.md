# Growth & Marketing — Output

**Input:** [research.md](./research.md), [strategy.md](./strategy.md), [uiux.md](./uiux.md)  
**Output:** SEO, messaging, conversion, and launch plan for HexaStack main site; operations and workflows (Growth Agent + Operations Agent).

---

## 1. Positioning (live site)

- **Domain:** hexastacksolutions.com (Netlify).
- **Promise:** Thrissur-based; Kerala & Gulf; talk to the developer; reply in 2 hours on WhatsApp.
- **Proof:** Portfolio, products (HexaBill, HexaCV), case-led blog.

---

## 2. SEO (on-site + ops)

- Use existing keyword targets in `.cursor/rules/02-SEO.md` — do not regenerate from scratch.
- Sitemap: `scripts/generate-sitemap.cjs` (extend to DB blog posts).
- GBP website field UTM: `https://hexastacksolutions.com/?utm_source=google_maps`.
- Ranking still requires: verified GBP + weekly posts, 2–4 real blogs/month, citations, page speed. No dashboard substitutes for these.

---

## 3. Content cadence (achievable)

| Channel | Cadence | Notes |
|---------|---------|--------|
| Blog | 2 real posts / month | Hook-first; anti-slop rules below |
| Google Business Profile | 3 short posts / week | Low effort; helps Maps |
| Social | Generate in admin → human edit → Copy & Open | No unsupervised auto-post |

### Anti-slop (banned)

Em-dash-heavy rhythm; “In today’s fast-paced world”; unlock/elevate/seamless/robust/cutting-edge/game-changing; rule-of-three in every paragraph; emoji-as-bullets.

### Required pattern

1. Hook in first sentence (number, pain, or Thrissur/Gulf local reference).
2. One concrete claim per section.
3. Plain words (WhatsApp-to-client tone, lightly cleaned).

---

## 4. Conversion

- Contact form + WhatsApp CTA; auto-confirmation email when Resend configured.
- UTM on channel links (`?utm_source=instagram` etc.) for attribution.
- Primary CTA: Get quote / Contact; secondary: WhatsApp.

---

## 5. Social and video

- LinkedIn / X / Facebook / WhatsApp share intents via SocialPostComposer.
- Instagram / YouTube: open platform + paste (API later).
- Video: template posters first; not AI video-gen for daily posting.

---

## 6. Analytics for growth

- Own dashboard: views by source (incl. google_maps UTM).
- GBP Performance dashboard (Google’s free UI) checked weekly for calls/directions.
- Label forecast charts as “projected trend,” not AI prediction.

---

## 7. Operations & workflows (Operations Agent)

### 7.1 Weekly ops

1. Post 3× to GBP (offer, project snippet, tip).
2. Reply to all CRM `new` / `contacted` within 2 hours business hours.
3. Review Analytics source breakdown; note spikes.
4. Assign overdue Tasks; clear COMPLETED older than 30 days if needed.

### 7.2 Monthly ops

1. Publish 2 blog posts (DB editor); verify sitemap.
2. Soft audit: AuditLog for unexpected edits.
3. Reset any staff password that leaked; rotate if needed.
4. Review won/lost CRM for messaging insights.

### 7.3 Staff onboarding

1. SUPER_ADMIN creates user → share temp password once.
2. Staff must change password on first login.
3. Grant STAFF by default; promote to ADMIN only for CTO-level.

### 7.4 Agent pipeline

- “Start next” = next agent in sequence; read previous output + `memory/*`.
- Feature work for admin ops: follow Steps 0–7 in `tasks.md`; one commit per step.

### 7.5 Incident / access

- Compromised account: SUPER_ADMIN soft-deactivates + reset password.
- Never share SUPER_ADMIN credentials; no shared env password after Step 0.

---

*Use alongside `.cursor/rules/02-SEO.md` for page titles and keywords.*
