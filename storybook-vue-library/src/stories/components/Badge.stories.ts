import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Badge from "../../components/Badge/Badge.vue";

const statuses = ["neutral", "info", "success", "warning", "error"] as const;

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    status: { control: "select", options: [...statuses] },
    variant: { control: "inline-radio", options: ["default", "bold"] },
    statusDot: { control: "boolean" },
    label: { control: "text" }
  },
  args: {
    status: "neutral",
    variant: "default",
    statusDot: true,
    label: "Label"
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** One card per Figma Status, with Default and Bold, with and without the status dot (20 variants in total). */
export const VariantMatrix: Story = {
  render: () => ({
    components: { Badge },
    setup: () => ({ statuses }),
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Badge</p>
            <h1>Variant matrix</h1>
          </header>
          <div class="type-stack">
            <article v-for="status in statuses" :key="status" class="type-card">
              <strong style="text-transform: capitalize;">{{ status }}</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-top: 16px;">
                <div style="display: grid; gap: 8px; justify-items: start;">
                  <span class="token-meta">Default</span>
                  <Badge :status="status" variant="default" label="Label" />
                </div>
                <div style="display: grid; gap: 8px; justify-items: start;">
                  <span class="token-meta">Bold</span>
                  <Badge :status="status" variant="bold" label="Label" />
                </div>
                <div style="display: grid; gap: 8px; justify-items: start;">
                  <span class="token-meta">Default, no dot</span>
                  <Badge :status="status" variant="default" :status-dot="false" label="Label" />
                </div>
                <div style="display: grid; gap: 8px; justify-items: start;">
                  <span class="token-meta">Bold, no dot</span>
                  <Badge :status="status" variant="bold" :status-dot="false" label="Label" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    `
  })
};

const grid = (variant: "default" | "bold", statusDot: boolean) => ({
  components: { Badge },
  setup: () => ({ statuses, variant, statusDot }),
  template: `<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
    <Badge v-for="s in statuses" :key="s" :status="s" :variant="variant" :status-dot="statusDot" :label="s" />
  </div>`
});

export const Default: Story = { render: () => grid("default", true) };
export const Bold: Story = { render: () => grid("bold", true) };
export const WithoutDot: Story = { render: () => grid("default", false) };
