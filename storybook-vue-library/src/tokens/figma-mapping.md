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

## Source gaps

- No Figma variable collections were exposed in the source file through MCP
- No dedicated foundation page for radius tokens was present at the top level
- Semantic theme aliases remain documented in Storybook as a code-side mapping layer

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
