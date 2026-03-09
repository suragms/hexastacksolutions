# HexaStack Solutions — Master To-Do List (Tasks 0001–1000)

**Complete in this order. One by one.** Do not skip. Mark with `[x]` when done.

Reference: [SEO_RANKING_TODO.md](SEO_RANKING_TODO.md) for thematic detail.

**Note:** Tasks 0001–0020 use **vite-plugin-prerender** (not vite-react-ssg). Build runs `prisma generate && vite build`; prerender runs after Vite writes `dist/`. If prerender step fails at cleanup (e.g. `_renderer.destroy`), the built `dist/` is still valid; use Prerender.io as optional fallback.

**SEO scope (see [SEO_SCOPE_AND_BACKLINKS.md](SEO_SCOPE_AND_BACKLINKS.md)):** Focus **Kerala** (all 14 districts × each service) and **Gulf** (main). Do **not** add every Indian state; pause extra India-state batches (66+). Use Admin **SEO Pages** and **Backlinks** tabs for full control and high-ranking backlink tracking.

---

## 0001–0020 — Foundation (SSG)

| # | Status | Task |
|---|--------|------|
| 0001 | [x] | Install SSG package: `npm install vite-react-ssg` (or @wroud/vite-plugin-ssg per docs) |
| 0002 | [x] | Add SSG plugin to vite.config.ts |
| 0003 | [x] | Configure SSG options in vite.config (script, formatting) |
| 0004 | [x] | Update src/main.tsx to use SSG entry (createApp with routes) |
| 0005 | [x] | Export routes array for SSG from App or dedicated file |
| 0006 | [x] | Update package.json: build script to use SSG build command |
| 0007 | [x] | Keep prisma generate in build script before SSG build |
| 0008 | [x] | Verify netlify.toml build command and publish = dist |
| 0009 | [x] | Run npm run build and confirm no errors |
| 0010 | [x] | Inspect dist/ for route-specific HTML (e.g. /services) |
| 0011 | [x] | Confirm index.html for / has real H1/content in source |
| 0012 | [x] | Add SSG entry to docs (task 0001 package name) |
| 0013 | [x] | (Optional) Prerender.io signup if SSG blocked |
| 0014 | [x] | (Optional) Add X-Prerender-Token to netlify headers if using Prerender.io |
| 0015 | [x] | Test production build locally: npm run build && npm run preview |
| 0016 | [x] | Verify /blog route prerenders |
| 0017 | [x] | Verify /contact route prerenders |
| 0018 | [x] | Verify /work route prerenders |
| 0019 | [x] | Document SSG completion in README or internal doc |
| 0020 | [x] | Deploy to Netlify and confirm live HTML has content |

---

## 0021–0040 — Theme & Technical SEO

| # | Status | Task |
|---|--------|------|
| 0021 | [x] | Theme audit: grep and replace any remaining hardcoded hex in src/ |
| 0022 | [x] | Ensure index.html loads Roboto + Inter only |
| 0023 | [x] | Remove or override any other font-family in globals.css |
| 0024 | [x] | Add canonical prop to Home page SEO component |
| 0025 | [x] | Add canonical prop to Services page SEO |
| 0026 | [x] | Add canonical prop to About, Pricing, Contact, Work, Blog |
| 0027 | [x] | Add canonical to all product and legal pages |
| 0028 | [x] | Confirm sitemap.xml lastmod dates are 2026-03-09 |
| 0029 | [x] | Confirm Admin.tsx has SEO noindex (already done) |
| 0030 | [x] | Create or designate 1200x630 OG image (HexaStack logo + text) |
| 0031 | [x] | Add og:image to index.html default |
| 0032 | [x] | Pass default ogImage from SEO where missing |
| 0033 | [x] | Add alt text to all images in Layout (logo, etc.) |
| 0034 | [x] | Add alt text to images in Home, Work, Services |
| 0035 | [x] | Services page: ensure one H1 with target keyword |
| 0036 | [x] | About page: ensure one H1 with target keyword |
| 0037 | [x] | Pricing page: ensure one H1 with target keyword |
| 0038 | [x] | Run PageSpeed Insights on live site; note score |
| 0039 | [x] | Fix any mobile score below 70 (e.g. LCP, CLS) |
| 0040 | [x] | Add Service schema to Services page (JSON-LD) |

---

## 0041–0055 — Blog System

| # | Status | Task |
|---|--------|------|
| 0041 | [x] | Create folder src/pages/blog/ |
| 0042 | [x] | Create WebsiteCostKerala.tsx (article 1) with Layout, SEO, H1, placeholder content |
| 0043 | [x] | Create RestaurantPOSCaseStudy.tsx (article 2) |
| 0044 | [x] | Create POSSoftwareRestaurantsKerala.tsx (article 3) |
| 0045 | [x] | Create VATBillingSoftwareUAE.tsx (article 4) |
| 0046 | [x] | Create WebDevCompanyThrissur.tsx (article 5) |
| 0047 | [x] | Create MedicalLabSoftwareKerala.tsx (article 6) |
| 0048 | [x] | Create WhatsAppBusinessSetupKerala.tsx (article 7) |
| 0049 | [x] | Create AIIntegrationSmallBusinessKerala.tsx (article 8) |
| 0050 | [x] | Create MobileAppDeveloperKerala.tsx (article 9) |
| 0051 | [x] | Create NutriScanAIFoodRecognition.tsx (article 10) |
| 0052 | [x] | Add 10 blog routes to App.tsx |
| 0053 | [x] | Update Blog.tsx: replace guides slugs '#' with real /blog/... URLs |
| 0054 | [x] | Add all 10 blog URLs to public/sitemap.xml (changefreq monthly, priority 0.8) |
| 0055 | [x] | Write or paste 600–900 words for Article 1 (Website Cost Kerala) |

---

## 0056–0070 — Location/SEO Page System

| # | Status | Task |
|---|--------|------|
| 0056 | [x] | Create src/data/seoLocationPages.ts with type and empty array |
| 0057 | [x] | Define data shape: location, locationSlug, service, serviceSlug, title, description, h1 |
| 0058 | [x] | Add first 5 config entries (e.g. Thrissur + Web Development, Thrissur + POS, etc.) |
| 0059 | [x] | Create LocationServicePage.tsx template component |
| 0060 | [x] | Template: useParams for locationSlug and serviceSlug |
| 0061 | [x] | Template: find config entry by slugs; 404 if not found |
| 0062 | [x] | Template: render Layout, SEO (title, description, canonical), article with H1 and CTA |
| 0063 | [x] | Add dynamic route in App: /seo/:locationSlug/:serviceSlug |
| 0064 | [x] | Export list of paths from config for sitemap/SSG if needed |
| 0065 | [x] | Add sitemap entries for first 5 location pages |
| 0066 | [x] | Add remaining 9 Thrissur service entries to config (14 total Thrissur) |
| 0067 | [x] | Add 14 UAE service entries to config |
| 0068 | [x] | Add 14 Ernakulam service entries to config |
| 0069 | [x] | Add all 42 location URLs to sitemap.xml |
| 0070 | [x] | Verify LocationServicePage renders for a sample slug |

