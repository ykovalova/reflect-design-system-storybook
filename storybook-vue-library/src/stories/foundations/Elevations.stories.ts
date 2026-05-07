import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { foundationNotes, shadowTokens } from "../../tokens/foundations";

const meta = {
  title: "Foundations/Elevations",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Shadows: Story = {
  render: () => ({
    setup() {
      return { foundationNotes, shadowTokens };
    },
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Stage 1 Foundations</p>
            <h1>Elevations</h1>
            <p>
              The elevation styles below are transferred from the linked Figma Elevations page.
            </p>
            <p><strong>Note:</strong> {{ foundationNotes.elevationNote }}</p>
          </header>

          <section class="token-section">
            <article v-for="token in shadowTokens" :key="token.cssVar" class="token-card elevation-card">
              <div class="token-copy">
                <strong>{{ token.name }}</strong>
                <div class="token-meta">
                  <code>{{ token.cssVar }}</code>
                  <span>{{ token.x }}px {{ token.y }}px {{ token.blur }}px {{ token.spread }}px</span>
                </div>
                <code>{{ token.value }}</code>
              </div>
              <div class="elevation-demo-wrap">
                <div class="elevation-demo" :style="{ boxShadow: token.value }" />
              </div>
            </article>
          </section>
        </div>
      </section>
    `
  })
};
