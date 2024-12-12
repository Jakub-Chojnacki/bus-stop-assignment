<script setup lang="ts">
import { defineProps } from "vue";

type TProps = {
  error: string;
  handleRetry?: () => void;
};

defineProps<TProps>();
</script>

<template>
  <div class="error-wrapper">
    <p>{{ error }}</p>
    <button type="button" v-if="handleRetry" @click="handleRetry">Try again</button>
  </div>
</template>

<style scoped lang="scss">
.error-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  flex-direction: column;
  color: var(--error-text-color);

  button {
    appearance: none;
    background-color: var(--accent-color);
    border-radius: 6px;
    color: white;
    display: inline-block;
    font-size: 0.875rem;
    padding: 0.375rem 1rem;
    text-align: center;
    transition: all 0.15s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
