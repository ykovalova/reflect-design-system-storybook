import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Field from "../../components/Field/Field.vue";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "text" },
    size: { control: "inline-radio", options: ["medium", "small"] },
    label: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    type: { control: "text" },
    ariaLabel: { control: "text" },
    state: { control: "inline-radio", options: ["default", "hover", "active", "focused"] }
  },
  args: {
    modelValue: "",
    size: "medium",
    label: "Label",
    helperText: "Helper text",
    placeholder: "Field text",
    invalid: false,
    disabled: false,
    required: false,
    type: "text",
    state: "default"
  },
  parameters: {
    docs: {
      description: {
        component:
          "Single-line text input with optional label, helper text and left/right icons (slots `leading-icon` and `trailing-icon`). Use it for short free text such as names, URLs and search. For multi-line text use Text area field; for numeric steps use Number field. Width: min 160px, max 580px. Required fields show an asterisk after the label. The label is linked to the input, helper and error text are linked with `aria-describedby`, and the Error state sets `aria-invalid`."
      }
    }
  }
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const sizes = [
  { name: "Medium", value: "medium" },
  { name: "Small", value: "small" }
] as const;

/** Figma states. Default is empty (placeholder); the others show the value "Field text". */
const states = [
  { name: "Default", props: { state: "default", modelValue: "", placeholder: "Field text" } },
  { name: "Hover", props: { state: "hover", modelValue: "Field text" } },
  { name: "Active", props: { state: "active", modelValue: "Field text" } },
  { name: "Focused", props: { state: "focused", modelValue: "Field text" } },
  { name: "Filled", props: { state: "default", modelValue: "Field text" } },
  { name: "Disabled", props: { disabled: true, modelValue: "Field text" } },
  { name: "Error", props: { invalid: true, modelValue: "Field text" } }
];

const searchIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="4.25" stroke="currentColor" stroke-width="1.5"/><path d="M9.5 9.5L12.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const closeIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

/** One card per Figma Size, every State inside it (14 variants in total). */
export const VariantMatrix: Story = {
  render: () => ({
    components: { Field },
    setup: () => ({ sizes, states }),
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Field</p>
            <h1>Variant matrix</h1>
          </header>
          <div class="type-stack">
            <article v-for="size in sizes" :key="size.value" class="type-card">
              <strong>{{ size.name }}</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-top: 16px;">
                <div v-for="state in states" :key="state.name" style="display: grid; gap: 8px; justify-items: start;">
                  <span class="token-meta">{{ state.name }}</span>
                  <Field v-bind="state.props" :size="size.value" label="Label" helper-text="Helper text" style="width: 240px;" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    `
  })
};

/** One card per Figma State, both Sizes inside it. */
export const States: Story = {
  render: () => ({
    components: { Field },
    setup: () => ({ sizes, states }),
    template: `
      <section class="docs-page">
        <div class="docs-stack">
          <header class="docs-heading">
            <p class="eyebrow">Field</p>
            <h1>States</h1>
          </header>
          <div class="type-stack">
            <article v-for="state in states" :key="state.name" class="type-card">
              <strong>{{ state.name }}</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-top: 16px;">
                <div v-for="size in sizes" :key="size.value" style="display: grid; gap: 8px; justify-items: start;">
                  <span class="token-meta">{{ size.name }}</span>
                  <Field v-bind="state.props" :size="size.value" label="Label" helper-text="Helper text" style="width: 240px;" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    `
  })
};

export const WithIcons: Story = {
  render: () => ({
    components: { Field },
    setup: () => ({ searchIcon, closeIcon }),
    data: () => ({ value: "Reflect" }),
    template: `
      <Field v-model="value" label="Search" helper-text="Search by test name">
        <template #leading-icon><span v-html="searchIcon" /></template>
        <template #trailing-icon><span v-html="closeIcon" /></template>
      </Field>
    `
  })
};

export const WithoutLabel: Story = {
  args: { label: "", helperText: "", ariaLabel: "Search tests", placeholder: "Search" }
};

export const Required: Story = {
  args: { required: true, label: "Email", type: "email", placeholder: "name@example.com" }
};

export const ErrorMessage: Story = {
  args: { invalid: true, modelValue: "not-an-email", label: "Email", helperText: "Enter a valid email address" }
};

export const Interactive: Story = {
  render: () => ({
    components: { Field },
    data: () => ({ value: "" }),
    template: `
      <Field v-model="value" label="Name" placeholder="Your name" :helper-text="value ? 'Hello, ' + value : 'Type to see it update'" />
    `
  })
};
