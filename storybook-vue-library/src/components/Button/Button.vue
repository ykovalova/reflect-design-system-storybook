<script setup lang="ts">
import { computed, useSlots } from "vue";

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
    /** Single-icon shorthand; placed by `iconPosition`. Ignored for a side that has its own prop or slot. */
    icon?: ButtonIcon;
    iconPosition?: "leading" | "trailing";
    /** Figma "Left icon" (Show left icon + Left icon). Use together with `trailingIcon` for both sides. */
    leadingIcon?: ButtonIcon;
    /** Figma "Right icon" (Show right icon + Right icon). */
    trailingIcon?: ButtonIcon;
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
    leadingIcon: undefined,
    trailingIcon: undefined,
    disabled: false,
    ariaLabel: "Button"
  }
);

/**
 * Any Figma icon can be supplied through slots instead of the built-in names:
 * `leading-icon`, `trailing-icon`, and `icon` (icon-only). A slot wins over the matching prop.
 */
const slots = useSlots();

const ICON_PATHS: Record<Exclude<ButtonIcon, "none">, { d: string; join?: boolean }[]> = {
  plus: [{ d: "M8 3V13" }, { d: "M3 8H13" }],
  close: [{ d: "M4 4L12 12" }, { d: "M12 4L4 12" }],
  "arrow-right": [{ d: "M3 8H13" }, { d: "M8 3L13 8L8 13", join: true }]
};

const isLoading = computed(() => props.state === "loading");
const isDisabled = computed(() => props.disabled || props.state === "disabled" || isLoading.value);
const isTextButton = computed(() => props.variant === "tertiary");
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

const shorthandIcon = (position: "leading" | "trailing"): ButtonIcon => {
  if (props.icon === "none") return "none";
  if (position === "leading") return props.iconPosition === "leading" || props.onlyIcon ? props.icon : "none";
  return props.iconPosition === "trailing" && !props.onlyIcon ? props.icon : "none";
};

const leadingName = computed<ButtonIcon>(() => props.leadingIcon ?? shorthandIcon("leading"));
const trailingName = computed<ButtonIcon>(() => (props.onlyIcon ? "none" : props.trailingIcon ?? shorthandIcon("trailing")));

const hasLeading = computed(
  () => !isLoading.value && (leadingName.value !== "none" || !!slots["leading-icon"] || (props.onlyIcon && !!slots.icon))
);
const hasTrailing = computed(
  () => !isLoading.value && !props.onlyIcon && (trailingName.value !== "none" || !!slots["trailing-icon"])
);
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
    <span v-else-if="hasLeading" class="button-icon" aria-hidden="true">
      <slot v-if="onlyIcon && $slots.icon" name="icon" />
      <slot v-else-if="$slots['leading-icon']" name="leading-icon" />
      <svg v-else :width="iconSize" :height="iconSize" viewBox="0 0 16 16" fill="none">
        <path
          v-for="path in ICON_PATHS[leadingName as Exclude<ButtonIcon, 'none'>]"
          :key="path.d"
          :d="path.d"
          :stroke-width="iconStrokeWidth"
          stroke="currentColor"
          stroke-linecap="round"
          :stroke-linejoin="path.join ? 'round' : undefined"
        />
      </svg>
    </span>

    <span v-if="!onlyIcon" class="button-label">{{ label }}</span>

    <span v-if="hasTrailing" class="button-icon" aria-hidden="true">
      <slot v-if="$slots['trailing-icon']" name="trailing-icon" />
      <svg v-else :width="iconSize" :height="iconSize" viewBox="0 0 16 16" fill="none">
        <path
          v-for="path in ICON_PATHS[trailingName as Exclude<ButtonIcon, 'none'>]"
          :key="path.d"
          :d="path.d"
          :stroke-width="iconStrokeWidth"
          stroke="currentColor"
          stroke-linecap="round"
          :stroke-linejoin="path.join ? 'round' : undefined"
        />
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
  --button-background: var(--color-action-primary-default);
  --button-color: var(--color-action-on-action-default);
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
  --button-background: var(--color-action-primary-default);
  --button-color: var(--color-action-on-action-default);
}

