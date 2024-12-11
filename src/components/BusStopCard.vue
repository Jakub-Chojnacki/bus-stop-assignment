<script setup lang="ts">
import { computed, defineProps, Ref, ref } from "vue";
import { useStore } from "@/store";
import { GetterTypes } from "@/store/getters";
import { ActionTypes } from "@/store/actions";

import SingleBusStop from "@/components/SingleBusStop.vue";
import CardHeader from  "@/components/CardHeader.vue"

import { TSortDirection } from "@/types/app";
import { TSingleStop } from "@/types/api";

type TProps = {
  line: number;
};

const props = defineProps<TProps>();

const store = useStore();
const sort: Ref<TSortDirection> = ref("asc");

const isSortAsc = computed(() => sort.value === "asc");
const busStops = computed(() =>
  store.getters[GetterTypes.GET_BUS_STOPS_FOR_LINE](props.line, sort.value)
);

const handleChangeSort = (): void => {
  if (isSortAsc.value) {
    sort.value = "dsc";
  } else {
    sort.value = "asc";
  }
};

const handleSetStop = (stop: TSingleStop["stop"]): void => {
  store.dispatch(ActionTypes.SET_SELECTED_BUS_STOP, stop);
};
</script>

<template>
  <div class="bus-card-wrapper">
    <CardHeader
      :is-sortable="true"
      :sort-text="'Bus Stops'"
      :header-text="`Bus Line: ${props.line}`"
      :is-sort-asc="isSortAsc"
      :handle-change-sort="handleChangeSort"
    />
    <div class="scroll-wrapper">
      <div
        class="single-bus-wrapper divider"
        v-for="stop in busStops"
        :key="stop"
      >
        <SingleBusStop
          :stop="stop"
          @click="handleSetStop(stop)"
          :is-selectable="true"
        />
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
