<script setup lang="ts">
type ToggleVariant = "default" | "recording";
type ToggleState = "default" | "focused";

const props = withDefaults(
  defineProps<{
    /** Figma "On/Off". Use with `v-model`. */
    modelValue?: boolean;
    /** Figma "Variant". Recording shows a red dot on the knob when on and a pause icon when off. */
    variant?: ToggleVariant;
    /** Figma "State = Disabled". Skipped by Tab. */
    disabled?: boolean;
    /** Figma "Left label" + "Left label text". Leave empty to hide it. */
    leftLabel?: string;
    /** Figma "Right label" + "Right label text". Leave empty to hide it. */
    rightLabel?: string;
    /** Accessible name when there is no visible label. */
    ariaLabel?: string;
    /** Forces the Focused look for documentation. Real keyboard focus works without it. There is no Hover state. */
    state?: ToggleState;
  }>(),
  {
    modelValue: false,
    variant: "default",
    disabled: false,
    leftLabel: "",
    rightLabel: "Label",
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
      'rf-toggle',
      `rf-toggle--${props.variant}`,
      { 'rf-toggle--on': props.modelValue, 'rf-toggle--disabled': props.disabled }
    ]"
    :data-state="props.state"
  >
    <span v-if="props.leftLabel" class="rf-toggle__label">{{ props.leftLabel }}</span>
    <span class="rf-toggle__switch">
      <input
        class="rf-toggle__input"
        type="checkbox"
        role="switch"
        :checked="props.modelValue"
        :disabled="props.disabled"
        :aria-label="props.leftLabel || props.rightLabel ? undefined : props.ariaLabel"
        @change="onChange"
      />
      <span class="rf-toggle__track" aria-hidden="true" />
      <span class="rf-toggle__knob" aria-hidden="true">
        <span v-if="props.variant === 'recording' && props.modelValue" class="rf-toggle__dot" />
        <span v-else-if="props.variant === 'recording'" class="rf-toggle__pause">
          <span class="rf-toggle__bar" />
          <span class="rf-toggle__bar" />
        </span>
      </span>
    </span>
    <span v-if="props.rightLabel" class="rf-toggle__label">{{ props.rightLabel }}</span>
  </label>
</template>

<style scoped>
.rf-toggle {
  --toggle-track: var(--color-bg-action-control-unchecked-active);
  --toggle-label: var(--color-text-regular);
  --toggle-dot: var(--color-icon-status-danger);

  display: inline-flex;
  align-items: center;
  gap: var(--space-8);
  height: 1.5rem;
  cursor: pointer;
  color: var(--toggle-label);
  font-size: var(--font-body-2-regular);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-body-2);
}

/* Switch: 30x16. The 12px track sits in the middle; the 16px knob overlaps its end. */
.rf-toggle__switch {
  position: relative;
  flex: none;
  width: 1.875rem;
  height: 1rem;
}

/* Native input covers the whole switch so the browser handles click, Space and focus. */
.rf-toggle__input {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.rf-toggle__track {
  position: absolute;
  top: 0.125rem;
  left: 0;
  width: 1.875rem;
  height: 0.75rem;
  border-radius: var(--radius-pill);
  background: var(--toggle-track);
  transition: background-color 160ms ease;
}

.rf-toggle__knob {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--color-bg-raised);
  box-shadow: 0.5px 0.5px 2px rgba(62, 62, 70, 0.35);
  transition: left 160ms ease;
}

.rf-toggle--on .rf-toggle__knob {
  left: 0.875rem;
}

/* Recording: red dot when on, pause icon when off. */
.rf-toggle__dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background: var(--toggle-dot);
}

.rf-toggle__pause {
  display: flex;
  gap: 0.104rem;
}

.rf-toggle__bar {
  width: 0.156rem;
  height: 0.469rem;
  background: var(--color-icon-disabled);
}

/* Focus ring: 36x18 layer, 2px stroke, 3px around the track, pill radius. */
.rf-toggle__switch::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -3px;
  display: none;
  box-sizing: border-box;
  width: 2.25rem;
  height: 1.125rem;
  border: 2px solid var(--color-border-focus-ring);
  border-radius: 9px;
  pointer-events: none;
}

.rf-toggle[data-state="focused"] .rf-toggle__switch::before,
.rf-toggle__switch:has(.rf-toggle__input:focus-visible)::before {
  display: block;
}

/* On */
.rf-toggle--on {
  --toggle-track: var(--color-bg-action-control-checked-default);
}

/* Disabled */
.rf-toggle--disabled {
  --toggle-track: var(--color-bg-action-control-unchecked-disabled);
  --toggle-label: var(--color-text-disabled);
  --toggle-dot: var(--color-icon-disabled);
  cursor: not-allowed;
}

.rf-toggle--disabled.rf-toggle--on {
  --toggle-track: var(--color-bg-action-control-checked-disabled);
}
</style>
