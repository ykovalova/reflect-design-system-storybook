---
name: component-variable-architecture
description: Use this skill in the Reflect Storybook project when work involves analysing Figma components before transfer to propose a reusable variable architecture across primitive, semantic, and component token layers. Use when Codex needs to inspect component states, variants, fills, strokes, text colors, radii, spacing, or effects and suggest Figma variable names, CSS custom properties, alias chains, required-before-transfer gates, or gradual variable updates before using figma-component-to-storybook.
---

# Component Variable Architecture

## Overview

Use this skill before or during component transfer to turn real component usage into a deliberate variable model. It does not transfer components; it proposes and documents which Figma variables and Storybook tokens should exist so transfer work stays consistent.

## Project Context

This skill complements, but does not replace:

- `$figma-tokens-to-storybook`: verifies existing Figma tokens against Storybook sources.
- `$figma-component-to-storybook`: transfers approved Figma components into Vue Storybook.

Use this skill for architecture decisions between those two steps:

1. Inspect component usage.
2. Propose missing variables and aliases.
3. Mark what must exist before transfer and what can evolve during transfer.
4. Update the shared mapping documentation when decisions are made.

## Required Sources

Read these before making recommendations:

- `storybook-vue-library/src/tokens/figma-mapping.md`
- `storybook-vue-library/src/tokens/foundations.ts`
- `storybook-vue-library/src/styles/base.css`
- Figma component page or node supplied by the user

When using Figma Plugin API scripts, load and follow `figma-use` first.

For output shapes, naming patterns, and table templates, read `references/output-templates.md`.

## Workflow

1. Establish scope.
   - Identify the component, exact Figma node/page, and Storybook receiver files.
   - Note whether the task is a foundational pass, a component-specific pass, or a transfer blocker.

2. Inventory component design values.
   - Inspect variants, states, and nested instances.
   - Capture fills, strokes, text colors, effects, radii, spacing/gaps, padding, opacity, disabled values, and focus treatment.
   - Group repeated values by role, not only by equality.

3. Classify every candidate variable.
   - Primitive: raw palette/size/effect value.
   - Semantic: product meaning such as surface, text, action, status, border, focus, overlay.
   - Component: component-specific state or slot such as badge success background or button primary hover background.
   - Avoid component variables that merely duplicate a stable semantic token unless they clarify component API or state mapping.

4. Propose alias chains.
   - Prefer component tokens aliasing semantic tokens.
   - Prefer semantic tokens aliasing primitives.
   - Do not silently infer aliases when names or intent are ambiguous.
   - For colors, treat Figma values as authoritative; code should update when values differ.
   - Figma variable structure, naming, collections, aliases, and modes may still be provisional until the design-side variable update is complete.

5. Gate transfer.
   - Mark required tokens as `Required before transfer` when a component cannot be implemented faithfully without them.
   - Mark tokens as `Can evolve during transfer` when they are non-blocking aliases, cleanup, or documentation improvements.
   - Mark uncertain items as `Needs design decision`.

6. Document the recommendation.
   - Produce a component token inventory.
   - Produce a proposed Figma variable structure.
   - Produce a Figma-to-code mapping table.
   - List transfer blockers and gradual follow-ups.
   - Update `storybook-vue-library/src/tokens/figma-mapping.md` only when the user asks for the recommendations to be recorded.

## Decision Rules

- Prefer semantic correctness over value-only matching.
- Do not propose a component variable for every rendered value. Reuse semantic variables when the value has the same role across components.
- Do propose component variables for stateful or component-owned roles, especially where variants need stable code hooks.
- Keep primitive names close to Figma source names but code-safe.
- Keep semantic and component names stable even if primitive values change.
- Treat external library styles as provisional unless the user confirms they are part of Reflect's local source of truth.
- Separate "must decide before transfer" from "can clean up later" to avoid blocking unnecessarily.

## Expected Deliverable

A component variable architecture pass should leave the user with:

- a short recommendation on whether a foundational variable pass is needed first
- a component token inventory
- suggested Figma variable names and alias chains
- matching CSS custom property names
- a list of required-before-transfer blockers
- a list of variables that can be updated gradually during transfer
- any unresolved design decisions
