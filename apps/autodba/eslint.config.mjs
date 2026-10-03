import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: [
      ".venv/**",
      ".next/**",
      "engine/**",
      "api/**",
      "tests/**",
      "node_modules/**",
      "*.py",
    ],
  },
  ...nextConfig,
];

export default config;
