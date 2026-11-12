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

/** Every Figma State × Variant combination (15 variants). */
export const States: Story = {
  render: () => ({
    components: { Checkbox },
    setup: () => ({ variants, states }),
    template: `<div style="display:grid;grid-template-columns:auto repeat(3, max-content);gap:16px 32px;align-items:center">
      <span></span>
      <span v-for="v in variants" :key="v.name" class="token-meta">{{ v.name }}</span>
      <template v-for="s in states" :key="s.name">
        <span class="token-meta">{{ s.name }}</span>
        <Checkbox
          v-for="v in variants"
          :key="s.name + v.name"
          v-bind="s.props"
          :model-value="v.modelValue"
          :indeterminate="v.indeterminate"
          label="Label"
        />
      </template>
    </div>`
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
