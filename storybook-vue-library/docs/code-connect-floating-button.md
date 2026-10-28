# Floating circle button — Figma ↔ Vue prop mapping (Code Connect draft)

Figma: component set `Floating circle button` (`10733:2181`) on branch `HnugASjnJEVK0CpIyqj1MI`.
Code: `src/components/FloatingButton/FloatingButton.vue`.

**Status:** not yet registered in Figma. Code Connect needs a *published* component and this set only exists on a branch. Register it after the branch is merged and the library is published, using this table. (The same blocker applies to Button, see `code-connect-button.md`.)

| Figma property | Figma values | Vue prop | Vue values |
|---|---|---|---|
| Appearance | Closed / Opened | `appearance` | `closed` / `opened` |
| Size | Medium (60px) / Small (40px) | `size` | `medium` / `small` |
| State | Default / Hover / Pressed / Focused / Disabled / Loading | `state` (+ `disabled`) | `default` / `hover` / `pressed` / `focused` / `disabled` / `loading` |
| Icon | icon swap (default Add) | default slot | any markup; built-in plus when empty |
| — | no label | `ariaLabel` (required) | string describing the action |

Figma "Opened" shows the same icon rotated 45°; the component does this with CSS (`--fb-rotation`).

## Token mapping
| Figma | CSS |
|---|---|
| `Action/Primary/Default · Hover · Pressed` | `--color-bg-action-primary-default · -hover · -pressed` |
| `Border/Action/Default · Hover · Pressed` | `--color-border-action-primary-default · -hover · -pressed` |
| `Action/Neutral/Default · Hover · Pressed` | `--color-bg-action-secondary-default · -hover · -pressed` |
| `Border/Neutral/Default · Hover` | `--color-border-action-secondary-default · -hover` (hover is gray-60 after the Figma change) |
| `Border/Neutral/Pressed` (gray-70) | `--color-gray-70` (`secondary-pressed` is gray-80) |
| `Action/*/Disabled`, `Border/*/Disabled` | `--color-bg-action-disabled`, `--color-border-action-disabled` |
| `Border/Focus/Ring` | `--color-border-focus-ring` |
| `shadow 0` | `--shadow-elevation-0` (pending design approval) |

## Decisions
- The component is **separate from `Button`**: it is circular, fixed at 60/40px, has no label and a different Appearance axis.
- Figma `Appearance` values were renamed from "Closed (Modal)" / "Opened (Modal)" to "Closed" / "Opened"; the "(Modal)" suffix carried no documented meaning.
- `Action/Secondary/Pressed` was changed from gray-10 to gray-15 in Figma to match `Action/Neutral/Pressed`; code follows (export, generated tokens, `base.css`).
- `Border/Action/Secondary/Hover` was changed from gray-70 to gray-60 in Figma; code follows (export, generated tokens).
- Neutral pressed border (gray-70) still differs from `--color-border-action-secondary-pressed` (gray-80); the primitive `--color-gray-70` is used until design decides whether to align them.
