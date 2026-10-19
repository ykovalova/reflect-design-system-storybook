import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Button from "../../components/Button/Button.vue";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "tertiary-modal",
        "primary-danger",
        "secondary-danger",
        "tertiary-danger"
      ]
    },
    size: {
      control: "select",
      options: ["medium", "small", "extra-small"]
    },
    state: {
      control: "select",
      options: ["default", "hover", "pressed", "focused", "disabled", "loading"]
    },
    onlyIcon: { control: "boolean" },
    icon: {
      control: "select",
      options: ["none", "plus", "close", "arrow-right"]
    },
    iconPosition: {
      control: "inline-radio",
      options: ["leading", "trailing"]
    },
    leadingIcon: {
      control: "select",
      options: [undefined, "none", "plus", "close", "arrow-right"]
    },
    trailingIcon: {
      control: "select",
      options: [undefined, "none", "plus", "close", "arrow-right"]
    },
    disabled: { control: "boolean" },
    ariaLabel: { control: "text" }
  },
  args: {
    label: "Button",
    variant: "primary",
    size: "medium",
    state: "default",
    onlyIcon: false,
    icon: "none",
    iconPosition: "leading",
    disabled: false,
    ariaLabel: "Button"
  },
  parameters: {
    docs: {
      description: {
        component:
          "Stage 2 implementation based on the Figma Buttons spec. The Vue API mirrors the Figma axes: variant, size, state, and only-icon."
      }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const VariantMatrix: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const variants = [
        "primary",
        "secondary",
        "tertiary-modal",
        "tertiary",
        "primary-danger",
        "secondary-danger",
        "tertiary-danger"
      ] as const;

      return { variants };
    },
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Stage 2 Button</p>
            <h1>Variant matrix</h1>
          </header>
          <div class="type-stack">
            <article v-for="variant in variants" :key="variant" class="type-card">
              <strong style="text-transform: capitalize;">{{ variant }}</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 16px;">
                <Button :variant="variant" size="medium" label="Button" />
                <Button :variant="variant" size="small" label="Button" />
                <Button :variant="variant" size="medium" icon="plus" />
              </div>
            </article>
          </div>
        </div>
      </section>
    `
  })
};

export const States: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const states = ["default", "hover", "pressed", "focused", "disabled", "loading"] as const;
      return { states };
    },
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Stage 2 Button</p>
            <h1>Primary medium states</h1>
          </header>
          <div style="display: flex; flex-wrap: wrap; gap: 16px;">
            <div v-for="state in states" :key="state" style="display: grid; gap: 8px; justify-items: start;">
              <span class="token-meta">{{ state }}</span>
              <Button variant="primary" size="medium" :state="state" label="Button" />
            </div>
          </div>
        </div>
      </section>
    `
  })
};

export const IconOnly: Story = {
  args: {
    label: "Create",
    ariaLabel: "Create",
    onlyIcon: true,
    icon: "plus",
    variant: "primary",
    size: "medium"
  }
};

export const Danger: Story = {
  args: {
    label: "Delete",
    ariaLabel: "Delete",
    variant: "primary-danger",
    size: "medium",
    icon: "close",
    iconPosition: "leading"
  }
};

export const Textual: Story = {
  args: {
    label: "View details",
    variant: "tertiary",
    size: "medium",
    icon: "arrow-right",
    iconPosition: "trailing"
  }
};

export const LeadingAndTrailingIcons: Story = {
  args: {
    label: "Add item",
    variant: "secondary",
    size: "medium",
    leadingIcon: "plus",
    trailingIcon: "arrow-right"
  }
};

export const CustomIconSlots: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <Button v-bind="args" label="Search">
        <template #leading-icon>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="2" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </template>
      </Button>
    `
  }),
  args: { variant: "secondary", size: "medium" }
};
