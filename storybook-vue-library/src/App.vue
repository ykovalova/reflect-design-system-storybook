<script setup lang="ts">
const statusItems = [
  "Prep completed",
  "Stage 1 foundations transferred from Figma",
  "Stage 2 button component transferred from Figma"
];
</script>

<template>
  <main class="app-shell">
    <section class="hero-card">
      <p class="eyebrow">Vue Storybook Receiver</p>
      <h1>Reflect Design System Transfer Workspace</h1>
      <p class="hero-copy">
        This workspace now contains transferred foundations for color, spacing, and typography,
        plus a prop-driven Vue Button implementation aligned to the Figma variant matrix.
      </p>
      <ul class="status-list">
        <li v-for="item in statusItems" :key="item">{{ item }}</li>
      </ul>
    </section>
  </main>
</template>
