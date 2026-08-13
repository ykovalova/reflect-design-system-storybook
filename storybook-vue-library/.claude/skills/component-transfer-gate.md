# Component Transfer Gate

Decides whether a component is allowed to start the **components track** (see `WORKFLOW.md`). Reads `WORKFLOW.md` and `src/tokens/figma-mapping.md` only — it does **not** call the Figma MCP and does not re-audit token values. It answers "is this component unblocked?", not "do the tokens still match Figma?".

For a fresh Figma comparison, run `$figma-token-parity` instead. Run that first if the recorded status looks stale.

## When to run

- **Before starting work on any component transfer** — required, per `CLAUDE.md`
- Whenever asked whether a named component is unblocked

## Arguments

Takes the component name as its argument (e.g. `Button`). If omitted, ask which component to check.

## Steps

### 1. Identify required token groups

Determine which foundation token groups the component depends on — check `docs/design-system.md` component rules, the component's own notes, or infer from comparable existing components (e.g. most interactive components need Colors — semantic layer, Typography, Spacing, Elevation, Radius). If genuinely unclear, ask the user.

### 2. Read recorded status

Read the `### Token groups` table in `WORKFLOW.md`. For each required group, note its status: **Not started**, **Transferred**, **Verified**, or **In Storybook**.

### 3. Cross-check open decisions

Read `## Open decisions` in `src/tokens/figma-mapping.md`. Any open decision naming a token inside a required group is a blocker, even if that group's `WORKFLOW.md` status says **Verified** — a "Verified" status with recorded gaps (e.g. "Approved with gaps") still blocks on those specific gaps.

### 4. Report the gate result

Print:

```
Component transfer gate — {component}
Required groups: {group list}
Gate: PASS / FAIL
```

**PASS** means every required group is at **Verified** or higher, with no open decisions naming a token in that group.

**FAIL** means list each blocking group with:
- its current status
- the specific open decision blocking it (if any)
- what needs to happen next — usually: resolve the open decision, then run `$figma-token-parity` to re-verify

Do not edit any files — this skill only reads and reports.
