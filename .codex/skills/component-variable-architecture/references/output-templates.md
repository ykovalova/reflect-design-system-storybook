# Component Variable Architecture Templates

Use these tables when presenting component-driven variable recommendations.

## Component Token Inventory

| Component part/state | Observed Figma value | Current token, if any | Role | Recommendation |
| --- | --- | --- | --- | --- |
| `Badge / Success / Background` | `#F2FBF5` | _None_ | Status surface | Add semantic status token, then component alias |

## Proposed Variable Structure

| Layer | Figma variable | Aliases to | Code token | Transfer priority |
| --- | --- | --- | --- | --- |
| Primitive | `Ref/Color/Green/10` | Raw value | `--ref-color-green-10` | Required before transfer |
| Semantic | `Sys/Color/Status/Success/Surface` | `Ref/Color/Green/10` | `--color-status-success-surface` | Required before transfer |
| Component | `Cmp/Badge/Success/Background` | `Sys/Color/Status/Success/Surface` | `--badge-success-bg` | Can evolve during transfer |

## Mapping Table

| Figma token/style | Code token | Status | Notes |
| --- | --- | --- | --- |
| `Cmp/Badge/Success/Background` | `--badge-success-bg` | Missing in Figma | Suggested component alias to `Sys/Color/Status/Success/Surface` |
| `Sys/Color/Focus/Ring` | `--color-focus-ring` | Missing in code | Figma color value is source of truth |

Allowed mapping statuses:

- `Approved`
- `Needs approval`
- `Missing in code`
- `Missing in Figma`
- `Ambiguous`

## Transfer Priority Labels

Use these labels outside the mapping status column:

- `Required before transfer`: blocks faithful component transfer.
- `Can evolve during transfer`: useful cleanup or aliasing that can be added while implementing the component.
- `Needs design decision`: intent, naming, or alias ownership is unclear.

## Naming Pattern

Use slash-separated Figma variable names and kebab-case CSS variables.

Primitive examples:

```text
Ref/Color/Brand/75       -> --ref-color-brand-75
Ref/Color/Blue/2.5       -> --ref-color-blue-2-5
Ref/Color/Other/Blanket  -> --ref-color-other-blanket
```

Semantic examples:

```text
Sys/Color/Surface/Primary        -> --color-surface-primary
Sys/Color/Text/Secondary         -> --color-text-secondary
Sys/Color/Action/Primary/Hover   -> --color-action-primary-hover
Sys/Color/Status/Danger/Text     -> --color-status-danger-text
Sys/Color/Focus/Ring             -> --color-focus-ring
Sys/Color/Overlay/Blanket        -> --color-overlay-blanket
```

Component examples:

```text
Cmp/Button/Primary/Background/Default  -> --button-primary-bg
Cmp/Button/Primary/Background/Hover    -> --button-primary-bg-hover
Cmp/Badge/Success/Background           -> --badge-success-bg
Cmp/Field/Default/Border               -> --field-border
```

## Recommendation Shape

Keep the final recommendation compact:

1. State whether foundational work is needed before transfer.
2. Name the blocking variables.
3. Name the gradual variables.
4. Provide the tables.
5. State any unresolved decisions.
