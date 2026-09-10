# Semantic Token Map

Every semantic colour token in Figma, its primitive alias, its CSS name, and when
to use it.

- **Source of record:** Figma branch `E7eUpizBfWjk1JSLTGrsfC`, collections
  **`Semantic`** (113 variables, one mode `Semantic/Color`) and **`Icon context`**
  (1 variable, four modes).
- **Generated from the file** on 2026-09-10 — names, aliases, values, CSS names
  and usage text were all read from the variables themselves, not transcribed.
  Re-pull with the script at the [end of this file](#re-pulling-this-document).
- **Code status:** **not migrated.** `base.css` and `foundations.ts` still carry
  the pre-2026-09 names. See [Appendix A](#appendix-a--migrating-the-code-layer).

Companion documents: `../../docs/semantic-color-spec.html` (readable reference
copy), the `reflect-token-picker` skill (which token for which property),
`figma-mapping.md` (parity audit trail), and
`../../docs/button-token-audit.md` (how this shape was arrived at).

---

## The naming rule

```
Group / Role / Rank / State
```

| Segment | What it says |
|---|---|
| **Group** | **What property you are painting.** Six, fixed: `Background`, `Border`, `Text`, `Icon`, `Overlay`, `Brand/Logo`. |
| **Role** | Which slot — a neutral rung, a status family, or `Action` for something pressable. |
| **Rank** | Only under `Action`: `Primary` · `Secondary` · `Tertiary` · `Danger` · `DangerSecondary` · `DangerTertiary` · `Control`. |
| **State** | Optional, **always last**: `Hover` · `Pressed` · `Selected` · `Disabled`. Absent means rest. |

The group is a property, not a meaning. A static ground and a pressable fill are
both `Background`; what separates them is the `Action` role:

```
Background/Raised                    ← a card
Background/Action/Primary/Default    ← a button face
Border/Action/Primary/Default        ← that button's edge
```

The fill and the edge stay parallel. That is the whole reason for this shape —
under the previous `Surface`/`Action` naming they were `Action/Primary/Default`
and `Border/Action/Primary/Default`, and you had to remember that fills omit the
property segment.

A state never appears mid-name. If a token you want seems to need one in the
middle, you are reaching for the wrong token.

### Two deliberate exceptions

`Overlay/*` is not a property — it is a compositing role. Every overlay is
technically a background with alpha, but it is the only family in the system
carrying an alpha channel, and keeping the group visible is a useful warning that
these composite rather than paint.

`Brand/Logo/*` is not semantic at all — three fixed asset colours. They are
candidates to move out of this collection to the Logo page.

### The CSS name

**Read `variable.codeSyntax.WEB`. Do not derive it from the name.** Every variable
stores its CSS name explicitly, and the two deliberately differ: `Background/`
emits `bg` so names stay usable in a stylesheet.

| Figma | CSS |
|---|---|
| `Background/Action/Primary/Default` | `var(--color-bg-action-primary-default)` |
| `Background/Status/Danger/Subtle` | `var(--color-bg-status-danger-subtle)` |
| `Border/Focus/Ring` | `var(--color-border-focus-ring)` |
| `Text/OnSolid/Default` | `var(--color-text-on-solid-default)` |
| `Icon/OnSolid` | `var(--color-icon-on-solid)` |
| `Overlay/Hover` | `var(--color-overlay-hover)` |

camelCase segments (`OnSolid`, `OnStatus`, `OnNeutral`, `DangerSecondary`) are
kebab-cased in the stored string. This was previously an open question; it is now
settled in the file itself.

---

## Reading the tables

| Column | Meaning |
|---|---|
| **Token** | Figma variable path. |
| **Alias** | The Primitive it points at. Everything aliases except `Background/Action/Transparent` and five `Overlay/*` tokens, which hold raw alpha values. |
| **Value** | Resolved, for reference only — never hardcode it. |
| **When to use** | The variable's own description, verbatim. |

Components consume semantic tokens only. Reaching past this layer to a primitive
is a house-rule violation — see `CLAUDE.md`.

---

## Background — 40

### Neutral grounds

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Background/Page` | `gray-05` | `#FAFAFC` | The application ground — sits behind everything. Deliberately just off white so `Background/Raised` reads as lifted without depending on shadow alone. Do not use on cards. |
| `Background/Raised` | `gray-00` | `#FFFFFF` | Anything lifted off the page: cards, modals, popovers, menus, sheets. Pair with an elevation shadow and `Border/Subtle`. |
| `Background/Sunken` | `gray-10` | `#F7F7F9` | Inset regions that should read as pushed into the page — input wells, table headers, code blocks, quiet panels. |
| `Background/Muted` | `gray-15` | `#EFEFF2` | Quiet neutral fill for non-interactive furniture: chip grounds, avatar placeholders, skeleton blocks. Not for controls. |
| `Background/Disabled` | `gray-15` | `#EFEFF2` | Fill for disabled non-action controls. Pair with `Text/Disabled` and `Border/Disabled`. Shares a value with `Background/Muted` today; kept separate so the two can diverge. |
| `Background/Inverse` | `gray-100` | `#212128` | Dark ground for tooltips, toasts and dark headers. The only surface that pairs with `Text/Inverse`, `Icon/Inverse`, `Border/Inverse` and the `Overlay/Inverse` washes. |
| `Background/Selected` | `brand-10` | `#EBEBFB` | Persistent selection ground for table rows, nav items and chosen menu options. For selected **and** hovered, composite `Overlay/Hover` on top — there is deliberately no third token. |

> **`Background/Disabled` vs `Background/Action/Disabled`** — same value, different
> role: the first is a disabled *surface*, the second a disabled *control*. Same
> split as `Border/Disabled` vs `Border/Action/Disabled`. Worth an explicit
> decision on whether both are wanted.

### Action ranks

Six ranks. Only the four with a face at rest carry a fill per state; the two ghost
ranks are transparent at rest and stay transparent when disabled.

| Rank | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| `Primary` | `brand-75` `#3C3ADB` | `brand-80` `#302EAF` | `brand-90` `#242383` | → `Action/Disabled` |
| `Secondary` | `gray-00` `#FFFFFF` | `gray-05` `#FAFAFC` | `gray-10` `#F7F7F9` | → `Action/Disabled` |
| `Tertiary` | → `Action/Transparent` | → `Overlay/Hover` | → `Overlay/Pressed` | → `Action/Transparent` |
| `Danger` | `red-70` `#B42419` | `red-80` `#901D14` | `red-90` `#6C160F` | → `Action/Disabled` |
| `DangerSecondary` ⚠️ | `gray-00` `#FFFFFF` | `red-10` `#FDF9F9` | `red-20` `#F7E2E1` | → `Action/Disabled` |
| `DangerTertiary` | → `Action/Transparent` | `red-10` `#FDF9F9` | `red-20` `#F7E2E1` | → `Action/Transparent` |

⚠️ **`DangerSecondary/*` is pending retirement** — all three duplicate other
tokens. See [Pending retirements](#pending-retirements).

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Background/Action/Primary/Default` | `brand-75` | `#3C3ADB` | Fill of the highest-emphasis button — the one action you most want taken. Aim for one per view. Foreground `Text/OnSolid/Default` and `Icon/Current` under `OnSolid`. Edge `Border/Action/Primary/Default`. |
| `Background/Action/Primary/Hover` | `brand-80` | `#302EAF` | Primary button under the pointer. Never substitute an opacity change — the token carries the intended step. |
| `Background/Action/Primary/Pressed` | `brand-90` | `#242383` | Primary button while held down. |
| `Background/Action/Secondary/Default` | `gray-00` | `#FFFFFF` | Fill of the standard secondary button — an opaque white face with `Border/Action/Secondary/Default` around it. Foreground `Text/OnNeutral`. Use when the action is real but not the primary one. |
| `Background/Action/Secondary/Hover` | `gray-05` | `#FAFAFC` | Secondary button under the pointer. |
| `Background/Action/Secondary/Pressed` | `gray-10` | `#F7F7F9` | Secondary button while held down. |
| `Background/Action/Tertiary/Hover` | → `Overlay/Hover` | `#212128` @ 6% | Aliases `Overlay/Hover`, so the ghost button darkens whatever is behind it rather than punching an opaque rectangle. This is why ghost buttons survive on panels, toolbars and coloured banners. |
| `Background/Action/Tertiary/Pressed` | → `Overlay/Pressed` | `#212128` @ 12% | Aliases `Overlay/Pressed`. Same compositing rule — lay it over the existing ground rather than replacing it. |
| `Background/Action/Danger/Default` | `red-70` | `#B42419` | Fill of a destructive primary button: delete, remove, revoke. Reserve for actions that lose data or cannot be undone. |
| `Background/Action/Danger/Hover` | `red-80` | `#901D14` | Destructive primary button under the pointer. |
| `Background/Action/Danger/Pressed` | `red-90` | `#6C160F` | Destructive primary button while held down. |
| `Background/Action/DangerTertiary/Hover` | `red-10` | `#FDF9F9` | Low-emphasis destructive button under the pointer. Opaque rather than a wash because this variant only ever appears on a light ground. |
| `Background/Action/DangerTertiary/Pressed` | `red-20` | `#F7E2E1` | Low-emphasis destructive button while held down. |
| `Background/Action/Transparent` | *(raw)* | `rgba(0,0,0,0)` | Transparent by design — the absence of a fill, not a colour. Used by every rank with no face at rest for **both** its rest and its disabled state. Neutral transparent rather than white-at-zero-alpha, so a hover animating to `Overlay/Hover` does not interpolate through white. |
| `Background/Action/Disabled` | `gray-15` | `#EFEFF2` | Fill of any button whose action is unavailable — every rank that has a face at rest. Pair with `Border/Action/Disabled`, `Text/Disabled` and `Icon/Disabled`. Never fade the enabled fill with opacity. |

### Control fills

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Background/Action/Control/Unchecked/Default` | `gray-00` | `#FFFFFF` | Box or track fill of an unchecked checkbox, radio or toggle. Pair with `Border/Default` so the empty control still has an edge. |
| `Background/Action/Control/Unchecked/Disabled` | `gray-15` | `#EFEFF2` | Unchecked control that cannot be changed. Pair with `Border/Disabled`. |
| `Background/Action/Control/Checked/Default` | `brand-75` | `#3C3ADB` | Box or track fill of a checked checkbox, radio or toggle. The tick or knob uses `Icon/OnSolid`. |
| `Background/Action/Control/Checked/Hover` | `brand-80` | `#302EAF` | Checked control under the pointer — the compound state that is easy to forget and obvious when missing. |
| `Background/Action/Control/Checked/Disabled` | `gray-30` | `#D0D0D9` | Checked but locked. Must stay clearly checked: a muted brand-to-grey step, not the unchecked fill. |

### Status grounds

Two weights per family. `Subtle` is a tint you put text on; `Solid` is a fill you
put on-fill text on.

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Background/Status/Info/Subtle` | `blue-20` | `#E8EDFB` | Informational banners, alerts, soft badges. Pair with `Text/Status/Info`, `Icon/Status/Info`, `Border/Status/Info`. |
| `Background/Status/Info/Solid` | `blue-70` | `#1E4DD7` | Solid badges, toasts, status dots, progress fills. Foreground `Text/OnStatus/Info`. |
| `Background/Status/Success/Subtle` | `green-20` | `#EAF9F0` | Success banners and soft badges. |
| `Background/Status/Success/Solid` | `green-70` | `#32C26B` | Filled success badge, toast, dot. |
| `Background/Status/Warning/Subtle` | `yellow-20` | `#FFF9ED` | Warning banners and soft badges. |
| `Background/Status/Warning/Solid` | `yellow-70` | `#FFC84C` | Filled warning badge. **Light fill** — takes dark text, see `Text/OnStatus/Warning`. |
| `Background/Status/Danger/Subtle` | `red-20` | `#F7E2E1` | Error banners and soft badges. |
| `Background/Status/Danger/Solid` | `red-70` | `#B42419` | Filled error badge, toast, dot. |
| `Background/Status/Neutral/Subtle` | `gray-15` | `#EFEFF2` | Draft, archived, pending — a badge that means nothing in particular. |
| `Background/Status/Neutral/Solid` | `gray-70` | `#777783` | Filled neutral badge or dot. |

---

## Border — 28

### Neutral rungs

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Border/Divider` | `gray-20` | `#E0E0E5` | Rules and separators **only** — between list rows, menu sections, toolbar groups. Split from `Border/Disabled` so divider weight can be tuned without moving every disabled control edge. |
| `Border/Subtle` | `gray-30` | `#D0D0D9` | Quiet container edges: cards, panels, popovers. Pairs with `Background/Raised`. |
| `Border/Default` | `gray-50` | `#B1B1BF` | Standard control edge at rest. For inputs prefer `Border/Field/Default` — it carries the full state set. |
| `Border/Strong` | `gray-70` | `#777783` | Emphasised edge for a control that needs to assert itself, and the hovered step of `Border/Default`. |
| `Border/Disabled` | `gray-30` | `#D0D0D9` | Edge of a non-action control that cannot be used. |
| `Border/Inverse` | `gray-00` | `#FFFFFF` | Edge on a dark ground. Only valid on `Background/Inverse`. |

### Action edges

Each rank tracks its matching fill, so an outlined button and a filled button read
as the same rank.

| Rank | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| `Border/Action/Primary/*` | `brand-75` `#3C3ADB` | `brand-80` `#302EAF` | `brand-90` `#242383` | → `Border/Action/Disabled` |
| `Border/Action/Secondary/*` | `gray-50` `#B1B1BF` ⚠️ | `gray-70` `#777783` | `gray-70` `#777783` | → `Border/Action/Disabled` |
| `Border/Action/Danger/*` | `red-70` `#B42419` | `red-80` `#901D14` | `red-90` `#6C160F` | → `Border/Action/Disabled` |

⚠️ `Border/Action/Secondary/Default` is **2.12:1** against white — below WCAG
1.4.11's 3:1 for non-text UI boundaries, and this edge is the only thing that
makes a secondary button read as a button. Open decision.

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Border/Action/Primary/Default` | `brand-75` | `#3C3ADB` | Edge of a primary button. Tracks the fill exactly, so a filled button's edge is invisible and an outlined one reads as the same rank. |
| `Border/Action/Secondary/Default` | `gray-50` | `#B1B1BF` | Edge of the secondary button — the line that makes it read as a button at all, since its fill is white. |
| `Border/Action/Secondary/Pressed` | `gray-70` | `#777783` | Shares Hover's value deliberately; the fill carries the pressed signal. |
| `Border/Action/Danger/Default` | `red-70` | `#B42419` | Edge of a destructive button, and the outline that gives `Background/Action/DangerTertiary` its shape. |
| `Border/Action/Disabled` | `gray-30` | `#D0D0D9` | Edge of any disabled button that has a face. It does real work: `Background/Action/Disabled` alone is 1.15:1 against a white page. Ghost ranks deliberately get no disabled edge. |

### Field states

**Inputs, textareas and selects use these, not `Border/Default`.**

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Border/Field/Default` | `gray-50` | `#B1B1BF` | Input at rest. Entry point to the full field state set. |
| `Border/Field/Hover` | `gray-70` | `#777783` | Field edge under the pointer, before focus. |
| `Border/Field/Error` | `red-70` | `#B42419` | Validation error. Deliberately full-strength red, not the pale status outline — a 1px edge needs the weight. Pair with `Text/Status/Danger/Default` on the message. |
| `Border/Field/Disabled` | `gray-30` | `#D0D0D9` | Locked input. |

There is no `Border/Field/Focus`: focus uses `Border/Focus/Ring`, and the two
**stack** — a focused invalid field shows the red edge *and* the ring outside it.

### Status outlines and selection

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Border/Status/Info` | `blue-40` | `#A5B8EF` | Outline around an info `Subtle` tint. |
| `Border/Status/Success` | `green-40` | `#ADE7C4` | Outline around a success tint. |
| `Border/Status/Warning` | `yellow-50` | `#FFDE94` | Outline around a warning tint. |
| `Border/Status/Danger` | `red-40` | `#E0A39E` | Outline around an error tint. **Not** for invalid inputs. |
| `Border/Status/Neutral` | `gray-30` | `#D0D0D9` | Outline around a neutral tint. |
| `Border/Selected` | `brand-75` | `#3C3ADB` | Active tab underline, selected card edge, chosen option. Pair with `Background/Selected`. |

### Focus ring

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Border/Focus/Ring` | `Other/Focus state` | `#0066FF` | Keyboard focus on **every** focusable element, no exceptions. Drawn *outside* the control so focusing never shifts layout. Blue rather than brand-violet, so a focused primary button still shows a ring against its own fill. |
| `Border/Focus/Inner` | `gray-00` | `#FFFFFF` | 1px light ring between control and outer ring. Needed on dark and saturated fills where the ring alone blends into the button. |

> ⚠️ The Button's `Focus state` **effect style** does not use these — it binds the
> `Other/Focus state` primitive directly plus a hardcoded `#FFFFFF`, at 3px + 1px
> rather than the 2px recorded here. Outstanding; see the Button audit, Gap F.

---

## Overlay — 7

Translucent layers that composite over whatever is underneath. **The only tokens
in the system carrying an alpha channel.** They are what let a table row, a menu
item, a clickable card and a ghost button share one hover treatment instead of
needing a hover token per surface.

| Token | Value | When to use |
|---|---|---|
| `Overlay/Hover` | `#212128` @ 6% | **The universal hover wash.** Lay it OVER the existing surface rather than swapping that surface's colour — this is what lets rows, list items, menu options, clickable cards and ghost buttons all share one treatment on white, tinted or coloured grounds alike. |
| `Overlay/Pressed` | `#212128` @ 12% | Held-down partner. Same rule: composite, don't replace. |
| `Overlay/Selected` | `#3C3ADB` @ 10% | Persistent selection wash for items on a ground that is not `Background/Page`. When the ground is plain, prefer the opaque `Background/Selected`. |
| `Overlay/Inverse/Hover` | `#FFFFFF` @ 10% | Hover on a dark ground. `Overlay/Hover` is invisible there because it darkens rather than lightens. |
| `Overlay/Inverse/Pressed` | `#FFFFFF` @ 16% | Held-down partner for controls on `Background/Inverse`. |
| `Overlay/Loading` | `#FFFFFF` @ 60% | Blanket over content that is refreshing, so a table or card can grey out in place without unmounting. Spinner above this layer. |
| `Overlay/Scrim` | `#5B5B64` @ 50% | Backdrop behind modals, drawers and bottom sheets. Semi-transparent by design; never a plain background fill. |

---

## Text — 22

### Neutral rungs

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Text/Strong` | `gray-100` | `#212128` | Headings, key figures, the one phrase that must land first. Not for body copy — over-using it flattens the hierarchy. |
| `Text/Regular` | `gray-90` | `#3E3E46` | Body copy, form labels and values. **The default.** |
| `Text/Subtle` | `gray-70` | `#777783` | Captions, helper text, timestamps, secondary metadata. Still passes contrast — it is quiet, not disabled. |
| `Text/Placeholder` | `gray-50` | `#B1B1BF` | The prompt inside an empty input. Separate from `Text/Disabled` so an empty field never reads as a locked one. |
| `Text/Disabled` | `gray-50` | `#B1B1BF` | Text in a control that cannot be used. Never use it merely to de-emphasise — that is `Text/Subtle`. |
| `Text/Inverse` | `gray-00` | `#FFFFFF` | Text on a dark ground. Only valid on `Background/Inverse`. |

> ⚠️ `Text/Disabled` on `Background/Action/Disabled` is **1.85:1**. Disabled
> controls are WCAG-exempt, but this reads as broken. Open decision.

### On action fills

| Token | Alias | Value | Sits on |
|---|---|---|---|
| `Text/OnSolid/Default` | `gray-00` | `#FFFFFF` | `Background/Action/Primary/*` and `.../Danger/*`. Not on Secondary, which is light — that is `Text/OnNeutral`. |
| `Text/OnSolid/Disabled` ⚠️ | `gray-50` | `#B1B1BF` | **Pending retirement — no consumer.** A disabled button is `Background/Action/Disabled`, so its label is `Text/Disabled`. |
| `Text/OnNeutral` | `gray-90` | `#3E3E46` | The white secondary button, and the tertiary label. Deliberately darker than a mid grey, which read as disabled on a white face. |
| `Text/Action/Default` | `brand-75` | `#3C3ADB` | Links and inline actions. Signals "clickable" without a fill. |
| `Text/Action/Hover` | `brand-90` | `#242383` | Interactive text under the pointer. |

### Status text

`Text/Status/*` goes on the **Subtle** tint. `Text/OnStatus/*` goes on the
**Solid** fill. Getting these crossed is the most common error this layer
prevents.

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Text/Status/Info` | `blue-80` | `#183EAC` | Banner copy, badge labels, helper notes on the info tint. |
| `Text/Status/Success` | `green-100` | `#0F3A20` | Success text on its tint. |
| `Text/Status/Warning` | `yellow-100` | `#654D17` | Warning text on its tint. |
| `Text/Status/Danger/Default` | `red-70` | `#B42419` | Form validation messages, destructive confirmations, danger badge labels. The single error-text token. |
| `Text/Status/Danger/Pressed` | `red-90` | `#6C160F` | Error text while an interactive error element is held down. |
| `Text/Status/Neutral` | `gray-90` | `#3E3E46` | Draft, archived, pending. |
| `Text/OnStatus/Info` | `gray-00` | `#FFFFFF` | On the info Solid ground. |
| `Text/OnStatus/Success` | `gray-00` | `#FFFFFF` | On the success Solid ground. |
| `Text/OnStatus/Warning` | `gray-100` | `#212128` | **Dark, not white** — warning's solid is a light yellow and white fails against it. The one family that breaks the pattern. |
| `Text/OnStatus/Danger` | `gray-00` | `#FFFFFF` | On the danger Solid ground. |
| `Text/OnStatus/Neutral` | `gray-00` | `#FFFFFF` | On the neutral Solid ground. |

> **Missing: `Text/Status/Danger/Hover`.** On a secondary-danger hover the border
> darkens to `red-80` while the label stays `red-70`. Outstanding.

---

## Icon — 13

Neutral rungs mirror Text exactly. **Status deliberately does not.** A glyph
carries less visual mass than a run of text at the same value, so status icons sit
one to two steps more saturated. Mirroring Text 1:1 gives a near-black success
tick and a brown warning triangle. Do not "fix" this.

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Icon/Strong` | `gray-100` | `#212128` | Mirrors `Text/Strong`. |
| `Icon/Regular` | `gray-90` | `#3E3E46` | Default glyph colour, matching `Text/Regular`. |
| `Icon/Subtle` | `gray-70` | `#777783` | Chevrons, affordance hints, decorative marks. |
| `Icon/Disabled` | `gray-50` | `#B1B1BF` | Glyph in a control that cannot be used. |
| `Icon/Inverse` | `gray-00` | `#FFFFFF` | On `Background/Inverse`. |
| `Icon/OnSolid` | `gray-00` | `#FFFFFF` | On a filled action, and the tick or knob inside a checked control. |
| `Icon/Action` | `brand-75` | `#3C3ADB` | Brand-coloured interactive glyph. Matches `Text/Action/Default`. |
| `Icon/Status/Info` | `blue-70` | `#1E4DD7` | More saturated than `Text/Status/Info` on purpose. |
| `Icon/Status/Success` | `green-80` | `#289B56` | `green-100` is effectively black at glyph weight. |
| `Icon/Status/Warning` | `yellow-90` | `#A7822E` | `yellow-100` reads brown. |
| `Icon/Status/Danger` | `red-70` | `#B42419` | Red needs no correction at glyph scale. |
| `Icon/Status/Neutral` | `gray-70` | `#777783` | The dot on a draft or archived badge. |
| `Icon/Placeholder` | `red-30` | `#EFCDCB` | The deliberate "you have not swapped this yet" colour for an unfilled icon slot. **The one glyph token that must never take its colour from context.** Never use it on a real icon. |

### Icon context — how a glyph actually gets its colour

**Do not bind a glyph to the tokens above.** Bind it to `Icon/Current`, and let
the component around it choose the meaning.

The glyph in a component is usually two `INSTANCE_SWAP` levels deep, so nothing in
the chain can tell it which rank or state it is in. Instead of pushing colour
down, the glyph reads it from a mode.

| Collection | `Icon context` — 1 variable, 4 modes |
|---|---|
| `Icon/Current` → `var(--color-icon-current)` | scoped `SHAPE_FILL`, `STROKE_COLOR` |
| mode `Default` | → `Icon/Regular` |
| mode `OnSolid` | → `Icon/OnSolid` |
| mode `Danger` | → `Icon/Status/Danger` |
| mode `Disabled` | → `Icon/Disabled` |

The component sets the mode on itself with
`setExplicitVariableModeForCollection`. **State wins over rank** — a disabled
danger button gets `Disabled`, not `Danger`. A glyph placed with no mode set
resolves to `Default`, which is the safe fallback.

Migrated so far: 203 vectors across `Outline icons` and `Extra icons`. **Duotone
icons (90 vectors) are still on the `gray-90` primitive** — they pair a `gray-90`
primary with a `brand-20` secondary, and moving only the primary would give a
white-on-`brand-20` glyph the first time anything set `OnSolid`. They need a
paired `Icon/Current Secondary` first.

---

## Brand/Logo — 3

Not semantic. Three fixed asset colours, candidates to move to the Logo page.

| Token | Value |
|---|---|
| `Brand/Logo/Dark` | `#173647` |
| `Brand/Logo/Green` | `#85EB2E` |
| `Brand/Logo/Purple` | `#4A45EB` |

---

## Pairing quick reference

Pick the ground, read across for everything that sits on it.

| Ground | Text | Icon mode | Edge |
|---|---|---|---|
| `Background/Page` | `Text/Regular` | `Default` | `Border/Divider` |
| `Background/Raised` | `Text/Regular` | `Default` | `Border/Subtle` |
| `Background/Sunken` | `Text/Regular` | `Default` | `Border/Subtle` |
| `Background/Inverse` | `Text/Inverse` | *(bind `Icon/Inverse` directly)* | `Border/Inverse` |
| `Background/Disabled` | `Text/Disabled` | `Disabled` | `Border/Disabled` |
| `Background/Selected` | `Text/Regular` | `Default` | `Border/Selected` |
| `Background/Action/Primary/*` | `Text/OnSolid/Default` | `OnSolid` | `Border/Action/Primary/*` |
| `Background/Action/Secondary/*` | `Text/OnNeutral` | `Default` | `Border/Action/Secondary/*` |
| `Background/Action/Tertiary/*` | `Text/OnNeutral` | `Default` | none |
| `Background/Action/Danger/*` | `Text/OnSolid/Default` | `OnSolid` | `Border/Action/Danger/*` |
| `Background/Action/DangerTertiary/*` | `Text/Status/Danger/Default` | `Danger` | none |
| **Any `*/Disabled`** | `Text/Disabled` | `Disabled` | `Border/Action/Disabled`, or none for ghost ranks |
| `Background/Status/{f}/Subtle` | `Text/Status/{f}` | *(bind `Icon/Status/{f}`)* | `Border/Status/{f}` |
| `Background/Status/{f}/Solid` | `Text/OnStatus/{f}` | `OnSolid` | none |

`{f}` = `Info` · `Success` · `Warning` · `Danger` · `Neutral`.

### Composite rules

Four things this structure expects you to build rather than look up:

1. **Hover on a non-control** — keep the surface, composite `Overlay/Hover` on
   top. There is no `Background/Raised/Hover` and there should never be one.
2. **Selected and hovered** — `Background/Selected` with `Overlay/Hover` over it.
3. **Focused and invalid** — `Border/Field/Error` on the control,
   `Border/Focus/Ring` outside it. They stack; neither replaces the other.
4. **Disabled** — one rule for every rank: `Background/Action/Disabled` +
   `Border/Action/Disabled` + `Text/Disabled` + `Icon/Current` under `Disabled`.
   Ranks with no face at rest keep no fill and no border.

---

## Pending retirements

Live in the file, but duplicated and slated for removal. Do not bind anything new
to these.

| Token | Duplicates |
|---|---|
| `Background/Action/DangerSecondary/Default` | `Background/Action/Secondary/Default` — both `gray-00` |
| `Background/Action/DangerSecondary/Hover` | `Background/Action/DangerTertiary/Hover` — both `red-10` |
| `Background/Action/DangerSecondary/Pressed` | `Background/Action/DangerTertiary/Pressed` — both `red-20` |
| `Text/OnSolid/Disabled` | No consumer; disabled labels use `Text/Disabled` |

A secondary-danger button is a neutral white face with a danger edge and danger
text. It needs no fill rank of its own.

## Not yet tokenised

Needed by components, absent from this collection. Do not improvise a hex or alias
a neighbour that looks close.

| Gap | Detail |
|---|---|
| `Icon/Current Secondary` | The duotone pair. Until it exists, 90 duotone vectors stay on the `gray-90` primitive. Secondary expected around `purple-60`–`purple-70`. |
| `Icon/Status/Danger/{Hover,Pressed}` | `Icon/Status/Danger` is flat; the danger ghost ranks need hover and pressed steps to track their border and label. |
| `Text/Status/Danger/Hover` | `red-80`. See the Text section. |
| `Border/Loading/{Track,TrackOnSolid}` | Spinner tracks. Components currently borrow a hover fill or a disabled border for this. |
| `Action/Floating Circle/*` | Eight FAB states from the deleted collection. **Component** values, not semantic — they belong in a third tier (`Primitives → Semantic → Component`). |

The last row is the general rule: a value that only ever applies to one component
variant does not belong in this layer.

---

## Appendix A — migrating the code layer

`base.css` and `foundations.ts` still define the pre-2026-09 names. The safest
migration is **not** a find-and-replace on token names — it is to regenerate the
custom-property block from the file, since every variable now carries its own CSS
name.

Two hazards if you do map by hand:

- **`Surface/*` no longer exists.** Everything moved to `Background/*`. The old
  code token `Surface/Muted` (`gray-10`) is today's `Background/Sunken`, while a
  *different* token now holds the name `Background/Muted` at `gray-15`.
- **`Border/Subtle` changed value.** The old code token was `gray-20`; the current
  `Border/Subtle` is `gray-30`. `gray-20` is now `Border/Divider`.

Old action-rank names map as: `Action/Secondary/*` → `Background/Action/Secondary/*`,
`Action/TertiaryModal/*` → `Background/Action/Tertiary/*`,
`Action/Danger/Surface*` → `Background/Action/DangerTertiary/*`,
`Action/OnAction/Default` → `Text/OnSolid/Default`.

---

## Re-pulling this document

This file was generated from the variables, not typed. To refresh it after a
change in Figma, re-run this against branch `E7eUpizBfWjk1JSLTGrsfC`:

```javascript
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const sem  = cols.find(c => c.name === "Semantic");
const mode = sem.modes[0].modeId;
const all  = await figma.variables.getLocalVariablesAsync();
const byId = new Map(all.map(v => [v.id, v]));

const hex = c => "#" + [c.r, c.g, c.b]
  .map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("").toUpperCase();

function resolve(v, m) {
  let val = v.valuesByMode[m], alias = null, guard = 0;
  while (val && val.type === "VARIABLE_ALIAS" && guard++ < 8) {
    const nxt = byId.get(val.id);
    if (!nxt) break;
    alias = nxt.name;
    val = nxt.valuesByMode[Object.keys(nxt.valuesByMode)[0]];
  }
  return { alias, value: val && val.r !== undefined ? hex(val) : null };
}

return all
  .filter(v => v.variableCollectionId === sem.id)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(v => ({
    name: v.name,
    css: v.codeSyntax && v.codeSyntax.WEB,
    ...resolve(v, mode),
    doc: v.description
  }));
```

**Read `codeSyntax.WEB` rather than deriving the CSS name** — the two differ by
design.
