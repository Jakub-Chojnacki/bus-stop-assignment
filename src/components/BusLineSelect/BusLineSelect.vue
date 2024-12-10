<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import SingleBusLine from "../SingleBusLine/SingleBusLine.vue";

const store = useStore();
const uniqueLines = computed(() => store.getters["getUniqueLines"]);
</script>

<template>
  <div class="main-wrapper">
    <div class="heading-wrapper"><h2>Select Bus Line</h2></div>
    <div class="bus-line-wrapper">
      <SingleBusLine
        v-for="line in uniqueLines"
        :key="line.line"
        :line="line"
      />
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  background-color: white;
  border-radius: var(--base-border-radius);
  padding-inline: 1.5rem;
  padding-block: 1.5rem 0.5rem;
  margin-bottom: 1rem;

  .heading-wrapper {
    display: flex;
    align-items: flex-end;

    h2 {
      font-size: 0.875rem;
      color: var(--heading-text-color);
    }
  }

  .bus-line-wrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1.5rem;
    padding-left: 0;
  }
}
</style>
