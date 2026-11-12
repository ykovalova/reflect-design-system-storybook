# Changelog

Notable changes to the Reflect design-system Storybook.

`LEARNINGS.md` records reasoning and rules learned; this file records what changed.
Entries are dated rather than versioned — the package is private at `0.0.0` with no
releases. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
minus the semver.

## Unreleased

Branch `Marika-button`.

### Added

- **`Checkbox` component** (`src/components/Checkbox/`) and stories (`Components/Checkbox`: Playground, States,
  WithoutLabel, Interactive) from the Figma Checkbox set (`706:2155`). Native `input type="checkbox"` with
  `v-model` (`modelValue`), `indeterminate` (`aria-checked="mixed"`), `invalid` (`aria-invalid`), `disabled`,
  optional `label` (set `ariaLabel` without one) and a `state` prop (`default`/`hover`/`focused`) for docs.
  Covers all 15 Figma variants (Default, Hover, Focused, Disabled, Error x Unchecked, Checked, Indeterminate)
  using semantic tokens only, including `Background/Action/Control/Unchecked/Hover`. Focus ring: 22px layer,
  2px `--color-border-focus-ring`, 1px gap around the 16px box. Code Connect is not registered yet.

- **`Background/Action/Control/Unchecked/Hover`** (`--color-bg-action-control-unchecked-hover`,
  alias `brand-05`, `#F9F9FE`) — fill of an unchecked checkbox, radio or toggle under the pointer.
  Added to the Figma `Semantic` export, regenerated via `npm run tokens:generate` and listed in
  `semantic-token-map.md`.
- **`FloatingButton` component** (`src/components/FloatingButton/`) and stories — circular icon-only
  action button: `appearance` (closed/opened), `size` (medium 60px / small 40px), `state`, required
  `ariaLabel`, default slot for any icon. Figma-to-Vue mapping in `docs/code-connect-floating-button.md`.
- **`--shadow-elevation-0`** (`0 1px 1px rgba(61, 61, 69, 0.2)`) — code token for the new Figma
  effect style `shadow 0`, which reproduces the resting shadow of the Floating circle button.
  Approved by the design lead; listed in `figma-mapping.md`, `design-system.md` and the
  Elevations story.
- **`scripts/generate-semantic-tokens.mjs`** (`npm run tokens:generate`, `tokens:check`)
  — builds the semantic colour layer from the Figma export
  `src/tokens/figma-export/Color.tokens.json` (113 tokens). Emits
  `src/styles/semantic-colors.generated.css` (imported by `base.css`) and
  `src/tokens/semantic-colors.generated.ts`. CSS names are read from each variable's
  WEB code syntax, not derived. Aliases to a primitive become `var(--color-<family>-<step>)`;
  `Overlay/*` alpha tokens emit literal rgba; `Background/Action/Tertiary/{Hover,Pressed}`
  reference `Overlay/*` and emit `var(--color-overlay-*)`.

### Fixed

- **Badge colours match Figma** (Badge file `06LDpMG8MxDk6XwMBJSGUb`): `Color.tokens.json` was out of sync
  with the `Semantic` collection, so regenerated tokens gave wrong Badge colours. Subtle fills moved
  one step darker (info `blue-30` `#D2DBF7`, success `green-30` `#D6F3E1`, warning `yellow-40`
  `#FFE9B7`, danger `red-30` `#EFCDCB`), `Status/Success/Solid` is `green-80` `#289B56` (was `green-70`),
  and `Text/OnStatus/*` is white (`gray-00`) for neutral, info, success and danger, and `gray-100` for
  warning (was `gray-70` / `blue-90` / `green-90` / `red-90` / `gray-90`; the neutral Bold label was
  the same colour as its fill). Regenerated `semantic-colors.generated.*`; `semantic-token-map.md` updated.

### Changed

- **Button `tertiary-modal` now matches Figma "Tertiary (modals)"** (set `558:3397`): transparent
  default fill (was a violet `rgba(60, 58, 219, 0.08)` wash), hover and pressed use
  `--color-bg-action-tertiary-hover` / `-pressed`, label and icon use `--color-text-on-neutral`
  (was primary), disabled greys the content with `--color-text-disabled` at full opacity (was 0.4
  opacity), radius 4px for every size and icon-only (was circular / 8px), inline padding 12px,
  Body 1/2 Medium type.
- **Button `secondary-danger` and `tertiary-danger` now match Figma** (set `558:3397`): secondary uses
  `bg-action-danger-secondary-*` fills, `border-action-danger-*` borders and `text-status-danger-*`
  text, so hover and pressed now darken the border (was a fixed rgba border and tint); tertiary is a
  boxed button (12px padding, 4px radius) with transparent default and `bg-action-danger-tertiary-hover`
  / `-pressed` fills (was a text link with underline on hover). Disabled uses `bg-action-disabled`,
  `border-action-disabled` and `text-disabled` at full opacity (was 0.48 / 0.4 opacity). Icon-only is
  4px radius, type is Body 1/2 Medium.
- **Button disabled `primary` and `primary-danger` are neutral grey like Figma**: `bg-action-disabled`
  fill, `border-action-disabled` border and `text-disabled` label (was a light brand / grey-15 fill with
  a grey-50 label). This is what the Button / States story shows for `disabled`.
