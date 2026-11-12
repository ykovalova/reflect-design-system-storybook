<script setup lang="ts">
type CheckboxState = "default" | "hover" | "focused";

const props = withDefaults(
  defineProps<{
    /** Figma "Variant = Checked". Use with `v-model`. */
    modelValue?: boolean;
    /** Figma "Variant = Indeterminate": only some of the nested options are selected. Shown regardless of `modelValue`. */
    indeterminate?: boolean;
    /** Figma "State = Error": marks an invalid choice and sets `aria-invalid`. */
    invalid?: boolean;
    /** Figma "State = Disabled". Skipped by Tab. */
    disabled?: boolean;
    /** Figma "Label" + "Label text". Leave empty for a box without a visible label; then set `ariaLabel`. */
    label?: string;
    /** Accessible name when there is no visible label. */
    ariaLabel?: string;
    /** Forces a visual state (Default, Hover, Focused) for documentation. Real hover and focus work without it. */
    state?: CheckboxState;
  }>(),
  {
    modelValue: false,
    indeterminate: false,
    invalid: false,
    disabled: false,
    label: "Label",
    ariaLabel: undefined,
    state: "default"
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const onChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
};
</script>

<template>
  <label
    :class="[
      'rf-checkbox',
      {
        'rf-checkbox--checked': props.modelValue || props.indeterminate,
        'rf-checkbox--invalid': props.invalid,
        'rf-checkbox--disabled': props.disabled
      }
    ]"
    :data-state="props.state"
  >
    <span class="rf-checkbox__area">
      <input
        class="rf-checkbox__input"
        type="checkbox"
        :checked="props.modelValue"
        :indeterminate="props.indeterminate"
        :disabled="props.disabled"
        :aria-label="props.label ? undefined : props.ariaLabel"
        :aria-checked="props.indeterminate ? 'mixed' : undefined"
        :aria-invalid="props.invalid ? 'true' : undefined"
        @change="onChange"
      />
      <span class="rf-checkbox__box" aria-hidden="true">
        <svg
          v-if="props.indeterminate"
          class="rf-checkbox__glyph rf-checkbox__glyph--dash"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <rect x="4.25" y="6.75" width="7.5" height="2.5" fill="currentColor" />
        </svg>
        <svg
          v-else-if="props.modelValue"
          class="rf-checkbox__glyph rf-checkbox__glyph--check"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            transform="translate(2.25 4.107)"
            fill="currentColor"
            d="M4.714 8.393L11.286 1.821C11.571 1.56 11.571 1.286 11.286 1L10.5 0.214C10.214 -0.071 9.94 -0.071 9.679 0.214L4.321 5.571L1.821 3.071C1.56 2.786 1.286 2.786 1 3.071L0.214 3.857C-0.071 4.143 -0.071 4.417 0.214 4.679L3.929 8.393C4.19 8.655 4.452 8.655 4.714 8.393Z"
          />
        </svg>
      </span>
    </span>
    <span v-if="props.label" class="rf-checkbox__label">{{ props.label }}</span>
  </label>
</template>

<style scoped>
.rf-checkbox {
  --checkbox-fill: var(--color-bg-action-control-unchecked-default);
  --checkbox-border: var(--color-border-field-default);
  --checkbox-glyph: var(--color-icon-on-solid);
  --checkbox-label: var(--color-text-regular);

  display: inline-flex;
  align-items: center;
  gap: var(--space-4);
  height: 1.5rem;
  cursor: pointer;
  color: var(--checkbox-label);
  font-size: var(--font-body-2-regular);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-body-2);
}

/* Clickable area: 24px, the 16px box sits in the middle. */
.rf-checkbox__area {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
}

/* Native input covers the whole area so the browser handles click, Space and focus. */
.rf-checkbox__input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.rf-checkbox__box {
  display: flex;
  box-sizing: border-box;
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--checkbox-border);
  border-radius: 0.125rem;
  background: var(--checkbox-fill);
  color: var(--checkbox-glyph);
  transition:
    background-color 160ms ease,
    border-color 160ms ease;
}

.rf-checkbox__glyph {
  flex: none;
  /* The glyphs are drawn on a 16px canvas; cancel the 1px border so they stay centred. */
  margin: -1px;
}

/* Focus ring: 22x22 layer, 2px stroke, 1px gap around the box, radius r-5. */
.rf-checkbox__area::before {
  content: "";
  position: absolute;
  inset: 1px;
  display: none;
  box-sizing: border-box;
  border: 2px solid var(--color-border-focus-ring);
  border-radius: 0.3125rem;
  pointer-events: none;
}

.rf-checkbox[data-state="focused"] .rf-checkbox__area::before,
.rf-checkbox__area:has(.rf-checkbox__input:focus-visible)::before {
  display: block;
}

/* Checked and indeterminate */
.rf-checkbox--checked {
  --checkbox-fill: var(--color-bg-action-control-checked-default);
  --checkbox-border: transparent;
}

/* Hover */
.rf-checkbox:not(.rf-checkbox--disabled):hover,
.rf-checkbox[data-state="hover"]:not(.rf-checkbox--disabled) {
  --checkbox-fill: var(--color-bg-action-control-unchecked-hover);
}

.rf-checkbox--checked:not(.rf-checkbox--disabled):hover,
.rf-checkbox--checked[data-state="hover"]:not(.rf-checkbox--disabled) {
  --checkbox-fill: var(--color-bg-action-control-checked-hover);
}

/* Error: the invalid choice keeps its look on hover. */
.rf-checkbox--invalid:not(.rf-checkbox--disabled),
.rf-checkbox--invalid:not(.rf-checkbox--disabled):hover {
  --checkbox-fill: var(--color-bg-action-control-unchecked-default);
  --checkbox-border: var(--color-border-field-error);
}

.rf-checkbox--invalid.rf-checkbox--checked:not(.rf-checkbox--disabled),
.rf-checkbox--invalid.rf-checkbox--checked:not(.rf-checkbox--disabled):hover {
  --checkbox-fill: var(--color-bg-action-danger-default);
  --checkbox-border: transparent;
}

/* Disabled */
.rf-checkbox--disabled {
  --checkbox-fill: var(--color-bg-action-control-unchecked-disabled);
  --checkbox-border: var(--color-border-field-disabled);
  --checkbox-label: var(--color-text-disabled);
  cursor: not-allowed;
}

.rf-checkbox--disabled.rf-checkbox--checked {
  --checkbox-fill: var(--color-bg-action-control-checked-disabled);
  --checkbox-border: transparent;
}
</style>
