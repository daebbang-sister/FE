/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "build",
        "chore",
        "ci",
        "docs",
        "style",
        "refactor",
        "test",
        "revert",
        "release",
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [2, "always", ["sentence-case", "lower-case"]],
    "header-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 100],
    "footer-max-line-length": [2, "always", 100],
    "subject-empty": [2, "never"],
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
  },
};