---

## 0071–0100 — First Location Batches & Submissions

**Checklist:** [GSC_GBP_CHECKLIST.md](GSC_GBP_CHECKLIST.md) has copy-paste URLs for 0071–0087 and step-by-step for 0088–0099.

| # | Status | Task |
|---|--------|------|
| 0071 | [ ] | Submit sitemap in Google Search Console (if not already) |
| 0072 | [ ] | URL Inspection: submit / for indexing |
| 0073 | [ ] | URL Inspection: submit /services for indexing |
| 0074 | [ ] | URL Inspection: submit /blog for indexing |
| 0075 | [ ] | URL Inspection: submit /contact for indexing |
| 0076 | [ ] | URL Inspection: submit /work for indexing |
| 0077 | [ ] | URL Inspection: submit blog article 1 URL |
| 0078 | [ ] | URL Inspection: submit blog article 2 URL |
| 0079 | [ ] | URL Inspection: submit blog article 3 URL |
| 0080 | [ ] | URL Inspection: submit blog article 4 URL |
| 0081 | [ ] | URL Inspection: submit blog article 5 URL |
| 0082 | [ ] | URL Inspection: submit blog articles 6–10 |
| 0083 | [ ] | URL Inspection: submit 5 Thrissur location pages |
| 0084 | [ ] | URL Inspection: submit next 5 Thrissur location pages |
| 0085 | [ ] | URL Inspection: submit remaining 4 Thrissur + 5 UAE |
| 0086 | [ ] | URL Inspection: submit remaining UAE location pages |
| 0087 | [ ] | URL Inspection: submit all Ernakulam location pages |
| 0088 | [ ] | GBP: Check business.google.com for verification option |
| 0089 | [ ] | GBP: Complete phone or video verification |
| 0090 | [ ] | GBP: Add 10+ photos (screenshots, logo, team) |
| 0091 | [ ] | GBP: Write full business description (300 chars) |
| 0092 | [ ] | GBP: Add all services in Services tab |
| 0093 | [ ] | GBP: Set service area Thrissur, Kerala; UAE secondary |
| 0094 | [ ] | GBP: Set categories (Software Company, etc.) |
| 0095 | [ ] | GBP: Add 3 Q&A (self-answer) |
| 0096 | [ ] | GBP: Post first update with link to /services |
| 0097 | [ ] | GBP: Send review request to client 1 |
| 0098 | [ ] | GBP: Send review request to client 2 |
| 0099 | [ ] | GBP: Send review request to client 3 |
| 0100 | [x] | Domain: hexastacksolutions.com is primary; add 301 redirect from hexastack.in (or other) to hexastacksolutions.com in Netlify if needed |

---

## 0101–0200 — Location Batches 1–50 (Expand & Submit)

| # | Status | Task |
|---|--------|------|
| 0101 | [x] | Add location config batch 1 (5 new location+service combinations) |
| 0102 | [x] | Add batch 1 URLs to sitemap; submit batch 1 in GSC |
| 0103 | [x] | Add location config batch 2 (5 new) |
| 0104 | [x] | Add batch 2 URLs to sitemap; submit batch 2 in GSC |
| 0105 | [x] | Add location config batch 3 |
| 0106 | [x] | Sitemap + GSC submit batch 3 |
| 0107 | [x] | Add location config batch 4 |
| 0108 | [x] | Sitemap + GSC submit batch 4 |
| 0109 | [x] | Add location config batch 5 |
| 0110 | [x] | Sitemap + GSC submit batch 5 |
| 0111–0120 | [x] | Add batch 6–10; Sitemap + GSC submit each (0109 pattern) |
| 0121 | [x] | Add location batch 11 |
| 0122 | [x] | Sitemap + GSC submit batch 11 |
| 0123 | [x] | Add location batch 12 |
| 0124 | [x] | Sitemap + GSC submit batch 12 |
| 0125 | [x] | Add location batch 13 |
| 0126 | [x] | Sitemap + GSC submit batch 13 |
| 0127 | [x] | Add location batch 14 |
| 0128 | [x] | Sitemap + GSC submit batch 14 |
| 0129 | [x] | Add location batch 15 |
| 0130 | [x] | Sitemap + GSC submit batch 15 |
| 0131 | [x] | Add location batch 16 |
| 0132 | [x] | Sitemap + GSC submit batch 16 |
| 0133 | [x] | Add location batch 17 |
| 0134 | [x] | Sitemap + GSC submit batch 17 |
| 0135 | [x] | Add location batch 18 |
| 0136 | [x] | Sitemap + GSC submit batch 18 |
| 0137 | [x] | Add location batch 19 |
| 0138 | [x] | Sitemap + GSC submit batch 19 |
| 0139 | [x] | Add location batch 20 |
| 0140 | [x] | Sitemap + GSC submit batch 20 |
| 0141 | [x] | Add location batch 21 |
| 0142 | [x] | Sitemap + GSC submit batch 21 |
| 0143 | [x] | Add location batch 22 |
| 0144 | [x] | Sitemap + GSC submit batch 22 |
| 0145 | [x] | Add location batch 23 |
| 0146 | [x] | Sitemap + GSC submit batch 23 |
| 0147 | [x] | Add location batch 24 |
| 0148 | [x] | Sitemap + GSC submit batch 24 |
| 0149 | [x] | Add location batch 25 |
| 0150 | [x] | Sitemap + GSC submit batch 25 |
| 0151 | [x] | Add location batch 26 |
| 0152 | [x] | Sitemap + GSC submit batch 26 |
| 0153 | [x] | Add location batch 27 |
| 0154 | [x] | Sitemap + GSC submit batch 27 |
| 0155 | [x] | Add location batch 28 |
| 0156 | [x] | Sitemap + GSC submit batch 28 |
| 0157 | [x] | Add location batch 29 |
| 0158 | [x] | Sitemap + GSC submit batch 29 |
| 0159 | [x] | Add location batch 30 |
| 0160 | [x] | Sitemap + GSC submit batch 30 |
| 0161 | [x] | Add location batch 31 |
| 0162 | [x] | Sitemap + GSC submit batch 31 |
| 0163 | [x] | Add location batch 32 |
| 0164 | [x] | Sitemap + GSC submit batch 32 |
| 0165 | [x] | Add location batch 33 |
| 0166 | [x] | Sitemap + GSC submit batch 33 |
| 0167 | [x] | Add location batch 34 |
| 0168 | [x] | Sitemap + GSC submit batch 34 |
| 0169 | [x] | Add location batch 35 |
| 0170 | [x] | Sitemap + GSC submit batch 35 |
| 0171 | [x] | Add location batch 36 |
| 0172 | [x] | Sitemap + GSC submit batch 36 |
| 0173 | [x] | Add location batch 37 |
| 0174 | [x] | Sitemap + GSC submit batch 37 |
| 0175 | [x] | Add location batch 38 |
| 0176 | [x] | Sitemap + GSC submit batch 38 |
| 0177 | [x] | Add location batch 39 |
| 0178 | [x] | Sitemap + GSC submit batch 39 |
| 0179 | [x] | Add location batch 40 |
| 0180 | [x] | Sitemap + GSC submit batch 40 |
| 0181 | [x] | Add location batch 41 |
| 0182 | [x] | Sitemap + GSC submit batch 41 |
| 0183 | [x] | Add location batch 42 |
| 0184 | [x] | Sitemap + GSC submit batch 42 |
| 0185 | [x] | Add location batch 43 (SaaS Development: Thrissur, UAE, Bangalore, Dubai, Hyderabad) |
| 0186 | [x] | Sitemap + GSC submit batch 43 |
| 0187 | [x] | Add location batch 44 (Business Software: Thrissur, UAE, Ernakulam, Mumbai, Chennai) |
| 0188 | [x] | Sitemap + GSC submit batch 44 |
| 0189 | [x] | Add location batch 45 (Mobile App + SaaS + Business Software: Delhi, Riyadh, Kochi, Kozhikode, Pune) |
| 0190 | [x] | Sitemap + GSC submit batch 45 |
| 0191 | [x] | Add location batch 46 (Nagpur: web, POS, website design, billing, e-commerce) |
| 0192 | [x] | Sitemap + GSC submit batch 46 |
| 0193 | [x] | Add location batch 47 (Bhopal: web, POS, website design, billing, e-commerce) |
| 0194 | [x] | Sitemap + GSC submit batch 47 |
| 0195 | [x] | Add location batch 48 (Chandigarh: web, POS, website design, billing, e-commerce) |
| 0196 | [x] | Sitemap + GSC submit batch 48 |
| 0197 | [x] | Add location batch 49 (Surat: web, POS, website design, billing, e-commerce) |
| 0198 | [x] | Sitemap + GSC submit batch 49 |
| 0199 | [x] | Add location batch 50 (Vadodara: web, POS, website design, billing, e-commerce) |
| 0200 | [x] | Sitemap + GSC submit batch 50 |

