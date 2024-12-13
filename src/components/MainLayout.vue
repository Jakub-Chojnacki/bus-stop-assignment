<script setup lang="ts">
import { onMounted } from "vue";

import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";

import MainNavbar from "@/components/MainNavbar.vue";

const store = useStore();

onMounted(() => {
  store.dispatch(ActionTypes.FETCH_STOPS);
});
</script>

<template>
  <div class="wrapper">
    <h1>Timetable</h1>
    <MainNavbar />
    <slot />
  </div>
</template>

<style>
.wrapper {
  height: 100dvh;
  background-color: var(--main-bg-color);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    color: var(--heading-text-color);
    font-weight: 600;
    margin: 0;
    margin-bottom: 1.5rem;
  }

  .divider {
    border-bottom: 1px solid var(--main-bg-color);
  }
}
</style>
