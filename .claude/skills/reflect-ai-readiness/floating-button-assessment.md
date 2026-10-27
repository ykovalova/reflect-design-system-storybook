# AI readiness — Floating circle button

Figma branch `HnugASjnJEVK0CpIyqj1MI`, page "Floating Button", component set `10733:2181`.
First assessed 2026-10-26: 9 / 18 (Not ready). **Re-assessed after fixes: 14 / 18; after the accessibility section and adding a `shadow 0` effect style: 15 / 18; after the Icon swap property, Appearance rename and the Vue component: 17 / 18 — Ready. — Ready.**

## Evidence
- 1 component set, 24 variants = Appearance (Closed / Opened) × Size (Medium 60px, Small 40px) × State (6). All combinations present, no state gaps.
- Properties: Icon (instance swap, default Add), Appearance (Closed / Opened), State, Size. The "(Modal)" suffix was dropped from Appearance values.
- Fills 24 bound / 0 raw; strokes 26 bound / 0 raw; all from `Semantic`.
- Padding/gap 120 bound / 0 raw (`spc-8`, new `spc-10`); radius 28 bound / 0 raw (`r-64`).
- Effects: the 20 non-Focused variants use a new `shadow 0` effect style (`0 1px 1px`, 20% neutral dark, #3D3D45) that reproduces the previous custom shadow; it is approved by the design lead and has a code token (`--shadow-elevation-0`). Focused variants have no shadow; the focus ring replaces it.
- Text nodes: 0 (typography not applicable).
- Layers: `Icon` ×20, `Spinner` ×4, `Focus ring` ×4. Focus ring follows the Button rule (2px inside stroke, 3px offset, `Border/Focus/Ring`, `r-64`).
- Description written; spec sheet has a Documentation block (Appearance, States and sizes, Accessibility).
- Opened = the same Add icon rotated -45°, not a separate icon.
- Code Connect: none (`{}`); the set is on an unpublished branch, so registration has to wait for publishing. Code: `FloatingButton.vue` with stories and `docs/code-connect-floating-button.md` (prop and token mapping).

## Scores
| # | Dimension | Before → Now | Why |
|---|---|---|---|
| 1 | Property API | 1 → 2 | Icon swap property added; Appearance values are Closed / Opened and match the `appearance` prop |
| 2 | Layer naming | 1 → 2 | `Icon`, `Spinner`, `Focus ring` |
| 3 | Colour tokens | 2 → 2 | 0 raw fills/strokes (shadows unbound, see above) |
| 4 | Spacing / radius | 1 → 2 | All padding, gap and radius bound |
| 5 | Typography | 2 → 2 | N/A: no text nodes (13/16 if excluded) |
| 6 | Description | 0 → 2 | Written |
| 7 | Spec & states | 1 → 2 | Appearance, states, sizes documented |
| 8 | Code Connect + parity | 0 → 1 | Vue component with matching props and a written mapping; not registered in Figma (unpublished branch) |
| 9 | Accessibility | 1 → 2 | Spec sheet has an Accessibility section: native button role, Tab/Enter/Space, aria-label, focus ring, contrast, disabled/loading |

## Remaining fixes, by impact
1. Register Code Connect once the library is published, using `docs/code-connect-floating-button.md` — dev, S.
2. Decide whether Neutral pressed (gray-15) and Neutral pressed border (gray-70) should become semantic tokens; code uses the primitives for now.

## Assumptions Claude still has to make
None blocking. The component is separate from `Button` by decision; Opened rotates the icon by CSS.

## Notes
- `Spacing/spc-10` was created independently on this branch and on the Button branch (`E7eUpizBfWjk1JSLTGrsfC`): merge one first, then re-point the other to avoid a duplicate variable.
- The spec sheet is now the `Spec sheet - Buttons` frame on the page (Appearance, States, Sizes, Accessibility); an earlier ad hoc Documentation block was replaced by it.
