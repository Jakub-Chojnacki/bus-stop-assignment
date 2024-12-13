<script setup lang="ts">
import { defineProps } from "vue";

import ArrowBottomRec from "@/assets/icons/ArrowBottomRec.vue";
import ArrowTopRec from "@/assets/icons/ArrowTopRec.vue";

type TProps = {
  sortText: string;
  isSortable: boolean;
  headerText?: string;
  isSortAsc?: boolean;
  handleChangeSort?: () => void;
};

defineProps<TProps>();
</script>

<template>
  <div>
    <div v-if="headerText" class="bus-card-heading">
      <h2>{{ headerText }}</h2>
    </div>
    <button v-if="isSortable && handleChangeSort" class="bus-sort divider" @click="handleChangeSort">
      {{ sortText }}
      <ArrowBottomRec v-if="isSortAsc" />
      <ArrowTopRec v-if="!isSortAsc" />
    </button>
    <div v-if="!isSortable" class="bus-sort divider">
      {{ sortText }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.bus-card-heading,
.bus-sort {
  padding-inline: 1.5rem;
  padding-block: 1.5rem 0.5rem;
}

.bus-card-heading {
  height: var(--card-header-height);
}

.bus-sort {
  height: var(--card-sort-wrapper-height);

  svg {
    display: inline-block;
  }

}

.bus-card-heading {
  display: flex;
  align-items: flex-end;

  h2 {
    font-size: 0.875rem;
    color: var(--heading-text-color);
    font-weight: 600;
  }
}

.bus-sort {
  outline: 0;
  border-top: 0;
  border-inline: 0;
  background: transparent;
  width: 100%;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
}
</style>
