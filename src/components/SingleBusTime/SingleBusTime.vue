<script setup lang="ts">
import { defineProps } from "vue";

type TProps = {
  time: string;
};

const props = defineProps<TProps>();
</script>

<template>
  <div class="single-bus-time-wrapper">
    <span class="bus-time-text">{{ props.time }}</span>
  </div>
</template>

<style scoped lang="scss">
.single-bus-time-wrapper {
  display: flex;
  align-items: center;
  min-height: 56px;
  width: 100%;
  padding-inline: 1.5rem;

  &:hover {
    background-color: var(--hover-element-bg-color);
    cursor: pointer;
  }

  .bus-time-text {
    color: var(--active-link-color);
    font-size: 0.75rem;
    line-height: 1rem;
  }
}
</style>
