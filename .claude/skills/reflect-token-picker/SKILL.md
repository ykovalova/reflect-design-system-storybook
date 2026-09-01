---
name: reflect-token-picker
description: Pick the correct Reflect semantic colour token for a thing you are styling. Use whenever the question is "which token do I use for X" — a button fill, a hover state, an input border, an error message, a badge, a disabled control, a modal backdrop, a status icon, a focus ring, a table row hover, a selected item. Also use when reviewing component CSS for wrong or invented token usage, when a component needs a colour that seems to be missing, or when deciding between two tokens that resolve to the same value. Trigger on "which token", "what colour should this be", "is this the right token", "there's no token for", "hover state colour", "how do I style X with tokens".
---

# Reflect Token Picker

Answers one question: **which semantic token goes on this property?**

## Source of record

The structure is the **`Semantic`** collection in Figma branch `qR9kXKSyZJ2Z0XivlTcejZ` — 115 variables, each aliased to a Primitive and carrying its own usage description. `docs/semantic-color-spec.html` in this repo is the readable reference copy.

**The code layer has not been migrated to these names yet.** `base.css` and `foundations.ts` still carry the previous semantic layer. So:

- When the task is **choosing** a colour, or designing/reviewing in Figma → use the names in this skill.
- When the task is **writing component CSS today** → pick the token here first, then map it to whatever the current `base.css` name is, and say explicitly in your answer that the two layers haven't been reconciled. Never invent a `--color-*` name that isn't in `base.css` and leave it looking real — an undefined custom property fails silently to `transparent` or `inherit`.

CSS name = the Figma path, lowercased, slashes to hyphens: `Surface/Status/Info/Subtle` → `var(--color-surface-status-info-subtle)`.

---

## The decision path

Four questions, in order. Most lookups end by question three.

### 1. What are you painting?

| Painting | Group |
|---|---|
| A background | **Surface** or **Action** — go to Q2 |
| Words | **Text** |
| A glyph / icon | **Icon** — *not* Text; the status values deliberately differ |
| An edge, rule, or ring | **Border** |
| A translucent layer over other content | **Overlay** |

### 2. (Backgrounds only) Is the element itself pressable?

| The element | Group | Why |
|---|---|---|
| A button, or a checkbox/radio/toggle | **Action** | Has a real state machine — needs Default/Hover/Pressed/Disabled |
| A card, page, panel, modal, tooltip, badge, banner | **Surface** | Static ground |
| A clickable card, table row, menu item, list item | **Surface** + `Overlay/Hover` **on top** | Don't swap the surface colour. Composite the wash — that's what makes one hover treatment work on every ground |

> The last row is the rule people get wrong most often. If you find yourself wanting `Surface/Raised/Hover`, you want `Surface/Raised` with `Overlay/Hover` over it.

### 3. Which role?

Neutral rung, status family, or action rank — see the group tables below.

### 4. Which state?

`Hover` · `Pressed` · `Selected` · `Disabled`. No suffix means rest. **State is always the last segment.** If a token you want seems to need a state in the middle of its name, you're reaching for the wrong token.

---

## Pairing table

The most useful table here. Pick the ground, read across for everything that sits on it.

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

**The two rows that trip people up:** a *Subtle* status ground takes `Text/Status/{f}`; a *Solid* one takes `Text/OnStatus/{f}`. And `Text/OnStatus/Warning` is dark, not white — warning's solid fill is a light yellow.

---

## Group reference

### Surface — static grounds (17)

| Token | Use it for |
|---|---|
| `Surface/Page` | The app ground behind everything |
| `Surface/Raised` | Cards, modals, popovers, menus, sheets |
| `Surface/Sunken` | Input wells, table headers, code blocks |
| `Surface/Muted` | Chip grounds, avatar placeholders, skeletons |
| `Surface/Disabled` | Fill of a disabled control |
| `Surface/Inverse` | Tooltips, toasts, dark headers |
| `Surface/Selected` | Selected row, active nav item, chosen option |
| `Surface/Status/{f}/Subtle` | Banner, alert and soft-badge grounds |
| `Surface/Status/{f}/Solid` | Solid badges, toasts, status dots, progress fills |

### Action — pressable fills (27)

Five ranks, each with `Default` · `Hover` · `Pressed` · `Disabled`:

