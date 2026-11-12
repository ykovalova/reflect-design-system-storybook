# AI readiness — Radio button (re-run after fixes)

Figma: file `gtJkCVVhc6K0SiYCT2uCae`, page "Radio button", component set `Radio button` (`727:1155`).
Date: 2026-11-02. Result: **16/18 — Ready** (first run: 9/18, Not ready; 15/18 before the Accessibility section was added).

## Evidence

- 20 variants: State (Default, Hover, Focused, Disabled, Error) × Variant (Default, Checked) × Size (Medium 16px, Small 12px), all combinations present
- 3 props: `Show label` (boolean), `Label` (text), plus State, Variant, Size axes
- Fills 50/50 bound · strokes 24/24 bound (all Semantic) · radius 30/30 bound (`r-3/4/6/8`) · gap 10/10 bound (`spc-4`) · text 20/20 styled
- Layers: `Radio clickable area`, `Radio` (ring), `Checked radio`, `Dot`, `Label`, `Focus ring` (4 Focused variants)
- Description: 558 chars · Code Connect: `{}` · no Radio component in the repo
- Spec sheet: States, States for an error field, Properties (Size, Variant, Label), Accessibility (role and grouping, keyboard, focus and target size, label and error; ARIA rules are proposals pending design lead approval); no leftover typos, legacy colour names or non-existent states

## Scores

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Property API | 2 | Clean names; `Variant` Default/Checked maps to a `checked` prop |
| 2 | Layer naming | 2 | Semantic; `Radio` = ring, `Dot` = inner dot |
| 3 | Colour tokens | 2 | 0 raw |
| 4 | Spacing / radius | 2 | All bound |
| 5 | Typography | 2 | 20/20 |
| 6 | Description | 2 | Purpose, radio vs checkbox/select, grouping, states, sizes |
| 7 | Spec & states | 2 | States, error and hover behaviour, sizes, variants documented |
| 8 | Code Connect + parity | 0 | No mapping, no code component |
| 9 | Accessibility | 2 | Group role, keyboard, focus ring, target size and label/error rules stated in the spec sheet |

## Fixes

1. Implement `RadioButton.vue` plus a group component (single value, arrow keys move selection); register Code Connect once the library is published (dev, M).
2. Unify the Error border token: unchecked uses `Border/Action/Danger/Default`, checked uses `Border/Field/Error` (designer, S).
3. Decide whether `Variant` becomes a `checked` boolean in code (dev + designer, S).

## Assumptions Claude would make today

- Radios always live in a group with one value; arrow keys move selection.
- Checked maps to `checked`.
- Error has no message or helper text.
- Focus ring: 2px, +1px gap, `Border/Focus/Ring` (reference Button and Floating button files were not accessible, so the rule comes from the code).

## Not verified

- Spec sheet screenshot against the final text; whether the 30 bound radii changed the look of instances.
- Instances elsewhere in the file after the prop renames.
- Token existence in code, contrast.
