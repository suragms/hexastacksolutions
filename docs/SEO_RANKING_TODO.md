# HexaStack Solutions — SEO & Ranking Master To-Do List

**Complete in this order. One by one.**  
Anandu & Surag | Vatanappally, Thrissur, Kerala | March 2026

---

## How to use this list

- [ ] = Not done  
- [x] = Done  
Work from **#1** to the end. Do not skip. Mark completed items with `[x]`.

---

## SECTION 1 — ROOT CAUSE #1: REACT SPA (GOOGLE SEES BLANK PAGE)

| # | Task | Action | Priority |
|---|------|--------|----------|
| 1 | Install SSG plugin | `npm install vite-plugin-ssg` | CRITICAL |
| 2 | Update vite.config.ts | Add ssgOptions and configure for static HTML generation | CRITICAL |
| 3 | Update src/main.tsx | Switch to ViteSSG with routes for prerendering | CRITICAL |
| 4 | Update package.json build script | Use `vite-ssg build` for build | CRITICAL |
| 5 | Update netlify.toml | Build command: `npm install && npx prisma generate && npm run build`, publish = dist | CRITICAL |
| 6 | Verify build | Run `npm run build` and confirm each route has real .html with content | CRITICAL |
| 7 | (Optional) Prerender.io | If SSG delayed: sign up prerender.io, add X-Prerender-Token in netlify headers as band-aid | MEDIUM |

---

## SECTION 2 — ROOT CAUSE #2: ZERO BACKLINKS

| # | Task | Action | Priority |
|---|------|--------|----------|
| 8 | JustDial listing | justdial.com/register-your-business — Add HexaStack, hexastacksolutions.com | HIGH |
| 9 | Sulekha listing | sulekha.com — Add software company listing | HIGH |
| 10 | IndiaMART seller | indiamart.com/seller — Create seller profile, list services | HIGH |
| 11 | Clutch.co profile | clutch.co/profile/create — Verified software company listing | HIGH |
| 12 | GitHub organization | github.com/orgs/new — Add hexastacksolutions.com in profile | MEDIUM |
| 13 | Google Business Posts | Once GBP verified: weekly posts with link to site | HIGH |
| 14 | Kerala startup outreach | Email kerala.gov.in/startup, keralastartup.in — Thrissur software company | HIGH |
| 15 | LinkedIn company page | Post case studies with link to hexastacksolutions.com/work | MEDIUM |
| 16 | Product Hunt launch | Submit HexaBill or NutriScan AI — producthunt.com | HIGH |
| 17 | Guest post | "Write for us" + Kerala business — one article, link back | HIGH |
| 18 | GoodFirms profile | goodfirms.co — Free listing with website link | MEDIUM |
| 19 | Thrissur Facebook groups | Share blog articles with link in Thrissur Business Network | LOW-MED |
| 20 | HARO signup | helpareporter.com — Reply as expert for software/tech India | VERY HIGH |
| 21 | Local newspaper pitch | Email Mathrubhumi, Kerala Kaumudi — "Thrissur team built UAE restaurant software" | VERY HIGH |
| 22 | Customer testimonial backlinks | Ask ZAYOGA + medical lab client for "Software by HexaStack" + link on their site | HIGH |

---

## SECTION 3 — ROOT CAUSE #3: GOOGLE BUSINESS PROFILE NOT VERIFIED

| # | Task | Action | Priority |
|---|------|--------|----------|
| 23 | Check verification option | business.google.com — See if phone / video / postcard available | CRITICAL |
| 24 | Complete phone verification | If available: verify by phone today | CRITICAL |
| 25 | Or video verification | If no phone: request video call, show workspace | CRITICAL |
| 26 | Add 10+ GBP photos | Project screenshots, POS UI, medical lab, NutriScan, logo, team | HIGH |
| 27 | Full business description | 300 chars: "HexaStack Solutions builds custom software, websites, POS for Kerala and Gulf. Thrissur. From Rs.15,000." | HIGH |
| 28 | Add all services in GBP | Website Dev, POS, Medical Software, AI, Mobile App, WhatsApp Business | HIGH |
| 29 | Set service area | Thrissur District, Kerala; UAE secondary | HIGH |
| 30 | Set categories | Primary: Software Company; Secondary: Website Designer, Application Developer | HIGH |
| 31 | Add Q&A (3) | Self-answer: pricing, Gulf clients, timeline | MEDIUM |
| 32 | First GBP post | "Custom POS for Kerala & UAE. From Rs.75,000. WhatsApp to discuss." + link to /services | HIGH |
| 33 | Request 3 client reviews | Send GBP review link to 3 existing clients | HIGH |

