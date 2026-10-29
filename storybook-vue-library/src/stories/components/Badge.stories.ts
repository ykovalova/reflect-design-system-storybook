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
