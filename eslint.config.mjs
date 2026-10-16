import nextConfig from "eslint-config-next";

export default [
  ...nextConfig,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];

