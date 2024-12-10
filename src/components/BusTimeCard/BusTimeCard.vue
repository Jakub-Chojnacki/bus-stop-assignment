<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "@/store";
import { GetterTypes } from "@/store/getters";

import SingleBusTime from "../SingleBusTime/SingleBusTime.vue";

const store = useStore();

const selectedBusLine = computed(() => store.state.selectedBusStop);

const busTimes = computed(() =>
  selectedBusLine.value
    ? store.getters[GetterTypes.GET_TIMES_FOR_STOP](selectedBusLine.value)
    : null
);

console.log(busTimes.value);
</script>

<template>
  <div class="bus-card-wrapper">
    <div class="bus-card-heading">
      <h2>Bus Stop: {{ selectedBusLine }}</h2>
    </div>
    <div class="bus-stop-sort divider">Time</div>
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

  .bus-card-heading,
  .bus-stop-sort {
    padding-inline: 1.5rem;
    padding-block: 1.5rem 0.5rem;
  }

  .bus-card-heading {
    height: var(--card-header-height);
  }

  .bus-stop-sort{
    height: var(--card-sort-wrapper-height)
  }

  .scroll-wrapper {
    overflow-y: auto;
    max-height: var(--card-list-max-height)
  }

  .bus-card-heading {
    display: flex;
    align-items: flex-end;

    h2 {
      font-size: 0.875rem;
      color: var(--heading-text-color);
    }
  }

  .bus-stop-sort {
    outline: 0;
    background: transparent;
    width: 100%;
    text-align: left;
  }
}
</style>
