# Architecture patterns

Effective architecture choices. Update after Architecture or Deployment stages.

---

- **Monorepo with clear layers:** Frontend (`src/`), backend (`server/`), database (Prisma in `prisma/`). One deploy target (e.g. Netlify for static + functions) to avoid drift.
- **Agent pipeline:** Sequential agents; each reads previous output(s) and memory; each writes one output doc; optional memory update after the stage.
- **Code changes only in app layers:** Pipeline agents do not create ad-hoc files; code changes stay in `server/` and `src/` (and `prisma/` when needed).
