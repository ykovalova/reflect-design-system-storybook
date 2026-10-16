# Button — Figma ↔ Vue prop mapping (Code Connect draft)

Figma: component set `Button` (`558:3397`) on branch `E7eUpizBfWjk1JSLTGrsfC`.
Code: `src/components/Button/Button.vue`.

**Status:** not yet registered in Figma. Code Connect needs a *published* component, and the set only exists on a branch (`add_code_connect_map` returned "Published component not found"). Register it after the branch is merged and the library is published, using this table.

| Figma property | Figma values | Vue prop | Vue values |
|---|---|---|---|
| Variant | Primary / Secondary / Primary Danger / Secondary Danger / Tertiary (modals) / Tertiary Danger | `variant` | `primary` / `secondary` / `primary-danger` / `secondary-danger` / `tertiary-modal` / `tertiary-danger` |
| Size | Medium / Small / Extra small | `size` | `medium` / `small` / `extra-small` |
| State | Default / Hover / Pressed / Focused / Disabled / Loading | `state` (+ `disabled`) | `default` / `hover` / `pressed` / `focused` / `disabled` / `loading` |
| Only icon | True / False (toggle) | `onlyIcon` | `true` / `false` |
| Button text | text | `label` | string |
| Show left icon + Left icon | boolean + icon swap | `icon` + `iconPosition="leading"` | `plus` / `close` / `arrow-right` |
| Show right icon + Right icon | boolean + icon swap | `icon` + `iconPosition="trailing"` | same |
| Icon | icon swap (Only icon = True) | `icon` | same |

## Gaps to resolve
- **Both icons at once:** Figma allows a leading and a trailing icon together; the Vue component takes a single `icon` with one `iconPosition`.
- **Plain Tertiary:** in Figma it is a separate component ("Tertiary Button (app)") and maps to `variant="tertiary"`. It needs its own mapping.
- **Icons:** Figma swaps any icon from the Icon set; Vue accepts only `plus`, `close`, `arrow-right`.
- **Extra small** is valid only for icon-only `tertiary-modal` (Vue falls back to `small` otherwise).
