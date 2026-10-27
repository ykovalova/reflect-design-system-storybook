// GENERATED — do not edit. Source: src/tokens/figma-export/Color.tokens.json
// Regenerate with: npm run tokens:generate

export type SemanticColorGroup = "Overlay" | "Background" | "Text" | "Icon" | "Border" | "Brand";

export type SemanticColor = {
  name: string;
  group: SemanticColorGroup;
  cssVar: string;
  value: string;
  alias: string | null;
  hex: string;
  alpha: number;
  description: string;
};

export const semanticColors: SemanticColor[] = [
  {
    "name": "Overlay/Scrim",
    "group": "Overlay",
    "cssVar": "--color-overlay-scrim",
    "value": "rgba(91, 91, 100, 0.5)",
    "alias": "Color/Other/Blanket",
    "hex": "#5B5B64",
    "alpha": 0.5,
    "description": "Backdrop behind modals, drawers and bottom sheets — covers the viewport beneath the raised surface. Semi-transparent by design; never use it as a plain background fill."
  },
  {
    "name": "Overlay/Hover",
    "group": "Overlay",
    "cssVar": "--color-overlay-hover",
    "value": "rgba(33, 33, 40, 0.059)",
    "alias": null,
    "hex": "#212128",
    "alpha": 0.059,
    "description": "The universal hover wash. Lay it OVER the existing surface rather than swapping that surface's colour — this is what lets table rows, list items, menu options, clickable cards and ghost buttons all share one hover treatment on white, tinted or coloured grounds alike."
  },
  {
    "name": "Overlay/Pressed",
    "group": "Overlay",
    "cssVar": "--color-overlay-pressed",
    "value": "rgba(33, 33, 40, 0.122)",
    "alias": null,
    "hex": "#212128",
    "alpha": 0.122,
    "description": "Held-down partner to Overlay/Hover. Same rule: composite it over the existing surface, don't replace the surface."
  },
  {
    "name": "Overlay/Selected",
    "group": "Overlay",
    "cssVar": "--color-overlay-selected",
    "value": "rgba(60, 58, 219, 0.102)",
    "alias": null,
    "hex": "#3C3ADB",
    "alpha": 0.102,
    "description": "Persistent selection wash for rows and items sitting on a ground that is not Background/Page. When the ground is plain, prefer the opaque Background/Selected instead."
  },
  {
    "name": "Overlay/Loading",
    "group": "Overlay",
    "cssVar": "--color-overlay-loading",
    "value": "rgba(255, 255, 255, 0.6)",
    "alias": null,
    "hex": "#FFFFFF",
    "alpha": 0.6,
    "description": "Blanket over content that is refreshing, so a table or card can grey out in place without unmounting. Place the spinner above this layer."
  },
  {
    "name": "Overlay/Inverse/Hover",
    "group": "Overlay",
    "cssVar": "--color-overlay-inverse-hover",
    "value": "rgba(255, 255, 255, 0.102)",
    "alias": null,
    "hex": "#FFFFFF",
    "alpha": 0.102,
    "description": "Hover wash for controls on a dark ground — Background/Inverse toolbars, tooltips, dark headers. Overlay/Hover is invisible there because it darkens rather than lightens."
  },
  {
    "name": "Overlay/Inverse/Pressed",
    "group": "Overlay",
    "cssVar": "--color-overlay-inverse-pressed",
    "value": "rgba(255, 255, 255, 0.161)",
    "alias": null,
    "hex": "#FFFFFF",
    "alpha": 0.161,
    "description": "Held-down partner to Overlay/Inverse/Hover, for controls sitting on Background/Inverse."
  },
  {
    "name": "Background/Page",
    "group": "Background",
    "cssVar": "--color-bg-page",
    "value": "var(--color-gray-05)",
    "alias": "Color/Gray/gray-05",
    "hex": "#FAFAFC",
    "alpha": 1,
    "description": "The application ground — sits behind everything. Deliberately just off white so Background/Raised reads as lifted without depending on shadow alone. Do not use on cards."
  },
  {
    "name": "Background/Raised",
    "group": "Background",
    "cssVar": "--color-bg-raised",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "Anything lifted off the page: cards, modals, popovers, menus, sheets. Pair with an elevation shadow and Border/Subtle."
  },
  {
    "name": "Background/Sunken",
    "group": "Background",
    "cssVar": "--color-bg-sunken",
    "value": "var(--color-gray-10)",
    "alias": "Color/Gray/gray-10",
    "hex": "#F7F7F9",
    "alpha": 1,
    "description": "Inset regions that should read as pushed into the page — input wells, table headers, code blocks, quiet panels."
  },
  {
    "name": "Background/Muted",
    "group": "Background",
    "cssVar": "--color-bg-muted",
    "value": "var(--color-gray-15)",
    "alias": "Color/Gray/gray-15",
    "hex": "#EFEFF2",
    "alpha": 1,
    "description": "Quiet neutral fill for non-interactive furniture: chip grounds, avatar placeholders, skeleton blocks. Not for controls — use Background/Action/* for anything pressable."
  },
  {
    "name": "Background/Disabled",
    "group": "Background",
    "cssVar": "--color-bg-disabled",
    "value": "var(--color-gray-15)",
    "alias": "Color/Gray/gray-15",
    "hex": "#EFEFF2",
    "alpha": 1,
    "description": "Fill for disabled controls (buttons, inputs, selects). Pair with Text/Disabled and Border/Disabled. Shares a value with Background/Muted today; kept as a separate token so the two can diverge."
  },
  {
    "name": "Background/Inverse",
    "group": "Background",
    "cssVar": "--color-bg-inverse",
    "value": "var(--color-gray-100)",
    "alias": "Color/Gray/gray-100",
    "hex": "#212128",
    "alpha": 1,
    "description": "Dark ground for tooltips, toasts and dark headers. The only surface that pairs with Text/Inverse, Icon/Inverse, Border/Inverse and the Overlay/Inverse washes."
  },
  {
    "name": "Background/Selected",
    "group": "Background",
    "cssVar": "--color-bg-selected",
    "value": "var(--color-brand-10)",
    "alias": "Color/Brand/brand-10",
    "hex": "#EBEBFB",
    "alpha": 1,
    "description": "Persistent selection ground for table rows, nav items and chosen menu options. For selected AND hovered, composite Overlay/Hover on top — there is deliberately no third token."
  },
  {
    "name": "Background/Action/Disabled",
    "group": "Background",
    "cssVar": "--color-bg-action-disabled",
    "value": "var(--color-gray-15)",
    "alias": "Color/Gray/gray-15",
    "hex": "#EFEFF2",
    "alpha": 1,
    "description": "Fill of any button whose action is unavailable — every rank that has a face at rest (Primary, Secondary, and their Danger forms). Pair with Border/Action/Disabled, Text/Disabled and Icon/Disabled. Ranks with no face at rest (Tertiary, Tertiary Danger) take Background/Action/Transparent instead and keep no border. Never fade the enabled fill with opacity."
  },
  {
    "name": "Background/Action/Transparent",
    "group": "Background",
    "cssVar": "--color-bg-action-transparent",
    "value": "rgba(0, 0, 0, 0)",
    "alias": null,
    "hex": "#000000",
    "alpha": 0,
    "description": "Transparent by design — the absence of a fill, not a colour. Used by every rank that has no face at rest (Tertiary, Tertiary Danger) for BOTH its rest state and its disabled state. A ghost control keeps no fill and no border when disabled: it is carried entirely by Text/Disabled and Icon/Disabled. Neutral transparent rather than white-at-zero-alpha, so a hover animating to Overlay/Hover does not interpolate through white."
  },
  {
    "name": "Background/Action/Primary/Default",
    "group": "Background",
    "cssVar": "--color-bg-action-primary-default",
    "value": "var(--color-brand-75)",
    "alias": "Color/Brand/brand-75",
    "hex": "#3C3ADB",
    "alpha": 1,
    "description": "Fill of the highest-emphasis button — the one action you most want taken. Aim for one per view. Foreground: Text/OnSolid/Default and Icon/OnSolid. Edge: Border/Action/Primary/Default."
  },
  {
    "name": "Background/Action/Primary/Hover",
    "group": "Background",
    "cssVar": "--color-bg-action-primary-hover",
    "value": "var(--color-brand-80)",
    "alias": "Color/Brand/brand-80",
    "hex": "#302EAF",
    "alpha": 1,
    "description": "Primary button under the pointer. Never substitute an opacity change — the token carries the intended step."
  },
  {
    "name": "Background/Action/Primary/Pressed",
    "group": "Background",
    "cssVar": "--color-bg-action-primary-pressed",
    "value": "var(--color-brand-90)",
    "alias": "Color/Brand/brand-90",
    "hex": "#242383",
    "alpha": 1,
    "description": "Primary button while held down."
  },
  {
    "name": "Background/Action/Secondary/Default",
    "group": "Background",
    "cssVar": "--color-bg-action-secondary-default",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "Fill of the standard secondary button — an opaque white face with Border/Action/Secondary/Default around it. Foreground: Text/OnNeutral. Use when the action is real but not the primary one."
  },
  {
    "name": "Background/Action/Secondary/Hover",
    "group": "Background",
    "cssVar": "--color-bg-action-secondary-hover",
    "value": "var(--color-gray-05)",
    "alias": "Color/Gray/gray-05",
    "hex": "#FAFAFC",
    "alpha": 1,
    "description": "Secondary button under the pointer."
  },
  {
    "name": "Background/Action/Secondary/Pressed",
    "group": "Background",
    "cssVar": "--color-bg-action-secondary-pressed",
    "value": "var(--color-gray-15)",
    "alias": "Color/Gray/gray-15",
    "hex": "#EFEFF2",
    "alpha": 1,
    "description": "Secondary button while held down."
  },
  {
    "name": "Background/Action/Tertiary/Hover",
    "group": "Background",
    "cssVar": "--color-bg-action-tertiary-hover",
    "value": "var(--color-overlay-hover)",
    "alias": "Overlay/Hover",
    "hex": "#212128",
    "alpha": 0.059,
    "description": "Aliases Overlay/Hover, so the ghost button darkens whatever is behind it rather than punching an opaque rectangle. This is why ghost buttons survive on panels, toolbars and coloured banners."
  },
  {
    "name": "Background/Action/Tertiary/Pressed",
    "group": "Background",
    "cssVar": "--color-bg-action-tertiary-pressed",
    "value": "var(--color-overlay-pressed)",
    "alias": "Overlay/Pressed",
    "hex": "#212128",
    "alpha": 0.122,
    "description": "Aliases Overlay/Pressed. Same compositing rule as Background/Action/Tertiary/Hover — lay it over the existing ground rather than replacing it."
  },
  {
    "name": "Background/Action/Danger/Default",
    "group": "Background",
    "cssVar": "--color-bg-action-danger-default",
    "value": "var(--color-red-70)",
    "alias": "Color/Red/red-70",
    "hex": "#B42419",
    "alpha": 1,
    "description": "Fill of a destructive primary button: delete, remove, revoke. Reserve for actions that lose data or cannot be undone. Foreground: Text/OnSolid/Default."
  },
  {
    "name": "Background/Action/Danger/Hover",
    "group": "Background",
    "cssVar": "--color-bg-action-danger-hover",
    "value": "var(--color-red-80)",
    "alias": "Color/Red/red-80",
    "hex": "#901D14",
    "alpha": 1,
    "description": "Destructive primary button under the pointer."
  },
  {
    "name": "Background/Action/Danger/Pressed",
    "group": "Background",
    "cssVar": "--color-bg-action-danger-pressed",
    "value": "var(--color-red-90)",
    "alias": "Color/Red/red-90",
    "hex": "#6C160F",
    "alpha": 1,
    "description": "Destructive primary button while held down."
  },
  {
    "name": "Background/Action/Danger/Secondary/Default",
    "group": "Background",
    "cssVar": "--color-bg-action-danger-secondary-default",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "PENDING RETIREMENT — duplicates Background/Action/Secondary/Default (both gray-00). A secondary-danger button is a neutral white face with Border/Action/Danger/* and Text/Status/Danger/*; it needs no fill of its own."
  },
  {
    "name": "Background/Action/Danger/Secondary/Hover",
    "group": "Background",
    "cssVar": "--color-bg-action-danger-secondary-hover",
    "value": "var(--color-red-10)",
    "alias": "Color/Red/red-10",
    "hex": "#FDF9F9",
    "alpha": 1,
    "description": "PENDING RETIREMENT — duplicates Background/Action/DangerTertiary/Hover. Use that one; the two danger low-emphasis ranks should share a single wash pair."
  },
  {
    "name": "Background/Action/Danger/Secondary/Pressed",
    "group": "Background",
    "cssVar": "--color-bg-action-danger-secondary-pressed",
    "value": "var(--color-red-20)",
    "alias": "Color/Red/red-20",
    "hex": "#F7E2E1",
    "alpha": 1,
    "description": "PENDING RETIREMENT — duplicates Background/Action/DangerTertiary/Pressed. Use that one."
  },
  {
    "name": "Background/Action/Danger/Tertiary/Hover",
    "group": "Background",
    "cssVar": "--color-bg-action-danger-tertiary-hover",
    "value": "var(--color-red-10)",
    "alias": "Color/Red/red-10",
    "hex": "#FDF9F9",
    "alpha": 1,
    "description": "Low-emphasis destructive button under the pointer. Opaque rather than a wash because this variant only ever appears on a light ground."
  },
  {
    "name": "Background/Action/Danger/Tertiary/Pressed",
    "group": "Background",
    "cssVar": "--color-bg-action-danger-tertiary-pressed",
    "value": "var(--color-red-20)",
    "alias": "Color/Red/red-20",
    "hex": "#F7E2E1",
    "alpha": 1,
    "description": "Low-emphasis destructive button while held down."
  },
  {
    "name": "Background/Action/Control/Unchecked/Default",
    "group": "Background",
    "cssVar": "--color-bg-action-control-unchecked-default",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "Box or track fill of an unchecked checkbox, radio or toggle. Pair with Border/Default so the empty control still has an edge."
  },
  {
    "name": "Background/Action/Control/Unchecked/Disabled",
    "group": "Background",
    "cssVar": "--color-bg-action-control-unchecked-disabled",
    "value": "var(--color-gray-15)",
    "alias": "Color/Gray/gray-15",
    "hex": "#EFEFF2",
    "alpha": 1,
    "description": "Unchecked control that cannot be changed. Pair with Border/Disabled."
  },
  {
    "name": "Background/Action/Control/Checked/Default",
    "group": "Background",
    "cssVar": "--color-bg-action-control-checked-default",
    "value": "var(--color-brand-75)",
    "alias": "Color/Brand/brand-75",
    "hex": "#3C3ADB",
    "alpha": 1,
    "description": "Box or track fill of a checked checkbox, radio or toggle. The tick or knob uses Icon/OnSolid."
  },
  {
    "name": "Background/Action/Control/Checked/Hover",
    "group": "Background",
    "cssVar": "--color-bg-action-control-checked-hover",
    "value": "var(--color-brand-80)",
    "alias": "Color/Brand/brand-80",
    "hex": "#302EAF",
    "alpha": 1,
    "description": "Checked control under the pointer — the compound state that is easy to forget and obvious when missing."
  },
  {
    "name": "Background/Action/Control/Checked/Disabled",
    "group": "Background",
    "cssVar": "--color-bg-action-control-checked-disabled",
    "value": "var(--color-gray-30)",
    "alias": "Color/Gray/gray-30",
    "hex": "#D0D0D9",
    "alpha": 1,
    "description": "Checked but locked. Must stay clearly checked: this is a muted brand-to-grey step, not the unchecked fill."
  },
  {
    "name": "Background/Status/Info/Subtle",
    "group": "Background",
    "cssVar": "--color-bg-status-info-subtle",
    "value": "var(--color-blue-20)",
    "alias": "Color/Blue/blue-20",
    "hex": "#E8EDFB",
    "alpha": 1,
    "description": "Tinted ground for informational banners, alerts and soft badges. Pair with Text/Status/Info, Icon/Status/Info and Border/Status/Info."
  },
  {
    "name": "Background/Status/Info/Solid",
    "group": "Background",
    "cssVar": "--color-bg-status-info-solid",
    "value": "var(--color-blue-70)",
    "alias": "Color/Blue/blue-70",
    "hex": "#1E4DD7",
    "alpha": 1,
    "description": "Filled informational ground for solid badges, toasts, status dots and progress fills. Pair the foreground with Text/OnStatus/Info — never with Text/Status/Info, which is tuned for the Subtle tint."
  },
  {
    "name": "Background/Status/Success/Subtle",
    "group": "Background",
    "cssVar": "--color-bg-status-success-subtle",
    "value": "var(--color-green-20)",
    "alias": "Color/Green/green-20",
    "hex": "#EAF9F0",
    "alpha": 1,
    "description": "Tinted ground for success banners, alerts and soft badges. Pair with Text/Status/Success, Icon/Status/Success and Border/Status/Success."
  },
  {
    "name": "Background/Status/Success/Solid",
    "group": "Background",
    "cssVar": "--color-bg-status-success-solid",
    "value": "var(--color-green-70)",
    "alias": "Color/Green/green-70",
    "hex": "#32C26B",
    "alpha": 1,
    "description": "Filled success ground for solid badges, toasts, status dots and progress fills. Pair the foreground with Text/OnStatus/Success — never with Text/Status/Success, which is tuned for the Subtle tint."
  },
  {
    "name": "Background/Status/Warning/Subtle",
    "group": "Background",
    "cssVar": "--color-bg-status-warning-subtle",
    "value": "var(--color-yellow-20)",
    "alias": "Color/Yellow/yellow-20",
    "hex": "#FFF9ED",
    "alpha": 1,
    "description": "Tinted ground for warning banners, alerts and soft badges. Pair with Text/Status/Warning, Icon/Status/Warning and Border/Status/Warning."
  },
  {
    "name": "Background/Status/Warning/Solid",
    "group": "Background",
    "cssVar": "--color-bg-status-warning-solid",
    "value": "var(--color-yellow-70)",
    "alias": "Color/Yellow/yellow-70",
    "hex": "#FFC84C",
    "alpha": 1,
    "description": "Filled warning ground for solid badges, toasts, status dots and progress fills. Pair the foreground with Text/OnStatus/Warning — never with Text/Status/Warning, which is tuned for the Subtle tint."
  },
  {
    "name": "Background/Status/Danger/Subtle",
    "group": "Background",
    "cssVar": "--color-bg-status-danger-subtle",
    "value": "var(--color-red-20)",
    "alias": "Color/Red/red-20",
    "hex": "#F7E2E1",
    "alpha": 1,
    "description": "Tinted ground for error/destructive banners, alerts and soft badges. Pair with Text/Status/Danger, Icon/Status/Danger and Border/Status/Danger."
  },
  {
    "name": "Background/Status/Danger/Solid",
    "group": "Background",
    "cssVar": "--color-bg-status-danger-solid",
    "value": "var(--color-red-70)",
    "alias": "Color/Red/red-70",
    "hex": "#B42419",
    "alpha": 1,
    "description": "Filled error/destructive ground for solid badges, toasts, status dots and progress fills. Pair the foreground with Text/OnStatus/Danger — never with Text/Status/Danger, which is tuned for the Subtle tint."
  },
  {
    "name": "Background/Status/Neutral/Subtle",
    "group": "Background",
    "cssVar": "--color-bg-status-neutral-subtle",
    "value": "var(--color-gray-15)",
    "alias": "Color/Gray/gray-15",
    "hex": "#EFEFF2",
    "alpha": 1,
    "description": "Tinted ground for neutral (draft, archived, pending) banners, alerts and soft badges. Pair with Text/Status/Neutral, Icon/Status/Neutral and Border/Status/Neutral."
  },
  {
    "name": "Background/Status/Neutral/Solid",
    "group": "Background",
    "cssVar": "--color-bg-status-neutral-solid",
    "value": "var(--color-gray-70)",
    "alias": "Color/Gray/gray-70",
    "hex": "#777783",
    "alpha": 1,
    "description": "Filled neutral (draft, archived, pending) ground for solid badges, toasts, status dots and progress fills. Pair the foreground with Text/OnStatus/Neutral — never with Text/Status/Neutral, which is tuned for the Subtle tint."
  },
  {
    "name": "Text/Strong",
    "group": "Text",
    "cssVar": "--color-text-strong",
    "value": "var(--color-gray-100)",
    "alias": "Color/Gray/gray-100",
    "hex": "#212128",
    "alpha": 1,
    "description": "Highest-contrast text: headings, key figures, the one phrase that must land first. Not for body copy — over-using it flattens the hierarchy."
  },
  {
    "name": "Text/Regular",
    "group": "Text",
    "cssVar": "--color-text-regular",
    "value": "var(--color-gray-90)",
    "alias": "Color/Gray/gray-90",
    "hex": "#3E3E46",
    "alpha": 1,
    "description": "Default body copy, form labels and values. The token you reach for unless you have a reason not to."
  },
  {
    "name": "Text/Subtle",
    "group": "Text",
    "cssVar": "--color-text-subtle",
    "value": "var(--color-gray-70)",
    "alias": "Color/Gray/gray-70",
    "hex": "#777783",
    "alpha": 1,
    "description": "De-emphasised text: captions, helper text, timestamps, secondary metadata. Still passes contrast on Background/Page — it is quiet, not disabled."
  },
  {
    "name": "Text/Placeholder",
    "group": "Text",
    "cssVar": "--color-text-placeholder",
    "value": "var(--color-gray-50)",
    "alias": "Color/Gray/gray-50",
    "hex": "#B1B1BF",
    "alpha": 1,
    "description": "The prompt shown inside an empty input. Kept separate from Text/Disabled so an empty field never reads as a locked one, even though they share a value today."
  },
  {
    "name": "Text/Disabled",
    "group": "Text",
    "cssVar": "--color-text-disabled",
    "value": "var(--color-gray-50)",
    "alias": "Color/Gray/gray-50",
    "hex": "#B1B1BF",
    "alpha": 1,
    "description": "Text in a control that cannot be used. Pair with Background/Disabled and Border/Disabled. Never use it merely to de-emphasise — that is Text/Subtle."
  },
  {
    "name": "Text/Inverse",
    "group": "Text",
    "cssVar": "--color-text-inverse",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "Text on a dark ground. Only valid on Background/Inverse (tooltips, toasts, dark headers)."
  },
  {
    "name": "Text/OnNeutral",
    "group": "Text",
    "cssVar": "--color-text-on-neutral",
    "value": "var(--color-gray-90)",
    "alias": "Color/Gray/gray-90",
    "hex": "#3E3E46",
    "alpha": 1,
    "description": "Label on the white secondary button (Background/Action/Secondary). Deliberately darker than the board&#39;s original grey, which read as disabled on a white face."
  },
  {
    "name": "Text/OnSolid/Default",
    "group": "Text",
    "cssVar": "--color-text-on-solid-default",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "Label on a filled action — Background/Action/Primary and Background/Action/Danger. Do not use on Background/Action/Secondary, which is light; that is Text/OnNeutral."
  },
  {
    "name": "Text/OnSolid/Disabled",
    "group": "Text",
    "cssVar": "--color-text-on-solid-disabled",
    "value": "var(--color-gray-50)",
    "alias": "Color/Gray/gray-50",
    "hex": "#B1B1BF",
    "alpha": 1,
    "description": "PENDING RETIREMENT — no consumer. A disabled button is not a solid fill any more, it is Background/Action/Disabled, so its label is Text/Disabled. Kept only until the last reference is confirmed gone."
  },
  {
    "name": "Text/Action/Default",
    "group": "Text",
    "cssVar": "--color-text-action-default",
    "value": "var(--color-brand-75)",
    "alias": "Color/Brand/brand-75",
    "hex": "#3C3ADB",
    "alpha": 1,
    "description": "Brand-coloured interactive text: ghost button labels, links, inline actions. Signals 'this is clickable' without a fill."
  },
  {
    "name": "Text/Action/Hover",
    "group": "Text",
    "cssVar": "--color-text-action-hover",
    "value": "var(--color-brand-90)",
    "alias": "Color/Brand/brand-90",
    "hex": "#242383",
    "alpha": 1,
    "description": "Interactive text under the pointer. Applies to links and ghost labels alike."
  },
  {
    "name": "Text/Status/Info",
    "group": "Text",
    "cssVar": "--color-text-status-info",
    "value": "var(--color-blue-80)",
    "alias": "Color/Blue/blue-80",
    "hex": "#183EAC",
    "alpha": 1,
    "description": "Informational text on Background/Status/Info/Subtle — banner copy, badge labels, helper notes."
  },
  {
    "name": "Text/Status/Success",
    "group": "Text",
    "cssVar": "--color-text-status-success",
    "value": "var(--color-green-100)",
    "alias": "Color/Green/green-100",
    "hex": "#0F3A20",
    "alpha": 1,
    "description": "Success text on Background/Status/Success/Subtle."
  },
  {
    "name": "Text/Status/Warning",
    "group": "Text",
    "cssVar": "--color-text-status-warning",
    "value": "var(--color-yellow-100)",
    "alias": "Color/Yellow/yellow-100",
    "hex": "#654D17",
    "alpha": 1,
    "description": "Warning text on Background/Status/Warning/Subtle."
  },
  {
    "name": "Text/Status/Neutral",
    "group": "Text",
    "cssVar": "--color-text-status-neutral",
    "value": "var(--color-gray-90)",
    "alias": "Color/Gray/gray-90",
    "hex": "#3E3E46",
    "alpha": 1,
    "description": "Neutral status text on Background/Status/Neutral/Subtle — draft, archived, pending."
  },
  {
    "name": "Text/Status/Danger/Default",
    "group": "Text",
    "cssVar": "--color-text-status-danger-default",
    "value": "var(--color-red-70)",
    "alias": "Color/Red/red-70",
    "hex": "#B42419",
    "alpha": 1,
    "description": "Error text: form validation messages, destructive confirmations, danger badge labels on Background/Status/Danger/Subtle. This is the single error-text token — there is no rival value."
  },
  {
    "name": "Text/Status/Danger/Pressed",
    "group": "Text",
    "cssVar": "--color-text-status-danger-pressed",
    "value": "var(--color-red-90)",
    "alias": "Color/Red/red-90",
    "hex": "#6C160F",
    "alpha": 1,
    "description": "Error text while an interactive error element is held down. A state of Text/Status/Danger/Default, not an alternative to it."
  },
  {
    "name": "Text/OnStatus/Info",
    "group": "Text",
    "cssVar": "--color-text-on-status-info",
    "value": "var(--color-blue-90)",
    "alias": "Color/Blue/blue-90",
    "hex": "#122E81",
    "alpha": 1,
    "description": "Label on the filled Background/Status/Info/Solid ground — solid badges, toasts."
  },
  {
    "name": "Text/OnStatus/Success",
    "group": "Text",
    "cssVar": "--color-text-on-status-success",
    "value": "var(--color-green-90)",
    "alias": "Color/Green/green-90",
    "hex": "#1E7440",
    "alpha": 1,
    "description": "Label on the filled Background/Status/Success/Solid ground."
  },
  {
    "name": "Text/OnStatus/Warning",
    "group": "Text",
    "cssVar": "--color-text-on-status-warning",
    "value": "var(--color-gray-90)",
    "alias": "Color/Gray/gray-90",
    "hex": "#3E3E46",
    "alpha": 1,
    "description": "Label on the filled Background/Status/Warning/Solid ground. Dark, not white — warning&#39;s solid fill is a light yellow, and white on it fails contrast. This is the one family that breaks the pattern."
  },
  {
    "name": "Text/OnStatus/Danger",
    "group": "Text",
    "cssVar": "--color-text-on-status-danger",
    "value": "var(--color-red-90)",
    "alias": "Color/Red/red-90",
    "hex": "#6C160F",
    "alpha": 1,
    "description": "Label on the filled Background/Status/Danger/Solid ground."
  },
  {
    "name": "Text/OnStatus/Neutral",
    "group": "Text",
    "cssVar": "--color-text-on-status-neutral",
    "value": "var(--color-gray-70)",
    "alias": "Color/Gray/gray-70",
    "hex": "#777783",
    "alpha": 1,
    "description": "Label on the filled Background/Status/Neutral/Solid ground."
  },
  {
    "name": "Icon/Strong",
    "group": "Icon",
    "cssVar": "--color-icon-strong",
    "value": "var(--color-gray-100)",
    "alias": "Color/Gray/gray-100",
    "hex": "#212128",
    "alpha": 1,
    "description": "Highest-contrast glyph, matching Text/Strong. For icons that carry the same weight as a heading."
  },
  {
    "name": "Icon/Regular",
    "group": "Icon",
    "cssVar": "--color-icon-regular",
    "value": "var(--color-gray-90)",
    "alias": "Color/Gray/gray-90",
    "hex": "#3E3E46",
    "alpha": 1,
    "description": "Default glyph colour, matching Text/Regular. Use for icons sitting alongside body copy."
  },
  {
    "name": "Icon/Subtle",
    "group": "Icon",
    "cssVar": "--color-icon-subtle",
    "value": "var(--color-gray-70)",
    "alias": "Color/Gray/gray-70",
    "hex": "#777783",
    "alpha": 1,
    "description": "De-emphasised glyph: chevrons, affordance hints, decorative marks. Matches Text/Subtle."
  },
  {
    "name": "Icon/Disabled",
    "group": "Icon",
    "cssVar": "--color-icon-disabled",
    "value": "var(--color-gray-50)",
    "alias": "Color/Gray/gray-50",
    "hex": "#B1B1BF",
    "alpha": 1,
    "description": "Glyph in a control that cannot be used. Matches Text/Disabled."
  },
  {
    "name": "Icon/Inverse",
    "group": "Icon",
    "cssVar": "--color-icon-inverse",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "Glyph on a dark ground. Only valid on Background/Inverse."
  },
  {
    "name": "Icon/OnSolid",
    "group": "Icon",
    "cssVar": "--color-icon-on-solid",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "Glyph on a filled action — Background/Action/Primary, Background/Action/Danger — and the tick or knob inside Background/Action/Control/Checked."
  },
  {
    "name": "Icon/Action",
    "group": "Icon",
    "cssVar": "--color-icon-action",
    "value": "var(--color-brand-75)",
    "alias": "Color/Brand/brand-75",
    "hex": "#3C3ADB",
    "alpha": 1,
    "description": "Brand-coloured interactive glyph: icon buttons, inline action affordances. Matches Text/Action/Default so an icon and its label agree."
  },
  {
    "name": "Icon/Placeholder",
    "group": "Icon",
    "cssVar": "--color-icon-placeholder",
    "value": "var(--color-red-30)",
    "alias": "Color/Red/red-30",
    "hex": "#EFCDCB",
    "alpha": 1,
    "description": "The deliberate 'you have not swapped this yet' colour for an unfilled icon slot. It is the ONE glyph token that must never take its colour from context: everything else binds Icon/Current so it adapts, and the placeholder stays loud precisely so an unswapped slot is impossible to miss. Never use it on a real icon."
  },
  {
    "name": "Icon/Status/Info",
    "group": "Icon",
    "cssVar": "--color-icon-status-info",
    "value": "var(--color-blue-70)",
    "alias": "Color/Blue/blue-70",
    "hex": "#1E4DD7",
    "alpha": 1,
    "description": "Informational glyph — the (i) in a banner, a status dot. Sits MORE saturated than Text/Status/Info on purpose: a glyph carries less visual mass than a run of text, so matching the text value would wash it out."
  },
  {
    "name": "Icon/Status/Success",
    "group": "Icon",
    "cssVar": "--color-icon-status-success",
    "value": "var(--color-green-80)",
    "alias": "Color/Green/green-80",
    "hex": "#289B56",
    "alpha": 1,
    "description": "Success glyph — tick, filled dot. More saturated than Text/Status/Success, which is near-black and would read as a neutral tick."
  },
  {
    "name": "Icon/Status/Warning",
    "group": "Icon",
    "cssVar": "--color-icon-status-warning",
    "value": "var(--color-yellow-90)",
    "alias": "Color/Yellow/yellow-90",
    "hex": "#A7822E",
    "alpha": 1,
    "description": "Warning glyph — triangle, exclamation. More saturated than Text/Status/Warning, which reads brown at glyph scale and loses the yellow identity."
  },
  {
    "name": "Icon/Status/Danger",
    "group": "Icon",
    "cssVar": "--color-icon-status-danger",
    "value": "var(--color-red-70)",
    "alias": "Color/Red/red-70",
    "hex": "#B42419",
    "alpha": 1,
    "description": "Error glyph — alert circle, cross. Matches Text/Status/Danger/Default; red needs no correction at glyph scale."
  },
  {
    "name": "Icon/Status/Neutral",
    "group": "Icon",
    "cssVar": "--color-icon-status-neutral",
    "value": "var(--color-gray-70)",
    "alias": "Color/Gray/gray-70",
    "hex": "#777783",
    "alpha": 1,
    "description": "Neutral status glyph — the dot on a draft, archived or pending badge."
  },
  {
    "name": "Border/Divider",
    "group": "Border",
    "cssVar": "--color-border-divider",
    "value": "var(--color-gray-20)",
    "alias": "Color/Gray/gray-20",
    "hex": "#E0E0E5",
    "alpha": 1,
    "description": "Rules and separators only — between list rows, menu sections, toolbar groups. Split from Border/Disabled so divider weight can be tuned without moving every disabled control edge."
  },
  {
    "name": "Border/Subtle",
    "group": "Border",
    "cssVar": "--color-border-subtle",
    "value": "var(--color-gray-30)",
    "alias": "Color/Gray/gray-30",
    "hex": "#D0D0D9",
    "alpha": 1,
    "description": "Quiet container edges: cards, panels, popovers. Pairs with Background/Raised."
  },
  {
    "name": "Border/Default",
    "group": "Border",
    "cssVar": "--color-border-default",
    "value": "var(--color-gray-50)",
    "alias": "Color/Gray/gray-50",
    "hex": "#B1B1BF",
    "alpha": 1,
    "description": "Standard control edge at rest. If you are drawing an input specifically, prefer Border/Field/Default — it carries the full state set."
  },
  {
    "name": "Border/Strong",
    "group": "Border",
    "cssVar": "--color-border-strong",
    "value": "var(--color-gray-70)",
    "alias": "Color/Gray/gray-70",
    "hex": "#777783",
    "alpha": 1,
    "description": "Emphasised edge for a control that needs to assert itself, and the hovered step of Border/Default."
  },
  {
    "name": "Border/Disabled",
    "group": "Border",
    "cssVar": "--color-border-disabled",
    "value": "var(--color-gray-30)",
    "alias": "Color/Gray/gray-30",
    "hex": "#D0D0D9",
    "alpha": 1,
    "description": "Edge of a control that cannot be used. Pair with Background/Disabled and Text/Disabled."
  },
  {
    "name": "Border/Inverse",
    "group": "Border",
    "cssVar": "--color-border-inverse",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "Edge on a dark ground. Only valid on Background/Inverse."
  },
  {
    "name": "Border/Selected",
    "group": "Border",
    "cssVar": "--color-border-selected",
    "value": "var(--color-brand-75)",
    "alias": "Color/Brand/brand-75",
    "hex": "#3C3ADB",
    "alpha": 1,
    "description": "Edge marking a persistent selection: active tab underline, selected card, chosen option. Pair with Background/Selected on the ground."
  },
  {
    "name": "Border/Action/Disabled",
    "group": "Border",
    "cssVar": "--color-border-action-disabled",
    "value": "var(--color-gray-30)",
    "alias": "Color/Gray/gray-30",
    "hex": "#D0D0D9",
    "alpha": 1,
    "description": "Edge of any disabled button that has a face. It does real work: Background/Action/Disabled alone is 1.15:1 against a white page, so without this edge the control disappears. Ghost ranks deliberately get no disabled edge."
  },
  {
    "name": "Border/Action/Primary/Default",
    "group": "Border",
    "cssVar": "--color-border-action-primary-default",
    "value": "var(--color-brand-75)",
    "alias": "Color/Brand/brand-75",
    "hex": "#3C3ADB",
    "alpha": 1,
    "description": "Edge of a primary button. Tracks Background/Action/Primary/Default exactly, so a filled button&#39;s edge is invisible and an outlined one reads as the same rank."
  },
  {
    "name": "Border/Action/Primary/Hover",
    "group": "Border",
    "cssVar": "--color-border-action-primary-hover",
    "value": "var(--color-brand-80)",
    "alias": "Color/Brand/brand-80",
    "hex": "#302EAF",
    "alpha": 1,
    "description": "Primary button edge under the pointer. Tracks Background/Action/Primary/Hover."
  },
  {
    "name": "Border/Action/Primary/Pressed",
    "group": "Border",
    "cssVar": "--color-border-action-primary-pressed",
    "value": "var(--color-brand-90)",
    "alias": "Color/Brand/brand-90",
    "hex": "#242383",
    "alpha": 1,
    "description": "Primary button edge while held down. Tracks Background/Action/Primary/Pressed."
  },
  {
    "name": "Border/Action/Secondary/Default",
    "group": "Border",
    "cssVar": "--color-border-action-secondary-default",
    "value": "var(--color-gray-50)",
    "alias": "Color/Gray/gray-50",
    "hex": "#B1B1BF",
    "alpha": 1,
    "description": "Edge of the secondary button — the line that makes Background/Action/Secondary read as a button at all, since its fill is white."
  },
  {
    "name": "Border/Action/Secondary/Hover",
    "group": "Border",
    "cssVar": "--color-border-action-secondary-hover",
    "value": "var(--color-gray-70)",
    "alias": "Color/Gray/gray-70",
    "hex": "#777783",
    "alpha": 1,
    "description": "Secondary button edge under the pointer."
  },
  {
    "name": "Border/Action/Secondary/Pressed",
    "group": "Border",
    "cssVar": "--color-border-action-secondary-pressed",
    "value": "var(--color-gray-80)",
    "alias": "Color/Gray/gray-80",
    "hex": "#5B5B64",
    "alpha": 1,
    "description": "Secondary button edge while held down. Shares Hover's value deliberately; the fill carries the pressed signal."
  },
  {
    "name": "Border/Action/Danger/Default",
    "group": "Border",
    "cssVar": "--color-border-action-danger-default",
    "value": "var(--color-red-70)",
    "alias": "Color/Red/red-70",
    "hex": "#B42419",
    "alpha": 1,
    "description": "Edge of a destructive button. Tracks Background/Action/Danger/Default, and is the outline that gives Background/Action/DangerTertiary its shape."
  },
  {
    "name": "Border/Action/Danger/Hover",
    "group": "Border",
    "cssVar": "--color-border-action-danger-hover",
    "value": "var(--color-red-80)",
    "alias": "Color/Red/red-80",
    "hex": "#901D14",
    "alpha": 1,
    "description": "Destructive button edge under the pointer."
  },
  {
    "name": "Border/Action/Danger/Pressed",
    "group": "Border",
    "cssVar": "--color-border-action-danger-pressed",
    "value": "var(--color-red-90)",
    "alias": "Color/Red/red-90",
    "hex": "#6C160F",
    "alpha": 1,
    "description": "Destructive button edge while held down."
  },
  {
    "name": "Border/Field/Default",
    "group": "Border",
    "cssVar": "--color-border-field-default",
    "value": "var(--color-gray-50)",
    "alias": "Color/Gray/gray-50",
    "hex": "#B1B1BF",
    "alpha": 1,
    "description": "Input, textarea and select edge at rest. Use this rather than Border/Default on form controls: it is the entry point to the full field state set (Hover, Error, Disabled, plus Focus)."
  },
  {
    "name": "Border/Field/Hover",
    "group": "Border",
    "cssVar": "--color-border-field-hover",
    "value": "var(--color-gray-70)",
    "alias": "Color/Gray/gray-70",
    "hex": "#777783",
    "alpha": 1,
    "description": "Field edge under the pointer, before focus."
  },
  {
    "name": "Border/Field/Error",
    "group": "Border",
    "cssVar": "--color-border-field-error",
    "value": "var(--color-red-70)",
    "alias": "Color/Red/red-70",
    "hex": "#B42419",
    "alpha": 1,
    "description": "Field edge in a validation error state. Deliberately the full-strength red, not the pale status outline — a 1px edge needs the weight. Pair with Text/Status/Danger/Default on the message below."
  },
  {
    "name": "Border/Field/Disabled",
    "group": "Border",
    "cssVar": "--color-border-field-disabled",
    "value": "var(--color-gray-30)",
    "alias": "Color/Gray/gray-30",
    "hex": "#D0D0D9",
    "alpha": 1,
    "description": "Field edge when the input cannot be used. Pair with Background/Disabled and Text/Disabled."
  },
  {
    "name": "Border/Status/Info",
    "group": "Border",
    "cssVar": "--color-border-status-info",
    "value": "var(--color-blue-40)",
    "alias": "Color/Blue/blue-40",
    "hex": "#A5B8EF",
    "alpha": 1,
    "description": "Outline around an informational banner or soft badge, paired with Background/Status/Info/Subtle."
  },
  {
    "name": "Border/Status/Success",
    "group": "Border",
    "cssVar": "--color-border-status-success",
    "value": "var(--color-green-40)",
    "alias": "Color/Green/green-40",
    "hex": "#ADE7C4",
    "alpha": 1,
    "description": "Outline around a success banner or soft badge, paired with Background/Status/Success/Subtle."
  },
  {
    "name": "Border/Status/Warning",
    "group": "Border",
    "cssVar": "--color-border-status-warning",
    "value": "var(--color-yellow-50)",
    "alias": "Color/Yellow/yellow-50",
    "hex": "#FFDE94",
    "alpha": 1,
    "description": "Outline around a warning banner or soft badge, paired with Background/Status/Warning/Subtle."
  },
  {
    "name": "Border/Status/Danger",
    "group": "Border",
    "cssVar": "--color-border-status-danger",
    "value": "var(--color-red-40)",
    "alias": "Color/Red/red-40",
    "hex": "#E0A39E",
    "alpha": 1,
    "description": "Outline around an error banner or soft badge, paired with Background/Status/Danger/Subtle. NOT for input error edges — that is Border/Field/Error, which is stronger."
  },
  {
    "name": "Border/Status/Neutral",
    "group": "Border",
    "cssVar": "--color-border-status-neutral",
    "value": "var(--color-gray-30)",
    "alias": "Color/Gray/gray-30",
    "hex": "#D0D0D9",
    "alpha": 1,
    "description": "Outline around a neutral banner or soft badge, paired with Background/Status/Neutral/Subtle."
  },
  {
    "name": "Border/Focus/Ring",
    "group": "Border",
    "cssVar": "--color-border-focus-ring",
    "value": "#0066ff",
    "alias": "Color/Other/Focus state",
    "hex": "#0066FF",
    "alpha": 1,
    "description": "Keyboard focus ring, 2px, drawn OUTSIDE the control so focusing never shifts layout. Required on every focusable element. It stacks with other edges — a focused invalid field shows both this and Border/Field/Error."
  },
  {
    "name": "Border/Focus/Inner",
    "group": "Border",
    "cssVar": "--color-border-focus-inner",
    "value": "var(--color-gray-00)",
    "alias": "Color/Gray/gray-00",
    "hex": "#FFFFFF",
    "alpha": 1,
    "description": "1px light ring drawn between the control and Border/Focus/Ring. Needed so focus stays visible on dark and saturated fills, where the ring alone can blend into the button."
  },
  {
    "name": "Brand/Logo/Dark",
    "group": "Brand",
    "cssVar": "--color-brand-logo-dark",
    "value": "#173647",
    "alias": "Color/Brand/brand-logo-dark",
    "hex": "#173647",
    "alpha": 1,
    "description": "Fixed logo mark colour. Not a semantic token — it describes one asset, not a role, and is a candidate to move out of this collection to the Logo page."
  },
  {
    "name": "Brand/Logo/Purple",
    "group": "Brand",
    "cssVar": "--color-brand-logo-purple",
    "value": "#4a45eb",
    "alias": "Color/Brand/brand-logo-purple",
    "hex": "#4A45EB",
    "alpha": 1,
    "description": "Fixed logo mark colour. Not a semantic token — see Brand/Logo/Dark."
  },
  {
    "name": "Brand/Logo/Green",
    "group": "Brand",
    "cssVar": "--color-brand-logo-green",
    "value": "#85eb2e",
    "alias": "Color/Brand/brand-logo-green",
    "hex": "#85EB2E",
    "alpha": 1,
    "description": "Fixed logo mark colour. Not a semantic token — see Brand/Logo/Dark."
  }
];