| Rank | Use it for |
|---|---|
| `Action/Primary/*` | The one action you most want taken. Aim for one per view |
| `Action/Neutral/*` | Standard secondary button — white face, needs `Border/Neutral/*` |
| `Action/Ghost/*` | Text-only actions, toolbar icon buttons, row actions. **Transparent at rest** |
| `Action/Danger/*` | Destructive primary — delete, revoke, remove |
| `Action/DangerGhost/*` | Low-emphasis destructive — a Delete inside a row menu |

`Action/Neutral/Selected` and `Action/Ghost/Selected` cover segmented controls, toggle buttons and active tabs.

Controls: `Action/Control/Unchecked/{Default,Disabled}` and `Action/Control/Checked/{Default,Hover,Disabled}` for checkbox, radio and toggle.

### Overlay — translucent layers (7)

| Token | Use it for |
|---|---|
| `Overlay/Scrim` | Modal, drawer and bottom-sheet backdrop |
| `Overlay/Hover` | **Universal hover wash.** Rows, list items, menu options, clickable cards, ghost buttons |
| `Overlay/Pressed` | Held-down partner to the above |
| `Overlay/Selected` | Selection over a ground that isn't `Surface/Page` |
| `Overlay/Inverse/Hover` · `/Pressed` | Hover and press on `Surface/Inverse` |
| `Overlay/Loading` | Blanket over refreshing content, spinner above it |

### Text (22)

Rungs: `Strong` (headings) · `Regular` (body — the default) · `Subtle` (captions, helper, metadata) · `Placeholder` (empty field prompt) · `Disabled` · `Inverse`.

On fills: `OnSolid/Default` · `OnSolid/Disabled` · `OnNeutral` · `Action/Default` · `Action/Hover`.

Status: `Status/{Info,Success,Warning,Neutral}`, `Status/Danger/{Default,Pressed}`, and `OnStatus/{f}` for solid grounds.

### Icon (12)

Mirrors Text's neutral rungs — `Strong`, `Regular`, `Subtle`, `Disabled`, `Inverse`, `OnSolid`, `Action`.

**`Icon/Status/*` deliberately does not mirror `Text/Status/*`.** A glyph carries less visual mass than a run of text, so status icons sit one to two steps more saturated. Matching them would give you a near-black success tick and a brown warning triangle. Do not "fix" this.

### Border (30)

| Family | Use it for |
|---|---|
| `Border/Divider` | Rules and separators only |
| `Border/Subtle` | Card and panel edges |
| `Border/Default` · `/Strong` | Generic control edges |
| `Border/Disabled` · `/Inverse` | Disabled edges; edges on `Surface/Inverse` |
| `Border/Action/*` · `/Neutral/*` · `/Danger/*` | Button edges — each tracks its matching fill exactly |
| `Border/Field/{Default,Hover,Error,Disabled}` | **Inputs, textareas, selects.** Use these, not `Border/Default` |
| `Border/Status/{f}` | Outline around a Subtle-tinted banner or badge |
| `Border/Selected` | Active tab underline, selected card, chosen option |
| `Border/Focus/Ring` · `/Inner` | Keyboard focus — see below |

---

## Component recipes

**Button** — fill `Action/{rank}/{state}`, label per the pairing table, edge `Border/{Action|Neutral|Danger}/{state}`, focus `Border/Focus/Ring`.

**Input** — ground `Surface/Raised` (or `Surface/Sunken` if inset), edge `Border/Field/{state}`, prompt `Text/Placeholder`, value `Text/Regular`, error edge `Border/Field/Error` with the message in `Text/Status/Danger/Default`.

**Checkbox / radio / toggle** — `Action/Control/*` for the box or track, `Icon/OnSolid` for the tick or knob, `Border/Default` around the unchecked box, `Border/Focus/Ring` on focus.

**Modal** — `Overlay/Scrim` behind, `Surface/Raised` for the dialog, `Border/Divider` between header/body/footer.

**Table** — header `Surface/Sunken`, row separators `Border/Divider`, row hover `Overlay/Hover`, selected row `Surface/Selected`, refreshing `Overlay/Loading`.

**Badge / chip** — soft: `Surface/Status/{f}/Subtle` + `Text/Status/{f}` + `Border/Status/{f}`. Solid: `Surface/Status/{f}/Solid` + `Text/OnStatus/{f}`.