---

## SECTION 4 — ROOT CAUSE #4: NO BLOG CONTENT

| # | Task | Action | Priority |
|---|------|--------|----------|
| 34 | Create src/pages/blog/ folder | For individual article .tsx files | HIGH |
| 35 | Article 1 page | WebsiteCostKerala.tsx — "How Much Does a Website Cost in Kerala in 2026?" | HIGH |
| 36 | Article 2 page | RestaurantPOSCaseStudy.tsx — UAE POS case study | HIGH |
| 37 | Article 3 page | POS software restaurants Kerala 2026 | HIGH |
| 38 | Article 4 page | VAT-Compliant Billing Software UAE | HIGH |
| 39 | Article 5 page | Web Development Company Thrissur — What to Look For | HIGH |
| 40 | Article 6 page | Medical Lab Software Kerala — Features and Pricing | HIGH |
| 41 | Article 7 page | WhatsApp Business Setup Kerala 2026 | HIGH |
| 42 | Article 8 page | AI Integration Small Business Kerala | HIGH |
| 43 | Article 9 page | How to Choose Mobile App Developer Kerala | HIGH |
| 44 | Article 10 page | NutriScan AI — Food Recognition App GPT-4 Vision | HIGH |
| 45 | Add blog routes in App.tsx | Route for each /blog/slug | HIGH |
| 46 | Update Blog.tsx | Change slug '#' to real /blog/article-url for each | HIGH |
| 47 | Add blog URLs to sitemap.xml | All 10 with changefreq monthly, priority 0.8 | HIGH |
| 48 | Write Article 1 content | 600–900 words, Surag + Anandu — publish first | CRITICAL |

---

## SECTION 5 — ROOT CAUSE #5: NEW DOMAIN SANDBOX (AWARENESS)

| # | Task | Action | Priority |
|---|------|--------|----------|
| 49 | Document timeline | Expect first rankings Month 2–3; solid Month 4–6 | INFO |
| 50 | Run outreach in parallel | Do not wait for SEO; WhatsApp, LinkedIn, referrals now | HIGH |

---

## SECTION 6 — TECHNICAL SEO (12 FIXES)

| # | Task | Action | Priority |
|---|------|--------|----------|
| 51 | SSG / meta in HTML | Ensure critical meta in index.html or via SSG (see Section 1) | CRITICAL |
| 52 | Canonical on every page | SEO.tsx: add `<link rel="canonical" href="https://hexastacksolutions.com/[page]">` | HIGH |
| 53 | Sitemap lastmod dates | Update all lastmod to 2026-03-09 in public/sitemap.xml | HIGH |
| 54 | Sitemap include blog/location | Add every new blog and location page URL to sitemap | HIGH |
| 55 | Open Graph image | 1200x630px: HexaStack logo + "Custom Software — Thrissur, Kerala"; set in index.html + SEO.tsx | MEDIUM |
| 56 | Alt text all images | Every img: descriptive alt e.g. "HexaBill POS software for UAE restaurant" | HIGH |
| 57 | H1 with target keyword | Services: one H1 with keyword; About, Pricing: strong H1 with keyword | HIGH |
| 58 | PageSpeed Insights | Run pagespeed.web.dev; fix mobile score if below 70 | HIGH |
| 59 | Structured data | Service schema on Services; Article on blog; Review on Work case studies | MEDIUM |
| 60 | Domain consolidation | Pick hexastacksolutions.com as primary; 301 redirect any other domain to it (netlify + GBP) | CRITICAL |
| 61 | Admin noindex | Admin.tsx: `<SEO noindex={true} />` so admin never indexed | MEDIUM |
| 62 | Internal linking | Blog → service pages; services → work/portfolio; cross-link content | HIGH |

---

## SECTION 7 — 30-DAY AGGRESSIVE PLAN (WEEK BY WEEK)

