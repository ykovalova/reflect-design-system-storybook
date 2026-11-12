import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Toggle from "../../components/Toggle/Toggle.vue";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "boolean" },
    variant: { control: "inline-radio", options: ["default", "recording"] },
    disabled: { control: "boolean" },
    leftLabel: { control: "text" },
    rightLabel: { control: "text" },
    ariaLabel: { control: "text" },
    state: { control: "inline-radio", options: ["default", "focused"] }
  },
  args: {
    modelValue: true,
    variant: "default",
    disabled: false,
    leftLabel: "Label",
    rightLabel: "Label",
    state: "default"
  }
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const variants = [
  { name: "Default", value: "default" },
  { name: "Recording", value: "recording" }
] as const;

const states = [
  { name: "Default", props: { state: "default" } },
  { name: "Focused", props: { state: "focused" } },
  { name: "Disabled", props: { disabled: true } }
];

const onOff = [
  { name: "On", modelValue: true },
  { name: "Off", modelValue: false }
];

/** Every Figma Variant x State x On/Off combination (12 variants). Toggle has no Hover state. */
export const States: Story = {
  render: () => ({
    components: { Toggle },
    setup: () => ({ variants, states, onOff }),
    // Columns are sized to their content and packed to the left, so the grid stays inside narrow canvases;
    // the wrapper scrolls instead of clipping.
    template: `<div style="overflow-x:auto;padding:16px">
      <div v-for="v in variants" :key="v.value" style="margin-bottom:24px">
        <p class="token-meta" style="margin:0 0 12px">{{ v.name }}</p>
        <div style="display:grid;grid-template-columns:max-content repeat(3, max-content);justify-content:start;gap:16px 32px;align-items:center">
          <span></span>
          <span v-for="s in states" :key="s.name" class="token-meta">{{ s.name }}</span>
          <template v-for="o in onOff" :key="o.name">
            <span class="token-meta">{{ o.name }}</span>
            <Toggle
              v-for="s in states"
              :key="v.value + o.name + s.name"
              v-bind="s.props"
              :variant="v.value"
              :model-value="o.modelValue"
              left-label="Label"
              right-label="Label"
            />
          </template>
        </div>
      </div>
    </div>`
  })
};

export const WithoutLabel: Story = {
  args: { leftLabel: "", rightLabel: "", ariaLabel: "Enable notifications" }
};

export const Interactive: Story = {
  render: () => ({
    components: { Toggle },
    data: () => ({ on: false }),
    template: `<Toggle v-model="on" :right-label="on ? 'On' : 'Off'" left-label="" />`
  })
};
