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

- **Date:** 2026-05-07
- **Figma file:** Reflect Design System
- **Source node:** `932:4217` (Badge page)
- **Figma variable collection:** `Primitives`, mode `Mode 1`, 121 variables
- **Figma styles:** 0 paint styles · 27 text styles · 3 effect styles
- **Code sources checked:** `src/tokens/foundations.ts` · `src/styles/base.css`

**Authority decision recorded at this audit:** Figma is authoritative for color values. Where Figma and code disagree, code is updated to match Figma. This applies to values only — Figma variable structure, naming, and modes remain in progress on the design side.

---

## Stage 1 — Foundations

### Colors — primitive palette

All 7 families transferred and approved. Comma-in-step names normalized to hyphens throughout.

| Figma group | Code prefix | Status | Notes |
|-------------|-------------|--------|-------|
| `Color/Gray/*` | `--color-gray-*` | Approved | 13 steps, exact match |
| `Color/Brand/*` | `--color-brand-*` | Approved | 12 steps, exact match |
| `Color/Red/*` | `--color-red-*` | Approved with gaps | See open decisions: `red-2,5` and `red-40` values wrong |
| `Color/Green/*` | `--color-green-*` | Approved | 12 steps, exact match |
| `Color/Yellow/*` | `--color-yellow-*` | Approved | 12 steps, exact match |
| `Color/Blue/*` | `--color-blue-*` | Approved with gaps | See open decisions: `blue-2,5` value wrong |
| `Color/Purple/*` | `--color-purple-*` | Approved | 12 steps, exact match |
| `Color/Other/Blanket` | — | Missing in code | `rgba(91, 91, 100, 0.5)` — no code equivalent yet |
| `Product Accents/Brand/Brand 1` | `--color-accent-strong` | Needs approval | External SmartBear style; mapping deferred until Figma exposes local variable |
| `Product Accents/Brand/Brand 2` | `--color-accent-soft` | Needs approval | External SmartBear style; mapping deferred |

### Colors — semantic layer

Semantic aliases are a code-side mapping layer. No local semantic variable collection was exposed in the Figma file at the time of audit — only `Mode 1` primitive variables were available.

| Code token group | Maps to | Status |
|-----------------|---------|--------|
| `--color-text-*` (14 tokens) | Gray and Brand primitives | Code-only; no Figma alias collection |
| `--color-icon-*` (9 tokens) | Aliases Text counterparts | Code-only; no Figma alias collection |
| `--color-surface-*` (6 tokens) | Gray and Brand primitives | Code-only; no Figma alias collection |
| `--color-border-*` (10 tokens) | Gray, Brand, Red, Blue, Yellow, Green primitives | Code-only; no Figma alias collection |
| `--color-action-*` (15 tokens) | Brand, Red, Gray primitives | Code-only; no Figma alias collection |
| `--color-status-*` (30 tokens) | Gray, Blue, Green, Yellow, Red primitives | Code-only; no Figma alias collection |
| `--color-focus-ring` | `#0066FF` | Matches Figma `Color/Other/Focus state` |
| `--color-focus-inner` | `--color-gray-00` | Code-only |

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
| `Color/Blue/blue-2,5` | `--color-blue-2-5: #F6F8FD` | `#FBFCFF` | Update code to match Figma |
| `Color/Red/red-2,5` | `--color-red-2-5: #FEFCFC` | `#FDFAF9` | Update code to match Figma |
| `Color/Red/red-40` | `--color-red-40: #E3A39E` | `#E0A39E` | Update code to match Figma |
| `Color/Other/Blanket` | — | `rgba(91, 91, 100, 0.5)` | Add to foundations before implementing overlays or modals |
| `Spacing/spc-0` | — | `0px` | Add `--space-0: 0` if needed by a component |
| `Spacing/spc-6` | — | `6px` | Add `--space-6: 0.375rem` if needed by a component |
| `Radius/r-64` vs `--radius-pill` | `999px` | `64px` | Decide: adopt Figma value or document divergence as intentional |
| `--radius-md`, `--radius-lg` | `14px`, `20px` | No equivalent | Raise with design: should these become Figma variables? |
| Radius primitives `r-0` → `r-48` | — | 12 variables | Defer until Figma exposes as a navigable collection |
| `Typography/Button/*` weights | `font-weight: 500` | Semibold (600) | Confirm correct weight with design; update code or document intentional divergence |
| `Focus state` effect | Single 4px shadow | Two rings (3px + 1px) | Align focus shadow treatment with Figma spec |
| Semantic alias collection | Code-only | Not in Figma | Track when design exposes semantic variable collections in Figma; remap if structure changes |
