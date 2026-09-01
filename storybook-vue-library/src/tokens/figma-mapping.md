# Figma ↔ Code Parity

This is the living audit trail between the Reflect Design System Figma file and the Storybook codebase. It records agreed mappings, naming decisions, and unresolved gaps. Update it after every parity pass or component transfer.

---

## Naming contract

How Figma variable paths translate to CSS custom property names:

| Figma | Code | Notes |
|-------|------|-------|
| `Color/Gray/gray-90` | `--color-gray-90` | Path segments stripped; family and step preserved |
| `Color/Brand/brand-75` | `--color-brand-75` | |
| `Color/Red/red-2,5` | `--color-red-2-5` | Comma normalized to hyphen |
| `Spacing/spc-16` | `--space-16` | `spc-` prefix dropped; `space-` used instead |
| `Typography/Heading/H1/Regular` | `--font-heading-h1-regular` | Full path collapsed; weight variant appended |
| `shadow 1` | `--shadow-elevation-1` | Renamed to reflect intent |
| `Radius/r-8` | `--radius-sm` | Radius uses semantic names, not step numbers |

---

## Last audit

> **⚠️ Superseded on the Figma side (2026-09-01).** Everything recorded below audits the semantic collection in branch `BT833nDww47dQ17CA5FTFg`. That structure no longer exists: branch `qR9kXKSyZJ2Z0XivlTcejZ` now holds a single `Semantic` collection of 115 variables with a different shape (`Surface` / `Action` / `Text` / `Icon` / `Border` / `Overlay`; text and icon split; no `Status/*` or `Text+icon/*` groups). See **`semantic-token-map.md`** (beside this file) for the token-by-token alias table and the old→new migration map — that is the document a fresh parity pass should be run against. `docs/semantic-color-spec.html` carries the rationale; the `reflect-token-picker` skill covers which token to use where. **The primitive audit below is still valid** — primitives were untouched. The semantic sections are historical until a fresh parity pass runs against the new collection.


- **Date:** 2026-08-13
- **Figma file:** Reflect Design System — branch `BT833nDww47dQ17CA5FTFg`
- **Source:** Variables panel, fetched via Figma Plugin API (`use_figma`) rather than a single node — `Globals` collection (122 variables) and `Semantic` collection (91 variables), both `Mode 1`
- **Scope:** Semantic color layer only (91 Figma vars vs. 86 code semantic color tokens). Primitives/spacing/radius/typography/shadows not re-walked this pass except to resolve semantic aliases down to a hex value.
- **Code sources checked:** `src/tokens/foundations.ts` · `src/styles/base.css`
- **Result:** 68 matched · 13 mismatched · 10 missing in code · 5 missing in Figma · Gate: **FAIL**
- **Remediation (applied on branch `RF-5866-Refine-hybrid-token-structure`):** all 13 value mismatches and all 3 primitive drifts corrected in code to match Figma, per the authority decision below. Post-fix standing: **0 mismatched · 10 missing in code · 5 missing in Figma**. Gate remains **FAIL** — now solely on the 10 missing-in-code items in the Verified `Colors — semantic layer` and `Spacing` groups (`Focus/Blanket`, 8 × `Action/Floating Circle/*`, `spc-0`/`spc-6`), not on any value disagreement. Re-run `$figma-token-parity` against Figma to re-confirm before changing the gate.
- **Primitive re-verification (2026-08-31, against `main`):** all 87 primitive color variables in the `main` file's `Primitives` collection (fileKey `woufGKvr8TuTuce9DQRdQe`, 121 vars, `Mode 1`) compared against `base.css` — **87 matched · 0 mismatched · 0 missing**. This independently confirms the three primitive corrections above. `red-05` (`#FEFCFC`) and `blue-05` (`#F6F8FD`) were checked explicitly and are **already correct in code — no change needed**; the former duplicate-value collision with `red-2,5`/`blue-2,5` was caused by the `2,5` steps holding the `05` values, and is resolved by correcting the `2,5` steps alone.
- **⚠️ `main` vs. audited branch:** `main` exposes a single `Primitives` collection and **no `Semantic` collection**. The 2026-08-13 audit was run against branch `BT833nDww47dQ17CA5FTFg` (`Globals` 122 + `Semantic` 91), which is **not merged to `main`**. So the 13 semantic `Status/*` corrections rest on an unmerged branch and cannot currently be verified against `main`. `main` also still uses the old `red-2,5` naming — the `2,5` → `02` rename is branch-only. Confirm the branch is the intended source of truth before relying on the semantic layer.

**Note:** This is the first audit where Figma exposes a dedicated `Semantic` collection — the "no local semantic variable collection" gap recorded in the 2026-05-07 audit is resolved on the Figma side. The naming contract below (`Color/{Role}/{Qualifier}` → `--color-{role}-{qualifier}`) held for every variable in this collection.

