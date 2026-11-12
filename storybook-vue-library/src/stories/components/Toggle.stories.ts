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

/** One card per Figma Variant, every State x On/Off inside it (12 variants in total). There is no Hover state. */
export const VariantMatrix: Story = {
  render: () => ({
    components: { Toggle },
    setup: () => ({ variants, states, onOff }),
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Toggle</p>
            <h1>Variant matrix</h1>
          </header>
          <div class="type-stack">
            <article v-for="variant in variants" :key="variant.value" class="type-card">
              <strong>{{ variant.name }}</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 24px 32px; margin-top: 16px;">
                <template v-for="state in states" :key="state.name">
                  <div v-for="o in onOff" :key="state.name + o.name" style="display: grid; gap: 8px; justify-items: start;">
                    <span class="token-meta">{{ state.name }} / {{ o.name }}</span>
                    <Toggle
                      v-bind="state.props"
                      :variant="variant.value"
                      :model-value="o.modelValue"
                      left-label="Label"
                      right-label="Label"
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

/** One card per Figma State, every Variant x On/Off inside it. */
export const States: Story = {
  render: () => ({
    components: { Toggle },
    setup: () => ({ variants, states, onOff }),
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Toggle</p>
            <h1>States</h1>
          </header>
          <div class="type-stack">
            <article v-for="state in states" :key="state.name" class="type-card">
              <strong>{{ state.name }}</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 24px 32px; margin-top: 16px;">
                <template v-for="variant in variants" :key="variant.value">
                  <div v-for="o in onOff" :key="variant.value + o.name" style="display: grid; gap: 8px; justify-items: start;">
                    <span class="token-meta">{{ variant.name }} / {{ o.name }}</span>
                    <Toggle
                      v-bind="state.props"
                      :variant="variant.value"
                      :model-value="o.modelValue"
                      left-label="Label"
                      right-label="Label"
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
  args: { leftLabel: "", rightLabel: "", ariaLabel: "Enable notifications" }
};

export const Interactive: Story = {
  render: () => ({
    components: { Toggle },
    data: () => ({ on: false }),
    template: `<Toggle v-model="on" :right-label="on ? 'On' : 'Off'" left-label="" />`
  })
};
