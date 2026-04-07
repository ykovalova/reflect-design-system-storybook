import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { colorTokens, foundationNotes, semanticColorTokens } from "../../tokens/foundations";

const meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => ({
    setup() {
      const families = ["gray", "brand", "accent"] as const;
      const groupedTokens = families.map((family) => ({
        family,
        tokens: colorTokens.filter((token) => token.family === family)
      }));

      return { groupedTokens, foundationNotes, semanticColorTokens };
    },
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Stage 1 Foundations</p>
            <h1>Colors</h1>
            <p>
              The linked Colors spec is structured as palette families with labeled swatches.
              This receiver now contains the verified neutral, brand, and accent tokens used for surfaces,
              text, and primary actions.
            </p>
            <p><strong>Note:</strong> {{ foundationNotes.colorNote }}</p>
          </header>

          <section v-for="group in groupedTokens" :key="group.family" class="token-section">
            <div class="docs-heading">
              <h2>{{ group.family.charAt(0).toUpperCase() + group.family.slice(1) }}</h2>
              <p v-if="group.family === 'gray'">Neutral scale transferred from the Gray row.</p>
              <p v-else-if="group.family === 'brand'">Primary brand scale transferred from the Brand row.</p>
              <p v-else>Accent tokens carried over from the file variables already applied in the design system.</p>
            </div>

            <div class="token-grid">
              <article v-for="token in group.tokens" :key="token.cssVar" class="token-card">
                <div class="token-swatch" :style="{ background: token.value }" />
                <div class="token-copy">
                  <strong>{{ token.name }}</strong>
                  <div class="token-meta">
                    <span>{{ token.source }}</span>
                    <code>{{ token.cssVar }}</code>
                  </div>
                  <code>{{ token.value }}</code>
                </div>
              </article>
            </div>
          </section>

          <section class="token-section">
            <div class="docs-heading">
              <h2>Semantic Mapping</h2>
              <p>Usage-facing tokens mapped from the transferred palette.</p>
            </div>

            <ul class="semantic-list">
              <li v-for="token in semanticColorTokens" :key="token.cssVar">
                <strong>{{ token.name }}</strong>
                <code>{{ token.cssVar }} = {{ token.value }}</code>
                <span>Maps from {{ token.mapsTo }}</span>
              </li>
            </ul>
          </section>
        </div>
      </section>
    `
  })
};
