# 02 — SEO AGENT
# Search Rankings | Built from real index.html + SEO.tsx

---

## READ BEFORE ANY SEO TASK

```bash
cat index.html           # canonical, og tags, meta — already set to hexastacksolutions.com ✓
cat src/components/SEO.tsx  # props: title, description, keywords, ogImage, ogType, noindex, schema
cat public/sitemap.xml   # check if complete
cat public/robots.txt    # check rules
```

---

## CURRENT SEO STATUS (from actual files)

### index.html — what's correct ✓
```
canonical: https://hexastacksolutions.com — CORRECT
og:url:    https://hexastacksolutions.com — CORRECT
og:image:  /logo-full-white.png — ok
Font:      Inter (preloaded) — CORRECT
```

### index.html — what needs fixing
```
title: "HEXASTACK SOLUTIONS | Business Software & Automation Systems India & Gulf"
→ FIX TO: "Web & Software Development Thrissur Kerala | HexaStack Solutions"

description: "Enterprise-grade business software, ERP implementation..."
→ BANNED PHRASE "Enterprise-grade" — FIX IMMEDIATELY
→ FIX TO: "HexaStack Solutions builds custom websites, apps and AI software for 
   businesses in Thrissur, Kerala and Gulf. 3+ delivered projects. 
   WhatsApp reply in 2 hours."

keywords: missing "Thrissur", "Kerala", "web development"
→ ADD: "web development Thrissur, software company Kerala, website design 
   Thrissur Kerala, web developer Gulf UAE"
```

---

## SEO COMPONENT — HOW IT WORKS

```tsx
// SEO.tsx uses useEffect to set DOM directly (no react-helmet needed)
// Props accepted:
interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;      // default: 'website'
  noindex?: boolean;    // default: false
  schema?: object;      // JSON-LD injected into <script type="application/ld+json">
}
```

---

## PAGE TITLES (exact — use these, don't improvise)

```
Home /
→ "Web & Software Development Thrissur Kerala | HexaStack Solutions"

Services /services  
→ "Software Development Services Kerala | Web, App & AI | HexaStack"

Work /work
→ "Our Projects | Gulf POS, Medical Software, AI App | HexaStack Kerala"

Contact /contact
→ "Contact HexaStack Solutions | Software Team Thrissur Kerala"

Pricing /pricing
→ "Website & App Development Pricing Kerala | Starting ₹15,000 | HexaStack"

About /about
→ "About HexaStack Solutions | Developers from Thrissur, Kerala"

Blog /blog
→ "Blog | Web Development & Software Tips | HexaStack Kerala"

Products /products
→ "Business Software Products | HexaBill POS & More | HexaStack"

Solutions /solutions
→ "Business Software Solutions Kerala & Gulf | HexaStack Solutions"
```

---

## META DESCRIPTIONS (exact — 150-160 chars)

```
Home:
"HexaStack Solutions builds custom websites, apps and AI software for businesses 
in Thrissur, Kerala and Gulf. 3+ delivered projects. WhatsApp reply in 2 hours."

Services:
"Custom web development, web apps, AI integration, restaurant POS and medical software. 
HexaStack Solutions — Thrissur, Kerala. Affordable. Fast delivery. Direct support."

Work:
"Real projects by HexaStack Solutions: Gulf restaurant POS, Kerala medical lab software, 
NutriScan AI app. Custom software built from Thrissur, Kerala."

Contact:
"Contact HexaStack Solutions in Thrissur, Kerala. WhatsApp for fastest reply. 
We build websites, apps and AI software for India and Gulf businesses."

Pricing:
"Transparent pricing for websites, web apps and AI software. Starting from ₹15,000. 
HexaStack Solutions, Thrissur Kerala. No hidden fees."
```

---

## JSON-LD SCHEMA (use the schema prop in SEO component)

