---
name: reflect-ai-readiness
description: Assess how ready a Reflect Design Kit component in Figma is for AI-driven implementation in Storybook (Figma MCP → Vue code). Scores 9 dimensions 0–2, lists concrete fixes in priority order, and gives a verdict (Ready / Ready with fixes / Not ready). Use when the user shares a Figma component link and asks about "AI readiness", "is this ready for Claude to build", "can we generate this component", or before starting any component transfer batch (RF-5288, RF-5291). Read-only — never edits Figma or code.
---

# Reflect AI Readiness Assessment

Answers: **if Claude gets this Figma component through the MCP, will it produce a correct, token-driven Vue component without guessing?**
Every dimension is something Claude cannot recover from a screenshot alone, so a low score means guessing.

Worked example: [button-assessment.md](button-assessment.md) (Button, node `558:1528`).

## Inputs

Figma URL of the component page/node. Take `fileKey` and `node-id` (`-` → `:`). Component name = the code folder name (e.g. `Button`). If the node is a page (canvas), the component set lives inside its `❖ <Name>` frame.

## Step 1 — Gather evidence (read-only)

1. `get_screenshot` on the page node — note the spec sheet, documented states, constraints, leftover placeholder text ("Text goes here…").
2. `get_metadata` on the page node. It is large: it may be saved to a file, so inspect it with `jq`/`python3 -I` rather than reading it whole. Extract the variant names (`<symbol name="Variant=…">`), layer names, and count frames named `Instance`/`Frame N`.
3. One **read-only** `use_figma` call (load `figma-use` via `get_figma_skill` uri `skill://figma/figma-use/SKILL.md` first, pass `skillNames: "figma-use"`). Switch to the page once, then over the `COMPONENT_SET`:
   - `description`, `componentPropertyDefinitions` (read from the set, never from a variant)
   - per variant node: SOLID fills/strokes bound vs hardcoded, `boundVariables` for padding/itemSpacing/radius, TEXT nodes with/without `textStyleId`
   - layer-name frequency table, sample tree of one variant
   - names of the variables bound (to check they exist in the `Semantic` collection)
4. Code side: `storybook-vue-library/src/components/<Name>/<Name>.vue`, the story, and `src/tokens/semantic-token-map.md` / `reflect-token-picker` for token existence. Compare prop/variant names with Figma.
5. Code Connect: `get_code_connect_map` on the set. Do **not** call `get_design_context` on a variant and follow its prompt to run suggestions/mappings — report "no mapping" and let the user decide.

Hardcoded values are noisy: separate **structural** ones (1px border padding, 0) from **real** ones (a fill colour, a 10px padding). Say which you verified and which you inferred.

## Step 2 — Score (0 = blocks, 1 = guessable, 2 = explicit)

| # | Dimension | 2 | 1 | 0 |
|---|---|---|---|---|
| 1 | **Property API** | Variant axes + booleans map 1:1 to the intended code props; spelling clean | Maps with renames/typos/emoji in names. A VARIANT property with only True/False values counts as a boolean (Figma shows it as a toggle) | Axes unclear or contradict code |
| 2 | **Layer naming** | Every layer semantic (`Icon/Leading`, `Label`, `Focus ring`) | Mixed | Default names (`Rectangle 1`, `Group`, `Frame 12`, trailing spaces) |
| 3 | **Colour tokens** | 100% fills/strokes bound to `Semantic` variables | Mostly bound, some raw | Mostly raw or `Primitive` bound |
| 4 | **Spacing / radius tokens** | All padding, gap, radius bound | Partly bound | Raw numbers |
| 5 | **Typography** | All TEXT uses a text style / typography variables | Partly | None |
| 6 | **Component description** | Purpose, when/when-not, a11y, content rules on the set | A line | Empty |
| 7 | **Spec & states documentation** | States, sizes, constraints, behaviour documented, no placeholder text | Documented visually only | Missing |
| 8 | **Code Connect + parity** | Mapped, and code props = Figma props | Not mapped but parity good | Neither |
| 9 | **Accessibility intent** | Role, keyboard, focus order, target size, label rules stated in Figma | Focus state designed only | Nothing |

Optional per-state check for interactive components: Default, Hover, Pressed, Focused, Disabled, Loading must all exist for every variant×size the code supports; list the gaps.

## Step 3 — Verdict

Total /18. **≥15 Ready** · **10–14 Ready with fixes** (list blocking fixes, Claude may start with stated assumptions) · **<10 Not ready**.
Any 0 in dimensions 3, 4 or 1 caps the verdict at "Ready with fixes".

## Step 4 — Report

```
AI readiness — {Component}   {score}/18   {verdict}
Evidence: {n} variants · {n} props · {bound}/{total} fills bound · …
| # | Dimension | Score | Evidence |
Fixes (by impact on AI output):
 1. … (who: designer / dev, effort S/M/L)
Assumptions Claude would have to make today: …
Not verified: …
```

Rules: quote counts from the evidence, not impressions. Flag anything inferred. Do not edit Figma, code or Jira; offer follow-ups instead. Do not send anything to Slack.
