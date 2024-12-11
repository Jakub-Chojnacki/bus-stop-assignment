<script setup lang="ts">
import { computed } from "vue";

import { GetterTypes } from "@/store/getters";
import { ActionTypes } from "@/store/actions";
import { useStore } from "@/store";

import SingleBusLine from "@/components//SingleBusLine.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import ErrorWithRefetch from "@/components/ErrorWithRefetch.vue"

const store = useStore();
const uniqueLines = computed(() => store.getters[GetterTypes.GET_UNIQUE_LINES]);
const isLoading = computed(() => store.state.isLoadingStops);
const error = computed(() => store.state.error);

const handleRetry = (): void => {
  store.dispatch(ActionTypes.FETCH_STOPS);
};
</script>

<template>
  <div class="main-wrapper">
    <div class="heading-wrapper"><h2>Select Bus Line</h2></div>
    <div class="fetch-state-wrapper" v-if="isLoading">
      <BaseLoader v-if="isLoading" />
    </div>
    <div class="fetch-state-wrapper" v-if="error">
      <ErrorWithRefetch :error="error" :handle-retry="handleRetry" />
    </div>
    <div class="bus-line-wrapper" v-if="!isLoading">
      <SingleBusLine
        v-for="line in uniqueLines"
        :key="String(line)"
        :line="line"
      />
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  --container-min-height: 200px;
  background-color: white;
  border-radius: var(--base-border-radius);
  padding-inline: 1.5rem;
  padding-block: 1.5rem 0.5rem;
  margin-bottom: 1rem;

  .heading-wrapper {
    display: flex;
    align-items: flex-end;

    h2 {
      font-size: 0.875rem;
      color: var(--heading-text-color);
    }
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
    min-height: var(--container-min-height);
  }
}
</style>
