import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["apps/admin/vite.config.ts", "apps/client/vitest.config.ts"],
  },
});
