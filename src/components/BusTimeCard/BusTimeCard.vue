<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "@/store";
import { GetterTypes } from "@/store/getters";

import SingleBusTime from "../SingleBusTime/SingleBusTime.vue";
import CardHeader from "../CardHeader/CardHeader.vue";

const store = useStore();

const selectedBusLine = computed(() => store.state.selectedBusStop);

const busTimes = computed(() =>
  selectedBusLine.value
    ? store.getters[GetterTypes.GET_TIMES_FOR_STOP](selectedBusLine.value)
    : []
);
</script>

<template>
  <div class="bus-card-wrapper">
    <CardHeader
      :is-sortable="false"
      :sort-text="'Time'"
      :header-text="`Bus Stop: ${selectedBusLine}`"
      :is-sort-asc="false"
      :handle-change-sort="() => {}"
    />
    <div class="scroll-wrapper">
      <div
        class="single-bus-wrapper divider"
        v-for="busTime in busTimes"
        :key="busTime"
      >
        <SingleBusTime :time="busTime" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bus-card-wrapper {
  width: 100%;

  .scroll-wrapper {
    overflow-y: auto;
    max-height: var(--card-list-max-height);
  }
}
</style>
