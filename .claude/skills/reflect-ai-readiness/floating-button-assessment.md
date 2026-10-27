# AI readiness — Floating circle button

Figma branch `HnugASjnJEVK0CpIyqj1MI`, page "Floating Button", component set `10733:2181`.
First assessed 2026-10-26: 9 / 18 (Not ready). **Re-assessed after fixes: 14 / 18; after the accessibility section and adding a `shadow 0` effect style: 15 / 18 — Ready.**

## Evidence
- 1 component set, 24 variants = Appearance (Closed / Opened) × Size (Medium 60px, Small 40px) × State (6). All combinations present, no state gaps.
- Properties: Appearance, State, Size only. No icon, text or boolean properties.
- Fills 24 bound / 0 raw; strokes 26 bound / 0 raw; all from `Semantic`.
- Padding/gap 120 bound / 0 raw (`spc-8`, new `spc-10`); radius 28 bound / 0 raw (`r-64`).
- Effects: the 20 non-Focused variants use a new `shadow 0` effect style (`0 1px 1px`, 20% neutral dark, #3D3D45) that reproduces the previous custom shadow; it needs design lead approval and a code token (`--shadow-elevation-0`), since the approved set is `shadow 1` and `shadow 2`. Focused variants have no shadow; the focus ring replaces it.
- Text nodes: 0 (typography not applicable).
- Layers: `Icon` ×20, `Spinner` ×4, `Focus ring` ×4. Focus ring follows the Button rule (2px inside stroke, 3px offset, `Border/Focus/Ring`, `r-64`).
- Description written; spec sheet has a Documentation block (Appearance, States and sizes, Accessibility).
- Opened = the same Add icon rotated -45°, not a separate icon.
- Code Connect: none (`{}`). Code: no component in the repo (only `Button`).

## Scores
| # | Dimension | Before → Now | Why |
|---|---|---|---|
| 1 | Property API | 1 → 1 | No icon swap property (icon hardcoded, Opened relies on a -45° rotation); "(Modal)" in Appearance values is unexplained |
| 2 | Layer naming | 1 → 2 | `Icon`, `Spinner`, `Focus ring` |
| 3 | Colour tokens | 2 → 2 | 0 raw fills/strokes (shadows unbound, see above) |
| 4 | Spacing / radius | 1 → 2 | All padding, gap and radius bound |
| 5 | Typography | 2 → 2 | N/A: no text nodes (13/16 if excluded) |
| 6 | Description | 0 → 2 | Written |
| 7 | Spec & states | 1 → 2 | Appearance, states, sizes documented |
| 8 | Code Connect + parity | 0 → 0 | No mapping, no code component |
| 9 | Accessibility | 1 → 2 | Spec sheet has an Accessibility section: native button role, Tab/Enter/Space, aria-label, focus ring, contrast, disabled/loading |

## Remaining fixes, by impact
1. Implement the component in Vue (new component or a `Button` variant) and add Code Connect once the library is published — dev, M.
2. Get `shadow 0` approved and add it to the code tokens (`--shadow-elevation-0`) — design lead + dev, S.
3. Add an icon swap property and clarify Appearance naming ("(Modal)") — designer, M.

## Assumptions Claude still has to make
Whether this is a new component or a `Button` variant; the icon is a plus rotated by CSS for Opened; none beyond the above.

## Notes
- `Spacing/spc-10` was created independently on this branch and on the Button branch (`E7eUpizBfWjk1JSLTGrsfC`): merge one first, then re-point the other to avoid a duplicate variable.
- The spec sheet is now the `Spec sheet - Buttons` frame on the page (Appearance, States, Sizes, Accessibility); an earlier ad hoc Documentation block was replaced by it.
