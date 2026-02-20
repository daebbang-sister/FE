import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["../../vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
