# Figma To Code Mapping

This file tracks the agreed mapping between Figma variables/styles and the Vue Storybook receiver.

## Current status

- Prep scaffold completed
- Stage 1 foundations transferred from exact Figma node links
- Colors transferred with verified core swatches and semantic mappings
- Spacing transferred from the full spacing table
- Typography transferred from the full type specification
- Elevations transferred from the dedicated elevations page
- Stage 2 Button transferred from the exact Buttons component sheet
- Token parity now has a dedicated project skill: `$figma-tokens-to-storybook`
- 2026-05-07 parity audit completed against the Reflect Design System Figma library

## Token parity gate

Run `$figma-tokens-to-storybook` before any new component transfer.

Component transfer should stop or warn when:

- required foundation tokens are missing in code
- Figma variables, styles, or aliases are not exposed clearly enough to verify a mapping
- a mapping would require semantic guesswork instead of an explicit decision

The parity pass should leave behind an explicit `Figma token/style -> code token` table and a short unresolved list when gaps remain.

## Naming contract

- Figma primitives may remain grouped by domain such as `Color/Brand/*`
- Code tokens should expose stable CSS custom properties such as `--color-brand-75`
- Storybook navigation should stay human-readable: `Foundations/Colors`, `Foundations/Spacing`, `Foundations/Typography`, `Components/Button`

## Stage 1 fill-ins

Transferred Stage 1 mappings:

| Figma source | Code token | Notes |
| --- | --- | --- |
| `gray-00` | `--color-gray-00` | Verified from swatch card |
| `gray-05` | `--color-gray-05` | Verified from swatch card |
| `gray-90` | `--color-gray-90` | Verified from swatch card |
| `gray-100` | `--color-gray-100` | Verified from swatch card |
| `brand-05` | `--color-brand-05` | Verified from swatch card |
| `brand-10` | `--color-brand-10` | Verified from swatch card |
| `brand-70` | `--color-brand-70` | Verified from linked Colors page and earlier file variables |
| `brand-75` | `--color-brand-75` | Verified from linked Colors page and earlier file variables |
| `brand-95` | `--color-brand-95` | Verified from swatch card |
| `Product Accents/Brand/Brand 1` | `--color-accent-strong` | Verified from file-level variables used in the system |
| `Product Accents/Brand/Brand 2` | `--color-accent-soft` | Verified from file-level variables used in the system |
| `Spacing-2` ... `Spacing-144` | `--space-2` ... `--space-144` | Preserved source spacing names and values |
| `H1` ... `H5` | `--font-heading-*` | Split by weight for code usage |
| `Body 1`, `Body 2` | `--font-body-*` | Includes the underlined Body 2 style |
| `Caption field`, `Tooltip` | `--font-caption-field`, `--font-tooltip` | Preserved as separate text roles |
| `Button large`, `Button medium`, `Button small` | `--font-button-*` | Ready for Stage 2 Button implementation |
| `Box shadow 1` | `--shadow-elevation-1` | `0 2px 20px rgba(150, 148, 161, 0.2)` |
| `Box shadow 2` | `--shadow-elevation-2` | `1px 5px 10px 2px rgba(91, 91, 100, 0.3)` |

## 2026-05-07 token parity audit

Source:

- Figma file: `Reflect Design System`
- Linked node: `932:4217` (`Badge` page)
- Local Figma variable collection exposed by Plugin API: `Primitives`, mode `Mode 1`, 121 variables
- Local Figma styles exposed by Plugin API: 0 paint styles, 27 text styles, 3 effect styles
- Storybook sources checked: `src/tokens/foundations.ts` and `src/styles/base.css`

Storybook `foundations.ts` and `base.css` are internally aligned for the current structured token catalog. The unresolved items below are Figma-to-code parity gaps, not code-source drift between those two files.

