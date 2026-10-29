# AI readiness — Badge (re-run after fixes)

Figma: file `06LDpMG8MxDk6XwMBJSGUb`, page "Badge", component set `Badge` (`939:5114`).
Date: 2026-10-29. Result: **15/18 — Ready** (first run: 8/18; second run 14/18). Code component added on branch `Marika-badge`; contrast measured.

## Evidence

- 10 variants (Status × Variant) · 4 props (`Status dot` boolean, `Label` text, `Status`, `Variant`)
- Fills 28/28 bound · strokes 2/2 bound (all Semantic) · radius 10/10 bound · text 10/10 styled
- Padding/gap: 40 bound (`spc-10`), 20 raw = paddingTop/Bottom 1px (structural, inferred, not changed)
- Layers: `Content`, `Dot`, `Label` (all semantic)
- Description: 673 chars · Code Connect: `{}` · `Badge.vue` added on branch `Marika-badge`

## Scores

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Property API | 2 | Axes and props map 1:1 to `status`, `variant`, `statusDot`, `label`; set named `Badge` |
| 2 | Layer naming | 2 | Only semantic names |
| 3 | Colour tokens | 2 | 0 raw, all Semantic |
| 4 | Spacing / radius | 2 | All bound except 1px structural padding |
| 5 | Typography | 2 | 10/10 styled |
| 6 | Description | 2 | Purpose, when/when-not, variants, a11y |
| 7 | Spec & states | 1 | States, properties, size, behaviour documented; Behaviour (truncation) is a proposal not yet approved |
| 8 | Code Connect + parity | 1 | `Badge.vue` + stories added with props 1:1 to Figma; not mapped (library unpublished) |
| 9 | Accessibility | 1 | Intent written and contrast measured (below), but 3 of 10 variants fail 4.5:1 |

## Measured text contrast (Figma values, 12px Medium)

| Status | Default | Bold |
|---|---|---|
| Neutral | 9.23 | 4.42 (fail) |
| Info | 6.55 | 6.78 |
| Success | 10.79 | 3.55 (fail) |
| Warning | 6.70 | 10.37 |
| Error | 4.45 (fail) | 6.55 |

## Fixes

1. Fix failing contrast: Neutral Bold, Success Bold, Error Default (designer, S) — needs a design decision.
2. Re-export tokens: repo `--color-text-on-status-*` (blue-90, green-90, gray-70…) differ from the white text used in Figma Bold variants, so `Badge.vue` Bold will not match Figma until the export is refreshed (designer, S).
3. Register Code Connect after the library is published (dev, S).
4. Confirm Behaviour (single line, ellipsis) with design lead — skipped on request (designer, S).

## Assumptions Claude would make today

- `Status` is a semantic status, not an interaction state; `error` uses `danger` tokens.
- Neutral dot is a ring (Figma dot has no fill), Padding 1px top/bottom structural, 10px side padding written as `0.625rem` (no spacing token in CSS).
- `role="status"` only when the badge appears dynamically.

## Not verified

- Badge.vue was type-checked (no Badge errors) and the Vite build passes, but it was not rendered in Storybook.
- Other Badge sets on the page; `spc-10` may duplicate across Figma branches at merge.
