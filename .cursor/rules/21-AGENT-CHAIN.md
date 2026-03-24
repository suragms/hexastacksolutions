# Agent chain (multi-agent workflow)

When the user asks to run an agent, or "start next" in the context of the AI agent pipeline:

- **Outputs live in:** `docs/agent-system/`
- **Files (in order, 9 only):** research.md → strategy.md → architecture.md → uiux.md → tasks.md → testing.md → security.md → deployment.md → growth.md
- **Memory:** Before each agent run, read `memory/lessons.md`, `memory/patterns.md`, `memory/ui_patterns.md`, `memory/architecture_patterns.md`. After producing output, the agent may append insights to the relevant memory file(s).
- **Handoff:** Each agent reads the previous agent's output (and memory) and writes/updates the next file. Do not skip files.
- **Agents (11):** Research, Product Strategy, Architecture, UI/UX, Development, Testing, Security, Performance, Deployment, Growth, Operations. Performance updates deployment.md (Performance section); Operations updates growth.md (Operations section).
- **Per-agent behavior:** See `.cursor/skills/<agent-name>/SKILL.md` for role, inputs, output, and principles.
- **Code changes:** Only in `server/` (backend) and `src/` (frontend). Do not create unnecessary files elsewhere.
- **Scope:** This repo is the HexaStack Solutions main site (hexastacksolutions.com). Agent docs are dynamic skills — not specific to one product.
- **Reference:** Full pipeline and repo layout are in `docs/agent-system/architecture.md` and `docs/agent-system/README.md`.

When acting as a specific agent, follow the structure defined in the existing `docs/agent-system/*.md` for that agent's output and the skill in `.cursor/skills/`.
