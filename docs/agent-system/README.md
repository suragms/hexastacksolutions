# AI Agent System — Documentation (Dynamic Skills)

This folder contains **agent workflow outputs** and **reusable skill docs** for the **HexaStack Solutions main site** (hexastacksolutions.com). The agent chain and markdown files are **generic**: they guide any product or feature work, not a single product.

---

## Memory system (self-improving)

- **Before each agent run:** Read all memory files in `memory/`: lessons.md, patterns.md, ui_patterns.md, architecture_patterns.md.
- **After each stage:** The active agent may append new insights to the relevant memory file (e.g. a lesson learned, a pattern that worked, a UI or architecture choice).
- This keeps the company’s knowledge base improving with every project.

---

## Output documents (9 only)

| # | Document | Primary agent |
|---|----------|----------------|
| 1 | [research.md](./research.md) | Research |
| 2 | [strategy.md](./strategy.md) | Product Strategy |
| 3 | [architecture.md](./architecture.md) | Architecture |
| 4 | [uiux.md](./uiux.md) | UI/UX |
| 5 | [tasks.md](./tasks.md) | Development |
| 6 | [testing.md](./testing.md) | Testing |
| 7 | [security.md](./security.md) | Security |
| 8 | [deployment.md](./deployment.md) | Deployment (+ Performance section by Performance Agent) |
| 9 | [growth.md](./growth.md) | Growth (+ Operations section by Operations Agent) |

---

## Agent workflow (11 agents)

Requirement → Research → Product Strategy → Architecture → UI/UX → Development (tasks) → Testing → Security → Performance → Deployment → Growth → Operations

Each agent reads previous output(s) and memory, then writes or updates its output document. Performance Agent adds a Performance section to deployment.md; Operations Agent adds an Operations section to growth.md.

---

## How to use

- **Pipeline entry:** See **`.cursor/AGENTS.md`** for agent order, outputs, and how to run. Rule: `.cursor/rules/21-AGENT-CHAIN.md`.
- **Run the next agent:** In Cursor Composer, say e.g. “You are the [Next] Agent. Read `docs/agent-system/[previous].md` and `memory/*.md`; update `docs/agent-system/[next].md`.”
- **Per-agent skills:** `.cursor/skills/<agent-name>/SKILL.md` (index: `.cursor/skills/README.md`).
- **Implement:** Follow [tasks.md](./tasks.md) and [architecture.md](./architecture.md); code only in `server/` and `src/`.
- **Product launch:** Use [growth.md](./growth.md) and [uiux.md](./uiux.md) as templates.

---

## Execution instruction

1. Analyze the requirement.
2. Load memory files (`memory/*.md`).
3. Activate agents sequentially (Research → … → Operations).
4. Produce structured outputs for each stage.
5. Extract lessons learned and update memory.

---

## Design goals

- **Dynamic skills:** Agent docs are reusable for the main site and any new product or campaign.
- **Low cost:** Cursor Pro + file-based handoff; no expensive orchestration.
- **Production quality:** Clean architecture, modular code, security, performance, clear documentation.
- **UI/UX:** Minimal layout, clear hierarchy, mobile responsiveness, simple navigation.

---

*Last updated: 2026-03*
