---
name: reflect-token-picker
description: Pick the correct Reflect semantic colour token for a thing you are styling. Use whenever the question is "which token do I use for X" — a button fill, a hover state, an input border, an error message, a badge, a disabled control, a modal backdrop, a status icon, a focus ring, a table row hover, a selected item. Also use when reviewing component CSS for wrong or invented token usage, when a component needs a colour that seems to be missing, or when deciding between two tokens that resolve to the same value. Trigger on "which token", "what colour should this be", "is this the right token", "there's no token for", "hover state colour", "how do I style X with tokens".
---

# Reflect Token Picker

Answers one question: **which semantic token goes on this property?**

## Source of record

Figma branch `E7eUpizBfWjk1JSLTGrsfC`, collections **`Semantic`** (113 variables,
one mode) and **`Icon context`** (1 variable, four modes). Each variable carries
its own usage description and its own CSS name.

`src/tokens/semantic-token-map.md` is the full lookup;
`docs/semantic-color-spec.html` is the readable reference copy.

**The code layer has not been migrated to these names.** `base.css` and
`foundations.ts` still carry the pre-2026-09 layer. So:

- Choosing a colour, or designing/reviewing in Figma → use the names here.
- Writing component CSS **today** → pick the token here first, map it to whatever
  `base.css` currently calls it, and say explicitly that the two layers are not
  reconciled. Never invent a `--color-*` name and leave it looking real — an
  undefined custom property fails silently.

**CSS names are stored, not derived.** Read `variable.codeSyntax.WEB`. The Figma
name and the CSS name differ on purpose: `Background/` emits `bg`, so
`Background/Action/Primary/Default` → `var(--color-bg-action-primary-default)`.

---

## The decision path

Four questions, in order. Most lookups end by question three.

### 1. What property are you painting?

The first segment of every token name **is the property**, so this question
answers itself.

