---
name: reflect-semantic-color-advisor
description: Advisory skill for the Reflect Design System semantic color library. Use whenever the user asks about semantic color tokens, proposes adding or changing tokens, asks about color library structure or gaps, wants to audit the library, asks which token to use for a component property, or discusses the Storybook token approach. Also trigger for questions like "which token should I use for X", "is this structure correct", "what's missing from the color library", "how do I style this component with tokens", or anything touching Option A vs Option B color organization.
---

# Reflect Semantic Color Advisor

## Context

The Reflect Design System branch (`BT833nDww47dQ17CA5FTFg`) has a semantic color library with ~96 tokens across: Text, Icon, Surface, Border, Action, Status, and Focus groups. A full structural audit was completed in August 2026.

**Figma variable collections:**
- Semantic: `VariableCollectionId:9556:119`
- Global: `VariableCollectionId:98:1207`

**Global palette scales:** Gray (00–100), Brand (05–100), Red (02–100), Green (02–100), Yellow (02–100), Blue (02–100), Purple (02–100). No Pink scale exists yet.

---

## Structural Principles

### The two organizational paradigms

**Option A — Property-first** ✅ recommended for Storybook
Tokens organized by CSS property type. Each semantic intent gets full coverage across all properties:
- `Color/Text/Danger`, `Color/Icon/Danger`, `Color/Border/Danger`, `Color/Surface/Danger`

Maps naturally to CSS — developers look up by what they're styling. Every line of component CSS self-documents its intent. Best fit for Storybook.

**Option B — Intent-first**
Tokens organized by semantic meaning:
- `Color/Status/Error/Text`, `Color/Status/Error/Border`, `Color/Status/Error/Surface`

Better for component-specific workflows (all error tokens in one place), but creates redundancy with standalone intent tokens unless the system commits to it fully.

**The Reflect library currently runs both in parallel — this is the root structural problem.** The Status group uses Option B; Text/Icon/Border/Surface use Option A. Neither is complete, which is why gaps keep appearing.

### Why Option A is correct for Storybook

CSS variables map to properties, not components. Every declaration is self-documenting:

```css
.button--danger {
  background: var(--color-action-danger-default);  /* destructive action surface */
  color: var(--color-text-on-solid);               /* text on filled background */
  border: none;
}
.button--danger:hover    { background: var(--color-action-danger-hover); }
.button--danger:active   { background: var(--color-action-danger-pressed); }
.button--danger:disabled { background: var(--color-action-danger-disabled); color: var(--color-text-disabled); }
.button--danger:focus-visible { outline: 2px solid var(--color-focus-ring); }
```

When dark mode arrives, only the token values change — no component code changes. If component-specific tokens are needed later, add them as a third tier on top: `Global → Semantic (Option A) → Component tokens`.

---

## Known Structural Flaws

### 1. Icon tokens alias Text tokens — zero independent meaning
All 9 Icon tokens chain through their Text counterpart before reaching a global:
`Color/Icon/Danger → Color/Text/Danger → Color/Red/70`

The Icon layer adds no semantic value. If icon and text colors ever need to diverge (dark mode, icon-only contexts, themed states), this structure makes it impossible without breaking text at the same time. Both Text and Icon should alias global colors directly and happen to share the same value today.

### 2. Two parallel systems for status coloring
Neither system is complete, forcing components to mix them:

| Intent | Property-first | Status group |
|---|---|---|
| Danger text | `Color/Text/Danger` ✓ | `Color/Status/Error/Text` ✓ (aliases the other — redundant) |
| Danger border | `Color/Border/Danger` ✓ | `Color/Status/Error/Border` — missing |
| Danger surface | — missing | `Color/Status/Error/Surface` ✓ |
| Danger solid | — missing | `Color/Status/Error/Solid` ✓ |

**Recommended path:** Commit to Option A (property-first). Add the missing Surface/Danger, Solid/Danger, Indicator/Danger tokens to complete the matrix. Deprecate the Status group gradually.

### 3. "Error" vs "Danger" — same color, two names
Text, Icon, Border, and Action all say "Danger". Status says "Error". They resolve to the same global (Red/70). If keeping both names, document the distinction:
- **Danger** = destructive action intent (delete buttons, warning icons, destructive text)
- **Error** = validation/form state (field borders, error badges, inline messages)

