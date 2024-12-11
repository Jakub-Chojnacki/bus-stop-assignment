<script setup>
import BusLineSelect from "@/components/BusLineSelect.vue";
import MainLayout from "@/components/MainLayout.vue";
import BusStopsGrid from "@/components/BusStopsGrid.vue";
</script>

<template>
  <MainLayout>
    <BusLineSelect />
    <BusStopsGrid />
  </MainLayout>
</template>

<style lang="scss" scoped></style>
