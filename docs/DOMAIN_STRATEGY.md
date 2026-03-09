# HexaStack Domain Strategy

## Primary Domain Recommendation

| Extension | Pros | Cons | Verdict |
|-----------|-----|------|---------|
| **.com** | Global trust, SEO, email credibility | May be taken or expensive | **Best** if hexastack.com is available |
| **.in** | Strong for India; use as redirect if needed | Weaker for Gulf/global as primary | Good as regional or redirect |
| **.io** | Tech/SaaS association | Often expensive; less formal for SMB | Optional for product subdomain (e.g. app.hexastack.com) |
| **.ai** | AI-product signal | Newer, less trust for compliance-focused buyers | Optional for AI tool subdomain only |
| **.tech** | Modern, product feel | Less universal recognition | Backup |

**Recommendation:** Use **one primary domain** for all marketing, canonical URLs, and SEO. **hexastacksolutions.com** is the primary domain. Redirect any other owned domains (e.g. hexastack.in) to it. All OG tags, sitemap, and schema use https://hexastacksolutions.com.

## Subdomain Structure

| Subdomain | Purpose |
|-----------|--------|
| **www** or root | Marketing site (current site) |
| **app.** | Future: HexaBill or product dashboards (e.g. app.hexastack.com) |
| **blog.** | Optional: blog.hexastack.com for content (or /blog on main) |
| **demo.** | Optional: demo booking or sandbox (or /demo on main) |

Start with a single domain and /blog, /demo on main; introduce subdomains when products have separate apps.

## Email Format

- **Primary:** hello@[primary-domain] or contact@[primary-domain]
- **Legal/support:** Use "HexaStack Solutions" in signature and footer
- **Example:** contact@hexastack.com — "HexaStack Solutions" in email footer

## Implementation in Codebase

- Set `SITE_URL` (and any canonical base URL) to the chosen primary domain (e.g. `https://hexastacksolutions.com` or `https://hexastack.com`).
- Ensure `index.html`, `sitemap.xml`, `robots.txt`, and all `SEO.tsx` schema/OG tags use this same base URL.
- No mixed domains (e.g. hexastackaisolustions.site) in production.
