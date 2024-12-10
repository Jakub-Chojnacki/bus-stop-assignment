<script setup lang="ts">
import { computed, defineProps, Ref, ref } from "vue";
import { useStore } from "@/store";

import SingleBusStop from "../SingleBusStop/SingleBusStop.vue";
import ArrowBottomRec from "@/assets/icons/ArrowBottomRec.vue";
import ArrowTopRec from "@/assets/icons/ArrowTopRec.vue";

import { GetterTypes } from "@/store/getters";
import { TSortDirection } from "@/types/app";
import { ActionTypes } from "@/store/actions";
import { TSingleStop } from "@/types/api";

type TProps = {
  line: number;
};

const props = defineProps<TProps>();

const store = useStore();
const sort: Ref<TSortDirection> = ref("asc");

const isSortAsc = computed(() => sort.value === "asc");

const handleChangeSort = () => {
  if (isSortAsc.value) {
    sort.value = "dsc";
  } else {
    sort.value = "asc";
  }
};

const handleSetStop = (stop: TSingleStop["stop"]) => {
  store.dispatch(ActionTypes.SET_SELECTED_BUS_STOP, stop);
};

const busStops = computed(() =>
  store.getters[GetterTypes.GET_BUS_STOPS_FOR_LINE](props.line, sort.value)
);
</script>

<template>
  <div class="bus-card-wrapper">
    <div class="bus-card-heading">
      <h2>Bus Line: {{ props.line }}</h2>
    </div>
    <button class="bus-stop-sort divider" @click="handleChangeSort">
      Bus stops
      <ArrowBottomRec v-if="isSortAsc" /> <ArrowTopRec v-else />
    </button>
    <div class="scroll-wrapper">
      <div
        class="single-bus-wrapper divider"
        v-for="stop in busStops"
        :key="stop"
      >
        <SingleBusStop :stop="stop" @click="handleSetStop(stop)" />
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

  .bus-stop-sort {
    height: var(--card-sort-wrapper-height);
  }

  .scroll-wrapper {
    overflow-y: auto;
    max-height: var(--card-list-max-height);
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
    border-top: 0;
    border-inline: 0;
    background: transparent;
    width: 100%;
    text-align: left;
  }
}
</style>
