import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "tests/**/*.{test,spec}.{ts,tsx}",
      "components/ui/__tests__/**/*.{test,spec}.{ts,tsx}",
    ],
    css: true, // allow importing css/modules in components
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      all: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
