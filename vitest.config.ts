import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    alias: {
      "@gcds-core/components-react": path.resolve(
        __dirname,
        "__mocks__/@gcds-core/components-react.tsx"
      ),
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: ["app/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
      exclude: [
        "**/*.{test,spec}.{ts,tsx}",
        "**/*.d.ts",
        "test/**",
        ".next/**",
        "coverage/**",
        "node_modules/**",
      ],
      thresholds: {
        statements: 10,
        branches: 10,
        functions: 10,
        lines: 10,
      },
    },
  },
});
