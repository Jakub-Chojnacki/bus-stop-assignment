<script setup>
import { onUnmounted } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";

import BusLineSelect from "@/components/BusLineSelect.vue";
import MainLayout from "@/components/MainLayout.vue";
import BusStopsGrid from "@/components/BusStopsGrid.vue";

const store = useStore();

onUnmounted(() => {
  store.dispatch(ActionTypes.SET_SELECTED_BUS_STOP, null);
  store.dispatch(ActionTypes.SET_SELECTED_BUS_LINE, null);
});

</script>

<template>
  <MainLayout>
    <BusLineSelect />
    <BusStopsGrid />
  </MainLayout>
</template>

<style lang="scss" scoped></style>
