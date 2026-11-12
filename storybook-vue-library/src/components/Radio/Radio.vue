<script setup lang="ts">
import { computed } from "vue";

type RadioSize = "medium" | "small";
type RadioState = "default" | "hover" | "focused";
type RadioValue = string | number | boolean;

const props = withDefaults(
  defineProps<{
    /** Selected value of the group. This option is checked when it equals `value`. Use with `v-model`. */
    modelValue?: RadioValue | null;
    /** Value of this option. */
    value?: RadioValue;
    /** Native group name. Radios with the same name form one group (arrow keys move between them). */
    name?: string;
    /** Figma "Variant = Checked". When set it overrides the `modelValue === value` check, for documentation. */
    checked?: boolean;
    /** Figma "Size": Medium 16px or Small 12px. */
    size?: RadioSize;
    /** Figma "State = Error": marks an invalid choice and sets `aria-invalid`. */
    invalid?: boolean;
    /** Figma "State = Disabled". Skipped by Tab. */
    disabled?: boolean;
    /** Figma "Show label" + "Label". Leave empty for a radio without a visible label; then set `ariaLabel`. */
    label?: string;
    /** Accessible name when there is no visible label. */
    ariaLabel?: string;
    /** Forces a visual state (Default, Hover, Focused) for documentation. Real hover and focus work without it. */
    state?: RadioState;
  }>(),
  {
    modelValue: null,
    value: true,
    name: undefined,
    checked: undefined,
    size: "medium",
    invalid: false,
    disabled: false,
    label: "Label",
    ariaLabel: undefined,
    state: "default"
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: RadioValue): void;
}>();

const isChecked = computed(() => props.checked ?? props.modelValue === props.value);

const onChange = () => {
  emit("update:modelValue", props.value);
};
</script>

<template>
  <label
    :class="[
      'rf-radio',
      `rf-radio--${props.size}`,
      {
        'rf-radio--checked': isChecked,
        'rf-radio--invalid': props.invalid,
        'rf-radio--disabled': props.disabled
      }
    ]"
    :data-state="props.state"
  >
    <span class="rf-radio__area">
      <input
        class="rf-radio__input"
        type="radio"
        :name="props.name"
        :value="props.value"
        :checked="isChecked"
        :disabled="props.disabled"
        :aria-label="props.label ? undefined : props.ariaLabel"
        :aria-invalid="props.invalid ? 'true' : undefined"
        @change="onChange"
      />
      <span class="rf-radio__circle" aria-hidden="true">
        <span v-if="isChecked" class="rf-radio__dot" />
      </span>
    </span>
    <span v-if="props.label" class="rf-radio__label">{{ props.label }}</span>
  </label>
</template>

<style scoped>
.rf-radio {
  --radio-size: 1rem;
  --radio-dot-size: 0.5rem;
  --radio-ring-inset: 1px;
  --radio-gap: var(--space-4);
  --radio-fill: var(--color-bg-action-control-unchecked-default);
  --radio-border: var(--color-border-default);
  --radio-dot: var(--color-bg-action-control-checked-default);
  --radio-label: var(--color-text-regular);

  display: inline-flex;
  align-items: center;
  gap: var(--radio-gap);
  height: 1.5rem;
  cursor: pointer;
  color: var(--radio-label);
  font-size: var(--font-body-2-regular);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-body-2);
}

/* Small: 12px circle, 6px dot, 18px focus ring, no gap before the label (as in Figma). */
.rf-radio--small {
  --radio-size: 0.75rem;
  --radio-dot-size: 0.375rem;
  --radio-ring-inset: 3px;
  --radio-gap: 0;
}

/* Clickable area: 24px, the circle sits in the middle. */
.rf-radio__area {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
}

/* Native input covers the whole area so the browser handles click, arrow keys and focus. */
.rf-radio__input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.rf-radio__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: var(--radio-size);
  height: var(--radio-size);
  border: 1px solid var(--radio-border);
  border-radius: 50%;
  background: var(--radio-fill);
  transition: border-color 160ms ease;
}

.rf-radio__dot {
  width: var(--radio-dot-size);
  height: var(--radio-dot-size);
  border-radius: 50%;
  background: var(--radio-dot);
}

/* Focus ring: circle with a 2px stroke, 1px gap around the radio (22px Medium, 18px Small). */
.rf-radio__area::before {
  content: "";
  position: absolute;
  inset: var(--radio-ring-inset);
  display: none;
  box-sizing: border-box;
  border: 2px solid var(--color-border-focus-ring);
  border-radius: 50%;
  pointer-events: none;
}

.rf-radio[data-state="focused"] .rf-radio__area::before,
.rf-radio__area:has(.rf-radio__input:focus-visible)::before {
  display: block;
}

/* Checked: the ring takes the brand colour; the inside stays white with the dot. */
.rf-radio--checked {
  --radio-border: var(--color-bg-action-control-checked-default);
}

/* Hover */
.rf-radio:not(.rf-radio--disabled):hover,
.rf-radio[data-state="hover"]:not(.rf-radio--disabled) {
  --radio-border: var(--color-border-field-hover);
}

.rf-radio--checked:not(.rf-radio--disabled):hover,
.rf-radio--checked[data-state="hover"]:not(.rf-radio--disabled) {
  --radio-border: var(--color-bg-action-control-checked-hover);
  --radio-dot: var(--color-bg-action-control-checked-hover);
}

/* Error: the invalid choice keeps its look on hover. */
.rf-radio--invalid:not(.rf-radio--disabled),
.rf-radio--invalid:not(.rf-radio--disabled):hover {
  --radio-border: var(--color-border-action-danger-default);
}

.rf-radio--invalid.rf-radio--checked:not(.rf-radio--disabled),
.rf-radio--invalid.rf-radio--checked:not(.rf-radio--disabled):hover {
  --radio-border: var(--color-border-field-error);
  --radio-dot: var(--color-border-field-error);
}

/* Disabled */
.rf-radio--disabled {
  --radio-fill: var(--color-bg-action-control-unchecked-disabled);
  --radio-border: var(--color-border-disabled);
  --radio-label: var(--color-text-disabled);
  cursor: not-allowed;
}

.rf-radio--disabled.rf-radio--checked {
  --radio-fill: var(--color-bg-action-control-unchecked-default);
  --radio-dot: var(--color-bg-action-control-checked-disabled);
}
</style>
