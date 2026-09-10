# Changelog

Notable changes to the Reflect design-system Storybook.

`LEARNINGS.md` records reasoning and rules learned; this file records what changed.
Entries are dated rather than versioned — the package is private at `0.0.0` with no
releases. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
minus the semver.

## Unreleased

Branch `RF-6134-Button-component`.

### Added

- **`storybook-vue-library/docs/button-token-audit.md`** — audit of the tokens
  applied to the Button in Figma branch `E7eUpizBfWjk1JSLTGrsfC` (frame `558:3397`,
  all 6 variants × 3 sizes × 6 states, text and icon-only). Records the 46 tokens
  bound, eleven structural gaps, the contrast findings, and the net token diff:
  **+12 added, 9 retired, 8 rebound — net +3 variables**, after which the Button
  touches no primitives.

### Changed (Figma — branch `E7eUpizBfWjk1JSLTGrsfC`)

- **Disabled model applied — universal foreground, fill only where there is a
  face.** Disabled is now one rule for all six Button variants:
  `Background/Action/Disabled` + `Border/Action/Disabled` + `Text/Disabled`;
  ranks with no face at rest keep no fill and no border when disabled.
  Fully-universal disabled (a grey fill and border on tertiary too) was considered
  and rejected: it removes no token, because ghost *rest* states need transparent
  regardless, and it makes a disabled ghost louder than an enabled one.
- **Added `Background/Action/Transparent`** (`rgba(0,0,0,0)`, state-free), serving
  ghost rest *and* ghost disabled. Neutral transparent rather than the previous
  white-at-zero-alpha, so a ghost hover animating to `Overlay/Hover` no longer
  interpolates through white.
- **Deleted `Background/Action/Tertiary/Default` and
  `Background/Action/DangerTertiary/Default`** after a 52-page scan confirmed zero
  remaining consumers. Semantic collection: 114 → 113 variables.
- **52 Button variant nodes rebound** — 16 faced-rank disabled, 9 ghost disabled
  (strokes removed), 27 ghost rest/focused/loading.

- **Icon colour now arrives by context, not by binding** (Button-scoped pilot).
  The glyph sits two `INSTANCE_SWAP` levels below the Button — Button → `Icon `
  wrapper → glyph — and nothing in that chain carried rank or state, so no button
  could tell its icon to be white. New collection **`Icon context`** with modes
  `Default` / `OnSolid` / `Danger` / `Disabled` holds one variable `Icon/Current`
  aliasing `Icon/Regular` / `Icon/OnSolid` / `Icon/Status/Danger` /
  `Icon/Disabled`. Glyphs bind `Icon/Current`; each Button variant sets the mode
  (state wins over rank, so a disabled danger button gets the disabled glyph).
  150 variants moded — 45 Default, 40 OnSolid, 40 Danger, 25 Disabled — and 197
  glyph overrides rebound off `Icon/Placeholder`. A glyph with no mode set
  resolves to `Default`.
  Per-variant fill overrides were rejected: ~150 variants × two slots, repeated
  for every future component, and Figma drops the override when a multi-layer icon
  is swapped in — the pattern that produced the current state.
- **Icon library migrated off the primitive layer.** 203 vectors across
  `Outline icons` and `Extra icons` rebound from `Color/Gray/gray-90` to
  `Icon/Current`. Verified end to end with a real icon instanced under all four
  modes. **Duotone icons (90 vectors) were deliberately excluded**: a duotone
  glyph pairs a `gray-90` primary with a `brand-20` secondary, so migrating only
  the primary would produce a white-on-`brand-20` glyph the first time anything
  set `OnSolid`. They need a paired `Icon/Current Secondary` first, and render
  unchanged until then.
- **`Placeholder` glyph left on `Icon/Placeholder`.** It was briefly moved onto
  `Icon/Current` during the pilot, which made it render as a convincing real icon
  and destroyed the only thing it exists to do — flag an unswapped slot. Reverted.
  Real glyphs take colour from context; the placeholder never does.

