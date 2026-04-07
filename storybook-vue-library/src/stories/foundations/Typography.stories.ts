import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { foundationNotes, typographyTokens } from "../../tokens/foundations";

const meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TypeScale: Story = {
  render: () => ({
    setup() {
      const categories = ["heading", "body", "caption", "button"] as const;
      const groupedTokens = categories.map((category) => ({
        category,
        tokens: typographyTokens.filter((token) => token.category === category)
      }));

      return { groupedTokens, foundationNotes };
    },
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Stage 1 Foundations</p>
            <h1>Typography</h1>
            <p>
              The typography styles below are transferred from the linked Figma typography specification.
            </p>
            <p><strong>Next action:</strong> {{ foundationNotes.nextAction }}</p>
          </header>

          <section v-for="group in groupedTokens" :key="group.category" class="token-section">
            <div class="docs-heading">
              <h2>{{ group.category.charAt(0).toUpperCase() + group.category.slice(1) }}</h2>
            </div>

            <div class="type-stack">
              <article v-for="token in group.tokens" :key="token.cssVar" class="type-card">
                <strong>{{ token.name }}</strong>
                <p class="token-meta">
                  <code>{{ token.cssVar }}</code>
                  <span>{{ token.family }}</span>
                  <span>{{ token.weight }}</span>
                  <span>{{ token.sizePx }}px / {{ token.lineHeightPx }}px</span>
                </p>
                <p
                  :style="{
                    margin: '1rem 0 0',
                    fontSize: 'var(' + token.cssVar + ')',
                    lineHeight: token.lineHeightPx + 'px',
                    fontWeight: token.weight,
                    textTransform: token.textTransform ?? 'none',
                    textDecoration: token.name.includes('Underline') ? 'underline' : 'none'
                  }"
                >
                  {{ token.sample }}
                </p>
              </article>
            </div>
          </section>
        </div>
      </section>
    `
  })
};
