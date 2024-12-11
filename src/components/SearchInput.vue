<script setup lang="ts">
import { ref, computed, defineProps } from "vue";

import SearchIcon from "@/assets/icons/SearchIcon.vue";

type TProps = {
  id: string;
  name: string;
  modelValue: string;
};

const props = defineProps<TProps>();

const isFocused = ref(false);
const isFloating = computed(() => isFocused.value || props.modelValue.length);
</script>

<template>
  <div class="input-wrapper">
    <input
      class="search-input"
      type="text"
      :name="props.name"
      :id="props.id"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @focus="isFocused = true"
      @blur="isFocused = false"
      required
    />
    <label for="name" :class="{ 'is-floating': isFloating }">{{
      isFloating ? "Search" : "Search..."
    }}</label>
    <SearchIcon class="search-icon" />
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  --search-input-border-color: #e2e4ea;
  --inline-spacing: 0.5rem;

  position: relative;
  width: fit-content;

  .search-input {
    border-radius: var(--base-border-radius);
    padding: var(--inline-spacing) 1rem;
    border: 1px solid var(--search-input-border-color);
    transition: border-color 0.3s ease;
    &:focus,
    &:active {
      /* border-color: var(--accent-color); */
      outline-color: var(--accent-color);
    }
  }

  label {
    position: absolute;
    left: var(--inline-spacing);
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.75rem;
    color: var(--main-lighten-2-color);
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .is-floating {
    top: 0;
    font-size: 0.625rem;
    padding: 0 4px;
    transform: translateY(-50%);
    background-color: white;
  }

  .search-icon {
    position: absolute;
    right: var(--inline-spacing);
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
