<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "tertiary-modal"
  | "primary-danger"
  | "secondary-danger"
  | "tertiary-danger";

type ButtonSize = "medium" | "small" | "extra-small";
type ButtonState = "default" | "hover" | "pressed" | "focused" | "disabled" | "loading";
type ButtonIcon = "none" | "plus" | "close" | "arrow-right";

const props = withDefaults(
  defineProps<{
    label?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    state?: ButtonState;
    onlyIcon?: boolean;
    icon?: ButtonIcon;
    iconPosition?: "leading" | "trailing";
    disabled?: boolean;
    ariaLabel?: string;
  }>(),
  {
    label: "Button",
    variant: "primary",
    size: "medium",
    state: "default",
    onlyIcon: false,
    icon: "none",
    iconPosition: "leading",
    disabled: false,
    ariaLabel: "Button"
  }
);

const isLoading = computed(() => props.state === "loading");
const isDisabled = computed(() => props.disabled || props.state === "disabled" || isLoading.value);
const isTextButton = computed(() => props.variant === "tertiary" || props.variant === "tertiary-danger");
const isModalTertiary = computed(() => props.variant === "tertiary-modal");
const supportsExtraSmall = computed(() => props.onlyIcon && isModalTertiary.value);

const resolvedSize = computed<ButtonSize>(() => {
  if (props.size === "extra-small" && !supportsExtraSmall.value) {
    return "small";
  }

  return props.size;
});

const buttonClasses = computed(() => [
  "button-root",
  `button-variant-${props.variant}`,
  `button-size-${resolvedSize.value}`,
  {
    "button-icon-only": props.onlyIcon,
    "button-textual": isTextButton.value
  }
]);

const accessibleLabel = computed(() => (props.onlyIcon ? props.ariaLabel || props.label : undefined));

const iconStrokeWidth = computed(() => (resolvedSize.value === "extra-small" ? 1.75 : 2));
const iconSize = computed(() => {
  if (resolvedSize.value === "extra-small") {
    return 12;
  }

  return resolvedSize.value === "small" ? 14 : 16;
});
</script>

<template>
  <button
    :class="buttonClasses"
    :data-state="state"
    :disabled="isDisabled"
    :aria-label="accessibleLabel"
    type="button"
  >
    <span v-if="isLoading" class="button-spinner" aria-hidden="true" />
    <span
      v-else-if="icon !== 'none' && (iconPosition === 'leading' || onlyIcon)"
      class="button-icon"
      aria-hidden="true"
    >
      <svg
        v-if="icon === 'plus'"
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M8 3V13" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
        <path d="M3 8H13" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
      </svg>
      <svg
        v-else-if="icon === 'close'"
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M4 4L12 12" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
        <path d="M12 4L4 12" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
      </svg>
      <svg
        v-else
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M3 8H13" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
        <path d="M8 3L13 8L8 13" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>

    <span v-if="!onlyIcon" class="button-label">{{ label }}</span>

    <span
      v-if="!isLoading && !onlyIcon && icon !== 'none' && iconPosition === 'trailing'"
      class="button-icon"
      aria-hidden="true"
    >
      <svg
        v-if="icon === 'plus'"
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M8 3V13" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
        <path d="M3 8H13" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
      </svg>
      <svg
        v-else-if="icon === 'close'"
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M4 4L12 12" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
        <path d="M12 4L4 12" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
      </svg>
      <svg
        v-else
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M3 8H13" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" />
        <path d="M8 3L13 8L8 13" :stroke-width="iconStrokeWidth" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.button-root {
  --button-height: 2.5rem;
  --button-padding-inline: var(--space-16);
  --button-gap: var(--space-8);
  --button-radius: 0.25rem;
  --button-font-size: var(--font-button-medium);
  --button-line-height: var(--line-button-medium);
  --button-font-weight: var(--font-weight-medium);
  --button-background: var(--color-action-primary);
  --button-color: var(--color-surface-primary);
  --button-border-color: transparent;
  --button-shadow: none;
  --button-opacity: 1;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--button-gap);
  min-height: var(--button-height);
  padding-inline: var(--button-padding-inline);
  border: 1px solid var(--button-border-color);
  border-radius: var(--button-radius);
  background: var(--button-background);
  color: var(--button-color);
  box-shadow: var(--button-shadow);
  font-size: var(--button-font-size);
  font-weight: var(--button-font-weight);
  line-height: var(--button-line-height);
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    opacity 160ms ease;
  opacity: var(--button-opacity);
}

.button-root:disabled {
  cursor: not-allowed;
}