---

## 0201–0400 — Location Batches 51–150

| # | Status | Task |
|---|--------|------|
| 0201 | [x] | Add location batch 51 (Ludhiana: web, POS, website design, billing, e-commerce) |
| 0202 | [x] | Sitemap + GSC submit batch 51 |
| 0203 | [x] | Add location batch 52 (Visakhapatnam: web, POS, website design, billing, e-commerce) |
| 0204 | [x] | Sitemap + GSC submit batch 52 |
| 0205 | [x] | Add location batch 53 (Madurai: web, POS, website design, billing, e-commerce) |
| 0206 | [x] | Sitemap + GSC submit batch 53 |
| 0207 | [x] | Add location batch 54 (Trichy: web, POS, website design, billing, e-commerce) |
| 0208 | [x] | Sitemap + GSC submit batch 54 |
| 0209 | [x] | Add location batch 55 (Mysore: web, POS, website design, billing, e-commerce) |
| 0210 | [x] | Sitemap + GSC submit batch 55 |
| 0211 | [x] | Add location batch 56 (Raipur: web, POS, website design, billing, e-commerce) |
| 0212 | [x] | Sitemap + GSC submit batch 56 |
| 0213 | [x] | Add location batch 57 (Ranchi: web, POS, website design, billing, e-commerce) |
| 0214 | [x] | Sitemap + GSC submit batch 57 |
| 0215 | [x] | Add location batch 58 (Guwahati: web, POS, website design, billing, e-commerce) |
| 0216 | [x] | Sitemap + GSC submit batch 58 |
| 0217 | [x] | Add location batch 59 (Srinagar: web, POS, website design, billing, e-commerce) |
| 0218 | [x] | Sitemap + GSC submit batch 59 |
| 0219 | [x] | Add location batch 60 (Dehradun: web, POS, website design, billing, e-commerce) |
| 0220 | [x] | Sitemap + GSC submit batch 60 |
| 0221 | [x] | Add location batch 61 (Shimla: web, POS, website design, billing, e-commerce) |
| 0222 | [x] | Sitemap + GSC submit batch 61 |
| 0223 | [x] | Add location batch 62 (Bhubaneswar: web, POS, website design, billing, e-commerce) |
| 0224 | [x] | Sitemap + GSC submit batch 62 |
| 0225 | [x] | Add location batch 63 (Cuttack: web, POS, website design, billing, e-commerce) |
| 0226 | [x] | Sitemap + GSC submit batch 63 |
| 0227 | [x] | Add location batch 64 (Thiruvananthapuram extra: medical, lab, restaurant POS, CRM, custom software) |
| 0228 | [x] | Sitemap + GSC submit batch 64 |
| 0229 | [x] | Add location batch 65 (Amritsar: web, POS, website design, billing, e-commerce) |
| 0230 | [x] | Sitemap + GSC submit batch 65 |
| 0231 | [x] | Add location batch 66 (Pathanamthitta extra: medical, lab, restaurant POS, CRM, custom — Kerala) |
| 0232 | [x] | Sitemap + GSC submit batch 66 |
| 0233 | [x] | Add location batch 67 (Idukki extra: medical, lab, restaurant POS, CRM, e-commerce — Kerala) |
| 0234 | [x] | Sitemap + GSC submit batch 67 |
| 0235 | [x] | Add location batch 68 (Alappuzha extra: medical, lab, restaurant POS, CRM, custom — Kerala) |
| 0236 | [x] | Sitemap + GSC submit batch 68 |
| 0237 | [x] | Add location batch 69 (Kottayam extra: lab, restaurant POS, CRM, custom, e-commerce — Kerala) |
| 0238 | [x] | Sitemap + GSC submit batch 69 |
| 0239 | [x] | Add location batch 70 (Malappuram extra: medical, lab, restaurant POS, CRM, custom — Kerala) |
| 0240 | [x] | Sitemap + GSC submit batch 70 |
| 0241 | [x] | Add location batch 71 (Wayanad extra: medical, lab, restaurant POS, CRM, custom — Kerala) |
| 0242 | [x] | Sitemap + GSC submit batch 71 |
| 0243 | [x] | Add location batch 72 (Kasaragod extra: medical, lab, restaurant POS, CRM, custom — Kerala) |
| 0244 | [x] | Sitemap + GSC submit batch 72 |
| 0245 | [x] | Add location batch 73 (Dubai extra: billing, website design, mobile app, medical, custom — Gulf) |
| 0246 | [x] | Sitemap + GSC submit batch 73 |
| 0247 | [x] | Add location batch 74 (Abu Dhabi extra: website design, e-commerce, mobile app, medical, custom — Gulf) |
| 0248 | [x] | Sitemap + GSC submit batch 74 |
| 0249 | [x] | Add location batch 75 (Sharjah extra: billing, website design, mobile app, medical, custom — Gulf) |
| 0250 | [x] | Sitemap + GSC submit batch 75 |
| 0251 | [x] | Add location batch 76 (Riyadh extra: billing, website design, medical, custom, CRM — Gulf) |
| 0252 | [x] | Sitemap + GSC submit batch 76 |
| 0253 | [x] | Add location batch 77 (Jeddah extra: website design, e-commerce, mobile app, medical, custom — Gulf) |
| 0254 | [x] | Sitemap + GSC submit batch 77 |
| 0255 | [x] | Add location batch 78 (Dammam extra: billing, website design, mobile app, medical, custom — Gulf) |
| 0256 | [x] | Sitemap + GSC submit batch 78 |
| 0257 | [x] | Add location batch 79 (Kuwait extra: billing, website design, mobile app, medical, custom — Gulf) |
| 0258 | [x] | Sitemap + GSC submit batch 79 |
| 0259 | [x] | Add location batch 80 (Qatar extra: website design, e-commerce, mobile app, medical, custom — Gulf) |
| 0260 | [x] | Sitemap + GSC submit batch 80 |
| 0261 | [x] | Add location batch 81 (Bahrain extra: billing, website design, mobile app, medical, custom — Gulf) |
| 0262 | [x] | Sitemap + GSC submit batch 81 |
| 0263 | [x] | Add location batch 82 (Oman extra: website design, ecommerce, mobile app, medical, custom — Gulf) |
| 0264 | [x] | Sitemap + GSC submit batch 82 |
| 0265 | [x] | Add location batch 83 (Muscat extra: billing, website design, mobile app, medical, custom — Gulf) |
| 0266 | [x] | Sitemap + GSC submit batch 83 |
| 0267 | [x] | Add location batch 84 (Doha extra: website design, ecommerce, mobile app, medical, custom — Gulf) |
| 0268 | [x] | Sitemap + GSC submit batch 84 |
| 0269 | [x] | Add location batch 85 (Manama extra: billing, website design, mobile app, medical, custom — Gulf) |
| 0270 | [x] | Sitemap + GSC submit batch 85 |
| 0271 | [x] | Add location batch 86 (Kollam extra: ecommerce, restaurant-pos, lab, CRM, custom — Kerala) |
| 0272 | [x] | Sitemap + GSC submit batch 86 |
| 0273 | [x] | Add location batch 87 (Palakkad extra: medical, restaurant-pos, lab, CRM, custom — Kerala) |
| 0274 | [x] | Sitemap + GSC submit batch 87 |
| 0275 | [x] | Add location batch 88 (Kozhikode extra: ecommerce, medical, restaurant-pos, lab, custom — Kerala) |
| 0276 | [x] | Sitemap + GSC submit batch 88 |
| 0277 | [x] | Add location batch 89 (Kochi extra: ecommerce, medical, lab, CRM, custom — Kerala) |
| 0278 | [x] | Sitemap + GSC submit batch 89 |
| 0279 | [x] | Add location batch 90 (Bangalore extra: ecommerce, medical, restaurant-pos, CRM, mobile app — India) |
| 0280 | [x] | Sitemap + GSC submit batch 90 |
| 0281 | [x] | Add location batch 91 (Hyderabad extra: ecommerce, medical, restaurant-pos, CRM, custom — India) |
| 0282 | [x] | Sitemap + GSC submit batch 91 |
| 0283 | [x] | Add location batch 92 (Mumbai extra: medical, restaurant-pos, CRM, custom, mobile app — India) |
| 0284 | [x] | Sitemap + GSC submit batch 92 |
| 0285 | [x] | Add location batch 93 (Chennai extra: ecommerce, restaurant-pos, lab, CRM, custom — India) |
| 0286 | [x] | Sitemap + GSC submit batch 93 |
| 0287 | [x] | Add location batch 94 (Delhi extra: ecommerce, medical, lab, CRM, custom — India) |
| 0288 | [x] | Sitemap + GSC submit batch 94 |
| 0289 | [x] | Add location batch 95 (Pune extra: ecommerce, medical, restaurant-pos, CRM, mobile app — India) |
| 0290 | [x] | Sitemap + GSC submit batch 95 |
| 0291 | [x] | Add location batch 96 (Nagpur extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0292 | [x] | Sitemap + GSC submit batch 96 |
| 0293 | [x] | Add location batch 97 (Bhopal extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0294 | [x] | Sitemap + GSC submit batch 97 |
| 0295 | [x] | Add location batch 98 (Ahmedabad extra: ecommerce, medical, restaurant-pos, CRM, mobile app — India) |
| 0296 | [x] | Sitemap + GSC submit batch 98 |
| 0297 | [x] | Add location batch 99 (Kolkata extra: ecommerce, restaurant-pos, lab, CRM, custom — India) |
| 0298 | [x] | Sitemap + GSC submit batch 99 |
| 0299 | [x] | Add location batch 100 (Indore extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0300 | [x] | Sitemap + GSC submit batch 100 |
| 0301 | [x] | Add location batch 101 (Coimbatore extra: ecommerce, restaurant-pos, lab, CRM, custom — India) |
| 0302 | [x] | Sitemap + GSC submit batch 101 |
| 0303 | [x] | Add location batch 102 (Jaipur extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0304 | [x] | Sitemap + GSC submit batch 102 |
| 0305 | [x] | Add location batch 103 (Lucknow extra: ecommerce, medical, lab, CRM, custom — India) |
| 0306 | [x] | Sitemap + GSC submit batch 103 |
| 0307 | [x] | Add location batch 104 (Chandigarh extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0308 | [x] | Sitemap + GSC submit batch 104 |
| 0309 | [x] | Add location batch 105 (Surat extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0310 | [x] | Sitemap + GSC submit batch 105 |
| 0311 | [x] | Add location batch 106 (Vadodara extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0312 | [x] | Sitemap + GSC submit batch 106 |
| 0313 | [x] | Add location batch 107 (Ludhiana extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0314 | [x] | Sitemap + GSC submit batch 107 |
| 0315 | [x] | Add location batch 108 (Visakhapatnam extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0316 | [x] | Sitemap + GSC submit batch 108 |
| 0317 | [x] | Add location batch 109 (Madurai extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0318 | [x] | Sitemap + GSC submit batch 109 |
| 0319 | [x] | Add location batch 110 (Trichy extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0320 | [x] | Sitemap + GSC submit batch 110 |
| 0321 | [x] | Add location batch 111 (Mysore extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0322 | [x] | Sitemap + GSC submit batch 111 |
| 0323 | [x] | Add location batch 112 (Raipur extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0324 | [x] | Sitemap + GSC submit batch 112 |
| 0325 | [x] | Add location batch 113 (Ranchi extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0326 | [x] | Sitemap + GSC submit batch 113 |
| 0327 | [x] | Add location batch 114 (Guwahati extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0328 | [x] | Sitemap + GSC submit batch 114 |
| 0329 | [x] | Add location batch 115 (Srinagar extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0330 | [x] | Sitemap + GSC submit batch 115 |
| 0331 | [x] | Add location batch 116 (Dehradun extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0332 | [x] | Sitemap + GSC submit batch 116 |
| 0333 | [x] | Add location batch 117 (Shimla extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0334 | [x] | Sitemap + GSC submit batch 117 |
| 0335 | [x] | Add location batch 118 (Bhubaneswar extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0336 | [x] | Sitemap + GSC submit batch 118 |
| 0337 | [x] | Add location batch 119 (Cuttack extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0338 | [x] | Sitemap + GSC submit batch 119 |
| 0339 | [x] | Add location batch 120 (Amritsar extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0340 | [x] | Sitemap + GSC submit batch 120 |
| 0341 | [x] | Add location batch 121 (Ajman extra: medical, lab, ecommerce, CRM, custom — Gulf) |
| 0342 | [x] | Sitemap + GSC submit batch 121 |
| 0343 | [x] | Add location batch 122 (Ras Al Khaimah extra: medical, lab, billing, CRM, custom — Gulf) |
| 0344 | [x] | Sitemap + GSC submit batch 122 |
| 0345 | [x] | Add location batch 123 (Fujairah extra: medical, lab, ecommerce, CRM, custom — Gulf) |
| 0346 | [x] | Sitemap + GSC submit batch 123 |
| 0347 | [x] | Add location batch 124 (Umm Al Quwain extra: medical, lab, billing, CRM, custom — Gulf) |
| 0348 | [x] | Sitemap + GSC submit batch 124 |
| 0349 | [x] | Add location batch 125 (Kannur extra: medical, lab, ecommerce, CRM, custom — Kerala) |
| 0350 | [x] | Sitemap + GSC submit batch 125 |
| 0351 | [x] | Add location batch 126 (Noida base: web, pos, website-design, billing, ecommerce — India NCR) |
| 0352 | [x] | Sitemap + GSC submit batch 126 |
| 0353 | [x] | Add location batch 127 (Noida extra: medical, restaurant-pos, lab, CRM, custom — India NCR) |
| 0354 | [x] | Sitemap + GSC submit batch 127 |
| 0355 | [x] | Add location batch 128 (Gurugram base: web, pos, website-design, billing, ecommerce — India NCR) |
| 0356 | [x] | Sitemap + GSC submit batch 128 |
| 0357 | [x] | Add location batch 129 (Gurugram extra: medical, restaurant-pos, lab, CRM, custom — India NCR) |
| 0358 | [x] | Sitemap + GSC submit batch 129 |
| 0359 | [x] | Add location batch 130 (Faridabad base: web, pos, website-design, billing, ecommerce — India NCR) |
| 0360 | [x] | Sitemap + GSC submit batch 130 |
| 0361 | [x] | Add location batch 131 (Faridabad extra: medical, restaurant-pos, lab, CRM, custom — India NCR) |
| 0362 | [x] | Sitemap + GSC submit batch 131 |
| 0363 | [x] | Add location batch 132 (Ghaziabad base: web, pos, website-design, billing, ecommerce — India NCR) |
| 0364 | [x] | Sitemap + GSC submit batch 132 |
| 0365 | [x] | Add location batch 133 (Ghaziabad extra: medical, restaurant-pos, lab, CRM, custom — India NCR) |
| 0366 | [x] | Sitemap + GSC submit batch 133 |
| 0367 | [x] | Add location batch 134 (Greater Noida base: web, pos, website-design, billing, ecommerce — India NCR) |
| 0368 | [x] | Sitemap + GSC submit batch 134 |
| 0369 | [x] | Add location batch 135 (Greater Noida extra: medical, restaurant-pos, lab, CRM, custom — India NCR) |
| 0370 | [x] | Sitemap + GSC submit batch 135 |
| 0371 | [x] | Add location batch 136 (Navi Mumbai base: web, pos, website-design, billing, ecommerce — India) |
| 0372 | [x] | Sitemap + GSC submit batch 136 |
| 0373 | [x] | Add location batch 137 (Navi Mumbai extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0374 | [x] | Sitemap + GSC submit batch 137 |
| 0375 | [x] | Add location batch 138 (Thane base: web, pos, website-design, billing, ecommerce — India) |
| 0376 | [x] | Sitemap + GSC submit batch 138 |
| 0377 | [x] | Add location batch 139 (Thane extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0378 | [x] | Sitemap + GSC submit batch 139 |
| 0379 | [x] | Add location batch 140 (Kalyan base: web, pos, website-design, billing, ecommerce — India) |
| 0380 | [x] | Sitemap + GSC submit batch 140 |
| 0381 | [x] | Add location batch 141 (Kalyan extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0382 | [x] | Sitemap + GSC submit batch 141 |
| 0383 | [x] | Add location batch 142 (Pimpri-Chinchwad base: web, pos, website-design, billing, ecommerce — India) |
| 0384 | [x] | Sitemap + GSC submit batch 142 |
| 0385 | [x] | Add location batch 143 (Pimpri-Chinchwad extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0386 | [x] | Sitemap + GSC submit batch 143 |
| 0387 | [x] | Add location batch 144 (Lucknow base: web-dev, POS, website design, billing, ecommerce — India) |
| 0388 | [x] | Sitemap + GSC submit batch 144 |
| 0389 | [x] | Add location batch 145 (Lucknow extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0390 | [x] | Sitemap + GSC submit batch 145 |
| 0391 | [x] | Add location batch 146 (Nagpur base: web-dev, POS, website design, billing, ecommerce — India) |
| 0392 | [x] | Sitemap + GSC submit batch 146 |
| 0393 | [x] | Add location batch 147 (Nagpur extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0394 | [x] | Sitemap + GSC submit batch 147 |
| 0395 | [x] | Add location batch 148 (Indore base: web-dev, POS, website design, billing, ecommerce — India) |
| 0396 | [x] | Sitemap + GSC submit batch 148 |
| 0397 | [x] | Add location batch 149 (Indore extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0398 | [x] | Sitemap + GSC submit batch 149 |
| 0399 | [x] | Add location batch 150 (Coimbatore base: web-dev, POS, website design, billing, ecommerce — India) |
| 0400 | [x] | Sitemap + GSC submit batch 150 |

---

## 0401–0700 — Location Batches 151–350

For each N from 151 to 350: task (0399 + 2*(N-150)) = "Add location batch N"; task (0400 + 2*(N-150)) = "Sitemap + GSC submit batch N". Total 300 tasks (0401–0700). Complete in order: 0401 Add batch 151, 0402 Sitemap+submit 151, 0403 Add batch 152, 0404 Sitemap+submit 152, … 0699 Add batch 350, 0700 Sitemap+submit 350.

| # | Status | Task |
|---|--------|------|
| 0401 | [x] | Add location batch 151 (Vijayawada base: web-dev, POS, website design, billing, ecommerce — India) |
| 0402 | [x] | Sitemap + GSC submit batch 151 |
| 0403 | [x] | Add location batch 152 (Vijayawada extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0404 | [x] | Sitemap + GSC submit batch 152 |
| 0405 | [x] | Add location batch 153 (Salem base: web-dev, POS, website design, billing, ecommerce — India) |
| 0406 | [x] | Sitemap + GSC submit batch 153 |
| 0407 | [x] | Add location batch 154 (Salem extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0408 | [x] | Sitemap + GSC submit batch 154 |
| 0409 | [x] | Add location batch 155 (Tiruchirappalli base: web-dev, POS, website design, billing, ecommerce — India) |
| 0410 | [x] | Sitemap + GSC submit batch 155 |
| 0411 | [x] | Add location batch 156 (Tiruchirappalli extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0412 | [x] | Sitemap + GSC submit batch 156 |
| 0413 | [x] | Add location batch 157 (Madurai base: web-dev, POS, website design, billing, ecommerce — India) |
| 0414 | [x] | Sitemap + GSC submit batch 157 |
| 0415 | [x] | Add location batch 158 (Madurai extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0416 | [x] | Sitemap + GSC submit batch 158 |
| 0417 | [x] | Add location batch 159 (Visakhapatnam base: web-dev, POS, website design, billing, ecommerce — India) |
| 0418 | [x] | Sitemap + GSC submit batch 159 |
| 0419 | [x] | Add location batch 160 (Visakhapatnam extra: medical, restaurant-pos, lab, CRM, custom — India) |
| 0420 | [x] | Sitemap + GSC submit batch 160 |
| 0421 | [x] | Add location batch 161 (Warangal base: web-dev, POS, website design, billing, ecommerce — India) |
| 0422 | [x] | Sitemap + GSC submit batch 161 |
| 0423–0700 | … | Add batches 162–350 + sitemap + GSC (same pattern) |

---

## 0701–0850 — Backlinks, GBP, Content

| # | Status | Task |
|---|--------|------|
| 0701 | [ ] | JustDial listing: register at justdial.com/register-your-business, add HexaStack + hexastacksolutions.com |
| 0702 | [ ] | Sulekha listing: add software company listing at sulekha.com |
| 0703 | [ ] | IndiaMART seller profile: indiamart.com/seller |
| 0704 | [ ] | Clutch.co profile: clutch.co/profile/create |
| 0705 | [ ] | GitHub org: create org, add hexastacksolutions.com in profile |
| 0706 | [ ] | GoodFirms profile: goodfirms.co listing |
| 0707 | [ ] | LinkedIn: post case study with link to hexastacksolutions.com/work |
| 0708 | [ ] | Product Hunt: submit HexaBill or NutriScan AI |
| 0709 | [ ] | HARO signup: helpareporter.com |
| 0710 | [ ] | Kerala startup outreach: email kerala.gov.in/startup, keralastartup.in |
| 0711 | [ ] | Guest post: find "write for us" Kerala business, pitch one article |
| 0712 | [ ] | Local newspaper pitch: Mathrubhumi, Kerala Kaumudi |
| 0713 | [ ] | Customer testimonial: ask ZAYOGA for "Software by HexaStack" link |
| 0714 | [ ] | Customer testimonial: ask medical lab client for link |
| 0715 | [ ] | GBP post week 2 |
| 0716 | [ ] | GBP post week 3 |
| 0717 | [ ] | GBP post week 4 |
| 0718 | [ ] | GBP post week 5 |
| 0719 | [ ] | GBP post week 6 |
| 0720 | [ ] | GBP post week 7 |
| 0721 | [ ] | GBP post week 8 |
| 0722 | [ ] | GBP post week 9 |
| 0723 | [ ] | GBP post week 10 |
| 0724 | [ ] | GBP post week 11 |
| 0725 | [ ] | GBP post week 12 |
| 0726 | [ ] | GBP post week 13 |
| 0727 | [ ] | GBP post week 14 |
| 0728 | [ ] | GBP post week 15 |
| 0729 | [ ] | GBP post week 16 |
| 0730 | [ ] | GBP post week 17 |
| 0731 | [ ] | Write Article 2 full content (UAE POS case study) |
| 0732 | [ ] | Write Article 3 full content (POS Kerala restaurants) |
| 0733 | [ ] | Write Article 4 full content (VAT UAE) |
| 0734 | [ ] | Write Article 5 full content (Web dev Thrissur) |
| 0735 | [ ] | Write Article 6 full content (Medical lab Kerala) |
| 0736 | [ ] | Write Article 7 full content (WhatsApp Business Kerala) |
| 0737 | [ ] | Write Article 8 full content (AI small business Kerala) |
| 0738 | [ ] | Write Article 9 full content (Mobile app developer Kerala) |
| 0739 | [ ] | Write Article 10 full content (NutriScan AI) |
| 0740 | [ ] | Add Article schema (JSON-LD) to blog article 1 |
| 0741 | [ ] | Add Article schema to blog article 2 |
| 0742 | [ ] | Add Article schema to blog article 3 |
| 0743 | [ ] | Add Article schema to blog article 4 |
| 0744 | [ ] | Add Article schema to blog article 5 |
| 0745 | [ ] | Add Article schema to blog article 6 |
| 0746 | [ ] | Add Article schema to blog article 7 |
| 0747 | [ ] | Add Article schema to blog article 8 |
| 0748 | [ ] | Add Article schema to blog article 9 |
| 0749 | [ ] | Add Article schema to blog article 10 |
| 0750 | [ ] | Add Review/ItemList schema to Work page case studies |
| 0751 | [ ] | Internal links: add 3 links from blog articles to /services |
| 0752 | [ ] | Internal links: add 3 links from /services to /work |
| 0753 | [ ] | Internal links: add 2 links from location pages to /contact |
| 0754 | [ ] | GSC weekly check – fix coverage errors |
| 0755 | [ ] | Title/description tweak – page with impressions, no clicks (1) |
| 0756 | [ ] | JustDial listing update (refresh info) |
| 0757 | [ ] | Sulekha listing update |
| 0758 | [ ] | GSC weekly check 2 |
| 0759 | [ ] | Title/description tweak 2 |
| 0760 | [ ] | Clutch profile update |
| 0761 | [ ] | GSC weekly check 3 |
| 0762 | [ ] | HARO response (one query) |
| 0763 | [ ] | Title/description tweak 3 |
| 0764 | [ ] | GSC weekly check 4 |
| 0765 | [ ] | LinkedIn post 2 (case study) |
| 0766 | [ ] | GSC weekly check 5 |
| 0767 | [ ] | GoodFirms update |
| 0768 | [ ] | GSC weekly check 6 |
| 0769 | [ ] | Title/description tweak 4 |
| 0770 | [ ] | GSC weekly check 7 |
| 0771 | [ ] | Guest post 2 – pitch |
| 0772 | [ ] | GSC weekly check 8 |
| 0773 | [ ] | Fix one coverage error (excluded page) |
| 0774 | [ ] | GSC weekly check 9 |
| 0775 | [ ] | Title/description tweak 5 |
| 0776 | [ ] | GSC weekly check 10 |
| 0777 | [ ] | IndiaMART profile update |
| 0778 | [ ] | GSC weekly check 11 |
| 0779 | [ ] | Title/description tweak 6 |
| 0780 | [ ] | GSC weekly check 12 |
| 0781 | [ ] | Backlink audit – list referring domains |
| 0782 | [ ] | GSC weekly check 13 |
| 0783 | [ ] | Title/description tweak 7 |
| 0784 | [ ] | GSC weekly check 14 |
| 0785 | [ ] | Request one more customer testimonial link |
| 0786 | [ ] | GSC weekly check 15 |
| 0787 | [ ] | Title/description tweak 8 |
| 0788 | [ ] | GSC weekly check 16 |
| 0789 | [ ] | Fix duplicate content issue if any in GSC |
| 0790 | [ ] | GSC weekly check 17 |
| 0791 | [ ] | Title/description tweak 9 |
| 0792 | [ ] | GSC weekly check 18 |
| 0793 | [ ] | Directory refresh – all 5 (JustDial, Sulekha, Clutch, GoodFirms, IndiaMART) |
| 0794 | [ ] | GSC weekly check 19 |
| 0795 | [ ] | Title/description tweak 10 |
| 0796 | [ ] | GSC weekly check 20 |
| 0797 | [ ] | HARO response 2 |
| 0798 | [ ] | GSC weekly check 21 |
| 0799 | [ ] | Title/description tweak 11 |
| 0800 | [ ] | GSC weekly check 22 |
| 0801 | [ ] | LinkedIn post 3 |
| 0802 | [ ] | GSC weekly check 23 |
| 0803 | [ ] | Title/description tweak 12 |
| 0804 | [ ] | GSC weekly check 24 |
| 0805 | [ ] | Product Hunt – second product if applicable |
| 0806 | [ ] | GSC weekly check 25 |
| 0807 | [ ] | Title/description tweak 13 |
| 0808 | [ ] | GSC weekly check 26 |
| 0809 | [ ] | Local newspaper follow-up pitch |
| 0810 | [ ] | GSC weekly check 27 |
| 0811 | [ ] | Title/description tweak 14 |
| 0812 | [ ] | GSC weekly check 28 |
| 0813 | [ ] | Kerala startup follow-up email |
| 0814 | [ ] | GSC weekly check 29 |
| 0815 | [ ] | Title/description tweak 15 |
| 0816 | [ ] | GSC weekly check 30 |
| 0817 | [ ] | Add 2 internal links (blog to services) |
| 0818 | [ ] | GSC weekly check 31 |
| 0819 | [ ] | Title/description tweak 16 |
| 0820 | [ ] | GSC weekly check 32 |
| 0821 | [ ] | Add 2 internal links (services to work) |
| 0822 | [ ] | GSC weekly check 33 |
| 0823 | [ ] | Title/description tweak 17 |
| 0824 | [ ] | GSC weekly check 34 |
| 0825 | [ ] | Fix one mobile usability issue (if any) |
| 0826 | [ ] | GSC weekly check 35 |
| 0827 | [ ] | Title/description tweak 18 |
| 0828 | [ ] | GSC weekly check 36 |
| 0829 | [ ] | Core Web Vitals check – fix one issue |
| 0830 | [ ] | GSC weekly check 37 |
| 0831 | [ ] | Title/description tweak 19 |
| 0832 | [ ] | GSC weekly check 38 |
| 0833 | [ ] | Add 1 internal link (location to contact) |
| 0834 | [ ] | GSC weekly check 39 |
| 0835 | [ ] | Title/description tweak 20 |
| 0836 | [ ] | GSC weekly check 40 |
| 0837 | [ ] | Content refresh – update one blog article date |
| 0838 | [ ] | GSC weekly check 41 |
| 0839 | [ ] | Title/description tweak 21 |
| 0840 | [ ] | GSC weekly check 42 |
| 0841 | [ ] | Sitemap lastmod update for top 10 pages |
| 0842 | [ ] | GSC weekly check 43 |
| 0843 | [ ] | Title/description tweak 22 |
| 0844 | [ ] | GSC weekly check 44 |
| 0845 | [ ] | Second round JustDial update |
| 0846 | [ ] | GSC weekly check 45 |
| 0847 | [ ] | Title/description tweak 23 |
| 0848 | [ ] | GSC weekly check 46 |
| 0849 | [ ] | Second round Sulekha update |
| 0850 | [ ] | GSC weekly check 47 |

---

## 0851–1000 — Ongoing (Weekly/Daily)

| # | Status | Task |
|---|--------|------|
| 0851 | [ ] | Anandu: GSC check – impressions, clicks, indexed; fix errors |
| 0852 | [ ] | Surag: GBP check – reviews, questions; respond within 2h |
| 0853 | [ ] | Surag: Post one GBP update this week |
| 0854 | [ ] | Surag: Write one new blog article OR one new location page |
| 0855 | [ ] | Anandu: Get one new backlink (directory/HARO/client/GitHub) |
| 0856 | [ ] | Both: Monday – review GSC; improve title/description for pages with impressions, no clicks |
| 0857 | [ ] | Week 2: GSC check |
| 0858 | [ ] | Week 2: GBP check + post |
| 0859 | [ ] | Week 2: One new content or location page |
| 0860 | [ ] | Week 2: One new backlink |
| 0861 | [ ] | Week 2: Monday GSC review |
| 0862 | [ ] | Week 3: GSC check |
| 0863 | [ ] | Week 3: GBP check + post |
| 0864 | [ ] | Week 3: One new content or location page |
| 0865 | [ ] | Week 3: One new backlink |
| 0866 | [ ] | Week 3: Monday GSC review |
| 0867 | [ ] | Week 4: GSC check |
| 0868 | [ ] | Week 4: GBP check + post |
| 0869 | [ ] | Week 4: One new content or location page |
| 0870 | [ ] | Week 4: One new backlink |
| 0871 | [ ] | Week 4: Monday GSC review |
| 0872 | [ ] | Week 5: GSC check |
| 0873 | [ ] | Week 5: GBP check + post |
| 0874 | [ ] | Week 5: One new content or location page |
| 0875 | [ ] | Week 5: One new backlink |
| 0876 | [ ] | Week 5: Monday GSC review |
| 0877 | [ ] | Week 6: GSC check |
| 0878 | [ ] | Week 6: GBP check + post |
| 0879 | [ ] | Week 6: One new content or location page |
| 0880 | [ ] | Week 6: One new backlink |
| 0881 | [ ] | Week 6: Monday GSC review |
| 0882 | [ ] | Week 7: GSC check |
| 0883 | [ ] | Week 7: GBP check + post |
| 0884 | [ ] | Week 7: One new content or location page |
| 0885 | [ ] | Week 7: One new backlink |
| 0886 | [ ] | Week 7: Monday GSC review |
| 0887 | [ ] | Week 8: GSC check |
| 0888 | [ ] | Week 8: GBP check + post |
| 0889 | [ ] | Week 8: One new content or location page |
| 0890 | [ ] | Week 8: One new backlink |
| 0891 | [ ] | Week 8: Monday GSC review |
| 0892 | [ ] | Week 9: GSC check |
| 0893 | [ ] | Week 9: GBP check + post |
| 0894 | [ ] | Week 9: One new content or location page |
| 0895 | [ ] | Week 9: One new backlink |
| 0896 | [ ] | Week 9: Monday GSC review |
| 0897 | [ ] | Week 10: GSC check |
| 0898 | [ ] | Week 10: GBP check + post |
| 0899 | [ ] | Week 10: One new content or location page |
| 0900 | [ ] | Week 10: Monday GSC review |
| 0901 | [ ] | Week 11: GSC check |
| 0902 | [ ] | Week 11: GBP check + post |
| 0903 | [ ] | Week 11: One new content or location page |
| 0904 | [ ] | Week 11: One new backlink |
| 0905 | [ ] | Week 11: Monday GSC review |
| 0906 | [ ] | Week 12: GSC check |
| 0907 | [ ] | Week 12: GBP check + post |
| 0908 | [ ] | Week 12: One new content or location page |
| 0909 | [ ] | Week 12: One new backlink |
| 0910 | [ ] | Week 12: Monday GSC review |
| 0911 | [ ] | Week 13: GSC check |
| 0912 | [ ] | Week 13: GBP check + post |
| 0913 | [ ] | Week 13: One new content or location page |
| 0914 | [ ] | Week 13: One new backlink |
| 0915 | [ ] | Week 13: Monday GSC review |
| 0916 | [ ] | Week 14: GSC check |
| 0917 | [ ] | Week 14: GBP check + post |
| 0918 | [ ] | Week 14: One new content or location page |
| 0919 | [ ] | Week 14: One new backlink |
| 0920 | [ ] | Week 14: Monday GSC review |
| 0921 | [ ] | Week 15: GSC check |
| 0922 | [ ] | Week 15: GBP check + post |
| 0923 | [ ] | Week 15: One new content or location page |
| 0924 | [ ] | Week 15: One new backlink |
| 0925 | [ ] | Week 15: Monday GSC review |
| 0926 | [ ] | Week 16: GSC check |
| 0927 | [ ] | Week 16: GBP check + post |
| 0928 | [ ] | Week 16: One new content or location page |
| 0929 | [ ] | Week 16: One new backlink |
| 0930 | [ ] | Week 16: Monday GSC review |
| 0931 | [ ] | Week 17: GSC check |
| 0932 | [ ] | Week 17: GBP check + post |
| 0933 | [ ] | Week 17: One new content or location page |
| 0934 | [ ] | Week 17: One new backlink |
| 0935 | [ ] | Week 17: Monday GSC review |
| 0936 | [ ] | Week 18: GSC check |
| 0937 | [ ] | Week 18: GBP check + post |
| 0938 | [ ] | Week 18: One new content or location page |
| 0939 | [ ] | Week 18: One new backlink |
| 0940 | [ ] | Week 18: Monday GSC review |
| 0941 | [ ] | Week 19: GSC check |
| 0942 | [ ] | Week 19: GBP check + post |
| 0943 | [ ] | Week 19: One new content or location page |
| 0944 | [ ] | Week 19: One new backlink |
| 0945 | [ ] | Week 19: Monday GSC review |
| 0946 | [ ] | Week 20: GSC check |
| 0947 | [ ] | Week 20: GBP check + post |
| 0948 | [ ] | Week 20: One new content or location page |
| 0949 | [ ] | Week 20: One new backlink |
| 0950 | [ ] | Week 20: Monday GSC review |
| 0951 | [ ] | Month 6: Full SEO audit (indexed pages, backlinks count, rankings) |
| 0952 | [ ] | Update sitemap lastmod for top 20 pages |
| 0953 | [ ] | Add 5 new location pages (new city or service) |
| 0954 | [ ] | Submit 5 new pages in GSC |
| 0955 | [ ] | Guest post 2: second Kerala blog |
| 0956 | [ ] | HARO response 2 |
| 0957 | [ ] | LinkedIn post: case study 2 |
| 0958 | [ ] | GBP: Request 2 more reviews from new clients |
| 0959 | [ ] | Fix any new PageSpeed regressions |
| 0960 | [ ] | Add structured data to 2 more service subpages if any |
| 0961 | [ ] | Week 21: GSC check |
| 0962 | [ ] | Week 21: GBP check + post |
| 0963 | [ ] | Week 21: One new content or location page |
| 0964 | [ ] | Week 21: One new backlink |
| 0965 | [ ] | Week 21: Monday GSC review |
| 0966 | [ ] | Week 22: GSC check |
| 0967 | [ ] | Week 22: GBP check + post |
| 0968 | [ ] | Week 22: One new content or location page |
| 0969 | [ ] | Week 22: One new backlink |
| 0970 | [ ] | Week 22: Monday GSC review |
| 0971 | [ ] | Week 23: GSC check |
| 0972 | [ ] | Week 23: GBP check + post |
| 0973 | [ ] | Week 23: One new content or location page |
| 0974 | [ ] | Week 23: One new backlink |
| 0975 | [ ] | Week 23: Monday GSC review |
| 0976 | [ ] | Week 24: GSC check |
| 0977 | [ ] | Week 24: GBP check + post |
| 0978 | [ ] | Week 24: One new content or location page |
| 0979 | [ ] | Week 24: One new backlink |
| 0980 | [ ] | Week 24: Monday GSC review |
| 0981 | [ ] | Backlink audit: list all referring domains |
| 0982 | [ ] | Content audit: list all blog + location pages |
| 0983 | [ ] | GSC: Export performance report; note top 10 queries |
| 0984 | [ ] | Create 3 new blog articles (topics from GSC queries) |
| 0985 | [ ] | Add internal links from new articles to services |
| 0986 | [ ] | Submit 3 new articles in GSC |
| 0987 | [ ] | Directory update: refresh JustDial/Sulekha/Clutch info |
| 0988 | [ ] | GBP: Add 5 new photos |
| 0989 | [ ] | Test site on mobile; fix any layout issues |
| 0990 | [ ] | Canonical check: ensure no duplicate content in GSC |
| 0991 | [ ] | Week 41: GSC check |
| 0992 | [ ] | Week 41: GBP check + post |
| 0993 | [ ] | Week 41: One new backlink |
| 0994 | [ ] | Week 41: Monday GSC review |
| 0995 | [ ] | Week 42: GSC check |
| 0996 | [ ] | Week 42: GBP check + post |
| 0997 | [ ] | Week 42: One new content or location page |
| 0998 | [ ] | Week 42: Monday GSC review |
| 0999 | [ ] | Document 1000-task completion (summary report) |
| 1000 | [ ] | Plan next 100 tasks (continuation list) |

---

**End of Master To-Do 0001–1000.**  
HexaStack Solutions | Vatanappally, Thrissur, Kerala | March 2026
