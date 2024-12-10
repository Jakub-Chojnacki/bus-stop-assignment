<script setup>
import BusLineSelect from "@/components/BusLineSelect/BusLineSelect.vue";
import MainLayout from "@/components/MainLayout/MainLayout.vue";
import BusStopsGrid from "@/components/BusStopsGrid/BusStopsGrid.vue";
</script>

<template>
  <MainLayout>
    <BusLineSelect />
    <BusStopsGrid />
  </MainLayout>
</template>

<style lang="scss" scoped></style>
