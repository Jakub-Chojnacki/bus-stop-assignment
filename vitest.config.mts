import { defineConfig } from "vitest/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [viteTsConfigPaths(), vue()],
});
