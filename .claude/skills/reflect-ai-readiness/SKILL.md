---
name: reflect-ai-readiness
description: Assess how ready a Reflect Design Kit component in Figma is for AI-driven implementation in Storybook (Figma MCP → Vue code). Scores 9 dimensions 0–2, lists concrete fixes in priority order, and gives a verdict (Ready / Ready with fixes / Not ready). Use when the user shares a Figma component link and asks about "AI readiness", "is this ready for Claude to build", "can we generate this component", or before starting any component transfer batch (RF-5288, RF-5291). The assessment itself (Steps 1-4) is read-only; the final step builds the Vue component and its story on a new branch. Never edits Figma unless asked.
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

## Step 5 — Build the component in Storybook (always the last step)

Every component review ends with the code: a Vue component and its story. Do this after the report (and after any Figma fixes the user asked for), unless the user says to skip it. If the component already exists in `src/components/`, update it to match Figma instead of rewriting it.

1. **Branch.** Start from an up-to-date `main` (`git fetch`, fast-forward `main`), then a new branch named for the component (e.g. `Checkbox-component`). Never build on the review branch.
2. **Read the conventions first:** a sibling story (`src/stories/components/Badge.stories.ts`, `Button.stories.ts`) and component (`Badge.vue`, `Button.vue`), and `storybook-vue-library/CLAUDE.md`.
3. **Take every value from Figma, not from memory.** Per variant, read tokens bound, sizes, padding, gap, radius, text style, and glyph geometry (`vectorPaths`, position inside its parent) with `use_figma`, and cross-check with `get_variable_defs`. Resolve variable names; do not copy raw hex values.
4. **Write `src/components/<Name>/<Name>.vue`:**
   - Props map 1:1 to the Figma properties (the same mapping the report's Property API row describes). Prefer the native element (`input`, `button`) so keyboard and a11y come for free; follow the Accessibility section of the spec sheet.
   - Semantic tokens only (`--color-*` from `semantic-colors.generated.css`). If a token is missing, add it through the Figma export + `npm run tokens:generate`, never by hand in `*.generated.*`.
   - Include every state × variant Figma has. A `state` prop is only for forcing hover/focus in docs; real `:hover` and `:focus-visible` must work without it.
   - Focus ring follows the project rule (2px `--color-border-focus-ring`, 1px gap around the interactive control).
5. **Write `src/stories/components/<Name>.stories.ts`:** `Components/<Name>`, `tags: ["autodocs"]`, `Playground`, a `VariantMatrix` story and a `States` story in the Button docs layout (`docs-page` > `docs-stack` > `docs-heading` with `eyebrow` and `h1`, then `type-stack` with one `type-card` per Figma variant and `token-meta` captions on each cell; see `Button.stories.ts`) that together show every Figma State × Variant, plus stories for each notable option (e.g. without label, interactive with `v-model`).
6. **Changelog:** add an entry under Unreleased in `CHANGELOG.md` in the same commit.
7. **Verify, do not assume:** `npx vue-tsc --noEmit`; then run Storybook and look at it. `bin/storybook` hardcodes another user's Node path, so start it with `npm run storybook -- --host 127.0.0.1 --no-open --ci` from `storybook-vue-library/` and stop it afterwards. Check dimensions with `getBoundingClientRect` / `getComputedStyle` against Figma, check the console for errors, and exercise click, Space/Tab and disabled.
8. **Report what was and was not checked** (e.g. Code Connect is not registered until the library is published). Commit only when the user asks, and never push: the user pushes. Offer a PR description in English (Summary, Changes; add other sections only if asked), ending with the Claude Code line.

## Rules

Quote counts from the evidence, not impressions. Flag anything inferred. Steps 1-4 are read-only: do not edit Figma, code or Jira there; offer follow-ups instead. Step 5 is the only step that writes code, and only inside the new component branch. Edit Figma only when the user asks. Do not send anything to Slack.