Color source-of-truth decision: Figma is authoritative for color values. If a color exists in Figma and the Storybook value is missing or different, Storybook should be updated to match Figma. This decision applies to color values only; Figma variable structure, naming, collections, aliases, and modes remain in progress while design updates them.

### Color variables

| Figma token/style | Code token | Status | Notes |
| --- | --- | --- | --- |
| `Color/Gray/gray-00` ... `Color/Gray/gray-100` | `--color-gray-00` ... `--color-gray-100` | Approved | Exact name/value match |
| `Color/Brand/brand-05` ... `Color/Brand/brand-100` | `--color-brand-05` ... `--color-brand-100` | Approved | Exact name/value match |
| `Color/Green/green-2,5` ... `Color/Green/green-100` | `--color-green-2-5` ... `--color-green-100` | Approved | Exact value match; comma is normalized to hyphen in CSS custom property names |
| `Color/Yellow/yellow-2,5` ... `Color/Yellow/yellow-100` | `--color-yellow-2-5` ... `--color-yellow-100` | Approved | Exact value match; comma is normalized to hyphen in CSS custom property names |
| `Color/Purple/purple-2,5` ... `Color/Purple/purple-100` | `--color-purple-2-5` ... `--color-purple-100` | Approved | Exact value match; comma is normalized to hyphen in CSS custom property names |
| `Color/Blue/blue-05` ... `Color/Blue/blue-100` | `--color-blue-05` ... `--color-blue-100` | Approved | Exact name/value match, excluding `blue-2,5` below |
| `Color/Blue/blue-2,5` | `--color-blue-2-5` | Missing in code | Figma value `#FBFCFF` is authoritative; Storybook currently has `#F6F8FD` and should be updated |
| `Color/Red/red-05` ... `Color/Red/red-100` | `--color-red-05` ... `--color-red-100` | Approved | Exact name/value match, excluding `red-2,5` and `red-40` below |
| `Color/Red/red-2,5` | `--color-red-2-5` | Missing in code | Figma value `#FDFAF9` is authoritative; Storybook currently has `#FEFCFC` and should be updated |
| `Color/Red/red-40` | `--color-red-40` | Missing in code | Figma value `#E0A39E` is authoritative; Storybook currently has `#E3A39E` and should be updated |
| `Color/Other/Blanket` | _No code token_ | Missing in code | Figma exposes `rgba(91, 91, 100, 0.5)` as a primitive overlay/blanket color |
| `Color/Other/Focus state` | `--color-focus-ring` | Missing in code | Figma value `#0066FF` is authoritative for the focus color; Storybook currently aliases focus to `--color-blue-2-5` |
| `Product Accents/Brand/Brand 1` | `--color-accent-strong` | Needs approval | External SmartBear fill style found through design-system search; value mapping should wait until Figma variable updates expose the intended local token source |
| `Product Accents/Brand/Brand 2` | `--color-accent-soft` | Needs approval | External SmartBear fill style found through design-system search; value mapping should wait until Figma variable updates expose the intended local token source |

### Spacing variables

| Figma token/style | Code token | Status | Notes |
| --- | --- | --- | --- |
| `Spacing/spc-2` ... `Spacing/spc-144` | `--space-2` ... `--space-144` | Approved | Exact px/rem value match for every Storybook spacing token |
| `Spacing/spc-0` | _No code token_ | Missing in code | Figma exposes a zero spacing token; Storybook spacing scale starts at `--space-2` |
| `Spacing/spc-6` | _No code token_ | Missing in code | Figma exposes 6px; Storybook has no `--space-6` token |

### Radius variables

