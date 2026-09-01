# Reflect Design System — Storybook

Figma → Vue 3 + Storybook receiver for the Reflect Design System.

## Commands

```bash
source ./bin/activate-local-node.sh
./bin/storybook
```

## Core rules

- **Figma is authoritative for all values.** If Figma and code disagree, update code to match Figma.
- **Run the transfer gate before every component transfer.** Use `$component-transfer-gate` to confirm required foundation tokens are Verified before transferring any component. Use `$figma-token-parity` whenever foundations change or need a fresh comparison against Figma.
- **Foundations before components.** A component transfer is blocked until its required tokens are Verified.
- **`foundations.ts` and `base.css` must stay in sync.** `foundations.ts` holds typed token data; `base.css` registers the CSS custom properties. Adding to one means adding to the other.
- **Every change gets a changelog entry.** `CHANGELOG.md` at the repo root, updated as part of the change itself — same commit or PR, not retroactively. `LEARNINGS.md` is for reasoning and rules learned; the changelog is the record of what changed.
- **Components consume semantic tokens only.** Component CSS must reference `--color-text-primary`, never `--color-gray-90` directly. Use the `reflect-token-picker` skill to choose which semantic token applies.

## Documentation

| Doc | What it covers |
|-----|----------------|
| [../CHANGELOG.md](../CHANGELOG.md) | What changed, dated. Update as part of the change |
| [README.md](README.md) | Project milestones and mental models |
| [WORKFLOW.md](WORKFLOW.md) | Transfer workflow steps and status definitions |
| [docs/design-system.md](docs/design-system.md) | Token architecture, naming rules, component transfer rules |
| [docs/storybook.md](docs/storybook.md) | Story organization, patterns, and conventions |
| [docs/semantic-color-spec.html](docs/semantic-color-spec.html) | The semantic colour layer — mirrors the `Semantic` collection in Figma. Authoritative for structure; **not yet reflected in `base.css`** |
| [src/tokens/semantic-token-map.md](src/tokens/semantic-token-map.md) | Every semantic token, its primitive alias, and when to use it — plus the old-token → new-token migration map |
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
