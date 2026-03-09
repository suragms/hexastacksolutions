# Agent skills — one skill per pipeline agent

Each folder is one agent. The AI uses `SKILL.md` in that folder for role, inputs, output, and principles.

| Folder | Agent | One-line purpose |
|--------|--------|-------------------|
| `research-agent/` | Research | Analyzes market, competitors, and user problems. |
| `strategy-agent/` | Product Strategy | Defines product vision, positioning, and feature priorities. |
| `architecture-agent/` | Architecture | Designs system architecture, tech stack, and repo layout. |
| `uiux-agent/` | UI/UX | Designs minimal, responsive interfaces and user flows. |
| `development-agent/` | Development | Produces development plan and task list; implements code in `server/` and `src/`. |
| `testing-agent/` | Testing | Validates behavior, creates tests, and detects bugs. |
| `security-agent/` | Security | Ensures authentication, validation, and secure design. |
| `performance-agent/` | Performance | Optimizes loading, queries, and scalability; updates deployment.md. |
| `deployment-agent/` | Deployment | Prepares production infrastructure and deployment steps. |
| `growth-agent/` | Growth | Designs SEO, messaging, and conversion strategy. |
| `operations-agent/` | Operations | Designs workflows for task management and automation; updates growth.md. |

**Pipeline order:** See `.cursor/AGENTS.md`.  
**Outputs:** `docs/agent-system/` (research.md → strategy.md → … → growth.md).
