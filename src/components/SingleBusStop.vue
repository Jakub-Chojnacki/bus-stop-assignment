<script setup lang="ts">
import { computed, defineProps, withDefaults } from "vue";

import { useStore } from "@/store";

type TProps = {
  stop: string;
  isSelectable?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
  isSelectable: () => false,
});

const store = useStore();

const isSelected = computed(() => store.state.selectedBusStop === props.stop);
</script>

<template>
  <div class="single-bus-stop-wrapper" :class="{ selectable: isSelectable }">
    <span class="bus-stop-text" :class="{ active: isSelected }">{{
      props.stop
    }}</span>
  </div>
</template>

<style scoped lang="scss">
.single-bus-stop-wrapper {
  display: flex;
  align-items: center;
  min-height: 56px;
  width: 100%;
  padding-inline: 1.5rem;

  .bus-stop-text {
    color: var(--active-link-color);
    font-size: 0.75rem;
    line-height: 1rem;

    &.active {
      color: var(--accent-color);
    }
  }
}

.selectable:hover {
  background-color: var(--hover-element-bg-color);
  cursor: pointer;
}
</style>
