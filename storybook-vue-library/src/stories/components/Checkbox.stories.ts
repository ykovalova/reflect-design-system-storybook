import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Checkbox from "../../components/Checkbox/Checkbox.vue";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "boolean" },
    indeterminate: { control: "boolean" },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    ariaLabel: { control: "text" },
    state: { control: "inline-radio", options: ["default", "hover", "focused"] }
  },
  args: {
    modelValue: false,
    indeterminate: false,
    invalid: false,
    disabled: false,
    label: "Label",
    state: "default"
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

type Variant = { name: string; modelValue: boolean; indeterminate: boolean };

const variants: Variant[] = [
  { name: "Unchecked", modelValue: false, indeterminate: false },
  { name: "Checked", modelValue: true, indeterminate: false },
  { name: "Indeterminate", modelValue: false, indeterminate: true }
];

const states = [
  { name: "Default", props: { state: "default" } },
  { name: "Hover", props: { state: "hover" } },
  { name: "Focused", props: { state: "focused" } },
  { name: "Disabled", props: { disabled: true } },
  { name: "Error", props: { invalid: true } }
];

/** One card per Figma Variant, every State inside it (15 variants in total). */
export const VariantMatrix: Story = {
  render: () => ({
    components: { Checkbox },
    setup: () => ({ variants, states }),
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Checkbox</p>
            <h1>Variant matrix</h1>
          </header>
          <div class="type-stack">
            <article v-for="variant in variants" :key="variant.name" class="type-card">
              <strong>{{ variant.name }}</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-top: 16px;">
                <div v-for="state in states" :key="state.name" style="display: grid; gap: 8px; justify-items: start;">
                  <span class="token-meta">{{ state.name }}</span>
                  <Checkbox
                    v-bind="state.props"
                    :model-value="variant.modelValue"
                    :indeterminate="variant.indeterminate"
                    label="Label"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    `
  })
};

/** One card per Figma State, every Variant inside it. */
export const States: Story = {
  render: () => ({
    components: { Checkbox },
    setup: () => ({ variants, states }),
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Checkbox</p>
            <h1>States</h1>
          </header>
          <div class="type-stack">
            <article v-for="state in states" :key="state.name" class="type-card">
              <strong>{{ state.name }}</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-top: 16px;">
                <div v-for="variant in variants" :key="variant.name" style="display: grid; gap: 8px; justify-items: start;">
                  <span class="token-meta">{{ variant.name }}</span>
                  <Checkbox
                    v-bind="state.props"
                    :model-value="variant.modelValue"
                    :indeterminate="variant.indeterminate"
                    label="Label"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    `
  })
};

export const WithoutLabel: Story = {
  args: { label: "", ariaLabel: "Select row" }
};

export const Interactive: Story = {
  render: () => ({
    components: { Checkbox },
    data: () => ({ checked: false }),
    template: `<Checkbox v-model="checked" :label="checked ? 'Selected' : 'Not selected'" />`
  })
};