.button-variant-primary-danger {
  --button-background: var(--color-action-danger-default);
  --button-color: var(--color-action-on-action-default);
}

/* Figma "Secondary": white fill, neutral border and text. Hover and pressed darken fill and border;
   the label stays text-on-neutral. Same box metrics as the danger variants below. */
.button-variant-secondary {
  --button-background: var(--color-bg-action-secondary-default);
  --button-color: var(--color-text-on-neutral);
  --button-border-color: var(--color-border-action-secondary-default);
}

/* Figma "Secondary Danger" and "Tertiary Danger": boxed buttons with 4px radius, 12px inline padding
   and Body 1/2 Medium type. Hover and pressed change fill, and for secondary also the border and text. */
.button-variant-secondary-danger {
  --button-background: var(--color-bg-action-danger-secondary-default);
  --button-color: var(--color-text-status-danger-default);
  --button-border-color: var(--color-border-action-danger-default);
  --button-shadow: none;
}

.button-variant-tertiary-danger {
  --button-background: var(--color-bg-action-transparent);
  --button-color: var(--color-text-status-danger-default);
  --button-border-color: transparent;
  --button-shadow: none;
}

.button-variant-secondary,
.button-variant-secondary-danger,
.button-variant-tertiary-danger {
  --button-padding-inline: var(--space-12);
  --button-radius: 0.25rem;
  --button-font-weight: var(--font-weight-medium);
  --button-font-size: var(--font-body-1-medium);
  --button-line-height: var(--line-body-1);
}

.button-variant-secondary.button-size-small,
.button-variant-secondary-danger.button-size-small,
.button-variant-tertiary-danger.button-size-small {
  --button-font-size: var(--font-body-2-medium);
  --button-line-height: var(--line-body-2);
}

.button-variant-secondary.button-icon-only,
.button-variant-secondary-danger.button-icon-only,
.button-variant-tertiary-danger.button-icon-only {
  padding-inline: 0;
  border-radius: var(--button-radius);
}

/* Figma "Tertiary (modals)": transparent fill, neutral text, 4px radius, 12px inline padding.
   Hover/pressed use the neutral overlay tokens; disabled keeps full opacity and only greys the content. */
.button-variant-tertiary-modal {
  --button-background: var(--color-bg-action-transparent);
  --button-color: var(--color-text-on-neutral);
  --button-border-color: transparent;
  --button-shadow: none;
  --button-padding-inline: var(--space-12);
  --button-radius: 0.25rem;
  --button-font-weight: var(--font-weight-medium);
  --button-font-size: var(--font-body-1-medium);
  --button-line-height: var(--line-body-1);
}

.button-variant-tertiary-modal.button-size-small,
.button-variant-tertiary-modal.button-size-extra-small {
  --button-font-size: var(--font-body-2-medium);
  --button-line-height: var(--line-body-2);
}

.button-variant-tertiary-modal.button-size-extra-small {
  --button-radius: 0.25rem;
}

.button-variant-tertiary-modal.button-icon-only {
  padding-inline: 0;
  border-radius: var(--button-radius);
}

.button-variant-tertiary {
  --button-background: transparent;
  --button-border-color: transparent;
  --button-shadow: none;
  --button-padding-inline: 0;
  --button-height: auto;
  min-height: 0;
  border-radius: 0;
}

.button-variant-tertiary {
  --button-color: var(--color-action-primary-default);
}

.button-textual {
  text-decoration: none;
}

.button-root[data-state="hover"]:not(:disabled) {
  transform: none;
}

.button-variant-primary[data-state="hover"]:not(:disabled),
.button-variant-primary:not(:disabled):hover {
  --button-background: var(--color-action-primary-hover);
}

.button-variant-primary-danger[data-state="hover"]:not(:disabled),
.button-variant-primary-danger:not(:disabled):hover {
  --button-background: var(--color-action-danger-hover);
}

