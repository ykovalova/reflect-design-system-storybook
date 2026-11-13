<script setup lang="ts">
import { computed } from "vue";

type FieldSize = "medium" | "small";
type FieldState = "default" | "hover" | "active" | "focused";

let fieldCounter = 0;

const props = withDefaults(
  defineProps<{
    /** Field text. Use with `v-model`. */
    modelValue?: string;
    /** Figma "Size": Medium 40px or Small 32px. */
    size?: FieldSize;
    /** Figma "Show label" + "Label". Leave empty to hide it; then set `ariaLabel`. */
    label?: string;
    /** Figma "Show helper text" + "Helper text". In the error state it becomes the error message. */
    helperText?: string;
    /** Grey prompt shown while the field is empty (Figma Default state "Field text"). */
    placeholder?: string;
    /** Figma "State = Error": marks an invalid value and sets `aria-invalid`. */
    invalid?: boolean;
    /** Figma "State = Disabled". Skipped by Tab. */
    disabled?: boolean;
    /** Required fields show an asterisk after the label. */
    required?: boolean;
    /** Native input type (text, email, url, search, ...). */
    type?: string;
    /** Native input id. Generated when omitted. */
    id?: string;
    name?: string;
    /** Accessible name when there is no visible label. */
    ariaLabel?: string;
    /** Forces a visual state (Default, Hover, Active, Focused) for documentation. Real hover and focus work without it. */
    state?: FieldState;
  }>(),
  {
    modelValue: "",
    size: "medium",
    label: "Label",
    helperText: "",
    placeholder: "",
    invalid: false,
    disabled: false,
    required: false,
    type: "text",
    id: undefined,
    name: undefined,
    ariaLabel: undefined,
    state: "default"
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const autoId = `rf-field-${++fieldCounter}`;
const inputId = computed(() => props.id ?? autoId);
const helperId = computed(() => `${inputId.value}-helper`);

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div
    :class="[
      'rf-field',
      `rf-field--${props.size}`,
      { 'rf-field--invalid': props.invalid, 'rf-field--disabled': props.disabled }
    ]"
    :data-state="props.state"
  >
    <label v-if="props.label" class="rf-field__label" :for="inputId">
      {{ props.label }}<span v-if="props.required" class="rf-field__required" aria-hidden="true"> *</span>
    </label>
    <div class="rf-field__control">
      <span v-if="$slots['leading-icon']" class="rf-field__icon"><slot name="leading-icon" /></span>
      <input
        :id="inputId"
        class="rf-field__input"
        :type="props.type"
        :name="props.name"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :required="props.required"
        :aria-label="props.label ? undefined : props.ariaLabel"
        :aria-invalid="props.invalid ? 'true' : undefined"
        :aria-describedby="props.helperText ? helperId : undefined"
        @input="onInput"
      />
      <span v-if="$slots['trailing-icon']" class="rf-field__icon"><slot name="trailing-icon" /></span>
    </div>
    <p v-if="props.helperText" :id="helperId" class="rf-field__helper">{{ props.helperText }}</p>
  </div>
</template>

<style scoped>
.rf-field {
  --field-height: 2.5rem;
  --field-font: var(--font-body-1-regular);
  --field-line: var(--line-body-1);
  --field-label-font: var(--font-body-1-medium);
  --field-bg: var(--color-bg-raised);
  --field-border: var(--color-border-field-default);
  --field-text: var(--color-text-regular);
  --field-placeholder: var(--color-text-placeholder);
  --field-label: var(--color-text-regular);
  --field-helper: var(--color-text-regular);
  --field-ring: none;

  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  box-sizing: border-box;
  width: 23.75rem;
  min-width: 10rem;
  max-width: 36.25rem;
}

.rf-field--small {
  --field-height: 2rem;
  --field-font: var(--font-body-2-regular);
  --field-line: var(--line-body-2);
  --field-label-font: var(--font-body-2-medium);
}

.rf-field__label {
  overflow: hidden;
  color: var(--field-label);
  font-size: var(--field-label-font);
  font-weight: var(--font-weight-medium);
  line-height: var(--field-line);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rf-field__control {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  box-sizing: border-box;
  height: var(--field-height);
  padding: var(--space-8) var(--space-12);
  border: 1px solid var(--field-border);
  border-radius: 0.25rem;
  background: var(--field-bg);
  box-shadow: var(--field-ring);
  transition:
    background-color 160ms ease,
    border-color 160ms ease;
}

.rf-field__icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
}

.rf-field__input {
  flex: 1 1 0;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--field-text);
  font: inherit;
  font-size: var(--field-font);
  font-weight: var(--font-weight-regular);
  line-height: var(--field-line);
  text-overflow: ellipsis;
}

.rf-field__input::placeholder {
  color: var(--field-placeholder);
  opacity: 1;
}

.rf-field__helper {
  margin: 0;
  color: var(--field-helper);
  font-size: var(--font-body-2-regular);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-body-2);
}

/* Hover */
.rf-field:not(.rf-field--disabled):hover,
.rf-field[data-state="hover"]:not(.rf-field--disabled) {
  --field-bg: var(--color-bg-sunken);
  --field-border: var(--color-border-field-hover);
}

/* Active: cursor in the field (brand border, no ring). */
.rf-field[data-state="active"]:not(.rf-field--disabled) {
  --field-bg: var(--color-bg-raised);
  --field-border: var(--color-border-action-primary-default);
}

/* Focused: brand border plus the focus ring, drawn outside the border. */
.rf-field:not(.rf-field--disabled):focus-within,
.rf-field[data-state="focused"]:not(.rf-field--disabled) {
  --field-bg: var(--color-bg-raised);
  --field-border: var(--color-border-action-primary-default);
  --field-ring: 0 0 0 3px var(--color-border-focus-ring);
}

/* Error: the red edge stays on hover; with focus it stacks with the ring. */
.rf-field--invalid:not(.rf-field--disabled),
.rf-field--invalid:not(.rf-field--disabled):hover,
.rf-field--invalid:not(.rf-field--disabled):focus-within {
  --field-border: var(--color-border-field-error);
}

.rf-field--invalid:not(.rf-field--disabled) {
  --field-helper: var(--color-text-status-danger-default);
}

.rf-field--invalid:not(.rf-field--disabled):hover {
  --field-bg: var(--color-bg-raised);
}

.rf-field__required {
  color: var(--color-text-status-danger-default);
}

/* Disabled */
.rf-field--disabled {
  --field-bg: var(--color-bg-disabled);
  --field-border: var(--color-border-field-disabled);
  --field-text: var(--color-text-disabled);
  --field-placeholder: var(--color-text-disabled);
  --field-label: var(--color-text-disabled);
  --field-helper: var(--color-text-disabled);
}

.rf-field--disabled .rf-field__input {
  cursor: not-allowed;
}
</style>
