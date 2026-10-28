import type { Meta, StoryObj } from "@storybook/vue3-vite";

import FloatingButton from "../../components/FloatingButton/FloatingButton.vue";

const meta = {
  title: "Components/Floating Button",
  component: FloatingButton,
  tags: ["autodocs"],
  argTypes: {
    appearance: { control: "inline-radio", options: ["closed", "opened"] },
    size: { control: "inline-radio", options: ["medium", "small"] },
    state: {
      control: "select",
      options: ["default", "hover", "pressed", "focused", "disabled", "loading"]
    },
    disabled: { control: "boolean" },
    ariaLabel: { control: "text" }
  },
  args: {
    appearance: "closed",
    size: "medium",
    state: "default",
    disabled: false,
    ariaLabel: "Add step"
  },
  parameters: {
    docs: {
      description: {
        component:
          "Circular icon-only action button, used when adding steps in recording a test. The Vue API mirrors the Figma axes: appearance (Closed / Opened), size (Medium 60px / Small 40px) and state. It has no visible label, so ariaLabel is required."
      }
    }
  }
} satisfies Meta<typeof FloatingButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Opened: Story = {
  args: { appearance: "opened", ariaLabel: "Close" }
};

export const Small: Story = {
  args: { size: "small" }
};

export const States: Story = {
  render: () => ({
    components: { FloatingButton },
    setup() {
      const states = ["default", "hover", "pressed", "focused", "disabled", "loading"] as const;
      const appearances = [
        { appearance: "closed", label: "Add step" },
        { appearance: "opened", label: "Close" }
      ] as const;
      const sizes = ["medium", "small"] as const;
      return { states, appearances, sizes };
    },
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Floating Button</p>
            <h1>Appearance, size and state</h1>
          </header>
          <div v-for="a in appearances" :key="a.appearance" style="display: grid; gap: 16px; margin-bottom: 24px;">
            <strong style="text-transform: capitalize;">{{ a.appearance }}</strong>
            <div v-for="size in sizes" :key="size" style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
              <FloatingButton
                v-for="state in states"
                :key="state"
                :appearance="a.appearance"
                :size="size"
                :state="state"
                :aria-label="a.label"
              />
            </div>
          </div>
        </div>
      </section>
    `
  })
};

export const CustomIcon: Story = {
  render: (args) => ({
    components: { FloatingButton },
    setup: () => ({ args }),
    template: `
      <FloatingButton v-bind="args" aria-label="Record">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="6" fill="currentColor" />
        </svg>
      </FloatingButton>
    `
  })
};