### Home page schema:
```tsx
schema={{
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'HexaStack Solutions',
  description: 'Custom software development, website design and AI integration for businesses in Thrissur, Kerala and Gulf.',
  url: 'https://hexastacksolutions.com',
  telephone: '+917591999365',
  email: 'supporthexastack@hexastacksolutions.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vatanappally',
    addressRegion: 'Thrissur, Kerala',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '10.4731',
    longitude: '76.2120',
  },
  areaServed: ['Kerala', 'UAE', 'India'],
  priceRange: '₹₹',
  openingHours: 'Mo-Sa 09:00-20:00',
  sameAs: ['https://www.linkedin.com/company/hexastack-solutions/'],
}}
```

### Work page schema (for each project):
```tsx
// Add this for each portfolio project in Work.tsx
schema={{
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'HexaStack Solutions Portfolio',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.title,
    description: p.description,
  }))
}}
```

---

## sitemap.xml (check public/sitemap.xml — update if incomplete)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://hexastacksolutions.com/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://hexastacksolutions.com/services</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://hexastacksolutions.com/work</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://hexastacksolutions.com/products</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://hexastacksolutions.com/products/hexabill</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://hexastacksolutions.com/pricing</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://hexastacksolutions.com/about</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://hexastacksolutions.com/contact</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://hexastacksolutions.com/blog</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://hexastacksolutions.com/solutions</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
</urlset>
```

### robots.txt (check public/robots.txt):
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://hexastacksolutions.com/sitemap.xml
```

---

## KEYWORD TARGETS

### Primary (use on every page naturally):
```
"Thrissur" — use in every H2, every page description
"Kerala" — in meta descriptions, body text
"web development Thrissur"
"software company Kerala"
"website design Thrissur Kerala"
```

### Service keywords:
```
"restaurant POS software Kerala"
"billing software UAE"
"medical lab software Kerala"
"AI app development Kerala"
"custom web application Kerala"
"SaaS development India"
```

### Gulf keywords (use on Home, Work, Contact):
```
"web development company for UAE businesses"
"Kerala developer Gulf"
"restaurant software UAE"
"billing software Dubai"
```

### Long-tail (for blog articles):
```
"how much does a website cost in Kerala"
"website developer Thrissur WhatsApp"
"web development company Thrissur"
"POS software restaurant Kerala"
```

---

## BLOG ARTICLES (write these — highest SEO value)

### Article 1 (write first — highest traffic):
```
URL:   /blog/website-cost-kerala-2025
Title: "How Much Does a Website Cost in Kerala in 2025? Honest Guide"
H1:    How Much Does a Website Cost in Kerala in 2025?
H2s:   Basic Website ₹10,000–₹25,000 | E-commerce ₹25,000–₹60,000 | 
       Web Application ₹50,000–₹1,50,000 | Why Prices Vary | What to Ask
CTA:   "Get a free quote from HexaStack Solutions, Thrissur"
Words: 1000+
```

### Article 2 (Gulf credibility):
```
URL:   /blog/kerala-team-built-uae-restaurant-pos
Title: "How We Built a Restaurant POS for a UAE Client from Thrissur, Kerala"
Real story — what client needed, what was built, real result
Words: 800+
```

### Article 3 (local lead gen):
```
URL:   /blog/thrissur-businesses-need-website
Title: "Why Thrissur Businesses Are Losing Customers Without a Website in 2025"
Local emotion — mention Vatanappally, Thrissur roads, local competition
Words: 800+
```

---

## SEO CHECKLIST — before every deploy

```
□ index.html title removed "Enterprise-grade" 
□ All page <SEO> components have "Thrissur" or "Kerala" in title
□ All meta descriptions are 140-160 characters
□ public/robots.txt has Disallow /admin
□ public/sitemap.xml has all 10 routes
□ JSON-LD LocalBusiness schema on Home page
□ All images have alt text with keywords
□ H1 exists on every page (exactly one per page)
□ Internal links between pages (services ↔ work ↔ contact ↔ pricing)
□ No "Enterprise-grade", "cutting-edge", "innovative solutions" in any meta
```
