import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

const nextConfig = require("eslint-config-next/core-web-vitals")

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      "nonoise-new-ref/**",
      "drafts/**",
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "pnpm-lock.yaml",
    ],
  },
  ...nextConfig,
]

export default eslintConfig
