# AI readiness — Toggle (re-run after fixes)

Figma: file `jrU0xjV6DChQ4XzlvmQ38O`, page "Toggle", component set `Toggle` (`730:2513`).
Date: 2026-11-03. Result: **15/18 — Ready** (first run: 9/18, Not ready).

## Evidence

- 12 variants: Variant (Default, Recording) × State (Default, Focused, Disabled) × On/Off. No Hover state.
- Props: `Left label` / `Right label` (boolean), `Left label text` / `Right label text` (text), axes `Variant`, `State`, `On/Off`
- Fills 33/33 bound · strokes 13/13 bound · text 24/24 styled · every bound variable is in `Semantic`, 0 raw colours
- Radius: `Track` = 64 bound; `Knob` = 8 and `Focus ring` = 9 not bound. Gap: `Switch` = -16 (knob overlap) and `Knob` = 10 not bound
- Layers: `Label/Left`, `Label/Right`, `Switch`, `Track`, `Knob`, `Focus ring` (4 Focused variants), `Pause icon` with `Pause bar/Left|Right`, `Recording dot`
- Description: 914 chars · Code Connect: `{}` · no Toggle component in the repo
- Spec sheet `Spec sheet - toggle`: States (states that exist; no Hover), Properties (Variant, On/Off, Label; Recording explained), Accessibility (role and state, keyboard, focus and target size, label; ARIA rules are proposals pending design lead approval); no placeholder text
- New token `Background/Action/Control/Unchecked/Active` (brand-40) is bound to the track of the 4 enabled Off variants; it is in the repo (`Color.tokens.json`, generated files, `semantic-token-map.md`, commit `35a9257`) but not yet in the published library

## Scores

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Property API | 2 | Clean names; `On/Off` maps to a `checked` boolean (stated in the description) |
| 2 | Layer naming | 2 | Semantic names: `Switch`, `Track`, `Knob`, `Focus ring`, `Label/Left`, `Label/Right` |
| 3 | Colour tokens | 2 | 0 raw, all `Semantic` |
| 4 | Spacing / radius | 1 | Track radius bound; knob radius, focus ring radius and two gaps not bound |
| 5 | Typography | 2 | 24/24 |
| 6 | Description | 2 | Purpose, toggle vs checkbox/radio, states (no Hover), On/Off, Variant and Recording, labels, accessibility |
| 7 | Spec & states | 2 | States, properties, Recording and focus ring documented; the absence of Hover is stated |
| 8 | Code Connect + parity | 0 | No mapping, no code component |
| 9 | Accessibility | 2 | Role, keyboard, focus ring, target size and label rules stated in the spec sheet |

Scores 1 and 7 are the remaining judgement calls; 2 is now settled by the renames. A strict reading gives 14/18.

## Fixes

1. Implement `Toggle.vue` (props `checked`, `variant`, `disabled`, left/right label); register Code Connect once the library is published (dev, M).
2. Bind or justify the remaining radius and gap values: `Focus ring` 9 (pill, height / 2), `Knob` radius 8, `Switch` overlap gap -16 (designer, S).

## Assumptions Claude would make today

- `On/Off` is `checked`; Recording is used in the screen-recording flow (Reflect records the app screen and click steps); red dot On, pause icon Off.
- No Hover state exists (stated in the description and spec sheet).
- Off track uses `Unchecked/Active` when enabled and `Unchecked/Disabled` when disabled.
- Focus ring: 2px, 1px offset, `Border/Focus/Ring`, around the track (from the code rule and the Radio button).

## Not verified

- Instances of Toggle elsewhere in the file after the prop and layer renames.
- Contrast of the Off track: brand-40 on white is about 1.9:1 by my own calculation, below 3:1.
- Whether the new `Unchecked/Active` token survives the branch merge without duplication.
