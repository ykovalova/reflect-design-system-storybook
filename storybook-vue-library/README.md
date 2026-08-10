# Reflect Design System — Storybook

This workspace receives the Reflect Design System from Figma and transfers it into Vue 3 components and Storybook documentation. It is not an app — it is a structured receiver for design tokens, semantic layers, and component implementations.

## Milestones

The project follows a staged approach: foundations must be verified before components are transferred.

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Foundations transfer — primitive variables transferred from Figma to code | Done |
| 2 | Semantic structure defined and published in Storybook | Done |
| 3 | Semantic structure tested on three components | Done |
| 4 | Documentation and structure refined | In progress |
| 5 | Semantic structure transferred to Figma and applied to remaining components | Upcoming |
| 6 | Remaining components transferred to code | Upcoming |
| 7 | Storybook updated and complete | Upcoming |

## Working principles

**Figma is the source of truth.**
All values — color, spacing, typography, shadows — originate in Figma. If the code and Figma disagree, update the code. The parity audit in `src/tokens/figma-mapping.md` is the live record of what's confirmed, what's in question, and what's unresolved.

**Tokens are layered.**
Primitive tokens (`--color-gray-90: #3E3E46`) form the raw palette. Semantic tokens (`--color-text-primary: var(--color-gray-90)`) assign meaning to those primitives. Components reference semantic tokens only — never primitives directly. This separation means that theming, dark mode, or a rebrand changes only the semantic layer without touching component code.

**Foundations gate components.**
No component is transferred until all the tokens it depends on have been verified against Figma. This is enforced by running `$figma-tokens-to-storybook` before any component work begins. If required tokens are missing, values are unconfirmed, or a mapping requires guesswork, the transfer stops.

## Quick start

Node is not on the system PATH by default. The activate script points the shell at the local Node install.

```bash
source ./bin/activate-local-node.sh
./bin/storybook
```

## Documentation

| Doc | What it covers |
|-----|----------------|
| [WORKFLOW.md](WORKFLOW.md) | Step-by-step transfer workflow for tokens and components, and status definitions |
| [docs/design-system.md](docs/design-system.md) | Token architecture, naming rules, source files, and component transfer rules |
| [docs/storybook.md](docs/storybook.md) | Story organization, foundation and component story patterns, conventions |
| [src/tokens/figma-mapping.md](src/tokens/figma-mapping.md) | Figma ↔ code parity — living audit trail, updated after every transfer |
