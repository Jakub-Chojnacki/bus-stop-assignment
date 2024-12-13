<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import BusStopCard from "@/components/BusStopCard.vue";
import BusTimeCard from "@/components/BusTimeCard.vue";

const store = useStore();

const selectedBusLine = computed(() => store.state.selectedBusLine);
const isSelectedBusStop = computed(() => !!store.state.selectedBusStop);
</script>

<template>
  <div class="bus-select-area-wrapper">
    <div class="bus-card" :class="{ empty: !selectedBusLine }">
      <span v-if="!selectedBusLine" class="not-selected">Please select the bus line first</span>
      <BusStopCard v-else :line="selectedBusLine" />
    </div>


    <div class="bus-card" :class="{ empty: !isSelectedBusStop }">
      <span v-if="!isSelectedBusStop" class="not-selected">Please select the bus stop first</span>
      <BusTimeCard v-else />
    </div>
  </div>
</template>

<style lang="scss">
.bus-select-area-wrapper {
  --main-heading-total-height: calc(var(--main-heading-height) + var(--main-heading-bottom-spacing));
  --select-bus-line-total-height: calc(var(--select-bus-line-height) + var(--select-bus-line-bottom-spacing));
  --nav-total-height: calc(var(--nav-height) + var(--nav-spacing));
  --bus-card-height: calc(100dvh - var(--main-wrapper-padding-block) - var(--nav-total-height) - var(--main-wrapper-padding-block) - var(--main-heading-total-height) - var(--select-bus-line-total-height));
  --card-header-height: var(--base-heading-height);
  --card-sort-wrapper-height: var(--base-heading-height);
  --card-list-height: calc(var(--bus-card-height) - var(--card-header-height) - var(--card-sort-wrapper-height));

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  flex: 1;

  .bus-card {
    border-radius: 4px;
    display: flex;
    background-color: white;

    &.empty {
      align-items: center;
      justify-content: center;
      border: dashed;
      border-image: url("../assets/images/border-img.png") 4 round;
      mask-composite: exclude;
      mask:
        linear-gradient(black 0%, black 100%) border-box;
    }

    .not-selected {
      font-size: 0.875rem;
      color: var(--main-lighten-2-color);
    }

    .bus-card-wrapper {
      width: 100%;

      .scroll-wrapper {
        overflow-y: auto;
        height: var(--card-list-height);
      }
    }
  }
}
</style>
