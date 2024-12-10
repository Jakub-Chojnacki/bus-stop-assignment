<template>
  <div class="wrapper">
    <h1>Timetable</h1>
    <MainNavbar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";

import MainNavbar from "../MainNavbar/MainNavbar.vue";

const store = useStore();

onMounted(() => {
  store.dispatch(ActionTypes.FETCH_STOPS);
});
</script>

<style>
.wrapper {
  --main-bg-color: #f3f4f9;
  --heading-text-color: #1a1a1a;
  --base-border-radius: 0.25rem;
  --accent-color: #1952e1;
  --accent-color-dark: #2e3e6e;
  --secondary-color: #9a9da4;
  --main-lighten-2-color: #63666e;
  --active-link-color: #33373c;
  --hover-element-bg-color: #f8f8fb;
  min-height: 100dvh;
  background-color: var(--main-bg-color);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    color: var(--heading-text-color);
  }

  .divider {
    border-bottom: 1px solid var(--main-bg-color);
  }
}
</style>