| Painting | Group |
|---|---|
| Any fill or ground | **Background** — go to Q2 |
| Words | **Text** |
| A glyph / icon | **Icon** — and see [the icon rule](#icons-do-not-work-like-the-others) |
| An edge, rule, or ring | **Border** |
| A translucent layer over other content | **Overlay** |

### 2. (Backgrounds only) Is the element itself pressable?

| The element | Token shape | Why |
|---|---|---|
| A button, or a checkbox/radio/toggle | `Background/Action/…` | Has a real state machine — needs Default/Hover/Pressed/Disabled |
| A card, page, panel, modal, tooltip, badge, banner | `Background/…` | Static ground |
| A clickable card, table row, menu item, list item | `Background/…` **+ `Overlay/Hover` on top** | Don't swap the ground colour. Composite the wash — that's what makes one hover treatment work on every ground |

> The last row is the rule people get wrong most often. If you find yourself
> wanting `Background/Raised/Hover`, you want `Background/Raised` with
> `Overlay/Hover` over it.

### 3. Which role or rank?

Neutral rung, status family, or an `Action` rank — see the group tables below.

### 4. Which state?

`Hover` · `Pressed` · `Selected` · `Disabled`. No suffix means rest. **State is
always the last segment.** If a token seems to need a state in the middle of its
name, you're reaching for the wrong token.

---

## Pairing table

The most useful table here. Pick the ground, read across.

| Ground | Text | Icon mode | Edge |
|---|---|---|---|
| `Background/Page` | `Text/Regular` | `Default` | `Border/Divider` |
| `Background/Raised` | `Text/Regular` | `Default` | `Border/Subtle` |
| `Background/Sunken` | `Text/Regular` | `Default` | `Border/Subtle` |
| `Background/Inverse` | `Text/Inverse` | bind `Icon/Inverse` | `Border/Inverse` |
| `Background/Selected` | `Text/Regular` | `Default` | `Border/Selected` |
| `Background/Action/Primary/*` | `Text/OnSolid/Default` | `OnSolid` | `Border/Action/Primary/*` |
| `Background/Action/Secondary/*` | `Text/OnNeutral` | `Default` | `Border/Action/Secondary/*` |
| `Background/Action/Tertiary/*` | `Text/OnNeutral` | `Default` | none |
| `Background/Action/Danger/*` | `Text/OnSolid/Default` | `OnSolid` | `Border/Action/Danger/*` |
| `Background/Action/DangerTertiary/*` | `Text/Status/Danger/Default` | `Danger` | none |
| **Any disabled** | `Text/Disabled` | `Disabled` | `Border/Action/Disabled`, or none for ghost ranks |
| `Background/Status/{f}/Subtle` | `Text/Status/{f}` | bind `Icon/Status/{f}` | `Border/Status/{f}` |
| `Background/Status/{f}/Solid` | `Text/OnStatus/{f}` | `OnSolid` | none |

`{f}` = `Info` · `Success` · `Warning` · `Danger` · `Neutral`.

**The two rows that trip people up:** a *Subtle* status ground takes
`Text/Status/{f}`; a *Solid* one takes `Text/OnStatus/{f}`. And
`Text/OnStatus/Warning` is dark, not white — warning's solid is a light yellow.

---

## The disabled rule

One rule, every rank, no exceptions:

```
Background/Action/Disabled + Border/Action/Disabled + Text/Disabled + Icon → Disabled
```

**Ranks with no face at rest keep no face when disabled.** `Tertiary` and
`DangerTertiary` take `Background/Action/Transparent` and get *no* border. A ghost
control that grows a grey box and an edge when you switch it off is louder
disabled than enabled — its disabled state is carried entirely by the text and
glyph colour.

`Border/Action/Disabled` is not decorative on the ranks that do use it:
`Background/Action/Disabled` alone is 1.15:1 against a white page, so the edge is
what keeps the control findable.

---

## Icons do not work like the others

**Never bind a glyph to `Icon/Regular`, `Icon/OnSolid`, `Icon/Status/Danger` or
`Icon/Disabled` directly.** Bind it to **`Icon/Current`** and set a *mode* on the
component around it.

A glyph in a component usually sits two `INSTANCE_SWAP` levels down, so nothing in
the chain can tell it which rank or state it is in. Colour arrives by context
instead:

| Mode on `Icon context` | Resolves to | Set it on |
|---|---|---|
| `Default` | `Icon/Regular` | anything neutral |
| `OnSolid` | `Icon/OnSolid` | Primary and Danger fills, solid status grounds, checked controls |
| `Danger` | `Icon/Status/Danger` | the danger low-emphasis ranks |
| `Disabled` | `Icon/Disabled` | any disabled control |

In Figma: `node.setExplicitVariableModeForCollection(iconContext, modeId)`.
**State wins over rank** — a disabled danger button sets `Disabled`, not `Danger`.
A glyph with no mode set resolves to `Default`, which is the safe fallback.

The rungs (`Icon/Strong`, `Icon/Subtle`, `Icon/Inverse`, `Icon/Action`,
`Icon/Status/{f}`) are still bound directly where the glyph is *not* inside a
context-setting component — a status icon in a banner, for example.

**`Icon/Status/*` deliberately does not mirror `Text/Status/*`.** A glyph carries
less visual mass than a run of text, so status icons sit one to two steps more
saturated. Matching them gives a near-black success tick and a brown warning
triangle. Do not "fix" this.

**`Icon/Placeholder` is the one glyph token that must never take context.** It is
the "you have not swapped this yet" colour. Keeping it loud is its entire job.

---

## Group reference

### Background — grounds and fills (40)

Neutral: `Page` (app ground) · `Raised` (cards, modals, popovers) · `Sunken`
(input wells, table headers) · `Muted` (chips, skeletons) · `Disabled` ·
`Inverse` (tooltips, dark bars) · `Selected`.

Action ranks, each `Default` · `Hover` · `Pressed`:

| Rank | Use it for |
|---|---|
| `Action/Primary/*` | The one action you most want taken. Aim for one per view |
| `Action/Secondary/*` | Standard secondary button — white face, needs `Border/Action/Secondary/*` |
| `Action/Tertiary/*` | Text-only actions, toolbar icon buttons, row actions. **Transparent at rest**, hovers with an `Overlay` wash |
| `Action/Danger/*` | Destructive primary — delete, revoke, remove |
| `Action/DangerTertiary/*` | Low-emphasis destructive — a Delete in a row menu |
| `Action/DangerSecondary/*` | ⚠️ **Pending retirement.** Use `Action/Secondary/*` with a danger edge and danger text |

Plus `Action/Disabled`, `Action/Transparent`, and
`Action/Control/{Unchecked,Checked}/*` for checkbox, radio and toggle.

Status grounds: `Status/{f}/Subtle` (banners, soft badges) and `Status/{f}/Solid`
(filled badges, toasts, dots, progress fills).

### Border (28)

| Family | Use it for |
|---|---|
| `Border/Divider` | Rules and separators only |
| `Border/Subtle` | Card and panel edges |
| `Border/Default` · `/Strong` | Generic control edges |
| `Border/Disabled` · `/Inverse` | Disabled edges; edges on `Background/Inverse` |
| `Border/Action/{Primary,Secondary,Danger}/*` | Button edges — each tracks its matching fill |
| `Border/Action/Disabled` | Every disabled button that has a face |
| `Border/Field/{Default,Hover,Error,Disabled}` | **Inputs, textareas, selects.** Use these, not `Border/Default` |
| `Border/Status/{f}` | Outline around a Subtle-tinted banner or badge |
| `Border/Selected` | Active tab underline, selected card, chosen option |
| `Border/Focus/Ring` · `/Inner` | Keyboard focus — see below |

### Overlay — translucent layers (7)

| Token | Use it for |
|---|---|
| `Overlay/Hover` | **Universal hover wash.** Rows, list items, menu options, clickable cards, ghost buttons |
| `Overlay/Pressed` | Held-down partner |
| `Overlay/Selected` | Selection over a ground that isn't `Background/Page` |
| `Overlay/Inverse/Hover` · `/Pressed` | Hover and press on `Background/Inverse` |
| `Overlay/Loading` | Blanket over refreshing content, spinner above it |
| `Overlay/Scrim` | Modal, drawer and bottom-sheet backdrop |

### Text (22)

Rungs: `Strong` (headings) · `Regular` (body — the default) · `Subtle` (captions,
helper, metadata) · `Placeholder` (empty field prompt) · `Disabled` · `Inverse`.

On fills: `OnSolid/Default` · `OnNeutral` · `Action/Default` · `Action/Hover`.
(`OnSolid/Disabled` is pending retirement — disabled labels use `Text/Disabled`.)

Status: `Status/{Info,Success,Warning,Neutral}`, `Status/Danger/{Default,Pressed}`,
and `OnStatus/{f}` for solid grounds.

---

## Component recipes

**Button** — fill `Background/Action/{rank}/{state}`, label per the pairing table,
edge `Border/Action/{Primary|Secondary|Danger}/{state}`, glyph `Icon/Current` with
the rank's mode, focus `Border/Focus/Ring`. Disabled follows
[the disabled rule](#the-disabled-rule).

**Input** — ground `Background/Raised` (or `Background/Sunken` if inset), edge
`Border/Field/{state}`, prompt `Text/Placeholder`, value `Text/Regular`, error edge
`Border/Field/Error` with the message in `Text/Status/Danger/Default`.

**Checkbox / radio / toggle** — `Background/Action/Control/*` for the box or track,
`Icon/OnSolid` for the tick or knob, `Border/Default` around the unchecked box,
`Border/Focus/Ring` on focus.

**Modal** — `Overlay/Scrim` behind, `Background/Raised` for the dialog,
`Border/Divider` between header/body/footer.

**Table** — header `Background/Sunken`, row separators `Border/Divider`, row hover
`Overlay/Hover`, selected row `Background/Selected`, refreshing `Overlay/Loading`.

**Badge / chip** — soft: `Background/Status/{f}/Subtle` + `Text/Status/{f}` +
`Border/Status/{f}`. Solid: `Background/Status/{f}/Solid` + `Text/OnStatus/{f}`.

**Banner / alert** — `Background/Status/{f}/Subtle` + `Border/Status/{f}` +
`Text/Status/{f}` + `Icon/Status/{f}`.

**Tooltip / toast** — `Background/Inverse` + `Text/Inverse` + `Icon/Inverse`.

---

## Anti-patterns

Each one is a real mistake this structure is built to prevent.

| Don't | Do | Why |
|---|---|---|
| Fake a hover with `opacity` or `filter: brightness()` | Use the `Hover` token | Opacity moves the text and border too, and the result isn't a decision anyone made |
| Swap `Background/Raised` for a darker fill on hover | `Background/Raised` + `Overlay/Hover` on top | One wash works on every ground; a swap needs a token per surface |
| Treat `Action/Tertiary` as white | Leave it transparent | An opaque ghost punches a white rectangle out of panels, toolbars and coloured banners |
| Give a disabled ghost button a grey fill and border | `Background/Action/Transparent`, no border | It would be louder disabled than enabled |
| Bind a glyph straight to `Icon/OnSolid` | `Icon/Current` + the `OnSolid` mode | Direct binding breaks the moment the icon is swapped |
| Use `Icon/Placeholder` on a real icon | A real glyph on `Icon/Current` | The pink is a lint signal, not a colour |
| `Border/Status/Danger` on an invalid input | `Border/Field/Error` | The status outline is a pale tint meant to sit under a tinted banner; it can't carry a 1px edge |
| `Text/Status/Danger/Default` on a solid red fill | `Text/OnStatus/Danger` | Dark red on red |
| White on `Background/Status/Warning/Solid` | `Text/OnStatus/Warning` | Warning's solid is a light yellow; white fails contrast |
| `Icon/Status/*` "corrected" to match `Text/Status/*` | Leave them different | The offset is deliberate |
| `Text/Disabled` to de-emphasise something | `Text/Subtle` | Disabled means unusable, not quiet |
| `Background/Muted` on something pressable | A `Background/Action/*` token | Grounds have no states; you'll be stuck at the first hover |
| Skipping the focus ring on a custom control | `Border/Focus/Ring` | Required on every focusable element, without exception |
| Reaching for a raw primitive (`--color-gray-90`) | The semantic token | Components consume semantic tokens only — house rule in `CLAUDE.md` |

**Focus specifics:** the ring is drawn *outside* the control so focusing never
shifts layout, and it **stacks** rather than replaces — a focused invalid field
shows both `Border/Focus/Ring` and `Border/Field/Error`. Add `Border/Focus/Inner`
on dark or saturated fills. Note the Button's `Focus state` effect style does not
yet use these tokens; see the Button audit.

---

## When there is genuinely no token

Before concluding one is missing, check four things: is it a *composite* you
should build from `Overlay/*`; is it `Selected` rather than `Pressed`; is it an
**icon** problem that a mode already solves; is it a **component**-level value
rather than a semantic one. If it is genuinely absent, say so plainly and propose
the token by name and primitive step — don't hardcode a hex and don't alias a
neighbour that happens to look right.

## Known gaps

Raise these rather than improvising.

| Gap | Detail |
|---|---|
| `Icon/Current Secondary` | The duotone pair. 90 duotone vectors are still on the `gray-90` primitive until it lands. Secondary expected around `purple-60`–`purple-70`. |
| `Icon/Status/Danger/{Hover,Pressed}` | Flat today; the danger ghost ranks need hover and pressed steps to track their border and label. |
| `Text/Status/Danger/Hover` | `red-80`. Secondary-danger hover currently darkens the border but not the label. |
| `Border/Loading/{Track,TrackOnSolid}` | Spinner tracks. Components currently borrow a hover fill or a disabled border. |
| `Action/Floating Circle/*` | Eight FAB states from the deleted collection. **Component** values, not semantic — a third tier (`Primitives → Semantic → Component`). |
| `Brand/Logo/*` | Three fixed asset colours sitting in the semantic layer. Candidates to move to the Logo page. |

Two contrast items are live and unsettled: `Border/Action/Secondary/Default` is
**2.12:1** on white (below the 3:1 needed for a UI boundary), and `Text/Disabled`
on `Background/Action/Disabled` is **1.85:1**.

The general rule: a value that only ever applies to one component variant does not
belong in the semantic layer. Add a component token instead.

## Reading the live values

```javascript
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const col  = cols.find(c => c.name === "Semantic");
const all  = await figma.variables.getLocalVariablesAsync();
return all
  .filter(v => v.variableCollectionId === col.id)
  .map(v => ({ name: v.name, css: v.codeSyntax && v.codeSyntax.WEB, doc: v.description }));
```

File key for the branch: `E7eUpizBfWjk1JSLTGrsfC`.
