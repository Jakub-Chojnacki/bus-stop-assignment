<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useStore } from "@/store";

import { ActionTypes } from "@/store/actions";

const store = useStore();

interface IProps {
  line: number;
}

const props = defineProps<IProps>();
const isSelected = computed(() => store.state.selectedBusLine === props.line);
</script>

<template>
  <button
    @click="store.dispatch(ActionTypes.SET_SELECTED_BUS_LINE, props.line)"
    class="single-line-button"
    :class="{ active: isSelected }"
    type="button"
  >
    {{ props.line }}
  </button>
</template>

<style scoped>
.single-line-button {
  padding: 0.5rem 1rem;
  background: var(--accent-color);
  color: white;
  outline: 0;
  border: 0;
  border-radius: var(--base-border-radius);

  &:hover,
  &.active {
    background: var(--accent-color-dark);
  }
}
</style>
