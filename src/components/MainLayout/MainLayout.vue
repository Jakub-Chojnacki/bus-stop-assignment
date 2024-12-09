<template>
  <div class="wrapper">
    <h1>Timetable</h1>
    <MainNavbar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import MainNavbar from "../MainNavbar/MainNavbar.vue";
</script>

<style scoped>
.wrapper {
  --main-bg-color: #f3f4f9;
  --heading-text-color: #1a1a1a;
  min-height: 100dvh;
  background-color: var(--main-bg-color);
  padding: 2.5rem 2rem;

  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    color: var(--heading-text-color);
  }
}
</style>
