<script setup lang="ts">
import { defineProps } from "vue";

import BaseErrorMessage from "@/components/BaseErrorMessage.vue";

type TProps = {
  error: string | null;
  handleRetry: () => void;
};

defineProps<TProps>();
</script>

<template>
  <BaseErrorMessage v-if="error" :error="error" :handle-retry="handleRetry" />
</template>

<style scoped></style>
