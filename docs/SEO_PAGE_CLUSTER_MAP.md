# SEO Keyword-to-URL Ownership Map

Use this map to prevent cannibalization. One primary cluster per URL.

## Priority keyword tiers

1. Buyer-intent keywords (highest conversion)
2. Local low-competition terms (Thrissur/Kerala)
3. Gulf value terms (UAE/Qatar/Saudi)
4. High-volume long-term head terms

| URL | Primary keyword cluster | Market | Intent | Tier | Supporting content |
|---|---|---|---|---|---|
| `/` | web development company kerala | Kerala | Commercial | 4 | Local authority blocks + proof snippets |
| `/` | software company thrissur kerala | Thrissur | Commercial | 2 | Internal links to `/services` and `/contact` |
| `/services` | website development company thrissur | Thrissur | Commercial | 2 | Service comparison and FAQ sections |
| `/services` | website design kerala small business | Kerala | Buyer intent | 1 | CTA to `/contact` and WhatsApp |
| `/services` | web development services uae / qatar / saudi | Gulf | Buyer intent | 1 | Region-specific service bullets |
| `/work` | how we built website for business in kerala | Kerala | Commercial investigation | 1 | Case-study deep dives |
| `/work` | restaurant POS rollout uae | UAE | Commercial investigation | 3 | Outcome-led case study blocks |
| `/pricing` | software development cost kerala, website cost kerala | Kerala | Commercial | 4 | Scope checklist and CTA |
| `/products/hexabill` | VAT billing software UAE | UAE | Transactional/commercial | 3 | Feature and rollout explainers |
| `/products/hexabill` | billing software qatar / billing software saudi | Qatar + Saudi | Commercial | 3 | Gulf rollout and compliance blocks |
| `/contact` | hire web developer kerala, software quote thrissur | Kerala + Thrissur | Transactional | 1 | Primary conversion endpoint |
| `/blog/vat-compliant-billing-software-uae` | VAT compliant billing UAE | UAE | Support/problem | 3 | Link to `/services` and `/products/hexabill` |
| `/blog/website-cost-kerala-2026` | website cost kerala 2026 | Kerala | Support/problem | 2 | Link to `/pricing` and `/contact` |
| `/blog/restaurant-pos-uae-case-study` | restaurant POS UAE case study | UAE | Commercial investigation | 3 | Link to `/work` and `/services` |

## Internal linking rules

- Every blog post links to exactly one money page as primary CTA.
- `/services` links to `/work`, `/pricing`, `/contact`.
- `/work` links to `/services`, `/contact`, and one relevant blog.
- Location templates should link upward to canonical service URLs, not laterally to similar templates.

## Thin template control

For low-performing location URLs in `/services/*` and `/seo/*`:

1. Keep indexable only if unique proof + local specifics exist.
2. Otherwise add `noindex` until enriched.
3. Always include canonical consistency and avoid duplicate H1/meta patterns.
