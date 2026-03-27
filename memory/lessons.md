# Lessons learned

Past mistakes and what we learned. Update after each project stage.

---

- **Duplicate backends:** Avoid maintaining two API implementations (e.g. `api/index.js` for Vercel and `server/` for Netlify). Use one backend; deploy via one path (e.g. Netlify Functions wrapping `server/`).
- **Agent docs vs product:** Keep agent-system docs generic (dynamic skills). Do not hard-code a single product name (e.g. HexaBill) in pipeline docs; use templates and placeholders so the same workflow serves the main site and any product launch.
