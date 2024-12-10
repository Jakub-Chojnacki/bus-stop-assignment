<script setup lang="ts">
import { ref } from "vue";

import SearchInput from "../SearchInput/SearchInput.vue";

const searchValue = ref("");
</script>

<template>
  <div class="bus-list-wrapper">
    <div class="search-wrapper">
      <SearchInput v-model="searchValue" name="bus-search" id="bus-search" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bus-list-wrapper {
  --list-spacing: 0.5rem;
  background-color: white;

  .search-wrapper {
    padding: var(--list-spacing);
  }
}
</style>