| Figma token/style | Code token | Status | Notes |
| --- | --- | --- | --- |
| `Radius/r-8` | `--radius-sm` | Approved | Exact 8px value match (`0.5rem`) with approved semantic CSS name |
| `Radius/r-0`, `Radius/r-2`, `Radius/r-3`, `Radius/r-4`, `Radius/r-5`, `Radius/r-6` | _No code token_ | Missing in code | Figma exposes small radius primitives not represented in Storybook foundations |
| `Radius/r-12`, `Radius/r-16`, `Radius/r-24`, `Radius/r-32`, `Radius/r-48` | _No code token_ | Missing in code | Figma exposes larger radius primitives not represented in Storybook foundations |
| `Radius/r-64` | `--radius-pill` | Needs approval | Similar rounded-pill intent, but values differ (`64px` vs `999px`) and semantics are not equivalent |
| _No Figma token_ | `--radius-md` | Missing in Figma | Storybook radius is 14px (`0.875rem`); no `Radius/r-14` variable was exposed |
| _No Figma token_ | `--radius-lg` | Missing in Figma | Storybook radius is 20px (`1.25rem`); no `Radius/r-20` variable was exposed |

### Typography styles

| Figma token/style | Code token | Status | Notes |
| --- | --- | --- | --- |
| `Typography/Heading/H1/*` ... `Typography/Heading/H5/*` | `--font-heading-*`, `--line-heading-*`, `--font-weight-*` | Approved | Exact size, line-height, weight, family, and uppercase H5 intent match |
| `Typography/Body/Body 1/*`, `Typography/Body/Body 2/*` | `--font-body-*`, `--line-body-*`, `--font-weight-*` | Approved | Exact size, line-height, weight, family, and underline intent match |
| `Typography/Caption/Caption field` | `--font-caption-field`, `--line-caption-field` | Approved | Exact size, line-height, weight, and family match |
| `Typography/Tooltip/Tooltip` | `--font-tooltip`, `--line-tooltip` | Approved | Exact size, line-height, weight, and family match |
| `Typography/Button/Large` | `--font-button-large`, `--line-button-large` | Needs approval | Figma is Semi Bold 16/16; Storybook foundation is weight 500 and 16/24 |
| `Typography/Button/Medium` | `--font-button-medium`, `--line-button-medium` | Needs approval | Figma is Semi Bold 14/16; Storybook foundation is weight 500 and 14/16 |
| `Typography/Button/Small` | `--font-button-small`, `--line-button-small` | Needs approval | Figma is Semi Bold 12/16; Storybook foundation is weight 500 and 12/16 |

### Effect styles and shadows

| Figma token/style | Code token | Status | Notes |
| --- | --- | --- | --- |
| `shadow 1` | `--shadow-elevation-1` | Approved | Exact effect match: `0 2px 20px rgba(150, 148, 161, 0.2)` |
| `shadow 2` | `--shadow-elevation-2` | Approved | Exact effect match: `1px 5px 10px 2px rgba(91, 91, 100, 0.3)` |
| `Focus state` | `--color-focus-ring` / component focus shadows | Needs approval | Figma effect uses two rings (`#0066FF` 3px and white 1px); Storybook uses a single 4px focus shadow with the current `--color-focus-ring` alias |
| _No Figma token_ | `--shadow-card` | Missing in Figma | Storybook code alias maps to `--shadow-elevation-1`; Figma exposes only the primitive effect style |

### Semantic aliases and modes

| Figma token/style | Code token | Status | Notes |
| --- | --- | --- | --- |
| _No Figma token_ | `--color-surface-primary`, `--color-surface-secondary` | Missing in Figma | Storybook aliases surfaces to gray primitives; no local semantic alias collection or theme mode was exposed |
| _No Figma token_ | `--color-text-primary`, `--color-text-secondary` | Missing in Figma | Storybook aliases text colors to gray primitives; no local semantic alias collection or theme mode was exposed |
| _No Figma token_ | `--color-action-primary`, `--color-action-primary-hover` | Missing in Figma | Storybook aliases actions to brand primitives; no local semantic alias collection or theme mode was exposed |
| _No Figma token_ | `--color-action-danger`, `--color-action-danger-surface`, `--color-action-danger-border` | Missing in Figma | Storybook aliases danger actions to red primitives; no local semantic alias collection or theme mode was exposed |
| _No Figma token_ | `--color-border-subtle` | Missing in Figma | Storybook has an rgba border alias with no exposed Figma variable |

