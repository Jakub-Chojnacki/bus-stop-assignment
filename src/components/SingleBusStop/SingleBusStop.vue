<script setup lang="ts">
import { defineProps } from "vue";

type TProps = {
  stop: string;
};

const props = defineProps<TProps>();
</script>

<template>
  <div class="single-bus-stop-wrapper">
    <span class="bus-stop-text">{{ props.stop }}</span>
  </div>
</template>

<style scoped lang="scss">
.single-bus-stop-wrapper {
  display: flex;
  align-items: center;
  min-height: 56px;
  width: 100%;
  padding-inline: 1.5rem;

  &:hover {
    background-color: var(--hover-element-bg-color);
    cursor: pointer;
  }

  .bus-stop-text {
    color: var(--active-link-color);
    font-size: 0.75rem;
    line-height: 1rem;
  }
}
</style>
