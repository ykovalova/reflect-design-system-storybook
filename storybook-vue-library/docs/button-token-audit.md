# Button — token audit

Audit of the tokens applied to the Button component in Figma, and the fine-tuning
proposed for the semantic layer as a result.

- **Date:** 2026-09-10
- **Source:** Figma branch `E7eUpizBfWjk1JSLTGrsfC`, frame `Button` (`558:3397`)
- **Scope:** every variant node in the frame — 6 variants × 3 sizes × 6 states,
  text and icon-only. Token bindings read per node; no code was changed.
- **Code status:** **not transferred.** These tokens do not exist in `base.css` or
  `foundations.ts` yet, and are not expected to until the gaps below are closed.

Companion documents: `../src/tokens/semantic-token-map.md` (the flat lookup),
`semantic-color-spec.html` (the rationale), `../src/tokens/figma-mapping.md`
(the parity trail). **All three currently describe a structure the Button does not
use** — see [Gap K](#k-the-recorded-structure-and-the-applied-structure-differ).

---

## What is bound

46 unique tokens.

| Group | Applied |
|---|---|
| `Background/Action/` | `Primary/{Default,Hover,Pressed}` · `Danger/{Default,Hover,Pressed}` · `Secondary/{Default,Hover,Pressed,Disabled}` · `Tertiary/{Default,Hover,Pressed,Disabled}` · `DangerSecondary/{Default,Hover,Pressed}` · `DangerTertiary/{Default,Hover,Pressed}` · `Disabled` (rank-less) |
| `Border/Action/` | `Primary/{D,H,P}` · `Secondary/{D,H,P}` · `Danger/{D,H,P,Disabled}` · `Disabled` (rank-less) |
| `Text/` | `OnSolid/Default` · `OnNeutral` · `Disabled` · `Status/Danger/{Default,Pressed}` |
| `Icon/` | `Placeholder` · `Regular` · `Status/Danger` |
| Primitives, bound directly | `Color/Gray/gray-00` · `Color/Other/Focus state` |
| Non-colour | `Typography/Button/{Medium,Small}` · `Typography/Body/{Body 1,Body 2}/Medium` · `Spacing/spc-{6,8,12}` · `Radius/{r-4,r-64}` · effect style `Focus state` |

The shape is **property-first**: `Background` / `Border` / `Text` / `Icon` × role ×
rank × state.

---

## Decided

### The disabled model — universal foreground, fill only where there is a face

**Agreed 2026-09-10.** Disabled is one rule across all six variants:

> Disabled is always `Background/Action/Disabled` + `Border/Action/Disabled` +
> `Text/Disabled` + `Icon/Disabled`. Ranks with no fill at rest keep no fill when
> disabled.

| Variant | Disabled fill | Disabled edge | Label / glyph |
|---|---|---|---|
| Primary | `Background/Action/Disabled` | `Border/Action/Disabled` | `Text/Disabled` · `Icon/Disabled` |
| Primary Danger | `Background/Action/Disabled` | `Border/Action/Disabled` | same |
| Secondary | `Background/Action/Disabled` | `Border/Action/Disabled` | same |
| Secondary Danger | `Background/Action/Disabled` | `Border/Action/Disabled` | same |
| Tertiary | `Background/Action/Transparent` | — | same |
| Tertiary Danger | `Background/Action/Transparent` | — | same |

**Applied in Figma 2026-09-10.** Semantic collection 114 → 113 variables.

| | Token |
|---|---|
| Added | `Background/Action/Transparent` (`VariableID:10685:33`, `rgba(0,0,0,0)`) — state-free, serves ghost rest *and* ghost disabled |
| Deleted | `Background/Action/Tertiary/Default` · `Background/Action/DangerTertiary/Default` — both raw `#FFFFFF00`, both replaced by the above after a 52-page scan confirmed zero remaining consumers |
| Kept | `Background/Action/Disabled` (`gray-15`) · `Border/Action/Disabled` (`gray-30`) |

52 variant nodes rebound: 16 faced-rank disabled onto the two Disabled tokens, 9
ghost disabled onto Transparent with their strokes removed, 27 ghost rest / focused
/ loading states onto Transparent.

**Three of the tokens this audit planned to "retire" turned out not to exist.**
`Background/Action/Secondary/Disabled`, `Background/Action/Tertiary/Disabled` and
`Border/Action/Danger/Disabled` are absent from the Semantic collection and from
the Variables panel, but `getVariableByIdAsync` still resolved them and the Button
still rendered their values — they were **orphaned**: deleted during the
2026-09-01 rebuild while node bindings kept referencing them. Seven Button
variants were pointing at these ghosts. That is invisible in the UI, uneditable,
and would have transferred as a hardcoded value. All seven are now on live tokens.

Also corrected in passing: Primary Danger / Disabled's edge was not unbound as this
audit first recorded — it was bound to `Background/Action/Disabled`, a
`FRAME_FILL`-scoped *fill* token applied to a stroke, which is why it rendered
`gray-15` on `gray-15` and read as no edge at all.

**Why the two ghost ranks are exempt from the fill.** Fully universal disabled was
considered and rejected. It does not remove the transparent value from the
collection — Tertiary's *rest* state needs it regardless — so it saves no token,
and it costs three things:

1. A tertiary button is chrome-less at rest. Turning it off would give it a fill
   *and* an edge it never had enabled: disabled would advance rather than recede.
2. The XS variant is an icon-only modal close `×` at 24px. A grey bordered square
   behind it reads as a filled control, not a dimmed affordance.
3. `Border/Action/Disabled` exists to keep a disabled *filled* button findable —
   `Background/Action/Disabled` is 1.15:1 against a white page on its own. A ghost
   button has no fill to rescue; its disabled state is carried entirely by
   `Text/Disabled` and `Icon/Disabled`.

Material, Carbon, Fluent and Ant all keep text/ghost buttons transparent when
disabled.

**Detail for whoever creates the token:** the current transparent value is
`#FFFFFF00` — white at zero alpha, not a neutral transparent. It renders
identically today, but a ghost hover animating from rest to `Overlay/Hover`
interpolates through white. Set `Background/Action/Transparent` to `rgba(0,0,0,0)`
or alias `gray-100 @ 0%`.

**Bindings to correct in the file as part of this:** Primary Danger / Disabled has
no border bound at all; Tertiary Danger / Disabled binds the opaque
`Background/Action/Disabled` plus a border. Both move onto the model above.

### Icon colour — context modes

**Agreed 2026-09-10. Applied as a Button-scoped pilot.**

The glyph sits two swaps deep — Button exposes three `INSTANCE_SWAP` properties
(Left icon, Right icon, Slot Icon only) onto an `Icon ` wrapper set
(`Size=14/16/20`), which exposes *another* swap onto the glyph itself. Nothing in
that chain carries rank or state, so no button could ever tell its icon to be
white. Colour therefore has to arrive by context, not by binding.

> Every glyph binds one variable, `Icon/Current`. The component around it selects
> the meaning by setting a mode on the `Icon context` collection.

| Collection | `Icon context` (`VariableCollectionId:10690:33`) |
|---|---|
| `Icon/Current` (`VariableID:10690:34`) | scoped `SHAPE_FILL`, `STROKE_COLOR` |
| mode `Default` | → `Icon/Regular` |
| mode `OnSolid` | → `Icon/OnSolid` |
| mode `Danger` | → `Icon/Status/Danger` |
| mode `Disabled` | → `Icon/Disabled` |

Mode per Button variant — state wins over rank, so a disabled danger button gets
the disabled glyph:

| Rank | Rest / Hover / Pressed / Focused / Loading | Disabled |
|---|---|---|
| Primary, Primary Danger | `OnSolid` | `Disabled` |
| Secondary, Tertiary | `Default` | `Disabled` |
| Secondary Danger, Tertiary Danger | `Danger` | `Disabled` |

Applied:

- 150 Button variants moded — 45 Default · 40 OnSolid · 40 Danger · 25 Disabled
- 197 glyph overrides in the Button rebound off `Icon/Placeholder`
- **203 icon vectors** across `Outline icons` and `Extra icons` rebound off the
  `Color/Gray/gray-90` primitive onto `Icon/Current`
- `Placeholder` restored to `Icon/Placeholder` — see below

Verified end to end with a real icon (`Search-Ultimate`) instanced under each of
the four modes: dark grey, white on the brand fill, red, pale grey.

**The placeholder deliberately does *not* use this mechanism.** It was briefly
bound to `Icon/Current` during the pilot, which made it render as a convincing
real icon and destroyed the one thing it exists to do — shout that a slot has not
been swapped. It is back on `Icon/Placeholder`. The rule is the inverse of
everything else here: real glyphs take their colour from context, the placeholder
never does.

**Why not per-variant overrides.** The alternative was overriding the nested
vector's fill in each variant. It is ~150 variants × up to two slots, it has to be
repeated for every future component that puts an icon on a coloured face, and
Figma matches overrides by layer structure — so swapping in a multi-layer icon
silently drops the colour. That is essentially the pattern that produced the
current state. A colour variant on the `Icon ` wrapper was also rejected: the
wrapper does not own the glyph's fill, so it would mean duplicating the icon
library per colour.

**A glyph placed with no mode set resolves to `Default`**, which is the safe
fallback — nothing renders invisibly.

**Duotone icons were deliberately left out** — see [Gap D](#d-duotone-icons-are-still-on-a-primitive).

### Naming shape — property-first

**Agreed 2026-09-10.** The file's shape is authoritative; the docs get rewritten.

```
Group / Role / Rank / State
```

Six top-level groups: `Background` · `Border` · `Text` · `Icon` · `Overlay` ·
`Brand/Logo`. The first segment names **what you are painting**, not what it
means. `Surface` and `Action` are no longer top-level: a static ground is
`Background/Raised`, a pressable fill is `Background/Action/Primary/Default`.

**Why, over the documented `Surface`/`Action` shape.** Take one button's face and
its edge. Under the old shape they are `Action/Primary/Default` and
`Border/Action/Primary/Default` — the fill is special-cased and the pair does not
rhyme, so you have to remember that fills omit the property. Property-first gives
`Background/Action/Primary/Default` and `Border/Action/Primary/Default`: parallel,
and each token names its CSS property first.

**`Overlay/*` stays top-level** despite breaking the rule. Every overlay is
technically a background with alpha, but it is the only family in the system
carrying an alpha channel, and a visible group name is a useful warning that these
composite rather than paint. A deliberate, documented exception.

**`Brand/Logo/*` also breaks it** — three fixed logo colours that were never
resolved as semantic. Recommend moving them out to the Logo page; not yet decided.

#### CSS emission

The Figma name and the CSS name are deliberately allowed to differ.
`--color-background-action-primary-default` is 41 characters; every variable now
carries an explicit **WEB code syntax** string so code gets `--color-bg-*`
instead:

| Figma | CSS |
|---|---|
| `Background/Action/Primary/Default` | `--color-bg-action-primary-default` |
| `Background/Status/Danger/Subtle` | `--color-bg-status-danger-subtle` |
| `Border/Focus/Ring` | `--color-border-focus-ring` |
| `Text/OnSolid/Default` | `--color-text-on-solid-default` |
| `Text/OnStatus/Warning` | `--color-text-on-status-warning` |
| `Icon/OnSolid` | `--color-icon-on-solid` |
| `Overlay/Hover` | `--color-overlay-hover` |

Applied to all 114 variables across both collections, none unmapped. **This
settles "Verify before migrating" item 1** in `semantic-token-map.md`: the
camelCase segments `OnSolid`, `OnStatus`, `OnNeutral` and `DangerSecondary` are no
longer derived and guessed at — they are stored explicitly, kebab-cased. Read
`variable.codeSyntax.WEB` rather than transforming the name.

One wrinkle it exposes: `Background/Action/DangerSecondary/Default` emits
`--color-bg-action-danger-secondary-default`, which is indistinguishable from a
hypothetical `Danger/Secondary` nesting. Another reason to retire that rank
([Gap A](#a-danger-sub-ranks-duplicate-the-neutral-ones)).

---

## Open gaps

### A. Danger sub-ranks duplicate the neutral ones

`DangerSecondary/Default` (`#FFFFFF`) equals `Secondary/Default`, and the component
uses them interchangeably *within one variant*: Secondary Danger's Default state
binds `Secondary/Default`, its Focused state binds `DangerSecondary/Default`.
`DangerSecondary/{Hover,Pressed}` equal `DangerTertiary/{Hover,Pressed}`.

The rank carries no value of its own — a secondary-danger button is a neutral face
with a danger edge and danger text.

**Propose:** delete `Background/Action/DangerSecondary/*` (3 tokens). Secondary
Danger uses `Background/Action/Secondary/Default` at rest and shares the danger
wash pair with Tertiary Danger.

### B. Neutral tertiary hovers with alpha; danger tertiary hovers opaque

`Tertiary/Hover` is `#2121280F` — exactly `gray-100 @ 6%`, the `Overlay/Hover`
value in the map — and `Tertiary/Pressed` is `@ 12%` = `Overlay/Pressed`. But
`DangerTertiary/Hover` is `#FDF9F9`, opaque.

An opaque ghost punches a near-white rectangle when it sits on a toolbar, a banner
or a tinted panel.

**Correction from inspection:** the neutral side is already right.
`Overlay/Hover` and `Overlay/Pressed` exist in the collection, and
`Background/Action/Tertiary/{Hover,Pressed}` already alias them — the audit's
original "register Overlay/*" proposal was based on the stale map, not the file.
Only the danger side is asymmetric.

**Propose:** either mint `red-70 @ 6%/12%` alphas for
`Background/Action/DangerTertiary/{Hover,Pressed}`, or keep them opaque and write
"light grounds only" into the variable description — the neutral rank already
documents its own compositing rule and the danger rank should say why it differs.

Separately, `#FDF9F9` is `red-10`, a 2% wash that will not read as a hover. Already
an open decision at `semantic-token-map.md:339`; the file has shipped the
unresolved side of it. **Recommend hover → `red-20`, pressed → `red-30`.**

### C. Text — one missing state, one dead token, one misnamed

- **No `Text/Status/Danger/Hover`.** On Secondary Danger hover the border darkens
  to `red-80` while the label stays `red-70`. Add it at `red-80`.
- **`Text/OnSolid/Disabled` has no consumer** — every disabled variant uses
  `Text/Disabled`, because a disabled primary is grey, not a solid fill. Retire it.
- **`Text/OnNeutral` also paints the Tertiary label**, which has no fill to be "on".
  Rename (`Text/Action/Neutral`) or widen the description to cover both ranks.
- The pairing table at `semantic-token-map.md:290` gives ghost buttons
  `Text/Action/Default` (brand violet). Figma says grey. Figma is authoritative;
  the table is wrong.

### D. Duotone icons are still on a primitive

Outline and Extra icons are done — 203 vectors moved onto `Icon/Current`, see
[Icon colour — context modes](#icon-colour--context-modes). **Duotone icons
(90 vectors) were left on `Color/Gray/gray-90` on purpose.**

A duotone glyph is two layers: a primary on `gray-90` and a secondary on
`brand-20`. Moving only the primary onto a context token means that the first time
anything sets `OnSolid`, you get a white primary against an unchanged `brand-20`
secondary — a broken glyph. Duotone needs a *paired* token set that moves both
layers together, and `semantic-token-map.md` already records `Icon/Duotone` as not
yet tokenised, expecting a secondary around `purple-60`–`purple-70`.

**Propose:** add a second context variable (`Icon/Current Secondary`) resolving
per mode alongside the first, then migrate all 90 duotone vectors as one pair.
Until then duotone icons render exactly as they do today — the default mode
resolves to `Icon/Regular`, which is `gray-90`, so nothing has changed for them.

Separately, `Icon/Status/Danger` is still a single flat token; the danger ghost
ranks need `{Default,Hover,Pressed}` (`red-70/80/90`) to track their border and
label, which would become three modes behind `Icon/Current` rather than three
tokens.

### E. Loading has no tokens of its own

Four variants, four stand-ins, none meaning "spinner":

| Variant | Arc | Track |
|---|---|---|
| Primary | `Color/Gray/gray-00` *(primitive)* | — |
| Primary Danger | `Color/Gray/gray-00` | `Background/Action/Danger/Hover` — a hover colour used as a track |
| Tertiary Danger | `Icon/Status/Danger` | `Border/Action/Disabled` |
| Secondary Danger · Tertiary | `Icon/Status/Danger` · `Icon/Regular` | — |

**Propose:** the arc needs no new token — it is the rank's foreground
(`Icon/OnSolid` / `Icon/Regular` / `Icon/Status/Danger/Default`). The track needs
one pair: `Border/Loading/Track` (`gray-30`) for light faces,
`Border/Loading/TrackOnSolid` (`gray-00 @ 30%`) for solid ones.

The loading variants carry no typography token, so the label appears to be swapped
out for the spinner. Frame width holds at 118px so the box does not jump — confirm
that is intended rather than a detached label.

### F. Focus is an effect style sitting on a primitive

`Focus state` = `DROP_SHADOW spread 3, color: Color/Other/Focus state` +
`DROP_SHADOW spread 1, color: #FFFFFF`. The outer ring binds a **primitive**; the
inner ring is a **literal hex**. Neither `Border/Focus/Ring` nor
`Border/Focus/Inner` is reachable from the component.

Geometry also disagrees with the docs: the map specifies a 2px ring, Figma ships
3px + 1px inner, and applies the white inner ring to white secondary buttons where
it is invisible but still consumes a pixel.

**Correction from inspection:** `Border/Focus/Ring` (aliasing `Other/Focus state`)
and `Border/Focus/Inner` (aliasing `gray-00`) **already exist**. Nothing needs
creating — the effect style simply bypasses them.

**Propose:** rebind the `Focus state` effect's two drop shadows onto those
variables via `setBoundVariableForEffect`, and correct the map to 3px/1px unless
2px is intended.

For transfer awareness, the current code does a third thing — a violet
`outline: 2px solid var(--color-action-primary-default)` plus a 4px `box-shadow`
(`src/components/Button/Button.vue:371`) — which exists nowhere in the design.

### G. Two typography ramps in one component

| Variants | Medium | Small |
|---|---|---|
| Primary, Primary Danger | `Typography/Button/Medium` — 14/16, **weight 600** | `Button/Small` — 12/16, 600 |
| Secondary, Secondary Danger, Tertiary, Tertiary Danger | `Typography/Body/Body 1/Medium` — 14/**20**, **weight 500** | `Body 2/Medium` — 12/18, 500 |

Two weights and two line-heights in one component, and line-height drives the box —
16 vs 20 at the same size is not cosmetic.

**Propose:** the button always uses `Typography/Button/*`. If secondary genuinely
wants a lighter weight, add `Typography/Button/{Medium,Small} Regular` siblings
rather than reaching into the Body ramp.

### H. Radius

`Radius/r-4` everywhere except **Primary icon-only** (medium *and* small, including
loading), which binds `Radius/r-64` — the only place in the frame. Primary Danger,
Secondary and Tertiary icon-only all bind `r-4`. The rendered node does not read as
a pill, so the `r-64` is likely bound to a wrapper rather than the visible face;
either way two ranks of the same icon-only button sit on different radius tokens.

The code has already guessed: `border-radius: 50%` for all icon-only buttons
(`src/components/Button/Button.vue:251`), wrong for three of four ranks whichever
way this resolves.

The button also binds the **primitive** radius step directly. `Radius/Action/Default
→ r-4` is the token that would let button roundness move on its own.

### I. Spacing

Medium and Small: `spc-12` inline + `spc-8` gap. XS: `spc-8` + `spc-6`.
Primary/Small binds only `spc-12` — its gap is unbound. Code uses `--space-16` for
medium padding, a 4px disagreement that will surface at transfer. Primitive spacing
consumed directly is a much smaller problem than colour; leave it unless
`Spacing/Action/*` is wanted.

### J. Contrast

| Pair | Ratio | Note |
|---|---|---|
| `Border/Action/Secondary/Default` `#B1B1BF` on `#FFFFFF` | **2.12:1** | Below WCAG 1.4.11's 3:1 for non-text UI boundaries — and this edge is the only thing that makes a secondary button a button. Hover's `gray-70` passes at 4.0:1. Recommend `gray-60`–`gray-70` at rest. |
| `Text/Disabled` `#B1B1BF` on `Background/Action/Disabled` `#EFEFF2` | **1.85:1** | Disabled is WCAG-exempt, but this is the open decision at `semantic-token-map.md:340`. Reads as broken rather than as disabled. |

### K. The three docs still teach the old shape

The shape itself is **decided** — see
[Naming shape — property-first](#naming-shape--property-first). What remains is
that `semantic-token-map.md`, `semantic-color-spec.html` and the
`reflect-token-picker` skill all describe `Surface/*` and `Action/*` as top-level
groups, which no longer exist. `figma-mapping.md`'s semantic sections are older
still, auditing a collection deleted in 2026-09-01.

Anyone reading those three today will reach for tokens that are not in the file.
**This is the blocking item for `$component-transfer-gate`** — not the Figma side,
which is now internally consistent, but the documentation the gate checks against.

**Propose:** regenerate all three from the file rather than editing them by hand.
Every variable now carries its name, description, alias and WEB code syntax, so
the map can be produced mechanically and will not drift again.

---

## Net change to the token set

Revised against the file as inspected on 2026-09-10. Six tokens the first pass
proposed adding already existed; three it proposed retiring were already orphaned.

### Done (2026-09-10)

| | Tokens |
|---|---|
| Added (2) | `Background/Action/Transparent` (Semantic) · `Icon/Current` in the new `Icon context` collection, 4 modes |
| Deleted (2) | `Background/Action/Tertiary/Default` · `Background/Action/DangerTertiary/Default` |
| Rebound (453 nodes) | 52 for the disabled model — all disabled variants, all ghost rest/focused/loading, seven off orphaned tokens, Primary Danger's edge off a fill token; 197 glyph overrides off `Icon/Placeholder`; 203 Outline + Extra icon vectors off the `gray-90` primitive; `Placeholder` restored to `Icon/Placeholder` |
| Moded (150 variants) | 45 Default · 40 OnSolid · 40 Danger · 25 Disabled |

Semantic collection: 114 → 113. New `Icon context` collection: 1 variable.
`Icon/Placeholder` is once again the only thing that renders placeholder pink.

### Still outstanding

| | Tokens |
|---|---|
| **Add (4)** | `Text/Status/Danger/Hover` · `Border/Loading/{Track,TrackOnSolid}` · `Icon/Current Secondary` (for duotone) |
| **Retire (4)** | `Background/Action/DangerSecondary/{Default,Hover,Pressed}` · `Text/OnSolid/Disabled` |
| **Rebind (5)** | **90 duotone vectors, as a pair with their secondary layer** · primary spinner arcs off `Color/Gray/gray-00` · Primary Danger's spinner track off `Background/Action/Danger/Hover` · Tertiary Danger's track off `Border/Action/Disabled` · the `Focus state` effect onto `Border/Focus/{Ring,Inner}` · Secondary Danger's rest fill onto one token across all states |
| **Split** | `Icon/Status/Danger` → `{Default,Hover,Pressed}`, as modes behind `Icon/Current` |

**Net when complete: +2 variables overall** — `Background/Action/Transparent` and
`Icon/Current` — after which the Button, and every other icon consumer, stops
touching primitives.

### Noticed while inspecting

The collection carries two parallel disabled pairs: `Background/Action/Disabled` +
`Border/Action/Disabled` (used by the Button) and `Background/Disabled` +
`Border/Disabled` (used by non-Action controls). Each pair aliases the same
primitives — `gray-15` and `gray-30`. That may be deliberate, so a control and a
surface can diverge later, but it is a fourth naming axis nobody has written down,
and it is the kind of near-duplicate that produced this audit's orphans. Worth an
explicit decision.

---

## Still to decide

| # | Decision | Gap |
|---|---|---|
| 1 | One typography ramp — `Button/*` everywhere, or `Body/*` everywhere? | G |
| 2 | Danger ghost hover — `red-20`/`red-30`, or keep the invisible `red-10`? | B |
| 3 | Primary icon-only radius — is `r-64` intentional, or a stray binding? | H |
| 4 | `Border/Action/Secondary/Default` at 2.12:1 — darken, or accept? | J |
| 5 | Confirm property-first as the agreed naming shape, unblocking the doc rewrite | K |

---

## Notes

The Figma variant is named `Tetriary (modals)` — a typo that will propagate into
any Code Connect mapping.

The code has seven variants where Figma has six: `Button.vue` splits `tertiary`
from `tertiary-modal`, and renders `tertiary` as a zero-padding underlined text
link that exists nowhere in the design.
