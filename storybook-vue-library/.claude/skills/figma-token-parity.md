# Figma Token Parity Audit

Compares Figma variable definitions against the current code in `src/tokens/foundations.ts` and `src/styles/base.css`. Outputs a parity report and updates `src/tokens/figma-mapping.md` with findings. This is a live audit against Figma — it fetches fresh data via the Figma MCP every run.

This is the **foundations track** skill only. It does not decide whether a specific component can start transfer — for that, use `$component-transfer-gate`, which reads this skill's recorded output instead of re-auditing Figma.

## When to run

- **After any edit to `base.css` or `foundations.ts`** — confirms values haven't drifted from Figma
- **When design updates Figma variables** — identifies what changed and whether code needs to follow
- **When re-verifying a token group** — e.g. resolving an item in `## Open decisions`

## Arguments

The skill accepts an optional Figma URL or node ID as the first argument. If none is provided, use the file and node recorded in the `## Last audit` section of `src/tokens/figma-mapping.md`.

If neither is available, ask the user: "Which Figma file or node should I check against? Paste a Figma URL or node ID."

## Steps

### 1. Read the current parity state

Read `src/tokens/figma-mapping.md` to establish:
- The Figma file and node from `## Last audit`
- The naming contract from `## Naming contract`
- The open decisions already recorded

Read `src/styles/base.css` to build a map of every CSS custom property and its current value.

Read `src/tokens/foundations.ts` to cross-check typed token data matches `base.css` values.

### 2. Fetch Figma variables

Use the Figma MCP to fetch variable definitions from the Figma file. Request the `Primitives` collection, `Mode 1`.

For each variable returned, record:
- Full path (e.g. `Color/Gray/gray-90`)
- Resolved value in Mode 1 (hex for colors, px for spacing/radius)

Also fetch text styles and effect styles — these cover typography and shadow tokens.

### 3. Apply the naming contract

Translate each Figma path to its expected CSS custom property name using these rules:

| Figma pattern | CSS pattern | Transform |
|---------------|-------------|-----------|
| `Color/{Family}/{family}-{step}` | `--color-{family}-{step}` | Strip collection and family; lowercase; comma in step → hyphen |
| `Spacing/spc-{n}` | `--space-{n}` | Drop `spc-` prefix; use `space-` |
| `Typography/{Category}/{Variant}/{Weight}` | `--font-{category}-{variant}-{weight}` and `--line-{category}-{variant}` | Collapse path; lowercase; spaces → hyphens |
| `shadow {n}` | `--shadow-elevation-{n}` | Rename to reflect intent |
| `Radius/r-{n}` | semantic name from mapping | Use the approved mapping table; if no mapping exists, flag as unresolved |

### 4. Compare values

For each translated CSS property name, look it up in the `base.css` map.

Classify the result:

| Result | Condition |
|--------|-----------|
| **Match** | Property exists in code; value matches Figma exactly |
| **Mismatch** | Property exists in code; value differs from Figma |
| **Missing in code** | No CSS property found for this Figma variable |
| **Missing in Figma** | CSS property exists in code with no Figma counterpart |

For color values: normalize both to lowercase 6-digit hex before comparing. Treat `#ffffff` and `#FFFFFF` as equal.

### 5. Output the parity report

Print a summary line first:

```
Parity check — {date}
{N} matched · {N} mismatched · {N} missing in code · {N} missing in Figma
Gate: PASS / FAIL
```

Gate **PASS** means: zero mismatches and zero "missing in code" items for token groups that are at **Verified** status in `WORKFLOW.md`. New gaps in **Not started** groups do not block the gate.

Gate **FAIL** means: one or more mismatches or gaps in a **Verified** token group. List each blocker explicitly.

This PASS/FAIL reflects foundations status only. It is not, by itself, a decision about whether any particular component can start transfer — `$component-transfer-gate` makes that call by reading the status this audit produces.

Then print a detail table per token category (Colors, Spacing, Radius, Typography, Shadows), showing only non-Match rows. Skip categories with no issues.

```
Colors — 3 issues
| Figma path            | CSS var            | Figma value | Code value | Status    |
|-----------------------|--------------------|-------------|------------|-----------|
| Color/Blue/blue-2,5   | --color-blue-2-5   | #FBFCFF     | #F6F8FD    | Mismatch  |
| Color/Other/Blanket   | —                  | rgba(91,91,100,0.5) | —   | Missing   |
```

### 6. Update `src/tokens/figma-mapping.md`

After printing the report, update the file:

**Always update:**
- `## Last audit` — set Date to today, record the Figma node checked, update variable count

**For each new Mismatch or Missing in code:**
- Add a row to `## Open decisions` if it isn't already there
- Fill: Item (Figma path), Current code value, Figma value, Action needed

**For each Open decision that now shows as Match:**
- Remove the row from `## Open decisions`
- Update the Status column in the relevant Stage 1 table from "Approved with gaps" to "Approved" if all gaps in that group are resolved

Do not remove open decisions that were added manually with a note that they need a design decision — only remove rows where the Figma and code values now match.

Do not rewrite the whole file. Edit only the sections that changed.