.button-variant-secondary[data-state="hover"]:not(:disabled),
.button-variant-secondary:not(:disabled):hover {
  --button-background: var(--color-bg-action-secondary-hover);
  --button-border-color: var(--color-border-action-secondary-hover);
}

.button-variant-tertiary-modal[data-state="hover"]:not(:disabled),
.button-variant-tertiary-modal:not(:disabled):hover {
  background: var(--color-bg-action-tertiary-hover);
}

.button-variant-secondary-danger[data-state="hover"]:not(:disabled),
.button-variant-secondary-danger:not(:disabled):hover {
  --button-background: var(--color-bg-action-danger-secondary-hover);
  --button-border-color: var(--color-border-action-danger-hover);
}

.button-variant-tertiary-danger[data-state="hover"]:not(:disabled),
.button-variant-tertiary-danger:not(:disabled):hover {
  --button-background: var(--color-bg-action-danger-tertiary-hover);
}

.button-variant-tertiary[data-state="hover"]:not(:disabled),
.button-variant-tertiary:not(:disabled):hover {
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

.button-root[data-state="pressed"]:not(:disabled) {
  transform: translateY(0);
}

.button-variant-primary[data-state="pressed"]:not(:disabled) {
  --button-background: var(--color-action-primary-pressed);
}

.button-variant-primary-danger[data-state="pressed"]:not(:disabled) {
  --button-background: var(--color-action-danger-pressed);
}

.button-variant-secondary[data-state="pressed"]:not(:disabled) {
  --button-background: var(--color-bg-action-secondary-pressed);
  --button-border-color: var(--color-border-action-secondary-pressed);
}

.button-variant-tertiary-modal[data-state="pressed"]:not(:disabled) {
  background: var(--color-bg-action-tertiary-pressed);
}

.button-variant-secondary-danger[data-state="pressed"]:not(:disabled) {
  --button-background: var(--color-bg-action-danger-secondary-pressed);
  --button-border-color: var(--color-border-action-danger-pressed);
  --button-color: var(--color-text-status-danger-pressed);
}

.button-variant-tertiary-danger[data-state="pressed"]:not(:disabled) {
  --button-background: var(--color-bg-action-danger-tertiary-pressed);
  --button-color: var(--color-text-status-danger-pressed);
}

.button-root[data-state="focused"]:not(:disabled),
.button-root:focus-visible:not(:disabled) {
  outline: 2px solid var(--color-border-focus-ring);
  outline-offset: 1px;
  box-shadow: none;
}

.button-root[data-state="disabled"],
.button-root[data-state="loading"],
.button-root:disabled {
  --button-opacity: 0.48;
}

.button-variant-primary:disabled:not([data-state="loading"]),
.button-variant-primary-danger:disabled:not([data-state="loading"]) {
  --button-opacity: 1;
}

/* Figma: disabled primary and primary danger are the same neutral grey (fill, border and text). */
.button-variant-primary:disabled:not([data-state="loading"]),
.button-variant-primary-danger:disabled:not([data-state="loading"]) {
  --button-background: var(--color-bg-action-disabled);
  --button-border-color: var(--color-border-action-disabled);
  --button-color: var(--color-text-disabled);
}

.button-variant-tertiary[data-state="disabled"] {
  --button-opacity: 0.4;
}

.button-variant-secondary:disabled:not([data-state="loading"]),
.button-variant-secondary-danger:disabled:not([data-state="loading"]),
.button-variant-tertiary-danger:disabled:not([data-state="loading"]) {
  --button-opacity: 1;
  --button-color: var(--color-text-disabled);
}

.button-variant-secondary:disabled:not([data-state="loading"]),
.button-variant-secondary-danger:disabled:not([data-state="loading"]) {
  --button-background: var(--color-bg-action-disabled);
  --button-border-color: var(--color-border-action-disabled);
}

.button-variant-tertiary-modal:disabled:not([data-state="loading"]) {
  --button-opacity: 1;
  --button-color: var(--color-text-disabled);
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
