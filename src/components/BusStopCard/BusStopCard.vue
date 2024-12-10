<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import { GetterTypes } from "@/store/getters";

import SingleBusStop from "../SingleBusStop/SingleBusStop.vue";

const store = useStore();
const busStops = computed(
  () => store.getters[GetterTypes.GET_BUS_STOPS_FOR_LINE]
);

console.log(busStops)
</script>

<template>
  <div class="bus-stop-card-wrapper">
    <div class="heading-wrapper"><h2>Bus Line: 104</h2></div>
    <div class="bus-stop-sort">Bus stops</div>
    <div class="single-bus-wrapper" v-for="stop in busStops" :key="stop.stop">
      <SingleBusStop :stop="stop.stop" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bus-stop-card-wrapper {
  width: 100%;

  .heading-wrapper,
  .bus-stop-sort {
    padding-inline: 1.5rem;
    padding-block: 1.5rem 0.5rem;
  }

  .heading-wrapper {
    display: flex;
    align-items: flex-end;

    h2 {
      font-size: 0.875rem;
      color: var(--heading-text-color);
    }
  }
}
</style>
