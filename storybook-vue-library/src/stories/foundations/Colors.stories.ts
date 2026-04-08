import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { colorTokens, foundationNotes } from "../../tokens/foundations";

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
      const families = ["gray", "brand", "red", "green", "yellow", "blue", "purple"] as const;
      const groupedTokens = families.map((family) => ({
        family,
        tokens: colorTokens.filter((token) => token.family === family)
      }));

      return { groupedTokens, foundationNotes };
    },
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Stage 1 Foundations</p>
            <h1>Colors</h1>
            <p>
              The linked Figma frame is now mirrored as primitive color families in code.
              This page shows only the palette primitives, without any semantic mapping layer.
            </p>
            <p><strong>Note:</strong> {{ foundationNotes.colorNote }}</p>
          </header>

          <section v-for="group in groupedTokens" :key="group.family" class="token-section">
            <div class="docs-heading">
              <h2>{{ group.family.charAt(0).toUpperCase() + group.family.slice(1) }}</h2>
              <p v-if="group.family === 'gray'">Neutral scale transferred from the Gray row.</p>
              <p v-else-if="group.family === 'brand'">Primary brand scale transferred from the Brand row.</p>
              <p v-else>Primitive status palette transferred from the linked Figma frame.</p>
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
        </div>
      </section>
    `
  })
};
