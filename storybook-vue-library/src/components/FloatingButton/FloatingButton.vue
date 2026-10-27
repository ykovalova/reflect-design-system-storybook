<script setup lang="ts">
import { computed } from "vue";

type FloatingButtonAppearance = "closed" | "opened";
type FloatingButtonSize = "medium" | "small";
type FloatingButtonState = "default" | "hover" | "pressed" | "focused" | "disabled" | "loading";

const props = withDefaults(
  defineProps<{
    /** Figma "Appearance": closed = purple, opened = neutral. Opened rotates the icon 45 degrees. */
    appearance?: FloatingButtonAppearance;
    size?: FloatingButtonSize;
    /** Forces a visual state for documentation; real hover, press and focus work without it. */
    state?: FloatingButtonState;
    disabled?: boolean;
    /** The button has no visible label, so it needs one: it describes the action (for example "Add step"). */
    ariaLabel: string;
  }>(),
  {
    appearance: "closed",
    size: "medium",
    state: "default",
    disabled: false
  }
);

const isLoading = computed(() => props.state === "loading");
const isDisabled = computed(() => props.disabled || props.state === "disabled" || isLoading.value);
const iconSize = computed(() => (props.size === "small" ? 20 : 24));
</script>

<template>
  <button
    :class="['floating-button', `floating-button-${appearance}`, `floating-button-${size}`]"
    :data-state="state"
    :disabled="isDisabled"
    :aria-label="ariaLabel"
    type="button"
  >
    <span v-if="isLoading" class="floating-button-spinner" aria-hidden="true" />
    <span v-else class="floating-button-icon" aria-hidden="true">
      <!-- Any icon from the Figma Icon set can replace the default plus. -->
      <slot>
        <svg :width="iconSize" :height="iconSize" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </slot>
    </span>
  </button>
</template>

<style scoped>
.floating-button {
  --fb-size: 3.75rem;
  --fb-background: var(--color-bg-action-primary-default);
  --fb-border: var(--color-border-action-primary-default);
  --fb-color: var(--color-action-on-action-default);
  --fb-rotation: 0deg;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--fb-size);
  block-size: var(--fb-size);
  padding: 0;
  border: 1px solid var(--fb-border);
  border-radius: 50%;
  background: var(--fb-background);
  color: var(--fb-color);
  box-shadow: var(--shadow-elevation-0);
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease;
}

.floating-button:disabled {
  cursor: not-allowed;
}

.floating-button-small {
  --fb-size: 2.5rem;
}

.floating-button-icon {
  display: inline-flex;
  transform: rotate(var(--fb-rotation));
}

.floating-button-spinner {
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border-radius: 999px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: floating-button-spin 900ms linear infinite;
}

/* Opened: neutral fill, icon rotated 45deg so the plus reads as close. */
.floating-button-opened {
  --fb-background: var(--color-bg-action-secondary-default);
  --fb-border: var(--color-border-action-secondary-default);
  --fb-color: var(--color-text-on-neutral);
  --fb-rotation: 45deg;
}

.floating-button-closed[data-state="hover"]:not(:disabled),
.floating-button-closed:not(:disabled):hover {
  --fb-background: var(--color-bg-action-primary-hover);
  --fb-border: var(--color-border-action-primary-hover);
}

.floating-button-closed[data-state="pressed"]:not(:disabled),
.floating-button-closed:not(:disabled):active {
  --fb-background: var(--color-bg-action-primary-pressed);
  --fb-border: var(--color-border-action-primary-pressed);
}

.floating-button-opened[data-state="hover"]:not(:disabled),
.floating-button-opened:not(:disabled):hover {
  --fb-background: var(--color-bg-action-secondary-hover);
  --fb-border: var(--color-border-action-secondary-hover);
}

.floating-button-opened[data-state="pressed"]:not(:disabled),
.floating-button-opened:not(:disabled):active {
  --fb-background: var(--color-gray-15);
  --fb-border: var(--color-gray-70);
}

.floating-button:disabled:not([data-state="loading"]),
.floating-button[data-state="disabled"] {
  --fb-background: var(--color-bg-action-disabled);
  --fb-border: var(--color-border-action-disabled);
  --fb-color: var(--color-action-on-action-disabled);
}

/* Focus ring: 2px stroke with a 3px offset from the button edge (outline-offset 1px + 2px stroke). */
.floating-button:focus-visible:not(:disabled),
.floating-button[data-state="focused"] {
  outline: 2px solid var(--color-border-focus-ring);
  outline-offset: 1px;
  box-shadow: none;
}

@keyframes floating-button-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-button-spinner {
    animation-duration: 3s;
  }
}
</style>
