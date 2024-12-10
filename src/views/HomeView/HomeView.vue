<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

import BusLineSelect from "@/components/BusLineSelect/BusLineSelect.vue";
import MainLayout from "@/components/MainLayout/MainLayout.vue";
import BusStopsGrid from "@/components/BusStopsGrid/BusStopsGrid.vue";

const store = useStore();

onMounted(() => {
  store.dispatch("fetchStops");
});
</script>

<template>
  <MainLayout>
    <BusLineSelect />
    <BusStopsGrid />
  </MainLayout>
</template>

<style lang="scss" scoped></style>