**Authority decision recorded at this audit:** Figma is authoritative for color values. Where Figma and code disagree, code is updated to match Figma. This applies to values only — Figma variable structure, naming, and modes remain in progress on the design side.

---

## Stage 1 — Foundations

### Colors — primitive palette

All 7 families transferred and approved. Comma-in-step names normalized to hyphens throughout.

| Figma group | Code prefix | Status | Notes |
|-------------|-------------|--------|-------|
| `Color/Gray/*` | `--color-gray-*` | Approved | 13 steps, exact match |
| `Color/Brand/*` | `--color-brand-*` | Approved | 12 steps, exact match |
| `Color/Red/*` | `--color-red-*` | Approved | `red-2,5` and `red-40` corrected to Figma values on branch `RF-5866` |
| `Color/Green/*` | `--color-green-*` | Approved | 12 steps, exact match |
| `Color/Yellow/*` | `--color-yellow-*` | Approved | 12 steps, exact match |
| `Color/Blue/*` | `--color-blue-*` | Approved | `blue-2,5` corrected to Figma value on branch `RF-5866` |
| `Color/Purple/*` | `--color-purple-*` | Approved | 12 steps, exact match |
| `Color/Other/Blanket` | — | Missing in code | `rgba(91, 91, 100, 0.5)` — no code equivalent yet |
| `Product Accents/Brand/Brand 1` | `--color-accent-strong` | Needs approval | External SmartBear style; mapping deferred until Figma exposes local variable |
| `Product Accents/Brand/Brand 2` | `--color-accent-soft` | Needs approval | External SmartBear style; mapping deferred |

### Colors — semantic layer

As of the 2026-08-13 audit, Figma exposes a `Semantic` variable collection (91 variables, `Mode 1`) in branch `BT833nDww47dQ17CA5FTFg`. Figma's semantic variables alias other Figma variables (primitives in `Globals`, or other `Semantic` entries like `Text/*`) rather than resolving straight to a primitive — code often aliases the primitive directly instead. This is a structural difference, not a value mismatch, wherever the final resolved hex agrees; only flagged below where it doesn't.

| Code token group | Maps to | Status |
|-----------------|---------|--------|
| `--color-text-*` (14 tokens) | Gray and Brand primitives | **Approved** — 14/14 match `Color/Text/*` |
| `--color-icon-*` (9 tokens) | Aliases Text counterparts | **Approved** — 9/9 match `Color/Icon/*` (Figma also aliases `Text/*`, not primitives directly — same resolved value both sides) |
| `--color-surface-*` (6 tokens) | Gray and Brand primitives | **Approved** — 6/6 match `Color/Surface/*` |
| `--color-border-*` (10 tokens) | Gray, Brand, Red, Blue, Yellow, Green primitives, `Color/Focus` | **Approved** — 10/10 match `Color/Border/*`, including the `Disbabled` typo on both sides |
| `--color-action-*` (15 tokens) | Brand, Red, Gray primitives | **Approved with gaps** — 15/15 existing tokens match `Color/Action/*`; Figma adds an 8-token `Floating Circle` subgroup (Closed/Opened × Default/Hover/Icon/Pressed) with no code counterpart. See open decisions. |
| `--color-status-*` (30 tokens) | Gray, Blue, Green, Yellow, Red primitives | **Approved with gaps** — `text`/`on-solid` matched at audit; the 13 `surface`/`indicator`/`solid` mismatches across all 5 families are now **corrected in code** to the Figma steps. Code's `outline` sub-role (5 tokens) still has no Figma counterpart in the new collection. See open decisions. |
| `--color-focus-ring` | `#0066FF` | **Approved** — matches Figma `Border/Focus` and `Focus/Ring`, both now aliasing primitive `Color/Focus` (`#0066ff`) |
| `--color-focus-inner` | `--color-gray-00` | **Approved** — matches Figma `Focus/Inner` |
| — | `Color/Focus/Blanket` → `rgba(91,91,100,0.5)` | **Missing in code** — resolves the old `Color/Other/Blanket` open decision now that Figma names it formally. See open decisions. |

### Spacing

| Figma | Code | Status |
|-------|------|--------|
| `Spacing/spc-2` → `spc-144` (17 steps) | `--space-2` → `--space-144` | Approved — exact px/rem match |
| `Spacing/spc-0` | — | Missing in code |
| `Spacing/spc-6` | — | Missing in code |

### Radius

Figma exposes 12 radius primitives. Code has 4 semantic aliases. Only `r-8` has a confirmed mapping.

