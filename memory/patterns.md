# Reusable patterns

Code and process patterns that work well. Update after each stage.

---

- **File-based handoff:** Agents read/write Markdown in `docs/agent-system/`. No message queue; Cursor Composer + file read/write is sufficient for the pipeline.
- **Single output file per agent:** Each agent produces or updates one primary document; keeps the pipeline easy to follow and version.
- **SEO location batches:** Add location pages in batches of 5 (data in `src/data/seoLocationPages.ts`, URLs in `public/sitemap.xml`, then MASTER_TODO and GSC checklist). Base batch = web, POS, website-design, billing, ecommerce; extra batch = medical, restaurant-pos, lab, CRM, custom.
