# Reflect Token Targets

Use this reference when running token parity in `/Users/yuliia.kovalova/Documents/Reflect Storybook`.

## Code Sources Of Truth

- `storybook-vue-library/src/tokens/foundations.ts`
  Structured token catalog used by the foundation stories.
- `storybook-vue-library/src/styles/base.css`
  CSS custom properties and semantic aliases consumed by components.
- `storybook-vue-library/src/tokens/figma-mapping.md`
  Shared decision log and reusable Figma-to-code mapping table.

## Token Domains To Check

- Colors
- Spacing
- Typography
- Radius
- Shadows
- Theme aliases or semantic modes

## Required Parity Output

Document each reviewed Figma token or style with:

| Figma token/style | Code token | Status | Notes |
| --- | --- | --- | --- |

Use explicit statuses only:
- `Approved`
- `Needs approval`
- `Missing in code`
- `Missing in Figma`
- `Ambiguous`

## Known Drift Risks

- `Radius/r-64` in Figma may correspond to `--radius-pill` in code, but that mapping is not yet approved and must not be silently inferred.
- Semantic color aliases exist in code, but Figma variable collections and theme modes have not always been exposed through MCP. Document that limitation when it appears.
- `foundations.ts` and `base.css` should stay aligned. If one has a token that the other lacks, treat that as a code-side parity issue before component transfer.

## Gate Before Components

If a component depends on unresolved tokens, stop component transfer and report the missing or ambiguous mappings first.
