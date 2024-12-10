<script setup lang="ts">
import { defineProps } from "vue";

import BasicErrorMessage from "../BasicErrorMessage/BasicErrorMessage.vue";

type TProps = {
  error: string | null;
  handleRetry: () => void;
};

defineProps<TProps>();
</script>

<template>
  <BasicErrorMessage v-if="error" :error="error" :handle-retry="handleRetry" />
</template>

<style scoped></style>
