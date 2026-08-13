# Learnings

Organisational, administrative, and bookkeeping notes for this repo — not design or code content (that lives in `storybook-vue-library/docs/`). This is a running log: append dated entries, don't rewrite history. Each entry should say what was found, why it matters, and what (if anything) is still open.

---

## 2026-08-13 — Skill system clean-up

**Repo structure.** `storybook-vue-library/` is a subfolder of this superproject, not its own git repo — all commits happen here at the root (`reflect-design-system-storybook`). CI (`.github/workflows/deploy-storybook.yml`) treats `storybook-vue-library` as the deployable unit (`working-directory`, build path, Pages artifact).

**Two parallel skill systems existed.** `.claude/skills/` (Claude Code, flat `.md` files) and `.codex/skills/` (Codex/OpenAI CLI, folder + `SKILL.md` + `agents/openai.yaml` + `references/`) both implemented Figma↔code token governance independently. Codex was confirmed unused — its skills (`figma-tokens-to-storybook`, `component-variable-architecture`) were deleted rather than kept in sync. **Open watch item:** if a second agent tool is ever adopted for this repo, don't assume its skill definitions match Claude's — check for drift explicitly, since this pair had already diverged (Codex's combined skill had an `Ambiguous` status and a block-vs-warn gate distinction Claude's split version lacked).

**Dangling reference found, not resolved.** The deleted `component-variable-architecture` skill referenced a `$figma-component-to-storybook` skill (for the actual component-transfer step) that doesn't exist anywhere in either skill system. If component transfer ever needs tooling support beyond the manual `WORKFLOW.md` steps, that's the gap to fill — folded into tracked task "Add figma-props-to-vue skill" rather than treated separately.

**`skills/reflect-semantic-color-advisor.md` is pending reclassification.** Sits outside both `.claude/skills/` and `.codex/skills/` discovery conventions — currently inert as an invokable skill. Decision to convert it into a context/structural-rule doc (not a workflow skill) is agreed; the specific hybrid token-organization rule to bake into it (property-first by default, intent-first for Status/Action backgrounds) is **not yet confirmed by the user** — do not edit that file until confirmed.

**Skill rename for clarity.** `figma-tokens-to-storybook` (did two jobs: live Figma audit *and* component-transfer decision) was split into `figma-token-parity` (live audit only) and `component-transfer-gate` (fast status-only check, no Figma fetch). Reason: the transfer-gate check ran on every component transfer and didn't need a fresh Figma API call each time — only the foundations audit does.

**Open/tracked follow-ups:**
- Task #1 — `figma-props-to-vue` skill (also to absorb the deleted `component-variable-architecture`'s scope)
- Task #2 — `storybook-scaffold` skill
- `WORKFLOW.md` has a "Proposed additions" section (token naming-approach decision step, design-audit drift-review cadence, component transfer review step) — not yet adopted into the tracked workflow.