.button-label,
.button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button-spinner {
  inline-size: 1em;
  block-size: 1em;
  border-radius: 999px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: button-spin 900ms linear infinite;
}

.button-size-medium {
  --button-height: 2.5rem;
  --button-padding-inline: var(--space-16);
  --button-font-size: var(--font-button-medium);
  --button-line-height: var(--line-button-medium);
}

.button-size-small {
  --button-height: 2rem;
  --button-padding-inline: var(--space-12);
  --button-gap: var(--space-8);
  --button-font-size: var(--font-button-small);
  --button-line-height: var(--line-button-small);
}

.button-size-extra-small {
  --button-height: 1.5rem;
  --button-padding-inline: var(--space-8);
  --button-gap: var(--space-2);
  --button-font-size: var(--font-button-small);
  --button-line-height: var(--line-button-small);
  --button-radius: var(--radius-sm);
}

.button-icon-only {
  inline-size: var(--button-height);
  padding-inline: 0;
  border-radius: 50%;
}

.button-variant-primary {
  --button-background: var(--color-action-primary);
  --button-color: var(--color-surface-primary);
}

.button-variant-primary-danger {
  --button-background: var(--color-action-danger);
  --button-color: var(--color-surface-primary);
}

.button-variant-secondary {
  --button-background: var(--color-surface-primary);
  --button-color: var(--color-action-primary);
  --button-border-color: rgba(60, 58, 219, 0.24);
}

.button-variant-secondary-danger {
  --button-background: var(--color-action-danger-surface);
  --button-color: var(--color-action-danger);
  --button-border-color: rgba(210, 120, 114, 0.55);
  --button-shadow: none;
}

.button-variant-tertiary-modal {
  --button-background: rgba(60, 58, 219, 0.08);
  --button-color: var(--color-action-primary);
  --button-border-color: transparent;
  --button-shadow: none;
}

.button-variant-tertiary,
.button-variant-tertiary-danger {
  --button-background: transparent;
  --button-border-color: transparent;
  --button-shadow: none;
  --button-padding-inline: 0;
  --button-height: auto;
  min-height: 0;
  border-radius: 0;
}

.button-variant-tertiary {
  --button-color: var(--color-action-primary);
}

.button-variant-tertiary-danger {
  --button-color: var(--color-action-danger);
}

.button-textual {
  text-decoration: none;
}

.button-root[data-state="hover"]:not(:disabled) {
  transform: none;
}

.button-variant-primary[data-state="hover"]:not(:disabled),
.button-variant-primary:not(:disabled):hover {
  --button-background: var(--color-brand-70);
}

.button-variant-primary-danger[data-state="hover"]:not(:disabled),
.button-variant-primary-danger:not(:disabled):hover {
  --button-background: #6c160f;
}

.button-variant-secondary[data-state="hover"]:not(:disabled),
.button-variant-secondary:not(:disabled):hover,
.button-variant-tertiary-modal[data-state="hover"]:not(:disabled),
.button-variant-tertiary-modal:not(:disabled):hover {
  background: rgba(60, 58, 219, 0.08);
}

.button-variant-secondary-danger[data-state="hover"]:not(:disabled),
.button-variant-secondary-danger:not(:disabled):hover {
  background: rgba(210, 120, 114, 0.08);
}

.button-variant-tertiary[data-state="hover"]:not(:disabled),
.button-variant-tertiary:not(:disabled):hover,
.button-variant-tertiary-danger[data-state="hover"]:not(:disabled),
.button-variant-tertiary-danger:not(:disabled):hover {
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

.button-root[data-state="pressed"]:not(:disabled) {
  transform: translateY(0);
}

.button-variant-primary[data-state="pressed"]:not(:disabled),
.button-variant-primary-danger[data-state="pressed"]:not(:disabled) {
  filter: brightness(0.92);
}

.button-variant-secondary[data-state="pressed"]:not(:disabled),
.button-variant-tertiary-modal[data-state="pressed"]:not(:disabled) {
  background: rgba(60, 58, 219, 0.12);
}

.button-variant-secondary-danger[data-state="pressed"]:not(:disabled) {
  background: rgba(210, 120, 114, 0.12);
}

.button-root[data-state="focused"]:not(:disabled),
.button-root:focus-visible:not(:disabled) {
  outline: 2px solid var(--color-action-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--color-focus-ring);
}

.button-root[data-state="disabled"],
.button-root[data-state="loading"],
.button-root:disabled {
  --button-opacity: 0.48;
}

.button-variant-tertiary[data-state="disabled"],
.button-variant-tertiary-danger[data-state="disabled"],
.button-variant-tertiary-modal[data-state="disabled"] {
  --button-opacity: 0.4;
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
