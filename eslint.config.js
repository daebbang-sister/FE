import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

const isProd = process.env.NODE_ENV === "production";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.env*",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/out/**",
      "**/.turbo/**",
      "**/.vercel/**",
      "**/coverage/**",
      "**/*.min.*",
      "**/pnpm-lock.yaml",
      "**/package-lock.json",
      "**/yarn.lock",
    ],
  },
  {
    files: [
      "eslint.config.{js,mjs,cjs}",
      "**/*.config.{js,mjs,cjs,ts}",
      "postcss.config.{js,mjs,cjs}",
      "tailwind.config.{js,mjs,cjs}",
      "next.config.{js,mjs,cjs,ts}",
      "vitest.config.{js,mjs,cjs,ts}",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,cjs,mjs,ts,tsx,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "warn",
      ...prettier.rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-console": isProd
        ? ["error", { allow: ["warn", "error"] }]
        : ["warn", { allow: ["warn", "error"] }],
      "no-debugger": isProd ? "error" : "warn",
      "react/destructuring-assignment": [
        "error",
        "always",
        { ignoreClassFields: true },
      ],
    },
  },
  {
    files: ["apps/admin/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["apps/client/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    settings: {
      next: { rootDir: "apps/client" },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "warn",
      "@next/next/no-head-element": "warn",
      "@next/next/next-script-for-ga": "warn",
    },
  },
];
