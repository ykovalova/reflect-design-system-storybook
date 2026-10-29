<script setup lang="ts">
type BadgeStatus = "neutral" | "info" | "success" | "warning" | "error";
type BadgeVariant = "default" | "bold";

withDefaults(
  defineProps<{
    /** Figma "Status". `error` maps to the `danger` tokens. */
    status?: BadgeStatus;
    /** Figma "Variant": Default (subtle background) or Bold (solid background). */
    variant?: BadgeVariant;
    /** Figma "Status dot". */
    statusDot?: boolean;
    /** Figma "Label". Keep it short: one line, truncated with an ellipsis. */
    label?: string;
  }>(),
  {
    status: "neutral",
    variant: "default",
    statusDot: true,
    label: "Label"
  }
);
</script>

<template>
  <span :class="['rf-badge', `rf-badge--${status}`, `rf-badge--${variant}`]">
    <span v-if="statusDot" class="rf-badge__dot" aria-hidden="true" />
    <span class="rf-badge__label"><slot>{{ label }}</slot></span>
  </span>
</template>

<style scoped>
.rf-badge {
  --badge-bg: var(--color-bg-status-neutral-subtle);
  --badge-text: var(--color-text-status-neutral);
  --badge-dot: var(--color-icon-status-neutral);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  box-sizing: border-box;
  max-width: 100%;
  height: 1.25rem;
  padding: 1px 0.625rem;
  border-radius: var(--radius-pill);
  background: var(--badge-bg);
  color: var(--badge-text);
  font-size: var(--font-body-2-medium);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-body-2);
  white-space: nowrap;
}

.rf-badge__dot {
  flex: none;
  box-sizing: border-box;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background: var(--badge-dot);
}

.rf-badge__label {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Neutral: the dot is a ring (no fill in Figma). */
.rf-badge--neutral .rf-badge__dot {
  background: transparent;
  border: 1px solid var(--badge-dot);
}

.rf-badge--info {
  --badge-bg: var(--color-bg-status-info-subtle);
  --badge-text: var(--color-text-status-info);
  --badge-dot: var(--color-icon-status-info);
}
.rf-badge--success {
  --badge-bg: var(--color-bg-status-success-subtle);
  --badge-text: var(--color-text-status-success);
  --badge-dot: var(--color-icon-status-success);
}
.rf-badge--warning {
  --badge-bg: var(--color-bg-status-warning-subtle);
  --badge-text: var(--color-text-status-warning);
  --badge-dot: var(--color-icon-status-warning);
}
.rf-badge--error {
  --badge-bg: var(--color-bg-status-danger-subtle);
  --badge-text: var(--color-text-status-danger-default);
  --badge-dot: var(--color-icon-status-danger);
}

.rf-badge--bold {
  --badge-dot: var(--color-icon-on-solid);
}
.rf-badge--bold.rf-badge--neutral {
  --badge-bg: var(--color-bg-status-neutral-solid);
  --badge-text: var(--color-text-on-status-neutral);
}
.rf-badge--bold.rf-badge--info {
  --badge-bg: var(--color-bg-status-info-solid);
  --badge-text: var(--color-text-on-status-info);
}
.rf-badge--bold.rf-badge--success {
  --badge-bg: var(--color-bg-status-success-solid);
  --badge-text: var(--color-text-on-status-success);
}
.rf-badge--bold.rf-badge--warning {
  --badge-bg: var(--color-bg-status-warning-solid);
  --badge-text: var(--color-text-on-status-warning);
  --badge-dot: var(--color-icon-strong);
}
.rf-badge--bold.rf-badge--error {
  --badge-bg: var(--color-bg-status-danger-solid);
  --badge-text: var(--color-text-on-status-danger);
}
</style>
