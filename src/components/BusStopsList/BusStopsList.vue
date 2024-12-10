<script setup lang="ts">
import { computed, ref } from "vue";

import { GetterTypes } from "@/store/getters";
import { useStore } from "@/store";

import SingleBusStop from "../SingleBusStop/SingleBusStop.vue";
import SearchInput from "../SearchInput/SearchInput.vue";
import CardHeader from "../CardHeader/CardHeader.vue";
import BasicLoader from "../BasicLoader/BasicLoader.vue";

import { TSortDirection } from "@/types/app";

const store = useStore();

const searchValue = ref("");
const sort = ref<TSortDirection>("asc");
const isSortAsc = computed(() => sort.value === "asc");
const busStops = computed(() =>
  store.getters[GetterTypes.GET_FILTERED_STOPS](searchValue.value, sort.value)
);

const handleChangeSort = () => {
  if (isSortAsc.value) {
    sort.value = "dsc";
  } else {
    sort.value = "asc";
  }
};
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
      <div>
        <BasicLoader />
      </div>
      <div class="empty-stops" v-if="!busStops.length">
        No bus stops were found!
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bus-list-wrapper {
  --list-spacing: 0.5rem;
  background-color: white;

  .search-wrapper {
    padding: var(--list-spacing);
  }

  .scroll-wrapper {
    overflow-y: auto;
    max-height: 590px;
  }

  .empty-stops {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
