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
    <h1 class="main-heading">Timetable</h1>
    <MainNavbar />
    <slot />
  </div>
</template>

<style>
.wrapper {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: var(--main-bg-color);
  padding: var(--main-wrapper-spacing);


  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: var(--heading-text-color);
    line-height: var(--main-heading-height);
    height: var(--main-heading-height);
    margin-bottom: var(--main-heading-bottom-spacing);
  }

  .divider {
    border-bottom: 1px solid var(--main-bg-color);
  }
}
</style>