Otherwise, unify on one name across the whole library.

### 4. Component-specific token in the semantic layer
`Color/Action/Floating Circle/Closed/*` and `Color/Action/Floating Circle/Opened/*` are states for one specific button variant (the FAB). Semantic tokens must be component-agnostic — these should move to a component token layer. Their presence sets a bad precedent for every future component variant.

### 5. Focus/Blanket is misplaced
`Color/Focus/Blanket → Color/Blanket` is an overlay/scrim color used for modal backdrops — not a focus state. It should be `Color/Surface/Overlay`. It ended up in Focus because it was referenced in the focus component, not because it belongs there conceptually.

### 6. Surface/Raised = Surface/Base (identical values)
Both resolve to Gray/00 (#FFFFFF). If intentional — elevation communicated via shadow rather than color — document it explicitly so it doesn't look like a mistake. If not intentional, Raised should map to a slightly elevated tone.

### 7. Typos baked into token names
These are live in the library and will propagate into component pages if not fixed before the rework finishes:
- `Color/Border/Disbabled` → `Color/Border/Disabled`
- `Color/Action/Primary/Disbabled` → `Color/Action/Primary/Disabled`
- `Color/Action/Secondary/Pressed 2` → remove or rename to a valid state

---

## Missing Tokens (confirmed gaps)

| Token | Alias target | Hex | Priority | Notes |
|---|---|---|---|---|
| `Color/Surface/Inverse` | `Color/Gray/100` | `#212128` | 🔴 High | Dark tooltip background + top bar dark mode |
| `Color/Icon/Duotone` | `Color/Purple/60` or `/70` | `#8567D2–#6741C7` | 🔴 High | Sidebar duotone icon secondary layer — confirm exact Purple step with Design Lead |
| `Color/Surface/Overlay` | `Color/Blanket` | `#5B5B64` | 🟡 Medium | Rename/move from Focus/Blanket — modal backdrops, dropdowns |
| `Color/Icon/Placeholder` | New global needed | `#FF808C` | 🟡 Medium | Placeholder imagery icon — no matching global exists, needs new Pink scale entry |
| `Color/Surface/Danger` | `Color/Red/30` | `#EFCDCB` | 🔵 Low | Completes property-first matrix; can reference Status/Error/Surface value |
| `Color/Logo/*` group | New globals needed | Various | 🔵 Low | Logo mark colors — decide with Design Lead: tokenize or keep hardcoded on Logo page only |

---

## Full Token Reference

### Text (14)

| Token | → Global | Hex |
|---|---|---|
| Strong | Gray/100 | #212128 |
| Primary | Gray/90 | #3E3E46 |
| Secondary | Gray/70 | #777783 |
| Disabled | Gray/50 | #B1B1BF |
| Inverse | Gray/00 | #FFFFFF |
| Link | Brand/75 | #3C3ADB |
| LinkHover | Brand/90 | #242383 |
| Action | Brand/75 | #3C3ADB |
| Danger | Red/70 | #B42419 |
| Success | Green/100 | #0F3A20 |
| Warning | Yellow/100 | #654D17 |
| Info | Blue/80 | #183EAC |
| OnSolid | Gray/00 | #FFFFFF |
| OnWarningSolid | Gray/90 | #3E3E46 |

### Icon (9) — all alias Text counterparts ⚠️

Primary → Text/Primary | Secondary → Text/Secondary | Disabled → Text/Disabled | Inverse → Text/Inverse | Action → Text/Action | Danger → Text/Danger | Success → Text/Success | Warning → Text/Warning | Info → Text/Info

### Surface (6)

| Token | → Global | Hex | Note |
|---|---|---|---|
| Base | Gray/00 | #FFFFFF | |
| Subtle | Gray/05 | #FAFAFC | |
| Muted | Gray/10 | #F7F7F9 | |
| Disabled | Gray/15 | #EFEFF2 | |
| Raised | Gray/00 | #FFFFFF | ⚠️ Same as Base |
| Selected | Brand/10 | #EBEBFB | |

### Border (10)

Subtle → Gray/20 | Default → Gray/50 | Strong → Gray/70 | Disabled* → Gray/50 | Selected → Brand/75 | Danger → Red/70 | Focus → #0066FF | Info → Blue/70 | Warning → Yellow/70 | Success → Green/70

*Spelled "Disbabled" in the live library

### Action — Primary (5)

Default → Brand/75 #3C3ADB | Hover → Brand/80 #302EAF | Pressed → Brand/90 #242383 | Disabled* → Brand/50 #A3A2EE | Icon → Icon/Inverse → #FFFFFF

*Spelled "Disbabled" in the live library

### Action — Secondary (5)

Default → Surface/Base #FFFFFF | Hover → Surface/Subtle #FAFAFC | Pressed → Surface/Muted #F7F7F9 | Pressed 2* → Surface/Muted (⚠️ duplicate) | Text → Gray/50 #B1B1BF

*"Pressed 2" is not a valid state — likely an accidental duplicate

### Action — Danger (4)

Default → Red/70 #B42419 | Hover → Red/80 #901D14 | Pressed → Red/90 #6C160F | Disabled → Surface/Disabled #EFEFF2

### Action — OnAction (2)

Default → Text/OnSolid | Disabled → Text/Disabled

### Action — Floating Circle ⚠️ component token in semantic layer

Closed: Default → Brand/75 | Hover → Brand/80 | Pressed → Brand/90 | Icon → Text/OnSolid
Opened: Default → Gray/20 | Hover → Gray/40 | Pressed → Gray/50 | Icon → Text/OnSolid

### Status (5 groups × 5 tokens = 25)

Each of Neutral, Info, Success, Warning, Error has: Surface, Text, Indicator, Solid, OnSolid.
Missing from each group: Border (use standalone `Color/Border/*` tokens instead for now).

### Focus (3)

Ring → #0066FF | Inner → Gray/00 #FFFFFF | Blanket → #5B5B64 (⚠️ misplaced — should be Surface/Overlay)

---

## Component Styling Guide

### Button variants — token mapping

**Primary:**

```css
background:          Color/Action/Primary/Default   → #3C3ADB
background:hover     Color/Action/Primary/Hover     → #302EAF
background:active    Color/Action/Primary/Pressed   → #242383
background:disabled  Color/Action/Primary/Disabled  → #A3A2EE
color:               Color/Text/OnSolid             → #FFFFFF
icon:                Color/Icon/Inverse             → #FFFFFF
focus outline:       Color/Focus/Ring               → #0066FF
```

**Secondary:**

```css
background:          Color/Action/Secondary/Default → #FFFFFF
background:hover     Color/Action/Secondary/Hover   → #FAFAFC
background:active    Color/Action/Secondary/Pressed → #F7F7F9
color:               Color/Text/Primary             → #3E3E46
border:              Color/Border/Default           → #B1B1BF
icon:                Color/Icon/Primary             → #3E3E46
```

**Danger:**

```css
background:          Color/Action/Danger/Default    → #B42419
background:hover     Color/Action/Danger/Hover      → #901D14
background:active    Color/Action/Danger/Pressed    → #6C160F
background:disabled  Color/Action/Danger/Disabled   → #EFEFF2
color:               Color/Text/OnSolid             → #FFFFFF
icon:                Color/Icon/Inverse             → #FFFFFF
```

### General token selection rules

- Text on any solid/filled surface → `Color/Text/OnSolid`
- Text on warning solid specifically → `Color/Text/OnWarningSolid` (darker — yellow has lower contrast)
- Page/container backgrounds → `Color/Surface/*` (Base → Subtle → Muted by hierarchy depth)
- Interactive states always follow: Default → Hover → Pressed → Disabled (separate, not in the chain)
- Focus ring: always `Color/Focus/Ring` (#0066FF) regardless of component variant
- Status-colored surfaces (badges, banners): use `Color/Status/*/Surface` until property-first matrix is complete

---

## Figma Access

To inspect live token values in the branch:

```javascript
const vars = await figma.variables.getLocalVariablesAsync('COLOR');
const semantic = vars.filter(v => v.variableCollectionId === 'VariableCollectionId:9556:119');
const global   = vars.filter(v => v.variableCollectionId === 'VariableCollectionId:98:1207');

// Resolve alias chain
const varMap = {};
for (const v of vars) varMap[v.id] = v.name;
// v.valuesByMode[modeId].id → varMap[id] gives the alias name
```

Branch file key: `BT833nDww47dQ17CA5FTFg`