## Open parity decisions

These items are intentionally unresolved. Component transfer is not globally unblocked until the relevant required tokens are approved, added, or intentionally scoped out.

| Figma token/style | Candidate code token | Status | Notes |
| --- | --- | --- | --- |
| `Color/Blue/blue-2,5` | `--color-blue-2-5` | Missing in code | Update Storybook from `#F6F8FD` to Figma source value `#FBFCFF` |
| `Color/Red/red-2,5` | `--color-red-2-5` | Missing in code | Update Storybook from `#FEFCFC` to Figma source value `#FDFAF9` |
| `Color/Red/red-40` | `--color-red-40` | Missing in code | Update Storybook from `#E3A39E` to Figma source value `#E0A39E` |
| `Color/Other/Blanket` | _No code token_ | Missing in code | Required before implementing overlay/blanket states from Figma |
| `Color/Other/Focus state` | `--color-focus-ring` | Missing in code | Update Storybook focus color to Figma source value `#0066FF`; variable naming/alias shape can wait for Figma updates |
| `Spacing/spc-0`, `Spacing/spc-6` | _No code token_ | Missing in code | Required before components can rely on zero/6px spacing tokens |
| `Radius/r-0`, `Radius/r-2`, `Radius/r-3`, `Radius/r-4`, `Radius/r-5`, `Radius/r-6`, `Radius/r-12`, `Radius/r-16`, `Radius/r-24`, `Radius/r-32`, `Radius/r-48` | _No code token_ | Missing in code | Storybook currently exposes only semantic radius tokens |
| `Radius/r-64` | `--radius-pill` | Needs approval | Similar intent, but `64px` is not the same value as `999px` |
| _No Figma token_ | `--radius-md`, `--radius-lg` | Missing in Figma | Storybook has 14px and 20px semantic radii with no exposed primitive equivalents |
| `Typography/Button/Large`, `Typography/Button/Medium`, `Typography/Button/Small` | `--font-button-*`, `--line-button-*` | Needs approval | Button typography weights differ; large line-height also differs |
| `Focus state` | `--color-focus-ring` / focus shadow rules | Needs approval | Figma color/effect and Storybook focus alias/shadow are not equivalent |
| Semantic theme alias collection | `--color-surface-*`, `--color-text-*`, `--color-action-*`, `--color-border-subtle` | Missing in Figma | Only primitive `Mode 1` variables were exposed in the Reflect file |

## Stage 2 fill-ins

Transferred Button property mappings:

| Figma property | Vue prop / Storybook control | Notes |
| --- | --- | --- |
| `Variant=Primary` | `variant="primary"` | Filled action button |
| `Variant=Secondary` | `variant="secondary"` | Outlined/subtle button |
| `Variant=Tertiary` | `variant="tertiary"` | Text-style action button |
| `Variant=Tetriary (modals)` | `variant="tertiary-modal"` | Kept as a dedicated prop value for modal use |
| `Variant=Primary Danger` | `variant="primary-danger"` | Uses transferred danger tokens |
| `Variant=Secondary Danger` | `variant="secondary-danger"` | Uses transferred danger tokens |
| `Variant=Tetriary Danger` | `variant="tertiary-danger"` | Textual danger action |
| `Size=Medium` | `size="medium"` | 40px family |
| `Size=Small` | `size="small"` | 32px family |
| `Size=Extra small` | `size="extra-small"` | Supported for icon-only modal tertiary buttons |
| `State=Default/Hover/Pressed/Focused/Disabled/Loading` | `state` | Storybook exposes Figma visual states directly |
| `Only icon=True/False` | `onlyIcon` | Controls circle-only vs labeled button rendering |
| Icon presence in previews | `icon`, `iconPosition` | Added to support the icon-bearing examples shown in the spec sheet |