**Banner / alert** — `Surface/Status/{f}/Subtle` + `Border/Status/{f}` + `Text/Status/{f}` + `Icon/Status/{f}`.

**Tooltip / toast** — `Surface/Inverse` + `Text/Inverse` + `Icon/Inverse`.

---

## Anti-patterns

Check component CSS against these. Each one is a real mistake this structure is built to prevent.

| Don't | Do | Why |
|---|---|---|
| Fake a hover with `opacity` or `filter: brightness()` | Use the `Hover` token | Opacity changes the text and border too, and the result isn't a design decision anyone made |
| `Surface/Raised` swapped for a darker surface on hover | `Surface/Raised` + `Overlay/Hover` on top | One wash works on every ground; a swap needs a token per surface |
| Treat `Action/Ghost/Default` as white | Leave it transparent | An opaque ghost button punches a white rectangle out of panels, toolbars and coloured banners |
| `Border/Status/Danger` on an invalid input | `Border/Field/Error` | The status outline is a pale tint meant to sit under a tinted banner; it can't carry a 1px edge |
| `Text/Status/Danger/Default` on a solid red fill | `Text/OnStatus/Danger` | Dark red on red |
| White on `Surface/Status/Warning/Solid` | `Text/OnStatus/Warning` | Warning's solid is a light yellow; white fails contrast |
| `Icon/Status/*` "corrected" to match `Text/Status/*` | Leave them different | The offset is deliberate — see the Icon section |
| `Text/Disabled` to de-emphasise something | `Text/Subtle` | Disabled means unusable, not quiet. Using it decoratively makes real disabled states unreadable |
| `Surface/Muted` on something pressable | An `Action/*` token | Surfaces have no states; you'll be stuck at the first hover |
| Skipping the focus ring on a custom control | `Border/Focus/Ring` | Required on every focusable element, without exception |
| Reaching for a raw primitive (`--color-gray-90`) | The semantic token | Components consume semantic tokens only — a house rule in `CLAUDE.md` |

**Focus specifics:** the ring is 2px drawn *outside* the control so focusing never shifts layout, and it **stacks** rather than replaces — a focused invalid field shows both `Border/Focus/Ring` and `Border/Field/Error`. Add `Border/Focus/Inner` on dark or saturated fills, where the outer ring alone can blend into the button.

---

## When there is genuinely no token

Before concluding one is missing, check three things: is the state a *composite* you should build from `Overlay/*` rather than a new token; is it `Selected` rather than `Pressed`; is it a **component**-level value rather than a semantic one. If it's genuinely absent, say so plainly and propose the token by name and primitive step — don't hardcode a hex and don't alias a neighbouring token that happens to look right.

## Open gaps carried over

Four items inherited from the retired `reflect-semantic-color-advisor` that the current `Semantic` collection does **not** resolve. Raise these rather than improvising a colour or aliasing a neighbour that looks close.

| Gap | Detail |
|---|---|
| `Icon/Duotone` | Sidebar duotone icons need a secondary layer, expected around Purple/60–70 (`#8567D2`–`#6741C7`). No token exists — confirm the exact step with the design lead. |
| `Icon/Placeholder` | Placeholder imagery uses `#FF808C`. There is **no Pink scale** in Primitives, so a new primitive family has to land before a semantic token can alias it. |
| `Logo/*` | Logo mark colours are hardcoded today. Decide with the design lead whether to tokenise them or keep them on the Logo page only. |
| `Action/Floating Circle/*` | Eight FAB states existed in the previous semantic collection, deleted 2026-09-01. They are **component** values, not semantic ones — they belong in a third tier (`Primitives → Semantic → Component`), which is why they were deliberately not carried over. |

The last row states the general rule: a value that only ever applies to one component variant does not belong in the semantic layer. If you are about to add one, add a component token instead.

## Reading the live values

```javascript
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const col = cols.find(c => c.name === "Semantic");
const all = await figma.variables.getLocalVariablesAsync();
const mine = all.filter(v => v.variableCollectionId === col.id);
// each variable's `description` carries its usage guidance
return mine.map(v => ({ name: v.name, doc: v.description }));
```

File key for the branch: `qR9kXKSyZJ2Z0XivlTcejZ`.
