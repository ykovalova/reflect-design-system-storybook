# Transfer Workflow

Two tracks cover the full transfer from Figma to code. Foundations must reach **Verified** before a component that depends on them can enter the components track.

---

## Foundations track

### Steps

**1. In Figma**
The variable or style exists in the Figma file. This is the starting state — nothing has been checked or mapped yet.

**2. Parity checked**
Run `$figma-tokens-to-storybook`. This reads the Figma file and compares values against the current code. The output shows matches, mismatches, and tokens that exist in Figma but not in code. Record findings in `src/tokens/figma-mapping.md`.

**3. Mapping decided**
Agree on how each Figma variable path maps to a CSS custom property name. This is a deliberate decision, not automatic. Document the agreed mapping and flag anything unresolved — missing tokens, ambiguous aliases, values that need a design decision before code can proceed. Figma uses commas in some names (`red-2,5`); normalize these to hyphens in CSS (`--color-red-2-5`).

**4. Transferred**
Add the token to both `src/tokens/foundations.ts` (typed data for Storybook stories) and `src/styles/base.css` (CSS custom property on `:root`). Both files must be updated together — they are two representations of the same token.

**5. Verified**
Explicitly confirm that the code value matches the Figma value. Even after Transfer, verification is a separate conscious step — particularly when the mapping decision involved any interpretation or when Figma had known discrepancies at the time of transfer.

**6. In Storybook**
The token appears in a foundation story and is visible in the Storybook catalog.

---

## Components track

A component cannot enter this track until all its required foundation tokens are **Verified**. This is the gate that prevents building a component on unconfirmed values.

### Steps

**1. In Figma**
The component spec exists with defined variants, sizes, and states.

**2. Gate passed**
Run `$figma-tokens-to-storybook` and confirm every token the component references is at **Verified** status. If any required token is at a lower status, resolve it in the foundations track first.

**3. Props mapped**
Map Figma's component properties to Vue props. Every Figma axis — variant, size, state, only-icon — becomes a Vue prop with the same name and value set. Document the mapping in `src/tokens/figma-mapping.md` under Stage fill-ins before writing any component code.

**4. Implemented**
Build the Vue component in `src/components/`. The component's scoped CSS must reference semantic tokens only — never primitive tokens directly. For example, `var(--color-action-primary)`, not `var(--color-brand-75)`.

**5. Documented**
Add Storybook stories in the standard pattern: `Playground`, `VariantMatrix`, `States`, and named examples for notable configurations. See `docs/storybook.md` for the full pattern.

**6. Verified**
Review the implemented component against the Figma spec. Check that each variant, size, state, spacing, and color matches the design. Flag any discrepancies in `src/tokens/figma-mapping.md`.

---

## Statuses

Statuses describe where a token group or component sits in its track. Assign the highest status that has been explicitly completed — not the step currently in progress.

| Status | Meaning |
|--------|---------|
| **Not started** | Not in code yet |
| **Transferred** | In code, but not yet explicitly verified against Figma |
| **Verified** | Confirmed match with Figma — values, naming, and mapping all checked |
| **In Storybook** | Fully documented and visible in Storybook |

A token group moves from **Transferred** to **Verified** only after an explicit parity check, not automatically at the point of transfer. Some groups may sit at **Transferred** when there are known gaps or value discrepancies that haven't been resolved yet.

---

## Current state

### Token groups

| Group | Status | Notes |
|-------|--------|-------|
| Colors — primitive palette | Verified | 3 values differ from latest Figma audit — see `figma-mapping.md` |
| Colors — semantic layer | Verified | |
| Typography | Verified | Button font weights need approval |
| Spacing | Verified | `spc-0` and `spc-6` missing in code |
| Elevation & Shadows | Verified | |
| Radius | Not started | Figma exposes 12 radius values; code has 4 semantic aliases only |

### Components

| Component | Status | Notes |
|-----------|--------|-------|
| Button | In Storybook | 7 variants, 3 sizes, 6 states |