- **Naming shape decided: property-first.** Six top-level groups — `Background`,
  `Border`, `Text`, `Icon`, `Overlay`, `Brand/Logo` — where the first segment
  names the property being painted, not its meaning. `Surface` and `Action` are
  no longer top-level: a static ground is `Background/Raised`, a pressable fill
  is `Background/Action/Primary/Default`. Chosen over the documented
  `Surface`/`Action` shape because it keeps a fill and its matching stroke
  parallel (`Background/Action/Primary/Default` + `Border/Action/Primary/Default`)
  instead of special-casing fills. `Overlay/*` stays top-level as a deliberate
  exception — it is the only alpha-carrying family and the group name is a useful
  warning. `Brand/Logo/*` should probably move out of the layer; not yet decided.
- **WEB code syntax set on all 114 semantic variables**, emitting `--color-bg-*`
  rather than the 41-character `--color-background-*`. The Figma name and the CSS
  name are deliberately allowed to differ. This settles "Verify before migrating"
  item 1 in `semantic-token-map.md`: `OnSolid`, `OnStatus`, `OnNeutral` and
  `DangerSecondary` are now stored explicitly kebab-cased
  (`--color-text-on-solid-default`) rather than derived. Read
  `variable.codeSyntax.WEB`, don't transform the name.

- **Three docs regenerated from the Figma file**, against the property-first
  shape: `src/tokens/semantic-token-map.md`, `docs/semantic-color-spec.html` and
  the `reflect-token-picker` skill. Names, aliases, values, CSS names and usage
  text were read from the variables rather than transcribed, and each file
  carries the script to re-pull it. All three previously described `Surface/*`
  and `Action/*` as top-level groups, which no longer exist — anyone following
  them reached for tokens that were not in the file. **This unblocks
  `$component-transfer-gate` on the documentation side.**
- **51 Figma variable descriptions corrected.** They still cross-referenced the
  retired names — "Pair with `Surface/Disabled`", "makes `Action/Neutral` read as
  a button", "gives `Action/DangerGhost` its shape" — so regenerating the docs
  would have propagated them. Also rewritten where the text was wrong rather than
  merely renamed: `Background/Action/Disabled` and `Border/Action/Disabled` now
  describe the agreed disabled rule, the three `DangerSecondary/*` and
  `Text/OnSolid/Disabled` are marked pending retirement, and `Icon/Placeholder`
  and `Brand/Logo/*` have descriptions for the first time.
- **`figma-mapping.md`'s superseded notice updated** to point at branch
  `E7eUpizBfWjk1JSLTGrsfC` and both current collections. It previously described
  the unmerged `qR9kXKSyZJ2Z0XivlTcejZ` structure as current.

### Fixed (Figma)

- **Seven Button variants were bound to orphaned variables.**
  `Background/Action/Secondary/Disabled`, `Background/Action/Tertiary/Disabled`
  and `Border/Action/Danger/Disabled` are absent from the Semantic collection and
  the Variables panel, but still resolved by id and still rendered — deleted
  during the 2026-09-01 rebuild while node bindings kept pointing at them. All
  seven now reference live tokens. This was invisible in the Figma UI and would
  have transferred as a hardcoded value.
- **Primary Danger / Disabled's edge** was bound to `Background/Action/Disabled` —
  a `FRAME_FILL`-scoped fill token applied to a stroke, rendering `gray-15` on
  `gray-15` so the button had no visible edge. Now `Border/Action/Disabled`.

### Notes

Code-side unchanged — nothing in `base.css` or `foundations.ts` moves here.

Inspection contradicted six of the audit's original proposals, and the document
records the corrections: `Overlay/{Hover,Pressed}`, `Border/Focus/{Ring,Inner}`,
`Icon/OnSolid` and `Icon/Disabled` all already exist — the audit had been written
against `semantic-token-map.md`, which describes a collection that no longer
matches the file.

Icons now resolve correctly end to end for Outline and Extra sets. Duotone is the
one remaining primitive consumer in the icon library, held until its secondary
layer is tokenised.

The Button transfer stays blocked, principally on the naming-shape decision: the
Button uses a property-first shape (`Background`/`Border`/`Text`/`Icon` × role ×
rank × state) that none of `semantic-token-map.md`,
`docs/semantic-color-spec.html` or the `reflect-token-picker` skill describes.

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
