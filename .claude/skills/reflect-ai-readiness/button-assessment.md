# AI readiness — Button (worked example)

Figma branch `E7eUpizBfWjk1JSLTGrsfC`, page node `558:1528`, component set `558:3397`.
First assessed 2026-10-14 (8/18). **Re-assessed 2026-10-16 after fixes: 13 / 18. Updated later the same day after spacing + spec sheet work: 15 / 18, then 16 / 18 after the focus ring rule, 17 / 18 after property renames — Ready.**

## Evidence (re-audit)
- 1 component set, 150 variants covering 25 variant×size×icon combinations, each with all 6 states (no gaps).
- Props: Variant (6), Size (3), State (6), Only icon (True/False — shown as a toggle, matches code `onlyIcon`), Button text, Left/Right icon booleans, 3 icon INSTANCE_SWAPs.
- Counted on Button's own nodes only (nested `Icon` instances belong to the shared Icon component and are excluded):
  - Fills: 210 bound, 0 raw. Strokes: 120 bound, 0 raw. All variables are from the `Semantic` collection.
  - Padding/gap: all bound (added `Spacing/spc-10` to Primitives; 6px values bound to `spc-6`).
  - Radius: all bound. Focus rings follow one rule: 3px offset on every side, radius = button radius + 3 (`Radius/r-7` added for r-4 buttons; circular icon buttons use r-64).
  - Text: 60 of 60 use a text style.
- Layers: all semantic — `Label`, `Icon/Leading`, `Icon/Trailing`, `Icon`, `Focus ring`.
- Set description written (purpose, variants, sizes, states, aria-label rule, content, layers).
- Code Connect: no mapping (not re-checked). Code `Button.vue` mirrors the axes.

## Scores
| # | Dimension | Before → Now | Why |
|---|---|---|---|
| 1 | Property API | 1 → 2 | `Tetriary` typo fixed; property names cleaned (`Show left icon`, `Left icon`, `Show right icon`, `Right icon`, `Icon`); plain Tertiary lives as a separate component, `Tertiary (modals)` stays |
| 2 | Layer naming | 0 → 2 | All layers semantic |
| 3 | Colour tokens | 1 → 2 | 0 raw fills/strokes on Button's own nodes (earlier count wrongly included hidden fills inside icon instances) |
| 4 | Spacing / radius | 1 → 2 | Padding and radius all bound; all 25 focus rings use the 3px-offset rule |
| 5 | Typography | 1 → 2 | 60/60 styled |
| 6 | Description | 0 → 2 | Written |
| 7 | Spec & states | 1 → 2 | All states present; placeholder text replaced, typo fixed, typography annotations corrected |
| 8 | Code Connect + parity | 1 → 1 | No mapping; parity good except plain Tertiary |
| 9 | Accessibility | 1 → 2 | Spec sheet has an Accessibility section (keyboard/focus, icon-only aria-label + target size, contrast) |

## Decisions and notes
- Plain Tertiary (separate `Tertiary Button (app)` component) and `Tertiary (modals)` both stay.
- Label typography: Primary variants use Button/Medium|Small (Semibold); Secondary and Tertiary variants use Body 1|2 Medium, as the spec annotation says. An earlier pass wrongly applied Semibold to Secondary Danger and both Tertiary variants; reverted.

## Remaining fixes, by impact
1. Add Code Connect mapping once names are stable — dev, S.

## Assumptions Claude still has to make
Whether code `tertiary` corresponds to the separate Tertiary (app) component.
