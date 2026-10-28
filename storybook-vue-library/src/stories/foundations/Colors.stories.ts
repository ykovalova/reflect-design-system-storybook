import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { colorTokens, foundationNotes } from "../../tokens/foundations";
import { semanticColors, type SemanticColorGroup } from "../../tokens/semantic-colors.generated";

const meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const SEMANTIC_TEMPLATE = `
  <section class="docs-page">
    <div class="docs-stack">
      <header class="docs-heading">
        <p class="eyebrow">Stage 2 — Semantic layer</p>
        <h1>Semantic Colors</h1>
        <p>
          {{ total }} tokens from the Figma <code>Semantic</code> collection, grouped by the property they paint.
          The first segment of every name is the property (<code>Background</code>, <code>Text</code>, <code>Icon</code>,
          <code>Border</code>, <code>Overlay</code>); CSS names come from each variable's code syntax, so
          <code>Background/</code> emits <code>--color-bg-*</code>. Components use these tokens, never primitives.
        </p>
      </header>

      <section v-for="group in grouped" :key="group.key" class="token-section">
        <div class="semantic-table-wrap">
          <table class="semantic-table">
            <thead>
              <tr>
                <th colspan="5">
                  {{ group.label }}
                  <span class="st-group-badge">{{ group.tokens.length }}</span>
                </th>
              </tr>
              <tr>
                <th></th>
                <th>Token</th>
                <th>CSS Variable</th>
                <th>→ Alias</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="token in group.tokens" :key="token.cssVar">
                <td>
                  <span class="st-swatch" :style="{ backgroundImage: checker }">
                    <span class="st-swatch-fill" :style="{ background: 'var(' + token.cssVar + ')' }" />
                  </span>
                </td>
                <td><span class="st-name">{{ token.name }}</span></td>
                <td><code class="st-var">{{ token.cssVar }}</code></td>
                <td>
                  <code class="st-alias">{{ token.alias ?? token.value }}</code>
                  <code class="st-hex" style="display:block">{{ token.hex }}<template v-if="token.alpha < 1"> @ {{ Math.round(token.alpha * 100) }}%</template></code>
                </td>
                <td><span class="st-desc">{{ token.description }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </section>
`;

const GROUP_LABELS: Record<SemanticColorGroup, string> = {
  Background: "Background",
  Border: "Border",
  Text: "Text",
  Icon: "Icon",
  Overlay: "Overlay",
  Brand: "Brand / Logo"
};

const CHECKER =
  "conic-gradient(#d7d7de 25%, #fff 0 50%, #d7d7de 0 75%, #fff 0)";

export const Semantic: Story = {
  name: "Semantic",
  render: () => ({
    setup() {
      const grouped = (Object.keys(GROUP_LABELS) as SemanticColorGroup[]).map((key) => ({
        key,
        label: GROUP_LABELS[key],
        tokens: semanticColors.filter((t) => t.group === key)
      }));

      return { grouped, total: semanticColors.length, checker: CHECKER };
    },
    template: SEMANTIC_TEMPLATE
  })
};

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
