<script setup lang="ts">
import { computed } from "vue";

import { ActionTypes } from "@/store/actions";
import { useStore } from "@/store";

import SingleBusLine from "@/components//SingleBusLine.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import ErrorWithRefetch from "@/components/ErrorWithRefetch.vue";

const store = useStore();

const uniqueLines = computed(() => store.getters["GET_UNIQUE_LINES"]);
const isLoadingStops = computed(() => store.state.isLoadingStops);
const error = computed(() => store.state.error);

const handleRetry = (): void => {
  store.dispatch(ActionTypes.FETCH_STOPS);
};
</script>

<template>
  <div class="main-wrapper">
    <div class="heading-wrapper">
      <h2>Select Bus Line</h2>
    </div>
    <div class="select-content" :class="{ centered: isLoadingStops || error }">
      <div class="fetch-state-wrapper loading" v-if="isLoadingStops">
        <BaseLoader v-if="isLoadingStops" />
      </div>
      <div class="fetch-state-wrapper error" v-if="error">
        <ErrorWithRefetch :error="error" :handle-retry="handleRetry" />
      </div>
      <div class="bus-line-wrapper" v-if="!isLoadingStops && !error">
        <SingleBusLine v-for="line in uniqueLines" :key="String(line)" :line="line" />
      </div>

    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  background-color: white;
  border-radius: var(--base-border-radius);
  padding-inline: 1.5rem;
  margin-bottom: var(--select-bus-line-bottom-spacing);
  height: var(--select-bus-line-height);
  --content-height: calc(var(--select-bus-line-height) - var(--base-heading-height));

  .heading-wrapper {
    display: flex;
    align-items: flex-end;
    position: sticky;
    top: 0;
    background: white;
    height: var(--base-heading-height);
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;

    h2 {
      font-size: 0.875rem;
      color: var(--heading-text-color);
      font-weight: 500;
    }
  }

  .select-content {
    height: var(--content-height);
  }

  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bus-line-wrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1.5rem;
    padding-left: 0;
  }

  .fetch-state-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
