# Semantic Token Map

Every token in the Figma `Semantic` collection, the Primitive it aliases, and when to use it.

- **Structure of record:** Figma branch `qR9kXKSyZJ2Z0XivlTcejZ`, collection `Semantic` — 115 variables, one mode.
- **Aliases resolve into:** the `Primitives` collection (untouched by this restructure).
- **Built:** 2026-09-01, replacing the 88-variable semantic collection that was deleted the same day.
- **Code status:** **not migrated.** `base.css` and `foundations.ts` still carry the old names — see [Appendix A](#appendix-a--old-code-token--new-token).

Companion documents: `docs/semantic-color-spec.html` (the rationale — why each gap was closed), the `reflect-token-picker` skill (the decision path — which token for which property), and `figma-mapping.md` (the parity audit trail). This file is the flat lookup the other three point at.

---

## The naming rule

```
Group / Role / State
```

| Segment | What it says |
|---|---|
| **Group** | What you are painting. Six, fixed: `Surface`, `Action`, `Text`, `Icon`, `Border`, `Overlay`. |
| **Role** | Which slot — a neutral rung, a status family, or an action rank. |
| **State** | Optional, **always last**: `Hover` · `Pressed` · `Selected` · `Disabled`. Absent means rest. |

A state never appears mid-name. If the token you want seems to need one in the middle, you are reaching for the wrong token.

`Surface` vs `Action` is the static/dynamic boundary: a **ground** you paint is a Surface, a **control** you press is an Action. Nothing else in the name carries that distinction.

### Deriving the CSS custom property

The Figma path, lowercased, slashes to hyphens:

| Figma | CSS |
|---|---|
| `Surface/Raised` | `var(--color-surface-raised)` |
| `Surface/Status/Info/Subtle` | `var(--color-surface-status-info-subtle)` |
| `Action/Primary/Hover` | `var(--color-action-primary-hover)` |

> ⚠️ **Confirm the camelCase segments before generating CSS.** `OnSolid`, `OnStatus`, `OnNeutral` and `DangerGhost` collapse to `onsolid` / `onstatus` / `onneutral` / `dangerghost` under the rule as written, but the variables carry an explicit WEB code-syntax string set in Figma, which may kebab them (`on-solid`). Read the stored code syntax rather than deriving these four — everything else derives cleanly. Tracked in [Verify before migrating](#verify-before-migrating).

---

## Reading the tables

| Column | Meaning |
|---|---|
| **Token** | Figma variable path in the `Semantic` collection. |
| **Alias** | The Primitive it points at. Nothing in this collection holds a raw hex except where noted. |
| **Value** | The resolved hex, for reference only — never hardcode it. |
| **When to use** | The variable's usage description. |

Components consume semantic tokens only. Reaching past this layer to a primitive (`--color-gray-90`) is a house-rule violation — see `CLAUDE.md`.

---

## Surface — 17

Static grounds. Nothing here reacts to a pointer. Interaction on a surface comes from an `Overlay/*` laid on top, which is why a clickable card needs no token set of its own.

### Neutral ladder

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Surface/Page` | `gray-05` | `#FAFAFC` | The app ground behind everything. Slightly off-white so raised things read as raised. |
| `Surface/Raised` | `gray-00` | `#FFFFFF` | Cards, modals, popovers, menus, sheets. Pairs with an elevation shadow. |
| `Surface/Sunken` | `gray-10` | `#F7F7F9` | Input wells, table headers, code blocks, inset regions. |
| `Surface/Muted` | `gray-15` | `#EFEFF2` | Chip grounds, avatar placeholders, skeleton blocks, progress tracks. |
| `Surface/Disabled` | `gray-15` | `#EFEFF2` | Fill of a disabled control. Shares Muted's value deliberately — kept separate so the two can diverge. |
| `Surface/Inverse` | `gray-100` | `#212128` | Tooltips, toasts, dark bars. The only ground the `*/Inverse` foregrounds are designed against. |

### Selection

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Surface/Selected` | `brand-10` | `#EBEBFB` | Selected table row, active nav item, chosen menu option. Selected **and** hovered composites `Overlay/Hover` on top — no third token. |

### Status grounds

Two weights per family. `Subtle` is a tint you put text on; `Solid` is a fill you put on-fill text on.

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Surface/Status/Info/Subtle` | `blue-20` | `#E8EDFB` | Info banner, alert and soft-badge ground. |
| `Surface/Status/Info/Solid` | `blue-70` | `#1E4DD7` | Filled info badge, toast, status dot, progress fill. |
| `Surface/Status/Success/Subtle` | `green-20` | `#EAF9F0` | Success banner and soft badge. |
| `Surface/Status/Success/Solid` | `green-70` | `#32C26B` | Filled success badge, toast, dot. |
| `Surface/Status/Warning/Subtle` | `yellow-20` | `#FFF9ED` | Warning banner and soft badge. |
| `Surface/Status/Warning/Solid` | `yellow-70` | `#FFC84C` | Filled warning badge. **Light fill** — takes dark text, see `Text/OnStatus/Warning`. |
| `Surface/Status/Danger/Subtle` | `red-20` | `#F7E2E1` | Error banner and soft badge. |
| `Surface/Status/Danger/Solid` | `red-70` | `#B42419` | Filled error badge, toast, dot. |
| `Surface/Status/Neutral/Subtle` | `gray-15` | `#EFEFF2` | Draft, archived, pending, "none" — a badge that means nothing in particular. |
| `Surface/Status/Neutral/Solid` | `gray-70` | `#777783` | Filled neutral badge or dot. |

---

## Action — 27

Fills for things you press. Five ranks, each with the same four states, so no variant is left without feedback.

### Button ranks

| Rank | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| `Action/Primary/*` | `brand-75` `#3C3ADB` | `brand-80` `#302EAF` | `brand-90` `#242383` | `gray-15` `#EFEFF2` |
| `Action/Neutral/*` | `gray-00` `#FFFFFF` | `gray-05` `#FAFAFC` | `gray-10` `#F7F7F9` | `gray-15` `#EFEFF2` |
| `Action/Ghost/*` | `transparent` | → `Overlay/Hover` | → `Overlay/Pressed` | `transparent` |
| `Action/Danger/*` | `red-70` `#B42419` | `red-80` `#901D14` | `red-90` `#6C160F` | `gray-15` `#EFEFF2` |
| `Action/DangerGhost/*` | `transparent` | `red-10` `#FDF9F9` | `red-20` `#F7E2E1` | `transparent` |

| Rank | When to use |
|---|---|
| `Action/Primary` | The one action you most want taken. Aim for one per view. |
| `Action/Neutral` | Standard secondary button — a white face that needs `Border/Neutral/*` to have an edge at all. |
| `Action/Ghost` | Text-only actions, toolbar icon buttons, row actions. **Transparent at rest** — it hovers with an Overlay wash rather than an opaque step, which is what lets it sit on a panel, a toolbar or a coloured banner without punching a white rectangle out of it. |
| `Action/Danger` | Destructive primary — delete, revoke, remove. |
| `Action/DangerGhost` | Low-emphasis destructive — a Delete inside a row menu. Keeps opaque red steps because it only ever appears on a light ground. |

### Selected

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Action/Neutral/Selected` | `brand-10` | `#EBEBFB` | Segmented control, toggle button or tab in its on position. |
| `Action/Ghost/Selected` | `brand-10` | `#EBEBFB` | Same, for the ghost rank. |

### Control fills

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Action/Control/Unchecked/Default` | `gray-00` | `#FFFFFF` | Checkbox box, radio dot well, toggle track — off. |
| `Action/Control/Unchecked/Disabled` | `gray-15` | `#EFEFF2` | Off and locked. |
| `Action/Control/Checked/Default` | `brand-75` | `#3C3ADB` | On. |
| `Action/Control/Checked/Hover` | `brand-80` | `#302EAF` | The compound state — on **and** hovered. |
| `Action/Control/Checked/Disabled` | `gray-30` | `#D0D0D9` | Checked but locked. Must still read as checked, which is why it isn't `gray-15`. |

---

## Overlay — 7

Translucent layers that composite over whatever is underneath. **The only tokens in the system carrying an alpha channel.** They are what let a table row, a menu item, a clickable card and a ghost button share one hover treatment instead of needing a hover token per surface.

| Token | Alias | When to use |
|---|---|---|
| `Overlay/Scrim` | `Other/Blanket` @ 50% | Modal, drawer and bottom-sheet backdrop. An opaque grey would hide the page instead of dimming it. |
| `Overlay/Hover` | `gray-100` @ 6% | **Universal hover wash.** Table rows, list items, menu options, clickable cards, ghost buttons. |
| `Overlay/Pressed` | `gray-100` @ 12% | The same, held down. |
| `Overlay/Selected` | `brand-75` @ 10% | Selection over a ground that isn't `Surface/Page`, where opaque `Surface/Selected` would clash. |
| `Overlay/Inverse/Hover` | `gray-00` @ 10% | Hover on `Surface/Inverse` — dark toolbars, tooltips, dark headers. |
| `Overlay/Inverse/Pressed` | `gray-00` @ 16% | The same, held down. |
| `Overlay/Loading` | `gray-00` @ 60% | Blanket over content mid-refresh, so a table can grey out without unmounting. Spinner sits above it. |

> `Other/Blanket` is a Primitive in the `Other` group. It is most likely `gray-80` (`#5B5B64`) — `figma-mapping.md` records `Color/Focus/Blanket` as `rgba(91, 91, 100, 0.5)`, formalizing the old `Color/Other/Blanket` entry. Confirm against Figma before writing the scrim into CSS.

---

## Text — 22

### Neutral rungs

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Text/Strong` | `gray-100` | `#212128` | Headings, emphasis. |
| `Text/Regular` | `gray-90` | `#3E3E46` | Body copy, labels, values. **The default.** |
| `Text/Subtle` | `gray-70` | `#777783` | Captions, helper text, secondary metadata. Use this — not `Text/Disabled` — to de-emphasise. |
| `Text/Placeholder` | `gray-50` | `#B1B1BF` | Empty-field prompt. Separate from Disabled so an empty field doesn't read as locked. |
| `Text/Disabled` | `gray-50` | `#B1B1BF` | Text of a genuinely unusable control. Never decorative. |
| `Text/Inverse` | `gray-00` | `#FFFFFF` | On `Surface/Inverse`. |

### On action fills

| Token | Alias | Value | Sits on |
|---|---|---|---|
| `Text/OnSolid/Default` | `gray-00` | `#FFFFFF` | `Action/Primary/*`, `Action/Danger/*` |
| `Text/OnSolid/Disabled` | `gray-50` | `#B1B1BF` | `Action/*/Disabled` |
| `Text/OnNeutral` | `gray-90` | `#3E3E46` | `Action/Neutral/*` — a lighter grey reads as disabled on a white button |
| `Text/Action/Default` | `brand-75` | `#3C3ADB` | Ghost buttons, links, inline actions |
| `Text/Action/Hover` | `brand-90` | `#242383` | The same, hovered |

### Status text

`Text/Status/*` goes on the **Subtle** tint. `Text/OnStatus/*` goes on the **Solid** fill. Getting these two crossed is the most common error the pairing table prevents.

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Text/Status/Info` | `blue-80` | `#183EAC` | Text inside an info banner or soft badge. |
| `Text/Status/Success` | `green-100` | `#0F3A20` | Text inside a success banner or soft badge. |
| `Text/Status/Warning` | `yellow-100` | `#654D17` | Text inside a warning banner or soft badge. |
| `Text/Status/Danger/Default` | `red-70` | `#B42419` | Inline validation messages, error banner text. |
| `Text/Status/Danger/Pressed` | `red-90` | `#6C160F` | The pressed state of a danger text link. |
| `Text/Status/Neutral` | `gray-90` | `#3E3E46` | Text inside a neutral badge. |
| `Text/OnStatus/Info` | `gray-00` | `#FFFFFF` | On `Surface/Status/Info/Solid`. |
| `Text/OnStatus/Success` | `gray-00` | `#FFFFFF` | On `Surface/Status/Success/Solid`. |
| `Text/OnStatus/Warning` | `gray-100` | `#212128` | On `Surface/Status/Warning/Solid`. **Dark, not white** — warning's solid is a light yellow and white fails against it. |
| `Text/OnStatus/Danger` | `gray-00` | `#FFFFFF` | On `Surface/Status/Danger/Solid`. |
| `Text/OnStatus/Neutral` | `gray-00` | `#FFFFFF` | On `Surface/Status/Neutral/Solid`. |

---

## Icon — 12

Neutral rungs mirror Text exactly. **Status deliberately does not.** A glyph carries less visual mass than a run of text at the same value, so status icons sit one to two steps more saturated. Mirroring Text 1:1 gives a near-black success tick and a brown warning triangle. Do not "fix" this.

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Icon/Strong` | `gray-100` | `#212128` | Mirrors `Text/Strong`. |
| `Icon/Regular` | `gray-90` | `#3E3E46` | The default glyph colour. |
| `Icon/Subtle` | `gray-70` | `#777783` | Secondary and decorative glyphs. |
| `Icon/Disabled` | `gray-50` | `#B1B1BF` | Glyph in a disabled control. |
| `Icon/Inverse` | `gray-00` | `#FFFFFF` | On `Surface/Inverse`. |
| `Icon/OnSolid` | `gray-00` | `#FFFFFF` | On `Action/Primary/*`, `Action/Danger/*`, and solid status fills. |
| `Icon/Action` | `brand-75` | `#3C3ADB` | Ghost-button glyphs, inline action icons. |
| `Icon/Status/Info` | `blue-70` | `#1E4DD7` | Info glyph — one step lighter than `Text/Status/Info` so the blue reads as blue. |
| `Icon/Status/Success` | `green-80` | `#289B56` | Success glyph. `green-100` is effectively black at glyph weight. |
| `Icon/Status/Warning` | `yellow-90` | `#A7822E` | Warning glyph. `yellow-100` reads brown. |
| `Icon/Status/Danger` | `red-70` | `#B42419` | Error glyph. |
| `Icon/Status/Neutral` | `gray-70` | `#777783` | Neutral status glyph. |

---

## Border — 30

### Neutral rungs

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Border/Divider` | `gray-20` | `#E0E0E5` | Rules and separators **only**. Split out so divider weight can be tuned without moving every disabled control edge. |
| `Border/Subtle` | `gray-30` | `#D0D0D9` | Card and panel edges. |
| `Border/Default` | `gray-50` | `#B1B1BF` | Generic control edges at rest. For inputs use `Border/Field/*` instead. |
| `Border/Strong` | `gray-70` | `#777783` | Emphasis, hovered control edges. |
| `Border/Disabled` | `gray-30` | `#D0D0D9` | Edge of a disabled control. Shares Subtle's value deliberately. |
| `Border/Inverse` | `gray-00` | `#FFFFFF` | On `Surface/Inverse`. |

### Action edges

Each rank tracks its matching fill exactly, so an outlined button and a filled button read as the same rank.

| Rank | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| `Border/Action/*` | `brand-75` `#3C3ADB` | `brand-80` `#302EAF` | `brand-90` `#242383` | `gray-30` `#D0D0D9` |
| `Border/Neutral/*` | `gray-50` `#B1B1BF` | `gray-70` `#777783` | `gray-70` `#777783` | `gray-30` `#D0D0D9` |
| `Border/Danger/*` | `red-70` `#B42419` | `red-80` `#901D14` | `red-90` `#6C160F` | `gray-30` `#D0D0D9` |

### Field states

**Inputs, textareas and selects use these, not `Border/Default`.**

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Border/Field/Default` | `gray-50` | `#B1B1BF` | Input at rest. |
| `Border/Field/Hover` | `gray-70` | `#777783` | Input hovered. |
| `Border/Field/Error` | `red-70` | `#B42419` | Invalid input. Dark enough to carry a 1px edge — `Border/Status/Danger` is not. |
| `Border/Field/Disabled` | `gray-30` | `#D0D0D9` | Locked input. |

There is no `Border/Field/Focus`: focus uses `Border/Focus/Ring`, and the two **stack** — a focused invalid field shows the red edge *and* the ring drawn outside it.

### Status outlines and selection

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Border/Status/Info` | `blue-40` | `#A5B8EF` | Outline around an info `Subtle` tint. |
| `Border/Status/Success` | `green-40` | `#ADE7C4` | Outline around a success tint. |
| `Border/Status/Warning` | `yellow-50` | `#FFDE94` | Outline around a warning tint. |
| `Border/Status/Danger` | `red-40` | `#E0A39E` | Outline around an error tint. **Not** for invalid inputs. |
| `Border/Status/Neutral` | `gray-30` | `#D0D0D9` | Outline around a neutral tint. |
| `Border/Selected` | `brand-75` | `#3C3ADB` | Active tab underline, selected card edge, chosen option. |

### Focus ring

| Token | Alias | Value | When to use |
|---|---|---|---|
| `Border/Focus/Ring` | `Other/Focus state` | `#0066FF` | Keyboard focus on **every** focusable element, no exceptions. 2px, drawn *outside* the control so focusing never shifts layout. Blue rather than brand-violet, so a focused primary button still shows a ring against its own fill. |
| `Border/Focus/Inner` | `gray-00` | `#FFFFFF` | 1px inner ring between control and outer ring. Add on dark or saturated fills, where the outer ring alone blends into the button. |

---

## Pairing quick reference

Pick the ground, read across for everything that sits on it.

| Ground | Text | Icon | Edge |
|---|---|---|---|
| `Surface/Page` | `Text/Regular` | `Icon/Regular` | `Border/Divider` |
| `Surface/Raised` | `Text/Regular` | `Icon/Regular` | `Border/Subtle` |
| `Surface/Sunken` | `Text/Regular` | `Icon/Subtle` | `Border/Subtle` |
| `Surface/Inverse` | `Text/Inverse` | `Icon/Inverse` | `Border/Inverse` |
| `Surface/Disabled` | `Text/Disabled` | `Icon/Disabled` | `Border/Disabled` |
| `Surface/Selected` | `Text/Regular` | `Icon/Action` | `Border/Selected` |
| `Action/Primary/*` | `Text/OnSolid/Default` | `Icon/OnSolid` | `Border/Action/*` |
| `Action/Neutral/*` | `Text/OnNeutral` | `Icon/Regular` | `Border/Neutral/*` |
| `Action/Ghost/*` | `Text/Action/Default` | `Icon/Action` | none |
| `Action/Danger/*` | `Text/OnSolid/Default` | `Icon/OnSolid` | `Border/Danger/*` |
| `Action/DangerGhost/*` | `Text/Status/Danger/Default` | `Icon/Status/Danger` | `Border/Danger/*` |
| `Action/*/Disabled` | `Text/OnSolid/Disabled` | `Icon/Disabled` | `Border/*/Disabled` |
| `Surface/Status/{f}/Subtle` | `Text/Status/{f}` | `Icon/Status/{f}` | `Border/Status/{f}` |
| `Surface/Status/{f}/Solid` | `Text/OnStatus/{f}` | `Icon/OnSolid` | none |

`{f}` = `Info` · `Success` · `Warning` · `Danger` · `Neutral`.

### Composite rules

Three things this structure expects you to build rather than look up:

1. **Hover on a non-control** — keep the surface, composite `Overlay/Hover` on top. There is no `Surface/Raised/Hover` and there should never be one; one wash works on every ground.
2. **Selected and hovered** — `Surface/Selected` with `Overlay/Hover` over it.
3. **Focused and invalid** — `Border/Field/Error` on the control, `Border/Focus/Ring` outside it. They stack; neither replaces the other.

---

## Verify before migrating

The rows above are transcribed from the build record, not exported from the file. Confirm these against Figma before generating CSS.

| # | Item | What to check |
|---|---|---|
| 1 | **Code syntax for camelCase segments** | `OnSolid`, `OnStatus`, `OnNeutral`, `DangerGhost` — read the WEB code-syntax string stored on the variable rather than deriving it. |
| 2 | **`Other/Blanket` base hex** | `Overlay/Scrim` aliases it at 50%. `figma-mapping.md` records `Color/Focus/Blanket` as `rgba(91, 91, 100, 0.5)` — Gray/80 @ 50% — and describes it as formalizing the old `Color/Other/Blanket` entry. Confirm the two are the same primitive. |
| 3 | **Leaf naming on four groups** | `Text/OnSolid/Default`, `Text/Action/Default`, `Border/Focus/Ring`, `Action/Control/{Checked,Unchecked}/Default` — the spec page renders these without the trailing `Default`/`Ring`. The group counts only reconcile to 115 with the leaf segments present, so those are used here, but confirm the literal strings. |
| 4 | **`Status/` segment** | `Text/Status/Info`, `Icon/Status/Info`, `Surface/Status/Info/Subtle` — the spec page abbreviates the `Status/` folder away in places. |

Pull all 115 rows straight from the file rather than retyping from here:

```javascript
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const col  = cols.find(c => c.name === "Semantic");
const all  = await figma.variables.getLocalVariablesAsync();
return all
  .filter(v => v.variableCollectionId === col.id)
  .map(v => ({ name: v.name, doc: v.description, syntax: v.codeSyntax, values: v.valuesByMode }));
```

---

## Open decisions

Four values that are live but not settled. Raise them rather than working around them.

| Decision | Detail |
|---|---|
| `Action/DangerGhost/Hover` | `red-10` is `#FDF9F9` — a 2% wash that will not read as a hover. `red-20` (`#F7E2E1`) is the first visible tint. Recommended: hover `red-20`, pressed `red-30`. |
| Disabled text contrast | `Text/Disabled` (`gray-50`) on `Surface/Disabled` (`gray-15`) lands near 2:1. Disabled controls are exempt from WCAG but this looks broken. Darken text to a `gray-60` step, or lighten the surface to `gray-10`. |
| Does `Surface/Page` leave white? | `gray-05` is what makes cards read as raised without leaning on shadow alone. If the product is meant to be flat white, cards need a border and `Surface/Raised` becomes decorative. |
| Warning's solid weight | The only family whose on-fill text is dark. Confirm a light-yellow filled badge is wanted at all, rather than keeping warning tint-only. |

## Not yet tokenised

Needed by components, absent from this collection. Do not improvise a hex or alias a neighbour that looks close.

| Gap | Detail |
|---|---|
| `Icon/Duotone` | Sidebar duotone icons need a secondary layer, expected around `purple-60`–`purple-70` (`#8567D2`–`#6741C7`). Confirm the step with the design lead. |
| `Icon/Placeholder` | Placeholder imagery uses `#FF808C`. There is **no Pink family** in Primitives — a new primitive scale has to land first. |
| `Logo/*` | Hardcoded today. Decide whether to tokenise or keep them on the Logo page. |
| `Action/Floating Circle/*` | Eight FAB states existed in the deleted collection. They are **component** values, not semantic ones, and belong in a third tier (`Primitives → Semantic → Component`) — which is why they were not carried over. |

The last row is the general rule: a value that only ever applies to one component variant does not belong in this layer.

---

## Appendix A — old code token → new token

`foundations.ts` and `base.css` still define the left column. Nothing on the left exists in Figma any more. **Two names are reused with different meanings** — marked ⚠️ — so a find-and-replace on those two will silently produce the wrong colour.

### Text

| Old code token | New token | Value change |
|---|---|---|
| `Text/Strong` | `Text/Strong` | — |
| `Text/Primary` | `Text/Regular` | — |
| `Text/Secondary` | `Text/Subtle` | — |
| `Text/Disabled` | `Text/Disabled` | — (new sibling `Text/Placeholder` shares the value) |
| `Text/Inverse` | `Text/Inverse` | — |
| `Text/Link`, `Text/Action` | `Text/Action/Default` | — (the two merge) |
| `Text/LinkHover` | `Text/Action/Hover` | — |
| `Text/Danger` | `Text/Status/Danger/Default` | — |
| `Text/Success` | `Text/Status/Success` | — |
| `Text/Warning` | `Text/Status/Warning` | — |
| `Text/Info` | `Text/Status/Info` | — |
| `Text/OnSolid` | `Text/OnSolid/Default` | — |
| `Text/OnWarningSolid` | `Text/OnStatus/Warning` | `gray-90` → `gray-100` |

New in this layer: `Text/Placeholder`, `Text/OnSolid/Disabled`, `Text/OnNeutral`, `Text/Status/Danger/Pressed`, `Text/Status/Neutral`, `Text/OnStatus/{Info,Success,Danger,Neutral}`.

### Icon

Every old `Icon/*` aliased its `Text/*` counterpart and had no independent value. That coupling is gone.

| Old code token | New token | Value change |
|---|---|---|
| `Icon/Primary` | `Icon/Regular` | — |
| `Icon/Secondary` | `Icon/Subtle` | — |
| `Icon/Disabled` | `Icon/Disabled` | — |
| `Icon/Inverse` | `Icon/Inverse` | — |
| `Icon/Action` | `Icon/Action` | — |
| `Icon/Danger` | `Icon/Status/Danger` | — |
| `Icon/Success` | `Icon/Status/Success` | `green-100` → `green-80` |
| `Icon/Warning` | `Icon/Status/Warning` | `yellow-100` → `yellow-90` |
| `Icon/Info` | `Icon/Status/Info` | `blue-80` → `blue-70` |

New: `Icon/Strong`, `Icon/OnSolid`, `Icon/Status/Neutral`.

### Surface

| Old code token | New token | Value change |
|---|---|---|
| `Surface/Base`, `Surface/Raised` | `Surface/Raised` | — (the two merge; they held the same value) |
| `Surface/Subtle` | `Surface/Page` | — |
| ⚠️ `Surface/Muted` (`gray-10`) | `Surface/Sunken` | — **but `Surface/Muted` still exists in the new layer at `gray-15`.** Do not map by name. |
| `Surface/Disabled` | `Surface/Disabled` | — |
| `Surface/Selected` | `Surface/Selected` | — |

New: `Surface/Inverse`, `Surface/Muted` (at `gray-15`), and all ten `Surface/Status/*`.

### Border

| Old code token | New token | Value change |
|---|---|---|
| ⚠️ `Border/Subtle` (`gray-20`) | `Border/Divider` | — **but `Border/Subtle` still exists in the new layer at `gray-30`.** Do not map by name. |
| `Border/Default` | `Border/Default` | — |
| `Border/Strong` | `Border/Strong` | — |
| `Border/Disabled` | `Border/Disabled` | `gray-50` → `gray-30` |
| `Border/Selected` | `Border/Selected` | — |
| `Border/Danger` | `Border/Danger/Default` | — |
| `Border/Focus` | `Border/Focus/Ring` | — |
| `Border/Info` | `Border/Status/Info` | `blue-70` → `blue-40` |
| `Border/Warning` | `Border/Status/Warning` | `yellow-70` → `yellow-50` |
| `Border/Success` | `Border/Status/Success` | `green-70` → `green-40` |
| `Focus/Ring` | `Border/Focus/Ring` | — (folds into Border) |
| `Focus/Inner` | `Border/Focus/Inner` | — |

New: `Border/Subtle` (at `gray-30`), `Border/Inverse`, the hover/pressed/disabled steps on all three action ranks, all four `Border/Field/*`, `Border/Status/{Danger,Neutral}`.

### Action

| Old code token | New token | Value change |
|---|---|---|
| `Action/Primary/{Default,Hover,Pressed}` | same | — |
| `Action/Primary/Disabled` | `Action/Primary/Disabled` | `brand-50` → `gray-15` |
| `Action/Primary/Icon` | `Icon/OnSolid` | — (moves group) |
| `Action/Secondary/{Default,Hover,Pressed}` | `Action/Neutral/{Default,Hover,Pressed}` | — |
| `Action/Secondary/Text` | `Text/OnNeutral` | `gray-50` → `gray-90` |
| `Action/Secondary/Border` | `Border/Neutral/Default` | `rgba(60,58,219,.24)` → `gray-50` |
| `Action/TertiaryModal/*` | `Action/Ghost/*` | code-only tokens with no Figma counterpart; the ghost rank replaces them with Overlay washes |
| `Action/Danger/{Default,Hover,Pressed,Disabled}` | same | — |
| `Action/Danger/{Surface,SurfaceHover,SurfacePressed}` | `Action/DangerGhost/{Default,Hover,Pressed}` | code-only rgba values → `transparent` / `red-10` / `red-20` |
| `Action/Danger/Border` | `Border/Danger/Default` | `rgba(210,120,114,.55)` → `red-70` |
| `Action/OnAction/Default` | `Text/OnSolid/Default` | — |
| `Action/OnAction/Disabled` | `Text/OnSolid/Disabled` | — |

New: the whole `Action/Ghost/*` rank, `Action/Neutral/Disabled`, `Action/DangerGhost/Disabled`, both `*/Selected`, all five `Action/Control/*`.

### Status/* → split across three groups

The old `Status/{family}/*` group had six sub-roles per family. They redistribute:

| Old sub-role | New home |
|---|---|
| `Status/{f}/Surface` | `Surface/Status/{f}/Subtle` |
| `Status/{f}/Solid` | `Surface/Status/{f}/Solid` |
| `Status/{f}/Outline` | `Border/Status/{f}` |
| `Status/{f}/Text` | `Text/Status/{f}` |
| `Status/{f}/OnSolid` | `Text/OnStatus/{f}` |
| `Status/{f}/Indicator` | `Icon/Status/{f}` |

The `Error` family renames to `Danger` throughout. The `Outline` steps carry over unchanged; the `Surface`, `Solid`, `Text` and `Indicator` steps mostly move — check each against the tables above rather than assuming.
