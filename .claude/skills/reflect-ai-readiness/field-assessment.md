# AI readiness — Field, Text area field, Number field (fourth run)

Figma: file `uzaPNfY5f6TXnQF9LuFLyV`, page "Field". Date: 2026-10-29.

| Component | Node | Run 1 | Run 2 | Run 3 | Run 4 |
|---|---|---|---|---|---|
| Field | `493:10744` | 9 | 11 | 15 | **16/18 — Ready** |
| Text area field | `503:173` | – | – | 15 | **16/18 — Ready** |
| Number field | `658:6953` | – | – | 12 | **15/18 — Ready** |

## Evidence

- **Field**: 14 variants (State × Size) · props `Show left icon`, `Left icon`, `Show right icon`, `Right icon`, `Show label`, `Label`, `Show helper text`, `Helper text`, `Show field text`, `Field text` · text 42/42 styled · own fills 56 bound, 0 raw · strokes 14/14 · radius 14 bound · raw spacing only 1px border (structural, inferred) and one 4px gap · description 716 chars
- **Text area field**: 7 variants · props `Show label`, `Label`, `Show helper text`, `Helper text`, `Show field text`, `Field text`, `Show resize icon` · text 21/21 · fills 35 bound, 0 raw · raw spacing: one 4px gap · description 418 chars
- **Number field**: 7 variants (State only; single-value `Size` axis removed) · props as Field plus `Show arrows` · text 21/21 · fills 28 bound, 0 raw · raw spacing: two 4px gaps · description 441 chars · own spec sheet added (States, Show arrows, Size, Accessibility)
- **Selector subcomponents** (`_Top`, `_Bottom`): padding and gap now bound (`spc-4`, `spc-10`); layer `Polygon 1` still has a default name
- `Rectangle 1` `#ff808c` (28 × in Field) is the Placeholder inside the default icon instance (library), not Field's own layer
- Spec sheets: no leftover typos or placeholders; Accessibility section present in all three
- Code Connect: `{}` · no Field components in repo

## Scores

| # | Dimension | Field | Text area | Number |
|---|---|---|---|---|
| 1 | Property API | 2 | 2 | 2 |
| 2 | Layer naming | 2 | 2 | 1 (`Polygon 1` in Selector subcomponents) |
| 3 | Colour tokens | 2 | 2 | 2 |
| 4 | Spacing / radius | 2 | 2 | 2 |
| 5 | Typography | 2 | 2 | 2 |
| 6 | Description | 2 | 2 | 2 |
| 7 | Spec & states | 2 | 2 | 2 |
| 8 | Code Connect + parity | 0 | 0 | 0 |
| 9 | Accessibility | 2 | 2 | 2 |
| | **Total** | **16** | **16** | **15** |

## Fixes

1. Implement the three components once the API is approved; register Code Connect after the library is published (dev, M/L).
2. Rename `Polygon 1` in `_Top` / `_Bottom` subcomponents (designer, S).
3. Have the design lead approve the ARIA rules in the Accessibility sections; they were proposed, not taken from an existing spec (designer, S).

## Assumptions Claude would make today

- "Show field text" shows or hides the text inside the field; the clear button is the "X" as right icon (interpretation of an unclear spec line).
- `Active` = cursor in field, `Focused` = keyboard focus.

## Not verified

- Instances of these components elsewhere in the file after prop renames and removal of the Number field `Size` axis.
- Contrast values; token existence in code.
- Whether the Accessibility sections stay in the file (they disappeared twice earlier in the session).