| Figma | Code | Status |
|-------|------|--------|
| `Radius/r-8` | `--radius-sm` (0.5rem) | Approved |
| `Radius/r-64` | `--radius-pill` (999px) | Needs approval — similar intent, different value |
| `Radius/r-0, r-2, r-3, r-4, r-5, r-6` | — | Missing in code |
| `Radius/r-12, r-16, r-24, r-32, r-48` | — | Missing in code |
| — | `--radius-md` (0.875rem / 14px) | Missing in Figma — no `r-14` variable |
| — | `--radius-lg` (1.25rem / 20px) | Missing in Figma — no `r-20` variable |

### Typography

| Figma group | Code tokens | Status |
|-------------|-------------|--------|
| `Typography/Heading/H1–H5` (×3 weights each) | `--font-heading-h*-{weight}`, `--line-heading-h*` | Approved |
| `Typography/Body/Body 1` (×3 weights) | `--font-body-1-{weight}`, `--line-body-1` | Approved |
| `Typography/Body/Body 2` (×3 weights + underline) | `--font-body-2-{weight}`, `--line-body-2` | Approved |
| `Typography/Caption/Caption field` | `--font-caption-field`, `--line-caption-field` | Approved |
| `Typography/Tooltip/Tooltip` | `--font-tooltip`, `--line-tooltip` | Approved |
| `Typography/Button/Large` | `--font-button-large`, `--line-button-large` | Needs approval — Figma is Semibold 16/16; code is weight 500, line-height 24px |
| `Typography/Button/Medium` | `--font-button-medium`, `--line-button-medium` | Needs approval — Figma is Semibold 14/16; code is weight 500 |
| `Typography/Button/Small` | `--font-button-small`, `--line-button-small` | Needs approval — Figma is Semibold 12/16; code is weight 500 |

### Shadows

| Figma | Code | Status |
|-------|------|--------|
| `shadow 1` | `--shadow-elevation-1` — `0 2px 20px rgba(150, 148, 161, 0.2)` | Approved |
| `shadow 2` | `--shadow-elevation-2` — `1px 5px 10px 2px rgba(91, 91, 100, 0.3)` | Approved |
| `Focus state` (effect) | `--color-focus-ring` + component focus shadow | Needs approval — Figma uses two rings (3px `#0066FF` + 1px white); code uses a single 4px focus shadow |
| — | `--shadow-card` | Missing in Figma — code alias for `--shadow-elevation-1` |

---

## Stage 2 — Button

### Token binding fix (2026-08-13)

`Button.vue` previously referenced several custom properties that don't exist anywhere in `base.css` (`--color-action-primary`, `--color-surface-primary`, `--color-action-danger`, `--color-action-danger-surface`) — meaning `background`/`color` silently fell back to their initial value (transparent/inherited) wherever those were used. It also leaked a raw primitive on primary hover (`--color-brand-70`), hardcoded a hex literal on danger hover (`#6c160f` — which, on inspection, was actually the *pressed* value, `Red/90`, misapplied to hover while pressed itself used a `filter: brightness(0.92)` hack instead of a real token), and used unnamed `rgba()` literals for several outline/tint treatments.

Rewired to consume the verified `Action/{Primary,Danger,Secondary}/{Default,Hover,Pressed,Disabled}` and `Action/OnAction/{Default,Disabled}` tokens confirmed matching Figma in the 2026-08-13 audit. Values not covered by any existing token (the `secondary`/`secondary-danger` outline colors, and the `tertiary-modal` tint) were extracted from their previous hardcoded literals into new named tokens — see open decisions below; no visual value was changed for those, only named.

**Visual changes from this fix** (not just renames):
- `secondary` hover/pressed background changes from a translucent brand tint (`rgba(60,58,219,…)`) to the actual `Action/Secondary/Hover`/`Pressed` tokens (Gray/05 → Gray/10) — this token existed and matched Figma, but the component wasn't using it.
- `primary-danger` hover is now the correct `Red/80` instead of the previously misapplied `Red/90` (pressed value); pressed is now the correct `Red/90` via a real token instead of a `brightness()` filter.
- `primary`/`primary-danger` disabled state now swaps to the dedicated disabled color tokens (`Action/Primary/Disabled` = Brand/50, `Action/Danger/Disabled` = Gray/15 per Figma — danger disables to neutral gray, not a muted red) instead of only fading opacity. `secondary`/`secondary-danger`/`tertiary*` still use opacity-fade since no disabled color token exists for those.

### Prop mappings

