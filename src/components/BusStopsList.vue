<script setup lang="ts">
import { computed, ref, defineExpose } from "vue";

import { ActionTypes } from "@/store/actions";
import { useStore } from "@/store";

import SingleBusStop from "@/components/SingleBusStop.vue";
import SearchInput from "@/components/SearchInput.vue";
import CardHeader from "@/components/CardHeader.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import ErrorWithRefetch from "@/components/ErrorWithRefetch.vue";

import { TSortDirection } from "@/types/app";

const store = useStore();

const searchValue = ref("");
const sort = ref<TSortDirection>("asc");
const isSortAsc = computed(() => sort.value === "asc");
const busStops = computed(() =>
  store.getters["GET_FILTERED_STOPS"](searchValue.value, sort.value)
);
const isLoadingStops = computed(() => store.state.isLoadingStops);
const error = computed(() => store.state.error);

const handleRetry = (): void => {
  store.dispatch(ActionTypes.FETCH_STOPS);
};

const handleChangeSort = (): void => {
  if (isSortAsc.value) {
    sort.value = "dsc";
  } else {
    sort.value = "asc";
  }
};

defineExpose({ searchValue, busStops, isLoadingStops }); // for testing purposes
</script>

<template>
  <div class="bus-list-wrapper">
    <div class="search-wrapper">
      <SearchInput v-model="searchValue" name="bus-search" id="bus-search" />
    </div>
    <CardHeader
      :is-sortable="true"
      sort-text="Bus stops"
      @click="handleChangeSort"
      :is-sort-asc="isSortAsc"
    />
    <div class="scroll-wrapper">
      <div
        class="single-bus-wrapper divider"
        v-for="stop in busStops"
        :key="stop"
      >
        <SingleBusStop :stop="stop" />
      </div>
      <div class="fetch-state-wrapper" v-if="isLoadingStops">
        <BaseLoader />
      </div>
      <div class="fetch-state-wrapper" v-if="error">
        <ErrorWithRefetch :error="error" :handle-retry="handleRetry" />
      </div>

      <div
        class="empty-stops"
        v-if="!busStops.length && !isLoadingStops && !error"
      >
        No bus stops were found!
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bus-list-wrapper {
  --list-spacing: 0.5rem;
  --container-min-height: 300px;
  background-color: white;

  .search-wrapper {
    padding: var(--list-spacing);
  }

  .scroll-wrapper {
    overflow-y: auto;
    max-height: 590px;
  }

  .empty-stops {
    min-height: var(--container-min-height);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fetch-state-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: var(--container-min-height);
  }
}
</style>
