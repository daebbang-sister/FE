import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";
import nextPlugin from "@next/eslint-plugin-next";

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

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ✅ 공통: JS/TS/React
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
      // React 17+
      "react/react-in-jsx-scope": "off",

      // ✅ Q7 useEffect deps: warn
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "warn",

      // ✅ Prettier 충돌 방지(스타일 룰은 Prettier가 담당)
      ...prettier.rules,

      // ✅ Q1 any: warn
      "@typescript-eslint/no-explicit-any": "warn",

      // ✅ Q2 unused vars: warn (TS 룰만 쓰고 JS 기본은 끔)
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

      // ✅ Q3 console.log: prod에서 error, dev에서 warn
      "no-console": isProd
        ? [
            "error",
            {
              allow: ["warn", "error"],
            },
          ]
        : [
            "warn",
            {
              allow: ["warn", "error"],
            },
          ],

      "no-debugger": isProd ? "error" : "warn",

      // ✅ Q5 props destructuring: 강제(React 플러그인 룰)
      // - class에서는 always, function에서는 ignoreClassFields로 현실적으로 적용
      "react/destructuring-assignment": [
        "error",
        "always",
        { ignoreClassFields: true },
      ],

      // ✅ Q4 함수 컴포넌트 작성 방식: function 허용(= 강제 안 함)
      // (아무 룰도 안 켜면 기본적으로 허용)

      // ✅ Q6 default export 허용: 기본 허용(금지 룰 안 켬)
    },
  },

  // ✅ Admin(Vite)만: react-refresh
  {
    files: ["apps/admin/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // ✅ Client(Next)만: Next 규칙
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
