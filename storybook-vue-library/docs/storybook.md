# Storybook Conventions

## Navigation & organization

Navigation order is defined explicitly in `.storybook/preview.ts` and must be updated whenever a new story file is added. Storybook does not auto-sort — anything not listed falls to the bottom.

```ts
storySort: {
  order: ["Foundations", ["Colors", "Spacing", "Typography"], "Components", ["Button"]]
}
```

Story files live in two locations:
- Foundation stories: `src/stories/foundations/`
- Component stories: alongside the component in `src/components/`

Both paths are registered in `.storybook/main.ts`.

---

## Foundation stories

All foundation stories share the same structure:

```ts
const meta = {
  title: "Foundations/Name",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;
```

Foundations are not components — they are data-driven displays of token arrays imported from `src/tokens/foundations.ts`. Every foundation story uses `render()` with an inline Vue template rather than a component. The template reads token data from `setup()` and renders the catalog directly.

### Colors

Two stories: the primitive palette, and the semantic layer.

**`Palette`**
Renders all primitive color tokens grouped by family (Gray, Brand, Red, Green, Yellow, Blue, Purple). Each token is a swatch card showing name, CSS variable, and hex value. Source data: `colorTokens` from `foundations.ts`.

**`Semantic`**
Renders the 113 tokens of the Figma `Semantic` collection in one table per group — Background, Border, Text, Icon, Overlay, Brand / Logo. Each row shows a swatch, token name, CSS variable, primitive alias with hex, and the usage description from Figma. Swatches are painted with the live CSS variable (`var(--color-bg-…)`) over a checkerboard, so alpha tokens read correctly and the story proves the generated CSS actually resolves. Source data: `semanticColors` from `src/tokens/semantic-colors.generated.ts` — regenerate with `npm run tokens:generate`, never edit by hand.

The previous `Semantic — Property-first` and `Semantic — Intent-first` stories described the old `Surface/Action/Status` structure and were removed.

### Spacing

**`Scale`**
One story. Renders all spacing tokens as a vertical stack of rows. Each row shows the token name, CSS variable, px value, rem value, and a horizontal bar whose width matches the rem value — giving a visual sense of proportion across the scale. Source data: `spacingTokens`.

### Typography

**`TypeScale`**
One story. Groups tokens by category — Heading, Body, Caption, Button — then renders each token as a card showing name, CSS variable, family, weight, and size/line-height. Below the metadata, the token's sample text is rendered live using inline styles drawn from the token data: `fontSize: var(--font-*)`, `fontWeight`, `lineHeight`, `textTransform`. This means the specimen reflects the actual token value rather than hardcoded styles. Source data: `typographyTokens`.

### Elevations

**`Shadows`**
One story. Renders both shadow tokens as cards. Each card shows name, CSS variable, shadow offset/blur/spread values, and a demo square with `box-shadow: token.value` applied directly — showing the actual Figma effect in the browser. Source data: `shadowTokens`.

---

## Component stories

Every component has a consistent set of stories in this order:

### `Playground`
An empty story that inherits all defaults from the meta `args`. Every control is active. This is the free-exploration view — pick a variant, change a size, toggle an icon. No custom render function needed.

```ts
export const Playground: Story = {};
```

### `VariantMatrix`
A `render()` story that shows all variants side by side at multiple sizes. No controls — the point is a fixed overview. Rendered inside a `docs-page` layout with a heading that identifies what the matrix is showing.

### `States`
A `render()` story that shows one variant (usually primary medium) across all interactive states: default, hover, pressed, focused, disabled, loading. Each state is labeled. Useful for reviewing that all states are visually distinct.

### Named examples
Args-based stories that demonstrate a specific, notable configuration. These are not exhaustive — only configurations worth calling out explicitly.

Current examples for Button:
- `IconOnly` — circular icon button with `onlyIcon: true`
- `Danger` — primary-danger with a leading close icon
- `Textual` — tertiary with a trailing arrow-right icon

Named examples use `args`, not `render()`. Keep them simple.

---

## Meta conventions

### Foundation meta

```ts
const meta = {
  title: "Foundations/Name",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;
```

### Component meta

```ts
const meta = {
  title: "Components/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
  argTypes: { ... },
  args: { ... },
  parameters: {
    docs: {
      description: { component: "..." }
    }
  }
} satisfies Meta<typeof ComponentName>;
```

`layout` is omitted for components — the default centered canvas is appropriate.

### Control types

| Prop type | Control | When |
|-----------|---------|------|
| Enum with 3+ options | `select` | variant, size, state, icon |
| Boolean-like enum | `inline-radio` | iconPosition (`leading` / `trailing`) |
| Boolean | `boolean` | onlyIcon, disabled |
| String | `text` | label, ariaLabel |

### `argTypes` vs `args`

`argTypes` defines the control type and available options. `args` sets the defaults that Playground starts with. Named example stories override specific `args` — they do not need to redefine `argTypes`.

---

## Adding a new foundation

1. Add token data to `src/tokens/foundations.ts` (typed array export)
2. Add CSS custom properties to `src/styles/base.css`
3. Create `src/stories/foundations/Name.stories.ts`
4. Add the story name to the sort order in `.storybook/preview.ts`

## Adding a new component

1. Complete the foundations gate (see [WORKFLOW.md](../WORKFLOW.md))
2. Create `src/components/ComponentName/ComponentName.vue`
3. Create `src/components/ComponentName/ComponentName.stories.ts`
4. Add the component name to the sort order in `.storybook/preview.ts`
