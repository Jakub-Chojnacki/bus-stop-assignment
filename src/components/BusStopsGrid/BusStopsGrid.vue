<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import BusStopCard from "../BusStopCard/BusStopCard.vue";
import BusTimeCard from "../BusTimeCard/BusTimeCard.vue";

const store = useStore();

const selectedBusLine = computed(() => store.state.selectedBusLine);
const isSelectedBusStop = computed(() => !!store.state.selectedBusStop);
</script>

<template>
  <div class="bus-select-area-wrapper">
    <div class="bus-card" :class="{ empty: !selectedBusLine }">
      <span v-if="!selectedBusLine" class="not-selected"
        >Please select the bus line first</span
      >
      <BusStopCard v-else :line="selectedBusLine" />
    </div>
    <div class="bus-card" :class="{ empty: !isSelectedBusStop }">
      <span v-if="!isSelectedBusStop" class="not-selected"
        >Please select the bus stop first</span
      >

      <BusTimeCard v-else />
    </div>
  </div>
</template>

<style lang="scss">
.bus-select-area-wrapper {
  --card-height: 550px;
  --card-header-height: 56px;
  --card-sort-wrapper-height: 56px;
  --card-list-max-height: calc(
    var(--card-height) - var(--card-header-height) -
      var(--card-sort-wrapper-height)
  );

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  flex-grow: 1;

  .bus-card {
    border-radius: var(--base-border-radius);
    background-color: white;
    border: 2px dashed var(--secondary-color); /*TODO: figure out how to make longer dashes */
    display: flex;
    height: var(--card-height);

    &.empty {
      align-items: center;
      justify-content: center;
    }

    .not-selected {
      font-size: 0.875rem;
      color: var(--main-lighten-2-color);
    }
  }
}
</style>
