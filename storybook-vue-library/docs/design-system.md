# Design System Foundations

## Token architecture

Tokens follow a two-layer model: primitives and semantics.

**Primitive tokens** are the raw palette — they carry a value and nothing else:

```css
--color-gray-90: #3E3E46;
--color-brand-75: #3C3ADB;
--space-16: 1rem;
```

**Semantic tokens** are aliases that assign a role to a primitive. They describe intent, not appearance:

```css
--color-text-primary: var(--color-gray-90);
--color-action-primary: var(--color-brand-75);
```

Components reference semantic tokens only. Referencing a primitive in component code is a parity error — it means the component is bypassing the meaning layer and will break if the semantic mapping ever changes. The separation exists so that theming, dark mode, or a rebrand changes only the semantic layer without touching component code.

---

## Naming rules

### Primitive colors

```
--color-{family}-{step}
```

| Family | Steps | Example |
|--------|-------|---------|
| `gray` | 00–100 | `--color-gray-90` |
| `brand` | 05–100 | `--color-brand-75` |
| `red` | 2-5–100 | `--color-red-70` |
| `green` | 2-5–100 | `--color-green-60` |
| `yellow` | 2-5–100 | `--color-yellow-50` |
| `blue` | 2-5–100 | `--color-blue-80` |
| `purple` | 2-5–100 | `--color-purple-40` |

Figma uses commas in some step names (`red-2,5`). Normalize to hyphens in CSS: `--color-red-2-5`.

### Semantic colors

```
--color-{role}-{qualifier}
```

Roles correspond to CSS property types: `text`, `icon`, `surface`, `border`, `action`, `status`, `focus`. Qualifiers describe the specific use within that role:

```css
--color-text-primary
--color-text-danger
--color-action-primary-default
--color-action-primary-hover
--color-status-success-surface
--color-status-success-text
--color-border-subtle
--color-focus-ring
```

### Other tokens

| Category | Pattern | Examples |
|----------|---------|---------|
| Spacing | `--space-{px}` | `--space-4`, `--space-16`, `--space-48` |
| Font size | `--font-{category}-{variant}` | `--font-body-1-regular`, `--font-heading-h2-semibold` |
| Line height | `--line-{category}-{variant}` | `--line-body-1`, `--line-heading-h2` |
| Font weight | `--font-weight-{name}` | `--font-weight-medium`, `--font-weight-semibold` |
| Shadow | `--shadow-{name}` | `--shadow-elevation-1`, `--shadow-elevation-2` |
| Radius | `--radius-{name}` | `--radius-sm`, `--radius-md` |

---

## Source files

Two files must always stay in sync:

**`src/tokens/foundations.ts`**
Typed token data exported as arrays. Used by Storybook stories to render the token catalog — swatches, type specimens, spacing bars. This is the source of truth for the token documentation layer.

**`src/styles/base.css`**
CSS custom properties registered on `:root`. Used by the browser at runtime — components and layout consume tokens from here. This is what makes the tokens real in the running application.

Adding a token to one without the other creates a split: either a token is documented but doesn't work, or it works but isn't documented. Every token addition touches both files.

---

## Token catalog

### Colors — primitive palette

94 tokens across 7 families. Each family runs from near-white to near-black.