- **Button `secondary` now matches Figma**: white `bg-action-secondary-default` fill, neutral
  `border-action-secondary-default` border and `text-on-neutral` label (was a violet outline and
  primary-coloured label). Hover and pressed also change the border (`-hover` gray-60, `-pressed`
  gray-80), and disabled is the shared grey (`bg-action-disabled`, `border-action-disabled`,
  `text-disabled`, full opacity). Padding 12px, radius 4px (also icon-only), Body 1/2 Medium type.
  Removed the unused code-only `--color-action-secondary-*` tokens.
- **Button focus ring matches Figma for every variant**: 2px `--color-border-focus-ring`, offset 1px
  (3px from the edge), no box-shadow (was a primary outline plus a 4px shadow).
- **Removed** the code-only `--color-action-danger-surface*` / `--color-action-danger-border` tokens
  (`base.css`, `foundations.ts`, `figma-mapping.md`), replaced by the Figma `Semantic` tokens.
- **Removed** the code-only `--color-action-tertiary-modal-*` tokens (`base.css`, `foundations.ts`,
  `figma-mapping.md`); nothing consumes them any more.
- **`Border/Action/Secondary/Hover` gray-70 → gray-60** (matches `Border/Neutral/Hover` in the Floating
  button file). Updated in the Figma export and regenerated tokens (`--color-border-action-secondary-hover`),
  token map and spec. Used by `FloatingButton` (opened); the secondary `Button` still uses the legacy
  rgba border and is unaffected. The alias id in the export entry is the plugin key; a fresh Figma
  export will normalise it.
- **`Action/Secondary/Pressed` background gray-10 → gray-15** (matches `Action/Neutral/Pressed` in the
  Floating button file). Updated in the Figma export, the regenerated semantic tokens
  (`--color-bg-action-secondary-pressed`), legacy `--color-action-secondary-pressed` in `base.css`,
  the token map and spec, and used by `FloatingButton` instead of a raw primitive. Affects the pressed
  state of the secondary `Button`.
- **`Foundations/Colors` stories** — replaced `Semantic — Property-first` and
  `Semantic — Intent-first` with one `Semantic` story rendering the 113 generated
  tokens by group (Background, Border, Text, Icon, Overlay, Brand), with live-variable
  swatches over a checkerboard and Figma usage descriptions. Added `.st-swatch-fill` and
  `.st-desc` styles to `base.css`.
- `docs/design-system.md` — semantic naming, catalog and source-file sections rewritten
  for the property-first structure and the generated pipeline.
- `docs/storybook.md` and `CLAUDE.md` — document the new Colors story and the generator.

### Notes

Additive: the new `--color-bg-*`, `--color-border-*`, `--color-text-*`, `--color-icon-*`,
`--color-overlay-*` variables coexist with the old ones. Nothing is removed or renamed
yet — `foundations.ts` (`fullSemanticColorTokens`, now unused by stories) and `Button.vue` still use the old names.

---

Branch `RF-5866-Refine-hybrid-token-structure`.

### Fixed

- Primitive colour drift corrected against Figma: `red-2,5` (`#FEFCFC` → `#FDFAF9`),
  `red-40` (`#E3A39E` → `#E0A39E`), `blue-2,5` (`#F6F8FD` → `#FBFCFF`). Re-verified
  against the `Primitives` collection on `main` — 87/87 matched.
- `Status/*` surface, indicator and solid steps corrected across all five families.
- Button pressed states no longer use `filter: brightness(0.92)`, which dimmed the
  label and border along with the fill. Primary and danger now use their real
  pressed values.

### Changed

- **Button variants resolve through `Action/*` tokens** instead of reaching for
  primitives (`--color-brand-70`) or raw rgba. ⚠️ `.button-variant-secondary` now
  hovers `--color-action-secondary-hover` (`gray-05`) rather than the
  `rgba(60, 58, 219, 0.08)` violet wash it had shared with `tertiary-modal` — a
  visible difference, not just a rename.
- `Colors — semantic layer` moves from **Verified** to **Superseded** in
  `WORKFLOW.md`. It was verified against a Figma collection deleted 2026-09-01;
  code still carries those names. A **Superseded** status was added to the
  definitions for this case.

### Added

- **`src/tokens/semantic-token-map.md`** — every token in the Figma `Semantic`
  collection (115 across Surface, Action, Text, Icon, Border, Overlay) with its
  primitive alias, resolved value and when to use it, plus the pairing table,
  composite rules, open decisions, and an appendix mapping every current code
  token to its replacement.
- **`docs/semantic-color-spec.html`** — the rationale for the restructure.
- **`.claude/skills/reflect-token-picker/`** — decision path for choosing a token.
- Code-only tokens formalized out of `Button.vue`'s hardcoded values, all flagged
  in `foundations.ts` as needing design approval: `Action/Secondary/Border`,
  `Action/TertiaryModal/*`, `Action/Danger/Surface*` and `Action/Danger/Border`.
- Migration preconditions recorded in `figma-mapping.md`'s open decisions: the
  stored WEB code syntax for camelCase segments, the `Other/Blanket` primitive
  behind `Overlay/Scrim`, and the two token names reused at different values.

### Removed

- `skills/reflect-semantic-color-advisor.md`, which documented the retired
  structure — and with it the root-level `skills/` directory. Skills are only
  discoverable under `.claude/skills/<name>/SKILL.md`, so both files that ever
  lived there were inert.

### Notes

The code layer is **not** migrated: `base.css` and `foundations.ts` still carry the
previous names, and the collection they were audited against no longer exists. Two
names — `Surface/Muted` and `Border/Subtle` — exist in both layers at different
values, so a name-based find-and-replace produces a silently wrong colour. See
`src/tokens/semantic-token-map.md`.
