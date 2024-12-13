<script setup lang="ts">
import { computed, defineExpose } from "vue";

import { useStore } from "@/store";

import SingleBusTime from "@/components/SingleBusTime.vue";
import CardHeader from "@/components/CardHeader.vue";

const store = useStore();

const selectedBusLine = computed(() => store.state.selectedBusStop);

const busTimes = computed(() =>
  selectedBusLine.value
    ? store.getters["GET_TIMES_FOR_STOP"](selectedBusLine.value)
    : []
);

defineExpose({ selectedBusLine, busTimes });
</script>

<template>
  <div class="bus-card-wrapper">
    <CardHeader :is-sortable="false" :sort-text="'Time'" :header-text="`Bus Stop: ${selectedBusLine}`"
      :is-sort-asc="false" />
    <div class="scroll-wrapper">
      <div class="single-bus-wrapper divider" v-for="busTime in busTimes" :key="busTime">
        <SingleBusTime :time="busTime" />
      </div>
    </div>
  </div>
</template>