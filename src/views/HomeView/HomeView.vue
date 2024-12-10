<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { ActionTypes } from "@/store/actions";

import BusLineSelect from "@/components/BusLineSelect/BusLineSelect.vue";
import MainLayout from "@/components/MainLayout/MainLayout.vue";
import BusStopsGrid from "@/components/BusStopsGrid/BusStopsGrid.vue";

const store = useStore();

onMounted(() => {
  store.dispatch(ActionTypes.FETCH_STOPS);
});
</script>

<template>
  <MainLayout>
    <BusLineSelect />
    <BusStopsGrid />
  </MainLayout>
</template>

<style lang="scss" scoped></style>
