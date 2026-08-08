import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { colorTokens, foundationNotes, fullSemanticColorTokens } from "../../tokens/foundations";

const meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const SEMANTIC_TABLE_TEMPLATE = `
  <section class="docs-page">
    <div class="docs-stack">
      <header class="docs-heading">
        <p class="eyebrow">Stage 2 — Semantic layer</p>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </header>

      <section v-for="group in grouped" :key="group.key" class="token-section">
        <div class="semantic-table-wrap">
          <table class="semantic-table">
            <thead>
              <tr>
                <th colspan="6">
                  {{ group.label }}
                  <span class="st-group-badge">{{ group.tokens.length }}</span>
                </th>
              </tr>
              <tr>
                <th></th>
                <th>Token</th>
                <th>CSS Variable</th>
                <th>→ Global</th>
                <th>Hex</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="token in group.tokens" :key="token.cssVar">
                <td><span class="st-swatch" :style="{ background: token.hex }" /></td>
                <td><span class="st-name">{{ token.name }}</span></td>
                <td><code class="st-var">{{ token.cssVar }}</code></td>
                <td><code class="st-alias">{{ token.globalAlias }}</code></td>
                <td><code class="st-hex">{{ token.hex }}</code></td>
                <td><span v-if="token.notes" class="st-note">{{ token.notes }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </section>
`;

export const SemanticPropertyFirst: Story = {
  name: "Semantic — Property-first",
  render: () => ({
    setup() {
      const groups = [
        { key: "text",    label: "Text"    },
        { key: "icon",    label: "Icon"    },
        { key: "surface", label: "Surface" },
        { key: "border",  label: "Border"  },
        { key: "action",  label: "Action"  },
        { key: "status",  label: "Status"  },
        { key: "focus",   label: "Focus"   }
      ] as const;

      const grouped = groups.map((g) => ({
        key: g.key,
        label: g.label,
        tokens: fullSemanticColorTokens.filter((t) => t.propertyGroup === g.key)
      }));

      return {
        grouped,
        title: "Semantic Colors — Property-first",
        description:
          "Tokens grouped by CSS property type (Option A). Recommended for Storybook — every declaration self-documents its intent and dark mode only changes values, not component code."
      };
    },
    template: SEMANTIC_TABLE_TEMPLATE
  })
};

export const SemanticIntentFirst: Story = {
  name: "Semantic — Intent-first",
  render: () => ({
    setup() {
      const groups = [
        { key: "neutral",  label: "Neutral / Gray"   },
        { key: "brand",    label: "Brand / Primary"  },
        { key: "danger",   label: "Danger / Error"   },
        { key: "success",  label: "Success"          },
        { key: "warning",  label: "Warning"          },
        { key: "info",     label: "Info"             },
        { key: "focus",    label: "Focus"            },
        { key: "on-solid", label: "On Solid"         }
      ] as const;

      const grouped = groups.map((g) => ({
        key: g.key,
        label: g.label,
        tokens: fullSemanticColorTokens.filter((t) => t.intentGroup === g.key)
      }));

      return {
        grouped,
        title: "Semantic Colors — Intent-first",
        description:
          "Same tokens reorganized by semantic intent (Option B). Useful for auditing coverage — see at a glance which intents have Text, Icon, Border, Surface, and Action variants."
      };
    },
    template: SEMANTIC_TABLE_TEMPLATE
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
