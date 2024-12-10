<template>
  <div class="spinner" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<style scoped lang="scss">
.spinner {
  display: inline-block;
  border: 4px solid;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  width: 4rem;
  height: 4rem;
  border-color: var(--accent-color) transparent transparent transparent;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
