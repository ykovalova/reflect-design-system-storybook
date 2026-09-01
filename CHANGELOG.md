# Changelog

Notable changes to the Reflect design-system Storybook.

`LEARNINGS.md` records reasoning and rules learned; this file records what changed.
Entries are dated rather than versioned — the package is private at `0.0.0` with no
releases. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
minus the semver.

## Unreleased

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
