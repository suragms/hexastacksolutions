# Agent pipeline — HexaStack Solutions

Single entry point for the **11-agent workflow**. Outputs live in `docs/agent-system/`; per-agent behavior in `.cursor/skills/<agent-name>/SKILL.md`.

---

## Pipeline order (run sequentially)

| # | Agent | Output / action |
|---|--------|------------------|
| 1 | Research | `docs/agent-system/research.md` |
| 2 | Product Strategy | `docs/agent-system/strategy.md` |
| 3 | Architecture | `docs/agent-system/architecture.md` |
| 4 | UI/UX | `docs/agent-system/uiux.md` |
| 5 | Development | `docs/agent-system/tasks.md` |
| 6 | Testing | `docs/agent-system/testing.md` |
| 7 | Security | `docs/agent-system/security.md` |
| 8 | Performance | Adds **Performance** section to `deployment.md` |
| 9 | Deployment | `docs/agent-system/deployment.md` |
| 10 | Growth | `docs/agent-system/growth.md` |
| 11 | Operations | Adds **Operations** section to `growth.md` |

---

## How to run

1. **Rule:** `.cursor/rules/21-AGENT-CHAIN.md` — read before running any agent.
2. **Memory:** Before each run, read `memory/lessons.md`, `memory/patterns.md`, `memory/ui_patterns.md`, `memory/architecture_patterns.md`.
3. **Prompt pattern:**  
   *"You are the [Agent Name] Agent. Read `docs/agent-system/[previous].md` and `memory/*.md`; produce/update `docs/agent-system/[next].md`. Follow the skill in `.cursor/skills/[agent-name]/SKILL.md`."*
4. **Skills:** Each agent’s role, inputs, output, and principles are in `.cursor/skills/<agent-name>/SKILL.md`.

---

## Skill locations (one per agent)

- `research-agent` → Research
- `strategy-agent` → Product Strategy
- `architecture-agent` → Architecture
- `uiux-agent` → UI/UX
- `development-agent` → Development (tasks)
- `testing-agent` → Testing
- `security-agent` → Security
- `performance-agent` → Performance
- `deployment-agent` → Deployment
- `growth-agent` → Growth
- `operations-agent` → Operations

---

## Code scope

- **Code changes only in:** `server/`, `src/`, and `prisma/` when needed.
- **Outputs only in:** `docs/agent-system/` (9 files total; Performance and Operations append to deployment.md and growth.md).

Full pipeline and doc list: `docs/agent-system/README.md`.
