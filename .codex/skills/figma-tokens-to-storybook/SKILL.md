---
name: figma-tokens-to-storybook
description: Use this skill in the Reflect Storybook project when work involves Figma foundations, token parity, variable/style mapping, or checking whether Storybook tokens are aligned before component transfer. It compares Figma colors, spacing, typography, radius, shadows, and theme aliases against the code token files, produces an explicit Figma-to-code mapping table, flags ambiguous or missing mappings instead of inferring them, updates the shared token mapping documentation, and blocks or warns before component transfer when required tokens are unresolved.
---

# Figma Tokens To Storybook

## Overview

Use this project-local skill before any Figma component transfer. Its job is to make token decisions explicit and reusable so components are implemented against approved foundations instead of one-off guesses.

## Project Targets

Start with [references/project-token-targets.md](references/project-token-targets.md). It lists the token source-of-truth files, the expected mapping output, and the known drift risks already present in this repo.

## Workflow

1. Read the current token docs and code targets before looking at components.
   Required files:
   - `storybook-vue-library/src/tokens/figma-mapping.md`
   - `storybook-vue-library/src/tokens/foundations.ts`
   - `storybook-vue-library/src/styles/base.css`
2. Read Figma variables and styles for all relevant foundation domains:
   - colors
   - spacing
   - typography
   - radius
   - shadows
   - theme aliases or semantic modes
3. Compare Figma tokens against code tokens and CSS custom properties.
4. Produce or update an explicit mapping table in `src/tokens/figma-mapping.md` using this shape:

| Figma token/style | Code token | Status | Notes |
| --- | --- | --- | --- |
| `Color/Brand/75` | `--color-brand-75` | Approved | Exact name/value match |
| `Radius/r-64` | `--radius-pill` | Needs approval | Similar intent, naming mismatch |
| `Alias/Text/Primary` | `--color-text-primary` | Missing source | Alias not exposed in current file |

5. Never silently infer a mapping.
   Allowed statuses:
   - `Approved`
   - `Needs approval`
   - `Missing in code`
   - `Missing in Figma`
   - `Ambiguous`
6. Only update code tokens when the user asks to add or rename them. Otherwise, document the gap and stop at the parity report.
7. Update the shared token documentation so approved mappings become reusable for later component transfers.

## Transfer Gate

Treat token parity as a gate before component work.

Block component transfer when:
- a required token is missing in code
- a required Figma token or alias is not exposed
- multiple code tokens could plausibly match the same Figma token
- naming or semantics differ enough that the mapping is not yet approved

Warn, but allow the user to proceed explicitly, when:
- the mapping is likely correct but not yet documented
- a component uses only already approved token domains and there are unrelated open token gaps elsewhere

When blocking, say which tokens caused the stop and point back to `storybook-vue-library/src/tokens/figma-mapping.md`.

## Decision Rules

- Prefer semantic correctness over value-only matching.
- If a match is based on value equality but the names or intended usage differ, mark it `Needs approval`.
- If the code uses a semantic alias and Figma exposes only primitives, document both the primitive and the alias chain in the notes.
- If Figma does not expose variables and only styles are available, document that limitation explicitly instead of pretending the alias layer is verified.

## Expected Deliverable

A parity pass should leave behind:
- an updated mapping table in `storybook-vue-library/src/tokens/figma-mapping.md`
- a short list of unresolved tokens, if any
- a clear statement about whether component transfer is unblocked
