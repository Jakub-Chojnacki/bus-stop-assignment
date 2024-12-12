import { defineConfig } from "vitest/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [viteTsConfigPaths(), vue()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }], //needed to make alias work in tests
  },
});
