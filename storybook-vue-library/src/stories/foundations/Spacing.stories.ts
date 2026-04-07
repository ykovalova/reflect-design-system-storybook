import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { foundationNotes, spacingTokens } from "../../tokens/foundations";

const meta = {
  title: "Foundations/Spacing",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => ({
    setup() {
      return { spacingTokens, foundationNotes };
    },
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Stage 1 Foundations</p>
            <h1>Spacing</h1>
            <p>
              The spacing scale has been transferred from the linked Figma spacing spec, preserving the source naming.
            </p>
            <p><strong>Next action:</strong> {{ foundationNotes.nextAction }}</p>
          </header>

          <div class="spacing-stack">
            <article v-for="token in spacingTokens" :key="token.cssVar" class="token-card">
              <div class="token-copy spacing-row">
                <div>
                  <strong>{{ token.name }}</strong>
                  <div><code>{{ token.cssVar }}</code></div>
                  <div class="token-meta">
                    <span>{{ token.px }}px</span>
                    <span>{{ token.rem }}</span>
                  </div>
                </div>
                <div class="spacing-visual" :style="{ width: token.rem }" />
              </div>
            </article>
          </div>
        </div>
      </section>
    `
  })
};