| Family | Count | Range |
|--------|-------|-------|
| Gray | 13 | `gray-00` (#FFFFFF) → `gray-100` (#212128) |
| Brand | 12 | `brand-05` (#F9F9FE) → `brand-100` (#030445) |
| Red | 11 | `red-2-5` (#FEFCFC) → `red-100` (#360B08) |
| Green | 12 | `green-2-5` (#F7FCF9) → `green-100` (#0F3A20) |
| Yellow | 12 | `yellow-2-5` (#FFFDFB) → `yellow-100` (#654D17) |
| Blue | 12 | `blue-2-5` (#F6F8FD) → `blue-100` (#091741) |
| Purple | 12 | `purple-2-5` (#FCFBFE) → `purple-100` (#1F143C) |

Status: **Verified** — 3 values differ from the May 2026 parity audit. See `src/tokens/figma-mapping.md`.

### Colors — semantic layer

~75 tokens organized by CSS property role. Each group covers a consistent set of sub-roles.

| Group | Tokens | Sub-roles |
|-------|--------|-----------|
| Text | 14 | strong, primary, secondary, disabled, inverse, link, link-hover, action, danger, success, warning, info, on-solid, on-warning-solid |
| Icon | 9 | primary, secondary, disabled, inverse, action, danger, success, warning, info |
| Surface | 6 | base, subtle, muted, disabled, raised, selected |
| Border | 10 | subtle, default, strong, disabled, selected, danger, focus, info, warning, success |
| Action | 15 | primary (default/hover/pressed/disabled/icon), secondary (default/hover/pressed/text), danger (default/hover/pressed/disabled), on-action (default/disabled) |
| Status | 30 | neutral, info, success, warning, error — each with surface, outline, text, indicator, solid, on-solid |
| Focus | 2 | ring, inner |

Status: **Verified**

### Typography

26 styles. All use Inter at the primitive level; line heights and weights are registered as separate tokens to allow mixing.

| Category | Styles |
|----------|--------|
| Heading | H1–H5, each in Regular / Medium / Semibold |
| Body | Body 1 (Regular / Medium / Semibold), Body 2 (Regular / Underline / Medium / Semibold) |
| Caption | Caption Field, Tooltip |
| Button | Large (16px), Medium (14px), Small (12px) |

Status: **Verified** — Button font weights need approval against Figma spec.

### Spacing

17 steps from 2px to 144px, mapped as `--space-{px}` → rem value.

```
2px · 4px · 8px · 12px · 16px · 20px · 24px · 32px · 40px · 48px · 56px · 64px · 72px · 80px · 96px · 120px · 144px
```

Status: **Verified** — `spc-0` (0px) and `spc-6` (6px) exist in Figma but have no code equivalent.

### Elevation & Shadows

Two levels matching the Figma effect styles:

| Token | Value |
|-------|-------|
| `--shadow-elevation-1` | `0 2px 20px rgba(150, 148, 161, 0.2)` |
| `--shadow-elevation-2` | `1px 5px 10px 2px rgba(91, 91, 100, 0.3)` |

`--shadow-card` is a code-only alias for `--shadow-elevation-1` with no Figma equivalent.

Status: **Verified**

### Radius

Figma exposes 12 radius primitives (`r-0` through `r-64`). Code has 4 semantic aliases with no confirmed Figma mapping.

| Token | Value | Figma equivalent |
|-------|-------|-----------------|
| `--radius-sm` | `0.5rem` (8px) | `Radius/r-8` — approved |
| `--radius-md` | `0.875rem` (14px) | None — no `r-14` in Figma |
| `--radius-lg` | `1.25rem` (20px) | None — no `r-20` in Figma |
| `--radius-pill` | `999px` | `Radius/r-64` — different value, similar intent |

Status: **Not started** — blocked pending Figma radius variable collection being exposed.

---

## Component rules

**Props mirror Figma axes exactly.**
Every Figma property on a component — variant, size, state, only-icon — becomes a Vue prop with the same name and the same set of values. The mapping is documented in `src/tokens/figma-mapping.md` before implementation begins.

**Components consume semantic tokens only.**
A component's scoped CSS references semantic custom properties. If a component needs the primary action color, it uses `var(--color-action-primary)`, not `var(--color-brand-75)`. Direct primitive references in component CSS are a parity error.

**Transfer requires a gate.**
Before a component is implemented, all foundation tokens it depends on must be at **Verified** status. See [WORKFLOW.md](../WORKFLOW.md).

---

## Components

| Component | Figma axes | Status |
|-----------|-----------|--------|
| Button | variant (7), size (3), state (6), only-icon | In Storybook |
