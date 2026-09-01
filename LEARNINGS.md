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

---

## 2026-09-01 — Semantic colour restructure and advisor retirement

**`skills/reflect-semantic-color-advisor.md` retired.** Deleted, not reclassified — the 2026-08-13 note above (pending reclassification, hybrid rule unconfirmed) is closed out by this. It documented a structure that no longer exists: branch `BT833nDww47dQ17CA5FTFg`, ~96 tokens, the Option A vs Option B framing, `Color/Text/Primary` naming, and a stale collection ID (`9556:119`) that matched nothing in the current branch. Left in place it would have answered "which token do I use" with contradictions.

**Replaced by `.claude/skills/reflect-token-picker/SKILL.md`.** Narrower job — choosing a token, not auditing the library. Its four still-live gaps (`Icon/Duotone`, `Icon/Placeholder` + the absent Pink scale, `Logo/*`, and the FAB `Floating Circle` states belonging in a component tier) were carried across before deletion rather than lost.

**Rule: skills live in `.claude/skills/` or they are not skills.** A skill file is only discoverable and invokable at `.claude/skills/<skill-name>/SKILL.md` — a folder per skill, with the instructions in `SKILL.md` and YAML frontmatter carrying `name` and `description`. Anything outside that path is a document, not a skill: it will never trigger, no matter how good its frontmatter is. The root-level `skills/` directory was exactly this trap — both files that ever lived there were inert the whole time they existed, which is why the advisor's stale guidance was never actually reaching anyone. That directory has now been **removed**, and `reflect-token-picker` moved into `.claude/skills/`. Do not recreate a top-level `skills/` folder; if a skill needs supporting files, they belong beside its `SKILL.md` inside its own folder.

**Clarifying the 2026-08-13 "do not edit that file until confirmed" note.** That was a *content freeze on one specific decision*, not a general prohibition on touching the file. The reclassification itself (turn the advisor from a workflow skill into a context/structural-rule doc) had been agreed. What had **not** been agreed was the token-organization rule to write into it — the proposed hybrid of "property-first by default, but intent-first for Status and Action backgrounds". The freeze existed so nobody baked an unconfirmed architectural decision into a governance document, where it would then get cited as settled. It is now moot twice over: the file is deleted, and the question it was guarding resolved the other way — the new structure is property-first throughout, with pressable backgrounds split into their own `Action` group rather than organised by intent. **Closed.**

**New structure lives in Figma, not code.** Branch `qR9kXKSyZJ2Z0XivlTcejZ`, collection `Semantic` — 115 variables, each aliased to a Primitive, scoped, carrying WEB code syntax and a usage description. Built as `Semantic v2` alongside the previous 88-variable `Semantic` collection; **the user then deleted the old collection and renamed v2 to `Semantic`**, so the text/icon conflict (old `Text+icon/*` vs. the new split) is resolved and there is now one semantic layer in the file. `base.css` and `foundations.ts` are **not** migrated — code still carries the previous names. The migration plan now lives in `storybook-vue-library/src/tokens/semantic-token-map.md`: all 115 tokens with their primitive alias, resolved value and usage, plus an appendix mapping every current code token to its replacement. **Open: executing it.**

**Care needed when a collection is renamed.** After that rename, the collection named `Semantic` *is* the new 115-variable one. A "delete the old Semantic collection" instruction taken literally at that point would have destroyed the new structure — always match on variable count and group fingerprint (`Overlay/*` and `Text/*`+`Icon/*` = new; `Text+icon/*` and `Status/*` = old), not on name alone. Also note the file has ~50 pages including live component pages; a variable-deletion impact check must scan all of them, not just the current page.
