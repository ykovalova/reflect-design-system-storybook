# AI readiness — Checkbox (re-run after fixes)

Figma: file `YGamEmPcm2I5noVFXwOf6H`, page "Checkbox", component set `Checkbox` (`706:2155`).
Date: 2026-11-04. Result: **16/18 — Ready** (first run: 11/18, Ready with fixes).

## Evidence

- 15 variants: State (Default, Hover, Focused, Disabled, Error) × Variant (Unchecked, Checked, Indeterminate), all combinations present, all 59×24
- Props: `Label` (boolean), `Label text` (text), axes `State` and `Variant`
- Fills 25/25 bound · strokes 8/8 bound · text 15/15 styled · radius 18/18 bound (Box `r-2`, Focus ring `r-5`) · gap 15/15 bound · every bound variable is in `Semantic`, 0 raw paints
- One construction in every variant: `Checkbox clickable area` → (`Focus ring` in Focused) → `Box` → `Checkmark` (Checked) or `Dash` (Indeterminate); glyph fill `Icon/OnSolid`, box fill is the state token
- Box fills: Unchecked `Unchecked/Default|Hover|Disabled`, Checked and Indeterminate `Checked/Default|Hover|Disabled`, Error `Action/Danger/Default`; Unchecked border `Border/Field/*`
- Description: 889 chars · Code Connect: `{}` · no Checkbox component in the repo
- Spec sheet `Spec sheet - checkbox`: States (the five that exist), Properties (Variant, Label), Accessibility (role and state, keyboard, focus and target size, label and error; ARIA rules are proposals pending design lead approval); no placeholder text

## Scores

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Property API | 2 | Clean names; Unchecked/Checked/Indeterminate map to `checked` and `indeterminate`, Error to an invalid prop |
| 2 | Layer naming | 2 | `Checkbox clickable area`, `Box`, `Checkmark`, `Dash`, `Focus ring`, `Label` |
| 3 | Colour tokens | 2 | 33/33 bound, 0 raw, all `Semantic`, no wrong-category tokens |
| 4 | Spacing / radius | 2 | Radius 18/18 and gap 15/15 bound |
| 5 | Typography | 2 | 15/15 |
| 6 | Description | 2 | Purpose, checkbox vs toggle/radio, states, variants, error, label, accessibility |
| 7 | Spec & states | 2 | Five states and three variants documented, no placeholder text |
| 8 | Code Connect + parity | 0 | No mapping, no code component |
| 9 | Accessibility | 2 | Role, mixed state, keyboard, focus ring, target size, label and error rules in the spec sheet |

## Fixes

1. Implement `Checkbox.vue` (props `checked`, `indeterminate`, `invalid`, `disabled`, label); register Code Connect once the library is published (dev, M).

## Assumptions Claude would make today

- Indeterminate is a visual state independent of `checked`; a click on an indeterminate checkbox makes it checked.
- Error maps to an `invalid` prop and `aria-invalid`.
- Glyph colour is `Icon/OnSolid`; Error box uses `Action/Danger/Default`.
- Focus ring: 2px, 1px offset, `Border/Focus/Ring`, around the box.

## Not verified

- The 11 Checkbox instances on the page after the variant renames; only the preview labels in Properties were updated.
- Contrast of `Unchecked/Hover` (brand-05) against white; the border carries the edge.
- `Unchecked/Hover` is in the repo only on branch `Marika-checkbox` and not yet in the published library.
