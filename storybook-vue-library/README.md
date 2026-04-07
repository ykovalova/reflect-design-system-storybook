# Storybook Vue Library

Receiver workspace for transferring the Reflect Design System from Figma into Vue and Storybook.

## Current status

- Prep scaffold completed
- Stage 1 foundations transferred from Figma
- Stage 2 Button transferred from Figma

## What was prepared

- Vue + Vite project structure
- Storybook configuration
- Foundation token destination files
- Foundation docs stories for colors, spacing, and typography
- Button component implementation and Storybook stories
- Figma-to-code mapping document

## Important environment blocker

This machine does not currently expose `node`, `npm`, `pnpm`, or `yarn` in the shell by default.
The project now includes local helper scripts in `bin/` that activate the user-local Node install and the safe CA settings automatically.

Storybook's current install docs recommend:

- Start from a Vite app
- Use `npm create vite@latest` for Vue scaffolding
- Use `npm create storybook@latest` inside the project root
- Use Node.js 20.19+ or 22.12+

## Next steps

1. Run `source ./bin/activate-local-node.sh` from the project root.
2. Start Storybook with `./bin/storybook`.
3. Review the transferred foundations and Button stories.

## GitHub Pages

This workspace includes a GitHub Actions workflow at `../.github/workflows/deploy-storybook.yml`.
Once the repository is pushed to GitHub and Pages is enabled, pushes to `main` will build and publish the Storybook site automatically.

## Local commands

- `source ./bin/activate-local-node.sh`
- `./bin/npm install`
- `./bin/storybook`

## Files to update in Stage 1

- `src/tokens/foundations.ts`
- `src/styles/base.css`
- `src/stories/foundations/Colors.stories.ts`
- `src/stories/foundations/Spacing.stories.ts`
- `src/stories/foundations/Typography.stories.ts`
- `src/tokens/figma-mapping.md`

## Files updated in Stage 2

- `src/components/Button/Button.vue`
- `src/stories/components/Button.stories.ts`
- `src/tokens/figma-mapping.md`