| Figma property | Vue prop | Values |
|----------------|----------|--------|
| `Variant=Primary` | `variant="primary"` | Filled action button |
| `Variant=Secondary` | `variant="secondary"` | Outlined/subtle |
| `Variant=Tertiary` | `variant="tertiary"` | Text-style |
| `Variant=Tetriary (modals)` | `variant="tertiary-modal"` | Modal-specific tint treatment |
| `Variant=Primary Danger` | `variant="primary-danger"` | |
| `Variant=Secondary Danger` | `variant="secondary-danger"` | |
| `Variant=Tetriary Danger` | `variant="tertiary-danger"` | Note: Figma spells "Tertiary" as "Tetriary" |
| `Size=Medium` | `size="medium"` | 40px height |
| `Size=Small` | `size="small"` | 32px height |
| `Size=Extra small` | `size="extra-small"` | Supported for icon-only modal tertiary only |
| `State=Default/Hover/Pressed/Focused/Disabled/Loading` | `state` prop | Figma visual states exposed directly |
| `Only icon=True/False` | `onlyIcon` | Controls circle vs labeled rendering |
| Icon presence | `icon`, `iconPosition` | Added to support icon-bearing Figma examples; not a named Figma property |

---

## Open decisions

Items that are unresolved and may block future transfers. Resolve before the next component that depends on these tokens.

| Item | Current code value | Figma value | Action needed |
|------|--------------------|-------------|---------------|
| `Status/*/Outline` (5 tokens, all families) | `--color-status-{family}-outline` exists in code | No counterpart in Figma `Semantic` collection | Ask design: dropped intentionally, or not yet ported? Do not remove from code until answered |
| `Color/Focus/Blanket` | — | `rgba(91, 91, 100, 0.5)` (Gray/80 @ 50%) | Formalizes the old `Color/Other/Blanket` entry — add `--color-focus-blanket` (or `--color-blanket`) before implementing overlays or modals |
| `Color/Action/Floating Circle/*` (8 tokens: Closed/Opened × Default/Hover/Icon/Pressed) | — | Brand/75/80/90, Gray/00/20/40/50 | New subgroup, no FAB component in code yet — add when a Floating Action Button component is transferred |
| `Action/Secondary/Pressed 2` | — | Duplicate of `Action/Secondary/Pressed`, same value | Design-side data-quality issue — flag to design, no code action |
| `Spacing/spc-0` | — | `0px` | Add `--space-0: 0` if needed by a component |
| `Spacing/spc-6` | — | `6px` | Add `--space-6: 0.375rem` if needed by a component |
| `Radius/full` (new primitive, `9999`) vs `Radius/r-64` vs `--radius-pill` | `999px` | `r-64: 64px`, `full: 9999px` | Figma now has two candidates for "pill" radius — clarify with design which one code's `--radius-pill` should track |
| `--radius-md`, `--radius-lg` | `14px`, `20px` | No equivalent | Raise with design: should these become Figma variables? |
| Radius primitives `r-0` → `r-48` | — | 12 variables | Defer until Figma exposes as a navigable collection |
| `Typography/Button/*` weights | `font-weight: 500` | Semibold (600) | Confirm correct weight with design; update code or document intentional divergence |
| `Focus state` effect | Single 4px shadow | Two rings (3px + 1px) | Align focus shadow treatment with Figma spec |
| `--color-action-secondary-border` | `rgba(60, 58, 219, 0.24)` | No Figma equivalent | Formalized from Button.vue's existing hardcoded outline color — confirm this is the intended secondary-button border treatment |
| `--color-action-danger-border` | `rgba(210, 120, 114, 0.55)` | No Figma equivalent | Formalized from Button.vue's existing hardcoded outline color — confirm with design |
| `--color-action-danger-surface`, `-surface-hover`, `-surface-pressed` | Aliases `--color-status-error-surface` + two new `rgba()` tints | Figma's `Action/Danger` group has no `Surface` sub-role | Confirm the `secondary-danger` button treatment is intended to borrow from Status/Error rather than a dedicated Action token |
| `--color-action-tertiary-modal-default/hover/pressed` | `rgba(60, 58, 219, 0.08 / 0.08 / 0.12)` | No Figma equivalent at all | `tertiary-modal` variant isn't represented in Figma's `Action` group; confirm naming and values with design. Note: default and hover currently resolve to the identical value (pre-existing behavior, not changed by this fix) — worth asking design if hover should be visually distinct |
| **Code syntax for camelCase segments** | — | `OnSolid`, `OnStatus`, `OnNeutral`, `DangerGhost` each carry an explicit WEB code-syntax string | Read the stored syntax rather than deriving it — the naming rule gives `onsolid`, Figma may hold `on-solid`. Blocks CSS generation for the new layer |
| `Overlay/Scrim` → `Other/Blanket` | — | Likely `rgba(91, 91, 100, 0.5)` (Gray/80 @ 50%), per the `Color/Focus/Blanket` row above | Confirm the two rows describe the same primitive before writing the scrim into CSS |
| `Surface/Muted`, `Border/Subtle` | `gray-10`, `gray-20` | `gray-15`, `gray-30` | **Names reused at different values.** A find-and-replace on either produces a silently wrong colour — migrate these by hand |