| # | Week | Task | Priority |
|---|------|------|----------|
| 63 | WEEK 1 | Install vite-ssg OR Prerender.io (Section 1) | CRITICAL |
| 64 | WEEK 1 | Submit hexastacksolutions.com to Google Search Console, verify ownership | CRITICAL |
| 65 | WEEK 1 | Submit sitemap.xml in Search Console | CRITICAL |
| 66 | WEEK 1 | Fix GBP verification (phone/video) | CRITICAL |
| 67 | WEEK 1 | All 5 directory listings: JustDial, Sulekha, Clutch, GoodFirms, IndiaMART | HIGH |
| 68 | WEEK 1 | Fix domain split: hexastacksolutions.com primary, redirect hexastacksolutions.com | CRITICAL |
| 69 | WEEK 2 | Publish Blog Article 1: Website cost Kerala | HIGH |
| 70 | WEEK 2 | Search Console URL Inspection: submit all core pages | HIGH |
| 71 | WEEK 2 | GBP posts: one per day for 7 days (after verification) | HIGH |
| 72 | WEEK 2 | Request Google reviews from 3 clients | HIGH |
| 73 | WEEK 2 | Complete all 12 technical SEO fixes (Section 6) | HIGH |
| 74 | WEEK 2 | Publish Blog Article 2: UAE Restaurant POS case study | HIGH |
| 75 | WEEK 3 | Build all 14 Thrissur service SEO pages (template) | HIGH |
| 76 | WEEK 3 | Submit all 14 Thrissur pages in Search Console | HIGH |
| 77 | WEEK 3 | LinkedIn: UAE POS case study + NutriScan AI demo | MEDIUM |
| 78 | WEEK 3 | Publish Blog Article 3: POS software Kerala restaurants | HIGH |
| 79 | WEEK 3 | 5 more backlinks: GitHub, Product Hunt, 2 guest posts, 1 testimonial | HIGH |
| 80 | WEEK 4 | Build all 14 UAE + 14 Ernakulam service SEO pages | HIGH |
| 81 | WEEK 4 | Publish Blog Article 4: VAT billing software UAE | HIGH |
| 82 | WEEK 4 | Gulf Malayali WhatsApp groups — share blog articles | MEDIUM |
| 83 | WEEK 4 | 5 LinkedIn DMs to UAE Malayali business owners | MEDIUM |
| 84 | WEEK 4 | Check Search Console: indexed pages, impressions; adjust | HIGH |

---

## SECTION 8 — DAILY SEO ACTIONS

| # | Who | Task | Frequency |
|---|-----|------|-----------|
| 85 | Anandu | Search Console: new impressions, clicks, indexed pages; fix coverage errors | Daily 30 min |
| 86 | Surag | GBP: new reviews, questions; respond within 2hrs; 1 GBP update per week | Daily 30 min |
| 87 | Surag | Write 1 blog OR build 1 SEO location page; publish; submit URL in GSC | Weekly 2 hrs |
| 88 | Anandu | Get 1 new backlink: directory, HARO, client mention, GitHub | Weekly 1 hr |
| 89 | Both | Monday: GSC report — pages with impressions but no clicks; improve title/description | Weekly 15 min |

---

## GOOGLE SEARCH CONSOLE & INDEXING

| # | Task | Action |
|---|------|--------|
| 90 | Add property | Add hexastacksolutions.com in GSC, verify (HTML tag or DNS) |
| 91 | Submit sitemap | Sitemaps → Add sitemap → https://hexastacksolutions.com/sitemap.xml |
| 92 | URL Inspection | After each new page/article: Test Live URL → Request indexing |
| 93 | Coverage report | Weekly: check indexed vs excluded, fix errors |

---

## CONTENT & COPY CHECKLIST

| # | Task | Action |
|---|------|--------|
| 94 | Pricing page | Add real pricing (from Rs.15,000; POS from Rs.75,000 etc.) |
| 95 | About H1 | One H1 with target keyword (e.g. "Web Development Company Thrissur") |
| 96 | Services H1 | One H1 with "Web Development Thrissur" or primary keyword |
| 97 | Contact schema | LocalBusiness or Organization schema on Contact |
| 98 | Work page schema | Review/ItemList for case studies |

---

## DOMAIN & INFRASTRUCTURE

| # | Task | Action |
|---|------|--------|
| 99 | Choose primary domain | hexastacksolutions.com (recommended) |
| 100 | Netlify redirect | Add 301 from hexastack.in (or other) → https://hexastacksolutions.com |
| 101 | GBP website | Set to https://hexastacksolutions.com in GBP and everywhere |
| 102 | Email signatures / links | Use hexastacksolutions.com in email signatures and links |

---

## SUMMARY — FIX ORDER (THIS WEEK)

1. **#1–#6** — SSG/prerendering (so Google sees content)  
2. **#23–#25** — GBP verification  
3. **#8–#12** — 5 directory backlinks  
4. **#60, #99–#102** — Domain: hexastacksolutions.com primary; redirect hexastack.in if used  
5. **#52, #53, #61** — Canonical, sitemap dates, Admin noindex  
6. **#48, #35** — First blog article + page  

Complete in this order. Mark each [ ] as [x] when done.  
**HexaStack Solutions | Vatanappally, Thrissur, Kerala | March 2026**
