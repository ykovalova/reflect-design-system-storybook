# Reflect Design System — Storybook

Figma → Vue 3 + Storybook receiver for the Reflect Design System.

## Commands

```bash
source ./bin/activate-local-node.sh
./bin/storybook
```

## Core rules

- **Figma is authoritative for all values.** If Figma and code disagree, update code to match Figma.
- **Run the parity gate before every component transfer.** Use `$figma-tokens-to-storybook` to verify foundation tokens are in sync before transferring any component.
- **Foundations before components.** A component transfer is blocked until its required tokens are Verified.
- **`foundations.ts` and `base.css` must stay in sync.** `foundations.ts` holds typed token data; `base.css` registers the CSS custom properties. Adding to one means adding to the other.
- **Components consume semantic tokens only.** Component CSS must reference `--color-text-primary`, never `--color-gray-90` directly.

## Documentation

| Doc | What it covers |
|-----|----------------|
| [README.md](README.md) | Project milestones and mental models |
| [WORKFLOW.md](WORKFLOW.md) | Transfer workflow steps and status definitions |
| [docs/design-system.md](docs/design-system.md) | Token architecture, naming rules, component transfer rules |
| [docs/storybook.md](docs/storybook.md) | Story organization, patterns, and conventions |
| [src/tokens/figma-mapping.md](src/tokens/figma-mapping.md) | Figma ↔ code parity — living audit trail |

## Key files

| File | Purpose |
|------|---------|
| `src/tokens/foundations.ts` | Typed token data — source of truth for stories |
| `src/styles/base.css` | CSS custom properties on `:root` |
| `src/stories/foundations/` | Foundation stories (Colors, Spacing, Typography, Elevations) |
| `src/components/` | Vue components and their stories |
| `.storybook/preview.ts` | Navigation order, global config |
| `src/tokens/figma-mapping.md` | Living parity record — updated after every transfer |
