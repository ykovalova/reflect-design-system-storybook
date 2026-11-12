import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Radio from "../../components/Radio/Radio.vue";

const meta = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    size: { control: "inline-radio", options: ["medium", "small"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    ariaLabel: { control: "text" },
    state: { control: "inline-radio", options: ["default", "hover", "focused"] }
  },
  args: {
    checked: false,
    size: "medium",
    invalid: false,
    disabled: false,
    label: "Label",
    state: "default"
  },
  parameters: {
    docs: {
      description: {
        component:
          "Radio buttons always belong to a group: give them the same `name` and bind the group with `v-model`. Selecting one deselects the previous one."
      }
    }
  }
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const variants = [
  { name: "Default", checked: false },
  { name: "Checked", checked: true }
];

const sizes = [
  { name: "Medium", value: "medium" },
  { name: "Small", value: "small" }
] as const;

const states = [
  { name: "Default", props: { state: "default" } },
  { name: "Hover", props: { state: "hover" } },
  { name: "Focused", props: { state: "focused" } },
  { name: "Disabled", props: { disabled: true } },
  { name: "Error", props: { invalid: true } }
];

/** One card per Figma Variant and Size, every State inside it (20 variants in total). */
export const VariantMatrix: Story = {
  render: () => ({
    components: { Radio },
    setup: () => ({ variants, sizes, states }),
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Radio</p>
            <h1>Variant matrix</h1>
          </header>
          <div class="type-stack">
            <template v-for="size in sizes" :key="size.value">
              <article v-for="variant in variants" :key="size.value + variant.name" class="type-card">
                <strong>{{ variant.name }} / {{ size.name }}</strong>
                <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-top: 16px;">
                  <div v-for="state in states" :key="state.name" style="display: grid; gap: 8px; justify-items: start;">
                    <span class="token-meta">{{ state.name }}</span>
                    <Radio
                      v-bind="state.props"
                      :size="size.value"
                      :checked="variant.checked"
                      label="Label"
                    />
                  </div>
                </div>
              </article>
            </template>
          </div>
        </div>
      </section>
    `
  })
};

/** One card per Figma State, every Variant and Size inside it. */
export const States: Story = {
  render: () => ({
    components: { Radio },
    setup: () => ({ variants, sizes, states }),
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Radio</p>
            <h1>States</h1>
          </header>
          <div class="type-stack">
            <article v-for="state in states" :key="state.name" class="type-card">
              <strong>{{ state.name }}</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-top: 16px;">
                <template v-for="size in sizes" :key="size.value">
                  <div v-for="variant in variants" :key="size.value + variant.name" style="display: grid; gap: 8px; justify-items: start;">
                    <span class="token-meta">{{ variant.name }} / {{ size.name }}</span>
                    <Radio
                      v-bind="state.props"
                      :size="size.value"
                      :checked="variant.checked"
                      label="Label"
                    />
                  </div>
                </template>
              </div>
            </article>
          </div>
        </div>
      </section>
    `
  })
};

export const WithoutLabel: Story = {
  args: { label: "", ariaLabel: "Option A" }
};

/** A group: one option is selected at a time; arrow keys move between options. */
export const Group: Story = {
  render: () => ({
    components: { Radio },
    data: () => ({ plan: "monthly" }),
    template: `
      <fieldset style="border:0;margin:0;padding:0">
        <legend class="token-meta" style="padding:0 0 8px">Billing period</legend>
        <div style="display:grid;gap:4px;justify-items:start">
          <Radio v-model="plan" name="plan" value="monthly" label="Monthly" />
          <Radio v-model="plan" name="plan" value="yearly" label="Yearly" />
          <Radio v-model="plan" name="plan" value="lifetime" label="Lifetime" disabled />
        </div>
        <p class="token-meta" style="margin-top:12px">Selected: {{ plan }}</p>
      </fieldset>
    `
  })
};
